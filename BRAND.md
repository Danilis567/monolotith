# MONOLITH — Brand Identity & Architectural Monograph System

> **Document Scope:** Holistic brand architecture, typographic system, editorial voice, and graphic grammar for **MONOLITH**—an architectural research archive, neo-brutalist monograph platform, and cultural exhibition index.  
> **Sibling Specifications:** Chromatic mathematics, CSS custom properties, and WCAG 2.1 contrast tables are governed by [COLOR_SYSTEM.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md) and [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css); custom vector mark geometry, SVG construction, and clear-space rules are governed by [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md).

---

## 1. Brand Thesis & Visual Lineage

**MONOLITH** occupies the structural intersection between **Gothic ecclesiastical permanence** (ribbed limestone vaults, pointed lancet apertures, severe chiaroscuro) and **post-war Brutalist discipline** (*béton brut*, exposed 12-column grids, monumental concrete mass, Swiss archival precision).

Every surface, word, and photograph obeys physical gravity: nothing floats, nothing blurs, and nothing decorates without structural cause.

### Reference Lineage (`ref/` Synthesis — 14 Verified Artifacts)
The MONOLITH identity directly distills all fourteen visual artifacts in `ref/`:
- **Monumental Scale & Layered Type Behind Form** (`preview (3).webp` *Residential Brutalism / Trellick*, `7ed9e87d3c2d61e0481fa3306ecb0c6a.jpg` *Brutalism UK 1950*): Razor-sharp vertical display typography anchored behind raw concrete towers, establishing architectural depth without drop shadows.
- **Void Concrete Mass & Single Signal Vermilion** (`preview (1).webp` *Obsidian*, `preview.webp` *Web Brutalism / Registration*): Pitch-dark Void Concrete grounds (`#131313`) and stark Raw Plaster sheets (`#E9E5DF`) punctuated by surgical `1–2px` borders and a singular Signal Vermilion accent restricted to active telemetry, index markers, and validation error states.
- **Monastic Quiet & Pull-Quote Contrast** (`preview (2).webp` *Takumi*): Compressed uppercase architectural titles paired with restrained vertical rules and authoritative italic serif recognition notes.
- **Archival Telemetry, Halftone & Scale Precision** (`45e4f8147b81c3e0bb8a8549802e6ace.jpg` *Saint Petersburg*, `db816a1cefd19db941e51881528070bd.jpg`, `af5d4910c380dbc8bc0925f405f4d5de.jpg`): Dithered 1-bit halftone plates, coordinate stamps (`59°56'02" × 30°18'21"`), metric callouts (`17 M`, `114 T`), millimeter ruler ticks, and tabular data ledgers.
- **Multi-Panel Specimen Framing & Distressed Plate Grid** (`5fc0fcecca24eed8b7c4b704e08b459a.jpg` *Gothic Art* poster): Tightly partitioned multi-plate exhibition grid bounded by crisp horizontal/vertical rules and tracked archival literary excerpts (distilling the plate geometry and monochrome distress texture while rejecting kitschy violet/badge tropes).
- **Pointed Arch Apertures, Vaulting & Stepped Framing** (`0dab4c077b6ab5d9d67a75f911d986ff.jpg` *Ribbed Vault*, `135d5a8db69f2a1c011dab3c024a5694.jpg` *Astor Mansions*, `1615b1e82d9ec1985e293aaad8cf70ff.jpg` *Fallen Angel*, `c5eb814ab3b11a46ee4eb2146116b999.jpg` *Martha Lives*, `e290eb14d02fed3e7209b5e469abb0bd.jpg` *Deondor*): Gothic ribbed vault structure, lancet and rounded-arch image crops, stepped mitered corner brackets, 4-point alignment crosshairs, and coarse lithographic grain.

---

## 2. Color Architecture & WCAG 2.1 AA Compliance

MONOLITH operates on a strict **5-tone Concrete Material Palette + Adaptive Signal Vermilion (`<= 2%` viewport area)**, bound directly to the canonical Tier 1 tokens in [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css).

### 2.1 Canonical Concrete Material Palette

