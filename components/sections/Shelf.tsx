import "@/components/cassette/shelf.css";
import { cassetteSurface } from "@/components/cassette/cassette-colors";
import { CassetteCover } from "@/components/cassette/CassetteCover";
import { Emphasis } from "@/components/markdown/Emphasis";
import type { ProjectView } from "@/lib/content";

type ShelfProps = {
  heading: string;
  projects: ProjectView[];
  openLabel: string;
};

/*
 * The signature element (SPEC §8): seven tapes, each a real link to its case study hash.
 * Desktop shows spines + one cover card (hover or keyboard focus picks it, shelf.css);
 * mobile shows the same items as label cards with the card text always visible.
 */
export function Shelf({ heading, projects, openLabel }: ShelfProps) {
  // "{project} case study'sini aç" → words around the tape name, read but not shown
  const [labelBefore = "", labelAfter = ""] = openLabel.split("{project}");

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-line">
      <div className="mx-auto max-w-page px-(--gutter) py-24 md:py-32">
        <h2 id="work-heading" className="text-h1 font-black font-stretch-condensed">
          <Emphasis text={heading} />
        </h2>

        <ul className="shelf-list mt-12 flex flex-col gap-4 md:mt-16 lg:flex-row lg:items-end lg:gap-0">
          {projects.map((project) => (
            <li
              key={project.slug}
              data-featured={project.featured || undefined}
              className="shelf-item relative flex gap-4 rounded-md border border-line p-3 lg:border-0 lg:p-0"
            >
              <a
                id={`cassette-${project.slug}`}
                href={`#${project.slug}`}
                data-case-source="shelf"
                className={`shelf-spine flex w-12 shrink-0 flex-col items-center justify-between rounded-sm py-3 lg:h-128 lg:w-16 lg:py-4 xl:h-112 ${cassetteSurface[project.color]}`}
              >
                {/* The accessible name is built from the visible spine text plus the hidden template words,
                    so what voice users see is always part of what they can say (WCAG 2.5.3) */}
                <span className="sr-only">{labelBefore}</span>
                <span className="shelf-spine-title font-mono text-label tracking-wide lg:hidden">
                  {project.catalog}
                </span>
                <span className="hidden font-mono text-label tracking-wide lg:block">
                  {project.catalog}
                </span>{" "}
                <span className="shelf-spine-title shelf-spine-name sr-only text-h3 font-black font-stretch-condensed lg:not-sr-only">
                  {project.study.title}
                </span>
                <span className="sr-only">{labelAfter}</span>
                {project.featured && (
                  <span aria-hidden="true" className="text-lead">
                    ★
                  </span>
                )}
              </a>

              <div className="shelf-card min-w-0 flex-1 py-1">
                {/* A smaller cover keeps cover + text within the spine height, so the card never runs past the shelf;
                    the card is narrower between lg and xl, so the cover shrinks more there */}
                <div className="mb-6 hidden w-3/5 lg:block xl:w-4/5">
                  <CassetteCover
                    catalog={project.catalog}
                    title={project.study.title}
                    color={project.color}
                  />
                </div>
                {/* wrap-anywhere: one long Turkish word must break rather than push the page sideways */}
                <h3 className="text-h3 font-black wrap-anywhere font-stretch-condensed">
                  {project.study.title}
                </h3>
                <p className="mt-2 max-w-prose">{project.study.card.problem}</p>
                <p className="mt-4 font-mono text-label tracking-wide text-ink-muted">
                  {project.study.card.credits}
                </p>
                <p className="mt-1 font-mono text-label tracking-wide">
                  {project.study.card.result}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
