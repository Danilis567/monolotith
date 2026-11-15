# MONOLITH — Master Site Copy & Microcopy Specification

> **Document Scope:** Complete English UI copy, headlines, editorial prose, catalog colophon labels, filter taxonomies, empty/error states, accessibility `aria-label` strings, and page metadata for **MONOLITH**.  
> **Canonical Dataset:** [buildings.ts](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/data/buildings.ts) — **27** structures (`CAT. 001`–`CAT. 027`; internal IDs `ARC-001`–`ARC-027`) across **3** movements (`BRUTALIST`: 9, `GOTHIC`: 9, `MONUMENTAL`: 9; primary survey span `126–1982`, with `CAT. 026` continuing `1882–PRESENT`), and **9** orthographic Anatomy plates.  
> **Governing Specifications:** [BRAND.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/BRAND.md), [COLOR_SYSTEM.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md), [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md), and the 14 visual boards in `ref/` (including *Obsidian*, *Takumi*, *Residential Brutalism*, *Saint Petersburg*, *Gothic Art*, *Brutalism UK 1950*, *Astor Mansions*, *Fallen Angel*, *Martha Lives*, *Decondor*, *Ribbed Vault*, and *Web Brutalism*).  
> **Voice Standard:** **The Laconic Archivist** — dry, factual, declarative institutional catalog prose. Zero SaaS prompts, zero exclamation marks, zero banned clichés.

---

## 0. Editorial Governance & Formatting Laws

1. **Typographic Token Mapping:**
   - `--type-monolith` (`Bodoni Moda 900`, `-0.045em` tracking): Monumental hero headlines and echoed background index titles.
   - `--type-display` (`Bodoni Moda 600`, `-0.03em` tracking): Page titles, section headers, and specimen headings.
   - `--type-quote` (`Bodoni Moda 400 Italic`, `-0.015em` tracking): Single authoritative recognition or monograph pull-quotes.
   - `--type-subhead` (`Inter 600`, `-0.02em` tracking): Brutalist thesis statements and taxonomy subheads.
   - `--type-body-lead` (`Inter 400`): Exhibition abstracts (`max-width: 62ch`).
   - `--type-body` (`Inter 400`): Monograph commentary and multi-column catalog prose (`max-width: 58ch` single column; `34ch` in 3-column print grids).
   - `--type-ui-label` (`Inter 500`, `12px`, `UPPERCASE`, `+0.14em` tracking): Navigation links, filter controls, buttons, and table headers.
   - `--type-colophon` (`IBM Plex Mono 400/500`, `11–12px`, `UPPERCASE`, `+0.10em` tracking, `tabular-nums`): Coordinates, dates, catalog identifiers, dimensions, and scale graduations.
2. **Archival Data Formatting:**
   - **Catalog IDs:** `CAT. 001` through `CAT. 027` (`tabular-nums`).
   - **Chronology:** `YYYY`, `YYYY–YYYY`, or `DD / MM / YYYY` (e.g., `15 / 11 / 2026`). Never US `MM / DD / YY` formatting.
   - **Metric Dimensions:** SI units in uppercase (`98.0 M`, `43.3 M`, `150 MM`, `300,000 T`).
   - **Coordinates:** Degree-Minute-Second separated by multiplication sign (`51°31'25"N × 0°12'20"W`).
3. **Permitted Geometric Glyphs (No Unicode Emojis, No Icon Libraries):**
   - `+` Cardinal crosshair / expand
   - `×` Mitered cross / close / clear / validation error
   - `→` / `←` Orthogonal sequence arrow
   - `↗` / `↙` 45-degree dossier or telemetry arrow
   - `•` Signal Vermilion telemetry dot (`<= 2%` viewport area)
   - `✦` Four-point alignment anchor (`aria-hidden="true"` only)

---

## 1. Global Shell

### 1.1 Skip-to-Content & Landmark Accessibility

| Element | Copy / String | Token / Role | Notes |
| :--- | :--- | :--- | :--- |
| **Skip Link** | `SKIP TO PRIMARY CONTENT` | `--type-ui-label` | Visually hidden until keyboard focus; jumps to `#main-content`. |
| **Main Landmark `aria-label`** | `MONOLITH ARCHITECTURAL MONOGRAPH` | Landmark | Applied to `<main id="main-content">`. |
| **Header Landmark `aria-label`** | `PRIMARY ARCHIVE HEADER` | Landmark | Applied to `<header>`. |
| **Primary Nav `aria-label`** | `PRIMARY ARCHIVE NAVIGATION` | Landmark | Applied to `<nav>`. |
| **Footer Landmark `aria-label`** | `ARCHIVE COLOPHON AND INDEX STATEMENT` | Landmark | Applied to `<footer>`. |

### 1.2 Masthead & Header Bar

Derived from `preview (1).webp` (*Obsidian*), `preview (2).webp` (*Takumi*), and [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md):

| Slot | Copy | Token | Accessibility / Spec |
| :--- | :--- | :--- | :--- |
| **Brand Lockup** | `brand/nav-lockup.svg` *(or `nav-lockup-light.svg`)* | Custom SVG `<path>` | Link `aria-label`: `MONOLITH — RETURN TO 01 HOME`. |
| **Header Telemetry Stamp** | `VOL. IV · SURVEY 126–1982` | `--type-colophon` | Desktop secondary datum next to masthead divider. |
| **Live Index Indicator** | `• INDEXED: 27 PLATES` | `--type-colophon` | Signal dot (`--signal-ink`) paired with explicit text label (WCAG 1.4.1). |
| **Drawer Trigger (Closed)** | `• MENU` | `--type-ui-label` | `aria-label="OPEN NAVIGATION INDEX"`, `aria-expanded="false"`. |
| **Drawer Trigger (Open)** | `CLOSE ×` | `--type-ui-label` | `aria-label="CLOSE NAVIGATION INDEX"`, `aria-expanded="true"`. |

