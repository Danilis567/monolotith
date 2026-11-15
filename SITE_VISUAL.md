# MONOLITH — Web Visual, Photography & Art Direction Specification

> **Document Scope:** Production rules for architectural photography, CSS filter pipelines, film-grain/halftone surfacing, crop geometries, image–typography layering, dark/light plate polarity, and Core Web Vitals / accessibility compliance across the **MONOLITH** web platform.  
> **Governing Siblings:** [BRAND.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/BRAND.md), [SITE_LAYOUT.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/SITE_LAYOUT.md), [COLOR_SYSTEM.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md), [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css), and [LOGO_GUIDELINES.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/LOGO_GUIDELINES.md).

---

## 1. Visual Synthesis & Reference Lineage (`ref/` — 14 Verified Plates)

Every visual rule in this specification derives directly from the **14** reference artifacts in `ref/`, distilled into a cohesive museum-monograph web system:

| Artifact (`ref/`) | Extracted Visual & Art-Direction Rule | Rejected / Filtered Out |
| :--- | :--- | :--- |
| `preview (1).webp` *(OBSIDIAN)* | Full-bleed dark void (`#131313`) hero mass, sculptural concrete emerging from black ground, `<= 2%` Signal Vermilion core glow (`--signal-glow`), square `1:1` micro-telemetry inset (`CURRENT STUDY`), `+` crosshair, `↗` / `↙` 45° arrows. | Zero soft drop shadows or glossy UI overlays. |
| `preview (2).webp` *(TAKUMI)* | Asymmetric editorial plate grid (`16:10` hero + staggered lower frames), stark rule-separated monograph + italic recognition column, raw monochrome concrete contrast. | No equal-height 3-column SaaS card grids. |
| `preview (3).webp` *(Residential Brutalism)* | Three-layer silhouette depth: background sky plate (`z-1`), monumental condensed display type (`z-2`), masked brutalist tower roofline overlapping lower letterforms (`z-3`). | Rejected warm sky color cast in favor of high-contrast monochrome (except curated archival tint). |
| `preview.webp` *(Web Brutalism)* | Mixed Void Concrete / Raw Plaster island polarity (`[data-surface]`), `1–2px` hard `0px` frames, vertical rotated section rails, tabular index rules, Signal Vermilion strictly for error/validation state. | Rejected cartoonish pill buttons, smiley stickers, and multi-font chaos. |
| `0dab4c077b6ab5d9d67a75f911d986ff.jpg` | Extreme Gothic chiaroscuro on stone vaulting: deep `#131313` web recesses against crisp `#E9E5DF` limestone ribs. | — |
| `135d5a8db69f2a1c011dab3c024a5694.jpg` *(Astor Mansions)* | Staggered rounded Deco arch crops (`0px` flat base) with coarse silver-halide grain on dark mineral ground and clean archival date/city stamp. | — |
| `1615b1e82d9ec1985e293aaad8cf70ff.jpg` *(Fallen Angel)* | Rounded arch centerpiece overlapping hollow outlined display lettering, `4`-point alignment stars (`✦`), hairline framing grid, vertical right-rail marginalia. | Rejected oval pill badges and curved circular text rings inside UI controls. |
| `45e4f8147b81c3e0bb8a8549802e6ace.jpg` *(Saint Petersburg)* | Raw Plaster / Limestone ground hosting 1-bit crosshatch/halftone architectural engraving, inset monochrome detail plate, coordinate stamps, vertical year (`2023` / `1703`), millimeter scale ruler. | — |
| `5fc0fcecca24eed8b7c4b704e08b459a.jpg` *(Gothic Art)* | Tight `1px` partitioned specimen grid, lithographic distress grain, silhouette head rising across and masking the center of the upper masthead. | Rejected violet spot ink, blackletter display font, and "Parental Advisory" / ESRB kitsch badges. |
| `7ed9e87d3c2d61e0481fa3306ecb0c6a.jpg` *(BRUTALISM UK)* | Brutalist concrete tower overlapping stacked solid + hollow `-webkit-text-stroke` display headlines; vertical rotated left manifesto rail & right origin stamp (`UNITED KINGDOM 1950`). | — |
| `af5d4910c380dbc8bc0925f405f4d5de.jpg` | Pure 1-bit ordered halftone/dither dot matrix plate on pitch-dark `#131313` void. | — |
| `c5eb814ab3b11a46ee4eb2146116b999.jpg` *(Martha lives)* | Full-bleed atmospheric monochrome hero; dark-ground **pointed Gothic lancet arch** cutout flanked by `✦` stars, radiating base axis ticks, and vertical rotated caption; diagonal shear triptych (`clip-path: polygon`). | Rejected blackletter copy and social icon clusters. |
| `db816a1cefd19db941e51881528070bd.jpg` | Raster/scanline archival plate paired with tabular monospace telemetry ledger. | Rejected heavy chromatic aberration / RGB glitch bloom. |
| `e290eb14d02fed3e7209b5e469abb0bd.jpg` *(DECONDOR)* | Stepped mitered corner notches (`6px`/`12px` nested L-brackets), rounded arch behind monumental display title, `0px` rectilinear relief flanked by vertical rotated typography (`MORTAL` / `BEING`). | Rejected distorted variable-width mirrored display letters. |

