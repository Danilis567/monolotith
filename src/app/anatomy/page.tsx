import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { AnatomyClient } from '@/components/AnatomyClient';
import { ANATOMY_PLATES } from '@/data/anatomyPlates';
import { BUILDINGS, type AnatomyPlateId } from '@/data/buildings';

export const metadata: Metadata = {
  title: '03 Anatomy — Measured Orthographic Plates',
  description:
    'Nine interactive vector cross-sections, plans, and elevations across Brutalist, Gothic, and Monumental works with layer inspection.',
};

async function loadSvgMarkup(): Promise<Record<AnatomyPlateId, string>> {
  const entries = await Promise.all(
    ANATOMY_PLATES.map(async (plate) => {
      const cleanRelPath = plate.svgPath.replace(/^\/+/, '');
      const fullPath = path.join(process.cwd(), 'public', cleanRelPath);
      const raw = await fs.readFile(fullPath, 'utf8');
      const cleaned = raw.replace(/^<\?xml[^>]*\?>\s*/i, '');
      return [plate.id, cleaned] as const;
    })
  );

  return Object.fromEntries(entries) as Record<AnatomyPlateId, string>;
}

export default async function AnatomyPage() {
  const svgMarkupById = await loadSvgMarkup();

  const platesWithMeta = ANATOMY_PLATES.map((plate) => {
    const building = BUILDINGS.find((b) => b.anatomyPlateId === plate.id);
    return {
      ...plate,
      movement: building?.movement ?? ('Brutalist' as const),
      slug: building?.slug ?? plate.id,
    };
  });

  return <AnatomyClient plates={platesWithMeta} svgMarkupById={svgMarkupById} />;
}