### 1.3 Primary Navigation (`01`–`04`)

Every primary route carries a two-digit tabular index prefix (`01`–`04`). Active route renders in `--ink-primary` with `--signal-ink` telemetry dot `•` and `aria-current="page"`.

| Route | Visible Label | Compact Mobile Label | `aria-label` |
| :--- | :--- | :--- | :--- |
| `/` | `01 HOME` | `01 HOME` | `01 HOME — EXHIBITION OVERVIEW` |
| `/archive` | `02 ARCHIVE` | `02 ARCHIVE` | `02 ARCHIVE — COMPLETE 27-STRUCTURE INDEX` |
| `/structures/[slug]` | `03 STRUCTURE DETAIL` | `03 DETAIL` | `03 STRUCTURE DETAIL — SPECIMEN DOSSIER` |
| `/anatomy` | `04 ANATOMY` | `04 ANATOMY` | `04 ANATOMY — ORTHOGRAPHIC SECTION PLATES` |

> **Routing Note on `03 STRUCTURE DETAIL`:** When no specimen slug is currently active, `03 STRUCTURE DETAIL` links to the anchor specimen (`/structures/trellick-tower`, `CAT. 001`) or reflects the active dossier (`03 STRUCTURE DETAIL · CAT. 001`) in drawer navigation.

### 1.4 Mobile / Full-Screen Index Drawer Copy

| Slot | Copy | Token | Notes |
| :--- | :--- | :--- | :--- |
| **Drawer Header Overline** | `FOLIO DIRECTORY · 27 STRUCTURES` | `--type-colophon` | Bounded by `1px` `--border-hairline`. |
| **Drawer Route Descriptions** | | | |
| — `01 HOME` | `Exhibition thesis, specimen stream, and 3-movement ledger.` | `--type-body` | |
| — `02 ARCHIVE` | `Filterable 27-structure ledger and asymmetric plate grid.` | `--type-body` | |
| — `03 STRUCTURE DETAIL` | `Technical colophon, structural observations, and coordinates.` | `--type-body` | |
| — `04 ANATOMY` | `Nine orthographic section plates and load-path diagrams.` | `--type-body` | |
| **Drawer Footer Stamp** | `DATUM 51°31'25"N × 0°12'20"W · METRIC SI` | `--type-colophon` | |

### 1.5 Footer Colophon & Index Statement

Derived from `45e4f8147b81c3e0bb8a8549802e6ace.jpg` (*Saint Petersburg* millimeter ruler & colophon) and `brand/footer-lockup.svg`:

| Block | Copy | Token | Notes |
| :--- | :--- | :--- | :--- |
| **Footer Wordmark** | `brand/footer-lockup.svg` *(>= 880px)* / `brand/monolith-wordmark-dark.svg` *(< 880px on dark)* / `brand/monolith-wordmark-light.svg` *(< 880px inside `[data-surface="plaster"]`)* | Custom SVG | Home anchor (`aria-label="MONOLITH — RETURN TO TOP OF ARCHIVE"`). |
| **Index Statement** | `MONOLITH IS AN ARCHITECTURAL MONOGRAPH ARCHIVE CATALOGING 27 BRUTALIST, GOTHIC, AND MONUMENTAL STRUCTURES ACROSS FOUR CONTINENTS (126–1982). ALL COORDINATES, ELEVATIONS, AND MATERIAL SPECIFICATIONS ARE RECORDED IN METRIC SI UNITS.` | `--type-colophon` | `max-width: 58ch`. |
| **Colophon Ledger (4 Cells)** | | | |
| — Cell 01 (`CLASSIFICATION`) | `CLASSIFICATION: ARCHIVAL MONOGRAPH (27 PLATES)` | `--type-colophon` | |
| — Cell 02 (`DATUM`) | `DATUM: WGS84 · METRIC SI` | `--type-colophon` | |
| — Cell 03 (`TYPOGRAPHY`) | `SET IN: BODONI MODA / INTER / IBM PLEX MONO` | `--type-colophon` | |
| — Cell 04 (`EDITION`) | `© 2026 MONOLITH · EDITION: VOL. IV · 15 / 11 / 2026` | `--type-colophon` | |
| **Scale Ruler Track** | `00` · `10` · `20` · `30` · `40` · `50` · `60` · `70` · `80` · `90` · `100` · `110` · `120` | `--type-colophon` | `aria-hidden="true"` decorative millimeter ticks. |
| **Footer Utility Link** | `TOP OF FOLIO ↑` | `--type-ui-label` | `aria-label="RETURN TO TOP OF PAGE"`. |

### 1.6 Global Error & System States

| State | Code & Headline | Body Copy | Action Label |
| :--- | :--- | :--- | :--- |
| **404 — Unindexed Route** | `ERR 404 — RECORD UNINDEXED` | `The requested plate or coordinate does not exist in the 27-structure folio.` | `RETURN TO 01 HOME ↗` / `OPEN 02 ARCHIVE ↗` |
| **500 — Index Unavailable** | `ERR 500 — ARCHIVAL INDEX UNAVAILABLE` | `The catalog ledger failed to compile. Reload the document or return to the primary index.` | `RELOAD FOLIO ↗` |
| **Plate Media Fallback** | `PLATE UNRENDERED — MEDIA MISSING` | `Photographic emulsion unavailable for this specimen.` | `VIEW TECHNICAL COLOPHON ↓` |

---

## 2. Route `01 HOME` (`/`)

### 2.1 Document Metadata

- **`<title>`:** `MONOLITH — Brutalist, Gothic & Monumental Architectural Archive`
- **`<meta name="description">`:** `Archival monograph cataloging 27 Brutalist, Gothic, and Monumental structures erected between 126 and 1982.`

### 2.2 Hero Display Typography & Poster Overlines

Inspired by `preview (1).webp` (*Obsidian*), `preview (3).webp` (*Residential Brutalism*), and `7ed9e87d3c2d61e0481fa3306ecb0c6a.jpg` (*Brutalism UK 1950*):

