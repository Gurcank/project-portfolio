import Script from "next/script";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { umamiScriptUrl, umamiWebsiteId } from "@/lib/analytics";
import { introScript } from "@/lib/intro-preference";
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
      {/* Plain inline scripts in <head>: they run before first paint. Measured: the same scripts at the
          top of <body> cost mobile LCP ~100 ms, in <head> nothing; next/script's beforeInteractive only
          runs once Next's runtime has loaded (~1.6 s late). Order matters: the intro reads the motion
          choice (WCAG 2.2.2, D7; D10). The no-head-element lint rule is for the Pages Router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreMotionScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      {/* No background here: <html> carries the paper and the section tone (globals.css); a body
          background would paint over the tone and hide it */}
      <body className="text-ink">
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
