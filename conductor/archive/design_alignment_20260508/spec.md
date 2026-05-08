# Specification: Design System Alignment

## 1. Overview
Review the entire Spotlite website against the Rosely `DESIGN.md` guidelines and implement necessary improvements to align the UI with the design system. This includes a comprehensive review of all pages, layout components, and UI components.

## 2. Requirements
- **Color Palette Alignment:**
  - Verify and update all colors to use the Rosely palette (Greys, Pinks, Purples, Colourful).
  - Ensure background colors, text colors, and accents adhere to the low-contrast, warm atmosphere.
- **Typography Alignment:**
  - Verify primary font family is "Noto Sans" for body text.
  - Verify heading font family is "Noto Serif".
  - Verify monospace font family is "Noto Sans Mono" for code snippets.
- **Component Styling & Spacing:**
  - Ensure consistent spacing using Tailwind defaults (e.g., `p-4`, `gap-6`).
  - Verify border radii use `rounded-md` or `rounded-lg` for subtle rounding.
  - Verify borders are 1px and use `border-border` (mapped to Opal Gray).
  - Ensure soft, diffused drop shadows (`shadow-sm`, `shadow-md`).
  - Check interactive states (hover/focus) for subtle background/border shifts using accent colors.

## 3. Acceptance Criteria
- All pages and components visually align with the Rosely design system.
- Correct fonts, colors, and styling rules are applied according to `DESIGN.md`.
- Changes are verified manually in the browser.

## 4. Out of Scope
- Adding new features or components not currently present.
- Modifying underlying backend or data fetching logic unless required for styling.