# ROADMAP — Dikey dilimler

> Durum: S4 (2026-11-21). Mimari: `ARCHITECTURE.md`. Her dilim bir oturum (`PROMPTS.md` → S6+): kendi branch'i → Vercel preview → onay → main (production).

## İlkeler

- **Sıra mantığı:** önce İK'nın 30 saniyesi (rol, müsaitlik, iletişim), sonra imza öğe (kaset rafı), sonra derinlik (ilkeler, hakkımda), en son deneyim katmanları (intro, imleç). Sondakiler en çok performans ve erişilebilirlik riski taşıyor; her biri ölçülerek eklenir ve tek başına geri alınabilir.
- **Her dilim yayına çıkabilir:** yarım özellik canlıya girmez. Henüz olmayan bölüm nav'da da, CTA'da da yoktur.
- **İçerik dilimle gelir:** o dilimin metni `CONTENT.md`'den `content/` altına taşınır, şemaya girer. Taşıma sırasında metin değişmez; değişiklik ayrı onayla.
- **Animasyon kuralı:** 5 sn'yi aşan otomatik hareket, "hareketi durdur" kontrolü gelmeden (D7) eklenmez.

## Ortak "bitti" tanımı (her dilim)

1. **Veri:** metin ve görsel yalnız `content/`'ten, şemadan geçmiş; TR + EN eksiksiz (build kontrol eder).
2. **Yerleşim:** mobile-first; `scripts/screenshots.ts` ile 375 / 768 / 1280 px ekran görüntüleri; INSPIRATION niyetiyle karşılaştırma notu.
3. **Durumlar:** yükleniyor (blur placeholder, font fallback, katman yüklenene kadar statik hal), hata (görsel yüklenemedi metni; katman hatasında içerik yerinde), boş (opsiyonel veri yoksa öğe gizli, kırık link yok). Dilim tablosunda o dilime özgü olanlar yazılı.
4. **Erişilebilirlik:** yalnız klavyeyle tam yol, görünür focus, axe'te serious/critical bulgu 0, kontrast AA, dekor `aria-hidden`, `prefers-reduced-motion` (ve D7'den sonra "hareketi durdur") çalışıyor.
5. **Kalite:** `build`, `lint`, `typecheck`, `test`, `test:e2e`, `check:tokens` yeşil. Lighthouse mobil spot kontrol: LCP ve CLS önceki dilimden kötüleşmedi; dilimin eklediği JS raporlandı.
6. **Yayın:** Vercel preview URL'i; onaydan sonra main; `PROGRESS.md` güncel; rapor: ne yaptım / ne yapmadım / neyi doğrulamadım.

## Dilim sırası

