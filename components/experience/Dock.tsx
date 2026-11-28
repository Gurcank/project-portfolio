"use client";

import "@/components/experience/indicator.css";
import "@/components/experience/dock.css";
import * as m from "motion/react-m";
import { Popover } from "radix-ui";
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { dockIconPalette, dockIcons } from "@/components/pixel/sprites/dock-icons";
import { yinYang, yinYangPalette } from "@/components/pixel/sprites/symbols";
import { useActiveSection, type SectionId } from "@/lib/active-section";
import type { SiteCopy } from "@/lib/content";
import { fillTemplate } from "@/lib/hash-route";
import { otherLocale, type Locale } from "@/lib/i18n";
import { useMediaQuery } from "@/lib/use-media-query";

type Tape = { slug: string; catalog: string; title: string };

type DockProps = {
  locale: Locale;
  labels: SiteCopy["microcopy"]["indicator"];
  languageSwitch: SiteCopy["microcopy"]["languageSwitch"];
  dock: SiteCopy["microcopy"]["dock"];
  nav: SiteCopy["nav"];
  tapes: Tape[];
};

const listedSections = ["work", "principles", "about", "colophon", "contact"] as const;
const jcardLinkClass =
  "flex items-center gap-3 rounded-sm px-2 py-2 underline-offset-4 hover:underline aria-[current=location]:font-bold";
const pillClass =
  "inline-flex min-h-10 items-center gap-2 rounded-full px-3 font-mono text-label tracking-wide whitespace-nowrap uppercase";

