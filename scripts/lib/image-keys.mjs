// Image key scheme for the tjm-images R2 bucket (served at https://img.tjm.art).
// See docs/r2-images.md. A key is the path under static/ with no leading slash:
//   display/<base>-<hash10>-<width>.webp   responsive display derivative
//     <base>   = original file name without extension (e.g. "golden-coast", "archived-painting-193")
//     <hash10> = first 10 hex of the original's sha256 when it was first derived (stable identity,
//                kept on swaps so URLs never change)
//     <width>  = pixel width (160, 480, 960, 1600, or the original width when smaller)
//   gallery-wall/<sha256>-<width>.webp     print-wall previews (built by build-gallery-wall-assets.mjs)
//   print-editions/thumbs/<sha256>.jpg      1000px FinerWorks thumbnails
// Phase 3 (D1 catalog) stores the keys per painting, e.g. images_json = ["display/x-ab12cd34ef-160.webp", ...],
// and pages render imageUrl(key). Nothing else about a URL needs to be stored.
export const IMAGE_ORIGIN = 'https://img.tjm.art';
export const R2_PREFIXES = ['display', 'wall-paintings', 'gallery-wall', 'print-editions/thumbs'];
export const imageUrl = key => `${IMAGE_ORIGIN}/${String(key).replace(/^\/+/, '')}`;
export const keyFromSrc = src => String(src).replace(/^(?:https?:\/\/[^/]+)?\/+/, '');
