# Implementation Plan: d3superpowers.astro Component

## Objective
Create a new Astro component `d3superpowers.astro` that renders a responsive horizontal bar graph using D3.js, displaying superpowers (Title) against their Level (1-6). The bars will be color-coded by Level and sorted alphabetically by Title.

## Key Files & Context
- `src/components/d3superpowers.astro` (New File)
- `src/components/d3cp.astro` (Reference for D3 integration and responsiveness)

## Implementation Steps
1. **Create `src/components/d3superpowers.astro`:**
   - Define a container `div` with a unique ID (e.g., `d3-superpowers-container`).
   - Add a `<script>` tag that imports `* as d3 from 'd3'`.

2. **Define Data:**
   - Hardcode the provided dataset containing Title, Description, Short code, Level, and Comment.
   - Sort the data array alphabetically by the `Title` field.

3. **Render Logic (`renderChart` function):**
   - Calculate responsive dimensions (`width`, `height`) based on the container size and window viewport, similar to `d3cp.astro`.
   - Clear previous contents of the container to support resize events.
   - Define margins and effective width/height for the chart area.
   - **Scales:**
     - X-Axis: `d3.scaleLinear()` with a domain of `[0, 6]`.
     - Y-Axis: `d3.scaleBand()` mapped to the sorted `Title`s.
     - Color: `d3.scaleOrdinal()` mapping levels `1` to `6` to distinct colors (e.g., using `d3.schemeCategory10`).
   - **Draw Chart:**
     - Create the `svg` element.
     - Append horizontal `rect`s bound to the data. Apply x, y, width, height, and fill color based on the data and scales.
     - Append the X and Y axes using `d3.axisBottom()` and `d3.axisLeft()`.
   - **Responsiveness:**
     - Attach the `renderChart` function to the `window`'s `resize` event.

## Verification & Testing
- Include the component on a page to verify rendering.
- Resize the browser window to confirm the chart redraws and fits the container properly.
- Verify that the titles are alphabetically sorted and levels match the provided data.
- Ensure 6 distinct colors are applied based on the Level value.
