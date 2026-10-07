import test from 'node:test';
import assert from 'node:assert/strict';
import {etsyListings} from './etsy-listings.mjs';
import {ETSY_ORIGIN,read,write} from './etsy-connection.mjs';
import prints,{sourcePrintVersion} from './etsy-print-source.mjs';
import {estimateShippingPackages} from './etsy-shipping.mjs';
import {buildListingPlans,validateListingPlan,etsySkuForPrintId} from './etsy-listing-plan.mjs';
const now=Date.parse('2026-10-02T10:00:00Z');
class Bucket{
 data=new Map();sequence=0;
 async get(key){const x=this.data.get(key);return x?{etag:x.etag,json:async()=>JSON.parse(x.value)}:null}
 async put(key,value,options){const prev=this.data.get(key),c=options.onlyIf;if(c.etagMatches&&prev?.etag!==c.etagMatches)return null;if(c.etagDoesNotMatch==='*'&&prev)return null;const x={value,etag:String(++this.sequence)};this.data.set(key,x);return x}
}
const setup=()=>({ETSY_KEYSTRING:'test-key',ETSY_SHARED_SECRET:'test-secret',COMMISSION_MANAGER_TOKEN:'manager',COMMISSION_UPLOADS:new Bucket()});
async function connected(env){await write(env,{connection:{shopId:42,shopName:'VermillionAurora',userId:'123',accessToken:'123.access',refreshToken:'123.refresh',expiresAt:now+3600000,scopes:['shops_r','listings_r','listings_w']},pending:null},null)}
function req(env,path,body={},origin=ETSY_ORIGIN,authorization='Bearer manager'){return etsyListings(new Request(ETSY_ORIGIN+path,{method:'POST',headers:{Origin:origin,Authorization:authorization,'Content-Type':'application/json'},body:JSON.stringify(body)}),env,now)}
function mockEtsy(t,{failFirstInventory=false,draftFailure=null,legacyDrafts=[],readinessProfiles=null,imageType='image/jpeg',rateLimited=false,currencyCode='USD',listingStates={}}={}){
 let nextId=900,inventoryCounts=[],failed=false;
 const calls=[];
 t.mock.method(globalThis,'fetch',async(url,options={})=>{
  const target=String(url);calls.push({url:target,options});
  if(rateLimited)return Response.json({error:'rate limit'},{status:429,headers:{'retry-after':'9'}});
  if(target.startsWith('https://tjm.art/'))return new Response(new Uint8Array([1,2,3]),{headers:{'Content-Type':imageType}});
  if(target.endsWith('/shipping-profiles'))return Response.json({results:[{shipping_profile_id:11,title:'Prints Shipping',profile_type:'manual'},{shipping_profile_id:12,title:'US Calculated',profile_type:'calculated'}]});
  if(target.endsWith('/shops/42'))return Response.json({shop_id:42,currency_code:currencyCode});
  if(target.includes('/readiness-state-definitions?legacy=false')){const all=readinessProfiles||[{readiness_state_id:22,readiness_state:'made_to_order',min_processing_days:3,max_processing_days:5,processing_days_display_label:'3–5 days'}],offset=Number(new URL(target).searchParams.get('offset'));return Response.json({count:all.length,results:all.slice(offset,offset+100)});}
  if(target.endsWith('/production-partners'))return Response.json({results:[{production_partner_id:'33',partner_name:'A printing and framing shop'}]});
  if(target.endsWith('/seller-taxonomy/nodes'))return Response.json([{id:44,name:'Art & Collectibles',children:[{id:54,name:'Prints',children:[{id:55,name:'Giclée',children:[]},{id:57,name:'Other',children:[]}]},{id:56,name:'Sculpture',children:[]}]}]);
  if(target.endsWith('/policies/return'))return Response.json({results:[{return_policy_id:66,accepts_returns:false,accepts_exchanges:false,return_deadline:null},{return_policy_id:77,accepts_returns:true,accepts_exchanges:true,return_deadline:30}]});
  if(target.includes('/listings?state=draft')){const offset=Number(new URL(target).searchParams.get('offset'));return Response.json({count:legacyDrafts.length,results:legacyDrafts.slice(offset,offset+100)});}
  const listingPath=new URL(target).pathname.match(/\/application\/listings\/(\d+)$/);
  if(listingPath&&(!options.method||options.method==='GET')){const state=listingStates[listingPath[1]];if(state==='deleted')return Response.json({error:'not found'},{status:404});return Response.json({listing_id:Number(listingPath[1]),state:state||'draft'});}
  if(target.includes('/inventory?')){
   const body=JSON.parse(options.body);inventoryCounts.push(body.products.length);
   // Etsy request prices are numbers in shop currency; its Money object is response-only.
   for(const p of body.products){assert.ok(p.sku.length<=32,'Etsy SKU cannot exceed 32 characters');assert.equal(typeof p.offerings[0].price,'number');assert.ok(p.offerings[0].price>0);assert.equal(p.offerings[0].readiness_state_id,22);}
   assert.deepEqual(body.sku_on_property,[513,514]);
   if(failFirstInventory&&!failed){failed=true;return Response.json({error:'private provider error'},{status:500});}
   return Response.json({products:body.products});
  }
  if(options.method==='PATCH'&&target.includes('/shops/42/listings/'))return Response.json({listing_id:Number(target.split('/').at(-1)),state:'draft'});
  if(target.endsWith('/images'))return Response.json({listing_image_id:++nextId});
  if(target.includes('/listings?legacy=false')){
   const form=new URLSearchParams(options.body);
   if(form.get('shipping_profile_id')==='12')for(const key of ['item_weight','item_length','item_width','item_height','item_weight_unit','item_dimensions_unit'])assert.ok(form.get(key),'Calculated shipping requires '+key);
   if(draftFailure&&!failed){failed=true;return Response.json(draftFailure.body,{status:draftFailure.status});}return Response.json({listing_id:++nextId,state:'draft'});
  }
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
 assert.equal(data.shipping[0].profileType,'manual');assert.match(data.shipping[0].name,/Fixed rate/);
 assert.equal(data.shipping[1].profileType,'calculated');assert.match(data.shipping[1].name,/estimates provided/);
 assert.equal(Object.keys(data.estimatedShippingPackages).length,5);
 assert.equal(data.defaultShippingProfileId,11);assert.equal(data.defaultReturnPolicyId,77);
 assert.deepEqual(data.returnPolicies,[{id:66,acceptsReturns:false,acceptsExchanges:false,returnDeadline:null,name:'No returns · No exchanges'},{id:77,acceptsReturns:true,acceptsExchanges:true,returnDeadline:30,name:'Simple policy · 30 days'}]);
 assert.ok(calls.some(x=>x.url.endsWith('/readiness-state-definitions?legacy=false&limit=100&offset=0')));
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
  assert.equal(form.get('who_made'),'someone_else');
  assert.equal(form.get('when_made'),'made_to_order');
  assert.equal(form.has('item_weight'),false);
  assert.equal(form.getAll('tags').length,1);assert.equal(form.get('tags').split(',').length,7);
  assert.ok(form.get('description').includes('\n\n'));assert.ok(!form.get('description').includes('\\n'));
  assert.equal(Number(form.get('price')),Math.min(...prints[i].variants.map(v=>Number(v.price))));
  assert.notEqual(form.get('state'),'active');
 }
 const expectedPrices=new Map(prints.flatMap(p=>p.variants.flatMap(v=>[[v.sku,Number(v.price)],...v.frames.map(f=>[f.sku,Number(f.price)])])));
 const saved=(await read(env)).record.etsyDraftBatch;
 assert.equal(saved.skuMapVersion,1);assert.equal(Object.keys(saved.skuMap).length,44);
 for(const entry of calls.filter(x=>x.url.includes('/inventory?')))for(const p of JSON.parse(entry.options.body).products)assert.equal(p.offerings[0].price,expectedPrices.get(saved.skuMap[p.sku].providerSku));
 const before=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 const again=await req(env,'/etsy/listings/create-drafts',{shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33'});
 assert.equal(again.status,200);
 assert.equal((await again.json()).resumed,true);
 const after=calls.filter(x=>x.url.includes('/listings?legacy=false')||x.url.endsWith('/images')||x.url.includes('/inventory?')).length;
 assert.equal(after,before);
});

test('rerunning a completed batch recreates only drafts deleted from Etsy',async t=>{
 const env=setup();await connected(env);const listingStates={};const {calls}=mockEtsy(t,{listingStates});
 const settings={shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33',returnPolicyId:'66'};
 const first=await req(env,'/etsy/listings/create-drafts',settings);assert.equal(first.status,200,await first.clone().text());
 const prior=(await read(env)).record.etsyDraftBatch,deletedId=String(prior.items[prints[2].id].listingId);listingStates[deletedId]='deleted';
 const retry=await req(env,'/etsy/listings/create-drafts',settings);assert.equal(retry.status,200,await retry.clone().text());
 const saved=(await read(env)).record.etsyDraftBatch;
 assert.equal(saved.status,'complete');assert.notEqual(saved.items[prints[2].id].listingId,Number(deletedId));
 for(const p of prints)if(p.id!==prints[2].id)assert.equal(saved.items[p.id].listingId,prior.items[p.id].listingId);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,6);
 assert.equal(calls.filter(x=>x.url.endsWith('/images')).length,6);
 assert.equal(calls.filter(x=>x.url.includes('/inventory?')).length,6);
});

test('does not create replacements when a saved Etsy listing is active',async t=>{
 const env=setup();await connected(env);const listingStates={};const {calls}=mockEtsy(t,{listingStates});
 const settings={shippingProfileId:11,readinessStateId:22,taxonomyId:55,productionPartnerId:'33',returnPolicyId:'66'};
 assert.equal((await req(env,'/etsy/listings/create-drafts',settings)).status,200);
 const saved=(await read(env)).record.etsyDraftBatch;listingStates[String(saved.items[prints[0].id].listingId)]='active';
 const retry=await req(env,'/etsy/listings/create-drafts',settings);assert.match((await retry.json()).error,/no longer a draft/);
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,5);
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

// Synthetic measurements exercise the API contract; they are not product shipping data.
const measuredPackages=()=>Object.fromEntries(prints.map((p,i)=>[p.id,{item_weight:String(i+1.25),item_length:String(i+12),item_width:'9',item_height:'1.5',item_weight_unit:'lb',item_dimensions_unit:'in'}]));
const remoteWrites=calls=>calls.filter(x=>x.options.method==='POST'||x.options.method==='PUT');
test('calculated shipping validates measurements for every painting before any Etsy writes',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 for(const [field,value] of [['item_weight',0],['item_length',-1],['item_width','Infinity'],['item_height',null],['item_weight',true],['item_weight',[]],['item_weight_unit','stone'],['item_dimensions_unit','pixels']]){
  const shippingPackages=measuredPackages();shippingPackages[prints.at(-1).id][field]=value;
  const res=await req(env,'/etsy/listings/create-drafts',{...selection,shippingProfileId:12,shippingPackages});
  assert.equal(res.status,502,field+' must be rejected');
 }
 assert.equal(remoteWrites(calls).length,0);
 assert.equal((await read(env)).record.etsyDraftBatch,undefined);
});

test('reuses existing paper and framed parcel estimates and fills missing calculated-shipping values',async t=>{
 const unframed={id:'paper',title:'Paper',variants:[{paperSize:{width:8,height:10,unit:'in'},frames:[]}]};
 assert.deepEqual(estimateShippingPackages([unframed]).paper,{item_weight:0.375,item_length:12,item_width:10,item_height:2,item_weight_unit:'lb',item_dimensions_unit:'in'});
 const framed={...unframed,id:'frame',variants:[{...unframed.variants[0],frames:[{outerSize:{width:12,height:15,unit:'in'}}]}]};
 assert.deepEqual(estimateShippingPackages([framed]).frame,{item_weight:3,item_length:17,item_width:14,item_height:2,item_weight_unit:'lb',item_dimensions_unit:'in'});
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 const res=await req(env,'/etsy/listings/create-drafts',{...selection,shippingProfileId:12});
 assert.equal(res.status,200,await res.clone().text());
 const expected=estimateShippingPackages(prints);
 const creates=calls.filter(x=>x.url.includes('/listings?legacy=false'));assert.equal(creates.length,5);
 for(const [i,entry] of creates.entries())for(const [key,value] of Object.entries(expected[prints[i].id]))assert.equal(new URLSearchParams(entry.options.body).get(key),String(value));
});
test('sends each painting’s measured values and units to Etsy and resumes with saved measurements',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{failFirstInventory:true});
 const settings={...selection,shippingProfileId:12,shippingPackages:measuredPackages()};
 assert.equal((await req(env,'/etsy/listings/create-drafts',settings)).status,502);
 const loaded=await (await req(env,'/etsy/listings/preflight')).json();
 assert.equal(loaded.savedSettings.shippingPackages[prints[0].id].item_weight,1.25);
 const before=remoteWrites(calls).length;
 const changed=structuredClone(settings);changed.shippingPackages[prints[0].id].item_weight='999';
 assert.match((await (await req(env,'/etsy/listings/create-drafts',changed)).json()).error,/Keep their original settings/);
 assert.equal(remoteWrites(calls).length,before);
 const res=await req(env,'/etsy/listings/create-drafts',settings);
 assert.equal(res.status,200,await res.clone().text());
 const creates=calls.filter(x=>x.url.includes('/listings?legacy=false'));assert.equal(creates.length,5);
 for(const [i,entry] of creates.entries()){
  const form=new URLSearchParams(entry.options.body);
  for(const [key,value] of Object.entries(settings.shippingPackages[prints[i].id]))assert.equal(form.get(key),value);
 }
});
test('a rejected calculated-shipping batch can switch to fixed rate without sending stale measurements',async t=>{
 const env=setup();await connected(env);await legacyBatch(env);
 const state=await read(env);state.record.etsyDraftBatch.settings={shippingProfileId:12,readinessStateId:22,taxonomyId:55,partnerId:33,returnPolicyId:66};
 state.record.etsyDraftBatch.items[prints[0].id].creationRejected=true;
 await write(env,state.record,state.etag);
 const {calls}=mockEtsy(t);
 const res=await req(env,'/etsy/listings/create-drafts',{...selection,shippingPackages:measuredPackages()});
 assert.equal(res.status,200,await res.clone().text());
 for(const entry of calls.filter(x=>x.url.includes('/listings?legacy=false'))){const form=new URLSearchParams(entry.options.body);assert.equal(form.get('shipping_profile_id'),'11');assert.equal(form.has('item_weight'),false);}
});

