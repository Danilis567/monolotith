# MONOLITH — Brand Identity & SVG Geometry Guidelines

> Editorial digital archive of Brutalist, Gothic, and Monumental architecture.  
> **Color Source of Truth:** [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css) & [COLOR_SYSTEM.md](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/COLOR_SYSTEM.md)

---

## 1. Geometry Concept & Architectural Construction

The **MONOLITH** identity system fuses **Brutalist concrete mass** with **Gothic verticality** through strict Euclidean and Pythagorean proportions—constructed without soft gradients, drop shadows, or system font dependencies.

### 1.1 The "M" Monolith–Lancet Mark (`64 × 64` Master Grid)
- **Outer Slab Bounds:** `x: 8..56` (`48` units wide), `y: 6..58` (`52` units tall) — razor-sharp `90°` concrete corners.
- **Upper M Saddle Notch:** Descends from `(17, 6)` to `(32, 26)` and returns to `(47, 6)` along an exact **`3:4:5` Pythagorean slope** (`dx = 15, dy = 20, hypotenuse = 25`), creating `9`-unit flat pier crowns on both shoulders.
- **Keystone Bridge:** Solid `8`-unit structural bridge between `y = 26` and `y = 34` along the central vertical plumb axis (`x = 32`).
- **Gothic Pointed Lancet Void:** Springs directly from the ground plane at `(20, 58)` and `(44, 58)` (`12`-unit wide outer piers) with zero vertical stilts and rises via two intersecting circular arcs of radius `R = 30` (exact **`18–24–30`** Pythagorean triple, `3:4:5 × 6`) to a sharp pointed apex at `(32, 34)` (`53.13°` apex tangent).

### 1.2 Pixel-Aligned Favicons (`16 / 32 / 48 / 64`)
All four favicons share the unified **ground-springing lancet** silhouette (no vertical stilts) on a solid **Void Concrete** (`#131313`) tile with **Raw Plaster** (`#E9E5DF`) ink and no low-opacity border:
- **`favicon-16.svg` (`16 × 16`):** Outer piers `x: 2..5` and `11..14` (`3px` wide), upper saddle `(4,1) → (8,6) → (12,1)`, **`3px` solid keystone bridge (`y: 6..9`)**, and ground-springing `R = 7.5` lancet void `(5,15) → (8,9) → (11,15)`.
- **`favicon-32.svg` (`32 × 32`) & `favicon-48.svg` (`48 × 48`):** Exact `2×` and `3×` integer multiples of the `16 × 16` pixel grid.
- **`favicon.svg` (`64 × 64`):** Master `MONOGRAM_PATH_64` on solid `#131313` tile.

### 1.3 Custom Geometric Display Letterforms (`MONOLITH`)
All display and coordinate letterforms are **100% custom `<path>` geometry** (zero `<text>` elements) so every asset renders identically across browsers, operating systems, SVG viewers, and design software:
- **Cap Height (`H`):** `48` units (`y: 0..48`), **Uniform Stroke Weight (`sw`):** `6` units (`1:8` stroke-to-height ratio), **Total Wordmark Span:** `238 × 48` units.
- **Signature `O` Bevel:** Octagonal Brutalist bevel (`6 × 8` corner cut) paired with an inner `3 × 4` bevel (`6.000` exact perpendicular wall thickness via `3–4–5` triangle geometry).
- **Drafting Micro-Typography & DMS Coordinates:** Secondary metadata and standardized DMS coordinates (`51°30'00"N × 0°07'00"W`) are drawn on a `6 × 10` architectural CAD stroke grid (`stroke-linecap="square"`, `stroke-linejoin="miter"`) using slash-free octagonal `0` glyphs.

---

## 2. Clearspace Rules (`X`-Height System)

Define **`X`** as the structural unit of each asset:

| Asset Type | Definition of `X` | Minimum Clearspace (All 4 Sides) |
| :--- | :--- | :--- |
| **Wordmarks** (`monolith-wordmark-*`) | `X` = stroke thickness (`6` units = `0.125H`) | **`4X`** (`24` units / `0.5 × Cap Height`) |
| **Nav Lockups** (`nav-lockup*`) | `X` = vertical mark height (`H`) | **`0.5H`** horizontally, **`0.25H`** vertically (`15` units symmetric divider spacing) |
| **Monograms** (`monolith-monogram-*`) | `X` = width of one concrete pier (`12` units on `64×64`) | **`1.5X`** (`18` units / `~28%` of mark width) |
| **Stacked Lockups** (`monolith-stacked-*`) | `X` = wordmark cap height (`48` units) | **`0.5X`** (`24` units) beyond outer rule ticks |
| **Footer Lockups** (`footer-lockup*`) | `X` = top/bottom margin inset | Full-bleed container width minus **`1X`** grid gutter |

