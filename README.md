# Portfolio

Next.js 16 · React 19 · Tailwind v4 · fully static.

Design rules live in [`../DESIGN-PLAYBOOK.md`](../DESIGN-PLAYBOOK.md). Read
that before changing anything visual — the constraints in it are the
reason this doesn't look generated.

```bash
npm run dev           # http://localhost:3000
npm run build         # runs check:design, then builds
npm run check:design  # the banned-pattern check on its own
```

## Where things are

```
content/work/*.md      case studies      → /work/[slug]
content/writing/*.md   posts             → /writing/[slug]
src/lib/site.ts        name, links, hero statement
src/app/globals.css    THE TOKEN SYSTEM — colour, type, scale, craft layer
scripts/check-design.mjs  build-time enforcement
```

## Adding content

Drop a markdown file into `content/work/` or `content/writing/`. The
filename becomes the URL slug. Frontmatter is validated at build time and
**fails the build** if a required field is missing, rather than rendering
`undefined`.

```yaml
# content/work/thing.md
---
title: Thing
summary: One sentence — what it is, who it was for.
year: "2026"
role: Design & build
stack: [TypeScript, PostgreSQL]
outcome: The measurable result. Numbers.
order: 1        # lower sorts first
live: ""        # optional
repo: ""        # optional
draft: false    # true hides it everywhere
---
```

```yaml
# content/writing/post.md
---
title: Post title
summary: One sentence.
date: 2026-08-03
tags: [notes]
draft: false
---
```

Markdown is GitHub-flavoured. Code blocks are highlighted at build time
with Shiki in both light and dark, so no highlighter ships to the browser.

## The design system

**Colour** — seven tokens, no more. `paper`, `sunk`, `rule`, `ink`,
`muted`, `faint`, `signal`. Greys are warm-neutral and committed to.
`signal` is the only accent; spend it in one place per screen.

Tailwind's default palette is **cleared**, not extended — `--color-*:
initial` in `@theme`. `bg-indigo-500` doesn't exist as a utility, so the
usual regression is impossible rather than merely discouraged.

**Type** — three roles, never one face doing everything:

| Role | Face | Used for |
|---|---|---|
| Display | Instrument Serif | headlines only |
| Body | Archivo | reading |
| Utility | IBM Plex Mono | labels, metadata, numerals |

The scale jumps deliberately (18 → 44 → clamp). Even steps read as
generated.

**Structure** — radius is 0. Elevation is borders and contrast, never
shadows. The grid is broken on purpose twice: the hero's meta column vs.
statement column, and the case-study metadata sitting in the left margin.

**Craft** — grain at 3.5%, staggered reveals offset 65ms per child,
`cubic-bezier(0.16, 1, 0.3, 1)` easing, tabular figures, hanging
punctuation. `prefers-reduced-motion` is respected.

**Contrast** — every token pair used in the UI clears WCAG AA (4.5:1),
in both themes, against both `paper` and `sunk` (hovered rows). `faint`
is the tight one at 5.01:1 / 4.51:1 — it carries 11px mono labels, so it
was measured rather than eyeballed. Re-check with a WCAG calculator
before lightening any grey.

## Enforcement

`npm run build` runs `check:design` first and fails on: default-palette
classes, gradients, `rounded-*`, `shadow-*`, raw hex outside the token
block, and marketing filler ("empower", "seamless", "passionate about"…).

Override a specific line by appending `design-check-ignore` to it.

## Still to do

**Needs Rohit — do not publish before these are checked:**

- [ ] **Verify the invented detail in two case studies.** In
      `patient-management.md` the four service names and the whole
      "What I would change" section are extrapolation, not fact. In
      `credit-card-onboarding.md` the "Decisions" section — idempotency
      at the handler rather than the queue — is a plausible reading of
      the resume, not something it states. Correct or cut.
- [ ] Write the two drafts in `content/writing/` (outlines are in the
      files as comments) and flip `draft: false`. The nav hides Writing
      until one publishes.
- [ ] Confirm `rohit.behera12232@gmail.com` is the right public address.

**Before deploying:**

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain so OG image URLs
      resolve absolutely.
- [ ] Update the GitHub profile README — it says "All six are open as of
      August 2026", but there are now nine upstream PRs plus mastra
      merged.

**Done:** signature element (the upstream ledger), favicon
(`src/app/icon.svg`), generated OG card (`src/app/opengraph-image.tsx`),
WCAG AA audit.

> The OG card falls back to a sans-serif — satori has no Times New Roman
> in the build environment, and shipping a font binary to make a link
> preview match was not worth the weight. It still reads on-system.
