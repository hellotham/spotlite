# Specification: Education Collection and Layout

## Overview
Create a new "education" content collection similar to the existing "work" collection. Populate it with sample entries and display it on the home page below the Work section. Additionally, create a dedicated `/education` page to list all education history in detail.

## Functional Requirements
1. **Content Collection:**
   - Define an `education` collection in `src/content.config.ts`.
   - Schema fields: `institution` (string), `degree` (string), `datespan` (string), `image` (image function).
   - Create the directory `src/content/education/` and populate it with at least 2 sample markdown entries.
2. **Components & Layouts:**
   - Create `src/components/education.astro` (similar to `src/components/work.astro`) to display a summary list of education entries.
   - Create `src/layouts/education.astro` (similar to `src/layouts/work.astro`) to display the detailed timeline of education history.
3. **Integration:**
   - Update `src/layouts/home.astro` to import and render the `<Education />` component below the `<Work />` component.
   - Create a new page entry `src/content/page/education.md` that uses the `education` layout.
   - Create dynamic routing for individual education entries at `src/pages/education/[id].astro` (mirroring `src/pages/work/[...id].astro`).

## Out of Scope
- Major stylistic changes outside of adapting the existing "work" UI components for "education".