/** How far down the page the reader is, 0 → 1, written to a CSS variable without re-rendering. */
function useScrollTurn(target: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const element = target.current;
    if (!active || !element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = document.documentElement.scrollHeight - window.innerHeight;
      element.style.setProperty("--dock-turn", String(room > 0 ? window.scrollY / room : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [target, active]);
}

const TICK_MS = 30_000;
const subscribeClock = (onTick: () => void) => {
  const timer = setInterval(onTick, 5_000);
  return () => clearInterval(timer);
};

/**
 * The current time in 30-second steps: often enough that the minute never looks stale. Null on the
 * server and in the hydration pass (v3: the dock is server-rendered now, and a build-time clock that
 * differs from the reader's would be a hydration mismatch), the real time right after.
 */
function useNow(): Date | null {
  const tick = useSyncExternalStore(
    subscribeClock,
    () => Math.floor(Date.now() / TICK_MS),
    () => null,
  );
  return tick === null ? null : new Date(tick * TICK_MS);
}

/**
 * The dock (V2, INS-07 grown up; v3: always there, the site's only navigation): at the top on wide
 * screens and within thumb reach at the bottom on phones, from the first screen on. It is server-rendered
 * like any client component, so its links work before (and without) hydration. A yin-yang turns as the page moves from day
 * to night and leads back to the top; "Now: …" opens the J-card contents (sections and the seven tapes);
 * on wide screens hovering or focusing it unfolds the five sections; a clock shows Istanbul and Łódź.
 * No aria-live: the label changes as you scroll and announcing every change would be noise (D6).
 */
export function Dock({ locale, labels, languageSwitch, dock, nav, tapes }: DockProps) {
  const section = useActiveSection();
  const turn = useRef<HTMLSpanElement>(null);
  useScrollTurn(turn, true);
  const now = useNow();
  const wide = useMediaQuery("(width >= 48rem)");
  const [menuOpen, setMenuOpen] = useState(false);

  const current = section === "top" ? dock.intro : nav[section as Exclude<SectionId, "top">];
  const closeMenu = () => setMenuOpen(false);
  const clockTime = (timeZone: string) =>
    !now
      ? "--:--"
      : new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZone,
        }).format(now);
  const [home] = dock.clock.cities;
  // The J-card and the clock open away from the screen edge the dock sits on
  const side = wide ? "bottom" : "top";

  return (
    <nav
      aria-label={dock.label}
      className="dock fixed inset-x-0 bottom-4 z-(--z-indicator) mx-auto flex w-fit items-center gap-1 rounded-full border border-line bg-ink p-1 text-paper shadow-lift md:top-4 md:bottom-auto"
    >
      <a
        href="#top"
        aria-label={dock.top}
        className="grid size-10 shrink-0 place-items-center rounded-full bg-paper"
      >
        <span ref={turn} className="dock-turn block w-7">
          <PixelSprite grid={yinYang} palette={yinYangPalette} />
        </span>
      </a>

      <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Popover.Trigger className={`section-indicator min-w-0 ${pillClass}`}>
          {/* A long label ends in "…" instead of running off the screen; the full name is in the menu */}
          <span className="min-w-0 truncate">
            {fillTemplate(labels.current, { section: current })}
          </span>
          <span className="sr-only"> · {labels.contents}</span>
          <span aria-hidden="true">{menuOpen === wide ? "▴" : "▾"}</span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side={side}
            align="center"
            sideOffset={12}
            collisionPadding={16}
            // Radix gives the panel role="dialog"; it is named by its own heading
            aria-labelledby="jcard-heading"
            // Start on the section the reader is in, not on the panel: they see where they are at once
            onOpenAutoFocus={(event) => {
              const here = (event.currentTarget as HTMLElement | null)?.querySelector<HTMLElement>(
                '[aria-current="location"]',
              );
              if (!here) return;
              event.preventDefault();
              here.focus();
            }}
            className="jcard z-(--z-indicator) w-jcard max-w-(--radix-popover-content-available-width) rounded-md border border-line bg-paper text-ink shadow-overlay"
          >
            <nav aria-label={labels.contents}>
              <p
                id="jcard-heading"
                className="border-b border-ink px-4 py-3 font-mono text-label tracking-wide uppercase"
              >
                {labels.contents}
              </p>
              <div className="grid md:grid-cols-2">
                <ul className="p-2">
                  {listedSections.map((id) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={closeMenu}
                        aria-current={id === section ? "location" : undefined}
                        className={jcardLinkClass}
                      >
                        {nav[id]}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="jcard-fold p-2">
                  {tapes.map((tape) => (
                    <li key={tape.slug}>
                      <a
                        href={`#${tape.slug}`}
                        data-case-source="menu"
                        onClick={closeMenu}
                        className={jcardLinkClass}
                      >
                        <span className="shrink-0 font-mono text-label whitespace-nowrap text-ink-muted">
                          {tape.catalog}
                        </span>
                        {/* One unbreakable Turkish word must wrap, not leave the panel */}
                        <span className="min-w-0 wrap-anywhere">{tape.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* From lg (all five fit there): the sections unfold out of the dock on hover or keyboard focus (dock.css) */}
      <div className="dock-links hidden lg:grid">
        <ul className="flex">
          {listedSections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={id === section ? "location" : undefined}
                className={`relative isolate ${pillClass} aria-[current=location]:text-ink`}
              >
                {id === section && (
                  // One marker that glides from section to section, so the eye follows the change
                  <m.span
                    layoutId="dock-active"
                    className="absolute inset-0 -z-10 rounded-full bg-paper"
                  />
                )}
                <PixelSprite
                  grid={dockIcons[id]}
                  palette={dockIconPalette}
                  className="dock-icon w-3"
                />
                {nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Popover.Root>
        {/* The visible time leads the name, so voice users can say what they see (WCAG 2.5.3) */}
        <Popover.Trigger className={`shrink-0 ${pillClass}`}>
          <span>
            {home?.short} {home && clockTime(home.timeZone)}
          </span>
          <span className="sr-only"> · {dock.clock.label}</span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side={side}
            align="end"
            sideOffset={12}
            collisionPadding={16}
            aria-labelledby="clock-heading"
            className="jcard z-(--z-indicator) rounded-md border border-line bg-paper p-4 text-ink shadow-overlay"
          >
            <p id="clock-heading" className="font-mono text-label tracking-wide uppercase">
              {dock.clock.heading}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {dock.clock.cities.map((city) => (
                <li key={city.timeZone} className="flex items-baseline gap-3">
                  <span className="font-mono text-label tabular-nums">
                    {clockTime(city.timeZone)}
                  </span>
                  <span>
                    {city.name} · {city.note}
                  </span>
                </li>
              ))}
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <LanguageSwitch
        target={otherLocale(locale)}
        label={languageSwitch.label}
        accessibleName={languageSwitch.accessibleName}
        variant="dock"
      />
    </nav>
  );
}
