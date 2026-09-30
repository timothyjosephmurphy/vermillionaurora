import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteFinerWorksPrints} from './finerworks-quotes.mjs';
test('shipping quotes include the server-approved image required by the provider order model',async t=>{
  const env={PAYPAL_MODE:'sandbox',PRINT_PROVIDER:'finerworks',FINERWORKS_WEB_API_KEY:'fake',FINERWORKS_APP_KEY:'fake'},url='https://vermillionaurora.com/gallery-images/portrait-in-gold.jpg';
  let shippingCalled=false;
  t.mock.method(globalThis,'fetch',async(u,init)=>{
    const p=new URL(u).pathname,b=JSON.parse(init.body);
    if(p.endsWith('list_media_types'))return Response.json([{id:144,product_type_id:5,name:'Watercolor Bright White',style_ids:[8]}]);
    if(p.endsWith('list_style_types'))return Response.json([{id:8,name:'Borderless',custom_sizing:true,allow_decimal:true,allow_rotate:true,min:{width:4,height:4},max:{width:40,height:90}}]);
    if(p.endsWith('get_prices'))return Response.json([{product_code:'5M144M8S7.5X6',product_qty:1,total_price:7,product_price:7}]);
    assert.match(p,/list_shipping_options_multiple$/);shippingCalled=true;assert.deepEqual(b.orders[0].order_items[0].product_image,{product_url_file:url,product_url_thumbnail:url});
    return Response.json({status:{success:false}});
  });
  await assert.rejects(quoteFinerWorksPrints(env,[{id:'test',provider:'finerworks',sku:'5M144M8S7.5X6',quantity:1,amount:'25.00',imageSize:{width:7.5,height:6},paperSize:{width:7.5,height:6},assetUrl:url}],{name:'Test Buyer',street1:'Test Street',city:'Seattle',state:'WA',zip:'98104',country:'US'}));
  assert.equal(shippingCalled,true);
});
