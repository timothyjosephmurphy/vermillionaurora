import test from 'node:test';
import assert from 'node:assert/strict';
import {etsyListings} from './etsy-listings.mjs';
import {ETSY_ORIGIN,read,write} from './etsy-connection.mjs';
import prints,{sourcePrintVersion} from './etsy-print-source.mjs';
const now=Date.parse('2026-10-02T10:00:00Z');
class Bucket{
 data=new Map();sequence=0;
 async get(key){const x=this.data.get(key);return x?{etag:x.etag,json:async()=>JSON.parse(x.value)}:null}
 async put(key,value,options){const prev=this.data.get(key),c=options.onlyIf;if(c.etagMatches&&prev?.etag!==c.etagMatches)return null;if(c.etagDoesNotMatch==='*'&&prev)return null;const x={value,etag:String(++this.sequence)};this.data.set(key,x);return x}
}
const setup=()=>({ETSY_KEYSTRING:'test-key',ETSY_SHARED_SECRET:'test-secret',COMMISSION_MANAGER_TOKEN:'manager',COMMISSION_UPLOADS:new Bucket()});
async function connected(env){await write(env,{connection:{shopId:42,shopName:'VermillionAurora',userId:'123',accessToken:'123.access',refreshToken:'123.refresh',expiresAt:now+3600000,scopes:['shops_r','listings_r','listings_w']},pending:null},null)}
function req(env,path,body={},origin=ETSY_ORIGIN,authorization='Bearer manager'){return etsyListings(new Request(ETSY_ORIGIN+path,{method:'POST',headers:{Origin:origin,Authorization:authorization,'Content-Type':'application/json'},body:JSON.stringify(body)}),env,now)}
function mockEtsy(t,{failFirstInventory=false,draftFailure=null,legacyDrafts=[]}={}){
 let nextId=900,inventoryCounts=[],failed=false;
 const calls=[];
 t.mock.method(globalThis,'fetch',async(url,options={})=>{
  const target=String(url);calls.push({url:target,options});
  if(target.startsWith('https://vermillionaurora.com/'))return new Response(new Uint8Array([1,2,3]),{headers:{'Content-Type':'image/jpeg'}});
  if(target.endsWith('/shipping-profiles'))return Response.json({results:[{shipping_profile_id:11,title:'US Shipping'}]});
  if(target.includes('/readiness-state-definitions?legacy=false'))return Response.json({results:[{readiness_state_id:22,readiness_state:'made_to_order',min_processing_days:3,max_processing_days:5,processing_days_display_label:'3–5 days'}]});
  if(target.endsWith('/production-partners'))return Response.json({results:[{production_partner_id:'33',partner_name:'A printing and framing shop'}]});
  if(target.endsWith('/seller-taxonomy/nodes'))return Response.json([{id:44,name:'Art & Collectibles',children:[{id:54,name:'Prints',children:[{id:55,name:'Giclée',children:[]},{id:57,name:'Other',children:[]}]},{id:56,name:'Sculpture',children:[]}]}]);
  if(target.endsWith('/policies/return'))return Response.json({results:[{return_policy_id:66,accepts_returns:false,accepts_exchanges:false,return_deadline:null},{return_policy_id:77,accepts_returns:true,accepts_exchanges:true,return_deadline:30}]});
  if(target.includes('/listings?state=draft')){const offset=Number(new URL(target).searchParams.get('offset'));return Response.json({count:legacyDrafts.length,results:legacyDrafts.slice(offset,offset+100)});}
  if(target.includes('/inventory?')){
   const body=JSON.parse(options.body);inventoryCounts.push(body.products.length);
   // Etsy request prices are numbers in shop currency; its Money object is response-only.
   for(const p of body.products){assert.equal(typeof p.offerings[0].price,'number');assert.ok(p.offerings[0].price>0);assert.equal(p.offerings[0].readiness_state_id,22);}
   assert.deepEqual(body.sku_on_property,[513,514]);
   if(failFirstInventory&&!failed){failed=true;return Response.json({error:'private provider error'},{status:500});}
   return Response.json({products:body.products});
  }
  if(target.endsWith('/images'))return Response.json({listing_image_id:++nextId});
  if(target.includes('/listings?legacy=false')){if(draftFailure&&!failed){failed=true;return Response.json(draftFailure.body,{status:draftFailure.status});}return Response.json({listing_id:++nextId,state:'draft'});}
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
test('loads Etsy processing and a private production partner from the current responses',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 const res=await req(env,'/etsy/listings/preflight');assert.equal(res.status,200);
 const data=await res.json();assert.equal(data.readiness[0].name,'Made to order · 3–5 days');assert.deepEqual(data.partners,[{id:33,name:'A printing and framing shop'}]);
 assert.deepEqual(data.taxonomy.map(x=>x.id),[55,57]);
 assert.deepEqual(data.returnPolicies,[{id:66,name:'No returns · No exchanges'},{id:77,name:'Returns accepted · Exchanges accepted · 30 days'}]);
 assert.ok(calls.some(x=>x.url.endsWith('/readiness-state-definitions?legacy=false')));
});

test('creates five saved drafts with the selected private production partner and all ready print variations',async t=>{
 const env=setup();await connected(env);const {calls,inventoryCounts}=mockEtsy(t);
 const res=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33',returnPolicyId:'66'});
 assert.equal(res.status,200,await res.clone().text());
 const data=await res.json();
 assert.equal(data.batch.status,'complete');
 assert.deepEqual(data.batch.items.map(x=>x.status),Array(5).fill('draft ready'));
 assert.deepEqual(inventoryCounts,[12,12,8,4,8]);
 assert.equal(calls.filter(x=>x.url.endsWith('/images')).length,5);
 const titles=calls.filter(x=>x.url.includes('/listings?legacy=false')).map(x=>new URLSearchParams(x.options.body).get('title'));
 assert.match(titles[3],/Landscape/);assert.match(titles[4],/Portrait/);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,5);
 for(const [i,entry] of calls.filter(x=>x.url.includes('/listings?legacy=false')).entries()){
  const form=new URLSearchParams(entry.options.body);
  assert.match(form.get('title'),/Art Print/);
  assert.equal(form.get('shipping_profile_id'),'11');
  assert.equal(form.get('production_partner_ids'),'33');
  assert.equal(form.get('return_policy_id'),'66');
  assert.equal(form.get('when_made'),'made_to_order');
  assert.equal(form.getAll('tags').length,1);assert.equal(form.get('tags').split(',').length,7);
  assert.ok(form.get('description').includes('\n\n'));assert.ok(!form.get('description').includes('\\n'));
  assert.equal(Number(form.get('price')),Math.min(...prints[i].variants.map(v=>Number(v.price))));
  assert.notEqual(form.get('state'),'active');
 }
 const expectedPrices=new Map(prints.flatMap(p=>p.variants.flatMap(v=>[[v.sku,Number(v.price)],...v.frames.map(f=>[f.sku,Number(f.price)])])));
 for(const entry of calls.filter(x=>x.url.includes('/inventory?')))for(const p of JSON.parse(entry.options.body).products)assert.equal(p.offerings[0].price,expectedPrices.get(p.sku));
 const before=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 const again=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33'});
 assert.equal(again.status,200);
 assert.equal((await again.json()).resumed,true);
 const after=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 assert.equal(after,before);
});

test('partial provider failure resumes saved progress without duplicating a listing',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{failFirstInventory:true});
 const settings={shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33'};
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

test('rejects missing or unknown production partner IDs before creating drafts',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 for(const productionPartnerId of [undefined,'999']){
  const res=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId});
  assert.equal(res.status,502);
  assert.match((await res.json()).error,/Choose a current FinerWorks production partner/);
 }
 assert.equal(calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT').length,0);
});