| Canonical Name | CSS Token | Hex | Primary Role |
| :--- | :--- | :--- | :--- |
| **Void Concrete** | `--concrete-950` | `#131313` | Dark primary canvas (`--surface-canvas`); light primary ink (`--ink-primary`) and light structural frames (`--border-structural`). |
| **Basalt** | `--concrete-800` | `#282828` | Dark elevated surfaces (`--surface-elevated` / `[data-surface="basalt"]`); light secondary/body/metadata ink (`--ink-secondary`); Limestone hairline fallback (`--border-hairline` inside `[data-surface="limestone"]`). |
| **Weathered Grey** | `--concrete-500` | `#77746C` | `1px` functional hairlines (`--border-hairline`) on Void Concrete, Basalt, and Raw Plaster; large muted display text (`--ink-muted-large`, `>= 24px` or `>= 18.66px` bold ONLY). |
| **Limestone** | `--concrete-300` | `#B9B5AA` | Light elevated/band surfaces (`[data-surface="limestone"]`); dark secondary/body/metadata ink (`--ink-secondary` on `#131313` and `#282828`). |
| **Raw Plaster** | `--concrete-100` | `#E9E5DF` | Light primary canvas (`--surface-canvas`); dark primary ink (`--ink-primary`) and dark structural frames (`--border-structural`). |

### 2.2 WCAG 2.1 AA Ink & Weathered Grey Containment Rules
- **Mandatory `--ink-secondary` for All Normal Metadata, Captions & Body Commentary:**  
  All normal-sized body commentary, plate captions, navigation tags, and colophon metadata (`--type-body`, `--type-ui-label`, `--type-colophon`) **MUST** use `--ink-primary` or `--ink-secondary`:
  - **Dark Surfaces (`#131313` Void Concrete / `#282828` Basalt):** `--ink-secondary` resolves to **Limestone** (`#B9B5AA`), achieving **`9.07:1`** on Void Concrete and **`7.20:1`** on Basalt (AAA pass).
  - **Light Surfaces (`#E9E5DF` Raw Plaster / `#B9B5AA` Limestone):** `--ink-secondary` resolves to **Basalt** (`#282828`), achieving **`11.75:1`** on Raw Plaster and **`7.20:1`** on Limestone (AAA pass).
- **Strict Prohibition on `#77746C` (Weathered Grey) for Normal Text:**  
  **Weathered Grey (`#77746C`, `--concrete-500`) MUST NEVER be used for body commentary, plate captions, or passive metadata labels.** It fails WCAG 2.1 AA `4.5:1` normal-text contrast on every surface (`3.98:1` on `#131313`, `3.16:1` on `#282828`, `3.72:1` on `#E9E5DF`, `2.28:1` on `#B9B5AA`). It is restricted exclusively to:
  1. `1px` functional hairlines (`--border-hairline`) on Void Concrete (`#131313`), Basalt (`#282828`), and Raw Plaster (`#E9E5DF`) — and **remapped to Basalt (`#282828`, `7.20:1`) inside `[data-surface="limestone"]` (`#B9B5AA`)**, where `#77746C` fails even `3:1` UI contrast (`2.28:1`).
  2. Large, non-critical display typography (`--ink-muted-large`, `>= 24px` regular or `>= 18.66px` bold ONLY, never on Limestone `#B9B5AA`).

### 2.3 Adaptive Signal Vermilion (`<= 2%` Viewport Budget)
Raw crimson (`#C8281E`) fails `4.5:1` AA normal-text contrast on every MONOLITH surface. Semantic signal tokens therefore split luminance by polarity while preserving a uniform Vermilion hue:

| Token | Hex | Contrast & Permitted Usage |
| :--- | :--- | :--- |
| **`--signal-vermilion-400`** | `#F45D4D` | **Dark-surface AA normal** (`--signal-ink`, `--signal-fill`, `--signal-border` on `#131313` [`5.77:1`] and `#282828` [`4.58:1`]). |
| **`--signal-vermilion-600`** | `#A81F17` | **Light-surface AA normal** (`--signal-ink`, `--signal-fill`, `--signal-border` on Raw Plaster `#E9E5DF` [`5.83:1`]). |
| **`--signal-vermilion-700`** | `#8B1912` | **Limestone-surface AA normal** (`--signal-ink`, `--signal-border` inside `[data-surface="limestone"]` `#B9B5AA` [`4.57:1`]). |
| **`--signal-vermilion-500`** | `#C8281E` | **Glow-only (`--signal-glow`)** and non-essential/large (`>= 24px`) atmospheric accents on Void Concrete `#131313` (`3.34:1`) ONLY. Never used for normal text or on `#282828`/`#B9B5AA`. |

