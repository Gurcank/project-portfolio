import type { NextConfig } from "next";

// Velite has no Turbopack plugin, so in dev its watcher is started from here (official Velite snippet).
// `npm run build` runs `velite build` before `next build`, so production never races the content step.
const isDev = process.argv.includes("dev");
if (isDev && !process.env.VELITE_STARTED) {
  process.env.VELITE_STARTED = "1";
  void import("velite").then((velite) => velite.build({ watch: true, clean: false }));
}

const nextConfig: NextConfig = {
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

export default nextConfig;
