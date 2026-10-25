/* =========================================================
   STUDY ABROAD — INTAKES
========================================================= */

export default function Intakes() {

    const intakes = [

        {
            name: "Fall Intake",
            months: "September – November",
            icon: "🍂",
            status: "Most Popular",
            description:
                "The main intake for international students with the widest range of universities, courses and scholarship opportunities.",
            countries:
                "USA • Canada • UK • Australia • Europe",
            application:
                "Applications usually open several months before the intake."
        },

        {
            name: "Spring Intake",
            months: "January – February",
            icon: "🌱",
            status: "Popular",
            description:
                "A useful alternative for students who miss the main fall intake and want to begin their studies early in the year.",
            countries:
                "USA • Canada • UK • Australia",
            application:
                "Application timelines vary by university and course."
        },

        {
            name: "Summer Intake",
            months: "May – July",
            icon: "☀️",
            status: "Limited Programs",
            description:
                "A smaller intake with selected universities and programs available depending on the destination.",
            countries:
                "USA • UK • Australia • Selected Destinations",
            application:
                "Available programs and deadlines depend on the university."
        }

    ];


    return `

        <!-- =====================================================
             STUDY ABROAD INTAKES
        ====================================================== -->

        <section
            class="study-abroad-intakes"
            id="study-abroad-intakes"
        >


            <div class="study-abroad-intakes-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-intakes-header">


                    <div class="study-abroad-section-eyebrow">
                        PLAN YOUR APPLICATION
                    </div>


                    <h2>

                        Study Abroad Intakes
                        <span> & Application Deadlines</span>

                    </h2>


                    <p>

                        Intake availability and deadlines vary by university, course and destination. Compare common start periods, then check each program’s official application calendar so you can plan tests, documents and funding.

                    </p>


                </div>


                <!-- =================================================
                     INTAKE TIMELINE
                ================================================== -->

                <div class="study-abroad-intakes-timeline">


                    ${intakes.map((intake, index) => `

                        <article
                            class="study-abroad-intake-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="intake-card-header">


                                <div
                                    class="intake-card-icon"
                                    aria-hidden="true"
                                >
                                    ${intake.icon}
                                </div>


                                <span class="intake-card-status">
                                    ${intake.status}
                                </span>


                            </div>


                            <!-- =================================================
                                 CARD CONTENT
                            ================================================== -->

                            <div class="intake-card-content">


                                <span class="intake-card-number">
                                    0${index + 1}
                                </span>


                                <h3>
                                    ${intake.name}
                                </h3>


                                <div class="intake-card-months">

                                    <span
                                        class="intake-months-icon"
                                        aria-hidden="true"
                                    >
                                        📅
                                    </span>

                                    <strong>
                                        ${intake.months}
                                    </strong>

                                </div>


                                <p>
                                    ${intake.description}
                                </p>


                                <!-- =================================================
                                     INTAKE DETAILS
                                ================================================== -->

                                <div class="intake-card-details">


                                    <div class="intake-card-detail">


                                        <span
                                            class="intake-detail-icon"
                                            aria-hidden="true"
                                        >
                                            🌎
                                        </span>


                                        <div>

                                            <span>
                                                Popular Destinations
                                            </span>

                                            <strong>
                                                ${intake.countries}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="intake-card-detail">


                                        <span
                                            class="intake-detail-icon"
                                            aria-hidden="true"
                                        >
                                            📝
                                        </span>


                                        <div>

                                            <span>
                                                Application
                                            </span>

                                            <strong>
                                                ${intake.application}
                                            </strong>

                                        </div>


                                    </div>


                                </div>


                                <!-- =================================================
                                     CARD ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="intake-explore-button"
                                >

                                    View Intake Details

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join("")}


                </div>


                <!-- =================================================
                     INTAKE PLANNING CTA
                ================================================== -->

                <div class="study-abroad-intakes-cta">


                    <div class="study-abroad-intakes-cta-content">


                        <span
                            class="study-abroad-intakes-cta-icon"
                            aria-hidden="true"
                        >
                            📅
                        </span>


                        <div>

                            <strong>
                                Planning your study abroad application?
                            </strong>

                            <span>
                                Check university deadlines and prepare
                                your application ahead of time.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-intakes-cta-button"
                    >

                        Check Deadlines

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
