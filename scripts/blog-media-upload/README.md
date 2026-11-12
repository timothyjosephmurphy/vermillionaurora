# Blog media upload

The publish workflow deploys a temporary Worker and removes it after the job. It does not push to `main`.

| Workflow | Bucket | Keys |
| --- | --- | --- |
| `publish-blog.yml` (`workflow_dispatch` on the story branch) | `tjm-images` (`https://img.tjm.art`) | `display/`, `social/`, and `blog/<slug>/` for files changed versus `main` |

It uses the `CLOUDFLARE_BOOK_MEDIA_API_TOKEN` secret. The publish path is documented in [docs/publish-blog.md](../../docs/publish-blog.md).

`worker.mjs` is the old film-festival uploader and is not run from main. `worker-tjm.mjs` only accepts the keys in `keys.mjs`. `manifest.tjm.json` in git is an empty list; the publish workflow rewrites it on the runner and does not commit it.
