import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {cartItems,keyHash} from '../cart-policy.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import prints from '../print-catalog.mjs';
import {resolveCode,applyCode,printCodesApi,codeHash,OWNER_CODE_HASH} from '../print-codes.mjs';
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
async function quoteWith(code,selection=ids){
  const config={...settings};activeMode=config.PAYPAL_MODE;
  const orderId=crypto.randomUUID(),order=env.CART_ORDERS.getByName(orderId);objects.push(order);
  await runInDurableObject(order,i=>{i.env={...i.env,...config};});
  const items=cartItems(selection.map(id=>({id,quantity:1})));
  const resolved=await resolveCode({...env,...config},code,items);
  const quote=await priceCart({...env,...config},items,address,'buyer@example.test',resolved);
  await order.createQuote(orderId,await keyHash('a'.repeat(64)),quote,['paypal']);return {orderId,order,quote};
}
async function issue(token='manager-test-token'){
  const r=await printCodesApi(new Request('https://w.test/checkout/print-codes/issue',{method:'POST',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify({name:'Jane Collector',email:'jane@example.test'})}),{...env,COMMISSION_MANAGER_TOKEN:'manager-test-token',PAYPAL_MODE:'sandbox'});
  return {status:r.status,data:await r.json()};
}
it('issuing requires the existing manager token and returns a code once',async()=>{
  expect((await issue('wrong')).status).toBe(404);
  const {status,data}=await issue();expect(status).toBe(200);expect(data.code).toMatch(/^VA-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
});
it('collector code prices prints at provider cost and is single use: claim at start, release on cancel, redeem on payment',async()=>{
  unitCost=7;const {data:{code}}=await issue();
  const first=await quoteWith(code);
  expect(first.quote.items.every(i=>i.amount==='7.00'&&i.listAmount===prints[i.id].amount&&i.priceCode==='collector')).toBe(true);
  expect(first.quote.base).toBe('14.00');expect(first.quote.printCode.kind).toBe('collector');
  // Only the last group is kept, for a masked bookkeeping reference; never the full code.
  expect(first.quote.printCode.suffix).toBe(code.slice(-4));expect(JSON.stringify(first.quote).includes(code.replace(/-/g,''))).toBe(false);expect(JSON.stringify(first.quote).includes(code)).toBe(false);
  const second=await quoteWith(code);
  await first.order.start('paypal');
  expect((await second.order.start('paypal')).codeError).toBe('That discount code has already been used.');expect((await inspect(second.order)).status).toBe('quoted');
  await first.order.cancel();
  const third=await quoteWith(code);
  await third.order.start('paypal');payment.status='APPROVED';await third.order.capture();await third.order.refresh();
  const saved=await inspect(third.order);expect(saved.status).toBe('paid');expect(saved.codeRedeemed).toBe(true);expect(saved.codeConflict).toBeUndefined();
  // The print lab order is checked against listed retail, so fulfillment is not sent to review.
  expect(saved.printJob.items.every(i=>i.amount===prints[i.id].amount&&!i.listAmount)).toBe(true);
  expect(saved.printJob.status).not.toBe('review');
  await expect(quoteWith(code)).rejects.toThrow('already been used');
});
it('rejects unknown codes, deposits, and collector codes on originals',async()=>{
  await expect(resolveCode(env,'VA-AAAA-BBBB-CCCC',cartItems(ids.map(id=>({id,quantity:1}))))).rejects.toThrow('not valid');
  await expect(resolveCode(env,'VA-AAAA-BBBB-CCCC',[{id:'d',type:'deposit'}])).rejects.toThrow('deposits');
  const {data:{code}}=await issue();
  await expect(resolveCode(env,code,[{id:'p',type:'print'},{id:'o',type:'original'}])).rejects.toThrow('prints only');
  expect(await resolveCode(env,'',[])).toBeNull();
});
it('owner pricing: prints at cost, originals at zero, deposits untouched',async()=>{
  const items=[{id:'p',type:'print',sku:'S1',amount:'60.00',quantity:2},{id:'o',type:'original',amount:'900.00',quantity:1}];
  const out=applyCode(items,{kind:'owner',hash:OWNER_CODE_HASH},{S1:'12.34'});
  expect(out[0]).toMatchObject({amount:'12.34',listAmount:'60.00'});expect(out[1]).toMatchObject({amount:'0.00',listAmount:'900.00',priceCode:'owner'});
  expect(()=>applyCode([{id:'p',type:'print',sku:'X',amount:'1.00'}],{kind:'owner'},{})).toThrow('Print cost unavailable');
  expect(await codeHash('tj-ab cd')).toBe(await codeHash('TJABCD'));
});
