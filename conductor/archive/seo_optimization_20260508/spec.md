# Track: SEO Optimization

## Overview
Review and optimize the SEO setup for the Spotlite Astro project. This includes enhancing meta tags, implementing advanced structured data (JSON-LD), improving Core Web Vitals, and fine-tuning sitemap and robots.txt generation across all content types (Global Pages, Articles, and Projects).

## Functional Requirements
- **Meta Tags & OpenGraph:** Implement robust and dynamic `<title>`, `<meta name="description">`, OpenGraph (`og:*`), and Twitter Card tags for all page types.
- **Advanced Structured Data (JSON-LD):**
  - Global Pages: `WebSite`, `Person`
  - Articles: `Article` or `BlogPosting`
  - Projects/Work: `ItemPage` or relevant portfolio elements.
  - Implement `BreadcrumbList` where applicable.
- **Sitemap & Robots:**
  - Verify and optimize `@astrojs/sitemap` integration (or add if missing).
  - Ensure `robots.txt` is correctly generated and points to the sitemap.

## Non-Functional Requirements
- **Core Web Vitals:** Ensure images are optimized (using Astro's `<Image>` component), lazy-loading is applied correctly, and layout shifts are minimized.
- **Performance:** SEO enhancements should not negatively impact the current build times or runtime performance.

## Acceptance Criteria
- [ ] All pages render accurate and unique Title and Meta Description tags.
- [ ] Social sharing previews (OpenGraph/Twitter) work correctly with appropriate fallback images.
- [ ] Advanced JSON-LD schemas validate without errors using Google's Rich Results Test.
- [ ] `sitemap-index.xml` and `robots.txt` are correctly served at the root.
- [ ] Core Web Vitals audit (Lighthouse) shows 90+ scores for Performance and SEO.

## Out of Scope
- Content creation or copywriting for SEO purposes.
- Backlink strategies or off-page SEO.