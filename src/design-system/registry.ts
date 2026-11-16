export type ComponentCategory =
  | 'Navigation & Chrome'
  | 'Drafting & Marks'
  | 'Editorial & Typography'
  | 'Interactive Plates & Stage'
  | 'Motion & Utilities'
  | 'Page Views';

export interface ComponentPropSpec {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DesignSystemComponentEntry {
  id: string;
  name: string;
  category: ComponentCategory;
  sourcePath: string;
  description: string;
  states: string[];
  tokens: string[];
  props: ComponentPropSpec[];
  usageNote: string;
  a11yNote: string;
  doExample: string;
  dontExample: string;
}

export const COMPONENT_REGISTRY: DesignSystemComponentEntry[] = [
  {
    id: 'site-header',
    name: 'SiteHeader — Üst Çubuk',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteHeader.tsx',
    description:
      'MONOLITH logosunu, yapı sayacını, sayfa bağlantılarını ve mobil menüyü gösteren üst çubuktur.',
    states: ['default', 'active-route', 'focus-visible', 'mobile-drawer-open'],
    tokens: [
      '--header-height',
      '--surface-canvas',
      '--ink-primary',
      '--ink-muted',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'plateCount',
        type: 'number',
        required: true,
        description: 'Üst çubukta gösterilen toplam yapı sayısı.',
      },
    ],
    usageNote:
      'Yalnızca (site) sayfalarında kullanılır; (bare) sayfalarda kullanılmaz.',
    a11yNote:
      'nav etiketi, aktif sayfada aria-current="page" ve mobil menüde <dialog>.showModal() odak kilidi kullanır.',
    doExample: '<SiteHeader plateCount={BUILDINGS.length} />',
    dontExample: 'Üst çubuğa arama kutusu veya açılır menü ekleme.',
  },
  {
    id: 'site-footer',
    name: 'SiteFooter — Alt Bilgi',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteFooter.tsx',
    description:
      'Yatay kelime işareti (monolith-wordmark-dark.svg), koordinatlar, akım bağlantıları ve başa dönüş düğmesi içeren sayfa alt bilgisidir.',
    states: ['default', 'hover', 'focus-visible'],
    tokens: [
      '--surface-canvas',
      '--ink-primary',
      '--ink-secondary',
      '--border-structural',
      '--border-hairline',
    ],
    props: [],
    usageNote: '(site) düzeninin en altında, <main id="main-content"> sonrasında yer alır.',
    a11yNote:
      '<footer> etiketi içinde <nav aria-label="Footer Directory"> ve en az 44px tıklama alanı kullanır.',
    doExample: '<SiteFooter />',
    dontExample: 'Alt bilgideki tarih verisini veya 1px üst çizgiyi silme.',
  },
  {
    id: 'drafting-marks',
    name: 'DraftingMarks — Çizim İşaretleri',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/DraftingMarks.tsx',
    description:
      'Fotoğraf ve kutu köşelerinde kullanılan artı işareti, yıldız, köşebent ve ölçek cetvelidir.',
    states: ['default', 'forced-colors'],
    tokens: ['--border-structural', '--border-hairline', '--ink-muted', '--signal-ink'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Konum veya boyut için isteğe bağlı CSS sınıfı.',
      },
    ],
    usageNote:
      'Fotoğraf plakalarının köşelerini hizalamak için CornerCrosshair ve SteppedFrame kullanılır.',
    a11yNote:
      'Ekran okuyucuların atlaması için tüm süsleyici SVG işaretlerinde aria-hidden="true" vardır.',
    doExample: '<SteppedFrame><Plate /></SteppedFrame>',
    dontExample: 'CornerCrosshair işaretini paragraf metinlerinin içine koyma.',
  },
  {
    id: 'arch-clip-defs',
    name: 'ArchClipDefs — Kemer Kesim Tanımları',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/ArchClipDefs.tsx',
    description:
      'Fotoğraflara kemer kesimi uygulayan SVG clipPath tanımlarını (#monolith-lancet-3x4, #monolith-lancet-2x3, #monolith-romanesque-3x4) sayfaya ekler.',
    states: ['mounted-once'],
    tokens: ['--surface-basalt'],
    props: [],
    usageNote:
      'RootLayout içinde bir kez eklenir; tüm .plate-arch-* sınıfları buradan beslenir.',
    a11yNote:
      'Ekran okuyuculara gizlemek için aria-hidden="true" ve focusable="false" kullanır.',
    doExample: '<ArchClipDefs /> in RootLayout <body>',
    dontExample: '<ArchClipDefs /> bileşenini alt sayfalarda tekrar ekleme.',
  },
  {
    id: 'gloss',
    name: 'Gloss — Terim Açıklaması',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/Gloss.tsx',
    description:
      'Paragraf içinde geçen teknik terimlerin yanındaki [ ? ] düğmesine tıklandığında kısa tanımını açar.',
    states: ['default', 'hover', 'focus-visible', 'open'],
    tokens: ['--ink-primary', '--surface-elevated', '--border-structural', '--signal-ink'],
    props: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: 'src/data/glossary.ts dosyasındaki terim anahtarı.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Metinde görünecek isteğe bağlı kelime.',
      },
    ],
    usageNote:
      'Metinlerde geçen teknik kelimeleri (ör. béton brut, uçan payanda) açıklamak için kullanılır.',
    a11yNote:
      'aria-expanded niteliğine ve Escape tuşuyla kapatma desteğine sahip bir düğmedir.',
    doExample: '<Gloss term="BÉTON BRUT">béton brut</Gloss>',
    dontExample: 'Tüm cümleyi veya başlığı <Gloss> içine alma.',
  },
  {
    id: 'reading-guide',
    name: 'ReadingGuide — Okuma Rehberi',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/ReadingGuide.tsx',
    description:
      'KAT. NO., YÜKSEKLİK ve WGS84 koordinatlarının ne anlama geldiğini açıklayan açılır kapanır bilgi çubuğudur.',
    states: ['collapsed', 'expanded', 'focus-visible'],
    tokens: ['--surface-canvas', '--ink-primary', '--border-structural', '--border-hairline'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'İsteğe bağlı konum sınıfı.',
      },
    ],
    usageNote: 'Ana sayfa şeridinin altına ya da Arşiv ve Anatomi üst bantlarına konur.',
    a11yNote: 'Düğme, açık/kapalı durumunu aria-expanded ve aria-controls ile bildirir.',
    doExample: '<ReadingGuide />',
    dontExample: 'Aynı ekranda birden fazla ReadingGuide çubuğu kullanma.',
  },
  {
    id: 'specimen-stream',
    name: 'SpecimenStream — Fotoğraf Şeridi',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/SpecimenStream.tsx',
    description:
      'Seçilen yapıları katalog numarası, yükseklik ve detay bağlantısıyla yan yana gösteren fotoğraf şerididir.',
    states: ['default', 'hover', 'focus-visible'],
    tokens: [
      '--surface-basalt',
      '--ink-primary',
      '--ink-secondary',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'buildings',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Şeritte gösterilecek yapı kayıtları.',
      },
    ],
    usageNote: 'Ana sayfada öne çıkan yapı fotoğraflarını göstermek için kullanılır.',
    a11yNote:
      'Her kartta kesintisiz 2px odak halkası için .plate-interactive-outer sınıfı kullanılır.',
    doExample: '<SpecimenStream buildings={streamBuildings} />',
    dontExample: 'Odaklanan bağlantı kutularına overflow: hidden verme.',
  },
  {
    id: 'anatomy-stage',
    name: 'AnatomyStage — Plan Çizim Sahnesi',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/AnatomyStage.tsx',
    description:
      'Katmanları (strüktür, eksen, ölçüler) açıp kapatan, yakınlaştırılabilen etkileşimli plan çizim alanıdır.',
    states: ['default', 'zoomed', 'layer-toggled', 'callout-selected', 'focus-visible'],
    tokens: [
      '--surface-canvas',
      '--surface-elevated',
      '--ink-primary',
      '--border-structural',
      '--signal-ink',
    ],
    props: [
      {
        name: 'svgMarkup',
        type: 'string',
        required: true,
        description: 'Sunucudan gelen SVG plan çizimi.',
      },
      {
        name: 'callouts',
        type: 'AnatomyCallout[]',
        required: true,
        description: 'Plan üzerindeki numaralı işaretçi noktaları.',
      },
      {
        name: 'dimensions',
        type: 'AnatomyDimensionRow[]',
        required: true,
        description: 'Metrik ölçü satırları.',
      },
      {
        name: 'showStructure',
        type: 'boolean',
        required: true,
        description: 'Strüktür katmanını açar veya kapatır.',
      },
      {
        name: 'showAxis',
        type: 'boolean',
        required: true,
        description: 'Eksen katmanını açar veya kapatır.',
      },
      {
        name: 'showDimensions',
        type: 'boolean',
        required: true,
        description: 'Ölçü çizgilerini açar veya kapatır.',
      },
      {
        name: 'selectedCalloutCode',
        type: 'string | null',
        required: true,
        description: 'Seçili işaretçi kodu.',
      },
      {
        name: 'selectedDimensionId',
        type: 'string | null',
        required: true,
        description: 'Seçili ölçü satırı kimliği.',
      },
      {
        name: 'onSelectCallout',
        type: '(code: string | null) => void',
        required: true,
        description: 'İşaretçi seçildiğinde çalışır.',
      },
      {
        name: 'onSelectDimension',
        type: '(id: string | null) => void',
        required: true,
        description: 'Ölçü satırı seçildiğinde çalışır.',
      },
      {
        name: 'isFullscreen',
        type: 'boolean',
        required: true,
        description: 'Tam ekran modunu belirler.',
      },
      {
        name: 'onToggleFullscreen',
        type: '() => void',
        required: true,
        description: 'Tam ekran modunu açar veya kapatır.',
      },
      {
        name: 'plateTitle',
        type: 'string',
        required: true,
        description: 'Araç çubuğunda görünen çizim başlığı.',
      },
      {
        name: 'plateScale',
        type: 'string',
        required: true,
        description: 'Çizim ölçeği etiketi (ör. ÖLÇEK 1:500).',
      },
    ],
    usageNote:
      'Anatomi sayfasında AnatomyClient kontrolleriyle birlikte kullanılır.',
    a11yNote:
      'İşaretçi noktaları klavye ile odaklanabilen ve aria-label taşıyan düğmelerdir.',
    doExample: '<AnatomyStage svgMarkup={svg} callouts={c} dimensions={d} showStructure={true} />',
    dontExample: 'AnatomyStage içine düz fotoğraf dosyası koyma.',
  },
  {
    id: 'motion-primitives',
    name: 'MotionPrimitives — Animasyon Bileşenleri',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/MotionPrimitives.tsx',
    description:
      'Animasyonlar için reducedMotion="user" destekli MotionProvider sarmalayıcısı; PlateCurtain düz <div>, HairlineDraw statik <span> döndürür, kaydırma paralaksı ise HeroEchoParallax bileşeninde yer alır.',
    states: ['idle', 'in-view', 'reduced-motion'],
    tokens: ['--surface-canvas', '--border-hairline'],
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Animasyon uygulanacak içerik.',
      },
    ],
    usageNote:
      'MotionProvider RootLayout içinde yer alır; kaydırma paralaksı için HeroEchoParallax, sarmalayıcı olarak PlateCurtain ve HairlineDraw kullanılır.',
    a11yNote:
      'prefers-reduced-motion: reduce açıkken animasyonları kapatır.',
    doExample: '<PlateCurtain><Plate /></PlateCurtain>',
    dontExample: 'width, height, top veya left özelliklerini canlandırma; yalnızca transform ve opacity kullan.',
  },
  {
    id: 'url-param-sync',
    name: 'UrlParamSync — URL Parametre Eşitleyici',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/UrlParamSync.tsx',
    description:
      'Filtre ve seçim durumunu sayfa yenilemeden URL sorgu parametreleriyle eşitleyen yardımcı bileşendir.',
    states: ['synced'],
    tokens: [],
    props: [
      {
        name: 'paramKey',
        type: 'string',
        required: true,
        description: 'Okunacak sorgu parametresi adı.',
      },
      {
        name: 'onRead',
        type: '(value: string | null) => void',
        required: true,
        description: 'Parametre değerini alan işlev.',
      },
    ],
    usageNote: 'İstemci bileşenlerinde <Suspense> içinde kullanılır.',
    a11yNote: 'Görsel öğe değildir; ekranda yer kaplamaz.',
    doExample: '<Suspense fallback={null}><UrlParamSync ... /></Suspense>',
    dontExample: 'Render döngüsü içinde history.pushState çağırma.',
  },
  {
    id: 'home-client',
    name: 'HomeClient — Ana Sayfa',
    category: 'Page Views',
    sourcePath: 'src/components/HomeClient.tsx',
    description:
      'Giriş fotoğrafını, örnek şeridini ve üç akım bandını farklı zemin renkleriyle gösteren ana sayfa bileşenidir.',
    states: ['default', 'reduced-motion'],
    tokens: [
      '--surface-canvas',
      '--surface-basalt',
      '--ink-primary',
      '--signal-ink',
      '--type-monolith-size',
    ],
    props: [
      {
        name: 'heroBuilding',
        type: 'BuildingRecord',
        required: true,
        description: 'Giriş bölümündeki ana yapı.',
      },
      {
        name: 'thesisBuilding',
        type: 'BuildingRecord',
        required: true,
        description: 'İkinci bölümdeki örnek yapı.',
      },
      {
        name: 'streamBuildings',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Yatay şeritteki yapılar.',
      },
      {
        name: 'brutalistSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Brütalist akımından seçilen yapılar.',
      },
      {
        name: 'gothicSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Gotik akımından seçilen yapılar.',
      },
      {
        name: 'monumentalSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Anıtsal akımından seçilen yapılar.',
      },
      {
        name: 'totalCount',
        type: 'number',
        required: true,
        description: 'Toplam yapı sayısı.',
      },
    ],
    usageNote: 'src/app/(site)/page.tsx tarafından kullanılır.',
    a11yNote: 'h1 -> h2 -> h3 başlık sırasını ve en az 4.5:1 kontrast oranını korur.',
    doExample: '<HomeClient {...props} />',
    dontExample: 'Yapı sayısını elle yazma; BUILDINGS.length üzerinden totalCount gönder.',
  },
  {
    id: 'archive-client',
    name: 'ArchiveClient — Arşiv Sayfası',
    category: 'Page Views',
    sourcePath: 'src/components/ArchiveClient.tsx',
    description:
      'Yapıları PLAKA ve DİZİN görünümünde listeleyen, arama ve filtreleme sunan arşiv sayfası bileşenidir.',
    states: ['plate-view', 'index-view', 'filtered', 'empty-results'],
    tokens: [
      '--surface-canvas',
      '--surface-elevated',
      '--ink-primary',
      '--border-hairline',
      '--signal-ink',
    ],
    props: [
      {
        name: 'totalCount',
        type: 'number',
        required: true,
        description: 'Katalogdaki toplam yapı sayısı.',
      },
    ],
    usageNote: 'src/app/(site)/archive/page.tsx tarafından kullanılır.',
    a11yNote:
      'aria-live="polite" sonuç sayacı, <label> etiketleri ve en az 44px filtre düğmeleri kullanır.',
    doExample: '<ArchiveClient totalCount={BUILDINGS.length} />',
    dontExample: 'DİZİN tablo görünümünü kaldırma.',
  },
  {
    id: 'anatomy-client',
    name: 'AnatomyClient — Anatomi Sayfası',
    category: 'Page Views',
    sourcePath: 'src/components/AnatomyClient.tsx',
    description:
      '9 plan çizimini katman düğmeleri, ölçü tabloları ve işaretçi açıklamalarıyla birlikte gösteren sayfa bileşenidir.',
    states: ['default', 'plate-switched', 'layer-toggled', 'callout-focused'],
    tokens: [
      '--surface-canvas',
      '--surface-basalt',
      '--ink-primary',
      '--border-structural',
      '--signal-ink',
    ],
    props: [
      {
        name: 'plates',
        type: 'PlateMetaItem[]',
        required: true,
        description: '9 plan çiziminin üst verileri.',
      },
      {
        name: 'svgMarkupById',
        type: 'Record<AnatomyPlateId, string>',
        required: true,
        description: 'Sunucudan gelen SVG çizim kodları.',
      },
    ],
    usageNote: 'src/app/(site)/anatomy/page.tsx tarafından kullanılır.',
    a11yNote:
      'Ok tuşlarıyla çizimler arasında geçiş yapmayı destekler.',
    doExample: '<AnatomyClient plates={plates} svgMarkupById={svgMarkupById} />',
    dontExample: 'SVG kodunu tarayıcıda fetch etme; sunucudan hazır gönder.',
  },
];
