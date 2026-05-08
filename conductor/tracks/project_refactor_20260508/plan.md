# Implementation Plan: Project Refactor & Tech Stack Alignment

## Phase 1: Dependency Audit and Update [checkpoint: 24733f9]
- [x] Task: Audit and Update npm packages (f594208)
    - [x] Run `pnpm outdated` to identify packages that need updating.
    - [x] Update Astro, UnoCSS, and other core dependencies to their latest compatible versions.
    - [x] Run `pnpm install` and verify project builds successfully.
- [x] Task: Remove Unused Dependencies (f594208)
    - [x] Audit `package.json` for dependencies that are no longer used in the codebase.
    - [x] Uninstall unused packages and clean up `pnpm-lock.yaml`.
- [x] Task: Conductor - User Manual Verification 'Dependency Audit and Update' (Protocol in workflow.md) (752eab7)

## Phase 2: TypeScript Strictness [checkpoint: 91c88cb]
- [x] Task: Audit and Fix Type Errors (ab7fc74)
    - [x] Run `tsc --noEmit` to identify all current TypeScript errors.
    - [x] Resolve explicit type errors across `src/components`, `src/pages`, and `src/layouts`.
    - [x] Replace `any` types with proper interfaces or generic types where applicable.
- [x] Task: Enhance Content Layer Typings (ab7fc74)
    - [x] Review `src/content.config.ts` to ensure collection schemas are strict and comprehensive.
- [x] Task: Conductor - User Manual Verification 'TypeScript Strictness' (Protocol in workflow.md) (60820ed)

## Phase 3: Code Quality and Linting [checkpoint: e511a3e]
- [x] Task: Resolve ESLint Warnings and Errors (46ce1c8)
    - [x] Run `pnpm run lint:eslint` to identify code quality issues.
    - [x] Fix unused variables, missing return types, and accessibility (`jsx-a11y`) warnings.
- [x] Task: Enforce Formatting (46ce1c8)
    - [x] Run `pnpm run lint:prettier` to ensure consistent code style across all files.
- [x] Task: Conductor - User Manual Verification 'Code Quality and Linting' (Protocol in workflow.md) (46ce1c8)

## Phase 4: UnoCSS Styling Consolidation
- [ ] Task: Audit Utility Class Usage
    - [ ] Review Astro components for redundant or unnecessarily complex UnoCSS class combinations.
    - [ ] Consolidate styling logic using the `class` attribute efficiently.
- [ ] Task: Verify Design System Adherence
    - [ ] Ensure all colors, fonts, and spacing utilities strictly reference the configured Rosely Design System tokens in `uno.config.ts`.
- [ ] Task: Conductor - User Manual Verification 'UnoCSS Styling Consolidation' (Protocol in workflow.md)

## Phase 5: Structural Cleanup
- [ ] Task: Reorganize Components
    - [ ] Audit `src/components` to identify components that should be grouped or broken down.
    - [ ] Ensure consistent naming conventions for files and component functions.
- [ ] Task: Remove Dead Code
    - [ ] Delete any orphaned components, layouts, or utility functions that are no longer referenced in the project.
- [ ] Task: Conductor - User Manual Verification 'Structural Cleanup' (Protocol in workflow.md)