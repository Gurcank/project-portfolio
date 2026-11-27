"use client";

import "@/components/cassette/cassette.css";
import type { MotionValue } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";

import { cassetteFill } from "@/components/cassette/cassette-colors";
import { CassetteReels } from "@/components/cassette/CassetteReels";
import type { Project, ProjectCover } from "@/lib/content";
import { durationSeconds, easingPoints } from "@/lib/motion-tokens";

type CassetteProps = {
  slug: string;
  color: Project["color"];
  catalog: string;
  title: string;
  /** The live site's screenshot, printed on the label; without one the title is written on it by hand */
  image?: ProjectCover["image"];
  sizes?: string;
  progress?: MotionValue<number>;
  spinning?: boolean;
  /** Shared between the shelf cover and the deck, so the whole tape flies from one to the other */
  layoutId?: string;
  className?: string;
};

// Screws at the four corners and one on the bottom edge, in viewBox units
const SCREWS = [
  [4.2, 4.2],
  [95.8, 4.2],
  [4.2, 59.8],
  [95.8, 59.8],
  [50, 53.5],
] as const;

/**
 * A compact cassette drawn in code (V2b, SPEC §8): a shell in the project's colour with a little sheen,
 * five screws, a paper label (catalog number, side A, the screenshot printed on it), the smoked window
 * with two reels and the brown tape, and the head opening along the bottom. 100 × 64, the real tape's
 * proportions. Decorative: the same title and catalog number are real text next to it.
 */
export function Cassette({
  slug,
  color,
  catalog,
  title,
  image,
  sizes,
  progress,
  spinning,
  layoutId,
  className,
}: CassetteProps) {
  return (
    // layoutId sits on an HTML wrapper: Motion projects (measures and flies) HTML boxes, not SVG
    <m.div
      layoutId={layoutId}
      // The tape travelling: the slow token, same curve as every entrance on the site
      transition={{
        layout: { duration: durationSeconds("--duration-slow"), ease: easingPoints("--ease-out") },
      }}
      aria-hidden="true"
      data-cassette={slug}
      className={`cassette relative ${className ?? ""}`}
    >
      <svg viewBox="0 0 100 64" focusable="false" className="absolute inset-0 size-full">
        <rect width="100" height="64" rx="3" className={cassetteFill[color]} />
        {/* Plastic catches the light on its upper half */}
        <rect width="100" height="28" rx="3" className="fill-paper/10" />
        <rect
          x="1.2"
          y="1.2"
          width="97.6"
          height="61.6"
          rx="2.2"
          fill="none"
          strokeWidth="0.6"
          className="stroke-ink/25"
        />
        <rect x="7" y="5" width="86" height="35" rx="1.5" className="fill-paper" />
        <text x="10" y="8.4" fontSize="3" className="fill-ink font-mono">
          {catalog}
        </text>
        <text x="90" y="8.4" fontSize="3" textAnchor="end" className="fill-ink font-mono">
          A
        </text>
        {/* The head opening: where the tape meets the deck's head */}
        <path d="M22 64 L26 49 H74 L78 64 Z" className="fill-ink/20" />
        {[33, 41.5, 58.5, 67].map((x) => (
          <rect
            key={x}
            x={x - 1.6}
            y="58"
            width="3.2"
            height="4"
            rx="0.6"
            className="fill-ink/60"
          />
        ))}
        {SCREWS.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="1.5" className="fill-ink/30" />
            <path
              d={`M${cx - 0.9} ${cy}H${cx + 0.9}`}
              strokeWidth="0.4"
              className="stroke-paper/70"
            />
          </g>
        ))}
      </svg>
      {image ? (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          alt=""
          sizes={sizes ?? "(width >= 80rem) 24rem, 25vw"}
          className="cassette-art object-cover object-top"
        />
      ) : (
        <span className="cassette-art cassette-art-hand font-hand text-ink">{title}</span>
      )}
      <CassetteReels progress={progress} spinning={spinning} className="cassette-window" />
    </m.div>
  );
}
