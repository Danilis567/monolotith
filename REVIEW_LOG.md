# MONOLITH — Evaluation Office (`§8`) Review Log

This register documents the independent phase audits and the full 5-auditor Evaluation Office panel conducted against the completed Next.js application (`neo-brutal/`), `/brand` identity system, 27 building monographs, 9 orthographic SVG drafting sheets, and interface specifications.

---

## Pre-Integration Phase Gates

1. **Phase 1 — Brand Identity (`brand-logo`, `brand-color`, `brand-general`)**
   - Independently audited by **Brand Auditor Alpha** (`3a924e89`) and **Brand Auditor Beta** (`fe26c31b`).
   - Resolved all Round 1 brand findings (`#77746C` removed from `< 24px` body ink roles in `tokens-color.css`, Signal Vermilion adaptive split across Dark `#F45D4D` / Plaster `#A81F17` / Limestone `#8B1912`, custom `<path>` wordmark geometry separation from `Bodoni Moda`).
   - **Result:** **PASS** (unanimous).

2. **Phase 2A — Web Structure Specs (`web-copy`, `web-layout`, `web-visual`)**
   - Independently audited by **Web Structure Auditor** (`a7fb0309`).
   - Reconciled canonical dataset (`27` structures across `3` movements `126 CE–PRESENT`, `9` Anatomy plates), `data-surface="plaster"` active toggle contrast fix, unclipped focus wrappers for clipped arch containers, and SVG noise/halftone fallback layering.
   - **Result:** **PASS**.

3. **Phase 2B — Content & Media (`content-writer`, `content-media`)**
   - Independently verified by **Lead Content Auditor** (`22034556`) against Wikimedia Commons sources, exif/image visual inspection, and exact SVG coordinate math.
   - Round 1 `NEEDS REVISION` caught & resolved: `ARC-022` Anıtkabir exterior height (`32.0 M` → `22.8 M EXTERIOR / 17.0 M HALL`), `ARC-026` Sagrada Família ongoing completion framing, `imageAlt` framing rewrites (`ARC-010`, `ARC-011`, `ARC-024`, `ARC-026`), `CREDITS.md` attribution cleanup, and sub-pixel scale reconciliation (`<= 0.01 px` accuracy) on `chartres-cathedral.svg`, `hagia-sophia.svg`, `unite-dhabitation.svg`, `wells-cathedral.svg`, and `national-assembly-dhaka.svg`.
   - **Result:** **PASS**.

---

## Evaluation Office (§8) — Round 1 Independent Panel

All five auditors evaluated the built codebase, CSS Modules, tokens, SVG plates, and specifications **independently without viewing peer scores**. Threshold to pass: overall panel mean `>= 7.0 / 10`.

| Criterion | Brand Alpha (`3a924e89`) | Brand Beta (`fe26c31b`) | Web Auditor (`a7fb0309`) | General Auditor (`7d062de1`) | Content Auditor (`22034556`) | Criterion Mean |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| 1. Originality | 8.5 | 8.0 | 8.8 | 9.0 | 9.2 | **8.70** |
| 2. Reference Alignment | 8.0 | 8.2 | 8.6 | 8.5 | 9.0 | **8.46** |
| 3. Typography | 8.0 | 7.9 | 8.9 | 9.0 | 9.4 | **8.64** |
| 4. Grid & Layout | 7.5 | 7.6 | 8.4 | 8.0 | 9.1 | **8.12** |
| 5. Visual Quality | 8.0 | 8.4 | 8.8 | 8.5 | 9.3 | **8.60** |
| 6. Content Accuracy | 7.5 | 8.4 | 8.7 | 9.5 | 9.5 | **8.72** |
| 7. Motion Restraint | 9.0 | 7.6 | 8.5 | 8.5 | 9.2 | **8.56** |
| 8. Accessibility | 7.0 | 7.0 | 7.1 | 7.5 | 9.3 | **7.58** |
| 9. Cross-Team Consistency | 7.0 | 7.2 | 7.9 | 8.0 | 9.1 | **7.84** |
| **Auditor Mean** | **7.83** (`7.8`) | **7.81** | **8.41** | **8.50** | **9.23** | **8.35 / 10** |

**Round 1 Verdict:** **PASS** (`8.35 / 10 >= 7.0`). *(Note: Lead Content Auditor evaluated after Round 1 content/SVG reconciliations and mid-session accessibility/token fixes landed.)*

---

## Panel Debate, Conflict Resolution & Defect Fixes

