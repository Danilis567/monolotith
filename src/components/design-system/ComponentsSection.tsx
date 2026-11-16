'use client';

import { Suspense, useMemo, useState, type MouseEvent } from 'react';
import { AnatomyClient } from '@/components/AnatomyClient';
import { AnatomyStage } from '@/components/AnatomyStage';
import { ArchClipDefs } from '@/components/ArchClipDefs';
import { ArchiveClient } from '@/components/ArchiveClient';
import {
  AlignmentStar,
  CornerCrosshair,
  ScaleRuler,
  SteppedFrame,
} from '@/components/DraftingMarks';
import { Gloss } from '@/components/Gloss';
import { HomeClient } from '@/components/HomeClient';
import { HairlineDraw, PlateCurtain } from '@/components/MotionPrimitives';
import { ReadingGuide } from '@/components/ReadingGuide';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SpecimenStream } from '@/components/SpecimenStream';
import { UrlParamSync } from '@/components/UrlParamSync';
import { ANATOMY_PLATES } from '@/data/anatomyPlates';
import { BUILDINGS, type AnatomyPlateId } from '@/data/buildings';
import type {
  ComponentCategory,
  DesignSystemComponentEntry,
} from '@/design-system/registry';
import type {
  DesignSystemTokensPayload,
  SurfaceIslandId,
} from '@/design-system/tokens';
import styles from './ComponentsSection.module.css';

type PreviewState =
  | 'default'
  | 'hover'
  | 'focus-visible'
  | 'pressed'
  | 'disabled'
  | 'error';

const PREVIEW_STATES: ReadonlyArray<{ id: PreviewState; label: string }> = [
  { id: 'default', label: 'DEFAULT' },
  { id: 'hover', label: 'HOVER' },
  { id: 'focus-visible', label: 'FOCUS' },
  { id: 'pressed', label: 'PRESSED' },
  { id: 'disabled', label: 'DISABLED' },
  { id: 'error', label: 'ERROR' },
];

const CATEGORIES: ReadonlyArray<'ALL' | ComponentCategory> = [
  'ALL',
  'Navigation & Chrome',
  'Drafting & Marks',
  'Editorial & Typography',
  'Interactive Plates & Stage',
  'Motion & Utilities',
  'Page Views',
];

const SAMPLE_ORTHO_SVG = `<svg viewBox="0 0 800 460" width="800" height="460" role="img" aria-label="Trellick Tower orthographic elevation specimen">
  <g id="layer-structure" fill="none">
    <rect x="260" y="48" width="220" height="360" class="str-cut" />
    <rect x="190" y="28" width="52" height="380" class="str-cut" />
    <line x1="242" y1="108" x2="260" y2="108" class="str-line" />
    <line x1="242" y1="208" x2="260" y2="208" class="str-line" />
    <line x1="242" y1="308" x2="260" y2="308" class="str-line" />
    <line x1="120" y1="408" x2="660" y2="408" class="str-thin" />
  </g>
  <g id="layer-axis" fill="none">
    <line x1="216" y1="16" x2="216" y2="424" class="sig" stroke-dasharray="6 4" stroke-width="1.5" />
    <line x1="370" y1="36" x2="370" y2="424" class="sig" stroke-dasharray="6 4" stroke-width="1.2" />
    <circle cx="216" cy="108" r="4" class="sig-fill" />
  </g>
  <g id="layer-dimensions" fill="none">
    <line x1="514" y1="48" x2="514" y2="408" class="dim-line" />
    <line x1="506" y1="48" x2="522" y2="48" class="dim-line" />
    <line x1="506" y1="408" x2="522" y2="408" class="dim-line" />
    <text x="530" y="232" font-family="monospace" font-size="14">98.0 M</text>
  </g>
</svg>`;

const PLATES_WITH_META = ANATOMY_PLATES.map((plate) => {
  const building = BUILDINGS.find((b) => b.anatomyPlateId === plate.id);
  return {
    ...plate,
    movement: building?.movement ?? ('Brutalist' as const),
    slug: building?.slug ?? plate.id,
  };
});

