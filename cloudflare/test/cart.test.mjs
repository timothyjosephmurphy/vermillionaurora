import {env} from 'cloudflare:workers';
import {runInDurableObject,runDurableObjectAlarm,evictDurableObject} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {catalogVersion,cartItems,keyHash,paymentMethods} from '../cart-policy.mjs';
import catalog from '../checkout-catalog.mjs';
import prints from '../print-catalog.mjs';
import {cartCheckout} from '../cart-checkout.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import {backfillCheckoutSale,checkoutWebhook} from '../paypal-orders.mjs';
import {bitcoinWebhook} from '../bitcoin-checkout.mjs';
const ids=['honeybadger-and-cub-with-genesis-block','painting-portrait-in-green'].sort();
const address={name:'Test Buyer',street1:'123 Main St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
const config={CART_CHECKOUT_ENABLED:'true',PAYPAL_CHECKOUT_ENABLED:'true',PAYPAL_CHECKOUT_SLUGS:ids.join(','),PAYPAL_CLIENT_ID:'fake',PAYPAL_CLIENT_SECRET:'fake',PAYPAL_MERCHANT_ID:'MERCHANT',PAYPAL_WEBHOOK_ID:'HOOK',SANDBOX_RETURN_ORIGIN:'https://shop.example.test',SHIPPO_AUTO_LABEL_ENABLED:'false'};
let paypalOrders,invoices,squarePayments,calls,failCreate,failCapture,failRelease,failInvoiceRead,objects,shipCount,mailCount;
function quote(){const items=ids.map(id=>({id,type:'original',quantity:1,title:catalog[id].title,amount:catalog[id].amount})),base=items.reduce((s,i)=>s+Number(i.amount),0).toFixed(2);return {catalogVersion,items,base,shipping:'12.00',tax:'5.00',total:(Number(base)+17).toFixed(2),email:'buyer@example.test',address,taxCalculationId:'taxcalc_CART',quotedAt:Date.now(),shipments:items.map((i,n)=>({slug:i.id,title:i.title,base:i.amount,shipping:'6.00',parcel:{length:16,width:12,height:1,weight:1},packaging:'flat',address,carrier:'UPS',service:'Ground',rateId:`RATE${n}`,quotedAt:Date.now()}))};}
beforeEach(async()=>{
  paypalOrders=new Map();invoices=[];squarePayments=new Map();calls=[];objects=[];failCreate=failCapture=failRelease=failInvoiceRead=false;shipCount=mailCount=0;
  for(const id of ids){const stock=env.PAINTING_STOCK.getByName(id);objects.push(stock);await runInDurableObject(stock,(_,ctx)=>{ctx.storage.sql.exec('DELETE FROM stock');ctx.storage.sql.exec('DELETE FROM shipping_job');ctx.storage.sql.exec('DELETE FROM sale_receipt');return ctx.storage.deleteAlarm();});}
  vi.stubGlobal('fetch',vi.fn(async(input,init={})=>{
    const url=new URL(input),body=typeof init.body==='string'&&init.body.startsWith('{')?JSON.parse(init.body):init.body;
    calls.push({url:url.href,method:init.method||'GET',body,headers:init.headers});
    if(url.pathname==='/v1/notifications/verify-webhook-signature')return Response.json({verification_status:'SUCCESS'});
    if(url.pathname==='/v1/oauth2/token')return Response.json({access_token:'FAKE'});
    if(url.pathname==='/v2/checkout/orders'){
      const key=init.headers['PayPal-Request-Id'];if(!paypalOrders.has(key))paypalOrders.set(key,{...body,id:'ORDER'+paypalOrders.size,status:'CREATED',links:[{rel:'payer-action',href:'https://www.sandbox.paypal.com/checkoutnow?token=ORDER0'}]});
      if(failCreate)throw Error('Response lost after create');return Response.json(paypalOrders.get(key));
    }
    if(url.pathname.startsWith('/v2/checkout/orders/')){
      const order=[...paypalOrders.values()].find(o=>o.id===url.pathname.split('/')[4]);if(!order)throw Error('Unknown test PayPal order');
      if(url.pathname.endsWith('/capture')){order.status='COMPLETED';order.purchase_units[0].payments={captures:[{id:'CAPTURE1',status:'COMPLETED',amount:order.purchase_units[0].amount,create_time:'2026-09-29T12:00:00Z',seller_receivable_breakdown:{paypal_fee:{value:'2.00',currency_code:'USD'},net_amount:{value:(Number(order.purchase_units[0].amount.value)-2).toFixed(2),currency_code:'USD'}}}]};if(failCapture)throw Error('Response lost after capture');}return Response.json(order);
    }
    if(url.hostname==='connect.squareupsandbox.com'&&url.pathname==='/v2/payments'){
      const key=body.idempotency_key;
      if(!squarePayments.has(key))squarePayments.set(key,{id:'SQUAREPAY'+squarePayments.size,status:'COMPLETED',location_id:body.location_id,reference_id:body.reference_id,
        amount_money:body.amount_money,created_at:'2026-10-02T12:00:00Z',updated_at:'2026-10-02T12:00:00Z',processing_fee:[{amount_money:{amount:200,currency:'USD'}}]});
      if(failCreate)throw Error('Response lost after Square payment');return Response.json({payment:squarePayments.get(key)});
    }
    if(url.hostname==='connect.squareupsandbox.com'&&url.pathname.startsWith('/v2/payments/')){
      const payment=[...squarePayments.values()].find(p=>p.id===url.pathname.split('/').at(-1));if(!payment)throw Error('Unknown Square payment');return Response.json({payment});
    }
    if(url.hostname==='btcpay.example.test') {
      if(failInvoiceRead&&init.method!=='POST'&&url.searchParams.has('orderId'))return new Response('Forbidden',{status:403});
      if(init.method==='POST'){const invoice={...body,id:'INV'+invoices.length,storeId:'STORE',status:'New',additionalStatus:'None',checkoutLink:'https://btcpay.example.test/i/INV0',monitoringExpiration:Date.now()/1000+86400,payments:[]};invoices.push(invoice);if(failCreate)throw Error('Response lost after invoice');return Response.json(invoice);}
      if(url.searchParams.has('orderId'))return Response.json(invoices.filter(i=>i.metadata.orderId===url.searchParams.get('orderId')));
      const invoice=invoices.find(i=>i.id===url.pathname.split('/')[6]);if(!invoice)throw Error('Unknown invoice');return Response.json(url.pathname.endsWith('/payment-methods')?[{currency:'BTC',paymentMethodId:'BTC',payments:invoice.payments}]:invoice);
    }
    if(url.pathname==='/shipments/')return Response.json({rates:[{object_id:`RATE${shipCount++}`,currency:'USD',amount:'6.00',provider:'UPS',servicelevel:{name:'Ground'}}],extra:{}});
    if(url.pathname==='/v1/tax/calculations') {let total=Number(body.get('shipping_cost[amount]'));for(const [key,value] of body)if(/^line_items\[\d+\]\[amount\]$/.test(key))total+=Number(value);return Response.json({id:'taxcalc_CART',currency:'usd',amount_total:total+500});}
    if(url.pathname==='/v1/tax/transactions/create_from_calculation')return Response.json({id:'tax_CART'});
    if(url.hostname==='oauth2.googleapis.com')return Response.json({access_token:'FAKE'});
    if(url.hostname==='gmail.googleapis.com')return Response.json({id:'EMAIL'+mailCount++});
    if(url.pathname==='/transactions/'){return Response.json({object_id:'TX'+calls.filter(c=>c.url.includes('/transactions/')).length,test:true,status:'SUCCESS',label_url:'https://labels.example.test/label.pdf',tracking_number:'TRACK',tracking_url_provider:'https://ups.example.test/track'});}
    if(url.hostname==='labels.example.test')return new Response('%PDF-1.4\nTest');
    throw Error(`Unmocked external request ${url.origin}${url.pathname}`);
  }));
});
afterEach(async()=>{for(const stub of objects)await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());vi.unstubAllGlobals();});
async function setup(method='paypal',overrides={}) {
  const id=crypto.randomUUID(),order=env.CART_ORDERS.getByName(id);objects.push(order);
  const settings={...config,...(method==='bitcoin'?{PAYPAL_MODE:'live',BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'STORE',BTCPAY_API_KEY:'fake',BTCPAY_WEBHOOK_SECRET:'fake',BTCPAY_CHECKOUT_ENABLED:'true',BTCPAY_CHECKOUT_SLUGS:ids.join(',')}:{}),
    ...(method==='square'?{SQUARE_CHECKOUT_ENABLED:'true',SQUARE_MODE:'sandbox',SQUARE_CHECKOUT_SLUGS:ids.join(','),SQUARE_ACCESS_TOKEN:'fake',SQUARE_APPLICATION_ID:'APP',SQUARE_LOCATION_ID:'LOCATION',SQUARE_WEBHOOK_SIGNATURE_KEY:'fake',SQUARE_WEBHOOK_URL:'https://worker/checkout/square/webhook'}:{}),...overrides};
  await runInDurableObject(order,instance=>{instance.env={...instance.env,...settings};});
  await order.createQuote(id,await keyHash('a'.repeat(64)),quote(),[method]);return {id,order,settings};
}
const read=order=>runInDurableObject(order,instance=>instance.read());
const approve=()=>{[...paypalOrders.values()][0].status='APPROVED';};
const request=(action,body)=>new Request(`https://worker/checkout/cart/${action}`,{method:'POST',headers:{Origin:'https://shop.example.test','Content-Type':'application/json'},body:JSON.stringify(body)});
it('keeps PayPal available independently and requires an explicit Square item allowlist',()=>{
  const square={SQUARE_CHECKOUT_ENABLED:'true',SQUARE_MODE:'sandbox',SQUARE_ACCESS_TOKEN:'fake',SQUARE_APPLICATION_ID:'APP',SQUARE_LOCATION_ID:'LOCATION',SQUARE_WEBHOOK_SIGNATURE_KEY:'fake',SQUARE_WEBHOOK_URL:'https://worker/checkout/square/webhook'};
  const withoutAllowlist={...env,...config,...square};
  expect(paymentMethods(withoutAllowlist,ids[0])).toContain('paypal');expect(paymentMethods(withoutAllowlist,ids[0])).not.toContain('square');
  const withAllowlist={...withoutAllowlist,SQUARE_CHECKOUT_SLUGS:ids[0]};
  expect(paymentMethods(withAllowlist,ids[0])).toContain('paypal');expect(paymentMethods(withAllowlist,ids[0])).toContain('square');
});

