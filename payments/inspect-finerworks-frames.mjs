// Catalog requests only. No order submission or customer information.
import {randomBytes} from 'node:crypto';
import assert from 'node:assert/strict';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const cf='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',token=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function secret(method){
  const r=await fetch(cf+(method==='DELETE'?'/'+name:''),{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},...(method==='PUT'?{body:JSON.stringify({name,text:token,type:'secret_text'})}:{}),signal:AbortSignal.timeout(30000)});
  if(!r.ok||(await r.json()).success!==true)throw Error('Sandbox audit credential operation failed');
}
async function verify(input={}){
  for(let attempt=0;;attempt++){
    const r=await fetch(base+'/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({task:'framing-materials',productId:'painting-portrait-in-green',sizeKey:'small',...input}),signal:AbortSignal.timeout(150000)});
    if(r.status===404&&attempt<6){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
    const d=await r.json();if(!r.ok){console.log('FRAME_CATALOG_ERROR '+JSON.stringify(d));throw Error('Frame catalog check failed');}return d;
  }
}
let installed=false;
try{
  installed=true;await secret('PUT');
  for(const frameKey of ['black','white','natural'])for(const sizeKey of ['small','medium','full']){
    const q=await verify({task:'framing',frameKey,sizeKey});
    assert.equal(q.pricing.amount,q.pricing.recommendedAmount);assert.equal(q.pricing.needsReview,false);
    console.log('VERIFIED_FRAME_OPTION '+JSON.stringify({frameKey,key:sizeKey,sku:q.sku,baseSku:q.baseSku,mat:q.mat,frame:q.frame,amount:q.pricing.recommendedAmount,pricingRule:q.pricing.ruleId,quotedAt:q.quotedAt,cost:q.quote}));
    const address={name:'Sandbox Test',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'};
    const shipping=await verify({task:'shipping',sizeKey,finishKey:`frame-${frameKey}`,quantity:1,address});
    assert.equal(shipping.readOnly,true);assert.equal(shipping.shippingMarkup,'0.00');
    console.log('VERIFIED_FRAME_SHIPPING '+JSON.stringify({frameKey,sizeKey,shipping:shipping.shipping,service:shipping.service}));
    if(sizeKey==='small')for(const productId of ['painting-portrait-in-green','painting-portrait-in-gold']){
      const result=await verify({task:'preflight',productId,sizeKey,finishKey:`frame-${frameKey}`,quantity:1,address});
      assert.equal(result.validated,true);assert.equal(result.ordersSubmitted,false);
      console.log('VERIFIED_FRAME_PREFLIGHT '+JSON.stringify({productId,frameKey,validated:true,ordersSubmitted:false}));
    }
  }
  console.log('PASS: saved framed prices, destination shipping and validation-only preflight. No orders placed.');
}finally{if(installed)await secret('DELETE');}