| Slot | Copy | Token | Notes |
| :--- | :--- | :--- | :--- |
| **Poster Edge Strip (Vertical)** | `RAW, CONCRETE, MONOLITHIC. BOARD-FORMED, LOAD-BEARING, PERMANENT.` | `--type-colophon` | `aria-hidden="true"` flanking strip per `7ed9e87...jpg`. |
| **Hero Overline** | `ARCHITECTURAL MONOGRAPH · FOLIO 01` | `--type-colophon` | `--signal-ink` telemetry cue paired with `•`. |
| **Echo Backdrop Word** | `MONOLITH` | `--type-monolith` | Hollow `-webkit-text-stroke: 1px var(--border-hairline)`, `aria-hidden="true"`, layered behind hero structure plate. |
| **Hero Display Headline** | `MASS` / `CAST` / `UNDER` / `GRAVITY` | `--type-monolith` | Four-line tight vertical stack (`line-height: 0.86`, `-0.045em`). |
| **Hero Chronology Stamp** | `126–1982` | `--type-colophon` | Anchored flush to headline right edge. |
| **Hero Lead Abstract** | `Raw aggregate, load-bearing geometry, and archival record. Surveying 27 brutalist, gothic, and monumental structures erected between 126 and 1982.` | `--type-body-lead` | `max-width: 44ch`. |
| **Primary Hero CTA** | `↗ ENTER ARCHIVE` | `--type-ui-label` | `1px` `--border-structural` frame, `0px` radius. |
| **Secondary Hero CTA** | `VIEW MANIFESTO ↓` | `--type-ui-label` | Scrolls to Curatorial Premise section. |

#### Hero Bottom 4-Cell Survey Strip (Per `preview (1).webp` Lower Grid)

| Cell | Label | Value | Token |
| :--- | :--- | :--- | :--- |
| **Cell 01** | `• CURRENT SURVEY` | `Load-Bearing Concrete, Ribbed Vaults & Monolithic Spans` | `--type-colophon` / `--type-body` |
| **Cell 02** | `INDEXED PLATES` | `27 / 27` | `--type-colophon` |
| **Cell 03** | `SPAN RECORDED` | `126 — 1982` | `--type-colophon` |
| **Cell 04** | `PRIMARY DATUM` | `WGS84 · METRIC SI ↙` | `--type-colophon` |

### 2.3 Featured Monolith Specimen Callout

Positioned against the primary hero architectural plate (referencing `001 / Monolithic Research Facility / Iceland / +` in `preview (1).webp`):

| Slot | Copy | Token | Notes |
| :--- | :--- | :--- | :--- |
| **Specimen Index** | `CAT. 001` | `--type-colophon` | `--signal-ink` marker. |
| **Specimen Title** | `TRELLICK TOWER` | `--type-ui-label` | |
| **Specimen Sub-Data** | `Ernő Goldfinger, 1972` / `London, United Kingdom` | `--type-colophon` | `--ink-secondary`. |
| **Metric Line** | `98.0 M · BÉTON BRUT` | `--type-colophon` | |
| **Action Anchor** | `+ INSPECT DOSSIER ↗` | `--type-ui-label` | `aria-label="INSPECT CAT. 001 TRELLICK TOWER DOSSIER"`. |

### 2.4 Manifesto / Curatorial Premise Block

Derived from `preview (2).webp` (*Takumi*), `c5eb814ab3b11a46ee4eb2146116b999.jpg` (*Martha Lives* 3-column grid), and `BRAND.md`:

| Slot | Copy | Token |
| :--- | :--- | :--- |
| **Section Index Overline** | `01.1 — CURATORIAL PREMISE` | `--type-colophon` |
| **Section Headline** | `ARCHITECTURE AS PERMANENT MASS` | `--type-display` |
| **Column 01 Heading** | `I. MATERIAL HONESTY` | `--type-ui-label` |
| **Column 01 Prose** | `Every structure in this catalog declares its load path without cladding. Board-formed concrete retains the grain of timber shuttering; dressed limestone exposes every chisel course and mortar bed.` | `--type-body` (`max-width: 34ch`) |
| **Column 02 Heading** | `II. STRUCTURAL LINEAGE` | `--type-ui-label` |
| **Column 02 Prose** | `Gothic master masons and post-war brutalist engineers solved identical gravitational problems. Ribbed stone vaults channel lateral thrust downward; detached concrete cores anchor suspended slabs.` | `--type-body` (`max-width: 34ch`) |
| **Column 03 Heading** | `III. ARCHIVAL RECORD` | `--type-ui-label` |
| **Column 03 Prose** | `Twenty-seven plates are compiled as verifiable physical documents. Each entry fixes geographic coordinates, metric elevation, primary aggregate, and completion year against orthographic section drawings.` | `--type-body` (`max-width: 34ch`) |
| **Recognition / Thesis Overline** | `MONOGRAPH NOTE` | `--type-colophon` |
| **Pull-Quote** | `“Stone and cast concrete carry no memory of fashion; they answer only to compression, tension, and weather.”` | `--type-quote` (`Bodoni Moda 400 Italic`) |
| **Pull-Quote Attribution** | `— MONOLITH SURVEY FOLIO I, SECTION 04` | `--type-colophon` |
| **Band B Right Plate Caption (Cols 7–12, `16/10`)** | `CAT. 003 · UNITÉ D'HABITATION` | `--type-colophon` |

### 2.5 Band C — Horizontal Specimen Stream (WCAG 2.2.2)

Continuous horizontal architectural plate track bounded by `1px` `--border-hairline` vertical dividers:

