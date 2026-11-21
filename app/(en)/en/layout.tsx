import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/RootDocument";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Gürcan Karadağ",
  alternates: { canonical: "/en", languages: languageAlternates() },
};

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
