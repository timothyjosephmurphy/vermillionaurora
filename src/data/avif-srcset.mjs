import { existsSync } from 'node:fs';
// AVIF siblings of display WebP files that are already on disk. Missing files are left out
// so a browser that prefers AVIF never requests a 404.
export function avifSrcset(webpSrcset) {
  const parts = [];
  for (const item of String(webpSrcset || '').split(',')) {
    const [url, descriptor] = item.trim().split(/\s+/);
    if (!url || !/\.webp($|\?)/i.test(url)) continue;
    const avif = url.replace(/\.webp(?=($|\?))/i, '.avif');
    const path = avif.startsWith('/') ? `static${avif.split('?')[0]}` : '';
    if (path && existsSync(path)) parts.push(descriptor ? `${avif} ${descriptor}` : avif);
  }
  return parts.join(', ');
}
