import { expect, test } from "./fixtures";

// ROADMAP → S16 · quality gates added in this slice

test.describe("security headers", () => {
  test("every page sends the CSP and the hardening headers", async ({ request }) => {
    for (const path of ["/", "/en", "/robots.txt"]) {
      const headers = (await request.get(path)).headers();
      expect(headers["content-security-policy"], path).toContain("frame-ancestors 'none'");
      expect(headers["content-security-policy"], path).toContain("object-src 'none'");
      expect(headers["x-content-type-options"], path).toBe("nosniff");
      expect(headers["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
      expect(headers["x-frame-options"], path).toBe("DENY");
      expect(headers["permissions-policy"], path).toContain("camera=()");
    }
  });

  test("the CSP blocks nothing the page uses, on phones and with every desktop layer loaded", async ({
    browser,
  }) => {
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const violations: string[] = [];
      page.on("console", (message) => {
        if (/content security policy/i.test(message.text())) violations.push(message.text());
      });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(3500); // decor, mascot and desk load after idle
      await page.goto("/en#atamap");
      await expect(page.getByRole("dialog")).toBeVisible();
      expect(violations, `width ${width}`).toEqual([]);
      await page.close();
    }
  });
});

test("no horizontal scrollbar while the hero desk plays (it caused a layout shift)", async ({
  browser,
}) => {
  for (const width of [1280, 1350]) {
    const page = await browser.newPage({ viewport: { width, height: 940 } });
    await page.goto("/");
    const overflow = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let worst = 0;
          const start = performance.now();
          const tick = () => {
            const root = document.documentElement;
            worst = Math.max(worst, root.scrollWidth - root.clientWidth);
            if (performance.now() - start < 5000) requestAnimationFrame(tick);
            else resolve(worst);
          };
          requestAnimationFrame(tick);
        }),
    );
    expect(overflow, `width ${width}`).toBeLessThanOrEqual(0);
    await page.close();
  }
});

test("structured data names the owner and links the profiles", async ({ page }) => {
  for (const [path, url] of [
    ["/", /\/$/],
    ["/en", /\/en$/],
  ] as const) {
    await page.goto(path);
    const data = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
    );
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Gürcan Karadağ");
    expect(data.url).toMatch(url);
    expect(data.sameAs).toEqual(
      expect.arrayContaining([
        expect.stringContaining("linkedin.com"),
        expect.stringContaining("github.com"),
      ]),
    );
  }
});

test("an open case study adds no second banner or contentinfo landmark", async ({ page }) => {
  await page.goto("/#atamap");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("banner", { includeHidden: true })).toHaveCount(1);
  await expect(page.getByRole("contentinfo", { includeHidden: true })).toHaveCount(1);
  await expect(page.getByRole("dialog").getByRole("article")).toHaveCount(1);
});
