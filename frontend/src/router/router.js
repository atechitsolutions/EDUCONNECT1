import MainLayout from "../layouts/MainLayout.js";
import StudyAbroadLayout from "../layouts/StudyAbroadLayout.js";
import AuthModal from "../components/AuthModal.js";
import OnlineEducationLayout from "../layouts/OnlineEducationLayout.js";
import OnlineEducationAdminPage from "../pages/OnlineEducationAdminPage.js";
import Header from "../layouts/header.js";
import FooterSection from "../components/home/footerSection.js";
import Navbar from "../layouts/navbar.js";
import CommunityPage from "../pages/CommunityPage.js";

import AdminDashboardPage from "../pages/AdminDashboard.js";
import AdminNewsPage from "../pages/AdminNewsPage.js";
import AdminCurrentAffairsPage from "../pages/AdminCurrentAffairsPage.js";
import AdminStudyAbroadPage from "../pages/AdminStudyAbroadPage.js";

import StudyAbroadSearchResultsPage
    from "../pages/StudyAbroadSearchResultsPage.js";

export function Router() {
    const path =
        window.location.pathname.replace(/\/+$/, "") || "/";

    let pageContent = "";
    let pageStatus = 200;

    switch (path) {
        // =====================================================
        // HOME
        // =====================================================

        case "/":
        case "/index.html":
            pageContent = MainLayout();
            break;

        // =====================================================
        // GENERAL ADMIN DASHBOARD
        // =====================================================

        case "/admin":
            pageContent =
                `${Header()}${AdminDashboardPage()}${FooterSection()}`;
            break;

        // =====================================================
        // ADMIN — NEWS
        // =====================================================

        case "/admin/news":
            pageContent =
                `${Header()}${AdminNewsPage()}${FooterSection()}`;
            break;

        // =====================================================
        // ADMIN — CURRENT AFFAIRS
        // =====================================================

        case "/admin/current-affairs":
            pageContent =
                `${Header()}${AdminCurrentAffairsPage()}${FooterSection()}`;
            break;

        // =====================================================
        // ADMIN — STUDY ABROAD
        // =====================================================

        case "/admin/study-abroad":
            pageContent =
                `${Header()}${AdminStudyAbroadPage()}${FooterSection()}`;
            break;

        // =====================================================
        // STUDY ABROAD
        // =====================================================

        case "/study-abroad":
            pageContent = StudyAbroadLayout();
            break;

        case "/study-abroad/search-results":
            pageContent = StudyAbroadSearchResultsPage();
            break;

        // =====================================================
        // ONLINE EDUCATION
        // =====================================================

        case "/online-education":
            pageContent = OnlineEducationLayout();
            break;

        case "/online-education/admin":
            pageContent =
                `${Header()}${OnlineEducationAdminPage()}${FooterSection()}`;
            break;

        // =====================================================
        // COMMUNITY
        // =====================================================

        case "/community":
            pageContent =
                `${Header()}${Navbar()}${CommunityPage()}${FooterSection()}`;
            break;

        // =====================================================
        // UNKNOWN ROUTE
        // =====================================================

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
                            Go to EduConnect Home
                        </a>
                    </section>
                </main>
            `;
            break;
    }

    document.documentElement.dataset.routeStatus =
        String(pageStatus);

    return `
        ${pageContent}
        ${AuthModal()}
    `;
}

export default Router;