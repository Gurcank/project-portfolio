"use client";

import "@/components/hero/desk.css";

import { DeskTicket } from "@/components/hero/DeskTicket";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { pixelFill } from "@/components/pixel/pixel";
import type { SiteCopy } from "@/lib/content";

const ARROW = [
  "k.......",
  "kk......",
  "kwk.....",
  "kwwk....",
  "kwwwk...",
  "kwwwwk..",
  "kwwkkk..",
  "kkk.....",
];

/**
 * The hero's work desk (INS-04 + INS-23, SPEC §8): a ticket, a deploy notification and a "Claude"
 * cursor that drifts to the ticket and taps it, once. Decor: hidden from assistive tech, never over
 * the hero text, loaded only on desktop after the page has painted (HeroDeskLoader).
 */
export default function DeskScene({ desk }: { desk: SiteCopy["hero"]["desk"] }) {
  const [source = "", message = ""] = desk.notification.split(" · ");
  return (
    <div aria-hidden="true" className="relative pt-16">
      <div
        lang="en"
        className="desk-notification absolute top-0 right-0 flex items-center gap-2 rounded-md bg-ink px-3 py-2 font-mono text-label tracking-wide text-paper shadow-lift"
      >
        <span>●</span>
        <span className="font-bold">{source}</span>
        <span>{message}</span>
      </div>
      <DeskTicket ticket={desk.ticket} />
      <div className="desk-cursor absolute bottom-6 left-48 flex items-start gap-1">
        <PixelSprite
          grid={ARROW}
          palette={{ k: pixelFill.ink, w: pixelFill.paper }}
          className="desk-cursor-arrow w-4"
        />
        <span className="mt-3 rounded-sm bg-ink px-2 py-1 font-mono text-label text-paper">
          {desk.cursor}
        </span>
      </div>
    </div>
  );
}
