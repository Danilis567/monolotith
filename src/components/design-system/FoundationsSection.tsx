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
    role: 'Anıtsal başlıklar, manşetler ve epigraflar',
    specimen: 'MONOLİT IV',
  },
  {
    name: 'Inter',
    cssVar: 'var(--font-sans)',
    token: '--font-sans',
    role: 'Editoryal metinler, alt başlıklar ve arayüz etiketleri',
    specimen: 'Ölçülü Beton',
  },
  {
    name: 'IBM Plex Mono',
    cssVar: 'var(--font-mono)',
    token: '--font-mono',
    role: 'Künye bilgileri, koordinatlar, dizinler ve referans verileri',
    specimen: '001 // 98.0 M',
  },
] as const;

const ALLOWED_GLYPHS = ['+', '×', '→', '←', '↗', '↙', '•', '✦'] as const;

const TABULAR_SAMPLES = [
  { index: '001', title: 'PANTHEON', height: '43.3 M' },
  { index: '014', title: 'CHARTRES KATEDRALİ', height: '113.0 M' },
  { index: '023', title: 'TRELLICK KULESİ', height: '98.0 M' },
  { index: '027', title: 'BARBICAN SİTESİ', height: '123.0 M' },
] as const;

const LINE_LENGTH_RULES = [
  { label: 'GİRİŞ METNİ (.type-body-lead)', measure: '62ch', sample: '27 brütalist ve gotik anıt üzerinde ölçümlenmiş monokrom taş işçiliği.' },
  { label: 'MAKALE GÖVDESİ (.type-body)', measure: '58ch', sample: 'Yapısal beton, yapay yükseklik veya sentetik bulanıklık olmadan kendi gölgesini taşır.' },
  { label: 'LEVHA ALTYAZISI', measure: '34ch', sample: 'ŞEK. 01 — CHARTRES BATI CEPHESİ' },
] as const;

const BREAKPOINT_SPECS = [
  { range: '< 768px', cols: '4 SÜTUN', gutter: '1rem', note: 'Mobil tek sütunlu editoryal akış' },
  { range: '>= 768px', cols: '8 SÜTUN', gutter: '1.25rem', note: 'Tablet asimetrik bölünmüş çerçeveler' },
  { range: '>= 1024px', cols: '12 SÜTUN', gutter: '1.5rem', note: 'Masaüstü 12 sütunlu açık ızgara' },
  { range: '>= 1440px', cols: '12 SÜTUN', gutter: '1.5rem', note: '%5 dış kenar boşluklu geniş arşiv tuvali' },
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
    usage: 'Yüzey geçişleri, ince çizgi taramaları, etkileşim durumları',
    svgPath: 'M 10 90 C 30 90, 10 10, 110 10',
  },
  {
    name: 'SHEAR_EASE',
    tuple: '[0.16, 1, 0.3, 1]',
    durations: '280ms – 420ms',
    usage: 'Levha perde açılışları, çekmece kayması, sivri kemer girişi',
    svgPath: 'M 10 90 C 26 10, 40 10, 110 10',
  },
] as const;

