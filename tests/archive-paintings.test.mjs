import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/archive-paintings.json' with {type:'json'};
import products from '../catalog/archive-products.mjs';
import display from '../scripts/display-images.json' with {type:'json'};

test('every ordered archive pair has one painting, master provenance, and a verified or explicitly missing index',()=>{
  assert.equal(manifest.paintings.length,54);
  assert.equal(products.length,54);
  assert.equal(new Set(manifest.paintings.flatMap(p=>[p.front.key,p.back.key])).size,108);
  assert.equal(manifest.paintings.filter(p=>p.index===null).length,3);
  assert.equal(new Set(manifest.paintings.filter(p=>p.index!==null).map(p=>p.index)).size,51);
  for(const [i,p] of manifest.paintings.entries()){
    assert.equal(p.order,i+1);
    assert.match(p.front.key,/^images\/Archive\/IMG_\d+\.jpg$/i);
    assert.match(p.back.key,/^images\/Archive\/IMG_\d+\.heic$/i);
    for(const source of [p.front,p.back]){assert.match(source.sha256,/^[a-f0-9]{64}$/);assert(source.width>0&&source.height>0);}
    assert.equal(products[i].image.src,p.front.sourceUrl);
    assert.equal(products[i].listing.price?.amount||null,p.originalSale?.amount||null);
    assert.equal(products[i].listing.status,p.originalSale?'available':'not-for-sale');
    const recorded=p.recordedDimensions||p.cataloguedDimensions;
    assert.deepEqual(products[i].dimensions,recorded?{width:recorded.width,height:recorded.height,unit:'in'}:null,'Only recorded or previously catalogued sizes enter measured dimensions');
    assert.equal(products[i].checkout.mode,p.originalSale&&recorded?'integrated':'inquiry');
    if(p.dimensionsInscription)assert.equal(p.dimensionsInscription.unit,'in');
    if(p.index!==null)assert.equal(products[i].title,`Painting #${p.index}`);
    else assert.equal(products[i].title,p.inscription);
    assert(display[p.front.sourceUrl]);
    for(const v of display[p.front.sourceUrl].variants)assert(fs.existsSync(`static${v.src}`));
  }
  // These two pairs were photographed back-first. Do not shift them onto adjacent paintings.
  assert.equal(manifest.paintings[50].front.key,'images/Archive/IMG_1657.jpg');
  assert.equal(manifest.paintings[50].back.key,'images/Archive/IMG_1656.HEIC');
  assert.equal(manifest.paintings[50].index,2);
  assert.equal(manifest.paintings[51].front.key,'images/Archive/IMG_1659.jpg');
  assert.equal(manifest.paintings[51].back.key,'images/Archive/IMG_1658.HEIC');
  assert.equal(manifest.paintings[51].index,4);
});

test('inferred sizes stay approximate and separately attributed from recorded sizes',()=>{
  const estimated=manifest.paintings.filter(p=>p.estimatedDimensions);
  assert.equal(estimated.length,26);
  assert.equal(manifest.paintings.filter(p=>p.cataloguedDimensions).length,2);
  assert.equal(manifest.paintings.filter(p=>p.dimensionReviewNote).length,8);
  for(const p of estimated){
    const d=p.estimatedDimensions;
    assert.equal(d.approximate,true);
    assert.equal(d.unit,'in');
    assert(d.width>0&&d.height>0&&d.tolerancePercent>=10);
    assert(d.evidence.matchingFeatures>=16);
    assert(!p.dimensionsInscription,'Preserve written measurements instead of replacing them with estimates');
    const product=products.find(x=>x.id===p.id);
    assert(product.facts.some(f=>f.label==='Approximate paper size'&&f.value.includes('estimated from photographs')));
  }
});

test('archive gallery and all painting pages render and are discoverable',()=>{
  const $=load(fs.readFileSync('dist/gallery/archived/index.html','utf8'));
  assert.equal($('h1').text(),'Archived Paintings');
  assert.deepEqual($('.archive-card>a').map((_,a)=>$(a).attr('href')).get(),products.map(p=>`/products/${p.id}/`));
  assert.equal($('.archive-card img').length,54);
  assert.equal($('.archive-unindexed').length,3);
  assert.equal($('link[rel="canonical"]').attr('href'),'https://tjm.art/gallery/archived/');
  for(const p of products){
    const page=load(fs.readFileSync(`dist/products/${p.id}/index.html`,'utf8'));
    assert.equal(page('h1').text(),p.title);
    assert.equal(page('.product-availability').text(),p.listing.status==='available'?'Available':'Archived painting');
    assert.equal(page('.product-purchase-actions').length,1);
    assert.equal(page('[data-print-open]').length,1,'Every archive painting has purchasable print editions');
    assert.equal(page('[data-original-purchase]').length,p.listing.status==='available'?1:0);
    assert.equal(page('.product-back').attr('href'),'/gallery/archived/');
    assert(page('.painting-image-trigger img').attr('srcset'));
    assert(!page('main').text().includes('undefined'));
  }
  for(const file of ['index.html','gallery/index.html','book-galleries/index.html']){
    const page=load(fs.readFileSync(`dist/${file}`,'utf8'));
    assert(page('a[href="/gallery/archived/"]').length,file);
  }
});

