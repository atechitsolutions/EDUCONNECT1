import { getPublishedNews, getPublishedNewsById } from "../services/homeContent.js";

const SEO_ORIGIN = "https://stepinstudents.com";

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleString();
}

function setMeta(selector, key, value) {
    let meta = document.head.querySelector(selector);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(key, selector.match(/\[([^=]+)=/)?.[1] || key);
        document.head.append(meta);
    }
    meta.setAttribute("content", value);
}

function setNewsMetadata(news, id) {
    const title = String(news?.title || "").trim();
    const body = String(news?.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const summary = [news?.subtitle, body].filter(Boolean).join(" — ");
    const description = summary.length > 160 ? `${summary.slice(0, 157).replace(/\s+\S*$/, "")}…` : summary;
    const canonical = `${SEO_ORIGIN}/latest-news/${encodeURIComponent(id)}/`;
    const valid = Boolean(news?.published && title && body.length >= 100);
    const image = (() => {
        try {
            const url = new URL(String(news?.imageUrl || ""), SEO_ORIGIN);
            return ["http:", "https:"].includes(url.protocol) ? url.href : "";
        } catch { return ""; }
    })();

    document.title = title ? `${title} | StepInStudents News` : "Education News Not Found | StepInStudents";
    setMeta('meta[name="description"]', "name", description || "Published education news from StepInStudents.");
    setMeta('meta[name="robots"]', "name", valid ? "index, follow, max-image-preview:large" : "noindex, nofollow");
    setMeta('meta[property="og:type"]', "property", "article");
    setMeta('meta[property="og:site_name"]', "property", "StepInStudents");
    setMeta('meta[property="og:title"]', "property", document.title);
    setMeta('meta[property="og:description"]', "property", description || title);
    setMeta('meta[property="og:url"]', "property", canonical);
    setMeta('meta[name="twitter:card"]', "name", image ? "summary_large_image" : "summary");
    setMeta('meta[name="twitter:title"]', "name", document.title);
    setMeta('meta[name="twitter:description"]', "name", description || title);

    document.querySelector('link[rel="canonical"]')?.remove();
    if (valid) {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.append(link);
    }
    for (const selector of ['meta[property="og:image"]','meta[property="og:image:alt"]','meta[name="twitter:image"]','meta[name="twitter:image:alt"]']) document.head.querySelector(selector)?.remove();
    if (image) {
        setMeta('meta[property="og:image"]', "property", image);
        setMeta('meta[property="og:image:alt"]', "property", title);
        setMeta('meta[name="twitter:image"]', "name", image);
        setMeta('meta[name="twitter:image:alt"]', "name", title);
    }

    document.getElementById("route-seo-page-schema")?.remove();
    if (valid) {
        const publishedAt = news.createdAt ? new Date(news.createdAt) : null;
        const updatedAt = news.updatedAt ? new Date(news.updatedAt) : null;
        const schema = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: title,
            description: description || title,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            publisher: { "@type": "Organization", name: "StepInStudents", url: `${SEO_ORIGIN}/` },
            ...(news.category ? { articleSection: String(news.category) } : {}),
            ...(image ? { image: [image] } : {}),
            ...(publishedAt && !Number.isNaN(publishedAt.getTime()) ? { datePublished: publishedAt.toISOString() } : {}),
            ...(updatedAt && !Number.isNaN(updatedAt.getTime()) ? { dateModified: updatedAt.toISOString() } : {})
        };
        const script = document.createElement("script");
        script.id = "route-seo-page-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema);
        document.head.append(script);
    }
}

function setNewsListMetadata(items) {
    const available = Array.isArray(items) && items.some((item) => item?.published !== false);
    const canonical = `${SEO_ORIGIN}/latest-news/`;
    document.title = "Latest Education News & Updates | StepInStudents";
    setMeta('meta[name="description"]', "name", "Read published education news and updates from StepInStudents, with links to related university, course and study-abroad information.");
    setMeta('meta[name="robots"]', "name", available ? "index, follow, max-image-preview:large" : "noindex, nofollow");
    setMeta('meta[property="og:title"]', "property", document.title);
    setMeta('meta[property="og:description"]', "property", "Read published education news and updates from StepInStudents.");
    setMeta('meta[property="og:url"]', "property", canonical);
    setMeta('meta[property="og:image"]', "property", `${SEO_ORIGIN}/images/banner/news-banner.jpeg`);
    setMeta('meta[property="og:image:alt"]', "property", "Education news and updates");
    setMeta('meta[name="twitter:title"]', "name", document.title);
    setMeta('meta[name="twitter:description"]', "name", "Read published education news and updates from StepInStudents.");
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:image"]', "name", `${SEO_ORIGIN}/images/banner/news-banner.jpeg`);
    document.querySelector('link[rel="canonical"]')?.remove();
    if (available) {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.append(link);
    }
    document.getElementById("route-seo-page-schema")?.remove();
    if (available) {
        const script = document.createElement("script");
        script.id = "route-seo-page-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: document.title,
            description: "Read published education news and updates from StepInStudents.",
            url: canonical,
            isPartOf: { "@type": "WebSite", name: "StepInStudents", url: `${SEO_ORIGIN}/` }
        });
        document.head.append(script);
    }
}

