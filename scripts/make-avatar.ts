/*
 * V3: turns a portrait photo into the pixel avatar's character grid (ADR-08 sprite format).
 * The photo never enters the repo: pass its path, commit only the printed grid.
 *
 *   npx tsx scripts/make-avatar.ts <photo> [crop x y width height] > grid.txt
 *
 * Every pixel snaps to the nearest of a few token colours; near-white becomes "." (transparent),
 * so the avatar sits on whatever tone its section paints.
 */
import sharp from "sharp";

const [photo, ...crop] = process.argv.slice(2);
if (!photo) {
  console.error("usage: tsx scripts/make-avatar.ts <photo> [x y width height]");
  process.exit(1);
}

const COLUMNS = 32;
const ROWS = 36;

// Same values as styles/tokens.css (ink, skin, skin-shade, rose): the grid stores characters, not colours
const swatches: Array<[string, [number, number, number]]> = [
  ["k", [0x1c, 0x24, 0x1b]],
  ["s", [0xe8, 0xc4, 0xa8]],
  ["d", [0xc4, 0x93, 0x78]],
  ["r", [0xd0, 0x8c, 0x83]],
];

const nearest = (r: number, g: number, b: number) => {
  // Bright, unsaturated pixels are the studio backdrop
  if (Math.min(r, g, b) > 225) return ".";
  let best = ".";
  let distance = Infinity;
  for (const [char, [sr, sg, sb]] of swatches) {
    // Weighted RGB distance: close enough to perceptual for four far-apart swatches
    const d = 2 * (r - sr) ** 2 + 4 * (g - sg) ** 2 + 3 * (b - sb) ** 2;
    if (d < distance) {
      distance = d;
      best = char;
    }
  }
  return best;
};

const image = sharp(photo);
const region = crop.length === 4 ? crop.map(Number) : null;
const source = region
  ? image.extract({ left: region[0]!, top: region[1]!, width: region[2]!, height: region[3]! })
  : image;
const { data, info } = await source
  .resize(COLUMNS, ROWS, { fit: "fill", kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const rows: string[] = [];
for (let y = 0; y < info.height; y += 1) {
  let row = "";
  for (let x = 0; x < info.width; x += 1) {
    const i = (y * info.width + x) * 3;
    row += nearest(data[i]!, data[i + 1]!, data[i + 2]!);
  }
  rows.push(row);
}
console.log(rows.map((row) => `  "${row}",`).join("\n"));
