---
title: "SeeYourNextStep"
subtitle: "Yedi rol, tek harita, *sıradaki* adım"
card:
  problem: "Ürün rolleri arasında kararsız biri neyi, hangi sırayla öğreneceğini bilmiyor."
  credits: "PRODUCT + TASARIM + KOD · 2026 · SOLO"
  result: "Yayında · 7 rol · 335 ders"
liner: "Astro 7 · MDX · Tailwind CSS 4 · Pagefind · nanostores · Vercel"
---

## A1 · Problem

Ürün tarafında çalışmak istediğimi biliyordum ama hangi rolde olduğumdan emin değildim: Product Manager mı, Product Designer mı, Business Analyst mı? Her rolün ne bilmesi gerektiğini de bilmiyordum. Elimdeki bilgi 15.200 satırlık düz bir markdown yığınıydı: okunuyordu ama nerede kaldığım takip edilemiyor, aranamıyor, tekrar edilemiyordu. Bu yüzden her rol için kendime bir yol çizdim.

## A2 · Kullanıcı

Birincil: ben ve benim gibi ürün rolleri arasında kararsız olan öğrenci ya da yeni başlayan. Rolleri yan yana görmek, birini seçmek ve "sıradaki adımım ne?" sorusuna cevap almak istiyor.
İkincil: mühendislerle aynı dili konuşmak isteyen ürün tasarımcısı.

## A3 · Hedef

Başarı ölçütü: "Siteyi açtığımda nerede kaldığımı üç saniyede görüyorum, aradığım terimi iki saniyede buluyorum, bitirdiğim konuyu tek tıkla işaretliyorum."

Kapsam dışı: hesap, sertifika, video ders.

## B1 · Kararlar ve ödünleşimler

1. **React yok, JS en fazla 60 KB.** _Seçtim:_ Astro ile statik site; etkileşimler sayfaya özel küçük betiklerle. Sayfa başına 60 KB JS bütçesi her derlemede denetleniyor. _Vazgeçtim:_ React ile tek sayfalık uygulamadan. _Çünkü:_ Bu bir okuma ürünü; kullanıcı zamanının çoğunu metinde geçiriyor. Hafif sayfa hızlı açılıyor ve çevrimdışı okumayı mümkün kılıyor. _Bedeli:_ Gezegen haritası gibi etkileşimli parçaları framework yardımı olmadan yazmak daha çok emek istedi.
2. **Tek bilgi tabanı, yedi rol merceği.** _Seçtim:_ Bütün roller aynı dersleri paylaşıyor; rol yalnızca sırayı, önceliği (temel / önerilen / isteğe bağlı) ve ders içindeki "Product Manager olarak sen" kutularını değiştiriyor. _Vazgeçtim:_ Her rol için ayrı kurstan. _Çünkü:_ Asıl soru "hangi rol bana uygun?"; kullanıcı rolleri aynı zeminde karşılaştırabilmeli. _Bedeli:_ Her ders yedi rol birden düşünülerek yazılmak zorunda.

## B2 · Sonuç

SeeYourNextStep yayında: 7 rol yolu, 31 kategori, 335 ders, 994 terim ve 40 doldurulmuş şablon; tam metin arama ve çevrimdışı okuma. Asıl kullanıcısı benim; 1 kişiye daha gösterdim. Sonucu bir metrik değil, bir karar oldu: bu yolları çizerken Product Manager olmak istediğimi netleştirdim.

## B3 · Öğrendiklerim

- **Kendi problemini çözmek iyi bir başlangıç ama yetmez.** Tek kullanıcıyla neyin genel bir ihtiyaç olduğunu ayıramıyorum.
- **İçerik ürünü ölçekte zorlaşır.** 335 ders, bir ders standardı ve otomatik doğrulama olmadan tutarlı kalmazdı.
- **Performans bütçesini baştan koymak, sonradan kısmaktan kolay.**
