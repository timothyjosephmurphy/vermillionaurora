# Neural Dance — Authoritative Project & Prompt History

**Living master log** for TJ Murphy’s Neural Dance installation (web → camera/projector → wearables → Friends Club 2027).

| Field | Value |
|-------|-------|
| Owner | TJ Murphy (`timothyjosephmurphy`) |
| Timezone | `America/Los_Angeles` (PT) |
| Compiled | 2026-11-05 ~7:25 PM PT |
| Span | Friends Club physical precursor / pre-Sep-14 ChatGPT prototype → 2026-11-05 evening (`[t2215u]`) |
| Live Library Page | [Neural Dance — Project & Prompt History](https://cursor.com/canvas/store-05a11f8c-ccd8-4d68-bb9b-07aa5e3ea3cb/7b3e910a-e40a-43c9-8718-3e62e8695925) (`canvas_id` `7b3e910a-e40a-43c9-8718-3e62e8695925`) |
| GitHub history PR | [VA PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795) — `docs/neural-dance-project-history.md` (Era 0/1 and prompts through `[t2215u]` are in this file) |
| Primary GitHub home | [`vermillionaurora/docs/neural-dance-project-history.md`](https://github.com/timothyjosephmurphy/vermillionaurora/blob/main/docs/neural-dance-project-history.md) (target) |
| Tracker home | [`studio-tracker`](https://github.com/timothyjosephmurphy/studio-tracker) Project #1 (TJ Studio) |
| Live product URLs | [tjm.art/neural-dance/](https://tjm.art/neural-dance/) · [tjm.art/neural-dance/live/](https://tjm.art/neural-dance/live/) · [tjm.art/play/?room=neural-dance](https://tjm.art/play/?room=neural-dance) (Kinoteka Annex) |

> **Fidelity legend:** `verbatim` = TJ’s exact words recovered from chat/transcript · `faithful_paraphrase_via_SM` = Studio manager relay of TJ · `from_tracker` / `from_memory` = reconstructed from issue bodies / shared journal · `from_tracker_and_memory` = both. Every prompt below is labeled. Early forensic history additionally uses `reconstructed_from_initial_code`, `reconstructed_from_commit_diff`, and `creator_recollection_via_writer`; quoted source code / commit messages are not original user prompts.

---

## 1. Evolution arc (one glance)

1. **Genesis (physical precursor → Sep 30, 2026)** — Friends Club mural + Midjourney dancer stickers; creator-reported ~4-hour ChatGPT-with-Astra browser prototype by Sep 14; portfolio import `a21f98fd`; seven-commit Sep 21 story/photo/safety/rhythm/mapping/layout session; Sep 24 Friends Club link; nine-step Sep 27 dancer-role exploration in **PR #2, CLOSED UNMERGED**. Full evidence and inferred asks: **Era 0 / Era 1** below.
2. **Astro port & 3D gallery (Oct)** — PR #673; wall/courtyard live sim (#274, #288); Portal-inspired outdoor sticker booth (#283, #306, #307); hex plaque + click-to-add (#761, #762).
3. **Mic + C++/WASM (Nov 4)** — 4-band room mic + WASM core (#792, #794 → PRs #771, #772, #774).
4. **Controls + pink Post-it camera (Nov 5 AM)** — Controls restore PR #779; pink markers #793/#795–#798 → PR #780; sound-wave rings + silence gate #799/#800 → PRs #781/#782 folded into standalone `/neural-dance/live/` PR #784; grid-over-dancers Auto-Align PR #786.
5. **Hardware + Paradise Dystopia + wearables (Nov 5 afternoon)** — XGIMI Vibe One + Anker Prime weatherproof pod; *Paradise Dystopia* painting (#820); wearable LED blink / 2.4 GHz clips (#818, #819, Option 2A JLCPCB pack + prototype audit: copper-pour short risk → prefer off-the-shelf **XIAO nRF52840** / **ESP32-C3-Zero**); Kinoteka Annex two-room 10 ft / 60° stereo shadow-dancers → energy-balls + painting + 4 moving-head spotlights (#821, #822 — **SHIPPED LIVE** Gallery deploy `867`); 3D volumetric wave backlog (#823).
6. **Live room testing (Nov 5 evening, `[t2187u]`–`[t2215u]`)** — Home Screen PWA, Align HUD banner, 1× Back Camera default, quad-median white-balance + 4-layer optical anti-feedback, `480 px` dark dancer silhouette stickers (#801 / PR #783 folded into unified fast-track **PR #794**), standby white-frame strobe fallback (**tracker [#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** ON HOLD), Option 1 Cloudflare Durable Object WebSocket live debug stream + `/neural-dance/debug/` viewer (**tracker [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)**, cloud agent `bc-623cfcbe` branched off PR #794), waveform-ring mic-gain + **sim vs sticker dancer stats** (cloud agent `bc-045761e2` branched off PR #794; status like `25 dancers (24 sim, 1 sticker) · 37 pulses · noise floor …`), cheap dedicated Android install plan (**tracker [#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)**), forensic ChatGPT/Astra Era 0–1 reconstruction (`chatgpt-genesis-reconstruction.md` + [PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)), and this living history log (`[t2198u]`–`[t2215u]`).

---

## 2. Architecture evolution (summary)

| Layer | Then → Now |
|-------|------------|
| Core sim | JS canvas mural → **C++ → WASM** (`neural-dance/src/neural_dance.cpp` + `neural-dance.wasm`) |
| Audio | Synthetic clock → **4-band room mic** (kick/bass/snare/hi-hat) + AGC meters + **silence gate** |
| Visual pulse | Bloom → **circular live-waveform rings** (`wave-ring.js`) per dancer band |
| Projection | Maptastic corner-pin on Room music → full-screen **`/neural-dance/live/`** + **grid-over-dancers Auto-Align** |
| Optical input | None → **pink Post-it HSV** → + **dark silhouette stickers** (`Track: Both`) with stageEcho / anti-feedback |
| Install form | Browser demo → iPhone Home Screen PWA mirroring to **XGIMI** in weatherproof pod (Anker Prime) |
| Next physical | Wall stickers → **wearable blink-code / 2.4 GHz clips** (#818/#819) |
| 3D / room | Gallery courtyard wall → **Kinoteka Annex two-room** stereo capture → energy-ball Neural Dance (**live** at `/play/?room=neural-dance`) |
| Live stats HUD | Total dancers only → **split simulated vs sticker/marker dancers** (`25 dancers (24 sim, 1 sticker) · 37 pulses · noise floor …`) via `bc-045761e2` |
| Remote witness | — → **opt-in 1–2 fps WebSocket debug relay** to Durable Object (#824; `bc-623cfcbe` building `/neural-dance/debug/` off PR #794) |
| Dedicated device | iPhone mirroring → backlog plan for **cheap Android** phone as dedicated mic/cam/cast host (#826) |

**Key product files (vermillionaurora):**
`src/pages/neural-dance/index.astro`, `src/pages/neural-dance/live/index.astro`, `neural-dance/{camera-markers,live-show,room-lab,silence-gate,wave-ring}.js`, `neural-dance/src/neural_dance.cpp`, `neural-dance/vendor/maptastic.js`.

---

## 3. Tonight’s queue (2026-11-05 ~7:25 PM PT) — authoritative status

| Priority | Item | Tracker / PR / Agent | Status |
|----------|------|----------------------|--------|
| 0 | Kinoteka Annex two-room 3D sim (shadow dancers → energy balls + *Paradise Dystopia* + 4 moving heads) | [#821](https://github.com/timothyjosephmurphy/studio-tracker/issues/821), [#822](https://github.com/timothyjosephmurphy/studio-tracker/issues/822) | **SHIPPED LIVE** — Gallery deploy `867` at https://tjm.art/play/?room=neural-dance (`[t2212u]` ETA report) |
| 1 | Unified `/neural-dance/live/` release: Align banner, Back Camera, pink WB + anti-feedback, Home Screen PWA, **dark dancer silhouette @ 480 px** | VA **[PR #794](https://github.com/timothyjosephmurphy/vermillionaurora/pull/794)** (fast-track; folds [#801](https://github.com/timothyjosephmurphy/studio-tracker/issues/801) / VA PR #783) | **MERGED** 2026-11-05 ~8:05 PM PT — merge commit [`e5b7ef36b33eb119085de123794d0f38a4ee8007`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e5b7ef36b33eb119085de123794d0f38a4ee8007) |
| 2 | Waveform-ring mic-gain **+ sim vs sticker dancer stats** on `/neural-dance/` and `/neural-dance/live/` (`[t2209u]`, `[t2215u]`) | VA **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** · cloud agent **`bc-045761e2`** (`room-lab.js` + `wave-ring.js`), follow-up to [PR #794](https://github.com/timothyjosephmurphy/vermillionaurora/pull/794) | **MERGED** 2026-11-05 ~8:53 PM PT — merge commit [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f) |
| 3 | **Option 1 live debug stream** + `/neural-dance/debug/` viewer (Share live debug → DO WebSocket 1–2 fps frames + telemetry) | **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** · cloud agent **`bc-623cfcbe`** branched off PR #794 | Building next / parallel after #1 (`[t2206u]`–`[t2208u]`) |
| Docs | Living project & prompt history (Era 0/1 ChatGPT/Astra forensic + tonight’s prompts) | VA **[PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)** + Library Page `7b3e910a-…` (`[t2198u]`, `[t2214u]`) | Open — Era 0/1 and prompts through `[t2215u]` are in this file |
| HOLD | Synchronized single-frame white strobe on capture tick | **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** | **ON HOLD** — do not implement unless TJ activates after #1 live test (`[t2205u]`) |
| Backlog | Cheap dedicated Android device plan (cam + mic + Cast/USB-C → projector) | **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** | Open (`[t2213u]`) |
| Backlog | 3D volumetric wave algo | [#823](https://github.com/timothyjosephmurphy/studio-tracker/issues/823) | Open |
| Deep backlog | Wearable LED Phase 1 / 2 + Option 2A pack audit | [#818](https://github.com/timothyjosephmurphy/studio-tracker/issues/818), [#819](https://github.com/timothyjosephmurphy/studio-tracker/issues/819) | Open — prefer XIAO nRF52840 / ESP32-C3-Zero over flawed custom copper pour |

### New / updated tracker & cloud work this compile (2026-11-05 ~7:08–7:25 PM PT)

- **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** — *Neural Dance (/live/): opt-in WebSocket live debug stream (1–2 fps camera/stage frames + telemetry to Durable Object)* — Project #1. TJ chose **Option 1** (`[t2208u]`). Cloud agent **`bc-623cfcbe`** building Durable Object WebSocket + HTTP snapshot + `/neural-dance/debug/` viewer, branched off PR #794.
- **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** — *Neural Dance camera [ON HOLD fallback]: synchronized single-frame white strobe on capture tick for clean board view* — labeled `blocked-on-tj`. Verbatim hold from `[t2205u]`.
- **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** — *Neural Dance hardware/install: plan for running Neural Dance on a cheap dedicated Android device* — filed from `[t2213u]`.
- **`bc-045761e2`** — wave-ring room-mic gain fix **plus** status-line split of simulated vs sticker/marker dancers (`[t2209u]` + `[t2215u]`). **MERGED** as [PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799) at [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f).
- **[PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)** — `docs/neural-dance-project-history.md` only; Era 0/1 and evening prompts through `[t2215u]` are in this file.

---

## 4. Nov 5 evening live-room prompts (`[t2187u]`–`[t2215u]`) — append beyond earlier reconstruction

These extend the prompt log past `nd-0066` (`[t2199u]`). Times approximate PT evening 2026-11-05.

### `nd-0070` — Home Screen / PWA chrome hide
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** Ship standalone Home Screen support on `/neural-dance/` / `/live/` so saving to iPhone Home Screen (incl. while mirroring to XGIMI) hides Safari chrome and site header.
- **Created / changed:** `manifest.webmanifest` `display:standalone`; fast-track with camera bundle.

### `nd-0071` — `[t2194u]` Align success banner — **verbatim**
> Not sure that I've got the align function working yet. I want, I want to see a success message when it's using the camera successfully to align to the grid.
- **Created / changed:** Align HUD success banner; auto-start camera; Markers on.

### `nd-0072` — `[t2195u]` Default Back Camera — **verbatim**
> Using the front-facing camera rather than the back, it seems, to default to the back-facing camera.
- **Created / changed:** `facingMode: environment`; prefer Back Camera; `nd.camera.v2` clears stuck Front Camera localStorage.

### `nd-0073` — `[t2196u]` Pink not detecting under lights — **verbatim**
> For diagnostic purposes, I turned on the overhead lights to make it so that the pink square should be very visible, and I also turned down all the sensitivity sliders to the bottom in an effort to make it detected, and still nothing.
- **Created / changed:** Slider direction UX (higher = more permissive); screen-/quad-median white-balance; warm-light coral vs projector magenta snap after WB.

### `nd-0074` — `[t2197u]` Optical feedback loop — **verbatim**
> Okay, with the sliders turned all the way the opposite direction, it detects four pink blobs, which isn't quite right either. I suspect it's capturing other things that are already on the screen. It should, needs to be able to tell the difference between things it's projecting, so it doesn't get into a feedback loop, and things that are on the screen.
- **Created / changed:** 4-layer anti-feedback (quad WB, UI chrome mask, ~300 ms stageEcho cancellation, feedback-safe palette + dark pupil under dancers).

### `nd-0075` — `[t2198u]` Living project history — **verbatim**
> Make a document. It could be a page, but I want it on GitHub also, that's this project history with everything that I've asked for. I want it listed what are the prompts that I used to create which thing and how it developed. Keep an ongoing log of this going forward and re-reconstructed from the, passed up to this point from the repo.
- **Created / changed:** This master doc + Library Page + GitHub `docs/neural-dance-project-history.md` PR path.

### `nd-0076` — `[t2199u]` Parallelize — **verbatim**
> Parallelize all this work as much as possible. Use other bots if need be.

### `nd-0077` — `[t2203u]` ETA ask — **verbatim**
> Give me an ETA.
- **Created / changed:** Live ETA board for Annex (shipped), history Page/PR, camera+silhouette release, etc.

### `nd-0078` — `[t2204u]` Fold dark dancer into pink/align release — **verbatim**
> Include the Dark Dancer silhouette in the pink note alignment release.
- **Created / changed:** #801 / PR #783 detection (`Track: Both`, 480 px, anti-feedback) merged into unified fast-track **PR #794** (same deploy as pink + Align + Back Camera + Home Screen).

### `nd-0079` — `[t2205u]` White-frame strobe standby — **verbatim**
> If it becomes necessary, we could make it so that occasionally a white screen is projected for a quick frame, like exactly when the capture of the dancers on the board occurs, so that we could get a clean view of what's on the board. Hold on that until we decide it's necessary as a, if it's not working thing.
- **Created / changed:** Tracker **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** — **ON HOLD**.

### `nd-0080` — `[t2206u]` Stream to server so agent can witness — **verbatim intent**
> Also, I'd like to know what it would take to actually stream this to the server as well potentially so that you could witness what's happening in real time.
- **Response offered:** Option 1 (1–2 fps WS + telemetry DO) vs Option 2 (30 fps WebRTC).

### `nd-0081` — `[t2207u]` Backlog + queue — **verbatim**
> Add that to the backlog and queue it up after the existing work.

### `nd-0082` — `[t2208u]` Choose Option 1 — **verbatim**
> Go for option one.
- **Created / changed:** Tracker **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** — queued next after PR #794 camera/sticker release.

### `nd-0083` — `[t2209u]` Missing waveform rings — **verbatim**
> I'm not seeing the waveform-shaped light pulses that we scoped and built earlier in this release. Is that coming up?
- **Created / changed:** Shipped via **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** merge [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f) (`bc-045761e2`). Room-mic `ringGain` follows the silence gate so quiet RMS ripples again on `/neural-dance/` and `/neural-dance/live/`.

### `nd-0084` — `[t2210u]` Parallelize hard — **verbatim**
> Are we, are we paralyzing as much as possible right now?
- **Created / changed:** Parallel workers for tracker issues, history master doc, waveform fix, Library Page, GitHub PR.

### `nd-0085` — `[t2212u]` ETA on finishing all that — **verbatim**
- **Received:** 2026-11-05 **~7:10 PM PT**.
> ETA on finishing all that?
- **Created / changed:** Live multi-stream ETA report covering PR #794 camera/sticker release, waveform-ring fix, history Page/PR #795, and Kinoteka Annex (#821) already **live** announcement.

### `nd-0086` — `[t2213u]` Cheap Android device plan — **verbatim**
- **Received:** 2026-11-05 **~7:11 PM PT**.
> Add to the backlog, I wanna see a plan for using a cheap Android device to do this.
- **Created / changed:** Tracker **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** — *Neural Dance hardware/install: plan for running Neural Dance on a cheap dedicated Android device* (dedicated cam + mic + Google Cast / USB-C DP Alt Mode to projector so the iPhone is not the install host).

### `nd-0087` — `[t2214u]` Recover the earlier ChatGPT genesis — **verbatim**
- **Received:** 2026-11-05 **~7:16 PM PT**, Studio manager conversation.
> For the project history, go back further into the GitHub details. This was somewhat developed with ChatGPT, so reconstruct, even if you can't find the exact verbatim prompts, the steps that I took to create the initial version.
- **Created / changed:** Forensic Era 0 / Era 1 reconstruction — Friends Club mural precursor; ~4-hour ChatGPT-with-Astra prototype layers **P0–P9** already present in the Sep 14 **88-line** standalone HTML (`a21f98fd`); Sep 21 seven-commit sprint (`8305ac1f`…`e7fd7670`, including 30/15 fps narrow-window beat-drop fixed by phase-crossing integration + bounded activation queue + 28 manual photo-traced sticker centers); Sep 24 Friends Club mural link (`64ccc62d`); Sep 27 **PR #2 CLOSED UNMERGED** nine-commit dancer-roles experiment (Zoners / Leaders / Followers + exponential diminishing activation gain). Mirrored into this master doc (Era 0 / Era 1 below) and the Library Page; feeds [PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795).
- **Fidelity:** `verbatim` for TJ’s ask; inferred build steps labeled `reconstructed_from_initial_code` / `reconstructed_from_commit_diff` / `creator_recollection_via_writer`. No original ChatGPT conversation export recovered. PR #2 must stay labeled **closed unmerged**.

### `nd-0088` — `[t2215u]` Split sim vs sticker dancer stats — **verbatim**
- **Received:** 2026-11-05 **~7:18 PM PT**.
> Also, for the statistics that it reports, like listening, there are 25 dancers, 37 pulses, noise floor. It should show how many are simulated and how many are from stickers.
- **Created / changed:** Shipped via **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** merge [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f) (`bc-045761e2`). `formatDancerCount` on `/neural-dance/` and `/neural-dance/live/` reports e.g. `25 dancers (24 sim, 1 sticker)`. Also noted: **`bc-623cfcbe`** building [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824) (Option 1 Durable Object WebSocket + HTTP snapshot live debug stream & `/neural-dance/debug/` viewer) branched off PR #794.

## 5. Prompt → feature map (compact)

| When (PT) | Prompt / ask | Delivered | Tracker | PR |
|-----------|--------------|-----------|---------|----|
| 2026-09-14 | Add Neural Dance to nav/portfolio | page + nav | — | `a21f98fd` |
| 2026-09-21 | Motivation, mural photo, mapped sim, guards | story + sim | — | commits Sep 21 |
| 2026-09-27 | Dancer roles (Zoners/Leaders/Followers) | roles PR | — | [VA #2](https://github.com/timothyjosephmurphy/vermillionaurora/pull/2) |
| 2026-10-18 | AI blog / Friends Club 2027 | drafts | [#34](https://github.com/timothyjosephmurphy/studio-tracker/issues/34), [#140](https://github.com/timothyjosephmurphy/studio-tracker/issues/140) | — |
| 2026-10-20 | Astro port | `/neural-dance/` Astro | — | [VA #673](https://github.com/timothyjosephmurphy/vermillionaurora/pull/673) |
| 2026-10-21–27 | Gallery wall / courtyard / plaque / sticker bot | gallery work | [#274](https://github.com/timothyjosephmurphy/studio-tracker/issues/274), [#288](https://github.com/timothyjosephmurphy/studio-tracker/issues/288), [#283](https://github.com/timothyjosephmurphy/studio-tracker/issues/283), [#306](https://github.com/timothyjosephmurphy/studio-tracker/issues/306), [#307](https://github.com/timothyjosephmurphy/studio-tracker/issues/307), [#761](https://github.com/timothyjosephmurphy/studio-tracker/issues/761), [#762](https://github.com/timothyjosephmurphy/studio-tracker/issues/762) | — |
| 2026-11-04 | Mic bands + C++/WASM | WASM + Listen | [#792](https://github.com/timothyjosephmurphy/studio-tracker/issues/792), [#794](https://github.com/timothyjosephmurphy/studio-tracker/issues/794) | [VA #771](https://github.com/timothyjosephmurphy/vermillionaurora/pull/771) |
| 2026-11-04 | Room music Listen lab + AGC | Room music | — | [VA #772](https://github.com/timothyjosephmurphy/vermillionaurora/pull/772), [VA #774](https://github.com/timothyjosephmurphy/vermillionaurora/pull/774) |
| 2026-11-05 AM | Restore controls | sliders + add dancer | — | [VA #779](https://github.com/timothyjosephmurphy/vermillionaurora/pull/779) |
| 2026-11-05 AM | Pink Post-it camera | `camera-markers.js` | [#793](https://github.com/timothyjosephmurphy/studio-tracker/issues/793), [#795](https://github.com/timothyjosephmurphy/studio-tracker/issues/795)–[#798](https://github.com/timothyjosephmurphy/studio-tracker/issues/798) | [VA #780](https://github.com/timothyjosephmurphy/vermillionaurora/pull/780) |
| 2026-11-05 AM | Wave rings + silence gate | rings + gate | [#799](https://github.com/timothyjosephmurphy/studio-tracker/issues/799), [#800](https://github.com/timothyjosephmurphy/studio-tracker/issues/800) | [VA #781](https://github.com/timothyjosephmurphy/vermillionaurora/pull/781), [VA #782](https://github.com/timothyjosephmurphy/vermillionaurora/pull/782) → folded [#784](https://github.com/timothyjosephmurphy/vermillionaurora/pull/784) |
| 2026-11-05 midday | Standalone `/live/` | full-screen page | — | [VA #784](https://github.com/timothyjosephmurphy/vermillionaurora/pull/784) |
| 2026-11-05 PM | Grid-over-dancers Align | Auto-Align | — | [VA #786](https://github.com/timothyjosephmurphy/vermillionaurora/pull/786) |
| 2026-11-05 afternoon | Paradise Dystopia + wearables + Annex | painting blog, clip-2a, Annex live | [#820](https://github.com/timothyjosephmurphy/studio-tracker/issues/820), [#818](https://github.com/timothyjosephmurphy/studio-tracker/issues/818), [#819](https://github.com/timothyjosephmurphy/studio-tracker/issues/819), [#821](https://github.com/timothyjosephmurphy/studio-tracker/issues/821), [#822](https://github.com/timothyjosephmurphy/studio-tracker/issues/822), [#823](https://github.com/timothyjosephmurphy/studio-tracker/issues/823) | [VA #790](https://github.com/timothyjosephmurphy/vermillionaurora/pull/790) (pins, open); Gallery deploy `867` |
| 2026-11-05 evening | Live-room camera polish + silhouette + history + debug stream + Android plan + wave rings + sim/sticker stats + ChatGPT genesis | PR #794 bundle; wave-ring+stats **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** MERGED; #824 `bc-623cfcbe`; history; #825 HOLD; #826 | [#801](https://github.com/timothyjosephmurphy/studio-tracker/issues/801), **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)**, **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)**, **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** | VA PR #783 → [#794](https://github.com/timothyjosephmurphy/vermillionaurora/pull/794); wave rings + HUD **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f); history **[PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)** |
| 2026-11-05 ~7:16 PM | Reconstruct pre-Grok ChatGPT/Astra steps even without verbatim prompts (`[t2214u]`) | Era 0 P0–P9 + Era 1 Sep 14/21/24/27 (PR #2 unmerged) | — | evidence in §7 Era 0/1 |
| 2026-11-05 ~7:18 PM | Status HUD: split simulated vs sticker dancers (`[t2215u]`) | `formatDancerCount` e.g. `25 dancers (24 sim, 1 sticker)` on `/neural-dance/` + `/live/` | — | **[PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)** MERGED [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f) |

---

## 6. Full reconstructed prompt log (through `[t2199u]`)

The section below is the earlier reconstruction (`prompts-timeline.md`), kept intact so every recovered TJ prompt remains in one master file. Evening appendices above (`nd-0070`+) continue the numbering.

### Embedded: prompts-timeline.md

**Reconstructed:** 2026-11-05 ~6:55 PM PT (`America/Los_Angeles`)  
**Date span:** ~2026-10-01 / 2026-10-15 → 2026-11-05  
**Total prompt entries:** 36  

Living log of every TJ Murphy request that shaped Neural Dance — verbatim where available — and what each one created. Keep appending going forward. Companion: `prompts-timeline.json`.

## Evolution arc

1. Phase 0 concept & browser prototype (≤ Oct 2026)
2. Sticker booth & 3D gallery (Oct 21–27): #283, #274/#288, #306/#307, #761/#762
3. Mic + C++/WASM (Nov 4): #792+#794 → PR #771; Room music #772/#774
4. Controls + pink Post-it camera (Nov 5 AM): #779, #780, rings/silence, /live/ #784
5. Projector Align UX (Nov 5 PM): #786 grid-over-dancers
6. Hardware + Paradise Dystopia + wearables (Nov 5 afternoon): XGIMI/Anker pod, #818–#823, Kinoteka Annex
7. Live room testing (Nov 5 evening): Home Screen, Align banner, Back Camera, WB, anti-feedback, this history

---

## 2026-10-01

### `nd-0005` — ~ early Oct (Writer AI blog ask; pre-#34 framing)

- **Chat:** Writer (1ea27469)
- **Source:** Writer transcript pos~65
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Prepare a blog post on how I use AI. Focus on iterative development and ultimately making things, using AI as a power tool in steps the process that enable human creativity. talk about how a lot of my work comes, my paintings come from photography, and a small number of them include AI references that I've manipulated digitally and composited with Photoshop and other tools. And Use of multimedia, the stickers, and the neural dance thing, and the AI components that went into those. Stickers, for example, were mid-journey images which made unique dancers that different styles people could pick. emphasize that ultimately it's about making something physical to share with people. Also emphasize the craftsmanship...

- **Created / changed:** AI power-tool framing that later titles #140 / Neural Dance blog theme.
- **Evolution:** Philosophical frame: AI explores choices; physical stickers/mural/dance is the art.

## 2026-10-15

### `nd-0001` — ~ (memory / shared journal)

- **Chat:** Studio manager (shared memory)
- **Source:** RecallMemory shared_journal via Studio manager
- **Fidelity:** `paraphrase_from_memory`
- **Prompt (reconstructed):** TJ's Neural Dance installation concept recorded: camera and projector place participants' photographed silhouettes on a mural with halos and connections pulsing to music like neural activation (proximity reinforcement, traveling pulses, exponential decay, refractory periods, gravity, bloom, rainbow tracers, wobble, sustained pulses), working at sparse and dense crowds; dancer types Zoners / Leaders / Followers.

- **Created / changed:** Conceptual north star for Neural Dance installation (camera+projector+mural+music neural network).
- **Evolution:** Phase 0 concept → later browser simulation → physical booth → wearable pins.

## 2026-10-18

### `nd-0002` — ~ (Team / Writer)

- **Chat:** Team (6635519e) + Writer (1ea27469)
- **Source:** SearchTranscripts Team pos~837; Writer #34 answers
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> For the Neural Dance AI blog post, just... I mean, you can read what it says on the Neural Dance page, and maybe talk about how I went about developing it from an idea to a simulation. And also that I'm planning on bringing it to Friends Club in 2027. And I'm working with Paul and Cara on that, with higher ed, linked to those things.

- **Created / changed:** studio-tracker #34 / #140 Neural Dance blog draft direction; Friends Club 2027 + Paul/Kara (Hi Ed).
- **Evolution:** Public narrative framing: idea → simulation → Friends Club 2027.

## 2026-10-20

### `nd-0003` — answers relayed via Studio manager → Writer

- **Chat:** Studio manager → Writer
- **Source:** Writer transcript pos~218 (Studio manager relay of TJ answers)
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** TJ built Neural Dance by describing to an AI agent his experience of dancing to the beat while people around him are activated by his moves and pass that activation on. Inspired by neural networks: neurons that wire together fire together, with an activation curve. Friends Club mural copy from tjm.art. Don't use Paul and Cara's full names; they organize Friends Club Festival and run Hi Ed.

- **Created / changed:** Blog draft core origin story in /workspace/creative/blog/neural-dance-ai-draft.md
- **Evolution:** Documents Phase 0 interactive canvas prototype origin (~4 hours with ChatGPT/Astra).

## 2026-10-21

### `nd-0010` — ~

- **Chat:** Gallery / Studio manager
- **Source:** studio-tracker #274
- **Fidelity:** `from_tracker`
- **Prompt (reconstructed):** Move the money printer off the Neural Dance wall; show the real Neural Dance simulation (not stand-in animation).

- **Created / changed:** studio-tracker #274; preview-251 Neural Dance wall uses real /neural-dance/.
- **Evolution:** 3D gallery embeds live sim.

## 2026-10-22

### `nd-0004` — Writer 1:1

- **Chat:** Writer (1ea27469)
- **Source:** Writer transcript; blog draft
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Kara, Hi-Ed. Originally, I used ChatGPT with Astra, and I've moved to Grokbot.

- **Created / changed:** Confirmed Kara / Hi Ed spelling; tool chain ChatGPT+Astra → Grok Bot; ~4-hour prototype fact.
- **Evolution:** Blog #34 facts locked.

### `nd-0011` — Gallery chat

- **Chat:** Gallery (e83ae9a7)
- **Source:** ReadTranscript Gallery around 390
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Let's get rid of all the columns as well as the the, the colonnade things that they support. make it real obvious to, that we want to walk into the the rooms. Let's also move the the murals, both the Friends Club and the Commerant Garden mural to the inside courtyard. And the neural dance display there as well. the neural dance thing should be active. Right now, we see just a static image. It should should be able to see it doing its thing. so like the simulation should run. when you tap on it, it should add a new node to it like it does when the simulation's running.

- **Created / changed:** studio-tracker #288; live Neural Dance in courtyard; tap-to-add node.
- **Evolution:** Gallery UX: static image → live interactive sim in courtyard.

### `nd-0012` — ~12:29 AM–morning PT (issue created 2026-10-22T07:29:34Z)

- **Chat:** Studio manager
- **Source:** studio-tracker #283 + RecallMemory profile Oct 22
- **Fidelity:** `from_tracker_and_memory`
- **Prompt (reconstructed):** Self-contained weatherproof off-grid Neural Dance sticker booth (#283): Cameo cuts single-colour vinyl; one of TJ's laptops on battery; real projector as light; physical button; 8-flash countdown capturing 8 poses; eight 1–2 inch stickers per row; no crosscut (strip exits a slit); unusual non-box enclosure near Friends Club dance stage; hard deadline June 2027. $2,000 budget (not counting laptop). Existing projector broken — needs replacement/repair. Enclosure: original take inspired by Valve Portal turrets (not a copy) — tall glossy white pod with single glowing eye where the camera sits.

- **Created / changed:** studio-tracker #283 sticker booth; #306 3D sticker bot; #307 wall stickers stretch.
- **Evolution:** Phase 0 web sim → physical sticker booth vision for Friends Club 2027.

### `nd-0013` — ~2:06 PM PT

- **Chat:** Studio manager → Gallery / Visual
- **Source:** studio-tracker #306 #307
- **Fidelity:** `from_tracker`
- **Prompt (reconstructed):** Add sticker-printing bot next to Neural Dance in 3D gallery (~24×6 in, three insect-like legs, front slot, projector lens back). Stretch: visitors pick up dropped stickers and stick them on walls, working with Neural Dance sim.

- **Created / changed:** #306 sticker bot model (Visual); #307 wall decals; later #465 beam polish, #478 pose stickers.
- **Evolution:** 3D gallery mirrors physical booth concept.

## 2026-10-27

### `nd-0020` — ~11:43 AM PT

- **Chat:** Studio manager (hex walk) → Gallery
- **Source:** RecallMemory journal; Gallery pos 1151
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** Plaque beside Neural Dance explaining what it is, using copy from https://tjm.art/neural-dance/ (title + short body on plaque; longer Why/experience on aim+click). Shot provided.

- **Created / changed:** studio-tracker #761 Neural Dance plaque.
- **Evolution:** Gallery explainer UX for visitors.

### `nd-0021` — ~11:44 AM PT

- **Chat:** Studio manager (hex walk) → Gallery
- **Source:** RecallMemory journal; Gallery pos 1153
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** On desktop, when crosshairs are over Neural Dance show tooltip 'click to add'; click must add a dancer/dot even if another tool is selected (mobile tap already works).

- **Created / changed:** studio-tracker #762.
- **Evolution:** Desktop interaction parity with mobile.

### `nd-0022` — Gallery

- **Chat:** Gallery (e83ae9a7)
- **Source:** SearchTranscripts Gallery pos 2417
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> neaural dance is not playing

- **Created / changed:** Gallery fix pass for Neural Dance auto-play on hex wall (#288c lineage).
- **Evolution:** Live sim must actually animate in gallery.

## 2026-11-04

### `nd-0030` — ~9:35 AM PT

- **Chat:** Studio manager
- **Source:** RecallMemory journal Nov 4; studio-tracker #792 #793 #794
- **Fidelity:** `from_memory_and_tracker`
- **Prompt (reconstructed):** Ordered Neural Dance website work: #792 mic frequency dancers (kick/bass/snare/hi-hat); #793 external video sticker detection (backlog); then #794 redo core in C++/WASM for speed under load. Prefer iPhone→projector install (mic + UV/cam + projection); web/WASM demo is subset. Prefer OSS projection-mapping + audio + vision libs.

- **Created / changed:** #792 In progress bc-8bebea12; #794 C++/WASM; #793 backlog; PR #771 mic+WASM (branch cursor/neural-dance-wasm-mic-75cd) → merge 67c5b24; Maptastic Align projector.
- **Evolution:** Phase 0 JS canvas → C++/WASM core + live mic 4-band dancers (#792+#794).

### `nd-0031` — ~4:17–4:59 PM PT

- **Chat:** Studio manager → Website
- **Source:** RecallMemory; Website Room music feedback
- **Fidelity:** `from_memory_and_SM_relay`
- **Prompt (reconstructed):** Room music Listen-only further down page + live spectrogram; dancers must not keep synth rhythm while Listening. Then: use prototype background; remove simulated audio; move section to very bottom of /neural-dance/. Spectrogram auto-calibrate so typical levels sit mid (AGC).

- **Created / changed:** PR #772 Room music Listen lab (12eb502f LIVE); PR #774 Room music polish (prototype stage, mic-only, AGC).
- **Evolution:** Room music Listen + silence-friendly AGC + Maptastic Align on that stage.

## 2026-11-05

### `nd-0040` — ~9:28 AM PT

- **Chat:** Studio manager → Website
- **Source:** Website transcript pos 3729
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** (1) Restore ability to add dancers (regressed in Listen/WASM/Room music #771/#772/#774). (2) Bring back sliders for gravity, wander, threshold, peak hold. (3) Add per-band beat sensitivity sliders (kick/bass/snare/hi-hat).

- **Created / changed:** PR #779 (bc-ca7e3a81) restore controls + band sensitivities; merge ff0ed40b.
- **Evolution:** Restore interactive authoring after WASM/Room music rewrite.

### `nd-0041` — ~11:17 AM PT start

- **Chat:** Studio manager → Website
- **Source:** Website pos 3739–3743; tracker #795–#798 under #793
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** Camera mode on tjm.art/neural-dance/: iPhone Continuity Camera watches the wall; PINK post-it notes become live markers. Need: (1) camera picker + preview; (2) 4-corner calibration + homography, persist localStorage; (3) pink HSV detection + sensitivity/min-size sliders + debounce; (4) markers feed dancer system; (5) persist calibration.

- **Created / changed:** PR #780 camera mode (bc-060a24ef) merge c68c6d92; cards #795–#798.
- **Evolution:** Optical tracking Phase 0: pink Post-it markers → dancers (#793).

### `nd-0042` — ~11:37–11:43 AM PT

- **Chat:** Studio manager → Website
- **Source:** Website pos 3750; tracker #799 #800 #801
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** #799 replace each dancer's bloom with circular sound-wave ring from live band audio. #800 silence gate: dancers still when room quiet; AGC must not boost silence. #801 also detect dancer-silhouette stickers (dark vinyl) not just pink post-its.

- **Created / changed:** PR #782 rings (bc-5bd08d23); PR #781 silence gate (bc-b7e9864e); PR #783 stickers held (bc-5e582288).
- **Evolution:** Audio visualization + silence gate; sticker detection held pending pink confirmation.

### `nd-0043` — Website chat (after #780 live)

- **Chat:** Website (922c07a5)
- **Source:** ReadTranscript Website around 3780
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> These controls, and I have the camera connected, but it's not apparently using the video, and also there's no simulation of the dancers here. Make a new webpage that's just for this, that doesn't have the Vermilion Aurora headers. And include the, the room. listening simulation in it. I wanna be able to use the camera, use the microphone, put sticky notes on the wall, and have the whole thing work.

- **Created / changed:** Full-screen /neural-dance/live/ (bc-a2756975); PR #784 merge 927db35f — camera+mic+Room music+rings+silence gate.
- **Evolution:** Standalone projector page: full-screen live stage without site chrome.

### `nd-0044` — Website chat

- **Chat:** Website (922c07a5)
- **Source:** Website pos 3794
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Can fold the sound wave design into the full screen page. It doesn't need to be a separate deploy. Also parallelize as much as possible. Include the silence gate in this release as well.

- **Created / changed:** Bundled rings + silence gate into standalone page PR #784 (not separate #781/#782 deploys).
- **Evolution:** One-deploy release discipline from TJ.

### `nd-0045` — ~ after /live/ first ship; iPhone landscape

- **Chat:** Studio manager (relay of TJ) → Website
- **Source:** Website pos 3826
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> This interface is not usable. It gets stuck on the align projector screen and I can't access the controls.

- **Created / changed:** Initially steered toward split-screen + auto Align (#786 start).
- **Evolution:** Usability crisis on iPhone landscape Align UI.

### `nd-0046` — 1:52 PM PT

- **Chat:** Studio manager → Website
- **Source:** Website pos 3829
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> I want it to automatically calibrate using the camera to find the projection on the wall. So you should display the simulation and then find the alignment along with the projected simulation. Put the grid down with the simulated dancers and align that way.

- **Created / changed:** CANCEL split-screen; PR #786 grid-over-dancers Align; merge d0ab4192 LIVE ~3:43 PM PT.
- **Evolution:** Align projector = grid+dancers over full-screen sim; camera finds projection (homography).

### `nd-0047` — ~12:58 PM PT (related) / status pings 3:00, 3:13 PM

- **Chat:** Studio manager / Website
- **Source:** Website / parent
- **Fidelity:** `verbatim_short`
- **Prompt (verbatim):**

> How's it coming? / New eta? / eta?

- **Created / changed:** Status pressure during #786 rewrite.
- **Evolution:** Live testing urgency same afternoon.

### `nd-0050` — afternoon (~ hardware shopping)

- **Chat:** Studio manager
- **Source:** RecallMemory profile Nov 5
- **Fidelity:** `from_memory`
- **Prompt (reconstructed):** Battery-operated projector ~500 lumen (speakers unused OK) → selected XGIMI Vibe One class. Pod-shaped housing from pre-made plastic parts holding iPhone + projector; bottom mount clamp or 1/4-20; weatherproof with sealed optical windows; vents intake/exhaust facing down; fan; easily openable for controls; fit Anker Prime 26,250mAh 300W power bank; does NOT like pet-carrier options.

- **Created / changed:** Hardware shopping path: XGIMI Vibe One + Anker power bank + custom pod housing.
- **Evolution:** Install hardware: portable projector pod for off-grid projection.

### `nd-0051` — ~5:00 PM PT

- **Chat:** Studio manager
- **Source:** RecallMemory journal; studio-tracker #820
- **Fidelity:** `from_memory`
- **Prompt (reconstructed):** Painting the piece for the Neural Dance 'Paradise Dystopia' party; taking process photos and time-lapse for a blog post later.

- **Created / changed:** #820 Paradise Dystopia painting blog; progress photo studio-assets path.
- **Evolution:** Physical painting as projection surface for party.

### `nd-0052` — ~5:12 PM PT

- **Chat:** Studio manager
- **Source:** RecallMemory; #818 #821
- **Fidelity:** `from_memory`
- **Prompt (reconstructed):** Pulled simulating wearable blink-pattern + two-iPhone 3D room tracking to front of backlog for live demo; asked hardware ordering + software build plan + per-clip cost delta for Phase 2 two-way wireless. Phase 1: one-way optical ID wearable pins flashing unique LED blink codes so overhead cameras map dancers and project sprites onto painting. Phase 2: two-way wireless addressable pins.

- **Created / changed:** #818 Phase 1 optical pins; #819 Phase 2 radio; #821 interactive 3D demo pulled front.
- **Evolution:** Wall stickers → wearable blink-coded clips + stereo triangulation.

### `nd-0053` — ~5:22 PM PT

- **Chat:** Studio manager
- **Source:** RecallMemory
- **Fidelity:** `from_memory`
- **Prompt (reconstructed):** Selected Option 2A (2.4 GHz radio on CR2032 coin cells) for wearable LED clips; prepare/cost first batch ~10 clips with suppliers/stock/lead times; iPhone control supported; full firmware/programming architecture before purchasing.

- **Created / changed:** neural-dance-clip-2a hardware pack (KiCad, gerbers, BOM, firmware tests) under /home/box/agent-data/neural-dance-clip-2a/.
- **Evolution:** Phase 2 radio architecture chosen (2A).

### `nd-0054` — ~5:26 PM PT

- **Chat:** Studio manager → Gallery
- **Source:** #822; Gallery SM messages
- **Fidelity:** `from_tracker`
- **Prompt (reconstructed):** Add controllable 3D ceiling moving-head spotlight rig into the sim (Follow Top Movers | Beat Chase | All-Dancer Beams | Off) aimed at triangulated dancer positions + dance energy.

- **Created / changed:** #822 moving-head spotlights folded into #821 demo.
- **Evolution:** Lighting follows tracked dancers in 3D space.

### `nd-0055` — ~5:39 PM PT

- **Chat:** Studio manager
- **Source:** #823
- **Fidelity:** `from_tracker`
- **Prompt (reconstructed):** Generalize Neural Dance energy & wave algorithm to 3D space (volumetric dance floor) rather than only 2D canvas.

- **Created / changed:** #823 3D wave algorithm backlog.
- **Evolution:** 2D mural sim → 3D volumetric neural energy.

### `nd-0056` — ~6:34 PM PT [t668u]

- **Chat:** Gallery (e83ae9a7)
- **Source:** ReadTranscript Gallery around 2562
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> In the annex, I wanna see two separate rooms, and I want data from one to feed the other. I want you to simulate the two camera angles from a sixty degree angle, from ten feet, feet above the dance floor, and simulate the movement of lights, tracked lights around the room with little virtual avatars. Make them simple, kinda shadow people, transparent, semi-transparent. And simulate getting the data from the, the phones, so as if you're capturing the sensor data. I want this to be as high fidelity as possible so that it applies directly to the next phase. And then pipe that data into the other room such that little dancing sprites, like balls of energy, are doing the neural dance in the other room. Get gallery working on that.

- **Created / changed:** Kinoteka Annex two-room capture→energy pipeline on tjm.art/play (deploy 867 candidate); Paradise Dystopia projection; high-fidelity sensor pipe.
- **Evolution:** Kinoteka Annex 3D demo: Room1 stereo iPhone capture → Room2 energy-ball Neural Dance.

### `nd-0060` — evening (Home Screen)

- **Chat:** Studio manager → Website
- **Source:** Website pos 3869
- **Fidelity:** `faithful_paraphrase_via_SM`
- **Prompt (reconstructed):** Approved shipping standalone Home Screen support on tjm.art/neural-dance/ so when saved to iPhone Home Screen (including while mirroring to XGIMI projector), Safari chrome and tjm.art site-header are hidden.

- **Created / changed:** bc-13a6f15f /neural-dance/manifest.webmanifest display:standalone; fast-track behind PR #788.
- **Evolution:** PWA/WebClip for projector mirroring.

### `nd-0061` — ~6:38 PM PT [t2194u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2194u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Not sure that I've got the align function working yet. I want, I want to see a success message when it's using the camera successfully to align to the grid.

- **Created / changed:** Align success banner '✓ Camera aligned to grid! Pink-note tracking active'; projector-washout detection; auto-start camera; auto Markers on.
- **Evolution:** Live-room Align HUD confirmation.

### `nd-0062` — ~6:41 PM PT [t2195u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2195u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Using the front-facing camera rather than the back, it seems, to default to the back-facing camera.

- **Created / changed:** facingMode environment; prefer Back Camera; nd.camera.v2 clears stuck Front Camera localStorage.
- **Evolution:** iPhone Safari must open rear camera for wall tracking.

### `nd-0063` — ~6:xx PM PT [t2196u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2196u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> For diagnostic purposes, I turned on the overhead lights to make it so that the pink square should be very visible, and I also turned down all the sensitivity sliders to the bottom in an effort to make it detected, and still nothing.

- **Created / changed:** Slider UX direction fix (higher = more permissive); screen-median white-balance; nd.markers.v2 defaults; warm-light coral hue ~8.6° vs projector magenta ~294° both snap to ~340° after WB.
- **Evolution:** Lighting-invariant pink detection via screen-median WB.

### `nd-0064` — ~6:47 PM PT [t2197u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2197u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Okay, with the sliders turned all the way the opposite direction, it detects four pink blobs, which isn't quite right either. I suspect it's capturing other things that are already on the screen. It should, needs to be able to tell the difference between things it's projecting, so it doesn't get into a feedback loop, and things that are on the screen.

- **Created / changed:** Anti-feedback: screen-quad WB + UI chrome mask; 300ms stage echo cancellation; feedback-safe palette (cyan/mint/gold) while Markers on; dark pupil under dancers.
- **Evolution:** Optical feedback loop fix — projected graphics ≠ physical notes.

### `nd-0065` — ~6:50+ PM PT [t2198u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2198u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Make a document. It could be a page, but I want it on GitHub also, that's this project history with everything that I've asked for. I want it listed what are the prompts that I used to create which thing and how it developed. Keep an ongoing log of this going forward and re-reconstructed from the, passed up to this point from the repo.

- **Created / changed:** This prompts-timeline dataset + Page + GitHub living doc (parallel workers).
- **Evolution:** Meta: ongoing prompt→feature project history log.

### `nd-0066` — [t2199u]

- **Chat:** Studio manager
- **Source:** Parent conversation [t2199u]
- **Fidelity:** `verbatim`
- **Prompt (verbatim):**

> Parallelize all this work as much as possible. Use other bots if need be.

- **Created / changed:** Parallel reconstruction across transcripts, GitHub, teammates.
- **Evolution:** Process preference: max parallelization.

---

## Cloud agents & PRs

| PR | Agent | What |
|---|---|---|
| #771 | bc-8bebea12 | C++/WASM + mic Listen |
| #772 | follow-up | Room music Listen + Align |
| #774 | bc-fd48bdec | prototype bg + mic-only + AGC |
| #779 | bc-ca7e3a81 | restore dancers + sliders |
| #780 | bc-060a24ef | pink Post-it camera |
| #781 | bc-b7e9864e | silence gate → folded #784 |
| #782 | bc-5bd08d23 | wave rings → folded #784 |
| #783 | bc-5e582288 | silhouette stickers (held) |
| #784 | bc-a2756975 | /neural-dance/live/ |
| #786 | bc-a2756975 | grid-over-dancers Align |
| #790 | bc-a68e330b | pins sim (unmerged; Gallery Annex) |
| (fast) | bc-13a6f15f | Home Screen + Back Camera + Align banner + WB |

## Caveats

- Studio manager private chat was not directly searchable from this executor (agent-id collision). SM-chat prompts reconstructed via SM→teammate quotes, parent `[t2194u]`–`[t2199u]`, memory, tracker.
- Append new TJ Neural Dance prompts going forward; sync GitHub + Library Page.

---

## 7. Repo & tracker reconstruction (commits, PRs, issues, box artifacts)

The section below is the GitHub/API reconstruction (`repo-and-tracker-history.md`), kept intact as the commit/PR/issue source appendix. **Also include newly created tracker issues [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824) and [#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** (not present in the 18:55 PST scrape).

### Embedded: repo-and-tracker-history.md

_Generated 2026-11-05 18:55 PST from read-only GitHub API + local box inventory. Times in America/Los_Angeles._

## Recommended GitHub homes for the living doc

| Repo | Path | Why |
|------|------|-----|
| `timothyjosephmurphy/vermillionaurora` | **`docs/neural-dance-project-history.md`** (primary) | `docs/` already exists; ships with the product site. |
| `timothyjosephmurphy/studio-tracker` | `docs/neural-dance-project-history.md` or root `NEURAL_DANCE_HISTORY.md` | Issue source of truth; currently no `docs/` folder (only README). |
| `timothyjosephmurphy/gallery-source` | optional `play-tags/docs/neural-dance-gallery-integration.md` | Only for gallery wall / sticker-bot / Kinoteka notes. |

## Repos in scope

- **vermillionaurora** — web app: `/neural-dance/`, `/neural-dance/live/`, WASM, `camera-markers.js`, `room-lab.js`, upcoming `/neural-dance/pins/`
- **studio-tracker** — all ND issues/backlog
- **gallery-source** — `play-tags` 3D gallery + `gallery-courtyard/sticker-bot` (no ND-named issues/PRs; work tracked in studio-tracker)
- Other TJ repos listed (`aroundthesound-site`, `relaygate`, …): **no** `neural-dance` / play-tags product code found

## Current vermillionaurora Neural Dance tree

```
tree neural-dance
blob neural-dance/build.sh  (716 B)
blob neural-dance/camera-markers.js  (35713 B)
blob neural-dance/live-show.js  (9048 B)
blob neural-dance/mural-with-silhouettes.jpeg  (73560 B)
blob neural-dance/neural-dance.wasm  (16725 B)
blob neural-dance/room-lab.js  (23211 B)
blob neural-dance/silence-gate.js  (6025 B)
tree neural-dance/src
blob neural-dance/src/neural_dance.cpp  (23903 B)
tree neural-dance/vendor
blob neural-dance/vendor/maptastic.js  (16086 B)
blob neural-dance/wave-ring.js  (4238 B)
blob scripts/render-neural-dance-share.mjs  (6051 B)
tree src/pages/neural-dance
blob src/pages/neural-dance/index.astro  (64405 B)
tree src/pages/neural-dance/live
blob src/pages/neural-dance/live/index.astro  (14427 B)
blob static/brand/neural-dance-share.jpg  (63467 B)
blob tests/fixtures/neural-dance-camera.html  (1940 B)
blob tests/neural-dance-camera.browser-test.mjs  (5146 B)
blob tests/neural-dance-camera.test.mjs  (18671 B)
blob tests/neural-dance-live.browser-test.mjs  (6918 B)
blob tests/neural-dance-live.test.mjs  (6104 B)
blob tests/neural-dance-rings.browser-test.mjs  (11280 B)
blob tests/neural-dance-silence.test.mjs  (6982 B)
blob tests/neural-dance-wasm.test.mjs  (22150 B)
```

## Prompt → feature map (reconstructed)

| When (PT) | Prompt / ask | Delivered | Tracker | PR |
|-----------|--------------|-----------|---------|----|
| 2026-09-14 | Add Neural Dance to site navigation/portfolio | neural-dance/index.html + nav (a21f98fd) | — | — |
| 2026-09-21 | Explain motivation / participatory installation; add mural photo; add mapped mural simulation; protect browser resources | Story copy + mural-with-silhouettes.jpeg + canvas sim + runaway guards | — | PR #2 (dancer roles) later closed unmerged |
| 2026-10-18 | Confirm Neural Dance details for AI blog; frame post around AI and human agency | Blog drafts in /workspace/creative/blog/; #140 closed, #34 still open for confirmation | #34, #140 | — |
| 2026-10-21 | Show real /neural-dance/ on gallery wall; move money printer off ND wall | Gallery redeploy work (closed) | #274 | — |
| 2026-10-22 | Self-contained outdoor sticker booth installation (Cameo vinyl, projector, June 2027, $2k) | design.md booth doc (2026-10-29); issue still OPEN | #283 | — |
| 2026-10-22 14:06 PT | Add sticker-printing bot beside Neural Dance in 3D gallery; stretch: pick up stickers and stick on walls | gallery-source sticker-bot; invent issues #465/#478; #306/#307 still OPEN | #306, #307 | — |
| 2026-10-22 | Courtyard: drop colonnade; murals + live Neural Dance inside | OPEN (gallery courtyard) | #288 | — |
| 2026-10-27 | Plaque beside Neural Dance explaining it; desktop click adds dancer | CLOSED (hex gallery) | #761, #762 | — |
| 2026-11-04 | Mic frequency sensitivity (bass/kick/snare/hi-hat → dancers); rewrite core in C++/WASM | PRs #771, #772, #774, #779 MERGED; issues CLOSED | #792, #794 | #771, #772, #774, #779 |
| 2026-11-04 | External video feed detects new stickers on the wall | Parent epic OPEN; children #795–#798/#801; camera mode shipped via #780/#784/#786 | #793 | #780, #784, #786 |
| 2026-11-05 | iPhone Continuity Camera picker + preview; 4-corner homography; pink post-it HSV + sliders; feed into dancers | PR #780 MERGED (camera-markers.js); live page #784; align #786 | #795, #796, #797, #798 | #780, #784, #786 |
| 2026-11-05 | Circular live-waveform bloom; silence gate so dancers still when quiet | PRs #781/#782 CLOSED (folded into live page work / superseded) | #799, #800 | #781, #782, #784 |
| 2026-11-05 | Detect dancer-silhouette stickers (dark vinyl) after pink post-its | PR #783 OPEN | #801 | #783 |
| 2026-11-05 ~17:00 PT | Paradise Dystopia party painting progress + blog with process photos/time-lapse | progress photo saved; blog issue OPEN | #820 | — |
| 2026-11-05 ~17:12–17:48 PT | Wearable LED blink-code pins (Phase 1) + front-of-backlog interactive demo with 2-iPhone stereo + projected sprites; JLCPCB Option 2A pack | clip-2a hardware/firmware pack on box; pins Three.js app; VA PR #790 OPEN for /neural-dance/pins/ | #818, #821 | #790 |
| 2026-11-05 evening PT | Align success banner; default Back Camera; pink detection under projector + overhead lights; stop optical feedback loop with projected graphics | In flight via Website agent (WB + slider UX + facingMode environment + projection cancellation); not yet a numbered VA PR at scrape time after #788 | #793 family | pending |
| 2026-11-05 ~18:50 PT | Make a living project-history document (Page + GitHub) listing prompts→features; keep ongoing; reconstruct from repo | This living history document; recommended GitHub paths below | — | — |

## Chronological eras

### Neural Dance — ChatGPT / Astra / Codex genesis reconstruction

Reconstructed November 5, 2026 (America/Los_Angeles). Scope: the physical/artistic precursor, the pre-repository prototype, and September 2026 development before Grok Bot. All displayed historical times below are Pacific daylight time (PDT), unless explicitly marked PST. This is a forensic history, not a recovered ChatGPT conversation.

### Evidence, attribution, and important corrections

- **`verbatim`** means a directly quoted surviving text. A verbatim commit message, code comment, PR body, or later creator recollection is **not** a verbatim original ChatGPT prompt.
- **`reconstructed_from_commit_diff`** means the likely development ask inferred from an actual change. The ask is a paraphrase, not TJ's recovered words.
- **`reconstructed_from_initial_code`** means a feature/design layer already present in the first committed prototype. Its prior prompt sequence and timing are unknown; the ordering below explains dependencies, not a proven chat order.
- **`creator_recollection_via_writer`** means TJ's origin story recorded by Writer or a tracker comment. This establishes the general workflow, not which tool authored each line.
- The original September 14 file is **one self-contained 88-line HTML document**, with dense JavaScript lines, inline CSS, HTML5 Canvas, and Web Audio. It was not initially an Astro component, WASM module, camera tracker, or room-microphone analyzer.
- **PR #2 was closed without merging.** Its nine role-exploration commits are a genuine early development branch, but must not be represented as a production release. A populated `merge_commit_sha` on an unmerged PR can be a GitHub test-merge SHA; `merged=false` and `merged_at=null` settle its status.
- Git records the initial author/committer as **`tj`**, and subsequent September neural-dance commits as **`TimothyJosephMurphy`**. It does **not** identify ChatGPT, Astra, or Codex as those commits' author/committer. Codex-named branches elsewhere in the repository support the tooling context, not line-by-line authorship attribution.
- The reported **approximately four-hour prototype** is TJ's later recollection, independently preserved in Writer's draft and tracker #34. It cannot be reconstructed as an exact four-hour Git session: Git first receives the already-developed prototype in a single commit.

### Era 0 — Physical precursor and the pre-repository ChatGPT prototype (by September 14, 2026)

#### 0.1 — The actual mural and sticker participation came first

**Evidence:** Writer's `neural-dance-ai-draft.v2.md`, `.v3.md`, `.v4.md`, `.v5-pre-nov5-refresh.md`, and current draft; the September 24 mural-page diff; studio-tracker #34's recorded creator answers.

TJ painted a **40 × 9 ft shipping-container mural at Friends Club in Lillooet, BC**, developed with Paul and Kara and Hi Ed. The mural-page byline preserved in the September 24 diff says **July 20, 2026**. That is a date on TJ's mural notes, not proof of a precise festival or Neural Dance inception date.

The setting is a mountain valley/river, Ed the Spaceman on a raft, and a nature-spirit woman pointing toward a festival scene. TJ cut a few hundred dancer stickers—fairies, fauns, ravers, belly dancers—and participants selected figures that felt like them and put them across the mural. He expected clustering; their scattered placement became part of the appeal.

The earlier reconstructed prompt log preserves TJ's later description of the image-making workflow: “Stickers, for example, were mid-journey images which made unique dancers that different styles people could pick.” **Fidelity:** `verbatim` within the existing prompt-log transcription, not recovered from September ChatGPT. The resulting physical participation, not an AI image alone, is the artistic precursor.

**Reconstructed design step:** turn participants' chosen positions into a visible network of individual influence. The planned next installation would photograph participants dancing, cut their own silhouettes into stickers, find those stickers with a fixed camera, and light them with a projector. The September software models that future installation; it does not establish that the complete physical tracking rig existed then.

#### 0.2 — Translate an experience on the dance floor into an activation model

**Fidelity:** `creator_recollection_via_writer`.

The specific originating observation was: TJ dances to the beat; people around him respond to his movements; they pass that energy to others. In the later draft: “Neurons that wire together fire together. Each one has an activation curve: it takes in a signal, rises, peaks, falls off, and passes some of it along.”

The surviving prompt log also preserves: **“Kara, Hi-Ed. Originally, I used ChatGPT with Astra, and I've moved to Grokbot.”** Treat this as a later recollection, not an original build prompt. Intermediate Writer drafts explicitly questioned Astra versus Astro; tracker #34 later resolved the wording to **Astra** and the build time to **four hours**. Do not silently replace TJ's named tool with the Astro web framework. The source does not establish exactly what Astra was or how it interfaced with ChatGPT.

Tracker #34 provides particularly useful provenance:

- October 18, **3:47:31 PM PDT**, comment `6256123670`: records TJ's dancing → surrounding people → onward activation explanation and activation-curve metaphor.
- October 22, **4:05:56 PM PDT**, comment `6353277920`: Writer still lists Astra/Astro and duration as open questions.
- October 22, **4:07:26 PM PDT**, comment `6353299549`: “Neural Dance draft updated with TJ's answers (Astra, four-hour prototype, title approved).” This resolves the previous draft's uncertainty; it does not timestamp the original four hours.

Sources: [creator explanation](https://github.com/timothyjosephmurphy/studio-tracker/issues/34#issuecomment-6256123670), [Astra and duration confirmation](https://github.com/timothyjosephmurphy/studio-tracker/issues/34#issuecomment-6353299549).

#### 0.3 — Reconstruct the initial browser sketch from the artifact, not imaginary chat turns

**Primary artifact:** [`neural-dance/index.html` at `a21f98fd`](https://github.com/timothyjosephmurphy/vermillionaurora/blob/a21f98fd4e7dade778ccabb77fb722d84ce3a32f/neural-dance/index.html).

All of the following layers already exist when Git first sees the simulation. They plausibly reflect iterative refinement with ChatGPT, but **the number of prompts, the exact order, the time each feature was added, and the division between manual editing and AI output are not recoverable**. The following are reconstructed development steps, not literal quotations.

##### Step P0 — Make an immediately runnable visual model

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** model dancers as colored points on an interactive stage that can run as one browser page.

The artifact is titled **Neural Dance Mural**, subtitled **Standalone interactive prototype**, and contains a **1000 × 620 Canvas**. It owns its entire simulation in one immediately invoked JavaScript function under `"use strict"`. There are arrays for `nodes` and `pulses`, and a `Map` for learned `links`; no imports, CDN dependencies, package runtime, backend calls, assets, or framework components are needed for this page. `reset()` places **24 dancers** at random positions around an elliptical floor and cycles through four rhythm kinds.

This supports an already-working portable prototype being integrated into the portfolio, rather than a simulation that first emerged from the portfolio's later framework work.

##### Step P1 — Give each dancer a distinct musical rhythm and visual identity

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** some dancers answer the kick, others bass, mids, or treble; make them identifiable and let a visitor choose the kind of dancer to add.

The type table is `kick:{h:10,m:1}`, `bass:{h:292,m:.5}`, `mid:{h:150,m:1.5}`, `treble:{h:215,m:2}`. Hue 10 is red/orange, 292 magenta/purple, 150 green, and 215 blue. Relative to the BPM clock, the four rate multipliers are **1×, ½×, 1½×, and 2×**. Bass is the default new-dancer type. These are synthesized timing categories, **not live FFT frequency detections**.

The original beat test uses a narrow sampled phase window: `(t*f+(n.id%7)*.047)%1 < .035`, with `.2 s` minimum beat spacing. This implementation detail becomes important during the September 21 performance fix.

##### Step P2 — Build the activation / peak / fatigue / recovery curve

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** dancers accumulate stimulation, light up at a threshold, remain at a peak for a while, get tired, and recover rather than firing endlessly.

Each node already has `a`, `last`, `beat`, `ref`, `tired`, `fatigue`, and `peak`. `fire(n,s)` adds stimulation with fatigue-dependent gain `s*(1-.42*fatigue)`, caps activation at **2**, and fires when activation reaches the default threshold **1.4** outside a **.18-second refractory period**. Ordinary activation falls at **1.7 units/sec**; tired activation falls at **3.1/sec**.

Strong activation above **1.76** accumulates peak time; above **1.56** it accumulates at a slower rate. Default peak stamina is **2.8 seconds**. Exhaustion marks a dancer tired, reduces its activation, and extends its refractory interval; fatigue recovers at **.24/sec**, with a return to activity once it drops below **.2**. A visibly muted dancer and an amber fatigue arc communicate resting state.

**Precision:** the initial node activation decay is linear subtraction, not a general exponential activation law. Exponential velocity/link decay already exists, while **exponentially diminishing incoming activation gain** is added later on the unmerged roles branch.

##### Step P3 — Turn shared timing into strengthened connections

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** nearby dancers who fire together should form stronger visible connections and send waves to other dancers.

The neighbor radius is **135 px**. When two nearby, non-tired nodes both fired within **.14 seconds**, their link gains **.015** per update, capped at **2.2**; each such update also has a **4%** chance of launching pulses both ways. Link strength decays by `w * .996^(dt*60)` and is discarded below **.035**. `spread()` selects at most **two** eligible neighbors in randomized order.

This is a stylized co-activation / Hebbian metaphor, not a trained machine-learning neural network. The initial model combines beat stimulation, thresholding, visual links, traveling pulses, and fatigue; it does not yet have the direct bounded activation queue introduced September 21.

##### Step P4 — Lay the dance floor out as sacred / amphitheater geometry

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** make the mural/floor feel like sacred geometry or a communal amphitheater, and have energy follow that geometry rather than only straight lines.

The coordinate system has center **(500,310)** and ellipse scales **1.18 × .72**. `sacred()` draws elliptical rings at radii **105,185,265**, plus diametric spokes at **π/4** angular increments. `topo()` converts endpoints into floor polar coordinates, interpolates angles via the shortest angular difference and smoothstep `z²(3−2z)`, and bends the radius toward a nearby ring. `plen()` approximates that curved path with **25 samples**.

The code evidences concentric amphitheater-like geometry; it does not contain a separate sacred-geometry preset library.

##### Step P5 — Make pulses moving, accelerating, dissipating objects

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** let a dancer launch an energy pulse that travels, slows, hits another dancer, passes some energy onward, and can keep going past an exhausted dancer.

Pulses store source/target IDs, distance along a path, path length, velocity, strength, age, inherited visual characteristics, a trail, and a hit set. Launch velocity is at least **330 px/sec**, with a **245** boost term. Velocity decays exponentially with **DRAG=2**, but does not fall below **52 px/sec**. A pulse collision radius of **18 px** injects `.48*strength` stimulation; fresh activation may spread onward with **52%** probability, reduced to **.62×** strength. Each collision also attenuates strength by **.9** and speed by **.94**.

A pulse can become a short free-moving segment after meeting a tired endpoint. Edge/wander pulses expire after reaching their path end, or age out after **2.1 seconds**. This is already a multi-mode pulse engine, not merely static blinking circles.

##### Step P6 — Add wandering, gravity, and organic wobble

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** avoid mechanically rigid connections; let some energy wander toward another dancer, curve under local influence, and wobble as it moves.

`maybeWander()` probabilistically redirects an edge pulse, at default rate **.25 × dt**, toward a dancer within **190 px**, using a quadratic Bézier curve with a random sideways bend. `applyGravity()` attracts a pulse toward nearby unhit dancers within **155 px** with force `GRAVITY*150*(1-d/155)²`, default gravity **2.5**; gravity velocity damps with `exp(-2.4*dt)`, caps at **95**, and the displacement caps at **85 px**.

`pos()` adds a normal-to-path sinusoidal wobble plus irregular nested sine modulation. Frequency and amplitude change with speed, and phase/frequency/amplitude/noise can be inherited by descendant pulses. This visual wobble **is not an audio waveform sampled from a microphone** and should not be confused with the November waveform-ring feature.

##### Step P7 — Make the energy legible as bloom, halos, and rainbow tracers

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** make activation and traveling energy look luminous: expanding dancer halos, bright pulse heads, and colored fading trails.

`pulseBloom()` builds a speed/strength-dependent radial gradient; `haloBloom()` responds nonlinearly to node activity (`q^1.35`). Both use additive `lighter` compositing. Pulse heads have bright cores, rings, and blurred glow; the **28-point trail** shifts hue by up to **125 degrees** behind the head, changes width with recency, and uses a per-segment shadow blur. Dancer halos expand as activation rises. Independent **Pulse bloom** and **Halo bloom** controls already exist.

This heavy per-frame visual treatment also helps explain the resource hardening a week later. It proves features were present by September 14, not their exact order of introduction in ChatGPT.

##### Step P8 — Add self-generated sound to audition the network

**Fidelity:** `reconstructed_from_initial_code`.

**Reconstructed ask:** hear the network's different rhythms without supplying an audio track or microphone.

A user gesture starts/resumes an `AudioContext` and master gain (default **.48**). The envelopes attack exponentially in **6 ms**. The four synthesized voices are:

- **Kick:** oscillator sweeps **145 → 45 Hz** in `.16 s`, envelope peak `.48`, duration about `.23 s`.
- **Bass:** **55 Hz sawtooth** through a **225 Hz lowpass**, peak `.14`, about `.28 s`.
- **Mid:** freshly generated, decaying **.1-second noise** buffer through a **1150 Hz bandpass**, peak `.07`.
- **Treble:** **1750 Hz triangle**, peak `.045`, about `.07 s`.

This is an audio-generating simulation, not one listening to room music. The original version allocates noise buffers and audio nodes during triggering and lacks the later shared voice budget and explicit disconnect cleanup.

##### Step P9 — Expose the experiment as a control panel

**Fidelity:** `reconstructed_from_initial_code`.

The exact first-commit control surface is:

| Control | Range / initial value |
|---|---|
| Start audio / Mute audio | Audio initially off |
| Volume | 0–1, step .01; **.48 / 48%** |
| Type | Kick / **Bass** / Mid / Treble |
| BPM | **70–180**, initially **120** |
| Gravity | 0–6, step .1; **2.5×** |
| Wander | 0–.8, step .05; **.25** |
| Pulse bloom | 0–3, step .1; **1.4×** |
| Halo bloom | 0–3, step .1; **1.5×** |
| Threshold | 1–1.9, step .05; **1.4** |
| Peak hold | 1–6 seconds, step .1; **2.8 s** |
| Wobble | 0–2.5, step .1; **1×** |
| Buttons | Seed pulse, Pause, Reset, Fullscreen |
| Stage interaction | Click adds a dancer; Shift-click removes nearest within 60 px |

**Reconstructed ask:** let TJ tune the network live, seed a wave, try sparse or dense arrangements, and show it full-screen. The code has randomized reset placement, not named saved presets; there is no preset dropdown, no persistence, and no recovered prompt embedded in a comment. The initial JavaScript is densely compacted and contains no substantive narrative build comments. We should not invent ChatGPT instructions from formatting alone.

#### 0.4 — What this proves about the four-hour creation process

By September 14 the finished browser artifact already embodied **different rhythms → activation thresholds → shared firing → connection strengthening → moving energy → fatigue and recovery → organic path physics → luminous rendering → synthesized audio → adjustable UI**. That is the defensible reconstruction of the work TJ accomplished with the earlier tools. The creative cause is documented in his later recollection, while the feature inventory is directly visible in code.

It does **not** prove separate literal prompts for each layer, a precise date for starting the session, or an earlier standalone GitHub repository. “Working prototype in about four hours” should remain a creator-reported duration, not an inference from Git timestamps.

### Era 1 — Portfolio integration and rapid September development

#### 1.1 — September 14: establish the website, then import the developed prototype

| Date and time (PDT) | Commit / event | Finding |
|---|---|---|
| Sep 14, **2:51:28 PM** | `1ccb4615` — Initial portfolio site | Initial tree has no `neural-dance` file. Author and committer: `tj`; unsigned. |
| Sep 14, **2:56:29 PM** | GitHub repository created | Local initial commit predates remote repository creation by a few minutes; normal Git workflow. |
| Sep 14, **3:23:36 PM** | `d656b332` — Remove Wrangler config, use pure Cloudflare Pages | Hosting adjustment; still no Neural Dance file. Author/committer `tj`; unsigned. |
| Sep 14, **3:28:03 PM** | [`a21f98fd`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a21f98fd4e7dade778ccabb77fb722d84ce3a32f) — Add neural-dance page to navigation and portfolio | Adds the entire **88-line** self-contained page and one homepage navigation link. Author/committer `tj`; unsigned. |

**Reconstructed ask (`reconstructed_from_commit_diff`):** add the already-working Neural Dance HTML prototype to the portfolio at `/neural-dance/` and make it discoverable in the navigation.

This is the earliest recoverable repository landing, not proof that the idea or simulation began at 3:28 PM. There is no gradual evolution from an empty neural-dance file in the preceding commits: the physics, effects, sound, and control panel arrive together. The first page autostarts visual animation (`paused=false`) and continues `requestAnimationFrame` drawing even when its update is paused. Audio remains opt-in.

#### 1.2 — September 21: seven commits in 57 minutes and 19 seconds

All seven commits below have matching author and committer names **TimothyJosephMurphy**, identical author/commit timestamps for each commit, and **unsigned** verification status. These identities identify the Git attribution, not a particular assistant. Each changes `neural-dance/index.html`; the photograph commit also adds the image asset. The inferred asks are `reconstructed_from_commit_diff` throughout.

##### 12:32:36 PM PDT — Explain why the work exists (`8305ac1f`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/8305ac1ffa183720744d45157ca70c0efcb7ba76) — **45 additions, 2 deletions**.

**Reconstructed ask:** explain the human-agency motivation, the participatory installation, and what visitors can actually do in the current prototype.

The page gains an SEO description and an extended project story headed **“Showing up and moving, together.”** Its “Why make it?” text explicitly asks what human agency means as AI and automation take over labor and decisions. It describes silhouette photos/stickers, a sacred-geometry stage/amphitheater mural, fixed-camera localization, projector illumination, four musical personalities, nearby reinforcement, and traveling waves. The prototype instructions distinguish the colored-dot, self-synthesizing sketch from the future photo booth/camera/projector installation.

**Evolution:** software experiment becomes a legible artwork proposal, with human choice and position creating the collective work—not a generic AI demo.

##### 12:33:42 PM PDT — Show the physical reference (`528b02a0`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/528b02a0fbf9eafc161aabf6b3acbf5076562b6b) — **9 HTML additions plus image asset**; **1 minute 6 seconds** after the story commit.

**Reconstructed ask:** add the mural photograph with the participant silhouette stickers so people can see the physical setting.

Adds `neural-dance/mural-with-silhouettes.jpeg` and a linked figure declaring **882 × 196** dimensions, with alt text describing a panoramic corrugated-metal mural, dancers, sunset, and flowing figures. Its caption: **“The mural with participant silhouettes—the physical setting for Neural Dance.”** This is initially a static photo in the story, not camera recognition.

##### 12:46:11 PM PDT — Keep the browser responsive (`95624dbb`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/95624dbba2fdf156b6585030b7a11d6170f85b81) — **120 additions, 17 deletions**; **12 minutes 29 seconds** after the photograph.

**Reconstructed ask:** stop the simulation from consuming runaway browser resources, make starting explicit, and give visitors a reliable escape/stop path.

The evidence identifies the risk mechanisms, without proving a specific machine crashed:

- Original unlimited add-dancer interaction plus all-pairs link work; a high pulse ceiling (the original guard permits growth until the count is over 140), 28-point trails, per-trail shadow blur and per-pulse/per-node gradients.
- Autonomous animation was scheduled continuously, including draws while paused; no offscreen/tab visibility stop or session limit.
- Unbudgeted sound triggers, repeatedly allocated noise buffers, and missing explicit voice disconnection.

The patch introduces **48 dancers, 48 pulses (24 in low-power mode), 96 learned links, 10 trail points, 8 audio voices**, **24 sounds/sec** and **80 ms/channel** audio throttles. Glow textures are cached in **96 × 96** canvases instead of rebuilt every frame; per-trail/head blur is removed. The page starts paused, requires **Start simulation**, exposes a full-screen emergency stop, pauses on Escape/page hide/offscreen/tab switch, stops after **five minutes**, and supports still rendering without a running loop.

The scheduler aims at **30 FPS**, dropping to **15 FPS** with fewer effects after sustained slow frames; extreme cost or repeated slow frames halts the run. Audio uses a reusable noise buffer, tracked voices, `onended` cleanup, source disconnect, and `AudioContext.suspend()` on stop.

**Evolution:** an exuberant prototype is made safe enough to embed in a portfolio.

##### 12:54:55 PM PDT — Restore rhythmic life without restoring the runaway loop (`a0c5db16`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a0c5db16a9afe738ac654856766166cb68dfaed9) — **33 additions, 4 deletions**; **8 minutes 44 seconds** after resource hardening.

**Reconstructed ask:** the bounded version must still visibly dance; restore reliable rhythms and let close dancers directly reinforce one another, but keep the safety budgets.

The narrow original **phase < .035** beat sampling remains in the resource-protection commit even though it lowers rendering to 30 or 15 FPS. For treble at 120 BPM, the cycle is .25 seconds and that window is only **8.75 ms**—shorter than either nominal frame interval. Missing beats therefore becomes plausible under the new scheduler. This is a **code-supported explanation**, not a recovered verbatim complaint or measured runtime trace.

The fix integrates each node's phase by `dt*bpm/60*rate` and detects crossing **1** instead of hoping to sample a tiny time window. Beat events now directly cue visible activation (`max(.95,a+.25)`, capped at 2) and emission. A source comment states, verbatim: **“Integrate phase instead of sampling a narrow beat window: works at 15 or 30 FPS.”**

A separate activation queue and per-step emitted-node set provide bounded propagation. Another comment states: **“At most one emission per dancer per step, with bounded incoming reinforcement.”** For each queued source, neighbors within 135 px receive `.2+.25*(1-distance/R)`, with a **.65 incoming budget per neighbor per simulation step**. The queue is capped by the node budget, cleared each step, and fed by threshold crossings. Sound/visual emission and direct stimulation are now explicit rather than relying only on the chance of a rendered pulse colliding.

**Evolution:** recover the original creative requirement—rhythms spreading through a crowd—without making browser workload unbounded.

##### 1:12:02 PM PDT — Map the simulation onto the mural photograph (`a5c814ce`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a5c814ce5dc41026d265d2856dfd563d54ce5cdc) — **129 additions**; **17 minutes 7 seconds** after the rhythm fix.

**Reconstructed ask:** add another simulation at the bottom that places the activity directly on the actual silhouette stickers in the mural photo.

Adds **Dance across the mural** (`#nd-mural-mapped`) as a **second, independent inline simulation**, not a replacement for the original. Its logical world is **882 × 196 photo pixels**, rendered into a **1764 × 640 canvas** with scale/offset transforms (vertical letterboxing at default zoom). It draws the hidden image `mural-with-silhouettes.jpeg` as the background, then places nodes at **28 hard-coded source-photo coordinates**.

The critical code comments are verbatim: **“Manually traced sticker centers, in source-photo pixels (882 x 196).”** and **“Blurred centers remain approximate; drag markers for individual corrections.”** The mapping is **manual tracing**, not computer vision, real-time tracking, homography, or automatic silhouette segmentation.

Visitors can **drag individual markers**, click to add, Shift-click to remove, reset placement, choose Kick/Bass/Mid/Treble, adjust **70–180 BPM**, zoom **1–3×**, and pan via **View center**. Markers have distinct circle/diamond/square/triangle shapes as well as four colors. The mapped neighbor radius is **82 photo px**; it reuses the bounded queue model, `.65` incoming budget, **48 dancers / 48 pulses / 8 voices / 24 tones per second**, five-minute stop, offscreen pausing, and 30/15 FPS performance guard. It uses simpler bowed paths, short 10-point trails, cached **64 × 64** glows, and a lightweight four-tone synth.

The original sacred-geometry stage remains available separately. The photo stage is not proof that all the original gravity/wander/wobble controls were ported into the mapped simulation.

**Evolution:** an abstract proof of behavior becomes a concrete preview of projected light across the already participatory mural.

##### 1:26:35 PM PDT — Lead with the project and the actual mural (`b7f172c1`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b7f172c15ed8fa3265d24303dc76cee89fdbcf30) — **41 additions, 30 deletions**; **14 minutes 33 seconds** after mapping.

**Reconstructed ask:** do not make visitors start at the technical dot prototype; lead with the project explanation and the mural simulation, keeping the original below.

Moves the original controls/stage into a later **Explore the original prototype** section (`#original-simulation`). Project introduction/story now leads; the mapped mural stage follows it; the original stage remains below. The static photograph still exists at this intermediate point, repositioned within the story.

**Evolution:** public-facing presentation starts to prioritize the artwork over its tuning panel.

##### 1:29:55 PM PDT — Put the mapped experience before long explanation (`e7fd7670`)

[Commit](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e7fd7670be2b245485243c1324fe473a2f732a49) — **17 additions, 26 deletions**; **3 minutes 20 seconds** after the previous layout change.

**Reconstructed ask:** keep a concise introduction, put the mural simulation immediately next, move the detailed project text below it, and remove the redundant standalone photo.

The final order is **title + short project introduction/credit → mapped mural simulation → Why make it? / intended experience → original prototype**. The standalone linked figure and its CSS are removed, but the same photo remains the mapped simulation's background.

**Evolution:** visitors first experience the living mural rather than scrolling through the proposal or seeing the same image twice. These are two layout revisions within **3 minutes 20 seconds**, not two more physics rebuilds.

#### 1.3 — September 23–24: tie the simulation explicitly to Friends Club

On September 23, **11:39:07 AM PDT**, `aaf3fb1f` adds the Murals page with Friends Club's story and swipe gallery. This is contextual site development, not a new simulation engine.

On September 24, **1:56:22 PM PDT**, [`64ccc62d`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/64ccc62de942828b5242209663c002890c79f976), **TimothyJosephMurphy** as author/committer, unsigned, changes the homepage and mural page (**26 additions/25 deletions on index.html; 1 addition on murals/index.html**).

**Reconstructed ask (`reconstructed_from_commit_diff`):** organize the homepage around the artwork sections, remove Neural Dance as its own main-navigation item, and make the interactive mural demo discoverable from the Friends Club project.

The Friends Club section gains the exact link text **“Explore Neural Dance — the interactive mural projection demo →”**. Homepage navigation/order is reorganized around Gallery, Exhibitions, Murals, Books, Commissions, Film, About, Contact. This is a **contextual connection to the existing festival mural**, not a new unrelated project or a deletion of `/neural-dance/`.

#### 1.4 — September 27: a second rapid session explores dancer personalities (PR #2)

[PR #2: Add dancer roles to Neural Dance](https://github.com/timothyjosephmurphy/vermillionaurora/pull/2), branch **`neural-dance-dancer-roles`**, base **`main`**, opened by **timothyjosephmurphy** at **4:34:51 PM PDT**. Nine commits run from **4:34:39 PM to 5:06:22 PM PDT**: **31 minutes 43 seconds** of observable iteration.

This is **not a `codex/` branch name**. Every commit's author and committer is TimothyJosephMurphy, and each is unsigned. The code is consistent with the earlier AI-assisted workflow described by TJ; the Git identity alone does not prove Codex produced any specific patch.

All nine commits change the same legacy page, implementing behavior in **both the mapped and original simulations**. The following asks are all **`reconstructed_from_commit_diff`**, not recovered September messages.

| Time (Sep 27, PDT) | Commit | Reconstructed development ask and actual change |
|---|---|---|
| **4:34:39 PM** | `cf76479f` | Add **Zoners, Leaders, Followers** with a role selector independent of musical channel, visible Z/L/F labels, role gains **1.55 / 1.2 / .5**, and a mixed initial crowd. Zoners answer all four rhythms and reject neighbor activation; leaders amplify nearby influence and select one or two favorites, initially rotated every **16 beats / four measures**; followers exert gentler influence. |
| **4:42:38 PM** | `7bcc87ee` | Replace fixed four-measure favorite changes with changes **after leader fatigue recovery**. Give leaders longer stamina and followers shorter stamina. In the mapped stage, peak limits become **5.6 s leader / 1.8 s follower**, resting **2.2 / 1.4 s**. In the original stage, limits are **2× / .65×** the Peak hold slider. Zoners are intended never to tire. |
| **4:45:41 PM** | `4db0c75a` | Explicitly enforce zoner immunity to fatigue and incoming activation; exclude zoners from leader favorites and connections. Apply restrictions to propagation, visual paths, and collisions rather than relying only on a UI description. |
| **4:50:01 PM** | `576ec7fe` | Try a different zoner personality: hear all rhythms but emit **irregular broadcasts every .8–2.2 seconds to every nearby dancer**, rather than only music-triggered emissions. Extend zoner targeting exceptions while keeping pulse budgets. This experiment is superseded almost immediately. |
| **4:52:48 PM** | `cec264d3` | Restore **music-timed zoner activation**, but send each emission to **one randomly chosen nearby dancer** instead of broadcasting to every neighbor. Remove the irregular broadcast timer; direct reinforcement follows that chosen target. |
| **4:55:30 PM** | `45430e66` | Make activation accumulate with **exponentially diminishing gain**, `a = min(2, a + amount*exp(-a/1.35))`, and allow highly activated leaders to emit visual connections to **up to five** neighbors while retaining one/two favorites. This is where that particular nonlinear activation law enters the recovered history. |
| **5:01:34 PM** | `d8de87e7` | Refine the one-target zoner rule: choose a **nearby target of any role**, including resting/other zoner targets for the visual connection, but do not force resting/zoner recipients into ordinary neighbor activation. Tag zoner pulses so gravity, wandering, incidental collisions, and free continuation cannot turn one intended target into multiple accidental targets. |
| **5:03:18 PM** | `d055d2e7` | Remove the nearby restriction: zoners may pick **any other dancer anywhere on the floor**. Make their stimulation distance-independent; shorten/cap mapped pulse duration and increase original pulse launch speed in proportion to path length so distant recipients can be reached within lifetime limits. Normal leaders/followers remain local. |
| **5:06:22 PM** | `cd812d66` | Replace **only an individual tired/missing favorite** while keeping healthy favorites; exclude resting/zoner choices; continue to refresh the leader's favorites after its own recovery. Add per-update `refreshFavorites()` to both simulations. |

The final PR body describes the resulting concept: zoners respond to every channel, never tire, and send music-triggered pulses to one random dancer across the floor; leaders favor one/two eligible local leaders/followers, can fan out to five when strongly activated, and replace tired favorites; followers influence gently and tire quickly. Existing runtime and pulse ceilings remain.

**Validation in the PR body:** inline scripts parse, diff checks pass, and focused checks preserve a healthy favorite while replacing a tired one. **Browser visual QA remained pending.** This is a report in the original PR, not a claim that the reconstruction reran those checks.

**Outcome, not to be lost:** the Cloudflare bot reports the role-branch deployment **failed**, with latest commit `cd812d66`, displayed at **5:06 PM PDT** on September 27. The PR has **no reviews and no inline review comments**. Its only conversation entries are the deployment bot and the owner's closure message, **“Closing as superseded by current site work; reopen if needed.”** It was closed on **October 7, 12:22:11 AM PDT**, **unmerged**. The branch still exists at `cd812d664e7fdfb1b3362655e90a0e519ccd0c8e`.

**Evolution:** this was an early experiment in social personalities and asymmetric influence, preserved as a branch, not evidence those roles were included in the subsequently shipped production simulation.

#### 1.5 — September 25–30 ancillary changes are not new neural-engine milestones

The complete September path history contains **11 mainline commits** touching `neural-dance/`: the initial import, seven September 21 changes, and three later site-wide updates. The role branch contributes **nine more branch-only commits**, not eleven-plus-nine mainline releases.

- **Sep 25, 11:37:04 AM PDT — `322b6b8f`:** unify site navigation / painting availability; neural-dance changes are surrounding page chrome, not a rebuilt simulation.
- **Sep 28, 1:50:26 PM PDT — `04f7be7c`:** header branding and homepage painting price ordering; touches the Neural Dance header, not core behavior.
- **Sep 30, 4:42:19 PM PDT — `0e248387`:** exhibition world map / dates / supplied logo; updates Neural Dance branding. This commit is GitHub-verified, unlike the unsigned core genesis commits.

PR #1 touches the Neural Dance header's **Book a commission** destination, not the simulation. PR #19 touches its shared branding. PR #10 introduces **Astro for product templates/catalog** and changes **146 files**, but does not touch the neural-dance page in its changed-file list. The later Neural Dance-specific Astro migration belongs in the subsequent era, not the pre-repo ChatGPT genesis.

### Search coverage and remaining limits

#### Repository, organization, fork, gist, and branch inventory

The built-in GitHub inventory and `gh repo list timothyjosephmurphy --limit 100 --json name,description,createdAt,pushedAt,isPrivate,url` agree on **eight owned repositories**:

| Repository | Created (Pacific local date) | Relevance to an earlier prototype |
|---|---|---|
| `taro` | Oct 15, 2022 PDT | Taro daemon-related repository; no Neural Dance candidate in inspected default-branch tree. |
| `LN_BasedArtFoundry` | Dec 21, 2023 PST | Art/Bitcoin certificate tooling; no Neural Dance candidate in inspected default-branch tree. |
| `PaeanOfSatoshi` | Mar 25, 2024 PDT | Music project; no Neural Dance candidate in inspected default-branch tree. |
| `vermillionaurora` | Sep 14, 2026 PDT | Earliest recovered simulation, committed Sep 14. |
| `studio-tracker` | Oct 18, 2026 PDT | Later task/creator-answer evidence; not an earlier prototype repository. |
| `relaygate` | Oct 18, 2026 PDT | Later Nostr/gallery work. |
| `gallery-source` | Oct 23, 2026 PDT | Later private 3D gallery handoff. |
| `aroundthesound-site` | Oct 24, 2026 PDT | Unrelated guitar studio website. |

No owned standalone `neural-dance`, `friends-club`, `mural`, or `art` repository was returned. None of the eight is marked as a GitHub fork. `gh api user/orgs` returns **no organization memberships**; `gh gist list --limit 50` returns **no gists**. This is an inventory of what the connected account can access now, not proof that deleted/unshared repositories or private local files never existed.

All **622 currently listed vermillionaurora branches** were inventoried across seven pages. Neural Dance-specific candidates include the preserved early **`neural-dance-dancer-roles`**, later **`port-neural-dance`**, and November `cursor/neural-dance-*` / sticker-camera branches. No additional early Neural Dance `codex/...` branch was found in this current inventory. Historical deleted branch names can only be recovered where commits/PRs preserve them.

Cross-repository code-search calls for `neural` and `mural-with-silhouettes` returned no indexed hits—even though the known site contains the work—so **code-search absence was not treated as evidence of absence**. Repository inventory, dated file history, PRs, and older-repository trees are the stronger evidence.

#### Commit and PR coverage

- Read the complete **367-entry mainline commit listing through September 30, 2026 PDT**, including the root and the pre-import hosting change. This is a whole-site inventory, not 367 Neural Dance commits.
- Fetched all **11 September mainline commits touching `neural-dance/`**, with their full available file patches, plus all **nine PR #2 branch commits** and the first two repository commits. The original 88-line source was fetched separately to avoid relying on patch truncation.
- Audited **PRs #1–#25**: metadata, bodies, head branches, changed-file patches, commit lists, conversation comments, reviews, and review threads. Inner pagination is complete for the batched conversations/commits; every one of these 25 PRs has **zero submitted reviews and zero review threads**. PR #10's files required a second page (100 + 46).
- The earliest visible `codex/...` PR heads among #1–#25 are **#20–#25**, beginning with `codex/all-priced-paintings-checkout-20261001`. They concern commerce/checkout, not Neural Dance genesis. Some were created during September 30 Pacific evening although their branch names carry October 1; timezone conversion matters.
- Read all six local Neural Dance blog-draft versions, the existing prompt log, and all #34 tracker comments. A wider local text-file search of `/workspace/creative/` and `/home/box/agent-data/` identified drafts and later artifact references, but no original ChatGPT export or pre-September-14 source revision was recovered.

**Limits:** the reconstruction does not recover deleted repositories/branches, inaccessible organizations, original ChatGPT/Astra session transcripts, exact original prompts, pre-commit intermediate HTML versions, or a verified assistant authorship for individual September commits. It does not assert a runtime crash from a commit title or treat a failed/unmerged preview as a deployed feature. Earlier stages are supported by creator recollection and the first artifact; later changes are individually traceable to patches.

### Maintainer handoff

The early history should read: **Friends Club physical mural and Midjourney-derived participant stickers → TJ's dance-floor activation metaphor → roughly four-hour ChatGPT-with-Astra browser prototype → September 14 portfolio import → September 21 story/photo/resource-safety/rhythm-fix/photo-mapping/layout session → September 24 Friends Club contextual link → September 27 nine-step personality exploration on an unmerged branch → later Astro/gallery/Grok Bot eras**.

Keep every inferred ask labeled. In particular, do not rewrite P0–P9 as ten recovered user messages, claim the entire artifact was authored after the September 14 commit time, attribute all TimothyJosephMurphy commits to Codex, conflate early pulse wobble with later live waveform rings, or claim PR #2 shipped.

#### Appendices generated from the retrieved metadata

##### A. Complete recovered September Neural Dance commit / signature ledger

| Pacific author time | Commit | Author / committer | Signature | File delta |
|---|---|---|---|---|
| 2026-09-14 02:51:28 PM PDT | [`1ccb4615`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/1ccb4615faa9bdbe831cd41ee397c086cae4b21c) | tj / tj | unsigned | Pre-import root/hosting commit; no neural-dance file |
| 2026-09-14 03:23:36 PM PDT | [`d656b332`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/d656b332308ad797fdf41c021c998735242a47b8) | tj / tj | unsigned | Pre-import root/hosting commit; no neural-dance file |
| 2026-09-14 03:28:03 PM PDT | [`a21f98fd`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a21f98fd4e7dade778ccabb77fb722d84ce3a32f) | tj / tj | unsigned | neural-dance/index.html +88 / −0 |
| 2026-09-21 12:32:36 PM PDT | [`8305ac1f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/8305ac1ffa183720744d45157ca70c0efcb7ba76) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +45 / −2 |
| 2026-09-21 12:33:42 PM PDT | [`528b02a0`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/528b02a0fbf9eafc161aabf6b3acbf5076562b6b) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +9 / −0; neural-dance/mural-with-silhouettes.jpeg +0 / −0 |
| 2026-09-21 12:46:11 PM PDT | [`95624dbb`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/95624dbba2fdf156b6585030b7a11d6170f85b81) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +120 / −17 |
| 2026-09-21 12:54:55 PM PDT | [`a0c5db16`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a0c5db16a9afe738ac654856766166cb68dfaed9) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +33 / −4 |
| 2026-09-21 01:12:02 PM PDT | [`a5c814ce`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a5c814ce5dc41026d265d2856dfd563d54ce5cdc) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +129 / −0 |
| 2026-09-21 01:26:35 PM PDT | [`b7f172c1`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b7f172c15ed8fa3265d24303dc76cee89fdbcf30) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +41 / −30 |
| 2026-09-21 01:29:55 PM PDT | [`e7fd7670`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e7fd7670be2b245485243c1324fe473a2f732a49) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +17 / −26 |
| 2026-09-24 01:56:22 PM PDT | [`64ccc62d`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/64ccc62de942828b5242209663c002890c79f976) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | index.html +26 / −25; murals/index.html +1 / −0 (Friends Club link; no `neural-dance/` file) |
| 2026-09-25 11:37:04 AM PDT | [`322b6b8f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/322b6b8fff9a7cee621a88eaec060e1bc76c4ec1) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +27 / −0 |
| 2026-09-27 04:34:39 PM PDT | [`cf76479f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/cf76479f2106a73c8f1a9680cdd6918d98beba8b) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +43 / −32 |
| 2026-09-27 04:42:38 PM PDT | [`7bcc87ee`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/7bcc87eea691b53bf2646583867d7ded240ef981) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +14 / −9 |
| 2026-09-27 04:45:41 PM PDT | [`4db0c75a`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/4db0c75acf99a467860ae35d74e4e08e098832e6) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +19 / −19 |
| 2026-09-27 04:50:01 PM PDT | [`576ec7fe`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/576ec7fe31ee67ef983463e8acbabe085e470fcd) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +15 / −13 |
| 2026-09-27 04:52:48 PM PDT | [`cec264d3`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/cec264d3b22083237dab57da160f2bc8b521ef17) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +11 / −12 |
| 2026-09-27 04:55:30 PM PDT | [`45430e66`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/45430e6602477d6eb066ed1366aa4b2c553bd07d) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +9 / −7 |
| 2026-09-27 05:01:34 PM PDT | [`d8de87e7`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/d8de87e7e0220b48e5865bce00e49c7314600cc5) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +7 / −7 |
| 2026-09-27 05:03:18 PM PDT | [`d055d2e7`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/d055d2e76dd75cb01acdb3a1b9ca46619d36aad7) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +8 / −8 |
| 2026-09-27 05:06:22 PM PDT | [`cd812d66`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/cd812d664e7fdfb1b3362655e90a0e519ccd0c8e) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +17 / −4 |
| 2026-09-28 01:50:26 PM PDT | [`04f7be7c`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/04f7be7c894cea6091ed80225f3c2728bcd4c9a0) | TimothyJosephMurphy / TimothyJosephMurphy | unsigned | neural-dance/index.html +2 / −2 |
| 2026-09-30 04:42:19 PM PDT | [`0e248387`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/0e24838722f149f1e124229df786f9dee161c156) | TimothyJosephMurphy / GitHub | valid | neural-dance/index.html +1 / −1 |

Author and committer timestamps match for the core import, September 21 session, September 24 tie-in, and all nine role commits. Ledger includes sitewide changes because they touch the path, not because they introduced simulation behavior.

##### B. PR #1–#25 provenance audit

| PR | Head branch | Commit count | Conversation comments | Reviews / threads | Neural Dance relevance |
|---|---|---|---|---|---|
| [#1](https://github.com/timothyjosephmurphy/vermillionaurora/pull/1) | `commissions-request-form` | 1 | 2 | 0 / 0 | Header commission-link destination only; closed unmerged |
| [#2](https://github.com/timothyjosephmurphy/vermillionaurora/pull/2) | `neural-dance-dancer-roles` | 9 | 2 | 0 / 0 | Nine-commit personality exploration; closed unmerged |
| [#3](https://github.com/timothyjosephmurphy/vermillionaurora/pull/3) | `shared-paypal-checkout` | 38 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#4](https://github.com/timothyjosephmurphy/vermillionaurora/pull/4) | `shippo-label-email` | 9 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#5](https://github.com/timothyjosephmurphy/vermillionaurora/pull/5) | `featured-chase-toole` | 1 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#6](https://github.com/timothyjosephmurphy/vermillionaurora/pull/6) | `live-checkout-pilot` | 3 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#7](https://github.com/timothyjosephmurphy/vermillionaurora/pull/7) | `move-film-below-about` | 2 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#8](https://github.com/timothyjosephmurphy/vermillionaurora/pull/8) | `sales-ledger` | 1 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#9](https://github.com/timothyjosephmurphy/vermillionaurora/pull/9) | `bitcoin-checkout` | 2 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#10](https://github.com/timothyjosephmurphy/vermillionaurora/pull/10) | `catalog-templates` | 2 | 1 | 0 / 0 | Astro product/catalog migration; no neural-dance file in 146 changed files |
| [#11](https://github.com/timothyjosephmurphy/vermillionaurora/pull/11) | `catalog-release-verification` | 1 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#12](https://github.com/timothyjosephmurphy/vermillionaurora/pull/12) | `catalog-collection-check` | 1 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#13](https://github.com/timothyjosephmurphy/vermillionaurora/pull/13) | `painting-image-viewer` | 1 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#14](https://github.com/timothyjosephmurphy/vermillionaurora/pull/14) | `feature/originals-shopping-cart` | 3 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#15](https://github.com/timothyjosephmurphy/vermillionaurora/pull/15) | `finerworks-matting` | 1 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#16](https://github.com/timothyjosephmurphy/vermillionaurora/pull/16) | `product-page-purchase-dialog` | 2 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#17](https://github.com/timothyjosephmurphy/vermillionaurora/pull/17) | `berlin-mural-and-purchase-buttons` | 4 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#18](https://github.com/timothyjosephmurphy/vermillionaurora/pull/18) | `bitcoin-film-festival-warsaw` | 1 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#19](https://github.com/timothyjosephmurphy/vermillionaurora/pull/19) | `exhibition-world-map` | 3 | 1 | 0 / 0 | Sitewide header/logo update only |
| [#20](https://github.com/timothyjosephmurphy/vermillionaurora/pull/20) | `codex/all-priced-paintings-checkout-20261001` | 30 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#21](https://github.com/timothyjosephmurphy/vermillionaurora/pull/21) | `codex/retry-live-checkout-verification-20261001` | 1 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#22](https://github.com/timothyjosephmurphy/vermillionaurora/pull/22) | `codex/fix-cart-resume-and-quote-buttons-20261001` | 17 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#23](https://github.com/timothyjosephmurphy/vermillionaurora/pull/23) | `codex/fix-print-sample-quote-wait-20261001` | 1 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#24](https://github.com/timothyjosephmurphy/vermillionaurora/pull/24) | `codex/route-buy-now-to-full-cart-20261001` | 2 | 0 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |
| [#25](https://github.com/timothyjosephmurphy/vermillionaurora/pull/25) | `codex/remove-one-item-notice-20261001` | 2 | 1 | 0 / 0 | No neural-dance changed file; unrelated site/commerce work |

##### C. Reproducible evidence archive

Local evidence filenames retained with the reconstruction (not committed in this docs file): `gh-owned-repos.json`, `repos.json`, `orgs.json`, `gists.txt`, seven unique branch-list responses, `all-mainline-through-sep30-pages.json`, `september-nd-commits.json`, `commit-<sha8>.json` / `.patch`, `original-a21f98fd.html`, `pr2.json`, `pr2-comments.json`, `pr2-commits.json`, `pr-<n>-files.json` (PR #10 has a second page), `early-prs-conversations-and-commits.json`, `issue-34-comments.json`, and older repository trees.

The original PR #2 unified diff and empty review/review-comment responses are additionally available in this run’s tool evidence. The main report does not include provider deployment credentials or require a repository checkout. All GitHub activity in this investigation was read-only; only local documentation/evidence files were written.

### Astro port + gallery integration (2026-10-07 → 2026-10-30)

Legacy HTML ported to Astro (#673). Tracker opens booth (#283), sticker-bot (#306/#307), courtyard live ND (#288), blog framing (#34/#140). Hex gallery plaque + click-to-add (#761/#762). Booth design.md drafted Oct 29.

**Commits**

- `1cd7cb84` 2026-10-07 18:01 PDT — Audit fixes: 404/favicon, placeholders, Paul Murphy attribution, TJ Murphy branding, cart/commissions polish, sold-page CTAs, sitemap lastmod, gallery CLS (#287)
- `8bca12df` 2026-10-07 18:31 PDT — Testimonials: remove painting picker, Add photos button, nav link and CTAs (#297)
- `ab4262a3` 2026-10-07 18:41 PDT — Logo: orange-face painting mark replaces the TJ monogram (header, favicons, manifest, share image) (#300)
- `00161be1` 2026-10-07 22:31 PDT — Audit 4 quick fixes: header, print chooser, empty states, responsive painting images, meta, a11y (#309)
- `7fd823a7` 2026-10-16 15:41 PDT — Dedicated Exhibitions page at /exhibitions/ and header nav link
- `5b037e26` 2026-10-20 18:53 PDT — Merge branch 'main' into port-neural-dance
- `c8ea66a4` 2026-10-20 18:59 PDT — Merge pull request #673 from timothyjosephmurphy/port-neural-dance
- `6691d04d` 2026-10-20 19:33 PDT — Keep 'Vermillion Aurora Productions' (sole proprietorship) in footer and neural-dance credit; wait for the Lillooet map details in the map browser test (#133)
- `4d024cac` 2026-10-20 14:23 PDT — Self-host Cormorant Garamond and Inter (woff2, latin + latin-ext) under /fonts/; drop Google Fonts links and preconnects (studio-tracker #205)
- `e286f63e` 2026-10-20 18:18 PDT — Port /neural-dance/ to Astro with SiteHeader; 'Vermillion Aurora' wording (#133)

**PRs**

- [PR #673](https://github.com/timothyjosephmurphy/vermillionaurora/pull/673) [MERGED] merged 2026-10-20 18:59 PDT — Port /neural-dance/ to Astro (#133 legacy port 3/9)
  - Files: src/pages/neural-dance/index.astro
  - Merge SHA: `c8ea66a42e16`

**Tracker issues**

- [#34](https://github.com/timothyjosephmurphy/studio-tracker/issues/34) [open] 2026-10-18 01:17 PDT — AI blog post: confirm the neural dance details
- [#140](https://github.com/timothyjosephmurphy/studio-tracker/issues/140) [closed] 2026-10-18 10:35 PDT — Neural Dance blog post: frame it around AI and human agency, with the simulation as the AI-era tool
- [#274](https://github.com/timothyjosephmurphy/studio-tracker/issues/274) [closed] 2026-10-21 14:23 PDT — Tag gallery: move money printer off Neural Dance wall; show the real Neural Dance simulation
- [#283](https://github.com/timothyjosephmurphy/studio-tracker/issues/283) [open] 2026-10-22 00:29 PDT — Neural dance: self-contained outdoor sticker booth installation
- [#288](https://github.com/timothyjosephmurphy/studio-tracker/issues/288) [open] 2026-10-22 11:54 PDT — Courtyard: drop colonnade, inviting doorways, murals + live Neural Dance inside
- [#306](https://github.com/timothyjosephmurphy/studio-tracker/issues/306) [open] 2026-10-22 14:06 PDT — 3D gallery: Neural Dance sticker bot (tripod printer next to the Neural Dance piece)
- [#307](https://github.com/timothyjosephmurphy/studio-tracker/issues/307) [open] 2026-10-22 14:06 PDT — Stretch: pick up dropped stickers and stick them on walls (ties into Neural Dance)
- [#465](https://github.com/timothyjosephmurphy/studio-tracker/issues/465) [closed] 2026-10-26 16:41 PDT — Neural Dance sticker bot: real strip art + beam aim polish (#306/#307)
- [#478](https://github.com/timothyjosephmurphy/studio-tracker/issues/478) [closed] 2026-10-26 18:00 PDT — Visual invent: #307 Neural Dance pose sticker sheet (replace placeholder decals)
- [#761](https://github.com/timothyjosephmurphy/studio-tracker/issues/761) [closed] 2026-10-27 11:43 PDT — Hex gallery: plaque beside Neural Dance explaining it (use tjm.art/neural-dance copy)
- [#762](https://github.com/timothyjosephmurphy/studio-tracker/issues/762) [closed] 2026-10-27 11:44 PDT — Hex gallery: Neural Dance desktop click adds dancer (any tool) + “click to add” tooltip

### Room mic + WASM core (2026-11-04 → 2026-11-05)

Mic frequency bands drive dancers via C++/WASM (#792/#794 → PRs #771/#772/#774/#779). Wave rings (#799) and silence gate (#800) opened then closed into live page work.

**Commits**

- `67c5b24d` 2026-11-04 15:33 PST — Neural Dance: room mic drives the mural dancers (WASM core) (#771)
- `12eb502f` 2026-11-04 16:44 PST — Room music section: mic-only dancers and isolated projector align (#772)

**PRs**

- [PR #771](https://github.com/timothyjosephmurphy/vermillionaurora/pull/771) [MERGED] merged 2026-11-04 15:33 PST — Neural Dance: room mic drives the mural dancers (WASM core)
  - Files: neural-dance/build.sh, neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, neural-dance/vendor/maptastic.js, package.json, scripts/copy-assets.mjs, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs
  - Merge SHA: `67c5b24df0cb`
- [PR #772](https://github.com/timothyjosephmurphy/vermillionaurora/pull/772) [MERGED] merged 2026-11-04 16:44 PST — Room music section: mic-only dancers and isolated projector align
  - Files: neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs
  - Merge SHA: `12eb502f7395`
- [PR #774](https://github.com/timothyjosephmurphy/vermillionaurora/pull/774) [MERGED] merged 2026-11-04 18:08 PST — Room music: prototype stage, mic only, at the bottom of the page
  - Files: src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs
  - Merge SHA: `5ae35ea3b0ec`
- [PR #779](https://github.com/timothyjosephmurphy/vermillionaurora/pull/779) [MERGED] merged 2026-11-05 10:12 PST — Restore Neural Dance add-dancer and room tuning sliders
  - Files: neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs
  - Merge SHA: `ff0ed40b3a37`
- [PR #781](https://github.com/timothyjosephmurphy/vermillionaurora/pull/781) [CLOSED] merged — — Add a Neural Dance silence gate and noise-floor gain cap (#800)
  - Files: neural-dance/silence-gate.js, package.json, src/pages/neural-dance/index.astro, tests/neural-dance-silence.test.mjs, tests/neural-dance-wasm.test.mjs
- [PR #782](https://github.com/timothyjosephmurphy/vermillionaurora/pull/782) [CLOSED] merged — — Draw each Neural Dance dancer's band as a sound-wave ring (#799)
  - Files: neural-dance/wave-ring.js, src/pages/neural-dance/index.astro, tests/neural-dance-rings.browser-test.mjs, tests/neural-dance-wasm.test.mjs

**Tracker issues**

- [#792](https://github.com/timothyjosephmurphy/studio-tracker/issues/792) [closed] 2026-11-04 09:34 PST — Neural Dance: mic frequency sensitivity (bass / kick / snare / hi-hat → dancers)
- [#794](https://github.com/timothyjosephmurphy/studio-tracker/issues/794) [closed] 2026-11-04 09:40 PST — Neural Dance: rewrite core in C++ (WASM) for high-load speed
- [#799](https://github.com/timothyjosephmurphy/studio-tracker/issues/799) [closed] 2026-11-05 11:37 PST — Neural Dance: circular live-waveform bloom around each dancer
- [#800](https://github.com/timothyjosephmurphy/studio-tracker/issues/800) [closed] 2026-11-05 11:39 PST — Neural Dance: silence gate, dancers still when room is quiet

### Camera markers + live projector page (2026-11-05 → 2026-11-05)

Pink post-it camera mode (#793 children #795–#798 → PR #780). Full-screen /neural-dance/live/ (#784) and grid align (#786). Silhouette sticker detection PR #783 open. Live iPhone testing (front vs back camera, slider direction, optical feedback) in chat Nov 5 evening PT.

**Commits**

- `ff0ed40b` 2026-11-05 10:12 PST — Restore Neural Dance add-dancer and room tuning sliders (#779)
- `27db6ecd` 2026-11-05 18:33 PST — Add report-only security headers, blog JSON-LD, and markup fixes (#788)
- `c68c6d92` 2026-11-05 11:56 PST — Add Neural Dance camera mode for pink wall markers (#780)
- `927db35f` 2026-11-05 13:08 PST — Add a full-screen Neural Dance live page and fix the camera preview (#784)
- `d0ab4192` 2026-11-05 15:26 PST — Align the full-screen Neural Dance projection from a grid over the dancers (#786)

**PRs**

- [PR #780](https://github.com/timothyjosephmurphy/vermillionaurora/pull/780) [MERGED] merged 2026-11-05 11:56 PST — Add Neural Dance camera mode for pink wall markers
  - Files: neural-dance/camera-markers.js, src/pages/neural-dance/index.astro, tests/neural-dance-camera.test.mjs, tests/neural-dance-wasm.test.mjs
  - Merge SHA: `c68c6d92fc33`
- [PR #783](https://github.com/timothyjosephmurphy/vermillionaurora/pull/783) [OPEN] merged — — Detect dancer-silhouette stickers in Neural Dance camera mode
  - Files: neural-dance/camera-markers.js, src/pages/neural-dance/index.astro, tests/neural-dance-camera.test.mjs
- [PR #784](https://github.com/timothyjosephmurphy/vermillionaurora/pull/784) [MERGED] merged 2026-11-05 13:08 PST — Add a full-screen Neural Dance live page and fix the camera preview
  - Files: neural-dance/camera-markers.js, neural-dance/live-show.js, neural-dance/room-lab.js, neural-dance/silence-gate.js, neural-dance/wave-ring.js, package.json, src/pages/neural-dance/index.astro, src/pages/neural-dance/live/index.astro, tests/fixtures/neural-dance-camera.html, tests/neural-dance-camera.browser-test.mjs…
  - Merge SHA: `927db35fa646`
- [PR #786](https://github.com/timothyjosephmurphy/vermillionaurora/pull/786) [MERGED] merged 2026-11-05 15:26 PST — Align the full-screen Neural Dance projection from a grid over the dancers
  - Files: neural-dance/camera-markers.js, neural-dance/live-show.js, src/pages/neural-dance/live/index.astro, tests/neural-dance-camera.test.mjs, tests/neural-dance-live.browser-test.mjs, tests/neural-dance-live.test.mjs
  - Merge SHA: `d0ab41927b7b`

**Tracker issues**

- [#793](https://github.com/timothyjosephmurphy/studio-tracker/issues/793) [open] 2026-11-04 09:34 PST — Neural Dance: external video feed detects new stickers on the wall
- [#795](https://github.com/timothyjosephmurphy/studio-tracker/issues/795) [open] 2026-11-05 11:25 PST — Neural Dance camera: iPhone Continuity Camera picker + live preview
- [#796](https://github.com/timothyjosephmurphy/studio-tracker/issues/796) [open] 2026-11-05 11:25 PST — Neural Dance camera: 4-corner wall calibration (homography) saved in localStorage
- [#797](https://github.com/timothyjosephmurphy/studio-tracker/issues/797) [open] 2026-11-05 11:25 PST — Neural Dance camera: pink post-it detection + sensitivity sliders
- [#798](https://github.com/timothyjosephmurphy/studio-tracker/issues/798) [open] 2026-11-05 11:25 PST — Neural Dance camera: feed detected post-its into dancer/marker system
- [#801](https://github.com/timothyjosephmurphy/studio-tracker/issues/801) [open] 2026-11-05 11:43 PST — Neural Dance camera: detect dancer-silhouette stickers (follow-on to pink post-its)

### Wearables, pins sim, Paradise Dystopia, 3D annex (2026-11-05 → 2026-11-06)

Paradise Dystopia painting progress photo; Option 2A JLCPCB clip pack; #821 pin simulator (PR #790 open); deep backlog #818/#819/#822/#823; blog #820.

**PRs**

- [PR #790](https://github.com/timothyjosephmurphy/vermillionaurora/pull/790) [OPEN] merged — — Add the standalone Neural Dance pin simulator at /neural-dance/pins/
  - Files: static/neural-dance/pins/assets/index-CMG1p7kc.css, static/neural-dance/pins/assets/index-DG2LzyDf.js, static/neural-dance/pins/index.html, static/neural-dance/pins/paradise-dystopia.jpg

**Tracker issues**

- [#818](https://github.com/timothyjosephmurphy/studio-tracker/issues/818) [open] 2026-11-05 17:01 PST — Neural Dance (deep backlog, Phase 1): wearable LED blink-code pins + dance-floor camera → project live dancer sprites onto a painting
- [#819](https://github.com/timothyjosephmurphy/studio-tracker/issues/819) [open] 2026-11-05 17:01 PST — Neural Dance (deep backlog, Phase 2 stretch): two-way wireless addressable LED pins for crowd-wide light patterns across the dance floor
- [#820](https://github.com/timothyjosephmurphy/studio-tracker/issues/820) [open] 2026-11-05 17:01 PST — Blog post: Neural Dance "Paradise Dystopia" party painting — process photos + time-lapse
- [#821](https://github.com/timothyjosephmurphy/studio-tracker/issues/821) [open] 2026-11-05 17:13 PST — Neural Dance (FRONT OF BACKLOG): interactive demo simulating RGB blink-code clips + 2-iPhone 3D stereo localization → painting projection
- [#822](https://github.com/timothyjosephmurphy/studio-tracker/issues/822) [open] 2026-11-05 17:27 PST — Neural Dance (deep backlog + 3D sim): DMX / moving-head lighting rig aimed into 3D space to spotlight tracked dancers
- [#823](https://github.com/timothyjosephmurphy/studio-tracker/issues/823) [open] 2026-11-05 17:40 PST — Neural Dance (backlog): Generalize Neural Dance energy & wave algorithm to 3D space (3D dance floor)

**Local box artifacts**

- **housing/booth design doc** (`/workspace/neural-dance-booth/design.md`) — 2026-10-29 17:53 PDT — Self-contained outdoor sticker booth for Friends Club; Silhouette Cameo vinyl strip; projector companion unit; $2k / June 2027 deadline. Mentions XGIMI Halo+ class as recommended portable projector (~$550-600). — tracker #283
- **painting progress photo** (`/home/box/agent-data/studio-assets/neural-dance-paradise-dystopia-2026-11-05/progress-2026-11-05-1700-orig.jpg`) — 2026-11-05 17:00 PST — In-progress Paradise Dystopia party painting (sky-on-top after EXIF/rotate used in pins demo). — tracker #820, #821
- **wearable LED clip Option 2A manufacturing pack** (`/workspace/neural-dance-clip-2a/`) — 2026-11-05 17:32–17:48 PST — CH592F wearable LED clips (qty 12) + ESP32-C3 Wi-Fi→BLE bridge. Includes JLCPCB Gerbers, BOM, CPL, KiCad PCB/schematic, PCB renders, compiled firmware (.bin/.hex), order+firmware zip bundle. — tracker #818, #821
- **Three.js pin simulator (local + PR #790)** (`/workspace/neural-dance-pins/`) — 2026-11-05 17:17–18:51 PST — Standalone Vite/Three.js demo for RGB blink-code clips, 2-iPhone stereo triangulation, Paradise Dystopia sprites, Phase 2 crowd wave, 4 ceiling moving heads. Destined for /neural-dance/pins/ via VA PR #790. — tracker #821, #822
- **blog drafts + share images** (`/workspace/creative/blog/neural-dance-ai-draft*.md`) — 2026-10-18 onward — AI/human-agency Neural Dance blog drafts (v1–v5) tied to tracker #34/#140. — tracker #34, #140, #820
- **3D gallery Neural Dance plaque + sticker assets** (`/workspace/gallery-tj-feedback/neural-dance-plaque/`) — gallery work Oct 2026 — Hex/tag gallery plaque and sticker-bot assets; live gallery source also has gallery-courtyard/sticker-bot in timothyjosephmurphy/gallery-source. — tracker #306, #307, #761, #762

## Full commit list touching `neural-dance` / search hits

| Date (PT) | SHA | Message |
|-----------|-----|---------|
| 2026-09-14 15:28 PDT | [`a21f98fd`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a21f98fd4e7dade778ccabb77fb722d84ce3a32f) | Add neural-dance page to navigation and portfolio |
| 2026-09-21 12:32 PDT | [`8305ac1f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/8305ac1ffa183720744d45157ca70c0efcb7ba76) | Explain Neural Dance motivation, participatory installation, and prototype use |
| 2026-09-21 12:33 PDT | [`528b02a0`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/528b02a0fbf9eafc161aabf6b3acbf5076562b6b) | Add participant silhouette mural photograph to Neural Dance project story |
| 2026-09-21 12:46 PDT | [`95624dbb`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/95624dbba2fdf156b6585030b7a11d6170f85b81) | Protect Neural Dance simulation from runaway browser resource use |
| 2026-09-21 12:54 PDT | [`a0c5db16`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a0c5db16a9afe738ac654856766166cb68dfaed9) | Restore reliable dancer rhythms and direct bounded neighbor reinforcement |
| 2026-09-21 13:12 PDT | [`a5c814ce`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/a5c814ce5dc41026d265d2856dfd563d54ce5cdc) | Add mapped mural simulation to the bottom of Neural Dance |
| 2026-09-21 13:26 PDT | [`b7f172c1`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b7f172c15ed8fa3265d24303dc76cee89fdbcf30) | Lead with project explanation and mural simulation on Neural Dance |
| 2026-09-21 13:29 PDT | [`e7fd7670`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e7fd7670be2b245485243c1324fe473a2f732a49) | Move project details below mural simulation and remove standalone photo |
| 2026-09-24 13:56 PDT | [`64ccc62d`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/64ccc62de942828b5242209663c002890c79f976) | Reorder homepage sections and move Neural Dance link to Friends Club |
| 2026-09-25 11:37 PDT | [`322b6b8f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/322b6b8fff9a7cee621a88eaec060e1bc76c4ec1) | Unify navigation across site and update painting availability |
| 2026-09-28 13:50 PDT | [`04f7be7c`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/04f7be7c894cea6091ed80225f3c2728bcd4c9a0) | Update header branding and sort homepage paintings by price |
| 2026-09-30 16:42 PDT | [`0e248387`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/0e24838722f149f1e124229df786f9dee161c156) | Add exhibition world map, dates, and supplied branding |
| 2026-10-07 18:01 PDT | [`1cd7cb84`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/1cd7cb84267e1aeff6974177e90c73d1167de0d2) | Audit fixes: 404/favicon, placeholders, Paul Murphy attribution, TJ Murphy branding, cart/commissions polish, sold-page CTAs, sitemap lastmod, gallery CLS (#287) |
| 2026-10-07 18:31 PDT | [`8bca12df`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/8bca12df1ee1cdb3c41ae863638a12f74b68bd33) | Testimonials: remove painting picker, Add photos button, nav link and CTAs (#297) |
| 2026-10-07 18:41 PDT | [`ab4262a3`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/ab4262a3f7a4f5843d0f826dd6148d1d0f961324) | Logo: orange-face painting mark replaces the TJ monogram (header, favicons, manifest, share image) (#300) |
| 2026-10-07 22:31 PDT | [`00161be1`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/00161be1d9c971a415778e9530fc7c67a43a1cfe) | Audit 4 quick fixes: header, print chooser, empty states, responsive painting images, meta, a11y (#309) |
| 2026-10-16 15:41 PDT | [`7fd823a7`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/7fd823a7eeacb54f5622e4f00735a0785f11d7ff) | Dedicated Exhibitions page at /exhibitions/ and header nav link |
| 2026-10-20 18:53 PDT | [`5b037e26`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/5b037e2654d7468301063d2e6be3a08fccc40ce5) | Merge branch 'main' into port-neural-dance |
| 2026-10-20 18:59 PDT | [`c8ea66a4`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/c8ea66a42e16b8b7303418b0bf42f7beeafe1850) | Merge pull request #673 from timothyjosephmurphy/port-neural-dance |
| 2026-10-20 19:33 PDT | [`6691d04d`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/6691d04d8d24096d1b16d8eb8c12c3bba57f4ecd) | Keep 'Vermillion Aurora Productions' (sole proprietorship) in footer and neural-dance credit; wait for the Lillooet map details in the map browser test (#133) |
| 2026-10-20 14:23 PDT | [`4d024cac`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/4d024cac8d6829c3831f1ca4f94f9440b2e0c464) | Self-host Cormorant Garamond and Inter (woff2, latin + latin-ext) under /fonts/; drop Google Fonts links and preconnects (studio-tracker #205) |
| 2026-10-20 18:18 PDT | [`e286f63e`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e286f63e0939def4f7f7359690e29ee4d8ce6cfe) | Port /neural-dance/ to Astro with SiteHeader; 'Vermillion Aurora' wording (#133) |
| 2026-11-04 15:33 PST | [`67c5b24d`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/67c5b24df0cb05e5ceb28d4000ce745cd6681795) | Neural Dance: room mic drives the mural dancers (WASM core) (#771) |
| 2026-11-04 16:44 PST | [`12eb502f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/12eb502f7395f10e71b7e9bfaa378591f9829dc2) | Room music section: mic-only dancers and isolated projector align (#772) |
| 2026-11-05 10:12 PST | [`ff0ed40b`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/ff0ed40b3a37b412f274c8396018e011b5849532) | Restore Neural Dance add-dancer and room tuning sliders (#779) |
| 2026-11-05 18:33 PST | [`27db6ecd`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/27db6ecd8fc7c12dca7e60778e6acbee53294a88) | Add report-only security headers, blog JSON-LD, and markup fixes (#788) |
| 2026-11-05 11:56 PST | [`c68c6d92`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/c68c6d92fc33d45192408cb9b7fd93b36155cd83) | Add Neural Dance camera mode for pink wall markers (#780) |
| 2026-11-05 13:08 PST | [`927db35f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/927db35fa64606bc46c13a6e7e33684614827662) | Add a full-screen Neural Dance live page and fix the camera preview (#784) |
| 2026-11-05 15:26 PST | [`d0ab4192`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/d0ab41927b7b2a1ce8ed1945dacaff2d7cc5b8b8) | Align the full-screen Neural Dance projection from a grid over the dancers (#786) |

## Core PRs (vermillionaurora)

### PR #2 — Add dancer roles to Neural Dance

- State: **CLOSED** | Created: 2026-09-27 16:34 PDT | Merged: — | Head: `neural-dance-dancer-roles`
- **Forensic correction:** CLOSED **UNMERGED**, October 7, 2026 **12:22:11 AM PDT**; nine September 27 branch commits, **4:34:39–5:06:22 PM PDT**. Cloudflare preview failed; owner closed as superseded. Do not count these roles as shipped. Full commit-by-commit reconstruction is in Era 1 above.
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/2
- Files (1): neural-dance/index.html

<details><summary>PR body excerpt</summary>

```
Adds zoners, leaders, and followers to both Neural Dance simulations. Activation grows with exponentially diminishing gain. Zoners react to all music channels, never tire, and send each music triggered pulse to one random dancer anywhere on the floor. Leaders favor one or two eligible nearby leaders/followers, replace an individual favorite when that target gets tired, and refresh their favorites again after their own recovery. Strongly activated leaders can send up to five connection pulses. Followers influence gently and tire quickly. Leader-originated connections to zoners remain blocked. Existing pulse and runtime limits remain.

Validation: inline scripts parse, diff checks pass, and focused checks confirm that a tired favorite is replaced while a healthy favorite remains in both simulations. Browser visual QA remains pending.
```

</details>

### PR #673 — Port /neural-dance/ to Astro (#133 legacy port 3/9)

- State: **MERGED** | Created: 2026-10-20 18:18 PDT | Merged: 2026-10-20 18:59 PDT | Head: `port-neural-dance`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/673
- Merge: `c8ea66a42e16`
- Files (1): src/pages/neural-dance/index.astro

<details><summary>PR body excerpt</summary>

```
studio-tracker #133 legacy port 3 of 9.

- /neural-dance/ is now src/pages/neural-dance/index.astro with the shared SiteHeader (and SiteFooter where the page had a footer); the legacy index.html is removed. Images and other assets stay.
- 'Vermillion Aurora Productions' wording replaced with 'Vermillion Aurora' (shared footer included).
- Built locally and compared with live at 1280px: identical main text, no page errors; height differs only by the shared footer.
- npm test passes.
```

</details>

### PR #771 — Neural Dance: room mic drives the mural dancers (WASM core)

- State: **MERGED** | Created: 2026-11-04 10:12 PST | Merged: 2026-11-04 15:33 PST | Head: `cursor/neural-dance-wasm-mic-75cd`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/771
- Merge: `67c5b24df0cb`
- Files (8): neural-dance/build.sh, neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, neural-dance/vendor/maptastic.js, package.json, scripts/copy-assets.mjs, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Room music can drive the Neural Dance mural. **Listen** turns on the device microphone; kick, bass, snare/mid, and hi-hat/treble hits pulse the matching dancers. With the mic off, muted, or unavailable, the existing synthetic rhythm still runs. Start simulation, Audio on, and Reset placement behave as before.

The dancer network and the band-onset step run in C++ compiled to WebAssembly (`neural-dance/neural-dance.wasm`). The page keeps the microphone, synth tones, and canvas. Studio-tracker #792 and #794.

[Listening: band meters and dancers responding on the mural](https://cursor.com/agents/bc-8bebea12-a068-59f1-a4ec-b617a55575cd/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fscreenshots%2Fneural-dance-listening.png)

[Align projector corner-pins the stage onto a wall](https://cursor.com/agents/bc-8bebea12-a068-59f1-a4ec-b617a55575cd/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fscreenshots%2Fneural-dance-mapping.png)

## How to test with room music

1. Open `/neural-dance/` and scroll to **Dance across the mural**.
2. Select **Start simulation**. The 28 sticker dancers keep their own rhythm.
3. Select **Audio on** to hear the built-in tones, then
```

</details>

### PR #772 — Room music section: mic-only dancers and isolated projector align

- State: **MERGED** | Created: 2026-11-04 16:28 PST | Merged: 2026-11-04 16:44 PST | Head: `cursor/neural-dance-room-lab-75cd`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/772
- Merge: `12eb502f7395`
- Files (4): neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
The mural demo at the top of `/neural-dance/` is the built-in rhythm again. **Room music**, further down, is the microphone stage.

While **Listening** there, the synthetic clock is forced off and any pulses it had already started are cleared. Dancers move only on kick, bass, mid, and treble onsets from the mic. **Audio** stays off so the speakers do not feed the microphone. Four live level bars show what the mic is hearing.

**Align projector** is only on this stage. It draws corner handles around this picture. Drag a handle to fit the wall. The mural demo above is not moved. Select **Mapping** when you are done and the handles go away.

[Room music while Listening, with band level bars](https://cursor.com/agents/bc-8bebea12-a068-59f1-a4ec-b617a55575cd/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fscreenshots%2Froom-music-listening.png)

[Four band levels: kick and bass high, mid partial, treble quiet](https://cursor.com/agents/bc-8bebea12-a068-59f1-a4ec-b617a55575cd/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fscreenshots%2Froom-spectrum.png)

[Align projector handles on the room-music stage only](https://cursor.com/agents/bc-8bebea12-a068-59f1-
```

</details>

### PR #774 — Room music: prototype stage, mic only, at the bottom of the page

- State: **MERGED** | Created: 2026-11-04 17:13 PST | Merged: 2026-11-04 18:08 PST | Head: `cursor/room-music-prototype-stage-e2bf`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/774
- Merge: `5ae35ea3b0ec`
- Files (2): src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Room music (`#nd-room-lab`) now matches TJ’s notes, including the follow-up on pegged meters.

- **Prototype background.** The stage no longer draws `mural-with-silhouettes.jpeg`. It uses the original prototype canvas: solid `#080910`, the same sacred-geometry field, and colored dancers and links on a 1000×620 stage. Dance across the mural still uses the photograph.
- **Mic only.** The Room music Audio toggle and its oscillator are gone. `nd_set_clock(0)` stays off, so the built-in beat does not move dancers. They react only while Listening, from the live microphone bands. The mural demo and the original prototype keep their own audio.
- **Page order.** `#nd-room-lab` comes after `#original-simulation`. The mural note now points to Room music at the bottom of the page.
- **Meter AGC.** A ~1.25s RMS window drives a smooth gain (faster when turning down) into the spectrum bars and the four band meters, with a soft knee instead of a hard clip. Loud music that was pegged at full scale settles near mid (~50%). The bytes sent to the onset detector are not scaled.

Projector align still pins this stage only. `tests/neural-dance-wasm.test.mjs` covers the
```

</details>

### PR #779 — Restore Neural Dance add-dancer and room tuning sliders

- State: **MERGED** | Created: 2026-11-05 09:59 PST | Merged: 2026-11-05 10:12 PST | Head: `cursor/neural-dance-controls-88f6`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/779
- Merge: `ff0ed40b3a37`
- Files (4): neural-dance/neural-dance.wasm, neural-dance/src/neural_dance.cpp, src/pages/neural-dance/index.astro, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Why

Click-to-add disappeared from the listening stage when Room music (#774) rebuilt the prototype canvas for the microphone and left the pointer handlers behind. Gravity, wander, threshold, and peak hold still lived only on the original sketch, so they never reached the WASM dancers that Listen drives.

## What

- Room music accepts a click to add a dancer, a drag to move one, and Shift-click to remove one. The mural stage still does the same.
- Gravity, wander, threshold, and peak hold on Room music call into that stage's WASM instance. Defaults match the original sketch (2.5×, 0.25, 1.40, 2.8 s).
- Kick, bass, snare, and hi-hat sensitivity scale onset detection and how hard that band's dancers react. Sensitivity 1 matches the previous detector.
- Sliders keep working while Listen is on. The Room music display AGC is untouched: it still scales only the meters and spectrum bars, after `nd_update`.
- Slider values are not written to localStorage. The other Neural Dance controls are not stored either.

## Checks

- `npm run build`
- `npm test` (359 tests)
- Browser pass on the built page: add and Shift-remove on both stages, slider readouts, a
```

</details>

### PR #780 — Add Neural Dance camera mode for pink wall markers

- State: **MERGED** | Created: 2026-11-05 11:41 PST | Merged: 2026-11-05 11:56 PST | Head: `cursor/neural-dance-camera-mode-1e83`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/780
- Merge: `c68c6d92fc33`
- Files (4): neural-dance/camera-markers.js, src/pages/neural-dance/index.astro, tests/neural-dance-camera.test.mjs, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Camera mode on `/neural-dance/` lists devices from `enumerateDevices` / `getUserMedia`, including Continuity Camera’s **iPhone Camera**, and shows a live preview.
- Four clicks on that preview calibrate a homography from camera pixels onto the Room music projection. The calibration, the selected camera, and the detection sliders persist in `localStorage`.
- Pink notes are found on a downscaled frame. Hue tolerance, saturation sensitivity, and minimum blob size are adjustable. A marker appears about 1.5 seconds after a note goes up and clears shortly after it comes down.
- Those markers feed the Room music dancers through `setMarkers` / `setStickerFeed`, the hook studio-tracker #793 can use. Add-dancer, gravity, wander, threshold, peak hold, per-band sensitivity, and Room music / Listen stay as they are.

## Tracker
- Parent, fluorescent marker lines between dancers: https://github.com/timothyjosephmurphy/studio-tracker/issues/793
- Camera picker and preview: https://github.com/timothyjosephmurphy/studio-tracker/issues/795
- Calibration stored in localStorage: https://github.com/timothyjosephmurphy/studio-tracker/issues/796
- Pink HSV
```

</details>

### PR #781 — Add a Neural Dance silence gate and noise-floor gain cap (#800)

- State: **CLOSED** | Created: 2026-11-05 12:03 PST | Merged: — | Head: `cursor/neural-dance-silence-gate-bb3c`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/781
- Files (5): neural-dance/silence-gate.js, package.json, src/pages/neural-dance/index.astro, tests/neural-dance-silence.test.mjs, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## What this is

Studio-tracker #800. Room music was boosting a quiet mic into the same range as music, and dancers could move on background noise. Listen and the Room music stage now share a silence gate.

## Behavior

- The noise floor is the low percentile of recent input level. It is measured while the gate is closed, so a song does not become the floor.
- Near that floor, auto-gain is capped at 1. Silence and background noise are not boosted.
- While the gate is closed, the onset detector receives a zero spectrum, so dancers stay still. A hit that rises above the floor still arms them.
- **Quiet threshold** is a new slider on Room music (0 to 0.40, default 0.08). Gravity, wander, threshold, peak hold, and the four band sensitivities are unchanged.
- The floor is shown beside the meters as `noise floor`.

## Tests

`npm run build` completed. `npm test` passed (367 tests), including `tests/neural-dance-silence.test.mjs` for the gain cap, the floor, the threshold, and dancers staying still on noise that would otherwise arm them.

## Do not merge

This pull request stays open and unmerged. The silence gate is being folded into the standalone ful
```

</details>

### PR #782 — Draw each Neural Dance dancer's band as a sound-wave ring (#799)

- State: **CLOSED** | Created: 2026-11-05 12:04 PST | Merged: — | Head: `cursor/neural-dance-wave-rings-563b`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/782
- Files (4): neural-dance/wave-ring.js, src/pages/neural-dance/index.astro, tests/neural-dance-rings.browser-test.mjs, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Each dancer’s soft bloom is now a ring drawn from the live audio that dancer follows. Kick, bass, snare, and hi-hat each get a highpass/lowpass pair into an analyser, and the ring is the radial plot of that band’s time-domain waveform (`getFloatTimeDomainData`). Studio-tracker #799.

Room music does this from the microphone while **Listening**. The mural stage does it from the tone bus while **Audio** is on. A quiet band stays a circle. Add, drag, and remove, gravity, wander, threshold, peak hold, per-band sensitivity, and the Room music meter AGC are unchanged. Camera mode (pink post-it markers) stays on the page.

## How to test

1. Open `/neural-dance/` and scroll to **Room music**.
2. Select **Start**, then **Listen**, and allow the microphone. Play music in the room.
3. Kick dancers (circles) wear a ring that moves with the kick. Diamonds follow bass, squares the snare, triangles the hi-hat. A band that is quiet keeps a round ring.
4. Gravity, wander, threshold, peak hold, and the four sensitivity sliders still update their readouts and the dancers. The spectrum bars still use the display AGC.
5. On **Dance across the mural**, select **Start
```

</details>

### PR #783 — Detect dancer-silhouette stickers in Neural Dance camera mode

- State: **OPEN** | Created: 2026-11-05 12:04 PST | Merged: — | Head: `cursor/dancer-sticker-camera-2dc9`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/783
- Files (3): neural-dance/camera-markers.js, src/pages/neural-dance/index.astro, tests/neural-dance-camera.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
## Summary
- Camera mode now detects dark gray and black dancer-silhouette stickers on a light wall, along with the pink notes from #780.
- Each frame uses an adaptive luminance threshold (a local window against the wall). Sticker sensitivity widens or narrows that cutoff. Blobs are kept only when area, aspect, solidity, and extent look like a post-it-sized dancer, so specks, thin shadows, filled rectangles, and large dark regions drop out.
- A Pink / Stickers / Both toggle chooses what is tracked. Both modes share the existing debounce, homography, and Room music marker feed. The mode and sticker sensitivity persist in `localStorage` with the other camera settings.

## Tracker
- Dancer-silhouette stickers: https://github.com/timothyjosephmurphy/studio-tracker/issues/801
- Builds on the pink post-it camera mode in #780, which is already on main. This branch is rebased onto that merge so the diff is only the sticker work.

Do not merge or deploy this until TJ confirms that pink post-it detection works live.

## Tests
- `npm test` (371 passed, including sticker threshold, shape filters, detection mode, debounce, and homography)
- `npm run build`

<
```

</details>

### PR #784 — Add a full-screen Neural Dance live page and fix the camera preview

- State: **MERGED** | Created: 2026-11-05 12:40 PST | Merged: 2026-11-05 13:08 PST | Head: `cursor/neural-dance-live-3d6f`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/784
- Merge: `927db35fa646`
- Files (15): neural-dance/camera-markers.js, neural-dance/live-show.js, neural-dance/room-lab.js, neural-dance/silence-gate.js, neural-dance/wave-ring.js, package.json, src/pages/neural-dance/index.astro, src/pages/neural-dance/live/index.astro, tests/fixtures/neural-dance-camera.html, tests/neural-dance-camera.browser-test.mjs, tests/neural-dance-camera.test.mjs, tests/neural-dance-live.test.mjs, tests/neural-dance-rings.browser-test.mjs, tests/neural-dance-silence.test.mjs, tests/neural-dance-wasm.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
The projector page is [https://tjm.art/neural-dance/live/](https://tjm.art/neural-dance/live/). It has no site header, nav, or footer. The dancer stage fills the screen. Room music (Listen, Quiet threshold, sound-wave rings, the sensitivity sliders) and camera mode (picker, calibration, pink detection) sit in one overlay. Hide controls, or press H, for the projection. Fullscreen hides the browser chrome. Settings stay in this browser.

The same camera bug is fixed on `/neural-dance/`. With an iPhone camera selected, the preview was black and only the calibration quad drew, because `play()` ran before the camera had a frame and the open request asked for a resolution. The video element is now muted, plays inline, and autoplays, and `play()` runs after `loadedmetadata`. Detection draws real frames. Continuity Camera is chosen with `deviceId` and no width or height, which is what Safari and Chrome on macOS need for that camera to deliver a picture.

Room music is one module, `neural-dance/room-lab.js`, used by both pages. This branch also contains the radial sound-wave rings from #782 and the silence gate (Quiet threshold) from #781, so both show on
```

</details>

### PR #786 — Align the full-screen Neural Dance projection from a grid over the dancers

- State: **MERGED** | Created: 2026-11-05 13:59 PST | Merged: 2026-11-05 15:26 PST | Head: `cursor/neural-dance-live-layout-3d6f`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/786
- Merge: `d0ab41927b7b`
- Files (6): neural-dance/camera-markers.js, neural-dance/live-show.js, src/pages/neural-dance/live/index.astro, tests/neural-dance-camera.test.mjs, tests/neural-dance-live.browser-test.mjs, tests/neural-dance-live.test.mjs

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
The dancers stay full-screen. The camera is a small corner preview. Align projector draws a white grid and four colored corner marks on top of the running simulation, finds that quad in the camera, and saves the homography. There is no split screen and no blank white field.

The Room music bar and the sliders sit above the stage, including while Align is on, so they stay tappable on an iPhone in landscape. **Cancel align** and **Exit align** leave that screen. If the corners are not found in eight seconds, use **Fine-tune corners**. Hide controls, or press H, clears the screen for projecting.

Mic, rings, the silence gate, and pink markers are unchanged. Sticker detection is not included.

[Full-screen dancers at 844 by 390, camera in the corner, sliders in the bar](https://cursor.com/agents/bc-a2756975-32bb-5fec-877c-18963c133d6f/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fneural-dance-live-landscape.png)

[Grid over the dancers, with Cancel align and Exit align still in the bar](https://cursor.com/agents/bc-a2756975-32bb-5fec-877c-18963c133d6f/artifacts?path=%2Fopt%2Fcursor%2Fartifacts%2Fneural-dance-live-align.png)

## How to use

1. Open `/n
```

</details>

### PR #790 — Add the standalone Neural Dance pin simulator at /neural-dance/pins/

- State: **OPEN** | Created: 2026-11-05 17:47 PST | Merged: — | Head: `cursor/neural-dance-pin-simulator-2142`
- URL: https://github.com/timothyjosephmurphy/vermillionaurora/pull/790
- Files (4): static/neural-dance/pins/assets/index-CMG1p7kc.css, static/neural-dance/pins/assets/index-DG2LzyDf.js, static/neural-dance/pins/index.html, static/neural-dance/pins/paradise-dystopia.jpg

<details><summary>PR body excerpt</summary>

```
<!-- CURSOR_AGENT_PR_BODY_BEGIN -->
Adds TJ's standalone Neural Dance 3D LED pin page as an isolated static directory, referenced from timothyjosephmurphy/studio-tracker#821. No existing files are changed, so this stays clear of the website-audit PRs.

The page is `static/neural-dance/pins/index.html`. Astro's `publicDir` is `./static`, so `npm run build` copies it to `dist/neural-dance/pins/index.html` at `/neural-dance/pins/`. The Vite bundle loads `./assets/index-DG2LzyDf.js`, `./assets/index-CMG1p7kc.css`, and `./paradise-dystopia.jpg` (1480×740 landscape). Three.js is inside the bundle. The only `http://` string is the XHTML namespace in Three.js. A case-insensitive scan of the directory finds no `DMT`.

`npm run build` completed successfully. The existing HTML post-pass adds favicon and Open Graph tags in `dist/` only; the module and image paths stay relative.

Leave this open. Do not merge until the deploy slot behind #789 and #788 is clear, so only one production deploy from `main` runs at a time.

The attached archive (`sha256 fb8b0a7672297c3517bb4b5e497d9019f0571ba71e65a4bc0dc3ea6f46c95e1c`) is the bundle in this commit. Its script is `assets/index-DG2LzyDf.js`. It does n
```

</details>

## Core studio-tracker issues

### #34 — AI blog post: confirm the neural dance details

- State: **open** | Created: 2026-10-18 01:17 PDT | Closed: — | Labels: writer, in-progress
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/34

<details><summary>Body excerpt</summary>

```
The AI blog post draft is on hold until TJ confirms the neural dance details.
```

</details>

### #140 — Neural Dance blog post: frame it around AI and human agency, with the simulation as the AI-era tool

- State: **closed** | Created: 2026-10-18 10:35 PDT | Closed: 2026-10-18 16:10 PDT | Labels: writer, creative-decision, agent-suggested
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/140

<details><summary>Body excerpt</summary>

```
For #34, Writer built the post around the page's 'Why make it?' theme (human agency as AI takes on more work) and TJ's view of AI as a power tool for trying choices digitally before committing them physically, with the simulation as the example. Title: 'Neural Dance: How an Idea Became a Simulation'. Draft: /workspace/creative/blog/neural-dance-ai-draft.md. TJ to approve or redirect.
```

</details>

### #274 — Tag gallery: move money printer off Neural Dance wall; show the real Neural Dance simulation

- State: **closed** | Created: 2026-10-21 14:23 PDT | Closed: 2026-10-21 17:09 PDT | Labels: galleries-3d, tj-directed, gallery
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/274

<details><summary>Body excerpt</summary>

```
Move the money printer egg clear of art. Show TJ's actual /neural-dance/ page live on the wall instead of the stand-in animation. Part of the #251 preview redeploy. Requested by TJ on Oct 21 2026.
```

</details>

### #283 — Neural dance: self-contained outdoor sticker booth installation

- State: **open** | Created: 2026-10-22 00:29 PDT | Closed: — | Labels: creative-decision, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/283

<details><summary>Body excerpt</summary>

```
Related: no dedicated Neural Dance parent issue exists. Related Neural Dance issues: #34 (blog post details), #140, #274.

## Spec (TJ)
A self-contained installation, as robust and simple as possible. Weatherproof, doesn't need grid power, runs all hardware to make stickers and run the projection. A small computer inside a weatherproof box/case with a roof.

Interface: press a button, dance in front of the camera, it takes a series of photos, sends their silhouettes to the Cricut/Silhouette Cameo cutter, which cuts a row of stickers of you dancing from a ROLL of sticker paper, then slices off the row so it drops out through a slit for people to pick up.

## Design file
Draft design doc: `/workspace/neural-dance-booth/design.md` on Grok Bot's box (full text included below).

<details><summary>design.md (v1.0)</summary>

# Neural Dance Sticker Booth: Design Doc (v1.0)

Vermillion Aurora Productions (sole proprietorship). Revised 2026-10-22. [UNVERIFIED] marks specs or prices from general
```

</details>

### #288 — Courtyard: drop colonnade, inviting doorways, murals + live Neural Dance inside

- State: **open** | Created: 2026-10-22 11:54 PDT | Closed: — | Labels: galleries-3d, tj-directed, gallery
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/288

<details><summary>Body excerpt</summary>

```
TJ items (Oct 22), shipping in the same preview-251 deploy as #286/#287 after all audits pass.

- [ ] (a) Remove all exterior courtyard columns and the curved colonnade rings/bands they support. Keep room domes. Make room doorways obvious invitations: clear, wide, well-lit openings, no dead ends.
- [ ] (b) Move Friends Club mural, Cormorant Garden mural and Neural Dance display into the inner courtyard at true size, unblocked, plaques at 1.45 m. Update tour stops/route.
- [ ] (c) Neural Dance runs the live simulation continuously; tap/click adds a node like the real sim. Phone-performant, LOD tiers respected.

Screenshots: /workspace/shots/tour2/courtyard.png, neural.png

- [ ] (d) Turn OFF the Sam Burham egg and the Slender Man egg via a disable flag in the shared egg config (assets kept). Fix eggaudit expected counts. Tag gallery preview only; list live galleries that include them (no live deploy).
- [ ] (e) The three Ukraine paintings hang together side by side on one wall in one ro
```

</details>

### #306 — 3D gallery: Neural Dance sticker bot (tripod printer next to the Neural Dance piece)

- State: **open** | Created: 2026-10-22 14:06 PDT | Closed: — | Labels: tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/306

<details><summary>Body excerpt</summary>

```
TJ, Oct 22 2026 2:06 PM PT: add the sticker-printing bot to the Neural Dance piece in the 3D gallery (an in-game nod to the real booth in #283).
- Size: a little bigger than a Silhouette Alpha machine. TJ guessed about 24 in wide by 6 in tall; look up the real dimensions and scale up slightly.
- It stands on three organic, slightly insect-like legs.
- A slot on the front that stickers drop out of, and a button on top. When the visitor presses it (with click, tap, or the use key), a strip of stickers visibly feeds out of the front slot and falls.
- The back visibly projects the Neural Dance simulation, with a light cone from a lens and the projection landing on the wall or screen behind it.
- Original model, never blocks paths, passes the audit, silent when muted, runs fine on phones.
Owner: Gallery; Visual can model it in parallel as a separate file. Queue after the layout work. Stretch goal: see the linked card.
```

</details>

### #307 — Stretch: pick up dropped stickers and stick them on walls (ties into Neural Dance)

- State: **open** | Created: 2026-10-22 14:06 PDT | Closed: — | Labels: tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/307

<details><summary>Body excerpt</summary>

```
TJ, Oct 22 2026 2:06 PM PT, stretch goal for the sticker bot (https://github.com/timothyjosephmurphy/studio-tracker/issues/306): the stickers it drops can be picked up, carried, and stuck onto walls, and this works with the Neural Dance simulation (for example, each sticker shows a pose captured from the sim, or placed stickers feed back into it). Stickers are decals on walls, never cover paintings, are capped in number for performance, and reset on reload unless TJ wants them to persist. Owner: Gallery. After the sticker bot card.
```

</details>

### #465 — Neural Dance sticker bot: real strip art + beam aim polish (#306/#307)

- State: **closed** | Created: 2026-10-26 16:41 PDT | Closed: 2026-10-26 16:55 PDT | Labels: galleries-3d, agent-proposed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/465

<details><summary>Body excerpt</summary>

```
Agent-proposed (Gallery overnight invent / Creative burn wake ~4:40 PM PT Oct 26). Estimate: **3 pts**.

## Dedupe
Does not replace #306 / #307 / #283 / #404 (those are the bot, wall-stick, booth, meshopt). This is the next polish once the 3-leg bot is LIVE on preview-251.

## Do (preview-251)
1. Replace stand-in strip textures (`moo-cards/stickers-metallic`) with real sticker-strip art (coordinate with Visual if packs are missing).
2. Make the projector beam always aim the Neural Dance wall (today stubs a short forward cone when the wall mesh is not found); keep additive soft look, no walkway block.
3. Smoke: `__stickerBot306.state==='ready'`, `legsFound===3`, `aim==='neural-dance'`; tagsaudit desktop+phone PASS; one preview deploy.

## Out of scope
Outdoor booth (#283), glitter/#393, museum-parity, TJ approval gates.

## Status now
3-leg meshopt GLB + wall-stick + afterPlayable defer already LIVE (see DEPLOY-STICKER-3LEG / DEPLOY-DEFER-STICKER).
```

</details>

### #478 — Visual invent: #307 Neural Dance pose sticker sheet (replace placeholder decals)

- State: **closed** | Created: 2026-10-26 18:00 PDT | Closed: 2026-10-26 18:03 PDT | Labels: galleries-3d, visual, agent-suggested, agent-proposed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/478

<details><summary>Body excerpt</summary>

```
Agent-proposed (Studio manager invent after #477, Oct 26). **Points: 3. Size: M. Impact: High. Board: Backlog.**

## Goal
Replace #307/#306 stand-in painting stickers with Neural Dance pose sprites: RGBA die-cut white border, desktop + phone, ready for Gallery wall-decal / sticker-bot strip art. No TJ ping; no deploy.

## Do (Visual)
- Sticker sheet of ~8–12 dancer silhouette poses (vinyl-cut look: single dark fill, soft paper edge, white die-cut border)
- Individual webps + strip sheet for SlotMouth feed
- Phone variants (~128–160 long side) + desktop (~256–320)
- NOTES + WIRE for Gallery (`/img/play/preview-251/sticker306/` or sibling)
- Preview composite

## Out of scope
- play-tags code / deploy
- Real camera pose capture
- #410 (Blocked on TJ)
- No TJ ping

## Related
#307 stretch, #306 sticker bot (placeholders live: el-zonte / honeybadger / syrenka). VISUAL-ASK-303 item 3.

Owner: Visual. Gallery swaps textures.
```

</details>

### #761 — Hex gallery: plaque beside Neural Dance explaining it (use tjm.art/neural-dance copy)

- State: **closed** | Created: 2026-10-27 11:43 PDT | Closed: 2026-10-31 10:16 PDT | Labels: studio-manager, galleries-3d, tj-directed, gallery
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/761

<details><summary>Body excerpt</summary>

```
## Directed by TJ (Oct 27 walk)

Put a **plaque near the Neural Dance simulation** in the hex courtyard that explains what it is, using text from the webpage: https://tjm.art/neural-dance/

Shot: `/workspace/gallery-tj-feedback/neural-dance-plaque/neural-dance-need-plaque.png` (preview-251, outdoor Neural Dance wall).

### Suggested plaque copy (from the page — trim to fit readable plaque)

**Title:** Neural Dance Mural

**Subtitle:** An interactive prototype for a participatory mural about agency, rhythm, and connection.

**Body (short):**
Neural Dance is a participatory mural that turns individual acts of presence into a shared, living constellation. Dance, music, and projected light make each person’s contribution visible—and let it ripple through the people around them.

**Optional second panel / longer aim+click (from “Why make it?” / intended experience):**
As AI and automation take on more of our labor and decision-making, what will it mean to exercise human agency? Neural Dance
```

</details>

### #762 — Hex gallery: Neural Dance desktop click adds dancer (any tool) + “click to add” tooltip

- State: **closed** | Created: 2026-10-27 11:44 PDT | Closed: 2026-10-31 10:16 PDT | Labels: studio-manager, galleries-3d, tj-directed, gallery
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/762

<details><summary>Body excerpt</summary>

```
## Directed by TJ (Oct 27 walk)

In the hex gallery Neural Dance simulation:

1. **Desktop click** on the Neural Dance surface should **add a dancer/dot**, same as mobile tap already does.
2. This must work **no matter which tool is selected** (Soup Thermos, Gravity Gun, etc.) — don’t steal the click for the held tool.
3. When crosshairs are over the Neural Dance surface, show a small tooltip: **“click to add”**.

Related: #761 plaque, #288. Shot context: `/workspace/gallery-tj-feedback/neural-dance-plaque/neural-dance-need-plaque.png`.

Queue with Neural Dance / interaction work (near B3 or B8; don’t block B1 #746).
```

</details>

### #792 — Neural Dance: mic frequency sensitivity (bass / kick / snare / hi-hat → dancers)

- State: **closed** | Created: 2026-11-04 09:34 PST | Closed: 2026-11-05 09:09 PST | Labels: website, studio-manager, in-progress, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/792

<details><summary>Body excerpt</summary>

```
## Goal
Make the Neural Dance interactive mural on tjm.art (`/neural-dance/`, vermillionaurora) **sound-sensitive to the room** via the device microphone, so real music drives the dancers instead of (or in addition to) the demo’s synthetic audio.

## Behavior
- Request mic access with `getUserMedia`; degrade gracefully if denied/unavailable (keep existing Start simulation / Audio on path).
- Analyze live audio into frequency bands that map to dancer types already in the sketch: **Kick**, **Bass**, **Mid/Snare**, **Treble/Hi-hat** (tune bands + onset detection so hits fire cleanly, not constant noise).
- Onsets / energy in each band **activate the matching dancers** on the mural (pulse / swell / flash consistent with current Kick/Bass/Mid/Treble personalities).
- Works on typical phones and laptops in a noisy room; include a simple on/off control and visible status (listening / muted / no mic).

## Context
- Repo: `timothyjosephmurphy/vermillionaurora` — page under `neural-dance/`.
- De
```

</details>

### #793 — Neural Dance: external video feed detects new stickers on the wall

- State: **open** | Created: 2026-11-04 09:34 PST | Closed: — | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/793

<details><summary>Body excerpt</summary>

```
## Goal
Get Neural Dance set up with an **external video feed** that recognizes when **new stickers** are put up on the physical mural wall, so those placements can join the live dancer network.

## Behavior
- Accept a camera / external video input aimed at the mural wall (browser and/or a small companion path as needed for the installation).
- Detect newly placed stickers (silhouette shapes / high-contrast stickers against the mural) vs the previous frame or a baseline layout.
- On detection: create or update a dancer at that wall position in the Neural Dance simulation (or feed coords into the existing placement model).
- Stable under typical gallery lighting; ignore people walking in front of the wall when possible; clear UI/status for camera connected / scanning / last detection.

## Context
- Repo: `timothyjosephmurphy/vermillionaurora` — `/neural-dance/`.
- Page copy already describes: photo booth → silhouette stickers on mural → fixed camera locates silhouettes → projector light
```

</details>

### #794 — Neural Dance: rewrite core in C++ (WASM) for high-load speed

- State: **closed** | Created: 2026-11-04 09:40 PST | Closed: 2026-11-05 09:09 PST | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/794

<details><summary>Body excerpt</summary>

```
## Goal
Redo Neural Dance’s performance-critical core in **C++** so the mural stays smooth when many dancers, pulses, mic analysis, and (later) video sticker detection are all running.

## Direction
- Prefer **C++ → WebAssembly** for the tjm.art `/neural-dance/` page so the site stays one URL, with a path toward the same C++ core in a native/installation binary later if needed.
- Move simulation tick, network pulses, and (with #792) frequency-band onset analysis into the C++/WASM module; keep thin JS/HTML for canvas UI, mic/camera permissions, and page chrome.
- Target: no visible lag under a full dancer set + live mic; room to add #793 video without melting the main thread.

## Related
- [#792](https://github.com/timothyjosephmurphy/studio-tracker/issues/792) mic frequency → dancers (in progress; fold into C++ audio analysis where practical).
- [#793](https://github.com/timothyjosephmurphy/studio-tracker/issues/793) external video / new stickers (backlog).
- Repo: `timothyjosephmurphy
```

</details>

### #795 — Neural Dance camera: iPhone Continuity Camera picker + live preview

- State: **open** | Created: 2026-11-05 11:25 PST | Closed: — | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/795

<details><summary>Body excerpt</summary>

```
Add a camera picker through getUserMedia that lists iPhone Camera, plus a live preview.

Parent: #793 (Neural Dance pink post-it camera mode). TJ ask Nov 5 2026.
```

</details>

### #796 — Neural Dance camera: 4-corner wall calibration (homography) saved in localStorage

- State: **open** | Created: 2026-11-05 11:25 PST | Closed: — | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/796

<details><summary>Body excerpt</summary>

```
Click the four wall corners to map the camera view onto the canvas. Keep the calibration across reloads.

Parent: #793 (Neural Dance pink post-it camera mode). TJ ask Nov 5 2026.
```

</details>

### #797 — Neural Dance camera: pink post-it detection + sensitivity sliders

- State: **open** | Created: 2026-11-05 11:25 PST | Closed: — | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/797

<details><summary>Body excerpt</summary>

```
HSV pink detection with sliders for hue/saturation sensitivity and minimum blob size. Debounce so a marker appears within 1-2 s of a note going up and clears when it comes down.

Parent: #793 (Neural Dance pink post-it camera mode). TJ ask Nov 5 2026.
```

</details>

### #798 — Neural Dance camera: feed detected post-its into dancer/marker system

- State: **open** | Created: 2026-11-05 11:25 PST | Closed: — | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/798

<details><summary>Body excerpt</summary>

```
Detected post-its become markers the dancers react to. Ties into the #793 marker lines.

Parent: #793 (Neural Dance pink post-it camera mode). TJ ask Nov 5 2026.
```

</details>

### #799 — Neural Dance: circular live-waveform bloom around each dancer

- State: **closed** | Created: 2026-11-05 11:37 PST | Closed: 2026-11-05 14:32 PST | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/799

<details><summary>Body excerpt</summary>

```
TJ Nov 5 2026: replace each dancer's bloom with a circular sound wave drawn from the actual live audio that dancer is responding to (its band: kick/bass/snare/hi-hat), e.g. a radial oscilloscope/waveform ring from the AnalyserNode time-domain data, band-filtered per dancer. Works in Listen (mic) and Room music. Follow-on after camera mode (#795–#798).
```

</details>

### #800 — Neural Dance: silence gate, dancers still when room is quiet

- State: **closed** | Created: 2026-11-05 11:39 PST | Closed: 2026-11-05 14:32 PST | Labels: website, studio-manager, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/800

<details><summary>Body excerpt</summary>

```
TJ Nov 5 2026: when there's no music, dancers must be still. Auto-calibration/AGC must not normalize silence or background noise up into motion. Add a noise floor/gate: measure ambient level, require signal well above floor (plus music-like onset/spectral activity) before dancers react; cap AGC gain at low input; smooth release to stillness. Add a 'quiet threshold' slider. Applies to Listen (mic) and Room music. Queue after camera mode (#795–#798) with #799.
```

</details>

### #801 — Neural Dance camera: detect dancer-silhouette stickers (follow-on to pink post-its)

- State: **open** | Created: 2026-11-05 11:43 PST | Closed: — | Labels: —
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/801

<details><summary>Body excerpt</summary>

```
Follow-on to #797/#798 under #793.

TJ wants camera mode to also detect the dancer-silhouette stickers: dark gray/black vinyl dancer silhouettes, about post-it size, on the wall. They should feed the same marker/dancer system the post-its use. TJ shared a photo of the sticker sheet in chat on 2026-11-05.

Order: build this in parallel on its own branch, without touching the files the post-it work is changing. Merge and deploy only after TJ confirms the pink post-it detection works live, and only after the #799/#800 deploys.

Ideas: dark-blob segmentation against a light wall plus shape filtering (aspect ratio, solidity, size), with a detection mode toggle (Pink / Dancer stickers / Both) and a sensitivity slider.
```

</details>

### #818 — Neural Dance (deep backlog, Phase 1): wearable LED blink-code pins + dance-floor camera → project live dancer sprites onto a painting

- State: **open** | Created: 2026-11-05 17:01 PST | Closed: — | Labels: website, tjm-art, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/818

<details><summary>Body excerpt</summary>

```
## Deep Backlog — Phase 1 (One-Way Optical Wearable Pins → Live Painting Projection)

> **Status:** Deep backlog / future R&D — **do not start** until TJ explicitly prioritizes it ahead of active Neural Dance installation work.

### Concept (TJ, Nov 5, 2026)
Instead of placing physical post-its or silhouette stickers on the wall/painting, partygoers on the dance floor wear a small **hat pin / lapel badge** that flashes a **distinct LED blink sequence** (unique optical ID per person, no two-way radio required in Phase 1).

1. **Dance-floor camera tracking:** An overhead or elevated room camera watches the dance floor, decodes each pin's flashing LED sequence to identify *who* is *where* (`(x, y)` floor map), and measures each person's movement / state of dancing over time.
2. **Live sprite projection onto a painting:** Using that live floor map + dancing state, a projector maps and projects each person's corresponding **dancer sprite** directly onto a painting on the wall — so real peop
```

</details>

### #819 — Neural Dance (deep backlog, Phase 2 stretch): two-way wireless addressable LED pins for crowd-wide light patterns across the dance floor

- State: **open** | Created: 2026-11-05 17:01 PST | Closed: — | Labels: website, tjm-art, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/819

<details><summary>Body excerpt</summary>

```
## Deep Backlog — Phase 2 Stretch Ambition (Two-Way Wireless Addressable Crowd Pins)

> **Status:** Deep backlog / stretch ambition — **do not start** until Phase 1 optical tracking is proven and TJ explicitly greenlights hardware/firmware R&D.

### Concept (TJ, Nov 5, 2026)
Building on Phase 1's wearable LED hat pins and overhead dance-floor camera map:

1. **Spatial awareness + wireless addressability:** Each wearable pin has a unique ID tracked on the dance floor by the camera system (or flashes/reports its state), **and** receives live wireless commands from a central controller.
2. **Choreographed crowd-wide light patterns:** Because the controller knows every wearer's real-time `(x, y)` position on the dance floor and can address each pin individually (or broadcast spatial wave equations), it can sweep **coordinated light patterns, ripples, beat strobes, and color waves** physically across the people on the dance floor in sync with the music and the projected painting visuals.

#
```

</details>

### #820 — Blog post: Neural Dance "Paradise Dystopia" party painting — process photos + time-lapse

- State: **open** | Created: 2026-11-05 17:01 PST | Closed: — | Labels: website, writer, tjm-art, blocked-on-tj, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/820

<details><summary>Body excerpt</summary>

```
## Goal
Write and publish a blog post on `tjm.art/blog/` featuring the new painting TJ is creating for the **Neural Dance "Paradise Dystopia" party**, incorporating his **in-progress studio photos** and **time-lapse video** of the painting coming together.

## Assets Captured So Far
- **Progress photo #1 (Nov 5, 2026, 5:00 PM PT):**
  - Shared box path: `/home/box/agent-data/studio-assets/neural-dance-paradise-dystopia-2026-11-05/progress-2026-11-05-1700-orig.jpg` (5712×4284, radiant yellow/gold sunburst sky with green/orange rays breaking over a deep plum, violet, and burnt-copper landscape on the studio table).
- **Coming from TJ when finished:**
  - Additional process photos
  - Full time-lapse video of the painting session
  - Final finished painting photo + title/dimensions/listing details

## Standing Blog Requirements
- Prominently call out that collectors can **pay with Bitcoin** (near purchase/checkout CTA, not buried), alongside Apple Pay / card checkout as relevant.
- Connec
```

</details>

### #821 — Neural Dance (FRONT OF BACKLOG): interactive demo simulating RGB blink-code clips + 2-iPhone 3D stereo localization → painting projection

- State: **open** | Created: 2026-11-05 17:13 PST | Closed: — | Labels: tjm-art, galleries-3d, tj-directed, gallery, priority
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/821

<details><summary>Body excerpt</summary>

```
## Priority — Pulled to Front of Backlog by TJ (Nov 5, 2026 ~5:12 PM PT)

TJ wants to **demonstrate** the wearable blink-coded LED pin + two-iPhone 3D room tracking + projected painting sprite pipeline right away in software, ahead of ordering physical hardware and ahead of the remaining `website-audit` batches (after any in-flight Batch 1 / Batch 2 deploy finishes cleanly).

### What to Build (Interactive Web Demo — e.g. `/neural-dance/pins/` or a dedicated mode/link from `/neural-dance/`)
Model the end-to-end Phase 1 optical tracking & projection system honestly — using the **actual signal-processing & stereo-triangulation math** (not faked/cheated ground truth!) so TJ can demo how the two iPhones decode blink patterns and reconstruct 3D dancer positions:

1. **Simulated 3D Dance Floor + Dancers Wearing RGB Blink-Code Clips:**
   - 3D room / dance floor with ~8–25 simulated partygoers moving, grooving, and jumping in `(X, Y, Z)` (plus ability to add/drag dancers, toggle standing stil
```

</details>

### #822 — Neural Dance (deep backlog + 3D sim): DMX / moving-head lighting rig aimed into 3D space to spotlight tracked dancers

- State: **open** | Created: 2026-11-05 17:27 PST | Closed: — | Labels: tjm-art, galleries-3d, tj-directed, gallery
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/822

<details><summary>Body excerpt</summary>

```
## Deep Backlog — Physical 3D-Targeted Room Lighting Rig (DMX / Art-Net Moving Heads Tracking Dancers)

> **Status:** Deep backlog for physical hardware — **simulated early in the `#821` Three.js 3D room demo** so TJ can preview and play with it right away!

### Concept (TJ, Nov 5, 2026 ~5:26 PM PT)
Once the two-iPhone stereo system (#818) reconstructs each pin-wearing dancer's real-time 3D room position `(X̂, Ŷ, Ẑ)` and dancing energy:

1. **Aim real lights into 3D space onto the dancers:** A computer-controlled lighting rig (e.g. ceiling/truss-mounted compact DMX512 / Art-Net / sACN RGBW moving-head spot/beam fixtures, or a high-lumen projector acting as a spatial spotlight) aims beams of light directly into the 3D room to **illuminate individual dancers** as they move!
2. **Behaviors enabled by knowing `(X̂, Ŷ, Ẑ)` + dance energy + ID:**
   - **Follow-spots on top movers:** Automatically lock moving-head beams onto the 2–4 people grooving/jumping hardest on the beat, or follow s
```

</details>

### #823 — Neural Dance (backlog): Generalize Neural Dance energy & wave algorithm to 3D space (3D dance floor)

- State: **open** | Created: 2026-11-05 17:40 PST | Closed: — | Labels: tjm-art, galleries-3d, tj-directed
- URL: https://github.com/timothyjosephmurphy/studio-tracker/issues/823

<details><summary>Body excerpt</summary>

```
## Backlog — 3D Volumetric Neural Dance Algorithm (Energy Moving Through a 3D Dance Floor / Space)

> **Status:** Backlog — prepare the core Neural Dance simulation & energy-propagation algorithm to operate natively in **3D `(X, Y, Z)`**, rather than only on a flat 2D `(u, v)` canvas plane.

### Concept (TJ, Nov 5, 2026 ~5:39 PM PT)
Right now, the Neural Dance engine models dancers, gravity/attraction, wander, audio-band energy pulses, and wave/field propagation across a **2D plane** (the flat wall/painting surface). Once dancers are tracked in real 3D room coordinates `(X̂, Ŷ, Ẑ)` (`#818`) — including vertical bounce/jumping, multi-level platforms/stairs, overhead rigs (`#822`), and wearable wireless clips (`#819`) — the **dance floor itself is three-dimensional**, and the Neural Dance energy should move through **3D space**:

1. **Dimension-agnostic / 3D Core State (`Vec3` + 3D Energy Field):**
   - Generalize dancer/node positions, velocities, spring/gravity attraction, wander vec
```

</details>

## Local non-web branches catalog

### housing/booth design doc

- Path: `/workspace/neural-dance-booth/design.md`
- mtime: 2026-10-29 17:53 PDT
- Tracker: #283
- Notes: Self-contained outdoor sticker booth for Friends Club; Silhouette Cameo vinyl strip; projector companion unit; $2k / June 2027 deadline. Mentions XGIMI Halo+ class as recommended portable projector (~$550-600).

### painting progress photo

- Path: `/home/box/agent-data/studio-assets/neural-dance-paradise-dystopia-2026-11-05/progress-2026-11-05-1700-orig.jpg`
- Also: `/workspace/studio-assets/neural-dance-paradise-dystopia-2026-11-05/progress-2026-11-05-1700.jpg`
- mtime: 2026-11-05 17:00 PST
- Tracker: #820, #821
- Notes: In-progress Paradise Dystopia party painting (sky-on-top after EXIF/rotate used in pins demo).

### wearable LED clip Option 2A manufacturing pack

- Path: `/workspace/neural-dance-clip-2a/`
- Also: `/home/box/agent-data/neural-dance-clip-2a/`
- mtime: 2026-11-05 17:32–17:48 PST
- Tracker: #818, #821
- Notes: CH592F wearable LED clips (qty 12) + ESP32-C3 Wi-Fi→BLE bridge. Includes JLCPCB Gerbers, BOM, CPL, KiCad PCB/schematic, PCB renders, compiled firmware (.bin/.hex), order+firmware zip bundle.
- Key files:
  - `hardware/gerbers_nd_clip_2a_v1.zip`
  - `hardware/bom_jlcpcb_nd_clip_2a_v1.csv`
  - `hardware/cpl_jlcpcb_nd_clip_2a_v1.csv`
  - `hardware/nd_clip_2a_v1.kicad_pcb`
  - `firmware/ch592f-clip/nd_clip_2a.bin`
  - `firmware/esp32c3-bridge/`
  - `nd_clip_2a_order_and_firmware_bundle.zip`
  - `docs/CH592F_PROGRAMMING_PINOUT.md`

### Three.js pin simulator (local + PR #790)

- Path: `/workspace/neural-dance-pins/`
- mtime: 2026-11-05 17:17–18:51 PST
- Tracker: #821, #822
- Notes: Standalone Vite/Three.js demo for RGB blink-code clips, 2-iPhone stereo triangulation, Paradise Dystopia sprites, Phase 2 crowd wave, 4 ceiling moving heads. Destined for /neural-dance/pins/ via VA PR #790.

### blog drafts + share images

- Path: `/workspace/creative/blog/neural-dance-ai-draft*.md`
- Also: `/workspace/creative/blog/week-2026-10-18-images/tjm-art-neural-dance-simulation-*.webp`
- mtime: 2026-10-18 onward
- Tracker: #34, #140, #820
- Notes: AI/human-agency Neural Dance blog drafts (v1–v5) tied to tracker #34/#140.

### 3D gallery Neural Dance plaque + sticker assets

- Path: `/workspace/gallery-tj-feedback/neural-dance-plaque/`
- Also: `/workspace/gallery-courtyard/neural-dance-stickers-307`
- mtime: gallery work Oct 2026
- Tracker: #306, #307, #761, #762
- Notes: Hex/tag gallery plaque and sticker-bot assets; live gallery source also has gallery-courtyard/sticker-bot in timothyjosephmurphy/gallery-source.

## Open work snapshot (at generation time)

**Open VA PRs:** #783 Detect dancer-silhouette stickers in Neural Dance camera mode, #790 Add the standalone Neural Dance pin simulator at /neural-dance/pins/

**Open tracker issues:** #34, #283, #288, #306, #307, #793, #795, #796, #797, #798, #801, #818, #819, #820, #821, #822, #823

**Closed tracker issues:** #140, #274, #465, #478, #761, #762, #792, #794, #799, #800

## Ongoing log policy (for maintainers)

1. After each TJ ask that creates/changes ND scope, append a row to the Prompt → feature map with PT timestamp, quote/summary, tracker issue, and PR.
2. Prefer linking studio-tracker issue numbers; open VA PRs from Website and paste the PR URL into the same row when merged.
3. Keep this file in sync in both vermillionaurora `docs/` (canonical product history) and studio-tracker (backlog mirror).
4. Non-web artifacts (PCB packs, painting photos, booth design) stay on the shared box under `/workspace/neural-dance-*` and `/home/box/agent-data/studio-assets/`; reference paths here, do not commit large binaries to git unless explicitly asked.

---

_Machine-readable twin: `repo-and-tracker-history.json` in the same folder._

---

## 8. Ongoing Maintenance Protocol

**Goal:** Every new TJ Neural Dance prompt and every shipped PR/issue stays appended here (and mirrored to GitHub + Library Page) within the same work session when possible.

### When TJ asks for something Neural Dance–related

1. **Capture the prompt** with chat id (`[t####u]` or teammate transcript pos), approximate PT timestamp, and fidelity tag (`verbatim` preferred).
2. **Open or update a `studio-tracker` issue** in Project #1 (TJ Studio) with queue position / ON HOLD / deep-backlog clearly stated.
3. **Append a new `nd-####` entry** to §4 (or a dated subsection) of this file: Prompt → Created/changed → Evolution.
4. **Update §3 Tonight’s queue / current status table** (or replace with a dated “Current queue” table).
5. **When a PR merges or a Gallery deploy ships**, add the merge SHA, PR link, and live URL to §5 and the repo appendix.
6. **Push to GitHub:** keep canonical copy at `vermillionaurora/docs/neural-dance-project-history.md` (and optionally mirror path on `studio-tracker`). Library Page should link the same content.
7. **Do not rewrite history** — append; mark superseded PRs as folded/closed with pointers (e.g. #781/#782 → #784; #783 → #794).
8. **Parallelize** (`[t2199u]`, `[t2210u]`): history logging must not block camera/hardware deploys — use a separate worker.

### Source-of-truth order on conflict

1. TJ verbatim chat messages  
2. Open `studio-tracker` issue bodies TJ approved  
3. Merged vermillionaurora / gallery-source commits & PR descriptions  
4. Studio manager / teammate paraphrases & shared memory  

### Related living surfaces

- Canonical GitHub copy: `docs/neural-dance-project-history.md` ([PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795))
- Brain summary: `/workspace/brain/projects/neural-dance.md`
- Product: https://tjm.art/neural-dance/ · https://tjm.art/neural-dance/live/ · https://tjm.art/play/?room=neural-dance
- Tracker: https://github.com/timothyjosephmurphy/studio-tracker/issues?q=neural+dance

---

_End of master log — compiled 2026-11-05 ~7:08 PM PT. Append only below this line going forward (or into §4 / §3 as appropriate)._

---

## Release sync — 2026-11-05 ~8:05 PM PT

### VA [PR #794](https://github.com/timothyjosephmurphy/vermillionaurora/pull/794) MERGED — *Launch Neural Dance as an iPhone app and track the wall*
- **Merge commit:** [`e5b7ef36b33eb119085de123794d0f38a4ee8007`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/e5b7ef36b33eb119085de123794d0f38a4ee8007)
- **Merged at:** 2026-11-06T04:05:23Z (2026-11-05 ~8:05 PM PT)
- **Ships:** Home Screen standalone PWA (`display: standalone`, iOS web-app meta, `viewport-fit=cover`); rear/`environment` camera default + `nd.camera.v2`; pink Post-it white-balance + quad-limited anti-feedback; dark dancer-silhouette stickers (`Track: Both`); Align projector success banner + green lock outline + markers-on.
- **Touches:** `neural-dance/*`, `src/pages/neural-dance/**`, `static/neural-dance/manifest.webmanifest`, tests
- **Evolution:** Browser tab demo → installable iPhone stage that fills the phone (incl. when mirrored) and can lock the camera to the projected wall without optical feedback from its own rings.
- **Follow-ons still open:** Option 1 live debug stream ([PR #800](https://github.com/timothyjosephmurphy/vermillionaurora/pull/800) / [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824) / `bc-623cfcbe`); history docs ([PR #795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)). Wave-ring + sim/sticker stats ([PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799)) **MERGED** — see the 8:53 PM sync.

---

## Release sync — 2026-11-05 ~8:53 PM PT

### VA [PR #799](https://github.com/timothyjosephmurphy/vermillionaurora/pull/799) MERGED — *Make live room-mic rings visible and split sim vs sticker counts*
- **Merge commit:** [`b6ebc133f0b748224d0e6c40236b87a8a55f8c6f`](https://github.com/timothyjosephmurphy/vermillionaurora/commit/b6ebc133f0b748224d0e6c40236b87a8a55f8c6f)
- **Merged at:** 2026-11-06T04:53:27Z (2026-11-05 ~8:53 PM PT)
- **Ships:** Room-mic band rings that actually ripple at quiet RMS (silence-gate-aware ringGain + tanh clamp); status HUD splits simulated dancers vs camera stickers/silhouettes (`formatDancerCount`).
- **Touches:** `neural-dance/room-lab.js`, `neural-dance/wave-ring.js`, neural-dance tests
- **Evolution:** After #794’s camera/PWA stage, the live room mic finally drives visible ring motion again, and the HUD truthfully separates sim dancers from physical markers.
- **Follow-ons still open:** Option 1 live debug stream ([PR #800](https://github.com/timothyjosephmurphy/vermillionaurora/pull/800) / [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824) / `bc-623cfcbe`); this history docs PR ([#795](https://github.com/timothyjosephmurphy/vermillionaurora/pull/795)).
