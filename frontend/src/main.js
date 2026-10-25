import initPremiumCursor
    from "./assets/js/premiumCursor.js";
import { initWebsiteAssistant } from "./components/WebsiteAssistant.js";
import { initCommunityPage } from "./assets/js/communityPage.js";

import initScrollPlane
    from "./assets/js/scrollPlane.js";

/* =========================================================
   GLOBAL CSS
========================================================= */

import "./assets/css/premiumCursor.css";
import "./assets/css/website-assistant.css";
import "./assets/css/variables.css";
import "./assets/css/style.css";

import "./assets/css/header.css";
import "./assets/css/navbar.css";
import "./assets/css/community.css";

/* =========================================================
   STUDY ABROAD — SEARCH
========================================================= */

import "./assets/css/studyAbroadSearch.css";
import "./assets/css/institutionSearch.css";

/* =========================================================
   STUDY ABROAD — DESTINATIONS
========================================================= */

import "./assets/css/study-abroad-destinations.css";

/* =========================================================
   STUDY ABROAD — COUNTRY COMPARISON
========================================================= */

import "./assets/css/study-abroad-country-comparison.css";

/* =========================================================
   STUDY ABROAD — DEGREE EXPLORER
========================================================= */

/* =========================================================
   STUDY ABROAD — COURSE EXPLORER
========================================================= */

import "./assets/css/study-abroad-course-explorer.css";

/* =========================================================
   STUDY ABROAD — TOP UNIVERSITIES
========================================================= */

import "./assets/css/study-abroad-top-universities.css";

/* =========================================================
   STUDY ABROAD — ADMISSION REQUIREMENTS
========================================================= */

import "./assets/css/study-abroad-admission-requirements.css";

/* =========================================================
   STUDY ABROAD — APPLICATION PROCESS
========================================================= */

import "./assets/css/study-abroad-application-process.css";

/* =========================================================
   STUDY ABROAD — INTAKES
========================================================= */

import "./assets/css/study-abroad-intakes.css";

/* =========================================================
   STUDY ABROAD — GLOBAL CONTENT FOUNDATION
========================================================= */

import "./assets/css/studyAbroad.css";

/* =========================================================
   STUDY ABROAD — NAVBAR
========================================================= */

import "./assets/css/studyAbroadNavbar.css";
import "./assets/css/study-abroad-lead-form.css";
import "./assets/css/study-abroad-scholarships.css";
import "./assets/css/study-abroad-cost.css";
import "./assets/css/study-abroad-student-reviews.css";
import "./assets/css/study-abroad-faq.css";
import "./assets/css/study-abroad-cta.css";

/* =========================================================
   OTHER GLOBAL CSS
========================================================= */

import "./assets/css/home.css";
import "./assets/css/footer.css";
import "./assets/css/ticker.css";
import "./assets/css/ui.css";
import "./assets/css/responsive.css";
import "./assets/css/earlyLearning.css";
import "./assets/css/online-education.css";
import "./assets/css/online-education-card-layouts.css";
import "./assets/css/online-education-admin.css";
import "./assets/css/institution-compare.css";
import "./assets/css/education-loan-section.css";

/* =========================================================
   ROUTER
========================================================= */

import Router from "./router/router.js";

import {
    initInstitutionSearch
} from "./assets/js/institutionSearch.js";

import {
    initOnlineEducationPage
} from "./assets/js/onlineEducationPage.js";

import {
    initOnlineEducationAdminPage
} from "./pages/OnlineEducationAdminPage.js";

import {
    initInstitutionCompareSection
} from "./components/home/InstitutionCompareSection.js";

import {
    initEducationLoanSection
} from "./components/home/educationLoanSection.js";

import {
    applyStudyAbroadSEO
} from "./utils/studyAbroadSEO.js";

import {
    initStudyAbroadCountryMenu
} from "./layouts/StudyAbroadNavbar.js";

/* =========================================================
   ONLINE EDUCATION CAROUSEL
========================================================= */

import {
    initOnlineEducationCarousel
} from "./assets/js/onlineEducation.js";

/* =========================================================
   NEWS CAROUSEL
========================================================= */

import {
    initNewsCarousel
} from "./assets/js/newsCarousel.js";

/* =========================================================
   STUDY ABROAD CAROUSEL
========================================================= */

import {
    initStudyAbroadCarousel
} from "./assets/js/studyAbroadCarousel.js";

/* =========================================================
   SCHOLARSHIP CAROUSEL
========================================================= */

