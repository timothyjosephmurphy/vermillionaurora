// Refresh exact custom-frame codes and prices in the isolated sandbox. No orders.
import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {readFile,writeFile} from 'node:fs/promises';
import {products} from '../catalog/catalog.mjs';
import {config,papers,printOptions} from '../catalog/prints.mjs';
import {framedMatLayout,sameMat} from '../catalog/matting.mjs';
import {frameFinish,sameFrame} from '../catalog/framing.mjs';
import {publishedFramedPrice} from '../catalog/frame-pricing.mjs';
import frames from '../catalog/finerworks-frames.json' with {type:'json'};
import mats from '../catalog/finerworks-mats.json' with {type:'json'};

const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const endpoint='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN';let secret='',expiry=0,installed=false;
async function credential(method,body){
  const r=await fetch(endpoint+(method==='DELETE'?'/'+name:''),{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();assert(r.ok&&d.success,`Sandbox credential ${method} failed: HTTP ${r.status}`);
}
async function renew(){
  expiry=Date.now()+15*60000;secret=`${expiry}.${randomBytes(32).toString('hex')}`;
  installed=true;await credential('PUT',{name,text:secret,type:'secret_text'});
}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const ids=products.filter(p=>config.artworks[p.id]?.enabled&&config.artworks[p.id]?.sizing==='image-proportional').map(p=>p.id);
const configs=[{url:new URL('../catalog/prints.json',import.meta.url),nested:true},{url:new URL('../catalog/book-prints.json',import.meta.url),nested:false}];
for(const c of configs){c.data=JSON.parse(await readFile(c.url,'utf8'));c.artworks=c.nested?c.data.artworks:c.data;}
const expected=new Set(ids.flatMap(id=>Object.keys(config.artworks[id].variants).flatMap(key=>frames.frames.map(f=>`${id}/${key}/${f.key}`))));
const report={release:process.env.DEPLOYED_SHA,readOnly:true,ordersSubmitted:false,variants:[]};
async function quote(productId){
  let response,data;
  for(let attempt=0;attempt<4;attempt++){
    response=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({task:'edition-framing',productId}),signal:AbortSignal.timeout(150000)});
    data=await response.json();if(response.ok)break;
    if(attempt===3||![404,429,502,503,504].includes(response.status))throw Error(`${productId}: ${data.error||response.status}`);
    await pause(5000*(attempt+1));
  }
  assert.equal(data.readOnly,true);assert.equal(data.ordersSubmitted,false);
  const art=config.artworks[productId],product=products.find(p=>p.id===productId),options=printOptions(product,config,papers);
  assert.equal(data.variants.length,Object.keys(art.variants).length*3);
  for(const q of data.variants){
    assert.equal(q.productId,productId);assert(expected.delete(`${productId}/${q.key}/${q.frameKey}`),'Unexpected or duplicate quote');
    const baseOption=options.find(o=>o.key===q.key),variant=configs.find(c=>c.artworks[productId]).artworks[productId].variants[q.key],asset=variant.asset;
    assert.equal(q.sourceSha256,art.source.sha256);assert.equal(q.assetSha256,asset.sha256);assert.equal(q.baseSku,variant.sku);assert.equal(q.unframedAmount,variant.amount);
    assert.equal(q.pricingRule,'finerworks-frame-at-cost-v1');assert.match(q.sku,/^[A-Za-z0-9._-]{1,160}$/);
    assert(Date.now()-Date.parse(q.quotedAt)<24*60*60*1000,'Use a current provider quote');
    const mat=framedMatLayout(baseOption.paper,baseOption.image,mats.materials[0]);
    const frame=frameFinish(frames.frames.find(f=>f.key===q.frameKey),frames.glazing,mat);
    assert(sameMat(q.mat,mat));assert(sameFrame(q.frame,frame));
    assert.equal(publishedFramedPrice(q,q.sku,variant.amount),q.amount);
    variant.frameOptions||={};
    variant.frameOptions[q.frameKey]={sku:q.sku,baseSku:q.baseSku,mat:q.mat,frame:q.frame,amount:q.amount,unframedAmount:q.unframedAmount,pricingRule:q.pricingRule,quotedAt:q.quotedAt,asset:{...asset,productCode:q.sku,mat:q.mat,frame:q.frame,layoutReview:'full-image-white-border-mat-overlap'}};
    report.variants.push(q);
  }
  console.log(`Verified custom frames: ${productId}`);
}
try{
  assert(process.env.CLOUDFLARE_API_TOKEN);assert.match(report.release||'',/^[a-f0-9]{40}$/);assert(ids.length>0);
  const r=await fetch(base+'/checkout/health',{cache:'no-store',signal:AbortSignal.timeout(15000)}),health=await r.json();
  assert(r.ok&&health.mode==='sandbox'&&health.release===report.release,'Expected sandbox revision is required');
  await renew();
  for(let i=0;i<ids.length;i+=4){
    // Rotate only between settled batches, so in-flight requests keep their token.
    if(expiry-Date.now()<5*60000)await renew();
    const results=await Promise.allSettled(ids.slice(i,i+4).map(quote));
    for(const result of results)if(result.status==='rejected')throw result.reason;
  }
  assert.equal(expected.size,0,'Every enabled print needs all three verified frame finishes');
  for(const c of configs)await writeFile(c.url,JSON.stringify(c.data,null,2)+'\n');
  await writeFile('print-frame-quotes.json',JSON.stringify(report,null,2)+'\n');
  console.log(`PASS: ${report.variants.length} verified frame variants for ${ids.length} artworks; no orders submitted.`);
}finally{if(installed){await credential('DELETE');console.log('Temporary audit credential removed.');}}
