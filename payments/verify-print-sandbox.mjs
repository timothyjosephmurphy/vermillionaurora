// No payment or fulfillment orders are created by this check.
// Only the sandbox receives a short-lived diagnostic credential.
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
import prints from '../cloudflare/print-catalog.mjs';
import {catalogVersion} from '../cloudflare/cart-policy.mjs';

const worker='vermillion-checkout-sandbox';
const base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='CHECKOUT_AUDIT_TOKEN',secret=randomBytes(32).toString('hex');
const cloudflare=async(method,path='',body)=>{
  const response=await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const data=await response.json();
  if(!response.ok||!data.success)throw Error(`Sandbox diagnostic credential ${method} failed: HTTP ${response.status}`);
};
const read=async(path,options={})=>{
  const response=await fetch(base+path,{...options,signal:AbortSignal.timeout(150000)});
  const data=await response.json();
  if(!response.ok)throw Error(`${path} failed: HTTP ${response.status}`);
  return data;
};
let installed=false;
try {
  let health;
  for(let i=0;i<12;i++){
    health=await read('/checkout/health');
    if(health.mode==='sandbox'&&health.release===process.env.DEPLOYED_SHA)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  assert.equal(health.mode,'sandbox');
  assert.equal(health.release,process.env.DEPLOYED_SHA,'Expected sandbox release is not serving yet');
  console.log('Sandbox checkout health:',JSON.stringify(health));
  const provider=await read('/checkout/prints/health');
  console.log('Sandbox print health:',JSON.stringify(provider));
  assert.equal(provider.mode,'sandbox');assert.equal(provider.enabled,true);assert.equal(provider.keyConfigured,true,'Add PRODIGI_API_KEY to the sandbox Worker');
  const catalog=await read('/checkout/cart/catalog');
  assert.equal(catalog.version,catalogVersion);
  const expected=Object.values(prints).filter(p=>p.testOnly);
  assert.equal(expected.length,6);
  const actual=catalog.products.filter(p=>p.type==='print');
  console.log('Sandbox print variants:',JSON.stringify(actual.map(({id,amount,methods})=>({id,amount,methods}))));
  assert.deepEqual(actual.map(p=>p.id).sort(),expected.map(p=>p.id).sort(),'Sandbox print catalog is missing configured variants');
  for(const item of actual){assert.equal(item.amount,prints[item.id].amount);assert.ok(item.methods.includes('paypal'));}
  await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});installed=true;
  const skus=[...new Set(expected.map(p=>p.sku))];
  const verification=await read('/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({skus})});
  console.log('Prodigi sandbox product and quote verification:',JSON.stringify(verification));
  assert.equal(verification.mode,'sandbox');
  assert.equal(verification.results.length,skus.length);
  for(const result of verification.results){
    assert.equal(result.ok,true,`${result.sku}: ${result.error||'Verification failed'}`);
    const dimensions=[result.product.width,result.product.height].sort((a,b)=>a-b);
    for(const print of expected.filter(p=>p.sku===result.sku)){
      const target=[print.paperSize.width,print.paperSize.height].sort((a,b)=>a-b);
      assert.ok(dimensions.every((n,i)=>Math.abs(n-target[i])<0.01),'Vendor paper dimensions differ from the pilot');
    }
  }
  console.log('PASS: sandbox catalog and vendor quotes verified; no payment, email, or print order created.');
  console.log('Test PDFs are staged in static/prints/test; public asset delivery must be confirmed before placing a sandbox order.');
} finally {
  if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary sandbox diagnostic credential removed');}
}
