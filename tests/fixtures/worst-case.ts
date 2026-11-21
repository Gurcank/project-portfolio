/*
 * Worst-case data for the D1 sections (/break-ui). Shaped exactly like content/ output, so it enters
 * through the same boundary as the real copy. Every value is plausible or sits at the schema limit
 * in velite.config.ts; fields with no limit are marked "unbounded".
 */
import type { Profile, ProjectView, SiteCopy } from "@/lib/content";

/*
 * Shelf worst case, mixed across tapes as real data would be (only the first tapes change; the rest
 * stay real so the page still reads). Limits from velite.config.ts: title 40, subtitle 70 visible,
 * problem 90, credits 60, result 60.
 */
export function worstProjects(base: ProjectView[]): ProjectView[] {
  return base.map((project, index) => {
    const study = project.study;
    switch (index) {
      case 0:
        return {
          ...project,
          study: {
            ...study,
            title: "Erasmus Şehir Rehberi ve Gezi Planlayıcı",
            subtitle: "Bir Erasmus dönemini, döndükten yıllar sonra bile *unutmamak* için",
            card: {
              problem:
                "Erasmus'ta gezilen onlarca şehir birkaç ay içinde unutuluyor; deneyim kimseye ulaşmıyor.",
              credits: "PRODUCT + TASARIM + KOD + ARAŞTIRMA · 2026 · GÖNÜLLÜ EKİP",
              result: "Yayında · 1602 şehir · 6 dil · 142 commit · 1 yıl bakım",
            },
          },
        };
      case 1:
        // Shortest realistic title, and no links at all (both optional)
        return { ...project, links: {}, study: { ...study, title: "Ek" } };
      case 2:
        // One unbreakable Turkish word at the 40-character title limit
        return { ...project, study: { ...study, title: "Afyonkarahisarlılaştıramadıklarımızdan" } };
      default:
        return project;
    }
  });
}

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
  nav: { work: "Seçtiğim işlerim", contact: "Benimle iletişim" },
  hero: {
    // 57 visible characters, limit 60
    role: "Karmaşık süreçleri *anlaşılabilir* ürünlere dönüştürüyorum.",
    // 74 characters, limit 80; two cities and a Polish capital
    label: "PRODUCT MANAGER ADAYI · İSTANBUL / ŁÓDŹ · ● ŞUBAT 2027'DEN İTİBAREN MÜSAİT",
    // 23 characters (limit 24), 3 words
    primaryCta: "Benimle iletişime geçin",
    secondaryCta: "Bütün işlerime bak",
  },
  // 36 and 38 visible characters, limit 40
  sections: {
    work: "Odamın rafında duran *yedi* eski kaset",
    contact: "Yeni bir fırsat için *mesaj* atman yeter",
  },
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
    cassette: { open: "{project} kasetinin case study'sini aç" },
    overlay: {
      sideA: "A yüzü",
      sideB: "B yüzü",
      close: "Kapat (Esc)",
      readTime: "{time} okuma süresi",
      live: "Canlı siteyi aç",
      source: "Kaynak kodu gör",
      next: "Sıradaki kaset: {project}",
      back: "Rafa geri dön",
      credits: { role: "Rol", year: "Yıl", team: "Ekip" },
      tracklist: "Parça listesi",
      liner: "Liner notes",
    },
  },
  notFound: { title: "—", body: "—", cta: "—" },
  footer: {
    copyright: "© 2026 Gürcan Yıldırımoğulları",
    // 79 characters, limit 80
    madeIn: "İstanbul ile Łódź arasında, çoğunlukla gece yarısından sonra bir yerde yapıldı.",
  },
};
