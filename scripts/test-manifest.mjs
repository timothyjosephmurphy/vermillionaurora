// Discovers unit, print, worker, nostr, and browser tests so package scripts and the
// release gate share one list. Print and worker files stay on their own commands.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skipDirs = new Set(['node_modules', '.git', 'dist', 'coverage']);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

export function rel(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

export function allTestFiles() {
  return walk(root)
    .map(rel)
    .filter(file => file.endsWith('.test.mjs') || file.endsWith('.browser-test.mjs'))
    .sort();
}

function isBrowserTest(file) {
  return file.endsWith('.browser-test.mjs');
}

// Historical `tests/print*.test.mjs` also matched printful-stickers, which `npm test`
// already runs. Keep that file on the unit command so the print command does not repeat it.
export function printFiles() {
  const extra = new Set(['tests/book-print-framing.test.mjs', 'tests/tj-print-editions.test.mjs']);
  return allTestFiles().filter(file => {
    if (isBrowserTest(file) || !file.endsWith('.test.mjs')) return false;
    if (file === 'tests/printful-stickers.test.mjs') return false;
    if (extra.has(file)) return true;
    if (file.startsWith('cloudflare/finerworks-')) return true;
    return /^tests\/print[^/]*\.test\.mjs$/.test(file);
  }).sort();
}

export function workerFiles() {
  return allTestFiles().filter(file => file.startsWith('cloudflare/test/') && file.endsWith('.test.mjs') && !isBrowserTest(file));
}

export function nostrFiles() {
  return allTestFiles().filter(file => file.startsWith('nostr-publisher/') && file.endsWith('.test.mjs') && !isBrowserTest(file));
}

export function unitFiles() {
  const print = new Set(printFiles());
  return allTestFiles().filter(file => {
    if (isBrowserTest(file) || !file.endsWith('.test.mjs')) return false;
    if (print.has(file) || file.startsWith('cloudflare/test/') || file.startsWith('nostr-publisher/')) return false;
    return file.startsWith('tests/') || file.startsWith('cloudflare/') || file.startsWith('payments/');
  }).sort();
}

export function browserFiles() {
  return allTestFiles().filter(file => /^tests\/[^/]+\.browser-test\.mjs$/.test(file));
}

export function webkitBrowserFiles() {
  return browserFiles().filter(file => {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    return /\bwebkit\s*\.\s*launch\b|\[\s*chromium\s*,\s*webkit\s*\]/.test(source);
  });
}

export function shardFiles(files, index, total) {
  if (!Number.isInteger(index) || !Number.isInteger(total) || total < 1 || index < 1 || index > total) {
    throw new Error(`Invalid shard ${index}/${total}`);
  }
  return files.filter((_, i) => i % total === index - 1);
}
