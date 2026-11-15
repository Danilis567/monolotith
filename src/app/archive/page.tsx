import type { Metadata } from 'next';
import { ArchiveClient } from '@/components/ArchiveClient';
import { BUILDINGS } from '@/data/buildings';

export const metadata: Metadata = {
  title: 'Archive — Structure Index',
  description:
    'Search, filter, and inspect 27 cataloged Brutalist, Gothic, and Monumental works by material, era, continent, and metric elevation.',
};

export default function ArchivePage() {
  return <ArchiveClient totalCount={BUILDINGS.length} />;
}
