# Implementation Plan: Refactor Creations and Passions to Collections

## Phase 1: Define Collections [checkpoint: 041eb63]
- [x] Task: Update `src/content.config.ts` to export schemas for `creation` and `passion` collections using `glob` loaders. 02588a5
- [x] Task: Generate TypeScript types by running `pnpm run dev` or `pnpm astro sync`. 041c312
- [x] Task: Update or add tests in `tests/content-data.contracts.test.ts` to validate the new collection schemas. 2fa505c
- [x] Task: Conductor - User Manual Verification 'Define Collections' (Protocol in workflow.md) 041eb63

## Phase 2: Migrate Data
- [ ] Task: Extract items from `src/content/page/creations.md` and create individual markdown files in `src/content/creation/`.
- [ ] Task: Extract items from `src/content/page/passions.md` and create individual markdown files in `src/content/passion/`.
- [ ] Task: Remove the `list` array from the frontmatter of `src/content/page/creations.md` and `src/content/page/passions.md`.
- [ ] Task: Conductor - User Manual Verification 'Migrate Data' (Protocol in workflow.md)

## Phase 3: Refactor Layouts
- [ ] Task: Refactor `src/layouts/creations.astro` to use `getCollection('creation')`, grouping the results by `section` before rendering.
- [ ] Task: Refactor `src/layouts/passions.astro` to use `getCollection('passion')`, grouping the results by `section` before rendering.
- [ ] Task: Write tests to ensure the layout components correctly render the data from the collections.
- [ ] Task: Conductor - User Manual Verification 'Refactor Layouts' (Protocol in workflow.md)