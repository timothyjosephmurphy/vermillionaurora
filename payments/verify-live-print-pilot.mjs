// Creates one unpaid PayPal order, then cancels it. Never captures or submits prints.
import assert from 'node:assert/strict';
import prints from '../cloudflare/print-catalog.mjs';
import {verifyLivePrintAssets} from './verify-live-print-assets.mjs';
const base='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
const ids=['print-painting-portrait-in-gold-small','print-painting-portrait-in-green-small'];
async function api(action,body) {
  assert(['catalog','quote','start','cancel'].includes(action));
  const r=await fetch(`${base}/${action}`,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)}:{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw Error(`Live sample ${action} check failed (HTTP ${r.status})`);return r.json();
}
await verifyLivePrintAssets();
const catalog=await api('catalog'),live=catalog.products.filter(p=>p.type==='print');
assert.equal(catalog.enabled,true);assert.deepEqual(live.map(p=>p.id).sort(),Object.keys(prints).sort());
assert(live.every(p=>p.sampleOnly&&p.methods.length===1&&p.methods[0]==='paypal'));
let order;
try {
  const q=await api('quote',{catalogVersion:catalog.version,items:ids.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  order={orderId:q.orderId,key:q.key};assert.equal(q.quote.base,'50.00');assert(Number(q.quote.shipping)>0);assert(Number(q.quote.total)>=50);
  const started=await api('start',{...order,method:'paypal'});assert.equal(started.status,'pending');
  const u=new URL(started.url);assert(['www.paypal.com','paypal.com'].includes(u.hostname));assert.equal(u.protocol,'https:');
  console.log('PASS: live catalog, FinerWorks shipping, Stripe tax and unpaid PayPal handoff.');
  console.log(JSON.stringify({prints:q.quote.base,shipping:q.quote.shipping,tax:q.quote.tax,total:q.quote.total,address:'Seattle verification address',paymentCaptured:false,printOrderSubmitted:false}));
} finally {
  if(order){const cancelled=await api('cancel',order);assert.equal(cancelled.status,'cancelled');console.log('PASS: verification checkout cancelled without payment.');}
}
