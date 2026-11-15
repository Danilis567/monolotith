# MONOLITH — Web Layout, Grid, Responsive & Motion Architecture

> **Target Stack:** Next.js (App Router, TypeScript) + CSS Modules / Token Stylesheet ([tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css)) + Motion (`motion/react`)  
> **Governing Specifications:** [BRAND.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/BRAND.md) · [COLOR_SYSTEM.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md) · [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md) · [SITE_COPY.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_COPY.md) · [SITE_VISUAL.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_VISUAL.md)  
> **Catalog Dataset:** [src/data/buildings.ts](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/data/buildings.ts) — **27** surveyed structures (`CAT. 001`–`CAT. 027` / `ARC-001`–`ARC-027` across **3** movements: 9 Brutalist, 9 Gothic, 9 Monumental; **9** orthographic Anatomy plates).  
> **Visual Lineage (`ref/`):** Synthesizes all 14 verified reference boards (`preview (1).webp`, `preview (2).webp`, `preview (3).webp`, `preview.webp`, `45e4f814...jpg` *Saint Petersburg*, `5fc0fcec...jpg` *Gothic Art*, `7ed9e87d...jpg` *Brutalism UK 1950*, `135d5a8d...jpg` *Astor Mansions*, `1615b1e8...jpg` *Fallen Angel*, `c5eb814a...jpg` *Martha Lives*, `e290eb14...jpg` *Decondor*, `0dab4c07...jpg` *Ribbed Vault*, `af5d4910...jpg`, `db816a1c...jpg`).

---

## 1. Architectural Thesis & Structural Laws

MONOLITH treats the browser viewport as an **architectural drafting sheet and museum exhibition plate**, never as a SaaS dashboard or card-stream template.

1. **Zero Softness Law:** `border-radius: 0px`, `box-shadow: none`, and `backdrop-filter: none` across every route, control, dialog, and plate.
2. **Exposed Grid Discipline:** Structural `1px` hairlines (`--border-hairline`) and `1–2px` brutalist frames (`--border-structural`) remain visible as load-bearing partitions, anchored by `9×9px` / `13×13px` `+` crosshairs and stepped `6px`/`12px` mitered corner notches (`aria-hidden="true"`).
3. **Dark-First Baseline + Polarity Islands:** `:root` renders in Dark-First Void Concrete (`#131313`) with Raw Plaster (`#E9E5DF`) ink. Light drafting sheets (`/anatomy` default) and inverted active controls opt in via `[data-surface="plaster"]` (`#E9E5DF`), `[data-surface="limestone"]` (`#B9B5AA`), or `[data-surface="void"]` (`#131313`) per [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css).
4. **Rationed Signal Vermilion (`<= 2%` Viewport Area):** Adaptive Signal Vermilion (`#F45D4D` on dark, `#A81F17` on plaster, `#8B1912` on limestone, `#C8281E` atmospheric glow only) is restricted to active route markers, live telemetry indices (`CAT. 001`), active structural axis vectors, and validation/empty error states—always paired with a non-color glyph or text cue (WCAG 1.4.1).
5. **Logical Sizing & Zero Horizontal Spill:** All spatial layouts use CSS logical properties (`inline-size`, `block-size`, `margin-inline`, `padding-block`, `inset-inline-start`), dynamic viewport units (`100dvh`, `100%` / `100dvw`—never `100vw`), `min-inline-size: 0` on flex/grid children, and `overflow: clip` (never `overflow: hidden` when only clipping).

---

## 2. Breakpoints & Exposed 12-Column Grid Specification

### 2.1 Viewport Breakpoints

| Tier | Range | Grid Columns | Gutter (`column-gap`) | Outer Margin (`padding-inline`) | Primary Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`mobile` (`< md`)** | `< 768px` | **4 columns** | `16px` (`1rem`) | `16px` (`1rem`) | Re-composed single-sheet poster stack & accessible catalog slips |
| **`tablet` (`md`)** | `768px – 1023px` | **8 columns** | `20px` (`1.25rem`) | `24px` (`1.5rem`) | Dual-zone split plates & compact index ledger |
| **`desktop` (`lg`)** | `1024px – 1439px` | **12 columns** | `24px` (`1.5rem`) | `32px` (`2rem`) | Full exhibition poster grid, vertical marginalia & 3-col prose |
| **`exhibition` (`xl`)** | `>= 1440px` | **12 columns** | `24px` (`1.5rem`) | `48px` (`3rem`) | Full-bleed poster framing (`max-inline-size: 1680px` centered) |

### 2.2 Exposed Grid Overlay & Structural Partition Mechanics

```css
/* Shared 12-col architectural grid container */
.monolith-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: var(--grid-gutter, 1rem);
  padding-inline: var(--grid-margin, 1rem);
  inline-size: 100%;
  max-inline-size: 1680px;
  margin-inline: auto;
  position: relative;
}

@media (width >= 768px) {
  .monolith-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    --grid-gutter: 1.25rem;
    --grid-margin: 1.5rem;
  }
}

@media (width >= 1024px) {
  .monolith-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    --grid-gutter: 1.5rem;
    --grid-margin: 2rem;
  }
}

@media (width >= 1440px) {
  .monolith-grid {
    --grid-margin: 3rem;
  }
}
```

- **Exposed Vertical Hairlines (`<GridGuides />`):** An `aria-hidden="true"` architectural overlay renders vertical `1px` `--border-hairline` tracks (`opacity: 0.28` for background column guides; full `--border-hairline` for semantic section partitions) aligned to column boundaries `1, 4, 7, 10, 13` on desktop and `1, 5` on mobile.
- **Intersection Registration Marks (`<CornerCrosshair />`):** `13×13px` geometric `+` SVG primitives (`stroke-width: 1px`, `vector-effect: non-scaling-stroke`, `aria-hidden="true"`) placed at major band intersections (`row × col`).
- **Stepped Corner Notches (`<SteppedFrame />`):** Nested `90°` L-brackets (`12×12px` outer, `6×6px` inner step, `1px solid var(--border-structural)`, referencing `e290eb14...jpg` *Decondor*) applied strictly to primary exhibition hero plates (`/` hero specimen, `/structures/[slug]` split plate, `/anatomy` orthographic canvas). Never placed on buttons or small UI controls.
- **Same-Polarity Surface Borders:** Whenever adjacent surfaces share polarity (e.g., `Void Concrete #131313` beside `Basalt #282828` [1.26:1], or `Raw Plaster #E9E5DF` beside `Limestone #B9B5AA` [1.63:1]), a `1px solid var(--border-hairline)` or `var(--border-structural)` boundary is **mandatory** for interactive clarity and WCAG 1.4.11 compliance.

