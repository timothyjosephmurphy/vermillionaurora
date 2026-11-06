import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  allTestFiles,
  browserFiles,
  nostrFiles,
  printFiles,
  shardFiles,
  unitFiles,
  workerFiles,
} from '../scripts/test-manifest.mjs';
import {parseBrowserArgs} from './run-browser.mjs';

test('every test file belongs to exactly one suite command', () => {
  const suites = {
    test: unitFiles(),
    'test:print': printFiles(),
    'test:worker': workerFiles(),
    'test:nostr': nostrFiles(),
    'test:browser': browserFiles(),
  };
  const owner = new Map();
  for (const [name, files] of Object.entries(suites)) {
    assert.ok(files.length > 0, name);
    for (const file of files) {
      assert.equal(owner.has(file), false, `${file} is in both ${owner.get(file)} and ${name}`);
      owner.set(file, name);
    }
  }
  const missing = allTestFiles().filter(file => !owner.has(file));
  assert.deepEqual(missing, [], `uncovered: ${missing.join(', ')}`);
});

test('package.json scripts invoke those suites', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.scripts.test, /^node scripts\/run-unit\.mjs$/);
  assert.match(pkg.scripts['test:print'], /^node scripts\/run-print\.mjs$/);
  assert.match(pkg.scripts['test:browser'], /^node tests\/run-browser\.mjs$/);
  assert.match(pkg.scripts['test:worker'], /cloudflare\/test/);
  assert.match(pkg.scripts['test:nostr'], /nostr-publisher/);
});

test('printful stickers stay on npm test and are not repeated by the print suite', () => {
  assert.ok(unitFiles().includes('tests/printful-stickers.test.mjs'));
  assert.equal(printFiles().includes('tests/printful-stickers.test.mjs'), false);
  assert.ok(printFiles().some(file => file.startsWith('cloudflare/finerworks-')));
  assert.equal(unitFiles().some(file => file.startsWith('cloudflare/finerworks-')), false);
  assert.equal(unitFiles().some(file => file.startsWith('cloudflare/test/')), false);
});

test('browser shards partition the suite and a bare run lists every file', () => {
  const files = browserFiles();
  const bare = parseBrowserArgs([]);
  assert.deepEqual(bare.files, files);
  assert.equal(bare.engine, null);
  const first = parseBrowserArgs(['--shard=1/2']);
  const second = parseBrowserArgs(['--shard=2/2']);
  assert.deepEqual(first.files, shardFiles(files, 1, 2));
  assert.deepEqual([...first.files, ...second.files].sort(), [...files].sort());
  assert.equal(new Set([...first.files, ...second.files]).size, files.length);
  const webkit = parseBrowserArgs(['--engine=webkit']);
  assert.equal(webkit.engine, 'webkit');
  assert.ok(webkit.files.includes('tests/paintings-wall.browser-test.mjs'));
  assert.equal(webkit.files.includes('tests/smoke.browser-test.mjs'), false);
  assert.throws(() => parseBrowserArgs(['--shard=0/2']), /Invalid shard/);
  assert.throws(() => parseBrowserArgs(['--shard=3/2']), /Invalid shard/);
});
