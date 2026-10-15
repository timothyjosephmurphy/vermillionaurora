import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteFramedSelections} from './finerworks-framing.mjs';
import {quoteFinerWorksPrints} from './finerworks-quotes.mjs';

const env={CHECKOUT_MODE:'sandbox',PRINT_PROVIDER:'finerworks',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app'};
const media={id:144,productTypeId:5,styleIds:[8]};
const style={id:8,canMat:true,allowDecimal:true,customSizing:true,allowRotate:true,min:{width:4,height:4},max:{width:40,height:90}};
const address={name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'};
const selections=Array.from({length:12},(_,i)=>{
  const width=Number((7.5+i*.1).toFixed(1));
  return {option:{id:`print-batch-${i}`,amount:'25.00',image:{width:width-.25,height:5.75},paper:{width,height:6,sku:`5M144M8S${width}X6`},sizeBasis:'image-proportional'},frameKeys:['black']};
});
function provider(t){
  const calls=[],control={limit:Infinity,invalid:false};
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    const endpoint=new URL(url).pathname,body=JSON.parse(init.body);calls.push({endpoint,body});
    if(calls.length>control.limit)throw Error('Too many subrequests');
    if(endpoint.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
    if(endpoint.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',can_mat:true,custom_sizing:true,allow_decimal:true,allow_rotate:true,min:style.min,max:style.max}]);
    if(endpoint.endsWith('list_collections'))return Response.json([{id:1,name:'Gallery Economy',frames:[{id:1,name:'Standard Black',color:'black',composite:'Solid Wood with Veneer',thickness:.88,allow_matting:true,allow_glazing:true,min_width:4,min_height:4,max_width:24,max_height:36}]}]);
    if(endpoint.endsWith('list_glazing'))return Response.json([{id:1,name:'Premium Clear'}]);
    if(endpoint.endsWith('list_mats'))return Response.json([{id:1,name:'Snow White',thickness:4,min_width:4,min_height:4,max_width:30,max_height:40}]);
    if(endpoint.endsWith('build_product_code')){
      const b=body.build,part=n=>String(n).replaceAll('.','DD');
      return Response.json({status:{success:true},product_code:`5M144M8S${part(b.PrintW)}X${part(b.PrintH)}F1S${part(b.FrameW)}X${part(b.FrameH)}J1G1`});
    }
    if(endpoint.endsWith('validate_product'))return Response.json({status:{success:true},product_validations:body.skus_or_codes.map((sku,i)=>({product_code:sku,valid:!(control.invalid&&i===body.skus_or_codes.length-1)}))});
    if(endpoint.endsWith('get_prices'))return Response.json(body.products.map(p=>({product_code:p.product_sku,product_qty:1,product_price:7,add_mat_1_price:5,add_frame_price:21,add_glazing_price:7,total_price:40})));
    if(endpoint.endsWith('list_shipping_options_multiple')){
      const o=body.orders[0],quantity=o.order_items.reduce((n,p)=>n+p.product_qty,0);
      return Response.json({status:{success:true},orders:[{order_po:o.order_po,options:[{id:42,rate:12.95,shipping_method:'Ground',carrier:'UPS',calculated_total:{order_po:o.order_po,order_subtotal:40*quantity,order_shipping_rate:12.95,order_sales_tax:0,order_grand_total:40*quantity+12.95,product_pricing:o.order_items.map(p=>({product_code:p.product_sku,product_qty:p.product_qty,total_price:40}))}}]}]});
    }
    throw Error(`Unexpected provider request: ${endpoint}`);
  });
  return {calls,control};
}
async function cartItems(){
  const groups=await quoteFramedSelections(env,{media:[media],styles:[style]},selections);
  return groups.map(([o])=>({id:o.id,type:'print',title:o.id,provider:'finerworks',sku:o.sku,baseSku:o.baseSku,frame:o.frame,mat:o.mat,imageSize:o.image,paperSize:{width:o.paper.width,height:o.paper.height},quantity:1,amount:'58.00',unframedAmount:'25.00',assetUrl:`https://vermillionaurora.com/print-editions/${'a'.repeat(64)}.jpg`,layout:'full-image-white-border-v1',sizeBasis:'image-proportional',layoutApproved:true}));
}
test('a cart of twelve distinct framed prints quotes within the Worker request budget',async t=>{
  const {calls,control}=provider(t),items=await cartItems();
  assert.equal(new Set(items.map(i=>i.sku)).size,12);
  calls.length=0;control.limit=50;
  const quote=await quoteFinerWorksPrints(env,items,address);
  assert.equal(quote.productionCost,'480.00');assert.equal(quote.shipping,'12.95');
  assert(calls.length<50,'Leave room for the tax request after print validation');
  const shipping=calls.find(c=>c.endpoint.endsWith('list_shipping_options_multiple')).body.orders[0];
  assert.deepEqual(shipping.order_items.map(i=>i.product_sku).sort(),items.map(i=>i.sku).sort());
  assert.equal(calls.filter(c=>c.endpoint.endsWith('list_glazing')).length,1);
  assert.equal(calls.filter(c=>c.endpoint.endsWith('list_mats')).length,1);
  assert.equal(calls.filter(c=>c.endpoint.endsWith('validate_product')).length,1);
});
test('batched framing rejects a single invalid configuration before requesting shipping',async t=>{
  const {calls,control}=provider(t),items=await cartItems();
  calls.length=0;control.invalid=true;
  await assert.rejects(quoteFinerWorksPrints(env,items,address),/did not validate the exact framed print/);
  assert(!calls.some(c=>c.endpoint.endsWith('list_shipping_options_multiple')));
});
