import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, IBM_Plex_Mono, Inter } from 'next/font/google';
import { ArchClipDefs } from '@/components/ArchClipDefs';
import { MotionProvider } from '@/components/MotionPrimitives';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BUILDINGS } from '@/data/buildings';
import './globals.css';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'MONOLITH — Monumental, Brutalist & Gothic Architecture Archive',
    template: '%s — MONOLITH',
  },
  description:
    'Editorial museum monograph and measured archive of 27 Brutalist, Gothic, and Monumental works across Europe, Asia, the Americas, and the Middle East.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/brand/favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'MONOLITH — Monumental Architecture Archive',
    description:
      'Editorial archive of 27 Brutalist, Gothic, and Monumental works surveyed across 126 CE–PRESENT.',
    type: 'website',
    images: [{ url: '/brand/og-image.svg', width: 1200, height: 630, alt: 'MONOLITH Archive' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#131313',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-surface="dark"
      className={`${bodoniModa.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ArchClipDefs />
        <a href="#main-content" className="skip-link">
          SKIP TO ARCHIVAL CONTENT
        </a>
        <MotionProvider>
          <SiteHeader plateCount={BUILDINGS.length} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
