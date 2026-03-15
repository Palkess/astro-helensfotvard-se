---
name: Known Bugs and Issues
description: Confirmed bugs, suspected issues, and known gotchas in this codebase
type: reference
---

## When to consult this file

Consult this file when debugging, investigating errors, or working around known issues. Also consult when you encounter unexpected behavior that might already be documented.

---

## When to update this file

Add an entry here when:
- A bug is confirmed (reproducible, root cause identified)
- A workaround is applied that future contributors might undo without understanding why
- A suspected issue is under investigation but not yet confirmed
- A known limitation of a dependency affects this project

Remove or update entries when bugs are fixed.

---

## Confirmed bugs

*No confirmed bugs with active workarounds at this time.*

---

## Suspected issues

*No suspected issues under active investigation at this time.*

---

## Known gotchas

### Hero section placeholder image
**Status:** Known / intentional (as of last commit `6d00c54`)
The hero section uses a placeholder image. The commit message notes "Placeholder image atm". This is expected — a final hero image has not been sourced yet. Do not treat the hero image as a confirmed asset when working on visual changes.

### No ESLint configuration
**Status:** Known / intentional
ESLint is not set up. Type checking is available via `npx astro check`. Linting gaps are accepted for this project size.

### All dependencies listed under `dependencies` (not `devDependencies`)
**Status:** Known / low priority
Build tools (Prettier, TypeScript) are in `dependencies` rather than `devDependencies`. This is harmless for a static site with no published package, but is unconventional. Do not "fix" this without understanding the deployment pipeline, as some hosts install only `dependencies`.

---

## How to contribute to this file

- Label every entry as **Confirmed**, **Suspected**, or **Known gotcha** — never mix confidence levels
- For confirmed bugs: include reproduction steps if non-obvious, the workaround if one exists, and a cross-reference to `docs/agent/decisions.md` if an architectural decision is the root cause
- For suspected issues: describe observed symptoms and what has been investigated so far
- When a bug is fixed, remove or mark it resolved with the fix commit reference
