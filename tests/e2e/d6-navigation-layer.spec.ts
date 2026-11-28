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
  test("there on the hero as Giriş (v3), then names the section being read", async ({ page }) => {
    await page.goto("/");
    await expect(pill(page)).toContainText("Şu an: Giriş", { ignoreCase: true });
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
    const cta = page.getByRole("link", { name: "Bana yaz" });
    await expect(cta).toBeVisible();
    // v3: the dock is there from the first screen, at the bottom on phones: never over the CTA
    const ctaBox = (await cta.boundingBox())!;
    const dockBox = (await page.locator(".dock").boundingBox())!;
    expect(ctaBox.y + ctaBox.height).toBeLessThanOrEqual(dockBox.y);

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
    // v3: the dock is there from the start, so wait for it to catch up with the scroll before opening
    await expect(pill(page)).toContainText("İlkeler", { ignoreCase: true });
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

test.describe("day → night (v2)", () => {
  const times = [
    ["work", "noon"],
    ["principles", "afternoon"],
    ["about", "sunset"],
    ["colophon", "dusk"],
    ["contact", "dusk"],
  ] as const;

  test("each section is a time of day, and the page gets darker towards the end", async ({
    page,
  }) => {
    await page.goto("/");
    for (const [id, time] of times) {
      await expect(page.locator(`#${id}`)).toHaveAttribute("data-time", time);
    }
    await expect(page.locator("footer")).toHaveAttribute("data-time", "night");
    // v3: one long gradient on <body> carries the day; it starts on morning paper and ends at night
    await expect(page.locator("html")).toHaveAttribute("data-day", "");
    const ends = await page.evaluate(() => {
      const colours = getComputedStyle(document.body).backgroundImage.match(/rgb\([^)]*\)/g) ?? [];
      const sum = (c?: string) =>
        (c?.match(/\d+/g) ?? [])
          .slice(0, 3)
          .map(Number)
          .reduce((x, y) => x + y, 0);
      return { count: colours.length, first: sum(colours[0]), last: sum(colours.at(-1)) };
    });
    expect(ends.count).toBeGreaterThan(5);
    expect(ends.first).toBeGreaterThan(600);
    expect(ends.last).toBeLessThan(150);
  });

  test("v3: text stays AA on every in-between tone of the day gradient", async ({ page }) => {
    await page.goto("/");
    // The light-to-light blends cross section edges: sample each in quarters, mixed in OKLab by the
    // browser itself, against the text colours of both sections it touches
    const blends = [
      ["morning", "noon", "top", "work"],
      ["noon", "afternoon", "work", "principles"],
      ["afternoon", "sunset", "principles", "about"],
    ] as const;
    for (const [from, to, a, b] of blends) {
      for (const id of [a, b]) {
        const sample = await page.locator(`#${id}`).evaluate(
          (el, [from, to]) => {
            const read = (property: "color" | "backgroundColor", value: string) => {
              const probe = document.createElement("span");
              probe.style[property] = value;
              el.append(probe);
              const result = getComputedStyle(probe)[property];
              probe.remove();
              return result;
            };
            return {
              texts: ["--color-ink", "--color-ink-muted", "--color-accent"].map((token) =>
                read("color", `var(${token})`),
              ),
              grounds: [0, 25, 50, 75, 100].map((p) =>
                read(
                  "backgroundColor",
                  `color-mix(in oklab, var(--color-time-${to}) ${p}%, var(--color-time-${from}))`,
                ),
              ),
            };
          },
          [from, to] as const,
        );
        for (const ground of sample.grounds)
          for (const text of sample.texts)
            expect(
              contrast(text, ground),
              `${id} ${from}→${to} ${text} on ${ground}`,
            ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test("ink, muted text and the accent stay AA on every time's ground", async ({ page }) => {
    await page.goto("/");
    for (const id of ["top", ...times.map(([id]) => id)]) {
      const [ground, ...texts] = await page.locator(`#${id}`).evaluate((el) => {
        const read = (token: string) => {
          const probe = document.createElement("span");
          probe.style.color = `var(${token})`;
          el.append(probe);
          const value = getComputedStyle(probe).color;
          probe.remove();
          return value;
        };
        const ground = document.createElement("span");
        ground.style.color = "var(--color-paper)";
        el.append(ground);
        const paper = getComputedStyle(ground).color;
        ground.remove();
        return [paper, read("--color-ink"), read("--color-ink-muted"), read("--color-accent")];
      });
      for (const text of texts)
        expect(contrast(text!, ground!), `${id} ${text}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("the tone still follows the section being read", async ({ page }) => {
    await page.goto("/");
    await scrollToSection(page, "work");
    await expect(page.locator("html")).toHaveAttribute("data-tone", "work");
    await scrollToSection(page, "principles");
    await expect(page.locator("html")).toHaveAttribute("data-tone", "principles");
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
