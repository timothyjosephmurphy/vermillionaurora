// Read-only FinerWorks connection/material/price audit. No order or payment calls.
// Detailed account pricing is encrypted before logging in this public repository.
import {randomBytes,createCipheriv,publicEncrypt} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import prints from '../cloudflare/print-catalog.mjs';

const worker='vermillion-checkout-sandbox';
const base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60*1000}.${randomBytes(32).toString('hex')}`;
const publicKey=readFileSync(new URL('./finerworks-report-public.pem',import.meta.url),'utf8');
const report={provider:'finerworks',release:process.env.DEPLOYED_SHA,createdAt:new Date().toISOString(),readOnly:true,prices:[]};
const cloudflare=async(method,path='',body)=>{
  const response=await fetch(cf+path,{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const data=await response.json();
  if(!response.ok||!data.success)throw Error(`Sandbox diagnostic credential ${method} failed: HTTP ${response.status}`);
};
const read=async(path,options={},notFoundRetries=0)=>{
  for(let attempt=0;;attempt++){
    const response=await fetch(base+path,{...options,redirect:'error',signal:AbortSignal.timeout(150000)});
    if(response.status===404&&attempt<notFoundRetries){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
    let data;try{data=await response.json();}catch{throw Error(`Sandbox ${path} returned a non-JSON response`);}
    if(!response.ok)throw Error(`Sandbox ${path} failed: HTTP ${response.status}`);
    return data;
  }
};
const verify=body=>read('/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify(body)},5);
function sealedReport(value){
  const aes=randomBytes(32),iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',aes,iv);
  const ciphertext=Buffer.concat([cipher.update(gzipSync(JSON.stringify(value))),cipher.final()]);
  const envelope={algorithm:'RSA-OAEP-SHA256+A256GCM+gzip',key:publicEncrypt({key:publicKey,oaepHash:'sha256'},aes).toString('base64'),iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:ciphertext.toString('base64')};
  console.log('FINERWORKS_REPORT_V1 '+Buffer.from(JSON.stringify(envelope)).toString('base64'));
}
let installed=false;
try {
  assert.ok(process.env.CLOUDFLARE_API_TOKEN,'Sandbox Cloudflare deployment token is missing');
  assert.match(process.env.DEPLOYED_SHA||'',/^[a-f0-9]{40}$/,'Expected deployment commit is missing');
  let health;
  for(let i=0;i<18;i++){
    health=await read('/checkout/health');
    if(health.mode==='sandbox'&&health.release===process.env.DEPLOYED_SHA)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  assert.equal(health.mode,'sandbox');assert.equal(health.release,process.env.DEPLOYED_SHA,'Expected sandbox release is not serving yet');
  const provider=await read('/checkout/prints/health');report.health=provider;
  assert.equal(provider.provider,'finerworks');assert.equal(provider.mode,'sandbox');assert.equal(provider.readOnly,true);assert.equal(provider.enabled,false);
  assert.equal(provider.webApiKeyConfigured,true,'Add FINERWORKS_WEB_API_KEY to the sandbox Worker');
  assert.equal(provider.appKeyConfigured,true,'Add FINERWORKS_APP_KEY to the sandbox Worker');
  const catalog=await read('/checkout/cart/catalog');
  assert.ok(catalog.products.filter(p=>p.type==='print').every(p=>!p.methods?.length),'Print purchases must remain unavailable during migration');
  installed=true;await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});
  const credentials=await verify({task:'credentials'});assert.equal(credentials.credentialsOk,true);report.credentialsOk=true;
  console.log('PASS: FinerWorks accepted both credentials; print ordering remains disabled.');
  const materials=await verify({task:'materials'});report.materials=materials;
  assert.ok(materials.media?.length&&materials.styles?.length,'FinerWorks returned no material/style catalog');
  console.log(`PASS: retrieved ${materials.media.length} media and ${materials.styles.length} styles.`);
  const productIds=[...new Set(Object.values(prints).filter(p=>p.testOnly).map(p=>p.productId))].slice(0,10);
  assert.ok(productIds.length,'No pilot artwork identities found');
  const paperPattern=/archival matte|watercolou?r|cold press|etching|torchon|cotton|photo rag/i;
  const papers=materials.media.filter(m=>paperPattern.test(m.name)).sort((a,b)=>Number(/archival matte/i.test(b.name))-Number(/archival matte/i.test(a.name))).slice(0,3);
  for(const paper of papers){
    const styles=materials.styles.filter(s=>paper.styleIds.includes(s.id)&&s.customSizing&&/unmounted|unframed|loose|no mount|no border/i.test(s.name));
    const style=styles.find(s=>s.borderSize===0)||styles[0];
    if(!style){report.prices.push({mediaId:paper.id,mediaName:paper.name,error:'No unmounted/unframed custom-size style matched; review provider catalog'});continue;}
    const result=await verify({task:'prices',productIds,mediaId:paper.id,styleId:style.id});
    report.prices.push(result);
  }
  const priced=report.prices.flatMap(p=>p.candidates||[]).filter(p=>p.ok);
  report.pricedVariants=priced.length;
  assert.ok(priced.length,'Catalog fetched but no pilot prices validated; inspect encrypted report');
  console.log(`PASS: ${priced.length} pilot print prices retrieved. Shipping and tax are not included; prices are in the encrypted report.`);
  console.log('No customer data, payment, email, or print order was submitted.');
}catch(error){report.error=error.message;throw error;}
finally {
  try{if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary sandbox diagnostic credential removed.');}}
  finally{sealedReport(report);}
}
