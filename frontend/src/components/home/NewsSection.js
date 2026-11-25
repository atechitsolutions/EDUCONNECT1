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
            highlight: news.imageCredit
                ? `<small class="news-image-credit">${news.imageCredit}</small>`
                : "Published on StepInStudents",
            image: news.imageUrl || "",
            actionLabel: news.actionLabel || "Read Full News",
            actionHref: news.sourceUrl || "",
            showCompare: false,
        },
        type: "education-news",
    });
}

function bindNewsNavigation(container) {
    if (!container || container.dataset.newsBound === "true") {
        return;
    }

    container.dataset.newsBound = "true";

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".institution-card-action[data-action='details']");

        if (!button || !container.contains(button)) {
            return;
        }

        const id = button.closest(".institution-card")?.dataset.institutionId;

        if (!id) {
            return;
        }

        event.preventDefault();
        window.location.href = `/latest-news/${encodeURIComponent(id)}`;
    });
}

const MIT = "https://news.mit.edu";

// Hand-picked stories shown before the ones published from the admin panel.
const CURRENT_STORIES = [
    {
        title: "Electric seaglider created by MIT alumni takes flight",
        subtitle: "November 25, 2026 · MIT News",
        description:
            "Regent Craft, founded by two MIT alumni, has built a seaglider " +
            "that floats, hydrofoils and flies just above the ocean surface.",
        category: "Alumni & innovation",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/MIT-Regent-Seaglider-01.jpg`,
        sourceUrl: `${MIT}/2026/electric-seaglider-from-mit-alumni-takes-flight-1125`,
        actionLabel: "Read more ",

    },
    {
        title: "Arianna Doss: Prescribing change",
        subtitle: "November 24, 2026 · MIT News",
        description:
            "MIT senior and 2027 Rhodes Scholar Arianna Doss is preparing " +
            "for a career as a physician and policymaker focused on health equity.",
        category: "Scholarships & awards",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/MIT-AriannaDoss-A1-Press.jpg`,
        sourceUrl: `${MIT}/2026/arianna-doss-prescribes-change-1124`,
        actionLabel: "Read more ",

    },
    {
        title: "AI technique helps engineers design analog chips faster and cheaper",
        subtitle: "November 23, 2026 · MIT News",
        description:
            "A new training method called SLIC lets a small language model " +
            "design analog circuits about as well as much larger AI models.",
        category: "University research",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/MIT-AnalogOptimize-01-Press.jpg`,
        sourceUrl: `${MIT}/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123`,
        actionLabel: "Read more ",

    },
    {
        title: "Student leaders: Q&A with peer advisor Stephanie Han",
        subtitle: "November 23, 2026 · MIT News",
        description:
            "A senior in the Undergraduate Advising Center explains how " +
            "peer advisors help first-year students plan their academic paths.",
        category: "Student life",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/stephanie-han-mit-A1.jpg`,
        sourceUrl: `${MIT}/2026/mit-student-leaders-qa-peer-advisor-stephanie-han-1123`,
        actionLabel: "Read more ",

    },
    {
        title: "Following the “mathocalypse,” mathematicians consider the future",
        subtitle: "November 20, 2026 · MIT News",
        description:
            "Leading mathematicians discussed how AI is changing research " +
            "norms and what it means for the people who do mathematics.",
        category: "Higher education",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/MIT-Math-AI-01-press.jpg`,
        sourceUrl: `${MIT}/2026/following-mathocalypse-mathematicians-consider-future-1120`,
        actionLabel: "Read more ",

    },
    {
        title: "Designing the next chapter for professional athletes",
        subtitle: "November 18, 2026 · MIT News",
        description:
            "MIT Sloan student Collin Johnson worked with DesignX faculty " +
            "to create Founders Academy, a venture-building program for athletes.",
        category: "Executive education",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202611/mit-designx-Founders-Academy.JPG`,
        sourceUrl: `${MIT}/2026/founders-academy-designing-next-chapter-professional-athletes-1118`,
        actionLabel: "Read more ",

    },
    {
        title: "Building blocks for a greener skyline",
        subtitle: "November 18, 2026 · MIT News",
        description:
            "Recent MIT graduate Miana Smith designs self-correcting blocks " +
            "that simple robots can use to build large, sustainable structures.",
        category: "Student research",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202610/mit-meche-miana-smith.jpg`,
        sourceUrl: `${MIT}/2026/building-blocks-for-greener-skyline-miana-smith-1118`,
        actionLabel: "Read more ",

    },
    {
        title: "Putting a spotlight on AI, society, and humanity",
        subtitle: "November 17, 2026 · MIT News",
        description:
            "MIT scholars are studying how AI is reshaping the human " +
            "experience, classroom learning and higher education.",
        category: "AI in education",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202610/mithic-ai-brain.jpg`,
        sourceUrl: `${MIT}/2026/putting-spotlight-ai-society-humanity-1117`,
        actionLabel: "Read more ",

    },
    {
        title: "“Somebody’s got to do it. Why not me?”",
        subtitle: "November 10, 2026 · MIT News",
        description:
            "Senior Andrew Voelsing studies climate system science and " +
            "engineering while training to become a Navy officer through NROTC.",
        category: "Campus & careers",
        country: "United States",
        imageUrl: "https://web.mit.edu/files/images/202611/MITAndrew-Voelsing-A1-Press.jpg",
        sourceUrl: `${MIT}/2026/somebodys-got-to-do-it-why-not-me-andrew-voelsing-1110`,
        actionLabel: "Read more ",

    },
    {
        title: "A home a world away from home",
        subtitle: "September 21, 2026 · MIT News",
        description:
            "An international graduate student family describes the " +
            "community they found with other MIT student parents.",
        category: "Graduate student life",
        country: "United States",
        imageUrl: `${MIT}/sites/default/files/images/202609/mit-grad-student-maurer.jpg`,
        sourceUrl: `${MIT}/2026/home-world-away-home-0921`,
        actionLabel: "Read more ",

    },
];

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
            const items = [...CURRENT_STORIES, ...publishedItems];

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

            track.innerHTML = items.map(createNewsCard).join("");
            track.querySelectorAll(".institution-card-visual > img").forEach((image) => {
                image.addEventListener(
                    "error",
                    () => {
                        image.hidden = true;
                    },
                    { once: true },
                );
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
        content,
    });
}

export default NewsSection;