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


            <a
                href="/"
                class="navbar-link"
                aria-label="Home - StepInStudents Education Platform"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">⌂</span><span>Home</span>
            </a>



            <div class="navbar-dropdown">

                <a
                    href="/schools"
                    class="navbar-link navbar-dropdown-link"
                    data-school-root
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



            <div class="navbar-dropdown">

                <a
                    href="/colleges"
                    class="navbar-link navbar-dropdown-link"
                    aria-expanded="false"
                    aria-label="Colleges and Universities"
                    data-colleges-root
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


                    <a
                        href="/colleges/ug"
                        class="navbar-dropdown-item"
                    >
                       UG Colleges
                    </a>



                    <a
                        href="/colleges/pg"
                        class="navbar-dropdown-item"
                    >
                        PG Colleges
                    </a>

                </div>

            </div>



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




            <a
                href="/#top-companies"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Education Jobs and Career Opportunities"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">↗</span><span>Jobs</span>
            </a>







            <a
                href="/#news"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Latest Education News"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">▤</span><span>News</span>
            </a>



            <a
                href="/online-education"
                class="navbar-link navbar-certificate-link"
                data-auth-required="true"
                aria-label="Education Certificates"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">✓</span><span>Certificates</span>
            </a>



            <a
                href="/online-education"
                class="navbar-link navbar-onlinecourses-link"
                data-auth-required="true"
                aria-label="Online Courses and Education"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">▶</span><span>Online Courses</span>
            </a>




            <a
                href="/#scholarships"
                class="navbar-link"
                data-auth-required="true"
                aria-label="Scholarships and Financial Aid"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">✦</span><span>Scholarships</span>
            </a>




            <a
                href="/college/login"
                class="navbar-partner-login"
                data-partner-login
                aria-label="Partner Login"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">↗</span><span>Partners Login</span>
            </a>

            <a
                href="/admission-partners"
                class="navbar-link navbar-admission-partner-link"
                aria-label="Become an admission referral partner"
            >
                <span class="navbar-mobile-icon" aria-hidden="true">✦</span><span>Admission Partners</span>
            </a>

        </div>

    </nav>

    `;
}
