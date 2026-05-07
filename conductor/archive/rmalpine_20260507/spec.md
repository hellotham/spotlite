# Specification - Remove Alpine.js from Project

## Overview
The goal of this track is to remove Alpine.js as a dependency from the Spotlite project. Alpine.js is currently used for minor interactivity (mobile menu toggling and theme switching). These can be replaced with standard JavaScript/TypeScript or Astro-native patterns to reduce the bundle size and simplify the tech stack.

## Scope
- **Configuration:** `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`.
- **Components:**
    - `src/components/header.astro`
    - `src/components/navbar.astro`
    - `src/components/theme.astro`
- **Documentation:** `README.md`, `GEMINI.md`, and all `conductor/*.md` files.

## Technical Approach
1. **Remove Dependencies:** Uninstall `@astrojs/alpinejs` and `alpinejs`.
2. **Refactor Interactivity:**
    - Replace `x-data`, `x-on`, `x-show`, and `x-bind` with standard DOM manipulation or Astro-native state management (e.g., using `<script>` tags in components).
    - For the theme switcher, use a simple script that interacts with `localStorage` and the `document.documentElement`.
3. **Update Documentation:** Ensure all references to Alpine.js are removed from the project guides.

## Acceptance Criteria
- [ ] Alpine.js is removed from `package.json` and `astro.config.mjs`.
- [ ] Mobile menu in `header.astro` and `navbar.astro` works correctly without Alpine.js.
- [ ] Theme switcher in `theme.astro` works correctly without Alpine.js.
- [ ] No Alpine.js-related errors in the console.
- [ ] All documentation is updated.
