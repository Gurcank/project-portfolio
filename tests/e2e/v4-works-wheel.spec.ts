import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → v2 · V4 works wheel

const tapes = [
  "GK-01 ErasmusMap",
  "GK-02 Novera Mobility",
  "GK-03 SeeYourNextStep",
  "GK-04 ATAMap",
  "GK-05 İklim Krizi · IDD ORG",
  "GK-06 Nature & Sport Handbook",
  "GK-07 IDDDergi",
] as const;

const wheel = (page: Page) => page.locator(".works-wheel");
const list = (page: Page) => page.locator(".works-list");
const cards = (page: Page) => page.locator(".works-wheel-card");
const index = (page: Page) => page.locator(".works-wheel-index");
const current = (page: Page) => index(page).locator('[aria-current="true"]');

/** Scroll the page to `turn` (0 ring, 1 first tape in front … 7 last) and let the wheel settle. */
async function turnTo(page: Page, turn: number) {
  await page.evaluate((turn) => {
    const box = document.querySelector<HTMLElement>(".works-wheel")!;
    const top = box.getBoundingClientRect().top + scrollY;
    const room = box.offsetHeight - innerHeight;
    scrollTo({ top: top + (turn / 7) * room, behavior: "instant" });
  }, turn);
}

async function blocking(page: Page, area: string) {
  const results = await new AxeBuilder({ page }).include(area).analyze();
  return results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
}

test.describe("wide screen with motion: the wheel", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test("seven cards named like the shelf, and the strip is not shown", async ({ page }) => {
    await page.goto("/");
    await expect(wheel(page)).toBeVisible();
    await expect(list(page)).toBeHidden();
    await expect(cards(page)).toHaveCount(7);
    for (const [i, tape] of tapes.entries()) {
      await expect(cards(page).nth(i)).toHaveAccessibleName(`${tape} case study'sini aç`);
    }
    // Cards only appear once the first frame has placed them, never as a pile
    await expect(wheel(page)).toHaveAttribute("data-ready", "");
  });

  test("scrolling turns the wheel: the index follows the tape in front", async ({ page }) => {
    await page.goto("/");
    await turnTo(page, 0);
    await expect(current(page)).toHaveCount(0);
    await turnTo(page, 1);
    await expect(current(page)).toHaveText("ErasmusMap");
    await turnTo(page, 4);
    await expect(current(page)).toHaveText("ATAMap");
    await turnTo(page, 7);
    await expect(current(page)).toHaveText("IDDDergi");
  });

  test("an index entry brings its tape to the front", async ({ page }) => {
    await page.goto("/");
    await turnTo(page, 1);
    await index(page).getByRole("button", { name: "Nature & Sport Handbook" }).click();
    await expect(current(page)).toHaveText("Nature & Sport Handbook");
  });

  test("keyboard: focusing a card turns it to the front, Enter opens its case study", async ({
    page,
  }) => {
    await page.goto("/");
    await turnTo(page, 1);
    const atamap = cards(page).nth(3);
    await atamap.focus();
    await expect(current(page)).toHaveText("ATAMap");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#atamap$/);
    await expect(page.getByRole("dialog").getByRole("heading", { name: "ATAMap" })).toBeVisible();
  });

  test("clicking the front card opens its case study", async ({ page }) => {
    await page.goto("/");
    await turnTo(page, 3);
    await expect(current(page)).toHaveText("SeeYourNextStep");
    await cards(page).nth(2).click();
    await expect(page).toHaveURL(/#seeyournextstep$/);
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("/en names the cards in English", async ({ page }) => {
    await page.goto("/en");
    await expect(cards(page).first()).toHaveAccessibleName("Open the GK-01 ErasmusMap case study");
  });

  test("no horizontal overflow and no serious or critical axe findings", async ({ page }) => {
    await page.goto("/");
    await turnTo(page, 2);
    await expect(current(page)).toHaveText("Novera Mobility");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      1280,
    );
    expect(await blocking(page, ".works-wheel")).toEqual([]);
  });
});

test.describe("everywhere else: the same tapes as a strip or a grid", () => {
  test("phone: a horizontal strip that scrolls on its own, never the page", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(wheel(page)).toBeHidden();
    await expect(list(page)).toBeVisible();
    const links = list(page).getByRole("link");
    await expect(links).toHaveCount(7);
    await expect(links.first()).toHaveAccessibleName("GK-01 ErasmusMap case study'sini aç");
    const strip = await list(page).evaluate((ul) => ({
      scrolls: ul.scrollWidth > ul.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(strip.scrolls).toBe(true);
    expect(strip.page).toBeLessThanOrEqual(375);
    expect(await blocking(page, ".works-list")).toEqual([]);
  });

  test("tablet: still the strip", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(wheel(page)).toBeHidden();
    await expect(list(page)).toBeVisible();
  });

  test("reduced motion: a still grid, no wheel", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(wheel(page)).toBeHidden();
    await expect(list(page)).toHaveCSS("display", "grid");
    await expect(list(page).getByRole("link")).toHaveCount(7);
  });

  test("motion paused: the grid too", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => localStorage.setItem("motion", "paused"));
    await page.goto("/");
    await expect(wheel(page)).toBeHidden();
    await expect(list(page)).toHaveCSS("display", "grid");
  });

  test("no script: the grid, and nothing is left reserved for the wheel", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(wheel(page)).toBeHidden();
    await expect(list(page)).toHaveCSS("display", "grid");
    await context.close();
  });
});
