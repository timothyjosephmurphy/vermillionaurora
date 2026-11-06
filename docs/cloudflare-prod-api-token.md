# CLOUDFLARE_PROD_API_TOKEN

Production deploy and rollback (`.github/workflows/deploy-production.yml`, `.github/workflows/rollback.yml`) use this GitHub Actions secret when it is set:

```
CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_PROD_API_TOKEN || secrets.CLOUDFLARE_SANDBOX_API_TOKEN }}
```

Store it on `timothyjosephmurphy/vermillionaurora` under Settings → Secrets and variables → Actions → Repository secrets. The name must be exactly `CLOUDFLARE_PROD_API_TOKEN`.

While that secret is empty, both workflows keep using `CLOUDFLARE_SANDBOX_API_TOKEN` and log `Cloudflare API token source: fallback CLOUDFLARE_SANDBOX_API_TOKEN`. They do not fail for a missing production secret. The log line names the secret, never its value.

Account ID: `3c1fddf0f4f4fc9c84594757d2e1bda0`.

## Least privilege

Create an [account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/). Prefer the Workers role **Editor** on only these existing Workers (per-Worker Editor is the September 2026 replacement for account-wide **Workers Scripts: Edit**):

| Permission | Scope | Used for |
| --- | --- | --- |
| Workers **Editor** (legacy token UI: **Workers Scripts → Edit**) | `vermillion-commissions` and `vermillionaurora` | Deploy checkout, upload its secrets, roll back either Worker |
| **Workers R2 Storage → Read** | Account | List buckets and read public-access domain settings |
| **Workers R2 Storage → Edit** (some screens label this **Write**) | Account | Create `vermillion-sales-records` only if that bucket is missing |

Editor on those two Workers covers every Workers API call these workflows make:

- `wrangler deploy` of `vermillion-commissions` from `cloudflare/wrangler.jsonc` (script, cron triggers, settings, version message, `CHECKOUT_RELEASE`). Durable Object classes (`PaintingStock`, `SalesLedger`, `BitcoinOrder`, `CartOrder`, `QuickbooksSync`, `NeuralDanceDebugRoom`) and the Images binding follow the Worker permission. They do not have a separate token permission. [Durable Objects permissions](https://developers.cloudflare.com/workers/authorization/durable-objects/).
- Worker secret upload of `QBO_CLIENT_ID` and `QBO_CLIENT_SECRET` during that deploy.
- `PUT` and `DELETE` `https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-commissions/secrets` for the temporary `CHECKOUT_AUDIT_TOKEN` in `payments/verify-production.mjs`.
- `wrangler rollback --name vermillion-commissions` and `wrangler rollback --name vermillionaurora`.

`Workers Admin` is not required. Both Workers already exist, and these workflows do not create or delete Workers.

R2 calls, and why Read is not optional if the privacy checks should be real:

- `payments/prepare-sales-archive.mjs`: `GET /accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/r2/buckets` (list), `GET .../r2/buckets/vermillion-sales-records/domains/managed`, `GET .../domains/custom`, and `POST .../r2/buckets` with `{"name":"vermillion-sales-records"}` only when the list does not contain that bucket.
- `payments/verify-commission-privacy.mjs`: `GET .../r2/buckets/vermillion-commission-uploads/domains/managed`, `GET .../domains/custom`, and the same two domain reads for `vermillion-sales-records`.

A 403 from either script is logged and the deploy continues, because the current sandbox token often cannot administer R2. **Read** is what makes those checks enforce private buckets instead of skipping. **Edit** is only the create-if-missing `POST`. The sales bucket already exists in production. Include Edit so a missing bucket can be recreated; omit it only if you accept that a missing bucket will warn and continue.

The list endpoint is account-scoped, so bucket-only object credentials are not enough.

## Not part of this token

These were checked against `deploy-production.yml`, `rollback.yml`, and the scripts those workflows run. Do not add them.

| Permission | Why it is unused |
| --- | --- |
| D1 Read or Edit | `tjm-catalog` (`e7514ceb-a633-4613-9cf1-cda817d8ca94`) is a Worker binding on both Workers. No script calls the D1 REST API. Deploying a binding does not require a D1 permission ([Workers authorization](https://developers.cloudflare.com/workers/authorization/)). |
| Zone **Cache Purge** | Neither workflow purges cache. `.github/workflows/purge-image-cache.yml` uses the separate secret `CLOUDFLARE_PURGE_TOKEN` and `POST /zones/5c51165760cc5bc41120a3567c75dc28/purge_cache`. |
| Zone **Workers Routes → Write** | Neither workflow adds routes or custom domains. `wrangler.jsonc` has no `routes`. Pull request preview URLs stay on Workers Builds, which uses its own Cloudflare connection. |
| Workers Tail Read, other Workers | Sandbox deploy, blog media, nostr, and shipping workflows keep `CLOUDFLARE_SANDBOX_API_TOKEN`, `CLOUDFLARE_API_TOKEN`, or `CLOUDFLARE_BOOK_MEDIA_API_TOKEN`. |

`scripts/rollback.sh` only starts `rollback.yml`. It does not call Cloudflare.

HTTP checks (`payments/verify-live-print-assets.mjs`, `scripts/verify-blog-pages.mjs`, `scripts/verify-release.mjs`, `payments/verify-sampled-quote.mjs`, and the checkout health poll) call `tjm.art`, `vermillionaurora.com`, or `workers.dev`. They do not use this token.
