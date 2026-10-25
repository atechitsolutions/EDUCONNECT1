import { getCurrentUser } from "../services/authService.js";

export default function AdminDashboardPage() {
    const user = getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return `
            <main class="admin-access-denied">
                <section>
                    <h1>Admin Access Required</h1>
                    <p>Please log in with an administrator account.</p>
                    <a href="/">Return to EduConnect</a>
                </section>
            </main>
        `;
    }

    return `
        <main class="admin-dashboard-page">
            <div class="admin-dashboard-container">
                <div class="admin-dashboard-header">
                    <div>
                        <span class="admin-dashboard-eyebrow">
                            EDUCONNECT ADMIN
                        </span>

                        <h1>Admin Dashboard</h1>

                        <p>
                            Welcome ${user.fullName || "Admin"}.
                            Manage homepage and Study Abroad content from one place.
                        </p>
                    </div>

                    <a href="/" class="admin-secondary-button">
                        Back to Home
                    </a>
                </div>

                <section class="admin-dashboard-grid">
                    <!-- NEWS -->
                    <a
                        class="admin-dashboard-card"
                        href="/admin/news"
                    >
                        <span>📰</span>
                        <h2>News</h2>
                        <p>
                            Add, edit, publish and delete homepage
                            education news.
                        </p>
                        <strong>Manage News →</strong>
                    </a>

                    <!-- CURRENT AFFAIRS -->
                    <a
                        class="admin-dashboard-card"
                        href="/admin/current-affairs"
                    >
                        <span>📢</span>
                        <h2>Current Affairs</h2>
                        <p>
                            Manage the live current-affairs ticker
                            shown on the homepage.
                        </p>
                        <strong>Manage Current Affairs →</strong>
                    </a>

                    <!-- STUDY ABROAD -->
                    <a
                        class="admin-dashboard-card"
                        href="/admin/study-abroad"
                    >
                        <span>🌍</span>
                        <h2>Study Abroad</h2>
                        <p>
                            Add partner colleges and universities
                            and manage their visibility.
                        </p>
                        <strong>Manage Study Abroad →</strong>
                    </a>

                    <!-- ONLINE EDUCATION: NEW CARD -->
                    <a
                        class="admin-dashboard-card admin-dashboard-card-online-education"
                        href="/online-education/admin"
                    >
                        <span>🎓</span>
                        <h2>Online Education</h2>
                        <p>
                            Add, edit, archive and restore education
                            cards, online courses, degree programmes,
                            subjects, learning platforms and institutions.
                        </p>
                        <strong>Manage Online Education →</strong>
                    </a>

                    <!-- MORE MODULES -->
                    <div
                        class="admin-dashboard-card admin-dashboard-card-placeholder"
                    >
                        <span>➕</span>
                        <h2>More Modules</h2>
                        <p>
                            Future admin modules can be added here
                            without changing the login flow.
                        </p>
                        <strong>Coming Later</strong>
                    </div>
                </section>
            </div>
        </main>
    `;
}