No UI element, photograph, border, or body copy may enter the protected clearspace zone.

---

## 3. Minimum Pixel Sizes & Safe Zones

| Asset | Minimum Width / Height | Safe-Zone / Legibility Notes |
| :--- | :--- | :--- |
| `favicon-16.svg` | `16 × 16 px` | Native pixel-grid-aligned (`3px` piers, `3px` keystone, `R = 7.5`) |
| `favicon-32.svg` | `32 × 32 px` | Exact `2×` integer multiple of `16px` grid |
| `favicon-48.svg` | `48 × 48 px` | Exact `3×` integer multiple of `16px` grid |
| `favicon.svg` | `16 × 16 px` (scalable) | Primary adaptive/hi-DPI SVG favicon (`64 × 64` viewBox) |
| `monolith-monogram-*.svg` | `24 × 24 px` | Below `24px`, switch to `favicon-16.svg` |
| `nav-lockup*.svg` | `24 px` height (target `24–28 px`) | `2.5`-unit divider renders `>= 1px` (`1.09px` at `28px` height) with `15`-unit symmetric gaps |
| `monolith-wordmark-*.svg` | `120 px` width (`~29 px` height) | Minimum legibility threshold for `6`-unit stroke |
| `monolith-stacked-*.svg` | **`240 px` width** (`201 px` height) | Keeps `11`-unit native DMS coordinate glyphs `>= 8.25px` rendered height |
| `loader-mark*.svg` | `80 × 94 px` (native `120 × 140`) | Stepped architectural reveal mark |
| `apple-touch-icon.svg` | `180 × 180 px` | `2×` mark (`42..138 × 38..142`) & plumb ticks strictly inside `x/y: 30..150` (squircle-safe) |
| `maskable-icon.svg` | `192 × 192 px` / `512 × 512 px` | All artwork (`160..352 × 152..360`) strictly within `r = 141.5px <= 170px` (`< 80%` `r = 204.8px` safe circle) |
| `social-avatar.svg` | `400 × 400 px` (native `512 × 512`) | Inset frame (`r = 172.5px`) and mark (`r = 141.5px`) fit inside `r <= 180px` circular crop |
| `footer-lockup*.svg` | **`880 px` width** (`224 px` height) | Keeps `13.5`-unit colophon metadata `>= 9.58px` rendered height; below `880px`, use `monolith-wordmark-*.svg` |
| `og-image.svg` | `1200 × 630 px` | Subtitles/captions `>= 22px` native (legible at `500px` preview width); export `PNG` for social cards |

---

## 4. Color System, Hairline Semantics & Approved Pairings

### 4.1 Immutable Concrete Palette & Signal Vermilion (`tokens-color.css`)
- **Void Concrete (`--concrete-950`):** `#131313`
- **Basalt (`--concrete-800`):** `#282828`
- **Weathered Grey (`--concrete-500`):** `#77746C`
- **Limestone (`--concrete-300`):** `#B9B5AA`
- **Raw Plaster (`--concrete-100`):** `#E9E5DF`
- **Signal Vermilion (rationed `<= 2%` viewport area):**
  - Dark surface (`#131313` / `#282828`): **`#F45D4D`** (`--signal-vermilion-400`, `5.77:1` on `#131313`, `4.58:1` on `#282828`)
  - Light surface (`#E9E5DF`): **`#A81F17`** (`--signal-vermilion-600`, `5.83:1` on `#E9E5DF`)
  - Limestone surface (`#B9B5AA`): **`#8B1912`** (`--signal-vermilion-700`, `4.57:1` on `#B9B5AA`)

### 4.2 Functional vs. Decorative Hairlines
- **Functional Structural Hairlines (`#77746C` Weathered Grey):** Used for UI dividers, navigation rules, and structural grid boundaries that must meet **WCAG 1.4.11 (`>= 3.0:1`)** non-text contrast (`3.98:1` on `#131313`, `3.72:1` on `#E9E5DF`, `3.16:1` on `#282828`). Never use `#77746C` on `#B9B5AA` (`2.28:1`).
- **Decorative Framing Hairlines (`aria-hidden="true"`):** Low-opacity `#E9E5DF` / `#131313` drafting ticks, blueprint sub-guides, and registration corners are strictly non-functional ornament marked `aria-hidden="true"` inside SVG groups so assistive technology and contrast audits distinguish them from functional UI boundaries.

### 4.3 Approved Pairings
1. **Dark Ground (`#131313` Void Concrete / `#282828` Basalt):** `#E9E5DF` Raw Plaster primary ink (**`14.81:1`** on `#131313`, `11.75:1` on `#282828`), `#B9B5AA` Limestone secondary metadata (`9.07:1` on `#131313`), `#77746C` Weathered Grey functional hairlines, optional `<= 2%` `#F45D4D` Signal Vermilion telemetry cue.
   - Assets: `*-dark.svg`, `nav-lockup.svg`, `footer-lockup.svg`, `loader-mark.svg`, `favicon*.svg`, `apple-touch-icon.svg`, `maskable-icon.svg`, `social-avatar.svg`, `og-image.svg`.
