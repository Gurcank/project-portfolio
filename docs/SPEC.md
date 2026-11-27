# SPEC — Gürcan Karadağ portfolio

> Durum: S4 sonrası (2026-11-21). Tasarım yönü §8'de; bütün site metinleri `docs/CONTENT.md`'de; stack, veri modeli ve kararlar `docs/ARCHITECTURE.md`'de; dilim sırası `docs/ROADMAP.md`'de.

## 1. Özet (üç cümle)
- **Amaç:** İstanbul'daki ürün ekiplerine, bir PM adayı olarak nasıl düşündüğümü, ürün sezgimi ve zevkimi gösterip mülakat daveti almak.
- **Hedef kitle:** Staj başvurusunu 30 saniyede tarayan İK/recruiter ile case study okuyan PM/hiring manager.
- **Başarı ölçütü:** Yayından önce 1 kişilik 30 saniye testinde kişinin "kim, ne arıyor, nasıl ulaşırım" sorularını doğru cevaplaması ve yayından sonra iletişim tıklamalarının izleniyor olması. Son karar sahibin (Gürcan) onayıdır.

## 2. Kimlik ve hikâye
- Gürcan Karadağ. İstanbul Okan Üniversitesi, Bilişim Sistemleri ve Teknolojileri, 4. sınıf (mezuniyet Haziran 2027). Ekim 2026 – Şubat 2027 arası Łódź Üniversitesi'nde Erasmus+.
- **Konumlanma: Product Manager.** Tasarım ve kod becerisi başlık değil; "ürünü uçtan uca anlıyorum" iddiasının kanıtı.
- **Ana hikâye:** Soyut ya da dağınık bilgiyi dokunulabilir ürünlere çeviriyorum: harita (ErasmusMap, ATAMap), belgesel akışı (İklim Krizi), el kitabı (Nature & Sport Handbook).
- **Arayış:** Şubat 2027'den itibaren İstanbul'da tam zamanlı, uzun dönem Product stajı.

## 3. Hedef kitle ve istenen davranış
| Kitle | Ne arar | Sitede ne bulmalı |
|---|---|---|
| İK / recruiter | 30 sn'de rol, tarih, şehir, iletişim | Hero'da rol + müsaitlik + tek tık iletişim |
| PM / hiring manager | Karar verme biçimi, ödünleşimler | Case study panelleri, Ürün ilkelerim |

- **Ana aksiyon:** Bana ulaşsın (e-posta veya LinkedIn).
- **Coğrafya:** Yalnızca İstanbul.

