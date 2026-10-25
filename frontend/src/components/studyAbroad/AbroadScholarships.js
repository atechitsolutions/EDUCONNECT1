/* =========================================================
   STUDY ABROAD — SCHOLARSHIPS
========================================================= */

export default function AbroadScholarships() {

    const scholarships = [

        {
            name: "Fulbright Scholarship",
            country: "USA",
            flag: "🇺🇸",
            level: "Masters • PhD",
            coverage: "Tuition • Living Expenses • Travel",
            type: "Fully Funded",
            description:
                "Scholarship opportunities for international students pursuing higher education in the United States."
        },

        {
            name: "Chevening Scholarship",
            country: "United Kingdom",
            flag: "🇬🇧",
            level: "Masters",
            coverage: "Tuition • Living Expenses • Travel",
            type: "Fully Funded",
            description:
                "UK government scholarship programme for eligible international students pursuing a master's degree."
        },

        {
            name: "Erasmus Mundus",
            country: "Europe",
            flag: "🇪🇺",
            level: "Masters",
            coverage: "Tuition • Travel • Living Expenses",
            type: "Fully Funded",
            description:
                "International scholarship opportunities offered through selected joint master's programmes across Europe."
        },

        {
            name: "DAAD Scholarships",
            country: "Germany",
            flag: "🇩🇪",
            level: "Masters • PhD",
            coverage: "Tuition Support • Stipend • Travel",
            type: "Funding Support",
            description:
                "Scholarship and funding opportunities for international students studying at German universities."
        },

        {
            name: "Australia Awards",
            country: "Australia",
            flag: "🇦🇺",
            level: "Undergraduate • Masters",
            coverage: "Tuition • Travel • Living Expenses",
            type: "Fully Funded",
            description:
                "Australian government scholarship opportunities for eligible students from participating countries."
        },

        {
            name: "Vanier Canada Graduate Scholarships",
            country: "Canada",
            flag: "🇨🇦",
            level: "Doctoral",
            coverage: "Annual Financial Support",
            type: "Graduate Scholarship",
            description:
                "Canadian doctoral scholarship programme supporting eligible international and domestic researchers."
        }

    ];


    return `

        <!-- =====================================================
             STUDY ABROAD SCHOLARSHIPS
        ====================================================== -->

        <section
            class="study-abroad-scholarships"
            id="abroad-scholarships"
        >


            <div class="study-abroad-scholarships-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-scholarships-header">


                    <div class="study-abroad-section-eyebrow">
                        FUND YOUR EDUCATION
                    </div>


                    <h2>

                        Study Abroad Scholarships
                        <span> for Indian Students</span>

                    </h2>


                    <p>

                        Search for scholarships to study abroad by destination, university, course and study level. Eligibility, funding and deadlines vary by award, so confirm current terms on the official scholarship or university website before applying.

                    </p>


                </div>


                <!-- =================================================
                     SCHOLARSHIP FILTERS
                ================================================== -->

                <div class="study-abroad-scholarship-filters">


                    <button
                        type="button"
                        class="scholarship-filter active"
                    >
                        All Scholarships
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        USA
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        UK
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Canada
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Australia
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Europe
                    </button>


                </div>


                <!-- =================================================
                     SCHOLARSHIP GRID
                ================================================== -->

                <div class="study-abroad-scholarship-grid">


                    ${scholarships.map((scholarship) => `

                        <article
                            class="study-abroad-scholarship-card"
                        >


                            <!-- =================================================
                                 CARD TOP
                            ================================================== -->

                            <div class="scholarship-card-top">


                                <div class="scholarship-country">

                                    <span>
                                        ${scholarship.flag}
                                    </span>

                                    ${scholarship.country}

                                </div>


                                <button
                                    type="button"
                                    class="scholarship-favourite"
                                    aria-label="Save ${scholarship.name}"
                                >

                                    ♡

                                </button>


                            </div>


                            <!-- =================================================
                                 SCHOLARSHIP ICON
                            ================================================== -->

                            <div class="scholarship-card-icon">
                                🎓
                            </div>


                            <!-- =================================================
                                 SCHOLARSHIP CONTENT
                            ================================================== -->

                            <div class="scholarship-card-content">


                                <span class="scholarship-card-label">
                                    ${scholarship.type}
                                </span>


                                <h3>
                                    ${scholarship.name}
                                </h3>


                                <p>
                                    ${scholarship.description}
                                </p>


                                <!-- =================================================
                                     SCHOLARSHIP DETAILS
                                ================================================== -->

                                <div class="scholarship-card-details">


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            📚
                                        </span>


                                        <div>

                                            <span>
                                                Study Level
                                            </span>

                                            <strong>
                                                ${scholarship.level}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            💰
                                        </span>


                                        <div>

                                            <span>
                                                Coverage
                                            </span>

                                            <strong>
                                                ${scholarship.coverage}
                                            </strong>

                                        </div>


                                    </div>


                                </div>


                                <!-- =================================================
                                     SCHOLARSHIP ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="scholarship-explore-button"
                                >

                                    View Scholarship

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join("")}


                </div>


                <!-- =================================================
                     SCHOLARSHIP FOOTER
                ================================================== -->

                <div class="study-abroad-scholarships-footer">


                    <div class="study-abroad-scholarships-footer-content">


                        <span
                            class="study-abroad-scholarships-footer-icon"
                            aria-hidden="true"
                        >
                            💡
                        </span>


                        <div>

                            <strong>
                                Looking for the right scholarship?
                            </strong>

                            <span>
                                Explore scholarships based on your
                                destination, study level and course.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-view-scholarships-button"
                    >

                        View All Scholarships

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
