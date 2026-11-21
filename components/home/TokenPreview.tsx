import { localePath, otherLocale, type Locale } from "@/lib/i18n";

/*
 * Temporary S5 page: proves the deploy pipeline, fonts and tokens on the live URL.
 * Replaced by the real hero in D1; its copy is intentionally not in content/.
 */

const copy = {
  tr: {
    label: "S5 · Kurulum · Token önizlemesi",
    hello: "Merhaba",
    lead: ["Yayın hattı ", "çalışıyor", "."],
    palette: "Temel palet",
    cassettes: "Kaset renkleri",
    type: "Tipografi",
    spacing: "Boşluk ölçeği (4 px taban)",
    sample: "Dağınık bilgiyi dokunulabilir ürünlere çeviriyorum.",
    handSample: "kenar notu · ğ ş ı İ",
    switchLabel: "English version",
  },
  en: {
    label: "S5 · Setup · Token preview",
    hello: "Hello",
    lead: ["The deploy pipeline ", "works", "."],
    palette: "Core palette",
    cassettes: "Cassette colors",
    type: "Typography",
    spacing: "Spacing scale (4 px base)",
    sample: "I turn scattered information into tangible products.",
    handSample: "a margin note · ğ ş ı İ",
    switchLabel: "Türkçe sürüm",
  },
} satisfies Record<Locale, unknown>;

const coreColors = [
  { name: "paper", className: "bg-paper" },
  { name: "ink", className: "bg-ink" },
  { name: "ink-muted", className: "bg-ink-muted" },
  { name: "line", className: "bg-line" },
  { name: "accent", className: "bg-accent" },
];

// Order and catalog numbers follow the shelf in CONTENT §2
const cassettes = [
  { id: "GK-01", name: "mustard", className: "bg-cassette-mustard text-on-cassette-mustard" },
  {
    id: "GK-02",
    name: "terracotta",
    className: "bg-cassette-terracotta text-on-cassette-terracotta",
  },
  { id: "GK-03", name: "midnight", className: "bg-cassette-midnight text-on-cassette-midnight" },
  { id: "GK-04", name: "burgundy", className: "bg-cassette-burgundy text-on-cassette-burgundy" },
  { id: "GK-05", name: "petrol", className: "bg-cassette-petrol text-on-cassette-petrol" },
  { id: "GK-06", name: "olive", className: "bg-cassette-olive text-on-cassette-olive" },
  { id: "GK-07", name: "rose", className: "bg-cassette-rose text-on-cassette-rose" },
];

const typeScale = [
  { token: "text-h1", className: "text-h1 font-bold font-stretch-condensed" },
  { token: "text-h2", className: "text-h2 font-bold font-stretch-condensed" },
  { token: "text-h3", className: "text-h3 font-medium" },
  { token: "text-lead", className: "text-lead" },
  { token: "text-body", className: "text-body" },
  { token: "text-small", className: "text-small text-ink-muted" },
];

const spacingSteps = [
  { px: 4, className: "w-1" },
  { px: 8, className: "w-2" },
  { px: 12, className: "w-3" },
  { px: 16, className: "w-4" },
  { px: 24, className: "w-6" },
  { px: 32, className: "w-8" },
  { px: 48, className: "w-12" },
  { px: 64, className: "w-16" },
  { px: 96, className: "w-24" },
  { px: 128, className: "w-32" },
  { px: 192, className: "w-48" },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-6 border-b border-line pb-2 font-mono text-label text-ink-muted uppercase">
      {children}
    </h2>
  );
}

export function TokenPreview({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const target = otherLocale(locale);

  return (
    <main className="mx-auto max-w-page px-(--gutter) py-16 md:py-24">
      <header className="mb-16 md:mb-24">
        <p className="mb-4 font-mono text-label text-accent uppercase">{t.label}</p>
        <h1 className="text-display font-black uppercase font-stretch-extra-condensed">
          {t.hello}
        </h1>
        <p className="mt-4 max-w-prose text-lead">
          {t.lead[0]}
          <em className="font-accent">{t.lead[1]}</em>
          {t.lead[2]}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 xl:grid-cols-12">
        <section className="xl:col-span-5">
          <SectionTitle>{t.palette}</SectionTitle>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {coreColors.map((color) => (
              <li key={color.name}>
                <div className={`aspect-square rounded-md border border-line ${color.className}`} />
                <p className="mt-2 font-mono text-label">{color.name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="xl:col-span-7">
          <SectionTitle>{t.cassettes}</SectionTitle>
          <ul className="flex h-64 gap-2 md:h-80">
            {cassettes.map((tape) => (
              <li
                key={tape.id}
                className={`flex min-w-0 flex-1 items-center justify-between rounded-sm px-1 py-3 [writing-mode:vertical-rl] ${tape.className}`}
              >
                <span className="font-mono text-label">{tape.id}</span>
                <span lang="en" className="text-small font-bold uppercase font-stretch-condensed">
                  {tape.name}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="md:col-span-2 xl:col-span-7">
          <SectionTitle>{t.type}</SectionTitle>
          <ul className="space-y-6">
            {typeScale.map((step) => (
              <li key={step.token}>
                <p className="mb-1 font-mono text-label text-ink-muted">{step.token}</p>
                <p className={step.className}>{t.sample}</p>
              </li>
            ))}
            <li>
              <p className="mb-1 font-mono text-label text-ink-muted">font-accent · font-hand</p>
              <p className="text-h3">
                <em className="font-accent">dokunulabilir</em>{" "}
                <span className="font-hand text-accent">{t.handSample}</span>
              </p>
            </li>
          </ul>
        </section>

        <section className="md:col-span-2 xl:col-span-5">
          <SectionTitle>{t.spacing}</SectionTitle>
          <ul className="space-y-2">
            {spacingSteps.map((step) => (
              <li key={step.px} className="flex items-center gap-4">
                <span className="w-12 text-right font-mono text-label text-ink-muted">
                  {step.px}
                </span>
                <span className={`h-3 rounded-sm bg-accent ${step.className}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-24 border-t border-line pt-6">
        <a
          href={localePath(target)}
          hrefLang={target}
          lang={target}
          className="font-mono text-label uppercase underline underline-offset-4"
        >
          {t.switchLabel}
        </a>
      </footer>
    </main>
  );
}