function getRoleSpecimenText(role: string): string {
  switch (role) {
    case 'Monolith':
      return 'MONOLİT';
    case 'Display':
      return 'HAM BETON';
    case 'Quote':
      return 'Işık taşı süslemez; onun kütlesini ölçer.';
    case 'Subhead':
      return 'Açık 12 Sütunlu Teknik Çizim Sistemi';
    case 'Body Lead':
      return 'Her anlamsal token, yapay yükseklik olmadan dört beton yüzey adasına çözümlenir.';
    case 'Body':
      return 'Gövde metni, koyu ve açık beton yüzeylerde kesintisiz editoryal okuma için 58ch ile sınırlandırılmıştır.';
    case 'UI Label':
      return 'DİZİN // ÖLÇÜM LEVHASI 01';
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
              01.1 // RENK SİSTEMİ
            </span>
            <h3 id="f-color-heading" className={`type-display ${styles.subTitle}`}>
              TEMEL TONLAR VE YÜZEY ADALARI
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Dört mimari yüzey adasına eşlenmiş, ölçülü Sinyal Kırmızısı ile birleştirilen beş
            değişmez beton tonu.
          </p>
        </div>

        {/* Primitive Palette */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">KATMAN 1 // TEMEL PALET ({tokens.primitives.length} TOKEN)</span>
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
          <span className="type-colophon">KATMAN 2 // ANLAMSAL YÜZEY ADALARI</span>
          <span className="type-colophon">--surface-canvas İLE CANLI WCAG KONTRASTI</span>
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
          <span className="type-colophon">ORAN // &lt;= %2 SİNYAL KIRMIZISI KURALI</span>
          <span className="type-colophon">YALNIZCA CERRAHİ VURGU</span>
        </div>

        <div className={styles.signalRuleGrid}>
          <div className={styles.signalSpecimen}>
            <div
              className={styles.signalProportionBar}
              role="img"
              aria-label="Yüzde 2 sinyal kırmızısına karşılık yüzde 98 nötr beton yüzey oranı"
            >
              <span className={styles.signalBarActive} />
              <span className={styles.signalBarNeutral} />
            </div>
            <div className={styles.signalDemoRow}>
              <span className="type-colophon" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="signal-dot" aria-hidden="true" />
                DİSİPLİNLİ ÖRNEK // 6PX NOKTA + 3PX AKTİF KENARLIK
              </span>
              <span className="type-colophon tabular-nums" style={{ color: 'var(--signal-ink)' }}>
                &lt;= %2.0 ALAN
              </span>
            </div>
          </div>

          <div className={styles.signalRuleNotes}>
            <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
              DAĞILIM YÖNETİŞİMİ
            </span>
            <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
              Sinyal Kırmızısı; canlı durum noktaları, 2px–3px aktif gösterge kenarlıkları ve hata
              durumlarıyla sınırlandırılmıştır. Tam ekran kırmızı arka planlar ve dekoratif
              gradyanlar yasaktır.
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
            <span className={`type-colophon ${styles.subIndex}`}>01.2 // TİPOGRAFİ</span>
            <h3 id="f-typo-heading" className={`type-display ${styles.subTitle}`}>
              YAZI ÖLÇEĞİ VE FONT ROLLERİ
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sekiz editoryal role bağlı üç Google font ailesi, katı hizalı rakamlar ve kontrollü
            satır uzunluğu ölçüleri.
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
          <span className="type-colophon">8 CANLI TİPOGRAFİK ROL (globals.css KAYNAKLI)</span>
          <span className="type-colophon">%85 KÖK ORAN</span>
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
              İZİN VERİLEN GLİF SETİ
            </span>
            <div className={styles.glyphStrip}>
              {ALLOWED_GLYPHS.map((glyph) => (
                <span key={glyph} className={styles.glyphCell}>
                  {glyph}
                </span>
              ))}
            </div>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              EMOJİ YOK // YALNIZCA TEKNİK ÇİZİM GLİFLERİ
            </span>
          </div>

          <div className={styles.utilityCard}>
            <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              TABULAR-NUMS HİZALAMA (001–027)
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
              SATIR UZUNLUĞU ÖLÇÜ KURALLARI
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
            <span className={`type-colophon ${styles.subIndex}`}>01.3 // BOŞLUK VE IZGARA</span>
            <h3 id="f-layout-heading" className={`type-display ${styles.subTitle}`}>
              IZGARA, KENARLIKLAR VE YÜKSEKLİK
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sıfır köşe yuvarlama (border-radius), sıfır gölge (box-shadow) ve tonal yüzey
            kademelendirmeli açık 4 / 8 / 12 sütunlu ızgara.
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
              CANLI ÇİZİM SAHNESİ // YÜZEY: {previewSurface.toUpperCase()}
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
                <span className="type-colophon">GÖMÜLÜ (SUNKEN)</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  1PX İNCE ÇİZGİ
                </span>
              </div>
              <div className={styles.elevationBox} style={{ backgroundColor: 'var(--surface-canvas)' }}>
                <span className="type-colophon">TUVAL (CANVAS)</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  0PX YUVARLAMA
                </span>
              </div>
              <div
                className={styles.elevationBox}
                style={{ backgroundColor: 'var(--surface-elevated)', border: '2px solid var(--border-structural)' }}
              >
                <span className="type-colophon">YÜKSELTİLMİŞ (ELEVATED)</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  2PX YAPISAL
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
            <span className={`type-colophon ${styles.subIndex}`}>01.4 // FOTOĞRAFİK LEVHALAR</span>
            <h3 id="f-imagery-heading" className={`type-display ${styles.subTitle}`}>
              MONOKROM, YARIM TON VE SİVRİ KEMER
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Arşiv levhaları yüksek kontrastlı gri tonlama, mikro ızgara greni, 1-bit yarım ton
            matrisleri ve Gotik sivri kemer kırpma yolları kullanır. Görseller Wikimedia Commons
            (CC-BY-SA) kaynaklıdır.
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
              .plate-img // GRİ TONLAMA + KONTRAST
            </figcaption>
          </figure>

          <figure className={styles.plateCard}>
            <div className={`plate-frame plate-grain ${styles.plateBox3x4}`}>
              <img
                src="/images/buildings/chartres-cathedral.jpg"
                alt="Chartres Katedrali — mimari mikro ızgara gren katmanı"
                className="plate-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
              .plate-grain // 4PX MİKRO IZGARA KATMANI
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
              .plate-halftone // 1-BİT NOKTA MATRİSİ
            </figcaption>
          </figure>
        </div>

        {/* Sanctioned Aspect Ratios */}
        <div className={styles.blockHeading}>
          <span className="type-colophon">ONAYLI EN-BOY ORANLARI (3/4, 4/5, 16/10, 2/3, 1/1)</span>
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
              Kesinlikle 3:4 (`#monolith-lancet-3x4`) veya 2:3 (`#monolith-lancet-2x3`) dikey
              levhalara kilitlidir. Klavye odak çerçevelerinin kesilmemesi için odak halkaları
              kırpılmamış dış sarmalayıcıda kalır.
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
                  KURAL // &lt; 180PX KÜÇÜK GÖRSELLERDE YASAK
                </span>
                <span className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                  Kompakt dizin küçük görselleri (&lt; 180px genişlik), sivri kemer tepe noktasının
                  üst veriyi sıkıştırmaması için kesinlikle dikdörtgen kalır.
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
            <span className={`type-colophon ${styles.subIndex}`}>01.5 // HAREKET VE ZAMANLAMA</span>
            <h3 id="f-motion-heading" className={`type-display ${styles.subTitle}`}>
              EĞRİLER, PERDELER VE AZALTILMIŞ HAREKET
            </h3>
          </div>
          <p className={`type-body ${styles.subLead}`}>
            Sıfır yay sıçramalı deterministik yavaşlama eğrileri. Tüm hareketli levhalar ve ince
            çizgi kuralları, <code>prefers-reduced-motion: reduce</code> altında anında görünür
            duruma geçer.
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
                CANLI PLATECURTAIN + HAIRLINEDRAW + SİVRİ KEMER AÇILIMI
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
