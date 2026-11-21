import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/RootDocument";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Gürcan Karadağ",
  alternates: { canonical: "/", languages: languageAlternates() },
};

export default function TurkishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
