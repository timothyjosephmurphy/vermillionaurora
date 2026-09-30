import test from 'node:test';
import assert from 'node:assert/strict';
import {finerworksRequest} from './finerworks-api.mjs';
import {shippingOptions,groupPrintProducts,finerworksRecipient,quoteFinerWorksPrints,validateFinerWorksPrintOrder} from './finerworks-quotes.mjs';
const env={PAYPAL_MODE:'sandbox',PRINT_PROVIDER:'finerworks',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app'};
const a={name:'Test Buyer',street1:'123 Test St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
const item={id:'test-print',provider:'finerworks',sku:'5M144M8S7.5X6',quantity:1,amount:'25.00',imageSize:{width:7.5,height:6},paperSize:{width:7.5,height:6},assetUrl:'https://vermillionaurora.com/gallery-images/portrait-in-gold.jpg'};
const products=groupPrintProducts([item],'po');
function reply(po='po',qty=1){return {status:{success:true},orders:[{order_po:po,options:[{id:42,rate:8.95,shipping_method:'Ground',carrier:'UPS',calculated_total:{order_po:po,order_subtotal:7*qty,order_shipping_rate:8.95,order_sales_tax:0,order_discount:0,order_expedite_fee:0,order_credits_used:0,order_grand_total:7*qty+8.95,product_pricing:[{product_sku:item.sku,product_qty:qty,total_price:7*qty}]}}]}]};}
test('keeps shipping unmarked-up and accounts for supplier tax separately',()=>{
  let data=reply();data.orders[0].options[0].calculated_total.order_sales_tax=1.23;data.orders[0].options[0].calculated_total.order_grand_total=17.18;
  const q=shippingOptions(data,'po',products)[0];assert.equal(q.shipping,'8.95');assert.equal(q.productionCost,'7.00');assert.equal(q.supplierTax,'1.23');assert.equal(q.maximumProviderCost,'17.18');assert.equal(q.shippingMethod,'42');
});
test('rejects mismatched order IDs, quantities, duplicate rows, missing totals and malformed money',()=>{
  for(const alter of [d=>d.orders[0].order_po='other',d=>d.orders.push(d.orders[0]),d=>d.orders[0].options[0].id=0,d=>d.orders[0].options[0].rate='8.95',d=>d.orders[0].options[0].calculated_total.product_pricing[0].product_qty=2,d=>d.orders[0].options[0].calculated_total.order_grand_total=0]) {const d=reply();alter(d);assert.throws(()=>shippingOptions(d,'po',products));}
});
test('groups identical manufacturing codes without losing quantities; no size or country changes',()=>{
  assert.equal(groupPrintProducts([item,{...item,id:'second',quantity:2}],'po')[0].product_qty,3);
  assert.throws(()=>groupPrintProducts([{...item,paperSize:{width:8,height:6}}],'po'));
  assert.throws(()=>groupPrintProducts([item,item],'po'));
  assert.throws(()=>finerworksRecipient({...a,country:'GB'},'po'));
  assert.throws(()=>finerworksRecipient({...a,name:'Test'},'po'));
});
test('preflight cannot become a billed order even if called incorrectly',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({status:{success:true}});});
  const b={orders:[{test_mode:true}],validate_only:true,payment_token:'xxxx'};
  await finerworksRequest(env,'/v3/submit_orders_v2',b);
  for(const bad of [{...b,validate_only:false},{...b,payment_token:'invoice'},{...b,orders:[{test_mode:false}]}]) await assert.rejects(finerworksRequest(env,'/v3/submit_orders_v2',bad));
  await assert.rejects(finerworksRequest({...env,PAYPAL_MODE:'live'},'/v3/submit_orders_v2',b));assert.equal(calls,1);
});
test('complete quote uses verified dimensions and separate shipping, then validation-only with three safety flags',async t=>{
  const calls=[];
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    const b=init.body?JSON.parse(init.body):null,p=new URL(url).pathname;calls.push({p,b});
    if(p.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
    if(p.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',custom_sizing:true,allow_decimal:true,allow_rotate:true,min:{width:4,height:4},max:{width:40,height:90},border_size:0,bleed_amt:0.06}]);
    if(p.endsWith('get_prices'))return Response.json([{product_code:item.sku,product_qty:1,total_price:7,product_price:7}]);
    if(p.endsWith('list_shipping_options_multiple'))return Response.json(reply(b.orders[0].order_po,b.orders[0].order_items[0].product_qty));
    if(p.endsWith('submit_orders_v2')){assert.equal(b.validate_only,true);assert.equal(b.payment_token,'xxxx');assert.equal(b.orders[0].test_mode,true);return Response.json({status:{success:true}});}
    throw Error('Unexpected request');
  });
  const q=await quoteFinerWorksPrints(env,[{...item,quantity:2}],a);assert.equal(q.shipping,'8.95');assert.equal(q.shippingMarkup,'0.00');assert.equal(q.productionCost,'14.00');
  const validated=await validateFinerWorksPrintOrder(env,[{...item,quantity:2}],a,q);assert.equal(validated.ordersSubmitted,false);
  await assert.rejects(validateFinerWorksPrintOrder(env,[item],a,q));
  await assert.rejects(validateFinerWorksPrintOrder(env,[{...item,quantity:2}],{...a,zip:'98104'},q));
  assert.equal(calls.filter(c=>c.p.endsWith('submit_orders_v2')).length,1);
});
