---
name: Tech Stack and Skills
description: Technology stack, required knowledge, and onboarding context for this project
type: reference
---

## When to consult this file

Consult this file when onboarding to this project, assessing unfamiliar parts of the stack, or deciding which framework API to use for a new feature.

---

## Core stack

| Technology    | Version | Role                                                                               |
| ------------- | ------- | ---------------------------------------------------------------------------------- |
| Astro         | 5.x     | Primary framework — static site generation, file-based routing, image optimization |
| Svelte        | 5.x     | Interactive component framework (Header, Button)                                   |
| Tailwind CSS  | 4.x     | Utility-first styling                                                              |
| TypeScript    | 5.x     | Type safety across all source files                                                |
| Prettier      | 3.x     | Code formatting                                                                    |
| @lucide/svelte | latest  | Icon library for `.svelte` files — path imports, tree-shaken by Vite              |
| @lucide/astro  | latest  | Icon library for `.astro` files — path imports, tree-shaken by Vite               |

---

## Key APIs to know

### Astro

- **`Astro.props`** — component props in `.astro` frontmatter
- **`getStaticPaths()`** — required for dynamic routes (`[slug].astro`), returns param/props pairs
- **`<Picture>`** from `astro:assets` — optimized responsive images (use this, not `<img>`)
- **`client:load`** — hydration directive for Svelte components that need immediate interactivity
- **`<slot />`** — content projection in Astro components

### Svelte 5

This project uses **Svelte 5 runes** — not legacy Svelte 3/4 syntax:

- **`$props()`** — declare component props
- **`$state()`** — reactive state
- **`$derived`** / **`$derived.by()`** — computed values
- **`$effect()`** — side effects (replaces `onMount` for reactive effects)
- **`Snippet`** — typed slot equivalent; use `{@render children()}` in template
- Event handlers: `onclick={handler}` (not `on:click`)

### Tailwind CSS v4

- Configuration is in `src/styles/global.css` under `@theme` — no `tailwind.config.js`
- Custom tokens become utilities automatically (e.g., `--color-primary` → `bg-primary`, `text-primary`)
- Class sorting is handled by `prettier-plugin-tailwindcss` — run `npm run format` to sort

### Icons (@lucide/svelte / @lucide/astro)

- Use `@lucide/svelte` in `.svelte` files, `@lucide/astro` in `.astro` files
- Always import via the individual icon path — never named imports from the top-level package:
  ```ts
  // ✅ correct
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Phone from '@lucide/astro/icons/phone';

  // ❌ wrong — loads the full library in dev, causes HMR slowdown
  import { ChevronDown } from '@lucide/svelte';
  ```
- Size via Tailwind class: `class="h-4 w-4"` — do not use `size` prop
- Always add `aria-hidden="true"` on decorative icons
- Lucide defaults (no need to specify): `stroke="currentColor"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `viewBox="0 0 24 24"`

---

## Astro/Svelte interop

- Astro components can import and render Svelte components
- Svelte components used in Astro layouts need `client:*` directive to hydrate
- Svelte components can be used inside other Svelte components normally
- Astro components cannot be used inside Svelte templates

---

## Image pipeline

Images in `src/assets/` are processed by Astro at build time:

- Import image as a module: `import myImg from '../assets/images/myimg.jpg'`
- Pass to `<Picture src={myImg} ...>` — Astro generates AVIF/WebP at specified widths
- Images in `public/` are served as-is (no processing) — only use for favicons, etc.

---

## TypeScript

- Config extends `astro/tsconfigs/strict` — strict mode is on
- No custom path aliases in `tsconfig.json` — use relative imports
- Astro auto-generates types in `.astro/types.d.ts` — do not edit manually

---

## How to contribute to this file

Update this file when:

- A major dependency is added or upgraded with breaking API changes
- A new pattern or API is adopted project-wide
- Onboarding reveals gaps that caused confusion
