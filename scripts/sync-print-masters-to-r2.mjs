// Upload full-resolution print masters into the private tjm-print-masters bucket.
// The bucket is not published at img.tjm.art. The website Worker streams an object only
// when the request carries a valid HMAC signature.
//
// Cutover (after the bucket exists and R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY are set):
//   node scripts/sync-print-masters-to-r2.mjs --from-git origin/main
// Dry-run, no network, checks the git tree against data/print-masters-manifest.json:
//   node scripts/sync-print-masters-to-r2.mjs --from-git origin/main --dry-run
// Verify objects already in R2 (HEAD size + stored sha256 metadata):
//   node scripts/sync-print-masters-to-r2.mjs --from-git origin/main --verify
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile, stat} from 'node:fs/promises';
import manifest from '../data/print-masters-manifest.json' with {type: 'json'};

const dry = process.argv.includes('--dry-run');
const verify = process.argv.includes('--verify');
const fromGit = process.argv.find(arg => arg.startsWith('--from-git='))?.slice('--from-git='.length)
  || (process.argv.includes('--from-git') ? process.argv[process.argv.indexOf('--from-git') + 1] : '');
const bucket = process.env.PRINT_MASTERS_BUCKET || manifest.bucket;

function gitList(rev) {
  const listed = spawnSync('git', ['ls-tree', '-r', '-l', rev, 'static/print-masters'], {encoding: 'utf8'});
  if (listed.status !== 0) throw Error(listed.stderr || `git ls-tree failed for ${rev}`);
  const files = [];
  for (const line of listed.stdout.split('\n')) {
    if (!line.trim()) continue;
    const match = line.match(/^\d+\s+blob\s+[0-9a-f]+\s+(\d+)\t(static\/print-masters\/(\S+))$/);
    if (!match) throw Error(`Unexpected git ls-tree line: ${line}`);
    files.push({filename: match[3], bytes: Number(match[1]), gitPath: match[2]});
  }
  return files.sort((a, b) => a.filename.localeCompare(b.filename));
}

async function localList() {
  const {readdir} = await import('node:fs/promises');
  const names = (await readdir('static/print-masters')).filter(name => !name.startsWith('.')).sort();
  const files = [];
  for (const filename of names) {
    const info = await stat(`static/print-masters/${filename}`);
    if (info.isFile()) files.push({filename, bytes: info.size, gitPath: `static/print-masters/${filename}`});
  }
  return files;
}

function gitBytes(rev, path) {
  const result = spawnSync('git', ['cat-file', 'blob', `${rev}:${path}`], {maxBuffer: 80 * 1024 * 1024});
  if (result.status !== 0) throw Error(`git cat-file failed for ${path}`);
  return result.stdout;
}

const expected = new Map(manifest.files.map(file => [file.filename, file]));
const found = fromGit ? gitList(fromGit) : await localList();
const missing = [...expected.keys()].filter(name => !found.some(file => file.filename === name));
const extra = found.filter(file => !expected.has(file.filename)).map(file => file.filename);
let sizeMismatch = 0;
for (const file of found) {
  const record = expected.get(file.filename);
  if (record && record.bytes !== file.bytes) { sizeMismatch++; console.error(`size mismatch ${file.filename}: tree ${file.bytes}, manifest ${record.bytes}`); }
}
if (missing.length || extra.length || sizeMismatch || found.length !== manifest.files.length) {
  console.error(`manifest ${manifest.files.length}, tree ${found.length}, missing ${missing.length}, extra ${extra.length}, size mismatches ${sizeMismatch}`);
  process.exit(1);
}
console.log(`${dry ? 'dry-run' : verify ? 'verify' : 'upload'} ${found.length} print masters from ${fromGit || 'static/print-masters'} (${found.reduce((sum, file) => sum + file.bytes, 0)} bytes) -> ${bucket}`);
if (dry) {
  console.log('dry-run ok: every manifest filename and byte length matches the tree. No R2 request was made.');
  process.exit(0);
}

const {headObject, putObject} = await import('./lib/r2.mjs');
let uploaded = 0, unchanged = 0;
for (const file of found) {
  const record = expected.get(file.filename);
  const current = await headObject(record.r2Key, bucket).catch(error => { if (!verify) throw error; return null; });
  if (verify) {
    if (!current || current.size !== record.bytes || current.sha256 !== record.sha256) {
      console.error(`R2 mismatch ${record.r2Key}: ${current ? `${current.size} bytes sha ${current.sha256 || 'missing'}` : 'absent'}`);
      process.exitCode = 1;
    }
    continue;
  }
  if (current && current.size === record.bytes && current.sha256 === record.sha256) { unchanged++; continue; }
  const bytes = fromGit ? gitBytes(fromGit, file.gitPath) : await readFile(file.gitPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sha256 !== record.sha256 || bytes.length !== record.bytes) throw Error(`Checksum changed before upload: ${file.filename}`);
  await putObject(record.r2Key, bytes, 'private, no-store', {bucket, headers: {'x-amz-meta-sha256': sha256}});
  uploaded++;
  console.log(`uploaded ${record.r2Key} (${bytes.length})`);
}
if (process.exitCode) process.exit(process.exitCode);
console.log(verify ? `verified ${found.length} objects in ${bucket}` : `uploaded ${uploaded}, unchanged ${unchanged}, bucket ${bucket}`);
