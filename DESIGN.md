# Design System: Rosely

## 1. Visual Theme & Atmosphere

Rosely is a warm, serene, and contemporary design system rooted in the "Millennial Pink" aesthetic. It prioritizes a **low-contrast, eye-comfortable ambiance** that induces calmness and serenity. The system is designed to be mindful and reassuring, avoiding high-contrast fatigue while maintaining enough vibrancy to be playful and optimistic. It emphasizes clarity, simplicity, and elegance, creating a "serene beauty" that works well across both digital interfaces and physical design applications.

## 2. Color Palette & Roles

The Rosely palette consists of sixteen core colors divided into four functional sub-palettes, plus an extended ANSI terminal set.

### Greys (Neutrality & Foundation)

Used for backgrounds, text, and structural elements where neutral grounding is needed.

- **Black Beauty (#27272a):** Primary dark background or deep text color.
- **Granite Gray (#615f5f):** Secondary neutral for borders or muted text.
- **Opal Gray (#a49e9e):** Soft neutral for secondary UI elements or placeholder text.
- **Sugar Swizzle (#f4eee8):** Crisp, off-white for light backgrounds or high-contrast dark-mode text.

### Pinks (Gentle Romance & Warmth)

The soul of the system, tempering passion with purity.

- **Morning Glory (#ec809e):** Vibrant highlight or action colour. It is the dark-mode half of `text-accent`; light mode uses the darker **Morning Glory Dark (#c02d5a)**, because #ec809e only reaches 2.2:1 on the cream background.
- **Rose Quartz (#f7caca):** The base color of Rosely; warm, gentle rose tone conveying composure.
- **Barely Pink (#F8D7DD):** Soft background tint or secondary highlight.
- **Heavenly Pink (#f4dede):** Ultra-soft background or subtle text accent.

### Purples (Depth & Harmony)

Used for accents, borders, and alternate backgrounds to complement the pinks.

- **Grapeade (#85677b):** Dark accent for borders or strong typographic emphasis.
- **Radiant Orchid (#b565a7):** Base accent color; a captivating harmony of fuchsia and pink.
- **Lupine (#be9cc1):** Soft purple for secondary buttons or active states.
- **Lavender Fog (#D2C4D6):** Muted lilac for background variations.

### Colourful (Positivity & Precision)

High-positivity colors used for functional highlighting (Success, Error, Info, Warning).

- **Raspberry Sorbet (#d2386c):** Delectable red-pink for errors or critical alerts.
- **Spearmint (#64bfa4):** Cool green for success states or fresh highlights.
- **Aquarius (#3CADD4):** Periwinkle blue for links, information, or primary actions.
- **Meadowlark (#eada4f):** Vibrant sunny yellow for warnings or cheerful accents.

## 3. Typography Rules

- **Primary Font Family:** "Noto Sans", sans-serif. Chosen for its clean, modern, and highly readable character.
- **Serif Font Family:** "Noto Serif", serif. Used for headings and emphasis. Headings should be styled with the **`text-accent`** token (Morning Glory) to provide a vibrant yet serene hierarchy.
- **Monospace Font Family:** "Noto Sans Mono", monospace. Used for technical data, code snippets, and terminal interfaces.

## 4. Component Styling & Spacing

Rosely embraces a clean, modern aesthetic utilizing **UnoCSS** (Wind4 preset) for structure and spacing, integrated with our color palette.

- **Spacing System:** Follows the standard utility-first spacing scale (e.g., `p-4` for 1rem/16px, `gap-6` for 1.5rem/24px) to maintain a consistent and predictable rhythm.
- **Border Radius:** Components typically feature subtle rounding using `rounded-md` (0.375rem) or `rounded-lg` (0.5rem) to reflect the gentle nature of the Rosely theme, avoiding harsh, sharp corners.
- **Borders:** Use thin, 1px borders colored with `border-border` (mapped to Opal Gray or similar neutral) for subtle separation.
- **Shadows & Elevation:** Drop shadows should be soft and diffused (`shadow-sm` or `shadow-md`), enhancing the low-contrast ambiance without creating overwhelming visual hierarchy.
- **Interactive States:** Hover and focus states should slightly shift the background or border color (e.g., using `text-accent` or Lupine accents) while maintaining the eye-comfortable constraint.
- **Focus Indicators:** Use the `ui-focus-ring` shortcut for all interactive elements to ensure a highly visible, accessible focus state for keyboard users.
- **Component Architecture:** Build accessible and composable UI blocks styled with UnoCSS utility classes that reference Rosely's custom color variables.

### UnoCSS Shortcuts (Component Library)

For consistency and maintainability, we provide semantic shortcuts that encapsulate common patterns:

#### Text Colors (Built-in Dark Mode)

- `text-primary` – Main content text (auto-adapts: blackBeauty → sugarSwizzle)
- `text-secondary` – Muted/disabled text (graniteGray → opalGray)
- `text-accent` – Highlighted/action text (morningGloryDark → morningGlory)
- `text-muted` – Placeholder/disabled state

#### Surfaces & Containers

- `surface` – Background fill (sugarSwizzle → blackBeauty in dark mode)
- `surface-subtle` – Semi-transparent backgrounds
- `glass` – Frosted glass effect (backdrop-blur + semi-transparent)
- `glass-hover` – Glass with interactive hover state
- `border-primary` – Border color with dark mode support

#### Cards & Panels

- `card` – Base card styling with border and shadow
- `card-hover` – Interactive card with lift effect on hover
- `card-interactive` – Clickable card with cursor pointer

#### Buttons (Composable)

- `btn-base` – Foundation button styles
- `btn-primary` – Primary action (dark: grapeade)
- `btn-secondary` – Secondary action
- `btn-ghost` – Text-only button variant
- `btn-sm` – Compact button size

#### Forms

- `input-base` – Input field with focus ring and dark mode

#### Interactive Elements

- `ui-hover-accent` – Color shift on hover for links/text
- `ui-focus-ring` – Accessible focus indicator

> **The `ui-` prefix is load-bearing.** UnoCSS resolves `<variant>-<utility>` before it consults the shortcut table, so the obvious names silently lost: `focus-ring` parsed as the `focus:` variant applied to `ring` and emitted a 1px `currentColor` ring instead of the intended indicator, while `hover-accent` parsed as `hover:` plus a non-utility and emitted no CSS whatsoever. Neither produced a build error. Do not rename these back, and do not add new shortcuts whose first segment is a variant name.

**Usage Examples:**

```astro
<!-- Primary button -->
<button class='btn-primary'>Save</button>

<!-- Glass panel -->
<div class='p-6 rounded-lg glass'>Frosted content</div>

<!-- Interactive card -->
<div class='card-hover cursor-pointer'>Click me</div>

<!-- Text with automatic dark mode -->
<p class='text-secondary'>Muted content</p>
<h1 class='text-accent'>Highlighted heading</h1>

<!-- Form input -->
<input class='input-base' type='email' />
```

These shortcuts eliminate repetitive dark mode variants and ensure design consistency across all components.

## 5. Recurring Patterns

Beyond the shortcut library, a few composite patterns recur across the site and should be reused rather than reinvented.

### Entity marks (`entitylogo.astro`)

One component renders every company and institution logo, across six surfaces, so the work and education collections present identically.

- **`circular`** — the square mark in a round tile, for list pages (96px) and the home page's compact rows (40px).
- **`wide`** — a letterbox tile for wordmarks, used by the home page education card.
- **`bare`** — the extended wordmark alone, no tile, for detail page headers.

The tile takes the mark's own background colour (`logoBackground`), so a logo with a solid background reads as one seamless circle rather than a square floating on a contrasting disc. White is the default: it suits white-backed and transparent marks alike, and keeps dark artwork legible in dark mode. Where an entity has no mark at all, the tiled variants draw an initials monogram — which reads as deliberate, where a grey placeholder image read as broken. The `bare` variant renders nothing, since the detail page heading already names the entity.

Its width cap is `max-w-full sm:max-w-sm`, and that order matters. With the height fixed the width follows the aspect ratio, so a wide wordmark wants far more room than a phone column has; the container has to bound it before any fixed size does.

### Data visualisation

Two idioms coexist, and the choice is about authorship:

- **D3 in an inline `<script>`** for anything driven by site data — the career timeline, the superpowers bar chart and bubble chart, the work word cloud. These are themeable, responsive, and pause when off-screen.
- **Mermaid fenced blocks** for anything authored inside content Markdown — gantt, quadrant and xychart diagrams on the Superpowers page. Rendered by `astro-mermaid`, fully offline.

Mermaid carries a full Rosely theme in both colour schemes, so diagrams no longer arrive in the stock blues and lavenders. Nodes are Heavenly Pink on Radiant Orchid in light and a dark plum on Lupine in dark; connectors are Grapeade in light and Lupine in dark, both chosen to clear 3:1 against their own page background since they sit on it rather than on a filled shape.

Both halves now live in `src/styles/mermaid.css`, including the light one that `themeVariables` also sets. That duplication is the point: Mermaid bakes its colours in at render time, and the integration can render the same diagram twice under racing conditions, so a diagram that lost the race kept the stock palette until something re-rendered it. Deciding appearance in CSS makes it independent of when a diagram was drawn. Two consequences are worth knowing before editing it. Every rule needs `!important`, because Mermaid injects an id-scoped `<style>` into each SVG and an ID selector beats a class rule. And one rule needs a cascade layer, because Gantt paints `.vertText` from that same block and no class selector can outrank an ID one however many classes it carries. Prefer extending `src/styles/mermaid.css` over per-diagram `%%{init}%%` directives, which cannot vary by colour scheme.

### Syntax highlighting

Code blocks carry their own Rosely themes, in `src/styles/shiki-rosely.ts`: darkened hues on Sugar Swizzle in light, the Rosely brights on Black Beauty in dark, with matching hue roles in both — raspberry keywords, green strings, orchid function names, terracotta numbers, grey italic comments.

The two palettes are different colours rather than one set relit, and that is forced rather than chosen: clearing 4.5:1 needs luminance below ~0.15 on the cream background and above ~0.27 on the near-black one, and no single colour does both. **Treat highlighting as prose, not decoration** — a comment is a sentence and a string literal is text, so every token meets the 4.5:1 body-text bar, not the 3:1 graphical one. `tests/shiki-theme.test.ts` enforces it.

The word cloud sizes each tag by how many roles carry it and **places labels along an Archimedean spiral, heaviest first**, so the tags that ran through a whole career hold the centre and the one-offs fill in around them. Seeding at random and relaxing the overlaps away cannot produce that: relaxation only separates boxes, it has no notion of which label deserves the middle, so weight and position were unrelated. The spiral steps faster horizontally than vertically, or a circular one stacks the labels into a column and leaves the sides of a wide figure empty.

Motion is a weak spring back to the spiral position, stiffer for larger labels, with Brownian jitter on top — unanchored drift slowly undoes the arrangement, and the arrangement is the point. Overlaps are still resolved along the shallowest axis of penetration, because circle packing is wrong for wide text: a two-pixel vertical touch shoves two labels far apart horizontally.

### Charts are decorative; their data is not

Every visualisation is `aria-hidden` and paired with an accessible text equivalent — an `sr-only` list for the word cloud, a real table beside the psychometric charts, per-bubble `aria-label`s and a keyboard-reachable modal for the superpowers. The text equivalent is also what the search index picks up, so it is never optional.

## 6. Motion & Animation

Rosely uses motion purposefully to guide focus and add a layer of professional polish without sacrificing performance or serenity.

### Page Transitions

- **Client-Side Routing:** Utilises Astro's `ClientRouter` to provide smooth, SPA-like navigation between internal pages, maintaining visual continuity and reducing perceived load times.

### Entrance Animations

- **Subtle Arrivals:** Key UI blocks (Hero, Cards, Content Lists) use a custom `animate-fade-in-up` animation—a gentle fade-in combined with a slight 1rem upward slide—to create a dynamic yet calm entrance.
- **Staggered Delays:** Entrance animations are often staggered (e.g., using `[animation-delay:200ms]`) to create a natural, sequential flow as page sections appear.

### Interaction Feedback

- **Smooth Transitions:** Hover and focus states for interactive elements (buttons, links, cards) use smooth CSS transitions (typically 200-300ms) for property changes like `color`, `scale`, and `box-shadow`.
- **Tactile Transforms:** Interactive cards may use subtle transforms (e.g., `hover:-translate-y-1`) to provide a tactile sense of depth.

### Continuous Motion

Three components animate indefinitely rather than on entrance: the superpowers bubble chart, the work word cloud, and the career timeline. All three follow the same contract:

- **Pause when off-screen.** An `IntersectionObserver` stops the `requestAnimationFrame` loop when the chart scrolls out of view, so an idle tab costs nothing.
- **Offer a pause control.** Indefinite motion beside other content needs a visible, keyboard-reachable way to stop it (WCAG 2.2.2). The bubble chart's toggle is the pattern.
- **Tear down on navigation.** `ClientRouter` swaps the DOM without unloading the script, so every loop, observer and listener must be released on `astro:before-swap`.

### Motion Accessibility

- **Reduced Motion Support:** In alignment with our serenity principle, all non-essential animations and transitions are automatically disabled or minimized when `prefers-reduced-motion: reduce` is detected, ensuring an inclusive experience for all users.
- **JavaScript motion is not covered by the CSS preflight.** The `prefers-reduced-motion` block in `uno.config.ts` neutralises CSS animation and transitions only; a `requestAnimationFrame` loop keeps running regardless. Every animated component must read the media query itself and settle into a static layout instead. This is a recurring source of regressions.

## 7. Accessibility Standards

Rosely is committed to being an inclusive design system that meets **WCAG 2.2 Level AA** standards.

### Semantic Foundation

- **Landmark Elements:** Use appropriate HTML5 tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`) to provide structural meaning for assistive technologies.
- **Heading Hierarchy:** Maintain a logical, nested heading structure (H1 → H2 → H3) without skipping levels, ensuring clear document outlines.

- **Bypass Blocks:** A skip link is the first focusable element on every page, jumping to `#main-content`. The header repeats seven nav links plus search and theme controls on all 28 pages, so without it a keyboard user tabs through the lot every time. It is parked off-screen with a transform rather than `sr-only focus:not-sr-only` — those two are the same specificity and `sr-only` wins, leaving the link a 1px box on focus.

### Interactive Components

- **ARIA Implementation:** Use standard ARIA roles and attributes (`aria-label`, `aria-expanded`, `aria-current`) where native semantic elements are insufficient, particularly for complex interactive components like mobile menus and search.
- **Keyboard Navigability:** All interactive elements must be focusable via keyboard, following a logical tab order.
- **Focus States:** Every focusable element must utilize the `ui-focus-ring` utility to provide a clear, high-contrast visual indicator of focus.
- **Dialogs:** Use the native `<dialog>` element, named with `aria-labelledby` pointing at its own heading. An unnamed dialog is announced as just "dialog".
- **Hover-revealed content** must be dismissible without moving the pointer — chart tooltips listen for Escape (WCAG 1.4.13).
- **Redundant alternative text:** an image inside a link that already names its subject takes `alt=''`. Repeating the name makes the link announce it twice. `entitylogo.astro` exposes a `decorative` prop for this, keeping `alt` for the monogram fallback.

### Color & Contrast

- **Contrast Compliance:** While maintaining a serene "low-contrast" aesthetic, all text and interactive components are audited to meet WCAG AA contrast ratios (at least 4.5:1 for normal text and 3:1 for large text).
- **Audit in both colour schemes.** Lighthouse follows the machine's `prefers-color-scheme`, so a run can silently cover only one of them — two dark-mode failures (the primary button at 4.31:1, and the logo monogram at 2.6:1) survived several "100" reports that had all landed in light mode. Force the scheme when auditing.
- **Check against the real background, per theme.** The palette's cream (#f4eee8) and near-black (#27272a) surfaces are far enough apart that a single token rarely satisfies both. Morning Glory reaches only 2.2:1 on cream, so `ui-focus-ring` and `text-accent` both switch to Morning Glory Dark in light mode. Assume a colour needs a light and a dark value until measured otherwise.
- **Non-text contrast (3:1) applies to controls too.** An outline button's border is its only boundary, so `btn-secondary` uses Granite Gray / Opal Gray rather than the softer decorative `border-primary` token.
- **A tinted container is its own background, and one accent cannot serve text and decoration.** The callouts in `src/styles/alert.css` wash the page with `color-mix(… accent 8%, transparent)`, so a title painted in that same accent is read against a background made from itself — which costs contrast rather than granting it. All six kinds measured between 2.4:1 and 3.8:1 in light mode while the tint, the 3px rule and the title shared one value, despite the three owing nothing, 3:1 and 4.5:1 respectively. `--alert-accent` now keeps the decoration and `--alert-title` carries the text.
- **Audit the variants nothing uses yet.** Only two of the six callout kinds appear in any article, so measuring the rendered pages found only their failures. Injecting the other four into a built page turned up a seventh: IMPORTANT at 4.33:1 in **dark** mode, the one scheme the used kinds all passed in.
- **Information without Color:** Never use color as the sole indicator of meaning or status (e.g., provide text labels or icons alongside color states for success and error messages).

### Responsive Behaviour

The site is verified from **320px to 1536px** in both colour schemes. Nothing may extend past the viewport at any width. Where content genuinely cannot fit a narrow column — a wide table, a code block, a diagram — it gets its own `overflow-x: auto` box so it scrolls inside itself rather than pushing the page.

This has to be measured rather than eyeballed, because `html` clips horizontal overflow: a page that is broken at 320px looks perfectly composed, with the excess sliced off the right edge and no scrollbar to suggest anything is missing. Compare `documentElement.scrollWidth` against `clientWidth` at each breakpoint and treat any difference as a defect.

The failures this catches are layout, not colour. Both defects found in the last sweep — a wordmark 480px wide in a 288px column, and a table losing its last column — were identical in light and dark.

### Verification

Lighthouse currently reports 100 for accessibility, best practices and SEO across the site, with performance 91–100. Treat that as the floor, not the goal — Lighthouse cannot see keyboard order, focus management or whether alternative text is meaningful, and it weights some genuine axe findings at zero.

The full sweep behind the responsive and contrast claims covers every page at seven widths in both schemes, checking overflow, text contrast against the effective background, broken images and console errors. Resolve colours by painting them to a canvas rather than parsing the computed string — the theme is authored in `oklch`, and a regex-based reader reports hundreds of contrast failures that do not exist.
