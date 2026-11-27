import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Page } from "./fixtures";

// ROADMAP → S13 · D8 acceptance tests

const MARKER = "about-decor-pattern"; // a string only the decor chunk contains

/** Every JS file the page fetched, with its body and transfer size, after decor had time to load. */
async function scripts(browser: Browser, width: number) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const files: Promise<{ body: string; bytes: number }>[] = [];
  page.on("response", (response) => {
    if (!response.url().endsWith(".js")) return;
    files.push(
      response
        .body()
        .then((buffer) => ({
          body: buffer.toString(),
          bytes: Number(response.headers()["content-length"] ?? buffer.length),
        }))
        .catch(() => ({ body: "", bytes: 0 })),
    );
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3500);
  const result = await Promise.all(files);
  await page.close();
  return result;
}

async function decorLoaded(page: Page) {
  await page.goto("/");
  await expect(page.locator("[data-decor-slot] .decor-item").first()).toBeAttached({
    timeout: 8000,
  });
}

function luminance(rgb: string) {
  const [r = 0, g = 0, b = 0] = (rgb.match(/\d+/g) ?? []).map((v) => Number(v) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
};

test.describe("decor is wide-screen only", () => {
  test("375 and 768: no decor code at all; 1280: it loads and stays under 300 KB", async ({
    browser,
  }) => {
    const wide = await scripts(browser, 1280);
    const decor = wide.filter((file) => file.body.includes(MARKER));
    expect(decor.length).toBeGreaterThan(0); // positive control: the marker is findable
    expect(decor.reduce((sum, file) => sum + file.bytes, 0)).toBeLessThan(300 * 1024);

    for (const width of [375, 768]) {
      const files = await scripts(browser, width);
      expect(
        files.some((file) => file.body.includes(MARKER)),
        `width ${width}`,
      ).toBe(false);
    }
  });

  test("below xl the slots don't display", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/");
    for (const slot of await page.locator("[data-decor-slot]").all()) {
      await expect(slot).toBeHidden();
    }
  });
});

test.describe("in the gutters, never on the content", () => {
  for (const width of [1280, 1440]) {
    test(`${width}px: no decor piece overlaps text or images`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await decorLoaded(page);
      const hits = await page.evaluate(() => {
        const decor = [...document.querySelectorAll("[data-decor-slot] .decor-item")];
        const content = [
          ...document.querySelectorAll(
            "main h2, main h3, main p, main a, main li, main button, main img",
          ),
        ].filter((el) => !el.closest("[data-decor-slot]") && el.getBoundingClientRect().height > 0);
        const found: string[] = [];
        for (const d of decor) {
          const a = d.getBoundingClientRect();
          for (const c of content) {
            const b = c.getBoundingClientRect();
            if (
              a.left < b.right - 1 &&
              a.right > b.left + 1 &&
              a.top < b.bottom - 1 &&
              a.bottom > b.top + 1
            )
              found.push(`${c.tagName}: ${(c.textContent ?? "").slice(0, 30)}`);
          }
        }
        return found;
      });
      expect(hits).toEqual([]);
      // Nothing past the screen edge either
      const past = await page.evaluate(
        () =>
          [...document.querySelectorAll("[data-decor-slot] *")].filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
          }).length,
      );
      expect(past).toBe(0);
    });
  }

  test("all 28 pieces are placed: 14 tapes, 7 records, 7 stamps", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await decorLoaded(page);
    await expect(page.locator("[data-decor-slot] .decor-item")).toHaveCount(28);
  });
});

test.describe("About pattern", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("lighter than the tone, so the accent notes over it stay AA", async ({ page }) => {
    await decorLoaded(page);
    const [pattern, accent, tone] = await page.evaluate(() => {
      const rect = document.querySelector("#about-decor-pattern rect")!;
      const probe = document.createElement("span");
      probe.style.color = "var(--color-accent)";
      probe.style.backgroundColor = "var(--color-paper)";
      // Inside About, where the sunset time re-points paper and accent
      document.getElementById("about")!.append(probe);
      const style = getComputedStyle(probe);
      const values = [getComputedStyle(rect).fill, style.color, style.backgroundColor];
      probe.remove();
      return values;
    });
    expect(luminance(pattern!)).toBeGreaterThan(luminance(tone!));
    expect(contrast(accent!, pattern!)).toBeGreaterThanOrEqual(4.5);
  });

  test("never reaches the portrait and flag column (SPEC §6)", async ({ page }) => {
    await decorLoaded(page);
    const pattern = (await page.locator('[data-decor-slot="about-pattern"]').boundingBox())!;
    const portrait = (await page.locator("#about aside").boundingBox())!;
    expect(pattern.x + pattern.width).toBeLessThanOrEqual(portrait.x);
  });
});

test("decor is hidden from assistive tech and has no serious axe findings", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await decorLoaded(page);
  for (const slot of await page.locator("[data-decor-slot]").all()) {
    await expect(slot).toHaveAttribute("aria-hidden", "true");
  }
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
  ).toEqual([]);
});

test("pause motion: hovering decor no longer moves it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await decorLoaded(page);
  await page.getByRole("button", { name: "Hareketi durdur" }).click();
  await page.evaluate(() =>
    document.getElementById("work")!.scrollIntoView({ behavior: "instant" }),
  );
  const tape = page.locator('[data-decor-slot="work-left"] .decor-item').first();
  await tape.hover();
  expect(await tape.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
});
