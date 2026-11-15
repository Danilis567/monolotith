'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { BuildingRecord } from '@/data/buildings';
import { getApertureClassName, getPlateAperture } from '@/lib/plateGeometry';
import {
  AlignmentStar,
  CornerCrosshair,
  SteppedFrame,
} from './DraftingMarks';
import {
  HairlineDraw,
  HeroEchoParallax,
  PlateCurtain,
} from './MotionPrimitives';
import styles from '@/app/home.module.css';

interface HomeClientProps {
  heroBuilding: BuildingRecord;
  thesisBuilding: BuildingRecord;
  streamBuildings: BuildingRecord[];
  brutalistSample: BuildingRecord[];
  gothicSample: BuildingRecord[];
  monumentalSample: BuildingRecord[];
  totalCount: number;
}

export function HomeClient({
  heroBuilding,
  thesisBuilding,
  streamBuildings,
  brutalistSample,
  gothicSample,
  monumentalSample,
  totalCount,
}: HomeClientProps) {
  const prefersReduced = useReducedMotion();
  const [isStreaming, setIsStreaming] = useState(true);

  const activeStreaming = isStreaming && !prefersReduced;
  const repeatedStream = activeStreaming
    ? [...streamBuildings, ...streamBuildings]
    : streamBuildings;

  const movements = [
    {
      code: '01 / BRUTALIST',
      movement: 'Brutalist' as const,
      chronology: '1947–1980',
      structuralSystem: 'MONOLITHIC BÉTON BRUT · DETACHED SERVICE CORES',
      summary:
        'Board-formed concrete frames, exteriorized mechanical cores, and bush-hammered civic megastructures.',
      leadPlate: brutalistSample[0],
      samples: brutalistSample.slice(0, 3),
    },
    {
      code: '02 / GOTHIC',
      movement: 'Gothic' as const,
      chronology: '1163–1965',
      structuralSystem: 'POINTED RIB VAULTS · EXTERIOR FLYING BUTTRESSES',
      summary:
        'Pointed limestone vaults, exterior flying buttresses, and vertical structural stone skeletons engineered for light.',
      leadPlate: gothicSample[0],
      samples: gothicSample.slice(0, 3),
    },
    {
      code: '03 / MONUMENTAL',
      movement: 'Monumental' as const,
      chronology: '126 CE–PRESENT',
      structuralSystem: 'COFFERED MASONRY DOMES · LOAD-BEARING SHELLS',
      summary:
        'Unreinforced coffered domes, pendentive masonry shells, and contemporary civic sanctuaries cast at urban scale.',
      leadPlate: monumentalSample[0],
      samples: monumentalSample.slice(0, 3),
    },
  ];

  return (
    <>
      {/* =====================================================================
          BAND A — FULL-BLEED EDITORIAL POSTER HERO
         ===================================================================== */}
      <section data-surface="void" className={styles.heroBand} aria-label="Exhibition Hero">
        <div className={styles.heroGlow} aria-hidden="true" />

        <HeroEchoParallax className={styles.echoWrapper}>
          <span className={styles.echoWord}>MONOLITH</span>
        </HeroEchoParallax>

        <div className={styles.heroStage}>
          <div className={`${styles.heroMetaTop} type-colophon`}>
            <span>FOLIO IV / MONUMENTAL MONOGRAPH ARCHIVE</span>
            <span>SURVEY SCOPE: 27 PLATES · 4 CONTINENTS</span>
            <span>DATUM: WGS84 / METRIC</span>
          </div>

          <div className={styles.heroHeadlineCol}>
            <p className={`${styles.heroEyebrow} type-colophon`}>
              <span className="signal-dot" aria-hidden="true" />
              <span>SPECIMEN {heroBuilding.catalogNumber} — FEATURED PLATE</span>
            </p>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>MASS</span>
              <span className={styles.heroTitleLine}>CAST</span>
              <span className={styles.heroTitleLine}>UNDER</span>
              <span className={styles.heroTitleLine}>GRAVITY</span>
            </h1>

            <p className={`${styles.heroLead} type-body-lead`}>
              Twenty-seven load-bearing works in raw concrete, dressed limestone, and carved stone
              across nineteen centuries of vertical ambition.
            </p>

            <div className={styles.heroActions}>
              <Link href="/archive" className="btn-monolith btn-monolith--primary">
                <span>ENTER 02 ARCHIVE</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/anatomy" className="btn-monolith">
                <span>03 ANATOMY SECTIONS</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className={styles.heroPlateCol}>
            <Link
              href={`/structures/${heroBuilding.slug}`}
              className={`plate-interactive-outer ${styles.heroPlateLink}`}
              aria-label={`Inspect ${heroBuilding.catalogNumber} ${heroBuilding.name}`}
            >
              <CornerCrosshair className={styles.crosshairTL} />
              <CornerCrosshair className={styles.crosshairBR} />

              <div className={`plate-frame plate-grain ${styles.heroPlateAspect}`}>
                <SteppedFrame style={{ color: 'var(--ink-secondary)', zIndex: 5 }} />
                <Image
                  src={heroBuilding.imagePath}
                  alt={heroBuilding.imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 48vw"
                  className="plate-img"
                />
                <div className="plate-scrim-bottom" aria-hidden="true" />
                <div
                  style={{
                    position: 'absolute',
                    insetInline: '1.5rem',
                    insetBlockEnd: '1.35rem',
                    zIndex: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      className="type-colophon"
                      style={{ display: 'block', color: 'var(--signal-ink)' }}
                    >
                      {heroBuilding.catalogNumber} · {heroBuilding.id}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        lineHeight: 1.05,
                        textTransform: 'uppercase',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      {heroBuilding.name}
                    </span>
                  </div>
                  <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                    {heroBuilding.chronologyLabel}
                  </span>
                </div>
              </div>

              <div className={`${styles.heroPlateCaption} type-colophon`}>
                <span>{heroBuilding.architect}</span>
                <span>{heroBuilding.coordinates.dmsFormatted}</span>
                <span>{heroBuilding.dimensions.heightLabel.split(' ')[0]} M →</span>
              </div>
            </Link>
          </div>

          <div className={styles.heroRailCol} aria-hidden="true">
            <span className={`${styles.verticalMarginalia} type-colophon`}>
              PLATE 001 / LONDON / BÉTON BRUT
            </span>
            <span className={`${styles.verticalMarginalia} type-colophon`}>
              51°31′25″N × 0°12′20″W
            </span>
          </div>
        </div>

        <div className={styles.surveyStrip}>
          <div className={styles.surveyStripGrid}>
            <div className={styles.surveyCell}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                [01.A] STRUCTURAL MOVEMENTS
              </span>
              <span className={`${styles.surveyValue} ${styles.surveyValuePrimary} type-colophon tabular-nums`}>
                03 DISCIPLINES — BRUTALIST · GOTHIC · MONUMENTAL
              </span>
            </div>
            <div className={styles.surveyCell}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                [01.B] ARCHIVE SCOPE
              </span>
              <span className={`${styles.surveyValue} type-colophon tabular-nums`}>
                {String(totalCount).padStart(2, '0')} VERIFIED PLATES
              </span>
            </div>
            <div className={styles.surveyCell}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                [01.C] CHRONOLOGICAL SPAN
              </span>
              <span className={`${styles.surveyValue} type-colophon tabular-nums`}>
                126 CE–PRESENT (19 CENTURIES)
              </span>
            </div>
            <div className={styles.surveyCell}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                [01.D] SECTION WORKBENCH
              </span>
              <span className={`${styles.surveyValue} type-colophon tabular-nums`}>
                09 ORTHOGRAPHIC PLATES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BAND B — EDITORIAL THESIS (PLASTER LIGHT ISLAND)
         ===================================================================== */}
      <section data-surface="plaster" className={styles.thesisBand} aria-labelledby="thesis-heading">
        <div className="monolith-grid">
          <div className={styles.thesisLeft}>
            <p className={`${styles.sectionCode} type-colophon`}>
              <AlignmentStar />
              <span>01.1 — EDITORIAL THESIS</span>
            </p>

            <h2 id="thesis-heading" className={`type-display ${styles.thesisHeading}`}>
              ARCHITECTURE AS PERMANENT MASS
            </h2>

            <HairlineDraw thick />

            <div className={`${styles.thesisColumns} type-body`}>
              <p>
                MONOLITH assembles structures whose structural grammar cannot be concealed behind
                cladding. Across late Roman coffered vaults, thirteenth-century Gothic stone ribs,
                and post-war board-formed concrete slabs, load paths remain legible on the exterior
                skin.
              </p>
              <p>
                Each plate pairs measured dimensions, WGS84 datum coordinates, and material
                composition with unretouched monochrome documentation. Scale replaces ornament; the
                wall, the pier, and the service tower carry the full dramatic burden of elevation.
              </p>
            </div>

            <p className={`${styles.thesisQuote} type-quote`}>
              Board-marked concrete retains the timber grain of its shuttering; cut limestone
              retains the mason&apos;s chisel gauge. Both register dead load directly on the bearing
              wall.
            </p>

            <div>
              <Link href={`/structures/${thesisBuilding.slug}`} className="btn-monolith">
                <span>READ {thesisBuilding.catalogNumber} MONOGRAPH</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.thesisRight}>
            <PlateCurtain>
              <Link
                href={`/structures/${thesisBuilding.slug}`}
                className={`plate-interactive-outer ${styles.thesisPlateWrap}`}
              >
                <div className={`plate-frame plate-grain ${styles.thesisPlateAspect}`}>
                  <Image
                    src={thesisBuilding.imagePath}
                    alt={thesisBuilding.imageAlt}
                    fill
                    loading="eager"
                    sizes="(max-width: 1023px) 92vw, 46vw"
                    className="plate-img"
                  />
                </div>
                <div className={`${styles.thesisPlateMeta} type-colophon`}>
                  <span>
                    {thesisBuilding.catalogNumber} · {thesisBuilding.name.toUpperCase()}
                  </span>
                  <span>
                    {thesisBuilding.city.toUpperCase()}, {thesisBuilding.country.toUpperCase()} (
                    {thesisBuilding.chronologyLabel})
                  </span>
                </div>
              </Link>
            </PlateCurtain>

            <p className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              CROSS-SECTION AVAILABLE IN 03 ANATOMY — PLATE II · {thesisBuilding.dimensions.primaryMetric}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BAND C — HORIZONTAL SPECIMEN STREAM (WCAG 2.2.2)
         ===================================================================== */}
      <section data-surface="dark" className={styles.streamBand} aria-labelledby="stream-heading">
        <div className="monolith-grid">
          <div className={styles.streamHeader}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                01.2 — SPECIMEN STREAM
              </p>
              <h2 id="stream-heading" className="type-display">
                SURVEYED PLATES
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsStreaming((prev) => !prev)}
              disabled={Boolean(prefersReduced)}
              className="btn-monolith"
            >
              <span>
                {prefersReduced
                  ? 'REDUCED MOTION ACTIVE'
                  : activeStreaming
                    ? 'PAUSE STREAM'
                    : 'PLAY STREAM'}
              </span>
              <span aria-hidden="true">{activeStreaming ? '[ || ]' : '[ > ]'}</span>
            </button>
          </div>
        </div>

        <div
          className="specimen-stream-viewport"
          data-streaming={activeStreaming ? 'true' : 'false'}
          aria-label="Scrolling strip of surveyed architectural specimens"
        >
          <div className="specimen-stream-track">
            {repeatedStream.map((building, idx) => {
              const isClone = idx >= streamBuildings.length;
              const aperture = getPlateAperture(building);
              const apertureClass = getApertureClassName(aperture);

              return (
                <article
                  key={`${building.id}-${idx}`}
                  className={styles.streamCard}
                  aria-hidden={isClone ? 'true' : undefined}
                >
                  <div className={styles.streamCardMedia}>
                    <Link
                      href={`/structures/${building.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="plate-interactive-outer"
                      style={{ blockSize: '100%' }}
                    >
                      <div
                        className={`plate-frame plate-grain ${apertureClass}`}
                        style={{ inlineSize: '100%', blockSize: '100%' }}
                      >
                        <Image
                          src={building.imagePath}
                          alt={isClone ? '' : building.imageAlt}
                          fill
                          loading="eager"
                          sizes="320px"
                          className="plate-img"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className={styles.streamCardBody}>
                    <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                      {building.catalogNumber} · {building.movement.toUpperCase()}
                    </span>
                    <Link
                      href={`/structures/${building.slug}`}
                      tabIndex={isClone ? -1 : undefined}
                      aria-hidden={isClone ? 'true' : undefined}
                      aria-label={
                        isClone
                          ? undefined
                          : `${building.catalogNumber} ${building.name} — ${building.city}, ${building.chronologyLabel}`
                      }
                      className={styles.streamCardTitle}
                    >
                      {building.name}
                    </Link>
                    <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                      {building.city.toUpperCase()} · {building.chronologyLabel}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BAND D — THREE-MOVEMENT LEDGER & COMPLETE INDEX CTA
         ===================================================================== */}
      <section data-surface="basalt" className={styles.ledgerBand} aria-labelledby="ledger-heading">
        <div className="monolith-grid">
          <div className={styles.ledgerHeader}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                01.3 — COMPLETE LEDGER
              </p>
              <h2 id="ledger-heading" className="type-display">
                THREE ARCHITECTURAL DISCIPLINES
              </h2>
            </div>

            <Link href="/archive" className="btn-monolith">
              <span>VIEW ALL {totalCount} STRUCTURES</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.triptychGrid}>
            {movements.map((group, groupIdx) => {
              const aperture = getPlateAperture(group.leadPlate);
              const apertureClass = getApertureClassName(aperture);

              return (
                <div
                  key={group.movement}
                  className={styles.movementCol}
                  data-movement-index={groupIdx}
                >
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                      }}
                    >
                      <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                        {group.code}
                      </span>
                      <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                        {group.chronology}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                        fontSize:
                          groupIdx === 0
                            ? 'clamp(2rem, 3.2vw, 2.85rem)'
                            : 'clamp(1.65rem, 2.4vw, 2.2rem)',
                        fontWeight: 600,
                        lineHeight: 0.96,
                        textTransform: 'uppercase',
                      }}
                    >
                      {group.movement}
                    </h3>

                    <div className={`${styles.movementSystemBar} type-colophon`}>
                      {group.structuralSystem}
                    </div>

                    <PlateCurtain>
                      <Link
                        href={`/structures/${group.leadPlate.slug}`}
                        className="plate-interactive-outer"
                      >
                        <div
                          className={`plate-frame plate-grain ${styles.movementPlateThumb} ${apertureClass}`}
                        >
                          <Image
                            src={group.leadPlate.imagePath}
                            alt={group.leadPlate.imageAlt}
                            fill
                            loading="eager"
                            sizes="(max-width: 1023px) 88vw, 380px"
                            className="plate-img"
                          />
                        </div>
                      </Link>
                    </PlateCurtain>

                    <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                      {group.summary}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div className={styles.movementSamples}>
                      {group.samples.map((b) => (
                        <Link
                          key={b.id}
                          href={`/structures/${b.slug}`}
                          className={`${styles.movementSampleLink} type-colophon`}
                        >
                          <span>
                            {b.catalogNumber} · {b.name.toUpperCase()}
                          </span>
                          <span style={{ color: 'var(--ink-secondary)' }}>{b.chronologyLabel}</span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/archive?movement=${group.movement}`}
                      className="btn-monolith"
                    >
                      <span>FILTER {group.movement.toUpperCase()} (09)</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.closingBar}>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                ARCHIVE VOLUME IV — INDEX &amp; MEASURED SECTIONS
              </span>
              <p className="type-subhead">
                EXPLORE {totalCount} STRUCTURAL MONOGRAPHS OR INSPECT 09 VECTOR PLATES.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link href="/archive" className="btn-monolith btn-monolith--primary">
                <span>OPEN 02 ARCHIVE</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/anatomy" className="btn-monolith">
                <span>OPEN 03 ANATOMY</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
