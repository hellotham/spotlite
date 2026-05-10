# Implementation Plan: Menu Collection Refactoring

## Phase 1: Migration Script and Schema Update [checkpoint: eee4995]
- [x] Task: Write and execute the migration script to update `page` frontmatter. (9ce47c5)
    - [ ] Create a temporary script (e.g., `migrate-menu.js`) in the project root.
    - [ ] Read and parse `src/menu.json`.
    - [ ] Read all Markdown files in `src/content/page/`.
    - [ ] Inject the corresponding `order` from the JSON into the Markdown frontmatter of each file.
    - [ ] Run the script and verify that all 6 files in `src/content/page/` have the `order` property.
    - [ ] Delete the temporary migration script.
- [x] Task: Update the `page` collection schema. (77a3653)
    - [ ] Modify `src/content.config.ts` to add `order: z.number()` to the `page` collection schema.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Migration Script and Schema Update' (Protocol in workflow.md)

## Phase 2: Component Refactoring [checkpoint: d885969]
- [x] Task: Refactor `src/components/navmenu.astro`. (a4cc298)
    - [ ] Change the collection query from `menu` to `page`.
    - [ ] Sort the collection by `item.data.order`.
    - [ ] Update the rendering logic to use `item.data.title` for the label and `/${item.id}` for the `href`.
- [x] Task: Refactor `src/components/footer.astro`. (a6998f4)
    - [ ] Change the collection query from `menu` to `page`.
    - [ ] Sort the collection by `item.data.order`.
    - [ ] Update the rendering logic to use `item.data.title` for the label and `/${item.id}` for the `href`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Component Refactoring' (Protocol in workflow.md)

## Phase 3: Cleanup and Verification
- [ ] Task: Remove the `menu` collection.
    - [ ] Delete `src/menu.json`.
    - [ ] Remove the `menu` collection definition and its export from `src/content.config.ts`.
- [ ] Task: Run automated tests and linting.
    - [ ] Run `pnpm run check` or equivalent test/lint commands to ensure the site builds correctly and no tests are broken.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Cleanup and Verification' (Protocol in workflow.md)