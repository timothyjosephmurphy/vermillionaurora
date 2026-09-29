import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
const expected=JSON.parse(readFileSync('cloudflare/wrangler.jsonc','utf8')).vars;
const worker='vermillion-commissions';
const base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='CHECKOUT_AUDIT_TOKEN',secret=randomBytes(32).toString('hex');
const cloudflare=async(method,path='',body)=>{
  const r=await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
  const d=await r.json();
  if(!r.ok||!d.success)throw Error(`Production diagnostic credential ${method} failed: HTTP ${r.status}`);
};
let installed=false;
try {
  await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});installed=true;
  let response;
  for(let i=0;i<6;i++){
    response=await fetch(base+'/checkout/readiness',{method:'POST',headers:{Authorization:`Bearer ${secret}`},signal:AbortSignal.timeout(90000)});
    if(response.status!==404)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  const audit=await response.json();
  console.log('Production provider verification:',JSON.stringify(audit));
  if(!response.ok||!audit.ready||audit.mode!=='live'||audit.enabled!==(expected.PAYPAL_CHECKOUT_ENABLED==='true')||audit.release!==(process.env.GITHUB_SHA||expected.CHECKOUT_RELEASE||null))throw Error('Production provider verification failed');
  const r=await fetch(base+'/checkout/status?slug=honeybadger-and-cub-with-genesis-block');
  console.log('Public checkout status HTTP:',r.status);
  if(!audit.enabled&&r.status!==503)throw Error('Expected new checkout to remain disabled');
  if(audit.enabled&&expected.PAYPAL_CHECKOUT_SLUGS==='painting-portrait-in-green') {
    if(r.status!==503)throw Error('A painting outside the pilot is purchasable');
    const pilot=await fetch(base+'/checkout/status?slug=painting-portrait-in-green');
    const state=await pilot.json();
    console.log('Live pilot status:',JSON.stringify(state));
    if(!pilot.ok||state.status!=='available'||state.amount!=='20.00')throw Error('The live pilot is not available at its approved price');
  }
} finally {
  if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary production diagnostic credential removed');}
}
