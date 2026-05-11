# Implementation Plan: D3 Bubble Chart Component

## Phase 0: Setup
- [ ] Task: Activate `d3-viz` skill before beginning implementation.
- [ ] Task: Conductor - User Manual Verification 'Phase 0: Setup' (Protocol in workflow.md)

## Phase 1: Component Scaffold & TDD Setup
- [ ] Task: Create `tests/d3bubblechart-component.test.ts` with basic tests for component rendering and data attribute existence.
- [ ] Task: Create `@src/components/d3bubblechart.astro` component scaffold.
- [ ] Task: Ensure component mounts the container div with the correct `id` and `data-superpowers` attribute.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Component Scaffold & TDD Setup' (Protocol in workflow.md)

## Phase 2: D3 Visualization & Simulation
- [ ] Task: Add test in `tests/d3bubblechart-component.test.ts` to verify SVG and D3 node generation.
- [ ] Task: Implement D3 force simulation (center, charge, collide) in `d3bubblechart.astro`.
- [ ] Task: Map bubble radius to superpower `level` and fill color to the Rosely palette.
- [ ] Task: Add SVG text elements for labels inside bubbles, implementing truncation if necessary.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: D3 Visualization & Simulation' (Protocol in workflow.md)

## Phase 3: Tooltip & Interactivity
- [ ] Task: Add test to verify tooltip container structure and hidden state.
- [ ] Task: Implement hover event listeners on bubbles to adjust opacity and update/position the tooltip.
- [ ] Task: Implement window resize listener to restart simulation or adjust SVG dimensions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Tooltip & Interactivity' (Protocol in workflow.md)