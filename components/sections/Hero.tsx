import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import { DeskTicket } from "@/components/hero/DeskTicket";
import { HeroDeskLoader } from "@/components/hero/HeroDeskLoader";
import { Emphasis } from "@/components/markdown/Emphasis";
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
              {part.status && <span aria-hidden="true" className="size-2 rounded-full bg-accent" />}
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
        <Emphasis text={copy.role} />
      </p>

      <div className="relative mt-8 flex flex-wrap gap-3 md:mt-12">
        {/* Desktop: the moving desk starts level with the CTAs, so it is always below the name and the
            role line. Absolutely placed: it adds no height, so its late arrival shifts nothing (CLS) */}
        <div className="absolute top-0 right-0 hidden lg:block">
          <ExperienceBoundary name="hero-desk">
            <HeroDeskLoader desk={copy.desk} />
          </ExperienceBoundary>
        </div>
        <a
          href="#contact"
          className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-ink px-6 font-mono text-label tracking-wide text-paper uppercase transition-colors duration-(--duration-fast) hover:bg-accent"
        >
          {copy.primaryCta}
          <span aria-hidden="true">↓</span>
        </a>
        <a
          href="#work"
          className="inline-flex min-h-12 items-center gap-3 rounded-sm border border-ink px-6 font-mono text-label tracking-wide uppercase transition-colors duration-(--duration-fast) hover:bg-ink hover:text-paper"
        >
          {copy.secondaryCta}
        </a>
      </div>

      {/* Phone and tablet: just the ticket, still and server-drawn (SPEC §8), under the CTAs */}
      <div aria-hidden="true" className="mt-12 lg:hidden">
        <DeskTicket ticket={copy.desk.ticket} />
      </div>
    </section>
  );
}
