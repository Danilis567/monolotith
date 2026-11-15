import type { CSSProperties } from 'react';

export function CornerCrosshair({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path
        d="M 6.5 0.5 V 12.5 M 0.5 6.5 H 12.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/** Concave 4-point surveyor alignment star */
export function AlignmentStar({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M 7.5 0.5 Q 7.5 7.5 14.5 7.5 Q 7.5 7.5 7.5 14.5 Q 7.5 7.5 0.5 7.5 Q 7.5 7.5 7.5 0.5 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/** Top mitered L-shaped drafting bracket marks inset cleanly from the specimen perimeter */
export function SteppedFrame({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        position: 'absolute',
        inset: '0.75rem',
        width: 'calc(100% - 1.5rem)',
        height: 'calc(100% - 1.5rem)',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path d="M 0 6 V 0 H 6" />
        <path d="M 94 0 H 100 V 6" />
      </g>
    </svg>
  );
}

export function ScaleRuler({
  ticks = ['00', '20', '40', '60', '80', '100', '120'],
  unitLabel = 'ELEVATION / METRIC DATUM',
  className,
}: {
  ticks?: readonly string[];
  unitLabel?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: 'grid',
        gap: '0.35rem',
        color: 'var(--ink-secondary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border-hairline)',
          paddingBottom: '0.25rem',
        }}
      >
        {ticks.map((tick) => (
          <div
            key={tick}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span
              className="type-colophon"
              style={{ fontSize: '0.6875rem', lineHeight: 1 }}
            >
              {tick}
            </span>
            <span
              style={{
                display: 'block',
                width: '1px',
                height: '6px',
                backgroundColor: 'var(--border-hairline)',
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="type-colophon"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.6875rem',
          color: 'var(--ink-secondary)',
        }}
      >
        <span>{unitLabel}</span>
        <span>REV. IV — ARCHIVAL</span>
      </div>
    </div>
  );
}
