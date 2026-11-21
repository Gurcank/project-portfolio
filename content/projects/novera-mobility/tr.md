---
title: "Novera Mobility"
subtitle: "Kod yazmayı bırakıp *karar* vermeyi seçmek"
card:
  problem: "Hızla büyüyen bir site, temeli sağlamlaşmadan yeni özellik taşıyamıyordu."
  credits: "FRONTEND (V1) → PM (V2) · 2026 · 2 KİŞİ"
  result: "Yayında · v2 · TR/EN"
liner: "Next.js · TypeScript · Tailwind CSS · next-intl · Zod · NestJS · Prisma · PostgreSQL (Neon) · Vercel + Google Cloud Run · Ekip: ekip arkadaşım (full stack)"
---

## A1 · Problem

Novera Mobility, ekip arkadaşımla gerçek bir ekip akışını öğrenmek için kurguladığımız bir araç kiralama şirketi. v1'de ön yüzü ben, arka yüzü o yazdı. Site hızlı büyüdü: arama, rezervasyon, puanla ödeme, kurumsal teklif, iki dil. Ama 22 Ekim'deki kalite taramasında 1 kritik ve 5 yüksek bulgu çıktı; örneğin geçmiş tarihli bir rezervasyonla anında puan kazanılabiliyordu.

## A2 · Kullanıcı

Ürünün kurgusal kullanıcıları üç grup: araç kiralayan birey, filo kiralayan kurumsal yönetici ve siteyi yöneten Novera çalışanı.
Projenin gerçek kullanıcısı ise ekibin kendisi: ekip arkadaşım full stack deneyimi kazanmak istiyordu, ben PM deneyimi. v2'de rolleri buna göre ayırdık: o tüm kodu yazıyor; ben kapsamı, sırayı ve kabulü yönetiyorum.

## A3 · Hedef

v2'nin başarı ölçütü:

- SPEC'teki tüm kabul akışları canlıda, 375 ve 1280 px'te ve yalnızca klavyeyle geçer.
- Kritik ve yüksek bulguların hepsi kapanır.

Kapsam dışı: pazarlama metinlerini değiştirmek.

## B1 · Kararlar ve ödünleşimler

1. **Önce temel, sonra özellik.** _Seçtim:_ v2'yi beş parçaya bölüp ilkini (güvenlik, veri bütünlüğü, kod düzeni) diğerlerinin önkoşulu yapmayı. _Vazgeçtim:_ Sitede satılan ama çalışmayan Filom ve Yönetim panellerini hemen yazmaktan. _Çünkü:_ Puan açığı olan bir ödeme akışının üstüne yeni panel kurmak, açığı büyütmek demekti. _Bedeli:_ Haftalarca dışarıdan görünür bir yenilik çıkmadı.
2. **Her iş bir issue, main'e doğrudan push yok.** _Seçtim:_ Issue → branch → PR → Vercel önizlemesinde kabul kriterine göre kontrol → birleştirme akışını. _Vazgeçtim:_ İki kişilik ekipte hızlı ama izsiz doğrudan push'tan. _Çünkü:_ Kontrol edebileceğim bir kabul kriteri yoksa PM olarak söyleyebileceğim tek şey "beğendim" olur. _Bedeli:_ Küçük düzeltmeler bile bir PR döngüsü istiyor.
3. **SPEC tek kaynak.** _Seçtim:_ Bir istek SPEC'le çelişirse geliştiricinin durup bana sormasını; değişiklik yalnızca PR ile ve sürüm notuyla. _Vazgeçtim:_ Sohbette verilen anlık kararlardan. _Çünkü:_ Asenkron çalışan iki kişi için yazılı karar, hatırlanan karardan güvenilir. _Bedeli:_ SPEC'i güncel tutmak benim sürekli işim oldu.

## B2 · Sonuç

v2 tam sürüm olarak yayında, Türkçe ve İngilizce. 4 Ekim – 1 Kasım 2026 arasında 28 issue açıldı ve her değişiklik PR ile girdi; temel sağlamlaştırma bitmeden yeni özelliğe geçilmedi. Benim için asıl sonuç: kod yazmadan bir ürünü ilerletmenin neye benzediğini ilk kez yaşadım.

## B3 · Öğrendiklerim

- **Kabul kriteri PM'in aracı.** Net bir kriter yokken PR'ı neye göre kabul edeceğimi bilemiyordum.
- **"Ne yapmayacağız" listesi en çok konuşulan belge oldu.**
- **Rol ayrımı, iki kişilik ekipte bile karar hızını artırdı.** Kimin karar verdiği belliydi.
