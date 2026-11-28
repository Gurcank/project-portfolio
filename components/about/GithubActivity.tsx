import { getContributions } from "@/lib/github";
import { fillTemplate } from "@/lib/hash-route";

type GithubActivityProps = {
  profileUrl: string;
  copy: { heading: string; summary: string };
  /** The section's h3 style, so every heading in About matches */
  headingClass: string;
};

// One pixel per day; the four levels step up in pine green (v4), the empty days are the line colour
const LEVEL_OPACITY = [1, 0.35, 0.55, 0.8, 1];

/**
 * The last year on GitHub (v3, R6) as a pixel grid: 53 weeks × 7 days, drawn at build time. The grid is
 * a picture of the sentence beside it, so it is hidden from assistive tech and the sentence carries the
 * number. With no data (GitHub unreachable at build), nothing is rendered at all.
 */
export async function GithubActivity({ profileUrl, copy, headingClass }: GithubActivityProps) {
  const data = await getContributions(profileUrl);
  if (!data) return null;
  const cells = data.weeks.flatMap((days, week) =>
    days.map((level, day) => ({ week, day, level })),
  );
  const empty = cells.filter((cell) => cell.level === 0);
  const active = cells.filter((cell) => cell.level > 0);
  const path = (list: typeof cells) =>
    list.map(({ week, day }) => `M${week * 2} ${day * 2}h1.6v1.6h-1.6z`).join("");

  return (
    <>
      <h3 className={headingClass}>
        <a
          href={profileUrl}
          lang="en"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {copy.heading}
          <span aria-hidden="true"> ↗</span>
        </a>
      </h3>
      <p className="mt-2 font-mono text-label tracking-wide text-ink-muted">
        {fillTemplate(copy.summary, { count: String(data.total) })}
      </p>
      <svg
        viewBox={`0 0 ${data.weeks.length * 2} 14`}
        aria-hidden="true"
        focusable="false"
        shapeRendering="crispEdges"
        className="mt-4 w-full max-w-prose"
      >
        <path d={path(empty)} className="fill-line" />
        {[1, 2, 3, 4].map((level) => (
          <path
            key={level}
            d={path(active.filter((cell) => cell.level === level))}
            className="fill-pine"
            fillOpacity={LEVEL_OPACITY[level]}
          />
        ))}
      </svg>
    </>
  );
}
