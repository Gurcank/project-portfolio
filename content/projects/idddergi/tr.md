---
title: "IDDDergi"
subtitle: "Bir PDF'e *dergi* hissi vermek"
card:
  problem: "Derneğin dergisi bir PDF dosyasında kalıyordu; telefonda okunmuyordu."
  credits: "PRODUCT + KOD · 2026 · GÖNÜLLÜ EKİP"
  result: "Dernek sitesinde canlı"
liner: "Next.js · React · TypeScript · Tailwind CSS · react-pageflip · react-zoom-pan-pinch · Dergi içeriği: IDD ORG"
---

## A1 · Problem

IDD ORG, COP31 Türkiye için hazırladığı "Shaping the Future of Climate" dergisini sitesinde yayımlamak istedi. Elde bir PDF vardı. Onu bir indirme linki olarak koymak en kolayıydı, ama indirilen dosya çoğu zaman açılmadan kalıyor; telefonda ise yakınlaştırıp kaydırarak okumak zahmetli. Emek verilmiş bir derginin bir dosya linkinden fazlasını hak ettiğini düşündüm.

## A2 · Kullanıcı

Birincil: derneğin sitesine çoğunlukla telefondan gelen okur. Dergiye göz atmak istiyor; bir dosya indirmek ya da yönetmek istemiyor.
İkincil: dernek ekibi. Yeni bir sayıyı kolayca ekleyebilmeli.

## A3 · Hedef

- Dergi sitede, indirmeden okunur.
- Sayfa çevirmek basılı dergi hissi verir.
- Telefonda sayfa yakınlaştırılabilir.

Kapsam dışı: derginin içeriği ve tasarımı (dernek hazırladı).

## B1 · Kararlar ve ödünleşimler

1. **PDF linki yerine flipbook.** _Seçtim:_ Sayfaları çevrilen, yakınlaştırılabilen bir görüntüleyici. _Vazgeçtim:_ Düz PDF linkinden ve tarayıcının kendi PDF görüntüleyicisinden. _Çünkü:_ Okur bir dosyayla değil, bir dergiyle karşılaşmalı. _Bedeli:_ Daha fazla kod ve ağırlık; hareket azaltma açıkken sayfa çevirme animasyonu kapanıyor.
2. **Sayfaları önceden görsele çevirmek.** _Seçtim:_ PDF'i derleme sırasında sayfa görsellerine çeviren bir script; tarayıcı yalnızca görsel indiriyor. _Vazgeçtim:_ PDF'i tarayıcıda canlı çizmekten. _Çünkü:_ Telefonda hızlı açılış. _Bedeli:_ Her yeni sayı için script'in yeniden çalıştırılması gerekiyor.

## B2 · Sonuç

Görüntüleyici derneğin sitesinde canlı. Ağustos 2026'da 4 günde, 4 commit'le bitti: kısa ve kapsamı net bir iş. Okunma verisine sahip değilim.

## B3 · Öğrendiklerim

- **Küçük işte de "neden" diye sormak işe yarıyor.** İstek "PDF'i koy"du, ihtiyaç ise "dergiyi okut".
- **Dar kapsam hız getiriyor.** Görüntüleyiciden başka hiçbir şeye dokunmadım.
