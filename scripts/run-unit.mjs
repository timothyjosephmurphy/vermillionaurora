import {spawnSync} from 'node:child_process';
import {unitFiles} from './test-manifest.mjs';

const files = unitFiles();
if (!files.length) {
  console.error('No unit tests found');
  process.exit(1);
}
console.log(`unit tests: ${files.length} files`);
const result = spawnSync(process.execPath, ['--test', ...files], {stdio: 'inherit'});
process.exit(result.status === 0 ? 0 : 1);