---

## 2. Monochrome, Contrast & Surface Texture Pipeline

All MONOLITH photography behaves as **high-contrast archival silver-gelatin or lithographic plate imagery**. Color photography is never rendered ungraded.

### 2.1 Canonical CSS Filter Pipeline

```css
/* Base container isolates blend modes and texture overlays without creating a scroll container */
.plate-frame {
  position: relative;
  overflow: clip;
  isolation: isolate;
  background-color: var(--surface-sunken);
  border-radius: 0px;
}

/* 1. Default Archival Monochrome Plate (Dark Void & Chiaroscuro) */
.plate-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.12) brightness(0.92);
  transition: filter 180ms cubic-bezier(0.2, 0, 0, 1);
}

/* 2. Active Inspection State (Hover / Focus-Within on Interactive Plates) */
.plate-interactive:hover .plate-img,
.plate-interactive:focus-within .plate-img {
  filter: grayscale(100%) contrast(1.22) brightness(1.0);
}

/* 3. High-Key Stone / Daylight Variant (For overcast limestone & plaster elevations) */
.plate-img--highkey {
  filter: grayscale(100%) contrast(1.16) brightness(1.02);
}

@media (prefers-reduced-motion: reduce) {
  .plate-img {
    transition: none;
  }
}
```

**Filter & Interaction Prohibitions:**
- **Never** apply `transform: scale(...)` zoom pops on hover; inspection feedback comes strictly from the tonal contrast snap above paired with a border shift (`--border-hairline` → `--border-structural` or `--signal-border`).
- **Never** apply `blur()`, `drop-shadow()`, `sepia()`, or `hue-rotate()` CSS filters to photographic plates.
- **Exception for Architectural Signal Glow (`preview (1).webp`):** The sole permitted non-monochrome highlight is a curated Signal Vermilion core glow (`--signal-glow: #C8281E`) baked into hero photography or placed strictly as an atmospheric `radial-gradient` *behind* a masked foreground specimen (`<= 2%` viewport area, zero dependency for text contrast).

### 2.2 Zero-Cost Architectural Micro-Grid & Halftone Overlays

To reproduce the lithographic and drafting-sheet tooth of `135d5a8d...`, `45e4f814...`, and `5fc0fcec...` **without** heavy runtime `<canvas>` loops or `<feTurbulence>` SVG filter rasterization:

1. **GPU-Safe Architectural Micro-Grid Overlay (`.plate-grain::after`):**
   - Instead of `<feTurbulence>`, `.plate-grain::after` uses a lightweight, GPU-safe orthogonal CSS `linear-gradient` architectural micro-grid overlay (`4px × 4px` tile, zero SVG filter evaluation during scroll).
   - Applied inside an `isolation: isolate` `.plate-frame` using `pointer-events: none` and `aria-hidden="true"` semantics (pseudo-element is omitted from accessibility tree).

```css
.plate-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.075;
  mix-blend-mode: overlay;
  background-repeat: repeat;
  background-size: 4px 4px;
  background-image:
    linear-gradient(to right, rgba(233, 229, 223, 0.35) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(233, 229, 223, 0.35) 1px, transparent 1px);
}
```

