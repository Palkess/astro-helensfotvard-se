# Helens Fotvård — Agent Instructions

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

No ESLint. No test suite. CI/CD via GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`).

---

## Boundaries

**Do not modify without explicit human review:**

- `src/styles/global.css` — changes to `@theme` tokens affect the entire design system
- `src/data/services.ts` — this is the single source of truth for all service content and images; structural changes break dynamic routes
- `src/layouts/Layout.astro` — changes here affect every page
- `src/pages/tjanster/[slug].astro` — the `getStaticPaths` contract must match `services.ts`
- URL slugs in `services.ts` and anchor IDs (`#tjanster`, `#kontakt`) — used by internal links across the site; renaming breaks navigation

---

## Architecture

```
src/
├── assets/images/services/   # Source images (processed at build: AVIF/WebP)
├── components/
│   ├── atoms/                # Button.svelte
│   ├── molecules/            # ServiceCard, SectionHeader, ContactItem, HoursRow
│   └── organisms/            # Header, Footer, HeroSection, ServicesSection,
│                             # AboutSection, ContactSection
├── data/services.ts          # All service definitions — slug, title, desc, image, duration
├── layouts/Layout.astro      # Root HTML shell
├── pages/
│   ├── index.astro           # Homepage (composes all organisms)
│   └── tjanster/[slug].astro # Service detail pages (statically generated)
└── styles/global.css         # Tailwind + @theme custom tokens
```

**Framework split:**

- `.astro` components for everything static
- `.svelte` (Svelte 5) only when client-side interactivity is needed
- Interactive Svelte components use `client:load`

**Data flow:** `src/data/services.ts` → `getStaticPaths()` in `[slug].astro` → one static page per service

---

## Conventions

**Formatting:** Handled by Prettier — see `.prettierrc` (4-space indent, single quotes, no trailing commas, 100-char width, Tailwind class sorting).

**Component naming:** `PascalCase.astro` / `PascalCase.svelte`. Organisms that are page sections use a `Section` suffix.

**Props:** Always typed with a TypeScript `interface Props`.

**Svelte 5 runes — use new API only:**

- `$props()` not `export let`
- `$state()`, `$derived`, `$effect` not `$:` reactive
- `{@render children()}` with `Snippet` not `<slot />`
- `onclick={fn}` not `on:click={fn}`

**Styling:**

- Tailwind utility classes only — no per-component `<style>` blocks in Astro
- Use theme tokens (`bg-primary`, `text-text-heading`, etc.) — never hardcode hex values
- Standard container: `max-w-5xl mx-auto px-6`

**Images:** Always use Astro's `<Picture>` component from `astro:assets`. Never raw `<img>` for content images. Set `widths`, `sizes`, and `formats={['avif', 'webp']}`.

**Routing:** URL slugs and anchor IDs are Swedish (`/tjanster/`, `#kontakt`, `#tjanster`).

**Anti-patterns to avoid:**

- Do not add `<style>` blocks to Astro components — use Tailwind
- Do not use Svelte 3/4 syntax — this is Svelte 5
- Do not use `client:visible` or `client:idle` on Header — `client:load` is intentional
- Do not migrate services data to content collections — typed TS with image imports is the correct pattern here

---

## Domain context

**Business:** Helens Fotvård — medical foot care clinic, Borgholm, Öland, Sweden.
**Language:** All user-facing content is Swedish. Code identifiers are English.

**Key terms:**

- _Medicinsk fotvård_ — medical foot care (qualified practitioner, not cosmetic)
- _Friskvårdsförmån_ — Swedish tax-deductible employee wellness benefit; "Fotvård med friskvård" is the service invoiced under this benefit
- _Nageltrång_ — ingrown toenail (specific condition with professional treatment)
- _Boka tid_ — "Book an appointment" (standard CTA)
- _Tystnadsplikt_ — professional secrecy (healthcare legal requirement)

**Services 1 and 2 ("Medicinsk fotvård" and "Fotvård med friskvård") are the same physical treatment** — the difference is billing method only.

**No online booking system exists.** CTAs link to `#kontakt` for phone contact.

---

## Known issues / gotchas

- Hero section uses a placeholder image (as of commit `6d00c54`) — final image not yet sourced
- All packages are listed under `dependencies` (not split into `devDependencies`) — harmless for a static site, do not "fix" without understanding the deployment pipeline
- No ESLint configuration — use `npx astro check` for type errors

---

For detailed reference files, see `docs/agent/` — these are loaded automatically by Claude Code via `CLAUDE.md`.
