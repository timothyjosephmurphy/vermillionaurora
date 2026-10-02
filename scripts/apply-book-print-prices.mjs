import fs from 'node:fs';
import assert from 'node:assert/strict';
const file='catalog/book-prints.json';
const artworks=JSON.parse(fs.readFileSync(file));
const snapshot=JSON.parse(fs.readFileSync(process.argv[2]||'catalog/book-print-quotes.json'));
assert.equal(snapshot.ordersSubmitted,false);
const seen=new Set();
for(const q of snapshot.quotes){
  const v=artworks[q.productId]?.variants[q.key];
  assert(v,`Unknown variant: ${q.productId}/${q.key}`);
  assert.equal(q.sku,v.sku);
  assert.equal(q.pricingRule,'finerworks-3.5x-v1');
  assert(/^\d+\.\d{2}$/.test(q.amount)&&Number(q.amount)>0);
  assert(Number.isFinite(Date.parse(q.quotedAt)));
  const key=`${q.productId}/${q.key}`;assert(!seen.has(key));seen.add(key);
  Object.assign(v,{amount:q.amount,pricingRule:q.pricingRule,quotedAt:q.quotedAt});
}
for(const [id,art] of Object.entries(artworks)){
  for(const key of Object.keys(art.variants))assert(seen.has(`${id}/${key}`),`Missing quote: ${id}/${key}`);
  art.enabled=true;
}
fs.writeFileSync(file,JSON.stringify(artworks,null,2)+'\n');
console.log(`Applied ${seen.size} verified quotes across ${Object.keys(artworks).length} artworks.`);
