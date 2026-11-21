import type { Metadata } from "next";
import Link from "next/link";

import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";

// Unmatched URLs have no locale, so the 404 speaks both languages (copy: CONTENT §8).
// Moves to content/site/*.yaml with the rest of the microcopy in D1.
export const metadata: Metadata = {
  title: "404 · Gürcan Karadağ",
};

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={`${fontVariables} antialiased`}>
      <body className="bg-paper text-ink">
        <main className="mx-auto grid min-h-dvh max-w-page content-center gap-12 px-(--gutter) py-16">
          <p className="font-mono text-label text-accent uppercase">404</p>
          <section>
            <h1 className="text-h1 font-black font-stretch-condensed">Bu kaset rafta yok.</h1>
            <p className="mt-3 text-lead text-ink-muted">Sayfa taşınmış ya da hiç olmamış.</p>
            <Link
              href="/"
              className="mt-6 inline-block font-mono text-label uppercase underline underline-offset-4"
            >
              Rafa dön
            </Link>
          </section>
          <section lang="en">
            <h2 className="text-h2 font-black font-stretch-condensed">
              This tape isn&apos;t on the shelf.
            </h2>
            <p className="mt-3 text-lead text-ink-muted">The page moved or never existed.</p>
            <Link
              href="/en"
              className="mt-6 inline-block font-mono text-label uppercase underline underline-offset-4"
            >
              Back to the shelf
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
