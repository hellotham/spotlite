# Specification: PDF Generation from Pages

## Overview
Generate a single `cv.pdf` file from all Markdown files in the `page` collection using `md-to-pdf`. The PDF will feature a custom black-and-white stylesheet based on the project's design system.

## Functional Requirements
1.  **Markdown Concatenation:** 
    - Read all Markdown files in `src/content/page/`.
    - Merge their contents into a single Markdown string/temporary file.
    - Sort the pages by their `order` frontmatter property before merging to ensure a logical document flow.
2.  **PDF Generation:** 
    - Use the `md-to-pdf` library programmatically via a Node.js script to convert the merged Markdown into a PDF.
3.  **Output Specification:**
    -   The output file must be saved to `public/cv.pdf`.
    -   The PDF format must be strictly set to A4.
4.  **Styling:**
    -   Create a custom CSS file (e.g., `scripts/pdf-theme.css`) specifically for the PDF generation.
    -   The CSS should resemble the current project design (typography, spacing) but must be strictly black and white only (no colors, grays allowed).
5.  **Execution Hooks:**
    -   Create a new script entry in `package.json` (e.g., `"pdf": "node scripts/generate-pdf.js"`) to allow manual execution.
    -   Update the `"build"` script in `package.json` to run the PDF generation as a pre-build step (e.g., `"build": "pnpm run pdf && astro build && pnpm run search:index"`).

## Non-Functional Requirements
-   Ensure any temporary files created during the process are cleaned up.
-   The PDF generation script must handle frontmatter gracefully (e.g., stripping it out during concatenation so it doesn't render in the PDF).

## Acceptance Criteria
-   [ ] `md-to-pdf` is installed as a dev dependency.
-   [ ] A Node.js script successfully merges all `src/content/page/*.md` files.
-   [ ] A custom black-and-white CSS file is created and applied to the PDF output.
-   [ ] The generated PDF is formatted as A4 and saved to `public/cv.pdf`.
-   [ ] Running `pnpm run build` generates the PDF before the Astro build.
-   [ ] The PDF can be generated independently via `pnpm run pdf`.

## Out of Scope
-   Dynamic generation of PDFs at runtime via API endpoints.
-   Including collections other than `page` (e.g., `work`, `articles`) in the PDF.