# Specification: Page Collection Migration

## Overview
Migrate static pages and specific list pages (`articles.astro`, `projects.astro`) into a new Astro content collection named `page`. This standardizes page routing and content management across the site.

## Functional Requirements
- **Content Collection**: Define a new `page` collection in `src/content.config.ts`.
- **Zod Schema**: The `page` collection schema must include:
  - `title`: String (required)
  - `description`: String (optional)
  - `draft`: Boolean (optional, defaults to false)
  - `layout`: String (required, to specify the Astro layout component to use)
  - `image`: String (optional, for SEO/social sharing)
- **Dynamic Routing**: Create a `src/pages/[...slug].astro` to dynamically render entries from the `page` collection. It will resolve and render the layout specified in the frontmatter.
- **Migration of Static Pages**: Move existing markdown files in `src/pages/` (e.g., `about.md`, `uses.md`, `creations.md`) to `src/content/page/` and update their frontmatter to match the new schema.
- **Migration of List Pages**:
  - Convert `src/pages/articles.astro` and `src/pages/projects.astro` to Markdown files in `src/content/page/`.
  - Extract heading/description text into the Markdown file.
  - The logic for fetching and rendering lists (articles, projects) will be moved into specific layout files (e.g., `ArticlesLayout.astro`, `ProjectsLayout.astro`). These layouts will be referenced in the markdown frontmatter.

## Acceptance Criteria
- All migrated pages render correctly at their original URLs (e.g., `/about`, `/uses`).
- The `/articles` and `/projects` routes continue to render their respective lists correctly, driven by the layout files.
- `src/pages/` is cleaned up and primarily contains the catch-all `[...slug].astro` for pages, `index.astro`, and endpoints.

## Out of Scope
- Redesigning the visual appearance of the pages.
- Modifying the existing `article`, `project`, or `work` content collections.