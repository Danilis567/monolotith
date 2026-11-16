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
                PAFTA 00 // KAPAK
              </span>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                TASARIM SPESİFİKASYONU // EDİSYON IV
              </span>
            </div>

            <h1 id="ds-cover-title" className={`type-monolith ${styles.coverTitle}`}>
              MONOLITH TASARIM SİSTEMİ
            </h1>

            <dl className={styles.coverLedger}>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>EDİSYON</dt>
                <dd className={`type-subhead ${styles.ledgerVal}`}>EDİSYON 04</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>TARİH</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>17 / 11 / 2026</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>PALET</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {tokens.primitives.length} TEMEL TON · 4 YÜZEY
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>BİLEŞENLER</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {components.length} MODÜL
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>TASARIM</dt>
                <dd className={`type-subhead ${styles.ledgerVal}`}>DANİL</dd>
              </div>
            </dl>

            <p className={`type-body-lead ${styles.coverNote}`}>
              MONOLITH editoryal arşivi için görsel dil, tipografik hiyerarşi, yüzey mimarisi ve
              arayüz bileşen standartları.
            </p>
          </section>

          <section id="foundations" aria-labelledby="frame-foundations" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-foundations" className={`type-colophon ${styles.frameLabel}`}>
                PAFTA 01 / TEMELLER
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                RENK · TİPOGRAFİ · BOŞLUK · HAREKET
              </span>
            </div>
            <FoundationsSection tokens={tokens} previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="brand" aria-labelledby="frame-brand" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-brand" className={`type-colophon ${styles.frameLabel}`}>
                PAFTA 02 / MARKA
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                KİMLİK // LOGO &amp; ANLATIM DİLİ
              </span>
            </div>
            <BrandSection previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="components" aria-labelledby="frame-components" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-components" className={`type-colophon ${styles.frameLabel}`}>
                PAFTA 03 / BİLEŞENLER
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                ARAYÜZ MİMARİSİ // {components.length} MODÜL
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
                PAFTA 04 / DESENLER &amp; KURALLAR
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                YÖNETİŞİM // WCAG AA &amp; IZGARA
              </span>
            </div>
            <PatternsSection tokens={tokens} previewSurface={previewSurface} />
          </section>
        </div>
      </div>
    </div>
  );
}
