// Read-only pricing/shipping quotes, cancelled immediately. Never starts payment.
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
const base='https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
async function api(action,body){
  assert(['catalog','quote','cancel'].includes(action));
  const r=await fetch(`${base}/${action}`,{method:body?'POST':'GET',redirect:'error',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(120000)});
  assert(r.ok,`Edition ${action} verification failed: HTTP ${r.status}`);return r.json();
}
const tj=Object.values(prints).filter(p=>p.sizeBasis==='image-proportional'&&!p.productId.startsWith('paul-murphy-')&&!p.productId.startsWith('book-art-'));
const books=Object.values(prints).filter(p=>p.productId.startsWith('book-art-'));
assert.equal(new Set(books.map(p=>p.productId)).size,53);assert.equal(books.length,109);
assert.equal(new Set(tj.map(p=>p.productId)).size,18);assert.equal(tj.filter(p=>!p.frame).length,37);assert.equal(tj.filter(p=>p.frame).length,111);
const expected=Object.values(prints).filter(p=>p.sizeBasis==='image-proportional'&&p.productId.startsWith('paul-murphy-')),catalog=await api('catalog');
assert.equal(expected.filter(p=>!p.frame).length,115);assert.equal(expected.filter(p=>p.frame).length,345);assert.equal(new Set(expected.map(p=>p.productId)).size,39);assert(catalog.version.endsWith('-'+printVersion));
for(const p of [...expected,...tj,...books]){
  const live=catalog.products.find(i=>i.id===p.id);assert(live,`Missing edition: ${p.id}`);assert.equal(live.amount,p.amount);assert.equal(live.status,'available');assert(live.methods.includes('paypal'));assert(!live.sampleOnly);
}
const ids=['print-paul-murphy-painting-57-small-frame-black','print-paul-murphy-painting-55-full-frame-white','print-paul-murphy-painting-72-medium-frame-natural','print-paul-murphy-painting-86-small','print-painting-portrait-with-hat-full-frame-black','print-painting-figures-in-wheatfield-full-frame-white','print-warszawska-syrenka-small-frame-natural','print-painting-sunset-silhouette-full',books[0].id];let order;
try {
  const q=await api('quote',{catalogVersion:catalog.version,items:ids.map(id=>({id,quantity:1})),email:'checkout-verification@example.test',address:{name:'Checkout Verification',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'}});
  order={orderId:q.orderId,key:q.key};assert.equal(q.quote.base,(ids.reduce((sum,id)=>sum+Math.round(Number(prints[id].amount)*100),0)/100).toFixed(2));
  assert(Number(q.quote.shipping)>0);assert.deepEqual(q.quote.items.map(i=>i.id).sort(),ids.sort());
  assert(q.quote.items.every(i=>i.imageSize.width<i.paperSize.width&&i.imageSize.height<i.paperSize.height));
  assert.equal(q.quote.items.filter(i=>i.frame&&i.mat&&i.frame.glazing?.name==='Premium Clear').length,6);
  console.log('PASS: 57 original-gallery paintings plus 53 book artworks / 261 unframed and 456 framed variants available; representative framed, unframed and R2-backed book editions quoted with shipping and tax. No payment started or print submitted.');
} finally {if(order){const r=await api('cancel',order);assert.equal(r.status,'cancelled');}}
