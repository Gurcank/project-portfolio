"use client";

import type { MouseEvent } from "react";

import { localePath, type Locale } from "@/lib/i18n";

type LanguageSwitchProps = {
  target: Locale;
  label: string;
  accessibleName: string;
};

/**
 * Plain link to the other language; with JS it also carries the current hash,
 * so a shared `/#contact` or `/#atamap` lands on the same place in `/en` (ADR-03).
 * The two languages are separate root layouts, so this is a full page load either way.
 */
export function LanguageSwitch({ target, label, accessibleName }: LanguageSwitchProps) {
  const href = localePath(target);

  function keepHash(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.location.hash || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    window.location.assign(localePath(target, window.location.hash));
  }

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      onClick={keepHash}
      className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-sm border border-ink font-mono text-label uppercase transition-colors duration-(--duration-fast) hover:bg-ink hover:text-paper"
    >
      <span className="sr-only">{accessibleName}</span>
      <span aria-hidden="true">{label}</span>
    </a>
  );
}
