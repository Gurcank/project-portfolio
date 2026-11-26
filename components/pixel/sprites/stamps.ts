import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

/*
 * Nature stamps (INS-25, SPEC §6): seven places as 12 × 14 pixel landscapes inside a 16 × 18 stamp
 * with perforated edges. Code-drawn, one palette (ADR-08); no photos, no generated images.
 */

export const stampPalette: PixelPalette = {
  f: pixelFill.pattern, // the stamp's paper: lighter than any page tone, like a real stamp
  s: pixelFill.line, // sky
  w: pixelFill.paper, // snow, cloud, foam
  y: pixelFill.mustard, // sun, sand
  g: pixelFill.olive, // grass, trees
  p: pixelFill.petrol, // sea, dark pines
  m: pixelFill.midnight, // open sea
  k: pixelFill.inkMuted, // rock, trunk, far mountains
  t: pixelFill.terracotta, // a path
  a: pixelFill.accent, // a boat
  r: pixelFill.rose, // almond blossom
};

const WIDTH = 16;

/** Frames a 12 × 14 picture: 2px of stamp paper around it, every other edge pixel cut away. */
function stamp(picture: readonly string[]): PixelGrid {
  const perforated = Array.from({ length: WIDTH }, (_, x) => (x % 2 === 0 ? "f" : ".")).join("");
  const edge = (y: number) => (y % 2 === 0 ? "f" : ".");
  const paper = (y: number) => `${edge(y)}${"f".repeat(WIDTH - 2)}${edge(y)}`;
  return [
    perforated,
    paper(1),
    ...picture.map((row, i) => `${edge(i + 2)}f${row}f${edge(i + 2)}`),
    paper(16),
    perforated,
  ];
}

export const stampSprites = {
  // Lycian Way: a path cut into the cliff above the sea
  lycian: stamp([
    "ssssssssssss",
    "sssssssssyys",
    "sssssssssyys",
    "ssssssssssss",
    "gggsssssssss",
    "ggggssssssss",
    "gtggggssssss",
    "ggtggggsssss",
    "gggtgggggsss",
    "ggggtgggggss",
    "pppppppppppp",
    "pppwpppppppp",
    "pppppppppwpp",
    "pppppppppppp",
  ]),
  // Dilek Peninsula: a green finger of land in the open sea
  dilek: stamp([
    "ssssssssssss",
    "ssyyssssssss",
    "ssyyssssssss",
    "ssssssssssss",
    "ssssssssssss",
    "sssssssggggs",
    "ssssgggggggg",
    "mmgggggggggm",
    "mmmmmmmmmmmm",
    "mmmmwmmmmmmm",
    "mmmmmmmmmwmm",
    "mmmmmmmmmmmm",
    "mmmmmmmmmmmm",
    "mmmmmmmmmmmm",
  ]),
  // Kaz Mountains: ridges of pine
  kaz: stamp([
    "ssssssssssss",
    "ssssssssssss",
    "sssssskkssss",
    "sssskkkkksss",
    "sskkkkkkkkks",
    "skkkkkkkkkkk",
    "kkkpkkkkkpkk",
    "kkpppkkkpppk",
    "kpppppkppppp",
    "ppgppppppgpp",
    "pgggppppgggp",
    "gggggppggggg",
    "gggggggggggg",
    "gggggggggggg",
  ]),
  // The Alps: snow on the peaks
  alps: stamp([
    "ssssssssssss",
    "ssssswssssss",
    "sssswwwsssss",
    "sssswkwsswss",
    "sssskkkswwws",
    "ssskkkkkkkws",
    "sskkkkkkkkks",
    "skkkkkkkkkkk",
    "kkkkkkkkkkkk",
    "gggggggggggg",
    "gggggggggggg",
    "gggggggggggg",
    "gggggggggggg",
    "gggggggggggg",
  ]),
  // Fethiye: a lagoon, a sandbar and a boat
  fethiye: stamp([
    "ssssssssssss",
    "ssssssssssss",
    "gggsssssssgg",
    "ggggggsssggg",
    "gggggggggggg",
    "yyyyyyyyyyyy",
    "yypppppppyyy",
    "ypppppppppyy",
    "pppppaappppp",
    "ppppaaaapppp",
    "pppppppppppp",
    "pppppppppppp",
    "yppppppppppy",
    "yyyyyyyyyyyy",
  ]),
  // Datça: an almond tree in blossom above the sea
  datca: stamp([
    "ssssssssssss",
    "sssrrrrsssss",
    "ssrrrrrrssss",
    "srrrrrrrrsss",
    "ssrrrrrrssss",
    "sssrkkrsssss",
    "sssskkssssss",
    "sssskkssssss",
    "gggkkkgggggg",
    "pppppppppppp",
    "pppppppppppp",
    "ppppppppwppp",
    "pppppppppppp",
    "pppppppppppp",
  ]),
  // Black Sea coast: terraced green hills under a cloud
  blacksea: stamp([
    "ssssssssssss",
    "sswwwsssssss",
    "swwwwwssssss",
    "ssssssssssss",
    "sssssssggsss",
    "sssssgggggss",
    "sssggggggggs",
    "sgggpppggggg",
    "ggpppgggpppp",
    "pppgggpppggg",
    "ggggpppgggpp",
    "pppppggggppp",
    "gggpppppgggg",
    "pppppppppppp",
  ]),
} satisfies Record<string, PixelGrid>;

export type StampSprite = keyof typeof stampSprites;
