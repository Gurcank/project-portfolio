# PROGRESS

## Durum: v2 tamamlandı; V3–V9 canlıda (2026-11-27, `bca9435`). Kalan, kullanıcıdan: Umami ID, 30 sn testi, ekran okuyucu turu, IDDDergi adresi; GitHub grafiği için token kararı. PSI ölçümü kota açılınca (2026-11-27 API yine 429)

**Canlı:** https://gurcankaradag.vercel.app (V3–V9, commit `bca9435`; eski `project-portfolio-theta-mocha.vercel.app` artık 404) · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.
**Branch:** `main` (v2-rest fast-forward ile merge edildi).

### V3–V9 · Kalan v2 dilimleri (canlıda)

- **Kullanıcı isteği (2026-11-27):** "kalanların tamamını tek seferde yap" + pixel avatar için portre fotoğrafı. Plan ve metin taslakları onaylandı; tek dal, dilim başına commit, tek preview.
- **V3 · Ben kimim:** `scripts/make-avatar.ts` fotoğrafı ten/gölge/dudak/mürekkep renklerine indirger; çıkan ızgara elle temizlendi (`components/pixel/sprites/avatar.ts`: 32 × 28 portre, 12 × 16 yürüyen üç kare, oturan poz). Fotoğraf repoda yok. Yeni token'lar `--color-skin` #E4B8A0, `--color-skin-shade` #C18A72 (fotoğraftan ölçüldü). Hero'da portre + iki cümle (CONTENT §4); "Bana yaz" 375 × 667 dahil ilk ekranda (d1 geçiyor). Portre her ekranda: pixel dekor kuralına tek istisna (SPEC §8).
- **V5 · Kaydırma:** `styles/scroll.css`. Bölüm başlıkları `animation-timeline: view()` ile girer (desteklemeyen tarayıcı son hâli görür; Motion yedeği yazılmadı); hero rol cümlesi kelime kelime (yalnız ≥ 1024, intro oynamıyorsa; isim/LCP hareketsiz); ≥ 1024'te film greni (`--texture-grain`, %7), ilkelerin arkasında topografik çizgiler, ilkelerin altında 5 kişilik yürüyen kalabalık (yalnız CSS, `<symbol>`/`<use>` ile tek çizim), işler başlığından çarka kendini çizen ok. Bitki maskotu yerine sol kenarda kesikli patika üzerinde okudukça yürüyen avatar (adım kareleri kaydırmayla, durunca durur, İletişim'de el sallar, footer kampı %95 görününce çekilir). 404'teki bitki aynı.
- **V6 · Hakkımda:** Araçlar (Jira, Figma, Miro, React, Next.js, TypeScript, Supabase, Vercel, Claude; Simple Icons 16.38.1, CC0; `public/tools/*.svg`, CSS mask ile metin renginde, `aria-hidden`), üç proje polaroidi (ErasmusMap, Nature & Sport, İklim Krizi; ATAMap asla; ≥ 1024, dekor), walkman → CD çalar (16 × 16 holografik disk, 4 kare dönüş; liste ve davranış aynı, ad "CD çalar: …"). Krediler'e "Logolar" grubu. GitHub grafiği ertelendi (token gerekiyor).
- **V7 · İmleç:** `Cursor.tsx` (eski "▶ Aç" hapı yerine): yumuşak halka, yazıda çekilir, bağlantıda büyür, kasette/çark kartında "▶ Aç", footer'da yaprak izi. Yalnız ince işaretçi + ≥ 1024; dokunmatikte yok; reduced motion/durdurulmuşta halka ve iz yok, yalnız hap.
- **V8 · Doğa footer:** `NatureScene` + `landscape.ts` (build'de tohumlu üretim: uzak ve yakın sırt, çam sembolleri, 42 yıldız), kamp ateşi (2 kare titreme), ateşin başında oturan avatar, `SkyClock` ile ziyaretçinin saatine göre gökyüzü (şafak/gündüz/akşam/gece). Yeni token'lar `--color-ridge-far/near`, `--color-forest`. ≥ 1024, `aria-hidden`.
- **V9 · Kalite:** Colophon'a v2 cümlesi (TR/EN, CONTENT §7; commit öncesi onaya sunuldu). `PixelLayer` artık renk başına tek path (sunucu sprite'ları HTML + RSC'de iki kez gidiyor). Ağırlık: ilk yük JS 235,6 → 236,4 KB gzip (+0,8); ana sayfa HTML gzip 40,8 (canlı V4) → 50,8 KB (+10; çoğu portre, kalabalık sembolleri, manzara, CD çalar). PSI yapılmadı (canlı adres bu dalı göstermiyor, preview korumalı). d9 flake'inin kökü araştırılmadı.
- **Testler:** `v2-rest.spec.ts` (22 test: V3 portre + cümleler + EN + rol cümlesi tek metin; V5 başlık girişi, kalabalık + reduced motion + durdur, telefonda katman yok; V6 Araçlar 9 logo + mask dosyası, polaroidler ≥ 1024 + ATAMap yok, CD çalar EN, axe; V7 4 hal, reduced motion, dokunmatik; V8 sahne + axe, 4 saat dilimi, durdurulmuşta ateş, telefonda yok). Güncellenen: d1 (şehir/tarih etikette aranıyor), d5 (Logolar grubu), d7 (CD çalar adı; bitki testleri yürüyen avatar testleriyle değişti), d8 (pattern `path`), d9 (hap imleç katmanında), unit (yeni sprite'lar, `pixelPaths`, her aracın logosu var).
- **Preview'da doğrulananlar (`bca9435`, paylaşım linkiyle):** TR/EN × 375/768/1280: portre her ekranda, "Bana yaz" ilk ekranda (375 × 667 dahil); kalabalık, manzara ve polaroidler yalnız 1280'de; 9 logo, mask dosyaları 200; 1280'de imleç bağlantıda "link"; taşma 0, CSP ihlali 0.
- **Production'da doğrulananlar (2026-11-27):** aynı kontroller aynı sonuçla. PSI API 429 (anahtarsız kota), ölçüm yine sonraya.

### V4 · İş çarkı (canlıda)

- **Çark** (`components/works/WorksWheel.tsx`, `works.css`): "Rafımdaki yedi kaset" başlığının altında, rafın üstünde. Duruşta 7 ekran görüntüsü küçük kartlar halinde halka; kaydırınca halka dikey bir tambura açılır, öndeki kart düz, komşuları geriye dönük; kaydırmaya devam edince sıradaki iş alttan yükselip öne gelir. Sayfanın kendi kaydırması sürer (sticky sahne, 4 ekran boyu kutu): tekerlek, klavye, kaydırma çubuğu ve dokunma olayı yakalanmıyor. Tek sayı (`turn`) bütün dönüşümleri belirler; dönüşümler doğrudan DOM'a yazılır (her karede React render'ı yok), rAF yalnız kutu ekrandayken çalışır.
- **Yan bilgiler:** solda öndeki işin katalog numarası ve adı (`aria-hidden`, kartın adı aynı kelimeleri taşıyor), sağda 7 işin dizini (düğmeye basınca o iş öne döner, `aria-current`). Merkez dock'un altında kalan alana göre (`--wheel-centre`); halka 800 px yüksekliğe sığacak boyutta. İkinci komşudan sonra kartlar dönerken soluyor (kenarda ince şerit kalmıyor). IDDDergi'nin ekran görüntüsü yok: kendi renginde katalog + başlıklı yazılı kart.
- **Erişilebilirlik:** kartlar rafla aynı adı taşıyan bağlantılar ("GK-04 ATAMap case study'sini aç"), `data-case-source="wheel"` ile overlay'i açar, kapanınca odak karta döner. Klavyeyle bir karta gelince çark o kartı öne çevirir. Yeni metin yok.
- **Görünmediği yerler:** < 1024 px'te yatay kaydırılan şerit (telefonda %80, tablette %45 kart, scroll-snap); reduced motion, "hareketi durdur" ya da script yokken 4 sütunlu ızgara. `<html data-js>` artık `restoreMotionScript` tarafından ilk boyamadan önce konuyor; çarkın yeri baştan ayrıldığı için CLS yok, script yoksa ızgara.
- **Telefonda görsel yükü:** şerit lazy; 375 px'te yalnız görünen kart ve sıradakinin kenarı iniyor (DPR 1: 2 görsel, 11 KB; DPR 3: 2 görsel, 65 KB). Raf kapakları telefonda hâlâ hiç inmiyor.
- **JS:** ilk yükleme 234,2 → 235,6 KB gzip (+1,4 KB). Yeni bağımlılık yok. Analitik kaynağına `"wheel"` eklendi.
- **Testler:** `v4-works-wheel.spec.ts` (12 test: 7 kart + rafla aynı adlar, kaydırınca dizin öndeki işi izliyor, dizin düğmesi öne getiriyor, klavye odağı öne çeviriyor + Enter açıyor, öndeki karta tıklama açıyor, EN adlar, taşma + axe; telefon şeridi kendi içinde kayıyor, tablet şeridi, reduced motion ızgarası, "hareketi durdur" ızgarası, script yokken ızgara). Test, IDDDergi kartında adın iki kez okunduğunu yakaladı (düzeltildi). Güncellenen eski testler: d2 raf bağlantıları `.shelf-list` içinde aranıyor (çarkta aynı adlı bağlantılar var); s17 `#work li` → `.shelf-list > li`, "telefon kapak indirmez" testi raf kapaklarını ölçüyor + şerit en fazla 2 görsel; smoke taşma testi şeridin içindeki kartları saymıyor (şeridin kendisi sığmalı); d4 About görseli testi artık önce About'a kaydırıp görsellerin bitmesini bekliyor (çark sayfayı uzattığı için lazy görsel ilk anda inmiyordu).
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (88/88), `check:tokens`, `build`, `test:e2e` (164 testten 163; d9 "masa dekor" testi tam koşuda bir kez düştü, tek başına 3 tekrarda 39/39 geçti: yük altında flake). Ekran görüntüleri `artifacts/v4-*`, `home-*`, `en-*`.

- **Preview'da doğrulananlar (`c22afea`, paylaşım linkiyle):** TR/EN × 375/768: şerit, çark yok; 1280: çark, kaydırınca dizinde ATAMap öne geliyor, öndeki karta tıklama `#atamap` overlay'ini açıyor; taşma 0, CSP ihlali 0.
- **Production'da doğrulananlar (2026-11-27):** aynı kontroller aynı sonuçla (TR/EN × 375/768/1280).

### V2b · Gerçekçi kaset ve deck (canlıda)

- **Kullanıcı isteği (2026-11-27):** kasetler daha gerçekçi olsun; "aç" denince kaset bir yere takılsın ve çalmaya başlasın.
- **Kaset** (`components/cassette/Cassette.tsx`, `cassette.css`): 100 × 64 (gerçek oran), SVG gövde projenin renginde, üst yarıda plastik parlaklığı, 5 vida, kâğıt etiket (katalog + "A"), etikete basılı ekran görüntüsü (yoksa el yazısıyla başlık: IDDDergi), dumanlı pencerede altı dişli iki makara ve kahverengi bant, kafa açıklığı. Yeni token'lar: `--color-tape` (#4A3326) ve `--color-tape-window` (#B9B0A3); bant pencere üstünde 5,5:1, okuma ilerlemesi okunuyor.
- **Deck** (`TapeProgress.tsx`): overlay başlığında koyu deck, kapaklı yuva, PLAY ve STOP tuşları (dekor). Raftan açılınca kasetin tamamı `layoutId` ile kapaktan yuvaya uçar (önceden yalnız makaralar uçuyordu; `useReelsInPlayer` → `useTapeInPlayer`), indikten sonra kapak kapanır, PLAY basılır, makaralar yavaşça dönmeye başlar (CSS, reduced motion ve "hareketi durdur"da durur); kapatınca kapak açılır, kaset rafa döner. Paylaşılan link, chip ya da telefon: kaset yukarıdan düşer. Deck'teki kaset 80 px (telefon) / 112 px (md+).
- **Raf:** kapak yeni kaset (`CoverCassette.tsx`; `CoverReels.tsx` silindi); xl'de kapak genişliği 4/5 → 2/3 (yeni oran daha yüksek, kart raf boyunu aşmasın). Sırtlarda kutu görünümü: sol kenarda ışık, sağda gölge, üst ve alt plastik dudaklar (CSS).
- **JS:** ilk yükleme 233,1 → 234,2 KB gzip (+1,1 KB). Yeni bağımlılık yok.
- **Testler:** D3 yeniden yazıldı (kasetin tamamı uçar ve yuvada 112 px'e iner; inince kapak kapalı, PLAY basılı, makaralar dönüyor; kapatınca kapağa döner; paylaşılan linkte uçuş yok; telefonda 80 px; reduced motion'da ne kaydırma dönüşü ne çalma dönüşü). S17 kapak testleri değişmeden geçti.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test`, `check:tokens`, `build`, `test:e2e` (152/152). Ekran görüntüleri `artifacts/v2b-*`, `home-*`.

- **Preview'da doğrulananlar (`f4e9725`, paylaşım linkiyle):** TR/EN 1280: rafta 7 kaset; ATAMap kapaktan (363 px) deck'e (112 px) uçuyor, ardından kapak kapalı ve deck "playing"; `/#idddergi` 375/768'de kaset düşüyor, 80/112 px, çalıyor; CSP ihlali 0, taşma 0.
- **Production'da doğrulananlar (2026-11-27):** TR/EN 1280'de raftan açılış ve deck aynı sonuçla; 375'te `/#atamap` 80 px, çalıyor, taşma 0; CSP ihlali 0.

### V2 · Dock (canlıda)

- **Dock** (`components/experience/Dock.tsx`, `dock.css`): sol alttaki bölüm göstergesinin yerini aldı (`SectionIndicator.tsx` silindi, J-card içeriği dock'a taşındı). Hero geçilince belirir; masaüstünde üstte, telefonda altta, ekran genişliğinde ortalı (`inset-x-0 mx-auto w-fit`; `left-1/2` + translate sabit öğenin genişliğini ekranın yarısıyla sınırlıyordu, açılınca son iki bölüm kesiliyordu).
- **İçerik:** yin-yang (kâğıt daire üstünde; kaydırma oranıyla 0 → 180° döner, reduced motion ve "hareketi durdur"da sabit; başa döndürür) · "Şu an: {bölüm}" (J-card'ı açar; masaüstünde aşağı, telefonda yukarı) · 1024 px'ten itibaren hover ya da klavye odağıyla açılan 5 bölüm bağlantısı (12 × 9 pixel ikonlar, Motion `layoutId` ile kayan vurgu, `aria-current`; 768–1023'te beşi sığmadığı için yok) · saat (İstanbul görünür, panelde iki şehir; `Intl.DateTimeFormat` + IANA saat dilimi, 30 sn'de bir yenilenir).
- **Metinler** kullanıcı onaylı (CONTENT §8). Axe'in yakaladığı bulgu: saat düğmesinin görünen metni erişilebilir adda yoktu (WCAG 2.5.3); görünen saat önde, onaylı ekran okuyucu metni arkada.
- **JS:** ilk yükleme 231,8 → 233,1 KB gzip (+1,3 KB). Yeni bağımlılık yok.
- **Testler:** `v2-dock.spec.ts` (8 test: hero'da yok, konum ve ortalama, klavyeyle açılma + aria-current, saat iki şehir + 24 saat + Esc, EN, yin-yang dönüşü ve reduced motion, telefonda 5 + 7 bağlantı, axe). d2'de başlık linki artık `banner` içinde aranıyor (iki nav var). D6 J-card testleri değişmeden geçti.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test`, `check:tokens`, `build`, `test:e2e` (151/151). Ekran görüntüleri `artifacts/`.

- **Preview'da doğrulananlar (`f7dcb5b`, paylaşım linkiyle):** TR/EN × 375/768/1280: hero'da dock yok, sonra telefonda altta, 768+ üstte; saat görünen metni erişilebilir adın başında; 1280'de 5 bölüm açılıyor ve sığıyor; J-card'da 12 bağlantı; taşma 0, CSP ihlali 0.
- **Production'da doğrulananlar (2026-11-27):** TR/EN × 375/1280 aynı kontroller temiz.

### v2 · Yön (Faz 0, 2026-11-27)

- Kullanıcı v1'in kendisini yansıtmadığını söyledi (renk, tipografi, deneysellik). Kararlar: konsept "Odayı büyüt", kimlik kelimeleri doğa · yürüyüş · psikoloji · sinema · retro · müzik, fotoğraftan pixel avatar, ADR-16 (logo yok) kalktı. Barış ve yin-yang sembolleri istendi.
- Yön dokümanı: https://claude.ai/artifact/YakXZtFUmW8gZFSYhTwTSV. Seçimler (kullanıcı "önerilerinle devam et" dedi): Y-C Gün → Gece, V-wheel, R-kal, M-cd; GitHub kararı V6'da. 13 referans portfolyo incelendi; verilen 10 Framer modülü ve 4 21st.dev bileşeninde lisans notu yok: kod kopyalanmayacak, davranış kendi kodumuzla yazılacak.
- v2 dilim tablosu ROADMAP "v2 dilimleri"nde.

### V1 · Kimlik (canlıda)

- **Gün → gece:** bölümler `data-time` ile günün bir saati (hero sabah, işler öğle, ilkeler ikindi, hakkımda gün batımı, colophon ve iletişim akşam, footer gece). Bölüm kendi zeminini boyar ve çalışma renklerini yeniden tanımlar (`styles/globals.css`); JavaScript yok. Geçişler dikişin iki yanına yayılan bantla: önceki bölüm alt boşluğunda orta tona iner, sonraki üst boşluğunda devam eder (smoothstep durakları, OKLab karışımı; her yarı kendi bölümünün içinde, içeriğin altında). Bant 192/256 px, gün batımı → akşam 256/384 px (About alt ve Colophon üst boşluğu bunun için büyüdü, footer üst boşluğu 32 → 96/128 px). Ölçüm: bant içinde piksel başına değişim 1 renk birimi, kenar yok. Kontrastlar SPEC §8 tablosunda; gün batımında vurgu `#943714` (sabahınki 4,46:1'de kalıyordu). Bölümlerin üst çizgileri kalktı. ToneController `data-tone` yazmaya devam ediyor, artık renk vermiyor.
- **Fontlar:** Bricolage Grotesque (başlık + sırt, `font-display`), Instrument Serif italik (vurgu), Instrument Sans (gövde), Fragment Mono (etiket), Caveat (kalıyor). Preload 300 KB → 197 KB. OG görseli de yeni fontlarla (Google TrueType döndürüyor, doğrulandı). Krediler ve velite font listesi güncellendi.
- **Semboller:** `components/pixel/sprites/symbols.ts` (20×20, dairelerden hesaplanmış). Barış: hero masasında ticket köşesinde çıkartma. Yin-yang: gün batımı → akşam bandının ortasında (`components/home/DayNightSeam.tsx`; bölümlerin dışında, ki renkleri ters dönmesin). İkisi de `aria-hidden`, yalnız ≥ 1024 px.
- **Testler:** d6 ton testi yeni modele göre yeniden yazıldı (saat sırası, koyulaşma, her zeminde mürekkep/ikincil/vurgu ≥ 4,5); d8 desen testi gün batımı zeminine; d5 kredi listesi yeni fontlar.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (88/88), `check:tokens` (95), `build`, `test:e2e` (143/143). Ekran görüntüleri `artifacts/home-*`, `en-*`. Yerel Lighthouse mobil (3 koşu, aynı yöntem): S17 LCP 4,5–4,7 sn, V1 4,7–4,8 sn; CLS ikisinde 0, erişilebilirlik 100. Yerel mutlak değerler PSI ile kıyaslanamaz (S17 benzeri kod PSI'de 1,1 sn); fark gürültü düzeyinde, PSI ölçümü production'da.

- **Preview'da doğrulananlar (`1824cf9`, paylaşım linkiyle):** TR/EN × 375/768/1280: bölüm saatleri sırayla, başlık Bricolage, gövde Instrument Sans, barış ve yin-yang yalnız 1280'de, 6 kapak, ATAMap linki, CSP ihlali 0, yatay taşma 0.
- **Production'da doğrulananlar (2026-11-27):** TR/EN × 375/1280 aynı kontroller temiz; production CSP'sinde vercel.live yok; OG görseli 200. PSI: arayüz "Running analysis"te takıldı, API 429 (anahtarsız günlük kota); ölçüm sonraya kaldı.

### S17 · Proje ekran görüntüleri (canlıda)

- **ATAMap linki kırıktı (bulgu, 2026-11-27):** `project-atamap.vercel.app` 404 veriyordu; Vercel projesinin domain'i `atamap.vercel.app`. Ayrı dalda düzeltildi, kullanıcı onayıyla doğrudan main'e (`9f608cd`); production'da TR ve EN'de yeni link, eski adres yok, hedef 200. GitHub reposunun "homepage" alanı hâlâ eski adreste (kullanıcının değiştirmesi gerekiyor). Diğer bütün proje linkleri 200 (LinkedIn bot engeli 999, normal).
- **Script:** `npm run capture:screens` (`scripts/capture-project-screens.ts`): canlı adresi olan 6 proje, 1280×800, 2× JPEG q90 → `content/projects/<slug>/media/cover.jpg`. ErasmusMap ve Novera'da çerez bandı "Reddet"; Nature & Sport'ta kapalı defter yerine Kuşlar sayfası. Yeni bağımlılık yok (JPEG'i Playwright yazıyor; siteye AVIF/WebP `next/image` ile).
- **Şema:** `project.yaml` → isteğe bağlı `cover: { image, alt: {tr,en} ≤ 180, credit?: {tr,en} ≤ 80 }`; `getProjects` dile göre çözüyor. `gallery` ertelendi (ARCHITECTURE §3).
- **Overlay:** başlığın altında 16:10 görsel, alt metinli; ErasmusMap'in altında "Harita: © Mapbox © OpenStreetMap © Maxar" (Mapbox statik harita kuralı: atıf görselin yanında; https://docs.mapbox.com/help/getting-started/static-maps/). Sunucu bileşeninde (`CaseStudyPanel`), istemci verisine eklenmedi. `sizes` ölçülerek düzeltildi (1280'de 1920 yerine 1200 px).
- **Raf (≥ 1024 px):** ekran görüntüsü kaset etiketini dolduruyor, makara penceresi gerçek kasetteki gibi etiketin üstünde (D3'ün makara uçuşu buradan başladığı için korunmalıydı). Kart rafın boyunu aşmıyor (1024/1280/1440). IDDDergi tipografik kapakla kalıyor. Mobilde kapak görseli hiç indirilmiyor; masaüstünde 6 kapak toplam ≈ 41 KB AVIF, LCP öğesi hâlâ H1 (yerel 684 ms).
- **Lisans (kullanıcının beyanı, 2026-11-27):** İklim Krizi açılış videosu serbest lisanslı stok (Pexels/Pixabay türü; kaynağı GORSEL-KAYNAKLAR.md'de yok, eklenmesi iyi olur). Nature & Sport'un ahşap ve çim dokuları yapay zekâ ile üretildi; defterdeki küçük fotoğraflar Wikimedia, künyeleri o sitenin Credits sayfasında.
- **Alt metinler:** CONTENT §8 sonunda; kullanıcı onayladı (2026-11-27).
- **Testler:** `s17-project-screens.spec.ts` (8 test). D3'ün "makaralar kapağa geri uçar" testi sabit 300 px yerine kapağın ölçülen genişliğine bakıyor (yeni kapakta makaralar etiket genişliğinin 3/5'i).
- **Doğrulama (yerel):** `format:check`, `lint` (0), `typecheck`, `test` (88/88), `check:tokens` (94), `build`, `test:e2e` (141/141). Ekran görüntüleri: `artifacts/home-*`, `en-*`, `s17-shelf-{375,1024,1280,1440}`, `s17-overlay-*`.
- **Bilinen, bu dilimden önce de olan:** D3 "bant soldan sağa geçer" testi 6 paralel işçi + 12 tekrarda ara sıra düşüyor (dilimsiz 3/12, dilimle 1/12); tam koşularda geçiyor. Kaydırma zamanlamasına bağlı, ayrıca bakılabilir.

### S16b · CV yerine Hakkımda'da beceriler (canlıda)

- **Kullanıcı kararı (2026-11-27):** CV sitede sunulmuyor; CV'deki bilgiler telefon hariç sitede. GANO eklenmedi (kullanıcı kararı). Domain alınmıyor; daha okunur bir vercel.app adresi kararı en sona. Umami'yi kullanıcı kuracak.
- **Kaldırılan:** `public/cv/` (commit'lenmemiş TR PDF silindi), CV düğmesi, `profile.cv` şeması, `getCvHref`, `cv_download` event'i (SPEC §4 ve §14.6'da 3 event), break-ui'daki "No CV" durumu. d1'deki CV testi yerine "sitede PDF linki yok" testi.
- **Eklenen:** Hakkımda'da Hedeflerim altında "Beceriler / Skills": dört grup (Ürün ve tasarım, Ürün ve proje yönetimi, Yazılım, Dil), case study künyesi biçiminde `<dl>` (mono etiket + düz metin; seviye çubuğu yok). Eğitim satırında "MEZUNİYET HAZİRAN 2027" → "2023 – HAZİRAN 2027" (EN "2023 – JUNE 2027"); tirenin iki yanı bölünmez boşluk, tireden sonra ayrıca word joiner (U+2060): yalnız NBSP ile Unicode tireden sonra kırmaya izin veriyor (UAX #14, LB12a) ve preview'da 1280 px'te "2023 –" satır sonunda kaldı. Metin CONTENT §6'ya da yazıldı (kullanıcı onayı). Şema: etiket ≤ 32, madde ≤ 140 karakter, 1–6 grup.
- **CV'de olup bilerek eklenmeyenler:** telefon, GANO, Novera'nın ekip arkadaşı kullanıcı adı içeren repo linki. Proje teknolojileri zaten case study'lerde.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (88/88), `check:tokens` (94 dosya), `build`, `test:e2e` (132/132; bir koşuda d4'te tek bir hata görüldü, 3×14 tekrarda ve sonraki tam koşuda yeniden üretilemedi). Ekran görüntüleri: `artifacts/about-{tr,en}-{375,768,1280}.png`, `home-*`, `en-*`. Tire düzeltmesinden sonra e2e 133/133 (yeni test: tarih aralıkları 375–1440 px'te tireden bölünmüyor); lint'teki kullanılmayan `join` import'u silindi.
- **Production'da doğrulananlar (2026-11-27, `1663ebe`, gurcankaradag.vercel.app):** `/`, `/en`, `robots.txt`, `sitemap.xml` 200; eski PDF adresi 404. TR/EN × 375/768/1280: Beceriler 4 satır, GANO/GPA yok, PDF linki yok, CSP ihlali 0, yatay taşma 0. Tarih aralıkları TR/EN × 5 genişlikte bölünmüyor. Canonical, JSON-LD `url` ve sitemap yeni adreste (`lib/site-url.ts` Vercel'in production URL'ini okuyor). CSP, HSTS, X-Frame-Options, Referrer-Policy var; production CSP'sinde vercel.live yok.
- **PageSpeed Insights, 5 koşu (2026-11-27 14:30–14:40, gurcankaradag.vercel.app, Lighthouse 13.6.0):** her koşuda Performans, Erişilebilirlik, Best Practices, SEO **100**. Mobil (Moto G Power, Slow 4G) ortanca: **FCP 1,1 sn · LCP 1,1 sn · TBT 20 ms · CLS 0 · Speed Index 1,1 sn** (TBT koşularda 0–40 ms; diğerleri beş koşuda da aynı). Masaüstü ortanca: **FCP 0,3 sn · LCP 0,3 sn · TBT 10 ms · CLS 0 · Speed Index 0,7 sn** (TBT 0–60 ms, SI 0,6–0,8 sn). Arka arkaya iki koşu (mobilde ve masaüstünde birer kez) aynı dakikada birebir aynı sonucu verdi; PSI önbelleği olabilir, bu ikisi tek sayılırsa ortanca değişmiyor (mobil TBT 15–20 ms). D7–D10'daki mobil Speed Index 3,7–4,4 sn ve masaüstü CLS 0,002 tekrarlanmadı: CLS, S16'daki `overflow-x-clip` düzeltmesiyle 0; SI'nin eski değeri tek koşu gürültüsü ya da aynı yatay kaydırma çubuğunun etkisiydi, ayırt edilemiyor. API hâlâ 429; ölçüm pagespeed.web.dev arayüzünden.
- **Adres:** Vercel projesinde tek domain `gurcankaradag.vercel.app` (2026-11-27 11:39'da eklendi); `project-portfolio-theta-mocha.vercel.app` kaldırılmış, 404 veriyor. Bu eski adres bir yerde paylaşıldıysa (LinkedIn, CV) güncellenmeli.

### S16 · Kalite kapıları + yayın (kod tarafı canlıda)

- **Denetim** (`/web-quality-audit`, canlı site): konsol temiz, source map'ler kapalı (403), robots + sitemap + hreflang + canonical doğru, tek h1, mükerrer id yok. axe WCAG 2.2 AA (target-size dahil) / ve /en'de 375 ve 1280'de temiz; "incomplete" kontrastlar yalnız ok ve sembol karakterleri ile dekor. Tab turu: 1280'de 23, 375'te 19 odaklanabilir öğe, hiçbiri sabit öğelerin altında kalmıyor (2.4.11). Erişilebilirlik ağacı: landmark'lar ve başlık sırası doğru, adsız kontrol yok.
- **Bulundu ve düzeltildi:**
  - Case study açıkken ikinci banner/contentinfo landmark'ı (axe moderate): overlay içeriği `<article>` oldu.
  - **Hero masasının imleci 1280–1440 px'te ≈ 2 sn yatay taşma yapıyordu** (D9): klasik kaydırma çubuklu tarayıcılarda altta çubuk beliriyor, sayfa 15 px zıplıyordu. Masaüstü CLS 0,002'nin kaynağı buydu (Lighthouse trace'indeki LayoutShift: sabit öğeler 15 px yukarı). `<main>`'e `overflow-x-clip`; yerel Lighthouse masaüstü CLS 0,0019 → 0 (3 koşu). Mevcut taşma testi animasyon bittikten sonra ölçtüğü için kaçırmıştı; yeni test 5 sn boyunca her karede ölçüyor.
  - JSON-LD yoktu: `Person` şeması (ad, adres, meta açıklama, LinkedIn, GitHub), tamamı içerikten. `jobTitle` eklenmedi: rol yalnız büyük harfli etiketin içinde, ayrı alan içerik değişikliği olurdu.
  - Güvenlik başlıkları (`next.config.ts`): CSP (nonce'suz; statik sayfa nonce alamaz, Next.js CSP rehberi "Without Nonces"), nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP. HSTS zaten Vercel'den geliyor. Umami için `cloud.umami.is` (betik) ve `gateway.umami.is` (olaylar, script.js'ten okundu).
  - D10'un Tab testi ≈ 8 koşuda 1 düşüyordu: Chromium ilk boyamadan önceki tuşu bekletebiliyor; test artık ilk boyamayı bekliyor (15/15).
- **Lisans kontrolü (SPEC §14.5):** 4 font (OFL) ve Atatürk portresi kredilerde; OG görselleri aynı fontları kullanıyor; imleç, sprite'lar, bayrak ve favicon kodla üretiliyor; telifli görsel yok. Geçti.
- **Sayılar (CONTENT "Sayılar"):** repolardaki commit sayıları içerikle aynı (110 / 142 / 4 / 43 / 17); ATAMap reposuna 18 Kasım'dan beri commit yok, 721 olay / 398 kaynak geçerli. Değişiklik gerekmedi.
- **PSI 5 koşu ortancası yapılamadı:** anahtarsız API 429, arayüz aynı adresi önbellekten döndürüyor. Yerel Lighthouse 13.6.0 (5'er koşu): mobilde Speed Index her koşuda FCP'ye eşit, yani ilk boyamadan sonra görsel değişim yok; PSI'deki 3,7 sn'nin yerelde karşılığı bulunmadı. Ortanca 2026-11-27'de alındı (aşağıda, S16b).
- **SPEC §14 kanıtı:** 1 → d1 + d9 testleri ve ekran görüntüleri · 2 → kullanıcı (LAUNCH-CHECKS §1) · 3 → d2 (hash, Esc, geri) · 4 → şema (eksik çeviri build'i kırar) · 5 → yukarıdaki lisans kontrolü · 6 → event öznitelikleri d1'de test ediliyor, canlı kanıt Umami ID'sini bekliyor · 7 → PSI mobil 100 (5 koşu ortancası, 2026-11-27), erişilebilirlik 100, axe 0 · 8 → d3, d7, d8, d10 reduced-motion ve duraklatma testleri.
- **Preview'da bulundu:** CSP, Vercel'in preview'lara eklediği araç çubuğunu (`vercel.live`) engelliyordu. Belgedeki adresler yalnız `VERCEL_ENV=preview` build'lerinde CSP'ye ekleniyor; production CSP'si değişmedi (`9f3c8a6`). Preview'a erişim için kullanıcı onayıyla 23 saatlik paylaşım linki açıldı (27.11.2026 22:16'da sona eriyor).
- **Production'da doğrulananlar (2026-11-27):** `/` ve `/en` 200, olmayan yol 404. CSP (sıkı hali), COOP, Permissions-Policy, Referrer-Policy, nosniff, X-Frame-Options ve HSTS geliyor. 375 / 1280 / 1350'de CSP ihlali yok, masa oynarken 5 sn boyunca yatay taşma 0, JSON-LD `Person`, overlay açıkken tek contentinfo. Ekran görüntüleri canlıdan: `artifacts/home-*`, `en-*`.
- **PSI yapılamadı:** API 429; arayüz analizi 3 dakikada bitirmedi (aynı kota olabilir). Bir sonraki oturumda 5 koşu ortancası.
- **Senin için:** `docs/LAUNCH-CHECKS.md` (30 sn testi metni, 10 dk ekran okuyucu turu, Umami doğrulaması).
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (88/88), `check:tokens` (94 dosya), `build`, `test:e2e` (132/132; yeni `s16-quality.spec.ts`: başlıklar, CSP ihlali yok (375 ve 1280, tüm katmanlar yüklüyken), JSON-LD, overlay'de tek banner/contentinfo, masa oynarken yatay taşma yok).

### S15 · D10 · Intro (canlıda)

- **Metin** (CONTENT §4; şemada `hero.intro`): üç kelime ("Harita. / Belgesel. / El kitabı.", EN "A map. / A documentary. / A handbook."), kapanış "Hepsi birer ürün." / "Each one a product.", geçme ipucu.
- **Intro** (`components/intro/`): sunucu bileşeni, sıfır JS; tamamen CSS. Kâğıt perde üstünde dönen bant sayacı, kelimeler 500 ms adımla, sonra kapanış; perde 2,45 sn içinde kapanır. Oturum başına bir kez, yalnız ≥ 1024 px; reduced motion veya duraklatılmış hareketle hiç gösterilmez. `aria-hidden`, odaklanabilir öğe yok; içerik altında baştan çizili.
- **Karar betiği** (`lib/intro-preference.ts`): `<head>`'de satır içi; ilk boyamadan önce `data-intro="play|done"` koyar ve tıklama/tuş dinleyicisini bağlar, yani hidrasyondan önce de geçilebilir (ilk denemede dinleyici React effect'indeydi ve erken Tab'ı kaçırıyordu).
- **Bulgu: `next/script beforeInteractive` App Router'da ilk boyamadan önce çalışmıyor**, Next'in runtime'ı yüklenince çalışıyor (ölçüm: ≈ 1,6 sn geç). D7'deki "ilk boyamadan önce" iddiası bu yüzden yanlıştı; hareket tercihi betiği de düz `<script>`'e taşındı.
- **Bulgu: betik konumu LCP'yi etkiliyor.** Aynı iki betik `<body>` başında mobil LCP'ye ≈ 100 ms ekledi; `<head>`'de etkisiz. Önce/sonra (aynı makine, D9 worktree'siyle yan yana, 4× CPU, 5 koşu medyanı): mobil LCP D9 356–372 → D10 356–360 ms; masaüstü 376–380 → 392 ms.
- **Testler:** `tests/e2e/fixtures.ts` diğer tüm spec'lerde intro'yu "görüldü" sayar (axe kontrastı görsel ölçüyor; aria-hidden olsa da yarı saydam kelimelere takılıyordu). `d10-intro.spec.ts`: ilk ziyarette oynar, `intro-out` ≤ 2500 ms'de biter, kelime hızı saniyede < 3, yenileyince tekrar oynamaz, Tab ve tıklama geçer (odak "İçeriğe geç"e), h1 altta çizili, aria-hidden + odaklanabilir yok + axe 0; 375/768'de, reduced motion'da ve duraklatılmışken hiç yok.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (87/87), `check:tokens` (92 dosya), `build`, `test:e2e` (127/127).
- Ekran görüntüleri: `artifacts/d10/` (intro karesi TR/EN 1280), `artifacts/home-*`, `en-*` (intro bittikten sonraki sayfa). Not: Playwright'ın yeni açılmış tarayıcısındaki ilk sayfa ≈ 1,3 sn hiç boyanmıyor (soğuk başlangıç); animasyon saati ilk boyamada başladığı için intro kısalmıyor.

### Production'da doğrulananlar (D8 + D9 + D10, 2026-11-26)

- `/` ve `/en` 200, olmayan yol 404. Canlı HTML'de iki betik `<head>`'de, intro perdesi ve TR kelimeler var.
- Canlıda intro: 1280'de ilk ziyarette oynuyor, tıklama geçiyor, yenileyince yok; 375'te hiç yok. Ekran görüntüleri canlıdan: `artifacts/home-*`, `en-*`.
- **PageSpeed Insights (2026-11-26 22:56):** mobil **99 · LCP 1,1 sn · FCP 1,1 sn · CLS 0 · TBT 30 ms** · Speed Index 3,7 sn; masaüstü 100, LCP 0,3 sn, CLS 0,002. Erişilebilirlik, Best Practices, SEO 100. Tek koşu. Speed Index D7'deki 4,4 sn'den düşük ama hâlâ önceki 2,1–3,4 aralığının üstünde; masaüstü CLS 0'dan 0,002'ye çıktı (bütçe 0,1). İkisi de S16'da 5 koşu medyanıyla bakılacak.

### S14 · D9 · Hero çalışma masası + özel imleç (canlıda)

- **Metin** (CONTENT §4, §8; şemada): `hero.desk` (ticket "ID · BAŞLIK · DURUM", bildirim "KAYNAK · MESAJ", imleç etiketi), `cassette.pill` ("▶ Aç" / "▶ Play").
- **Masa** (`components/hero/`): ticket kartı, "Vercel · Deployment ready" bildirimi, "Claude" etiketli pixel imleç; marka adları yalnız metin (ADR-16). Sahne **bir kez** oynar (bildirim kayar, imleç ticket'a süzülüp dokunur, ≤ 4 sn); süre ve gecikmeler token, duraklatılmışken doğrudan son kare. `aria-hidden`. ≥ lg'de CTA satırının içinde mutlak konumlu: üst kenarı CTA hizasında, isim ve rol satırının altında; yükseklik eklemez, geç gelişi kaydırma yapmaz (CLS). Hero'nun alt boşluğu ≥ lg'de büyütüldü. Kodu yalnız masaüstünde, sayfa yüklenip tarayıcı boşa düşünce iner. Mobil/tablet: sunucuda çizilmiş statik ticket.
- **Özel imleç:** `public/cursor/arrow.svg` (ızgaradan üretilmiş pixel ok; renkleri mürekkep ve kâğıt ama dosya `public/` altında olduğu için ham hex taşıyor, token denetimi dışında). Yalnız `pointer: fine`; metinde native I-beam, linkte el. Rafta kaset üstünde "▶ Aç" hapı (`CassettePill`, transform ile izler, `aria-hidden`); dokunmatikte yok.
- **Bulunan ve düzeltilen:** ilk yerleşimde masa ismin "ğ" kuyruğuna ve rol satırına biniyordu (konum masanın yüksekliğine bağlıydı) → CTA satırına alındı.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (87/87), `check:tokens` (89 dosya), `build`, `test:e2e` (117/117; D9: 375/768/1280'de hero bilgisi ilk ekranda, 1024/1280/1440'ta masa hero metnine binmiyor, bir kez oynayıp duruyor, duraklatılmışken son kare, telefonda masa kodu yok (pozitif kontrollü) ve statik ticket var, aria-hidden + axe 0, imleç CSS'i ve metinde native imleç, kaset üstünde hap, dokunmatikte hap yok).
- **Önce/sonra (yerel, 4× CPU, 5 koşu medyanı):** mobil LCP 396 → 392 ms, tıklama 32 → 32 ms; masaüstü LCP 420 → 404 ms, kaset açma 328 → 336 ms. Kötüleşme yok.
- Ekran görüntüleri: `artifacts/d9/`, `artifacts/home-*`, `en-*`.

### S13 · D8 · Oda dekoru (canlıda)

- **Veri:** `content/taste/records.yaml` (7 albüm), `stamps.yaml` (7 yer, TR/EN; sprite adı şemada sabit liste). VHS sırtları `films.yaml` favorilerinden.
- **Dekor** (`experience/DecorLayer.tsx`): 14 VHS sırtı (3-3-3-3-2, Seçili işler / İlkeler / Site / İletişim kenarlarında), 7 plak sırtı (aralıksız 4 + 3), 7 pixel pul (Hakkımda solunda 4, İletişim sağında 3), Hakkımda'da desen. Sırtlarda yalnız temel palet (kaset renkleri projelere ait, SPEC §8); pullar tam palet. Hepsi `aria-hidden`, hover'da yalnız hafif kalkma; reduced motion ve "hareketi durdur"da o da yok.
- **Yerleşim:** her bölüm sunucuda boş `DecorSlot` yuvaları taşıyor (kenar boşluğunda, `hidden xl:flex`); dekor oraya portal ile yerleşiyor, konumu bölümün CSS'i belirliyor.
- **Yükleme** (`DecorLoader`): yalnız ≥ xl ve tarayıcı boşa düşünce (`requestIdleCallback`, Safari'de kısa zaman aşımı). Dekor parçası **4,8 KB (gzip 1,8 KB)**.
- **Desen:** yeni token `--color-pattern: #FBF5F1`, pudra zeminden açık: kiremit notların kontrastı desen üstünde 4,61 → 4,91. Portre ve bayrak sütununa uzanmıyor. Yeni token `--z-behind: -1` (desen metnin altında).
- **Plandan sapma:** ROADMAP ≥ 1024 diyordu; D7'deki gerekçeyle ≥ 1280 (kenar boşluğu ancak orada yetiyor). Gruplar plandaki 7'şerlik yerine 3'lük (64 px'e aralıklı en fazla 3 sırt sığıyor); 14. sırt için İletişim'e bir yuva eklendi.
- **Görsel düzeltmeler (tarayıcıda bulundu):** VHS'te yıl ada biniyordu (yıl üst uca alındı), pul etiketleri ekran kenarından taşıyordu (64 px içinde kırılıyor), desen fazla sıktı (seyrekleştirildi).
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (87/87; +15 pul sprite), `check:tokens` (83 dosya), `build`, `test:e2e` (104/104; D8: 375 ve 768'de dekor kodu yok (pozitif kontrollü), 1280'de < 300 KB, 1024'te yuvalar gizli, 1280 ve 1440'ta metne ve ekran kenarına binen dekor yok, 28 parça yerinde, desen tondan açık ve kiremit ≥ 4,5, desen portre sütununa girmiyor, aria-hidden + axe 0, duraklatınca hover hareketi yok).
- Ekran görüntüleri: `artifacts/d8/`, `artifacts/home-*`, `en-*`.

### S12 · D7 · Pixel motoru + maskot + walkman (canlıda)

- **Veri:** `content/taste/films.yaml` (29 film, 14 favori; build 14'ü kontrol eder), `songs.yaml` (7 şarkı, ilk yayım yılı; kaynak Wikipedia). Başlıkların dili (`lang`) işaretli.
- **Pixel motoru** (`components/pixel/`): karakter ızgarası → satır satır birleşmiş `<rect>`'ler; renkler yalnız token sınıflarından, palet dışı karakter hata verir (unit test). Sprite'lar: saksı bitkisi (taban + 5 yaprak + çiçek katmanları), walkman (iki makara karesi).
- **Maskot** (`experience/Mascot.tsx` + `MascotLoader`): okudukça yaprak açar, İletişim'de çiçeklenir; hero'da yok; `aria-hidden`. Reduced motion / "hareketi durdur"da sabit poz (3 yaprak). Kodu `next/dynamic` ile yalnız ≥ xl'de iner (e2e içerikle kanıtlar). 404'te sabit, JS'siz bitki.
- **Walkman** (`experience/Walkman.tsx`, `lib/walkman.ts`): rastgele film/şarkı, art arda aynısı yok (unit + e2e), sonuç `aria-live="polite"`, İngilizce başlık `lang="en"`. Basınca makaralar kısa an döner (duraklatılmışken dönmez). ≥ xl sağ alt kenar boşluğunda, balon 8 sn sonra kapanır; altında footer'da. Overlay'in altında kalır: ATAMap açıkken görünmez.
- **Hareketi durdur / başlat** (`MotionToggle`, `lib/experience-store.ts`): her genişlikte footer'da, `aria-pressed`. Tercih `localStorage`'da; `<head>`'deki satır içi betik ilk boyamadan önce `data-motion="paused"` koyar (D10'da düzeltildi: önceki `next/script beforeInteractive` ≈ 1,6 sn geç çalışıyordu). Motion `reducedMotion: "always"`; CSS zaten `[data-motion="paused"]`'e uyuyordu. e2e: duraklatınca çalışan animasyon 0, yenileyince korunur.
- **Plandan sapma:** maskot ve sabit walkman ROADMAP'teki ≥ 1024 yerine **≥ 1280 (xl)**. Sebep: 1024–1279'da kenar boşluğu 32 px, ikisi de sığmıyor ve metnin üstüne biniyordu; SPEC "dekor yalnız kenar boşluklarında" kuralı öncelikli. Aynı sebeple "Hareketi durdur" sabit değil, footer'da.
- **D6 hatası düzeltildi:** `body`'deki `bg-paper` `html`'deki ton rengini örtüyordu; D6'nın zemin tonu production'da **hiç görünmüyordu** (D6 testi yalnız `html` rengini ölçüyordu). `body` arka planı kaldırıldı; D6 testi artık görünen katmanı da kontrol ediyor (eski kodda düşüyor, yenisinde geçiyor).
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (72/72; +4 walkman, +17 pixel), `check:tokens` (79 dosya), `build`, `test:e2e` (95/95; D7: öneri biçimi ve tekrar yok, overlay altında kalma, footer yerleşimi, duraklat + yenile, maskot büyüme + çiçek + sabit poz, telefonda maskot kodu yok (pozitif kontrollü), 404 bitkisi, axe 0). `/break-ui?data=worst` footer: 320–1280 taşma yok. 1024/1280/1440'ta sabit öğe metne binmiyor.
- **Performans (yerel, D6'ya karşı):** JS ilk yük +2,5 KB; maskot parçası yalnız ≥ xl'de +1,4 KB. TBT vekili (4× CPU, 5 dönüşümlü koşu, uzun görevlerden): main medyan 107 ms, D7 82 ms; fark gürültü düzeyinde. Yerel Lighthouse bu turda güvenilmezdi (sıkıştırmasız yerel sunucu, eşzamanlı iki sunucu; main kendi içinde TBT 93–581 ms), raporlanmadı.
- Ekran görüntüleri: `artifacts/d7/`, `artifacts/home-*`, `en-*`.
- **Production (D7):** `/`, `/en`, `/sitemap.xml` 200; rastgele URL 404. HTML brotli 30,2 KB (D6: 28,4). **Ton artık görünüyor:** İlkeler'de `rgb(238, 240, 230)`, üstünü boyayan katman yok. Maskot, walkman ve "hareketi durdur" (yenileyince korunur) çalışıyor; konsolda hata yok.
- **PageSpeed Insights (2026-11-25 16:23):** mobil **97 · LCP 1,1 sn · FCP 1,1 sn · CLS 0 · TBT 0 ms** · Speed Index 4,4 sn; masaüstü 100, LCP 0,2 sn. Tek koşu. D6'daki TBT 100 ms bu koşuda 0: büyük olasılıkla gürültüydü (yerel TBT vekili de artış göstermedi). **İzlenecek: Speed Index 4,4 sn** (önceki koşular 2,1–3,4); tek koşu, S16'da 5 koşu medyanıyla bakılmalı.

### S11 · D6 · Gezinme katmanı (canlıda)

- **Aktif bölüm** (`lib/active-section.ts`): tek IntersectionObserver, ekranın %40'ındaki çizgiyi kesen bölüm; gösterge ve ton aynı kaynağı okur.
- **Bölüm göstergesi** (`experience/SectionIndicator.tsx`): sol altta "Şu an: {bölüm}" (CONTENT §8). Hero'da gizli (ilk ekranın üstüne bir şey binmez), sonra belirir. `aria-live` yok. Uzun etiket "…" ile kısalır, ekran eksi iki kenar boşluğundan geniş olmaz. Footer'a alt boşluk eklendi; sayfa sonunda İletişim linklerini örtmez.
- **J-card içindekiler**: Radix Popover; bölümler + 7 kaset, ≥ md iki panel arasında kesik "katlama" çizgisi, mobilde alt alta. Açılınca odak bulunulan bölümün linkinde (`aria-current="location"`), Esc kapatır, odak düğmeye döner. Panel diyaloğu kendi başlığıyla adlandırıldı (axe yakaladı). Menüden açılan kaset analytics'te `menu`. Yeni token `--container-jcard: 30rem`.
- **Zemin tonu** (`experience/ToneController.tsx`, `globals.css`): İlkeler adaçayı `#EEF0E6`, Hakkımda pudra `#F7EDE8`; ikisi de kâğıttan açık, bütün metin çiftlerinde kontrast artar (kiremit 4,52 → 4,61). Geçiş `--duration-slow`; e2e her karede kiremit ≥ 4,5 ölçer. JS yoksa kâğıt.
- **Overlay'de "şu an okunan parça"** (`case-study/TrackIndicator.tsx`): kaset renginde hap, panelin kendi kaydırmasından; `aria-hidden` (başlıklar ve tracklist aynı bilgiyi verir).
- Üç katman da `ExperienceBoundary` içinde; çökerse header nav çalışır. Yeni metin yok.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (47/47), `check:tokens` (68 dosya), `build`, `test:e2e` (86/86; D6: hero'da gizli + doğru bölüm adı, live region yok, 375'te CTA ve İletişim örtülmez, klavyeyle aç / Esc / odak dönüşü, menüden 5 bölüm ve 7 kaset, reduced motion'da animasyonsuz, axe 0, ton her karede AA, overlay'de B1). `/break-ui?data=worst`: 320–1280'de taşma yok (iki taşma bulundu ve düzeltildi: uzun hap, bölünemeyen kaset adı). Ekran görüntüleri `artifacts/d6/`, `artifacts/home-*`, `en-*`.
- **Production (D6):** `/`, `/en`, `/sitemap.xml` 200; rastgele URL 404. HTML brotli 28,4 KB (D5: 25,9). Hero'da gösterge yok; İlkeler'de "ŞU AN: İLKELER" ve ton `rgb(238, 240, 230)`; menü klavyeyle açılır, odak "İlkeler"de; menüden ErasmusMap açılır, overlay'de "ŞU AN: B2 · SONUÇ"; konsolda hata yok.
- **PageSpeed Insights (2026-11-22 17:48):** mobil **99 · LCP 1,0 sn · FCP 1,0 sn · CLS 0 · TBT 100 ms** · Speed Index 2,1 sn; masaüstü 100, LCP 0,3 sn. İlk deneme PSI'de "Unable to resolve" verdi (site o sırada 200 dönüyordu), ikincisi ölçtü. **İzlenecek: TBT 100 ms** (D4–D5'te 10–20 ms). Bütçe içinde ama D6'nın istemci kodunun (Radix Popover, gözlemciler) bedeli olabilir; tek koşu, kesin değil. D7 maskot ve walkman ekleyecek: D7 sonunda TBT tekrarlı ölçülmeli, gerekirse göstergeyi ve menüyü `next/dynamic` ile hero geçildikten sonra yükle.

### S10 · D5 · Bu site nasıl yapıldı + Krediler (canlıda)

- **Colophon** (`sections/Colophon.tsx`): CONTENT §7 metni birebir ("pixel nesneler" cümlesi kullanıcı onayıyla korundu; S-son'da yeniden okunacak). Nav'da "Site" (≥ md), footer'da "Krediler" → `#credits`.
- **Krediler** (`content/credits.yaml`, ARCHITECTURE §3 modeli): 4 font (SIL OFL 1.1; tasarımcılar google/fonts `METADATA.pb`'den, linkler 200 döndü), Atatürk portresi (Agence Meurisse, BnF, kamu malı; kaynak `respect.yaml` ile aynı), Claude (Anthropic). Türe göre gruplu, boş grup gösterilmez; her kaynak ve lisans gerçek link, `rel="noopener noreferrer"`. Bayrak listede yok (kendi çizimimiz, kaynağı kanun).
- **Vercel build hatası ve düzeltmesi:** ilk preview (`75d67da`) OG görselinde "No fonts are loaded" ile düştü. Sebep: OG, build sırasında Google Fonts'tan font indiriyor; indirmelerin hepsi başarısız olunca kod boş `fonts: []` gönderiyordu ve Satori varsayılana düşmek yerine build'i kırıyordu (D1'den beri gizli hata; bu sefer ağ tetikledi). Düzeltme `lib/og/render.tsx`: liste boşsa seçenek gönderilmez, paketli varsayılan font kullanılır. Kanıt: indirmeler simüle edilerek kapatıldığında eski kod aynı hatayı veriyor, yenisi 9/9 geçiyor. Kalıcı çözüm adayı: OG fontlarını repoya almak (build dış servise bağımlı kalmaz).
- **Build kuralı** (`checkCredits`): portre varsa aynı kaynaklı fotoğraf kredisi, `lib/fonts.ts`'teki 4 fontun her biri ve kullanılan her türün iki dilde etiketi şart; yoksa build düşer.
- **Doğrulama (yerel):** `format:check`, `lint`, `typecheck`, `test` (47/47; +4 kredi), `check:tokens` (63 dosya), `build`, `test:e2e` (76/76; D5: TR/EN metin, gruplar boş değil, fontlar + portre kredili ve portreyle aynı kayıt, dış linklerde `rel`, footer linki krediye iner, nav, axe 0). `/break-ui?data=worst`: 320–1280'de taşma yok; worst-case nav etiketleri 768'de iki-üç satıra kırılıyor (gerçek etiketler tek satır). Ekran görüntüleri `artifacts/d5/`, `artifacts/home-*`, `en-*`.
- **Production (D5):** `/`, `/en`, `/sitemap.xml` 200; rastgele URL 404. Krediler 3 grup (Fontlar, Fotoğraf, Yapay zekâ), footer linki `#credits`'e iner, bütün dış linklerde `rel` doğru, nav "Site" → `#colophon`, konsolda hata yok. OG görseli bu build'de özel fontlarla üretildi (Google Fonts erişilebilirdi; `artifacts/d5/og-en.png`).
- **PageSpeed Insights (2026-11-22 13:51):** mobil **97 · LCP 1,8 sn · FCP 1,8 sn · CLS 0 · TBT 20 ms** · Speed Index 3,4 sn; masaüstü 100, LCP 0,3 sn. Tek koşu (ikinci istek aynı raporu önbellekten döndürdü). Tek koşular arasında oynama büyük: D3 1,7 · D4 0,9 · D5 1,8 sn. Bütçe (2,5 sn) içinde; eğilim için S16'da 5 koşunun medyanı alınmalı.

### S9 · D4 · İlkeler + Hakkımda (canlıda)

- **İçerik** CONTENT §5–6'dan birebir: `content/principles.yaml` (5 ilke + bağlı kaset), `site/{tr,en}.yaml` → `principlesOpening`, `about` (hikâye, 3 kenar notu, künye, Hedeflerim, portre altyazısı, bayrak adı), nav `İlkeler` / `Hakkımda`.
- **Şema ve bütünlük:** koşul ≤ 70, eylem ≤ 120 karakter; Hakkımda ≤ 120, Hedeflerim ≤ 60 kelime; tam 5 ilke, benzersiz sıra. Chip sözdizimi `[Etiket](#slug)` (`lib/content/story.ts`). Bozuk chip, var olmayan kasete chip, hikâyede olmayan chip'e not ve **ATAMap'e not build'i düşürür** (`lib/content/integrity.ts`, Vitest).
- **İlkeler** (`sections/Principles.tsx`): tek cümle ekranı (≥ lg tam ekran; giriş kaydırmaya bağlı CSS `animation-timeline: view()`, JS yok; desteklemeyen tarayıcı, reduced motion ve "hareketi durdur"da doğrudan görünür). 5 ilke numarasız liste (sıraları yok), her biri kaset renginde chip.
- **Hakkımda** (`sections/About.tsx`): hikâye ortada, proje adları chip (`cassette/CassetteChip.tsx`). Kenar notları (Caveat, kiremit, AA) gerçek metin: ≥ lg sol kenarda kendi satırıyla aynı hizada, altında cümlenin arkasında ayrı satır; chip'ten sonraki noktalama notun önünde kalır. Künye, Hedeflerim. Fotoğraf yok (kullanıcı kararı): tek sütun.
- **Saygı bileşenleri** (`components/respect/`): `TurkishFlag` 2893 sayılı Kanun ekindeki cetvelden (kanun PDF'i okundu; E ölçüsü iç çemberin gönder tarafındaki kesişiminden). Kırmızı resmî değer değil, fiilî `#E30A17` → token `--color-flag-red`. `AtaturkPortrait` sabit çerçeve, altyazı = `alt`. İkisi de hareket/hover almaz; e2e geçiş ve animasyon olmadığını doğrular.
- **Portre:** Agence Meurisse, 1922, BnF (Meurisse 2158 A). Gallica bot korumalı ve doğrudan indirme izin denetimine takıldı; aynı BnF taraması Wikimedia Commons'ta kamu malı etiketiyle (PD-France, PD-1996, PD-US expired) bulundu ve oradan indirildi. Yalnız 3:4 kırpma (plaka numaraları dışarıda), 600×800 WebP 55 KB. Kaynak ve hak satırı `content/respect.yaml`'da; D5 krediler listesine taşınır.
- **Overlay:** chip'ten açılan kaset kapanınca odak chip'e döner (rafta değil). Analytics kaynağı `chip`.

### S9'da doğrulananlar (yerel)

- `format:check`, `lint`, `typecheck`, `test` (43/43; +8 hikâye/bütünlük), `check:tokens` (62 dosya), `build`, `test:e2e` (69/69; D4: portre adı ve 3:2 bayrak, 5 ilke chip'i doğru kaseti açar ve odak geri döner, hikâye chip'leri, notlar gerçek metin + ATAMap'te not yok, masaüstünde not chip hizasında, mobilde metin içinde, saygı bileşenlerinde hareket yok, kırık görsel yok, nav, axe serious/critical 0, EN). D2 testleri artık raf (`#work`) içinde arıyor: aynı ada sahip chip'ler var.
- `/break-ui?data=worst` (şema sınırında metinler): 320 / 375 / 768 / 1280'de taşma yok.
- Ekran görüntüleri: `artifacts/home-*.png`, `en-*.png` (375 / 768 / 1280), `artifacts/d4/` (bölümler, worst-case).

### Production'da doğrulananlar (D4)

- `/`, `/en`, `/sitemap.xml` 200; rastgele URL 404. HTML brotli 25,9 KB (D3: 22,2; yeni iki bölümün metni).
- Headless: İlkeler'deki ATAMap chip'i `#atamap`'i açar, Esc → odak chip'e döner; portre yüklenir (alt metni doğru), bayrak ve 3 kenar notu yerinde; `/en` başlık ve "Turkish flag" doğru; konsolda hata yok.
- **PageSpeed Insights (2026-11-22 12:27):** mobil **Performans 100 · LCP 0,9 sn · FCP 0,9 sn · CLS 0 · TBT 10 ms** · Speed Index 0,9 sn; masaüstü 100, LCP 0,3 sn. Tek koşu. D3'teki 1,7 sn'den düşük olması büyük olasılıkla koşu farkı (sıcak CDN), D4'ün hızlandırdığı anlamına gelmez; bütçenin (2,5 sn) çok altında.

### S8 · D3 · Kaset çalar (canlıda)

- **Motion 14.14.0** (exact pin). `MotionProvider`: `LazyMotion` (strict, `domMax` hydration'dan sonra async) + `MotionConfig reducedMotion="user"`. Süre ve easing `lib/motion-tokens.ts` ile token'lardan okunur.
- **Makaralar** (`cassette/CassetteReels.tsx`): bant miktarı alan korunarak hesaplanır (sol makara boşalır, sağ dolar); göbek dişleri dönüşü gösterir (okuma boyunca 3 tur). Kapakta "çalınmamış" hal, overlay şeridinde `useScroll({ container })` ile okuma ilerlemesi. Dekor, `aria-hidden`. Mobilde de şeritte var.
- **Raftan çalara uçuş:** ≥ 1024 px'te, rafta tıklanan (ya da klavyeyle Enter'lanan) kasetin makara penceresi `layoutId` ile şeride uçar (450 ms, `--ease-out`); kapanınca, panel kaydırılmış olsa bile kapağa döner. Paylaşılan link ve "Sıradaki kaset" uçuşsuz açılır. ≥ 1024 px'te panel yalnız belirir; altında D2'deki kayma sürer.
- **Vurgu rengi:** overlay'de kaset rengi yalnız yüzey olarak (metin eşiyle): parça numarası etiketi, tracklist hover'ı, liner notes ayracı, metin seçimi. Metin hep mürekkep; hardal / zeytin / gül kurusu kâğıt üstünde metin olamaz.
- **Hover:** sırt 12 px kalkar ve gölge alır; kapak kartı sırt tarafından 16 px kayarak gelir (yalnız gerçek imleçte; klavye odağında aynı).
- **Hata:** makaralar iki yerde de `ExperienceBoundary` içinde; hata verirse overlay ve kapak makarasız çalışır.
- **Reduced motion:** uçuş yok, makaralar dönmez, bant miktarı kaydırmayı izlemeye devam eder (onaylı sapma: sayısal gösterge yok).

### S8'de doğrulananlar (yerel)

- `format:check`, `lint`, `typecheck`, `test` (35/35; +4 `motion-tokens`), `check:tokens` (53 dosya), `build` (hepsi statik), `test:e2e` (56/56; D3: uçuş açılış/kapanış, paylaşılan linkte uçuş yok, hover kalkma, bant ilerlemesi, mobil makara, reduced motion, 7 rengin hepsinde chip rengi + axe serious/critical 0). D3 testleri 5 tekrarda 40/40.
- Klavye: Tab → kaset, Enter → uçuş + odak başlıkta, Esc → odak kasete döner.
- Ekran görüntüleri: `artifacts/home-*.png`, `en-*.png`, `overlay-atamap-*.png`, `overlay-en-erasmusmap-*.png` (375 / 768 / 1280), `artifacts/d3/` (hover, uçuş, okuma, makara yakın çekimleri).
- **Ağırlık (yerel, D2 ile aynı yöntem, `main` ayrı derlendi):** JS 152,9 → 207,8 KB (**+55 KB**: ilk yük +22, hydration sonrası async +33). HTML gzip 21,2 → 22,2 KB.
- **Yerel Lighthouse 13.6.0 (devtools throttling, 3'er koşu, aynı makine):** `main` LCP 2,83–2,88 sn → D3 2,88–2,93 sn · CLS 0 / 0 · TBT 125–133 ms her ikisinde. HTML yine sıkıştırılmadan sayıldı, mutlak değerler şişkin.
- **Etkileşim (4× CPU, Event Timing):** açılış tıklaması `main` 56–64 ms → D3 80–96 ms; ilk açılış 112–128 → 144–152 ms (bütçe < 200). Açılışta en uzun kare `main` 33 ms → D3 50–67 ms. **Kaydırma 61 fps, uzun kare yok** (iki sürümde de).

### Production'da doğrulananlar (D3)

- `/`, `/en`, `/sitemap.xml` 200; rastgele URL 404. HTML brotli 22,2 KB (D2: 21,9).
- Headless: kasete tıkla → `#atamap`, makaralar 403 → 128 px uçar; Esc → adres temizlenir, odak kasete döner; `/en#erasmusmap` açılır, chip hardal; konsolda hata yok.
- **PageSpeed Insights (temiz ölçüm, Google sunucusu, Avrupa, 2026-11-21 21:11):** mobil (Moto G Power, Slow 4G) **Performans 98 · LCP 1,7 sn · FCP 1,7 sn · CLS 0 · TBT 20 ms** · Speed Index 2,8 sn; masaüstü 100, LCP 0,3 sn. Tek koşu: ikinci koşu ve API, PSI'nin anahtarsız günlük kotasına takıldı (429).
- **Sonuç:** LCP 2,0 sn eşiğinin altında; case study gövdelerini sonradan yükleme optimizasyonu **gerekmiyor** (ADR-11 olduğu gibi). Aşağıdaki yerel sayılar Kaspersky yüzünden ≈ 0,7 sn şişkin.
- **Yerel Lighthouse 13.6.0 mobil, 5 koşu (Kaspersky arada):** Performans 93–95 · Erişilebilirlik / Best practices / SEO 100 · **CLS 0** (5/5) · TBT 61–139 ms · **LCP 2,36–2,45 sn** (D2: 2,3–2,4). JS 215,3 KB (D2: 157,3; **+58 KB**, async `domMax` da ölçüme giriyor).
- Preview kullanıcı onayıyla merge edildi; uçuş Safari / Firefox'ta denenmedi.

### Ne bitti

- S1 Keşif → `SPEC.md` · S2 İlham → `INSPIRATION.md` · S3 İçerik → `CONTENT.md` · S4 Mimari → `ARCHITECTURE.md` + `ROADMAP.md` · S5 Kurulum (iskelet, token'lar, `check:tokens`, fontlar, Velite, testler, ilk deploy).
- **S6 · D1 · İlk 30 saniye (canlıda):** header + dil düğmesi (hash'i taşır), skip link, Hero (mono etiket, dev isim, rol), İletişim (mailto, kopyala, LinkedIn, GitHub; CV yayımlanmadı), footer, içerikten 404, SEO temeli (metadataBase, hreflang, OG, sitemap, robots, favicon), Umami (env ile). Velite `--strict`. İlk ekran fontları preload (CLS 0). Ayrıntı: git geçmişi `88d1911`, `3e16628`, `e622d0f`.
- **S7 · D2 · Kaset rafı + overlay (canlıda):**
  - İçerik: `content/projects/<slug>/{project.yaml,tr.md,en.md}` × 7. Metin CONTENT §2–3'ten birebir taşındı (254 satır/alan otomatik karşılaştırıldı; liner notes'ta TR / EN çiftleri dillere ayrıldı). Parçalar `## A1 · …` başlıklarıyla.
  - Şema (`velite.config.ts`): `projects` + `caseStudies`; parçalar tam A1–B3 sırasıyla, problem ≤ 90, sonuç ≤ 60, künye "ROL · YIL · EKİP", tek öne çıkan, benzersiz slug/katalog/sıra, her projede TR + EN. `lib/content/tracks.ts` parçalara böler, okuma süresini hesaplar (TR 180 / EN 200 kelime/dk, 0:05'e yuvarlı).
  - Raf (`sections/Shelf.tsx`, `cassette/shelf.css`): ≥ lg'de 7 sırt + tek kapak kartı (varsayılan öne çıkan; hover yalnız gerçek imleçte, klavye odağı her zaman); < lg'de etiket kartları, bilgi hep görünür. Tipografik kapak `cassette/CassetteCover.tsx`. Sırtta uzun başlık "…" ile kısalır.
  - Overlay (`case-study/CaseStudyOverlay.tsx`, client): Radix Dialog (radix-ui 1.8.1), hash = rota (ADR-11). Sayfadan açılış `pushState` + derinlik sayacı → Geri tuşu ve "Kapat" tek adımda sayfaya döner; paylaşılan `/#slug` → kapatınca `replaceState`. Açılışta odak başlıkta, kapanışta kasete döner. Başlık, Rol/Yıl/Ekip, okuma süresi, linkler (yoksa gizli), A/B tracklist (buton; hash'i bozmaz), parçalar, liner notes, "Sıradaki kaset", "Rafa dön". `case_study_open` event'i (`shelf` / `hash` / `next`).
  - Markdown sunucuda (react-markdown 10.1.0); B1 karar etiketleri mono büyük harf. Stil tek sarmalayıcı sınıfta (`markdown/case-study.css`).
  - Animasyon (`/animate`): kapak kartı opacity 150 ms (gerçek imleçte); overlay CSS keyframe ile belirme + 24 px kayma, açılış 250 ms / kapanış 150 ms, `--ease-out`. Reduced motion'da 0 ms.
  - Hero'da "İşlere bak", nav'da "Seçili işler" (≥ md), bölüm başlığı "Rafımdaki *yedi* kaset".
  - `/break-ui`: worst-case rafı (40 karakter başlık, bölünemeyen tek kelime, iki harfli başlık, linksiz proje). Bulunan 4 sorun düzeltildi: kart ve kapak başlığında taşma (`wrap-anywhere`), sırtta uzun başlık (tek satır + "…"), lg–xl arasında kartın raftan taşması (sırt 448 → 512 px). Bütün durumlar 320–1280 px'te taşmasız.
  - CONTENT §8'e 3 onaylı mikro metin; §10 güncel (Novera linki kapandı, okuma süreleri kapandı, ekran görüntüleri ertelendi).

### S7'de doğrulananlar (yerel)

- `format:check`, `lint`, `typecheck`, `check:tokens` (45 dosya), `test` (31/31), `build` (hepsi statik), `test:e2e` (48/48: D2 kabul testleri, açık overlay'de axe serious/critical 0, reduced motion, 320–1280'de taşma yok).
- Ekran görüntüleri: `artifacts/home-*.png`, `en-*.png`, `overlay-atamap-*.png`, `overlay-en-erasmusmap-*.png`, `overlay-b1-1280.png`.
- **Ağırlık (yerel, D1 ile aynı yöntem):** JS 138,7 → 152,9 KB (**+14 KB**; Radix Dialog + overlay). HTML gzip 5,3 → 21,2 KB (**+16 KB**): 7 case study sayfa verisinde geliyor, overlay ağ beklemeden açılsın diye (ADR-11'in bedeli).
- **Yerel Lighthouse (devtools throttling, 3 koşu):** CLS 0 / 0 / 0,079 · LCP 2,5–3,0 sn. Bu ölçümde HTML sıkıştırılmadan sayıldı (148 KB), gecikme abartılı; gerçek değer production'da ölçülecek.
- Okuma süreleri: hesaplanan ile CONTENT'teki elle yazılmış değerler arasında en büyük sapma 10 sn.

### Production'da doğrulananlar (D2)

- `/`, `/en`, `/sitemap.xml` 200; rastgele URL ve `/dev/break-ui` 404. Kasete tıkla → `#atamap`, Esc → kapanır, adres temizlenir, odak kasete döner; `/en#erasmusmap` doğrudan açılır; konsolda hata yok.
- **Lighthouse 13.6.0 mobil, 5 koşu:** Performans 94–95 · Erişilebilirlik / Best practices / SEO 100 · **CLS 0** (5/5) · TBT 40–110 ms · **LCP 2,3–2,4 sn** (D1: 1,7–2,0). JS 157,3 KB (D1: 142,4; **+15 KB**).
- **LCP kötüleşti, bütçenin (< 2,5 sn) içinde ama sınıra yakın.** Lighthouse HTML'i 143 KB sayıyor; `curl` ile brotli 21,9 KB (D1: 5,7 KB). Bu makinede Kaspersky HTTPS'i araya girip sıkıştırmasız iletiyor olabilir; o zaman ölçülen artışın bir kısmı makineye özgü. Doğrulanmadı: başka bir ağdan / PageSpeed Insights ile ölçülmeli.

### Plandan sapmalar ve bulgular

- **Motion bu dilimde kurulmadı:** overlay animasyonu CSS keyframe + Radix `data-state` ile; JS yok, reduced motion token'larla otomatik. Motion D3'te (`layoutId`) gelir.
- **Kaset erişilebilir adı** "GK-04 ATAMap case study'sini aç": görünen sırt metni adın parçası olmalı (WCAG 2.5.3, axe serious). Ad, linkin içeriği + gizli şablon parçalarından oluşuyor (`aria-label` yok).
- **Künye:** overlay'deki Rol / Yıl / Ekip, kart künyesinden ("ROL · YIL · EKİP") geliyor; CONTENT'teki "Künye:" satırının EN karşılığı yoktu.
- **Ekran görüntüsü script'i:** tam sayfa çekim CSS geçişlerini yeniden başlatıyordu; `animations: "disabled"` eklendi.
- Kapaklar tipografik; proje ekran görüntüleri ayrı küçük bir dilime ertelendi.
- 404 ve overlay'deki "Back to the shelf" 4 kelime (CONTENT §0 buton bütçesi 3); şemada bu iki alan muaf.

### Sıradaki adım

1. Kullanıcıdan: Umami ID, 30 sn testi, ekran okuyucu turu (`docs/LAUNCH-CHECKS.md`; turda Hakkımda'daki kimlik satırını da dinle: tireden sonra görünmez bir word joiner var).

### Açık sorular (kullanıcıdan)

| Ne                                                                  | Gerektiği dilim                  |
| ------------------------------------------------------------------- | -------------------------------- |
| IDDDergi canlı adresi                                               | gelince `project.yaml` → `links.live` |
| Umami Cloud hesabı ve Website ID (Vercel env'e)                     | kodsuz eklenir                   |
| 2–3 kişisel fotoğraf | sonra (küçük dilim) |
| 30 sn testi için bir kişi                                           | S16                              |

### Not

- Vercel önizlemeleri (branch deploy) SSO korumalı: yalnız Vercel hesabıyla açılır; production alias herkese açık.
- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor; CV'deki `/in/gurcankaradag` kullanıldı. Elle düzeltilecek.
- Yerel Lighthouse'ta Kaspersky enjeksiyonu için `--blocked-url-patterns="*kaspersky-labs.com*"`; yerel ölçümde HTML sıkıştırılmadan sayılabiliyor, ağırlık karşılaştırmasını gzip/brotli boyutuyla yap.
- **Kaspersky HTTPS'i araya giriyor (2026-11-21 doğrulandı):** sitenin sertifikası bu makinede "Kaspersky Anti-Virus Personal Root Certificate" imzalı geliyor. Yerel LCP mutlak değer olarak kullanılmaz (PSI'den ≈ 0,7 sn yüksek); karar ölçümü PageSpeed Insights ile (pagespeed.web.dev arayüzü; anahtarsız API günlük kotaya takılabiliyor). Yerel ölçüm yalnız aynı makinede iki build'i karşılaştırmak için.
- Git Bash'te yol argümanlarına `MSYS_NO_PATHCONV=1`.
- `/break-ui` sayfası: `npm run dev` → `localhost:3000/dev/break-ui?data=worst|demo`.
