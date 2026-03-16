---
name: Code Conventions
description: Code style, naming conventions, and patterns specific to this codebase not enforced by tooling
type: reference
---

## When to consult this file

Consult this file when writing, editing, or reviewing any source code in this project. Not needed for deployment, domain questions, or architecture discussions.

---

## Formatting

Formatting is fully handled by Prettier — see `.prettierrc`. This includes indentation (4 spaces), single quotes, no trailing commas, 100-char print width, and Tailwind class ordering.

Run `npm run format` before committing.

---

## Component conventions

### Framework choice rule

- Use **Astro** (`.astro`) for static, content-only components — sections, cards, layout parts
- Use **Svelte** (`.svelte`) only when client-side interactivity is needed (state, event handlers, reactive updates)
- Do not add Svelte components for purely presentational content — Astro renders faster and ships no JS

### File placement (Atomic Design)

```
src/components/
  atoms/       — single UI element, no composition (Button)
  molecules/   — 2–4 atoms composed together (ServiceCard, SectionHeader, HoursRow, ContactItem)
  organisms/   — full page sections, compose molecules (HeroSection, Header, Footer)
```

Place new components at the correct level. Organisms belong in `organisms/`, not at the root of `components/`.

### Component naming

- Files: `PascalCase.astro` / `PascalCase.svelte`
- Organisms that are page sections: suffix with `Section` (e.g., `ServicesSection.astro`)
- No index files — import by explicit filename

### Props

Always define props with a TypeScript `interface Props` (Astro) or `interface Props` + `$props()` (Svelte 5):

```astro
---
interface Props {
    title: string;
    href?: string;
}
const { title, href } = Astro.props;
---
```

```svelte
<script lang="ts">
    interface Props {
        label: string;
    }
    const { label }: Props = $props();
</script>
```

---

## Svelte 5 syntax

This project uses **Svelte 5**. Use the new runes API — do not use Svelte 3/4 syntax:

| Old (Svelte 4) | New (Svelte 5)                                  |
| -------------- | ----------------------------------------------- |
| `export let x` | `const { x } = $props()`                        |
| `$:` reactive  | `$derived` / `$effect`                          |
| `<slot />`     | `{@render children()}` with `children: Snippet` |
| `on:click`     | `onclick={...}`                                 |

---

## Styling

- Use **Tailwind utility classes** directly in markup — no separate CSS files per component
- Reference custom theme tokens defined in `src/styles/global.css` via their Tailwind names:
    - Colors: `bg-primary`, `text-text-heading`, `bg-surface-muted`, `border-card-border`, etc.
    - Do not hardcode hex values in classes — always use the theme token
- For layout sections: `max-w-5xl mx-auto px-6` is the standard container width
- Responsive prefix order: mobile-first, then `md:`, `lg:`

---

## Data

- All site content lives in `src/data/services.ts` as a typed TypeScript export
- No content collections (no `src/content/` directory) — data is code, not markdown
- Add new data to `src/data/` as a named export with a TypeScript interface

---

## Images

- Store images in `src/assets/images/` (processed at build time by Astro)
- Use the Astro `<Picture>` component for all content images — it generates AVIF/WebP and responsive sizes automatically
- Do not use raw `<img>` tags for content images
- Always set `widths`, `sizes`, and `formats={['avif', 'webp']}`

---

## Icons

- Use **`lucide-svelte`** components — do not write inline SVGs
- Import only the icons you need: `import { ChevronDown } from 'lucide-svelte'`
- Set size via Tailwind class (`class="h-4 w-4"`), not the `size` prop
- Always set `aria-hidden="true"` on decorative icons; provide an `aria-label` only on standalone icon buttons
- Do not hardcode SVG attributes — Lucide defaults (`currentColor`, `fill="none"`, etc.) are correct

---

## Routing

- Pages live in `src/pages/`
- Dynamic routes use `[slug].astro` with `getStaticPaths()` returning data from `src/data/`
- URL slugs are Swedish (e.g., `/tjanster/medicinsk-fotvard`) — match `slug` field in data
- Section anchors use Swedish IDs (e.g., `id="tjanster"`, `id="kontakt"`)

---

## Anti-patterns

- **We tried using content collections** — the project started with a content-only approach but the services data is structured, typed, and image-linked, making a TypeScript data file a better fit. Do not migrate to content collections unless the data becomes primarily markdown prose.
- **We do not use scoped `<style>` in Astro components** — Tailwind utility classes handle all styling. Adding `<style>` blocks fragments the styling approach and makes theme tokens harder to apply consistently.
- **Do not use `client:visible` or `client:idle` on the Header** — the Header uses scroll-based effects that need to be active immediately; `client:load` is intentional.

---

## How to contribute to this file

Add entries here when:

- A non-obvious pattern is established in the codebase that future contributors might not deduce from reading the code
- A decision is made to always (or never) use a specific API or approach
- A formatting/naming inconsistency is resolved by convention

Do not add rules already enforced by Prettier or TypeScript. Reference config files instead.
