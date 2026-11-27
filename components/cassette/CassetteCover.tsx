import { CoverCassette } from "@/components/cassette/CoverCassette";
import { ExperienceBoundary } from "@/components/experience/ExperienceBoundary";
import type { Project, ProjectCover } from "@/lib/content";

type CassetteCoverProps = {
  slug: string;
  catalog: string;
  title: string;
  color: Project["color"];
  /** The live site's screenshot, printed on the tape's label */
  image?: ProjectCover["image"];
};

/*
 * The cover of a tape on the shelf (desktop): a realistic cassette (V2b) that flies into the deck when
 * it plays. Decorative: the same title and catalog number are real text next to it, so it is hidden
 * from assistive tech; if it fails to render, the card's text still stands.
 */
export function CassetteCover({ slug, catalog, title, color, image }: CassetteCoverProps) {
  return (
    <div aria-hidden="true">
      <ExperienceBoundary name="cover-cassette">
        <CoverCassette slug={slug} color={color} catalog={catalog} title={title} image={image} />
      </ExperienceBoundary>
    </div>
  );
}
