import { HomeView } from "@/components/home/HomePage";
import {
  getCvHref,
  getPortrait,
  getPrinciples,
  getProfile,
  getProjects,
  getSiteCopy,
} from "@/lib/content";
import { worstCopy, worstProfile, worstProjects } from "@/tests/fixtures/worst-case";

/*
 * Dev-only stress page for /break-ui. The `.dev.tsx` extension is registered only under `next dev`
 * (next.config.ts), so production builds never see this route.
 */
const states = ["demo", "worst", "no-cv"] as const;
type State = (typeof states)[number];

const labels: Record<State, string> = { demo: "Demo data", worst: "Worst case", "no-cv": "No CV" };

function resolveState(value: string | string[] | undefined): State {
  return states.find((state) => state === value) ?? "demo";
}

export default async function BreakUiPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const state = resolveState((await searchParams).data);
  const isWorst = state === "worst";

  return (
    <>
      <HomeView
        locale="tr"
        copy={isWorst ? worstCopy : getSiteCopy("tr")}
        profile={isWorst ? worstProfile : getProfile()}
        projects={isWorst ? worstProjects(getProjects("tr")) : getProjects("tr")}
        cvHref={state === "no-cv" ? undefined : getCvHref("tr")}
        principles={getPrinciples("tr")}
        portrait={getPortrait()}
      />
      <nav
        aria-label="Test data"
        className="fixed bottom-4 left-1/2 z-(--z-cursor) flex -translate-x-1/2 gap-1 rounded-full bg-line p-1 font-sans text-small"
      >
        {states.map((value) => (
          <a
            key={value}
            href={`?data=${value}`}
            aria-current={value === state ? "page" : undefined}
            className="rounded-full px-3 py-1 aria-[current=page]:bg-paper"
          >
            {labels[value]}
          </a>
        ))}
      </nav>
    </>
  );
}
