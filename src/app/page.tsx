import { HomeClient } from '@/components/HomeClient';
import { BUILDINGS, getBuildingBySlug, getBuildingsByMovement } from '@/data/buildings';
import { getFeaturedStreamBuildings } from '@/lib/archiveFilters';

export default function HomePage() {
  const heroBuilding = getBuildingBySlug('trellick-tower') ?? BUILDINGS[0];
  const thesisBuilding = getBuildingBySlug('unite-dhabitation') ?? BUILDINGS[2];
  const streamBuildings = getFeaturedStreamBuildings();

  const brutalistSample = getBuildingsByMovement('Brutalist');
  const gothicSample = getBuildingsByMovement('Gothic');
  const monumentalSample = getBuildingsByMovement('Monumental');

  return (
    <HomeClient
      heroBuilding={heroBuilding}
      thesisBuilding={thesisBuilding}
      streamBuildings={streamBuildings}
      brutalistSample={brutalistSample}
      gothicSample={gothicSample}
      monumentalSample={monumentalSample}
      totalCount={BUILDINGS.length}
    />
  );
}
