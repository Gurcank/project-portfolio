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

/*
 * CSP without nonces: nonces need per-request rendering and every page here is static, so inline
 * scripts (Next's own, the motion/intro pre-paint scripts, JSON-LD) are allowed by 'unsafe-inline'
 * (Next.js CSP guide, "Without Nonces"). What it still buys: no third-party script, frame, plugin or
 * form target except Umami's script and its event endpoint (gateway.umami.is, read from script.js).
 * No upgrade-insecure-requests: Vercel already sends HSTS, and it would upgrade local http e2e runs.
 */
function securityHeaders(isDevServer: boolean) {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://cloud.umami.is${isDevServer ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://gateway.umami.is",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    // Older browsers ignore frame-ancestors; this is their equivalent
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}

export default function config(phase: string): NextConfig {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
  if (isDevServer) startVeliteWatcher();

  return {
    // `*.dev.tsx` routes (the /break-ui stress page) exist only under `next dev`, never in a build
    pageExtensions: isDevServer ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
    async headers() {
      return [{ source: "/(.*)", headers: securityHeaders(isDevServer) }];
    },
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
