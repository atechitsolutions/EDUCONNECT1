export default function Hero() {
    return `
        <section
            class="hero"
            aria-labelledby="hero-title"
        >

            <!-- =====================================================
                 PREMIUM BACKGROUND OVERLAY
                 This stays behind all interactive content
            ====================================================== -->

            <div
                class="hero-overlay"
                aria-hidden="true"
            ></div>


            <!-- =====================================================
                 HERO CONTENT
            ====================================================== -->

            <div class="hero-content">


                <!-- =================================================
                     PLATFORM LABEL
                ================================================== -->

                <div class="hero-badge">

                    <span
                        class="hero-badge-dot"
                        aria-hidden="true"
                    ></span>

                    India's Education Discovery Platform for Schools, Colleges & Universities

                </div>


                <!-- =================================================
                     MAIN HEADING
                ================================================== -->

                <h1
                    id="hero-title"
                    class="hero-title"
                >

                   Explore. Compare.
                   <span>
                       Find the Right Education.
                   </span>

                </h1>


                <!-- =================================================
                     DESCRIPTION
                ====================================================== -->

                <p class="hero-description">

                    Find top schools, colleges, universities, courses,
                    scholarships, study abroad programs, education
                    news and career opportunities in India — all in one place.

                </p>


                <!-- =================================================
                     EDUCATION SEARCH
                ================================================== -->

                <div class="institution-search-widget">
                    <form
                        class="hero-search"
                        role="search"
                        action="/"
                        method="get"
                        aria-label="Search EduConnect"
                        data-institution-search
                        data-search-suggestions-id="home-institution-suggestions"
                        data-search-results-id="home-institution-results"
                    >

                    <div
                        class="hero-search-icon"
                        aria-hidden="true"
                    >
                        🔍
                    </div>


                    <label
                        class="sr-only"
                        for="hero-search-input"
                    >

                    </label>


                    <input
                        id="hero-search-input"
                        name="q"
                        type="search"
                        placeholder="Search schools, colleges, universities, courses, scholarships..."
                        aria-label="Search schools, colleges, universities, courses and education opportunities"
                        autocomplete="off"
                        enterkeyhint="search"
                    />


                    <button
                        type="submit"
                        class="hero-search-btn"
                        aria-label="Search EduConnect"
                    >
                        Search
                    </button>

                    </form>

                    <div
                        id="home-institution-suggestions"
                        class="institution-search-suggestions-list"
                        role="listbox"
                        aria-label="Matching institutions"
                        hidden
                    ></div>

                    <section
                        id="home-institution-results"
                        class="institution-search-results"
                        aria-live="polite"
                        hidden
                    ></section>
                </div>


                <!-- =================================================
                     QUICK SEARCH OPTIONS
                ================================================== -->

                <nav
                    class="hero-quick-links"
                    aria-label="Popular school, college, university and education searches"
                >

                    <span>
                        Popular:
                    </span>


                    <button
                        type="button"
                        data-search-query="colleges"
                        aria-label="Search colleges"
                    >
                        Colleges
                    </button>


                    <button
                        type="button"
                        data-search-query="universities"
                        aria-label="Search universities"
                    >
                        Universities
                    </button>


                    <button
                        type="button"
                        data-search-query="courses"
                        aria-label="Search courses"
                    >
                        Courses
                    </button>


                    <button
                        type="button"
                        data-search-query="scholarships"
                        aria-label="Search scholarships"
                    >
                        Scholarships
                    </button>


                    <button
                        type="button"
                        data-search-query="study abroad"
                        aria-label="Search study abroad programs"
                    >
                        Study Abroad
                    </button>

                </nav>


                <!-- =================================================
                     MAIN ACTION BUTTONS
                ================================================== -->

                <div class="hero-buttons">


                    <button
                        type="button"
                        class="primary-btn hero-primary-btn"
                        data-action="explore-education"
                    >

                        Explore Schools, Colleges & Universities

                        <span aria-hidden="true">
                            →
                        </span>

                    </button>


                    <button
                        type="button"
                        class="secondary-btn hero-secondary-btn"
                        data-action="compare-colleges"
                    >

                        Compare Top Colleges in India

                    </button>

                </div>


                <!-- =================================================
                     PLATFORM STATISTICS

                     Keep these values only if they are supported
                     by actual EDUCONNECT data.
                ================================================== -->

                <div
                    class="hero-stats"
                    aria-label="EduConnect platform information"
                >

                    <div class="hero-stat">

                        <strong>
                            10,000+
                        </strong>

                        <span>
                            Institutions
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            5,000+
                        </strong>

                        <span>
                            Courses
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            1,000+
                        </strong>

                        <span>
                            Scholarships
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            50+
                        </strong>

                        <span>
                            Study Destinations
                        </span>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 DECORATIVE GLOW
            ====================================================== -->

            <div
                class="hero-glow hero-glow-one"
                aria-hidden="true"
            ></div>

            <div
                class="hero-glow hero-glow-two"
                aria-hidden="true"
            ></div>


            <!-- =====================================================
                 SCROLL INDICATOR
            ====================================================== -->

            <div
                class="hero-scroll-indicator"
                aria-hidden="true"
            >

                <span>
                    Explore Education
                </span>

                <div class="hero-scroll-arrow">
                    ↓
                </div>

            </div>

        </section>
    `;
}