# Implementation Plan: UI Transitions and Animations

## Phase 1: Astro View Transitions Setup [checkpoint: df9d8e6]
- [x] Task: Add `<ViewTransitions />` component to the main layout. 2f767a7
    - [ ] Update `src/layouts/layout.astro` to import and include `<ViewTransitions />` in the `<head>`.
- [x] Task: Conductor - User Manual Verification 'Astro View Transitions Setup' (Protocol in workflow.md)

## Phase 2: UnoCSS Animation Configuration & Base Utilities
- [ ] Task: Configure global animation rules and `prefers-reduced-motion`.
    - [ ] Update `uno.config.ts` or global styles to include custom entrance animation utilities (e.g., `animate-fade-in-up`).
    - [ ] Ensure a global CSS safeguard exists to disable animations when `prefers-reduced-motion: reduce` is active.
- [ ] Task: Conductor - User Manual Verification 'UnoCSS Animation Configuration & Base Utilities' (Protocol in workflow.md)

## Phase 3: Interaction Feedback (Hover/Focus States)
- [ ] Task: Enhance button and link hover/focus states.
    - [ ] Review navigation components (`src/components/navbar.astro`, `src/components/navmenu.astro`) and apply UnoCSS transition classes (e.g., `transition-colors duration-200 ease-in-out`).
- [ ] Task: Enhance interactive cards.
    - [ ] Review `src/components/articlelist.astro`, `src/components/imagecards.astro`, `src/components/work.astro`.
    - [ ] Add subtle transform/shadow transitions on hover (e.g., `transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`).
- [ ] Task: Conductor - User Manual Verification 'Interaction Feedback (Hover/Focus States)' (Protocol in workflow.md)

## Phase 4: Component Entrance Animations
- [ ] Task: Implement entrance animations for main content blocks.
    - [ ] Apply entrance animation classes (defined in Phase 2) to key sections like the hero and content lists across main pages (`src/pages/index.astro`, `src/pages/projects.astro`, etc.).
- [ ] Task: Conductor - User Manual Verification 'Component Entrance Animations' (Protocol in workflow.md)

## Phase 5: Mobile Menu Animation
- [ ] Task: Animate mobile menu open/close state.
    - [ ] Locate the mobile menu toggle logic (likely in `src/components/header.astro` or `src/components/navmenu.astro`).
    - [ ] Add transition classes to the mobile menu container to animate its visibility (e.g., fading or sliding in).
- [ ] Task: Conductor - User Manual Verification 'Mobile Menu Animation' (Protocol in workflow.md)