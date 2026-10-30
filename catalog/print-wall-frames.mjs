// Largest black frame for each gallery painting, from sheet geometry.
// A frame does not have to be priced to size the print wall.
import {proposals, config} from './prints.mjs';
import {collections} from './catalog.mjs';
export function largestBlackFrames() {
  const ids = new Set(collections.gallery.map(p => p.product));
  const largest = new Map();
  for (const {product, options} of proposals) {
    if (config.artworks[product.id]?.sizing !== 'image-proportional' || product.artist !== 'TJ Murphy' || !ids.has(product.id)) continue;
    for (const option of options) {
      const framed = (option.frameOptions || []).find(item => item.frame?.key === 'black' && item.mat && item.frame.size);
      if (!framed) continue;
      const area = framed.frame.size.width * framed.frame.size.height;
      const previous = largest.get(product.id);
      if (previous && previous.frame.size.width * previous.frame.size.height >= area) continue;
      largest.set(product.id, {
        id: framed.id,
        productId: product.id,
        amount: framed.amount || null,
        currency: 'USD',
        imageSize: framed.image,
        paperSize: {width: framed.paper.width, height: framed.paper.height, unit: 'in'},
        frame: framed.frame,
        mat: framed.mat,
        minimumDpi: option.resolution?.dpi || 300
      });
    }
  }
  return largest;
}
