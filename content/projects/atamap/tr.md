---
title: "ATAMap"
subtitle: "1881–1938, bir haritada *adım adım*"
card:
  problem: "Atatürk'ün hayatı kronolojilerde parça parça; yolculuğu bir bütün olarak izlenemiyor."
  credits: "PRODUCT + TASARIM + KOD · 2026 · SOLO"
  result: "Yayında · 721 olay · 398 kaynak"
liner: "Preact + TypeScript + Vite · d3-geo + SVG · Vercel · Veri: Natural Earth (kamu malı), CShapes 2.0 (CC BY-NC-SA 4.0), TBMM, MSB, ATAM"
---

## A1 · Problem

Atatürk'e hayranım ve hayatını bir bütün olarak izlemek istedim, en azından yolculuğunu. Kronolojiler tarihleri veriyor ama mekânı vermiyor; haritalar ise tek bir dönemi gösteriyor. Selanik'ten Samsun'a, Sakarya'dan yurt gezilerine uzanan 57 yılı aynı yerde ve o günün sınırlarıyla görmek mümkün değildi. Üstelik internette Atatürk hakkında kaynaksız ve birbiriyle çelişen çok bilgi dolaşıyor.

## A2 · Kullanıcı

Ön bilgisi olmayan, meraklı yetişkin ziyaretçi. Ders çalışmıyor, keşfediyor: bir yıl seçip "o sırada neredeydi, ne yazdı?" diye bakmak istiyor. Okuduğu bilginin nereden geldiğini görebilmeli; bu üründe güven, özelliğin kendisi.

## A3 · Hedef

Başarılı olursa:

- 5 kişilik testte en az 4 kişi yardım almadan, 3 dakika içinde istenen bir adıma ulaşır, belgenin tam metnini açar ve kaynağını söyleyebilir.
- Her olay en az bir kaynağa bağlıdır.

Kapsam dışı: yorum, değerlendirme ve telifli içerik.

## B1 · Kararlar ve ödünleşimler

1. **İki kaynak kuralı.** _Seçtim:_ Her tarih ve yerin en az iki bağımsız kaynakla doğrulanmasını; çelişen kayıt siteye girmiyor. Devlet kurumlarının yayınları (TBMM, MSB, ATAM) tek başına yetiyor. Vikipedi en fazla ikinci kaynak olabiliyor; bir Vikipedi maddesi diğer kaynağı dayanak gösteriyorsa ikisi bağımsız sayılmıyor. _Vazgeçtim:_ Hızlı ve geniş kapsamdan. _Çünkü:_ Bu konuda tek bir yanlış tarih bütün sitenin güvenini götürür. _Bedeli:_ Bilinen olayların bir kısmı siteye giremedi; en kapsamlı hazır liste olan Vikipedi kronolojisi kaynaksız olduğu için tek başına hiçbir kaydı doğrulayamadı.
2. **Telifli içerik yok, transkripsiyon da yok.** _Seçtim:_ Yalnızca aslı Latin harfli belgelerin tam metnini, birebir göstermeyi. _Vazgeçtim:_ Arap harfli belgelerin yayımlanmış transkripsiyonlarından; bunlar telifli sayılıyor. _Çünkü:_ Kişisel bir proje de olsa yasal riski sıfırlamak istedim. _Bedeli:_ Harf İnkılabı öncesi belgeler tam metinsiz, yalnızca künye kartı (tarih, yer, gönderen, alıcı) olarak görünüyor.

## B2 · Sonuç

ATAMap yayında: 721 olay, 217 belge, 171 seyahat, 113 yer ve 398 kaynak; hepsi tek ekranlık bir haritada, dönem sınırlarıyla. 27 Ekim – 18 Kasım 2026 arasında 110 commit. Şimdiye kadar yalnızca 1 kişiye gösterdim ve beğendi; bu bir sonuç değil, bir başlangıç. Sıradaki adım SPEC'teki 5 kişilik test.

## B3 · Öğrendiklerim

- **Veri, arayüzden uzun sürer.** Zamanın çoğu kod yazmaya değil, kaynak taramaya ve çelişkileri çözmeye gitti.
- **Kural koymak karar yükünü azaltır.** "İki kaynak" kuralı sayesinde her kayıt için yeniden düşünmem gerekmedi.
- **Bir kişinin "beğendim"i test değil.** Kullanılabilirlik testini yayından önce yapardım.
