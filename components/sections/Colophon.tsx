import { DecorSlot, RoomFrame } from "@/components/experience/DecorSlot";
import type { CreditKind, CreditView, SiteCopy } from "@/lib/content";
import { WaveText } from "@/components/markdown/WaveText";

type ColophonProps = {
  heading: string;
  text: string;
  credits: SiteCopy["credits"];
  groups: { kind: CreditKind; items: CreditView[] }[];
};

const externalLink = "underline underline-offset-4 hover:no-underline";

/** One credit on one line (v3, smaller): name and source, licence, who made it, where it is used. */
function Credit({ credit }: { credit: CreditView }) {
  return (
    <li className="py-1">
      <a href={credit.source} rel="noopener noreferrer" className={externalLink}>
        {credit.name}
        <span aria-hidden="true"> ↗</span>
      </a>
      {credit.license && (
        <>
          <span aria-hidden="true" className="text-ink-muted">
            {" · "}
          </span>
          {credit.licenseUrl ? (
            <a href={credit.licenseUrl} rel="noopener noreferrer" className={externalLink}>
              {credit.license}
            </a>
          ) : (
            credit.license
          )}
        </>
      )}
      {/* A long list of designers must wrap, not push the column wider */}
      <span className="wrap-anywhere text-ink-muted">
        {credit.author && ` · ${credit.author}`} · {credit.usedFor}
      </span>
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
        <DecorSlot name="colophon-right" side="right" at="bottom" />
        <div className="lg:col-span-6">
          <h2
            id="colophon-heading"
            className="font-display text-h1 font-black font-stretch-condensed"
          >
            <WaveText text={heading} />
          </h2>
          <p className="mt-8 max-w-prose text-lead">{text}</p>
        </div>

        <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:col-start-8">
          <RoomFrame name="colophon-painting" />
          <div
            id="credits"
            aria-labelledby="credits-heading"
            role="region"
            className="scroll-mt-24 text-small"
          >
            {/* Small on purpose (v3): the credits are owed, not the point of the section */}
            <h3
              id="credits-heading"
              className="font-mono text-label tracking-wide text-ink-muted uppercase"
            >
              {credits.heading}
            </h3>
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3">
              {groups.map((group) => (
                <section key={group.kind} aria-labelledby={`credits-${group.kind}`}>
                  <h4
                    id={`credits-${group.kind}`}
                    className="font-mono text-label tracking-wide text-ink-muted uppercase"
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
      </div>
    </section>
  );
}
