# Vermillion Aurora / TJM.art

Astro generates the public website from a versioned JSON catalog. Cloudflare serves the static pages and R2 media. A separate Cloudflare Worker handles commission requests, checkout, live inventory, and private sales records.

## Editing through chat

- `catalog/products.json`: one record per artwork, commission package, or book. Edit titles, stories, prices, media, dimensions, credits, and explicit shipping profiles here.
- `catalog/collections.json`: product IDs and display order for the homepage, gallery, and artist collaborations.
- `src/pages/products/[slug]/index.astro`: shared product template, with painting, book, and commission layouts.
- `src/components/ProductCard.astro`: shared gallery, carousel, book, commission, and collaboration cards.
- `src/pages/index.astro` and the gallery/artist pages: page-level stories and composition.
- `src/components/SiteHeader.astro` and `SiteFooter.astro`: shared navigation for migrated pages.

All 85 pre-migration product URLs remain valid. IDs currently equal slugs and are also existing Durable Object reservation keys. Keep them stable. If retiring a product, retain its record and URL and set `listing.status` to `retired`; do not delete payment history or reuse its identity. Rename titles freely; URL changes need explicit redirects and a stock-key migration plan.

A product's `listing.status` controls whether it is offered for sale. The live Durable Object can override an available listing with `reserved` or `sold`. A static price edit never clears a live reservation or sold record. Relisting requires the existing explicit stock-maintenance procedure. Keep sold product prices in the catalog where present; new purchases remain blocked, and historical orders settle against their saved quotes.

## Build, preview, and checks

Use Node 22.12 or newer:

```sh
npm ci
npm run build
npm test
npm run preview -- --host 0.0.0.0
```

Open the preview URL printed by Astro. Rebuild after changing content. `npm run dev` builds and starts the same full-site preview, including existing static pages and media.

```sh
npm --prefix cloudflare/test ci
npm run test:worker
npx playwright install chromium
npm run test:browser
```

The build validates unique identities, collection references, positive prices, image paths/alt text, book links, artwork measurements, and shipping profiles. It generates `cloudflare/checkout-catalog.mjs` and the public pages from the same catalog hash. Commit the generated Worker catalog with content changes; CI checks it for drift. Browser checks mock all payment providers and exercise desktop/mobile layouts and live availability.

`dist/` is generated and is the only website deployment directory. `scripts/copy-assets.mjs` includes existing public pages, images, and scripts while excluding Worker code, source catalogs, shipping notes, tests, credentials, and the obsolete `public_html/` bundle. `/gallery/inventory.json` and `/payments/paypal-links.json` remain read-only generated compatibility exports. They are no longer editing sources.

## Deployment

Root `wrangler.jsonc` names the existing website Worker `vermillionaurora`, runs the build, and publishes `dist/`. Cloudflare Workers Builds must use `npx wrangler deploy` from the repository root, without an old `--assets .` override.

Production uses a protected two-stage release. `main` is the integration branch. `.github/workflows/release-gate.yml` is the single required pull request gate; it runs the local build, catalog drift check, unit and Worker tests, and browser checks (including print framing and sample coverage). After a successful `main` push, `.github/workflows/promote-release.yml` opens or updates a promotion pull request from `main` to `release`, where the same required gate runs before production approval.

Configure the website Worker’s Cloudflare Workers Builds production branch to `release`. Merge the promotion pull request only after that setting is in place. Workers Builds then publishes the website from the reviewed release commit. `.github/workflows/deploy-checkout-production.yml` listens only to `release`, builds the checkout catalog, verifies private accounting storage and live print assets, deploys the checkout API, and checks the deployed Worker, live providers, and matching website/API catalog versions. It skips local unit and browser suites because the required release pull request gate already ran them. The existing `CLOUDFLARE_API_TOKEN` remains scoped to API deployment; it does not need permission to upload website assets. This is coordinated rather than atomic across two Workers, so the release workflow verifies both versions before declaring success.

In GitHub repository Settings → Actions → General, keep workflow permissions at least Read and write and enable “Allow GitHub Actions to create and approve pull requests.” The promotion workflow needs that repository-level setting to create the next `main` → `release` pull request after a release is merged.

Protect both `main` and `release` in GitHub. Require pull requests for `main`, require the `Release gate / gate` check, and prevent direct pushes to `release`; the promotion pull request is the deliberate production approval step. Keep the existing checkout pause flags available for emergency shutdowns.

Rollback content and templates together with the generated Worker catalog. Do not roll back or delete Durable Object data. A failed release leaves CI visibly failed; investigate the failing deployment instead of clearing stock or replaying payments.

## Originals shopping cart

See [the cart review](docs/cart-review.md) for customer behavior, recovery rules, validation, and the decisions required before deployment. `payments/cart.js` provides the browser cart, `/cart/` is the checkout page, and `cloudflare/cart-order.mjs` coordinates one payment across several originals. Prints are the next phase.

## Inventory, payments, and commissions

- `cloudflare/commission-worker.js`: API entry point and Gmail/R2 commission form integration.
- `cloudflare/painting-stock.mjs`: one SQLite Durable Object per original, preserving reservation keys and immutable sale receipts.
- `cloudflare/inventory-api.mjs`: public status-only API, independent of payment-provider enablement. No buyer details, addresses, invoice IDs, or financial records are exposed.
- `catalog/availability.js`: updates cards, artist captions, filters, and product labels on load and every 30 seconds while visible. Static content remains readable without JavaScript, but live status requires it; checkout always rechecks server stock.
- `cloudflare/sales-ledger.mjs`: private accounting ledger and R2 archive. Payment fulfillment, tax recording, shipping labels, and seller emails retry independently of website builds.

Sales no longer mutate GitHub files, and the live Worker no longer requires a repository-write token. The obsolete `GITHUB_TOKEN` secret may be removed separately after deployment; this migration does not rotate or delete secrets.

PayPal remains restricted to the existing Chase Toole $20 pilot. BTCPay accepts on-chain Bitcoin and Lightning for the two $20 portrait pilots: Chase Toole and Dorian Nakamoto. Existing estimated parcels are carried forward explicitly, including the owner-authorized portrait envelope. Verify each physical parcel before adding more products to the production allowlists. No new payment methods, shipping profiles, or live purchases are enabled by this migration.

The Warsaw Syrenka stock-limited PayPal link remains a legacy exception. It has not been silently opted into automatic inventory matching; unmatched verified IPN payments are still archived. Use shared checkout for new original-art sales. Books continue to Amazon, commissions continue to inquiries, and paintings without measurements remain inquiry-only.
