# Photo booth backend (studio-tracker #311)

Status: DRAFT. Nothing is deployed, no Cloudflare resource exists, nothing is wired into the site Worker.
Code: `photo-booth/` (Worker, config, D1 migration, wrangler draft). Tests: `tests/photo-booth.test.mjs`.

## Shape
A separate Worker `tjm-photo-booth` (planned route `tjm.art/booth/*`, not set). R2 bucket holds image bytes (`photos/<id>`), D1 holds records and the approval queue.

| Route | Who | What |
|---|---|---|
| `POST /booth/api/photos` | anyone | multipart `photo` (JPEG/WebP/PNG, max 2 MB), `consent=yes` optional, `frame` optional. Returns `id`, `owner` (`id.token`) and a private preview url. Row starts `pending`. |
| `GET /booth/api/wall` | anyone | approved, unexpired, newest first, capped at 60. With `X-Booth-Owner: id.token[,..]` the visitor's own pending photos are included at once (`mine: true`). |
| `GET /booth/photos/<id>` | public if approved; owner (`?t=token`) or TJ if pending | image bytes. Everyone else gets 404. |
| `DELETE /booth/api/photos/<id>` | owner (`X-Booth-Owner`) or TJ | removes the R2 object, marks `deleted`. This is the "delete link" from the card. |
| `GET /booth/api/admin/queue` | TJ only | pending photos, oldest first |
| `POST /booth/api/admin/photos/<id>/approve` or `/reject` | TJ only | approve makes it public; reject deletes the image |
| `POST /booth/api/admin/login`, `/logout` | TJ | sets/clears the 12-hour cookie |

## Visibility
Owner sees a photo immediately (owner token, only its sha256 is stored). Others see it only once `status = 'approved'`. Expired, rejected and deleted photos are hidden everywhere.

## Admin auth
Same pattern as `/catalog-admin/` (`worker/catalog-admin.mjs`): Worker secret `BOOTH_ADMIN_PASSWORD`, signed `__Host-booth-admin` HttpOnly cookie (12 h) after login, or `Authorization: Bearer` for scripts, same-origin check on browser writes, closed (503) if the secret is unset. TJ can set the same value as the catalog admin password if he wants one password.

## Expiry
`photo-booth/config.mjs`: `EXPIRY.CONSENTED_TTL_DAYS` and `UNCONSENTED_TTL_DAYS` (`null` = never). `expires_at` is set at upload from the consent flag. Reads hide expired photos right away; an hourly cron (`scheduled`) deletes the R2 object and marks the row `expired`. Both values are placeholders (90 and 7 days) pending TJ.

## Frame
`FRAME` in config: off, only `none` accepted. The id is stored and returned; the client draws any frame. Turning it on is one config change once TJ picks.

## Not in this PR
Client booth UI (camera, countdown, wall tiles), NSFW auto-filter, rate limiting / abuse controls, creating the D1 database and R2 bucket, secrets, route, deploy.
