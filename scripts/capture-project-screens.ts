/*
 * Project covers (ARCHITECTURE ADR-12): one 1280×800 (16:10) screenshot per live project, taken at 2×
 * so it stays sharp in the overlay, saved as content/projects/<slug>/media/cover.jpg.
 * Live sites change between runs, so this is run by hand and every result is reviewed before commit.
 *
 * Usage: npm run capture:screens -- [slug ...]   (no slug → every project with a live link)
 */
import { readFileSync } from "node:fs";
import { chromium, type Page } from "@playwright/test";

type ProjectEntry = { slug: string; links: { live?: string } };

/*
 * Per-site steps that bring the page to the state worth showing. Cookie banners get "Reddet":
 * the most private choice, and it removes the banner from the shot.
 */
const prepare: Record<string, (page: Page) => Promise<void>> = {
  erasmusmap: async (page) => {
    await page.getByRole("button", { name: "Reddet" }).click();
  },
  "novera-mobility": async (page) => {
    await page.getByRole("button", { name: "Reddet" }).click();
  },
  // The book opens closed; the Birds tab shows a spread with entries, which is what the product is
  "nature-sport-handbook": async (page) => {
    await page
      .locator("a, button")
      .filter({ hasText: /^Birds$/ })
      .last()
      .click();
  },
};

// Long enough for map tiles, web fonts and entrance animations to finish on every site
const SETTLE_MS = 3500;

async function main() {
  const wanted = process.argv.slice(2);
  // Read after `velite build`, so links come from content/ like everywhere else
  const projects = JSON.parse(readFileSync(".velite/projects.json", "utf8")) as ProjectEntry[];
  const targets = projects.filter(
    (project) => project.links.live && (wanted.length === 0 || wanted.includes(project.slug)),
  );

  const browser = await chromium.launch();
  try {
    for (const { slug, links } of targets) {
      const page = await browser.newPage({
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: 2,
        locale: "tr-TR",
      });
      await page.goto(links.live!, { waitUntil: "networkidle" });
      await page.waitForTimeout(SETTLE_MS);
      await prepare[slug]?.(page);
      await page.waitForTimeout(SETTLE_MS);
      const file = `content/projects/${slug}/media/cover.jpg`;
      await page.screenshot({ path: file, type: "jpeg", quality: 90 });
      console.log(`✓ ${file}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
