# Automatic R2 file index

Separate Worker for the public `images` bucket. Lists object metadata only; it never downloads photographs or PDFs. Every five minutes it replaces `media-index.json` in R2 after successfully listing every page. New objects and deletions appear at the next refresh. The index includes public filenames, sizes, timestamps, content types and encoded public URLs. Folder markers and the index itself are excluded.

The Worker also serves a fresh listing on GET `/` and `/media-index.json`. Public requests do not write to the bucket. Failed scheduled listings leave the last good snapshot intact.

## Deploy once

Requires Node 22+ and Cloudflare Wrangler login for the account owning the bucket. From this directory:

```sh
npx wrangler@latest login
npx wrangler@latest deploy
```

The scheduled index will be at https://media.vermillionaurora.com/media-index.json. Cron changes can take up to 15 minutes to propagate. The live endpoint URL is printed by Wrangler at deployment. This configuration does not alter the website Worker or its domains.

Run `node --test worker.test.mjs` for local checks. This config binds only the known `images` bucket; another bucket requires its name and public base URL before adding another binding.
