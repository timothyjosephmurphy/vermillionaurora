import {finerworksEnvironment,finerworksRequest,finerworksMaterials,finerworksProductCode,finerworksPrices} from './finerworks-api.mjs';
import {quoteFinerWorksPrints,validateFinerWorksPrintOrder} from './finerworks-quotes.mjs';
import {PRINT_SCALES,scaledDimensions,inches,printOptions} from '../catalog/print-sizing.mjs';
import {reviewPrintPrice} from '../catalog/print-pricing.mjs';
import config from '../catalog/prints.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {newFinerWorksJob,fulfillFinerWorks,finerworksOrderingReady} from './finerworks-fulfillment.mjs';
import {quoteMattedOption} from './finerworks-matting.mjs';
const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function finerworksDiagnostic(request,env,products) {
  const action=new URL(request.url).pathname.split('/').at(-1);
  if(action==='health'&&request.method==='GET')return reply({provider:'finerworks',mode:finerworksEnvironment(env,false),webApiKeyConfigured:!!env.FINERWORKS_WEB_API_KEY,appKeyConfigured:!!env.FINERWORKS_APP_KEY,enabled:env.PRINT_CHECKOUT_ENABLED==='true',readOnly:!finerworksOrderingReady(env)});
  if(action!=='verify'||request.method!=='POST'||!env.FINERWORKS_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.FINERWORKS_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  const expiry=Number(env.FINERWORKS_AUDIT_TOKEN.split('.')[0]);
  if(!/^\d{13}\.[a-f0-9]{64}$/.test(env.FINERWORKS_AUDIT_TOKEN)||expiry<=Date.now()||expiry>Date.now()+20*60*1000)return reply({error:'Not found'},404);
  if(env.PAYPAL_MODE!=='sandbox')return reply({error:'Diagnostics require sandbox checkout'},409);
  const raw=await request.text();if(raw.length>4096)return reply({error:'Request too large'},413);
  let input;try{input=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
  if(!input||Array.isArray(input)||typeof input!=='object')return reply({error:'Invalid request'},400);
  const task=input.task||'credentials';
  if(!['credentials','materials','prices','shipping','preflight','test-order','matting'].includes(task))return reply({error:'Unknown diagnostic task'},400);
  try {
    if(task==='credentials'){
      await finerworksRequest(env,'/v3/test_my_credentials',undefined,'GET');
      return reply({provider:'finerworks',mode:'sandbox',readOnly:true,credentialsOk:true,providerAppMode:'not-verified'});
    }
    if(task==='materials')return reply({provider:'finerworks',mode:'sandbox',readOnly:true,...await finerworksMaterials(env)});
    if(task==='matting') {
      const product=products.find(p=>p.id===input.productId&&p.type==='painting'),art=config.artworks[input.productId];
      if(!product||!art?.testOnly)return reply({error:'Choose a configured sandbox pilot'},400);
      const option=printOptions(product,config,papers).find(o=>o.key===input.sizeKey);
      if(!option?.paper)return reply({error:'Choose a supported print size'},400);
      const materials=await finerworksMaterials(env);
      const matted=await quoteMattedOption(env,materials,option,art.variants?.[option.key]?.matOptions?.['snow-white']);
      return reply({provider:'finerworks',readOnly:true,ordersSubmitted:false,...matted});
    }
    if(['shipping','preflight','test-order'].includes(task)) {
      const product=products.find(p=>p.id===input.productId&&p.type==='painting'),art=config.artworks[input.productId];
      if(!product||!art?.testOnly||!Number.isSafeInteger(input.quantity)||input.quantity<1||input.quantity>10)return reply({error:'Choose a configured sandbox pilot and valid quantity'},400);
      const baseOption=printOptions(product,config,papers).find(o=>o.key===input.sizeKey);
      const option=input.finishKey==='snow-white'?baseOption?.matOptions?.find(o=>o.finishKey==='snow-white'):input.finishKey&&input.finishKey!=='none'?null:baseOption;
      if(!option?.paper?.sku||!option.amount||option.image.width>inches(product.dimensions).width||option.image.height>inches(product.dimensions).height)return reply({error:'An exact-size priced print is required'},400);
      // Client prices, file URLs, dimensions, and product codes are intentionally ignored.
      const item={id:option.id,provider:'finerworks',sku:option.paper.sku,title:product.title,testOnly:true,quantity:input.quantity,amount:option.amount,assetUrl:option.asset?.url||new URL(product.image.src,'https://vermillionaurora.com').href,imageSize:option.image,paperSize:{width:option.paper.width,height:option.paper.height},...(option.mat?{mat:option.mat,baseSku:option.baseSku}:{})};
      const quote=await quoteFinerWorksPrints(env,[item],input.address);
      if(task==='shipping')return reply({provider:'finerworks',readOnly:true,productId:product.id,sizeKey:option.key,...quote});
      if(task==='test-order') {
        if(!option.ready||!option.testOnly||!env.SALES_ARCHIVE||!finerworksOrderingReady(env))return reply({error:'The sandbox pilot is not ready for an order test'},409);
        if(!/^[a-f0-9]{40}$/.test(input.testRunId||''))return reply({error:'A test release reference is required'},400);
        const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(input.testRunId+option.id)))].map(n=>n.toString(16).padStart(2,'0')).join('');
        const id=`${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`,recordKey=`tests/finerworks/${id}.json`;
        const previous=await env.SALES_ARCHIVE.get(recordKey);
        let job=previous?(await previous.json()).job:newFinerWorksJob(env,{id,mode:'sandbox',quote:{address:input.address,printQuote:quote}},[item]);
        const persist=async next=>{job=next;await env.SALES_ARCHIVE.put(recordKey,JSON.stringify({kind:'unpaid-provider-sandbox-test',id,job}),{httpMetadata:{contentType:'application/json'}});};
        await persist(job);await fulfillFinerWorks(env,job,persist);
        return reply({provider:'finerworks',testMode:true,paymentTaken:false,ordersSubmitted:!!job.providerId,orderId:job.providerId||null,reference:job.request.merchantReference,status:job.status,recordKey});
      }
      return reply(await validateFinerWorksPrintOrder(env,[item],input.address,quote));
    }
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
    const codes=candidates.filter(c=>c.code).map(c=>c.code),prices=codes.length?await finerworksPrices(env,codes):[];
    return reply({provider:'finerworks',mode:'sandbox',readOnly:true,quotedAt:new Date().toISOString(),shippingIncluded:false,taxIncluded:false,candidates:candidates.map(c=>{
      if(!c.code)return c;
      const q=prices.find(p=>p.code===c.code),published=config.artworks[c.productId]?.variants?.[c.sizeKey];
      return {...c,...q,...(q?.ok?{pricing:reviewPrintPrice(q,published?.sku===c.code?published:{})}:{})};
    })});
  }catch(error){return reply({provider:'finerworks',mode:'sandbox',readOnly:true,error:error.message,diagnostic:error.details||null},502);}
}
