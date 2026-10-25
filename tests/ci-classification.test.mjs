import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

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

test('print-master quotes keep their fast gate unless serving configuration also changes',()=>{
  const files=['catalog/prints.json','static/print-masters/example.jpg','cloudflare/print-catalog.mjs'];
  const prints=classify(files);
  assert.equal(prints.tier,'content');
  assert.equal(prints.print_quotes,'true');
  const mixed=classify([...files,'static/_headers']);
  assert.equal(mixed.tier,'full');
  assert.equal(mixed.print_quotes,'false');
});
