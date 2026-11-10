const SITE_ORIGIN = "https://stepinstudents.com";

const ROUTE_SEO = {
    "/": {
        title: "Education in India: Schools, Colleges & Courses | EduConnect",
        description: "Compare schools, colleges and universities in India. Explore courses, scholarships, education rankings and study abroad options on EduConnect.",
        image: "/images/banner/education-banner.jpeg",
        indexable: true,
        primaryKeyword: "education",
        secondaryKeywords: ["education in India", "schools in India", "colleges in India", "university courses", "education scholarships", "study abroad"]
    },
    "/study-abroad": {
        title: "Study Abroad from India: Courses & Universities | EduConnect",
        description: "Compare study abroad destinations from India. Explore universities, courses, admissions, scholarships and estimated tuition and living costs.",
        image: "/images/banner/study-abroad-banner.jpeg",
        indexable: true,
        primaryKeyword: "study abroad",
        secondaryKeywords: ["study abroad from India", "study abroad universities", "courses abroad", "study abroad scholarships", "international admissions", "tuition and living costs"]
    },
    "/online-education": {
        title: "Online Education: Compare Courses & Degrees | EduConnect",
        description: "Compare online courses, certificates, diplomas and degrees by subject, level, study mode and destination. Explore options from universities and learning providers.",
        image: "/images/online-education-footer.jpg",
        indexable: true,
        primaryKeyword: "online education",
        secondaryKeywords: ["online courses", "online degrees", "distance learning", "online certificates", "compare online programmes"]
    },
    "/community": {
        title: "Student Community for Learning & Connections | EduConnect",
        description: "Connect with students, exchange study ideas and find learning communities on EduConnect.",
        image: "/images/community/student-community-chat.jpg",
        indexable: false,
        primaryKeyword: "student community",
        secondaryKeywords: ["student network", "study partners", "student groups", "education discussions"]
    },
    "/study-abroad/search-results": {
        title: "Study Abroad Search Results | EduConnect",
        description: "Search study abroad institutions and destinations on EduConnect.",
        indexable: false
    },
    "/admin": { title: "Admin Dashboard | EduConnect", description: "Manage EduConnect education content and platform tools. Administrator access is required.", indexable: false },
    "/admin/news": { title: "Manage Education News | EduConnect Admin", description: "Review and manage education news published on EduConnect. Administrator access is required.", indexable: false },
    "/admin/current-affairs": { title: "Manage Current Affairs | EduConnect Admin", description: "Manage current-affairs updates for the EduConnect education platform. Administrator access is required.", indexable: false },
    "/admin/study-abroad": { title: "Manage Study Abroad Listings | EduConnect Admin", description: "Manage study abroad institution records in EduConnect. Administrator access is required.", indexable: false },
    "/admin/college-partners": { title: "Manage College Partners | EduConnect Admin", description: "Manage college partner accounts and access in EduConnect. Administrator access is required.", indexable: false },
    "/online-education/admin": { title: "Manage Online Education | EduConnect Admin", description: "Manage online education listings in EduConnect. Administrator access is required.", indexable: false },
    "/college": { title: "College Portal Access | EduConnect", description: "Access the EduConnect college partner portal using credentials provided by an administrator.", indexable: false },
    "/college/login": { title: "College Partner Sign In | EduConnect", description: "Sign in to the EduConnect college partner portal with your assigned account credentials.", indexable: false },
    "/college/dashboard": { title: "College Partner Dashboard | EduConnect", description: "View institution-scoped student interest and enquiry information in the private EduConnect partner dashboard.", indexable: false },
    "/college/enquire": { title: "College Enquiry | EduConnect", description: "Submit an enquiry to the selected college through the EduConnect student enquiry form.", indexable: false }
};

function upsertMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, selector.match(/\[([^=]+)=/)?.[1] || attribute);
        document.head.append(element);
    }
    element.setAttribute("content", value);
}

function upsertCanonical(url) {
    let element = document.head.querySelector('link[rel="canonical"]');
    if (!url) {
        element?.remove();
        return;
    }
    if (!element) {
        element = document.createElement("link");
        element.rel = "canonical";
        document.head.append(element);
    }
    element.href = url;
}

