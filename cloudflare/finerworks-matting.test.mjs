import test from 'node:test';
import assert from 'node:assert/strict';
import {matLayout} from '../catalog/matting.mjs';
import {matProductBuild,buildMattedProduct,quoteMattedOption} from './finerworks-matting.mjs';
import {groupPrintProducts,quoteFinerWorksPrints,validateFinerWorksPrintOrder} from './finerworks-quotes.mjs';
const env={PAYPAL_MODE:'sandbox',PRINT_PROVIDER:'finerworks',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app'};
const media={id:144,productTypeId:5,styleIds:[8]},style={id:8,canMat:true,allowDecimal:true,customSizing:true,allowRotate:true,min:{width:4,height:4},max:{width:40,height:90}};
const image={width:7.5,height:6},paper={...image,sku:'5M144M8S7.5X6'},material={id:1,name:'Snow White',thickness:4,minWidth:4,minHeight:4,maxWidth:30,maxHeight:40},mat=matLayout(paper,image,material);
const sku='5M144M8S7.5X6-MAT1S10X8',address={name:'Sandbox Test',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'};
function mockProvider(t,{valid=true,code=sku}={}){
  const calls=[];t.mock.method(globalThis,'fetch',async(url,init)=>{
    const endpoint=new URL(url).pathname,body=JSON.parse(init.body);calls.push({endpoint,body});
    if(endpoint.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
    if(endpoint.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',can_mat:true,custom_sizing:true,allow_decimal:true,allow_rotate:true,min:style.min,max:style.max}]);
    if(endpoint.endsWith('list_mats'))return Response.json([{id:1,name:'Snow White',thickness:4,min_width:4,min_height:4,max_width:30,max_height:40}]);
    if(endpoint.endsWith('build_product_code'))return Response.json({status:{success:true},product_code:code});
    if(endpoint.endsWith('validate_product'))return Response.json({status:{success:true},product_validations:[{product_code:code,valid}]});
    if(endpoint.endsWith('get_prices'))return Response.json([{product_code:code,product_qty:1,product_price:7,add_mat_1_price:5,total_price:12}]);
    if(endpoint.endsWith('list_shipping_options_multiple')){
      const order=body.orders[0],qty=order.order_items[0].product_qty;
      return Response.json({status:{success:true},orders:[{order_po:order.order_po,options:[{id:42,rate:9.95,shipping_method:'Ground',carrier:'UPS',calculated_total:{order_po:order.order_po,order_subtotal:12*qty,order_shipping_rate:9.95,order_sales_tax:0,order_grand_total:12*qty+9.95,product_pricing:[{product_code:code,product_qty:qty,total_price:12*qty}]}}]}]});
    }
    if(endpoint.endsWith('submit_orders_v2'))return Response.json({status:{success:true}});
    throw Error('Unexpected endpoint');
  });return calls;
}
test('builder retains image and paper sizes, mat window and outer size; no frame or glazing',()=>{
  const b=matProductBuild(media,style,image,paper,mat);assert.equal(b.PrintW,7.5);assert.equal(b.PrintH,6);assert.equal(b.FrameW,10);assert.equal(b.FrameH,8);assert.equal(b.Mat1WindowW,7.5);assert.equal(b.FrameID,0);assert.equal(b.GlassID,0);
  assert.throws(()=>matProductBuild(media,{...style,canMat:false},image,paper,mat));
  assert.throws(()=>matProductBuild(media,style,image,paper,{...mat,window:{width:7,height:6}}));
});
test('a generated but inactive mat product is never accepted',async t=>{mockProvider(t,{valid:false});await assert.rejects(buildMattedProduct(env,media,style,image,paper,mat),/did not validate/);});
test('complete mat quote, quantities, shipping and validation-only preflight retain the combined code',async t=>{
  const calls=mockProvider(t),o=await quoteMattedOption(env,{media:[media],styles:[style]},{id:'print-pilot-small',key:'small',image,paper});
  assert.equal(o.pricing.recommendedAmount,'45.00');assert.equal(o.sellable,false);
  const item={id:o.id,provider:'finerworks',sku:o.sku,baseSku:o.baseSku,mat:o.mat,imageSize:image,paperSize:image,quantity:2,amount:'45.00',assetUrl:'https://media.vermillionaurora.com/prints/test.jpg'};
  const q=await quoteFinerWorksPrints(env,[item],address);assert.equal(q.productionCost,'24.00');assert.equal(q.shipping,'9.95');assert.equal(q.shippingMarkup,'0.00');
  const result=await validateFinerWorksPrintOrder(env,[item],address,q);assert.equal(result.ordersSubmitted,false);
  const submission=calls.find(c=>c.endpoint.endsWith('submit_orders_v2')).body;
  assert.equal(submission.validate_only,true);assert.equal(submission.orders[0].test_mode,true);assert.equal(submission.payment_token,'xxxx');assert.equal(submission.orders[0].order_items[0].product_sku,sku);assert.equal(submission.orders[0].order_items[0].product_qty,2);
  await assert.rejects(validateFinerWorksPrintOrder(env,[{...item,mat:{...mat,id:2}}],address,q),/Refresh/);
  await assert.rejects(quoteFinerWorksPrints(env,[{...item,sku:'other-mat'}],address),/configuration changed/);
  assert.throws(()=>groupPrintProducts([{...item,mat:{...mat,outer:{width:7,height:6}}}],'test'));
});
