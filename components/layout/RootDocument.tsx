import Script from "next/script";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { umamiScriptUrl, umamiWebsiteId } from "@/lib/analytics";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";

type RootDocumentProps = {
  locale: Locale;
  children: ReactNode;
};

/** Shared <html>/<body> for both root layouts; `lang` drives Turkish i/İ casing and screen-reader voice. */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body className="bg-paper text-ink">
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