const planSettings={shippingProfileId:11,readinessStateId:22,taxonomyId:55,partnerId:33,returnPolicyId:66,shippingPackages:null};
test('all 44 Etsy SKUs fit the provider limit and retain exact FinerWorks identities',async()=>{
 const plans=await buildListingPlans(prints,planSettings),aliases=plans.flatMap(p=>Object.keys(p.skuMap));
 assert.equal(aliases.length,44);assert.equal(new Set(aliases).size,44);assert.ok(aliases.every(s=>/^VA-[a-f0-9]{24}$/.test(s)));
 let longProviderCodes=0;
 for(const plan of plans)for(const [sku,mapping] of Object.entries(plan.skuMap)){
  const p=prints.find(x=>x.id===mapping.productId),size=p.variants.find(x=>x.key===mapping.sizeKey),option=mapping.frameKey?size.frames.find(x=>x.key===mapping.frameKey):size;
  assert.equal(mapping.providerSku,option.sku);assert.equal(sku,await etsySkuForPrintId(mapping.printId));
  if(mapping.providerSku.length>32)longProviderCodes++;
 }
 assert.equal(longProviderCodes,33);
 const changed=structuredClone(prints);changed[0].title='New title';changed[0].variants[0].sku='replacement-provider-code';
 const revised=await buildListingPlans(changed,planSettings);
 assert.equal(revised[0].inventory.products[0].sku,plans[0].inventory.products[0].sku);
 const duplicate=structuredClone(prints);duplicate[1].id=duplicate[0].id;
 await assert.rejects(buildListingPlans(duplicate,planSettings),/duplicate Etsy SKU across paintings/);
});

