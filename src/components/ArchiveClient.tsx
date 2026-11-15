'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { UrlParamSync } from './UrlParamSync';
import {
  CONTINENTS,
  MOVEMENTS,
  type BuildingRecord,
  type Continent,
  type Movement,
} from '@/data/buildings';
import {
  ERA_FILTER_OPTIONS,
  MATERIAL_FILTER_OPTIONS,
  SORT_OPTIONS,
  filterAndSortBuildings,
  type EraBucket,
  type MaterialBucket,
  type SortOption,
} from '@/lib/archiveFilters';
import { getApertureClassName, getPlateAperture } from '@/lib/plateGeometry';
import styles from '@/app/archive/archive.module.css';

type ViewMode = 'plate' | 'index';

const CADENCE_SLOTS = ['lead', 'companion', 'trio-a', 'trio-b', 'trio-c'] as const;

export function ArchiveClient({ totalCount }: { totalCount: number }) {
  const router = useRouter();

  const [queryText, setQueryText] = useState('');
  const [movement, setMovement] = useState<'ALL' | Movement>('ALL');
  const [continent, setContinent] = useState<'ALL' | Continent>('ALL');
  const [material, setMaterial] = useState<MaterialBucket>('ALL MATERIALS');
  const [era, setEra] = useState<EraBucket>('ALL ERAS');
  const [sort, setSort] = useState<SortOption>('CAT_ASC');
  const [viewMode, setViewMode] = useState<ViewMode>('plate');
  const [activeIndexId, setActiveIndexId] = useState<string>('ARC-001');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const syncMovementFromUrl = useCallback((val: string | null) => {
    if (val && MOVEMENTS.includes(val as Movement)) {
      setMovement(val as Movement);
    }
  }, []);

  const syncQueryFromUrl = useCallback((val: string | null) => {
    if (val) {
      setQueryText(val);
    }
  }, []);

  const syncViewFromUrl = useCallback((val: string | null) => {
    if (val === 'plate' || val === 'index') {
      setViewMode(val);
    }
  }, []);

  const filteredBuildings = useMemo(
    () =>
      filterAndSortBuildings({
        q: queryText,
        movement,
        continent,
        material,
        era,
        sort,
      }),
    [queryText, movement, continent, material, era, sort]
  );

  const previewBuilding: BuildingRecord | undefined =
    filteredBuildings.find((b) => b.id === activeIndexId) ?? filteredBuildings[0];

  const handleMovementChange = (value: 'ALL' | Movement) => {
    setMovement(value);
    if (value === 'ALL') {
      router.replace('/archive', { scroll: false });
    } else {
      router.replace(`/archive?movement=${encodeURIComponent(value)}`, { scroll: false });
    }
  };

  const handleViewModeChange = (nextView: ViewMode) => {
    setViewMode(nextView);
    const params = new URLSearchParams();
    if (movement !== 'ALL') params.set('movement', movement);
    if (nextView === 'index') params.set('view', 'index');
    const qs = params.toString();
    router.replace(qs ? `/archive?${qs}` : '/archive', { scroll: false });
  };

  const resetAllFilters = () => {
    setQueryText('');
    setMovement('ALL');
    setContinent('ALL');
    setMaterial('ALL MATERIALS');
    setEra('ALL ERAS');
    setSort('CAT_ASC');
    router.replace('/archive', { scroll: false });
  };

  const hasActiveFilter =
    queryText.trim().length > 0 ||
    movement !== 'ALL' ||
    continent !== 'ALL' ||
    material !== 'ALL MATERIALS' ||
    era !== 'ALL ERAS' ||
    sort !== 'CAT_ASC';

  return (
    <>
      <UrlParamSync paramKey="movement" onRead={syncMovementFromUrl} />
      <UrlParamSync paramKey="q" onRead={syncQueryFromUrl} />
      <UrlParamSync paramKey="view" onRead={syncViewFromUrl} />
      {/* Header Band */}
      <section data-surface="dark" className={styles.headerBand}>
        <div className="monolith-grid">
          <div className={styles.headerInner}>
            <div style={{ display: 'grid', gap: '0.625rem' }}>
              <p
                className="type-colophon"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--signal-ink)' }}
              >
                <span className="signal-dot" aria-hidden="true" />
                <span>SECTION 02 — ARCHIVE VOLUME IV</span>
              </p>
              <h1 className="type-display">STRUCTURE INDEX</h1>
            </div>

            <div className={styles.headerCounter}>
              <span
                className="type-colophon tabular-nums"
                role="status"
                aria-live="polite"
                style={{ color: 'var(--ink-primary)' }}
              >
                SHOWING {String(filteredBuildings.length).padStart(2, '0')} OF{' '}
                {String(totalCount).padStart(2, '0')} STRUCTURES
              </span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                TAXONOMY: BRUTALIST · GOTHIC · MONUMENTAL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Switch Ledger */}
      <section
        data-surface="basalt"
        className={styles.filterBand}
        aria-label="Filter and sort archival plates"
      >
        <div className={styles.filterShell}>
          <div id="archive-filter-controls" className={styles.controlsRow} data-open={filtersOpen ? 'true' : 'false'}>
            <div className={styles.fieldGroup}>
              <label htmlFor="archive-search" className={`${styles.fieldLabel} type-colophon`}>
                SEARCH QUERY
              </label>
              <div className={styles.searchWrap}>
                <input
                  id="archive-search"
                  type="search"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="NAME, ARCHITECT, CITY, CAT..."
                  className={styles.input}
                  style={{ paddingInlineEnd: queryText ? '4.5rem' : '0.75rem' }}
                />
                {queryText.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQueryText('')}
                    className={`${styles.clearSearchBtn} type-colophon`}
                    aria-label="Clear search query"
                  >
                    CLEAR ×
                  </button>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="archive-movement" className={`${styles.fieldLabel} type-colophon`}>
                MOVEMENT
              </label>
              <select
                id="archive-movement"
                value={movement}
                onChange={(e) => handleMovementChange(e.target.value as 'ALL' | Movement)}
                className={styles.select}
              >
                <option value="ALL">ALL MOVEMENTS (27)</option>
                {MOVEMENTS.map((m) => (
                  <option key={m} value={m}>
                    {m.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="archive-continent" className={`${styles.fieldLabel} type-colophon`}>
                CONTINENT
              </label>
              <select
                id="archive-continent"
                value={continent}
                onChange={(e) => setContinent(e.target.value as 'ALL' | Continent)}
                className={styles.select}
              >
                <option value="ALL">ALL CONTINENTS</option>
                {CONTINENTS.map((c) => (
                  <option key={c} value={c}>
                    {c.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="archive-material" className={`${styles.fieldLabel} type-colophon`}>
                PRIMARY MATERIAL
              </label>
              <select
                id="archive-material"
                value={material}
                onChange={(e) => setMaterial(e.target.value as MaterialBucket)}
                className={styles.select}
              >
                {MATERIAL_FILTER_OPTIONS.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="archive-era" className={`${styles.fieldLabel} type-colophon`}>
                CHRONOLOGY
              </label>
              <select
                id="archive-era"
                value={era}
                onChange={(e) => setEra(e.target.value as EraBucket)}
                className={styles.select}
              >
                {ERA_FILTER_OPTIONS.map((eraItem) => (
                  <option key={eraItem} value={eraItem}>
                    {eraItem}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="archive-sort" className={`${styles.fieldLabel} type-colophon`}>
                SORT ORDER
              </label>
              <select
                id="archive-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className={styles.select}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.toolbarBottom}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                aria-expanded={filtersOpen}
                aria-controls="archive-filter-controls"
                onClick={() => setFiltersOpen((prev) => !prev)}
                className={`btn-monolith ${styles.mobileFilterToggle}`}
              >
                <span>FILTERS {filtersOpen ? '[ − ]' : '[ + ]'}</span>
              </button>
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="btn-monolith"
                >
                  <span>RESET FILTERS</span>
                  <span aria-hidden="true">×</span>
                </button>
              ) : (
                <span className={`type-colophon ${styles.filterSummaryText}`} style={{ color: 'var(--ink-secondary)' }}>
                  DEFAULT ORDER · CAT. 001 TO CAT. {String(totalCount).padStart(3, '0')}
                </span>
              )}
            </div>

            <div className={styles.toggleGroup} role="group" aria-label="Archive presentation mode">
              <button
                type="button"
                onClick={() => handleViewModeChange('plate')}
                aria-pressed={viewMode === 'plate'}
                data-surface={viewMode === 'plate' ? 'plaster' : undefined}
                className={`${styles.toggleButton} type-ui-label ${
                  viewMode === 'plate' ? styles.toggleButtonActive : ''
                }`}
              >
                {viewMode === 'plate' && <span className="signal-dot" aria-hidden="true" />}
                <span>[ PLATE ]</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange('index')}
                aria-pressed={viewMode === 'index'}
                data-surface={viewMode === 'index' ? 'plaster' : undefined}
                className={`${styles.toggleButton} type-ui-label ${
                  viewMode === 'index' ? styles.toggleButtonActive : ''
                }`}
              >
                {viewMode === 'index' && <span className="signal-dot" aria-hidden="true" />}
                <span>[ INDEX ]</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Display Section */}
      <section data-surface="dark" className={styles.catalogSection}>
        <div className="monolith-grid">
          {filteredBuildings.length === 0 ? (
            <div className={styles.emptyState} role="status">
              <p className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                × ERR 000 — NO STRUCTURES MATCH CURRENT QUERY
              </p>
              <h2 className="type-display">ZERO PLATES RETURNED</h2>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                No cataloged records correspond to the combined filter selection. Clear active
                constraints to restore all 27 surveyed structures.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-monolith btn-monolith--primary"
              >
                <span>RESET FILTERS</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>
          ) : viewMode === 'plate' ? (
            <div className={styles.asymPlateGrid}>
              {filteredBuildings.map((building, index) => {
                const cadence = CADENCE_SLOTS[index % CADENCE_SLOTS.length];
                const aperture = getPlateAperture(building);
                const useTallLancet = aperture === 'lancet' && cadence === 'companion';
                const apertureClass = getApertureClassName(aperture, useTallLancet);

                return (
                  <article
                    key={building.id}
                    data-cadence={cadence}
                    className={styles.plateCard}
                  >
                    <div className={cadence === 'lead' ? styles.leadSplit : undefined}>
                      <div className={styles.mediaStage}>
                        <Link
                          href={`/structures/${building.slug}`}
                          className={`plate-interactive-outer ${styles.mediaLink}`}
                          aria-label={`Open monograph ${building.catalogNumber}: ${building.name}`}
                        >
                          <div
                            className={`plate-frame plate-grain ${
                              useTallLancet ? styles.plateBox23 : styles.plateBox34
                            } ${apertureClass}`}
                          >
                            <Image
                              src={building.imagePath}
                              alt={building.imageAlt}
                              fill
                              priority={index < 9}
                              fetchPriority={index < 2 ? 'high' : undefined}
                              loading="eager"
                              sizes={
                                cadence === 'lead'
                                  ? '(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 35vw'
                                  : '(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 28vw'
                              }
                              className="plate-img"
                            />
                          </div>
                        </Link>
                      </div>

                      <div className={styles.cardBody}>
                        <div style={{ display: 'grid', gap: '0.875rem' }}>
                          <div className={styles.cardHeader}>
                            <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                              {building.catalogNumber} · {building.id}
                            </span>
                            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                              {building.movement.toUpperCase()}
                            </span>
                          </div>

                          <h2 className={styles.cardTitle}>
                            <Link href={`/structures/${building.slug}`}>{building.name}</Link>
                          </h2>

                          <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                            {building.summary}
                          </p>
                        </div>

                        <div style={{ display: 'grid', gap: '0.875rem' }}>
                          <div className={`${styles.cardMetaList} type-colophon`}>
                            <div className={styles.cardMetaRow}>
                              <span>ARCHITECT</span>
                              <span style={{ textAlign: 'right', color: 'var(--ink-primary)' }}>
                                {building.architect}
                              </span>
                            </div>
                            <div className={styles.cardMetaRow}>
                              <span>LOCATION</span>
                              <span style={{ textAlign: 'right', color: 'var(--ink-primary)' }}>
                                {building.city.toUpperCase()}, {building.country.toUpperCase()}
                              </span>
                            </div>
                            <div className={styles.cardMetaRow}>
                              <span>YEAR / DATUM</span>
                              <span style={{ textAlign: 'right', color: 'var(--ink-primary)' }}>
                                {building.chronologyLabel} · {building.dimensions.heightMeters} M
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            <Link href={`/structures/${building.slug}`} className="btn-monolith">
                              <span>OPEN FOLIO</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                            {building.hasAnatomyPlate && building.anatomyPlateId && (
                              <Link
                                href={`/anatomy?plate=${building.anatomyPlateId}`}
                                className="type-colophon"
                                style={{
                                  color: 'var(--signal-ink)',
                                  minBlockSize: '44px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  paddingInline: '0.25rem',
                                }}
                              >
                                03 ANATOMY ↗
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.indexLayout}>
              <div
                role="region"
                aria-label="Surveyed architectural index table"
                tabIndex={0}
                className={styles.tableRegion}
              >
                <table className={`${styles.ledgerTable} ${styles.indexTable}`}>
                  <caption className="visually-hidden">
                    MONOLITH Archive Volume IV index of surveyed structures
                  </caption>
                  <thead className={styles.ledgerHead}>
                    <tr className="type-colophon">
                      <th
                        scope="col"
                        className={styles.ledgerTh}
                        aria-sort={sort === 'CAT_ASC' ? 'ascending' : 'none'}
                      >
                        <button
                          type="button"
                          onClick={() => setSort('CAT_ASC')}
                          className={`${styles.sortButton} type-colophon`}
                        >
                          <span>CAT. NO.</span>
                          <span aria-hidden="true">{sort === 'CAT_ASC' ? '↑' : ''}</span>
                        </button>
                      </th>
                      <th scope="col" className={styles.ledgerTh}>
                        STRUCTURE
                      </th>
                      <th scope="col" className={styles.ledgerTh}>
                        MOVEMENT
                      </th>
                      <th scope="col" className={styles.ledgerTh}>
                        ARCHITECT
                      </th>
                      <th scope="col" className={styles.ledgerTh}>
                        LOCATION
                      </th>
                      <th
                        scope="col"
                        className={`${styles.ledgerTh} ${styles.ledgerThYear}`}
                        aria-sort={
                          sort === 'YEAR_ASC'
                            ? 'ascending'
                            : sort === 'YEAR_DESC'
                              ? 'descending'
                              : 'none'
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSort((prev) => (prev === 'YEAR_ASC' ? 'YEAR_DESC' : 'YEAR_ASC'))
                          }
                          className={`${styles.sortButton} type-colophon`}
                        >
                          <span>YEAR</span>
                          <span aria-hidden="true">
                            {sort === 'YEAR_ASC' ? '↑' : sort === 'YEAR_DESC' ? '↓' : '⇅'}
                          </span>
                        </button>
                      </th>
                      <th scope="col" className={styles.ledgerTh}>
                        MATERIAL
                      </th>
                      <th
                        scope="col"
                        className={`${styles.ledgerTh} ${styles.ledgerThElev}`}
                        aria-sort={
                          sort === 'ELEV_DESC'
                            ? 'descending'
                            : sort === 'ELEV_ASC'
                              ? 'ascending'
                              : 'none'
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSort((prev) => (prev === 'ELEV_DESC' ? 'ELEV_ASC' : 'ELEV_DESC'))
                          }
                          className={`${styles.sortButton} type-colophon`}
                        >
                          <span>ELEV.</span>
                          <span aria-hidden="true">
                            {sort === 'ELEV_DESC' ? '↓' : sort === 'ELEV_ASC' ? '↑' : '⇅'}
                          </span>
                        </button>
                      </th>
                    </tr>
                  </thead>

                  <tbody className={styles.ledgerBody}>
                    {filteredBuildings.map((building) => {
                      const isActive = previewBuilding?.id === building.id;
                      return (
                        <tr
                          key={building.id}
                          onMouseEnter={() => setActiveIndexId(building.id)}
                          onFocus={() => setActiveIndexId(building.id)}
                          className={`${styles.ledgerRow} ${isActive ? styles.ledgerRowActive : ''}`}
                        >
                          <th scope="row" className={`${styles.ledgerTd} type-colophon tabular-nums`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              CAT. NO.
                            </span>
                            <span style={{ color: 'var(--signal-ink)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                              {building.catalogNumber}
                            </span>
                          </th>
                          <td className={styles.ledgerTd}>
                            <span
                              aria-hidden="true"
                              className={`${styles.mobileFieldLabel} type-colophon`}
                            >
                              STRUCTURE
                            </span>
                            <Link
                              href={`/structures/${building.slug}`}
                              className={styles.structureLink}
                              style={{
                                textDecoration: isActive ? 'underline' : 'none',
                              }}
                            >
                              {building.name}
                            </Link>
                          </td>
                          <td className={`${styles.ledgerTd} type-colophon`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              MOVEMENT
                            </span>
                            <span>{building.movement}</span>
                          </td>
                          <td className={`${styles.ledgerTd} type-colophon`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              ARCHITECT
                            </span>
                            <span style={{ color: 'var(--ink-secondary)' }}>
                              {building.architect}
                            </span>
                          </td>
                          <td className={`${styles.ledgerTd} type-colophon`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              LOCATION
                            </span>
                            <span>
                              {building.city}, {building.country}
                            </span>
                          </td>
                          <td className={`${styles.ledgerTd} ${styles.ledgerTdNowrap} type-colophon tabular-nums`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              YEAR
                            </span>
                            <span>{building.chronologyLabel}</span>
                          </td>
                          <td className={`${styles.ledgerTd} type-colophon`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              MATERIAL
                            </span>
                            <span style={{ color: 'var(--ink-secondary)' }}>
                              {building.materialCode}
                            </span>
                          </td>
                          <td className={`${styles.ledgerTd} ${styles.ledgerTdNowrap} type-colophon tabular-nums`}>
                            <span aria-hidden="true" className={styles.mobileFieldLabel}>
                              ELEV.
                            </span>
                            <span>{building.dimensions.heightMeters} M</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className={styles.mobileSlipList} aria-label="Surveyed structures catalog slips">
                {filteredBuildings.map((building) => (
                  <li key={`${building.id}-slip`} className={styles.mobileSlipCard}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                      }}
                    >
                      <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                        {building.catalogNumber}
                      </span>
                      <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                        {building.movement.toUpperCase()}
                      </span>
                    </div>
                    <Link
                      href={`/structures/${building.slug}`}
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {building.name}
                    </Link>
                    <dl className={`${styles.mobileSlipDl} type-colophon`}>
                      <div className={styles.mobileSlipRow}>
                        <dt style={{ color: 'var(--ink-secondary)' }}>ARCHITECT</dt>
                        <dd style={{ textAlign: 'right' }}>{building.architect}</dd>
                      </div>
                      <div className={styles.mobileSlipRow}>
                        <dt style={{ color: 'var(--ink-secondary)' }}>LOCATION</dt>
                        <dd style={{ textAlign: 'right' }}>
                          {building.city}, {building.country}
                        </dd>
                      </div>
                      <div className={styles.mobileSlipRow}>
                        <dt style={{ color: 'var(--ink-secondary)' }}>YEAR / ELEV.</dt>
                        <dd className="tabular-nums" style={{ textAlign: 'right' }}>
                          {building.chronologyLabel} · {building.dimensions.heightMeters} M
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>

              {previewBuilding && (
                <aside className={styles.previewDock} aria-label="Active index row plate preview">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-hairline)',
                      paddingBottom: '0.5rem',
                    }}
                    className="type-colophon"
                  >
                    <span style={{ color: 'var(--signal-ink)' }}>
                      {previewBuilding.catalogNumber}
                    </span>
                    <span>{previewBuilding.chronologyLabel}</span>
                  </div>

                  <div
                    className={`plate-frame plate-grain ${styles.plateBox34} ${getApertureClassName(
                      getPlateAperture(previewBuilding)
                    )}`}
                  >
                    <Image
                      src={previewBuilding.imagePath}
                      alt={previewBuilding.imageAlt}
                      fill
                      loading="eager"
                      sizes="288px"
                      className="plate-img"
                    />
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      lineHeight: 1.08,
                      textTransform: 'uppercase',
                    }}
                  >
                    {previewBuilding.name}
                  </h2>

                  <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                    {previewBuilding.summary}
                  </p>

                  <Link
                    href={`/structures/${previewBuilding.slug}`}
                    className="btn-monolith btn-monolith--primary"
                  >
                    <span>INSPECT PLATE</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </aside>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
