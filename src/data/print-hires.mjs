// Public watermarked hi-res previews for print product pages.
// Sources are private (or remote) masters; these URLs never point at /print-masters/.
import manifest from '../../data/print-hires-manifest.json' with {type: 'json'};

const byArtworkId = new Map();
for (const file of manifest.files) {
  for (const id of file.artworkIds) byArtworkId.set(id, file);
}

export function printHiRes(artworkId) {
  const file = byArtworkId.get(artworkId);
  if (!file?.url || /print-masters/i.test(file.url) || /print-masters/i.test(file.key || '')) return null;
  return {src: file.url, width: file.widthPx, height: file.heightPx, meetsHiResFloor: file.meetsHiResFloor === true};
}

export function printHiResManifest() {
  return manifest;
}
