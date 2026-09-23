# Vermillion Aurora Website

Static website for Vermillion Aurora Productions, with an art portfolio, commission/contact interface, and the Neural Dance interactive demo.

## Hosting and deployment

Hosting is maintained on Cloudflare. GitHub reports a successful **Cloudflare Workers Builds** integration for the Worker named `vermillionaurora`.

Verified on September 21, 2026:

- Repository: [timothyjosephmurphy/vermillionaurora](https://github.com/timothyjosephmurphy/vermillionaurora)
- Default branch: `main`
- Latest source commit checked before this documentation update: `a21f98fd4e7dade778ccabb77fb722d84ce3a32f`
- Cloudflare check: **Workers Builds: vermillionaurora**
- Result: **success**, completed September 14, 2026
- Worker version reported by the check: `b99d2704-8e58-432d-897e-46ce84dfb6aa`
- [Successful GitHub build check](https://github.com/timothyjosephmurphy/vermillionaurora/runs/104177240988)
- [Cloudflare production build record](https://dash.cloudflare.com/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/services/view/vermillionaurora/production/builds/e49ca546-0723-4ab6-b91f-ad3d2d9141b8)

The repository has no GitHub Actions workflows, package manifest, or checked-in Wrangler configuration. The observed deployment is handled by the Cloudflare GitHub integration, rather than a GitHub Actions workflow.

### Settings that still require dashboard verification

GitHub's successful check confirms that Cloudflare built this repository's latest source commit and reported a Worker version. It does not expose the full current Cloudflare configuration or independently confirm the custom domain's routing.

In the Cloudflare dashboard, open the `vermillionaurora` Worker and verify:

- Connected repository and production branch (the observed successful commit is on `main`).
- Root directory, build command, deploy command, and static asset directory.
- Automatic build triggers and any build watch-path exclusions.
- Active deployment version and custom domain/routes.

Do not assume the asset directory is `public_html/`: it is an older Bluehost bundle, while the repository root also contains the homepage and the `neural-dance/` demo. Confirm the configured asset directory before changing deployment settings.

### Publishing changes

1. Edit the relevant website files and preview them locally.
2. Commit and push changes to the configured production branch, or merge a pull request into that branch.
3. Check the new commit for **Workers Builds: vermillionaurora** and wait for a successful result.
4. Confirm the active deployment and check the affected pages on the live domain.

Cloudflare Workers Builds supports automatic deployment from a connected Git repository; whether a particular push triggers a build depends on its branch and configured build filters. See [Cloudflare Workers Builds documentation](https://developers.cloudflare.com/workers/ci-cd/builds/).

If no check appears, inspect the Worker's connected repository, branch, automatic build settings, and watch paths. If a build fails, open the check's Cloudflare details link for its logs.

## Repository structure

| Path | Purpose |
| --- | --- |
| `index.html` | Root homepage, including a link to Neural Dance |
| `styles.css` | Root homepage styling and responsive layout |
| `script.js` | Homepage form interaction |
| `murals/index.html` | Friends Club mural story and swipeable process gallery |
| `murals/images/` | Optimized mural and process photographs |
| `neural-dance/index.html` | Interactive Neural Dance demo |
| `public_html/` | Older Bluehost upload bundle with separate homepage/style copies and an Apache `.htaccess` file |

The root files and `public_html/` copies are not identical. Check which directory Cloudflare publishes before deciding which copies to edit. The old Bluehost upload instructions are no longer the hosting workflow for this project.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open:

- Homepage: http://localhost:8000/
- Neural Dance: http://localhost:8000/neural-dance/
- Older Bluehost bundle, for comparison: http://localhost:8000/public_html/

No dependency installation or application compilation is needed for this local static-file preview. This server does not reproduce Cloudflare-specific domain routing or deployment settings.
