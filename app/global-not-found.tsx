import type { Metadata } from "next";
import Link from "next/link";

import "@/styles/globals.css";
import { getProfile, getSiteCopy } from "@/lib/content";
import { fontVariables } from "@/lib/fonts";
import { localePath, type Locale } from "@/lib/i18n";

// Unmatched URLs have no locale, so the 404 speaks both languages; TR first as the default (ADR-03).
export const metadata: Metadata = {
  title: `404 · ${getProfile().name}`,
  robots: { index: false },
};

function NotFoundCopy({ locale, level }: { locale: Locale; level: 1 | 2 }) {
  const { notFound } = getSiteCopy(locale);
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <section lang={locale}>
      <Heading
        className={`${level === 1 ? "text-h1" : "text-h2"} font-black font-stretch-condensed`}
      >
        {notFound.title}
      </Heading>
      <p className="mt-3 text-lead text-ink-muted">{notFound.body}</p>
      <Link
        href={localePath(locale)}
        className="mt-6 inline-flex min-h-12 items-center font-mono text-label tracking-wide uppercase underline underline-offset-4"
      >
        {notFound.cta}
      </Link>
    </section>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={`${fontVariables} antialiased`}>
      <body className="bg-paper text-ink">
        <main className="mx-auto grid min-h-dvh max-w-page content-center gap-12 px-(--gutter) py-16">
          <p className="font-mono text-label text-accent uppercase">404</p>
          <NotFoundCopy locale="tr" level={1} />
          <NotFoundCopy locale="en" level={2} />
        </main>
      </body>
    </html>
  );
}
