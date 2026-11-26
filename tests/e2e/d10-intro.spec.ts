import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// ROADMAP → S15 · D10 acceptance tests

const intro = (page: Page) => page.locator(".intro");
const introState = (page: Page) => page.evaluate(() => document.documentElement.dataset.intro);

test.describe("intro", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("plays on the first visit and is gone within 2.5 s of starting", async ({ page }) => {
    await page.goto("/");
    expect(await introState(page)).toBe("play");
    await expect(intro(page)).toBeVisible();
    // Timed from the curtain's own start, not from navigation (a cold browser paints late)
    const end = await page.evaluate(() => {
      const curtain = document
        .getAnimations()
        .find((a) => (a as CSSAnimation).animationName === "intro-out") as CSSAnimation;
      const timing = curtain.effect!.getComputedTiming();
      return Number(timing.endTime);
    });
    expect(end).toBeLessThanOrEqual(2500);
    await expect(intro(page)).toHaveCSS("visibility", "hidden", { timeout: 4000 });
  });

  test("words change slower than three times a second (WCAG 2.3.1)", async ({ page }) => {
    await page.goto("/");
    const step = await page.evaluate(() => {
      const word = document
        .getAnimations()
        .find((a) => (a as CSSAnimation).animationName === "intro-word")!;
      return Number(word.effect!.getComputedTiming().duration);
    });
    expect(1000 / step).toBeLessThan(3);
  });

  test("once per session: a reload doesn't play it again", async ({ page }) => {
    await page.goto("/");
    await page.reload();
    expect(await introState(page)).toBe("done");
    await expect(intro(page)).toBeHidden();
  });

  test("a key skips it at once, and still does its job (Tab reaches the skip link)", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Chromium holds back input until the first paint; a key pressed before it can be dropped (1 in ~8
    // runs). Nobody presses a key before seeing the intro, so the test starts at first paint too.
    await page.waitForFunction(
      () => performance.getEntriesByName("first-contentful-paint").length > 0,
    );
    await page.keyboard.press("Tab");
    // Retrying: under load the key event can land a few ms after press() resolves
    await expect.poll(() => introState(page)).toBe("done");
    await expect(intro(page)).toBeHidden();
    await expect(page.getByRole("link", { name: "İçeriğe geç" })).toBeFocused();
  });

  test("a click skips it", async ({ page }) => {
    await page.goto("/");
    await page.mouse.click(400, 400);
    await expect(intro(page)).toBeHidden();
  });

  test("the page is rendered underneath the whole time", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#top h1")).toHaveText("Gürcan Karadağ");
    await expect(page.locator("#top h1")).toBeAttached();
  });

  test("it is decor: hidden from assistive tech, nothing focusable, no serious axe findings", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(intro(page)).toHaveAttribute("aria-hidden", "true");
    expect(await intro(page).locator("a, button, [tabindex]").count()).toBe(0);
    // Audit the page it uncovers: mid-fade words would read as low contrast
    await expect(intro(page)).toHaveCSS("visibility", "hidden", { timeout: 4000 });
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
  });
});

test.describe("when there is no intro", () => {
  test("phones and tablets never see it", async ({ page }) => {
    for (const width of [375, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(intro(page)).toBeHidden();
    }
  });

  test("reduced motion never sees it", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(intro(page)).toBeHidden();
  });

  test("paused motion never sees it", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => localStorage.setItem("motion", "paused"));
    await page.goto("/");
    expect(await introState(page)).toBe("done");
    await expect(intro(page)).toBeHidden();
  });
});
