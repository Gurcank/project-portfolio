import type { SiteCopy } from "@/lib/content";

// "Credits" joins this line in D5, when the credits section exists to link to.
export function SiteFooter({ copy }: { copy: SiteCopy["footer"] }) {
  return (
    <footer className="border-t border-line">
      <p className="mx-auto flex max-w-page flex-col gap-1 px-(--gutter) py-8 text-small text-ink-muted md:flex-row md:gap-3">
        <span>{copy.copyright}</span>
        <span aria-hidden="true" className="hidden md:inline">
          ·
        </span>
        <span>{copy.madeIn}</span>
      </p>
    </footer>
  );
}
