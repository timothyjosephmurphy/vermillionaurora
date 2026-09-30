import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import prints from '../print-catalog.mjs';
import {cartItems,catalogVersion,keyHash,paymentMethods} from '../cart-policy.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import {prodigiEnvironment,quotePrints} from '../prodigi-api.mjs';
import {printApi} from '../print-api.mjs';
const id='print-painting-portrait-in-green-medium',art='painting-portrait-in-green';
const item={id,type:'print',productId:art,title:'Chase Toole — Medium print',amount:'80.00',sku:'GLOBAL-FAP-12X16',scale:.75,imageSize:{width:9,height:11.25,unit:'in'},paperSize:{width:12,height:16,unit:'in'},paper:'Enhanced matte',assetUrl:'https://media.vermillionaurora.com/prints/approved.pdf',attributes:{},quantity:2};
const address={name:'Test Buyer',street1:'123 Test St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
const settings={PRODIGI_API_KEY:'fake',PRODIGI_ENV:'sandbox',PRINT_CHECKOUT_ENABLED:'true',PRINT_CHECKOUT_IDS:id,PAYPAL_MODE:'sandbox',CART_CHECKOUT_ENABLED:'true',PAYPAL_CHECKOUT_ENABLED:'true',PAYPAL_CLIENT_ID:'fake',PAYPAL_CLIENT_SECRET:'fake',PAYPAL_MERCHANT_ID:'MERCHANT',PAYPAL_WEBHOOK_ID:'HOOK',SANDBOX_RETURN_ORIGIN:'https://sandbox.example.test'};
let calls,orders,payment,loseReply,providerStage,price,objects,mailCount;
beforeEach(()=>{
  prints[id]={...item};calls=[];orders=new Map();payment=null;loseReply=false;providerStage='InProgress';price='10.00';objects=[];mailCount=0;
  vi.stubGlobal('fetch',vi.fn(async(input,init={})=>{
    const u=new URL(input),body=typeof init.body==='string'&&init.body.startsWith('{')?JSON.parse(init.body):init.body;
    calls.push({url:u.href,method:init.method||'GET',body});
    if(u.hostname==='api.sandbox.prodigi.com') {
      if(u.pathname.includes('/products/'))return Response.json({outcome:'Ok',product:{sku:item.sku,productDimensions:{width:12,height:16,units:'in'},printAreas:{default:{required:true}},variants:[{attributes:{},shipsTo:['US'],printAreaSizes:{default:{horizontalResolution:3600,verticalResolution:4800}}}]}});
      if(u.pathname.endsWith('/quotes'))return Response.json({outcome:'Created',quotes:[{shipmentMethod:'Standard',costSummary:{items:{amount:price,currency:'USD'},shipping:{amount:'7.00',currency:'USD'}},items:body.items.map((i,n)=>({...i,id:`q${n}`})),shipments:[{carrier:{name:'UPS',service:'Ground'},fulfillmentLocation:{countryCode:'US'},items:['q0']}]}]});
      if(u.pathname.endsWith('/orders')) {if(!orders.has(body.idempotencyKey))orders.set(body.idempotencyKey,{...body,id:'ord_TEST',status:{stage:providerStage,issues:[]},shipments:[]});if(loseReply)throw Error('Lost reply after creating print order');return Response.json({outcome:'Created',order:orders.get(body.idempotencyKey)});}
      const order=[...orders.values()][0];order.status.stage=providerStage;
      if(providerStage==='Complete')order.shipments=[{id:'shp_TEST',carrier:{name:'UPS'},tracking:{number:'TRACK',url:'https://www.ups.com/track'},dispatchDate:'2026-09-29'}];
      return Response.json({outcome:'Ok',order});
    }
    if(u.pathname==='/v1/oauth2/token'||u.hostname==='oauth2.googleapis.com')return Response.json({access_token:'FAKE'});
    if(u.pathname==='/v2/checkout/orders'){payment={...body,id:'ORDER1',status:'CREATED',links:[{rel:'approve',href:'https://www.sandbox.paypal.com/checkoutnow?token=ORDER1'}]};return Response.json(payment);}
    if(u.pathname.startsWith('/v2/checkout/orders/')){
      if(u.pathname.endsWith('/capture')){payment.status='COMPLETED';payment.purchase_units[0].payments={captures:[{id:'PRINTCAPTURE',status:'COMPLETED',amount:payment.purchase_units[0].amount,create_time:'2026-09-29T12:00:00Z'}]};}return Response.json(payment);
    }
    if(u.pathname==='/v1/tax/calculations'){let total=Number(body.get('shipping_cost[amount]'));for(const [key,value] of body)if(/^line_items\[\d+\]\[amount\]$/.test(key))total+=Number(value);return Response.json({id:'taxcalc_PRINT',currency:'usd',amount_total:total+500});}
    if(u.pathname==='/v1/tax/transactions/create_from_calculation')return Response.json({id:'tax_PRINT'});
    if(u.hostname==='gmail.googleapis.com')return Response.json({id:`MAIL${mailCount++}`});
    throw Error(`Unexpected external request: ${u.origin}${u.pathname}`);
  }));
});
afterEach(async()=>{delete prints[id];for(const o of objects)await runInDurableObject(o,(_,ctx)=>ctx.storage.deleteAlarm());vi.unstubAllGlobals();});
const inspect=order=>runInDurableObject(order,i=>i.read());
async function setup() {
  const orderId=crypto.randomUUID(),order=env.CART_ORDERS.getByName(orderId);objects.push(order);
  await runInDurableObject(order,i=>{i.env={...i.env,...settings};});
  const quote=await priceCart({...env,...settings},cartItems([{id,quantity:2}]),address,'buyer@example.test');
  await order.createQuote(orderId,await keyHash('a'.repeat(64)),quote,['paypal']);return {orderId,order,quote};
}
async function pay(order){await order.start('paypal');payment.status='APPROVED';await order.capture();}
const advance=order=>runInDurableObject(order,i=>i.save({...i.read(),printJob:{...i.read().printJob,checkedAt:0}}));
it('isolates environments and requires separate print allowlisting; client prices and assets are ignored',()=>{
  expect(()=>prodigiEnvironment({...settings,PRODIGI_ENV:'live'})).toThrow();
  expect(paymentMethods({...env,...settings,PRINT_CHECKOUT_IDS:''},id)).toEqual([]);
  expect(cartItems([{id,quantity:2,amount:'.01',assetUrl:'https://attacker.test/x'}])[0]).toEqual(item);
  expect(()=>cartItems([{id,quantity:11}])).toThrow();expect(()=>cartItems([{id:art,quantity:2}])).toThrow();
});
it('never exposes a sandbox-only print through live payment methods',()=>{
  prints[id]={...item,testOnly:true};
  expect(paymentMethods({...env,...settings,PAYPAL_MODE:'live',PRODIGI_ENV:'live',PRINT_CHECKOUT_ENABLED:'true',PRINT_CHECKOUT_IDS:id},id)).toEqual([]);
});
it('quotes quantities and one tax calculation without calling Shippo or placing a vendor order',async()=>{
  const {quote}=await setup();expect(quote.base).toBe('160.00');expect(quote.shipping).toBe('7.00');expect(quote.total).toBe('172.00');expect(quote.shipments).toEqual([]);
  expect(calls.find(c=>c.url.endsWith('/v1/tax/calculations')).body.get('line_items[0][amount]')).toBe('16000');
  expect(orders.size).toBe(0);expect(calls.some(c=>c.url.includes('shippo'))).toBe(false);
});
it('rejects a changed paper measurement before quoting or taking payment',async()=>{
  await expect(quotePrints({...env,...settings},[{...item,paperSize:{width:13,height:16}}])).rejects.toThrow(/dimensions/);expect(payment).toBe(null);
});
it('sells prints without touching original inventory, persists one payment, and recovers a lost vendor response',async()=>{
  const originalStatus=await env.PAINTING_STOCK.getByName(art).status();
  const {order,orderId}=await setup();await pay(order);expect(orders.size).toBe(0);expect((await inspect(order)).status).toBe('paid');
  loseReply=true;await order.refresh();expect(orders.size).toBe(1);expect((await inspect(order)).printJob.status).toBe('creating');
  const key=(await inspect(order)).printJob.request.idempotencyKey;
  loseReply=false;await advance(order);await order.refresh();expect((await inspect(order)).printJob.providerId).toBe('ord_TEST');expect(orders.size).toBe(1);expect((await inspect(order)).printJob.request.idempotencyKey).toBe(key);
  expect(await env.PAINTING_STOCK.getByName(art).status()).toBe(originalStatus);
  expect(payment.purchase_units[0].items[0].quantity).toBe('2');expect(calls.filter(c=>c.url.endsWith('/capture'))).toHaveLength(1);
  expect(calls.some(c=>c.url.includes('shippo'))).toBe(false);
  const archive=await env.SALES_ARCHIVE.get(`orders/sandbox/${orderId}.json`);expect((await archive.json()).receipt.printFulfillment.providerOrderId).toBe('ord_TEST');
  const publicState=await order.result();expect(publicState.quote.items[0].assetUrl).toBeUndefined();expect(publicState.quote.printQuote).toBeUndefined();
  const ledger=env.SALES_LEDGER.getByName('sandbox:2026-09');objects.push(ledger);
});
it('holds increased fulfillment cost for review and never creates a second payment',async()=>{
  const {order}=await setup();await pay(order);price='99.00';await order.refresh();expect((await inspect(order)).printJob.status).toBe('review');expect(orders.size).toBe(0);
});
it('records tracking and sends one shipment notification even when callbacks repeat',async()=>{
  const {order}=await setup();await pay(order);await order.refresh();providerStage='Complete';await advance(order);await order.refresh();const sent=mailCount;
  await order.refresh();expect(mailCount).toBe(sent);expect((await inspect(order)).printJob.shipments[0].trackingNumber).toBe('TRACK');expect((await inspect(order)).printShipmentMail.status).toBe('sent');
  expect(await order.printCallback('b'.repeat(64))).toBe(false);expect(await order.printCallback((await inspect(order)).printJob.callbackKey)).toBe(true);
});
it('requires an audit credential for provider verification and never exposes it in health',async()=>{
  const diagnosticEnv={...env,...settings,PRINT_CHECKOUT_ENABLED:'false',FINERWORKS_WEB_API_KEY:'private-web',FINERWORKS_APP_KEY:'private-app'};
  const response=await printApi(new Request('https://worker/checkout/prints/verify',{method:'POST',body:'{}'}),diagnosticEnv);expect(response.status).toBe(404);expect(calls).toHaveLength(0);
  const health=await printApi(new Request('https://worker/checkout/prints/health'),diagnosticEnv);expect(await health.json()).toEqual({provider:'finerworks',mode:'sandbox',webApiKeyConfigured:true,appKeyConfigured:true,enabled:false,readOnly:true});
});
it('verifies FinerWorks without exposing account details or placing an order',async()=>{
  fetch.mockImplementationOnce(async()=>Response.json({status:{success:true,debug:{secret:'private-app'}},user_account:{web_api_key:'private-web',billing_info:{address_1:'private-address'}}}));
  const token=`${Date.now()+600000}.${'a'.repeat(64)}`;
  const response=await printApi(new Request('https://worker/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify({task:'credentials'})}),{...env,...settings,PRINT_CHECKOUT_ENABLED:'false',FINERWORKS_WEB_API_KEY:'private-web',FINERWORKS_APP_KEY:'private-app',FINERWORKS_AUDIT_TOKEN:token});
  const data=await response.json();expect(response.status).toBe(200);expect(data.credentialsOk).toBe(true);expect(JSON.stringify(data)).not.toContain('private-');expect(data.providerAppMode).toBe('not-verified');expect(orders.size).toBe(0);
});
