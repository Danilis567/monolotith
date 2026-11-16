'use client';

import { useState } from 'react';
import { CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import { HairlineDraw, PlateCurtain } from '@/components/MotionPrimitives';
import { computeContrastRatio, parseHexColor } from '@/design-system/colorUtils';
import type {
  DesignSystemTokensPayload,
  SurfaceIslandId,
} from '@/design-system/tokens';
import styles from './FoundationsSection.module.css';

const SURFACE_ORDER: readonly SurfaceIslandId[] = ['void', 'basalt', 'plaster', 'limestone'];

const SEMANTIC_KEYS = [
  '--surface-canvas',
  '--surface-elevated',
  '--surface-sunken',
  '--ink-primary',
  '--ink-secondary',
  '--ink-muted',
  '--border-hairline',
  '--border-structural',
  '--signal-ink',
  '--signal-border',
  '--focus-ring',
] as const;

const CONTRAST_CHECK_KEYS = new Set<string>([
  '--ink-primary',
  '--ink-secondary',
  '--ink-muted',
  '--border-hairline',
  '--border-structural',
  '--signal-ink',
  '--signal-border',
  '--focus-ring',
]);

const FONT_FAMILIES = [
  {
    name: 'Bodoni Moda',
    cssVar: 'var(--font-display)',
    token: '--font-display',
    role: 'Büyük sayfa başlıkları ve alıntılar.',
    specimen: 'MONOLİT IV',
  },
  {
    name: 'Inter',
    cssVar: 'var(--font-sans)',
    token: '--font-sans',
    role: 'Paragraflar, alt başlıklar ve düğme ile etiket yazıları.',
    specimen: 'Gövde yazısı',
  },
  {
    name: 'IBM Plex Mono',
    cssVar: 'var(--font-mono)',
    token: '--font-mono',
    role: 'Tarihler, koordinatlar, katalog numaraları ve tablo verileri.',
    specimen: '001 // 98.0 M',
  },
] as const;

const ALLOWED_GLYPHS = ['+', '×', '→', '←', '↗', '↙', '•', '✦', '▪'] as const;

const TABULAR_SAMPLES = [
  { index: '001', title: 'PANTHEON', height: '43.3 M' },
  { index: '014', title: 'CHARTRES KATEDRALİ', height: '113.0 M' },
  { index: '023', title: 'TRELLICK KULESİ', height: '98.0 M' },
  { index: '027', title: 'BARBICAN SİTESİ', height: '123.0 M' },
] as const;

const LINE_LENGTH_RULES = [
  { label: 'GİRİŞ PARAGRAFI (.type-body-lead)', measure: '62ch', sample: '27 yapının fotoğrafı ve teknik bilgisi tek bir arşivde toplanır.' },
  { label: 'GÖVDE METNİ (.type-body)', measure: '58ch', sample: 'Uzun paragraflar okumayı kolaylaştırmak için en fazla 58 karakter genişliğindedir.' },
  { label: 'FOTOĞRAF ALTI YAZISI', measure: '34ch', sample: 'ŞEK. 01 — CHARTRES BATI CEPHESİ' },
] as const;

const BREAKPOINT_SPECS = [
  { range: '< 768px', cols: '4 SÜTUN', gutter: '1rem', note: 'Mobil tek sütun' },
  { range: '>= 768px', cols: '8 SÜTUN', gutter: '1.25rem', note: 'Tablet bölünmüş düzen' },
  { range: '>= 1024px', cols: '12 SÜTUN', gutter: '1.5rem', note: 'Masaüstü 12 sütun' },
  { range: '>= 1440px', cols: '12 SÜTUN', gutter: '1.5rem', note: 'Geniş ekran (%5 kenar boşluğu)' },
] as const;

const ASPECT_RATIOS = [
  { ratio: '3 / 4', label: '3:4 DİKEY LEVHA', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Katedrali dikey levha' },
  { ratio: '4 / 5', label: '4:5 MONOGRAF', src: '/images/buildings/trellick-tower.jpg', alt: 'Trellick Kulesi cephe levhası' },
  { ratio: '16 / 10', label: '16:10 PANORAMA', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Katedrali geniş levha' },
  { ratio: '2 / 3', label: '2:3 DAR SİVRİ KEMER', src: '/images/buildings/trellick-tower.jpg', alt: 'Trellick Kulesi uzun levha' },
  { ratio: '1 / 1', label: '1:1 DİZİN KARESİ', src: '/images/buildings/chartres-cathedral.jpg', alt: 'Chartres Katedrali kare levha' },
] as const;

const MOTION_CURVES = [
  {
    name: 'MONOLITH_EASE',
    tuple: '[0.2, 0, 0, 1]',
    durations: '150ms – 280ms',
    usage: 'Düğme, bağlantı ve çizgi geçişleri',
    svgPath: 'M 10 90 C 30 90, 10 10, 110 10',
  },
  {
    name: 'SHEAR_EASE',
    tuple: '[0.16, 1, 0.3, 1]',
    durations: '280ms – 420ms',
    usage: 'Fotoğraf açılışları ve mobil menü kayması',
    svgPath: 'M 10 90 C 26 10, 40 10, 110 10',
  },
] as const;

function getRoleSpecimenText(role: string): string {
  switch (role) {
    case 'Monolith':
      return 'MONOLİT';
    case 'Display':
      return 'BÜYÜK BAŞLIK';
    case 'Quote':
      return 'Işık taşı süslemez; onun kütlesini ölçer.';
    case 'Subhead':
      return '12 sütunlu sayfa düzeni';
    case 'Body Lead':
      return 'Her renk tokenı, dört zemin renginden birine otomatik uyarlanır.';
    case 'Body':
      return 'Gövde metni, koyu ve açık zeminlerde rahat okuma için 58 karakter ile sınırlıdır.';
    case 'UI Label':
      return 'DİZİN // LEVHA 01';
    case 'Colophon':
      return 'ENL 48.4478 K · BOY 1.4878 D · MS 1194';
    default:
      return role;
  }
}

export function FoundationsSection({
  tokens,
  previewSurface,
  onCopy,
}: {
  tokens: DesignSystemTokensPayload;
  previewSurface: SurfaceIslandId;
  onCopy: (value: string, label?: string) => void;
}) {
  const [replayCount, setReplayCount] = useState(0);

  const gridLayoutTokens = tokens.layoutTokens.filter((t) => t.category === 'grid' || t.category === 'header');

  return (
    <div data-surface={previewSurface} className={styles.root}>
      {/* ==================================================================
          01.1 COLOR
          ================================================================== */}
      <section aria-labelledby="f-color-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>
              <span className="signal-dot" aria-hidden="true" />
              01.1 // RENKLER
            </span>
            <h3 id="f-color-heading" className={`type-display ${styles.subTitle}`}>
              RENKLER VE YÜZEYLER
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sitede kullanılan 5 gri ton, 1 kırmızı vurgu rengi ve 4 zemin yüzeyi.
          </p>
        </div>

        {/* Primitive Palette */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">TEMEL RENKLER ({tokens.primitives.length} TOKEN)</span>
          <span className="type-colophon">HEX VE CSS TOKEN</span>
        </div>

        <div className={styles.swatchGrid}>
          {tokens.primitives.map((p) => (
            <button
              key={p.name}
              type="button"
              className={styles.swatchBtn}
              onClick={() => onCopy(p.value, p.name)}
              aria-label={`${p.name} ${p.value} değerini kopyala`}
            >
              <span className={styles.swatchChip} style={{ backgroundColor: p.value }}>
                <span className={`type-colophon ${styles.swatchGroupTag}`}>
                  {p.group.toUpperCase()}
                </span>
              </span>
              <span className={styles.swatchMeta}>
                <span className={`type-colophon ${styles.swatchName}`}>{p.name}</span>
                <span className={`type-colophon tabular-nums ${styles.swatchDetail}`}>
                  <span>{p.value}</span>
                  <span>L {p.luminance !== null ? p.luminance.toFixed(4) : '—'}</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* 4 Surface Islands Side-by-Side */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">YÜZEYLER // 4 ZEMİN RENGİ</span>
          <span className="type-colophon">ZEMİN İLE YAZI KONTRAST ORANI</span>
        </div>

        <div className={styles.surfaceMatrix}>
          {SURFACE_ORDER.map((islandId) => {
            const island = tokens.surfaces[islandId];
            if (!island) return null;
            const canvasHex = island.tokens['--surface-canvas']?.resolvedValue ?? '';

            return (
              <div key={island.id} data-surface={island.id} className={styles.islandCard}>
                <div className={styles.islandHeader}>
                  <span className="type-colophon">{island.label.toUpperCase()}</span>
                  <span className="type-colophon">{island.colorScheme.toUpperCase()}</span>
                </div>
                <div className={styles.islandTokenList}>
                  {SEMANTIC_KEYS.map((key) => {
                    const entry = island.tokens[key];
                    if (!entry) return null;
                    const canCompute =
                      CONTRAST_CHECK_KEYS.has(key) &&
                      parseHexColor(entry.resolvedValue) !== null &&
                      parseHexColor(canvasHex) !== null;
                    const ratio = canCompute
                      ? computeContrastRatio(entry.resolvedValue, canvasHex)
                      : null;

                    return (
                      <button
                        key={key}
                        type="button"
                        className={styles.islandTokenRow}
                        onClick={() => onCopy(entry.resolvedValue, `${island.id} ${key}`)}
                        aria-label={`${island.label} üzerindeki ${key} değerini kopyala: ${entry.resolvedValue}`}
                      >
                        <span
                          className={styles.tokenDot}
                          style={{ backgroundColor: entry.resolvedValue }}
                          aria-hidden="true"
                        />
                        <span className={styles.tokenNames}>
                          <span className={`type-colophon ${styles.tokenVar}`}>{key}</span>
                          <span className={`type-colophon tabular-nums ${styles.tokenResolved}`}>
                            {entry.resolvedValue}
                          </span>
                        </span>
                        <span className={`type-colophon tabular-nums ${styles.tokenContrast}`}>
                          {ratio !== null ? `${ratio.toFixed(2)}:1` : 'YÜZEY'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* <= 2% Signal Vermilion Rule */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">KIRMIZI VURGU KURALI (EN FAZLA %2)</span>
          <span className="type-colophon">YALNIZCA KÜÇÜK İŞARETLERDE</span>
        </div>

        <div className={styles.signalRuleGrid}>
          <div className={styles.signalSpecimen}>
            <div
              className={styles.signalProportionBar}
              role="img"
              aria-label="Yüzde 2 kırmızı vurguya karşılık yüzde 98 gri zemin oranı"
            >
              <span className={styles.signalBarActive} />
              <span className={styles.signalBarNeutral} />
            </div>
            <div className={styles.signalDemoRow}>
              <span className="type-colophon" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="signal-dot" aria-hidden="true" />
                ÖRNEK // 6PX NOKTA + 3PX KENARLIK
              </span>
              <span className="type-colophon tabular-nums" style={{ color: 'var(--signal-ink)' }}>
                &lt;= %2.0 ALAN
              </span>
            </div>
          </div>

          <div className={styles.signalRuleNotes}>
            <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
              NEREDE KULLANILIR
            </span>
            <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
              Kırmızı renk yalnızca durum noktalarında, 2px–3px kenarlıklarda ve hata mesajlarında
              kullanılır. Büyük kırmızı arka planlar kullanılmaz.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.2 TYPOGRAPHY
          ================================================================== */}
      <section aria-labelledby="f-typo-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.2 // YAZI TİPLERİ</span>
            <h3 id="f-typo-heading" className={`type-display ${styles.subTitle}`}>
              YAZI TİPLERİ VE BOYUTLARI
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sitede 3 yazı tipi ve 8 metin boyutu kullanılır.
          </p>
        </div>

        {/* 3 Families */}
        <div className={styles.familyGrid}>
          {FONT_FAMILIES.map((fam) => (
            <div key={fam.name} className={styles.familyCard}>
              <div className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {fam.name.toUpperCase()} {'//'} {fam.token}
              </div>
              <div className={styles.familySpecimen} style={{ fontFamily: fam.cssVar }}>
                {fam.specimen}
              </div>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                {fam.role}
              </p>
            </div>
          ))}
        </div>

        {/* All 8 Live .type-* Roles */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">8 METİN BOYUTU (globals.css)</span>
          <span className="type-colophon">KÖK YAZI BOYUTU %85 (13.6PX TABAN)</span>
        </div>

        <div className={styles.roleList}>
          {tokens.typographyRoles.map((role) => {
            const className = role.selector.replace(/^\./, '');
            return (
              <div key={role.selector} className={styles.roleRow}>
                <div className={styles.roleMeta}>
                  <span className="type-colophon" style={{ color: 'var(--ink-primary)' }}>
                    {role.selector}
                  </span>
                  <div className={`type-colophon tabular-nums ${styles.roleSpecs}`}>
                    <span>BOYUT: {role.fontSizeValue}</span>
                    {role.fontSizeToken && <span>({role.fontSizeToken})</span>}
                    <span>AĞIRLIK: {role.fontWeight}</span>
                    <span>SATIR: {role.lineHeight}</span>
                    <span>ARALIK: {role.letterSpacing}</span>
                  </div>
                </div>
                <div className={`${className} ${styles.roleSpecimen}`}>
                  {getRoleSpecimenText(role.role)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Glyphs, Tabular Nums, Line-Length Rules */}
        <div className={styles.typoUtilityGrid}>
          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              KULLANILAN İŞARETLER
            </span>
            <div className={styles.glyphStrip}>
              {ALLOWED_GLYPHS.map((glyph) => (
                <span key={glyph} className={styles.glyphCell}>
                  {glyph}
                </span>
              ))}
            </div>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              EMOJİ YOK // YALNIZCA BU İŞARETLER
            </span>
          </div>

          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              TABLO RAKAMLARI HİZALAMA (001–027)
            </span>
            <div className={styles.tabularTable}>
              {TABULAR_SAMPLES.map((row) => (
                <div key={row.index} className={`type-colophon tabular-nums ${styles.tabularRow}`}>
                  <span>{row.index}</span>
                  <span>{row.title}</span>
                  <span>{row.height}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              EN FAZLA SATIR GENİŞLİĞİ
            </span>
            <div className={styles.measureList}>
              {LINE_LENGTH_RULES.map((rule) => (
                <div key={rule.measure} className={styles.measureItem}>
                  <span className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                    {rule.label} — MAKS {rule.measure}
                  </span>
                  <p
                    className={`type-body ${styles.measureBar}`}
                    style={{ maxInlineSize: rule.measure }}
                  >
                    {rule.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.3 LAYOUT
          ================================================================== */}
      <section aria-labelledby="f-layout-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.3 // IZGARA VE KENARLIKLAR</span>
            <h3 id="f-layout-heading" className={`type-display ${styles.subTitle}`}>
              IZGARA VE KENARLIKLAR
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Köşeler yuvarlanmaz, gölge kullanılmaz; ekran boyutuna göre 4, 8 veya 12 sütun
            kullanılır.
          </p>
        </div>

        <div className={styles.layoutSplit}>
          {/* Live Drafting Stage */}
          <div data-surface={previewSurface} className={styles.draftingStage}>
            <CornerCrosshair className={styles.stageCrosshairTL} />
            <CornerCrosshair className={styles.stageCrosshairTR} />
            <CornerCrosshair className={styles.stageCrosshairBL} />
            <CornerCrosshair className={styles.stageCrosshairBR} />
            <SteppedFrame style={{ color: 'var(--border-hairline)' }} />

            <div className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              ÖRNEK IZGARA // YÜZEY: {previewSurface.toUpperCase()}
            </div>

            <div className={styles.gridGuideDemo} aria-label="12 sütunlu ızgara kılavuzu">
              {Array.from({ length: 12 }, (_, idx) => (
                <div key={idx} className={`type-colophon tabular-nums ${styles.gridGuideCol}`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            <div className={styles.elevationTiers}>
              <div className={styles.elevationBox} style={{ backgroundColor: 'var(--surface-sunken)' }}>
                <span className="type-colophon">GÖMÜLÜ ZEMİN</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  1PX KENARLIK
                </span>
              </div>
              <div className={styles.elevationBox} style={{ backgroundColor: 'var(--surface-canvas)' }}>
                <span className="type-colophon">ANA ZEMİN</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  0PX KÖŞE
                </span>
              </div>
              <div
                className={styles.elevationBox}
                style={{ backgroundColor: 'var(--surface-elevated)', border: '2px solid var(--border-structural)' }}
              >
                <span className="type-colophon">ÜST ZEMİN</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  2PX KENARLIK
                </span>
              </div>
            </div>
          </div>

          {/* Breakpoint & Layout Token Ledger */}
          <div className={styles.tokenLedger}>
            {BREAKPOINT_SPECS.map((bp) => (
              <div key={bp.range} className={styles.ledgerRow}>
                <span className="type-colophon tabular-nums">{bp.range}</span>
                <span className="type-colophon">{bp.cols}</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  OLUK {bp.gutter}
                </span>
              </div>
            ))}
            {gridLayoutTokens.map((lt) => (
              <div key={lt.name} className={styles.ledgerRow}>
                <span className="type-colophon">{lt.name}</span>
                <span className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                  {lt.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.4 IMAGERY
          ================================================================== */}
      <section aria-labelledby="f-imagery-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.4 // FOTOĞRAFLAR</span>
            <h3 id="f-imagery-heading" className={`type-display ${styles.subTitle}`}>
              SİYAH-BEYAZ FİLTRELER VE ORANLAR
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Fotoğraflar siyah-beyaz filtrelerle ve beş sabit en-boy oranıyla gösterilir.
          </p>
        </div>

        {/* 3 Plate Treatments */}
        <div className={styles.plateCompareGrid}>
          <figure className={styles.plateCard}>
            <div className={`plate-frame ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Katedrali — temel gri tonlamalı levha işleme"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-img // TÜM YAPI KARTLARI VE DETAY SAYFALARINDA KULLANILAN VARSAYILAN FOTOĞRAF FİLTRESİ
            </figcaption>
          </figure>

          <figure className={styles.plateCard}>
            <div className={`plate-frame plate-grain ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Katedrali — 4px mikro ızgara gren katmanı"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-grain // KAPAK VE TAM SAYFA ARKA PLANLARINDA KULLANILAN 4PX GREN KATMANI
            </figcaption>
          </figure>

          <figure className={styles.plateCard}>
            <div className={`plate-frame plate-halftone ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Katedrali — 1-bit yarım ton nokta matrisi"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-halftone // SEÇİLİ YÜKSEK KONTRASTLI TRAM ÖRNEKLERİNDE KULLANILAN NOKTA MATRİSİ
            </figcaption>
          </figure>
        </div>

        {/* Sanctioned Aspect Ratios */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">KULLANILAN EN-BOY ORANLARI (3/4, 4/5, 16/10, 2/3, 1/1)</span>
          <span className="type-colophon">WIKIMEDIA COMMONS CC-BY-SA</span>
        </div>

        <div className={styles.aspectStrip}>
          {ASPECT_RATIOS.map((ar) => (
            <figure key={ar.ratio} className={styles.aspectCard}>
              <div className="plate-frame" style={{ aspectRatio: ar.ratio }}>
                <img
                  src={ar.src}
                  alt={ar.alt}
                  className="plate-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                {ar.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Gothic Lancet Arch Mask + Rules */}
        <div className={styles.lancetGrid}>
          <div className={styles.lancetPlateWrap}>
            <div className="plate-frame plate-arch-lancet">
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Gotik Sivri Kemer kırpma yolu içinde Chartres Katedrali"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className={styles.lancetRules}>
            <span className="type-colophon">
              GOTİK SİVRİ KEMER {'//'} clip-path: url(#monolith-lancet-3x4) (.plate-arch-lancet)
            </span>
            <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
              Yalnızca 3:4 ve 2:3 dikey fotoğraflarda kullanılır. Klavye odak çizgisi kırpılmasın
              diye dış kutuya verilir.
            </p>
            <div className={styles.prohibitedThumbRow}>
              <div className={`plate-frame ${styles.compactThumb}`}>
                <img
                  src="/images/buildings/trellick-tower.jpg"
                  alt="Trellick Kulesi kompakt dikdörtgen küçük görsel"
                  className="plate-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div style={{ display: 'grid', gap: '0.25rem' }}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  KURAL // 180PX ALTINDA KULLANILMAZ
                </span>
                <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                  180px altındaki küçük resimlerde fotoğrafı kesmemek için dikdörtgen kullanılır.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          01.5 MOTION
          ================================================================== */}
      <section aria-labelledby="f-motion-heading" className={styles.subSection}>
        <div className={styles.subHeader}>
          <div className={styles.subTitleGroup}>
            <span className={`type-colophon ${styles.subIndex}`}>01.5 // ANİMASYON</span>
            <h3 id="f-motion-heading" className={`type-display ${styles.subTitle}`}>
              HAREKET HIZLARI VE ERİŞİLEBİLİRLİK
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Animasyonlar 150ms–420ms sürer ve <code>prefers-reduced-motion: reduce</code> açıkken
            kapanır.
          </p>
        </div>

        <div className={styles.motionGrid}>
          {/* Curves */}
          <div className={styles.curvePanel}>
            {MOTION_CURVES.map((curve) => (
              <div key={curve.name} style={{ display: 'grid', gap: '0.5rem' }}>
                <div className="type-colophon">
                  {curve.name} {'//'} {curve.tuple}
                </div>
                <svg
                  viewBox="0 0 120 100"
                  className={styles.curveSvg}
                  aria-label={`${curve.name} kübik bezier eğrisi`}
                >
                  <line
                    x1="10"
                    y1="90"
                    x2="110"
                    y2="10"
                    stroke="var(--border-hairline)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    d={curve.svgPath}
                    fill="none"
                    stroke="var(--signal-ink)"
                    strokeWidth="2"
                  />
                  <circle cx="10" cy="90" r="3" fill="var(--ink-primary)" />
                  <circle cx="110" cy="10" r="3" fill="var(--ink-primary)" />
                </svg>
                <div className="type-colophon tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                  {curve.durations} — {curve.usage}
                </div>
              </div>
            ))}
          </div>

          {/* Live Replay + Reduced Motion Comparison */}
          <div className={styles.motionStageWrap}>
            <div className={styles.motionControls}>
              <span className="type-colophon">
                ANİMASYON ÖNİZLEMESİ
              </span>
              <button
                type="button"
                className="btn-monolith btn-monolith--primary"
                onClick={() => setReplayCount((c) => c + 1)}
              >
                <span>TEKRAR OYNAT</span>
                <span className="tabular-nums" aria-hidden="true">
                  #{String(replayCount).padStart(2, '0')}
                </span>
              </button>
            </div>

            <div className={styles.replayCompare}>
              <div className={styles.replayPane}>
                <span className="type-colophon">STANDART HAREKET (420MS KAYMA)</span>
                <div key={`anim-${replayCount}`} className={styles.animatedHairline}>
                  <HairlineDraw thick />
                </div>
                <PlateCurtain key={`curtain-${replayCount}`} className={styles.animatedCurtain}>
                  <div className="plate-frame plate-arch-lancet">
                    <img
                      src="/images/buildings/trellick-tower.jpg"
                      alt="Trellick Kulesi hareketli sivri kemer açılımı"
                      className="plate-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </PlateCurtain>
              </div>

              <div className={styles.replayPane}>
                <span className="type-colophon">PREFERS-REDUCED-MOTION: REDUCE (ANLIK)</span>
                <HairlineDraw thick />
                <PlateCurtain className={styles.instantCurtain}>
                  <div className="plate-frame plate-arch-lancet">
                    <img
                      src="/images/buildings/trellick-tower.jpg"
                      alt="Trellick Kulesi azaltılmış hareket anlık durumu"
                      className="plate-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </PlateCurtain>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
