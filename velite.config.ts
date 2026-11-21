import { existsSync } from "node:fs";
import { join } from "node:path";

import { defineCollection, defineConfig, s } from "velite";

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

// A CV path that points at nothing would render a broken download link
const publicFile = s
  .string()
  .regex(/^\/cv\/[\w-]+\.pdf$/, "CV paths look like /cv/<name>.pdf")
  .refine((path) => existsSync(join(process.cwd(), "public", path)), "file not found in public/");

const profile = defineCollection({
  name: "Profile",
  pattern: "profile.yaml",
  single: true,
  schema: s.object({
    name: s.string().max(60),
    email: s.string().email(),
    linkedin: s.string().url(),
    github: s.string().url(),
    cv: s.object({ tr: publicFile.optional(), en: publicFile.optional() }),
  }),
});

const site = defineCollection({
  name: "SiteCopy",
  pattern: "site/*.yaml",
  schema: s
    .object({
      path: s.path(),
      meta: s.object({ title: s.string().max(60), description: s.string().max(160) }),
      // 16: name + nav item + language button still share one row at 320px (/break-ui)
      nav: s.object({ contact: button.pipe(s.string().max(16)) }),
      hero: s.object({
        role: emphasized(60),
        label: s.string().max(80),
        primaryCta: button.pipe(s.string().max(24)),
      }),
      // 40: keeps the contact heading to three lines at 375px (/break-ui)
      sections: s.object({ contact: emphasized(40) }),
      microcopy: s.object({
        skipToContent: button,
        languageSwitch: s.object({ label: s.string().length(2), accessibleName: button }),
        contact: s.object({
          copyEmail: button,
          copied: button,
          copyFailed: message,
          linkedin: button,
          github: button,
          downloadCv: button,
        }),
      }),
      // cta has no word budget: the approved "Back to the shelf" is four words
      notFound: s.object({ title: message, body: message, cta: s.string().max(24) }),
      footer: s.object({ copyright: s.string().max(60), madeIn: s.string().max(80) }),
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
  collections: { profile, site },
  // TR and EN always ship together: a missing language file fails the build (CLAUDE.md)
  prepare: ({ site }) => {
    const missing = locales.filter((locale) => !site.some((copy) => copy.locale === locale));
    if (missing.length > 0) {
      throw new Error(`content/site: missing ${missing.map((l) => `${l}.yaml`).join(", ")}`);
    }
  },
});
