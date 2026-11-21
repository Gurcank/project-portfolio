import "@/components/markdown/case-study.css";
import type { ComponentProps } from "react";
import Markdown, { type Components } from "react-markdown";

/*
 * Server-only Markdown for case study tracks (ADR-10): react-markdown never reaches the client bundle.
 * B1 marks its decision labels as `*Seçtim:*` / `*Chose:*`; those render as mono labels (CONTENT §1),
 * any other emphasis stays italic. Styling sits on the .case-study-md wrapper to keep the payload small.
 */

// One or two words ending in a colon: "Seçtim:", "Passed on:"
const DECISION_LABEL = /^\S+( \S+)?:$/u;

function Emphasis({ children }: ComponentProps<"em">) {
  const text = typeof children === "string" ? children : "";
  if (DECISION_LABEL.test(text)) {
    return <span className="decision-label">{text.replace(/:$/, "")}</span>;
  }
  return <em>{children}</em>;
}

const components: Components = {
  em: Emphasis,
  a: ({ href, children }) => (
    <a href={href} rel="noopener noreferrer">
      {children}
    </a>
  ),
};

export function CaseStudyMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="case-study-md">
      <Markdown components={components}>{markdown}</Markdown>
    </div>
  );
}
