// Upload static/display/, static/wall-paintings/ (and static/print-editions/thumbs/ when present) to the tjm-images
// R2 bucket under the same relative keys (static/display/x.webp -> display/x.webp), skipping
// objects already there with the same size, then verify counts. Usage: node scripts/sync-images-r2.mjs [--force]  (--force re-uploads everything, e.g. to change Cache-Control)
import { readdir, readFile, stat } from 'node:fs/promises';
import { putObject, listKeys } from './lib/r2.mjs';
const roots = ['display', 'wall-paintings', 'gallery-wall', 'print-editions/thumbs'];
let total = 0, uploaded = 0, bad = 0;
for (const root of roots) {
  const files = await readdir(`static/${root}`, { recursive: true, withFileTypes: true }).catch(() => null);
  if (!files) { console.log(`${root}: not present, skipped`); continue; }
  const keys = files.filter(f => f.isFile() && !f.name.startsWith('.')).map(f => `${f.parentPath.slice('static/'.length)}/${f.name}`);
  const have = await listKeys(`${root}/`);
  const todo = [];
  for (const k of keys) if (process.argv.includes('--force') || have.get(k) !== (await stat(`static/${k}`)).size) todo.push(k);
  for (let i = 0; i < todo.length; i += 16) await Promise.all(todo.slice(i, i + 16).map(async k => {
    for (let t = 1; ; t++) try { await putObject(k, await readFile(`static/${k}`)); uploaded++; return; } catch (e) { if (t >= 3) throw e; }
  }));
  const after = await listKeys(`${root}/`);
  const missing = keys.filter(k => !after.has(k));
  bad += missing.length; total += keys.length;
  console.log(`${root}: ${keys.length} local, ${after.size} in R2, ${todo.length} uploaded, ${missing.length} missing`);
}
console.log(`total ${total} files, ${uploaded} uploaded`);
if (bad) process.exit(1);
