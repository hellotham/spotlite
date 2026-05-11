# Specification: Refactor Work Collection Dates and Type

## Overview
Refactor the `work` content collection schema in `src/content.config.ts`. The current string-based `datespan` field will be replaced with numerical `startyear` and optional `endyear` fields. Additionally, a new `type` field (employment/consulting) will be introduced. Existing work entries and UI components will be updated to reflect these changes.

## Functional Requirements
1. **Schema Updates (`src/content.config.ts`):**
   - Remove the `datespan: z.string()` field from the `work` collection schema.
   - Add `startyear: z.number()`.
   - Add `endyear: z.number().optional()`. (An undefined `endyear` represents an ongoing/present role).
   - Add `type: z.enum(['employment', 'consulting']).default('employment')`.

2. **Data Migration:**
   - Manually update all markdown files within `src/content/work/` to replace the `datespan` frontmatter with the new `startyear` and `endyear` fields.
   - Add the `type` field where appropriate (defaulting to 'employment' if omitted).

3. **UI Component Updates:**
   - Update components rendering work items (e.g., `src/components/work.astro`, layouts, CV generator scripts) to use `startyear` and `endyear`.
   - Date display logic should handle cases where `endyear` is missing (rendering as "Present").
   - Append the capitalized `type` value in parentheses to the role title in the UI (e.g., "Software Engineer (Consulting)").

## Out of Scope
- Modifying the `education` collection's `datespan` field.
- Implementing automated data migration scripts.