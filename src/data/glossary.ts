export type GlossaryKey =
  | 'BÉTON BRUT'
  | 'WGS84'
  | 'CAT. NO.'
  | 'ELEV./HEIGHT'
  | 'PLATE'
  | 'FOLIO'
  | 'DATUM'
  | 'SECTION/ELEVATION'
  | 'LOAD PATH'
  | 'PENDENTIVE'
  | 'FLYING BUTTRESS'
  | 'CANTILEVER';

export interface GlossaryEntry {
  term: string;
  plain: string;
  definition: string;
}

export const GLOSSARY_TERMS: Record<GlossaryKey, GlossaryEntry> = {
  'BÉTON BRUT': {
    term: 'BÉTON BRUT',
    plain: 'raw poured concrete',
    definition:
      'Unfinished concrete left exposed after formwork removal, preserving timber grain and tie-rod impressions.',
  },
  WGS84: {
    term: 'WGS84',
    plain: 'GPS coordinates',
    definition:
      'World Geodetic System 1984, the standard latitude and longitude coordinate reference used for satellite positioning.',
  },
  'CAT. NO.': {
    term: 'CAT. NO.',
    plain: 'catalog number',
    definition:
      'Sequential three-digit archival identifier assigned to each surveyed structure in the MONOLITH index.',
  },
  'ELEV./HEIGHT': {
    term: 'ELEV./HEIGHT',
    plain: 'measured height',
    definition:
      'Vertical structural extent in metres measured from the primary ground datum to the highest permanent point.',
  },
  PLATE: {
    term: 'PLATE',
    plain: 'numbered sheet',
    definition:
      'Individual measured drawing, photographic study, or structural diagram indexed within an archival sequence.',
  },
  FOLIO: {
    term: 'FOLIO',
    plain: 'archive volume',
    definition:
      'Full-sheet dossier grouping measured plates, site coordinates, and structural specifications for a single work.',
  },
  DATUM: {
    term: 'DATUM',
    plain: 'reference level',
    definition:
      'Fixed baseline elevation or geometric axis from which all vertical heights and structural offsets are measured.',
  },
  'SECTION/ELEVATION': {
    term: 'SECTION/ELEVATION',
    plain: 'slice or face drawing',
    definition:
      'Orthographic projection showing either an interior cut through the structure or an unforeshortened exterior facade.',
  },
  'LOAD PATH': {
    term: 'LOAD PATH',
    plain: 'weight route',
    definition:
      'Continuous structural trajectory transferring gravity and lateral forces from roof and slabs down into the foundations.',
  },
  PENDENTIVE: {
    term: 'PENDENTIVE',
    plain: 'dome-bearing corner',
    definition:
      'Curved spherical triangle transitioning a square structural bay to support a circular dome above.',
  },
  'FLYING BUTTRESS': {
    term: 'FLYING BUTTRESS',
    plain: 'exterior stone brace',
    definition:
      'Inclined masonry arch spanning outside the main wall to carry lateral vault thrust to an outer pier.',
  },
  CANTILEVER: {
    term: 'CANTILEVER',
    plain: 'one-sided overhang',
    definition:
      'Rigid horizontal beam or slab anchored at one end while projecting unsupported into open space.',
  },
};
