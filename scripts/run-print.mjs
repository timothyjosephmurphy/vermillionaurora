import {spawnSync} from 'node:child_process';
import {printFiles} from './test-manifest.mjs';

const files = printFiles();
if (!files.length) {
  console.error('No print tests found');
  process.exit(1);
}
console.log(`print tests: ${files.length} files`);
const result = spawnSync(process.execPath, ['--test', ...files], {stdio: 'inherit'});
process.exit(result.status === 0 ? 0 : 1);
