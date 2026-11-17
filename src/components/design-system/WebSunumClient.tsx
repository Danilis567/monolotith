'use client';

import { AlignmentStar, CornerCrosshair, SteppedFrame } from '@/components/DraftingMarks';
import styles from './WebSunum.module.css';

function FrameCorners() {
  return (
    <>
      <CornerCrosshair className={styles.crosshairTL} />
      <CornerCrosshair className={styles.crosshairTR} />
      <CornerCrosshair className={styles.crosshairBL} />
      <CornerCrosshair className={styles.crosshairBR} />
    </>
  );
}

export function WebSunumClient({
  trellickSvg,
  chartresSvg,
  pantheonSvg,
}: {
  trellickSvg: string;
  chartresSvg: string;
  pantheonSvg: string;
}) {
  return (
    <div data-surface="void" className={styles.canvasRoot}>
      <div className={styles.workspace}>
        {/* =================================================================
            PAFTA 00 // KAPAK
            ================================================================= */}
        <section aria-labelledby="ws-cover-title" className={styles.canvasFrame}>
          <FrameCorners />
          <SteppedFrame style={{ color: 'var(--border-hairline)' }} />
          <div className={styles.frameHeader}>
            <span className={`type-colophon ${styles.frameLabel}`}>
              <span className="signal-dot" aria-hidden="true" />
              PAFTA 00 // KAPAK
            </span>
            <span className={`type-colophon ${styles.frameTag}`}>
              WEB SUNUMU // EDİSYON 04
            </span>
          </div>

          <h1 id="ws-cover-title" className={`type-monolith ${styles.coverTitle}`}>
            MONOLITH WEB SUNUMU
          </h1>

          <dl className={styles.coverLedger}>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>SÜRÜM</dt>
              <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>04</dd>
            </div>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>TARİH</dt>
              <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>17 / 11 / 2026</dd>
            </div>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>KAPSAM</dt>
              <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                4 ANA SAYFA · 27 YAPI
              </dd>
            </div>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>ÇİZİMLER</dt>
              <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>9 ORTOGRAFİK KESİT</dd>
            </div>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>TASARIM</dt>
              <dd className={`type-subhead ${styles.ledgerVal}`}>HALİL ANIK</dd>
            </div>
          </dl>

          <p className={`type-body-lead ${styles.coverNote}`}>
            MONOLITH web sitesinin ana sayfaları, yapı arşivi ve etkileşimli teknik çizim ekranı.
          </p>
        </section>

        {/* =================================================================
            PAFTA 01 // ANA SAYFA (/)
            ================================================================= */}
        <section aria-labelledby="ws-home-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-home-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 01 / ANA SAYFA ( / )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              KARŞILAMA · ÖNE ÇIKAN YAPI · YATAY AKIŞ
            </span>
          </div>

          <div className={styles.splitSection}>
            <div className={styles.copyCol}>
              <h3 className="type-display">SERGİ ANA SAYFASI</h3>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Ziyaretçiyi ilk karşılayan sayfa. Üstte günün öne çıkan yapısı ve büyük tipografi,
                altta yatay kayan yapı bandı (Specimen Stream) ve üç akım özeti yer alır.
              </p>
              <ul className={styles.factList}>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    01 // ÜST ALAN
                  </span>
                  <span>Büyük Bodoni Moda başlığı ve seçili yapının tam boy fotoğrafı.</span>
                </li>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    02 // YATAY ŞERİT
                  </span>
                  <span>Üzerine gelindiğinde veya duraklatıldığında o anki karede duran akış.</span>
                </li>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    03 // AKIMLAR
                  </span>
                  <span>Brütalist, Gotik ve Anıtsal yapı gruplarına tek tıkla geçiş.</span>
                </li>
              </ul>
            </div>

            <div className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">ROTA: /</span>
                <span className="type-colophon">1440 × 900</span>
              </div>
              <img
                src="/design-system/templates/home.png"
                alt="MONOLITH Ana Sayfa ekran görüntüsü"
                className={styles.screenImg}
              />
            </div>
          </div>

          {/* 3 Architectural Movement Strip */}
          <div className={styles.trioPhotoRow}>
            <figure className={styles.photoCard}>
              <img
                src="/images/buildings/trellick-tower.jpg"
                alt="Trellick Tower — Brütalist"
                className={`plate-img ${styles.photoImg}`}
              />
              <figcaption className={styles.photoCap}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  CAT. 001 · BRÜTALİST
                </span>
                <span className="type-subhead">Trellick Tower</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  LONDRA · 1972 · 98.0 M
                </span>
              </figcaption>
            </figure>

            <figure className={styles.photoCard}>
              <div className={`plate-arch-lancet ${styles.lancetWrap}`}>
                <img
                  src="/images/buildings/chartres-cathedral.jpg"
                  alt="Chartres Katedrali — Gotik"
                  className={`plate-img ${styles.photoImg}`}
                />
              </div>
              <figcaption className={styles.photoCap}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  CAT. 010 · GOTİK
                </span>
                <span className="type-subhead">Chartres Cathedral</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  CHARTRES · 1220 · 113.0 M
                </span>
              </figcaption>
            </figure>

            <figure className={styles.photoCard}>
              <img
                src="/images/buildings/anitkabir.jpg"
                alt="Anıtkabir — Anıtsal"
                className={`plate-img ${styles.photoImg}`}
              />
              <figcaption className={styles.photoCap}>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  CAT. 023 · ANITSAL
                </span>
                <span className="type-subhead">Anıtkabir</span>
                <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                  ANKARA · 1953 · 21.0 M
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* =================================================================
            PAFTA 02 // ARŞİV DİZİNİ (/archive)
            ================================================================= */}
        <section aria-labelledby="ws-archive-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-archive-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 02 / ARŞİV DİZİNİ ( /archive )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              27 YAPI · PLAKA &amp; TABLO GÖRÜNÜMÜ · FİLTRELEME
            </span>
          </div>

          <div className={`${styles.splitSection} ${styles.splitReverse}`}>
            <div className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">ROTA: /archive</span>
                <span className="type-colophon">PLAKA / DİZİN MODU</span>
              </div>
              <img
                src="/design-system/templates/archive.png"
                alt="MONOLITH Arşiv Sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </div>

            <div className={styles.copyCol}>
              <h3 className="type-display">27 YAPILIK KATALOG</h3>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Tüm yapıların tek ekranda aranabildiği ve filtrelenebildiği katalog sayfası.
                Ziyaretçi tek düğmeyle kartlı görünüm ile yoğun veri tablosu arasında geçiş yapar.
              </p>
              <ul className={styles.factList}>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    01 // FİLTRELER
                  </span>
                  <span>Akım, ana malzeme, dönem ve anlık metin araması URL ile eşzamanlı çalışır.</span>
                </li>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    02 // [ PLATE ] MODU
                  </span>
                  <span>Yüksek kontrastlı siyah-beyaz fotoğraflar ve temel künye verileri.</span>
                </li>
                <li>
                  <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                    03 // [ INDEX ] MODU
                  </span>
                  <span>Katalog numarası, şehir, yıl ve yükseklik sütunlarıyla sıralanabilir tablo.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =================================================================
            PAFTA 03 // YAPI DETAY DOSYASI (/structures/[slug])
            ================================================================= */}
        <section aria-labelledby="ws-detail-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-detail-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 03 / YAPI DETAY DOSYASI ( /structures/[slug] )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              27 STATİK MONOGRAFİ SAYFASI
            </span>
          </div>

          <div className={styles.splitSection}>
            <div className={styles.copyCol}>
              <h3 className="type-display">TEKNİK KÜNYE VE METİN</h3>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Her yapı için ayrılmış özel detay sayfası. Fotoğrafın yanında mimar, yapım yılı,
                yükseklik, GPS koordinatı ve taşıyıcı sistem notları yer alır.
              </p>
              <dl className={styles.specTable}>
                <div>
                  <dt className="type-colophon">ÖRNEK KAYIT</dt>
                  <dd className="type-subhead">CAT. 001 — Trellick Tower</dd>
                </div>
                <div>
                  <dt className="type-colophon">KONUM &amp; KOORDİNAT</dt>
                  <dd className="type-colophon tabular-nums">51°31′25″N × 0°12′20″W</dd>
                </div>
                <div>
                  <dt className="type-colophon">YÜKSEKLİK</dt>
                  <dd className="type-colophon tabular-nums">98.0 M (31 KAT)</dd>
                </div>
              </dl>
            </div>

            <div className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">ROTA: /structures/trellick-tower</span>
                <span className="type-colophon">STATİK SSG</span>
              </div>
              <img
                src="/design-system/templates/detail.png"
                alt="MONOLITH Yapı Detay Sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </div>
          </div>
        </section>

        {/* =================================================================
            PAFTA 04 // ANATOMİ ÇALIŞMA TEZGAHI (/anatomy)
            ================================================================= */}
        <section aria-labelledby="ws-anatomy-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-anatomy-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 04 / ANATOMİ TEZGAHI ( /anatomy )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              YAKINLAŞTIRMA · KATMANLAR · ÖLÇÜ İNCELEME
            </span>
          </div>

          <div className={styles.anatomyHero}>
            <div className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">ROTA: /anatomy</span>
                <span className="type-colophon">9 VEKTÖR KESİT PLAKASI</span>
              </div>
              <img
                src="/design-system/templates/anatomy.png"
                alt="MONOLITH Anatomi Çalışma Tezgahı ekran görüntüsü"
                className={styles.screenImg}
              />
            </div>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureBox}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                01 // YAKINLAŞTIR &amp; SÜRÜKLE
              </span>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Fare tekerleği, düğmeler veya parmakla yakınlaştırma ve çizim üzerinde serbest
                gezinme.
              </p>
            </div>
            <div className={styles.featureBox}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                02 // 3 AYRI KATMAN
              </span>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Taşıyıcı kütle (beyaz), yük ekseni (kırmızı kesikli) ve ölçü çizgileri (gri) ayrı
                ayrı açılıp kapatılır.
              </p>
            </div>
            <div className={styles.featureBox}>
              <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                03 // ELEMAN AÇIKLAMALARI
              </span>
              <p className="type-body" style={{ color: 'var(--ink-secondary)' }}>
                Çizim üzerindeki numaralı noktalara veya ölçülere tıklayınca ilgili yapısal not
                açılır.
              </p>
            </div>
          </div>

          {/* 3 Vector Section Plates */}
          <div className={styles.vectorRow}>
            <div className={styles.vectorCard}>
              <div
                className={styles.vectorSvg}
                dangerouslySetInnerHTML={{ __html: trellickSvg }}
                aria-hidden="true"
              />
              <div className={styles.vectorFoot}>
                <span className="type-colophon">CAT. 001 // TRELLICK TOWER</span>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  KESİT 1:500
                </span>
              </div>
            </div>

            <div className={styles.vectorCard}>
              <div
                className={styles.vectorSvg}
                dangerouslySetInnerHTML={{ __html: chartresSvg }}
                aria-hidden="true"
              />
              <div className={styles.vectorFoot}>
                <span className="type-colophon">CAT. 010 // CHARTRES CATHEDRAL</span>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  KESİT 1:250
                </span>
              </div>
            </div>

            <div className={styles.vectorCard}>
              <div
                className={styles.vectorSvg}
                dangerouslySetInnerHTML={{ __html: pantheonSvg }}
                aria-hidden="true"
              />
              <div className={styles.vectorFoot}>
                <span className="type-colophon">CAT. 019 // PANTHEON ROME</span>
                <span className="type-colophon" style={{ color: 'var(--signal-ink)' }}>
                  KESİT 1:400
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            PAFTA 05 // YÜZEY RİTMİ VE TEKNİK ÖZET
            ================================================================= */}
        <section aria-labelledby="ws-closing-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-closing-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 05 / YÜZEY RİTMİ VE KAPANIŞ
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              KOYU &amp; AÇIK GEÇİŞLER · HALİL ANIK
            </span>
          </div>

          <div className={styles.surfaceStrip}>
            <div className={styles.surfaceSample} data-surface="void">
              <span className="type-colophon">VOID // #131313</span>
              <strong className="type-subhead">Ana zemin ve anatomi sahnesi</strong>
            </div>
            <div className={styles.surfaceSample} data-surface="basalt">
              <span className="type-colophon">BASALT // #282828</span>
              <strong className="type-subhead">Akış bandı ve ikincil bölmeler</strong>
            </div>
            <div className={styles.surfaceSample} data-surface="plaster">
              <span className="type-colophon">PLASTER // #EAE6E1</span>
              <strong className="type-subhead">Açık renk okuma ve detay blokları</strong>
            </div>
            <div className={styles.surfaceSample} data-surface="limestone">
              <span className="type-colophon">LIMESTONE // #B9B5AA</span>
              <strong className="type-subhead">Vurgulu alıntı ve dipnot şeritleri</strong>
            </div>
          </div>

          <footer className={styles.closingFooter}>
            <div className={styles.closingBrand}>
              <AlignmentStar className={styles.closingStar} />
              <span className="type-colophon">MONOLITH WEB SUNUMU · EDİSYON 04</span>
            </div>
            <span className="type-colophon">TASARIM VE GELİŞTİRME: HALİL ANIK · 2026</span>
          </footer>
        </section>
      </div>
    </div>
  );
}
