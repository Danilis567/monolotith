import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { BehanceCover } from '@/components/design-system/BehanceCover';

export const metadata: Metadata = {
  title: 'MONOLITH — Behance Cover',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BehanceCoverPage() {
  const trellickSvg = fs.readFileSync(
    path.join(process.cwd(), 'public', 'images', 'anatomy', 'trellick-tower.svg'),
    'utf8'
  );
  const chartresSvg = fs.readFileSync(
    path.join(process.cwd(), 'public', 'images', 'anatomy', 'chartres-cathedral.svg'),
    'utf8'
  );

  return <BehanceCover trellickSvg={trellickSvg} chartresSvg={chartresSvg} />;
}
