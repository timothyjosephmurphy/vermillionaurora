// One product page per painting: book-gallery scans that duplicate a catalog painting show (and link to)
// the catalog painting instead. Their old book-art pages 301 to it (static/_redirects).
// A scan whose book product was removed (El Zonte) is listed in book-galleries.json by its canonical id;
// the mapping here keeps its book-page source attached.
export const canonicalArtwork = {
  'book-art-1be48d404e2dbf547794': 'painting-shoreline-at-dusk', // Sunrise in El Zonte -> El Zonte at Dawn, El Salvador
  'book-art-ccff23f1e469654faa05': 'painting-portrait-in-green', // Chase Toole
  'book-art-2136f2260225dd8ef20a': 'painting-portrait-in-gold',  // Dorian Nakamoto
  // Oct 2026 merge (TJ: "Merge the duplicates and keep the book titles"): the catalog page survives with the book title.
  'book-art-9b6b4f1ce8b283e14b21': 'el-zonte-at-sunrise', // Sunrise from Punto El Zonte Hostel, El Salvador
  'book-art-024a1e2da99a49b4438a': 'myself-my-mother-ruth-my-grandpa-howard', // Myself, my mother Ruth, my grandpa Howard
  'book-art-ad30c3da712401606ea6': 'michael-and-katie-in-yelapa', // Michael and Katie in Yelapa
  'book-art-1708a7dca996aca40e6c': 'painting-guitarist', // Girl Tuning Guitar (book title: Malone; TJ chose the catalog title)
  'book-art-5e4eb881d89ae9f5c635': 'painting-sunset-silhouette', // Sunset in the Strait of Juan de Fuca, Sucia Island
  'book-art-7676696646b77fc3ca94': 'sunset-in-el-zonte-el-salvador', // Sunset in El Zonte, El Salvador
  'book-art-164299ae97e7b62137f5': 'painting-moonlit-water', // Moonrise over lake in the North Cascades
  'book-art-04de39dfa1817b8d1ed9': 'painting-figures-in-wheatfield', // The Mother of Kiev
  'book-art-7718008765132b8bc17f': 'painting-studio-figure', // Brekkie @BVBTC hoisting a sculpture in progress
  'book-art-159503a8e82d7b91c293': 'joaquim-in-zihuatanejo', // Joaquim in Zihuatanejo
  'book-art-a137dffe65723d0b5a07': 'daniel-portrait-1', // Daniel — portrait 1
  'book-art-c8da7882b2a3b7a36874': 'painting-clouds-over-water', // El Salvador
  'book-art-82ab8d65fb50fe0d096a': 'painting-sunflower-woman', // Vision of Ukraine at Peace
  'book-art-1cc00425e5226b3aa20c': 'sunset-in-el-tunco-el-salvador', // Sunset in El Tunco, El Salvador
  'book-art-ef24f49017a62819330d': 'painting-portrait-with-cheese', // Brekkie @BVBTC with polished Bitcoin B
  'book-art-06b4b66f6389416c412c': 'girl-wearing-flower-crown', // Girl Wearing Flower Crown
  'book-art-9f6386bac0e6198f6661': 'rice-paddies-in-vietnam', // Rice paddies in Vietnam, Photo Credit: Daniel Goldsmith
  'book-art-e1fa746bb51029294a17': 'painting-chef-in-white', // Jimmy Song @jimmysong
  'book-art-04a049ea60a5a09e6873': 'painting-red-horizon', // Hawaii
  'book-art-8ff9ac182d32fa228450': 'painting-phoenix-rising', // The Bounty of Satoshi: Achievement
  'book-art-18e4d05240ce63a1a44b': 'painting-portrait-in-blue-light', // MJ
  'book-art-8d1545e1ac13c99eb4ce': 'painting-couple-in-color', // Aunt Fran and Cousin Hillary
  'book-art-f56007f6a7d6ee955caf': 'painting-golden-coast', // Sunset in the Strait of Juan de Fuca, Patos Island 1
  'book-art-29b3572972c367d351d1': 'painting-festival-portrait', // The Bounty of Satoshi: Wonder
  'book-art-ea6e156a9a533d06f198': 'grandpa-howard', // Grandpa Howard
  'book-art-82127d1886ae57d5cb6e': 'painting-portrait-with-scarf', // Father Paul
};
// Extra works shown in a book-gallery section (catalog ids or book-art ids).
export const sectionAdditions = {
  'watercolor-portraits-bitcoiners': ['book-art-2136f2260225dd8ef20a'],
};

// The works a book-gallery section shows: scans resolved to their canonical page, each painting once.
export function sectionArtworkIds(group) {
  return [...new Set([...group.artworks, ...(sectionAdditions[group.id] || [])].map(id => canonicalArtwork[id] || id))];
}
