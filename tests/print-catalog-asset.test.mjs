import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {printVersion} from '../cloudflare/print-catalog-version.mjs';
import prints, {printVersion as loadedVersion} from '../cloudflare/print-catalog.mjs';

const workerModules = [
  'cloudflare/commission-worker.js',
  'cloudflare/cart-policy.mjs',
  'cloudflare/cart-checkout.mjs',
  'cloudflare/catalog-overlay.mjs',
  'cloudflare/checkout-sandbox.mjs',
  'cloudflare/cart-order.mjs',
  'cloudflare/print-catalog-asset.mjs',
];

test('the checkout Worker loads the print catalog from static assets, not the JS module', () => {
  for (const file of workerModules) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /from\s+['"][^'"]*print-catalog\.mjs['"]/, file);
    assert.doesNotMatch(source, /from\s+['"][^'"]*print-catalog\.json['"]/, file);
  }
  for (const file of ['cloudflare/wrangler.jsonc', 'cloudflare/wrangler.sandbox.jsonc']) {
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(config.assets.directory, './print-assets', file);
    assert.equal(config.assets.binding, 'ASSETS', file);
    assert.equal(config.assets.run_worker_first, true, file);
    assert.equal(config.assets.html_handling, 'none', file);
    assert.equal(config.assets.not_found_handling, 'none', file);
  }
  const asset = JSON.parse(fs.readFileSync('cloudflare/print-assets/print-catalog.json', 'utf8'));
  assert.equal(asset.printVersion, printVersion);
  assert.equal(loadedVersion, printVersion);
  assert.equal(asset.prints['print-el-zonte-at-sunrise-full'].sku, prints['print-el-zonte-at-sunrise-full'].sku);
  assert.equal(asset.prints['print-el-zonte-at-sunrise-full'].assetUrl, prints['print-el-zonte-at-sunrise-full'].assetUrl);
  assert.ok(asset.prints['print-el-zonte-at-sunrise-full'].amount);
  const probe = spawnSync(process.execPath, ['cloudflare/print-catalog-asset.probe.mjs'], {encoding: 'utf8'});
  assert.equal(probe.status, 0, probe.stderr || probe.stdout);
});