2. **1-Bit Halftone Dot Matrix Overlay (`.plate-halftone::after`):**
   - Reserved for archival engraved details, statues, and Raw Plaster technical prints (`45e4f814...`, `af5d4910...`). Built purely from stacked CSS `radial-gradient` layers (zero SVG/image requests):

```css
.plate-halftone {
  isolation: isolate;
}

.plate-halftone .plate-img {
  filter: grayscale(100%) contrast(1.38) brightness(0.96);
}

.plate-halftone::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  --dot-step: 4px;
  --dot-r: 1px;
  --dot-ink: rgba(19, 19, 19, 0.42);
  --dot: radial-gradient(circle, var(--dot-ink) var(--dot-r), transparent calc(var(--dot-r) + 0.5px));
  background-image: var(--dot), var(--dot);
  background-position: 0 0, calc(var(--dot-step) / 2) calc(var(--dot-step) / 2);
  background-size: var(--dot-step) var(--dot-step);
  mix-blend-mode: multiply;
}
```

3. **Accessibility & High-Contrast Override:**
```css
@media (forced-colors: active), (prefers-contrast: more) {
  .plate-grain::after,
  .plate-halftone::after {
    display: none;
  }
}
```

---

## 3. Crop Geometry & Sanctioned Aspect Ratios

All containers default to **`border-radius: 0px`**. Only two geometric families exist: **Rectilinear / Shear Crops** and **Architectural Arch Apertures**.

### 3.1 Rectilinear & Diagonal Shear Crops (`0px` Corners)

| Class / Ratio | `aspect-ratio` | Permitted Structural Context | Reference Lineage |
| :--- | :--- | :--- | :--- |
| **Brutalist Tower / Elevation** | `3 / 4` | Vertical concrete monoliths, primary `CAT. 001`–`CAT. 027` specimen index plates, featured `3:4` arch cutouts. | `7ed9e87d...`, `5fc0fcec...` |
| **Monograph Specimen** | `4 / 5` | **Rectilinear `0px` crops only** (never arched): editorial diptychs, cathedral facade details, essay plates. | `0dab4c07...`, `135d5a8d...` |
| **Architectural Panorama** | `16 / 10` | Wide horizontal elevations, structural span studies, full-width feature plates (`CAT. NNN` gallery headers). | `preview (2).webp` *(Takumi)* |
| **Vertical Dossier Strip** | `2 / 3` | Narrow side-rail specimens, tall lancet frames (`2:3` arch only), multi-column print plates. | `af5d4910...`, `c5eb814a...` |
| **Micro-Telemetry Inset** | `1 / 1` *(max `140px`)* | **Strictly** miniature study thumbnails (`CURRENT STUDY` style) inside telemetry blocks. Never for hero or card grids. | `preview (1).webp` *(Obsidian)* |
| **Diagonal Shear Triptych** | `16 / 9` *(band)* | Full-bleed transition triptychs clipped with `clip-path: polygon(...)` (`0px` corners). | `c5eb814a...` *(bottom panel)* |

**Diagonal Shear Triptych Pattern:**
```css
.plate-shear-left   { clip-path: polygon(0 0, 100% 0, 74% 100%, 0 100%); }
.plate-shear-center { clip-path: polygon(22% 0, 100% 0, 78% 100%, 0 100%); }
.plate-shear-right  { clip-path: polygon(26% 0, 100% 0, 100% 100%, 0 100%); }
```

### 3.2 Pointed Gothic Lancet & Romanesque/Deco Arch Apertures

**Strict Containment & Aspect-Ratio Lock:** Arch `clip-path` apertures (Pointed Gothic Lancet and Romanesque/Deco) are **reserved exclusively for featured specimen plates and Gothic/sacred hero frames** across the `27` archived structures (`CAT. 001`–`CAT. 027`, referencing `c5eb814a...`, `1615b1e8...`, `135d5a8d...`). **Every Lancet and Romanesque arch plate MUST be locked strictly to `3 / 4` or `2 / 3` aspect ratio—never `4 / 5`, `1 / 1`, or `16 / 10`**—and arches are prohibited on compact catalog index thumbnails, navigation tiles, avatar circles, or repetitive grid cards.

