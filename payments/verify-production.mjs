import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
const expected=JSON.parse(readFileSync('cloudflare/wrangler.jsonc','utf8')).vars;
import products from '../catalog/all-products.mjs';
const worker='vermillion-commissions',base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='CHECKOUT_AUDIT_TOKEN',secret=randomBytes(32).toString('hex');
const cloudflare=async(method,path='',body)=>{const r=await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const d=await r.json();if(!r.ok||!d.success)throw Error(`Production diagnostic credential ${method} failed: HTTP ${r.status}`);};
const eligible=products.filter(p=>p.type==='painting'&&p.listing?.status==='available'&&p.listing?.price&&p.dimensions&&p.checkout?.mode==='integrated');
// A freshly installed CHECKOUT_AUDIT_TOKEN reaches some isolates before others. Auth denial is
// HTTP 404 {"error":"Not found"} (checkout-readiness.mjs and sales-maintenance.mjs), so every
// authenticated audit POST retries that status. timeoutMs 0 skips the abort timer (unit tests).
export async function postAudit(url,{token,attempts=6,waitMs=5000,timeoutMs=90000,fetchImpl=fetch,sleep=ms=>new Promise(r=>setTimeout(r,ms))}={}){
  let response;
  for(let attempt=0;attempt<attempts;attempt++){
    response=await fetchImpl(url,{method:'POST',headers:token?{Authorization:`Bearer ${token}`}:undefined,signal:timeoutMs?AbortSignal.timeout(timeoutMs):undefined});
    if(response.status!==404||attempt===attempts-1)break;
    console.warn(`Audit credential not visible yet (${attempt+1}/${attempts}): ${url}`);
    await sleep(waitMs);
  }
  return response;
}
if(process.argv[1]?.endsWith('/verify-production.mjs')||process.argv[1]==='payments/verify-production.mjs'){
 let installed=false;
 try{
  await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});installed=true;
  const response=await postAudit(base+'/checkout/readiness',{token:secret});
  const audit=await response.json();console.log('Production provider verification:',JSON.stringify(audit));
  if(!response.ok||!audit.ready||audit.mode!=='live'||audit.release!==(process.env.GITHUB_SHA||expected.CHECKOUT_RELEASE||null))throw Error('Production provider verification failed');
  // Readiness can succeed on one isolate while another still answers Not found.
  await new Promise(resolve=>setTimeout(resolve,2000));
  const ar=await postAudit(base+'/checkout/sales-maintenance',{token:secret}),archive=await ar.json();console.log('Private sales archive:',JSON.stringify(archive));if(!ar.ok||!archive.ready)throw Error('Sales archive verification failed');
  if(expected.CHECKOUT_RESET_SLUG){const r=await postAudit(base+'/checkout/sales-maintenance?action=reset&slug='+encodeURIComponent(expected.CHECKOUT_RESET_SLUG),{token:secret}),x=await r.json();console.log('Production stock reset:',JSON.stringify(x));if(!r.ok||x.slug!==expected.CHECKOUT_RESET_SLUG||x.result?.priorState!=='sold')throw Error('Production stock reset failed');}
  const denied=await fetch(base+'/checkout/sales-maintenance',{method:'POST'});if(denied.status!==404)throw Error('Unauthenticated accounting access was not denied');
  // The single-painting PayPal routes are removed: /checkout/status must not exist.
  {const r=await fetch(base+'/checkout/status?slug=x');if(r.status!==404)throw Error('Removed PayPal checkout route still answers');}
 }finally{if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary production diagnostic credential removed');}}
}
