# Implementation Plan: Work History Feature

## Phase 1: Navigation and Routing Updates
- [x] Task: Add "Work" to main navigation f629b0d
    - [x] Update `src/menu.json` to include a "Work" item, linking to `/work`.
    - [x] Position the new item immediately after "Articles".
- [ ] Task: Set up dynamic routing for individual work pages
    - [ ] Create a layout for individual work items (e.g., `src/layouts/work.astro` if needed, or reuse an existing layout).
    - [ ] Create dynamic route file (e.g., `src/pages/work/[...page].astro` or similar, depending on existing routing patterns).
    - [ ] Implement `getStaticPaths` to generate routes based on the `work` collection.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Navigation and Routing Updates' (Protocol in workflow.md)

## Phase 2: Work History Page Implementation
- [ ] Task: Write tests for Work History list page
    - [ ] Create tests to verify the `/work` page renders correctly.
    - [ ] Verify tests check for Job Title, Company Name, Dates, and Summary.
- [ ] Task: Implement Work History page
    - [ ] Create `src/pages/work/index.astro` (or update existing if using a catch-all route).
    - [ ] Fetch the `work` collection and sort it chronologically.
    - [ ] Render the list displaying the required fields for each entry.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Work History Page Implementation' (Protocol in workflow.md)

## Phase 3: Component Redesign (`work.astro`)
- [ ] Task: Write tests for interactive work cards
    - [ ] Update component tests to verify `src/components/work.astro` renders clickable items.
    - [ ] Ensure tests check for proper linking to `/work/[slug]` and accessibility attributes.
- [ ] Task: Implement interactive cards in `work.astro`
    - [ ] Refactor `src/components/work.astro`.
    - [ ] Change list items to anchor tags (`<a>`) wrapping the content.
    - [ ] Apply UnoCSS classes (e.g., `card-interactive`, `focus-ring`) to style them as cards.
    - [ ] Ensure the links point to the newly created individual work pages.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Component Redesign (`work.astro`)' (Protocol in workflow.md)