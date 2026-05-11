# Implementation Plan: D3 Bubble Chart Molecule Animation

## Phase 0: Setup
- [ ] Task: Activate `d3-viz` skill before beginning implementation.
- [ ] Task: Conductor - User Manual Verification 'Phase 0: Setup' (Protocol in workflow.md)

## Phase 1: Layout Transition & TDD Setup
- [ ] Task: Update `tests/d3bubblechart-component.test.ts` to expect force simulation logic instead of static `d3.pack`.
- [ ] Task: Transition `@src/components/d3bubblechart.astro` layout logic to use `d3.forceSimulation` with `forceCollide` and `forceCenter` or `forceX/Y` to maintain a packed structure.
- [ ] Task: Ensure initial rendering matches the previous static layout as closely as possible.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Layout Transition & TDD Setup' (Protocol in workflow.md)

## Phase 2: Continuous Animation & Performance
- [ ] Task: Add tests for `IntersectionObserver` logic in `tests/d3bubblechart-component.test.ts`.
- [ ] Task: Implement continuous slow, random movement by periodically injecting small random velocities into the simulation nodes or maintaining a low `alphaTarget`.
- [ ] Task: Implement `IntersectionObserver` to pause the simulation when off-screen and resume when on-screen.
- [ ] Task: Verify tooltips and click events function correctly on moving bubbles.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Continuous Animation & Performance' (Protocol in workflow.md)