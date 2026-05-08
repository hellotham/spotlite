# Implementation Plan

## Phase 1: Setup and Configuration [checkpoint: e8abb58]
- [x] Task: Review existing Astro configuration (`astro.config.mjs`) and meta components.
- [x] Task: Conductor - User Manual Verification 'Setup and Configuration' (Protocol in workflow.md)

## Phase 2: Meta Tags & OpenGraph [checkpoint: da4f41c]
- [x] Task: Write tests to verify presence and uniqueness of `<title>` and `<meta name="description">` on core page templates.
- [x] Task: Implement dynamic `<title>` and `<meta name="description">` across `src/layouts/Layout.astro` and page components.
- [x] Task: Write tests for OpenGraph (`og:*`) and Twitter Card tags with fallback images.
- [x] Task: Implement OpenGraph and Twitter Card tags in global templates.
- [x] Task: Conductor - User Manual Verification 'Meta Tags & OpenGraph' (Protocol in workflow.md)

## Phase 3: Advanced Structured Data (JSON-LD) [checkpoint: 21def5c]
- [x] Task: Write tests for `WebSite` and `Person` JSON-LD schema generation on Global Pages.
- [x] Task: Implement `WebSite` and `Person` schema for global templates.
- [x] Task: Write tests for `Article` / `BlogPosting` schema on Article pages.
- [x] Task: Implement `Article` schema for `src/content/article/`.
- [x] Task: Write tests for `ItemPage` schema on Projects/Work pages.
- [x] Task: Implement `ItemPage` schema for `src/content/project/` and `src/content/work/`.
- [x] Task: Write tests and implement `BreadcrumbList` schema across all sub-pages.
- [x] Task: Conductor - User Manual Verification 'Advanced Structured Data (JSON-LD)' (Protocol in workflow.md) [checkpoint: d96b9e3]

## Phase 4: Sitemap & Robots
- [x] Task: Write tests/verification for the presence of `@astrojs/sitemap` integration and correct XML output. [checkpoint: e7cee8f]
- [x] Task: Ensure `@astrojs/sitemap` is integrated in `astro.config.mjs` and optimize settings. [checkpoint: 54e93b2]
- [x] Task: Write tests to ensure `robots.txt` is generated correctly. [checkpoint: ec64251]
- [x] Task: Implement or verify a `robots.txt` that points to the dynamic `sitemap-index.xml`. [checkpoint: ec64251]
- [ ] Task: Conductor - User Manual Verification 'Sitemap & Robots' (Protocol in workflow.md)

## Phase 5: Core Web Vitals & Performance
- [ ] Task: Audit current image implementations across content and component files.
- [ ] Task: Refactor images to use Astro's `<Image>` or `<Picture>` components with `sharp` processing and lazy loading (`loading="lazy"`).
- [ ] Task: Run local Lighthouse audit to verify Performance and SEO scores (90+).
- [ ] Task: Conductor - User Manual Verification 'Core Web Vitals & Performance' (Protocol in workflow.md)