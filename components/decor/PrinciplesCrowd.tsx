import { PixelLayer } from "@/components/pixel/PixelSprite";
import { gridSize, pixelFill, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";
import { walkerPalette, walkerStepA, walkerStepB } from "@/components/pixel/sprites/avatar";

/** The shirt rows of the walker take the text colour, so one drawing serves every figure. */
const shirt = (grid: PixelGrid): PixelGrid =>
  grid.map((row, y) => (y >= 7 && y <= 10 ? row.replaceAll("k", "c") : row));

const palette: PixelPalette = { ...walkerPalette, c: pixelFill.current };
const { width, height } = gridSize(walkerStepA);

// Pace, start and delay differ so the crowd never marches in step; times are multiples of the step token
const walkers = [
  { colour: "text-cassette-mustard", start: "8%", pace: 28, delay: 0 },
  { colour: "text-cassette-petrol", start: "27%", pace: 34, delay: -9 },
  { colour: "text-cassette-rose", start: "46%", pace: 31, delay: -17 },
  { colour: "text-cassette-olive", start: "64%", pace: 37, delay: -4 },
  { colour: "text-cassette-terracotta", start: "83%", pace: 30, delay: -24 },
] as const;

/*
 * V5: a small crowd walking along the foot of the principles (wide screens only; styles/scroll.css).
 * Purpose: the principles are about people, so people pass by. CSS only, no script; the walkers stand
 * still for reduced motion and "pause motion". Decor, hidden from assistive tech.
 * The two frames are drawn once as <symbol>s and every walker <use>s them in its own shirt colour, so
 * five figures cost the page two drawings, not ten.
 */
export function PrinciplesCrowd() {
  const frame = (id: string) => (
    <svg viewBox={`0 0 ${width} ${height}`} shapeRendering="crispEdges" focusable="false">
      <use href={`#${id}`} />
    </svg>
  );
  return (
    <div aria-hidden="true" className="crowd">
      <svg width="0" height="0" className="absolute">
        <symbol id="crowd-step-a" viewBox={`0 0 ${width} ${height}`}>
          <PixelLayer grid={shirt(walkerStepA)} palette={palette} />
        </symbol>
        <symbol id="crowd-step-b" viewBox={`0 0 ${width} ${height}`}>
          <PixelLayer grid={shirt(walkerStepB)} palette={palette} />
        </symbol>
      </svg>
      {walkers.map((walker) => (
        <div
          key={walker.start}
          className={`crowd-walker ${walker.colour}`}
          style={{
            ["--start" as string]: walker.start,
            ["--pace" as string]: `calc(var(--crowd-step) * ${walker.pace})`,
            ["--delay" as string]: `calc(var(--crowd-step) * ${walker.delay})`,
          }}
        >
          {frame("crowd-step-a")}
          {frame("crowd-step-b")}
        </div>
      ))}
    </div>
  );
}
