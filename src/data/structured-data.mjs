// Shared schema.org data. Social profiles mirror /links/.
export const SITE = 'https://tjm.art';
export const sameAs = [
  'https://www.instagram.com/tj_de_la_playa/',
  'https://www.facebook.com/profile.php?id=61594734493796',
  'https://x.com/tj_de_la_playa',
  'https://njump.me/npub10m0uf224v7tly6k6h8gl6kkmuhmx7969gmudmmhqj5pv65e03r9sxsumee'
];
export const person = {
  '@context': 'https://schema.org',
  '@type': ['Person', 'VisualArtist'],
  '@id': `${SITE}/#tj-murphy`,
  name: 'TJ Murphy',
  alternateName: 'Timothy Joseph Murphy',
  jobTitle: 'Watercolor artist',
  description: 'Seattle watercolor artist TJ Murphy paints Pacific Northwest light, travel scenes, portraits and murals in watercolor pastel.',
  url: `${SITE}/about/`,
  image: `${SITE}/about/images/tj-murphy-portrait.jpg`,
  homeLocation: { '@type': 'Place', name: 'Seattle, Washington' },
  brand: { '@type': 'Brand', name: 'Vermillion Aurora' },
  sameAs
};
// Site name for search results: TJM.art (alternate: TJ Murphy).
export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'TJM.art',
  alternateName: ['TJ Murphy', 'tjm.art'],
  url: `${SITE}/`,
  publisher: { '@id': `${SITE}/#tj-murphy` }
};
export const ld = data => JSON.stringify(data).replace(/</g, '\\u003c');
