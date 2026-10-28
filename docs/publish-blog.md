# Publish a Stories from the Studio post

`main` is production. The ruleset **Protected releases** blocks a direct push and requires a pull request whose **`gate`** check is green on an up-to-date branch. Squash-merge is the publish step. Cloudflare Workers Builds then deploys the website Worker from `main`. `.github/workflows/deploy-production.yml` checks the live article when the push touches the blog.

A pull request that only changes a story uses the **blog** tier of `.github/workflows/release-gate.yml`. That job runs `npm ci` without downloading browsers, `npm run build`, the catalog drift check, and a check that each new `static/blog/<slug>/index.html` is linked from the blog index. It does not install Chromium or WebKit and it does not run Playwright. Checkout, worker, catalog code, and other site changes keep their existing tiers.

## 1. Write the post

Start from latest `main`. Copy `static/blog/finding-a-sound-bass-from-dad/index.html` to `static/blog/<slug>/index.html`. The slug is lowercase letters, numbers, and hyphens. Keep one `<h1>`, a `<main>`, and at least one photo. Point photos at `/display/<file>.webp`. Point video and its poster at absolute `https://img.tjm.art/blog/<slug>/...` URLs.

Add a card at the top of `src/pages/blog/index.astro`, using the same markup as the cards already there (`data-static-story`, then `class="journal-image-link" href="/blog/<slug>/"` and an `<img>`). Give the post its own card image. Site-update posts must not use the Esperanza hero.

Commit the display WebPs under `static/display/` and the 1200×630 share JPEG under `static/social/`. Add each new display **basename** to `scripts/display-files.json` in alphabetical order. Put mp4 and poster files that should be served from `img.tjm.art/blog/<slug>/` in `scripts/blog-media-upload/publish-assets/<slug>/`.

Do not also commit catalog JSON, `cloudflare/`, `payments/`, `worker/`, `package.json`, `.github/`, `scripts/ci/`, `static/_headers`, `static/_redirects`, docs, or the uploader source (`worker.mjs`, `worker-tjm.mjs`, wrangler config). Any of those moves the pull request off the blog tier and the gate installs Playwright again.

## 2. Upload media

Display and social URLs are rewritten to `https://img.tjm.art` at build time, so the objects have to be in the `tjm-images` bucket before the squash-merge. From the story branch:

```bash
gh workflow run publish-blog.yml --ref <branch>
gh run watch
```

The workflow uses the `CLOUDFLARE_BOOK_MEDIA_API_TOKEN` secret. It deploys a temporary Worker bound to `tjm-images`, uploads only files this branch added or changed under `static/display/`, `static/social/`, and `scripts/blog-media-upload/publish-assets/<slug>/`, checks the public SHA-256, and deletes the Worker. Allowed keys are `display/*.{webp,jpg,png}`, `social/*.{jpg,png,webp}`, and `blog/<slug>/*.{webp,jpg,png,mp4}`, up to 90 MB each. An object that is already public with the same hash is left alone. Different bytes are not overwritten.

The branch must already contain `.github/workflows/publish-blog.yml` (create it from current `main`). The workflow deploys `scripts/blog-media-upload/worker-tjm.mjs` from that branch, so leave the uploader files unchanged.

The older **Upload Bitcoin Film Festival blog photos** workflow still writes `images/blog/bitcoin-film-festival/` on `media.vermillionaurora.com`. Leave it for that post.

If the token cannot bind `tjm-images`, upload display and social with `node scripts/sync-images-r2.mjs` instead. That script needs `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` and compares the whole local folder. Video and poster objects under `blog/<slug>/` still go through `publish-blog.yml`.

## 3. Open the pull request and squash-merge

```bash
git checkout -b <branch>
git add static/blog/<slug> src/pages/blog/index.astro static/display/<files> static/social/<file> scripts/display-files.json
# plus scripts/blog-media-upload/publish-assets/<slug>/ when the post has video
git commit
git push -u origin <branch>
gh pr create --base main --title "Publish <title>"
```

Wait until **`gate`** is green. On a blog-only diff the job installs dependencies without browsers, runs `npm run build`, checks catalog drift, and checks the new article. It does not install Chromium or run the browser smoke. The ruleset requires the branch to be current with `main`; use Update branch if GitHub says it is behind. Squash-merge. Do not use `--admin`. There is no separate Playwright check to wait for.

Merging to `main` is what puts the post on tjm.art. Workers Builds deploys the site. The production workflow then opens the live article and checks its photos.

## Layers of Sound (pull request 728)

https://github.com/timothyjosephmurphy/vermillionaurora/pull/728 only changes the blog index, `static/blog/live-looping-guitar/index.html`, three display WebPs, one social JPEG, and `scripts/display-files.json`. Its media is already on `img.tjm.art`. After this gate is on `main`, update that branch from `main` so a new `gate` run starts. The run checks out the merge with `main`, classifies those paths as `blog`, and does not install Playwright. Do not merge 728 from the gate change itself.
