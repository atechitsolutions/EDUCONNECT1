const countries = [
    {
        id: "usa",
        name: "USA",
        flag: "🇺🇸",
        universities: "4,000+",
        tuition: "From ₹18L/year",
        popularFor: "STEM • Business • Technology",
        duration: "1–2 Years",
        workOpportunity: "OPT available"
    },
    {
        id: "uk",
        name: "United Kingdom",
        flag: "🇬🇧",
        universities: "160+",
        tuition: "From ₹15L/year",
        popularFor: "Business • Law • Medicine",
        duration: "1 Year",
        workOpportunity: "Graduate Route"
    },
    {
        id: "canada",
        name: "Canada",
        flag: "🇨🇦",
        universities: "100+",
        tuition: "From ₹12L/year",
        popularFor: "IT • Business • Engineering",
        duration: "1–2 Years",
        workOpportunity: "PGWP eligible programs"
    },
    {
        id: "australia",
        name: "Australia",
        flag: "🇦🇺",
        universities: "40+",
        tuition: "From ₹14L/year",
        popularFor: "Business • IT • Healthcare",
        duration: "1–2 Years",
        workOpportunity: "Post-study work options"
    },
    {
        id: "germany",
        name: "Germany",
        flag: "🇩🇪",
        universities: "400+",
        tuition: "Low / No tuition at many public universities",
        popularFor: "Engineering • Technology",
        duration: "1–2 Years",
        workOpportunity: "Post-study work options"
    },
    {
        id: "france",
        name: "France",
        flag: "🇫🇷",
        universities: "3,500+",
        tuition: "From ₹4L/year",
        popularFor: "Business • Arts • Fashion",
        duration: "1–2 Years",
        workOpportunity: "Post-study options"
    }
];

export default function CountryComparison() {
    if (!window.__countryExploreHandlerLoaded) {
        window.__countryExploreHandlerLoaded = true;

        document.addEventListener("click", (event) => {
            const exploreButton = event.target.closest(
                "[data-country-explore]"
            );

            if (!exploreButton) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const countryMap = {
                usa: "USA",
                uk: "UK",
                canada: "Canada",
                australia: "Australia",
                germany: "Germany",
                france: "France"
            };

            const country =
                countryMap[exploreButton.dataset.countryExplore];

            const navbar =
                document.querySelector("#edu-study-nav");

            if (!navbar || !country) {
                console.error("Navbar or country was not found");
                return;
            }

            navbar.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            const megaMenu =
                navbar.querySelector(
                    '[data-mega-menu="countries"]'
                );

            const megaTrigger =
                navbar.querySelector(
                    '[data-mega-trigger="countries"]'
                );

            if (megaMenu && megaTrigger) {
                megaMenu.classList.add("is-open");
                megaTrigger.classList.add("is-open");
                megaTrigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

                const navItem =
                    megaTrigger.closest(".edu-study-nav-item");

                navItem?.classList.add("is-open");

                megaMenu
                    .querySelectorAll(".edu-country-item")
                    .forEach((button) => {
                        button.classList.toggle(
                            "active",
                            button.dataset.country === country
                        );
                    });

                megaMenu
                    .querySelectorAll(".edu-country-panel")
                    .forEach((panel) => {
                        panel.classList.toggle(
                            "active",
                            panel.dataset.countryPanel === country
                        );
                    });

                return;
            }

            const countryMenu =
                navbar.querySelector("[data-country-menu]");

            const countryTrigger =
                navbar.querySelector("[data-countries-trigger]");

            if (countryMenu && countryTrigger) {
                countryMenu.hidden = false;
                countryTrigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

                countryMenu
                    .querySelectorAll("[data-nav-country]")
                    .forEach((button) => {
                        button.classList.toggle(
                            "active",
                            button.dataset.navCountry ===
                                exploreButton.dataset.countryExplore
                        );
                    });

                countryMenu
                    .querySelectorAll("[data-nav-country-panel]")
                    .forEach((panel) => {
                        panel.hidden =
                            panel.dataset.navCountryPanel !==
                            exploreButton.dataset.countryExplore;
                    });
            }
        });
    }
    return `
        <section
            class="study-abroad-country-comparison"
            id="study-abroad-country-comparison"
        >
            <div class="study-abroad-country-comparison-container">

                <header class="study-abroad-country-comparison-header">
                    <div class="study-abroad-section-eyebrow">
                        COMPARE DESTINATIONS
                    </div>

                    <h2>
                        Compare Study Abroad <span>Destinations</span>
                    </h2>

                    <p>
                        Compare popular study abroad destinations for Indian students. Review university options, common course areas and indicative tuition, then check current admission requirements, fees and visa guidance with each university and official authority.
                    </p>
                </header>

                <div
                    class="study-abroad-country-selector"
                    role="tablist"
                >
                    ${countries.map((country, index) => `
                        <button
                            type="button"
                            class="country-selector-button ${index === 0 ? "active" : ""}"
                            data-country-select="${country.id}"
                            aria-selected="${index === 0}"
                            role="tab"
                        >
                            ${country.flag}
                            ${country.id === "uk" ? "UK" : country.name}
                        </button>
                    `).join("")}
                </div>

                <div
                    class="study-abroad-country-comparison-grid"
                    data-country-comparison-grid
                >
                    ${countries.map((country) => `
                        <article
                            class="study-abroad-country-comparison-card"
                            data-country-comparison-card
                            data-country="${country.id}"
                        >
                            <div class="country-comparison-card-header">
                                <div class="country-comparison-country">
                                    <span class="country-comparison-flag">
                                        ${country.flag}
                                    </span>

                                    <div>
                                        <span>STUDY DESTINATION</span>
                                        <h3>${country.name}</h3>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    class="country-comparison-save"
                                    aria-label="Save ${country.name}"
                                    aria-pressed="false"
                                >
                                    ♡
                                </button>
                            </div>

                            <div class="country-comparison-details">
                                <div class="country-comparison-detail">
                                    <span>🎓</span>
                                    <div>
                                        <span>Universities</span>
                                        <strong>${country.universities}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>💰</span>
                                    <div>
                                        <span>Tuition</span>
                                        <strong>${country.tuition}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>📚</span>
                                    <div>
                                        <span>Popular For</span>
                                        <strong>${country.popularFor}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>⏱</span>
                                    <div>
                                        <span>Typical Duration</span>
                                        <strong>${country.duration}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>💼</span>
                                    <div>
                                        <span>Work Opportunity</span>
                                        <strong>${country.workOpportunity}</strong>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#edu-study-nav"
                                class="country-comparison-explore-button"
                                data-country-explore="${country.id}"
                            >
                                Explore ${country.name}
                                <span aria-hidden="true">→</span>
                            </a>
                        </article>
                    `).join("")}
                </div>

                <footer class="study-abroad-country-comparison-footer">
                    <a
                        href="#edu-study-nav"
                        class="country-comparison-button"
                        data-open-destinations
                    >
                        Explore Destinations →
                    </a>
                </footer>

            </div>
        </section>
    `;
}
