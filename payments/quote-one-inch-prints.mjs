// Read-only FinerWorks quotes for the 1 inch style 8 sheets. Never submits an order.
// The sandbox must already be this commit. FINERWORKS_AUDIT_TOKEN is the short-lived
// diagnostic credential (expires within 20 minutes). Refresh the file if a call returns 404.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import prints from '../catalog/prints.json' with {type:'json'};
import books from '../catalog/book-prints.json' with {type:'json'};
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const tokenFile=process.env.AUDIT_TOKEN_FILE||'/tmp/one-inch-audit-token';
async function token(){
  if(process.env.FINERWORKS_AUDIT_TOKEN)return process.env.FINERWORKS_AUDIT_TOKEN.trim();
  return (await readFile(tokenFile,'utf8')).trim();
}
async function verify(body){
  for(let attempt=0;attempt<6;attempt++){
    const response=await fetch(base+'/checkout/prints/verify',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${await token()}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(150000)});
    const data=await response.json().catch(()=>({}));
    if(response.ok)return data;
    if(![404,429,502,503,504].includes(response.status)||attempt===5)throw Error(`${body.task} ${body.productId||(body.productIds||[]).join(',')}: HTTP ${response.status} ${data.error||''}`);
    await new Promise(r=>setTimeout(r,5000*(attempt+1)));
  }
}
const health=await (await fetch(base+'/checkout/health',{cache:'no-store',signal:AbortSignal.timeout(15000)})).json();
assert.equal(health.mode,'sandbox');
if(process.env.DEPLOYED_SHA)assert.equal(health.release,process.env.DEPLOYED_SHA,`Sandbox is ${health.release}`);
const ids=[...new Set([...Object.keys(prints.artworks),...Object.keys(books)])].filter(id=>(prints.artworks[id]||books[id])?.sizing==='image-proportional').sort();
console.log(`Quoting ${ids.length} artworks on sandbox ${health.release}`);
const frames=[];
let cursor=0;
async function worker(){
  while(cursor<ids.length){
    const productId=ids[cursor++];
    const data=await verify({task:'edition-framing',productId});
    assert.equal(data.readOnly,true);assert.equal(data.ordersSubmitted,false);assert(data.variants?.length,productId);
    frames.push(...data.variants);
    console.log(`${cursor}/${ids.length} ${productId} ${data.variants.length}`);
  }
}
await Promise.all(Array.from({length:4},worker));
frames.sort((a,b)=>`${a.productId}/${a.key}/${a.frameKey}`.localeCompare(`${b.productId}/${b.key}/${b.frameKey}`));
await writeFile('one-inch-quotes.json',JSON.stringify({release:health.release,readOnly:true,ordersSubmitted:false,variants:frames},null,2)+'\n');
console.log(`PASS: ${frames.length} framed quotes for ${ids.length} artworks. No orders submitted.`);
