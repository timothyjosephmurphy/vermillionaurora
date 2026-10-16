# Site images on R2 (Phase 2)

Display images are served from the public R2 bucket **`tjm-images`** at **https://img.tjm.art**
(custom domain on the tjm.art zone). Pages are built exactly as before; the last build step,
`scripts/r2-image-urls.mjs`, rewrites `/display/...` (and `https://tjm.art/display/...`) in built
HTML, `styles.css` and `portrait-preview.js` to `https://img.tjm.art/display/...`. Markup, srcset
widths and file names do not change. Catalog JSON is not rewritten (catalog hashes stay put).
`static/display/` is still committed and deployed as a fallback; `IMAGE_ORIGIN=self npm run build`
builds without the rewrite.

## Key scheme (Phase 3: store these keys in D1)

A key is the file's path under `static/` with no leading slash; the URL is `imageUrl(key)` from
`scripts/lib/image-keys.mjs` (`https://img.tjm.art/<key>`).

| Key | Meaning |
| --- | --- |
| `display/<base>-<hash10>-<width>.webp` | Display derivative of a catalog original. `<base>` = original name, `<hash10>` = sha1 prefix of the original when first derived, `<width>` = px width (160/480/960/1600, or the original width if smaller). |
| `display/<id>-<width>.webp` | Archive / older-work previews (`archivePreview`, `olderWorkPreview`). |
| `print-editions/thumbs/<file>` | Reserved for print thumbnails (none yet). |

Keys are stable identities: a picture swap overwrites the bytes under the same key and purges the
edge. A D1 painting row can therefore hold e.g. `display_keys = ["display/x-ab12cd34ef-160.webp", ...]`
(plus `print_master_key`) and nothing else about URLs.

## Caching

`Cache-Control: public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800`:
a year at the edge (purged on swap), one day in browsers. Not `immutable`, because swaps reuse names.

## Scripts

- `node scripts/sync-images-r2.mjs [--force]` uploads `static/display/` (and
  `static/print-editions/thumbs/` if present) under the same keys and verifies counts.
- `node scripts/swap-image.mjs <slug> <photo> [--master] [--dry-run]` crops the photo to the
  painting's proportions (never pads), regenerates the existing sizes, uploads under the same keys,
  and purges (needs `CLOUDFLARE_API_TOKEN` with Cache Purge, otherwise it writes the URL list).
  `--master` also writes a new print master and updates `catalog/prints.json` (dropping sizes the
  master cannot fill at 300 dpi). That part is still a repo commit until Phase 3.
- R2 credentials: `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` (never print them).

## CORS
A zone Response Header Transform Rule (`img-cors`, id 2ca5aa7cf6364f99afa3d097f770bd15) sets `Access-Control-Allow-Origin: *` on every img.tjm.art response, so WebGL/canvas loads never fail on an edge-cached copy that lacked the per-origin header.
