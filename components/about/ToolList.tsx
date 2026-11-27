import "@/components/about/tools.css";

type ToolListProps = {
  heading: string;
  items: string[];
};

/** "Next.js" → "nextjs": the file name of its logo in public/tools (Simple Icons 16.38.1, CC0). */
export const toolSlug = (name: string) =>
  name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");

/*
 * The tools I work with (V6), logo and name together: the name is the information, the logo helps the
 * eye find a familiar one. Logos are decoration on top of the word, so they are hidden from assistive tech.
 */
export function ToolList({ heading, items }: ToolListProps) {
  return (
    <>
      <h3 className="mt-16 font-display text-h3 font-black font-stretch-condensed">{heading}</h3>
      <ul className="mt-4 flex max-w-prose flex-wrap gap-x-6 gap-y-4">
        {items.map((name) => (
          <li
            key={name}
            lang="en"
            className="flex items-center gap-2 font-mono text-label tracking-wide"
          >
            <span
              aria-hidden="true"
              className="tool-logo size-6 shrink-0"
              style={{ ["--logo" as string]: `url(/tools/${toolSlug(name)}.svg)` }}
            />
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}
