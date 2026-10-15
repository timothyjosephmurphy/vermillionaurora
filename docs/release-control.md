# Release control

## One-step deploy

`main` is production. Merging a pull request into `main` runs `.github/workflows/deploy-production.yml`, which:

1. Builds the site and checks the generated catalogs and production checkout config.
2. Verifies private accounting storage and commission privacy.
3. Deploys the website Worker (`vermillionaurora`) from the built `dist/`, then confirms the live catalog version and sampled print files (changed paintings + 3 random).
4. Verifies live blog pages only when the push touched the blog.
5. Deploys the checkout Worker (`vermillion-commissions`) with `CHECKOUT_RELEASE=<sha>` and waits for `/checkout/health` to report that revision.
6. Runs live provider checks (one random original, read-only status), website/API catalog agreement on sampled product pages, and a quote of one unframed and one framed print (cancelled).

Testing is quote-only: no payments, no FinerWorks orders, no holds on originals. Run the workflow manually with `full_checks` to check every product, original and print file.

The `release` branch is a frozen backup of the last two-stage release and no longer deploys.

## Pull request gate (required check `gate`)

`.github/workflows/release-gate.yml` picks a tier from the changed paths (`scripts/ci/classify-changes.mjs`):

| Tier | Paths | Runs |
| --- | --- | --- |
| content | catalog JSON, images, blog, static, docs | build, catalog drift, smoke on home/gallery/product/cart + changed pages |
| code | other site code | the above + unit tests + browser tests for touched areas |
| full | `cloudflare/`, `payments/`, `worker/`, catalog code, cart, CI, dependencies, manual runs | full suite (unit, browser, room, Worker, print framing) |

Squash-merge PRs into `main`. Never use `--admin` or force-push.

## Rollback

```bash
gh workflow run rollback.yml -R timothyjosephmurphy/vermillionaurora -f target=both   # or scripts/rollback.sh
```

This runs `wrangler rollback` on both Workers to their previous versions (`target=site|checkout` for one; `site_version`/`checkout_version` to pin a version id). Never reset Durable Object data during rollback. Use the checkout pause flags for an emergency stop.

## Retries

Re-run a failed deploy at most twice (`gh run rerun --failed`). If a step keeps failing, stop and investigate.
