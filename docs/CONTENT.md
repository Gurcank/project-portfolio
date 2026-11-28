# CONTENT — Gürcan Karadağ portfolio

> Durum: S3 bitti (2026-11-21). Bütün site metinleri TR ve EN burada; kod bu dosyadan beslenir (veri modeli: ARCHITECTURE §3; her dilim kendi metnini `content/` altına taşır, ROADMAP).
> TR metinler kullanıcıyla tek tek onaylandı. EN metinler TR'nin kendi ritminde yazılmış karşılığıdır; kullanıcı kontrolü bekliyor (§10).
> Ton ve kurallar: SPEC §7. Tasarım bağlamı: SPEC §8.

## 0. Kullanım ve metin bütçesi

| Alan | Bütçe |
|---|---|
| Hero rol cümlesi | ≤ 60 karakter |
| Mono etiket | tek satır; 375 px'te iki satıra kırılabilir |
| Kaset kartı | problem ≤ 90 karakter · tek sonuç ≤ 60 karakter · künye tek satır |
| Case study | TR 300–420 kelime · EN 370–530 kelime; ~2–2,5 dk (Türkçe eklemeli dil, aynı içerik ~%25 daha az kelime). Kısa projelerde (IDDDergi) alt sınırın altı kabul. S3 şablonundaki 390–610 hedefi TR'de fazla çıktı; gerçekleşen değer budur. |
| Ürün ilkesi | koşul ≤ 70 karakter + eylem ≤ 120 karakter + bağlı kaset |
| Hakkımda | ≤ 120 kelime |
| Hedeflerim | ≤ 60 kelime |
| Bu site nasıl yapıldı | ≤ 250 kelime |
| Buton / etiket | ≤ 3 kelime |
| Boş durum, hata | ≤ 15 kelime |