| Oturum | Dilim | Canlıda ne var | INS | CONTENT | Kullanıcıdan |
|---|---|---|---|---|---|
| S5 | Kurulum (Faz 3) | "Merhaba" sayfası + token önizlemesi; yayın hattı çalışıyor | INS-21 (token temeli) | — | GitHub ve Vercel adımlarına onay |
| S6 | D1 · İlk 30 saniye | Hero (statik), İletişim, nav, TR/EN, footer, 404, SEO temeli, analytics | INS-17, INS-15, INS-02 | §4, §5 başlıklar, §8 | Umami hesabı; EN CV (yoksa EN'de düğme gizli) |
| S7 | D2 · Kaset rafı + overlay | 7 kaset; hover/focus'ta kapak bilgisi; case study overlay (hash, Esc, geri tuşu), A/B tracklist, okuma süreleri, liner notes | INS-06, INS-08, INS-14, INS-16, INS-28 | §1, §2, §3 | Ekran görüntüsü onayı; IDDDergi adresi; Novera repo linki kararı; EN case study kontrolü |
| S8 | D3 · Kaset çalar | Raftan "çalma" geçişi; makaralar ve bant okuma ilerlemesiyle; overlay vurgu rengi | INS-19 (hover önizleme), INS-28, INS-06 | §8 overlay | — |
| S9 | D4 · İlkeler + Hakkımda | Tek cümle açılış ekranı; 5 ilke (kaset chip'li); chip'li hikâye, künye, hedefler; kenar notları; kişisel fotoğraflar; Atatürk portresi ve bayrak | INS-18 (tek cümle), INS-14, INS-05, INS-13, INS-27 (yerleşim) | §5, §6 | 2–3 fotoğraf; portre fotoğrafı onayı; kenar notu metinleri |
| S10 | D5 · Bu site nasıl yapıldı + Krediler | Colophon metni; kredi listesi (font, fotoğraf, portre, asset, AI) | — | §7 | — |
| S11 | D6 · Gezinme katmanı | Bölüm göstergesi + J-card içindekiler; bölümler arası zemin tonu; overlay içinde "şu an okunan parça" | INS-07, INS-18 (zemin) | §8 | — |
| S12 | D7 · Pixel motoru + maskot + walkman | `PixelSprite`; saksı bitkisi (okudukça yaprak, İletişim'de çiçek, 404'te); walkman; "hareketi durdur" kontrolü | INS-20 + INS-26, INS-12, INS-29 | §8, §9 walkman | 7 şarkının yılı |
| S13 | D8 · Oda dekoru | VHS sırtları (14), plak sırtları (7), doğa pulları (7), Hakkımda zemin deseni; yalnız ≥ 1024 px | INS-21, INS-25, INS-27 (desen), INS-29 | §9 | Gemini ya da paket kullanılırsa görsel onayı |
| S14 | D9 · Hero çalışma masası + özel imleç | Ticket, deploy bildirimi, "Claude" imleci (masaüstünde hareketli, mobilde statik ticket); pixel imleç ve kaset üstünde "▶ Aç" pill'i | INS-04 + INS-23, INS-03 + INS-19 (pill) | §4 | — |
| S15 | D10 · Intro | ≤ 2,5 sn kaset sayacı + kelimeler; oturumda bir kez; atlanabilir | INS-01 + INS-22 | §4 | — |
| S16 | Kalite kapıları + yayın (Faz 7–8) | Lighthouse, WCAG 2.2 AA, SEO, lisans kontrolü, 30 sn testi, analytics canlıda, domain | — | §7 son hali | 30 sn testi için bir kişi; domain kararı |

---

## Dilim ayrıntıları

### S5 · Kurulum (Faz 3)
- Next 16.4.6 projesi (App Router, TypeScript 6.0.3, Tailwind 4.3.5, ESLint); `app/(tr)` ve `app/(en)/en` root layout'ları; `experimental.globalNotFound`.
- `git init`; `.gitignore`: `docs/sources/`, `.velite/`, `public/static/`, `artifacts/`. İlk commit'ten önce `docs/sources/`'ın izlenmediği `git status` / `git check-ignore` çıktısıyla kanıtlanır.
- `styles/tokens.css`: SPEC §8'den renk (`--color-*: initial`), tipografi (clamp ölçeği), boşluk, radius, motion (süre + easing), z-index. `check:tokens` script'i.
- Fontlar (`next/font/google`, ADR-15). Velite iskeleti + `profile` ve `site` şemaları. shadcn init. `ExperienceBoundary`, `lib/i18n.ts`.
- Script'ler: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`, `check:tokens`, `screenshots`.
- Proje `CLAUDE.md`'si (< 200 satır).
- GitHub repo + Vercel bağlantısı + ilk deploy; Vercel'de Node sürümü yerel sürümle eşlenir.
- **Bitti:** build/lint/typecheck çıktısı, canlı URL, `docs/sources/` repoda yok, boş sayfanın Lighthouse JS değeri PROGRESS'e yazılmış (JS bütçesinin bazı).

### S6 · D1 · İlk 30 saniye
- **Kapsam:** `RootDocument` (TR/EN), "İçeriğe geç" linki, `SiteNav` (yalnız var olan bölümler; mobilde tek CTA + dil), `LanguageSwitch` (hash'i korur), Hero (isim, rol cümlesi + italik vurgu, mono etiket, "Bana yaz"; "İşlere bak" D2'ye kadar gizli), İletişim (dev e-posta, "E-postayı kopyala" → "Kopyalandı", LinkedIn, GitHub, CV), Footer, iki dilli 404, metadata + `hreflang` + OG görseli + sitemap + robots + favicon, Umami + 3 event (`contact_email_click`, `contact_linkedin_click`, `cv_download`).
- **Veri:** `content/profile.yaml`, `content/site/{tr,en}.yaml` (hero, nav, contact, footer, notFound, ilgili mikro metinler), `public/cv/`.
- **Durumlar:** pano reddi → e-posta seçilebilir metin, mailto çalışır; EN CV yoksa EN'de düğme yok; Umami bloklanırsa etkisiz.
- **Erişilebilirlik:** landmark'lar, doğru `lang`, "Kopyalandı" `aria-live`, focus görünür.
- **Kabul testleri:** `/` → `lang="tr"`, `/en` → `lang="en"`; `/#contact` → dil düğmesi `/en#contact`'a gider; rastgele URL iki dilli 404; e-posta, LinkedIn ve CV öğelerinde `data-umami-event` var; hero'da rol, tarih, şehir ve CTA 375/768/1280'de ilk ekranda.
- **Not:** CONTENT §8'de olmayan mikro metinler (İçeriğe geç, pano hatası, dil düğmesinin erişilebilir adı) bu dilimde önerilip onayla eklenir.

### S7 · D2 · Kaset rafı + overlay
- **Kapsam:** Raf: 7 kaset (SVG, proje rengi token'ı, sırtta katalog no + ad). Masaüstünde hover **ve** klavye focus'u kapak bilgisini gösterir (problem, künye, sonuç), şimdilik yalnız CSS. Mobilde dikey liste, bilgi hep görünür. Overlay: Radix Dialog, tam ekran; başlık (katalog, ad, italik alt başlık, künye, linkler, toplam süre), A/B tracklist (overlay içi gezinme), parçalar, liner notes, "Sıradaki kaset: X" + "Rafa dön". Hash yönlendirme ve history (ADR-11). `case_study_open` event'i (`source`: shelf / hash / chip / next). Hero'daki "İşlere bak" açılır.
- **Veri:** `content/projects/<slug>/` × 7 (`project.yaml`, `tr.md`, `en.md`, `media/`); ekran görüntüleri `scripts/capture-project-screens.ts` ile.
- **Durumlar:** kapak yok → tipografik kapak; görsel yüklenemezse CONTENT §8 metni; link yok (IDDDergi canlı adresi) → link gizli; bilinmeyen hash → hiçbir şey; ATAMap overlay'inde esprili mikro metin ve kenar notu yok (`respectful`).
- **Erişilebilirlik:** kaset `<a href="#slug">` + erişilebilir ad; açılınca odak başlığa, kapanınca kasete; Esc; başlık hiyerarşisi; tracklist `nav`.
- **Kabul testleri:** tıkla → hash değişir; Esc → kapanır, hash temizlenir, odak kasete döner; geri tuşu kapatır; doğrudan `/#atamap` açar; `/en#atamap` EN açar; "Sıradaki kaset" çalışır; açık overlay'de axe temiz; hesaplanan okuma süreleri CONTENT değerleriyle karşılaştırılıp sapma raporlanır.
- **İlk adım:** Radix Dialog + Motion çıkış animasyonu için küçük bir deneme (ADR-05 riski).

### S8 · D3 · Kaset çalar
- **Kapsam:** hover'da kaset raftan kalkar, kapak kayarak çıkar (pointer: fine); tıklayınca `layoutId` ile kaset → overlay başlığı geçişi; makaralar `useScroll({ container })` ile okudukça döner, bant soldan sağa akar (okuma ilerlemesi); overlay vurgu rengi kasetin rengi; kapanışta rafa dönüş. Hareketler yalnız scroll ya da etkileşimle tetiklenir (otomatik değil).
- **Durumlar:** hareket katmanı hata verirse overlay yine açılır (boundary).
- **Erişilebilirlik:** reduced-motion'da açılış anlık, makaralar sabit, ilerleme sayısal ya da sabit çubukla sürer; vurgu rengi metin çiftleri SPEC §8 tablosundan.
- **Kabul testleri:** reduced-motion emülasyonunda overlay içeriği anında görünür; overlay açma INP < 200 ms (spot ölçüm); 60 fps hedefiyle Performance kaydı.

### S9 · D4 · İlkeler + Hakkımda
- **Kapsam:** İlkeler: tek cümlelik açılış ekranı (kısa belirme, reduced-motion'da direkt), 5 ilke "Şu olduğunda → şunu yaparım", her biri kaset chip'iyle overlay'i açar. Hakkımda: ortada kısa hikâye, cümle içi proje chip'leri, mono künye, Hedeflerim; kenarlarda 2–3 fotoğraf ve el yazısı notlar (Caveat; ATAMap'e not yok). Atatürk portresi ve bayrak: önerilen yer Hakkımda'nın kenarında, dekordan ayrı, sabit bir çerçeve; kesin yer dilim planında onaylanır.
- **Veri:** `content/principles.yaml`, `site/*.yaml` → `about`, `content/site/media/`, `content/credits.yaml` (portre kaynağı).
- **Durumlar:** fotoğraf yoksa kenar alanı olmadan tek sütun; portrenin lisansı doğrulanmadıysa portre hiç render edilmez.
- **Erişilebilirlik:** ilkeler liste; chip'ler erişilebilir adlı link; portre `alt`'ı kişiyi, tarihi ve kaynağı söyler; kenar notları gerçek metin.
- **Kabul testleri:** her chip doğru overlay'i açar; Markdown'daki kırık chip linki build'i düşürür (Vitest).

### S10 · D5 · Bu site nasıl yapıldı + Krediler
- **Kapsam:** colophon metni (CONTENT §7), krediler listesi türlerine göre gruplu (font, fotoğraf, portre, asset, AI, veri), lisans linkleri; footer'daki "Krediler" buraya gelir.
- **Durumlar:** boş grup gösterilmez.
- **Kabul testleri:** envanterdeki her görselin kredisi var (SPEC §14.5'in ilk hali); dış linkler `rel` doğru.

### S11 · D6 · Gezinme katmanı
- **Kapsam:** sol altta bölüm göstergesi ("Şu an: {bölüm}"); tıklanınca J-card gibi açılan içindekiler (bölümler + 7 kaset); `ToneController` ile bölümler arası zemin tonu geçişi (tonlar kâğıt ailesinde; her ara karede metin AA); overlay içinde gösterge "şu an okunan parça" olur.
- **Durumlar:** JS hatasında nav çalışmaya devam eder (gösterge ek katman).
- **Erişilebilirlik:** menü düğmesi `aria-expanded`, odak yönetimi, Esc kapatır, `aria-current`; gösterge `aria-live` kullanmaz; mobilde CTA'yı ve içeriği örtmez (375'te kanıt).
- **Kabul testleri:** menüden her bölüme ve kasete klavyeyle gidilir; reduced-motion'da menü animasyonsuz açılır.

### S12 · D7 · Pixel motoru + maskot + walkman
- **Kapsam:** `PixelSprite` (ızgara → SVG, palet token'ları); saksı bitkisi maskot (okuma ilerlemesine göre yaprak, İletişim'de çiçek; 404'te; yalnız ≥ 1024); walkman (sağ altta, mobilde footer'da; tıklayınca rastgele film/şarkı, art arda aynısı gelmez); "Hareketi durdur / başlat" kontrolü (tercih saklanır; Motion `always` + CSS `[data-motion="paused"]`).
- **Veri:** `content/taste/films.yaml`, `songs.yaml`.
- **Durumlar:** walkman listesi boşsa "Kaset sarıyor. Bir daha bas."; ATAMap overlay'i açıkken walkman görünmez (CONTENT §8 kuralı).
- **Erişilebilirlik:** maskot `aria-hidden`, reduced-motion'da sabit poz; walkman gerçek button, sonuç `aria-live="polite"`.
- **Kabul testleri:** "hareketi durdur"dan sonra hiçbir otomatik hareket sürmüyor; 375'te maskot kodu indirilmiyor (ağ kaydı).

### S13 · D8 · Oda dekoru
- **Kapsam:** 14 VHS sırtı (özel tipografi, poster yok), 7 plak sırtı (kapak yok), 7 doğa pulu (pixel manzara), Hakkımda'da soluk nesne deseni; hepsi kenar boşluklarında, yalnız ≥ 1024 px; hover'da yalnız hareket. Atatürk portresi ve bayrak desenin parçası değil.
- **Veri:** `content/taste/films.yaml` (favorite), `records.yaml`, `stamps.yaml`; Gemini/paket kullanılırsa `credits.yaml` güncellenir.
- **Durumlar:** dekor yüklenemezse sayfa aynen çalışır.
- **Kabul testleri:** 375 ve 768'de dekor isteği yok; 1280'de ilk yükte dekor ≤ 300 KB (ağ kaydı); "hareketi durdur" dekoru durdurur.

### S14 · D9 · Hero çalışma masası + özel imleç
- **Kapsam:** HeroDesk: "GRCN-1 · Product stajyeri bul · In review" ticket'ı, "Vercel · Deployment ready" bildirimi, "Claude" etiketli imleç; marka adları yalnız metin (ADR-16); masaüstünde hareketli (durdurulabilir), mobilde yalnız statik ticket; hero bilgisi asla arkada kalmaz. Özel imleç: `pointer: fine`'da pixel ok; kaset üstünde "▶ Aç" pill'i; metin ve input'ta native imleç.
- **Erişilebilirlik:** masa katmanı `aria-hidden`; imleç pill'i dekoratif; focus halkası imleçten bağımsız görünür.
- **Kabul testleri:** dilim öncesi ve sonrası masaüstü LCP ve INP karşılaştırması; kötüleşirse masa katmanı LCP'den sonra yüklenir.

### S15 · D10 · Intro
- **Kapsam:** ≤ 2,5 sn; kaset sayacı dönerken "Harita. Belgesel. El kitabı." → "Hepsi birer ürün."; oturumda bir kez; her tıklama ya da tuş atlatır; içerik arkada render edilmiş durumda; yalnız ≥ 1024 ve reduced-motion kapalıyken.
- **Erişilebilirlik:** saniyede 3'ten fazla değişim yok; atlama talimatı görünür metin; odak intro'da sıkışmaz.
- **Kabul testleri:** aynı oturumda ikinci ziyarette intro yok; tuşla atlanıyor; reduced-motion'da hiç yok; mobil Lighthouse değişmedi.

### S16 · Kalite kapıları + yayın (Faz 7–8)
- `/web-quality-audit` (performans, WCAG 2.2 AA, SEO, best practices), `/mobile-native`, ekran okuyucu turu, lisans ve atıf kontrolü, 30 sn testi (3/3), analytics'te 3 event canlıda, sayıların tazelenmesi (CONTENT §10), "Bu site nasıl yapıldı" metninin son hali, güvenlik başlıkları, production domain. SPEC §14'ün sekiz maddesi kanıtla.

---

## INSPIRATION → dilim eşlemesi

| ID | Öğe | Dilim |
|---|---|---|
| INS-01 | Atlanabilir intro | D10 |
| INS-02 | Mobilde ayrı deneyim | Her dilim (ilke; D1'de kurulur) |
| INS-03 | Özel imleç | D9 |
| INS-04 | Çalışma aracı canvas'ı | D9 |
| INS-05 | Paragraf içi proje chip'leri | D4 |
| INS-06 | Renkli perdeler → 7 kaset | D2 (yapı) + D3 (hareket) |
| INS-07 | Sabit bölüm göstergesi + J-card | D6 |
| INS-08 | Proje kapağı | D2 |
| INS-09 | Klasör sekmeli kart yığını | Düştü |
| INS-10 | Canlı mini demo | Sonra (v1 dışı, ADR-17) |
| INS-11 | Kanıtlı liste | Sonra (içerik yeterliyse) |
| INS-12 | Sürpriz kutusu → walkman | D7 |
| INS-13 | El yazısı kenar notları | D4 |
| INS-14 | Problem odaklı anlatım | D2 (kart) + D4 (ilkeler) |
| INS-15 | Dozunda mizah | D1'den itibaren mikro metinde (ATAMap hariç) |
| INS-16 | Tek bakış kartı | D2 |
| INS-17 | Mono rol / şehir / müsaitlik etiketi | D1 |
| INS-18 | Zemin geçişi + tek cümle ekranı | D4 (tek cümle) + D6 (zemin) |
| INS-19 | Hover önizleme + imleç pill'i | D3 (önizleme) + D9 (pill) |
| INS-20 | Yol arkadaşı | D7 (maskotla birleşik) |
| INS-21 | Kendine has tema | S5 (token'lar) → D8 (oda dekoru) |
| INS-22 | Kelime flaşlı intro | D10 (INS-01'in içeriği) |
| INS-23 | Meslekten gelen şaka (ticket) | D9 |
| INS-24 | Karalamalı portre | Düştü |
| INS-25 | Posta pulları | D8 |
| INS-26 | Maskot | D7 |
| INS-27 | Hikâye düzeni | D4 (yerleşim) + D8 (zemin deseni) |
| INS-28 | Albüm kurgulu case study | D2 (A/B yapı) + D3 (makaralar) |
| INS-29 | Pixel art dili | D7 (motor) + D8 |

## Sonra (v1 dışı)

- **INS-10 canlı mini demo:** ErasmusMap'ten küçük bir harita parçası; ayrı dilim, ölçülerek.
- **INS-11 kanıtlı liste:** kart dışı kanıt (sertifika, ödül) birikirse.
- **`/work/[slug]` statik sayfalar:** her case study'ye kendi OG önizlemesi (ADR-11 ödünleşimi).

## Kullanıcıdan beklenenler (dilime göre)

| Ne | Gerektiği dilim | Not |
|---|---|---|
| Umami Cloud hesabı ve Website ID | D1 | Hesabı kullanıcı açar |
| ~~EN CV PDF'i~~ | — | Kapandı: CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda'da |
| IDDDergi canlı adresi | D2 | Gelmezse linksiz |
| Novera repo linki gösterilsin mi | D2 | URL'de ekip arkadaşının kullanıcı adı var |
| EN case study metinlerinin kontrolü | D2 production'dan önce | CONTENT §10 |
| 2–3 kişisel fotoğraf | D4 | Yoksa tek sütun |
| Atatürk portresi seçimi | D4 | Claude lisansı doğrulanmış adaylar sunar, kullanıcı seçer |
| Kenar notu metinleri | D4 | CONTENT'te yok; Claude önerir, kullanıcı onaylar |
| 7 şarkının yılı | D7 | CONTENT'te yok; Claude kaynaklı önerir, kullanıcı onaylar |
| 30 sn testi için bir kişi, domain kararı | S16 | — |
