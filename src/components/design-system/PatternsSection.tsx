'use client';

import { useState } from 'react';
import { computeContrastRatio } from '@/design-system/colorUtils';
import type {
  DesignSystemTokensPayload,
  SurfaceIslandId,
} from '@/design-system/tokens';
import styles from './PatternsSection.module.css';

interface PageTemplateSpec {
  id: string;
  name: string;
  route: string;
  screenshotSrc: string;
  wide?: boolean;
  gridSpans: string;
  surfaceAlternation: string;
  asymmetricRhythm: string;
  wireframeBands: Array<{
    colSpan: string;
    surface: 'void' | 'basalt' | 'plaster' | 'limestone';
    label: string;
  }>;
}

const PAGE_TEMPLATES: ReadonlyArray<PageTemplateSpec> = [
  {
    id: 'home',
    name: 'Home Poster',
    route: '/',
    screenshotSrc: '/design-system/templates/home.png',
    wide: true,
    gridSpans: 'Cols 1–7 Hero Monolith Poster / Cols 8–12 Index Ledger; 3+4+5 plate cadence',
    surfaceAlternation: 'void → plaster → basalt → dark',
    asymmetricRhythm: '1.6fr / 0.95fr editorial split with lancet-arch focal plate and 0px miter frames',
    wireframeBands: [
      { colSpan: 'span 7', surface: 'void', label: '01 HERO PLATE' },
      { colSpan: 'span 5', surface: 'basalt', label: '02 LEDGER' },
      { colSpan: 'span 4', surface: 'plaster', label: '03 PLASTER' },
      { colSpan: 'span 8', surface: 'limestone', label: '04 ARCHIVE TEASER' },
    ],
  },
  {
    id: 'archive',
    name: 'Archive Matrix (PLATE / INDEX)',
    route: '/archive',
    screenshotSrc: '/design-system/templates/archive.png',
    gridSpans: '12-col sticky filter bar; 1.6fr / 0.95fr / 1.15fr Plate mode; 3-col Index ledger',
    surfaceAlternation: 'void → basalt → void',
    asymmetricRhythm: 'Dual PLATE / INDEX view switch with non-uniform masonry spans and tabular coordinates',
    wireframeBands: [
      { colSpan: 'span 12', surface: 'basalt', label: 'FILTER BAR + VIEW SWITCH' },
      { colSpan: 'span 5', surface: 'void', label: 'PLATE A (LANCET)' },
      { colSpan: 'span 3', surface: 'basalt', label: 'PLATE B' },
      { colSpan: 'span 4', surface: 'void', label: 'PLATE C' },
    ],
  },
  {
    id: 'detail',
    name: 'Structure Detail Dossier',
    route: '/structures/[slug]',
    screenshotSrc: '/design-system/templates/detail.png',
    gridSpans: 'Cols 1–5 Sticky Specimen Plate / Cols 6–12 Architectural Dossier & Specs',
    surfaceAlternation: 'void → plaster → basalt',
    asymmetricRhythm: '5/7 split pairing tall arch/miter plate with progressive disclosure elevation notes',
    wireframeBands: [
      { colSpan: 'span 5', surface: 'basalt', label: 'SPECIMEN PLATE' },
      { colSpan: 'span 7', surface: 'plaster', label: 'DOSSIER + SPECS' },
      { colSpan: 'span 12', surface: 'void', label: 'RELATED STRUCTURES' },
    ],
  },
  {
    id: 'anatomy',
    name: 'Anatomy Workbench',
    route: '/anatomy',
    screenshotSrc: '/design-system/templates/anatomy.png',
    wide: true,
    gridSpans: 'Cols 1–8 Interactive Blueprint Stage / Cols 9–12 Live Telemetry & Layer Inspector',
    surfaceAlternation: 'void → basalt → dark',
    asymmetricRhythm: '8/4 technical workbench with 6-feature inspection controls and crosshair callouts',
    wireframeBands: [
      { colSpan: 'span 8', surface: 'void', label: 'INTERACTIVE BLUEPRINT STAGE' },
      { colSpan: 'span 4', surface: 'basalt', label: 'LAYER INSPECTOR' },
    ],
  },
];

