'use client';

import { AlignmentStar, CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import type { SurfaceIslandId } from '@/design-system/tokens';
import styles from './BrandSection.module.css';

interface LogoAsset {
  id: string;
  name: string;
  src: string;
  dimensions: string;
  surfaceRule: string;
  role: string;
  backing: 'dark' | 'light' | 'plate';
  exactPx?: number;
}

interface LogoGroup {
  id: string;
  title: string;
  columns: 2 | 3;
  wideStage?: boolean;
  items: LogoAsset[];
}

const LOGO_GROUPS: LogoGroup[] = [
  {
    id: 'wordmark',
    title: 'PRIMARY WORDMARK',
    columns: 3,
    items: [
      {
        id: 'wordmark-dark',
        name: 'WORDMARK // DARK GROUND',
        src: '/brand/monolith-wordmark-dark.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'VOID / BASALT (#131313–#201F1E)',
        role: 'Primary horizontal titleplate on dark surfaces.',
        backing: 'dark',
      },
      {
        id: 'wordmark-light',
        name: 'WORDMARK // LIGHT GROUND',
        src: '/brand/monolith-wordmark-light.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'PLASTER / LIMESTONE (#E9E5DF–#D9D4CC)',
        role: 'Primary horizontal titleplate on light surfaces.',
        backing: 'light',
      },
      {
        id: 'wordmark-mono',
        name: 'WORDMARK // MONOCHROME',
        src: '/brand/monolith-wordmark-mono.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (INHERITS INK)',
        role: 'Single-ink print, stencil, and CSS-masked plates.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'stacked',
    title: 'STACKED WORDMARK',
    columns: 2,
    wideStage: true,
    items: [
      {
        id: 'stacked-dark',
        name: 'STACKED ARCHIVE // DARK GROUND',
        src: '/brand/monolith-stacked-dark.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'VOID / BASALT (#131313–#201F1E)',
        role: 'Vertical cover plate and monograph spine lockup.',
        backing: 'dark',
      },
      {
        id: 'stacked-light',
        name: 'STACKED ARCHIVE // LIGHT GROUND',
        src: '/brand/monolith-stacked-light.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'PLASTER / LIMESTONE (#E9E5DF–#D9D4CC)',
        role: 'Vertical cover plate on mineral paper grounds.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'monogram',
    title: 'MONOGRAM ("M")',
    columns: 3,
    items: [
      {
        id: 'monogram-dark',
        name: 'MONOGRAM // DARK GROUND',
        src: '/brand/monolith-monogram-dark.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'VOID / BASALT (#131313–#201F1E)',
        role: 'Square architectural seal for compact headers.',
        backing: 'dark',
      },
      {
        id: 'monogram-light',
        name: 'MONOGRAM // LIGHT GROUND',
        src: '/brand/monolith-monogram-light.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'PLASTER / LIMESTONE (#E9E5DF–#D9D4CC)',
        role: 'Square architectural seal on light surfaces.',
        backing: 'light',
      },
      {
        id: 'monogram-mono',
        name: 'MONOGRAM // MONOCHROME',
        src: '/brand/monolith-monogram-mono.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (INHERITS INK)',
        role: 'Single-ink stamp and inline vector emblem.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'lockups',
    title: 'NAV & FOOTER LOCKUPS',
    columns: 3,
    items: [
      {
        id: 'nav-dark',
        name: 'NAV LOCKUP // DARK GROUND',
        src: '/brand/nav-lockup.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'VOID / BASALT HEADER BAR',
        role: 'Top navigation bar mark with vertical rule.',
        backing: 'dark',
      },
      {
        id: 'nav-light',
        name: 'NAV LOCKUP // LIGHT GROUND',
        src: '/brand/nav-lockup-light.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'PLASTER / LIMESTONE HEADER BAR',
        role: 'Top navigation bar mark on light surfaces.',
        backing: 'light',
      },
      {
        id: 'nav-mono',
        name: 'NAV LOCKUP // MONOCHROME',
        src: '/brand/nav-lockup-mono.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'CURRENTCOLOR (INHERITS INK)',
        role: 'Adaptive navigation lockup for custom themes.',
        backing: 'light',
      },
      {
        id: 'footer-dark',
        name: 'FOOTER LOCKUP // DARK GROUND',
        src: '/brand/footer-lockup.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'VOID / BASALT FOOTER PLATE',
        role: 'Monumental full-width archive footer masthead.',
        backing: 'dark',
      },
      {
        id: 'footer-light',
        name: 'FOOTER LOCKUP // LIGHT GROUND',
        src: '/brand/footer-lockup-light.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'PLASTER / LIMESTONE FOOTER',
        role: 'Monumental footer masthead on light ground.',
        backing: 'light',
      },
      {
        id: 'footer-mono',
        name: 'FOOTER LOCKUP // MONOCHROME',
        src: '/brand/footer-lockup-mono.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'CURRENTCOLOR (INHERITS INK)',
        role: 'Single-ink monumental masthead.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'loader-favicons',
    title: 'LOADER MARK & FAVICONS',
    columns: 3,
    items: [
      {
        id: 'loader-dark',
        name: 'LOADER MARK // DARK GROUND',
        src: '/brand/loader-mark.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'VOID / BASALT CURTAIN',
        role: 'Geometric plumb-line and lancet reveal mark.',
        backing: 'dark',
      },
      {
        id: 'loader-light',
        name: 'LOADER MARK // LIGHT GROUND',
        src: '/brand/loader-mark-light.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'PLASTER / LIMESTONE CURTAIN',
        role: 'Light-ground geometric reveal mark.',
        backing: 'light',
      },
      {
        id: 'loader-mono',
        name: 'LOADER MARK // MONOCHROME',
        src: '/brand/loader-mark-mono.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'CURRENTCOLOR (INHERITS INK)',
        role: 'Vector stroke reveal mark.',
        backing: 'light',
      },
      {
        id: 'favicon-16',
        name: 'FAVICON // 16 PX',
        src: '/brand/favicon-16.svg',
        dimensions: '16 × 16 PX',
        surfaceRule: 'SELF-CONTAINED (#131313 PLATE)',
        role: 'Browser tab minimum-size crisp raster/SVG icon.',
        backing: 'plate',
        exactPx: 16,
      },
      {
        id: 'favicon-32',
        name: 'FAVICON // 32 PX',
        src: '/brand/favicon-32.svg',
        dimensions: '32 × 32 PX',
        surfaceRule: 'SELF-CONTAINED (#131313 PLATE)',
        role: 'Standard desktop bookmark & tab icon.',
        backing: 'plate',
        exactPx: 32,
      },
      {
        id: 'favicon-48',
        name: 'FAVICON // 48 PX',
        src: '/brand/favicon-48.svg',
        dimensions: '48 × 48 PX',
        surfaceRule: 'SELF-CONTAINED (#131313 PLATE)',
        role: 'High-DPI shortcut and task-switcher icon.',
        backing: 'plate',
        exactPx: 48,
      },
      {
        id: 'apple-touch',
        name: 'APPLE TOUCH ICON',
        src: '/brand/apple-touch-icon.svg',
        dimensions: '180 × 180 PX',
        surfaceRule: 'SELF-CONTAINED (#131313 PLATE)',
        role: 'iOS / iPadOS home screen bookmark plate.',
        backing: 'plate',
      },
      {
        id: 'maskable-icon',
        name: 'MASKABLE PWA ICON',
        src: '/brand/maskable-icon.svg',
        dimensions: '512 × 512 PX',
        surfaceRule: 'SELF-CONTAINED (SAFE-ZONE)',
        role: 'Android / PWA adaptive maskable app icon.',
        backing: 'plate',
      },
    ],
  },
];

interface VoicePair {
  id: string;
  context: string;
  write: string;
  writeNote: string;
  avoid: string;
  avoidNote: string;
}

const VOICE_COMPARISONS: VoicePair[] = [
  {
    id: 'collection-summary',
    context: 'ARCHIVE OVERVIEW',
    write: 'Twenty-seven load-bearing works in raw concrete and dressed stone.',
    writeNote: 'Factual count, structural role, exact materiality. Zero adjectives.',
    avoid: 'Discover our breathtaking, iconic collection! ✨',
    avoidNote: 'Exclamation mark, emoji, subjective hype ("breathtaking", "iconic").',
  },
  {
    id: 'specimen-note',
    context: 'SPECIMEN ENTRY // CAT. 004',
    write: 'Cantilevered slab cast in situ; board-marked soffit retained without plaster.',
    writeNote: 'Declarative construction method and observable surface finish.',
    avoid: 'A seamless, awe-inspiring testament to brutalist architectural mastery.',
    avoidNote: 'AI filler nouns ("testament") and banned puffery ("seamless", "awe-inspiring").',
  },
  {
    id: 'survey-status',
    context: 'SYSTEM & SURVEY STATUS',
    write: 'SURVEY FOLIO IV — 27 RECORDS INDEXED.',
    writeNote: 'Dry archival register. Period-terminated statement.',
    avoid: 'Welcome to the future of architectural storytelling!',
    avoidNote: 'Promotional SaaS framing and exclamation punctuation.',
  },
];

interface FormatSpec {
  id: string;
  label: string;
  sample: string;
  rule: string;
}

const ARCHIVAL_FORMATS: FormatSpec[] = [
  {
    id: 'catalog-id',
    label: 'CATALOG ID',
    sample: 'CAT. 001',
    rule: 'Zero-padded 3-digit index from CAT. 001 to CAT. 027. Always uppercase with period and single space.',
  },
  {
    id: 'date',
    label: 'SURVEY DATE',
    sample: '16 / 11 / 2026',
    rule: 'DD / MM / YYYY separated by spaced solidus. Tabular numerals enforced.',
  },
  {
    id: 'metric-height',
    label: 'METRIC UNITS',
    sample: '98.0 M',
    rule: 'One decimal place with uppercase M unit (e.g., 98.0 M, 55.6 M). Never lowercase m.',
  },
  {
    id: 'coordinates',
    label: 'COORDINATES',
    sample: '51°31′25″N × 0°12′20″W',
    rule: 'Degrees, prime (′), double-prime (″) separated by multiplication sign (×).',
  },
  {
    id: 'two-tier-label',
    label: 'TWO-TIER PLAIN-FIRST LABEL',
    sample: 'COORDINATES: GPS (WGS84)',
    rule: 'Plain-language category first, technical datum in parentheses.',
  },
];

interface GlyphSpec {
  glyph: string;
  code: string;
  role: string;
}

const PERMITTED_GLYPHS: GlyphSpec[] = [
  { glyph: '+', code: 'U+002B', role: 'Expand / Datum Cross' },
  { glyph: '×', code: 'U+00D7', role: 'Coordinate Separator / Close' },
  { glyph: '→', code: 'U+2192', role: 'Forward Navigation' },
  { glyph: '←', code: 'U+2190', role: 'Return / Previous Record' },
  { glyph: '↗', code: 'U+2197', role: 'External Reference' },
  { glyph: '↙', code: 'U+2199', role: 'Inbound / Anchor Drop' },
  { glyph: '•', code: 'U+2022', role: 'Inline Ledger Separator' },
  { glyph: '✦', code: 'U+2726', role: 'Edition / Colophon Star' },
  { glyph: '▪', code: 'U+25AA', role: 'Signal / Active Index' },
];

export function BrandSection({
  previewSurface,
  onCopy,
}: {
  previewSurface: SurfaceIslandId;
  onCopy: (value: string, label?: string) => void;
}) {
  return (
    <div data-surface={previewSurface} className={styles.root}>
      {/* =====================================================================
          02.1 LOGO SYSTEM
          ===================================================================== */}
      <section aria-labelledby="brand-logo-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.1 // LOGO SYSTEM</span>
            <h3 id="brand-logo-heading" className={`type-subhead ${styles.subTitle}`}>
              MARKS, LOCKUPS &amp; FAVICON PLATES
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            All twenty-two canonical vector assets served from <code>/brand/</code>. Each specimen is
            mounted on its mandated contrast ground to preserve stroke legibility.
          </p>
        </div>

        {LOGO_GROUPS.map((group) => (
          <div key={group.id} className={styles.groupBlock}>
            <div className={styles.groupHeader}>
              <span className={`type-ui-label ${styles.groupTitle}`}>{group.title}</span>
              <span className={`type-colophon ${styles.groupCount}`}>
                {group.items.length} ASSETS
              </span>
            </div>

            <div
              className={`${styles.logoGrid} ${
                group.columns === 3 ? styles.logoGridThree : ''
              }`}
            >
              {group.items.map((asset) => {
                const backingClass =
                  asset.backing === 'dark'
                    ? styles.stageDark
                    : asset.backing === 'light'
                      ? styles.stageLight
                      : styles.stagePlate;

                return (
                  <article key={asset.id} className={styles.logoCard}>
                    <div
                      className={`${styles.logoStage} ${
                        group.wideStage ? styles.logoStageWide : ''
                      } ${backingClass}`}
                    >
                      <img
                        src={asset.src}
                        alt={`${asset.name} (${asset.dimensions})`}
                        width={asset.exactPx}
                        height={asset.exactPx}
                        className={`${styles.logoImg} ${
                          asset.exactPx ? styles.logoImgExact : ''
                        }`}
                      />
                    </div>

                    <div className={styles.logoMeta}>
                      <div className={styles.logoNameRow}>
                        <span className={`type-ui-label ${styles.logoName}`}>{asset.name}</span>
                        <span className={`type-colophon tabular-nums ${styles.logoDim}`}>
                          {asset.dimensions}
                        </span>
                      </div>
                      <dl className={styles.logoSpecList}>
                        <div className={styles.logoSpecRow}>
                          <dt className={`type-colophon ${styles.logoSpecKey}`}>SURFACE:</dt>
                          <dd className={`type-colophon ${styles.logoSpecVal}`}>
                            {asset.surfaceRule}
                          </dd>
                        </div>
                        <div className={styles.logoSpecRow}>
                          <dt className={`type-colophon ${styles.logoSpecKey}`}>ROLE:</dt>
                          <dd className={`type-body ${styles.logoSpecVal}`}>{asset.role}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className={styles.logoFooter}>
                      <code className={`type-colophon ${styles.logoPath}`}>{asset.src}</code>
                      <button
                        type="button"
                        className={`type-ui-label ${styles.copyBtn}`}
                        onClick={() => onCopy(asset.src, asset.name)}
                        aria-label={`Copy path ${asset.src}`}
                      >
                        COPY PATH
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        {/* Clearspace, Minimum Size & Visual Anti-Examples */}
        <div className={styles.rulesSplit}>
          <div className={styles.clearspacePanel}>
            <div className={styles.panelHead}>
              <span className="type-ui-label">CLEARSPACE &amp; MINIMUM SIZE</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                1× M-STEM PERIMETER
              </span>
            </div>

            <div className={styles.clearspaceDiagram}>
              <div className={styles.clearspaceBox}>
                <span className={`type-colophon ${styles.clearspaceTagTop}`}>1× M-STEM</span>
                <span className={`type-colophon ${styles.clearspaceTagBottom}`}>1× M-STEM</span>
                <span className={`type-colophon ${styles.clearspaceTagLeft}`}>1×</span>
                <span className={`type-colophon ${styles.clearspaceTagRight}`}>1×</span>
                <div className={styles.clearspaceInner}>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="MONOLITH wordmark clearspace diagram"
                    width={165}
                    height={40}
                  />
                </div>
              </div>
            </div>

            <div className={styles.minSizeGrid}>
              <div className={styles.minSizeCard}>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  WORDMARK MINIMUM WIDTH
                </span>
                <div className={styles.minSizePreview}>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="Wordmark at 110px minimum width"
                    width={110}
                    height={27}
                  />
                  <span className="type-colophon tabular-nums" style={{ color: '#e9e5df' }}>
                    110 PX
                  </span>
                </div>
              </div>

              <div className={styles.minSizeCard}>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  FAVICON MINIMUM SIZE
                </span>
                <div className={styles.minSizePreview}>
                  <img
                    src="/brand/favicon-16.svg"
                    alt="Favicon at 16px minimum size"
                    width={16}
                    height={16}
                  />
                  <span className="type-colophon tabular-nums" style={{ color: '#e9e5df' }}>
                    16 × 16 PX
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dontPanel}>
            <div className={styles.panelHead}>
              <span className="type-ui-label">PROHIBITED MARK TREATMENTS</span>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                ✕ DO NOT VIOLATE
              </span>
            </div>

            <div className={styles.dontGrid}>
              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ PROHIBITED</span>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="Prohibited stretched aspect ratio"
                    width={132}
                    height={32}
                    className={styles.dontStretch}
                  />
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ STRETCHED RATIO</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    Never distort horizontal or vertical proportions. Lock aspect ratio on all
                    containers.
                  </p>
                </div>
              </article>

              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ PROHIBITED</span>
                  <svg
                    viewBox="0 0 180 44"
                    width="160"
                    height="40"
                    role="img"
                    aria-label="Prohibited unauthorized neon blue recolor"
                  >
                    <text
                      x="90"
                      y="29"
                      textAnchor="middle"
                      fill="#00A8FF"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      fontSize="20"
                      letterSpacing="5"
                    >
                      MONOLITH
                    </text>
                  </svg>
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ NEON / BLUE RECOLOR</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    Never recolor marks outside the concrete ink register (#E9E5DF, #131313, or
                    currentColor).
                  </p>
                </div>
              </article>

              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ PROHIBITED</span>
                  <svg
                    viewBox="0 0 180 48"
                    width="160"
                    height="44"
                    role="img"
                    aria-label="Prohibited soft drop shadow"
                  >
                    <defs>
                      <filter id="brand-prohibited-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#F45D4D" floodOpacity="0.85" />
                      </filter>
                    </defs>
                    <text
                      x="90"
                      y="30"
                      textAnchor="middle"
                      fill="#E9E5DF"
                      filter="url(#brand-prohibited-shadow)"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      fontSize="20"
                      letterSpacing="5"
                    >
                      MONOLITH
                    </text>
                  </svg>
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ SOFT DROP-SHADOW</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    Zero elevation blurs, glows, or drop-shadows. Depth is structural, never
                    atmospheric.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02.2 BRAND VOICE ("The Laconic Archivist")
          ===================================================================== */}
      <section aria-labelledby="brand-voice-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.2 // BRAND VOICE</span>
            <h3 id="brand-voice-heading" className={`type-subhead ${styles.subTitle}`}>
              THE LACONIC ARCHIVIST
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Editorial copy reads as an architectural survey ledger: factual, dry, and declarative.
            Describe structure, material, and datum without persuasion.
          </p>
        </div>

        <div className={styles.voiceGrid}>
          {VOICE_COMPARISONS.map((pair) => (
            <div key={pair.id} className={styles.voicePair}>
              <div className={styles.voiceWrite}>
                <span className={`type-colophon ${styles.voiceTagWrite}`}>
                  WRITE (LACONIC ARCHIVIST) — {pair.context}
                </span>
                <p className={`type-body-lead ${styles.voiceQuote}`}>{pair.write}</p>
                <p className={`type-colophon ${styles.voiceNote}`}>{pair.writeNote}</p>
              </div>

              <div className={styles.voiceAvoid}>
                <span className={`type-colophon ${styles.voiceTagAvoid}`}>
                  DO NOT WRITE (SAAS / AI FILLER)
                </span>
                <p className={`type-body-lead ${styles.voiceQuoteStrike}`}>{pair.avoid}</p>
                <p className={`type-colophon ${styles.voiceNote}`}>{pair.avoidNote}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.voiceRulesBar}>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">NO EXCLAMATION MARKS</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Terminate statements with periods only.
            </span>
          </div>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">NO EMOJIS OR DECORATION</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Zero pictographs in headings, buttons, or prose.
            </span>
          </div>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">NO FILLER ADJECTIVES</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Banned: tapestry, testament, awe-inspiring, seamless.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02.3 DATA & ARCHIVAL FORMATS
          ===================================================================== */}
      <section aria-labelledby="brand-formats-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.3 // DATA &amp; ARCHIVAL FORMATS</span>
            <h3 id="brand-formats-heading" className={`type-subhead ${styles.subTitle}`}>
              CANONICAL NOTATION &amp; UNITS
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Click any canonical format to copy the exact string template. All numeric readouts
            enforce tabular lining numerals.
          </p>
        </div>

        <div className={styles.formatTable}>
          {ARCHIVAL_FORMATS.map((fmt) => (
            <div key={fmt.id} className={styles.formatRow}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {fmt.label}
              </span>
              <code className={`type-subhead ${styles.formatSample}`}>{fmt.sample}</code>
              <p className={`type-body ${styles.formatRule}`}>{fmt.rule}</p>
              <button
                type="button"
                className={`type-ui-label ${styles.formatCopyBtn}`}
                onClick={() => onCopy(fmt.sample, fmt.label)}
                aria-label={`Copy ${fmt.label}: ${fmt.sample}`}
              >
                COPY
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          02.4 ICONOGRAPHY
          ===================================================================== */}
      <section aria-labelledby="brand-iconography-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.4 // ICONOGRAPHY</span>
            <h3 id="brand-iconography-heading" className={`type-subhead ${styles.subTitle}`}>
              TYPOGRAPHIC GLYPHS &amp; DRAFTING MARKS
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            MONOLITH uses zero third-party icon libraries and zero emojis. Only the nine permitted
            typographic glyphs and three geometric drafting SVGs may appear in the interface.
          </p>
        </div>

        <div className={styles.iconographyGrid}>
          <div className={styles.glyphGrid}>
            {PERMITTED_GLYPHS.map((item) => (
              <div key={item.code} className={styles.glyphCell}>
                <div className={styles.glyphStage}>
                  <span className={styles.glyphChar} aria-hidden="true">
                    {item.glyph}
                  </span>
                  <span className={`type-colophon ${styles.glyphRole}`}>{item.role}</span>
                </div>
                <button
                  type="button"
                  className={`type-colophon ${styles.glyphCopyBtn}`}
                  onClick={() => onCopy(item.glyph, item.code)}
                  aria-label={`Copy glyph ${item.glyph} (${item.code})`}
                >
                  <span>{item.code}</span>
                  <span>COPY</span>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.draftingMarksList}>
            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <CornerCrosshair />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">CornerCrosshair</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  13 × 13 PX // 1PX STROKE
                </span>
                <span className="type-body">
                  Perimeter registration crosshair anchored at frame corners.
                </span>
              </div>
            </div>

            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <AlignmentStar />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">AlignmentStar</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  15 × 15 PX // 1PX STROKE
                </span>
                <span className="type-body">
                  Concave 4-point surveyor alignment mark for colophon dividers.
                </span>
              </div>
            </div>

            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <SteppedFrame />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">SteppedFrame</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  FLUID // NON-SCALING STROKE
                </span>
                <span className="type-body">
                  Mitered L-shaped drafting brackets inset inside specimen plates.
                </span>
              </div>
            </div>

            <div className={styles.iconBanBanner}>
              <span className="type-ui-label">
                STRICT RULE: ZERO THIRD-PARTY ICON LIBRARIES &amp; ZERO EMOJIS
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
