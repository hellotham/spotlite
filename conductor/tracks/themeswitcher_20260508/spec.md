# Specification: Refactor Theme Switcher (Tailwind/UnoCSS Best Practices)

## Overview
The goal of this track is to refactor the site's theme switcher (`src/components/theme.astro`) to align with Tailwind/UnoCSS best practices, improve user experience, and ensure robust accessibility. The current implementation relies on full-page reloads, which will be replaced with dynamic DOM manipulation.

## Functional Requirements
- **Dynamic Theme Switching:** Clicking a theme option (Light, Dark, Auto) must dynamically apply or remove the `dark` class on the `<html>` element (`document.documentElement.classList`) without triggering `window.location.reload()`.
- **State Persistence:** The user's selection must be saved in `localStorage.theme`.
- **System Preferences (Auto):** Selecting "Auto" must remove the `localStorage` override and respect the user's OS-level `prefers-color-scheme`.
- **Active State UI:** The theme menu must accurately reflect the current active state visually and via ARIA attributes without requiring a page reload.

## Non-Functional Requirements & Best Practices
- **UnoCSS/Tailwind Utilities:** Styling must strictly use UnoCSS Wind preset utility classes (e.g., `dark:bg-zinc-800`, `dark:text-zinc-200`).
- **FOUC Prevention:** Ensure the inline `<script>` in `src/layouts/layout.astro` accurately prevents Flash of Unstyled Content (FOUC) on initial load and synchronizes seamlessly with the client-side toggle script.
- **Accessibility (a11y):** The theme menu must be keyboard navigable. Roles and ARIA attributes (e.g., `aria-selected`, `role="listbox"`, `role="option"`) must be updated dynamically as the state changes.
- **Cleanup:** Remove residual legacy code (e.g., `<style is:inline>[x-cloak]...</style>` in `layout.astro` left over from the Alpine.js removal).

## Acceptance Criteria
- [ ] Clicking Light/Dark/Auto changes the theme immediately without a page reload.
- [ ] Theme preference persists across hard refreshes and new tabs.
- [ ] "Auto" setting correctly reacts to OS-level dark/light mode toggles (using `matchMedia` listener).
- [ ] FOUC is not present when loading pages directly.
- [ ] The theme switcher button and dropdown menu are fully navigable via keyboard and announce state correctly to screen readers.
- [ ] Legacy `[x-cloak]` styles are removed from `layout.astro`.
