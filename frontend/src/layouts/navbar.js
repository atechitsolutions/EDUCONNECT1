export default function Navbar() {

    return `

    <nav
        class="navbar"
        aria-label="Education navigation"
    >

        <div class="navbar-container">


            <!-- =================================================
                 HOME
            ================================================== -->

            <a
                href="#"
                class="navbar-link"
                aria-label="Home - ALL IN ONE Education Platform"
            >
                Home
            </a>


            <!-- =================================================
                 SCHOOL DROPDOWN
            ================================================== -->

            <div class="navbar-dropdown">

                <a
                    href="#school"
                    class="navbar-link navbar-dropdown-link"
                    data-auth-required="true"
                    aria-label="Schools"
                >

                    <span>
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
                        href="#play-school"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Play Schools
                    </a>


                    <a
                        href="#pre-school"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Pre Schools
                    </a>


                    <a
                        href="#boarding-school"
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
                    href="#top-lists"
                    class="navbar-link navbar-dropdown-link"
                    data-auth-required="true"
                    aria-label="Colleges and Universities"
                >

                    <span>
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
                        href="#top-lists"
                        class="navbar-dropdown-item"
                        data-auth-required="true"
                    >
                        Universities
                    </a>


                    <!-- PG -->

                    <a
                        href="#top-ug-pg-colleges"
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
                Study Abroad
            </a>

            <a
                href="/online-education"
                class="navbar-link"
                aria-label="Online Education Programs"
            >
                Online Education
            </a>


            <!-- =================================================
                 SCHOLARSHIPS
            ================================================== -->

            <a
                href="#scholarship"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Scholarships and Financial Aid"
            >
                Scholarships
            </a>


            <!-- =================================================
                 JOBS
            ================================================== -->

            <a
                href="#jobs"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Education Jobs and Career Opportunities"
            >
                Jobs
            </a>


            <!-- =================================================
                 COMMUNITY
            ================================================== -->

            <a
                href="/community"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Education Community"
            >
                Community
            </a>


            <!-- =================================================
                 NEWS
            ================================================== -->

            <a
                href="#news"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Latest Education News"
            >
                News
            </a>


            <!-- =================================================
                 CERTIFICATE
            ================================================== -->

            <a
                href="#certificate"
                class="navbar-link navbar-certificate-link"
                data-auth-required="true"
                aria-label="Education Certificates"
            >
                Certificates
            </a>


            <!-- =================================================
                 ONLINE COURSES
            ================================================== -->

            <a
                href="#online-courses"
                class="navbar-link navbar-onlinecourses-link"
                data-auth-required="true"
                aria-label="Online Courses and Education"
            >
                Online Courses
            </a>


            <!-- =================================================
                 PARTNERS LOGIN
            ================================================== -->

            <button
                type="button"
                class="navbar-partner-login"
                data-partner-login
                aria-label="Partner Login"
            >
                Partners Login
            </button>


        </div>

    </nav>

    `;

}
