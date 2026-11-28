import "@/components/sections/principles.css";
import { PrinciplesCrowd } from "@/components/decor/PrinciplesCrowd";
import { DecorSlot, RoomFrame, RoomShelf } from "@/components/experience/DecorSlot";
import { CassetteChip } from "@/components/cassette/CassetteChip";
import type { PrincipleView } from "@/lib/content";
import { WaveText } from "@/components/markdown/WaveText";
import { ReadText } from "@/components/markdown/ReadText";

type PrinciplesProps = {
  heading: string;
  opening: string;
  principles: PrincipleView[];
  openLabel: string;
};

/*
 * "How I decide" (SPEC §8, INS-14 / INS-18): one sentence gets a screen of its own, then five
 * "when this happens → I do this" rules, each with the tape that taught it. The rules have no
 * ranking, so they are a plain list, not a numbered one.
 */
export function Principles({ heading, opening, principles, openLabel }: PrinciplesProps) {
  return (
    <section id="principles" aria-labelledby="principles-heading" data-time="afternoon">
      {/* V5: a crowd passing at the foot of the section (decor) */}
      <PrinciplesCrowd />
      <div className="relative mx-auto max-w-page px-(--gutter)">
        <DecorSlot name="principles-right" side="right" at="bottom" />
        {/* A full screen only from lg: on a phone it would push the principles a screen away (INS-02) */}
        <div className="flex items-center py-32 lg:min-h-svh">
          <p className="principles-opening font-display text-h1 font-black font-stretch-condensed lg:w-3/4">
            <ReadText text={opening} />
          </p>
          {/* v3: a painting on the wall beside the sentence, in the quarter it leaves free */}
          <RoomFrame name="principles-painting" className="ml-auto" />
        </div>

        <div className="pb-24 md:pb-32">
          <h2
            id="principles-heading"
            className="font-display text-h1 font-black font-stretch-condensed"
          >
            <WaveText text={heading} />
          </h2>
          <ul className="mt-12 border-t border-line md:mt-16">
            {principles.map((principle) => (
              <li
                key={principle.order}
                className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-8"
              >
                <p className="font-display text-h3 font-black font-stretch-condensed lg:col-span-5">
                  {principle.condition}
                  {/* No-break space: the arrow never ends up alone on the next line */}
                  <span aria-hidden="true">{" →"}</span>
                </p>
                <div className="flex flex-col items-start gap-4 lg:col-span-6 lg:col-start-7">
                  <p className="max-w-prose text-lead">{principle.action}</p>
                  <CassetteChip
                    slug={principle.project.slug}
                    color={principle.project.color}
                    label={`${principle.project.catalog} ${principle.project.title}`}
                    openLabel={openLabel}
                  />
                </div>
              </li>
            ))}
          </ul>
          {/* v3: more of the room: the rest of the films, a map, boots for the trail */}
          <RoomShelf name="principles-shelf" className="mt-16" />
        </div>
      </div>
    </section>
  );
}
