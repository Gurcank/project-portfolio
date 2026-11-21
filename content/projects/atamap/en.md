---
title: "ATAMap"
subtitle: "1881–1938, one map, *step* by step"
card:
  problem: "Atatürk's life lives in fragmented timelines; his journey can't be followed as a whole."
  credits: "PRODUCT + DESIGN + CODE · 2026 · SOLO"
  result: "Live · 721 events · 398 sources"
liner: "Preact + TypeScript + Vite · d3-geo + SVG · Vercel · Data: Natural Earth (public domain), CShapes 2.0 (CC BY-NC-SA 4.0), TBMM, MSB, ATAM"
---

## A1 · Problem

I admire Atatürk and wanted to follow his life as a whole, or at least his journey. Timelines give dates but not places; maps show a single period. There was no way to see 57 years, from Thessaloniki to Samsun, from Sakarya to his tours of the country, in one place and within the borders of the time. On top of that, a lot of unsourced and contradictory information about Atatürk circulates online.

## A2 · Users

A curious adult with no prior knowledge. Not studying, exploring: they pick a year and ask "where was he then, what did he write?" They should be able to see where every piece of information comes from; in this product, trust is the feature.

## A3 · Goal

If it works:

- In a 5-person test, at least 4 reach a given step unaided within 3 minutes, open the document's full text and can name its source.
- Every event links to at least one source.

Out of scope: commentary, judgement and copyrighted content.

## B1 · Decisions and trade-offs

1. **The two-source rule.** _Chose:_ every date and place is confirmed by at least two independent sources; conflicting records stay off the site. Publications of state institutions (the Turkish parliament, the Ministry of Defence, the Atatürk Research Center) count on their own. Wikipedia can be the second source at most, and if a Wikipedia article cites the other source, the two aren't independent. _Passed on:_ speed and breadth. _Because:_ on this subject, a single wrong date costs the whole site its trust. _Cost:_ some well-known events didn't make it in; the most complete ready-made list, Wikipedia's timeline, is itself unsourced, so it couldn't confirm anything alone.
2. **No copyrighted content, no transcriptions.** _Chose:_ showing full text only for documents originally written in Latin script, verbatim. _Passed on:_ published transcriptions of Arabic-script documents, which count as copyrighted. _Because:_ even in a personal project, I wanted zero legal risk. _Cost:_ documents from before the 1928 alphabet reform appear without full text, only as a reference card (date, place, sender, recipient).

## B2 · Outcome

ATAMap is live: 721 events, 217 documents, 171 journeys, 113 places and 398 sources, all on a single-screen map with period borders. 110 commits between 27 October and 18 November 2026. So far I've shown it to one person, who liked it; that's a starting point, not an outcome. Next step: the 5-person test from the spec.

## B3 · What I learned

- **Data takes longer than the interface.** Most of the time went into searching sources and resolving conflicts, not code.
- **Rules reduce decision load.** With the two-source rule, I didn't have to rethink every record.
- **One person's "I like it" isn't a test.** I'd run the usability test before launch.