---

## 3. Typographic System (3 Families Maximum)

MONOLITH enforces a rigid three-family web typography hierarchy paired with one custom-drawn SVG brand wordmark. No fourth typeface, handwritten script, or rounded geometric sans is permitted anywhere in the system.

### 3.1 Custom Vector Wordmark vs. Editorial Display Typography
- **Custom Vector `MONOLITH` Wordmark (`brand/monolith-wordmark-*.svg`, `nav-lockup.svg`, `footer-lockup.svg`, `og-image.svg`):**  
  The geometric custom `<path>` wordmark (`5:1` architectural slab proportions with `6×8` beveled `O` and Pythagorean lancet `M` mark) is **reserved strictly for brand lockups, header navigation, footer mastheads, and OpenGraph social plates**. Never attempt to replicate it with CSS web fonts.
- **UI Headings & Editorial Display Titles (`Bodoni Moda` & `Inter`):**  
  All page hero headlines, section titles, specimen headings, exhibition abstracts, and pull-quotes render in **`Bodoni Moda`** (with **`Inter`** reserved for compressed brutalist UI statements, navigation labels, and monograph body prose).

### 3.2 Family Selection & Rationale

| Role | Selected Family | Fallback Stack | Reference Justification |
| :--- | :--- | :--- | :--- |
| **Display, Editorial Headings & Monograph Quotes** | **Bodoni Moda** *(Optical Size, Weights 400, 600, 700, 900 + Italic)* | `'Bodoni Moda', 'Didot', 'Bodoni MT', Georgia, serif` | Chosen over *Cormorant Garamond*. While Cormorant leans humanist and calligraphic, `preview (3).webp` (*Residential Brutalism*), `1615b1e82d9ec1985e293aaad8cf70ff.jpg` (*Fallen Angel*), and `e290eb14d02fed3e7209b5e469abb0bd.jpg` (*Deondor*) demand **extreme Didone stroke contrast, rigid vertical stress, and flat razor hairlines**. Bodoni Moda's thin serifs mirror `1px` drafting rules, while its heavy vertical stems match brutalist concrete piers. Its Italic serves high-authority pull-quotes (*Takumi* recognition block in `preview (2).webp`). |
| **UI, Navigation, Subheads & Architectural Body** | **Inter** *(Variable, Weights 400, 500, 600, 700)* | `'Inter', 'Helvetica Neue', Arial, sans-serif` | Chosen over system *Helvetica*. Echoes the Swiss Neo-Grotesque clarity of `preview (1).webp` (*Obsidian*), `preview (2).webp` (*Takumi*), and `45e4f8147b81c3e0bb8a8549802e6ace.jpg` (*Saint Petersburg*), while guaranteeing consistent cross-OS metrics, superior legibility at `11px–14px`, and native OpenType controls (`tnum`, `cv05`, `ss01`) for tight uppercase UI headers and dense 3-column catalog prose. |
| **Catalog Colophons, Coordinates & Telemetry** | **IBM Plex Mono** *(Weights 400, 500)* | `'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace` | Anchors the archival coordinates (`59°56'02" × 30°18'21"`), metric weights (`114 T`), Roman dates (`MDCCCXVIII`), and tabular terminal ledgers seen in `45e4f8147b81c3e0bb8a8549802e6ace.jpg` and `db816a1cefd19db941e51881528070bd.jpg`. Its squarish, engineered forms complement slab concrete without reading like consumer developer software. |

---

### 3.3 Fluid Typographic Scale, Tracking & Leading

All display and editorial sizes scale fluidly using `clamp()` across viewports (`375px` mobile to `1440px+` exhibition desktop):

