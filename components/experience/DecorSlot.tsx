import "@/components/experience/room.css";

/*
 * An empty, invisible spot in a section's gutter where the room decor (D8) lands once it loads.
 * Server-rendered, so the position comes from the section's own layout; below xl it doesn't display.
 */
// Right gutters only (v3): the left gutter is the walker's trail (Mascot)
export type DecorSlotName = "principles-right" | "about-right" | "colophon-right" | "contact-right";

type DecorSlotProps = {
  name: DecorSlotName;
  side: "left" | "right";
  /** Which end of the section the decor sits at */
  at?: "top" | "bottom";
};

export function DecorSlot({ name, side, at = "top" }: DecorSlotProps) {
  return (
    <div
      data-decor-slot={name}
      aria-hidden="true"
      className={`pointer-events-none absolute hidden w-(--gutter) justify-center xl:flex ${
        side === "left" ? "left-0" : "right-0"
      } ${at === "top" ? "top-32" : "bottom-32"}`}
    />
  );
}

/* ── The room (v3): shelves and frames inside the content, from lg ─────────── */

export type RoomSlotName =
  | "work-shelf"
  | "principles-shelf"
  | "about-shelf"
  | "principles-painting"
  | "colophon-painting"
  | "contact-painting";

/** A wooden shelf plank; its objects arrive after idle and stand on it. */
export function RoomShelf({ name, className = "" }: { name: RoomSlotName; className?: string }) {
  return (
    <div
      data-decor-slot={name}
      aria-hidden="true"
      className={`room-shelf pointer-events-none ${className}`}
    />
  );
}

/** Where a painting hangs. Positioned by the section, so it can never land on the text. */
export function RoomFrame({ name, className = "" }: { name: RoomSlotName; className?: string }) {
  return (
    <div
      data-decor-slot={name}
      aria-hidden="true"
      className={`room-frame pointer-events-none ${className}`}
    />
  );
}
