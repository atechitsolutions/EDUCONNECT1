import initPremiumCursor from "./assets/js/premiumCursor.js";
import { initWebsiteAssistant } from "./components/WebsiteAssistant.js";
import { initCommunityPage } from "./assets/js/communityPage.js";
import { applyRouteSEO } from "./utils/routeSEO.js";
import { recordCollegeEvent } from "./services/collegePartnerService.js";
import { getCurrentUser } from "./services/authService.js";
import { initRegionalSchools } from "./components/home/regionalSchools.js";
import { initSchoolDiscoveryPage } from "./pages/SchoolDiscoveryPage.js";
import { initAdminSchoolEnquiriesPage } from "./pages/AdminSchoolEnquiriesPage.js";
import { initHomeSectionBanners } from "./assets/js/homeSectionBanners.js";
import initHomeSchoolCompare from "./assets/js/homeSchoolCompare.js";

import initScrollPlane from "./assets/js/scrollPlane.js";

/* Keep mobile footer accordions separate from desktop columns. */
document.addEventListener("click", (event) => {
    const button = event.target.closest(".footer-mobile-column .footer-accordion-toggle");
    if (!button || !window.matchMedia("(max-width: 600px)").matches) return;

    const column = button.closest(".footer-mobile-column");
    const groups = button.closest(".footer-mobile-groups");
    if (!column || !groups) return;

    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    groups.querySelectorAll(".footer-mobile-column").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".footer-accordion-toggle")?.setAttribute("aria-expanded", "false");
    });
    if (shouldOpen) {
        column.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
    }
});

import "./assets/css/premiumCursor.css";
import "./assets/css/website-assistant.css";
import "./assets/css/variables.css";
import "./assets/css/style.css";

import "./assets/css/header.css";
import "./assets/css/navbar.css";
import "./assets/css/community.css";

import "./assets/css/studyAbroadSearch.css";
import "./assets/css/institutionSearch.css";

import "./assets/css/study-abroad-destinations.css";

import "./assets/css/study-abroad-country-comparison.css";

import "./assets/css/study-abroad-course-explorer.css";

import "./assets/css/study-abroad-top-universities.css";

import "./assets/css/study-abroad-admission-requirements.css";

import "./assets/css/study-abroad-application-process.css";

import "./assets/css/study-abroad-intakes.css";

import "./assets/css/studyAbroad.css";

import "./assets/css/studyAbroadNavbar.css";
import "./assets/css/study-abroad-lead-form.css";
import "./assets/css/study-abroad-scholarships.css";
import "./assets/css/study-abroad-cost.css";
import "./assets/css/study-abroad-student-reviews.css";
import "./assets/css/study-abroad-faq.css";
import "./assets/css/study-abroad-cta.css";

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
import "./assets/css/college-discovery.css";
import "./assets/css/education-loan-section.css";

import Router from "./router/router.js";
import { initCollegePartnerAdminPage } from "./pages/CollegePartnerAdminPage.js";
import { initCollegeLoginPage } from "./pages/CollegeLoginPage.js";
import { initCollegePartnerDashboardPage } from "./pages/CollegePartnerDashboardPage.js";
import { initCollegeEnquiryPage } from "./pages/CollegeEnquiryPage.js";
import { initCollegeDiscoveryPage } from "./pages/CollegeDiscoveryPage.js";
import { initHomeCollegeDetails } from "./components/home/TopUGPGCollegesSection.js";
import { initAdmissionPartnersPage } from "./pages/AdmissionPartnersPage.js";
import { initAdmissionPartnerDashboardPage } from "./pages/AdmissionPartnerDashboardPage.js";
import { initAdmissionPartnerAdminPage } from "./pages/AdmissionPartnerAdminPage.js";

