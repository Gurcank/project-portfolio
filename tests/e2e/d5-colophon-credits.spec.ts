import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// ROADMAP → S10 · D5 acceptance tests

test.describe("colophon and credits", () => {
  test("the colophon tells how the site was made, in both languages", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bu site nasıl yapıldı", level: 2 }),
    ).toBeVisible();
    await expect(page.locator("#colophon")).toContainText("Bu site de bir ürün gibi yapıldı.");

    await page.goto("/en");
    await expect(
      page.getByRole("heading", { name: "How this site was made", level: 2 }),
    ).toBeVisible();
  });

  test("credits are grouped by kind, and no group is empty", async ({ page }) => {
    await page.goto("/");
    const groups = page.locator("#credits section");
    await expect(groups.locator("h4")).toHaveText(["Fontlar", "Fotoğraf", "Yapay zekâ"]);
    for (const group of await groups.all()) {
      expect(await group.locator("li").count()).toBeGreaterThan(0);
    }
  });

  test("every font and the portrait have a credit (SPEC §14.5)", async ({ page }) => {
    await page.goto("/");
    const credits = page.locator("#credits");
    for (const font of [
      "Bricolage Grotesque",
      "Instrument Serif",
      "Instrument Sans",
      "Fragment Mono",
      "Caveat",
    ]) {
      await expect(credits.getByRole("link", { name: font })).toBeVisible();
    }
    // The portrait shown in About and its credit point at the same archive record
    await expect(page.locator("#about aside img")).toHaveCount(1);
    await expect(
      credits.getByRole("link", { name: /Mustafa Kemal Atatürk, 1922/ }),
    ).toHaveAttribute("href", "https://gallica.bnf.fr/ark:/12148/btv1b9053984d");
  });

  test("every outside link in the credits opens safely", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("#credits a");
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("the footer's Credits link lands on the credits", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Krediler" }).click();
    await expect(page).toHaveURL(/#credits$/);
    await expect(page.getByRole("heading", { name: "Krediler", level: 3 })).toBeInViewport();
  });

  test("nav links the colophon from md up", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("banner").getByRole("link", { name: "Site" })).toHaveAttribute(
      "href",
      "#colophon",
    );
  });

  test("the colophon has no serious or critical axe findings", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).include("#colophon").include("footer").analyze();
    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });
});
