# Yayın öncesi el kontrolleri (S16)

Otomatik testlerin yapamadığı üç kontrol. Sonuçları `PROGRESS.md`'ye yaz.

## 1. 30 saniye testi (SPEC §4, §14.2)

Siteyi daha önce görmemiş bir kişi, telefonda ya da dizüstünde.

1. Siteyi aç, kişiye ver, 30 saniye kendi başına baksın. Yönlendirme yapma, soru cevaplama.
2. Ekranı kapat ve sor:
   - **Bu kim?** (Beklenen: Gürcan, Product Manager adayı.)
   - **Ne arıyor?** (Beklenen: Şubat 2027'den itibaren İstanbul'da staj / iş.)
   - **Ona nasıl ulaşırsın?** (Beklenen: e-posta ya da LinkedIn.)
3. Üçü de doğruysa geçti (3/3). Yanlış ya da eksik cevabı olduğu gibi not et; düzeltmeyi birlikte konuşuruz.

## 2. Ekran okuyucu turu (~10 dk)

Windows: NVDA (ücretsiz, nvaccess.org) + Chrome. Mac: VoiceOver (Cmd+F5) + Safari.

| # | Yap | Beklenen |
| - | --- | -------- |
| 1 | Sayfayı aç, Tab'a bas | İlk duyulan "İçeriğe geç" |
| 2 | Başlıklar listesini aç (NVDA: Insert+F7) | Tek h1 "Gürcan Karadağ", bölüm başlıkları sırayla |
| 3 | Raftaki bir kasete Tab ile gel | "GK-04 ATAMap case study'sini aç" gibi okunuyor |
| 4 | Enter | Case study açılıyor, odak başlıkta; arkadaki sayfa okunmuyor |
| 5 | Esc | Kapanıyor, odak aynı kasete dönüyor |
| 6 | Hakkımda'daki portreye gel | Kim, ne zaman ve kaynak okunuyor |
| 7 | Dekor, maskot, intro | Hiçbiri okunmuyor |
| 8 | `/en`'e geç | İngilizce sesle okunuyor; TR sayfasında İngilizce kelimeler İngilizce telaffuzla |

## 3. Analytics canlıda (SPEC §14.6)

Umami Website ID Vercel'e eklendikten sonra, production'da:

1. E-posta linkine, LinkedIn linkine ve CV düğmesine tıkla; bir case study aç.
2. Umami panelinde **Events**: `contact_email_click`, `contact_linkedin_click`, `cv_download`, `case_study_open` görünüyor mu?
3. CV düğmesi yalnız yayınlanabilir CV eklendikten sonra görünür; o zamana kadar `cv_download` beklenmez.
