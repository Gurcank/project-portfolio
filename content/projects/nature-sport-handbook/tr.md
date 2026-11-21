---
title: "Nature & Sport Handbook"
subtitle: "Ekranda bir *saha defteri*"
card:
  problem: "Doğada gördüğünü tanımak isteyen biri kısa ve güvenilir bir rehber bulamıyor."
  credits: "PRODUCT + TASARIM + KOD · 2026 · SOLO"
  result: "Yayında · TR/EN · 558 kredili görsel"
liner: "Next.js · TypeScript · Vitest · Vercel · Görseller: açık lisanslı ve kamu malı kaynaklar (558, kredi listesi sitede)"
---

## A1 · Problem

Doğayı severim ve yürüyüşte gördüğüm şeyleri tanımak isterim. Bu projede iki şeyi sınamak istedim: görsel olarak ne kadar iyi bir iş çıkarabileceğimi ve ekranda gerçek bir el kitabının ne kadar karşılığını kurabileceğimi. Dijital doğa kaynakları ya ansiklopedi kadar uzun ya da kuru bir katalog. Arazide işe yarayan ise kısa, akılda kalıcı ve doğru bilgi.

## A2 · Kullanıcı

Birincil: yürüyüşe, kampa ya da doğa sporuna çıkan meraklı. Gördüğü kuşa, mantara ya da taşa bakıp birkaç akılda kalıcı bilgi istiyor; uzun bir makale okumayacak.
İlk kullanıcısı benim.

## A3 · Hedef

- Her kayıt bir bakışta okunur.
- Görseller gerçek ve kaynaklıdır.
- Site gerçek bir saha defteri gibi hissettirir.

Kapsam dışı: fotoğraftan tür tanıma ve kullanıcı katkısı.

## B1 · Kararlar ve ödünleşimler

1. **El yazısı rehber hissi.** _Seçtim:_ Saha defteri estetiğini: el yazısı başlıklar, not kâğıdı dokusu, kısa notlar. _Vazgeçtim:_ Sıradan bir katalog ve kart ızgarasından. _Çünkü:_ Projenin bir amacı görsel becerimi sınamaktı; his, içeriğin kendisi kadar önemliydi. _Bedeli:_ El yazısı uzun metinde okunurluğu düşürüyor; gövde metni sade bir yazıyla kaldı.
2. **Gerçekçi bir el kitabı.** _Seçtim:_ Bilgiyi gerçek dünyadaki fiziksel koşullara göre düzenlemeyi: nerede, hangi mevsimde görülür, neye dikkat edilir. _Vazgeçtim:_ Eğlenceli ama arazide işe yaramayan "ilginç bilgi" listelerinden. _Çünkü:_ El kitabı, kullanıldığı yerde işe yaradığı ölçüde değerli. _Bedeli:_ Her kayıt için daha çok araştırma.
3. **Her görsel kredili.** _Seçtim:_ Yalnızca açık lisanslı ve kamu malı görselleri; 558 görselin her birinin kaynağı ve lisansı kayıtlı. _Vazgeçtim:_ Daha çarpıcı ama lisansı belirsiz görsellerden. _Çünkü:_ Yayımladığım her şeyin kaynağını gösterebilmek istedim. _Bedeli:_ Bazı türler için uygun görsel bulunamadı.

## B2 · Sonuç

Yayında, Türkçe ve İngilizce: hayvan, bitki, mantar, taş ve dört doğa sporu bölümü. Temmuz–Eylül 2026 arasında 17 commit. Şimdilik kendim kullanıyorum ve kullanımı ölçmedim.

## B3 · Öğrendiklerim

- **Estetik bir hedef de ölçülebilir olmalı.** "Güzel olsun" yerine "bir bakışta okunsun" gibi bir ölçüt koyardım.
- **Lisans işi içerik işi kadar uzun sürüyor.** 558 görselin kaynağını tek tek kaydetmek ayrı bir iş akışı istedi.
- **Statik içerik basitlik getirir ama her düzeltme bir deploy demek.**
