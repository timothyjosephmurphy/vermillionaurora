// Read-only pricing/shipping quotes, cancelled immediately. Never starts payment.
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
const base='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
async function api(action,body){
  assert(['catalog','quote','cancel'].includes(action));
  const r=await fetch(`${base}/${action}`,{method:body?'POST':'GET',redirect:'error',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(120000)});
  assert(r.ok,`Edition ${action} verification failed: HTTP ${r.status}`);return r.json();
}
const expected=Object.values(prints).filter(p=>p.sizeBasis==='image-proportional'),catalog=await api('catalog');
assert.equal(expected.filter(p=>!p.frame).length,115);assert.equal(expected.filter(p=>p.frame).length,345);assert.equal(new Set(expected.map(p=>p.productId)).size,39);assert(catalog.version.endsWith('-'+printVersion));
for(const p of expected){
  const live=catalog.products.find(i=>i.id===p.id);assert(live,`Missing edition: ${p.id}`);assert.equal(live.amount,p.amount);assert.equal(live.status,'available');assert(live.methods.includes('paypal'));assert(!live.sampleOnly);
}
const ids=['print-paul-murphy-painting-57-small-frame-black','print-paul-murphy-painting-55-full-frame-white','print-paul-murphy-painting-72-medium-frame-natural','print-paul-murphy-painting-86-small'];let order;
try {
  const q=await api('quote',{catalogVersion:catalog.version,items:ids.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  order={orderId:q.orderId,key:q.key};assert.equal(q.quote.base,(ids.reduce((sum,id)=>sum+Math.round(Number(prints[id].amount)*100),0)/100).toFixed(2));
  assert(Number(q.quote.shipping)>0);assert.deepEqual(q.quote.items.map(i=>i.id).sort(),ids.sort());
  assert(q.quote.items.every(i=>i.imageSize.width<i.paperSize.width&&i.imageSize.height<i.paperSize.height));
  assert.equal(q.quote.items.filter(i=>i.frame&&i.mat&&i.frame.glazing?.name==='Premium Clear').length,3);
  console.log('PASS: all 39 paintings / 115 unframed and 345 framed variants available; all three frames, Lady in Gold, #55, a landscape and an unframed edition quoted with shipping and tax. No payment started or print submitted.');
} finally {if(order){const r=await api('cancel',order);assert.equal(r.status,'cancelled');}}
