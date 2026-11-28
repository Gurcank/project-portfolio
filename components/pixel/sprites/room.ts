import { PixelCanvas, seeded } from "@/components/pixel/canvas";
import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * The room's objects (v3, "odayı büyüt"): books, a lamp, a camera, a compass, a globe, a record player,
 * boots and a map, plus three paintings and seven record sleeves. Everything that stands on a shelf uses
 * wood and cassette colours rather than ink, so it reads the same on morning paper and on dusk.
 * Decor only: drawn by DecorLayer (client, ≥ 1024 px, after idle), hidden from assistive tech.
 */

export const roomPalette: PixelPalette = {
  k: pixelFill.ink,
  m: pixelFill.inkMuted,
  o: pixelFill.paper,
  l: pixelFill.line,
  a: pixelFill.accent,
  y: pixelFill.mustard,
  v: pixelFill.olive,
  p: pixelFill.petrol,
  b: pixelFill.midnight,
  r: pixelFill.rose,
  t: pixelFill.terracotta,
  u: pixelFill.burgundy,
  w: pixelFill.tape, // wood, leather
  s: pixelFill.skin,
};

/* ── Books ─────────────────────────────────────────────────────────────── */

const BOOK_COLOURS = ["b", "p", "v", "t", "u", "w", "y", "r"] as const;

/**
 * A row of book spines: each 3–4 px wide and 11–18 px tall, a paper band near the top like a title
 * label, now and then one leaning on its neighbour. No titles: there is no book list (SPEC §6).
 */
export function bookRow(seed: number, count: number): PixelGrid {
  const random = seeded(seed);
  const books = Array.from({ length: count }, () => ({
    width: 3 + Math.floor(random() * 2),
    height: 11 + Math.floor(random() * 8),
    colour: BOOK_COLOURS[Math.floor(random() * BOOK_COLOURS.length)]!,
    band: 2 + Math.floor(random() * 3),
  }));
  const height = 18;
  const width = books.reduce((sum, book) => sum + book.width, 0);
  const canvas = new PixelCanvas(width, height);
  let x = 0;
  for (const book of books) {
    canvas.rect(x, height - book.height, book.width, book.height, book.colour);
    canvas.rect(x, height - book.height + book.band, book.width, 1, "o");
    canvas.rect(x, height - book.height + book.band + 2, book.width, 1, "o");
    x += book.width;
  }
  return canvas.grid();
}

/* ── Objects ───────────────────────────────────────────────────────────── */

export const lamp: PixelGrid = [
  "....yyyyy...",
  "...yyyyyyy..",
  "..yyyyyyyyy.",
  ".yyyyyyyyyyy",
  "......w.....",
  "......w.....",
  ".....w......",
  "....w.......",
  "...w........",
  "...w........",
  "....w.......",
  ".....w......",
  "......w.....",
  "......w.....",
  "....wwwww...",
  "...wwwwwww..",
];

export const camera: PixelGrid = [
  "...mmm........",
  "..mmmmm...a...",
  "kkkkkkkkkkkkkk",
  "kllllkkkkkllll",
  "klllkmmmmkklll",
  "kllkmbbbbmklll",
  "kllkmbobbmklll",
  "kllkmbbbbmklll",
  "klllkmmmmklllk",
  "kkkkkkkkkkkkkk",
];

export const boots: PixelGrid = [
  "..www.....www...",
  "..wyw.....wyw...",
  "..www.....www...",
  "..wyw.....wyw...",
  "..www.....www...",
  "..wwww....wwww..",
  ".wwwwww..wwwwww.",
  "wwwwwwwwwwwwwwww",
  "kkkkkkkkkkkkkkkk",
];

export const mapRoll: PixelGrid = [
  ".oooooooooooooooo.",
  "ollvvlllppllvvlllo",
  "olvvllllppllvllllo",
  "ollllaallllllllllo",
  ".oooooooooooooooo.",
];

export const compass: PixelGrid = new PixelCanvas(12, 12)
  .circle(5.5, 5.5, 5.6, "y")
  .circle(5.5, 5.5, 4.4, "o")
  .rect(5, 2, 2, 4, "a")
  .rect(5, 6, 2, 4, "m")
  .grid();

export const globe: PixelGrid = (() => {
  const canvas = new PixelCanvas(13, 17).circle(6, 6, 5.8, "p");
  // Continents: a few soft blobs, same on every build
  canvas.each((x, y, current) =>
    current === "p" && Math.sin(x * 1.3) + Math.cos(y * 1.1 + x * 0.4) > 0.9 ? "v" : null,
  );
  canvas.rect(6, 12, 1, 2, "w").rect(3, 14, 7, 1, "w").rect(2, 15, 9, 2, "w");
  return canvas.grid();
})();

