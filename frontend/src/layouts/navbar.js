export default function Navbar() {

    return `

    <nav
        class="navbar"
        aria-label="Education navigation"
    >

        <button
            class="navbar-menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="educonnect-primary-navigation"
        >
            <span aria-hidden="true">☰</span>
            <span class="navbar-menu-toggle-label">Menu</span>
        </button>

        <div class="navbar-container" id="educonnect-primary-navigation">

            <a href="/community" class="navbar-link navbar-community-mobile" aria-label="Community">
                <span class="navbar-mobile-icon" aria-hidden="true">◎</span><span>Community</span>
            </a>


            <!-- =================================================
                 HOME
            ================================================== -->

            <a
                href="/"
                class="navbar-link"
                aria-label="Home - StepInStudents Education Platform"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">⌂</span><span>Home</span>
            </a>


            <!-- =================================================
                 SCHOOL DROPDOWN
            ================================================== -->

            <div class="navbar-dropdown">

                <a
                    href="/#schools"
                    class="navbar-link navbar-dropdown-link"
                    data-auth-required="true"
                    aria-expanded="false"
                    aria-label="Schools"
                >

                    <span>
                        <span class="navbar-mobile-icon" aria-hidden="true">▤</span>
                        Schools
                    </span>

                    <span
                        class="navbar-dropdown-arrow"
                        aria-hidden="true"
                    >
                        ▾
                    </span>

                </a>


                <div class="navbar-dropdown-menu">

                    <a
                        href="/#play-school"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Play Schools
                    </a>


                    <a
                        href="/#pre-school"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Pre Schools
                    </a>


                    <a
                        href="/#boarding-schools"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Boarding Schools
                    </a>

                </div>

            </div>


            <!-- =================================================
                 COLLEGE DROPDOWN
            ================================================== -->

            <div class="navbar-dropdown">

                <a
                    href="/#colleges"
                    class="navbar-link navbar-dropdown-link"
                    data-auth-required="true"
                    aria-expanded="false"
                    aria-label="Colleges and Universities"
                >

                    <span>
                        <span class="navbar-mobile-icon" aria-hidden="true">▥</span>
                        Colleges
                    </span>

                    <span
                        class="navbar-dropdown-arrow"
                        aria-hidden="true"
                    >
                        ▾
                    </span>

                </a>


                <div class="navbar-dropdown-menu">

                    <!-- UNIVERSITY -->

                    <a
                        href="/#colleges"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                       UG Colleges
                    </a>


                    <!-- PG -->

                    <a
                        href="/#colleges"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        PG Colleges
                    </a>

                </div>

            </div>


            <!-- =================================================
                 STUDY ABROAD
            ================================================== -->

            <a
                href="/study-abroad"
                class="navbar-link"
                aria-label="Study Abroad Programs"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">◎</span><span>Study Abroad</span>
            </a>

            <a
                href="/online-education"
                class="navbar-link"
                aria-label="Online Education Programs"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">▣</span><span>Online Education</span>
            </a>



            <!-- =================================================
                 JOBS
            ================================================== -->

            <a
                href="/#top-companies"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Education Jobs and Career Opportunities"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">↗</span><span>Jobs</span>
            </a>


            <!-- =================================================
                 COMMUNITY
            ================================================== -->




            <!-- =================================================
                 NEWS
            ================================================== -->

            <a
                href="/#news"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Latest Education News"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">▤</span><span>News</span>
            </a>


            <!-- =================================================
                 CERTIFICATE
            ================================================== -->

            <a
                href="/online-education"
                class="navbar-link navbar-certificate-link"
                data-auth-required="true"
                aria-label="Education Certificates"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">✓</span><span>Certificates</span>
            </a>


            <!-- =================================================
                 ONLINE COURSES
            ================================================== -->

            <a
                href="/online-education"
                class="navbar-link navbar-onlinecourses-link"
                data-auth-required="true"
                aria-label="Online Courses and Education"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">▶</span><span>Online Courses</span>
            </a>



   <!-- =================================================
                 SCHOLARSHIPS
            ================================================== -->

            <a
                href="/#scholarships"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Scholarships and Financial Aid"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">✦</span><span>Scholarships</span>
            </a>



            <!-- =================================================
                 PARTNERS LOGIN
            ================================================== -->

            <a
                href="/college/login"
                class="navbar-partner-login"
                data-partner-login
                aria-label="Partner Login"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">↗</span><span>Partners Login</span>
            </a>


        </div>

    </nav>

    `;

}
