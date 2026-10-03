import {DurableObject} from 'cloudflare:workers';
import {catalogVersion,commonMethods,cartOrigin,publicCartItem} from './cart-policy.mjs';
import {paypalRequest,paypalBody,validatePaypal,approvalUrl,squareRequest,squarePaymentBody,validateSquarePayment,squarePaymentDetails} from './cart-providers.mjs';
import {bitcoinApi,bitcoinServer,checkoutUrl} from './bitcoin-api.mjs';
import {captureDetails,ledgerFor,fulfillmentRecord} from './sales-records.mjs';
import {recordTax} from './checkout-pricing.mjs';
import {newShippingJob,fulfillSale} from './shipping-fulfillment.mjs';
import {sendCartEmail} from './cart-email.mjs';
import {newPrintJob,fulfillPrints,printFulfillmentRecord} from './print-fulfillment.mjs';

const CART_HOLD_MS=15*60_000;

// One durable coordinator per checkout. Per-original stock IDs remain unchanged.
// Every network side effect has a preceding durable state and a recovery path.
export class CartOrder extends DurableObject {
  constructor(ctx,env) {super(ctx,env);ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS cart_order(id INTEGER PRIMARY KEY CHECK(id=1),data TEXT NOT NULL)');}
  read(){const row=this.ctx.storage.sql.exec('SELECT data FROM cart_order WHERE id=1').toArray()[0];return row?JSON.parse(row.data):null;}
  save(data){this.ctx.storage.sql.exec('INSERT OR REPLACE INTO cart_order(id,data) VALUES(1,?)',JSON.stringify(data));return data;}
  async exclusive(action){while(this.running)await this.running.catch(()=>{});const task=action();this.running=task;try{return await task;}finally{this.running=null;}}
  stock(id){return this.env.PAINTING_STOCK.getByName(id);}
  async schedule(delay=60000){await this.ctx.storage.setAlarm(Date.now()+delay);}
  authorize(hash){return !!this.read()&&this.read().keyHash===hash;}
  async createQuote(id,keyHash,quote,methods) {
    if(this.read())throw Error('Order already exists');
    this.save({id,keyHash,quote,methods,mode:this.env.PAYPAL_MODE,status:'quoted',createdAt:Date.now(),expiresAt:Date.now()+10*60000});
    await this.schedule(10*60000);return this.result();
  }
  async syncCart(id,keyHash,items) {return this.exclusive(async()=>{
    let d=this.read();
    if(d&&d.keyHash!==keyHash)throw Error('Cart reservation not found');
    if(d&&!['holding','quoted','expired','cancelled','unavailable'].includes(d.status))throw Error('Checkout has already started.');
    if(d&&['expired','cancelled','unavailable'].includes(d.status)&&(d.method||d.providerId))throw Error('Checkout has already started.');
    const previous=d?.heldIds||d?.quote?.items.filter(i=>i.type!=='print').map(i=>i.id)||[];
    const target=[...new Set(items.filter(i=>i.type!=='print').map(i=>i.id))].sort();
    const union=[...new Set([...previous,...target])].sort();
    const now=Date.now();
    d=this.save({id,keyHash,status:'holding',heldIds:union,targetHeldIds:target,createdAt:d?.createdAt||now,expiresAt:now+CART_HOLD_MS});
    await this.schedule(CART_HOLD_MS);
    const added=[];
    for(const item of items.filter(i=>i.type!=='print'&&!previous.includes(i.id))) {
      if(!await this.stock(item.id).reserveCart(id)) {
        for(const reserved of added)await this.stock(reserved).releaseCart(id);
        const restored=this.save({...d,status:previous.length?'holding':'unavailable',heldIds:previous,targetHeldIds:undefined,expiresAt:previous.length?now+CART_HOLD_MS:now});
        if(previous.length)await this.schedule(CART_HOLD_MS);else await this.ctx.storage.deleteAlarm();
        return {...this.result(),status:'unavailable',unavailable:item.id,heldIds:previous,expiresAt:restored.expiresAt};
      }
      await this.stock(item.id).initialize(item.id);added.push(item.id);
    }
    for(const id of previous.filter(id=>!target.includes(id)))await this.stock(id).releaseCart(d.id);
    d=this.save({...d,status:'holding',heldIds:target,targetHeldIds:undefined,quote:undefined,methods:undefined,method:undefined,providerId:undefined,url:undefined,expiresAt:now+CART_HOLD_MS});
    await this.schedule(CART_HOLD_MS);
    return {...this.result(),heldIds:target};
  });}
  async createHeldQuote(id,keyHash,quote,methods,expectedIds) {return this.exclusive(async()=>{
    const d=this.read();
    if(!d||d.keyHash!==keyHash||d.status!=='holding'||Date.now()>=d.expiresAt)throw Error('Your cart reservation expired. Refresh your cart and try again.');
    const held=[...(d.heldIds||[])].sort(),expected=[...expectedIds].sort();
    if(held.join(',')!==expected.join(','))throw Error('Your cart changed while calculating shipping. Refresh and try again.');
    for(const id of held)if(!await this.stock(id).ownsCart(d.id))throw Error('An original in your cart is no longer reserved. Refresh and try again.');
    this.save({...d,quote,methods,mode:this.env.PAYPAL_MODE,status:'quoted',quotedAt:Date.now(),expiresAt:Date.now()+10*60000});
    await this.schedule(10*60000);return this.result();
  });}
  result() {
    const d=this.read();if(!d)return {status:'missing'};
    return {orderId:d.id,status:d.status,expiresAt:d.expiresAt,method:d.method,methods:d.methods,
      ...((['pending','processing'].includes(d.status)||d.method==='bitcoin'&&['settling','paid'].includes(d.status))&&d.url?{url:d.url}:{}),
      ...(d.quote?{quote:{items:d.quote.items.map(publicCartItem),base:d.quote.base,shipping:d.quote.shipping,tax:d.quote.tax,total:d.quote.total,
        shipments:[...d.quote.shipments.map(s=>({id:s.slug,title:s.title,shipping:s.shipping,carrier:s.carrier,service:s.service})),...(d.quote.printQuote?[{id:'prints',title:'Fine-art prints',shipping:d.quote.printQuote.shipping,carrier:d.quote.printQuote.carrier,service:d.quote.printQuote.service}]:[])]},
        }:{}),
      ...(d.heldIds?{heldIds:d.heldIds}:{}),
      ...(d.unavailable?{unavailable:d.unavailable}:{}),
      ...(d.paymentError?{paymentError:d.paymentError}:{}),...(d.squareSandboxNoFulfillment?{sandboxTestOnly:true}:{}),
      ...(d.status==='paid'?{paidAt:d.paidAt,shipments:[...(d.jobs||[]).map(j=>({id:j.quote.slug,trackingNumber:j.trackingNumber||'',trackingUrl:j.trackingUrl||''})),...(d.printJob?.shipments||[])],...(d.printJob?{printStatus:d.printJob.status}:{}),confirmation:d.customerMail?.status||'pending'}:{})};
  }
  async start(method,payment={}) {return this.exclusive(async()=>{
    let d=this.read();if(!d)throw Error('Order missing');
    if(d.status!=='quoted')return this.result(); // Retries reuse the same attempt, never create a second payment.
    if(Date.now()>d.expiresAt){if(d.heldIds?.length)await this.expireCartHold();else this.save({...d,status:'expired'});return this.result();}
    if(d.quote.catalogVersion!==catalogVersion||this.env.PAYPAL_MODE!==d.mode||!d.methods.includes(method)||!commonMethods(this.env,d.quote.items).includes(method))throw Error('Refresh this cart before payment');
    if(method==='square'&&(typeof payment.sourceId!=='string'||!payment.sourceId||payment.sourceId.length>2000))throw Error('Enter valid card details before paying.');
    await this.schedule();
    d=this.save({...d,status:'reserving',method,squareSandboxNoFulfillment:method==='square'&&this.env.PAYPAL_MODE==='sandbox'&&this.env.SQUARE_MODE==='sandbox'&&this.env.SQUARE_SANDBOX_NO_FULFILLMENT==='true',expiresAt:Date.now()+20*60000,paymentError:undefined,squareSourceId:undefined,squareIdempotencyKey:undefined,
      merchantId:method==='paypal'?this.env.PAYPAL_MERCHANT_ID:null,
      ...(method==='square'?{squareMode:this.env.SQUARE_MODE,squareLocationId:this.env.SQUARE_LOCATION_ID,squareSourceId:payment.sourceId,
        squareAttempt:(d.squareAttempt||0)+1,squareIdempotencyKey:`${d.id}-${String((d.squareAttempt||0)+1).padStart(2,'0')}`,paymentError:undefined}:{}),
      ...(method==='bitcoin'?{server:bitcoinServer(this.env),storeId:this.env.BTCPAY_STORE_ID}:{})});
    for(const item of d.quote.items.filter(i=>i.type!=='print')) {
      if(!await this.stock(item.id).ownsCart(d.id)&&!await this.stock(item.id).reserveCart(d.id)) {
        this.save({...d,status:'releasing',releaseStatus:'unavailable',unavailable:item.id});await this.releaseAll();return this.result();
      }
      await this.stock(item.id).initialize(item.id);
    }
    // Persist before asking the provider to create anything. No automatic lock expiry.
    d=this.save({...d,status:'creating',createAttemptedAt:Date.now()});
    try{await this.createPayment(d);}catch(error){
      if(d.method==='square'&&error.definiteFailure){const latest=this.read();this.save({...latest,status:'quoted',method:undefined,squareSourceId:undefined,squareIdempotencyKey:undefined,paymentError:'Square did not complete this card payment. Check the card details or choose another payment method.'});await this.schedule(Math.max(1000,latest.expiresAt-Date.now()));}
      else console.error('Cart payment creation needs reconciliation',d.id,error.message);
    }
    return this.result();
  });}
  async createPayment(d) {
    if(d.method==='square') {
      const result=await squareRequest(this.env,'/v2/payments',squarePaymentBody(this.env,d));
      const payment=result.payment;
      const captureId=validateSquarePayment(this.env,d,payment);
      this.save({...d,providerId:payment.id,squareSourceId:undefined,status:'settling',captureId,
        details:squarePaymentDetails(payment),paidAt:payment.updated_at||payment.created_at||new Date().toISOString()});
      await this.settle(captureId,squarePaymentDetails(payment));
    } else if(d.method==='paypal') {
      const order=await paypalRequest(this.env,'/v2/checkout/orders',paypalBody(this.env,d),d.id);
      validatePaypal(this.env,d,order);
      // A repeated create can return an already-approved or completed order.
      this.save({...d,providerId:order.id,status:'pending',url:order.status==='COMPLETED'?null:approvalUrl(this.env,order)});
      if(order.status==='COMPLETED')await this.acceptPaypal(order);
    } else {
      const invoice=await bitcoinApi(this.env,'/invoices',{amount:d.quote.total,currency:'USD',metadata:{orderId:`va-cart-${d.id}`,itemDesc:`${d.quote.items.length} artwork items — Vermillion Aurora`},
        checkout:{paymentMethods:['BTC-CHAIN','BTC-LN'],speedPolicy:'MediumSpeed',paymentTolerance:0,expirationMinutes:15,monitoringMinutes:1440,redirectAutomatically:true,redirectURL:`${cartOrigin(this.env)}/cart/?order=${d.id}`}});
      this.validateBitcoin(d,invoice);this.save({...d,providerId:invoice.id,url:checkoutUrl(this.env,invoice.checkoutLink),status:'pending'});
    }
  }
  async releaseAll() {
    const d=this.read();
    // releaseCart is conditional on the coordinator identity. Never unlock another buyer.
    for(const id of new Set([...(d.heldIds||[]),...(d.quote?.items.filter(i=>i.type!=='print').map(i=>i.id)||[])]))await this.stock(id).releaseCart(d.id);
    this.save({...d,status:d.releaseStatus||'cancelled'});
    if(d.method==='bitcoin'&&d.providerId)await this.schedule(15*60000);else await this.ctx.storage.deleteAlarm();
  }
  async capture(){return this.exclusive(async()=>{
    let d=this.read();if(!d||d.method!=='paypal')throw Error('Not a PayPal order');
    if(['paid','settling','capturing'].includes(d.status)){await this.reconcile();return this.result();}
    if(d.status!=='pending')return this.result();
    if(Date.now()>d.expiresAt){await this.reconcile();return this.result();}
    for(const i of d.quote.items.filter(i=>i.type!=='print'))if(!await this.stock(i.id).ownsCart(d.id))throw Error('Reservation lost');
    const order=await paypalRequest(this.env,`/v2/checkout/orders/${d.providerId}`);validatePaypal(this.env,d,order);
    if(order.status==='COMPLETED'){await this.acceptPaypal(order);return this.result();}
    if(order.status!=='APPROVED')throw Error('Payment is not approved');
    await this.schedule();d=this.save({...d,status:'capturing',captureAttemptedAt:Date.now()});
    try{await this.capturePaypal(d);}catch(error){console.error('Cart capture needs reconciliation',d.id,error.message);}
    return this.result();
  });}
  async capturePaypal(d) {
    const order=await paypalRequest(this.env,`/v2/checkout/orders/${d.providerId}/capture`,{},`c:${d.id}`);
    await this.acceptPaypal(order);
  }
  async acceptPaypal(order) {
    const d=this.read(),captureId=validatePaypal(this.env,d,order,true);
    await this.settle(captureId,captureDetails(order));
  }
  async acceptSquare(paymentId) {
    const d=this.read();if(!d||d.method!=='square'||!d.squareLocationId)return;
    if(d.status==='paid'){await this.fulfill();return;}
    const result=await squareRequest(this.env,`/v2/payments/${encodeURIComponent(paymentId)}`),payment=result.payment;
    const captureId=validateSquarePayment(this.env,d,payment);
    this.save({...d,providerId:payment.id,squareSourceId:undefined,status:'settling',captureId,
      details:squarePaymentDetails(payment),paidAt:payment.updated_at||payment.created_at||new Date().toISOString()});
    await this.settle(captureId,squarePaymentDetails(payment));
  }
  async settle(captureId,details) {
    let d=this.read();
    if(d.captureId&&d.captureId!==captureId)throw Error('Conflicting capture');
    // Check every lock before any item is sold; incomplete commits are replayable.
    for(const i of d.quote.items.filter(i=>i.type!=='print')) {
      const row=await this.stock(i.id).order();
      if(row?.orderId!==`cart:${d.id}`||!['cart-held','sold'].includes(row.state)||(row.state==='sold'&&row.captureId!==captureId)) {
        this.save({...d,status:'review',reason:'A received payment no longer owns every original. Review payment before fulfillment.'});await this.reviewNotice();return;
      }
    }
    await this.schedule();
    d=this.save({...d,status:'settling',captureId,details,paidAt:d.paidAt||details.paidAt||new Date().toISOString()});
    for(const i of d.quote.items.filter(i=>i.type!=='print'))if(!await this.stock(i.id).completeCart(d.id,captureId))throw Error('Could not complete inventory');
    const jobs=d.squareSandboxNoFulfillment?[]:d.jobs||d.quote.shipments.map(s=>newShippingJob(this.env,`cart:${d.id}`,{...s,tax:'0.00',total:(Number(s.base)+Number(s.shipping)).toFixed(2),orderTax:d.quote.tax,orderTotal:d.quote.total}));
    const prints=d.squareSandboxNoFulfillment?[]:d.quote.items.filter(i=>i.type==='print');
    let printJob=d.squareSandboxNoFulfillment?undefined:d.printJob;
    if(prints.length&&!printJob)try {printJob=newPrintJob(this.env,d,prints);}catch {
      // A configuration change after approval must never prevent recording payment.
      printJob={provider:d.quote.printQuote?.provider||prints[0].provider,status:'review',mode:d.mode,items:prints,shipments:[],
        request:{merchantReference:`va-cart-${d.id}-prints`},quotedProductionCost:d.quote.printQuote?.productionCost,quotedShipping:d.quote.printQuote?.shipping,
        reason:'The payment is recorded, but print fulfillment settings changed. Review before placing a print order.'};
    }
    this.save({...d,status:'paid',jobs,...(printJob?{printJob}:{})});await this.schedule(1000);
  }
  validateBitcoin(d,invoice) {
    if(this.env.PAYPAL_MODE!==d.mode||bitcoinServer(this.env)!==d.server||this.env.BTCPAY_STORE_ID!==d.storeId||
      !/^[a-zA-Z0-9]{1,100}$/.test(invoice.id||'')||(d.providerId&&d.providerId!==invoice.id)||invoice.storeId!==d.storeId||invoice.metadata?.orderId!==`va-cart-${d.id}`||invoice.currency!=='USD'||!/^\d+(\.\d{1,2})?$/.test(invoice.amount||'')||Number(invoice.amount).toFixed(2)!==d.quote.total)throw Error('Bitcoin invoice does not match the saved order');
  }
  // Deployment-only diagnostics: expose comparison flags, never invoice IDs,
  // checkout links, credentials, buyer details, or raw provider responses.
  async bitcoinDiagnostics() {
    const d=this.read();if(!d||d.method!=='bitcoin')return {bitcoin:false};
    const result={bitcoin:true,status:d.status,hasAlarm:(await this.ctx.storage.getAlarm())!==null,configurationMatches:this.env.PAYPAL_MODE===d.mode&&bitcoinServer(this.env)===d.server&&this.env.BTCPAY_STORE_ID===d.storeId};
    if(!result.configurationMatches)return result;
    try {
      const invoices=d.providerId?[await bitcoinApi(this.env,`/invoices/${encodeURIComponent(d.providerId)}`)]:await bitcoinApi(this.env,`/invoices?orderId=${encodeURIComponent('va-cart-'+d.id)}&take=2`);
      if(!Array.isArray(invoices))return {...result,error:'invalid-invoice-response'};
      result.matches=invoices.length;if(invoices.length!==1)return result;
      const invoice=invoices[0];
      result.invoiceStatus=['New','Processing','Settled','Expired','Invalid'].includes(invoice.status)?invoice.status:'unknown';
      result.additionalStatus=['None','PaidPartial','PaidOver','Marked','PaidLate'].includes(invoice.additionalStatus)?invoice.additionalStatus:'unknown';
      result.checks={id:/^[a-zA-Z0-9]{1,100}$/.test(invoice.id||''),providerId:!d.providerId||d.providerId===invoice.id,
        store:invoice.storeId===d.storeId,order:invoice.metadata?.orderId===`va-cart-${d.id}`,currency:invoice.currency==='USD',
        amountFormat:/^\d+(\.\d{1,2})?$/.test(invoice.amount||''),amount:Number(invoice.amount).toFixed(2)===d.quote.total};
      result.stage='invoice-payment-methods';
      const methods=await bitcoinApi(this.env,`/invoices/${encodeURIComponent(invoice.id)}/payment-methods`);
      result.paymentMethodsValid=Array.isArray(methods);
      if(result.paymentMethodsValid){const payments=methods.flatMap(m=>m.payments||[]);result.paymentCount=payments.length;result.bitcoinPaymentsOnly=payments.every(p=>methods.some(m=>m.currency==='BTC'&&m.payments?.includes(p)));}
      result.stage='complete';
      return result;
    }catch(error){return {...result,error:/^BTCPay API \d{3}$/.test(error.message)?error.message:'invoice-check-failed'};}
  }
  async cancel(){return this.exclusive(async()=>{
    let d=this.read();if(!d)return this.result();
    if(d.status==='quoted'||d.status==='holding'){await this.expireCartHold('cancelled');return this.result();}
    // Closing a Bitcoin window cannot invalidate an invoice or release its stock.
    if(d.method==='bitcoin'||!['pending','creating'].includes(d.status)){await this.reconcile();return this.result();}
    if(!d.providerId){await this.reconcile();return this.result();}
    const order=await paypalRequest(this.env,`/v2/checkout/orders/${d.providerId}`);validatePaypal(this.env,d,order);
    if(order.status==='COMPLETED')await this.acceptPaypal(order);
    else if(['CREATED','PAYER_ACTION_REQUIRED','APPROVED','VOIDED'].includes(order.status)) {
      this.save({...d,status:'releasing',releaseStatus:'cancelled'});await this.releaseAll();
    }
    return this.result();
  });}
  async publicStatus(){if(this.read()&&Date.now()-(this.read().checkedAt||0)>5000)await this.refresh();return this.result();}
  async refresh(invoiceId){return this.exclusive(()=>this.reconcile(invoiceId));}
  async reconcile(invoiceId) {
    let d=this.read();if(!d)return;
    await this.schedule();this.save({...d,checkedAt:Date.now()});d=this.read();
    if(d.status==='paid'){await this.fulfill();return;}
    if(d.status==='settling'){await this.settle(d.captureId,d.details);return;}
    if(d.status==='holding'||d.status==='quoted'){if(Date.now()>=d.expiresAt)await this.expireCartHold('expired');else await this.ctx.storage.setAlarm(d.expiresAt);return;}
    if(d.status==='reserving'){this.save({...d,status:'releasing',releaseStatus:'cancelled'});await this.releaseAll();return;}
    if(d.status==='releasing'){await this.releaseAll();return;}
    if(invoiceId&&d.providerId&&invoiceId!==d.providerId)throw Error('Provider reference mismatch');
    if(['cancelled','unavailable'].includes(d.status)&&!invoiceId){await this.ctx.storage.deleteAlarm();return;}
    if(d.status==='expired'&&(!d.providerId||d.method!=='bitcoin')&&!invoiceId){await this.ctx.storage.deleteAlarm();return;}
    if(d.status==='review'){try{await this.reviewNotice();}catch(error){console.error('Checkout review notice failed',d.id,error.message);}d=this.read();await this.schedule(60000);}
    if(d.method==='square') {
      if(!d.providerId) {
        if(Date.now()-d.createAttemptedAt>30*60000){this.save({...d,status:'review',reason:'Square payment creation could not be confirmed. Check Square before releasing inventory.'});await this.reviewNotice();return;}
        await this.createPayment(d);return;
      }
      await this.acceptSquare(d.providerId);return;
    }
    if(d.method==='paypal') {
      if(!d.providerId) {
        // PayPal-Request-Id safely recovers an interrupted create within its retention window.
        if(Date.now()-d.createAttemptedAt>30*60000){this.save({...d,status:'review',reason:'PayPal order creation could not be confirmed. Check PayPal before releasing inventory.'});await this.reviewNotice();return;}
        await this.createPayment(d);return;
      }
      const order=await paypalRequest(this.env,`/v2/checkout/orders/${d.providerId}`);validatePaypal(this.env,d,order);
      if(order.status==='COMPLETED'){await this.acceptPaypal(order);return;}
      if(d.status==='capturing') {
        if(order.status==='APPROVED')await this.capturePaypal(d);
        // PENDING captures and uncertain outcomes keep every original reserved.
        return;
      }
      if(Date.now()>d.expiresAt&&['CREATED','PAYER_ACTION_REQUIRED','APPROVED','VOIDED'].includes(order.status)) {
        this.save({...d,status:'releasing',releaseStatus:'expired'});await this.releaseAll();
      }
      return;
    }
    let invoice;
    if(d.providerId||invoiceId)invoice=await bitcoinApi(this.env,`/invoices/${encodeURIComponent(d.providerId||invoiceId)}`);
    else {
      const matches=await bitcoinApi(this.env,`/invoices?orderId=${encodeURIComponent('va-cart-'+d.id)}&take=2`);
      if(!Array.isArray(matches))throw Error('Invalid invoice search');
      if(matches.length>1){this.save({...d,status:'review',reason:'Multiple Bitcoin invoices match this order. Inventory remains reserved for review.'});await this.reviewNotice();return;}
      if(matches.length===0){
        if(Date.now()-d.createAttemptedAt<120000)return;
        if(!d.noInvoiceCheckedAt){this.save({...d,noInvoiceCheckedAt:Date.now()});return;}
        // Customer polling must not restart the gap between the two checks.
        if(Date.now()-d.noInvoiceCheckedAt<60000)return;
        // Two authoritative BTCPay searches found no invoice. Release only this
        // order's stock; do not retry invoice creation or risk duplicate payment.
        this.save({...d,status:'releasing',releaseStatus:'expired'});
        await this.releaseAll();
        const released=this.read();
        this.save({...released,status:'expired',method:undefined,providerId:undefined,url:undefined,quote:undefined,methods:undefined,
          reason:undefined,releaseStatus:undefined,noInvoiceCheckedAt:undefined,heldIds:[]});
        return;
      }
      invoice=matches[0];
    }
    this.validateBitcoin(d,invoice);
    const methods=await bitcoinApi(this.env,`/invoices/${invoice.id}/payment-methods`);
    if(!Array.isArray(methods))throw Error('Invalid Bitcoin payment methods');
    const payments=methods.flatMap(m=>(m.payments||[]).map(p=>({method:m.paymentMethodId,currency:m.currency,id:p.id,amount:p.value,status:p.status,receivedDate:p.receivedDate})));
    d=this.save({...d,providerId:invoice.id,url:checkoutUrl(this.env,invoice.checkoutLink),monitoringExpiration:invoice.monitoringExpiration,invoiceStatus:invoice.status,additionalStatus:invoice.additionalStatus});
    if(invoice.status==='Settled'&&invoice.additionalStatus==='None'&&payments.length>0&&payments.every(p=>p.currency==='BTC')) {
      await this.settle(`btcpay:${invoice.id}`,{provider:'btcpay',invoiceId:invoice.id,bitcoinPayments:payments});return;
    }
    if(invoice.status==='Expired'&&invoice.additionalStatus==='None'&&payments.length===0) {
      this.save({...d,status:'releasing',releaseStatus:'expired'});await this.releaseAll();
      if(Number.isFinite(d.monitoringExpiration)&&Date.now()>d.monitoringExpiration*1000)await this.ctx.storage.deleteAlarm();return;
    }
    if(['New','Processing'].includes(invoice.status)&&['None','PaidPartial','PaidOver'].includes(invoice.additionalStatus)&&d.status!=='expired') {
      this.save({...d,status:invoice.status==='Processing'?'processing':'pending'});return;
    }
    this.save({...d,status:'review',reason:'Bitcoin payment is partial, late, overpaid or requires review. Inventory and fulfillment need review.'});await this.reviewNotice();
  }
  receipt() {
    const d=this.read(),q=d.quote,details=d.details||{};
    const shipments=(d.jobs||[]).map(job=>({id:job.quote.slug,...fulfillmentRecord({published:true,tax_recorded:d.taxRecorded},job)}));
    const printStatus=d.printJob?.status;
    const originalReady=shipments.length===0||shipments.every(s=>s.labelStatus==='ready');
    const originalReview=shipments.some(s=>s.labelStatus==='review');
    const printReady=!d.printJob||printStatus==='complete'||d.mode==='sandbox'&&printStatus==='test-complete';
    const printReview=['review','cancelled'].includes(printStatus);
    const labelStatus=originalReview||printReview?'review':(originalReady&&printReady)?'ready':'pending';
    return {schemaVersion:3,id:`payment:${d.captureId}`,kind:'sale',mode:d.mode,source:'checkout',provider:d.method==='bitcoin'?'btcpay':d.method==='square'?'square':'paypal',
      transactionId:d.captureId,orderId:`cart:${d.id}`,parentTransactionId:'',status:'COMPLETED',paidAt:d.paidAt,recordedAt:d.paidAt,
      title:q.items.map(i=>i.title).join('; '),slug:'',currency:'USD',items:q.items,shipments,...(d.printJob?{printFulfillment:printFulfillmentRecord(d.printJob)}:{}),itemAmount:q.base,shipping:q.shipping,tax:q.tax,gross:q.total,
      ...(d.method==='paypal'?{paypalFee:details.fee??null,paypalNet:details.net??null}:{}),providerFee:details.fee??null,feeCurrency:details.feeCurrency||'',netCurrency:details.netCurrency||'',
      buyerName:q.address.name,buyerEmail:q.email,shippingAddress:q.address,taxCalculationId:q.taxCalculationId,
      ...(d.method==='bitcoin'?{invoiceId:d.providerId,bitcoinPayments:details.bitcoinPayments||[]} : {}),
      fulfillment:{inventoryPublished:true,taxRecorded:!!d.taxRecorded,labelStatus,
        carrier:shipments.map(s=>s.carrier).join('; '),trackingNumber:shipments.map(s=>s.trackingNumber).filter(Boolean).join('; '),shippoTransactionId:shipments.map(s=>s.shippoTransactionId).filter(Boolean).join('; ')}};
  }
  async archiveSale() {
    const d=this.read();if(d?.status!=='paid')return {recorded:false};
    const receipt=this.receipt();await ledgerFor(this.env,receipt).record(receipt);
    await this.env.SALES_ARCHIVE.put(`orders/${d.mode}/${d.id}.json`,JSON.stringify({receipt,fulfillment:d.jobs,printFulfillment:d.printJob,confirmation:d.customerMail},null,2),{httpMetadata:{contentType:'application/json'}});
    return {recorded:true,period:d.paidAt.slice(0,7)};
  }
  async fulfill() {
    let d=this.read();
    if(d?.squareSandboxNoFulfillment&&d.mode==='sandbox'&&d.method==='square'){await this.ctx.storage.deleteAlarm();return;}
    let done=true;await this.schedule();
    try{await this.archiveSale();}catch{done=false;}
    if(!d.taxRecorded)try{await recordTax(this.env,d.quote.taxCalculationId,d.captureId);this.save({...this.read(),taxRecorded:true});}catch{done=false;}
    for(let i=0;i<d.jobs.length;i++)try {
      const job=this.read().jobs[i];
      const complete=await fulfillSale(this.env,{state:'sold',order_id:`cart:${d.id}`,capture_id:d.captureId,slug:job.quote.slug},job,async next=>{
        const now=this.read();now.jobs[i]=next;this.save(now);await this.ctx.storage.sync();
      });if(!complete)done=false;
    }catch{done=false;}
    if(this.read().printJob) {
      try {
        const complete=await fulfillPrints(this.env,this.read().printJob,async printJob=>{this.save({...this.read(),printJob});await this.ctx.storage.sync();});
        if(!complete)done=false;
        const job=this.read().printJob;
        if(['review','cancelled'].includes(job.status))await this.mail('printReviewMail','print-review');
        await this.mail('printSellerMail','print-seller');
        if(job.status==='complete')await this.mail('printShipmentMail','print-shipped');
      }catch{done=false;}
    }
    try{await this.mail('customerMail','confirmation');}catch{done=false;}
    try{await this.archiveSale();}catch{done=false;}
    if(done)await this.ctx.storage.deleteAlarm();
    else if(this.read().printJob)await this.schedule(15*60000);
  }
  async printCallback(key) {
    const d=this.read();if(!d?.printJob||d.printJob.callbackKey!==key)return false;
    // Callbacks only request an authoritative API refresh; payloads cannot alter fulfillment.
    if(Date.now()-(d.printCallbackAt||0)>60000){this.save({...d,printCallbackAt:Date.now()});await this.refresh();}
    return true;
  }
  async mail(field,type) {
    let d=this.read();if(['sent','review'].includes(d[field]?.status))return;
    // Gmail has no send idempotency key. An uncertain send is flagged, never blindly repeated.
    if(d[field]?.status==='sending'){this.save({...d,[field]:{status:'review'}});return;}
    this.save({...d,[field]:{status:'sending'}});await this.ctx.storage.sync();
    const id=await sendCartEmail(this.env,d,type);this.save({...this.read(),[field]:{status:'sent',id}});
  }
  async reviewNotice(){const d=this.read();await this.env.SALES_ARCHIVE.put(`orders/${d.mode}/${d.id}-review.json`,JSON.stringify({orderId:d.id,status:d.status,reason:d.reason,method:d.method,providerId:d.providerId,quote:d.quote},null,2),{httpMetadata:{contentType:'application/json'}});await this.mail('reviewMail','review');}
  async alarm(){await this.refresh();}
  async expireCartHold(status='expired') {
    const d=this.read();if(!d)return;
    for(const id of new Set([...(d.heldIds||[]),...(d.targetHeldIds||[])]))await this.stock(id).releaseCart(d.id);
    this.save({...d,status,heldIds:[],targetHeldIds:undefined});await this.ctx.storage.deleteAlarm();
  }
}
