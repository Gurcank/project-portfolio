import type { SiteCopy } from "@/lib/content";

export function SiteFooter({ copy }: { copy: SiteCopy["footer"] }) {
  return (
    <footer className="border-t border-line">
      <p className="mx-auto flex max-w-page flex-col gap-1 px-(--gutter) py-8 text-small text-ink-muted md:flex-row md:gap-3">
        <span>{copy.copyright}</span>
        <span aria-hidden="true" className="hidden md:inline">
          ·
        </span>
        <span>{copy.madeIn}</span>
        <span aria-hidden="true" className="hidden md:inline">
          ·
        </span>
        <a href="#credits" className="self-start underline underline-offset-4 hover:no-underline">
          {copy.credits}
        </a>
      </p>
    </footer>
  );
}