| Slot | Copy | Token / Spec |
| :--- | :--- | :--- |
| **Band Header Overline** | `01.2 — SPECIMEN STREAM` | `--type-colophon` |
| **Band Headline** | `SURVEYED PLATES` | `--type-display` |
| **Band Count Stamp** | `SHOWING 09 FEATURED OF 27` | `--type-colophon` |
| **Motion Control (Playing)** | `PAUSE STREAM` | `--type-ui-label` (`<button type="button">`, **no `aria-pressed`** when label toggles) |
| **Motion Control (Paused)** | `PLAY STREAM` | `--type-ui-label` (`<button type="button">`, `aria-label="RESUME HORIZONTAL SPECIMEN STREAM"`) |
| **Stream Accessibility Hint** | `Hover or focus any plate to hold stream position.` | `--type-colophon` |

#### Stream Sample Specimen Slips (Aligned to `src/data/buildings.ts`)

1. **`CAT. 001` — `TRELLICK TOWER`** (`BRUTALIST · 1972 · 98.0 M · BÉTON BRUT`) — `Thirty-one-storey residential slab linked to a detached vertical service and circulation shaft by aerial concrete bridges.` · `INSPECT DOSSIER ↗`
2. **`CAT. 010` — `CHARTRES CATHEDRAL`** (`GOTHIC · 1194–1260 · 113.0 M SPIRE · BERCHÈRES LIMESTONE`) — `High Gothic limestone basilica introducing three-storey nave elevations, quadripartite rib vaults, and external flying buttresses.` · `INSPECT DOSSIER ↗`
3. **`CAT. 023` — `PANTHEON`** (`MONUMENTAL · C. 126 CE · 43.3 M SPAN · ROMAN CONCRETE`) — `Unreinforced concrete rotunda whose 43.3-meter hemispherical dome opens to the sky through an 8.2-meter oculus.` · `INSPECT DOSSIER ↗`
4. **`CAT. 003` — `UNITÉ D'HABITATION`** (`BRUTALIST · 1952 · 56.0 M · BÉTON BRUT`) — `Eighteen-storey vertical housing slab raised on sculptural concrete pilotis above an open ground datum.` · `INSPECT DOSSIER ↗`
5. **`CAT. 019` — `HAGIA SOPHIA`** (`MONUMENTAL · 537 CE · 55.6 M CROWN · BRICK & ASHLAR`) — `Imperial Byzantine basilica suspending a 31.8-meter ribbed brick dome on four spherical pendentives.` · `INSPECT DOSSIER ↗`
6. **`CAT. 024` — `NATIONAL ASSEMBLY BUILDING OF BANGLADESH`** (`MONUMENTAL · 1962–1982 · 47.2 M · CONCRETE & MARBLE`) — `Octagonal cast-concrete parliamentary citadel encircled by an artificial lake and pierced by colossal geometric apertures.` · `INSPECT DOSSIER ↗`

### 2.6 Band D — 3-Movement Taxonomy Ledger & Complete Archive Entry

Full-width 3-row architectural ledger (`1px` `--border-hairline` between rows, `1px` `--border-structural` outer borders):

| Field | Row `01` — Brutalist | Row `02` — Gothic | Row `03` — Monumental |
| :--- | :--- | :--- | :--- |
| **Index** | `01` | `02` | `03` |
| **Movement Title** | `BRUTALIST` | `GOTHIC` | `MONUMENTAL` |
| **Chronology Span** | `1947–1980` | `1163–1965` | `126–PRESENT` |
| **Plate Volume** | `09 PLATES` | `09 PLATES` | `09 PLATES` |
| **Primary Material** | `BÉTON BRUT, PRECAST & STEEL` | `LIMESTONE, MARBLE & SANDSTONE` | `CONCRETE, LIMESTONE & GRANITE` |
| **Structural Mechanic** | `Cantilevered slabs, detached service shafts, post-tensioned modules, and exposed board-formed concrete.` | `Pointed lancet arches, quadripartite and fan rib vaults, flying buttresses, and inverted scissor arches.` | `Pendentive brick domes, coffered concrete hemispheres, travertine colonnades, and cyclopean plinths.` |
| **Row CTA** | `FILTER BRUTALIST ↗` | `FILTER GOTHIC ↗` | `FILTER MONUMENTAL ↗` |
| **CTA `aria-label`** | `FILTER 02 ARCHIVE BY BRUTALIST (09 STRUCTURES)` | `FILTER 02 ARCHIVE BY GOTHIC (09 STRUCTURES)` | `FILTER 02 ARCHIVE BY MONUMENTAL (09 STRUCTURES)` |

#### Complete Ledger Entry Block (`01.3 — COMPLETE LEDGER`)

| Slot | Copy | Token |
| :--- | :--- | :--- |
| **Overline** | `01.3 — COMPLETE LEDGER` | `--type-colophon` |
| **Headline** | `ACCESS THE 27-STRUCTURE INDEX` | `--type-display` |
| **Summary** | `Twenty-seven surveyed structures across Europe, Asia, the Americas, and the Middle East. Filter by movement, continent, material, or century, or open the nine orthographic Anatomy plates.` | `--type-body-lead` |
| **Primary Action** | `OPEN 02 ARCHIVE ↗` | `--type-ui-label` |
| **Secondary Action** | `INSPECT 04 ANATOMY ↗` | `--type-ui-label` |

---

## 3. Route `02 ARCHIVE` (`/archive`)

### 3.1 Document Metadata

- **`<title>`:** `02 ARCHIVE — MONOLITH Structure Index (27 Plates)`
- **`<meta name="description">`:** `Searchable ledger and asymmetric photographic plate grid of 27 Brutalist, Gothic, and Monumental structures from 126 to 1982.`

### 3.2 Page Header

| Slot | Copy | Token |
| :--- | :--- | :--- |
| **Route Overline** | `02 / ARCHIVE · COMPLETE CATALOG LEDGER` | `--type-colophon` |
| **Page Title** | `STRUCTURE INDEX` | `--type-display` |
| **Header Abstract** | `Twenty-seven surveyed structures indexed by movement, continent, primary load-bearing material, era, and metric elevation.` | `--type-body-lead` |
| **Live Count Telemetry** | `DISPLAYING {N} OF 27 STRUCTURES` *(default: `DISPLAYING 27 OF 27 STRUCTURES`)* | `--type-colophon` (`aria-live="polite"`) |

