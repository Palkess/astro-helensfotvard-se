---
name: Workflows
description: How to run, build, test, and deploy this project
type: reference
---

## When to consult this file

Consult this file when running, building, testing, formatting, or deploying the project.

---

## Commands

All commands are run from the project root.

| Command           | Action                                         |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Start dev server at `http://localhost:4321`    |
| `npm run build`   | Build static output to `./dist/`               |
| `npm run preview` | Preview the build locally (serves `./dist/`)   |
| `npm run format`  | Run Prettier across all files                  |
| `npm run check`   | Run TypeScript type checking via `astro check` |

---

## Development

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:4321`

Hot module reload is active. Astro components update without full refresh; Svelte components hydrate with HMR.

---

## Build

`npm run build` runs Astro's static site generator:

- Renders all pages to HTML
- Processes images (generates AVIF/WebP at multiple widths)
- Bundles and minifies JS/CSS
- Output: `./dist/`

Run `npm run preview` after build to verify the static output before deploying.

---

## Formatting

Run `npm run format` before committing. This runs Prettier with plugins for Astro, Svelte, and Tailwind class sorting.

There is no lint step — ESLint is not configured. TypeScript type checking is available via `npm run check`.

---

## Type checking

```sh
npm run check
```

This runs the Astro TypeScript checker across `.astro`, `.svelte`, and `.ts` files. Run this to catch type errors before committing.

---

## Deployment

Deployment is automated via GitHub Actions and GitHub Pages. The workflow is defined in `.github/workflows/deploy.yml`.

**Trigger:** Any push to `main`, or manually via `workflow_dispatch` in the GitHub Actions UI.

**Pipeline steps:**

1. `build` job — checks out the repo, installs dependencies with `npm ci`, runs `npm run build`, and uploads `dist/` as a Pages artifact
2. `deploy` job — deploys the artifact to GitHub Pages using `actions/deploy-pages`

**Concurrency:** Only one deployment runs at a time (group: `pages`). A new push to `main` will cancel any in-progress deployment.

To trigger a manual deploy: go to the repository's **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

---

## How to contribute to this file

Update this file when:

- New npm scripts are added to `package.json`
- A CI/CD pipeline is set up
- Deployment process changes
- A test framework is introduced
