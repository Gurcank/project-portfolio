import { describe, expect, it } from "vitest";

import { isLocale, languageAlternates, localePath, otherLocale } from "@/lib/i18n";

describe("localePath", () => {
  it("serves Turkish without a prefix", () => {
    expect(localePath("tr")).toBe("/");
  });

  it("keeps the hash when switching language", () => {
    expect(localePath("en", "atamap")).toBe("/en#atamap");
    expect(localePath("tr", "#contact")).toBe("/#contact");
  });
});

describe("locale helpers", () => {
  it("recognises only supported locales", () => {
    expect(isLocale("tr")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });

  it("flips between the two languages", () => {
    expect(otherLocale("tr")).toBe("en");
    expect(otherLocale("en")).toBe("tr");
  });

  it("points x-default to Turkish", () => {
    expect(languageAlternates()).toEqual({ tr: "/", en: "/en", "x-default": "/" });
  });
});