// Bind at document level so Explore actions still work when the college carousel
// replaces its cards after the homepage has rendered.
document.addEventListener(
    "click",
    (event) => {
        const closeButton = event.target.closest?.("[data-close-home-college-details]");
        if (closeButton) {
            const openDialog = closeButton.closest("[data-home-college-details]");
            if (openDialog) {
                openDialog.hidden = true;
                openDialog.classList.remove("is-open");
            }
            return;
        }
        const compareButton = event.target.closest?.('#top-ug-pg-colleges [data-action="compare"]');
        if (compareButton) {
            const isCompared = compareButton.dataset.compared === "true";
            compareButton.dataset.compared = isCompared ? "" : "true";
            compareButton.setAttribute("aria-pressed", String(!isCompared));
            compareButton.innerHTML = `${isCompared ? "Compare" : "Added to compare"}<span>›</span>`;
            compareButton
                .closest(".institution-card")
                ?.classList.toggle("is-selected-for-compare", !isCompared);
            return;
        }
        const button = event.target.closest?.(
            '[data-action="college-details"], [data-action="school-details"]',
        );
        const dialog = document.querySelector("[data-home-college-details]");
        if (!button || !dialog) return;
        const set = (selector, value) => {
            dialog.querySelector(selector).textContent = value || "Information not listed";
        };
        set("[data-college-modal-name]", button.dataset.collegeName);
        set(
            "[data-college-modal-location]",
            button.dataset.collegeLocation
                ? `${button.dataset.collegeLocation}${/india/i.test(button.dataset.collegeLocation) ? "" : ", India"}`
                : "Location not listed",
        );
        set("[data-college-modal-category]", button.dataset.collegeCategory);
        set("[data-college-modal-program]", button.dataset.collegeProgram);
        set("[data-college-modal-overview]", button.dataset.collegeOverview);
        const image = dialog.querySelector("[data-college-modal-image]");
        image.src = button.dataset.collegeImage || "";
        image.alt = button.dataset.collegeImageLabel
            ? `${button.dataset.collegeName || "Institution"} — ${button.dataset.collegeImageLabel}`
            : `${button.dataset.collegeName || "Institution"} campus`;
        image.hidden = !button.dataset.collegeImage;
        const enquire = dialog.querySelector("[data-college-modal-enquire]");
        enquire.href = button.dataset.collegeEnquiry || "#";
        dialog.hidden = false;
        dialog.classList.add("is-open");
    },
    true,
);
import "./assets/css/schools-discovery.css";

import { initInstitutionSearch } from "./assets/js/institutionSearch.js";

import { initOnlineEducationPage } from "./assets/js/onlineEducationPage.js";

import { initOnlineEducationAdminPage } from "./pages/OnlineEducationAdminPage.js";

import { initInstitutionCompareSection } from "./components/home/InstitutionCompareSection.js";

import { initEducationLoanSection } from "./components/home/educationLoanSection.js";

import { applyStudyAbroadSEO } from "./utils/studyAbroadSEO.js";

import { initStudyAbroadCountryMenu } from "./layouts/StudyAbroadNavbar.js";

import { initOnlineEducationCarousel } from "./assets/js/onlineEducation.js";

import { initNewsCarousel } from "./assets/js/newsCarousel.js";

import { initStudyAbroadCarousel } from "./assets/js/studyAbroadCarousel.js";

import { initScholarshipCarousel } from "./assets/js/scholarshipCarousel.js";

import { initRankingsCarousel } from "./assets/js/rankingsCarousel.js";

import { initStudentReviewsCarousel } from "./assets/js/studentReviewsCarousel.js";

import { initTopListsCarousel } from "./assets/js/topListsCarousel.js";

import { initCompareCollegeCarousel } from "./assets/js/compareCollegeCarousel.js";

import { initAuth } from "./assets/js/auth.js";

