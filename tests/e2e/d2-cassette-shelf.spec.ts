import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// ROADMAP → S7 · D2 acceptance tests

const dialog = (page: import("@playwright/test").Page) => page.getByRole("dialog");

test.describe("opening and closing a tape", () => {
  test("click → hash + overlay; Esc → closed, hash cleared, focus back on the tape", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("#work .shelf-list")
      .getByRole("link", { name: "ATAMap case study'sini aç" })
      .click();
    await expect(page).toHaveURL(/#atamap$/);
    await expect(dialog(page).getByRole("heading", { name: "ATAMap", level: 2 })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog(page)).toHaveCount(0);
    await expect(page).toHaveURL(/localhost:\d+\/$/);
    await expect(page.locator("#cassette-atamap")).toBeFocused();
  });

  test("browser Back closes the overlay", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("#work .shelf-list")
      .getByRole("link", { name: "ErasmusMap case study'sini aç" })
      .click();
    await expect(dialog(page)).toBeVisible();
    await page.goBack();
    await expect(dialog(page)).toHaveCount(0);
    await expect(page).toHaveURL(/localhost:\d+\/$/);
  });

  test("a shared /#atamap link opens directly; closing clears the hash", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(dialog(page).getByRole("heading", { name: "ATAMap" })).toBeVisible();
    await dialog(page).getByRole("button", { name: "Rafa dön" }).click();
    await expect(dialog(page)).toHaveCount(0);
    await expect(page).toHaveURL(/localhost:\d+\/$/);
  });

  test("/en#atamap opens the English case study", async ({ page }) => {
    await page.goto("/en#atamap");
    await expect(dialog(page).getByText("Side A").first()).toBeVisible();
    await expect(dialog(page).getByRole("heading", { name: /A2 · Users/ })).toBeVisible();
  });

  test("Next tape switches in place; closing returns to the page in one step", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("#work .shelf-list")
      .getByRole("link", { name: "ErasmusMap case study'sini aç" })
      .click();
    await dialog(page)
      .getByRole("link", { name: /Sıradaki kaset: Novera Mobility/ })
      .click();
    await expect(page).toHaveURL(/#novera-mobility$/);
    await expect(
      dialog(page).getByRole("heading", { name: "Novera Mobility", level: 2 }),
    ).toBeFocused();

    await dialog(page).getByRole("button", { name: "Kapat (Esc)" }).click();
    await expect(dialog(page)).toHaveCount(0);
    await expect(page).toHaveURL(/localhost:\d+\/$/);
  });

  test("an unknown hash opens nothing", async ({ page }) => {
    await page.goto("/#bu-kaset-yok");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(dialog(page)).toHaveCount(0);
  });

  test("the tracklist jumps inside the overlay without changing the hash", async ({ page }) => {
    await page.goto("/#erasmusmap");
    await dialog(page)
      .getByRole("navigation", { name: "Parça listesi" })
      .getByRole("button", { name: /B3/ })
      .click();
    await expect(page.locator("#erasmusmap-B3")).toBeFocused();
    await expect(page).toHaveURL(/#erasmusmap$/);
  });
});

test.describe("overlay content", () => {
  test("links are shown only when they exist (IDDDergi: both since 2026-11-28, Novera: no source)", async ({
    page,
  }) => {
    await page.goto("/#idddergi");
    await expect(dialog(page).getByRole("link", { name: /Canlı site/ })).toHaveCount(1);
    await expect(dialog(page).getByRole("link", { name: /Kaynak kod/ })).toHaveCount(1);
    await page.goto("/#novera-mobility");
    await expect(dialog(page).getByRole("link", { name: /Kaynak kod/ })).toHaveCount(0);
    await expect(dialog(page).getByRole("link", { name: /Canlı site/ })).toHaveCount(1);
  });

  test("decision labels render as labels, not italics", async ({ page }) => {
    await page.goto("/#erasmusmap");
    const firstDecision = page.locator("#erasmusmap-B1").locator("xpath=..").locator("li").first();
    await expect(firstDecision.locator("span", { hasText: /^Seçtim$/ })).toBeVisible();
    await expect(firstDecision.locator("em", { hasText: "Seçtim" })).toHaveCount(0);
  });

  test("open overlay has no serious or critical axe findings", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(dialog(page)).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });

  test("with reduced motion the overlay content is there at once", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .locator("#work .shelf-list")
      .getByRole("link", { name: "SeeYourNextStep case study'sini aç" })
      .click();
    const opacity = await dialog(page).evaluate((element) => getComputedStyle(element).opacity);
    expect(opacity).toBe("1");
  });
});

test.describe("shelf", () => {
  test("hero 'İşlere bak' goes to the shelf", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "İşlere bak" }).click();
    await expect(page).toHaveURL(/#work$/);
  });

  test("mobile: every tape's problem, credits and result are visible without hover", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const cards = page.locator(".shelf-card");
    await expect(cards).toHaveCount(7);
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
      expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
    }
    await expect(page.getByRole("banner").getByRole("link", { name: "Seçili işler" })).toBeHidden();
  });

  test("desktop: the featured card shows by default, keyboard focus switches it", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const opacityOf = (slug: string) =>
      page
        .locator(`#cassette-${slug}`)
        .locator("xpath=../div[contains(@class,'shelf-card')]")
        .evaluate((el) => getComputedStyle(el).opacity);
    expect(await opacityOf("erasmusmap")).toBe("1");
    await page.locator("#cassette-atamap").focus();
    await expect.poll(() => opacityOf("atamap")).toBe("1");
    await expect.poll(() => opacityOf("erasmusmap")).toBe("0");
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Seçili işler" }),
    ).toBeVisible();
  });
});
