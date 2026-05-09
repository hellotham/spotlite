# Specification

## Overview
Update the logic of specific layout pages in `src/layouts/` to display the frontmatter `description` and the main `markdown` content correctly. The description will be styled prominently, and the markdown content will use typography prose styles.

## Scope
- **Layouts to Update:** `src/layouts/about.astro`, `src/layouts/articles.astro`, `src/layouts/creations.astro`, `src/layouts/projects.astro`
- **Description:** Display the `description` from the frontmatter above the markdown content.
  - **Styling:** Use UnoCSS utility classes to make it italic, a larger font size (e.g., `text-xl`), and an accent color from the Rosely design system.
- **Markdown Content:** Wrap the `<slot />` within an `<article class="prose">` element.

## Acceptance Criteria
- [ ] `about.astro` displays the description (styled) and the markdown content (wrapped in `<article class="prose">`).
- [ ] `articles.astro` displays the description (styled) and the markdown content (wrapped in `<article class="prose">`).
- [ ] `creations.astro` displays the description (styled) and the markdown content (wrapped in `<article class="prose">`).
- [ ] `projects.astro` displays the description (styled) and the markdown content (wrapped in `<article class="prose">`).
- [ ] The description is rendered in italics, larger font, and an accent color.

## Out of Scope
- Updating other layout files not explicitly listed (e.g., `layout.astro`, `uses.astro`).
- Modifying the underlying `prose` typography preset configuration in UnoCSS.