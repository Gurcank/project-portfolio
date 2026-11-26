import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → S11 · D6 acceptance tests

const pill = (page: Page) => page.locator(".section-indicator");

async function scrollToSection(page: Page, id: string) {
  await page.evaluate(
    (id) => document.getElementById(id)!.scrollIntoView({ block: "start", behavior: "instant" }),
    id,
  );
}

/** WCAG contrast of two "rgb(r, g, b)" strings. */
function contrast(a: string, b: string) {
  const luminance = (rgb: string) => {
    const [r = 0, g = 0, bl = 0] = (rgb.match(/\d+/g) ?? []).map((v) => Number(v) / 255);
    const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

test.describe("section indicator", () => {
  test("hidden on the hero, then names the section being read", async ({ page }) => {
    await page.goto("/");
    await expect(pill(page)).toHaveCount(0);
    for (const [id, label] of [
      ["work", "Şu an: Seçili işler"],
      ["principles", "Şu an: İlkeler"],
      ["about", "Şu an: Hakkımda"],
      ["colophon", "Şu an: Site"],
      ["contact", "Şu an: İletişim"],
    ] as const) {
      await scrollToSection(page, id);
      await expect(pill(page)).toContainText(label, { ignoreCase: true });
    }
  });

  test("it has no live region: changes are not announced", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "principles");
    await expect(pill(page)).toBeVisible();
    expect(await pill(page).getAttribute("aria-live")).toBeNull();
  });

  test("375px: it never covers the hero CTA or the contact links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Bana yaz" })).toBeVisible();
    await expect(pill(page)).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(pill(page)).toBeVisible();
    const box = (await pill(page).boundingBox())!;
    const covered = await page.evaluate((p) => {
      const targets = [...document.querySelectorAll("#contact a, #contact button, footer a")];
      return targets
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return !(
            r.right < p.x ||
            r.left > p.x + p.width ||
            r.bottom < p.y ||
            r.top > p.y + p.height
          );
        })
        .map((el) => el.textContent);
    }, box);
    expect(covered).toEqual([]);
  });
});

test.describe("J-card contents", () => {
  test("keyboard: opens on the current section, Esc closes and returns focus", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "principles");
    await pill(page).focus();
    await page.keyboard.press("Enter");
    await expect(pill(page)).toHaveAttribute("aria-expanded", "true");
    const here = page.locator('.jcard [aria-current="location"]');
    await expect(here).toHaveText("İlkeler");
    await expect(here).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(pill(page)).toHaveAttribute("aria-expanded", "false");
    await expect(pill(page)).toBeFocused();
  });

  test("every section is reachable from the menu with the keyboard", async ({ page }) => {
    await page.goto("/");
    for (const id of ["work", "principles", "about", "colophon", "contact"]) {
      await scrollToSection(page, id === "work" ? "principles" : "work");
      await pill(page).focus();
      await page.keyboard.press("Enter");
      await page.locator(`.jcard a[href="#${id}"]`).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(".jcard")).toHaveCount(0);
    }
  });

  test("every tape opens from the menu", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "work");
    const slugs = await page
      .locator(".shelf-spine")
      .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).hash.slice(1)));
    for (const slug of slugs) {
      await pill(page).click();
      await page.locator(`.jcard a[href="#${slug}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${slug}$`));
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
    }
  });

  test("with reduced motion the menu opens without animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await scrollToSection(page, "about");
    await pill(page).click();
    const duration = await page
      .locator(".jcard")
      .evaluate((el) => getComputedStyle(el).animationDuration);
    expect(duration).toBe("0s");
  });

  test("open menu has no serious or critical axe findings", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "about");
    await pill(page).click();
    await expect(page.locator(".jcard")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .include(".jcard")
      .include(".section-indicator")
      .analyze();
    expect(
      results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
  });
});

test.describe("background tone", () => {
  test("changes per section, and the accent stays AA in every frame of the change", async ({
    page,
  }) => {
    await page.goto("/");
    await scrollToSection(page, "work");
    await expect(page.locator("html")).toHaveAttribute("data-tone", "work");

    // Sample the background on every frame while it moves to the principles tone
    const frames = page.evaluate(
      () =>
        new Promise<string[]>((resolve) => {
          const colors: string[] = [];
          const start = performance.now();
          const tick = () => {
            colors.push(getComputedStyle(document.documentElement).backgroundColor);
            if (performance.now() - start < 900) requestAnimationFrame(tick);
            else resolve(colors);
          };
          requestAnimationFrame(tick);
        }),
    );
    await scrollToSection(page, "principles");
    const colors = await frames;
    await expect(page.locator("html")).toHaveAttribute("data-tone", "principles");
    expect(new Set(colors).size).toBeGreaterThan(1);

    // The tone must be what the reader sees: nothing between <html> and the eye may paint over it
    // (D6 shipped with a body background that hid the tone; this catches that)
    const painted = await page.evaluate(() =>
      document
        .elementsFromPoint(innerWidth - 8, innerHeight / 2)
        .filter((el) => el !== document.documentElement)
        .map((el) => [el.tagName, getComputedStyle(el).backgroundColor])
        .filter(([, color]) => color !== "rgba(0, 0, 0, 0)"),
    );
    expect(painted).toEqual([]);

    const accent = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.color = "var(--color-accent)";
      document.body.append(probe);
      const value = getComputedStyle(probe).color;
      probe.remove();
      return value;
    });
    for (const color of colors) expect(contrast(accent, color)).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe("now playing inside a case study", () => {
  test("shows the track being read", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.evaluate(() => {
      const panel = document.querySelector(".case-study-panel")!;
      const heading = document.getElementById("atamap-B1")!;
      panel.scrollTo({ top: heading.offsetTop - panel.clientHeight * 0.3, behavior: "instant" });
    });
    await expect(page.locator(".tape-indicator")).toContainText("B1", { ignoreCase: true });
  });
});
