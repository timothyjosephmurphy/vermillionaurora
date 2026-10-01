import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {cartItems,keyHash,paymentMethods} from '../cart-policy.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import {finerworksRequest} from '../finerworks-api.mjs';
import prints from '../print-catalog.mjs';
const ids=['print-painting-portrait-in-green-small','print-painting-portrait-in-gold-small'];
const address={name:'Test Buyer',street1:'123 Test St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
const settings={PRINT_PROVIDER:'finerworks',FINERWORKS_ORDER_ENABLED:'true',FINERWORKS_WEB_API_KEY:'fake-web',FINERWORKS_APP_KEY:'fake-app',PRINT_CHECKOUT_ENABLED:'true',PRINT_CHECKOUT_IDS:ids.join(','),PAYPAL_MODE:'sandbox',CART_CHECKOUT_ENABLED:'true',PAYPAL_CHECKOUT_ENABLED:'true',PAYPAL_CLIENT_ID:'fake',PAYPAL_CLIENT_SECRET:'fake',PAYPAL_MERCHANT_ID:'MERCHANT',PAYPAL_WEBHOOK_ID:'HOOK',SANDBOX_RETURN_ORIGIN:'https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev'};
const originalPrints=structuredClone(prints);
// Explicit sample fixtures keep the historical security gates covered after
// Chase and Dorian graduate to normal full-resolution editions.
function useSampleFixtures(){for(const id of ids){prints[id].sampleOnly=true;prints[id.replace('-small','-medium')].sampleOnly=true;}}
let calls,payment,submission,loseReply,unitCost,objects,mailCount,activeMode,captureSequence=0;
beforeEach(()=>{
  calls=[];payment=null;submission=null;loseReply=false;unitCost=7;objects=[];mailCount=0;activeMode='sandbox';
  vi.stubGlobal('fetch',vi.fn(async(input,init={})=>{
    const u=new URL(input),body=typeof init.body==='string'&&init.body.startsWith('{')?JSON.parse(init.body):init.body;calls.push({url:u.href,body});
    if(u.hostname==='v2.api.finerworks.com') {
      if(u.pathname.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
      if(u.pathname.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',custom_sizing:true,allow_decimal:true,allow_rotate:true,min:{width:4,height:4},max:{width:40,height:90}}]);
      if(u.pathname.endsWith('get_prices'))return Response.json(body.products.map(p=>({...p,product_code:p.product_sku,product_price:unitCost,total_price:unitCost})));
      if(u.pathname.endsWith('list_shipping_options_multiple')) {
        const order=body.orders[0],total=order.order_items.reduce((n,p)=>n+p.product_qty*unitCost,0);
        return Response.json({status:{success:true},orders:[{order_po:order.order_po,options:[{id:42,rate:8.95,shipping_method:'Ground',carrier:'UPS',calculated_total:{order_po:order.order_po,order_subtotal:total,order_shipping_rate:8.95,order_sales_tax:0,order_discount:0,order_grand_total:total+8.95,product_pricing:order.order_items.map(p=>({product_sku:p.product_sku,product_qty:p.product_qty,total_price:unitCost}))}}]}]});
      }
      if(u.pathname.endsWith('submit_orders_v2')) {
        expect(body.validate_only).toBe(false);expect(body.payment_token).toBe(activeMode==='live'?'fake-live-payment-token':'xxxx');expect(body.orders[0].test_mode).toBe(activeMode==='sandbox');expect(body.orders[0].order_po.length).toBeLessThanOrEqual(50);
        submission=body.orders[0];if(loseReply)throw Error('Provider accepted the order but response was lost');
        return Response.json({status:{success:true},orders:[{order_po:submission.order_po,order_id:123456,order_status:'Accepted'}]});
      }
      if(u.pathname.endsWith('fetch_order_status'))return Response.json({status:{success:true},orders:submission?[{order_po:submission.order_po,order_id:123456,order_status_label:'Accepted',shipments:[]}]:[]});
    }
    if(u.pathname==='/v1/oauth2/token'||u.hostname==='oauth2.googleapis.com')return Response.json({access_token:'FAKE'});
    if(u.pathname==='/v2/checkout/orders'){payment={...body,id:'ORDER1',status:'CREATED',links:[{rel:'approve',href:`https://www.${activeMode==='sandbox'?'sandbox.':''}paypal.com/checkoutnow?token=ORDER1`}]};return Response.json(payment);}
    if(u.pathname.startsWith('/v2/checkout/orders/')){if(u.pathname.endsWith('/capture')){payment.status='COMPLETED';payment.purchase_units[0].payments={captures:[{id:`FWCAPTURE${++captureSequence}`,status:'COMPLETED',amount:payment.purchase_units[0].amount,create_time:'2026-09-30T12:00:00Z'}]};}return Response.json(payment);}
    if(u.pathname==='/v1/tax/calculations'){let total=Number(body.get('shipping_cost[amount]'));for(const [key,value] of body)if(/^line_items\[\d+\]\[amount\]$/.test(key))total+=Number(value);return Response.json({id:'taxcalc_FW',currency:'usd',amount_total:total+500});}
    if(u.pathname==='/v1/tax/transactions/create_from_calculation')return Response.json({id:'tax_FW'});
    if(u.hostname==='gmail.googleapis.com')return Response.json({id:`MAIL${++mailCount}`});
    throw Error(`Unexpected external request: ${u.origin}${u.pathname}`);
  }));
});
afterEach(async()=>{for(const o of objects)await runInDurableObject(o,(_,ctx)=>ctx.storage.deleteAlarm());vi.unstubAllGlobals();for(const id of Object.keys(originalPrints))prints[id]=structuredClone(originalPrints[id]);});
const inspect=o=>runInDurableObject(o,i=>i.read());
async function setup(overrides={},selection=ids) {
  const config={...settings,...overrides};activeMode=config.PAYPAL_MODE;
  const orderId=crypto.randomUUID(),order=env.CART_ORDERS.getByName(orderId);objects.push(order);
  await runInDurableObject(order,i=>{i.env={...i.env,...config};});
  const quote=await priceCart({...env,...config},cartItems(selection.map(id=>({id,quantity:1}))),address,'buyer@example.test');
  await order.createQuote(orderId,await keyHash('a'.repeat(64)),quote,['paypal']);return {orderId,order,quote};
}
async function pay(order){await order.start('paypal');payment.status='APPROVED';await order.capture();}
it('full-image editions preserve paper geometry and exact files through paid fulfillment without changing original stock',async()=>{
  const selection=['print-paul-murphy-painting-55-full','print-paul-murphy-painting-86-small','print-paul-murphy-painting-72-medium','print-painting-portrait-in-green-small','print-painting-portrait-with-hat-full'];
  const stock=env.PAINTING_STOCK.getByName('paul-murphy-painting-86'),before=await stock.status();
  const {order,quote}=await setup({PRINT_CHECKOUT_IDS:selection.join(',')},selection);
  expect(quote.items.every(i=>i.imageSize.width<i.paperSize.width&&i.layoutApproved&&!i.sampleOnly)).toBe(true);expect(submission).toBeNull();
  await pay(order);await order.refresh();await order.refresh();
  const saved=await inspect(order);expect(saved.status).toBe('paid');expect(saved.printJob.status).toBe('test-complete');
  expect(submission.order_items).toHaveLength(selection.length);
  for(const id of selection){const p=prints[id];expect(submission.order_items.some(i=>i.product_sku===p.sku&&i.product_image.product_url_file===p.assetUrl)).toBe(true);}
  expect(calls.filter(c=>c.url.endsWith('submit_orders_v2'))).toHaveLength(1);expect(await stock.status()).toBe(before);
  expect(calls.findIndex(c=>c.url.endsWith('/capture'))).toBeLessThan(calls.findIndex(c=>c.url.endsWith('submit_orders_v2')));
});
it('allows sandbox pilots while live samples require their separate enablement flag',()=>{
  useSampleFixtures();
  for(const id of ids){expect(paymentMethods({...env,...settings},id)).toEqual(['paypal']);expect(paymentMethods({...env,...settings,PAYPAL_MODE:'live',FINERWORKS_PAYMENT_TOKEN:'invoice'},id)).toEqual([]);expect(paymentMethods({...env,...settings,FINERWORKS_ORDER_ENABLED:'false'},id)).toEqual([]);}
});
it('live sample gate never admits sandbox-only files or multiple copies of one painting',()=>{
  useSampleFixtures();
  const live={...env,...settings,PAYPAL_MODE:'live',LIVE_PRINT_SAMPLE_ENABLED:'true',FINERWORKS_PAYMENT_TOKEN:'fake-live-payment-token'};
  expect(paymentMethods(live,ids[0])).toEqual(['paypal']);
  expect(paymentMethods({...live,LIVE_PRINT_SAMPLE_ENABLED:'false'},ids[0])).toEqual([]);
  const prior=prints[ids[0]].testOnly;try{prints[ids[0]].testOnly=true;expect(paymentMethods(live,ids[0])).toEqual([]);}finally{prints[ids[0]].testOnly=prior;}
  expect(()=>cartItems([{id:ids[0],quantity:2}])).toThrow(/one copy/);
  expect(()=>cartItems([{id:ids[0],quantity:1},{id:ids[0].replace('-small','-medium'),quantity:1}])).toThrow(/one copy/);
});
it('live payment precedes one billed full-resolution edition submission and archives the sale without billing credentials',async()=>{
  const ledger=env.SALES_LEDGER.getByName('live:2026-09');objects.push(ledger);await runInDurableObject(ledger,i=>{i.env={...i.env,PAYPAL_MODE:'live'};});
  const {order,orderId}=await setup({PAYPAL_MODE:'live',LIVE_PRINT_SAMPLE_ENABLED:'true',FINERWORKS_PAYMENT_TOKEN:'fake-live-payment-token'});
  await order.start('paypal');expect(submission).toBeNull();payment.status='APPROVED';await order.capture();await order.refresh();await order.refresh();
  const saved=await inspect(order);expect(saved.status).toBe('paid');expect(saved.printJob.status).toBe('in-production');
  expect(submission.order_items).toHaveLength(2);expect(calls.filter(c=>c.url.endsWith('submit_orders_v2'))).toHaveLength(1);
  expect(calls.findIndex(c=>c.url.endsWith('/capture'))).toBeLessThan(calls.findIndex(c=>c.url.endsWith('submit_orders_v2')));
  expect(submission.order_items.every(i=>i.product_image.product_url_file.startsWith('https://vermillionaurora.com/print-editions/'))).toBe(true);
  const archived=await (await env.SALES_ARCHIVE.get(`orders/live/${orderId}.json`)).text();expect(archived).not.toContain('fake-live-payment-token');expect(JSON.parse(archived).receipt.mode).toBe('live');
});
it('records one payment and one FinerWorks order containing both paintings without touching originals',async()=>{
  const stock=env.PAINTING_STOCK.getByName('painting-portrait-in-green'),before=await stock.status();
  const {order,orderId,quote}=await setup();expect(quote.base).toBe('50.00');expect(quote.shipping).toBe('8.95');expect(quote.total).toBe('63.95');expect(submission).toBeNull();
  await pay(order);await order.refresh();await order.refresh();
  const saved=await inspect(order);expect(saved.status).toBe('paid');expect(saved.printJob.status).toBe('test-complete');expect(saved.printJob.providerId).toBe('123456');
  expect(submission.order_items).toHaveLength(2);expect(new Set(submission.order_items.map(i=>i.product_image.product_url_file)).size).toBe(2);
  expect(calls.filter(c=>c.url.endsWith('submit_orders_v2'))).toHaveLength(1);expect(calls.filter(c=>c.url.endsWith('/capture'))).toHaveLength(1);expect(calls.some(c=>c.url.includes('shippo'))).toBe(false);expect(await stock.status()).toBe(before);
  const archived=await (await env.SALES_ARCHIVE.get(`orders/sandbox/${orderId}.json`)).json();expect(archived.receipt.printFulfillment.provider).toBe('finerworks');expect(archived.receipt.printFulfillment.providerOrderId).toBe('123456');expect(saved.customerMail.status).toBe('sent');expect(saved.printSellerMail.status).toBe('sent');expect(saved.printShipmentMail).toBeUndefined();
  const state=await order.result();expect(state.quote.items[0].assetUrl).toBeUndefined();expect(state.quote.printQuote).toBeUndefined();expect(await order.printCallback('b'.repeat(64))).toBe(false);
});
it('recovers an accepted order after a lost reply by its PO without resubmitting',async()=>{
  const {order}=await setup();await pay(order);loseReply=true;await order.refresh();expect((await inspect(order)).printJob.status).toBe('creating');
  await runInDurableObject(order,i=>i.save({...i.read(),printJob:{...i.read().printJob,checkedAt:0}}));await order.refresh();
  expect((await inspect(order)).printJob.status).toBe('test-complete');expect(calls.filter(c=>c.url.endsWith('submit_orders_v2'))).toHaveLength(1);expect(calls.filter(c=>c.url.endsWith('fetch_order_status'))).toHaveLength(1);
});
it('holds higher supplier costs for review after payment',async()=>{
  const {order}=await setup();await pay(order);unitCost=99;await order.refresh();expect((await inspect(order)).printJob.status).toBe('review');expect(submission).toBeNull();
});
it('archives captured payment even if fulfillment is disabled after PayPal approval',async()=>{
  const {order,orderId}=await setup();await order.start('paypal');payment.status='APPROVED';await runInDurableObject(order,i=>{i.env.FINERWORKS_ORDER_ENABLED='false';});await order.capture();await order.refresh();
  expect((await inspect(order)).status).toBe('paid');expect((await inspect(order)).printJob.status).toBe('review');expect(await env.SALES_ARCHIVE.get(`orders/sandbox/${orderId}.json`)).not.toBeNull();expect(submission).toBeNull();
});
it('rejects a live-mode submit through sandbox credentials before calling FinerWorks',async()=>{
  await expect(finerworksRequest({...env,...settings},'/v3/submit_orders_v2',{orders:[{order_po:`va-cart-${crypto.randomUUID()}-prints`,test_mode:false}],validate_only:false,payment_token:'invoice'})).rejects.toThrow();expect(calls).toHaveLength(0);
});
