---
title: "IDDDergi"
subtitle: "Giving a PDF the feel of a *magazine*"
card:
  problem: "The NGO's magazine was stuck in a PDF that nobody read on a phone."
  credits: "PRODUCT + CODE · 2026 · VOLUNTEER TEAM"
  result: "Live on the NGO's site"
liner: "Next.js · React · TypeScript · Tailwind CSS · react-pageflip · react-zoom-pan-pinch · Magazine content: IDD ORG"
---

## A1 · Problem

IDD ORG wanted to publish "Shaping the Future of Climate", the magazine it produced for COP31 Türkiye, on its website. What existed was a PDF. A download link was the easy option, but downloaded files often go unopened, and reading by pinching and scrolling on a phone is a chore. A magazine people had worked hard on deserved more than a file link.

## A2 · Users

Primary: visitors to the NGO's site, mostly on phones. They want to browse the magazine, not download or manage a file.
Secondary: the NGO team, who should be able to add a new issue easily.

## A3 · Goal

- The magazine reads on the site, no download.
- Turning pages feels like a printed magazine.
- Pages can be zoomed on a phone.

Out of scope: the magazine's content and design (made by the NGO).

## B1 · Decisions and trade-offs

1. **A flipbook instead of a PDF link.** _Chose:_ a viewer with turnable, zoomable pages. _Passed on:_ a plain PDF link or the browser's own PDF viewer. _Because:_ readers should meet a magazine, not a file. _Cost:_ more code and weight; with reduced motion on, the page-turn animation is switched off.
2. **Pre-rendering pages as images.** _Chose:_ a script that turns the PDF into page images at build time, so the browser only downloads images. _Passed on:_ rendering the PDF live in the browser. _Because:_ fast loading on phones. _Cost:_ the script has to be re-run for every new issue.

## B2 · Outcome

The viewer is live on the NGO's site. It took 4 days and 4 commits in August 2026: a short job with a clear scope. I don't have readership data.

## B3 · What I learned

- **Asking "why" pays off on small jobs too.** The request was "upload the PDF"; the need was "get the magazine read".
- **Narrow scope brings speed.** I touched nothing but the viewer.
