# MONOLITH — Monumental, Brutalist & Gothic Architecture Archive

An editorial museum monograph and measured architectural catalog examining **27 load-bearing structures** across **Brutalist**, **Gothic**, and **Monumental** traditions worldwide (`126 CE–PRESENT`).

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript) + React 19
- **Motion:** `motion/react` with stepped architectural curtain reveals, hairline rule drawing, scroll-driven backdrop parallax, and full `prefers-reduced-motion` support
- **Styling:** Centralized CSS custom property design tokens (`brand/tokens-color.css` + `src/app/globals.css`) and strict CSS Modules (`0px` border radius, zero box-shadows, exposed `12/8/4` column hairline grid)
- **Typography:** `Bodoni Moda` (editorial display serif), `Inter` (functional UI sans), `IBM Plex Mono` (tabular colophon and WGS84 coordinates)

## Setup & Commands

```bash
# Install dependencies
npm install

# Run local development server (http://localhost:3000)
npm run dev

# Static checks
npm run typecheck
npm run lint

# Build and start production server
npm run build
npm run start
```

## Project Architecture

```text
neo-brutal/
├── brand/                    # Source color tokens, 25 SVG marks/lockups, BRAND.md, LOGO_GUIDELINES.md, COLOR_SYSTEM.md
├── public/
│   ├── brand/                # Web-served SVG lockups & favicons synced from /brand
│   ├── images/buildings/     # 27 local high-res Wikimedia Commons specimen photographs
│   └── images/anatomy/       # 9 original multi-layer orthographic SVG drafting plates
├── src/
│   ├── app/
│   │   ├── page.tsx          # 01 HOME — Full-bleed poster exhibition, thesis & specimen stream
│   │   ├── archive/          # 02 ARCHIVE — Filterable Plate grid & 8-column Index table
│   │   ├── structures/[slug] # 03 STRUCTURE DETAIL — 27 static monograph folios
│   │   └── anatomy/          # 04 ANATOMY — Interactive vector plate & layer inspector
│   ├── components/           # Header, <dialog> drawer, Footer, MotionPrimitives, DraftingMarks
│   ├── data/                 # buildings.ts (27 records) & anatomyPlates.ts (9 vector records)
│   └── lib/                  # archiveFilters.ts, motion.ts, plateGeometry.ts
├── SITE_COPY.md              # Interface copy specification
├── SITE_LAYOUT.md            # Grid, motion & responsive recomposition specification
├── SITE_VISUAL.md            # Monochrome, grain, halftone & arch clip-path specification
├── CREDITS.md                # Full Wikimedia Commons attribution & license register
└── REVIEW_LOG.md             # Evaluation Office independent scoring rounds & improvements
```

## Photographic & Vector Attribution

All 27 photographic specimen plates originate from Wikimedia Commons under open archival licenses (`CC0` / `Public Domain` / `CC-BY` / `CC-BY-SA`), stored locally in `public/images/buildings/` and itemized by author, URL, and license in [`CREDITS.md`](./CREDITS.md). The 9 orthographic drawings in `public/images/anatomy/` are original layered SVGs (`MONOLITH Editorial Archive`).

## Private Working Folder Note

The `ref/` inspiration board directory is excluded from version control via `.gitignore` and is not pushed to GitHub.

## Design System

MONOLITH maintains a living, single-source-of-truth Design System at `/design-system` (isolated in the `(bare)` route group without site header/footer chrome, marked `noindex, nofollow` via both page metadata and `X-Robots-Tag` HTTP headers, and unlinked from public navigation).

### How It Stays Up-to-Date
- **Tokens (`src/design-system/tokens.ts`):** Reads `brand/tokens-color.css` and `src/app/globals.css` directly from disk at build/request time, extracting all primitive tones, 4 surface-island semantic maps (`void`, `basalt`, `plaster`, `limestone`), typography roles, and layout metrics.
- **Registry (`src/design-system/registry.ts`):** Typed inventory (`COMPONENT_REGISTRY`) mapping every component under `src/components/` (`sourcePath`, `states`, `tokens`, `props`, `usageNote`, `a11yNote`, `doExample`, `dontExample`).
- **Live Components:** Section 03 imports and renders the real React components from `src/components/` rather than static duplicates.

### Adding a New Component & Running Checks
1. Add your component under `src/components/`.
2. Register an entry in `src/design-system/registry.ts` inside `COMPONENT_REGISTRY` with its relative `sourcePath`, TypeScript `props`, consumed CSS `tokens`, and usage/a11y notes, then wire its live specimen in `src/components/design-system/ComponentsSection.tsx`.
3. Run the verification scripts:

```bash
# Verify 100% component & CSS token coverage and zero public links to /design-system
npm run ds:check

# Refresh page template preview thumbnails in public/design-system/templates/
npm run ds:shots
```