**Focus-Ring Safety on Clipped Plates:** Because CSS `clip-path` truncates any outline or border rendered on the clipped element itself, interactive `clip-path` arch plates (and diagonal shear plates like `/structures/trellick-tower` `CAT. 001`) **must** attach their interactive `<Link>` / `<button>` and `:focus-visible` indicator (`outline: 2px solid var(--focus-ring); outline-offset: 2px;`) to an **unclipped outer wrapper**—never on the clipped child node:

```html
<!-- Focus outline lives on the unclipped outer link; clip-path lives strictly on the inner figure -->
<a href="/structures/sainte-chapelle" class="plate-interactive-outer">
  <figure class="plate-frame plate-arch-lancet">
    <img src="/plates/cat-014-sainte-chapelle.avif" alt="..." class="plate-img" />
  </figure>
</a>
```

```css
.plate-interactive-outer {
  display: block;
  border-radius: 0px;
}

.plate-interactive-outer:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

To preserve `border-radius: 0px` on all DOM boxes and ensure distortion-free scaling across responsive grids, arches are clipped via inline SVG `<clipPath clipPathUnits="objectBoundingBox">` (`0..1` normalized coordinates) paired with an optional `1px` `vector-effect="non-scaling-stroke"` hairline arch overlay:

1. **Pointed Gothic Lancet Arch (Pythagorean `11–60–61` Tangent Continuity):**
   - For a `3:4` (`300 × 400`) plate springing cleanly at `y = 0.45` (`180 / 400`), two circular arcs of radius `R = 183` (`3 × 61`, center at `dx = 33, dy = 180`) meet at the pointed apex `(0.5, 0)` with exact vertical tangency (`0°` kink at side walls):
   - Normalized `objectBoundingBox` parameters: `rx = 183 / 300 = 0.61`, `ry = 183 / 400 = 0.4575`.

```html
<!-- Global zero-size SVG clip definitions rendered once in root layout -->
<svg width="0" height="0" aria-hidden="true" style="position:absolute">
  <defs>
    <!-- Pointed Gothic Lancet Arch calibrated for 3:4 plates (11-60-61 triple) -->
    <clipPath id="monolith-lancet-3x4" clipPathUnits="objectBoundingBox">
      <path d="M 0 1 L 0 0.45 A 0.61 0.4575 0 0 1 0.5 0 A 0.61 0.4575 0 0 1 1 0.45 L 1 1 Z" />
    </clipPath>

    <!-- Pointed Gothic Lancet Arch calibrated for 2:3 plates (11-60-61 triple) -->
    <clipPath id="monolith-lancet-2x3" clipPathUnits="objectBoundingBox">
      <path d="M 0 1 L 0 0.40 A 0.61 0.4067 0 0 1 0.5 0 A 0.61 0.4067 0 0 1 1 0.40 L 1 1 Z" />
    </clipPath>

    <!-- Rounded Romanesque / Deco Arch calibrated for 3:4 plates (true semicircle crown) -->
    <clipPath id="monolith-romanesque-3x4" clipPathUnits="objectBoundingBox">
      <path d="M 0 1 L 0 0.375 A 0.5 0.375 0 0 1 1 0.375 L 1 1 Z" />
    </clipPath>
  </defs>
