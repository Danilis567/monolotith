'use client';

import { useId, useState } from 'react';

const GUIDE_ITEMS = [
  {
    label: 'CAT. NO.',
    description: 'Sequential archive catalog number (001–027).',
  },
  {
    label: 'ELEV. / HEIGHT',
    description: 'Measured vertical height in metres from ground datum.',
  },
  {
    label: 'COORDINATES',
    description: 'Exact GPS map position (WGS84).',
  },
] as const;

export function ReadingGuide({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          minBlockSize: '44px',
          paddingInline: '0.75rem',
          paddingBlock: '0.45rem',
          border: '1px solid var(--border-structural)',
          borderRadius: 0,
          backgroundColor: 'var(--surface-canvas)',
          color: 'var(--ink-primary)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          boxShadow: 'none',
          backdropFilter: 'none',
        }}
      >
        {open ? 'READING GUIDE [ − ]' : 'READING GUIDE [ + ]'}
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Archive reading guide"
          style={{
            marginBlockStart: '0.5rem',
            padding: '0.875rem 1rem',
            border: '1px solid var(--border-structural)',
            borderRadius: 0,
            backgroundColor: 'var(--surface-canvas)',
            color: 'var(--ink-primary)',
            boxShadow: 'none',
            backdropFilter: 'none',
          }}
        >
          <dl
            style={{
              margin: 0,
              display: 'grid',
              gap: '0.5rem',
            }}
          >
            {GUIDE_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.35rem 0.65rem',
                  alignItems: 'baseline',
                  fontSize: '0.8125rem',
                  lineHeight: 1.45,
                }}
              >
                <dt
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-primary)',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  — {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
