import "@/components/hero/cta.css";
import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import { DeskTicket } from "@/components/hero/DeskTicket";
import { HeroDeskLoader } from "@/components/hero/HeroDeskLoader";
import { RevealWords } from "@/components/markdown/RevealWords";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { avatarPalette, avatarPortrait } from "@/components/pixel/sprites/avatar";
import { envelopeClosed, envelopeOpen, envelopePalette } from "@/components/pixel/sprites/symbols";
import type { SiteCopy } from "@/lib/content";
import { splitLabel } from "@/lib/text";

type HeroProps = {
  name: string;
  copy: SiteCopy["hero"];
};

/*
 * The 30-second test is won here: role, city and availability sit in the first line,
 * plain mono, never behind decor (INS-17). The name is the LCP element, so it is text, not an image.
 */
export function Hero({ name, copy }: HeroProps) {
  const labelParts = splitLabel(copy.label);

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative mx-auto max-w-page px-(--gutter) pt-12 pb-24 md:pt-24 md:pb-32 lg:pb-48 xl:pt-32"
    >
      <p className="flex items-start gap-3 font-mono text-label tracking-wide text-ink uppercase">
        <span aria-hidden="true" className="mt-2 h-px w-8 shrink-0 bg-ink md:w-16" />
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          {/* Separator trails its part, so a wrapped line never starts with a stray "·" */}
          {labelParts.map((part, index) => (
            <span key={part.text} className="inline-flex items-center gap-3">
              {/* v4: available is pine green, the colour of "go" */}
              {part.status && <span aria-hidden="true" className="size-2 rounded-full bg-pine" />}
              {part.text}
              {index < labelParts.length - 1 && <span aria-hidden="true">·</span>}
            </span>
          ))}
        </span>
      </p>

      <h1
        id="hero-name"
        // wrap-anywhere: a surname longer than the narrowest column breaks instead of pushing the page sideways
        className="mt-6 font-display text-display font-black tracking-tight wrap-anywhere font-stretch-condensed md:mt-8"
      >
        {name}
      </h1>

      <p className="mt-6 max-w-prose text-lead md:mt-8 md:text-h3">
        <RevealWords text={copy.role} />
      </p>

      {/* V3 "who am I": the pixel portrait is the one pixel piece shown on every screen size (SPEC §8),
          because it stands for the person, not the room. Decorative: the sentences say who it is */}
      <div className="mt-8 flex max-w-prose items-start gap-4 md:mt-12 md:gap-6 lg:max-w-3/5 xl:max-w-prose">
        <PixelSprite
          grid={avatarPortrait}
          palette={avatarPalette}
          className="avatar-portrait w-16 shrink-0 md:w-24"
        />
        <div className="flex flex-col gap-2 text-body text-ink-muted">
          {copy.whoami.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      {/* v4: two objects from the room (cta.css): a key on a pixel keyboard and a cassette label. Same
          words; the pictures are decoration on top of them */}
      <div className="relative mt-8 flex flex-wrap gap-4 md:mt-12">
        <a
          href="#contact"
          className="cta-key inline-flex min-h-12 items-center gap-3 px-6 font-mono text-label tracking-wide uppercase"
        >
          <PixelSprite
            grid={envelopeClosed}
            palette={envelopePalette}
            className="cta-envelope-closed w-5"
          />
          <PixelSprite
            grid={envelopeOpen}
            palette={envelopePalette}
            className="cta-envelope-open w-5"
          />
          {copy.primaryCta}
          <span aria-hidden="true">↓</span>
        </a>
        <a
          href="#work"
          className="cta-tape inline-flex min-h-12 items-center gap-3 px-6 font-mono text-label tracking-wide uppercase"
        >
          <span aria-hidden="true" className="cta-reel" />
          {copy.secondaryCta}
          <span aria-hidden="true" className="cta-reel" />
        </a>
      </div>

      {/* Desktop: the pixel desk sits at the foot of the hero, right of the text column (which is held
          narrower at lg to leave it room). Absolutely placed: it adds no height, so its late arrival shifts
          nothing (CLS) */}
      <div className="absolute right-(--gutter) bottom-16 hidden lg:block">
        <ExperienceBoundary name="hero-desk">
          <HeroDeskLoader desk={copy.desk} />
        </ExperienceBoundary>
      </div>

      {/* Phone and tablet: just the ticket, still and server-drawn (SPEC §8), under the CTAs */}
      <div aria-hidden="true" className="mt-12 lg:hidden">
        <DeskTicket ticket={copy.desk.ticket} />
      </div>
    </section>
  );
}
