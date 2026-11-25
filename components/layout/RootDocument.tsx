import Script from "next/script";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { umamiScriptUrl, umamiWebsiteId } from "@/lib/analytics";
import { restoreMotionScript } from "@/lib/motion-preference";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";

type RootDocumentProps = {
  locale: Locale;
  children: ReactNode;
};

/** Shared <html>/<body> for both root layouts; `lang` drives Turkish i/İ casing and screen-reader voice. */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    // suppressHydrationWarning: the inline script may set data-motion before React hydrates <html>
    <html lang={locale} className={`${fontVariables} antialiased`} suppressHydrationWarning>
      {/* No background here: <html> carries the paper and the section tone (globals.css); a body
          background would paint over the tone and hide it */}
      <body className="text-ink">
        {/* beforeInteractive goes into the initial HTML: a reader who paused motion doesn't see a
            frame of it on the next visit (WCAG 2.2.2). The lint rule predates the App Router; Next 16's
            docs place beforeInteractive in the root layout, and this component is both root layouts. */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="restore-motion"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: restoreMotionScript }}
        />
        {children}
        {/* Cookie-free analytics (ADR-14); without a website id nothing loads and the page is unaffected */}
        {umamiWebsiteId && (
          <Script
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
