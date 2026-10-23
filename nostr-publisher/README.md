# Vermillion Aurora Nostr publisher

A Cloudflare Worker (`vermillion-nostr-publisher`) that publishes TJ's art posts to Nostr on the same schedule as the Buffer posts. A cron runs every five minutes and publishes each entry in `posts` (`src/posts.mjs`) once its `scheduledAt` time arrives. Each note is signed as "Vermillion Aurora" and sent to `NOSTR_RELAYS` (damus, nos.lol, nostr.bitcoiner.social).

## Schedule (Pacific time)

| When | Post | State |
| --- | --- | --- |
| Sat Oct 3, 11:00 PM | Warszawska Syrenka | published |
| Tue Oct 6, 7:00 AM | Honeybadger and Cub | published |
| Sun Oct 11, 10:00 AM | El Zonte at Dawn (moved from Thu Oct 8, 11:00 PM, same id) | scheduled |
| Tue Oct 13, 7:00 AM | El Salvador: Past, Present and Future (Chase Toole triptych) | scheduled |
| Thu Oct 15, 6:00 PM | Cormorant mural, Seattle | scheduled |
| Sat Oct 17, 10:00 AM | Dorian Nakamoto | scheduled |
| Tue Oct 20, 7:00 AM | Friends Club container mural, Lillooet | scheduled |
| Thu Oct 22, 6:00 PM | Coined in Watercolor poster | scheduled |
| Sat Oct 24, 10:00 AM | Moonrise in the North Cascades | scheduled |
| Tue Oct 27, 7:00 AM | Honeybadger and Cub prints | scheduled |
| Tue Oct 27, 10:00 AM | Layers of Sound: My Live Looping Guitar Setup | scheduled |
| Thu Oct 29, 6:00 PM | Exhibition history | scheduled |
| Sat Oct 31, 10:00 AM | Maui Sunset from Kihei | scheduled |
| Tue Nov 3, 7:00 AM | Sunrise on Rainier with Eagle | scheduled |
| Thu Nov 5, 6:00 PM | Syrenka commission process | scheduled |
| Sat Nov 7, 10:00 AM | Berlín, El Salvador sign | scheduled |

`scheduledAt` uses `-07:00` through October and `-08:00` from November 1 (end of daylight saving time). Tests check that every entry lands on the Pacific wall-clock time above.

## Note format

Each note is `text`, then `https://tjm.art` + `productUrl`, then `imageUrl`, separated by blank lines (the product link is not repeated when `text` already contains it). `text` is the X caption without its trailing tjm.art link. X @handles are replaced with plain names. `xText` keeps the Buffer X caption for reference and is not published. Links point to `tjm.art`. Images point to `tjm.art`, or to a `.jpg` poster on `img.tjm.art` when the note is image-only. A `utm_source=x` parameter is rewritten to `utm_source=nostr`. A note carries one image, so for carousel posts only the first image goes out.

## Safety rules

- **Receipts stop repeats.** When a relay accepts a note, a `nostr:sent:<id>` receipt is stored in the `NostrSchedule` Durable Object. An entry with a receipt never publishes again. Retries reuse the stored signed event, and a lease blocks concurrent runs. **Never change or remove the `id` of a published entry.** A new id would publish that entry again.
- **Nothing publishes early.** An entry becomes due only when `scheduledAt <= now`. An entry scheduled more than five minutes before the publisher was first activated is never sent.
- **Late deploys publish late, not never.** If a deploy lands after an entry's time, that entry publishes on the next tick with `created_at` set to its scheduled time. If publishing is paused and then re-enabled, every entry that came due during the pause goes out on the next tick.
- To move an unpublished entry, change its `scheduledAt` and keep its id. That way, at most one note for it can ever go out.

## Configuration

In Cloudflare, use **Workers & Pages → vermillion-nostr-publisher → Settings → Variables and Secrets**:

- `NOSTR_NSEC`: secret containing the Nostr account's private key.
- `NOSTR_PUBLISH_ENABLED`: text value `true` to allow publishing, or `false` to pause.

Deployment preserves dashboard variables with `keep_vars: true`. A missing enabled variable pauses publishing. The private key stays in Cloudflare.

## Deploying

- Pull requests to `main`/`release` run `npm --prefix nostr-publisher test` and a wrangler dry run.
- **A merge to `main` that touches `nostr-publisher/**` deploys automatically**, via `.github/workflows/deploy-nostr-publisher.yml` (tests, then `wrangler deploy`). That workflow can also be started manually with `workflow_dispatch`.
- The new schedule applies from the first cron tick after the deploy.

## Status

- Read-only status: https://vermillion-nostr-publisher.timothyjosephmurphy.workers.dev/status. It reports the number of scheduled posts, each scheduled post's id, time, status, text and image, the enabled state, and the connection-test (`testPost`) receipt.
- `/blog` lists published notes with their note URLs. It feeds https://tjm.art/blog/.
- Neither endpoint can trigger publishing, and there is no public write endpoint.

## Marketplace sync (studio-tracker #325, phase 1: built, not wired)

Code for listing TJ's originals on Shopstr and Plebeian as kind 30402 events (plus kind 30406 shipping options and a kind 0 profile). **Nothing here is called by the Worker's routes or cron, and it does not publish.** Files: `src/market-config.mjs` (every value TJ should review), `src/market-listing.mjs` (pure mappers), `src/market-run.mjs` (planner, gated runner, signer), `scripts/market-dry-run.mjs`, `src/market.test.mjs`.

- **Dry-run is the default.** It prints unsigned events as JSON and never reads the key. From the repo root: `node nostr-publisher/scripts/market-dry-run.mjs --only <product-id> [--now <unix seconds>]` (listing plus the two shipping options) and `--profile [--current profile.json]` (kind 0, merged into the current profile).
- **Gates for publishing (all set only by TJ):** `MARKET_PUBLISH_ENABLED=true`, `MARKET_MODE=publish`, the product id in `MARKET_APPROVED_IDS` (default: none), and real shipping rates (`MARKET_SHIPPING.placeholder` set to `false` in `market-config.mjs`). The profile also needs `MARKET_PROFILE_APPROVED=true`.
- **What gets listed:** only TJ Murphy's original paintings with status available or sold and a USD price. Never prints, books, commissions, not-for-sale works or Paul Murphy's works. Price = site price. Listing `d` tag = `tjm-<productId>`, `created_at` = max(now, previous + 1), unchanged content is skipped.
- **Sold** works stay listed (`status` sold, quantity and stock 0, still visible). A site hold sets quantity and stock 0 while the listing stays active.
- **Shipping:** flat US and worldwide tiers in `MARKET_SHIPPING` (placeholder numbers, buyer pays). Framed, oversize (over 40 in) or no-parcel-profile works get "contact for a quote" instead of a cost.
- **Signing:** `makeSigner` allows only kinds 30402 and 30406 (and 0 once the profile is approved), checks the signature pubkey equals `MARKET_PUBKEY`, and reads the key lazily through an injected `getKey()`.
- **Not built yet:** hold handling for marketplace orders (TTL 2 h, `MARKET_HOLD_TTL_MS`), DM and zap sale detection (5 min poll, `MARKET_POLL_INTERVAL_MS`), fan-out of site holds and sales to the listings, BTCPay matching. `nextMarketSale` and `PaintingStock.recordMarketSale` exist (tested) but nothing calls them.
