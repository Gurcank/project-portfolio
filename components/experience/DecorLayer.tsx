"use client";

import "@/components/experience/decor.css";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { DecorSlotName } from "@/components/experience/DecorSlot";
import { PixelLayer, PixelSprite } from "@/components/pixel/PixelSprite";
import { pixelFill, type PixelGrid } from "@/components/pixel/pixel";
import { stampPalette, stampSprites, type StampSprite } from "@/components/pixel/sprites/stamps";

export type DecorData = {
  films: { title: string; year: string }[];
  records: { artist: string; album: string; lang: "tr" | "en" }[];
  stamps: { sprite: StampSprite; name: string }[];
};

// Base palette only: the cassette colours belong to the projects on the shelf (SPEC §8)
const vhsSkins = ["bg-ink text-paper", "bg-ink-muted text-paper", "bg-line text-ink"] as const;

function VhsSpine({ title, year, skin }: { title: string; year: string; skin: string }) {
  return (
    <div
      lang="en"
      className={`decor-item flex h-32 w-4 flex-col items-center justify-between rounded-sm py-1 font-mono text-label leading-none ${skin}`}
    >
      {/* Read bottom to top: the title starts at the foot and ends in "…", the year sits at the top end */}
      <span className="decor-spine-text shrink-0">{year.slice(-2)}</span>
      <span className="decor-spine-text min-h-0 flex-1 pt-1">{title}</span>
    </div>
  );
}

function RecordSpine({ artist, album, lang }: DecorData["records"][number]) {
  return (
    <div
      lang={lang}
      className="decor-item flex h-24 w-4 items-center justify-center rounded-sm border border-line bg-paper font-mono text-label leading-none text-ink"
    >
      <span className="decor-spine-text max-h-full">
        {artist} · {album}
      </span>
    </div>
  );
}

function Stamp({ sprite, name }: DecorData["stamps"][number]) {
  return (
    <div className="decor-item flex w-16 flex-col items-center gap-1">
      <PixelSprite grid={stampSprites[sprite]} palette={stampPalette} className="w-12" />
      {/* Stays inside the gutter: a long place name wraps instead of running off the screen */}
      <span className="w-full text-center font-mono text-label leading-tight wrap-anywhere text-ink-muted">
        {name}
      </span>
    </div>
  );
}

// 12 × 12 tile: a tiny tape, a leaf and a star, in the pattern colour (lighter than the tone below).
// Small pixels and a roomy cell keep it a texture you notice late, not wallpaper.
const patternTile: PixelGrid = [
  "............",
  ".xxxxx......",
  ".x.x.x......",
  ".xxxxx......",
  "............",
  "........x...",
  ".......xxx..",
  "........x...",
  "..x.........",
  ".xxx........",
  "xxx.........",
  "............",
];

function AboutPattern() {
  return (
    <svg className="h-full w-full" shapeRendering="crispEdges" focusable="false">
      <defs>
        <pattern id="about-decor-pattern" width="72" height="72" patternUnits="userSpaceOnUse">
          <g transform="scale(3)">
            <PixelLayer grid={patternTile} palette={{ x: pixelFill.pattern }} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#about-decor-pattern)" />
    </svg>
  );
}

// A page gutter holds three tapes with a gap, or four record sleeves pressed together
function Stack({ children, tight = false }: { children: ReactNode; tight?: boolean }) {
  return <div className={`flex items-end ${tight ? "gap-0" : "gap-1"}`}>{children}</div>;
}

/**
 * The room (SPEC §6, INS-21/25/27): favourite films as VHS spines, records as record spines, the places
 * I walk as stamps, and a faint pattern behind the About story. Rendered into the gutter slots each
 * section reserves (DecorSlot), so nothing here decides layout or can land on top of text.
 */
export default function DecorLayer({ films, records, stamps }: DecorData) {
  // Client-only (loaded with ssr: false after idle), so the slots are already in the DOM here
  const [slots] = useState(() => {
    const found = new Map<string, Element>();
    document.querySelectorAll("[data-decor-slot]").forEach((element) => {
      found.set(element.getAttribute("data-decor-slot")!, element);
    });
    return found;
  });

  const vhs = (from: number, to: number) => (
    <Stack>
      {films.slice(from, to).map((film, i) => (
        <VhsSpine key={film.title} {...film} skin={vhsSkins[(from + i) % vhsSkins.length]!} />
      ))}
    </Stack>
  );
  const vinyl = (from: number, to: number) => (
    <Stack tight>
      {records.slice(from, to).map((record) => (
        <RecordSpine key={record.album} {...record} />
      ))}
    </Stack>
  );
  const stampColumn = (from: number, to: number) => (
    <div className="flex flex-col gap-6">
      {stamps.slice(from, to).map((item) => (
        <Stamp key={item.sprite} {...item} />
      ))}
    </div>
  );

  const pieces: [DecorSlotName | "about-pattern", ReactNode][] = [
    ["work-left", vhs(0, 3)],
    ["work-right", vhs(3, 6)],
    ["principles-left", vhs(6, 9)],
    ["principles-right", vinyl(0, 4)],
    ["about-left", stampColumn(0, 4)],
    ["about-pattern", <AboutPattern key="pattern" />],
    ["colophon-left", vhs(9, 12)],
    ["colophon-right", vinyl(4, 7)],
    ["contact-left", vhs(12, 14)],
    ["contact-right", stampColumn(4, 7)],
  ];

  return pieces.map(([name, node]) => {
    const slot = slots.get(name);
    return slot ? createPortal(node, slot, name) : null;
  });
}
