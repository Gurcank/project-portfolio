import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
