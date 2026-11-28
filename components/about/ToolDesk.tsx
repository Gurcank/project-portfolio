"use client";

import "@/components/about/tools.css";
import { useState } from "react";

import { toolSlug } from "@/components/about/tool-slug";

type ToolDeskProps = {
  heading: string;
  items: string[];
  /** The toggle's name: "Toparla" / "Tidy up" */
  tidyLabel: string;
};

/*
 * The tools I work with (v4, user: "araçlar biraz dağınık olsun, aksesuarlar bol ama düzenli"): each one
 * a small card in its own app's interface language (tools.css: a Jira issue-type square, Figma's
 * selection handles, a Miro sticky note, Vercel's "ready" dot, a Claude cursor tag). From lg they lie
 * scattered on the desk; "Tidy up" squares them into rows and back. The name is the information; logos
 * and app details are decoration, hidden from assistive tech. Server-rendered as a plain list, so it
 * reads the same before hydration and without script.
 */
export function ToolDesk({ heading, items, tidyLabel }: ToolDeskProps) {
  const [tidy, setTidy] = useState(false);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-h3 font-bold font-stretch-semi-condensed">{heading}</h3>
        {/* Only where the cards scatter (lg); below it they are already in rows */}
        <button
          type="button"
          aria-pressed={tidy}
          onClick={() => setTidy((value) => !value)}
          className="hidden min-h-10 items-center rounded-sm border border-ink px-3 font-mono text-label tracking-wide uppercase hover:bg-ink hover:text-paper aria-pressed:bg-ink aria-pressed:text-paper lg:inline-flex"
        >
          {tidyLabel}
        </button>
      </div>
      <ul data-tidy={tidy} className="tool-desk mt-6">
        {items.map((name) => {
          const slug = toolSlug(name);
          return (
            <li key={name} lang="en" data-tool={slug} className="tool-card">
              <span
                aria-hidden="true"
                className="tool-logo size-6 shrink-0"
                style={{ ["--logo" as string]: `url(/tools/${slug}.svg)` }}
              />
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
