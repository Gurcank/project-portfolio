import "@/components/sections/about.css";
import { Fragment } from "react";

import { CassetteChip } from "@/components/cassette/CassetteChip";
import { DecorSlot, PatternSlot } from "@/components/experience/DecorSlot";
import { AtaturkPortrait } from "@/components/respect/AtaturkPortrait";
import { TurkishFlag } from "@/components/respect/TurkishFlag";
import {
  parseStory,
  type Portrait,
  type ProjectView,
  type SiteCopy,
  type StorySegment,
} from "@/lib/content";

type AboutProps = {
  heading: string;
  about: SiteCopy["about"];
  projects: ProjectView[];
  openLabel: string;
  portrait?: Portrait;
};

/** Arrows in a note point at the chip; listeners don't need to hear "up arrow". */
function NoteText({ text }: { text: string }) {
  return text.split(/([↑↓←→])/).map((part, index) =>
    /^[↑↓←→]$/.test(part) ? (
      <span key={index} aria-hidden="true">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

type StoryItem = StorySegment | { kind: "note"; text: string };

/**
 * Places each note right after its chip, or after the last sentence for "end". Punctuation that follows
 * the chip stays with it: on a phone the note takes its own line, and a comma must not start the next one.
 */
function withNotes(segments: StorySegment[], notes: SiteCopy["about"]["notes"]): StoryItem[] {
  const items: StoryItem[] = [];
  // Characters already moved in front of a note, to drop from the start of the next text segment
  let skip = 0;
  segments.forEach((segment, index) => {
    if (segment.kind === "text") {
      const text = segment.text.slice(skip);
      skip = 0;
      if (text) items.push({ kind: "text", text });
      return;
    }
    items.push(segment);
    const note = notes.find((entry) => entry.after === segment.slug);
    if (!note) return;
    const next = segments[index + 1];
    const punctuation = next?.kind === "text" ? (/^[,.;:!?]+/.exec(next.text)?.[0] ?? "") : "";
    if (punctuation) items.push({ kind: "text", text: punctuation });
    items.push({ kind: "note", text: note.text });
    skip = punctuation.length;
  });
  const end = notes.find((entry) => entry.after === "end");
  if (end) items.push({ kind: "note", text: end.text });
  return items;
}

function MarginNote({ text }: { text: string }) {
  return (
    <span className="margin-note">
      <NoteText text={text} />
    </span>
  );
}

/*
 * About (INS-27 layout): the story in the middle column with project chips in its sentences (INS-05),
 * handwritten notes in the left margin, and on the right the Atatürk portrait with the flag in their
 * own fixed frame, apart from any decor (SPEC §6). Without a verified portrait the right column is empty.
 */
export function About({ heading, about, projects, openLabel, portrait }: AboutProps) {
  const items = withNotes(parseStory(about.story), about.notes);

  return (
    <section id="about" aria-labelledby="about-heading" data-time="sunset">
      <div className="relative mx-auto grid max-w-page gap-12 px-(--gutter) py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <PatternSlot />
        <DecorSlot name="about-left" side="left" />
        <h2
          id="about-heading"
          className="font-display text-h1 font-black font-stretch-condensed lg:col-span-12"
        >
          {heading}
        </h2>

        <div className="lg:col-span-6 lg:col-start-4">
          <p className="relative max-w-prose text-lead">
            {items.map((item, index) => {
              if (item.kind === "text") return <Fragment key={index}>{item.text}</Fragment>;
              if (item.kind === "note") return <MarginNote key={index} text={item.text} />;
              const project = projects.find((tape) => tape.slug === item.slug);
              return project ? (
                <CassetteChip
                  key={index}
                  slug={project.slug}
                  color={project.color}
                  // A short name in a sentence stays in one piece; a wrapped chip reads as two
                  label={item.label.replaceAll(" ", " ")}
                  openLabel={openLabel}
                />
              ) : (
                <Fragment key={index}>{item.label}</Fragment>
              );
            })}
          </p>

          <p className="mt-8 font-mono text-label tracking-wide text-ink-muted">
            {/* "2023 –" alone at a line end reads as unfinished. A no-break space alone is not enough:
                Unicode still allows a break after a dash before one (UAX #14, LB12a), so a word joiner
                follows the dash */}
            {about.credentials.replaceAll(" – ", "\u00a0\u2013\u2060\u00a0")}
          </p>

          <h3 className="mt-16 font-display text-h3 font-black font-stretch-condensed">
            {about.goalsHeading}
          </h3>
          <p className="mt-4 max-w-prose">{about.goals}</p>

          {/* Same shape as a case study's credits: a mono label, then plain text. No levels or bars:
              a self-rated "80% React" says nothing a reader can check */}
          <h3 className="mt-16 font-display text-h3 font-black font-stretch-condensed">
            {about.skills.heading}
          </h3>
          <dl className="mt-4 flex max-w-prose flex-col gap-4">
            {about.skills.groups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-1 md:grid md:grid-cols-3 md:gap-4"
              >
                <dt className="font-mono text-label tracking-wide text-ink-muted uppercase md:pt-1">
                  {group.label}
                </dt>
                <dd className="md:col-span-2">{group.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        {portrait && (
          <aside className="flex max-w-48 flex-col gap-6 lg:col-span-2 lg:col-start-11 lg:max-w-none">
            <AtaturkPortrait portrait={portrait} caption={about.portraitCaption} />
            <TurkishFlag label={about.flagLabel} className="w-full rounded-sm" />
          </aside>
        )}
      </div>
    </section>
  );
}
