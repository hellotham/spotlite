# Specification: D3 Bubble Chart Molecule Animation

## Overview
Enhance the existing `@src/components/d3bubblechart.astro` component by adding a continuous, slow, random animation to the bubbles, simulating molecular movement.

## Functional Requirements
- **Animation Style**: Bubbles should drift slowly and randomly, occasionally bumping into each other (Drifting & Bumping).
- **Layout Approach**: Transition the layout strategy to use a gentle D3 force simulation that maintains the packed structure while allowing for continuous movement. The simulation must include strong collision detection to minimize overlap.
- **Performance Optimization**: The animation should pause when the bubble chart is not visible in the viewport (using `IntersectionObserver`) to conserve CPU resources.
- **Interactivity Constraints**: Existing hover and click interactions (tooltips, modal) must continue to function correctly while the bubbles are moving.

## Non-Functional Requirements
- Must use `d3` for the force simulation and animation ticks.
- Must ensure smooth transitions without jerky movements.

## Out of Scope
- Changing the data source or bubble styling (colors, sizes, labels).