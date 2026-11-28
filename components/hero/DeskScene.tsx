"use client";

import "@/components/hero/desk.css";
import { useRef, type PointerEvent } from "react";

import { PixelCanvas } from "@/components/pixel/canvas";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { gridSize, pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";
import { plantBase, plantLeaves, plantPalette } from "@/components/pixel/sprites/plant";
import { morningWindow, windowPalette } from "@/components/pixel/sprites/room";
import { peace, peacePalette, yinYang, yinYangPalette } from "@/components/pixel/sprites/symbols";
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

// The plant from the room, half grown, on the corner of the desk
const deskPlant = [plantBase, ...plantLeaves.slice(0, 3)]
  .reduce((canvas, layer) => canvas.stamp(layer, 0, 0), new PixelCanvas(16, 24))
  .grid();

const mug: PixelGrid = [
  ".l.l..",
  "......",
  "tttt..",
  "ttttt.",
  "tttt.t",
  "ttttt.",
  "tttt..",
  ".tt...",
];

/** A sprite at the room's pixel size (room.css). */
function Sprite({ grid, palette }: { grid: PixelGrid; palette: PixelPalette }) {
  return (
    <span className="room-sprite block" style={{ ["--cols" as string]: gridSize(grid).width }}>
      <PixelSprite grid={grid} palette={palette} className="w-full" />
    </span>
  );
}

/**
 * A sticker that peels (v3; the PeelableStickers idea, our own code): hovering lifts one corner,
 * dragging peels it further, letting go presses it back down. Decor, so it takes no keyboard focus;
 * reduced motion and "pause motion" keep it flat (desk.css).
 */
function Sticker({
  grid,
  palette,
  className,
}: {
  grid: PixelGrid;
  palette: PixelPalette;
  className: string;
}) {
  const element = useRef<HTMLSpanElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const peel = (value: number) => element.current?.style.setProperty("--peel", String(value));
  const onDown = (event: PointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
    (event.target as Element).setPointerCapture(event.pointerId);
  };
  const onMove = (event: PointerEvent) => {
    if (!start.current) return;
    const pulled = Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y);
    peel(Math.min(1, 0.25 + pulled / 80));
  };
  const onUp = () => {
    start.current = null;
    peel(0);
  };
  return (
    <span
      ref={element}
      className={`desk-sticker ${className}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <PixelSprite grid={grid} palette={palette} className="w-full" />
    </span>
  );
}

/**
 * The hero's work desk (INS-04 + INS-23, SPEC §8; v3: a pixel scene, one piece with the room). A morning
 * window, the ticket pinned to the wall as a note, a monitor with the deploy notification on its screen,
 * a plant and a mug on a wooden desk, and a "Claude" cursor that drifts to the ticket and taps it, once.
 * The words are real text, the same copy as before. Decor: hidden from assistive tech, never over the
 * hero text, loaded only on desktop after the page has painted (HeroDeskLoader).
 */
export default function DeskScene({ desk }: { desk: SiteCopy["hero"]["desk"] }) {
  const [source = "", message = ""] = desk.notification.split(" · ");
  const [id = "", title = "", status = ""] = desk.ticket.split(" · ");
  return (
    <div aria-hidden="true" className="desk-scene relative h-80 w-96">
      {/* The wall: the window on the right, the ticket pinned on the left */}
      <div className="desk-window absolute top-0 right-0">
        <Sprite grid={morningWindow} palette={windowPalette} />
      </div>

      {/* The desk: plant, monitor, mug, standing on the wooden top */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="flex items-end justify-between gap-3 px-2">
          <Sprite grid={deskPlant} palette={plantPalette} />

          {/* The monitor: a pixel bezel, the notification on its screen, two stickers on the frame */}
          <div className="relative">
            <div className="desk-monitor pixel-box bg-ink p-2">
              <div
                lang="en"
                className="desk-notification flex flex-col gap-1 bg-cassette-midnight px-3 py-4 font-mono text-label tracking-wide text-on-cassette-midnight"
              >
                <span>
                  <span className="text-cassette-mustard">● </span>
                  <span className="font-bold">{source}</span>
                </span>
                <span>{message}</span>
              </div>
            </div>
            <span className="desk-stand mx-auto block h-3 w-6 bg-ink" />
            <Sticker
              grid={peace}
              palette={peacePalette}
              className="absolute -top-4 -left-4 w-8 -rotate-6"
            />
            <Sticker
              grid={yinYang}
              palette={yinYangPalette}
              className="absolute -right-3 bottom-6 w-6 rotate-12"
            />
          </div>

          <Sprite grid={mug} palette={{ t: pixelFill.terracotta, l: pixelFill.line }} />
        </div>
        {/* The desk top: the same wood as the room's shelves */}
        <div className="desk-top" />
      </div>

      {/* The ticket, stuck to the wall beside the monitor like a note */}
      <div className="desk-note absolute top-6 left-2 w-44 bg-cassette-mustard p-3 text-on-cassette-mustard">
        <p lang="en" className="font-mono text-label tracking-wide">
          {id}
        </p>
        <p className="mt-1 font-bold wrap-anywhere">{title}</p>
        <p
          lang="en"
          className="mt-2 inline-flex items-center gap-2 font-mono text-label tracking-wide uppercase"
        >
          <span className="size-2 bg-accent" />
          {status}
        </p>
      </div>

      <div className="desk-cursor absolute top-24 left-32 flex items-start gap-1">
        <PixelSprite
          grid={ARROW}
          palette={{ k: pixelFill.ink, w: pixelFill.paper }}
          className="desk-cursor-arrow w-4"
        />
        <span className="mt-3 bg-ink px-2 py-1 font-mono text-label text-paper">{desk.cursor}</span>
      </div>
    </div>
  );
}
