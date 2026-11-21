---
title: "İklim Krizi · IDD ORG"
subtitle: "Explaining an abstract crisis through *everyday* examples"
card:
  problem: "In reports, the climate crisis stays abstract; readers can't link it to their lives."
  credits: "PRODUCT + DESIGN + CODE · 2026 · VOLUNTEER TEAM"
  result: "A one-page documentary for an NGO"
liner: "HTML · CSS · JavaScript · Laravel Blade · GSAP · Lenis · Data: NASA, Turkish environmental indicators · Main site: IDD ORG tech team"
---

## A1 · Problem

İklim Değişmeden Değiş (IDD ORG), the climate NGO I volunteer for, asked its tech team for a project for its website. I had just watched the documentary _Breaking Boundaries_ and it stayed with me. The climate crisis is usually told through temperature curves and long reports; the numbers are right, but they don't touch the reader's daily life. If "1.5 degrees" means nothing to you, the crisis stays far away.

## A2 · Users

Primary: Turkish readers visiting the NGO's site who aren't climate experts. They want to understand the crisis but won't read a report; they need to see why it matters through an example from their own lives.
Secondary: the NGO team, who must be able to keep the page alive on their own site with their own tools.

## A3 · Goal

If it works:

- By the end, readers understand how warming, sea level, wildfires and emissions connect, and what they can do.
- The team can add the page to their site without help.

Out of scope: donations and forms.

## B1 · Decisions and trade-offs

1. **A documentary flow instead of a report.** _Chose:_ a scroll-driven story: it opens on a glacier video, moves through animated counters, charts and maps built on NASA and Turkish environmental indicator data, and ends with steps readers can take. _Passed on:_ presenting the data as tables and text. _Because:_ the goal was understanding, not information; I paired every number with an example from the reader's life. _Cost:_ video and animation made the page heavy, so I added reduced-motion support and content that works without JavaScript.
2. **Fit the existing site, no build step.** _Chose:_ writing the page as an extension of the NGO's Laravel template; adding it to the site takes four small changes. _Passed on:_ a standalone page on a modern framework. _Because:_ in a volunteer team, the page has to live without waiting for me. _Cost:_ no modern tooling, just one JS file and one CSS file.
3. **Every image licensed and credited.** _Chose:_ openly licensed images only; a button in each image's corner shows its source and licence. _Passed on:_ more striking images with unclear licences. _Because:_ on a topic like climate, an NGO's credibility depends on the source of everything it shows. _Cost:_ fewer images to choose from.

## B2 · Outcome

The page is live as a preview at iklimkrizi.vercel.app and ready to be added to the NGO's site. 43 commits between June and October 2026. I haven't measured readers; the first thing I'd measure is how many scroll all the way to the action steps. One known gap: there's no visible pause button for the videos.

## B3 · What I learned

- **I wrote the brief myself.** An open request like "make something" made me define the problem first.
- **Working inside someone else's system is its own skill.** The right tool wasn't the best one, but the one the team could take over.
- **Animation has a cost.** Every movement needs its accessibility counterpart.