2. **Light Ground (`#E9E5DF` Raw Plaster / `#B9B5AA` Limestone):** `#131313` Void Concrete primary ink (**`14.81:1`** on `#E9E5DF`, `9.07:1` on `#B9B5AA`), `#77746C` Weathered Grey functional hairlines (remapped to `#282828` Basalt when placed on `#B9B5AA`), optional `<= 2%` `#A81F17` Signal Vermilion (`#8B1912` on `#B9B5AA`).
   - Assets: `monolith-wordmark-light.svg`, `monolith-stacked-light.svg`, `monolith-monogram-light.svg`, `nav-lockup-light.svg`, `footer-lockup-light.svg`, `loader-mark-light.svg`.
3. **Inline CSS `currentColor` Mode:**
   - Assets: `monolith-wordmark-mono.svg`, `monolith-monogram-mono.svg`, `nav-lockup-mono.svg`, `footer-lockup-mono.svg`, `loader-mark-mono.svg`.
   - Embed inline in HTML/JSX where parent `color` controls ink dynamically (must maintain `>= 7:1` WCAG AAA contrast against its surface).

---

## 5. Explicit "Do Not" Rules

- **DO NOT** replace or recreate `MONOLITH` using system, web, or fallback `<text>` fonts inside SVG assets.
- **DO NOT** apply drop shadows, outer glows, Gaussian blurs, bevel/emboss filters, or soft color gradients to any mark.
- **DO NOT** add sci-fi/HUD tropes (concentric radar rings, dashed orbital reticles, or diagonal slashes inside `0` glyphs).
- **DO NOT** exceed `2%` Signal Vermilion (`#F45D4D` / `#A81F17`) area on any lockup or social plate.
- **DO NOT** round the outer `90°` Brutalist corners of the `M` slab, the wordmark terminals, or `apple-touch-icon.svg` (let OS masks clip icons naturally).
- **DO NOT** stretch, skew, rotate, or alter the `5:1` wordmark aspect ratio or the `18–24–30` lancet curvature.
- **DO NOT** place `*-dark.svg` / dark-default (`#E9E5DF`) assets on `#E9E5DF` / `#B9B5AA` surfaces or `*-light.svg` (`#131313`) on `#131313` / `#282828` surfaces.
- **DO NOT** embed `currentColor` monochrome assets (`*-mono.svg`) via `<img>` tags on dark backgrounds (browsers resolve external `<img>` `currentColor` to `#000000`). Inline the SVG or use the dark/light asset.
- **DO NOT** place `#77746C` Weathered Grey functional hairlines on `#B9B5AA` Limestone (`2.28:1`), or shrink `monolith-stacked-*.svg` below `240px` / `footer-lockup*.svg` below `880px`.

---

## 6. SVG Technical & File Inventory

- **Integer ViewBoxes & `evenodd` Winding:** Every asset uses integer `viewBox` dimensions; compound `O` counters use opposing outer/inner paths with `fill-rule="evenodd"`.
- **Stepped Loader Animation (`loader-mark*.svg`):** Exposes 4 semantic groups (`#frame-outer`, `#axis-plumb`, `#lancet-arch`, `#monolith-mass`) for sequential CSS/WAAPI reveals.
- **Complete Brand SVG Inventory (25 SVGs + Documentation):**
  - Wordmarks: `brand/monolith-wordmark-dark.svg`, `brand/monolith-wordmark-light.svg`, `brand/monolith-wordmark-mono.svg`
  - Stacked Lockups: `brand/monolith-stacked-dark.svg`, `brand/monolith-stacked-light.svg`
  - Monograms: `brand/monolith-monogram-dark.svg`, `brand/monolith-monogram-light.svg`, `brand/monolith-monogram-mono.svg`
  - Favicons: `brand/favicon-16.svg`, `brand/favicon-32.svg`, `brand/favicon-48.svg`, `brand/favicon.svg`
  - Platform Icons: `brand/apple-touch-icon.svg`, `brand/maskable-icon.svg`
  - Navigation Lockups: `brand/nav-lockup.svg`, `brand/nav-lockup-light.svg`, `brand/nav-lockup-mono.svg`
  - Footer Lockups: `brand/footer-lockup.svg`, `brand/footer-lockup-light.svg`, `brand/footer-lockup-mono.svg`
  - Loader Marks: `brand/loader-mark.svg`, `brand/loader-mark-light.svg`, `brand/loader-mark-mono.svg`
  - Social & OG: `brand/social-avatar.svg`, `brand/og-image.svg`
  - Specification: `brand/LOGO_GUIDELINES.md`
