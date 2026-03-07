# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
npm run format    # Format all files with Prettier
```

There are no tests configured in this project.

## Architecture

This is an **Astro 5** site with **Svelte 5** for interactive components and **Tailwind CSS 4** for styling.

- **Astro pages** (`src/pages/`) define routes. `index.astro` is the home page.
- **Layout** (`src/layouts/Layout.astro`) wraps pages with the HTML shell and imports global CSS.
- **Components** (`src/components/`) follow atomic design and mix `.astro` and `.svelte` files:
    - Static/server-rendered parts use Astro components
    - Interactive client-side components use Svelte 5 with runes syntax (`$state()`, `$props()`)
    - Svelte components used as islands must use a `client:*` directive (e.g. `client:visible`)
    - **Atoms** (`atoms/`) — smallest reusable elements with no dependencies on other components
    - **Molecules** (`molecules/`) — small composites built from atoms or plain HTML
    - **Organisms** (`organisms/`) — full sections and layout components
    - **Note:** Astro components cannot be imported inside Svelte components. Atoms should always be Svelte components.

### Key conventions

- **Svelte 5 runes**: Use `$state()` for reactive state, `$props()` for component props, `{@render children()}` for slots/snippets.
- **Tailwind CSS 4**: Configured via the Vite plugin (`@tailwindcss/vite`), not PostCSS. No `tailwind.config.*` file is needed.
- **Prettier**: 4-space indent, single quotes, no trailing commas, 100 char print width. Run `npm run format` before committing.

### Language

The readable text by visitors to this website should always be in Swedish, while everything in the background should be English.

- For example: If I want to add a console.log to debug any part of interactive code, I want the console message to be in English.
- For example: If there's a button or link that is visible for the user, it should be in Swedish.

### Website context

This is a website for a podiatrist clinic in Sweden called Helens Fotvård. The design should be calming and neutral, common to other healthcare/podiatrist websites.
The design should be easy to navigate and read for older people. It should also accessible according to WCAG 2.2 AA.
