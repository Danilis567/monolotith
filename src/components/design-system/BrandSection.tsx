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
    title: 'ANA LOGO (WORDMARK)',
    columns: 3,
    items: [
      {
        id: 'wordmark-dark',
        name: 'KELİME İŞARETİ // KOYU ZEMİN',
        src: '/brand/monolith-wordmark-dark.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#282828)',
        role: 'Koyu zeminli üst çubuk ve kapaklarda kullanılır.',
        backing: 'dark',
      },
      {
        id: 'wordmark-light',
        name: 'KELİME İŞARETİ // AÇIK ZEMİN',
        src: '/brand/monolith-wordmark-light.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#B9B5AA)',
        role: 'Açık zeminli sayfalarda kullanılır.',
        backing: 'light',
      },
      {
        id: 'wordmark-mono',
        name: 'KELİME İŞARETİ // TEK RENK',
        src: '/brand/monolith-wordmark-mono.svg',
        dimensions: '264 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Metin rengini alan tek renkli logo.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'stacked',
    title: 'DİKEY LOGO',
    columns: 2,
    wideStage: true,
    items: [
      {
        id: 'stacked-dark',
        name: 'DİKEY LOGO // KOYU ZEMİN',
        src: '/brand/monolith-stacked-dark.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#282828)',
        role: 'Dikey poster ve kapaklarda kullanılır.',
        backing: 'dark',
      },
      {
        id: 'stacked-light',
        name: 'DİKEY LOGO // AÇIK ZEMİN',
        src: '/brand/monolith-stacked-light.svg',
        dimensions: '320 × 268 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#B9B5AA)',
        role: 'Açık zeminli dikey alanlarda kullanılır.',
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
        surfaceRule: 'BOŞLUK / BAZALT (#131313–#282828)',
        role: 'Dar alanlarda kullanılan kare M logosu.',
        backing: 'dark',
      },
      {
        id: 'monogram-light',
        name: 'MONOGRAM // AÇIK ZEMİN',
        src: '/brand/monolith-monogram-light.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI (#E9E5DF–#B9B5AA)',
        role: 'Açık zeminli dar alanlarda kullanılır.',
        backing: 'light',
      },
      {
        id: 'monogram-mono',
        name: 'MONOGRAM // TEK RENK',
        src: '/brand/monolith-monogram-mono.svg',
        dimensions: '64 × 64 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Metin rengini alan kare M logosu.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'lockups',
    title: 'ÜST ÇUBUK VE ALT BİLGİ LOGOLARI',
    columns: 3,
    items: [
      {
        id: 'nav-dark',
        name: 'ÜST ÇUBUK LOGOSU // KOYU ZEMİN',
        src: '/brand/nav-lockup.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'BOŞLUK / BAZALT ÜST ÇUBUĞU',
        role: 'Koyu zeminli üst menü çubuğunda kullanılır.',
        backing: 'dark',
      },
      {
        id: 'nav-light',
        name: 'ÜST ÇUBUK LOGOSU // AÇIK ZEMİN',
        src: '/brand/nav-lockup-light.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'SIVA / KİREÇTAŞI ÜST ÇUBUĞU',
        role: 'Açık zeminli üst menü çubuğunda kullanılır.',
        backing: 'light',
      },
      {
        id: 'nav-mono',
        name: 'ÜST ÇUBUK LOGOSU // TEK RENK',
        src: '/brand/nav-lockup-mono.svg',
        dimensions: '145 × 28 PX (332:64)',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tema rengine uyan üst menü logosu.',
        backing: 'light',
      },
      {
        id: 'footer-dark',
        name: 'ALT BİLGİ LOGOSU // KOYU ZEMİN',
        src: '/brand/footer-lockup.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'BOŞLUK / BAZALT ALT BİLGİ PLAKASI',
        role: 'Koyu zeminli sayfa alt bilgisinde kullanılır.',
        backing: 'dark',
      },
      {
        id: 'footer-light',
        name: 'ALT BİLGİ LOGOSU // AÇIK ZEMİN',
        src: '/brand/footer-lockup-light.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI ALT BİLGİ',
        role: 'Açık zeminli sayfa alt bilgisinde kullanılır.',
        backing: 'light',
      },
      {
        id: 'footer-mono',
        name: 'ALT BİLGİ LOGOSU // TEK RENK',
        src: '/brand/footer-lockup-mono.svg',
        dimensions: '1240 × 316 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tek renkli sayfa alt bilgisi logosu.',
        backing: 'light',
      },
    ],
  },
  {
    id: 'loader-favicons',
    title: 'YÜKLEME İŞARETİ VE TARAYICI SİMGELERİ',
    columns: 3,
    items: [
      {
        id: 'loader-dark',
        name: 'YÜKLEME İŞARETİ // KOYU ZEMİN',
        src: '/brand/loader-mark.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'BOŞLUK / BAZALT PERDE',
        role: 'Koyu zeminde sayfa yüklenirken gösterilir.',
        backing: 'dark',
      },
      {
        id: 'loader-light',
        name: 'YÜKLEME İŞARETİ // AÇIK ZEMİN',
        src: '/brand/loader-mark-light.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'SIVA / KİREÇTAŞI PERDE',
        role: 'Açık zeminde sayfa yüklenirken gösterilir.',
        backing: 'light',
      },
      {
        id: 'loader-mono',
        name: 'YÜKLEME İŞARETİ // TEK RENK',
        src: '/brand/loader-mark-mono.svg',
        dimensions: '120 × 140 PX',
        surfaceRule: 'CURRENTCOLOR (MÜREKKEP RENGİNİ DEVRALIR)',
        role: 'Tek renkli yükleme işareti.',
        backing: 'light',
      },
      {
        id: 'favicon-16',
        name: 'FAVICON // 16 PX',
        src: '/brand/favicon-16.svg',
        dimensions: '16 × 16 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Tarayıcı sekmesi simgesi (16px).',
        backing: 'plate',
        exactPx: 16,
      },
      {
        id: 'favicon-32',
        name: 'FAVICON // 32 PX',
        src: '/brand/favicon-32.svg',
        dimensions: '32 × 32 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Masaüstü yer imi ve sekme simgesi (32px).',
        backing: 'plate',
        exactPx: 32,
      },
      {
        id: 'favicon-48',
        name: 'FAVICON // 48 PX',
        src: '/brand/favicon-48.svg',
        dimensions: '48 × 48 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'Yüksek çözünürlüklü kısayol simgesi (48px).',
        backing: 'plate',
        exactPx: 48,
      },
      {
        id: 'apple-touch',
        name: 'APPLE TOUCH SİMGESİ',
        src: '/brand/apple-touch-icon.svg',
        dimensions: '180 × 180 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (#131313 PLAKA)',
        role: 'iPhone ve iPad ana ekran simgesi.',
        backing: 'plate',
      },
      {
        id: 'maskable-icon',
        name: 'MASKELENEBİLİR PWA SİMGESİ',
        src: '/brand/maskable-icon.svg',
        dimensions: '512 × 512 PX',
        surfaceRule: 'KENDİ İÇİNDE KAPALI (GÜVENLİ ALAN)',
        role: 'Android ve PWA uygulama simgesi.',
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
    writeNote: 'Sayı ve malzeme bilgisi verir; sıfat kullanmaz.',
    avoid: 'Nefes kesici, ikonik koleksiyonumuzu keşfedin! ✨',
    avoidNote: 'Ünlem işareti, emoji, öznel abartı ("nefes kesici", "ikonik").',
  },
  {
    id: 'specimen-note',
    context: 'ÖRNEK KAYIT // CAT. 004',
    write: 'Yerinde dökülmüş konsol döşeme; sıvasız bırakılmış ahşap kalıp izli alt yüzey.',
    writeNote: 'Yapım tekniğini ve malzemeyi doğrudan söyler.',
    avoid: 'Brütalist mimari ustalığın kusursuz ve hayranlık uyandıran bir nişanesi.',
    avoidNote: 'Övgü sıfatları ("kusursuz", "hayranlık uyandıran") ve boş ifadeler içerir.',
  },
  {
    id: 'survey-status',
    context: 'ENVANTER DURUMU',
    write: 'ENVANTER FOLYOSU IV — 27 KAYIT DİZİNLENDİ.',
    writeNote: 'Kayıt sayısını verir ve nokta ile biter.',
    avoid: 'Mimari hikaye anlatıcılığının geleceğine hoş geldiniz!',
    avoidNote: 'Tanıtım cümlesi ve ünlem işareti içerir.',
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
    label: 'İKİ KADEMELİ ETİKET',
    sample: 'COORDINATES: GPS (WGS84)',
    rule: 'Önce kategori adı, ardından parantez içinde teknik bilgi.',
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
            <span className={`type-colophon ${styles.subIndex}`}>02.1 // LOGOLAR VE SİMGELER</span>
            <h3 id="brand-logo-heading" className={`type-subhead ${styles.subTitle}`}>
              LOGOLAR VE TARAYICI SİMGELERİ
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            <code>/brand/</code> klasöründen bu sayfada listelenen 22 SVG logo ve simge varlığı.
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
                    Logoyu yatay veya dikey uzatmayın; en-boy oranını koruyun.
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
                    Logoda yalnızca #E9E5DF, #131313 veya currentColor kullanın.
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
                    Logo üzerinde gölge veya parlama kullanmayın.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02.2 YAZIM KURALLARI
          ===================================================================== */}
      <section aria-labelledby="brand-voice-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleBlock}>
            <span className={`type-colophon ${styles.subIndex}`}>02.2 // YAZIM KURALLARI</span>
            <h3 id="brand-voice-heading" className={`type-subhead ${styles.subTitle}`}>
              YAZIM KURALLARI
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Metinler kısa ve olgusaldır; övgü sıfatları ve ünlem kullanılmaz.
          </p>
        </div>

        <div className={styles.voiceGrid}>
          {VOICE_COMPARISONS.map((pair) => (
            <div key={pair.id} className={styles.voicePair}>
              <div className={styles.voiceWrite}>
                <span className={`type-colophon ${styles.voiceTagWrite}`}>
                  DOĞRU — {pair.context}
                </span>
                <p className={`type-body-lead ${styles.voiceQuote}`}>{pair.write}</p>
                <p className={`type-colophon ${styles.voiceNote}`}>{pair.writeNote}</p>
              </div>

              <div className={styles.voiceAvoid}>
                <span className={`type-colophon ${styles.voiceTagAvoid}`}>
                  YANLIŞ
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
            <span className={`type-colophon ${styles.subIndex}`}>02.3 // VERİ BİÇİMLERİ</span>
            <h3 id="brand-formats-heading" className={`type-subhead ${styles.subTitle}`}>
              VERİ BİÇİMLERİ VE BİRİMLER
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Katalog numarası, tarih, yükseklik ve koordinat yazım biçimleri.
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
            <span className={`type-colophon ${styles.subIndex}`}>02.4 // ÇİZİM İŞARETLERİ VE SEMBOLLER</span>
            <h3 id="brand-iconography-heading" className={`type-subhead ${styles.subTitle}`}>
              İŞARETLER VE SVG ÇİZİMLER
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sitede harici simge paketi ve emoji kullanılmaz; yalnızca bu 9 işaret ve 4 SVG çizim bileşeni (
            <code>CornerCrosshair</code>, <code>AlignmentStar</code>, <code>SteppedFrame</code> ve
            Bileşenler bölümündeki <code>ScaleRuler</code>) kullanılır.
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
                  Çerçeve köşelerine yerleştirilen artı işareti.
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
                  Künye satırlarında ayırıcı olarak kullanılan 4 uçlu yıldız.
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
                  Fotoğraf çerçevelerinin iç köşelerine yerleştirilen L biçimli çizgiler.
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
