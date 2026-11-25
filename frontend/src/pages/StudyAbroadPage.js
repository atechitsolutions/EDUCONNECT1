import StudyAbroadHero from "../components/studyAbroad/StudyAbroadHero.js";

import StudyAbroadDestinations from "../components/studyAbroad/StudyAbroadDestinations.js";

import { loadStudyAbroadInstitutions } from "../assets/js/institutionSearch.js";

import StudyAbroadLeadForm from "../components/StudyAbroadLeadForm.js";

import CountryComparison from "../components/studyAbroad/CountryComparison.js";

import Intakes from "../components/studyAbroad/Intakes.js";

import AbroadScholarships from "../components/studyAbroad/AbroadScholarships.js";

import StudyAbroadCost from "../components/studyAbroad/StudyAbroadCost.js";

import AbroadStudentReviews from "../components/studyAbroad/AbroadStudentReviews.js";

import StudyAbroadFAQ from "../components/studyAbroad/StudyAbroadFAQ.js";

import StudyAbroadCTA from "../components/studyAbroad/StudyAbroadCTA.js";

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


            ${StudyAbroadHero()}

            ${StudyAbroadDestinations()}





            ${StudyAbroadLeadForm()}



            ${CountryComparison()}



            ${Intakes()}



            ${AbroadScholarships()}



            ${StudyAbroadCost()}



            ${AbroadStudentReviews()}



            ${StudyAbroadFAQ()}



            ${StudyAbroadCTA()}

        </div>

    `;
}
