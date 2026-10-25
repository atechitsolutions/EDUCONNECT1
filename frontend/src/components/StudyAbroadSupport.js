/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD SUPPORT
 * ============================================================
 *
 * Purpose:
 * - Application support
 * - Scholarship discovery
 * - Education finance
 * - Exams
 * - Visa preparation
 * - Pre-departure guidance
 * - Counselling conversion
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadSupport() {

    const supportServices = [
        {
            number: "01",
            category: "APPLICATION",
            title: "University application guidance",
            description:
                "Understand application requirements, documents, deadlines and the steps involved in applying to your shortlisted institutions.",
            link: "#study-abroad-application-process",
            linkText: "Application process"
        },

        {
            number: "02",
            category: "SCHOLARSHIPS",
            title: "Find scholarship opportunities",
            description:
                "Explore scholarship and funding options and understand the eligibility criteria and deadlines that may apply.",
            link: "#study-abroad-scholarships",
            linkText: "Explore scholarships"
        },

        {
            number: "03",
            category: "EDUCATION FINANCE",
            title: "Plan your education funding",
            description:
                "Understand tuition, living expenses and potential education financing options before finalizing your study destination.",
            link: "#study-abroad-education-loan",
            linkText: "Explore education loans"
        },

        {
            number: "04",
            category: "EXAMS",
            title: "Understand required exams",
            description:
                "Learn about English-language and other standardized tests that may be relevant to your destination or program.",
            link: "#study-abroad-exams",
            linkText: "Explore exams"
        },

        {
            number: "05",
            category: "VISA",
            title: "Prepare for your student visa",
            description:
                "Understand the documentation and planning involved in the student visa stage for your selected destination.",
            link: "#study-abroad-visa",
            linkText: "Visa guidance"
        },

        {
            number: "06",
            category: "PRE-DEPARTURE",
            title: "Get ready to travel",
            description:
                "Prepare for the practical aspects of moving abroad, including documents, accommodation, travel and arrival planning.",
            link: "#study-abroad-pre-departure",
            linkText: "Pre-departure guide"
        }
    ];


    const journeySteps = [
        {
            number: "01",
            title: "Discover",
            description:
                "Explore destinations, courses and universities."
        },

        {
            number: "02",
            title: "Shortlist",
            description:
                "Compare programs and identify suitable options."
        },

        {
            number: "03",
            title: "Prepare",
            description:
                "Get your documents, exams and application materials ready."
        },

        {
            number: "04",
            title: "Apply",
            description:
                "Submit applications and monitor the next steps."
        },

        {
            number: "05",
            title: "Decide",
            description:
                "Review admission outcomes and plan your next stage."
        },

        {
            number: "06",
            title: "Prepare to travel",
            description:
                "Organize visa, accommodation and pre-departure requirements."
        }
    ];


    return `
        <section
            class="study-abroad-support"
            id="study-abroad-support"
            aria-labelledby="study-abroad-support-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     SECTION HEADER
                =================================================== -->

                <div class="study-abroad-section-header">

                    <div class="study-abroad-section-header-content">

                        <span class="study-abroad-section-eyebrow">
                            COMPLETE STUDY ABROAD SUPPORT
                        </span>

                        <h2 id="study-abroad-support-title">
                            Support for every stage of your overseas education journey
                        </h2>

                        <p>
                            From choosing a destination and university to
                            preparing your application, funding, visa and
                            pre-departure plans, explore the information you
                            need at every stage.
                        </p>

                    </div>

                </div>


                <!-- ==================================================
                     JOURNEY TIMELINE
                =================================================== -->

                <div
                    class="study-abroad-journey"
                    aria-label="Study abroad journey"
                >

                    <div class="study-abroad-journey-line"></div>

                    ${journeySteps
                        .map(
                            (step) => `
                                <div class="study-abroad-journey-step">

                                    <span class="study-abroad-journey-number">
                                        ${step.number}
                                    </span>

                                    <div class="study-abroad-journey-content">

                                        <h3>
                                            ${step.title}
                                        </h3>

                                        <p>
                                            ${step.description}
                                        </p>

                                    </div>

                                </div>
                            `
                        )
                        .join("")}

                </div>


                <!-- ==================================================
                     SUPPORT SERVICES
                =================================================== -->

                <div class="study-abroad-support-grid">

                    ${supportServices
                        .map(
                            (service) => `
                                <article
                                    class="study-abroad-support-card"
                                    data-support-category="${service.category}"
                                >

                                    <div class="study-abroad-support-card-top">

                                        <span class="study-abroad-support-number">
                                            ${service.number}
                                        </span>

                                        <span class="study-abroad-support-category">
                                            ${service.category}
                                        </span>

                                    </div>


                                    <div class="study-abroad-support-card-content">

                                        <h3>
                                            ${service.title}
                                        </h3>

                                        <p>
                                            ${service.description}
                                        </p>

                                    </div>


                                    <a
                                        href="${service.link}"
                                        class="study-abroad-support-link"
                                    >

                                        ${service.linkText}

                                        <span aria-hidden="true">
                                            →
                                        </span>

                                    </a>

                                </article>
                            `
                        )
                        .join("")}

                </div>


                <!-- ==================================================
                     DOCUMENT CHECKLIST
                =================================================== -->

                <div
                    class="study-abroad-document-section"
                    id="study-abroad-documents"
                >

                    <div class="study-abroad-document-content">

                        <span class="study-abroad-section-eyebrow">
                            APPLICATION PREPARATION
                        </span>

                        <h3>
                            Start preparing your documents early
                        </h3>

                        <p>
                            The documents required for an overseas education
                            application depend on your university, course,
                            destination and applicant profile. Use this as a
                            general planning checklist and verify the exact
                            requirements with your institution.
                        </p>

                    </div>


                    <div class="study-abroad-document-checklist">

                        <div class="study-abroad-document-item">
                            <span>01</span>
                            <strong>Academic records</strong>
                            <small>
                                Transcripts, marksheets and certificates
                            </small>
                        </div>

                        <div class="study-abroad-document-item">
                            <span>02</span>
                            <strong>Identity documents</strong>
                            <small>
                                Passport and required identification
                            </small>
                        </div>

                        <div class="study-abroad-document-item">
                            <span>03</span>
                            <strong>Language test results</strong>
                            <small>
                                Where required by the institution
                            </small>
                        </div>

                        <div class="study-abroad-document-item">
                            <span>04</span>
                            <strong>Statement of purpose</strong>
                            <small>
                                Where required by the program
                            </small>
                        </div>

                        <div class="study-abroad-document-item">
                            <span>05</span>
                            <strong>Recommendation letters</strong>
                            <small>
                                Where required by the university
                            </small>
                        </div>

                        <div class="study-abroad-document-item">
                            <span>06</span>
                            <strong>Financial documents</strong>
                            <small>
                                Where required for application or visa
                            </small>
                        </div>

                    </div>

                </div>


                <!-- ==================================================
                     IMPORTANT NOTICE
                =================================================== -->

                <div class="study-abroad-support-notice">

                    <div class="study-abroad-support-notice-icon">
                        !
                    </div>

                    <div>

                        <strong>
                            Requirements can vary
                        </strong>

                        <p>
                            Admission, scholarship, visa and financial
                            requirements can change and may differ between
                            institutions and destinations. Always verify
                            current requirements with the relevant official
                            university, government or test provider.
                        </p>

                    </div>

                </div>


                <!-- ==================================================
                     COUNSELLING CTA
                =================================================== -->

                <div
                    class="study-abroad-support-cta"
                    id="study-abroad-counselling"
                >

                    <div class="study-abroad-support-cta-content">

                        <span class="study-abroad-section-eyebrow">
                            NEED PERSONALIZED GUIDANCE?
                        </span>

                        <h3>
                            Talk to a Study Abroad counsellor
                        </h3>

                        <p>
                            Share your academic background, preferred course,
                            destination and approximate budget to discuss
                            possible study abroad options.
                        </p>

                    </div>


                    <div class="study-abroad-support-cta-actions">

                        <a
                            href="#study-abroad-lead-form"
                            class="study-abroad-primary-button"
                        >
                            Get free counselling
                            <span aria-hidden="true">→</span>
                        </a>

                        <a
                            href="#study-abroad-course-explorer"
                            class="study-abroad-secondary-button"
                        >
                            Explore courses
                        </a>

                    </div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-support-seo">

                    <h2>
                        Study abroad counselling and application guidance
                    </h2>

                    <p>
                        Planning to study abroad from India involves several
                        stages, including choosing a destination, finding
                        suitable courses and universities, checking admission
                        requirements, preparing documents and understanding
                        application deadlines.
                    </p>

                    <p>
                        Students may also need to consider English-language
                        tests, scholarships, education financing, student visa
                        requirements and pre-departure planning. The exact
                        process depends on the destination, university,
                        program and individual applicant.
                    </p>

                    <p>
                        EDUCONNECT provides a centralized Study Abroad
                        experience where students can explore destinations,
                        courses, universities, scholarships, education loans,
                        exams and application guidance before taking their
                        next step.
                    </p>

                </div>

            </div>

        </section>
    `;
}