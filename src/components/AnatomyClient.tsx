'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { AnatomyDimensionRow, AnatomyPlateRecord } from '@/data/anatomyPlates';
import type { AnatomyPlateId, Movement } from '@/data/buildings';
import { AnatomyStage } from './AnatomyStage';
import { Gloss } from './Gloss';
import { ReadingGuide } from './ReadingGuide';
import { UrlParamSync } from './UrlParamSync';
import styles from '@/app/(site)/anatomy/anatomy.module.css';

interface PlateMetaItem extends AnatomyPlateRecord {
  movement: Movement;
  slug: string;
}

interface AnatomyClientProps {
  plates: PlateMetaItem[];
  svgMarkupById: Record<AnatomyPlateId, string>;
}

type MovementTab = 'ALL' | Movement;

const TABS: { id: MovementTab; label: string }[] = [
  { id: 'ALL', label: 'ALL PLATES' },
  { id: 'Brutalist', label: 'BRUTALIST' },
  { id: 'Gothic', label: 'GOTHIC' },
  { id: 'Monumental', label: 'MONUMENTAL' },
];

export function AnatomyClient({ plates, svgMarkupById }: AnatomyClientProps) {
  const router = useRouter();

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<MovementTab>('ALL');
  const [selectedId, setSelectedId] = useState<AnatomyPlateId>(plates[0].id);
  const [showStructure, setShowStructure] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [selectedCalloutCode, setSelectedCalloutCode] = useState<string | null>(null);
  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobilePlatesOpen, setMobilePlatesOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const syncPlateFromUrl = useCallback(
    (val: string | null) => {
      if (val && plates.some((p) => p.id === val)) {
        setSelectedId(val as AnatomyPlateId);
        setSelectedCalloutCode(null);
        setSelectedDimensionId(null);
      }
    },
    [plates]
  );

  const visiblePlates =
    activeTab === 'ALL' ? plates : plates.filter((p) => p.movement === activeTab);

  const activePlate =
    visiblePlates.find((p) => p.id === selectedId) ?? visiblePlates[0] ?? plates[0];

  const getDimensionId = useCallback(
    (row: AnatomyDimensionRow, index: number) => row.id ?? row.parameter ?? `dim-${index}`,
    []
  );

  // Lock body scroll in fullscreen and close on Escape
  useEffect(() => {
    if (!isFullscreen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setAnnouncement('Exited fullscreen drafting view');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const selectPlate = (plate: PlateMetaItem) => {
    setSelectedId(plate.id);
    setSelectedCalloutCode(null);
    setSelectedDimensionId(null);
    setMobilePlatesOpen(false);
    setAnnouncement(`Selected ${plate.plateNumber}: ${plate.buildingName}`);
    router.replace(`/anatomy?plate=${encodeURIComponent(plate.id)}`, { scroll: false });
  };

  const handleTabChange = (tab: MovementTab) => {
    setActiveTab(tab);
    const nextList = tab === 'ALL' ? plates : plates.filter((p) => p.movement === tab);
    if (!nextList.some((p) => p.id === selectedId) && nextList[0]) {
      setSelectedId(nextList[0].id);
      setSelectedCalloutCode(null);
      setSelectedDimensionId(null);
    }
  };

  const handleSelectCallout = (code: string | null) => {
    const next = code === null || selectedCalloutCode === code ? null : code;
    setSelectedCalloutCode(next);
    if (next === null) {
      setAnnouncement('Structural element inspector closed');
    } else {
      const match = activePlate.callouts.find((c) => c.code === next);
      if (match) {
        setAnnouncement(`Inspecting structural element ${match.code}: ${match.label}`);
      }
    }
  };

  const selectedCalloutIndex = activePlate.callouts.findIndex(
    (c) => c.code === selectedCalloutCode
  );
  const selectedCallout =
    selectedCalloutIndex >= 0 ? activePlate.callouts[selectedCalloutIndex] : null;

  const stepCallout = (direction: -1 | 1) => {
    const list = activePlate.callouts;
    if (list.length === 0) return;
    const currentIdx = selectedCalloutIndex >= 0 ? selectedCalloutIndex : 0;
    const nextIdx = (currentIdx + direction + list.length) % list.length;
    const nextCallout = list[nextIdx];
    setSelectedCalloutCode(nextCallout.code);
    setAnnouncement(`Inspecting structural element ${nextCallout.code}: ${nextCallout.label}`);
  };

  const handleSelectDimension = (id: string | null) => {
    const next = id === null || selectedDimensionId === id ? null : id;
    setSelectedDimensionId(next);
    if (next === null) {
      setAnnouncement('Dimension inspector cleared');
    } else {
      const match = activePlate.dimensionsSchedule.find(
        (row, idx) => getDimensionId(row, idx) === next
      );
      if (match) {
        setAnnouncement(`Inspecting dimension ${match.parameter}: ${match.metricValue}`);
      }
    }
  };

  const selectedDimension =
    activePlate.dimensionsSchedule.find(
      (row, idx) => getDimensionId(row, idx) === selectedDimensionId
    ) ?? null;

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      const next = !prev;
      setAnnouncement(next ? 'Entered fullscreen drafting view' : 'Exited fullscreen drafting view');
      return next;
    });
  }, []);

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = TABS.length - 1;
    }

    if (targetIndex !== null) {
      e.preventDefault();
      handleTabChange(TABS[targetIndex].id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  const toggleLayer = (layer: 'structure' | 'axis' | 'dimensions') => {
    if (layer === 'structure') {
      const next = !showStructure;
      setShowStructure(next);
      setAnnouncement(`Layer Structural Mass ${next ? 'visible' : 'dimmed'}`);
    } else if (layer === 'axis') {
      const next = !showAxis;
      setShowAxis(next);
      setAnnouncement(`Layer Axis and Load ${next ? 'visible' : 'dimmed'}`);
    } else {
      const next = !showDimensions;
      setShowDimensions(next);
      setAnnouncement(`Layer Dimensions ${next ? 'visible' : 'dimmed'}`);
    }
  };

  const resetLayers = () => {
    setShowStructure(true);
    setShowAxis(true);
    setShowDimensions(true);
    setAnnouncement('All drafting layers restored');
  };

  return (
    <div className={styles.anatomyPage} data-surface="void">
      <UrlParamSync paramKey="plate" onRead={syncPlateFromUrl} />
      {/* Header */}
      <section className={styles.headerBand}>
        <div className="monolith-grid">
          <div className={styles.headerInner}>
            <div style={{ display: 'grid', gap: '0.625rem', minInlineSize: 0 }}>
              <p
                className="type-colophon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--signal-ink)',
                }}
              >
                <span className="signal-dot" aria-hidden="true" />
                <span>STRUCTURAL ANATOMY</span>
              </p>
              <h1 className="type-display">STRUCTURAL ANATOMY</h1>
            </div>

            <ReadingGuide className={styles.headerGuide} />
          </div>
        </div>
      </section>

      {/* Movement Filter Tabs */}
      <div className={styles.controlsBand}>
        <div className={`${styles.tabBar} ${styles.controlsInner}`}>
          <div className={styles.filterRow}>
            <span className={`${styles.filterPrefix} type-colophon`}>
              FILTER BY MOVEMENT:
            </span>
            <div
              role="tablist"
              aria-label="Filter anatomical drawings by architectural movement"
              className={styles.tabsGroup}
            >
              {TABS.map((tab, idx) => {
                const isSelected = activeTab === tab.id;
                const count =
                  tab.id === 'ALL'
                    ? plates.length
                    : plates.filter((p) => p.movement === tab.id).length;
                const formattedCount = String(count).padStart(2, '0');
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="anatomy-plate-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleTabChange(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`${styles.tabButton} type-ui-label ${
                      isSelected ? styles.tabButtonActive : ''
                    }`}
                  >
                    {tab.label} ({formattedCount})
                  </button>
                );
              })}
            </div>
          </div>

          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            ANATOMY · ORTHOGRAPHIC PROJECTION · SCALE 1:200 TO 1:1000
          </span>
        </div>
      </div>

      {/* Main Drafting Workbench */}
      <section className={styles.workbenchBand} aria-labelledby="active-plate-heading">
        <div
          id="anatomy-plate-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="monolith-grid"
        >
          {/* Mobile Compact Plate Switcher (< 1024px) */}
          <div className={styles.mobilePlateBar}>
            <span className="type-colophon" style={{ minInlineSize: 0 }}>
              ACTIVE: {activePlate.plateNumber} · {activePlate.buildingName}
            </span>
            <button
              type="button"
              className={`${styles.mobilePlateToggle} type-colophon`}
              aria-expanded={mobilePlatesOpen}
              aria-controls="anatomy-plate-selector"
              onClick={() => setMobilePlatesOpen((prev) => !prev)}
            >
              CHANGE PLATE [ {mobilePlatesOpen ? '−' : '+'} ]
            </button>
          </div>

          <div className={styles.workbenchGrid}>
            {/* Left Plate Selector List */}
            <aside
              id="anatomy-plate-selector"
              className={styles.plateSelectorCol}
              data-mobile-open={mobilePlatesOpen}
              aria-label="Registered anatomy plates"
            >
              <div className={styles.plateSelectorList}>
                {visiblePlates.map((plate) => {
                  const isActive = plate.id === activePlate.id;
                  return (
                    <button
                      key={plate.id}
                      type="button"
                      onClick={() => selectPlate(plate)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`${styles.plateSelectBtn} ${
                        isActive ? styles.plateSelectBtnActive : ''
                      }`}
                    >
                      <span
                        className={`${styles.plateSelectOverline} type-colophon`}
                      >
                        <span>
                          {plate.plateNumber} · {plate.catalogNumber}
                        </span>
                        <span>{plate.scale}</span>
                      </span>
                      <span className="type-subhead">{plate.buildingName}</span>
                      <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                        {plate.drawingType.toUpperCase()} · {plate.chronology}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Interactive Drafting Stage */}
            <div className={styles.stagePanel}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '1rem',
                  borderBottom: '1px solid var(--border-structural)',
                  paddingBottom: '1rem',
                }}
              >
                <div style={{ display: 'grid', gap: '0.35rem', minInlineSize: 0 }}>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    {activePlate.plateNumber} · {activePlate.catalogNumber} ·{' '}
                    {activePlate.drawingType.toUpperCase()}
                  </span>
                  <h2 id="active-plate-heading" className="type-subhead">
                    {activePlate.buildingName} — {activePlate.title}
                  </h2>
                  <p className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                    {activePlate.architect.toUpperCase()} · DATUM {activePlate.datumElevation}
                  </p>
                </div>

                <Link href={`/structures/${activePlate.slug}`} className="btn-monolith">
                  <span>OPEN STRUCTURE MONOGRAPH</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Layer Toggle Toolbar */}
              <div className={styles.layerToolbar}>
                <p className={`${styles.layerInstruction} type-colophon`}>
                  TOGGLE LAYERS TO READ THE <Gloss term="LOAD PATH" />
                </p>

                <div className={styles.layerControlsRow}>
                  <fieldset className={styles.layerFieldset}>
                    <legend className="visually-hidden">DRAFTING LAYERS</legend>
                    <div className={styles.layerButtons}>
                      <button
                        type="button"
                        aria-pressed={showStructure}
                        onClick={() => toggleLayer('structure')}
                        className={`${styles.layerBtn} type-colophon ${
                          showStructure ? styles.layerBtnActive : ''
                        }`}
                      >
                        <span
                          className={styles.layerBtnTitle}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <span className={styles.layerSwatchStructure} aria-hidden="true" />
                          <span>STRUCTURAL MASS</span>
                        </span>
                        <span className={styles.layerBtnSub}>
                          the building&apos;s solid mass
                        </span>
                      </button>
                      <button
                        type="button"
                        aria-pressed={showAxis}
                        onClick={() => toggleLayer('axis')}
                        className={`${styles.layerBtn} type-colophon ${
                          showAxis ? styles.layerBtnActive : ''
                        }`}
                      >
                        <span
                          className={styles.layerBtnTitle}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <span className={styles.layerSwatchAxis} aria-hidden="true" />
                          <span>AXIS &amp; LOAD</span>
                        </span>
                        <span className={styles.layerBtnSub}>
                          lines showing how weight travels
                        </span>
                      </button>
                      <button
                        type="button"
                        aria-pressed={showDimensions}
                        onClick={() => toggleLayer('dimensions')}
                        className={`${styles.layerBtn} type-colophon ${
                          showDimensions ? styles.layerBtnActive : ''
                        }`}
                      >
                        <span
                          className={styles.layerBtnTitle}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <span className={styles.layerSwatchDimensions} aria-hidden="true" />
                          <span>DIMENSIONS</span>
                        </span>
                        <span className={styles.layerBtnSub}>
                          measured heights and spans
                        </span>
                      </button>
                    </div>
                  </fieldset>

                  <button
                    type="button"
                    onClick={resetLayers}
                    className={`${styles.layerResetBtn} type-colophon`}
                  >
                    ALL LAYERS [ RESET ]
                  </button>
                </div>
              </div>

              <span className="visually-hidden" aria-live="polite">
                {announcement}
              </span>

              {/* Interactive Orthographic SVG Stage */}
              <AnatomyStage
                svgMarkup={svgMarkupById[activePlate.id] ?? ''}
                callouts={activePlate.callouts}
                dimensions={activePlate.dimensionsSchedule}
                showStructure={showStructure}
                showAxis={showAxis}
                showDimensions={showDimensions}
                selectedCalloutCode={selectedCalloutCode}
                selectedDimensionId={selectedDimensionId}
                onSelectCallout={handleSelectCallout}
                onSelectDimension={handleSelectDimension}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                plateTitle={`${activePlate.buildingName} — ${activePlate.title}`}
                plateScale={activePlate.scale}
              />

              {/* Real Dimension Line Inspector */}
              <div
                className={styles.dimensionInspector}
                role="region"
                aria-label="Dimension line inspector"
              >
                {selectedDimension ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                        PARAMETER: {selectedDimension.parameter}
                      </span>
                      <span className="type-colophon tabular-nums">
                        METRIC VALUE: {selectedDimension.metricValue}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectDimension(null)}
                        className="btn-monolith type-colophon"
                        style={{ minBlockSize: '44px' }}
                      >
                        [ CLEAR ]
                      </button>
                    </div>
                    <p className="type-body" style={{ margin: 0, color: 'var(--ink-secondary)' }}>
                      <strong className="type-colophon" style={{ color: 'var(--ink-primary)' }}>
                        STRUCTURAL ROLE:{' '}
                      </strong>
                      {selectedDimension.structuralRole}
                    </p>
                  </>
                ) : (
                  <p className="type-colophon" style={{ margin: 0, color: 'var(--ink-secondary)' }}>
                    SELECT ANY DIMENSION LINE ON THE DRAWING OR ROW BELOW TO INSPECT
                  </p>
                )}
              </div>

              <div className={`${styles.legendRow} type-colophon`}>
                <span>SOLID INK: LOAD-BEARING SECTION &amp; MASS</span>
                <span style={{ color: 'var(--signal-ink)' }}>
                  VERMILION AXIS: THRUST LINE &amp; SYMMETRY
                </span>
                <span>{activePlate.scale} · DATUM {activePlate.datumElevation}</span>
              </div>

              <div
                className={styles.whatYouSeeBlock}
                role="note"
                aria-label="What you are looking at"
              >
                <span className={`${styles.whatYouSeeLabel} type-colophon`}>
                  WHAT YOU ARE LOOKING AT
                </span>
                <p className={`${styles.whatYouSeeText} type-body`}>
                  {activePlate.whatYouSee}
                </p>
              </div>

              <p className="type-body-lead">{activePlate.description}</p>

              {/* Structural Element Inspector */}
              {selectedCallout && (
                <div
                  className={styles.calloutInspector}
                  role="region"
                  aria-label="Structural element inspector"
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'grid', gap: '0.25rem', minInlineSize: 0 }}>
                      <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                        STRUCTURAL ELEMENT: {selectedCallout.code} · {selectedCallout.label}
                      </span>
                      <span className="type-colophon tabular-nums">{selectedCallout.value}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => stepCallout(-1)}
                        aria-label="Previous structural element"
                        className="btn-monolith type-colophon"
                        style={{ minBlockSize: '44px' }}
                      >
                        PREV
                      </button>
                      <button
                        type="button"
                        onClick={() => stepCallout(1)}
                        aria-label="Next structural element"
                        className="btn-monolith type-colophon"
                        style={{ minBlockSize: '44px' }}
                      >
                        NEXT
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectCallout(null)}
                        aria-label="Close structural element inspector"
                        className="btn-monolith type-colophon"
                        style={{ minBlockSize: '44px' }}
                      >
                        [ × ]
                      </button>
                    </div>
                  </div>
                  <p className="type-body" style={{ margin: 0, color: 'var(--ink-secondary)' }}>
                    {selectedCallout.notes}
                  </p>
                </div>
              )}

              {/* Callout Annotations */}
              <div className={styles.calloutGrid}>
                {activePlate.callouts.map((callout) => {
                  const isSelected = callout.code === selectedCalloutCode;
                  return (
                    <button
                      key={callout.code}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelectCallout(callout.code)}
                      className={`${styles.calloutCell} ${styles.calloutCard} ${
                        isSelected ? styles.calloutCardActive : ''
                      }`}
                      style={{ textAlign: 'left', cursor: 'pointer' }}
                    >
                      <span className={`${styles.calloutHeader} type-colophon`}>
                        <span className={styles.calloutBadge}>
                          {callout.code} · STRUCTURAL CALLOUT
                        </span>
                        <span style={{ color: 'var(--signal-ink)' }}>{callout.value}</span>
                      </span>
                      <span className="type-ui-label">{callout.label}</span>
                      <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                        {callout.notes}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Collapsible Structural Dimension Schedule */}
              <details className={styles.scheduleDetails} open>
                <summary className={`${styles.scheduleSummary} type-colophon`}>
                  <span>STRUCTURAL DIMENSION SCHEDULE ({activePlate.dimensionsSchedule.length} PARAMETERS)</span>
                  <span aria-hidden="true">[ ± ]</span>
                </summary>

                <div className={styles.scheduleTableWrap}>
                  <table className={styles.scheduleTable}>
                    <thead>
                      <tr className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                        <th scope="col">PARAMETER</th>
                        <th scope="col">METRIC VALUE</th>
                        <th scope="col">STRUCTURAL ROLE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePlate.dimensionsSchedule.map((row, idx) => {
                        const dimId = getDimensionId(row, idx);
                        const isSelected = dimId === selectedDimensionId;
                        return (
                          <tr
                            key={dimId}
                            aria-selected={isSelected}
                            className={isSelected ? styles.scheduleRowActive : undefined}
                            onClick={(e) => {
                              if ((e.target as HTMLElement).closest('button')) return;
                              handleSelectDimension(dimId);
                            }}
                          >
                            <td className="type-colophon">
                              <button
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => handleSelectDimension(dimId)}
                                className={`${styles.scheduleRowBtn} type-colophon`}
                                style={{ minBlockSize: '44px' }}
                              >
                                {row.parameter}
                              </button>
                            </td>
                            <td
                              className="type-colophon tabular-nums"
                              style={{ color: 'var(--signal-ink)' }}
                            >
                              {row.metricValue}
                            </td>
                            <td className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                              {row.structuralRole}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
