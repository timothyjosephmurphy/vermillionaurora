import {finerworksEnvironment,finerworksRequest,finerworksMaterials,finerworksProductCode,finerworksPrices} from './finerworks-api.mjs';
import {PRINT_SCALES,scaledDimensions,inches} from '../catalog/print-sizing.mjs';
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function finerworksDiagnostic(request,env,products) {
  const action=new URL(request.url).pathname.split('/').at(-1);
  if(action==='health'&&request.method==='GET')return reply({provider:'finerworks',mode:finerworksEnvironment(env,false),webApiKeyConfigured:!!env.FINERWORKS_WEB_API_KEY,appKeyConfigured:!!env.FINERWORKS_APP_KEY,enabled:env.PRINT_CHECKOUT_ENABLED==='true',readOnly:true});
  if(action!=='verify'||request.method!=='POST'||!env.FINERWORKS_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.FINERWORKS_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  const expiry=Number(env.FINERWORKS_AUDIT_TOKEN.split('.')[0]);
  if(!/^\d{13}\.[a-f0-9]{64}$/.test(env.FINERWORKS_AUDIT_TOKEN)||expiry<=Date.now()||expiry>Date.now()+20*60*1000)return reply({error:'Not found'},404);
  if(env.PAYPAL_MODE!=='sandbox'||env.PRINT_CHECKOUT_ENABLED!=='false')return reply({error:'Diagnostics require sandbox checkout with print purchases disabled'},409);
  const raw=await request.text();if(raw.length>4096)return reply({error:'Request too large'},413);
  let input;try{input=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
  if(!input||Array.isArray(input)||typeof input!=='object')return reply({error:'Invalid request'},400);
  const task=input.task||'credentials';
  if(!['credentials','materials','prices'].includes(task))return reply({error:'Unknown read-only diagnostic task'},400);
  try {
    if(task==='credentials'){
      await finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET');
      // The account response contains keys and billing data: never return or log it.
      return reply({provider:'finerworks',mode:'sandbox',readOnly:true,credentialsOk:true,providerAppMode:'not-verified'});
    }
    if(task==='materials')return reply({provider:'finerworks',mode:'sandbox',readOnly:true,...await finerworksMaterials(env)});
    const ids=input.productIds;
    if(!Array.isArray(ids)||ids.length<1||ids.length>10||new Set(ids).size!==ids.length||!Number.isSafeInteger(input.mediaId)||!Number.isSafeInteger(input.styleId))return reply({error:'Choose up to ten catalog paintings and a material/style pair'},400);
    const artworks=ids.map(id=>products.find(p=>p.id===id&&p.type==='painting'&&p.dimensions));
    if(artworks.some(p=>!p))return reply({error:'Only paintings with recorded original measurements can be quoted'},400);
    const materials=await finerworksMaterials(env);
    const media=materials.media.find(m=>m.id===input.mediaId),style=materials.styles.find(s=>s.id===input.styleId);
    if(!media||!style||!media.styleIds.includes(style.id))return reply({error:'Material/style combination not confirmed by FinerWorks'},400);
    const candidates=artworks.flatMap(p=>PRINT_SCALES.map(choice=>{
      const original=inches(p.dimensions),size=scaledDimensions(p.dimensions,choice.scale);
      if(size.width>original.width||size.height>original.height)throw Error('Print dimensions exceed the original');
      const result={productId:p.id,title:p.title,sizeKey:choice.key,scale:choice.scale,original,size,mediaId:media.id,mediaName:media.name,styleId:style.id,styleName:style.name,sellable:false};
      try{return {...result,code:finerworksProductCode(media,style,size)};}
      catch{return {...result,ok:false,error:'Exact size is not supported by this FinerWorks style; not rounded up or enlarged'};}
    }));
    const codes=candidates.filter(c=>c.code).map(c=>c.code);
    const prices=codes.length?await finerworksPrices(env,codes):[];
    return reply({provider:'finerworks',mode:'sandbox',readOnly:true,quotedAt:new Date().toISOString(),shippingIncluded:false,taxIncluded:false,candidates:candidates.map(c=>c.code?{...c,...prices.find(p=>p.code===c.code)}:c)});
  }catch(error){
    return reply({provider:'finerworks',mode:'sandbox',readOnly:true,error:error.message},502);
  }
}
