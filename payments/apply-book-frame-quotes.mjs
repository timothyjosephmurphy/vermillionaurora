// Apply current, supplier-verified frame quotes to their exact approved book editions.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {matLayout,sameMat} from '../catalog/matting.mjs';
import {frameFinish,sameFrame} from '../catalog/framing.mjs';
import frames from '../catalog/finerworks-frames.json' with {type:'json'};
import mats from '../catalog/finerworks-mats.json' with {type:'json'};
const url=new URL('../catalog/book-prints.json',import.meta.url),artworks=JSON.parse(await readFile(url,'utf8'));
const report=JSON.parse(await readFile(process.argv[2],'utf8'));
assert.match(report.release||'',/^[a-f0-9]{40}$/);assert.equal(report.readOnly,true);assert.equal(report.ordersSubmitted,false);
const ids=Object.keys(artworks).filter(id=>artworks[id].enabled&&artworks[id].sizing==='image-proportional');
const expected=new Set(ids.flatMap(id=>Object.keys(artworks[id].variants).flatMap(key=>frames.frames.map(f=>`${id}/${key}/${f.key}`))));
assert.equal(report.variants.length,expected.size,'Every enabled size must have all three current supplier quotes');
for(const q of report.variants){
  const identity=`${q.productId}/${q.key}/${q.frameKey}`;assert(expected.delete(identity),`Unexpected or duplicate frame quote: ${identity}`);
  const art=artworks[q.productId],variant=art.variants[q.key],asset=variant.asset;
  assert.equal(q.sourceSha256,art.source.sha256);assert.equal(q.assetSha256,asset.sha256);assert.equal(q.baseSku,variant.sku);assert.equal(q.unframedAmount,variant.amount);
  assert.equal(q.pricingRule,'finerworks-frame-at-cost-v1');assert.match(q.amount,/^\d+\.\d{2}$/);assert(Number(q.amount)>Number(variant.amount));assert.match(q.sku,/^[A-Za-z0-9._-]{1,160}$/);
  assert(Date.now()-Date.parse(q.quotedAt)<24*60*60*1000,'Use a current FinerWorks quote');
  const mat=matLayout({width:asset.paperWidthIn,height:asset.paperHeightIn},{width:asset.imageWidthIn,height:asset.imageHeightIn},mats.materials[0]);
  const frame=frameFinish(frames.frames.find(f=>f.key===q.frameKey),frames.glazing,mat);
  assert(sameMat(q.mat,mat));assert(sameFrame(q.frame,frame));
  variant.frameOptions||={};
  variant.frameOptions[q.frameKey]={sku:q.sku,baseSku:q.baseSku,mat:q.mat,frame:q.frame,amount:q.amount,unframedAmount:q.unframedAmount,pricingRule:q.pricingRule,quotedAt:q.quotedAt,asset:{...asset,productCode:q.sku,mat:q.mat,frame:q.frame,layoutReview:'full-image-white-border-mat-overlap'}};
}
assert.equal(expected.size,0);await writeFile(url,JSON.stringify(artworks,null,2)+'\n');
console.log(`Applied ${report.variants.length} current frame quotes to ${ids.length} enabled book paintings.`);