export const recordPlayer: PixelGrid = (() => {
  const canvas = new PixelCanvas(22, 10);
  canvas.rect(0, 4, 22, 6, "w").rect(1, 9, 20, 1, "k");
  for (let x = 2; x < 15; x += 1) canvas.set(x, 3, "k");
  canvas.rect(3, 2, 11, 1, "k").rect(6, 3, 5, 1, "a");
  canvas.rect(17, 1, 1, 3, "m").rect(15, 1, 3, 1, "m");
  canvas.rect(18, 6, 2, 2, "y");
  return canvas.grid();
})();

/* ── Paintings: our own pixel readings of public-domain works ──────────── */

/*
 * A painting keeps its colours whatever time of day its wall is: the light parts use fixed grounds, not
 * the working paper and line colours that a dusk section re-points to dark.
 */
export const paintingPalette: PixelPalette = {
  ...roomPalette,
  o: pixelFill.timeMorning,
  l: pixelFill.timeAfternoon,
  k: pixelFill.timeNight,
  m: pixelFill.ridgeFar,
};

/**
 * After Van Gogh, The Starry Night (1889, public domain): a swirling night sky, a crescent moon, stars
 * with halos, a cypress and a village. Drawn from shapes, not traced from the canvas.
 */
export const starryNight: PixelGrid = (() => {
  const canvas = new PixelCanvas(40, 28, "b");
  canvas.each((x, y) => {
    if (y > 19) return null;
    const swirl = Math.sin((x + y * 0.7) / 3.6 + Math.sin(y / 3.2) * 1.8);
    if (swirl > 0.82) return "l";
    if (swirl > 0.35) return "p";
    return null;
  });
  canvas.circle(20, 9, 4.5, "p", 1.5).circle(20, 9, 2.2, "l");
  for (const [x, y] of [
    [6, 4],
    [13, 2],
    [29, 5],
    [26, 13],
    [11, 12],
  ] as const) {
    canvas.circle(x, y, 2, "y").set(x, y, "o");
  }
  canvas.circle(35, 4, 3, "y").circle(36.4, 3.2, 2.4, "b");
  // Hills and the village
  canvas.each((x, y) => (y > 18 + Math.sin(x / 6) * 1.5 ? "b" : null));
  for (let x = 12; x < 38; x += 4) canvas.rect(x, 22, 3, 3, "m").set(x + 1, 23, "y");
  canvas.rect(26, 17, 1, 5, "m");
  // The cypress, a dark flame on the left
  canvas.each((x, y) => {
    // Widest two-thirds down, like a flame: a sine over its height, plus a wobble at the edge
    const half =
      y < 2 ? 0 : 1 + 3.5 * Math.sin(((y - 2) / 26) * Math.PI * 0.85) + Math.sin(y * 1.7) * 0.6;
    return Math.abs(x - 6) <= half ? (Math.abs(x - 6) > half - 1.2 ? "v" : "k") : null;
  });
  return canvas.grid();
})();

/**
 * After Hokusai, The Great Wave off Kanagawa (about 1831, public domain): the curling wave with foam
 * claws, a small snow-capped mountain in the trough, two boats.
 */
export const greatWave: PixelGrid = (() => {
  const canvas = new PixelCanvas(40, 28, "o");
  canvas.each((_, y) => (y >= 10 ? "l" : null));
  // The mountain far away in the trough, snow on top
  canvas.each((x, y) => (y >= 17 && y < 23 && Math.abs(x - 30) <= (y - 17) * 1.2 ? "m" : null));
  canvas.each((x, y) => (y >= 17 && y < 19 && Math.abs(x - 30) <= (y - 17) * 1.2 ? "o" : null));
  // The wave: a hump of water rising on the left, its crest curling over to the right
  const surface = (x: number) => 27 - 19 * Math.exp(-(((x - 11) / 9) ** 2));
  canvas.each((x, y) => (y >= surface(x) ? (y < surface(x) + 2 ? "p" : "b") : null));
  canvas.circle(17, 9, 5, "b", 2).circle(17, 9, 5, "p", 1);
  // Foam claws along the crest and the curl
  for (let angle = -1.6; angle < 1.4; angle += 0.35) {
    canvas.set(17 + Math.cos(angle) * 6, 9 + Math.sin(angle) * 6, "o");
  }
  for (let x = 2; x < 14; x += 2) canvas.set(x, surface(x) - 1, "o");
  // The sea in front, two boats low in the water
  canvas.each((x, y) => (y >= 24 ? ((x + y * 2) % 7 === 0 ? "p" : "b") : null));
  canvas.rect(21, 23, 6, 1, "y").rect(32, 24, 5, 1, "y");
  return canvas.grid();
})();

/**
 * After Osman Hamdi Bey, The Tortoise Trainer (1906, public domain): an old man in a red robe and white
 * turban with a ney across his back, tortoises at his feet, a tall arched window behind him.
 */
