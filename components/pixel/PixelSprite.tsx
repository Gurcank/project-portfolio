import { gridSize, pixelPaths, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

type PixelLayerProps = {
  grid: PixelGrid;
  palette: PixelPalette;
  className?: string;
};

/**
 * One layer of a sprite, one path per colour, for sprites whose parts change separately (the plant's
 * leaves).
 */
export function PixelLayer({ grid, palette, className }: PixelLayerProps) {
  return (
    <g className={className}>
      {pixelPaths(grid, palette).map(({ fill, d }) => (
        <path key={fill} d={d} className={fill} />
      ))}
    </g>
  );
}

type PixelSpriteProps = PixelLayerProps & { width?: number };

/**
 * A whole sprite as one SVG (ADR-08). Decorative by default: hidden from assistive tech, crisp edges so
 * pixels stay square at any size. A server component: it ships no JavaScript.
 */
export function PixelSprite({ grid, palette, className }: PixelSpriteProps) {
  const { width, height } = gridSize(grid);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <PixelLayer grid={grid} palette={palette} />
    </svg>
  );
}
