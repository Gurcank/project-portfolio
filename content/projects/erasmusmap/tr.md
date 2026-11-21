---
title: "ErasmusMap"
subtitle: "Bir Erasmus dönemini *unutmamak* için harita"
card:
  problem: "Erasmus'ta gezilen şehirler unutuluyor; deneyim sonraki öğrenciye ulaşmıyor."
  credits: "PRODUCT + TASARIM + KOD · 2026 · SOLO"
  result: "Yayında · 1602 şehir · 6 dil"
liner: "Next.js 16 · TypeScript · Tailwind CSS v4 · Mapbox GL · Prisma + Supabase Postgres · NextAuth · Vitest + Playwright · Vercel · Veri: GeoNames (CC BY 4.0), Eurostat NUTS 3 + GADM"
---

## A1 · Problem

Erasmus'a gideceğim netleştiğinde yaptıklarımı kayıt altına almak istedim. Gezdiğim yerleri not etmeyi severim, çünkü not etmediğimi unutuyorum. Bir Erasmus dönemi kısa ve yoğun: birkaç ayda onlarca şehir, her biri ayrı bir deneyim. Bu deneyimler genelde fotoğraf galerisinde ya da sohbet geçmişinde kalıyor. Ne sahibine düzenli bir hatıra oluyor ne de aynı şehre gidecek bir sonraki öğrenciye bilgi.

## A2 · Kullanıcı

Birincil: Erasmus'taki öğrenci. Gittiği şehirleri işaretlemek, puanlamak ve sonraki geziyi planlamak istiyor; bunu telefondan, birkaç dokunuşla yapmalı.
İkincil: Erasmus'a hazırlanan öğrenci. Şehir seçerken "orada yaşamış biri ne diyor?" sorusunun cevabını arıyor; tek bir yıldız puanı ona yetmiyor.

## A3 · Hedef

Başarılı olursa:

- Bir öğrenci gezdiği şehri 1 dakikadan kısa sürede kaydedip puanlayabilir.
- Şehir sayfası tek puan yerine 6 kriterde (kültür, gastronomi, güvenlik, sosyal hayat, ulaşım, yaşam maliyeti) karşılaştırılabilir bilgi verir.
- Kayıt ve plan aynı yerde durur.

Kapsam dışı: konaklama ve bilet satışı.

## B1 · Kararlar ve ödünleşimler

1. **Şehir = NUTS 3 bölgesi.** _Seçtim:_ Haritada şehirleri nokta yerine Avrupa'nın resmî NUTS 3 bölgeleriyle çizmeyi; her bölge içindeki en büyük şehrin adını taşıyor. _Vazgeçtim:_ Nokta işaretlerinden. _Çünkü:_ Noktalar büyük şehirlerin çevresinde üst üste biniyordu; NUTS 3 her ülkede doğru idari seviye (Türkiye'de il, Fransa'da département). _Bedeli:_ Resmî adlar kullanılamıyor ("München, Kreisfreie Stadt"), bir adlandırma kuralı yazmam gerekti.
2. **Yalnızca Google ile giriş, fotoğraf yükleme yok.** _Seçtim:_ Google girişi ve hazır avatarlar. _Vazgeçtim:_ E-posta/şifre ve kullanıcı fotoğrafından. _Çünkü:_ Şifre ve fotoğraf saklamamak hem güvenlik riskini hem moderasyon yükünü siliyor; tek kişilik bir ekip için ikisi de taşınamaz. _Bedeli:_ Google hesabı olmayan kullanıcıyı kaybetmek ve daha az kişisel profiller.
3. **Önce kayıt ve plan, yorum onların yan ürünü.** _Seçtim:_ Ziyaret edilen şehirleri, gitmek istenenleri ve seyahat planlayıcıyı (rota, program, bütçe, harcama) aynı hesapta toplamayı. _Vazgeçtim:_ Yalnızca bir yorum sitesi olmaktan. _Çünkü:_ Yorum sitesi, kullanıcı bir şey yazmadığı sürece ona değer vermez; kayıt ve plan ilk günden kendisi için bir sebep veriyor. _Bedeli:_ Kapsam büyüdü; planlayıcı başlı başına bir ürün oldu.

## B2 · Sonuç

ErasmusMap yayında: 1602 şehir, 6 dil, Google girişi, seyahat planlayıcı ve yorumların beğenilip tartışıldığı bir "Meydan" akışı. Temmuz–Ekim 2026'da 142 commit; her değişiklik test, tip kontrolü ve boş veritabanında migration denemesinden geçiyor. Kullanım şimdilik çevremle sınırlı ve sistemli ölçmedim. Ölçeceğim ilk şey: kayıt olanların kaçı ilk hafta içinde en az bir şehir puanlıyor.

## B3 · Öğrendiklerim

- **Kapsamı erken kilitlerdim.** Sosyal akış ve planlayıcı ilk kullanıcılar gelmeden eklendi; önce tek bir akışı (kaydet → puanla) çalıştırıp ölçmek daha doğru olurdu.
- **Dağıtım da ürünün parçası.** İlk 20 kullanıcıyı nereden bulacağımı geliştirmeye başlamadan planlardım.
- **Gizlilik kararı en başta alınır.** Veriyi hiç saklamamak, sonradan silmeye çalışmaktan çok daha ucuz.