export const tortoiseTrainer: PixelGrid = (() => {
  const canvas = new PixelCanvas(28, 36, "w");
  // The arched window, tall and pale
  canvas.rect(16, 8, 8, 20, "l").circle(20, 8, 4, "l");
  canvas.rect(19, 5, 2, 23, "w").rect(16, 16, 8, 1, "w");
  // The floor
  canvas.rect(0, 30, 28, 6, "m");
  // The figure: turban, face, robe, sash, the ney
  canvas.circle(9, 7, 2.6, "o");
  canvas.rect(8, 9, 3, 3, "s");
  canvas.each((x, y) => (y >= 12 && y < 31 && Math.abs(x - 9.5) <= 2 + (y - 12) / 5 ? "t" : null));
  canvas.rect(7, 18, 6, 1, "y");
  for (let i = 0; i < 9; i += 1) canvas.set(5 + i, 11 + i, "y");
  // Tortoises at his feet
  for (const x of [3, 15, 20]) canvas.rect(x, 32, 4, 2, "v").set(x + 4, 33, "s");
  return canvas.grid();
})();

/* ── Record sleeves: original abstract pixel sleeves (never a cover copy) ── */

type Sleeve = (canvas: PixelCanvas) => void;

/*
 * Seven sleeves, one per record on the list. Each is a small abstract composition in the record's mood,
 * our own drawing, not a reproduction of its real cover (CLAUDE.md, SPEC §9). The disc peeks out of the
 * right edge so it reads as a record at a glance.
 */
const sleeves: Sleeve[] = [
  // Sözüm Meclisten Dışarı: warm rays from a low sun
  (c) =>
    c.each((x, y) => {
      const angle = Math.atan2(y - 16, x - 8);
      return Math.floor((angle * 6) / Math.PI) % 2 ? "t" : "y";
    }),
  // Rio: sunset stripes
  (c) => c.each((_, y) => ["y", "y", "t", "t", "r", "r", "u", "u"][Math.floor(y / 2)] ?? "u"),
  // Dünya Yalan Söylüyor: a cracked chequerboard
  (c) =>
    c
      .each((x, y) => ((Math.floor(x / 4) + Math.floor(y / 4)) % 2 ? "b" : "r"))
      .each((x, y) => (Math.abs(x - y * 0.8 - 2) < 0.6 ? "o" : null)),
  // Californication: nested squares
  (c) => c.each((x, y) => (Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)) % 4 < 2 ? "p" : "l")),
  // Diamond Life: one diamond on dark
  (c) => c.each((x, y) => (Math.abs(x - 7.5) + Math.abs(y - 7.5) < 6 ? "y" : "k")),
  // Thriller: a zigzag across midnight
  (c) => c.each((x, y) => (Math.abs(y - 8 - ((x % 6) - 3) * 1.2) < 1.2 ? "o" : "b")),
  // 24K Magic: gold dots
  (c) => c.each((x, y) => (x % 4 === 1 && y % 4 === 1 ? "y" : "u")),
];

export const recordSleeves: PixelGrid[] = sleeves.map((draw) => {
  const canvas = new PixelCanvas(20, 16);
  canvas.circle(13.5, 7.5, 6.8, "k").circle(13.5, 7.5, 1.4, "t");
  const face = new PixelCanvas(16, 16);
  draw(face);
  return canvas.stamp(face.grid(), 0, 0).grid();
});

/* ── The hero desk's window ────────────────────────────────────────────── */

/**
 * A morning window (v3 hero desk), 48 × 30: a wooden frame with a cross bar, a pale sky, the sun up over
 * two ridges and a path, the footer's landscape seen in daylight.
 */
export const morningWindow: PixelGrid = (() => {
  const canvas = new PixelCanvas(48, 30, "q");
  canvas.circle(34, 10, 4, "y");
  canvas.each((x, y) => (y > 18 - Math.sin(x / 5) * 2 - Math.sin(x / 2.3) ? "v" : null));
  canvas.each((x, y) => (y > 22 - Math.sin(x / 7 + 1) * 2 ? "p" : null));
  canvas.each((x, y) => (y > 24 && Math.abs(x - 14 - (y - 24) * 2) < 1.5 ? "l" : null));
  // Frame and cross bar
  canvas
    .rect(0, 0, 48, 2, "w")
    .rect(0, 28, 48, 2, "w")
    .rect(0, 0, 2, 30, "w")
    .rect(46, 0, 2, 30, "w");
  canvas.rect(23, 0, 2, 30, "w").rect(0, 14, 48, 2, "w");
  return canvas.grid();
})();

export const windowPalette: PixelPalette = { ...paintingPalette, q: pixelFill.skyDay };
