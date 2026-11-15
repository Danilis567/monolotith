import type { BuildingRecord } from '@/data/buildings';

export type PlateAperture = 'rectilinear' | 'lancet' | 'romanesque';

const ROMANESQUE_SLUGS = new Set([
  'pantheon-rome',
  'hagia-sophia',
  'suleymaniye-mosque',
  'selimiye-mosque',
]);

export function getPlateAperture(building: BuildingRecord): PlateAperture {
  if (building.movement === 'Gothic') {
    return 'lancet';
  }
  if (ROMANESQUE_SLUGS.has(building.slug)) {
    return 'romanesque';
  }
  return 'rectilinear';
}

export function getApertureClassName(aperture: PlateAperture, tall = false): string {
  switch (aperture) {
    case 'lancet':
      return tall ? 'plate-arch-lancet--tall' : 'plate-arch-lancet';
    case 'romanesque':
      return 'plate-arch-romanesque';
    case 'rectilinear':
    default:
      return '';
  }
}
