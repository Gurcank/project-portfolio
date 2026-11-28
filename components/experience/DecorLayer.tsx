"use client";

import "@/components/experience/decor.css";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { DecorSlotName, RoomSlotName } from "@/components/experience/DecorSlot";
import { PixelCanvas } from "@/components/pixel/canvas";
import { gridSize, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";
import {
  plantBase,
  plantFlower,
  plantLeaves,
  plantPalette,
} from "@/components/pixel/sprites/plant";
import {
  bookRow,
  boots,
  camera,
  compass,
  globe,
  greatWave,
  lamp,
  mapRoll,
  paintingPalette,
  recordPlayer,
  recordSleeves,
  roomPalette,
  starryNight,
  tortoiseTrainer,
} from "@/components/pixel/sprites/room";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { cdPlayerFrames, cdPlayerPalette } from "@/components/pixel/sprites/cd-player";
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

/** A shelf object at the room's pixel size (room.css: --room-pixel × columns). */
function RoomSprite({ grid, palette = roomPalette }: { grid: PixelGrid; palette?: PixelPalette }) {
  return (
    <span
      className="room-sprite decor-item block"
      style={{ ["--cols" as string]: gridSize(grid).width }}
    >
      <PixelSprite grid={grid} palette={palette} className="w-full" />
    </span>
  );
}

/** A framed painting, a little larger than the shelf objects. */
function Painting({ grid }: { grid: PixelGrid }) {
  return (
    <span
      className="room-painting decor-item"
      style={{ ["--cols" as string]: gridSize(grid).width }}
    >
      <PixelSprite grid={grid} palette={paintingPalette} />
    </span>
  );
}

// The potted plant from the 404, fully grown and flowering, as one sprite for the shelf
const pottedPlant = [plantBase, ...plantLeaves, plantFlower]
  .reduce((canvas, layer) => canvas.stamp(layer, 0, 0), new PixelCanvas(16, 24))
  .grid();

// A page gutter holds three tapes with a gap, or four record sleeves pressed together
function Stack({ children, tight = false }: { children: ReactNode; tight?: boolean }) {
  return <div className={`flex items-end ${tight ? "gap-0" : "gap-1"}`}>{children}</div>;
}

/**
 * The room (SPEC §6, INS-21/25/27; v3 "odayı büyüt"): favourite films as VHS spines and the places I
 * walk as stamps in the gutters; inside the sections, wooden shelves with books, objects and the records
 * in original pixel sleeves, and three paintings after public-domain works. Rendered into the gutter slots each
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
  // The records stand face out on the About shelf, each in its own original pixel sleeve; the CD player
  // (v4: the TV took over its job) stays in the collection, beside the turntable
  const vinyl = (
    <>
      <RoomSprite grid={recordPlayer} />
      <RoomSprite grid={cdPlayerFrames[0]!} palette={cdPlayerPalette} />
      {records.map((record, i) => (
        <span key={record.album} lang={record.lang} title={`${record.artist} · ${record.album}`}>
          <RoomSprite grid={recordSleeves[i % recordSleeves.length]!} />
        </span>
      ))}
    </>
  );
  const stampColumn = (from: number, to: number) => (
    <div className="flex flex-col gap-6">
      {stamps.slice(from, to).map((item) => (
        <Stamp key={item.sprite} {...item} />
      ))}
    </div>
  );

  const pieces: [DecorSlotName | RoomSlotName, ReactNode][] = [
    ["principles-right", <RoomSprite key="compass" grid={compass} />],
    ["about-right", stampColumn(0, 4)],
    ["colophon-right", <RoomSprite key="globe" grid={globe} />],
    ["contact-right", stampColumn(4, 7)],
    // v3 room: the shelves and the paintings inside the sections
    [
      "work-shelf",
      <>
        <RoomSprite grid={bookRow(1922, 9)} />
        {vhs(0, 7)}
        <RoomSprite grid={camera} />
        <span className="ml-auto" />
        <RoomSprite grid={pottedPlant} palette={plantPalette} />
        <RoomSprite grid={lamp} />
      </>,
    ],
    [
      "principles-shelf",
      <>
        <RoomSprite grid={boots} />
        <RoomSprite grid={mapRoll} />
        <span className="ml-auto" />
        {vhs(7, 14)}
        <RoomSprite grid={bookRow(19, 6)} />
      </>,
    ],
    ["about-shelf", vinyl],
    ["principles-painting", <Painting key="starry" grid={starryNight} />],
    ["colophon-painting", <Painting key="tortoise" grid={tortoiseTrainer} />],
    ["contact-painting", <Painting key="wave" grid={greatWave} />],
  ];

  return pieces.map(([name, node]) => {
    const slot = slots.get(name);
    return slot ? createPortal(node, slot, name) : null;
  });
}
