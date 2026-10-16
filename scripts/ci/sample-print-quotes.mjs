// Print-master-only PRs: confirm the changed paintings already existed on main, then take 3 sampled
// read-only supplier quotes (isolated sandbox, already deployed with this PR's catalog) and require
// they match catalog/prints.json. No payments, no orders, no holds.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {readFileSync} from 'node:fs';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
const head=JSON.parse(readFileSync('catalog/prints.json','utf8')).artworks;
const main=JSON.parse(execFileSync('git',['show',`${process.env.BASE_REF||'origin/main'}:catalog/prints.json`],{encoding:'utf8',maxBuffer:1<<28})).artworks;
const changed=Object.keys(head).filter(id=>JSON.stringify(head[id])!==JSON.stringify(main[id]));
assert(changed.length,'No print artwork changed');
for(const id of changed)assert(main[id]&&head[id],`Not an existing painting: ${id} (print-master tier only covers existing paintings)`);
assert(Object.keys(main).every(id=>head[id]),'A print artwork was removed');
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
  assert(r.ok,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
// The freshly installed secret can take a few seconds to reach the Worker; retry 404s briefly.
const verify=async body=>{let r;for(let t=0;t<6;t++){r=await fetch(base+'/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(150000)});if(r.status!==404)break;await new Promise(z=>setTimeout(z,5000));}const d=await r.json();assert(r.ok,d.error||r.status);assert.equal(d.ordersSubmitted,false);return d;};
let installed=false;
try{
  for(let i=0;i<24;i++){const h=await (await fetch(base+'/checkout/health',{cache:'no-store'})).json();if(h.release===process.env.DEPLOYED_SHA)break;assert(i<23,'Sandbox release not ready');await new Promise(r=>setTimeout(r,5000));}
  installed=true;await credential('PUT',{name,text:secret,type:'secret_text'});
  // Samples: the largest unframed size of each changed painting, then framed options, 3 quotes total.
  const samples=[];
  for(const id of changed){const keys=Object.keys(head[id].variants);samples.push({id,key:keys[0]});for(const k of keys)samples.push({id,key:k,frame:'black'});}
  let n=0;
  for(const s of samples.slice(0,3)){
    const d=await verify(s.frame?{task:'edition-framing',productId:s.id}:{task:'edition-prices',productIds:[s.id]});
    const q=d.variants.find(v=>v.key===s.key&&(s.frame?v.frameKey===s.frame:true));assert(q,`No quote for ${s.id}/${s.key}`);
    const v=head[s.id].variants[s.key],want=s.frame?v.frameOptions?.[s.frame]?.amount:v.amount;
    assert.equal(q.amount,want,`${s.id}/${s.key}${s.frame?'/'+s.frame:''}: supplier ${q.amount} vs catalog ${want}`);
    console.log(`Quote OK ${s.id}/${s.key}${s.frame?' frame '+s.frame:''}: $${q.amount}`);n++;
  }
  assert.equal(n,Math.min(3,samples.length));
}finally{if(installed)await credential('DELETE');}
