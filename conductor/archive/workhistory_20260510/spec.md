# Specification: Work History Feature

## Overview
This track implements a dedicated Work history page and updates the existing `work.astro` component. The goal is to provide a comprehensive view of the user's professional experience, accessible via a new main navigation item, and to make the work history items interactively link to detailed individual work pages.

## Functional Requirements
1.  **`work.astro` Component Update:**
    -   Refactor the list items in `src/components/work.astro` to be clickable.
    -   Redesign the items as interactive cards/buttons rather than a plain list.
    -   Each card must link to a dedicated page for that specific work role.
2.  **Work History Page:**
    -   Create a new page (e.g., `/work`) that lists all entries from the `work` content collection.
    -   The list on this page must display the following information for each entry: Job Title, Company Name, Dates, and a Summary.
3.  **Navigation Update:**
    -   Add a new "Work" item to the main navigation menu (likely updating `src/menu.json`).
    -   Position the new item immediately after the "Articles" link.
4.  **Individual Work Pages:**
    -   Ensure dynamic routing is set up to render individual pages for each item in the `work` collection (similar to how article pages are handled).

## Non-Functional Requirements
-   **Styling:** Utilize the existing UnoCSS setup (presetWind4, custom shortcuts like `card-interactive` or `hover-accent`) to style the new cards and page, ensuring consistency with the Rosely design system and dark mode support.
-   **Accessibility:** Ensure the clickable cards are keyboard accessible and have proper focus states (`focus-ring`).

## Acceptance Criteria
-   [ ] The main navigation includes a "Work" link placed after "Articles".
-   [ ] Clicking "Work" in the navigation opens a new page listing all work history.
-   [ ] The Work history list displays Job Title, Company, Dates, and Summary for each role.
-   [ ] Items in the `src/components/work.astro` component are styled as interactive cards.
-   [ ] Clicking a work card (either in the component or on the list page) navigates to a detailed page for that specific role.

## Out of Scope
-   Adding new content to the `work` collection.
-   Modifying the structure of the existing `work` collection schemas.