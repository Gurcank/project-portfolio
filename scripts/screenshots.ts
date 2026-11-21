/*
 * DoD evidence: full-page screenshots at 375 / 768 / 1280 px into artifacts/.
 * Usage: npm run screenshots -- [baseUrl] [path ...]
 *   npm run screenshots                         → http://localhost:3000, "/" and "/en"
 *   npm run screenshots -- https://x.vercel.app / /en
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const WIDTHS = [375, 768, 1280] as const;
const HEIGHT = 900;

async function main() {
  const [baseUrl = "http://localhost:3000", ...paths] = process.argv.slice(2);
  const targets = paths.length > 0 ? paths : ["/", "/en"];
  mkdirSync("artifacts", { recursive: true });

  const browser = await chromium.launch();
  try {
    for (const path of targets) {
      for (const width of WIDTHS) {
        const page = await browser.newPage({ viewport: { width, height: HEIGHT } });
        await page.goto(new URL(path, baseUrl).href, { waitUntil: "networkidle" });
        const slug = path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replaceAll("/", "-");
        const file = `artifacts/${slug}-${width}.png`;
        // Full-page capture resizes the viewport, which restarts CSS transitions (the shelf's cards
        // showed mid-fade, all at once); finishing them first shows the page as a visitor sees it
        await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
        console.log(`✓ ${file}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
