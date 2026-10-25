/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD COURSE EXPLORER
 * ============================================================
 *
 * Purpose:
 * - Course discovery
 * - Degree-level discovery
 * - Subject-based navigation
 * - Study abroad SEO
 * - Internal linking
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadCourseExplorer() {

    const studyLevels = [
        {
            number: "01",
            title: "Bachelor's",
            description:
                "Explore undergraduate programs and international bachelor's degrees.",
            keyword:
                "bachelor's programs abroad"
        },

        {
            number: "02",
            title: "Master's",
            description:
                "Discover postgraduate programs across universities and destinations.",
            keyword:
                "master's programs abroad"
        },

        {
            number: "03",
            title: "MBA",
            description:
                "Explore business, management and leadership programs overseas.",
            keyword:
                "MBA abroad"
        },

        {
            number: "04",
            title: "PhD",
            description:
                "Explore research-focused doctoral programs and academic pathways.",
            keyword:
                "PhD abroad"
        }
    ];


    const popularCourses = [
        {
            title: "Computer Science",
            short: "CS",
            description:
                "Explore computer science, software engineering and computing programs.",
            tags: [
                "Technology",
                "Software",
                "AI"
            ]
        },

        {
            title: "Data Science & AI",
            short: "AI",
            description:
                "Discover programs focused on data, artificial intelligence and machine learning.",
            tags: [
                "Data",
                "AI",
                "Machine Learning"
            ]
        },

        {
            title: "Business & Management",
            short: "BM",
            description:
                "Explore business, management, entrepreneurship and leadership programs.",
            tags: [
                "Business",
                "Management",
                "Leadership"
            ]
        },

        {
            title: "Engineering",
            short: "EN",
            description:
                "Explore engineering programs across technology, mechanical, civil and other fields.",
            tags: [
                "Technology",
                "Engineering",
                "Research"
            ]
        },

        {
            title: "Finance & Economics",
            short: "FE",
            description:
                "Discover finance, economics, accounting and related international programs.",
            tags: [
                "Finance",
                "Economics",
                "Accounting"
            ]
        },

        {
            title: "Health & Life Sciences",
            short: "HS",
            description:
                "Explore health, biomedical, life science and related study options.",
            tags: [
                "Health",
                "Science",
                "Research"
            ]
        },

        {
            title: "Design & Creative Arts",
            short: "DA",
            description:
                "Discover design, media, visual communication and creative programs.",
            tags: [
                "Design",
                "Creative",
                "Media"
            ]
        },

        {
            title: "Hospitality & Tourism",
            short: "HT",
            description:
                "Explore hospitality, tourism, hotel management and related programs.",
            tags: [
                "Hospitality",
                "Tourism",
                "Management"
            ]
        }
    ];


    return `
        <section
            class="study-abroad-course-explorer"
            id="study-abroad-course-explorer"
            aria-labelledby="study-abroad-course-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     HEADER
                =================================================== -->

                <div class="study-abroad-section-header">

                    <div class="study-abroad-section-header-content">

                        <span class="study-abroad-section-eyebrow">
                            COURSE EXPLORER
                        </span>

                        <h2 id="study-abroad-course-title">
                            Find the right course to study abroad
                        </h2>

                        <p>
                            Explore international courses by subject and
                            degree level. Start with your area of interest,
                            then compare universities and destinations.
                        </p>

                    </div>


                    <a
                        href="#study-abroad-universities"
                        class="study-abroad-section-link"
                    >
                        Find universities
                        <span aria-hidden="true">→</span>
                    </a>

                </div>


                <!-- ==================================================
                     DEGREE LEVEL
                =================================================== -->

                <div class="study-abroad-course-level-wrapper">

                    <div class="study-abroad-course-subheading">

                        <span>
                            CHOOSE YOUR STUDY LEVEL
                        </span>

                        <h3>
                            What do you want to study?
                        </h3>

                    </div>


                    <div class="study-abroad-course-level-grid">

                        ${studyLevels
                            .map(
                                (level) => `
                                    <a
                                        href="#study-abroad-universities"
                                        class="study-abroad-course-level-card"
                                        data-study-level="${level.title}"
                                    >

                                        <div class="study-abroad-course-level-top">

                                            <span>
                                                ${level.number}
                                            </span>

                                            <span aria-hidden="true">
                                                ↗
                                            </span>

                                        </div>


                                        <h4>
                                            ${level.title}
                                        </h4>


                                        <p>
                                            ${level.description}
                                        </p>


                                        <span class="study-abroad-course-level-keyword">
                                            ${level.keyword}
                                        </span>

                                    </a>
                                `
                            )
                            .join("")}

                    </div>

                </div>


                <!-- ==================================================
                     POPULAR SUBJECTS
                =================================================== -->

                <div class="study-abroad-popular-courses">

                    <div class="study-abroad-course-subheading">

                        <span>
                            POPULAR FIELDS OF STUDY
                        </span>

                        <h3>
                            Explore courses by subject
                        </h3>

                    </div>


                    <div class="study-abroad-course-grid">

                        ${popularCourses
                            .map(
                                (course, index) => `
                                    <article
                                        class="study-abroad-course-card"
                                        data-course="${course.title}"
                                    >

                                        <a
                                            href="#study-abroad-universities"
                                            class="study-abroad-course-card-link"
                                            aria-label="Explore ${course.title} courses abroad"
                                        >

                                            <div class="study-abroad-course-card-top">

                                                <span class="study-abroad-course-icon">
                                                    ${course.short}
                                                </span>

                                                <span
                                                    class="study-abroad-course-arrow"
                                                    aria-hidden="true"
                                                >
                                                    ↗
                                                </span>

                                            </div>


                                            <div class="study-abroad-course-card-content">

                                                <h4>
                                                    ${course.title}
                                                </h4>

                                                <p>
                                                    ${course.description}
                                                </p>

                                            </div>


                                            <div class="study-abroad-course-tags">

                                                ${course.tags
                                                    .map(
                                                        (tag) => `
                                                            <span>
                                                                ${tag}
                                                            </span>
                                                        `
                                                    )
                                                    .join("")}

                                            </div>


                                            <div class="study-abroad-course-card-footer">

                                                <span>
                                                    Explore programs
                                                </span>

                                                <span aria-hidden="true">
                                                    →
                                                </span>

                                            </div>

                                        </a>

                                    </article>
                                `
                            )
                            .join("")}

                    </div>

                </div>


                <!-- ==================================================
                     COURSE DISCOVERY TOOL
                =================================================== -->

                <div
                    class="study-abroad-course-discovery"
                    id="study-abroad-course-discovery"
                >

                    <div class="study-abroad-course-discovery-content">

                        <span class="study-abroad-section-eyebrow">
                            COURSE DISCOVERY
                        </span>

                        <h3>
                            Not sure which course is right for you?
                        </h3>

                        <p>
                            Start with your preferred study level, subject
                            area and destination. You can then compare
                            universities and program requirements.
                        </p>

                    </div>


                    <form
                        class="study-abroad-course-search"
                        id="study-abroad-course-search"
                    >

                        <div class="study-abroad-course-field">

                            <label for="study-level">
                                Study level
                            </label>

                            <select id="study-level" name="level">

                                <option value="">
                                    Select level
                                </option>

                                <option value="bachelors">
                                    Bachelor's
                                </option>

                                <option value="masters">
                                    Master's
                                </option>

                                <option value="mba">
                                    MBA
                                </option>

                                <option value="phd">
                                    PhD
                                </option>

                            </select>

                        </div>


                        <div class="study-abroad-course-field">

                            <label for="study-subject">
                                Subject
                            </label>

                            <select id="study-subject" name="subject">

                                <option value="">
                                    Select subject
                                </option>

                                <option value="computer-science">
                                    Computer Science
                                </option>

                                <option value="data-science">
                                    Data Science & AI
                                </option>

                                <option value="business">
                                    Business & Management
                                </option>

                                <option value="engineering">
                                    Engineering
                                </option>

                                <option value="finance">
                                    Finance & Economics
                                </option>

                                <option value="health">
                                    Health & Life Sciences
                                </option>

                                <option value="design">
                                    Design & Creative Arts
                                </option>

                                <option value="hospitality">
                                    Hospitality & Tourism
                                </option>

                            </select>

                        </div>


                        <div class="study-abroad-course-field">

                            <label for="study-country">
                                Destination
                            </label>

                            <select id="study-country" name="country">

                                <option value="">
                                    Select country
                                </option>

                                <option value="usa">
                                    USA
                                </option>

                                <option value="uk">
                                    UK
                                </option>

                                <option value="canada">
                                    Canada
                                </option>

                                <option value="australia">
                                    Australia
                                </option>

                                <option value="germany">
                                    Germany
                                </option>

                                <option value="ireland">
                                    Ireland
                                </option>

                                <option value="new-zealand">
                                    New Zealand
                                </option>

                                <option value="france">
                                    France
                                </option>

                            </select>

                        </div>


                        <button
                            type="submit"
                            class="study-abroad-primary-button"
                        >
                            Find courses
                            <span aria-hidden="true">→</span>
                        </button>

                    </form>


                    <div
                        class="study-abroad-course-search-message"
                        id="study-abroad-course-search-message"
                        role="status"
                        aria-live="polite"
                    ></div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-course-seo">

                    <h2>
                        Study abroad courses for Indian students
                    </h2>

                    <p>
                        Students planning to study abroad can choose from
                        thousands of programs across areas such as computer
                        science, engineering, business, data science,
                        finance, healthcare, design and hospitality.
                    </p>

                    <p>
                        Your choice of course can influence the universities
                        you can apply to, admission requirements, tuition
                        costs and the countries where suitable programs are
                        available. Compare the degree level, curriculum,
                        university, destination and total cost before making
                        your shortlist.
                    </p>

                    <p>
                        EDUCONNECT helps students discover study abroad
                        courses, explore universities, compare destinations
                        and understand the application journey from one
                        platform.
                    </p>

                </div>

            </div>

        </section>
    `;
}
