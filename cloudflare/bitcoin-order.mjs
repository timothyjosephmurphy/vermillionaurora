import { DurableObject } from 'cloudflare:workers';
import { SITE, bitcoinApi, bitcoinServer, checkoutUrl } from './bitcoin-api.mjs';
import { sellerMailToken } from './shipping-email.mjs';

// One durable order per attempt. Its immutable quote survives catalog edits and
// invoice expiry; the existing per-painting object coordinates ALL payment methods.
export class BitcoinOrder extends DurableObject {
  constructor(ctx,env) {
    super(ctx,env);
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS bitcoin_order (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL)');
  }
  read() { const row=this.ctx.storage.sql.exec('SELECT data FROM bitcoin_order WHERE id=1').toArray()[0]; return row?JSON.parse(row.data):null; }
  save(data) { this.ctx.storage.sql.exec('INSERT OR REPLACE INTO bitcoin_order(id,data) VALUES(1,?)',JSON.stringify(data)); return data; }
  async exclusive(action) {
    while(this.running) await this.running.catch(()=>{});
    const task=action(); this.running=task;
    try { return await task; } finally { this.running=null; }
  }
  stock(data) { return this.env.PAINTING_STOCK.getByName(data.slug); }
  async start(id,slug,quote) {
    return this.exclusive(async()=>{
      if(this.read())throw Error('Bitcoin order already exists');
      let data=this.save({id,slug,quote,mode:this.env.PAYPAL_MODE,server:bitcoinServer(this.env),storeId:this.env.BTCPAY_STORE_ID,
        createdAt:Date.now(),status:'preparing'});
      await this.ctx.storage.setAlarm(Date.now()+60_000);
      const stock=this.stock(data);
      if(!await stock.reserve(id)) { this.save({...data,status:'unavailable'}); await this.ctx.storage.deleteAlarm(); return {status:'unavailable'}; }
      await stock.initialize(slug);
      if(!await stock.bindBitcoinOrder(id,quote))throw Error('Could not bind Bitcoin reservation');
      // Persist BEFORE POST. An interrupted request is reconciled by orderId,
      // never blindly repeated (BTCPay does not promise create idempotency).
      data=this.save({...data,status:'creating'});
      try {
        const invoice=await bitcoinApi(this.env,'/invoices',{
          amount:quote.total,currency:'USD',metadata:{orderId:`va-btc-${id}`,itemCode:slug,itemDesc:quote.title},
          checkout:{paymentMethods:['BTC','BTC-LightningNetwork'],speedPolicy:'MediumSpeed',paymentTolerance:0,
            expirationMinutes:15,monitoringMinutes:1440,redirectAutomatically:true,
            redirectURL:`${SITE}/products/${slug}/?bitcoin=${id}`}
        });
        this.validate(data,invoice);
        this.save({...data,invoiceId:invoice.id,url:checkoutUrl(this.env,invoice.checkoutLink),status:'pending'});
      } catch(error) { console.error('Bitcoin invoice creation needs reconciliation',id,error.message); }
      return this.result(this.read());
    });
  }
  validate(data,invoice) {
    if(data.server!==bitcoinServer(this.env) || data.storeId!==this.env.BTCPAY_STORE_ID || data.mode!==this.env.PAYPAL_MODE)throw Error('Bitcoin order configuration changed');
    if(!/^[a-zA-Z0-9]{1,100}$/.test(invoice.id||'') || (data.invoiceId && data.invoiceId!==invoice.id) ||
      invoice.storeId!==data.storeId || invoice.metadata?.orderId!==`va-btc-${data.id}` || invoice.metadata?.itemCode!==data.slug ||
      invoice.currency!=='USD' || !/^\d+(\.\d{1,2})?$/.test(invoice.amount||'') || Number(invoice.amount).toFixed(2)!==data.quote.total)throw Error('Bitcoin invoice does not match the saved order');
  }
  result(data) {
    return {status:data?.status||'missing',...(data?.url && data.status==='pending'?{url:data.url}:{}),orderId:data?.id};
  }
  async publicStatus(slug) {
    const data=this.read();
    if(!data || data.slug!==slug)return {status:'missing'};
    if(!['settled','unavailable'].includes(data.status) && Date.now()-(data.checkedAt||0)>5000)await this.refresh();
    return this.result(this.read());
  }
  async refresh(invoiceId) { return this.exclusive(()=>this.reconcile(invoiceId)); }
  async reconcile(invoiceId) {
    let data=this.read();
    if(!data)return;
    await this.ctx.storage.setAlarm(Date.now()+60_000);
    if(data.status==='unavailable') { await this.ctx.storage.deleteAlarm(); return; }
    if(data.status==='preparing') {
      // No invoice POST can have happened in this persisted state.
      await this.stock(data).releaseBitcoinOrder(data.id);
      await this.stock(data).release(data.id);
      this.save({...data,status:'unavailable'});await this.ctx.storage.deleteAlarm();return;
    }
    if(data.status==='settled' && !invoiceId) { await this.archive(data); await this.ctx.storage.deleteAlarm(); return; }
    if(data.invoiceId && invoiceId && data.invoiceId!==invoiceId)throw Error('Invoice ID mismatch');
    let invoice;
    if(data.invoiceId || invoiceId) invoice=await bitcoinApi(this.env,`/invoices/${encodeURIComponent(data.invoiceId||invoiceId)}`);
    else {
      const invoices=await bitcoinApi(this.env,`/invoices?orderId=${encodeURIComponent('va-btc-'+data.id)}&take=2`);
      if(!Array.isArray(invoices))throw Error('Invalid invoice search');
      if(invoices.length!==1) {
        if(invoices.length>1 || Date.now()-data.createdAt>120_000) {
          data=this.save({...data,status:'review',reason:'Invoice creation could not be reconciled. Check BTCPay before releasing the painting.',checkedAt:Date.now()});
          await this.notifyReview(data);
          await this.ctx.storage.setAlarm(Date.now()+15*60_000);
        }
        return;
      }
      invoice=invoices[0];
    }
    this.validate(data,invoice);
    const methods=await bitcoinApi(this.env,`/invoices/${encodeURIComponent(invoice.id)}/payment-methods`);
    if(!Array.isArray(methods))throw Error('Invalid invoice payment methods');
    const payments=methods.flatMap(method=>(method.payments||[]).map(payment=>({method:method.paymentMethodId,currency:method.currency,
      id:payment.id,amount:payment.value,status:payment.status,receivedDate:payment.receivedDate})));
    data={...data,invoiceId:invoice.id,url:checkoutUrl(this.env,invoice.checkoutLink),invoiceStatus:invoice.status,
      additionalStatus:invoice.additionalStatus,paidAmount:invoice.paidAmount,payments,checkedAt:Date.now(),monitoringExpiration:invoice.monitoringExpiration};
    if(invoice.status==='Settled' && invoice.additionalStatus==='None' && payments.length>0 && payments.every(p=>p.currency==='BTC')) {
      const details={provider:'btcpay',invoiceId:invoice.id,bitcoinPayments:payments,buyerName:data.quote.address.name};
      // The stock object's order identity prevents a late invoice from selling
      // an original that has since been reserved or sold through another attempt.
      if(await this.stock(data).complete(`btcpay:${data.id}`,`btcpay:${invoice.id}`,details)) {
        data=this.save({...data,status:'settled',settledAt:new Date().toISOString()});
        await this.archive(data);await this.ctx.storage.deleteAlarm();return;
      }
      data={...data,status:'review',reason:'A settled invoice no longer owns this painting reservation. Review the payment; no fulfillment was started.'};
    } else if(data.settledAt) {
      data={...data,status:'review',reason:'A previously settled Bitcoin invoice changed status. Review its payment and any fulfillment already started.'};
    } else if(invoice.status==='Expired' && invoice.additionalStatus==='None' && payments.length===0) {
      await this.stock(data).releaseBitcoinOrder(data.id);
      data={...data,status:'expired'};
    } else if(['New','Processing'].includes(invoice.status) && ['None','PaidPartial','PaidOver'].includes(invoice.additionalStatus)) {
      data={...data,status:invoice.status==='Processing'?'processing':'pending'};
    } else data={...data,status:'review',reason:`BTCPay invoice needs review: ${invoice.status} / ${invoice.additionalStatus}. No automatic fulfillment.`};
    data=this.save(data);
    await this.archive(data);
    if(data.status==='review')await this.notifyReview(data);
    if(['expired','review'].includes(data.status)) {
      if(Number.isFinite(data.monitoringExpiration) && Date.now()>data.monitoringExpiration*1000)await this.ctx.storage.deleteAlarm();
      else await this.ctx.storage.setAlarm(Date.now()+15*60_000);
    }
  }
  async archive(data) {
    if(!this.env.SALES_ARCHIVE)throw Error('Bitcoin order archive missing');
    await this.env.SALES_ARCHIVE.put(`bitcoin/${data.mode}/${data.id}.json`,JSON.stringify(data,null,2),{httpMetadata:{contentType:'application/json'}});
  }
  async notifyReview(data) {
    if(data.reviewEmailId)return;
    await this.archive(data);
    const token=await sellerMailToken(this.env);
    const encode=value=>{let out='';for(const byte of new TextEncoder().encode(value))out+=String.fromCharCode(byte);return btoa(out);};
    const body=`Bitcoin payment needs review\n\nPainting: ${data.quote.title}\nOrder: ${data.id}\nInvoice: ${data.invoiceId||'Unknown — search by order ID'}\nExpected total: $${data.quote.total} USD\n${data.reason}\n\nReview this order in BTCPay. Do not ship or issue another charge until resolved.`;
    const mime=['From: Vermillion Aurora <tj@vermillionaurora.com>','To: tj@vermillionaurora.com',
      'Subject: Bitcoin payment needs review','MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',encode(body)].join('\r\n');
    const response=await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',{method:'POST',signal:AbortSignal.timeout(20_000),
      headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({raw:encode(mime).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')})});
    const mail=await response.json();
    if(!response.ok || !mail.id)throw Error('Bitcoin review notification failed');
    this.save({...this.read(),reviewEmailId:mail.id});
  }
  async alarm() { await this.refresh(); }
}
