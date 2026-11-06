// Locate a print master that is still on disk, or confirm the committed manifest
// when the binary has been removed from the checkout.
import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import manifest from '../../data/print-masters-manifest.json' with {type: 'json'};

const byName = new Map(manifest.files.map(file => [file.filename, file]));
const bySha = new Map(manifest.files.map(file => [file.sha256, file]));

export function printMasterManifest() {
  return manifest;
}

export function printMasterRecord(shaOrFilename) {
  const key = String(shaOrFilename || '').split('/').pop();
  return bySha.get(key.replace(/\.[a-z0-9]+$/i, '')) || byName.get(key) || null;
}

export function manifestRecordForUrl(value) {
  let url;
  try { url = new URL(value); } catch { return null; }
  if (!['https://vermillionaurora.com', 'https://tjm.art'].includes(url.origin)) return null;
  return /^\/print-masters\/[a-f0-9]{64}\.(?:jpe?g|png|tif|tiff)$/i.test(url.pathname) ? printMasterRecord(url.pathname.slice('/print-masters/'.length)) : null;
}

export function manifestCoversSource(source) {
  const record = manifestRecordForUrl(source?.url) || printMasterRecord(source?.sha256);
  if (!record || record.sha256 !== source?.sha256) return null;
  if (source.widthPx != null && record.widthPx !== source.widthPx) return null;
  if (source.heightPx != null && record.heightPx !== source.heightPx) return null;
  return record;
}

export function localMasterPath(url) {
  const record = manifestRecordForUrl(url);
  return record ? `static/print-masters/${record.filename}` : '';
}

export async function readPrintMasterBytes(url) {
  const local = localMasterPath(url);
  if (local && existsSync(local)) return readFile(local);
  const record = manifestRecordForUrl(url);
  if (!record || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) return null;
  const {getObject} = await import('./r2.mjs');
  return getObject(record.r2Key, process.env.PRINT_MASTERS_BUCKET || manifest.bucket);
}
