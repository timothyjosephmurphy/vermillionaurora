import test from 'node:test';
import assert from 'node:assert/strict';
import {etsyListings} from './etsy-listings.mjs';
import {ETSY_ORIGIN,write} from './etsy-connection.mjs';
const now=Date.parse('2026-10-02T10:00:00Z');
class Bucket{
 data=new Map();sequence=0;
 async get(key){const x=this.data.get(key);return x?{etag:x.etag,json:async()=>JSON.parse(x.value)}:null}
 async put(key,value,options){const prev=this.data.get(key),c=options.onlyIf;if(c.etagMatches&&prev?.etag!==c.etagMatches)return null;if(c.etagDoesNotMatch==='*'&&prev)return null;const x={value,etag:String(++this.sequence)};this.data.set(key,x);return x}
}
const setup=()=>({ETSY_KEYSTRING:'test-key',ETSY_SHARED_SECRET:'test-secret',COMMISSION_MANAGER_TOKEN:'manager',COMMISSION_UPLOADS:new Bucket()});
async function connected(env){await write(env,{connection:{shopId:42,shopName:'VermillionAurora',userId:'123',accessToken:'123.access',refreshToken:'123.refresh',expiresAt:now+3600000,scopes:['shops_r','listings_r','listings_w']},pending:null},null)}
function req(env,path,body={},origin=ETSY_ORIGIN,authorization='Bearer manager'){return etsyListings(new Request(ETSY_ORIGIN+path,{method:'POST',headers:{Origin:origin,Authorization:authorization,'Content-Type':'application/json'},body:JSON.stringify(body)}),env,now)}
function mockEtsy(t,{failFirstInventory=false}={}){
 let nextId=900,inventoryCounts=[],failed=false;
 const calls=[];
 t.mock.method(globalThis,'fetch',async(url,options={})=>{
  const target=String(url);calls.push({url:target,options});
  if(target.startsWith('https://vermillionaurora.com/'))return new Response(new Uint8Array([1,2,3]),{headers:{'Content-Type':'image/jpeg'}});
  if(target.endsWith('/shipping-profiles'))return Response.json({results:[{shipping_profile_id:11,title:'US Shipping'}]});
  if(target.includes('/readiness-state-definitions?legacy=false'))return Response.json({results:[{readiness_state_id:22,readiness_state:'made_to_order',min_processing_time:5,max_processing_time:8,processing_time_unit:'days'}]});
  if(target.endsWith('/production-partners'))return Response.json({results:[{production_partner_id:33,partner_name:'FinerWorks'}]});
  if(target.endsWith('/seller-taxonomy/nodes'))return Response.json([{id:44,name:'Art & Collectibles',children:[{id:55,name:'Prints',children:[]}]}]);
  if(target.includes('/inventory?')){const body=JSON.parse(options.body);inventoryCounts.push(body.products.length);if(failFirstInventory&&!failed){failed=true;return new Response(JSON.stringify({error:'private provider error'}),{status:500,headers:{'Content-Type':'application/json'}})}return Response.json({products:body.products})}
  if(target.endsWith('/images'))return Response.json({listing_image_id:++nextId});
  if(target.includes('/listings?legacy=false'))return Response.json({listing_id:++nextId,state:'draft'});
  throw Error('Unexpected mocked Etsy URL '+target);
 });
 return {calls,inventoryCounts};
}
test('owner token and exact origin guard setup endpoints',async t=>{
 const env=setup();await connected(env);mockEtsy(t);
 assert.equal((await req(env,'/etsy/listings/preflight',{},ETSY_ORIGIN,'Bearer wrong')).status,403);
 assert.equal((await req(env,'/etsy/listings/preflight',{},'https://evil.test')).status,403);
 assert.equal((await req(env,'/etsy/listings/preflight')).status,200);
});
test('loads the Etsy processing interval using the non-legacy profile response',async t=>{\n const env=setup();await connected(env);const {calls}=mockEtsy(t);\n const res=await req(env,'/etsy/listings/preflight');assert.equal(res.status,200);\n const data=await res.json();assert.equal(data.readiness[0].name,'Made to order · 5–8 days');\n assert.ok(calls.some(x=>x.url.endsWith('/readiness-state-definitions?legacy=false')));\n});\n\ntest('creates exactly five saved drafts with ready size and frame combinations, never activating them',async t=>{
 const env=setup();await connected(env);const {calls,inventoryCounts}=mockEtsy(t);
 const res=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55});
 assert.equal(res.status,200,await res.clone().text());
 const data=await res.json();
 assert.equal(data.batch.status,'complete');
 assert.deepEqual(data.batch.items.map(x=>x.status),Array(5).fill('draft ready'));
 assert.deepEqual(inventoryCounts,[12,12,8,4,8]);
 assert.equal(calls.filter(x=>x.url.endsWith('/images')).length,5);
 const titles=calls.filter(x=>x.url.includes('/listings?legacy=false')).map(x=>new URLSearchParams(x.options.body).get('title'));
 assert.match(titles[3],/Landscape/);assert.match(titles[4],/Portrait/);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,5);
 for(const entry of calls.filter(x=>x.url.includes('/listings?legacy=false'))){
  const form=new URLSearchParams(entry.options.body);
  assert.match(form.get('title'),/Art Print/);
  assert.equal(form.get('shipping_profile_id'),'11');
  assert.equal(form.get('production_partner_ids'),'33');
  assert.notEqual(form.get('state'),'active');
 }
 const before=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 const again=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55});
 assert.equal(again.status,200);
 assert.equal((await again.json()).resumed,true);
 const after=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 assert.equal(after,before);
});

test('partial provider failure resumes saved progress without duplicating a listing',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{failFirstInventory:true});
 const settings={shippingProfileId:11,readinessStateId:22,taxonomyId:55};
 const first=await req(env,'/etsy/listings/create-drafts',settings);
 assert.equal(first.status,502);
 const failure=await first.json();assert.doesNotMatch(failure.error,/private provider error/);
 assert.match(failure.error,/resume/i);
 const creates=()=>calls.filter(x=>x.url.includes('/listings?legacy=false')).length;
 const images=()=>calls.filter(x=>x.url.endsWith('/images')).length;
 assert.equal(creates(),1);assert.equal(images(),1);
 const retry=await req(env,'/etsy/listings/create-drafts',settings);
 assert.equal(retry.status,200,await retry.clone().text());
 assert.equal((await retry.json()).batch.status,'complete');
 assert.equal(creates(),5);assert.equal(images(),5);
});
