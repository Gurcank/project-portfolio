import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { getCvHref, getProfile, getSiteCopy, type Profile, type SiteCopy } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type HomeViewProps = {
  locale: Locale;
  copy: SiteCopy;
  profile: Profile;
  cvHref?: string;
};

/** Orders the sections and hands each one only the copy it renders (client islands get no dictionary). */
export function HomeView({ locale, copy, profile, cvHref }: HomeViewProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-(--z-overlay) rounded-sm bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {copy.microcopy.skipToContent}
      </a>
      <SiteHeader locale={locale} name={profile.name} copy={copy} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero name={profile.name} copy={copy.hero} />
        <Contact
          profile={profile}
          cvHref={cvHref}
          heading={copy.sections.contact}
          labels={copy.microcopy.contact}
        />
      </main>
      <SiteFooter copy={copy.footer} />
    </>
  );
}

/** The real page: reads content/ through lib/content. The dev-only break-ui route feeds HomeView fixtures instead. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <HomeView
      locale={locale}
      copy={getSiteCopy(locale)}
      profile={getProfile()}
      cvHref={getCvHref(locale)}
    />
  );
}
