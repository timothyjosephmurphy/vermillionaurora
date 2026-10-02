# Etsy owner authorization

The production commission Worker serves `/etsy/connect`. This phase saves authorization for the **VermillionAurora** shop only. It does not create/publish listings, synchronize stock, or send print fulfillment requests. It requests transaction-read permission as preparation for the next order-sync phase; order reads are not implemented yet.

## Human setup

1. Save encrypted Worker secrets `ETSY_KEYSTRING` and `ETSY_SHARED_SECRET` on `vermillion-commissions`. Keep the existing `COMMISSION_MANAGER_TOKEN`.
2. In https://www.etsy.com/developers/your-apps, register this exact callback (no trailing slash): `https://vermillion-commissions.timothyjosephmurphy.workers.dev/etsy/callback`.
3. Open `https://vermillion-commissions.timothyjosephmurphy.workers.dev/etsy/connect`, enter the commission manager token, and choose **Connect Etsy**.
4. Sign in as the shop owner and approve Etsy access. After returning, enter the manager token again and choose **Check connection** to confirm the shop name/ID and authorization date.

Etsy keys are entered only in Cloudflare, never in chat, source control, or the connection page. The connection page does not persist the management token. If its value is no longer available, replace `COMMISSION_MANAGER_TOKEN` in the Worker with a new strong credential and keep it in the owner's password manager; this also changes the credential for commission reference management.

## Boundaries and storage

- Scope: `shops_r listings_r listings_w transactions_r`. The transaction-read permission is preparation for order syncing; this phase still makes no transaction API calls. Additional features may require fresh consent.
- Fixed production origin/callback: preview and sandbox hostnames cannot use these endpoints.
- Initiation and status require an authenticated, same-origin POST. Callback requires matching single-use state, a Secure/HttpOnly/SameSite=Lax browser cookie, PKCE, and a ten-minute deadline.
- A single encrypted record, `etsy/connection.json`, lives in the existing **private** `COMMISSION_UPLOADS` R2 bucket. AES-GCM uses an HKDF key derived from the Etsy app credentials. Keep this bucket private. Commission cleanup and download routes cannot access this prefix.
- Conditional R2 writes consume authorization attempts exactly once and prevent a late callback overwriting a newer attempt. Starting again replaces the previous unfinished attempt. Failed connections preserve any prior successful connection.
- Status exposes only saved shop identity, scopes, and authorization time. It does not probe Etsy or certify that authorization has not since been revoked. Provider response bodies and credentials are never logged or returned.
- Access tokens expire after the provider's returned lifetime; the refresh token is stored for the upcoming listing integration. **No refresh scheduler or Etsy API client is enabled in this phase.** Before implementing listing operations, add serialized token refresh, revoked-grant handling, and verify current permissions. There is no background Etsy activity yet.

## Recovery

On callback failure, check the registered callback and app credentials, then restart authorization. For a different Etsy account, sign in to the owner of VermillionAurora first.

Rotating either Etsy app credential makes the saved encrypted record unreadable. Revoke old authorization in Etsy, remove only `etsy/connection.json` from the private bucket, then reconnect with the replacement credentials. Do not clear the bucket or alter commission reference records. Revoking the app in Etsy disconnects provider access; removing the record removes the site's stored credentials.

## Validation and release

`node --test cloudflare/etsy-connection.test.mjs` covers authorization boundaries, PKCE, state expiry/replay/concurrency, shop/owner validation, preserved prior connections, encryption, and error redaction. It is included in the existing `npm test` release gate. Publish through the protected feature → main → release workflow.

Reference: https://developers.etsy.com/documentation/essentials/authentication/
