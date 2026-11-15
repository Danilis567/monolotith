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

---

## Round 2 — Playwright Visual Audit, WCAG Surface-Token Hardening & `10%` Main Content Inset

Following the Round 1 baseline, a comprehensive Playwright multi-viewport inspection (`375×812`, `768×1024`, `1280×800`, `1920×1080`) and visual/structural polish pass were executed and verified against the final English production build:

1. **Surface-on-Surface WCAG AA Contrast Hardening (`brand/tokens-color.css`, `anatomy.module.css`, `detail.module.css`):**
   - Removed the static `:root { --surface-basalt: var(--surface-elevated); }` declaration from `src/app/globals.css` (which locked `--surface-basalt` to `#282828` across light descendant islands) and explicitly re-declared `--surface-basalt`, `--ink-primary`, `--ink-secondary`, `--ink-muted`, and `--signal-ink` inside every `[data-surface]` selector (`dark`/`void`, `basalt`, `light`/`plaster`, `limestone`).
   - On `plaster`/`light` islands (`/structures/[slug]` `.calloutMetricBox` `PRIMARY STRUCTURAL DATUM` and `/anatomy` `.controlsBand`, `.tabButton`, `.plateSelectBtnActive`, `.layerToolbar`, `.legendRow`, `.scheduleSummary`), `--surface-basalt` resolves to `#B9B5AA` with `#131313` (`9.07:1`), `#282828` (`7.20:1`), and `#8B1912` (`4.57:1`) ink—eliminating all 26 WCAG AA contrast violations (`0` remaining across both `plaster` and `void` modes).
2. **Hero Layout, Plate Paspartu Inset & `10%` Main Content Squeeze (`globals.css`, `home.module.css`, `HomeClient.tsx`, `DraftingMarks.tsx`):**
   - **Site-Wide `10%` Main Content Squeeze:** Set `#main-content { --grid-margin: 10%; }` in `src/app/globals.css` while preserving `:root` outer margins (`1rem`–`3rem`) for `<SiteHeader />` and `<SiteFooter />`, pulling all main content grids (`.monolith-grid`, `.surveyStripGrid`, `.filterShell`, and `.specimen-stream-viewport`) `10%` inward on both left and right.
   - **Hero Plate & `<SteppedFrame />` Collision Fix:** Added `0.75rem` paspartu framing to `.heroPlateLink`, moved `<SteppedFrame />` inside `.heroPlateAspect` with `0.75rem` inset top corner L-brackets (clearing the bottom title/caption scrim), increased the hero overlay inset (`insetInline: 1.5rem`, `insetBlockEnd: 1.35rem`), and expanded `.heroPlateCaption` padding (`0.875rem 1.25rem; margin-top: 0.75rem`).
   - **Headline & Fold Containment:** Applied `container-type: inline-size` and `min-inline-size: 0` on `.heroHeadlineCol`, `line-height: 1.04` on `.type-monolith` and `1.06` on `.type-display`, bounded `.heroPlateCol` height within `100dvh`, removed `scrollbar-gutter: stable` dark strip bleed on light islands, and hid `.skip-link:not(:focus):not(:focus-visible)` with `clip-path: inset(50%)`.
3. **Responsive Archive, Anatomy & Anti-AI UI Refinements (`archive.module.css`, `ArchiveClient.tsx`, `AnatomyClient.tsx`, `MotionPrimitives.tsx`, `trellick-tower.svg`):**
   - Raised the `/archive` `[ INDEX ]` table-to-slip breakpoint from `600px` to `1024px` (with a 2-column slip grid on `600px–1023px`) so the 8-column table never clips horizontally at `768px`, made `.filterBand` compact non-sticky on desktop, and added a collapsible `FILTERS [ + / − ]` drawer toggle on `< 768px`.
   - Moved `<CornerCrosshair />` inside `.svgViewport` (`inset: 4px`, `overflow: hidden`) on `/anatomy` to eliminate `375px` horizontal overflow (`docScrollW === innerWidth`), and repositioned callout `02 BOILER HOUSE (+85 M)` in `public/images/anatomy/trellick-tower.svg` to the left margin (`x=125`) clear of the vertical mast axis (`x=251.5`).
   - Upgraded Band D (`THREE ARCHITECTURAL DISCIPLINES`) on `/` to an asymmetric `1.4fr 1fr 1fr` editorial grid, simplified `PlateCurtain` and `HairlineDraw` to render immediately without repetitive scroll-clipping traps, and set `loading="eager"` on horizontal stream and section plates.
4. **Final Verification:**
   - `npx tsc --noEmit`: **PASS (`0` errors)**
   - `npm run lint`: **PASS (`0` warnings / `0` errors)**
   - `npm run build`: **PASS (`33/33` static and SSG routes generated cleanly)**
