import type { Metadata } from 'next';
import { WebSunumClient } from '@/components/design-system/WebSunumClient';

export const metadata: Metadata = {
  title: 'MONOLITH — Web Sunumu',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WebSunumPage() {
  return <WebSunumClient />;
}