| Token / Level | Family & Weight | Fluid Size (`clamp()`) | Line Height | Letter Spacing | Case, Ink & OpenType Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`--type-monolith`** *(Hero / Masthead)* | Bodoni Moda `900` | `clamp(3.75rem, 11vw + 1rem, 10.5rem)` | `0.86` | `-0.045em` | Uppercase or Title Case; tight vertical stacking (`opsz` max); `--ink-primary`. Never italicized at monolith scale. |
| **`--type-display`** *(Section / Plate Title)* | Bodoni Moda `600` | `clamp(2.25rem, 4.5vw + 0.75rem, 4.75rem)` | `0.94` | `-0.03em` | Title Case or Uppercase; `--ink-primary` (or `--ink-muted-large` only when `>= 24px` and decorative). |
| **`--type-quote`** *(Catalog Pull-Quote)* | Bodoni Moda `400 Italic` | `clamp(1.375rem, 2vw + 0.5rem, 2.25rem)` | `1.28` | `-0.015em` | Sentence case; curly typographic quotes (`“ ”`), `--ink-primary`, attributed via `--type-colophon` rule below. |
| **`--type-subhead`** *(Brutalist UI Statement)* | Inter `600` | `clamp(1.125rem, 1.5vw + 0.5rem, 1.75rem)` | `1.15` | `-0.02em` | Uppercase for index headers (*Obsidian* / *Takumi* style) or Sentence case for thesis statements. |
| **`--type-body-lead`** *(Exhibition Abstract)* | Inter `400` | `clamp(1.0625rem, 0.5vw + 0.9rem, 1.25rem)` | `1.50` | `-0.01em` | Sentence case; `--ink-primary` or `--ink-secondary`; max measure `62ch`. |
| **`--type-body`** *(Monograph Commentary)* | Inter `400` | `clamp(0.9375rem, 0.25vw + 0.85rem, 1rem)` | `1.60` | `0em` | Sentence case; **strictly `--ink-primary` or `--ink-secondary`** (never `#77746C`); max measure `58ch` (or `34ch` in 3-column print-grid layouts per `c5eb814ab3b11a46ee4eb2146116b999.jpg`). |
| **`--type-ui-label`** *(Nav, Buttons, Tags)* | Inter `500` | `0.75rem` *(12px fixed)* | `1.00` | `+0.14em` | **Mandatory `UPPERCASE`**; `--ink-primary` or `--ink-secondary` (`--signal-ink` for active route). Never wraps. |
| **`--type-colophon`** *(Stamps, Coords, IDs)* | IBM Plex Mono `400` / `500` | `clamp(0.6875rem, 0.2vw + 0.625rem, 0.75rem)` *(11–12px)* | `1.35` | `+0.10em` | **Mandatory `UPPERCASE` + `tabular-nums`**; **strictly `--ink-primary` or `--ink-secondary`** (never `#77746C`). |

### 3.4 Typographic Discipline & CSS Rules
1. **Tabular Numerals Everywhere Numeric Data Appears:**  
   `font-variant-numeric: tabular-nums lining-nums;` is mandatory across all Inter and IBM Plex Mono strings containing catalog indices (`001`), dates (`1932`, `06 / 21 / 26`), dimensions (`17 M`, `114 T`), percentages (`63%`), and coordinates (`59°56'02" N`).
2. **Uppercase Tracking Threshold:**  
   Never set `UPPERCASE` text with zero or negative tracking below `18px`. All uppercase labels (`--type-ui-label`, `--type-colophon`) require `+0.10em` to `+0.18em` tracking for archival clarity. Conversely, monolithic uppercase headlines (`--type-monolith`, `--type-display`) must be pulled tight (`-0.03em` to `-0.045em`) so letters lock together like cast concrete blocks.
3. **Hollow / Outlined Display Treatment (Special Structural Accent):**  
   Derived from `7ed9e87d3c2d61e0481fa3306ecb0c6a.jpg` (*Brutalism UK 1950*), repeated echo headlines or decorative backdrop indices (`aria-hidden="true"`) may render with `-webkit-text-stroke: 1px var(--border-hairline)` and `color: transparent`. Restricted strictly to single decorative architectural backdrops—never for readable navigation or body copy.
4. **No Decorative Drop Shadows on Type:** Text sits flush on its plane or overlaps high-contrast photography cleanly via compositional placement.

---

## 4. Editorial Voice & Tone

### 4.1 Persona: The Laconic Archivist
MONOLITH writes in the voice of a **senior architectural curator compiling an institutional monograph or museum exhibition catalog**.
- **Authoritative & Dry:** States physical facts, structural loads, dates, materials, and spatial relationships without pleading for attention.
- **Laconic & Declarative:** Short sentences. Active, concrete verbs (*cast, poured, cantilevered, incised, surveyed, archived*). Every adjective must earn its ink by describing measurable material or historical reality (*raw, board-formed, load-bearing, weathered, monolithic, rectilinear*).
- **Unapologetically Institutional:** Never greets the visitor casually, never asks rhetorical questions, never apologizes, and never uses exclamation marks.

