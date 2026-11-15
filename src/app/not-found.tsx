import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      data-surface="dark"
      style={{
        minBlockSize: 'calc(100dvh - var(--header-height))',
        display: 'grid',
        placeItems: 'center',
        paddingBlock: '4rem',
        paddingInline: 'var(--grid-margin)',
        borderBottom: '1px solid var(--border-hairline)',
      }}
    >
      <div
        style={{
          maxInlineSize: '42rem',
          inlineSize: '100%',
          border: '1px solid var(--border-structural)',
          padding: '2.5rem',
          display: 'grid',
          gap: '1.5rem',
          backgroundColor: 'var(--surface-basalt)',
        }}
      >
        <p className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
          × FOLIO ERR 404 — MISSING RECORD
        </p>
        <h1 className="type-display">CATALOG PLATE NOT FOUND</h1>
        <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
          The requested structural monograph is not registered in Archive Volume IV, or its index
          coordinates have shifted.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
          <Link href="/archive" className="btn-monolith btn-monolith--primary">
            <span>RETURN TO 02 ARCHIVE</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" className="btn-monolith">
            <span>01 HOME</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
