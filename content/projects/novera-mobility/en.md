---
title: "Novera Mobility"
subtitle: "Choosing *decisions* over code"
card:
  problem: "A fast-growing site couldn't carry new features on a shaky base."
  credits: "FRONTEND (V1) → PM (V2) · 2026 · TEAM OF 2"
  result: "Live · v2 · TR/EN"
liner: "Next.js · TypeScript · Tailwind CSS · next-intl · Zod · NestJS · Prisma · PostgreSQL (Neon) · Vercel + Google Cloud Run · Team: my teammate (full stack)"
---

## A1 · Problem

Novera Mobility is a fictional car rental company my teammate and I made up to learn how a real team works. In v1, I built the frontend and they built the backend. The site grew fast: search, booking, pay-with-points, corporate quotes, two languages. Then a quality review on 22 October found 1 critical and 5 high-severity issues; for example, a backdated booking earned points instantly.

## A2 · Users

The product's fictional users are three groups: individuals renting a car, corporate fleet managers and Novera staff running the site.
The project's real users were the team itself: my teammate wanted full-stack experience, I wanted PM experience. So in v2 we split the roles: they write all the code; I own scope, order and acceptance.

## A3 · Goal

v2's success criteria:

- Every acceptance flow in the spec passes in production, at 375 and 1280 px, keyboard only.
- All critical and high-severity issues are closed.

Out of scope: changing marketing copy.

## B1 · Decisions and trade-offs

1. **Foundation first, features second.** _Chose:_ splitting v2 into five parts and making the first (security, data integrity, code structure) a prerequisite for the rest. _Passed on:_ immediately building the Fleet and Admin panels the site advertised but didn't have. _Because:_ adding panels on top of a payment flow with a points exploit would only widen the hole. _Cost:_ weeks with nothing visibly new.
2. **Every task is an issue; no direct pushes to main.** _Chose:_ issue → branch → PR → check against acceptance criteria on the Vercel preview → merge. _Passed on:_ fast but untraceable direct pushes, tempting in a team of two. _Because:_ without acceptance criteria I can check, the only thing I can say as PM is "looks good". _Cost:_ even small fixes need a full PR cycle.
3. **The spec is the single source of truth.** _Chose:_ if a request conflicts with the spec, the developer stops and asks me; changes go in only through a PR with a version note. _Passed on:_ on-the-fly decisions in chat. _Because:_ for two people working asynchronously, a written decision beats a remembered one. _Cost:_ keeping the spec current became my ongoing job.

## B2 · Outcome

v2 is live as a full release, in Turkish and English. Between 4 October and 1 November 2026 we opened 28 issues and every change went in through a PR; no new feature started before the foundation work was done. For me, the real outcome: the first time I moved a product forward without writing code.

## B3 · What I learned

- **Acceptance criteria are a PM's tool.** Without clear criteria, I didn't know what to accept a PR against.
- **The "what we won't do" list was the most discussed document.**
- **Clear roles sped up decisions, even in a team of two.** Everyone knew who decided.
