// Studio wall-label galleries (studio-tracker #397). Membership is the checked-in
// catalog/wall-label-galleries.json snapshot, so the site build does not read play-tags.
import manifest from './wall-label-galleries.json' with {type:'json'};
import {byId} from './catalog.mjs';

export const wallLabelManifest = manifest;

export function resolveWallLabelGalleries(galleries = manifest.galleries, lookup = byId, warn = console.warn) {
  return galleries.map(gallery => {
    const works = [];
    const skipped = [];
    for (const id of gallery.members) {
      const product = lookup[id];
      if (!product) {
        skipped.push(id);
        warn(`wall-label gallery ${gallery.id}: skipping missing catalog id ${id}`);
        continue;
      }
      works.push(product);
    }
    return {...gallery, works, skipped};
  });
}

export const wallLabelGalleries = resolveWallLabelGalleries();
