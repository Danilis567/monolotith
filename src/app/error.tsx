'use client';

import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section
      data-surface="dark"
      style={{
        minBlockSize: '60dvh',
        display: 'grid',
        placeItems: 'center',
        paddingBlock: '4rem',
        paddingInline: 'var(--grid-margin)',
      }}
    >
      <div
        style={{
          maxInlineSize: '42rem',
          inlineSize: '100%',
          border: '1px solid var(--border-structural)',
          padding: '2.5rem',
          display: 'grid',
          gap: '1.25rem',
          backgroundColor: 'var(--surface-basalt)',
        }}
      >
        <p className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
          × ARCHIVAL SYSTEM INTERRUPT
        </p>
        <h1 className="type-display">PLATE RENDER FAULT</h1>
        <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
          {error.message || 'An unexpected interruption occurred while assembling this folio.'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <button type="button" onClick={reset} className="btn-monolith btn-monolith--primary">
            <span>RELOAD PLATE</span>
            <span aria-hidden="true">↻</span>
          </button>
          <Link href="/" className="btn-monolith">
            <span>RETURN HOME</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
