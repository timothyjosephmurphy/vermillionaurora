import prints, {sourcePrintVersion} from './etsy-print-source.mjs';
import {ETSY_ORIGIN,authorized,json,read,write} from './etsy-connection.mjs';
import {shippingChoice,shippingPackages,estimateShippingPackages} from './etsy-shipping.mjs';
const API='https://api.etsy.com/v3/application', SITE='https://vermillionaurora.com';
const SIZE=513, FRAME=514, QUANTITY=100;
const labelOf=p=>p.id==='painting-shoreline-at-dusk'?p.title+' — Landscape':p.id==='el-zonte-at-sunrise'?p.title+' — Portrait':p.title;
const rows=x=>Array.isArray(x?.results)?x.results:Array.isArray(x)?x:[];
const titleOf=p=>labelOf(p)+' Art Print · Framed or Unframed';
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
 try{res=await fetch('https://api.etsy.com/v3/public/oauth/token',{method:'POST',redirect:'manual',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/x-www-form-urlencoded','x-api-key':env.ETSY_KEYSTRING+':'+env.ETSY_SHARED_SECRET},body:new URLSearchParams({grant_type:'refresh_token',client_id:env.ETSY_KEYSTRING,refresh_token:token.refreshToken})});}
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
  throw Object.assign(Error('Etsy returned HTTP '+res.status+' during '+(action||'the request')+'.'+(detail?' '+detail:'')),{etsyStatus:res.status});
 }
 return data;
}
function choices(data){
 const flatten=(nodes,parent='')=>rows(nodes).flatMap(n=>{const name=parent?parent+' › '+n.name:n.name;return rows(n.children).length?flatten(n.children,name):[{id:n.id,name}];});
 return {
 shipping:rows(data[0]).map(shippingChoice).filter(x=>Number.isSafeInteger(x.id)),
 readiness:rows(data[1]).map(x=>{const interval=x.processing_days_display_label||((x.min_processing_days??x.min_processing_time??'')+'–'+(x.max_processing_days??x.max_processing_time??'')+' '+(x.processing_time_unit||'days'));return {id:x.readiness_state_id,name:(x.readiness_state==='made_to_order'?'Made to order':'Ready to ship')+' · '+interval};}).filter(x=>Number.isSafeInteger(x.id)),
 partners:rows(data[2]).map(x=>({id:Number(x.production_partner_id??x.partner_id),name:String(x.partner_name??x.name??'').trim()})).filter(x=>Number.isSafeInteger(x.id)&&x.id>0&&x.name),
 taxonomy:flatten(data[3]).filter(x=>Number.isSafeInteger(x.id)&&/\bprints\b|\bposters\b/i.test(x.name)),
 returnPolicies:rows(data[4]).map(x=>({id:Number(x.return_policy_id),name:(x.accepts_returns?'Returns accepted':'No returns')+' · '+(x.accepts_exchanges?'Exchanges accepted':'No exchanges')+(x.return_deadline?' · '+x.return_deadline+' days':'')})).filter(x=>Number.isSafeInteger(x.id)&&x.id>0)
 };
}
async function preflight(env,token){
 const shop=token.shopId,paths=['/shops/'+shop+'/shipping-profiles','/shops/'+shop+'/readiness-state-definitions?legacy=false','/shops/'+shop+'/production-partners','/seller-taxonomy/nodes','/shops/'+shop+'/policies/return'];
 const data=await Promise.all(paths.map(path=>call(API+path,env,token,{action:'loading Etsy shop setup'})));
 const c=choices(data);
 return {...c,estimatedShippingPackages:estimateShippingPackages(prints),works:prints.map(p=>({id:p.id,title:labelOf(p),sizes:p.variants.map(v=>v.label)}))};
}
const itemText=p=>p.title+' is an archival art print by TJ Murphy, reproduced from an original '+(p.medium||'watercolor pastel')+' painting.\n\n'+p.story.join('\n\n')+'\n\n'+p.variants.map(v=>v.label+' ('+v.paperSize.width+' × '+v.paperSize.height+' in): $'+v.price+' unframed; Black frame $'+v.frames[0].price+', White frame $'+v.frames[1].price+', Natural wood frame $'+v.frames[2].price+'.').join('\n')+'\n\nFramed options use a Snow White mat and Premium Clear acrylic glazing.';
function createBody(p,s,partner){
 const f=new URLSearchParams();
 for(const [k,v] of Object.entries({quantity:QUANTITY,title:titleOf(p),description:labelOf(p)+'. '+itemText(p),price:Math.min(...p.variants.map(v=>Number(v.price))),who_made:'i_did',when_made:'made_to_order',taxonomy_id:s.taxonomyId,shipping_profile_id:s.shippingProfileId,readiness_state_id:s.readinessStateId,is_supply:'false',type:'physical',production_partner_ids:partner}))f.set(k,String(v));
 if(s.returnPolicyId)f.set('return_policy_id',String(s.returnPolicyId));
 for(const [key,value] of Object.entries(s.shippingPackages?.[p.id]||{}))f.set(key,String(value));
 f.set('tags',['art print','watercolor art','bitcoin art','wall decor','fine art print','framed art','TJ Murphy'].join(','));
 return f;
}
function inventory(p,readiness){
 const products=[];
 for(const size of p.variants){
  const variants=[{name:'Unframed',price:size.price,sku:size.sku},...size.frames.map(f=>({name:f.label,price:f.price,sku:f.sku}))];
  for(const v of variants)products.push({sku:v.sku,property_values:[{property_id:SIZE,property_name:'Print size',value_ids:[],values:[size.label],scale_id:null},{property_id:FRAME,property_name:'Frame',value_ids:[],values:[v.name],scale_id:null}],offerings:[{price:Number(v.price),quantity:QUANTITY,is_enabled:true,readiness_state_id:readiness}]});
 }
 return {products,price_on_property:[SIZE,FRAME],quantity_on_property:[],readiness_state_on_property:[],sku_on_property:[SIZE,FRAME]};
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
 const type=(r.headers.get('content-type')||'').split(';')[0];if(!r.ok||r.status>=300||!['image/jpeg','image/png','image/webp'].includes(type))throw Error('The painting image could not be fetched as a supported image.');
 const bytes=await r.arrayBuffer();if(!bytes.byteLength||bytes.byteLength>8*1024*1024)throw Error('The painting image is empty or exceeds 8 MB.');
 return {blob:new Blob([bytes],{type}),name:p.id+'.'+(type==='image/jpeg'?'jpg':type.slice(6))};
}
const batchView=b=>({status:b.status,items:prints.map(p=>({id:p.id,title:p.title,...(b.items[p.id]||{status:'not started'})})).map(({id,title,status,listingId})=>({id,title,status:status||'not started',listingId:listingId||null}))});
async function create(env,input,now){
 let {record,etag,token}=await connection(env,now);const setup=await preflight(env,token);
 const pick=(items,id)=>items.find(x=>String(x.id)===String(id));
 const shipping=pick(setup.shipping,input.shippingProfileId),readiness=pick(setup.readiness,input.readinessStateId),taxonomy=pick(setup.taxonomy,input.taxonomyId),partner=pick(setup.partners,input.productionPartnerId),returnPolicy=pick(setup.returnPolicies,input.returnPolicyId);
 if(!shipping||!readiness||!taxonomy)throw Error('Choose a current shipping profile, processing profile, and print category.');
 if(!partner)throw Error('Choose a current FinerWorks production partner from the shop settings. Private partners may appear under their public description.');
 if(input.returnPolicyId&&!returnPolicy)throw Error('Choose a current return policy from your Etsy shop settings.');
 let batch=record.etsyDraftBatch;
 if(batch?.status==='complete')return {batch:batchView(batch),resumed:true};
 const packages=shippingPackages(shipping.profileType,input.shippingPackages,prints.map(p=>({...p,title:labelOf(p)})));
 const settings={shippingProfileId:shipping.id,readinessStateId:readiness.id,taxonomyId:taxonomy.id,partnerId:partner.id,returnPolicyId:returnPolicy?.id??null,shippingPackages:packages};
 if(batch?.status==='in_progress')throw Error('A draft batch is already in progress. Reload setup to check its status.');
 if(batch?.status==='needs_resume'){
  if(Object.values(batch.items).some(x=>x.creationUncertain))throw Error('Etsy did not confirm an earlier draft creation. Review the shop drafts before retrying to avoid a duplicate.');
  if(batch.sourcePrintVersion!==sourcePrintVersion)throw Error('Saved draft progress uses a different print catalog. Review the existing drafts before retrying.');
  await checkLegacyDrafts(env,token,batch);
  if(Object.values(batch.items).some(x=>x.listingId)&&Object.keys(settings).some(k=>JSON.stringify(batch.settings[k]??null)!==JSON.stringify(settings[k])))throw Error('Saved drafts use different shop settings. Keep their original settings when resuming.');
  batch.settings=settings;
  batch.status='in_progress';
 }else batch={sourcePrintVersion,status:'in_progress',items:Object.fromEntries(prints.map(p=>[p.id,{status:'not started'}])),settings};
 record={...record,etsyDraftBatch:batch};etag=await persist(env,record,etag);
 for(const p of prints){
  const item=batch.items[p.id];
  try{
   if(!item.listingId){
    const d=await call(API+'/shops/'+token.shopId+'/listings?legacy=false',env,token,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:createBody(p,settings,partner.id),action:'creating a draft'});
    if(!Number.isSafeInteger(d?.listing_id))throw Error('Etsy returned no draft listing ID.');
    item.listingId=d.listing_id;item.status='draft created';etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
   if(!item.imageUploaded){
    const pic=await artwork(p),form=new FormData();form.set('image',pic.blob,pic.name);
    await call(API+'/shops/'+token.shopId+'/listings/'+item.listingId+'/images',env,token,{method:'POST',body:form,action:'uploading artwork'});
    item.imageUploaded=true;etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
   if(!item.inventoryUploaded){
    await call(API+'/listings/'+item.listingId+'/inventory?legacy=false',env,token,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(inventory(p,readiness.id)),action:'setting sizes and frame options'});
    item.inventoryUploaded=true;item.status='draft ready';etag=await persist(env,{...record,etsyDraftBatch:batch},etag);
   }
  }catch(e){
   item.status=item.listingId?'draft needs attention':'creation failed';
   if(!item.listingId){item.creationRejected=[400,401,403,404,422,429].includes(e.etsyStatus);item.creationUncertain=!item.creationRejected;}
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
