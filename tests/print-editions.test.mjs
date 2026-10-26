import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT,BORDERED_LAYOUT} from '../catalog/edition-layout.mjs';
import {printOptions} from '../catalog/print-sizing.mjs';
import {groupPrintProducts} from '../cloudflare/finerworks-quotes.mjs';
const paintings=products.filter(p=>p.artist==='Paul Murphy');
test('all 38 paintings have 112 image-proportional, uncropped, 300-DPI layouts',()=>{
  assert.equal(paintings.length,38);let count=0;
  for(const p of paintings){
    const art=config.artworks[p.id];assert.equal(art.sizing,'image-proportional');assert.equal(art.sizingApproved,true);
    const options=printOptions(p,config,papers);assert(options.length);
    for(const o of options){
      count++;assert.equal(o.testOnly,false);assert.equal(o.sampleOnly,false);
      // Unframed: FinerWorks adds a 1/2" outer border; the code names the print size, the sheet is 1" larger.
      assert.equal(o.asset.layout,BORDERED_LAYOUT);assert.match(o.paper.sku,/^5M144M9S/);
      assert(o.resolution.dpi>=300);assert(o.print.width>=4&&o.print.height>=4);
      assert.equal(o.paper.width,Math.round((o.print.width+1)*100)/100);assert.equal(o.paper.height,Math.round((o.print.height+1)*100)/100);
      assert(o.image.width<=o.print.width&&o.image.height<=o.print.height);
      const c=o.layoutSpec.crop,s=art.source;
      assert(c.width<=s.widthPx&&c.height<=s.heightPx);
      // Crop-only from the padded edition: at most one hundredth of an inch, no aspect-ratio stretch.
      assert(Math.abs(c.width-c.height*s.widthPx/s.heightPx)<4.5);
      assert(o.image.width<o.paper.width&&o.image.height<o.paper.height);
      assert.equal(o.frameOptions.length,3);
      for(const framed of o.frameOptions){
        // Frames keep the padded borderless edition under the mat, at their existing price.
        assert(framed.ready,`${framed.id}: ${framed.reasons.join(', ')}`);
        assert.equal(framed.asset.sha256,o.asset.editionSha256);assert.notEqual(framed.asset.url,o.asset.url);
        assert.match(framed.baseSku,/^5M144M8S/);
        assert(framed.mat.window.width<o.paper.width&&framed.mat.window.height<o.paper.height);
        assert(framed.mat.outer.width>=framed.mat.window.width+2&&framed.mat.outer.height>=framed.mat.window.height+2);
        assert.equal(framed.unframedAmount,art.variants[o.key].amount);assert(Number(framed.amount)>Number(framed.unframedAmount));
      }
      if(art.enabled)assert(o.ready,`${p.id}/${o.key}: ${o.reasons.join(', ')}`);
    }
  }
  assert.equal(count,112);
});
test('#55 keeps one resolution-limited size now that its 12 × 10 in original is measured',()=>{
  const p=paintings.find(p=>p.id.endsWith('-55'));assert.deepEqual(p.dimensions,{width:12,height:10,unit:'in'});
  const options=printOptions(p,config,papers);assert.equal(options.length,1);
  assert.deepEqual(options[0].paper,{width:5.5,height:5.26,unit:'in',provider:'finerworks',paper:'watercolor-bright-white',sku:'5M144M9S4.5X4.26'});
  assert.deepEqual(options[0].print,{width:4.5,height:4.26,unit:'in'});
  assert.equal(options[0].frameOptions[0].baseSku,'5M144M8S4.76X4.52');
  assert(Math.abs(options[0].image.width-4.5)<.02);assert(Math.abs(options[0].image.height-4.27)<.02);
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
  for(const mutate of [a=>a.sizingApproved=false,a=>a.variants.full.asset.approved=false,a=>a.variants.full.asset.layoutApproved=false,a=>a.variants.full.asset.sourceSha256='0'.repeat(64),a=>a.variants.full.asset.layoutSpec.content.left++,a=>a.variants.full.asset.sampleOnly=true,a=>a.variants.full.asset.url='https://vermillionaurora.com/other.jpg',a=>delete a.variants.full.bordered,a=>a.variants.full.bordered.asset.layoutSpec.crop.left++,a=>a.variants.full.bordered.asset.editionSha256='0'.repeat(64),a=>a.variants.full.bordered.sku='5M144M8S1X1',a=>a.variants.full.bordered.asset.url='https://vermillionaurora.com/other.jpg',a=>a.variants.full.bordered.amount='1.00']){
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
test('bordered files are exact crops of the padded editions, with white only as an equal small-print margin',async()=>{
  let checked=0;
  for(const art of Object.values(config.artworks))for(const v of Object.values(art.variants||{})){
    if(!v.bordered||checked>=12)continue;checked++;
    const {asset}=v.bordered,spec=asset.layoutSpec;
    const bytes=await readFile(new URL('../static/print-editions/'+asset.sha256+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert.equal(asset.editionSha256,v.asset.sha256);
    assert.equal(spec.widthPx,Math.round(asset.printWidthIn*300));assert.equal(spec.heightPx,Math.round(asset.printHeightIn*300));
    assert(spec.crop.left>=v.asset.layoutSpec.content.left&&spec.crop.top>=v.asset.layoutSpec.content.top);
    assert(spec.crop.left+spec.crop.width<=v.asset.layoutSpec.content.left+v.asset.layoutSpec.content.width);
    const m=spec.content;assert(Math.abs(m.left-(spec.widthPx-m.left-m.width))<=1&&Math.abs(m.top-(spec.heightPx-m.top-m.height))<=1&&Math.abs(m.left-m.top)<=1);
  }
  assert.equal(checked,12);
});
test('every generated print file matches its approved hash, paper dimensions and white safety edge',async()=>{
  for(const p of products.filter(p=>config.artworks[p.id]?.sizing==='image-proportional'))for(const {asset} of Object.values(config.artworks[p.id].variants)){
    const bytes=await readFile(new URL('../static/print-editions/'+asset.sha256+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
    const metadata=await sharp(bytes).metadata();assert.equal(metadata.width,asset.layoutSpec.widthPx);assert.equal(metadata.height,asset.layoutSpec.heightPx);
    const edge=await sharp(bytes).extract({left:0,top:0,width:metadata.width,height:4}).raw().toBuffer();assert(edge.every(v=>v>=250));
  }
});
test('a requested 1 inch white margin is embedded on every side', () => {
  const layouts = editionLayouts({widthPx:7082,heightPx:3598},{width:48,height:24,unit:'in'},300,{borderIn:1});
  const medium = layouts.find(choice => choice.key === 'medium');
  assert.equal(layouts.length, 3);
  assert(Math.abs(medium.paper.width - medium.image.width - 2) < 0.03);
  assert(Math.abs(medium.paper.height - medium.image.height - 2) < 0.03);
  assert.equal(medium.layoutSpec.content.top, 300);
  assert(medium.layoutSpec.content.left >= 300);
});
test('group composites never print larger than the physical set (layoutOptions.setDimensions)', () => {
  const l = editionLayouts({widthPx:5604,heightPx:2480}, null, 300, {setDimensions:{width:15,height:6.64,unit:'in'}});
  assert(l.length >= 1 && l.every(c => Math.max(c.image.width, c.image.height) <= 15));
});
