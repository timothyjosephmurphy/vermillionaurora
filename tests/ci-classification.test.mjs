import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

function classify(files, forceFull=false) {
  const result=spawnSync(process.execPath,['scripts/ci/classify-changes.mjs'],{
    input:files.join('\n'),
    encoding:'utf8',
    env:{...process.env,GITHUB_OUTPUT:'',FORCE_FULL:String(forceFull)},
  });
  assert.equal(result.status,0,result.stderr);
  return JSON.parse(result.stdout);
}

test('static headers and redirects run application checks, alone or alongside content',()=>{
  for(const file of ['static/_headers','static/_redirects','public/_headers','public/_redirects']){
    assert.equal(classify([file]).tier,'code',file);
    assert.equal(classify(['docs/static-bypass-zone-rules.md',file,'static/blog/photo.webp']).tier,'code',file);
  }
});

test('ordinary content keeps the fast gate',()=>{
  assert.equal(classify(['catalog/products.json','static/blog/photo.webp','src/pages/blog/index.astro','README.md']).tier,'content');
});

test('full-suite triggers still take precedence over static configuration',()=>{
  assert.equal(classify(['static/_headers','worker/site.mjs']).tier,'full');
  assert.equal(classify(['static/_redirects'],true).tier,'full');
  assert.equal(classify([]).tier,'full');
});

test('a story publish is the blog tier',()=>{
  const layers=[
    'scripts/display-files.json',
    'src/pages/blog/index.astro',
    'static/blog/live-looping-guitar/index.html',
    'static/display/live-looping-pedalboard-b4f9ce5363-1600.webp',
    'static/display/live-looping-pedalboard-b4f9ce5363-480.webp',
    'static/display/live-looping-pedalboard-b4f9ce5363-960.webp',
    'static/social/live-looping-guitar-b4f9ce5363.jpg',
    'scripts/blog-media-upload/publish-assets/live-looping-guitar/clip.mp4',
    'scripts/blog-media-upload/manifest.json',
  ];
  assert.equal(classify(layers).tier,'blog');
  assert.equal(classify(['static/blog/photo.webp']).tier,'blog');
  assert.equal(classify(['src/pages/blog/index.astro']).tier,'blog');
  assert.equal(classify(['scripts/blog-media-upload/assets/001.jpg']).tier,'blog');
  assert.equal(classify(layers,true).tier,'full');
});

test('display and social files without a story stay off the blog tier',()=>{
  assert.equal(classify(['static/display/example-960.webp']).tier,'content');
  assert.equal(classify(['static/social/example.jpg']).tier,'content');
  assert.equal(classify(['static/display/example-960.webp','scripts/display-files.json']).tier,'code');
  assert.equal(classify(['scripts/display-files.json']).tier,'code');
  assert.equal(classify(['scripts/blog-media-upload/manifest.json']).tier,'code');
});

test('blog files mixed with catalog, checkout, workers, or CI leave the blog tier',()=>{
  const story=['static/blog/live-looping-guitar/index.html','src/pages/blog/index.astro'];
  assert.equal(classify([...story,'catalog/products.json']).tier,'content');
  assert.equal(classify([...story,'README.md']).tier,'content');
  assert.equal(classify([...story,'docs/publish-blog.md']).tier,'content');
  assert.equal(classify([...story,'static/_headers']).tier,'code');
  assert.equal(classify([...story,'scripts/publish-blog-media.mjs']).tier,'code');
  assert.equal(classify([...story,'scripts/blog-media-upload/worker.mjs']).tier,'code');
  assert.equal(classify([...story,'scripts/blog-media-upload/worker-tjm.mjs']).tier,'code');
  assert.equal(classify([...story,'worker/site.mjs']).tier,'full');
  assert.equal(classify([...story,'cloudflare/wrangler.jsonc']).tier,'full');
  assert.equal(classify([...story,'package.json']).tier,'full');
  assert.equal(classify([...story,'.github/workflows/publish-blog.yml']).tier,'full');
  assert.equal(classify([...story,'scripts/ci/classify-changes.mjs']).tier,'full');
  assert.equal(classify([...story,'src/pages/cart/index.astro']).tier,'full');
});

test('the blog gate does not install or run Playwright',()=>{
  const yml=readFileSync(new URL('../.github/workflows/release-gate.yml',import.meta.url),'utf8');
  assert.match(yml,/Install dependencies without browsers[\s\S]*tier == 'blog'[\s\S]*PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1'[\s\S]*npm ci/);
  const steps=yml.split(/\n      - /).slice(1);
  const playwright=steps.filter(step=>/playwright|smoke\.browser-test|test:browser/.test(step));
  assert.ok(playwright.length>=4);
  for(const step of playwright){
    const line=step.match(/\n        if: (.+)/)?.[1]||'';
    assert.match(line,/steps\.changes\.outputs\.tier == '/);
    assert.equal(line.includes("'blog'"),false,step.slice(0,120));
  }
});

test('print-master quotes keep their fast gate unless serving configuration also changes',()=>{
  const files=['catalog/prints.json','static/print-masters/example.jpg','cloudflare/print-catalog.mjs'];
  const prints=classify(files);
  assert.equal(prints.tier,'content');
  assert.equal(prints.print_quotes,'true');
  const mixed=classify([...files,'static/_headers']);
  assert.equal(mixed.tier,'full');
  assert.equal(mixed.print_quotes,'false');
});
