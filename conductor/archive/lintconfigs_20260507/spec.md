# Specification - Review and Optimize ESLint/Prettier Configs

## Overview
The goal of this track is to review and optimize the existing ESLint and Prettier configurations for the Spotlite Astro template. We will enforce standard best practices for code quality and formatting without being overly restrictive.

## Functional Requirements
- **Linter & Formatter Separation:** ESLint and Prettier must operate separately. Formatting issues should not surface as ESLint errors. `eslint-config-prettier` should be used to disable conflicting rules.
- **Strictness Level:** Standard (Recommended). Apply recommended rulesets for TypeScript and JavaScript without overly strict typing requirements.
- **Plugins & Environments:**
  - Fully integrate and configure `eslint-plugin-astro` for `.astro` components.
  - Ensure UnoCSS linting is properly configured using `@unocss/eslint-config` or `@unocss/eslint-plugin`.
  - Enforce accessibility best practices using `eslint-plugin-jsx-a11y`.

## Out of Scope
- Major code refactoring beyond fixing newly introduced linting/formatting errors.
- Introducing highly restrictive custom lint rules outside of standard recommended configurations.

## Acceptance Criteria
- [ ] `eslint.config.mjs` is updated to separate Prettier and ESLint.
- [ ] `eslint-plugin-astro`, `@unocss/eslint-config`, and `eslint-plugin-jsx-a11y` are correctly configured and applied.
- [ ] Running `pnpm run lint:eslint` reports no errors (or errors are fixed).
- [ ] Running `pnpm run lint:prettier` correctly formats code.
- [ ] Any resulting lint/formatting issues in the codebase are resolved.