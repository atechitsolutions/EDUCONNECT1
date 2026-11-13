# StepInStudents on-page SEO map

Keyword targets below are qualitative mappings based on each route's visible purpose and content. They are not search-volume forecasts. Confirm demand and performance with Google Search Console or a keyword research service after deployment.

| Route | Indexing | Primary keyword | Secondary keywords | Search intent |
|---|---|---|---|---|
| `/` | Index | education | education in India; schools in India; colleges in India; university courses; education scholarships; study abroad | Broad discovery and comparison |
| `/study-abroad/` | Index | study abroad | study abroad from India; study abroad universities; courses abroad; study abroad scholarships; international admissions; tuition and living costs | Research destinations, courses and planning |
| `/online-education/` | Index | online education | online courses; online degrees; distance learning; online certificates; compare online programmes | Compare flexible learning options |
| `/community/` | Noindex (sign-in required) | student community | student network; study partners; student groups; education discussions | Join a student network |
| `/latest-news/` | Conditional: index only when published news exists | education news | latest education news; education updates; admissions news; scholarship updates | Browse current education news |
| `/latest-news/{id}/` | Conditional: only a published article with substantive content | Derived from the actual article headline | Derived from the actual title, category and article body | Read a specific published education story |
| `/study-abroad/search-results` | Noindex | — | — | Filtered/variable results; avoid duplicate indexing |
| Admin and college partner routes | Noindex | — | — | Private account and management tools |

## Page content checks

- Home hero has one H1 focused on education discovery; its title and description target education in India naturally.
- Study Abroad has a single page H1 containing “Study Abroad”; its supporting copy covers courses, universities, admissions, scholarships and costs.
- Online Education has a single H1 naming online education, courses, certificates and degrees.
- Community requires authentication, so it is deliberately excluded from the sitemap and marked noindex.
- News listing/article metadata is generated from the existing published-news API. Empty or unpublished article pages are noindex; article detail requires a substantive body. Dynamic news URLs are not added to the static sitemap because the build cannot enumerate the production database.
- Public routes use page-specific canonical URLs, Open Graph metadata, Twitter large-image metadata and a relevant page image.
- Existing Study Abroad and Online Education WebPage/BreadcrumbList JSON-LD is retained. The home page has WebSite, Organization and route-specific WebPage structured data.
- The sitemap includes only the public, indexable landing pages. Search results and private routes are excluded.

## Remaining deployment checks

- Production canonical host is configured as `https://stepinstudents.com`; confirm HTTPS, DNS and host redirects before launch.
- Submit `/sitemap.xml` in Search Console and inspect rendered routes after deployment.
- Use PageSpeed Insights/Lighthouse and Search Console field data to check Core Web Vitals and real query performance; local builds cannot establish these metrics.
- Configure production HTTP status codes, redirects, compression, caching and server-side/pre-rendered metadata in the hosting layer. The current site is a client-rendered Vite app, so social crawlers and non-JavaScript crawlers may not receive route-specific metadata unless the host serves each built HTML entry or pre-renders it.
