import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// ROADMAP → S17 · project screenshots (ADR-12); v4: a phone shot beside each, IDDDergi's first cover

const withScreens = [
  "erasmusmap",
  "novera-mobility",
  "seeyournextstep",
  "atamap",
  "iklim-krizi",
  "nature-sport-handbook",
  "idddergi",
] as const;

test.describe("overlay", () => {
  test("every live project opens with its screenshot and a text alternative", async ({ page }) => {
    for (const slug of withScreens) {
      await page.goto(`/#${slug}`);
      const image = page.getByRole("dialog").locator("figure img").first();
      await expect(image, slug).toBeVisible();
      await expect(image, slug).not.toHaveAttribute("alt", "");
      await expect
        .poll(() => image.evaluate((img) => (img as HTMLImageElement).naturalWidth), {
          message: slug,
        })
        .toBeGreaterThan(0);
    }
  });

  test("v4: every project shows the site on a phone beside the cover, each with its own alt", async ({
    page,
  }) => {
    for (const slug of withScreens) {
      await page.goto(`/#${slug}`);
      const images = page.getByRole("dialog").locator("figure img");
      await expect(images, slug).toHaveCount(2);
      await expect(images.nth(1), slug).toHaveAttribute("alt", / telefonda: /);
      await expect(images.nth(1), slug).toHaveClass(/phone-shot/);
    }
  });

  test("v4: phone and cover sit side by side from lg, stacked on a phone", async ({ page }) => {
    for (const [width, side] of [
      [1280, true],
      [375, false],
    ] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/#atamap");
      const [cover, phone] = await page
        .getByRole("dialog")
        .locator("figure img")
        .evaluateAll((list) => list.map((img) => img.getBoundingClientRect().toJSON()));
      expect(phone!.left >= cover!.right, `width ${width}`).toBe(side);
    }
  });

  test("third-party map tiles are credited next to the screenshot", async ({ page }) => {
    await page.goto("/#erasmusmap");
    await expect(page.getByRole("dialog").locator("figcaption")).toContainText("© Mapbox");
  });

  test("/en describes the screenshot in English", async ({ page }) => {
    await page.goto("/en#atamap");
    await expect(page.getByRole("dialog").locator("figure img").first()).toHaveAttribute(
      "alt",
      /^ATAMap's opening screen/,
    );
    await expect(page.getByRole("dialog").locator("figure img").nth(1)).toHaveAttribute(
      "alt",
      /^ATAMap on a phone/,
    );
  });

  test("an overlay with a screenshot has no serious or critical axe findings", async ({ page }) => {
    await page.goto("/#erasmusmap");
    await expect(page.getByRole("dialog").locator("figure img").first()).toBeVisible();
    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });
});

test.describe("shelf covers", () => {
  test("desktop: all seven covers carry the screenshot as decoration (v4: IDDDergi too)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const covers = page.locator("#work [aria-hidden='true'] img");
    await expect(covers).toHaveCount(withScreens.length);
    for (const alt of await covers.evaluateAll((images) =>
      images.map((img) => (img as HTMLImageElement).alt),
    )) {
      expect(alt).toBe("");
    }
  });

  test("desktop: the card with a screenshot still fits within its spine", async ({ page }) => {
    for (const width of [1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.locator("#work .shelf-list > li").evaluateAll((items) =>
        items.map((item) => {
          const spine = item.querySelector(".shelf-spine")!.getBoundingClientRect();
          const card = item.querySelector(".shelf-card")!.getBoundingClientRect();
          return Math.round(card.bottom - spine.bottom);
        }),
      );
      expect(Math.max(...overflow), `width ${width}`).toBeLessThanOrEqual(0);
    }
  });

  test("phones never download the shelf covers", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/_next/image")) requests.push(request.url());
    });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    expect(requests).toEqual([]);
  });
});
