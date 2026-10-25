/* =========================================================
   STUDY ABROAD — EXAMS
========================================================= */

export default function AbroadExams() {

    const exams = [

        {
            name: "IELTS",
            category: "English Proficiency",
            description:
                "International English language test accepted by universities and institutions worldwide.",
            sections:
                "Listening • Reading • Writing • Speaking",
            score:
                "Band Score: 0 – 9",
            suitableFor:
                "USA • UK • Canada • Australia • Europe"
        },

        {
            name: "TOEFL",
            category: "English Proficiency",
            description:
                "English language proficiency test commonly used for international university admissions.",
            sections:
                "Reading • Listening • Speaking • Writing",
            score:
                "Score: 0 – 120",
            suitableFor:
                "USA • Canada • UK • Australia"
        },

        {
            name: "PTE Academic",
            category: "English Proficiency",
            description:
                "Computer-based English language test designed for international study and migration.",
            sections:
                "Speaking • Writing • Reading • Listening",
            score:
                "Score: 10 – 90",
            suitableFor:
                "Australia • UK • Canada • New Zealand"
        },

        {
            name: "GRE",
            category: "Graduate Admission",
            description:
                "Graduate-level admission test used by many universities for master's and other programs.",
            sections:
                "Verbal • Quantitative • Analytical Writing",
            score:
                "Verbal & Quantitative: 130 – 170",
            suitableFor:
                "USA • Canada • Europe • Other Destinations"
        },

        {
            name: "GMAT",
            category: "Business School",
            description:
                "Admission test designed for candidates applying to business and management programs.",
            sections:
                "Quantitative • Verbal • Data Insights",
            score:
                "Score varies by GMAT edition",
            suitableFor:
                "Business Schools Worldwide"
        },

        {
            name: "SAT",
            category: "Undergraduate Admission",
            description:
                "Standardized admission test used by universities and colleges for undergraduate applications.",
            sections:
                "Reading & Writing • Mathematics",
            score:
                "Score: 400 – 1600",
            suitableFor:
                "USA • Selected International Universities"
        }

    ];


    return `

        <!-- =====================================================
             STUDY ABROAD EXAMS
        ====================================================== -->

        <section
            class="study-abroad-exams"
            id="abroad-exams"
        >


            <div class="study-abroad-exams-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-exams-header">


                    <div class="study-abroad-section-eyebrow">
                        TEST PREPARATION
                    </div>


                    <h2>

                        Exams for
                        <span>Study Abroad</span>

                    </h2>


                    <p>

                        Understand the major entrance and English
                        proficiency exams required for studying
                        at universities around the world.

                    </p>


                </div>


                <!-- =================================================
                     EXAM FILTERS
                ================================================== -->

                <div class="study-abroad-exam-filters">


                    <button
                        type="button"
                        class="exam-filter active"
                    >
                        All Exams
                    </button>


                    <button
                        type="button"
                        class="exam-filter"
                    >
                        English Proficiency
                    </button>


                    <button
                        type="button"
                        class="exam-filter"
                    >
                        Graduate Admission
                    </button>


                    <button
                        type="button"
                        class="exam-filter"
                    >
                        Undergraduate
                    </button>


                    <button
                        type="button"
                        class="exam-filter"
                    >
                        Business School
                    </button>


                </div>


                <!-- =================================================
                     EXAM GRID
                ================================================== -->

                <div class="study-abroad-exams-grid">


                    ${exams.map((exam) => `

                        <article
                            class="study-abroad-exam-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="exam-card-header">


                                <div class="exam-card-icon">
                                    📋
                                </div>


                                <span class="exam-card-category">
                                    ${exam.category}
                                </span>


                            </div>


                            <!-- =================================================
                                 EXAM CONTENT
                            ================================================== -->

                            <div class="exam-card-content">


                                <h3>
                                    ${exam.name}
                                </h3>


                                <p>
                                    ${exam.description}
                                </p>


                                <!-- =================================================
                                     EXAM DETAILS
                                ================================================== -->

                                <div class="exam-card-details">


                                    <div class="exam-detail">


                                        <span class="exam-detail-icon">
                                            📝
                                        </span>


                                        <div>

                                            <span>
                                                Sections
                                            </span>

                                            <strong>
                                                ${exam.sections}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="exam-detail">


                                        <span class="exam-detail-icon">
                                            🎯
                                        </span>


                                        <div>

                                            <span>
                                                Scoring
                                            </span>

                                            <strong>
                                                ${exam.score}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="exam-detail">


                                        <span class="exam-detail-icon">
                                            🌎
                                        </span>


                                        <div>

                                            <span>
                                                Popular For
                                            </span>

                                            <strong>
                                                ${exam.suitableFor}
                                            </strong>

                                        </div>


                                    </div>


                                </div>


                                <!-- =================================================
                                     EXAM ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="exam-explore-button"
                                >

                                    Explore ${exam.name}

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join("")}


                </div>


                <!-- =================================================
                     EXAM FOOTER
                ================================================== -->

                <div class="study-abroad-exams-footer">


                    <div class="study-abroad-exams-footer-content">


                        <span class="study-abroad-exams-footer-icon">
                            🎓
                        </span>


                        <div>

                            <strong>
                                Not sure which exam you need?
                            </strong>

                            <span>
                                Check admission requirements for
                                your destination and course.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-exam-guide-button"
                    >

                        Exam Guide

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
