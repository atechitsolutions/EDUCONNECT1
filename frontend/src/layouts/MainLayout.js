import Header from "./header";
import Navbar from "./navbar";

import Hero from "../components/home/hero.js";

import RunningSocial from "../components/RunningSocial.js";
import CurrentAffairs from "../components/CurrentAffairs.js";

import Categories from "../components/home/categories.js";

import PlaySchoolSection from "../components/home/PlaySchoolSection.js";

import PreSchoolSection from "../components/home/PreSchoolSection.js";

import SchoolSection from "../components/home/SchoolSection.js";

import TopBoardingSchoolsSection from "../components/home/TopBoardingSchoolsSection.js";

import TopUGPGCollegesSection from "../components/home/TopUGPGCollegesSection.js";

import { OnlineEducationSection } from "../components/home/OnlineEducationSection.js";

import { NewsSection } from "../components/home/NewsSection.js";

import StudyAbroadSection from "../components/home/studyAbroad.js";

import ScholarshipSection from "../components/home/scholarshipSection.js";

import TopListsSection from "../components/home/topListsSection.js";

import RankingsSection from "../components/home/rankingsSection.js";

import StudentReviewsSection from "../components/home/studentReviewsSection.js";

import CompareCollegeSection from "../components/home/compareCollegeSection.js";

import InstitutionCompareSection from "../components/home/InstitutionCompareSection.js";

import EducationLoanSection from "../components/home/educationLoanSection.js";

import TopCompaniesSection from "../components/home/TopCompaniesSection.js";

import FooterSection from "../components/home/footerSection.js";

export default function MainLayout() {
    return `


        ${Header()}



        ${Navbar()}



        <main id="main-content">



            <section
                id="hero"
                aria-label="StepInStudents education search"
            >
                ${Hero()}
            </section>



            <section
                id="education-social"
                aria-label="Education updates and social content"
            >
                ${RunningSocial()}
            </section>



            <section
                id="current-affairs"
                aria-label="Current affairs and education updates"
            >
                ${CurrentAffairs()}
            </section>



            <section
                id="education-categories"
                aria-label="Education categories"
            >
                ${Categories()}
            </section>



            <section
                id="play-school"
                aria-label="Play school education"
            >
                ${PlaySchoolSection()}
            </section>



            <section
                id="pre-school"
                aria-label="Pre school education"
            >
                ${PreSchoolSection()}
            </section>



            <section
                id="schools"
                aria-label="Schools and school education"
            >
                ${SchoolSection()}
            </section>



            <section
                id="boarding-schools"
                aria-label="Top boarding schools"
            >
                ${TopBoardingSchoolsSection()}
            </section>



            <section
                id="colleges"
                aria-label="Undergraduate and postgraduate colleges"
            >
                ${TopUGPGCollegesSection()}
            </section>



            <section
                id="online-education"
                aria-label="Online and distance education"
            >
                ${OnlineEducationSection()}
            </section>



            <section
                id="news"
                aria-label="Latest education news"
            >
                ${NewsSection()}
            </section>



            <section
                id="study-abroad"
                aria-label="Study abroad education"
            >
                ${StudyAbroadSection()}
            </section>



            <section
                id="rankings"
                aria-label="Education rankings"
            >
                ${RankingsSection()}
            </section>



            <section
                id="student-reviews"
                aria-label="Student reviews"
            >
                ${StudentReviewsSection()}
            </section>



            <section
                id="scholarships"
                aria-label="Scholarships and financial aid"
            >
                ${ScholarshipSection()}
            </section>



            <section id="education-loans" aria-label="Education loan information">
                ${EducationLoanSection()}
            </section>



            <section
                id="top-lists"
                aria-label="Top education lists"
            >
                ${TopListsSection()}
            </section>



            <section
                id="institution-comparison"
                aria-label="Compare universities, colleges and schools"
            >
                ${InstitutionCompareSection()}
            </section>

            <section
                id="compare-college"
                aria-label="Compare colleges and universities"
            >
                ${CompareCollegeSection()}
            </section>



            <section
                id="top-companies"
                aria-label="Top companies and career opportunities"
            >
                ${TopCompaniesSection()}
            </section>


        </main>



        ${FooterSection()}

    `;
}