const selection={shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33',returnPolicyId:66};
test('shows redacted Etsy validation and allows changed settings after a rejected creation',async t=>{
 const env=setup();await connected(env);
 const {calls}=mockEtsy(t,{draftFailure:{status:400,body:{error:'Invalid taxonomy_id. test-key test-secret 123.access 123.refresh manager',debug:'DO NOT EXPOSE'}}});
 const first=await req(env,'/etsy/listings/create-drafts',selection);
 const failure=(await first.json()).error;
 assert.match(failure,/Invalid taxonomy_id/);assert.match(failure,/\[redacted\]/);
 assert.doesNotMatch(failure,/test-key|test-secret|123\.access|123\.refresh|manager|DO NOT EXPOSE/);
 assert.equal((await req(env,'/etsy/listings/create-drafts',{...selection,taxonomyId:57})).status,200);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,6);
 assert.equal((await read(env)).record.etsyDraftBatch.settings.taxonomyId,57);
});

async function legacyBatch(env){
 const {record,etag}=await read(env);
 const items=Object.fromEntries(prints.map((p,i)=>[p.id,{status:i===0?'creation failed':'not started'}]));
 await write(env,{...record,etsyDraftBatch:{sourcePrintVersion,status:'needs_resume',settings:{shippingProfileId:11,readinessStateId:22,taxonomyId:44,partnerId:33},items}},etag);
}
test('recovers the earlier failed batch with a specific print category after checking Etsy drafts',async t=>{
 const env=setup();await connected(env);await legacyBatch(env);const {calls}=mockEtsy(t);
 const result=await req(env,'/etsy/listings/create-drafts',selection);
 assert.equal(result.status,200,await result.clone().text());
 const checked=calls.findIndex(x=>x.url.includes('/listings?state=draft'));
 assert.ok(checked>=0&&checked<calls.findIndex(x=>x.options.method==='POST'));
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,5);
});
test('finds an untracked legacy draft on a later page and prevents duplicate creation',async t=>{
 const env=setup();await connected(env);await legacyBatch(env);
 const legacyDrafts=[...Array.from({length:100},(_,i)=>({listing_id:i+1,title:'Another print '+i})),{listing_id:800,title:'Warszawska Syrenka Art Print · Framed or Unframed'}];
 const {calls}=mockEtsy(t,{legacyDrafts});
 const result=await req(env,'/etsy/listings/create-drafts',selection);
 assert.match((await result.json()).error,/matching painting title exists/);
 assert.equal(calls.filter(x=>x.url.includes('/listings?state=draft')).length,2);
 assert.equal(calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT').length,0);
});
test('an uncertain draft POST is not repeated automatically',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{draftFailure:{status:500,body:{error:'private provider error'}}});
 const first=await req(env,'/etsy/listings/create-drafts',selection);
 assert.match((await first.json()).error,/may have created a draft/);
 const again=await req(env,'/etsy/listings/create-drafts',selection);
 assert.match((await again.json()).error,/did not confirm an earlier draft creation/);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,1);
});
test('retains settings for existing partial drafts and returns them when loading setup',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{failFirstInventory:true});
 await req(env,'/etsy/listings/create-drafts',selection);
 const preflight=await (await req(env,'/etsy/listings/preflight')).json();
 assert.equal(preflight.savedSettings.returnPolicyId,66);assert.equal(preflight.savedSettings.taxonomyId,55);
 const before=calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT').length;
 const changed=await req(env,'/etsy/listings/create-drafts',{...selection,returnPolicyId:77});
 assert.match((await changed.json()).error,/Keep their original settings/);
 assert.equal(calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT').length,before);
 assert.equal((await req(env,'/etsy/listings/create-drafts',selection)).status,200);
});
test('rejects broad categories and unknown return policies before creating drafts',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 for(const settings of [{...selection,taxonomyId:44},{...selection,returnPolicyId:999}])assert.equal((await req(env,'/etsy/listings/create-drafts',settings)).status,502);
 assert.equal(calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT').length,0);
});
