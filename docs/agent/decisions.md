---
name: Architectural Decisions
description: ADR-format log of architectural and design decisions with rationale
type: reference
---

## When to consult this file

Consult this file when making or evaluating architectural or design choices, choosing between frameworks or patterns, or trying to understand why the codebase is structured the way it is.

---

## ADR-001: Astro as the primary framework

**Date:** 2025 (initial setup)
**Context:** Need a fast, SEO-optimized static marketing site with minimal JavaScript.
**Decision:** Use Astro as the primary framework. All pages and static components are `.astro` files.
**Consequences:**

- Zero JS shipped by default for static components
- Svelte available as an opt-in for interactive components
- Build-time image optimization via `astro:assets`
- No server-side runtime required — site deploys as static files

---

## ADR-002: Svelte for interactive components only

**Date:** 2025 (initial setup)
**Context:** Astro supports multiple component frameworks. Svelte was chosen for interactive UI.
**Decision:** Use Svelte (v5) exclusively for components that require client-side state or event handling. All other components use Astro.
**Consequences:**

- Header and Button use Svelte; all sections use Astro
- Svelte 5 runes API (`$props`, `$state`, `$derived`, `$effect`) is the standard — no Svelte 3/4 syntax
- Interactive components are hydrated with `client:load`

---

## ADR-003: TypeScript data file instead of content collections

**Date:** 2025
**Context:** Services needed to be associated with typed metadata (slug, title, description, image, duration) and imported images. Content collections are better suited for markdown prose.
**Decision:** Store all service data in `src/data/services.ts` as a typed TypeScript array.
**Consequences:**

- Strong type safety on service shape
- Images can be imported directly and processed by Astro's asset pipeline
- Adding a new service requires editing a `.ts` file (not creating a markdown file)
- No CMS or markdown authoring workflow exists

---

## ADR-004: Tailwind CSS v4 with CSS-variable theming

**Date:** 2025
**Context:** Need a design system with consistent color tokens across Astro and Svelte components.
**Decision:** Use Tailwind v4 configured via `@theme` in `src/styles/global.css`. No `tailwind.config.js`.
**Consequences:**

- Custom tokens (`--color-primary`, `--color-text-heading`, etc.) become Tailwind utilities automatically
- Theming is CSS-only — no JavaScript config file to maintain
- Class sorting handled by `prettier-plugin-tailwindcss`

---

## ADR-005: Atomic Design component hierarchy

**Date:** 2025
**Context:** Need a consistent way to organize growing component library.
**Decision:** Follow Atomic Design: `atoms/` → `molecules/` → `organisms/`.
**Consequences:**

- Clear placement rules for new components
- Organisms are full page sections; molecules are reusable combinations; atoms are single elements

---

## ADR-006: lucide-svelte for icons

**Date:** 2026-03-16
**Context:** Icons were hand-coded inline SVGs, making them verbose and error-prone to maintain. Needed a consistent, maintainable icon system compatible with Svelte 5 and Tailwind.
**Decision:** Use `@lucide/svelte` in `.svelte` files and `@lucide/astro` in `.astro` files. Import named components; size and color via Tailwind class attributes.
**Consequences:**

- Inline SVGs eliminated from components (only exception: highly specific shapes not in Lucide)
- Using `@lucide/astro` in `.astro` files avoids TypeScript errors from the Svelte component boundary (`class` prop not recognized on Svelte components in Astro context)
- Vite tree-shakes unused icons — no bundle cost for icons not imported
- Icon stroke style is consistent (Lucide defaults: `currentColor`, `round` caps/joins)
- New icons must exist in the Lucide library — custom shapes require a one-off inline SVG with a comment explaining why

---

## Anti-patterns

- **Global state management library (e.g., Svelte stores across pages):** Not needed — this is a static brochure site with no shared interactive state between sections. Do not introduce unless the site gains significant interactivity.
- **SSR / hybrid rendering:** Evaluated and rejected — adds hosting complexity with no benefit for a static marketing site with no dynamic data.
- **MDX for service content:** Service data is structured (slug, image, duration, description) rather than long-form prose. MDX would require frontmatter for all structured fields, losing the benefits of TypeScript types. Do not migrate to MDX unless services gain substantial rich-text content.

---

## How to contribute to this file

Add an ADR entry when:

- A non-obvious technology choice is made (framework, library, approach)
- An architectural pattern is established or abandoned
- A significant trade-off is accepted
- Cross-reference `docs/agent/bugs.md` if a decision is the known root cause of a documented issue

Format: **ADR-NNN: Title** → Context → Decision → Consequences. Always date-stamp.
