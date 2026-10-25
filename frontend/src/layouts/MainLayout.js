import Header from "./header";
import Navbar from "./navbar";

import Hero from "../components/home/hero.js";

import RunningSocial from "../components/RunningSocial.js";
import CurrentAffairs from "../components/CurrentAffairs.js";

import Categories from "../components/home/categories.js";

import PlaySchoolSection
    from "../components/home/PlaySchoolSection.js";

import PreSchoolSection
    from "../components/home/PreSchoolSection.js";

import SchoolSection
    from "../components/home/SchoolSection.js";

import TopBoardingSchoolsSection
    from "../components/home/TopBoardingSchoolsSection.js";

import TopUGPGCollegesSection
    from "../components/home/TopUGPGCollegesSection.js";

import {
    OnlineEducationSection
} from "../components/home/OnlineEducationSection.js";

import {
    NewsSection
} from "../components/home/NewsSection.js";

import StudyAbroadSection
    from "../components/home/studyAbroad.js";

import ScholarshipSection
    from "../components/home/scholarshipSection.js";

import TopListsSection
    from "../components/home/topListsSection.js";

import RankingsSection
    from "../components/home/rankingsSection.js";

import StudentReviewsSection
    from "../components/home/studentReviewsSection.js";

import CompareCollegeSection
    from "../components/home/compareCollegeSection.js";

import InstitutionCompareSection
    from "../components/home/InstitutionCompareSection.js";

import EducationLoanSection
    from "../components/home/educationLoanSection.js";

import TopCompaniesSection
    from "../components/home/TopCompaniesSection.js";

import FooterSection
    from "../components/home/footerSection.js";


export default function MainLayout() {

    return `

        <!-- =====================================================
             SITE HEADER
        ====================================================== -->

        ${Header()}


        <!-- =====================================================
             PRIMARY NAVIGATION
        ====================================================== -->

        ${Navbar()}


        <!-- =====================================================
             MAIN HOMEPAGE CONTENT
        ====================================================== -->

        <main id="main-content">


            <!-- =================================================
                 HERO / PRIMARY EDUCATION SEARCH
            ================================================== -->

            <section
                id="hero"
                aria-label="EduConnect education search"
            >
                ${Hero()}
            </section>


            <!-- =================================================
                 EDUCATION SOCIAL / DISCOVERY
            ================================================== -->

            <section
                id="education-social"
                aria-label="Education updates and social content"
            >
                ${RunningSocial()}
            </section>


            <!-- =================================================
                 CURRENT AFFAIRS
            ================================================== -->

            <section
                id="current-affairs"
                aria-label="Current affairs and education updates"
            >
                ${CurrentAffairs()}
            </section>


            <!-- =================================================
                 EDUCATION CATEGORIES
            ================================================== -->

            <section
                id="education-categories"
                aria-label="Education categories"
            >
                ${Categories()}
            </section>


            <!-- =================================================
                 PLAY SCHOOL
            ================================================== -->

            <section
                id="play-school"
                aria-label="Play school education"
            >
                ${PlaySchoolSection()}
            </section>


            <!-- =================================================
                 PRE SCHOOL
            ================================================== -->

            <section
                id="pre-school"
                aria-label="Pre school education"
            >
                ${PreSchoolSection()}
            </section>


            <!-- =================================================
                 SCHOOLS
            ================================================== -->

            <section
                id="schools"
                aria-label="Schools and school education"
            >
                ${SchoolSection()}
            </section>


            <!-- =================================================
                 TOP BOARDING SCHOOLS
            ================================================== -->

            <section
                id="boarding-schools"
                aria-label="Top boarding schools"
            >
                ${TopBoardingSchoolsSection()}
            </section>


            <!-- =================================================
                 UG AND PG COLLEGES
            ================================================== -->

            <section
                id="colleges"
                aria-label="Undergraduate and postgraduate colleges"
            >
                ${TopUGPGCollegesSection()}
            </section>


            <!-- =================================================
                 ONLINE EDUCATION
            ================================================== -->

            <section
                id="online-education"
                aria-label="Online and distance education"
            >
                ${OnlineEducationSection()}
            </section>


            <!-- =================================================
                 EDUCATION NEWS
            ================================================== -->

            <section
                id="news"
                aria-label="Latest education news"
            >
                ${NewsSection()}
            </section>


            <!-- =================================================
                 STUDY ABROAD
            ================================================== -->

            <section
                id="study-abroad"
                aria-label="Study abroad education"
            >
                ${StudyAbroadSection()}
            </section>


            <!-- =================================================
                 EDUCATION RANKINGS
            ================================================== -->

            <section
                id="rankings"
                aria-label="Education rankings"
            >
                ${RankingsSection()}
            </section>


            <!-- =================================================
                 STUDENT REVIEWS
            ================================================== -->

            <section
                id="student-reviews"
                aria-label="Student reviews"
            >
                ${StudentReviewsSection()}
            </section>


            <!-- =================================================
                 SCHOLARSHIPS
            ================================================== -->

            <section
                id="scholarships"
                aria-label="Scholarships and financial aid"
            >
                ${ScholarshipSection()}
            </section>


            <!-- =================================================
                 EDUCATION LOANS
            ================================================== -->

            ${EducationLoanSection()}


            <!-- =================================================
                 EDUCATION TOP LISTS
            ================================================== -->

            <section
                id="top-lists"
                aria-label="Top education lists"
            >
                ${TopListsSection()}
            </section>


            <!-- =================================================
                 COLLEGE COMPARISON
            ================================================== -->

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


            <!-- =================================================
                 COMPANIES
            ================================================== -->

            <section
                id="top-companies"
                aria-label="Top companies and career opportunities"
            >
                ${TopCompaniesSection()}
            </section>


        </main>


        <!-- =====================================================
             FOOTER
        ====================================================== -->

        ${FooterSection()}

    `;
}
