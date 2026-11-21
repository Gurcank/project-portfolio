# PROGRESS

## Durum: S4 bitti (2026-11-21)

### Ne bitti
- S1 Keşif → `docs/SPEC.md`.
- S2 İlham havuzu → `docs/INSPIRATION.md`; SPEC §8 tasarım yönü ("Odamdaki raf", kaset rafı, pixel saksı bitkisi, palet, tipografi).
- S3 İçerik → `docs/CONTENT.md` (7 case study, hero, ilkeler, hakkımda, mikro metinler, kişisel katman listeleri; TR onaylı, EN kontrol bekliyor).
- S4 Mimari ve yol haritası:
  - `docs/ARCHITECTURE.md`: 19 karar (Bağlam / Alternatifler / Sonuç / Ödünleşim / Kaynak), klasör yapısı, içerik veri modeli, route listesi, bileşen haritası, durumlar, erişilebilirlik, performans bütçesi, içerik güncelleme akışı, riskler, doğrulama kaynakları.
  - Stack: Next.js 16.4.6 (App Router, tamamen statik, proxy yok) · React 19.3.1 · TypeScript 6.0.3 · Tailwind 4.3.5 + `styles/tokens.css` · shadcn/ui + Radix · Motion 14.14.0 · WebGL yok · Velite 0.4.0 (Markdown + YAML) · react-markdown 10.1.0 · next/image · next/font · i18n kütüphanesiz (dil başına root layout) · Umami Cloud · Vitest 5.1.1, Playwright 1.65.1, axe 4.14.0. Sürümler npm registry'den, API davranışları Context7 ve resmî dokümanlardan doğrulandı.
  - `docs/ROADMAP.md`: S5 kurulum + 10 dikey dilim (D1 İlk 30 saniye → D10 Intro) + S16 kalite kapıları. Ortak "bitti" tanımı, dilim başına durumlar ve kabul testleri, 29 INS öğesinin dilim eşlemesi, "kullanıcıdan beklenenler" tablosu.
  - SPEC §13'te S4 soruları kapandı: marka adları yalnız metin, Gemini şartları, pixel paketi yalnız CC0 (Kenney), INS-10 v1'de yok, analytics Umami. CONTENT §9–10: Barış Manço albümü doğrulandı (1981, Türküola); yeni boşluklar eklendi.

### Sıradaki adım: S5 — Kurulum (Faz 3)
- `docs/PROMPTS.md` → S5 prompt'u + `docs/ROADMAP.md` → "S5 · Kurulum" maddeleri (ROADMAP, PROMPTS'tan daha ayrıntılı; ikisi çelişirse ROADMAP geçerli).
- Çıktı: Next projesi, git (`docs/sources/` ilk commit'ten önce ignore, kanıtlı), `styles/tokens.css`, `check:tokens`, fontlar, Velite iskeleti (`profile` + `site` şemaları), shadcn init, proje `CLAUDE.md`'si (< 200 satır), GitHub + Vercel, ilk deploy.
- S5'te doğrulanacaklar (S4'te doğrulanamadı): TypeScript 6.0.3 + ESLint 10 + Velite'in Next 16.4.6 ile birlikte build alması; Vercel'in Node 24.x desteği; boş sayfanın Lighthouse JS değeri (JS bütçesinin bazı, buraya yazılacak).

### Açık sorular (kullanıcıdan)
| Ne | Gerektiği dilim |
|---|---|
| Umami Cloud hesabı ve Website ID | D1 |
| EN CV PDF'i | D1 (gelene kadar EN'de düğme gizli) |
| IDDDergi canlı adresi; Novera repo linki gösterilsin mi | D2 |
| EN case study metinlerinin kontrolü | D2 production'dan önce |
| 2–3 kişisel fotoğraf; Atatürk portresi seçimi; kenar notu metinleri | D4 |
| 7 şarkının yılı | D7 |
| 30 sn testi için bir kişi; domain | S16 |

### Not
- GitHub profil README'sindeki LinkedIn linki eski URL'ye gidiyor (`/in/gürcan-karadağ-a349a5294`); CV'deki `/in/gurcankaradag`. Sitenin kapsamında değil, elle düzeltilecek.
- ATAMap'in stack'i Preact + Vite (React değil); CONTENT'te doğru yazıldı.
- AI görsellerinin telif durumu doğrulanamadı (ABD Telif Ofisi raporu okunamadı, Türk hukuku araştırılmadı); karar buna dayanmıyor: koruma iddia edilmez, kaynak kredilerde yazılır.
