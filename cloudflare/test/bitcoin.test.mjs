import { env } from 'cloudflare:workers';
import { runInDurableObject, runDurableObjectAlarm, evictDurableObject } from 'cloudflare:test';
import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import { bitcoinCheckout, bitcoinWebhook } from '../bitcoin-checkout.mjs';
import { backfillCheckoutSale } from '../paypal-orders.mjs';

const objects=[];
let invoices, requests, timeoutCreate, emails;
const quote={title:'Original painting',base:'20.00',shipping:'6.00',tax:'1.00',total:'27.00',taxCalculationId:'taxcalc_test',
  address:{name:'Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122',country:'US'},quotedAt:Date.now()};
beforeEach(()=>{
  invoices=[];requests=[];timeoutCreate=false;emails=0;
  vi.stubGlobal('fetch',vi.fn(async (input,init={})=>{
    const url=new URL(input);requests.push({url:url.href,method:init.method||'GET',body:typeof init.body==='string' && init.body.startsWith('{')?JSON.parse(init.body):null});
    if(url.hostname==='btcpay.example.test') {
      if(init.method==='POST') {
        const body=JSON.parse(init.body),id='INV'+invoices.length;
        const invoice={id,storeId:'store1',amount:body.amount,currency:body.currency,metadata:body.metadata,
          checkoutLink:`https://btcpay.example.test/i/${id}`,status:'New',additionalStatus:'None',monitoringExpiration:Date.now()/1000+86400,payments:[]};
        invoices.push(invoice);
        if(timeoutCreate)throw Error('Connection interrupted after creating invoice');
        return Response.json(invoice);
      }
      if(url.searchParams.has('orderId'))return Response.json(invoices.filter(x=>x.metadata.orderId===url.searchParams.get('orderId')));
      const id=url.pathname.match(/\/invoices\/([^/]+)/)?.[1],invoice=invoices.find(x=>x.id===id);
      if(!invoice)throw Error('Unknown test invoice');
      return Response.json(url.pathname.endsWith('/payment-methods')?[{currency:'BTC',paymentMethodId:'BTC-CHAIN',payments:invoice.payments}]:invoice);
    }
    if(url.hostname==='oauth2.googleapis.com')return Response.json({access_token:'fake'});
    if(url.hostname==='gmail.googleapis.com'){emails++;return Response.json({id:'mail'+emails});}
    throw Error('Unexpected network request: '+url.origin+url.pathname);
  }));
});
afterEach(async()=>{
  for(const stub of objects)await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());
  objects.length=0;vi.unstubAllGlobals();
});
async function setup() {
  const id=crypto.randomUUID(),slug='painting-'+id;
  const order=env.BITCOIN_ORDERS.getByName(id),stock=env.PAINTING_STOCK.getByName(slug);
  objects.push(order,stock);
  await runInDurableObject(order,instance=>{instance.env={...instance.env,BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'store1',BTCPAY_API_KEY:'fake'};});
  await runInDurableObject(stock,instance=>{instance.env={...instance.env,SHIPPO_AUTO_LABEL_ENABLED:'false'};});
  return {id,slug,order,stock};
}
const settled=()=>{invoices[0].status='Settled';invoices[0].payments=[{id:'tx:0',value:'0.00027',status:'Settled',receivedDate:Date.now()/1000}];};
it('reserves the same original against PayPal while Bitcoin confirms, using the complete USD quote',async()=>{
  const {id,slug,order,stock}=await setup();
  expect((await order.start(id,slug,quote)).url).toContain('/i/INV0');
  expect(await stock.reserve('paypal-buyer')).toBe(false);
  await runInDurableObject(stock,(_,ctx)=>ctx.storage.sql.exec('UPDATE stock SET expires_at=0'));
  expect(await stock.status()).toBe('reserved');
  const create=requests.find(r=>r.method==='POST');
  expect(create.body.amount).toBe('27.00');expect(create.body.checkout.paymentTolerance).toBe(0);
  expect(create.body.checkout.speedPolicy).toBe('MediumSpeed');
  expect((await order.publicStatus('another-painting')).status).toBe('missing');
});
it('recovers an uncertain invoice creation without sending a second create request',async()=>{
  const {id,slug,order,stock}=await setup();timeoutCreate=true;
  expect((await order.start(id,slug,quote)).status).toBe('creating');
  await order.refresh();
  expect((await order.publicStatus(slug)).status).toBe('pending');
  expect(requests.filter(r=>r.method==='POST')).toHaveLength(1);
  expect(await stock.status()).toBe('reserved');
});
it('settles once from the saved order, survives eviction and records Bitcoin payment data',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);
  settled();await order.refresh('INV0');
  await runInDurableObject(stock,(_,ctx)=>ctx.storage.deleteAlarm());
  await order.refresh('INV0');
  expect(await stock.status()).toBe('sold');
  expect(await runInDurableObject(stock,(_,ctx)=>ctx.storage.sql.exec('SELECT count(*) AS n FROM sale_receipt').one().n)).toBe(1);
  const receipt=await runInDurableObject(stock,(_,ctx)=>JSON.parse(ctx.storage.sql.exec('SELECT data FROM sale_receipt').one().data));
  expect(receipt.provider).toBe('btcpay');expect(receipt.invoiceId).toBe('INV0');expect(receipt.gross).toBe('27.00');
  expect(receipt.bitcoinPayments[0].amount).toBe('0.00027');expect(receipt.paypalFee).toBeNull();
  const period=new Date().toISOString().slice(0,7);objects.push(env.SALES_LEDGER.getByName(`sandbox:${period}`));
  expect((await backfillCheckoutSale(env,slug)).recorded).toBe(true);
  await evictDurableObject(order);
  expect((await order.publicStatus(slug)).status).toBe('settled');
  expect(await env.SALES_ARCHIVE.get(`bitcoin/sandbox/${id}.json`)).not.toBeNull();
});
it('rejects altered totals and wrong-store invoices while keeping the reservation',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);settled();
  invoices[0].amount='1.00';expect(await runInDurableObject(order,async instance=>{try{await instance.refresh();return '';}catch(error){return error.message;}})).toContain('does not match');
  invoices[0].amount='27.00';invoices[0].storeId='wrong-store';expect(await runInDurableObject(order,async instance=>{try{await instance.refresh();return '';}catch(error){return error.message;}})).toContain('does not match');
  expect(await stock.status()).toBe('reserved');
});
it('releases a verified unpaid expiration and never fulfills a late payment against a new buyer',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);
  invoices[0].status='Expired';await order.refresh();expect(await stock.status()).toBe('available');
  expect(await stock.reserve('second-buyer')).toBe(true);
  settled();await order.refresh('INV0');
  expect((await order.publicStatus(slug)).status).toBe('review');expect(await stock.status()).toBe('reserved');expect(emails).toBe(1);
  await order.refresh('INV0');expect(emails).toBe(1);
});
it('holds partially paid expiration and manually marked settlement for seller review',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);
  invoices[0].status='Expired';invoices[0].additionalStatus='PaidPartial';
  invoices[0].payments=[{id:'partial',value:'0.00001',status:'Settled'}];await order.refresh();
  expect(await stock.status()).toBe('reserved');expect((await order.publicStatus(slug)).status).toBe('review');
  invoices[0].status='Settled';invoices[0].additionalStatus='Marked';await order.refresh();expect(await stock.status()).toBe('reserved');
});
it('retains a retry alarm during provider failure',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);
  vi.stubGlobal('fetch',vi.fn(async()=>{throw Error('Offline');}));
  await expect(runDurableObjectAlarm(order)).rejects.toThrow();
  expect(await stock.status()).toBe('reserved');
  expect(await runInDurableObject(order,(_,ctx)=>ctx.storage.getAlarm())).toBeGreaterThan(Date.now());
});
it('rejects forged webhooks and permits signed settlement while new checkouts are paused',async()=>{
  const {id,slug,order,stock}=await setup();await order.start(id,slug,quote);settled();
  const config={...env,BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'store1',BTCPAY_API_KEY:'fake',BTCPAY_WEBHOOK_SECRET:'secret',BTCPAY_CHECKOUT_ENABLED:'false'};
  const body=JSON.stringify({storeId:'store1',invoiceId:'INV0',type:'InvoiceSettled'});
  const request=signature=>new Request('https://worker.test/checkout/bitcoin/webhook',{method:'POST',headers:{'BTCPay-Sig':signature},body});
  expect((await bitcoinWebhook(request('sha256='+'0'.repeat(64)),config)).status).toBe(400);
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode('secret'),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const signature='sha256='+Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(body))),b=>b.toString(16).padStart(2,'0')).join('');
  expect((await bitcoinWebhook(request(signature),config)).status).toBe(200);
  expect(await stock.status()).toBe('sold');
  const status=await bitcoinCheckout(new Request('https://worker.test/checkout/bitcoin/status?slug='+slug),config);
  expect(await status.json()).toEqual({enabled:false});
});
