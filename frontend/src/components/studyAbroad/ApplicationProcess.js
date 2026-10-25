/* =========================================================
   STUDY ABROAD — APPLICATION PROCESS
========================================================= */

export default function StudyAbroadApplication() {

    const steps = [

        {
            number: "01",
            icon: "🎯",
            title: "Choose Your Destination",
            description:
                "Explore countries, universities and study destinations based on your academic and career goals."
        },

        {
            number: "02",
            icon: "🎓",
            title: "Select Your University",
            description:
                "Compare universities, courses, admission requirements and available study options."
        },

        {
            number: "03",
            icon: "📄",
            title: "Prepare Your Application",
            description:
                "Organize your academic documents, test scores, statement of purpose and other application requirements."
        },

        {
            number: "04",
            icon: "📝",
            title: "Apply to University",
            description:
                "Submit your application and required documents according to the university's admission process."
        },

        {
            number: "05",
            icon: "💰",
            title: "Explore Funding",
            description:
                "Look for scholarships, grants and other funding opportunities that may be available to you."
        },

        {
            number: "06",
            icon: "✈️",
            title: "Prepare for Your Journey",
            description:
                "Once admitted, prepare for your visa, accommodation, travel and transition to your new destination."
        }

    ];


    return `

        <!-- =====================================================
             STUDY ABROAD APPLICATION PROCESS
        ====================================================== -->

        <section
            class="study-abroad-application"
            id="study-abroad-application"
        >


            <div class="study-abroad-application-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-application-header">


                    <div class="study-abroad-section-eyebrow">
                        YOUR JOURNEY
                    </div>


                    <h2>

                        How to
                        <span>Study Abroad</span>

                    </h2>


                    <p>

                        Follow a simple step-by-step journey from
                        choosing your destination to preparing for
                        your international education.

                    </p>


                </div>


                <!-- =================================================
                     APPLICATION PROCESS
                ================================================== -->

                <div class="study-abroad-application-process">


                    ${steps.map((step, index) => `

                        <div
                            class="study-abroad-application-step"
                        >


                            <!-- =================================================
                                 STEP NUMBER
                            ================================================== -->

                            <div class="application-step-number">

                                ${step.number}

                            </div>


                            <!-- =================================================
                                 STEP CONTENT
                            ================================================== -->

                            <div class="application-step-content">


                                <div
                                    class="application-step-icon"
                                    aria-hidden="true"
                                >

                                    ${step.icon}

                                </div>


                                <div class="application-step-info">


                                    <span class="application-step-label">
                                        STEP ${step.number}
                                    </span>


                                    <h3>
                                        ${step.title}
                                    </h3>


                                    <p>
                                        ${step.description}
                                    </p>


                                </div>


                            </div>


                            <!-- =================================================
                                 PROCESS CONNECTOR
                            ================================================== -->

                            ${
                                index < steps.length - 1
                                    ? `
                                        <div
                                            class="application-step-connector"
                                            aria-hidden="true"
                                        >
                                            ↓
                                        </div>
                                      `
                                    : ""
                            }


                        </div>

                    `).join("")}


                </div>


                <!-- =================================================
                     APPLICATION CTA
                ================================================== -->

                <div class="study-abroad-application-cta">


                    <div class="study-abroad-application-cta-content">


                        <span
                            class="study-abroad-application-cta-icon"
                            aria-hidden="true"
                        >
                            🌎
                        </span>


                        <div>

                            <strong>
                                Ready to start your study abroad journey?
                            </strong>

                            <span>
                                Explore destinations, universities,
                                courses and scholarships.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-application-cta-button"
                    >

                        Start Exploring

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `;
}
