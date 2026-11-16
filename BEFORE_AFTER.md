# MONOLITH — Jüri Geri Bildirimi Revizesi: Önce / Sonra Görsel Karşılaştırma (`BEFORE_AFTER.md`)

Bu doküman, 4 kişilik stüdyo jürisinden (`STUDIO_CRITIQUE.md`) gelen bulgular (`B1`–`B6`) doğrultusunda uygulanan kademeli açıklama (*progressive disclosure*), *"önce sade, sonra kod"* etiketleme, etkileşim netliği ve eylem hiyerarşisi revizyonlarının **Playwright ile üretilmiş gerçek önce/sonra ekran görüntüleri** üzerinden karşılaştırmasını içerir.

---

## 1. İlk Ekran & Hero Telemetri Şeridi (`B1`, `B5`, `B6`)

- **Önce:** [audit-screenshots/jury-before/home-1280-top.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-before/home-1280-top.png)
  - Üst telemetri şeridinde yalnızca teknik kodlar (`FOLIO IV`, `SURVEY SCOPE: 27 PLATES · 4 CONTINENTS`, `DATUM: WGS84 / METRIC`) yer alıyordu.
  - Sağ dikey rayda `LONDON / BÉTON BRUT` tek başına görünüyordu.
  - Birincil ve ikincil butonlar arasındaki hiyerarşi yalnızca hafif dolgu farkına dayanıyordu.
- **Sonra:**
  - [audit-screenshots/jury-after/home-1280-top.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/home-1280-top.png) (`1280×800`)
  - [audit-screenshots/jury-after/home-375-top.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/home-375-top.png) (`375×812`)
  - [audit-screenshots/jury-after/home-gloss-open-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/home-gloss-open-1280.png) (`WGS84 [ ? ]` açık hali)
  - **Değişiklikler:** `ARCHIVE VOLUME IV`, `27 BUILDINGS · 4 CONTINENTS`, `COORDINATES: GPS (WGS84 [ ? ]) · UNITS: METRES` ile sade dil öne alındı; sağ ray `LONDON / RAW CONCRETE (BÉTON BRUT)` oldu; `WGS84 [ ? ]` açılır sözlük kutusu (`z-index: 60`) sıfır radius ve `1px` hairline kenarlıkla çakışmasız şekilde açılıyor; `ENTER ARCHIVE →` birincil eylemi sol vermilion şerit + ters kontrast (`#E9E5DF` / `#131313`) ile tek birincil CTA olarak ayrıştı.

---

## 2. `SURVEYED PLATES` (`SpecimenStream`) Etkileşimi (`B3`)

- **Önce:** [audit-screenshots/jury-before/home-stream-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-before/home-stream-1280.png)
  - `54s` hızında akan şeritte `PAUSE STREAM [ || ]` düğmesi düşük kontrastlıydı ve kullanıcıya hover/dokunma ile durdurabileceği belirtilmiyordu.
- **Sonra:** [audit-screenshots/jury-after/home-stream-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/home-stream-1280.png)
  - Bağımsız [SpecimenStream.tsx](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/src/components/SpecimenStream.tsx) bileşenine taşındı; hız okunabilir `88s` seviyesine indirildi.
  - Tam genişlikte (*full-bleed*, `border-inline: 0`) film şeridi korunurken başlık satırına pointer cihazlar için `HOVER A PLATE TO HOLD`, dokunmatik cihazlar için `@media (hover: none)` ile `TAP A PLATE TO HOLD` ipucu eklendi.
  - `44×44 px` hedefli `■ PAUSE STREAM [ || ]` / `PLAY STREAM [ ▶ ]` kontrolü yüksek kontrastlı hale getirildi; hover, `focus-within` ve dokunma ile durduğu (`animationPlayState: "paused"`) doğrulandı.

---

## 3. `/anatomy` İlk Kullanım Netliği ve Kalıcı Koyu Yüzey (`B2`, `B6`)

- **Önce:** [audit-screenshots/jury-before/anatomy-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-before/anatomy-1280.png)
  - Katman düğmeleri (`STRUCTURAL MASS`, `LOAD & AXIS`, `DIMENSIONS`) teknik başlıklar dışında ne işe yaradığını açıklamıyordu ve okuma kılavuzu yoktu.
- **Sonra:**
  - [audit-screenshots/jury-after/anatomy-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/anatomy-1280.png) (`1280×800`)
  - [audit-screenshots/jury-after/anatomy-375.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/anatomy-375.png) (`375×812`, sıfır yatay taşma)
  - **Değişiklikler:** Kalıcı `data-surface="void"` koyu yüzey korundu; üst banda `READING GUIDE [ + ]` eklendi; hareket sekmelerine `FILTER BY MOVEMENT:` ön etiketi verildi; `TOGGLE LAYERS TO READ THE LOAD PATH [ ? ]` yönlendirmesi altında her katman düğmesine düz dil açıklaması (`the building's solid mass`, `lines showing how weight travels`, `measured heights and spans`) ve 9 plakanın tamamına `WHAT YOU ARE LOOKING AT` tek cümlelik alt açıklaması eklendi.

---

## 4. `SiteFooter` Sadeleştirilmiş Müze Kolofonu (`B4`)

- **Önce:** [audit-screenshots/jury-before/footer-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-before/footer-1280.png)
  - `ARCHITECTURAL MONOGRAPH · VOL. IV`, `DATUM: WGS84 / METRIC`, `ORIGINAL VECTOR (REV. IV)`, `MMXXVI` ve `TOP OF FOLIO` ifadeleri mühendislik/matbaa jargonu taşıyordu.
- **Sonra:** [audit-screenshots/jury-after/footer-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/footer-1280.png)
  - Asimetrik 2 bölgeli yapı (`1.25fr / 0.75fr` ve `1fr / 1.2fr / 0.8fr`) korunarak `COORDINATES: GPS (WGS84) · METRES`, `COLLECTION: 27 CATALOGED BUILDINGS`, `PHOTOGRAPHS: WIKIMEDIA COMMONS (OPEN LICENSE)`, `DRAWINGS: ORIGINAL, DRAWN FOR THIS ARCHIVE`, `HEIGHT SCALE · 00 TO 120 METRES` ve `BACK TO TOP ↑` sadeleştirmeleri uygulandı.

---

## 5. Arşiv & Yapı Detay Sayfası (`Archive` & `Hagia Sophia`)

- **Sonra:**
  - [audit-screenshots/jury-after/archive-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/archive-1280.png)
  - [audit-screenshots/jury-after/structure-hagia-sophia-1280.png](file:///c:/Users/Danil/.gemini/antigravity-ide/scratch/neo-brutal/audit-screenshots/jury-after/structure-hagia-sophia-1280.png)
  - `/archive` üzerinde `CATALOG VOLUME IV · 27 BUILDINGS` + `READING GUIDE [ + ]` eklendi; yapı detay sayfalarında `WGS84 [ ? ]`, `HEIGHT DATUM [ ? ]`, `LOAD PATH [ ? ]` ve `DATUM [ ? ]` kademeli sözlük tetikleyicileri yerleştirildi.
