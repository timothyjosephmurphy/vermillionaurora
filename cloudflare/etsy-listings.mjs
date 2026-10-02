import prints, {sourcePrintVersion} from './etsy-print-source.mjs';
import {ETSY_ORIGIN,authorized,json,read,write} from './etsy-connection.mjs';
import {shippingChoice,shippingPackages,estimateShippingPackages} from './etsy-shipping.mjs';
import {labelOf,titleOf,buildListingPlans} from './etsy-listing-plan.mjs';
const API='https://api.etsy.com/v3/application', SITE='https://vermillionaurora.com';
const rows=x=>Array.isArray(x?.results)?x.results:Array.isArray(x)?x:[];
// Only expose validation messages to the authenticated owner; never dump a provider response.
function validationDetail(data,env,token){
 const messages=[data?.error,data?.message,data?.error_description,...(Array.isArray(data?.errors)?data.errors:[])].map(x=>typeof x==='string'?x:typeof x?.message==='string'?x.message:'').filter(Boolean);
 let detail=[...new Set(messages)].join('; ');
 for(const secret of [env.ETSY_KEYSTRING,env.ETSY_SHARED_SECRET,env.COMMISSION_MANAGER_TOKEN,token.accessToken,token.refreshToken].filter(Boolean))detail=detail.split(secret).join('[redacted]');
 return detail.replace(/Bearer\s+\S+/gi,'Bearer [redacted]').replace(/[\u0000-\u001f\u007f]/g,' ').slice(0,600);
}
async function persist(env,record,etag){
 const saved=await write(env,record,etag);
 if(!saved)throw Error('Private listing state changed. Reload setup and retry.');
 return saved.etag;
}
async function connection(env,now){
 let state=await read(env),record=state.record,etag=state.etag,token=record.connection;
 if(!token?.accessToken||!token?.refreshToken)throw Error('Connect Etsy before preparing listings.');
 if(token.expiresAt>now+45000)return {record,etag,token};
 if(record.etsyRefreshUntil>now)throw Error('Etsy authorization is refreshing. Retry in a few seconds.');
 etag=await persist(env,{...record,etsyRefreshUntil:now+30000},etag);
 let res;
 try{res=await fetch('https://api.etsy.com/v3/public/oauth/token',{method:'POST',redirect:'manual',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8','x-api-key':env.ETSY_KEYSTRING+':'+env.ETSY_SHARED_SECRET},body:new URLSearchParams({grant_type:'refresh_token',client_id:env.ETSY_KEYSTRING,refresh_token:token.refreshToken})});}
 catch{await write(env,{...record,etsyRefreshUntil:null},etag);throw Error('Etsy token refresh failed. Retry the connection check.');}
 if(res.status>=300&&res.status<400){await write(env,{...record,etsyRefreshUntil:null},etag);throw Error('Etsy redirected token refresh; stopped safely.');}
 let refreshed;
 try{refreshed=res.ok?await res.json():null;}catch{}
 const user=refreshed?.access_token?.match(/^(\d+)\./)?.[1];
 if(!res.ok||user!==String(token.userId)||!refreshed?.refresh_token||!Number.isFinite(refreshed?.expires_in)){
  await write(env,{...record,etsyRefreshUntil:null},etag);throw Error('Etsy rejected token refresh. Reconnect Etsy.');
 }
 const next={...token,accessToken:refreshed.access_token,refreshToken:refreshed.refresh_token,expiresAt:now+refreshed.expires_in*1000};
 record={...record,connection:next,etsyRefreshUntil:null};etag=await persist(env,record,etag);
 return {record,etag,token:next};
}
async function call(url,env,token,options={}){
 const {action,...requestOptions}=options;
 let res;try{res=await fetch(url,{...requestOptions,redirect:'manual',signal:AbortSignal.timeout(20000),headers:{'x-api-key':env.ETSY_KEYSTRING+':'+env.ETSY_SHARED_SECRET,Authorization:'Bearer '+token.accessToken,...options.headers}});}
 catch{throw Error('Etsy could not be reached.');}
 if(res.status>=300&&res.status<400)throw Error('Etsy redirected a protected request; it was stopped safely.');
 let data;try{data=await res.json();}catch{}
 if(!res.ok){
  const detail=[400,422].includes(res.status)?validationDetail(data,env,token):'';
  const retryAfter=Number(res.headers.get('retry-after'));
  const retry=res.status===429&&Number.isFinite(retryAfter)&&retryAfter>0?' Wait at least '+Math.ceil(retryAfter)+' seconds before retrying.':'';
  throw Object.assign(Error('Etsy returned HTTP '+res.status+' during '+(action||'the request')+'.'+(detail?' '+detail:'')+retry),{etsyStatus:res.status});
 }
 return data;
}
function choices(data){
 const flatten=(nodes,parent='')=>rows(nodes).flatMap(n=>{const name=parent?parent+' › '+n.name:n.name;return rows(n.children).length?flatten(n.children,name):[{id:n.id,name}];});
 const shipping=rows(data[0]).map(shippingChoice).filter(x=>Number.isSafeInteger(x.id));
 const returnPolicies=rows(data[4]).map(x=>({id:Number(x.return_policy_id),acceptsReturns:x.accepts_returns===true,acceptsExchanges:x.accepts_exchanges===true,returnDeadline:x.return_deadline??null,name:x.accepts_returns&&x.accepts_exchanges&&x.return_deadline===30?'Simple policy · 30 days':(x.accepts_returns?'Returns accepted':'No returns')+' · '+(x.accepts_exchanges?'Exchanges accepted':'No exchanges')+(x.return_deadline?' · '+x.return_deadline+' days':'')})).filter(x=>Number.isSafeInteger(x.id)&&x.id>0);
 const defaultReturnPolicies=returnPolicies.filter(x=>x.acceptsReturns&&x.acceptsExchanges&&x.returnDeadline===30);
 return {
 shipping,
 defaultShippingProfileId:shipping.find(x=>/^Prints Shipping\b/i.test(x.name))?.id??null,
 readiness:rows(data[1]).map(x=>{const interval=x.processing_days_display_label||((x.min_processing_days??x.min_processing_time??'')+'–'+(x.max_processing_days??x.max_processing_time??'')+' '+(x.processing_time_unit||'days'));return {id:x.readiness_state_id,name:(x.readiness_state==='made_to_order'?'Made to order':'Ready to ship')+' · '+interval};}).filter(x=>Number.isSafeInteger(x.id)),
 partners:rows(data[2]).map(x=>({id:Number(x.production_partner_id??x.partner_id),name:String(x.partner_name??x.name??'').trim()})).filter(x=>Number.isSafeInteger(x.id)&&x.id>0&&x.name),
 taxonomy:flatten(data[3]).filter(x=>Number.isSafeInteger(x.id)&&/\bprints\b|\bposters\b/i.test(x.name)),
 returnPolicies,
 defaultReturnPolicyId:defaultReturnPolicies.length===1?defaultReturnPolicies[0].id:returnPolicies.length===1?returnPolicies[0].id:null,
 currencyCode:String(data[5]?.currency_code||'').toUpperCase()
 };
}
async function preflight(env,token){
 const shop=token.shopId,paths=['/shops/'+shop+'/shipping-profiles','/shops/'+shop+'/readiness-state-definitions?legacy=false&limit=100&offset=0','/shops/'+shop+'/production-partners','/seller-taxonomy/nodes','/shops/'+shop+'/policies/return','/shops/'+shop];
 const data=await Promise.all(paths.map(path=>call(API+path,env,token,{action:'loading Etsy shop setup'})));
 // Processing profiles are paginated (default 25, maximum page size 100).
 if(Array.isArray(data[1]?.results)){
  const profiles=[...data[1].results];let page=data[1];
  for(let offset=100;page.results.length===100&&(!Number.isFinite(page.count)||offset<page.count);offset+=100){
   if(offset>=10000)throw Error('Etsy returned too many processing profiles. Narrow the shop setup before retrying.');
   page=await call(API+'/shops/'+shop+'/readiness-state-definitions?legacy=false&limit=100&offset='+offset,env,token,{action:'loading Etsy processing profiles'});
   if(!Array.isArray(page?.results))throw Error('Etsy returned an unreadable processing profile page.');
   profiles.push(...page.results);
  }
  data[1]={results:profiles};
 }
 const c=choices(data);
 return {...c,estimatedShippingPackages:estimateShippingPackages(prints),works:prints.map(p=>({id:p.id,title:labelOf(p),sizes:p.variants.map(v=>v.label)}))};
}
// Older batches did not record whether a failed POST reached Etsy. Check drafts before retrying them.
async function checkLegacyDrafts(env,token,batch){
 const titles=new Set(prints.filter(p=>{const i=batch.items[p.id];return i&&!i.listingId&&i.status==='creation failed'&&i.creationRejected===undefined;}).map(titleOf));
 if(!titles.size)return;
 for(let offset=0;offset<10000;offset+=100){
  const data=await call(API+'/shops/'+token.shopId+'/listings?state=draft&limit=100&offset='+offset,env,token,{action:'checking earlier draft attempts'});
  if(!Array.isArray(data?.results))throw Error('Etsy did not return the earlier drafts. Retry loading setup.');
  if(data.results.some(x=>titles.has(x.title)))throw Error('An earlier draft with a matching painting title exists in Etsy. Review that draft before retrying to avoid a duplicate.');
  if(data.results.length<100||offset+100>=data.count)return;
 }
 throw Error('Could not finish checking earlier drafts. Review the shop drafts before retrying.');
}
async function artwork(p){
 const url=new URL(p.image.src,SITE);if(url.origin!==SITE)throw Error('Selected artwork image is not hosted on Vermillion Aurora.');
 let r;try{r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(15000)});}catch{throw Error('The painting image could not be fetched from the website.');}
 const type=(r.headers.get('content-type')||'').split(';')[0];if(!r.ok||r.status>=300||!['image/jpeg','image/png'].includes(type))throw Error('The painting image must be a JPEG or PNG from the website.');
 const bytes=await r.arrayBuffer();if(!bytes.byteLength||bytes.byteLength>8*1024*1024)throw Error('The painting image is empty or exceeds 8 MB.');
 return {blob:new Blob([bytes],{type}),name:p.id+'.'+(type==='image/jpeg'?'jpg':type.slice(6))};
}
const batchView=b=>({status:b.status,items:prints.map(p=>({id:p.id,title:p.title,...(b.items[p.id]||{status:'not started'})})).map(({id,title,status,listingId})=>({id,title,status:status||'not started',listingId:listingId||null}))});
async function create(env,input,now){
 let {record,etag,token}=await connection(env,now);const setup=await preflight(env,token);
 const pick=(items,id)=>items.find(x=>String(x.id)===String(id));
 const shipping=pick(setup.shipping,input.shippingProfileId||setup.defaultShippingProfileId),readiness=pick(setup.readiness,input.readinessStateId),taxonomy=pick(setup.taxonomy,input.taxonomyId),partner=pick(setup.partners,input.productionPartnerId),returnPolicy=pick(setup.returnPolicies,input.returnPolicyId||setup.defaultReturnPolicyId);
 if(!shipping||!readiness||!taxonomy)throw Error('Choose a current shipping profile, processing profile, and print category.');
 if(!partner)throw Error('Choose a current FinerWorks production partner from the shop settings. Private partners may appear under their public description.');
 if(input.returnPolicyId&&!returnPolicy)throw Error('Choose a current return policy from your Etsy shop settings.');
 let batch=record.etsyDraftBatch;
 if(batch?.status==='complete')return {batch:batchView(batch),resumed:true};
 if(setup.currencyCode!=='USD')throw Error('The print catalog is priced in USD. Etsy shop currency must be verified as USD before these prices are sent.');
 const packages=shippingPackages(shipping.profileType,input.shippingPackages,prints.map(p=>({...p,title:labelOf(p)})));
 const settings={shippingProfileId:shipping.id,readinessStateId:readiness.id,taxonomyId:taxonomy.id,partnerId:partner.id,returnPolicyId:returnPolicy?.id??null,shippingPackages:packages};
 const plans=await buildListingPlans(prints,settings);
 const byId=new Map(plans.map(plan=>[plan.id,plan]));
 if(batch?.status==='in_progress')throw Error('A draft batch is already in progress. Reload setup to check its status.');
 if(batch?.status==='needs_resume'){
  if(Object.values(batch.items).some(x=>x.creationUncertain))throw Error('Etsy did not confirm an earlier draft creation. Review the shop drafts before retrying to avoid a duplicate.');
  if(batch.sourcePrintVersion!==sourcePrintVersion)throw Error('Saved draft progress uses a different print catalog. Review the existing drafts before retrying.');
  await checkLegacyDrafts(env,token,batch);
  if(Object.values(batch.items).some(x=>x.listingId)){
   const changed=Object.keys(settings).filter(k=>JSON.stringify(batch.settings[k]??null)!==JSON.stringify(settings[k]));
   const applyingDefaultReturnPolicy=changed.length===1&&changed[0]==='returnPolicyId'&&(batch.settings.returnPolicyId??null)===null&&settings.returnPolicyId===setup.defaultReturnPolicyId;
   if(changed.length&&!applyingDefaultReturnPolicy)throw Error('Saved drafts use different shop settings. Keep their original settings when resuming.');
  }
  batch.settings=settings;
  batch.status='in_progress';
 }else batch={sourcePrintVersion,status:'in_progress',items:Object.fromEntries(prints.map(p=>[p.id,{status:'not started'}])),settings};
 batch.skuMap=Object.assign({},...plans.map(plan=>plan.skuMap));batch.skuMapVersion=1;
 record={...record,etsyDraftBatch:batch};etag=await persist(env,record,etag);
 for(const p of prints){
  const item=batch.items[p.id],plan=byId.get(p.id);let creationAttempted=false;
  try{
   const pic=!item.imageUploaded?await artwork(p):null;
   if(!item.listingId){
    creationAttempted=true;
    const d=await call(API+'/shops/'+token.shopId+'/listings?legacy=false',env,token,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},body:plan.body,action:'creating a draft'});
    if(!Number.isSafeInteger(d?.listing_id))throw Error('Etsy returned no draft listing ID.');
    item.listingId=d.listing_id;item.status='draft created';item.listingSettingsApplied=true;etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
   if(!item.listingSettingsApplied){
    const patch=new URLSearchParams();
    for(const key of ['who_made','when_made','is_supply','type','shipping_profile_id','return_policy_id','taxonomy_id','production_partner_ids','item_weight','item_length','item_width','item_height','item_weight_unit','item_dimensions_unit'])if(plan.body.has(key))patch.set(key,plan.body.get(key));
    await call(API+'/shops/'+token.shopId+'/listings/'+item.listingId,env,token,{method:'PATCH',headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},body:patch,action:'applying print listing settings'});
    item.listingSettingsApplied=true;etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
   if(!item.imageUploaded){
    const form=new FormData();form.set('image',pic.blob,pic.name);form.set('rank','1');form.set('overwrite','true');form.set('alt_text',Array.from(p.image.alt||labelOf(p)).slice(0,500).join(''));
    await call(API+'/shops/'+token.shopId+'/listings/'+item.listingId+'/images',env,token,{method:'POST',body:form,action:'uploading artwork'});
    item.imageUploaded=true;etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
   if(!item.inventoryUploaded){
    await call(API+'/listings/'+item.listingId+'/inventory?legacy=false&max_variations_supported=2',env,token,{method:'PUT',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify(plan.inventory),action:'setting sizes and frame options'});
    item.inventoryUploaded=true;item.status='draft ready';etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
  }catch(e){
   item.status=item.listingId?'draft needs attention':'creation failed';
   if(!item.listingId){item.creationRejected=!creationAttempted||[400,401,403,404,422,429].includes(e.etsyStatus);item.creationUncertain=!item.creationRejected;}
   batch.status='needs_resume';try{await persist(env,{...record,etsyDraftBatch:batch},etag);}catch{}
   throw Error((e.message||'Etsy listing failed.')+' Batch stopped at '+p.title+'. '+(item.creationUncertain?'Etsy may have created a draft. Review the shop drafts before retrying.':'Partial progress is saved; reload setup to resume.'));
  }
 }
 batch.status='complete';batch.completedAt=new Date(now).toISOString();etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
 return {batch:batchView(batch),resumed:false};
}
export async function etsyListings(request,env,now=Date.now()){
 const u=new URL(request.url),path=u.pathname;
 if(u.origin!==ETSY_ORIGIN)return json({error:'Not found'},404);
 if(request.method!=='POST'||!['/etsy/listings/preflight','/etsy/listings/status','/etsy/listings/create-drafts'].includes(path))return json({error:'Not found'},404);
 if(request.headers.get('Origin')!==ETSY_ORIGIN||!await authorized(request,env))return json({error:'Invalid management credential or origin.'},403);
 if(!env.ETSY_KEYSTRING||!env.ETSY_SHARED_SECRET||!env.COMMISSION_UPLOADS||!env.COMMISSION_MANAGER_TOKEN)return json({error:'Etsy secrets or private storage are missing.'},503);
 try{
  const s=await connection(env,now);
  if(path==='/etsy/listings/status')return json({connected:true,shopName:s.token.shopName,batch:s.record.etsyDraftBatch?batchView(s.record.etsyDraftBatch):null});
  if(path==='/etsy/listings/preflight')return json({...await preflight(env,s.token),savedSettings:s.record.etsyDraftBatch?.settings??null});
  let input;try{input=await request.json();}catch{return json({error:'Choose Etsy shop settings before creating drafts.'},400);}
  return json(await create(env,input,now));
 }catch(e){return json({error:e.message||'Etsy draft setup failed safely.'},502);}
}
