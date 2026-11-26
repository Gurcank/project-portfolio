import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Page } from "./fixtures";

// ROADMAP → S14 · D9 acceptance tests

const heroInfo = [
  "#top h1",
  "#top > p",
  "#top p.text-lead",
  "#top a[href='#contact']",
  "#top a[href='#work']",
];
const desk = (page: Page) => page.locator("#top .desk-notification").locator("..");

async function jsBodies(browser: Browser, width: number) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const bodies: Promise<string>[] = [];
  page.on("response", (r) => {
    if (r.url().endsWith(".js")) bodies.push(r.text().catch(() => ""));
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  const all = await Promise.all(bodies);
  await page.close();
  return all;
}

test.describe("hero desk", () => {
  for (const [width, height] of [
    [375, 812],
    [768, 1024],
    [1280, 800],
  ] as const) {
    test(`${width}px: role, date, city and CTAs are on the first screen`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      for (const selector of heroInfo) {
        const box = (await page.locator(selector).first().boundingBox())!;
        expect(box.y + box.height, selector).toBeLessThanOrEqual(height);
      }
    });
  }

  for (const width of [1024, 1280, 1440]) {
    test(`${width}px: the desk never covers the hero text`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(desk(page)).toBeVisible({ timeout: 8000 });
      const box = (await desk(page).boundingBox())!;
      for (const selector of heroInfo) {
        const b = (await page.locator(selector).first().boundingBox())!;
        const overlaps =
          box.x < b.x + b.width &&
          box.x + box.width > b.x &&
          box.y < b.y + b.height &&
          box.y + box.height > b.y;
        expect(overlaps, selector).toBe(false);
      }
    });
  }

  test("plays once, then rests: no animation left running", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(desk(page)).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(4500);
    const running = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .map((a) => (a as CSSAnimation).animationName),
    );
    expect(running.filter((name) => name?.startsWith("desk-"))).toEqual([]);
  });

  test("with motion paused it shows its last frame at once", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Hareketi durdur" }).click();
    await page.reload();
    await expect(desk(page)).toBeVisible({ timeout: 8000 });
    const opacity = await page
      .locator("#top .desk-notification")
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
  });

  test("phones get the still ticket, never the moving desk's code", async ({ browser }) => {
    const wide = await jsBodies(browser, 1280);
    expect(wide.some((body) => body.includes("desk-notification"))).toBe(true); // positive control
    const phone = await jsBodies(browser, 375);
    expect(phone.some((body) => body.includes("desk-notification"))).toBe(false);

    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto("/");
    await expect(page.locator("#top").getByText("GRCN-1")).toBeVisible();
    await page.close();
  });

  test("the desk is decor: hidden from assistive tech, no serious axe findings", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await expect(desk(page)).toBeVisible({ timeout: 8000 });
    await expect(desk(page)).toHaveAttribute("aria-hidden", "true");
    const results = await new AxeBuilder({ page }).include("#top").analyze();
    expect(
      results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
  });
});

test.describe("custom cursor", () => {
  test("a pixel arrow on fine pointers; text keeps its own cursor", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).cursor)).toContain(
      "/cursor/arrow.svg",
    );
    expect(
      await page.locator("#top p.text-lead").evaluate((el) => getComputedStyle(el).cursor),
    ).toBe("auto");
  });

  test("over a tape the pill says ▶ Aç", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.locator("#cassette-atamap").hover();
    const pill = page.getByText("▶ Aç");
    await expect(pill).toHaveCSS("opacity", "1");
    await expect(pill).toHaveAttribute("aria-hidden", "true");
  });

  test("touch screens never get the pill", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByText("▶ Aç")).toHaveCount(0);
    await context.close();
  });
});
