'use client';

import { AlignmentStar } from '@/components/DraftingMarks';
import styles from './WebSunum.module.css';

export function WebSunumClient({
  trellickSvg,
  chartresSvg,
}: {
  trellickSvg: string;
  chartresSvg: string;
}) {
  return (
    <div data-surface="void" className={styles.root}>
      {/* ===================================================================
          BÖLÜM 1: TEK UZUN MASAÜSTÜ + ÇEVRESİNDE MOBİL EKRANLAR (REFERANS 1)
         =================================================================== */}
      <section className={styles.showcaseSection}>
        <header className={styles.sectionHeader}>
          <h1 className={`type-display ${styles.sectionTitle}`}>Tasarım</h1>
          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            MONOLITH · EDİSYON 04 · HALİL ANIK
          </span>
        </header>

        <div className={styles.orbitStage}>
          {/* Left Floating Mobiles & Vector Marks */}
          <div className={styles.leftWing}>
            <div className={styles.floatingSvg} dangerouslySetInnerHTML={{ __html: trellickSvg }} aria-hidden="true" />

            <figure className={styles.mobileCard}>
              <img
                src="/design-system/templates/mobile-archive.png"
                alt="Arşiv mobil ekranı"
                className={styles.shotImg}
              />
            </figure>

            <AlignmentStar className={styles.floatingStar} />
          </div>

          {/* Center Full-Page Desktop Scroll */}
          <figure className={styles.centerDesktop}>
            <div className={styles.desktopMeta}>
              <span className="type-colophon">ANA SAYFA // /</span>
              <span className="type-colophon">1440 PX TAM SAYFA</span>
            </div>
            <img
              src="/design-system/templates/home-full.png"
              alt="MONOLITH Ana Sayfa tam boy görünümü"
              className={styles.shotImg}
            />
          </figure>

          {/* Right Floating Mobiles & Vector Marks */}
          <div className={styles.rightWing}>
            <figure className={styles.mobileCard}>
              <img
                src="/design-system/templates/mobile-home.png"
                alt="Ana Sayfa mobil ekranı"
                className={styles.shotImg}
              />
            </figure>

            <div className={styles.floatingSvg} dangerouslySetInnerHTML={{ __html: chartresSvg }} aria-hidden="true" />

            <figure className={styles.mobileCard}>
              <img
                src="/design-system/templates/mobile-anatomy.png"
                alt="Anatomi mobil ekranı"
                className={styles.shotImg}
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ===================================================================
          BÖLÜM 2: TEL KAFES (WIREFRAME) VS SON TASARIM (REFERANS 2)
         =================================================================== */}
      <section className={styles.showcaseSection}>
        <header className={styles.sectionHeader}>
          <h2 className={`type-display ${styles.sectionTitle}`}>Tel Kafes &amp; Son Tasarım</h2>
          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            YAPI İSKELETİ VE UYGULANMIŞ HALİ
          </span>
        </header>

        <div className={styles.compareGrid}>
          {/* Left: Clean MONOLITH Wireframe Column */}
          <div className={styles.wireframeCol} aria-label="Ana sayfa tel kafes şeması">
            <div className={styles.wireTopBar}>
              <span />
              <span />
            </div>

            <div className={styles.wireHero}>
              <div className={styles.wireHeroText}>
                <div className={styles.wireLineLg} />
                <div className={styles.wireLineLg} />
                <div className={styles.wireLineSm} />
                <div className={styles.wireBtn} />
              </div>
              <div className={styles.wireBox} />
            </div>

            <div className={styles.wireBand}>
              <div className={styles.wireLineSm} />
              <div className={styles.wireCards4}>
                <div className={styles.wireBox} />
                <div className={styles.wireBox} />
                <div className={styles.wireBox} />
                <div className={styles.wireBox} />
              </div>
            </div>

            <div className={styles.wireSplit}>
              <div className={styles.wireBox} />
              <div className={styles.wireHeroText}>
                <div className={styles.wireLineMd} />
                <div className={styles.wireLineSm} />
                <div className={styles.wireLineSm} />
              </div>
            </div>

            <div className={styles.wireCards3}>
              <div className={styles.wireBox} />
              <div className={styles.wireBox} />
              <div className={styles.wireBox} />
            </div>

            <div className={styles.wireFooter}>
              <div className={styles.wireLineMd} />
              <div className={styles.wireLineSm} />
            </div>
          </div>

          {/* Right: Actual Full-Page Design */}
          <figure className={styles.compareFinal}>
            <img
              src="/design-system/templates/home-full.png"
              alt="MONOLITH Ana Sayfa son tasarım"
              className={styles.shotImg}
            />
          </figure>
        </div>
      </section>

      {/* ===================================================================
          BÖLÜM 3: DİĞER ANA SAYFALAR (TAM BOY)
         =================================================================== */}
      <section className={styles.showcaseSection}>
        <header className={styles.sectionHeader}>
          <h2 className={`type-display ${styles.sectionTitle}`}>Alt Sayfalar</h2>
          <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
            ARŞİV · YAPI DETAYI · ANATOMİ
          </span>
        </header>

        <div className={styles.pagesTrio}>
          <figure className={styles.pageColumn}>
            <figcaption className={styles.pageCaption}>
              <span className="type-colophon">ARŞİV KATALOĞU</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                /archive
              </span>
            </figcaption>
            <img
              src="/design-system/templates/archive-full.png"
              alt="MONOLITH Arşiv tam sayfa görünümü"
              className={styles.shotImg}
            />
          </figure>

          <figure className={styles.pageColumn}>
            <figcaption className={styles.pageCaption}>
              <span className="type-colophon">YAPI MONOGRAFİSİ</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                /structures/[slug]
              </span>
            </figcaption>
            <img
              src="/design-system/templates/detail-full.png"
              alt="MONOLITH Yapı Detay tam sayfa görünümü"
              className={styles.shotImg}
            />
          </figure>

          <figure className={styles.pageColumn}>
            <figcaption className={styles.pageCaption}>
              <span className="type-colophon">ANATOMİ TEZGAHI</span>
              <span className="type-colophon" style={{ color: 'var(--ink-secondary)' }}>
                /anatomy
              </span>
            </figcaption>
            <img
              src="/design-system/templates/anatomy-full.png"
              alt="MONOLITH Anatomi tam sayfa görünümü"
              className={styles.shotImg}
            />
          </figure>
        </div>

        <footer className={styles.footerCredit}>
          <span className="type-colophon">HALİL ANIK</span>
          <AlignmentStar className={styles.footerStar} />
          <span className="type-colophon tabular-nums">2026</span>
        </footer>
      </section>
    </div>
  );
}
