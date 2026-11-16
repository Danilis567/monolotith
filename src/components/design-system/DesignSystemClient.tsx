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
                FRAME 00 // COVER
              </span>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                DESIGN SPECIFICATION // VOL. IV
              </span>
            </div>

            <h1 id="ds-cover-title" className={`type-monolith ${styles.coverTitle}`}>
              MONOLITH DESIGN SYSTEM
            </h1>

            <dl className={styles.coverLedger}>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>EDITION</dt>
                <dd className={`type-subhead ${styles.ledgerVal}`}>VOLUME IV</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>SURVEY DATE</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>16 / 11 / 2026</dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>PALETTE</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {tokens.primitives.length} PRIMITIVES · 4 SURFACES
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>COMPONENTS</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {components.length} MODULES
                </dd>
              </div>
            </dl>

            <p className={`type-body-lead ${styles.coverNote}`}>
              Visual language, typographic hierarchy, surface architecture, and UI component
              specifications for the MONOLITH editorial archive.
            </p>
          </section>

          <section id="foundations" aria-labelledby="frame-foundations" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-foundations" className={`type-colophon ${styles.frameLabel}`}>
                FRAME 01 / FOUNDATIONS
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                COLOR · TYPOGRAPHY · SPACING · MOTION
              </span>
            </div>
            <FoundationsSection tokens={tokens} previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="brand" aria-labelledby="frame-brand" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-brand" className={`type-colophon ${styles.frameLabel}`}>
                FRAME 02 / BRAND
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                IDENTITY // WORDMARK &amp; VOICE
              </span>
            </div>
            <BrandSection previewSurface={previewSurface} onCopy={handleCopy} />
          </section>

          <section id="components" aria-labelledby="frame-components" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-components" className={`type-colophon ${styles.frameLabel}`}>
                FRAME 03 / COMPONENTS
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                UI ARCHITECTURE // {components.length} MODULES
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
                FRAME 04 / PATTERNS &amp; RULES
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                GOVERNANCE // WCAG AA &amp; GRID
              </span>
            </div>
            <PatternsSection tokens={tokens} previewSurface={previewSurface} />
          </section>
        </div>
      </div>
    </div>
  );
}
