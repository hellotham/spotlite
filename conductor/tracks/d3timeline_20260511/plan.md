# Implementation Plan: D3 Timeline Component

## Phase 1: Data Preparation & Basic Component Structure [checkpoint: 8c692f0]
- [x] Task: Write failing unit test for extracting and merging `education` and `work` collections, sorting by `startYear`. b483762
- [x] Task: Implement data extraction and sorting logic within `src/components/d3timeline.astro`. 97a2bac
- [x] Task: Write failing test to verify the basic DOM structure of the component (e.g., container `div` and `<svg>` element). 0ca2e07
- [x] Task: Implement basic DOM structure in `src/components/d3timeline.astro`. 0ca2e07
- [x] Task: Conductor - User Manual Verification 'Phase 1: Data Preparation & Basic Component Structure' (Protocol in workflow.md) 8c692f0

## Phase 2: D3 Timeline Core Visualization [checkpoint: 1d815b2]
- [x] Task: Write failing tests for D3 scale generation (x-axis for decades, y-axis for tracks). e889863
- [x] Task: Implement D3 scales and axes within a client-side script in the Astro component. e889863
- [x] Task: Write failing test to verify D3 renders `<rect>` elements for each timeline entry with correct relative width and position. 64e6838
- [x] Task: Implement D3 logic to render the bars based on `startYear` and `endYear` (or current year for ongoing). 64e6838
- [x] Task: Conductor - User Manual Verification 'Phase 2: D3 Timeline Core Visualization' (Protocol in workflow.md) 1d815b2

## Phase 3: Styling, Colors, and Ongoing Indicators
- [x] Task: Write failing tests checking for appropriate CSS classes or fill attributes based on entry type (education, employment, consulting). d960c7c
- [x] Task: Implement D3 color coding logic based on entry type. d960c7c
- [x] Task: Write failing test to verify the presence of a visual indicator (e.g., specific class or SVG gradient) on entries without an `endYear`. f3fdbbe
- [x] Task: Implement visual indicator logic for ongoing roles. f3fdbbe
- [~] Task: Conductor - User Manual Verification 'Phase 3: Styling, Colors, and Ongoing Indicators' (Protocol in workflow.md)

## Phase 4: Interactivity (Tooltips & Navigation)
- [ ] Task: Write failing test for tooltip interaction (hover triggers tooltip display with correct data).
- [ ] Task: Implement D3 event listeners for mouseover/mouseout to handle tooltip rendering.
- [ ] Task: Write failing test to verify clicking a bar navigates to the correct URL (e.g., `/work/slug` or `/education/slug`).
- [ ] Task: Implement click event listeners on bars for navigation.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Interactivity (Tooltips & Navigation)' (Protocol in workflow.md)

## Phase 5: Responsive Design (Adaptive Layout)
- [ ] Task: Write failing test (or configure visual regression/viewport test) to verify layout switches from horizontal to vertical on smaller viewports.
- [ ] Task: Implement adaptive layout logic (using CSS media queries or Javascript ResizeObserver/window.matchMedia within D3).
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Responsive Design (Adaptive Layout)' (Protocol in workflow.md)