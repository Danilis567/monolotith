'use client';

import { AlignmentStar, CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import type { SurfaceIslandId } from '@/design-system/tokens';
import styles from './BrandSection.module.css';

interface LogoAsset {
  id: string;
  name: string;
  src: string;
  dimensions: string;
  surfaceRule: string;
  role: string;
  backing: 'dark' | 'light' | 'plate';
  exactPx?: number;
}

interface LogoGroup {
  id: string;
  title: string;
  columns: 2 | 3;
  wideStage?: boolean;
  items: LogoAsset[];
}

const LOGO_GROUPS: LogoGroup[] = [
  {
    id: 'wordmark',
    title: 'ANA KELİME İŞARETİ (WORDMARK)',
    columns: 3,
    items: [
      {
        id: 'wordmark-dark',
        name: 'KELİME İŞARETİ // KOYU ZEMİN',
        src: '/brand/monolith-wordmark-dark.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#201F1E)',
        role: 'Koyu yüzeyler için birincil yatay başlık plakası.',
        backing: 'dark',
      },
      {
        id: 'wordmark-light',
        name: 'KELİME İŞARETİ // AÇIK ZEMİN',
        src: '/brand/monolith-wordmark-light.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#D9D4CC)',
        role: 'Açık yüzeyler için birincil yatay başlık plakası.',
        backing: 'light',
      },
      {
        id: 'wordmark-mono',
        name: 'KELİME İŞARETİ // TEK RENK',
        src: '/brand/monolith-wordmark-mono.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tek mürekkepli baskı, şablon ve CSS maskeli plakalar.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'stacked',
    title: 'YAYILI / DİKEY KELİME İŞARETİ',
    columns: 2,
    wideStage: true,
    items: [
      {
        id: 'stacked-dark',
        name: 'YAYILI ARŞİV // KOYU ZEMİN',
        src: '/brand/monolith-stacked-dark.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#201F1E)',
        role: 'Dikey kapak plakası ve monografi sırt kilidi.',
        backing: 'dark',
      },
      {
        id: 'stacked-light',
        name: 'YAYILI ARŞİV // AÇIK ZEMİN',
        src: '/brand/monolith-stacked-light.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#D9D4CC)',
        role: 'Mineral kağıt zeminler üzerinde dikey kapak plakası.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'monogram',
    title: 'MONOGRAM ("M")',
    columns: 3,
    items: [
      {
        id: 'monogram-dark',
        name: 'MONOGRAM // KOYU ZEMİN',
        src: '/brand/monolith-monogram-dark.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#201F1E)',
        role: 'Kompakt üst bilgiler için kare mimari mühür.',
        backing: 'dark',
      },
      {
        id: 'monogram-light',
        name: 'MONOGRAM // AÇIK ZEMİN',
        src: '/brand/monolith-monogram-light.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#D9D4CC)',
        role: 'Açık yüzeyler üzerinde kare mimari mühür.',
        backing: 'light',
      },
      {
        id: 'monogram-mono',
        name: 'MONOGRAM // TEK RENK',
        src: '/brand/monolith-monogram-mono.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tek mürekkepli damga ve satır içi vektör amblemi.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'lockups',
    title: 'ÜST GEZİNTİ VE ALT BİLGİ KİLİTLERİ',
    columns: 3,
    items: [
      {
        id: 'nav-dark',
        name: 'ÜST GEZİNTİ KİLİDİ // KOYU ZEMİN',
        src: '/brand/nav-lockup.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'BOŞLUK / BAZALT ÜST ÇUBUĞU',
        role: 'Dikey ayırıcı çizgili üst gezinme çubuğu işareti.',
        backing: 'dark',
      },
      {
        id: 'nav-light',
        name: 'ÜST GEZİNTİ KİLİDİ // AÇIK ZEMİN',
        src: '/brand/nav-lockup-light.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'SIVA / KİREÇTAŞI ÜST ÇUBUĞU',
        role: 'Açık yüzeyler için üst gezinme çubuğu işareti.',
        backing: 'light',
      },
      {
        id: 'nav-mono',
        name: 'ÜST GEZİNTİ KİLİDİ // TEK RENK',
        src: '/brand/nav-lockup-mono.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Özel temalar için uyarlanabilir gezinme kilidi.',
        backing: 'light',
      },
      {
        id: 'footer-dark',
        name: 'ALT BİLGİ KİLİDİ // KOYU ZEMİN',
        src: '/brand/footer-lockup.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'BOŞLUK / BAZALT ALT BİLGİ PLAKASI',
        role: 'Tam genişlikte anıtsal arşiv alt bilgi başlığı.',
        backing: 'dark',
      },
      {
        id: 'footer-light',
        name: 'ALT BİLGİ KİLİDİ // AÇIK ZEMİN',
        src: '/brand/footer-lockup-light.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI ALT BİLGİ',
        role: 'Açık zemin üzerinde anıtsal alt bilgi başlığı.',
        backing: 'light',
      },
      {
        id: 'footer-mono',
        name: 'ALT BİLGİ KİLİDİ // TEK RENK',
        src: '/brand/footer-lockup-mono.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tek mürekkepli anıtsal alt bilgi başlığı.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'loader-favicons',
    title: 'YÜKLEME İŞARETİ VE FAVICON PLAKALARI',
    columns: 3,
    items: [
      {
        id: 'loader-dark',
        name: 'YÜKLEME İŞARETİ // KOYU ZEMİN',
        src: '/brand/loader-mark.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'BOŞLUK / BAZALT PERDE',
        role: 'Geometrik şakul hattı ve sivri kemer açılış işareti.',
        backing: 'dark',
      },
      {
        id: 'loader-light',
        name: 'YÜKLEME İŞARETİ // AÇIK ZEMİN',
        src: '/brand/loader-mark-light.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI PERDE',
        role: 'Açık zemin için geometrik açılış işareti.',
        backing: 'light',
      },
      {
        id: 'loader-mono',
        name: 'YÜKLEME İŞARETİ // TEK RENK',
        src: '/brand/loader-mark-mono.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Vektör kontur açılış işareti.',
        backing: 'light',
      },
      {
        id: 'favicon-16',
        name: 'FAVICON // 16 PX',
        src: '/brand/favicon-16.svg',
        dimensions: '16 × 16 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Tarayıcı sekmesi için asgari boyutta net raster/SVG simgesi.',
        backing: 'plate',
        exactPx: 16,
      },
      {
        id: 'favicon-32',
        name: 'FAVICON // 32 PX',
        src: '/brand/favicon-32.svg',
        dimensions: '32 × 32 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Standart masaüstü yer imi ve sekme simgesi.',
        backing: 'plate',
        exactPx: 32,
      },
      {
        id: 'favicon-48',
        name: 'FAVICON // 48 PX',
        src: '/brand/favicon-48.svg',
        dimensions: '48 × 48 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Yüksek DPI kısayol ve görev değiştirici simgesi.',
        backing: 'plate',
        exactPx: 48,
      },
      {
        id: 'apple-touch',
        name: 'APPLE TOUCH SİMGESİ',
        src: '/brand/apple-touch-icon.svg',
        dimensions: '180 × 180 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'iOS / iPadOS ana ekran yer imi plakası.',
        backing: 'plate',
      },
      {
        id: 'maskable-icon',
        name: 'MASKELENEBİLİR PWA SİMGESİ',
        src: '/brand/maskable-icon.svg',
        dimensions: '512 × 512 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (GÜVENLİ ALAN)',
        role: 'Android / PWA uyarlanabilir maskelenebilir uygulama simgesi.',
        backing: 'plate',
      },
    ],
  },
];

interface VoicePair {
  id: string;
  context: string;
  write: string;
  writeNote: string;
  avoid: string;
  avoidNote: string;
}

const VOICE_COMPARISONS: VoicePair[] = [
  {
    id: 'collection-summary',
    context: 'ARŞİV GENEL BAKIŞI',
    write: 'Brüt beton ve yontma taştan yirmi yedi taşıyıcı yapı.',
    writeNote: 'Kesin sayı, yapısal rol, tam malzeme tanımı. Sıfır sıfat.',
    avoid: 'Nefes kesici, ikonik koleksiyonumuzu keşfedin! ✨',
    avoidNote: 'Ünlem işareti, emoji, öznel abartı ("nefes kesici", "ikonik").',
  },
  {
    id: 'specimen-note',
    context: 'ÖRNEK KAYIT // CAT. 004',
    write: 'Yerinde dökülmüş konsol döşeme; sıvasız bırakılmış ahşap kalıp izli alt yüzey.',
    writeNote: 'Bildirimsel yapım tekniği ve gözlemlenebilir yüzey bitişi.',
    avoid: 'Brütalist mimari ustalığın kusursuz ve hayranlık uyandıran bir nişanesi.',
    avoidNote: 'Yapay zeka dolgu isimleri ("nişanesi") ve yasaklı övgü sıfatları ("kusursuz", "hayranlık uyandıran").',
  },
  {
    id: 'survey-status',
    context: 'SİSTEM VE ENVANTER DURUMU',
    write: 'ENVANTER FOLYOSU IV — 27 KAYIT DİZİNLENDİ.',
    writeNote: 'Kuru arşiv sicili dili. Nokta ile biten beyan.',
    avoid: 'Mimari hikaye anlatıcılığının geleceğine hoş geldiniz!',
    avoidNote: 'Tanıtım odaklı SaaS çerçevesi ve ünlem noktalama işareti.',
  },
];

interface FormatSpec {
  id: string;
  label: string;
  sample: string;
  rule: string;
}

const ARCHIVAL_FORMATS: FormatSpec[] = [
  {
    id: 'catalog-id',
    label: 'KATALOG KİMLİĞİ',
    sample: 'CAT. 001',
    rule: 'CAT. 001 ile CAT. 027 arasında sıfır dolgulu 3 haneli dizin. Her zaman büyük harf, nokta ve tek boşluk ile.',
  },
  {
    id: 'date',
    label: 'ENVANTER TARİHİ',
    sample: '16 / 11 / 2026',
    rule: 'Boşluklu eğik çizgi ile ayrılmış GG / AA / YYYY biçimi. Tablo rakamları (tabular numerals) zorunludur.',
  },
  {
    id: 'metric-height',
    label: 'METRİK BİRİMLER',
    sample: '98.0 M',
    rule: 'Büyük M birimiyle tek ondalık basamak (ör. 98.0 M, 55.6 M). Asla küçük m kullanılmaz.',
  },
  {
    id: 'coordinates',
    label: 'KOORDİNATLAR',
    sample: '51°31′25″N × 0°12′20″W',
    rule: 'Çarpma işareti (×) ile ayrılmış derece, dakika (′) ve saniye (″) gösterimi.',
  },
  {
    id: 'two-tier-label',
    label: 'İKİ KADEMELİ SADE ETİKET',
    sample: 'COORDINATES: GPS (WGS84)',
    rule: 'Önce sade dilde kategori adı, ardından parantez içinde teknik veri.',
  },
];

interface GlyphSpec {
  glyph: string;
  code: string;
  role: string;
}

const PERMITTED_GLYPHS: GlyphSpec[] = [
  { glyph: '+', code: 'U+002B', role: 'Genişlet / Veri Artısı' },
  { glyph: '×', code: 'U+00D7', role: 'Koordinat Ayırıcı / Kapat' },
  { glyph: '→', code: 'U+2192', role: 'İleri Gezinme' },
  { glyph: '←', code: 'U+2190', role: 'Geri Dön / Önceki Kayıt' },
  { glyph: '↗', code: 'U+2197', role: 'Dış Referans' },
  { glyph: '↙', code: 'U+2199', role: 'İçe Aktarım / Çapa Düşüşü' },
  { glyph: '•', code: 'U+2022', role: 'Satır İçi Sicil Ayırıcı' },
  { glyph: '✦', code: 'U+2726', role: 'Edisyon / Künye Yıldızı' },
  { glyph: '▪', code: 'U+25AA', role: 'Sinyal / Etkin Dizin' },
];

export function BrandSection({
  previewSurface,
}: {
  previewSurface: SurfaceIslandId;
  onCopy: (value: string, label?: string) => void;
}) {
  return (
    <div data-surface={previewSurface} className={styles.root}>
      {/* =====================================================================
          02.1 LOGO VE MARKA İŞARETLERİ
          ===================================================================== */}
      <section aria-labelledby="brand-logo-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.1 // LOGO VE MARKA İŞARETLERİ</span>
            <h3 id="brand-logo-heading" className={`type-subhead ${styles.subTitle}`}>
              İŞARETLER, KİLİTLER VE FAVICON PLAKALARI
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            <code>/brand/</code> dizininden sunulan yirmi iki kanonik vektör varlığının tamamı. Her
            örnek, çizgi okunaklılığını korumak için zorunlu kontrast zemini üzerine yerleştirilmiştir.
          </p>
        </div>

        {LOGO_GROUPS.map((group) => (
          <div key={group.id} className={styles.groupBlock}>
            <div className={styles.groupHeader}>
              <span className={`type-ui-label ${styles.groupTitle}`}>{group.title}</span>
              <span className={`type-colophon ${styles.groupCount}`}>
                {group.items.length} VARLIK
              </span>
            </div>

            <div
              className={`${styles.logoGrid} ${
                group.columns === 3 ? styles.logoGridThree : ''
              }`}
            >
              {group.items.map((asset) => {
                const backingClass =
                  asset.backing === 'dark'
                    ? styles.stageDark
                    : asset.backing === 'light'
                      ? styles.stageLight
                      : styles.stagePlate;

                return (
                  <article key={asset.id} className={styles.logoCard}>
                    <div
                      className={`${styles.logoStage} ${
                        group.wideStage ? styles.logoStageWide : ''
                      } ${backingClass}`}
                    >
                      <img
                        src={asset.src}
                        alt={`${asset.name} (${asset.dimensions})`}
                        width={asset.exactPx}
                        height={asset.exactPx}
                        className={`${styles.logoImg} ${
                          asset.exactPx ? styles.logoImgExact : ''
                        }`}
                      />
                    </div>

                    <div className={styles.logoMeta}>
                      <div className={styles.logoNameRow}>
                        <span className={`type-ui-label ${styles.logoName}`}>{asset.name}</span>
                        <span className={`type-colophon tabular-nums ${styles.logoDim}`}>
                          {asset.dimensions}
                        </span>
                      </div>
                      <dl className={styles.logoSpecList}>
                        <div className={styles.logoSpecRow}>
                          <dt className={`type-colophon ${styles.logoSpecKey}`}>YÜZEY:</dt>
                          <dd className={`type-colophon ${styles.logoSpecVal}`}>
                            {asset.surfaceRule}
                          </dd>
                        </div>
                        <div className={styles.logoSpecRow}>
                          <dt className={`type-colophon ${styles.logoSpecKey}`}>ROL:</dt>
                          <dd className={`type-body ${styles.logoSpecVal}`}>{asset.role}</dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        {/* Güvenli Alan, Asgari Boyut ve Görsel Kötüye Kullanım Örnekleri */}
        <div className={styles.rulesSplit}>
          <div className={styles.clearspacePanel}>
            <div className={styles.panelHead}>
              <span className="type-ui-label">GÜVENLİ ALAN VE ASGARİ BOYUT</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                1× M-GÖVDE ÇEVRESİ
              </span>
            </div>

            <div className={styles.clearspaceDiagram}>
              <div className={styles.clearspaceBox}>
                <span className={`type-colophon ${styles.clearspaceTagTop}`}>1× M-GÖVDE</span>
                <span className={`type-colophon ${styles.clearspaceTagBottom}`}>1× M-GÖVDE</span>
                <span className={`type-colophon ${styles.clearspaceTagLeft}`}>1×</span>
                <span className={`type-colophon ${styles.clearspaceTagRight}`}>1×</span>
                <div className={styles.clearspaceInner}>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="MONOLITH kelime işareti güvenli alan diyagramı"
                    width={165}
                    height={40}
                  />
                </div>
              </div>
            </div>

            <div className={styles.minSizeGrid}>
              <div className={styles.minSizeCard}>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  KELİME İŞARETİ ASGARİ GENİŞLİK
                </span>
                <div className={styles.minSizePreview}>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="110px asgari genişlikte kelime işareti"
                    width={110}
                    height={27}
                  />
                  <span className="type-colophon tabular-nums" style={{ color: '#e9e5df' }}>
                    110 PX
                  </span>
                </div>
              </div>

              <div className={styles.minSizeCard}>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  FAVICON ASGARİ BOYUTU
                </span>
                <div className={styles.minSizePreview}>
                  <img
                    src="/brand/favicon-16.svg"
                    alt="16px asgari boyutta favicon"
                    width={16}
                    height={16}
                  />
                  <span className="type-colophon tabular-nums" style={{ color: '#e9e5df' }}>
                    16 × 16 PX
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dontPanel}>
            <div className={styles.panelHead}>
              <span className="type-ui-label">YASAKLI İŞARET UYGULAMALARI</span>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                ✕ İHLAL ETMEYİN
              </span>
            </div>

            <div className={styles.dontGrid}>
              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ YASAKLI</span>
                  <img
                    src="/brand/monolith-wordmark-dark.svg"
                    alt="Yasaklı esnetilmiş en-boy oranı"
                    width={132}
                    height={32}
                    className={styles.dontStretch}
                  />
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ ESNETİLMİŞ ORAN</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    Yatay veya dikey oranları asla bozmayın. Tüm kapsayıcılarda en-boy oranını
                    kilitleyin.
                  </p>
                </div>
              </article>

              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ YASAKLI</span>
                  <svg
                    viewBox="0 0 180 44"
                    width="160"
                    height="40"
                    role="img"
                    aria-label="Yasaklı yetkisiz neon mavi yeniden renklendirme"
                  >
                    <text
                      x="90"
                      y="29"
                      textAnchor="middle"
                      fill="#00A8FF"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      fontSize="20"
                      letterSpacing="5"
                    >
                      MONOLITH
                    </text>
                  </svg>
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ NEON / MAVİ RENKLENDİRME</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    İşaretleri asla beton mürekkep sicili (#E9E5DF, #131313 veya currentColor)
                    dışında renklendirmeyin.
                  </p>
                </div>
              </article>

              <article className={styles.dontCard}>
                <div className={styles.dontStage}>
                  <span className={`type-colophon ${styles.dontBadge}`}>✕ YASAKLI</span>
                  <svg
                    viewBox="0 0 180 48"
                    width="160"
                    height="44"
                    role="img"
                    aria-label="Yasaklı yumuşak alt gölge"
                  >
                    <defs>
                      <filter id="brand-prohibited-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#F45D4D" floodOpacity="0.85" />
                      </filter>
                    </defs>
                    <text
                      x="90"
                      y="30"
                      textAnchor="middle"
                      fill="#E9E5DF"
                      filter="url(#brand-prohibited-shadow)"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      fontSize="20"
                      letterSpacing="5"
                    >
                      MONOLITH
                    </text>
                  </svg>
                </div>
                <div className={styles.dontBody}>
                  <span className={`type-ui-label ${styles.dontTitle}`}>✕ YUMUŞAK ALT GÖLGE</span>
                  <p className={`type-body ${styles.dontDesc}`}>
                    Yükseklik bulanıklığı, parlama veya alt gölge kesinlikle yasaktır. Derinlik
                    atmosferik değil, yapısaldır.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02.2 MARKA SESİ VE TON ("Özlü Arşivci")
          ===================================================================== */}
      <section aria-labelledby="brand-voice-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.2 // MARKA SESİ VE TON</span>
            <h3 id="brand-voice-heading" className={`type-subhead ${styles.subTitle}`}>
              ÖZLÜ ARŞİVCİ / THE LACONIC ARCHIVIST
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Editoryal metinler bir mimari envanter sicili gibi okunur: olgusal, kuru ve bildirimsel.
            İkna çabası olmadan yapıyı, malzemeyi ve veriyi tanımlayın.
          </p>
        </div>

        <div className={styles.voiceGrid}>
          {VOICE_COMPARISONS.map((pair) => (
            <div key={pair.id} className={styles.voicePair}>
              <div className={styles.voiceWrite}>
                <span className={`type-colophon ${styles.voiceTagWrite}`}>
                  YAZ (ÖZLÜ ARŞİVCİ) — {pair.context}
                </span>
                <p className={`type-body-lead ${styles.voiceQuote}`}>{pair.write}</p>
                <p className={`type-colophon ${styles.voiceNote}`}>{pair.writeNote}</p>
              </div>

              <div className={styles.voiceAvoid}>
                <span className={`type-colophon ${styles.voiceTagAvoid}`}>
                  YAZMA (SAAS / YAPAY ZEKA DOLGUSU)
                </span>
                <p className={`type-body-lead ${styles.voiceQuoteStrike}`}>{pair.avoid}</p>
                <p className={`type-colophon ${styles.voiceNote}`}>{pair.avoidNote}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.voiceRulesBar}>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">ÜNLEM İŞARETİ YOK</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Cümleleri yalnızca nokta ile sonlandırın.
            </span>
          </div>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">EMOJİ VEYA SÜSLEME YOK</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Başlıklarda, düğmelerde veya düz metinde sıfır piktograf.
            </span>
          </div>
          <div className={styles.voiceRuleCell}>
            <span className="type-ui-label">DOLGU SIFATLAR YOK</span>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              Yasaklılar: tapestry, testament, awe-inspiring, seamless (ve Türkçe karşılıkları).
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02.3 ARŞİV FORMATLARI
          ===================================================================== */}
      <section aria-labelledby="brand-formats-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.3 // ARŞİV FORMATLARI</span>
            <h3 id="brand-formats-heading" className={`type-subhead ${styles.subTitle}`}>
              KANONİK GÖSTERİM VE BİRİMLER
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Kanonik arşiv dize şablonları. Tüm sayısal okumalar tablo hizalı rakamları (tabular
            lining numerals) zorunlu kılar.
          </p>
        </div>

        <div className={styles.formatTable}>
          {ARCHIVAL_FORMATS.map((fmt) => (
            <div key={fmt.id} className={styles.formatRow}>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {fmt.label}
              </span>
              <code className={`type-subhead ${styles.formatSample}`}>{fmt.sample}</code>
              <p className={`type-body ${styles.formatRule}`}>{fmt.rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          02.4 İKONOGRAFİ VE ÇİZİM İŞARETLERİ
          ===================================================================== */}
      <section aria-labelledby="brand-iconography-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.4 // İKONOGRAFİ VE ÇİZİM İŞARETLERİ</span>
            <h3 id="brand-iconography-heading" className={`type-subhead ${styles.subTitle}`}>
              TİPOGRAFİK GLİFLER VE TEKNİK ÇİZİM İŞARETLERİ
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            MONOLITH sıfır üçüncü taraf simge kütüphanesi ve sıfır emoji kullanır. Arayüzde yalnızca
            izin verilen dokuz tipografik glif ve üç geometrik teknik çizim SVG&apos;si yer alabilir.
          </p>
        </div>

        <div className={styles.iconographyGrid}>
          <div className={styles.glyphGrid}>
            {PERMITTED_GLYPHS.map((item) => (
              <div key={item.code} className={styles.glyphCell}>
                <div className={styles.glyphStage}>
                  <span className={styles.glyphChar} aria-hidden="true">
                    {item.glyph}
                  </span>
                  <span className={`type-colophon ${styles.glyphRole}`}>{item.role}</span>
                </div>
                <div className={`type-colophon ${styles.glyphCopyBtn}`}>
                  <span>{item.code}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.draftingMarksList}>
            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <CornerCrosshair />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">CornerCrosshair</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  13 × 13 PX // 1PX KONTUR
                </span>
                <span className="type-body">
                  Çerçeve köşelerine sabitlenen çevre hizalama nişangahı.
                </span>
              </div>
            </div>

            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <AlignmentStar />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">AlignmentStar</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  15 × 15 PX // 1PX KONTUR
                </span>
                <span className="type-body">
                  Künye ayırıcıları için içbükey 4 uçlu haritacı hizalama yıldızı.
                </span>
              </div>
            </div>

            <div className={styles.draftingCard}>
              <div className={styles.draftingStage}>
                <SteppedFrame />
              </div>
              <div className={styles.draftingInfo}>
                <span className="type-ui-label">SteppedFrame</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  AKIŞKAN // ÖLÇEKLENMEYEN KONTUR
                </span>
                <span className="type-body">
                  Örnek plakaların içine yerleştirilen gönyeli L-biçimli teknik çizim köşebentleri.
                </span>
              </div>
            </div>

            <div className={styles.iconBanBanner}>
              <span className="type-ui-label">
                KESİN KURAL: SIFIR ÜÇÜNCÜ TARAF SİMGE KÜTÜPHANESİ VE SIFIR EMOJİ
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
