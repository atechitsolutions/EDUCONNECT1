/* =========================================================
   EDUCONNECT — STUDY ABROAD PAGE
   ---------------------------------------------------------
   Page composition only.

   KEEP UNCHANGED:
   - Existing Study Abroad Navbar
   - Existing Header / Footer
   - Existing Hero
   - Lead Form / Counselling
   - SEO / Metadata
   - Existing Vanilla JS + Vite architecture
========================================================= */

import StudyAbroadHero
    from "../components/studyAbroad/StudyAbroadHero.js";

import StudyAbroadDestinations
    from "../components/studyAbroad/StudyAbroadDestinations.js";

import { loadStudyAbroadInstitutions }
    from "../assets/js/institutionSearch.js";

import StudyAbroadLeadForm
    from "../components/StudyAbroadLeadForm.js";

import CountryComparison
    from "../components/studyAbroad/CountryComparison.js";

import Intakes
    from "../components/studyAbroad/Intakes.js";

import AbroadScholarships
    from "../components/studyAbroad/AbroadScholarships.js";

import StudyAbroadCost
    from "../components/studyAbroad/StudyAbroadCost.js";

import AbroadStudentReviews
    from "../components/studyAbroad/AbroadStudentReviews.js";

import StudyAbroadFAQ
    from "../components/studyAbroad/StudyAbroadFAQ.js";

import StudyAbroadCTA
    from "../components/studyAbroad/StudyAbroadCTA.js";


/* =========================================================
   STUDY ABROAD PAGE
========================================================= */

export default function StudyAbroadPage() {

    setTimeout(() => {
        loadStudyAbroadInstitutions().catch((error) => {
            console.error("Unable to load Study Abroad institution cards.", error);
        });
    }, 0);

    return `

        <div
            id="study-abroad-content"
            class="study-abroad-page-content"
        >

            <!-- =================================================
                 01. HERO
            ================================================== -->

            ${StudyAbroadHero()}

            ${StudyAbroadDestinations()}




            <!-- =================================================
                 02. LEAD / COUNSELLING FORM
            ================================================== -->

            ${StudyAbroadLeadForm()}


            <!-- =================================================
                 03. COUNTRY COMPARISON
            ================================================== -->

            ${CountryComparison()}


            <!-- =================================================
                 04. INTAKES & DEADLINES
            ================================================== -->

            ${Intakes()}


            <!-- =================================================
                 05. SCHOLARSHIPS
            ================================================== -->

            ${AbroadScholarships()}


            <!-- =================================================
                 06. EDUCATION COST
            ================================================== -->

            ${StudyAbroadCost()}


            <!-- =================================================
                 07. STUDENT REVIEWS
            ================================================== -->

            ${AbroadStudentReviews()}


            <!-- =================================================
                 08. FAQ
            ================================================== -->

            ${StudyAbroadFAQ()}


            <!-- =================================================
                 09. FINAL CTA
            ================================================== -->

            ${StudyAbroadCTA()}

        </div>

    `;
}
