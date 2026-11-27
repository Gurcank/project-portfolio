/*
 * The night landscape (V8), computed once at build time: a far ridge, a near ridge with a pine forest,
 * stars above and a clearing for the camp. Deterministic (a seeded sequence, no Math.random), so the
 * server HTML and every visit draw the same hills. Each ridge is one stepped outline and each pine size
 * one <symbol>, so the scene stays a few kilobytes of HTML (it is sent twice: markup and RSC payload).
 */

export const WIDTH = 240;
export const HEIGHT = 40;
/** Columns kept flat and tree-free for the fire and the sitting avatar */
export const CAMP = { from: 104, to: 136, ground: 6 } as const;

/** Mulberry32: a tiny seeded generator, so "random" stars and trees are the same on every build. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const columns = Array.from({ length: WIDTH }, (_, x) => x);

/** Height of each column from the bottom edge, smoothed waves so the ridges read as hills. */
const farRidge = columns.map((x) =>
  Math.round(20 + 6 * Math.sin(x / 17) + 3 * Math.sin(x / 6.1 + 2) + 2 * Math.sin(x / 2.9)),
);
const nearRidge = columns.map((x) => {
  const inCamp = x >= CAMP.from && x < CAMP.to;
  const hill = Math.round(11 + 4 * Math.sin(x / 11 + 1) + 2 * Math.sin(x / 4.3));
  return inCamp ? CAMP.ground : Math.max(CAMP.ground, hill);
});

/** One stepped outline for a ridge: up to each column's top, across one unit, then back down. */
function ridgePath(heights: number[]): string {
  const steps = heights.map((height, x) => `V${HEIGHT - height}H${x + 1}`).join("");
  return `M0 ${HEIGHT}${steps}V${HEIGHT}Z`;
}

export const PINE_SIZES = [5, 6, 7, 8, 9] as const;
/** Width of the widest pine's box, so every pine symbol shares one coordinate system. */
export const PINE_BOX = 11;

/** A pixel pine in its own box: rows widening by two, then a trunk, centred on column 5. */
export function pinePath(size: number): string {
  const centre = Math.floor(PINE_BOX / 2);
  const rows: string[] = [];
  for (let row = 0; row < size; row += 1) {
    const half = Math.floor(row / 2) + (row % 2);
    rows.push(`M${centre - half} ${row}h${half * 2 + 1}v1h-${half * 2 + 1}z`);
  }
  rows.push(`M${centre} ${size}h1v1h-1z`);
  return rows.join("");
}

const random = seeded(1922);

/** Where each pine stands: x of its box's left edge, y of its tip, and which size. */
const trees: { x: number; y: number; size: (typeof PINE_SIZES)[number] }[] = [];
for (let x = 3; x < WIDTH - 3; x += 3 + Math.floor(random() * 4)) {
  if (x >= CAMP.from - 4 && x < CAMP.to + 4) continue;
  const size = PINE_SIZES[Math.floor(random() * PINE_SIZES.length)]!;
  const base = HEIGHT - nearRidge[x]! + 1;
  trees.push({ x: x - Math.floor(PINE_BOX / 2), y: base - size - 1, size });
}

/** Stars only where the sky is open: above the far ridge with a margin. */
const stars: { x: number; y: number; twinkle: boolean }[] = [];
while (stars.length < 42) {
  const x = Math.floor(random() * WIDTH);
  const y = Math.floor(random() * 18);
  if (y < HEIGHT - farRidge[x]! - 3) stars.push({ x, y, twinkle: random() < 0.3 });
}

export const landscape = {
  farRidge: ridgePath(farRidge),
  nearRidge: ridgePath(nearRidge),
  trees,
  stars: stars
    .filter((star) => !star.twinkle)
    .map(({ x, y }) => `M${x} ${y}h1v1h-1z`)
    .join(""),
  twinkling: stars
    .filter((star) => star.twinkle)
    .map(({ x, y }) => `M${x} ${y}h1v1h-1z`)
    .join(""),
};