const SVG_MARKUP_BY_ID = Object.fromEntries(
  ANATOMY_PLATES.map((plate) => [plate.id, SAMPLE_ORTHO_SVG])
) as Record<AnatomyPlateId, string>;

function preventLinkNavigation(event: MouseEvent<HTMLElement>) {
  const target = event.target as HTMLElement | null;
  if (target?.closest('a')) {
    event.preventDefault();
  }
}

function sanitizeSpecimenDom(node: HTMLElement | null) {
  if (!node) return;
  node.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href) {
      a.setAttribute('data-specimen-href', href);
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
    }
  });
  node.querySelectorAll('header, footer, nav').forEach((landmark) => {
    landmark.setAttribute('role', 'presentation');
  });
}

function resolveTokenSwatch(
  tokenName: string,
  tokens: DesignSystemTokensPayload,
  surface: SurfaceIslandId
): string | null {
  const surfaceEntry = tokens.surfaces[surface]?.tokens[tokenName];
  if (surfaceEntry?.resolvedValue?.startsWith('#')) {
    return surfaceEntry.resolvedValue;
  }
  const defaultEntry = tokens.semanticDefaults[tokenName];
  if (defaultEntry?.resolvedValue?.startsWith('#')) {
    return defaultEntry.resolvedValue;
  }
  return null;
}

