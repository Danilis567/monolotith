import type { AnatomyPlateId } from './buildings';

export type DrawingType =
  | 'Section'
  | 'Elevation'
  | 'Plan'
  | 'Section / Elevation'
  | 'Plan / Section';

export interface AnatomyCallout {
  code: string;
  label: string;
  value: string;
  notes: string;
}

export interface AnatomyDimensionRow {
  parameter: string;
  metricValue: string;
  structuralRole: string;
}

export interface AnatomyPlateRecord {
  id: AnatomyPlateId;
  catalogNumber: string;
  plateNumber: string;
  title: string;
  buildingName: string;
  architect: string;
  chronology: string;
  drawingType: DrawingType;
  scale: string;
  datumElevation: string;
  svgPath: string;
  whatYouSee: string;
  description: string;
  callouts: AnatomyCallout[];
  dimensionsSchedule: AnatomyDimensionRow[];
}

export const ANATOMY_PLATES: AnatomyPlateRecord[] = [
  {
    id: 'trellick-tower',
    catalogNumber: 'CAT. 001',
    plateNumber: 'PLATE I',
    title: 'DETACHED SERVICE CORE & SCISSOR MAISONETTE SECTION',
    buildingName: 'Trellick Tower',
    architect: 'Ernő Goldfinger',
    chronology: '1972',
    drawingType: 'Section / Elevation',
    scale: 'SCALE 1:500',
    datumElevation: '0.0 M GRADE — +120.0 M MAST APEX',
    svgPath: '/images/anatomy/trellick-tower.svg',
    whatYouSee:
      'A side cut through the 98.0 m apartment block showing how its detached 120.0 m elevator and boiler tower links to split-level flats via aerial bridges every third floor.',
    description:
      'Orthographic elevation and cross-section of Trellick Tower detailing the 98.0 m residential concrete slab, detached 120.0 m service shaft, cantilevered boiler house, and 3-storey access bridge rhythm.',
    callouts: [
      {
        code: '01',
        label: 'CORRIDOR + SCISSOR DUPLEX',
        value: '3-STOREY MODULE',
        notes: 'Interlocking split-level maisonettes served every third storey from the detached 98.0 m service shaft.',
      },
      {
        code: '02',
        label: 'CANTILEVERED BOILER HOUSE',
        value: '+85.0 M DATUM',
        notes: 'Projecting concrete plant enclosure cantilevered westward at levels 27–29.',
      },
      {
        code: '03',
        label: 'AERIAL ACCESS BRIDGES',
        value: 'EVERY 3RD STOREY',
        notes: 'Enclosed concrete walkways linking shaft to internal deck corridors serving split-level flats.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'MAIN SLAB ELEVATION', metricValue: '98.0 M', structuralRole: '31 storeys cast-in-place shear wall frame' },
      { parameter: 'TOTAL MAST APEX', metricValue: '120.0 M', structuralRole: 'Service shaft telecommunications finial' },
      { parameter: 'ACOUSTIC ISOLATION GAP', metricValue: '4.5 M', structuralRole: 'Structural separation between tower and slab' },
      { parameter: 'CORRIDOR MODULE', metricValue: '8.7 M (3 FLOORS)', structuralRole: 'Scissor-section duplex circulation interval' },
    ],
  },
  {
    id: 'unite-dhabitation',
    catalogNumber: 'CAT. 003',
    plateNumber: 'PLATE II',
    title: 'PILOTIS TRANSFER DECK & INTERLOCKING DUPLEX SECTION',
    buildingName: "Unité d'Habitation",
    architect: 'Le Corbusier',
    chronology: '1952',
    drawingType: 'Section / Elevation',
    scale: 'SCALE 1:250',
    datumElevation: '0.0 M GRADE — +56.0 M ROOF CHIMNEY',
    svgPath: '/images/anatomy/unite-dhabitation.svg',
    whatYouSee:
      'A cross-section of the 18-storey concrete housing block lifted on 7.0 m tapered piers, showing five internal street corridors feeding interlocking two-level apartments.',
    description:
      'Transverse section and seven-bay elevation fragment of Unité d’Habitation showing tapered concrete pilotis, artificial ground transfer slab, interlocking L-section duplex apartments, and roof terrace.',
    callouts: [
      {
        code: '01',
        label: 'TAPERED PILOTIS PIERS',
        value: '7.0 M CLEARANCE',
        notes: 'Paired reinforced concrete piers lifting the 18-storey mass above continuous parkland.',
      },
      {
        code: '02',
        label: 'RUE INTÉRIEURE',
        value: '5 INTERNAL STREETS',
        notes: 'Central double-loaded corridors every three levels feeding interlocking cross-ventilated duplexes.',
      },
      {
        code: '03',
        label: 'BRISE-SOLEIL LOGGIA',
        value: '1.8 M PROJECTION',
        notes: 'Precast béton brut egg-crate frames calibrated to seasonal solar angles.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'TOTAL HEIGHT', metricValue: '56.0 M', structuralRole: '18 residential and communal levels plus roof crown' },
      { parameter: 'TRANSVERSE DEPTH', metricValue: '24.0 M', structuralRole: 'Dual-aspect apartment section across central corridor' },
      { parameter: 'LONGITUDINAL FOOTPRINT', metricValue: '137.0 M', structuralRole: '31 structural bays along north-south axis' },
      { parameter: 'MODULOR CEILING DATUM', metricValue: '2.26 M / 4.80 M', structuralRole: 'Single-height and double-height living volumes' },
    ],
  },
  {
    id: 'habitat-67',
    catalogNumber: 'CAT. 004',
    plateNumber: 'PLATE III',
    title: 'PRECAST MODULAR CANTILEVER & PEDESTRIAN STREET SECTION',
    buildingName: 'Habitat 67',
    architect: 'Moshe Safdie',
    chronology: '1967',
    drawingType: 'Section',
    scale: 'SCALE 1:250',
    datumElevation: '0.0 M PENINSULA — +36.0 M APEX',
    svgPath: '/images/anatomy/habitat-67.svg',
    whatYouSee:
      'A stepped cut through 354 stacked precast concrete boxes up to 36.0 m high, where staggered upper units create private roof terraces and elevated walkways.',
    description:
      'Stepped sectional elevation of Habitat 67 illustrating 354 stacked precast concrete box modules, post-tensioned diagonal load paths, elevated pedestrian streets, and vertical elevator cores.',
    callouts: [
      {
        code: '01',
        label: 'PRECAST CONCRETE MODULE',
        value: '11.7 M × 5.3 M × 3.05 M',
        notes: '85-ton factory-cast boxes bolted, welded, and post-tensioned into a self-supporting lattice.',
      },
      {
        code: '02',
        label: 'STEPPED ROOF TERRACES',
        value: 'OFFSET OVERHANGS',
        notes: 'Upper setbacks turn every lower module roof slab into a private terrace for the residence above.',
      },
      {
        code: '03',
        label: 'ELEVATED PEDESTRIAN STREETS',
        value: 'LEVELS 2, 5, 6, 10',
        notes: 'Continuous horizontal structural beams bridging between vertical service shafts.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'MAXIMUM ELEVATION', metricValue: '36.0 M', structuralRole: '12 stacked modular storeys above peninsula grade' },
      { parameter: 'UNIT MODULE FOOTPRINT', metricValue: '11.7 M × 5.3 M', structuralRole: 'Standardized precast concrete box envelope' },
      { parameter: 'MODULE CLEAR HEIGHT', metricValue: '3.05 M', structuralRole: 'Floor-to-floor structural stacking datum' },
      { parameter: 'TOTAL MODULE COUNT', metricValue: '354 BOXES', structuralRole: 'Post-tensioned compression and shear matrix' },
    ],
  },
  {
    id: 'chartres-cathedral',
    catalogNumber: 'CAT. 010',
    plateNumber: 'PLATE IV',
    title: 'HIGH GOTHIC DOUBLE-TIERED FLYING BUTTRESS SECTION',
    buildingName: 'Chartres Cathedral',
    architect: 'Anonymous Master Masons',
    chronology: '1194–1260',
    drawingType: 'Section',
    scale: 'SCALE 1:250',
    datumElevation: '0.0 M NAVE FLOOR — +49.0 M TIMBER RIDGE',
    svgPath: '/images/anatomy/chartres-cathedral.svg',
    whatYouSee:
      'A half-section across the 37.0 m stone nave vault showing how double-tiered exterior flying buttresses brace the high walls against outward roof and wind thrust.',
    description:
      'Half-section and interior bay elevation of Chartres Cathedral showing the 37.0 m quadripartite nave vault, three-storey wall elevation, and double-tiered radiating flying buttresses.',
    callouts: [
      {
        code: '01',
        label: 'QUADRIPARTITE NAVE VAULT',
        value: '37.0 M CROWN / 16.4 M SPAN',
        notes: 'Pointed stone web ribs concentrating diagonal roof and wind loads onto wall piers.',
      },
      {
        code: '02',
        label: 'RADIATING FLYER ARCADE',
        value: 'DOUBLE-TIERED ARCHES',
        notes: 'Spoke-like limestone colonnettes stiffen lower and upper flying buttress chords.',
      },
      {
        code: '03',
        label: 'THREE-STOREY ELEVATION',
        value: 'ARCADE / TRIFORIUM / CLERESTORY',
        notes: 'Elimination of the gallery allows tall clerestory lancets and rose oculi matching arcade height.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'NAVE VAULT CROWN', metricValue: '37.0 M', structuralRole: 'Limestone quadripartite rib vault apex' },
      { parameter: 'NAVE CLEAR SPAN', metricValue: '16.4 M', structuralRole: 'Central vessel width between arcade piers' },
      { parameter: 'TIMBER ROOF RIDGE', metricValue: '49.0 M', structuralRole: 'Lead-clad roof framing above stone vault' },
      { parameter: 'OVERALL CROSS-SECTION', metricValue: '36.2 M', structuralRole: 'Nave, side aisles, and outer buttress piers' },
    ],
  },
  {
    id: 'sainte-chapelle',
    catalogNumber: 'CAT. 014',
    plateNumber: 'PLATE V',
    title: 'TWO-TIERED PALATINE CHAPEL & PIER BUTTRESS SECTION',
    buildingName: 'Sainte-Chapelle',
    architect: 'Attributed to Pierre de Montreuil',
    chronology: '1248',
    drawingType: 'Section / Elevation',
    scale: 'SCALE 1:200',
    datumElevation: '0.0 M LOWER CHAPEL — +42.5 M GABLE RIDGE',
    svgPath: '/images/anatomy/sainte-chapelle.svg',
    whatYouSee:
      'A cross-section contrasting the low, heavy vaulted lower chapel against the tall 15.0 m stained-glass upper chapel held together by deep outer piers and hidden iron tie chains.',
    description:
      'Transverse section and two-bay elevation of Sainte-Chapelle contrasting the heavy vaulted lower chapel plinth against the 15.0 m stained-glass upper chapel braced by deep pier buttresses and iron tie chains.',
    callouts: [
      {
        code: '01',
        label: 'CONCEALED IRON TIE CHAINS',
        value: 'SPRINGING DATUM',
        notes: 'Wrought-iron tension rods embedded inside masonry courses prevent outward vault spread.',
      },
      {
        code: '02',
        label: 'DEEP EXTERIOR PIER BUTTRESSES',
        value: '3.15 M PROJECTION',
        notes: 'Massive vertical masonry blades replace flying buttresses, weighted by tall stone pinnacles.',
      },
      {
        code: '03',
        label: 'LOWER CHAPEL PLINTH',
        value: '7.6 M VAULT CROWN',
        notes: 'Squat aisle columns and flying-strut ribs form a rigid stone pedestal beneath the upper nave.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'UPPER VAULT CROWN', metricValue: '20.6 M (ABOVE UPPER FLOOR)', structuralRole: 'Pointed Rayonnant rib vault over single vessel' },
      { parameter: 'EXTERIOR GABLE RIDGE', metricValue: '42.5 M', structuralRole: 'Steep lead-sheathed timber roof apex' },
      { parameter: 'LANCET GLASS HEIGHT', metricValue: '15.0 M', structuralRole: 'Continuous bar-tracery glazing bay' },
      { parameter: 'INTERIOR / EXTERIOR WIDTH', metricValue: '10.7 M / 17.0 M', structuralRole: 'Clear span versus deep exterior pier buttresses' },
    ],
  },
  {
    id: 'wells-cathedral',
    catalogNumber: 'CAT. 018',
    plateNumber: 'PLATE VI',
    title: 'CROSSING SCISSOR ARCHES & CHAPTER HOUSE VAULT PLAN',
    buildingName: 'Wells Cathedral',
    architect: 'Anonymous Early Masters; William Joy (scissor arches)',
    chronology: '1176–1348',
    drawingType: 'Plan / Section',
    scale: 'SCALE 1:250',
    datumElevation: '0.0 M CROSSING FLOOR — +55.0 M TOWER PARAPET',
    svgPath: '/images/anatomy/wells-cathedral.svg',
    whatYouSee:
      'A combined cut through the 55.0 m crossing tower showing the 1338–1348 inverted scissor arches wedged between piers, paired with the octagonal Chapter House star vault.',
    description:
      'Cross-section through Wells Cathedral central crossing showing William Joy’s 1338 inverted-arch strainer trusses alongside the reflected tierceron star-rib plan of the octagonal Chapter House.',
    callouts: [
      {
        code: '01',
        label: 'INVERTED SCISSOR STRAINER ARCH',
        value: 'ADDED 1338–1348',
        notes: 'Double opposing stone arches with pierced circular spandrels arrest lateral settlement of crossing piers.',
      },
      {
        code: '02',
        label: 'CENTRAL CROSSING TOWER',
        value: '55.0 M ELEVATION',
        notes: 'Fourteenth-century masonry heightening that induced differential pier subsidence.',
      },
      {
        code: '03',
        label: 'CHAPTER HOUSE STAR VAULT',
        value: '16.0 M OCTAGON / 32 RIBS',
        notes: 'Single central Purbeck-shafted pier supporting 32 radiating tierceron stone ribs.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'CROSSING TOWER PARAPET', metricValue: '55.0 M', structuralRole: 'Masonry tower load transmitted onto four crossing piers' },
      { parameter: 'CROSSING VAULT HEIGHT', metricValue: '20.5 M', structuralRole: 'Early English stone vault above strainer arches' },
      { parameter: 'STRAINER ARCH BAY SPAN', metricValue: '12.0 M', structuralRole: 'Clear width between settled crossing piers' },
      { parameter: 'CHAPTER HOUSE DIAMETER', metricValue: '16.0 M', structuralRole: 'Octagonal vault spanned from central pier' },
    ],
  },
  {
    id: 'pantheon-rome',
    catalogNumber: 'CAT. 023',
    plateNumber: 'PLATE VII',
    title: 'UNREINFORCED CONCRETE ROTUNDA & GRADED DOME SECTION',
    buildingName: 'Pantheon',
    architect: 'Attributed to Apollodorus of Damascus',
    chronology: 'c. 126 CE',
    drawingType: 'Section',
    scale: 'SCALE 1:250',
    datumElevation: '0.0 M PAVEMENT — +43.3 M OCULUS RIM',
    svgPath: '/images/anatomy/pantheon-rome.svg',
    whatYouSee:
      'A lengthwise slice through the 43.3 m unreinforced concrete rotunda showing a dome that forms an exact sphere with the floor, lit from an 8.2 m open oculus ring.',
    description:
      'Longitudinal orthographic section through the Pantheon portico, intermediate block, and 43.3 m unreinforced concrete rotunda inscribed with the 43.3 m sphere geometry and graded aggregate zones.',
    callouts: [
      {
        code: '01',
        label: 'INSCRIBED SPHERE GEOMETRY',
        value: '43.3 M DIA × 43.3 M HEIGHT',
        notes: 'Interior dome hemisphere aligns tangentially with the marble floor datum.',
      },
      {
        code: '02',
        label: 'OCULUS COMPRESSION RING',
        value: '8.2 M DIAMETER',
        notes: 'Unreinforced brick-lined ring converting radial dome thrust into continuous circumferential compression.',
      },
      {
        code: '03',
        label: 'STEPPED EXTERIOR RINGS',
        value: '5 SURCHARGE STEPS',
        notes: 'Concentric exterior concrete steps weight the dome haunches to resist outward bursting.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'ROTUNDA DIAMETER & HEIGHT', metricValue: '43.3 M', structuralRole: 'Largest unreinforced solid concrete dome' },
      { parameter: 'OCULUS APERTURE', metricValue: '8.2 M', structuralRole: 'Open compression ring and zenith daylight shaft' },
      { parameter: 'DRUM WALL THICKNESS', metricValue: '6.4 M', structuralRole: 'Brick-faced pozzolanic concrete cylinder with relieving arches' },
      { parameter: 'COFFER MATRIX', metricValue: '5 RINGS × 28 BAYS (140)', structuralRole: 'Recessed coffers reducing upper shell dead load' },
    ],
  },
  {
    id: 'hagia-sophia',
    catalogNumber: 'CAT. 019',
    plateNumber: 'PLATE VIII',
    title: 'PENDENTIVE DOME & AXIAL HALF-DOME THRUST SECTION',
    buildingName: 'Hagia Sophia',
    architect: 'Isidore of Miletus & Anthemius of Tralles',
    chronology: '537 CE (Rebuilt 562 CE)',
    drawingType: 'Section',
    scale: 'SCALE 1:500',
    datumElevation: '0.0 M NAVE FLOOR — +55.6 M DOME CROWN',
    svgPath: '/images/anatomy/hagia-sophia.svg',
    whatYouSee:
      'An east-west cut through the 55.6 m central dome showing how four curved pendentives and two massive half-domes carry the dome’s weight across a 77.0 m span.',
    description:
      'East-west longitudinal section and schematic square-to-circle key plan of Hagia Sophia detailing the 31.8 m 40-ribbed dome on spherical pendentives braced by colossal eastern and western half-domes.',
    callouts: [
      {
        code: '01',
        label: '40-RIBBED PENDENTIVE DOME',
        value: '31.8 M SPAN / 55.6 M CROWN',
        notes: 'Lightweight brick shell pierced at its base by 40 arched clerestory windows.',
      },
      {
        code: '02',
        label: 'SPHERICAL PENDENTIVES',
        value: 'SQUARE TO CIRCLE',
        notes: 'Four curved triangular masonry vaults resolving circular dome ring onto four ashlar piers.',
      },
      {
        code: '03',
        label: 'AXIAL HALF-DOME CASCADE',
        value: '77.0 M MAIN VAULT AXIS',
        notes: 'East and west semidomes and exedrae channel longitudinal dome thrust down to outer piers.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'CENTRAL DOME CROWN', metricValue: '55.6 M', structuralRole: 'Rebuilt steeper 562 CE ribbed brick shell' },
      { parameter: 'DOME DIAMETER', metricValue: '31.8 M', structuralRole: 'Suspended over central square bay on pendentives' },
      { parameter: 'LONGITUDINAL MAIN SPAN', metricValue: '77.0 M', structuralRole: 'Combined dome, half-domes, and apsidal exedrae' },
      { parameter: 'MAIN ASHLAR PIERS', metricValue: '4 MONOLITHIC MASSES', structuralRole: 'Limestone piers reinforced by north-south buttresses' },
    ],
  },
  {
    id: 'national-assembly-dhaka',
    catalogNumber: 'CAT. 024',
    plateNumber: 'PLATE IX',
    title: 'OCTAGONAL PARLIAMENTARY CITADEL PLAN & ELEVATION',
    buildingName: 'National Assembly Building of Bangladesh',
    architect: 'Louis I. Kahn',
    chronology: '1962–1982',
    drawingType: 'Plan / Section',
    scale: 'SCALE 1:1000 / 1:500',
    datumElevation: '0.0 M LAKE WATERLINE — +47.2 M ASSEMBLY CROWN',
    svgPath: '/images/anatomy/national-assembly-dhaka.svg',
    whatYouSee:
      'A combined plan and lakefront view of the 47.2 m octagonal parliament hall ringed by eight geometric concrete buffer towers with white marble pour-lift bands.',
    description:
      'Dual orthographic plan and waterfront elevation of Jatiya Sangsad Bhaban showing the eight-sided central assembly hall, eight peripheral buffer towers, geometric light cutouts, and inlaid marble lift bands.',
    callouts: [
      {
        code: '01',
        label: 'OCTAGONAL ASSEMBLY CHAMBER',
        value: '47.2 M ELEVATION',
        notes: 'Central parliamentary hall crowned by a parabolic concrete shell illuminated from perimeter clerestories.',
      },
      {
        code: '02',
        label: 'PERIPHERAL BUFFER TOWERS',
        value: '8 GEOMETRIC VOLUMES',
        notes: 'Rotated square, circular, and rectangular towers shield the inner chamber from monsoon sun and rain.',
      },
      {
        code: '03',
        label: 'MARBLE EXPANSION BANDS',
        value: '1.5 M POUR LIFTS',
        notes: 'Horizontal white marble strips set into board-formed concrete serve as drip grooves and datum lines.',
      },
    ],
    dimensionsSchedule: [
      { parameter: 'CENTRAL CHAMBER CROWN', metricValue: '47.2 M', structuralRole: 'Highest monolithic concrete volume above lake' },
      { parameter: 'OUTER SQUARE ENVELOPE', metricValue: '104.0 M × 104.0 M', structuralRole: 'Citadel footprint anchored inside artificial basin' },
      { parameter: 'BUFFER AMBULATORY RING', metricValue: '8 PERIPHERAL TOWERS', structuralRole: 'Thermal and acoustic double-skin enclosure' },
      { parameter: 'FORMWORK DATUM BANDS', metricValue: '150 MM MARBLE INLAYS', structuralRole: 'Expansion joint and pour-lift control lines' },
    ],
  },
];

export const ANATOMY_PLATE_MAP: Record<AnatomyPlateId, AnatomyPlateRecord> =
  ANATOMY_PLATES.reduce(
    (acc, plate) => {
      acc[plate.id] = plate;
      return acc;
    },
    {} as Record<AnatomyPlateId, AnatomyPlateRecord>
  );

export function getAnatomyPlateById(
  id: string
): AnatomyPlateRecord | undefined {
  return ANATOMY_PLATES.find((p) => p.id === id);
}
