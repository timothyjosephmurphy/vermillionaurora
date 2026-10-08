import { canonicalArtwork } from '../src/data/canonical-artworks.mjs';
// Product pages renamed to title-based slugs (Oct 2026). static/_redirects 301s the old tjm.art URLs;
// the legacy-domain redirect in site.mjs maps them directly to the new URL (one hop).
// Never reuse an old slug for a different painting.
export const PRODUCT_RENAMES = Object.freeze({
  "painting-beach-walk": "sunset-in-el-tunco-el-salvador",
  "painting-family-portrait": "myself-my-mother-ruth-my-grandpa-howard",
  "painting-golden-reflection": "sunset-in-el-zonte-el-salvador",
  "painting-mount-rainier-at-sunset": "girl-wearing-flower-crown",
  "painting-portrait-in-blue": "grandpa-howard",
  "painting-sunset-reflection": "joaquim-in-zihuatanejo",
  "painting-sunset-shore": "daniel-portrait-1",
  "painting-two-soldiers": "rice-paddies-in-vietnam",
  "grandpa-mom-myself": "myself-my-mother-ruth-my-grandpa-howard",
  "painting-embrace": "michael-and-katie-in-yelapa",
  "sunset-from-la-libertad-el-salvador": "sunset-in-el-zonte-el-salvador",
  "joachim-in-zihuatanejo": "joaquim-in-zihuatanejo",
  "daniel-being-reprimanded-in-vietnam": "daniel-portrait-1",
  "sunset-from-atami-el-salvador": "sunset-in-el-tunco-el-salvador",
  "ukrainian-woman-with-flower-crown": "girl-wearing-flower-crown",
  "rice-paddy-in-vietnam": "rice-paddies-in-vietnam"
});

// Book scans merged into their catalog painting (src/data/canonical-artworks.mjs) also go straight to it.
export function renamedProductPath(pathname) {
  const slug = pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
  if (!slug) return pathname;
  if (Object.hasOwn(PRODUCT_RENAMES, slug)) return `/products/${PRODUCT_RENAMES[slug]}/`;
  if (Object.hasOwn(canonicalArtwork, slug)) return `/products/${canonicalArtwork[slug]}/`;
  return pathname;
}