---

## 3. Global Navigation, Shell & Next.js App Router Architecture

### 3.1 Route Map (`src/app/`)

```text
src/app/
├── layout.tsx                 # Global shell, <MotionConfig reducedMotion="user">, fonts, skip link, SVG <clipPath> defs
├── globals.css                # @import tokens-color.css, type scale, .visually-hidden, reduced-motion rules
├── page.tsx                   # 01 HOME (/)
├── archive/
│   └── page.tsx               # 02 ARCHIVE (/archive) — PLATE & INDEX views (27 structures)
├── structures/
│   └── [slug]/
│       └── page.tsx           # 03 STRUCTURE DETAIL (/structures/[slug]) — CAT. 001–027 / ARC-001–027 dossiers
└── anatomy/
    └── page.tsx               # 04 ANATOMY (/anatomy) — 9 orthographic plates (Plaster / Void switcher)
```

### 3.2 Masthead & Navigation Architecture (`<SiteHeader />`)

Single `<header aria-label="PRIMARY ARCHIVE HEADER">` containing one `<nav aria-label="PRIMARY ARCHIVE NAVIGATION">` landmark across all viewports (no duplicate mobile/desktop `<nav>` DOM trees). Skip link `<a href="#main-content" className="skip-link">SKIP TO PRIMARY CONTENT</a>` precedes the header.

- **Height:** `56px` (`3.5rem`) on `< 1024px`; `64px` (`4rem`) on `>= 1024px`.
- **Position:** `position: sticky; inset-block-start: 0; z-index: 40; border-block-end: 1px solid var(--border-hairline); background-color: var(--surface-canvas);`
- **Desktop Layout (`>= 1024px`, 12 columns):**
  - **Cols 1–3 (Left):** Brand Link (`/`), `aria-label="MONOLITH — RETURN TO 01 HOME"`, rendering `brand/nav-lockup.svg` (or `nav-lockup-light.svg` on `[data-surface="plaster"]`) at **`26px` height** (compliant with `24–28px` spec and `0.5H` horizontal clearspace in [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md)).
  - **Cols 4–9 (Center Rail):** Inline horizontal route links (`display: flex; gap: 2rem`), set in `--type-ui-label` (`12px` Inter `500`, `UPPERCASE`, `+0.14em` tracking):
    - `01 HOME` (`/`)
    - `02 ARCHIVE` (`/archive`)
    - `04 ANATOMY` (`/anatomy`)
    - *(Note: `03 STRUCTURE DETAIL` is accessed from any specimen card/row, Home `CAT. 001` callout, or the `• MENU` drawer directory (`03 STRUCTURE DETAIL · CAT. 001`), and surfaces explicitly in `/structures/[slug]` breadcrumbs.)*
    - **Active Indicator (`aria-current="page"`):** Paired **Signal Vermilion `5px` dot (`•`)** + **`1px solid var(--signal-border)` bottom rule** + **`font-weight: 700`** (never color alone, per WCAG 1.4.1).
  - **Cols 10–12 (Right Telemetry & Drawer Trigger):** Live catalog telemetry (`• INDEXED: 27 PLATES` in `IBM Plex Mono` `tabular-nums`, `--ink-secondary`) + `• MENU` / `CLOSE ×` drawer toggle (`min-block-size: 44px; min-inline-size: 44px`).
- **Mobile & Tablet Layout (`< 1024px`, 4/8 columns):**
  - Left: `brand/nav-lockup.svg` (`24px` height).
  - Right: `• MENU` (`aria-label="OPEN NAVIGATION INDEX"`, `aria-expanded={open}`, `aria-controls="monolith-drawer"`, `44×44px` minimum touch target) toggling to `CLOSE ×` when open.
  - **Mobile / Full-Screen Index Drawer (`<dialog id="monolith-drawer" ref={dialogRef}>` via `.showModal()`):**
    - Native `<dialog>` provides automatic focus trapping, `inert` background, and `Esc` dismissal without custom focus-trap libraries.
    - Full-bleed `100dvw × 100dvh`, `Void Concrete` (`#131313`) ground, exposed 4-column hairline tracks.
    - Top bar (`56px`): `FOLIO DIRECTORY · EDITION IV` + close button (`CLOSE ×`, `44×44px`).
    - Body: Vertical stacked monolithic links (`01 HOME`, `02 ARCHIVE`, `03 STRUCTURE DETAIL`, `04 ANATOMY` — where `03 STRUCTURE DETAIL` links to the featured/active specimen dossier `/structures/trellick-tower` with `CAT. 001` / `ARC-001` telemetry) set in `Bodoni Moda 600` (`clamp(2.25rem, 8vw, 3.5rem)`), each row bounded by `1px solid var(--border-hairline)` with laconic description and `↗` arrow.
    - Footer strip inside drawer: `DATUM 51°30'00"N × 0°07'00"W · METRIC SI · 126–PRESENT`.

### 3.3 Global Footer (`<SiteFooter aria-label="ARCHIVE COLOPHON AND INDEX STATEMENT">`)

- Full-bleed `1px solid var(--border-structural)` top rule.
- **Upper Band (12 cols):**
  - `>= 1024px`: Renders `brand/footer-lockup.svg` (or `footer-lockup-light.svg`) spanning full container width (`>= 880px` minimum width per `LOGO_GUIDELINES.md` §3).
  - `< 1024px`: Automatically swaps to `brand/monolith-wordmark-dark.svg` (or `-light.svg`) + stacked `IBM Plex Mono` colophon lines so `13.5`-unit SVG micro-text never drops below legible thresholds.
- **Middle Band:** 4-cell colophon ledger (`CLASSIFICATION: ARCHIVAL MONOGRAPH`, `DATUM: WGS84 · METRIC SI`, `SET IN: BODONI MODA / INTER / IBM PLEX MONO`, `© 2026 MONOLITH · EDITION: VOL. IV · 15 / 11 / 2026`) + 4-route / 3-movement quick index separated by `1px` vertical hairlines on desktop, stacked with horizontal `1px` rules on `< 768px`.
- **Bottom Ruler Rail (`aria-hidden="true"`):** `1px` baseline with repeating `4px` minor / `8px` major graduation ticks and `tabular-nums` metric markers (`00  10  20  30  40  50  60 ... 120`, referencing `45e4f814...jpg`), paired with `TOP OF FOLIO ↑` (`aria-label="RETURN TO TOP OF PAGE"`).

---

## 4. Section-by-Section Layout & Wireframe Specifications

### 4.1 `01 HOME` (`/`)