it('offers production Square across eligible originals and prints, preserving PayPal and fulfillment gates',()=>{
  const square={...env,...config,PAYPAL_MODE:'live',SQUARE_MODE:'live',SQUARE_CHECKOUT_ENABLED:'true',SQUARE_CHECKOUT_ALL:'true',
    SQUARE_ACCESS_TOKEN:'fake',SQUARE_APPLICATION_ID:'sq0idp-APP',SQUARE_LOCATION_ID:'LOCATION',SQUARE_WEBHOOK_SIGNATURE_KEY:'fake',
    SQUARE_WEBHOOK_URL:'https://worker/checkout/square/webhook',
    PRINT_CHECKOUT_ENABLED:'true',PRINT_CHECKOUT_ALL:'true',PRINT_PROVIDER:'finerworks',FINERWORKS_ORDER_ENABLED:'true',
    FINERWORKS_WEB_API_KEY:'fake',FINERWORKS_APP_KEY:'fake',FINERWORKS_PAYMENT_TOKEN:'billing-token'};
  const print=Object.values(prints).find(p=>p.provider==='finerworks'&&!p.testOnly&&!p.sampleOnly);
  expect(print).toBeDefined();
  for(const id of [...ids,print.id])expect(paymentMethods(square,id)).toEqual(expect.arrayContaining(['paypal','square']));
  for(const id of ['not-a-product','__proto__','toString'])expect(paymentMethods(square,id)).toEqual([]);
  for(const key of ['SQUARE_ACCESS_TOKEN','SQUARE_APPLICATION_ID','SQUARE_LOCATION_ID','SQUARE_WEBHOOK_SIGNATURE_KEY','SQUARE_WEBHOOK_URL']){
    expect(paymentMethods({...square,[key]:''},ids[0])).not.toContain('square');
    expect(paymentMethods({...square,[key]:''},ids[0])).toContain('paypal');
  }
  expect(paymentMethods({...square,SQUARE_CHECKOUT_ENABLED:'false'},ids[0])).not.toContain('square');
  expect(paymentMethods({...square,SQUARE_MODE:'sandbox'},ids[0])).not.toContain('square');
  expect(paymentMethods({...square,SQUARE_APPLICATION_ID:'sandbox-sq0idb-APP'},ids[0])).not.toContain('square');
  expect(paymentMethods({...square,FINERWORKS_PAYMENT_TOKEN:''},print.id)).toEqual([]);
  expect(paymentMethods({...square,PRINT_CHECKOUT_ENABLED:'false'},print.id)).toEqual([]);
  const testPrint=Object.values(prints).find(p=>p.testOnly);
  if(testPrint)expect(paymentMethods(square,testPrint.id)).toEqual([]);
});

