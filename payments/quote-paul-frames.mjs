// Read-only supplier verification using the existing isolated sandbox. No orders.
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import products from '../catalog/products.json' with {type:'json'};
import config from '../catalog/prints.json' with {type:'json'};
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();assert(r.ok&&d.success,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let installed=false;
try {
  assert(process.env.CLOUDFLARE_API_TOKEN);assert.match(process.env.DEPLOYED_SHA||'',/^[a-f0-9]{40}$/);
  let ready=false;
  for(let attempt=0;attempt<12;attempt++){
    const response=await fetch(base+'/checkout/health',{cache:'no-store',signal:AbortSignal.timeout(15000)}),health=await response.json();
    assert.equal(health.mode,'sandbox');if(response.ok&&health.release===process.env.DEPLOYED_SHA){ready=true;break;}await pause(5000);
  }
  assert(ready,'Expected sandbox release did not become ready');
  installed=true;await credential('PUT',{name,text:secret,type:'secret_text'});
  const ids=products.filter(p=>p.artist==='Paul Murphy').map(p=>p.id),variants=[];
  assert(ids.length&&ids.every(id=>config.artworks[id]?.sizing==='image-proportional'));
  let cursor=0;
  async function quote(){
    while(cursor<ids.length){
      const productId=ids[cursor++];let data;
      for(let attempt=0;attempt<4;attempt++){
        const response=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({task:'edition-framing',productId}),signal:AbortSignal.timeout(150000)});
        data=await response.json();
        if(response.ok)break;
        if(attempt===3||![404,429,502,503,504].includes(response.status))throw Error(`${productId}: ${data.error||response.status}`);
        await pause(5000*(attempt+1));
      }
      assert.equal(data.readOnly,true);assert.equal(data.ordersSubmitted,false);
      assert.equal(data.variants.length,Object.keys(config.artworks[productId].variants).length*3);
      for(const v of data.variants){assert.equal(v.productId,productId);assert.equal(v.pricingRule,'finerworks-frame-at-cost-v1');variants.push(v);}
      console.log(`Verified ${data.variants.length} frame options for ${productId}`);
    }
  }
  // Settle both workers before removing their shared short-lived credential.
  const results=await Promise.allSettled([quote(),quote()]);
  for(const result of results)if(result.status==='rejected')throw result.reason;
  variants.sort((a,b)=>`${a.productId}/${a.key}/${a.frameKey}`.localeCompare(`${b.productId}/${b.key}/${b.frameKey}`));
  await writeFile('paul-frame-quotes.json',JSON.stringify({release:process.env.DEPLOYED_SHA,readOnly:true,ordersSubmitted:false,variants},null,2)+'\n');
  console.log(`PASS: ${variants.length} verified framed variants across ${ids.length} paintings; no payments or orders.`);
} finally {if(installed){await credential('DELETE');console.log('Temporary audit credential removed.');}}
