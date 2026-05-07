# Implementation Plan: Refactor Theme Switcher

## Phase 1: Test Coverage and Setup
- [x] Task: Analyze testing environment and establish baseline tests. (e70f6c1)
    - [x] Analyze `package.json` to determine the existing testing framework (e.g., Vitest, Playwright).
    - [x] Write failing test(s) to verify dynamic class toggling on `document.documentElement` and `localStorage` updates without page reload.
- [ ] Task: Conductor - User Manual Verification 'Test Coverage and Setup' (Protocol in workflow.md)

## Phase 2: Refactor Theme Logic and Layout
- [ ] Task: Clean up `src/layouts/layout.astro`.
    - [ ] Remove legacy `[x-cloak]` inline styles.
    - [ ] Ensure the FOUC inline script is perfectly synced with the expected logic.
- [ ] Task: Refactor `src/components/theme.astro` JavaScript logic.
    - [ ] Remove `window.location.reload()` from click event listeners.
    - [ ] Refactor `updateUI` to dynamically add/remove the `dark` class on `document.documentElement` based on the selected theme or system preference.
    - [ ] Add a `window.matchMedia('(prefers-color-scheme: dark)')` listener to handle system theme changes dynamically when the "Auto" setting is active.
    - [ ] Ensure ARIA attributes (`aria-selected`, `aria-expanded` on the menu) correctly reflect the active state and toggle status.
- [ ] Task: Conductor - User Manual Verification 'Refactor Theme Logic and Layout' (Protocol in workflow.md)