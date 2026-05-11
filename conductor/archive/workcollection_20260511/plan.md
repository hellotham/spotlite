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
- [x] Task: Conductor - User Manual Verification 'Phase 1: Schema & Data Migration' (Protocol in workflow.md) [c484f0f]

## Phase 2: Component & Script Updates
- [x] Task: Update UI tests for `work` collection. [c484f0f]
    - [x] Modify `tests/work-component.test.ts` (and other relevant tests) to expect `startyear`, `endyear`, and `type` formatting. Run to verify failure (Red Phase). [c484f0f]
- [x] Task: Update UI Components. [c484f0f]
    - [x] Update `src/components/work.astro` and any related layouts to use the new schema. [c484f0f]
    - [x] Render dates as `startyear - endyear` (or "Present" if `endyear` is undefined). [c484f0f]
    - [x] Append the capitalized `type` to the role title. [c484f0f]
    - [x] Verify tests pass (Green Phase). [c484f0f]
- [x] Task: Update PDF generation scripts. [c484f0f]
    - [x] Modify `scripts/generate-pdf.js` to process the new date fields and type. [c484f0f]
- [x] Task: Conductor - User Manual Verification 'Phase 2: Component & Script Updates' (Protocol in workflow.md) [c484f0f]