'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
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

const CATEGORY_ORDER: ReadonlyArray<ComponentCategory> = [
  'Navigation & Chrome',
  'Drafting & Marks',
  'Editorial & Typography',
  'Interactive Plates & Stage',
  'Motion & Utilities',
  'Page Views',
];

const CATEGORY_LABELS_TR: Record<ComponentCategory, string> = {
  'Navigation & Chrome': 'GEZİNTİ VE ÇERÇEVE',
  'Drafting & Marks': 'TEKNİK ÇİZİM İŞARETLERİ',
  'Editorial & Typography': 'EDİTORYAL VE TİPOGRAFİ',
  'Interactive Plates & Stage': 'ETKİLEŞİMLİ PLAKALAR VE SAHNE',
  'Motion & Utilities': 'HAREKET VE YARDIMCILAR',
  'Page Views': 'SAYFA KOMPOZİSYONLARI',
};

const SURFACE_LABELS_TR: Record<string, string> = {
  void: 'VOID (KOYU)',
  plaster: 'PLASTER (AÇIK)',
  basalt: 'BASALT (BAZALT)',
  'warm-stone': 'WARM STONE (SICAK TAŞ)',
};

function formatSurfaceLabel(surface: string): string {
  return SURFACE_LABELS_TR[surface] ?? surface.toUpperCase();
}

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

