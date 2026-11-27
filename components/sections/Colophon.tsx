import { DecorSlot } from "@/components/experience/DecorSlot";
import type { CreditKind, CreditView, SiteCopy } from "@/lib/content";

type ColophonProps = {
  heading: string;
  text: string;
  credits: SiteCopy["credits"];
  groups: { kind: CreditKind; items: CreditView[] }[];
};

const externalLink = "underline underline-offset-4 hover:no-underline";

function Credit({ credit }: { credit: CreditView }) {
  return (
    <li className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <a href={credit.source} rel="noopener noreferrer" className={`font-bold ${externalLink}`}>
          {credit.name}
          <span aria-hidden="true"> ↗</span>
        </a>
        {credit.license &&
          (credit.licenseUrl ? (
            <a
              href={credit.licenseUrl}
              rel="noopener noreferrer"
              className={`font-mono text-label tracking-wide ${externalLink}`}
            >
              {credit.license}
            </a>
          ) : (
            <span className="font-mono text-label tracking-wide">{credit.license}</span>
          ))}
      </p>
      {credit.author && (
        // A long list of designers must wrap, not push the column wider
        <p className="mt-1 font-mono text-label tracking-wide wrap-anywhere text-ink-muted">
          {credit.author}
        </p>
      )}
      <p className="mt-1 text-small">{credit.usedFor}</p>
    </li>
  );
}

/*
 * "How this site was made" (SPEC §5): the site's own short case study, and beside it the credits, read
 * like the back of a tape's J-card. Grouped by kind; a kind with nothing in it is not shown (ROADMAP D5).
 * Every source and licence is a real link (SPEC §14.5).
 */
export function Colophon({ heading, text, credits, groups }: ColophonProps) {
  return (
    <section id="colophon" aria-labelledby="colophon-heading" data-time="dusk">
      <div className="relative mx-auto grid max-w-page gap-16 px-(--gutter) pt-32 pb-24 md:pt-48 md:pb-32 lg:grid-cols-12 lg:gap-8">
        <DecorSlot name="colophon-left" side="left" />
        <DecorSlot name="colophon-right" side="right" at="bottom" />
        <div className="lg:col-span-6">
          <h2
            id="colophon-heading"
            className="font-display text-h1 font-black font-stretch-condensed"
          >
            {heading}
          </h2>
          <p className="mt-8 max-w-prose text-lead">{text}</p>
        </div>

        <div
          id="credits"
          aria-labelledby="credits-heading"
          role="region"
          className="scroll-mt-24 rounded-md border border-line p-6 lg:col-span-5 lg:col-start-8"
        >
          <h3
            id="credits-heading"
            className="font-display text-h3 font-black font-stretch-condensed"
          >
            {credits.heading}
          </h3>
          <div className="mt-6 flex flex-col gap-8">
            {groups.map((group) => (
              <section key={group.kind} aria-labelledby={`credits-${group.kind}`}>
                <h4
                  id={`credits-${group.kind}`}
                  className="mb-4 font-mono text-label tracking-wide text-ink-muted uppercase"
                >
                  {credits.groups[group.kind]}
                </h4>
                <ul>
                  {group.items.map((credit) => (
                    <Credit key={credit.name} credit={credit} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
