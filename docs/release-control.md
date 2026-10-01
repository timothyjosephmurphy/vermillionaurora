# Production release control

This repository uses a protected two-stage release so the public website and checkout API are promoted from the same reviewed catalog.

## One-time human setup

1. In Cloudflare, open the vermillionaurora Worker’s Workers Builds settings and set its production branch to release. Keep the repository root and the existing npx wrangler deploy build configuration.
2. In GitHub repository Settings → Actions → General, keep workflow permissions at least Read and write and enable “Allow GitHub Actions to create and approve pull requests.” The promotion workflow uses this permission to open or update the main → release pull request after each successful main gate.
3. In GitHub, protect main:
   - require pull requests;
   - require the Release gate / gate status check;
   - require the branch to be current before merging;
   - prevent direct pushes.
4. Protect release:
   - require a pull request;
   - require the Release gate / gate status check;
   - prevent direct pushes;
   - allow the repository owner to merge the promotion pull request.
5. After the first merge to main, wait for Propose production release to open the main → release promotion pull request. Merge it only after the Cloudflare branch setting is correct.

## Normal release sequence

1. Work is merged into main only after the Release gate passes.
2. The promotion workflow opens or updates main → release.
3. Merging that pull request triggers Cloudflare Workers Builds for the website.
4. The production checkout workflow waits for the website’s catalog hash, then deploys the API Worker from release.
5. The workflow verifies the API health release, live provider readiness, catalog agreement, inventory, product routes, and the limited print pilot.

If the website version does not arrive, the API deployment stops before changing the checkout Worker. Use the existing checkout pause flags for an emergency stop. Never reset Durable Object data during rollback.
