# Specification: Audit and improve site accessibility

## Objective
Identify and resolve accessibility issues across the Spotlite template, ensuring compliance with standard accessibility guidelines (WCAG 2.1 AA).

## Background
As a portfolio and template site, Spotlite needs to be accessible to all users and pass standard accessibility audits (like Lighthouse or Axe). Good accessibility also improves SEO.

## Scope
- Run automated accessibility audits using Lighthouse or similar tools.
- Ensure semantic HTML tags are used correctly.
- Ensure all interactive elements have proper ARIA attributes or semantic equivalents.
- Check color contrast ratios across both light and dark themes.
- Ensure keyboard navigability (focus states, tab order).

## Technical Requirements
- Utilize existing UnoCSS presets where applicable.
- Leverage ESLint `jsx-a11y` plugin for static analysis.