# Helens Fotvård — Claude Code Instructions

Static marketing site for a Swedish medical foot care clinic (Helens Fotvård) in Borgholm, Öland. Built with Astro 5, Svelte 5, Tailwind CSS 4, and TypeScript. Deploys as a fully static site with no server runtime.

---

## Quick Start

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # output to ./dist/
npm run preview    # preview ./dist/ locally
npm run format     # run Prettier (do this before committing)
npx astro check    # TypeScript type checking
```

---

## Boundaries

**Do not modify without explicit human review:**

- `src/styles/global.css` — changes to `@theme` tokens affect the entire design system
- `src/data/services.ts` — single source of truth for all service content; structural changes break dynamic routes
- `src/layouts/Layout.astro` — changes here affect every page
- `src/pages/tjanster/[slug].astro` — `getStaticPaths` contract must match `services.ts`
- URL slugs in `services.ts` and anchor IDs (`#tjanster`, `#kontakt`) — renaming breaks internal navigation

---

## Reference Files

Consult these files only when the condition applies — do not load all of them by default:

- @docs/agent/conventions.md — when writing, editing, or reviewing code
- @docs/agent/architecture.md — when navigating the codebase or proposing structural changes
- @docs/agent/decisions.md — when making or evaluating architectural or design choices
- @docs/agent/bugs.md — when debugging, investigating errors, or working around known issues
- @docs/agent/workflows.md — when running, building, testing, or deploying
- @docs/agent/skills.md — when onboarding or assessing unfamiliar parts of the stack
- @docs/agent/context.md — when writing copy, naming routes, or interpreting domain-specific terms
