'use client';

import { useState } from 'react';
import { computeContrastRatio } from '@/design-system/colorUtils';
import type {
  DesignSystemTokensPayload,
  SurfaceIslandId,
} from '@/design-system/tokens';
import styles from './PatternsSection.module.css';

interface PageTemplateSpec {
  id: string;
  name: string;
  route: string;
  screenshotSrc: string;
  wide?: boolean;
  gridSpans: string;
  surfaceAlternation: string;
  asymmetricRhythm: string;
  wireframeBands: Array<{
    colSpan: string;
    surface: 'void' | 'basalt' | 'plaster' | 'limestone';
    label: string;
  }>;
}

const PAGE_TEMPLATES: ReadonlyArray<PageTemplateSpec> = [
  {
    id: 'home',
    name: 'Ana Sayfa Posteri',
    route: '/',
    screenshotSrc: '/design-system/templates/home.png',
    wide: true,
    gridSpans: 'Sütun 1–7 Ana Monolit Posteri / Sütun 8–12 Dizin Defteri; 3+4+5 plaka ritmi',
    surfaceAlternation: 'void → plaster → basalt → dark',
    asymmetricRhythm: 'Sivri kemer odak plakası ve 0px gönye çerçevelerle 1.6fr / 0.95fr editoryal bölünme',
    wireframeBands: [
      { colSpan: 'span 7', surface: 'void', label: '01 ANA PLAKA' },
      { colSpan: 'span 5', surface: 'basalt', label: '02 DİZİN DEFTERİ' },
      { colSpan: 'span 4', surface: 'plaster', label: '03 ALÇI YÜZEY' },
      { colSpan: 'span 8', surface: 'limestone', label: '04 ARŞİV ÖNİZLEMESİ' },
    ],
  },
  {
    id: 'archive',
    name: 'Arşiv Matrisi (PLAKA / DİZİN)',
    route: '/archive',
    screenshotSrc: '/design-system/templates/archive.png',
    gridSpans: '12 sütunlu yapışkan filtre çubuğu; Plaka modunda 1.6fr / 0.95fr / 1.15fr; 3 sütunlu Dizin defteri',
    surfaceAlternation: 'void → basalt → void',
    asymmetricRhythm: 'Düzensiz yığma aralıkları ve tablosal koordinatlarla ikili PLAKA / DİZİN görünüm geçişi',
    wireframeBands: [
      { colSpan: 'span 12', surface: 'basalt', label: 'FİLTRE ÇUBUĞU + GÖRÜNÜM GEÇİŞİ' },
      { colSpan: 'span 5', surface: 'void', label: 'PLAKA A (SİVRİ KEMER)' },
      { colSpan: 'span 3', surface: 'basalt', label: 'PLAKA B' },
      { colSpan: 'span 4', surface: 'void', label: 'PLAKA C' },
    ],
  },
  {
    id: 'detail',
    name: 'Yapı Detay Dosyası',
    route: '/structures/[slug]',
    screenshotSrc: '/design-system/templates/detail.png',
    gridSpans: 'Sütun 1–5 Yapışkan Örnek Plakası / Sütun 6–12 Mimari Dosya ve Teknik Özellikler',
    surfaceAlternation: 'void → plaster → basalt',
    asymmetricRhythm: 'Yüksek kemer/gönye plakayı kademeli açılan cephe notlarıyla eşleştiren 5/7 bölünme',
    wireframeBands: [
      { colSpan: 'span 5', surface: 'basalt', label: 'ÖRNEK PLAKA' },
      { colSpan: 'span 7', surface: 'plaster', label: 'DOSYA + TEKNİK ÖZELLİKLER' },
      { colSpan: 'span 12', surface: 'void', label: 'İLİŞKİLİ YAPILAR' },
    ],
  },
  {
    id: 'anatomy',
    name: 'Anatomi Çalışma Tezgahı',
    route: '/anatomy',
    screenshotSrc: '/design-system/templates/anatomy.png',
    wide: true,
    gridSpans: 'Sütun 1–8 Etkileşimli Plan Sahnesi / Sütun 9–12 Canlı Telemetri ve Katman Denetçisi',
    surfaceAlternation: 'void → basalt → dark',
    asymmetricRhythm: '6 özellikli inceleme kontrolleri ve artı imleç açıklamalarıyla 8/4 teknik çalışma tezgahı',
    wireframeBands: [
      { colSpan: 'span 8', surface: 'void', label: 'ETKİLEŞİMLİ PLAN SAHNESİ' },
      { colSpan: 'span 4', surface: 'basalt', label: 'KATMAN DENETÇİSİ' },
    ],
  },
];

