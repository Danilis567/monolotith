# MONOLITH — Phase 2 Root-Cause Investigation & Comprehensive UI Audit (`BUGS.md`)

> **Build Audited:** Next.js 16.4.6 Production Server (`npx next start`, commit `1f99a4d`)  
> **Browser Engine:** Playwright Chromium (`1254`, headless)  
> **Viewports Scanned:** `375×812`, `768×1024`, `1280×800`, `1920×1080` + **43-step Hero & Thesis sweep (`320px–1920px` in `40px` increments + `375px` & `768px`)**  
> **Visual Evidence Directory:** [audit-screenshots/before/](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/)

---

## 1. H1 & H2 Deep Root-Cause Analysis (`getComputedStyle` + `[data-surface]` + `@supports (color: light-dark(...))`)

### 1.1 Exact `getComputedStyle` Telemetry on `/structures/habitat-67` (H1)

- **Screenshot Evidence:**
  - [h1-habitat-67-calloutMetricBox-crop.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h1-habitat-67-calloutMetricBox-crop.png)
  - [h1-habitat-67-analysis-band-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h1-habitat-67-analysis-band-1280.png)
  - [route-structure-habitat-67-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-habitat-67-1280-full.png)
  - [route-structure-habitat-67-375-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-habitat-67-375-full.png)

