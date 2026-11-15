export type Movement = 'Brutalist' | 'Gothic' | 'Monumental';

export type Continent = 'Europe' | 'Asia' | 'Americas' | 'Middle East';

export type AnatomyPlateId =
  | 'trellick-tower'
  | 'unite-dhabitation'
  | 'habitat-67'
  | 'chartres-cathedral'
  | 'wells-cathedral'
  | 'sainte-chapelle'
  | 'pantheon-rome'
  | 'hagia-sophia'
  | 'national-assembly-dhaka';

export type StructureStatus = 'Standing' | 'Demolished' | 'Under Completion';

export interface Coordinates {
  lat: number;
  lng: number;
  dmsLat: string;
  dmsLng: string;
  dmsFormatted: string;
}

export interface StructuralDimensions {
  heightMeters: number;
  heightLabel: string;
  spanOrLengthMeters?: number;
  spanOrLengthLabel?: string;
  primaryMetric: string;
}

export interface BuildingRecord {
  id: string;
  catalogNumber: string;
  slug: string;
  name: string;
  nativeName?: string;
  movement: Movement;
  subStyle: string;
  architect: string;
  city: string;
  country: string;
  continent: Continent;
  yearStart?: number;
  yearCompleted: number;
  chronologyLabel: string;
  coordinates: Coordinates;
  dimensions: StructuralDimensions;
  materials: string[];
  materialCode: string;
  status: StructureStatus;
  summary: string;
  structuralAxiom: string;
  structuralNotes: string;
  historicalContext: string;
  imagePath: string;
  imageAlt: string;
  hasAnatomyPlate: boolean;
  anatomyPlateId?: AnatomyPlateId;
}

export const MOVEMENTS: readonly Movement[] = [
  'Brutalist',
  'Gothic',
  'Monumental',
] as const;

export const CONTINENTS: readonly Continent[] = [
  'Europe',
  'Asia',
  'Americas',
  'Middle East',
] as const;