### 4.2 Voice Pillars
1. **Material Specificity Over Abstract Hype:** Name the aggregate, the shuttering, the span, the latitude, and the year—not the "vibe."
2. **Clinical Restraint:** Describe emotional or spatial power through geometry, shadow, and proportion rather than melodrama.
3. **Consistent Archival Formatting:** Dates follow `YYYY` or `DD / MM / YYYY`. Dimensions use metric SI units (`M`, `MM`, `T`). Geographic locations list `CITY, COUNTRY` or exact `DMS` coordinates.

### 4.3 Explicit Banned Clichés & Anti-Patterns

The following words, phrases, and AI/SaaS patterns are **strictly prohibited** across all UI copy, exhibition notes, manifests, and metadata:

- **Banned AI Buzzwords:** *delve, tapestry, testament to, landscape (metaphorical), interplay, symphony, beacon, kaleidoscope, realm, myriad, embark, journey, reimagine, reimagined, redefine, unlocking, unleash, elevate, seamless, effortlessly, cutting-edge, state-of-the-art, next-generation, revolutionary, game-changer, paradigm, synergy, curate/curated (as filler), bespoke.*
- **Banned Pseudo-Poetic Architectural Fluff:** *"dance of light and shadow," "whispers of history," "timeless elegance," "where past meets future," "echoes of eternity," "frozen music," "a love letter to," "breathes life into."*
- **Banned Conversational SaaS Patterns:** *"Ready to explore?", "Discover more!", "Let's dive in", "Get started today", "Built for modern teams", "We believe that...", emojis of any kind, exclamation marks (`!`).*

### 4.4 Editorial Rewrites (Rejection vs. Standard)

| Context | Prohibited Copy (AI / SaaS Slop) | MONOLITH Standard (Museum Monograph) |
| :--- | :--- | :--- |
| **Hero Thesis** | *"Elevating timeless brutalist architecture into a seamless digital journey where raw concrete meets modern elegance."* | *"Raw aggregate, load-bearing geometry, and archival record. Surveying brutalist and sacred masonry structures erected between 1140 and 1978."* |
| **Project Card** | *"Discover the breathtaking Trellick Tower—a testament to visionary 1970s design that continues to inspire."* | *"CAT. 014 — TRELLICK TOWER. Ernő Goldfinger, 1972. Board-formed reinforced concrete, 98 M elevation, detached service shaft."* |
| **Empty / Error State** | *"Oops! Looks like that blueprint wandered off. Let's get you back on track!"* | *"ERR 404 — RECORD UNINDEXED. The requested plate does not exist in the current folio. Return to Index."* |
| **Action Label** | *"Explore Full Story →"* | *"INSPECT DOSSIER ↗"* |

---

## 5. Graphic Language & Spatial Grammar

MONOLITH's graphic language treats the viewport as an **architectural drafting sheet and museum plate layout**.

### 5.1 12-Column Grid Discipline, Hairline vs. Structural Borders
- **Exposed Structural Skeleton:** Layouts operate on a strict **12-column architectural grid** (desktop `24px` gutter, `1px` structural hairline tracks; mobile `4-column`, `16px` gutter).
- **Two-Tier Border System (Semantic vs. Decorative):**
  1. **`--border-hairline` (`1px solid`, Weathered Grey `#77746C` on dark/plaster; Basalt `#282828` on limestone):**  
     Used for secondary compartment dividers, colophon table rules, and subtle grid partitions. Meets WCAG 1.4.11 `>= 3:1` non-text contrast across every permitted surface (`3.98:1` on Void Concrete, `3.16:1` on Basalt, `3.72:1` on Raw Plaster, `7.20:1` on Limestone).
  2. **`--border-structural` (`1–2px solid`, Raw Plaster `#E9E5DF` on dark; Void Concrete `#131313` on light):**  
     Used for thick brutalist container blocks, interactive card boundaries (especially where same-polarity surfaces such as Void Concrete `#131313` vs. Basalt `#282828` [1.26:1] or Raw Plaster `#E9E5DF` vs. Limestone `#B9B5AA` [1.63:1] meet), form inputs, primary CTA frames, and active selection boxes. Heavy `3px–4px` cartoon borders and soft `box-shadow` elevations are forbidden.
