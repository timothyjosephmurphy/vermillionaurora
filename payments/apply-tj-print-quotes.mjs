import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import recipes from '../catalog/tj-print-masters.json' with {type:'json'};
import {publishedPrintPrice} from '../catalog/print-pricing.mjs';
const url=new URL('../catalog/prints.json',import.meta.url),config=JSON.parse(await readFile(url,'utf8'));
const report=JSON.parse(await readFile('tj-print-quotes.json','utf8'));
assert.match(report.release||'',/^[a-f0-9]{40}$/);assert.equal(report.readOnly,true);assert.equal(report.ordersSubmitted,false);
const expected=new Set(recipes.flatMap(r=>Object.keys(config.artworks[r.id].variants).map(k=>r.id+'/'+k)));
assert.equal(report.variants.length,expected.size);
for(const q of report.variants){
  assert(expected.delete(q.productId+'/'+q.key));const v=config.artworks[q.productId].variants[q.key];
  assert.equal(q.sku,v.sku);assert(Date.now()-Date.parse(q.quotedAt)<86400000);assert(publishedPrintPrice(q,v.sku));
  Object.assign(v,{amount:q.amount,pricingRule:q.pricingRule,quotedAt:q.quotedAt});
}
assert.equal(expected.size,0);
for(const r of recipes)config.artworks[r.id].enabled=true;
await writeFile(url,JSON.stringify(config,null,2)+'\n');
console.log(`Applied ${report.variants.length} verified print prices.`);
