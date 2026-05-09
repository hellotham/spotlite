# Specification: Refactor Social Links in Person Schema

## Overview
This track refactors the JSON-LD `personSchema` located in `src/layouts/layout.astro` to dynamically generate the `sameAs` array of social links from the Astro `social` content collection instead of hardcoding them.

## Functional Requirements
- **Data Source:** Fetch social links data using Astro's `getCollection('social')`.
- **Mapping:** Extract the `link` property from each item in the `social` collection to construct the `sameAs` array for `personSchema`.
- **Implementation:** Replace the hardcoded array in `src/layouts/layout.astro` with the dynamically generated array.
- **Sorting:** Sorting by the `order` property is not required for JSON-LD structured data.

## Non-Functional Requirements
- Maintain valid JSON-LD output.
- Ensure type safety using Astro's content collection types.

## Acceptance Criteria
- [ ] `src/layouts/layout.astro` no longer contains hardcoded social URLs in `personSchema.sameAs`.
- [ ] The `sameAs` array in `personSchema` correctly reflects the links defined in `src/social.json` (via the `social` collection).
- [ ] The generated HTML includes the correct JSON-LD `script` tag for the person schema.

## Out of Scope
- Refactoring other hardcoded fields in `personSchema` (like name, jobTitle, worksFor).
- Changes to the UI presentation of social links.