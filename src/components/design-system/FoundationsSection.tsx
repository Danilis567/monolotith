'use client';

import { useState } from 'react';
import { CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import { HairlineDraw, PlateCurtain } from '@/components/MotionPrimitives';
import { computeContrastRatio, parseHexColor } from '@/design-system/colorUtils';
import type {
  DesignSystemTokensPayload,
  SurfaceIslandId,
} from '@/design-system/tokens';
import styles from './FoundationsSection.module.css';

const SURFACE_ORDER: readonly SurfaceIslandId[] = ['void', 'basalt', 'plaster', 'limestone'];

const SEMANTIC_KEYS = [
  '--surface-canvas',
  '--surface-elevated',
  '--surface-sunken',
  '--ink-primary',
  '--ink-secondary',
  '--ink-muted',
  '--border-hairline',
  '--border-structural',
  '--signal-ink',
  '--signal-border',
  '--focus-ring',
] as const;

const CONTRAST_CHECK_KEYS = new Set<string>([
  '--ink-primary',
  '--ink-secondary',
  '--ink-muted',
  '--border-hairline',
  '--border-structural',
  '--signal-ink',
  '--signal-border',
  '--focus-ring',
]);

const FONT_FAMILIES = [
  {
    name: 'Bodoni Moda',
    cssVar: 'var(--font-display)',
    token: '--font-display',
    role: 'Monumental display, headlines & epigraphs',
    specimen: 'MONOLITH IV',
  },
  {
    name: 'Inter',
    cssVar: 'var(--font-sans)',
    token: '--font-sans',
    role: 'Editorial prose, subheads & UI labels',
    specimen: 'Measured Concrete',
  },
  {
    name: 'IBM Plex Mono',
    cssVar: 'var(--font-mono)',
    token: '--font-mono',
    role: 'Colophons, coordinates, indices & datums',
    specimen: '001 // 98.0 M',
  },
] as const;

const ALLOWED_GLYPHS = ['+', '×', '→', '←', '↗', '↙', '•', '✦'] as const;

const TABULAR_SAMPLES = [
  { index: '001', title: 'PANTHEON', height: '43.3 M' },
  { index: '014', title: 'CHARTRES CATHEDRAL', height: '113.0 M' },
  { index: '023', title: 'TRELLICK TOWER', height: '98.0 M' },
  { index: '027', title: 'BARBICAN ESTATE', height: '123.0 M' },
] as const;

const LINE_LENGTH_RULES = [
  { label: 'PROSE LEAD (.type-body-lead)', measure: '62ch', sample: 'Measured monochrome masonry surveyed across 27 brutalist and gothic monuments.' },
  { label: 'ESSAY BODY (.type-body)', measure: '58ch', sample: 'Structural concrete holds its own shadow without decorative elevation or synthetic blur.' },
  { label: 'PLATE CAPTION', measure: '34ch', sample: 'FIG. 01 — CHARTRES WEST FACADE' },
] as const;

const BREAKPOINT_SPECS = [
  { range: '< 768px', cols: '4 COLS', gutter: '1rem', note: 'Mobile single-column editorial stack' },
  { range: '>= 768px', cols: '8 COLS', gutter: '1.25rem', note: 'Tablet asymmetric split frames' },
  { range: '>= 1024px', cols: '12 COLS', gutter: '1.5rem', note: 'Desktop 12-column exposed grid' },
  { range: '>= 1440px', cols: '12 COLS', gutter: '1.5rem', note: 'Wide archival canvas with 5% outer margin' },
] as const;

const ASPECT_RATIOS = [
  { ratio: '3 / 4', label: '3:4 PORTRAIT PLATE', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Cathedral portrait plate' },
  { ratio: '4 / 5', label: '4:5 MONOGRAPH', src: '/images/buildings/trellick-tower.jpg', alt: 'Trellick Tower elevation plate' },
  { ratio: '16 / 10', label: '16:10 PANORAMA', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Cathedral wide plate' },
  { ratio: '2 / 3', label: '2:3 TALL LANCET', src: '/images/buildings/trellick-tower.jpg', alt: 'Trellick Tower tall plate' },
  { ratio: '1 / 1', label: '1:1 INDEX SQUARE', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Cathedral square plate' },
] as const;

const MOTION_CURVES = [
  {
    name: 'MONOLITH_EASE',
    tuple: '[0.2, 0, 0, 1]',
    durations: '150ms – 280ms',
    usage: 'Surface shifts, hairline sweeps, interactive state',
    svgPath: 'M 10 90 C 30 90, 10 10, 110 10',
  },
  {
    name: 'SHEAR_EASE',
    tuple: '[0.16, 1, 0.3, 1]',
    durations: '280ms – 420ms',
    usage: 'Plate curtain reveals, drawer shear, lancet entry',
    svgPath: 'M 10 90 C 26 10, 40 10, 110 10',
  },
] as const;

function getRoleSpecimenText(role: string): string {
  switch (role) {
    case 'Monolith':
      return 'MONOLITH';
    case 'Display':
      return 'RAW CONCRETE';
    case 'Quote':
      return 'Light does not decorate stone; it measures its mass.';
    case 'Subhead':
      return 'Exposed 12-Column Drafting System';
    case 'Body Lead':
      return 'Every semantic token resolves against four concrete surface islands without synthetic elevation.';
    case 'Body':
      return 'Body copy is constrained to 58ch for sustained editorial reading across dark and light concrete surfaces.';
    case 'UI Label':
      return 'INDEX // SURVEY PLATE 01';
    case 'Colophon':
      return 'LAT 48.4478 N · LON 1.4878 E · 1194 CE';
    default:
      return role;
  }
}

export function FoundationsSection({
  tokens,
  previewSurface,
  onCopy,
}: {
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
  onCopy: (value: string, label?: string) => void;
}) {
  const [replayCount, setReplayCount] = useState(0);

  const gridLayoutTokens = tokens.layoutTokens.filter((t) => t.category === 'grid' || t.category === 'header');

  return (
    <div data-surface={previewSurface} className={styles.root}>
      {/* ==================================================================
          01.1 COLOR
          ================================================================== */}
      <section aria-labelledby="f-color-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>
              <span className="signal-dot" aria-hidden="true" />
              01.1 // COLOR ARCHITECTURE
            </span>
            <h3 id="f-color-heading" className={`type-display ${styles.subTitle}`}>
              PRIMITIVES &amp; SURFACE ISLANDS
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Five immutable concrete tones paired with rationed Signal Vermilion, mapped across four
            architectural surface islands.
          </p>
        </div>

        {/* Primitive Palette */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">TIER 1 // PRIMITIVE PALETTE ({tokens.primitives.length} TOKENS)</span>
          <span className="type-colophon">HEX &amp; CSS TOKEN</span>
        </div>

        <div className={styles.swatchGrid}>
          {tokens.primitives.map((p) => (
            <button
              key={p.name}
              type="button"
              className={styles.swatchBtn}
              onClick={() => onCopy(p.value, p.name)}
              aria-label={`Copy ${p.name} ${p.value}`}
            >
              <span className={styles.swatchChip} style={{ backgroundColor: p.value }}>
                <span className={`type-colophon ${styles.swatchGroupTag}`}>
                  {p.group.toUpperCase()}
                </span>
              </span>
              <span className={styles.swatchMeta}>
                <span className={`type-colophon ${styles.swatchName}`}>{p.name}</span>
                <span className={`type-colophon tabular-nums ${styles.swatchDetail}`}>
                  <span>{p.value}</span>
                  <span>L {p.luminance !== null ? p.luminance.toFixed(4) : '—'}</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* 4 Surface Islands Side-by-Side */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">TIER 2 // SEMANTIC TOKENS ACROSS 4 SURFACE ISLANDS</span>
          <span className="type-colophon">LIVE WCAG CONTRAST VS --surface-canvas</span>
        </div>

        <div className={styles.surfaceMatrix}>
          {SURFACE_ORDER.map((islandId) => {
            const island = tokens.surfaces[islandId];
            if (!island) return null;
            const canvasHex = island.tokens['--surface-canvas']?.resolvedValue ?? '';

            return (
              <div key={island.id} data-surface={island.id} className={styles.islandCard}>
                <div className={styles.islandHeader}>
                  <span className="type-colophon">{island.label.toUpperCase()}</span>
                  <span className="type-colophon">{island.colorScheme.toUpperCase()}</span>
                </div>
                <div className={styles.islandTokenList}>
                  {SEMANTIC_KEYS.map((key) => {
                    const entry = island.tokens[key];
                    if (!entry) return null;
                    const canCompute =
                      CONTRAST_CHECK_KEYS.has(key) &&
                      parseHexColor(entry.resolvedValue) !== null &&
                      parseHexColor(canvasHex) !== null;
                    const ratio = canCompute
                      ? computeContrastRatio(entry.resolvedValue, canvasHex)
                      : null;

                    return (
                      <button
                        key={key}
                        type="button"
                        className={styles.islandTokenRow}
                        onClick={() => onCopy(entry.resolvedValue, `${island.id} ${key}`)}
                        aria-label={`Copy ${key} on ${island.label}: ${entry.resolvedValue}`}
                      >
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: entry.resolvedValue }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenNames}>
                          <span className={`type-colophon ${styles.tokenVar}`}>{key}</span>
                          <span className={`type-colophon tabular-nums ${styles.tokenResolved}`}>
                            {entry.resolvedValue}
                          </span>
                        </span>
                        <span className={`type-colophon tabular-nums ${styles.tokenContrast}`}>
                          {ratio !== null ? `${ratio.toFixed(2)}:1` : 'SURFACE'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* <= 2% Signal Vermilion Rule */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">RATION // &lt;= 2% SIGNAL VERMILION RULE</span>
          <span className="type-colophon">SURGICAL EMPHASIS ONLY</span>
        </div>

        <div className={styles.signalRuleGrid}>
          <div className={styles.signalSpecimen}>
            <div
              className={styles.signalProportionBar}
              role="img"
              aria-label="2 percent vermilion to 98 percent neutral concrete ratio"
            >
              <span className={styles.signalBarActive} />
              <span className={styles.signalBarNeutral} />
            </div>
            <div className={styles.signalDemoRow}>
              <span className="type-colophon" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="signal-dot" aria-hidden="true" />
                DISCIPLINED SPECIMEN // 6PX DOT + 3PX ACTIVE BORDER
              </span>
              <span className="type-colophon tabular-nums" style={{ color: 'var(--signal-ink)' }}>
                &lt;= 2.0% AREA
              </span>
            </div>
          </div>

          <div className={styles.signalRuleNotes}>
            <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
              ALLOCATION GOVERNANCE
            </span>
            <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
              Signal Vermilion is restricted to live status dots, 2px–3px active indicator borders,
              and error states. Full-bleed vermilion backgrounds and decorative gradients are
              prohibited.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.2 TYPOGRAPHY
          ================================================================== */}
      <section aria-labelledby="f-typo-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.2 // TYPOGRAPHIC SYSTEM</span>
            <h3 id="f-typo-heading" className={`type-display ${styles.subTitle}`}>
              FAMILIES, ROLES &amp; MEASURE
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Three Google font families bound to eight editorial roles, strict tabular numerals,
            and controlled line-length measures.
          </p>
        </div>

        {/* 3 Families */}
        <div className={styles.familyGrid}>
          {FONT_FAMILIES.map((fam) => (
            <div key={fam.name} className={styles.familyCard}>
              <div className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {fam.name.toUpperCase()} {'//'} {fam.token}
              </div>
              <div className={styles.familySpecimen} style={{ fontFamily: fam.cssVar }}>
                {fam.specimen}
              </div>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                {fam.role}
              </p>
            </div>
          ))}
        </div>

        {/* All 8 Live .type-* Roles */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">8 LIVE TYPOGRAPHIC ROLES (FROM globals.css)</span>
          <span className="type-colophon">85% ROOT PROPORTION</span>
        </div>

        <div className={styles.roleList}>
          {tokens.typographyRoles.map((role) => {
            const className = role.selector.replace(/^\./, '');
            return (
              <div key={role.selector} className={styles.roleRow}>
                <div className={styles.roleMeta}>
                  <span className="type-colophon" style={{ color: 'var(--ink-primary)' }}>
                    {role.selector}
                  </span>
                  <div className={`type-colophon tabular-nums ${styles.roleSpecs}`}>
                    <span>SIZE: {role.fontSizeValue}</span>
                    {role.fontSizeToken && <span>({role.fontSizeToken})</span>}
                    <span>WT: {role.fontWeight}</span>
                    <span>LH: {role.lineHeight}</span>
                    <span>LS: {role.letterSpacing}</span>
                  </div>
                </div>
                <div className={`${className} ${styles.roleSpecimen}`}>
                  {getRoleSpecimenText(role.role)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Glyphs, Tabular Nums, Line-Length Rules */}
        <div className={styles.typoUtilityGrid}>
          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              ALLOWED GLYPH SET
            </span>
            <div className={styles.glyphStrip}>
              {ALLOWED_GLYPHS.map((glyph) => (
                <span key={glyph} className={styles.glyphCell}>
                  {glyph}
                </span>
              ))}
            </div>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              NO EMOJIS // DRAFTING GLYPHS ONLY
            </span>
          </div>

          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              TABULAR-NUMS ALIGNMENT (001–027)
            </span>
            <div className={styles.tabularTable}>
              {TABULAR_SAMPLES.map((row) => (
                <div key={row.index} className={`type-colophon tabular-nums ${styles.tabularRow}`}>
                  <span>{row.index}</span>
                  <span>{row.title}</span>
                  <span>{row.height}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              LINE-LENGTH MEASURE RULES
            </span>
            <div className={styles.measureList}>
              {LINE_LENGTH_RULES.map((rule) => (
                <div key={rule.measure} className={styles.measureItem}>
                  <span className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                    {rule.label} — MAX {rule.measure}
                  </span>
                  <p
                    className={`type-body ${styles.measureBar}`}
                    style={{ maxInlineSize: rule.measure }}
                  >
                    {rule.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.3 LAYOUT
          ================================================================== */}
      <section aria-labelledby="f-layout-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.3 // SPATIAL ARCHITECTURE</span>
            <h3 id="f-layout-heading" className={`type-display ${styles.subTitle}`}>
              GRID, BORDERS &amp; ELEVATION
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Exposed 4 / 8 / 12-column grid with zero border-radius, zero box-shadow, and tonal
            surface stepping.
          </p>
        </div>

        <div className={styles.layoutSplit}>
          {/* Live Drafting Stage */}
          <div data-surface={previewSurface} className={styles.draftingStage}>
            <CornerCrosshair className={styles.stageCrosshairTL} />
            <CornerCrosshair className={styles.stageCrosshairTR} />
            <CornerCrosshair className={styles.stageCrosshairBL} />
            <CornerCrosshair className={styles.stageCrosshairBR} />
            <SteppedFrame style={{ color: 'var(--border-hairline)' }} />

            <div className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              LIVE DRAFTING STAGE // SURFACE: {previewSurface.toUpperCase()}
            </div>

            <div className={styles.gridGuideDemo} aria-label="12-column grid guide">
              {Array.from({ length: 12 }, (_, idx) => (
                <div key={idx} className={`type-colophon tabular-nums ${styles.gridGuideCol}`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            <div className={styles.elevationTiers}>
              <div className={styles.elevationBox} style={{ backgroundColor: 'var(--surface-sunken)' }}>
                <span className="type-colophon">SUNKEN</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  1PX HAIRLINE
                </span>
              </div>
              <div className={styles.elevationBox} style={{ backgroundColor: 'var(--surface-canvas)' }}>
                <span className="type-colophon">CANVAS</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  0PX RADIUS
                </span>
              </div>
              <div
                className={styles.elevationBox}
                style={{ backgroundColor: 'var(--surface-elevated)', border: '2px solid var(--border-structural)' }}
              >
                <span className="type-colophon">ELEVATED</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  2PX STRUCTURAL
                </span>
              </div>
            </div>
          </div>

          {/* Breakpoint & Layout Token Ledger */}
          <div className={styles.tokenLedger}>
            {BREAKPOINT_SPECS.map((bp) => (
              <div key={bp.range} className={styles.ledgerRow}>
                <span className="type-colophon tabular-nums">{bp.range}</span>
                <span className="type-colophon">{bp.cols}</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  GUTTER {bp.gutter}
                </span>
              </div>
            ))}
            {gridLayoutTokens.map((lt) => (
              <div key={lt.name} className={styles.ledgerRow}>
                <span className="type-colophon">{lt.name}</span>
                <span className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                  {lt.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.4 IMAGERY
          ================================================================== */}
      <section aria-labelledby="f-imagery-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.4 // PHOTOGRAPHIC PLATES</span>
            <h3 id="f-imagery-heading" className={`type-display ${styles.subTitle}`}>
              MONOCHROME, HALFTONE &amp; LANCET ARCH
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Archival plates use high-contrast grayscale, micro-grid grain, 1-bit halftone matrices,
            and Gothic lancet clip-paths. Imagery courtesy of Wikimedia Commons (CC-BY-SA).
          </p>
        </div>

        {/* 3 Plate Treatments */}
        <div className={styles.plateCompareGrid}>
          <figure className={styles.plateCard}>
            <div className={`plate-frame ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Cathedral — base grayscale plate treatment"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-img // GRAYSCALE + CONTRAST
            </figcaption>
          </figure>

          <figure className={styles.plateCard}>
            <div className={`plate-frame plate-grain ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Cathedral — architectural micro-grid grain overlay"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-grain // 4PX MICRO-GRID OVERLAY
            </figcaption>
          </figure>

          <figure className={styles.plateCard}>
            <div className={`plate-frame plate-halftone ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Cathedral — 1-bit halftone dot matrix"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-halftone // 1-BIT DOT MATRIX
            </figcaption>
          </figure>
        </div>

        {/* Sanctioned Aspect Ratios */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">SANCTIONED ASPECT RATIOS (3/4, 4/5, 16/10, 2/3, 1/1)</span>
          <span className="type-colophon">WIKIMEDIA COMMONS CC-BY-SA</span>
        </div>

        <div className={styles.aspectStrip}>
          {ASPECT_RATIOS.map((ar) => (
            <figure key={ar.ratio} className={styles.aspectCard}>
              <div className="plate-frame" style={{ aspectRatio: ar.ratio }}>
                <img
                  src={ar.src}
                  alt={ar.alt}
                  className="plate-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {ar.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Gothic Lancet Arch Mask + Rules */}
        <div className={styles.lancetGrid}>
          <div className={styles.lancetPlateWrap}>
            <div className="plate-frame plate-arch-lancet">
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Cathedral inside Gothic Lancet Arch clip-path"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className={styles.lancetRules}>
            <span className="type-colophon">
              GOTHIC LANCET ARCH {'//'} clip-path: url(#monolith-lancet-3x4) (.plate-arch-lancet)
            </span>
            <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
              Locked strictly to 3:4 (`#monolith-lancet-3x4`) or 2:3 (`#monolith-lancet-2x3`)
              vertical plates. Focus rings stay on an unclipped outer wrapper so keyboard outlines
              are never severed.
            </p>
            <div className={styles.prohibitedThumbRow}>
              <div className={`plate-frame ${styles.compactThumb}`}>
                <img
                  src="/images/buildings/trellick-tower.jpg"
                  alt="Trellick Tower compact rectangular thumbnail"
                  className="plate-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div style={{ display: 'grid', gap: '0.25rem' }}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  RULE // NEVER ON &lt; 180PX THUMBNAILS
                </span>
                <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                  Compact index thumbnails (&lt; 180px wide) remain strictly rectangular so the
                  pointed arch apex never crowds metadata.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.5 MOTION
          ================================================================== */}
      <section aria-labelledby="f-motion-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.5 // ARCHITECTURAL MOTION</span>
            <h3 id="f-motion-heading" className={`type-display ${styles.subTitle}`}>
              CURVES, CURTAINS &amp; REDUCED MOTION
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Deterministic deceleration curves with zero spring bounce. Every animated plate and
            hairline rule collapses to an instant visible state under{' '}
            <code>prefers-reduced-motion: reduce</code>.
          </p>
        </div>

        <div className={styles.motionGrid}>
          {/* Curves */}
          <div className={styles.curvePanel}>
            {MOTION_CURVES.map((curve) => (
              <div key={curve.name} style={{ display: 'grid', gap: '0.5rem' }}>
                <div className="type-colophon">
                  {curve.name} {'//'} {curve.tuple}
                </div>
                <svg
                  viewBox="0 0 120 100"
                  className={styles.curveSvg}
                  aria-label={`${curve.name} cubic bezier curve`}
                >
                  <line
                    x1="10"
                    y1="90"
                    x2="110"
                    y2="10"
                    stroke="var(--border-hairline)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    d={curve.svgPath}
                    fill="none"
                    stroke="var(--signal-ink)"
                    strokeWidth="2"
                  />
                  <circle cx="10" cy="90" r="3" fill="var(--ink-primary)" />
                  <circle cx="110" cy="10" r="3" fill="var(--ink-primary)" />
                </svg>
                <div className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                  {curve.durations} — {curve.usage}
                </div>
              </div>
            ))}
          </div>

          {/* Live Replay + Reduced Motion Comparison */}
          <div className={styles.motionStageWrap}>
            <div className={styles.motionControls}>
              <span className="type-colophon">
                LIVE PLATECURTAIN + HAIRLINEDRAW + LANCET REVEAL
              </span>
              <button
                type="button"
                className="btn-monolith btn-monolith--primary"
                onClick={() => setReplayCount((c) => c + 1)}
              >
                <span>REPLAY</span>
                <span className="tabular-nums" aria-hidden="true">
                  #{String(replayCount).padStart(2, '0')}
                </span>
              </button>
            </div>

            <div className={styles.replayCompare}>
              <div className={styles.replayPane}>
                <span className="type-colophon">STANDARD MOTION (420MS SHEAR)</span>
                <div key={`anim-${replayCount}`} className={styles.animatedHairline}>
                  <HairlineDraw thick />
                </div>
                <PlateCurtain key={`curtain-${replayCount}`} className={styles.animatedCurtain}>
                  <div className="plate-frame plate-arch-lancet">
                    <img
                      src="/images/buildings/trellick-tower.jpg"
                      alt="Trellick Tower animated lancet reveal"
                      className="plate-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </PlateCurtain>
              </div>

              <div className={styles.replayPane}>
                <span className="type-colophon">PREFERS-REDUCED-MOTION: REDUCE (INSTANT)</span>
                <HairlineDraw thick />
                <PlateCurtain className={styles.instantCurtain}>
                  <div className="plate-frame plate-arch-lancet">
                    <img
                      src="/images/buildings/trellick-tower.jpg"
                      alt="Trellick Tower reduced motion instant state"
                      className="plate-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </PlateCurtain>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
