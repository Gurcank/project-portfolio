---
title: "Nature & Sport Handbook"
subtitle: "A field *notebook* on screen"
card:
  problem: "Anyone trying to name what they see outdoors can't find a short, reliable guide."
  credits: "PRODUCT + DESIGN + CODE · 2026 · SOLO"
  result: "Live · TR/EN · 558 credited images"
liner: "Next.js · TypeScript · Vitest · Vercel · Images: openly licensed and public-domain sources (558, credits on the site)"
---

## A1 · Problem

I love nature and like to know what I'm looking at on a hike. With this project I wanted to test two things: how good I could make something look, and how close a screen could get to a real handbook. Digital nature resources tend to be either encyclopedia-long or a dry catalogue. What works outdoors is short, memorable and accurate.

## A2 · Users

Primary: curious people out hiking, camping or doing outdoor sports. They look at a bird, a mushroom or a stone and want a few memorable facts; they won't read a long article.
The first user is me.

## A3 · Goal

- Every entry reads at a glance.
- Images are real and sourced.
- The site feels like a real field notebook.

Out of scope: identifying species from photos, user contributions.

## B1 · Decisions and trade-offs

1. **A handwritten field-guide feel.** _Chose:_ a field-notebook look: handwritten headings, notepaper texture, short notes. _Passed on:_ a standard catalogue with a card grid. _Because:_ one goal was to test my visual craft; the feel mattered as much as the content. _Cost:_ handwriting hurts readability in long text, so body copy stayed in a plain typeface.
2. **A realistic handbook.** _Chose:_ organising information around real-world physical conditions: where and in which season you'll see it, what to watch out for. _Passed on:_ fun "did you know" lists that don't help outdoors. _Because:_ a handbook is only as valuable as it is useful where it's used. _Cost:_ more research per entry.
3. **Every image credited.** _Chose:_ openly licensed and public-domain images only; the source and licence of all 558 are recorded. _Passed on:_ more striking images with unclear licences. _Because:_ I wanted to be able to source everything I publish. _Cost:_ no suitable image could be found for some species.

## B2 · Outcome

Live in Turkish and English: animals, plants, mushrooms, stones and four outdoor sports. 17 commits between July and September 2026. For now I'm the one using it, and I haven't measured usage.

## B3 · What I learned

- **An aesthetic goal needs a measure too.** Instead of "make it beautiful", I'd set something like "readable at a glance".
- **Licensing takes as long as content.** Recording the source of 558 images needed its own workflow.
- **Static content keeps things simple, but every fix is a deploy.**
