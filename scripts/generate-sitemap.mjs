import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, relative, resolve, sep } from 'node:path';
import { canonicalArtwork } from '../src/data/canonical-artworks.mjs';

// <lastmod> comes from scripts/sitemap-lastmod.json (url -> {hash, lastmod}). A page whose
// content hash still matches keeps its recorded date; a changed or new page gets the date of
// the commit being built. Run `npm run sitemap:lastmod` after a build to record the new dates.
const manifestPath = resolve('scripts/sitemap-lastmod.json');
const update = process.argv.includes('--update');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));
const today = new Date().toISOString().slice(0, 10);
let buildDate = today;
try { buildDate = execFileSync('git', ['log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim() || today; } catch {}
const contentHash = (html) => {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  const body = html.match(/<main\b[\s\S]*<\/main>/i)?.[0] || html.match(/<body\b[\s\S]*<\/body>/i)?.[0] || html;
  const text = body.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, ' $1 ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return createHash('sha256').update(`${title}\n${text}`).digest('hex').slice(0, 16);
};

const site = 'https://tjm.art';
const dist = resolve('dist');
const excluded = new Set(['cart', 'commission-manager', 'testimonial-manager', 'originals-manager', 'print-preview', 'print-test']);
// Old commission package pages 301 to /commissions/ (static/_redirects).
const redirected = new Set(['single-portrait', 'double-portrait', 'small-landscape']);
// Book scans that duplicate a catalog painting 301 to it (src/data/canonical-artworks.mjs).
for (const scan of Object.keys(canonicalArtwork)) redirected.add(scan);
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
    // /play/ is indexable. /play/g/* frames carry noindex so only the entry URL is listed.
    const hasNoindex = [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) =>
      /\bname\s*=\s*["']robots["']/i.test(tag)
      && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag),
    );
    if (hasNoindex) continue;
    pages.push({ url: new URL(route, `${site}/`).href, hash: contentHash(html) });
  }
}

await walk(dist);
// Production /play/ is proxied from the hex gallery and has no static index.html.
// The Quake room pages are gone. The entry URL stays in the sitemap.
const playEntry = `${site}/play/`;
if (!pages.some((page) => page.url === playEntry)) pages.push({url: playEntry, hash: 'proxied-play-entry'});
pages.sort((a, b) => a.url.localeCompare(b.url));
const next = {};
for (const page of pages) {
  const known = manifest[page.url];
  page.lastmod = known?.hash === page.hash ? known.lastmod : buildDate;
  next[page.url] = { hash: page.hash, lastmod: page.lastmod };
}
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(({ url, lastmod }) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), xml);
if (update) await writeFile(manifestPath, `${JSON.stringify(next, null, 2)}\n`);
const changed = pages.filter((page) => manifest[page.url]?.hash !== page.hash).length;
console.log(`Generated sitemap.xml with ${pages.length} public pages (${changed} with new lastmod ${buildDate}${update ? '; manifest updated' : ''}).`);

const decode = (value) => String(value || '')
  .replace(/<[^>]+>/g, '')
  .replace(/&rsquo;|&#8217;|&#x2019;/gi, '’')
  .replace(/&ldquo;|&#8220;|&#x201C;/gi, '“')
  .replace(/&rdquo;|&#8221;|&#x201D;/gi, '”')
  .replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
  .replace(/\s+/g, ' ')
  .trim();
const xmlEscape = (value) => decode(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const indexHtml = await readFile(join(dist, 'blog/index.html'), 'utf8').catch(() => '');
const stories = [];
for (const block of indexHtml.split('data-static-story').slice(1)) {
  const href = block.match(/href="(\/blog\/[a-z0-9-]+\/)"/)?.[1];
  const title = block.match(/<h2>\s*<a\b[^>]*>([\s\S]*?)<\/a>/i)?.[1];
  const datetime = block.match(/<time\b[^>]*datetime="([^"]+)"/i)?.[1];
  const summary = block.match(/class="journal-copy"[\s\S]*?<p>([\s\S]*?)<\/p>/i)?.[1];
  if (!href || !title || !datetime) continue;
  stories.push({
    href,
    title: xmlEscape(title),
    summary: xmlEscape(summary || title),
    datetime,
    rfc822: new Date(`${datetime}T00:00:00Z`).toUTCString(),
  });
}
if (stories.length) {
  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    '<title>Stories from the Studio</title>',
    '<link>https://tjm.art/blog/</link>',
    '<description>Notes about the paintings, travels and people behind the work of TJ Murphy.</description>',
    ...stories.map((story) => [
      '<item>',
      `<title>${story.title}</title>`,
      `<link>https://tjm.art${story.href}</link>`,
      `<guid>https://tjm.art${story.href}</guid>`,
      `<pubDate>${story.rfc822}</pubDate>`,
      `<description>${story.summary}</description>`,
      '</item>',
    ].join('')),
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
  const atom = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    '<title>Stories from the Studio</title>',
    '<link href="https://tjm.art/blog/" rel="alternate"/>',
    '<link href="https://tjm.art/blog/atom.xml" rel="self"/>',
    '<id>https://tjm.art/blog/</id>',
    `<updated>${stories[0].datetime}T00:00:00Z</updated>`,
    ...stories.map((story) => [
      '<entry>',
      `<title>${story.title}</title>`,
      `<link href="https://tjm.art${story.href}"/>`,
      `<id>https://tjm.art${story.href}</id>`,
      `<updated>${story.datetime}T00:00:00Z</updated>`,
      `<summary>${story.summary}</summary>`,
      '</entry>',
    ].join('')),
    '</feed>',
    '',
  ].join('\n');
  await writeFile(join(dist, 'blog/feed.xml'), rss);
  await writeFile(join(dist, 'blog/atom.xml'), atom);
  console.log(`Generated blog RSS and Atom feeds with ${stories.length} stories.`);
}