- **Okuma süresi** = kelime / 180 (TR) ve / 200 (EN), `m:ss`, en yakın 0:05'e yuvarlanır. TR ve EN ayrı hesaplanır. Bu dosyadaki süreler 2026-11-21'de bu formülle script'le hesaplandı.
- *Yıldızlı* kelime = Instrument Serif Italic vurgu (başlıkta tek kelime, SPEC §8; v1'de Fraunces).
- `Mono` metin = Fragment Mono, büyük harf; `lang="tr"` ile (i/İ). (v1'de Geist Mono.)
- Mizah yalnız mikro metinde ve başlıklarda (INS-15). Case study gövdesi ciddi. **ATAMap kasetinde mizah ve kenar notu yok** (SPEC §6).
- Ekip arkadaşlarının adı sitede yazılmaz.

## 1. Case study şablonu (kaset)

**Kart (raf / kapak, INS-14, INS-16):** problem cümlesi ("[Kim] [neyle uğraşıyordu]"; ürün adı ve teknoloji yok) · künye `ROL · YIL · EKİP` · tek sonuç. Sırtta proje adı + katalog no.

**Overlay başlığı:** ad · tek kelime italik alt başlık · künye (Yıl / Rol / Ekip) · linkler · toplam süre.

| Yüz | Parça | İçerik | Bütçe |
|---|---|---|---|
| A — Neden | A1 Problem | Durum, neden önemli | 60–90 kelime |
| | A2 Kullanıcı | Birincil / ikincil, bağlam, ihtiyaç | 40–70 kelime |
| | A3 Hedef | "Başarılı olursa" 2–3 madde + kapsam dışı | 40–60 kelime |
| B — Nasıl ve ne oldu | B1 Kararlar ve ödünleşimler | 2–3 karar: Seçtim / Vazgeçtim / Çünkü / Bedeli | 150–220 kelime |
| | B2 Sonuç | Somut; metrik yoksa "ölçmedim" + ilk ölçülecek şey | 50–90 kelime |
| | B3 Öğrendiklerim | 2–3 madde | 50–80 kelime |

**Liner notes** (kapanış, parça değil): stack, krediler, linkler. Stack ayrı parça değil; PM konumlanması gereği hikâye kararlarda.

EN parça adları: Side A · Side B · A1 Problem · A2 Users · A3 Goal · B1 Decisions and trade-offs · B2 Outcome · B3 What I learned · Liner notes. Karar etiketleri: Chose / Passed on / Because / Cost.

## 2. Raf: sıra, renk, kart

Sıra mantığı: önce en eksiksiz ürün (öne çıkan), sonra PM kanıtı, ürün sezgisi (01–03); karar kalitesi (04–05); zevk ve küçük işler (06–07). İK ilk iki kasette ürünü ve rolü görür; ana hikâye ("dağınık bilgi → dokunulabilir ürün") 01, 04, 05, 06'da tekrar eder.

| No | Proje | Renk (SPEC §8) | Renk gerekçesi |
|---|---|---|---|
| GK-01 ★ | ErasmusMap | hardal `#E0A82E` | AB bayrağının yıldız sarısı; öne çıkan kaset |
| GK-02 | Novera Mobility | kiremit `#B8471F` | Sitenin vurgu rengi; PM rolünün kanıtı |
| GK-03 | SeeYourNextStep | gece mavisi `#2B3F6B` | Projenin kendi gece gökyüzü teması |
| GK-04 | ATAMap | bordo `#7A2E3A` | Projenin sepya-pas paletine yakın; bayrak kırmızısından uzak |
| GK-05 | İklim Krizi | petrol `#24666B` | Deniz ve buzul tonu |
| GK-06 | Nature & Sport Handbook | zeytin `#7D8A3A` | Doğa |
| GK-07 | IDDDergi | gül kurusu `#D08C83` | Kâğıt ve dergi tonu |

### Kart metinleri

| No | Problem (TR) | Problem (EN) | Künye | Sonuç (TR / EN) |
|---|---|---|---|---|
| GK-01 | Erasmus'ta gezilen şehirler unutuluyor; deneyim sonraki öğrenciye ulaşmıyor. | Erasmus cities get forgotten, and the experience never reaches the next student. | `PRODUCT + TASARIM + KOD · 2026 · SOLO` / `PRODUCT + DESIGN + CODE · 2026 · SOLO` | Yayında · 1602 şehir · 6 dil / Live · 1,602 cities · 6 languages |
| GK-02 | Hızla büyüyen bir site, temeli sağlamlaşmadan yeni özellik taşıyamıyordu. | A fast-growing site couldn't carry new features on a shaky base. | `FRONTEND (V1) → PM (V2) · 2026 · 2 KİŞİ` / `FRONTEND (V1) → PM (V2) · 2026 · TEAM OF 2` | Yayında · v2 · TR/EN / Live · v2 · TR/EN |
| GK-03 | Ürün rolleri arasında kararsız biri neyi, hangi sırayla öğreneceğini bilmiyor. | Torn between product roles, you don't know what to learn, or in what order. | `PRODUCT + TASARIM + KOD · 2026 · SOLO` / `PRODUCT + DESIGN + CODE · 2026 · SOLO` | Yayında · 7 rol · 335 ders / Live · 7 roles · 335 lessons |
| GK-04 | Atatürk'ün hayatı kronolojilerde parça parça; yolculuğu bir bütün olarak izlenemiyor. | Atatürk's life lives in fragmented timelines; his journey can't be followed as a whole. | `PRODUCT + TASARIM + KOD · 2026 · SOLO` / `PRODUCT + DESIGN + CODE · 2026 · SOLO` | Yayında · 721 olay · 398 kaynak / Live · 721 events · 398 sources |
| GK-05 | İklim krizi raporlarda soyut kalıyor; okur kendi hayatıyla bağ kuramıyor. | In reports, the climate crisis stays abstract; readers can't link it to their lives. | `PRODUCT + TASARIM + KOD · 2026 · GÖNÜLLÜ EKİP` / `PRODUCT + DESIGN + CODE · 2026 · VOLUNTEER TEAM` | Dernek sitesi için tek sayfalık belgesel / A one-page documentary for an NGO |
| GK-06 | Doğada gördüğünü tanımak isteyen biri kısa ve güvenilir bir rehber bulamıyor. | Anyone trying to name what they see outdoors can't find a short, reliable guide. | `PRODUCT + TASARIM + KOD · 2026 · SOLO` / `PRODUCT + DESIGN + CODE · 2026 · SOLO` | Yayında · TR/EN · 558 kredili görsel / Live · TR/EN · 558 credited images |
| GK-07 | Derneğin dergisi bir PDF dosyasında kalıyordu; telefonda okunmuyordu. | The NGO's magazine was stuck in a PDF that nobody read on a phone. | `PRODUCT + KOD · 2026 · GÖNÜLLÜ EKİP` / `PRODUCT + CODE · 2026 · VOLUNTEER TEAM` | Dernek sitesinde canlı / Live on the NGO's site |

---

## 3. Case study'ler

<!-- Her proje: TR ve EN blokları; parça başlığında okuma süresi. -->

### GK-01 · ErasmusMap ★

- **Alt başlık:** Bir Erasmus dönemini *unutmamak* için harita · EN: A map so you don't *forget* your Erasmus
- **Künye:** 2026 · Product, tasarım, kod · Solo (AI destekli)
- **Linkler:** [erasmusmap.vercel.app](https://erasmusmap.vercel.app) · [github.com/Gurcank/project-Erasmusmap](https://github.com/Gurcank/project-Erasmusmap)
- **Toplam süre / Total:** TR 2:15 · EN 2:40

#### TR

**A1 · Problem** `0:20`
Erasmus'a gideceğim netleştiğinde yaptıklarımı kayıt altına almak istedim. Gezdiğim yerleri not etmeyi severim, çünkü not etmediğimi unutuyorum. Bir Erasmus dönemi kısa ve yoğun: birkaç ayda onlarca şehir, her biri ayrı bir deneyim. Bu deneyimler genelde fotoğraf galerisinde ya da sohbet geçmişinde kalıyor. Ne sahibine düzenli bir hatıra oluyor ne de aynı şehre gidecek bir sonraki öğrenciye bilgi.

**A2 · Kullanıcı** `0:10`
Birincil: Erasmus'taki öğrenci. Gittiği şehirleri işaretlemek, puanlamak ve sonraki geziyi planlamak istiyor; bunu telefondan, birkaç dokunuşla yapmalı.
İkincil: Erasmus'a hazırlanan öğrenci. Şehir seçerken "orada yaşamış biri ne diyor?" sorusunun cevabını arıyor; tek bir yıldız puanı ona yetmiyor.

**A3 · Hedef** `0:15`
Başarılı olursa:
- Bir öğrenci gezdiği şehri 1 dakikadan kısa sürede kaydedip puanlayabilir.
- Şehir sayfası tek puan yerine 6 kriterde (kültür, gastronomi, güvenlik, sosyal hayat, ulaşım, yaşam maliyeti) karşılaştırılabilir bilgi verir.
- Kayıt ve plan aynı yerde durur.

Kapsam dışı: konaklama ve bilet satışı.

**B1 · Kararlar ve ödünleşimler** `0:55`
1. **Şehir = NUTS 3 bölgesi.** *Seçtim:* Haritada şehirleri nokta yerine Avrupa'nın resmî NUTS 3 bölgeleriyle çizmeyi; her bölge içindeki en büyük şehrin adını taşıyor. *Vazgeçtim:* Nokta işaretlerinden. *Çünkü:* Noktalar büyük şehirlerin çevresinde üst üste biniyordu; NUTS 3 her ülkede doğru idari seviye (Türkiye'de il, Fransa'da département). *Bedeli:* Resmî adlar kullanılamıyor ("München, Kreisfreie Stadt"), bir adlandırma kuralı yazmam gerekti.
2. **Yalnızca Google ile giriş, fotoğraf yükleme yok.** *Seçtim:* Google girişi ve hazır avatarlar. *Vazgeçtim:* E-posta/şifre ve kullanıcı fotoğrafından. *Çünkü:* Şifre ve fotoğraf saklamamak hem güvenlik riskini hem moderasyon yükünü siliyor; tek kişilik bir ekip için ikisi de taşınamaz. *Bedeli:* Google hesabı olmayan kullanıcıyı kaybetmek ve daha az kişisel profiller.
3. **Önce kayıt ve plan, yorum onların yan ürünü.** *Seçtim:* Ziyaret edilen şehirleri, gitmek istenenleri ve seyahat planlayıcıyı (rota, program, bütçe, harcama) aynı hesapta toplamayı. *Vazgeçtim:* Yalnızca bir yorum sitesi olmaktan. *Çünkü:* Yorum sitesi, kullanıcı bir şey yazmadığı sürece ona değer vermez; kayıt ve plan ilk günden kendisi için bir sebep veriyor. *Bedeli:* Kapsam büyüdü; planlayıcı başlı başına bir ürün oldu.

**B2 · Sonuç** `0:20`
ErasmusMap yayında: 1602 şehir, 6 dil, Google girişi, seyahat planlayıcı ve yorumların beğenilip tartışıldığı bir "Meydan" akışı. Temmuz–Ekim 2026'da 142 commit; her değişiklik test, tip kontrolü ve boş veritabanında migration denemesinden geçiyor. Kullanım şimdilik çevremle sınırlı ve sistemli ölçmedim. Ölçeceğim ilk şey: kayıt olanların kaçı ilk hafta içinde en az bir şehir puanlıyor.

**B3 · Öğrendiklerim** `0:15`
- **Kapsamı erken kilitlerdim.** Sosyal akış ve planlayıcı ilk kullanıcılar gelmeden eklendi; önce tek bir akışı (kaydet → puanla) çalıştırıp ölçmek daha doğru olurdu.
- **Dağıtım da ürünün parçası.** İlk 20 kullanıcıyı nereden bulacağımı geliştirmeye başlamadan planlardım.
- **Gizlilik kararı en başta alınır.** Veriyi hiç saklamamak, sonradan silmeye çalışmaktan çok daha ucuz.

#### EN

**Subtitle:** A map so you don't *forget* your Erasmus

**A1 · Problem** `0:25`
Once my Erasmus was confirmed, I wanted to keep a record of it. I like logging the places I visit, because what I don't write down, I forget. An Erasmus term is short and dense: dozens of cities in a few months, each its own experience. Those experiences usually end up in a camera roll or a chat history. They don't become an organised memory for the person who lived them, or useful information for the next student heading to the same city.

**A2 · Users** `0:15`
Primary: the student on Erasmus. They want to mark the cities they've visited, rate them and plan the next trip, in a few taps, on their phone.
Secondary: the student preparing for Erasmus. Choosing a city, they're asking "what does someone who lived there say?", and a single star rating doesn't answer it.

**A3 · Goal** `0:15`
If it works:
- A student can log and rate a city in under a minute.
- A city page offers comparable information across 6 criteria (culture, food, safety, social life, transport, cost of living) instead of one score.
- Logs and plans live in one place.

Out of scope: accommodation and ticket sales.

**B1 · Decisions and trade-offs** `1:00`
1. **A city is a NUTS 3 region.** *Chose:* drawing cities as Europe's official NUTS 3 regions instead of dots, each named after the largest city inside it. *Passed on:* point markers. *Because:* dots piled up around big cities, while NUTS 3 is the right administrative level in every country (a province in Turkey, a département in France). *Cost:* official names are unusable ("München, Kreisfreie Stadt"), so I had to write a naming rule.
2. **Google sign-in only, no photo uploads.** *Chose:* Google sign-in and ready-made avatars. *Passed on:* email/password and user photos. *Because:* storing neither passwords nor photos removes both a security risk and a moderation load, neither of which a one-person team can carry. *Cost:* losing people without a Google account, and less personal profiles.
3. **Logging and planning first; reviews as a by-product.** *Chose:* putting visited cities, a wishlist and a trip planner (route, schedule, budget, expenses) in one account. *Passed on:* being just a review site. *Because:* a review site gives nothing back until the user writes something; logging and planning give them a reason of their own from day one. *Cost:* scope grew, and the planner became a product in itself.

**B2 · Outcome** `0:25`
ErasmusMap is live: 1,602 cities, 6 languages, Google sign-in, a trip planner and a "Square" feed where reviews are liked and discussed. 142 commits between July and October 2026; every change passes tests, type checks and a migration run against an empty database. Usage is so far limited to people around me, and I haven't measured it systematically. The first thing I'd measure: how many new sign-ups rate at least one city in their first week.

**B3 · What I learned** `0:20`
- **I'd lock scope earlier.** The social feed and planner arrived before the first users; I should have shipped and measured one flow (log → rate) first.
- **Distribution is part of the product.** I'd plan where the first 20 users come from before writing any code.
- **Privacy decisions come first.** Never storing data is far cheaper than trying to delete it later.

**Liner notes / Künye:** Next.js 16 · TypeScript · Tailwind CSS v4 · Mapbox GL · Prisma + Supabase Postgres · NextAuth · Vitest + Playwright · Vercel · Veri / Data: GeoNames (CC BY 4.0), Eurostat NUTS 3 + GADM

---

### GK-02 · Novera Mobility

- **Alt başlık:** Kod yazmayı bırakıp *karar* vermeyi seçmek · EN: Choosing *decisions* over code
- **Künye:** 2026 · v1 frontend → v2 Product / Project Manager · 2 kişilik ekip (ekip arkadaşının adı yazılmaz)
- **Linkler:** [novera-mobility.vercel.app](https://novera-mobility.vercel.app) · repo linki açık madde (§10)
- **Toplam süre / Total:** TR 2:00 · EN 2:15

#### TR

**A1 · Problem** `0:20`
Novera Mobility, ekip arkadaşımla gerçek bir ekip akışını öğrenmek için kurguladığımız bir araç kiralama şirketi. v1'de ön yüzü ben, arka yüzü o yazdı. Site hızlı büyüdü: arama, rezervasyon, puanla ödeme, kurumsal teklif, iki dil. Ama 22 Ekim'deki kalite taramasında 1 kritik ve 5 yüksek bulgu çıktı; örneğin geçmiş tarihli bir rezervasyonla anında puan kazanılabiliyordu.

**A2 · Kullanıcı** `0:15`
Ürünün kurgusal kullanıcıları üç grup: araç kiralayan birey, filo kiralayan kurumsal yönetici ve siteyi yöneten Novera çalışanı.
Projenin gerçek kullanıcısı ise ekibin kendisi: ekip arkadaşım full stack deneyimi kazanmak istiyordu, ben PM deneyimi. v2'de rolleri buna göre ayırdık: o tüm kodu yazıyor; ben kapsamı, sırayı ve kabulü yönetiyorum.

**A3 · Hedef** `0:10`
v2'nin başarı ölçütü:
- SPEC'teki tüm kabul akışları canlıda, 375 ve 1280 px'te ve yalnızca klavyeyle geçer.
- Kritik ve yüksek bulguların hepsi kapanır.

Kapsam dışı: pazarlama metinlerini değiştirmek.

**B1 · Kararlar ve ödünleşimler** `0:50`
1. **Önce temel, sonra özellik.** *Seçtim:* v2'yi beş parçaya bölüp ilkini (güvenlik, veri bütünlüğü, kod düzeni) diğerlerinin önkoşulu yapmayı. *Vazgeçtim:* Sitede satılan ama çalışmayan Filom ve Yönetim panellerini hemen yazmaktan. *Çünkü:* Puan açığı olan bir ödeme akışının üstüne yeni panel kurmak, açığı büyütmek demekti. *Bedeli:* Haftalarca dışarıdan görünür bir yenilik çıkmadı.
2. **Her iş bir issue, main'e doğrudan push yok.** *Seçtim:* Issue → branch → PR → Vercel önizlemesinde kabul kriterine göre kontrol → birleştirme akışını. *Vazgeçtim:* İki kişilik ekipte hızlı ama izsiz doğrudan push'tan. *Çünkü:* Kontrol edebileceğim bir kabul kriteri yoksa PM olarak söyleyebileceğim tek şey "beğendim" olur. *Bedeli:* Küçük düzeltmeler bile bir PR döngüsü istiyor.
3. **SPEC tek kaynak.** *Seçtim:* Bir istek SPEC'le çelişirse geliştiricinin durup bana sormasını; değişiklik yalnızca PR ile ve sürüm notuyla. *Vazgeçtim:* Sohbette verilen anlık kararlardan. *Çünkü:* Asenkron çalışan iki kişi için yazılı karar, hatırlanan karardan güvenilir. *Bedeli:* SPEC'i güncel tutmak benim sürekli işim oldu.

**B2 · Sonuç** `0:15`
v2 tam sürüm olarak yayında, Türkçe ve İngilizce. 4 Ekim – 1 Kasım 2026 arasında 28 issue açıldı ve her değişiklik PR ile girdi; temel sağlamlaştırma bitmeden yeni özelliğe geçilmedi. Benim için asıl sonuç: kod yazmadan bir ürünü ilerletmenin neye benzediğini ilk kez yaşadım.

**B3 · Öğrendiklerim** `0:10`
- **Kabul kriteri PM'in aracı.** Net bir kriter yokken PR'ı neye göre kabul edeceğimi bilemiyordum.
- **"Ne yapmayacağız" listesi en çok konuşulan belge oldu.**
- **Rol ayrımı, iki kişilik ekipte bile karar hızını artırdı.** Kimin karar verdiği belliydi.

#### EN

**A1 · Problem** `0:20`
Novera Mobility is a fictional car rental company my teammate and I made up to learn how a real team works. In v1, I built the frontend and they built the backend. The site grew fast: search, booking, pay-with-points, corporate quotes, two languages. Then a quality review on 22 October found 1 critical and 5 high-severity issues; for example, a backdated booking earned points instantly.

**A2 · Users** `0:15`
The product's fictional users are three groups: individuals renting a car, corporate fleet managers and Novera staff running the site.
The project's real users were the team itself: my teammate wanted full-stack experience, I wanted PM experience. So in v2 we split the roles: they write all the code; I own scope, order and acceptance.

**A3 · Goal** `0:10`
v2's success criteria:
- Every acceptance flow in the spec passes in production, at 375 and 1280 px, keyboard only.
- All critical and high-severity issues are closed.

Out of scope: changing marketing copy.

**B1 · Decisions and trade-offs** `1:00`
1. **Foundation first, features second.** *Chose:* splitting v2 into five parts and making the first (security, data integrity, code structure) a prerequisite for the rest. *Passed on:* immediately building the Fleet and Admin panels the site advertised but didn't have. *Because:* adding panels on top of a payment flow with a points exploit would only widen the hole. *Cost:* weeks with nothing visibly new.
2. **Every task is an issue; no direct pushes to main.** *Chose:* issue → branch → PR → check against acceptance criteria on the Vercel preview → merge. *Passed on:* fast but untraceable direct pushes, tempting in a team of two. *Because:* without acceptance criteria I can check, the only thing I can say as PM is "looks good". *Cost:* even small fixes need a full PR cycle.
3. **The spec is the single source of truth.** *Chose:* if a request conflicts with the spec, the developer stops and asks me; changes go in only through a PR with a version note. *Passed on:* on-the-fly decisions in chat. *Because:* for two people working asynchronously, a written decision beats a remembered one. *Cost:* keeping the spec current became my ongoing job.

**B2 · Outcome** `0:15`
v2 is live as a full release, in Turkish and English. Between 4 October and 1 November 2026 we opened 28 issues and every change went in through a PR; no new feature started before the foundation work was done. For me, the real outcome: the first time I moved a product forward without writing code.

**B3 · What I learned** `0:15`
- **Acceptance criteria are a PM's tool.** Without clear criteria, I didn't know what to accept a PR against.
- **The "what we won't do" list was the most discussed document.**
- **Clear roles sped up decisions, even in a team of two.** Everyone knew who decided.

**Liner notes / Künye:** Next.js · TypeScript · Tailwind CSS · next-intl · Zod · NestJS · Prisma · PostgreSQL (Neon) · Vercel + Google Cloud Run · Ekip: ekip arkadaşım (full stack) / Team: my teammate (full stack)

---

### GK-03 · SeeYourNextStep

- **Alt başlık:** Yedi rol, tek harita, *sıradaki* adım · EN: Seven roles, one map, your *next* step
- **Künye:** 2026 · Product, tasarım, kod · Solo
- **Linkler:** [seeyournextstep.vercel.app](https://seeyournextstep.vercel.app) · [github.com/Gurcank/project-SeeYourNextStep](https://github.com/Gurcank/project-SeeYourNextStep)
- **Toplam süre / Total:** TR 1:50 · EN 2:00

#### TR

**A1 · Problem** `0:20`
Ürün tarafında çalışmak istediğimi biliyordum ama hangi rolde olduğumdan emin değildim: Product Manager mı, Product Designer mı, Business Analyst mı? Her rolün ne bilmesi gerektiğini de bilmiyordum. Elimdeki bilgi 15.200 satırlık düz bir markdown yığınıydı: okunuyordu ama nerede kaldığım takip edilemiyor, aranamıyor, tekrar edilemiyordu. Bu yüzden her rol için kendime bir yol çizdim.

**A2 · Kullanıcı** `0:10`
Birincil: ben ve benim gibi ürün rolleri arasında kararsız olan öğrenci ya da yeni başlayan. Rolleri yan yana görmek, birini seçmek ve "sıradaki adımım ne?" sorusuna cevap almak istiyor.
İkincil: mühendislerle aynı dili konuşmak isteyen ürün tasarımcısı.

**A3 · Hedef** `0:10`
Başarı ölçütü: "Siteyi açtığımda nerede kaldığımı üç saniyede görüyorum, aradığım terimi iki saniyede buluyorum, bitirdiğim konuyu tek tıkla işaretliyorum."

Kapsam dışı: hesap, sertifika, video ders.

**B1 · Kararlar ve ödünleşimler** `0:40`
1. **React yok, JS en fazla 60 KB.** *Seçtim:* Astro ile statik site; etkileşimler sayfaya özel küçük betiklerle. Sayfa başına 60 KB JS bütçesi her derlemede denetleniyor. *Vazgeçtim:* React ile tek sayfalık uygulamadan. *Çünkü:* Bu bir okuma ürünü; kullanıcı zamanının çoğunu metinde geçiriyor. Hafif sayfa hızlı açılıyor ve çevrimdışı okumayı mümkün kılıyor. *Bedeli:* Gezegen haritası gibi etkileşimli parçaları framework yardımı olmadan yazmak daha çok emek istedi.
2. **Tek bilgi tabanı, yedi rol merceği.** *Seçtim:* Bütün roller aynı dersleri paylaşıyor; rol yalnızca sırayı, önceliği (temel / önerilen / isteğe bağlı) ve ders içindeki "Product Manager olarak sen" kutularını değiştiriyor. *Vazgeçtim:* Her rol için ayrı kurstan. *Çünkü:* Asıl soru "hangi rol bana uygun?"; kullanıcı rolleri aynı zeminde karşılaştırabilmeli. *Bedeli:* Her ders yedi rol birden düşünülerek yazılmak zorunda.

**B2 · Sonuç** `0:15`
SeeYourNextStep yayında: 7 rol yolu, 31 kategori, 335 ders, 994 terim ve 40 doldurulmuş şablon; tam metin arama ve çevrimdışı okuma. Asıl kullanıcısı benim; 1 kişiye daha gösterdim. Sonucu bir metrik değil, bir karar oldu: bu yolları çizerken Product Manager olmak istediğimi netleştirdim.

**B3 · Öğrendiklerim** `0:15`
- **Kendi problemini çözmek iyi bir başlangıç ama yetmez.** Tek kullanıcıyla neyin genel bir ihtiyaç olduğunu ayıramıyorum.
- **İçerik ürünü ölçekte zorlaşır.** 335 ders, bir ders standardı ve otomatik doğrulama olmadan tutarlı kalmazdı.
- **Performans bütçesini baştan koymak, sonradan kısmaktan kolay.**

#### EN

**A1 · Problem** `0:20`
I knew I wanted to work in product, but I wasn't sure which role: Product Manager, Product Designer, Business Analyst? I didn't know what each role needed to know, either. What I had was a 15,200-line pile of plain markdown: readable, but I couldn't track where I'd stopped, search it or review it. So I drew myself a path for every role.

**A2 · Users** `0:15`
Primary: me, and students or newcomers like me who are torn between product roles. They want to see the roles side by side, pick one and get an answer to "what's my next step?"
Secondary: product designers who want to speak the same language as engineers.

**A3 · Goal** `0:10`
Success criterion: "When I open the site, I see where I left off in three seconds, find a term in two, and mark a finished topic in one click."

Out of scope: accounts, certificates, video lessons.

**B1 · Decisions and trade-offs** `0:45`
1. **No React, at most 60 KB of JS.** *Chose:* a static Astro site with small, page-specific scripts, and a 60 KB-per-page JS budget checked on every build. *Passed on:* a React single-page app. *Because:* this is a reading product; people spend their time in the text. Light pages open fast and make offline reading possible. *Cost:* building interactive parts like the planet map without a framework took more work.
2. **One knowledge base, seven role lenses.** *Chose:* every role shares the same lessons; the role only changes order, priority (core / recommended / optional) and the "As a Product Manager" boxes inside lessons. *Passed on:* a separate course per role. *Because:* the real question is "which role fits me?", so roles must be comparable on the same ground. *Cost:* every lesson has to be written with all seven roles in mind.

**B2 · Outcome** `0:15`
SeeYourNextStep is live: 7 role paths, 31 categories, 335 lessons, 994 terms and 40 filled-in templates, with full-text search and offline reading. Its main user is me; I've shown it to one other person. The outcome wasn't a metric but a decision: drawing these paths is how I settled on becoming a Product Manager.

**B3 · What I learned** `0:15`
- **Solving your own problem is a good start, not the finish.** With one user, I can't tell a general need from a personal one.
- **Content products get hard at scale.** 335 lessons wouldn't stay consistent without a lesson standard and automated checks.
- **Setting a performance budget early beats cutting later.**

**Liner notes / Künye:** Astro 7 · MDX · Tailwind CSS 4 · Pagefind · nanostores · Vercel

---

### GK-04 · ATAMap

> SPEC §6 saygılı sunum: bu kasette mizah, kenar notu ve esprili mikro metin yok.

- **Alt başlık:** 1881–1938, bir haritada *adım adım* · EN: 1881–1938, one map, *step* by step
- **Künye:** 2026 · Product, tasarım, kod · Solo
- **Linkler:** [atamap.vercel.app](https://atamap.vercel.app) · [github.com/Gurcank/project_ATAMap](https://github.com/Gurcank/project_ATAMap)
- **Toplam süre / Total:** TR 1:55 · EN 2:15

#### TR

**A1 · Problem** `0:15`
Atatürk'e hayranım ve hayatını bir bütün olarak izlemek istedim, en azından yolculuğunu. Kronolojiler tarihleri veriyor ama mekânı vermiyor; haritalar ise tek bir dönemi gösteriyor. Selanik'ten Samsun'a, Sakarya'dan yurt gezilerine uzanan 57 yılı aynı yerde ve o günün sınırlarıyla görmek mümkün değildi. Üstelik internette Atatürk hakkında kaynaksız ve birbiriyle çelişen çok bilgi dolaşıyor.

**A2 · Kullanıcı** `0:10`
Ön bilgisi olmayan, meraklı yetişkin ziyaretçi. Ders çalışmıyor, keşfediyor: bir yıl seçip "o sırada neredeydi, ne yazdı?" diye bakmak istiyor. Okuduğu bilginin nereden geldiğini görebilmeli; bu üründe güven, özelliğin kendisi.

**A3 · Hedef** `0:15`
Başarılı olursa:
- 5 kişilik testte en az 4 kişi yardım almadan, 3 dakika içinde istenen bir adıma ulaşır, belgenin tam metnini açar ve kaynağını söyleyebilir.
- Her olay en az bir kaynağa bağlıdır.

Kapsam dışı: yorum, değerlendirme ve telifli içerik.

**B1 · Kararlar ve ödünleşimler** `0:45`
1. **İki kaynak kuralı.** *Seçtim:* Her tarih ve yerin en az iki bağımsız kaynakla doğrulanmasını; çelişen kayıt siteye girmiyor. Devlet kurumlarının yayınları (TBMM, MSB, ATAM) tek başına yetiyor. Vikipedi en fazla ikinci kaynak olabiliyor; bir Vikipedi maddesi diğer kaynağı dayanak gösteriyorsa ikisi bağımsız sayılmıyor. *Vazgeçtim:* Hızlı ve geniş kapsamdan. *Çünkü:* Bu konuda tek bir yanlış tarih bütün sitenin güvenini götürür. *Bedeli:* Bilinen olayların bir kısmı siteye giremedi; en kapsamlı hazır liste olan Vikipedi kronolojisi kaynaksız olduğu için tek başına hiçbir kaydı doğrulayamadı.
2. **Telifli içerik yok, transkripsiyon da yok.** *Seçtim:* Yalnızca aslı Latin harfli belgelerin tam metnini, birebir göstermeyi. *Vazgeçtim:* Arap harfli belgelerin yayımlanmış transkripsiyonlarından; bunlar telifli sayılıyor. *Çünkü:* Kişisel bir proje de olsa yasal riski sıfırlamak istedim. *Bedeli:* Harf İnkılabı öncesi belgeler tam metinsiz, yalnızca künye kartı (tarih, yer, gönderen, alıcı) olarak görünüyor.

**B2 · Sonuç** `0:15`
ATAMap yayında: 721 olay, 217 belge, 171 seyahat, 113 yer ve 398 kaynak; hepsi tek ekranlık bir haritada, dönem sınırlarıyla. 27 Ekim – 18 Kasım 2026 arasında 110 commit. Şimdiye kadar yalnızca 1 kişiye gösterdim ve beğendi; bu bir sonuç değil, bir başlangıç. Sıradaki adım SPEC'teki 5 kişilik test.

**B3 · Öğrendiklerim** `0:15`
- **Veri, arayüzden uzun sürer.** Zamanın çoğu kod yazmaya değil, kaynak taramaya ve çelişkileri çözmeye gitti.
- **Kural koymak karar yükünü azaltır.** "İki kaynak" kuralı sayesinde her kayıt için yeniden düşünmem gerekmedi.
- **Bir kişinin "beğendim"i test değil.** Kullanılabilirlik testini yayından önce yapardım.

#### EN

**Subtitle:** 1881–1938, one map, *step* by step

**A1 · Problem** `0:20`
I admire Atatürk and wanted to follow his life as a whole, or at least his journey. Timelines give dates but not places; maps show a single period. There was no way to see 57 years, from Thessaloniki to Samsun, from Sakarya to his tours of the country, in one place and within the borders of the time. On top of that, a lot of unsourced and contradictory information about Atatürk circulates online.

**A2 · Users** `0:15`
A curious adult with no prior knowledge. Not studying, exploring: they pick a year and ask "where was he then, what did he write?" They should be able to see where every piece of information comes from; in this product, trust is the feature.

**A3 · Goal** `0:15`
If it works:
- In a 5-person test, at least 4 reach a given step unaided within 3 minutes, open the document's full text and can name its source.
- Every event links to at least one source.

Out of scope: commentary, judgement and copyrighted content.

**B1 · Decisions and trade-offs** `0:50`
1. **The two-source rule.** *Chose:* every date and place is confirmed by at least two independent sources; conflicting records stay off the site. Publications of state institutions (the Turkish parliament, the Ministry of Defence, the Atatürk Research Center) count on their own. Wikipedia can be the second source at most, and if a Wikipedia article cites the other source, the two aren't independent. *Passed on:* speed and breadth. *Because:* on this subject, a single wrong date costs the whole site its trust. *Cost:* some well-known events didn't make it in; the most complete ready-made list, Wikipedia's timeline, is itself unsourced, so it couldn't confirm anything alone.
2. **No copyrighted content, no transcriptions.** *Chose:* showing full text only for documents originally written in Latin script, verbatim. *Passed on:* published transcriptions of Arabic-script documents, which count as copyrighted. *Because:* even in a personal project, I wanted zero legal risk. *Cost:* documents from before the 1928 alphabet reform appear without full text, only as a reference card (date, place, sender, recipient).

**B2 · Outcome** `0:20`
ATAMap is live: 721 events, 217 documents, 171 journeys, 113 places and 398 sources, all on a single-screen map with period borders. 110 commits between 27 October and 18 November 2026. So far I've shown it to one person, who liked it; that's a starting point, not an outcome. Next step: the 5-person test from the spec.

**B3 · What I learned** `0:15`
- **Data takes longer than the interface.** Most of the time went into searching sources and resolving conflicts, not code.
- **Rules reduce decision load.** With the two-source rule, I didn't have to rethink every record.
- **One person's "I like it" isn't a test.** I'd run the usability test before launch.

**Liner notes / Künye:** Preact + TypeScript + Vite · d3-geo + SVG · Vercel · Veri / Data: Natural Earth (kamu malı / public domain), CShapes 2.0 (CC BY-NC-SA 4.0), TBMM, MSB, ATAM

---

### GK-05 · İklim Krizi · IDD ORG

- **Alt başlık:** Soyut bir krizi *gündelik* örneklerle anlatmak · EN: Explaining an abstract crisis through *everyday* examples
- **Künye:** 2026 · Product, tasarım, kod · Gönüllü dernek, teknoloji ekibi
- **Linkler:** [iklimkrizi.vercel.app](https://iklimkrizi.vercel.app) · [github.com/Gurcank/project_IDD](https://github.com/Gurcank/project_IDD)
- **Toplam süre / Total:** TR 1:55 · EN 2:15

#### TR

**A1 · Problem** `0:15`
Gönüllüsü olduğum İklim Değişmeden Değiş derneği (IDD ORG), teknoloji ekibinden sitesi için bir proje istedi. O sırada izlediğim *Breaking Boundaries* belgeselinden etkilenmiştim. İklim krizi çoğu zaman sıcaklık eğrileri ve uzun raporlarla anlatılıyor; rakamlar doğru ama okurun gündelik hayatına değmiyor. "1,5 derece" bir şey ifade etmiyorsa kriz de uzak kalıyor.

**A2 · Kullanıcı** `0:10`
Birincil: derneğin sitesine gelen, iklim konusunda uzman olmayan Türk okur. Krizi anlamak istiyor ama rapor okumayacak; neden önemli olduğunu kendi hayatından bir örnekle görmesi gerekiyor.
İkincil: dernek ekibi. Sayfayı kendi sitelerinde, kendi araçlarıyla yaşatabilmeli.

**A3 · Hedef** `0:10`
Başarılı olursa:
- Okur sayfayı bitirdiğinde sıcaklık artışı, deniz seviyesi, yangınlar ve emisyonlar arasındaki bağı ve atabileceği adımları bilir.
- Ekip sayfayı yardım almadan siteye ekleyebilir.

Kapsam dışı: bağış ve form.

**B1 · Kararlar ve ödünleşimler** `0:50`
1. **Rapor yerine belgesel akışı.** *Seçtim:* Scroll ile ilerleyen bir anlatı: buzul videosuyla açılış, NASA ve Türkiye çevre göstergeleri verileriyle animasyonlu sayaçlar, grafikler ve haritalar, sonunda çözüm adımları. *Vazgeçtim:* Verileri tablo ve metin olarak vermekten. *Çünkü:* Amaç bilgi vermek değil, anlamayı sağlamaktı; her rakamı okurun hayatından bir örnekle eşledim. *Bedeli:* Video ve animasyon sayfayı ağırlaştırdı; bu yüzden hareket azaltma ve JS'siz içerik ekledim.
2. **Mevcut siteye uyum, build adımı yok.** *Seçtim:* Sayfayı derneğin Laravel sitesinin şablonunu genişleterek yazmayı; siteye eklemek dört küçük değişiklik. *Vazgeçtim:* Ayrı bir modern framework ile bağımsız bir sayfadan. *Çünkü:* Gönüllü bir ekipte sayfa, beni beklemeden yaşayabilmeli. *Bedeli:* Modern araçların kolaylıkları olmadan, tek bir JS ve CSS dosyasıyla çalışmak.
3. **Her görsel lisanslı ve künyeli.** *Seçtim:* Yalnızca açık lisanslı görseller; her görselin köşesindeki düğme kaynağını ve lisansını açıyor. *Vazgeçtim:* Daha çarpıcı ama lisansı belirsiz görsellerden. *Çünkü:* İklim gibi bir konuda derneğin güvenilirliği, gösterdiği her şeyin kaynağına bağlı. *Bedeli:* Görsel seçenekleri daraldı.

**B2 · Sonuç** `0:15`
Sayfa iklimkrizi.vercel.app'te önizleme olarak yayında ve derneğin sitesine eklenmeye hazır. Haziran–Ekim 2026 arasında 43 commit. Okur tarafında ölçüm yapmadım; ilk ölçeceğim şey, gelenlerin kaçının çözüm adımlarına kadar indiği. Bilinen bir eksik var: videolar için görünür bir durdur düğmesi yok.

**B3 · Öğrendiklerim** `0:15`
- **Brief'i kendim yazdım.** "Bir şey yap" gibi açık bir istek, problemi önce tanımlamamı gerektirdi.
- **Başkasının sisteminde çalışmak ayrı bir beceri.** En iyi araç değil, ekibin devralabileceği araç doğru seçimdi.
- **Animasyon bir maliyet.** Her hareketin erişilebilirlik karşılığını da yazmak gerekiyor.

#### EN

**A1 · Problem** `0:20`
İklim Değişmeden Değiş (IDD ORG), the climate NGO I volunteer for, asked its tech team for a project for its website. I had just watched the documentary *Breaking Boundaries* and it stayed with me. The climate crisis is usually told through temperature curves and long reports; the numbers are right, but they don't touch the reader's daily life. If "1.5 degrees" means nothing to you, the crisis stays far away.

**A2 · Users** `0:15`
Primary: Turkish readers visiting the NGO's site who aren't climate experts. They want to understand the crisis but won't read a report; they need to see why it matters through an example from their own lives.
Secondary: the NGO team, who must be able to keep the page alive on their own site with their own tools.

**A3 · Goal** `0:10`
If it works:
- By the end, readers understand how warming, sea level, wildfires and emissions connect, and what they can do.
- The team can add the page to their site without help.

Out of scope: donations and forms.

**B1 · Decisions and trade-offs** `1:00`
1. **A documentary flow instead of a report.** *Chose:* a scroll-driven story: it opens on a glacier video, moves through animated counters, charts and maps built on NASA and Turkish environmental indicator data, and ends with steps readers can take. *Passed on:* presenting the data as tables and text. *Because:* the goal was understanding, not information; I paired every number with an example from the reader's life. *Cost:* video and animation made the page heavy, so I added reduced-motion support and content that works without JavaScript.
2. **Fit the existing site, no build step.** *Chose:* writing the page as an extension of the NGO's Laravel template; adding it to the site takes four small changes. *Passed on:* a standalone page on a modern framework. *Because:* in a volunteer team, the page has to live without waiting for me. *Cost:* no modern tooling, just one JS file and one CSS file.
3. **Every image licensed and credited.** *Chose:* openly licensed images only; a button in each image's corner shows its source and licence. *Passed on:* more striking images with unclear licences. *Because:* on a topic like climate, an NGO's credibility depends on the source of everything it shows. *Cost:* fewer images to choose from.

**B2 · Outcome** `0:15`
The page is live as a preview at iklimkrizi.vercel.app and ready to be added to the NGO's site. 43 commits between June and October 2026. I haven't measured readers; the first thing I'd measure is how many scroll all the way to the action steps. One known gap: there's no visible pause button for the videos.

**B3 · What I learned** `0:15`
- **I wrote the brief myself.** An open request like "make something" made me define the problem first.
- **Working inside someone else's system is its own skill.** The right tool wasn't the best one, but the one the team could take over.
- **Animation has a cost.** Every movement needs its accessibility counterpart.

**Liner notes / Künye:** HTML · CSS · JavaScript · Laravel Blade · GSAP · Lenis · Veri / Data: NASA, Türkiye çevre göstergeleri / Turkish environmental indicators · Ana site / Main site: IDD ORG teknoloji ekibi / tech team

---

### GK-06 · Nature & Sport Handbook

- **Alt başlık:** Ekranda bir *saha defteri* · EN: A field *notebook* on screen
- **Künye:** 2026 · Product, tasarım, kod · Solo
- **Linkler:** [naturesporthandbook.vercel.app](https://naturesporthandbook.vercel.app) · [github.com/Gurcank/project_NatureSportHandbook](https://github.com/Gurcank/project_NatureSportHandbook)
- **Toplam süre / Total:** TR 1:50 · EN 1:55

#### TR

**A1 · Problem** `0:20`
Doğayı severim ve yürüyüşte gördüğüm şeyleri tanımak isterim. Bu projede iki şeyi sınamak istedim: görsel olarak ne kadar iyi bir iş çıkarabileceğimi ve ekranda gerçek bir el kitabının ne kadar karşılığını kurabileceğimi. Dijital doğa kaynakları ya ansiklopedi kadar uzun ya da kuru bir katalog. Arazide işe yarayan ise kısa, akılda kalıcı ve doğru bilgi.

**A2 · Kullanıcı** `0:10`
Birincil: yürüyüşe, kampa ya da doğa sporuna çıkan meraklı. Gördüğü kuşa, mantara ya da taşa bakıp birkaç akılda kalıcı bilgi istiyor; uzun bir makale okumayacak.
İlk kullanıcısı benim.

**A3 · Hedef** `0:10`
- Her kayıt bir bakışta okunur.
- Görseller gerçek ve kaynaklıdır.
- Site gerçek bir saha defteri gibi hissettirir.

Kapsam dışı: fotoğraftan tür tanıma ve kullanıcı katkısı.

**B1 · Kararlar ve ödünleşimler** `0:45`
1. **El yazısı rehber hissi.** *Seçtim:* Saha defteri estetiğini: el yazısı başlıklar, not kâğıdı dokusu, kısa notlar. *Vazgeçtim:* Sıradan bir katalog ve kart ızgarasından. *Çünkü:* Projenin bir amacı görsel becerimi sınamaktı; his, içeriğin kendisi kadar önemliydi. *Bedeli:* El yazısı uzun metinde okunurluğu düşürüyor; gövde metni sade bir yazıyla kaldı.
2. **Gerçekçi bir el kitabı.** *Seçtim:* Bilgiyi gerçek dünyadaki fiziksel koşullara göre düzenlemeyi: nerede, hangi mevsimde görülür, neye dikkat edilir. *Vazgeçtim:* Eğlenceli ama arazide işe yaramayan "ilginç bilgi" listelerinden. *Çünkü:* El kitabı, kullanıldığı yerde işe yaradığı ölçüde değerli. *Bedeli:* Her kayıt için daha çok araştırma.
3. **Her görsel kredili.** *Seçtim:* Yalnızca açık lisanslı ve kamu malı görselleri; 558 görselin her birinin kaynağı ve lisansı kayıtlı. *Vazgeçtim:* Daha çarpıcı ama lisansı belirsiz görsellerden. *Çünkü:* Yayımladığım her şeyin kaynağını gösterebilmek istedim. *Bedeli:* Bazı türler için uygun görsel bulunamadı.

**B2 · Sonuç** `0:10`
Yayında, Türkçe ve İngilizce: hayvan, bitki, mantar, taş ve dört doğa sporu bölümü. Temmuz–Eylül 2026 arasında 17 commit. Şimdilik kendim kullanıyorum ve kullanımı ölçmedim.

**B3 · Öğrendiklerim** `0:15`
- **Estetik bir hedef de ölçülebilir olmalı.** "Güzel olsun" yerine "bir bakışta okunsun" gibi bir ölçüt koyardım.
- **Lisans işi içerik işi kadar uzun sürüyor.** 558 görselin kaynağını tek tek kaydetmek ayrı bir iş akışı istedi.
- **Statik içerik basitlik getirir ama her düzeltme bir deploy demek.**

#### EN

**Subtitle:** A field *notebook* on screen

**A1 · Problem** `0:20`
I love nature and like to know what I'm looking at on a hike. With this project I wanted to test two things: how good I could make something look, and how close a screen could get to a real handbook. Digital nature resources tend to be either encyclopedia-long or a dry catalogue. What works outdoors is short, memorable and accurate.

**A2 · Users** `0:10`
Primary: curious people out hiking, camping or doing outdoor sports. They look at a bird, a mushroom or a stone and want a few memorable facts; they won't read a long article.
The first user is me.

**A3 · Goal** `0:10`
- Every entry reads at a glance.
- Images are real and sourced.
- The site feels like a real field notebook.

Out of scope: identifying species from photos, user contributions.

**B1 · Decisions and trade-offs** `0:50`
1. **A handwritten field-guide feel.** *Chose:* a field-notebook look: handwritten headings, notepaper texture, short notes. *Passed on:* a standard catalogue with a card grid. *Because:* one goal was to test my visual craft; the feel mattered as much as the content. *Cost:* handwriting hurts readability in long text, so body copy stayed in a plain typeface.
2. **A realistic handbook.** *Chose:* organising information around real-world physical conditions: where and in which season you'll see it, what to watch out for. *Passed on:* fun "did you know" lists that don't help outdoors. *Because:* a handbook is only as valuable as it is useful where it's used. *Cost:* more research per entry.
3. **Every image credited.** *Chose:* openly licensed and public-domain images only; the source and licence of all 558 are recorded. *Passed on:* more striking images with unclear licences. *Because:* I wanted to be able to source everything I publish. *Cost:* no suitable image could be found for some species.

**B2 · Outcome** `0:10`
Live in Turkish and English: animals, plants, mushrooms, stones and four outdoor sports. 17 commits between July and September 2026. For now I'm the one using it, and I haven't measured usage.

**B3 · What I learned** `0:15`
- **An aesthetic goal needs a measure too.** Instead of "make it beautiful", I'd set something like "readable at a glance".
- **Licensing takes as long as content.** Recording the source of 558 images needed its own workflow.
- **Static content keeps things simple, but every fix is a deploy.**

**Liner notes / Künye:** Next.js · TypeScript · Vitest · Vercel · Görseller / Images: açık lisanslı ve kamu malı kaynaklar / openly licensed and public-domain sources (558, kredi listesi sitede / credits on the site)

---

### GK-07 · IDDDergi

- **Alt başlık:** Bir PDF'e *dergi* hissi vermek · EN: Giving a PDF the feel of a *magazine*
- **Künye:** 2026 · Product, kod · Gönüllü dernek, teknoloji ekibi
- **Linkler:** canlı adres açık madde (§10) · [github.com/Gurcank/project_IDDDergi](https://github.com/Gurcank/project_IDDDergi)
- **Toplam süre / Total:** TR 1:10 · EN 1:30

#### TR

**A1 · Problem** `0:15`
IDD ORG, COP31 Türkiye için hazırladığı "Shaping the Future of Climate" dergisini sitesinde yayımlamak istedi. Elde bir PDF vardı. Onu bir indirme linki olarak koymak en kolayıydı, ama indirilen dosya çoğu zaman açılmadan kalıyor; telefonda ise yakınlaştırıp kaydırarak okumak zahmetli. Emek verilmiş bir derginin bir dosya linkinden fazlasını hak ettiğini düşündüm.

**A2 · Kullanıcı** `0:10`
Birincil: derneğin sitesine çoğunlukla telefondan gelen okur. Dergiye göz atmak istiyor; bir dosya indirmek ya da yönetmek istemiyor.
İkincil: dernek ekibi. Yeni bir sayıyı kolayca ekleyebilmeli.

**A3 · Hedef** `0:05`
- Dergi sitede, indirmeden okunur.
- Sayfa çevirmek basılı dergi hissi verir.
- Telefonda sayfa yakınlaştırılabilir.

Kapsam dışı: derginin içeriği ve tasarımı (dernek hazırladı).

**B1 · Kararlar ve ödünleşimler** `0:25`
1. **PDF linki yerine flipbook.** *Seçtim:* Sayfaları çevrilen, yakınlaştırılabilen bir görüntüleyici. *Vazgeçtim:* Düz PDF linkinden ve tarayıcının kendi PDF görüntüleyicisinden. *Çünkü:* Okur bir dosyayla değil, bir dergiyle karşılaşmalı. *Bedeli:* Daha fazla kod ve ağırlık; hareket azaltma açıkken sayfa çevirme animasyonu kapanıyor.
2. **Sayfaları önceden görsele çevirmek.** *Seçtim:* PDF'i derleme sırasında sayfa görsellerine çeviren bir script; tarayıcı yalnızca görsel indiriyor. *Vazgeçtim:* PDF'i tarayıcıda canlı çizmekten. *Çünkü:* Telefonda hızlı açılış. *Bedeli:* Her yeni sayı için script'in yeniden çalıştırılması gerekiyor.

**B2 · Sonuç** `0:05`
Görüntüleyici derneğin sitesinde canlı. Ağustos 2026'da 4 günde, 4 commit'le bitti: kısa ve kapsamı net bir iş. Okunma verisine sahip değilim.

**B3 · Öğrendiklerim** `0:10`
- **Küçük işte de "neden" diye sormak işe yarıyor.** İstek "PDF'i koy"du, ihtiyaç ise "dergiyi okut".
- **Dar kapsam hız getiriyor.** Görüntüleyiciden başka hiçbir şeye dokunmadım.

#### EN

**A1 · Problem** `0:20`
IDD ORG wanted to publish "Shaping the Future of Climate", the magazine it produced for COP31 Türkiye, on its website. What existed was a PDF. A download link was the easy option, but downloaded files often go unopened, and reading by pinching and scrolling on a phone is a chore. A magazine people had worked hard on deserved more than a file link.

**A2 · Users** `0:10`
Primary: visitors to the NGO's site, mostly on phones. They want to browse the magazine, not download or manage a file.
Secondary: the NGO team, who should be able to add a new issue easily.

**A3 · Goal** `0:10`
- The magazine reads on the site, no download.
- Turning pages feels like a printed magazine.
- Pages can be zoomed on a phone.

Out of scope: the magazine's content and design (made by the NGO).

**B1 · Decisions and trade-offs** `0:30`
1. **A flipbook instead of a PDF link.** *Chose:* a viewer with turnable, zoomable pages. *Passed on:* a plain PDF link or the browser's own PDF viewer. *Because:* readers should meet a magazine, not a file. *Cost:* more code and weight; with reduced motion on, the page-turn animation is switched off.
2. **Pre-rendering pages as images.** *Chose:* a script that turns the PDF into page images at build time, so the browser only downloads images. *Passed on:* rendering the PDF live in the browser. *Because:* fast loading on phones. *Cost:* the script has to be re-run for every new issue.

**B2 · Outcome** `0:10`
The viewer is live on the NGO's site. It took 4 days and 4 commits in August 2026: a short job with a clear scope. I don't have readership data.

**B3 · What I learned** `0:10`
- **Asking "why" pays off on small jobs too.** The request was "upload the PDF"; the need was "get the magazine read".
- **Narrow scope brings speed.** I touched nothing but the viewer.

**Liner notes / Künye:** Next.js · React · TypeScript · Tailwind CSS · react-pageflip · react-zoom-pan-pinch · Dergi içeriği / Magazine content: IDD ORG

---

## 4. Hero ve intro

| | TR | EN |
|---|---|---|
| İsim | Gürcan Karadağ | Gürcan Karadağ |
| Rol cümlesi | Dağınık bilgiyi *dokunulabilir* ürünlere çeviriyorum. | I turn scattered information into *tangible* products. |
| Mono etiket | `PRODUCT MANAGER ADAYI · İSTANBUL · ● ŞUBAT 2027'DEN İTİBAREN MÜSAİT` | `ASPIRING PRODUCT MANAGER · ISTANBUL · ● AVAILABLE FROM FEB 2027` |
| Birincil CTA | Bana yaz | Get in touch |
| İkincil CTA | İşlere bak | See the work |
| Ben kimim, 1 (V3, avatarın yanında; kullanıcı onayı 2026-11-27) | Ben Gürcan. Şu an Erasmus+ ile Łódź'dayım; Şubat 2027'de İstanbul'a dönüp ürün yönetiminde çalışmak istiyorum. | I'm Gürcan. I'm in Łódź on Erasmus+ until February 2027, then back in Istanbul to work in product management. |
| Ben kimim, 2 | Doğa yürüyüşleri, psikoloji, sinema ve müzik: ürünlere bakışım buradan geliyor. | Hiking, psychology, film and music: that's where my eye for products comes from. |
| Çalışma masası: ticket | GRCN-1 · Product stajyeri bul · In review | GRCN-1 · Find a product intern · In review |
| Çalışma masası: bildirim | Vercel · Deployment ready | Vercel · Deployment ready |
| Çalışma masası: imleç etiketi | Claude | Claude |
| Intro kelimeleri | Harita. Belgesel. El kitabı. | A map. A documentary. A handbook. |
| Intro kapanışı | Hepsi birer ürün. | Each one a product. |
| Intro atlama | Geçmek için herhangi bir yere tıkla | Click anywhere to skip |

Marka adları yalnız metin olarak yazılır, logo kullanılmaz (ARCHITECTURE ADR-16).

## 5. Bölüm başlıkları ve Ürün ilkelerim

| Bölüm | TR | EN |
|---|---|---|
| Seçili işler | Rafımdaki *yedi* kaset | Seven *tapes* on my shelf |
| Ürün ilkelerim | Nasıl *karar* veririm | How I *decide* |
| Hakkımda | Hakkımda | About |
| Bu site nasıl yapıldı | Bu site nasıl yapıldı | How this site was made |
| İletişim | Bir *mesaj* uzağındayım | One *message* away |

**Açılış ekranı (INS-18):**
- TR: Ne yaptığımdan çok, nasıl karar verdiğim anlatır beni.
- EN: How I decide says more than what I built.

**İlkeler** ("Şu olduğunda → şunu yaparım", her biri bir kasete bağlı chip). v3 (2026-11-28): kullanıcının dokuz ilkesi, kendi sırasıyla (sorunu çözmek, güvenlik, kanıtlanabilirlik, güvenilirlik, yasal, somutlaştırmak, kolaylaştırmak, güzelleştirmek, takım içi uyum); her biri o kasetin case study'sindeki bir karara dayanır. Commit öncesi kullanıcı onayına sunuldu.

| # | İlke | TR | EN | Kaset |
|---|---|---|---|---|
| 1 | Sorunu çözmek | **Bir şey yapmaya başlamadan önce →** kimin hangi sorununu çözdüğünü tek cümleyle yazarım; yazamıyorsam başlamam. | **Before I start building anything →** I write down whose problem it solves, in one sentence. If I can't, I don't start. | GK-03 SeeYourNextStep |
| 2 | Güvenlik | **Kullanıcının verisi işin içine girdiğinde →** yalnızca gerekeni tutarım; şifre ve fotoğraf saklamamak riski baştan siler. | **When users' data is involved →** I keep only what's needed. Not storing passwords or photos removes the risk from the start. | GK-01 ErasmusMap |
| 3 | Kanıtlanabilirlik | **Güven ürünün kendisi olduğunda →** kaynağını gösteremediğimi yayımlamam, kapsam küçülse bile. | **When trust is the product →** I don't ship what I can't source, even if scope shrinks. | GK-04 ATAMap |
| 4 | Güvenilirlik | **Temel sağlam değilken yeni özellik istendiğinde →** önce temeli onarırım; çatlağın üstüne kat çıkılmaz. | **When new features are asked for on a shaky base →** I fix the base first. You don't build on cracks. | GK-02 Novera |
| 5 | Yasal | **Bir görsel ya da veri kullanacağımda →** lisansını ve kaynağını kayda geçirmeden yayımlamam; çarpıcı ama belirsiz olanı seçmem. | **When I use an image or a dataset →** I don't publish it until its licence and source are on record. I pass on striking but unclear ones. | GK-06 Nature & Sport |
| 6 | Somutlaştırmak | **Konu soyut ve uzak kaldığında →** onu görülebilir kılarım: rapor yerine belgesel, rakam yerine okurun hayatından bir örnek. | **When a subject stays abstract and distant →** I make it visible: a documentary instead of a report, an example from the reader's life instead of a number. | GK-05 İklim Krizi |
| 7 | Kolaylaştırmak | **Bir şeyi kullanmak zahmetli olduğunda →** zahmeti ben üstlenirim: indirilecek bir PDF değil, telefonda sayfa sayfa okunan bir dergi. | **When something takes effort to use →** I take the effort on myself: not a PDF to download, but a magazine you page through on your phone. | GK-07 IDDDergi |
| 8 | Güzelleştirmek | **Bir şey doğru çalıştığında →** orada durmam, güzelleştiririm; özenli görünen bir rehbere insan daha çok güvenir. | **When something already works →** I don't stop there; I make it beautiful. People trust a guide that looks cared for. | GK-06 Nature & Sport |
| 9 | Takım içi uyum | **Bir ekiple aynı ürünü yaptığımızda →** tek bir yazılı kaynaktan çalışırız; kararlar sohbette değil, belgede ve PR'da kalır. | **When a team builds one product together →** We work from one written source. Decisions live in the doc and the PR, not in chat. | GK-02 Novera |

## 6. Hakkımda ve Hedeflerim

**Hakkımda** — [chip] = ilgili case study'yi açan proje chip'i (INS-05).

TR (~95 kelime):
> Ben Gürcan. İstanbul Okan Üniversitesi'nde Bilişim Sistemleri ve Teknolojileri son sınıftayım; bu dönem Erasmus+ ile Łódź'dayım. Ürün tarafına bir soruyla geldim: hangi rol bana uygun? Cevabı bulmak için yedi rolün yolunu çizdim [SeeYourNextStep] ve Product Manager'da karar kıldım. O günden beri dağınık bilgiyi dokunulabilir ürünlere çeviriyorum: Erasmus şehirleri için bir harita [ErasmusMap], Atatürk'ün yolculuğu için bir başkası [ATAMap], bir iklim belgeseli [İklim Krizi]. Tasarlıyor ve kodluyorum, çünkü bir ürünü uçtan uca anlamanın en kısa yolu bu. Yürüyüşte değilsem muhtemelen film izliyorumdur.

EN (~95 words):
> I'm Gürcan, a final-year Information Systems student at Istanbul Okan University, currently on Erasmus+ in Łódź. I came to product with a question: which role fits me? To answer it, I mapped the path of seven roles [SeeYourNextStep] and landed on Product Manager. Since then I've been turning scattered information into tangible products: a map for Erasmus cities [ErasmusMap], another for Atatürk's journeys [ATAMap], a climate documentary [İklim Krizi]. I design and code because it's the shortest way to understand a product end to end. If I'm not hiking, I'm probably watching a film.

**Künye satırı (mono, Hakkımda altı):**
- TR: `OKAN ÜNİVERSİTESİ · BİLİŞİM SİSTEMLERİ VE TEKNOLOJİLERİ · 2023 – HAZİRAN 2027 · ERASMUS+ ŁÓDŹ, EKİM 2026 – ŞUBAT 2027`
- EN: `OKAN UNIVERSITY · INFORMATION SYSTEMS · 2023 – JUNE 2027 · ERASMUS+ ŁÓDŹ, OCT 2026 – FEB 2027`

**Hedeflerim**

TR:
> Şubat 2027'den itibaren İstanbul'da tam zamanlı, uzun dönem bir Product stajı arıyorum; yaz boyunca kesintisiz devam edebilirim. Bir ürün ekibinde kullanıcıyla konuşmayı, önceliklendirmeyi ve karar vermeyi gerçek sonuçlarla öğrenmek istiyorum. Uzun vadede hedefim, kullanıcısı olan bir ürünün PM'i olmak.

EN:
> From February 2027 I'm looking for a full-time, long-term product internship in Istanbul, and I can continue through the summer. I want to learn user conversations, prioritisation and decision-making against real outcomes. Longer term: PM of a product people actually use.

**Beceriler / Skills** (Hedeflerim altında; CV'den, telefon hariç; kullanıcı onayı 2026-11-27)

| TR | EN |
|---|---|
| **Ürün ve tasarım:** Ürün tasarımı, UX/UI tasarımı, responsive web tasarımı, gereksinim analizi, teknik dokümantasyon | **Product & design:** Product design, UX/UI design, responsive web design, requirements analysis, technical documentation |
| **Ürün ve proje yönetimi:** Ürün yönetimi, proje yönetimi, Agile, Scrum, Jira | **Product & project management:** Product management, project management, Agile, Scrum, Jira |
| **Yazılım:** HTML, CSS, JavaScript, TypeScript, React, Next.js, SQL, veritabanı tasarımı | **Software:** HTML, CSS, JavaScript, TypeScript, React, Next.js, SQL, database design |
| **Dil:** İngilizce (B2) | **Language:** English (B2) |

**Krediler, yeni grup** (v3, commit öncesi onaya sunuldu 2026-11-28): Tablolar / Paintings.

**GitHub** (v3 R6, Araçlar'ın üstünde; build sırasında GitHub'ın herkese açık takviminden; commit öncesi onaya sunuldu 2026-11-28): başlık "GitHub" · TR "Son bir yılda {count} katkı" · EN "{count} contributions in the last year". GitHub'a ulaşılamazsa bölüm görünmez.

**Araçlar / Tools** (V6, Beceriler altında, logolu; kullanıcı onayı 2026-11-27): Jira, Figma, Miro, React, Next.js, TypeScript, Supabase, Vercel, Claude. Logolar Simple Icons'tan (CC0), tek renk. v4: kartlar her uygulamanın arayüz diliyle (Jira iş tipi karesi, Figma seçim tutamaçları, Miro yapışkan not, Vercel "ready" noktası, Claude imleç etiketi); ≥ 1024'te dağınık, düğme TR "Toparla" · EN "Tidy up" (kullanıcı onayı 2026-11-28).

## 7. Bu site nasıl yapıldı

> Yayından önce gerçek akışa göre güncellenir (S-son). **D5 notu:** "koddan üretilen pixel nesneler" bir kararı anlatıyor; nesneler D7–D8'de gelecek, metin bu yüzden S-son'da yeniden okunmalı (kullanıcı birebir taşımayı onayladı, 2026-11-22). Krediler listesi (fontlar, Atatürk fotoğrafı kaynağı, asset paketleri, AI görselleri) `content/credits.yaml`'da tutulur ve D5'te bu bölümün altında gösterilir (ROADMAP).

TR (~140 kelime):
> Bu site de bir ürün gibi yapıldı. Önce bir SPEC yazdım: kim bakacak, 30 saniyede ne görmeli, başarıyı nasıl ölçeceğim. Sonra 9 portfolyo sitesini inceleyip 29 fikri bir havuza koydum ve tek bir konsepte indirdim: odamdaki raf, rafta yedi kaset. Kod, tasarım ve metin, Claude ile birlikte çalıştığım fazlı bir akışta ilerledi. Her faz bir dokümanla bitti, her karar gerekçesiyle yazıldı. Vazgeçtiklerim de karar: telifli film posteri ve albüm kapağı kullanmadım; illüstre bir oda sahnesi yerine koddan üretilen pixel nesneler seçtim; kilim temasını turistik durma riski yüzünden bıraktım. Sonra siteyi baştan düşündüm: gün ışığından geceye akan renkler, pixel art bir oda ve fotoğrafımdan kodla çizilen bir avatar. Kullandığım her font, fotoğraf ve görselin kaynağı aşağıda.
>
> *v2 cümlesi ("Sonra siteyi baştan düşündüm…") V9'da eklendi (2026-11-27); v3'te çark kalkınca "pixel art bir oda" oldu (kullanıcı onayı 2026-11-28).*

EN (~140 words):
> This site was built like a product. I started with a spec: who visits, what they should see in 30 seconds, how I'd measure success. Then I studied 9 portfolio sites, pooled 29 ideas and narrowed them to one concept: a shelf in my room holding seven tapes. Code, design and copy moved through a phased workflow with Claude; each phase ended in a document, each decision came with a reason. What I dropped counts too: no copyrighted posters or album covers, code-generated pixel objects instead of an illustrated room, no kilim theme, which risked looking touristy. Then I rethought it: colours that run from daylight to night, a pixel-art room, and an avatar drawn in code from my photo. Every font, photo and image is credited below.

## 8. Mikro metinler

| Yer | TR | EN |
|---|---|---|
| Nav | Seçili işler · İlkeler · Hakkımda · Site · İletişim | Work · Principles · About · Site · Contact |
| Dil geçişi | EN | TR |
| Kaset imleç pill'i (dekoratif) | ▶ Aç | ▶ Play |
| Kaset butonu (erişilebilir ad) | {Proje} case study'sini aç | Open the {Project} case study |
| ↳ D2 uygulaması | {Proje} yerine sırtta görünen "{katalog} {Proje}" okunur: "GK-04 ATAMap case study'sini aç" (WCAG 2.5.3: görünen metin erişilebilir adın parçası olmalı) | "Open the GK-04 ATAMap case study" |
| Overlay | A yüzü · B yüzü · Kapat (Esc) · {m:ss} okuma | Side A · Side B · Close (Esc) · {m:ss} read |
| Overlay linkleri | Canlı site · Kaynak kod | Live site · Source code |
| Overlay sonu | Sıradaki kaset: {Proje} · Rafa dön | Next tape: {Project} · Back to the shelf |
| Bölüm göstergesi | Şu an: {bölüm} | Now: {section} |
| J-card menü | İçindekiler | Contents |
| Dock (ekran okuyucu adı; V2, kullanıcı onayı 2026-11-27) | Bölümler | Sections |
| Dock yin-yang bağlantısı | Başa dön | Back to top |
| Dock, hero'dayken bölüm adı (v3, kullanıcı onayı 2026-11-28) | Giriş | Intro |
| Saat düğmesi (ekran okuyucu adı; görünen saatten sonra okunur, WCAG 2.5.3: "İST 19:24 · Yerel saat: İstanbul ve Łódź") | Yerel saat: İstanbul ve Łódź | Local time: Istanbul and Łódź |
| Saat düğmesinin görünen hali | İST {ss:dd} | IST {hh:mm} |
| Saat paneli | İki şehrim · İstanbul · evim · Łódź · Erasmus+, Şubat 2027'ye kadar | My two cities · Istanbul · home · Łódź · Erasmus+, until February 2027 |
| Hareket kontrolü | Hareketi durdur · Hareketi başlat | Pause motion · Resume motion |
| Televizyon (erişilebilir ad; v4'te CD çaların yerine, kullanıcı onayı 2026-11-28) | Televizyon: bu ziyaretin önerisi | TV: this visit's pick |
| Televizyon açıkken önerinin başlığı (v4, kullanıcı onayı 2026-11-28) | Bu ziyaretin önerisi | This visit's pick |
| Walkman sonucu | ▶ {Ad} ({yıl}) · film / şarkı | ▶ {Title} ({year}) · film / song |
| ↳ D7 uygulaması | Şarkılarda {Ad} = "Sanatçı — Şarkı": "▶ Sade — Smooth Operator (1984) · şarkı" | "▶ Sade — Smooth Operator (1984) · song" |
| İletişim | E-postayı kopyala · Kopyalandı · LinkedIn · GitHub | Copy email · Copied · LinkedIn · GitHub |
| Boş durum (öneri listesi boş; v4, kullanıcı onayı 2026-11-28: artık "bir daha bas" yok, seçim yüklemede bir kez yapılıyor) | Bu akşam yayın yok. | Nothing on tonight. |
| Görsel yüklenemedi | Görsel yüklenemedi; anlatı aşağıda. | Image didn't load; the story's below. |
| 404 başlık | Bu kaset rafta yok. | This tape isn't on the shelf. |
| 404 metin | Sayfa taşınmış ya da hiç olmamış. | The page moved or never existed. |
| 404 buton | Rafa dön | Back to the shelf |
| Footer | © 2026 Gürcan Karadağ · İstanbul ile Łódź arasında bir yerde yapıldı. · Krediler | © 2026 Gürcan Karadağ · Made somewhere between Istanbul and Łódź. · Credits |
| İçeriğe geç linki (D1'de onaylandı) | İçeriğe geç | Skip to content |
| Pano reddi (D1'de onaylandı) | Kopyalanamadı; adresi seçip kopyala. | Couldn't copy; select the address instead. |
| Dil düğmesi erişilebilir adı (D1'de onaylandı; hedef dilde yazılır) | Switch to English | Türkçeye geç |
| Meta açıklama (D1'de onaylandı) | Gürcan Karadağ, Product Manager adayı. Dağınık bilgiyi dokunulabilir ürünlere çeviriyorum. Şubat 2027'den itibaren İstanbul'da müsait. | Gürcan Karadağ, aspiring Product Manager. I turn scattered information into tangible products. Available in Istanbul from Feb 2027. |
| Sayfa başlığı (D1; isim + §4 mono etiketindeki rol) | Gürcan Karadağ · Product Manager adayı | Gürcan Karadağ · Aspiring Product Manager |
| Overlay künye etiketleri (D2'de onaylandı) | Rol · Yıl · Ekip | Role · Year · Team |
| Tracklist adı, ekran okuyucu (D2'de onaylandı) | Parça listesi | Tracklist |
| Liner notes başlığı (D2'de onaylandı; TR sayfada `lang="en"`) | Liner notes | Liner notes |
| Kenar notları, Hakkımda (D4'te onaylandı; ATAMap'e not yok) | SeeYourNextStep yanında: ilk kullanıcısı bendim ↑ · ErasmusMap yanında: 1602 şehir; hepsini gezmedim (henüz) · son cümleden sonra: ikisi aynı anda olmuyor, denedim | I was its first user ↑ · 1,602 cities. Haven't visited them all (yet) · Can't do both at once. I tried. |
| Atatürk portresi altyazısı ve `alt` metni (D4'te onaylandı) | Mustafa Kemal Atatürk, 1922. Fotoğraf: Agence Meurisse · Kaynak: Bibliothèque nationale de France | Mustafa Kemal Atatürk, 1922. Photo: Agence Meurisse · Source: Bibliothèque nationale de France |
| Hedeflerim başlığı (D4; TR §6'dan, EN preview'da listelendi, merge onayıyla kabul edildi) | Hedeflerim | Goals |
| Bayrağın erişilebilir adı (D4; preview'da listelendi, merge onayıyla kabul edildi) | Türk bayrağı | Turkish flag |
| Krediler grup etiketleri (D5'te onaylandı) | Fontlar · Fotoğraf · Yapay zekâ | Fonts · Photo · AI |
| Kredi kullanım yerleri (D5'te onaylandı; v2 fontları 2026-11-27) | Bricolage Grotesque: Başlıklar ve kaset sırtları · Instrument Serif: Başlıktaki italik vurgu · Instrument Sans: Gövde metni · Fragment Mono: Etiketler ve süreler · Caveat: Kenar notları · Portre: Hakkımda'daki Atatürk portresi · Claude: Kod, tasarım ve metinde birlikte çalıştığım asistan | Headings and tape spines · Italic accent in headings · Body text · Labels and durations · Margin notes · Atatürk portrait in About · The assistant I worked with on code, design and copy |

Kurallar: Buton metni fiille başlar. ATAMap overlay'inde esprili mikro metin kullanılmaz (404 ve walkman metinleri ATAMap overlay'inde görünmez).

### Proje ekran görüntüleri: alt metin ve kredi (S17, kullanıcı onayı 2026-11-27)

Overlay'de ekran görüntüsünün `alt` metni; raftaki kapakta aynı görsel dekor (`alt=""`). Kaynak: `content/projects/<slug>/project.yaml` → `cover`. GK-07 IDDDergi'nin canlı adresi olmadığı için ekran görüntüsü yok (tipografik kapak).

| Kaset | TR | EN |
|---|---|---|
| GK-01 | ErasmusMap'in ana ekranı: uydu görünümünde Avrupa haritası, üstte şehir arama çubuğu, solda yol, demiryolu ve havalimanı katmanları. | ErasmusMap's main screen: a satellite map of Europe with a city search bar on top and road, rail and airport layers on the left. |
| GK-02 | Novera Mobility'nin ana sayfası: “Hafta sonu yola çıkın” kampanya alanı ve altında araç kiralama bölümü. | Novera Mobility's home page: a “Hit the road this weekend” campaign banner with the car rental section below. |
| GK-03 | SeeYourNextStep'te rol seçimi: Product Manager, Product Designer ve Scrum Master gibi sekiz kart, altında 335 derslik ilerleme göstergesi. | Role selection in SeeYourNextStep: eight cards such as Product Manager, Product Designer and Scrum Master, with a progress tracker for 335 lessons below. |
| GK-04 | ATAMap'in açılış ekranı: eski harita dokusunda 1881 ve Selanik, altta zaman çizelgesi ile oynatma düğmeleri, sağda kaynaklı olay kartı. | ATAMap's opening screen: 1881 and Salonika on an old-map texture, a timeline with playback controls below and a sourced event card on the right. |
| GK-05 | İklim Krizi belgeselinin açılışı: dağ manzarası üzerinde “İklim krizi, sebebi ne?” başlığı ve giriş metni. | The opening of the İklim Krizi documentary: the title “Climate crisis: what causes it?” and an intro over a mountain landscape. |
| GK-06 | Nature & Sport Handbook'ta Kuşlar sayfası: ahşap masada açık bir defter; her türün fotoğrafı, yaşam alanı, beslenmesi ve boyu; kenarlarda konu sekmeleri. | The Birds spread in Nature & Sport Handbook: an open notebook on a wooden table, each species with a photo, habitat, diet and size, and topic tabs along the edges. |

**v4 · telefon ekran görüntüleri ve IDDDergi kapağı (alt metinler: kullanıcı onayı 2026-11-28).** Canlı adreslerden 390 px genişlikte çekildi (çerez bandında "Reddet"); `project.yaml` → `phone` ve IDDDergi için `cover`. Metinler dosyadadır; özet: her biri "<Proje> telefonda: …" / "<Project> on a phone: …" kalıbında, görünen öğeleri sayar. IDDDergi kapağı ve telefon görüntüsünde dergi kapağı görünür; kredi TR "Dergi kapağı: IDD ORG" · EN "Magazine cover: IDD ORG" (IDD ORG'un izni kullanıcıyla doğrulanmalı).

**Kredi satırı** (görselin altında, yalnız ErasmusMap; Mapbox statik harita kuralı: atıf görselin yanında): TR "Harita: © Mapbox © OpenStreetMap © Maxar" · EN "Map: © Mapbox © OpenStreetMap © Maxar".

## 9. Kişisel katman listeleri

### Plak sırtları (SPEC §6; yalnız ad, kendi tipografimizle)
| Sanatçı | Albüm |
|---|---|
| Barış Manço | Sözüm Meclisten Dışarı (1981, Türküola; S4'te Vikipedi'den doğrulandı) |
| Duran Duran | Rio |
| Mor ve Ötesi | Dünya Yalan Söylüyor |
| Red Hot Chili Peppers | Californication |
| Sade | Diamond Life |
| Michael Jackson | Thriller |
| Bruno Mars | 24K Magic |

### Kitap sırtları
Yok (kullanıcı kararı, 2026-11-21).

### Film nesneleri (SPEC §6: 14 favori)
Parachute (2023) · Breaking Boundaries: The Science of Our Planet (2021) · Train Dreams (2025) · High and Low (1963) · The Lego Movie (2014) · What We Do in the Shadows (2014) · The Peanut Butter Falcon (2019) · Empire Records (1995) · It's Kind of a Funny Story (2010) · The Boy, the Mole, the Fox and the Horse (2022) · Sing Street (2016) · Big Fish (2003) · Project X (2012) · Submarine (2010)

### Walkman öneri listesi (taste.md)
**Filmler (29):** yukarıdaki 14 favori + Swing Girls (2004) · Life Is Beautiful (1997) · Mexican Standoff (2023) · The Fall Guy (2024) · The Fall (2006) · Forrest Gump (1994) · 12 Angry Men (1957) · Trick or Treaters (2007) · The Lord of the Rings (2001–2003) · Cars (2006) · The Adventures of Tintin (2011) · The Grand Budapest Hotel (2014) · Fantastic Mr. Fox (2009) · The Secret Life of Walter Mitty (2013) · The Pianist (2002)

**Şarkılar (7):** Barış Manço — Dönence (1981) · Duran Duran — Hungry Like the Wolf (1982) · Mor ve Ötesi — Bir Derdim Var (2004) · Red Hot Chili Peppers — Can't Stop (2002) · Sade — Smooth Operator (1984) · Michael Jackson — Billie Jean (1982) · Bruno Mars — Treasure (2012)

Yıl kuralı (kullanıcı kararı, 2026-11-25): ilk yayım, yani şarkının ilk çıktığı albümün yılı. Single yılı farklı olanlar: Can't Stop (single 2003), Billie Jean (1983), Treasure (2013). Kaynak: Wikipedia bilgi kutuları (2026-11-25).

Walkman yalnız ad ve yıl gösterir; puan, yorum, Letterboxd verisi yok (SPEC §6).

### Doğa pulları (INS-25; pixel manzara, kodla/Gemini ile üretilir)
| # | TR | EN |
|---|---|---|
| 1 | Likya Yolu | Lycian Way |
| 2 | Dilek Yarımadası, Aydın | Dilek Peninsula, Aydın |
| 3 | Kaz Dağları | Kaz Mountains |
| 4 | Alpler | The Alps |
| 5 | Fethiye | Fethiye |
| 6 | Datça | Datça |
| 7 | Karadeniz | Black Sea coast |

Pullar dekordur (`aria-hidden`); adlar yalnız görsel etiket.

### Diğer kararlar
- **CV:** CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda'da.
- **Letterboxd profil linki:** yok.

## 10. Açık maddeler (S4 ve sonrası)

| Madde | Kimde | Not |
|---|---|---|
| ~~IDDDergi canlı adresi~~ | — | Kapandı (2026-11-28): https://iklimdd.org/public/dergi/?sayfa=1 → `links.live`. |
| ~~Novera repo linki~~ | Kapandı (D2) | Gösterilmiyor (ekip arkadaşının kullanıcı adı URL'de); yalnız canlı site linki var. |
| ~~EN metinlerin kontrolü~~ | Kapandı (D2) | Kullanıcı D2 preview'unda okudu ve merge onayı verdi (2026-11-21). |
| ~~EN CV PDF'i~~ | Kapandı (2026-11-27) | CV sitede sunulmuyor (kullanıcı kararı, 2026-11-27); bilgileri telefon hariç Hakkımda'da. |
| ~~Barış Manço albümü~~ | Kapandı (S4) | *Sözüm Meclisten Dışarı*, 1981, Türküola, stüdyo albümü. Kaynak: [tr.wikipedia](https://tr.wikipedia.org/wiki/S%C3%B6z%C3%BCm_Meclisten_D%C4%B1%C5%9Far%C4%B1) (resmî diskografi değil). |
| Kişisel fotoğraflar (Hakkımda kenarları, 2–3) | Kullanıcı · sonra | SPEC §9; henüz yok. D4 fotoğrafsız çıktı (kullanıcı kararı, 2026-11-22): Hakkımda tek sütun + kenar notları. Gelince küçük bir dilimle eklenir. |
| ~~Atatürk portresi~~ | Kapandı (D4) | Agence Meurisse, 1922, BnF, Meurisse 2158 A. Commons'ta kamu malı (PD-France, PD-1996, PD-US expired); Europeana/BnF: NoC-OKLR, ticari olmayan kullanım kaynak belirtilerek serbest. Dosya Commons'taki BnF taramasının 1280 px kopyası; yalnız plaka numaralarını dışarıda bırakmak için 3:4 kırpıldı (600×800 WebP, 55 KB). Kaynak: `content/respect.yaml`. |
| ~~Proje ekran görüntüleri~~ | Kapandı (S17) | 6 projede tek ekran görüntüsü (IDDDergi'de canlı adres yok); alt metinler §8 sonunda. `npm run capture:screens` ile alınır, her sonuç kullanıcıya onaylatılır. |
| ~~Okuma süreleri~~ | Kapandı (D2) | Build'de hesaplanıyor. Bu dosyadaki elle yazılmış değerlerden sapma en fazla 0:10 (Markdown işaretleri kelime sayılmıyor); site hesaplananı gösterir. |
| Liner notes (D2) | Not | CONTENT'te tek satırda "Veri / Data" gibi TR / EN çiftleri vardı; her dil kendi tarafını aldı, metin değişmedi (`content/projects/*/{tr,en}.md` → `liner`). |
| ~~Şarkı yılları~~ | Kapandı (D7) | İlk yayım yılı kuralıyla §9'da; kaynak Wikipedia. |
| ~~Kenar notu metinleri~~ | Kapandı (D4) | Üç not önerildi ve onaylandı; §8'de. |
| ~~Eksik mikro metinler~~ | Kapandı (D1) | Önerildi, onaylandı, §8'e eklendi. |
| Sayılar | S-son | Commit, olay, ders sayıları 2026-11-21 itibarıyla; yayından önce tazelenir. |
