/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD FAQ
 * ============================================================
 *
 * Purpose:
 * - Frequently asked questions
 * - Search-intent content
 * - Accessible FAQ interaction
 * - SEO-friendly semantic structure
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadFaq() {

    const faqs = [
        {
            question:
                "When should I start planning to study abroad from India?",

            answer:
                "It is generally useful to start planning well before your intended intake so you have time to research destinations and universities, prepare required tests and documents, review deadlines and organize your finances. The appropriate timeline varies by country, university and program."
        },

        {
            question:
                "How do I choose the right country to study abroad?",

            answer:
                "Consider the availability of your preferred course, universities, admission requirements, tuition fees, living costs, scholarships, application timelines and your personal priorities. Comparing these factors can help you create a more informed shortlist."
        },

        {
            question:
                "How do I choose a university for studying abroad?",

            answer:
                "Start by identifying programs that match your academic goals. Then compare the curriculum, admission requirements, tuition, location, available facilities, application deadlines and other factors that matter to you. Always verify current information directly with the university before applying."
        },

        {
            question:
                "What are the common requirements for studying abroad?",

            answer:
                "Requirements vary by destination, institution, program and applicant. Depending on your situation, you may need academic records, identification documents, language-test results, a statement of purpose, recommendation letters, financial documentation and other supporting documents."
        },

        {
            question:
                "Do I need IELTS or TOEFL to study abroad?",

            answer:
                "Some universities and programs require proof of English-language proficiency, while requirements and accepted tests can differ. Check the official requirements of each university and program you are considering."
        },

        {
            question:
                "How much does it cost to study abroad from India?",

            answer:
                "Costs vary by destination, city, university, course and study duration. Compare tuition and living expenses, then confirm current fees with the university and consult official sources before setting your budget."
        },

        {
            question:
                "Can Indian students get scholarships to study abroad?",

            answer:
                "Scholarship eligibility, funding and deadlines vary by university, course and provider. Check the official scholarship and university pages for current requirements and deadlines; awards are not guaranteed."
        },

        {
            question:
                "What should Indian students check before applying to study in Germany?",

            answer:
                "Check whether your academic qualification meets the chosen university’s entry requirements, confirm the programme’s language requirements and review the current APS guidance from the German Missions in India. Requirements depend on your qualifications and programme, so verify them with the university and official sources."
        }


    ];


    return `
        <section
            class="study-abroad-faq-section"
            id="study-abroad-faq"
            aria-labelledby="study-abroad-faq-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     HEADER
                =================================================== -->

                <div class="study-abroad-faq-header">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            FREQUENTLY ASKED QUESTIONS
                        </span>

                        <h2 id="study-abroad-faq-title">
                            Study Abroad from India: Admissions, Costs & Scholarships
                        </h2>

                        <p>
                            Get answers to common questions about choosing a country, applying to universities abroad, scholarships for Indian students, tuition and living costs, language tests and student visa planning.
                        </p>

                    </div>


                    <a
                        href="#"
                        class="study-abroad-primary-button"
                        onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                    >
                        Talk to a counsellor
                        <span aria-hidden="true">→</span>
                    </a>

                </div>


                <!-- ==================================================
                     FAQ LAYOUT
                =================================================== -->

                <div class="study-abroad-faq-layout">


                    <!-- CATEGORY NAVIGATION -->

                    <aside
                        class="study-abroad-faq-sidebar"
                        aria-label="FAQ categories"
                    >

                        <span>
                            EXPLORE TOPICS
                        </span>

                        <button
                            type="button"
                            class="study-abroad-faq-category active"
                            data-faq-category="all"
                        >
                            All questions
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="planning"
                        >
                            Planning
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="admission"
                        >
                            Admissions
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="finance"
                        >
                            Scholarships & finance
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="visa"
                        >
                            Visa & travel
                        </button>

                    </aside>


                    <!-- QUESTIONS -->

                    <div
                        class="study-abroad-faq-list"
                        id="study-abroad-faq-list"
                    >

                        ${faqs
                            .map(
                                (faq, index) => `
                                    <details
                                        class="study-abroad-faq-item"
                                        data-faq-index="${index}"
                                    >

                                        <summary>

                                            <span>
                                                ${faq.question}
                                            </span>

                                            <span
                                                class="study-abroad-faq-icon"
                                                aria-hidden="true"
                                            >
                                                +
                                            </span>

                                        </summary>

                                        <div class="study-abroad-faq-answer">

                                            <p>
                                                ${faq.answer}
                                            </p>

                                        </div>

                                    </details>
                                `
                            )
                            .join("")}

                    </div>

                </div>


                <!-- ==================================================
                     FAQ CTA
                =================================================== -->

                <div class="study-abroad-faq-cta">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            STILL HAVE QUESTIONS?
                        </span>

                        <h3>
                            Get help with your Study Abroad plan.
                        </h3>

                        <p>
                            Tell us about your course, destination and
                            academic background to discuss your next steps.
                        </p>

                    </div>


                    <div class="study-abroad-faq-actions">

                      <a
                          href="#"
                          class="study-abroad-primary-button"
                          onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                      > Get free counselling
                            <span aria-hidden="true">→</span>
                        </a>

                        <a
                            href="#study-abroad-destination-explorer"
                            class="study-abroad-secondary-button"
                        >
                            Explore destinations
                        </a>

                    </div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-faq-seo">

                    <h2>
                        Study abroad from India: admissions, fees and scholarships
                    </h2>

                    <p>
                        Find answers about studying abroad from India,
                        including choosing a country or university, course
                        eligibility, application deadlines, scholarships,
                        education costs, language tests and student visas.
                    </p>



                    <p>
                        Before submitting an application, verify current
                        academic, financial, admission and visa requirements
                        using the official sources provided by the relevant
                        university, test provider or government authority.
                    </p>

                </div>

            </div>


            <!-- ==================================================
                 FAQ STRUCTURED DATA
                 ==================================================

                 This JSON-LD is generated from the visible FAQ
                 content above.

                 Search engines determine independently whether
                 FAQ rich results are eligible to appear.
            =================================================== -->

            <script type="application/ld+json">
                ${JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faqs.map((faq) => ({
                        "@type": "Question",
                        "name": faq.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": faq.answer
                        }
                    }))
                })}
            </script>

        </section>
    `;
}
