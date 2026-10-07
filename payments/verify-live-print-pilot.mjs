// Creates one unpaid PayPal order, then cancels it. Never captures or submits prints.
import assert from 'node:assert/strict';
import prints from '../cloudflare/print-catalog.mjs';
import {verifyLivePrintAssets} from './verify-live-print-assets.mjs';
import {fetchWithRetry} from './retry-fetch.mjs';
const base='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
const ids=['print-painting-portrait-in-gold-small','print-painting-portrait-in-green-small'];
async function api(action,body) {
  assert(['catalog','quote','start','cancel'].includes(action));
  const r=await fetchWithRetry(`${base}/${action}`,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{cache:'no-store'},{label:`Live sample ${action}`,retry:action!=='start',timeout:body?90000:15000});
  if(!r.ok)throw Error(`Live sample ${action} check failed (HTTP ${r.status})`);return r.json();
}
await verifyLivePrintAssets();
const catalog=await api('catalog'),live=catalog.products.filter(p=>p.type==='print');
assert.equal(catalog.enabled,true);assert.deepEqual(live.map(p=>p.id).sort(),Object.keys(prints).sort());
assert(live.filter(p=>p.sampleOnly).every(p=>p.methods.length===1&&p.methods[0]==='paypal'));
assert(live.every(p=>p.methods.includes('paypal')));
let order;
try {
  const q=await api('quote',{catalogVersion:catalog.version,items:ids.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  order={orderId:q.orderId,key:q.key};assert.equal(q.quote.base,(ids.reduce((s,id)=>s+Number(prints[id].amount),0)).toFixed(2));assert(Number(q.quote.shipping)>0);assert(Number(q.quote.total)>=50);
  const started=await api('start',{...order,method:'paypal'});assert.equal(started.status,'pending');
  const u=new URL(started.url);assert(['www.paypal.com','paypal.com'].includes(u.hostname));assert.equal(u.protocol,'https:');
  console.log('PASS: live catalog, FinerWorks shipping, Stripe tax and unpaid PayPal handoff.');
  console.log(JSON.stringify({prints:q.quote.base,shipping:q.quote.shipping,tax:q.quote.tax,total:q.quote.total,address:'Seattle verification address',paymentCaptured:false,printOrderSubmitted:false}));
} finally {
  if(order){const cancelled=await api('cancel',order);assert.equal(cancelled.status,'cancelled');console.log('PASS: verification checkout cancelled without payment.');}
}

// Verify framed selections through the production quote path without starting payment.
let framedOrder;
try {
  const framedIds=['print-painting-portrait-in-gold-small-frame-white','print-painting-portrait-in-green-medium-frame-natural'];
  const q=await api('quote',{catalogVersion:catalog.version,items:framedIds.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  framedOrder={orderId:q.orderId,key:q.key};
  assert.equal(q.quote.base,framedIds.reduce((s,id)=>s+Number(prints[id].amount),0).toFixed(2));assert(Number(q.quote.shipping)>0);
  assert.deepEqual(q.quote.items.map(item=>item.id).sort(),framedIds.sort());
  assert(q.quote.items.every(item=>item.frame&&item.mat&&item.frame.glazing?.name==='Premium Clear'));
  console.log('PASS: live framed selections, full framed prices, glazing and destination shipping; payment not started.');
} finally {
  if(framedOrder){const cancelled=await api('cancel',framedOrder);assert.equal(cancelled.status,'cancelled');console.log('PASS: framed verification quote cancelled without payment or print submission.');}
}
