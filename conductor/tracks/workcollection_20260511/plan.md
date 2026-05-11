# Implementation Plan: Refactor Work Collection Dates and Type

## Phase 1: Schema & Data Migration
- [x] Task: Update `work` collection schema in `src/content.config.ts`. [9e9dd9c]
    - [x] Remove `datespan`. [9e9dd9c]
    - [x] Add `startyear` (number), `endyear` (optional number), and `type` (enum, default 'employment'). [9e9dd9c]
- [x] Task: Migrate existing markdown data in `src/content/work/`. [9e9dd9c]
    - [x] Update frontmatter in all files to use the new fields. [9e9dd9c]
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Schema & Data Migration' (Protocol in workflow.md)

## Phase 2: Component & Script Updates
- [ ] Task: Update UI tests for `work` collection.
    - [ ] Modify `tests/work-component.test.ts` (and other relevant tests) to expect `startyear`, `endyear`, and `type` formatting. Run to verify failure (Red Phase).
- [ ] Task: Update UI Components.
    - [ ] Update `src/components/work.astro` and any related layouts to use the new schema.
    - [ ] Render dates as `startyear - endyear` (or "Present" if `endyear` is undefined).
    - [ ] Append the capitalized `type` to the role title.
    - [ ] Verify tests pass (Green Phase).
- [ ] Task: Update PDF generation scripts.
    - [ ] Modify `scripts/generate-pdf.js` to process the new date fields and type.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Component & Script Updates' (Protocol in workflow.md)