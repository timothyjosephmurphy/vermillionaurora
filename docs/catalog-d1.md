# Live catalog (Phase 3): D1 + /catalog-admin/

The catalog is edited at **https://tjm.art/catalog-admin/** (password: Worker secret `CATALOG_ADMIN_PASSWORD`)
and stored in the D1 database **`tjm-catalog`** (`e7514ceb-a633-4613-9cf1-cda817d8ca94`), bound as `CATALOG_DB`
to the website Worker (`vermillionaurora`) and the checkout Worker (`vermillion-commissions`). No deploy needed.

## Tables (catalog/d1/schema.sql)
- `paintings`: title, slug, type, medium, year, original size, description, original price, parcel, `source` (`import` or `admin`).
- `editions`: every print size/frame (`print-<id>-<size>[-frame-<colour>]`): price, SKU, image/paper size, `enabled`.
- `images`: R2 keys in `tjm-images` per docs/r2-images.md, with `rev` (bumped on a picture swap; pages add `?v=<rev>`).
- `status`: catalog listing status (available / inquiry / not-for-sale / sold / unavailable). Live holds and sales
  still live in the checkout Worker's PaintingStock Durable Object; `/inventory/status` and the 5-minute Etsy original
  sync combine both exactly as before, with this row replacing the generated baseline.
- `meta.rev` (bumped on every write) and `audit` (every change with before/after).

## How it reads
- **Pages**: still built statically (SEO, JSON-LD). For `/`, `/gallery/*`, `/products/*` and `/catalog/products.json`
  the website Worker diffs D1 against the build's `/catalog/snapshot.json` and patches only what changed (titles,
  original prices, sizes, print prices, withdrawn sizes, swapped pictures); paintings added in the admin get a
  Worker-rendered page and a gallery card. Patched pages are edge-cached under a key with the D1 revision, so edits
  show on the next request.
- **Checkout/quotes**: before each request the checkout Worker resets its generated catalogs and lays D1 on top
  (`cloudflare/catalog-overlay.mjs`), so quotes, Square/BTCPay, `/inventory/status` and the Etsy sync plan use the
  same prices as the pages. Etsy originals keep their +10% (`etsyOriginalPrice`) on top of the live price.
- **Fallback**: if D1 is unbound, empty or errors, both Workers use the built catalog unchanged (pages are the built
  HTML; `/checkout/health` shows `catalogSource: "built"` instead of the D1 revision).

## Notes
- After the import, D1 is the source of truth for the fields above. A repo change to an imported painting's price or
  title is overridden by D1; change it in the admin instead. After a repo PR that adds or reprices paintings, copy it in:
  `POST /catalog-admin/api/sync` with `{"ids":[...]}` (those ids are overwritten from the deployed build; paintings and
  print sizes D1 lacks are always added).
- New print sizes need FinerWorks files, so the admin can only reprice or withdraw sizes. Print masters change via
  `scripts/swap-image.mjs --master` + a PR.
- Picture swaps in the admin crop to the painting's proportions in the browser (centred, never padded), write the
  same WebP sizes under the same R2 keys, and bump `images.rev`.
- Exports: the admin's **Export JSON** button downloads `tjm-catalog-YYYY-MM-DD.json`; `.github/workflows/catalog-export.yml`
  commits a nightly copy to the `catalog-export` branch (needs repo secret `CATALOG_ADMIN_PASSWORD`).
- Verify: `CATALOG_ADMIN_PASSWORD=... node scripts/verify-catalog-d1.mjs [--quote-all]`.
