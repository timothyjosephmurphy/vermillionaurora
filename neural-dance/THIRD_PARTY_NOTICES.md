# Third-party notices — Neural Dance

Audit date: 2026-11-06.

Scope: `src/pages/neural-dance/`, `neural-dance/`, `worker/neural-dance-debug.mjs`, and the Neural Dance tests (`tests/neural-dance-*.mjs`, `tests/neural-dance-*.browser-test.mjs`, `tests/fixtures/neural-dance-camera.html`).

Method: imports, `<script src>`, and stylesheet links in those files, plus the `license` field in `package-lock.json` for the npm packages they load. Vendored headers were read in tree. `static/fonts/fonts.css` states the font license. The C++ runtime (`neural-dance/src/neural_dance.cpp`, built by `neural-dance/build.sh` with `-nostdlib -ffreestanding`) links no third-party library; the compiler is not shipped.

`neural-dance/LICENSE` does not relicense anything in this file.

## Commercial-license result

No dependency in this scope uses a noncommercial, copyleft, or source-available license that would block a paid proprietary license for TJ Murphy's Neural Dance code.

Two components must stay under their own licenses. That is a separation rule, and it does not block commercial licensing of Neural Dance:

1. `neural-dance/vendor/maptastic.js` is MIT. Commercial use is allowed. The MIT copyright and permission notice have to stay with that file. `neural-dance/LICENSE` does not cover it.
2. Inter and Cormorant Garamond are SIL Open Font License 1.1. The Neural Dance pages load them from `static/fonts/`, which is outside this license. OFL 1.1 allows a commercial product to bundle the fonts. It does not allow relicensing the fonts, selling the font software by itself, or shipping the fonts without the copyright notice and the OFL text. This repository's font stylesheet marks them OFL, and the OFL text is not stored next to `static/fonts/`. That is a notice gap for those site font files. It is outside the Neural Dance paths this change is allowed to edit.

## Runtime

### Maptastic 3.0.0 — MIT

- Path: `neural-dance/vendor/maptastic.js`
- Used by: `src/pages/neural-dance/index.astro`, `src/pages/neural-dance/live/index.astro`, and `neural-dance/room-lab.js` (`window.maptastic`)
- Upstream: <https://github.com/austince/maptasticjs> (fork of glowbox/maptasticjs), identified in the file header as v3.0.0
- Copyright (C) 2015 Glowbox LLC
- The vendored file contains one license notice, the MIT text below. No second copyright header is present.
- Commercial conflict: none, provided the MIT notice stays on this file.

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

### Inter and Cormorant Garamond — SIL Open Font License 1.1

- Files: `static/fonts/inter-latin-3100e775.woff2`, `static/fonts/inter-latin-ext-34b9c504.woff2`, `static/fonts/cormorant-garamond-latin-d80df8ff.woff2`, `static/fonts/cormorant-garamond-latin-ext-cfa9a397.woff2`, declared in `static/fonts/fonts.css`
- Used by: `src/pages/neural-dance/index.astro`, `live/index.astro`, and `debug/index.astro` link `/fonts/fonts.css`. Those pages set `font-family: Inter`. The index page also mounts the site header, which uses Cormorant Garamond.
- Identification in tree: `static/fonts/fonts.css` line 1 says "Self-hosted Google Fonts (Cormorant Garamond, Inter; OFL)."
- Upstream families are published under the SIL Open Font License 1.1: Inter by the Inter Project, Cormorant Garamond by the Cormorant Project. License text: <https://openfontlicense.org/open-font-license-official-text/>
- Commercial conflict: none for licensing Neural Dance. The fonts themselves stay under OFL 1.1. See the notice gap above.

## Build tool

### Astro 7.3.5 — MIT

- Declared in `package-lock.json` (`node_modules/astro`, `"license": "MIT"`).
- Used by: the three pages under `src/pages/neural-dance/` are `.astro` files and import `BaseLayout.astro`. `BaseLayout` and `SiteHeader` are first-party.
- Astro is the site compiler. It is not shipped as Neural Dance source. MIT permits commercial use and does not impose MIT terms on the compiled pages.
- Commercial conflict: none.

## Tests only

These are not part of the running installation. A commercial license for operating Neural Dance does not require distributing them.

### Playwright 1.62.1 — Apache-2.0

- Declared in `package-lock.json` (`node_modules/playwright`, `"license": "Apache-2.0"`, dev dependency).
- Used by: `tests/neural-dance-camera.browser-test.mjs`, `tests/neural-dance-debug.browser-test.mjs`, `tests/neural-dance-live.browser-test.mjs`, `tests/neural-dance-rings.browser-test.mjs`, `tests/neural-dance-standalone.browser-test.mjs` (`import {chromium} from 'playwright'`).
- License text: <https://www.apache.org/licenses/LICENSE-2.0>
- Apache-2.0 permits commercial use. Redistributing Playwright itself requires keeping its license, notice, and change statements. Neural Dance tests import it; the site build does not copy it into `dist/`.
- Commercial conflict: none.

### Node.js built-in modules

- Used by the Neural Dance unit and browser tests: `node:test`, `node:assert/strict`, `node:fs`, `node:fs/promises`, `node:http`, `node:path`. `worker/neural-dance-debug.mjs` uses the Web Crypto API on the Workers runtime and imports only `../neural-dance/debug-protocol.js`.
- Node.js is the test runner and is not distributed with Neural Dance. Its license is the Node.js `LICENSE` file: <https://github.com/nodejs/node/blob/main/LICENSE>
- Commercial conflict: none identified for calling these built-ins from tests.

## Reviewed and not part of this tree

- `@babylonjs/core` 9.30.0, Apache-2.0 in `package-lock.json`, is imported by `src/scripts/gallery-room.js`. The covered Neural Dance pages, runtime, worker, and tests do not import it. Apache-2.0 permits commercial use. It is not covered by `neural-dance/LICENSE`.
- `cheerio`, `typescript`, and `wrangler` are site devDependencies. Nothing in the covered paths imports them.
- The root `package.json` `"license"` field is `ISC` for the npm package `vermillionaurora-catalog`. That field is repository metadata for the whole site. It is not the Neural Dance license, and this licensing change does not edit it.

## First-party modules the tests also import

`worker/site.mjs`, `worker/security-headers.mjs`, and `scripts/enrich-html-seo.mjs` are Vermillion Aurora source. They are not third-party dependencies. They are also outside `neural-dance/LICENSE` except `worker/neural-dance-debug.mjs`.