### 3.3 Search, Filter Controls & View Toggle

#### Search Input

| Element | Copy | Accessibility / Notes |
| :--- | :--- | :--- |
| **Input Label** | `SEARCH CATALOG` | Visible `<label>` above input (`--type-ui-label`). |
| **Placeholder** | `STRUCTURE, ARCHITECT, CITY, OR CAT. NO.` | |
| **Clear Search Button** | `CLEAR ×` | `aria-label="CLEAR SEARCH QUERY"`. |

#### 5 Filter Selectors & Option Lists (Aligned to `src/data/buildings.ts`)

| Filter Group | Visible Label | Default Option | Permitted Options |
| :--- | :--- | :--- | :--- |
| **Movement** | `MOVEMENT` | `ALL MOVEMENTS` | `BRUTALIST` (9), `GOTHIC` (9), `MONUMENTAL` (9) |
| **Continent** | `CONTINENT` | `ALL CONTINENTS` | `EUROPE`, `ASIA`, `AMERICAS`, `MIDDLE EAST` |
| **Material** | `MATERIAL` | `ALL MATERIALS` | `BÉTON BRUT & CONCRETE`, `LIMESTONE & MARBLE`, `STONE, GRANITE & BRICK`, `CONCRETE & STEEL`, `ROMAN CONCRETE` |
| **Era / Century** | `ERA / CENTURY` | `ALL ERAS` | `ANTIQUITY (118–600 CE)`, `MEDIEVAL (1163–1575)`, `EARLY MODERN (1880–1945)`, `POST-WAR & LATE MODERN (1947–PRESENT)` |
| **Sort Order** | `SORT` | `CAT. NO. (CAT. 001–027)` | `CAT. NO. (CAT. 001–027)`, `YEAR (OLDEST FIRST)`, `YEAR (NEWEST FIRST)`, `ELEVATION (HIGHEST)`, `ELEVATION (LOWEST)` |

#### Filter Utility & View Toggle Controls

| Control | Label | `aria-label` | Notes |
| :--- | :--- | :--- | :--- |
| **Mobile Filter Drawer Toggle (`< 768px`)** | `FILTERS [ + ]` / `FILTERS [ − ]` | `aria-expanded`, `aria-controls="archive-filter-controls"` | Collapses the 6-control filter matrix on mobile viewports so the first specimen plate remains visible above the fold. |
| **Reset Filters Action** | `RESET FILTERS ×` | `RESET ALL ARCHIVE FILTERS AND SEARCH` | Shown when any filter or search string is active. |
| **View Toggle Group Label** | `VIEW MODE` | `SWITCH ARCHIVE DISPLAY MODE` | `role="group"`. |
| **Grid View Button** | `[ PLATE ]` | `PLATE — VISUAL GRID VIEW` | Active state uses `--surface-canvas` + `aria-pressed="true"`. |
| **Tabular View Button** | `[ INDEX ]` | `INDEX — TABULAR CATALOG VIEW` | Active state uses `--surface-canvas` + `aria-pressed="true"`. Renders 8-column `<table>` on `>= 1024px` and 1/2-column semantic catalog slips on `< 1024px`. |

### 3.4 Catalog Table Headers (`INDEX` 8-Column Tabular View)

Strict `1px` `--border-hairline` rows, `IBM Plex Mono` numeric columns with `tabular-nums`:

| Column Key | Header Label | Sortable `aria-label` | Sample Cell Formatting (`CAT. 001`) |
| :--- | :--- | :--- | :--- |
| **1** | `CAT. NO.` | `SORT BY CATALOG NUMBER` | `CAT. 001` |
| **2** | `STRUCTURE` | `SORT BY STRUCTURE NAME` | `Trellick Tower` |
| **3** | `ARCHITECT` | `SORT BY ARCHITECT` | `Ernő Goldfinger` |
| **4** | `LOCATION` | `SORT BY LOCATION` | `London, United Kingdom` |
| **5** | `YEAR` | `SORT BY COMPLETION YEAR` | `1972` |
| **6** | `MOVEMENT` | `SORT BY ARCHITECTURAL MOVEMENT` | `BRUTALIST` |
| **7** | `MATERIAL` | `SORT BY PRIMARY MATERIAL` | `BÉTON BRUT` |
| **8** | `ELEV.` | `SORT BY METRIC ELEVATION` | `98.0 M` |

*(Row action arrow `↗` sits inside the `STRUCTURE` link or compact trailing action cell with `aria-label="INSPECT CAT. 001 TRELLICK TOWER"`.)*

### 3.5 Specimen Card Microcopy (`PLATE` Visual Grid View)

| Slot | Copy Template | Token |
| :--- | :--- | :--- |
| **Top Colophon Strip** | `{CAT. NNN} · {MOVEMENT}` | `--type-colophon` |
| **Plate Title** | `{STRUCTURE}` | `--type-subhead` |
| **Attribution Line** | `{ARCHITECT}, {CHRONOLOGY}` | `--type-colophon` |
| **Telemetry Footer** | `{CITY, COUNTRY}` \| `{ELEV.}` \| `{MATERIAL CODE}` | `--type-colophon` |
| **Card Action** | `INSPECT DOSSIER ↗` | `--type-ui-label` |

### 3.6 Zero-Results State

Rendered inside a `1px` `--border-structural` block when active filters yield `0` records:

| Slot | Copy | Token |
| :--- | :--- | :--- |
| **Error / Status Code** | `× ERR 000 — NO MATCHING PLATES` | `--type-colophon` (`--signal-ink` icon + text) |
| **Headline** | `ZERO SPECIMENS FOUND` | `--type-display` |
| **Body Explanation** | `No structure among the 27 indexed plates satisfies the active movement, continent, material, and era parameters.` | `--type-body` |
| **Reset Action** | `RESET ALL FILTERS ×` | `--type-ui-label` |

