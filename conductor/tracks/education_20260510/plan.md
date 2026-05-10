# Implementation Plan: Education Collection and Layout

## Phase 1: Setup Content Collection
- [ ] Task: Define education collection schema in `src/content.config.ts`
- [ ] Task: Create `src/content/education` directory and add sample markdown entries
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Setup Content Collection' (Protocol in workflow.md)

## Phase 2: Create Education Component for Home Page
- [ ] Task: Write tests for `src/components/education.astro`
- [ ] Task: Implement `src/components/education.astro` (similar to work component)
- [ ] Task: Update `src/layouts/home.astro` to render `<Education />` below `<Work />`
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Create Education Component for Home Page' (Protocol in workflow.md)

## Phase 3: Create Dedicated Education Page & Layout
- [ ] Task: Write tests for education page routing and layout
- [ ] Task: Implement `src/layouts/education.astro` (similar to work layout)
- [ ] Task: Create `src/content/page/education.md` utilizing the new layout
- [ ] Task: Implement dynamic route `src/pages/education/[id].astro`
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Create Dedicated Education Page & Layout' (Protocol in workflow.md)
