# PROGRESS

## Durum: S6 · D1 branch'e push'landı, preview onayı bekliyor (2026-11-21)

**Canlı:** https://project-portfolio-theta-mocha.vercel.app (hâlâ S5) · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.
**Branch:** `slice/d1-first-30-seconds`.

### Ne bitti

- S1 Keşif → `SPEC.md` · S2 İlham → `INSPIRATION.md` · S3 İçerik → `CONTENT.md` · S4 Mimari → `ARCHITECTURE.md` + `ROADMAP.md` · S5 Kurulum (iskelet, token'lar, `check:tokens`, fontlar, Velite, testler, ilk deploy).
- **S6 · D1 · İlk 30 saniye** (branch'te, yerelde doğrulandı):
  - `SiteHeader` (isim → `#top`, "İletişim", dil düğmesi), "İçeriğe geç" linki, `LanguageSwitch` (JS ile hash'i taşır: `/#contact` → `/en#contact`; JS'siz düz link).
  - `Hero`: mono etiket + ince çizgi (INS-17; ● dekor, `aria-hidden`), dev isim (LCP, metin), rol cümlesi tek italik vurguyla, "Bana yaz" → `#contact`. "İşlere bak" D2'ye kadar yok.
  - `Contact`: dev mailto e-posta, `CopyEmailButton` (tek client parça; "Kopyalandı" `role="status"`; pano reddinde adres seçilir + uyarı), LinkedIn, GitHub (`lang="en"`, TR büyük harfte "LİNKEDİN" olmasın diye), CV indir (`profile.yaml` → `cv` boş olduğu için şu an iki dilde de düğme yok).
  - `SiteFooter` ("Krediler" D5'e kadar yok). 404 metni artık `content/`'ten.
  - SEO: `metadataBase` (`VERCEL_PROJECT_PRODUCTION_URL`; domain gelince kod değişmez), description, canonical, hreflang, OG (iki dil; renkler build'de `tokens.css`'ten okunur, fontlar Google'dan subset), `sitemap.xml`, `robots.txt`, favicon (`app/icon.tsx`, kaset).
  - Umami: `NEXT_PUBLIC_UMAMI_WEBSITE_ID` varsa script yüklenir; `data-umami-event` attribute'ları hazır (`contact_email_click` mailto/copy, `contact_linkedin_click`, `cv_download`).
  - İçerik: `content/profile.yaml` (e-posta ve LinkedIn CV'den), `content/site/{tr,en}.yaml`. **CV yayımlanmadı** (kullanıcı kararı): mevcut CV'de telefon numarası ve ekip arkadaşının GitHub kullanıcı adı var. Yereldeki `public/cv/gurcan-karadag-cv-tr.pdf` kopyası commit'lenmedi.
  - CONTENT §8'e onaylanan 4 mikro metin + sayfa başlığı eklendi; §10'daki "Eksik mikro metinler" kapandı.
  - Geçici `TokenPreview.tsx` silindi.
- `/break-ui`: worst-case fixture `tests/fixtures/worst-case.ts`; yalnız `next dev`'de açılan sayfa `localhost:3000/dev/break-ui?data=worst|demo|no-cv` (`*.dev.tsx` + `pageExtensions`, production build'de yok). Bulunan 4 sorun düzeltildi: 320'de isim taşması (`wrap-anywhere`), nav ≤ 16 karakter, İletişim başlığı ≤ 40, CONTENT §0 kelime bütçeleri şemada (buton ≤ 3, hata ≤ 15).

### S6'da doğrulananlar (yerel)

- `format:check`, `lint`, `typecheck`, `check:tokens` (33 dosya), `test` (18/18), `build` (hepsi statik), `test:e2e` (34/34; D1 kabul testleri, axe serious/critical 0, 320/375/768/1280'de yatay taşma yok).
- Bozuk içerik artık build'i düşürüyor: EN dosyası eksik, vurgusuz başlık, olmayan CV yolu → exit 1.
- Ekran görüntüleri 375/768/1280 (TR + EN), `artifacts/`.

### Plandan sapmalar ve bulgular

- **Velite şema hatası S5'ten beri build'i düşürmüyordu** (yalnız uyarı, exit 0). CLI'nin `strict` varsayılanı config'i eziyor; bütün script'lerde `velite build --strict`. Dev watcher bilerek strict değil.
- **`site` şeması dilimle büyüyor:** ARCHITECTURE §3'teki tam `SiteCopy` yerine her dilim yalnız kendi alanlarını ekliyor (D1: meta, nav.contact, hero, sections.contact, microcopy, notFound, footer).
- `next.config.ts` artık `phase` fonksiyonu (`PHASE_DEVELOPMENT_SERVER`); `process.argv` kontrolü güvenilir değildi.
- 404 butonu "Back to the shelf" 4 kelime, CONTENT §0'daki buton bütçesini (≤ 3) aşıyor; şemada bu alan bütçeden muaf tutuldu. Metin değişikliği kullanıcı kararı.
- Sayfa başlığı ("Gürcan Karadağ · Product Manager adayı") onaylı parçalardan birleştirildi.

### Sıradaki adım

1. Vercel preview'da Lighthouse mobil (LCP/CLS, D1'in eklediği JS; baz 137,8 KB) → kullanıcı onayı → `main`.
2. Yayımlanabilir CV gelince: dosyayı `public/cv/`'ye koy, `profile.yaml` → `cv.tr`; düğme ve e2e testi kendiliğinden açılır.
3. Sonra S7 · D2 · Kaset rafı + overlay (`ROADMAP.md`).

### Açık sorular (kullanıcıdan)

| Ne                                                                  | Gerektiği dilim                       |
| ------------------------------------------------------------------- | ------------------------------------- |
| Yayımlanabilir TR CV (telefonsuz, Novera linksiz)                   | geldiğinde (D1 CV'siz çıkıyor)        |
| Umami Cloud hesabı ve Website ID (Vercel env'e)                     | D1 (kodsuz eklenir)                   |
| EN CV PDF'i                                                         | gelince `profile.yaml` → `cv.en`      |
| IDDDergi canlı adresi; Novera repo linki gösterilsin mi             | D2                                    |
| EN case study metinlerinin kontrolü                                 | D2 production'dan önce                |
| 2–3 kişisel fotoğraf; Atatürk portresi seçimi; kenar notu metinleri | D4                                    |
| 7 şarkının yılı                                                     | D7                                    |
| 30 sn testi için bir kişi; domain                                   | S16                                   |

### Not

- Vercel önizlemeleri (branch deploy) SSO korumalı: yalnız Vercel hesabıyla açılır; production alias herkese açık.
- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor; CV'deki `/in/gurcankaradag` kullanıldı. Elle düzeltilecek.
- Yerel Lighthouse'ta Kaspersky enjeksiyonu için `--blocked-url-patterns="*kaspersky-labs.com*"`.
- Git Bash'te yol argümanlarına `MSYS_NO_PATHCONV=1`.
- Mevcut e2e taşma testi metnin kutudan taşmasını yakalamıyordu; artık `scrollWidth` de kontrol ediliyor.