const MATRIX_SURFACE_ORDER: ReadonlyArray<SurfaceIslandId> = [
  'void',
  'basalt',
  'plaster',
  'limestone',
];

interface InkRowSpec {
  cssVar: string;
  role: string;
  minWcag: '4.5' | '3.0';
}

const MATRIX_INK_ROWS: ReadonlyArray<InkRowSpec> = [
  { cssVar: '--ink-primary', role: 'Birincil Başlık ve Gövde Metni', minWcag: '4.5' },
  { cssVar: '--ink-secondary', role: 'İkincil Üstveri ve Alt Yazılar', minWcag: '4.5' },
  { cssVar: '--ink-muted', role: 'Soluk Arayüz Etiketleri (AA Normal Güvenli)', minWcag: '4.5' },
  { cssVar: '--signal-ink', role: 'Kısıtlı Sinyal Vermilyon Vurgusu', minWcag: '4.5' },
  { cssVar: '--border-hairline', role: 'İnce Çizgiler ve Metin Dışı Arayüz', minWcag: '3.0' },
  { cssVar: '--border-structural', role: 'Yapısal 1–2px Brütalist Çerçeveler', minWcag: '3.0' },
];

interface ChangelogEntry {
  round: string;
  title: string;
  summary: string;
}

const CHANGELOG_ENTRIES: ReadonlyArray<ChangelogEntry> = [
  {
    round: 'TUR 01',
    title: 'Marka ve 4 Rotalı Temel Yapı',
    summary:
      'Değişmez beton primitifleri (#131313–#E9E5DF), kısıtlı Sinyal Vermilyon, sıfır yarıçaplı geometri ve 4 çekirdek arşiv rotası (/, /archive, /structures/[slug], /anatomy) oluşturuldu.',
  },
  {
    round: 'TUR 02',
    title: 'Yüzey Adaları ve Duyarlı Kenar Boşlukları',
    summary:
      'Otomatik anlamsal mürekkep/kenarlık tersine çevirme ve duyarlı 4/8/12 sütunlu kenar boşluğu ölçekleriyle kapsamlı [data-surface] adaları (void, basalt, plaster, limestone) eklendi.',
  },
  {
    round: 'TUR 03',
    title: 'Kanıta Dayalı 43 Adımlı Düzeltme ve Asimetri',
    summary:
      'Simetrik kart ızgaraları asimetrik editoryal defterlerle (3+4+5, 1.6fr / 0.95fr) değiştirildi, tüm gölgeler ve yuvarlatılmış köşeler kaldırıldı ve tüm adalarda AA kontrastı zorunlu kılındı.',
  },
  {
    round: 'TUR 04',
    title: 'Jüri Geri Bildirimi ve Kademeli Gösterim',
    summary:
      'Yoğun mimari üstveriler için kademeli gösterim çekmeceleri eklendi, PLAKA ve DİZİN arşiv modları netleştirildi ve Sinyal Vermilyon alan bütçesi <= %2 görüntü alanı ile sınırlandırıldı.',
  },
  {
    round: 'TUR 05',
    title: 'Anatomi 6 Özellikli Yükseltme ve Hız Optimizasyonu',
    summary:
      '/anatomy rotası 6 etkileşimli yapısal inceleme katmanı, dış sarmalayıcı odak halkaları (.plate-interactive-outer) ve azaltılmış hareket/görsel çözümleme optimizasyonlarıyla yükseltildi.',
  },
  {
    round: 'TUR 06',
    title: '/design-system Tek Doğruluk Kaynağı',
    summary:
      'Çalışma zamanında brand/tokens-color.css ve globals.css dosyalarını ayrıştıran, canlı WCAG kontrast hesaplaması ve bileşen kayıt defteri sunan token tabanlı /design-system dokümantasyonu oluşturuldu.',
  },
];

