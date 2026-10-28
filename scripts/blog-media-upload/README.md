# Blog media upload

Two temporary Workers, both removed after the job. Neither push to `main`.

| Workflow | Bucket | Keys |
| --- | --- | --- |
| `publish-blog.yml` (`workflow_dispatch` on the story branch) | `tjm-images` (`https://img.tjm.art`) | `display/`, `social/`, and `blog/<slug>/` for files changed versus `main` |
| `upload-blog-photos.yml` | `images` (`https://media.vermillionaurora.com`) | `images/blog/bitcoin-film-festival/` from `manifest.json` |

Both use the `CLOUDFLARE_BOOK_MEDIA_API_TOKEN` secret. The publish path is documented in [docs/publish-blog.md](../../docs/publish-blog.md).

`worker.mjs` is the film-festival uploader. `worker-tjm.mjs` only accepts the keys in `keys.mjs`. `manifest.tjm.json` in git is an empty list; the publish workflow rewrites it on the runner and does not commit it.
