// Carousel groups on commission package cards. Kept outside catalog/products.json so
// carousel tweaks don't change the checkout catalogVersion.
// A group with "mix" alternates the listed products' examples in the listed order (double, single, double, ...),
// then appends the rest of the longer list; portrait-preview.js does the same via data-mix.
export const commissionExampleGroups = {
  'single-portrait': [{ label: 'Portraits', portrait: 'portraits-mix', mix: ['double-portrait', 'single-portrait'] }],
};
export const interleave = lists => Array.from({ length: Math.max(0, ...lists.map(l => l.length)) }, (_, i) => lists.flatMap(l => i < l.length ? [l[i]] : [])).flat();
