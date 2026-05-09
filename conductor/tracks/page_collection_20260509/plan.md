# Implementation Plan: Page Collection Migration

## Phase 1: Define `page` Collection [checkpoint: c5c511f]
- [x] Task: Define `page` collection schema in `src/content.config.ts`. (2145bc7)
    - [x] Update imports if necessary (e.g., Zod).
    - [x] Define the schema with `title`, `description`, `draft`, `seo`, and `layout`.
- [x] Task: Create `src/content/page/` directory. (2145bc7)
- [x] Task: Conductor - User Manual Verification 'Define `page` Collection' (Protocol in workflow.md) (c5c511f)

## Phase 2: Create Dynamic Route & Layouts [checkpoint: 7aa6661]
- [x] Task: Create `src/pages/[...slug].astro` (or `[page].astro`) for dynamic routing. (a1d3c96)
    - [x] Implement `getStaticPaths` to query the `page` collection.
    - [x] Implement logic to dynamically resolve and render the component specified in the `layout` frontmatter property.
    - [x] Add unit test to verify routing logic (if applicable/testable in Vitest).
- [x] Task: Extract layout logic from `articles.astro` and `projects.astro`. (a1d3c96)
    - [x] Create `src/layouts/ArticlesLayout.astro`. Move the collection fetching and list rendering logic here.
    - [x] Create `src/layouts/ProjectsLayout.astro`. Move the collection fetching and list rendering logic here.
- [x] Task: Conductor - User Manual Verification 'Create Dynamic Route & Layouts' (Protocol in workflow.md) (7aa6661)

## Phase 3: Migrate Content Files
- [ ] Task: Migrate static markdown pages.
    - [ ] Move `src/pages/about.md` to `src/content/page/about.md` and update frontmatter (add `layout: ../layouts/about.astro` or similar).
    - [ ] Move `src/pages/creations.md` to `src/content/page/creations.md` and update frontmatter.
    - [ ] Move `src/pages/uses.md` to `src/content/page/uses.md` and update frontmatter.
- [ ] Task: Migrate list pages.
    - [ ] Delete `src/pages/articles.astro` and create `src/content/page/articles.md` with `layout: ../layouts/ArticlesLayout.astro` (or correct path).
    - [ ] Delete `src/pages/projects.astro` and create `src/content/page/projects.md` with `layout: ../layouts/ProjectsLayout.astro` (or correct path).
- [ ] Task: Conductor - User Manual Verification 'Migrate Content Files' (Protocol in workflow.md)

## Phase 4: Cleanup and Verification
- [ ] Task: Run type checks and linter (`pnpm run lint`).
- [ ] Task: Run unit tests.
- [ ] Task: Verify the local build works (`pnpm run build`).
- [ ] Task: Conductor - User Manual Verification 'Cleanup and Verification' (Protocol in workflow.md)