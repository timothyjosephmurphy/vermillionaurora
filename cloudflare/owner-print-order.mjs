// Owner-only FinerWorks print order for a paid customer whose original lab order failed.
// POST /checkout/owner/print-order  Authorization: Bearer <CATALOG_ADMIN_PASSWORD>
// {printId, replaces:"<8-hex original order>", address:{name,street1,street2,city,state,zip,country:"US"}, submit:false|true}
// submit:false only quotes. submit:true places one order and records it under the original order, so a
// repeated call for the same original returns the saved order instead of ordering again.
// No customer payment is taken here; the address is stored only in the private sales archive.
import {cartItems} from './cart-policy.mjs';
import {quoteFinerWorksPrints} from './finerworks-quotes.mjs';
import {newFinerWorksJob,fulfillFinerWorks,finerworksOrderingReady} from './finerworks-fulfillment.mjs';
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
async function owner(request,env){
  const digest=v=>crypto.subtle.digest('SHA-256',new TextEncoder().encode(v));
  const a=new Uint8Array(await digest(request.headers.get('Authorization')||'')),b=new Uint8Array(await digest('Bearer '+env.CATALOG_ADMIN_PASSWORD));
  let d=0;for(let i=0;i<a.length;i++)d|=a[i]^b[i];return d===0;
}
const costs=(q)=>({shippingMethod:q.shippingMethod,productionCost:q.productionCost,shipping:q.shipping,maximumProviderCost:q.maximumProviderCost});
export async function ownerPrintOrder(request,env){
  if(request.method!=='POST')return reply({error:'Not found'},404);
  if(!env.CATALOG_ADMIN_PASSWORD)return reply({error:'Not configured'},503);
  if(!await owner(request,env))return reply({error:'Not found'},404);
  const raw=await request.text();if(raw.length>4096)return reply({error:'Request too large'},413);
  let input;try{input=JSON.parse(raw);}catch{return reply({error:'Invalid JSON'},400);}
  if(!/^[0-9a-f]{8}$/.test(input?.replaces||''))return reply({error:'replaces must name the original order (8 hex)'},400);
  let items;try{items=cartItems([{id:String(input.printId||''),quantity:1}]);}catch(e){return reply({error:e.message},400);}
  if(items.length!==1||items[0].provider!=='finerworks'||items[0].testOnly)return reply({error:'Choose a live FinerWorks print'},400);
  const recordKey=`orders/owner-resubmits/${input.replaces}-${items[0].id}.json`;
  if(input.submit===true&&env.SALES_ARCHIVE){const prev=await env.SALES_ARCHIVE.get(recordKey);if(prev){const {job}=await prev.json();return reply({existing:true,orderId:job.providerId||null,reference:job.request.merchantReference,status:job.status,...(job.lastError?{error:job.lastError}:{})});}}
  let quote;try{quote=await quoteFinerWorksPrints(env,items,input.address);}catch(e){return reply({error:e.message},400);}
  if(input.submit!==true)return reply({dryRun:true,printId:items[0].id,title:items[0].title,sku:items[0].sku,mode:quote.mode,...costs(quote)});
  if(!finerworksOrderingReady(env)||!env.SALES_ARCHIVE)return reply({error:'FinerWorks ordering is not enabled'},409);
  const id=crypto.randomUUID();
  let job=newFinerWorksJob(env,{id,mode:env.CHECKOUT_MODE,quote:{address:input.address,printQuote:quote}},items);
  const persist=async next=>{job=next;await env.SALES_ARCHIVE.put(recordKey,JSON.stringify({kind:'owner-print-resubmit',replaces:input.replaces,id,job}),{httpMetadata:{contentType:'application/json'}});};
  await persist(job);await fulfillFinerWorks(env,job,persist);
  return reply({orderId:job.providerId||null,reference:job.request.merchantReference,status:job.status,title:items[0].title,...costs(quote),...(job.lastError?{error:job.lastError}:{}),...(job.reason?{reason:job.reason}:{})});
}