---

## 4. Route `03 STRUCTURE DETAIL` (`/structures/[slug]`)

### 4.1 Document Metadata Templates

- **`<title>`:** `{CAT. NNN} {STRUCTURE} — MONOLITH Archive`
- **`<meta name="description">`:** `{CAT. NNN} {STRUCTURE} ({CHRONOLOGY}, {CITY}, {COUNTRY}). {ARCHITECT}. {PRIMARY MATERIAL}, {ELEVATION} elevation. Technical colophon and structural analysis.`

### 4.2 Breadcrumb & Plate Header

| Slot | Copy | Token | Accessibility |
| :--- | :--- | :--- | :--- |
| **Breadcrumb Nav** | `01 HOME` `/` `02 ARCHIVE` `/` `{CAT. NNN} {STRUCTURE}` | `--type-colophon` | `aria-label="SPECIMEN BREADCRUMB"`; current item carries `aria-current="page"`. |
| **Plate Overline** | `SPECIMEN DOSSIER · {CAT. NNN} · {MOVEMENT}` | `--type-colophon` | |
| **Structure Display Title** | `{STRUCTURE}` *(e.g. `TRELLICK TOWER`)* | `--type-display` | |
| **Subtitle / Datum Line** | `{ARCHITECT} · {CITY, COUNTRY} · {CHRONOLOGY}` | `--type-body-lead` | |
| **Hero Plate Crop Stamps** | `RECTILINEAR SURVEY` *(Brutalist & concrete works)* / `LANCET ARCH PLATE` *(Gothic structures)* / `ROMANESQUE ARCH PLATE` *(Classical & Byzantine masonry)* | `--type-colophon` | Paired with `PLATE {NN}` prefix (e.g., `PLATE 01 · RECTILINEAR SURVEY`). |

### 4.3 Technical Colophon Table Labels

Set in `IBM Plex Mono` (`--type-colophon`) with `1px` `--border-hairline` cell partitions:

| Label | Sample (`CAT. 001` Brutalist) | Sample (`CAT. 010` Gothic) | Sample (`CAT. 023` Monumental) |
| :--- | :--- | :--- | :--- |
| **`CAT. NO.`** | `CAT. 001` | `CAT. 010` | `CAT. 023` |
| **`ARCHITECT`** | `Ernő Goldfinger` | `Anonymous Master Masons` | `Apollodorus of Damascus (attr.)` |
| **`COMPLETION`** | `1972` | `1194–1260` | `c. 126 CE` |
| **`COORD.`** | `51°31'25"N × 0°12'20"W` | `48°26'52"N × 1°29'16"E` | `41°53'55"N × 12°28'36"E` |
| **`ELEVATION / HEIGHT`** | `98.0 M (120 M WITH MAST)` | `113.0 M NORTH SPIRE / 37.0 M VAULT` | `43.3 M OCULUS HEIGHT` |
| **`SPAN / FOOTPRINT`** | `31 STOREYS / 217 FLATS` | `130.2 M LENGTH / 16.4 M NAVE SPAN` | `43.3 M DOME DIAMETER` |
| **`PRIMARY MATERIAL`** | `BÉTON BRUT` | `BERCHÈRES LIMESTONE` | `ROMAN CONCRETE` |
| **`MOVEMENT`** | `BRUTALIST` | `GOTHIC` | `MONUMENTAL` |
| **`STATUS`** | `STANDING` | `STANDING` | `STANDING` |

*(Permitted `STATUS` values matching `StructureStatus`: `STANDING`, `DEMOLISHED`, `UNDER COMPLETION`.)*

### 4.4 Editorial Headings & Specimen Commentary

| Section Slot | Heading / Label | Sample Copy (`CAT. 001 — TRELLICK TOWER`) |
| :--- | :--- | :--- |
| **Primary Essay Heading** | `ARCHITECTURAL ANALYSIS` | `Commissioned by the Greater London Council for the Cheltenham Estate and opened in June 1972, Trellick Tower isolates vertical circulation and mechanical plant inside an autonomous concrete service shaft. By separating elevators, refuse chutes, and the rooftop boiler room from the thirty-one-storey residential slab, Ernő Goldfinger removed mechanical vibration from the 217 apartments. Aerial access bridges span to every third floor, feeding split-level maisonettes above and below each internal street.` |
| **Pull-Quote Overline** | `MONOGRAPH CITATION` | |
| **Pull-Quote Body** | `“The detached service tower is not an ornament attached to housing; it is the vertical spine that liberates every floor plate from mechanical intrusion.”` | `--type-quote` |
| **Observations Heading** | `STRUCTURAL OBSERVATIONS` | |
| **Observation 01** | `OBS. 01 — DETACHED CORE` | `Lifts, stairs, and vertical risers occupy an independent concrete tower joined to the main slab by sliding-bearing bridges at every third storey.` |
| **Observation 02** | `OBS. 02 — CANTILEVERED PLANT` | `The upper boiler room projects outward from the service shaft on deep concrete brackets, concentrating mechanical dead load over the vertical pier.` |
| **Observation 03** | `OBS. 03 — SHUTTERING MODULE` | `Board-formed timber impressions and horizontal tie-bolt recesses remain unclad across the concrete flanks, registering each vertical pour lift.` |
| **Observation 04** | `OBS. 04 — ACOUSTIC ZONING` | `Separating hydraulic lift machinery and boiler plant outside the habitable thermal envelope eliminates structure-borne acoustic bridging.` |

### 4.5 Anatomy Cross-Link & 3-Link Adjacent Plate Footer