## 4. Başarı ölçümü
- Yayın öncesi: 1 kişiye siteyi 30 sn göster, sonra 3 soru sor (kim? ne arıyor? nasıl ulaşırım?). 3/3 doğru = geçti.
- Yayın sonrası: cookie'siz, gizlilik dostu analytics (Umami Cloud; ARCHITECTURE ADR-14). İzlenecek event'ler: `contact_email_click`, `contact_linkedin_click`, `case_study_open`. (CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda'da.)
- Takvim: sabit tarih yok; öncelik kalite.

## 5. Bilgi mimarisi
**Tek uzun sayfa.** Her bölüme anchor ile kaydıran bir nav bar olacak; sayfanın içinde ayrıca deneysel bir gezinme katmanı bulunacak: sol alttaki bölüm göstergesi, tıklanınca sitenin içindekiler listesini kaset kapağı gibi açar (§8). Case study'ler tam ekran **overlay panelde** ("kaset çalar", §8) açılır; URL hash değişir (`#erasmusmap`), böylece link paylaşılabilir. Geri tuşu ve Esc paneli kapatır.

Bölüm sırası (S3'te kesinleşti; metinler CONTENT.md):
1. **Hero:** isim, rol (Product Manager adayı), "Şubat 2027, İstanbul", birincil CTA: İletişim.
2. **Seçili işler:** kaset rafı: 7 proje = 7 kaset; her biri overlay case study açar (§8). Sıra (öne çıkan ★): GK-01 ErasmusMap ★ · GK-02 Novera Mobility · GK-03 SeeYourNextStep · GK-04 ATAMap · GK-05 İklim Krizi · GK-06 Nature & Sport Handbook · GK-07 IDDDergi. Gerekçe ve renkler CONTENT §2.
3. **Ürün ilkelerim:** "Nasıl karar veririm" maddeleri; her madde bir projeden somut örneğe bağlı.
4. **Hakkımda:** Ana hikâye, eğitim, Erasmus.
5. **Bu site nasıl yapıldı:** Sitenin kendi case study'si (SPEC → kararlar → AI destekli iş akışı → vazgeçilenler) + **Krediler/atıflar** (Atatürk fotoğrafı kaynağı, fontlar, asset paketleri).
6. **İletişim:** mailto, LinkedIn, GitHub.

## 6. Kişisel katman: "Site benim odam"
Kişisel katman ayrı bir bölüm değil. Sevdiğim nesneler scroll boyunca içeriğin **arkasında ve kenarlarında** dağınık bir dekor olarak belirir; ana içeriğin önüne asla geçmez. Bir oda sahnesi kurulmayacak.

| Nesne | İçerik | Temsil | Etkileşim |
|---|---|---|---|
| Filmler | taste.md favorileri (14 film) | Kendi tasarımımız: özel tipografili VHS/DVD sırtları ya da filmi çağrıştıran nesne. **Poster kullanılmaz.** | Hover: yalnızca hareket (kalkma/eğilme); metin, puan, yorum yok |
| Müzik | Sanatçılar: Barış Manço, Duran Duran, Mor ve Ötesi, RHCP, Sade, MJ, Bruno Mars. Albümler CONTENT §9. | Kendi tasarımımız plak sırtları. **Kapak görseli kullanılmaz.** (Kaset formu projelere ayrıldı; müzik dekoru plak olarak kalır.) | Hover: yalnızca hareket |
| Bitkiler, doğa, hiking | 7 yer: Likya Yolu, Dilek Yarımadası, Kaz Dağları, Alpler, Fethiye, Datça, Karadeniz (CONTENT §9) | Pixel art (§8). Doğa ve yerler pixel manzaralı **posta pulları** olarak (INS-25). **Doğa fotoğrafı kullanılmaz.** | Hafif, amaçlı hareket |
| Maskot: pixel saksı bitkisi | — | Kodla üretilen pixel sprite (§8) | Okudukça yaprak açar, İletişim'de çiçeklenir; reduced-motion'da sabit |
| Walkman | taste.md film ve şarkı listesi | Pixel walkman (§8) | Tıklanınca rastgele film/şarkı adı. **Dekor değil:** gerçek button, erişilebilir |
| Harita, kolaj, resim | — | Kendi üretimimiz (kod, pixel, Gemini; §8) | Hafif hareket |
| Atatürk portresi + Türk bayrağı | — | Portre: lisansı tek tek doğrulanmış **kamu malı fotoğraf** (örn. Wikimedia Commons), krediler bölümünde atıflı. Bayrak: Kanun eki ölçülerinde (boy = 1,5 × genişlik). | **Sabit ve saygılı:** hover yok, animasyon yok, esprili kullanım yok; diğer nesnelerden ayrı bir özenle ele alınır |

Kurallar:
- Dekor bilgi taşımaz. Ekran okuyucudan gizlenir (`aria-hidden`); hiçbir bilgi yalnızca dekorda yer almaz.
- `prefers-reduced-motion` açıksa dekor hareketi durur.
- 5 sn'den uzun süren otomatik dekor hareketi için sayfada "hareketi durdur" kontrolü bulunur (WCAG 2.2.2).
- Pixel dekor yalnızca masaüstünde (≥ 1024 px) ve kenar boşluklarında; mobilde yok, içerik önceliklidir (§8).
- Atatürk portresi ve bayrak pixel desenin, zemin deseninin ya da maskotun parçası olmaz.
- Letterboxd verisi (puan, yorum, istatistik, RSS) kullanılmaz.

## 7. Ton, dil, yazım
- **Dil:** İki dilli, **TR varsayılan**, EN'ye geçiş var. Her metin iki dilde yazılır.
- **Ton:** Sıcak ve net. Birinci tekil, kısa cümleler, abartı yok, "tutkulu / vizyoner" gibi dolgu sıfatlar yok.
- **Yazım:** Teknik terimler İngilizce kalır (case study, roadmap). Türkçe karakterler eksiksiz. Rakamlar somut ("6 kriter", "7 rol").
- **Metin uzunluğu bütçesi:** İlke "İK için taranabilir, PM için derin". Rakamlar CONTENT §0'da (ör. hero rol cümlesi ≤ 60 karakter, kart problemi ≤ 90 karakter, case study TR 300–420 / EN 370–530 kelime, Hakkımda ≤ 120 kelime).
- Ekip arkadaşlarının adı sitede yazılmaz.

## 8. Tasarım yönü (S2'de netleşti, 2026-11-21; v2 kimliği 2026-11-27)

> **v2 (kullanıcı kararı, 2026-11-27):** Konsept "Odayı büyüt": kaset/oda fikri kalıyor, çok daha deneysel ve görsel olarak zengin hale geliyor. Kimlik kelimeleri: doğa, yürüyüş, psikoloji, sinema, retro, müzik. Yön dokümanı: https://claude.ai/artifact/YakXZtFUmW8gZFSYhTwTSV (seçilen yön Y-C "Gün → Gece"). Aşağıdaki Palet ve Tipografi tabloları v2 değerleriyle güncellendi; v1 değerleri git geçmişinde. Kalan v2 dilimleri ROADMAP "v2 dilimleri"nde.
Kaynak: `docs/INSPIRATION.md` (9 referans siteden 29 öğe; parantez içindeki INS numaraları oradaki öğeler). Hiçbir site kopyalanmaz; fikirler sentezlenir.

### Konsept: "Odamdaki raf"
Site, sıcak kâğıt renginde bir duvar. İçerik ortada; odamdan pixel nesneler kenarlarda; işlerim bu odanın rafında duran 7 kaset. Oda sahnesi kurulmaz (§6).

**Görsel kural: keskin olan bilgidir, pixel olan kişiliktir.** Tipografi ve vektör = bilgi ve etkileşim; pixel = dekor ve kişilik. Böylece "dekor bilgi taşımaz" kuralı (§6) gözle okunur hale gelir.

### Akılda kalacak tek öğe: Kaset rafı, "7 proje, 7 kaset"
- Rafta sırtları görünen 7 kaset, her biri projesinin renginde (INS-06).
- Üstüne gelince kaset raftan hafifçe çıkar; kapağında projenin tek cümlelik problemi, rolüm ve yıl görünür (INS-14, INS-16). Dokunmatikte aynı bilgi kartta zaten görünür.
- Tıklayınca kaset "çalar": case study overlay'i açılır (§5). Yapı **A yüzü** (problem, kullanıcı, hedef) ve **B yüzü** (kararlar ve ödünleşimler, sonuç, öğrendiklerim) olarak bölünmüş bir tracklist; her bölümün "süresi" okuma süresi (INS-28, çizimsiz uyarlama).
- Overlay başlığında iki makara: okudukça döner, bant soldan sağa akar; okuma ilerlemesi göstergesi.
- Kapak = projenin kendi ekran görüntüsü + tipografi. Kaset formu kodla üretilir (dikdörtgen + iki daire); çizim gerekmez.
- Gerekçe: müzik zevkini en önemli içeriğe bağlar ve İK'ya net bir yapı verir (problem → karar → sonuç). Kaset seçildi çünkü A/B yüzü Türkiye'nin kaset kültürüne ait, sırt formatı §6'daki "sırt" fikriyle uyumlu ve paulfey.me'deki plakçıdan ayrışıyor.

### Gün → gece (v2)
Sayfa bir gün gibi akar; her bölüm günün bir saati. Bölüm kendi zeminini boyar ve çalışma renklerini (kâğıt, mürekkep, ikincil, çizgi, vurgu) yeniden tanımlar, böylece zemin ve metin birlikte değişir. JavaScript gerekmez. Geçişler dikişin iki yanına yayılan bir bantla olur: önceki bölüm alt boşluğunda orta tona iner, sonraki üst boşluğunda oradan devam eder. Bant 192 px (md'den itibaren 256 px), gün batımı → akşam 256/384 px; hiçbir zaman metnin altına girmez. Renk smoothstep eğrisiyle ve OKLab'ta karışır, uçlarda kenar görünmez. Gün batımı ile akşam arasındaki dikişte yin-yang durur (gün ve gecenin buluşması).

| Saat | Bölüm | Zemin | Mürekkep / ikincil / vurgu kontrastı |
|---|---|---|---|
| sabah | hero | `#EEE8DA` | 13,1 / 5,5 / 5,1 |
| öğle | işler | `#F3EFE6` | 13,9 / 5,9 / 5,5 |
| ikindi | ilkeler | `#E8DEC6` | 11,9 / 5,0 / 4,7 |
| gün batımı | hakkımda | `#EFD5BE` | 11,3 / 4,8 / 5,3 (kendi vurgusu `#943714`) |
| akşam | colophon, iletişim | `#2A2433`, açık metin `#F1E6D8` | 12,2 / 7,2 / 7,3 (kehribar `#F0A63A`) |
| gece | footer | `#0F1412`, açık metin `#EFE7D6` | 15,1 / 7,5 / 9,0 |

### Palet
| Rol | Değer | Gerekçe |
|---|---|---|
| Kâğıt (zemin) | `#EEE8DA` | Yürüyüş defteri kâğıdı; sabahın zemini. |
| Mürekkep (metin) | `#1C241B` | Orman siyahı; kâğıt üstünde 13,1:1. |
| İkincil metin | `#575E50` | Künye ve açıklamalar; kâğıt üstünde 5,5:1. |
| Çizgi | `#CFC6B4` | Yalnızca ayraç ve çerçeve; bilgi taşımaz. |
| Vurgu | Gün batımı `#A63F17`; gecede kehribar `#F0A63A` | Gündüz yürüyüşün gün batımı, gece projektör ışığı (sinema). Kâğıt üstünde 5,1:1. Kahverengiye çalan turuncu; bayrak kırmızısından ayrı. |
| Kaset renkleri | hardal `#E0A82E` (mürekkep yazı, 8.0:1) · kiremit `#B8471F` (kâğıt yazı, 4.5:1) · petrol `#24666B` (kâğıt, 5.6:1) · zeytin `#7D8A3A` (mürekkep, 4.6:1) · gül kurusu `#D08C83` (mürekkep, 6.3:1) · gece mavisi `#2B3F6B` (kâğıt, 8.8:1) · bordo `#7A2E3A` (kâğıt, 7.9:1) | Yalnızca kasetlerde ve o projenin overlay'inde. Proje–renk eşleşmesi CONTENT §2. v2'de değişmedi: retro tonlar yeni palete uyuyor ve her çift kendi içinde AA. |

Pixel dekor aynı paleti kullanır; Gemini ya da paket çıktıları bu palete indirgenir.

### Tipografi
| Kullanım | Font | Gerekçe |
|---|---|---|
| Başlık, kaset sırtı | **Bricolage Grotesque** (variable: genişlik 75–100) | Karakterli bir grotesk; dar ve kalın halinde poster başlığı gibi durur, genişlik ekseni kaset sırtlarına daralır. |
| Vurgu (başlıkta tek kelime) | **Instrument Serif Italic** | Film jeneriği zarafeti (sinema); kalın grotesk başlığın yanında tek italik kelime. |
| Gövde, arayüz | **Instrument Sans** | Sakin, okunaklı gövde; başlığın karakterini öne bırakır. |
| Etiket, süre, künye | **Fragment Mono** | Daktilo hissi veren mono (retro); bilgi satırı ve okuma süreleri. |
| Kenar notları (isteğe bağlı) | **Caveat** | Yalnızca el yazısı notlarda; geç yüklenir. |

Beşi de SIL OFL ve Google Fonts'ta latin-ext subset'li (ğ, ş, ı, İ dahil; v2 fontları 2026-11-27'de google/fonts reposundan ve Google Fonts metadata'sından doğrulandı). İlk ekranda kullanılan dört font preload edilir (toplam 197 KB; v1'de üç fontla 300 KB'tı); Caveat geç yüklenir (ARCHITECTURE ADR-15).

Tip ölçeği: akışkan; gövde 17–18 px; oran mobilde 1.25, masaüstünde 1.333; dev başlık condensed ve `clamp()` ile ekran genişliğine göre. Büyük harfli mono etiketlerde `lang="tr"` (i/İ dönüşümü).

### Boşluk ve ızgara
- Ölçek (4 px taban): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192. Gerekçe: 16/32 px pixel sprite'larıyla aynı ızgara; adımlar ~1,5 kat büyüyerek hiyerarşi kurar.
- Izgara: 4 / 8 / 12 sütun (375 / 768 / 1280). Kenar boşluğu 16 / 32 / 64 px. Okuma satırı en fazla ~70 karakter.
- Pixel dekor yalnızca ≥ 1024 px'te ve kenar boşluklarında; mobilde yok.

### Yerleşim akışı
1. **Intro** (INS-01, INS-22): ≤ 2,5 sn, oturum başına bir kez, her tıklama/tuş atlatır. Kaset sayacı dönerken "Harita. Belgesel. El kitabı." → "Hepsi birer ürün." İçerik arkada render edilir (LCP beklemez). Mobilde ve reduced-motion'da yok.
2. **Hero** (INS-17, INS-04, INS-23): dev isim; rol cümlesi tek kelime italik vurguyla ("Dağınık bilgiyi *dokunulabilir* ürünlere çeviriyorum"); mono etiket `PRODUCT MANAGER ADAYI · İSTANBUL · ● ŞUBAT 2027'DEN İTİBAREN MÜSAİT`; CTA. Masaüstünde sağda hafif bir "çalışma masası" katmanı: tek ticket kartı ("GRCN-1 · Product stajyeri bul · In review"), bir deploy bildirimi, "Claude" etiketli imleç. Mobilde yalnızca ticket, statik. Hero bilgisi bu katmanın arkasında asla kalmaz.
3. **Seçili işler:** kaset rafı (imza öğe).
4. **Ürün ilkelerim:** tek cümlelik bir ekranla açılır (INS-18); maddeler "Şu olduğunda → şunu yaparım" kalıbında, her biri bir kasete bağlı (INS-14).
5. **Hakkımda** (INS-27): ortada kısa hikâye, cümle içinde proje chip'leri (INS-05); zeminde soluk pixel nesne deseni; kenarlarda 2–3 gerçek fotoğraf ve el yazısı not (INS-13). Kısa tutulur.
6. **Bu site nasıl yapıldı** + **Krediler** (§5).
7. **İletişim:** dev e-posta, LinkedIn, GitHub.

### Sabit öğeler
- **Bölüm göstergesi** (sol alt, INS-07): bulunulan bölümü/kaseti gösterir. Tıklanınca sitenin içindekiler listesi bir kaset kapağı (J-card) gibi açılır: **deneysel gezinme katmanı** budur (§5). Overlay içinde aynı bileşen "şu an okunan bölüm" olur.
- **Maskot: pixel saksı bitkisi** (INS-20, INS-26): göstergenin üstünde durur; okudukça yaprak açar, İletişim'de çiçeklenir. Kodla üretilen pixel sprite. `aria-hidden`; reduced-motion'da sabit poz. 404 ve boş durumlarda da kullanılır.
- **Walkman** (sağ alt, INS-12): tıklanınca taste.md'den rastgele bir film ya da şarkı adı, kendi tipografimizle. Etkileşimli olduğu için dekor değil: gerçek button, erişilebilir ad, sonuç `aria-live="polite"`. Mobilde footer'a taşınır.
- **Özel imleç** (INS-03, INS-19): yalnızca `pointer: fine`. Varsayılan küçük pixel ok; kaset üstünde "▶ Aç" pill'i; metin ve input alanlarında native imleç.

### Hareket ilkeleri
- Az ama smooth: tutarlı easing ve süreler; animasyonun bir amacı olur (geçiş, ilerleme, geri bildirim).
- Bölümler arası zemin tonu yumuşakça değişir; overlay açıkken vurgu o kasetin rengidir (INS-18).
- `prefers-reduced-motion`: intro, makara, maskot ve dekor hareketi durur; metin direkt görünür.
- 5 sn'den uzun süren otomatik hareket için sayfada "hareketi durdur" kontrolü (WCAG 2.2.2).
- Yanıp sönme saniyede 3'ü geçmez (WCAG 2.3.1).

### Mobil (INS-02)
İçerik aynı, deneyim katmanı farklı: intro yok, özel imleç yok, pixel dekor yok, hero katmanı statik, kaset rafı dikey liste olur (her kaset tam genişlik bir etiket kartı), walkman footer'da.

### Görsel üretim kaynakları
Elle çizim yok. Kaynaklar: (1) kod ve tipografi, programla üretilen pixel/SVG; (2) hazır component'ler ve lisansı uygun asset paketleri; (3) Gemini ile görsel üretimi; (4) kendi fotoğraflarım ve proje ekran görüntüleri.
- Tek palet ve tek pixel ızgarası (16/32 px); kaynaklar karıştırıldığında stil bozulmaz.
- Telifli eserleri taklit eden üretim yok (poster, albüm kapağı, film karakteri; §9).
- **Atatürk portresi AI ile üretilmez**; §6/§9'daki doğrulanmış kamu malı fotoğraf kuralı geçerli.
- Gemini (S4'te doğrulandı): Google üretilen içeriğin sahipliğini talep etmiyor; AI içeriğini insan yapımı gibi sunmak yasak. Bu yüzden kullanılan her AI görseli kredilerde "Gemini ile üretildi" olarak belirtilir. AI görsellerinin telif koruması doğrulanamadı; üzerlerinde koruma iddia edilmez (ARCHITECTURE ADR-08).

### Bilerek alınmayanlar
- **Kilim/dokuma teması:** jarnket.com'un dokuma sistemine fazla benzer kalır ve turistik görünme riski taşır; ızgara ihtiyacını pixel dili karşılıyor.
- **Harita yolculuğu ve illüstre sahneler** (paulfey.me, andreas.vision, twandeniet.com): elle çizim gerektiriyor. Haritalar ErasmusMap ve ATAMap case study'lerinin içinde kalır.
- **Klasör sekmeli kart yığını** (INS-09): kaset rafıyla aynı işi yapıyor.
- **Koyu/sinematik görünüm** (v2'de kısmen geri döndü: sayfa akşamda ve gecede koyulaşır, kullanıcı kararı 2026-11-27)**, pastel lavanta, küfürlü dil:** §7 tonuna ve "sıcak oda" hissine uymuyor.

## 9. Medya envanteri
| Tür | Kaynak | Lisans | Adet | En-boy | Performans bütçesi (ARCHITECTURE §8) |
|---|---|---|---|---|---|
| Film nesneleri (VHS sırtı / ikonik nesne) | Kendi üretimimiz | Bizim | 14 | Sırt ≈ dikey şerit; nesne serbest | SVG veya sprite; tek nesne ≤ 15 KB |
| Plak sırtları | Kendi üretimimiz | Bizim | 7 | Dikey şerit | SVG |
| Pixel nesneler: doğa pulları, maskot (saksı bitkisi), walkman, diğer dekor | Kodla üretilen pixel; lisansı CC0 ya da ticari kullanıma izin veren pixel asset paketleri; Gemini + ortak palete indirgeme. Kaynak kredilere yazılır | Bizim / CC0 paket, ör. Kenney / Gemini (ARCHITECTURE ADR-08) | 7 pul + maskot + walkman + dekor (sayı D8'de) | 16/32 px ızgara | Sprite/SVG, `image-rendering: pixelated`. Mobilde yüklenmez; masaüstünde ilk yüklemede toplam dekor ≤ 300 KB, geri kalanı lazy load |
| Kaset görselleri (7 proje) | Kod (SVG/CSS) + proje ekran görüntüsü | Bizim | 7 | Kaset oranı (sırt + kapak) | SVG; kapak görseli proje görselleriyle aynı dosya |
| Kişisel fotoğraflar (Hakkımda kenarları) | Kendi fotoğraflarım | Bizim | 2–3 (kullanıcı sağlayacak) | Serbest | AVIF/WebP, tek görsel ≤ 80 KB |
| AI ile üretilen görseller (gerekirse) | Gemini | Google sahiplik talep etmiyor; telif koruması doğrulanamadı, iddia edilmez; kredilerde belirtilir (ADR-08) | Az sayıda | Serbest | Ortak palete indirgenmiş; AVIF/WebP |
| Fontlar | Google Fonts: Archivo, Fraunces, Geist Mono, Caveat | SIL OFL (doğrulandı) | 4 aile | — | latin + latin-ext subset; ilk ekran fontları preload; Caveat lazy |
| Atatürk portresi | Kamu malı fotoğraf (Wikimedia Commons vb.) | Her fotoğrafın lisansı ayrıca doğrulanır; FSEK md. 27: fotoğrafçının ölümünden itibaren 70 yıl | 1 | 3:4 | WebP/AVIF ≤ 60 KB |
| Türk bayrağı | Kendi çizimimiz (SVG), 2893 sayılı Kanun ekindeki oranlar | Kamu sembolü | 1 | 3:2 | SVG |
| Proje görselleri | Kendi projelerimin ekran görüntüleri (S17); içlerindeki üçüncü taraf içerik: ErasmusMap'te Mapbox/OSM/Maxar haritası (görselin altında kredi), İklim Krizi'nde serbest lisanslı stok video karesi, Nature & Sport'ta yapay zekâ dokuları ve Wikimedia küçük fotoğrafları (künyeler o sitenin Credits sayfasında) | Bizim + belirtilenler | 6 × 1 (IDDDergi'de canlı adres yok) | 16:10 | Kaynak JPEG 2560×1600; AVIF/WebP, responsive srcset |
| ~~CV PDF~~ | — | — | 0: CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda’da | — | — |

Genel performans hedefi: LCP < 2,5 sn, CLS < 0,1, INP < 200 ms (mobil). Bütçeler ARCHITECTURE §8'de; her dilimde spot ölçüm, Faz 7'de tam ölçüm.

### Lisans kuralları (doğrulandı)
- Türk telif hukukunda (FSEK 5846) genel bir "fair use" maddesi yok. md. 35 (iktibas) ve md. 38 (şahsi kullanma) herkese açık bir siteyi kapsamaz. Posteri başka bir sanat formuna sokmak md. 6/5 gereği işlenmedir ve md. 21 gereği izne tabidir. **Bu yüzden telifli poster ya da kapak kullanılmaz, yeniden de çizilmez.**
- TMDB, Spotify ve Cover Art Archive görselleri bu sürümde kullanılmıyor (gerekçe: TMDB görsellere hak vermiyor ve türev üretimi yasaklıyor; Spotify kırpma ve üst katmanı yasaklıyor; CAA lisans vermiyor).
- Film ve albüm **adları** kendi tipografimizle yazılabilir.
- Bayrak: 2893 md. 7. Yırtık, soluk, buruşuk ya da manevi değeri zedeleyen hiçbir görsel yok; zemin, döşeme ya da "basılan" bir yüzey olarak kullanılmaz.
- Atatürk: 5816 md. 1. Saygılı, sabit sunum. Portre AI ile üretilmez.
- Fontlar: Archivo, Fraunces, Geist Mono ve Caveat google/fonts reposunda `ofl/` altında (SIL Open Font License). Google Fonts CSS API'sinde dördünün de latin-ext subset'i var; unicode-range U+0100–02BA Türkçe karakterleri (ğ, ş, ı, İ) kapsıyor. Kaynaklar: [Archivo](https://fonts.google.com/specimen/Archivo) · [Fraunces](https://fonts.google.com/specimen/Fraunces) · [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) · [Caveat](https://fonts.google.com/specimen/Caveat) · [google/fonts](https://github.com/google/fonts/tree/main/ofl) (2026-11-21).
- Kaynaklar: [FSEK](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.5846.pdf) · [2893](https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2893.pdf) · [5816](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.5816.pdf) · [TMDB Terms](https://www.themoviedb.org/api-terms-of-use) · [Spotify Design](https://developer.spotify.com/documentation/design) · [Cover Art Archive](https://coverartarchive.org/). Hukuki görüş değildir.

## 10. Erişilebilirlik ve kalite tabanı
WCAG 2.2 AA. Klavyeyle tam gezinme (overlay panelde focus trap, Esc ile kapanma). `prefers-reduced-motion`'a uyulur. Mobile-first; 375 / 768 / 1280 px'te doğrulanır.

## 11. Yayın
GitHub → Vercel. Stack: `docs/ARCHITECTURE.md` (Next.js 16, tamamen statik). `docs/sources/` kişisel veri içerdiği için repoya girmez.

## 12. Kapsam dışı (bu sürüm)
- İletişim formu (yalnızca mailto + LinkedIn)
- Blog / düzenli yazılar
- CMS / admin panel
- Karanlık mod
- Product teardown bölümü
- Now sayfası
- Letterboxd verisi: puan, yorum, istatistik, RSS; profil linki de yok (S3 kararı)
- Kitap dekoru (S3 kararı)
- Telifli poster ve albüm kapakları (orijinal ya da yeniden çizilmiş)
- Doğa fotoğrafları
- Ayrı bir "kişisel katman" bölümü ya da oda sahnesi
- Elle çizim gerektiren illüstrasyonlar (illüstre harita, sahne, karakter animasyonu)

## 13. Açık sorular (sonraki oturumlar)
**S3'te kapandı (2026-11-21):** 7 proje ve öne çıkan (ErasmusMap; MushroomClassificationAI dışarıda) · albümler (kitap dekoru yok) · metin bütçesi · EN CV (evet) · Letterboxd linki (hayır) · kaset sırası, renkler ve A/B bölümleri · walkman listesi ve doğa pulları. Hepsi CONTENT.md'de.

**S4'te kapandı (2026-11-21):** hero çalışma masasında marka adları yalnız metin, logo yok (ARCHITECTURE ADR-16) · Gemini şartları (§8, ADR-08) · pixel nesneler kodla üretilir; paket gerekirse yalnız CC0, Kenney doğrulandı (ADR-08) · canlı mini demo (INS-10) v1'de yok (ADR-17) · analytics aracı Umami Cloud (ADR-14) · Barış Manço albümü doğrulandı (CONTENT §9).

**Açık:**
- CONTENT §10'daki maddeler: IDDDergi canlı adresi, Novera repo linki (ekip arkadaşının kullanıcı adını içeriyor), EN metin kontrolü, kişisel fotoğraflar, şarkı yılları, kenar notu metinleri, eksik mikro metinler. Hangi dilimde gerektiği ROADMAP'in "Kullanıcıdan beklenenler" tablosunda.

## 14. Uçtan uca doğrulama (yayın öncesi kabul)
1. 375 / 768 / 1280 px ekran görüntüleri: hero'da rol, tarih, şehir ve CTA ilk ekranda görünüyor.
2. 1 kişilik 30 sn testi: 3/3.
3. Her case study overlay'i hash ile doğrudan açılıyor, Esc ve geri tuşuyla kapanıyor.
4. TR/EN geçişinde hiçbir metin eksik değil.
5. Lisans kontrolü: envanterdeki her görselin kaynağı ve lisansı krediler bölümünde; telifli poster veya kapak yok.
6. Analytics'te 3 event canlıda tetikleniyor.
7. Lighthouse (mobil) ve WCAG 2.2 AA kontrolü (Faz 7).
8. `prefers-reduced-motion` açıkken ve "hareketi durdur" kontrolüne basılınca intro, makaralar, maskot ve dekor duruyor; intro içeriği bekletmiyor.
