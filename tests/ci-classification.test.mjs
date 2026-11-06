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
  assert.match(yml,/mcr\.microsoft\.com\/playwright:v1\.62\.1-noble/);
  assert.doesNotMatch(yml,/playwright install/);
  assert.doesNotMatch(yml,/fetch-depth:\s*0/);
  assert.match(yml,/^\s*gate:\n(?:.*\n)*?\s*name: gate$/m);
  assert.match(yml,/if: always\(\)/);
  const headers=[...yml.matchAll(/^  ([a-z0-9-]+):\s*$/gm)].map(match=>({name:match[1],index:match.index}));
  for(const job of ['browser-chromium','browser-webkit']){
    const start=headers.find(header=>header.name===job);
    const next=headers.find(header=>header.index>start.index);
    const block=yml.slice(start.index,next?next.index:yml.length);
    assert.match(block,/needs\.prepare\.outputs\.tier == '/,job);
    assert.equal(block.includes("'blog'"),false,job);
    assert.equal(block.includes('fetch-depth: 0'),false,job);
  }
});

test('Neural Dance files alone skip the site rebuild and deploy only what changed',()=>{
  const pages=['src/pages/neural-dance/index.astro','src/pages/neural-dance/live/index.astro','neural-dance/room-lab.js','neural-dance/neural-dance.wasm','static/neural-dance/manifest.webmanifest','tests/neural-dance-live.test.mjs','tests/neural-dance-live.browser-test.mjs','tests/fixtures/neural-dance-camera.html','docs/neural-dance-project-history.md','scripts/render-neural-dance-share.mjs','neural-dance/src/neural_dance.cpp','neural-dance/build.sh','static/brand/neural-dance-share.jpg'];
  const site=classify(pages);
  assert.equal(site.tier,'neural-dance');
  assert.equal(site.deploy_site,'true');
  assert.equal(site.deploy_checkout,'false');
  assert.equal(site.print_quotes,'false');
  const debug=classify(['worker/neural-dance-debug.mjs','neural-dance/debug-protocol.js']);
  assert.equal(debug.tier,'neural-dance');
  assert.equal(debug.deploy_checkout,'true');
  assert.equal(debug.deploy_site,'true');
  const docsOnly=classify(['docs/neural-dance-project-history.md','tests/neural-dance-wasm.test.mjs']);
  assert.equal(docsOnly.tier,'neural-dance');
  assert.equal(docsOnly.deploy_site,'false');
  assert.equal(docsOnly.deploy_checkout,'false');
  assert.equal(classify(pages,true).tier,'full');
  assert.equal(classify([]).tier,'full');
});

test('a file outside Neural Dance keeps the existing tier',()=>{
  assert.equal(classify(['neural-dance/room-lab.js','src/pages/cart/index.astro']).tier,'full');
  assert.equal(classify(['worker/neural-dance-debug.mjs','worker/site.mjs']).tier,'full');
  assert.equal(classify(['worker/neural-dance-debug.mjs','cloudflare/wrangler.jsonc']).tier,'full');
  assert.equal(classify(['worker/neural-dance-debug.mjs','cloudflare/commission-worker.js']).tier,'full');
  assert.equal(classify(['src/pages/neural-dance/live/index.astro','package.json']).tier,'full');
  assert.equal(classify(['src/pages/neural-dance/live/index.astro','.github/workflows/release-gate.yml']).tier,'full');
  assert.equal(classify(['src/pages/neural-dance/live/index.astro','scripts/ci/classify-changes.mjs']).tier,'full');
  assert.equal(classify(['neural-dance/room-lab.js','README.md']).tier,'code');
  assert.equal(classify(['docs/neural-dance-project-history.md','docs/release-control.md']).tier,'content');
  assert.equal(classify(['static/blog/photo.webp']).tier,'blog');
  const outside=classify(['neural-dance/camera-markers.js','catalog/products.json']);
  assert.equal(outside.tier,'code');
  assert.equal(outside.deploy_checkout,'true');
  assert.equal(outside.deploy_site,'true');
});

test('the Neural Dance gate skips the site build and still passes when other jobs are skipped',()=>{
  const yml=readFileSync(new URL('../.github/workflows/release-gate.yml',import.meta.url),'utf8');
  assert.match(yml,/Build the site\n\s+if: steps\.changes\.outputs\.tier != 'neural-dance'/);
  assert.match(yml,/needs: \[prepare, unit-and-print, browser-chromium, browser-webkit, print-quotes, neural-dance\]/);
  assert.match(yml,/result !== 'success' && result !== 'skipped'/);
  const headers=[...yml.matchAll(/^  ([a-z0-9-]+):\s*$/gm)].map(match=>({name:match[1],index:match.index}));
  const start=headers.find(header=>header.name==='neural-dance');
  const next=headers.find(header=>header.index>start.index);
  const block=yml.slice(start.index,next.index);
  assert.match(block,/needs\.prepare\.outputs\.tier == 'neural-dance'/);
  assert.match(block,/neural-dance-\*\.test\.mjs/);
  assert.match(block,/neural-dance-\*\.browser-test\.mjs/);
  assert.equal(block.includes('npm run build'),false);
  const deploy=readFileSync(new URL('../.github/workflows/deploy-production.yml',import.meta.url),'utf8');
  assert.match(deploy,/tier == 'neural-dance'/);
  assert.match(deploy,/deploy_checkout == 'true'/);
  assert.match(deploy,/verify-neural-dance-live\.mjs/);
  assert.match(deploy,/tier != 'neural-dance'/);
});

test('Neural Dance live checks hash scripts and only needle-match new quoted page text',async()=>{
  const {liveChecks,pageNeedles}=await import('../scripts/ci/verify-neural-dance-live.mjs');
  const {neuralDanceAssetUrl,neuralDancePageUrl}=await import('../scripts/ci/classify-changes.mjs');
  assert.equal(neuralDanceAssetUrl('neural-dance/room-lab.js'),'https://tjm.art/neural-dance/room-lab.js');
  assert.equal(neuralDanceAssetUrl('neural-dance/src/neural_dance.cpp'),'');
  assert.equal(neuralDanceAssetUrl('neural-dance/build.sh'),'');
  assert.equal(neuralDanceAssetUrl('static/neural-dance/live/manifest.webmanifest'),'https://tjm.art/neural-dance/live/manifest.webmanifest');
  assert.equal(neuralDanceAssetUrl('static/brand/neural-dance-share.jpg'),'https://tjm.art/brand/neural-dance-share.jpg');
  assert.equal(neuralDanceAssetUrl('static/blog/photo.webp'),'');
  assert.equal(neuralDancePageUrl('src/pages/neural-dance/index.astro'),'https://tjm.art/neural-dance/');
  assert.equal(neuralDancePageUrl('src/pages/neural-dance/live/index.astro'),'https://tjm.art/neural-dance/live/');
  assert.equal(neuralDancePageUrl('src/pages/neural-dance/debug/index.astro'),'https://tjm.art/neural-dance/debug/');
  const checks=liveChecks(['neural-dance/room-lab.js','neural-dance/mural-with-silhouettes.jpeg','src/pages/neural-dance/debug/index.astro','worker/neural-dance-debug.mjs']);
  assert.deepEqual(checks.map(check=>check.kind),['hash','exists','page']);
  assert.deepEqual(pageNeedles('const old="unchanged-string-that-is-long"\n','const old="unchanged-string-that-is-long"\nconst next="a newly quoted neural dance line"\n.rule{color:#fff}\n'),['a newly quoted neural dance line']);
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
