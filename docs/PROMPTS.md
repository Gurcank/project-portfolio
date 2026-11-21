# Portfolio — Oturum Prompt'ları ve Çalışma Kılavuzu

Bu dosya projenin "yol haritası + kopyala-yapıştır prompt seti". Her faz **ayrı bir oturumda** yapılır.
Oturumlar arası bilgi **sohbetle değil dokümanlarla** taşınır (`docs/` klasörü). Böylece her yeni oturum
temiz context ile başlar ve önceki kararları dosyadan okur.

---

## 1. Ayarlar — hangi fazda ne kullanacaksın

| Faz | Mode (izin modu) | Model | Effort | Neden |
|---|---|---|---|---|
| S1 Keşif → SPEC | **Plan mode** | Opus 5.5 | high | Kod yok, sadece soru-cevap ve karar. Plan mode yanlışlıkla dosya yazmayı engeller. |
| S2 İlham havuzu | Default (Ask) | Opus 5.5 | **extra** | Tarayıcıyla siteleri inceler; 9 siteden özgün bir tasarım yönü sentezlemek en çok zevk ve yargı isteyen iş. |
| S3 İçerik (7 proje) | Plan mode | Opus 5.5 | medium | Yazı işi; derin akıl yürütme değil, iyi soru gerekir. |
| S4 Mimari → ARCHITECTURE | **Plan mode** | Opus 5.5 | **extra** | Stack ve yapı kararları sonradan pahalıya değişir; en derin düşünme burada değer. |
| S5 Kurulum | Default (Ask) | Opus 5.5 | medium | İskelet, token, git, ilk deploy. Komutları onaylayarak ilerle. |
| S6+ Dikey dilimler | **Accept edits** | Opus 5.5 | high | Deneysel/interaktif bileşenler için. |
| — Rutin işler (metin düzeltme, küçük stil) | Accept edits | Sonnet 5.5 | medium | Daha hızlı ve ucuz; kalite farkı küçük işlerde hissedilmez. |
| — "Akılda kalacak tek öğe" / en deneysel bileşen (WebGL, özel scroll sahnesi) | Accept edits | Opus 5.5 | **extra** | Sitenin imzası olacak parça; zor ve uzun işte fark yaratır. |
| — İnatçı bug / karmaşık animasyon | Default | Opus 5.5 | extra | İki denemede çözülmediyse `/clear`, sonra effort'u yükselt. |
| S-son Kalite kapıları + yayın | Default | Opus 5.5 | high | Ölçüm ve kanıt gerektirir. |

Notlar:
- Pro planda Fable yok; en güçlü seçenek **Opus 5.5**. Yüksek kaldıraçlı fazlarda (S2, S4, imza bileşen) modeli değil **effort'u** yükseltiyoruz (extra).
- extra kullanım limitini daha hızlı tüketir; rutin işlerde high veya medium'a dön.
- `max` effort'u yalnızca gerçekten tıkandığında kullan; yavaş ve pahalı.
- **Ultracode** bir effort seviyesi değil, ayrı bir ayar: açıkken Claude büyük işleri paralel çalışan alt ajanlara (dynamic workflows) bölüp yönetir, effort seviyesine dokunmaz. **Varsayılan: kapalı.** S1–S4 birebir mülakat ve karar işi; paralellik fayda sağlamaz, Pro limitini hızla yer. Tek aday: S-son kalite kapıları (performans, a11y, SEO ayrı ayrı denetlenebilir) — limitin el veriyorsa.
- **Bypass permissions kullanma.** Git push, Vercel deploy, dosya silme gibi adımları görerek onayla.
- Fast mode gerekmiyor; bu projede hız değil kalite öncelik.

## 2. Altın kurallar (her oturumda geçerli)

