# Specification: D3 Bubble Chart Component

## Overview
Create a new Astro component, `@src/components/d3bubblechart.astro`, that visualizes the `superpowers.json` data as an interactive, colored bubble chart. This serves as an alternative visualization to the existing horizontal bar chart (`d3superpowers.astro`).

## Functional Requirements
- **Data Source**: Parse and use the `data-superpowers` JSON attribute, which sources from `src/superpowers.json`.
- **Visualization Type**: Force-directed packed bubble chart.
- **Sizing**: The radius of each bubble must be proportional to the superpower's `level` (1-6).
- **Color Coding**: Maintain the existing Rosely color palette scale used in `d3superpowers.astro`, mapping levels 1-6 to specific colors.
- **Labels**: Display the superpower's `title` inside the bubble. Text should be centered and sized/truncated appropriately.
- **Tooltip**: Implement a custom HTML tooltip that appears on hover, mirroring the design and content of the existing `d3superpowers.astro` tooltip (showing title, description, level, and optional comment).
- **Interactivity**: Bubbles should slightly change opacity on hover.
- **Responsiveness**: The chart must adapt to container width changes.

## Non-Functional Requirements
- Must use `d3` for rendering and simulation.
- Must be an Astro component with an isolated `<script>` tag.
- Client-side script must handle `astro:page-load` for view transitions compatibility.

## Out of Scope
- Modifying the underlying `superpowers.json` data structure.
- Replacing the existing `d3superpowers.astro` component entirely.