# Implementation Plan: CV PDF Refinement

## Phase 1: Configuration and Styling Updates [checkpoint: c560f76]
- [x] Task: Remove padding from PDF stylesheet. (7384c98)
    - [ ] Modify `scripts/pdf-theme.css` to remove the `padding: 20mm;` from `.markdown-body` to avoid conflicting with Puppeteer margins.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Configuration and Styling Updates' (Protocol in workflow.md)

## Phase 2: PDF Generation Script Updates
- [x] Task: Update Markdown concatenation logic. (4d96dfe)
    - [ ] Modify `scripts/generate-pdf.js` to read and parse `src/pages/index.md` (extracting its title, description, and body).
    - [ ] Insert the parsed home page at the beginning of the `pages` array.
    - [ ] Modify the concatenation map loop to remove the `<div class="page-break"></div>`.
- [x] Task: Configure headers, footers, and margins. (4d96dfe)
    - [ ] Modify `scripts/generate-pdf.js` to read `src/config.json` and extract the `name` property.
    - [ ] Update `pdf_options` in the `mdToPdf` call to include:
        - `margin: '3cm'`
        - `displayHeaderFooter: true`
        - `headerTemplate`: An HTML string displaying the extracted name centered.
        - `footerTemplate`: An HTML string displaying the page number centered.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: PDF Generation Script Updates' (Protocol in workflow.md)

## Phase 3: Final Verification
- [ ] Task: Run automated checks.
    - [ ] Run `pnpm run lint` and `pnpm test` to ensure no existing tests are broken.
    - [ ] Generate the PDF manually using `pnpm run pdf` to verify execution.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)