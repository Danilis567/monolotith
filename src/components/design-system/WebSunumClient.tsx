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

export function WebSunumClient() {
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
              <dt className={`type-colophon ${styles.ledgerKey}`}>SAYFALAR</dt>
              <dd className={`type-subhead tabular-nums ${styles.ledgerVal}`}>
                4 ANA SAYFA · 27 DETAY
              </dd>
            </div>
            <div className={styles.ledgerCell}>
              <dt className={`type-colophon ${styles.ledgerKey}`}>TASARIM</dt>
              <dd className={`type-subhead ${styles.ledgerVal}`}>HALİL ANIK</dd>
            </div>
          </dl>

          <p className={`type-body-lead ${styles.coverNote}`}>
            MONOLITH web sitesinin sayfaları, masaüstü ve mobil ekran görüntüleri.
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
            <span className={`type-colophon ${styles.frameTag}`}>KARŞILAMA VE SERGİ AKIŞI</span>
          </div>

          <div className={styles.introBlock}>
            <h3 className="type-display">SERGİ ANA SAYFASI</h3>
            <p className={`type-body ${styles.introLead}`}>
              Ziyaretçiyi ilk karşılayan sayfa. Üstte öne çıkan yapıyı ve büyük başlığı, altta
              yatay kayan yapı şeridini (üzerine gelince durur) ve üç mimari akımı gösterir.
            </p>
          </div>

          <div className={styles.twoUpGrid}>
            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">01A // ÜST KARŞILAMA ALANI</span>
                <span className="type-colophon">ROTA: /</span>
              </div>
              <img
                src="/design-system/templates/home.png"
                alt="MONOLITH Ana Sayfa üst ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>

            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">01B // YATAY AKIŞ ŞERİDİ</span>
                <span className="type-colophon">ROTA: / (ALT BÖLÜM)</span>
              </div>
              <img
                src="/design-system/templates/home-stream.png"
                alt="MONOLITH Ana Sayfa yatay akış şeridi ekran görüntüsü"
                className={styles.screenImg}
              />
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
              PAFTA 02 / ARŞİV ( /archive )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>27 YAPI · İKİ GÖRÜNÜM MODU</span>
          </div>

          <div className={styles.introBlock}>
            <h3 className="type-display">ARŞİV KATALOĞU</h3>
            <p className={`type-body ${styles.introLead}`}>
              Tüm 27 yapının aranabildiği ve akım, malzeme ile döneme göre filtrelenebildiği sayfa.
              Ziyaretçi tek düğmeyle kartlı plaka görünümü ile tablo dizini arasında geçiş yapar.
            </p>
          </div>

          <div className={styles.twoUpGrid}>
            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">02A // [ PLATE ] KART GÖRÜNÜMÜ</span>
                <span className="type-colophon">ROTA: /archive</span>
              </div>
              <img
                src="/design-system/templates/archive.png"
                alt="MONOLITH Arşiv kart görünümü ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>

            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">02B // [ INDEX ] TABLO GÖRÜNÜMÜ</span>
                <span className="type-colophon">ROTA: /archive?view=index</span>
              </div>
              <img
                src="/design-system/templates/archive-index.png"
                alt="MONOLITH Arşiv tablo görünümü ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>
          </div>
        </section>

        {/* =================================================================
            PAFTA 03 // YAPI DETAY SAYFASI (/structures/[slug])
            ================================================================= */}
        <section aria-labelledby="ws-detail-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-detail-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 03 / YAPI DETAYI ( /structures/[slug] )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>27 MONOGRAFİ SAYFASI</span>
          </div>

          <div className={styles.introBlock}>
            <h3 className="type-display">YAPI MONOGRAFİSİ</h3>
            <p className={`type-body ${styles.introLead}`}>
              Her yapıya özel bilgi sayfası. Sol tarafta yüksek kontrastlı yapı fotoğrafı, sağ
              tarafta mimar, yapım yılı, yükseklik, GPS koordinatı ve taşıyıcı sistem notları yer
              alır.
            </p>
          </div>

          <div className={styles.twoUpGrid}>
            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">03A // BRÜTALİST MONOGRAFİ</span>
                <span className="type-colophon">/structures/trellick-tower</span>
              </div>
              <img
                src="/design-system/templates/detail.png"
                alt="Trellick Tower detay sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>

            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">03B // GOTİK MONOGRAFİ</span>
                <span className="type-colophon">/structures/chartres-cathedral</span>
              </div>
              <img
                src="/design-system/templates/detail-gothic.png"
                alt="Chartres Katedrali detay sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>
          </div>
        </section>

        {/* =================================================================
            PAFTA 04 // ANATOMİ TEZGAHI (/anatomy)
            ================================================================= */}
        <section aria-labelledby="ws-anatomy-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-anatomy-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 04 / ANATOMİ TEZGAHI ( /anatomy )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>
              9 VEKTÖR KESİT · YAKINLAŞTIRMA VE KATMANLAR
            </span>
          </div>

          <div className={styles.introBlock}>
            <h3 className="type-display">TEKNİK ÇİZİM İNCELEME EKRANI</h3>
            <p className={`type-body ${styles.introLead}`}>
              9 yapının ortografik kesit çizimlerini inceleme sayfası. Çizime yakınlaşıp
              sürükleyerek gezilebilir; taşıyıcı kütle, yük ekseni ve ölçü çizgileri ayrı katmanlar
              halinde açılıp kapatılabilir.
            </p>
          </div>

          <figure className={styles.screenFrame}>
            <div className={styles.screenBar}>
              <span className="type-colophon">04 // TAM EKRAN ÇİZİM ÇALIŞMA ALANI</span>
              <span className="type-colophon">ROTA: /anatomy</span>
            </div>
            <img
              src="/design-system/templates/anatomy.png"
              alt="MONOLITH Anatomi Çalışma Tezgahı ekran görüntüsü"
              className={styles.screenImg}
            />
          </figure>
        </section>

        {/* =================================================================
            PAFTA 05 // MOBİL GÖRÜNÜM (390 PX)
            ================================================================= */}
        <section aria-labelledby="ws-mobile-title" className={styles.canvasFrame}>
          <FrameCorners />
          <div className={styles.frameHeader}>
            <h2 id="ws-mobile-title" className={`type-colophon ${styles.frameLabel}`}>
              PAFTA 05 / MOBİL GÖRÜNÜM ( 390 × 844 )
            </h2>
            <span className={`type-colophon ${styles.frameTag}`}>TEK SÜTUN DUYARLI DÜZEN</span>
          </div>

          <div className={styles.introBlock}>
            <h3 className="type-display">MOBİL EKRANLAR</h3>
            <p className={`type-body ${styles.introLead}`}>
              Tüm sayfalar telefon ekranında yatay taşma olmadan tek sütuna iner; teknik çizimler
              parmakla yakınlaştırma ve kaydırma desteğiyle rahatça incelenir.
            </p>
          </div>

          <div className={styles.mobileTrioGrid}>
            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">MOBİL // ANA SAYFA</span>
                <span className="type-colophon">390 × 844</span>
              </div>
              <img
                src="/design-system/templates/mobile-home.png"
                alt="MONOLITH mobil ana sayfa ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>

            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">MOBİL // ARŞİV</span>
                <span className="type-colophon">390 × 844</span>
              </div>
              <img
                src="/design-system/templates/mobile-archive.png"
                alt="MONOLITH mobil arşiv sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>

            <figure className={styles.screenFrame}>
              <div className={styles.screenBar}>
                <span className="type-colophon">MOBİL // ANATOMİ</span>
                <span className="type-colophon">390 × 844</span>
              </div>
              <img
                src="/design-system/templates/mobile-anatomy.png"
                alt="MONOLITH mobil anatomi sayfası ekran görüntüsü"
                className={styles.screenImg}
              />
            </figure>
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
