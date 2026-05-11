# Specification: D3 Timeline Component

## Overview
Create a new Astro component (`src/components/d3timeline.astro`) that visualizes entries from the `education` and `work` collections as a timeline using D3.js. The timeline will plot these entries as bars across a scale of decades.

## Functional Requirements
- **Data Source:** Fetch and combine entries from both the `education` and `work` Astro content collections.
- **Sorting:** Sort all timeline entries chronologically by their ascending start year.
- **Visual Mapping:**
    - Plot entries as bars spanning from their start year to end year.
    - Scale the timeline by decades.
- **Color Coding:** Apply distinct colors based on the entry type:
    - Education
    - Employment
    - Consulting
- **Ongoing Entries:** Roles or education currently ongoing (without an end date) will extend to the current year and feature a visual indicator (e.g., a gradient fade) to signify they are present.
- **Interactivity:**
    - Display tooltips on hover detailing the role, organization, and exact years.
    - Make bars clickable to navigate to the detailed view of the specific work or education entry.
- **Responsiveness:** Implement an adaptive layout that renders horizontally on desktop screens and switches to a vertical layout on mobile devices for optimal readability.

## Non-Functional Requirements
- **Technology:** Must utilize D3.js for the visualization logic and integrate within the Astro framework.
- **Accessibility:** Ensure tooltips and interactive elements are accessible (e.g., keyboard navigable).
- **Performance:** Optimize D3 rendering for performance, following best practices for Astro component integration.

## Acceptance Criteria
- [ ] The `d3timeline.astro` component successfully loads and merges `education` and `work` collections.
- [ ] Timeline scale accurately represents decades.
- [ ] Bars are correctly positioned based on start and end years.
- [ ] Entries are color-coded correctly according to their type.
- [ ] Ongoing entries show a visual indicator extending to the present year.
- [ ] Hovering over a bar displays a tooltip with accurate details.
- [ ] Clicking a bar navigates the user to the correct detail page.
- [ ] The timeline automatically switches between horizontal and vertical orientations based on screen size.