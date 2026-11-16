export type ComponentCategory =
  | 'Navigation & Chrome'
  | 'Drafting & Marks'
  | 'Editorial & Typography'
  | 'Interactive Plates & Stage'
  | 'Motion & Utilities'
  | 'Page Views';

export interface ComponentPropSpec {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DesignSystemComponentEntry {
  id: string;
  name: string;
  category: ComponentCategory;
  sourcePath: string;
  description: string;
  states: string[];
  tokens: string[];
  props: ComponentPropSpec[];
  usageNote: string;
  a11yNote: string;
  doExample: string;
  dontExample: string;
}

export const COMPONENT_REGISTRY: DesignSystemComponentEntry[] = [
  {
    id: 'site-header',
    name: 'SiteHeader',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteHeader.tsx',
    description:
      'Sticky monolithic top bar displaying the MONOLITH wordmark lockup, indexed plate telemetry, primary route links, and a native <dialog> mobile drawer.',
    states: ['default', 'active-route', 'focus-visible', 'mobile-drawer-open'],
    tokens: [
      '--header-height',
      '--surface-canvas',
      '--ink-primary',
      '--ink-muted',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'plateCount',
        type: 'number',
        required: true,
        description: 'Total cataloged structures displayed in the header telemetry badge.',
      },
    ],
    usageNote:
      'Mounted exclusively inside the (site) route group layout. Never render inside (bare) routes.',
    a11yNote:
      'Uses nav landmark with aria-label, aria-current="page" on active routes, and native <dialog>.showModal() for focus-trapped mobile navigation.',
    doExample: '<SiteHeader plateCount={BUILDINGS.length} />',
    dontExample: 'Do not inject secondary search inputs or dropdown menus into the top bar.',
  },
  {
    id: 'site-footer',
    name: 'SiteFooter',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteFooter.tsx',
    description:
      'Four-column brutalist colophon and index footer with stacked brand mark, archive coordinates, movement links, and archival return-to-top control.',
    states: ['default', 'hover', 'focus-visible'],
    tokens: [
      '--surface-canvas',
      '--ink-primary',
      '--ink-secondary',
      '--border-structural',
      '--border-hairline',
    ],
    props: [],
    usageNote: 'Mounted at the bottom of the (site) layout below <main id="main-content">.',
    a11yNote:
      'Uses semantic <footer> landmark with structured <nav aria-label="Footer navigation"> lists and 44px minimum link targets.',
    doExample: '<SiteFooter />',
    dontExample: 'Do not omit the colophon datum or alter the 1px structural top rule.',
  },
  {
    id: 'drafting-marks',
    name: 'DraftingMarks (CornerCrosshair, AlignmentStar, SteppedFrame, ScaleRuler)',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/DraftingMarks.tsx',
    description:
      'Precision architectural registration primitives: corner crosshairs, 4-point alignment stars, stepped brutalist frames, and metric elevation rulers.',
    states: ['default', 'forced-colors'],
    tokens: ['--border-structural', '--border-hairline', '--ink-muted', '--signal-ink'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Optional CSS class override for positioning or sizing.',
      },
    ],
    usageNote:
      'Use CornerCrosshair and SteppedFrame to anchor photographic plates and orthographic stages to the 12-column grid.',
    a11yNote:
      'Purely decorative SVG marks carry aria-hidden="true" so screen readers skip registration ticks.',
    doExample: '<SteppedFrame><Plate /></SteppedFrame>',
    dontExample: 'Do not use CornerCrosshair inside dense inline prose.',
  },
  {
    id: 'arch-clip-defs',
    name: 'ArchClipDefs',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/ArchClipDefs.tsx',
    description:
      'Global hidden SVG <defs> provider defining objectBoundingBox clipPaths (#monolith-lancet-3x4, #monolith-lancet-2x3, #monolith-romanesque-3x4) for architectural plate apertures.',
    states: ['mounted-once'],
    tokens: ['--surface-basalt'],
    props: [],
    usageNote:
      'Rendered once in RootLayout so any .plate-arch-* element across the app can reference clip-path: url(#monolith-*).',
    a11yNote:
      'Zero-dimension SVG with aria-hidden="true" and focusable="false" to remain invisible to assistive tech.',
    doExample: '<ArchClipDefs /> in RootLayout <body>',
    dontExample: 'Do not duplicate <ArchClipDefs /> inside individual page components.',
  },
  {
    id: 'gloss',
    name: 'Gloss',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/Gloss.tsx',
    description:
      'Inline architectural terminology gloss trigger that reveals concise technical definitions on hover, focus, or click without leaving the monograph.',
    states: ['default', 'hover', 'focus-visible', 'open'],
    tokens: ['--ink-primary', '--surface-elevated', '--border-structural', '--signal-ink'],
    props: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: 'Glossary key matching an entry in src/data/glossary.ts.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Optional inline display text overriding the canonical term label.',
      },
    ],
    usageNote:
      'Use sparingly in editorial copy to clarify structural terms (e.g., béton brut, flying buttress, coffered dome).',
    a11yNote:
      'Implemented as an interactive button with aria-expanded and Escape-key dismissal.',
    doExample: '<Gloss term="beton-brut">béton brut</Gloss>',
    dontExample: 'Do not wrap entire sentences or headings inside <Gloss>.',
  },
  {
    id: 'reading-guide',
    name: 'ReadingGuide',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/ReadingGuide.tsx',
    description:
      'Expandable three-line archivist reading guide (closed by default) decoding CAT. NO., ELEV./HEIGHT, and WGS84 coordinates.',
    states: ['collapsed', 'expanded', 'focus-visible'],
    tokens: ['--surface-canvas', '--ink-primary', '--border-structural', '--border-hairline'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Optional positioning class.',
      },
    ],
    usageNote: 'Place below hero survey strip or inside Archive / Anatomy header bands.',
    a11yNote: 'Button carries aria-expanded and aria-controls linked to the 3-line guide region.',
    doExample: '<ReadingGuide />',
    dontExample: 'Do not stack multiple ReadingGuide bars in the same viewport.',
  },
  {
    id: 'specimen-stream',
    name: 'SpecimenStream',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/SpecimenStream.tsx',
    description:
      'Continuous horizontal/editorial specimen strip presenting featured architectural plates with catalog numbers, elevation metrics, and direct detail links.',
    states: ['default', 'hover', 'focus-visible'],
    tokens: [
      '--surface-basalt',
      '--ink-primary',
      '--ink-secondary',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'buildings',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Ordered list of featured BuildingRecord items to stream.',
      },
    ],
    usageNote: 'Used on the Home monograph to preview curated archive plates.',
    a11yNote:
      'Each specimen card uses .plate-interactive-outer for an unclipped 2px focus-visible ring.',
    doExample: '<SpecimenStream buildings={streamBuildings} />',
    dontExample: 'Do not apply overflow: hidden directly on focused anchor wrappers.',
  },
  {
    id: 'anatomy-stage',
    name: 'AnatomyStage',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/AnatomyStage.tsx',
    description:
      'Interactive orthographic vector stage supporting layer toggles (structure, grid, callouts, dimensions), pan/zoom inspection, and keyboard-accessible callout pins.',
    states: ['default', 'zoomed', 'layer-toggled', 'callout-selected', 'focus-visible'],
    tokens: [
      '--surface-canvas',
      '--surface-elevated',
      '--ink-primary',
      '--border-structural',
      '--signal-ink',
    ],
    props: [
      {
        name: 'svgMarkup',
        type: 'string',
        required: true,
        description: 'Sanitized SVG orthographic plate markup loaded on the server.',
      },
      {
        name: 'callouts',
        type: 'AnatomyCallout[]',
        required: true,
        description: 'Numbered structural callout pins with normalized coordinates.',
      },
      {
        name: 'dimensions',
        type: 'AnatomyDimensionRow[]',
        required: true,
        description: 'Measured metric dimension rows.',
      },
      {
        name: 'showStructure',
        type: 'boolean',
        required: true,
        description: 'Toggles visibility of the primary structural vector layer.',
      },
      {
        name: 'showAxis',
        type: 'boolean',
        required: true,
        description: 'Toggles visibility of the vermilion thrust & axis vector layer.',
      },
      {
        name: 'showDimensions',
        type: 'boolean',
        required: true,
        description: 'Toggles visibility of metric dimension lines and callouts.',
      },
      {
        name: 'selectedCalloutCode',
        type: 'string | null',
        required: true,
        description: 'Active structural callout pin code.',
      },
      {
        name: 'selectedDimensionId',
        type: 'string | null',
        required: true,
        description: 'Active dimension line identifier.',
      },
      {
        name: 'onSelectCallout',
        type: '(code: string | null) => void',
        required: true,
        description: 'Callback invoked when a callout pin is selected or cleared.',
      },
      {
        name: 'onSelectDimension',
        type: '(id: string | null) => void',
        required: true,
        description: 'Callback invoked when a dimension line is selected or cleared.',
      },
      {
        name: 'isFullscreen',
        type: 'boolean',
        required: true,
        description: 'Controls expanded fullscreen drafting sheet mode.',
      },
      {
        name: 'onToggleFullscreen',
        type: '() => void',
        required: true,
        description: 'Toggles fullscreen drafting sheet mode.',
      },
      {
        name: 'plateTitle',
        type: 'string',
        required: true,
        description: 'Plate title displayed in the stage toolbar.',
      },
      {
        name: 'plateScale',
        type: 'string',
        required: true,
        description: 'Drawing scale label (e.g., SCALE 1:500).',
      },
    ],
    usageNote:
      'Always pair with AnatomyClient controls so layer state and active callouts stay synchronized.',
    a11yNote:
      'Callout pins are keyboard-focusable buttons with descriptive aria-labels and active state feedback.',
    doExample: '<AnatomyStage svgMarkup={svg} callouts={c} dimensions={d} showStructure={true} />',
    dontExample: 'Do not inject unmeasured raster images into AnatomyStage.',
  },
  {
    id: 'motion-primitives',
    name: 'MotionPrimitives (MotionProvider, PlateCurtain, HairlineDraw, HeroEchoParallax)',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/MotionPrimitives.tsx',
    description:
      'GPU-composited motion wrappers configured with MotionConfig reducedMotion="user" for plate curtain reveals, 1px hairline draws, and subtle hero parallax.',
    states: ['idle', 'in-view', 'reduced-motion'],
    tokens: ['--surface-canvas', '--border-hairline'],
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Content wrapped by the motion primitive.',
      },
    ],
    usageNote:
      'MotionProvider sits in RootLayout; use PlateCurtain and HairlineDraw for architectural entrances.',
    a11yNote:
      'Respects prefers-reduced-motion: reduce via MotionConfig reducedMotion="user" and CSS fallbacks.',
    doExample: '<PlateCurtain><Plate /></PlateCurtain>',
    dontExample: 'Do not animate layout properties (width/height/top/left); transform/opacity only.',
  },
  {
    id: 'url-param-sync',
    name: 'UrlParamSync',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/UrlParamSync.tsx',
    description:
      'Headless client utility that synchronizes archive filter or anatomy plate selection state with URL query parameters without full page reloads.',
    states: ['synced'],
    tokens: [],
    props: [
      {
        name: 'paramKey',
        type: 'string',
        required: true,
        description: 'Query parameter key to read and synchronize.',
      },
      {
        name: 'onRead',
        type: '(value: string | null) => void',
        required: true,
        description: 'Callback receiving the current query parameter value.',
      },
    ],
    usageNote: 'Wrap inside <Suspense> when rendered in App Router client trees.',
    a11yNote: 'Non-visual utility; produces no DOM nodes.',
    doExample: '<Suspense fallback={null}><UrlParamSync ... /></Suspense>',
    dontExample: 'Do not call history.pushState in tight render loops.',
  },
  {
    id: 'home-client',
    name: 'HomeClient',
    category: 'Page Views',
    sourcePath: 'src/components/HomeClient.tsx',
    description:
      'Editorial landing monograph orchestrating the Hero monument, thesis plate, specimen stream, and tri-movement index bands across alternating surface islands.',
    states: ['default', 'reduced-motion'],
    tokens: [
      '--surface-canvas',
      '--surface-basalt',
      '--ink-primary',
      '--signal-ink',
      '--type-monolith-size',
    ],
    props: [
      {
        name: 'heroBuilding',
        type: 'BuildingRecord',
        required: true,
        description: 'Primary hero structure (e.g., Trellick Tower).',
      },
      {
        name: 'thesisBuilding',
        type: 'BuildingRecord',
        required: true,
        description: 'Editorial thesis plate.',
      },
      {
        name: 'streamBuildings',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Curated specimen stream entries.',
      },
      {
        name: 'brutalistSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Sampled Brutalist structures for the movement ledger.',
      },
      {
        name: 'gothicSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Sampled Gothic structures for the movement ledger.',
      },
      {
        name: 'monumentalSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Sampled Monumental structures for the movement ledger.',
      },
      {
        name: 'totalCount',
        type: 'number',
        required: true,
        description: 'Total indexed structures count.',
      },
    ],
    usageNote: 'Rendered by src/app/(site)/page.tsx.',
    a11yNote: 'Maintains strict h1 -> h2 -> h3 heading hierarchy and 4.5:1+ scrim contrast.',
    doExample: '<HomeClient {...props} />',
    dontExample: 'Do not hardcode building counts; pass totalCount from BUILDINGS.length.',
  },
  {
    id: 'archive-client',
    name: 'ArchiveClient',
    category: 'Page Views',
    sourcePath: 'src/components/ArchiveClient.tsx',
    description:
      'Searchable, multi-faceted structure index supporting movement, material, era, and continent filters alongside Plate Grid and Tabular Index view modes.',
    states: ['plate-view', 'index-view', 'filtered', 'empty-results'],
    tokens: [
      '--surface-canvas',
      '--surface-elevated',
      '--ink-primary',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'totalCount',
        type: 'number',
        required: true,
        description: 'Total cataloged structures count.',
      },
    ],
    usageNote: 'Rendered by src/app/(site)/archive/page.tsx.',
    a11yNote:
      'Uses aria-live="polite" result counter, explicit <label> bindings, and 44px minimum filter chips.',
    doExample: '<ArchiveClient totalCount={BUILDINGS.length} />',
    dontExample: 'Do not remove the tabular Index view mode.',
  },
  {
    id: 'anatomy-client',
    name: 'AnatomyClient',
    category: 'Page Views',
    sourcePath: 'src/components/AnatomyClient.tsx',
    description:
      'Interactive measured-plate workspace pairing the 9 orthographic SVG plates with layer toggles, dimension tables, and callout inspection.',
    states: ['default', 'plate-switched', 'layer-toggled', 'callout-focused'],
    tokens: [
      '--surface-canvas',
      '--surface-basalt',
      '--ink-primary',
      '--border-structural',
      '--signal-ink',
    ],
    props: [
      {
        name: 'plates',
        type: 'PlateMetaItem[]',
        required: true,
        description: 'Metadata for all 9 orthographic anatomy plates.',
      },
      {
        name: 'svgMarkupById',
        type: 'Record<AnatomyPlateId, string>',
        required: true,
        description: 'Server-loaded SVG markup keyed by AnatomyPlateId.',
      },
    ],
    usageNote: 'Rendered by src/app/(site)/anatomy/page.tsx.',
    a11yNote:
      'Supports arrow-key plate navigation and announces active plate changes cleanly.',
    doExample: '<AnatomyClient plates={plates} svgMarkupById={svgMarkupById} />',
    dontExample: 'Do not fetch SVG markup on the client; pass preloaded server strings.',
  },
];