test('documented contract checks reject bad titles, tags, prices, variations, and overlength SKUs',async()=>{
 const [valid]=await buildListingPlans(prints,planSettings);
 const copy=()=>({...valid,body:new URLSearchParams(valid.body),inventory:structuredClone(valid.inventory),skuMap:structuredClone(valid.skuMap)});
 for(const mutate of [
  p=>p.body.set('title','x'.repeat(141)),p=>p.body.set('title','A & B & C'),p=>p.body.set('tags','x'.repeat(21)),p=>p.body.set('tags',Array(14).fill('tag').join(',')),
  p=>p.inventory.products[0].sku='X'.repeat(33),p=>p.inventory.products[0].offerings[0].price={amount:5000,divisor:100,currency_code:'USD'},
  p=>p.inventory.products[0].offerings[0].readiness_state_id=null,p=>p.inventory.products[0].property_values[0].values=['Large (framed)'],
  p=>p.inventory.products[0].product_id=123,p=>p.inventory.sku_on_property=[],p=>p.body.set('state','active'),p=>p.body.set('item_weight','3')
 ]){const plan=copy();mutate(plan);assert.throws(()=>validateListingPlan(plan),/Etsy preflight:/);}
});

test('checks the entire batch before writing any listings',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 const old=prints.at(-1).title;prints.at(-1).title='x'.repeat(141);
 try{const res=await req(env,'/etsy/listings/create-drafts',selection);assert.match((await res.json()).error,/140 characters/);assert.equal(remoteWrites(calls).length,0);assert.equal((await read(env)).record.etsyDraftBatch,undefined);}finally{prints.at(-1).title=old;}
});