</svg>
```

```css
.plate-arch-lancet {
  aspect-ratio: 3 / 4;
  /* Progressive fallback polygon if SVG clip-path fails; crisp lancet otherwise */
  clip-path: polygon(0 100%, 0 45%, 12% 24%, 30% 8%, 50% 0, 70% 8%, 88% 24%, 100% 45%, 100% 100%);
  clip-path: url(#monolith-lancet-3x4);
}

.plate-arch-lancet--tall {
  aspect-ratio: 2 / 3;
  clip-path: polygon(0 100%, 0 40%, 12% 21%, 30% 7%, 50% 0, 70% 7%, 88% 21%, 100% 40%, 100% 100%);
  clip-path: url(#monolith-lancet-2x3);
}

.plate-arch-romanesque {
  aspect-ratio: 3 / 4;
  /* CSS inset() round fallback keeps DOM border-radius strictly 0px */
  clip-path: inset(0 round 50% 50% 0 0 / 37.5% 37.5% 0 0);
  clip-path: url(#monolith-romanesque-3x4);
}
```

- **Framing Note:** When framing an arched cutout (`c5eb814a...`, `1615b1e8...`, `e290eb14...`), pair the arch plate with:
  - A `1px` SVG hairline arch stroke (`vector-effect="non-scaling-stroke"`, `stroke: var(--border-hairline)`) around the perimeter, OR
  - Two corner `✦` 4-point alignment stars (`aria-hidden="true"`) flanking the upper shoulders inside a `0px` rectilinear outer box, plus optional radiating datum ticks at the `0px` ground plane (`c5eb814a...`).

---

## 4. Image–Typography Interplay & Layering Architecture

Typography interacts with architectural photography through **three strict spatial modes**. Soft blurred pills or translucent frosted badges over images are banned.

### 4.1 Three-Layer Architectural Silhouette Stack (Behind & In Front of Form)

Directly derived from `preview (3).webp` (*Residential Brutalism / Trellick Tower*), `7ed9e87d...` (*BRUTALISM UK*), and `5fc0fcec...` (*Gothic Art*): monumental display headlines (`Bodoni Moda 900`, `--type-monolith`) or repeated decorative stroke echoes sit **behind** the architectural roofline while remaining structurally legible in the sky/void plane.

```html
<section class="hero-monolith-stack" aria-labelledby="hero-title">
  <!-- Layer 1 (z-1): Full-bleed sky & structure LCP plate -->
  <img
    src="/plates/trellick-full.avif"
    alt="Trellick Tower, Ernő Goldfinger 1972, low-angle elevation showing detached concrete service shaft against overcast sky."
    width="1600"
    height="1000"
    sizes="100vw"
    fetchpriority="high"
    class="hero-layer-bg plate-img"
  />

  <!-- Layer 2 (z-2): Monumental display title anchored in upper/mid sky plane -->
  <div class="hero-layer-type">
    <span class="type-ui-label">CAT. 001 // LONDON</span>
    <h1 id="hero-title" class="type-monolith">MONOLITH</h1>
    <!-- Optional hollow stroke echo (7ed9e87d... pattern): ALWAYS aria-hidden -->
    <span class="type-monolith type-monolith--echo" aria-hidden="true">MONOLITH</span>
  </div>

  <!-- Layer 3 (z-3): Alpha-masked foreground concrete roofline cutout (identical crop/position) -->
  <img
    src="/plates/trellick-rooflines-mask.webp"
    alt=""
    aria-hidden="true"
    width="1600"
    height="1000"
    sizes="100vw"
    fetchpriority="high"
    class="hero-layer-fg plate-img"
  />
</section>
```

**Silhouette Depth Rules:**
1. **Identical Geometry Lock:** Layer 1 (`hero-layer-bg`) and Layer 3 (`hero-layer-fg`) **must** share identical `aspect-ratio`, `width`/`height`, `object-fit: cover`, and `object-position` (e.g., `50% 65%`) so the foreground concrete mask aligns pixel-for-pixel across every viewport width.
2. **Legibility Ceiling:** The Layer 3 foreground silhouette may overlap **at most the lower `18%–25%`** of the `<h1>` letterforms (descender/baseline anchors). Upper bowls, crossbars, and ascenders must remain unobstructed against the high-contrast sky/scrim plane.
3. **Hollow Echo Stroke Rule (`7ed9e87d...`):** Repeated outline echoes use `-webkit-text-stroke: 1px var(--border-hairline); color: transparent;`, must carry `aria-hidden="true"`, and never contain interactive links.

### 4.2 Over-Image Typography & Scrim Contrast (`>= 4.5:1` AA / `>= 7:1` Target)

When headlines, colophon stamps, or action triggers sit **in front of** photography (`preview (1).webp`, `c5eb814a...` hero, `e290eb14...` bottom panel):
- **Mandatory `--surface-scrim` Protection & `0%–25%` Band Lock:** In [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css), `--surface-scrim` always resolves to dark `rgba(19, 19, 19, 0.86)` (dark theme) or `rgba(19, 19, 19, 0.78)` (light theme). Because semi-transparent mid-gradient stops (e.g. `0.56` alpha) fall below `4.5:1` (`~3.95:1`) over bright sky highlights, **all over-image text MUST be confined strictly to the `0%–25%` edge band where scrim alpha is `>= 0.80`**, guaranteeing `>= 4.5:1` AA contrast (`~9.5:1` for `#E9E5DF` primary ink, `~6.0:1` for `#B9B5AA` secondary metadata over worst-case `#FFFFFF` highlights):
  ```css
  .plate-scrim-bottom {
    background: linear-gradient(
      to top,
      var(--surface-scrim) 0%,
      rgba(19, 19, 19, 0.80) 25%,
      transparent 60%
    );
  }
  ```
  Text must never extend above the `25%` `>= 0.80` alpha threshold into the unguarded `25%–60%` fade zone.
- **Hard-Edged Inset Stamp:** Whenever metadata or `CAT. NNN` `IBM Plex Mono` colophon blocks sit higher in a plate, wrap them in a solid `0px` `--surface-canvas` (`#131313`) rectangle bordered by `1px solid var(--border-structural)` (`#E9E5DF`), eliminating midtone contrast risk altogether.
- **`mix-blend-mode` Restriction:** `mix-blend-mode: difference` is **banned** on all readable copy, navigation, and metadata. It is permitted solely on `aria-hidden="true"` oversized index numerals or surveyor ticks.

### 4.3 Vertical Rotated Marginalia (`writing-mode: vertical-rl`)

Derived from `c5eb814a...` (*this is serious, I mean it*), `7ed9e87d...` (*RAW, CONCRETE...* & *UNITED KINGDOM 1950*), `e290eb14...` (*MORTAL / BEING* & *VOICE OF WISDOM*), and `45e4f814...` (*2023* / *1703*):

```css
.plate-marginalia-vertical {
  writing-mode: vertical-rl;
  /* Flip 180deg for bottom-to-top left margin rails (Trellick / Martha Lives style) */
  transform: rotate(180deg);
  font-family: var(--font-mono);
  font-size: 0.75rem; /* --type-colophon */
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--ink-secondary);
  white-space: nowrap;
}

/* Collapse cleanly to horizontal colophon rule on narrow mobile viewports */
@media (max-width: 767px) {
  .plate-marginalia-vertical {
    writing-mode: horizontal-tb;
    transform: none;
    white-space: normal;
  }
}
```

- **Usage Limits:** Vertical rails hold **short archival identifiers only** (`<= 6` words: `CAT. 001`, `59°56'02"N`, `LONDON — 1972`, `BÉTON BRUT`). Never rotate multi-line paragraphs or interactive navigation menus.

---

## 5. Dark vs. Light Surface Plate Polarity Rules

MONOLITH enforces strict surface separation via `[data-surface]` islands defined in [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css). Every surface island (`[data-surface="void"]`, `[data-surface="basalt"]`, `[data-surface="plaster"]`, `[data-surface="limestone"]`) carries **self-contained surface, ink, border (`>= 3.0:1`), and signal (`>= 4.5:1`) tokens**, preventing parent-theme token bleed when islands are nested inside opposite-polarity containers:

### 5.1 Dark Void (`#131313`) & Basalt (`#282828`) — Photographic Plates
- **Primary Canvas:** `[data-surface="void"]` (`#131313`) hosts all full-bleed photographic heroes, lancet/Romanesque specimen cutouts, and chiaroscuro gallery sequences, declaring self-contained `--ink-primary: #E9E5DF` (`14.81:1`), `--ink-secondary: #B9B5AA` (`8.94:1`), `--border-hairline: #77746C` (`3.98:1` >= `3.0:1`), `--border-structural: #E9E5DF`, and `--signal-ink: #F45D4D` (`5.77:1` >= `4.5:1`).
- **Elevated Index Panels:** `[data-surface="basalt"]` (`#282828`) hosts secondary photographic dossiers with self-contained `--ink-primary: #E9E5DF` (`11.75:1`), `--ink-secondary: #B9B5AA` (`7.20:1`), `--border-hairline: #77746C` (`3.16:1` >= `3.0:1`), `--border-structural: #E9E5DF`, and `--signal-ink: #F45D4D` (`4.58:1` >= `4.5:1`), and *must* carry a `1px solid var(--border-hairline)` or `var(--border-structural)` perimeter (because `#282828` vs. `#131313` is `1.26:1` < `3:1` WCAG 1.4.11 boundary threshold).
- **Framing Grammar & Paspartu Inset:** Within `#main-content` (which uses `--grid-margin: 1rem` on `< 768px`, `--grid-margin: 1.5rem` on `768px–1023px`, and `--grid-margin: 10%` with `--grid-max-width: 100%` on `>= 1024px`), primary exhibition plates (`.heroPlateLink`, `.plateFrameOuter`) sit inside a `1px solid var(--border-structural)` outer frame with `0.75rem`–`1rem` paspartu padding, top-corner mitered `<SteppedFrame />` brackets (`inset: 0.75rem` inside the image aperture), `1.5rem` horizontal / `1.35rem` bottom overlay title inset, and a bordered `.heroPlateCaption` strip (`padding: 0.875rem 1.25rem; margin-top: 0.75rem`) so text never collides with corner registration brackets.

### 5.2 Raw Plaster (`#E9E5DF`) & Limestone (`#B9B5AA`) — Orthographic `03 ANATOMY` Plates & Elevated Surface Tokens
Inspired by `45e4f814...` (*Saint Petersburg*) and architectural drafting sheets:
- **Purpose:** `[data-surface="plaster"]` (`#E9E5DF`) and `[data-surface="limestone"]` (`#B9B5AA`) islands host **orthographic `03 ANATOMY` line drawings** (plans, sections, structural elevations, ribbed-vault projections), 1-bit halftone architectural details, and structural callout boxes (`.calloutMetricBox`).
- **Self-Contained Surface Island Token Contract:** In [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css), every `[data-surface="void"]`, `[data-surface="basalt"]`, `[data-surface="plaster"]`, and `[data-surface="limestone"]` island explicitly re-declares its complete set of surface (`--surface-canvas`, `--surface-elevated`, `--surface-sunken`, `--surface-basalt`), ink (`--ink-primary`, `--ink-secondary`, `--ink-muted`), border (`--border-hairline` `>= 3.0:1`, `--border-structural`), and signal (`--signal-ink` `>= 4.5:1`, `--signal-border`) tokens (`#E9E5DF` plaster with `#131313` [`14.81:1`] ink, `#77746C` [`3.72:1` >= `3.0:1`] hairline, and `#A81F17` [`5.83:1` >= `4.5:1`] signal; `#B9B5AA` limestone with `#131313` [`9.07:1`] primary ink, `#282828` [`7.20:1` >= `3.0:1`] ink/hairline, and `#8B1912` [`4.57:1` >= `4.5:1`] signal), guaranteeing `0` WCAG AA contrast violations across all nested or standalone surface islands.
- **Vector Anatomy Stroke Palette:**

| Structural Layer | On Raw Plaster (`#E9E5DF`) | On Limestone (`#B9B5AA`) | Stroke & Geometry Spec |
| :--- | :--- | :--- | :--- |
| **Primary Section Cut / Masonry Mass** | `#131313` (`--concrete-950`, `14.81:1`) | `#131313` (`--concrete-950`, `9.07:1`) | `1.5px`–`2px`, `stroke-linecap="square"`, `stroke-linejoin="miter"` |
| **Hidden / Elevation Projection Lines** | `#282828` (`--concrete-800`, `11.75:1`) | `#282828` (`--concrete-800`, `7.20:1`) | `1px` solid or `4 3` architectural dash |
| **Decorative Backdrop Drafting Grid** | `#77746C` (`--concrete-500`, `3.72:1`) | **PROHIBITED** (`2.28:1`); use `#282828` | `1px`, `aria-hidden="true"` only |
| **Vermilion Axis / Plumb / Load Vectors** | `#A81F17` (`--signal-vermilion-600`, `5.83:1`) | `#8B1912` (`--signal-vermilion-700`, `4.57:1`) | `1px`–`1.25px` dash-dot datum (`A—A'`), `<= 2%` area budget |

- **Vector Polarity Rule:** Never apply CSS `filter: invert(1)` to photographs. Author Anatomy SVGs using semantic `var(--ink-primary)`, `var(--border-hairline)`, and `var(--signal-ink)` tokens so they automatically meet WCAG contrast inside any `[data-surface]` island.

### 5.3 Anti-SaaS Layout Prohibitions (Mandatory Audit Gate)
- **Banned:** Uniform equal-height 3-column/4-column SaaS card grids, `box-shadow` drop elevations, `backdrop-filter: blur()` glass pills, rounded corner radii (`> 0px`), soft color gradient card backgrounds, decorative avatars, and stock lifestyle imagery.
- **Mandated:** Asymmetric editorial cadence (`7:5`, `8:4`, `5:4:3` 12-column spans per `preview (2).webp`), intentional Void Concrete negative space (`65%–75%` open canvas), hard `1px` structural grid tracks, and exposed tabular colophons (`IBM Plex Mono`).

---

## 6. Performance (`next/image`), Zero CLS & Accessibility Rules

### 6.1 Responsive `sizes` Strategy (`12-Column` Grid, `24px` Gutter, `< 768px` Mobile Breakpoint)

| Plate Slot / Column Span | `sizes` Attribute | Max Intrinsic Asset Width |
| :--- | :--- | :--- |
| **Full-Bleed Hero (`12 cols`)** | `sizes="100vw"` | `1920px` (AVIF / WebP) |
| **Monumental Feature (`8 cols` desktop)** | `sizes="(max-width: 767px) 100vw, (max-width: 1440px) 66vw, 960px"` | `1440px` |
| **Editorial Diptych (`6 cols` desktop)** | `sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 720px"` | `1080px` |
| **Specimen Index Plate (`4 cols` desktop, `CAT. 001`–`CAT. 027`)** | `sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"` | `720px` |
| **Micro-Telemetry Inset (`1:1`)** | `sizes="140px"` | `280px` (`2×` DPR cap) |

### 6.2 Zero CLS (`aspect-ratio` Lock)
Every image wrapper across all `27` structures (`CAT. 001`–`CAT. 027`) **must** lock geometry prior to network fetch using CSS `aspect-ratio` (`3 / 4`, `4 / 5` [rectilinear only], `16 / 10`, `2 / 3`) combined with explicit `width` and `height` props on `next/image` (or `fill` inside an `aspect-ratio`-locked `position: relative` container with `object-fit: cover`). Never let an unstyled `height: auto` image pop page flow on load.

### 6.3 LCP & Loading Priority Discipline
1. **LCP Hero Only (`fetchpriority="high"`):** Apply `fetchpriority="high"` (in Next.js: `priority` / `preload` + `fetchPriority="high"`) **exclusively** to the single above-the-fold hero plate (maximum `1` plate—or `2` only when a foreground silhouette PNG/WebP mask shares the exact LCP hero frame). **Never** combine `fetchpriority="high"` with `loading="lazy"`.
2. **Below-the-Fold Plates (`loading="lazy"` alone):** Standard archive plates below the fold use `loading="lazy"` and **omit** `fetchpriority` so they load at normal priority when scrolled into proximity.
3. **Hidden Above-the-Fold Plates (`fetchpriority="low"`):** Images technically near the top of the DOM that are initially hidden (collapsed index drawers, offscreen folio slides, mega-menu previews) use `fetchpriority="low"` with `loading="lazy"`.
4. **Deprecated Attributes Banned:** Never emit `importance="..."` or `loading="auto"`.

### 6.4 Accessibility & Laconic Alt-Text Pattern
- **Photographic Plates (`<figure>` + `<figcaption>`):**
  - Alt text follows the **Laconic Archivist** pattern (`<= 160` characters, zero *"image of"* / *"photo of"* prefixes, zero poetic clichés):
    `"[Monument Name], [Architect & Year], [viewpoint & lighting], [primary material & structural detail]."`
  - *Example:* `"Notre-Dame du Haut, Le Corbusier 1955, oblique exterior elevation under flat overcast light, sprayed concrete roof shell over battered whitewashed masonry."`
- **Orthographic Anatomy Drawings (Raw Plaster SVGs):**
  - Provide `<figure>` with an explicit `aria-label` or SVG `<title>` + `<desc>` summarizing the structural geometry, paired with an adjacent semantic HTML `<table>` / `<dl>` colophon containing all metric dimensions (`ELEV.`, `SPAN`, `MAT.`, `COORD.`) so quantitative data is never trapped in vector paths.
- **Decorative Masks, Overlays & Echoes:**
  - Foreground silhouette cutout layers (`z-3`), film-grain/halftone overlays, corner crosshairs (`+` / `✦`), millimeter rulers, stepped corner notches, and hollow echo display repetitions **must** carry `alt=""` and `aria-hidden="true"`.
