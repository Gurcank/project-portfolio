type DrawnArrowProps = {
  className?: string;
};

/*
 * A hand-drawn arrow that draws itself as it scrolls into view (V5, INS-13; styles/scroll.css).
 * `pathLength` normalises both strokes to 1, so the dash trick works whatever the path's real length.
 * Decor: it points at something the page already says in words.
 */
export function DrawnArrow({ className }: DrawnArrowProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`drawn-arrow ${className ?? ""}`}
    >
      {/* A loose loop on the way down, like a pen note in a margin */}
      <path
        pathLength={1}
        d="M20 8 C 70 18, 96 52, 70 74 C 52 90, 34 70, 52 58 C 74 44, 92 92, 82 146"
      />
      <path pathLength={1} d="M64 132 L 82 148 L 98 128" />
    </svg>
  );
}
