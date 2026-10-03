# Vermillion Aurora Nostr publisher

This isolated Cloudflare Worker publishes the 12 approved X-campaign captions to Nostr at their existing Seattle schedule: Tuesdays 10:00 a.m., Thursdays 6:00 p.m., and Sundays 10:00 a.m. It runs from October 6 through November 1, 2026. Each note includes its campaign link and the same public image URL. Link attribution is changed to `utm_source=nostr`.

The worker is deployed paused (`NOSTR_PUBLISH_ENABLED=false`). To activate after deployment, in the Cloudflare dashboard open **Workers & Pages → vermillion-nostr-publisher → Settings → Variables and Secrets**:

1. Add `NOSTR_NSEC` as a **secret**, using the Nostr account's `nsec` private key. Never put it in the repository or chat.
2. Change `NOSTR_PUBLISH_ENABLED` to the text value `true`.

The Worker checks every five minutes and publishes due notes to the three relays in `wrangler.jsonc`. A Durable Object records accepted event IDs so retries do not create duplicate notes. Turning the switch on records the activation time; posts scheduled before activation are skipped, and the scheduler does not backfill old campaign entries.

The schedule ends November 1. Later posts require adding reviewed entries to `src/posts.mjs` and deploying an update.
