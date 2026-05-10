# Implementation Plan: PDF Generation from Pages

## Phase 1: Setup and Styling
- [ ] Task: Install `md-to-pdf` and required parsing utilities.
    - [ ] Install `md-to-pdf` as a dev dependency.
    - [ ] Install `gray-matter` as a dev dependency (required for cleanly stripping frontmatter and reading the `order` property).
- [ ] Task: Create the PDF stylesheet.
    - [ ] Create `scripts/pdf-theme.css`.
    - [ ] Add baseline typography styles resembling the Rosely design system.
    - [ ] Ensure all color declarations use black, white, or grayscale values.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup and Styling' (Protocol in workflow.md)

## Phase 2: PDF Generation Script
- [ ] Task: Implement the Markdown concatenation logic.
    - [ ] Create `scripts/generate-pdf.js`.
    - [ ] Implement logic to read all `.md` files in `src/content/page/`.
    - [ ] Implement logic to parse each file with `gray-matter`, extract the `order` property, and separate the frontmatter from the body.
    - [ ] Sort the parsed files by their `order` property and concatenate their Markdown body content into a single string.
- [ ] Task: Implement the `md-to-pdf` generation.
    - [ ] Import `mdToPdf` from `md-to-pdf` in `scripts/generate-pdf.js`.
    - [ ] Call `mdToPdf` with the concatenated Markdown string, linking the custom stylesheet (`scripts/pdf-theme.css`), and setting PDF options (format: A4, dest: `public/cv.pdf`).
    - [ ] Write a test in `tests/pdf-generation.test.ts` to verify the script executes successfully and creates the output file.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: PDF Generation Script' (Protocol in workflow.md)

## Phase 3: Integration and Verification
- [ ] Task: Update `package.json` scripts.
    - [ ] Add `"pdf": "node scripts/generate-pdf.js"` to the `scripts` object.
    - [ ] Modify the `"build"` script to: `"pnpm run pdf && astro build && pnpm run search:index"`.
- [ ] Task: Run automated checks and build.
    - [ ] Run `pnpm run lint` and `pnpm test`.
    - [ ] Run `pnpm run build` to verify the entire pipeline succeeds and `public/cv.pdf` is present.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration and Verification' (Protocol in workflow.md)