const bannerSections = [
    { root: "#education-categories", selector: ".categories-compact-header", content: null, image: ".compact-category-image img", icon: "✦" },
    { root: "#play-school", selector: ".early-learning-intro", content: ".early-learning-intro-content", image: ".institution-card-visual img", icon: "🧸" },
    { root: "#pre-school", selector: ".early-learning-intro", content: ".early-learning-intro-content", image: ".institution-card-visual img", icon: "🎈" },
    { root: "#schools", selector: ".early-learning-intro", content: ".early-learning-intro-content", image: ".institution-card-visual img", icon: "🏫", keep: ".school-region-search-inline" },
    { root: "#boarding-schools", selector: ".boarding-schools-intro", content: ".boarding-schools-intro-content", image: ".institution-card-visual img", icon: "🎓" },
    { root: "#colleges", selector: ".ug-pg-intro", content: ".ug-pg-intro-content", image: ".institution-card-visual img", icon: "🎓" },
    { root: "#online-education", selector: ".online-education-intro", content: ".online-education-intro-content", image: ".institution-card img", icon: "💻" },
    { root: "#news", selector: ".news-intro", content: ".news-intro-content", image: "img", icon: "📰" },
    { root: "#study-abroad", selector: ".study-abroad-intro", content: ".study-abroad-intro-content", image: "img", icon: "🌍" },
    { root: "#rankings", selector: ".rankings-intro", content: ".rankings-intro-content", image: ".institution-card img", icon: "✦" },
    { root: "#student-reviews", selector: ".video-reviews-header", content: ".video-reviews-heading-content", image: "video[poster], img", icon: "💬", keep: ".video-reviews-view-all" },
    { root: "#scholarships", selector: ".scholarship-intro", content: ".scholarship-intro-content", image: "img", icon: "✦" },
    { root: "#top-lists", selector: ".top-lists-intro", content: ".top-lists-intro-content", image: ".institution-card img", icon: "☷" },
    { root: "#institution-comparison", selector: ".institution-compare-heading", content: null, image: ".institution-card img", icon: "⇄" },
    { root: "#compare-college", selector: ".compare-college-intro", content: ".compare-college-intro-content", image: ".institution-card img", icon: "⇄" },
    { root: "#top-companies", selector: ".top-companies-intro", content: ".top-companies-intro-content", image: ".institution-card img", icon: "💼" },
    { root: "#education-loans", selector: ".loan-feature-panel", content: ".loan-feature-copy", image: "img", icon: "◇", keep: ".loan-actions" }
];

const cleanText = (value) => String(value || "").replace(/^\s*[^\p{L}\p{N}]+/u, "").trim();

export function initHomeSectionBanners() {
    if (!document.querySelector("#main-content")) return;

    bannerSections.forEach((config) => {
        const root = document.querySelector(config.root);
        const banner = root?.querySelector(config.selector);
        const content = config.content ? banner?.querySelector(config.content) : banner;
        const heading = content?.querySelector("h1, h2, h3");
        if (!root || !banner || !content || !heading || banner.dataset.compactBanner === "true") return;

        const eyebrow = content.querySelector("[class*='eyebrow'], [class*='label'], span") || content.querySelector("span");
        const eyebrowText = cleanText(eyebrow?.textContent) || "DISCOVER EDUCATION";
        const titleMarkup = heading.innerHTML;
        const headingTag = heading.tagName.toLowerCase();
        const preserved = config.keep ? root.querySelector(config.keep) : null;
        preserved?.remove();

        const sourceImage = config.image ? root.querySelector(config.image) : null;
        const imageUrl = sourceImage?.currentSrc || sourceImage?.src || sourceImage?.getAttribute("poster") || "";
        const imageAlt = sourceImage?.alt || `${cleanText(heading.textContent)} campus`;

        banner.classList.add("home-section-banner");
        banner.dataset.compactBanner = "true";
        banner.innerHTML = `
            <div class="home-section-banner-icon" aria-hidden="true"><span>${config.icon}</span></div>
            <div class="home-section-banner-copy">
                <span class="home-section-banner-eyebrow"><i aria-hidden="true"></i>${eyebrowText}</span>
                <${headingTag} class="home-section-banner-title">${titleMarkup}</${headingTag}>
            </div>
            <div class="home-section-banner-media" aria-hidden="true">
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" loading="lazy">` : `<span>${config.icon}</span>`}
            </div>`;

        if (preserved) {
            const actions = document.createElement("div");
            actions.className = "home-section-banner-actions";
            actions.append(preserved);
            banner.insertAdjacentElement("afterend", actions);
        }
    });
}

export default initHomeSectionBanners;