- **Decorative vs. Functional Borders:**  
  Purely ornamental drafting marks (outer margin registration lines, grid backdrop rules, corner crosshairs, millimeter tick scales) **MUST** carry `aria-hidden="true"` so assistive technologies ignore non-semantic geometry. Functional UI borders (cards, inputs, tabs, focus rings, data tables) remain visible in the DOM and elevate automatically under `@media (prefers-contrast: more)` and `@media (forced-colors: active)`.
- **Zero Border-Radius Policy:** Default border-radius across all UI surfaces, cards, inputs, and buttons is **`0px`**. Rounded pill buttons, floating cards, and soft avatars violate MONOLITH's structural grammar.

### 5.2 Stepped Corner Notches & 4-Point Crosshairs
Inspired by `1615b1e82d9ec1985e293aaad8cf70ff.jpg`, `e290eb14d02fed3e7209b5e469abb0bd.jpg`, and `preview (1).webp`:
- **4-Point Crosshairs (`+`):** Precision hairline crosshairs (`9px × 9px` or `13px × 13px`, `1px` stroke in `--border-hairline` or `--ink-secondary`) anchor outer margin corners, grid intersections, and specimen focal points (`aria-hidden="true"` when purely framing). When rendered as an ornamental corner anchor on primary exhibition frames, the 4-point cardinal star (`✦` drawn geometrically with sharp concave hairline arcs) may replace `+` at the four corners of a master plate.
- **Stepped Corner Notches (Mitered Architectural Brackets):** Primary exhibition plates and manifesto frames may terminate in **stepped rectangular corner notches** (nested 90° L-brackets stepping inward by `6px` / `12px` at `1px` stroke weight, directly referencing `e290eb14d02fed3e7209b5e469abb0bd.jpg`). Used sparingly for monumental framing—never nested inside small UI buttons.
- **Millimeter Scale Ruler:** Bottom footers or technical plate margins may feature a `1px` horizontal baseline with rhythmic vertical graduation ticks (`4px` minor, `8px` major) and tabular numeric markers (`00  10  20  30`), echoing `45e4f8147b81c3e0bb8a8549802e6ace.jpg`.

### 5.3 Catalog Colophon Stamps
Every architectural specimen, essay plate, or archive entry carries a standardized **Catalog Colophon Stamp** set in `IBM Plex Mono` (`--type-colophon`) using `--ink-primary` or `--ink-secondary` (never `#77746C`), separated by `1px` `--border-hairline` rules:

```text
+─────────────────────────────────────────────────────+
| CAT. NO.   ARC-004          | CHRON.    1932        |
| COORD.     26°12'16"S       | ELEV.     42.5 M      |
|            28°02'40"E       | MAT.      CAST STONE  |
+─────────────────────────────────────────────────────+
```

**Canonical Field Keys (Fixed Abbreviations):**
- `CAT. NO.` — Archive registry identifier (e.g., `ARC-001`, `MNL-014`)
- `COORD.` — Latitude / Longitude in DMS (`59°56'02"N × 30°18'21"E`)
- `ELEV.` — Structural height or altitude in metric meters (`98.0 M`)
- `MAT.` — Primary load-bearing material (`BÉTON BRUT`, `LIMESTONE`, `CAST GRANITE`)
- `CHRON.` — Completion year or Roman numeral century (`1972`, `MDCCCXVIII`)
- `SPAN` — Structural bay width or mass (`114 T`, `32.4 M`)

### 5.4 Sanctioned Crop Geometry & Photographic Treatment
Photographs are treated as **archival specimen plates**, never soft lifestyle imagery. Only two crop geometries are permitted:

1. **Rectilinear Shear Crop (`0px` Corners):**  
   Standard rectangular or full-bleed column-locked crops, bounded by `1px` `--border-hairline` or `--border-structural` rules or cut cleanly along a structural diagonal shear (as in `c5eb814ab3b11a46ee4eb2146116b999.jpg` bottom triptych).
