# Neural Dance — Authoritative Project & Prompt History

**Living master log** for TJ Murphy’s Neural Dance installation (web → camera/projector → wearables → Friends Club 2027).

| Field | Value |
|-------|-------|
| Owner | TJ Murphy (`timothyjosephmurphy`) |
| Timezone | `America/Los_Angeles` (PT) |
| Compiled | 2026-11-05 ~7:08 PM PT; tracker links confirmed 7:11 PM PT (`#824`–`#826`) |
| Span | 2026-09-14 (`a21f98fd`) → 2026-11-05 evening (`[t2213u]`) |
| Primary GitHub home | [`vermillionaurora/docs/neural-dance-project-history.md`](https://github.com/timothyjosephmurphy/vermillionaurora/blob/main/docs/neural-dance-project-history.md) (target) |
| Tracker home | [`studio-tracker`](https://github.com/timothyjosephmurphy/studio-tracker) Project #1 (TJ Studio) |
| Live product URLs | [tjm.art/neural-dance/](https://tjm.art/neural-dance/) · [tjm.art/neural-dance/live/](https://tjm.art/neural-dance/live/) · [tjm.art/play/?room=neural-dance](https://tjm.art/play/?room=neural-dance) (Kinoteka Annex) |
| Companion Library Page | [Neural Dance project & prompt history](https://cursor.com/canvas/store-05a11f8c-ccd8-4d68-bb9b-07aa5e3ea3cb/7b3e910a-e40a-43c9-8718-3e62e8695925) |
| Companion rebuild sources | `/workspace/nd-history/prompts-timeline.md`, `/workspace/nd-history/repo-and-tracker-history.md` |

> **Fidelity legend:** `verbatim` = TJ’s exact words recovered from chat/transcript · `faithful_paraphrase_via_SM` = Studio manager relay of TJ · `from_tracker` / `from_memory` = reconstructed from issue bodies / shared journal · `from_tracker_and_memory` = both. Every prompt below is labeled.

---

## 1. Evolution arc (one glance)

1. **Genesis (Sep 14–24, 2026)** — Portfolio page + mural sim + dancer roles (`a21f98fd` … PR #2).
2. **Astro port & 3D gallery (Oct)** — PR #673; wall/courtyard live sim (#274, #288); Portal-inspired outdoor sticker booth (#283, #306, #307); hex plaque + click-to-add (#761, #762).
3. **Mic + C++/WASM (Nov 4)** — 4-band room mic + WASM core (#792, #794 → PRs #771, #772, #774).
4. **Controls + pink Post-it camera (Nov 5 AM)** — Controls restore PR #779; pink markers #793/#795–#798 → PR #780; sound-wave rings + silence gate #799/#800 → PRs #781/#782 folded into standalone `/neural-dance/live/` PR #784; grid-over-dancers Auto-Align PR #786.
5. **Hardware + Paradise Dystopia + wearables (Nov 5 afternoon)** — XGIMI Vibe One + Anker Prime weatherproof pod; *Paradise Dystopia* painting (#820); wearable LED blink / 2.4 GHz clips (#818, #819, Option 2A JLCPCB pack + prototype audit: copper-pour short risk → prefer off-the-shelf **XIAO nRF52840** / **ESP32-C3-Zero**); Kinoteka Annex two-room 10 ft / 60° stereo shadow-dancers → energy-balls + painting + 4 moving-head spotlights (#821, #822 — **SHIPPED LIVE** Gallery deploy `867`); 3D volumetric wave backlog (#823).
6. **Live room testing (Nov 5 evening, `[t2187u]`–`[t2213u]`)** — Home Screen PWA, Align HUD banner, 1× Back Camera default, quad-median white-balance + 4-layer optical anti-feedback, `480 px` dark dancer silhouette stickers (#801 / PR #783 folded into unified fast-track **PR #794**), standby white-frame strobe fallback (**tracker [#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** ON HOLD), Option 1 Cloudflare Durable Object WebSocket live debug stream (**tracker [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** queued after PR #794 and the wave-ring fix), waveform-ring mic-gain fix, cheap dedicated Android install plan (**tracker [#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** backlog, `[t2213u]`, 7:11 PM PT), and this living history log (`[t2198u]`, `[t2199u]`, `[t2210u]`).

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
| Remote witness | — → **opt-in 1–2 fps WebSocket debug relay** to Durable Object ([#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824), queued after PR #794 and the wave-ring fix) |
| Install host | iPhone Home Screen PWA → also **cheap dedicated Android device** backlog ([#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826), `[t2213u]`) |

**Key product files (vermillionaurora):**
`src/pages/neural-dance/index.astro`, `src/pages/neural-dance/live/index.astro`, `neural-dance/{camera-markers,live-show,room-lab,silence-gate,wave-ring}.js`, `neural-dance/src/neural_dance.cpp`, `neural-dance/vendor/maptastic.js`.

---

## 3. Tonight’s queue (2026-11-05 ~7:08 PM PT) — authoritative status

| Priority | Item | Tracker / PR | Status |
|----------|------|--------------|--------|
| 0 | Kinoteka Annex two-room 3D sim (shadow dancers → energy balls + *Paradise Dystopia* + 4 moving heads) | [#821](https://github.com/timothyjosephmurphy/studio-tracker/issues/821), [#822](https://github.com/timothyjosephmurphy/studio-tracker/issues/822) | **SHIPPED LIVE** — Gallery deploy `867` at https://tjm.art/play/?room=neural-dance |
| 1 | Unified `/neural-dance/live/` release: Align banner, Back Camera, pink WB + anti-feedback, Home Screen PWA, **dark dancer silhouette @ 480 px** | VA **PR #794** (fast-track; folds [#801](https://github.com/timothyjosephmurphy/studio-tracker/issues/801) / VA PR #783) | In flight ~15–20 min ETA at scrape time |
| 2 | Waveform-ring visibility / mic-gain on `/live/` (TJ `[t2209u]`) | bundled with #1 | Investigating in parallel |
| 3 | **Option 1 live debug stream** (Share live debug → DO WebSocket 1–2 fps frames + telemetry) | **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** | **Queued next** after PR #794 and the wave-ring fix. Option 1 approved (`[t2206u]`–`[t2208u]`) |
| HOLD | Synchronized single-frame white strobe on capture tick | **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** | **ON HOLD** — do not implement unless TJ activates after #1 live test (`[t2205u]`) |
| Backlog | 3D volumetric wave algo | [#823](https://github.com/timothyjosephmurphy/studio-tracker/issues/823) | Open |
| Backlog | Cheap dedicated Android device to run Neural Dance | **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** | **Backlog** — filed 7:11 PM PT (`[t2213u]`) |
| Deep backlog | Wearable LED Phase 1 / 2 + Option 2A pack audit | [#818](https://github.com/timothyjosephmurphy/studio-tracker/issues/818), [#819](https://github.com/timothyjosephmurphy/studio-tracker/issues/819) | Open — prefer XIAO nRF52840 / ESP32-C3-Zero over flawed custom copper pour |

### New tracker issues filed 2026-11-05 7:11 PM PT

Confirmed links (titles as filed). `#824` and `#825` were already in the ~7:08 PM compile; `#826` is the 7:11 PM append.

- **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** — *Neural Dance (/live/): opt-in WebSocket live debug stream (1–2 fps camera/stage frames + telemetry to Durable Object)* — Project #1 item added. TJ chose **Option 1** (`[t2206u]`–`[t2208u]`); queued after PR #794 and the wave-ring fix.
- **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** — *Neural Dance camera [ON HOLD fallback]: synchronized single-frame white strobe on capture tick for clean board view* — Project #1 item added; labeled `blocked-on-tj`. Verbatim hold from `[t2205u]`; held unless needed.
- **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** — *Neural Dance hardware/install: plan for running Neural Dance on a cheap dedicated Android device* — Project #1 backlog item added at 7:11 PM PT (`[t2213u]`).

---

## 4. Nov 5 evening live-room prompts (`[t2187u]`–`[t2213u]`) — append beyond earlier reconstruction

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
- **Created / changed:** Tracker **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** — *Neural Dance camera [ON HOLD fallback]: synchronized single-frame white strobe on capture tick for clean board view* — **ON HOLD** unless needed (`[t2205u]`).

### `nd-0080` — `[t2206u]` Stream to server so agent can witness — **verbatim intent**
> Also, I'd like to know what it would take to actually stream this to the server as well potentially so that you could witness what's happening in real time.
- **Response offered:** Option 1 (1–2 fps WS + telemetry DO) vs Option 2 (30 fps WebRTC).

### `nd-0081` — `[t2207u]` Backlog + queue — **verbatim**
> Add that to the backlog and queue it up after the existing work.

### `nd-0082` — `[t2208u]` Choose Option 1 — **verbatim**
> Go for option one.
- **Created / changed:** Tracker **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)** — *Neural Dance (/live/): opt-in WebSocket live debug stream (1–2 fps camera/stage frames + telemetry to Durable Object)*. Option 1 approved (`[t2206u]`–`[t2208u]`); queued after PR #794 and the wave-ring fix.

### `nd-0083` — `[t2209u]` Missing waveform rings — **verbatim**
> I'm not seeing the waveform-shaped light pulses that we scoped and built earlier in this release. Is that coming up?
- **Created / changed:** Parallel investigate `wave-ring.js` on `/neural-dance/` vs `/neural-dance/live/` + mic-gain path; fix bundled with active release if missing on live page.

### `nd-0084` — `[t2210u]` Parallelize hard — **verbatim**
> Are we, are we paralyzing as much as possible right now?
- **Created / changed:** Parallel workers for tracker issues, history master doc, waveform fix, Library Page, GitHub PR.

### `nd-0085` — `[t2213u]` Cheap dedicated Android device — **from_tracker** (filed 7:11 PM PT)
- **Fidelity:** `from_tracker`
- **Prompt (tracker title):** Plan for running Neural Dance on a cheap dedicated Android device.
- **Created / changed:** Tracker **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** — *Neural Dance hardware/install: plan for running Neural Dance on a cheap dedicated Android device* — added to backlog at 7:11 PM PT. No implementation in this docs PR.

---

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
| 2026-11-05 evening | Live-room camera polish + silhouette + history + debug stream | PR #794 bundle; history; #824/#825 | [#801](https://github.com/timothyjosephmurphy/studio-tracker/issues/801), **[#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824)**, **[#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825)** | VA PR #783 → #794; history PR pending |
| 2026-11-05 7:11 PM | Cheap dedicated Android device to run Neural Dance (`[t2213u]`) | backlog plan only | **[#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)** | — |

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

The section below is the GitHub/API reconstruction (`repo-and-tracker-history.md`), kept intact as the commit/PR/issue source appendix. **Also include tracker issues filed 2026-11-05 7:11 PM PT:** [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824), [#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825), and [#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826) (not present in the 18:55 PST scrape). Commit SHAs in this appendix were checked against `vermillionaurora` `git log` on 2026-11-06; every referenced commit resolves.

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
| 2026-11-05 ~18:50 PT | Make a living project-history document (Page + GitHub) listing prompts→features; keep ongoing; reconstruct from repo | This reconstruction under /workspace/nd-history/; recommended GitHub paths below | — | — |

## Chronological eras

### Genesis — page + mural sim (2026-09-14 → 2026-09-24)

Neural Dance page added to tjm.art portfolio; story copy, silhouette mural photo, mapped mural simulation, resource guards, homepage link moved under Friends Club.

**Commits**

- `a21f98fd` 2026-09-14 15:28 PDT — Add neural-dance page to navigation and portfolio
- `8305ac1f` 2026-09-21 12:32 PDT — Explain Neural Dance motivation, participatory installation, and prototype use
- `528b02a0` 2026-09-21 12:33 PDT — Add participant silhouette mural photograph to Neural Dance project story
- `95624dbb` 2026-09-21 12:46 PDT — Protect Neural Dance simulation from runaway browser resource use
- `a0c5db16` 2026-09-21 12:54 PDT — Restore reliable dancer rhythms and direct bounded neighbor reinforcement
- `a5c814ce` 2026-09-21 13:12 PDT — Add mapped mural simulation to the bottom of Neural Dance
- `b7f172c1` 2026-09-21 13:26 PDT — Lead with project explanation and mural simulation on Neural Dance
- `e7fd7670` 2026-09-21 13:29 PDT — Move project details below mural simulation and remove standalone photo
- `64ccc62d` 2026-09-24 13:56 PDT — Reorder homepage sections and move Neural Dance link to Friends Club

**PRs**

- [PR #2](https://github.com/timothyjosephmurphy/vermillionaurora/pull/2) [CLOSED] merged — — Add dancer roles to Neural Dance
  - Files: neural-dance/index.html

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

**Open tracker issues:** #34, #283, #288, #306, #307, #793, #795, #796, #797, #798, #801, #818, #819, #820, #821, #822, #823, [#824](https://github.com/timothyjosephmurphy/studio-tracker/issues/824), [#825](https://github.com/timothyjosephmurphy/studio-tracker/issues/825), [#826](https://github.com/timothyjosephmurphy/studio-tracker/issues/826)

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

- This file: `/workspace/nd-history/neural-dance-project-history.md` (box compile path)
- Brain summary: `/workspace/brain/projects/neural-dance.md`
- Companion Library Page: https://cursor.com/canvas/store-05a11f8c-ccd8-4d68-bb9b-07aa5e3ea3cb/7b3e910a-e40a-43c9-8718-3e62e8695925
- Product: https://tjm.art/neural-dance/ · https://tjm.art/neural-dance/live/ · https://tjm.art/play/?room=neural-dance
- Tracker: https://github.com/timothyjosephmurphy/studio-tracker/issues?q=neural+dance

---

_End of master log — compiled 2026-11-05 ~7:08 PM PT; `#824` / `#825` / `#826` links confirmed and `#826` appended 7:11 PM PT (`[t2213u]`). Append only below this line going forward (or into §4 / §3 as appropriate)._
