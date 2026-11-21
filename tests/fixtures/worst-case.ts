/*
 * Worst-case data for the D1 sections (/break-ui). Shaped exactly like content/ output, so it enters
 * through the same boundary as the real copy. Every value is plausible or sits at the schema limit
 * in velite.config.ts; fields with no limit are marked "unbounded".
 */
import type { Profile, SiteCopy } from "@/lib/content";

export const worstProfile: Profile = {
  // name ≤ 60; one long Turkish surname with no break opportunity
  name: "Gürcan Yıldırımoğulları",
  // plus-addressing + university subdomain; unbreakable
  email: "gurcan.karadag+portfolio@ogrenci.okan.edu.tr",
  linkedin: "https://www.linkedin.com/in/gurcankaradag",
  github: "https://github.com/Gurcank",
  cv: { tr: "/cv/gurcan-karadag-cv-tr.pdf" },
};

export const worstCopy: SiteCopy = {
  locale: "tr",
  meta: { title: "Gürcan Karadağ · Product Manager adayı", description: "—" },
  // ≤ 16 characters, ≤ 3 words
  nav: { contact: "Benimle iletişim" },
  hero: {
    // 57 visible characters, limit 60
    role: "Karmaşık süreçleri *anlaşılabilir* ürünlere dönüştürüyorum.",
    // 74 characters, limit 80; two cities and a Polish capital
    label: "PRODUCT MANAGER ADAYI · İSTANBUL / ŁÓDŹ · ● ŞUBAT 2027'DEN İTİBAREN MÜSAİT",
    // 23 characters (limit 24), 3 words
    primaryCta: "Benimle iletişime geçin",
  },
  // 38 visible characters, limit 40
  sections: { contact: "Yeni bir fırsat için *mesaj* atman yeter" },
  microcopy: {
    // buttons and labels: ≤ 3 words each
    skipToContent: "Ana içeriğe geç",
    languageSwitch: { label: "EN", accessibleName: "Switch to English" },
    contact: {
      copyEmail: "E-posta adresini kopyala",
      copied: "Adres panoya kopyalandı",
      // 10 words (CONTENT §0 budget: ≤ 15)
      copyFailed: "Tarayıcın panoya erişime izin vermedi; adresi seçip elle kopyalayabilirsin.",
      linkedin: "LinkedIn",
      github: "GitHub",
      downloadCv: "Özgeçmişimi indir (PDF)",
    },
  },
  notFound: { title: "—", body: "—", cta: "—" },
  footer: {
    copyright: "© 2026 Gürcan Yıldırımoğulları",
    // 79 characters, limit 80
    madeIn: "İstanbul ile Łódź arasında, çoğunlukla gece yarısından sonra bir yerde yapıldı.",
  },
};
