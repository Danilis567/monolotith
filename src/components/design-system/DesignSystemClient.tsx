'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

type SectionId = 'foundations' | 'brand' | 'components' | 'patterns';

const SURFACE_OPTIONS: ReadonlyArray<{ id: SurfaceIslandId; label: string }> = [
  { id: 'void', label: 'VOID' },
  { id: 'basalt', label: 'BASALT' },
  { id: 'plaster', label: 'PLASTER' },
  { id: 'limestone', label: 'LIMESTONE' },
];

const TOC_ITEMS: ReadonlyArray<{ id: SectionId; num: string; label: string }> = [
  { id: 'foundations', num: '01', label: 'FOUNDATIONS' },
  { id: 'brand', num: '02', label: 'BRAND' },
  { id: 'components', num: '03', label: 'COMPONENTS' },
  { id: 'patterns', num: '04', label: 'PATTERNS & RULES' },
];

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
  const [previewSurface, setPreviewSurface] = useState<SurfaceIslandId>('void');
  const [showGrid, setShowGrid] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('foundations');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback((value: string, label?: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {
        // Clipboard permission denied or unavailable; still show status feedback.
      });
    }
    setCopiedValue(label ? `${label} (${value})` : value);
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = setTimeout(() => {
      setCopiedValue(null);
    }, 2800);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const ids: SectionId[] = ['foundations', 'brand', 'components', 'patterns'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.45],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div data-surface="void" className={styles.canvasRoot}>
      {showGrid && (
        <div className={styles.gridOverlay} aria-hidden="true">
          <div className={styles.gridOverlayInner}>
            {Array.from({ length: 12 }, (_, idx) => {
              const colClass =
                idx < 4
                  ? styles.gridOverlayCol
                  : idx < 8
                    ? `${styles.gridOverlayCol} ${styles.gridOverlayColTablet}`
                    : `${styles.gridOverlayCol} ${styles.gridOverlayColDesktop}`;
              return <div key={idx} className={colClass} />;
            })}
          </div>
        </div>
      )}

      <header className={styles.canvasBar}>
        <div className={styles.barBrand}>
          <span className={`type-colophon ${styles.barTitle}`}>MONOLITH // DESIGN SYSTEM</span>
          <span className={`type-colophon ${styles.volBadge}`}>
            <span className="signal-dot" aria-hidden="true" />
            VOL. IV
          </span>
        </div>

        <div className={styles.barControls}>
          <div className={styles.surfaceGroup} role="group" aria-label="Preview surface">
            {SURFACE_OPTIONS.map((surface) => (
              <button
                key={surface.id}
                type="button"
                className={`type-ui-label ${styles.surfaceBtn}`}
                aria-pressed={previewSurface === surface.id}
                onClick={() => setPreviewSurface(surface.id)}
              >
                {surface.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`type-ui-label ${styles.gridToggle}`}
            aria-pressed={showGrid}
            onClick={() => setShowGrid((prev) => !prev)}
          >
            {showGrid && <span className="signal-dot" aria-hidden="true" />}
            SHOW GRID
          </button>

          <div
            aria-live="polite"
            className={`type-colophon ${styles.copyStatus} ${copiedValue ? styles.copyStatusActive : ''}`}
          >
            {copiedValue ? (
              <>
                <span className="signal-dot" aria-hidden="true" />
                <span>COPIED: {copiedValue}</span>
              </>
            ) : (
              <span>READY // CLICK TOKEN</span>
            )}
          </div>
        </div>
      </header>

      <div className={styles.workspace}>
        <nav aria-label="Design system sections" className={styles.tocRail}>
          <div className={`type-colophon ${styles.tocHeader}`}>
            <span>INDEX // CANVAS</span>
            <span className="tabular-nums">04</span>
          </div>
          <ul className={styles.tocList}>
            {TOC_ITEMS.map((item) => (
              <li key={item.id} className={styles.tocItem}>
                <a
                  href={`#${item.id}`}
                  className={`type-colophon ${styles.tocLink}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span>
                    {item.num} {item.label}
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className={`type-colophon ${styles.tocMeta}`}>
            SURFACE: {previewSurface.toUpperCase()}
          </div>
        </nav>

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
                PREVIEW SURFACE: {previewSurface.toUpperCase()}
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
                <dt className={`type-colophon ${styles.ledgerKey}`}>COLOR TOKENS</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {tokens.allColorCssVars.length} CSS VARIABLES
                </dd>
              </div>
              <div className={styles.ledgerCell}>
                <dt className={`type-colophon ${styles.ledgerKey}`}>COMPONENTS</dt>
                <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                  {components.length} REGISTERED
                </dd>
              </div>
            </dl>

            <p className={`type-body-lead ${styles.coverNote}`}>
              Single source of truth for the MONOLITH editorial archive. Every token, type scale,
              surface island, and interactive component rendered live from source.
            </p>
          </section>

          <section id="foundations" aria-labelledby="frame-foundations" className={styles.canvasFrame}>
            <FrameCorners />
            <div className={styles.frameHeader}>
              <h2 id="frame-foundations" className={`type-colophon ${styles.frameLabel}`}>
                FRAME 01 / FOUNDATIONS
              </h2>
              <span className={`type-colophon ${styles.frameSurfaceTag}`}>
                TOKENS // {tokens.primitives.length} PRIMITIVES
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
                REGISTRY // {components.length} MODULES
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
