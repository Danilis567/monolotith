'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import type { AnatomyPlateRecord } from '@/data/anatomyPlates';
import type { AnatomyPlateId, Movement } from '@/data/buildings';
import { CornerCrosshair } from './DraftingMarks';
import { UrlParamSync } from './UrlParamSync';
import styles from '@/app/anatomy/anatomy.module.css';

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
  { id: 'ALL', label: 'ALL PLATES (09)' },
  { id: 'Brutalist', label: '01 / BRUTALIST (03)' },
  { id: 'Gothic', label: '02 / GOTHIC (03)' },
  { id: 'Monumental', label: '03 / MONUMENTAL (03)' },
];

export function AnatomyClient({ plates, svgMarkupById }: AnatomyClientProps) {
  const router = useRouter();

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [surfaceMode, setSurfaceMode] = useState<'plaster' | 'void'>('plaster');
  const [activeTab, setActiveTab] = useState<MovementTab>('ALL');
  const [selectedId, setSelectedId] = useState<AnatomyPlateId>(plates[0].id);

  const syncPlateFromUrl = useCallback(
    (val: string | null) => {
      if (val && plates.some((p) => p.id === val)) {
        setSelectedId(val as AnatomyPlateId);
      }
    },
    [plates]
  );

  const [showStructure, setShowStructure] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  const visiblePlates =
    activeTab === 'ALL' ? plates : plates.filter((p) => p.movement === activeTab);

  const activePlate =
    visiblePlates.find((p) => p.id === selectedId) ?? visiblePlates[0] ?? plates[0];

  const selectPlate = (plate: PlateMetaItem) => {
    setSelectedId(plate.id);
    setAnnouncement(`Selected ${plate.plateNumber}: ${plate.buildingName}`);
    router.replace(`/anatomy?plate=${encodeURIComponent(plate.id)}`, { scroll: false });
  };

  const handleTabChange = (tab: MovementTab) => {
    setActiveTab(tab);
    const nextList = tab === 'ALL' ? plates : plates.filter((p) => p.movement === tab);
    if (!nextList.some((p) => p.id === selectedId) && nextList[0]) {
      setSelectedId(nextList[0].id);
    }
  };

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
      setAnnouncement(`Layer Load & Axis ${next ? 'visible' : 'dimmed'}`);
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
    <div className={styles.anatomyPage} data-surface={surfaceMode}>
      <UrlParamSync paramKey="plate" onRead={syncPlateFromUrl} />
      {/* Header */}
      <section className={styles.headerBand}>
        <div className="monolith-grid">
          <div className={styles.headerInner}>
            <div style={{ display: 'grid', gap: '0.625rem' }}>
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
                <span>SECTION 03 — STRUCTURAL ANATOMY</span>
              </p>
              <h1 className="type-display">STRUCTURAL ANATOMY</h1>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() =>
                  setSurfaceMode((prev) => (prev === 'plaster' ? 'void' : 'plaster'))
                }
                aria-pressed={surfaceMode === 'void'}
                className="btn-monolith"
              >
                <span>
                  SURFACE: {surfaceMode === 'plaster' ? 'PLASTER PAPER' : 'VOID BLUEPRINT'}
                </span>
                <span aria-hidden="true">[ / ]</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Movement Filter Tabs */}
      <div className={styles.controlsBand}>
        <div className={`${styles.tabBar} ${styles.controlsInner}`}>
          <div
            role="tablist"
            aria-label="Filter anatomical drawings by architectural movement"
            className={styles.tabsGroup}
          >
            {TABS.map((tab, idx) => {
              const isSelected = activeTab === tab.id;
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
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            03 / ANATOMY · ORTHOGRAPHIC PROJECTION · SCALE 1:200 TO 1:1000
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
          <div className={styles.workbenchGrid}>
            {/* Left Plate Selector List */}
            <aside className={styles.plateSelectorCol} aria-label="Registered anatomy plates">
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
                      STRUCTURAL MASS
                    </button>
                    <button
                      type="button"
                      aria-pressed={showAxis}
                      onClick={() => toggleLayer('axis')}
                      className={`${styles.layerBtn} type-colophon ${
                        showAxis ? styles.layerBtnActive : ''
                      }`}
                    >
                      LOAD &amp; AXIS
                    </button>
                    <button
                      type="button"
                      aria-pressed={showDimensions}
                      onClick={() => toggleLayer('dimensions')}
                      className={`${styles.layerBtn} type-colophon ${
                        showDimensions ? styles.layerBtnActive : ''
                      }`}
                    >
                      DIMENSIONS
                    </button>
                  </div>
                </fieldset>

                <button
                  type="button"
                  onClick={resetLayers}
                  className="type-colophon"
                  style={{
                    minBlockSize: '44px',
                    background: 'transparent',
                    border: 0,
                    cursor: 'pointer',
                    padding: '0.5rem',
                    color: 'var(--signal-ink)',
                  }}
                >
                  ALL LAYERS [ RESET ]
                </button>
              </div>

              <span className="visually-hidden" aria-live="polite">
                {announcement}
              </span>

              {/* Inline Orthographic SVG Plate */}
              <div className={styles.svgViewport}>
                <CornerCrosshair
                  style={{
                    position: 'absolute',
                    insetBlockStart: 4,
                    insetInlineStart: 4,
                    color: 'var(--ink-secondary)',
                    pointerEvents: 'none',
                  }}
                />
                <CornerCrosshair
                  style={{
                    position: 'absolute',
                    insetBlockEnd: 4,
                    insetInlineEnd: 4,
                    color: 'var(--ink-secondary)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  className={styles.svgContainer}
                  data-show-structure={showStructure}
                  data-show-axis={showAxis}
                  data-show-dimensions={showDimensions}
                  dangerouslySetInnerHTML={{
                    __html: svgMarkupById[activePlate.id] ?? '',
                  }}
                />
              </div>

              <div className={`${styles.legendRow} type-colophon`}>
                <span>SOLID INK: LOAD-BEARING SECTION &amp; MASS</span>
                <span style={{ color: 'var(--signal-ink)' }}>
                  VERMILION AXIS: THRUST LINE &amp; SYMMETRY
                </span>
                <span>{activePlate.scale} · DATUM {activePlate.datumElevation}</span>
              </div>

              <p className="type-body-lead">{activePlate.description}</p>

              {/* Callout Annotations */}
              <div className={styles.calloutGrid}>
                {activePlate.callouts.map((callout) => (
                  <div key={callout.code} className={`${styles.calloutCell} ${styles.calloutCard}`}>
                    <div className={`${styles.calloutHeader} type-colophon`}>
                      <span className={styles.calloutBadge}>REF {callout.code}</span>
                      <span style={{ color: 'var(--signal-ink)' }}>{callout.value}</span>
                    </div>
                    <h3 className="type-ui-label">{callout.label}</h3>
                    <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                      {callout.notes}
                    </p>
                  </div>
                ))}
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
                      {activePlate.dimensionsSchedule.map((row) => (
                        <tr key={row.parameter}>
                          <td className="type-colophon">{row.parameter}</td>
                          <td className="type-colophon tabular-nums" style={{ color: 'var(--signal-ink)' }}>
                            {row.metricValue}
                          </td>
                          <td className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                            {row.structuralRole}
                          </td>
                        </tr>
                      ))}
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
