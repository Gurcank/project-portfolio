// The only entry point to generated content: swapping Velite for another tool touches this folder alone (ADR-09).
import {
  caseStudies,
  credits,
  films,
  principles,
  profile,
  records,
  projects,
  respect,
  site,
  songs,
  stamps,
  type CaseStudy,
  type Profile,
  type Project,
  type SiteCopy,
} from "#content";

import type { Locale } from "@/lib/i18n";
import type { WalkmanItem } from "@/lib/walkman";
import type { DecorData } from "@/components/experience/DecorLayer";

export type { CaseStudy, Profile, Project, SiteCopy };
export type { Track, TrackId } from "./tracks";
export { parseStory, type StorySegment } from "./story";

/** A cover screenshot with its text in one language. */
export type ProjectCover = {
  image: NonNullable<Project["cover"]>["image"];
  alt: string;
  credit?: string;
};

/** A project with its case study in one language and the tape that follows it on the shelf. */
export type ProjectView = Omit<Project, "cover" | "phone"> & {
  cover?: ProjectCover;
  /** v4: the site on a phone */
  phone?: ProjectCover;
  study: CaseStudy;
  next: Project["slug"];
};
export type ProjectSlug = Project["slug"];

export function getSiteCopy(locale: Locale): SiteCopy {
  const copy = site.find((entry) => entry.locale === locale);
  // Velite's prepare step already fails the build on a missing language; this guards the type
  if (!copy) throw new Error(`content/site/${locale}.yaml is missing`);
  return copy;
}

export function getProfile(): Profile {
  return profile;
}

/** Shelf order; the last tape's "next" wraps to the first so the overlay never dead-ends. */
export function getProjects(locale: Locale): ProjectView[] {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return ordered.map((project, index) => {
    const study = caseStudies.find(
      (entry) => entry.slug === project.slug && entry.locale === locale,
    );
    if (!study) throw new Error(`content/projects/${project.slug}/${locale}.md is missing`);
    const next = ordered[(index + 1) % ordered.length] ?? project;
    const { cover, phone, ...rest } = project;
    const inLocale = (shot: Project["cover"]): ProjectCover | undefined =>
      shot && { image: shot.image, alt: shot.alt[locale], credit: shot.credit?.[locale] };
    return {
      ...rest,
      cover: inLocale(cover),
      phone: inLocale(phone),
      study,
      next: next.slug,
    };
  });
}

/** A principle in one language, with the tape it links to (CONTENT §5). */
export type PrincipleView = {
  order: number;
  condition: string;
  action: string;
  project: Pick<ProjectView, "slug" | "catalog" | "color"> & { title: string };
};

export function getPrinciples(locale: Locale): PrincipleView[] {
  const tapes = getProjects(locale);
  return [...principles]
    .sort((a, b) => a.order - b.order)
    .map((principle) => {
      const tape = tapes.find((project) => project.slug === principle.project);
      if (!tape) throw new Error(`content/principles.yaml: unknown tape ${principle.project}`);
      return {
        order: principle.order,
        condition: principle.condition[locale],
        action: principle.action[locale],
        project: {
          slug: tape.slug,
          catalog: tape.catalog,
          color: tape.color,
          title: tape.study.title,
        },
      };
    });
}

export type Portrait = NonNullable<(typeof respect)["portrait"]>;

/** The Atatürk portrait, or undefined while no verified file is in place (then nothing renders). */
export function getPortrait(): Portrait | undefined {
  return respect.portrait ?? undefined;
}

const creditOrder = ["font", "photo", "art", "asset", "ai", "data"] as const;
export type CreditKind = (typeof creditOrder)[number];

/** One credit in one language. */
export type CreditView = {
  name: string;
  author?: string;
  source: string;
  license?: string;
  licenseUrl?: string;
  usedFor: string;
};

/** Credits grouped by kind in a fixed order; kinds with no entry are left out (ROADMAP D5). */
export function getCreditGroups(locale: Locale): { kind: CreditKind; items: CreditView[] }[] {
  return creditOrder
    .map((kind) => ({
      kind,
      items: credits
        .filter((credit) => credit.kind === kind)
        .map(({ name, author, source, license, licenseUrl, usedFor }) => ({
          name,
          author,
          source,
          license,
          licenseUrl,
          usedFor: usedFor[locale],
        })),
    }))
    .filter((group) => group.items.length > 0);
}

/** Every film and song the walkman can suggest, in one list (names and years only, SPEC §6). */
export function getWalkmanItems(): WalkmanItem[] {
  return [
    ...films.map(({ title, year, lang }) => ({ title, year, kind: "film" as const, lang })),
    ...songs.map(({ artist, title, year, lang }) => ({
      title: `${artist} — ${title}`,
      year: String(year),
      kind: "song" as const,
      lang,
    })),
  ];
}

/** The room decor (D8): favourite films, records and nature stamps, in one language. */
export function getDecor(locale: Locale): DecorData {
  return {
    films: films.filter((film) => film.favorite).map(({ title, year }) => ({ title, year })),
    records: records.map(({ artist, album, lang }) => ({ artist, album, lang })),
    stamps: [...stamps]
      .sort((a, b) => a.order - b.order)
      .map(({ sprite, name }) => ({ sprite, name: name[locale] })),
  };
}
