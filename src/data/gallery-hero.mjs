// Representative painting for a wall-label gallery (studio-tracker #751).
// The mosaic thumb stays a small title mark; cards and the landing hero use this work.
export function galleryHero(gallery) {
  const works = gallery?.works || [];
  return works.find(work => work.id === gallery.hero) || works[0] || null;
}
