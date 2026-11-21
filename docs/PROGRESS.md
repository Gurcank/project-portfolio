# PROGRESS

## Durum: S6 · D1 canlıda; CLS düzeltmesi `fix/d1-font-cls` branch'inde, merge onayı bekliyor (2026-11-21)

**Canlı:** https://project-portfolio-theta-mocha.vercel.app (D1, commit `88d1911`) · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.
**Branch:** `slice/d1-first-30-seconds` → `main`'e fast-forward merge edildi. Düzeltme: `fix/d1-font-cls`.

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

### Production'da doğrulananlar

- `/`, `/en`, `/sitemap.xml`, `/robots.txt` 200; rastgele URL 404; `/dev/break-ui` production'da 404. Canonical, hreflang, sitemap ve OG görseli production adresinde (preview'da OG preview adresini kullanıyordu; production'da düzeldi).
- **Lighthouse 13.6.0 mobil, 2 koşu:** Performans 98 / 91 · Erişilebilirlik 100 · Best practices 100 · SEO 100 (S5: 73 → 100). LCP 1,9 / 1,8 sn (S5: 2,2) · TBT 90 / 60 ms.
- **JS:** 9 dosya, **142,4 KB** transfer (455 KB sıkıştırılmamış). S5 bazına göre **+4,6 KB** (dil düğmesi + kopyalama düğmesi).
- **Fontlar:** 5 dosya / 256 KB (S5: 8 / 399 KB). Caveat artık indirilmiyor.
- **CLS: 0 / 0,176. İkinci koşu bütçeyi (< 0,1) aşıyor.** Lighthouse'a göre neden: preload'suz Fraunces Italic ve Geist Mono geç gelip yerine geçince hero yeniden akıyor, İletişim bölümü aşağı kayıyor. ADR-15'te öngörülen ödünleşim gerçekleşti.
- **CLS düzeltmesi (`fix/d1-font-cls`):** Fraunces Italic ve Geist Mono da preload ediliyor. Yerel production build, Lighthouse 13.6.0 mobil, `--throttling-method=devtools` (gerçek ağ gecikmesi, geç fontlar yerelde de görünür): önce CLS **0,177** (3/3 koşu), sonra **0,001** (5/5 koşu). LCP 1,8–1,9 sn, değişmedi; performans 88 → 95. Bedel: fontlar 5 → 6 dosya, 255 → 295 KB. ADR-15 ve SPEC §8/§9 güncellendi.

### Plandan sapmalar ve bulgular

- **Velite şema hatası S5'ten beri build'i düşürmüyordu** (yalnız uyarı, exit 0). CLI'nin `strict` varsayılanı config'i eziyor; bütün script'lerde `velite build --strict`. Dev watcher bilerek strict değil.
- **`site` şeması dilimle büyüyor:** ARCHITECTURE §3'teki tam `SiteCopy` yerine her dilim yalnız kendi alanlarını ekliyor (D1: meta, nav.contact, hero, sections.contact, microcopy, notFound, footer).
- `next.config.ts` artık `phase` fonksiyonu (`PHASE_DEVELOPMENT_SERVER`); `process.argv` kontrolü güvenilir değildi.
- 404 butonu "Back to the shelf" 4 kelime, CONTENT §0'daki buton bütçesini (≤ 3) aşıyor; şemada bu alan bütçeden muaf tutuldu. Metin değişikliği kullanıcı kararı.
- Sayfa başlığı ("Gürcan Karadağ · Product Manager adayı") onaylı parçalardan birleştirildi.

### Sıradaki adım

1. `fix/d1-font-cls` → kullanıcı onayı → `main`; sonra production'da mobil Lighthouse ile CLS'yi tekrar ölç.
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
