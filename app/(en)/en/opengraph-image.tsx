import { getSiteCopy } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = getSiteCopy("en").meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
