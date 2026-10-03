# Vermillion Aurora Nostr publisher

The campaign schedule is empty. All 12 October/November campaign entries were removed at the artist's request on October 3, 2026.

One requested connection test is defined as `testPost` in `src/posts.mjs`. It features Warszawska Syrenka with its public image and product link. The next enabled five-minute scheduler tick publishes it. A stored signed event and delivery receipt prevent repeats across retries, concurrent runs, and redeployments. Once a relay accepts it, subsequent ticks are idle.

## Configuration

In Cloudflare, use **Workers & Pages → vermillion-nostr-publisher → Settings → Variables and Secrets**:

- `NOSTR_NSEC`: secret containing the Nostr account's private key.
- `NOSTR_PUBLISH_ENABLED`: text value `true` to allow publishing, or `false` to pause.

Deployment preserves dashboard variables with `keep_vars: true`. A missing enabled variable pauses publishing. The private key stays in Cloudflare.

## Check the test

Read-only status: https://vermillion-nostr-publisher.timothyjosephmurphy.workers.dev/status

The response reports the empty campaign count, enabled state, and test receipt, including the accepted relay and a public note URL. This endpoint cannot trigger publishing. There is no public write endpoint.

To prepare another test, explicitly approve its content and use a new test ID. Keep the current ID stable on routine deployments. New campaign entries require a reviewed change to the empty `posts` array.