import {
    initScholarshipCarousel
} from "./assets/js/scholarshipCarousel.js";

/* =========================================================
   RANKINGS CAROUSEL
========================================================= */

import {
    initRankingsCarousel
} from "./assets/js/rankingsCarousel.js";

/* =========================================================
   STUDENT REVIEWS CAROUSEL
========================================================= */

import {
    initStudentReviewsCarousel
} from "./assets/js/studentReviewsCarousel.js";

/* =========================================================
   TOP LISTS CAROUSEL
========================================================= */

import {
    initTopListsCarousel
} from "./assets/js/topListsCarousel.js";

/* =========================================================
   COMPARE COLLEGE CAROUSEL
========================================================= */

import {
    initCompareCollegeCarousel
} from "./assets/js/compareCollegeCarousel.js";

/* =========================================================
   AUTHENTICATION
========================================================= */

import {
    initAuth
} from "./assets/js/auth.js";

import "./assets/css/auth.css";
import "./assets/css/admin.css";

/* =========================================================
   APPLICATION INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =====================================================
           APP ROOT
        ====================================================== */

        const app =
            document.getElementById("app");

        /* =====================================================
           CHECK APP ROOT
        ====================================================== */

        if (!app) {

            console.error(
                "App root element (#app) was not found."
            );

            return;
        }

        /* =====================================================
           RENDER APPLICATION
        ====================================================== */

        app.innerHTML =
            Router();

        /* =====================================================
           STUDY ABROAD SEARCH
        ====================================================== */

        initInstitutionSearch();

        /* =====================================================
           INSTITUTION COMPARISON
        ====================================================== */

        initInstitutionCompareSection();

        /* =====================================================
           WEBSITE ASSISTANT
        ====================================================== */

        initWebsiteAssistant();

        /* =====================================================
           STUDY ABROAD SEO
        ====================================================== */

        applyStudyAbroadSEO();

        /* =====================================================
           STUDY ABROAD COUNTRY MENU
        ====================================================== */

        if (
            document.querySelector("#edu-study-nav")
        ) {
            initStudyAbroadCountryMenu();
        }

        /* =====================================================
           ONLINE EDUCATION PUBLIC PAGE
        ====================================================== */

        if (
            document.querySelector("#online-education-page")
        ) {

            initOnlineEducationPage().catch((error) => {

                console.error(
                    "Online Education initialization failed:",
                    error
                );

            });

        }

        /* =====================================================
           ONLINE EDUCATION ADMIN PAGE
        ====================================================== */

        if (
            document.querySelector(".oe-admin-page")
        ) {
            initOnlineEducationAdminPage();
        }

        /* =====================================================
           AUTHENTICATION
        ====================================================== */

        initAuth();

        /* =====================================================
           COMMUNITY PAGE
        ====================================================== */

        if (
            document.querySelector("#community-page")
        ) {
            initCommunityPage();
        }

        /* =====================================================
           ONLINE EDUCATION CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#online-education")
        ) {
            initOnlineEducationCarousel();
        }

        /* =====================================================
           NEWS CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#news")
        ) {
            initNewsCarousel();
        }

        /* =====================================================
           STUDY ABROAD CAROUSEL
        ====================================================== */

        if (
            document.querySelector(
                "#study-abroad, #study-abroad-page"
            )
        ) {
            initStudyAbroadCarousel();
        }

        /* =====================================================
           SCHOLARSHIP CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#scholarship")
        ) {
            initScholarshipCarousel();
        }

        /* =====================================================
           RANKINGS CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#rankings")
        ) {
            initRankingsCarousel();
        }

        /* =====================================================
           STUDENT REVIEWS CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#student-reviews")
        ) {
            initStudentReviewsCarousel();
        }

        /* =====================================================
           EDUCATION LOAN SECTION
        ====================================================== */

        initEducationLoanSection();

        /* =====================================================
           TOP LISTS CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#top-lists")
        ) {
            initTopListsCarousel();
        }

        /* =====================================================
           COMPARE COLLEGE CAROUSEL
        ====================================================== */

        if (
            document.querySelector("#compare-college")
        ) {
            initCompareCollegeCarousel();
        }

        /* =====================================================
           PREMIUM CURSOR
        ====================================================== */

        initPremiumCursor();

        /* =====================================================
           SCROLL PAPER PLANE

           Disabled intentionally because it previously
           created unwanted whitespace after the footer.
        ====================================================== */

        // initScrollPlane();

        /* =====================================================
           VIEW ALL / SHOW LESS
           BOARDING SCHOOLS
        ====================================================== */

        const boardingSection =
            document.querySelector(
                ".boarding-schools-section"
            );

        if (boardingSection) {

            const boardingButton =
                boardingSection.querySelector(
                    ".boarding-schools-explore-btn"
                );

            const boardingAll =
                boardingSection.querySelector(
                    ".boarding-schools-all"
                );

            if (
                boardingButton &&
                boardingAll
            ) {

                boardingButton.addEventListener(
                    "click",
                    () => {

                        const isExpanded =
                            boardingSection.classList
                                .toggle("is-expanded");

                        boardingAll.hidden =
                            !isExpanded;

                        const text =
                            boardingButton.querySelector(
                                ".boarding-view-all-text"
                            );

                        const arrow =
                            boardingButton.querySelector(
                                "span:last-child"
                            );

                        if (isExpanded) {

                            if (text) {
                                text.textContent =
                                    "Show Less";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "↑";
                            }

                            boardingAll.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        } else {

                            if (text) {
                                text.textContent =
                                    "View All Boarding Schools";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "→";
                            }

                            boardingSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }

        }

        /* =====================================================
           VIEW ALL / SHOW LESS
           COMPANIES
        ====================================================== */

        const companySection =
            document.querySelector(
                ".top-companies-section"
            );

        if (companySection) {

            const companyButton =
                companySection.querySelector(
                    ".top-companies-explore-btn"
                );

            const companyAll =
                companySection.querySelector(
                    ".top-companies-all"
                );

            if (
                companyButton &&
                companyAll
            ) {

                companyButton.addEventListener(
                    "click",
                    () => {

                        const isExpanded =
                            companySection.classList
                                .toggle("is-expanded");

                        companyAll.hidden =
                            !isExpanded;

                        const text =
                            companyButton.querySelector(
                                ".top-companies-view-all-text"
                            );

                        const arrow =
                            companyButton.querySelector(
                                "span:last-child"
                            );

                        if (isExpanded) {

                            if (text) {
                                text.textContent =
                                    "Show Less";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "↑";
                            }

                            companyAll.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        } else {

                            if (text) {
                                text.textContent =
                                    "View All Companies";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "→";
                            }

                            companySection.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }

        }

        /* =====================================================
           VIEW ALL / SHOW LESS
           UG + PG COLLEGES
        ====================================================== */

        const collegeWrapper =
            document.querySelector(
                ".ug-pg-section-wrapper"
            );

        if (collegeWrapper) {

            const collegeButton =
                collegeWrapper.querySelector(
                    ".ug-pg-cta-button"
                );

            const collegeAll =
                collegeWrapper.querySelector(
                    ".ug-pg-all"
                );

            if (
                collegeButton &&
                collegeAll
            ) {

                collegeButton.addEventListener(
                    "click",
                    () => {

                        const isExpanded =
                            collegeWrapper.classList
                                .toggle("is-expanded");

                        collegeAll.hidden =
                            !isExpanded;

                        const text =
                            collegeButton.querySelector(
                                ".ug-pg-view-all-text"
                            );

                        const arrow =
                            collegeButton.querySelector(
                                "span:last-child"
                            );

                        if (isExpanded) {

                            if (text) {
                                text.textContent =
                                    "Show Less";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "↑";
                            }

                            collegeAll.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        } else {

                            if (text) {
                                text.textContent =
                                    "View All Colleges";
                            }

                            if (arrow) {
                                arrow.textContent =
                                    "→";
                            }

                            collegeWrapper.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }

        }

        /* =====================================================
           CAROUSEL PERFORMANCE OPTIMIZATION

           Pause selected legacy animated carousels when
           they are outside the viewport.
        ====================================================== */

        const animatedCarouselTracks =
            document.querySelectorAll(`
                .boarding-schools-track,
                .top-companies-track,
                #top-ug-pg-colleges .ug-pg-track
            `);

        if (
            animatedCarouselTracks.length &&
            "IntersectionObserver" in window
        ) {

            const carouselVisibilityObserver =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                const track =
                                    entry.target;

                                if (entry.isIntersecting) {

                                    track.style
                                        .animationPlayState =
                                        "running";

                                } else {

                                    track.style
                                        .animationPlayState =
                                        "paused";

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.05
                    }
                );

            animatedCarouselTracks.forEach(
                (track) => {

                    carouselVisibilityObserver.observe(
                        track
                    );

                }
            );

        }

    }
);