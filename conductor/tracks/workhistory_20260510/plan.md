# Implementation Plan: Work History Feature

## Phase 1: Navigation and Routing Updates [checkpoint: 0b11343]
- [x] Task: Add "Work" to main navigation f629b0d
    - [x] Update `src/menu.json` to include a "Work" item, linking to `/work`.
    - [x] Position the new item immediately after "Articles".
- [x] Task: Set up dynamic routing for individual work pages baa53fc
    - [x] Create a layout for individual work items (e.g., `src/layouts/work.astro` if needed, or reuse an existing layout).
    - [x] Create dynamic route file (e.g., `src/pages/work/[...page].astro` or similar, depending on existing routing patterns).
    - [x] Implement `getStaticPaths` to generate routes based on the `work` collection.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Navigation and Routing Updates' (Protocol in workflow.md) 0b11343

## Phase 2: Work History Page Implementation [checkpoint: 128917d]
- [x] Task: Write tests for Work History list page ed06835
    - [x] Create tests to verify the `/work` page renders correctly.
    - [x] Verify tests check for Job Title, Company Name, Dates, and Summary.
- [x] Task: Implement Work History page ed06835
    - [x] Create `src/pages/work/index.astro` (or update existing if using a catch-all route).
    - [x] Fetch the `work` collection and sort it chronologically.
    - [x] Render the list displaying the required fields for each entry.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Work History Page Implementation' (Protocol in workflow.md) 128917d

## Phase 3: Component Redesign (`work.astro`) [checkpoint: c883af1]
- [x] Task: Write tests for interactive work cards 44f57a4
    - [x] Update component tests to verify `src/components/work.astro` renders clickable items.
    - [x] Ensure tests check for proper linking to `/work/[slug]` and accessibility attributes.
- [x] Task: Implement interactive cards in `work.astro` 44f57a4
    - [x] Refactor `src/components/work.astro`.
    - [x] Change list items to anchor tags (`<a>`) wrapping the content.
    - [x] Apply UnoCSS classes (e.g., `card-interactive`, `focus-ring`) to style them as cards.
    - [x] Ensure the links point to the newly created individual work pages.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Component Redesign (`work.astro`)' (Protocol in workflow.md) c883af1