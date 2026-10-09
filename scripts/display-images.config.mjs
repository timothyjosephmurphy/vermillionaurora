// Pages whose HTML gets responsive WebP display images. Product pages, print previews,
// and print-test pages are deliberately excluded (print/checkout assets stay untouched).
export const DISPLAY_PAGES = ['/', '/gallery/', '/gallery/available/', '/exhibitions/', '/about/', '/books/', '/commissions/',
  '/exhibitions/gavin-robertson/', '/exhibitions/paul-murphy/', '/exhibitions/chase-toole/', '/exhibitions/bitcoin-film-festival-warsaw/',
  '/exhibitions/cape-town/', '/exhibitions/el-salvador/', '/exhibitions/intiman-auction/', '/exhibitions/living-room/',
  '/exhibitions/studio-601/', '/exhibitions/victrola/', '/links/', '/blog/', '/blog/bitcoin-film-festival/'];
export const MIN_BYTES = 30000; // EXTRA_SOURCES are always converted (lowered from 120 KB: small JPEGs still cost ~60 KB each as 64px list thumbnails)
export const WIDTHS = [160, 480, 960, 1600];
export const DEFAULT_QUALITY = 75;
// Very textured paintings need a lower quality to get real savings; visually equivalent at display size.
export const QUALITY = { '/gallery-images/warszawska-syrenka.jpeg': 60 };
// CSS/inline backgrounds that the img scan cannot see.
export const EXTRA_SOURCES = ['/gallery-images/esperanza-hero.png', '/gallery-images/warszawska-syrenka.jpeg',
  // Landscape commission card carousel (portrait-preview.js).
  '/gallery-images/golden-coast.jpg', '/gallery-images/moonlit-water.jpg', '/gallery-images/portrait-with-hat.jpg', '/gallery-images/sunset-silhouette.jpg',
  '/gallery-images/el-salvador-sunrise.jpeg', '/gallery-images/golden-reflection.jpg', '/gallery-images/red-horizon.jpg', '/gallery-images/two-soldiers.jpg',
  // Portrait commission card carousel (portrait-preview.js).
  '/gallery-images/wedding-portrait-with-dog.jpg', '/gallery-images/commissioned-portrait-1.jpg', '/gallery-images/commissioned-portrait-2.jpg',
  '/gallery-images/commissioned-portrait-3.jpg', '/gallery-images/commissioned-portrait-4.jpg'];
// sizes by layout: the nearest matching container class before the img wins.
export const SIZES = [
  ['painting-list-row', '64px'],
  ['ev-thumbs', '76px'],
  ['gallery-product-image', '(max-width: 980px) 164px, 224px'],
  ['featured-slide', '(max-width: 980px) 90vw, 340px'],
  ['portrait-preview', '(max-width: 600px) 80vw, 340px'],
  ['ex-slide', '(max-width: 600px) 75vw, 390px'],
  ['exhibition-index-grid', '(max-width: 600px) 90vw, 400px'],
  ['books-grid', '(max-width: 600px) 90vw, 320px'],
  ['ex-track', '(max-width: 600px) 70vw, 520px'],
];
export const DEFAULT_SIZES = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 600px';
// Page-specific overrides (the gallery list shows small row thumbnails).
export const PAGE_SIZES = { '/gallery/': { 'gallery-product-image': '64px' }, '/gallery/available/': { 'gallery-product-image': '64px' } };
