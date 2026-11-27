import "@/components/footer/footer.css";
import { PixelLayer } from "@/components/pixel/PixelSprite";
import { pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";
import { walkerPalette, walkerSitting } from "@/components/pixel/sprites/avatar";
import {
  CAMP,
  HEIGHT,
  landscape,
  PINE_BOX,
  PINE_SIZES,
  pinePath,
  WIDTH,
} from "@/components/footer/landscape";
import { SkyClock } from "@/components/footer/SkyClock";

const firePalette: PixelPalette = {
  a: pixelFill.accentNight,
  y: pixelFill.mustard,
  t: pixelFill.terracotta,
  k: pixelFill.inkMuted,
};

// Two flame frames, swapped in steps (footer.css): a flicker, not a loop that pulls the eye
const fireA: PixelGrid = ["..a..", ".aya.", ".aya.", "ayyya", "tayat", "kk.kk"];
const fireB: PixelGrid = [".a...", "..ya.", ".aya.", "ayyya", "tayat", "kk.kk"];

// Inside the night footer "ink" is re-pointed to light text: the avatar keeps black hair and shirt
const campPalette: PixelPalette = {
  ...walkerPalette,
  k: pixelFill.timeNight,
  p: pixelFill.inkNight,
};

const SIT = { x: CAMP.from + 6, y: HEIGHT - CAMP.ground - walkerSitting.length };
const FIRE = { x: CAMP.from + 18, y: HEIGHT - CAMP.ground - fireA.length };

/*
 * The nature footer (V8): mountains and a pine forest at night, stars, and a camp fire where the avatar
 * who walked down the page sits at the end of the journey. The sky follows the visitor's clock (SkyClock):
 * a dawn or dusk glow, the sun by day, the moon and stars at night. Decor only: hidden from assistive
 * tech, wide screens only (SPEC §8), and still for reduced motion and "pause motion".
 */
export function NatureScene() {
  return (
    <div aria-hidden="true" className="nature" data-sky="night">
      <SkyClock />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        shapeRendering="crispEdges"
        focusable="false"
        className="block size-full"
      >
        <circle cx="40" cy="12" r="5" className="nature-sun fill-cassette-mustard" />
        <circle cx="196" cy="7" r="3" className="nature-moon fill-ink-night" />
        <path d={landscape.stars} className="nature-stars fill-ink-night" />
        <path d={landscape.twinkling} className="nature-stars nature-twinkle fill-ink-night" />
        <path d={landscape.farRidge} className="fill-ridge-far" />
        <path d={landscape.nearRidge} className="fill-ridge-near" />
        <defs>
          {PINE_SIZES.map((size) => (
            <symbol key={size} id={`pine-${size}`} viewBox={`0 0 ${PINE_BOX} ${size + 1}`}>
              <path d={pinePath(size)} />
            </symbol>
          ))}
        </defs>
        <g className="fill-forest">
          {landscape.trees.map((tree) => (
            <use
              key={tree.x}
              href={`#pine-${tree.size}`}
              x={tree.x}
              y={tree.y}
              width={PINE_BOX}
              height={tree.size + 1}
            />
          ))}
        </g>
        <svg x={SIT.x} y={SIT.y} width={12} height={walkerSitting.length} className="camp-avatar">
          <PixelLayer grid={walkerSitting} palette={campPalette} />
        </svg>
        <svg x={FIRE.x} y={FIRE.y} width={5} height={fireA.length}>
          <PixelLayer grid={fireA} palette={firePalette} className="fire-a" />
          <PixelLayer grid={fireB} palette={firePalette} className="fire-b" />
        </svg>
      </svg>
    </div>
  );
}
