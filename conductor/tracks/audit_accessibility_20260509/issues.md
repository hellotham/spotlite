# Accessibility Issues: Audit and improve site accessibility

## 1. Color Contrast
- [ ] **Issue**: `text-accent` (`morningGlory` - `#ec809e`) on `bg-sugarSwizzle` (`#f4eee8`) has a contrast ratio of ~2.23:1.
    - **WCAG Requirement**: 4.5:1 for normal text (AA).
    - **Affected Components**: `articlelist.astro` (headings, read more), `ctaform.astro` (headings), `pagecontent.astro` (headings, descriptions), `work.astro` (headings).
    - **Remediation**: Darken `morningGlory` or use a different accent color for text in light mode.

## 2. Navigation
- [ ] **Issue**: Current page link in `navmenu.astro` does not use `aria-current="page"`.
    - **Affected Components**: `navmenu.astro`.
    - **Remediation**: Add `aria-current={current == item.data.link ? 'page' : undefined}`.

- [ ] **Issue**: Mobile menu button missing `aria-controls`.
    - **Affected Components**: `navbar.astro`.
    - **Remediation**: Add `aria-controls="mobile-menu"`.

## 3. Search UI
- [ ] **Issue**: Search status message is not announced to screen readers.
    - **Affected Components**: `search.astro`.
    - **Remediation**: Add `aria-live="polite"` and `role="status"` to the search status element.

- [ ] **Issue**: Search results list should be identified as a live region or have appropriate labels.
    - **Affected Components**: `search.astro`.

## 4. Theme Toggle
- [ ] **Issue**: Theme toggle button and menu might need better ARIA patterns (e.g., `aria-haspopup="listbox"`).
    - **Affected Components**: `theme.astro`.

## 5. Focus States
- [ ] **Issue**: Some interactive elements might lack clear focus rings.
    - **Remediation**: Ensure `focus-ring` is applied consistently.
