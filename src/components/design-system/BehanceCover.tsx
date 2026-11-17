'use client';

import { AlignmentStar, CornerCrosshair } from '@/components/DraftingMarks';
import styles from './BehanceCover.module.css';

export function BehanceCover({ trellickSvg }: { trellickSvg: string; chartresSvg?: string }) {
  return (
    <div data-surface="void" className={styles.stage}>
      <div className={styles.canvas}>
        {/* Subtle 4px architectural grain & outer frame */}
        <div className={`plate-grain ${styles.grainLayer}`} aria-hidden="true" />
        <CornerCrosshair className={styles.crossTL} />
        <CornerCrosshair className={styles.crossTR} />
        <CornerCrosshair className={styles.crossBL} />
        <CornerCrosshair className={styles.crossBR} />

        {/* Top Monumental Display Title */}
        <header className={styles.titleBlock}>
          <div className={styles.titleTopRow}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              EDITION IV · ARCHIVE &amp; DESIGN SYSTEM
            </span>
            <div className={styles.titleMetaRow}>
              <span className={styles.romanNum}>IV</span>
              <span className={styles.metaNote}>
                Architectural Archive
                <br />
                Design System &amp; Index
              </span>
            </div>
          </div>
          <div className={styles.titleWordWrap}>
            <h1 className={styles.megaTitle}>MONOLITH</h1>
            <AlignmentStar className={styles.titleStar} />
          </div>
        </header>

        {/* Centerpiece: Single Monumental Triptych + Orthographic Rings */}
        <main className={styles.centerpiece}>
          {/* Left vertical axis badge */}
          <div className={styles.sideTagLeft} aria-hidden="true">
            <span>C</span>
            <span>A</span>
            <span>T</span>
            <span className={styles.sideSep} />
            <span>0</span>
            <span>0</span>
            <span>1</span>
          </div>

          {/* 3-slice single image triptych */}
          <div className={styles.triptych}>
            <div className={styles.sliceLeft}>
              <img
                src="/images/buildings/trellick-tower.jpg"
                alt=""
                aria-hidden="true"
                className={`plate-img ${styles.triptychImgLeft}`}
              />
            </div>

            <div className={styles.sliceCenter}>
              <img
                src="/images/buildings/trellick-tower.jpg"
                alt="Trellick Tower — London, 1972"
                className={`plate-img ${styles.triptychImgCenter}`}
              />
              <div
                className={styles.xrayOverlay}
                dangerouslySetInnerHTML={{ __html: trellickSvg }}
                aria-hidden="true"
              />
              <span className={styles.centerTopCaption}>TRELLICK TOWER · 1972</span>
              <div className={styles.centerCrossPair} aria-hidden="true">
                <AlignmentStar className={styles.centerStarLg} />
                <AlignmentStar className={styles.centerStarSm} />
              </div>
            </div>

            <div className={styles.sliceRight}>
              <img
                src="/images/buildings/trellick-tower.jpg"
                alt=""
                aria-hidden="true"
                className={`plate-img ${styles.triptychImgRight}`}
              />
            </div>
          </div>

          {/* Right vertical axis badge */}
          <div className={styles.sideTagRight} aria-hidden="true">
            <span>9</span>
            <span>8</span>
            <span>M</span>
            <span className={styles.sideSep} />
            <span>L</span>
            <span>D</span>
            <span>N</span>
          </div>

          {/* Twin orthographic orbital rings slicing across the triptych */}
          <svg
            className={styles.orbitalRings}
            viewBox="0 0 1200 420"
            fill="none"
            aria-hidden="true"
          >
            <ellipse
              cx="600"
              cy="195"
              rx="530"
              ry="92"
              stroke="#EAE6E1"
              strokeWidth="1.25"
              strokeOpacity="0.82"
            />
            <ellipse
              cx="600"
              cy="228"
              rx="530"
              ry="92"
              stroke="#EAE6E1"
              strokeWidth="1"
              strokeOpacity="0.48"
            />
            <circle cx="1130" cy="195" r="4" fill="#FF4A3D" />
            <circle cx="70" cy="228" r="3" fill="#EAE6E1" />
          </svg>
        </main>

        {/* Bottom Editorial Caption & Credit */}
        <footer className={styles.bottomBlock}>
          <div className={styles.quoteRow}>
            <AlignmentStar className={styles.sideStar} />
            <p className={styles.editorialQuote}>
              Twenty-seven bearing works cast in raw concrete, stone, and gravity — surveyed
              through orthographic sections and live architectural plates.
            </p>
            <AlignmentStar className={styles.sideStar} />
          </div>

          <div className={styles.creditRow}>
            <span className="type-colophon">HALİL ANIK</span>
            <span className={styles.diamondMark} aria-hidden="true" />
            <span className="type-colophon tabular-nums">2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