const MATRIX_SURFACE_ORDER: ReadonlyArray<SurfaceIslandId> = [
  'void',
  'basalt',
  'plaster',
  'limestone',
];

interface InkRowSpec {
  cssVar: string;
  role: string;
  minWcag: '4.5' | '3.0';
}

const MATRIX_INK_ROWS: ReadonlyArray<InkRowSpec> = [
  { cssVar: '--ink-primary', role: 'Primary Display & Body Copy', minWcag: '4.5' },
  { cssVar: '--ink-secondary', role: 'Secondary Metadata & Captions', minWcag: '4.5' },
  { cssVar: '--ink-muted', role: 'Muted UI Labels (AA Normal Safe)', minWcag: '4.5' },
  { cssVar: '--signal-ink', role: 'Rationed Signal Vermilion Cue', minWcag: '4.5' },
  { cssVar: '--border-hairline', role: 'Hairline Rules & Non-Text UI', minWcag: '3.0' },
  { cssVar: '--border-structural', role: 'Structural 1–2px Brutalist Frames', minWcag: '3.0' },
];

interface ChangelogEntry {
  round: string;
  title: string;
  summary: string;
}

const CHANGELOG_ENTRIES: ReadonlyArray<ChangelogEntry> = [
  {
    round: 'ROUND 01',
    title: 'Brand & 4-Route Foundation',
    summary:
      'Established immutable concrete primitives (#131313–#E9E5DF), rationed Signal Vermilion, zero-radius geometry, and the 4 core archival routes (/, /archive, /structures/[slug], /anatomy).',
  },
  {
    round: 'ROUND 02',
    title: 'Surface Islands & Responsive Margins',
    summary:
      'Introduced scoped [data-surface] islands (void, basalt, plaster, limestone) with automatic semantic ink/border inversion and responsive 4/8/12-column margin scales.',
  },
  {
    round: 'ROUND 03',
    title: 'Evidence-Based 43-Step Fix & Asymmetry',
    summary:
      'Replaced symmetric card grids with asymmetric editorial ledgers (3+4+5, 1.6fr / 0.95fr), removed all drop shadows and rounded corners, and enforced AA contrast across all islands.',
  },
  {
    round: 'ROUND 04',
    title: 'Jury Feedback Progressive Disclosure',
    summary:
      'Added progressive disclosure drawers for dense architectural metadata, clarified PLATE vs INDEX archive modes, and tightened Signal Vermilion area budget to <= 2% viewport.',
  },
  {
    round: 'ROUND 05',
    title: 'Anatomy 6-Feature Upgrade & Speed Optimization',
    summary:
      'Upgraded /anatomy with 6 interactive structural inspection layers, outer-wrapper focus rings (.plate-interactive-outer), and reduced-motion/image decoding optimizations.',
  },
  {
    round: 'ROUND 06',
    title: '/design-system Single Source of Truth',
    summary:
      'Built live token-driven /design-system documentation parsing brand/tokens-color.css and globals.css at runtime with live WCAG contrast computation and component registry.',
  },
];

function resolveSurfaceColor(
  tokens: DesignSystemTokensPayload,
  surfaceId: SurfaceIslandId,
  cssVar: string,
  fallback: string,
): string {
  return (
    tokens.surfaces[surfaceId]?.tokens[cssVar]?.resolvedValue ??
    tokens.semanticDefaults[cssVar]?.resolvedValue ??
    fallback
  );
}

function getWcagBadges(ratio: number): Array<{ label: string; tier: 'pass' | 'large' | 'fail' }> {
  const badges: Array<{ label: string; tier: 'pass' | 'large' | 'fail' }> = [];
  if (ratio >= 7.0) {
    badges.push({ label: 'AAA (7.0:1)', tier: 'pass' });
  }
  if (ratio >= 4.5) {
    badges.push({ label: 'AA (4.5:1)', tier: 'pass' });
  } else if (ratio >= 3.0) {
    badges.push({ label: 'AA Large & UI (3.0:1)', tier: 'large' });
  } else {
    badges.push({ label: 'FAIL (<3.0:1)', tier: 'fail' });
  }
  return badges;
}

