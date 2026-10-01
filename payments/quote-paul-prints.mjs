// Read-only provider quotes. Output contains publishable retail snapshots only.
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import config from '../catalog/prints.json' with {type:'json'};
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();assert(r.ok&&d.success,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
let installed=false;
try {
  assert(process.env.CLOUDFLARE_API_TOKEN);assert.match(process.env.DEPLOYED_SHA||'',/^[a-f0-9]{40}$/);
  let ready=false;
  for(let attempt=0;attempt<12;attempt++){
    const response=await fetch(base+'/checkout/health',{cache:'no-store',signal:AbortSignal.timeout(15000)});
    const health=await response.json();assert.equal(health.mode,'sandbox');
    if(response.ok&&health.release===process.env.DEPLOYED_SHA){ready=true;break;}
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  assert(ready,'Expected sandbox release did not become ready; no audit credential installed');
  installed=true;await credential('PUT',{name,text:secret,type:'secret_text'});
  const ids=Object.keys(config.artworks).filter(id=>config.artworks[id].sizing==='image-proportional');assert.equal(ids.length,39);
  let count=0;
  for(let i=0;i<ids.length;i+=10){
    let response;
    for(let retry=0;retry<6;retry++){
      response=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({task:'edition-prices',productIds:ids.slice(i,i+10)}),signal:AbortSignal.timeout(150000)});
      if(response.status!==404)break;
      await new Promise(r=>setTimeout(r,5000));
    }
    assert(response.ok,`Edition pricing failed: HTTP ${response.status}`);
    const data=await response.json();assert.equal(data.readOnly,true);assert.equal(data.ordersSubmitted,false);assert(data.variants.length);
    for(const v of data.variants){assert(ids.includes(v.productId));console.log('EDITION_RETAIL '+JSON.stringify(v));count++;}
  }
  console.log(`PASS: ${count} exact-size retail quotes for all 39 paintings; no payments or orders.`);
} finally {if(installed){await credential('DELETE');console.log('Temporary audit credential removed.');}}
