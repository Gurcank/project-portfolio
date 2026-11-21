import type { ReactNode } from "react";

import "@/styles/globals.css";
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
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
