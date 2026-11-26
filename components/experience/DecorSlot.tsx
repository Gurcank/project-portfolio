/*
 * An empty, invisible spot in a section's gutter where the room decor (D8) lands once it loads.
 * Server-rendered, so the position comes from the section's own layout; below xl it doesn't display.
 */
export type DecorSlotName =
  | "work-left"
  | "work-right"
  | "principles-left"
  | "principles-right"
  | "about-left"
  | "colophon-left"
  | "colophon-right"
  | "contact-left"
  | "contact-right";

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

/** The About background pattern's spot: the story and notes columns, never the portrait's column. */
export function PatternSlot() {
  return (
    <div
      data-decor-slot="about-pattern"
      aria-hidden="true"
      className="decor-behind pointer-events-none absolute inset-y-0 left-0 hidden w-3/4 xl:block"
    />
  );
}