export function ComponentsSection({
  registry,
  tokens,
  previewSurface,
}: {
  registry: DesignSystemComponentEntry[];
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
}) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | ComponentCategory>('ALL');
  const [stateByCard, setStateByCard] = useState<Record<string, PreviewState>>({});

  // Interactive AnatomyStage specimen state
  const [stageStructure, setStageStructure] = useState(true);
  const [stageAxis, setStageAxis] = useState(true);
  const [stageDimensions, setStageDimensions] = useState(true);
  const [stageCallout, setStageCallout] = useState<string | null>(null);
  const [stageDim, setStageDim] = useState<string | null>(null);
  const [stageFullscreen, setStageFullscreen] = useState(false);

  // Interactive UI Primitives state
  const [buttonState, setButtonState] = useState<PreviewState>('default');
  const [viewMode, setViewMode] = useState<'plate' | 'index'>('plate');
  const [anatomyTab, setAnatomyTab] = useState<'ALL' | 'Brutalist' | 'Gothic' | 'Monumental'>('ALL');
  const [layerToggles, setLayerToggles] = useState({
    structure: true,
    axis: true,
    dimensions: true,
  });
  const [searchSample, setSearchSample] = useState('');
  const [movementSample, setMovementSample] = useState('ALL');
  const [inputState, setInputState] = useState<'default' | 'focus-visible' | 'disabled' | 'error'>(
    'default'
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: registry.length };
    for (const entry of registry) {
      counts[entry.category] = (counts[entry.category] ?? 0) + 1;
    }
    return counts;
  }, [registry]);

  const filteredRegistry = useMemo(() => {
    if (selectedCategory === 'ALL') return registry;
    return registry.filter((entry) => entry.category === selectedCategory);
  }, [registry, selectedCategory]);

  const getCardState = (id: string): PreviewState => stateByCard[id] ?? 'default';

  const setCardState = (id: string, next: PreviewState) => {
    setStateByCard((prev) => ({ ...prev, [id]: next }));
  };

  const sampleBuilding = BUILDINGS[0];
  const gothicBuilding = BUILDINGS.find((b) => b.movement === 'Gothic') ?? BUILDINGS[0];
  const primaryPlate = ANATOMY_PLATES[0];

  const renderDualSurfaceSpecimen = (
    entry: DesignSystemComponentEntry,
    surface: 'void' | 'plaster',
    activeState: PreviewState
  ) => {
    const stateAttr =
      activeState === 'hover' || activeState === 'focus-visible' ? activeState : undefined;

    switch (entry.id) {
      case 'site-header':
        return (
          <div
            ref={sanitizeSpecimenDom}
            className={styles.inertFrame}
            inert
            aria-hidden="true"
            onClickCapture={(e) => e.preventDefault()}
          >
            <SiteHeader plateCount={BUILDINGS.length} />
          </div>
        );

      case 'site-footer':
        return (
          <div
            ref={sanitizeSpecimenDom}
            className={styles.inertFrame}
            inert
            aria-hidden="true"
            onClickCapture={(e) => e.preventDefault()}
          >
            <SiteFooter />
          </div>
        );

      case 'drafting-marks':
        return (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <CornerCrosshair />
              <AlignmentStar />
              <div
                style={{
                  position: 'relative',
                  inlineSize: '120px',
                  blockSize: '56px',
                  border: '1px solid var(--border-hairline)',
                }}
              >
                <SteppedFrame />
              </div>
            </div>
            <ScaleRuler />
          </div>
        );

      case 'arch-clip-defs':
        return (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <ArchClipDefs />
            <div className={styles.cropGrid}>
              <div className={styles.cropFrame}>
                <img src={sampleBuilding.imagePath} alt={sampleBuilding.imageAlt} />
              </div>
              <div className={`${styles.cropFrame} plate-arch-lancet`}>
                <img src={gothicBuilding.imagePath} alt={gothicBuilding.imageAlt} />
              </div>
            </div>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              APERTURES: RECTILINEAR 3:4 &amp; #monolith-lancet-3x4
            </span>
          </div>
        );

      case 'gloss':
        return (
          <p className="type-body" style={{ margin: 0 }}>
            Monolithic{' '}
            <Gloss term="BÉTON BRUT">
              <span data-state-preview={stateAttr}>béton brut</span>
            </Gloss>{' '}
            with{' '}
            <Gloss term="FLYING BUTTRESS">
              <span data-state-preview={stateAttr}>flying buttress</span>
            </Gloss>{' '}
            load paths.
          </p>
        );

      case 'reading-guide':
        return <ReadingGuide />;

      case 'motion-primitives':
        return (
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            <HairlineDraw />
            <PlateCurtain>
              <div
                style={{
                  padding: '0.75rem',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: 'var(--surface-elevated)',
                }}
              >
                <span className="type-colophon">PLATE CURTAIN // {surface.toUpperCase()}</span>
              </div>
            </PlateCurtain>
            <HairlineDraw thick />
          </div>
        );

      case 'url-param-sync':
        return (
          <div style={{ display: 'grid', gap: '0.4rem' }}>
            <Suspense fallback={null}>
              <UrlParamSync paramKey="ds_preview" onRead={() => undefined} />
            </Suspense>
            <span className="type-colophon">URL PARAM SYNC // HEADLESS</span>
            <code className={styles.codeMono}>
              {'<UrlParamSync paramKey="movement" onRead={syncMovement} />'}
            </code>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSingleWideSpecimen = (entry: DesignSystemComponentEntry) => {
    switch (entry.id) {
      case 'specimen-stream':
        return (
          <div ref={sanitizeSpecimenDom} onClickCapture={preventLinkNavigation}>
            <SpecimenStream buildings={BUILDINGS.slice(0, 3)} />
          </div>
        );

      case 'anatomy-stage':
        return (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div className={styles.specimenRow}>
              <button
                type="button"
                className="btn-monolith"
                aria-pressed={stageStructure}
                onClick={() => setStageStructure((v) => !v)}
              >
                STRUCTURE: {stageStructure ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className="btn-monolith"
                aria-pressed={stageAxis}
                onClick={() => setStageAxis((v) => !v)}
              >
                AXIS: {stageAxis ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                className="btn-monolith"
                aria-pressed={stageDimensions}
                onClick={() => setStageDimensions((v) => !v)}
              >
                DIMENSIONS: {stageDimensions ? 'ON' : 'OFF'}
              </button>
            </div>
            <AnatomyStage
              svgMarkup={SAMPLE_ORTHO_SVG}
              callouts={primaryPlate.callouts}
              dimensions={primaryPlate.dimensionsSchedule}
              showStructure={stageStructure}
              showAxis={stageAxis}
              showDimensions={stageDimensions}
              selectedCalloutCode={stageCallout}
              selectedDimensionId={stageDim}
              onSelectCallout={setStageCallout}
              onSelectDimension={setStageDim}
              isFullscreen={stageFullscreen}
              onToggleFullscreen={() => setStageFullscreen((v) => !v)}
              plateTitle={primaryPlate.title}
              plateScale={primaryPlate.scale}
            />
          </div>
        );

      case 'home-client':
        return (
          <div
            ref={sanitizeSpecimenDom}
            className={styles.inertFramePage}
            inert
            aria-hidden="true"
            onClickCapture={(e) => e.preventDefault()}
          >
            <HomeClient
              heroBuilding={BUILDINGS[0]}
              thesisBuilding={BUILDINGS[1]}
              streamBuildings={BUILDINGS.slice(0, 3)}
              brutalistSample={BUILDINGS.filter((b) => b.movement === 'Brutalist').slice(0, 3)}
              gothicSample={BUILDINGS.filter((b) => b.movement === 'Gothic').slice(0, 3)}
              monumentalSample={BUILDINGS.filter((b) => b.movement === 'Monumental').slice(0, 3)}
              totalCount={BUILDINGS.length}
            />
            <div className={styles.inertFrameOverlay}>
              <span className="type-colophon">INERT FRAMED PREVIEW // HOME MONOGRAPH</span>
              <span className="type-colophon">LINKS DISABLED</span>
            </div>
          </div>
        );

      case 'archive-client':
        return (
          <div
            ref={sanitizeSpecimenDom}
            className={styles.inertFramePage}
            inert
            aria-hidden="true"
            onClickCapture={(e) => e.preventDefault()}
          >
            <Suspense fallback={null}>
              <ArchiveClient totalCount={BUILDINGS.length} />
            </Suspense>
            <div className={styles.inertFrameOverlay}>
              <span className="type-colophon">INERT FRAMED PREVIEW // ARCHIVE INDEX</span>
              <span className="type-colophon">LINKS DISABLED</span>
            </div>
          </div>
        );

      case 'anatomy-client':
        return (
          <div
            ref={sanitizeSpecimenDom}
            className={styles.inertFramePage}
            inert
            aria-hidden="true"
            onClickCapture={(e) => e.preventDefault()}
          >
            <Suspense fallback={null}>
              <AnatomyClient plates={PLATES_WITH_META} svgMarkupById={SVG_MARKUP_BY_ID} />
            </Suspense>
            <div className={styles.inertFrameOverlay}>
              <span className="type-colophon">INERT FRAMED PREVIEW // ANATOMY WORKSPACE</span>
              <span className="type-colophon">LINKS DISABLED</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.root} data-surface={previewSurface}>
      {/* -------------------------------------------------------------------
          Category Filter Bar & Quick Count
         ------------------------------------------------------------------- */}
      <div className={styles.filterHeader}>
        <div className={styles.filterGroup} role="group" aria-label="Component category filter">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={styles.filterBtn}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              <span className={`tabular-nums ${styles.filterCount}`}>
                ({categoryCounts[category] ?? 0})
              </span>
            </button>
          ))}
        </div>

        <span className={`type-colophon tabular-nums ${styles.summaryMeta}`}>
          SHOWING {filteredRegistry.length} OF {registry.length} COMPONENTS // ACTIVE SURFACE:{' '}
          {previewSurface.toUpperCase()}
        </span>
      </div>

      {/* -------------------------------------------------------------------
          Registered Component Specimens (registry.map)
         ------------------------------------------------------------------- */}
      <div className={styles.registryList}>
        {filteredRegistry.map((entry) => {
          const activeState = getCardState(entry.id);
          const isWideSingle =
            entry.id === 'specimen-stream' ||
            entry.id === 'anatomy-stage' ||
            entry.id === 'home-client' ||
            entry.id === 'archive-client' ||
            entry.id === 'anatomy-client';

          return (
            <article key={entry.id} className={styles.card} aria-labelledby={`comp-${entry.id}`}>
              <header className={styles.cardHeader}>
                <div className={styles.cardTitleBlock}>
                  <span className={`type-colophon ${styles.cardCategory}`}>
                    <span className="signal-dot" aria-hidden="true" />
                    {entry.category}
                  </span>
                  <h3 id={`comp-${entry.id}`} className={`type-subhead ${styles.cardTitle}`}>
                    {entry.name}
                  </h3>
                  <p className={`type-body ${styles.cardDesc}`}>{entry.description}</p>
                </div>
                <code className={styles.sourcePath}>{entry.sourcePath}</code>
              </header>

              {/* State Matrix Controls */}
              <div className={styles.stateBar}>
                <span className={`type-colophon ${styles.stateLabel}`}>
                  STATE MATRIX // {entry.states.join(' · ').toUpperCase()}
                </span>
                <div className={styles.stateGroup} role="group" aria-label={`${entry.name} state`}>
                  {PREVIEW_STATES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      className={styles.stateBtn}
                      aria-pressed={activeState === st.id}
                      onClick={() => setCardState(entry.id, st.id)}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual-Surface Live Preview or Framed Full-Width Specimen */}
              {isWideSingle ? (
                <div className={styles.dualSurfaceSingle}>
                  <div className={styles.surfacePane} data-surface={previewSurface}>
                    <div className={styles.surfacePaneBar}>
                      <span className="type-colophon">
                        LIVE SPECIMEN // SURFACE: {previewSurface.toUpperCase()}
                      </span>
                      <span className="type-colophon">STATE: {activeState.toUpperCase()}</span>
                    </div>
                    <div className={styles.surfacePaneBody}>{renderSingleWideSpecimen(entry)}</div>
                  </div>
                </div>
              ) : (
                <div className={styles.dualSurface}>
                  {(['void', 'plaster'] as const).map((surface) => (
                    <div key={surface} className={styles.surfacePane} data-surface={surface}>
                      <div className={styles.surfacePaneBar}>
                        <span className="type-colophon">SURFACE: {surface.toUpperCase()}</span>
                        <span className="type-colophon">STATE: {activeState.toUpperCase()}</span>
                      </div>
                      <div className={styles.surfacePaneBody}>
                        {renderDualSurfaceSpecimen(entry, surface, activeState)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Metadata: Usage, Accessibility, Consumed Tokens */}
              <div className={styles.metaGrid}>
                <div className={styles.metaBox}>
                  <h4 className={`type-colophon ${styles.metaHeading}`}>USAGE &amp; ACCESSIBILITY</h4>
                  <p className={styles.metaText}>{entry.usageNote}</p>
                  <p className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                    <strong>A11Y:</strong> {entry.a11yNote}
                  </p>
                </div>

                <div className={styles.metaBox}>
                  <h4 className={`type-colophon ${styles.metaHeading}`}>
                    CONSUMED CSS TOKENS ({entry.tokens.length})
                  </h4>
                  {entry.tokens.length > 0 ? (
                    <div className={styles.tokenRow}>
                      {entry.tokens.map((tok) => {
                        const hex = resolveTokenSwatch(tok, tokens, previewSurface);
                        return (
                          <span key={tok} className={styles.tokenChip}>
                            {hex && (
                              <span
                                className={styles.tokenSwatch}
                                style={{ backgroundColor: hex }}
                                aria-hidden="true"
                              />
                            )}
                            <span>{tok}</span>
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                      Headless utility — consumes zero visual CSS tokens.
                    </p>
                  )}
                </div>
              </div>

              {/* TypeScript Props Table */}
              {entry.props.length > 0 && (
                <div className={styles.tableWrap}>
                  <table className={styles.propsTable}>
                    <thead>
                      <tr>
                        <th scope="col">Prop</th>
                        <th scope="col">Type</th>
                        <th scope="col">Required</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.props.map((prop) => (
                        <tr key={prop.name}>
                          <td>
                            <code className={styles.codeMono}>{prop.name}</code>
                          </td>
                          <td>
                            <code className={styles.codeMono}>{prop.type}</code>
                          </td>
                          <td className="type-colophon">{prop.required ? 'REQUIRED' : 'OPTIONAL'}</td>
                          <td>{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Do / Don't Snippets */}
              <div className={styles.doDontGrid}>
                <div className={styles.doBox}>
                  <span className="type-colophon">DO</span>
                  <code className={styles.codeMono}>{entry.doExample}</code>
                </div>
                <div className={styles.dontBox}>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    DON&apos;T
                  </span>
                  <span className={styles.metaText}>{entry.dontExample}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* -------------------------------------------------------------------
          §4 UI Primitives & Architectural Specimens Matrix
         ------------------------------------------------------------------- */}
      <section aria-labelledby="primitives-heading" className={styles.primitivesSection}>
        <div className={styles.primitivesHeader}>
          <h3 id="primitives-heading" className="type-subhead">
            UI PRIMITIVES &amp; ARCHITECTURAL SPECIMENS (§4)
          </h3>
          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            DUAL-SURFACE STATE COVERAGE
          </span>
        </div>

        <div className={styles.primitivesGrid}>
          {/* 1. Buttons (Primary / Secondary / Inverse) */}
          <div className={`${styles.primitiveCard} ${styles.primitiveCardWide}`}>
            <div className={styles.cardHeader}>
              <h4 className="type-colophon">01 // BUTTONS (.btn-monolith &amp; --primary)</h4>
              <div className={styles.stateGroup} role="group" aria-label="Button state preview">
                {PREVIEW_STATES.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    className={styles.stateBtn}
                    aria-pressed={buttonState === st.id}
                    onClick={() => setButtonState(st.id)}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.dualSurface}>
              {(['void', 'plaster'] as const).map((surface) => {
                const stateAttr =
                  buttonState === 'hover' || buttonState === 'focus-visible'
                    ? buttonState
                    : undefined;
                return (
                  <div key={surface} className={styles.surfacePane} data-surface={surface}>
                    <div className={styles.surfacePaneBar}>
                      <span className="type-colophon">SURFACE: {surface.toUpperCase()}</span>
                      <span className="type-colophon">STATE: {buttonState.toUpperCase()}</span>
                    </div>
                    <div className={styles.surfacePaneBody}>
                      <div className={styles.specimenRow}>
                        <button
                          type="button"
                          className="btn-monolith btn-monolith--primary"
                          data-state-preview={stateAttr}
                          aria-pressed={buttonState === 'pressed' ? true : undefined}
                          disabled={buttonState === 'disabled'}
                          style={
                            buttonState === 'error'
                              ? { borderColor: 'var(--signal-ink)' }
                              : undefined
                          }
                        >
                          PRIMARY ACTION
                        </button>
                        <button
                          type="button"
                          className="btn-monolith"
                          data-state-preview={stateAttr}
                          aria-pressed={buttonState === 'pressed' ? true : undefined}
                          disabled={buttonState === 'disabled'}
                          style={
                            buttonState === 'error'
                              ? { borderColor: 'var(--signal-ink)', color: 'var(--signal-ink)' }
                              : undefined
                          }
                        >
                          SECONDARY
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Links & Breadcrumb */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">02 // LINKS &amp; BREADCRUMB</h4>
            <nav aria-label="Breadcrumb specimen">
              <ol className={styles.breadcrumbList}>
                <li>
                  <a
                    href="#archive"
                    className="type-colophon"
                    onClick={(e) => e.preventDefault()}
                  >
                    ARCHIVE
                  </a>
                </li>
                <li aria-hidden="true" className={styles.breadcrumbSep}>
                  /
                </li>
                <li>
                  <a
                    href="#brutalist"
                    className="type-colophon"
                    onClick={(e) => e.preventDefault()}
                  >
                    BRUTALIST
                  </a>
                </li>
                <li aria-hidden="true" className={styles.breadcrumbSep}>
                  /
                </li>
                <li>
                  <span className="type-colophon" aria-current="page">
                    TRELLICK TOWER
                  </span>
                </li>
              </ol>
            </nav>
            <p className="type-body" style={{ margin: 0 }}>
              Inline editorial{' '}
              <a href="#specimen-link" onClick={(e) => e.preventDefault()}>
                structural monograph link
              </a>{' '}
              and active route marker.
            </p>
          </div>

          {/* 3. Filter Selects & Search Input */}
          <div className={styles.primitiveCard}>
            <div className={styles.cardHeader}>
              <h4 className="type-colophon">03 // FILTER SELECTS &amp; SEARCH INPUT</h4>
              <div className={styles.stateGroup} role="group" aria-label="Input state">
                {(['default', 'focus-visible', 'disabled', 'error'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={styles.stateBtn}
                    aria-pressed={inputState === st}
                    onClick={() => setInputState(st)}
                  >
                    {st.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-search-sample" className={`type-colophon ${styles.fieldLabel}`}>
                SEARCH CATALOG
              </label>
              <input
                id="ds-search-sample"
                type="search"
                className={styles.inputControl}
                value={searchSample}
                onChange={(e) => setSearchSample(e.target.value)}
                placeholder="TRELLICK, CHARTRES, CONCRETE..."
                data-state-preview={inputState === 'focus-visible' ? 'focus-visible' : undefined}
                disabled={inputState === 'disabled'}
                aria-invalid={inputState === 'error' ? true : undefined}
              />
              {inputState === 'error' && (
                <span className={styles.fieldError}>ERR // QUERY SYNTAX UNRECOGNIZED</span>
              )}
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-select-sample" className={`type-colophon ${styles.fieldLabel}`}>
                MOVEMENT FILTER
              </label>
              <select
                id="ds-select-sample"
                className={styles.selectControl}
                value={movementSample}
                onChange={(e) => setMovementSample(e.target.value)}
                data-state-preview={inputState === 'focus-visible' ? 'focus-visible' : undefined}
                disabled={inputState === 'disabled'}
                aria-invalid={inputState === 'error' ? true : undefined}
              >
                <option value="ALL">ALL MOVEMENTS (27)</option>
                <option value="Brutalist">BRUTALIST</option>
                <option value="Gothic">GOTHIC</option>
                <option value="Monumental">MONUMENTAL</option>
              </select>
            </div>
          </div>

          {/* 4. [ PLATE ] / [ INDEX ] View Toggle & Anatomy Tabs + Layer Toggles */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">04 // VIEW TOGGLE &amp; ANATOMY TABS</h4>
            <div className={styles.viewToggle} role="group" aria-label="Archive view mode">
              <button
                type="button"
                className={styles.viewToggleBtn}
                aria-pressed={viewMode === 'plate'}
                onClick={() => setViewMode('plate')}
              >
                [ PLATE ]
              </button>
              <button
                type="button"
                className={styles.viewToggleBtn}
                aria-pressed={viewMode === 'index'}
                onClick={() => setViewMode('index')}
              >
                [ INDEX ]
              </button>
            </div>

            <div className={styles.tabList} role="tablist" aria-label="Anatomy movement tabs">
              {(['ALL', 'Brutalist', 'Gothic', 'Monumental'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  className={styles.tabBtn}
                  aria-selected={anatomyTab === tab}
                  onClick={() => setAnatomyTab(tab)}
                >
                  {tab === 'ALL' ? 'ALL PLATES' : tab}
                </button>
              ))}
            </div>

            <div className={styles.specimenRow}>
              {(['structure', 'axis', 'dimensions'] as const).map((layer) => (
                <button
                  key={layer}
                  type="button"
                  className="btn-monolith"
                  aria-pressed={layerToggles[layer]}
                  onClick={() =>
                    setLayerToggles((prev) => ({ ...prev, [layer]: !prev[layer] }))
                  }
                >
                  {layer.toUpperCase()}: {layerToggles[layer] ? 'ON' : 'OFF'}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Archive Table Row & Mobile Slip */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">05 // ARCHIVE TABLE ROW &amp; MOBILE SLIP</h4>
            <div className={styles.tableWrap}>
              <table className={styles.propsTable}>
                <thead>
                  <tr>
                    <th scope="col">CAT.</th>
                    <th scope="col">STRUCTURE</th>
                    <th scope="col">ELEV.</th>
                    <th scope="col">YEAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tabular-nums">{sampleBuilding.catalogNumber}</td>
                    <td>{sampleBuilding.name}</td>
                    <td className="tabular-nums">{sampleBuilding.dimensions.heightLabel}</td>
                    <td className="tabular-nums">{sampleBuilding.yearCompleted}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.mobileSlip}>
              <div className={`type-colophon ${styles.mobileSlipTop}`}>
                <span>{sampleBuilding.catalogNumber}</span>
                <span>{sampleBuilding.movement.toUpperCase()}</span>
              </div>
              <strong className="type-subhead">{sampleBuilding.name}</strong>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {sampleBuilding.city}, {sampleBuilding.country} · {sampleBuilding.dimensions.heightLabel}
              </span>
            </div>
          </div>

          {/* 6. 3 Plate Crops (3/4, Lancet, Halftone) */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">06 // PLATE CROPS (3/4 · LANCET · HALFTONE)</h4>
            <div className={styles.cropGrid}>
              <div className={styles.cropCard}>
                <div className={styles.cropFrame}>
                  <img
                    className="plate-img"
                    src={sampleBuilding.imagePath}
                    alt={sampleBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">3/4 RECTILINEAR</span>
              </div>
              <div className={styles.cropCard}>
                <div className={`${styles.cropFrame} plate-arch-lancet`}>
                  <img
                    className="plate-img"
                    src={gothicBuilding.imagePath}
                    alt={gothicBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">LANCET ARCH</span>
              </div>
              <div className={styles.cropCard}>
                <div className={`${styles.cropFrame} plate-halftone`}>
                  <img
                    className="plate-img"
                    src={sampleBuilding.imagePath}
                    alt={sampleBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">1-BIT HALFTONE</span>
              </div>
            </div>
          </div>

          {/* 7. Colophon <dl> Ledger, Observation Row & calloutMetricBox */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">07 // COLOPHON LEDGER, OBSERVATION &amp; CALLOUT METRIC</h4>
            <dl className={styles.ledgerList}>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>CAT. NO.</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.catalogNumber}
                </dd>
              </div>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>ELEVATION</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.dimensions.heightLabel}
                </dd>
              </div>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>COORDINATES</dt>
                <dd className={`type-colophon tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.coordinates.dmsFormatted}
                </dd>
              </div>
            </dl>

            <div className={styles.observationRow}>
              <span className="type-colophon">01 // DETACHED SERVICE CORE</span>
              <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Linked at every third floor via concrete skybridges.
              </span>
            </div>

            <div className={styles.calloutMetricBox}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                PRIMARY DATUM
              </span>
              <span className="type-display tabular-nums">98.0 M</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                VERTICAL SERVICE TOWER ELEVATION
              </span>
            </div>
          </div>

          {/* 8. Inert Drawer Specimen */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">08 // INERT MOBILE DRAWER SPECIMEN</h4>
            <div className={styles.drawerSpecimen} inert aria-hidden="true">
              <div className={styles.drawerSpecimenHeader}>
                <span className="type-colophon">MONOLITH // NAVIGATION</span>
                <span className="type-colophon">[ CLOSE ]</span>
              </div>
              <span className="type-subhead">01 HOME — POSTER EXHIBITION</span>
              <span className="type-subhead">02 ARCHIVE — 27 CATALOGED STRUCTURES</span>
              <span className="type-subhead">03 ANATOMY — MEASURED SECTIONS</span>
            </div>
          </div>

          {/* 9. Empty / Error States */}
          <div className={`${styles.primitiveCard} ${styles.primitiveCardWide}`}>
            <h4 className="type-colophon">09 // EMPTY &amp; ERROR STATES</h4>
            <div className={styles.errorGrid}>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>ERR 404</span>
                <strong className="type-subhead">PLATE NOT FOUND</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  Requested catalog slug does not exist in the MONOLITH index.
                </span>
              </div>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>ZERO RESULTS</span>
                <strong className="type-subhead">NO STRUCTURES MATCH</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  Clear active movement, material, or era filters to restore all 27 plates.
                </span>
              </div>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>PLATE UNRENDERED</span>
                <strong className="type-subhead">ORTHOGRAPHIC FALLBACK</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  Vector plate markup unavailable; verify SVG asset path in public/plates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
