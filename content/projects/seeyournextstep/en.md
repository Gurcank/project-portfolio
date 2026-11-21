---
title: "SeeYourNextStep"
subtitle: "Seven roles, one map, your *next* step"
card:
  problem: "Torn between product roles, you don't know what to learn, or in what order."
  credits: "PRODUCT + DESIGN + CODE · 2026 · SOLO"
  result: "Live · 7 roles · 335 lessons"
liner: "Astro 7 · MDX · Tailwind CSS 4 · Pagefind · nanostores · Vercel"
---

## A1 · Problem

I knew I wanted to work in product, but I wasn't sure which role: Product Manager, Product Designer, Business Analyst? I didn't know what each role needed to know, either. What I had was a 15,200-line pile of plain markdown: readable, but I couldn't track where I'd stopped, search it or review it. So I drew myself a path for every role.

## A2 · Users

Primary: me, and students or newcomers like me who are torn between product roles. They want to see the roles side by side, pick one and get an answer to "what's my next step?"
Secondary: product designers who want to speak the same language as engineers.

## A3 · Goal

Success criterion: "When I open the site, I see where I left off in three seconds, find a term in two, and mark a finished topic in one click."

Out of scope: accounts, certificates, video lessons.

## B1 · Decisions and trade-offs

1. **No React, at most 60 KB of JS.** _Chose:_ a static Astro site with small, page-specific scripts, and a 60 KB-per-page JS budget checked on every build. _Passed on:_ a React single-page app. _Because:_ this is a reading product; people spend their time in the text. Light pages open fast and make offline reading possible. _Cost:_ building interactive parts like the planet map without a framework took more work.
2. **One knowledge base, seven role lenses.** _Chose:_ every role shares the same lessons; the role only changes order, priority (core / recommended / optional) and the "As a Product Manager" boxes inside lessons. _Passed on:_ a separate course per role. _Because:_ the real question is "which role fits me?", so roles must be comparable on the same ground. _Cost:_ every lesson has to be written with all seven roles in mind.

## B2 · Outcome

SeeYourNextStep is live: 7 role paths, 31 categories, 335 lessons, 994 terms and 40 filled-in templates, with full-text search and offline reading. Its main user is me; I've shown it to one other person. The outcome wasn't a metric but a decision: drawing these paths is how I settled on becoming a Product Manager.

## B3 · What I learned

- **Solving your own problem is a good start, not the finish.** With one user, I can't tell a general need from a personal one.
- **Content products get hard at scale.** 335 lessons wouldn't stay consistent without a lesson standard and automated checks.
- **Setting a performance budget early beats cutting later.**
