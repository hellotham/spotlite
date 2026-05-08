# Implementation Plan: Design System Alignment

## Phase 1: Setup and Configuration Review [checkpoint: 497a06b]
- [x] Task: Review Tailwind/UnoCSS Configuration (2bb4cc1)
    - [x] Verify `uno.config.ts` incorporates Rosely colors (pinks, purples, greys, colorful).
    - [x] Verify font families (Noto Sans, Noto Serif, Noto Sans Mono) are configured.
    - [x] Verify border radius and shadow defaults match DESIGN.md.
- [x] Task: Conductor - User Manual Verification 'Setup and Configuration Review' (497a06b)

## Phase 2: Layout Components Alignment
- [ ] Task: Align Header and Footer
    - [ ] Sub-task: Update `src/components/header.astro` and `headerhome.astro` to use Rosely colors and typography.
    - [ ] Sub-task: Update `src/components/footer.astro` spacing, colors, and fonts.
- [ ] Task: Align Navigation
    - [ ] Sub-task: Update `src/components/navbar.astro` and `navmenu.astro` styling (borders, interactive states).
- [ ] Task: Conductor - User Manual Verification 'Layout Components Alignment' (Protocol in workflow.md)

## Phase 3: UI Components Alignment
- [ ] Task: Align Content Components
    - [ ] Sub-task: Update `src/components/articlelist.astro` styling (cards, shadows, border radius).
    - [ ] Sub-task: Update `src/components/imagecards.astro` styling.
    - [ ] Sub-task: Update `src/components/ctaform.astro` styling (inputs, buttons, focus states).
    - [ ] Sub-task: Update `src/components/hero.astro` and `work.astro` typography and spacing.
- [ ] Task: Conductor - User Manual Verification 'UI Components Alignment' (Protocol in workflow.md)

## Phase 4: Page Level Alignment
- [ ] Task: Align Main Pages
    - [ ] Sub-task: Review and adjust `src/pages/index.astro`, `about.md`, `creations.md`, `uses.md`.
    - [ ] Sub-task: Review and adjust `src/pages/projects.astro`, `articles.astro`.
- [ ] Task: Align Dynamic Routes
    - [ ] Sub-task: Review `src/pages/article/[...id].astro` for markdown typography alignment (`presetTypography` usage).
- [ ] Task: Conductor - User Manual Verification 'Page Level Alignment' (Protocol in workflow.md)