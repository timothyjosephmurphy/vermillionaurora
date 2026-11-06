// Writes wrangler.jsonc assets.run_worker_first from worker/routes-config.mjs.
// `node scripts/sync-worker-routes.mjs --check` exits 1 when the file has drifted.
import { readFileSync, writeFileSync } from 'node:fs';
import { WORKER_FIRST_PATTERNS } from '../worker/routes-config.mjs';

const file = new URL('../wrangler.jsonc', import.meta.url);
const source = readFileSync(file, 'utf8');
const rendered = `"run_worker_first": ${JSON.stringify(WORKER_FIRST_PATTERNS).replace(/","/g, '", "')}`;
if (!/"run_worker_first": \[[^\]]*\]/.test(source)) {
  console.error('wrangler.jsonc has no assets.run_worker_first array');
  process.exit(1);
}
const next = source.replace(/"run_worker_first": \[[^\]]*\]/, rendered);
let config;
try {
  config = JSON.parse(next);
} catch (error) {
  console.error('wrangler.jsonc is not valid JSON after the route update');
  process.exit(1);
}
if (JSON.stringify(config.assets?.run_worker_first) !== JSON.stringify(WORKER_FIRST_PATTERNS)) {
  console.error('run_worker_first does not match worker/routes-config.mjs');
  process.exit(1);
}
const check = process.argv.includes('--check');
if (next !== source) {
  if (check) {
    console.error('wrangler.jsonc run_worker_first drifted. Run: node scripts/sync-worker-routes.mjs');
    process.exit(1);
  }
  writeFileSync(file, next);
  console.log(`Updated run_worker_first (${WORKER_FIRST_PATTERNS.length} patterns)`);
} else if (!check) {
  console.log(`run_worker_first already matches (${WORKER_FIRST_PATTERNS.length} patterns)`);
}