function resolveSurfaceColor(
  tokens: DesignSystemTokensPayload,
  surfaceId: SurfaceIslandId,
  cssVar: string,
  fallback: string,
): string {
  return (
    tokens.surfaces[surfaceId]?.tokens[cssVar]?.resolvedValue ??
    tokens.semanticDefaults[cssVar]?.resolvedValue ??
    fallback
  );
}

function getWcagBadges(ratio: number): Array<{ label: string; tier: 'pass' | 'large' | 'fail' }> {
  const badges: Array<{ label: string; tier: 'pass' | 'large' | 'fail' }> = [];
  if (ratio >= 7.0) {
    badges.push({ label: 'AAA (7.0:1)', tier: 'pass' });
  }
  if (ratio >= 4.5) {
    badges.push({ label: 'AA (4.5:1)', tier: 'pass' });
  } else if (ratio >= 3.0) {
    badges.push({ label: 'AA Büyük & Arayüz (3.0:1)', tier: 'large' });
  } else {
    badges.push({ label: 'BAŞARISIZ (<3.0:1)', tier: 'fail' });
  }
  return badges;
}

export function PatternsSection({
  tokens,
  previewSurface,
}: {
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
}) {
  const [gridOverlays, setGridOverlays] = useState<Record<string, boolean>>({});
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const toggleTemplateOverlay = (id: string) => {
    setGridOverlays((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markImageBroken = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Dynamic contrast ratios for Rule #4 and Prohibited Matrix Row (zero hardcoded numbers)
  const concrete500 = tokens.primitiveMap['--concrete-500'] ?? '#77746C';
  const concrete300 = tokens.primitiveMap['--concrete-300'] ?? '#B9B5AA';
  const concrete950 = tokens.primitiveMap['--concrete-950'] ?? '#131313';
  const concrete800 = tokens.primitiveMap['--concrete-800'] ?? '#282828';

  const ratio500OnLimestone = computeContrastRatio(concrete500, concrete300);
  const ratio500OnVoid = computeContrastRatio(concrete500, concrete950);
  const ratio500OnBasalt = computeContrastRatio(concrete500, concrete800);
  const ratio950OnLimestone = computeContrastRatio(concrete950, concrete300);
  const ratio800OnLimestone = computeContrastRatio(concrete800, concrete300);

  return (
    <div className={styles.sectionRoot} data-surface={previewSurface}>
      {/* Scoped Lancet Arch clipPath for Rule #6 visual specimen */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="ds-monolith-lancet-arch" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.42 C 0,0.16 0.22,0.03 0.5,0 C 0.78,0.03 1,0.16 1,0.42 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =====================================================================
          04.1 SAYFA ŞABLONLARI
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-templates">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.1</span>
            <h3 id="ds-patterns-templates" className="type-subhead">
              SAYFA ŞABLONLARI VE 12 SÜTUN IZGARASI
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Dört arşiv rotası kompozisyonu. Izgara aralıklarını ve asimetrik yüzey değişimlerini incelemek için herhangi bir plakadaki yerel 12 sütunlu katmanı açıp kapatın.
          </p>
        </header>

        <div className={styles.templatesGrid}>
          {PAGE_TEMPLATES.map((tpl) => {
            const isOverlayOn = Boolean(gridOverlays[tpl.id]);
            const isBroken = Boolean(brokenImages[tpl.id]);

            return (
              <article
                key={tpl.id}
                className={`${styles.templateCard} ${tpl.wide ? styles.templateCardWide : ''}`}
              >
                <div>
                  <div className={styles.templateHeader}>
                    <div className={styles.templateTitleGroup}>
                      <span className="type-ui-label">{tpl.name}</span>
                      <span className={styles.templateRoute}>{tpl.route}</span>
                    </div>
                    <button
                      type="button"
                      className={`type-ui-label ${styles.overlayToggleBtn}`}
                      aria-pressed={isOverlayOn}
                      onClick={() => toggleTemplateOverlay(tpl.id)}
                    >
                      <span className={styles.overlayDot} aria-hidden="true" />
                      {isOverlayOn ? '12 SÜTUN KATMANINI GİZLE' : '12 SÜTUN KATMANINI GÖSTER'}
                    </button>
                  </div>

                  <div className={styles.templateViewport}>
                    {!isBroken ? (
                      <img
                        src={tpl.screenshotSrc}
                        alt={`${tpl.name} (${tpl.route}) arşiv şablonu önizlemesi`}
                        className={styles.templateImage}
                        onError={() => markImageBroken(tpl.id)}
                      />
                    ) : (
                      <div className={styles.templateFallback} role="img" aria-label={`${tpl.name} mimari tel kafes`}>
                        <div className={styles.fallbackMetaRow}>
                          <span>MONOLITH // {tpl.route}</span>
                          <span>{tpl.surfaceAlternation}</span>
                        </div>
                        <div className={styles.fallbackBands}>
                          {tpl.wireframeBands.map((band) => {
                            const bandClass =
                              band.surface === 'void'
                                ? styles.fallbackBlockVoid
                                : band.surface === 'basalt'
                                  ? styles.fallbackBlockBasalt
                                  : band.surface === 'plaster'
                                    ? styles.fallbackBlockPlaster
                                    : styles.fallbackBlockLimestone;
                            return (
                              <div
                                key={band.label}
                                className={bandClass}
                                style={{
                                  gridColumn: band.colSpan,
                                  padding: '0.5rem',
                                  display: 'flex',
                                  alignItems: 'flex-end',
                                  fontFamily: 'var(--font-mono, monospace)',
                                  fontSize: '0.625rem',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                {band.label}
                              </div>
                            );
                          })}
                        </div>
                        <div className={styles.fallbackMetaRow}>
                          <span>12 SÜTUNLU MİMARİ ÇERÇEVE</span>
                          <span>0PX YARIÇAP</span>
                        </div>
                      </div>
                    )}

                    {isOverlayOn && (
                      <div className={styles.localGridOverlay} aria-hidden="true">
                        {Array.from({ length: 12 }, (_, idx) => (
                          <div key={idx} className={styles.localGridCol}>
                            <span className={styles.localGridColNum}>{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.templateNotes}>
                  <span className="type-ui-label">KOMPOZİSYON NOTLARI</span>
                  <ul className={styles.notesList}>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>IZGARA ARALIKLARI</span>
                      <span className={styles.noteVal}>{tpl.gridSpans}</span>
                    </li>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>YÜZEYLER</span>
                      <span className={styles.noteVal}>{tpl.surfaceAlternation}</span>
                    </li>
                    <li className={styles.noteItem}>
                      <span className={`type-ui-label ${styles.noteKey}`}>RİTİM</span>
                      <span className={styles.noteVal}>{tpl.asymmetricRhythm}</span>
                    </li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          04.2 GÖRSEL YAPILACAKLAR / YAPILMAYACAKLAR
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-rules">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.2</span>
            <h3 id="ds-patterns-rules" className="type-subhead">
              DEĞİŞMEZLER VE GÖRSEL KURALLAR
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Yan yana örneklerle sunulan yedi tavizsiz mimari değişmez.
          </p>
        </header>

        <div className={styles.rulesStack}>
          {/* Kural 1: Sıfır Yarıçap */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 01</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Sıfır Yarıçap (0px Gönye)</h4>
              </div>
              <p className={styles.ruleRationale}>
                Her kapsayıcı, düğme, girdi alanı ve plaka 0px keskin gönyeli köşeler kullanır. Yuvarlatılmış köşeler brütalist yapısal gerilimi zayıflatır.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doMiterBox}>
                  <span className="type-ui-label">border-radius: 0px</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Tüm yüzeylerde ve kontrollerde keskin 90 derecelik mimari gönye.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.dontRoundedBox}>
                  <span className="type-ui-label">rounded-lg (12px)</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Asla rounded-lg, hap yarıçapları veya yumuşak kart köşeleri uygulamayın.</p>
            </div>
          </article>

          {/* Kural 2: Gölgesiz Tonal Yükselti */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 02</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Gölgesiz Tonal Yükselti</h4>
              </div>
              <p className={styles.ruleRationale}>
                Derinlik yalnızca yüzey adası tonal geçişleri ve 1px yapısal kenarlıklarla ifade edilir; asla alt gölge veya bulanıklık kullanılmaz.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doElevationBox}>
                  <span className="type-ui-label">1px solid + yüzey basamağı</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>box-shadow: none ile belirgin 1px kenarlık ve basalt/void tonal basamağı.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.dontShadowBox}>
                  <span className="type-ui-label">box-shadow yükseltisi</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Asla ortam gölgesi (box-shadow) veya backdrop-filter cam efekti kullanmayın.</p>
            </div>
          </article>

          {/* Kural 3: Sinyal Vermilyon <= %2 */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 03</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Sinyal Vermilyon &lt;= %2</h4>
              </div>
              <p className={styles.ruleRationale}>
                Sinyal Vermilyon cerrahi vurgular için kısıtlıdır: aktif göstergeler, ince çizgiler ve kritik hata durumları (&lt;= %2 görüntü alanı).
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.doSignalBar}>
                  <span className="type-ui-label">AKTİF PLAKA 04</span>
                  <span className={styles.doSignalDot} aria-hidden="true" />
                </div>
              </div>
              <p className={styles.specimenCaption}>Beton tuval üzerinde 8px sinyal noktası + 2px ince çizgi vurgusu.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div
                  className={styles.dontSignalBanner}
                  role="img"
                  aria-label="Anti-desen: tam vermilyon afiş dolgusu"
                  style={{ color: '#FFFFFF' }}
                >
                  <span className="type-ui-label">TAM VERMİLYON AFİŞ</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Büyük afişleri, arka planları veya kartları asla vermilyon dolguyla kaplamayın.</p>
            </div>
          </article>

          {/* Kural 4: #77746C Küçük Metin / Kireçtaşı Üzerinde Yasak */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 04</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>{concrete500} Küçük Metin / Kireçtaşı Üzerinde Yasak</h4>
              </div>
              <p className={styles.ruleRationale}>
                Yıpranmış Gri ({concrete500}), yalnızca Void ({ratio500OnVoid.toFixed(2)}:1) ve Basalt ({ratio500OnBasalt.toFixed(2)}:1) üzerinde büyük/arayüz kontrastını karşılar; Limestone ({ratio500OnLimestone.toFixed(2)}:1) üzerinde tamamen başarısız olur.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.contrastSwatches}>
                  <div
                    className={styles.contrastSwatchRow}
                    style={{ backgroundColor: concrete300, color: concrete950 }}
                  >
                    <span>{concrete950} / {concrete300}</span>
                    <strong>{ratio950OnLimestone.toFixed(2)}:1 GEÇTİ ✓</strong>
                  </div>
                  <div
                    className={styles.contrastSwatchRow}
                    style={{ backgroundColor: concrete300, color: concrete800 }}
                  >
                    <span>{concrete800} / {concrete300}</span>
                    <strong>{ratio800OnLimestone.toFixed(2)}:1 GEÇTİ ✓</strong>
                  </div>
                </div>
              </div>
              <p className={styles.specimenCaption}>AA/AAA okunabilirlik için Kireçtaşı (#B9B5AA) üzerinde #131313 veya #282828 mürekkep kullanın.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.contrastSwatches}>
                  <svg
                    viewBox="0 0 320 34"
                    role="img"
                    aria-label={`Yasaklı eşleşme: ${concrete300} üzerinde ${concrete500} (${ratio500OnLimestone.toFixed(2)}:1 BAŞARISIZ)`}
                    style={{ inlineSize: '100%', blockSize: 'auto', display: 'block' }}
                  >
                    <rect width="320" height="34" fill={concrete300} stroke="#131313" strokeWidth="1" />
                    <text
                      x="10"
                      y="21"
                      fill={concrete500}
                      fontFamily="monospace"
                      fontSize="11"
                    >
                      {concrete500} / {concrete300}
                    </text>
                    <text
                      x="310"
                      y="21"
                      textAnchor="end"
                      fill={concrete500}
                      fontFamily="monospace"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {ratio500OnLimestone.toFixed(2)}:1 BAŞARISIZ
                    </text>
                  </svg>
                </div>
              </div>
              <p className={styles.specimenCaption}>{concrete500} rengini asla küçük metinlerle (&lt; 24px) veya {concrete300} Kireçtaşı ile eşleştirmeyin.</p>
            </div>
          </article>

          {/* Kural 5: Üzerine Gelmede Tonal ve Kenarlık Geçişi */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 05</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Üzerine Gelmede Tonal ve Kenarlık Geçişi</h4>
              </div>
              <p className={styles.ruleRationale}>
                Etkileşimli plakalar ve kontroller, ızgara hizalamasını bozan zıplayan ölçek dönüşümleri yerine kenarlık rengi ve tonal yüzey geçişleriyle tepki verir.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.hoverDoCard}>
                  <span className="type-ui-label">kenarlık + yüzey geçişi</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Üzerine gelme, kenarlık rengini ve yüzey tonunu ızgara izi içinde temizce değiştirir.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.hoverDontCard}>
                  <span className="type-ui-label">transform: scale(1.04)</span>
                </div>
              </div>
              <p className={styles.specimenCaption}>Kart veya plaka kapsayıcılarına asla transform: scale(1.04) uygulamayın.</p>
            </div>
          </article>

          {/* Kural 6: Sivri Kemer Maskesi Disiplini */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 06</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Sivri Kemer Maskesi Disiplini</h4>
              </div>
              <p className={styles.ruleRationale}>
                Sivri kemer kırpma yolu (url(#monolith-lancet-3x4)), Gotik tepenin nefes alabileceği uzun dikey özellik plakaları için ayrılmıştır.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.archSpecimenTall} role="img" aria-label="Uzun sivri kemer özellik plakası" />
              </div>
              <p className={styles.specimenCaption}>Dengeli dikey oranlara sahip uzun özellik plakaları (&gt;= 260px yükseklik).</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.archSpecimenCompact} role="img" aria-label="Sıkışmış kompakt kemer küçük görseli" />
              </div>
              <p className={styles.specimenCaption}>Sivri kemer kırpmasını asla &lt; 180px kompakt küçük görsellere uygulamayın.</p>
            </div>
          </article>

          {/* Kural 7: Asimetrik Editoryal Defter */}
          <article className={styles.ruleRow}>
            <div className={styles.ruleMeta}>
              <div>
                <span className={`type-ui-label ${styles.ruleNumber}`}>KURAL 07</span>
                <h4 className={`type-subhead ${styles.ruleTitle}`}>Asimetrik Editoryal Defter</h4>
              </div>
              <p className={styles.ruleRationale}>
                Yerleşimler, jenerik SaaS ızgaraları yerine mimari hiyerarşi oluşturmak için kasıtlı olarak eşit olmayan sütun oranları (3+4+5, 1.6fr 0.95fr 1.15fr) kullanır.
              </p>
            </div>
            <div className={`${styles.specimenCol} ${styles.specimenDo}`}>
              <span className={styles.specimenBadgeDo}>YAP ✓</span>
              <div className={styles.specimenStage}>
                <div className={styles.asymmetricMiniGrid}>
                  <div className={styles.miniCell}>3fr</div>
                  <div className={styles.miniCell}>4fr</div>
                  <div className={styles.miniCell}>5fr</div>
                </div>
              </div>
              <p className={styles.specimenCaption}>12 sütunlu ızgaraya sabitlenmiş orantılı 3+4+5 / 1.6fr + 0.95fr izler.</p>
            </div>
            <div className={styles.specimenCol}>
              <span className={styles.specimenBadgeDont}>YAPMA ✕</span>
              <div className={styles.specimenStage}>
                <div className={styles.equalMiniGrid}>
                  <div className={styles.miniCell}>1fr</div>
                  <div className={styles.miniCell}>1fr</div>
                  <div className={styles.miniCell}>1fr</div>
                </div>
              </div>
              <p className={styles.specimenCaption}>Editoryal bölümlerde tekdüze 1fr / 1fr / 1fr SaaS kart ızgaralarından kaçının.</p>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================================
          04.3 CANLI ERİŞİLEBİLİRLİK VE KONTRAST MATRİSİ
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-a11y">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.3</span>
            <h3 id="ds-patterns-a11y" className="type-subhead">
              CANLI ERİŞİLEBİLİRLİK VE KONTRAST MATRİSİ (WCAG AA)
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Aşağıdaki her oran, ayrıştırılmış yüzey ve mürekkep tokenlarından WCAG 2.1 bağıl parlaklık yöntemiyle canlı olarak hesaplanır.
          </p>
        </header>

        <div className={styles.matrixScroll}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th scope="col" className={`type-ui-label ${styles.matrixTh}`}>
                  MÜREKKEP / KENARLIK TOKENI
                </th>
                {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                  const surface = tokens.surfaces[surfaceId];
                  const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                  return (
                    <th key={surfaceId} scope="col" className={`type-ui-label ${styles.matrixTh}`}>
                      {surface?.label ?? surfaceId.toUpperCase()} ({bgHex})
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {MATRIX_INK_ROWS.map((row) => (
                <tr key={row.cssVar}>
                  <td>
                    <div className={styles.tokenCell}>
                      <span className={styles.tokenVarName}>{row.cssVar}</span>
                      <span className={styles.tokenRoleDesc}>{row.role}</span>
                    </div>
                  </td>
                  {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                    const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                    const fgHex = resolveSurfaceColor(tokens, surfaceId, row.cssVar, '#E9E5DF');
                    const ratio = computeContrastRatio(fgHex, bgHex);
                    const badges = getWcagBadges(ratio);

                    const bgIsDark = surfaceId === 'void' || surfaceId === 'basalt';
                    const readableInk = ratio >= 4.5 ? fgHex : bgIsDark ? '#E9E5DF' : '#131313';

                    return (
                      <td key={surfaceId}>
                        <div className={styles.ratioCellInner}>
                          <div
                            className={styles.ratioSampleRow}
                            style={{ backgroundColor: bgHex, color: readableInk }}
                          >
                            <span className={styles.ratioNumber}>{ratio.toFixed(2)}:1</span>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono, monospace)',
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  inlineSize: '10px',
                                  blockSize: '10px',
                                  backgroundColor: fgHex,
                                  border: `1px solid ${readableInk}`,
                                  display: 'inline-block',
                                }}
                              />
                              {fgHex}
                            </span>
                          </div>
                          <div className={styles.badgesRow}>
                            {badges.map((b) => (
                              <span
                                key={b.label}
                                className={
                                  b.tier === 'pass'
                                    ? styles.badgePass
                                    : b.tier === 'large'
                                      ? styles.badgeLarge
                                      : styles.badgeFail
                                }
                              >
                                {b.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Açık Yasaklı Eşleşme Satırı */}
              <tr className={styles.prohibitedRow}>
                <td>
                  <div className={styles.tokenCell}>
                    <span className={styles.tokenVarName}>
                      --concrete-500 ({concrete500})
                      <span className={styles.prohibitedTag}>KİREÇTAŞI ÜZERİNDE YASAK</span>
                    </span>
                    <span className={styles.tokenRoleDesc}>
                      Kireçtaşı ({concrete300}) üzerinde Yıpranmış Gri — AA normal ve 3.0:1 arayüz kontrastında başarısız
                    </span>
                  </div>
                </td>
                {MATRIX_SURFACE_ORDER.map((surfaceId) => {
                  const bgHex = resolveSurfaceColor(tokens, surfaceId, '--surface-canvas', '#131313');
                  const ratio = computeContrastRatio(concrete500, bgHex);
                  const isLimestone = surfaceId === 'limestone';
                  const badges = getWcagBadges(ratio);

                  const bgIsDark = surfaceId === 'void' || surfaceId === 'basalt';
                  const readableInk = ratio >= 4.5 ? concrete500 : bgIsDark ? '#E9E5DF' : '#131313';

                  return (
                    <td key={surfaceId}>
                      <div className={styles.ratioCellInner}>
                        <div
                          className={styles.ratioSampleRow}
                          style={{
                            backgroundColor: bgHex,
                            color: readableInk,
                            borderColor: isLimestone ? 'var(--signal-border)' : undefined,
                          }}
                        >
                          <span className={styles.ratioNumber}>{ratio.toFixed(2)}:1</span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono, monospace)',
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                inlineSize: '10px',
                                blockSize: '10px',
                                backgroundColor: concrete500,
                                border: `1px solid ${readableInk}`,
                                display: 'inline-block',
                              }}
                            />
                            {isLimestone ? 'YASAK' : concrete500}
                          </span>
                        </div>
                        <div className={styles.badgesRow}>
                          {isLimestone ? (
                            <span className={styles.badgeFail}>YASAK ({ratio.toFixed(2)}:1)</span>
                          ) : (
                            badges.map((b) => (
                              <span
                                key={b.label}
                                className={
                                  b.tier === 'pass'
                                    ? styles.badgePass
                                    : b.tier === 'large'
                                      ? styles.badgeLarge
                                      : styles.badgeFail
                                }
                              >
                                {b.label}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Odak Halkası, Dokunma Hedefi ve Azaltılmış Hareket Kuralları */}
        <div className={styles.a11yRulesGrid}>
          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">ODAK HALKASI KURALI (KIRPILMIŞ PLAKALAR)</span>
            <p className={styles.ruleRationale}>
              CSS clip-path, sivri kemer plakalarındaki yerel dış çizgileri kırptığı için 2px düz odak halkasını kırpılmamış dış sarmalayıcı (.plate-interactive-outer) taşır.
            </p>
            <pre className={styles.a11yCode}>
{`.plate-interactive-outer:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 0;
}`}
            </pre>
          </article>

          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">MİNİMUM DOKUNMA HEDEFİ</span>
            <p className={styles.ruleRationale}>
              Tüm etkileşimli düğmeler, görünüm anahtarları, katman düğmeleri ve filtre çipleri en az 44×44 px tıklama alanı zorunlu kılar (WCAG 2.5.5 / 2.5.8).
            </p>
            <pre className={styles.a11yCode}>
{`min-block-size: 44px;
min-inline-size: 44px;`}
            </pre>
          </article>

          <article className={styles.a11yRuleCard}>
            <span className="type-ui-label">PREFERS-REDUCED-MOTION</span>
            <p className={styles.ruleRationale}>
              Tüm tonal geçişler, plaka açılışları ve kaydırmaya bağlı efektler, azaltılmış hareket tercihleri altında anlık durum değişikliklerine indirgenir.
            </p>
            <pre className={styles.a11yCode}>
{`@media (prefers-reduced-motion: reduce) {
  transition: none;
  animation: none;
}`}
            </pre>
          </article>
        </div>
      </section>

      {/* =====================================================================
          04.4 DEĞİŞİKLİK GÜNLÜĞÜ
          ===================================================================== */}
      <section className={styles.subSection} aria-labelledby="ds-patterns-changelog">
        <header className={styles.subHeader}>
          <div className={styles.subHeaderTitleGroup}>
            <span className={`type-ui-label ${styles.subIndex}`}>04.4</span>
            <h3 id="ds-patterns-changelog" className="type-subhead">
              MİMARİ DEĞİŞİKLİK GÜNLÜĞÜ
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            MONOLITH tasarım sistemi iterasyonlarının temelden tek doğruluk kaynağına kadar kronolojik defteri.
          </p>
        </header>

        <div className={styles.changelogLedger}>
          {CHANGELOG_ENTRIES.map((entry) => (
            <article key={entry.round} className={styles.changelogRow}>
              <span className={`type-ui-label ${styles.changelogRound}`}>{entry.round}</span>
              <h4 className={`type-ui-label ${styles.changelogTitle}`}>{entry.title}</h4>
              <p className={styles.changelogSummary}>{entry.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
