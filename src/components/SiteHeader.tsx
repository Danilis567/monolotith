'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import styles from './SiteHeader.module.css';

const PRIMARY_NAV = [
  { index: '01', href: '/', label: '01 HOME', folio: '01', desc: 'Poster Exhibition' },
  { index: '02', href: '/archive', label: '02 ARCHIVE', folio: '02', desc: '27 Cataloged Structures' },
  { index: '03', href: '/anatomy', label: '03 ANATOMY', folio: '03', desc: '09 Measured Sections' },
] as const;

export function SiteHeader({ plateCount }: { plateCount: number }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/archive') {
      return (
        pathname === '/archive' ||
        pathname.startsWith('/archive/') ||
        pathname.startsWith('/structures/')
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  }, [pathname]);

  const openDrawer = () => {
    dialogRef.current?.showModal();
  };

  const closeDrawer = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <header className={styles.header} data-surface="dark">
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.brandLink}
            aria-label="MONOLITH — Monumental Archive Home"
          >
            <img
              src="/brand/nav-lockup.svg"
              alt="MONOLITH"
              width={145}
              height={28}
              className={styles.brandLogo}
            />
          </Link>

          <nav aria-label="Primary sections">
            <ul className={styles.navList}>
              {PRIMARY_NAV.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.statusCell}>
            <Link
              href="/archive"
              className={`${styles.indexedBadge} type-colophon`}
              title="Open 27-structure Archive"
            >
              <span className="signal-dot" aria-hidden="true" />
              <span>INDEXED: {plateCount} PLATES</span>
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className={`${styles.menuButton} type-ui-label`}
              aria-haspopup="dialog"
              aria-controls="monolith-nav-drawer"
              aria-label="Open archival navigation menu"
            >
              <span>INDEX</span>
              <span aria-hidden="true">[ + ]</span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="monolith-nav-drawer"
        ref={dialogRef}
        aria-label="Archival Folio Navigation"
        className="monolith-drawer"
        data-surface="dark"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeDrawer();
          }
        }}
      >
        <div className={styles.drawerInner}>
          <div className={styles.drawerHeader}>
            <span className="type-colophon">FOLIO INDEX — MONOLITH</span>
            <button
              type="button"
              onClick={closeDrawer}
              className="btn-monolith"
              aria-label="Close navigation menu"
            >
              <span>CLOSE</span>
              <span aria-hidden="true">[ × ]</span>
            </button>
          </div>

          <nav aria-label="Full archival navigation" className={styles.drawerNav}>
            <ul>
              <li className={styles.drawerRow}>
                <Link
                  href="/"
                  onClick={closeDrawer}
                  aria-current={pathname === '/' ? 'page' : undefined}
                  className={styles.drawerLink}
                >
                  <div>
                    <span className="type-colophon" style={{ display: 'block', marginBottom: '0.25rem' }}>
                      SECTION 01
                    </span>
                    <span className={styles.drawerTitle}>HOME</span>
                  </div>
                  <span className={`${styles.drawerMeta} type-colophon`}>POSTER EXHIBITION</span>
                </Link>
              </li>

              <li className={styles.drawerRow}>
                <Link
                  href="/archive"
                  onClick={closeDrawer}
                  aria-current={isRouteActive('/archive') ? 'page' : undefined}
                  className={styles.drawerLink}
                >
                  <div>
                    <span className="type-colophon" style={{ display: 'block', marginBottom: '0.25rem' }}>
                      SECTION 02
                    </span>
                    <span className={styles.drawerTitle}>ARCHIVE</span>
                  </div>
                  <span className={`${styles.drawerMeta} type-colophon`}>
                    {plateCount} CATALOGED STRUCTURES
                  </span>
                </Link>
              </li>

              <li className={styles.drawerRow}>
                <Link
                  href="/anatomy"
                  onClick={closeDrawer}
                  aria-current={isRouteActive('/anatomy') ? 'page' : undefined}
                  className={styles.drawerLink}
                >
                  <div>
                    <span className="type-colophon" style={{ display: 'block', marginBottom: '0.25rem' }}>
                      SECTION 03
                    </span>
                    <span className={styles.drawerTitle}>ANATOMY</span>
                  </div>
                  <span className={`${styles.drawerMeta} type-colophon`}>09 ORTHOGRAPHIC PLATES</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className={`${styles.drawerFooter} type-colophon`}>
            <span>INDEXED: {plateCount} PLATES · 126 CE–PRESENT</span>
            <span>ESC TO CLOSE</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
