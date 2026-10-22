# Photo booth backend (studio-tracker #311)

Status: DRAFT. Nothing is deployed, no Cloudflare resource exists, nothing is wired into the site Worker.
Code: `photo-booth/` (Worker, config, content filter, D1 migration, wrangler draft). Tests: `tests/photo-booth.test.mjs`.
Updated to TJ's decisions of Oct 22, 2026.

## Decisions built in
- Photos with the visitor's consent to keep them stay up indefinitely. There is no expiry, no sweep and no cron.
- Photos without consent are never posted and never stored: the upload is refused (422) before anything is written to R2 or D1.
- No frame or overlay option.
- A content filter runs on every upload. Photos that pass are published automatically; there is no approval queue and no owner approval step. If the filter errors or is unsure, the photo is held privately and only the admin tool can see it.
- An admin remove tool exists, behind the same auth pattern and the same secret (`CATALOG_ADMIN_PASSWORD`) as `/catalog-admin/`.
- Route: `tjm.art/booth/*`.

## Shape
A separate Worker `tjm-photo-booth`. R2 holds image bytes (`photos/<id>`), D1 holds records, Workers AI runs the filter.

| Route | Who | What |
|---|---|---|
| `POST /booth/api/photos` | anyone | multipart `photo` (JPEG/WebP/PNG, max 2 MB, magic bytes checked) and `consent=yes` (required). Filter runs. 201 `published` or 202 `held`; both return `owner` (`id.token`) for the delete link. |
| `GET /booth/api/wall` | anyone | published photos, newest first, capped at 60 |
| `GET /booth/photos/<id>` | public if published; admin only if held | image bytes; everything else 404 |
| `DELETE /booth/api/photos/<id>` | the visitor (`X-Booth-Owner: id.token`) or admin | deletes the R2 object, marks `removed` (the card's delete link) |
| `GET /booth/api/admin/photos` | admin | published and held photos, with the hold reason |
| `POST /booth/api/admin/photos/<id>/remove` | admin | remove a photo |
| `POST /booth/api/admin/login`, `/logout` | admin | cookie sign-in/out |

There is deliberately no way to publish a held photo from the admin tool. A held photo can only be removed.

## Admin auth
Same as `worker/catalog-admin.mjs`: Worker secret `CATALOG_ADMIN_PASSWORD`, a 12-hour signed `__Host-catalog-admin` HttpOnly cookie after login (identical cookie name and signing string, so a catalog-admin sign-in also works here since both are on tjm.art), or `Authorization: Bearer` for scripts. Browser writes need a same-origin `Origin`. If the secret is unset the admin routes return 503. The secret is never in the repo or logs.

## Content filter (`photo-booth/moderation.mjs`)
Choice: a Workers AI vision model, `@cf/meta/llama-3.2-11b-vision-instruct`, prompted to answer one JSON object `{"verdict":"safe"|"unsafe"|"unsure"}`. Why: Cloudflare Workers AI has no dedicated NSFW image classifier (its safety model, Llama Guard 3, is text-only; the image classifiers available are general object labelers such as resnet-50 and detr-resnet-50). A vision-language model is the only moderation-capable option inside Cloudflare with no new account and no new vendor. Dedicated moderation APIs (Sightengine, AWS Rekognition, Google SafeSearch) are more reliable but are separate paid accounts, which this decision ruled out.

Fail closed: a photo is published only when the whole reply parses as one JSON object with `verdict` exactly `"safe"`. Unsafe, unsure, borderline, a refusal, prose (even prose containing "safe"), invalid JSON, a thrown error, or a missing AI binding all hold the photo. The prompt tells the model to answer "unsure" if there is any doubt.

Reliability limits (be honest with TJ about these):
- A general vision LLM is not a trained moderation classifier. Expect false negatives (something inappropriate passes) as well as false positives (held for nothing). It is weaker on partial nudity, suggestive poses, gestures, small or blurry content and non-English text in the image.
- Text inside the photo can try to talk the model into "safe" (prompt injection through the image). The prompt says to ignore it and the strict parser limits the damage, but this cannot be ruled out.
- Because there is no human approval step, a miss goes live on a public wall right away. Mitigations in this PR: the admin remove tool, the visitor delete link, the 60-photo wall cap (newest first), the daily cap below, and a strict prompt. Suggested extra steps TJ may want: check the wall after launch, and keep the wall behind the booth feature flag at first.
- Quota and cost: Workers AI is metered (free daily allowance, paid beyond it). `FILTER.DAILY_MAX` (300 per rolling 24 h) is a guess. Over the cap, uploads are refused and nothing is stored, so spend cannot run away. Measure neurons per image on real uploads and tune. Not tested against the live model.
- The exact request shape for sending an image to this model (a data-URL `image_url` message part) follows Cloudflare's chat format but was not run against the live service, because no AI binding or account was used. Verify it in a preview before go-live. Also, Meta's license must be accepted once for this model (a one-time request with `"prompt":"agree"` from TJ's Cloudflare account).
- The client should downscale to about 1280 px before upload, which keeps requests small and cheap.
- Cloudflare's separate free CSAM Scanning Tool (dashboard setting for the zone) is worth turning on as a complement; this Worker does not rely on it.

## Data
D1 `photos`: id, owner_hash (sha256 of the visitor's token; the token is never stored), status (`published`, `held`, `removed`), hold_reason, content_type, bytes, created_at. No consent column: only consenting photos are ever stored. No expiry column.

## Not in this PR
Client booth UI (camera, countdown, wall tiles), creating the D1 database and R2 bucket, secrets, the route, deploy.

## TJ still has to do before go-live
1. Create the D1 database and R2 bucket and replace the three `REPLACE_ME` placeholders in `photo-booth/wrangler.draft.jsonc`.
2. Set `CATALOG_ADMIN_PASSWORD` as a secret on the new Worker (same value as the catalog admin).
3. Accept Meta's license for the filter model and check Workers AI pricing/free allowance fits `FILTER.DAILY_MAX`.
4. Apply the migration, then confirm in a preview that `tjm.art/booth/*` reaches this Worker and not the site Worker.
5. Build the client and test the filter against real sample photos (safe and not) before launch.
