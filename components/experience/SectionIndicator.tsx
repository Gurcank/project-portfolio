"use client";

import "@/components/experience/indicator.css";
import { Popover } from "radix-ui";
import { useState } from "react";

import { useActiveSection, type SectionId } from "@/lib/active-section";
import type { SiteCopy } from "@/lib/content";
import { fillTemplate } from "@/lib/hash-route";

type Tape = { slug: string; catalog: string; title: string };

type SectionIndicatorProps = {
  labels: SiteCopy["microcopy"]["indicator"];
  nav: SiteCopy["nav"];
  tapes: Tape[];
};

const listedSections = ["work", "principles", "about", "colophon", "contact"] as const;
const linkClass =
  "flex items-center gap-3 rounded-sm px-2 py-2 underline-offset-4 hover:underline aria-[current=location]:font-bold";

/**
 * "Now: Principles" in the bottom-left corner (INS-07). It opens the site's contents like the paper
 * insert of a tape (J-card): the sections on one panel, the seven tapes on the other.
 * Hidden on the hero, so nothing sits over the first screen. No aria-live: the label changes as you
 * scroll, and announcing every change would be noise (ROADMAP D6). Radix Popover handles focus and Esc.
 */
export function SectionIndicator({ labels, nav, tapes }: SectionIndicatorProps) {
  const section = useActiveSection();
  const [open, setOpen] = useState(false);
  if (section === "top") return null;

  const current = nav[section as Exclude<SectionId, "top">];
  const close = () => setOpen(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="section-indicator fixed bottom-4 left-4 z-(--z-indicator) inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-4 font-mono text-label tracking-wide text-paper uppercase shadow-lift">
        {/* A long label ends in "…" instead of running off the screen; the full name is in the menu */}
        <span className="min-w-0 truncate">
          {fillTemplate(labels.current, { section: current })}
        </span>
        <span className="sr-only"> · {labels.contents}</span>
        <span aria-hidden="true">{open ? "▾" : "▴"}</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={8}
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
                      onClick={close}
                      aria-current={id === section ? "location" : undefined}
                      className={linkClass}
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
                      onClick={close}
                      className={linkClass}
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
  );
}
