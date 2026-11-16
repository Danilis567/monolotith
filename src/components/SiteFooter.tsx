'use client';

import Link from 'next/link';
import { ScaleRuler } from './DraftingMarks';
import styles from './SiteFooter.module.css';

const COLOPHON_SPECS = [
  { label: 'COORDINATES', value: 'GPS (WGS84) · METRES' },
  { label: 'COLLECTION', value: '27 CATALOGED BUILDINGS' },
  { label: 'PHOTOGRAPHS', value: 'WIKIMEDIA COMMONS (OPEN LICENSE)' },
  { label: 'DRAWINGS', value: 'ORIGINAL, DRAWN FOR THIS ARCHIVE' },
] as const;

const SECTION_LINKS = [
  { href: '/', label: 'HOME' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/anatomy', label: 'ANATOMY' },
] as const;

const DISCIPLINE_LINKS = [
  { href: '/archive?movement=Brutalist', label: 'BRUTALIST · 1947–1980' },
  { href: '/archive?movement=Gothic', label: 'GOTHIC · 1163–1965' },
  { href: '/archive?movement=Monumental', label: 'MONUMENTAL · 126 CE–PRESENT' },
] as const;

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={styles.container}>
        <div className={styles.upperBand}>
          <div className={styles.manifestoCol}>
            <div className={styles.brandRow}>
              <img
                src="/brand/monolith-wordmark-dark.svg"
                alt="MONOLITH"
                width={220}
                height={53}
                className={styles.wordmark}
              />
              <p className={`${styles.overline} type-colophon`}>
                <span className="signal-dot" aria-hidden="true" />
                <span>ARCHITECTURAL ARCHIVE · VOLUME IV</span>
              </p>
            </div>
            <p className={styles.statement}>
              ARCHIVE OF LOAD-BEARING STONE &amp; RAW CONCRETE · 126 CE–PRESENT
            </p>
          </div>

          <aside className={styles.colophonCard} aria-label="Technical Colophon">
            <dl className={styles.colophonGrid}>
              {COLOPHON_SPECS.map((spec) => (
                <div key={spec.label} className={styles.specItem}>
                  <dt className={`${styles.specLabel} type-colophon`}>{spec.label}</dt>
                  <dd className={`${styles.specValue} type-colophon`}>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <nav className={styles.directoryGrid} aria-label="Footer Directory">
          <div className={styles.directoryCol}>
            <h2 className={`${styles.colHeading} type-ui-label`}>SECTIONS</h2>
            <ul className={styles.linkList}>
              {SECTION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${styles.navLink} type-colophon`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.directoryCol}>
            <h2 className={`${styles.colHeading} type-ui-label`}>DISCIPLINES</h2>
            <ul className={styles.linkList}>
              {DISCIPLINE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${styles.navLink} type-colophon`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.directoryCol}>
            <h2 className={`${styles.colHeading} type-ui-label`}>SCOPE &amp; ACTION</h2>
            <div className={styles.scopeAction}>
              <p className={`${styles.scopeText} type-colophon`}>
                EUROPE · ASIA · AMERICAS · MIDDLE EAST
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                className={`${styles.topButton} type-ui-label`}
              >
                <span>BACK TO TOP</span>
                <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </nav>

        <div className={styles.baselineBand}>
          <ScaleRuler unitLabel="HEIGHT SCALE · 00 TO 120 METRES" />
          <p className={`${styles.legalLine} type-colophon`}>
            MONOLITH — ARCHIVE VOLUME IV · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
