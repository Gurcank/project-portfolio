import { ImageResponse } from "next/og";

import { ogColors } from "@/lib/og/tokens";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// A tape seen from the front: body in accent, two reels in paper — the site's one object, readable at tab size
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: 3,
          backgroundColor: ogColors.accent,
        }}
      >
        {[0, 1].map((reel) => (
          <div
            key={reel}
            style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ogColors.paper }}
          />
        ))}
      </div>
    </div>,
    size,
  );
}
