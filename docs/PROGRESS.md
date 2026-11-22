# PROGRESS

## Durum: S9 · D4 yerelde bitti; commit ve preview bekliyor (2026-11-22)

**Canlı:** https://project-portfolio-theta-mocha.vercel.app (D3, commit `3479845`) · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.
**Branch:** `slice/d4-principles-about` (henüz commit yok). D3: `slice/d3-cassette-player` → `main`'e merge edildi.

### S9 · D4 · İlkeler + Hakkımda (yerelde)

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

1. **D4:** commit → preview → onay → `main`. Sonra PSI ile LCP (D3: 1,7 sn).
2. S10 · D5 · Bu site nasıl yapıldı + Krediler (credits.yaml burada tamamlanır).

### Açık sorular (kullanıcıdan)

| Ne                                                                  | Gerektiği dilim                  |
| ------------------------------------------------------------------- | -------------------------------- |
| IDDDergi canlı adresi                                               | gelince `project.yaml` → `links.live` |
| Yayımlanabilir TR CV (telefonsuz, Novera linksiz)                   | geldiğinde                       |
| Umami Cloud hesabı ve Website ID (Vercel env'e)                     | kodsuz eklenir                   |
| EN CV PDF'i                                                         | gelince `profile.yaml` → `cv.en` |
| EN "Goals" ve "Türk bayrağı / Turkish flag" onayı; 2–3 kişisel fotoğraf | D4 (fotoğraflar sonra) |
| 7 şarkının yılı                                                     | D7                               |
| 30 sn testi için bir kişi; domain                                   | S16                              |

### Not

- Vercel önizlemeleri (branch deploy) SSO korumalı: yalnız Vercel hesabıyla açılır; production alias herkese açık.
- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor; CV'deki `/in/gurcankaradag` kullanıldı. Elle düzeltilecek.
- Yerel Lighthouse'ta Kaspersky enjeksiyonu için `--blocked-url-patterns="*kaspersky-labs.com*"`; yerel ölçümde HTML sıkıştırılmadan sayılabiliyor, ağırlık karşılaştırmasını gzip/brotli boyutuyla yap.
- **Kaspersky HTTPS'i araya giriyor (2026-11-21 doğrulandı):** sitenin sertifikası bu makinede "Kaspersky Anti-Virus Personal Root Certificate" imzalı geliyor. Yerel LCP mutlak değer olarak kullanılmaz (PSI'den ≈ 0,7 sn yüksek); karar ölçümü PageSpeed Insights ile (pagespeed.web.dev arayüzü; anahtarsız API günlük kotaya takılabiliyor). Yerel ölçüm yalnız aynı makinede iki build'i karşılaştırmak için.
- Git Bash'te yol argümanlarına `MSYS_NO_PATHCONV=1`.
- `/break-ui` sayfası: `npm run dev` → `localhost:3000/dev/break-ui?data=worst|demo|no-cv`.
