# Implementation Plan: D3 Bubble Chart Component

## Phase 0: Setup [checkpoint: 1b8af85]
- [x] Task: Activate `d3-viz` skill before beginning implementation.
- [x] Task: Conductor - User Manual Verification 'Phase 0: Setup' (Protocol in workflow.md)

## Phase 1: Component Scaffold & TDD Setup
- [x] Task: Create `tests/d3bubblechart-component.test.ts` with basic tests for component rendering and data attribute existence.
- [x] Task: Create `@src/components/d3bubblechart.astro` component scaffold.
- [x] Task: Ensure component mounts the container div with the correct `id` and `data-superpowers` attribute.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Component Scaffold & TDD Setup' (Protocol in workflow.md)

## Phase 2: D3 Visualization & Simulation
- [x] Task: Add test in `tests/d3bubblechart-component.test.ts` to verify SVG and D3 node generation.
- [x] Task: Implement D3 force simulation with bounding box constraints to ensure bubbles stay within container.
- [x] Task: Map bubble radius to superpower `level` and fill color to the Rosely palette.
- [x] Task: Implement a word wrapping utility for SVG text labels inside bubbles.
- [x] Task: Reduce bubble overlap by increasing collision force and iterations.
- [x] Task: Fix inconsistent line heights in word wrap utility and apply bold/larger font styling.
- [x] Task: Implement central pull using `forceX` and `forceY` and further tune collision for minimal overlap.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: D3 Visualization & Simulation' (Protocol in workflow.md)

## Phase 3: Tooltip & Interactivity
- [ ] Task: Add test to verify tooltip container structure and hidden state.
- [ ] Task: Implement hover event listeners on bubbles to adjust opacity and update/position the tooltip.
- [ ] Task: Implement window resize listener to restart simulation or adjust SVG dimensions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Tooltip & Interactivity' (Protocol in workflow.md)