| Element / Selector | Text Content | `el.closest('[data-surface]')` | `colorScheme` | `backgroundColor` (Hex) | `color` (Hex) | `borderColor` (Hex) | Contrast Ratio | `--surface-basalt` | `--surface-canvas` | `--ink-primary` | `--ink-secondary` | `--signal-ink` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `html` (`:root`) | — | `html[data-surface="dark"]` | `dark only` | `rgb(19, 19, 19)` (`#131313`) | `rgb(233, 229, 223)` (`#E9E5DF`) | — | **14.81:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `section.ledgerBand` | `03.1 — COLOPHON...` | `section[data-surface="basalt"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **11.75:1** | `#282828` | `#282828` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `section.analysisBand` | `03.2 — ARCHITECTURAL ANALYSIS` | `section[data-surface="plaster"]` | `light only` | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **14.81:1** | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |
| `div.calloutMetricBox` | `PRIMARY STRUCTURAL DATUM...` | `section[data-surface="plaster"]` *(no own `data-surface`!)* | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **9.07:1** | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |
| `.calloutMetricBox > span.type-colophon` | `"PRIMARY STRUCTURAL DATUM"` | `section[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#B9B5AA`) | `rgb(139, 25, 18)` (`#8B1912`) | `rgb(139, 25, 18)` (`#8B1912`) | **4.57:1** *(borderline)* | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |
| `.calloutMetricBox > p` ( datum ) | `"36.0 M (12 STOREYS)"` | `section[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **9.07:1** | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |
| `.calloutMetricBox > p.type-colophon` | `"354 PREFAB MODULES"` | `section[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#B9B5AA`) | `rgb(40, 40, 40)` (`#282828`) | `rgb(40, 40, 40)` (`#282828`) | **7.20:1** | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |
| `div.observationRow` | `OBS. 01 — PRIMARY MATERIAL` | `section[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#E9E5DF`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(119, 116, 108)` (`#77746C`) | **14.81:1** (border: **3.72:1**) | `#b9b5aa` | `#e9e5df` | `#131313` | `#282828` | `#8b1912` |

---

### 1.2 Exact `getComputedStyle` Telemetry on `/anatomy` in `plaster` and `void` Modes (H2)

- **Screenshot Evidence:**
  - [h2-anatomy-plaster-1280-top.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h2-anatomy-plaster-1280-top.png)
  - [h2-anatomy-controlsBand-plaster.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h2-anatomy-controlsBand-plaster.png)
  - [h2-anatomy-void-1280-top.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h2-anatomy-void-1280-top.png)
  - [route-anatomy-plaster-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-plaster-1280-full.png)
  - [route-anatomy-void-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-void-1280-full.png)

#### A. `/anatomy` — Default `plaster` Mode (`<div data-surface="plaster">`)

| Element / Selector | Text Content | `el.closest('[data-surface]')` | `colorScheme` | `backgroundColor` (Eff. Hex) | `color` (Hex) | `borderColor` (Hex) | Text Contrast | Border Contrast | `--surface-basalt` | `--ink-primary` | `--ink-secondary` | `--signal-ink` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.controlsBand` | Filter bar wrapper | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **9.07:1** | **9.07:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.tabButtonActive` (`#tab-ALL`) | `"ALL PLATES (09)"` | `div[data-surface="plaster"]` | `light only` | `rgb(19, 19, 19)` (`#131313`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(19, 19, 19)` (`#131313`) | **14.81:1** | **9.07:1** (vs `#B9B5AA`) | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.tabButton` (`#tab-Brutalist`, `#tab-Gothic`, `#tab-Monumental`) | `"01 / BRUTALIST"` etc. | `div[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(40, 40, 40)` (`#282828`) | **9.07:1** | **7.20:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.plateSelectBtnActive` | `"PLATE I · CAT. 001..."` | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | bottom: `#282828`, left: `#8B1912` | **9.07:1** | **7.20:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.plateSelectBtnActive > span.type-colophon:first-child` | `"PLATE I · CAT. 001 / SCALE 1:500"` | `div[data-surface="plaster"]` | `light only` | `rgba(0, 0, 0, 0)` (eff: `#B9B5AA`) | `rgb(139, 25, 18)` (`#8B1912`) | — | **4.57:1** *(borderline)* | — | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.plateSelectBtn:hover` | Non-active plate hover | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | bottom: `rgb(119, 116, 108)` (`#77746C`) | **9.07:1** | **2.28:1 (FAIL < 3:1!)** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.layerToolbar` | Layer buttons bar | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **9.07:1** | **9.07:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.layerBtnActive` | `"STRUCTURAL MASS"` etc. | `div[data-surface="plaster"]` | `light only` | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(19, 19, 19)` (`#131313`) | **14.81:1** | **14.81:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.legendRow` | `"SOLID INK: LOAD-BEARING..."` | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(40, 40, 40)` (`#282828`) | **9.07:1** (signal span: **4.57:1**) | **7.20:1** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |
| `.scheduleSummary` | `"STRUCTURAL DIMENSION SCHEDULE..."` | `div[data-surface="plaster"]` | `light only` | `rgb(185, 181, 170)` (`#B9B5AA`) | `rgb(19, 19, 19)` (`#131313`) | top of `.scheduleTable`: `#77746C` | **9.07:1** | **2.28:1 (FAIL < 3:1!)** | `#b9b5aa` | `#131313` | `#282828` | `#8b1912` |

#### B. `/anatomy` — Toggled `void` Mode (`<div data-surface="void">`)

| Element / Selector | Text Content | `el.closest('[data-surface]')` | `colorScheme` | `backgroundColor` (Eff. Hex) | `color` (Hex) | `borderColor` (Hex) | Text Contrast | `--surface-basalt` | `--surface-canvas` | `--ink-primary` | `--ink-secondary` | `--signal-ink` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.controlsBand` | Filter bar wrapper | `div[data-surface="void"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **11.75:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.tabButtonActive` | `"ALL PLATES (09)"` | `div[data-surface="void"]` | `dark only` | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(19, 19, 19)` (`#131313`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **14.81:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.tabButton` (inactive) | `"01 / BRUTALIST"` | `div[data-surface="void"]` | `dark only` | `rgba(0, 0, 0, 0)` (eff: `#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(185, 181, 170)` (`#B9B5AA`) | **11.75:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.plateSelectBtnActive` | `"PLATE I · CAT. 001..."` | `div[data-surface="void"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(185, 181, 170)` (`#B9B5AA`) | **11.75:1** (signal: **4.58:1**) | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.layerToolbar` | Layer buttons bar | `div[data-surface="void"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **11.75:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.layerBtnActive` | `"STRUCTURAL MASS"` | `div[data-surface="void"]` | `dark only` | `rgb(19, 19, 19)` (`#131313`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **14.81:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.legendRow` | `"SOLID INK: LOAD-BEARING..."` | `div[data-surface="void"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(185, 181, 170)` (`#B9B5AA`) | **11.75:1** (signal: **4.58:1**) | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |
| `.scheduleSummary` | `"STRUCTURAL DIMENSION SCHEDULE..."` | `div[data-surface="void"]` | `dark only` | `rgb(40, 40, 40)` (`#282828`) | `rgb(233, 229, 223)` (`#E9E5DF`) | `rgb(233, 229, 223)` (`#E9E5DF`) | **11.75:1** | `#282828` | `#131313` | `#e9e5df` | `#b9b5aa` | `#f45d4d` |

---

### 1.3 Root-Cause Explanation: Why Surface & Ink Resolution Split Across Islands (and Why the Previous Patch Remains Defective)

1. **Missing `data-surface` Island Boundaries on Sub-Components (`el.closest('[data-surface]')` Mismatch):**
   - In [detail.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/detail.module.css#L248-L255) (`.calloutMetricBox`) and [anatomy.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L20-L24) (`.controlsBand`, `.plateSelectBtnActive`, `.layerToolbar`, `.legendRow`, `.scheduleSummary`), components change their background via `background-color: var(--surface-basalt)` **without** declaring a `data-surface="basalt"` or `data-surface="limestone"` attribute on their DOM node.
   - Consequently, `el.closest('[data-surface]')` on all of these elements resolves to the parent `<section data-surface="plaster">` (on `/structures/[slug]`) or `<div data-surface="plaster">` (on `/anatomy`).

2. **How `:root`, `@supports (color: light-dark(...))`, and LightningCSS Compilation Interact:**
   - In [tokens-color.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css#L78-L109), `:root` defines `@supports (color: light-dark(white, black))` tokens using `light-dark(...)`, while `[data-surface="plaster"]` ([tokens-color.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css#L285-L326)) sets `color-scheme: only light` (compiled by Next.js 16's LightningCSS into `--lightningcss-light: initial; --lightningcss-dark: ; color-scheme: light only;` in `.next/static/chunks/3w6r27765_zvu.css`).
   - Originally, `[data-surface="plaster"]` did not define `--surface-basalt` (because in [COLOR_SYSTEM.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md#L42), *Basalt* is specifically `#282828` `--concrete-800`, while the light elevated token is `--surface-elevated` / *Limestone* `#B9B5AA`). Thus, inside `[data-surface="plaster"]`, `var(--surface-basalt)` inherited `#282828` from `:root` (the dark island), while `var(--ink-primary)` resolved to `#131313` from `[data-surface="plaster"]` (the light island), producing `#131313` text on a `#282828` background (`1.26:1`).

3. **Why the Previous Patch (`--surface-basalt: var(--concrete-300)` inside `[data-surface="plaster"]`) Still Breaks Visual & Accessibility Rules:**
   - Instead of giving `.calloutMetricBox` / `.controlsBand` a proper `data-surface` attribute (or keeping cards on `--surface-canvas: #E9E5DF` with `1px solid var(--border-structural)` architectural framing), [tokens-color.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css#L291) aliased `--surface-basalt: var(--concrete-300)` (`#B9B5AA` medium beige-grey) inside `[data-surface="plaster"]`.
   - Because `.calloutMetricBox`, `.controlsBand`, `.plateSelectBtnActive`, `.layerToolbar`, `.legendRow`, and `.scheduleSummary` still have `el.closest('[data-surface]') === 'plaster'`, they paint their background `#B9B5AA` (Limestone) while inheriting **Plaster-calibrated border and signal tokens**:
     - **`--border-hairline` (`#77746C`) on `#B9B5AA` (`--surface-basalt`) = `2.28:1` (WCAG 1.4.11 FAIL < 3.0:1):** Explicitly prohibited by [COLOR_SYSTEM.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md#L86) (`#77746C on #B9B5AA = 2.28:1 — PROHIBITED on #B9B5AA`). Occurs on `.plateSelectBtn:hover` bottom border ([anatomy.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L91)) and `.scheduleTable` top border against `.scheduleSummary` ([anatomy.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L259)).
     - **`--signal-ink` (`#8B1912`) on `#B9B5AA` = `4.57:1` (Borderline `0.07` margin on `12px` mono text):** To prevent `#A81F17` (`3.57:1` fail on `#B9B5AA`) from failing inside `.calloutMetricBox` and `.plateSelectBtnActive`, [tokens-color.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css#L308) darkened `--signal-ink` across the **entire `[data-surface="plaster"]` island** to `#8B1912` (muddy maroon-brown), which looks muddy and low-contrast on `#B9B5AA` in `"PRIMARY STRUCTURAL DATUM"`, `"PLATE I · CAT. 001"`, `"ALL LAYERS [ RESET ]"`, and `"VERMILION AXIS: THRUST LINE & SYMMETRY"`.
     - **Loss of Surface Hierarchy on `/anatomy` (`plaster` mode):** Because `.controlsBand`, `.plateSelectBtnActive`, `.layerToolbar`, `.legendRow`, and `.scheduleSummary` all resolve `background-color: var(--surface-basalt)` to `#B9B5AA` against `#E9E5DF` (`1.63:1`), five different UI regions collapse into the same dull `#B9B5AA` beige-grey fill.
     - **Sticky Header Overlap on Anchor/Element Scroll:** `.header` ([SiteHeader.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteHeader.module.css#L1-L11)) is `position: sticky; inset-block-start: 0; block-size: var(--header-height)` (`64px`), while `#colophon-ledger` and `.analysisBand` in [structures/[slug]/page.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx#L219) lack `scroll-margin-block-start: var(--header-height)`, causing the sticky header to occlude the top `64px` when scrolled to target.

---

## 2. H3 Root-Cause Analysis: `320px–1920px` (`40px` Step) Hero & Editorial Thesis Scan

- **Screenshot Evidence:**
  - [h3-hero-320x812.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-320x812.png)
  - [h3-hero-375x812.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-375x812.png)
  - [h3-hero-768x1024.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-768x1024.png)
  - [h3-hero-1024x1024.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-1024x1024.png)
  - [h3-hero-1280x800.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-1280x800.png)
  - [h3-hero-1920x800.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/h3-hero-1920x800.png)
  - [route-home-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-home-1280-full.png)

### 2.1 Complete 43-Step Measurement Table (`320px` to `1920px`)

| Step | Viewport (`vw × vh`) | `#main-content` `--grid-margin` | Padding L/R (`px`) | Content Width (`px`) | `.heroHeadlineCol` Width (`px`) | `.heroHeadlineCol` Right (`px`) | `.heroTitle` Font (`px`) | `"GRAVITY"` Right (`px`) | Gap to Headline Col Right (`px`) | `.heroPlateCol` Left (`px`) | `.heroPlateCol` Width (`px`) | Gap `"GRAVITY"` to Plate (`px`) | `#thesis-heading` `"ARCHITECTURE"` Word vs Col (`px`) | `scrollWidth === innerWidth` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | `320 × 812` | `10%` | `32.0` | **256.0** | `256.0` | `288.0` | `40.00` | `224.1` | `+63.9` | `32.0` *(stacked)* | `256.0` | stacked | **256.3 > 256.0 (BREAKS)** | `true` |
| 2 | `360 × 812` | `10%` | `36.0` | **288.0** | `288.0` | `324.0` | `42.62` | `240.7` | `+83.3` | `36.0` *(stacked)* | `288.0` | stacked | `256.3 <= 288.0` | `true` |
| 3 | **`375 × 812`** | `10%` | `37.5` | **300.0** | `300.0` | `337.5` | `44.40` | `250.7` | `+86.8` | `37.5` *(stacked)* | `300.0` | stacked | `256.3 <= 300.0` | `true` |
| 4 | `400 × 812` | `10%` | `40.0` | `320.0` | `320.0` | `360.0` | `46.00` | `260.9` | `+99.1` | `40.0` *(stacked)* | `320.0` | stacked | `256.3 <= 320.0` | `true` |
| 5 | `440 × 812` | `10%` | `44.0` | `352.0` | `352.0` | `396.0` | `46.00` | `264.9` | `+131.1` | `44.0` *(stacked)* | `352.0` | stacked | `256.3 <= 352.0` | `true` |
| 6 | `480 × 812` | `10%` | `48.0` | `384.0` | `384.0` | `432.0` | `46.00` | `268.9` | `+163.1` | `48.0` *(stacked)* | `384.0` | stacked | `256.3 <= 384.0` | `true` |
| 7 | `520 × 812` | `10%` | `52.0` | `416.0` | `416.0` | `468.0` | `46.00` | `272.9` | `+195.1` | `52.0` *(stacked)* | `416.0` | stacked | `256.3 <= 416.0` | `true` |
| 8 | `560 × 812` | `10%` | `56.0` | `448.0` | `448.0` | `504.0` | `46.00` | `276.9` | `+227.1` | `56.0` *(stacked)* | `448.0` | stacked | `256.3 <= 448.0` | `true` |
| 9 | `600 × 812` | `10%` | `60.0` | `480.0` | `480.0` | `540.0` | `46.00` | `280.9` | `+259.1` | `60.0` *(stacked)* | `480.0` | stacked | `261.0 <= 480.0` | `true` |
| 10 | `640 × 812` | `10%` | `64.0` | `512.0` | `512.0` | `576.0` | `47.68` | `293.0` | `+283.0` | `64.0` *(stacked)* | `512.0` | stacked | `274.2 <= 512.0` | `true` |
| 11 | `680 × 812` | `10%` | `68.0` | `544.0` | `544.0` | `612.0` | `50.16` | `308.9` | `+303.1` | `68.0` *(stacked)* | `544.0` | stacked | `287.4 <= 544.0` | `true` |
| 12 | `720 × 812` | `10%` | `72.0` | `576.0` | `576.0` | `648.0` | `52.64` | `324.8` | `+323.2` | `72.0` *(stacked)* | `576.0` | stacked | `300.5 <= 576.0` | `true` |
| 13 | `760 × 812` | `10%` | `76.0` | `608.0` | `608.0` | `684.0` | `55.12` | `340.7` | `+343.3` | `76.0` *(stacked)* | `608.0` | stacked | `313.6 <= 608.0` | `true` |
| 14 | **`768 × 1024`** | `10%` | `76.8` | **614.4** | **299.2** | `376.0` | `44.28` | `289.4` | `+86.6` | `392.0` | **299.2** | `+102.6` | `316.0 <= 614.4` | `true` |
| 15 | `800 × 1024` | `10%` | `80.0` | `640.0` | `312.0` | `392.0` | `46.18` | `301.7` | `+90.3` | `408.0` | `312.0` | `+106.3` | `326.8 <= 640.0` | `true` |
| 16 | `840 × 1024` | `10%` | `84.0` | `672.0` | `328.0` | `412.0` | `48.54` | `317.1` | `+94.9` | `428.0` | `328.0` | `+110.9` | `339.9 <= 672.0` | `true` |
| 17 | `880 × 1024` | `10%` | `88.0` | `704.0` | `344.0` | `432.0` | `50.91` | `332.5` | `+99.5` | `448.0` | `344.0` | `+115.5` | `353.0 <= 704.0` | `true` |
| 18 | `920 × 1024` | `10%` | `92.0` | `736.0` | `360.0` | `452.0` | `53.28` | `347.9` | `+104.1` | `468.0` | `360.0` | `+120.1` | `366.2 <= 736.0` | `true` |
| 19 | `960 × 1024` | `10%` | `96.0` | `768.0` | `376.0` | `472.0` | `55.65` | `363.2` | `+108.8` | `488.0` | `376.0` | `+124.8` | `379.3 <= 768.0` | `true` |
| 20 | `1000 × 1024` | `10%` | `100.0` | `800.0` | `392.0` | `492.0` | `58.02` | `378.6` | `+113.4` | `508.0` | `392.0` | `+129.4` | `392.4 <= 800.0` | `true` |
| 21 | `1040 × 1024` | `10%` | `104.0` | `832.0` | `408.0` | `512.0` | `60.38` | `394.0` | `+118.0` | `528.0` | **337.3** *(5 cols!)* | `+134.0` | **405.6 > 380.0 (BREAKS)** | `true` |
| 22 | `1080 × 1024` | `10%` | `108.0` | `864.0` | `424.0` | `532.0` | `62.75` | `409.3` | `+122.7` | `548.0` | `350.7` | `+138.7` | **418.7 > 396.0 (BREAKS)** | `true` |
| 23 | `1120 × 1024` | `10%` | `112.0` | `896.0` | `440.0` | `552.0` | `65.12` | `424.7` | `+127.3` | `568.0` | `364.0` | `+143.3` | **431.8 > 412.0 (BREAKS)** | `true` |
| 24 | `1160 × 1024` | `10%` | `116.0` | `928.0` | `456.0` | `572.0` | `67.49` | `440.0` | `+132.0` | `588.0` | `377.3` | `+148.0` | **445.0 > 428.0 (BREAKS)** | `true` |
| 25 | `1200 × 1024` | `10%` | `120.0` | `960.0` | `472.0` | `592.0` | `69.86` | `455.4` | `+136.6` | `608.0` | `390.7` | `+152.6` | **458.1 > 444.0 (BREAKS)** | `true` |
| 26 | `1240 × 1024` | `10%` | `124.0` | `992.0` | `488.0` | `612.0` | `72.22` | `470.8` | `+141.2` | `628.0` | `404.0` | `+157.2` | **471.2 > 460.0 (BREAKS)** | `true` |
| 27 | **`1280 × 800`** | `10%` | `128.0` | **1024.0** | `504.0` | `632.0` | `74.59` | `486.2` | `+145.8` | `667.7` | **378.0** *(dvh cap!)* | `+181.5` | **484.4 > 476.0 (BREAKS)** | `true` |
| 28 | `1320 × 800` | `10%` | `132.0` | `1056.0` | `520.0` | `652.0` | `76.96` | `501.6` | `+150.4` | `694.3` | **378.0** *(dvh cap!)* | `+192.7` | **497.5 > 492.0 (BREAKS)** | `true` |
| 29 | `1360 × 800` | `10%` | `136.0` | `1088.0` | `536.0` | `672.0` | `79.33` | `516.9` | `+155.1` | `721.0` | **378.0** *(dvh cap!)* | `+204.1` | **510.6 > 508.0 (BREAKS)** | `true` |
| 30 | `1400 × 800` | `10%` | `140.0` | `1120.0` | `552.0` | `692.0` | `81.70` | `532.3` | `+159.7` | `747.7` | **378.0** *(dvh cap!)* | `+215.4` | `523.8 <= 524.0` | `true` |
| 31 | `1440 × 800` | `10%` | `144.0` | `1152.0` | `568.0` | `712.0` | `84.06` | `547.7` | `+164.3` | `774.3` | **378.0** *(dvh cap!)* | `+226.6` | `536.9 <= 540.0` | `true` |
| 32 | `1480 × 800` | `10%` | `148.0` | `1184.0` | `584.0` | `732.0` | `86.43` | `563.0` | `+169.0` | `801.0` | **378.0** *(dvh cap!)* | `+238.0` | `550.0 <= 556.0` | `true` |
| 33 | `1520 × 800` | `10%` | `152.0` | `1216.0` | `600.0` | `752.0` | `88.80` | `578.4` | `+173.6` | `827.7` | **378.0** *(dvh cap!)* | `+249.3` | `563.2 <= 572.0` | `true` |
| 34 | `1560 × 800` | `10%` | `156.0` | `1248.0` | `616.0` | `772.0` | `91.17` | `593.8` | `+178.2` | `854.3` | **378.0** *(dvh cap!)* | `+260.5` | `576.3 <= 588.0` | `true` |
| 35 | `1600 × 800` | `10%` | `160.0` | `1280.0` | `632.0` | `792.0` | `93.54` | `609.1` | `+182.9` | `881.0` | **378.0** *(dvh cap!)* | `+271.9` | `576.6 <= 604.0` | `true` |
| 36 | `1640 × 800` | `10%` | `164.0` | `1312.0` | `648.0` | `812.0` | `95.90` | `624.5` | `+187.5` | `907.7` | **378.0** *(dvh cap!)* | `+283.2` | `576.6 <= 620.0` | `true` |
| 37 | `1680 × 800` | `10%` | `168.0` | **1344.0** | `664.0` | `832.0` | `98.27` | `639.9` | `+192.1` | `934.3` | **378.0** *(dvh cap!)* | `+294.4` | `576.6 <= 636.0` | `true` |
| 38 | `1720 × 800` | `10%` | `172.0` | **1336.0** *(SHRINKS!)* | `660.0` | `852.0` | `97.68` | `661.1` | `+190.9` | `952.7` | **378.0** *(dvh cap!)* | `+291.6` | `576.6 <= 632.0` | `true` |
| 39 | `1760 × 800` | `10%` | `176.0` | **1328.0** *(SHRINKS!)* | `656.0` | `872.0` | `97.09` | `682.2` | `+189.8` | `971.0` | **378.0** *(dvh cap!)* | `+288.8` | `576.6 <= 628.0` | `true` |
| 40 | `1800 × 800` | `10%` | `180.0` | **1320.0** *(SHRINKS!)* | `652.0` | `892.0` | `96.50` | `703.3` | `+188.7` | `989.3` | **378.0** *(dvh cap!)* | `+286.0` | `576.6 <= 624.0` | `true` |
| 41 | `1840 × 800` | `10%` | `184.0` | **1312.0** *(SHRINKS!)* | `648.0` | `912.0` | `95.90` | `724.5` | `+187.5` | `1007.7` | **378.0** *(dvh cap!)* | `+283.2` | `576.6 <= 620.0` | `true` |
| 42 | `1880 × 800` | `10%` | `188.0` | **1304.0** *(SHRINKS!)* | `644.0` | `932.0` | `95.31` | `745.7` | `+186.3` | `1026.0` | **378.0** *(dvh cap!)* | `+280.3` | `576.6 <= 616.0` | `true` |
| 43 | **`1920 × 800`** | `10%` | `192.0` | **1296.0** *(SHRINKS!)* | `640.0` | `952.0` | `94.72` | `766.9` | `+185.1` | `1044.3` | **378.0** *(dvh cap!)* | `+277.4` | `576.6 <= 612.0` | `true` |

---

### 2.2 Four Distinct Root Causes Identified in the H3 Sweep

1. **`#main-content { --grid-margin: 10%; }` ([src/app/globals.css:54-56](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/globals.css#L54-L56)) Destroys Responsive Content Width, Misaligns Plumb Lines, and Inverse-Shrinks Content Above `1680px`:**
   - **Mobile (`375px`):** `20%` total inline padding (`37.5px × 2 = 75px`) crushes the usable content width to **`300.0px`** (compared to `343px` in `SiteHeader` / `SiteFooter` which use `:root { --grid-margin: 1rem }`). On `/anatomy` at `375px`, this `300px` squeeze is narrower than `.scheduleTable` (`337.4px`), causing the entire page to overflow horizontally to `412.4px` ([route-anatomy-plaster-375-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-plaster-375-full.png)).
   - **Tablet (`768px`):** `20%` total inline padding (`76.8px × 2 = 153.6px`) crushes the usable content width from `720px` down to **`614.4px`**, leaving only **`299.2px`** for `.heroHeadlineCol` and **`299.2px`** for `.heroPlateCol`.
   - **Desktop (`1280px`):** `20%` total inline padding (`128px × 2 = 256px`) crushes the usable content width from `1216px` down to **`1024.0px`**.
   - **Wide Desktop (`1720px–1920px`) Inverse-Shrink Bug:** Because `.heroStage` and `.monolith-grid` have `max-inline-size: var(--grid-max-width)` (`1680px`) with `box-sizing: border-box`, while `padding-inline: var(--grid-margin)` (`10%`) resolves against the parent `#main-content` (`100vw`), as the viewport grows from `1680px` to `1920px`, the outer box stays fixed at `1680px` while the padding grows from `336px` (`168px × 2`) to `384px` (`192px × 2`), causing the inner content width to **shrink backwards from `1344px` at `1680px` down to `1296px` at `1920px`**!
   - **Header/Footer Grid Misalignment:** `SiteHeader` and `SiteFooter` are siblings outside `#main-content`, so their left/right grid edges sit at `16px / 24px / 32px / 48px` while `#main-content` sits at `10%` (`32px–192px`), breaking vertical alignment across every route and viewport.

2. **Mid-Word Headline Wrapping (`"ARCHITECTUR / E AS"`) in Section `01.1 — EDITORIAL THESIS` ([src/app/home.module.css:275-285](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/home.module.css#L275-L285) & [src/app/globals.css:154-164](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/globals.css#L154-L164)):**
   - While `.heroHeadlineCol` received `container-type: inline-size` and `14.8cqi` so `"GRAVITY"` scales down with its column, `#thesis-heading` (`<h2>ARCHITECTURE AS PERMANENT MASS</h2>` inside `.thesisLeft`) still uses `.type-display` (`font-size: clamp(2rem, 4.1vw + 0.5rem, 4.5rem); overflow-wrap: break-word`) without container-query scaling.
   - At `vw = 320px` (`256.3px > 256.0px`) and across the **entire desktop range from `vw = 1024px` to `vw = 1380px`** (where `.thesisLeft` is `grid-column: 1 / 7; padding-right: 1.5rem`, leaving `380px–508px` width while `"ARCHITECTURE"` at `50.64px–63.76px` requires `405.6px–510.6px`), `overflow-wrap: break-word` snaps the final `"E"` onto a new line:
     ```text
     ARCHITECTUR
     E AS
     PERMANENT
     MASS
     ```
     (Visually confirmed in [route-home-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-home-1280-full.png)).

3. **`.heroPlateCol` Crushed into a Narrow Strip ([src/app/home.module.css:149-168](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/home.module.css#L149-L168)):**
   - At `768px`, `--grid-margin: 10%` squeezes `.heroPlateCol` (`grid-column: 5 / -1`) to **`299.2px`**.
   - At `1024px–1240px`, `.heroPlateCol` is assigned `grid-column: 7 / 12` (**only 5 of 12 columns**, reserving column 12 for `.heroRailCol`), dropping its width from `392px` (at `1000px`) down to **`337.3px`** (at `1040px`).
   - Across **all `800px`-tall desktop viewports (`1280×800` through `1920×800`)**, `max-inline-size: min(100%, calc((100dvh - 18.5rem) * 0.75))` evaluates to `calc((800px - 296px) * 0.75) = 378px`, locking `.heroPlateCol` at a narrow **`378.0px`** width even on a `1920px`-wide screen!

---

## 3. H4 & R1–R8 Comprehensive Route Audit (`375, 768, 1280, 1920 px`)

### 3.1 R1 — Accessibility, Contrast & Layout Overflow Audit

#### A. Horizontal Overflow (`document.documentElement.scrollWidth > window.innerWidth`)
- **`/anatomy` (`plaster` and `void` modes) at `375px` (`scrollWidth = 412px > 375px`, `+37.4px` overflow):**
  - **Visual Evidence:** [route-anatomy-plaster-375-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-plaster-375-full.png), [route-anatomy-void-375-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-void-375-full.png).
  - **Root Cause:**
    1. [src/app/anatomy/anatomy.module.css:67-73](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L67-L73) defines `.workbenchGrid { grid-template-columns: 1fr; }` instead of `minmax(0, 1fr)`, and neither `<aside>` nor `.stagePanel` has `min-inline-size: 0`.
    2. Inside `.stagePanel`, `.scheduleTable` ([anatomy.module.css:257-267](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L257-L267)) has 3 columns (`PARAMETER`, `METRIC VALUE`, `STRUCTURAL ROLE`) with `padding: 0.75rem 1rem` and no horizontal scroll wrapper, giving it a minimum intrinsic width of **`337.4px`**.
    3. Because `#main-content { --grid-margin: 10% }` leaves only `300.0px` (`375px - 75px`), the `1fr` track expands to `337.4px`, pushing `.plateSelectorList`, `.stagePanel`, `.layerToolbar`, `.svgViewport`, `.legendRow`, `.calloutGrid`, and `.scheduleDetails` to `rect.right = 412.4px` (`37.4px` past the `375px` viewport edge) and exposing a `37.4px` black vertical void strip along the right side of the page in `plaster` mode.

#### B. WCAG 2.1 Contrast & UI Boundary Audit Across All Routes

| Route / Component | Element / State | Foreground | Background | Ratio | Requirement | Status | Location |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/anatomy` (`plaster`) | `.plateSelectBtn:hover` bottom border | `#77746C` (`--border-hairline`) | `#B9B5AA` (`--surface-basalt`) | **2.28:1** | `3.0:1` (WCAG 1.4.11) | **FAIL** | [anatomy.module.css:91-106](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L91-L106) |
| `/anatomy` (`plaster`) | `.scheduleTable` top border vs `.scheduleSummary` | `#77746C` (`--border-hairline`) | `#B9B5AA` (`--surface-basalt`) | **2.28:1** | `3.0:1` (WCAG 1.4.11) | **FAIL** | [anatomy.module.css:249-260](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L249-L260) |
| `/structures/[slug]` | `.calloutMetricBox > span.type-colophon` (`"PRIMARY STRUCTURAL DATUM"`) | `#8B1912` (`--signal-ink`) | `#B9B5AA` (`--surface-basalt`) | **4.57:1** | `4.5:1` (`12px` mono) | **BORDERLINE / MUDDY** | [structures/[slug]/page.tsx:300](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx#L300) |
| `/anatomy` (`plaster`) | `.plateSelectBtnActive` signal overline (`"PLATE I · CAT. 001"`) | `#8B1912` (`--signal-ink`) | `#B9B5AA` (`--surface-basalt`) | **4.57:1** | `4.5:1` (`12px` mono) | **BORDERLINE / MUDDY** | [AnatomyClient.tsx:226](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/AnatomyClient.tsx#L226) |
| `/anatomy` (`plaster`) | `.layerToolbar` `"ALL LAYERS [ RESET ]"` & `.legendRow` `"VERMILION AXIS..."` | `#8B1912` (`--signal-ink`) | `#B9B5AA` (`--surface-basalt`) | **4.57:1** | `4.5:1` (`12px` mono) | **BORDERLINE / MUDDY** | [AnatomyClient.tsx:314,343](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/AnatomyClient.tsx#L314-L343) |
| `/` (Home Hero) | `.echoWord` (`"MONOLITH"` decorative stroke watermark) | `transparent` (`1px` stroke `rgba(233,229,223,0.16)`) | `#131313` (`--surface-void`) | **1.00:1** (stroke `1.48:1`) | Decorative (`aria-hidden="true"`) | Pass (Decorative) | [HomeClient.tsx:86-88](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L86-L88) |
| All Dark Surfaces | Primary Ink (`--ink-primary`) on Void (`--surface-canvas`) | `#E9E5DF` | `#131313` | **14.81:1** | `4.5:1` | PASS (AAA) | Global |
| All Dark Surfaces | Secondary Ink (`--ink-secondary`) on Void (`--surface-canvas`) | `#B9B5AA` | `#131313` | **9.07:1** | `4.5:1` | PASS (AAA) | Global |
| All Dark Surfaces | Signal Ink (`--signal-ink`) on Void / Basalt | `#F45D4D` | `#131313` / `#282828` | **5.77:1 / 4.58:1** | `4.5:1` | PASS (AA) | Global |
| All Light Surfaces | Primary / Secondary Ink on Plaster (`#E9E5DF`) | `#131313` / `#282828` | `#E9E5DF` | **14.81:1 / 11.75:1** | `4.5:1` | PASS (AAA) | Global |

---

### 3.2 H4 — Remaining `"ARCHIVE VOLUME I"` / `"FOLIO 01"` / `"FOLIO I"` Inconsistencies

While `/archive`, `SiteFooter`, and `not-found.tsx` use **`ARCHIVE VOLUME IV`** (`VOL. IV`), the Home page and specification docs still contain **`FOLIO 01`** and **`ARCHIVE VOLUME I`**:

1. [src/components/HomeClient.tsx:92](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L92):
   ```tsx
   <span>FOLIO 01 / MONUMENTAL MONOGRAPH ARCHIVE</span>
   ```
2. [src/components/HomeClient.tsx:528](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L528):
   ```tsx
   ARCHIVE VOLUME I — INDEX &amp; MEASURED SECTIONS
   ```
   *(Conflicts directly with [src/components/ArchiveClient.tsx:129](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/ArchiveClient.tsx#L129) `SECTION 02 — ARCHIVE VOLUME IV`, [src/components/SiteFooter.tsx:99](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.tsx#L99) `ARCHIVE VOL. IV`, and [src/app/not-found.tsx:32](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/not-found.tsx#L32) `ARCHIVE VOLUME IV`.)*
3. [SITE_COPY.md:54](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md#L54), [SITE_COPY.md:109](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md#L109), [SITE_COPY.md:170](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md#L170):
   - Line 54: `FOLIO 01 / MONUMENTAL MONOGRAPH ARCHIVE`
   - Line 109: `ARCHIVE VOLUME I — INDEX & MEASURED SECTIONS`
   - Line 170: `— MONOLITH SURVEY FOLIO I, SECTION 04`

---

### 3.3 R3 — `"03 STRUCTURE DETAIL"` / `"04 ANATOMY"` Navigation & Label Inconsistencies (+ Duplicate `"SCALE"` Prefix)

1. **Desktop Header Navigation Skips `03` Entirely ([src/components/SiteHeader.tsx:8-12](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteHeader.tsx#L8-L12)):**
   - `PRIMARY_NAV` contains only:
     - `01` → `HOME` (`/`)
     - `02` → `ARCHIVE` (`/archive`)
     - `04` → `ANATOMY` (`/anatomy`)
   - Section `03` (`03 STRUCTURE DETAIL` / `/structures/trellick-tower`) is omitted from the desktop top bar, causing the visible numbering to jump from `02 ARCHIVE` directly to `04 ANATOMY` (and when a user is on `/structures/[slug]`, no item in the desktop header has an active indicator).
2. **Inconsistent Naming for Section `03` Across Components:**
   - Mobile Drawer ([src/components/SiteHeader.tsx:16-23,174-178](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteHeader.tsx#L16-L23)): `SECTION 03` → **`SPECIMEN FOLIO`** (`TRELLICK TOWER · CAT. 001`).
   - Site Footer ([src/components/SiteFooter.tsx:50-52](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.tsx#L50-L52)): **`03 DETAIL — SPECIMEN VIEW`**.
   - Anatomy Workbench CTA ([src/components/AnatomyClient.tsx:270-273](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/AnatomyClient.tsx#L270-L273)): **`OPEN 03 MONOGRAPH →`**.
   - Structure Detail Breadcrumb ([src/app/structures/[slug]/page.tsx:91-110](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx#L91-L110)): `01 HOME / 02 ARCHIVE / {MOVEMENT} / {CAT} · {NAME}` (omits `03` section identifier).
3. **Duplicate `"SCALE"` Word Prefix on `/anatomy` and `/structures/[slug]`:**
   - In [src/data/anatomyPlates.ts](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/data/anatomyPlates.ts#L31), `plate.scale` already includes the word `"SCALE"` (e.g., `'SCALE 1:500'`, `'SCALE 1:250'`).
   - [src/components/AnatomyClient.tsx:346](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/AnatomyClient.tsx#L346) writes `SCALE: {activePlate.scale}`, rendering **`"SCALE: SCALE 1:500"`** in `.legendRow`!
   - [src/app/structures/[slug]/page.tsx:326](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx#L326) writes `SCALE {anatomyPlate.scale}`, rendering **`"SCALE SCALE 1:250"`** in `.anatomyBanner`!

---

### 3.4 R4 & R5 — Duplicate Summary Sentences Masquerading as Pull-Quotes on All 27 `/structures/[slug]` Pages & Unverified Quotes

1. **100% Duplicate `building.summary` on All 27 Structure Detail Pages ([src/app/structures/[slug]/page.tsx:175,281-283](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx#L175)):**
   - **Line 175 (Hero Lead):**
     ```tsx
     <p className="type-body-lead" style={{ color: 'var(--ink-secondary)' }}>
       {building.summary}
     </p>
     ```
   - **Lines 281–283 (Section `03.2 — ARCHITECTURAL ANALYSIS` Pull-Quote):**
     ```tsx
     <blockquote className={`${styles.citationQuote} type-quote`}>
       “{building.summary}”
     </blockquote>
     ```
   - **Verified via Playwright across all 27 `/structures/[slug]` routes (`duplicateSummaryAndQuote === true` on 27/27 pages):**
     - On `/structures/trellick-tower`: `"Thirty-one-storey residential slab linked to a detached vertical service and circulation shaft by elevated concrete bridges."` appears in the Hero and again verbatim inside `<blockquote>“...”</blockquote>` 600px lower ([route-structure-trellick-tower-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-trellick-tower-1280-full.png)).
     - On `/structures/habitat-67`: `"Twelve-storey housing assembly stacked from 354 identical precast concrete boxes on a St. Lawrence River peninsula."` appears twice verbatim ([route-structure-habitat-67-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-habitat-67-1280-full.png)).
     - Same duplication occurs on all 25 remaining slugs (`barbican-estate`, `unite-dhabitation`, `geisel-library`, `salk-institute`, `nakagin-capsule-tower`, `genex-tower`, `bank-of-georgia`, `chartres-cathedral`, `notre-dame-de-paris`, `cologne-cathedral`, `milan-cathedral`, `sainte-chapelle`, `salisbury-cathedral`, `kings-college-chapel`, `bourges-cathedral`, `wells-cathedral`, `hagia-sophia`, `suleymaniye-mosque`, `selimiye-mosque`, `anitkabir`, `pantheon-rome`, `national-assembly-dhaka`, `palace-of-assembly-chandigarh`, `sagrada-familia`, `battle-of-the-nations-monument`).
2. **Unattributed Editorial Quote on Home Page ([src/components/HomeClient.tsx:273-276](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L273-L276)):**
   - Renders `<blockquote className={`${styles.thesisQuote} type-quote`}>“Concrete remembers the timber grain of its mold. Ashlar remembers the quarry chisel.”</blockquote>` as a quotation without historical source or attribution.
3. **Fabricated Citation Strings in Copy Spec ([SITE_COPY.md:169-170,348-349](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md#L169-L170)):**
   - Contains `— MONOLITH SURVEY FOLIO I, SECTION 04` and `MONOGRAPH CITATION` / `“Architecture is the learned game, correct and magnificent, of forms assembled in the light.”` (`— EDITORIAL EPIGRAPH · ARCHIVE FIELD NOTES`).

---

### 3.5 R6 — Unloaded/Blank Image Boxes on `/archive`, Skia Filter Tile Drops, Clipped Filter Controls & Duplicate Footer Wordmark

1. **Blank Image Boxes (`naturalWidth === 0`) & Skia Compositor Tile Drops on `/archive` PLATE Grid:**
   - **Visual Evidence:** [route-archive-plate-1280-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-1280-viewport.png), [route-archive-plate-1920-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-1920-viewport.png), [route-archive-plate-375-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-375-full.png).
   - **Telemetry:** On `/archive` PLATE view, `17/27` images at `375px`, `16/27` at `768px`, `15/27` at `1280px`, and `21/27` at `1920px` reported `!img.complete || img.naturalWidth === 0` during scroll pass.
   - **Root Cause (Two Compounding Factors):**
     - **Factor A (`plate-grain` SVG `<feTurbulence>` + `mix-blend-mode: overlay` + `isolation: isolate` + CSS `filter`):** In [src/app/globals.css:300-331](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/globals.css#L300-L331), every `.plate-frame.plate-grain` creates an isolated stacking context combining `filter: grayscale(100%) contrast(1.12) brightness(0.92)` on `<img class="plate-img">` with a `::after` overlay running an inline SVG `<feTurbulence type='fractalNoise'>` filter. Having 27 concurrent `<feTurbulence>` blend-mode layers on `/archive` causes Chromium's rasterizer to drop compositor tiles on large cards (in [route-archive-plate-1280-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-1280-viewport.png) and [route-archive-plate-1920-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-1920-viewport.png), the top-right 60% of Trellick Tower's lead card image is blacked out by a dropped tile!).
     - **Factor B (25 Unoptimized Multi-Megabyte Source JPEGs + `loading="lazy"`):** `public/images/buildings/*.jpg` contains 27 high-res JPEGs totaling `~25 MB` (e.g. `sainte-chapelle.jpg` = `2.90 MB`, `notre-dame-de-paris.jpg` = `1.81 MB`, `barbican-estate.jpg` = `1.63 MB`, `salisbury-cathedral.jpg` = `1.51 MB`). In [src/components/ArchiveClient.tsx:390-392](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/ArchiveClient.tsx#L390-L392), cards `index >= 2` use `loading="lazy"`; when scrolling, `/_next/image` must transcode 25 multi-megabyte files on the fly while `.plate-frame` shows a stark `#131313` void black box.

2. **Duplicate Stacked `MONOLITH` Wordmarks in `SiteFooter` on All Desktop Viewports (`>= 1024px`):**
   - **Visual Evidence:** Bottom of [route-home-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-home-1280-full.png), [route-structure-habitat-67-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-habitat-67-1280-full.png), [route-anatomy-plaster-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-plaster-1280-full.png).
   - **Root Cause:** In [src/components/SiteFooter.tsx:15-30](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.tsx#L15-L30), `.wordmarkBand` renders `<img className={styles.desktopWordmark} src="/brand/footer-lockup.svg" />` followed by `<img className={styles.mobileWordmark} src="/brand/monolith-wordmark-dark.svg" />`. However, [src/components/SiteFooter.module.css:49-56](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.module.css#L49-L56) writes:
     ```css
     @media (width >= 1024px) {
       .desktopWordmark { display: block; }
       .mobileLockup { display: none; }
     }
     ```
     Because `.mobileLockup` does not exist in `SiteFooter.tsx` and `.mobileWordmark` has `display: block` unconditionally ([SiteFooter.module.css:33-38](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.module.css#L33-L38)), **both SVGs render simultaneously stacked on top of each other at `1024px`, `1280px`, and `1920px`**!

3. **Clipped Input Placeholders, Select Labels, and Table Headers on `/archive` at `1280px` & `1920px`:**
   - **Visual Evidence:** [route-archive-plate-1280-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-plate-1280-viewport.png), [route-archive-index-1280-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-index-1280-viewport.png).
   - **Root Cause:** In [src/app/archive/archive.module.css:47-51](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/archive/archive.module.css#L47-L51), `.controlsRow` uses `grid-template-columns: 1.5fr repeat(5, minmax(0, 1fr))` inside the `--grid-margin: 10%` squeezed container (`1024px` at `1280px`), leaving only `142px` per `<select>` (`font-size: 0.75rem; letter-spacing: 0.06em; padding: 0.5rem 0.75rem`). This clips:
     - Search input placeholder: `"NAME, ARCHITECT, CITY, C"` (`CAT...` cut off)
     - Movement select: `"ALL MOVEMENTS"` (`(27)` cut off)
     - Continent select: `"ALL CONTINENT"` (`S` cut off)
     - Sort Order select: `"CAT. NO. (ASC"` (`ENDING)` cut off)
     - INDEX table header ([route-archive-index-1280-viewport.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-archive-index-1280-viewport.png)): `"YEAR ↑↓"` is clipped at the right edge of `.tableRegion`.

---

### 3.6 R7 — `SpecimenStream` Clone & Primary Card Link Accessibility Issues

- **Location:** [src/components/HomeClient.tsx:365-410](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L365-L410)
- **Telemetry Findings:**
  1. **Duplicate Focusable Links per Card on Primary Items (`idx 0..8`):** Each `.streamCard` renders **two separate focusable `<Link>` elements** pointing to `/structures/${building.slug}`:
     - Link 1 ([HomeClient.tsx:372-390](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L372-L390)): Wraps the `<Image alt={building.imageAlt} />` with **no `aria-label`** and **no `tabIndex={-1}`**. Screen readers announce the 150-character photographic description (`building.imageAlt`) as the link text, and keyboard users must tab twice through every single card in the stream.
     - Link 2 ([HomeClient.tsx:398-404](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx#L398-L404)): Wraps `{building.name}`.
  2. **Clone Items (`idx 9..17`, `isClone === true`):** While `<article>` has `aria-hidden={isClone ? 'true' : undefined}` and the `<Link>` elements have `tabIndex={isClone ? -1 : undefined}`, the `<Image>` inside cloned cards still carries the full `alt={building.imageAlt}` instead of `alt=""` and the cloned `<Link>` elements lack `aria-hidden="true"`.

---

### 3.7 R8 — Symmetric / Template-Like Blocks Identified Across Visual Screenshots

1. **`/structures/[slug]` — Section `03.1 — COLOPHON & MEASURED SPECIFICATION` ([detail.module.css:187-205](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/detail.module.css#L187-L205)):**
   - Renders 9 metadata fields in a rigid `3 × 3` equal-width, equal-height box grid (`grid-template-columns: repeat(3, minmax(0, 1fr))`) where every cell has identical padding (`1.25rem`), identical top label, and identical bottom value ([route-structure-habitat-67-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-structure-habitat-67-1280-full.png)).
2. **`/` (Home) — Hero Bottom `.surveyStripGrid` ([home.module.css:225-259](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/home.module.css#L225-L259)):**
   - Renders 4 identical equal-width stat cells (`repeat(4, minmax(0, 1fr))`) across the bottom of the Hero (`MOVEMENTS`, `CATALOGED WORKS`, `CHRONOLOGICAL SPAN`, `TECHNICAL FOLIOS`).
3. **`/` (Home) — Section `01.3 — COMPLETE LEDGER` `.triptychGrid` ([home.module.css:376-409](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/home.module.css#L376-L409)):**
   - Although the column widths are `1.4fr 1fr 1fr`, all 3 columns (`01 / BRUTALIST`, `02 / GOTHIC`, `03 / MONUMENTAL`) repeat the exact same vertical card template (overline → `<h3>` → thumbnail → 1-sentence paragraph → 3 sample rows → full-width CTA button) ([route-home-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-home-1280-full.png)).
4. **`/anatomy` — `.calloutGrid` ([anatomy.module.css:216-237](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css#L216-L237)):**
   - Renders structural callouts as a uniform `2 × 2` grid (`repeat(2, minmax(0, 1fr))`) of identical bordered boxes ([route-anatomy-plaster-1280-full.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/before/route-anatomy-plaster-1280-full.png)).

---

## 4. Phase 2 / Phase 3 Conflict-Free File Ownership Matrix

To ensure parallel fixer agents never edit the same file simultaneously, assign ownership strictly along the following non-overlapping boundaries:

| Fixer Agent | Assigned Bug IDs | Exclusive File Ownership | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Agent A — Color Tokens, Global Grid & Navigation Chrome** | **H1 (Tokens), H3 (Grid Margin & Type Scale), R3 (Header/Footer Nav), R6 (Duplicate Footer Wordmark & `.plate-grain` Raster Fix)** | - [brand/tokens-color.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css)<br>- [src/app/globals.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/globals.css)<br>- [src/components/SiteHeader.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteHeader.tsx)<br>- [src/components/SiteHeader.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteHeader.module.css)<br>- [src/components/SiteFooter.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.tsx)<br>- [src/components/SiteFooter.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SiteFooter.module.css) | 1. Remove `#main-content { --grid-margin: 10% }` from `globals.css` (restore unified responsive `--grid-margin` aligned with `SiteHeader`/`SiteFooter` and prevent `>1680px` inverse-shrinking).<br>2. Replace heavy inline SVG `<feTurbulence>` blend-mode filter on `.plate-grain::after` in `globals.css` with a lightweight static CSS noise/halftone pattern that never drops Chromium Skia tiles.<br>3. Fix `SiteFooter.module.css` `@media (width >= 1024px)` to hide `.mobileWordmark` so two `MONOLITH` wordmarks never stack.<br>4. Unify `01 HOME` / `02 ARCHIVE` / `03 STRUCTURE DETAIL` / `04 ANATOMY` naming across `SiteHeader` and `SiteFooter`.<br>5. Clean up `[data-surface="plaster"]` / `[data-surface="limestone"]` token pairings in `brand/tokens-color.css`. |
| **Agent B — Home Hero, Editorial Thesis & SpecimenStream** | **H3 (Hero Layout & Thesis Word-Break), H4 (`FOLIO 01` / `ARCHIVE VOLUME I`), R4 (Unattributed Thesis Quote), R7 (`SpecimenStream` A11y), R8 (Home Asymmetry)** | - [src/components/HomeClient.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/HomeClient.tsx)<br>- [src/app/home.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/home.module.css) | 1. Widen `.heroPlateCol` (`grid-column: 7 / 13` or balanced split without the `378px` `dvh` stranglehold) and ensure `"GRAVITY"` never clips or overlaps `320px–1920px`.<br>2. Add `container-type: inline-size` and container-aware `cqi` clamp to `.thesisLeft` / `#thesis-heading` so `"ARCHITECTURE"` never breaks mid-word (`"ARCHITECTUR / E AS"`) at `320px` or `1024px–1380px`.<br>3. Update `FOLIO 01` / `ARCHIVE VOLUME I` to `VOLUME IV` (`VOL. IV`) and replace the unattributed `blockquote` in `HomeClient.tsx`.<br>4. Fix `SpecimenStream` links: make primary card media link `tabIndex={-1}` `aria-hidden="true"` (or single unified card link with clean `aria-label`) and set `alt=""` on cloned stream images. |
| **Agent C — Structure Detail, Anatomy Workbench & Archive Catalog** | **H1 (`.calloutMetricBox`), H2 (`/anatomy` Surfaces & `375px` Overflow), R1 (WCAG 1.4.11 Borders), R3 (Duplicate `"SCALE"` & Breadcrumb/CTA Labels), R4/R5 (27/27 Duplicate `building.summary` Pull-Quote), R6 (`/archive` Filter Truncation & Lazy Image Loading), R8 (Detail/Anatomy Asymmetry)** | - [src/app/structures/[slug]/page.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/page.tsx)<br>- [src/app/structures/[slug]/detail.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/structures/%5Bslug%5D/detail.module.css)<br>- [src/components/AnatomyClient.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/AnatomyClient.tsx)<br>- [src/app/anatomy/anatomy.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/anatomy/anatomy.module.css)<br>- [src/components/ArchiveClient.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/ArchiveClient.tsx)<br>- [src/app/archive/archive.module.css](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/app/archive/archive.module.css)<br>- [src/data/buildings.ts](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/data/buildings.ts) | 1. Give `.calloutMetricBox` (`detail.module.css`) and `.controlsBand` / `.plateSelectBtnActive` / `.layerToolbar` / `.legendRow` / `.scheduleSummary` (`anatomy.module.css`) explicit `data-surface` islands or crisp `#E9E5DF` / `#131313` structural framing; eliminate `#77746C` on `#B9B5AA` (`2.28:1` fail) and add `scroll-margin-block-start: var(--header-height)` to sections.<br>2. Fix `/anatomy` `375px` horizontal overflow (`412px > 375px`) by changing `.workbenchGrid` to `minmax(0, 1fr)`, adding `min-inline-size: 0` to `<aside>` and `.stagePanel`, and wrapping `.scheduleTable` in an `overflow-x: auto` container.<br>3. Remove duplicate `building.summary` `<blockquote>` in `structures/[slug]/page.tsx:281-283` across all 27 structures (replace with distinct verified technical/structural datum analysis).<br>4. Fix `"SCALE: SCALE 1:500"` and `"SCALE SCALE 1:250"` duplication in `AnatomyClient.tsx:346` and `structures/[slug]/page.tsx:326`.<br>5. Fix truncated `<select>` / `<input>` filter controls and INDEX table `"YEAR ↑↓"` clipping in `archive.module.css`. |
| **Agent D — Documentation & Spec Synchronization** | **H4, R4 (Spec Docs)** | - [SITE_COPY.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md)<br>- [SITE_LAYOUT.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_LAYOUT.md)<br>- [SITE_VISUAL.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_VISUAL.md)<br>- [REVIEW_LOG.md](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/REVIEW_LOG.md) | Sync `VOLUME IV` numbering, remove fabricated `MONOGRAPH CITATION` / `FOLIO I` references, and update layout/visual specs after code fixes. |


---

## 6. Phase 3 (§4 Evidence Gates) — After-Fix Playwright Verification Telemetry & Before/After Comparison

All Phase 2 fixes (`H1`–`H4` & `R1`–`R8`) were verified against the fresh Next.js production build (`npx next start -p 3199`) with automated Playwright DOM/style telemetry (`C:/Users/Danil/.gemini/antigravity/brain/0fdb37ca-84fc-409c-8310-3c9843569e75/scratch/after-telemetry.json`) and visual inspection of every `audit-screenshots/after/*.png` screenshot via `read_file`.

### 6.1 H1 Before vs. After (`/structures/habitat-67` `.calloutMetricBox` & `#colophon-ledger`)

| Metric / Property | Before Fix (`audit-screenshots/before/`) | After Fix (`audit-screenshots/after/`) | Status |
| :--- | :--- | :--- | :--- |
| `.calloutMetricBox` own `data-surface` | `null` (inherited `plaster`) | **`"void"`** (`closest('[data-surface]') === "void"`) | **PASS** |
| `backgroundColor` | `rgb(185, 181, 170)` (`#B9B5AA`) | **`rgb(19, 19, 19)` (`#131313`)** | **PASS** |
| Overline (`PRIMARY STRUCTURAL DATUM`) | `rgb(139, 25, 18)` (`#8B1912`) — **`4.57:1`** | **`rgb(244, 93, 77)` (`#F45D4D`) — `5.77:1`** | **PASS** |
| Primary Datum (`36.0 M (12 STOREYS)`) | `rgb(19, 19, 19)` (`#131313`) — `9.07:1` | **`rgb(233, 229, 223)` (`#E9E5DF`) — `14.81:1`** | **PASS** |
| Secondary Span (`354 PREFAB MODULES`) | `rgb(59, 57, 53)` (`#3B3935`) — `5.55:1` | **`rgb(185, 181, 170)` (`#B9B5AA`) — `9.07:1`** | **PASS** |
| `#colophon-ledger` & `.calloutMetricBox` `scroll-margin-top` | `0px` (overlapped by `64px` sticky header) | **`88px`** (clears `64px` sticky header with `24px` breathing room) | **PASS** |

- **Screenshot Evidence:**
  - Before: `audit-screenshots/before/h1-habitat-67-calloutMetricBox-crop.png`, `audit-screenshots/before/h1-habitat-67-analysis-band-1280.png`
  - After: `audit-screenshots/after/h1-habitat-67-calloutMetricBox-crop.png`, `audit-screenshots/after/h1-habitat-67-analysis-band-1280.png`

---

### 6.2 H2 & R1 Before vs. After (`/anatomy` in `plaster` & `void` Modes + `375px` Overflow)

| Element / Check | Before Fix (`plaster` / `void`) | After Fix (`plaster` / `void`) | Status |
| :--- | :--- | :--- | :--- |
| `.controlsBand` | `bg: #B9B5AA`, text `#131313` (`9.07:1`), border `#77746C` | `plaster`: `bg: #E9E5DF`, text `#131313` (**`14.81:1`**), border `#131313` (**`14.81:1`**)<br>`void`: `bg: #131313`, text `#E9E5DF` (**`14.81:1`**), border `#E9E5DF` (**`14.81:1`**) | **PASS** |
| `.tabButton` (inactive) | `bg: transparent` on `#B9B5AA`, border `#77746C` (**`2.28:1` FAIL**) | `plaster`: `bg: #E9E5DF`, text `#131313` (**`14.81:1`**), border `#131313` (**`14.81:1`**)<br>`void`: `bg: #131313`, text `#E9E5DF` (**`14.81:1`**), border `#E9E5DF` (**`14.81:1`**) | **PASS** |
| `.tabButtonActive` | `plaster`: `bg: #131313`, text `#E9E5DF` (`14.81:1`) | `plaster`: `bg: #131313`, text `#E9E5DF` (**`14.81:1`**)<br>`void`: `bg: #E9E5DF`, text `#131313` (**`14.81:1`**) | **PASS** |
| `.plateSelectBtn` (inactive & `:hover`) | `:hover` border `#77746C` on `#B9B5AA` (**`2.28:1` FAIL < 3:1**) | `plaster` default: `14.81:1` text & border; `:hover` / active on `#B9B5AA`: text `#131313` (**`9.07:1`**), border `#131313` (**`9.07:1`**)<br>`void` active on `#282828`: text `#E9E5DF` (**`11.75:1`**), border `#E9E5DF` (**`11.75:1`**) | **PASS** |
| `.layerToolbar` & `.layerBtnActive` | Collapsed into `#B9B5AA` fill | `plaster`: toolbar `#E9E5DF` (`14.81:1`), active button `#131313` on `#E9E5DF` (**`14.81:1`**)<br>`void`: toolbar `#131313` (`14.81:1`), active button `#E9E5DF` on `#131313` (**`14.81:1`**) | **PASS** |
| `.legendRow` & `.scheduleSummary` | `#B9B5AA` fill; signal datum `4.57:1` | `plaster`: `#E9E5DF` fill (`14.81:1` text & border)<br>`void`: `#131313` fill (`14.81:1` text & border) | **PASS** |
| `.scheduleTable` border contrast | `#77746C` on `#B9B5AA` (**`2.28:1` FAIL**) | `plaster`: `#131313` on `#E9E5DF` (**`14.81:1`**)<br>`void`: `#E9E5DF` on `#131313` (**`14.81:1`**) | **PASS** |
| **R1 Horizontal Overflow at `375px`** | `scrollWidth = 412px > 375px` (**`+37.4px` FAIL**) | `plaster`: **`375px === 375px` (`0px` overflow)**<br>`void`: **`375px === 375px` (`0px` overflow)** | **PASS** |

- **Screenshot Evidence:**
  - Before: `audit-screenshots/before/h2-anatomy-plaster-1280-top.png`, `audit-screenshots/before/h2-anatomy-controlsBand-plaster.png`, `audit-screenshots/before/h2-anatomy-void-1280-top.png`, `audit-screenshots/before/route-anatomy-plaster-375-full.png`, `audit-screenshots/before/route-anatomy-void-375-full.png`
  - After: `audit-screenshots/after/h2-anatomy-plaster-1280-top.png`, `audit-screenshots/after/h2-anatomy-controlsBand-plaster.png`, `audit-screenshots/after/h2-anatomy-void-1280-top.png`, `audit-screenshots/after/route-anatomy-plaster-375-full.png`, `audit-screenshots/after/route-anatomy-void-375-full.png`

---

### 6.3 H3 & R2 Before vs. After (43-Step Sweep: `320px` to `1920px`)

| Viewport (`px`) | `--grid-margin` (Before → After) | Inner Grid Width (Before → After) | `.heroHeadlineCol` Width | `"GRAVITY"` Gap to Right Edge | `.heroPlateCol` (`W × H`) | `#thesis-heading` `"ARCHITECTURE"` Mid-Word Break? | `scrollWidth === innerWidth` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **320** | `10%` → **`1rem` (`16px`)** | `256px` → **`288px`** | `288px` | `+91.6px` | `288 × 460.1px` | Before: **BROKEN (`ARCHITECTUR / E`)** → After: **`false` (`244.3px <= 288px`)** | `320 === 320` |
| **360** | `10%` → **`1rem` (`16px`)** | `288px` → **`328px`** | `328px` | `+104.4px` | `328 × 510.1px` | `false` (`278.1px <= 328px`) | `360 === 360` |
| **375** | `10%` → **`1rem` (`16px`)** | `300px` → **`343px`** | `343px` | `+109.1px` | `343 × 528.8px` | `false` (`290.9px <= 343px`) | `375 === 375` |
| **400–760** | `10%` → **`1rem` (`16px`)** | `368px–728px` | `368px–728px` | `+117.1px–247.8px` | `368px–728px` | `false` (`0` breaks) | `true` |
| **768** | `10%` → **`1.5rem` (`24px`)** | `614.4px` → **`720px`** | `352px` | `+112.0px` | `299.2px` → **`352 × 515.9px`** | `false` (`484.7px <= 720px`) | `768 === 768` |
| **800–1000** | `10%` → **`1.5rem` (`24px`)** | `752px–952px` | `368px–468px` | `+117.1px–148.9px` | `368px–468px` | `false` (`0` breaks) | `true` |
| **1024** | **`10%` (`102.4px`)** | **`819.2px`** | `401.6px` | `+127.8px` | `337px` → **`401.6 × 532.9px`** | Before: **BROKEN** → After: **`false` (`316.8px <= 397.6px`)** | `1024 === 1024` |
| **1040** | **`10%` (`104px`)** | **`832px`** | `408px` | `+129.8px` | `337.3px` → **`408 × 540.9px`** | Before: **BROKEN** → After: **`false` (`322.3px <= 404px`)** | `1040 === 1040` |
| **1080–1240** | **`10%`** | **`864px–992px`** | `424px–488px` | `+134.9px–155.3px` | **`424px–488px`** | Before: **BROKEN** → After: **`false` (`0` breaks)** | `true` |
| **1280** | **`10%` (`128px`)** | **`1024px`** | `504px` | `+160.4px` | `378px` → **`504 × 660.9px`** | Before: **BROKEN** → After: **`false` (`403.8px <= 500px`)** | `1280 === 1280` |
| **1320–1680** | **`10%`** | **`1056px–1344px`** | `520px–664px` | `+165.5px–211.3px` | **`520px–664px`** | `false` (`0` breaks) | `true` |
| **1720–1880** | **`10%`** | Before: inverse-shrank to `1304px` → After: **`1376px–1504px` (monotonic)** | `680px–744px` | `+216.3px–263.8px` | `378px` → **`680px–744px`** | `false` (`0` breaks) | `true` |
| **1920** | **`10%` (`192px`)** | Before: `1296px` → After: **`1536px` (monotonic)** | `760px` | `+279.8px` | `378px` → **`760 × 956.7px`** | `false` (`484.7px <= 756px`) | `1920 === 1920` |

- **Screenshot Evidence:**
  - Before: `audit-screenshots/before/h3-hero-320x800.png`, `h3-hero-375x812.png`, `h3-hero-768x1024.png`, `h3-hero-1040x800.png`, `h3-hero-1280x800.png`, `route-home-1280-full.png`
  - After: `audit-screenshots/after/h3-hero-320x812.png`, `h3-hero-375x812.png`, `h3-hero-768x1024.png`, `h3-hero-1024x1024.png`, `h3-hero-1280x800.png`, `h3-hero-1920x800.png`, `route-home-1280-full.png`, `route-home-375-full.png`, `route-home-768-full.png`, `route-home-1920-full.png`

---

### 6.4 H4 & R3–R7 Verification Summary

| Gate ID | Verification Check | Before Fix | After Fix | Status |
| :--- | :--- | :--- | :--- | :--- |
| **H4** | Instances of `"ARCHIVE VOLUME I"` or `"FOLIO 01"` | `2` (`HomeClient.tsx:92`, `:528`) | **`0`** (`FOLIO IV` and `ARCHIVE VOLUME IV` across all routes) | **PASS** |
| **R3 (Nav)** | Header, Mobile Drawer, and Footer navigation numbering | Desktop skipped `03` (`01, 02, 04`); Drawer/Footer had `03 SPECIMEN FOLIO` / `04 ANATOMY` | **`01 HOME`, `02 ARCHIVE`, `03 ANATOMY`** across Header, Mobile Drawer (`route-mobile-drawer-375.png`), and Footer (`0` instances of `04 ANATOMY` or `03 SPECIMEN FOLIO`) | **PASS** |
| **R3 (Scale)** | Duplicate `"SCALE: SCALE"` or `"SCALE SCALE"` strings | `2` (`AnatomyClient.tsx:346`, `structures/[slug]/page.tsx:326`) | **`0`** across `/anatomy` and all 27 `/structures/[slug]` pages | **PASS** |
| **R4 & R5** | Verbatim duplicate summary/quote on `/structures/[slug]` | **`27/27` pages** duplicated `building.summary` in `blockquote` | **`0/27` duplicates** — all 27 structures now render a dedicated technical `structuralAxiom` (`type-quote`) distinct from `building.summary` | **PASS** |
| **R6 (Footer)** | Visible footer wordmark count across viewports | `2` stacked wordmarks on all viewports `>= 1024px` (`.mobileLockup` typo) | **`1` visible wordmark** at every viewport (`320px–1920px`: `1` at `375px`, `1` at `1280px`, `1` at `1920px`) | **PASS** |
| **R6 (Archive Controls)** | `/archive` `<select>` / `<input>` & INDEX `"YEAR ⇅"` clipping | `<select>` clipped vertically/horizontally; `"YEAR ↑↓"` clipped to `"YEAR ↑"` (`96px`) | All 5 `<select>` controls `44px` tall (`scrollWidth === clientWidth === 333px`); INDEX `"YEAR ⇅"` `clientWidth === scrollWidth === 207px` (`clipped: false`) | **PASS** |
| **R6 (Archive Images)** | `/archive` 27 plate images & `.plate-grain` compositor stability | Trellick Tower top-right 60% blacked out by `<feTurbulence>` tile drop; 15–21 blank lazy boxes | **`27/27` images loaded (`naturalWidth > 0`)** with CSS-only `.plate-grain` (`0` black dropped compositor tiles) | **PASS** |
| **R7 (Stream)** | `SpecimenStream` focusable links & clone accessibility | `2` links/card on primary (first announced 150-char `imageAlt`); clones had non-empty `alt` | **`1` focusable link per primary card** (`9/9` primary cards = `[1,1,1,1,1,1,1,1,1]`); **`0` focusable links** and **`0` non-empty `alt` attributes** across all 9 cloned cards | **PASS** |

---

### 6.5 Final Visual Alignment Gate on `/archive` Desktop Lead Cards (`route-archive-plate-1280-viewport.png`, `route-archive-plate-1920-viewport.png`) — **PASS**

- Verified after the `.plateCard[data-cadence="lead"] .mediaStage` stretch fix in `ArchiveClient.tsx` and `archive.module.css`:
  - **At `1280×800` (`route-archive-plate-1280-viewport.png`):** `.mediaStage` height = `884.1px`, `.plate-frame` height = `852.1px`, top offset inside `.mediaStage` = **`16.0px`** (`1rem` stage padding, `0px` vertical gap).
  - **At `1920×1080` (`route-archive-plate-1920-viewport.png`):** `.mediaStage` height = `1149.3px`, `.plate-frame` height = `1117.3px`, top offset inside `.mediaStage` = **`16.0px`** (`1rem` stage padding, `0px` vertical gap).
  - Both screenshots were visually inspected via `read_file` and confirm that Trellick Tower (`CAT. 001`) fills the entire height of `.mediaStage` from top to bottom, aligned flush with the adjacent Barbican Estate (`CAT. 002`) companion plate.
