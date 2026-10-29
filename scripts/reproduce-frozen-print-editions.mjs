// Rewrite the pre-1-inch sheets at their original content-addressed URLs.
// Already-paid orders keep those URLs. New sells use the 1 inch masters.
import sharp from 'sharp';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {editionLayouts, LEGACY_EDITION_BORDER_IN} from '../catalog/edition-layout.mjs';
import {borderedEdition} from './bordered-edition.mjs';
import {renderEditionSheet} from './render-edition-sheet.mjs';
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
const digest = b => createHash('sha256').update(b).digest('hex');
const run = promisify(execFile);
async function download(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await run('curl', ['--fail', '--silent', '--show-error', '--location', '--connect-timeout', '15', '--max-time', '180', url], {encoding: 'buffer', maxBuffer: 60 * 1024 * 1024});
      return result.stdout;
    } catch (error) {
      if (attempt === 2 || ![6, 7, 18, 28, 52, 56].includes(error.code)) throw Error(`Could not download frozen print source (curl ${error.code}): ${url}`);
    }
  }
}
export async function reproduceFrozenPrints(root) {
  const frozen = JSON.parse(await readFile(new URL('catalog/frozen-order-editions.json', root), 'utf8'));
  if (frozen.borderIn !== LEGACY_EDITION_BORDER_IN || frozen.layout !== 'full-image-white-border-v1') throw Error('Frozen print manifest is not the 1/8 inch sheet');
  const output = new URL('static/print-editions/', root);
  const cache = new URL('.cache/edition-sources/', root);
  await mkdir(output, {recursive: true});
  await mkdir(new URL('thumbs/', output), {recursive: true});
  await mkdir(cache, {recursive: true});
  const stock = papers.find(p => p.paper === 'watercolor-bright-white');
  let count = 0;
  for (const edition of frozen.editions) {
    const sourceUrl = edition.source.url;
    const u = new URL(sourceUrl);
    const localMaster = u.origin === 'https://vermillionaurora.com' && /^\/print-masters\/[a-f0-9]{64}\.jpg$/.test(u.pathname);
    let bytes = localMaster ? await readFile(new URL('static' + u.pathname, root)).catch(() => undefined) : undefined;
    if (!bytes) try { bytes = await readFile(new URL(`${edition.source.sha256}.jpg`, cache)); } catch {}
    if (!bytes) bytes = await download(sourceUrl);
    if (digest(bytes) !== edition.source.sha256) throw Error(`Frozen print source changed: ${edition.id}`);
    await writeFile(new URL(`${edition.source.sha256}.jpg`, cache), bytes);
    const choices = editionLayouts(edition.source, edition.dimensions, 300, edition.layoutOptions || {}, LEGACY_EDITION_BORDER_IN);
    for (const [key, expected] of Object.entries(edition.variants)) {
      const choice = choices.find(c => c.key === key);
      if (!choice) throw Error(`Frozen size missing: ${edition.id}/${key}`);
      const padded = await renderEditionSheet(bytes, choice, LEGACY_EDITION_BORDER_IN);
      if (digest(padded) !== expected.padded) throw Error(`Frozen padded sheet changed: ${edition.id}/${key}`);
      await writeFile(new URL(`${expected.padded}.jpg`, output), padded);
      const bordered = await borderedEdition(padded, choice, {sourceSha256: edition.source.sha256, sha256: expected.padded}, stock);
      if (!bordered || bordered.asset.sha256 !== expected.bordered) throw Error(`Frozen bordered sheet changed: ${edition.id}/${key}`);
      await writeFile(new URL(`${expected.bordered}.jpg`, output), bordered.data);
      count += 2;
    }
  }
  for (const row of frozen.bookBordered) {
    let bytes;
    try { bytes = await readFile(new URL(`${row.paddedSha}.jpg`, cache)); } catch {}
    if (!bytes) bytes = await download(row.paddedUrl);
    if (digest(bytes) !== row.paddedSha) throw Error(`Frozen book sheet changed: ${row.id}/${row.key}`);
    await writeFile(new URL(`${row.paddedSha}.jpg`, cache), bytes);
    const bordered = await borderedEdition(bytes, {layoutSpec: row.paddedLayoutSpec}, {sourceSha256: 'frozen', sha256: row.paddedSha}, stock);
    if (!bordered || bordered.asset.sha256 !== row.borderedSha) throw Error(`Frozen book border changed: ${row.id}/${row.key}`);
    await writeFile(new URL(`${row.borderedSha}.jpg`, output), bordered.data);
    count++;
  }
  console.log(`Reproduced ${count} pre-1-inch print files for already-paid orders.`);
}
