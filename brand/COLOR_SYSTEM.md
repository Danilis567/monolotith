# MONOLITH — Color System & Accessibility Specification

> **Source of Truth:** [tokens-color.css](file:///C:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/brand/tokens-color.css)  
> **Verification Standard:** WCAG 2.1 Relative Luminance (`L`) & Contrast Ratio (`(L1 + 0.05) / (L2 + 0.05)`), programmatically verified via Node.js.

---

## 1. Visual Audit & Signal Accent Justification

Inspection of all **14** reference boards in `ref/` establishes two clear architectural laws for MONOLITH:

1. **Monochrome Mineral Concrete Discipline (11 monochrome/tonal boards + 1 single-spot print board):**  
   - **Dark-ground monochrome & stone architectural boards (8):** `0dab4c077b6ab5d9d67a75f911d986ff.jpg` (Gothic vaulting), `135d5a8db69f2a1c011dab3c024a5694.jpg` (*Astor Mansions*), `1615b1e82d9ec1985e293aaad8cf70ff.jpg` (*Fallen Angel*), `7ed9e87d3c2d61e0481fa3306ecb0c6a.jpg` (*BRUTALISM*), `af5d4910c380dbc8bc0925f405f4d5de.jpg` (dithered engraving), `c5eb814ab3b11a46ee4eb2146116b999.jpg` (*Martha lives*), `db816a1cefd19db941e51881528070bd.jpg` (CRT terminal figure), `e290eb14d02fed3e7209b5e469abb0bd.jpg` (*DECONDOR*), plus `preview (2).webp` (*TAKUMI — "ARCHITECTURE AS MEDITATION"*). Together these 9 dark-ground boards anchor MONOLITH's **Dark-First Editorial Baseline** (`#131313` Void Concrete canvas, `#282828` Basalt panels, `#77746C` hairline rules, `#B9B5AA` secondary copy, `#E9E5DF` Raw Plaster display ink).
   - **Light/editorial stone-ground boards (2):** `45e4f8147b81c3e0bb8a8549802e6ace.jpg` (*Support Your Local City — Saint Petersburg*, limestone/plaster paper ground with black halftone capital) and `preview (3).webp` (*Residential Brutalism*, concrete architecture with `#E9E5DF` condensed display type).
   - **Single-spot-color dark poster (1):** `5fc0fcecca24eed8b7c4b704e08b459a.jpg` (*Gothic Art / GOTHICA* blackletter poster with hairline grid boxes, stipple halftones, and a single chromatic violet ink layer on black ground — confirming the dark-ground + single-accent structural grammar, while shifting MONOLITH's accent hue to architectural vermilion).
2. **Justification for a Single, Strictly Rationed Signal Vermilion (2 web UI boards):**  
   - **`preview (1).webp` (*OBSIDIAN — "WE SHAPE WHAT ENDURES"*)**: A surgical vermilion-crimson red is used across `< 2%` of the viewport exclusively for high-telemetry markers: the active navigation link (`INDEX`), the live menu indicator dot (`MENU`), micro-overline labels (`RESEARCH INITIATIVE`, `CURRENT STUDY`), directional arrow glyphs (`↗`, `↙`), and a subtle atmospheric core glow inside the brutalist concrete wedge.
   - **`preview.webp` (*BRUTALISM / REGISTRATION*)**: Signal red is the sole chromatic exception on a stark black-and-white mixed-polarity brutalist web UI—deployed strictly on the invalid email input state (`Zinna@гмайл.com`) as border + error glyph.

**Verdict:** **ADD** a single **Signal Vermilion** family, strictly rationed to **`<= 2%` of viewport area** and forbidden from decorative paragraphs, large background fills, or multi-hue palettes.

### Why a Raw `#C8281E` / `#D12D24` Token Alone Fails WCAG AA

Programmatic WCAG 2.1 testing proves that raw OBSIDIAN-style crimson (`#C8281E`, `L = 0.13891`) cannot pass normal text contrast (`>= 4.5:1`) on *any* MONOLITH surface:
- `#C8281E` on `#131313` = **3.34:1** (passes large text / UI `>= 3.0:1`, **FAILS** 4.5:1 normal text).
- `#C8281E` on `#282828` = **2.65:1** (**FAILS** even 3.0:1 non-text UI contrast).
- `#C8281E` on `#E9E5DF` = **4.43:1** (**FAILS** 4.5:1 normal text by `0.07`).
- `#D12D24` on `#131313` = **3.64:1**, on `#282828` = **2.89:1**, on `#E9E5DF` = **4.07:1**.

**Engineering Solution:** Keep `#C8281E` (`--signal-vermilion-500`) strictly for non-essential atmospheric/decorative glows (`--signal-glow`) and large (`>= 24px` / `>= 18.66px bold`) or non-text graphics on `#131313` only, while semantic interactive tokens (`--signal-ink`, `--signal-fill`, `--signal-border`) resolve to an **adaptive luminance-calibrated Vermilion pair** in the exact same hue (`3°–6°`):
- **Dark Surfaces (`#131313`, `#282828`):** `--signal-vermilion-400` (`#F45D4D`) — **5.77:1** on `#131313` and **4.58:1** on `#282828` (AA Normal Pass on both).
- **Light Canvas (`#E9E5DF`):** `--signal-vermilion-600` (`#A81F17`) — **5.83:1** on `#E9E5DF` (AA Normal Pass).
- **Limestone Surface (`#B9B5AA`):** `--signal-vermilion-700` (`#8B1912`) — **4.57:1** on `#B9B5AA` (AA Normal Pass).

---

## 2. Tier 1 Palette & Relative Luminance

| Token | Name | Hex | Relative Luminance (`L`) | Role |
| :--- | :--- | :--- | :--- | :--- |
| `--concrete-950` | Void Concrete | `#131313` | `0.006512` | Dark primary canvas; light primary ink & structural frames |
| `--concrete-800` | Basalt | `#282828` | `0.021219` | Dark elevated cards/panels; light secondary ink |
| `--concrete-500` | Weathered Grey | `#77746C` | `0.174954` | Structural hairlines (`>= 3:1`) & large muted display (`>= 24px`) ONLY |
| `--concrete-300` | Limestone | `#B9B5AA` | `0.462643` | Light elevated/band surface; dark secondary/body ink |
| `--concrete-100` | Raw Plaster | `#E9E5DF` | `0.786900` | Light primary canvas; dark primary ink & structural frames |
| `--signal-vermilion-700` | Deep Vermilion | `#8B1912` | `0.06228` | Signal ink & border inside `[data-surface="limestone"]` |
| `--signal-vermilion-600` | Signal Crimson | `#A81F17` | `0.09367` | Light-mode signal ink, fill, border |
| `--signal-vermilion-500` | Raw Vermilion | `#C8281E` | `0.13891` | Decorative/atmospheric glow & large-only (`>= 24px`) on `#131313` |
| `--signal-vermilion-400` | Molten Vermilion | `#F45D4D` | `0.27598` | Dark-mode signal ink, fill, border |

---

## 3. Exact WCAG 2.1 Contrast Verification Matrix

Every ratio below was computed directly from the sRGB relative luminance formula (`wcag-full-table.mjs` / `wcag-candidates.mjs`).

### 3.1 Dark Mode Surfaces (`#131313` Void Concrete & `#282828` Basalt)

| Foreground | Background | Ratio | AA Normal (`4.5:1`) | AA Large / UI (`3.0:1`) | AAA (`7.0:1`) | Permitted Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `#E9E5DF` (Raw Plaster) | `#131313` (Void Concrete) | **14.81:1** | PASS | PASS | PASS | `--ink-primary`, `--border-structural` |
| `#B9B5AA` (Limestone) | `#131313` (Void Concrete) | **9.07:1** | PASS | PASS | PASS | `--ink-secondary` (body, captions, metadata) |
| `#F45D4D` (Vermilion 400) | `#131313` (Void Concrete) | **5.77:1** | PASS | PASS | FAIL | `--signal-ink`, `--signal-border`, focus/active icons |
| `#77746C` (Weathered Grey) | `#131313` (Void Concrete) | **3.98:1** | **FAIL** | PASS | FAIL | `--ink-muted-large` (`>= 24px` or `>= 18.66px bold`), `--border-hairline` |
| `#C8281E` (Vermilion 500) | `#131313` (Void Concrete) | **3.34:1** | **FAIL** | PASS | FAIL | Decorative glow (`--signal-glow`) & large display (`>= 24px`) ONLY |
| `#E9E5DF` (Raw Plaster) | `#282828` (Basalt) | **11.75:1** | PASS | PASS | PASS | `--ink-primary` on elevated card |
| `#B9B5AA` (Limestone) | `#282828` (Basalt) | **7.20:1** | PASS | PASS | PASS | `--ink-secondary`, `--border-on-elevated` |
| `#F45D4D` (Vermilion 400) | `#282828` (Basalt) | **4.58:1** | PASS | PASS | FAIL | `--signal-ink`, `--signal-border` on Basalt cards |
| `#77746C` (Weathered Grey) | `#282828` (Basalt) | **3.16:1** | **FAIL** | PASS | FAIL | `--ink-muted-large` (`>= 24px` or `>= 18.66px bold`), `--border-hairline` |
| `#C8281E` (Vermilion 500) | `#282828` (Basalt) | **2.65:1** | **FAIL** | **FAIL** | FAIL | **PROHIBITED** on `#282828` |
| `#282828` (Basalt) | `#131313` (Void Concrete) | **1.26:1** | **FAIL** | **FAIL** | FAIL | Adjacent surface elevation step ONLY (never text/icons) |

### 3.2 Light Mode Surfaces (`#E9E5DF` Raw Plaster & `#B9B5AA` Limestone)

| Foreground | Background | Ratio | AA Normal (`4.5:1`) | AA Large / UI (`3.0:1`) | AAA (`7.0:1`) | Permitted Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `#131313` (Void Concrete) | `#E9E5DF` (Raw Plaster) | **14.81:1** | PASS | PASS | PASS | `--ink-primary`, `--border-structural` |
| `#282828` (Basalt) | `#E9E5DF` (Raw Plaster) | **11.75:1** | PASS | PASS | PASS | `--ink-secondary` (body, captions, metadata) |
| `#A81F17` (Vermilion 600) | `#E9E5DF` (Raw Plaster) | **5.83:1** | PASS | PASS | FAIL | `--signal-ink`, `--signal-border` |
| `#C8281E` (Vermilion 500) | `#E9E5DF` (Raw Plaster) | **4.43:1** | **FAIL** | PASS | FAIL | Large display / UI icons ONLY (never small text) |
| `#77746C` (Weathered Grey) | `#E9E5DF` (Raw Plaster) | **3.72:1** | **FAIL** | PASS | FAIL | `--ink-muted-large` (`>= 24px` or `>= 18.66px bold`), `--border-hairline` |
| `#131313` (Void Concrete) | `#B9B5AA` (Limestone) | **9.07:1** | PASS | PASS | PASS | `--ink-primary`, `--border-structural` on Limestone |
| `#282828` (Basalt) | `#B9B5AA` (Limestone) | **7.20:1** | PASS | PASS | PASS | `--ink-secondary`, `--border-hairline` inside `[data-surface="limestone"]` |
| `#8B1912` (Vermilion 700) | `#B9B5AA` (Limestone) | **4.57:1** | PASS | PASS | FAIL | `--signal-ink`, `--signal-border` inside `[data-surface="limestone"]` |
| `#A81F17` (Vermilion 600) | `#B9B5AA` (Limestone) | **3.57:1** | **FAIL** | PASS | FAIL | Filled badge boundary (`--signal-fill`) / large icons on Limestone ONLY |
| `#77746C` (Weathered Grey) | `#B9B5AA` (Limestone) | **2.28:1** | **FAIL** | **FAIL** | FAIL | **PROHIBITED** on `#B9B5AA` (text, borders, or icons) |
| `#B9B5AA` (Limestone) | `#E9E5DF` (Raw Plaster) | **1.63:1** | **FAIL** | **FAIL** | FAIL | Adjacent surface elevation step ONLY (never text/icons) |

### 3.3 Signal Fill Badges & Solid CTAs

| Foreground (`--signal-on-fill`) | Background (`--signal-fill`) | Ratio | AA Normal (`4.5:1`) | AA Large / UI (`3.0:1`) | Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `#131313` (Void Concrete) | `#F45D4D` (Vermilion 400) | **5.77:1** | PASS | PASS | Dark mode filled signal badge / CTA |
| `#E9E5DF` (Raw Plaster) | `#A81F17` (Vermilion 600) | **5.83:1** | PASS | PASS | Light mode filled signal badge / CTA (also 3.57:1 boundary on `#B9B5AA`) |

---

## 4. Usage Ratios & Surface Architecture Rules

### 4.1 Viewport Color Budget (Strict 60–30–10 Adapted for Brutalism)

- **Dark-First Editorial / Architectural Mode (Default aesthetic per `preview (1).webp` & `preview (2).webp`):**
  - **65%–75% Primary Void Canvas (`#131313`):** Negative space, full-bleed grids, hero backing.
  - **15%–20% Secondary Basalt & Photography (`#282828` + desaturated grayscale media):** Elevated panels, structural blocks, image frames.
  - **10%–15% Structural Ink & Hairlines (`#E9E5DF`, `#B9B5AA`, `#77746C`):** Brutalist display type, body copy, 1px hairline grids.
  - **`<= 2%` Signal Vermilion (`#F45D4D` / `#C8281E` glow):** Active nav marker, live dot, validation errors, surgical CTA arrows.
- **Light-First Editorial / Specimen Mode (Per `45e4f814...jpg` & `preview.webp`):**
  - **65%–75% Primary Plaster Canvas (`#E9E5DF`):** Sheet ground, negative space, form fields.
  - **15%–20% Secondary Limestone & Halftone Media (`#B9B5AA` + monochrome prints):** Stepped bands, callout blocks, footer plates.
  - **10%–15% Structural Ink & Hard Frames (`#131313`, `#282828`, `#77746C`):** Sharp 1–2px black borders, display typography, metadata.
  - **`<= 2%` Signal Vermilion (`#A81F17` / `#8B1912` on Limestone):** Error states, active route markers, index dots.

### 4.2 Surface Pairing & Component Island Rules

1. **Never place `#131313` text on `#282828` (1.26:1) or `#E9E5DF` text on `#B9B5AA` (1.63:1).**
2. **Boundary Definition Between Same-Polarity Surfaces:** Because `#131313` vs `#282828` (1.26:1) and `#E9E5DF` vs `#B9B5AA` (1.63:1) do not meet 3:1 edge contrast on their own, interactive cards or panels using `--surface-elevated` MUST include a `1px` structural border (`--border-hairline` or `--border-structural`) when their boundary conveys interactivity or grouping.
3. **Weathered Grey (`#77746C`) Containment Rule:**
   - Permitted **only** for `1px` dividers/hairline borders (`--border-hairline`) and large non-critical display typography (`>= 24px` regular or `>= 18.66px` bold) on `#131313`, `#282828`, or `#E9E5DF`.
   - **Strictly forbidden** for body text, micro-labels (`11px–16px`), or anything inside `[data-surface="limestone"]` (`#B9B5AA`). Use `--ink-secondary` (`#B9B5AA` on dark / `#282828` on light) for all small readable metadata.
4. **Dark-First Baseline & Component Surface Islands (`[data-surface]`):**
   - `:root` defaults unequivocally to the **Dark-First Editorial Baseline** (`color-scheme: dark`, Void Concrete `#131313` canvas, Raw Plaster `#E9E5DF` primary ink) so initial SSR rendering never flashes or mismatches OS light/dark settings. Light editorial plates opt in via `:root[data-theme="light"]` or component-level `[data-surface="plaster" | "limestone" | "light"]`, with `@supports (color: light-dark(white, black))` cleanly scoped on `:root`.
   - Mixed light/dark brutalist blocks (as in `preview.webp`) must use `[data-surface="void" | "basalt" | "dark" | "plaster" | "limestone" | "light"]`.
   - Every `[data-surface]` island explicitly re-declares **all 23 Tier 2 semantic tokens**—including `--surface-sunken`, `--surface-inverse`, `--surface-scrim`, `--ink-inverse`, `--selection-bg`, `--selection-ink`, `--scrollbar-track`, and `--scrollbar-thumb`—so nested islands of opposite polarity never inherit inverted tokens from `:root`.
   - Never apply `color-scheme` without an explicit `background-color`, and always re-declare `color`, `accent-color`, `caret-color`, and `scrollbar-color` on the island root so `light-dark()` tokens re-evaluate instead of inheriting the parent's resolved color.
   - Never register `--surface-*` or `--ink-*` tokens via `@property { syntax: "<color>"; }`, which would freeze `light-dark()` resolution at `:root`.

---

## 5. Signal Color Rationing & Non-Color State Rules

1. **Allowed Signal Uses (Max 2–3 points of focus per viewport):**
   - Active navigation state / current index indicator (paired with bold weight, underline, or bullet glyph).
   - Live status dot (paired with text label e.g. `LIVE` / `MENU`).
   - Form validation errors & destructive confirmations (paired with explicit error text + icon per WCAG 1.4.1 — **never** red border alone).
   - Architectural core glow (`--signal-glow: #C8281E`) strictly behind photography/artwork with zero text contrast dependency.
2. **Prohibited Signal Uses:**
   - Full-bleed section backgrounds or hero blocks.
   - Long-form paragraphs or multi-sentence callouts.
   - Secondary/disabled badges or decorative multi-color tags.

---

## 6. High Contrast & Forced Colors Mode (`forced-colors: active`)

In Windows High Contrast / Forced Colors Mode, author hexes and `box-shadow` / `radial-gradient` glows are stripped by the UA:
- All surfaces collapse to `Canvas`; all primary, secondary, and muted text tokens map to `CanvasText` (never `GrayText` for readable metadata).
- `--signal-ink` maps to `LinkText` (safe foreground contrast on `Canvas`), while `--signal-fill` / `--signal-on-fill` map to `Highlight` / `HighlightText`.
- `--signal-glow` resolves to `transparent`.
- Component islands (`[data-surface="basalt" | "limestone" | "void" | "plaster"]`) receive `outline: 1px solid CanvasText; outline-offset: -1px;` so surface separations remain visible without relying on background luminance differences.
- `forced-color-adjust: none` is **prohibited** across UI tokens.
