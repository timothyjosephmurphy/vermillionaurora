// Catalog pages sometimes point image.src at the widest display WebP. Sibling widths
// already exist under static/display/ and on img.tjm.art. Offering them as srcset lets
// a phone skip the 1600w file.
import {existsSync} from 'node:fs';
import path from 'node:path';

const WIDTHS = [160, 480, 960, 1600];

export function displaySrcset(src) {
  const match = String(src || '').match(/^(?:https?:\/\/(?:www\.)?tjm\.art)?(\/display\/[a-z0-9-]+)-(\d+)\.webp$/i);
  if (!match) return null;
  const present = WIDTHS.filter(width => existsSync(path.join(process.cwd(), 'static', `${match[1].slice(1)}-${width}.webp`)));
  if (present.length < 2) return null;
  const chosen = present.filter(width => width <= 960).at(-1) || present[0];
  return {
    src: `${match[1]}-${chosen}.webp`,
    srcset: present.map(width => `${match[1]}-${width}.webp ${width}w`).join(', '),
  };
}
