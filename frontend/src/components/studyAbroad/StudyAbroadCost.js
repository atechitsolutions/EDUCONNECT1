/* =========================================================
   STUDY ABROAD — COST
========================================================= */

function openStudyAbroadCountry(country) {

    const selectedCountry =
        country === "United Kingdom"
            ? "UK"
            : country;

    const navbar =
        document.querySelector(
            "#edu-study-nav"
        );

    const countryMenu =
        navbar?.querySelector(
            '[data-mega-menu="countries"]'
        );

    const countryTrigger =
        navbar?.querySelector(
            '[data-mega-trigger="countries"]'
        );

    if (!navbar || !countryMenu || !countryTrigger) {
        document
            .querySelector(
                "#study-abroad-country-comparison"
            )
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        return;
    }

    navbar.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    countryMenu.classList.add("is-open");
    countryTrigger.classList.add("is-open");
    countryTrigger.setAttribute(
        "aria-expanded",
        "true"
    );

    countryTrigger
        .closest(".edu-study-nav-item")
        ?.classList.add("is-open");

    countryMenu
        .querySelectorAll(".edu-country-item")
        .forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.country === selectedCountry
            );
        });

    countryMenu
        .querySelectorAll(".edu-country-panel")
        .forEach((panel) => {
            panel.classList.toggle(
                "active",
                panel.dataset.countryPanel === selectedCountry
            );
        });
}

window.openStudyAbroadCountry = openStudyAbroadCountry;

if (!window.__studyAbroadCostExploreHandler) {

    window.__studyAbroadCostExploreHandler = true;

    document.addEventListener("click", (event) => {

        const exploreButton =
            event.target.closest("[data-cost-country]");

        if (!exploreButton) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        openStudyAbroadCountry(
            exploreButton.dataset.costCountry
        );
    });
}

export default function StudyAbroadCost() {

    const costOptions = [

        {
            country: "USA",
            flag: "🇺🇸",
            tuition: "₹18L – ₹45L / year",
            living: "₹8L – ₹15L / year",
            accommodation: "₹4L – ₹9L / year",
            popularFor: "STEM • Business • Technology"
        },

        {
            country: "United Kingdom",
            flag: "🇬🇧",
            tuition: "₹15L – ₹35L / year",
            living: "₹8L – ₹14L / year",
            accommodation: "₹5L – ₹10L / year",
            popularFor: "Business • Law • Medicine"
        },

        {
            country: "Canada",
            flag: "🇨🇦",
            tuition: "₹12L – ₹30L / year",
            living: "₹7L – ₹12L / year",
            accommodation: "₹4L – ₹8L / year",
            popularFor: "IT • Business • Engineering"
        },

        {
            country: "Australia",
            flag: "🇦🇺",
            tuition: "₹14L – ₹32L / year",
            living: "₹8L – ₹14L / year",
            accommodation: "₹5L – ₹10L / year",
            popularFor: "Business • IT • Healthcare"
        },

        {
            country: "Germany",
            flag: "🇩🇪",
            tuition: "Low / No tuition at many public universities",
            living: "₹7L – ₹11L / year",
            accommodation: "₹3L – ₹7L / year",
            popularFor: "Engineering • Technology"
        },

        {
            country: "France",
            flag: "🇫🇷",
            tuition: "₹4L – ₹15L / year",
            living: "₹6L – ₹10L / year",
            accommodation: "₹3L – ₹7L / year",
            popularFor: "Business • Arts • Fashion"
        }

    ];


    return `

        <!-- =====================================================
             STUDY ABROAD COST
        ====================================================== -->

        <section
            class="study-abroad-cost"
            id="study-abroad-cost"
        >


            <div class="study-abroad-cost-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-cost-header">


                    <div class="study-abroad-section-eyebrow">
                        PLAN YOUR BUDGET
                    </div>


                    <h2>

                        Study Abroad Costs
                        <span> & Living Expenses</span>

                    </h2>


                    <p>

                        Estimate the cost of studying abroad from India by comparing tuition, accommodation and living expenses across destinations. Actual costs vary by university, course, city and study duration; confirm current fees with the university and official sources before applying.

                    </p>


                </div>


                <!-- =================================================
                     COST FILTERS
                ================================================== -->

                <div class="study-abroad-cost-filters">


                    <button
                        type="button"
                        class="cost-filter active"
                    >
                        All Destinations
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Affordable
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Popular
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Low Tuition
                    </button>


                </div>


                <!-- =================================================
                     COST GRID
                ================================================== -->

                <div class="study-abroad-cost-grid">


                    ${costOptions.map((country) => `

                        <article
                            class="study-abroad-cost-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="cost-card-header">


                                <div class="cost-card-country">


                                    <span
                                        class="cost-card-flag"
                                        aria-hidden="true"
                                    >
                                        ${country.flag}
                                    </span>


                                    <div>

                                        <span>
                                            STUDY DESTINATION
                                        </span>

                                        <h3>
                                            ${country.country}
                                        </h3>

                                    </div>


                                </div>


                                <button
                                    type="button"
                                    class="cost-card-save"
                                    aria-label="Save ${country.country}"
                                >
                                    ♡
                                </button>


                            </div>


                            <!-- =================================================
                                 COST DETAILS
                            ================================================== -->

                            <div class="cost-card-details">


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        🎓
                                    </span>


                                    <div>

                                        <span>
                                            Tuition
                                        </span>

                                        <strong>
                                            ${country.tuition}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        🏠
                                    </span>


                                    <div>

                                        <span>
                                            Accommodation
                                        </span>

                                        <strong>
                                            ${country.accommodation}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        💳
                                    </span>


                                    <div>

                                        <span>
                                            Living Expenses
                                        </span>

                                        <strong>
                                            ${country.living}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        📚
                                    </span>


                                    <div>

                                        <span>
                                            Popular For
                                        </span>

                                        <strong>
                                            ${country.popularFor}
                                        </strong>

                                    </div>


                                </div>


                            </div>


                            <!-- =================================================
                                 COST ACTION
                            ================================================== -->

                           <button
                               type="button"
                               class="cost-explore-button"
                               data-cost-country="${country.country === "United Kingdom" ? "UK" : country.country}"
                               onclick="window.openStudyAbroadCountry('${country.country === "United Kingdom" ? "UK" : country.country}')"
                           >
                               Explore ${country.country}
                               <span>→</span>
                           </button>


                        </article>

                    `).join("")}


                </div>


                <!-- =================================================
                     COST NOTE
                ================================================== -->

                <div class="study-abroad-cost-note">


                    <span
                        class="study-abroad-cost-note-icon"
                        aria-hidden="true"
                    >
                        💡
                    </span>


                    <div>

                        <strong>
                            Plan your complete study abroad budget
                        </strong>

                        <p>
                            These figures are indicative planning estimates, not a quote. Actual costs vary by university, course, city, exchange rates, lifestyle and study duration. Confirm current fees directly with each university.
                        </p>

                    </div>


                </div>


                <!-- =================================================
                     COST CTA
                ================================================== -->

                <div class="study-abroad-cost-footer">


                    <div class="study-abroad-cost-footer-content">


                        <strong>
                            Want to estimate your total expenses?
                        </strong>


                        <span>
                            Compare destinations and plan your
                            study abroad budget.
                        </span>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-cost-button"
                    >

                        Calculate Your Cost

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
