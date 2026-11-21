import { CaseStudyOverlay, type OverlayStudy } from "@/components/case-study/CaseStudyOverlay";
import { CaseStudyPanel } from "@/components/case-study/CaseStudyPanel";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Shelf } from "@/components/sections/Shelf";
import {
  getCvHref,
  getProfile,
  getProjects,
  getSiteCopy,
  type Profile,
  type ProjectView,
  type SiteCopy,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type HomeViewProps = {
  locale: Locale;
  copy: SiteCopy;
  profile: Profile;
  projects: ProjectView[];
  cvHref?: string;
};

/** Header data the client overlay needs; the heavy track text stays in server-rendered panels. */
function toOverlayStudy(project: ProjectView, projects: ProjectView[]): OverlayStudy {
  const [role = "", year = "", team = ""] = project.study.card.credits.split(" · ");
  const next = projects.find((item) => item.slug === project.next) ?? project;
  return {
    slug: project.slug,
    catalog: project.catalog,
    color: project.color,
    title: project.study.title,
    subtitle: project.study.subtitle,
    credits: { role, year, team },
    readingTime: project.study.readingTime,
    links: project.links,
    next: { slug: next.slug, title: next.study.title },
  };
}

/** Orders the sections and hands each one only the copy it renders (client islands get no dictionary). */
export function HomeView({ locale, copy, profile, projects, cvHref }: HomeViewProps) {
  const overlayLabels = copy.microcopy.overlay;

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
        <Shelf
          heading={copy.sections.work}
          projects={projects}
          openLabel={copy.microcopy.cassette.open}
        />
        <Contact
          profile={profile}
          cvHref={cvHref}
          heading={copy.sections.contact}
          labels={copy.microcopy.contact}
        />
      </main>
      <SiteFooter copy={copy.footer} />
      <CaseStudyOverlay
        labels={overlayLabels}
        studies={projects.map((project) => toOverlayStudy(project, projects))}
        panels={Object.fromEntries(
          projects.map((project) => [
            project.slug,
            <CaseStudyPanel key={project.slug} project={project} labels={overlayLabels} />,
          ]),
        )}
      />
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
      projects={getProjects(locale)}
      cvHref={getCvHref(locale)}
    />
  );
}
