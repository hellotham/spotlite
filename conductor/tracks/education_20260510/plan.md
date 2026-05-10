# Implementation Plan: Education Collection and Layout

## Phase 1: Setup Content Collection [checkpoint: 0869963]
- [x] Task: Define education collection schema in `src/content.config.ts` c8795e6
- [x] Task: Create `src/content/education` directory and add sample markdown entries ca67f5a
- [x] Task: Conductor - User Manual Verification 'Phase 1: Setup Content Collection' (Protocol in workflow.md) 0869963

## Phase 2: Create Education Component for Home Page [checkpoint: 14686aa]
- [x] Task: Write tests for `src/components/education.astro` 6bf7f47
- [x] Task: Implement `src/components/education.astro` (similar to work component) 6bf7f47
- [x] Task: Update `src/layouts/home.astro` to render `<Education />` below `<Work />` 3348a85
- [x] Task: Conductor - User Manual Verification 'Phase 2: Create Education Component for Home Page' (Protocol in workflow.md) 14686aa

## Phase 3: Create Dedicated Education Page & Layout [checkpoint: 9939763]
- [x] Task: Write tests for education page routing and layout 0396859
- [x] Task: Implement `src/layouts/education.astro` (similar to work layout) 0396859
- [x] Task: Create `src/content/page/education.md` utilizing the new layout 0396859
- [x] Task: Implement dynamic route `src/pages/education/[id].astro` 0396859
- [x] Task: Conductor - User Manual Verification 'Phase 3: Create Dedicated Education Page & Layout' (Protocol in workflow.md) 9939763
