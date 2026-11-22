/*
 * The Turkish flag, drawn from the annex (cetvel) of Law 2893. Units: G = 120 (flag width).
 *   L  length                                         1½ G  = 180
 *   A  outer crescent centre ← hoist seam             ½ G   = 60
 *   B  outer crescent diameter                        ½ G   → r 30
 *   C  inner ↔ outer crescent centres                 0.0625 G = 7.5
 *   D  inner crescent diameter                        0.4 G → r 24
 *   E  star circle ← where the inner circle meets the axis on the hoist side   ⅓ G = 40
 *   F  star circle diameter                           ¼ G   → r 15
 * The 1/30 G white sleeve (M) belongs to the cloth at the pole, so a drawn flag leaves it out.
 * No motion or hover props, ever (CLAUDE.md, SPEC §6): this component takes only its label.
 */

const G = 120;
const outer = { cx: G / 2, r: G / 4 };
const inner = { cx: outer.cx + G * 0.0625, r: G * 0.2 };
const starRadius = G / 8;
const starCx = inner.cx - inner.r + G / 3 + starRadius;
const cy = G / 2;

/** Five-pointed star on the star circle, one point toward the hoist (as in the annex drawing). */
function starPoints(cx: number, r: number): string {
  // Inner radius of a regular pentagram: r · sin 18° / sin 54°
  const innerRadius = (r * Math.sin(Math.PI / 10)) / Math.sin((3 * Math.PI) / 10);
  return Array.from({ length: 10 }, (_, index) => {
    const angle = Math.PI + (index * Math.PI) / 5;
    const radius = index % 2 === 0 ? r : innerRadius;
    return `${(cx + radius * Math.cos(angle)).toFixed(3)},${(cy + radius * Math.sin(angle)).toFixed(3)}`;
  }).join(" ");
}

const STAR = starPoints(starCx, starRadius);

export function TurkishFlag({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox={`0 0 ${G * 1.5} ${G}`} role="img" aria-label={label} className={className}>
      <rect width={G * 1.5} height={G} className="fill-flag-red" />
      <circle cx={outer.cx} cy={cy} r={outer.r} className="fill-flag-white" />
      <circle cx={inner.cx} cy={cy} r={inner.r} className="fill-flag-red" />
      <polygon points={STAR} className="fill-flag-white" />
    </svg>
  );
}
