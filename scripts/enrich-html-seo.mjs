import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const site = 'https://vermillionaurora.com';
const dist = resolve('dist');
const escapeAttr = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const text = (value) => value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2] ?? '';
const hasTag = (html, key, value) => new RegExp(`<meta\\b(?=[^>]*\\b${key}\\s*=\\s*["']${value}["'])[^>]*>`, 'i').test(html);

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
    if (!/<head\b/i.test(html) || /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;

    const title = text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'Vermillion Aurora');
    const descTag = html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[0];
    let description = attr(descTag || '', 'content');
    if (!description) description = text(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '').slice(0, 180);
    if (!description) description = 'Original paintings, fine-art prints, exhibitions, and commissions by TJ Murphy.';
    const imageTag = html.match(/<main\b[^>]*>[\s\S]*?(?:<img\b[^>]*>|<svg\b[^>]*data-image-src[^>]*>)/i)?.[0] || html.match(/<img\b[^>]*>/i)?.[0];
    const imageSrc = attr(imageTag || '', 'data-image-src') || attr(imageTag || '', 'src');
    const image = imageSrc && !imageSrc.startsWith('data:') ? new URL(imageSrc, `${site}/`).href : '';
    const canonical = `${site}${route}`;
    const tags = [];

    if (!/<link\b(?=[^>]*\brel=["']canonical["'])/i.test(html)) tags.push(`<link rel="canonical" href="${escapeAttr(canonical)}">`);
    const addMeta = (key, name, value) => {
      if (value && !hasTag(html, key, name)) tags.push(`<meta ${key}="${name}" content="${escapeAttr(value)}">`);
    };
    addMeta('property', 'og:type', 'website');
    addMeta('property', 'og:site_name', 'Vermillion Aurora');
    addMeta('property', 'og:title', title);
    addMeta('property', 'og:description', description);
    addMeta('property', 'og:url', canonical);
    if (image) addMeta('property', 'og:image', image);
    addMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    addMeta('name', 'twitter:title', title);
    addMeta('name', 'twitter:description', description);
    if (image) addMeta('name', 'twitter:image', image);
    if (tags.length) {
      html = html.replace(/<\/head>/i, `  ${tags.join('\n  ')}\n</head>`);
      await writeFile(file, html);
    }
  }
}

await walk(dist);
console.log('Added canonical, Open Graph, and Twitter metadata where missing.');