Designed as a continuous 4-band vertical exhibition poster on `Void Concrete` (`#131313`).

```text
+=============================================================================+
| [NAV] MONOLITH | 01 HOME •   02 ARCHIVE   04 ANATOMY | • INDEXED: 27 PLATES |
+=============================================================================+
| BAND A: FULL-BLEED HERO POSTER (min-block-size: calc(100dvh - 64px))        |
|                                                                             |
|  [Z1: ECHO OUTLINE "MONOLITH" (aria-hidden)]                                |
|  MASS / CAST / UNDER / GRAVITY   126–1982                                   |
|                                  +-------------------------+                |
|  ARCHITECTURAL MONOGRAPH         |   [Z2: HERO PLATE]      | CAT. 001       |
|  · FOLIO 01 (Signal Vermilion)   |   Trellick Tower        | TRELLICK TOWER |
|                                  |   silhouette + core     | Ernő Goldfinger|
|  Raw aggregate, load-bearing     |   #C8281E glow          | 98.0 M ·       |
|  geometry, and archival record.  |   [aspect-ratio: 3/4]   | BÉTON BRUT     |
|  [ ↗ ENTER ARCHIVE ]             +-------------------------+ + INSPECT ↗    |
|  [ VIEW MANIFESTO ↓ ]                                                       |
|-----------------------------------------------------------------------------|
| • CURRENT SURVEY | INDEXED PLATES: 27/27 | SPAN: 126–1982 | WGS84 · SI ↙    |
+=============================================================================+
| BAND B: 01.1 — CURATORIAL PREMISE ("ARCHITECTURE AS PERMANENT MASS")          |
|  +---------------+------------------+------------------------------------+  |
|  | COL 1-3       | COL 4-6          | COL 7-12                           |  |
|  | I-III 3-Col   | MONOGRAPH NOTE   | Monumental Architectural Plate     |  |
|  | Prose (34ch)  | "Bodoni Italic   | [aspect-ratio: 16/10]              |  |
|  |               |  pull-quote"     | CAT. 003 · UNITÉ D'HABITATION      |  |
+=============================================================================+
| BAND C: 01.2 — SPECIMEN STREAM / SURVEYED PLATES     [ PAUSE STREAM ] (WCAG) |
|  [ PLATE 3:4 ] | [ LANCET ARCH 3:4 ] | [ PLATE 16:10 ] | [ PLATE 3:4 ] ...  |
+=============================================================================+
| BAND D: 3-MOVEMENT LEDGER + 01.3 — COMPLETE LEDGER                          |
|  01 BRUTALIST  | 1947–1980   | 09 PLATES | FILTER BRUTALIST ↗               |
|  02 GOTHIC     | 1163–1965   | 09 PLATES | FILTER GOTHIC ↗                  |
|  03 MONUMENTAL | 126–PRESENT | 09 PLATES | FILTER MONUMENTAL ↗              |
|  [ 01.3 — COMPLETE LEDGER: ACCESS THE 27-STRUCTURE INDEX -> OPEN 02 ARCHIVE ↗ ] |
+=============================================================================+
```

- **Band A — Full-Bleed Poster Hero (`min-block-size: calc(100dvh - 64px)`):**
  - **Vertical Flanking Edge Strip (`aria-hidden="true"`, Desktop Col 1 outer rail):** `RAW, CONCRETE, MONOLITHIC. BOARD-FORMED, LOAD-BEARING, PERMANENT.` (`7ed9e87d...jpg`).
  - **Z-1 (Cols 1–12, Backdrop):** Hollow outline echo word `MONOLITH` (`-webkit-text-stroke: 1px var(--border-hairline); color: transparent`, `aria-hidden="true"`) layered behind the upper-middle hero structure plate, paired with stacked display `<h1>` `MASS` / `CAST` / `UNDER` / `GRAVITY` (`Bodoni Moda 900`, `--type-monolith`, `line-height: 0.86`, `-0.045em`) + chronology stamp `126–1982` anchored flush to the headline right edge.
  - **Z-2 (Cols 5–9, Center-Right Mass):** Primary hero architectural plate (`CAT. 001` Trellick Tower, `aspect-ratio: 3 / 4`, `fetchpriority="high"`, **NO `loading="lazy"`**), bounded by `<SteppedFrame />` corner notches and optional interior `--signal-glow` (`#C8281E`) behind the concrete silhouette (`preview (1).webp`).
  - **Z-3 (Cols 1–4 Lower Left & Cols 10–12 Mid-Right):**
    - Left: `• ARCHITECTURAL MONOGRAPH · FOLIO 01` (`--type-colophon`, `--signal-ink`), lead abstract (`Raw aggregate, load-bearing geometry, and archival record. Surveying brutalist, gothic, and monumental masonry structures erected across nine centuries.`, `<= 44ch`), and dual CTAs: `↗ ENTER ARCHIVE` (`1px solid var(--border-structural)`, `min-block-size: 44px`) + `VIEW MANIFESTO ↓`.
    - Right: Featured Monolith Specimen Callout (`CAT. 001` in `--signal-ink` `#F45D4D`, `TRELLICK TOWER`, `Ernő Goldfinger, 1972`, `London, United Kingdom`, `98.0 M · BÉTON BRUT`, `+ INSPECT DOSSIER ↗` linking to `/structures/trellick-tower`).
  - **Hero Bottom Survey Strip (4 equal cells across 12 cols, `1px solid var(--border-hairline)` top rule):**
    - Cell 01: `• CURRENT SURVEY` — `Load-Bearing Concrete & Pointed Ribbed Masonry`
    - Cell 02: `INDEXED PLATES` — `27 / 27` (`tabular-nums`)
    - Cell 03: `SPAN RECORDED` — `126 — 1982` (`tabular-nums`)
    - Cell 04: `PRIMARY DATUM` — `WGS84 · METRIC SI ↙`
