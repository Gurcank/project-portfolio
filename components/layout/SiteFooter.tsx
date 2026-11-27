import type { ReactNode } from "react";

import type { SiteCopy } from "@/lib/content";

type SiteFooterProps = {
  copy: SiteCopy["footer"];
  /** Below lg the walkman and the pause-motion control live here (ARCHITECTURE §5) */
  extras?: ReactNode;
};

export function SiteFooter({ copy, extras }: SiteFooterProps) {
  return (
    <footer data-time="night">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-(--gutter) pt-8 pb-24">
        {extras}
        <p className="flex flex-col gap-1 text-small text-ink-muted md:flex-row md:gap-3">
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
      </div>
    </footer>
  );
}
