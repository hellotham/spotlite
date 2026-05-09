# Specification: UI Transitions and Animations

## Overview
This track implements subtle and professional transitions and animations across the Spotlite Astro template to enhance the user experience without compromising performance or the minimalist aesthetic of the Rosely design system.

## Functional Requirements
1.  **Astro View Transitions:**
    *   Implement Astro's native `<ViewTransitions />` router to enable smooth, SPA-like navigation between pages.
2.  **Component Entrance Animations:**
    *   Key UI elements (e.g., hero sections, article lists, project cards) should have subtle entrance animations (e.g., fade-in, slight slide-up) when they load or scroll into view.
3.  **Interaction Feedback:**
    *   Enhance hover, focus, and active states for interactive elements (buttons, links, cards) with smooth CSS transitions to provide clear user feedback.
4.  **Mobile Menu Animation:**
    *   Animate the opening and closing of the mobile navigation menu (e.g., slide-in/out or fade-in/out).
5.  **Accessibility (prefers-reduced-motion):**
    *   All non-essential animations MUST respect the `prefers-reduced-motion` media query. If a user has this preference enabled, animations should be disabled or reduced to simple crossfades/instant state changes.

## Non-Functional Requirements
*   **Performance:** Animations must be hardware-accelerated where possible (using `transform` and `opacity`) to ensure 60fps performance and avoid triggering layout shifts (Core Web Vitals).
*   **Aesthetic Alignment:** The style must be "Subtle & Professional," adhering to the existing Rosely design system. Avoid overly bouncy, lengthy, or distracting animations.
*   **Tooling:** Utilize UnoCSS utility classes for defining transition properties (duration, easing, properties) where possible.

## Acceptance Criteria
- [ ] Navigating between internal pages occurs without a full browser reload, utilizing Astro View Transitions with a subtle effect.
- [ ] Main content sections animate smoothly into view upon initial load or scroll.
- [ ] Buttons and interactive cards have distinct, smooth transitions on hover and focus.
- [ ] The mobile menu opens and closes with a fluid animation.
- [ ] Emulating `prefers-reduced-motion: reduce` in DevTools successfully disables or minimizes all animations.

## Out of Scope
*   Complex, timeline-based animation sequences (e.g., GSAP or Framer Motion implementations).
*   Scroll-linked animations (where the animation progress is tied directly to the scrollbar position).