# Specification: Refactor Creations and Passions to Collections

## Overview
Refactor the static `list` data currently embedded in the frontmatter of `src/content/page/creations.md` and `src/content/page/passions.md` into dedicated Astro collections named `creation` and `passion`.

## Functional Requirements
1.  **Define New Collections:**
    *   Create a `creation` collection schema in `src/content.config.ts`.
        *   Fields: `section` (string), `item` (string), `parent` (string, optional), `description` (string), `action` (string, optional), `link` (string, optional).
    *   Create a `passion` collection schema in `src/content.config.ts`.
        *   Fields: `section` (string), `item` (string), `description` (string).
2.  **Migrate Data:**
    *   Extract the list items from `creations.md` and `passions.md`.
    *   Create individual Markdown files for each item in `src/content/creation/` and `src/content/passion/`.
    *   Map the existing fields to the frontmatter of the new Markdown files.
    *   Remove the `list` array from the frontmatter of `src/content/page/creations.md` and `src/content/page/passions.md`.
3.  **Refactor Layouts:**
    *   Update `src/layouts/creations.astro` to use `getCollection('creation')` instead of `frontmatter.list`.
    *   Update `src/layouts/passions.astro` to use `getCollection('passion')` instead of `frontmatter.list`.
    *   Group the fetched collection entries by their `section` field to maintain the existing grouped UI structure.
    *   Ensure the existing visual styling and HTML structure remain intact.

## Out of Scope
*   Redesigning the visual appearance of the creations or passions pages.
*   Adding new items to the collections beyond what is currently in the markdown files.

## Acceptance Criteria
*   The `creations.md` and `passions.md` files no longer contain the `list` frontmatter.
*   The `creation` and `passion` collections are correctly defined and populated.
*   The `/creations` and `/passions` pages render identically to their previous state, fetching data from the new collections.
*   TypeScript types for the new collections are properly inferred and used in the layout files.