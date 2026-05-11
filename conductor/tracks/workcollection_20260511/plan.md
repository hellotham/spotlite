# Implementation Plan: Refactor Work Collection Dates and Type

## Phase 1: Schema & Data Migration
- [x] Task: Update `work` collection schema in `src/content.config.ts`. [9e9dd9c]
    - [x] Remove `datespan`. [9e9dd9c]
    - [x] Add `startyear` (number), `endyear` (optional number), and `type` (enum, default 'employment'). [9e9dd9c]
- [x] Task: Migrate existing markdown data in `src/content/work/`. [9e9dd9c]
    - [x] Update frontmatter in all files to use the new fields. [9e9dd9c]
- [x] Task: Update `education` collection schema in `src/content.config.ts`. [ed3d34c]
    - [x] Remove `datespan`. [ed3d34c]
    - [x] Add `startyear` (number) and `endyear` (optional number). [ed3d34c]
- [x] Task: Migrate existing markdown data in `src/content/education/`. [ed3d34c]
    - [x] Update frontmatter in all files to use the new fields. [ed3d34c]
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Schema & Data Migration' (Protocol in workflow.md)

## Phase 2: Component & Script Updates
- [x] Task: Update UI tests for `work` collection. [d3b9e4a]
    - [x] Modify `tests/work-component.test.ts` (and other relevant tests) to expect `startyear`, `endyear`, and `type` formatting. Run to verify failure (Red Phase). [d3b9e4a]
- [x] Task: Update UI Components. [d3b9e4a]
    - [x] Update `src/components/work.astro` and any related layouts to use the new schema. [d3b9e4a]
    - [x] Render dates as `startyear - endyear` (or "Present" if `endyear` is undefined). [d3b9e4a]
    - [x] Append the capitalized `type` to the role title. [d3b9e4a]
    - [x] Verify tests pass (Green Phase). [d3b9e4a]
- [x] Task: Update PDF generation scripts. [d3b9e4a]
    - [x] Modify `scripts/generate-pdf.js` to process the new date fields and type. [d3b9e4a]
- [x] Task: Conductor - User Manual Verification 'Phase 2: Component & Script Updates' (Protocol in workflow.md) [d3b9e4a]