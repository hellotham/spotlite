# Implementation Plan

## Phase 1: Setup and Configuration
- [x] Task: Review existing Astro configuration (`astro.config.mjs`) and meta components.
- [ ] Task: Conductor - User Manual Verification 'Setup and Configuration' (Protocol in workflow.md)

## Phase 2: Meta Tags & OpenGraph
- [ ] Task: Write tests to verify presence and uniqueness of `<title>` and `<meta name="description">` on core page templates.
- [ ] Task: Implement dynamic `<title>` and `<meta name="description">` across `src/layouts/Layout.astro` and page components.
- [ ] Task: Write tests for OpenGraph (`og:*`) and Twitter Card tags with fallback images.
- [ ] Task: Implement OpenGraph and Twitter Card tags in global templates.
- [ ] Task: Conductor - User Manual Verification 'Meta Tags & OpenGraph' (Protocol in workflow.md)

## Phase 3: Advanced Structured Data (JSON-LD)
- [ ] Task: Write tests for `WebSite` and `Person` JSON-LD schema generation on Global Pages.
- [ ] Task: Implement `WebSite` and `Person` schema for global templates.
- [ ] Task: Write tests for `Article` / `BlogPosting` schema on Article pages.
- [ ] Task: Implement `Article` schema for `src/content/article/`.
- [ ] Task: Write tests for `ItemPage` schema on Projects/Work pages.
- [ ] Task: Implement `ItemPage` schema for `src/content/project/` and `src/content/work/`.
- [ ] Task: Write tests and implement `BreadcrumbList` schema across all sub-pages.
- [ ] Task: Conductor - User Manual Verification 'Advanced Structured Data (JSON-LD)' (Protocol in workflow.md)

## Phase 4: Sitemap & Robots
- [ ] Task: Write tests/verification for the presence of `@astrojs/sitemap` integration and correct XML output.
- [ ] Task: Ensure `@astrojs/sitemap` is integrated in `astro.config.mjs` and optimize settings.
- [ ] Task: Write tests to ensure `robots.txt` is generated correctly.
- [ ] Task: Implement or verify a `robots.txt` that points to the dynamic `sitemap-index.xml`.
- [ ] Task: Conductor - User Manual Verification 'Sitemap & Robots' (Protocol in workflow.md)

## Phase 5: Core Web Vitals & Performance
- [ ] Task: Audit current image implementations across content and component files.
- [ ] Task: Refactor images to use Astro's `<Image>` or `<Picture>` components with `sharp` processing and lazy loading (`loading="lazy"`).
- [ ] Task: Run local Lighthouse audit to verify Performance and SEO scores (90+).
- [ ] Task: Conductor - User Manual Verification 'Core Web Vitals & Performance' (Protocol in workflow.md)