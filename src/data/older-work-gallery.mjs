// Older Work gallery listing. A wall-label fold whose destination is older-work
// (catalog/wall-label-galleries.json) adds any member that is not already an
// Older Work product. One physical painting appears once: canonicalArtwork, then
// twin groups from catalog/painting-tags.json.
import {olderWorkGroups} from '../../catalog/older-work-products.mjs';
import wallLabels from '../../catalog/wall-label-galleries.json' with {type:'json'};
import {byId} from '../../catalog/catalog.mjs';
import {canonicalArtwork} from './canonical-artworks.mjs';
import {twinGroups} from '../../catalog/related-works.mjs';

const groupOf = twinGroups();
const canonicalId = id => canonicalArtwork[id] || id;

function representedKeys() {
  const seen = new Set(olderWorkGroups.map(group => groupOf(group.id)));
  for (const group of olderWorkGroups) {
    group.members.forEach((_, index) => {
      const originalId = `${group.id}-original-${index + 1}`;
      if (byId[originalId]) seen.add(groupOf(originalId));
    });
  }
  return seen;
}

export function olderWorkGalleryTiles() {
  const tiles = olderWorkGroups.map(group => ({kind:'group', id:group.id, group}));
  const seen = representedKeys();

  for (const entry of wallLabels.folded || []) {
    if (entry.into !== 'older-work') continue;
    const members = entry.members || [];
    for (const raw of members) {
      const id = canonicalId(raw);
      const key = groupOf(id);
      if (seen.has(key)) continue;
      const product = byId[id];
      if (!product) continue;
      seen.add(key);
      const tile = {kind:'work', id:product.id, product};
      const pos = members.indexOf(raw);
      let anchor = -1;
      let before = false;
      for (let i = 0; i < members.length; i++) {
        if (i === pos) continue;
        const index = tiles.findIndex(item => groupOf(item.id) === groupOf(canonicalId(members[i])));
        if (index === -1) continue;
        if (i < pos) {
          anchor = index;
          before = false;
        } else if (anchor === -1) {
          anchor = index;
          before = true;
          break;
        }
      }
      if (anchor === -1) tiles.push(tile);
      else tiles.splice(before ? anchor : anchor + 1, 0, tile);
    }
  }
  return tiles;
}

export function olderWorkPaintingCount(tiles = olderWorkGalleryTiles()) {
  return tiles.reduce((n, tile) => n + (tile.kind === 'group' ? tile.group.members.length : 1), 0);
}
