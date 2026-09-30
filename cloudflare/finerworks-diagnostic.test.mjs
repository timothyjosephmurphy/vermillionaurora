import {test,afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {finerworksDiagnostic} from './finerworks-diagnostic.mjs';
const originalFetch=globalThis.fetch;
const env={PAYPAL_MODE:'sandbox',PRINT_CHECKOUT_ENABLED:'false',FINERWORKS_WEB_API_KEY:'private-web',FINERWORKS_APP_KEY:'private-app',FINERWORKS_AUDIT_TOKEN:`${Date.now()+600000}.${'a'.repeat(64)}`};
const products=[{id:'test-art',type:'painting',title:'Test Art',dimensions:{width:15,height:12,unit:'in'}}];
const req=(body={})=>new Request('https://worker/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${env.FINERWORKS_AUDIT_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(body)});
afterEach(()=>{globalThis.fetch=originalFetch;});
test('rejects unauthenticated diagnostics before calling provider',async()=>{
  globalThis.fetch=()=>assert.fail('Must not fetch');
  assert.equal((await finerworksDiagnostic(new Request('https://worker/checkout/prints/verify',{method:'POST',body:'{}'}),env,products)).status,404);
});
test('refuses live checkout diagnostics',async()=>{
  globalThis.fetch=()=>assert.fail('Must not fetch');
  assert.equal((await finerworksDiagnostic(req(),{...env,PAYPAL_MODE:'live'},products)).status,409);
});
test('credential check returns no key, account, billing details or upstream debug',async()=>{
  globalThis.fetch=async()=>Response.json({status:{success:true,debug:{key:env.FINERWORKS_APP_KEY}},user_account:{web_api_key:env.FINERWORKS_WEB_API_KEY,billing_info:{address_1:'private'}}});
  const response=await finerworksDiagnostic(req(),env,products);const data=await response.json();
  assert.equal(data.credentialsOk,true);assert.equal(data.providerAppMode,'not-verified');assert.ok(!JSON.stringify(data).includes('private'));
});
test('health reports configured credentials without validating or leaking them',async()=>{
  globalThis.fetch=()=>assert.fail('Health must not fetch');
  const data=await (await finerworksDiagnostic(new Request('https://worker/checkout/prints/health'),env,products)).json();
  assert.equal(data.mode,'sandbox');assert.equal(data.readOnly,true);assert.equal(data.enabled,false);assert.equal(data.webApiKeyConfigured,true);assert.ok(!JSON.stringify(data).includes('private'));
});
test('prices derive all three sizes from catalog originals; client enlargement is ignored',async()=>{
  const calls=[];
  globalThis.fetch=async(url,init)=>{
    const body=JSON.parse(init.body);calls.push(url);
    if(url.endsWith('list_media_types'))return Response.json({status:{success:true},media_types:[{id:6,product_type_id:5,name:'Archival Matte',style_ids:[9]}]});
    if(url.endsWith('list_style_types'))return Response.json({status:{success:true},style_types:[{id:9,name:'Unframed',custom_sizing:true,allow_decimal:true,allow_rotate:true,min:{width:4,height:4},max:{width:40,height:60},available_sizes:[]}]});
    assert.ok(url.endsWith('get_prices'));
    return Response.json({status:{success:true},prices:body.products.map(p=>({...p,product_code:p.product_sku,product_price:10,total_price:10}))});
  };
  const data=await (await finerworksDiagnostic(req({task:'prices',productIds:['test-art'],mediaId:6,styleId:9,scale:2,width:100,height:100}),env,products)).json();
  assert.deepEqual(data.candidates.map(c=>[c.size.width,c.size.height]),[[15,12],[11.25,9],[7.5,6]]);
  assert.ok(data.candidates.every(c=>c.ok&&c.sellable===false&&c.size.width<=c.original.width&&c.size.height<=c.original.height));
  assert.equal(calls.length,3);assert.ok(calls.every(c=>!c.includes('order')));
});
test('unknown artworks and oversized batches are rejected without provider calls',async()=>{
  globalThis.fetch=()=>assert.fail('Must not fetch');
  for(const productIds of [['unknown'],Array.from({length:11},(_,i)=>`art-${i}`)])assert.equal((await finerworksDiagnostic(req({task:'prices',productIds,mediaId:6,styleId:9}),env,products)).status,400);
});

test('expired diagnostic tokens cannot call the provider',async()=>{
  globalThis.fetch=()=>assert.fail('Must not fetch');
  const token=`${Date.now()-1}.${'a'.repeat(64)}`;
  const request=new Request('https://worker/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${token}`},body:'{}'});
  assert.equal((await finerworksDiagnostic(request,{...env,FINERWORKS_AUDIT_TOKEN:token},products)).status,404);
});
