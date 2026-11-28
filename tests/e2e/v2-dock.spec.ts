import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → v2 · V2 dock

const dock = (page: Page) => page.getByRole("navigation", { name: "Bölümler" });

async function scrollToSection(page: Page, id: string) {
  await page.evaluate(
    (id) => document.getElementById(id)!.scrollIntoView({ block: "start", behavior: "instant" }),
    id,
  );
}

test.describe("dock", () => {
  test("there from the first screen (v3), named Intro on the hero; the globe leads back to the top", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(dock(page)).toBeVisible();
    await expect(page.locator(".section-indicator")).toContainText("Şu an: Giriş");
    await expect(dock(page).getByRole("link", { name: "Switch to English" })).toBeVisible();
    await scrollToSection(page, "work");
    await expect(dock(page)).toBeVisible();
    await dock(page).getByRole("link", { name: "Başa dön" }).click();
    await expect(page).toHaveURL(/#top$/);
  });

  test("sits at the top on wide screens and at the bottom on phones", async ({ page }) => {
    for (const [width, edge] of [
      [1280, "top"],
      [375, "bottom"],
    ] as const) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await scrollToSection(page, "principles");
      const box = (await dock(page).boundingBox())!;
      if (edge === "top") expect(box.y).toBeLessThan(40);
      else expect(box.y + box.height).toBeGreaterThan(800 - 40);
      // Centred, and never wider than the screen
      expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(2);
      expect(box.width).toBeLessThanOrEqual(width - 32);
    }
  });

  test("desktop: the sections unfold on keyboard focus and the current one is marked", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await scrollToSection(page, "about");
    const about = dock(page).locator('.dock-links a[href="#about"]');
    await dock(page).getByRole("link", { name: "Başa dön" }).focus();
    await expect(about).toBeVisible();
    await expect(about).toHaveAttribute("aria-current", "location");
    await expect(dock(page).locator('.dock-links a[href="#contact"]')).toBeVisible();
  });

  test("the clock shows both cities with a 24-hour time", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "work");
    const clock = dock(page).getByRole("button", { name: /Yerel saat: İstanbul ve Łódź$/ });
    // The visible time leads the accessible name, so voice users can say what they see (WCAG 2.5.3)
    await expect(clock).toHaveAccessibleName(/^İST \d{2}:\d{2} · Yerel saat: İstanbul ve Łódź$/);
    await clock.click();
    const panel = page.getByRole("dialog", { name: "İki şehrim" });
    await expect(panel).toContainText(/\d{2}:\d{2}\s*İstanbul · evim/);
    await expect(panel).toContainText(/\d{2}:\d{2}\s*Łódź · Erasmus\+, Şubat 2027'ye kadar/);
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(clock).toBeFocused();
  });

  test("/en speaks English", async ({ page }) => {
    await page.goto("/en");
    await scrollToSection(page, "work");
    const en = page.getByRole("navigation", { name: "Sections" });
    await expect(en.getByRole("link", { name: "Back to top" })).toBeVisible();
    await expect(en.getByRole("button", { name: /Local time/ })).toHaveAccessibleName(
      /^IST \d{2}:\d{2} · Local time: Istanbul and Łódź$/,
    );
  });

  test("the globe turns with the page (v4), one frame at a time, and holds still when motion is reduced", async ({
    page,
  }) => {
    const globe = page.locator(".dock-globe");
    const frame = () => globe.getAttribute("data-frame");
    const shown = () =>
      globe.evaluate(
        (el) =>
          [...el.querySelectorAll(":scope > g")].filter(
            (g) => getComputedStyle(g).display !== "none",
          ).length,
      );
    await page.goto("/");
    await expect(globe.locator(":scope > g")).toHaveCount(8);
    expect(await shown()).toBe(1);
    await scrollToSection(page, "work");
    const early = await frame();
    await scrollToSection(page, "about");
    await expect.poll(frame).not.toBe(early);
    expect(await shown()).toBe(1);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await scrollToSection(page, "contact");
    await expect.poll(frame).toBe("0");
  });

  test("phone: the menu opens from the dock with every section and tape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await scrollToSection(page, "about");
    await page.locator(".section-indicator").click();
    const jcard = page.locator(".jcard");
    await expect(jcard.locator('a[href^="#"]')).toHaveCount(5 + 7);
  });

  test("no serious or critical axe findings, closed and with the clock open", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await scrollToSection(page, "work");
    await expect(dock(page)).toBeVisible();
    const scan = async (...areas: string[]) => {
      const builder = new AxeBuilder({ page });
      for (const area of areas) builder.include(area);
      return (await builder.analyze()).violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      );
    };
    expect(await scan(".dock")).toEqual([]);
    await dock(page)
      .getByRole("button", { name: /Yerel saat/ })
      .click();
    await expect(page.getByRole("dialog", { name: "İki şehrim" })).toBeVisible();
    expect(await scan(".dock", ".jcard")).toEqual([]);
  });
});
