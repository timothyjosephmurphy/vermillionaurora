// Product pages renamed to title-based slugs (Oct 2026). static/_redirects 301s the old tjm.art URLs;
// the legacy-domain redirect in site.mjs maps them directly to the new URL (one hop).
// Never reuse an old slug for a different painting.
export const PRODUCT_RENAMES = Object.freeze({
  "painting-beach-walk": "sunset-from-atami-el-salvador",
  "painting-family-portrait": "grandpa-mom-myself",
  "painting-golden-reflection": "sunset-from-la-libertad-el-salvador",
  "painting-mount-rainier-at-sunset": "ukrainian-woman-with-flower-crown",
  "painting-portrait-in-blue": "grandpa-howard",
  "painting-sunset-reflection": "joachim-in-zihuatanejo",
  "painting-sunset-shore": "daniel-being-reprimanded-in-vietnam",
  "painting-two-soldiers": "rice-paddy-in-vietnam"
});

export function renamedProductPath(pathname) {
  const slug = pathname.match(/^\/products\/([a-z0-9-]+)\/?$/)?.[1];
  return slug && Object.hasOwn(PRODUCT_RENAMES, slug) ? `/products/${PRODUCT_RENAMES[slug]}/` : pathname;
}
