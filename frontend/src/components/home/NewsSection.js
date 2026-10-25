import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import { getPublishedNews } from "../../services/homeContent.js";

function createNewsCard(news, index) {
    return InstitutionCard({
        item: {
            id: news.id,
            rank: String(index + 1).padStart(2, "0"),
            name: news.title,
            category: news.category,
            location: news.country || "India",
            program: news.subtitle || "Education News",
            ranking: news.description || "",
            highlight: "Published on EduConnect",
            image: news.imageUrl || "",
            actionLabel: "Read Full News",
            showCompare: false
        },
        type: "education-news"
    });
}

function bindNewsNavigation(container) {
    if (!container || container.dataset.newsBound === "true") {
        return;
    }

    container.dataset.newsBound = "true";

    container.addEventListener("click", (event) => {
        const button = event.target.closest(
            ".institution-card-action[data-action='details']"
        );

        if (!button || !container.contains(button)) {
            return;
        }

        const id = button
            .closest(".institution-card")
            ?.dataset.institutionId;

        if (!id) {
            return;
        }

        event.preventDefault();
        window.location.href = `/latest-news/${encodeURIComponent(id)}`;
    });
}

export function NewsSection() {
    const content = `
        <div class="news-section">
            <div class="news-intro">
                <div class="news-intro-content">
                    <span class="news-eyebrow">
                        📰 EDUCATION NEWS &amp; UPDATES
                    </span>
                    <h2>Latest Education News</h2>
                    <p>
                        Stay updated with admissions, scholarships, placements,
                        education policy and study-abroad developments.
                    </p>
                </div>

                <div class="news-stat">
                    <strong data-home-news-count>0</strong>
                    <span>Published<br>News Updates</span>
                </div>
            </div>

            <div class="news-carousel">
                <div class="news-viewport">
                    <div class="news-track" data-home-news-track>
                        <div class="study-abroad-loading">
                            Loading latest news...
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="news-next"
                    aria-label="Show next news"
                >
                    <span>→</span>
                </button>
            </div>
        </div>
    `;

    setTimeout(async () => {
        const track = document.querySelector("[data-home-news-track]");
        const count = document.querySelector("[data-home-news-count]");

        if (!track) {
            return;
        }

        try {
            const response = await getPublishedNews();
            const items = Array.isArray(response) ? response : [];

            if (count) {
                count.textContent = String(items.length);
            }

            if (!items.length) {
                track.innerHTML = `
                    <div class="study-abroad-loading">
                        No published news is available yet.
                    </div>
                `;
                return;
            }

            track.innerHTML = items
                .map(createNewsCard)
                .join("");

            bindNewsNavigation(track);
        } catch (error) {
            console.error("Failed to load homepage news:", error);
            track.innerHTML = `
                <div class="study-abroad-loading">
                    Unable to load latest news right now.
                </div>
            `;
        }
    }, 0);

    return Section({
        id: "news",
        title: "",
        subtitle: "",
        content
    });
}

export default NewsSection;
