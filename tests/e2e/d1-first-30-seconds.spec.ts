import { expect, test } from "./fixtures";

// ROADMAP → S6 · D1 acceptance tests

test.describe("hero: the 30-second test", () => {
  for (const width of [375, 768, 1280]) {
    for (const path of ["/", "/en"]) {
      test(`${path} shows role, city, date and CTA above the fold at ${width}px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: width === 375 ? 667 : 900 });
        await page.goto(path);
        const viewportHeight = page.viewportSize()?.height ?? 0;
        const hero = page.locator("#top");
        const label = hero.locator("p").first();
        const city = path === "/" ? "İSTANBUL" : "ISTANBUL";
        const date = path === "/" ? "ŞUBAT 2027" : "FEB 2027";

        for (const locator of [
          hero.getByRole("heading", { level: 1 }),
          // The mono label, not the who-am-I sentences (V3), which also name the city
          label.getByText(city),
          label.getByText(date),
          hero.getByRole("link", { name: path === "/" ? "Bana yaz" : "Get in touch" }),
        ]) {
          const box = await locator.boundingBox();
          expect(box, "element is rendered").not.toBeNull();
          expect(box!.y + box!.height).toBeLessThanOrEqual(viewportHeight);
        }
      });
    }
  }

  test("primary CTA goes to the contact section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Bana yaz" }).click();
    await expect(page).toHaveURL(/#contact$/);
  });
});

test.describe("language switch", () => {
  test("keeps the hash: /#contact → /en#contact", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/en#contact$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("goes back without a hash: /en → /", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Türkçeye geç" }).click();
    await expect(page).toHaveURL(/localhost:\d+\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  });
});

test.describe("contact", () => {
  test("email and LinkedIn carry Umami events", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("#contact");
    await expect(contact.locator('a[href^="mailto:"]')).toHaveAttribute(
      "data-umami-event",
      "contact_email_click",
    );
    await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "data-umami-event",
      "contact_linkedin_click",
    );
  });

  // The CV is not offered on the site (user decision, 2026-11-27); its facts live in About
  test("no CV download link", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  });

  test("copy email shows Copied", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: "E-postayı kopyala" }).click();
    await expect(page.getByRole("button", { name: "Kopyalandı" })).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain("@");
  });

  test("refused clipboard keeps the address selectable and says so", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await page.goto("/");
    await page.getByRole("button", { name: "E-postayı kopyala" }).click();
    await expect(page.getByText("Kopyalanamadı; adresi seçip kopyala.")).toBeVisible();
    const selected = await page.evaluate(() => window.getSelection()?.toString());
    expect(selected).toContain("@");
  });
});

test.describe("keyboard and landmarks", () => {
  test("first Tab reaches the skip link, which moves focus to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "İçeriğe geç" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  test("has header, nav, main and footer landmarks", async ({ page }) => {
    await page.goto("/");
    for (const role of ["banner", "navigation", "main", "contentinfo"] as const) {
      await expect(page.getByRole(role)).toHaveCount(1);
    }
  });

  test("English words on the TR page are marked lang=en", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Switch to English", "LinkedIn", "GitHub"]) {
      await expect(page.getByRole("link", { name })).toHaveAttribute("lang", "en");
    }
  });
});

test.describe("SEO basics", () => {
  for (const [path, canonical] of [
    ["/", /\/$/],
    ["/en", /\/en$/],
  ] as const) {
    test(`${path} has description, absolute canonical, hreflang and OG image`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonicalHref).toMatch(/^https?:\/\//);
      expect(new URL(canonicalHref!).pathname).toMatch(canonical);
      await expect(page.locator('link[hreflang="tr"]')).toHaveCount(1);
      await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
      // The absolute origin is fixed at build time; request the path against the test server
      const { pathname, search } = new URL(ogImage!);
      const response = await page.request.get(pathname + search);
      expect(response.headers()["content-type"]).toBe("image/png");
    });
  }

  test("favicon, sitemap and robots are served", async ({ request }) => {
    for (const path of ["/sitemap.xml", "/robots.txt"]) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/en</loc>");
  });

  test("the page links a favicon that loads", async ({ page }) => {
    await page.goto("/");
    const href = await page.locator('link[rel="icon"]').getAttribute("href");
    expect((await page.request.get(href!)).status()).toBe(200);
  });
});