it('rejects duplicated originals, quantities, unknown products and client price substitutions',()=>{
  expect(()=>cartItems([{id:ids[0],quantity:2}])).toThrow();expect(()=>cartItems([{id:ids[0],quantity:1},{id:ids[0],quantity:1}])).toThrow();expect(()=>cartItems([{id:'__proto__',quantity:1}])).toThrow();expect(cartItems([{id:ids[0],quantity:1,amount:'0.01'}])[0].amount).toBe(catalog[ids[0]].amount);
});
it('reserves originals when added, reuses the hold for a quote, releases removals, and expires abandoned carts',async()=>{
  const id=crypto.randomUUID(),key='c'.repeat(64),order=env.CART_ORDERS.getByName(id);objects.push(order);
  const held=await cartCheckout(request('hold',{holdId:id,key,items:[{id:ids[0],quantity:1}]}),{...env,...config});
  expect(held.status).toBe(200);expect((await held.json()).heldIds).toEqual([ids[0]]);expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
  const competitor=crypto.randomUUID(),otherKey='d'.repeat(64),other=env.CART_ORDERS.getByName(competitor);objects.push(other);
  const denied=await cartCheckout(request('hold',{holdId:competitor,key:otherKey,items:[{id:ids[0],quantity:1}]}),{...env,...config});expect((await denied.json()).status).toBe('unavailable');
  const quoteResponse=await cartCheckout(request('quote',{items:[{id:ids[0],quantity:1}],address,email:'buyer@example.test',catalogVersion,holdId:id,key}),{...env,...config});
  expect(quoteResponse.status).toBe(200);expect((await quoteResponse.json()).status).toBe('quoted');expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
  const removed=await cartCheckout(request('hold',{holdId:id,key,items:[]}),{...env,...config});expect((await removed.json()).heldIds).toEqual([]);expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('available');
  const abandoned=crypto.randomUUID(),abandonedOrder=env.CART_ORDERS.getByName(abandoned);objects.push(abandonedOrder);
  await abandonedOrder.syncCart(abandoned,await keyHash('e'.repeat(64)),cartItems([{id:ids[1],quantity:1}]));
  await runInDurableObject(abandonedOrder,i=>i.save({...i.read(),expiresAt:0}));await abandonedOrder.refresh();
  expect((await runInDurableObject(abandonedOrder,i=>i.read())).status).toBe('expired');expect(await env.PAINTING_STOCK.getByName(ids[1]).status()).toBe('available');
});
it('keeps the cart hold through payment setup and releases it when PayPal checkout is cancelled',async()=>{
  const id=crypto.randomUUID(),key='f'.repeat(64),order=env.CART_ORDERS.getByName(id);objects.push(order);
  await runInDurableObject(order,i=>{i.env={...i.env,...config};});
  await cartCheckout(request('hold',{holdId:id,key,items:[{id:ids[0],quantity:1}]}),{...env,...config});
  const quoted=await cartCheckout(request('quote',{items:[{id:ids[0],quantity:1}],address,email:'buyer@example.test',catalogVersion,holdId:id,key}),{...env,...config});expect(quoted.status).toBe(200);
  const started=await cartCheckout(request('start',{orderId:id,key,method:'paypal'}),{...env,...config});expect((await started.json()).status).toBe('pending');expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
  const cancelled=await cartCheckout(request('cancel',{orderId:id,key}),{...env,...config});expect((await cancelled.json()).status).toBe('cancelled');expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('available');
});
it('quotes separate parcels and one tax calculation with all items, without reserving or charging',async()=>{
  const items=quote().items.filter(i=>i.id!== 'painting-portrait-in-green'); // The pilot has insured shipping, tested separately by insurance tests.
  items.push({...items[0],id:'el-zonte-at-sunrise',amount:catalog['el-zonte-at-sunrise'].amount});
  const q=await priceCart({...env,...config},items,address,'buyer@example.test');
  expect(q.shipments).toHaveLength(2);expect(q.shipping).toBe('12.00');expect(q.tax).toBe('5.00');
  expect(calls.filter(c=>c.url.endsWith('/v1/tax/calculations'))).toHaveLength(1);expect(calls.at(-1).body.get('line_items[1][reference]')).toBe('el-zonte-at-sunrise');
  for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('available');expect(paypalOrders.size).toBe(0);
});
it('reserves every original against competing carts and legacy checkout, with conditional cleanup',async()=>{
  const a=await setup(),b=await setup();
  const results=await Promise.all([a.order.start('paypal'),b.order.start('paypal')]);
  expect(results.map(r=>r.status).sort()).toEqual(['pending','unavailable']);expect(paypalOrders.size).toBe(1);
  for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).reserve('legacy')).toBe(false);
  const winner=results[0].status==='pending'?a:b;await winner.order.cancel();
  for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('available');
});
it('releases earlier locks when a later original is sold before checkout',async()=>{
  const {order}=await setup();const unavailable=env.PAINTING_STOCK.getByName(ids[1]);await unavailable.recordExternalSale('EXTERNAL');
  expect((await order.start('paypal')).status).toBe('unavailable');expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('available');expect(await unavailable.status()).toBe('sold');expect(paypalOrders.size).toBe(0);
});
it('recovers an interrupted reservation by releasing all possible locks',async()=>{
  const {id,order}=await setup();await env.PAINTING_STOCK.getByName(ids[0]).reserveCart(id);
  await runInDurableObject(order,i=>i.save({...i.read(),status:'reserving',method:'paypal'}));await order.refresh();
  expect((await read(order)).status).toBe('cancelled');expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('available');expect(paypalOrders.size).toBe(0);
});
it('recovers a lost PayPal create reply using the same idempotency key and refuses payment-method switching',async()=>{
  const {order}=await setup();failCreate=true;expect((await order.start('paypal')).status).toBe('creating');
  failCreate=false;await order.refresh();expect((await read(order)).status).toBe('pending');expect(paypalOrders.size).toBe(1);
  expect((await order.start('bitcoin')).method).toBe('paypal');expect(invoices.length).toBe(0);
});
it('recovers a lost Square create reply with the same token and idempotency key, then settles once',async()=>{
  const {order}=await setup('square');failCreate=true;
  expect((await order.start('square',{sourceId:'cnon:test-card'})).status).toBe('creating');failCreate=false;
  await order.refresh();expect((await read(order)).status).toBe('paid');expect(squarePayments.size).toBe(1);
  await order.refresh();expect(squarePayments.size).toBe(1);
  expect(calls.filter(c=>c.url==='https://connect.squareupsandbox.com/v2/payments')).toHaveLength(2);
  expect(calls.filter(c=>c.url.endsWith('/create_from_calculation'))).toHaveLength(1);
  const d=await read(order),ledger=env.SALES_LEDGER.getByName(`sandbox:${d.paidAt.slice(0,7)}`);objects.push(ledger);
  const receipt=await runInDurableObject(ledger,(_,ctx)=>JSON.parse(ctx.storage.sql.exec('SELECT data FROM sales WHERE id=?','payment:square:SQUAREPAY0').one().data));
  expect(receipt.provider).toBe('square');expect(receipt.gross).toBe(quote().total);expect(receipt.providerFee).toBe('2.00');
});
it('keeps locks after a lost capture response, settles once, records one sale/tax and sends one buyer receipt',async()=>{
  const {id,order}=await setup();await order.start('paypal');approve();failCapture=true;
  expect((await order.capture()).status).toBe('capturing');for(const slug of ids)expect(await env.PAINTING_STOCK.getByName(slug).reserve('other')).toBe(false);
  failCapture=false;
  const hook=new Request('https://worker/checkout/webhook',{method:'POST',body:JSON.stringify({event_type:'PAYMENT.CAPTURE.COMPLETED',resource:{id:'CAPTURE1',supplementary_data:{related_ids:{order_id:'ORDER0'}}}})});
  expect((await checkoutWebhook(hook,{...env,...config})).status).toBe(200);expect((await read(order)).status).toBe('paid');await order.refresh();await order.refresh();
  expect(calls.filter(c=>c.url.endsWith('/capture'))).toHaveLength(1);expect(calls.filter(c=>c.url.endsWith('/create_from_calculation'))).toHaveLength(1);expect(mailCount).toBe(1);
  const d=await read(order);expect(d.taxRecorded).toBe(true);expect(d.customerMail.status).toBe('sent');
  for(const slug of ids){expect(await env.PAINTING_STOCK.getByName(slug).status()).toBe('sold');expect(await runInDurableObject(env.PAINTING_STOCK.getByName(slug),(_,ctx)=>ctx.storage.sql.exec('SELECT count(*) AS n FROM sale_receipt').one().n)).toBe(0);}
  const ledger=env.SALES_LEDGER.getByName(`sandbox:${d.paidAt.slice(0,7)}`);objects.push(ledger);
  const receipt=await runInDurableObject(ledger,(_,ctx)=>JSON.parse(ctx.storage.sql.exec('SELECT data FROM sales WHERE id=?','payment:CAPTURE1').one().data));
  expect(receipt.items).toHaveLength(2);expect(receipt.gross).toBe(quote().total);expect(receipt.paypalFee).toBe('2.00');
  expect((await backfillCheckoutSale(env,ids[0])).recorded).toBe(true);
  await evictDurableObject(order);expect((await order.publicStatus()).status).toBe('paid');
});
it('does not capture after cancellation or an expired unpaid checkout',async()=>{
  const {order}=await setup();await order.start('paypal');approve();await order.cancel();expect((await order.capture()).status).toBe('cancelled');
  expect(calls.filter(c=>c.url.endsWith('/capture'))).toHaveLength(0);
  const b=await setup();await b.order.start('paypal');await runInDurableObject(b.order,i=>i.save({...i.read(),expiresAt:0}));await b.order.refresh();expect((await read(b.order)).status).toBe('expired');
});
it('rejects mismatched merchant, amount, address and items without capturing',async()=>{
  const {order}=await setup();await order.start('paypal');approve();const unit=[...paypalOrders.values()][0].purchase_units[0];
  for(const [object,key,bad] of [[unit.payee,'merchant_id','OTHER'],[unit.amount,'value','0.01'],[unit.shipping.address,'postal_code','10001'],[unit.items[0],'quantity','2']]){
    const old=object[key];object[key]=bad;expect(await runInDurableObject(order,async i=>{try{await i.capture();return '';}catch(e){return e.message;}})).toMatch(/match/);object[key]=old;
  }
  expect(calls.filter(c=>c.url.endsWith('/capture'))).toHaveLength(0);for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('reserved');
});
it('releases a verified missing Bitcoin invoice and reuses the cart reservation for another painting',async()=>{
  const {id,order}=await setup('bitcoin');await order.start('bitcoin');
  invoices.length=0;
  await runInDurableObject(order,i=>i.save({...i.read(),status:'creating',providerId:undefined,url:undefined,createAttemptedAt:Date.now()-180_000}));
  await order.refresh();
  expect((await read(order)).status).toBe('creating');
  expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
  const firstCheck=Date.now()-30_000;
  await runInDurableObject(order,i=>i.save({...i.read(),noInvoiceCheckedAt:firstCheck}));
  await order.refresh();await order.refresh();
  expect((await read(order)).noInvoiceCheckedAt).toBe(firstCheck);
  expect((await read(order)).status).toBe('creating');
  await runInDurableObject(order,i=>i.save({...i.read(),noInvoiceCheckedAt:Date.now()-61_000}));
  await order.refresh();
  expect((await read(order)).status).toBe('expired');
  expect((await read(order)).method).toBeUndefined();
  for(const slug of ids)expect(await env.PAINTING_STOCK.getByName(slug).status()).toBe('available');
  await order.syncCart(id,await keyHash('a'.repeat(64)),[{id:ids[0],quantity:1}]);
  expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
  expect(invoices).toHaveLength(0);
});
it('reports an existing payment attempt to product-page cart additions without changing its stock',async()=>{
  const {id,order}=await setup('bitcoin');await order.start('bitcoin');
  const response=await cartCheckout(request('hold',{holdId:id,key:'a'.repeat(64),items:[{id:ids[0],quantity:1}]}),{...env,...config});
  expect(response.status).toBe(409);
  expect((await response.json()).code).toBe('CHECKOUT_STARTED');
  expect((await read(order)).status).toBe('pending');
  for(const slug of ids)expect(await env.PAINTING_STOCK.getByName(slug).status()).toBe('reserved');
});
it('explains BTCPay invoice permission failures and keeps stock reserved',async()=>{
  const {id,order}=await setup('bitcoin');failCreate=true;await order.start('bitcoin');failCreate=false;failInvoiceRead=true;
  const statusRequest=request('status',{orderId:id,key:'a'.repeat(64)});statusRequest.headers.set('Origin','https://vermillionaurora.com');
  const response=await cartCheckout(statusRequest,{...env,...config,PAYPAL_MODE:'live',BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'STORE',BTCPAY_API_KEY:'fake',BTCPAY_WEBHOOK_SECRET:'fake',BTCPAY_CHECKOUT_ENABLED:'true'});
  expect(response.status).toBe(503);expect((await response.json()).error).toMatch(/View invoices permission/);
  expect(await env.PAINTING_STOCK.getByName(ids[0]).status()).toBe('reserved');
});
it('continues Bitcoin review reconciliation and retains notification delivery state',async()=>{
  const {order}=await setup('bitcoin');await order.start('bitcoin');
  await runInDurableObject(order,i=>i.save({...i.read(),status:'review',reason:'Recover an uncertain invoice'}));
  await order.refresh();
  expect((await read(order)).status).toBe('pending');
  expect((await read(order)).reviewMail.status).toBe('sent');
  expect(mailCount).toBe(1);
  await runInDurableObject(order,i=>i.save({...i.read(),status:'review'}));
  await order.refresh();
  expect(mailCount).toBe(1);
});
it('recovers a lost Bitcoin invoice reply without creating a second invoice, and keeps locks during confirmation',async()=>{
  const {order,settings}=await setup('bitcoin');failCreate=true;await order.start('bitcoin');failCreate=false;await order.refresh();expect((await read(order)).status).toBe('pending');expect(invoices).toHaveLength(1);
  invoices[0].status='Processing';invoices[0].payments=[{id:'TX',value:'0.01',status:'Processing'}];await order.refresh();expect((await read(order)).status).toBe('processing');
  await runInDurableObject(order,i=>i.save({...i.read(),expiresAt:0}));await order.refresh();for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('reserved');
  invoices[0].status='Settled';
  const raw=JSON.stringify({storeId:'STORE',invoiceId:'INV0'}),key=await crypto.subtle.importKey('raw',new TextEncoder().encode('fake'),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig=[...new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(raw)))].map(n=>n.toString(16).padStart(2,'0')).join('');
  expect((await bitcoinWebhook(new Request('https://worker/checkout/bitcoin/webhook',{method:'POST',headers:{'BTCPay-Sig':'sha256='+sig},body:raw}),{...env,...settings})).status).toBe(200);expect((await read(order)).status).toBe('paid');
});
it('releases an unpaid expired Bitcoin invoice but routes late payment to review without selling another buyer’s stock',async()=>{
  const {order}=await setup('bitcoin');await order.start('bitcoin');invoices[0].status='Expired';await order.refresh();expect((await read(order)).status).toBe('expired');
  for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).reserve('new-buyer')).toBe(true);
  invoices[0].status='Settled';invoices[0].payments=[{id:'TX',value:'0.01',status:'Settled'}];await order.refresh();expect((await read(order)).status).toBe('review');for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('reserved');
  expect(calls.filter(c=>c.url.endsWith('/transactions/'))).toHaveLength(0);
});
it('keeps partially paid expired Bitcoin orders reserved for review',async()=>{
  const {order}=await setup('bitcoin');await order.start('bitcoin');invoices[0].status='Expired';invoices[0].additionalStatus='PaidPartial';invoices[0].payments=[{id:'TX',value:'0.001'}];await order.refresh();expect((await read(order)).status).toBe('review');for(const id of ids)expect(await env.PAINTING_STOCK.getByName(id).status()).toBe('reserved');
});
it('requires the order access key and permits existing orders to finish when new checkout is paused',async()=>{
  const {id,order}=await setup();await order.start('paypal');approve();
  expect((await cartCheckout(request('capture',{orderId:id,key:'b'.repeat(64)}),{...env,...config})).status).toBe(404);
  expect((await cartCheckout(request('quote',{catalogVersion,items:[]}),{...env,...config,CART_CHECKOUT_ENABLED:'false'})).status).toBe(503);
  const response=await cartCheckout(request('capture',{orderId:id,key:'a'.repeat(64)}),{...env,...config,CART_CHECKOUT_ENABLED:'false'});expect(response.status).toBe(200);expect((await response.json()).status).toBe('paid');
  expect((await cartCheckout(new Request('https://worker/checkout/cart/catalog',{headers:{Origin:'https://other.example'}}),{...env,...config})).status).toBe(403);
});
it('buys and tracks two parcel labels once while recording the payment only once',async()=>{
  const {order}=await setup('paypal',{SHIPPO_AUTO_LABEL_ENABLED:'true'});await order.start('paypal');approve();await order.capture();await order.refresh();await order.refresh();
  expect(calls.filter(c=>c.url==='https://api.goshippo.com/transactions/')).toHaveLength(2);
  expect((await read(order)).jobs.map(j=>j.status)).toEqual(['ready','ready']);expect(calls.filter(c=>c.url.endsWith('/create_from_calculation'))).toHaveLength(1);expect(mailCount).toBe(3);
  const messages=calls.filter(c=>c.url.includes('gmail.googleapis.com')).map(c=>atob(c.body.raw.replaceAll('-','+').replaceAll('_','/')));expect(messages.filter(m=>m.includes('To: buyer@example.test'))).toHaveLength(1);
});
