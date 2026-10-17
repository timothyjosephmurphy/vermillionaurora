// Read-only: lists FinerWorks media/style types via the sandbox diagnostic. No prices, orders or customer data.
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();assert(r.ok&&d.success,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
let installed=false;
try{
  assert(process.env.CLOUDFLARE_API_TOKEN);
  installed=true;await credential('PUT',{name,text:secret,type:'secret_text'});
  let r;
  for(let i=0;i<8;i++){
    r=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({task:'materials'}),signal:AbortSignal.timeout(120000)});
    if(r.status!==404)break;await new Promise(x=>setTimeout(x,5000));
  }
  assert(r.ok,`Materials failed: HTTP ${r.status}`);
  const d=await r.json();assert.equal(d.readOnly,true);
  const paper=[6,144,200];
  for(const m of d.media.filter(m=>paper.includes(m.id)))console.log('MEDIA '+JSON.stringify({id:m.id,productTypeId:m.productTypeId,name:m.name,styleIds:m.styleIds}));
  const used=new Set(d.media.filter(m=>paper.includes(m.id)).flatMap(m=>m.styleIds));
  for(const s of d.styles.filter(s=>used.has(s.id)||/border/i.test(s.name)))console.log('STYLE '+JSON.stringify(s));
  console.log('PASS: read-only materials listed; no prices or orders.');
}finally{if(installed){await credential('DELETE');console.log('Temporary audit credential removed.');}}
