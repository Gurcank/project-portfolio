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
  nav: {
    work: "Seçtiğim işlerim",
    principles: "Karar ilkelerim",
    about: "Benim hakkımda",
    colophon: "Site nasıl yapıldı",
    contact: "Benimle iletişim",
  },
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
    principles: "Zor anlarda nasıl *karar* veriyorum",
    about: "Kısaca ben, nereden gelip nereye",
    // 40 characters, limit 40
    colophon: "Bu site adım adım nasıl ve neden yapıldı",
    contact: "Yeni bir fırsat için *mesaj* atman yeter",
  },
  // ~245 words (limit 250): one long paragraph, the colophon's worst case
  colophon:
    "Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi. Bu site de bir ürün gibi yapıldı ve her adımı yazılı bir kararla ilerledi..",
  credits: {
    heading: "Kaynaklar ve krediler",
    // three words each, the longest Turkish labels a group could plausibly get
    groups: {
      font: "Kullanılan yazı tipleri",
      photo: "Arşiv fotoğrafları (kamu)",
      ai: "Yapay zekâ araçları",
      asset: "Hazır görsel paketleri",
      data: "Veri kaynakları listesi",
    },
  },
  // 89 characters, limit 90
  principlesOpening:
    "Ne yaptığımdan çok, belirsizlik içinde nasıl karar verdiğim ve neden vazgeçtiğim anlatır.",
  about: {
    // ~118 words as read (limit 120); four chips, one of them two words with a dotless ı
    story:
      "Ben Gürcan. İstanbul Okan Üniversitesi'nde Bilişim Sistemleri ve Teknolojileri son sınıftayım; bu dönem Erasmus+ ile Łódź'dayım ve dönüşte mezun olacağım. Ürün tarafına bir soruyla geldim: hangi rol gerçekten bana uygun, hangisi yalnızca kulağa hoş geliyor? Cevabı bulmak için yedi rolün yolunu adım adım çizdim [SeeYourNextStep](#seeyournextstep) ve sonunda Product Manager'da karar kıldım. O günden beri dağınık, eksik ve çelişkili bilgiyi dokunulabilir ürünlere çeviriyorum: Erasmus şehirleri için bir harita [ErasmusMap](#erasmusmap), Atatürk'ün yolculuğu için bir başkası [ATAMap](#atamap), iklim krizini anlatan bir belgesel [İklim Krizi](#iklim-krizi). Tasarlıyor ve kodluyorum, çünkü bir ürünü uçtan uca anlamanın en kısa ve en dürüst yolu bu. Yürüyüşte değilsem muhtemelen film izliyorumdur.",
    // 60 characters each (limit 60)
    notes: [
      {
        after: "seeyournextstep",
        text: "ilk kullanıcısı bendim, ikinci kullanıcısı da annemdi ↑ ↑",
      },
      { after: "erasmusmap", text: "1602 şehir; hepsini gezmedim, gezeceğim de demiyorum (henüz)" },
      { after: "end", text: "ikisi aynı anda olmuyor, denedim; yokuşta film izlenmiyor :)" },
    ],
    // 158 characters, limit 160; one unbreakable segment
    credentials:
      "OKAN ÜNİVERSİTESİ · BİLİŞİM SİSTEMLERİ VE TEKNOLOJİLERİ · MEZUNİYET HAZİRAN 2027 · ERASMUS+ ŁÓDŹ, EKİM 2026 – ŞUBAT 2027 · GÜZ DÖNEMİ",
    goalsHeading: "Kısaca hedeflerim",
    // 59 words, limit 60
    goals:
      "Şubat 2027'den itibaren İstanbul'da tam zamanlı, uzun dönem bir Product stajı arıyorum; yaz boyunca kesintisiz devam edebilirim ve gerekirse hibrit çalışmaya da açığım. Bir ürün ekibinde kullanıcıyla konuşmayı, önceliklendirmeyi, ödünleşimleri yazmayı ve karar vermeyi gerçek sonuçlarla öğrenmek istiyorum. Uzun vadede hedefim, gerçekten kullanıcısı olan ve her gün açılan bir ürünün PM'i olmak.",
    // 119 characters, limit 120
    portraitCaption:
      "Mustafa Kemal Atatürk, 1922. Fotoğraf: Agence Meurisse · Kaynak: Bibliothèque nationale de France (Gallica, 2158 A)",
    flagLabel: "Türkiye Cumhuriyeti bayrağı",
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
    indicator: { current: "Şu an buradasın: {section}", contents: "Bütün içindekiler listesi" },
    walkman: {
      label: "Walkman: bu akşam için rastgele bir film ya da şarkı öner",
      result: "▶ Öneri: {title} ({year}) · {kind}",
      kinds: { film: "uzun film", song: "şarkı önerisi" },
      empty: "Kaset şu an başa sarıyor; biraz bekle ve bir daha bas.",
    },
    motion: { pause: "Bütün hareketi durdur", resume: "Hareketi yeniden başlat" },
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
    credits: "Bütün krediler",
  },
};
