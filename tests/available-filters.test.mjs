import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as cheerio from 'cheerio';
const page=cheerio.load(fs.readFileSync('dist/gallery/available/index.html','utf8'));
test('/gallery/available/ has filters, sort and per-row data (studio-tracker #129)',()=>{
  const form=page('[data-avail-filters]');
  assert.equal(form.length,1);
  for(const name of ['q','price','size','subject','sort'])assert.ok(form.find(`[name="${name}"]`).length,name);
  const rows=page('.painting-list-row');
  assert.ok(rows.length>100);
  rows.each((i,r)=>{
    assert.ok(Number(page(r).attr('data-price'))>0,'price '+i);
    assert.ok(page(r).attr('data-price-band'),'price band '+i);
    assert.ok(page(r).attr('data-search'),'search text '+i);
  });
  assert.ok(rows.filter((i,r)=>page(r).attr('data-size-band')).length>=rows.length-10,'nearly every row has a size band');
});
test('main nav has a Shop link to the available paintings, on Astro and legacy pages',()=>{
  for(const f of ['dist/index.html','dist/about/index.html','dist/gallery/index.html']){
    const $=cheerio.load(fs.readFileSync(f,'utf8'));
    const nav=$('.main-nav a').map((i,e)=>$(e).attr('href')).get();
    assert.equal(nav[nav.indexOf('/gallery/')+1],'/gallery/available/',f);
  }
});
test('/search and /search/ redirect to the available paintings page',()=>{
  const rules=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(l=>l[0]&&!l[0].startsWith('#'));
  for(const p of ['/search','/search/'])assert.deepEqual(rules.find(l=>l[0]===p)?.slice(1),['/gallery/available/','301']);
});
