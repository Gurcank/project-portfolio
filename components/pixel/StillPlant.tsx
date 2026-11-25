import { PixelLayer } from "@/components/pixel/PixelSprite";
import { gridSize } from "@/components/pixel/pixel";
import { plantBase, plantLeaves, plantPalette } from "@/components/pixel/sprites/plant";

/** The mascot standing still, for pages without the experience layer (the 404). No JavaScript. */
export function StillPlant({ leaves, className }: { leaves: number; className?: string }) {
  const { width, height } = gridSize(plantBase);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <PixelLayer grid={plantBase} palette={plantPalette} />
      {plantLeaves.slice(0, leaves).map((leaf, i) => (
        <PixelLayer key={i} grid={leaf} palette={plantPalette} />
      ))}
    </svg>
  );
}
