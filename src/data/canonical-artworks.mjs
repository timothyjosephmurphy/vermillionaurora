// One product page per painting: book-gallery scans that duplicate a catalog painting show (and link to)
// the catalog painting instead. Their old book-art pages 301 to it (static/_redirects).
export const canonicalArtwork = {
  'book-art-ccff23f1e469654faa05': 'painting-portrait-in-green', // Chase Toole
  'book-art-2136f2260225dd8ef20a': 'painting-portrait-in-gold',  // Dorian Nakamoto
};
// Extra works shown in a book-gallery section (catalog ids or book-art ids).
export const sectionAdditions = {
  'watercolor-portraits-bitcoiners': ['book-art-2136f2260225dd8ef20a'],
};