function renderNewsCard(news) {
    return `
        <article class="latest-news-summary-card">
            ${news.imageUrl ? `
                <div class="latest-news-summary-image">
                    <img
                        src="${escapeHtml(news.imageUrl)}"
                        alt="${escapeHtml(news.title)}"
                        loading="lazy"
                    >
                </div>
            ` : ""}

            <div class="latest-news-summary-body">
                <span class="latest-news-summary-category">
                    ${escapeHtml(news.category || "News")}
                </span>
                <h3>${escapeHtml(news.title)}</h3>
                ${news.subtitle ? `<p>${escapeHtml(news.subtitle)}</p>` : ""}
                <a href="/latest-news/${encodeURIComponent(news.id)}">
                    Read More →
                </a>
            </div>
        </article>
    `;
}

function renderDetail(news) {
    const sourceUrl = /^https?:\/\//i.test(String(news.sourceUrl || "")) ? String(news.sourceUrl) : "";
    return `
        <article class="latest-news-detail">
            ${news.imageUrl ? `
                <div class="latest-news-detail-image">
                    <img
                        src="${escapeHtml(news.imageUrl)}"
                        alt="${escapeHtml(news.title)}"
                    >
                </div>
            ` : ""}

            <span class="latest-news-summary-category">
                ${escapeHtml(news.category || "News")}
            </span>

            <h1>${escapeHtml(news.title)}</h1>

            ${news.subtitle ? `
                <p class="latest-news-subtitle">
                    ${escapeHtml(news.subtitle)}
                </p>
            ` : ""}

            <p class="latest-news-meta">
                ${escapeHtml(news.country || "")}
                ${news.createdAt ? ` • <time datetime="${escapeHtml(news.createdAt)}">${escapeHtml(formatDate(news.createdAt))}</time>` : ""}
            </p>

            <div class="latest-news-description">
                ${escapeHtml(news.description)}
            </div>
            ${sourceUrl ? `<p class="latest-news-source">Source: <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">View the original source</a></p>` : ""}
        </article>
    `;
}

export default function LatestNewsPage(newsId = "") {
    setTimeout(async () => {
        const container = document.querySelector("[data-latest-news-content]");
        const moreContainer = document.querySelector("[data-latest-news-more]");

        if (!container || !moreContainer) {
            return;
        }

        try {
            const allNewsResponse = await getPublishedNews();
            const allNews = Array.isArray(allNewsResponse) ? allNewsResponse : [];

            if (newsId) {
                const selected = await getPublishedNewsById(newsId);
                setNewsMetadata(selected, newsId);
                document.documentElement.dataset.routeStatus = "200";
                container.innerHTML = renderDetail(selected);

                const others = allNews.filter(
                    (item) => String(item.id) !== String(newsId)
                );

                moreContainer.innerHTML = others.length
                    ? others.map(renderNewsCard).join("")
                    : `<p>No other published news is available.</p>`;
            } else {
                setNewsListMetadata(allNews);
                document.documentElement.dataset.routeStatus = "200";
                container.innerHTML = `
                    <div class="latest-news-intro">
                        <span class="admin-dashboard-eyebrow">STEPINSTUDENTS NEWS</span>
                        <h1>Latest News</h1>
                        <p>All published education news and updates from StepInStudents.</p>
                    </div>
                `;

                moreContainer.innerHTML = allNews.length
                    ? allNews.map(renderNewsCard).join("")
                    : `<p>No published news is available yet.</p>`;
            }
        } catch (error) {
            console.error("Failed to load latest news:", error);
            setNewsMetadata(null, newsId);
            document.documentElement.dataset.routeStatus = "404";
            container.innerHTML = `
                <div class="latest-news-detail">
                    <h1>News Not Available</h1>
                    <p>${escapeHtml(error.message || "Unable to load this news item.")}</p>
                </div>
            `;
            moreContainer.innerHTML = "";
        }
    }, 0);

    return `
        <main class="latest-news-page">
            <div class="latest-news-container">
                <div class="admin-dashboard-header">
                    <div>
                        <a href="/">← Back to Home</a>
                    </div>
                </div>

                <div data-latest-news-content></div>

                <section class="latest-news-more">
                    <h2>${newsId ? "Other Latest News" : "All Latest News"}</h2>
                    <div class="latest-news-card-grid" data-latest-news-more></div>
                </section>
            </div>
        </main>
    `;
}
