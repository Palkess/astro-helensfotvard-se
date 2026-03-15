---
name: Architecture
description: System overview, component structure, data flow, and key architectural patterns
type: reference
---

## When to consult this file

Consult this file when navigating the codebase, proposing structural changes, adding new pages or sections, or understanding how data flows from source to rendered output.

---

## Overview

Static marketing site for a medical foot care clinic (Helens Fotvård). Built with Astro for zero-JS-by-default static output, Svelte for interactive components, and Tailwind CSS for styling. Deployed as a fully static site (no server-side rendering, no API routes).

---

## Directory structure

```
src/
├── assets/images/services/   # Source images — processed at build time
├── components/
│   ├── atoms/                # Button.svelte
│   ├── molecules/            # ServiceCard, SectionHeader, ContactItem, HoursRow
│   └── organisms/            # Header, Footer, HeroSection, ServicesSection,
│                             # AboutSection, ContactSection
├── data/
│   └── services.ts           # All service definitions (typed TS, single source of truth)
├── layouts/
│   └── Layout.astro          # Root HTML shell — loads Header, Footer, global CSS
├── pages/
│   ├── index.astro           # Homepage — composes all organism sections
│   └── tjanster/[slug].astro # Service detail pages — statically generated from services.ts
└── styles/
    └── global.css            # Tailwind import + @theme custom tokens
```

---

## Data flow

```
src/data/services.ts
       │
       ├──► index.astro → ServicesSection → ServiceCard (list view)
       │
       └──► tjanster/[slug].astro (getStaticPaths) → service detail page
                  └──► Picture (src/assets/images/services/*.jpg)
```

There is no CMS, database, or API. All content is hardcoded in `src/data/services.ts`.

---

## Page structure

### Homepage (`/`)

The homepage is a single-page layout composed of organisms stacked vertically:

1. `Header` (Svelte, `client:load`) — sticky nav, mobile hamburger menu
2. `HeroSection` — headline, CTA button, background image
3. `ServicesSection` (`id="tjanster"`) — grid of `ServiceCard` components
4. `AboutSection` — clinic info, qualifications
5. `ContactSection` (`id="kontakt"`) — contact details, booking info, business hours
6. `Footer`

Section IDs (`tjanster`, `kontakt`) are anchor targets used by CTAs across the site.

### Service detail pages (`/tjanster/[slug]`)

Statically generated — one page per entry in `services`. Layout:
- Split hero: text left, `Picture` right
- Back link to `/#tjanster`
- "Boka tid" CTA links to `/#kontakt`

---

## Framework split: Astro vs Svelte

| Component | Framework | Reason |
|---|---|---|
| Layout, pages, all sections | Astro | Static, no JS needed |
| Header | Svelte | Mobile menu state, scroll effects, keyboard nav |
| Button | Svelte | Used in both Astro and Svelte contexts; supports `onclick` callback |

Interactive Svelte components are mounted with `client:load` in the layout, meaning they hydrate immediately on page load.

---

## Styling system

Custom design tokens are defined in `src/styles/global.css` under `@theme` and become Tailwind utilities automatically (Tailwind v4 CSS-variable approach). No `tailwind.config.js` exists — configuration is CSS-only.

Key token groups:
- `--color-primary` / `--color-primary-dark` / `--color-primary-light` — brand blue
- `--color-surface-*` — page background variants
- `--color-text-*` — heading / body / muted text hierarchy
- `--color-card` / `--color-card-border` — card component surfaces
- `--color-footer-*` — footer-specific colors
- `--color-notice-*` — alert/notice box colors

---

## Build output

`npm run build` produces a fully static site in `dist/`. No server runtime required. Images are processed to AVIF/WebP with multiple widths during build.

---

## How to contribute to this file

Update this file when:
- A new top-level directory or major structural pattern is added to `src/`
- A new page type or routing pattern is introduced
- The framework split decision changes (e.g., a new interactive component is added)
- The data model changes significantly (e.g., a second data file, a CMS is introduced)
