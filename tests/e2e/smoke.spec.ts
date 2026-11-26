import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

test.describe("routes", () => {
  test("Turkish home is served at / with lang=tr", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("English home is served at /en with lang=en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("unknown URL returns the bilingual 404", async ({ page }) => {
    const response = await page.goto("/bu-sayfa-yok");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Bu kaset rafta yok.")).toBeVisible();
    await expect(page.getByText("This tape isn't on the shelf.")).toBeVisible();
  });
});

test.describe("accessibility", () => {
  for (const path of ["/", "/en"]) {
    test(`${path} has no serious or critical axe findings`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    });
  }
});

test.describe("layout", () => {
  // 320 = WCAG 1.4.10 reflow width
  for (const width of [320, 375, 768, 1280]) {
    for (const path of ["/", "/en"]) {
      test(`${path} has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const { boxes, scrollWidth, viewport } = await page.evaluate(() => {
          const viewport = document.documentElement.clientWidth;
          return {
            viewport,
            // Text spilling out of a box doesn't move the box itself, so scrollWidth catches it
            scrollWidth: document.documentElement.scrollWidth,
            boxes: [...document.querySelectorAll("body *")]
              .filter((el) => el.getBoundingClientRect().right > viewport + 0.5)
              .map((el) => el.outerHTML.slice(0, 80)),
          };
        });
        expect(boxes).toEqual([]);
        expect(scrollWidth).toBeLessThanOrEqual(viewport);
      });
    }
  }
});