export const BUILDINGS: BuildingRecord[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // BRUTALIST (001–009)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'ARC-001',
    catalogNumber: 'CAT. 001',
    slug: 'trellick-tower',
    name: 'Trellick Tower',
    movement: 'Brutalist',
    subStyle: 'British Post-War Brutalism',
    architect: 'Ernő Goldfinger',
    city: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    yearStart: 1968,
    yearCompleted: 1972,
    chronologyLabel: '1972',
    coordinates: {
      lat: 51.5236,
      lng: -0.2056,
      dmsLat: `51°31'25"N`,
      dmsLng: `0°12'20"W`,
      dmsFormatted: `51°31'25"N × 0°12'20"W`,
    },
    dimensions: {
      heightMeters: 98.0,
      heightLabel: '98.0 M (120 M WITH MAST)',
      primaryMetric: '31 STOREYS / 217 FLATS',
    },
    materials: [
      'Board-formed reinforced concrete',
      'Bush-hammered concrete aggregate',
      'Timber window frames',
    ],
    materialCode: 'BÉTON BRUT',
    status: 'Standing',
    summary:
      'Thirty-one-storey residential slab linked to a detached vertical service and circulation shaft by elevated concrete bridges.',
    structuralAxiom:
      'Vertical circulation and mechanical plant stand 4.5 meters clear of the 98-meter shear-wall housing slab, linked solely at nine third-storey bridge horizons.',
    structuralNotes:
      'Separating lifts, refuse chutes, and the cantilevered boiler room into an independent tower isolates acoustic vibration from the 217 apartments. Access bridges connect the shaft to the residential block at every third floor, serving split-level maisonettes above and below each corridor.',
    historicalContext:
      'Commissioned by the Greater London Council for the Cheltenham Estate in North Kensington and opened in June 1972. Following Ernő Goldfinger’s earlier Balfron Tower in Poplar, the building received Grade II* listed status in 1998.',
    imagePath: '/images/buildings/trellick-tower.jpg',
    imageAlt:
      'Vertical board-formed concrete residential slab and detached service tower of Trellick Tower connected by aerial walkways in London',
    hasAnatomyPlate: true,
    anatomyPlateId: 'trellick-tower',
  },
  {
    id: 'ARC-002',
    catalogNumber: 'CAT. 002',
    slug: 'barbican-estate',
    name: 'Barbican Estate',
    movement: 'Brutalist',
    subStyle: 'British Post-War Brutalism',
    architect: 'Chamberlin, Powell and Bon',
    city: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    yearStart: 1965,
    yearCompleted: 1976,
    chronologyLabel: '1965–1976',
    coordinates: {
      lat: 51.5211,
      lng: -0.0939,
      dmsLat: `51°31'16"N`,
      dmsLng: `0°05'38"W`,
      dmsFormatted: `51°31'16"N × 0°05'38"W`,
    },
    dimensions: {
      heightMeters: 123.0,
      heightLabel: '123.0 M (THREE RESIDENTIAL TOWERS)',
      primaryMetric: '14 HECTARES / 2,014 FLATS',
    },
    materials: [
      'Pick-hammered reinforced concrete',
      'Load-bearing precast concrete',
      'Engineering brick podium',
    ],
    materialCode: 'HAMMERED CONCRETE',
    status: 'Standing',
    summary:
      'High-density residential and civic complex organized around an elevated pedestrian podium and three 123-meter residential towers.',
    structuralAxiom:
      'Three 42-storey towers rise 123 meters from deep piling beneath a continuous six-level reinforced concrete podium that segregates pedestrian courts from subterranean infrastructure.',
    structuralNotes:
      'Pedestrian decks sit entirely above vehicular roads, parking garages, and service yards. Cromwell, Shakespeare, and Lauderdale towers employ deeply recessed balconies and bush-hammered concrete finishes achieved manually after formwork removal.',
    historicalContext:
      'Built for the Corporation of London on a 14-hectare Cripplegate site cleared by Second World War bombing. Residential blocks were completed between 1969 and 1976, with the adjacent Barbican Arts Centre opening in 1982; the entire estate is Grade II listed.',
    imagePath: '/images/buildings/barbican-estate.jpg',
    imageAlt:
      'Bush-hammered concrete towers and elevated pedestrian podium terraces of the Barbican Estate above artificial lakes in London',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-003',
    catalogNumber: 'CAT. 003',
    slug: 'unite-dhabitation',
    name: "Unité d'Habitation",
    nativeName: 'Cité Radieuse',
    movement: 'Brutalist',
    subStyle: 'Post-War European Brutalism',
    architect: 'Le Corbusier (with André Wogenscky & Vladimir Bodiansky)',
    city: 'Marseille',
    country: 'France',
    continent: 'Europe',
    yearStart: 1947,
    yearCompleted: 1952,
    chronologyLabel: '1952',
    coordinates: {
      lat: 43.261,
      lng: 5.3963,
      dmsLat: `43°15'40"N`,
      dmsLng: `5°23'47"E`,
      dmsFormatted: `43°15'40"N × 5°23'47"E`,
    },
    dimensions: {
      heightMeters: 56.0,
      heightLabel: '56.0 M',
      spanOrLengthMeters: 137.0,
      spanOrLengthLabel: '137.0 M × 24.0 M FOOTPRINT',
      primaryMetric: '337 APARTMENTS / 18 STOREYS',
    },
    materials: [
      'Béton brut (board-formed concrete)',
      'Precast brise-soleil concrete',
      'Polychrome mineral render',
    ],
    materialCode: 'BÉTON BRUT',
    status: 'Standing',
    summary:
      'Eighteen-storey vertical housing slab raised on sculptural concrete pilotis and organized around internal double-height streets.',
    structuralAxiom:
      'Seventeen pairs of tapered reinforced concrete pilotis carry an artificial ground transfer beam supporting 337 dual-aspect maisonettes across eighteen storeys.',
    structuralNotes:
      'An independent reinforced concrete frame acts like a bottle rack receiving 337 interlocking, duplex apartment units proportioned to Le Corbusier’s Modulor system. Deep brise-soleil balconies regulate solar gain while the roof terrace houses a gymnasium, track, and sculptural ventilation stacks.',
    historicalContext:
      'Commissioned by the French Ministry of Reconstruction and Urbanism in 1945 to address post-war housing shortages in Marseille and inaugurated in October 1952. Inscribed as a UNESCO World Heritage site in 2016.',
    imagePath: '/images/buildings/unite-dhabitation.jpg',
    imageAlt:
      'Long elevation of Unité d’Habitation in Marseille showing deep concrete brise-soleil loggias supported on massive tapered pilotis',
    hasAnatomyPlate: true,
    anatomyPlateId: 'unite-dhabitation',
  },
  {
    id: 'ARC-004',
    catalogNumber: 'CAT. 004',
    slug: 'habitat-67',
    name: 'Habitat 67',
    movement: 'Brutalist',
    subStyle: 'Structuralist / Modular Brutalism',
    architect: 'Moshe Safdie',
    city: 'Montreal',
    country: 'Canada',
    continent: 'Americas',
    yearStart: 1966,
    yearCompleted: 1967,
    chronologyLabel: '1967',
    coordinates: {
      lat: 45.5,
      lng: -73.5439,
      dmsLat: `45°30'00"N`,
      dmsLng: `73°32'38"W`,
      dmsFormatted: `45°30'00"N × 73°32'38"W`,
    },
    dimensions: {
      heightMeters: 36.0,
      heightLabel: '36.0 M (12 STOREYS)',
      primaryMetric: '354 PREFAB MODULES',
    },
    materials: [
      'Precast post-tensioned concrete',
      'Cast-in-place concrete service cores',
      'Timber-framed glazing',
    ],
    materialCode: 'PRECAST CONCRETE',
    status: 'Standing',
    summary:
      'Twelve-storey housing assembly stacked from 354 identical precast concrete boxes on a St. Lawrence River peninsula.',
    structuralAxiom:
      'Post-tensioned steel tendons and welded shear plates lock 354 precast concrete boxes into a self-buttressing stepped lattice without an independent structural frame.',
    structuralNotes:
      'Each 85-ton rectangular module was cast in an on-site factory, hoisted by crane, and post-tensioned with high-strength steel rods, bolts, and welds to transfer loads diagonally down to ground piers. Stepped offsets turn each apartment roof into an open terrace for the unit above.',
    historicalContext:
      'Developed from Moshe Safdie’s 1961 McGill University thesis and built as a flagship pavilion for Expo 67 in Montreal. Originally configured into 158 residences (later combined into 146), it remains occupied as a cooperative housing complex.',
    imagePath: '/images/buildings/habitat-67.jpg',
    imageAlt:
      'Stepped cluster of cantilevered precast concrete box modules forming Habitat 67 along the Saint Lawrence River in Montreal',
    hasAnatomyPlate: true,
    anatomyPlateId: 'habitat-67',
  },
  {
    id: 'ARC-005',
    catalogNumber: 'CAT. 005',
    slug: 'geisel-library',
    name: 'Geisel Library',
    movement: 'Brutalist',
    subStyle: 'Futurist Brutalism',
    architect: 'William L. Pereira & Associates',
    city: 'San Diego',
    country: 'United States',
    continent: 'Americas',
    yearStart: 1968,
    yearCompleted: 1970,
    chronologyLabel: '1970',
    coordinates: {
      lat: 32.8811,
      lng: -117.2378,
      dmsLat: `32°52'52"N`,
      dmsLng: `117°14'16"W`,
      dmsFormatted: `32°52'52"N × 117°14'16"W`,
    },
    dimensions: {
      heightMeters: 33.5,
      heightLabel: '33.5 M',
      primaryMetric: '8 FLOORS (6 ABOVE GRADE)',
    },
    materials: [
      'Reinforced cast-in-place concrete',
      'Post-tensioned concrete bents',
      'Anodized aluminum curtain wall',
    ],
    materialCode: 'CAST CONCRETE',
    status: 'Standing',
    summary:
      'Cantilevered stepped-pyramid university library suspended above a two-storey subterranean reading forum on sixteen diagonal concrete piers.',
    structuralAxiom:
      'Sixteen biaxial post-tensioned concrete bents incline at 45 degrees from a 33.5-meter central core to hold five cantilevered stack decks in balanced tension and compression.',
    structuralNotes:
      'Sixteen angled, post-tensioned concrete bents spring outward at 45 degrees from a central concrete core to support five progressively widening and narrowing upper stack levels. Curtain-wall glazing is recessed beneath deep concrete floor slabs to limit direct solar heat.',
    historicalContext:
      'Constructed between 1968 and 1970 as the Central Library of the University of California, San Diego, and expanded underground by Gunnar Birkerts in 1993. Renamed in 1995 in recognition of Audrey and Theodor Seuss Geisel.',
    imagePath: '/images/buildings/geisel-library.jpg',
    imageAlt:
      'Diagonal cast-in-place concrete piers supporting the stepped hexagonal glass and concrete tower of Geisel Library in San Diego',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-006',
    catalogNumber: 'CAT. 006',
    slug: 'salk-institute',
    name: 'Salk Institute for Biological Studies',
    movement: 'Brutalist',
    subStyle: 'Monumental Concrete Modernism',
    architect: 'Louis I. Kahn (structural engineer: August Komendant)',
    city: 'La Jolla',
    country: 'United States',
    continent: 'Americas',
    yearStart: 1962,
    yearCompleted: 1965,
    chronologyLabel: '1965',
    coordinates: {
      lat: 32.8875,
      lng: -117.2473,
      dmsLat: `32°53'15"N`,
      dmsLng: `117°14'50"W`,
      dmsFormatted: `32°53'15"N × 117°14'50"W`,
    },
    dimensions: {
      heightMeters: 21.0,
      heightLabel: '6-LEVEL MIRRORED WINGS',
      spanOrLengthMeters: 18.9,
      spanOrLengthLabel: '18.9 M VIERENDEEL CLEAR SPAN',
      primaryMetric: '38,237 M² COMPLEX',
    },
    materials: [
      'Pozzolanic cast-in-place concrete',
      'Travertine plaza paving',
      'Unfinished teak timber',
    ],
    materialCode: 'POZZOLAN CONCRETE',
    status: 'Standing',
    summary:
      'Symmetrical twin laboratory wings framing an unplanted travertine court bisected by a narrow linear water channel aimed toward the Pacific horizon.',
    structuralAxiom:
      'Story-deep prestressed Vierendeel trusses span 18.9 meters clear between exterior concrete shafts, freeing laboratory floors of interior columns.',
    structuralNotes:
      'Prestressed concrete Vierendeel trusses span 18.9 meters across the laboratory blocks, creating full-height interstitial mechanical floors between every research level so utilities can be reconfigured without columns. Formwork tie holes remain exposed and plugged with lead.',
    historicalContext:
      'Commissioned by virologist Jonas Salk in 1959 and built between 1962 and 1965 atop coastal bluffs in La Jolla, San Diego. Designed by Louis Kahn with structural engineer August Komendant and plaza counsel from Luis Barragán.',
    imagePath: '/images/buildings/salk-institute.jpg',
    imageAlt:
      'Symmetrical pozzolanic concrete laboratory towers and teak study bays flanking the central travertine plaza and water channel at the Salk Institute',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-007',
    catalogNumber: 'CAT. 007',
    slug: 'nakagin-capsule-tower',
    name: 'Nakagin Capsule Tower',
    nativeName: '中銀カプセルタワービル',
    movement: 'Brutalist',
    subStyle: 'Japanese Metabolism',
    architect: 'Kisho Kurokawa',
    city: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    yearStart: 1970,
    yearCompleted: 1972,
    chronologyLabel: '1972 (DEM. 2022)',
    coordinates: {
      lat: 35.6656,
      lng: 139.7633,
      dmsLat: `35°39'56"N`,
      dmsLng: `139°45'48"E`,
      dmsFormatted: `35°39'56"N × 139°45'48"E`,
    },
    dimensions: {
      heightMeters: 54.0,
      heightLabel: '54.0 M (11 & 13 STOREYS)',
      primaryMetric: '140 STEEL CAPSULES',
    },
    materials: [
      'Reinforced concrete service cores',
      'Welded lightweight steel trusses',
      'Galvanized steel cladding panels',
    ],
    materialCode: 'CONCRETE & STEEL',
    status: 'Demolished',
    summary:
      'Twin concrete elevator shafts anchoring 140 detachable prefabricated living and office capsules bolted via four high-tension joints.',
    structuralAxiom:
      'One hundred forty welded steel modules cantilever independently from two slip-formed concrete cores, each unit anchored by four high-strength tension bolts.',
    structuralNotes:
      'Each 2.5 × 4.0 × 2.5 meter welded steel-frame capsule was factory-fitted with appliances and circular porthole glazing, then cantilevered independently from two rigid concrete cores. The structural system permitted individual unit replacement without disturbing neighboring capsules.',
    historicalContext:
      'Completed in Tokyo’s Shimbashi-Ginza district in 1972 as the first built realization of Metabolist replaceable-cell housing. Although designed for periodic capsule renewal, no units were ever swapped; severe deterioration led to the tower’s dismantling in 2022, with 23 capsules preserved.',
    imagePath: '/images/buildings/nakagin-capsule-tower.jpg',
    imageAlt:
      'Stacked rectilinear steel living capsules with circular windows cantilevered from twin concrete cores of Nakagin Capsule Tower in Tokyo',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-008',
    catalogNumber: 'CAT. 008',
    slug: 'genex-tower',
    name: 'Western City Gate',
    nativeName: 'Zapadna kapija Beograda / Genex Tower',
    movement: 'Brutalist',
    subStyle: 'Yugoslav Post-War Brutalism',
    architect: 'Mihajlo Mitrović',
    city: 'Belgrade',
    country: 'Serbia',
    continent: 'Europe',
    yearStart: 1977,
    yearCompleted: 1980,
    chronologyLabel: '1980',
    coordinates: {
      lat: 44.8203,
      lng: 20.4047,
      dmsLat: `44°49'13"N`,
      dmsLng: `20°24'17"E`,
      dmsFormatted: `44°49'13"N × 20°24'17"E`,
    },
    dimensions: {
      heightMeters: 117.0,
      heightLabel: '117.0 M (140 M WITH SPIRE)',
      primaryMetric: '35 STOREYS / 2 TOWERS',
    },
    materials: [
      'Slip-formed reinforced concrete',
      'Cast-in-place concrete bridge',
      'Circular steel-framed glazing',
    ],
    materialCode: 'SLIP-FORMED CONCRETE',
    status: 'Standing',
    summary:
      'Paired 30- and 26-storey concrete towers linked at the upper levels by a two-storey skybridge and crowned by a cylindrical revolving restaurant.',
    structuralAxiom:
      'Two slip-formed concrete shafts of 26 and 30 storeys achieve lateral continuity through a two-level post-tensioned skybridge at the 100-meter datum.',
    structuralNotes:
      'Two asymmetric shafts—one originally housing state-enterprise offices and the other private apartments—are anchored by exterior cylindrical stair-and-lift cores. A heavy post-tensioned bridge spans the highway axis at the 26th floor, supporting the circular crown above.',
    historicalContext:
      'Designed in 1977 by Mihajlo Mitrović and completed in 1980 in New Belgrade’s Block 33 to mark the western approach from Nikola Tesla Airport. Designated a protected cultural monument by the Serbian government in 2021.',
    imagePath: '/images/buildings/genex-tower.jpg',
    imageAlt:
      'Twin concrete shafts joined by an upper skybridge and circular rooftop drum at Western City Gate in New Belgrade',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-009',
    catalogNumber: 'CAT. 009',
    slug: 'bank-of-georgia',
    name: 'Bank of Georgia Headquarters',
    nativeName: 'Former Ministry of Highway Construction',
    movement: 'Brutalist',
    subStyle: 'Soviet Constructivist Brutalism',
    architect: 'George Chakhava & Zurab Jalaghania',
    city: 'Tbilisi',
    country: 'Georgia',
    continent: 'Asia',
    yearStart: 1972,
    yearCompleted: 1975,
    chronologyLabel: '1975',
    coordinates: {
      lat: 41.7358,
      lng: 44.7703,
      dmsLat: `41°44'09"N`,
      dmsLng: `44°46'13"E`,
      dmsFormatted: `41°44'09"N × 44°46'13"E`,
    },
    dimensions: {
      heightMeters: 51.8,
      heightLabel: '51.8 M MAX TOWER',
      spanOrLengthMeters: 28.0,
      spanOrLengthLabel: '28.0 M CANTILEVER SPANS',
      primaryMetric: '450 M² GROUND FOOTPRINT',
    },
    materials: [
      'Reinforced concrete',
      'Steel space-frame trusses',
      'Ribbon strip glazing',
    ],
    materialCode: 'CONCRETE & STEEL',
    status: 'Standing',
    summary:
      'Five interlocking two-storey horizontal concrete bars suspended perpendicularly across three vertical service cores above a forested hillside.',
    structuralAxiom:
      'Three vertical concrete cores restrict foundation contact to 450 square meters while suspending five two-storey steel-trussed bridge volumes up to 28 meters over the hillside.',
    structuralNotes:
      'Engineered by Temur Tkhilava and Alexander Kimberg, three unequal vertical towers (51.8 m, 39.6 m, and 21.3 m) carry steel-trussed concrete horizontal volumes cantilevering up to 28 meters over a 33-meter slope. Ground contact is restricted to roughly 450 square meters.',
    historicalContext:
      'Commissioned as the Ministry of Highway Construction of the Georgian SSR and completed in 1975 after co-architect George Chakhava also served as Deputy Minister of Highways. Acquired and restored by the Bank of Georgia in 2010–2011.',
    imagePath: '/images/buildings/bank-of-georgia.jpg',
    imageAlt:
      'Interlocking horizontal concrete volumes cantilevered across vertical elevator cores at the Bank of Georgia Headquarters in Tbilisi',
    hasAnatomyPlate: false,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // GOTHIC (010–018)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'ARC-010',
    catalogNumber: 'CAT. 010',
    slug: 'chartres-cathedral',
    name: 'Chartres Cathedral',
    nativeName: 'Cathédrale Notre-Dame de Chartres',
    movement: 'Gothic',
    subStyle: 'French High Gothic',
    architect: 'Anonymous Master Masons (North Spire: Jehan de Beauce)',
    city: 'Chartres',
    country: 'France',
    continent: 'Europe',
    yearStart: 1194,
    yearCompleted: 1260,
    chronologyLabel: '1194–1260',
    coordinates: {
      lat: 48.4478,
      lng: 1.4878,
      dmsLat: `48°26'52"N`,
      dmsLng: `1°29'16"E`,
      dmsFormatted: `48°26'52"N × 1°29'16"E`,
    },
    dimensions: {
      heightMeters: 113.0,
      heightLabel: '113.0 M NORTH SPIRE / 37.0 M VAULT',
      spanOrLengthMeters: 130.2,
      spanOrLengthLabel: '130.2 M LENGTH / 16.4 M NAVE SPAN',
      primaryMetric: '16.4 M NAVE SPAN',
    },
    materials: [
      'Berchères limestone ashlar',
      'Lead-sheathed timber roof',
      'Pot-metal stained glass',
    ],
    materialCode: 'BERCHÈRES LIMESTONE',
    status: 'Standing',
    summary:
      'High Gothic limestone basilica introducing three-storey nave elevations, quadripartite rib vaults, and full-height external flying buttresses.',
    structuralAxiom:
      'Double-tiered external flyers with spoked arcades counter the lateral thrust of 37-meter quadripartite vaults across a 16.4-meter clear limestone nave.',
    structuralNotes:
      'Eliminating the traditional tribune gallery allowed clerestory lancets and rose oculi to match the height of the ground arcade. External double-tiered flying buttresses joined by radiating colonnettes transfer lateral thrust from the 16.4-meter-wide, 37-meter-high quadripartite nave vaults.',
    historicalContext:
      'Rebuilt rapidly after the June 1194 fire destroyed the earlier Romanesque church, leaving only the west portals, crypt, and south tower intact. The main vessel was vaulted by c. 1220 and consecrated in 1260; Jehan de Beauce added the Flamboyant north spire between 1507 and 1513.',
    imagePath: '/images/buildings/chartres-cathedral.jpg',
    imageAlt:
      'South flank, flying buttresses, green copper roof, and south transept rose window of Chartres Cathedral with the asymmetrical west spires rising at left',
    hasAnatomyPlate: true,
    anatomyPlateId: 'chartres-cathedral',
  },
  {
    id: 'ARC-011',
    catalogNumber: 'CAT. 011',
    slug: 'notre-dame-de-paris',
    name: 'Notre-Dame de Paris',
    nativeName: 'Cathédrale Notre-Dame de Paris',
    movement: 'Gothic',
    subStyle: 'French Early & Rayonnant Gothic',
    architect: 'Anonymous Masters; Jean de Chelles & Pierre de Montreuil (transepts)',
    city: 'Paris',
    country: 'France',
    continent: 'Europe',
    yearStart: 1163,
    yearCompleted: 1345,
    chronologyLabel: '1163–1345',
    coordinates: {
      lat: 48.8531,
      lng: 2.35,
      dmsLat: `48°51'11"N`,
      dmsLng: `2°21'00"E`,
      dmsFormatted: `48°51'11"N × 2°21'00"E`,
    },
    dimensions: {
      heightMeters: 96.0,
      heightLabel: '96.0 M SPIRE / 69.0 M TOWERS',
      spanOrLengthMeters: 128.0,
      spanOrLengthLabel: '128.0 M LENGTH / 33.0 M VAULT',
      primaryMetric: '33.0 M NAVE VAULT',
    },
    materials: [
      'Lutetian limestone',
      'Lead roof sheathing',
      'Oak roof framing',
    ],
    materialCode: 'LUTETIAN LIMESTONE',
    status: 'Standing',
    summary:
      'Double-aisled cathedral built on the Île de la Cité, pioneering long-span single-leap flying buttresses around a five-aisled choir and nave.',
    structuralAxiom:
      'Single-span limestone flying buttresses leap 15 meters over double side aisles to stabilize thin clerestory walls beneath 33-meter sexpartite vaults.',
    structuralNotes:
      'Sexpartite rib vaults spring above cylindrical piers at 33 meters elevation, braced laterally by thin exterior flyers added in the 1180s and rebuilt in the 13th century to span both ambulatory aisles in single sweeping arches.',
    historicalContext:
      'Begun in 1163 under Bishop Maurice de Sully and completed around 1345, with Rayonnant transept facades extended by Jean de Chelles and Pierre de Montreuil. Restored by Eugène Viollet-le-Duc and Jean-Baptiste Lassus in 1844–1864, and reconstructed after the April 2019 roof fire.',
    imagePath: '/images/buildings/notre-dame-de-paris.jpg',
    imageAlt:
      'Close-up limestone elevation of a sculpted west facade portal tympanum and archivolts beneath the Gallery of Kings arcade at Notre-Dame de Paris',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-012',
    catalogNumber: 'CAT. 012',
    slug: 'cologne-cathedral',
    name: 'Cologne Cathedral',
    nativeName: 'Hohe Domkirche Sankt Petrus',
    movement: 'Gothic',
    subStyle: 'German High Gothic / Rayonnant',
    architect: 'Master Gerhard; completed by Ernst Friedrich Zwirner & Richard Voigtel',
    city: 'Cologne',
    country: 'Germany',
    continent: 'Europe',
    yearStart: 1248,
    yearCompleted: 1880,
    chronologyLabel: '1248–1880',
    coordinates: {
      lat: 50.9414,
      lng: 6.9583,
      dmsLat: `50°56'29"N`,
      dmsLng: `6°57'30"E`,
      dmsFormatted: `50°56'29"N × 6°57'30"E`,
    },
    dimensions: {
      heightMeters: 157.2,
      heightLabel: '157.2 M TWIN SPIRES',
      spanOrLengthMeters: 144.6,
      spanOrLengthLabel: '144.6 M LENGTH / 43.35 M VAULT',
      primaryMetric: '43.35 M NAVE VAULT',
    },
    materials: [
      'Drachenfels trachyte',
      'Schlaitdorf sandstone',
      'Wrought-iron roof trussing',
    ],
    materialCode: 'TRACHYTE & SANDSTONE',
    status: 'Standing',
    summary:
      'Five-aisled cruciform cathedral holding the tallest twin-spire facade in Europe and a 43.35-meter interior central vault.',
    structuralAxiom:
      'Bundled trachyte and sandstone piers channel loads from 43.35-meter vaults and 157.2-meter openwork spires down to deep Roman-era foundation strata.',
    structuralNotes:
      'Continuous bundled shafts rise unbroken from the nave floor to the 43.35-meter quadripartite vaults, producing a vertical height-to-width ratio exceeding 3.6:1. Twin open-tracery stone spires scale 157.22 meters atop massive west towers.',
    historicalContext:
      'Laid out in 1248 by Master Gerhard to house the Shrine of the Three Kings; construction halted around 1560 after the choir and south tower base were built. Work resumed in 1842 following rediscovered medieval parchment elevation drawings (Facade Plan F) and concluded in 1880.',
    imagePath: '/images/buildings/cologne-cathedral.jpg',
    imageAlt:
      'Twin openwork stone spires and flying buttress forest of Cologne Cathedral rising along the Rhine embankment',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-013',
    catalogNumber: 'CAT. 013',
    slug: 'milan-cathedral',
    name: 'Milan Cathedral',
    nativeName: 'Duomo di Milano',
    movement: 'Gothic',
    subStyle: 'Italian Late Gothic / Flamboyant',
    architect: 'Simone da Orsenigo, Nicolas de Bonaventure & successive masters',
    city: 'Milan',
    country: 'Italy',
    continent: 'Europe',
    yearStart: 1386,
    yearCompleted: 1965,
    chronologyLabel: '1386–1965',
    coordinates: {
      lat: 45.4642,
      lng: 9.1914,
      dmsLat: `45°27'51"N`,
      dmsLng: `9°11'29"E`,
      dmsFormatted: `45°27'51"N × 9°11'29"E`,
    },
    dimensions: {
      heightMeters: 108.5,
      heightLabel: '108.5 M CENTRAL SPIRE',
      spanOrLengthMeters: 158.6,
      spanOrLengthLabel: '158.6 M LENGTH / 45.55 M VAULT',
      primaryMetric: '135 MARBLE PINNACLES',
    },
    materials: [
      'Candoglia marble cladding',
      'Brick masonry structural core',
      'Iron tie rods',
    ],
    materialCode: 'CANDOGLIA MARBLE',
    status: 'Standing',
    summary:
      'Five-aisled marble-clad basilica crowned by 135 stone pinnacles, flying buttresses, and a 108.5-meter central crossing spire.',
    structuralAxiom:
      'Fifty-two clustered brick-and-marble piers tied with wrought-iron tension rods carry five stepped aisles culminating in a 45.55-meter central vault and 108.5-meter crossing spire.',
    structuralNotes:
      'Built around a brick structural core faced in pink-grey Candoglia marble, the wide low-pitched nave deploys 52 clustered piers topped by sculpted figurative capitals. Wrought-iron tension tie rods supplement external flying buttresses across the 45.55-meter nave vault.',
    historicalContext:
      'Begun in 1386 under Gian Galeazzo Visconti and Archbishop Antonio da Saluzzo with input from Lombard, French, and German master masons. The central spire by Francesco Croce was raised in 1762–1774, Napoleon ordered the facade completed in 1805–1813, and final bronze portals finished in 1965.',
    imagePath: '/images/buildings/milan-cathedral.jpg',
    imageAlt:
      'Candoglia marble facade, flying buttresses, and forest of sculpted Gothic pinnacles at Milan Cathedral',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-014',
    catalogNumber: 'CAT. 014',
    slug: 'sainte-chapelle',
    name: 'Sainte-Chapelle',
    nativeName: 'La Sainte-Chapelle du Palais',
    movement: 'Gothic',
    subStyle: 'French Rayonnant Gothic',
    architect: 'Attributed to Pierre de Montreuil',
    city: 'Paris',
    country: 'France',
    continent: 'Europe',
    yearStart: 1242,
    yearCompleted: 1248,
    chronologyLabel: '1248',
    coordinates: {
      lat: 48.8553,
      lng: 2.345,
      dmsLat: `48°51'19"N`,
      dmsLng: `2°20'42"E`,
      dmsFormatted: `48°51'19"N × 2°20'42"E`,
    },
    dimensions: {
      heightMeters: 42.5,
      heightLabel: '42.5 M TOTAL / 20.6 M UPPER VAULT',
      spanOrLengthMeters: 36.0,
      spanOrLengthLabel: '36.0 M × 17.0 M PLAN',
      primaryMetric: '600 M² STAINED GLASS',
    },
    materials: [
      'Parisian limestone',
      'Wrought-iron tension chains',
      'Lead-camed stained glass',
    ],
    materialCode: 'LIMESTONE & GLASS',
    status: 'Standing',
    summary:
      'Two-tiered royal palatine reliquary chapel whose upper nave eliminates masonry wall planes in favor of fifteen-meter lancet glass bays.',
    structuralAxiom:
      'Deep exterior pier buttresses and iron masonry chains embedded through 15-meter stained-glass mullions absorb upper vault thrust without flying buttresses.',
    structuralNotes:
      'The low-vaulted stone lower chapel acts as a heavy plinth supporting the slender upper vessel without flying buttresses. Deep exterior pier buttresses combined with concealed wrought-iron tie chains embedded in the stone masonry resist lateral vault thrust across the glazed bays.',
    historicalContext:
      'Commissioned by King Louis IX to house the Crown of Thorns and relics of the Passion acquired from Baldwin II of Constantinople. Consecrated on April 26, 1248; its cedar spire and stained glass underwent comprehensive 19th-century restoration.',
    imagePath: '/images/buildings/sainte-chapelle.jpg',
    imageAlt:
      'Upper chapel interior of Sainte-Chapelle in Paris showing tall Rayonnant stained-glass lancets separated by slender limestone vault shafts',
    hasAnatomyPlate: true,
    anatomyPlateId: 'sainte-chapelle',
  },
  {
    id: 'ARC-015',
    catalogNumber: 'CAT. 015',
    slug: 'salisbury-cathedral',
    name: 'Salisbury Cathedral',
    nativeName: 'Cathedral Church of the Blessed Virgin Mary',
    movement: 'Gothic',
    subStyle: 'Early English Gothic',
    architect: 'Elias of Dereham & Nicholas of Ely (spire: Richard Farleigh)',
    city: 'Salisbury',
    country: 'United Kingdom',
    continent: 'Europe',
    yearStart: 1220,
    yearCompleted: 1330,
    chronologyLabel: '1220–1330',
    coordinates: {
      lat: 51.0647,
      lng: -1.7975,
      dmsLat: `51°03'53"N`,
      dmsLng: `1°47'51"W`,
      dmsFormatted: `51°03'53"N × 1°47'51"W`,
    },
    dimensions: {
      heightMeters: 123.0,
      heightLabel: '123.0 M CROSSING SPIRE',
      spanOrLengthMeters: 135.0,
      spanOrLengthLabel: '135.0 M LENGTH',
      primaryMetric: '123.0 M MASONRY SPIRE',
    },
    materials: [
      'Chilmark oolitic limestone',
      'Purbeck marble shafts',
      'Timber scaffolding spire core',
    ],
    materialCode: 'CHILMARK LIMESTONE',
    status: 'Standing',
    summary:
      'Uniform Early English double-transept cathedral grounded in Chilmark limestone and crowned by the tallest masonry spire in Britain.',
    structuralAxiom:
      'Four slender Chilmark limestone crossing piers carry 6,500 metric tons of tower and 123-meter spire masonry stabilized by internal iron ties and strainer arches.',
    structuralNotes:
      'Unlike continental French verticality, the three-storey elevation emphasizes horizontal Purbeck marble stringcourses and slender detached pier shafts. Added in the 14th century, the 6,500-ton tower and 123-meter spire required internal iron bracing and strainer arches to stabilize four slender crossing piers.',
    historicalContext:
      'Constructed on a greenfield water-meadow site after Bishop Richard Poore relocated the see from Old Sarum in 1220. The main body was consecrated in 1258 in a single unified campaign, with the crossing tower and spire added around 1300–1330.',
    imagePath: '/images/buildings/salisbury-cathedral.jpg',
    imageAlt:
      'Chilmark limestone east end, double transepts, and 123-meter crossing spire of Salisbury Cathedral in Wiltshire',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-016',
    catalogNumber: 'CAT. 016',
    slug: 'kings-college-chapel',
    name: "King's College Chapel",
    movement: 'Gothic',
    subStyle: 'English Perpendicular Gothic',
    architect: 'Reginald Ely, Simon Clerk & John Wastell',
    city: 'Cambridge',
    country: 'United Kingdom',
    continent: 'Europe',
    yearStart: 1446,
    yearCompleted: 1515,
    chronologyLabel: '1446–1515',
    coordinates: {
      lat: 52.2047,
      lng: 0.1164,
      dmsLat: `52°12'17"N`,
      dmsLng: `0°06'59"E`,
      dmsFormatted: `52°12'17"N × 0°06'59"E`,
    },
    dimensions: {
      heightMeters: 24.4,
      heightLabel: '24.4 M INTERIOR VAULT',
      spanOrLengthMeters: 88.0,
      spanOrLengthLabel: '88.0 M LENGTH × 12.2 M SPAN',
      primaryMetric: '12.2 M FAN VAULT SPAN',
    },
    materials: [
      'Weldon & Clipsham oolitic limestone',
      'Magnesium limestone',
      'Lead and oak roof',
    ],
    materialCode: 'OOLITIC LIMESTONE',
    status: 'Standing',
    summary:
      'Unbroken rectangular Perpendicular vessel spanned by the world’s largest limestone fan vault above twelve bays of traceried glass.',
    structuralAxiom:
      'Twelve external buttresses with weighted pinnacles balance 100-millimeter-thin oolitic limestone fan vaults spanning 12.2 meters across an aisleless hall.',
    structuralNotes:
      'Twelve deep external buttresses absorb the outward thrust of John Wastell’s 12.2-meter-wide fan vault, leaving the interior free of aisles. Semi-conical masonry shells interlock along transverse four-centered ribs, achieving shell thicknesses as thin as 100 millimeters near the crown.',
    historicalContext:
      'Founded by King Henry VI in 1446; construction stalled during the Wars of the Roses and resumed under Henry VII and Henry VIII. Master mason John Wastell completed the twelve-bay fan vault between 1512 and 1515, followed by Flemish stained glass installed up to 1536.',
    imagePath: '/images/buildings/kings-college-chapel.jpg',
    imageAlt:
      'Perpendicular Gothic limestone fan vaulting and twelve bays of stained glass inside King’s College Chapel in Cambridge',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-017',
    catalogNumber: 'CAT. 017',
    slug: 'bourges-cathedral',
    name: 'Bourges Cathedral',
    nativeName: 'Cathédrale Saint-Étienne de Bourges',
    movement: 'Gothic',
    subStyle: 'French High Gothic',
    architect: 'Master of Bourges (anonymous)',
    city: 'Bourges',
    country: 'France',
    continent: 'Europe',
    yearStart: 1195,
    yearCompleted: 1230,
    chronologyLabel: '1195–1230 (CONS. 1324)',
    coordinates: {
      lat: 47.0819,
      lng: 2.3994,
      dmsLat: `47°04'55"N`,
      dmsLng: `2°23'58"E`,
      dmsFormatted: `47°04'55"N × 2°23'58"E`,
    },
    dimensions: {
      heightMeters: 37.15,
      heightLabel: '37.15 M CENTRAL VAULT',
      spanOrLengthMeters: 125.0,
      spanOrLengthLabel: '125.0 M LENGTH',
      primaryMetric: 'NO TRANSEPT / 5 AISLES',
    },
    materials: [
      'Bourges & Charly limestone',
      'Iron tie cramps',
      'Oak roof structure',
    ],
    materialCode: 'FRENCH LIMESTONE',
    status: 'Standing',
    summary:
      'Non-transept High Gothic cathedral employing stepped double side aisles and steep twin-tiered flying buttresses.',
    structuralAxiom:
      'Stepped five-aisle vaults rising from 9.3 to 21.3 to 37.15 meters distribute lateral loads outward through steeply inclined, thin-profile flying buttresses.',
    structuralNotes:
      'Eliminating the projecting transept allowed an unbroken longitudinal pyramid section: outer aisles rise to 9.3 meters, inner aisles to 21.3 meters with their own triforium and clerestory, and the central sexpartite nave reaches 37.15 meters. Steeply pitched flying buttresses brace the thin clerestory walls.',
    historicalContext:
      'Begun in 1195 under Archbishop Henri de Sully simultaneously with Chartres, with the eastern choir functional by 1214 and the western bays vaulted around 1230; consecrated in 1324. Inscribed as a UNESCO World Heritage site in 1992.',
    imagePath: '/images/buildings/bourges-cathedral.jpg',
    imageAlt:
      'Stepped double-aisle longitudinal section and steep flying buttresses of Bourges Cathedral rising without a transept',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-018',
    catalogNumber: 'CAT. 018',
    slug: 'wells-cathedral',
    name: 'Wells Cathedral',
    nativeName: 'Cathedral Church of St Andrew',
    movement: 'Gothic',
    subStyle: 'Early English & Decorated Gothic',
    architect: 'Anonymous Early Masters; William Joy (scissor arches)',
    city: 'Wells',
    country: 'United Kingdom',
    continent: 'Europe',
    yearStart: 1176,
    yearCompleted: 1348,
    chronologyLabel: '1176–1348',
    coordinates: {
      lat: 51.2103,
      lng: -2.6436,
      dmsLat: `51°12'37"N`,
      dmsLng: `2°38'37"W`,
      dmsFormatted: `51°12'37"N × 2°38'37"W`,
    },
    dimensions: {
      heightMeters: 55.0,
      heightLabel: '55.0 M CROSSING TOWER',
      spanOrLengthMeters: 126.5,
      spanOrLengthLabel: '126.5 M LENGTH',
      primaryMetric: 'OCTAGONAL CHAPTER HOUSE',
    },
    materials: [
      'Doulting oolitic limestone',
      'Blue Lias & Purbeck stone',
      'Lead and timber roof',
    ],
    materialCode: 'DOULTING LIMESTONE',
    status: 'Standing',
    summary:
      'Doulting limestone cathedral renowned for its sculptural screen west front, star-ribbed octagonal chapter house, and structural scissor arches.',
    structuralAxiom:
      'Openwork masonry scissor arches inserted in 1338–1348 cross-brace all four faces of the central tower piers against differential foundation settlement.',
    structuralNotes:
      'When the newly heightened 55-meter central tower settled and cracked the crossing piers in 1338, master mason William Joy inserted massive inverted-arch strainer trusses across three crossing bays. Earlier, the 1306 chapter house deployed thirty-two tierceron ribs radiating from a single central pier.',
    historicalContext:
      'Construction began around 1176 under Bishop Reginald de Bohun and reached major consecration in 1239. Subsequent Decorated Gothic additions—the octagonal chapter house (1286–1306), Lady Chapel, and Joy’s 1338–1348 scissor arches—completed the medieval structural ensemble.',
    imagePath: '/images/buildings/wells-cathedral.jpg',
    imageAlt:
      'William Joy’s inverted masonry scissor arches bracing the central crossing tower piers inside Wells Cathedral in Somerset',
    hasAnatomyPlate: true,
    anatomyPlateId: 'wells-cathedral',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MONUMENTAL (019–027)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'ARC-019',
    catalogNumber: 'CAT. 019',
    slug: 'hagia-sophia',
    name: 'Hagia Sophia',
    nativeName: 'Ayasofya / Ἁγία Σοφία',
    movement: 'Monumental',
    subStyle: 'Early Byzantine Pendentive Basilica',
    architect: 'Isidore of Miletus & Anthemius of Tralles',
    city: 'Istanbul',
    country: 'Turkey',
    continent: 'Middle East',
    yearStart: 532,
    yearCompleted: 537,
    chronologyLabel: '537 CE (REBUILT 562)',
    coordinates: {
      lat: 41.0083,
      lng: 28.98,
      dmsLat: `41°00'30"N`,
      dmsLng: `28°58'48"E`,
      dmsFormatted: `41°00'30"N × 28°58'48"E`,
    },
    dimensions: {
      heightMeters: 55.6,
      heightLabel: '55.6 M DOME CROWN',
      spanOrLengthMeters: 31.8,
      spanOrLengthLabel: '31.8 M DOME DIAMETER',
      primaryMetric: '31.8 M PENDENTIVE DOME',
    },
    materials: [
      'Fired Roman brick & crushed-brick mortar',
      'Proconnesian marble revetments',
      'Ashlar limestone main piers',
    ],
    materialCode: 'BRICK & ASHLAR',
    status: 'Standing',
    summary:
      'Imperial Byzantine basilica suspending a 31.8-meter ribbed brick dome on four spherical pendentives between colossal eastern and western half-domes.',
    structuralAxiom:
      'Four spherical brick pendentives transition a 31.8-meter square bay into a forty-ribbed dome crown 55.6 meters above the Proconnesian marble floor.',
    structuralNotes:
      'Four massive ashlar piers carry four giant arches and triangular spherical pendentives that transition a square central bay into a circular drum pierced by forty arched windows. Longitudinal thrust discharges through paired half-domes, while lateral thrust meets deep north-south stone buttress piers.',
    historicalContext:
      'Built in five years (532–537 CE) by mathematician Anthemius of Tralles and physicist Isidore of Miletus under Emperor Justinian I. After the 558 earthquake collapsed the original shallower dome, Isidore the Younger raised the steeper forty-ribbed dome completed in 562 CE.',
    imagePath: '/images/buildings/hagia-sophia.jpg',
    imageAlt:
      'Central 31.8-meter ribbed brick dome resting on spherical pendentives and eastern half-dome inside Hagia Sophia in Istanbul',
    hasAnatomyPlate: true,
    anatomyPlateId: 'hagia-sophia',
  },
  {
    id: 'ARC-020',
    catalogNumber: 'CAT. 020',
    slug: 'suleymaniye-mosque',
    name: 'Süleymaniye Mosque',
    nativeName: 'Süleymaniye Camii',
    movement: 'Monumental',
    subStyle: 'Classical Ottoman Imperial Mosque',
    architect: 'Mimar Sinan',
    city: 'Istanbul',
    country: 'Turkey',
    continent: 'Middle East',
    yearStart: 1550,
    yearCompleted: 1557,
    chronologyLabel: '1557',
    coordinates: {
      lat: 41.0161,
      lng: 28.9639,
      dmsLat: `41°00'58"N`,
      dmsLng: `28°57'50"E`,
      dmsFormatted: `41°00'58"N × 28°57'50"E`,
    },
    dimensions: {
      heightMeters: 53.0,
      heightLabel: '53.0 M DOME / 76.0 M MINARETS',
      spanOrLengthMeters: 26.5,
      spanOrLengthLabel: '26.5 M DOME DIAMETER',
      primaryMetric: '4 ELEPHANT PIERS / 4 MINARETS',
    },
    materials: [
      'Küfeki limestone ashlar',
      'Egyptian red granite columns',
      'Lead-sheathed brick dome',
    ],
    materialCode: 'KÜFEKİ LIMESTONE',
    status: 'Standing',
    summary:
      'Cascading Ottoman dome complex perched above the Golden Horn, balancing a 26.5-meter central dome on four monumental piers and paired half-domes.',
    structuralAxiom:
      'Four Küfeki limestone elephant piers and axial half-domes channel the outward thrust of the 26.5-meter main dome into stepped lateral buttress walls.',
    structuralNotes:
      'Sinan embedded the primary buttressing piers into the side walls and stepped the exterior silhouette downward from the 53-meter central dome through axial half-domes and corner cupolas. Hollow clay resonators inserted in the dome masonry tune interior acoustics.',
    historicalContext:
      'Commissioned by Sultan Süleyman the Magnificent and constructed by Chief Imperial Architect Mimar Sinan between 1550 and 1557 as the heart of a multi-building külliye complex including madrasas, hospital, bathhouse, and royal tombs.',
    imagePath: '/images/buildings/suleymaniye-mosque.jpg',
    imageAlt:
      'Cascading lead-clad domes, half-domes, and four slender stone minarets of the Süleymaniye Mosque overlooking the Golden Horn in Istanbul',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-021',
    catalogNumber: 'CAT. 021',
    slug: 'selimiye-mosque',
    name: 'Selimiye Mosque',
    nativeName: 'Selimiye Camii',
    movement: 'Monumental',
    subStyle: 'Classical Ottoman Imperial Mosque',
    architect: 'Mimar Sinan',
    city: 'Edirne',
    country: 'Turkey',
    continent: 'Middle East',
    yearStart: 1568,
    yearCompleted: 1575,
    chronologyLabel: '1568–1575',
    coordinates: {
      lat: 41.6781,
      lng: 26.5594,
      dmsLat: `41°40'41"N`,
      dmsLng: `26°33'34"E`,
      dmsFormatted: `41°40'41"N × 26°33'34"E`,
    },
    dimensions: {
      heightMeters: 42.3,
      heightLabel: '42.3 M DOME / 70.9 M MINARETS',
      spanOrLengthMeters: 31.3,
      spanOrLengthLabel: '31.3 M DOME DIAMETER',
      primaryMetric: 'OCTAGONAL 8-PIER SYSTEM',
    },
    materials: [
      'Cut limestone ashlar',
      'Marmara & colored marble',
      'Iznik glazed ceramic tiles',
    ],
    materialCode: 'LIMESTONE & MARBLE',
    status: 'Standing',
    summary:
      'Unified single-dome prayer hall resting on an octagonal drum supported by eight piers and framed by four 70.9-meter fluted minarets.',
    structuralAxiom:
      'Eight polygonal piers arranged in an inscribed octagon support a single 31.3-meter dome drum braced by corner squinches and external flying arches.',
    structuralNotes:
      'Replacing the bidirectional half-domes of earlier Ottoman mosques, Sinan placed eight polygonal stone piers in an octagon tied into the outer walls via flying arches and corner squinches. This concentrates the 31.3-meter dome into an unobstructed single spatial volume.',
    historicalContext:
      'Built for Sultan Selim II in Edirne between 1568 and 1575 and described in Sinan’s own autobiography as his masterwork. Inscribed on the UNESCO World Heritage List in 2011.',
    imagePath: '/images/buildings/selimiye-mosque.jpg',
    imageAlt:
      'Central 31.3-meter dome flanked by four tall fluted stone minarets at the Selimiye Mosque in Edirne',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-022',
    catalogNumber: 'CAT. 022',
    slug: 'anitkabir',
    name: 'Anıtkabir',
    nativeName: 'Atatürk Mausoleum',
    movement: 'Monumental',
    subStyle: 'Second National Architectural Movement',
    architect: 'Emin Onat & Orhan Arda',
    city: 'Ankara',
    country: 'Turkey',
    continent: 'Middle East',
    yearStart: 1944,
    yearCompleted: 1953,
    chronologyLabel: '1944–1953',
    coordinates: {
      lat: 39.9256,
      lng: 32.8378,
      dmsLat: `39°55'32"N`,
      dmsLng: `32°50'16"E`,
      dmsFormatted: `39°55'32"N × 32°50'16"E`,
    },
    dimensions: {
      heightMeters: 22.8,
      heightLabel: '22.8 M EXTERIOR / 17.0 M HALL',
      spanOrLengthMeters: 57.35,
      spanOrLengthLabel: '57.35 M × 41.65 M HALL',
      primaryMetric: '750,000 M² CITADEL SITE',
    },
    materials: [
      'Reinforced concrete frame',
      'Kayseri & Eskipazar travertine',
      'Afyon, Bilecik & Hatay marbles',
    ],
    materialCode: 'TRAVERTINE & CONCRETE',
    status: 'Standing',
    summary:
      'Hilltop civic acropolis comprising the 262-meter Road of Lions, a colonnaded Ceremonial Plaza, and a rectilinear travertine-clad Hall of Honour.',
    structuralAxiom:
      'A reinforced concrete peristyle clad in Kayseri travertine carries 14.4-meter square piers and a coffered slab spanning the 57.35-by-41.65-meter Hall of Honour.',
    structuralNotes:
      'A heavy reinforced concrete core supports the peristyle colonnade of 14.4-meter square-fluted piers around the 57.35 × 41.65 meter mausoleum block. The Hall of Honour encloses a single 40-ton monolithic Osmaniye marble cenotaph beneath a flat geometric coffered ceiling.',
    historicalContext:
      'Selected through a 1941 international competition won by Turkish architects Emin Onat and Orhan Arda to house the tomb of Mustafa Kemal Atatürk. Built on Rasattepe (now Anıttepe) across four construction phases from 1944 to 1953.',
    imagePath: '/images/buildings/anitkabir.jpg',
    imageAlt:
      'Square-piered travertine colonnade and monumental entrance steps of the Hall of Honour at Anıtkabir in Ankara',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-023',
    catalogNumber: 'CAT. 023',
    slug: 'pantheon-rome',
    name: 'Pantheon',
    nativeName: 'Pantheon Roma',
    movement: 'Monumental',
    subStyle: 'Imperial Roman Concrete Vaulting',
    architect: 'Attributed to Apollodorus of Damascus (rebuilt under Hadrian)',
    city: 'Rome',
    country: 'Italy',
    continent: 'Europe',
    yearStart: 118,
    yearCompleted: 126,
    chronologyLabel: 'c. 126 CE',
    coordinates: {
      lat: 41.8986,
      lng: 12.4767,
      dmsLat: `41°53'55"N`,
      dmsLng: `12°28'36"E`,
      dmsFormatted: `41°53'55"N × 12°28'36"E`,
    },
    dimensions: {
      heightMeters: 43.3,
      heightLabel: '43.3 M OCULUS HEIGHT',
      spanOrLengthMeters: 43.3,
      spanOrLengthLabel: '43.3 M DOME DIAMETER',
      primaryMetric: '43.3 M UNREINFORCED DOME',
    },
    materials: [
      'Pozzolanic Roman concrete (graded aggregate)',
      'Brick-faced concrete drum (6.4 m thick)',
      'Egyptian granite & Carrara marble',
    ],
    materialCode: 'ROMAN CONCRETE',
    status: 'Standing',
    summary:
      'Unreinforced concrete rotunda whose 43.3-meter hemispherical dome encloses a geometric sphere and opens to the sky through an 8.2-meter oculus.',
    structuralAxiom:
      'Six-point-four-meter brick-faced concrete walls and graded volcanic aggregates support a 43.3-meter unreinforced dome crowned by an 8.2-meter compression oculus.',
    structuralNotes:
      'Concrete aggregate density grades systematically from heavy travertine and tufa in the 6.4-meter-thick drum foundations to lightweight volcanic pumice around the compression-ring oculus. Five stepped exterior rings and 140 recessed interior coffers reduce dead weight while controlling radial hoop tension.',
    historicalContext:
      'Constructed between c. 118 and 126 CE under Emperor Hadrian on the site of Marcus Agrippa’s burnt 27 BCE temple, retaining Agrippa’s dedicatory inscription on the octastyle granite portico. Remains the world’s largest unreinforced solid concrete dome.',
    imagePath: '/images/buildings/pantheon-rome.jpg',
    imageAlt:
      'Five rings of sunken concrete coffers converging on the open central oculus inside the Pantheon rotunda in Rome',
    hasAnatomyPlate: true,
    anatomyPlateId: 'pantheon-rome',
  },
  {
    id: 'ARC-024',
    catalogNumber: 'CAT. 024',
    slug: 'national-assembly-dhaka',
    name: 'National Assembly Building of Bangladesh',
    nativeName: 'Jatiya Sangsad Bhaban',
    movement: 'Monumental',
    subStyle: 'Civic Monumental Modernism',
    architect: 'Louis I. Kahn (with Muzharul Islam)',
    city: 'Dhaka',
    country: 'Bangladesh',
    continent: 'Asia',
    yearStart: 1962,
    yearCompleted: 1982,
    chronologyLabel: '1962–1982',
    coordinates: {
      lat: 23.7622,
      lng: 90.3786,
      dmsLat: `23°45'44"N`,
      dmsLng: `90°22'43"E`,
      dmsFormatted: `23°45'44"N × 90°22'43"E`,
    },
    dimensions: {
      heightMeters: 47.2,
      heightLabel: '47.2 M CENTRAL ASSEMBLY',
      primaryMetric: '8-VOLUME OCTAGONAL PLAN',
    },
    materials: [
      'Cast-in-place board-marked concrete',
      'Inlaid white marble expansion bands',
      'Red brick auxiliary hostels',
    ],
    materialCode: 'CONCRETE & MARBLE',
    status: 'Standing',
    summary:
      'Octagonal cast-concrete parliamentary citadel encircled by an artificial lake and pierced by colossal circular, triangular, and rectangular apertures.',
    structuralAxiom:
      'Eight concentric concrete perimeter blocks with inlaid marble pour-joint bands wrap a 47.2-meter octagonal chamber roofed by a parabolic shell umbrella.',
    structuralNotes:
      'Eight peripheral office and circulation towers buffer the central octagonal parliamentary chamber from tropical monsoon heat and glare. Regular horizontal white marble bands set into the concrete lifts serve simultaneously as formwork joints, drip grooves, and geometric datum lines.',
    historicalContext:
      'Commissioned in 1961 under architect Muzharul Islam’s advocacy for Louis Kahn; construction proceeded across twenty years through the 1971 Bangladesh Liberation War and Kahn’s death in 1974, opening on February 15, 1982.',
    imagePath: '/images/buildings/national-assembly-dhaka.jpg',
    imageAlt:
      'Cast-in-place concrete cylinders and faceted walls inlaid with white marble bands and circular and triangular apertures above brick steps and lawn at Jatiya Sangsad Bhaban in Dhaka',
    hasAnatomyPlate: true,
    anatomyPlateId: 'national-assembly-dhaka',
  },
  {
    id: 'ARC-025',
    catalogNumber: 'CAT. 025',
    slug: 'palace-of-assembly-chandigarh',
    name: 'Palace of Assembly',
    nativeName: 'Legislative Assembly, Capitol Complex',
    movement: 'Monumental',
    subStyle: 'Monumental Concrete Modernism',
    architect: 'Le Corbusier (with Pierre Jeanneret)',
    city: 'Chandigarh',
    country: 'India',
    continent: 'Asia',
    yearStart: 1951,
    yearCompleted: 1962,
    chronologyLabel: '1962',
    coordinates: {
      lat: 30.7611,
      lng: 76.8031,
      dmsLat: `30°45'40"N`,
      dmsLng: `76°48'11"E`,
      dmsFormatted: `30°45'40"N × 76°48'11"E`,
    },
    dimensions: {
      heightMeters: 38.0,
      heightLabel: '38.0 M HYPERBOLIC SHELL',
      primaryMetric: '150 MM THICK CONCRETE SHELL',
    },
    materials: [
      'Béton brut reinforced concrete',
      '150 mm thin-shell concrete',
      'Porcelain-enamel steel portal',
    ],
    materialCode: 'BÉTON BRUT',
    status: 'Standing',
    summary:
      'Hypostyle legislative hall anchored by a monumental upturned portico and pierced by a 38-meter hyperbolic paraboloid assembly chimney.',
    structuralAxiom:
      'A 150-millimeter thin-shell hyperbolic paraboloid concrete drum rises 38 meters through an orthogonal hypostyle column grid behind an upturned brise-soleil trough.',
    structuralNotes:
      'A square concrete grid column hall surrounds two autonomous chambers rising through the roof plane: a circular assembly crowned by a 15-centimeter-thick hyperbolic cooling-tower shell truncated obliquely toward the sun, and a pyramidal council chamber.',
    historicalContext:
      'Built between 1951 and 1962 (officially inaugurated in 1964) as the legislative centerpiece of Chandigarh’s Capitol Complex designed by Le Corbusier for post-partition Punjab. Inscribed as a UNESCO World Heritage site in 2016.',
    imagePath: '/images/buildings/palace-of-assembly-chandigarh.jpg',
    imageAlt:
      'Upturned concrete portico piers and projecting 38-meter hyperbolic shell tower of the Palace of Assembly in Chandigarh',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-026',
    catalogNumber: 'CAT. 026',
    slug: 'sagrada-familia',
    name: 'Basílica de la Sagrada Família',
    nativeName: 'Temple Expiatori de la Sagrada Família',
    movement: 'Monumental',
    subStyle: 'Catalan Modernisme / Hyperboloid Masonry',
    architect: 'Antoni Gaudí (initial: Francisco de Paula del Villar; later continuation teams)',
    city: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    yearStart: 1882,
    yearCompleted: 2026,
    chronologyLabel: '1882–PRESENT',
    coordinates: {
      lat: 41.4036,
      lng: 2.1744,
      dmsLat: `41°24'13"N`,
      dmsLng: `2°10'28"E`,
      dmsFormatted: `41°24'13"N × 2°10'28"E`,
    },
    dimensions: {
      heightMeters: 172.5,
      heightLabel: '172.5 M CENTRAL TOWER (IN PROGRESS)',
      spanOrLengthMeters: 90.0,
      spanOrLengthLabel: '90.0 M LENGTH / 45.0 M NAVE VAULT',
      primaryMetric: '172.5 M DESIGNED SPIRE',
    },
    materials: [
      'Montjuïc sandstone & basalt',
      'Iranian porphyry & granite',
      'Post-tensioned precast stone panels',
    ],
    materialCode: 'TENSIONED STONE',
    status: 'Under Completion',
    summary:
      'Monumental expiatory basilica whose branching double-twisted columns and ruled hyperboloid vaults transfer loads strictly along catenary compression lines.',
    structuralAxiom:
      'Inclined double-twisted stone columns branched along inverted catenary curves resolve vault forces internally in compression up to the 172.5-meter central tower.',
    structuralNotes:
      'Inclined polygonal piers divide into angled branches calculated from hanging-chain static models so stone columns carry vertical and lateral vault loads in pure compression without exterior flying buttresses. Pre-tensioned stone panels form the upper central towers currently under completion.',
    historicalContext:
      'Begun in 1882 under Francisco de Paula del Villar and redesigned from 1883 by Antoni Gaudí until his death in 1926. Following the completion of the central nave vaults in 2010, construction remains ongoing on the 172.5-meter central Tower of Jesus Christ and the Glory Facade.',
    imagePath: '/images/buildings/sagrada-familia.jpg',
    imageAlt:
      'Upward interior view of branching double-twisted stone columns supporting sunlit hyperboloid nave vaults and golden-starred aisle bays inside the Sagrada Família in Barcelona',
    hasAnatomyPlate: false,
  },
  {
    id: 'ARC-027',
    catalogNumber: 'CAT. 027',
    slug: 'battle-of-the-nations-monument',
    name: 'Monument to the Battle of the Nations',
    nativeName: 'Völkerschlachtdenkmal',
    movement: 'Monumental',
    subStyle: 'Wilhelmine Cyclopean Monumentalism',
    architect: 'Bruno Schmitz (sculptor: Franz Metzner)',
    city: 'Leipzig',
    country: 'Germany',
    continent: 'Europe',
    yearStart: 1898,
    yearCompleted: 1913,
    chronologyLabel: '1898–1913',
    coordinates: {
      lat: 51.3124,
      lng: 12.4133,
      dmsLat: `51°18'45"N`,
      dmsLng: `12°24'48"E`,
      dmsFormatted: `51°18'45"N × 12°24'48"E`,
    },
    dimensions: {
      heightMeters: 91.0,
      heightLabel: '91.0 M ELEVATION',
      primaryMetric: '300,000 T MASS / 65 PILES',
    },
    materials: [
      'Mass concrete structural core',
      'Beucha granite-porphyry facing',
      'Coarse cyclopean ashlar',
    ],
    materialCode: 'GRANITE & CONCRETE',
    status: 'Standing',
    summary:
      'Ninety-one-meter stepped pyramidal concrete and porphyry cenotaph housing a domed interior Hall of Fame ringed by colossal carved figures.',
    structuralAxiom:
      'Sixty-five driven concrete piles bear 300,000 metric tons of cyclopean granite-porphyry and mass concrete rising 91 meters over a double-domed crypt and hall.',
    structuralNotes:
      'Estimated at 300,000 metric tons, the hollow tapered tower rests on sixty-five concrete foundation piers supporting a domed crypt and a 68-meter upper Hall of Fame. At the time of completion, it ranked among the largest mass-concrete structures in Europe.',
    historicalContext:
      'Designed by Bruno Schmitz with monumental reliefs by Franz Metzner and inaugurated on October 18, 1913, on the centenary of the 1813 Battle of Leipzig. Positioned along the southeastern approach to the historic battlefield.',
    imagePath: '/images/buildings/battle-of-the-nations-monument.jpg',
    imageAlt:
      'Stepped granite-porphyry tower and colossal carved relief facade of the Monument to the Battle of the Nations in Leipzig',
    hasAnatomyPlate: false,
  },
];

export const ANATOMY_PLATE_BUILDINGS: BuildingRecord[] = BUILDINGS.filter(
  (b) => b.hasAnatomyPlate
);

export function getBuildingBySlug(slug: string): BuildingRecord | undefined {
  return BUILDINGS.find((b) => b.slug === slug);
}

export function getBuildingsByMovement(movement: Movement): BuildingRecord[] {
  return BUILDINGS.filter((b) => b.movement === movement);
}

export function getBuildingsByContinent(continent: Continent): BuildingRecord[] {
  return BUILDINGS.filter((b) => b.continent === continent);
}
