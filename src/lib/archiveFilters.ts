import { BUILDINGS, type BuildingRecord, type Continent, type Movement } from '@/data/buildings';

export type MaterialBucket =
  | 'ALL MATERIALS'
  | 'BÉTON BRUT & CONCRETE'
  | 'LIMESTONE & MARBLE'
  | 'STONE, GRANITE & BRICK'
  | 'CONCRETE & STEEL'
  | 'ROMAN CONCRETE';

export type EraBucket =
  | 'ALL ERAS'
  | 'ANTIQUITY (118–600 CE)'
  | 'MEDIEVAL (1163–1575)'
  | 'EARLY MODERN (1880–1945)'
  | 'POST-WAR & LATE MODERN (1947–PRESENT)';

export type SortOption =
  | 'CAT_ASC'
  | 'YEAR_ASC'
  | 'YEAR_DESC'
  | 'ELEV_DESC'
  | 'ELEV_ASC';

export const MATERIAL_FILTER_OPTIONS: readonly MaterialBucket[] = [
  'ALL MATERIALS',
  'BÉTON BRUT & CONCRETE',
  'LIMESTONE & MARBLE',
  'STONE, GRANITE & BRICK',
  'CONCRETE & STEEL',
  'ROMAN CONCRETE',
] as const;

export const ERA_FILTER_OPTIONS: readonly EraBucket[] = [
  'ALL ERAS',
  'ANTIQUITY (118–600 CE)',
  'MEDIEVAL (1163–1575)',
  'EARLY MODERN (1880–1945)',
  'POST-WAR & LATE MODERN (1947–PRESENT)',
] as const;

export const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: 'CAT_ASC', label: 'CAT. NO. (ASCENDING)' },
  { value: 'YEAR_ASC', label: 'YEAR (OLDEST FIRST)' },
  { value: 'YEAR_DESC', label: 'YEAR (NEWEST FIRST)' },
  { value: 'ELEV_DESC', label: 'ELEVATION (HIGHEST)' },
  { value: 'ELEV_ASC', label: 'ELEVATION (LOWEST)' },
] as const;

export function getMaterialBucket(building: BuildingRecord): Exclude<MaterialBucket, 'ALL MATERIALS'> {
  switch (building.materialCode) {
    case 'ROMAN CONCRETE':
      return 'ROMAN CONCRETE';
    case 'CONCRETE & STEEL':
      return 'CONCRETE & STEEL';
    case 'CONCRETE & MARBLE':
      return 'BÉTON BRUT & CONCRETE';
    case 'TRACHYTE & SANDSTONE':
    case 'BRICK & ASHLAR':
    case 'TRAVERTINE & CONCRETE':
    case 'TENSIONED STONE':
    case 'GRANITE & CONCRETE':
      return 'STONE, GRANITE & BRICK';
    case 'BERCHÈRES LIMESTONE':
    case 'LUTETIAN LIMESTONE':
    case 'CANDOGLIA MARBLE':
    case 'LIMESTONE & GLASS':
    case 'CHILMARK LIMESTONE':
    case 'OOLITIC LIMESTONE':
    case 'FRENCH LIMESTONE':
    case 'DOULTING LIMESTONE':
    case 'KÜFEKİ LIMESTONE':
    case 'LIMESTONE & MARBLE':
      return 'LIMESTONE & MARBLE';
    default:
      return 'BÉTON BRUT & CONCRETE';
  }
}

export function getEraBucket(building: BuildingRecord): Exclude<EraBucket, 'ALL ERAS'> {
  const epochYear = building.yearStart ?? building.yearCompleted;
  if (epochYear <= 600) return 'ANTIQUITY (118–600 CE)';
  if (epochYear <= 1600) return 'MEDIEVAL (1163–1575)';
  if (epochYear <= 1945) return 'EARLY MODERN (1880–1945)';
  return 'POST-WAR & LATE MODERN (1947–PRESENT)';
}

export interface ArchiveQuery {
  q?: string;
  movement?: 'ALL' | Movement;
  continent?: 'ALL' | Continent;
  material?: MaterialBucket;
  era?: EraBucket;
  sort?: SortOption;
}

export function filterAndSortBuildings(query: ArchiveQuery): BuildingRecord[] {
  const qNorm = (query.q ?? '').trim().toLowerCase();
  const movement = query.movement ?? 'ALL';
  const continent = query.continent ?? 'ALL';
  const material = query.material ?? 'ALL MATERIALS';
  const era = query.era ?? 'ALL ERAS';
  const sort = query.sort ?? 'CAT_ASC';

  const filtered = BUILDINGS.filter((b) => {
    if (movement !== 'ALL' && b.movement !== movement) return false;
    if (continent !== 'ALL' && b.continent !== continent) return false;
    if (material !== 'ALL MATERIALS' && getMaterialBucket(b) !== material) return false;
    if (era !== 'ALL ERAS' && getEraBucket(b) !== era) return false;

    if (qNorm.length > 0) {
      const hay = `${b.catalogNumber} ${b.id} ${b.name} ${b.nativeName ?? ''} ${b.architect} ${b.city} ${b.country} ${b.materialCode} ${b.subStyle}`.toLowerCase();
      if (!hay.includes(qNorm)) return false;
    }
    return true;
  });

  return filtered.sort((a, b) => {
    switch (sort) {
      case 'YEAR_ASC':
        return a.yearCompleted - b.yearCompleted || a.id.localeCompare(b.id);
      case 'YEAR_DESC':
        return b.yearCompleted - a.yearCompleted || a.id.localeCompare(b.id);
      case 'ELEV_DESC':
        return b.dimensions.heightMeters - a.dimensions.heightMeters || a.id.localeCompare(b.id);
      case 'ELEV_ASC':
        return a.dimensions.heightMeters - b.dimensions.heightMeters || a.id.localeCompare(b.id);
      case 'CAT_ASC':
      default:
        return a.id.localeCompare(b.id);
    }
  });
}

export function getFeaturedStreamBuildings(): BuildingRecord[] {
  const featuredIds = [
    'ARC-001', // Trellick Tower
    'ARC-010', // Chartres Cathedral
    'ARC-023', // Pantheon
    'ARC-003', // Unité d'Habitation
    'ARC-014', // Sainte-Chapelle
    'ARC-019', // Hagia Sophia
    'ARC-004', // Habitat 67
    'ARC-018', // Wells Cathedral
    'ARC-024', // National Assembly Dhaka
  ];
  return featuredIds
    .map((id) => BUILDINGS.find((b) => b.id === id))
    .filter((b): b is BuildingRecord => Boolean(b));
}

export function getAdjacentBuildings(slug: string): {
  prev: BuildingRecord;
  next: BuildingRecord;
} {
  const index = BUILDINGS.findIndex((b) => b.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  const prev = BUILDINGS[(safeIndex - 1 + BUILDINGS.length) % BUILDINGS.length];
  const next = BUILDINGS[(safeIndex + 1) % BUILDINGS.length];
  return { prev, next };
}
