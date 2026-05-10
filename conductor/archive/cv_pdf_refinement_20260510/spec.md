# Specification: CV PDF Refinement

## Overview
Refine the existing PDF generation script (`scripts/generate-pdf.js`) to improve the formatting and content of the generated `cv.pdf`.

## Functional Requirements
1.  **Content Inclusion:**
    -   Include the content of `src/pages/index.md` (home page) at the very beginning of the concatenated Markdown string.
    -   Extract and render the `title` and `description` from the frontmatter of `src/pages/index.md` as the heading for the home section, consistent with other pages.
2.  **Document Flow:**
    -   Remove the forced page breaks (`<div class="page-break"></div>`) between concatenated Markdown files to allow text to flow continuously.
3.  **PDF Margins & Formatting:**
    -   Apply 3cm (30mm) margins around the page content using Puppeteer's built-in PDF options (`pdf_options.margin`).
    -   Update `scripts/pdf-theme.css` to remove any conflicting `.markdown-body` padding (e.g., `padding: 20mm;`).
4.  **Headers and Footers:**
    -   **Header:** Read the `name` property from `src/config.json` and display it centered at the top of every page.
    -   **Footer:** Display the current page number centered at the bottom of every page.
    -   Enable `displayHeaderFooter: true` in the `pdf_options`.

## Non-Functional Requirements
-   Ensure the styling remains strictly black and white.

## Acceptance Criteria
-   [ ] `src/pages/index.md` is the first content in the generated PDF.
-   [ ] There are no blank gaps caused by forced page breaks between sections.
-   [ ] The PDF has consistent 3cm margins on all sides.
-   [ ] Every page displays the author's name in the header.
-   [ ] Every page displays the page number in the footer.
-   [ ] `node scripts/generate-pdf.js` executes without errors and produces the updated `public/cv.pdf`.

## Out of Scope
-   Adding new content to the Markdown files.
-   Adding color to the PDF.