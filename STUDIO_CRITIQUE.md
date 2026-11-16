# MONOLITH — Stüdyo Jürisi & Arayüz Tartışması

> **Katılımcılar:**
> - **1. Düz Kullanıcı** *(Sıradan Ziyaretçi)*
> - **2. Düz Kullanıcı** *(Pratik Ziyaretçi)*
> - **UI/UX Tasarım Uzmanı** *(Jüri Üyesi)*
> - **Öğrenci / Tasarımcı** *(Savunucu)*

---

## 1. Düz Kullanıcı (Sıradan Ziyaretçi)

Eline sağlık, siteyi ilk açtığımda siyah-beyaz fotoğraflar ve o dev `MASS CAST UNDER GRAVITY` başlığı gerçekten çok havalı, adeta bir sergi kataloğu gibi duruyor. Ama açıkçası ana sayfanın en tepesinde `FOLIO IV`, `DATUM: WGS84 / METRIC`, `INDEXED: 27 PLATES` gibi yazılar görünce bir an duraksadım; kendi kendime *"bu ne demek şimdi, ben sadece ilginç binalara bakacaktım, yanlışlıkla teknik bir harita sistemine mi girdim"* dedim.

Hele `MONOLITHIC BÉTON BRUT` gibi ifadelerle koyu renkli Anatomy sayfasındaki teknik katmanlar bana bayağı yabancı geldi, neye tıkladığımı anlamakta zorlandım. Görsel atmosferi ve o ciddi havayı çok beğendim ama mimarlık bilmeyen sıradan bir ziyaretçi olarak bu terimlerin arasında kaybolmadan binaların hikayesini okumak isterdim. Sence bu ağır jargonu biraz sadeleştirsek sitenin o karizması gerçekten bozulur mu?

---

## 2. Düz Kullanıcı (Pratik Ziyaretçi)

Açıkçası siteye ilk girdiğimde burası bir uygulama mı yoksa online bir mimarlık dergisi mi pek çözemedim; her yer gri, siyah ve krem tonlarında, insan gözü ister istemez bir tane bile olsa canlı renkli bir buton ya da renkli bir fotoğraf arıyor. `SURVEYED PLATES` kısmındaki o bir uçtan öbür uca akan fotoğraf şeridi ilk bakışta havalı duruyor ama bir binanın adına ya da yılına odaklanmaya çalışırken kayıp gitmesi biraz başımı döndürdü, sağ üstteki `PAUSE STREAM` butonunu da ancak dikkatlice bakınca fark ettim; keşke üstüne gelince kendiliğinden dursaymış.

Alttaki yeni footer bölümü ise eskisi gibi ekranı kaplayan dev bir yazı yerine çok daha derli toplu ve düzenli görünüyor, en azından aradığın bölümlere veya `TOP OF FOLIO` butonuna hemen ulaşabiliyorsun. Ama oradaki `DATUM: WGS84 / METRIC` ya da `ORIGINAL VECTOR (REV. IV)` gibi ifadeler bana biraz fazla teknik ve ciddi geldi, sanki normal bir ziyaretçiye değil de harita mühendislerine yazılmış gibi duruyor. Yine de Pinterest'teki karmaşadan sonra bu sakinlik fena değil, sadece biraz daha günlük kullanıcı dostu ve sıcak olabilirmiş.

---

## 3. UI/UX Tasarım Uzmanı (Jüri Üyesi)

Kök ölçeği `font-size: 85%` seviyesine çekip masaüstünde `#main-content` için `%12.5` kenar boşluğu tanımlaman, ekrana baskıdan çıkmış bir mimari monografi ciddiyeti ve nefes alan bir editoryal ritim kazandırmış. Tam da bu sıkı çerçeve içinde `SpecimenStream` (`.specimen-stream-viewport`) şeridinin `border-inline: 0` ile kenar boşluklarını delip tam genişliğe (*full-bleed*) taşması, durağan sayfa düzenini kıran bilinçli ve dinamik bir mekânsal gerilim yaratıyor.

