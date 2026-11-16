'use client';

import { useCallback } from 'react';
import { CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import type { DesignSystemComponentEntry } from '@/design-system/registry';
import type { DesignSystemTokensPayload, SurfaceIslandId } from '@/design-system/tokens';
import { BrandSection } from './BrandSection';
import { ComponentsSection } from './ComponentsSection';
import styles from './DesignSystem.module.css';
import { FoundationsSection } from './FoundationsSection';
import { PatternsSection } from './PatternsSection';

export interface DesignSystemSectionProps {
  tokens: DesignSystemTokensPayload;
  registry: DesignSystemComponentEntry[];
  previewSurface: SurfaceIslandId;
  onCopy: (value: string, label?: string) => void;
}

export interface DesignSystemClientProps {
  tokens: DesignSystemTokensPayload;
  components: DesignSystemComponentEntry[];
}

function FrameCorners() {
  return (
    <>
      <CornerCrosshair className={styles.crosshairTL} />
      <CornerCrosshair className={styles.crosshairTR} />
      <CornerCrosshair className={styles.crosshairBL} />
      <CornerCrosshair className={styles.crosshairBR} />
    </>
  );
}

export function DesignSystemClient({ tokens, components }: DesignSystemClientProps) {
  const previewSurface: SurfaceIslandId = 'void';

  const handleCopy = useCallback((value: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {
        // Clipboard unavailable; silent no-op.
      });
    }
  }, []);

  return (
    <div data-surface="void" className={styles.canvasRoot}>
      <div className={styles.workspace}>
        <div className={styles.canvasColumn}>
          <section aria-labelledby="ds-cover-title" className={styles.canvasFrame}>
            <FrameCorners />
            <SteppedFrame style={{ color: 'var(--border-hairline)' }} />
            <div className={styles.frameHeader}>
              <span className={`type-colophon ${styles.frameLabel}`}>
                <span className="signal-dot" aria-hidden="true" />
                00 // KAPAK
              </span>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                TASARIM KILAVUZU // SÜRÜM 04
              </span>
            </div>

            <h1 id="ds-cover-title" className={`type-monolith ${styles.coverTitle}`}>
              MONOLITH TASARIM SİSTEMİ
            </h1>

            <dl className={styles.coverLedger}>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>SÜRÜM</dt>
                <dd className={`type-subhead ${styles.ledgerVal}`}>04</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>TARİH</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>17 / 11 / 2026</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>PALET</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {tokens.primitives.length} RENK · 4 YÜZEY
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>BİLEŞENLER</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {components.length} BİLEŞEN
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>TASARIM</dt>
                <dd className={`type-subhead ${styles.ledgerVal}`}>DANİL</dd>
              </div>
            </dl>

            <p className={`type-body-lead ${styles.coverNote}`}>
              MONOLITH sitesinin renkleri, yazı tipleri, logoları ve bileşenleri.
            </p>
          </section>

          <section id="foundations" aria-labelledby="frame-foundations" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-foundations" className={`type-colophon ${styles.frameLabel}`}>
                01 / TEMELLER
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                RENK · YAZI · IZGARA · HAREKET
              </span>
            </div>
            <FoundationsSection tokens={tokens} previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="brand" aria-labelledby="frame-brand" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-brand" className={`type-colophon ${styles.frameLabel}`}>
                02 / MARKA
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                LOGOLAR VE YAZIM KURALLARI
              </span>
            </div>
            <BrandSection previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="components" aria-labelledby="frame-components" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-components" className={`type-colophon ${styles.frameLabel}`}>
                03 / BİLEŞENLER
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                {components.length} BİLEŞEN
              </span>
            </div>
            <ComponentsSection
              registry={components}
              tokens={tokens}
              previewSurface={previewSurface}
            />
          </section>

          <section id="patterns" aria-labelledby="frame-patterns" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-patterns" className={`type-colophon ${styles.frameLabel}`}>
                04 / ŞABLONLAR VE KURALLAR
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                WCAG AA KONTRAST VE IZGARA
              </span>
            </div>
            <PatternsSection tokens={tokens} previewSurface={previewSurface} />
          </section>
        </div>
      </div>
    </div>
  );
}
