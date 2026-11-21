import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { otherLocale, type Locale } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/content";

type SiteHeaderProps = {
  locale: Locale;
  name: string;
  copy: Pick<SiteCopy, "nav" | "microcopy">;
};

/*
 * Only sections that exist are linked (ROADMAP: a missing section is never in nav).
 * In D1 that is Contact alone, so mobile and desktop share one row: a single CTA + language (INS-02).
 */
export function SiteHeader({ locale, name, copy }: SiteHeaderProps) {
  return (
    <header className="mx-auto flex max-w-page items-center justify-between gap-4 px-(--gutter) py-4">
      <a href="#top" className="text-small font-bold">
        {name}
      </a>
      <nav className="flex items-center gap-2">
        <a
          href="#contact"
          className="inline-flex min-h-12 items-center px-3 font-mono text-label uppercase underline-offset-4 hover:underline"
        >
          {copy.nav.contact}
        </a>
        <LanguageSwitch
          target={otherLocale(locale)}
          label={copy.microcopy.languageSwitch.label}
          accessibleName={copy.microcopy.languageSwitch.accessibleName}
        />
      </nav>
    </header>
  );
}
