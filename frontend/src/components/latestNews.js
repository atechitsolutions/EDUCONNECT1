import { getPublishedNews, getPublishedNewsById } from "../services/homeContent.js";

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
                ${news.createdAt ? ` • ${escapeHtml(formatDate(news.createdAt))}` : ""}
            </p>

            <div class="latest-news-description">
                ${escapeHtml(news.description)}
            </div>
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
                container.innerHTML = renderDetail(selected);

                const others = allNews.filter(
                    (item) => String(item.id) !== String(newsId)
                );

                moreContainer.innerHTML = others.length
                    ? others.map(renderNewsCard).join("")
                    : `<p>No other published news is available.</p>`;
            } else {
                container.innerHTML = `
                    <div class="latest-news-intro">
                        <span class="admin-dashboard-eyebrow">EDUCONNECT NEWS</span>
                        <h1>Latest News</h1>
                        <p>All published education news and updates from EduConnect.</p>
                    </div>
                `;

                moreContainer.innerHTML = allNews.length
                    ? allNews.map(renderNewsCard).join("")
                    : `<p>No published news is available yet.</p>`;
            }
        } catch (error) {
            console.error("Failed to load latest news:", error);
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
