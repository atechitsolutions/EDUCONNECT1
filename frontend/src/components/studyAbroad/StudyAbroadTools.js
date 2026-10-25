/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD TOOLS
 * ============================================================
 *
 * Purpose:
 * - Study abroad cost planning
 * - Tuition + living cost estimation
 * - Intake planning
 * - Student profile checklist
 * - Interactive planning utilities
 *
 * Important:
 * These are planning estimates only.
 * Actual costs and deadlines must be verified with
 * the relevant university / official source.
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadTools() {

    return `
        <section
            class="study-abroad-tools"
            id="study-abroad-tools"
            aria-labelledby="study-abroad-tools-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     HEADER
                =================================================== -->

                <div class="study-abroad-section-header">

                    <div class="study-abroad-section-header-content">

                        <span class="study-abroad-section-eyebrow">
                            STUDY ABROAD TOOLS
                        </span>

                        <h2 id="study-abroad-tools-title">
                            Plan your study abroad journey with useful tools
                        </h2>

                        <p>
                            Estimate your education budget, understand your
                            preparation timeline and check the key areas you
                            should consider before applying.
                        </p>

                    </div>

                </div>


                <!-- ==================================================
                     TOOL NAVIGATION
                =================================================== -->

                <div
                    class="study-abroad-tools-navigation"
                    role="tablist"
                    aria-label="Study abroad planning tools"
                >

                    <button
                        type="button"
                        class="study-abroad-tool-tab active"
                        data-tool-tab="cost"
                        role="tab"
                        aria-selected="true"
                        aria-controls="study-abroad-tool-cost"
                    >
                        <span>01</span>
                        Cost Planner
                    </button>

                    <button
                        type="button"
                        class="study-abroad-tool-tab"
                        data-tool-tab="timeline"
                        role="tab"
                        aria-selected="false"
                        aria-controls="study-abroad-tool-timeline"
                    >
                        <span>02</span>
                        Timeline
                    </button>

                    <button
                        type="button"
                        class="study-abroad-tool-tab"
                        data-tool-tab="profile"
                        role="tab"
                        aria-selected="false"
                        aria-controls="study-abroad-tool-profile"
                    >
                        <span>03</span>
                        Profile Checklist
                    </button>

                </div>


                <!-- ==================================================
                     COST PLANNER
                =================================================== -->

                <div
                    class="study-abroad-tool-panel active"
                    id="study-abroad-tool-cost"
                    data-tool-panel="cost"
                    role="tabpanel"
                >

                    <div class="study-abroad-tool-panel-grid">


                        <!-- INPUT SIDE -->

                        <div class="study-abroad-tool-form">

                            <span class="study-abroad-tool-label">
                                ESTIMATE YOUR BUDGET
                            </span>

                            <h3>
                                How much could your study abroad plan cost?
                            </h3>

                            <p>
                                Enter approximate values to create a simple
                                planning estimate. Actual tuition and living
                                costs vary by university, city, course and
                                lifestyle.
                            </p>


                            <!-- DESTINATION -->

                            <div class="study-abroad-tool-field">

                                <label for="cost-country">
                                    Destination
                                </label>

                                <select id="cost-country">

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

                                </select>

                            </div>


                            <!-- TUITION -->

                            <div class="study-abroad-tool-field">

                                <label for="cost-tuition">
                                    Estimated annual tuition
                                </label>

                                <div class="study-abroad-number-input">

                                    <span>
                                        ₹
                                    </span>

                                    <input
                                        id="cost-tuition"
                                        type="number"
                                        min="0"
                                        step="10000"
                                        value="1500000"
                                        placeholder="1500000"
                                    />

                                </div>

                            </div>


                            <!-- MONTHLY LIVING -->

                            <div class="study-abroad-tool-field">

                                <label for="cost-living">
                                    Estimated monthly living cost
                                </label>

                                <div class="study-abroad-number-input">

                                    <span>
                                        ₹
                                    </span>

                                    <input
                                        id="cost-living"
                                        type="number"
                                        min="0"
                                        step="5000"
                                        value="80000"
                                        placeholder="80000"
                                    />

                                </div>

                            </div>


                            <!-- COURSE DURATION -->

                            <div class="study-abroad-tool-field">

                                <label for="cost-duration">
                                    Course duration
                                </label>

                                <select id="cost-duration">

                                    <option value="1">
                                        1 year
                                    </option>

                                    <option value="2" selected>
                                        2 years
                                    </option>

                                    <option value="3">
                                        3 years
                                    </option>

                                    <option value="4">
                                        4 years
                                    </option>

                                </select>

                            </div>


                            <button
                                type="button"
                                class="study-abroad-primary-button"
                                id="study-abroad-calculate-cost"
                            >
                                Calculate estimate
                                <span aria-hidden="true">→</span>
                            </button>

                        </div>


                        <!-- RESULT SIDE -->

                        <div class="study-abroad-cost-result">

                            <div class="study-abroad-cost-result-header">

                                <span>
                                    ESTIMATED STUDY BUDGET
                                </span>

                                <strong>
                                    Planning estimate
                                </strong>

                            </div>


                            <div class="study-abroad-total-cost">

                                <span>
                                    Approximate total
                                </span>

                                <strong
                                    id="study-abroad-total-cost"
                                >
                                    ₹34,20,000
                                </strong>

                                <small>
                                    Based on the values entered above
                                </small>

                            </div>


                            <div class="study-abroad-cost-breakdown">

                                <div>

                                    <span>
                                        Tuition
                                    </span>

                                    <strong id="study-abroad-tuition-result">
                                        ₹30,00,000
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Living expenses
                                    </span>

                                    <strong id="study-abroad-living-result">
                                        ₹19,20,000
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Planning buffer
                                    </span>

                                    <strong id="study-abroad-buffer-result">
                                        ₹3,00,000
                                    </strong>

                                </div>

                            </div>


                            <div class="study-abroad-cost-disclaimer">

                                <strong>
                                    Important
                                </strong>

                                <p>
                                    This calculator provides a basic planning
                                    estimate and does not represent the actual
                                    cost of studying at a specific institution.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- ==================================================
                     TIMELINE TOOL
                =================================================== -->

                <div
                    class="study-abroad-tool-panel"
                    id="study-abroad-tool-timeline"
                    data-tool-panel="timeline"
                    role="tabpanel"
                    hidden
                >

                    <div class="study-abroad-timeline-tool">

                        <div class="study-abroad-tool-intro">

                            <span class="study-abroad-tool-label">
                                APPLICATION TIMELINE
                            </span>

                            <h3>
                                When should you start preparing?
                            </h3>

                            <p>
                                Use this as a general planning framework.
                                Exact application and visa timelines depend
                                on your destination and university.
                            </p>

                        </div>


                        <div class="study-abroad-timeline">

                            <div class="study-abroad-timeline-item">

                                <span>
                                    01
                                </span>

                                <div>

                                    <strong>
                                        12–18 months before
                                    </strong>

                                    <h4>
                                        Explore
                                    </h4>

                                    <p>
                                        Research countries, courses and
                                        universities.
                                    </p>

                                </div>

                            </div>


                            <div class="study-abroad-timeline-item">

                                <span>
                                    02
                                </span>

                                <div>

                                    <strong>
                                        9–12 months before
                                    </strong>

                                    <h4>
                                        Shortlist
                                    </h4>

                                    <p>
                                        Compare programs, eligibility,
                                        costs and deadlines.
                                    </p>

                                </div>

                            </div>


                            <div class="study-abroad-timeline-item">

                                <span>
                                    03
                                </span>

                                <div>

                                    <strong>
                                        6–9 months before
                                    </strong>

                                    <h4>
                                        Prepare
                                    </h4>

                                    <p>
                                        Prepare tests, documents and
                                        application materials.
                                    </p>

                                </div>

                            </div>


                            <div class="study-abroad-timeline-item">

                                <span>
                                    3–6 months before
                                </strong>

                                <h4>
                                    Apply
                                </h4>

                                <p>
                                    Submit applications and track
                                    institutional deadlines.
                                </p>

                            </div>


                            <div class="study-abroad-timeline-item">

                                <span>
                                    05
                                </span>

                                <div>

                                    <strong>
                                        After admission
                                    </strong>

                                    <h4>
                                        Prepare to travel
                                    </h4>

                                    <p>
                                        Review visa, accommodation,
                                        travel and pre-departure tasks.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <a
                            href="#study-abroad-application-process"
                            class="study-abroad-secondary-button"
                        >
                            View application process
                            <span aria-hidden="true">→</span>
                        </a>

                    </div>

                </div>


                <!-- ==================================================
                     PROFILE CHECKLIST
                =================================================== -->

                <div
                    class="study-abroad-tool-panel"
                    id="study-abroad-tool-profile"
                    data-tool-panel="profile"
                    role="tabpanel"
                    hidden
                >

                    <div class="study-abroad-profile-tool">

                        <div class="study-abroad-tool-intro">

                            <span class="study-abroad-tool-label">
                                PROFILE PREPARATION
                            </span>

                            <h3>
                                Check the areas you should prepare
                            </h3>

                            <p>
                                Requirements vary by program and destination.
                                This checklist helps you identify areas to
                                review before shortlisting universities.
                            </p>

                        </div>


                        <div class="study-abroad-profile-grid">

                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Academic records
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Passport
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    English-language test
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Statement of purpose
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Recommendation letters
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Financial planning
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    University shortlist
                                </span>

                            </label>


                            <label class="study-abroad-profile-item">

                                <input
                                    type="checkbox"
                                    data-profile-check
                                />

                                <span>
                                    Application deadlines
                                </span>

                            </label>

                        </div>


                        <div class="study-abroad-profile-progress">

                            <div>

                                <span>
                                    Preparation progress
                                </span>

                                <strong id="study-abroad-profile-percentage">
                                    0%
                                </strong>

                            </div>

                            <div class="study-abroad-profile-progress-bar">

                                <span
                                    id="study-abroad-profile-progress-fill"
                                ></span>

                            </div>

                        </div>


                        <a
                            href="#study-abroad-counselling"
                            class="study-abroad-primary-button"
                        >
                            Discuss your profile
                            <span aria-hidden="true">→</span>
                        </a>

                    </div>

                </div>


                <!-- ==================================================
                     TOOL CTA
                =================================================== -->

                <div class="study-abroad-tools-cta">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            PLAN WITH CONFIDENCE
                        </span>

                        <h3>
                            Need help understanding your options?
                        </h3>

                        <p>
                            Get personalized guidance based on your academic
                            background, preferred course and destination.
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

                <div class="study-abroad-tools-seo">

                    <h2>
                        Study abroad cost, planning and preparation tools
                    </h2>

                    <p>
                        The cost of studying abroad can include tuition fees,
                        accommodation, food, transportation, insurance,
                        travel, application expenses and other living costs.
                        The total amount varies significantly by country,
                        university, city, course and lifestyle.
                    </p>

                    <p>
                        Students planning to study abroad from India should
                        consider their complete education budget rather than
                        looking only at tuition fees. Scholarships, education
                        loans and other funding options may also be relevant
                        depending on eligibility.
                    </p>

                    <p>
                        Application planning should also account for university
                        deadlines, required tests, document preparation,
                        admission decisions and destination-specific visa
                        processes.
                    </p>

                </div>

            </div>

        </section>
    `;
}