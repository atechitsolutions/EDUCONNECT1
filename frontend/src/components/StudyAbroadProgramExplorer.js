/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD PROGRAM EXPLORER
 * ============================================================
 *
 * Purpose:
 * - University/program discovery
 * - Search and filtering UI
 * - Study abroad lead generation
 * - Future Spring Boot API integration
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadProgramExplorer() {

    /*
     * --------------------------------------------------------
     * DEMO PROGRAM DATA
     * --------------------------------------------------------
     *
     * This is presentation data only.
     *
     * Later this can be replaced with:
     *
     * GET /api/study-abroad/programs
     *
     * without changing the overall UI structure.
     */

    const programs = [
        {
            id: 1,
            university: "University Program",
            country: "USA",
            countryCode: "US",
            degree: "Master's",
            subject: "Computer Science",
            duration: "2 Years",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "POPULAR"
        },

        {
            id: 2,
            university: "University Program",
            country: "UK",
            countryCode: "UK",
            degree: "Master's",
            subject: "Data Science",
            duration: "1 Year",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "POPULAR"
        },

        {
            id: 3,
            university: "University Program",
            country: "Canada",
            countryCode: "CA",
            degree: "Bachelor's",
            subject: "Engineering",
            duration: "4 Years",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "FEATURED"
        },

        {
            id: 4,
            university: "University Program",
            country: "Australia",
            countryCode: "AU",
            degree: "Master's",
            subject: "Business & Management",
            duration: "2 Years",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "POPULAR"
        },

        {
            id: 5,
            university: "University Program",
            country: "Germany",
            countryCode: "DE",
            degree: "Master's",
            subject: "Engineering",
            duration: "2 Years",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "FEATURED"
        },

        {
            id: 6,
            university: "University Program",
            country: "Ireland",
            countryCode: "IE",
            degree: "Master's",
            subject: "Computer Science",
            duration: "1 Year",
            tuition: "Tuition varies",
            mode: "On Campus",
            badge: "POPULAR"
        }
    ];


    return `
        <section
            class="study-abroad-program-explorer"
            id="study-abroad-program-explorer"
            aria-labelledby="study-abroad-program-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     HEADER
                =================================================== -->

                <div class="study-abroad-section-header">

                    <div class="study-abroad-section-header-content">

                        <span class="study-abroad-section-eyebrow">
                            PROGRAM & UNIVERSITY SEARCH
                        </span>

                        <h2 id="study-abroad-program-title">
                            Find universities and programs that match your goals
                        </h2>

                        <p>
                            Search and narrow your study abroad options by
                            destination, degree, subject and study format.
                        </p>

                    </div>

                </div>


                <!-- ==================================================
                     SEARCH PANEL
                =================================================== -->

                <div class="study-abroad-program-search-panel">

                    <div class="study-abroad-program-search-heading">

                        <div>

                            <span>
                                SEARCH PROGRAMS
                            </span>

                            <h3>
                                Build your university shortlist
                            </h3>

                        </div>

                        <button
                            type="button"
                            class="study-abroad-clear-filters"
                            id="study-abroad-clear-filters"
                        >
                            Clear all
                        </button>

                    </div>


                    <form
                        id="study-abroad-program-filter-form"
                        class="study-abroad-program-filter-form"
                    >


                        <!-- SEARCH -->

                        <div
                            class="study-abroad-filter-field study-abroad-filter-search"
                        >

                            <label for="program-search">
                                Search
                            </label>

                            <div class="study-abroad-filter-input">

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="7"
                                    ></circle>

                                    <path
                                        d="m20 20-3.5-3.5"
                                    ></path>
                                </svg>

                                <input
                                    type="search"
                                    id="program-search"
                                    name="search"
                                    placeholder="Search university or subject..."
                                    autocomplete="off"
                                />

                            </div>

                        </div>


                        <!-- COUNTRY -->

                        <div class="study-abroad-filter-field">

                            <label for="program-country">
                                Destination
                            </label>

                            <select
                                id="program-country"
                                name="country"
                            >

                                <option value="">
                                    All destinations
                                </option>

                                <option value="USA">
                                    USA
                                </option>

                                <option value="UK">
                                    UK
                                </option>

                                <option value="Canada">
                                    Canada
                                </option>

                                <option value="Australia">
                                    Australia
                                </option>

                                <option value="Germany">
                                    Germany
                                </option>

                                <option value="Ireland">
                                    Ireland
                                </option>

                            </select>

                        </div>


                        <!-- DEGREE -->

                        <div class="study-abroad-filter-field">

                            <label for="program-degree">
                                Degree
                            </label>

                            <select
                                id="program-degree"
                                name="degree"
                            >

                                <option value="">
                                    All degrees
                                </option>

                                <option value="Bachelor's">
                                    Bachelor's
                                </option>

                                <option value="Master's">
                                    Master's
                                </option>

                                <option value="MBA">
                                    MBA
                                </option>

                                <option value="PhD">
                                    PhD
                                </option>

                            </select>

                        </div>


                        <!-- SUBJECT -->

                        <div class="study-abroad-filter-field">

                            <label for="program-subject">
                                Subject
                            </label>

                            <select
                                id="program-subject"
                                name="subject"
                            >

                                <option value="">
                                    All subjects
                                </option>

                                <option value="Computer Science">
                                    Computer Science
                                </option>

                                <option value="Data Science">
                                    Data Science
                                </option>

                                <option value="Engineering">
                                    Engineering
                                </option>

                                <option value="Business & Management">
                                    Business & Management
                                </option>

                            </select>

                        </div>


                        <!-- MODE -->

                        <div class="study-abroad-filter-field">

                            <label for="program-mode">
                                Study mode
                            </label>

                            <select
                                id="program-mode"
                                name="mode"
                            >

                                <option value="">
                                    All modes
                                </option>

                                <option value="On Campus">
                                    On Campus
                                </option>

                                <option value="Online">
                                    Online
                                </option>

                                <option value="Hybrid">
                                    Hybrid
                                </option>

                            </select>

                        </div>


                        <button
                            type="submit"
                            class="study-abroad-primary-button study-abroad-search-programs-button"
                        >
                            Search programs
                            <span aria-hidden="true">→</span>
                        </button>

                    </form>

                </div>


                <!-- ==================================================
                     RESULTS HEADER
                =================================================== -->

                <div class="study-abroad-program-results-header">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            DISCOVERY RESULTS
                        </span>

                        <h3>
                            Programs to explore
                        </h3>

                    </div>

                    <span
                        id="study-abroad-program-result-count"
                        class="study-abroad-result-count"
                    >
                        ${programs.length} programs
                    </span>

                </div>


                <!-- ==================================================
                     RESULTS
                =================================================== -->

                <div
                    class="study-abroad-program-results"
                    id="study-abroad-program-results"
                    aria-live="polite"
                >

                    ${programs
                        .map(
                            (program) => `
                                <article
                                    class="study-abroad-program-card"
                                    data-program-id="${program.id}"
                                    data-country="${program.country}"
                                    data-degree="${program.degree}"
                                    data-subject="${program.subject}"
                                    data-mode="${program.mode}"
                                >

                                    <div class="study-abroad-program-card-header">

                                        <div class="study-abroad-program-institution">

                                            <span
                                                class="study-abroad-program-logo"
                                                aria-hidden="true"
                                            >
                                                ${program.countryCode}
                                            </span>

                                            <div>

                                                <span>
                                                    ${program.country}
                                                </span>

                                                <h4>
                                                    ${program.university}
                                                </h4>

                                            </div>

                                        </div>


                                        <span class="study-abroad-program-badge">
                                            ${program.badge}
                                        </span>

                                    </div>


                                    <div class="study-abroad-program-card-body">

                                        <h3>
                                            ${program.subject}
                                        </h3>

                                        <div class="study-abroad-program-meta">

                                            <span>
                                                <strong>
                                                    Degree
                                                </strong>
                                                ${program.degree}
                                            </span>

                                            <span>
                                                <strong>
                                                    Duration
                                                </strong>
                                                ${program.duration}
                                            </span>

                                            <span>
                                                <strong>
                                                    Mode
                                                </strong>
                                                ${program.mode}
                                            </span>

                                        </div>

                                        <div class="study-abroad-program-tuition">

                                            <span>
                                                Tuition
                                            </span>

                                            <strong>
                                                ${program.tuition}
                                            </strong>

                                        </div>

                                    </div>


                                    <div class="study-abroad-program-card-footer">

                                        <a
                                            href="#study-abroad-counselling"
                                            class="study-abroad-program-details"
                                            data-program="${program.subject}"
                                        >
                                            Check eligibility
                                            <span aria-hidden="true">
                                                →
                                            </span>
                                        </a>

                                        <button
                                            type="button"
                                            class="study-abroad-program-save"
                                            aria-label="Save ${program.subject} program"
                                            data-save-program="${program.id}"
                                        >
                                            ♡
                                        </button>

                                    </div>

                                </article>
                            `
                        )
                        .join("")}

                </div>


                <!-- ==================================================
                     EMPTY STATE
                =================================================== -->

                <div
                    class="study-abroad-program-empty"
                    id="study-abroad-program-empty"
                    hidden
                >

                    <div class="study-abroad-empty-icon">
                        ?
                    </div>

                    <h3>
                        No programs found
                    </h3>

                    <p>
                        Try changing your destination, degree or subject
                        filters to explore more options.
                    </p>

                    <button
                        type="button"
                        class="study-abroad-secondary-button"
                        id="study-abroad-reset-programs"
                    >
                        Reset filters
                    </button>

                </div>


                <!-- ==================================================
                     COUNSELLING CTA
                =================================================== -->

                <div class="study-abroad-program-cta">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            NEED HELP SHORTLISTING?
                        </span>

                        <h3>
                            Get guidance based on your study goals.
                        </h3>

                        <p>
                            Share your academic background, preferred
                            destination and course interests with our
                            counselling team.
                        </p>

                    </div>


                    <a
                        href="#study-abroad-counselling"
                        class="study-abroad-primary-button"
                    >
                        Get free counselling
                        <span aria-hidden="true">→</span>
                    </a>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-program-seo">

                    <h2>
                        Find universities and study abroad programs
                    </h2>

                    <p>
                        Finding the right university involves more than
                        choosing a country. Students should compare the
                        available courses, degree structure, admission
                        requirements, tuition fees, living costs, study
                        duration and other factors that are relevant to
                        their academic plans.
                    </p>

                    <p>
                        EDUCONNECT's Study Abroad discovery experience is
                        designed to help students explore universities and
                        programs across destinations including the USA, UK,
                        Canada, Australia, Germany and Ireland.
                    </p>

                    <p>
                        Program information should always be verified with
                        the official university or institution before an
                        application is submitted because availability,
                        eligibility, fees and deadlines can change.
                    </p>

                </div>

            </div>

        </section>
    `;
}