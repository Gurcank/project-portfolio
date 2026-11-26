import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → S8 · D3 acceptance tests

const playerReels = ".case-study-panel [aria-hidden='true']:has(> svg)";
const coverReels = (slug: string) =>
  `#cassette-${slug} ~ .shelf-card [aria-hidden='true']:has(> svg)`;

/** Width of the player's reels on every frame for `ms` after `action` runs. */
async function sampleWidths(page: Page, selector: string, ms: number, action: () => Promise<void>) {
  const sampling = page.evaluate(
    ({ selector, ms }) =>
      new Promise<number[]>((resolve) => {
        const widths: number[] = [];
        const start = performance.now();
        const frame = () => {
          const element = document.querySelector(selector);
          if (element) widths.push(Math.round(element.getBoundingClientRect().width));
          if (performance.now() - start < ms) requestAnimationFrame(frame);
          else resolve(widths);
        };
        requestAnimationFrame(frame);
      }),
    { selector, ms },
  );
  await action();
  return sampling;
}

async function scrollPanel(page: Page, share: number) {
  await page.evaluate((share) => {
    const panel = document.querySelector(".case-study-panel")!;
    panel.scrollTop = (panel.scrollHeight - panel.clientHeight) * share;
  }, share);
}

/** Rendered radius of the left and right tape packs. */
function packWidths(page: Page) {
  return page.evaluate((selector) => {
    const packs = document.querySelectorAll(`${selector} circle.fill-line`);
    return [...packs].map((pack) => pack.getBoundingClientRect().width);
  }, playerReels);
}

test.describe("desktop: the tape plays", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("clicking a tape flies its reels from the cover into the player bar", async ({ page }) => {
    await page.goto("/");
    const tape = page.locator("#cassette-atamap");
    await tape.hover();
    const coverWidth = (await page.locator(coverReels("atamap")).boundingBox())!.width;

    const widths = await sampleWidths(page, playerReels, 900, () => tape.click());
    expect(widths.length).toBeGreaterThan(5);
    // Starts at the cover's size and lands at the bar's 128px (w-32)
    expect(Math.max(...widths)).toBeGreaterThan(coverWidth * 0.8);
    expect(widths.at(-1)).toBe(128);
  });

  test("closing flies the reels back to the cover", async ({ page }) => {
    await page.goto("/");
    await page.locator("#cassette-atamap").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(700);
    await scrollPanel(page, 0.5);

    const widths = await sampleWidths(page, coverReels("atamap"), 900, () =>
      page.keyboard.press("Escape"),
    );
    // Its first frames are still bar-sized, then it grows back into the cover
    expect(Math.min(...widths)).toBeLessThan(200);
    expect(widths.at(-1)).toBeGreaterThan(300);
  });

  test("a shared link opens without a flight", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(page.locator(playerReels)).toBeVisible();
    // Sampled right away: a flight would show the cover's size in these frames
    const widths = await sampleWidths(page, playerReels, 400, async () => {});
    expect(new Set(widths)).toEqual(new Set([128]));
  });

  test("hover lifts the tape off the shelf", async ({ page }) => {
    await page.goto("/");
    const tape = page.locator("#cassette-erasmusmap");
    const before = (await tape.boundingBox())!.y;
    await tape.hover();
    await expect.poll(async () => (await tape.boundingBox())!.y).toBeLessThan(before);
  });
});

test.describe("reels follow the reading", () => {
  test("the tape moves from the left reel to the right one as you scroll", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(page.locator(playerReels)).toBeVisible();

    const [leftStart, rightStart] = await packWidths(page);
    expect(leftStart).toBeGreaterThan(rightStart!);

    await scrollPanel(page, 1);
    await expect
      .poll(async () => (await packWidths(page))[1]! > (await packWidths(page))[0]!)
      .toBe(true);
  });

  test("mobile: the reels are in the bar too", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#atamap");
    await expect(page.locator(playerReels)).toBeVisible();
    expect(Math.round((await page.locator(playerReels).boundingBox())!.width)).toBe(96);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1280, height: 800 }, colorScheme: "light" });

  test("no flight, reels don't turn, the tape still shows progress", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const tape = page.locator("#cassette-atamap");
    await tape.hover();

    const widths = await sampleWidths(page, playerReels, 400, () => tape.click());
    expect(new Set(widths)).toEqual(new Set([128]));
    await expect(page.getByRole("dialog").getByRole("heading", { name: "ATAMap" })).toBeVisible();

    await scrollPanel(page, 1);
    await expect
      .poll(async () => (await packWidths(page))[1]! > (await packWidths(page))[0]!)
      .toBe(true);
    const hubTransforms = await page.evaluate(
      (selector) =>
        [...document.querySelectorAll(`${selector} svg g g`)].map(
          (hub) => getComputedStyle(hub).transform,
        ),
      playerReels,
    );
    for (const transform of hubTransforms)
      expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
  });
});

test.describe("the tape's colour is the overlay's accent", () => {
  test("every tape: track chips take its colour and the overlay has no serious axe findings", async ({
    page,
  }) => {
    await page.goto("/");
    const slugs = await page
      .locator(".shelf-spine")
      .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).hash.slice(1)));
    expect(slugs).toHaveLength(7);

    for (const slug of slugs) {
      await page.goto(`/#${slug}`);
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const [chip, spine] = await Promise.all([
        dialog
          .locator(".tape-chip")
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundColor),
        page.locator(`#cassette-${slug}`).evaluate((el) => getComputedStyle(el).backgroundColor),
      ]);
      expect(chip, slug).toBe(spine);

      const results = await new AxeBuilder({ page }).include("[role=dialog]").analyze();
      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      );
      expect(blocking, slug).toEqual([]);
    }
  });
});