| Element | Copy | `aria-label` |
| :--- | :--- | :--- |
| **Anatomy Cross-Link Overline** | `STRUCTURAL CROSS-REFERENCE` | |
| **Anatomy Cross-Link Title (When `hasAnatomyPlate === true`)** | `INSPECT {STRUCTURE} IN 04 ANATOMY` *(e.g. `INSPECT TRELLICK TOWER IN 04 ANATOMY`)* | |
| **Anatomy Cross-Link Title (Fallback when `false`)** | `INSPECT {MOVEMENT} SYSTEM IN 04 ANATOMY` | |
| **Anatomy Cross-Link CTA** | `OPEN 04 ANATOMY ↗` | `OPEN 04 ANATOMY ORTHOGRAPHIC PLATE FOR {STRUCTURE}` |
| **Footer Link 01** | `← PREVIOUS PLATE` + `{CAT. NNN} {STRUCTURE}` | `NAVIGATE TO PREVIOUS PLATE: {CAT. NNN} {STRUCTURE}` |
| **Footer Link 02** | `ALL PLATES` | `RETURN TO 02 ARCHIVE (27 STRUCTURES)` |
| **Footer Link 03** | `NEXT PLATE →` + `{CAT. NNN} {STRUCTURE}` | `NAVIGATE TO NEXT PLATE: {CAT. NNN} {STRUCTURE}` |

---

## 5. Route `04 ANATOMY` (`/anatomy`)

### 5.1 Document Metadata

- **`<title>`:** `04 ANATOMY — MONOLITH Orthographic Section Plates (09 Drawings)`
- **`<meta name="description">`:** `Interactive orthographic section plates, load vectors, and metric dimension schedules for nine Brutalist, Gothic, and Monumental structures.`

### 5.2 Page Header & Surface Polarity Switcher

| Slot | Copy | Token |
| :--- | :--- | :--- |
| **Route Overline** | `04 / ANATOMY · ORTHOGRAPHIC SECTION PLATES` | `--type-colophon` |
| **Page Title** | `STRUCTURAL ANATOMY` | `--type-display` |
| **Header Abstract** | `Nine orthographic section plates isolating load paths, structural axes, and material assemblies across Brutalist, Gothic, and Monumental systems.` | `--type-body-lead` |
| **Surface Polarity Toggle** | `[ SURFACE: PLASTER / VOID ]` | `--type-ui-label` (`aria-pressed={surface === 'void'}`) |
| **Active Polarity Readout** | `ACTIVE: PLASTER` *(default `#E9E5DF`)* / `ACTIVE: VOID` *(`#131313`)* | `--type-colophon` |

### 5.3 Movement / System Filter Tabs (`ALL PLATES (09)` + 3 Movement Systems)

Rendered as `0px` rectangular tabs with `1px` `--border-structural` frame. Active tab carries `--signal-ink` dot `•` and `aria-selected="true"`.

| Tab ID | Visible Tab Label | Scope | System Abstract |
| :--- | :--- | :--- | :--- |
| **Tab 00** | `ALL PLATES (09)` | All 9 `ANATOMY_PLATE_BUILDINGS` | `Complete orthographic dossier across Brutalist concrete frames, Gothic masonry vaults, and Monumental domes.` |
| **Tab 01** | `01 / BRUTALIST` | 3 Brutalist Plates | `Cantilevered floor plates, tapered pilotis, detached concrete cores, and post-tensioned modular boxes.` |
| **Tab 02** | `02 / GOTHIC` | 3 Gothic Plates | `Quadripartite limestone rib vaults, external flying buttresses, iron tie chains, and inverted crossing scissor arches.` |
| **Tab 03** | `03 / MONUMENTAL` | 3 Monumental Plates | `Spherical brick pendentives, graded-aggregate concrete hemispheres, compression oculi, and hollow concrete piers.` |

### 5.4 Nine Canonical Orthographic Plate Index Labels (`src/data/buildings.ts`)

| Plate No. | Catalog ID | Structure | Movement Tab | Orthographic Drawing Title |
| :--- | :--- | :--- | :--- | :--- |
| **PLATE 01** | `CAT. 001` | `TRELLICK TOWER` | `01 / BRUTALIST` | `DWG. AN-01 — DETACHED SERVICE CORE & AERIAL BRIDGE SECTION` |
| **PLATE 02** | `CAT. 003` | `UNITÉ D'HABITATION` | `01 / BRUTALIST` | `DWG. AN-02 — PILOTIS & INTERLOCKING MODULOR DUPLEX SECTION` |
| **PLATE 03** | `CAT. 004` | `HABITAT 67` | `01 / BRUTALIST` | `DWG. AN-03 — POST-TENSIONED PRECAST BOX CLUSTER SECTION` |
| **PLATE 04** | `CAT. 010` | `CHARTRES CATHEDRAL` | `02 / GOTHIC` | `DWG. AN-04 — QUADRIPARTITE VAULT & DOUBLE FLYING BUTTRESS` |
| **PLATE 05** | `CAT. 014` | `SAINTE-CHAPELLE` | `02 / GOTHIC` | `DWG. AN-05 — RAYONNANT LANCET BAY & IRON TIE-CHAIN SECTION` |
| **PLATE 06** | `CAT. 018` | `WELLS CATHEDRAL` | `02 / GOTHIC` | `DWG. AN-06 — INVERTED SCISSOR ARCH & CROSSING PIER BRACING` |
| **PLATE 07** | `CAT. 019` | `HAGIA SOPHIA` | `03 / MONUMENTAL` | `DWG. AN-07 — SPHERICAL PENDENTIVE & RIBBED BRICK DOME SECTION` |
| **PLATE 08** | `CAT. 023` | `PANTHEON` | `03 / MONUMENTAL` | `DWG. AN-08 — COFFERED HEMISPHERE & STEPPED COMPRESSION RING` |
| **PLATE 09** | `CAT. 024` | `NATIONAL ASSEMBLY BUILDING OF BANGLADESH` | `03 / MONUMENTAL` | `DWG. AN-09 — OCTAGONAL CONCRETE CITADEL & GEOMETRIC APERTURES` |

