import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteFramedOption} from './finerworks-framing.mjs';
import {quoteFinerWorksPrints,validateFinerWorksPrintOrder,groupPrintProducts} from './finerworks-quotes.mjs';
import {newFinerWorksJob,finerworksFulfillmentRecord} from './finerworks-fulfillment.mjs';
import {publicCartItem} from './cart-policy.mjs';
const env={PAYPAL_MODE:'sandbox',PRINT_PROVIDER:'finerworks',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app',FINERWORKS_ORDER_ENABLED:'true',SANDBOX_RETURN_ORIGIN:'https://example.test'};
const media={id:144,productTypeId:5,styleIds:[8]},style={id:8,canMat:true,allowDecimal:true,customSizing:true,allowRotate:true,min:{width:4,height:4},max:{width:40,height:90}};
const image={width:7.5,height:6},paper={...image,sku:'5M144M8S7.5X6'},sku='5M144M8S7DD5X6F1S10X8J1S7DD5X6G1';
const address={name:'Sandbox Test',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'};
function provider(t,{valid=true,missingGlazing=false,frameCost=21}={}) {
  const calls=[];t.mock.method(globalThis,'fetch',async(url,init)=>{
    const endpoint=new URL(url).pathname,body=JSON.parse(init.body);calls.push({endpoint,body});
    if(endpoint.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
    if(endpoint.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',can_mat:true,custom_sizing:true,allow_decimal:true,allow_rotate:true,min:style.min,max:style.max}]);
    if(endpoint.endsWith('list_collections'))return Response.json([{id:1,name:'Gallery Economy',frames:[{id:1,name:'Standard Black',color:'black',composite:'Solid Wood with Veneer',thickness:.88,allow_matting:true,allow_glazing:true,min_width:4,min_height:4,max_width:24,max_height:36}]}]);
    if(endpoint.endsWith('list_glazing'))return Response.json(missingGlazing?[]:[{id:1,name:'Premium Clear'}]);
    if(endpoint.endsWith('list_mats'))return Response.json([{id:1,name:'Snow White',thickness:4,min_width:4,min_height:4,max_width:30,max_height:40}]);
    if(endpoint.endsWith('build_product_code'))return Response.json({status:{success:true},product_code:sku});
    if(endpoint.endsWith('validate_product'))return Response.json({status:{success:true},product_validations:[{product_code:sku,valid}]});
    if(endpoint.endsWith('get_prices'))return Response.json([{product_code:sku,product_qty:1,product_price:7,add_mat_1_price:5,add_frame_price:frameCost,add_glazing_price:7,total_price:19+frameCost}]);
    if(endpoint.endsWith('list_shipping_options_multiple')){
      const o=body.orders[0],qty=o.order_items[0].product_qty;
      return Response.json({status:{success:true},orders:[{order_po:o.order_po,options:[{id:42,rate:12.95,shipping_method:'Ground',carrier:'UPS',calculated_total:{order_po:o.order_po,order_subtotal:40*qty,order_shipping_rate:12.95,order_sales_tax:0,order_grand_total:40*qty+12.95,product_pricing:[{product_code:sku,product_qty:qty,total_price:40}]}}]}]});
    }
    if(endpoint.endsWith('submit_orders_v2')){assert.equal(body.validate_only,true);return Response.json({status:{success:true}});}
    throw Error('Unexpected provider request');
  });return calls;
}
const option=()=>({id:'print-test-small',key:'small',amount:'25.00',image,paper});
test('inset editions retain the whole bordered sheet through framed quoting and fulfillment',async t=>{
  const calls=provider(t),inset={width:7.2467,height:5.7467};
  const o=await quoteFramedOption(env,{media:[media],styles:[style]},{...option(),image:inset},'black');
  const build=calls.find(c=>c.endpoint.endsWith('build_product_code')).body.build;
  assert.deepEqual([build.PrintW,build.PrintH,build.SheetW,build.SheetH,build.Mat1WindowW,build.Mat1WindowH],[7.5,6,7.5,6,7.5,6]);
  const item={id:o.id,type:'print',title:'Framed edition',provider:'finerworks',sku:o.sku,baseSku:o.baseSku,frame:o.frame,mat:o.mat,imageSize:inset,paperSize:image,quantity:1,amount:'58.00',unframedAmount:'25.00',assetUrl:'https://vermillionaurora.com/print-editions/'+ 'a'.repeat(64)+'.jpg',layout:'full-image-white-border-v1',sizeBasis:'image-proportional',layoutApproved:true};
  const quote=await quoteFinerWorksPrints(env,[item],address);
  assert.equal((await validateFinerWorksPrintOrder(env,[item],address,quote)).ordersSubmitted,false);
  const submission=calls.find(c=>c.endpoint.endsWith('submit_orders_v2')).body;
  assert.equal(submission.validate_only,true);assert.equal(submission.orders[0].order_items[0].product_sku,sku);
  assert.equal(submission.orders[0].order_items[0].product_image.product_url_file,item.assetUrl);
  for(const alter of [i=>i.layoutApproved=false,i=>delete i.layout,i=>i.imageSize.width=8,i=>i.mat.window.width=7.2467]){
    const changed=structuredClone(item);alter(changed);assert.throws(()=>groupPrintProducts([changed],'test'));
  }
});
test('framed checkout uses the complete configured code through pricing, shipping, fulfillment and records',async t=>{
  const calls=provider(t),o=await quoteFramedOption(env,{media:[media],styles:[style]},option(),'black');
  assert.equal(o.pricing.recommendedAmount,'58.00');
  const build=calls.find(c=>c.endpoint.endsWith('build_product_code')).body.build;
  assert.deepEqual([build.FrameID,build.GlassID,build.MatID,build.FrameW,build.FrameH,build.PrintW,build.PrintH],[1,1,1,10,8,7.5,6]);
  const item={id:o.id,type:'print',title:'Test framed print',provider:'finerworks',sku:o.sku,baseSku:o.baseSku,frame:o.frame,mat:o.mat,imageSize:image,paperSize:image,quantity:2,amount:'58.00',unframedAmount:'25.00',assetUrl:'https://media.vermillionaurora.com/prints/test.jpg'};
  const quote=await quoteFinerWorksPrints(env,[item],address);assert.equal(quote.productionCost,'80.00');assert.equal(quote.shipping,'12.95');
  await validateFinerWorksPrintOrder(env,[item],address,quote);
  const submission=calls.find(c=>c.endpoint.endsWith('submit_orders_v2')).body;
  assert.equal(submission.orders[0].order_items[0].product_sku,sku);assert.equal(submission.orders[0].order_items[0].product_qty,2);
  await assert.rejects(validateFinerWorksPrintOrder(env,[{...item,frame:{...item.frame,id:2}}],address,quote),/Refresh/);
  await assert.rejects(quoteFinerWorksPrints(env,[{...item,frame:{...item.frame,glazing:{id:2}}}],address),/configuration changed/);
  await assert.rejects(quoteFinerWorksPrints(env,[{...item,amount:'25.00'}],address),/cost changed/);
  await assert.rejects(quoteFinerWorksPrints(env,[{...item,amount:'140.00'}],address),/cost changed/);
  assert.throws(()=>groupPrintProducts([{...item,frame:{...item.frame,size:{width:8,height:10}}}],'test'),/frame/);
  const job=newFinerWorksJob(env,{id:'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',mode:'sandbox',quote:{address,printQuote:quote}},[item]);
  assert.equal(job.request.orders[0].order_items[0].product_sku,sku);assert.deepEqual(finerworksFulfillmentRecord(job).items[0].frame,item.frame);
  assert.equal(publicCartItem(item).frame.glazing.name,'Premium Clear');assert.equal(publicCartItem(item).frame.name,'Black');
});
test('unavailable frame combinations, missing glazing and zero frame prices never become purchasable',async t=>{
  await t.test('invalid combination',async t=>{provider(t,{valid:false});await assert.rejects(quoteFramedOption(env,{media:[media],styles:[style]},option(),'black'),/did not validate/);});
  await t.test('missing glazing',async t=>{const calls=provider(t,{missingGlazing:true});await assert.rejects(quoteFramedOption(env,{media:[media],styles:[style]},option(),'black'),/glazing/);assert(!calls.some(c=>c.endpoint.endsWith('build_product_code')));});
  await t.test('zero frame price',async t=>{provider(t,{frameCost:0});await assert.rejects(quoteFramedOption(env,{media:[media],styles:[style]},option(),'black'),/complete framed print price/);});
});
