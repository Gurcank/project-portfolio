# PROGRESS

## Durum: S5 bitti (2026-11-21)

**Canlı:** https://project-portfolio-theta-mocha.vercel.app · **Repo:** https://github.com/Gurcank/project-portfolio (public) · Vercel projesi `project-portfolio` (takım: gurcanks-projects), production branch `main`, Node 24.x.

### Ne bitti

- S1 Keşif → `docs/SPEC.md`. S2 İlham → `docs/INSPIRATION.md` + SPEC §8. S3 İçerik → `docs/CONTENT.md` (TR onaylı, EN kontrol bekliyor). S4 Mimari → `docs/ARCHITECTURE.md` (19 ADR) + `docs/ROADMAP.md`.
- S5 Kurulum (Faz 3):
  - Next 16.4.6 projesi: `app/(tr)` (`/`, `lang="tr"`) ve `app/(en)/en` (`/en`, `lang="en"`) root layout'ları, iki dilli `global-not-found.tsx` (`experimental.globalNotFound`), hepsi statik.
  - Git: `docs/sources/` ilk commit'ten önce `.gitignore`'da. Kanıt: `git check-ignore -v` → `.gitignore:2`; `git ls-files | grep sources` → 0 dosya; GitHub API `docs/sources` → 404. `.gitattributes` ile repoda LF.
  - `styles/tokens.css`: SPEC §8 paleti (`--color-*: initial`), 7 kaset rengi + yazı eşleşmeleri, akışkan tip ölçeği (gövde 17→18 px, oran 1.25→1.333, `text-display` clamp), 4 px boşluk tabanı, gutter 16/32/64, radius, shadow, easing + süreler (reduced-motion ve `data-motion="paused"` sıfırlar), z-index katmanları.
  - `npm run check:tokens` (+ Vitest testi): ham hex/rgb/px, arbitrary değer ve ölçek dışı boşluk build kapısı.
  - Fontlar `next/font/google` (Archivo `wdth` preload; Fraunces italic, Geist Mono, Caveat preload kapalı). Velite iskeleti (`site` şeması; `profile` şeması tanımlı, D1'de kayıt). `ExperienceBoundary`, `lib/i18n.ts`, `lib/utils.ts` (`cn`), `components.json` (shadcn).
  - Script'ler: `dev`, `build`, `lint`, `format`, `format:check`, `typecheck`, `test`, `test:e2e`, `check:tokens`, `screenshots`. `.claude/launch.json` (`prod`, `dev`).
  - Testler: Vitest 9/9 (i18n, check:tokens); Playwright 11/11 (lang, iki dilli 404 status, axe serious/critical 0, 375/768/1280'de yatay taşma yok).
  - Proje `CLAUDE.md` (110 satır).
  - Geçici sayfa: "Merhaba" + token önizlemesi (palet, kaset sırtları, tip ölçeği, boşluk). D1'de hero ile değişir.

### S5'te doğrulananlar

- TypeScript 6.0.3 + Velite 0.4.0 + Next 16.4.6 birlikte build alıyor (yerel ve Vercel).
- Vercel Node 24.x ile build ediyor (`engines.node`).
- **JS bütçesinin bazı (canlı, mobil Lighthouse 13.6.0):** 6 dosya, **137,8 KB** transfer (447 KB sıkıştırılmamış). Her dilim bunun üstüne eklediği JS'i raporlar.
- Canlı mobil Lighthouse: Performans 96 · Erişilebilirlik 100 · Best practices 96 · SEO 73. LCP 2,2 sn · CLS 0 · TBT 90 ms. Fontlar 8 dosya / 399 KB (önizleme dört aileyi birden kullanıyor).

### Plandan sapmalar (ARCHITECTURE güncellendi)

- **ESLint 10 → 9.39.5:** eslint-config-next 16.4.6 içindeki react / jsx-a11y / import eklentileri ESLint 10'u desteklemiyor; Next şablonu da `^9`. npm "no longer supported" uyarısı veriyor (risk §11).
- **Tailwind `@tailwindcss/turbopack` loader** (Next 16.4.6 şablonu), `@tailwindcss/postcss` değil.
- **shadcn init çalıştırılmadı:** `globals.css`'i kendi renkleriyle ezerdi; `components.json` elle. İlk `npx shadcn add` D2'de (Dialog) denenir.
- `npm audit`: Velite'in sharp 0.34.5'i 2 high bulgu; yalnız build'de, kendi görsellerimiz (risk §11).

### Sıradaki adım: S6 — D1 · İlk 30 saniye

- `docs/PROMPTS.md` → S6+ prompt'u; kapsam `docs/ROADMAP.md` → "S6 · D1".
- D1'e devredilen bulgular (canlı Lighthouse):
  - `meta description` yok; `hreflang` ve `canonical` geçersiz, çünkü `metadataBase` yok ve URL'ler göreli → D1'de `metadataBase` (şimdilik vercel.app adresi; domain S16'da).
  - `/favicon.ico` 404 → D1'de `app/icon.svg`.
  - Font ağırlığı: hero yalnız Archivo kullanınca yeniden ölç; Caveat/Fraunces ilk ekranda yoksa indirilmemeli.
  - `content/profile.yaml` + `profile` koleksiyonunu Velite'e kaydet; `content/site/{tr,en}.yaml`.
  - Geçici `components/home/TokenPreview.tsx` kaldırılır.
- Vercel önizlemeleri (branch deploy) SSO korumalı: yalnız Vercel hesabıyla açılır; production alias herkese açık.

### Açık sorular (kullanıcıdan)

| Ne                                                                  | Gerektiği dilim                       |
| ------------------------------------------------------------------- | ------------------------------------- |
| Umami Cloud hesabı ve Website ID                                    | D1                                    |
| EN CV PDF'i                                                         | D1 (gelene kadar EN'de düğme gizli)   |
| `profile.yaml` için e-posta, LinkedIn, GitHub adresleri (onaylı)    | D1                                    |
| IDDDergi canlı adresi; Novera repo linki gösterilsin mi             | D2                                    |
| EN case study metinlerinin kontrolü                                 | D2 production'dan önce                |
| 2–3 kişisel fotoğraf; Atatürk portresi seçimi; kenar notu metinleri | D4                                    |
| 7 şarkının yılı                                                     | D7                                    |
| 30 sn testi için bir kişi; domain                                   | S16                                   |

### Not

- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor (`/in/gürcan-karadağ-a349a5294`); CV'deki `/in/gurcankaradag`. Sitenin kapsamında değil, elle düzeltilecek.
- ATAMap'in stack'i Preact + Vite (React değil); CONTENT'te doğru yazıldı.
- AI görsellerinin telif durumu doğrulanamadı; karar buna dayanmıyor: koruma iddia edilmez, kaynak kredilerde yazılır.
- Yerel ölçümde Kaspersky her sayfaya ~925 KB script/CSS enjekte ediyor; yerel Lighthouse'ta `--blocked-url-patterns="*kaspersky-labs.com*"` kullan.
- Git Bash'te yol argümanlarına `MSYS_NO_PATHCONV=1` gerekiyor (CLAUDE.md'de yazılı).
