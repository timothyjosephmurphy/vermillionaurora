// A read-only check of the already deployed sandbox; no build or deployment.
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const cf='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',token=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function secret(method){
 const r=await fetch(cf+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},...(method==='PUT'?{body:JSON.stringify({name,text:token,type:'secret_text'})}:{}),signal:AbortSignal.timeout(30000)});
 const d=await r.json();if(!r.ok||d.success!==true)throw Error('Sandbox audit credential operation failed');
}
async function verify(body){
 for(let i=0;;i++){
  const r=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(150000)});
  if(r.status===404&&i<6){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
  const d=await r.json();
  if(!r.ok){
   // These catalog-only requests contain no customer, order or billing data.
   // Provider diagnostics have already redacted credential values and emails.
   const detail=d.diagnostic||{};
   console.log('MAT_CHECK_FAILURE '+JSON.stringify({task:body.task,http:r.status,error:d.error,endpoint:detail.endpoint,providerCode:detail.providerStatusCode,
    ...(['/v3/list_mats','/v3/build_product_code','/v3/validate_product'].includes(detail.endpoint)?{message:detail.providerMessage,rootKind:detail.rootKind,fields:detail.rootFields,firstItemFields:detail.firstItemFields,envelopeFields:detail.envelopeFields,encodedShape:detail.encodedShape,validationErrors:detail.validationErrors}:{})}));
   throw Error('FinerWorks mat configuration did not pass validation');
  }
  return d;
 }
}
let installed=false;
try{
 assert(process.env.CLOUDFLARE_API_TOKEN);
 const h=await (await fetch(base+'/checkout/prints/health')).json();assert.equal(h.mode,'sandbox');assert.equal(h.provider,'finerworks');
 // The unframed sandbox pilot may be enabled independently. This script only
 // calls catalog/matting tasks and never the test-order task.
 installed=true;await secret('PUT');
 const mats=await verify({task:'mats'});console.log('VERIFIED_WHITE_MATS '+JSON.stringify(mats.materials.filter(m=>/white/i.test(m.name))));
 const materials=await verify({task:'materials'});console.log('VERIFIED_MAT_STYLES '+JSON.stringify(materials.styles.filter(s=>s.canMat||s.id===8)));
 for(const sizeKey of ['small','medium','full']){
  const o=await verify({task:'matting',productId:'painting-portrait-in-green',sizeKey});
  assert.equal(o.sellable,false);assert.equal(o.ordersSubmitted,false);
  console.log('VERIFIED_MAT_OPTION '+JSON.stringify({key:sizeKey,sku:o.sku,baseSku:o.baseSku,mat:o.mat,material:o.material,amount:o.pricing.recommendedAmount,pricingRule:o.pricing.ruleId,quotedAt:o.quotedAt}));
 }
}finally{if(installed)await secret('DELETE');}
