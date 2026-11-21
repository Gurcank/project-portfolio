"use client";

import "@/components/case-study/overlay.css";
import * as m from "motion/react-m";
import { Dialog } from "radix-ui";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { TapeProgress } from "@/components/case-study/TapeProgress";
import { cassetteSurface } from "@/components/cassette/cassette-colors";
import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import { Emphasis } from "@/components/markdown/Emphasis";
import { trackCaseStudyOpen, type CaseStudySource } from "@/lib/analytics";
import { markOpenSource, ROUTE_EVENT, useLocationHash } from "@/lib/case-study-route";
import type { Project, SiteCopy } from "@/lib/content";
import { fillTemplate, projectFromHash } from "@/lib/hash-route";

export type OverlayStudy = {
  slug: string;
  catalog: string;
  color: Project["color"];
  title: string;
  subtitle: string;
  credits: { role: string; year: string; team: string };
  readingTime: string;
  links: Project["links"];
  next: { slug: string; title: string };
};

type CaseStudyOverlayProps = {
  studies: OverlayStudy[];
  panels: Record<string, ReactNode>;
  labels: SiteCopy["microcopy"]["overlay"];
};

// history.state key: how many tape entries we pushed, so closing can step back past all of them
const DEPTH_KEY = "caseStudyDepth";

function currentDepth(): number {
  const depth = (window.history.state as Record<string, unknown> | null)?.[DEPTH_KEY];
  return typeof depth === "number" ? depth : 0;
}

/**
 * The tape player (ADR-11): the URL hash decides which case study is open.
 * Opening from the page pushes a history entry, so Back closes it; a shared `/#atamap` link opens it
 * directly and closing just clears the hash. Radix Dialog supplies the focus trap, Esc and inert background.
 */
export function CaseStudyOverlay({ studies, panels, labels }: CaseStudyOverlayProps) {
  const slugs = useMemo(() => studies.map((study) => study.slug), [studies]);
  const hash = useLocationHash();
  const active = projectFromHash(hash, slugs);

  // Keeps the last tape on screen while the closing animation plays (state adjusted during render)
  const [shown, setShown] = useState(active);
  if (active !== null && active !== shown) setShown(active);
  const study = studies.find((item) => item.slug === shown);

  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Links marked data-case-source open a tape through pushState, carrying the depth and the source
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[data-case-source]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const slug = projectFromHash(link.hash, slugs);
      if (!slug) return;
      event.preventDefault();
      const source = (link.dataset.caseSource as CaseStudySource) ?? "shelf";
      markOpenSource(source === "shelf");
      const state = { ...(window.history.state ?? {}), [DEPTH_KEY]: currentDepth() + 1 };
      window.history.pushState(state, "", `#${slug}`);
      window.dispatchEvent(new Event(ROUTE_EVENT));
      trackCaseStudyOpen(slug, source);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slugs]);

  // A shared link, a typed hash or a plain #slug anchor counts as a "hash" open
  useEffect(() => {
    function trackHashOpen() {
      const slug = projectFromHash(window.location.hash, slugs);
      if (!slug || currentDepth() > 0) return;
      markOpenSource(false);
      trackCaseStudyOpen(slug, "hash");
    }
    trackHashOpen();
    window.addEventListener("hashchange", trackHashOpen);
    return () => window.removeEventListener("hashchange", trackHashOpen);
  }, [slugs]);

  // "Next tape" keeps the dialog open: start the new tape from its title, not mid-scroll
  useEffect(() => {
    if (!active) return;
    panelRef.current?.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, [active]);

  const close = useCallback(() => {
    const depth = currentDepth();
    if (depth > 0) {
      window.history.go(-depth);
      return;
    }
    const state = { ...(window.history.state ?? {}) };
    delete state[DEPTH_KEY];
    window.history.replaceState(state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new Event(ROUTE_EVENT));
  }, []);

  // Start on the title, not the close button: screen readers announce which tape is playing
  function focusTitle(event: Event) {
    event.preventDefault();
    titleRef.current?.focus({ preventScroll: true });
  }

  function returnFocusToTape(event: Event) {
    event.preventDefault();
    if (shown) document.getElementById(`cassette-${shown}`)?.focus();
  }

  return (
    <Dialog.Root open={active !== null} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Content
          asChild
          aria-describedby={undefined}
          onOpenAutoFocus={focusTitle}
          onCloseAutoFocus={returnFocusToTape}
        >
          {/* layoutRoot: the panel is fixed, so Motion must not add page scroll when the reels fly in */}
          <m.div
            ref={panelRef}
            layoutRoot
            data-tape-color={study?.color}
            className="case-study-panel fixed inset-0 z-(--z-overlay) overflow-y-auto bg-paper text-ink"
          >
            {study && (
              <>
                <div
                  className={`sticky top-0 z-(--z-nav) flex items-center justify-between gap-4 px-(--gutter) py-3 ${cassetteSurface[study.color]}`}
                >
                  <span className="font-mono text-label tracking-wide">{study.catalog}</span>
                  <ExperienceBoundary name="tape-progress">
                    <TapeProgress
                      slug={study.slug}
                      playing={active === study.slug}
                      containerRef={panelRef}
                    />
                  </ExperienceBoundary>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex min-h-12 items-center rounded-sm border border-current px-4 font-mono text-label tracking-wide uppercase"
                  >
                    {labels.close}
                  </button>
                </div>

                <div className="mx-auto max-w-page px-(--gutter) pt-12 pb-24 md:pt-16">
                  <header className="flex flex-col gap-6 border-b border-line pb-12">
                    <Dialog.Title
                      ref={titleRef}
                      tabIndex={-1}
                      className="text-display font-black tracking-tight wrap-anywhere font-stretch-condensed focus:outline-none"
                    >
                      {study.title}
                    </Dialog.Title>
                    <p className="max-w-prose text-lead md:text-h3">
                      <Emphasis text={study.subtitle} />
                    </p>
                    <dl className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-label tracking-wide">
                      {(["role", "year", "team"] as const).map((key) => (
                        <div key={key} className="flex flex-col gap-1">
                          <dt className="text-ink-muted uppercase">{labels.credits[key]}</dt>
                          <dd>{study.credits[key]}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="font-mono text-label tracking-wide text-ink-muted">
                      {fillTemplate(labels.readTime, { time: study.readingTime })}
                    </p>
                    {(study.links.live || study.links.source) && (
                      <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {[
                          [study.links.live, labels.live],
                          [study.links.source, labels.source],
                        ].map(([href, label]) =>
                          href ? (
                            <li key={href}>
                              <a
                                href={href}
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center gap-2 font-mono text-label tracking-wide uppercase underline underline-offset-4"
                              >
                                {label}
                                <span aria-hidden="true">↗</span>
                              </a>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    )}
                  </header>

                  <div className="pt-12">{panels[study.slug]}</div>

                  <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
                    <a
                      href={`#${study.next.slug}`}
                      data-case-source="next"
                      className="text-h3 font-black font-stretch-condensed underline decoration-2 underline-offset-8"
                    >
                      {fillTemplate(labels.next, { project: study.next.title })}
                      <span aria-hidden="true"> →</span>
                    </a>
                    <button
                      type="button"
                      onClick={close}
                      className="inline-flex min-h-12 items-center self-start rounded-sm bg-ink px-6 font-mono text-label tracking-wide text-paper uppercase md:self-auto"
                    >
                      {labels.back}
                    </button>
                  </footer>
                </div>
              </>
            )}
          </m.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
