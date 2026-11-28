# ARCHITECTURE — Gürcan Karadağ portfolio

> Durum: S4 (2026-11-21). Faz 2 çıktısı. Ne ve neden: `SPEC.md` · metinler: `CONTENT.md` · öğeler: `INSPIRATION.md` · sıra: `ROADMAP.md`.
> Sürümler 2026-11-21'de npm registry'den okundu. API davranışları Context7 (resmî repo dokümanları) ve resmî sayfalardan doğrulandı; linkler her kararın altında ve §12'de. Hafızadan sürüm yazılmadı.

## 0. Özet

| Katman | Seçim | Sürüm |
|---|---|---|
| Framework | Next.js, App Router, tamamen statik | 16.4.6 |
| UI runtime | React | 19.3.1 |
| Dil | TypeScript | 6.0.3 (7.x değil, ADR-19) |
| Stil | Tailwind CSS v4 (`@tailwindcss/turbopack` loader) + `styles/tokens.css` (`@theme`) | 4.3.5 |
| Primitive | shadcn/ui CLI + Radix (`radix-ui`) | 4.23.0 · 1.8.1 |
| Animasyon | Motion (`motion/react`) + CSS | 14.14.0 |
| 3D/WebGL | Yok | — |
| İçerik | Velite: Markdown + YAML, şema doğrulamalı | 0.4.0 |
| Markdown render | react-markdown, yalnız Server Component'te | 10.1.0 |
| Görsel | `next/image` + Vercel Image Optimization | Next ile |
| Font | `next/font/google` (build'de self-host) | Next ile |
| i18n | Dil başına root layout + tipli YAML | kütüphane yok |
| Analytics | Umami Cloud (Hobby, cookie'siz) | script |
| Test | Vitest · Playwright · axe | 5.1.1 · 1.65.1 · 4.14.0 |
| Lint / format | ESLint + eslint-config-next · Prettier + tailwind plugin | 9.39.5 · 16.4.6 · 3.10.1 · 0.8.1 (ESLint 10 değil, ADR-19) |
| Yayın | GitHub → Vercel (Hobby), npm | Node 24.x (yerel 24.13.1; Next ≥ 20.9 istiyor) |

**Tek cümle gerekçe:** Tek uzun sayfada birbirine bağlı etkileşim katmanları (overlay, gösterge, maskot, imleç, hareket kontrolü) ortak durum paylaşıyor ve hazır React component'leri doğrudan alınabilmeli; Next.js bunu tek bir React ağacında çözerken sayfayı build'de statik HTML olarak üretip Vercel CDN'den sunuyor.

**Yapılmayanlar:** backend, veritabanı, auth, form, CMS/admin panel, proxy/middleware, sunucu fonksiyonu.

---

## 1. Kararlar

Her karar: **Bağlam / Alternatifler / Sonuç / Ödünleşim / Kaynak.**

### ADR-01 · Framework: Next.js 16

**Bağlam.** Kısıtlar: Vercel, yoğun etkileşim ve animasyon, hazır React component'leri, Core Web Vitals, görsel ağırlıklı içerik, kod dışından içerik. Sayfa tek; katmanlar durum paylaşıyor: açık kaset → imleç, gösterge, vurgu rengi; "hareketi durdur" → bütün katmanlar. İmza öğe, raftaki kasetten overlay'e paylaşımlı bir geçiş istiyor (SPEC §8).

**Alternatifler.**

| | Next.js 16.4.6 | Astro 7.4.13 + @astrojs/react 7.1.9 | Vite + React SPA |
|---|---|---|---|
| Statik metin JS'i | Server Component'ler client'a gitmez; React + Next runtime yine yüklenir | Varsayılan sıfır JS; island'lar ayrı hydrate | Hepsi client'ta |
| Katmanlar arası durum | Tek React ağacı: context, Motion `layoutId` sayfa boyunca çalışır | React context island'lar arasında çalışmaz; Astro nanostores öneriyor | Tek ağaç |
| Hazır React component | Doğrudan; shadcn'in resmî şablonu Next 16 + React 19.3.1 + Tailwind v4 | Island içinde çalışır; provider varsayan parçalar (AnimatePresence, portal) island sınırında kırılabilir | Doğrudan |
| LCP / SEO | Build'de HTML | Build'de HTML | HTML boş gelir, ek prerender aracı gerekir |
| Vercel | Kendi framework'ü | Adapter ile | Statik |

**Sonuç.** Next.js 16 App Router; bütün sayfalar build'de statik üretilir. Vite SPA LCP ve SEO yüzünden elendi; Astro en yakın rakipti, kaset → overlay geçişi ve paylaşılan durum island sınırını sürekli aşacağı için seçilmedi.

**Ödünleşim.** Astro'ya göre daha fazla baz JS ve RSC/client sınırı öğrenme maliyeti. Telafi: metin bölümleri Server Component; deneyim katmanları client island ve masaüstüne özgü olanlar `next/dynamic` ile koşullu yüklenir; JS bütçesi S5'te ölçülen baz üzerinden her dilimde raporlanır (ROADMAP ortak DoD).

**Kaynak.** [Astro: zero JS by default](https://github.com/withastro/docs/blob/main/src/content/docs/en/basics/astro-components.mdx) · [Astro: island'lar arasında context çalışmaz](https://github.com/withastro/docs/blob/main/src/content/docs/en/recipes/sharing-state-islands.mdx) · [shadcn next-app şablonu (Next 16, React 19.3.1, Tailwind v4)](https://github.com/shadcn-ui/ui/blob/main/templates/next-app/package.json) · [Motion layoutId](https://motion.dev/docs/react-layout-animations)

### ADR-02 · Render: tamamen statik, proxy yok

**Bağlam.** İçerik build'de belli, kullanıcıya özel veri yok. Next 16'da `middleware` adı `proxy` oldu; proxy yalnız Node.js runtime'ında çalışıyor (edge seçilemiyor) ve her eşleşen istekte sayfadan önce sunucuda kod çalıştırıyor.

**Alternatifler.** (a) Statik, proxy yok · (b) statik + proxy (i18n yönlendirmesi için) · (c) SSR.

**Sonuç.** (a). Her route build'de HTML olur, CDN'den sunulur. Gerekirse yönlendirme `next.config` seviyesinde kalır.

**Ödünleşim.** Sunucuda dil algılama (Accept-Language) yok. Bu zaten istenmiyor: TR varsayılan ve İngilizce tarayıcı kullanan Türk İK EN sürüme atılmamalı.

**Kaynak.** [Next 16: middleware → proxy, edge desteklenmiyor](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/02-guides/upgrading/version-16.mdx) · [proxy.js](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/03-file-conventions/proxy.mdx)

### ADR-03 · i18n: dil başına root layout, kütüphane yok

**Bağlam.** TR `/`, EN `/en`. `<html lang>` dile göre doğru olmalı (WCAG 3.1.1; Türkçe i/İ dönüşümü). Hash'ler (`#erasmusmap`) iki dilde aynı. Metin: ~60 mikro metin + Markdown içerik.

**Alternatifler.**
- **next-intl 4.15.3:** TR'yi öneksiz sunan `localePrefix: 'as-needed'` proxy matcher'ı istiyor → ADR-02 ile çelişir. Proxy'siz kullanımda önek zorunlu (`/tr`, `/en`) ve kökte `/` → `/tr` yönlendirmesi gerekir: CV'deki linke tıklayan herkes için fazladan bir istek.
- **Dil başına root layout:** `app/(tr)/layout.tsx` (`lang="tr"`, `/`) ve `app/(en)/en/layout.tsx` (`lang="en"`, `/en`). Metinler `content/site/{tr,en}.yaml`; şema iki dosyada aynı anahtarları zorunlu kılar.

**Sonuç.** Dil başına root layout. Server Component o dilin sözlüğünü okur; client island'lara yalnız ihtiyaç duydukları metinler prop olarak geçer (provider yok, öteki dil bundle'a girmez). Dil düğmesi mevcut hash'i korur (`/#atamap` → `/en#atamap`). `hreflang`, Metadata API'nin `alternates.languages` alanıyla.

**Ödünleşim.** ICU/çoğul desteği yok (ihtiyaç yok). Farklı root layout'lar arasında gezinme tam sayfa yüklemesi; dil değiştirmek nadir, kabul. Bütün route'ları saran tek root olmadığı için 404 `global-not-found.js` ile yapılır ve bu Next 16.4'te deneysel bayrak (`experimental.globalNotFound`) istiyor (risk §11).

**Kaynak.** [next-intl: as-needed proxy matcher ister](https://github.com/amannn/next-intl/blob/v4.14.9/docs/src/pages/docs/routing/configuration.mdx) · [next-intl: proxy'siz kullanımın sınırları](https://github.com/amannn/next-intl/blob/v4.14.9/docs/src/pages/docs/routing/middleware.mdx) · [Next: birden çok root layout, aralarında full page load](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/03-file-conventions/layout.mdx) · [global-not-found (deneysel)](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/03-file-conventions/not-found.mdx)

### ADR-04 · Stil: Tailwind v4 + token dosyası

**Bağlam.** SPEC §8 paleti, tipografisi ve boşluk ölçeği token olmalı; "ham hex yok" kuralı kontrol edilebilir olmalı. Hazır component'ler (shadcn, Magic UI vb.) Tailwind sınıflarıyla geliyor.

**Alternatifler.** Tailwind CSS 4.3.5 (`@theme`) · CSS Modules + custom properties.

**Sonuç.** Tailwind v4. `styles/tokens.css` içinde `@theme { --color-*: initial; … }`: Tailwind'in varsayılan renkleri tamamen kalkar, yalnız token renkleri üretilir (`bg-paper`, `text-ink`, `bg-cassette-mustard`). `npm run check:tokens` bileşenlerde ham hex ve `[#…]` arbitrary değeri yakalar, CI'da build'i düşürür. Pixel ve keyframe gibi Tailwind'e sığmayan kurallar aynı token değişkenleriyle düz CSS'te.

**Ödünleşim.** Uzun class listeleri okunurluğu düşürür → küçük, tek sorumluluklu component'ler ve prettier-plugin-tailwindcss sıralaması. Dışarıdan alınan component'lerin renk sınıfları token'lara çevrilmeli (`/component-integrate` adımı).

**Kaynak.** [Tailwind: namespace'i initial ile sıfırlamak](https://tailwindcss.com/docs/theme) · [Tailwind: özel palet](https://tailwindcss.com/docs/colors)

### ADR-05 · UI primitive: shadcn/ui + Radix

**Bağlam.** Case study overlay erişilebilir bir modal olmalı: focus trap, Esc, odağın geri dönmesi, arka planın inert olması, scroll kilidi (SPEC §10). Hazır component alabilme kısıtı.

**Alternatifler.** shadcn/ui + Radix Dialog · native `<dialog>` + kendi kodumuz.

**Sonuç.** shadcn/ui CLI (component'leri repoya kopyalar, kod bizim olur) + Radix. shadcn Şubat 2026'dan beri birleşik `radix-ui` paketini kullanıyor. Overlay = Radix Dialog + Motion. Magic UI / Aceternity gibi kaynaklardan alınan parçalar `/component-integrate` ile token'lara uyarlanır.

**Ödünleşim.** Radix'in portal ve scroll kilidini Motion'ın çıkış animasyonuyla birleştirmek dikkat ister (`forceMount` + `AnimatePresence`); D2'nin başında küçük bir deneme ile doğrulanır. Native dialog daha az JS'tir ama çıkış animasyonu ve tarayıcı farkları daha çok el emeği ister.

**Kaynak.** [shadcn: birleşik radix-ui paketi](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-02-radix-ui.mdx)

### ADR-06 · Animasyon ve scroll: Motion, smooth scroll kütüphanesi yok

**Bağlam.** "Az ama smooth" (SPEC §8): kaset raftan çıkar ve overlay'e "çalar", makaralar okuma ilerlemesiyle döner, maskot scroll ile büyür. `prefers-reduced-motion` ve "hareketi durdur" zorunlu (WCAG 2.2.2).

**Alternatifler.**
- **Motion 14.14.0:** React bileşen API'si; `layoutId` ile bileşenler arası paylaşımlı geçiş; `useScroll({ container })` ile overlay içindeki scroll ilerlemesi; `MotionConfig reducedMotion="user"` transform ve layout animasyonlarını kapatır (opacity kalır); `LazyMotion` + `m` ile ilk yük ~5 KB (tam `motion` bileşeni ~43 KB; Motion dokümanındaki rakamlar).
- **GSAP 3.15.1 (+ @gsap/react 2.1.2):** güçlü timeline ve ScrollTrigger; Nisan 2025'ten beri bütün plugin'leriyle ücretsiz (Webflow'un "Standard No Charge" lisansı; açık kaynak değil). React'te imperatif çalışır; bileşenler arası layout geçişi yerleşik değil.
- **Yalnız CSS:** en hafif; ama durumla (açık kaset, hareket durdu) koordinasyon ve çıkış animasyonları zor.

**Sonuç.** Motion (`LazyMotion` + `m`, `strict`). Basit geçişler (hover'da kalkma, zemin tonu) CSS transition ile; Motion yalnız duruma ya da scroll'a bağlı hareketlerde. Global `MotionConfig.reducedMotion`: kullanıcı "hareketi durdur"a bastıysa `"always"`, değilse `"user"`. Smooth scroll kütüphanesi (Lenis 1.3.27) yok: native scroll; anchor'larda `scroll-behavior: smooth` yalnız reduced-motion kapalıyken.

**Ödünleşim.** GSAP'in timeline ergonomisinden vazgeçiyoruz; intro gibi sıralı sahnelerde Motion'ın `animate()` dizileri yeterli. Lenis olmadan tekerlekle kaydırma o "tereyağı" hissini vermez; karşılığında erişilebilirlik, overlay içindeki iç içe scroll ve iOS davranışı sorunsuz kalır.

**D3'te uygulandığı hali (2026-11-21).**
- `domMax` (layout animasyonu bunda) hydration'dan sonra async iner (`components/experience/motion-features.ts`). Ölçüm, D2'ye karşı aynı yöntemle: ilk yük **+22 KB** (Motion çekirdeği, `useScroll`, motion value'lar), sonradan **+33 KB** (`domMax`). Dokümandaki "~5 KB" yalnız `LazyMotion` + `m` içindir.
- Süre ve easing token'lardan okunur (`lib/motion-tokens.ts`). Reduced motion ve "hareketi durdur" token'ları 0 ms yaptığı için Motion da onlara uyar.
- Paylaşılan geçiş (`layoutId`) iki koşulla çalışıyor; ikisi de denemede bulundu: (1) `layoutId` bir HTML elemanında olmalı; SVG'ye projeksiyon uygulanmıyor, bu yüzden makaralar bir `m.div` içinde. (2) Motion yalnız **aynı commit'te** bir kopya id'yi bırakıp diğeri aldığında uçuruyor. Radix portal içeriği route değişiminden bir commit sonra mount olduğu için el değiştirme küçük bir store'la yapılır (`lib/case-study-route.ts` → `setPlayerSlug`). Sabit konumlu panelde `layoutRoot` gerekir.
- Reduced motion'da el değiştirme hiç yapılmaz: 0 ms'lik layout animasyonu bile ilk karesini kapak boyutunda çiziyordu.

**Kaynak.** [LazyMotion (~5 KB / ~43 KB)](https://motion.dev/docs/react-lazy-motion) · [reducedMotion](https://motion.dev/docs/react-motion-config) · [Motion erişilebilirlik](https://motion.dev/docs/react-accessibility) · [useScroll container](https://motion.dev/docs/react-use-scroll) · [GSAP pricing](https://gsap.com/pricing) · [GSAP lisansı](https://gsap.com/licensing)

### ADR-07 · 3D/WebGL: yok

**Bağlam.** Görsel dil kâğıt zemin, tipografi, vektör kaset ve küçük pixel nesneler (SPEC §8). INS-20 notu 3D yerine SVG/sprite öneriyor.

**Alternatifler.** WebGL yok · three.js / React Three Fiber.

**Sonuç.** Yok. Kaset SVG (dikdörtgen + iki daire), pixel nesneler kodla SVG (ADR-08).

**Ödünleşim.** Işık ve derinlik efekti yok; sahne düz kalır, bu konseptin kendisi. Kazanç: 3D bundle'ı ve GPU yükü yok, LCP/INP riski düşük. (three.js seçilmediği için sürümü doğrulanmadı.)

### ADR-08 · Pixel nesne hattı: kodla tanımlı sprite

**Bağlam.** Elle çizim yok; tek palet, 16/32 px ızgara; dekor yalnız masaüstünde ve ilk yüklemede ≤ 300 KB. Atatürk portresi ve bayrak bu sistemin parçası olamaz (SPEC §6).

**Alternatifler.** (a) Kodla tanımlı sprite: karakter ızgarası + palet anahtarı → SVG · (b) PNG sprite sheet (asset paketi ya da Gemini) + `image-rendering: pixelated`.

**Sonuç.** Birincil yol (a). `components/pixel/sprites/*.ts` içinde her sprite bir string ızgarası; `PixelSprite` bunu satır bazında birleştirilmiş `<rect>`'lere çevirir, renkleri `var(--color-…)` token'larından alır (`shape-rendering: crispEdges`). Palet dışı renk teknik olarak yazılamaz. (b) yalnız gerekirse: paketlerden yalnız CC0 olanlar (Kenney: CC0, ticari kullanım serbest, atıf gerekmiyor) ve Gemini çıktıları; ikisi de `scripts/quantize-pixel.ts` (sharp) ile palete indirgenir ve krediler listesine girer. Gemini: Google üretilen içeriğin sahipliğini talep etmiyor; ama AI içeriğini insan yapımı gibi sunmak yasak → her AI görseli kredilerde "Gemini ile üretildi" olarak yazılır (SPEC §8 zaten istiyor). AI görsellerinin telif koruması doğrulanmadı; üzerlerinde koruma iddia edilmez.
Atatürk portresi (doğrulanmış kamu malı fotoğraf) ve bayrak (2893 oranlarında SVG) ayrı bir klasörde (`components/respect/`); bu bileşenler animasyon ya da hover prop'u kabul etmez.

**Ödünleşim.** Sprite'ı kodla yazmak büyük ve detaylı görseller için yavaş; bu yüzden sahne yok, küçük nesneler var. Kazanç: sıfır görsel isteği, tutarlı palet, `aria-hidden` kolay.

**Kaynak.** [Kenney lisansı (CC0)](https://kenney.nl/support) · [Google Terms: sahiplik ve AI içeriği](https://policies.google.com/terms) · [Generative AI Additional Terms](https://policies.google.com/terms/generative-ai)

### ADR-09 · İçerik yönetimi: Velite + Markdown + YAML

**Bağlam.** Metinler `CONTENT.md`'de. "Kod dışından kolay güncelleme" isteniyor ama CMS/admin panel kapsam dışı (SPEC §12). Metin bütçeleri (CONTENT §0), TR/EN eksiksizliği (SPEC §14.4) ve otomatik okuma süreleri kontrol edilebilir olmalı.

**Alternatifler.**
- **Velite 0.4.0:** Markdown/YAML → Zod tabanlı şema → tipli JSON; `s.image()` görseli kopyalayıp width/height/blurDataURL üretir; Next'e `next.config` içinden bağlanır.
- **Content Collections (core 0.15.3, next 0.2.11):** benzer şema ve Markdown → HTML; görsel boyutu ve blur yerleşik değil.
- **Headless CMS ya da git tabanlı admin (Sanity, Keystatic, Tina):** SPEC §12 ile çelişir.
- **MDX:** içerikte kod çalıştırır; tek bir `<` ya da `{` build'i kırar; kod bilmeyen biri için kırılgan.

**Sonuç.** Velite + düz Markdown (MDX değil) + YAML. Güncelleme akışı §9'da. Şema kuralı bozulursa (kart problemi > 90 karakter, EN dosyası yok, B1 parçası eksik) build düşer, canlı site önceki sürümde kalır.

**Ödünleşim.** Velite 1.0 öncesi ve tek bakımcılı (son kararlı sürüm Haziran 2026; 1.0 alpha'da). Telafi: Velite yalnız build adımı, çıktısı düz JSON; uygulama içeriği yalnız `lib/content/` üzerinden okur → gerekirse Content Collections'a geçiş tek klasörü etkiler. YAML'ın tırnak ve iki nokta tuzakları var; şema hatası dosya ve alan adıyla döner. YAML'ın boolean saydığı kelimeler (`no`, `yes`) anahtar adı olmaz (`catalog` gibi).

**Kaynak.** [Velite s.image](https://github.com/zce/velite/blob/v0.4.0/docs/guide/velite-schemas.md) · [Velite + Next.js](https://github.com/zce/velite/blob/v0.4.0/docs/guide/with-nextjs.md) · [Velite transform](https://github.com/zce/velite/blob/v0.4.0/docs/guide/define-collections.md) · [Content Collections + Next](https://github.com/sdorra/content-collections/blob/main/docs/adapter/next.mdx) · [Content Collections markdown](https://github.com/sdorra/content-collections/blob/main/docs/content/markdown.mdx)

### ADR-10 · Markdown render: react-markdown, Server Component'te

**Bağlam.** Özel gösterimler: B1'deki *Seçtim / Vazgeçtim / Çünkü / Bedeli* etiketleri mono etiket olmalı; Hakkımda'daki proje adları chip olmalı (INS-05); başlıktaki *tek kelime* Fraunces italik.

**Alternatifler.** Velite `s.markdown()` → HTML string (`dangerouslySetInnerHTML`) · react-markdown 10.1.0 + component eşlemesi.

**Sonuç.** react-markdown, yalnız Server Component'lerde (client JS'e girmez). Eşleme: `em` → bağlama göre vurgu ya da karar etiketi; `#slug` linki → proje chip'i (hash overlay'i açar, ek JS yok); dış linkler `rel="noopener noreferrer"`. Gövde Velite `s.raw()` ile alınır, `## A1 · …` başlıklarından parçalara bölünür (`lib/content/tracks.ts`), her parçanın kelime sayısı ve okuma süresi hesaplanır.

**Ödünleşim.** HTML string'e göre biraz daha fazla build işi. react-markdown'ın son sürümü Mart 2025; olgun ve sık sürüm çıkarmıyor, risk düşük.

**Kaynak.** [Velite s.raw / s.markdown](https://github.com/zce/velite/blob/v0.4.0/docs/guide/velite-schemas.md) · [react-markdown (npm)](https://www.npmjs.com/package/react-markdown)

### ADR-11 · Case study URL'i: hash

**Bağlam.** SPEC §5: overlay, `#erasmusmap`, geri tuşu ve Esc kapatır, link paylaşılabilir.

**Alternatifler.** Hash · Next intercepting + parallel routes (`/work/erasmusmap` gerçek route, raftan açılınca modal).

**Sonuç.** Hash (SPEC kararı). `lib/hash-route.ts` hash'i proje / bölüm / hiçbiri olarak çözer. Tıklamayla açılışta history'ye kayıt eklenir → geri tuşu kapatır. Doğrudan `/#atamap` ile gelindiyse kapatınca hash `replaceState` ile temizlenir. Bilinmeyen hash yok sayılır. O dilin 7 case study'si (~3.000 kelime) sayfanın RSC payload'ında gelir → overlay ağ beklemeden açılır.

**Ödünleşim.** Her case study'nin kendi OG önizlemesi olmaz (LinkedIn'de paylaşılan `/#atamap` ana sayfa kartını gösterir); case study metni overlay açılmadan DOM'da yok (arama motoru için zayıf). v1 sonrası seçenek: `/work/[slug]` statik sayfaları (ROADMAP "Sonra").

### ADR-12 · Görsel optimizasyonu: next/image

**Bağlam.** Kaset kapakları ve proje ekran görüntüleri (16:10), 2–3 kişisel fotoğraf, Atatürk portresi. Bütçeler SPEC §9'da (fotoğraf ≤ 80 KB, portre ≤ 60 KB). CLS < 0,1.

**Alternatifler.** `next/image` + Vercel Image Optimization · build'de sharp ile AVIF/WebP + srcset üretip `unoptimized` kullanmak.

**Sonuç.** `next/image`. `images.formats: ['image/avif', 'image/webp']`; `images.qualities: [75]` (Next 16'da zorunlu alan); `deviceSizes` kısıtlı tutulur (dönüşüm sayısı düşük kalsın). Velite'in verdiği width/height/blurDataURL ile CLS olmaz; blur placeholder "yükleniyor" durumudur. Proje ekran görüntüleri canlı sitelerden `scripts/capture-project-screens.ts` (Playwright, `npm run capture:screens`) ile 1280×800, 2× ölçekte JPEG (q90) alınır; kaynak dosya JPEG, siteye AVIF/WebP olarak `next/image` dönüştürür (yeni bağımlılık yok). S17'de proje başına tek görsel (`cover`); `gallery` ertelendi.

**Ödünleşim.** Hobby'de ayda 5.000 dönüşüm; aşılırsa yeni görseller 402 döner, önbelleğe girmişler çalışır, ücret çıkmaz. Tahmini ihtiyaç ~25 kaynak × 4 genişlik × 2 format ≈ 200. Aşılırsa B planı: sharp ile build'de üretim. Her format ayrı önbelleklenir (Next dokümanı).

**Kaynak.** [next/image formats ve qualities](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/02-components/image.mdx) · [Vercel Image Optimization limitleri](https://vercel.com/docs/image-optimization/limits-and-pricing)

### ADR-13 · Film ve albüm verisinin kaynağı: elle derlenmiş YAML

**Bağlam.** SPEC §6/§9: poster ve kapak yok; yalnız ad (+ yıl) kendi tipografimizle. Letterboxd verisi kullanılmaz.

**Alternatifler.** Elle YAML · TMDB / Spotify / Cover Art Archive API (SPEC §9'da lisans gerekçesiyle elendi) · build'de MusicBrainz/Wikipedia'dan metadata çekmek.

**Sonuç.** `content/taste/*.yaml`, elle (taste.md ve CONTENT §9'dan). Dış API ve build'de ağ bağımlılığı yok; yıllar yalnız manuel doğrulamayla girilir. Doğrulanan: Barış Manço, *Sözüm Meclisten Dışarı*, 1981, Türküola, stüdyo albümü (kaynak Vikipedi; resmî diskografi değil).

**Ödünleşim.** Liste elle güncellenir. Tip olarak "Poster" ve "AlbumCover" yok; `Film` ve `Record` yalnız ad, sanatçı, yıl taşır. Açık veri: walkman sonucu "{Ad} ({yıl})" formatında ama 7 şarkının yılı CONTENT'te yok (ROADMAP D7).

**Kaynak.** [Sözüm Meclisten Dışarı](https://tr.wikipedia.org/wiki/S%C3%B6z%C3%BCm_Meclisten_D%C4%B1%C5%9Far%C4%B1)

### ADR-14 · Analytics: Umami Cloud

**Bağlam.** Cookie'siz; 3 event: `contact_email_click`, `contact_linkedin_click`, `case_study_open` (SPEC §4). Ücretsiz olmalı. (`cv_download` 2026-11-27'de kalktı: CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda'da.)

**Alternatifler.**
- **Vercel Web Analytics:** custom event yalnız Pro ve Enterprise'da; Hobby'de yok (Hobby: ayda 50.000 event, 1 aylık rapor penceresi).
- **Umami Cloud Hobby:** 0 $, ayda 100K event, 1 site, 6 ay saklama, custom event + property; cookie kullanmıyor.
- **Plausible:** en ucuz plan 9 $/ay, ücretsiz katman yok.

**Sonuç.** Umami Cloud. Script `next/script` ile `afterInteractive`. Tıklama event'leri `data-umami-event` attribute'larıyla (ek JS yok). `case_study_open` hash ile doğrudan açılışları da saydığı için `umami.track('case_study_open', { project, source })` çağrısıyla, `lib/analytics.ts` üzerinden. Event adları tek yerde sabit.

**Ödünleşim.** Üçüncü taraf script ve dış bağımlılık; reklam engelleyiciler bloklayabilir, sayılar alt sınırdır. Hesabı kullanıcı açar; Website ID `NEXT_PUBLIC_UMAMI_WEBSITE_ID` env değişkeninde.

**Kaynak.** [Vercel custom events](https://vercel.com/docs/analytics/custom-events) · [Vercel Analytics limitleri](https://vercel.com/docs/analytics/limits-and-pricing) · [Umami pricing](https://umami.is/pricing) · [Umami event takibi](https://docs.umami.is/docs/track-events) · [umami.track()](https://docs.umami.is/docs/tracker-functions) · [Plausible](https://plausible.io/#pricing)

### ADR-15 · Fontlar: next/font/google

**Bağlam.** v2 (2026-11-27): Bricolage Grotesque (variable, `wdth`), Instrument Serif Italic, Instrument Sans, Fragment Mono, Caveat; latin + latin-ext (SPEC §8). v1'de Archivo, Fraunces Italic, Geist Mono, Caveat'ti.

**Alternatifler.** `next/font/google` (build'de indirip self-host) · Google Fonts CSS linki · `next/font/local`.

**Sonuç.** `next/font/google`. Bricolage Grotesque: `axes: ['wdth']`, preload açık. Instrument Serif (`style: 'italic'`), Instrument Sans ve Fragment Mono: preload açık (D1'de öğrenildi, aşağıya bkz.). Ölçüm (v2): preload edilen fontlar 300 KB'tan 197 KB'a indi. Başlık rolü `font-display` (`--font-display`), gövde `font-sans`. Caveat: preload kapalı; yalnız kenar notlarında kullanılır. Font CSS değişkenleri (`variable`) token'lara bağlanır.

**Ödünleşim.** İlk planda yalnız Archivo preload ediliyordu. D1'de ölçüldü: hero'daki italik kelime ve mono etiket geç gelince hero yeniden akıyor, mobil Lighthouse CLS 0,177 çıkıyordu (`adjustFontFallback` yetmedi). İlk ekranda kullanılan iki font da preload'a alındı: CLS 0,001 (5/5 koşu, devtools throttling), LCP değişmedi; bedeli +1 font dosyası / +40 KB. Google Fonts CSS linkine göre build'de ağ gerekir.

**Kaynak.** [next/font: axes, preload, style, subsets](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/02-components/font.mdx) · Font lisansları: SPEC §9.

### ADR-16 · Hero çalışma masasında marka adları: yalnız metin (v2'de kalktı)

> **Kalktı (kullanıcı kararı, 2026-11-27):** v2'de araç logoları (Supabase, Claude, Jira, Miro, Vercel…) gösterilecek: Simple Icons SVG'leri, tek renk, her markanın kullanım kuralına göre. Uygulama V6'da (Hakkımda) ve masada.

**Bağlam.** SPEC §13: Claude, GitHub, Vercel, Jira, Miro logo mu, isim mi? Her markanın logo kuralları ayrı.

**Alternatifler.** Logolar (her markanın kılavuzuna uyum, ek SVG) · yalnız metin (mono etiket).

**Sonuç.** Yalnız metin ("Vercel · Deployment ready", "Claude" imleç etiketi). "Keskin olan bilgidir" kuralıyla uyumlu. SPEC §13 maddesi kapanır.

**Ödünleşim.** Logo kadar hızlı tanınmaz; karşılığında marka kılavuzu takibi ve görsel gürültü yok.

### ADR-17 · Canlı mini demo (INS-10): v1'de yok

**Bağlam.** En fazla 1 projede, L zorluk, performans riski (INSPIRATION çakışma tablosu).

**Alternatifler.** ErasmusMap'ten canlı harita (iframe ya da gömülü bileşen) · ekran görüntüsü + overlay'de "Canlı site" linki.

**Sonuç.** v1'de yok; ekran görüntüleri ve canlı site linki. v1 sonrası aday (ROADMAP "Sonra"). SPEC §13 maddesi kapanır.

**Ödünleşim.** "Göster, kanıtla" gücü azalır; canlı siteye tek tık uzaklık bunu kısmen telafi eder.

### ADR-18 · Durum ve deneyim katmanları

**Bağlam.** Paylaşılan durum: açık kaset, aktif bölüm, hareket durduruldu mu, intro görüldü mü. Deneyim katmanları içeriği asla bozmamalı; mobilde indirilmemeli (SPEC §8 mobil).

**Alternatifler.** Zustand gibi bir kütüphane · React context + `useSyncExternalStore` ile küçük store.

**Sonuç.** Kütüphanesiz küçük store (`lib/experience-store.ts`). Her deneyim katmanı bir error boundary içinde: hata olursa katman render edilmez, içerik yerinde kalır. Masaüstü katmanları (`Mascot`, `PixelDecor`, `CustomCursor`, `Intro`) `next/dynamic` ve `matchMedia` koşuluyla yüklenir. Tercihler: hareket durdurma `localStorage`'da, intro `sessionStorage`'da; ikisi de try/catch içinde, depolama yoksa varsayılan davranış.

**Ödünleşim.** Store'u kendimiz yazıyoruz; devtools yok. Kapsam küçük olduğu için kabul.

### ADR-19 · Kalite araçları ve TypeScript sürümü

**Bağlam.** Her iş geçti/kaldı üreten bir kontrol taşımalı (dev-process ilkesi); "bitti" için 375/768/1280 ekran görüntüsü (global CLAUDE.md). Next 16'da `next lint` kaldırıldı, `next build` lint çalıştırmıyor.

**Alternatifler.** TypeScript 7.0.2 (Go tabanlı): Next build'de yalnız `experimental.useTypeScriptCli` ile çalışıyor, çünkü Next'in varsayılan tip kontrolü TS 7'de olmayan JS compiler API'sini kullanıyor · TypeScript 6.0.3. Lint: ESLint + eslint-config-next · Biome 2.6.8.

**Sonuç.** TypeScript 6.0.3 (ikinci bir deneysel bayrak eklememek için). ESLint 9.39.5 + eslint-config-next 16.4.6. **S5 düzeltmesi:** ESLint 10.15.0 planlanmıştı; ama eslint-config-next 16.4.6 içindeki eslint-plugin-react (`^9.7`), eslint-plugin-jsx-a11y (`^9`) ve eslint-plugin-import (`^9`) ESLint 10 desteklemiyor; create-next-app 16.4.6 şablonu da `eslint ^9` sabitliyor. Eklentiler 10 desteği verince yükseltilir. npm, 9.x için "artık desteklenmiyor" uyarısı veriyor (risk §11), Prettier 3.10.1 + prettier-plugin-tailwindcss 0.8.1. Testler:
- Vitest 5.1.1: track bölme, okuma süresi formülü, TR/EN eşliği, chip linklerinin geçerli slug'a gitmesi.
- Playwright 1.65.1: hash ile aç/kapa, Esc, geri tuşu, dil geçişinin hash'i koruması, klavye yolu; @axe-core/playwright 4.14.0 ile erişilebilirlik taraması.
- `scripts/screenshots.ts`: 375 / 768 / 1280 ekran görüntülerini `artifacts/` altına alır (DoD kanıtı).
- Lighthouse: her dilimde mobil spot kontrol, tam denetim Faz 7'de (`/web-quality-audit`).

**Ödünleşim.** TS 7'nin hızından vazgeçiyoruz (küçük projede fark önemsiz); Next varsayılanı değişince yükseltilir. Biome daha hızlı ama Next kuralları ESLint tarafında resmî. S5'te doğrulandı: `next build` TypeScript 6.0.3 ile hatasız geçiyor.

**Kaynak.** [Next 16: next lint kaldırıldı, Turbopack varsayılan](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/02-guides/upgrading/version-16.mdx) · [useTypeScriptCli](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli)

---

## 2. Klasör yapısı

```
project-portfolio/
├─ app/
│  ├─ (tr)/
│  │  ├─ layout.tsx            # <html lang="tr">, RootDocument
│  │  ├─ page.tsx              # <HomePage locale="tr" />
│  │  └─ opengraph-image.tsx
│  ├─ (en)/en/
│  │  ├─ layout.tsx            # <html lang="en">
│  │  ├─ page.tsx
│  │  └─ opengraph-image.tsx
│  ├─ global-not-found.tsx     # iki dilli 404 (experimental.globalNotFound)
│  ├─ sitemap.ts · robots.ts · icon.svg
├─ components/
│  ├─ layout/        # RootDocument, SkipLink, SiteNav, LanguageSwitch, Footer
│  ├─ home/          # HomePage: bölümleri sıralar, veriyi dağıtır
│  ├─ sections/      # Hero, Shelf, Principles, About, Colophon, Contact
│  ├─ cassette/      # CassetteShape (SVG), CassetteSpine, CassetteCover
│  ├─ case-study/    # CaseStudyOverlay (client), Tracklist, Track, Reels, LinerNotes
│  ├─ markdown/      # Markdown (react-markdown + eşleme), ProjectChip, DecisionLabel
│  ├─ experience/    # ExperienceProvider, ExperienceBoundary, MotionToggle,
│  │                 # Dock (v3: tek nav, <header> içinde), ToneController, DayGradient (v3),
│  │                 # RevealObserver (v3), Mascot (yürüyen avatar), CdPlayer, Cursor (v3 izler),
│  │                 # DecorLayer + DecorSlot/RoomShelf/RoomFrame (v3 oda), Intro
│  ├─ pixel/         # PixelSprite (bir renk = bir path), canvas.ts (kodla çizim) + sprites/ (avatar, room, plant, cd-player, stamps…)
│  ├─ decor/         # V5 PrinciplesCrowd (sunucu bileşeni, <symbol>/<use>, yalnız CSS hareket)
│  ├─ about/         # V6 ToolList (logolar public/tools/*.svg, CSS mask), v3 GithubActivity (build'de)
│  ├─ footer/        # V8 NatureScene, landscape.ts (build'de üretilen manzara), SkyClock
│  ├─ respect/       # AtaturkPortrait, TurkishFlag (hareket API'si yok)
│  └─ ui/            # shadcn kopyaları (dialog, button…)
├─ content/
│  ├─ profile.yaml   # dilden bağımsız: ad, e-posta, LinkedIn, GitHub
│  ├─ site/          # tr.yaml · en.yaml · media/ (kişisel fotoğraflar, portre)
│  ├─ projects/
│  │  └─ <slug>/     # project.yaml · tr.md · en.md · media/
│  ├─ principles.yaml
│  ├─ taste/         # films.yaml · songs.yaml · records.yaml · stamps.yaml
│  └─ credits.yaml
├─ lib/
│  ├─ content/       # index.ts (getHomeData), tracks.ts, reading-time.ts, integrity.ts
│  ├─ i18n.ts        # Locale tipi, diller, alternates
│  ├─ hash-route.ts  # hash → proje | bölüm | yok
│  ├─ experience-store.ts
│  └─ analytics.ts   # event adları + track()
├─ styles/           # tokens.css (tek doğruluk kaynağı) · globals.css
├─ scripts/          # check-tokens.ts · screenshots.ts · capture-project-screens.ts · quantize-pixel.ts
├─ tests/            # unit/ (Vitest) · e2e/ (Playwright + axe)
├─ velite.config.ts · next.config.ts · tsconfig.json · eslint.config.mjs · .prettierrc
├─ CLAUDE.md         # S5
└─ docs/             # sources/ → .gitignore
```

Üretilen ve repoya girmeyenler: `.velite/` (içerik JSON'u), `public/static/` (Velite'in kopyaladığı görseller), `artifacts/` (ekran görüntüleri), `docs/sources/` (kişisel veri).

## 3. İçerik veri modeli

Tipler Velite şemalarından türetilir; aşağıdaki gösterim okunurluk içindir. Yorumdaki sınırlar şemada zorunludur (aşılırsa build düşer).

```ts
type Locale = 'tr' | 'en'
type L10n<T> = Record<Locale, T>
type ProjectSlug = 'erasmusmap' | 'novera-mobility' | 'seeyournextstep' | 'atamap'
                 | 'iklim-krizi' | 'nature-sport-handbook' | 'idddergi'
type CassetteColor = 'mustard' | 'terracotta' | 'midnight' | 'burgundy' | 'petrol' | 'olive' | 'rose'
type TrackId = 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3'
type SectionId = 'top' | 'work' | 'principles' | 'about' | 'colophon' | 'contact'

interface ImageAsset {
  image: { src: string; width: number; height: number; blurDataURL: string }  // Velite s.image()
  alt: L10n<string>
}

// content/projects/<slug>/project.yaml — dilden bağımsız
interface Project {
  slug: ProjectSlug          // klasör adı; hash: #erasmusmap
  catalog: string            // 'GK-01', /^GK-\d{2}$/, benzersiz
  order: number              // raf sırası 1..7, benzersiz
  featured: boolean          // tam olarak bir proje true
  color: CassetteColor       // → --color-cassette-*; metin rengi eşleşmesi token'da
  year: number
  respectful: boolean        // ATAMap: mizah, kenar notu, esprili mikro metin yok
  links: { live?: string; source?: string }   // yoksa link gösterilmez
  cover?: ImageAsset & { credit?: L10n<string> }  // yoksa tipografik kapak; credit: görseldeki üçüncü taraf içerik (ör. Mapbox)
  // gallery: ImageAsset[]   // S17'de ertelendi (proje başına tek görsel yeterli görüldü)
}

// content/projects/<slug>/{tr,en}.md — frontmatter + gövde
interface CaseStudy {
  slug: ProjectSlug
  locale: Locale
  title: string
  subtitle: string           // tam olarak bir *vurgu*
  card: {
    problem: string          // ≤ 90 karakter
    credits: string          // künye, tek satır (ROL · YIL · EKİP)
    result: string           // ≤ 60 karakter
  }
  meta: { role: string; team: string }
  tracks: Track[]            // gövdedeki ## başlıklarından; tam olarak A1..B3, bu sırayla
  liner: string              // Markdown
  words: number
  readingTime: string        // 'm:ss', toplam kelimeden
}

interface Track {
  id: TrackId
  side: 'A' | 'B'
  title: string              // 'Problem', 'Kararlar ve ödünleşimler'…
  markdown: string
  words: number
  readingTime: string        // kelime / 180 (TR) · / 200 (EN), en yakın 0:05 (CONTENT §0)
}

// lib/content'in sayfaya verdiği birleşik görünüm
interface ProjectView extends Project {
  study: CaseStudy           // istenen dilde
  next: ProjectSlug          // "Sıradaki kaset"
}

// content/principles.yaml
interface Principle {
  order: number
  condition: L10n<string>    // ≤ 70 karakter
  action: L10n<string>       // ≤ 120 karakter
  project: ProjectSlug       // bağlı kaset; var olmalı
}

// content/profile.yaml
interface Profile {
  name: string
  email: string
  linkedin: string
  github: string
}

// content/site/{tr,en}.yaml — iki dosya aynı şemayı eksiksiz doldurur
interface SiteCopy {
  meta: { title: string; description: string }
  nav: Record<Exclude<SectionId, 'top'>, string>
  hero: {
    role: string             // ≤ 60 karakter, bir *vurgu*
    label: string            // mono etiket
    primaryCta: string; secondaryCta: string
    desk: { ticket: string; notification: string; cursorLabel: string }
  }
  intro: { words: string[]; closing: string; skip: string }
  sections: Record<'work' | 'principles' | 'about' | 'colophon' | 'contact', string>  // *vurgu*lu başlıklar
  principlesOpening: string
  about: {
    story: string            // Markdown, ≤ 120 kelime; chip = [ErasmusMap](#erasmusmap)
    credentials: string      // mono künye satırı
    goals: string            // ≤ 60 kelime
  }
  colophon: string           // Markdown, ≤ 250 kelime
  microcopy: { /* CONTENT §8 tablosunun anahtarları */ }
  notFound: { title: string; body: string; cta: string }
  footer: { madeIn: string; credits: string }
}

// content/taste/*.yaml — dilden bağımsız, adlar özgün haliyle. Poster/kapak alanı yok (SPEC §9).
interface Film   { title: string; year: string; favorite: boolean }  // year: '2001–2003' olabilir; favorite → VHS sırtı (14), hepsi → walkman (29)
interface Song   { artist: string; title: string; year?: number }    // yıllar CONTENT'te yok (açık madde)
interface Record { artist: string; album: string; year?: number }    // plak sırtı (7)
interface Stamp  { order: number; name: L10n<string>; sprite: string } // doğa pulu (7)

// content/credits.yaml
interface Credit {
  kind: 'font' | 'photo' | 'asset' | 'ai' | 'data'
  name: string
  author?: string
  source: string             // URL
  license: string
  licenseUrl?: string
  usedFor: L10n<string>
}
```

**Build'de kontrol edilen bütünlük kuralları** (`lib/content/integrity.ts` + Vitest): her projenin `tr.md` ve `en.md` dosyası var; slug, catalog ve order benzersiz; tek `featured`; her ilkenin `project`'i var; Markdown'daki her `#slug` linki gerçek bir projeye gidiyor; hesaplanan okuma süreleri CONTENT'teki elle yazılmış değerlerle karşılaştırılır (sapma raporlanır).

## 4. Route listesi

| URL | Ne | Nasıl üretilir |
|---|---|---|
| `/` | TR ana sayfa | statik, `app/(tr)/page.tsx` |
| `/en` | EN ana sayfa | statik, `app/(en)/en/page.tsx` |
| `/#<slug>` · `/en#<slug>` | Case study overlay (7 slug, §3) | client, hash |
| `/#top` `#work` `#principles` `#about` `#colophon` `#contact` | Bölüm anchor'ları; iki dilde aynı id | — |
| `/opengraph-image` · `/en/opengraph-image` | OG görseli | build'de |
| `/sitemap.xml` · `/robots.txt` | SEO | build'de |
| `/icon.svg` | Favicon | statik |
| Diğer her URL | İki dilli 404 ("Bu kaset rafta yok." / "This tape isn't on the shelf.") | `global-not-found.tsx` |

## 5. Bileşen haritası

| Bölüm / katman | Tür | Ne zaman yüklenir | Mobil (< 1024) | Dilim |
|---|---|---|---|---|
| Hero metni, İletişim, Footer | Server (kopyala butonu küçük client) | HTML | aynı | D1 |
| SiteNav, LanguageSwitch | Server + küçük client (hash'i koruma) | HTML | tek CTA + dil | D1 |
| Shelf (kaset rafı) | Client (Motion `layoutId`), veri server'dan | HTML'de render | dikey etiket kartları | D2, D3 |
| CaseStudyOverlay | Client (Radix Dialog + Motion) | ilk yük (hash ile doğrudan açılabilmeli) | tam ekran | D2, D3 |
| Principles, About, Colophon | Server | HTML | aynı | D4, D5 |
| SectionIndicator + JCardMenu, ToneController | Client | ilk yük | uyarlanmış, CTA'yı örtmez | D6 |
| Walkman, MotionToggle | Client | ilk yük | footer'da | D7 |
| Mascot | Client | `next/dynamic`, ≥ 1024 | yok | D7 |
| PixelDecor | Client | `next/dynamic`, ≥ 1024, idle sonrası | yok | D8 |
| HeroDesk | Client | idle sonrası, ≥ 1024 animasyonlu | statik ticket (server) | D9 |
| CustomCursor | Client | `next/dynamic`, `pointer: fine` | yok | D9 |
| Intro | Client | `next/dynamic`, ≥ 1024, reduced-motion kapalı, oturumda bir kez | yok | D10 |

## 6. Durumlar: yükleniyor / hata / boş

Statik sitede "yükleniyor ekranı" ya da loader yok (INSPIRATION "Kaçınılacaklar": loader içeriği bekletmemeli).

| Durum | Davranış |
|---|---|
| Yükleniyor | Görseller blur placeholder; fontlar fallback metrikli; dinamik katmanlar yüklenene kadar render edilmez (içerik zaten görünür); overlay içeriği payload'da, beklemesiz. |
| Hata | Görsel `onError` → "Görsel yüklenemedi; anlatı aşağıda." (CONTENT §8). Deneyim katmanı hatası → `ExperienceBoundary` hiçbir şey çizmez. Pano erişimi reddedilirse e-posta seçilebilir metin olarak kalır, mailto çalışır. Umami bloklanırsa site etkilenmez. İçerik şema hatası → deploy olmaz, canlı önceki sürüm. |
| Boş | Opsiyonel alan yoksa öğe yok: link, kapak (→ tipografik kapak), fotoğraf. Walkman listesi boşsa "Kaset sarıyor. Bir daha bas." Bilinmeyen hash → hiçbir şey. Bilinmeyen URL → 404. Atatürk portresinin lisansı doğrulanmadıysa bileşen hiç render edilmez (yer tutucu yok). |

## 7. Erişilebilirlik mimarisi

- `<html lang>` dile göre (ADR-03); büyük harfli mono etiketler TR sayfada `lang="tr"` altında (i/İ).
- Landmark'lar (`header`, `nav`, `main`, `footer`) ve "İçeriğe geç" linki.
- Overlay: Radix Dialog (focus trap, Esc, odağın kasete dönmesi, `aria-modal`); başlık `aria-labelledby`; tracklist `nav`.
- Kaset: gerçek `<a href="#slug">`, erişilebilir ad "{Proje} case study'sini aç"; imleç pill'i dekoratif.
- Dekor `aria-hidden`; walkman gerçek `button` + sonuç `aria-live="polite"`; bölüm göstergesi `aria-live` kullanmaz (gürültü), menüde `aria-current`.
- Hareket: `MotionConfig reducedMotion`, CSS `@media (prefers-reduced-motion)`, kökte `[data-motion="paused"]`; 5 sn'yi aşan otomatik hareket D7'deki "hareketi durdur" kontrolünden önce eklenmez (WCAG 2.2.2); saniyede 3'ten fazla yanıp sönme yok (2.3.1).
- Dokunma hedefleri en az 24×24 px (WCAG 2.2, 2.5.8). Kontrast çiftleri SPEC §8 paletinden; overlay vurgu rengi her kasetin metin eşleşmesiyle.
- Doğrulama: her dilimde axe (Playwright) + elle klavye turu; ekran okuyucu turu Faz 7'de.

## 8. Performans bütçesi

| Ölçü | Hedef | Nerede ölçülür |
|---|---|---|
| LCP / CLS / INP (mobil) | < 2,5 sn / < 0,1 / < 200 ms (SPEC §9) | her dilimde Lighthouse spot, Faz 7'de tam |
| LCP öğesi | Hero'daki isim (metin, preload'lu display font); hero'da görsel yok | — |
| JS | S5'te boş sayfanın değeri baz alınır; her dilim eklediği JS'i raporlar; toplam bütçe S5 ölçümünden sonra PROGRESS'e yazılır | Lighthouse "JavaScript transfer" |
| Pixel dekor | masaüstü ilk yük ≤ 300 KB, mobilde 0 | Playwright ağ kaydı |
| Görseller | fotoğraf ≤ 80 KB, portre ≤ 60 KB, tek sprite ≤ 15 KB (SPEC §9) | build script uyarısı |

## 9. İçerik güncelleme akışı (kod dışından)

1. GitHub web arayüzünde `content/` altındaki dosyayı aç (ör. `content/projects/atamap/tr.md`), düzenle, commit et.
2. Vercel otomatik build alır. Velite şemayı ve bütçeleri kontrol eder.
3. Kural bozulduysa build düşer, hata mesajı dosya ve alanı söyler; canlı site önceki sürümde kalır.
4. Branch'te yapılırsa önce preview URL'de bakılır, sonra main'e alınır.
5. Okuma süreleri, sıralar ve "sıradaki kaset" otomatik güncellenir; elle sayı yazılmaz.

## 10. Güvenlik ve gizlilik

- Sır yok; tek env değişkeni herkese açık Umami Website ID.
- `docs/sources/` ilk commit'ten önce `.gitignore`'a girer (SPEC §11); S5'te kanıtlanır.
- E-posta sitede bilerek açık (ana aksiyon).
- Güvenlik başlıkları (CSP, Umami alan adı izinli) Faz 7'de `next.config` `headers()` ile.

## 11. Riskler

| Risk | Etki | Önlem |
|---|---|---|
| Velite 1.0 öncesi, tek bakımcı | İçerik katmanı kırılabilir | Uygulama yalnız `lib/content/` üzerinden okur; geçiş yolu Content Collections |
| ESLint 9 "artık desteklenmiyor" uyarısı | Güvenlik yaması gelmeyebilir; yalnız geliştirme aracı, siteye girmez | eslint-config-next eklentileri ESLint 10 desteği verince yükselt |
| Velite'in getirdiği sharp 0.34.5'te libvips/libheif açıkları (npm audit: high) | Yalnız build'de, yalnız bizim görsellerimizi işler; dış girdi yok | Velite güncellenince ya da D2'de görseller gelince `overrides` ile sharp 0.35.x denenir |
| `global-not-found` deneysel | 404 davranışı sürümle değişebilir | Bozulursa Next'in varsayılan 404'ü çalışır; Playwright testi yakalar |
| Hobby görsel dönüşüm limiti | Yeni görseller 402 | `deviceSizes` kısıtlı; B planı sharp ile build'de üretim |
| Deneyim katmanları 30 sn testini ve CWV'yi bozar | Ana hedef zarar görür | En sona konuldu, masaüstüne özgü, ölçülerek eklenir, tek tek kaldırılabilir |
| Radix + Motion çıkış animasyonu | Overlay kapanışı kopuk görünür | D2 başında küçük deneme |
| TS 6 / Next ileride TS 7'yi varsayılan yapar | Yükseltme işi | Next varsayılanı değişince tek dilimlik iş |
| Umami reklam engelleyiciye takılır | Sayılar eksik | Sayılar alt sınır kabul edilir |
| İçerik boşlukları (şarkı yılları, kenar notları, EN kontrolü) | Dilim bitmez | ROADMAP'te dilim başına "kullanıcıdan" listesi |

## 12. Doğrulama kaynakları

Sürümler: npm registry, 2026-11-21 (`npm view <paket> version`). Context7 dokümanları resmî repoların ilgili tag'lerinden: Next.js docs v16.4.5 (paket 16.4.6, patch farkı), next-intl docs v4.14.9 (paket 4.15.3), Velite v0.4.0.

| Paket / servis | Sürüm | Doğrulanan davranış | Link |
|---|---|---|---|
| next | 16.4.6 | proxy Node-only; `next lint` kaldırıldı; Turbopack varsayılan; `images.qualities` zorunlu; çoklu root layout; global-not-found deneysel; next/font seçenekleri | [npm](https://www.npmjs.com/package/next) · [v16 upgrade](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/02-guides/upgrading/version-16.mdx) |
| react / react-dom | 19.3.1 | Next peer: ^19 | [npm](https://www.npmjs.com/package/react) |
| typescript | 6.0.3 (latest 7.0.2) | TS 7 için `experimental.useTypeScriptCli` | [npm](https://www.npmjs.com/package/typescript) · [Next doc](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli) |
| tailwindcss · @tailwindcss/turbopack | 4.3.5 (Next 16.4.6 şablonu PostCSS yerine Turbopack loader kullanıyor) | `@theme`, `--color-*: initial` | [npm](https://www.npmjs.com/package/tailwindcss) · [doc](https://tailwindcss.com/docs/theme) |
| shadcn · radix-ui | 4.23.0 · 1.8.1 | Tailwind v4 + Next 16 şablonu; birleşik radix-ui | [npm](https://www.npmjs.com/package/shadcn) · [changelog](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-02-radix-ui.mdx) |
| motion | 14.14.0 | LazyMotion, reducedMotion, useScroll container, layoutId; peer React ^19 | [npm](https://www.npmjs.com/package/motion) · [doc](https://motion.dev/docs/react-lazy-motion) |
| gsap (seçilmedi) | 3.15.1 | ücretsiz, Webflow lisansı | [pricing](https://gsap.com/pricing) |
| lenis (seçilmedi) | 1.3.27 | — | [npm](https://www.npmjs.com/package/lenis) |
| next-intl (seçilmedi) | 4.15.3 | as-needed proxy ister | [doc](https://github.com/amannn/next-intl/blob/v4.14.9/docs/src/pages/docs/routing/configuration.mdx) |
| astro (seçilmedi) | 7.4.13 | zero JS, island'lar arası context yok | [doc](https://github.com/withastro/docs/blob/main/src/content/docs/en/recipes/sharing-state-islands.mdx) |
| velite | 0.4.0 | s.image, s.raw, transform, Next entegrasyonu | [npm](https://www.npmjs.com/package/velite) · [doc](https://github.com/zce/velite/blob/v0.4.0/docs/guide/velite-schemas.md) |
| @content-collections/* (seçilmedi) | core 0.15.3 · next 0.2.11 | Next 16 peer; görsel blur yok | [doc](https://github.com/sdorra/content-collections/blob/main/docs/adapter/next.mdx) |
| react-markdown | 10.1.0 | peer React ≥ 18 | [npm](https://www.npmjs.com/package/react-markdown) |
| vitest | 5.1.1 | — | [npm](https://www.npmjs.com/package/vitest) |
| @playwright/test · @axe-core/playwright | 1.65.1 · 4.14.0 | — | [npm](https://www.npmjs.com/package/@playwright/test) · [npm](https://www.npmjs.com/package/@axe-core/playwright) |
| eslint · eslint-config-next | 9.39.5 · 16.4.6 | config peer eslint ≥ 9, ama içindeki react / jsx-a11y / import eklentileri ≤ 9 | [npm](https://www.npmjs.com/package/eslint-config-next) |
| prettier · prettier-plugin-tailwindcss | 3.10.1 · 0.8.1 | — | [npm](https://www.npmjs.com/package/prettier-plugin-tailwindcss) |
| Vercel Web Analytics | — | custom event yalnız Pro/Enterprise | [doc](https://vercel.com/docs/analytics/custom-events) |
| Vercel Image Optimization | — | Hobby 5K dönüşüm/ay, aşımda 402 | [doc](https://vercel.com/docs/image-optimization/limits-and-pricing) |
| Umami Cloud | — | Hobby 0 $, 100K event, cookie yok, `data-umami-event` | [pricing](https://umami.is/pricing) · [doc](https://docs.umami.is/docs/track-events) |
| Kenney | — | CC0, atıf gerekmiyor | [support](https://kenney.nl/support) |
| Google / Gemini | — | sahiplik talep edilmiyor; AI içeriğini insan yapımı gibi sunmak yasak | [Terms](https://policies.google.com/terms) |

**Doğrulanamayan:** AI ile üretilen görsellerin telif durumu (ABD Telif Ofisi raporu okunamadı; Türk hukuku araştırılmadı). Karar buna dayanmıyor: koruma iddia etmiyoruz, kaynağı yazıyoruz.
