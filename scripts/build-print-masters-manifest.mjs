// Record every file in static/print-masters/ so builds and tests can check size,
// checksum, and pixel dimensions without the binaries checked out.
// Re-run while the files are on disk: node scripts/build-print-masters-manifest.mjs
import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {readdir, stat, writeFile} from 'node:fs/promises';
import {basename} from 'node:path';
import sharp from 'sharp';

const dir = 'static/print-masters';
const names = (await readdir(dir)).filter(name => !name.startsWith('.')).sort();
const files = [];
for (const filename of names) {
  const path = `${dir}/${filename}`;
  const info = await stat(path);
  if (!info.isFile()) continue;
  const sha256 = await new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    createReadStream(path).on('data', chunk => hash.update(chunk)).on('error', reject).on('end', () => resolve(hash.digest('hex')));
  });
  const meta = await sharp(path).rotate().metadata();
  if (!meta.width || !meta.height) throw Error(`No pixel size: ${filename}`);
  files.push({
    filename,
    bytes: info.size,
    sha256,
    widthPx: meta.width,
    heightPx: meta.height,
    r2Key: `print-masters/${basename(filename)}`,
  });
  process.stdout.write(`\r${files.length}/${names.length} ${filename.slice(0, 12)}`);
}
process.stdout.write('\n');
const manifest = {
  version: 1,
  bucket: 'tjm-print-masters',
  binding: 'PRINT_MASTERS',
  note: 'Full-resolution print masters. Bytes live in the private R2 bucket, not in git or on the public site.',
  files,
};
await writeFile('data/print-masters-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
console.log(`Wrote ${files.length} print masters (${bytes} bytes) to data/print-masters-manifest.json`);
