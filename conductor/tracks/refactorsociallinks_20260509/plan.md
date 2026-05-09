# Implementation Plan: Refactor Social Links in Person Schema

## Phase 1: Setup and Testing
- [ ] Task: Update SEO tests to verify dynamic social links in schema
    - [ ] Update `src/layouts/seo.test.ts` to mock the `social` collection or verify the schema output against `src/social.json`.
    - [ ] Write/update a test asserting that `personSchema.sameAs` in the rendered layout matches the collection links.
    - [ ] Run the tests and ensure they fail (Red phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup and Testing' (Protocol in workflow.md)

## Phase 2: Implementation
- [ ] Task: Refactor `src/layouts/layout.astro`
    - [ ] Import `getCollection` from `astro:content`.
    - [ ] Fetch the `social` collection.
    - [ ] Map the collection to an array of URLs.
    - [ ] Replace the hardcoded `sameAs` array in `personSchema` with the mapped array.
- [ ] Task: Verify Tests Pass
    - [ ] Run the test suite and verify the tests written in Phase 1 now pass (Green phase).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)

## Phase 3: Refactoring and Quality Gates
- [ ] Task: Review code against guidelines
    - [ ] Run linter and formatter (`pnpm run lint`).
    - [ ] Check code coverage to ensure it meets requirements.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Refactoring and Quality Gates' (Protocol in workflow.md)