import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const site = 'https://vermillionaurora.com';
const dist = resolve('dist');
const excluded = new Set(['cart', 'commission-manager', 'print-preview', 'print-test']);
// Old commission package pages 301 to /commissions/ (static/_redirects).
const redirected = new Set(['single-portrait', 'double-portrait', 'small-landscape']);
const pages = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!entry.isFile() || entry.name !== 'index.html') continue;

    const rel = relative(dist, file);
    const route = rel === `index.html`
      ? '/'
      : `/${rel.slice(0, -'/index.html'.length).split(sep).join('/')}/`;
    if (route.split('/').some((part) => excluded.has(part))) continue;
    if (route.split('/').some((part) => redirected.has(part))) continue;

    const html = await readFile(file, 'utf8');
    const hasNoindex = [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) =>
      /\bname\s*=\s*["']robots["']/i.test(tag)
      && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag),
    );
    if (hasNoindex) continue;
    pages.push(new URL(route, `${site}/`).href);
  }
}

await walk(dist);
pages.sort();
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((url) => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${pages.length} public pages.`);
