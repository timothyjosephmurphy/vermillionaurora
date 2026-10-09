// Carousel groups on commission package cards. Kept outside catalog/products.json so
// carousel tweaks don't change the checkout catalogVersion.
// A group with "mix" alternates the listed products' examples (single, double, single, ...),
// then appends the rest of the longer list; portrait-preview.js does the same via data-mix.
// "lead" examples are shown first, in order, before the mix (portrait-preview.js: data-lead).
// Web-only commission examples: not products, no prints, checkout or Etsy.
// Titles live here (title + alt); portrait-preview.js repeats the alt text for its slides.
export const portraitLead = [
  { src: '/gallery-images/wedding-portrait-with-dog.jpg', title: 'Wedding Portrait with Dog', alt: 'Wedding Portrait with Dog, watercolor commission by TJ Murphy: a couple in wedding clothes holding a small dog between them' },
  { src: '/gallery-images/commissioned-portrait-1.jpg', title: 'Commissioned portrait', alt: 'Commissioned portrait by TJ Murphy: a smiling woman with long hair against a blue sky' },
  { src: '/gallery-images/commissioned-portrait-2.jpg', title: 'Commissioned portrait', alt: 'Commissioned portrait by TJ Murphy: a bearded man looking up' },
  { src: '/gallery-images/commissioned-portrait-3.jpg', title: 'Commissioned portrait', alt: 'Commissioned portrait by TJ Murphy: a man with a mustache in a 19th-century collar and tie' },
  { src: '/gallery-images/commissioned-portrait-4.jpg', title: 'Commissioned portrait', alt: 'Commissioned portrait by TJ Murphy: a smiling young man in a hood' },
];
export const commissionExampleGroups = {
  'single-portrait': [{ label: 'Portraits', portrait: 'portraits-mix', lead: 'portrait-lead', leadExamples: portraitLead, mix: ['single-portrait', 'double-portrait'] }],
};
export const interleave = lists => Array.from({ length: Math.max(0, ...lists.map(l => l.length)) }, (_, i) => lists.flatMap(l => i < l.length ? [l[i]] : [])).flat();
