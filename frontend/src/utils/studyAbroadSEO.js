const STUDY_ABROAD_PAGE = {
    title: "Study Abroad from India | Courses & Universities",
    description: "Compare study abroad destinations for Indian students. Explore universities, courses, admissions, scholarships, intakes, visa planning and estimated tuition and living costs.",
    canonical: "https://www.educonnect.com/study-abroad/",
    image: "https://www.educonnect.com/images/banner/study-abroad-banner.jpeg"
};

function setMeta(selector, attribute, content) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");
        const [attributeName, attributeValue] = attribute;
        element.setAttribute(attributeName, attributeValue);
        document.head.append(element);
    }

    element.content = content;
}

export function applyStudyAbroadSEO() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path !== "/study-abroad") return;
    const page = STUDY_ABROAD_PAGE;

    document.title = page.title;
    setMeta('meta[name="description"]', ["name", "description"], page.description);
    setMeta('meta[name="robots"]', ["name", "robots"], "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta('meta[property="og:type"]', ["property", "og:type"], "website");
    setMeta('meta[property="og:site_name"]', ["property", "og:site_name"], "EduConnect");
    setMeta('meta[property="og:title"]', ["property", "og:title"], page.title);
    setMeta('meta[property="og:description"]', ["property", "og:description"], page.description);
    setMeta('meta[property="og:url"]', ["property", "og:url"], page.canonical);
    setMeta('meta[property="og:image"]', ["property", "og:image"], page.image);
    setMeta('meta[property="og:image:alt"]', ["property", "og:image:alt"], "Study abroad opportunities featured by EduConnect");
    setMeta('meta[name="twitter:card"]', ["name", "twitter:card"], "summary_large_image");
    setMeta('meta[name="twitter:title"]', ["name", "twitter:title"], page.title);
    setMeta('meta[name="twitter:description"]', ["name", "twitter:description"], page.description);
    setMeta('meta[name="twitter:image"]', ["name", "twitter:image"], page.image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
    }
    canonical.href = page.canonical;

    document.getElementById("study-abroad-page-jsonld")?.remove();
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: page.canonical,
        inLanguage: "en-IN",
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: page.image
        },
        isPartOf: {
            "@type": "WebSite",
            name: "EduConnect",
            url: "https://www.educonnect.com/"
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.educonnect.com/"
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Study Abroad",
                    item: STUDY_ABROAD_PAGE.canonical
                }
            ]
        }
    };

    const script = document.createElement("script");
    script.id = "study-abroad-page-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.append(script);
}