function SpecimenSanitizeEffect({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;
    sanitizeSpecimenDom(node);
    const observer = new MutationObserver(() => sanitizeSpecimenDom(node));
    observer.observe(node, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [targetRef]);
  return null;
}

function IsolatedSpecimen({
  className,
  inertFrame = false,
  suspended = false,
  onClickCapture,
  children,
}: {
  className?: string;
  inertFrame?: boolean;
  suspended?: boolean;
  onClickCapture: (e: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={frameRef}
      data-specimen-isolate="true"
      className={className}
      {...(inertFrame ? { inert: true, 'aria-hidden': true as const } : {})}
      onClickCapture={onClickCapture}
    >
      {suspended ? (
        <Suspense fallback={null}>
          {children}
          <SpecimenSanitizeEffect targetRef={frameRef} />
        </Suspense>
      ) : (
        <>
          {children}
          <SpecimenSanitizeEffect targetRef={frameRef} />
        </>
      )}
    </div>
  );
}

export function ComponentsSection({
  registry,
  previewSurface,
}: {
  registry: DesignSystemComponentEntry[];
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
}) {
  // Interactive AnatomyStage specimen state
  const [stageStructure, setStageStructure] = useState(true);
  const [stageAxis, setStageAxis] = useState(true);
  const [stageDimensions, setStageDimensions] = useState(true);
  const [stageCallout, setStageCallout] = useState<string | null>(null);
  const [stageDim, setStageDim] = useState<string | null>(null);
  const [stageFullscreen, setStageFullscreen] = useState(false);

  // Interactive UI Primitives state
  const [viewMode, setViewMode] = useState<'plate' | 'index'>('plate');
  const [anatomyTab, setAnatomyTab] = useState<'ALL' | 'Brutalist' | 'Gothic' | 'Monumental'>('ALL');
  const [layerToggles, setLayerToggles] = useState({
    structure: true,
    axis: true,
    dimensions: true,
  });

  const sampleBuilding = BUILDINGS[0];
  const gothicBuilding = BUILDINGS.find((b) => b.movement === 'Gothic') ?? BUILDINGS[0];
  const primaryPlate = ANATOMY_PLATES[0];

  const groupedRegistry = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: registry.filter((entry) => entry.category === category),
    })).filter((group) => group.items.length > 0);
  }, [registry]);

  const renderDualSurfaceSpecimen = (
    entry: DesignSystemComponentEntry,
    surface: 'void' | 'plaster'
  ) => {
    switch (entry.id) {
      case 'site-header':
        return (
          <IsolatedSpecimen
            className={styles.inertFrame}
            inertFrame
            onClickCapture={(e) => e.preventDefault()}
          >
            <SiteHeader plateCount={BUILDINGS.length} />
          </IsolatedSpecimen>
        );

      case 'site-footer':
        return (
          <IsolatedSpecimen
            className={styles.inertFrame}
            inertFrame
            onClickCapture={(e) => e.preventDefault()}
          >
            <SiteFooter />
          </IsolatedSpecimen>
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
              AÇIKLIKLAR: DİKDÖRTGEN 3:4 &amp; #monolith-lancet-3x4
            </span>
          </div>
        );

      case 'gloss':
        return (
          <p className="type-body" style={{ margin: 0 }}>
            Monolitik{' '}
            <Gloss term="BÉTON BRUT">
              <span>béton brut</span>
            </Gloss>{' '}
            ve{' '}
            <Gloss term="FLYING BUTTRESS">
              <span data-state-preview="hover">uçan payanda</span>
            </Gloss>{' '}
            yük aktarım yolları.
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
                <span className="type-colophon">
                  PLAKA PERDESİ // {formatSurfaceLabel(surface)}
                </span>
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
            <span className="type-colophon">URL PARAMETRE EŞİTLEME // GÖRSEL OLMAYAN</span>
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
          <IsolatedSpecimen onClickCapture={preventLinkNavigation}>
            <SpecimenStream buildings={BUILDINGS.slice(0, 3)} />
          </IsolatedSpecimen>
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
                STRÜKTÜR: {stageStructure ? 'AÇIK' : 'KAPALI'}
              </button>
              <button
                type="button"
                className="btn-monolith"
                aria-pressed={stageAxis}
                onClick={() => setStageAxis((v) => !v)}
              >
                EKSEN: {stageAxis ? 'AÇIK' : 'KAPALI'}
              </button>
              <button
                type="button"
                className="btn-monolith"
                aria-pressed={stageDimensions}
                onClick={() => setStageDimensions((v) => !v)}
              >
                ÖLÇÜLER: {stageDimensions ? 'AÇIK' : 'KAPALI'}
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
          <IsolatedSpecimen
            className={styles.inertFramePage}
            inertFrame
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
              <span className="type-colophon">STATİK SAYFA ÖNİZLEMESİ // ANA SAYFA MONOGRAFİSİ</span>
              <span className="type-colophon">BAĞLANTILAR PASİF</span>
            </div>
          </IsolatedSpecimen>
        );

      case 'archive-client':
        return (
          <IsolatedSpecimen
            className={styles.inertFramePage}
            inertFrame
            suspended
            onClickCapture={(e) => e.preventDefault()}
          >
            <ArchiveClient totalCount={BUILDINGS.length} />
            <div className={styles.inertFrameOverlay}>
              <span className="type-colophon">STATİK SAYFA ÖNİZLEMESİ // ARŞİV DİZİNİ</span>
              <span className="type-colophon">BAĞLANTILAR PASİF</span>
            </div>
          </IsolatedSpecimen>
        );

      case 'anatomy-client':
        return (
          <IsolatedSpecimen
            className={styles.inertFramePage}
            inertFrame
            suspended
            onClickCapture={(e) => e.preventDefault()}
          >
            <AnatomyClient plates={PLATES_WITH_META} svgMarkupById={SVG_MARKUP_BY_ID} />
            <div className={styles.inertFrameOverlay}>
              <span className="type-colophon">STATİK SAYFA ÖNİZLEMESİ // ANATOMİ ÇALIŞMA ALANI</span>
              <span className="type-colophon">BAĞLANTILAR PASİF</span>
            </div>
          </IsolatedSpecimen>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.root} data-surface={previewSurface}>
      {/* -------------------------------------------------------------------
          Sequential Component Specifications (Designer Sheet)
         ------------------------------------------------------------------- */}
      <div className={styles.registryList}>
        {groupedRegistry.map((group, groupIndex) => (
          <section
            key={group.category}
            aria-labelledby={`cat-${groupIndex}`}
            className={styles.categoryGroup}
          >
            <header className={styles.categoryHeader}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {`0${groupIndex + 1} // BÖLÜM`}
              </span>
              <h3 id={`cat-${groupIndex}`} className="type-subhead">
                {CATEGORY_LABELS_TR[group.category]}
              </h3>
            </header>

            <div className={styles.categoryItems}>
              {group.items.map((entry) => {
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
                          {CATEGORY_LABELS_TR[entry.category]}
                        </span>
                        <h4 id={`comp-${entry.id}`} className={`type-subhead ${styles.cardTitle}`}>
                          {entry.name}
                        </h4>
                        <p className={`type-body ${styles.cardDesc}`}>{entry.description}</p>
                      </div>
                      <p className={styles.cardUsageNote}>{entry.usageNote}</p>
                    </header>

                    {/* Dual-Surface Live Preview or Framed Full-Width Specimen */}
                    {isWideSingle ? (
                      <div className={styles.dualSurfaceSingle}>
                        <div className={styles.surfacePane} data-surface={previewSurface}>
                          <div className={styles.surfacePaneBar}>
                            <span className="type-colophon">
                              ÖRNEK // YÜZEY: {formatSurfaceLabel(previewSurface)}
                            </span>
                          </div>
                          <div className={styles.surfacePaneBody}>
                            {renderSingleWideSpecimen(entry)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.dualSurface}>
                        {(['void', 'plaster'] as const).map((surface) => (
                          <div key={surface} className={styles.surfacePane} data-surface={surface}>
                            <div className={styles.surfacePaneBar}>
                              <span className="type-colophon">
                                YÜZEY: {formatSurfaceLabel(surface)}
                              </span>
                            </div>
                            <div className={styles.surfacePaneBody}>
                              {renderDualSurfaceSpecimen(entry, surface)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* -------------------------------------------------------------------
          UI Primitives & Architectural Specimens (Static All-States Matrix)
         ------------------------------------------------------------------- */}
      <section aria-labelledby="primitives-heading" className={styles.primitivesSection}>
        <div className={styles.primitivesHeader}>
          <h3 id="primitives-heading" className="type-subhead">
            ARAYÜZ PRİMİTİFLERİ VE ETKİLEŞİM DURUMLARI
          </h3>
          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            TÜM DURUMLAR YAN YANA
          </span>
        </div>

        <div className={styles.primitivesGrid}>
          {/* 1. Buttons (Primary / Secondary across all states) */}
          <div className={`${styles.primitiveCard} ${styles.primitiveCardWide}`}>
            <div className={styles.cardHeader}>
              <h4 className="type-colophon">01 // DÜĞMELER — BİRİNCİL VE İKİNCİL DURUMLAR</h4>
            </div>
            <div className={styles.dualSurface}>
              {(['void', 'plaster'] as const).map((surface) => (
                <div key={surface} className={styles.surfacePane} data-surface={surface}>
                  <div className={styles.surfacePaneBar}>
                    <span className="type-colophon">
                      YÜZEY: {formatSurfaceLabel(surface)}
                    </span>
                  </div>
                  <div className={styles.surfacePaneBody}>
                    <div className={styles.stateMatrixGrid}>
                      {(
                        [
                          { label: 'VARSAYILAN', attr: undefined, pressed: undefined, disabled: false },
                          { label: 'ÜZERİNDE', attr: 'hover', pressed: undefined, disabled: false },
                          {
                            label: 'ODAK',
                            attr: 'focus-visible',
                            pressed: undefined,
                            disabled: false,
                          },
                          { label: 'BASILI', attr: undefined, pressed: true, disabled: false },
                          { label: 'DEVRE DIŞI', attr: undefined, pressed: undefined, disabled: true },
                        ] as const
                      ).map((st) => (
                        <div key={st.label} className={styles.stateMatrixCell}>
                          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                            {st.label}
                          </span>
                          <div className={styles.specimenRow}>
                            <button
                              type="button"
                              className="btn-monolith btn-monolith--primary"
                              data-state-preview={st.attr}
                              aria-pressed={st.pressed}
                              disabled={st.disabled}
                            >
                              BİRİNCİL
                            </button>
                            <button
                              type="button"
                              className="btn-monolith"
                              data-state-preview={st.attr}
                              aria-pressed={st.pressed}
                              disabled={st.disabled}
                            >
                              İKİNCİL
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Links & Breadcrumb */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">02 // BAĞLANTILAR VE KONUM İZİ</h4>
            <nav aria-label="Konum izi örneği">
              <ol className={styles.breadcrumbList}>
                <li>
                  <a
                    href="#archive"
                    className="type-colophon"
                    onClick={(e) => e.preventDefault()}
                  >
                    ARŞİV
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
                    BRÜTALİST
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
              Satır içi editoryal{' '}
              <a href="#specimen-link" onClick={(e) => e.preventDefault()}>
                yapısal monografi bağlantısı
              </a>{' '}
              ve etkin rota işaretçisi.
            </p>
          </div>

          {/* 3. Filter Selects & Search Input (All States) */}
          <div className={styles.primitiveCard}>
            <div className={styles.cardHeader}>
              <h4 className="type-colophon">03 // ARAMA VE FİLTRE ALANLARI</h4>
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-search-default" className={`type-colophon ${styles.fieldLabel}`}>
                KATALOGDA ARA — VARSAYILAN
              </label>
              <input
                id="ds-search-default"
                type="search"
                readOnly
                className={styles.inputControl}
                value="TRELLICK"
                placeholder="TRELLICK, CHARTRES, BETON..."
              />
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-search-focus" className={`type-colophon ${styles.fieldLabel}`}>
                KATALOGDA ARA — ODAK
              </label>
              <input
                id="ds-search-focus"
                type="search"
                readOnly
                className={styles.inputControl}
                value="BRUTALIST"
                data-state-preview="focus-visible"
              />
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-search-error" className={`type-colophon ${styles.fieldLabel}`}>
                KATALOGDA ARA — HATA VE DEVRE DIŞI
              </label>
              <input
                id="ds-search-error"
                type="search"
                readOnly
                className={styles.inputControl}
                value="BILINMEYEN_SORGU"
                aria-invalid="true"
              />
              <span className={styles.fieldError}>HATA // SORGU SÖZDİZİMİ TANINMADI</span>
            </div>
            <div className={styles.fieldStack}>
              <label htmlFor="ds-select-sample" className={`type-colophon ${styles.fieldLabel}`}>
                AKIM FİLTRESİ
              </label>
              <select
                id="ds-select-sample"
                className={styles.selectControl}
                defaultValue="ALL"
              >
                <option value="ALL">TÜM AKIMLAR (27)</option>
                <option value="Brutalist">BRÜTALİST</option>
                <option value="Gothic">GOTİK</option>
                <option value="Monumental">ANITSAL</option>
              </select>
            </div>
          </div>

          {/* 4. [ PLATE ] / [ INDEX ] View Toggle & Anatomy Tabs + Layer Toggles */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">04 // GÖRÜNÜM GEÇİŞİ VE ANATOMİ SEKMELERİ</h4>
            <div className={styles.viewToggle} role="group" aria-label="Arşiv görünüm modu">
              <button
                type="button"
                className={styles.viewToggleBtn}
                aria-pressed={viewMode === 'plate'}
                onClick={() => setViewMode('plate')}
              >
                [ PLAKA ]
              </button>
              <button
                type="button"
                className={styles.viewToggleBtn}
                aria-pressed={viewMode === 'index'}
                onClick={() => setViewMode('index')}
              >
                [ DİZİN ]
              </button>
            </div>

            <div className={styles.tabList} role="tablist" aria-label="Anatomi akım sekmeleri">
              {(['ALL', 'Brutalist', 'Gothic', 'Monumental'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  className={styles.tabBtn}
                  aria-selected={anatomyTab === tab}
                  onClick={() => setAnatomyTab(tab)}
                >
                  {tab === 'ALL'
                    ? 'TÜM PLAKALAR'
                    : tab === 'Brutalist'
                      ? 'BRÜTALİST'
                      : tab === 'Gothic'
                        ? 'GOTİK'
                        : 'ANITSAL'}
                </button>
              ))}
            </div>

            <div className={styles.specimenRow}>
              {(
                [
                  { key: 'structure', label: 'STRÜKTÜR' },
                  { key: 'axis', label: 'EKSEN' },
                  { key: 'dimensions', label: 'ÖLÇÜLER' },
                ] as const
              ).map((layer) => (
                <button
                  key={layer.key}
                  type="button"
                  className="btn-monolith"
                  aria-pressed={layerToggles[layer.key]}
                  onClick={() =>
                    setLayerToggles((prev) => ({ ...prev, [layer.key]: !prev[layer.key] }))
                  }
                >
                  {layer.label}: {layerToggles[layer.key] ? 'AÇIK' : 'KAPALI'}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Archive Table Row & Mobile Slip */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">05 // ARŞİV TABLO SATIRI VE MOBİL KART</h4>
            <div className={styles.tableWrap}>
              <table className={styles.propsTable}>
                <thead>
                  <tr>
                    <th scope="col">KAT.</th>
                    <th scope="col">YAPI</th>
                    <th scope="col">YÜK.</th>
                    <th scope="col">YIL</th>
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
            <h4 className="type-colophon">06 // PLAKA KESİTLERİ (3/4 · SİVRİ KEMER · TRAM)</h4>
            <div className={styles.cropGrid}>
              <div className={styles.cropCard}>
                <div className={styles.cropFrame}>
                  <img
                    className="plate-img"
                    src={sampleBuilding.imagePath}
                    alt={sampleBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">3/4 DİKDÖRTGEN</span>
              </div>
              <div className={styles.cropCard}>
                <div className={`${styles.cropFrame} plate-arch-lancet`}>
                  <img
                    className="plate-img"
                    src={gothicBuilding.imagePath}
                    alt={gothicBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">SİVRİ KEMER</span>
              </div>
              <div className={styles.cropCard}>
                <div className={`${styles.cropFrame} plate-halftone`}>
                  <img
                    className="plate-img"
                    src={sampleBuilding.imagePath}
                    alt={sampleBuilding.imageAlt}
                  />
                </div>
                <span className="type-colophon">1-BİT TRAM</span>
              </div>
            </div>
          </div>

          {/* 7. Colophon <dl> Ledger, Observation Row & calloutMetricBox */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">07 // KÜNYE CETVELİ, GÖZLEM VE ÖLÇÜ KUTUSU</h4>
            <dl className={styles.ledgerList}>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>KAT. NO.</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.catalogNumber}
                </dd>
              </div>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>YÜKSEKLİK</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.dimensions.heightLabel}
                </dd>
              </div>
              <div className={styles.ledgerItem}>
                <dt className={`type-colophon ${styles.ledgerDt}`}>KOORDİNATLAR</dt>
                <dd className={`type-colophon tabular-nums ${styles.ledgerDd}`}>
                  {sampleBuilding.coordinates.dmsFormatted}
                </dd>
              </div>
            </dl>

            <div className={styles.observationRow}>
              <span className="type-colophon">01 // AYRIK SERVİS ÇEKİRDEĞİ</span>
              <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Her üç katta bir betonarme gökyüzü köprüleriyle ana kütleye bağlanır.
              </span>
            </div>

            <div className={styles.calloutMetricBox}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                BİRİNCİL VERİ
              </span>
              <span className="type-display tabular-nums">98.0 M</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                DİKEY SERVİS KULESİ YÜKSEKLİĞİ
              </span>
            </div>
          </div>

          {/* 8. Inert Drawer Specimen */}
          <div className={styles.primitiveCard}>
            <h4 className="type-colophon">08 // MOBİL ÇEKMECE MENÜ ÖRNEĞİ</h4>
            <div className={styles.drawerSpecimen} inert aria-hidden="true">
              <div className={styles.drawerSpecimenHeader}>
                <span className="type-colophon">MONOLITH // GEZİNTİ</span>
                <span className="type-colophon">[ KAPAT ]</span>
              </div>
              <span className="type-subhead">01 ANA SAYFA — AFİŞ SERGİSİ</span>
              <span className="type-subhead">02 ARŞİV — 27 KATALOGLANMIŞ YAPI</span>
              <span className="type-subhead">03 ANATOMİ — ÖLÇÜLÜ KESİTLER</span>
            </div>
          </div>

          {/* 9. Empty / Error States */}
          <div className={`${styles.primitiveCard} ${styles.primitiveCardWide}`}>
            <h4 className="type-colophon">09 // BOŞ VE HATA DURUMLARI</h4>
            <div className={styles.errorGrid}>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>HATA 404</span>
                <strong className="type-subhead">PLAKA BULUNAMADI</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  İstenen katalog kısa adı MONOLITH dizininde yer almıyor.
                </span>
              </div>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>SIFIR SONUÇ</span>
                <strong className="type-subhead">EŞLEŞEN YAPI YOK</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  27 plakanın tamamını geri yüklemek için etkin akım, malzeme veya dönem filtrelerini temizleyin.
                </span>
              </div>
              <div className={styles.errorCard}>
                <span className={`type-colophon ${styles.errorCode}`}>PLAKA YÜKLENEMEDİ</span>
                <strong className="type-subhead">ORTOGRAFİK YEDEK</strong>
                <span className={styles.metaText} style={{ color: 'var(--ink-secondary)' }}>
                  Vektör plaka kodu kullanılamıyor; public/plates içindeki SVG dosya yolunu doğrulayın.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