1. **Bir oturum = bir faz.** Faz bitince yeni oturum aç (veya `/clear`). Konuşmayı uzatma.
2. **Her oturum `docs/PROGRESS.md` güncelleyerek biter** — "ne bitti, sıradaki adım ne". Sonraki oturum buradan başlar.
3. **Kanıt iste:** "Bitti" diyorsa build çıktısı veya 375 / 768 / 1280 px ekran görüntüsü göstermeli (global CLAUDE.md'de zaten yazılı).
4. **İki başarısız düzeltme = dur.** `/clear`, sorunu daha net tarif eden yeni prompt.
5. **Aynı hatayı iki kez yaptıysa** proje `CLAUDE.md`'sine kural olarak ekle.
6. **Plan → onay → uygulama.** Plan mode'dan çıkarken planı gerçekten oku; itiraz etmek senin işin (PM pratiği).
7. **Beğendiğin hazır component'i** eklerken `/component-integrate` skill'ini kullan; kodu yapıştır veya linki ver.

## 3. Doküman seti (geliştirmeden önce hazır olacak)

```
docs/
  PROMPTS.md         ← bu dosya
  PROGRESS.md        ← her oturum sonunda güncellenen durum notu
  SPEC.md            ← S1: kimlik, hedef, kitle, ton, bölümler, tasarım yönü, medya envanteri, kapsam dışı
  INSPIRATION.md     ← S2: referans sitelerden beğenilen öğelerin ID'li havuzu + "bende nasıl" notu
  CONTENT.md         ← S3: 7 proje case study metni, hakkımda, hedefler, mikro metinler
  ARCHITECTURE.md    ← S4: stack, klasör yapısı, veri modeli, kararlar (Bağlam/Alternatif/Sonuç/Ödünleşim)
  ROADMAP.md         ← S4: dikey dilimler sırası ve her dilimin "bitti" tanımı
  sources/           ← LinkedIn PDF, CV, fotoğraflar, poster/albüm listeleri
CLAUDE.md            ← S5: proje kuralları (<200 satır)
styles/tokens.css    ← S5: renk, tipografi, boşluk token'ları
```

## 4. Başlamadan önce senin hazırlaman gerekenler

- [ ] **LinkedIn profil PDF'i:** Profil → "More / Daha fazla" → "Save to PDF". `docs/sources/linkedin.pdf` olarak koy.
  (LinkedIn giriş gerektirdiği için Claude sayfayı doğrudan güvenilir okuyamaz; PDF en temiz kaynak.)
- [ ] Varsa güncel **CV**'n → `docs/sources/`
- [ ] 7 projenin isimleri ve GitHub/canlı linkleri (S3'te sorulacak, şimdiden listele)
- [ ] Kendi çektiğin **doğa / kişisel fotoğraflar** (varsa) → `docs/sources/photos/`
- [ ] Sevdiğin **film, albüm, kitap, yer** listesi — kafanda değil, bir yere yazılı olsun
- [ ] Her referans site için "neyi sevdim" notların (S2'de soracak; ekran görüntüsü de olur)

---

## 5. Oturum prompt'ları

> Kullanım: Yeni oturum aç → tablodaki mode/model/effort'u seç → aşağıdaki prompt'u kopyala-yapıştır.

### S1 — Keşif ve SPEC  *(Plan mode · Opus 5.5 · high)*

```
Kendime kişisel portfolio sitesi yapıyoruz. Bu oturumun tek amacı docs/SPEC.md'yi çıkarmak; kod yazma.
Önce /dev-process skill'ini yükle ve Faz 1 kapısına göre çalış. docs/PROMPTS.md'yi oku (genel plan orada).

Bağlam:
- Ben: yazılım öğrencisiyim, hedefim Product Manager olmak. Site bu hedefe hizmet etmeli:
  bir PM adayının düşünme biçimini, ürün sezgisini ve zevkini göstermeli.
- Kaynaklar: docs/sources/linkedin.pdf (LinkedIn), docs/sources/resume.pdf (CV),
  docs/sources/taste.md (müzik/film zevkim, ham liste), docs/sources/letterboxd/ (Letterboxd CSV export'u),
  https://github.com/Gurcank (GitHub, herkese açık).
  Önce bunları oku, öğrendiklerini 5-6 maddede özetle, yanlışsa düzelteyim.
- His: deneysel, interaktif, modern, "pahalı duran", çok kişisel. Template gibi görünmemeli.
- Kişisel katman: sevdiğim film posterleri, albüm kapakları, doğa vb. sitede yer alacak.
- 7 projem var (detayları S3'te konuşacağız; burada sadece bölüm olarak planla).
- Referans siteler (S2'de detaylı inceleyeceğiz, burada sadece genel his için bak):
  justkamalthings.com, jorgerieraflores.com, davidecarusio.it/en, marylgonzalez.com/services,
  jarnket.com, worksruthi.com, andreas.vision, paulfey.me/about, twandeniet.com
- Yayın: GitHub → Vercel.

Nasıl çalışacağız:
1. Bana mülakat yap. Her seferinde en fazla 3 soru sor, cevabımı bekle. Varsayım yapma.
   Konular sırayla: kimlik ve hikâye → hedef kitle (kim bakacak, ne yapmasını istiyorum) →
   başarı ölçütü → bölümler (bir portfolioda olması gereken ama benim aklıma gelmeyenleri sen öner) →
   kişisel katman (hangi film/albüm/yer, nasıl sunulacak) → ton ve dil (TR/EN/iki dilli?) → kapsam dışı.
2. Medya için lisans riskini konuş (film posteri, albüm kapağı gibi telifli görseller nasıl, hangi
   kaynak/API ile, hangi atıfla kullanılır). Emin olmadığın yeri doğrula ve kaynak linki ver.
3. Tasarım yönü bölümünü "S2 sonrası netleşecek" diye taslak bırak; sadece ilk izlenimleri yaz.
4. Sonunda SPEC.md taslağını göster, onaylarsam yaz. docs/PROGRESS.md'yi oluştur: ne bitti, sıradaki adım S2.
```

### S2 — İlham havuzu  *(Default · Opus 5.5 · high)*

```
docs/PROMPTS.md, docs/SPEC.md ve docs/PROGRESS.md'yi oku. Bu oturumun amacı docs/INSPIRATION.md'yi
oluşturmak ve SPEC.md'deki "Tasarım yönü" bölümünü netleştirmek. Kod yazma.

Akış — referans siteleri TEK TEK işleyeceğiz:
1. Sıradaki siteyi built-in browser'da aç, 1280 ve 375 px'te ekran görüntüsü al, gezin.
   Gördüğün dikkat çekici öğeleri kısa bir liste olarak çıkar (yerleşim, tipografi, geçişler,
   imleç/hover etkileşimleri, scroll davranışı, renk, mikro detaylar).
2. Ben o sitede neyi sevdiğimi söyleyeceğim. Senin listen + benim notlarım birleşsin.
3. Her beğenilen öğeyi havuza şu formatla ekle:
   ID (örn. INS-07) | Site | Öğe | Neden işe yarıyor | Bende nasıl kullanılabilir | Zorluk (S/M/L) | Perf/a11y riski
4. Sonraki siteye geç. Hepsi bitince havuzu grupla (hero, navigasyon, proje sunumu, kişisel katman,
   mikro etkileşim, tipografi) ve çakışan/fazla olanları işaretle.
5. Havuzdan bir tasarım yönü öner: palet, tipografi eşleşmesi, boşluk ölçeği, yerleşim konsepti ve
   "akılda kalacak tek öğe". Her kararı bir cümleyle gerekçelendir. Kopya değil, sentez olmalı.
   Onaylarsam SPEC.md'ye yaz.
6. PROGRESS.md'yi güncelle (sıradaki: S3).

Kural: Hiçbir siteyi birebir kopyalamıyoruz; öğenin arkasındaki fikri alıp kendi kimliğime uyarlıyoruz.
```

### S3 — İçerik: 7 proje + metinler  *(Plan mode · Opus 5.5 · medium)*

```
docs/PROMPTS.md, SPEC.md, INSPIRATION.md, PROGRESS.md'yi oku. Amaç docs/CONTENT.md. Kod yazma.

1. Önce bir PM gözüyle proje case study şablonu öner (ör. problem, benim rolüm, kullanıcı,
   kararlar ve ödünleşimler, sonuç/metrik, öğrendiklerim, stack, linkler). Onaylayalım.
2. Projeleri TEK TEK konuşalım. Her biri için bana sorular sor; GitHub reposu varsa önce README'yi
   ve koda genel bakışı oku, sonra boşlukları sor. Metni sen yaz, ben düzelteyim.
3. Hangi projenin "öne çıkan" olacağına birlikte karar verelim; sıralamayı gerekçelendir.
4. Hakkımda, hedeflerim, kişisel katman metinleri ve mikro metinleri (buton, boş durum, 404, footer)
   SPEC'teki ton ve uzunluk bütçesine göre yaz.
5. CONTENT.md'ye yaz, PROGRESS.md'yi güncelle (sıradaki: S4).
```

### S4 — Mimari ve yol haritası  *(Plan mode · Opus 5.5 · high)*

```
docs/ altındaki tüm dokümanları oku. Amaç docs/ARCHITECTURE.md ve docs/ROADMAP.md. Kod yazma.
/dev-process skill'ini yükle, Faz 2 kapısına göre çalış.

1. Stack'i sen seç. Kısıtlar: Vercel'de yayın, yoğun interaktivite ve animasyon, hazır React
   component kütüphanelerinden parça alabilme, iyi performans (Core Web Vitals), görsel ağırlıklı içerik,
   içeriği kod dışından kolay güncelleyebilme. En az 2 alternatifi karşılaştır.
2. Her önemli karar için: Bağlam / Alternatifler / Sonuç / Ödünleşim.
   (Framework, styling, animasyon/scroll kütüphanesi, 3D/WebGL gerekip gerekmediği, içerik yönetimi
   (MDX/JSON/CMS), görsel optimizasyonu, poster/albüm verisinin kaynağı, i18n, analytics.)
3. Tüm kütüphane sürümlerini ve API davranışlarını Context7 veya resmi dokümanla doğrula, linkini yaz.
   Hafızadan sürüm yazma.
4. Klasör yapısı, içerik veri modeli (proje, poster, albüm vb. tipleri), route listesi.
5. ROADMAP.md: dikey dilimler sırası. Her dilim tek başına deploy edilebilir olsun ve "bitti" tanımı
   içersin (veri + yerleşim + 375/768/1280 + yükleniyor/hata/boş durum + erişilebilirlik).
   INSPIRATION.md'deki hangi ID'nin hangi dilimde yapılacağını eşle.
6. Onaylarsam yaz, PROGRESS.md'yi güncelle (sıradaki: S5).
```

### S5 — Kurulum  *(Default · Opus 5.5 · medium)*

```
docs/ altındaki tüm dokümanları oku. /dev-process Faz 3'e göre projeyi kur. Önce planı göster, onay bekle.

1. ARCHITECTURE.md'deki stack ile projeyi oluştur, git init. docs/sources/ kişisel veri içeriyor (CV, LinkedIn,
   Letterboxd export'u): ilk commit'ten ÖNCE .gitignore'a ekle ve repoya girmediğini kanıtla.
2. styles/tokens.css: SPEC'teki tasarım yönünden renk, tipografi, boşluk, radius, motion token'ları.
   "Ham hex/px yok, token kullan" kuralı.
3. Proje CLAUDE.md'si (<200 satır): stack, komutlar, klasör yapısı, token kuralı, içerik nerede,
   "bitti" tanımı, doc'lara referans. Global CLAUDE.md'de olanı tekrar etme.
4. Klasör iskeleti + boş route'lar + lint/format/typecheck script'leri.
5. GitHub'a repo oluşturma ve push için komutları göster, ben onaylayayım. Ardından Vercel'e bağla ve
   ilk "Hello" deploy'u yap — yayın hattı ilk günden çalışsın.
6. Kanıt: build + lint çıktısı ve canlı URL. PROGRESS.md'yi güncelle (sıradaki: ROADMAP'teki ilk dilim).
```

### S6+ — Dikey dilim (her dilim için tekrar)  *(Accept edits · Opus 5.5 · high)*

```
CLAUDE.md, docs/PROGRESS.md ve docs/ROADMAP.md'yi oku. Sıradaki dilim: [DİLİM ADI].
İlgili ilham öğeleri: [INS-xx, INS-yy]. İlgili içerik: CONTENT.md → [bölüm].

1. Planı göster (hangi dosyalar, hangi component'ler, animasyonun amacı ne), onay bekle.
2. Mobile-first uygula. Animasyon gerekiyorsa /animate skill'ini kullan; prefers-reduced-motion'a uy.
3. Bitince: build + lint + typecheck geçsin; 375 / 768 / 1280 px ekran görüntüsü al,
   INSPIRATION.md'deki niyetle karşılaştır, farkları listele ve düzelt.
4. /break-ui ile uç durumları dene (uzun başlık, eksik görsel, boş liste).
5. Commit mesajını öner, ben onaylayınca commit + push. Vercel preview URL'ini ver.
6. PROGRESS.md'yi güncelle. Rapor: ne yaptım / ne yapmadım / neyi doğrulamadım.
```

### S-son — Kalite kapıları ve yayın  *(Default · Opus 5.5 · high)*

```
CLAUDE.md ve docs/PROGRESS.md'yi oku. Yayın öncesi kalite kapıları:
1. /web-quality-audit: performans (LCP/INP/CLS), erişilebilirlik (WCAG 2.2 AA), SEO (meta, OG görseli,
   sitemap), best practices. Her bulguyu öncelik sırasıyla düzelt, önce/sonra ölç.
2. /mobile-native: gerçek telefon hissi için kontroller.
3. Lisans/atıf kontrolü: poster, albüm kapağı, font, görsel kaynakları SPEC'teki kurallara uyuyor mu?
4. Production deploy, özel domain (varsa), analytics.
5. Kanıt raporu + bakım rutini önerisi (içerik nasıl güncellenir, ne sıklıkla).
```
