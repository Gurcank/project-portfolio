import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("tr");

export default function TurkishRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
