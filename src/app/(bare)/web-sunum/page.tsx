import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { WebSunumClient } from '@/components/design-system/WebSunumClient';

export const metadata: Metadata = {
  title: 'MONOLITH — Web Sunumu',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WebSunumPage() {
  const trellickSvg = fs.readFileSync(
    path.join(process.cwd(), 'public', 'images', 'anatomy', 'trellick-tower.svg'),
    'utf8'
  );
  const chartresSvg = fs.readFileSync(
    path.join(process.cwd(), 'public', 'images', 'anatomy', 'chartres-cathedral.svg'),
    'utf8'
  );
  const pantheonSvg = fs.readFileSync(
    path.join(process.cwd(), 'public', 'images', 'anatomy', 'pantheon-rome.svg'),
    'utf8'
  );

  return (
    <WebSunumClient
      trellickSvg={trellickSvg}
      chartresSvg={chartresSvg}
      pantheonSvg={pantheonSvg}
    />
  );
}
