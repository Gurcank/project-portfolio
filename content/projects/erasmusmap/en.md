---
title: "ErasmusMap"
subtitle: "A map so you don't *forget* your Erasmus"
card:
  problem: "Erasmus cities get forgotten, and the experience never reaches the next student."
  credits: "PRODUCT + DESIGN + CODE · 2026 · SOLO"
  result: "Live · 1,602 cities · 6 languages"
liner: "Next.js 16 · TypeScript · Tailwind CSS v4 · Mapbox GL · Prisma + Supabase Postgres · NextAuth · Vitest + Playwright · Vercel · Data: GeoNames (CC BY 4.0), Eurostat NUTS 3 + GADM"
---

## A1 · Problem

Once my Erasmus was confirmed, I wanted to keep a record of it. I like logging the places I visit, because what I don't write down, I forget. An Erasmus term is short and dense: dozens of cities in a few months, each its own experience. Those experiences usually end up in a camera roll or a chat history. They don't become an organised memory for the person who lived them, or useful information for the next student heading to the same city.

## A2 · Users

Primary: the student on Erasmus. They want to mark the cities they've visited, rate them and plan the next trip, in a few taps, on their phone.
Secondary: the student preparing for Erasmus. Choosing a city, they're asking "what does someone who lived there say?", and a single star rating doesn't answer it.

## A3 · Goal

If it works:

- A student can log and rate a city in under a minute.
- A city page offers comparable information across 6 criteria (culture, food, safety, social life, transport, cost of living) instead of one score.
- Logs and plans live in one place.

Out of scope: accommodation and ticket sales.

## B1 · Decisions and trade-offs

1. **A city is a NUTS 3 region.** _Chose:_ drawing cities as Europe's official NUTS 3 regions instead of dots, each named after the largest city inside it. _Passed on:_ point markers. _Because:_ dots piled up around big cities, while NUTS 3 is the right administrative level in every country (a province in Turkey, a département in France). _Cost:_ official names are unusable ("München, Kreisfreie Stadt"), so I had to write a naming rule.
2. **Google sign-in only, no photo uploads.** _Chose:_ Google sign-in and ready-made avatars. _Passed on:_ email/password and user photos. _Because:_ storing neither passwords nor photos removes both a security risk and a moderation load, neither of which a one-person team can carry. _Cost:_ losing people without a Google account, and less personal profiles.
3. **Logging and planning first; reviews as a by-product.** _Chose:_ putting visited cities, a wishlist and a trip planner (route, schedule, budget, expenses) in one account. _Passed on:_ being just a review site. _Because:_ a review site gives nothing back until the user writes something; logging and planning give them a reason of their own from day one. _Cost:_ scope grew, and the planner became a product in itself.

## B2 · Outcome

ErasmusMap is live: 1,602 cities, 6 languages, Google sign-in, a trip planner and a "Square" feed where reviews are liked and discussed. 142 commits between July and October 2026; every change passes tests, type checks and a migration run against an empty database. Usage is so far limited to people around me, and I haven't measured it systematically. The first thing I'd measure: how many new sign-ups rate at least one city in their first week.

## B3 · What I learned

- **I'd lock scope earlier.** The social feed and planner arrived before the first users; I should have shipped and measured one flow (log → rate) first.
- **Distribution is part of the product.** I'd plan where the first 20 users come from before writing any code.
- **Privacy decisions come first.** Never storing data is far cheaper than trying to delete it later.
