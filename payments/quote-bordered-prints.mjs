// Read-only provider quotes for the unframed outer-border editions. Output: publishable retail snapshots only.
// --shipping=<productId>/<sizeKey> instead quotes one ready unframed print to a placeholder address in ZIP 98122
// (print, shipping and supplier tax). Never submits, validates or pays for an order. Test print only.
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import config from '../catalog/print-config.mjs';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
const shippingArg=process.argv.find(a=>a.startsWith('--shipping='))?.slice(11);
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();assert(r.ok&&d.success,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
async function verify(input){
  let response;
  for(let retry=0;retry<6;retry++){
    response=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify(input),signal:AbortSignal.timeout(150000)});
    if(response.status!==404)break;
    await new Promise(r=>setTimeout(r,5000));
  }
  const data=await response.json();
  if(!response.ok){console.log('QUOTE_ERROR '+JSON.stringify(data));throw Error(`${input.task} failed: HTTP ${response.status}`);}
  return data;
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
  if(shippingArg){
    const [productId,sizeKey]=shippingArg.split('/');
    const address={name:'Print Test',street1:'100 Test St',street2:'',city:'Seattle',state:'WA',zip:'98122',country:'US'};
    const q=await verify({task:'shipping',productId,sizeKey,quantity:1,address});
    assert.equal(q.readOnly,true);assert.equal(q.ordersSubmitted,false);
    console.log('TEST_PRINT_QUOTE '+JSON.stringify({productId,sizeKey,shippingMethod:q.shippingMethod,service:q.service,carrier:q.carrier,productionCost:q.productionCost,shipping:q.shipping,supplierTax:q.supplierTax,total:q.maximumProviderCost,options:(q.options||[]).map(o=>({id:o.shippingMethod,service:o.service,shipping:o.shipping,supplierTax:o.supplierTax,total:o.maximumProviderCost}))}));
    console.log('PASS: one read-only shipping quote; no orders, validation or payments.');
  } else {
    const ids=Object.keys(config.artworks).filter(id=>config.artworks[id].sizing==='image-proportional'&&config.artworks[id].enabled===true).sort();
    let count=0;
    for(let i=0;i<ids.length;i+=10){
      const data=await verify({task:'edition-prices',productIds:ids.slice(i,i+10)});
      assert.equal(data.readOnly,true);assert.equal(data.ordersSubmitted,false);assert(data.variants.length);
      for(const v of data.variants){assert(ids.includes(v.productId));console.log('BORDERED_RETAIL '+JSON.stringify(v));count++;}
    }
    console.log(`PASS: ${count} exact-size retail quotes for ${ids.length} paintings; no payments or orders.`);
  }
} finally {if(installed){await credential('DELETE');console.log('Temporary audit credential removed.');}}
