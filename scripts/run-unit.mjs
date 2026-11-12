import {spawnSync} from 'node:child_process';
import {unitFiles} from './test-manifest.mjs';

const types = spawnSync(process.execPath, ['scripts/generate-worker-types.mjs'], {stdio: 'inherit'});
if (types.status !== 0) process.exit(types.status || 1);
const blog = spawnSync(process.execPath, ['scripts/render-blog-pages.mjs'], {stdio: 'inherit'});
if (blog.status !== 0) process.exit(blog.status || 1);

const files = unitFiles();
if (!files.length) {
  console.error('No unit tests found');
  process.exit(1);
}
console.log(`unit tests: ${files.length} files`);
const result = spawnSync(process.execPath, ['--test', ...files], {stdio: 'inherit'});
process.exit(result.status === 0 ? 0 : 1);
