import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import { HairlineDraw } from '@/components/MotionPrimitives';
import { getAnatomyPlateById } from '@/data/anatomyPlates';
import { BUILDINGS, getBuildingBySlug } from '@/data/buildings';
import { getAdjacentBuildings } from '@/lib/archiveFilters';
import { getApertureClassName, getPlateAperture } from '@/lib/plateGeometry';
import styles from './detail.module.css';

export function generateStaticParams() {
  return BUILDINGS.map((building) => ({ slug: building.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const building = getBuildingBySlug(slug);
  if (!building) {
    return { title: 'Plate Not Found' };
  }
  return {
    title: `${building.catalogNumber} ${building.name}`,
    description: `${building.catalogNumber} monograph specification for ${building.name} (${building.chronologyLabel}) in ${building.city}, ${building.country} by ${building.architect}. Primary datum: ${building.dimensions.heightLabel} · ${building.dimensions.primaryMetric}.`,
  };
}

export default async function StructureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const building = getBuildingBySlug(slug);

  if (!building) {
    notFound();
  }

  const aperture = getPlateAperture(building);
  const apertureClass = getApertureClassName(aperture);
  const { prev, next } = getAdjacentBuildings(building.slug);
  const linkedPlate = building.anatomyPlateId
    ? getAnatomyPlateById(building.anatomyPlateId)
    : undefined;

  const colophonFields = [
    { term: 'CATALOG / RECORD ID', value: `${building.catalogNumber} · ${building.id}` },
    { term: 'MOVEMENT / CLASSIFICATION', value: `${building.movement.toUpperCase()} — ${building.subStyle}` },
    { term: 'ARCHITECT / MASTER BUILDER', value: building.architect },
    { term: 'LOCATION', value: `${building.city}, ${building.country} (${building.continent})` },
    { term: 'COORDINATES (WGS84)', value: building.coordinates.dmsFormatted },
    { term: 'CHRONOLOGY', value: building.chronologyLabel },
    { term: 'HEIGHT DATUM', value: building.dimensions.heightLabel },
    {
      term: 'STRUCTURAL FOOTPRINT / METRIC',
      value: building.dimensions.spanOrLengthLabel ?? building.dimensions.primaryMetric,
    },
    { term: 'PRIMARY MATERIAL / STATUS', value: `${building.materialCode} · ${building.status.toUpperCase()}` },
  ];

  const observations = [
    {
      code: 'PRIMARY MATERIAL',
      detail: building.materials[0] ?? building.materialCode,
    },
    {
      code: 'SECONDARY FABRIC',
      detail: building.materials[1] ?? building.subStyle,
    },
    {
      code: 'MEASURED DATUM',
      detail: building.dimensions.primaryMetric,
    },
    {
      code: 'GEOGRAPHIC COORDINATE',
      detail: `${building.coordinates.dmsLat} / ${building.coordinates.dmsLng}`,
    },
  ];

  return (
    <>
      {/* Breadcrumb Bar */}
      <div data-surface="dark" className={styles.breadcrumbBand}>
        <div className="monolith-grid">
          <nav aria-label="Breadcrumb" className={`${styles.breadcrumbNav} type-colophon`} style={{ gridColumn: '1 / -1' }}>
            <Link href="/" className={styles.breadcrumbLink}>
              HOME
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/archive" className={styles.breadcrumbLink}>
              ARCHIVE
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/archive?movement=${building.movement}`}
              className={styles.breadcrumbLink}
            >
              {building.movement.toUpperCase()}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: 'var(--ink-primary)' }}>
              {building.catalogNumber} · {building.name.toUpperCase()}
            </span>
          </nav>
        </div>
      </div>

      {/* Split Poster Hero */}
      <section data-surface="void" className={styles.heroBand}>
        <div className="monolith-grid">
          <div className={styles.plateStageCol}>
            <div className={styles.plateFrameOuter}>
              <CornerCrosshair className={styles.crosshairTL} />
              <CornerCrosshair className={styles.crosshairBR} />
              <SteppedFrame style={{ color: 'var(--ink-secondary)', zIndex: 5 }} />

              <div className={`plate-frame plate-grain ${styles.plateAspect34} ${apertureClass}`}>
                <Image
                  src={building.imagePath}
                  alt={building.imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1023px) 92vw, 44vw"
                  className="plate-img"
                />
              </div>
            </div>

            <div className={`${styles.marginaliaRail} type-colophon`} aria-hidden="true">
              <span>{building.catalogNumber}</span>
              <span>{building.coordinates.dmsFormatted}</span>
              <span>{building.dimensions.heightMeters} M</span>
            </div>
          </div>

          <div className={styles.heroCopyCol}>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div
                className="type-colophon"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  color: 'var(--signal-ink)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="signal-dot" aria-hidden="true" />
                  <span>
                    SPECIMEN {building.catalogNumber} — {building.movement.toUpperCase()}
                  </span>
                </span>
                <span style={{ color: 'var(--ink-secondary)' }}>
                  STATUS: {building.status.toUpperCase()}
                </span>
              </div>

              <h1 className="type-display">{building.name}</h1>

              {building.nativeName && (
                <p className={styles.nativeSubtitle}>{building.nativeName}</p>
              )}

              <HairlineDraw thick />

              <p className="type-body-lead" style={{ color: 'var(--ink-secondary)' }}>
                {building.summary}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div
                className="type-colophon"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  color: 'var(--ink-secondary)',
                }}
              >
                <span>ARCHITECT: {building.architect.toUpperCase()}</span>
                <span>
                  {building.city.toUpperCase()}, {building.country.toUpperCase()} (
                  {building.chronologyLabel})
                </span>
              </div>

              <div className={styles.actionCluster}>
                <a href="#colophon-ledger" className="btn-monolith btn-monolith--primary">
                  <span>STRUCTURAL LEDGER</span>
                  <span aria-hidden="true">↓</span>
                </a>
                {linkedPlate && (
                  <Link href={`/anatomy?plate=${linkedPlate.id}`} className="btn-monolith">
                    <span>VIEW ANATOMY ({linkedPlate.plateNumber})</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9-Field Colophon Ledger */}
      <section
        id="colophon-ledger"
        data-surface="basalt"
        className={styles.ledgerBand}
        aria-labelledby="ledger-spec-heading"
      >
        <div className="monolith-grid">
          <div
            style={{
              gridColumn: '1 / -1',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <h2 id="ledger-spec-heading" className="type-subhead">
              COLOPHON &amp; MEASURED SPECIFICATION
            </h2>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              9-FIELD VERIFIED DATUM RECORD
            </span>
          </div>

          <dl className={styles.ledgerGrid}>
            {colophonFields.map((field) => (
              <div key={field.term} className={styles.ledgerCell}>
                <dt className={`${styles.ledgerTerm} type-colophon`}>{field.term}</dt>
                <dd className={`${styles.ledgerValue} type-body`}>{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Plaster Light Editorial Analysis & Material Study */}
      <section
        data-surface="plaster"
        className={styles.analysisBand}
        aria-labelledby="analysis-heading"
      >
        <div className="monolith-grid">
          <div className={styles.analysisMain}>
            <div style={{ display: 'grid', gap: '0.625rem' }}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                ARCHITECTURAL ANALYSIS
              </span>
              <h2 id="analysis-heading" className="type-display">
                LOAD PATH &amp; HISTORICAL RECORD
              </h2>
            </div>

            <div className={styles.analysisBlock}>
              <h3 className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                STRUCTURAL GRAMMAR &amp; HISTORICAL COMMISSION
              </h3>
              <div className={`${styles.proseColumns} type-body`}>
                <p style={{ marginBottom: '1rem', breakInside: 'avoid' }}>
                  {building.structuralNotes}
                </p>
                <p style={{ breakInside: 'avoid' }}>{building.historicalContext}</p>
              </div>
            </div>

            <p className={`${styles.citationQuote} type-quote`}>
              {building.structuralAxiom}
            </p>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <h3 className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                FABRIC &amp; MATERIAL ASSEMBLY
              </h3>
              <ul style={{ display: 'grid', gap: '0.5rem' }}>
                {building.materials.map((mat) => (
                  <li
                    key={mat}
                    className="type-body"
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      paddingBottom: '0.45rem',
                      borderBottom: '1px solid var(--border-hairline)',
                    }}
                  >
                    <span className="type-colophon" style={{ color: 'var(--signal-ink)' }} aria-hidden="true">
                      ▪
                    </span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className={styles.analysisSidebar} aria-label="Technical Observations and Plate Detail">
            <div className={styles.calloutMetricBox} data-surface="void">
              <span className={`${styles.calloutOverline} type-colophon`}>
                PRIMARY STRUCTURAL DATUM
              </span>
              <p className={styles.calloutPrimaryValue}>
                {building.dimensions.heightLabel}
              </p>
              <p className={`${styles.calloutSecondarySpan} type-colophon`}>
                {building.dimensions.primaryMetric}
              </p>
            </div>

            <div className={styles.observationList}>
              {observations.map((obs) => (
                <div key={obs.code} className={styles.observationRow}>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    {obs.code}
                  </span>
                  <span className="type-body">{obs.detail}</span>
                </div>
              ))}
            </div>

            <div className={`plate-frame plate-halftone ${styles.halftoneCrop}`}>
              <Image
                src={building.imagePath}
                alt={`High-contrast tonal study of ${building.name}`}
                fill
                loading="lazy"
                sizes="(max-width: 1023px) 92vw, 35vw"
                className="plate-img"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Linked ANATOMY Plate Banner */}
      {linkedPlate && (
        <section data-surface="dark" className={`${styles.anatomyBanner} ${styles.anatomyBand}`}>
          <div className="monolith-grid">
            <div className={styles.anatomyCard}>
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  STRUCTURAL ANATOMY
                </span>
                <h2 className="type-subhead">
                  {linkedPlate.plateNumber}: {linkedPlate.title}
                </h2>
                <p className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  {linkedPlate.drawingType.toUpperCase()} · {linkedPlate.scale} · DATUM{' '}
                  {linkedPlate.datumElevation}
                </p>
              </div>

              <Link
                href={`/anatomy?plate=${linkedPlate.id}`}
                className="btn-monolith btn-monolith--primary"
              >
                <span>INSPECT ANATOMY</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Adjacent Prev / Index / Next Navigation */}
      <nav
        data-surface="dark"
        className={styles.adjacentBand}
        aria-label="Adjacent catalog structures"
      >
        <div className="monolith-grid">
          <div className={styles.adjacentGrid}>
            <Link href={`/structures/${prev.slug}`} className={styles.adjacentLink}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                ← PREVIOUS PLATE · {prev.catalogNumber}
              </span>
              <span className="type-subhead">{prev.name}</span>
            </Link>

            <Link
              href="/archive"
              className={styles.adjacentLink}
              style={{ placeContent: 'center', textAlign: 'center' }}
            >
              <span className="type-colophon">ALL {BUILDINGS.length} PLATES</span>
              <span className="type-ui-label">ARCHIVE</span>
            </Link>

            <Link href={`/structures/${next.slug}`} className={styles.adjacentLink}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                NEXT PLATE · {next.catalogNumber} →
              </span>
              <span className="type-subhead">{next.name}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
