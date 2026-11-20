// Upload watermarked print-hires WebPs to the public tjm-images bucket.
// Never uploads print masters. Prefers R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY;
// falls back to `wrangler r2 object put --remote` when those are unset.
//   node scripts/sync-print-hires-to-r2.mjs --dir /path/to/out [--dry-run]
import {mkdir, readFile, stat} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import manifest from '../data/print-hires-manifest.json' with {type: 'json'};
import {CACHE_IMAGES, headObject, putObject} from './lib/r2.mjs';

const dry = process.argv.includes('--dry-run');
const dirFlag = process.argv.indexOf('--dir');
const dir = dirFlag >= 0 ? process.argv[dirFlag + 1] : null;
if (!dir) {
  console.error('usage: node scripts/sync-print-hires-to-r2.mjs --dir /path/to/out [--dry-run]');
  process.exit(1);
}

const wranglerBin = process.env.WRANGLER || 'wrangler';
await mkdir('node_modules/.cache/wrangler', {recursive: true});
const useKeys = !!(process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY);

function runWrangler(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(wranglerBin, args, {stdio: ['ignore', 'pipe', 'pipe']});
    let out = '', err = '';
    child.stdout.on('data', chunk => { out += chunk; });
    child.stderr.on('data', chunk => { err += chunk; });
    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) resolve(out);
      else reject(new Error(`wrangler ${args.join(' ')} failed (${code}): ${err || out}`.trim()));
    });
  });
}

async function alreadyUploaded(key, size) {
  if (!useKeys) return false;
  const existing = await headObject(key);
  return !!(existing && existing.size === size);
}

async function upload(key, file, bytes) {
  if (useKeys) {
    await putObject(key, bytes, CACHE_IMAGES);
    return;
  }
  await runWrangler([
    'r2', 'object', 'put', `tjm-images/${key}`,
    '--file', file,
    '--remote',
    '--content-type', 'image/webp',
    '--cache-control', CACHE_IMAGES,
    '--config', 'wrangler.jsonc',
  ]);
}

let uploaded = 0, skipped = 0, missing = 0;
const pending = [];
for (const file of manifest.files) {
  if (/print-masters/i.test(file.key) || !file.key.startsWith('print-hires/')) {
    throw new Error(`refusing to upload non-hires key: ${file.key}`);
  }
  const local = path.join(dir, path.basename(file.key));
  pending.push({file, local});
}

const queue = [...pending];
const workers = Array.from({length: useKeys || dry ? 6 : 3}, async () => {
  while (queue.length) {
    const {file, local} = queue.shift();
    let info;
    try { info = await stat(local); } catch {
      console.error('missing local file', local);
      missing++;
      continue;
    }
    if (info.size !== file.bytes) throw new Error(`size mismatch ${local}: ${info.size} != ${file.bytes}`);
    if (dry) {
      console.log('would upload', file.key, info.size);
      uploaded++;
      continue;
    }
    if (await alreadyUploaded(file.key, info.size)) {
      skipped++;
      continue;
    }
    const bytes = useKeys ? await readFile(local) : null;
    await upload(file.key, local, bytes);
    console.log('uploaded', file.key, info.size);
    uploaded++;
  }
});
await Promise.all(workers);
console.log(JSON.stringify({uploaded, skipped, missing, total: manifest.files.length, dry, method: useKeys ? 's3' : 'wrangler'}));
if (missing) process.exit(1);
