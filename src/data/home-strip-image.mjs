// Homepage selected-gallery thumbs. Full book scans and older-work JPEGs are far
// larger than the strip slot. Point the <img> at a small WebP (and AVIF when one
// already exists on img.tjm.art) and keep the catalog URL in data-image-src.
import {existsSync} from 'node:fs';
import path from 'node:path';

export const HOME_STRIP_SIZES = '(max-width: 700px) 240px, 280px';

// Resolve from the project root. Astro rewrites import.meta.url, so a relative
// file URL would miss static/ during the build and the page would keep the full image.
const local = (urlPath) => existsSync(path.join(process.cwd(), 'static', urlPath.replace(/^\//, '')));

export function homeStripSources(src) {
  const value = String(src || '');
  const older = value.match(/^(?:https?:\/\/(?:www\.)?tjm\.art)?(\/display\/(older-work-[a-z0-9-]+)\.jpg)$/i);
  if (older) {
    const webp = `/display/${older[2]}-480.webp`;
    if (!local(webp)) return null;
    const avif = `/display/${older[2]}-480.avif`;
    return {
      src: webp,
      srcset: `${webp} 480w`,
      avif: local(avif) ? `${avif} 480w` : '',
      sizes: HOME_STRIP_SIZES,
    };
  }
  const book = value.match(/\/images\/book-galleries\/v1\/([a-f0-9]+)\.webp(?:\?.*)?$/i);
  if (book) {
    const file = `/home-thumbs/book-${book[1]}-480.webp`;
    if (!local(file)) return null;
    return {src: file, srcset: `${file} 480w`, avif: '', sizes: HOME_STRIP_SIZES};
  }
  return null;
}
