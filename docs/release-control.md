# Release control

## One-step deploy

`main` is production. Merging a pull request into `main` runs `.github/workflows/deploy-production.yml`, which:

1. Deploys the checkout Worker (`vermillion-commissions`) immediately, in parallel with Workers Builds, after a live-mode config check and the private-storage checks. The deploy sets `CHECKOUT_RELEASE=<sha>` and waits for `/checkout/health` to report that revision before the rest of the workflow continues. A Neural Dance-only push skips this when `worker/neural-dance-debug.mjs` did not change.
2. Builds the site in GitHub Actions and checks the generated catalogs. This job does not deploy the website Worker. A Neural Dance-only push skips this build.
3. Cloudflare Workers Builds deploys the website Worker (`vermillionaurora`) from `main` (production branch = main), including pull request previews. The workflow waits for that version only after checkout is on this commit, then confirms the live catalog version and sampled print files (changed paintings + 3 random).
4. Verifies live blog pages only when the push touched the blog.
5. Runs live provider checks (one random original, read-only status), website/API catalog agreement on sampled product pages (`scripts/verify-release.mjs` checks the site and the checkout API), and a quote of one unframed and one framed print (cancelled).

The Cloudflare API token is `CLOUDFLARE_PROD_API_TOKEN` when that GitHub secret exists, otherwise `CLOUDFLARE_SANDBOX_API_TOKEN`. The run logs which name it used. Permissions to create the production secret: [cloudflare-prod-api-token.md](cloudflare-prod-api-token.md).

Testing is quote-only: no payments, no FinerWorks orders, no holds on originals. Run the workflow manually with `full_checks` to check every product, original and print file.

The `release` branch is a frozen backup of the last two-stage release and no longer deploys.

## Pull request gate (required check `gate`)

`.github/workflows/release-gate.yml` picks a tier from the changed paths (`scripts/ci/classify-changes.mjs`):

| Tier | Paths | Runs |
| --- | --- | --- |
| neural-dance | only Neural Dance pages, scripts, tests, the project-history doc, or `worker/neural-dance-debug.mjs` | Neural Dance unit tests and the Chromium tests that read source instead of `dist/`. No `npm run build`. About 5–10 minutes. |
| blog | a story only: `static/blog/`, `src/pages/blog/`, that post's `static/display/` and `static/social/` files, `scripts/display-files.json`, and `scripts/blog-media-upload/` assets or `publish-assets/` | `npm ci` (no browser download), `npm run build`, catalog drift, the new `/blog/<slug>/` is on the index. No Playwright |
| content | catalog JSON, other images, other static, docs | build, catalog drift, smoke on home/gallery/product/cart + changed pages |
| code | other site code; static `_headers` and `_redirects` configuration | the above + unit tests + browser tests for touched areas |
| full | `cloudflare/`, `payments/`, `worker/` (except the debug room file when it is the whole change), catalog code, cart, CI, dependencies, mixed or unknown diffs, manual runs | full suite (unit, browser, room, Worker, print framing) |

The required check stays the `gate` job. Jobs that do not apply to the tier are skipped, and `gate` succeeds when every required job succeeded or was skipped.

`worker/neural-dance-debug.mjs` is the Neural Dance debug Durable Object. Production runs it on the checkout Worker (`vermillion-commissions`). The website Worker forwards `/api/neural-dance/debug/` and does not bind the class. A change that also edits `cloudflare/commission-worker.js`, `worker/site.mjs`, or either Wrangler config is not this tier.

On `main`, a Neural Dance-only push skips the GitHub site build. Checkout deploys only when `worker/neural-dance-debug.mjs` changed. Pages, scripts, wasm, and the share image still need the website Worker. `workflow_dispatch` always uses the full path.

## Workers Builds watch paths

Workers Builds ignores `build.watch_dir` in `wrangler.jsonc` (that key is only for local `wrangler dev`). Watch paths are dashboard settings, `path_includes` and `path_excludes`, and this repo cannot set them.

A website deploy uploads the whole `dist/` directory (about 5 GB). There is no partial asset publish, so a Neural Dance page, script, wasm, or manifest change still runs the full Workers Builds rebuild. Do not exclude those paths.

For the `vermillionaurora` Worker, open **Workers & Pages → vermillionaurora → Settings → Builds → Build watch paths**. Add the same excludes on production and on preview builds:

```
worker/neural-dance-debug.mjs
tests/neural-dance-*
tests/fixtures/neural-dance-*
docs/neural-dance-project-history.md
neural-dance/src/**
neural-dance/build.sh
scripts/render-neural-dance-share.mjs
```

Leave includes at `*`. A push of only those excluded files does not start a site build. Any page, script, wasm, manifest, or other site file still does. The checkout debug room is deployed by `.github/workflows/deploy-production.yml`, not by this build.

`scripts/display-files.json` is not a content path. A story pull request that updates it used to fall through to the code tier and install Chromium. Display or social files without a story or the blog index stay on the content or code tier.

Publishing steps: [publish-blog.md](publish-blog.md). Squash-merge the blog pull request once `gate` is green. Do not wait for a Playwright job; the blog tier does not start one.

Squash-merge PRs into `main`. Never use `--admin` or force-push.

## Rollback

```bash
gh workflow run rollback.yml -R timothyjosephmurphy/vermillionaurora -f target=checkout   # or scripts/rollback.sh
```

This rolls the checkout Worker back to its previous version. `target=both` rolls checkout back first, then the website Worker. The website rollback works when the selected token has Editor on `vermillionaurora` (included in `CLOUDFLARE_PROD_API_TOKEN`; see [cloudflare-prod-api-token.md](cloudflare-prod-api-token.md)). Until that secret exists, rollback uses `CLOUDFLARE_SANDBOX_API_TOKEN`, which may still be unable to edit the website Worker. Never reset Durable Object data during rollback. Use the checkout pause flags for an emergency stop.

## Retries

Re-run a failed deploy at most twice (`gh run rerun --failed`). If a step keeps failing, stop and investigate.
