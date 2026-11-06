// Discovers tests/*.browser-test.mjs and runs them. With no flags, every file runs.
// --shard=i/n keeps a stable round-robin slice (shard 1/2 and 2/2 together cover the suite).
// --engine=chromium runs every selected file with PW_ENGINE=chromium.
// --engine=webkit runs only the files that launch WebKit, with PW_ENGINE=webkit.
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {browserFiles, root, shardFiles, webkitBrowserFiles} from '../scripts/test-manifest.mjs';

export function parseBrowserArgs(argv, discovered = browserFiles()) {
  let shard = null;
  let engine = null;
  const only = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--') continue;
    if (arg === '--shard' || arg.startsWith('--shard=')) {
      const value = arg === '--shard' ? argv[++i] : arg.slice('--shard='.length);
      const match = /^(\d+)\/(\d+)$/.exec(value || '');
      if (!match) throw new Error(`Invalid --shard (expected i/n): ${value}`);
      shard = {index: Number(match[1]), total: Number(match[2])};
      shardFiles(['.'], shard.index, shard.total);
      continue;
    }
    if (arg === '--engine' || arg.startsWith('--engine=')) {
      engine = arg === '--engine' ? argv[++i] : arg.slice('--engine='.length);
      if (engine !== 'chromium' && engine !== 'webkit') throw new Error(`Unknown --engine: ${engine}`);
      continue;
    }
    if (arg.startsWith('-')) throw new Error(`Unknown argument: ${arg}`);
    only.push(arg);
  }
  let files = only.length ? [...new Set(only)] : [...discovered];
  if (engine === 'webkit') {
    const webkit = new Set(webkitBrowserFiles());
    files = files.filter(file => webkit.has(file));
  }
  files.sort();
  for (const file of files) {
    if (!fs.existsSync(path.join(root, file))) throw new Error(`Browser test not found: ${file}`);
  }
  if (shard) files = shardFiles(files, shard.index, shard.total);
  return {files, engine, shard};
}

function main() {
  const {files, engine, shard} = parseBrowserArgs(process.argv.slice(2));
  const label = [
    `${files.length} file(s)`,
    shard ? `shard ${shard.index}/${shard.total}` : '',
    engine ? `engine=${engine}` : '',
  ].filter(Boolean).join(', ');
  console.log(`browser tests: ${label}`);
  if (!files.length) {
    console.log('No browser tests in this shard.');
    return;
  }
  const env = {...process.env};
  if (engine) env.PW_ENGINE = engine;
  let failed = 0;
  for (const file of files) {
    console.log(`\n::group::${file}`);
    const result = spawnSync(process.execPath, [file], {stdio: 'inherit', env});
    console.log('::endgroup::');
    if (result.status !== 0) {
      failed++;
      console.error(`FAIL ${file} (exit ${result.status ?? result.signal ?? 'unknown'})`);
    }
  }
  if (failed) {
    console.error(`${failed} browser test file(s) failed`);
    process.exit(1);
  }
  console.log(`PASS ${files.length} browser test file(s)`);
}

const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (entry && entry === import.meta.url) main();
