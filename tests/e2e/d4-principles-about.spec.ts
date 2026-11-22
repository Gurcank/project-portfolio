import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// ROADMAP → S9 · D4 acceptance tests

const dialog = (page: import("@playwright/test").Page) => page.getByRole("dialog");

const principleTapes = [
  ["novera-mobility", "Novera Mobility"],
  ["atamap", "ATAMap"],
  ["erasmusmap", "ErasmusMap"],
  ["iklim-krizi", "İklim Krizi · IDD ORG"],
  ["idddergi", "IDDDergi"],
] as const;

test.describe("principles", () => {
  test("every principle's chip opens its tape; closing returns focus to the chip", async ({
    page,
  }) => {
    await page.goto("/");
    for (const [slug, title] of principleTapes) {
      const chip = page.locator(`#principles a[href="#${slug}"]`);
      await chip.click();
      await expect(page).toHaveURL(new RegExp(`#${slug}$`));
      await expect(dialog(page).getByRole("heading", { name: title, level: 2 })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog(page)).toHaveCount(0);
      await expect(chip).toBeFocused();
    }
  });

  test("the chip's accessible name contains what it shows", async ({ page }) => {
    await page.goto("/");
    await expect(
      page
        .locator("#principles")
        .getByRole("link", { name: "GK-02 Novera Mobility case study'sini aç" }),
    ).toBeVisible();
  });

  test("with reduced motion the opening sentence is fully visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#principles");
    const opening = page.locator(".principles-opening");
    await expect(opening).toHaveText("Ne yaptığımdan çok, nasıl karar verdiğim anlatır beni.");
    expect(await opening.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });

  test("/en shows the English principles", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "How I decide", level: 2 })).toBeVisible();
    await expect(page.getByText("When trust is the product")).toBeVisible();
  });
});

test.describe("about", () => {
  test("story chips open their tapes", async ({ page }) => {
    await page.goto("/");
    for (const slug of ["seeyournextstep", "erasmusmap", "atamap", "iklim-krizi"]) {
      await page.locator(`#about a[href="#${slug}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${slug}$`));
      await page.keyboard.press("Escape");
      await expect(dialog(page)).toHaveCount(0);
    }
  });

  test("margin notes are real text, and none sits next to ATAMap", async ({ page }) => {
    await page.goto("/");
    const notes = page.locator("#about .margin-note");
    await expect(notes).toHaveCount(3);
    await expect(notes.first()).toContainText("ilk kullanıcısı bendim");
    const afterAtamap = await page
      .locator('#about a[href="#atamap"]')
      .evaluate((chip) => chip.nextElementSibling?.className ?? "");
    expect(afterAtamap).not.toContain("margin-note");
  });

  test("desktop: notes sit in the left margin, level with their chip", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const story = (await page.locator("#about p").first().boundingBox())!;
    const note = (await page.locator("#about .margin-note").first().boundingBox())!;
    const chip = (await page.locator('#about a[href="#seeyournextstep"]').boundingBox())!;
    expect(note.x + note.width).toBeLessThan(story.x);
    expect(Math.abs(note.y - chip.y)).toBeLessThan(chip.height);
  });

  test("mobile: notes are on their own line inside the story", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const story = (await page.locator("#about p").first().boundingBox())!;
    const note = (await page.locator("#about .margin-note").first().boundingBox())!;
    expect(note.x).toBeGreaterThanOrEqual(story.x);
  });

  test("the portrait names who, when and the source; the flag has a 3:2 accessible image", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("img", {
        name: "Mustafa Kemal Atatürk, 1922. Fotoğraf: Agence Meurisse · Kaynak: Bibliothèque nationale de France",
      }),
    ).toBeVisible();
    const flag = page.getByRole("img", { name: "Türk bayrağı" });
    await expect(flag).toBeVisible();
    const box = (await flag.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(1.5, 2);
  });

  test("the portrait and flag never move: no transition, no animation", async ({ page }) => {
    await page.goto("/");
    const respect = page.locator("#about aside img, #about aside svg");
    await expect(respect).toHaveCount(2);
    for (const element of await respect.all()) {
      const style = await element.evaluate((el) => {
        const computed = getComputedStyle(el);
        return [computed.animationName, computed.transitionDuration];
      });
      expect(style).toEqual(["none", "0s"]);
    }
  });

  test("no broken image in About", async ({ page }) => {
    await page.goto("/");
    const broken = await page
      .locator("#about img")
      .evaluateAll((images) =>
        images.filter((img) => !(img as HTMLImageElement).naturalWidth).map((img) => img.outerHTML),
      );
    expect(broken).toEqual([]);
  });
});

test.describe("navigation and accessibility", () => {
  test("nav links the new sections from md up", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "İlkeler" })).toHaveAttribute(
      "href",
      "#principles",
    );
    await expect(page.getByRole("link", { name: "Hakkımda" })).toHaveAttribute("href", "#about");
  });

  test("principles and about have no serious or critical axe findings", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .include("#principles")
      .include("#about")
      .analyze();
    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });
});
