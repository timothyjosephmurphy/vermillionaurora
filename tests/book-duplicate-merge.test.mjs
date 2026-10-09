import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/book-galleries.json' with {type:'json'};
import bookProducts from '../catalog/book-products.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import collections from '../catalog/collections.json' with {type:'json'};
import {canonicalArtwork,sectionArtworkIds} from '../src/data/canonical-artworks.mjs';
import {PRODUCT_RENAMES,renamedProductPath} from '../worker/product-renames.mjs';
import {readyPrints} from '../catalog/prints.mjs';

// TJ, Oct 2026: "Merge the duplicates and keep the book titles" (17 pairs, then 9 more). Each book scan below is the same painting as a
// catalog page. The catalog page survives (it carries the stock record, cart/PayPal identity and slug-derived
// print IDs) and shows the book title; the scan keeps its data so its own book print IDs stay valid, but its page 301s.
const MERGED={
  'book-art-9b6b4f1ce8b283e14b21':['el-zonte-at-sunrise','Sunrise from Punta El Zonte Hostel'],
  'book-art-024a1e2da99a49b4438a':['myself-my-mother-ruth-my-grandpa-howard','Myself, my mother Ruth, my grandpa Howard'],
  'book-art-ad30c3da712401606ea6':['michael-and-katie-in-yelapa','Michael and Katie in Yelapa'],
  'book-art-1708a7dca996aca40e6c':['painting-guitarist','Girl Tuning Guitar'],
  'book-art-5e4eb881d89ae9f5c635':['painting-sunset-silhouette','Sunset in the Strait of Juan de Fuca, Sucia Island'],
  'book-art-7676696646b77fc3ca94':['sunset-in-el-zonte-el-salvador','Sunset in El Zonte, El Salvador'],
  'book-art-164299ae97e7b62137f5':['painting-moonlit-water','Moonrise Over the Cascades'],
  'book-art-04de39dfa1817b8d1ed9':['painting-figures-in-wheatfield','The Mother of Kiev'],
  'book-art-7718008765132b8bc17f':['painting-studio-figure','Brekkie @BVBTC hoisting a sculpture in progress'],
  'book-art-159503a8e82d7b91c293':['joaquim-in-zihuatanejo','Joaquim in Zihuatanejo'],
  'book-art-a137dffe65723d0b5a07':['daniel-portrait-1','Daniel — portrait 1'],
  'book-art-c8da7882b2a3b7a36874':['painting-clouds-over-water','El Salvador'],
  'book-art-82ab8d65fb50fe0d096a':['painting-sunflower-woman','Vision of Ukraine at Peace'],
  'book-art-1cc00425e5226b3aa20c':['sunset-in-el-tunco-el-salvador','Sunset in El Tunco, El Salvador'],
  'book-art-ef24f49017a62819330d':['painting-portrait-with-cheese','Brekkie @BVBTC with polished Bitcoin B'],
  'book-art-06b4b66f6389416c412c':['girl-wearing-flower-crown','Girl Wearing Flower Crown'],
  'book-art-9f6386bac0e6198f6661':['rice-paddies-in-vietnam','Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith'],
  // Second batch (same rule), visually confirmed.
  'book-art-e1fa746bb51029294a17':['painting-chef-in-white','Jimmy Song @jimmysong'],
  'book-art-04a049ea60a5a09e6873':['painting-red-horizon','Sunset at Kihei on Maui'],
  'book-art-8ff9ac182d32fa228450':['painting-phoenix-rising','The Bounty of Satoshi: Achievement'],
  'book-art-18e4d05240ce63a1a44b':['painting-portrait-in-blue-light','MJ'],
  'book-art-8d1545e1ac13c99eb4ce':['painting-couple-in-color','Aunt Fran and Cousin Hillary'],
  'book-art-f56007f6a7d6ee955caf':['painting-golden-coast','Sunset in the Strait of Juan de Fuca, Patos Island 1'],
  'book-art-29b3572972c367d351d1':['painting-festival-portrait','The Bounty of Satoshi: Wonder'],
  'book-art-ea6e156a9a533d06f198':['grandpa-howard','Grandpa Howard'],
  'book-art-82127d1886ae57d5cb6e':['painting-portrait-with-scarf','Father Paul'],
};
const byId=Object.fromEntries(products.map(p=>[p.id,p]));
const redirects=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(l=>l.length===3);
const sources=new Set(redirects.map(([from])=>from));
const read=path=>load(fs.readFileSync(path,'utf8'));

