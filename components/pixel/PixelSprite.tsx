import { gridSize, pixelRects, type PixelGrid, type PixelPalette } from "@/components/pixel/pixel";

type PixelLayerProps = {
  grid: PixelGrid;
  palette: PixelPalette;
  className?: string;
};

/** One layer of a sprite as <rect>s, for sprites whose parts change separately (the plant's leaves). */
export function PixelLayer({ grid, palette, className }: PixelLayerProps) {
  return (
    <g className={className}>
      {pixelRects(grid, palette).map((rect) => (
        <rect
          key={`${rect.x}-${rect.y}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={1}
          className={rect.fill}
        />
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
