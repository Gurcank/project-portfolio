import { CaseStudyOverlay, type OverlayStudy } from "@/components/case-study/CaseStudyOverlay";
import { CaseStudyPanel } from "@/components/case-study/CaseStudyPanel";
import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import { MotionProvider } from "@/components/experience/MotionProvider";
import { CassettePillLoader } from "@/components/experience/CassettePillLoader";
import { DecorLoader } from "@/components/experience/DecorLoader";
import { MascotLoader } from "@/components/experience/MascotLoader";
import { MotionToggle } from "@/components/experience/MotionToggle";
import { SectionIndicator } from "@/components/experience/SectionIndicator";
import { ToneController } from "@/components/experience/ToneController";
import { Walkman } from "@/components/experience/Walkman";
import { DayNightSeam } from "@/components/home/DayNightSeam";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Colophon } from "@/components/sections/Colophon";
import { Intro } from "@/components/intro/Intro";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Principles } from "@/components/sections/Principles";
import { Shelf } from "@/components/sections/Shelf";
import {
  getCreditGroups,
  getDecor,
  getPortrait,
  getPrinciples,
  getProfile,
  getProjects,
  getSiteCopy,
  getWalkmanItems,
  type Portrait,
  type PrincipleView,
  type Profile,
  type ProjectView,
  type SiteCopy,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { serializeJsonLd } from "@/lib/serialize-json-ld";
import { personJsonLd } from "@/lib/structured-data";

type HomeViewProps = {
  locale: Locale;
  copy: SiteCopy;
  profile: Profile;
  projects: ProjectView[];
  principles: PrincipleView[];
  portrait?: Portrait;
  creditGroups: ReturnType<typeof getCreditGroups>;
  walkmanItems: ReturnType<typeof getWalkmanItems>;
  decor: ReturnType<typeof getDecor>;
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
    tracks: project.study.tracks.map(({ id, title }) => ({ id, title })),
  };
}

/** Orders the sections and hands each one only the copy it renders (client islands get no dictionary). */
export function HomeView({
  locale,
  copy,
  profile,
  projects,
  principles,
  portrait,
  creditGroups,
  walkmanItems,
  decor,
}: HomeViewProps) {
  const walkman = (placement: "fixed" | "inline") => (
    <ExperienceBoundary name={`walkman-${placement}`}>
      <Walkman placement={placement} items={walkmanItems} labels={copy.microcopy.walkman} />
    </ExperienceBoundary>
  );

  const overlayLabels = copy.microcopy.overlay;

  return (
    // The shelf covers and the overlay share one Motion context: their reels fly between them
    <MotionProvider>
      <a
        href="#main"
        className="sr-only z-(--z-overlay) rounded-sm bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {copy.microcopy.skipToContent}
      </a>
      <SiteHeader locale={locale} name={profile.name} copy={copy} />
      {/* overflow-x-clip: the hero desk's cursor glides in from past the right edge; at 1280–1440 px that
          raised a horizontal scrollbar for ~2 s (the page jumped). clip, not hidden: no scroll container,
          so vertical scrolling and sticky children are untouched */}
      <main id="main" tabIndex={-1} className="overflow-x-clip focus:outline-none">
        <Hero name={profile.name} copy={copy.hero} />
        <Shelf
          heading={copy.sections.work}
          projects={projects}
          openLabel={copy.microcopy.cassette.open}
        />
        <Principles
          heading={copy.sections.principles}
          opening={copy.principlesOpening}
          principles={principles}
          openLabel={copy.microcopy.cassette.open}
        />
        <About
          heading={copy.sections.about}
          about={copy.about}
          projects={projects}
          openLabel={copy.microcopy.cassette.open}
          portrait={portrait}
        />
        <DayNightSeam />
        <Colophon
          heading={copy.sections.colophon}
          text={copy.colophon}
          credits={copy.credits}
          groups={creditGroups}
        />
        <Contact
          profile={profile}
          heading={copy.sections.contact}
          labels={copy.microcopy.contact}
        />
      </main>
      <SiteFooter
        copy={copy.footer}
        extras={
          // The pause control lives here at every width: always reachable, never over the content
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <MotionToggle labels={copy.microcopy.motion} />
            {walkman("inline")}
          </div>
        }
      />
      {walkman("fixed")}
      <ExperienceBoundary name="mascot">
        <MascotLoader />
      </ExperienceBoundary>
      <ExperienceBoundary name="cassette-pill">
        <CassettePillLoader label={copy.microcopy.cassette.pill} />
      </ExperienceBoundary>
      <ExperienceBoundary name="decor">
        <DecorLoader {...decor} />
      </ExperienceBoundary>
      {/* Extras on top of the nav: if they fail, the header links still work (ROADMAP D6) */}
      <ExperienceBoundary name="tone">
        <ToneController />
      </ExperienceBoundary>
      <ExperienceBoundary name="section-indicator">
        <SectionIndicator
          labels={copy.microcopy.indicator}
          nav={copy.nav}
          tapes={projects.map((project) => ({
            slug: project.slug,
            catalog: project.catalog,
            title: project.study.title,
          }))}
        />
      </ExperienceBoundary>
      {/* Last in the page: it is a fixed curtain, so its place in the DOM doesn't change how it looks,
          and the hero (the LCP element) is parsed first */}
      <Intro copy={copy.hero.intro} />
      <CaseStudyOverlay
        nowLabel={copy.microcopy.indicator.current}
        labels={overlayLabels}
        studies={projects.map((project) => toOverlayStudy(project, projects))}
        panels={Object.fromEntries(
          projects.map((project) => [
            project.slug,
            <CaseStudyPanel key={project.slug} project={project} labels={overlayLabels} />,
          ]),
        )}
      />
    </MotionProvider>
  );
}

/** The real page: reads content/ through lib/content. The dev-only break-ui route feeds HomeView fixtures instead. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(locale)) }}
      />
      <HomeView
        locale={locale}
        copy={getSiteCopy(locale)}
        profile={getProfile()}
        projects={getProjects(locale)}
        principles={getPrinciples(locale)}
        portrait={getPortrait()}
        creditGroups={getCreditGroups(locale)}
        walkmanItems={getWalkmanItems()}
        decor={getDecor(locale)}
      />
    </>
  );
}
