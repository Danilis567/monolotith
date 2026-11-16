'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { AnatomyCallout, AnatomyDimensionRow } from '@/data/anatomyPlates';
import { CornerCrosshair } from './DraftingMarks';
import styles from './AnatomyStage.module.css';
import '@/app/(site)/anatomy/anatomyLayers.css';

export interface AnatomyStageProps {
  svgMarkup: string;
  callouts: AnatomyCallout[];
  dimensions: AnatomyDimensionRow[];
  showStructure: boolean;
  showAxis: boolean;
  showDimensions: boolean;
  selectedCalloutCode: string | null;
  selectedDimensionId: string | null;
  onSelectCallout: (code: string | null) => void;
  onSelectDimension: (id: string | null) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  plateTitle: string;
  plateScale: string;
}

interface Point {
  x: number;
  y: number;
}

interface DimensionLineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX?: number;
  labelY?: number;
}

type CalloutWithAnchor = AnatomyCallout & {
  anchor?: Point;
};

type DimensionWithLine = AnatomyDimensionRow & {
  id?: string;
  line?: DimensionLineCoords;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;
const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 750;
const DRAG_THRESHOLD_PX = 5;
const KEY_PAN_STEP_PX = 40;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundZoom(value: number): number {
  return Math.round(clamp(value, MIN_ZOOM, MAX_ZOOM) * 100) / 100;
}

export function AnatomyStage({
  svgMarkup,
  callouts,
  dimensions,
  showStructure,
  showAxis,
  showDimensions,
  selectedCalloutCode,
  selectedDimensionId,
  onSelectCallout,
  onSelectDimension,
  isFullscreen,
  onToggleFullscreen,
  plateTitle,
  plateScale,
}: AnatomyStageProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const transformLayerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const zoomRef = useRef<number>(zoom);
  const panRef = useRef<Point>(pan);

  useEffect(() => {
    zoomRef.current = zoom;
    panRef.current = pan;
  }, [zoom, pan]);

  const pointersRef = useRef<Map<number, Point>>(new Map());
  const dragStartRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
    moved: boolean;
  } | null>(null);
  const pinchStartRef = useRef<{
    dist: number;
    zoom: number;
    panX: number;
    panY: number;
    midX: number;
    midY: number;
  } | null>(null);
  const suppressClickRef = useRef<boolean>(false);

  const clampPan = useCallback((nextPan: Point, targetZoom: number): Point => {
    if (targetZoom <= 1) {
      return { x: 0, y: 0 };
    }
    const viewport = viewportRef.current;
    const layer = transformLayerRef.current;
    const baseW = layer?.offsetWidth || viewport?.clientWidth || 0;
    const baseH = layer?.offsetHeight || viewport?.clientHeight || 0;
    const maxPanX = Math.max(0, ((targetZoom - 1) * baseW) / 2);
    const maxPanY = Math.max(0, ((targetZoom - 1) * baseH) / 2);
    return {
      x: clamp(nextPan.x, -maxPanX, maxPanX),
      y: clamp(nextPan.y, -maxPanY, maxPanY),
    };
  }, []);

  const applyZoom = useCallback(
    (nextZoomRaw: number, nextPanRaw?: Point) => {
      const nextZoom = roundZoom(nextZoomRaw);
      const basePan = nextPanRaw ?? panRef.current;
      const clampedPan = clampPan(basePan, nextZoom);
      setZoom(nextZoom);
      setPan(clampedPan);
    },
    [clampPan],
  );

  const handleZoomIn = useCallback(() => {
    const nextZoom = roundZoom(zoomRef.current + ZOOM_STEP);
    const ratio = nextZoom / zoomRef.current;
    applyZoom(nextZoom, {
      x: panRef.current.x * ratio,
      y: panRef.current.y * ratio,
    });
  }, [applyZoom]);

  const handleZoomOut = useCallback(() => {
    const nextZoom = roundZoom(zoomRef.current - ZOOM_STEP);
    const ratio = nextZoom / zoomRef.current;
    applyZoom(nextZoom, {
      x: panRef.current.x * ratio,
      y: panRef.current.y * ratio,
    });
  }, [applyZoom]);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Native non-passive wheel listener so normal page scroll at 100% is never hijacked
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      const currentZoom = zoomRef.current;
      if (!e.ctrlKey && !e.metaKey && currentZoom <= 1) {
        return;
      }
      e.preventDefault();

      const direction = e.deltaY < 0 ? 1 : -1;
      const nextZoom = roundZoom(currentZoom + direction * ZOOM_STEP);
      if (nextZoom === currentZoom) return;

      const rect = viewport.getBoundingClientRect();
      const cx = e.clientX - (rect.left + rect.width / 2);
      const cy = e.clientY - (rect.top + rect.height / 2);
      const ratio = nextZoom / currentZoom;
      const nextPan = {
        x: cx - (cx - panRef.current.x) * ratio,
        y: cy - (cy - panRef.current.y) * ratio,
      };
      applyZoom(nextZoom, nextPan);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      viewport.removeEventListener('wheel', onWheel);
    };
  }, [applyZoom]);

  // Center selected callout or dimension when zoomed in
  useEffect(() => {
    const currentZoom = zoomRef.current;
    if (currentZoom <= 1) return;

    let targetPoint: Point | null = null;

    if (selectedCalloutCode) {
      const match = (callouts as CalloutWithAnchor[]).find(
        (c) => c.code === selectedCalloutCode && c.anchor,
      );
      if (match?.anchor) {
        targetPoint = match.anchor;
      }
    } else if (selectedDimensionId) {
      const match = (dimensions as DimensionWithLine[]).find(
        (d) => (d.id ?? d.parameter) === selectedDimensionId && d.line,
      );
      if (match?.line) {
        targetPoint = {
          x: match.line.labelX ?? (match.line.x1 + match.line.x2) / 2,
          y: match.line.labelY ?? (match.line.y1 + match.line.y2) / 2,
        };
      }
    }

    if (!targetPoint) return;

    const layer = transformLayerRef.current;
    const viewport = viewportRef.current;
    const baseW = layer?.offsetWidth || viewport?.clientWidth || 0;
    const baseH = layer?.offsetHeight || viewport?.clientHeight || 0;
    if (!baseW || !baseH) return;

    const normX = (targetPoint.x - VIEWBOX_WIDTH / 2) / VIEWBOX_WIDTH;
    const normY = (targetPoint.y - VIEWBOX_HEIGHT / 2) / VIEWBOX_HEIGHT;

    setPan(
      clampPan(
        {
          x: -normX * baseW * currentZoom,
          y: -normY * baseH * currentZoom,
        },
        currentZoom,
      ),
    );
  }, [selectedCalloutCode, selectedDimensionId, callouts, dimensions, clampPan]);

  const handlePointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
        moved: false,
      };
      pinchStartRef.current = null;
    } else if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      pinchStartRef.current = {
        dist: Math.max(1, dist),
        zoom: zoomRef.current,
        panX: panRef.current.x,
        panY: panRef.current.y,
        midX: (pts[0].x + pts[1].x) / 2,
        midY: (pts[0].y + pts[1].y) / 2,
      };
      dragStartRef.current = null;
      setIsDragging(true);
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!pointersRef.current.has(e.pointerId)) return;
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointersRef.current.size === 2 && pinchStartRef.current) {
        const pts = Array.from(pointersRef.current.values());
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        const ratio = dist / pinchStartRef.current.dist;
        const nextZoom = roundZoom(pinchStartRef.current.zoom * ratio);

        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        const dx = midX - pinchStartRef.current.midX;
        const dy = midY - pinchStartRef.current.midY;

        applyZoom(nextZoom, {
          x: pinchStartRef.current.panX + dx,
          y: pinchStartRef.current.panY + dy,
        });
        return;
      }

      if (pointersRef.current.size === 1 && dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;

        if (!dragStartRef.current.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
          dragStartRef.current.moved = true;
          suppressClickRef.current = true;
          if (zoomRef.current > 1) {
            setIsDragging(true);
            try {
              viewportRef.current?.setPointerCapture(e.pointerId);
            } catch {
              // Ignore if capture is unsupported
            }
          }
        }

        if (dragStartRef.current.moved && zoomRef.current > 1) {
          setPan(
            clampPan(
              {
                x: dragStartRef.current.panX + dx,
                y: dragStartRef.current.panY + dy,
              },
              zoomRef.current,
            ),
          );
        }
      }
    },
    [applyZoom, clampPan],
  );

  const handlePointerEnd = useCallback((e: PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);

    if (viewportRef.current?.hasPointerCapture?.(e.pointerId)) {
      try {
        viewportRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    if (pointersRef.current.size < 2) {
      pinchStartRef.current = null;
    }

    if (pointersRef.current.size === 0) {
      dragStartRef.current = null;
      setIsDragging(false);
      if (suppressClickRef.current) {
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    }
  }, []);

  const handleViewportKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleReset();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setPan((prev) => clampPan({ x: prev.x, y: prev.y + KEY_PAN_STEP_PX }, zoomRef.current));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setPan((prev) => clampPan({ x: prev.x, y: prev.y - KEY_PAN_STEP_PX }, zoomRef.current));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPan((prev) => clampPan({ x: prev.x + KEY_PAN_STEP_PX, y: prev.y }, zoomRef.current));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPan((prev) => clampPan({ x: prev.x - KEY_PAN_STEP_PX, y: prev.y }, zoomRef.current));
      } else if (e.key === 'Escape') {
        if (selectedCalloutCode !== null || selectedDimensionId !== null) {
          e.preventDefault();
          onSelectCallout(null);
          onSelectDimension(null);
        } else if (isFullscreen) {
          e.preventDefault();
          onToggleFullscreen();
        }
      }
    },
    [
      clampPan,
      handleReset,
      handleZoomIn,
      handleZoomOut,
      isFullscreen,
      onSelectCallout,
      onSelectDimension,
      onToggleFullscreen,
      selectedCalloutCode,
      selectedDimensionId,
    ],
  );

  const typedCallouts = callouts as CalloutWithAnchor[];
  const typedDimensions = dimensions as DimensionWithLine[];

  return (
    <div
      className={isFullscreen ? `${styles.stage} ${styles.stageFullscreen}` : styles.stage}
      role="region"
      aria-label={`${plateTitle} (${plateScale}) interactive drawing stage`}
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            −
          </button>
          <span className={styles.zoomReadout} aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleReset}
            disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
          >
            FIT / RESET
          </button>
        </div>

        <span className={styles.plateMeta}>
          {plateTitle} · {plateScale}
        </span>

        <div className={styles.toolbarGroup}>
          <span className={styles.panHint}>DRAG TO PAN · CLICK PIN OR DIMENSION</span>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={onToggleFullscreen}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? 'EXIT FULLSCREEN [ × ]' : 'EXPAND SHEET'}
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={styles.canvasViewport}
        tabIndex={0}
        data-zoomed={zoom > 1 ? 'true' : 'false'}
        data-dragging={isDragging ? 'true' : 'false'}
        aria-label="Interactive orthographic drawing canvas. Use plus and minus keys to zoom, arrow keys to pan, Escape to clear selection."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleViewportKeyDown}
      >
        <CornerCrosshair className={`${styles.cornerMark} ${styles.cornerTL}`} />
        <CornerCrosshair className={`${styles.cornerMark} ${styles.cornerTR}`} />
        <CornerCrosshair className={`${styles.cornerMark} ${styles.cornerBL}`} />
        <CornerCrosshair className={`${styles.cornerMark} ${styles.cornerBR}`} />

        <div
          ref={transformLayerRef}
          className={styles.transformLayer}
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          <div
            className={styles.svgLayer}
            data-show-structure={showStructure}
            data-show-axis={showAxis}
            data-show-dimensions={showDimensions}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />

          <svg
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className={styles.overlaySvg}
            aria-label="Interactive callout pins and dimension lines"
          >
            {typedDimensions.map((row) => {
              if (!row.line) return null;
              const dimId = row.id ?? row.parameter;
              const isSelected = selectedDimensionId === dimId;
              const { x1, y1, x2, y2 } = row.line;

              const toggleDimension = () => {
                if (suppressClickRef.current) return;
                onSelectDimension(isSelected ? null : dimId);
              };

              return (
                <g
                  key={dimId}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Inspect dimension ${row.parameter}: ${row.metricValue}`}
                  className={styles.dimensionGroup}
                  data-active={isSelected}
                  onClick={toggleDimension}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectDimension(isSelected ? null : dimId);
                    }
                  }}
                >
                  <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.hitLine} />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.dimensionLine} />
                </g>
              );
            })}

            {typedCallouts.map((callout) => {
              if (!callout.anchor) return null;
              const isSelected = selectedCalloutCode === callout.code;

              const toggleCallout = () => {
                if (suppressClickRef.current) return;
                onSelectCallout(isSelected ? null : callout.code);
              };

              return (
                <g
                  key={callout.code}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Inspect ${callout.code} ${callout.label}: ${callout.value}`}
                  className={styles.pinGroup}
                  data-active={isSelected}
                  transform={`translate(${callout.anchor.x}, ${callout.anchor.y})`}
                  onClick={toggleCallout}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectCallout(isSelected ? null : callout.code);
                    }
                  }}
                >
                  <circle r={24} className={styles.pinHit} />
                  <rect x={-9} y={-9} width={18} height={18} className={styles.pinBox} />
                  <text x={0} y={0} className={styles.pinCode}>
                    {callout.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