2. **Pointed Lancet / Rounded Architectural Arch:**  
   Inspired by `135d5a8db69f2a1c011dab3c024a5694.jpg`, `1615b1e82d9ec1985e293aaad8cf70ff.jpg`, and `c5eb814ab3b11a46ee4eb2146116b999.jpg` (*Martha Lives*). Constructed via SVG/CSS `clip-path` forming either a true semicircular arch top with `0px` flat base or a Gothic pointed lancet arch with `0px` flat base. **Usage constraint:** Reserved exclusively for primary specimen hero plates and sacred/historic masonry studies—never applied to thumbnails, UI cards, or navigation tiles.

**Photographic Finishing Rules:**
- High-contrast monochrome or severely desaturated warm-stone grading (`contrast(1.12) saturate(0.05)`).
- Coarse lithographic film grain or 1-bit threshold halftone dither (`45e4f8147b81c3e0bb8a8549802e6ace.jpg`, `af5d4910c380dbc8bc0925f405f4d5de.jpg`) for archival diagrams and engraved statues.
- Signal Vermilion glow (`--signal-vermilion-500`, `#C8281E`) is permitted *only* as an intentional architectural core highlight inside primary hero photography (as in `preview (1).webp`), never via artificial CSS color overlays on ordinary plates.

### 5.5 Strict Iconography Rules
Standard SaaS icon libraries (Lucide, Feather, Heroicons, Material Symbols), filled rounded glyphs, illustrative mascots, and all Unicode emojis are **banned**.

All UI and wayfinding glyphs must be custom `1px`-stroke geometric drafting primitives snapped to whole pixel coordinates (`stroke-linecap="square"`, `stroke-linejoin="miter"`):

| Glyph | Function | Spec |
| :--- | :--- | :--- |
| **`+`** *(Cardinal Crosshair)* | Expand specimen, grid intersection, coordinate anchor | Equal orthogonal 1px strokes (`12×12` or `16×16`) |
| **`×`** *(Mitered Cross)* | Close drawer, clear filter, quarantine/error indicator | 45° diagonal 1px strokes (`--signal-ink` on error states) |
| **`→` / `←`** *(Orthogonal Arrow)* | Sequence pagination, next/previous folio | 1px horizontal shaft + crisp 90° mitered chevron |
| **`↗` / `↙`** *(45° Index Arrow)* | External dossier link, jump to plate, Signal CTA | 1px diagonal shaft + crisp right-angle head (`preview (1).webp`) |
| **`•`** *(Signal Telemetry Dot)* | Active navigation route, live archive state | `4px` or `6px` solid geometric circle in `--signal-ink` or `--ink-primary` |
| **`✦`** *(4-Point Alignment Star)* | Master plate corner anchor only (`aria-hidden="true"`) | Sharp concave-arc 4-point surveyor star; zero 5-point or rounded stars |

---

## 6. Governance Checklist (Pre-Ship Audit)

Before any MONOLITH page, component, or editorial artifact ships, verify:
1. **Three Families + Custom SVG Lockup:** UI/editorial prose uses only `Bodoni Moda`, `Inter`, and `IBM Plex Mono`; brand lockups use the official custom `<path>` SVGs in `brand/`.
2. **Tabular Discipline:** Every number in a coordinate, date, index, or metric table uses `tabular-nums`.
3. **Canonical Palette & AA Ink:** Surfaces and inks map exclusively to Void Concrete (`#131313`), Basalt (`#282828`), Weathered Grey (`#77746C`), Limestone (`#B9B5AA`), Raw Plaster (`#E9E5DF`), and adaptive Signal Vermilion (`#F45D4D` / `#A81F17` / `#8B1912` / `#C8281E` glow-only). All normal text uses `--ink-primary` or `--ink-secondary`; Weathered Grey never appears on `< 24px` text or inside Limestone surfaces.
4. **Zero Softness:** `border-radius: 0px` on all UI containers; `0px` box shadows; `0px` backdrop blurs.
5. **Border Fidelity:** Functional dividers use `1px` `--border-hairline` (`>= 3:1`) or `1–2px` `--border-structural`; decorative drafting marks carry `aria-hidden="true"`.
6. **Signal Budget:** Signal Vermilion occupies `<= 2%` of total viewport area and conveys state/index exclusively.
7. **Voice Audit:** Zero banned AI clichés, zero exclamation marks, zero conversational SaaS prompts.
