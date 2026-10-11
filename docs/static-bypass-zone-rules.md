# Static files bypass the website Worker

`wrangler.jsonc` sets `assets.run_worker_first` to an explicit route list. Static files, pages, `static/_redirects`
and 404s are served by the Cloudflare assets layer without invoking the `vermillionaurora` Worker, so they no longer count toward the
Workers request limit (100,000 a day on the free plan, shared by every Worker in the account). Only the QuickBooks API, the testimonials
API, `/inventory/originals` and the Apple merchant-id file reach `worker/site.mjs`.

What the Worker used to do for every request now lives elsewhere:

| Old Worker behaviour | Now |
|---|---|
| `www.tjm.art` 301 to the same path and query on `tjm.art` | zone rule 1 (tjm.art zone) |
| `http://tjm.art` 301 to https (same path and query) | zone rule 2 (tjm.art zone) |
| `vermillionaurora.com` 301 to the same path and query on `tjm.art`, except print and catalog paths | zone rule 3 (vermillionaurora.com zone) |
| `www.vermillionaurora.com` 301 to `tjm.art` | pre-existing rule `bb9f48c83f394800b97c3ad93d0916e4` (unchanged) |
| Renamed product pages: legacy domain went straight to the new slug | legacy domain now 301s to the same path, then `static/_redirects` 301s to the new slug (two hops) |
| One-year immutable `Cache-Control` on 200 responses under `/_astro/` and `/display/` | zone rule 4 (Response Header Transform Rule). Not `static/_headers`: that also applies to 404s for those paths, which would then be cached for a year |
| Apple Pay merchant-id file, QuickBooks, testimonials and inventory forwarding | still in the Worker (`run_worker_first`) |

`vermilionaurora.com` (one L) has its own rule and is untouched.

## Cloudflare zone rules (Redirect Rules, phase `http_request_dynamic_redirect`, all 301, query string preserved)

All targets are `concat("https://tjm.art", http.request.uri.path)`.

1. tjm.art zone `5c51165760cc5bc41120a3567c75dc28`, rule `81db549fdd1e4d04b41cc6f69cb1c895`: `(http.host eq "www.tjm.art")`
2. tjm.art zone, rule `8fb5c150877b4889952ac2814eae2a4b`: `(http.host eq "tjm.art" and not ssl)`
3. vermillionaurora.com zone `4119cf24a1bb418364bd69990c126a9d`, rule `be24884aab634cccb6ec1cde04bff37a` (keep this list equal to `KEEP_ON_LEGACY` in `worker/site.mjs`):

LEGACY_RULE_EXPRESSION: (http.host eq "vermillionaurora.com" and not starts_with(http.request.uri.path, "/print-editions/") and not starts_with(http.request.uri.path, "/print-samples/") and not starts_with(http.request.uri.path, "/print-masters/") and not starts_with(http.request.uri.path, "/print-test/") and not starts_with(http.request.uri.path, "/prints/") and not starts_with(http.request.uri.path, "/catalog/"))

4. tjm.art zone, Response Header Transform Rule (phase `http_response_headers_transform`, ruleset `901dca909b4c4cd6a0055d0141c4c8a9`), rule `dabd690a6a4a455384558b3b19d278f8`, sets `Cache-Control: public, max-age=31536000, immutable`:

CACHE_RULE_EXPRESSION: (http.host eq "tjm.art" and http.response.code eq 200 and (starts_with(http.request.uri.path, "/_astro/") or starts_with(http.request.uri.path, "/display/")))

(The workers.dev preview URL is not covered by the zone rule, so it serves these files with the default cache header.)

## Roll back

1. Set `"run_worker_first": true` in `wrangler.jsonc` again and restore `withLongCache` from git history and release.
2. Only after that deploys, the zone rules may be deleted (they are harmless to keep): dashboard, Rules, Redirect Rules, delete the four rules above
   (API: `DELETE /zones/{zone}/rulesets/{ruleset}/rules/{rule_id}`). The old Worker redirects work with or without them.
