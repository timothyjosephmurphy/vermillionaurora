# Site images on R2 (Phase 2)

Display images are served from the public R2 bucket **`tjm-images`** at **https://img.tjm.art**
(custom domain on the tjm.art zone). Pages are built exactly as before; the last build step,
`scripts/r2-image-urls.mjs`, rewrites `/display/...` (and `https://tjm.art/display/...`) in built
HTML, `styles.css` and `portrait-preview.js` to `https://img.tjm.art/display/...`. Markup, srcset
widths and file names do not change. Catalog JSON is not rewritten (catalog hashes stay put).
On Oct 18 2026 (studio-tracker#55) 1,148 display files that nothing in the repo, build or tests reads were
removed from `static/display/`; R2 is now their only copy. The 826 still committed are read at build/test time
(catalog validation, painting-page image sizes, tests) or are still requested from tjm.art directly (home hero
slides, catalog JSON, cart `data-image-src`, older posts). `static/_redirects` sends any `/display/*` request to
`https://img.tjm.art/display/*` (301). `scripts/display-files.json` lists every display file name in the bucket
(used by build-catalog-snapshot.mjs and swap-image.mjs instead of reading the folder); add new names there when
adding display images.

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

## Private print masters

Full-resolution files in `static/print-masters/` are not public and are not part of the git checkout.
They belong in the private R2 bucket `tjm-print-masters` (Worker binding `PRINT_MASTERS` on the
website Worker). That bucket has no img.tjm.art custom domain. `GET` or `HEAD /print-masters/*`
without a valid `exp` and `sig` returns 403. FinerWorks still receives the approved bordered
edition URL (`/print-editions/<sha>.jpg`). When `PRINT_MASTER_SIGNING_SECRET` is set on the checkout
Worker, that URL is sent with an HMAC-SHA256 query string good for 48 hours (maximum 72).

`static/display/` stays in git. Live `/display/*` already 301s to img.tjm.art, and the build, catalog
checks, and cart `data-image-src` still read the committed display files.

Before merging the cutover, create the bucket and upload every master from `origin/main` (the tree
that still contains the files). Dry-run first; it does not contact R2:

```
node scripts/sync-print-masters-to-r2.mjs --from-git origin/main --dry-run
node scripts/sync-print-masters-to-r2.mjs --from-git origin/main
node scripts/sync-print-masters-to-r2.mjs --from-git origin/main --verify
```

Set the same `PRINT_MASTER_SIGNING_SECRET` on `vermillionaurora` and `vermillion-commissions`.
A production website build (`PRINT_EDITIONS_REQUIRED=1`) rebuilds the edition JPEGs from those R2
objects when `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` are present. Without the bytes it fails
instead of deploying a site that dropped the print files.

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
