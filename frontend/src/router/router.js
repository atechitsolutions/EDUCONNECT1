import MainLayout from "../layouts/MainLayout.js";
import StudyAbroadLayout from "../layouts/StudyAbroadLayout.js";
import AuthModal from "../components/AuthModal.js";
import OnlineEducationLayout from "../layouts/OnlineEducationLayout.js";
import OnlineEducationAdminPage from "../pages/OnlineEducationAdminPage.js";
import Header from "../layouts/header.js";
import FooterSection from "../components/home/footerSection.js";
import Navbar from "../layouts/navbar.js";
import CommunityPage from "../pages/CommunityPage.js";
import LatestNewsPage from "../components/latestNews.js";

import AdminDashboardPage from "../pages/AdminDashboard.js";
import AdminNewsPage from "../pages/AdminNewsPage.js";
import AdminCurrentAffairsPage from "../pages/AdminCurrentAffairsPage.js";
import AdminStudyAbroadPage from "../pages/AdminStudyAbroadPage.js";

import StudyAbroadSearchResultsPage from "../pages/StudyAbroadSearchResultsPage.js";
import CollegePartnerAdminPage from "../pages/CollegePartnerAdminPage.js";
import CollegeLoginPage from "../pages/CollegeLoginPage.js";
import CollegePartnerDashboardPage from "../pages/CollegePartnerDashboardPage.js";
import CollegeEnquiryPage from "../pages/CollegeEnquiryPage.js";
import {
    CollegesPage,
    CollegeDirectoryPage,
    CollegeDetailPage,
} from "../pages/CollegeDiscoveryPage.js";
import { SchoolDiscoveryPage } from "../pages/SchoolDiscoveryPage.js";
import { AdminSchoolEnquiriesPage } from "../pages/AdminSchoolEnquiriesPage.js";
import AdmissionPartnersPage from "../pages/AdmissionPartnersPage.js";
import AdmissionPartnerDashboardPage from "../pages/AdmissionPartnerDashboardPage.js";
import AdmissionPartnerAdminPage from "../pages/AdmissionPartnerAdminPage.js";

export function Router() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    let pageContent = "";
    let pageStatus = 200;

    const latestNewsMatch = path.match(/^\/latest-news\/(\d+)$/);
    const collegeDetailMatch = path.match(/^\/colleges\/(\d+)$/);
    if (path === "/latest-news" || latestNewsMatch) {
        pageContent = `${Header()}${Navbar()}${LatestNewsPage(latestNewsMatch?.[1] || "")}${FooterSection()}`;
    } else if (path === "/schools") {
        pageContent = `${Header()}${Navbar()}${SchoolDiscoveryPage()}${FooterSection()}`;
    } else if (path === "/admin/school-enquiries") {
        pageContent = AdminSchoolEnquiriesPage();
    } else if (
        path === "/colleges" ||
        path === "/colleges/ug" ||
        path === "/colleges/pg" ||
        collegeDetailMatch
    ) {
        const collegePage = collegeDetailMatch
            ? CollegeDetailPage(collegeDetailMatch[1])
            : path === "/colleges"
              ? CollegesPage()
              : CollegeDirectoryPage(path.endsWith("/pg") ? "PG" : "UG");
        pageContent = `${Header()}${Navbar()}${collegePage}${FooterSection()}`;
    } else
        switch (path) {
            case "/":
            case "/index.html":
                pageContent = MainLayout();
                break;

            case "/admission-partners":
                pageContent = `${Header()}${Navbar()}${AdmissionPartnersPage()}${FooterSection()}`;
                break;

            case "/admission-partners/dashboard":
                pageContent = `${Header()}${Navbar()}${AdmissionPartnerDashboardPage()}`;
                break;

            case "/admin/admission-partners":
                pageContent = AdmissionPartnerAdminPage();
                break;

            case "/admin":
                pageContent = `${Header()}${AdminDashboardPage()}${FooterSection()}`;
                break;

            // ADMIN — NEWS

            case "/admin/news":
                pageContent = `${Header()}${AdminNewsPage()}${FooterSection()}`;
                break;

            // ADMIN — CURRENT AFFAIRS

            case "/admin/current-affairs":
                pageContent = `${Header()}${AdminCurrentAffairsPage()}${FooterSection()}`;
                break;

            // ADMIN — STUDY ABROAD

            case "/admin/study-abroad":
                pageContent = `${Header()}${AdminStudyAbroadPage()}${FooterSection()}`;
                break;

            case "/admin/college-partners":
                pageContent = CollegePartnerAdminPage();
                break;

            case "/college":
            case "/college/login":
                pageContent = CollegeLoginPage();
                break;

            case "/college/dashboard":
                pageContent = CollegePartnerDashboardPage();
                break;

            case "/college/enquire":
                pageContent = CollegeEnquiryPage();
                break;

            case "/study-abroad":
                pageContent = StudyAbroadLayout();
                break;

            case "/study-abroad/search-results":
                pageContent = StudyAbroadSearchResultsPage();
                break;

            case "/online-education":
                pageContent = OnlineEducationLayout();
                break;

            case "/online-education/admin":
                pageContent = `${Header()}${OnlineEducationAdminPage()}${FooterSection()}`;
                break;

            case "/community":
                pageContent = CommunityPage();
                break;

            default:
                pageStatus = 404;

                pageContent = `
                <main
                    class="route-not-found"
                    aria-labelledby="route-not-found-title"
                >
                    <section class="route-not-found-content">
                        <p class="route-not-found-code">404</p>

                        <h1 id="route-not-found-title">
                            Page Not Found
                        </h1>

                        <p>
                            The page you are looking for could not be found.
                        </p>

                        <a href="/">
                            Go to StepInStudents Home
                        </a>
                    </section>
                </main>
            `;
                break;
        }

    document.documentElement.dataset.routeStatus = String(pageStatus);

    return `
        ${pageContent}
        ${AuthModal()}
    `;
}

export default Router;
