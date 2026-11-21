# PROGRESS

## Durum: S7 · D2 kodu bitti, branch'te; commit + preview + onay bekliyor (2026-11-21)

**Canlı:** https://project-portfolio-theta-mocha.vercel.app (D1 + CLS düzeltmesi, commit `3e16628`) · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.
**Branch:** `slice/d2-cassette-shelf` (henüz commit yok).

### Ne bitti

- S1 Keşif → `SPEC.md` · S2 İlham → `INSPIRATION.md` · S3 İçerik → `CONTENT.md` · S4 Mimari → `ARCHITECTURE.md` + `ROADMAP.md` · S5 Kurulum (iskelet, token'lar, `check:tokens`, fontlar, Velite, testler, ilk deploy).
- **S6 · D1 · İlk 30 saniye (canlıda):** header + dil düğmesi (hash'i taşır), skip link, Hero (mono etiket, dev isim, rol), İletişim (mailto, kopyala, LinkedIn, GitHub; CV yayımlanmadı), footer, içerikten 404, SEO temeli (metadataBase, hreflang, OG, sitemap, robots, favicon), Umami (env ile). Velite `--strict`. İlk ekran fontları preload (CLS 0). Ayrıntı: git geçmişi `88d1911`, `3e16628`, `e622d0f`.
- **S7 · D2 · Kaset rafı + overlay (branch'te, yerelde doğrulandı):**
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

### Plandan sapmalar ve bulgular

- **Motion bu dilimde kurulmadı:** overlay animasyonu CSS keyframe + Radix `data-state` ile; JS yok, reduced motion token'larla otomatik. Motion D3'te (`layoutId`) gelir.
- **Kaset erişilebilir adı** "GK-04 ATAMap case study'sini aç": görünen sırt metni adın parçası olmalı (WCAG 2.5.3, axe serious). Ad, linkin içeriği + gizli şablon parçalarından oluşuyor (`aria-label` yok).
- **Künye:** overlay'deki Rol / Yıl / Ekip, kart künyesinden ("ROL · YIL · EKİP") geliyor; CONTENT'teki "Künye:" satırının EN karşılığı yoktu.
- **Ekran görüntüsü script'i:** tam sayfa çekim CSS geçişlerini yeniden başlatıyordu; `animations: "disabled"` eklendi.
- Kapaklar tipografik; proje ekran görüntüleri ayrı küçük bir dilime ertelendi.
- 404 ve overlay'deki "Back to the shelf" 4 kelime (CONTENT §0 buton bütçesi 3); şemada bu iki alan muaf.

### Sıradaki adım

1. D2 commit → push → Vercel preview → kullanıcı onayı → `main`; sonra production'da mobil Lighthouse (LCP, CLS, JS). LCP kötüleşirse ilk aday: case study gövdelerini overlay açılınca yüklemek.
2. **EN case study metinleri production'dan önce kullanıcı tarafından okunmalı** (CONTENT §10).
3. Sonra S8 · D3 · Kaset çalar (Motion, `layoutId`, makaralar).

### Açık sorular (kullanıcıdan)

| Ne                                                                  | Gerektiği dilim                  |
| ------------------------------------------------------------------- | -------------------------------- |
| EN case study metinlerinin kontrolü                                 | D2 production'dan önce           |
| IDDDergi canlı adresi                                               | gelince `project.yaml` → `links.live` |
| Yayımlanabilir TR CV (telefonsuz, Novera linksiz)                   | geldiğinde                       |
| Umami Cloud hesabı ve Website ID (Vercel env'e)                     | kodsuz eklenir                   |
| EN CV PDF'i                                                         | gelince `profile.yaml` → `cv.en` |
| 2–3 kişisel fotoğraf; Atatürk portresi seçimi; kenar notu metinleri | D4                               |
| 7 şarkının yılı                                                     | D7                               |
| 30 sn testi için bir kişi; domain                                   | S16                              |

### Not

- Vercel önizlemeleri (branch deploy) SSO korumalı: yalnız Vercel hesabıyla açılır; production alias herkese açık.
- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor; CV'deki `/in/gurcankaradag` kullanıldı. Elle düzeltilecek.
- Yerel Lighthouse'ta Kaspersky enjeksiyonu için `--blocked-url-patterns="*kaspersky-labs.com*"`; yerel ölçümde HTML sıkıştırılmadan sayılabiliyor, ağırlık karşılaştırmasını gzip/brotli boyutuyla yap.
- Git Bash'te yol argümanlarına `MSYS_NO_PATHCONV=1`.
- `/break-ui` sayfası: `npm run dev` → `localhost:3000/dev/break-ui?data=worst|demo|no-cv`.
