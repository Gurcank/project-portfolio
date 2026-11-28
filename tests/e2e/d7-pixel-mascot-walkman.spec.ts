import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "./fixtures";

// ROADMAP → S12 · D7 acceptance tests (V6: the walkman became a CD player, v4: the TV; V5: the plant is
// now the walker)

const walkman = (page: Page) =>
  page.getByRole("button", { name: "Televizyon: bu ziyaretin önerisi" }).locator("visible=true");
/** The panel the visible TV controls (both TVs are in the page; CSS shows one) */
async function suggestion(page: Page) {
  const id = await walkman(page).getAttribute("aria-controls");
  return page.locator(`[id="${id}"]`);
}

async function scrollTo(page: Page, id: string) {
  await page.evaluate(
    (id) => document.getElementById(id)!.scrollIntoView({ behavior: "instant" }),
    id,
  );
}

/** Bodies of every JS file the page fetched (after it settles). */
async function scriptBodies(page: Page, run: () => Promise<void>) {
  const bodies: Promise<string>[] = [];
  page.on("response", (response) => {
    if (response.url().endsWith(".js")) bodies.push(response.text().catch(() => ""));
  });
  await run();
  return Promise.all(bodies);
}

test.describe("walkman", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("holds one pick for the visit: press to show, press again or Escape to put away (v4)", async ({
    page,
  }) => {
    await page.goto("/");
    const tv = walkman(page);
    const panel = await suggestion(page);
    // Drawn in the browser only: nothing is shown (or announced) until the reader asks
    await expect(tv).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toHaveText("");

    await tv.click();
    await expect(tv).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toHaveAttribute("aria-live", "polite");
    await expect(panel.locator("p").first()).toHaveText("Bu ziyaretin önerisi");
    const pick = await panel.locator("p").nth(1).innerText();
    expect(pick).toMatch(/^▶ .+ \(\d{4}(–\d{4})?\) · (film|şarkı)$/);
    // English titles on the Turkish page carry their language
    await expect(panel.locator("span[lang]")).toHaveCount(1);

    await tv.click();
    await expect(tv).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toHaveText("");

    // The same pick all visit long; Escape closes it too
    await tv.click();
    await expect(panel.locator("p").nth(1)).toHaveText(pick);
    await page.keyboard.press("Escape");
    await expect(tv).toHaveAttribute("aria-expanded", "false");
  });

  test("a new visit draws again (over many loads, more than one title comes up)", async ({
    page,
  }) => {
    const picks = new Set<string>();
    for (let i = 0; i < 6; i++) {
      await page.goto("/");
      await walkman(page).click();
      picks.add(await (await suggestion(page)).locator("p").nth(1).innerText());
    }
    // 37 items: six identical draws in a row would be a broken draw, not bad luck (≈ 1 in 50 million)
    expect(picks.size).toBeGreaterThan(1);
  });

  test("stays under the case study overlay (never shown over ATAMap)", async ({ page }) => {
    await page.goto("/#atamap");
    await expect(page.getByRole("dialog")).toBeVisible();
    const box = (await page.locator("div.fixed.right-2").boundingBox())!;
    const covered = await page.evaluate(
      ({ x, y }) => document.elementFromPoint(x, y)?.closest(".case-study-panel") !== null,
      { x: box.x + box.width / 2, y: box.y + box.height / 2 },
    );
    expect(covered).toBe(true);
  });

  test("below xl it lives in the footer, next to the pause control", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("button", { name: /Televizyon/ })).toBeVisible();
    await expect(footer.getByRole("button", { name: "Hareketi durdur" })).toBeVisible();
    await expect(page.locator("div.fixed.right-2")).toBeHidden();
  });
});

test.describe("pause motion", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("stops every animation, and the choice survives a reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Hareketi durdur" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    await expect(page.getByRole("button", { name: "Hareketi başlat" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    // Things that normally move: a tape playing, the tone changing, the walkman's reels
    await scrollTo(page, "work");
    await page.locator("#cassette-atamap").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.getAnimations().filter((a) => a.playState === "running").length,
      ),
    ).toBe(0);
    await page.keyboard.press("Escape");

    await page.reload();
    // Set by the inline script before hydration, not after
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    await scrollTo(page, "principles");
    await walkman(page).click();
    expect(
      await page.evaluate(
        () => document.getAnimations().filter((a) => a.playState === "running").length,
      ),
    ).toBe(0);

    await page.getByRole("button", { name: "Hareketi başlat" }).click();
    await expect(page.locator("html")).not.toHaveAttribute("data-motion", "paused");
  });
});

test.describe("mascot: the walker", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  const walker = (page: Page) => page.locator(".mascot");
  const top = (page: Page) =>
    page.locator(".mascot-walker").evaluate((el) => el.getBoundingClientRect().top);

  test("not over the hero; walks down as you read and waves in Contact", async ({ page }) => {
    await page.goto("/");
    await expect(walker(page)).toHaveCount(0);
    await scrollTo(page, "principles");
    await expect(walker(page)).toBeVisible();
    await expect(walker(page)).toHaveAttribute("aria-hidden", "true");
    await page.waitForTimeout(400);
    const early = await top(page);
    await scrollTo(page, "colophon");
    await expect.poll(() => top(page)).toBeGreaterThan(early);
    await scrollTo(page, "contact");
    await expect(walker(page)).toHaveAttribute("data-pose", "wave");
  });

  test("gives way to the sitting avatar at the footer camp", async ({ page }) => {
    await page.goto("/");
    await scrollTo(page, "about");
    await expect(walker(page)).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(walker(page)).toHaveCount(0);
    await expect(page.locator(".camp-avatar")).toBeVisible();
  });

  test("with reduced motion it stands still at the foot of the trail", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await scrollTo(page, "principles");
    await expect(walker(page)).toHaveAttribute("data-pose", "stand");
    const first = await top(page);
    await scrollTo(page, "colophon");
    await page.waitForTimeout(300);
    expect(await top(page)).toBe(first);
    await scrollTo(page, "contact");
    await expect(walker(page)).toHaveAttribute("data-pose", "stand");
  });

  test("its code is never downloaded on a phone", async ({ browser }) => {
    // Positive control: on a wide screen the walker's chunk is fetched (so the check below can see it)
    const wide = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const wideBodies = await scriptBodies(wide, async () => {
      await wide.goto("/");
      await scrollTo(wide, "about");
      await expect(wide.locator(".mascot")).toBeVisible();
    });
    expect(wideBodies.some((body) => body.includes("mascot-trail"))).toBe(true);
    await wide.close();

    const phone = await browser.newPage({ viewport: { width: 375, height: 812 } });
    const phoneBodies = await scriptBodies(phone, async () => {
      await phone.goto("/");
      await phone.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await phone.waitForLoadState("networkidle");
    });
    expect(phoneBodies.some((body) => body.includes("mascot-trail"))).toBe(false);
    await phone.close();
  });

  test("the 404 has the plant, standing still", async ({ page }) => {
    await page.goto("/bu-sayfa-yok");
    const plant = page.locator("main svg[aria-hidden='true']");
    await expect(plant).toBeVisible();
  });
});

test("footer and walkman have no serious or critical axe findings", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await walkman(page).click();
  const results = await new AxeBuilder({ page })
    .include("footer")
    .include("div.fixed.right-2")
    .analyze();
  expect(
    results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
  ).toEqual([]);
});
