import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {WORKER_FIRST_PATTERNS, TESTIMONIALS_API, TESTIMONIALS_API_PATTERN, CART_API, CART_API_PATTERN, STICKERS_API, STICKERS_API_PATTERN, LNURLP_PREFIX, LNURLP_PATTERN} from '../worker/routes-config.mjs';

test('wrangler.jsonc run_worker_first matches the canonical route module', () => {
  const config = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
  assert.deepEqual(config.assets.run_worker_first, WORKER_FIRST_PATTERNS);
  assert.equal(TESTIMONIALS_API_PATTERN, `${TESTIMONIALS_API}*`);
  assert.equal(CART_API_PATTERN, `${CART_API}*`);
  assert.equal(STICKERS_API_PATTERN, `${STICKERS_API}*`);
  assert.equal(LNURLP_PATTERN, `${LNURLP_PREFIX}*`);
  const check = spawnSync(process.execPath, ['scripts/sync-worker-routes.mjs', '--check'], {encoding: 'utf8'});
  assert.equal(check.status, 0, check.stderr || check.stdout);
});
