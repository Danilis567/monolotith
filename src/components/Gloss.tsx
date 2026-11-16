'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { GLOSSARY_TERMS, type GlossaryKey } from '@/data/glossary';
import styles from './Gloss.module.css';

export function Gloss({
  term,
  children,
}: {
  term: GlossaryKey;
  children?: React.ReactNode;
}) {
  const entry = GLOSSARY_TERMS[term];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeAndReturnFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAndReturnFocus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open, closeAndReturnFocus]);

  return (
    <span ref={rootRef} className={styles.root}>
      <span className={styles.term}>{children ?? entry.term}</span>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Explain ${entry.term}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        [ ? ]
      </button>

      {open && (
        <span
          id={panelId}
          role="region"
          aria-label={`${entry.term} glossary note`}
          className={styles.panel}
        >
          <span className={styles.panelHeader}>
            <span className={styles.panelLabel}>{entry.term}</span>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label={`Close ${entry.term} definition`}
              onClick={closeAndReturnFocus}
            >
              [ × ]
            </button>
          </span>
          <span className={styles.panelBody}>
            <span className={styles.plain}>{entry.plain.toUpperCase()}</span>
            {' — '}
            {entry.definition}
          </span>
        </span>
      )}
    </span>
  );
}
