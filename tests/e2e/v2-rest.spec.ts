import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → v2 · V3 who am I, V5 scroll, V6 About, V7 cursor, V8 nature footer

async function scrollToId(page: Page, id: string) {
  await page.evaluate(
    (id) => document.getElementById(id)!.scrollIntoView({ block: "start", behavior: "instant" }),
    id,
  );
}

async function blocking(page: Page, ...areas: string[]) {
  const builder = new AxeBuilder({ page });
  for (const area of areas) builder.include(area);
  return (await builder.analyze()).violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
}

test.describe("V3 · who am I", () => {
  for (const width of [375, 1280]) {
    test(`${width}px: the pixel portrait and the two sentences sit in the hero`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const hero = page.locator("#top");
      await expect(hero.locator("svg.avatar-portrait")).toBeVisible();
      await expect(hero.locator("svg.avatar-portrait")).toHaveAttribute("aria-hidden", "true");
      await expect(hero.getByText(/^Ben Gürcan\. Şu an Erasmus\+ ile Łódź'dayım/)).toBeVisible();
      await expect(hero.getByText(/ürünlere bakışım buradan geliyor\.$/)).toBeVisible();
    });
  }

  test("/en speaks English", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#top").getByText(/^I'm Gürcan\./)).toBeVisible();
  });

  test("the role line is still one sentence for copy and for screen readers", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#top p.text-lead")).toHaveText(
      "Dağınık bilgiyi dokunulabilir ürünlere çeviriyorum.",
    );
  });
});

test.describe("V5 · scroll and backgrounds", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("headings enter as they scroll in, and are fully there once in view", async ({ page }) => {
    await page.goto("/");
    await scrollToId(page, "about");
    const heading = page.locator("#about-heading");
    await expect(heading).toHaveClass(/reveal/);
    await expect.poll(() => heading.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });

  test("the crowd walks along the principles, and stands still with reduced motion", async ({
    page,
  }) => {
    await page.goto("/");
    const walkers = page.locator(".crowd-walker");
    await expect(walkers).toHaveCount(5);
    await expect(page.locator(".crowd")).toHaveAttribute("aria-hidden", "true");
    expect(await walkers.first().evaluate((el) => getComputedStyle(el).animationName)).toBe(
      "crowd-walk",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(await walkers.first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  });

  test("pause motion stops the crowd and the arrow drawing", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("motion", "paused"));
    await page.goto("/");
    expect(
      await page
        .locator(".crowd-walker")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
    expect(
      await page
        .locator(".drawn-arrow path")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  });

  test("phones: no grain, no contours, no crowd, no arrow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator(".crowd")).toBeHidden();
    await expect(page.locator(".contours")).toBeHidden();
    await expect(page.locator(".drawn-arrow")).toBeHidden();
    expect(
      await page.evaluate(() => getComputedStyle(document.body, "::after").backgroundImage),
    ).toBe("none");
  });
});

test.describe("V6 · About", () => {
  test("tools: nine names with their logos, logos hidden from assistive tech", async ({ page }) => {
    await page.goto("/");
    const about = page.locator("#about");
    await expect(about.getByRole("heading", { name: "Araçlar" })).toBeVisible();
    const items = about.locator("h3:has-text('Araçlar') + ul > li");
    await expect(items).toHaveCount(9);
    await expect(items.first()).toHaveText("Jira");
    const logos = items.locator(".tool-logo");
    await expect(logos).toHaveCount(9);
    for (const logo of await logos.all()) await expect(logo).toHaveAttribute("aria-hidden", "true");
    // The mask file is really there: the logo paints, it is not an empty square
    const response = await page.request.get("/tools/nextjs.svg");
    expect(response.ok()).toBe(true);
  });

  test("polaroids: wide screens only, decor, never ATAMap", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const row = page.locator("#about .polaroid").locator("..");
    await expect(page.locator("#about .polaroid")).toHaveCount(3);
    await expect(row).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("#about .polaroid")).not.toContainText(["ATAMap"]);
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("#about .polaroid").first()).toBeHidden();
  });

  test("the CD player keeps the walkman's job, under its new name", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    const player = page.getByRole("button", { name: "CD player: suggest a random film or song" });
    await player.click();
    await expect(page.locator('[aria-live="polite"]:visible').first()).toHaveText(
      /^▶ .+ \(\d{4}(–\d{4})?\) · (film|song)$/,
    );
  });

  test("About has no serious or critical axe findings", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await scrollToId(page, "about");
    expect(await blocking(page, "#about")).toEqual([]);
  });
});

test.describe("V7 · cursor", () => {
  test.use({ viewport: { width: 1280, height: 900 } });
  const layer = (page: Page) => page.locator(".cursor-layer");

  test("changes with what it is over: link, text, tape, footer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "İşlere bak" }).hover();
    await expect(layer(page)).toHaveAttribute("data-cursor", "link");
    await page.locator("#top p.text-lead").hover();
    await expect(layer(page)).toHaveAttribute("data-cursor", "text");
    await page.locator("#cassette-atamap").hover();
    await expect(layer(page)).toHaveAttribute("data-cursor", "tape");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator(".nature").hover();
    await expect(layer(page)).toHaveAttribute("data-cursor", "leaf");
    await expect(layer(page)).toHaveAttribute("aria-hidden", "true");
  });

  test("reduced motion: no ring and no trail, only the pill", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#cassette-atamap").hover();
    await expect(layer(page).locator(".cursor-ring")).toHaveCount(0);
    await expect(layer(page).locator(".cursor-leaf")).toHaveCount(0);
    await expect(layer(page).locator(".cursor-pill")).toHaveCSS("opacity", "1");
  });

  test("touch screens never get a follower", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".cursor-layer")).toHaveCount(0);
    await context.close();
  });
});

test.describe("V8 · nature footer", () => {
  test("wide screens: the landscape closes the page, decor, with the avatar at the fire", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const scene = page.locator("footer .nature");
    await expect(scene).toBeVisible();
    await expect(scene).toHaveAttribute("aria-hidden", "true");
    await expect(scene.locator(".camp-avatar")).toHaveCount(1);
    expect(await blocking(page, "footer")).toEqual([]);
  });

  for (const [hour, sky] of [
    [6, "dawn"],
    [12, "day"],
    [18, "dusk"],
    [23, "night"],
  ] as const) {
    test(`the sky follows the visitor's clock: ${hour}:00 is ${sky}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.addInitScript((hour) => {
        Date.prototype.getHours = () => hour;
      }, hour);
      await page.goto("/");
      await expect(page.locator(".nature")).toHaveAttribute("data-sky", sky);
    });
  }

  test("the fire and the stars are still for pause motion", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => localStorage.setItem("motion", "paused"));
    await page.goto("/");
    expect(await page.locator(".fire-a").evaluate((el) => getComputedStyle(el).animationName)).toBe(
      "none",
    );
  });

  test("phones: no landscape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator(".nature")).toBeHidden();
  });
});
