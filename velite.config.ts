import { defineCollection, defineConfig, s } from "velite";

import { checkAboutLinks, checkCredits, checkPrinciples } from "./lib/content/integrity";
import { hasMalformedChip, storyPlainText } from "./lib/content/story";
import { parseTracks } from "./lib/content/tracks";
import { isLocale, locales } from "./lib/i18n";
import { countWords, hasSingleEmphasis, stripEmphasis } from "./lib/text";

/*
 * Content schemas (ARCHITECTURE §3). A rule broken in content/ fails the build,
 * so the live site stays on the previous version. The site schema grows slice by slice:
 * each slice adds only the fields it renders, so no slice has to ship copy for sections that don't exist yet.
 */

const emphasized = (max?: number) =>
  s
    .string()
    .refine(hasSingleEmphasis, "needs exactly one *emphasis* (CONTENT §0)")
    .refine((value) => max === undefined || stripEmphasis(value).length <= max, {
      message: `longer than ${max} characters (CONTENT §0)`,
    });

// CONTENT §0 budgets: buttons and labels ≤ 3 words, errors and empty states ≤ 15 words
const words = (max: number) =>
  s.string().refine((value) => countWords(value) <= max, `more than ${max} words (CONTENT §0)`);
const button = words(3);
const message = words(15);
const navItem = button.pipe(s.string().max(16));

// Templates such as "{project} case study'sini aç": the placeholder is filled in by the component
const withPlaceholder = (name: string) =>
  s.string().refine((value) => value.includes(`{${name}}`), `needs the {${name}} placeholder`);

const profile = defineCollection({
  name: "Profile",
  pattern: "profile.yaml",
  single: true,
  schema: s.object({
    name: s.string().max(60),
    email: s.string().email(),
    linkedin: s.string().url(),
    github: s.string().url(),
  }),
});

const creditKinds = ["font", "photo", "asset", "ai", "data"] as const;
// Every family lib/fonts.ts loads must be credited (SPEC §14.5)
const fontNames = ["Archivo", "Fraunces", "Geist Mono", "Caveat"];

