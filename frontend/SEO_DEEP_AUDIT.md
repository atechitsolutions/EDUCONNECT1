# StepInStudents deep SEO audit and implementation report

Audit scope: the checked-out frontend and backend route/service structure, as inspected on 2026-11-03. This documents the existing application; it does not assume that every feature named in the SEO brief exists.

## Architecture and page inventory

The site is a JavaScript/Vite client-rendered application. `frontend/src/router/router.js` declares the routes below. The Home, Study Abroad and Online Education routes have separate HTML entries; Community now also has a static entry. Most route content is generated in JavaScript after the document loads. Institution/course information is fetched or embedded in the browser and shown in search results, cards and detail modals.

| Route | Actual page/purpose | Visible H1 | Indexability | Metadata/canonical | Schema and SEO notes |
|---|---|---|---|---|---|
| `/` and `/index.html` | Education discovery homepage; `/index.html` is an alias | “Explore. Compare. Find the Right Education.” | Index | Home title/description; canonical `/` | WebSite, Organization and route WebPage; homepage anchors link to actual sections |
| `/study-abroad/` | Study abroad destinations, guidance, tools and FAQs | “Study Abroad — Compare countries, courses & universities.” | Index | Unique title/description, canonical `/study-abroad/`, OG/X image | WebPage, BreadcrumbList and existing FAQPage; destination/institution details are not separate routes |
| `/study-abroad/search-results` | Filtered institution results | “Search results” | Noindex | Runtime noindex; query variants have no canonical | Search results can vary; no unique landing-page content |
| `/online-education/` | Online course, provider and programme discovery | “Online Education: Compare Courses, Certificates & Degrees” | Index | Unique title/description, canonical `/online-education/`, OG/X image | WebPage and BreadcrumbList; detail views are modals, not crawlable URLs |
| `/latest-news/` | Published education-news listing from the existing API | “Latest News” | Conditional: noindex if empty; index after published items load | Runtime metadata and canonical only when published items exist | CollectionPage when content is present; linked from the homepage news section |
| `/latest-news/{id}/` | Published news detail from the existing API | Article title from database | Conditional: index only for published content with a substantive body | Unique title/description/canonical/OG/X and robots after API validation | NewsArticle JSON-LD uses the actual title/body/category/dates/image; invalid or unpublished records are noindex/404 state |
| `/community/` | Student social feed; requires sign-in | “Your Community. Your Connections.” or sign-in prompt | Noindex | Static and runtime noindex; canonical removed at runtime | Excluded from sitemap because page content is private/auth-gated |
| `/admin` | Admin dashboard | Access-required or dashboard heading | Noindex | Runtime noindex | Private route; authentication is the actual security boundary |
| `/admin/news` | News management | Access-required or management heading | Noindex | Runtime noindex | Private route |
| `/admin/current-affairs` | Current-affairs management | Access-required or management heading | Noindex | Runtime noindex | Private route |
| `/admin/study-abroad` | Institution management | Access-required or management heading | Noindex | Runtime noindex | Private route |
| `/admin/college-partners` | College-partner management | Access-required or management heading | Noindex | Runtime noindex | Private route |
| `/online-education/admin` | Online-education content management | Management heading | Noindex | Runtime noindex | Private route |
| `/college` and `/college/login` | College partner sign-in | Sign-in heading | Noindex | Runtime noindex | Same login experience; should remain outside the sitemap |
| `/college/dashboard` | College partner dashboard | Institution/dashboard heading | Noindex | Runtime noindex | Private account data; never expose via SEO markup |
| `/college/enquire` | Enquiry form | Institution enquiry heading | Noindex | Runtime noindex | Institution ID is carried in form data; not a public institution detail page |
| Unknown paths | 404 view | “Page Not Found” | Noindex | Canonical removed at runtime | Router marks 404 in a data attribute; actual HTTP 404 depends on hosting configuration |

No separate country, university, institution, programme, course-detail, profile, or event routes were found in the frontend router. Current destination/institution/programme interfaces use listings and dialogs. A published-news API and dormant news detail component did exist; their `/latest-news` routes are now connected and generate metadata/NewsArticle JSON-LD from published records. Dynamic article URLs are not placed in the static sitemap because the build has no safe way to enumerate the production database. The sitemap does not invent URLs for other data without public routes.

## Keyword targets and search intent

