import { defineCollection, defineConfig, s } from "velite";

/*
 * Content schemas (ARCHITECTURE §3). A rule broken in content/ fails the build,
 * so the live site stays on the previous version. S5 defines profile + site;
 * projects, principles, taste and credits arrive with their slices.
 */

// Registered in D1 together with content/profile.yaml: Velite exits non-zero on an empty single collection.
export const profile = defineCollection({
  name: "Profile",
  pattern: "profile.yaml",
  single: true,
  schema: s.object({
    name: s.string().max(60),
    email: s.string().email(),
    linkedin: s.string().url(),
    github: s.string().url(),
    // public/cv paths; a missing locale hides that language's CV button
    cv: s.object({ tr: s.string().optional(), en: s.string().optional() }),
  }),
});

const site = defineCollection({
  name: "SiteCopy",
  pattern: "site/*.yaml",
  schema: s
    .object({
      path: s.path(),
      meta: s.object({ title: s.string(), description: s.string().max(160) }),
      nav: s.object({
        work: s.string(),
        principles: s.string(),
        about: s.string(),
        colophon: s.string(),
        contact: s.string(),
      }),
      hero: s.object({
        role: s.string().max(60),
        label: s.string(),
        primaryCta: s.string(),
        secondaryCta: s.string(),
        desk: s.object({ ticket: s.string(), notification: s.string(), cursorLabel: s.string() }),
      }),
      intro: s.object({ words: s.array(s.string()), closing: s.string(), skip: s.string() }),
      sections: s.object({
        work: s.string(),
        principles: s.string(),
        about: s.string(),
        colophon: s.string(),
        contact: s.string(),
      }),
      principlesOpening: s.string(),
      about: s.object({ story: s.string(), credentials: s.string(), goals: s.string() }),
      colophon: s.string(),
      // Keys are fixed in D1 from CONTENT §8
      microcopy: s.record(s.string(), s.string()),
      notFound: s.object({ title: s.string(), body: s.string(), cta: s.string() }),
      footer: s.object({ madeIn: s.string(), credits: s.string() }),
    })
    .transform(({ path, ...rest }) => ({ ...rest, locale: path.replace(/^site\//, "") })),
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
  collections: { site },
});
