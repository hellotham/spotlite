# Implementation Plan: Refactor Social Links in Person Schema

## Phase 1: Setup and Testing
- [x] Task: Update SEO tests to verify dynamic social links in schema
    - [x] Update `src/layouts/seo.test.ts` to mock the `social` collection or verify the schema output against `src/social.json`.
    - [x] Write/update a test asserting that `personSchema.sameAs` in the rendered layout matches the collection links.
    - [x] Run the tests and ensure they fail (Red phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup and Testing' (Protocol in workflow.md)

## Phase 2: Implementation
- [x] Task: Refactor `src/layouts/layout.astro`
    - [x] Import `getCollection` from `astro:content`.
    - [x] Fetch the `social` collection.
    - [x] Map the collection to an array of URLs.
    - [x] Replace the hardcoded `sameAs` array in `personSchema` with the mapped array.
- [x] Task: Verify Tests Pass
    - [x] Run the test suite and verify the tests written in Phase 1 now pass (Green phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)

## Phase 3: Refactoring and Quality Gates
- [x] Task: Review code against guidelines
    - [x] Run linter and formatter (`pnpm run lint`).
    - [x] Check code coverage to ensure it meets requirements.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Refactoring and Quality Gates' (Protocol in workflow.md)