const site = defineCollection({
  name: "SiteCopy",
  pattern: "site/*.yaml",
  schema: s
    .object({
      path: s.path(),
      meta: s.object({ title: s.string().max(60), description: s.string().max(160) }),
      // 16: name + nav item + language button still share one row at 320px (/break-ui)
      nav: s.object({
        work: navItem,
        principles: navItem,
        about: navItem,
        colophon: navItem,
        contact: navItem,
      }),
      hero: s.object({
        role: emphasized(60),
        label: s.string().max(80),
        primaryCta: button.pipe(s.string().max(24)),
        secondaryCta: button.pipe(s.string().max(24)),
        // D10 intro (CONTENT §4): three words, then the closing line; the skip hint is visible text
        intro: s.object({
          words: s.array(s.string().max(16)).length(3),
          closing: s.string().max(30),
          skip: message,
        }),
        // D9 work desk (CONTENT §4): decor beside the hero; brand names as plain text only (ADR-16)
        desk: s.object({
          ticket: s
            .string()
            .max(60)
            .refine((value) => value.split(" · ").length === 3, "ticket needs ID · TITLE · STATUS"),
          notification: s
            .string()
            .max(40)
            .refine(
              (value) => value.split(" · ").length === 2,
              "notification needs SOURCE · MESSAGE",
            ),
          cursor: s.string().max(16),
        }),
      }),
      // 40: keeps a section heading to three lines at 375px (/break-ui)
      sections: s.object({
        work: emphasized(40),
        principles: emphasized(40),
        // "Hakkımda" / "About": the one heading CONTENT §5 gives no accent word
        about: s.string().max(40),
        // "Bu site nasıl yapıldı" / "How this site was made": no accent word in CONTENT §5 either
        colophon: s.string().max(40),
        contact: emphasized(40),
      }),
      // INS-18 one-sentence screen: one line on desktop, three at most on a phone
      principlesOpening: s.string().max(90),
      // CONTENT §0: ≤ 250 words
      colophon: words(250),
      credits: s.object({
        heading: button,
        // A label per kind of credit; a kind used in credits.yaml without a label fails in prepare
        groups: s.record(s.enum(creditKinds), button),
      }),
      about: s.object({
        // CONTENT §0: ≤ 120 words as read (chip labels count, link syntax doesn't)
        story: s
          .string()
          .refine((value) => !hasMalformedChip(value), "broken chip: write [Label](#slug)")
          .refine(
            (value) => countWords(storyPlainText(value)) <= 120,
            "more than 120 words (CONTENT §0)",
          ),
        // A handwritten aside after a chip (its slug) or after the last sentence ("end");
        // which slugs are allowed is a cross-file rule, checked in prepare
        notes: s.array(s.object({ after: s.string(), text: s.string().max(60) })).max(3),
        credentials: s.string().max(160),
        goalsHeading: button,
        goals: words(60),
        // From the CV (user decision, 2026-11-27): one row per group, the items as one written list
        skills: s.object({
          heading: button,
          groups: s
            .array(s.object({ label: s.string().max(32), items: s.string().max(140) }))
            .min(1)
            .max(6),
        }),
        portraitCaption: s.string().max(120),
        flagLabel: button,
      }),
      microcopy: s.object({
        skipToContent: button,
        languageSwitch: s.object({ label: s.string().length(2), accessibleName: button }),
        contact: s.object({
          copyEmail: button,
          copied: button,
          copyFailed: message,
          linkedin: button,
          github: button,
        }),
        // pill: the cursor's decorative "▶ Open" over a tape (CONTENT §8); the link keeps the real name
        cassette: s.object({ open: withPlaceholder("project"), pill: button }),
        // INS-07 section indicator and its J-card contents (CONTENT §8)
        indicator: s.object({ current: withPlaceholder("section"), contents: button }),
        // D7 walkman and pause control (CONTENT §8)
        walkman: s.object({
          // "Walkman: suggest a random film or song" — an accessible name, not a button label
          label: s.string().max(60),
          result: withPlaceholder("title")
            .pipe(withPlaceholder("year"))
            .pipe(withPlaceholder("kind")),
          kinds: s.object({ film: button, song: button }),
          empty: message,
        }),
        motion: s.object({ pause: button, resume: button }),
        overlay: s.object({
          sideA: button,
          sideB: button,
          close: button,
          readTime: withPlaceholder("time"),
          live: button,
          source: button,
          next: withPlaceholder("project"),
          // no word budget: the approved "Back to the shelf" is four words
          back: s.string().max(24),
          credits: s.object({ role: button, year: button, team: button }),
          tracklist: button,
          liner: button,
        }),
      }),
      // cta has no word budget: the approved "Back to the shelf" is four words
      notFound: s.object({ title: message, body: message, cta: s.string().max(24) }),
      footer: s.object({
        copyright: s.string().max(60),
        madeIn: s.string().max(80),
        credits: button,
      }),
    })
    .transform(({ path, ...rest }, { addIssue }) => {
      const locale = path.replace(/^site\//, "");
      if (!isLocale(locale)) {
        addIssue({ code: "custom", message: `site/${locale}.yaml is not a supported locale` });
        return { ...rest, locale: "tr" as const };
      }
      return { ...rest, locale };
    }),
});

const projectSlugs = [
  "erasmusmap",
  "novera-mobility",
  "seeyournextstep",
  "atamap",
  "iklim-krizi",
  "nature-sport-handbook",
  "idddergi",
] as const;
const cassetteColors = [
  "mustard",
  "terracotta",
  "midnight",
  "burgundy",
  "petrol",
  "olive",
  "rose",
] as const;

const projects = defineCollection({
  name: "Project",
  pattern: "projects/*/project.yaml",
  schema: s
    .object({
      path: s.path(),
      catalog: s.string().regex(/^GK-\d{2}$/, "catalog numbers look like GK-01"),
      order: s.number().int().min(1).max(7),
      featured: s.boolean(),
      color: s.enum(cassetteColors),
      year: s.number().int().min(2000).max(2100),
      // SPEC §6: no humour, margin notes or playful microcopy for this tape
      respectful: s.boolean(),
      // A missing link is simply not shown (CONTENT §10)
      links: s.object({ live: s.string().url().optional(), source: s.string().url().optional() }),
    })
    .transform(({ path, ...rest }, { addIssue }) => {
      const slug = path.split("/")[1] ?? "";
      const known = projectSlugs.find((candidate) => candidate === slug);
      if (!known) addIssue({ code: "custom", message: `unknown project folder "${slug}"` });
      return { ...rest, slug: known ?? projectSlugs[0] };
    }),
});

const caseStudies = defineCollection({
  name: "CaseStudy",
  pattern: "projects/*/{tr,en}.md",
  schema: s
    .object({
      path: s.path(),
      title: s.string().max(40),
      subtitle: emphasized(70),
      // CONTENT §0 budgets; credits is "ROLE · YEAR · TEAM", shown as three labelled parts
      card: s.object({
        problem: s.string().max(90),
        credits: s
          .string()
          .max(60)
          .refine((value) => value.split(" · ").length === 3, "credits need ROLE · YEAR · TEAM"),
        result: s.string().max(60),
      }),
      liner: s.string().max(300),
      body: s.raw(),
    })
    .transform(({ path, body, ...rest }, { addIssue }) => {
      const [, slug = "", locale = ""] = path.split("/");
      const fallback = {
        ...rest,
        slug,
        locale: "tr" as const,
        tracks: [],
        words: 0,
        readingTime: "0:00",
      };
      if (!isLocale(locale)) {
        addIssue({ code: "custom", message: `${path}.md is not a supported locale` });
        return fallback;
      }
      try {
        return { ...rest, slug, locale, ...parseTracks(body, locale) };
      } catch (error) {
        addIssue({ code: "custom", message: `${path}.md: ${(error as Error).message}` });
        return { ...fallback, locale };
      }
    }),
});

const l10n = (max: number) => s.object({ tr: s.string().max(max), en: s.string().max(max) });

// content/principles.yaml is one list: each item is a principle (CONTENT §5 budgets)
const principles = defineCollection({
  name: "Principle",
  pattern: "principles.yaml",
  schema: s.object({
    order: s.number().int().min(1),
    project: s.enum(projectSlugs),
    condition: l10n(70),
    action: l10n(120),
  }),
});

// Atatürk portrait: null until a verified public-domain file is in place, and then it needs its source
// content/credits.yaml (ARCHITECTURE §3): one list, grouped by kind on the page
const credits = defineCollection({
  name: "Credit",
  pattern: "credits.yaml",
  schema: s.object({
    kind: s.enum(creditKinds),
    name: s.string().max(60),
    author: s.string().max(120).optional(),
    source: s.string().url(),
    license: s.string().max(40).optional(),
    licenseUrl: s.string().url().optional(),
    usedFor: l10n(80),
  }),
});

// content/taste: names and years only (SPEC §6: no posters, ratings or Letterboxd data)
const titleLang = s.enum(["tr", "en"]);
const films = defineCollection({
  name: "Film",
  pattern: "taste/films.yaml",
  schema: s.object({
    title: s.string().max(80),
    // "2001–2003" for a trilogy
    year: s.string().regex(/^\d{4}(–\d{4})?$/, "year looks like 2003 or 2001–2003"),
    favorite: s.boolean(),
    lang: titleLang,
  }),
});
const songs = defineCollection({
  name: "Song",
  pattern: "taste/songs.yaml",
  schema: s.object({
    artist: s.string().max(60),
    title: s.string().max(80),
    year: s.number().int().min(1900).max(2100),
    lang: titleLang,
  }),
});

const records = defineCollection({
  name: "Record",
  pattern: "taste/records.yaml",
  schema: s.object({ artist: s.string().max(60), album: s.string().max(60), lang: titleLang }),
});
// One sprite per place; the list here must match components/pixel/sprites/stamps.ts
const stampSprites = ["lycian", "dilek", "kaz", "alps", "fethiye", "datca", "blacksea"] as const;
const stamps = defineCollection({
  name: "Stamp",
  pattern: "taste/stamps.yaml",
  schema: s.object({
    order: s.number().int().min(1),
    sprite: s.enum(stampSprites),
    name: l10n(40),
  }),
});

const respect = defineCollection({
  name: "Respect",
  pattern: "respect.yaml",
  single: true,
  schema: s.object({
    portrait: s
      .object({
        image: s.image(),
        // Where the photo was verified (archive record), and the rights statement found there
        source: s.string().url(),
        rights: s.string().min(1),
      })
      .nullable(),
  }),
});

/** Cross-file rules a single schema can't see (ARCHITECTURE §3). Throwing stops the build. */
function checkProjectIntegrity(
  projectList: { slug: string; catalog: string; order: number; featured: boolean }[],
  studies: { slug: string; locale: string }[],
) {
  const problems: string[] = [];
  const duplicates = (values: (string | number)[]) =>
    values.filter((value, index) => values.indexOf(value) !== index);

  if (projectList.length !== projectSlugs.length) {
    problems.push(`expected ${projectSlugs.length} projects, found ${projectList.length}`);
  }
  for (const [field, values] of [
    ["slug", projectList.map((p) => p.slug)],
    ["catalog", projectList.map((p) => p.catalog)],
    ["order", projectList.map((p) => p.order)],
  ] as const) {
    const repeated = duplicates([...values]);
    if (repeated.length > 0) problems.push(`duplicate ${field}: ${repeated.join(", ")}`);
  }
  const featuredCount = projectList.filter((p) => p.featured).length;
  if (featuredCount !== 1)
    problems.push(`exactly one featured project expected, found ${featuredCount}`);

  for (const project of projectList) {
    for (const locale of locales) {
      if (!studies.some((study) => study.slug === project.slug && study.locale === locale)) {
        problems.push(`content/projects/${project.slug}/${locale}.md is missing`);
      }
    }
  }
  if (problems.length > 0) throw new Error(`content/projects:\n  ${problems.join("\n  ")}`);
}

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  // Schema errors only fail the build because package.json runs `velite build --strict`:
  // the CLI's own default (false) overrides a `strict` set here.
  collections: {
    profile,
    site,
    projects,
    caseStudies,
    principles,
    respect,
    credits,
    films,
    songs,
    records,
    stamps,
  },
  // TR and EN always ship together: a missing language file fails the build (CLAUDE.md)
  prepare: ({ site, projects, caseStudies, principles, respect, credits, films }) => {
    const missing = locales.filter((locale) => !site.some((copy) => copy.locale === locale));
    if (missing.length > 0) {
      throw new Error(`content/site: missing ${missing.map((l) => `${l}.yaml`).join(", ")}`);
    }
    checkProjectIntegrity(projects, caseStudies);
    checkPrinciples(principles);
    checkAboutLinks(site, projects);
    checkCredits({ credits, site, portraitSource: respect.portrait?.source, fonts: fontNames });
    // SPEC §6: 14 favourite films (they become VHS spines in D8)
    const favorites = films.filter((film) => film.favorite).length;
    if (favorites !== 14)
      throw new Error(`content/taste/films.yaml: expected 14 favourites, found ${favorites}`);
  },
});
