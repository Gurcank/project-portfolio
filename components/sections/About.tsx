import { GithubActivity } from "@/components/about/GithubActivity";
import { ToolDesk } from "@/components/about/ToolDesk";
import "@/components/sections/about.css";
import { Fragment } from "react";

import { CassetteChip } from "@/components/cassette/CassetteChip";
import { DecorSlot, RoomShelf } from "@/components/experience/DecorSlot";
import { AtaturkPortrait } from "@/components/respect/AtaturkPortrait";
import { TurkishFlag } from "@/components/respect/TurkishFlag";
import { WaveText } from "@/components/markdown/WaveText";
import { readWords, wordCount } from "@/components/markdown/ReadText";
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
  /** The GitHub profile, for the build-time activity grid (v3) */
  githubUrl: string;
};

/**
 * Arrows in a note point at the chip; listeners don't need to hear "up arrow". On a phone the note sits
 * under its sentence, so "↑" is right; from lg it sits in the margin level with the chip, so it points
 * across to it instead. Same glyph slot, no change to the words.
 */
function NoteText({ text }: { text: string }) {
  return text.split(/([↑↓←→])/).map((part, index) =>
    /^[↑↓←→]$/.test(part) ? (
      <span key={index} aria-hidden="true">
        <span className="lg:hidden">{part}</span>
        <span className="hidden lg:inline">{part === "↑" || part === "↓" ? "→" : part}</span>
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
 * About (v4 layout; INS-27, after another look at the reference sites: a reading column with a fact table
 * beside it, then a collection below). From lg: margin notes in the left two columns, the story, goals and
 * a skills fact table in the middle seven, and on the right the Atatürk portrait with the flag in their
 * own fixed frame, apart from any decor (SPEC §6). Below the story, the collection: the GitHub year, the tool
 * desk and the record shelf. On a phone it is one column in reading order.
 */
export function About({ heading, about, projects, openLabel, portrait, githubUrl }: AboutProps) {
  const items = withNotes(parseStory(about.story), about.notes);

  // Where each text piece starts in the story, so the brightening runs through it as one passage
  const offsets = items.map((_, index) =>
    items
      .slice(0, index)
      .reduce((sum, item) => (item.kind === "text" ? sum + wordCount(item.text) : sum), 0),
  );
  const storyTotal = items.reduce(
    (sum, item) => (item.kind === "text" ? sum + wordCount(item.text) : sum),
    0,
  );

  const h3 = "font-display text-h3 font-bold font-stretch-semi-condensed";

  return (
    <section id="about" aria-labelledby="about-heading" data-time="sunset">
      <div className="relative mx-auto grid max-w-page gap-12 px-(--gutter) pt-24 pb-32 md:pt-32 md:pb-48 lg:grid-cols-12 lg:gap-8">
        <DecorSlot name="about-right" side="right" />
        <h2
          id="about-heading"
          className="font-display text-h1 font-black font-stretch-condensed lg:col-span-12"
        >
          <WaveText text={heading} />
        </h2>

        <div className="lg:col-span-7 lg:col-start-3">
          <p className="relative max-w-prose text-body-lg">
            {items.map((item, index) => {
              if (item.kind === "text") {
                // One passage: the brightening runs through the whole story, chips and notes aside
                return (
                  <Fragment key={index}>
                    {readWords(item.text, offsets[index], storyTotal)}
                  </Fragment>
                );
              }
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

          <p className="mt-8 max-w-prose font-mono text-label tracking-wide text-ink-muted">
            {/* "2023 –" alone at a line end reads as unfinished. A no-break space alone is not enough:
                Unicode still allows a break after a dash before one (UAX #14, LB12a), so a word joiner
                follows the dash */}
            {about.credentials.replaceAll(" – ", "\u00a0\u2013\u2060\u00a0")}
          </p>

          <h3 className={`mt-16 ${h3}`}>{about.goalsHeading}</h3>
          <p className="mt-4 max-w-prose">{about.goals}</p>

          {/* A fact table, one hairline per row (Kamal-style), not a list of bars: a self-rated
              "80% React" says nothing a reader can check */}
          <div className="mt-16">
            <h3 className={h3}>{about.skills.heading}</h3>
            <dl className="mt-4 flex flex-col">
              {about.skills.groups.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col gap-1 border-t border-line py-3 md:grid md:grid-cols-3 md:gap-4"
                >
                  <dt className="font-mono text-label tracking-wide text-ink-muted uppercase md:pt-1">
                    {group.label}
                  </dt>
                  <dd className="md:col-span-2">{group.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Without a verified portrait there is no right column at all */}
        {portrait && (
          <aside className="flex max-w-48 flex-col gap-6 lg:col-span-3 lg:col-start-10 lg:max-w-none">
            <AtaturkPortrait portrait={portrait} caption={about.portraitCaption} />
            <TurkishFlag label={about.flagLabel} className="w-full rounded-sm" />
          </aside>
        )}

        {/* The collection (v4): things gathered over the years, each in its own cell */}
        <div className="grid gap-16 lg:col-span-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <GithubActivity profileUrl={githubUrl} copy={about.github} headingClass={h3} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ToolDesk
              heading={about.tools.heading}
              items={about.tools.items}
              tidyLabel={about.tools.tidy}
            />
          </div>
          {/* v3: the records on a shelf, face out, with the turntable and (v4) the CD player */}
          <RoomShelf name="about-shelf" className="lg:col-span-12" />
        </div>
      </div>
    </section>
  );
}
