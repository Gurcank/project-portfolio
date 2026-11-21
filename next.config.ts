import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Velite has no Turbopack plugin, so in dev its watcher is started from here (official Velite snippet).
// `npm run build` runs `velite build --strict` before `next build`, so production never races the content step.
function startVeliteWatcher() {
  if (process.env.VELITE_STARTED) return;
  process.env.VELITE_STARTED = "1";
  // Not strict while watching: a half-typed content edit should log, not kill the dev server
  void import("velite").then((velite) =>
    velite.build({ watch: true, clean: false, strict: false }),
  );
}

export default function config(phase: string): NextConfig {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
  if (isDevServer) startVeliteWatcher();

  return {
    // `*.dev.tsx` routes (the /break-ui stress page) exist only under `next dev`, never in a build
    pageExtensions: isDevServer ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
    experimental: {
      // Two root layouts (TR, EN) leave no single layout for a 404 — ADR-03
      globalNotFound: true,
    },
    images: {
      formats: ["image/avif", "image/webp"],
      qualities: [75],
    },
    turbopack: {
      // A stray lockfile in the user's home folder otherwise makes Next guess the wrong workspace root
      root: import.meta.dirname,
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
