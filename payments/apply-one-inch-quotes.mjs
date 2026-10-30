// Apply a complete read-only one-inch quote file. Enables an artwork only when every size has three frames.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {publishedPrintPrice} from '../catalog/print-pricing.mjs';
import {publishedFramedPrice} from '../catalog/frame-pricing.mjs';
const report=JSON.parse(await readFile(process.argv[2]||'one-inch-quotes.json','utf8'));
assert.match(report.release||'',/^[a-f0-9]{40}$/);assert.equal(report.readOnly,true);assert.equal(report.ordersSubmitted,false);
assert(Date.now()-Date.parse(report.variants[0]?.quotedAt)<24*60*60*1000,'Use a current supplier quote');
const printsUrl=new URL('../catalog/prints.json',import.meta.url);
const booksUrl=new URL('../catalog/book-prints.json',import.meta.url);
const prints=JSON.parse(await readFile(printsUrl,'utf8'));
const books=JSON.parse(await readFile(booksUrl,'utf8'));
const overlap=Object.keys(prints.artworks).filter(id=>books[id]);
assert.equal(overlap.length,0,`Artwork is in both catalogs: ${overlap.join(',')}`);
const groups=new Map();
for(const q of report.variants){
  const list=groups.get(q.productId)||[];list.push(q);groups.set(q.productId,list);
}
let framed=0,artworks=0;
for(const [id,quotes] of groups){
  const art=prints.artworks[id]||books[id];
  assert(art,`Unknown artwork ${id}`);
  const expected=new Set(Object.keys(art.variants).flatMap(key=>['black','white','natural'].map(frame=>`${key}/${frame}`)));
  for(const q of quotes){
    const identity=`${q.key}/${q.frameKey}`;
    assert(expected.delete(identity),`Unexpected quote ${id}/${identity}`);
    const variant=art.variants[q.key];
    assert.equal(q.baseSku,variant.sku);assert.equal(q.assetSha256,variant.asset.sha256);assert.equal(q.sourceSha256,art.source.sha256);
    assert.equal(q.pricingRule,'finerworks-frame-at-cost-v1');
    const unframed={amount:q.unframedAmount,pricingRule:'finerworks-3.5x-v1',sku:q.baseSku,quotedAt:q.quotedAt};
    assert.equal(publishedPrintPrice(unframed,variant.sku),q.unframedAmount);
    if(variant.amount===undefined)Object.assign(variant,{amount:q.unframedAmount,pricingRule:unframed.pricingRule,quotedAt:q.quotedAt});
    else assert.equal(variant.amount,q.unframedAmount);
    assert.equal(publishedFramedPrice({amount:q.amount,pricingRule:q.pricingRule,sku:q.sku,unframedAmount:q.unframedAmount,quotedAt:q.quotedAt},q.sku,variant.amount),q.amount);
    variant.frameOptions||={};
    variant.frameOptions[q.frameKey]={sku:q.sku,baseSku:q.baseSku,mat:q.mat,frame:q.frame,amount:q.amount,unframedAmount:q.unframedAmount,pricingRule:q.pricingRule,quotedAt:q.quotedAt,asset:{...variant.asset,productCode:q.sku,mat:q.mat,frame:q.frame,layoutReview:'full-image-white-border-v2-mat-overlap'}};
    framed++;
  }
  assert.equal(expected.size,0,`Missing frame quotes for ${id}`);
  art.enabled=true;
  artworks++;
}
const pending=[...Object.keys(prints.artworks),...Object.keys(books)].filter(id=>!(prints.artworks[id]||books[id]).enabled);
assert.equal(pending.length,0,`Still unquoted: ${pending.slice(0,8).join(',')}`);
delete prints.saleHold;
await writeFile(printsUrl,JSON.stringify(prints,null,2)+'\n');
await writeFile(booksUrl,JSON.stringify(books,null,2)+'\n');
console.log(`Applied ${framed} framed prices and enabled ${artworks} artworks.`);
