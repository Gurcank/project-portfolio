import Image from "next/image";

import { Tracklist } from "@/components/case-study/Tracklist";
import { CaseStudyMarkdown } from "@/components/markdown/CaseStudyMarkdown";
import type { ProjectView, SiteCopy } from "@/lib/content";

type CaseStudyPanelProps = {
  project: ProjectView;
  labels: SiteCopy["microcopy"]["overlay"];
};

/*
 * Server-rendered body of one tape: tracklist + six tracks + liner notes. All seven panels travel in the
 * page payload, so the overlay opens without a network wait (ADR-11); the client only picks which to show.
 */
export function CaseStudyPanel({ project, labels }: CaseStudyPanelProps) {
  const { slug, study, cover } = project;
  const linerItems = study.liner.split(" · ");
  const sides = (["A", "B"] as const).map((side) => ({
    label: side === "A" ? labels.sideA : labels.sideB,
    tracks: study.tracks
      .filter((track) => track.side === side)
      .map(({ id, title, readingTime }) => ({ id, title, readingTime })),
  }));

  return (
    <div className="flex flex-col gap-12">
      {/* The product itself, before the story of how it was made; without a screenshot the text stands alone */}
      {cover && (
        <figure className="flex flex-col gap-3">
          <Image
            src={cover.image.src}
            width={cover.image.width}
            height={cover.image.height}
            placeholder="blur"
            blurDataURL={cover.image.blurDataURL}
            alt={cover.alt}
            // The content column: the page width minus the gutters, capped at 80rem minus the gutters
            sizes="(width >= 80rem) 72rem, 100vw"
            className="aspect-16/10 w-full rounded-sm border border-line object-cover object-top"
          />
          {cover.credit && (
            <figcaption className="font-mono text-label text-ink-muted">{cover.credit}</figcaption>
          )}
        </figure>
      )}
      <div className="grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Tracklist slug={slug} label={labels.tracklist} sides={sides} />
          </div>
        </aside>

        <div className="flex max-w-prose flex-col gap-16 lg:col-span-8">
          {sides.map((side) => (
            <div key={side.label} className="flex flex-col gap-12">
              <p className="font-mono text-label tracking-wide text-ink-muted uppercase">
                {side.label}
              </p>
              {study.tracks
                .filter((track) => side.tracks.some((item) => item.id === track.id))
                .map((track) => (
                  <section key={track.id} aria-labelledby={`${slug}-${track.id}`}>
                    <h3
                      id={`${slug}-${track.id}`}
                      tabIndex={-1}
                      className="flex scroll-mt-24 items-baseline justify-between gap-4 font-display text-h3 font-black font-stretch-condensed focus:outline-none"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="tape-chip font-mono text-label font-regular tracking-wide">
                          {track.id}
                        </span>
                        {/* The dot is for listeners only: the chip already separates number and title */}
                        <span className="sr-only"> · </span>
                        {track.title}
                      </span>
                      <span className="font-mono text-label font-regular tracking-wide text-ink-muted">
                        {track.readingTime}
                      </span>
                    </h3>
                    <div className="mt-4">
                      <CaseStudyMarkdown markdown={track.markdown} />
                    </div>
                  </section>
                ))}
            </div>
          ))}

          <section aria-labelledby={`${slug}-liner`} className="tape-rule pt-8">
            <h3
              id={`${slug}-liner`}
              lang="en"
              className="font-mono text-label tracking-wide text-ink-muted uppercase"
            >
              {labels.liner}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-label">
              {linerItems.map((item, index) => (
                <li key={item} className="inline-flex gap-3">
                  {item}
                  {index < linerItems.length - 1 && <span aria-hidden="true">·</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
