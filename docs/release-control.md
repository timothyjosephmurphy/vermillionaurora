# Release control

## One-step deploy

`main` is production. Merging a pull request into `main` runs `.github/workflows/deploy-production.yml`, which:

1. Builds the site and checks the generated catalogs and production checkout config.
2. Verifies private accounting storage and commission privacy.
3. Cloudflare Workers Builds deploys the website Worker (`vermillionaurora`) from `main` (production branch = main); the workflow waits for it, then confirms the live catalog version and sampled print files (changed paintings + 3 random).
4. Verifies live blog pages only when the push touched the blog.
5. Deploys the checkout Worker (`vermillion-commissions`) with `CHECKOUT_RELEASE=<sha>` and waits for `/checkout/health` to report that revision.
6. Runs live provider checks (one random original, read-only status), website/API catalog agreement on sampled product pages, and a quote of one unframed and one framed print (cancelled).

Testing is quote-only: no payments, no FinerWorks orders, no holds on originals. Run the workflow manually with `full_checks` to check every product, original and print file.

The `release` branch is a frozen backup of the last two-stage release and no longer deploys.

## Pull request gate (required check `gate`)

`.github/workflows/release-gate.yml` picks a tier from the changed paths (`scripts/ci/classify-changes.mjs`):

| Tier | Paths | Runs |
| --- | --- | --- |
| blog | a story only: `static/blog/`, `src/pages/blog/`, that post's `static/display/` and `static/social/` files, `scripts/display-files.json`, and `scripts/blog-media-upload/` assets or `publish-assets/` | `npm ci` (no browser download), `npm run build`, catalog drift, the new `/blog/<slug>/` is on the index. No Playwright |
| content | catalog JSON, other images, other static, docs | build, catalog drift, smoke on home/gallery/product/cart + changed pages |
| code | other site code; static `_headers` and `_redirects` configuration | the above + unit tests + browser tests for touched areas |
| full | `cloudflare/`, `payments/`, `worker/`, catalog code, cart, CI, dependencies, manual runs | full suite (unit, browser, room, Worker, print framing) |

`scripts/display-files.json` is not a content path. A story pull request that updates it used to fall through to the code tier and install Chromium. Display or social files without a story or the blog index stay on the content or code tier.

Publishing steps: [publish-blog.md](publish-blog.md). Squash-merge the blog pull request once `gate` is green. Do not wait for a Playwright job; the blog tier does not start one.

Squash-merge PRs into `main`. Never use `--admin` or force-push.

## Rollback

```bash
gh workflow run rollback.yml -R timothyjosephmurphy/vermillionaurora -f target=checkout   # or scripts/rollback.sh
```

This rolls the checkout Worker back to its previous version. The repo token has no access to the website Worker, so roll the site back with `npx wrangler rollback --name vermillionaurora` (logged in) or the Cloudflare dashboard Deployments tab; `target=both` works only once the token is granted access. Never reset Durable Object data during rollback. Use the checkout pause flags for an emergency stop.

## Retries

Re-run a failed deploy at most twice (`gh run rerun --failed`). If a step keeps failing, stop and investigate.
