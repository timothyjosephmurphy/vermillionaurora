# Museum pages.dev redirects (studio-tracker #172)

HOLD: do not apply until the one-app /play is live and audited (card #172).

Each folder holds the `_redirects` file for one old Cloudflare Pages project. When TJ says go, copy it into that project's
`public/` (or build output root), deploy that project, and check:

    curl -sI "https://tjm-play-orsay.pages.dev/anything?x=1" | rg -i "^(HTTP|location)"
    # expect 301 -> https://tjm.art/play/orsay/?x=1

Projects are redirected, not deleted. Chase's Montreal is a separate site and is not touched.
Regenerate with `node scripts/write-museum-redirects.mjs` after editing `worker/museum-redirects.mjs`.
