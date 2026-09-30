import {test,afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {finerworksRequest,finerworksEnvironment,finerworksMaterials,finerworksPrices,finerworksProductCode,finerworksSizeAllowed} from './finerworks-api.mjs';
const originalFetch=globalThis.fetch;
const env={PAYPAL_MODE:'sandbox',FINERWORKS_WEB_API_KEY:'private-web-key',FINERWORKS_APP_KEY:'private-app-key'};
afterEach(()=>{globalThis.fetch=originalFetch;});
const style={id:9,customSizing:true,allowDecimal:true,allowRotate:true,min:{width:4,height:4},max:{width:40,height:60},availableSizes:[]};
const media={id:6,productTypeId:5,styleIds:[9]};
test('requires explicit checkout environment and both keys',()=>{
  assert.equal(finerworksEnvironment(env),'sandbox');assert.equal(finerworksEnvironment({},false),null);
  for(const bad of [{...env,PAYPAL_MODE:undefined},{...env,FINERWORKS_WEB_API_KEY:''},{...env,FINERWORKS_APP_KEY:''}])assert.throws(()=>finerworksEnvironment(bad));
});
test('read-only allowlist blocks orders, arbitrary URLs and method changes without fetching',async()=>{
  globalThis.fetch=()=>assert.fail('Must not call vendor');
  for(const [path,method] of [['/v3/submit_orders','POST'],['/v3/submit_orders_v2','POST'],['https://attacker.test','GET'],['/v3/test_my_credentials','POST'],['/v3/get_prices','GET']])await assert.rejects(finerworksRequest(env,path,undefined,method));
});
test('credentials stay in HTTPS headers and redirects are refused',async()=>{
  globalThis.fetch=async(url,options)=>{assert.equal(url,'https://v2.api.finerworks.com/v3/test_my_credentials');assert.equal(options.method,'GET');assert.equal(options.body,undefined);assert.equal(options.redirect,'manual');assert.equal(options.headers.app_key,env.FINERWORKS_APP_KEY);assert.equal(options.headers.web_api_key,env.FINERWORKS_WEB_API_KEY);return Response.json({status:{success:true}});};
  await finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET');
});
test('rejects missing or false success and hides upstream debug/errors',async()=>{
  for(const data of [{},{status:{success:false,message:env.FINERWORKS_WEB_API_KEY,debug:env}},{status:{success:'true'}}]){
    globalThis.fetch=async()=>Response.json(data);
    await assert.rejects(finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET'),e=>!e.message.includes('private-')&&e.message.includes('failed'));
  }
});
test('sanitizes materials and retains supported sizing constraints',async()=>{
  globalThis.fetch=async(url)=>Response.json(url.endsWith('list_media_types')?{status:{success:true},media_types:[{id:6,product_type_id:5,name:'Archival Matte',style_ids:[9],secret:'not forwarded'}]}:{status:{success:true},style_types:[{id:9,custom_sizing:true,allow_decimal:true,allow_rotate:true,min:style.min,max:style.max,available_sizes:[],debug:'not forwarded'}]});
  const result=await finerworksMaterials(env);assert.equal(result.media[0].secret,undefined);assert.equal(result.styles[0].debug,undefined);assert.equal(result.styles[0].allowDecimal,true);
});
test('exact unframed codes preserve fractional sizes and check linked material IDs',()=>{
  assert.equal(finerworksProductCode(media,style,{width:11.25,height:9}),'5M6M9S11.25X9');
  assert.throws(()=>finerworksProductCode({...media,styleIds:[1]},style,{width:12,height:15}));
  assert.throws(()=>finerworksProductCode(media,style,{width:80,height:100}));
  assert.equal(finerworksSizeAllowed({...style,allowDecimal:false},{width:11.25,height:9}),false);
  assert.equal(finerworksSizeAllowed({...style,customSizing:false,availableSizes:[{width:8,height:10}]},{width:10,height:8}),true);
  assert.equal(finerworksSizeAllowed({...style,min:null},{width:8,height:10}),false);
});
test('prices use v2 products envelope, single copies, and exclude shipping and tax',async()=>{
  globalThis.fetch=async(url,options)=>{assert.equal(url,'https://v2.api.finerworks.com/v3/get_prices');assert.deepEqual(JSON.parse(options.body),{products:[{product_qty:1,product_sku:'5M6M9S12X15'}]});return Response.json({status:{success:true},prices:[{product_qty:1,product_code:'5M6M9S12X15',product_price:10.25,total_price:10.25,debug:env}]});};
  const [p]=await finerworksPrices(env,['5M6M9S12X15']);assert.equal(p.productionCost,'10.25');assert.equal(p.shippingIncluded,false);assert.equal(p.taxIncluded,false);assert.equal(p.debug,undefined);
});
test('unmatched, zero, missing, or duplicate quotes are not invented or accepted',async()=>{
  for(const prices of [[],[{product_code:'other',product_qty:1,total_price:9}],[{product_code:'5M6M9S12X15',product_qty:1,product_price:0,total_price:0}],[{product_code:'5M6M9S12X15',product_qty:1,product_price:null,total_price:4}]]){
    globalThis.fetch=async()=>Response.json({status:{success:true},prices});assert.equal((await finerworksPrices(env,['5M6M9S12X15']))[0].ok,false);
  }
});

test('trims harmless pasted whitespace before transmitting keys',async()=>{
  globalThis.fetch=async(url,options)=>{assert.equal(options.headers.web_api_key,env.FINERWORKS_WEB_API_KEY);assert.equal(options.headers.app_key,env.FINERWORKS_APP_KEY);return Response.json({status:{success:true}});};
  await finerworksRequest({...env,FINERWORKS_WEB_API_KEY:' '+env.FINERWORKS_WEB_API_KEY+'\n',FINERWORKS_APP_KEY:'\t'+env.FINERWORKS_APP_KEY+' '},'/v3/test_my_credentials',undefined,'GET');
});
test('classifies non-JSON API failures without leaking response content or keys',async()=>{
  globalThis.fetch=async()=>new Response('Invalid app_key: '+env.FINERWORKS_APP_KEY,{status:400,headers:{'Content-Type':'text/html'}});
  await assert.rejects(finerworksRequest(env,'/v3/list_media_types',{}),e=>e.message==='FinerWorks read-only request failed (HTTP 400; html; app-key-rejected)'&&!e.message.includes('private-'));
});
test('never follows redirects with FinerWorks credentials',async()=>{
  let calls=0;globalThis.fetch=async()=>{calls++;return new Response(null,{status:302,headers:{Location:'https://attacker.test/'}});};
  await assert.rejects(finerworksRequest(env,'/v3/list_media_types',{}),/HTTP 302; redirect/);assert.equal(calls,1);
});
