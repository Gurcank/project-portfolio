---
title: "İklim Krizi · IDD ORG"
subtitle: "Soyut bir krizi *gündelik* örneklerle anlatmak"
card:
  problem: "İklim krizi raporlarda soyut kalıyor; okur kendi hayatıyla bağ kuramıyor."
  credits: "PRODUCT + TASARIM + KOD · 2026 · GÖNÜLLÜ EKİP"
  result: "Dernek sitesi için tek sayfalık belgesel"
liner: "HTML · CSS · JavaScript · Laravel Blade · GSAP · Lenis · Veri: NASA, Türkiye çevre göstergeleri · Ana site: IDD ORG teknoloji ekibi"
---

## A1 · Problem

Gönüllüsü olduğum İklim Değişmeden Değiş derneği (IDD ORG), teknoloji ekibinden sitesi için bir proje istedi. O sırada izlediğim _Breaking Boundaries_ belgeselinden etkilenmiştim. İklim krizi çoğu zaman sıcaklık eğrileri ve uzun raporlarla anlatılıyor; rakamlar doğru ama okurun gündelik hayatına değmiyor. "1,5 derece" bir şey ifade etmiyorsa kriz de uzak kalıyor.

## A2 · Kullanıcı

Birincil: derneğin sitesine gelen, iklim konusunda uzman olmayan Türk okur. Krizi anlamak istiyor ama rapor okumayacak; neden önemli olduğunu kendi hayatından bir örnekle görmesi gerekiyor.
İkincil: dernek ekibi. Sayfayı kendi sitelerinde, kendi araçlarıyla yaşatabilmeli.

## A3 · Hedef

Başarılı olursa:

- Okur sayfayı bitirdiğinde sıcaklık artışı, deniz seviyesi, yangınlar ve emisyonlar arasındaki bağı ve atabileceği adımları bilir.
- Ekip sayfayı yardım almadan siteye ekleyebilir.

Kapsam dışı: bağış ve form.

## B1 · Kararlar ve ödünleşimler

1. **Rapor yerine belgesel akışı.** _Seçtim:_ Scroll ile ilerleyen bir anlatı: buzul videosuyla açılış, NASA ve Türkiye çevre göstergeleri verileriyle animasyonlu sayaçlar, grafikler ve haritalar, sonunda çözüm adımları. _Vazgeçtim:_ Verileri tablo ve metin olarak vermekten. _Çünkü:_ Amaç bilgi vermek değil, anlamayı sağlamaktı; her rakamı okurun hayatından bir örnekle eşledim. _Bedeli:_ Video ve animasyon sayfayı ağırlaştırdı; bu yüzden hareket azaltma ve JS'siz içerik ekledim.
2. **Mevcut siteye uyum, build adımı yok.** _Seçtim:_ Sayfayı derneğin Laravel sitesinin şablonunu genişleterek yazmayı; siteye eklemek dört küçük değişiklik. _Vazgeçtim:_ Ayrı bir modern framework ile bağımsız bir sayfadan. _Çünkü:_ Gönüllü bir ekipte sayfa, beni beklemeden yaşayabilmeli. _Bedeli:_ Modern araçların kolaylıkları olmadan, tek bir JS ve CSS dosyasıyla çalışmak.
3. **Her görsel lisanslı ve künyeli.** _Seçtim:_ Yalnızca açık lisanslı görseller; her görselin köşesindeki düğme kaynağını ve lisansını açıyor. _Vazgeçtim:_ Daha çarpıcı ama lisansı belirsiz görsellerden. _Çünkü:_ İklim gibi bir konuda derneğin güvenilirliği, gösterdiği her şeyin kaynağına bağlı. _Bedeli:_ Görsel seçenekleri daraldı.

## B2 · Sonuç

Sayfa iklimkrizi.vercel.app'te önizleme olarak yayında ve derneğin sitesine eklenmeye hazır. Haziran–Ekim 2026 arasında 43 commit. Okur tarafında ölçüm yapmadım; ilk ölçeceğim şey, gelenlerin kaçının çözüm adımlarına kadar indiği. Bilinen bir eksik var: videolar için görünür bir durdur düğmesi yok.

## B3 · Öğrendiklerim

- **Brief'i kendim yazdım.** "Bir şey yap" gibi açık bir istek, problemi önce tanımlamamı gerektirdi.
- **Başkasının sisteminde çalışmak ayrı bir beceri.** En iyi araç değil, ekibin devralabileceği araç doğru seçimdi.
- **Animasyon bir maliyet.** Her hareketin erişilebilirlik karşılığını da yazmak gerekiyor.
