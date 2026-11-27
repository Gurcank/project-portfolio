import Image from "next/image";

import type { ProjectView } from "@/lib/content";

// Three tapes with screenshots, never ATAMap: a tilted snapshot is playful, and ATAMap stays respectful
const SNAPSHOTS = ["erasmusmap", "nature-sport-handbook", "iklim-krizi"] as const;
const TILTS = ["-rotate-3", "rotate-2", "-rotate-1"] as const;

/*
 * V6: project screenshots as polaroids pinned under the About story, captioned by hand (Caveat).
 * The same screenshots are in the shelf and the case studies, so here they are decor: hidden from
 * assistive tech, wide screens only (lazy, and not displayed below lg, so phones never fetch them).
 */
export function Polaroids({ projects }: { projects: ProjectView[] }) {
  const shots = SNAPSHOTS.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is ProjectView & { cover: NonNullable<ProjectView["cover"]> } =>
      !!project?.cover,
  );
  if (!shots.length) return null;

  return (
    <div aria-hidden="true" className="hidden items-start gap-8 lg:col-span-9 lg:flex">
      {shots.map((project, index) => (
        <figure
          key={project.slug}
          className={`polaroid w-48 shrink-0 bg-time-noon p-3 pb-2 shadow-overlay ${TILTS[index]}`}
        >
          <Image
            src={project.cover.image.src}
            width={project.cover.image.width}
            height={project.cover.image.height}
            placeholder="blur"
            blurDataURL={project.cover.image.blurDataURL}
            alt=""
            sizes="14rem"
            className="aspect-square w-full object-cover object-top"
          />
          <figcaption className="mt-2 font-hand text-h3 leading-tight text-ink">
            {project.study.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
