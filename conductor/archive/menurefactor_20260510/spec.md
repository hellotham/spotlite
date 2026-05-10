# Specification: Menu Collection Refactoring

## Overview
This track refactors the navigation menu system by removing the dedicated `menu` JSON collection and inferring the navigation structure directly from the `page` content collection.

## Functional Requirements
1.  **Collection Schema Update:**
    -   Update the `page` collection schema in `src/content.config.ts` to include an `order` property (number).
    -   Remove the `menu` collection definition from `src/content.config.ts`.
2.  **Content Migration:**
    -   Write a one-off automated script to read `src/menu.json`, match entries by ID to files in `src/content/page/`, and inject the `order` property into their Markdown frontmatter.
    -   Delete the `src/menu.json` file.
3.  **Component Refactoring (`src/components/navmenu.astro` & related):**
    -   Alter `src/components/navmenu.astro` (and any other component using the menu collection, like `footer.astro`) to query the `page` collection instead of the `menu` collection.
    -   Sort the retrieved pages by their new `order` property.
    -   Derive the link URL dynamically using the page's ID (e.g., `/${page.id}`).
    -   Ensure all pages in the `page` collection are included in the menu.

## Non-Functional Requirements
-   **Data Integrity:** The final rendering of the navigation menu must be identical to the previous implementation.
-   **Cleanup:** Any unused types or imports related to the old menu collection must be removed.

## Acceptance Criteria
-   [ ] `src/menu.json` is deleted.
-   [ ] `menu` collection is removed from `src/content.config.ts`.
-   [ ] All markdown files in `src/content/page/` have an `order` property in their frontmatter.
-   [ ] `navmenu.astro` and `footer.astro` successfully render navigation links using the `page` collection.
-   [ ] Navigation links are correctly routed using the `/${page.id}` format.

## Out of Scope
-   Changes to the visual design or CSS of the navigation menu.
-   Adding or removing links from the navigation structure (only migrating existing ones).