import "@/components/markdown/case-study.css";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
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

const isDecisionLabel = (node: ReactNode) =>
  isValidElement<{ children?: unknown }>(node) &&
  node.type === Emphasis &&
  typeof node.props.children === "string" &&
  DECISION_LABEL.test(node.props.children);

/**
 * A B1 decision (v4, readability): the paragraph "**Title.** _Chose:_ … _Passed on:_ … _Because:_ …
 * _Cost:_ …" becomes its title over a short table of labelled rows, so a reader can scan straight to
 * "why" or "cost". Same words in the same order; a list item without labels stays as it was.
 */
function ListItem({ children }: ComponentProps<"li">) {
  const parts = Children.toArray(children);
  const first = parts.findIndex(isDecisionLabel);
  if (first === -1) return <li>{children}</li>;

  const rows: { label: ReactNode; body: ReactNode[] }[] = [];
  for (const part of parts.slice(first)) {
    if (isDecisionLabel(part)) rows.push({ label: part, body: [] });
    else rows.at(-1)!.body.push(part);
  }
  return (
    <li className="decision">
      <p>{parts.slice(0, first)}</p>
      <dl>
        {rows.map(({ label, body }, index) => (
          <div key={index}>
            <dt>{label}</dt>
            <dd>{body}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

const components: Components = {
  em: Emphasis,
  li: ListItem,
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
