import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const site = 'https://tjm.art';
const dist = resolve('dist');
const escapeAttr = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const text = (value) => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2] ?? '';
const hasTag = (html, key, value) => new RegExp(`<meta\\b(?=[^>]*\\b${key}\\s*=\\s*["']${value}["'])[^>]*>`, 'i').test(html);

const DEFAULT_SHARE_IMAGE = 'https://tjm.art/brand/tj-murphy-share.jpg';
const BLOG_POST = /^\/blog\/[a-z0-9-]+\/$/;

// BlogPosting on every story page. The static posts already carry title, description,
// published time, and share image; this is the one place that runs after the build.
const decode = value => text(String(value))
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
  .replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export function blogPostingScript(html, canonical) {
  if (/"@type"\s*:\s*"BlogPosting"/.test(html)) return '';
  const headline = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  const description = decode(attr(html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[0] || '', 'content'));
  const published = attr(html.match(/<meta\b(?=[^>]*\bproperty=["']article:published_time["'])[^>]*>/i)?.[0] || '', 'content')
    || attr(html.match(/<time\b[^>]*>/i)?.[0] || '', 'datetime');
  const modified = attr(html.match(/<meta\b(?=[^>]*\bproperty=["']article:modified_time["'])[^>]*>/i)?.[0] || '', 'content');
  const image = attr(html.match(/<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*>/i)?.[0] || '', 'content');
  if (!headline || !description || !published || !image || !canonical) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished: published,
    ...(modified ? { dateModified: modified } : {}),
    image,
    author: { '@type': 'Person', name: 'TJ Murphy', url: 'https://tjm.art/about/' },
    publisher: { '@type': 'Organization', name: 'Vermillion Aurora Productions', url: 'https://tjm.art/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}
// Bump ICON_VERSION whenever the favicon/manifest images change so browsers refetch them.
const ICON_VERSION = '2';
const ICONS = `<link rel="icon" href="/favicon.ico?v=${ICON_VERSION}" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=${ICON_VERSION}"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=${ICON_VERSION}"><link rel="apple-touch-icon" href="/apple-touch-icon.png?v=${ICON_VERSION}"><link rel="manifest" href="/site.webmanifest?v=${ICON_VERSION}">`;

// Adds favicons and makes "Skip to content" land on the page's <main> (adding the link where a page lacks it).
const SKIP_STYLE = '<style>.skip-link{position:absolute;left:12px;top:12px;z-index:100;padding:10px 14px;background:#1d1a17;color:#fff;border-radius:8px;text-decoration:none;font-size:.85rem;font-weight:600;transform:translateY(-160%)}.skip-link:focus,.skip-link:focus-visible{transform:translateY(0);outline:3px solid #8c4d39;outline-offset:3px}</style>';

export function polish(html) {
  let next = html;
  const hasIcon = /<link\b[^>]*\brel=["'](?:shortcut )?icon["']/i.test(next);
  const hasManifest = /<link\b[^>]*\brel=["']manifest["']/i.test(next);
  // A page that already names a manifest (Neural Dance) must not also get /site.webmanifest.
  if (!hasIcon) {
    const icons = hasManifest ? ICONS.replace(/<link rel="manifest" href="\/site\.webmanifest\?v=\d+">/, '') : ICONS;
    next = next.replace(/<\/head>/i, `${icons}</head>`);
  }
  if (!/<main\b/i.test(next)) return next;
  const skip = next.match(/<a\b[^>]*class=["'][^"']*\bskip-link\b[^"']*["'][^>]*>/i)?.[0];
  const mainTag = next.match(/<main\b[^>]*>/i)[0];
  const mainId = attr(mainTag, 'id');
  if (!skip) {
    const id = mainId || 'main-content';
    if (!mainId) next = next.replace(mainTag, mainTag.replace(/^<main\b/i, `<main id="${id}" tabindex="-1"`));
    // Pages without the shared header stylesheet get the same hidden-until-focused skip-link style inline.
    if (!/\/site-header\.css/.test(next)) next = next.replace(/<\/head>/i, `${SKIP_STYLE}</head>`);
    return next.replace(/(<body\b[^>]*>)/i, `$1<a class="skip-link" href="#${id}">Skip to content</a>`);
  }
  const target = (attr(skip, 'href').match(/^#(.+)$/) || [])[1];
  if (!target || new RegExp(`\\bid=["']${target}["']`).test(next)) return next;
  if (mainId) return next.replace(skip, skip.replace(/href=["']#[^"']*["']/, `href="#${mainId}"`));
  return next.replace(mainTag, mainTag.replace(/^<main\b/i, `<main id="${target}" tabindex="-1"`));
}

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const rel = relative(dist, file);
    const route = rel === 'index.html' ? '/' : rel.endsWith(`${sep}index.html`)
      ? `/${rel.slice(0, -`${sep}index.html`.length).split(sep).join('/')}/`
      : `/${rel.split(sep).join('/')}`;
    let html = await readFile(file, 'utf8');
    if (!/<head\b/i.test(html)) continue;
    // Every page (including noindex pages and the 404 page) gets the favicon set and a working skip link.
    const polished = polish(html);
    if (polished !== html) { html = polished; await writeFile(file, html); }
    if (BLOG_POST.test(route)) {
      const ld = blogPostingScript(html, `${site}${route}`);
      if (ld) {
        html = html.replace(/<\/head>/i, `${ld}</head>`);
        await writeFile(file, html);
      }
    }
    if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;

    const title = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'TJ Murphy');
    const descTag = html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[0];
    let description = attr(descTag || '', 'content');
    if (!description) description = text(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '').slice(0, 180);
    if (!description) description = 'Original paintings, fine-art prints, exhibitions, and commissions by TJ Murphy.';
    // Share image: the first artwork in <main>. Pages without one (policies, process, etc.) use the
    // square TJ Murphy logo (orange-face mark) as a "summary" card, never the small header image.
    const imageTag = html.match(/<main\b[^>]*>[\s\S]*?(?:<img\b[^>]*>|<svg\b[^>]*data-image-src[^>]*>)/i)?.[0];
    const imageSrc = attr(imageTag || '', 'data-image-src') || attr(imageTag || '', 'src');
    const artwork = imageSrc && !imageSrc.startsWith('data:') && !/\/brand\//.test(imageSrc) ? new URL(imageSrc, `${site}/`).href : '';
    const image = artwork || DEFAULT_SHARE_IMAGE;
    const canonical = `${site}${route}`;
    const tags = [];

    if (!/<link\b(?=[^>]*\brel=["']canonical["'])/i.test(html)) tags.push(`<link rel="canonical" href="${escapeAttr(canonical)}">`);
    const addMeta = (key, name, value) => {
      if (value && !hasTag(html, key, name)) tags.push(`<meta ${key}="${name}" content="${escapeAttr(value)}">`);
    };
    addMeta('property', 'og:type', 'website');
    addMeta('property', 'og:site_name', 'TJ Murphy');
    addMeta('property', 'og:title', title);
    addMeta('property', 'og:description', description);
    addMeta('property', 'og:url', canonical);
    if (image) addMeta('property', 'og:image', image);
    addMeta('name', 'twitter:card', artwork ? 'summary_large_image' : 'summary');
    addMeta('name', 'twitter:title', title);
    addMeta('name', 'twitter:description', description);
    if (image) addMeta('name', 'twitter:image', image);
    if (tags.length) {
      html = html.replace(/<\/head>/i, `  ${tags.join('\n  ')}\n</head>`);
      await writeFile(file, html);
    }
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
await walk(dist);
console.log('Added canonical, Open Graph, and Twitter metadata where missing.');
}
