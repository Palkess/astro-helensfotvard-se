# helensfotvard.se

Source code for [helensfotvard.se](https://helensfotvard.se) — the marketing site for Helens Fotvård, a medical foot care clinic in Borgholm, Öland, Sweden.

Built with Astro 5, Svelte 5, Tailwind CSS 4, and TypeScript. Deploys as a fully static site via GitHub Actions to GitHub Pages.

---

## Stack

| Technology     | Role                                                    |
| -------------- | ------------------------------------------------------- |
| Astro 5        | Static site generation, routing, image optimization     |
| Svelte 5       | Interactive components (Header, Button)                 |
| Tailwind CSS 4 | Utility-first styling with CSS-variable design tokens   |
| TypeScript     | Type safety across all source files                     |
| Prettier       | Code formatting (Astro, Svelte, Tailwind class sorting) |

---

## Getting started

```sh
npm install
npm run dev        # http://localhost:4321
```

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start dev server at `http://localhost:4321` |
| `npm run build`   | Build static output to `./dist/`            |
| `npm run preview` | Preview the build locally                   |
| `npm run format`  | Run Prettier across all files               |
| `npm run check`   | TypeScript type checking via `astro check`  |

Run `npm run format` before committing.

---

## Project structure

```
src/
├── assets/images/services/   # Source images — processed at build time (AVIF/WebP)
├── components/
│   ├── atoms/                # Single UI elements (Button)
│   ├── molecules/            # Composed elements (ServiceCard, SectionHeader, etc.)
│   └── organisms/            # Full page sections (Header, Footer, HeroSection, etc.)
├── data/
│   └── services.ts           # All service content — single source of truth
├── layouts/
│   └── Layout.astro          # Root HTML shell
├── pages/
│   ├── index.astro           # Homepage
│   └── tjanster/[slug].astro # Service detail pages (statically generated)
└── styles/
    └── global.css            # Tailwind import + custom design tokens
```

All service content (titles, descriptions, slugs, images, durations) lives in `src/data/services.ts`. There is no CMS.

---

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via `.github/workflows/deploy.yml`. No manual steps required.

---

## Agent documentation

The `docs/agent/` directory contains structured reference docs written for AI coding agents (Claude Code, GitHub Copilot, etc.). They exist because agents benefit from explicit context that is hard to infer from reading code alone.

| File                         | When it's useful                                                 |
| ---------------------------- | ---------------------------------------------------------------- |
| `docs/agent/conventions.md`  | Code style, component patterns, Svelte 5 syntax rules            |
| `docs/agent/architecture.md` | Directory structure, data flow, framework split rationale        |
| `docs/agent/decisions.md`    | Architectural decision records (why things are the way they are) |
| `docs/agent/bugs.md`         | Known issues, gotchas, and active workarounds                    |
| `docs/agent/workflows.md`    | Commands, build process, deployment pipeline                     |
| `docs/agent/skills.md`       | Key APIs and framework patterns used in this project             |
| `docs/agent/context.md`      | Domain knowledge — Swedish terms, business rules, booking flow   |

These files are also useful for human contributors onboarding to the project. `CLAUDE.md` (root) and `AGENTS.md` (root) are entry points that instruct AI tools to load the relevant docs based on the task at hand.