- **Band B — Curatorial Premise & Asymmetrical Manifesto (`Takumi` `preview (2).webp` + `Martha Lives` `c5eb814a...jpg`):**
  - Overline: `01.1 — CURATORIAL PREMISE` | Headline: `ARCHITECTURE AS PERMANENT MASS` (`--type-display`, `UPPERCASE`, `line-height: 0.94`).
  - Lower Split (`1px solid var(--border-hairline)` top rule):
    - Cols 1–6: **3-column print prose** (`I. MATERIAL HONESTY`, `II. STRUCTURAL LINEAGE`, `III. ARCHIVAL RECORD`, `max-inline-size: 34ch` per column) + inlaid `MONOGRAPH NOTE` (`Bodoni Moda 400 Italic` pull-quote `--type-quote` + `— MONOLITH SURVEY FOLIO I, SECTION 04`).
    - Cols 7–12 (`1px` left rule): Monumental `16 / 10` specimen plate (`CAT. 003` Unité d'Habitation, `loading="lazy"`).
- **Band C — Selected Specimen Plates / Horizontal Specimen Stream:**
  - Header rail (Cols 1–12): `01.2 — SPECIMEN STREAM` / `SURVEYED PLATES` (`SHOWING 09 FEATURED OF 27`) on left; visible **WCAG 2.2.2 Pause/Play control** (`<button type="button">` toggling label between `PAUSE STREAM` and `PLAY STREAM`, **no `aria-pressed`**) on right.
  - Scrollable/auto-scrolling horizontal track of featured specimens across all 3 movements with varied poster proportions (`3/4` Rectilinear, `3/4` Pointed Lancet Arch `#monolith-lancet-3x4` for Gothic specimens, `16/10` Panorama), bounded by `1px solid var(--border-hairline)` vertical partitions and `CAT. 001`–`CAT. 027` stamps. Hover or keyboard `:focus-within` pauses stream motion.
- **Band D — 3-Movement Taxonomy Ledger + Complete Ledger Prompt:**
  - 3 full-width rows (`1px solid var(--border-hairline)` dividers, `1px solid var(--border-structural)` outer bounds):
    - `01 BRUTALIST` | `1947–1980` | `09 PLATES` | `BÉTON BRUT, PRECAST & STEEL` | `FILTER BRUTALIST ↗`
    - `02 GOTHIC` | `1163–1965` | `09 PLATES` | `LIMESTONE, MARBLE & SANDSTONE` | `FILTER GOTHIC ↗`
    - `03 MONUMENTAL` | `126–PRESENT` | `09 PLATES` | `CONCRETE, LIMESTONE & GRANITE` | `FILTER MONUMENTAL ↗`
  - **Bottom Ledger Prompt (`01.3 — COMPLETE LEDGER`):** `ACCESS THE 27-STRUCTURE INDEX` (`Twenty-seven surveyed structures across four continents...`) + `OPEN 02 ARCHIVE ↗` and `INSPECT 04 ANATOMY ↗`.

---

### 4.2 `02 ARCHIVE` (`/archive`)

Dual-mode taxonomic archive for all **27** structures (`CAT. 001`–`CAT. 027`), rejecting uniform SaaS card grids.

- **Archive Masthead (Cols 1–12):**
  - Overline: `02 / ARCHIVE · COMPLETE CATALOG LEDGER`
  - `<h1>` (`--type-display`): `STRUCTURE INDEX`
  - Abstract: `Surveyed structures indexed by movement, century, primary load-bearing material, and metric elevation.`
  - Live telemetry (`aria-live="polite"` debounced): `DISPLAYING {N} OF 27 STRUCTURES` (`IBM Plex Mono` `tabular-nums`).
- **Sticky Search, Filter & View Toggle Bar:**
  - `position: sticky; inset-block-start: var(--header-height); z-index: 30; background-color: var(--surface-canvas); border-block: 1px solid var(--border-structural);`
  - **Search Input:** Visible `<label htmlFor="archive-search">SEARCH CATALOG</label>`, `<input id="archive-search" type="search" placeholder="STRUCTURE, ARCHITECT, CITY, OR CAT. NO." />`, and conditional `CLEAR ×` button (`aria-label="CLEAR SEARCH QUERY"`).
  - **5 Filter Selectors** (native `<select>` with explicit `<label>`, `min-block-size: 44px`, `0px` radius, `1px solid var(--border-hairline)`):
    1. `MOVEMENT`: `ALL MOVEMENTS` | `BRUTALIST` | `GOTHIC` | `MONUMENTAL`
    2. `CONTINENT`: `ALL CONTINENTS` | `EUROPE` | `ASIA` | `AMERICAS` | `MIDDLE EAST`
    3. `MATERIAL`: `ALL MATERIALS` | `BÉTON BRUT & CONCRETE` | `LIMESTONE & MARBLE` | `STONE, GRANITE & BRICK` | `CONCRETE & STEEL` | `ROMAN CONCRETE`
    4. `ERA / CENTURY`: `ALL ERAS` | `ANTIQUITY (118–600 CE)` | `MEDIEVAL (1163–1575)` | `EARLY MODERN (1880–1945)` | `POST-WAR & LATE MODERN (1947–PRESENT)`
    5. `SORT`: `CAT. NO. (ASCENDING)` | `YEAR (OLDEST FIRST)` | `YEAR (NEWEST FIRST)` | `ELEVATION (HIGHEST)` | `ELEVATION (LOWEST)`
  - **Utility & View Toggle Controls:**
    - `RESET FILTERS ×` (`aria-label="RESET ALL ARCHIVE FILTERS AND SEARCH"`, visible whenever search or any filter is active).
    - **Dual-Mode View Switcher (`role="group" aria-label="SWITCH ARCHIVE DISPLAY MODE"`):** `[ PLATE ]` vs `[ INDEX ]` (`aria-pressed={view === 'plate'}` / `aria-pressed={view === 'index'}`). Synced to URL search params (`?view=plate|index`).
    - **WCAG Contrast Fix on Active Toggle Button:** Because `--signal-ink` on dark (`#F45D4D`) only achieves `2.57:1` against `#E9E5DF`, the active button **must** swap its own surface island via `data-surface={theme === 'dark' ? 'plaster' : 'void'}` (when rendered on dark canvas, the active button receives `data-surface="plaster"`, automatically switching background to `#E9E5DF`, text to `#131313` [`14.81:1`], and `--signal-ink` dot `•` to `#A81F17` [`5.83:1`]; when rendered on light canvas, the active button receives `data-surface="void"`, switching `--signal-ink` to `#F45D4D` [`5.77:1`]).

#### Mode A: `PLATE` Visual Grid (Asymmetrical 5-Item Cadence)

Items render sequentially in DOM order (preserving keyboard tab order!) into a **5-item repeating poster rhythm** on the 12-column grid:

| Position in 5-Item Cycle (`i % 5`) | Desktop Span (12-col) | Tablet Span (8-col) | Plate `aspect-ratio` | Crop Geometry (`SITE_VISUAL.md` §3) |
| :--- | :--- | :--- | :--- | :--- |
| **`0` (Lead Plate)** | `grid-column: 1 / 8` (7 cols) | `1 / 9` (8 cols) | `16 / 10` | Rectilinear Shear |
| **`1` (Vertical Pier)** | `grid-column: 8 / 13` (5 cols) | `1 / 5` (4 cols) | `3 / 4` | Lancet `#monolith-lancet-3x4` (if Gothic) / Rectilinear |
| **`2` (Triptych A)** | `grid-column: 1 / 5` (4 cols) | `5 / 9` (4 cols) | `3 / 4` | Lancet `#monolith-lancet-3x4` (if Gothic) / Rectilinear |
| **`3` (Triptych B)** | `grid-column: 5 / 9` (4 cols) | `1 / 5` (4 cols) | `1 / 1` | Rectilinear |
| **`4` (Triptych C)** | `grid-column: 9 / 13` (4 cols) | `5 / 9` (4 cols) | `2 / 3` | Lancet `#monolith-lancet-2x3` (if Gothic) / Rectilinear |

- Every plate cell sits inside a `1px solid var(--border-hairline)` frame (`[data-surface="basalt"]` hover state with `1px solid var(--border-structural)` border, zero `box-shadow`, zero `scale()` zoom—tonal contrast snap only).
- **Zero-Results State (`filtered.length === 0`):** Renders inside a `1px solid var(--border-structural)` full-width container: `× ERR 000 — NO MATCHING PLATES` (`--signal-ink` `#F45D4D` / `#A81F17`), `ZERO SPECIMENS FOUND` (`--type-display`), `No indexed structure satisfies the combined movement, era, material, and region parameters.`, and `RESET ALL FILTERS ×` button.

#### Mode B: `INDEX` Technical Table (Locked 8-Column Ledger + Accessible Mobile Transformation)

- Wrapped in `<div tabIndex={0} role="region" aria-labelledby="archive-index-caption" className="table-wrapper">` (`container-type: inline-size; overflow: auto;`).
- **Locked 8 Columns (`<th scope="col">` sortable header buttons):**
  1. `CAT. NO.` (`<th scope="row">` per row, `IBM Plex Mono`, e.g., `CAT. 001`)
  2. `STRUCTURE` (`Bodoni Moda 600` `<Link href="/structures/[slug]">`)
  3. `ARCHITECT` (`Inter 400`)
  4. `LOCATION` (`City, Country`)
  5. `YEAR` (`tabular-nums`, e.g., `1972`)
  6. `MOVEMENT` (`--type-ui-label`, `BRUTALIST` / `GOTHIC` / `MONUMENTAL`)
  7. `MATERIAL` (`IBM Plex Mono`, e.g., `BÉTON BRUT`)
  8. `ELEV.` (`tabular-nums`, right-aligned, e.g., `98.0 M`)
- **Desktop Hover / Focus Plate Preview (`@media (hover: hover) and (pointer: fine)`):** Hovering or keyboard-focusing a row updates a dedicated non-occluding `240px × 320px` (`aspect-ratio: 3/4`) margin preview plate (`fetchpriority="low"`, `1px solid var(--border-structural)`, `+` corner crosshairs).
- **Accessible Narrow-Container Transformation (`@container (width < 600px)`):**
  - **CRITICAL ACCESSIBILITY RULE:** **Never** set `thead { display: none; }` (which strips header semantics from screen readers in table navigation mode). Instead, hide `<thead>` visually via `.visually-hidden` (`position: absolute; inline-size: 1px; block-size: 1px; clip-path: inset(50%); overflow: hidden; white-space: nowrap;`) so screen readers retain full column-header context, while converting `<tbody>`, `<tr>`, `<th scope="row">`, and `<td>` into stacked **Catalog Slips** (`border: 1px solid var(--border-hairline); margin-block-end: 1rem`).
  - Inside each `<td>` (including `ARCHITECT`, `LOCATION`, `YEAR`, `MOVEMENT`, `MATERIAL`, `ELEV.`), render an explicit DOM `<span className="mobile-field-label" aria-hidden="true">{LABEL}</span>` hidden on `>= 600px` and revealed on `< 600px`—avoiding `::before` pseudo-element announcement duplication.

---

### 4.3 `03 STRUCTURE DETAIL` (`/structures/[slug]`)

Monograph dossier route for any of the **27** structures (`CAT. 001`–`CAT. 027` / `ARC-001`–`ARC-027`).

- **Breadcrumb Nav:** `<nav aria-label="SPECIMEN BREADCRUMB">` displaying `01 HOME / 02 ARCHIVE / {CAT. NO.} {STRUCTURE}` (`aria-current="page"` on final item).
- **Part 1 — Split Poster Header (`min-block-size: calc(100dvh - 64px)`):**
  - **Cols 1–6 (Hero Plate):** `aspect-ratio: 3 / 4`, `fetchpriority="high"`, NO `loading="lazy"`. Bounded by `<SteppedFrame />` corner notches (`12px`/`6px`).
    - *Gothic Structures (`movement === 'Gothic'`):* Clipped via SVG `#monolith-lancet-3x4` (`11–60–61` Pythagorean tangent lancet arch in `SITE_VISUAL.md` §3.2) with `0px` flat base and optional `✦` alignment stars (`aria-hidden="true"`).
    - *Brutalist & Monumental Structures:* Clipped via **Rectilinear Shear Crop** (`0px` corners).
  - **Col 7 (Vertical Marginalia Rail, Desktop `>= 1024px`):** Narrow `48px` track bounded by `1px solid var(--border-hairline)` left/right rules; vertical rotated stamp (`writing-mode: vertical-rl; transform: rotate(180deg)`): `{CAT. NO.} // {COORD. DMS} // {PLATE STAMP}` (`IBM Plex Mono`, `--ink-secondary`).
  - **Cols 8–12 (Editorial Masthead):**
    - Overline (`--signal-ink` `#F45D4D`): `SPECIMEN DOSSIER · {CAT. NO.} · {MOVEMENT}`
    - `<h1>` (`--type-monolith` / `--type-display`, `Bodoni Moda 900`): `{STRUCTURE}`
    - Subtitle (`--type-subhead`): `{ARCHITECT} · {CITY, COUNTRY} · {COMPLETION}`
    - Exhibition Abstract (`--type-body-lead`, `<= 62ch`): `summary`
    - Action links: `ARCHITECTURAL ANALYSIS ↓` and (when `hasAnatomyPlate === true`) `OPEN 04 ANATOMY ↗` (`/anatomy?plate={anatomyPlateId}`).
- **Part 2 — Full Technical Colophon Ledger (`<dl>` 12-Col Matrix):**
  - 9 standardized fields bounded by `1px solid var(--border-hairline)` (`3 cols × 3` on desktop, `2 cols` on tablet, `1 col` on mobile):
    1. `CAT. NO.` (`CAT. 001` / `ARC-001`)
    2. `ARCHITECT`
    3. `COMPLETION` (`yearCompleted` / `chronologyLabel`)
    4. `COORD.` (`dmsFormatted`, e.g., `51°31'25"N × 0°12'20"W`)
    5. `ELEVATION / HEIGHT` (`heightLabel`, e.g., `98.0 M (120 M WITH MAST)`)
    6. `SPAN / FOOTPRINT` (`spanOrLengthLabel` or `primaryMetric`)
    7. `PRIMARY MATERIAL` (`materialCode` + `materials` list)
    8. `MOVEMENT` (`movement` · `subStyle`)
    9. `STATUS` (`Standing` / `Demolished` / `Under Completion`)
- **Part 3 — Multi-Column Architectural Analysis & Observations:**
  - **Cols 1–9 (Desktop):** `ARCHITECTURAL ANALYSIS` (`structuralNotes` + `historicalContext`) set in **3-column print-grid layout** (`column-count: 3; column-gap: 2rem; column-rule: 1px solid var(--border-hairline);`, `max-inline-size: 34ch` per column per `BRAND.md` §3.3 & `c5eb814a...jpg`).
  - **Cols 10–12 (Desktop):** Metric callout datum (`heightMeters` `98.0 M` in `tabular-nums`, `45e4f814...jpg` scale) + `MONOGRAPH CITATION` (`Bodoni Moda 400 Italic` pull-quote `--type-quote`).
  - **Structural Observations Grid (`OBS. 01`–`OBS. 04`):** 4 equal cells (`3 cols` each on desktop, `2×2` on tablet, stacked on mobile) separated by `1px solid var(--border-hairline)` rules (`OBS. 01` through `OBS. 04`, matching `SITE_COPY.md` §4.4).
  - **Optional Structural Plates Gallery:** Secondary detail/elevation plates (`16/10` + `3/4` + `1/1`, `loading="lazy"`) when supplementary archival imagery is attached.
- **Part 4 — 3-Link Adjacent Plate Footer (`border-block-start: 1px solid var(--border-structural)`):**
  - 3-zone grid (`Cols 1–5` | `Cols 6–7` | `Cols 8–12`):
    - Left: `← PREVIOUS PLATE` (`{CAT. NO.} {STRUCTURE}`)
    - Center: `ALL PLATES` (`/archive`, centered vertical partition cell)
    - Right: `NEXT PLATE →` (`{CAT. NO.} {STRUCTURE}`)

---

### 4.4 `04 ANATOMY` (`/anatomy`)

Interactive orthographic drafting workbench displaying **9** architectural plates (3 Brutalist, 3 Gothic, 3 Monumental) mapped to `hasAnatomyPlate === true` records in `src/data/buildings.ts`. Defaults to **Raw Plaster light-paper (`[data-surface="plaster"]`, `#E9E5DF` ground, `#131313` ink)** with an interactive **Drafting-Table Polarity Switcher** (`PLASTER` vs `VOID` `#131313`).

- **Workbench Surface Isolation:**
  - The route `<main>` (or section wrapper) carries `data-surface={surface}` (`"plaster"` default or `"void"`), re-declaring all 23 Tier 2 semantic tokens from [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css) (`#A81F17` Signal Crimson on plaster; `#F45D4D` Molten Vermilion on void).
- **Top Header & Polarity Switcher (`1px solid var(--border-structural)` bottom):**
  - Overline: `04 / ANATOMY · ORTHOGRAPHIC SECTION PLATES` | `<h1>`: `STRUCTURAL ANATOMY`
  - Polarity Switcher: `[ SURFACE: PLASTER / VOID ]` `<button type="button">` (`aria-pressed={surface === 'void'}` with explicit visible text `ACTIVE: PLASTER` / `ACTIVE: VOID`).
- **Movement Filter Tabs (`role="tablist"`, Full 12-Col Bar):**
  - 4 horizontal tabs (`0px` rectangular frames, `1px solid var(--border-structural)` active border, `•` dot + `aria-selected="true"`):
    1. `ALL PLATES (09)`
    2. `01 / BRUTALIST` (`trellick-tower`, `unite-dhabitation`, `habitat-67`)
    3. `02 / GOTHIC` (`chartres-cathedral`, `sainte-chapelle`, `wells-cathedral`)
    4. `03 / MONUMENTAL` (`hagia-sophia`, `pantheon-rome`, `national-assembly-dhaka`)
  - Implements WAI-ARIA `tablist` keyboard pattern: `ArrowLeft` / `ArrowRight` / `Home` / `End` move focus and activate tabs seamlessly.
- **12-Column Drafting Layout:**
  - **Cols 1–3 (Left Control Rail):**
    - **Plate Selector List (9 Plates filtered by active tab):** Lists each plate (`CAT. 001 TRELLICK TOWER`, etc.) with `aria-current={isActive ? 'true' : undefined}`.
    - **3 Layer Toggles (`<fieldset><legend>DRAFTING LAYERS</legend>`):**
      1. `STRUCTURE` (`<button type="button" aria-pressed={layers.structure}>`) — primary masonry/concrete mass
      2. `AXIS & LOAD` (`<button type="button" aria-pressed={layers.axisLoad}>`) — plumb centerlines & `--signal-ink` thrust/compression vectors
      3. `DIMENSIONS` (`<button type="button" aria-pressed={layers.dimensions}>`) — metric span & elevation datums
      - Plus `ALL LAYERS` utility button + polite live region (`<p aria-live="polite">ACTIVE LAYERS: STRUCTURE, AXIS & LOAD, DIMENSIONS</p>`).
  - **Cols 4–12 (Main Orthographic SVG Canvas):**
    - Locked `aspect-ratio: 16 / 10` (`min-block-size: 420px` on desktop) bounded by `1px solid var(--border-structural)` and 4 corner `✦` / `+` alignment marks (`aria-hidden="true"`).
    - Mobile helper caption (`< 768px` only): `TAP OR SCROLL TO INSPECT PLATE` (`--type-colophon`).
    - Inline `<svg role="img" aria-labelledby="anatomy-plate-title anatomy-plate-desc" viewBox="0 0 1200 750">` with crisp `1px` (`vector-effect="non-scaling-stroke"`), `stroke-linecap="square"`, `stroke-linejoin="miter"`, and toggleable `<g id="layer-structure">`, `<g id="layer-axis-load">`, `<g id="layer-dimensions">`.
    - **Bottom Metric Scale Bar:** `SCALE 1:250 · METRIC SI` with `0   5   10   20   30 M` graduation ticks (`4px` minor / `8px` major) in `IBM Plex Mono` `tabular-nums`.
    - **Accessible Dimension Table Alternative (`<details>`):** `<details><summary>VIEW STRUCTURAL DIMENSION SCHEDULE</summary>...</details>` housing a semantic `<table>` of all spans, heights, load paths, and coordinates for the active plate (WCAG 1.1.1).
- **Bottom Referenced Specimens Cross-Link Strip (Cols 1–12):**
  - Links directly from the active orthographic plate (or system) to its corresponding `/structures/[slug]` dossier (`CAT. 001 TRELLICK TOWER ↗`, etc.).

---

## 5. Mobile Re-Composition (`< 768px`)

Mobile **re-composes** the poster sheet into a vertical single-sheet stack rather than shrinking desktop columns:

| Element | Desktop (`>= 1024px`) | Mobile Re-Composition (`< 768px`) |
| :--- | :--- | :--- |
| **Grid & Gutters** | 12-col, `24px` gutter, `32–48px` margin | 4-col, `16px` gutter, `16px` margin; background vertical guides reduced to outer rails + center axis (cols `1, 3, 5`). |
| **Navigation** | Inline 3-link horizontal bar (`01 HOME`, `02 ARCHIVE`, `04 ANATOMY`) + `• INDEXED: 27 PLATES` | `56px` bar (`nav-lockup` + `• MENU` trigger) opening native `<dialog>` full-bleed `100dvh` drawer (`FOLIO DIRECTORY · EDITION IV`, `01`–`04` directory, `CLOSE ×`). |
| **Home Hero** | Overlapping Z1 colossal type + Z2 right-center tower + Z3 left thesis & right `CAT. 001` telemetry | Sequential poster stack inside `min-block-size: 100dvh`: (1) Top `ARCHITECTURAL MONOGRAPH · FOLIO 01` + `CAT. 001` bar; (2) `MASS / CAST / UNDER / GRAVITY` layered over/behind `3:4` hero plate; (3) Lead abstract + full-width `↗ ENTER ARCHIVE` & `VIEW MANIFESTO ↓`; (4) 2×2 Survey Strip (`27 / 27`, `126 — 1982`). |
| **Rotated Marginalia** | `writing-mode: vertical-rl; rotate(180deg)` side rail on `/structures/[slug]` and hero edges | **Converted to horizontal ledger bar** (`flex-direction: row; flex-wrap: wrap; justify-content: space-between; border-block: 1px solid var(--border-hairline); padding-block: 0.75rem`) directly above the hero title. Zero sideways reading required. |
| **3-Column Prose** | `column-count: 3` with `1px` vertical rules & `34ch` measure | **Collapses to 1 column** (`column-count: 1; max-inline-size: 58ch`), with the `Bodoni Moda Italic` pull-quote promoted to a full-width inset block bounded top/bottom by `1px` hairlines before paragraph 2. |
| **Archive `PLATE` Grid** | 5-item asymmetrical 12-col cadence (`7+5`, `4+4+4`) | Alternating **Full-Bleed (`4 cols`, `16/10`)** and **Vertical (`4 cols`, `3/4`)** poster stack—never cramped tiny thumbnails. |
| **Archive `INDEX` Table** | 8-column `<table>` + hover plate dock | `@container (width < 600px)` applies `.visually-hidden` to `<thead>` (preserving screen-reader column context!) and renders `<tr>` as stacked **Catalog Slips** (`1px solid var(--border-hairline)`) with explicit `<span className="mobile-field-label" aria-hidden="true">` inside each `<td>` (`ARCHITECT`, `LOCATION`, `YEAR`, `MOVEMENT`, `MATERIAL`, `ELEV.`). |
| **Anatomy Workbench** | 3-col left rail + 9-col SVG canvas | Horizontal wrapped `role="tablist"` (`ALL PLATES (09)`, `01–03`) + compact plate selector dropdown/strip -> `16:10` SVG Canvas with `TAP OR SCROLL TO INSPECT PLATE` note -> 3-button Layer Toggle matrix (`44px` hit rows) + `ALL LAYERS` + `<details>` Dimension Schedule. |
| **Footer Wordmark** | `brand/footer-lockup.svg` (`>= 880px`) | Automatically swaps to `brand/monolith-wordmark-*.svg` (`>= 120px`) + stacked HTML colophon text. |

---

## 6. Motion Choreography (`motion/react` + Native CSS)

### 6.1 Mechanical Easing & Physics Prohibition

**Zero `type: "spring"`, zero bounce, zero overshoot, zero elastic curves.** All motion behaves like cast architectural shutters, precision drafting instruments, and optical apertures:

```ts
// src/lib/motion.ts
export const MONOLITH_EASE = [0.16, 1, 0.3, 1] as const;      // Decisive architectural settle
export const SHEAR_EASE    = [0.77, 0, 0.175, 1] as const;     // Symmetric mechanical shutter cut
export const STEPPED_EASE  = "steps(6, end)";                  // Brutalist loader/telemetry step

export const DURATION = {
  micro: 0.18,    // Hover border/ink snap
  rule: 0.45,     // Hairline scaleX/scaleY draw-in
  curtain: 0.65,  // Clip-path plate reveal
  lancet: 0.72,   // Bottom-up Gothic arch aperture reveal
} as const;
```

**GPU Compositor Strictness:** Animate **only** `transform` (`translate3d`, `scaleX`, `scaleY`), `opacity`, and `clip-path`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `box-shadow`.

### 6.2 Component Motion Matrix

| Component / Pattern | Trigger | Mechanism (`motion/react` / CSS) | Exact Choreography | Reduced-Motion Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **1. Rectilinear Plate Curtain** | `whileInView` (`once: true, amount: 0.18`) | `motion.div` animating `clipPath` | `inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)` (`0.65s`, `SHEAR_EASE`) + inner `img` subtle `scale(1.04) → scale(1)` (`transform` only). | Renders immediately at `inset(0% 0% 0% 0%)`, `scale(1)`, `opacity: 1`. |
| **2. Gothic Lancet Arch Reveal** | Mount (Hero) or `whileInView` | `motion.div` + SVG `#monolith-lancet-3x4` (`11–60–61` `3:4` or `2:3` clip) | Bottom-up aperture reveal from ground plane (`inset(100% 0% 0% 0%)` → `inset(0% 0% 0% 0%)`, `0.72s`, `MONOLITH_EASE`) inside the static pointed-arch silhouette. **Focus ring lives on unclipped parent wrapper**. | Final open arch state visible immediately. |
| **3. Exposed Hairline Rule Draw-In** | `whileInView` (`once: true`) | `motion.span` (`aria-hidden="true"`) | Horizontal rules: `scaleX: 0 → 1`, `transformOrigin: "0% 50%"` (`0.45s`, `MONOLITH_EASE`, `0.04s` stagger). Vertical rules: `scaleY: 0 → 1`, `transformOrigin: "50% 0%"`. | Final `scaleX: 1` / `scaleY: 1` immediately. |
| **4. Scroll-Linked Colossal Parallax** | Scroll progress (`0 → 1` over Hero) | Dual: CSS `animation-timeline: scroll()` inside `@supports ((animation-timeline: view()) and (animation-range: entry))` + `motion/react` `useScroll` + `useTransform` fallback | Background `MONOLITH` echo layer translates `translate3d(0, 0, 0) → translate3d(0, 18%, 0)` while foreground silhouette translates `0 → -6%`, creating physical architectural depth (`preview (3).webp`). | Static `translate3d(0, 0, 0)` (parallax disabled). |
| **5. Horizontal Specimen Stream** | Auto-run (paused via button / hover / focus) | CSS `@keyframes` (`transform: translate3d(0,0,0) → translate3d(-50%,0,0)`, `48s linear infinite`) | Smooth continuous horizontal stream (`animation-play-state: paused` on hover, `:focus-within`, or button click). Visible `<button>` (`PAUSE STREAM` / `PLAY STREAM`, **no `aria-pressed`**) fulfills **WCAG 2.2.2**. | Disabled by default inside `@media (prefers-reduced-motion: no-preference)`; renders as static horizontally scrollable track (`overflow-x: auto`). |
| **6. Brand Loader Mark (`loader-mark.svg`)** | Initial route/splash gate (optional `< 900ms` or manual replay) | Targeted SVG groups (`#frame-outer`, `#axis-plumb`, `#lancet-arch`, `#monolith-mass`) | Sequential mechanical cuts (`0ms` outer frame → `140ms` plumb axis `scaleY` → `280ms` lancet arch → `440ms` monolith slab `opacity`). | Instant final mark (`opacity: 1`). |
| **7. Anatomy Layer Draw-In** | Layer button toggle | `motion.g` (`opacity` + `pathLength` via `stroke-dashoffset`) | Axis/load vectors draw cleanly over `0.35s` `MONOLITH_EASE` without shifting SVG bounding box. | Immediate toggle (`opacity: 1` / `0`). |
| **8. Mobile `<dialog>` Drawer** | `showModal()` / `close()` | CSS `@starting-style` + `transition: opacity, transform, display, overlay` + `transition-behavior: allow-discrete` | Slides/shears vertically `translateY(-12px) → 0` + `opacity: 0 → 1` (`0.28s`, `MONOLITH_EASE`). | Instant open/close (`opacity: 1`, `transform: none`). |

### 6.3 Reduced Motion & Accessibility Implementation Rules

1. **Wrap Root Application:** `<MotionConfig reducedMotion="user">` in `src/app/layout.tsx` ensures all `motion/react` components honor OS reduced-motion preferences automatically.
2. **Opt-In CSS Animations (`@media (prefers-reduced-motion: no-preference)`):** Wrap decorative scroll-driven animations and the infinite marquee inside `@media (prefers-reduced-motion: no-preference)` so users with `reduce` never start from `opacity: 0` or `scale(0)`—elements remain in their **final visible state** at all times.
3. **Never Use Global `0.01ms` Overrides:** Do **not** declare `* { animation-duration: 0.01ms !important }`. Keep non-spatial state transitions (`color`, `background-color`, `border-color`, `0.15s`) active so hover/focus feedback remains crisp.
4. **Clip-Path Focus Ring Safety:** Because CSS `clip-path` clips an element's own `:focus-visible` outline, every interactive clipped plate (Lancet Arch or Rectilinear Shear) must place its `<Link>` / `:focus-visible` `outline: 2px solid var(--focus-ring); outline-offset: 2px;` on an **unclipped outer wrapper**.

---

## 7. Core Web Vitals, Media Priority & Zero-CLS Contract

| Metric / Attribute | Strict Engineering Rule |
| :--- | :--- |
| **LCP (`fetchpriority="high"`)** | Apply `fetchpriority="high"` **strictly to the single above-the-fold Hero plate** on `/` (`Band A`) and `/structures/[slug]` (`Part 1`). **Never** combine `fetchpriority="high"` with `loading="lazy"`. Maximum 1–2 high-priority images per route. |
| **Below-Fold Media (`loading="lazy"`)** | Apply `loading="lazy"` to Band B/C/D plates on `/`, Archive `PLATE` images below the initial fold, and Structure Detail gallery plates. Do **not** combine `fetchpriority="low"` with `loading="lazy"` on standard below-fold images. |
| **Hidden / Preloaded UI (`fetchpriority="low"`)** | Apply `fetchpriority="low"` only to initially hidden above-the-fold media (e.g., Archive `INDEX` hover-preview plate dock). |
| **Zero CLS (`aspect-ratio` + Dimensions)** | Every `<img>`, `<svg>`, and plate wrapper must declare explicit HTML `width` & `height` plus CSS `aspect-ratio` (`3/4`, `2/3`, `16/10`, `1/1`) and `display: block` (`object-fit: cover`). Sticky headers, filter bars, and dynamic counts reserve fixed track heights (`scrollbar-gutter: stable`). |
| **Font Loading (`next/font/google`)** | Load `Bodoni_Moda`, `Inter`, and `IBM_Plex_Mono` via `next/font/google` with `display: "swap"`, `adjustFontFallback: true`, and CSS variables bound in `<html>`. |

---

## 8. Pre-Implementation Verification Checklist

Before writing page components, verify every route against:
- [ ] All surface/ink combinations derive strictly from [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css) (`#77746C` never used on `< 24px` text or inside `[data-surface="limestone"]`; active `[ PLATE ]` / `[ INDEX ]` toggle swaps `[data-surface="plaster" | "void"]`).
- [ ] Brand SVG lockups use [brand/](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/) `<path>` assets (`nav-lockup` `24–28px`, `footer-lockup` `>= 880px` only).
- [ ] Single `<main id="main-content" tabIndex={-1}>` and single `<h1>` per route; skip link present; `forced-colors: active` preserves card outlines.
- [ ] Archive `INDEX` table uses `.visually-hidden` on `<thead>` (never `display: none`) and explicit `<span className="mobile-field-label" aria-hidden="true">` inside cells on `< 600px`.
- [ ] Zero `border-radius`, zero `box-shadow`, zero spring/bounce easings, zero banned AI clichés (`BRAND.md` §4.3).