### 5.5 Interactive Layer Toggle Labels

Implemented as accessible toggle buttons (`aria-pressed="true" | "false"`) inside `<fieldset>` (`<legend>DRAFTING LAYERS</legend>`):

| Layer Key | Visible Toggle Label | `aria-label` | Layer Function Note |
| :--- | :--- | :--- | :--- |
| **Layer 01** | `STRUCTURE` | `TOGGLE STRUCTURE MASS LAYER` | Primary masonry walls, concrete slabs, piers, and ribbed envelopes. |
| **Layer 02** | `AXIS & LOAD` | `TOGGLE AXIS AND LOAD VECTOR LAYER` | Vertical plumb axes, lateral thrust vectors, and compression rings (`--signal-ink`). |
| **Layer 03** | `DIMENSIONS` | `TOGGLE METRIC DIMENSIONS LAYER` | Bay widths, clear vault heights, slab thicknesses, and datum elevations. |
| **Utility Action** | `ALL LAYERS` | `ENABLE ALL THREE ORTHOGRAPHIC LAYERS` | Restores `STRUCTURE`, `AXIS & LOAD`, and `DIMENSIONS` simultaneously. |
| **Live Region Status** | `ACTIVE LAYERS: {LIST}` | `aria-live="polite"` | Announces layer state changes to screen readers. |

### 5.6 Scale Bar, Mobile Zoom Note, Datum Legend & Dimension Schedule

| Element | Copy | Token | Notes |
| :--- | :--- | :--- | :--- |
| **Scale Bar Title** | `SCALE 1:250 · METRIC SI` | `--type-colophon` | |
| **Scale Bar Graduations** | `0` · `5` · `10` · `20` · `30 M` | `--type-colophon` | `tabular-nums`, matching `4px`/`8px` drafting ticks. |
| **Mobile Zoom Prompt** | `TAP OR SCROLL TO INSPECT PLATE` | `--type-colophon` | Displayed below canvas on `< 768px` viewports. |
| **Dimension Schedule `<details>`** | `VIEW STRUCTURAL DIMENSION SCHEDULE` | `--type-ui-label` | `<summary>` label exposing accessible tabular spans, heights, and coordinates (WCAG 1.1.1). |
| **Schedule Table Headers** | `CAT. NO.` · `STRUCTURE` · `ELEVATION` · `SPAN / MODULE` · `PRIMARY LOAD SYSTEM` | `--type-colophon` | |
| **Legend Heading** | `DATUM & SYMBOL LEGEND` | `--type-ui-label` | |
| **Legend Key 01** | `DATUM 0.00 M — GROUND PLANE` | `--type-colophon` | Horizontal baseline reference. |
| **Legend Key 02** | `X–X' — PRIMARY PLUMB AXIS` | `--type-colophon` | Central gravitational centerline. |
| **Legend Key 03** | `L–1 — COMPRESSION / THRUST VECTOR` | `--type-colophon` | Signal Vermilion vector path. |
| **Legend Key 04** | `M–1 — LOAD-BEARING MASS` | `--type-colophon` | Solid hatched concrete or limestone cut. |
| **Legend Key 05** | `V–1 — POINTED LANCET / OCULUS VOID` | `--type-colophon` | Unobstructed aperture span. |
| **Legend Key 06** | `S–1 — SHUTTERING / COURSING MODULE` | `--type-colophon` | Modular lift or ashlar joint increment. |

### 5.7 Anatomy-to-Archive Cross-Links

Displayed beneath the active plate canvas to link orthographic drawings directly to their corresponding structure dossiers:

| System Tab | Heading | Specimen Links |
| :--- | :--- | :--- |
| **`01 / BRUTALIST`** | `LINKED BRUTALIST DOSSIERS` | `CAT. 001 TRELLICK TOWER ↗` · `CAT. 003 UNITÉ D'HABITATION ↗` · `CAT. 004 HABITAT 67 ↗` |
| **`02 / GOTHIC`** | `LINKED GOTHIC DOSSIERS` | `CAT. 010 CHARTRES CATHEDRAL ↗` · `CAT. 014 SAINTE-CHAPELLE ↗` · `CAT. 018 WELLS CATHEDRAL ↗` |
| **`03 / MONUMENTAL`** | `LINKED MONUMENTAL DOSSIERS` | `CAT. 019 HAGIA SOPHIA ↗` · `CAT. 023 PANTHEON ↗` · `CAT. 024 NATIONAL ASSEMBLY BUILDING OF BANGLADESH ↗` |

---

## 6. Accessibility & Copy Verification Audit

Before merging UI strings into application templates, confirm:

1. **Zero Exclamation Marks:** Search `SITE_COPY.md` and compiled JSX/JSON for the exclamation mark character (`U+0021`) — count must equal `0`.
2. **Zero Banned Clichés:** Verify none of the prohibited AI/SaaS terms in [BRAND.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/BRAND.md) appear in user-facing copy.
3. **Dataset Lock (`buildings.ts`):** Confirm all 27 structure counts (`9` + `9` + `9`), `CAT. 001`–`CAT. 027` identifiers (`ARC-001`–`ARC-027` IDs), `DD / MM / YYYY` dates, and 9 Anatomy plate mappings match [buildings.ts](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/data/buildings.ts).
4. **Tabular Numerals:** Apply `font-variant-numeric: tabular-nums lining-nums` on every catalog number, coordinate, scale bar tick, completion year, and elevation readout.
5. **Non-Color State Pairing:** Every active tab, active nav link (`•`), validation error (`×`), and Signal Vermilion vector (`L-1`) pairs color with an explicit glyph or text label.
6. **Decorative Isolation:** Vertical edge strips, echo hollow headlines, corner `✦` alignment anchors, and millimeter footer ticks carry `aria-hidden="true"`.