import "./assets/css/auth.css";
import "./assets/css/admin.css";
import "./assets/css/design-tokens.css";
import "./assets/css/navigation-system.css";
import "./assets/css/controls-cards.css";
import "./assets/css/public-experiences.css";
import "./assets/css/workspace-surfaces.css";
import "./assets/css/social-footer.css";
import "./assets/css/responsive-system.css";
import "./assets/css/iridescent-buttons.css";
import "./assets/css/footer-mobile.css";
import "./assets/css/home-card-swipe.css";
import initHomeCardSwipe from "./assets/js/homeCardSwipe.js";
import "./assets/css/home-section-banners.css";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    if (!app) {
        console.error("App root element (#app) was not found.");

        return;
    }

    // Track only actual profile/detail actions on institution cards.
    document.addEventListener(
        "click",
        (event) => {
            const control = event.target.closest(
                ".institution-card-action[data-action='details'], .institution-card-action[href]",
            );
            const institutionId = control?.closest(".institution-card")?.dataset.institutionId;
            if (!institutionId) return;
            if (
                control.dataset.action === "details" &&
                document.querySelector("[data-study-abroad-details-overlay]")
            )
                return;
            recordCollegeEvent(institutionId, "PROFILE_VIEW").catch(() => {});
        },
        true,
    );

    app.innerHTML = Router();

    initHomeSectionBanners();
    applyRouteSEO();
    initRegionalSchools();
    initCollegeDiscoveryPage();
    initHomeCollegeDetails();
    initHomeSchoolCompare();
    initSchoolDiscoveryPage();
    initAdminSchoolEnquiriesPage();

    const primaryNavigation = document.querySelector("#educonnect-primary-navigation");
    const navigationToggles = [
        ...document.querySelectorAll(".navbar-menu-toggle, .mobile-header-menu-toggle"),
    ];

    if (primaryNavigation && navigationToggles.length) {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        primaryNavigation.querySelectorAll("a[href]").forEach((link) => {
            try {
                const linkUrl = new URL(link.href, window.location.origin);
                const linkPath = linkUrl.pathname.replace(/\/$/, "") || "/";
                if (linkPath === currentPath && !linkUrl.hash)
                    link.setAttribute("aria-current", "page");
            } catch {
                /* Ignore non-route links. */
            }
        });

        navigationToggles.forEach((navigationToggle) => {
            navigationToggle.addEventListener("click", () => {
                const expanded = navigationToggle.getAttribute("aria-expanded") === "true";
                navigationToggles.forEach((toggle) => {
                    toggle.setAttribute("aria-expanded", String(!expanded));
                    toggle.setAttribute(
                        "aria-label",
                        expanded ? "Open main navigation" : "Close main navigation",
                    );
                });
                primaryNavigation.classList.toggle("is-open", !expanded);
                if (expanded) {
                    primaryNavigation
                        .querySelectorAll(".navbar-dropdown.is-open")
                        .forEach((item) => item.classList.remove("is-open"));
                    primaryNavigation
                        .querySelectorAll(".navbar-dropdown-link[aria-expanded='true']")
                        .forEach((link) => link.setAttribute("aria-expanded", "false"));
                }
            });
        });

        primaryNavigation.addEventListener("click", (event) => {
            const dropdownLink = event.target.closest(".navbar-dropdown-link");
            if (dropdownLink && window.matchMedia("(max-width: 768px)").matches) {
                const dropdown = dropdownLink.closest(".navbar-dropdown");
                if (dropdown && !dropdown.classList.contains("is-open")) {
                    event.preventDefault();
                    primaryNavigation
                        .querySelectorAll(".navbar-dropdown.is-open")
                        .forEach((item) => item.classList.remove("is-open"));
                    primaryNavigation
                        .querySelectorAll(".navbar-dropdown-link[aria-expanded='true']")
                        .forEach((link) => link.setAttribute("aria-expanded", "false"));
                    dropdown.classList.add("is-open");
                    dropdownLink.setAttribute("aria-expanded", "true");
                    return;
                }
            }
            if (event.target.closest("a") && window.matchMedia("(max-width: 768px)").matches) {
                navigationToggles.forEach((toggle) =>
                    toggle.setAttribute("aria-expanded", "false"),
                );
                primaryNavigation
                    .querySelectorAll(".navbar-dropdown.is-open")
                    .forEach((item) => item.classList.remove("is-open"));
                primaryNavigation
                    .querySelectorAll(".navbar-dropdown-link[aria-expanded='true']")
                    .forEach((link) => link.setAttribute("aria-expanded", "false"));
                primaryNavigation.classList.remove("is-open");
            }
        });
    }

    initInstitutionSearch();

    initInstitutionCompareSection();

    initWebsiteAssistant();

    applyStudyAbroadSEO();

    if (document.querySelector("#edu-study-nav")) {
        initStudyAbroadCountryMenu();
    }

    if (document.querySelector("#online-education-page")) {
        initOnlineEducationPage().catch((error) => {
            console.error("Online Education initialization failed:", error);
        });
    }

    if (document.querySelector(".oe-admin-page")) {
        initOnlineEducationAdminPage();
    }

    initAuth();

    initCollegePartnerAdminPage();
    initCollegeLoginPage();
    initCollegePartnerDashboardPage();
    initCollegeEnquiryPage();
    initAdmissionPartnersPage();
    initAdmissionPartnerDashboardPage();
    initAdmissionPartnerAdminPage();

    if (document.querySelector("#community-page")) {
        initCommunityPage();
    }

    if (document.querySelector("#online-education")) {
        initOnlineEducationCarousel();
    }

    if (document.querySelector("#news")) {
        initNewsCarousel();
    }

    if (document.querySelector("#study-abroad, #study-abroad-page")) {
        initStudyAbroadCarousel();
    }

    if (document.querySelector("#scholarship")) {
        initScholarshipCarousel();
    }

    if (document.querySelector("#rankings")) {
        initRankingsCarousel();
    }

    if (document.querySelector("#student-reviews")) {
        initStudentReviewsCarousel();
    }

    initEducationLoanSection();

    if (document.querySelector("#top-lists")) {
        initTopListsCarousel();
    }

    if (document.querySelector("#compare-college")) {
        initCompareCollegeCarousel();
    }

    initHomeCardSwipe();

    initPremiumCursor();

    // initScrollPlane();

    const boardingSection = document.querySelector(".boarding-schools-section");

    if (boardingSection) {
        const regionSelect = boardingSection.querySelector("#boarding-region-select");
        regionSelect?.addEventListener("change", () => {
            const selectedRegion = regionSelect.value;
            boardingSection.querySelectorAll("[data-directory-region]").forEach((regionGroup) => {
                regionGroup.hidden =
                    selectedRegion !== "all" &&
                    regionGroup.dataset.directoryRegion !== selectedRegion;
            });
            const directory = boardingSection.querySelector(".boarding-directory-regions");
            directory?.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        const boardingButton = boardingSection.querySelector(".boarding-schools-explore-btn");

        const boardingAll = boardingSection.querySelector(".boarding-schools-all");

        if (boardingButton && boardingAll) {
            boardingButton.addEventListener("click", () => {
                const isExpanded = boardingSection.classList.toggle("is-expanded");

                boardingAll.hidden = !isExpanded;

                const text = boardingButton.querySelector(".boarding-view-all-text");

                const arrow = boardingButton.querySelector("span:last-child");

                if (isExpanded) {
                    if (text) {
                        text.textContent = "Show Less";
                    }

                    if (arrow) {
                        arrow.textContent = "↑";
                    }

                    boardingAll.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    if (text) {
                        text.textContent = "View All Boarding Schools";
                    }

                    if (arrow) {
                        arrow.textContent = "→";
                    }

                    boardingSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        }
    }

    const companySection = document.querySelector(".top-companies-section");

    if (companySection) {
        const companyButton = companySection.querySelector(".top-companies-explore-btn");

        const companyAll = companySection.querySelector(".top-companies-all");

        if (companyButton && companyAll) {
            companyButton.addEventListener("click", () => {
                const isExpanded = companySection.classList.toggle("is-expanded");

                companyAll.hidden = !isExpanded;

                const text = companyButton.querySelector(".top-companies-view-all-text");

                const arrow = companyButton.querySelector("span:last-child");

                if (isExpanded) {
                    if (text) {
                        text.textContent = "Show Less";
                    }

                    if (arrow) {
                        arrow.textContent = "↑";
                    }

                    companyAll.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    if (text) {
                        text.textContent = "View All Companies";
                    }

                    if (arrow) {
                        arrow.textContent = "→";
                    }

                    companySection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        }
    }

    const collegeWrapper = document.querySelector(".ug-pg-section-wrapper");

    if (collegeWrapper) {
        const collegeButton = collegeWrapper.querySelector(".ug-pg-cta-button");

        const collegeAll = collegeWrapper.querySelector(".ug-pg-all");

        if (collegeButton && collegeAll) {
            collegeButton.addEventListener("click", () => {
                const isExpanded = collegeWrapper.classList.toggle("is-expanded");

                collegeAll.hidden = !isExpanded;

                const text = collegeButton.querySelector(".ug-pg-view-all-text");

                const arrow = collegeButton.querySelector("span:last-child");

                if (isExpanded) {
                    if (text) {
                        text.textContent = "Show Less";
                    }

                    if (arrow) {
                        arrow.textContent = "↑";
                    }

                    collegeAll.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    if (text) {
                        text.textContent = "View All Colleges";
                    }

                    if (arrow) {
                        arrow.textContent = "→";
                    }

                    collegeWrapper.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        }
    }

    const animatedCarouselTracks = document.querySelectorAll(`
                .boarding-schools-track,
                .top-companies-track,
                #top-ug-pg-colleges .ug-pg-track
            `);

    if (animatedCarouselTracks.length && "IntersectionObserver" in window) {
        const carouselVisibilityObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const track = entry.target;

                    if (entry.isIntersecting) {
                        track.style.animationPlayState = "running";
                    } else {
                        track.style.animationPlayState = "paused";
                    }
                });
            },
            {
                threshold: 0.05,
            },
        );

        animatedCarouselTracks.forEach((track) => {
            carouselVisibilityObserver.observe(track);
        });
    }
});

// Keep school-section cards shadow-free after the full stylesheet cascade.
import "./assets/css/school-card-flat.css";
