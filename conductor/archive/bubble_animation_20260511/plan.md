# Implementation Plan: D3 Bubble Chart Molecule Animation

## Phase 0: Setup [checkpoint: 78c1902]
- [x] Task: Activate `d3-viz` skill before beginning implementation.
- [x] Task: Conductor - User Manual Verification 'Phase 0: Setup' (Protocol in workflow.md)

## Phase 1: Layout Transition & TDD Setup
- [x] Task: Update `tests/d3bubblechart-component.test.ts` to expect force simulation logic instead of static `d3.pack`.
- [x] Task: Transition `@src/components/d3bubblechart.astro` layout logic to use `d3.forceSimulation` with `forceCollide` and `forceCenter` or `forceX/Y` to maintain a packed structure.
- [x] Task: Ensure initial rendering matches the previous static layout as closely as possible.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Layout Transition & TDD Setup' (Protocol in workflow.md)

## Phase 2: Continuous Animation & Performance
- [x] Task: Add tests for `IntersectionObserver` logic in `tests/d3bubblechart-component.test.ts`.
- [x] Task: Implement continuous slow, random movement by periodically injecting small random velocities into the simulation nodes or maintaining a low `alphaTarget`.
- [x] Task: Implement `IntersectionObserver` to pause the simulation when off-screen and resume when on-screen.
- [x] Task: Verify tooltips and click events function correctly on moving bubbles.
- [x] Task: Optimise bubble sizes to be as small as possible while preventing text overflow to allow freer movement.
- [x] Task: Increase container whitespace by further reducing bubble sizes and smooth out movement by slowing down drift and tuning decay.
- [x] Task: Implement infinite motion by removing velocity decay and adding bounce logic to bounding box constraints to keep bubbles drifting indefinitely.
- [x] Task: Halve the movement speed and desynchronise bubbles by introducing per-node random drift factors.
- [x] Task: Implement ultra-slow Brownian motion by using discrete, periodic random velocity changes and drastically reducing base speeds.
- [x] Task: Ensure perpetual motion by setting velocity decay to absolute zero and maintaining constant simulation energy (alpha).
- [x] Task: Break bubble synchronicity by implementing periodic independent direction changes and adding gentle repulsion to prevent coalescing.
- [x] Task: Balance layout by implementing per-bubble alternating cohesion/repulsion and add a motion-guard to nudge stationary bubbles.
- [x] Task: Implement elastic wall-bouncing and stabilize radial distribution by removing negative central forces.
- [x] Task: Remove centering forces and implement inter-bubble randomized bouncing in the tick handler.
- [x] Task: Implement reactive opposite-direction bouncing with random angular offsets to actively prevent coalescence.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Continuous Animation & Performance' (Protocol in workflow.md) [checkpoint: ee40d6f]