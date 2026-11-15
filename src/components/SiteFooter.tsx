'use client';

import Link from 'next/link';
import { ScaleRuler } from './DraftingMarks';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={styles.container}>
        <div className={styles.wordmarkBand}>
          <img
            src="/brand/footer-lockup.svg"
            alt="MONOLITH — Archive of Load-Bearing Stone and Raw Concrete"
            width={1240}
            height={316}
            className={styles.desktopWordmark}
          />
          <img
            src="/brand/monolith-wordmark-dark.svg"
            alt="MONOLITH"
            width={264}
            height={64}
            className={styles.mobileWordmark}
          />
        </div>

        <div className={styles.ledger}>
          <div className={styles.cell}>
            <h2 className={`${styles.cellHeading} type-colophon`}>
              <span className="signal-dot" aria-hidden="true" />
              <span>COLLECTION</span>
            </h2>
            <ul className={`${styles.cellList} type-colophon`}>
              <li>
                <Link href="/" className={styles.cellLink}>
                  HOME — EDITORIAL COVER
                </Link>
              </li>
              <li>
                <Link href="/archive" className={styles.cellLink}>
                  ARCHIVE — CATALOG MATRIX
                </Link>
              </li>
              <li>
                <Link href="/anatomy" className={styles.cellLink}>
                  ANATOMY — SECTION WORKBENCH
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.cell}>
            <h2 className={`${styles.cellHeading} type-colophon`}>TAXONOMY</h2>
            <ul className={`${styles.cellList} type-colophon`}>
              <li>
                <Link href="/archive?movement=Brutalist" className={styles.cellLink}>
                  BRUTALIST · STRUCTURES (1947–1980)
                </Link>
              </li>
              <li>
                <Link href="/archive?movement=Gothic" className={styles.cellLink}>
                  GOTHIC · STRUCTURES (1163–1965)
                </Link>
              </li>
              <li>
                <Link href="/archive?movement=Monumental" className={styles.cellLink}>
                  MONUMENTAL · STRUCTURES (126–PRESENT)
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.cell}>
            <h2 className={`${styles.cellHeading} type-colophon`}>
              CREDITS &amp; METHODOLOGY
            </h2>
            <div className={`${styles.cellList} type-colophon`}>
              <p>ALL COORDINATES SURVEYED VIA WGS84.</p>
              <p>PHOTOGRAPHIC PLATES: WIKIMEDIA COMMONS CC0 / CC-BY-SA ARCHIVE.</p>
              <p>TECHNICAL SECTIONS: ORIGINAL VECTOR PLATES (REV. IV).</p>
            </div>
          </div>

          <div className={styles.cell}>
            <h2 className={`${styles.cellHeading} type-colophon`}>
              DOCUMENTS &amp; SCOPE
            </h2>
            <div className={`${styles.cellList} type-colophon`}>
              <p>ARCHIVE VOL. IV · 27 CATALOGED SPECIMENS.</p>
              <p>CONTINENTS: EUROPE, ASIA, AMERICAS, MIDDLE EAST.</p>
              <p>MONOLITH EDITORIAL MONOGRAPH SERIES.</p>
            </div>
          </div>
        </div>

        <div className={styles.rulerBand}>
          <ScaleRuler unitLabel="SURVEY METRIC DATUM · 00 TO 120 METERS" />
          <div className={`${styles.bottomMeta} type-colophon`}>
            <span>
              MONOLITH — ARCHIVE OF LOAD-BEARING STONE AND RAW CONCRETE · 126 CE–PRESENT
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className={`${styles.topButton} type-ui-label`}
            >
              <span>TOP OF FOLIO</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