Yeni `SiteFooter` tasarımında `upperBand` içindeki `1.25fr / 0.75fr` bölünmesiyle manifesto ve `colophonCard` teknik künyesini ayırıp, altında `directoryGrid` üzerinde `1fr / 1.2fr / 0.8fr` asimetrik bir hiyerarşi kurman, sayfa sonunu sıradan bir link alanından çıkarıp yapısal bir bitiş bloğuna dönüştürmüş. `/anatomy` sayfasını kalıcı koyu (`data-surface="void"`) yüzeyde kilitlemek ise, kesit çizimlerini ve katman kontrollerini (`Structural Mass`, `Load & Axis`, `Dimensions`) bir ışıklı çizim masası atmosferine oturtarak işlevsel odaklanmayı güçlendiriyor.

Ancak burada jüri olarak altını çizmem gereken keskin bir gerilim var: brutalist-gotik müze kataloğu kimliğini besleyen bu yoğun teknik jargon (`WGS84 / METRIC`, `VOL. IV`, katman terminolojisi) ve yüksek bilgi yoğunluğu, alan dışından gelen düz kullanıcıda ciddi bir bilişsel yük ve dışlanmışlık hissi yaratıyor. Arayüzün kendini seçkinci bir arşiv gibi konumlandırırken gündelik anlaşılırlıktan ödün vermesi, güçlü editoryal tasarımların düşebileceği en keskin tuzaktır.

**Jüri Sorusu:** Bu yüksek mimari otoriteyi ve brutalist atmosferi zedelemeden, ilk kez gelen bir kullanıcının bu teknik kodları ve etkileşimli katmanları tereddüt etmeden çözebilmesi için arayüzde hangi yönlendirici mikro-ipuçlarını veya kademeli bilgi katmanlarını kurgulayacaksın?

---

## 4. Öğrenci / Tasarımcı (Savunucu)

Hocam ve arkadaşlar, hepinizin eleştirilerini not aldım — ama önce projeyi savunmama izin verin! Ben bu siteyi *"herkesin kaydırıp geçtiği renkli bir SaaS landing page"* ya da *"Pinterest panosu"* olsun diye yapmadım; tasarım hedefimiz tam olarak **müze kataloğu ve mimari dergi** hissi veren editoryal bir yayın kurmaktı.

- **Renkler ve ciddiyet konusunda:** Siyah-beyaz fotoğraflar ve `#131313` / `#E9E5DF` beton paleti tesadüf değil; brüt betonun ve gotik taş işçiliğinin ağırlığını ancak renk gürültüsünü keserek verebilirdim. Tek vurgu rengimiz olan vermilion kırmızısını da özellikle sadece kritik sinyal noktalarında kullandım.
- **Tam genişlikte `SURVEYED PLATES` akışı konusunda:** `%12.5` kenar boşluğunu tüm sayfaya uygulayıp sadece bu şeridi ekranın iki ucuna taşırarak (*full-bleed*) bilerek bir *"film şeridi / kesit akışı"* etkisi yarattım. Aslında CSS'te kartların üzerine mouse ile gelince (`:hover`) veya klavyeyle odaklanınca (`:focus-within`) akış duruyor; ama kullanıcıya bunun duracağını hissettiren bir ipucu koymadığım için baş döndürücü gelmiş — bunu kabul ediyorum.
- **`/anatomy` bölümünün hep siyah olması:** Kesit çizimleri ve kırmızı taşıyıcı akslar beyaz kâğıtta soluk kalıyordu; siyah `void` yüzeyde hem çizgiler parlıyor hem de teknik bir ışıklı çizim masası hissi veriyor.
- **Jüri sorusuna cevabım (Ağır jargon vs. kullanıcı dostluğu):** Karizmayı bozmadan bunu iki somut adımla çözebilirim:
  1. **Kademeli açıklama (*Progressive Disclosure*):** `BÉTON BRUT` veya `WGS84` gibi terimleri silmek yerine, üstüne gelindiğinde veya alt satırında sade İngilizce açıklamalar (`raw poured concrete`, `GPS coordinates`) gösterebilirim. Böylece dergi tonu kalır ama kimse *"yanlışlıkla harita uygulamasına mı girdim"* demez.
  2. **Sessiz yönlendirme ipuçları:** `/anatomy` katman butonlarının yanına tek satırlık net bir yönlendirme (`Toggle layers below to inspect load path`) ve `SURVEYED PLATES` şeridine `Hover any plate to pause` gibi küçük bir mikro-ipucu eklersem, hem mimari otoriteyi koruruz hem de ilk kez giren kullanıcıyı elinden tutmuş oluruz.