1. **Undefined `--surface-basalt` & Header Blur (Unanimous Engineering Defect):**
   - `Brand Alpha`, `Web Auditor`, and `General Auditor` caught `var(--surface-basalt)` evaluating to `transparent` because `brand/tokens-color.css` names Basalt `--surface-elevated`, alongside `backdrop-filter: blur(4px)` in `SiteHeader.module.css`.
   - **Action:** Mapped `--surface-basalt: var(--surface-elevated)` in `src/app/globals.css` `:root` (automatically cascading across Dark, Void, Basalt, Plaster, and Limestone islands) and replaced translucent header glassmorphism with opaque `var(--surface-canvas)` + `backdrop-filter: none`.
2. **Broken `.thesisColumns` & Copy Precision (`HomeClient.tsx`, `home.module.css`):**
   - `Brand Alpha`, `Brand Beta`, and `General Auditor` caught `display: grid` disabling CSS `columns: 2` on `.thesisColumns`, plus `"nine centuries"` overlooking Antiquity (`Pantheon 126 CE`), inverted Band B/C labels (`01.2` before `01.1`), and `ARCHIVE VOL. I` vs `REV. IV` drift.
   - **Action:** Changed `.thesisColumns` to `display: block`, fixed copy to `"nineteen centuries"`, ordered sections `01.1` → `01.2` → `01.3`, and aligned `ARCHIVE VOL. IV`.
3. **WCAG & WAI-ARIA Panel Findings (`HomeClient.tsx`, `ArchiveClient.tsx`, `AnatomyClient.tsx`, `DraftingMarks.tsx`):**
   - Removed conflicting `aria-pressed` from the dynamic-label `PAUSE STREAM` / `PLAY STREAM` button (`SITE_COPY.md`), replaced `var(--ink-muted-large)` (`#77746C`) on small `ScaleRuler` captions and `.input::placeholder` with `--ink-secondary`, upgraded `.cellLink` / `.movementSampleLink` / `.layerBtn` tap targets to `>= 44px`, added programmatic `.focus()` + `Home`/`End` + `role="tabpanel"` to `/anatomy` tabs, wrapped `/anatomy` layer controls in `<fieldset><legend>`, removed redundant nested `role="img"`, added sortable `<th scope="col"><button>` headers + `aria-sort` + `<th scope="row">` + `<caption className="visually-hidden">` + `CLEAR ×` to `02 ARCHIVE`, and upgraded `ArchClipDefs.tsx` lancet paths to exact Pythagorean `11–60–61` circular tangent arcs (`rx=0.61, ry=0.4575` and `ry=0.4067`) + 4-corner mitered `<SteppedFrame>` drafting brackets.
4. **Era Classification Calibration (`src/lib/archiveFilters.ts`):**
   - Resolved `General Auditor`'s flag on Cologne (`1248–1880`) and Milan (`1386–1965`) by classifying eras using `yearStart ?? yearCompleted` so medieval Gothic cathedrals stay under `MEDIEVAL`.

---

## Top 3 Voted Post-Pass Improvement Ideas (Applied & Verified)

Following the passing `8.35 / 10` Round 1 verdict, the top 3 voted refinements across the panel were implemented cleanly in the codebase:

1. **Vote #1 (`HeroEchoParallax` Transform Composition & `Archive` Query/Bucket Polish — 4/5 panelists):**
   - Replaced `transform: translateY(-52%)` on `.echoWrapper` in `src/app/home.module.css` with individual CSS `translate: 0 -52%` so Motion's hydrated `y` scroll transform (`HeroEchoParallax`) never overrides vertical poster centering.
   - Synced `[ PLATE ]` / `[ INDEX ]` view mode to URL query (`?view=plate|index`), expanded secondary `04 ANATOMY ↗` archive card links to `min-block-size: 44px`, and moved `CONCRETE & MARBLE` (National Assembly Dhaka) into `'BÉTON BRUT & CONCRETE'` in `src/lib/archiveFilters.ts`.
2. **Vote #2 (Mobile Semantic Catalog Slips Preserving Native `<table>` Roles — 4/5 panelists):**
   - Replaced CSS `display: block` on `<table role="table">` below `600px` (which stripped native table roles in Safari/VoiceOver) with responsive separation in `ArchiveClient.tsx` + `archive.module.css`: native accessible `<table>` (`>= 600px`) paired with semantic `<ul className="mobileSlipList">` + `<dl>` catalog slips (`< 600px`).
3. **Vote #3 (`04 ANATOMY` Uncalibrated Footer Ruler Removal & Scale Legend Integration — 4/5 panelists):**
   - Removed the redundant decorative `00M–30M` `<ScaleRuler />` beneath the inline orthographic SVG viewport in `src/components/AnatomyClient.tsx` so each sheet's mathematically calibrated `1:200`–`1:1000` vector scale bar operates unambiguously alongside explicit `SCALE` and `DATUM` coordinates in the technical legend bar.
