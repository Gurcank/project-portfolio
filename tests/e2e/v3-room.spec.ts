import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// ROADMAP → v3 · the room (R1–R6)

test.describe("R1 · removed and fixed", () => {
  test("no works wheel, no polaroids, no About pattern", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator(".works-wheel, .works-list")).toHaveCount(0);
    await expect(page.locator(".polaroid")).toHaveCount(0);
    await expect(page.locator('[data-decor-slot="about-pattern"]')).toHaveCount(0);
  });

  for (const width of [1024, 1280, 1440]) {
    test(`${width}px: margin notes never overlap each other or the story`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const story = (await page.locator("#about p").first().boundingBox())!;
      const notes = await page
        .locator("#about .margin-note")
        .evaluateAll((list) => list.map((note) => note.getBoundingClientRect().toJSON()));
      for (const [i, note] of notes.entries()) {
        expect(note.right, `note ${i}`).toBeLessThanOrEqual(story.x);
        const next = notes[i + 1];
        if (next) expect(note.bottom, `note ${i} / ${i + 1}`).toBeLessThanOrEqual(next.top);
      }
    });
  }

  test("credits are small print", async ({ page }) => {
    await page.goto("/");
    const size = await page
      .locator("#credits")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    const body = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    expect(size).toBeLessThan(body);
  });
});

test.describe("R2–R3 · the room and the desk", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("the shelves stand on their planks with objects; the paintings hang", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-decor-slot="work-shelf"] .room-sprite').first()).toBeAttached({
      timeout: 8000,
    });
    for (const shelf of ["work-shelf", "principles-shelf", "about-shelf"])
      expect(
        await page.locator(`[data-decor-slot="${shelf}"] .decor-item`).count(),
      ).toBeGreaterThan(3);
    await expect(page.locator(".room-painting")).toHaveCount(3);
    for (const slot of await page.locator("[data-decor-slot]").all())
      await expect(slot).toHaveAttribute("aria-hidden", "true");
  });

  test("the desk's stickers lie flat for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const sticker = page.locator(".desk-sticker").first();
    await expect(sticker).toBeAttached({ timeout: 8000 });
    await sticker.hover();
    expect(await sticker.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
  });

  test("the hero CTAs have pixel corners and keep a visible focus ring", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: "Bana yaz" });
    expect(await cta.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe("none");
    await cta.focus();
    expect(await cta.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  });
});

test.describe("R4 · landing and loading", () => {
  test("headings keep one accessible name; the letters are a hidden copy", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Rafımdaki yedi kaset", level: 2 }),
    ).toBeVisible();
    await expect(page.locator("#work-heading .wave")).toHaveAttribute("aria-hidden", "true");
  });

  test("the loading room plays on a first desktop visit and crumples away", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".intro .intro-scene")).toBeVisible();
    const names = await page.evaluate(() =>
      document.getAnimations().map((a) => (a as CSSAnimation).animationName),
    );
    expect(names).toContain("intro-crumple");
    expect(names).toContain("intro-dawn");
    await expect(page.locator(".intro")).toHaveCSS("visibility", "hidden", { timeout: 4000 });
    await context.close();
  });
});

test.describe("R6 · GitHub activity", () => {
  test("if GitHub answered at build: a sentence with the count, the grid hidden from AT", async ({
    page,
  }) => {
    await page.goto("/");
    const heading = page.locator("#about h3", { hasText: "GitHub" });
    // The section is optional by design: with no data at build time it is simply not there
    if (!(await heading.count())) return;
    await expect(page.locator("#about").getByText(/^Son bir yılda \d+ katkı$/)).toBeVisible();
    await expect(heading.locator("~ svg").first()).toHaveAttribute("aria-hidden", "true");
    const results = await new AxeBuilder({ page }).include("#about").analyze();
    expect(
      results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
  });
});
