'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { BuildingRecord } from '@/data/buildings';
import { getApertureClassName, getPlateAperture } from '@/lib/plateGeometry';
import styles from './SpecimenStream.module.css';

export function SpecimenStream({ buildings }: { buildings: BuildingRecord[] }) {
  const prefersReduced = useReducedMotion();
  const [isStreaming, setIsStreaming] = useState(true);

  const activeStreaming = isStreaming && !prefersReduced;
  const repeatedStream = activeStreaming
    ? [...buildings, ...buildings]
    : buildings;

  const handleTouchHold = () => {
    if (activeStreaming) {
      setIsStreaming(false);
    }
  };

  const toggleAriaLabel = prefersReduced
    ? 'Specimen stream paused due to reduced motion preference'
    : activeStreaming
      ? 'Pause specimen stream'
      : 'Play specimen stream';

  return (
    <section
      data-surface="dark"
      className={styles.streamBand}
      aria-labelledby="stream-heading"
    >
      <div className="monolith-grid">
        <div className={styles.streamHeader}>
          <div className={styles.streamHeadingGroup}>
            <p className={`type-colophon ${styles.streamEyebrow}`}>
              SPECIMEN STREAM
            </p>
            <h2 id="stream-heading" className="type-display">
              SURVEYED PLATES
            </h2>
          </div>

          <div className={styles.streamControls}>
            <span className={`type-colophon ${styles.holdHint}`}>
              <span className={styles.holdHintPointer}>
                HOVER A PLATE TO HOLD
              </span>
              <span className={styles.holdHintTouch}>
                TAP A PLATE TO HOLD
              </span>
            </span>

            <button
              type="button"
              onClick={() => setIsStreaming((prev) => !prev)}
              disabled={Boolean(prefersReduced)}
              aria-label={toggleAriaLabel}
              aria-pressed={activeStreaming}
              className={styles.streamToggle}
            >
              {activeStreaming && (
                <span className="signal-dot" aria-hidden="true" />
              )}
              <span>
                {prefersReduced
                  ? 'REDUCED MOTION'
                  : activeStreaming
                    ? 'PAUSE STREAM'
                    : 'PLAY STREAM'}
              </span>
              <span aria-hidden="true">
                {activeStreaming ? '[ || ]' : '[ ▶ ]'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.viewport}
        data-streaming={activeStreaming ? 'true' : 'false'}
        aria-label="Scrolling strip of surveyed architectural specimens"
        onTouchStart={handleTouchHold}
        onPointerDown={(e) => {
          if (e.pointerType === 'touch') {
            handleTouchHold();
          }
        }}
      >
        <div className={styles.track}>
          {repeatedStream.map((building, idx) => {
            const isClone = idx >= buildings.length;
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
                    className={`plate-interactive-outer ${styles.streamCardLink}`}
                  >
                    <div
                      className={`plate-frame plate-grain ${apertureClass} ${styles.streamCardFrame}`}
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
                  <span
                    className={`type-colophon ${styles.streamCardCatalog}`}
                  >
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
                  <span className={`type-colophon ${styles.streamCardMeta}`}>
                    {building.city.toUpperCase()} · {building.chronologyLabel}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
