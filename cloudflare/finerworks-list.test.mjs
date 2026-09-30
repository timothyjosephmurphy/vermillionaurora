import {test} from 'node:test';
import assert from 'node:assert/strict';
import {finerworksListEnvelope,finerworksValidationEnvelope} from './finerworks-list.mjs';
import {finerworksRequest} from './finerworks-api.mjs';
const media={id:6,product_type_id:1,name:'Paper',style_ids:[9]};
const style={id:9,name:'No Border',custom_sizing:true,allow_decimal:true,allow_rotate:true};
test('bare material and style lists normalize without inventing provider success',()=>{
  const m=finerworksListEnvelope('/v3/list_media_types',[media]);
  assert.deepEqual(m,{media_types:[media]});assert.equal(m.status,undefined);
  assert.deepEqual(finerworksListEnvelope('/v3/list_style_types',[style]),{style_types:[style]});
});
test('bare price lists retain exact costs for downstream quote validation',()=>{
  const p={product_qty:1,product_code:'1M6M9S12X15',product_price:12.34,total_price:12.34};
  assert.deepEqual(finerworksListEnvelope('/v3/get_prices',[p]),{prices:[p]});
  assert.equal(finerworksListEnvelope('/v3/get_prices',[{...p,total_price:'12.34'}]),null);
});
test('never promotes error objects, untyped data, or credentials/orders to success',()=>{
  for(const value of [{status:{success:false},media_types:[media]},[{}],[null],['error'],[{...media,error:'denied'}]])
    assert.equal(finerworksListEnvelope('/v3/list_media_types',value),null);
  for(const path of ['/v3/test_my_credentials','/v3/submit_orders','https://example.com'])
    assert.equal(finerworksListEnvelope(path,[media]),null);
  assert.equal(finerworksListEnvelope('/v3/list_style_types',[media]),null);
  assert.equal(finerworksListEnvelope('/v3/list_style_types',[{...style,allow_decimal:'true'}]),null);
});
test('HTTP failures and credential success gates remain strict for array-shaped replies',async()=>{
 const original=globalThis.fetch;
 const env={PAYPAL_MODE:'sandbox',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app'};
 try{
  globalThis.fetch=async()=>Response.json([media]);
  assert.deepEqual(await finerworksRequest(env,'/v3/list_media_types',{}),{media_types:[media]});
  await assert.rejects(finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET'),/read-only request failed/);
  globalThis.fetch=async()=>Response.json([media],{status:500});
  await assert.rejects(finerworksRequest(env,'/v3/list_media_types',{}),/HTTP 500/);
  globalThis.fetch=async()=>Response.json({status:{success:false},media_types:[media]});
  await assert.rejects(finerworksRequest(env,'/v3/list_media_types',{}),/read-only request failed/);
 }finally{globalThis.fetch=original;}
});
test('documented-code validation tolerates the observed empty 404 envelope only for exact valid rows',async t=>{
 const code='5M144M8S7DD5X6F0S10X8J1S7DD5X6',path='/v3/validate_product',body={skus_or_codes:[code]};
 const data={status:{success:false,status_code:404,message:''},product_validations:[{product_code:code,product_sku:null,valid:true,validation_message:'Product appears to be valid.'}]};
 const env={PAYPAL_MODE:'sandbox',FINERWORKS_WEB_API_KEY:'test-web',FINERWORKS_APP_KEY:'test-app'};
 t.mock.method(globalThis,'fetch',async()=>Response.json(data,{status:404}));
 assert.deepEqual(await finerworksRequest(env,path,body),{product_validations:data.product_validations});
 for(const bad of [
  {...data,status:{...data.status,message:'Unauthorized'}},
  {...data,product_validations:[{...data.product_validations[0],valid:false}]},
  {...data,product_validations:[{...data.product_validations[0],product_code:'another-code'}]},
  {...data,product_validations:[...data.product_validations,...data.product_validations]},
  {...data,product_validations:[]}
 ])assert.equal(finerworksValidationEnvelope(path,404,bad,body),null);
 for(const status of [401,403,429,500])assert.equal(finerworksValidationEnvelope(path,status,data,body),null);
 assert.equal(finerworksValidationEnvelope('/v3/submit_orders_v2',404,data,body),null);
 await assert.rejects(finerworksRequest(env,path,{skus_or_codes:['different']}),/HTTP 404/);
});