test('resumes the existing draft and image after the legacy overlength-SKU rejection',async t=>{
 const env=setup();await connected(env);await legacyBatch(env);
 const {record,etag}=await read(env);record.etsyDraftBatch.settings=planSettings;
 record.etsyDraftBatch.items[prints[0].id]={listingId:800,imageUploaded:true,inventoryUploaded:false,status:'draft needs attention'};
 await write(env,record,etag);const {calls}=mockEtsy(t);
 const result=await req(env,'/etsy/listings/create-drafts',selection);assert.equal(result.status,200,await result.clone().text());
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,4);
 assert.equal(calls.filter(x=>x.url.endsWith('/images')).length,4);
 assert.equal(calls.filter(x=>x.url.includes('/listings/800/inventory?')).length,1);
 const saved=(await read(env)).record.etsyDraftBatch;assert.equal(saved.items[prints[0].id].listingId,800);assert.equal(Object.keys(saved.skuMap).length,44);
});

test('loads processing profiles beyond the first documented page',async t=>{
 const env=setup();await connected(env);const readinessProfiles=Array.from({length:101},(_,i)=>({readiness_state_id:i+1000,readiness_state:'made_to_order',min_processing_days:3,max_processing_days:5}));
 const {calls}=mockEtsy(t,{readinessProfiles});const result=await (await req(env,'/etsy/listings/preflight')).json();
 assert.equal(result.readiness.length,101);assert.equal(result.readiness.at(-1).id,1100);
 assert.equal(calls.filter(x=>x.url.includes('readiness-state-definitions')).length,2);
});
test('uses the Prints Shipping and Simple policy defaults and marks FinerWorks as the maker',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t);
 const result=await req(env,'/etsy/listings/create-drafts',{readinessStateId:22,taxonomyId:55,productionPartnerId:'33'});
 assert.equal(result.status,200,await result.clone().text());
 const requests=calls.filter(x=>x.url.includes('/listings?legacy=false'));
 assert.equal(requests.length,5);
 for(const request of requests){const form=new URLSearchParams(request.options.body);assert.equal(form.get('shipping_profile_id'),'11');assert.equal(form.get('return_policy_id'),'77');assert.equal(form.get('who_made'),'someone_else');}
});
test('resumes the Warsaw draft with default settings and updates its maker and return policy',async t=>{
 const env=setup();await connected(env);
 const {record,etag}=await read(env);
 const items=Object.fromEntries(prints.map(p=>[p.id,{status:'not started'}]));
 items[prints[0].id]={listingId:800,imageUploaded:true,inventoryUploaded:false,status:'draft needs attention'};
 await write(env,{...record,etsyDraftBatch:{sourcePrintVersion,status:'needs_resume',settings:{shippingProfileId:11,readinessStateId:22,taxonomyId:55,partnerId:33,returnPolicyId:null,shippingPackages:null},items}},etag);
 const {calls}=mockEtsy(t);
 const result=await req(env,'/etsy/listings/create-drafts',{readinessStateId:22,taxonomyId:55,productionPartnerId:'33'});
 assert.equal(result.status,200,await result.clone().text());
 const update=calls.find(x=>x.options.method==='PATCH');assert.ok(update);
 const changed=new URLSearchParams(update.options.body);assert.equal(changed.get('who_made'),'someone_else');assert.equal(changed.get('return_policy_id'),'77');assert.equal(changed.get('shipping_profile_id'),'11');assert.equal(changed.get('production_partner_ids'),'33');
 assert.equal(calls.filter(x=>x.url.includes('/listings?legacy=false')).length,4);
 assert.equal(calls.filter(x=>x.url.endsWith('/images')).length,4);
 assert.equal(calls.filter(x=>x.url.includes('/listings/800/inventory?')).length,1);
});
test('rejects undocumented image formats before draft creation and explains rate-limit waits',async t=>{
 const env=setup();await connected(env);const mock=mockEtsy(t,{imageType:'image/webp'});
 const result=await req(env,'/etsy/listings/create-drafts',selection);assert.match((await result.json()).error,/JPEG or PNG/);assert.equal(remoteWrites(mock.calls).length,0);
 assert.equal((await read(env)).record.etsyDraftBatch.items[prints[0].id].creationUncertain,false);
 t.mock.restoreAll();mockEtsy(t,{rateLimited:true});const limited=await req(env,'/etsy/listings/preflight');assert.match((await limited.json()).error,/Wait at least 9 seconds/);
});
test('does not send USD catalog prices to a shop with another currency',async t=>{
 const env=setup();await connected(env);const {calls}=mockEtsy(t,{currencyCode:'CAD'});
 const result=await req(env,'/etsy/listings/create-drafts',selection);assert.match((await result.json()).error,/shop currency must be verified as USD/);assert.equal(remoteWrites(calls).length,0);
});
