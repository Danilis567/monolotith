import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BUILDINGS } from '@/data/buildings';

export const metadata: Metadata = {
  openGraph: {
    title: 'MONOLITH — Monumental Architecture Archive',
    description:
      'Editorial archive of 27 Brutalist, Gothic, and Monumental works surveyed across 126 CE–PRESENT.',
    type: 'website',
    images: [{ url: '/brand/og-image.svg', width: 1200, height: 630, alt: 'MONOLITH Archive' }],
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        SKIP TO ARCHIVAL CONTENT
      </a>
      <SiteHeader plateCount={BUILDINGS.length} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
