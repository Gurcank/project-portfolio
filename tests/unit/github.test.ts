import { describe, expect, it } from "vitest";

import { parseContributions } from "@/lib/github";

// The shape of GitHub's public calendar markup, trimmed to what the parser reads
const page = `
  <h2 id="js-contribution-activity-description">
    1,204
    contributions
      in the last year
  </h2>
  <td data-date="2025-11-23" id="contribution-day-component-0-0" data-level="0"></td>
  <td data-date="2025-11-24" id="contribution-day-component-1-0" data-level="2"></td>
  <td data-date="2025-11-30" id="contribution-day-component-0-1" data-level="4"></td>
`;

describe("parseContributions", () => {
  it("reads the yearly total and every day's level by week and weekday", () => {
    expect(parseContributions(page)).toEqual({ total: 1204, weeks: [[0, 2], [4]] });
  });

  it("returns null when the page doesn't look like the calendar", () => {
    expect(parseContributions("<html>rate limited</html>")).toBeNull();
    expect(parseContributions(page.replace(/contributions\s+in the last year/, ""))).toBeNull();
  });
});