export function PatternsSection({
  tokens,
  previewSurface,
}: {
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
}) {
  const [gridOverlays, setGridOverlays] = useState<Record<string, boolean>>({});
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const toggleTemplateOverlay = (id: string) => {
    setGridOverlays((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markImageBroken = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Dynamic contrast ratios for Rule #4 and Prohibited Matrix Row (zero hardcoded numbers)
  const concrete500 = tokens.primitiveMap['--concrete-500'] ?? '#77746C';
  const concrete300 = tokens.primitiveMap['--concrete-300'] ?? '#B9B5AA';
  const concrete950 = tokens.primitiveMap['--concrete-950'] ?? '#131313';
  const concrete800 = tokens.primitiveMap['--concrete-800'] ?? '#282828';

  const ratio500OnLimestone = computeContrastRatio(concrete500, concrete300);
  const ratio500OnVoid = computeContrastRatio(concrete500, concrete950);
  const ratio500OnBasalt = computeContrastRatio(concrete500, concrete800);
  const ratio950OnLimestone = computeContrastRatio(concrete950, concrete300);
  const ratio800OnLimestone = computeContrastRatio(concrete800, concrete300);

  return (
    <div className={styles.sectionRoot} data-surface={previewSurface}>
      {/* Scoped Lancet Arch clipPath for Rule #6 visual specimen */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="ds-monolith-lancet-arch" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.42 C 0,0.16 0.22,0.03 0.5,0 C 0.78,0.03 1,0.16 1,0.42 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =====================================================================
          04.1 PAGE TEMPLATES
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-templates">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.1</span>
            <h3 id="ds-patterns-templates" className="type-subhead">
              PAGE TEMPLATES
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Four archival route compositions. Toggle the local 12-column overlay on any plate to inspect grid spans and asymmetric surface alternation.
          </p>
        </header>

        <div className={styles.templatesGrid}>
          {PAGE_TEMPLATES.map((tpl) => {
            const isOverlayOn = Boolean(gridOverlays[tpl.id]);
            const isBroken = Boolean(brokenImages[tpl.id]);

            return (
              <article
                key={tpl.id}
                className={`${styles.templateCard} ${tpl.wide ? styles.templateCardWide : ''}`}
              >
                <div>
                  <div className={styles.templateHeader}>
                    <div className={styles.templateTitleGroup}>
                      <span className="type-ui-label">{tpl.name}</span>
                      <span className={styles.templateRoute}>{tpl.route}</span>
                    </div>
                    <button
                      type="button"
                      className={`type-ui-label ${styles.overlayToggleBtn}`}
                      aria-pressed={isOverlayOn}
                      onClick={() => toggleTemplateOverlay(tpl.id)}
                    >
                      <span className={styles.overlayDot} aria-hidden="true" />
                      {isOverlayOn ? 'HIDE 12-COL OVERLAY' : 'SHOW 12-COL OVERLAY'}
                    </button>
                  </div>

                  <div className={styles.templateViewport}>
                    {!isBroken ? (
                      <img
                        src={tpl.screenshotSrc}
                        alt={`${tpl.name} (${tpl.route}) archival template preview`}
                        className={styles.templateImage}
                        onError={() => markImageBroken(tpl.id)}
                      />
                    ) : (
                      <div className={styles.templateFallback} role="img" aria-label={`${tpl.name} architectural wireframe`}>
                        <div className={styles.fallbackMetaRow}>
                          <span>MONOLITH // {tpl.route}</span>
                          <span>{tpl.surfaceAlternation}</span>
                        </div>
                        <div className={styles.fallbackBands}>
                          {tpl.wireframeBands.map((band) => {
                            const bandClass =
                              band.surface === 'void'
                                ? styles.fallbackBlockVoid
                                : band.surface === 'basalt'
                                  ? styles.fallbackBlockBasalt
                                  : band.surface === 'plaster'
                                    ? styles.fallbackBlockPlaster
                                    : styles.fallbackBlockLimestone;
                            return (
                              <div
                                key={band.label}
                                className={bandClass}
                                style={{
                                  gridColumn: band.colSpan,
                                  padding: '0.5rem',
                                  display: 'flex',
                                  alignItems: 'flex-end',
                                  fontFamily: 'var(--font-mono, monospace)',
                                  fontSize: '0.625rem',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                {band.label}
                              </div>
                            );
                          })}
                        </div>
                        <div className={styles.fallbackMetaRow}>
                          <span>12-COL ARCHITECTURAL FRAME</span>
                          <span>0PX RADIUS</span>
                        </div>
                      </div>
                    )}

                    {isOverlayOn && (
                      <div className={styles.localGridOverlay} aria-hidden="true">
                        {Array.from({ length: 12 }, (_, idx) => (
                          <div key={idx} className={styles.localGridCol}>
                            <span className={styles.localGridColNum}>{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.templateNotes}>
                  <span className="type-ui-label">COMPOSITION NOTES</span>
                  <ul className={styles.notesList}>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>GRID SPANS</span>
                      <span className={styles.noteVal}>{tpl.gridSpans}</span>
                    </li>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>SURFACES</span>
                      <span className={styles.noteVal}>{tpl.surfaceAlternation}</span>
                    </li>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>RHYTHM</span>
                      <span className={styles.noteVal}>{tpl.asymmetricRhythm}</span>
                    </li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          04.2 VISUAL DO / DON'T RULES
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-rules">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.2</span>
            <h3 id="ds-patterns-rules" className="type-subhead">
              VISUAL DO / DON&apos;T RULES
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Seven non-negotiable architectural invariants rendered as side-by-side specimens.
          </p>
        </header>

        <div className={styles.rulesStack}>
          {/* Rule 1: Zero Radius */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 01</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Zero Radius (0px Miter)</h4>
              </div>
              <p className={styles.ruleRationale}>
                Every container, button, input, and plate uses 0px sharp mitered corners. Rounded corners dilute brutalist structural tension.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doMiterBox}>
                  <span className="type-ui-label">border-radius: 0px</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Crisp 90-degree architectural miter on all surfaces and controls.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.dontRoundedBox}>
                  <span className="type-ui-label">rounded-lg (12px)</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Never apply rounded-lg, pill radii, or soft card corners.</p>
            </div>
          </article>

          {/* Rule 2: Shadowless Tonal Elevation */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 02</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Shadowless Tonal Elevation</h4>
              </div>
              <p className={styles.ruleRationale}>
                Depth is expressed strictly through surface-island tonal shifts and 1px structural borders—never drop shadows or blur.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doElevationBox}>
                  <span className="type-ui-label">1px solid + surface step</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Explicit 1px border and basalt/void tonal step with box-shadow: none.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.dontShadowBox}>
                  <span className="type-ui-label">box-shadow elevation</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Never use ambient box-shadow or backdrop-filter glassmorphism.</p>
            </div>
          </article>

          {/* Rule 3: Signal Vermilion <= 2% */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 03</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Signal Vermilion &lt;= 2%</h4>
              </div>
              <p className={styles.ruleRationale}>
                Signal Vermilion is rationed for surgical cues: active indicators, hairlines, and critical error states (&lt;= 2% viewport area).
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doSignalBar}>
                  <span className="type-ui-label">ACTIVE PLATE 04</span>
                  <span className={styles.doSignalDot} aria-hidden="true" />
                </div>
              </div>
              <p className={styles.specimenCaption}>8px signal dot + 2px hairline cue against concrete canvas.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div
                  className={styles.dontSignalBanner}
                  role="img"
                  aria-label="Anti-pattern: full vermilion banner fill"
                  style={{ color: '#FFFFFF' }}
                >
                  <span className="type-ui-label">FULL VERMILION BANNER</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Never flood large banners, backgrounds, or cards with vermilion fill.</p>
            </div>
          </article>

          {/* Rule 4: #77746C Never on Small Text or Limestone */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 04</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>{concrete500} Never on Small Text / Limestone</h4>
              </div>
              <p className={styles.ruleRationale}>
                Weathered Grey ({concrete500}) only meets large/UI contrast on Void ({ratio500OnVoid.toFixed(2)}:1) and Basalt ({ratio500OnBasalt.toFixed(2)}:1), and fails completely on Limestone ({ratio500OnLimestone.toFixed(2)}:1).
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.contrastSwatches}>
                  <div
                    className={styles.contrastSwatchRow}
                    style={{ backgroundColor: concrete300, color: concrete950 }}
                  >
                    <span>{concrete950} on {concrete300}</span>
                    <strong>{ratio950OnLimestone.toFixed(2)}:1 PASS ✓</strong>
                  </div>
                  <div
                    className={styles.contrastSwatchRow}
                    style={{ backgroundColor: concrete300, color: concrete800 }}
                  >
                    <span>{concrete800} on {concrete300}</span>
                    <strong>{ratio800OnLimestone.toFixed(2)}:1 PASS ✓</strong>
                  </div>
                </div>
              </div>
              <p className={styles.specimenCaption}>Use #131313 or #282828 ink on Limestone (#B9B5AA) for AA/AAA legibility.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.contrastSwatches}>
                  <svg
                    viewBox="0 0 320 34"
                    role="img"
                    aria-label={`Prohibited pairing: ${concrete500} on ${concrete300} (${ratio500OnLimestone.toFixed(2)}:1 FAIL)`}
                    style={{ inlineSize: '100%', blockSize: 'auto', display: 'block' }}
                  >
                    <rect width="320" height="34" fill={concrete300} stroke="#131313" strokeWidth="1" />
                    <text
                      x="10"
                      y="21"
                      fill={concrete500}
                      fontFamily="monospace"
                      fontSize="11"
                    >
                      {concrete500} on {concrete300}
                    </text>
                    <text
                      x="310"
                      y="21"
                      textAnchor="end"
                      fill={concrete500}
                      fontFamily="monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {ratio500OnLimestone.toFixed(2)}:1 FAIL
                    </text>
                  </svg>
                </div>
              </div>
              <p className={styles.specimenCaption}>Never pair {concrete500} with small text (&lt; 24px) or {concrete300} Limestone.</p>
            </div>
          </article>

          {/* Rule 5: Hover Tonal/Border Shift vs Scale */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 05</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Hover Tonal &amp; Border Shift</h4>
              </div>
              <p className={styles.ruleRationale}>
                Interactive plates and controls respond via border-color and tonal surface shifts—never bouncy scale transforms that break grid alignment.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.hoverDoCard}>
                  <span className="type-ui-label">border + surface shift</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Hover shifts border-color and surface tone cleanly within its grid track.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.hoverDontCard}>
                  <span className="type-ui-label">transform: scale(1.04)</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Never apply transform: scale(1.04) on card or plate containers.</p>
            </div>
          </article>

          {/* Rule 6: Lancet Arch Mask */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 06</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Lancet Arch Mask Discipline</h4>
              </div>
              <p className={styles.ruleRationale}>
                The lancet arch clip-path (url(#monolith-lancet-3x4)) is reserved for tall vertical feature plates where the Gothic apex has room to breathe.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.archSpecimenTall} role="img" aria-label="Tall lancet arch feature plate" />
              </div>
              <p className={styles.specimenCaption}>Tall feature plates (&gt;= 260px height) with balanced vertical proportions.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.archSpecimenCompact} role="img" aria-label="Squashed compact arch thumbnail" />
              </div>
              <p className={styles.specimenCaption}>Never apply lancet arch crop to compact &lt; 180px thumbnails.</p>
            </div>
          </article>

          {/* Rule 7: Asymmetric Editorial Ledger */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>RULE 07</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Asymmetric Editorial Ledger</h4>
              </div>
              <p className={styles.ruleRationale}>
                Layouts use deliberate uneven column ratios (3+4+5, 1.6fr 0.95fr 1.15fr) to create architectural hierarchy rather than generic SaaS grids.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>DO ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.asymmetricMiniGrid}>
                  <div className={styles.miniCell}>3fr</div>
                  <div className={styles.miniCell}>4fr</div>
                  <div className={styles.miniCell}>5fr</div>
                </div>
              </div>
              <p className={styles.specimenCaption}>Proportional 3+4+5 / 1.6fr + 0.95fr tracks anchored to the 12-col grid.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>DON&apos;T ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.equalMiniGrid}>
                  <div className={styles.miniCell}>1fr</div>
                  <div className={styles.miniCell}>1fr</div>
                  <div className={styles.miniCell}>1fr</div>
                </div>
              </div>
              <p className={styles.specimenCaption}>Avoid uniform 1fr / 1fr / 1fr SaaS card grids across editorial sections.</p>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================================
          04.3 LIVE ACCESSIBILITY & CONTRAST MATRIX
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-a11y">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.3</span>
            <h3 id="ds-patterns-a11y" className="type-subhead">
              LIVE ACCESSIBILITY &amp; CONTRAST MATRIX
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Every ratio below is computed live from parsed surface and ink tokens via WCAG 2.1 relative luminance.
          </p>
        </header>

        <div className={styles.matrixScroll}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th scope="col" className={`type-ui-label ${styles.matrixTh}`}>
                  INK / BORDER TOKEN
                </th>
                {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                  const surface = tokens.surfaces[surfaceId];
                  const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                  return (
                    <th key={surfaceId} scope="col" className={`type-ui-label ${styles.matrixTh}`}>
                      {surface?.label ?? surfaceId.toUpperCase()} ({bgHex})
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {MATRIX_INK_ROWS.map((row) => (
                <tr key={row.cssVar}>
                  <td>
                    <div className={styles.tokenCell}>
                      <span className={styles.tokenVarName}>{row.cssVar}</span>
                      <span className={styles.tokenRoleDesc}>{row.role}</span>
                    </div>
                  </td>
                  {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                    const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                    const fgHex = resolveSurfaceColor(tokens, surfaceId, row.cssVar, '#E9E5DF');
                    const ratio = computeContrastRatio(fgHex, bgHex);
                    const badges = getWcagBadges(ratio);

                    const bgIsDark = surfaceId === 'void' || surfaceId === 'basalt';
                    const readableInk = ratio >= 4.5 ? fgHex : bgIsDark ? '#E9E5DF' : '#131313';

                    return (
                      <td key={surfaceId}>
                        <div className={styles.ratioCellInner}>
                          <div
                            className={styles.ratioSampleRow}
                            style={{ backgroundColor: bgHex, color: readableInk }}
                          >
                            <span className={styles.ratioNumber}>{ratio.toFixed(2)}:1</span>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono, monospace)',
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  inlineSize: '10px',
                                  blockSize: '10px',
                                  backgroundColor: fgHex,
                                  border: `1px solid ${readableInk}`,
                                  display: 'inline-block',
                                }}
                              />
                              {fgHex}
                            </span>
                          </div>
                          <div className={styles.badgesRow}>
                            {badges.map((b) => (
                              <span
                                key={b.label}
                                className={
                                  b.tier === 'pass'
                                    ? styles.badgePass
                                    : b.tier === 'large'
                                      ? styles.badgeLarge
                                      : styles.badgeFail
                                }
                              >
                                {b.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Explicit Prohibited Pairing Row */}
              <tr className={styles.prohibitedRow}>
                <td>
                  <div className={styles.tokenCell}>
                    <span className={styles.tokenVarName}>
                      --concrete-500 ({concrete500})
                      <span className={styles.prohibitedTag}>PROHIBITED ON LIMESTONE</span>
                    </span>
                    <span className={styles.tokenRoleDesc}>
                      Weathered Grey on Limestone ({concrete300}) — fails AA normal and UI 3.0:1
                    </span>
                  </div>
                </td>
                {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                  const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                  const ratio = computeContrastRatio(concrete500, bgHex);
                  const isLimestone = surfaceId === 'limestone';
                  const badges = getWcagBadges(ratio);

                  const bgIsDark = surfaceId === 'void' || surfaceId === 'basalt';
                  const readableInk = ratio >= 4.5 ? concrete500 : bgIsDark ? '#E9E5DF' : '#131313';

                  return (
                    <td key={surfaceId}>
                      <div className={styles.ratioCellInner}>
                        <div
                          className={styles.ratioSampleRow}
                          style={{
                            backgroundColor: bgHex,
                            color: readableInk,
                            borderColor: isLimestone ? 'var(--signal-border)' : undefined,
                          }}
                        >
                          <span className={styles.ratioNumber}>{ratio.toFixed(2)}:1</span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono, monospace)',
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                inlineSize: '10px',
                                blockSize: '10px',
                                backgroundColor: concrete500,
                                border: `1px solid ${readableInk}`,
                                display: 'inline-block',
                              }}
                            />
                            {isLimestone ? 'PROHIBITED' : concrete500}
                          </span>
                        </div>
                        <div className={styles.badgesRow}>
                          {isLimestone ? (
                            <span className={styles.badgeFail}>PROHIBITED ({ratio.toFixed(2)}:1)</span>
                          ) : (
                            badges.map((b) => (
                              <span
                                key={b.label}
                                className={
                                  b.tier === 'pass'
                                    ? styles.badgePass
                                    : b.tier === 'large'
                                      ? styles.badgeLarge
                                      : styles.badgeFail
                                }
                              >
                                {b.label}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Focus Ring, Touch Target, and Reduced Motion Rules */}
        <div className={styles.a11yRulesGrid}>
          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">FOCUS RING RULE (CLIPPED PLATES)</span>
            <p className={styles.ruleRationale}>
              Because CSS clip-path clips native outlines on lancet-arch plates, the unclipped outer wrapper (.plate-interactive-outer) carries the 2px solid focus ring.
            </p>
            <pre className={styles.a11yCode}>
{`.plate-interactive-outer:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 0;
}`}
            </pre>
          </article>

          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">TOUCH TARGET MINIMUM</span>
            <p className={styles.ruleRationale}>
              All interactive buttons, view switches, overlay toggles, and filter chips enforce a minimum 44×44 px hit area (WCAG 2.5.5 / 2.5.8).
            </p>
            <pre className={styles.a11yCode}>
{`min-block-size: 44px;
min-inline-size: 44px;`}
            </pre>
          </article>

          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">PREFERS-REDUCED-MOTION</span>
            <p className={styles.ruleRationale}>
              All tonal transitions, plate reveals, and scroll-linked effects degrade to instant state changes under reduced motion preferences.
            </p>
            <pre className={styles.a11yCode}>
{`@media (prefers-reduced-motion: reduce) {
  transition: none;
  animation: none;
}`}
            </pre>
          </article>
        </div>
      </section>

      {/* =====================================================================
          04.4 CHANGELOG
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-changelog">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.4</span>
            <h3 id="ds-patterns-changelog" className="type-subhead">
              ARCHITECTURAL CHANGELOG
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Chronological ledger of MONOLITH design-system iterations from foundation to single source of truth.
          </p>
        </header>

        <div className={styles.changelogLedger}>
          {CHANGELOG_ENTRIES.map((entry) => (
            <article key={entry.round} className={styles.changelogRow}>
              <span className={`type-ui-label ${styles.changelogRound}`}>{entry.round}</span>
              <h4 className={`type-ui-label ${styles.changelogTitle}`}>{entry.title}</h4>
              <p className={styles.changelogSummary}>{entry.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