test('merged duplicates: the catalog page survives with the book title everywhere',()=>{
  for(const [scan,[slug,title]] of Object.entries(MERGED)){
    assert.equal(canonicalArtwork[scan],slug,scan);
    const p=byId[slug];
    assert(p,`${slug} must exist`);
    assert.equal(p.id,p.slug);
    assert.equal(p.title,title);
    assert(bookProducts.some(b=>b.id===scan),`${scan} keeps its data so its book print IDs stay valid`);
    assert(p.facts.some(f=>f.label==='In the book'),`${slug} names its book page`);
    assert.equal(p.image.alt,`${title} by TJ Murphy`);
    const $=read(`dist/products/${slug}/index.html`);
    assert.equal($('h1').text(),title);
    assert.equal($('title').text(),`${title} | TJ Murphy`);
    assert.equal($('meta[property="og:title"]').attr('content'),`${title} — TJ Murphy`);
    assert.equal($('meta[name="twitter:title"]').attr('content'),`${title} — TJ Murphy`);
    assert.equal($('meta[property="og:image:alt"]').attr('content'),`${title} by TJ Murphy`);
    assert($('meta[name="description"]').attr('content').startsWith(title));
    assert.equal($('link[rel=canonical]').attr('href'),`https://tjm.art/products/${slug}/`);
    const ld=$('script[type="application/ld+json"]').map((_,s)=>JSON.parse($(s).text())).get().find(x=>x['@type']==='VisualArtwork');
    assert.equal(ld.name,title);
  }
  // No other catalog page claims a merged title.
  for(const [,[slug,title]] of Object.entries(MERGED))
    assert.equal(products.filter(p=>p.title===title).length,1,title);
});

test('merged duplicates: dropped URLs 301 to the survivor in one hop on both domains',()=>{
  const finals=new Set(products.map(p=>`/products/${p.slug}/`));
  for(const [scan,[slug]] of Object.entries(MERGED)){
    for(const from of [`/products/${scan}/`,`/products/${scan}`]){
      const line=redirects.find(([f])=>f===from);
      assert.deepEqual(line,[from,`/products/${slug}/`,'301'],from);
      assert.equal(renamedProductPath(from),`/products/${slug}/`,`legacy domain one hop for ${from}`);
    }
  }
  for(const [from,to] of redirects.filter(([f])=>f.startsWith('/products/'))){
    assert(!sources.has(to)&&!sources.has(to.replace(/\/$/,'')),`${from} -> ${to} must not chain`);
    if(to.startsWith('/products/'))assert(finals.has(to),`${to} must be a built product page`);
  }
  for(const [old,slug] of Object.entries(PRODUCT_RENAMES)){
    assert(!byId[old],`${old} must no longer be a product id`);
    assert(byId[slug],`${old} -> ${slug} must land on a product`);
  }
});

test('merged duplicates: each painting shows once and feeds list only the survivor',()=>{
  const scans=Object.keys(MERGED);
  for(const group of manifest.sections){
    const $=read(`dist/book-galleries/${group.id}/index.html`);
    const shown=$('.painting-list-row').map((_,r)=>$(r).attr('data-product-id')).get();
    assert.equal(new Set(shown).size,shown.length,`${group.id} lists a painting twice`);
    for(const scan of scans)assert(!shown.includes(scan),`${group.id} still shows ${scan}`);
    assert.deepEqual(shown,sectionArtworkIds(group));
    $('a[href^="/products/book-art-"]').each((_,a)=>assert(!scans.some(s=>$(a).attr('href').startsWith(`/products/${s}/`)),`${group.id} links ${$(a).attr('href')}`));
  }
  for(const entries of Object.values(collections))for(const e of entries)assert(byId[e.product],e.product);
  const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
  const feed=JSON.parse(fs.readFileSync('dist/catalog/products.json','utf8'));
  const inventory=JSON.parse(fs.readFileSync('dist/gallery/inventory.json','utf8'));
  for(const scan of Object.keys(canonicalArtwork)){
    assert(!sitemap.includes(`/products/${scan}/`),scan);
    assert(!feed.products.some(p=>p.id===scan),scan);
    assert(!inventory.paintings.some(p=>p.A===scan),scan);
  }
  for(const old of Object.keys(PRODUCT_RENAMES))assert(!sitemap.includes(`/products/${old}/`),old);
  for(const [,[slug]] of Object.entries(MERGED)){
    assert(sitemap.includes(`https://tjm.art/products/${slug}/`),slug);
    assert(feed.products.some(p=>p.id===slug),slug);
  }
  // Book prints of merged scans (Girl Tuning Guitar, Ukraine) stay purchasable under their unchanged print IDs.
  for(const scan of ['book-art-1708a7dca996aca40e6c','book-art-82ab8d65fb50fe0d096a']){
    const ids=Object.keys(readyPrints).filter(id=>id.startsWith(`print-${scan}-`));
    assert(ids.length>0,scan);
    for(const id of ids)assert(feed.prints.some(p=>p.id===id),id);
  }
});
