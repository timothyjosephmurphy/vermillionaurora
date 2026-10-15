import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
const expected=JSON.parse(readFileSync('cloudflare/wrangler.jsonc','utf8')).vars;
import products from '../catalog/all-products.mjs';
const worker='vermillion-commissions',base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='CHECKOUT_AUDIT_TOKEN',secret=randomBytes(32).toString('hex');
const cloudflare=async(method,path='',body)=>{const r=await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const d=await r.json();if(!r.ok||!d.success)throw Error(`Production diagnostic credential ${method} failed: HTTP ${r.status}`);};
const eligible=products.filter(p=>p.type==='painting'&&p.listing?.status==='available'&&p.listing?.price&&p.dimensions&&p.checkout?.mode==='integrated');
let installed=false;
try{
 await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});installed=true;
 let response;
 for(let i=0;i<6;i++){response=await fetch(base+'/checkout/readiness',{method:'POST',headers:{Authorization:`Bearer ${secret}`},signal:AbortSignal.timeout(90000)});if(response.status!==404)break;await new Promise(resolve=>setTimeout(resolve,5000));}
 const audit=await response.json();console.log('Production provider verification:',JSON.stringify(audit));
 if(!response.ok||!audit.ready||audit.mode!=='live'||audit.release!==(process.env.GITHUB_SHA||expected.CHECKOUT_RELEASE||null))throw Error('Production provider verification failed');
 const ar=await fetch(base+'/checkout/sales-maintenance',{method:'POST',headers:{Authorization:`Bearer ${secret}`},signal:AbortSignal.timeout(90000)}),archive=await ar.json();console.log('Private sales archive:',JSON.stringify(archive));if(!ar.ok||!archive.ready)throw Error('Sales archive verification failed');
 if(expected.CHECKOUT_RESET_SLUG){const r=await fetch(base+'/checkout/sales-maintenance?action=reset&slug='+encodeURIComponent(expected.CHECKOUT_RESET_SLUG),{method:'POST',headers:{Authorization:`Bearer ${secret}`},signal:AbortSignal.timeout(90000)}),x=await r.json();console.log('Production stock reset:',JSON.stringify(x));if(!r.ok||x.slug!==expected.CHECKOUT_RESET_SLUG||x.result?.priorState!=='sold')throw Error('Production stock reset failed');}
 const denied=await fetch(base+'/checkout/sales-maintenance',{method:'POST'});if(denied.status!==404)throw Error('Unauthenticated accounting access was not denied');
 // The single-painting PayPal routes are removed: /checkout/status must not exist.
 {const r=await fetch(base+'/checkout/status?slug=x');if(r.status!==404)throw Error('Removed PayPal checkout route still answers');}
}finally{if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary production diagnostic credential removed');}}
