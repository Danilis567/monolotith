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
    name: 'SiteHeader — Üst Gezinti Çubuğu',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteHeader.tsx',
    description:
      'MONOLITH logosunu, dizinlenmiş plaka sayacını, ana rota bağlantılarını ve yerel <dialog> mobil çekmece menüsünü barındıran yapışkan monolitik üst çubuk.',
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
        description: 'Üst çubuk telemetri rozetinde gösterilen toplam kataloglanmış yapı sayısı.',
      },
    ],
    usageNote:
      'Yalnızca (site) rota grubu yerleşimi içinde kullanılır. (bare) rotaların içinde kesinlikle render edilmemelidir.',
    a11yNote:
      'aria-label ile nav yer imi, aktif rotalarda aria-current="page" ve odak hapsi (focus-trap) sağlayan yerel <dialog>.showModal() mobil gezintisi kullanır.',
    doExample: '<SiteHeader plateCount={BUILDINGS.length} />',
    dontExample: 'Üst çubuğa ikincil arama alanları veya açılır menüler eklemeyin.',
  },
  {
    id: 'site-footer',
    name: 'SiteFooter — Alt Bilgi ve Künye',
    category: 'Navigation & Chrome',
    sourcePath: 'src/components/SiteFooter.tsx',
    description:
      'Dikey marka işareti, arşiv koordinatları, akım bağlantıları ve başa dönüş kontrolü içeren dört sütunlu brütalist künye ve dizin alt bilgisi.',
    states: ['default', 'hover', 'focus-visible'],
    tokens: [
      '--surface-canvas',
      '--ink-primary',
      '--ink-secondary',
      '--border-structural',
      '--border-hairline',
    ],
    props: [],
    usageNote: '(site) yerleşiminin en altında, <main id="main-content"> etiketinin hemen sonrasında yer alır.',
    a11yNote:
      'Yapılandırılmış <nav aria-label="Footer navigation"> listeleri ve en az 44px tıklama hedefiyle semantik <footer> yer imini kullanır.',
    doExample: '<SiteFooter />',
    dontExample: 'Künye tarih/ölçü verisini çıkarmayın ve 1px yapısal üst çizgiyi değiştirmeyin.',
  },
  {
    id: 'drafting-marks',
    name: 'DraftingMarks (Köşe Artısı, Hizalama Yıldızı, Basamaklı Çerçeve, Ölçek Cetveli)',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/DraftingMarks.tsx',
    description:
      'Hassas mimari kayıt işaretleri: köşe nişangahları, 4 noktalı hizalama yıldızları, basamaklı brütalist çerçeveler ve metrik yükseklik cetvelleri.',
    states: ['default', 'forced-colors'],
    tokens: ['--border-structural', '--border-hairline', '--ink-muted', '--signal-ink'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Konumlandırma veya boyutlandırma için isteğe bağlı CSS sınıfı.',
      },
    ],
    usageNote:
      'Fotoğraf plakalarını ve ortografik sahneleri 12 sütunlu ızgaraya sabitlemek için CornerCrosshair ve SteppedFrame kullanın.',
    a11yNote:
      'Tamamen dekoratif olan SVG işaretleri aria-hidden="true" taşır; böylece ekran okuyucular kayıt çizgilerini atlar.',
    doExample: '<SteppedFrame><Plate /></SteppedFrame>',
    dontExample: 'CornerCrosshair bileşenini yoğun satır içi metinlerin içinde kullanmayın.',
  },
  {
    id: 'arch-clip-defs',
    name: 'ArchClipDefs — Kemer Kesim Tanımları',
    category: 'Drafting & Marks',
    sourcePath: 'src/components/ArchClipDefs.tsx',
    description:
      'Mimari plaka açıklıkları için objectBoundingBox clipPath tanımlarını (#monolith-lancet-3x4, #monolith-lancet-2x3, #monolith-romanesque-3x4) sağlayan global gizli SVG <defs> bileşeni.',
    states: ['mounted-once'],
    tokens: ['--surface-basalt'],
    props: [],
    usageNote:
      'RootLayout içinde bir kez render edilir; böylece uygulamadaki tüm .plate-arch-* öğeleri clip-path: url(#monolith-*) referansını kullanabilir.',
    a11yNote:
      'Yardımcı teknolojilere görünmemesi için aria-hidden="true" ve focusable="false" özelliklerine sahip sıfır boyutlu SVG kullanır.',
    doExample: '<ArchClipDefs /> in RootLayout <body>',
    dontExample: '<ArchClipDefs /> bileşenini tekil sayfa bileşenlerinin içinde çoğaltmayın.',
  },
  {
    id: 'gloss',
    name: 'Gloss — Terim Açıklaması',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/Gloss.tsx',
    description:
      'Monografiden ayrılmadan üzerine gelindiğinde, odaklanıldığında veya tıklandığında kısa teknik tanımlar açan satır içi mimari terim tetikleyicisi.',
    states: ['default', 'hover', 'focus-visible', 'open'],
    tokens: ['--ink-primary', '--surface-elevated', '--border-structural', '--signal-ink'],
    props: [
      {
        name: 'term',
        type: 'string',
        required: true,
        description: 'src/data/glossary.ts içindeki bir kayıtla eşleşen sözlük anahtarı.',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Standart terim etiketini geçersiz kılan isteğe bağlı satır içi metin.',
      },
    ],
    usageNote:
      'Editoryal metinlerde yapısal terimleri (ör. béton brut, uçan payanda, kasetli kubbe) netleştirmek için ölçülü şekilde kullanın.',
    a11yNote:
      'aria-expanded niteliğine ve Escape tuşuyla kapatma desteğine sahip etkileşimli bir düğme olarak uygulanmıştır.',
    doExample: '<Gloss term="beton-brut">béton brut</Gloss>',
    dontExample: 'Tüm cümleleri veya başlıkları <Gloss> içine almayın.',
  },
  {
    id: 'reading-guide',
    name: 'ReadingGuide — Arşiv Okuma Rehberi',
    category: 'Editorial & Typography',
    sourcePath: 'src/components/ReadingGuide.tsx',
    description:
      'KAT. NO., YÜKSEKLİK ve WGS84 koordinatlarını açıklayan, varsayılan olarak kapalı gelen üç satırlık genişletilebilir arşivci okuma rehberi.',
    states: ['collapsed', 'expanded', 'focus-visible'],
    tokens: ['--surface-canvas', '--ink-primary', '--border-structural', '--border-hairline'],
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'İsteğe bağlı konumlandırma sınıfı.',
      },
    ],
    usageNote: 'Giriş etüt şeridinin altına ya da Arşiv / Anatomi üst bantlarının içine yerleştirin.',
    a11yNote: 'Düğme, 3 satırlık rehber bölgesine bağlı aria-expanded ve aria-controls niteliklerini taşır.',
    doExample: '<ReadingGuide />',
    dontExample: 'Aynı görünüm alanında birden fazla ReadingGuide çubuğunu üst üste koymayın.',
  },
  {
    id: 'specimen-stream',
    name: 'SpecimenStream — Örnek Plaka Şeridi',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/SpecimenStream.tsx',
    description:
      'Öne çıkan mimari plakaları katalog numaraları, yükseklik ölçüleri ve doğrudan detay bağlantılarıyla sunan kesintisiz yatay/editoryal örnek şeridi.',
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
        description: 'Şeritte gösterilecek sıralı BuildingRecord öğeleri listesi.',
      },
    ],
    usageNote: 'Ana sayfa monografisinde seçili arşiv plakalarını önizlemek için kullanılır.',
    a11yNote:
      'Her örnek kartı, kesintisiz 2px focus-visible halkası için .plate-interactive-outer sınıfını kullanır.',
    doExample: '<SpecimenStream buildings={streamBuildings} />',
    dontExample: 'Odaklanan bağlantı sarmalayıcılarına doğrudan overflow: hidden uygulamayın.',
  },
  {
    id: 'anatomy-stage',
    name: 'AnatomyStage — Ortografik Anatomi Sahnesi',
    category: 'Interactive Plates & Stage',
    sourcePath: 'src/components/AnatomyStage.tsx',
    description:
      'Katman açma/kapama (strüktür, eksen, ölçüler), kaydırma/yakınlaştırma incelemesi ve klavye erişimli işaretçi pinleri sunan etkileşimli ortografik vektör sahnesi.',
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
        description: 'Sunucuda yüklenen temizlenmiş SVG ortografik plaka kodu.',
      },
      {
        name: 'callouts',
        type: 'AnatomyCallout[]',
        required: true,
        description: 'Normalize edilmiş koordinatlara sahip numaralı yapısal işaretçi pinleri.',
      },
      {
        name: 'dimensions',
        type: 'AnatomyDimensionRow[]',
        required: true,
        description: 'Ölçülmüş metrik boyut satırları.',
      },
      {
        name: 'showStructure',
        type: 'boolean',
        required: true,
        description: 'Ana strüktür vektör katmanının görünürlüğünü açar/kapatır.',
      },
      {
        name: 'showAxis',
        type: 'boolean',
        required: true,
        description: 'Vermilyon itki ve eksen vektör katmanının görünürlüğünü açar/kapatır.',
      },
      {
        name: 'showDimensions',
        type: 'boolean',
        required: true,
        description: 'Metrik ölçü çizgilerinin ve işaretçilerin görünürlüğünü açar/kapatır.',
      },
      {
        name: 'selectedCalloutCode',
        type: 'string | null',
        required: true,
        description: 'Etkin yapısal işaretçi pin kodu.',
      },
      {
        name: 'selectedDimensionId',
        type: 'string | null',
        required: true,
        description: 'Etkin ölçü çizgisi kimliği.',
      },
      {
        name: 'onSelectCallout',
        type: '(code: string | null) => void',
        required: true,
        description: 'Bir işaretçi pini seçildiğinde veya temizlendiğinde çağrılan geri bildirim.',
      },
      {
        name: 'onSelectDimension',
        type: '(id: string | null) => void',
        required: true,
        description: 'Bir ölçü çizgisi seçildiğinde veya temizlendiğinde çağrılan geri bildirim.',
      },
      {
        name: 'isFullscreen',
        type: 'boolean',
        required: true,
        description: 'Genişletilmiş tam ekran teknik çizim paftası modunu kontrol eder.',
      },
      {
        name: 'onToggleFullscreen',
        type: '() => void',
        required: true,
        description: 'Tam ekran teknik çizim paftası modunu açar/kapatır.',
      },
      {
        name: 'plateTitle',
        type: 'string',
        required: true,
        description: 'Sahne araç çubuğunda gösterilen plaka başlığı.',
      },
      {
        name: 'plateScale',
        type: 'string',
        required: true,
        description: 'Çizim ölçeği etiketi (ör. ÖLÇEK 1:500).',
      },
    ],
    usageNote:
      'Katman durumu ve etkin işaretçilerin senkron kalması için her zaman AnatomyClient kontrolleriyle eşleştirin.',
    a11yNote:
      'İşaretçi pinleri, açıklayıcı aria-label ve etkin durum geri bildirimine sahip klavyeyle odaklanabilir düğmelerdir.',
    doExample: '<AnatomyStage svgMarkup={svg} callouts={c} dimensions={d} showStructure={true} />',
    dontExample: 'AnatomyStage içine ölçülmemiş raster görseller yerleştirmeyin.',
  },
  {
    id: 'motion-primitives',
    name: 'MotionPrimitives (MotionProvider, PlateCurtain, HairlineDraw, HeroEchoParallax)',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/MotionPrimitives.tsx',
    description:
      'Plaka perde açılışları, 1px ince çizgi çizimleri ve hafif giriş paralaksı için MotionConfig reducedMotion="user" ile yapılandırılmış GPU hızlandırmalı hareket sarmalayıcıları.',
    states: ['idle', 'in-view', 'reduced-motion'],
    tokens: ['--surface-canvas', '--border-hairline'],
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Hareket primiti tarafından sarmalanan içerik.',
      },
    ],
    usageNote:
      'MotionProvider RootLayout içinde yer alır; mimari giriş sahneleri için PlateCurtain ve HairlineDraw kullanın.',
    a11yNote:
      'MotionConfig reducedMotion="user" ve CSS yedekleri aracılığıyla prefers-reduced-motion: reduce tercihine saygı duyar.',
    doExample: '<PlateCurtain><Plate /></PlateCurtain>',
    dontExample: 'Yerleşim özelliklerini (width/height/top/left) canlandırmayın; yalnızca transform ve opacity kullanın.',
  },
  {
    id: 'url-param-sync',
    name: 'UrlParamSync — URL Parametre Eşitleyici',
    category: 'Motion & Utilities',
    sourcePath: 'src/components/UrlParamSync.tsx',
    description:
      'Arşiv filtresi veya anatomi plaka seçimi durumunu tam sayfa yenilemesi olmadan URL sorgu parametreleriyle eşitleyen görsel olmayan istemci yardımcısı.',
    states: ['synced'],
    tokens: [],
    props: [
      {
        name: 'paramKey',
        type: 'string',
        required: true,
        description: 'Okunacak ve eşitlenecek sorgu parametresi anahtarı.',
      },
      {
        name: 'onRead',
        type: '(value: string | null) => void',
        required: true,
        description: 'Geçerli sorgu parametresi değerini alan geri bildirim işlevi.',
      },
    ],
    usageNote: 'App Router istemci ağaçlarında render edilirken <Suspense> içine alın.',
    a11yNote: 'Görsel olmayan yardımcı bileşendir; DOM düğümü üretmez.',
    doExample: '<Suspense fallback={null}><UrlParamSync ... /></Suspense>',
    dontExample: 'Sıkı render döngüleri içinde history.pushState çağırmayın.',
  },
  {
    id: 'home-client',
    name: 'HomeClient — Ana Sayfa Monografisi',
    category: 'Page Views',
    sourcePath: 'src/components/HomeClient.tsx',
    description:
      'Giriş anıtını, tez plakasını, örnek şeridini ve üçlü akım dizini bantlarını dönüşümlü yüzey adaları boyunca kurgulayan editoryal açılış monografisi.',
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
        description: 'Birincil giriş yapısı (ör. Trellick Tower).',
      },
      {
        name: 'thesisBuilding',
        type: 'BuildingRecord',
        required: true,
        description: 'Editoryal tez plakası.',
      },
      {
        name: 'streamBuildings',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Seçilmiş örnek şerit kayıtları.',
      },
      {
        name: 'brutalistSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Akım cetveli için örneklenen Brütalist yapılar.',
      },
      {
        name: 'gothicSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Akım cetveli için örneklenen Gotik yapılar.',
      },
      {
        name: 'monumentalSample',
        type: 'BuildingRecord[]',
        required: true,
        description: 'Akım cetveli için örneklenen Anıtsal yapılar.',
      },
      {
        name: 'totalCount',
        type: 'number',
        required: true,
        description: 'Toplam dizinlenmiş yapı sayısı.',
      },
    ],
    usageNote: 'src/app/(site)/page.tsx tarafından render edilir.',
    a11yNote: 'Katı h1 -> h2 -> h3 başlık hiyerarşisini ve en az 4.5:1 perde kontrastını korur.',
    doExample: '<HomeClient {...props} />',
    dontExample: 'Yapı sayılarını sabit kodlamayın; totalCount değerini BUILDINGS.length üzerinden geçirin.',
  },
  {
    id: 'archive-client',
    name: 'ArchiveClient — Arşiv Dizini',
    category: 'Page Views',
    sourcePath: 'src/components/ArchiveClient.tsx',
    description:
      'Plaka Izgarası ve Tablo Dizini görünüm modlarının yanı sıra akım, malzeme, dönem ve kıta filtrelerini destekleyen aranabilir, çok boyutlu yapı dizini.',
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
        description: 'Toplam kataloglanmış yapı sayısı.',
      },
    ],
    usageNote: 'src/app/(site)/archive/page.tsx tarafından render edilir.',
    a11yNote:
      'aria-live="polite" sonuç sayacı, açık <label> eşleştirmeleri ve en az 44px filtre yongaları kullanır.',
    doExample: '<ArchiveClient totalCount={BUILDINGS.length} />',
    dontExample: 'Tablo Dizini (Index) görünüm modunu kaldırmayın.',
  },
  {
    id: 'anatomy-client',
    name: 'AnatomyClient — Anatomi Çalışma Alanı',
    category: 'Page Views',
    sourcePath: 'src/components/AnatomyClient.tsx',
    description:
      '9 ortografik SVG plakasını katman kontrolleri, ölçü tabloları ve işaretçi incelemesiyle eşleştiren etkileşimli ölçülü plaka çalışma alanı.',
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
        description: '9 ortografik anatomi plakasının tümüne ait üst veriler.',
      },
      {
        name: 'svgMarkupById',
        type: 'Record<AnatomyPlateId, string>',
        required: true,
        description: 'AnatomyPlateId ile anahtarlanmış sunucu taraflı SVG kodları.',
      },
    ],
    usageNote: 'src/app/(site)/anatomy/page.tsx tarafından render edilir.',
    a11yNote:
      'Ok tuşlarıyla plaka geçişini destekler ve etkin plaka değişikliklerini temiz bir şekilde duyurur.',
    doExample: '<AnatomyClient plates={plates} svgMarkupById={svgMarkupById} />',
    dontExample: 'SVG kodunu istemcide fetch etmeyin; sunucuda önceden yüklenmiş dizeleri geçirin.',
  },
];
