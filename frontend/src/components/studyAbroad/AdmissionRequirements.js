/* =========================================================
   STUDY ABROAD — ADMISSION REQUIREMENTS
========================================================= */

export default function AdmissionRequirements() {

    const requirements = [

        {
            number: "01",
            icon: "🎓",
            title: "Academic Qualifications",
            description:
                "Meet the academic eligibility requirements specified by your chosen university and course.",
            examples:
                "School certificates • Bachelor's degree • Academic transcripts"
        },

        {
            number: "02",
            icon: "🌐",
            title: "English Language Proficiency",
            description:
                "Many international universities require proof of English language proficiency as part of the admission process.",
            examples:
                "IELTS • TOEFL • PTE Academic"
        },

        {
            number: "03",
            icon: "📝",
            title: "Entrance Exams",
            description:
                "Some universities and programs may require additional standardized or entrance examinations.",
            examples:
                "GRE • GMAT • SAT • Program-specific tests"
        },

        {
            number: "04",
            icon: "📄",
            title: "Statement of Purpose",
            description:
                "A statement of purpose may be required to explain your academic interests, goals and reasons for choosing the program.",
            examples:
                "Academic goals • Career plans • Study motivation"
        },

        {
            number: "05",
            icon: "👥",
            title: "Recommendation Letters",
            description:
                "Certain universities and programs may request academic or professional recommendation letters.",
            examples:
                "Professor recommendations • Employer recommendations"
        },

        {
            number: "06",
            icon: "💼",
            title: "Resume / CV",
            description:
                "A resume or CV may be required, particularly for postgraduate, professional and business programs.",
            examples:
                "Education • Experience • Skills • Achievements"
        },

        {
            number: "07",
            icon: "💰",
            title: "Financial Documents",
            description:
                "Applicants may need to demonstrate that they can meet the financial requirements associated with their study plans.",
            examples:
                "Bank statements • Financial documents • Funding information"
        },

        {
            number: "08",
            icon: "🛂",
            title: "Passport & Identification",
            description:
                "A valid passport and identification documents are commonly required during the international application process.",
            examples:
                "Valid passport • Identity documents • Photographs"
        }

    ];


    return `

        <!-- =====================================================
             ADMISSION REQUIREMENTS
        ====================================================== -->

        <section
            class="study-abroad-admission-requirements"
            id="admission-requirements"
        >


            <div class="study-abroad-admission-requirements-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-admission-requirements-header">


                    <div class="study-abroad-section-eyebrow">
                        KNOW BEFORE YOU APPLY
                    </div>


                    <h2>

                        Admission
                        <span>Requirements</span>

                    </h2>


                    <p>

                        Understand the common requirements you may
                        need when applying to universities and
                        programs abroad.

                    </p>


                </div>


                <!-- =================================================
                     REQUIREMENTS GRID
                ================================================== -->

                <div class="study-abroad-admission-requirements-grid">


                    ${requirements.map((requirement) => `

                        <article
                            class="study-abroad-admission-requirement-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="admission-requirement-card-header">


                                <span class="admission-requirement-number">
                                    ${requirement.number}
                                </span>


                                <span
                                    class="admission-requirement-icon"
                                    aria-hidden="true"
                                >
                                    ${requirement.icon}
                                </span>


                            </div>


                            <!-- =================================================
                                 CARD CONTENT
                            ================================================== -->

                            <div class="admission-requirement-card-content">


                                <h3>
                                    ${requirement.title}
                                </h3>


                                <p>
                                    ${requirement.description}
                                </p>


                                <!-- =================================================
                                     REQUIREMENT EXAMPLES
                                ================================================== -->

                                <div class="admission-requirement-examples">


                                    <span>
                                        Common Documents
                                    </span>


                                    <strong>
                                        ${requirement.examples}
                                    </strong>


                                </div>


                                <!-- =================================================
                                     CARD ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="admission-requirement-button"
                                >

                                    View Details

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join("")}


                </div>


                <!-- =================================================
                     REQUIREMENTS NOTE
                ================================================== -->

                <div class="study-abroad-admission-note">


                    <span
                        class="study-abroad-admission-note-icon"
                        aria-hidden="true"
                    >
                        💡
                    </span>


                    <div>

                        <strong>
                            Requirements can vary by university
                            and program
                        </strong>


                        <p>
                            Always check the specific admission
                            requirements of your selected university,
                            course and destination before applying.
                        </p>


                    </div>


                </div>


                <!-- =================================================
                     ADMISSION CTA
                ================================================== -->

                <div class="study-abroad-admission-footer">


                    <div class="study-abroad-admission-footer-content">


                        <strong>
                            Ready to check your eligibility?
                        </strong>


                        <span>
                            Explore universities and review their
                            admission requirements.
                        </span>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-admission-explore-button"
                    >

                        Explore Requirements

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
