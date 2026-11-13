import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import { getPublishedNews } from "../../services/homeContent.js";
import { initNewsCarousel } from "../../assets/js/newsCarousel.js";

function createNewsCard(news, index) {
    return InstitutionCard({
        item: {
            id: "",
            rank: String(index + 1).padStart(2, "0"),
            name: news.title,
            category: news.category,
            location: news.country || "India",
            program: news.subtitle || "Education News",
            ranking: news.description || "",
            highlight: news.imageCredit ? `<small class="news-image-credit">${news.imageCredit}</small>` : "Published on StepInStudents",
            image: news.imageUrl || "",
            actionLabel: news.actionLabel || "Read Full News",
            actionHref: news.sourceUrl || "",
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

            <p class="news-all-link"><a href="/latest-news">Browse all published education news →</a></p>

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
            const publishedItems = Array.isArray(response) ? response : [];
            const currentStories = [
                {
                    title: "MIT develops faster, more reliable AI models for climate prediction",
                    subtitle: "November 12, 2026 · MIT News",
                    description: "A new training method helps climate emulators adapt to scenarios they did not see during training, using far less data.",
                    category: "Research & technology",
                    country: "United States",
                    imageUrl: "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202611/MIT-Climate-Emulation-01_0.jpg?itok=G0a7yGB9",
                    sourceUrl: "https://news.mit.edu/2026/new-research-could-lead-faster-trustworthy-ai-models-climate-prediction-1112",
                    actionLabel: "Read at MIT News",
                    imageCredit: "Image: UCAR; MIT News"
                },
                {
                    title: "MIT and Northeastern researchers design tougher nature-inspired materials",
                    subtitle: "November 11, 2026 · MIT News",
                    description: "A network-inspired material design could improve impact absorption in products such as helmets, packaging, and armor.",
                    category: "University research",
                    country: "United States",
                    imageUrl: "https://news.mit.edu/sites/default/files/download/202611/MIT-MultiMeta-01-Press.jpg",
                    sourceUrl: "https://news.mit.edu/2026/engineers-design-stronger-resilient-nature-inspired-metamaterials-1111",
                    actionLabel: "Read at MIT News",
                    imageCredit: "Photo: Rishi Kommalapati / MIT"
                },
                {
                    title: "MIT welcomes seven new faculty to its College of Computing",
                    subtitle: "November 10, 2026 · MIT News",
                    description: "New faculty will work across AI, quantum computing, environmental science, human-AI interaction, and economics.",
                    category: "Campus & education",
                    country: "United States",
                    imageUrl: "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202610/26-27%20SCC%20Faculty%20copy.png?itok=cxHnBrCa",
                    sourceUrl: "https://news.mit.edu/2026/mit-schwarzman-college-computing-welcomes-new-faculty-1110",
                    actionLabel: "Read at MIT News",
                    imageCredit: "Photos courtesy of the faculty / MIT"
                }
            ];
            const items = [...currentStories, ...publishedItems];

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
            track.querySelectorAll(".institution-card-visual > img").forEach((image) => {
                image.addEventListener("error", () => { image.hidden = true; }, { once: true });
            });

            bindNewsNavigation(track);
            initNewsCarousel();
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
