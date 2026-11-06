// Bundle render-blocking root stylesheets into one content-hashed /_astro file and
// fingerprint first-party scripts the same way. Cloudflare's status-aware zone rule
// already sets Cache-Control: public, max-age=31536000, immutable on 200 responses
// under /_astro/ (docs/static-bypass-zone-rules.md). static/_headers must not, because
// those rules also match 404s. Unhashed copies stay in place so old URLs do not 404.
//
// Cart CSS is not part of that blocking bundle except on /cart/. Other pages load it
// with media="print" onload so the header can paint from site-header.css (the cart
// badge rules live there) without waiting on the drawer stylesheet.
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {mkdir, readFile, readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {eagerBlogHero} from './blog-hero-lcp.mjs';

const DIST = 'dist';
const HASH_JS = new Set([
  '/script.js',
  '/site-header.js',
  '/home-hero.js',
  '/portrait-preview.js',
  '/artist-film-carousel.js',
  '/featured-carousel/carousel.js',
  '/payments/cart.js',
  '/payments/prints.js',
  '/payments/stickers.js',
  '/payments/print-samples.js',
  '/catalog/availability.js',
  '/exhibitions/exhibitions.js',
  '/exhibitions/viewer.js',
  '/exhibitions/world-map/map.js',
  '/book-viewer/viewer.js',
]);
const PRECONNECT = ['https://img.tjm.art', 'https://media.vermillionaurora.com'];

const fileCache = new Map();
const emitCache = new Map();

function pagePath(file) {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

export function resolveHref(page, href) {
  if (!href || /^(?:https?:|\/\/|data:|mailto:)/i.test(href)) return null;
  const bare = href.split(/[?#]/)[0];
  if (bare.startsWith('/')) return path.posix.normalize(bare);
  const dir = page.endsWith('/') ? page : `${path.posix.dirname(page)}/`;
  const resolved = path.posix.normalize(path.posix.join(dir, bare));
  return resolved.startsWith('/') ? resolved : `/${resolved}`;
}

function attrsOf(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? '';
  }
  return attrs;
}

function isStylesheet(attrs) {
  return (attrs.rel || '').split(/\s+/).includes('stylesheet');
}

function inNoscript(html, index) {
  const before = html.slice(0, index);
  const open = before.match(/<noscript\b/gi)?.length || 0;
  const close = before.match(/<\/noscript>/gi)?.length || 0;
  return open > close;
}

function rewriteCssUrls(css, cssPath) {
  const dir = path.posix.dirname(cssPath);
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (full, quote, url) => {
    const clean = url.trim();
    if (!clean || /^(?:https?:|data:|\/\/|#|\/)/i.test(clean)) return full;
    const [pathPart, suffix = ''] = clean.split(/([?#].*)/).filter(part => part !== undefined);
    const abs = path.posix.normalize(path.posix.join(dir, pathPart));
    const rooted = abs.startsWith('/') ? abs : `/${abs}`;
    return `url(${quote}${rooted}${suffix}${quote})`;
  });
}

async function readDist(urlPath) {
  if (fileCache.has(urlPath)) return fileCache.get(urlPath);
  const disk = path.join(DIST, urlPath.slice(1));
  const bytes = existsSync(disk) ? await readFile(disk) : null;
  fileCache.set(urlPath, bytes);
  return bytes;
}

async function emit(urlPath, bytes) {
  const key = `${urlPath}\0${bytes.length}\0${createHash('sha256').update(bytes).digest('hex')}`;
  if (emitCache.has(key)) return emitCache.get(key);
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
  const ext = path.posix.extname(urlPath);
  const base = path.posix.basename(urlPath, ext).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'asset';
  const out = `/_astro/${base}-${hash}${ext}`;
  const disk = path.join(DIST, out.slice(1));
  if (!existsSync(disk)) {
    await mkdir(path.dirname(disk), {recursive: true});
    await writeFile(disk, bytes);
  }
  emitCache.set(key, out);
  return out;
}

async function relocateFonts(css) {
  const urls = [...new Set([...css.matchAll(/url\(\s*(['"]?)(\/fonts\/[^)'"?#]+\.woff2)\1\s*\)/g)].map(match => match[2]))]
    .sort((a, b) => b.length - a.length);
  let next = css;
  for (const url of urls) {
    const bytes = await readDist(url);
    if (!bytes) continue;
    const hashed = await emit(url, bytes);
    next = next.replaceAll(url, hashed);
  }
  return next;
}

function linkTag(href, extra = '') {
  return `<link rel="stylesheet" href="${href}"${extra}>`;
}

function withDefer(tag) {
  if (/\b(?:defer|async)\b/i.test(tag) || /\btype\s*=\s*(['"])module\1/i.test(tag)) return tag;
  return tag.replace(/<script\b/i, '<script defer');
}

export async function hashHeadHtml(html, page) {
  if (page === '/play' || page.startsWith('/play/')) return html;
  let next = /\/blog\/[a-z0-9-]+\/$/.test(page) ? eagerBlogHero(html) : html;
  const isCart = page === '/cart/';

  const links = [];
  for (const match of next.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = attrsOf(match[0]);
    if (!isStylesheet(attrs)) continue;
    const href = resolveHref(page, attrs.href || '');
    links.push({tag: match[0], index: match.index, attrs, href, noscript: inNoscript(next, match.index)});
  }

  const cartHref = '/payments/cart.css';
  const cartBytes = await readDist(cartHref);
  const cartHashed = cartBytes ? await emit(cartHref, cartBytes) : null;
  const replacements = [];

  if (cartHashed) {
    for (const link of links) {
      if (link.href !== cartHref) continue;
      if (link.noscript || isCart) {
        replacements.push({index: link.index, length: link.tag.length, text: linkTag(cartHashed)});
      } else {
        replacements.push({
          index: link.index,
          length: link.tag.length,
          text: `<link rel="stylesheet" href="${cartHashed}" media="print" onload="this.media='all'">`,
        });
      }
    }
  }

  const blocking = [];
  for (const link of links) {
    if (link.noscript || !link.href || link.href.startsWith('/_astro/') || link.href.startsWith('/neural-dance/') || link.href === cartHref) continue;
    const media = (link.attrs.media || 'all').trim().toLowerCase();
    if (media && media !== 'all') continue;
    const bytes = await readDist(link.href);
    if (!bytes) continue;
    blocking.push({...link, css: rewriteCssUrls(bytes.toString('utf8'), link.href)});
  }
  if (isCart && cartBytes && links.some(link => link.href === cartHref && !link.noscript)) {
    const cartLink = links.find(link => link.href === cartHref && !link.noscript);
    blocking.push({...cartLink, css: rewriteCssUrls(cartBytes.toString('utf8'), cartHref)});
    blocking.sort((a, b) => a.index - b.index);
    replacements.splice(replacements.findIndex(item => item.index === cartLink.index), 1);
  }

  if (blocking.length) {
    const bundled = await relocateFonts(blocking.map(link => link.css).join('\n'));
    const href = await emit('/site.css', Buffer.from(bundled));
    blocking.forEach((link, index) => {
      replacements.push({index: link.index, length: link.tag.length, text: index === 0 ? linkTag(href) : ''});
    });
  }

  replacements.sort((a, b) => b.index - a.index);
  for (const replacement of replacements) {
    next = next.slice(0, replacement.index) + replacement.text + next.slice(replacement.index + replacement.length);
  }

  if (cartHashed && !isCart && next.includes(cartHashed) && !next.includes(`<noscript><link rel="stylesheet" href="${cartHashed}">`)) {
    next = next.replace(
      `<link rel="stylesheet" href="${cartHashed}" media="print" onload="this.media='all'">`,
      `<link rel="stylesheet" href="${cartHashed}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${cartHashed}"></noscript>`,
    );
  }

  const scripts = [...next.matchAll(/<script\b[^>]*\bsrc\s*=\s*(['"])[^'"]+\1[^>]*>/gi)];
  for (const match of scripts.reverse()) {
    const tag = match[0];
    const attrs = attrsOf(tag);
    const href = resolveHref(page, attrs.src || '');
    if (!href || !HASH_JS.has(href) || href.startsWith('/_astro/')) continue;
    const bytes = await readDist(href);
    if (!bytes) continue;
    const hashed = await emit(href, bytes);
    const rewritten = withDefer(tag.replace(/(\bsrc\s*=\s*)(['"])[^'"]+\2/i, `$1$2${hashed}$2`));
    next = next.slice(0, match.index) + rewritten + next.slice(match.index + tag.length);
  }

  const pre = [];
  for (const origin of PRECONNECT) {
    if (!next.includes(origin)) continue;
    if (next.includes(`rel="preconnect" href="${origin}"`) || next.includes(`href="${origin}" rel="preconnect"`)) continue;
    pre.push(`<link rel="preconnect" href="${origin}" crossorigin>`);
  }
  if (pre.length) next = next.replace(/<head([^>]*)>/i, `<head$1>${pre.join('')}`);
  return next;
}

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

export async function hashHeadAssets() {
  if (!existsSync(DIST)) return;
  fileCache.clear();
  const files = await walk(DIST);
  let pages = 0;
  for (const file of files) {
    const page = pagePath(file);
    if (page === '/play' || page.startsWith('/play/')) continue;
    const html = await readFile(file, 'utf8');
    const next = await hashHeadHtml(html, page);
    if (next !== html) {
      await writeFile(file, next);
      pages++;
    }
  }
  console.log(`Hashed head assets on ${pages} pages (${emitCache.size} files under /_astro/)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await hashHeadAssets();
}