function setRouteSchema(page, canonical) {
    document.getElementById("route-seo-page-schema")?.remove();
    if (!page.indexable || canonical !== `${SITE_ORIGIN}/`) return;
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: canonical,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: "EduConnect", url: `${SITE_ORIGIN}/` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_ORIGIN}${page.image}` },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` }]
        }
    };
    const script = document.createElement("script");
    script.id = "route-seo-page-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.append(script);
}

export function applyRouteSEO(pathname = window.location.pathname) {
    const path = pathname.replace(/\/+$/, "") || "/";
    // These entry pages ship dedicated static metadata and own page helpers.
    // Avoid replacing their richer social/schema tags with generic metadata.
    if (path === "/study-abroad" || path === "/online-education") return;
    const page = ROUTE_SEO[path] || (path === "/index.html" ? ROUTE_SEO["/"] : null);
    if (!page) {
        document.title = "Page Not Found | EduConnect";
        const description = "The requested EduConnect page could not be found. Return to education discovery and browse available sections.";
        upsertMeta('meta[name="description"]', "name", description);
        upsertMeta('meta[name="robots"]', "name", "noindex, nofollow");
        upsertMeta('meta[property="og:title"]', "property", document.title);
        upsertMeta('meta[property="og:description"]', "property", description);
        upsertMeta('meta[property="og:url"]', "property", `${SITE_ORIGIN}${path}`);
        upsertMeta('meta[name="twitter:title"]', "name", document.title);
        upsertMeta('meta[name="twitter:description"]', "name", description);
        document.head.querySelector('meta[property="og:image"]')?.remove();
        document.head.querySelector('meta[property="og:image:alt"]')?.remove();
        document.head.querySelector('meta[name="twitter:image"]')?.remove();
        document.head.querySelector('meta[name="twitter:image:alt"]')?.remove();
        upsertCanonical(null);
        document.getElementById("route-seo-page-schema")?.remove();
        return;
    }

    document.title = page.title;
    upsertMeta('meta[name="description"]', "name", page.description || "EduConnect education information and services.");
    upsertMeta('meta[name="robots"]', "name", page.indexable ? "index, follow, max-image-preview:large" : "noindex, nofollow");
    upsertMeta('meta[property="og:type"]', "property", "website");
    upsertMeta('meta[property="og:site_name"]', "property", "EduConnect");
    upsertMeta('meta[property="og:title"]', "property", page.title);
    upsertMeta('meta[property="og:description"]', "property", page.description || "EduConnect education information and services.");
    upsertMeta('meta[property="og:locale"]', "property", "en_IN");
    upsertMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", page.title);
    upsertMeta('meta[name="twitter:description"]', "name", page.description || "EduConnect education information and services.");

    const canonical = page.indexable ? `${SITE_ORIGIN}${path === "/" ? "/" : `${path}/`}` : null;
    upsertCanonical(canonical);
    upsertMeta('meta[property="og:url"]', "property", canonical || `${SITE_ORIGIN}${path}/`);
    if (page.image) {
        const imageUrl = `${SITE_ORIGIN}${page.image}`;
        upsertMeta('meta[property="og:image"]', "property", imageUrl);
        upsertMeta('meta[property="og:image:alt"]', "property", `${page.primaryKeyword || "EduConnect"} page image`);
        upsertMeta('meta[name="twitter:image"]', "name", imageUrl);
        upsertMeta('meta[name="twitter:image:alt"]', "name", `${page.primaryKeyword || "EduConnect"} page image`);
    } else {
        document.head.querySelector('meta[property="og:image"]')?.remove();
        document.head.querySelector('meta[property="og:image:alt"]')?.remove();
        document.head.querySelector('meta[name="twitter:image"]')?.remove();
        document.head.querySelector('meta[name="twitter:image:alt"]')?.remove();
    }
    setRouteSchema(page, canonical);
}

export const SEO_KEYWORD_MAP = ROUTE_SEO;
