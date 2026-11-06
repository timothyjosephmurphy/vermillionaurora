// Build only the Neural Dance pages and assets. Does not build the rest of tjm.art.
import {mkdir, readFile, writeFile, cp, readdir} from 'node:fs/promises';
import {dirname, join, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist/assets');
const assetExt = /\.(?:html|css|js|json|jpg|jpeg|png|webp|gif|svg|ico|wasm|webmanifest)$/i;

function attrs(source) {
  const out = {};
  for (const match of source.matchAll(/([:\w-]+)(?:\s*=\s*"([^"]*)")?/g)) {
    out[match[1]] = match[2] === undefined ? true : match[2];
  }
  return out;
}

function baseLayout(source) {
  const tag = attrs(source);
  const manifest = tag.manifestHref || '/site.webmanifest';
  const standalone = tag.standalone === true || tag.standalone === 'true';
  const title = tag.appleTitle || 'Neural Dance';
  const theme = tag.themeColor || (standalone ? '#070a12' : '');
  const install = standalone ? `
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="${title}" />
    ${theme ? `<meta name="theme-color" content="${theme}" />` : ''}
    <script>
      if (window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)) {
        document.documentElement.classList.add('nd-standalone');
      }
    </script>
    <link rel="stylesheet" href="/neural-dance/standalone.css" />
    <script type="module" src="/neural-dance/standalone.js"></script>` : '';
  return `<link rel="icon" href="/favicon.ico?v=2" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
<link rel="manifest" href="${manifest}" />${install}`;
}

export function renderPage(source, header) {
  const body = source.replace(/^---[\s\S]*?---\n/, '');
  return body
    .replace(/<BaseLayout\b([^>]*)\/?>/g, (_, raw) => baseLayout(raw))
    .replace(/<SiteHeader\s*\/>/g, header)
    .replace(/\sis:inline/g, '');
}

async function copyTree(from, to) {
  await mkdir(to, {recursive: true});
  for (const entry of await readdir(from, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === 'src' || entry.name === 'build.sh') continue;
    const src = join(from, entry.name);
    const dest = join(to, entry.name);
    if (entry.isDirectory()) await copyTree(src, dest);
    else if (assetExt.test(extname(entry.name)) || entry.name.endsWith('.webmanifest')) await cp(src, dest);
  }
}

export async function buildPages() {
  const header = (await readFile(join(root, 'src/components/SiteHeader.astro'), 'utf8')).replace(/\sis:inline/g, '');
  const pages = [
    ['src/pages/neural-dance/index.astro', 'neural-dance/index.html'],
    ['src/pages/neural-dance/live/index.astro', 'neural-dance/live/index.html'],
    ['src/pages/neural-dance/debug/index.astro', 'neural-dance/debug/index.html']
  ];
  for (const [src, dest] of pages) {
    const html = renderPage(await readFile(join(root, src), 'utf8'), header);
    if (html.includes('<BaseLayout') || html.includes('<SiteHeader')) throw new Error('Uncompiled component in ' + src);
    const out = join(dist, dest);
    await mkdir(dirname(out), {recursive: true});
    await writeFile(out, html);
  }
  await copyTree(join(root, 'neural-dance'), join(dist, 'neural-dance'));
  await copyTree(join(root, 'static/neural-dance'), join(dist, 'neural-dance'));
  await mkdir(join(dist, 'brand'), {recursive: true});
  await cp(join(root, 'static/brand/neural-dance-share.jpg'), join(dist, 'brand/neural-dance-share.jpg'));
}

if (process.argv[1] && process.argv[1].endsWith('build-pages.mjs')) {
  await buildPages();
  console.log('Neural Dance assets written to dist/assets');
}
