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

## Normal release sequence (preferred / reliable path)

The automated `Propose production release` workflow (main → release PR titled “Promote main to production release”) often fails or stalls. **Do not wait on it.** Use this manual path every time:

1. Land work on `main` only after the Release gate passes (feature branch `codex/<topic>` from `origin/main` → PR → gate → squash-merge).
2. Create a release branch from the current production tip:
   ```sh
   git fetch origin
   git checkout -B codex/release-<topic> origin/release
   git merge origin/main --no-ff -m "Release: <topic summary>"
   ```
3. Confirm the release branch **tree equals `origin/main`** (same files as main; merge commit is fine):
   ```sh
   git diff --stat origin/main
   # expect empty
   ```
4. Push and open a PR **into `release`** (not the auto promote PR):
   ```sh
   git push -u origin HEAD
   gh pr create --base release --head codex/release-<topic> --title "Release: <topic>" --body "..."
   ```
5. Wait for the Release gate on that PR, then merge with a **merge commit** (not squash), so release history stays explicit.
6. Ignore any open auto “Promote main to production release” PR from `main` → `release`; close it if it confuses review.
7. Cloudflare Workers Builds publishes the website from `release`. The production checkout workflow waits for the website’s catalog hash, then deploys the API Worker from `release`, and verifies health, providers, catalog agreement, inventory, product routes, and the limited print pilot.

If the website version does not arrive, the API deployment stops before changing the checkout Worker. Use the existing checkout pause flags for an emergency stop. Never reset Durable Object data during rollback.

### Checkout deploy retries

If checkout deploy fails on `wait-for-site` or a transient print provider `422`, re-run failed jobs after the site is live (`gh run rerun --failed`), at most twice. If a Cloudflare build is stuck longer than about 15 minutes, stop and investigate rather than looping retries.

## Why the auto promote PR is unreliable

`.github/workflows/promote-release.yml` opens or updates a PR with base `release` and head `main` after each successful main push. Branch protection, required status checks, and GitHub’s handling of cross-branch promotion PRs frequently leave that PR ungated, conflicted, or otherwise unmergeable. The `codex/release-*` merge-from-main path above is the supported production promotion method until that workflow is deliberately fixed.
