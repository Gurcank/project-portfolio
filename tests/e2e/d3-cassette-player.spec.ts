import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → S8 · D3 acceptance tests; V2b: the whole tape flies into a deck

const playerTape = ".case-study-panel [data-deck] [data-cassette]";
const coverTape = (slug: string) => `#cassette-${slug} ~ .shelf-card [data-cassette]`;
// The tape in the deck: 80px on phones (w-20), 112px from md (w-28)
const DECK_TAPE = { phone: 80, wide: 112 };

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
    const packs = document.querySelectorAll(`${selector} circle.cassette-pack`);
    return [...packs].map((pack) => pack.getBoundingClientRect().width);
  }, playerTape);
}

test.describe("desktop: the tape plays", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("clicking a tape flies the whole cassette from the cover into the deck", async ({
    page,
  }) => {
    await page.goto("/");
    // v3: the room's decor and the desk arrive after load; a reader doesn't click in that first moment
    await page.waitForLoadState("networkidle");
    const tape = page.locator("#cassette-atamap");
    await tape.hover();
    const coverWidth = (await page.locator(coverTape("atamap")).boundingBox())!.width;

    const widths = await sampleWidths(page, playerTape, 900, () => tape.click());
    expect(widths.length).toBeGreaterThan(5);
    // Starts at the cover's size and lands in the deck's slot
    expect(Math.max(...widths)).toBeGreaterThan(coverWidth * 0.8);
    expect(widths.at(-1)).toBe(DECK_TAPE.wide);
  });

  test("once it lands, the door shuts, PLAY goes down and the reels turn", async ({ page }) => {
    await page.goto("/");
    await page.locator("#cassette-atamap").click();
    const deck = page.locator(".case-study-panel [data-deck]");
    await expect(deck).toHaveAttribute("data-deck", "playing");
    await expect(deck.locator(".tape-deck-door")).toHaveAttribute("data-closed", "true");
    await expect(deck.locator(".tape-deck-key")).toHaveAttribute("data-down", "true");
    expect(
      await deck
        .locator(".reel-spin")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("reel-spin");
  });

  test("closing ejects the cassette back to the cover", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const coverWidth = (await page.locator(coverTape("atamap")).boundingBox())!.width;
    await page.locator("#cassette-atamap").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.waitForTimeout(700);
    await scrollPanel(page, 0.5);

    const widths = await sampleWidths(page, coverTape("atamap"), 900, () =>
      page.keyboard.press("Escape"),
    );
    // Its first frames are still deck-sized, then it grows back into the cover
    expect(Math.min(...widths)).toBeLessThan(200);
    expect(widths.at(-1)).toBeCloseTo(coverWidth, 0);
  });

  test("a shared link opens without a flight", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(page.locator(playerTape)).toBeVisible();
    // Sampled right away: a flight would show the cover's size in these frames (a drop doesn't resize)
    const widths = await sampleWidths(page, playerTape, 400, async () => {});
    expect(new Set(widths)).toEqual(new Set([DECK_TAPE.wide]));
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
    await expect(page.locator(playerTape)).toBeVisible();

    const [leftStart, rightStart] = await packWidths(page);
    expect(leftStart).toBeGreaterThan(rightStart!);

    await scrollPanel(page, 1);
    await expect
      .poll(async () => (await packWidths(page))[1]! > (await packWidths(page))[0]!)
      .toBe(true);
  });

  test("mobile: the tape plays in the deck too", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#atamap");
    await expect(page.locator(playerTape)).toBeVisible();
    expect(Math.round((await page.locator(playerTape).boundingBox())!.width)).toBe(DECK_TAPE.phone);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1280, height: 800 }, colorScheme: "light" });

  test("no flight, reels don't turn, the tape still shows progress", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const tape = page.locator("#cassette-atamap");
    await tape.hover();

    const widths = await sampleWidths(page, playerTape, 400, () => tape.click());
    expect(new Set(widths)).toEqual(new Set([DECK_TAPE.wide]));
    await expect(page.getByRole("dialog").getByRole("heading", { name: "ATAMap" })).toBeVisible();

    await scrollPanel(page, 1);
    await expect
      .poll(async () => (await packWidths(page))[1]! > (await packWidths(page))[0]!)
      .toBe(true);
    const hubTransforms = await page.evaluate(
      (selector) =>
        [...document.querySelectorAll(`${selector} .cassette-window svg g g`)].map((hub) => [
          getComputedStyle(hub).transform,
          getComputedStyle(hub).animationName,
        ]),
      playerTape,
    );
    // Neither the scroll-linked turn nor the playing spin
    for (const [transform, animation] of hubTransforms) {
      expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
      expect(animation).toBe("none");
    }
  });
});

test.describe("the tape's colour is the overlay's accent", () => {
  test("every tape: track chips take its colour and the overlay has no serious axe findings", async ({
    page,
  }) => {
    // Seven page loads plus seven axe runs: give it the slow-test budget, not the default 30 s
    test.slow();
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
