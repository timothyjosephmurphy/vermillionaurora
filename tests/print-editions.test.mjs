import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT,EDITION_BORDER_IN,BORDERED_LAYOUT} from '../catalog/edition-layout.mjs';
import {printOptions} from '../catalog/print-sizing.mjs';
import {groupPrintProducts} from '../cloudflare/finerworks-quotes.mjs';
const paintings=products.filter(p=>p.artist==='Paul Murphy');
test('all 38 paintings use a 1 inch style 8 sheet and are priced from a live FinerWorks quote',()=>{
  assert.equal(EDITION_BORDER_IN,1);assert.equal(EDITION_LAYOUT,'full-image-white-border-v2');
  assert.equal(paintings.length,38);let count=0;
  for(const p of paintings){
    const art=config.artworks[p.id];assert.equal(art.sizing,'image-proportional');assert.equal(art.sizingApproved,true);assert.equal(art.enabled,true);
    const options=printOptions(p,config,papers);assert(options.length);
    for(const o of options){
      count++;assert.equal(o.testOnly,false);assert.equal(o.sampleOnly,false);assert(o.ready,`${o.id}: ${o.reasons.join(', ')}`);
      assert.equal(o.asset.layout,EDITION_LAYOUT);assert.match(o.paper.sku,/^5M144M8S/);assert.equal(o.print,undefined);
      assert(o.resolution.dpi>=300);
      const spec=o.asset.layoutSpec,edge=Math.ceil(EDITION_BORDER_IN*spec.dpi);
      assert(spec.content.left>=edge&&spec.content.top>=edge);
      assert(spec.widthPx-spec.content.left-spec.content.width>=edge&&spec.heightPx-spec.content.top-spec.content.height>=edge);
      assert(o.image.width<o.paper.width&&o.image.height<o.paper.height);
      assert.equal(o.frameOptions.length,3);
      for(const framed of o.frameOptions){
        assert(framed.ready,`${framed.id}: ${framed.reasons.join(', ')}`);
        assert.match(framed.baseSku,/^5M144M8S/);
        assert.equal(framed.unframedAmount,art.variants[o.key].amount);assert(Number(framed.amount)>Number(framed.unframedAmount));
        assert.equal(framed.mat.window.width,o.paper.width);assert.equal(framed.mat.window.height,o.paper.height);
        assert(framed.mat.outer.width>=framed.mat.window.width+2&&framed.mat.outer.height>=framed.mat.window.height+2);
      }
    }
  }
  assert.equal(count,114);
});
test('#55 fits three sizes once the 1 inch margin clears the 4 inch minimum',()=>{
  const p=paintings.find(p=>p.id.endsWith('-55'));assert.deepEqual(p.dimensions,{width:12,height:10,unit:'in'});
  const art=config.artworks[p.id],choices=editionLayouts(art.source,p.dimensions,300,art.layoutOptions);
  const options=printOptions(p,config,papers);assert.equal(options.length,3);
  for(const o of options){
    const choice=choices.find(c=>c.key===o.key);
    assert.equal(o.paper.sku,`5M144M8S${choice.paper.width}X${choice.paper.height}`);
    assert(o.paper.width>=o.image.width+1.9&&o.paper.height>=o.image.height+1.9);
  }
});
test('orientation does not alter original data, invalid metadata fails closed',()=>{
  const source={widthPx:3600,heightPx:4500},original={width:15,height:12,unit:'in'},copy=structuredClone(original);
  assert.equal(editionLayouts(source,original).length,3);assert.deepEqual(original,copy);
  assert.deepEqual(editionLayouts({widthPx:0,heightPx:4500},original),[]);
  assert.deepEqual(editionLayouts(source,original,72),[]);
  assert.deepEqual(editionLayouts(source,{width:12,height:15,unit:'unknown'}),[]);
});
test('unapproved, changed and sample-exemption assets cannot become editions',()=>{
  const p=paintings[0];
  for(const mutate of [a=>a.sizingApproved=false,a=>a.variants.full.asset.approved=false,a=>a.variants.full.asset.layoutApproved=false,a=>a.variants.full.asset.sourceSha256='0'.repeat(64),a=>a.variants.full.asset.layoutSpec.content.left++,a=>a.variants.full.asset.sampleOnly=true,a=>a.variants.full.asset.url='https://vermillionaurora.com/other.jpg',a=>a.variants.full.sku='5M144M8S1X1',a=>a.variants.full.amount='1.00']){
    const c=structuredClone(config);c.artworks[p.id].enabled=true;mutate(c.artworks[p.id]);
    assert.equal(printOptions(p,c,papers).find(o=>o.key==='full').ready,false);
  }
});
test('approved inset layout uses exact paper SKU; other dimension mismatches stay blocked',()=>{
  const item={id:'print-test',quantity:1,provider:'finerworks',sku:'5M144M8S4.76X4.52',paperSize:{width:4.76,height:4.52},imageSize:{width:4.5,height:4.26},layout:EDITION_LAYOUT,sizeBasis:'image-proportional',layoutApproved:true};
  assert.equal(groupPrintProducts([item],'test')[0].product_sku,item.sku);
  for(const alter of [i=>i.layoutApproved=false,i=>delete i.layout,i=>i.imageSize.width=5,i=>i.imageSize.height=NaN,i=>i.paperSize.width=4.75]){const changed=structuredClone(item);alter(changed);assert.throws(()=>groupPrintProducts([changed],'test'));}
});
test('bordered unframed layout names the print size; the 1" larger sheet and image must agree',()=>{
  const item={id:'print-test',quantity:1,provider:'finerworks',sku:'5M144M9S4.5X4.26',printSize:{width:4.5,height:4.26,unit:'in'},paperSize:{width:5.5,height:5.26},imageSize:{width:4.5,height:4.26},layout:BORDERED_LAYOUT,sizeBasis:'image-proportional',layoutApproved:true};
  assert.equal(groupPrintProducts([item],'test')[0].product_sku,item.sku);
  for(const alter of [i=>i.layoutApproved=false,i=>delete i.printSize,i=>i.imageSize.width=4.6,i=>i.paperSize.width=4.5,i=>i.paperSize.height=5.27,i=>i.sku='5M144M9S4.5X4.27',i=>i.mat={id:1,key:'snow-white'}]){const changed=structuredClone(item);alter(changed);assert.throws(()=>groupPrintProducts([changed],'test'));}
});
test('new sells do not keep a style 9 crop, and the frozen order manifest still names the old sheets',async()=>{
  const frozen=JSON.parse(await readFile(new URL('../catalog/frozen-order-editions.json',import.meta.url),'utf8'));
  assert.equal(frozen.borderIn,0.125);assert.equal(frozen.layout,'full-image-white-border-v1');
  assert(frozen.editions.length>=147);assert(frozen.bookBordered.length>=111);
  for(const art of Object.values(config.artworks))for(const v of Object.values(art.variants||{})){
    assert.equal(v.bordered,undefined);
    assert.equal(v.asset.layout,EDITION_LAYOUT);
    assert.match(v.amount,/^\d+\.\d{2}$/);assert.deepEqual(Object.keys(v.frameOptions).sort(),['black','natural','white']);
  }
});
test('every generated print file matches its approved hash, paper dimensions and white safety edge',async()=>{
  for(const p of products.filter(p=>config.artworks[p.id]?.sizing==='image-proportional'))for(const {asset} of Object.values(config.artworks[p.id].variants)){
    const bytes=await readFile(new URL('../static/print-editions/'+asset.sha256+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
    const metadata=await sharp(bytes).metadata();assert.equal(metadata.width,asset.layoutSpec.widthPx);assert.equal(metadata.height,asset.layoutSpec.heightPx);
    const band=Math.min(80,metadata.height);const edge=await sharp(bytes).extract({left:0,top:0,width:metadata.width,height:band}).raw().toBuffer();assert(edge.every(v=>v>=250));
  }
});
test('group composites never print larger than the physical set (layoutOptions.setDimensions)', () => {
  const l = editionLayouts({widthPx:5604,heightPx:2480}, null, 300, {setDimensions:{width:15,height:6.64,unit:'in'}});
  assert(l.length >= 1 && l.every(c => Math.max(c.image.width, c.image.height) <= 15));
});
