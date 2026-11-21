# Gürcan Karadağ — portfolio

One long, fully static bilingual page (TR default at `/`, EN at `/en`) that gets a PM candidate interview invites.
Concept: "the shelf in my room" — 7 projects are 7 cassettes; pixel objects are personality, sharp type is information.

Start every session with `docs/PROGRESS.md` (where we are, what's next).

## Docs — read the one you need, don't guess

| Doc                    | Answers                                                                       |
| ---------------------- | ----------------------------------------------------------------------------- |
| `docs/SPEC.md`         | Goal, audience, design direction (§8), media and license rules (§9), scope    |
| `docs/ARCHITECTURE.md` | Stack, ADRs, folder structure, data model (§3), routes, states, a11y, budgets |
| `docs/ROADMAP.md`      | Slice order, shared definition of done, per-slice acceptance tests            |
| `docs/CONTENT.md`      | Every user-facing string, TR + EN                                             |
| `docs/INSPIRATION.md`  | INS-xx elements referenced by slices                                          |
| `docs/PROGRESS.md`     | Current state; update at the end of every session                             |

`docs/sources/` holds personal data (CV, LinkedIn, Letterboxd export). It is gitignored: never read it unless the user asks, never copy from it into the repo, never un-ignore it.

## Stack

Next.js 16.4.6 (App Router, Turbopack, all routes static, no proxy) · React 19.3.1 · TypeScript 6.0.3 (not 7: Next's type check needs the JS compiler API) · Tailwind 4.3.5 via `@tailwindcss/turbopack` · Velite 0.4.0 (Markdown + YAML) · Motion 14 (`LazyMotion` + `m`) · shadcn/ui + Radix · ESLint 9 (eslint-config-next's plugins don't support 10 yet) · Prettier · Vitest · Playwright + axe · Vercel. Node 24.x.

Next 16 differs from older versions: when unsure, read `node_modules/next/dist/docs/` before writing code.
Packages are pinned to exact versions; check `npm view` and the docs before upgrading or adding one.

## Commands

```
npm run dev            # velite build + next dev (Velite watcher starts from next.config.ts)
npm run build          # velite build + next build
npm run lint           # eslint
npm run typecheck      # velite build + tsc --noEmit
npm run format         # prettier --write (format:check in CI)
npm test               # vitest (tests/unit)
npm run test:e2e       # playwright against `next start` on :3100 — run `npm run build` first
npm run check:tokens   # fails on raw hex/px/rgb, arbitrary values, off-scale spacing
npm run screenshots -- [baseUrl] [paths…]   # 375/768/1280 full-page PNGs → artifacts/
```

In Git Bash, prefix path arguments with `MSYS_NO_PATHCONV=1` (otherwise `/en` becomes a Windows path).
Local preview servers: `.claude/launch.json` (`prod` = `next start`, `dev`).

## Folders

```
app/(tr)/            root layout lang="tr" → /
app/(en)/en/         root layout lang="en" → /en
app/global-not-found.tsx   bilingual 404 (experimental.globalNotFound)
components/
  layout/            RootDocument, nav, language switch, footer
  home/              HomePage: orders sections, passes data down
  sections/          Hero, Shelf, Principles, About, Colophon, Contact
  cassette/ case-study/ markdown/
  experience/        client-only layers, each inside ExperienceBoundary
  pixel/             PixelSprite + sprites/ (string grids → SVG, palette tokens only)
  respect/           Atatürk portrait, Turkish flag — no motion or hover props, ever
  ui/                shadcn copies
content/             all site data (Velite) — see below
lib/                 i18n.ts, content/ (only gateway to .velite), hash-route, experience-store, analytics
styles/tokens.css    design tokens — the only file with literal values
scripts/ tests/unit/ tests/e2e/
```

Generated, never committed: `.velite/`, `public/static/`, `artifacts/`, `.next/`.

## Token rule (enforced)

- Every color, size, space, radius, shadow, duration, easing and z-index comes from `styles/tokens.css`.
- No raw hex/rgb/px and no Tailwind arbitrary values (`w-[13px]`, `bg-[#…]`) in `app/`, `components/`, `lib/`, `styles/`.
- Breakpoint-dependent or namespace-less tokens use the CSS-variable syntax: `px-(--gutter)`, `duration-(--duration-base)`, `z-(--z-overlay)`.
- Spacing steps: `1 2 3 4 6 8 12 16 24 32 48` (4px base). Others fail `check:tokens`.
- Need a value that doesn't exist? Propose a new token with a reason; don't inline it.
- Components pasted from libraries are converted to tokens (`/component-integrate`).

## Content

- Source of truth for text is `docs/CONTENT.md`. Each slice moves its own text into `content/` **verbatim**; any wording change needs the user's approval.
- `content/site/{tr,en}.yaml` (UI copy), `content/profile.yaml`, `content/projects/<slug>/{project.yaml,tr.md,en.md,media/}`, `principles.yaml`, `taste/`, `credits.yaml`.
- Schemas live in `velite.config.ts`; budgets (e.g. card problem ≤ 90 chars) are schema rules, so a violation fails the build.
- App code reads content only through `lib/content/`.
- Plain Markdown, not MDX. Reading times are computed, never typed by hand.

## Project rules

- TR and EN always ship together; a missing translation fails the build.
- Uppercase mono labels must sit under the right `lang` (Turkish i/İ). English identifiers inside TR pages get `lang="en"`.
- Decor is `aria-hidden` and never carries information. Pixel decor only at ≥ 1024px.
- Experience layers (mascot, cursor, decor, intro, hero desk) load conditionally and live inside `ExperienceBoundary`; content must work if they fail.
- Motion respects `prefers-reduced-motion` and `[data-motion="paused"]`; no auto motion > 5s before the pause control exists (D7).
- ATAMap: no humor, no margin notes, no walkman.
- Atatürk portrait: verified public-domain photo only, never AI-generated, never animated. Flag: legal proportions, never a texture or background.
- No copyrighted posters or album covers (original or redrawn); no Letterboxd data; no teammates' names.
- A section that doesn't exist yet doesn't appear in nav or CTAs.

## Definition of done (every slice)

Full list: `docs/ROADMAP.md` → "Ortak bitti tanımı". Minimum evidence before saying done:

1. `build`, `lint`, `typecheck`, `test`, `test:e2e`, `check:tokens` all green — paste the output.
2. `npm run screenshots` at 375 / 768 / 1280, compared with the INSPIRATION intent.
3. Loading / error / empty states for the slice handled.
4. Keyboard-only path, visible focus, axe serious/critical = 0.
5. Vercel preview URL; `docs/PROGRESS.md` updated.

## Git and deploy

- One branch per slice → push → Vercel preview → user approval → merge to `main` (production).
- Propose the commit message; commit and push only after the user says so.