See [SEO_KEYWORD_MAP.md](./SEO_KEYWORD_MAP.md) for the route-level map. The targets are qualitative, based on existing page purpose and observed search-result patterns; no search-volume or ranking claims are made. Competitor review found that the Government of Maharashtra study-abroad portal emphasizes country/course discovery, planning steps and checking official sources; Shiksha describes its offer around college and course discovery. StepInStudents should differentiate through useful comparisons and clear source/verification context rather than copying their copy or creating thin pages. References: [Maha Study Abroad](https://studyabroad.mahacet.org/) and [Shiksha About](https://www.shiksha.com/about).

## Prioritized findings and actions

### P0 — Critical

- **Hosting behavior remains unverified.** Frontend canonicals and sitemap now use `https://stepinstudents.com`; configure HTTP and www redirects to this HTTPS non-www host.
- **Production response codes are not controlled by the frontend router.** The SPA can render a 404 view, but only hosting/server configuration can return an HTTP 404 instead of a soft 404. Verify production direct-route responses.
- **Client rendering limits metadata for non-JavaScript crawlers and social scrapers.** Static HTML entries now exist for the three public indexable landing pages. Other SPA routes receive runtime metadata only. Keep protected routes noindex and consider server/static rendering only if additional routes become public SEO landing pages.

### P1 — High

- **No dedicated dynamic discovery URLs.** Country, institution and programme details are not uniquely addressable; search listings/modals cannot satisfy institution/course-specific searches or have unique canonical metadata. Create such routes only when reliable records and substantial unique content exist; do not index empty API results.
- **Dynamic news is not represented in the static sitemap.** Published news pages now have route-specific metadata and schema; production sitemap generation from published database records remains a hosting/backend integration task.
- **Limited public indexable inventory.** Current sitemap contains Home, Study Abroad and Online Education. Country guides, programme pages, articles and trust pages are not routes today.
- **Trust pages are absent from the router.** About, contact, privacy and terms routes were not found. Footer links to nonexistent policy/contact paths were removed/replaced with real routes; add genuine owner-approved pages when their information is available.
- **The main application bundle is large.** Latest Vite build reports roughly 1.17 MB minified JavaScript and 802 KB CSS (about 215 KB and 124 KB gzip respectively). This is a build-size signal, not a field Core Web Vitals result. Route-level code splitting and CSS pruning need a measured performance pass.
- **Data/API content is client-loaded.** Homepage news and institution/programme listings can be absent from initial HTML and depend on local API services. Confirm production APIs, crawl rendering and content availability after deployment.

### P2 — Medium

- Metadata, canonicals, page robots directives, Open Graph/Twitter cards, a sitemap and robots.txt are implemented for the actual route set. Private routes, search results, Community and unknown paths are noindex; sitemap contains only public indexable pages.
- Main public pages have one primary H1 in their rendered states. Study Abroad already includes FAQ content/schema; Organization/WebSite data is present, and homepage WebPage JSON-LD was added. No university/course schemas are added because those pages do not exist as crawlable records.
- Important page images have contextual alternatives in the inspected hero/cards. A full image-by-image width/height, format, responsive-size and LCP-priority pass remains outstanding; do not treat this as complete from the targeted audit.
- Main navigation and footer links were adjusted to point to existing routes or real homepage section IDs. External social destinations were placeholders and have been removed rather than linked to invented accounts.
- No hreflang is added: no alternate-language page variants exist. `en-IN` is retained for the English/India-oriented content.
- No GA4, GTM, Search Console verification token or analytics ID was found. Nothing was invented or injected.

### P3 — Ongoing

- Monitor actual queries, impressions, clicks, indexing and enquiries in owner-configured Search Console/Analytics.
- Add verified editorial authorship, update dates and authoritative references only when editorial ownership and sources are confirmed.
- Build content clusters from useful, complete records and distinct student intent; avoid mass-generating pages from filters.
- Review competitor pages periodically; current review is a qualitative content-structure comparison, not traffic/keyword-gap data.

## Implemented page scorecard

| URL | Primary keyword | SEO title | H1 | Canonical/indexing | Schema | Internal links/image | Performance |
|---|---|---|---|---|---|---|---|
| `/` | education | Education in India: Schools, Colleges & Courses \| StepInStudents | Explore. Compare. Find the Right Education. | `https://stepinstudents.com/`; index | WebSite, Organization, WebPage, BreadcrumbList | Section navigation and contextual education imagery; target assets/alt checked, full image audit pending | Build-only; CWV not measured |
| `/study-abroad/` | study abroad | Study Abroad from India: Courses & Universities \| StepInStudents | Study Abroad; compare countries, courses & universities | Self-canonical; index | WebPage, BreadcrumbList, existing FAQPage | Country/institution details remain modal/list-based; relevant banner image | Build-only; CWV not measured |
| `/online-education/` | online education | Online Education: Compare Courses & Degrees \| StepInStudents | Online Education: Compare Courses, Certificates & Degrees | Self-canonical; index | WebPage, BreadcrumbList | Programme/provider cards link within the page; relevant image metadata | Build-only; CWV not measured |
| `/community/` | student community (not targeted while gated) | Student Community for Learning & Connections \| StepInStudents | Your Community. Your Connections. | Noindex; excluded from sitemap | No structured data added | Community navigation and relevant photo | Build-only; CWV not measured |
| Search, admin, college and unknown routes | — | Unique route titles where mapped | Route-dependent | Noindex; not in sitemap | No public data schema | Private or variable results | Build-only; server status not tested |

## Validation performed

- `npm run build` succeeds with Vite and produces separate Home, Study Abroad, Online Education and Community HTML entries.
- Built HTML for public entries was checked for title, description, canonical and JSON-LD parseability. Community is deliberately noindex; its canonical is removed by runtime SEO policy.
- `sitemap.xml` parses as XML; `robots.txt` contains the sitemap location. Only public indexable landing URLs are listed.
- The current build emits a large-chunk advisory. No Lighthouse/PageSpeed run, live HTTP crawl, live structured-data service validation, browser-size matrix, Search Console inspection, or Core Web Vitals measurement was performed; do not infer those results from a successful local build.

## Owner/deployment work still required

1. Confirm the production canonical host and configure HTTPS/host redirects.
2. Configure hosting so direct known routes return correct statuses, assets are cached/compressed, and unknown paths return HTTP 404.
3. Ensure production API endpoints are reachable and public listing content is crawl-renderable.
4. Verify domain ownership in Search Console, submit `/sitemap.xml`, and inspect canonical/indexing reports.
5. Configure Analytics/Search Console IDs only with owner-provided values and appropriate consent controls.
6. Measure Lighthouse/PageSpeed and field Core Web Vitals on deployed pages before prioritizing performance refactors.
7. Verify published institution, course, ranking, fee, scholarship and admission facts with their source institutions before expanding content or structured data.
