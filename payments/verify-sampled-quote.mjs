// Post-deploy checkout check, quote-only: confirms the live catalog matches this build and quotes
// one unframed print and one framed print (cancelled immediately). Originals are covered by the
// read-only status check in verify-production.mjs (no holds). Never starts payment or submits prints.
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
import {fetchWithRetry} from './retry-fetch.mjs';
const base='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
async function api(action,body){
  assert(['catalog','quote','cancel'].includes(action));
  const r=await fetchWithRetry(`${base}/${action}`,{method:body?'POST':'GET',redirect:'error',cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined},{label:`Sampled ${action}`,timeout:120000});
  assert(r.ok,`Sampled ${action} failed: HTTP ${r.status}`);return r.json();
}
const catalog=await api('catalog');
assert.equal(catalog.enabled,true);assert(catalog.version.endsWith('-'+printVersion),'Live print catalog version differs from this build');
const all=Object.values(prints);
for(const p of all){const live=catalog.products.find(i=>i.id===p.id);assert(live,`Missing edition: ${p.id}`);assert.equal(live.amount,p.amount,`Price mismatch: ${p.id}`);assert(live.methods.includes('square'));}
const pick=list=>list[Math.floor(Math.random()*list.length)];
const ready=all.filter(p=>!p.sampleOnly&&!p.testOnly);
const ids=[pick(ready.filter(p=>!p.frame)).id,pick(ready.filter(p=>p.frame)).id];
console.log('Quoting:',ids.join(', '));
let order;
try{
  const q=await api('quote',{catalogVersion:catalog.version,items:ids.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  order={orderId:q.orderId,key:q.key};
  assert.equal(q.quote.base,(ids.reduce((s,id)=>s+Math.round(Number(prints[id].amount)*100),0)/100).toFixed(2));
  assert(Number(q.quote.shipping)>0);assert.deepEqual(q.quote.items.map(i=>i.id).sort(),[...ids].sort());
  assert(q.quote.items.some(i=>i.frame&&i.mat),'Framed print must quote with frame and mat');
  // Washington DOR sales tax: Seattle (location 1726) on prints plus shipping, never $0.
  const taxable=Math.round(Number(q.quote.base)*100)+Math.round(Number(q.quote.shipping)*100);
  assert(Number(q.quote.taxRate)>=0.065,'Seattle quote must carry the WA DOR rate');
  assert.equal(Math.round(Number(q.quote.tax)*100),Math.floor((taxable*Math.round(Number(q.quote.taxRate)*1e6)+500000)/1e6),'WA tax must be rate × (prints + shipping)');
  console.log(`PASS: ${all.length} live print prices match; unframed + framed quote with shipping/tax OK. No payment started, no print submitted.`);
}finally{if(order){const r=await api('cancel',order);assert.equal(r.status,'cancelled');console.log('Quote cancelled.');}}
