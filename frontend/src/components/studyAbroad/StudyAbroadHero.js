/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD HERO
 * ============================================================
 *
 * Purpose:
 * - Introduce the Study Abroad service
 * - Provide primary search/discovery
 * - Promote counselling
 * - Surface popular destinations
 * - Create strong SEO-relevant page content
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadHero() {
    const popularDestinations = [
        {
            name: "USA",
            code: "US",
            description: "Study in the USA: universities & courses"
        },
        {
            name: "UK",
            code: "UK",
            description: "Study in the UK: universities & courses"
        },
        {
            name: "Canada",
            code: "CA",
            description: "Study in Canada: courses & universities"
        },
        {
            name: "Australia",
            code: "AU",
            description: "Study in Australia: courses & universities"
        },
        {
            name: "Germany",
            code: "DE",
            description: "Study in Germany: courses & admissions"
        },
        {
            name: "Ireland",
            code: "IE",
            description: "Study in Ireland: courses & universities"
        }
    ];

    return `
        <section
            class="study-abroad-hero"
            id="study-abroad-hero"
            aria-labelledby="study-abroad-hero-title"
        >

            <!-- ==================================================
                 BACKGROUND DECORATION
            =================================================== -->

            <div
                class="study-abroad-hero-background"
                aria-hidden="true"
            >
                <div class="study-abroad-hero-grid"></div>

                <div class="study-abroad-hero-glow study-abroad-glow-one"></div>
                <div class="study-abroad-hero-glow study-abroad-glow-two"></div>

                <div class="study-abroad-hero-orbit study-abroad-orbit-one"></div>
                <div class="study-abroad-hero-orbit study-abroad-orbit-two"></div>
            </div>


            <!-- ==================================================
                 MAIN HERO CONTAINER
            =================================================== -->

            <div class="study-abroad-container">

                <div class="study-abroad-hero-layout">


                    <!-- ==================================================
                         LEFT CONTENT
                    =================================================== -->

                    <div class="study-abroad-hero-content">

                        <div class="study-abroad-hero-badge">
                            <span class="study-abroad-badge-dot"></span>

                            <span>
                                STUDY ABROAD • OVERSEAS EDUCATION
                            </span>
                        </div>


                        <h1 id="study-abroad-hero-title">

                            Study Abroad
                            <span>
                                Compare countries, courses & universities.
                            </span>

                        </h1>


                        <p class="study-abroad-hero-description">

                            Compare study abroad destinations from India. Explore universities and courses, check admission requirements and intakes, find scholarship options, and estimate tuition and living costs before planning your application.

                        </p>


                        <!-- ==================================================
                             SEARCH
                        =================================================== -->

                        <div class="institution-search-widget study-abroad-search-widget">
                            <form
                                class="study-abroad-search"
                                id="study-abroad-search-form"
                                role="search"
                                action="#study-abroad-results"
                                method="get"
                                data-institution-search
                                data-search-suggestions-id="study-abroad-institution-suggestions"
                                data-search-results-id="study-abroad-institution-results"
                            >

                            <div class="study-abroad-search-icon">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="11" cy="11" r="7"></circle>
                                    <path d="m20 20-3.5-3.5"></path>
                                </svg>
                            </div>


                            <div class="study-abroad-search-input-wrapper">

                                <label
                                    for="study-abroad-search"
                                    class="study-abroad-visually-hidden"
                                >
                                    Search universities, courses or countries
                                </label>

                                <input
                                    id="study-abroad-search"
                                    name="q"
                                    type="search"
                                    autocomplete="off"
                                    placeholder="Search country, university or course (e.g. Germany)..."
                                    aria-label="Search for a study abroad country, university or course"
                                />

                            </div>


                            <button
                                type="submit"
                                class="study-abroad-search-button"
                            >
                                <span>Search</span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>
                            </button>

                            </form>

                            <div
                                id="study-abroad-institution-suggestions"
                                class="institution-search-suggestions-list"
                                role="listbox"
                                aria-label="Matching institutions"
                                hidden
                            ></div>

                            <section
                                id="study-abroad-institution-results"
                                class="institution-search-results"
                                aria-live="polite"
                                hidden
                            ></section>
                        </div>


                        <!-- ==================================================
                             SEARCH SUGGESTIONS
                        =================================================== -->

                        <div class="study-abroad-search-suggestions">



                            <a href="#study-abroad-universities">
                                Universities
                            </a>

                            <a href="#study-abroad-course-explorer">
                                Courses
                            </a>

                            <a href="#study-abroad-scholarships">
                                Scholarships
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in the USA
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in the UK
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in Germany
                            </a>

                        </div>


                        <!-- ==================================================
                             PRIMARY ACTIONS
                        =================================================== -->

                        <div class="study-abroad-hero-actions">

                            <a
                                href="#"
                                class="study-abroad-primary-button"
                                onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                            >

                                <span>
                                    Get Free Counselling
                                </span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>

                            </a>


                            <a
                                href="#edu-study-nav"
                                class="study-abroad-secondary-button"
                                data-open-destinations
                            >
                                Explore Destinations
                            </a>

                        </div>


                        <!-- ==================================================
                             TRUST INDICATORS
                        =================================================== -->

                        <div class="study-abroad-hero-trust">

                            <div class="study-abroad-trust-item">

                                <strong>
                                    Global
                                </strong>

                                <span>
                                    study destinations
                                </span>

                            </div>


                            <div class="study-abroad-trust-divider"></div>


                            <div class="study-abroad-trust-item">

                                <strong>
                                    Course
                                </strong>

                                <span>
                                    and university options
                                </span>

                            </div>


                            <div class="study-abroad-trust-divider"></div>


                            <div class="study-abroad-trust-item">

                                <strong>
                                    Application
                                </strong>

                                <span>
                                    planning guidance
                                </span>

                            </div>

                        </div>

                    </div>


                    <!-- ==================================================
                         RIGHT HERO PANEL
                    =================================================== -->

                    <div class="study-abroad-hero-visual">

                        <div
                            class="study-abroad-hero-card"
                            aria-label="Study abroad planning overview"
                        >

                            <!-- CARD HEADER -->

                            <div class="study-abroad-card-header">

                                <div>
                                    <span>
                                        EDUCONNECT
                                    </span>

                                    <strong>
                                        Your Study Abroad Plan
                                    </strong>
                                </div>

                                <div class="study-abroad-card-status">
                                    <span></span>
                                    Explore
                                </div>

                            </div>


                            <!-- PROGRESS -->

                            <div class="study-abroad-plan-progress">

                                <div class="study-abroad-progress-label">

                                    <span>
                                        Planning progress
                                    </span>

                                    <strong>
                                        25%
                                    </strong>

                                </div>

                                <div class="study-abroad-progress-bar">
                                    <span></span>
                                </div>

                            </div>


                            <!-- PLANNING STEPS -->

                            <div class="study-abroad-plan-list">

                                <div class="study-abroad-plan-item active">

                                    <div class="study-abroad-plan-number">
                                        01
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Choose your destination
                                        </strong>

                                        <span>
                                            Compare countries and study options
                                        </span>

                                    </div>

                                    <div class="study-abroad-plan-check">
                                        ✓
                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        02
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Find your course
                                        </strong>

                                        <span>
                                            Discover programs matching your goals
                                        </span>

                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        03
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Shortlist universities
                                        </strong>

                                        <span>
                                            Compare institutions and requirements
                                        </span>

                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        04
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Prepare your application
                                        </strong>

                                        <span>
                                            Documents, tests and deadlines
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <!-- CARD FOOTER -->

                            <div class="study-abroad-card-footer">

                                <div class="study-abroad-card-footer-icon">

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="9"></circle>
                                        <path d="M12 7v5l3 2"></path>
                                    </svg>

                                </div>

                                <div>
                                    <strong>
                                        Start planning early
                                    </strong>

                                    <span>
                                        Deadlines vary by university and course
                                    </span>
                                </div>

                            </div>

                        </div>


                        <!-- ==================================================
                             FLOATING DESTINATION CARD
                        =================================================== -->




                        </div>

                    </div>

                </div>


                <!-- ==================================================
                     POPULAR DESTINATIONS
                =================================================== -->

                <div
                    class="study-abroad-popular-destinations"
                    id="study-abroad-destinations"
                >

                    <div class="study-abroad-popular-header">

                        <div>

                            <span class="study-abroad-section-label">
                                EXPLORE DESTINATIONS
                            </span>

                            <h2>
                                Compare study abroad destinations for Indian students
                            </h2>

                        </div>

                        <a href="#study-abroad-country-comparison">
                            Compare destinations
                            <span>→</span>
                        </a>

                    </div>


                    <div class="study-abroad-destination-list">

                        ${popularDestinations
                            .map(
                                (destination) => `
                                    <a
                                        href="#study-abroad-country-comparison"
                                        class="study-abroad-destination-card"
                                        data-country="${destination.code}"
                                    >

                                        <div class="study-abroad-destination-country">

                                            <span
                                                class="study-abroad-country-code"
                                            >
                                                ${destination.code}
                                            </span>

                                            <div>

                                                <strong>
                                                    ${destination.name}
                                                </strong>

                                                <span>
                                                    ${destination.description}
                                                </span>

                                            </div>

                                        </div>

                                        <span class="study-abroad-destination-arrow">
                                            →
                                        </span>

                                    </a>
                                `
                            )
                            .join("")}

                    </div>

                </div>

            </div>

        </section>
    `;
}
