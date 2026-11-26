import { test as base } from "@playwright/test";

/*
 * Every spec except the intro's own starts with the D10 intro already seen. The intro is a 2.5 s
 * curtain over the first load; tests about the page (and axe, which measures contrast visually even on
 * aria-hidden text) must see the page, not a word mid-fade.
 */
export const test = base.extend({
  // "provide", not "use": the React hooks lint rule reads any use() call as a hook
  page: async ({ page }, provide) => {
    await page.addInitScript(() => sessionStorage.setItem("intro", "seen"));
    await provide(page);
  },
});

export { expect } from "@playwright/test";
export type { Page, Browser } from "@playwright/test";
