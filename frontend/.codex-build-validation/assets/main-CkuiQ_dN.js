(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){if(window.matchMedia(`(hover: none), (pointer: coarse)`).matches||document.querySelector(`.premium-cursor`))return;let e=document.createElement(`div`);e.className=`premium-cursor`,e.innerHTML=`
        <div class="paper-plane-cursor">
            <div class="plane-wing"></div>
            <div class="plane-fold"></div>
        </div>
    `,document.body.appendChild(e);let t=0,n=0,r=0,i=0;document.addEventListener(`mousemove`,e=>{t=e.clientX,n=e.clientY});function a(){r+=(t-r)*.22,i+=(n-i)*.22,e.style.transform=`
            translate3d(
                ${r}px,
                ${i}px,
                0
            )
        `,requestAnimationFrame(a)}a();let o=`
        button,
        a,
        .premium-card,
        .premium-category-card,
        .video-review-card,
        .news-card,
        .small-card,
        .hero-search,
        .hero-search-btn,
        .hero-primary-btn,
        .hero-secondary-btn,
        .category-arrow,
        .premium-card-link,
        .video-review-link,
        [role="button"]
    `;document.addEventListener(`mouseover`,t=>{t.target.closest(o)&&(e.classList.add(`plane-active`),document.body.classList.add(`plane-cursor-active`))}),document.addEventListener(`mouseout`,t=>{let n=t.target.closest(o);if(!n)return;let r=t.relatedTarget;r&&n.contains(r)||(e.classList.remove(`plane-active`),document.body.classList.remove(`plane-cursor-active`))}),document.addEventListener(`focusin`,t=>{t.target.matches(`input, textarea, select`)&&(e.classList.remove(`plane-active`),document.body.classList.remove(`plane-cursor-active`))}),document.addEventListener(`mouseleave`,()=>{e.classList.remove(`plane-active`),document.body.classList.remove(`plane-cursor-active`)})}function t(){return`
        <header class="header">
            <div class="header-container">

                <!-- Logo -->
                <div class="logo">
                    <a href="/">ALL IN ONE</a>
                </div>

                <!-- Search -->
                <div class="search-box">
                    <input
                        type="text"
                        placeholder="Search Schools, Colleges, Universities, Jobs..."
                    >
                </div>

                <!-- Location -->
                <div class="location-box">
                    <select>
                        <option>India</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Hyderabad</option>
                    </select>
                </div>

                <!-- Right Side -->
               <div class="header-auth">


                 <button class="notification-btn">
                          🔔
                 </button>
                  <button
                       type="button"
                       class="header-login-button"
                       data-open-login
                   >
                       Login
                   </button>


                   <button
                       type="button"
                       class="header-register-button"
                       data-open-register
                   >
                       Register
                   </button>


                   <a
                       href="/admin"
                       class="header-admin-button header-register-button"
                       data-admin-only
                       style="display: none;"
                   >
                       Admin
                   </a>


                   <button
                       type="button"
                       class="header-user-button"
                       data-auth-logout
                       style="display: none;"
                   >
                       Logout
                   </button>

               </div>

            </div>
        </header>
    `}function n(){return`

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
                href="#community"
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

    `}function r(){return`
        <section
            class="hero"
            aria-labelledby="hero-title"
        >

            <!-- =====================================================
                 PREMIUM BACKGROUND OVERLAY
                 This stays behind all interactive content
            ====================================================== -->

            <div
                class="hero-overlay"
                aria-hidden="true"
            ></div>


            <!-- =====================================================
                 HERO CONTENT
            ====================================================== -->

            <div class="hero-content">


                <!-- =================================================
                     PLATFORM LABEL
                ================================================== -->

                <div class="hero-badge">

                    <span
                        class="hero-badge-dot"
                        aria-hidden="true"
                    ></span>

                    India's Education Discovery Platform for Schools, Colleges & Universities

                </div>


                <!-- =================================================
                     MAIN HEADING
                ================================================== -->

                <h1
                    id="hero-title"
                    class="hero-title"
                >

                   Explore. Compare.
                   <span>
                       Find the Right Education.
                   </span>

                </h1>


                <!-- =================================================
                     DESCRIPTION
                ====================================================== -->

                <p class="hero-description">

                    Find top schools, colleges, universities, courses,
                    scholarships, study abroad programs, education
                    news and career opportunities in India — all in one place.

                </p>


                <!-- =================================================
                     EDUCATION SEARCH
                ================================================== -->

                <div class="institution-search-widget">
                    <form
                        class="hero-search"
                        role="search"
                        action="/"
                        method="get"
                        aria-label="Search EduConnect"
                        data-institution-search
                        data-search-suggestions-id="home-institution-suggestions"
                        data-search-results-id="home-institution-results"
                    >

                    <div
                        class="hero-search-icon"
                        aria-hidden="true"
                    >
                        🔍
                    </div>


                    <label
                        class="sr-only"
                        for="hero-search-input"
                    >

                    </label>


                    <input
                        id="hero-search-input"
                        name="q"
                        type="search"
                        placeholder="Search schools, colleges, universities, courses, scholarships..."
                        aria-label="Search schools, colleges, universities, courses and education opportunities"
                        autocomplete="off"
                        enterkeyhint="search"
                    />


                    <button
                        type="submit"
                        class="hero-search-btn"
                        aria-label="Search EduConnect"
                    >
                        Search
                    </button>

                    </form>

                    <div
                        id="home-institution-suggestions"
                        class="institution-search-suggestions-list"
                        role="listbox"
                        aria-label="Matching institutions"
                        hidden
                    ></div>

                    <section
                        id="home-institution-results"
                        class="institution-search-results"
                        aria-live="polite"
                        hidden
                    ></section>
                </div>


                <!-- =================================================
                     QUICK SEARCH OPTIONS
                ================================================== -->

                <nav
                    class="hero-quick-links"
                    aria-label="Popular school, college, university and education searches"
                >

                    <span>
                        Popular:
                    </span>


                    <button
                        type="button"
                        data-search-query="colleges"
                        aria-label="Search colleges"
                    >
                        Colleges
                    </button>


                    <button
                        type="button"
                        data-search-query="universities"
                        aria-label="Search universities"
                    >
                        Universities
                    </button>


                    <button
                        type="button"
                        data-search-query="courses"
                        aria-label="Search courses"
                    >
                        Courses
                    </button>


                    <button
                        type="button"
                        data-search-query="scholarships"
                        aria-label="Search scholarships"
                    >
                        Scholarships
                    </button>


                    <button
                        type="button"
                        data-search-query="study abroad"
                        aria-label="Search study abroad programs"
                    >
                        Study Abroad
                    </button>

                </nav>


                <!-- =================================================
                     MAIN ACTION BUTTONS
                ================================================== -->

                <div class="hero-buttons">


                    <button
                        type="button"
                        class="primary-btn hero-primary-btn"
                        data-action="explore-education"
                    >

                        Explore Schools, Colleges & Universities

                        <span aria-hidden="true">
                            →
                        </span>

                    </button>


                    <button
                        type="button"
                        class="secondary-btn hero-secondary-btn"
                        data-action="compare-colleges"
                    >

                        Compare Top Colleges in India

                    </button>

                </div>


                <!-- =================================================
                     PLATFORM STATISTICS

                     Keep these values only if they are supported
                     by actual EDUCONNECT data.
                ================================================== -->

                <div
                    class="hero-stats"
                    aria-label="EduConnect platform information"
                >

                    <div class="hero-stat">

                        <strong>
                            10,000+
                        </strong>

                        <span>
                            Institutions
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            5,000+
                        </strong>

                        <span>
                            Courses
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            1,000+
                        </strong>

                        <span>
                            Scholarships
                        </span>

                    </div>


                    <div
                        class="hero-stat-divider"
                        aria-hidden="true"
                    ></div>


                    <div class="hero-stat">

                        <strong>
                            50+
                        </strong>

                        <span>
                            Study Destinations
                        </span>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 DECORATIVE GLOW
            ====================================================== -->

            <div
                class="hero-glow hero-glow-one"
                aria-hidden="true"
            ></div>

            <div
                class="hero-glow hero-glow-two"
                aria-hidden="true"
            ></div>


            <!-- =====================================================
                 SCROLL INDICATOR
            ====================================================== -->

            <div
                class="hero-scroll-indicator"
                aria-hidden="true"
            >

                <span>
                    Explore Education
                </span>

                <div class="hero-scroll-arrow">
                    ↓
                </div>

            </div>

        </section>
    `}function i(){let e=[{icon:`🏛️`,title:`Top Universities`,subtitle:`Rankings Updated`},{icon:`📢`,title:`Admissions Open 2026`,subtitle:`Apply Now`},{icon:`🏆`,title:`Top Colleges Updated`,subtitle:`New Rankings Out`},{icon:`💼`,title:`New Internship Opportunities`,subtitle:`Apply Before Deadline`},{icon:`🎓`,title:`University Admissions`,subtitle:`Latest Updates`}];return`
        <section class="premium-ticker-section social-ticker-section">

            <div class="premium-ticker">

                <!-- LABEL -->
                <div class="premium-ticker-label">

                    <div class="ticker-label-icon">
                        👥
                    </div>

                    <div class="ticker-label-text">
                        <strong>SOCIAL MEDIA PLATFORM</strong>
                        <span>Latest Student Updates</span>
                    </div>

                </div>


                <!-- RUNNING CONTENT -->
                <div class="premium-ticker-window">

                    <div class="premium-ticker-track">

                        ${[...e,...e].map(e=>`
                            <div class="premium-ticker-item">

                                <div class="premium-ticker-item-icon">
                                    ${e.icon}
                                </div>

                                <div class="premium-ticker-item-content">

                                    <strong>
                                        ${e.title}
                                    </strong>

                                    <span>
                                        ${e.subtitle}
                                    </span>

                                </div>

                            </div>
                        `).join(``)}

                    </div>

                </div>


                <!-- ARROW -->
                <button
                    class="premium-ticker-arrow"
                    aria-label="View social media updates"
                >
                    →
                </button>

            </div>


            <!-- PROGRESS LINE -->
            <div class="premium-ticker-progress">
                <span></span>
            </div>

        </section>
    `}var a=`http://localhost:8080/api/auth`,o=`educonnect_token`,s=`educonnect_user`;async function c(e){let t=await fetch(`${a}/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json();if(!t.ok)throw Error(n.message||`Invalid email or password.`);return localStorage.setItem(o,n.token),localStorage.setItem(s,JSON.stringify({userId:n.userId,fullName:n.fullName,email:n.email,role:n.role})),n}async function l(e){let t=await fetch(`${a}/register`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}),n=await t.json();if(!t.ok)throw Error(n.message||`Registration failed.`);return localStorage.setItem(o,n.token),localStorage.setItem(s,JSON.stringify({userId:n.userId,fullName:n.fullName,email:n.email,role:n.role})),n}async function u(e){let t=await fetch(`${a}/forgot-password`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:e})}),n=await t.json();if(!t.ok)throw Error(n.message||`Unable to process password reset request.`);return n}function d(){return!!localStorage.getItem(o)}function f(){let e=localStorage.getItem(s);if(!e)return null;try{return JSON.parse(e)}catch{return null}}function p(){localStorage.removeItem(o),localStorage.removeItem(s)}var m=`http://localhost:8080/api`;async function h(e){let t=await e.text(),n=null;if(t)try{n=JSON.parse(t)}catch{n={message:t}}if(!e.ok)throw Error(n?.message||`Request failed with status ${e.status}`);return n}async function g(){return h(await fetch(`${m}/home/news`))}async function _(){return h(await fetch(`${m}/home/updates/current-affairs`))}function v(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function ee(e){return(e.length>1?[...e,...e]:e).map(e=>{let t=`
            <div class="premium-ticker-item">
                <div class="premium-ticker-item-icon">
                    ${v(e.icon||`📢`)}
                </div>

                <div class="premium-ticker-item-content">
                    <strong>${v(e.title)}</strong>
                    <span>${v(e.subtitle||`Current Affairs`)}</span>
                </div>
            </div>
        `;return e.targetUrl?`
                <a
                    class="premium-ticker-item-link"
                    href="${v(e.targetUrl)}"
                >
                    ${t}
                </a>
            `:t}).join(``)}function te(){return setTimeout(async()=>{let e=document.querySelector(`[data-current-affairs-track]`);if(e)try{let t=await _(),n=Array.isArray(t)?t:[];if(!n.length){e.innerHTML=`
                    <div class="premium-ticker-item">
                        <div class="premium-ticker-item-icon">📢</div>
                        <div class="premium-ticker-item-content">
                            <strong>No Current Affairs Available</strong>
                            <span>New updates will appear here.</span>
                        </div>
                    </div>
                `;return}e.innerHTML=ee(n)}catch(t){console.error(`Failed to load current affairs:`,t),e.innerHTML=`
                <div class="premium-ticker-item">
                    <div class="premium-ticker-item-icon">⚠️</div>
                    <div class="premium-ticker-item-content">
                        <strong>Unable to load Current Affairs</strong>
                        <span>Please try again later.</span>
                    </div>
                </div>
            `}},0),`
        <section class="premium-ticker-section current-affairs-ticker-section">
            <div class="premium-ticker">
                <div class="premium-ticker-label">
                    <div class="ticker-label-icon">📰</div>
                    <div class="ticker-label-text">
                        <strong>CURRENT AFFAIRS</strong>
                        <span>Education &amp; Career News</span>
                    </div>
                </div>

                <div class="premium-ticker-window">
                    <div
                        class="premium-ticker-track"
                        data-current-affairs-track
                    >
                        <div class="premium-ticker-item">
                            <div class="premium-ticker-item-icon">📢</div>
                            <div class="premium-ticker-item-content">
                                <strong>Loading Current Affairs</strong>
                                <span>Please wait...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="premium-ticker-arrow"
                    aria-label="Current affairs"
                    disabled
                >
                    →
                </button>
            </div>

            <div class="premium-ticker-progress">
                <span></span>
            </div>
        </section>
    `}function y(){return`

        <section
            class="categories-compact"
            id="categories"
        >

            <div class="categories-compact-container">


                <!-- =================================================
                     HEADER
                ================================================== -->

                <div class="categories-compact-header">

                    <span class="categories-compact-eyebrow">
                        ✦ EXPLORE EDUCATION
                    </span>

                    <h2>
                        Explore Education Categories
                    </h2>

                    <p>
                        Quickly explore schools, colleges, universities,
                        courses, careers, scholarships, certificates,
                        online education, study abroad and international
                        education opportunities.
                    </p>

                </div>


                <!-- =================================================
                     CATEGORY GRID
                ================================================== -->

                <div class="categories-compact-grid">

                    ${[{title:`Play School`,icon:`🧸`,image:`https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85`,target:`#play-school`,category:`Early Learning`,description:`Explore play schools for early childhood learning and education.`},{title:`Pre School`,icon:`🎈`,image:`https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85`,target:`#pre-school`,category:`Early Education`,description:`Find pre schools, early education programs and child-friendly learning opportunities.`},{title:`School`,icon:`🏫`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`,target:`#school`,category:`School Education`,description:`Discover schools, school boards, classes, admissions and education opportunities.`},{title:`College`,icon:`🎓`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&q=80`,category:`Higher Education`,target:`#top-lists`,description:`Explore colleges, degree courses, campuses, admissions and career opportunities.`},{title:`University`,icon:`🏛️`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,target:`#rankings`,category:`Higher Education`,description:`Explore universities, academic programs, rankings, admissions and career opportunities.`},{title:`PG`,icon:`📚`,image:`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85`,target:`#top-ug-pg-colleges`,category:`Postgraduate`,description:`Discover postgraduate courses, PG programs and leading higher education institutions.`},{title:`Study Abroad`,icon:`🌍`,image:`https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85`,target:`#study-abroad`,category:`International Education`,description:`Explore study abroad destinations, universities, courses, admissions and scholarships.`},{title:`Online Education`,icon:`💻`,image:`https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85`,target:`#online-education`,category:`Flexible Learning`,description:`Find online degrees, online courses, certifications and distance education programs.`},{title:`Scholarships`,icon:`💰`,image:`https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85`,target:`#scholarship`,category:`Financial Support`,description:`Find scholarships, student financial aid and education assistance opportunities.`},{title:`Internship`,icon:`💼`,image:`https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85`,target:`#jobs`,category:`Career Opportunities`,description:`Explore internships, training programs and early career opportunities for students.`},{title:`Jobs`,icon:`💻`,image:`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85`,target:`#top-companies`,category:`Career Opportunities`,description:`Discover jobs, companies, career opportunities and employment resources.`},{title:`Certificate`,icon:`📜`,image:`https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=85`,target:`#certificate`,category:`Professional Learning`,description:`Explore professional certificates, certification programs and skill-based learning.`},{title:`Online Courses`,icon:`🖥️`,image:`https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85`,target:`#online-courses`,category:`Digital Learning`,description:`Learn new skills through online courses, professional training and flexible digital learning.`}].map(e=>`

                        <a
                            href="${e.target}"
                            class="compact-category-card"
                            aria-label="Explore ${e.title} - ${e.category}"
                            data-category="${e.title}"
                        >


                            <!-- =================================================
                                 IMAGE
                            ================================================== -->

                            <div class="compact-category-image">

                                <img
                                    src="${e.image}"
                                    alt="${e.title} - ${e.category}"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div class="compact-category-image-overlay">
                                </div>

                                <span class="compact-category-type">
                                    ${e.category}
                                </span>

                            </div>


                            <!-- =================================================
                                 CONTENT
                            ================================================== -->

                            <div class="compact-category-content">

                                <span
                                    class="compact-category-icon"
                                    aria-hidden="true"
                                >
                                    ${e.icon}
                                </span>


                                <div class="compact-category-text">

                                    <h3>
                                        ${e.title}
                                    </h3>

                                    <p>
                                        ${e.description}
                                    </p>

                                </div>

                            </div>


                            <!-- =================================================
                                 ARROW
                            ================================================== -->

                            <span
                                class="compact-category-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>

                        </a>

                    `).join(``)}

                </div>

            </div>

        </section>

    `}function b(e=``,t=``){return`
        <div class="container ${t}">
            ${e}
        </div>
    `}function x({id:e=``,title:t=``,subtitle:n=``,content:r=``,className:i=``,background:a=`white`}={}){return`
        <section
            ${e?`id="${e}"`:``}
            class="section section-${a} ${i}"
        >

            ${b(`

                ${t?`
                    <div class="section-header">

                        <div>

                            <h2 class="section-title">
                                ${t}
                            </h2>

                            ${n?`<p class="section-subtitle">${n}</p>`:``}

                        </div>

                    </div>
                `:``}

                <div class="section-body">

                    ${r}

                </div>

            `)}

        </section>
    `}function S({item:e,type:t=`college`}){let{id:n=``,rank:r=``,name:i=`Institution`,location:a=``,image:o=``,logo:s=``,score:c=``,rating:l=``,reviews:u=``,program:d=``,fees:f=``,ranking:p=``,highlight:m=``,category:h=``,actionLabel:g=`View Details`,showCompare:_=!0}=e;return`
        <article
            class="institution-card"
            data-type="${t}"
            ${n?`data-institution-id="${n}"`:``}
        >

            <div class="institution-card-visual">

                ${o?`
                            <img
                                src="${o}"
                                alt="${i}"
                                loading="lazy"
                            >
                        `:``}


                <div class="institution-card-overlay"></div>


                ${s?`
                            <div class="institution-card-logo">
                                <img
                                    src="${s}"
                                    alt=""
                                    loading="lazy"
                                >
                            </div>
                        `:``}


                ${c?`
                            <span class="institution-card-score">
                                ${c}/10
                            </span>
                        `:``}


                ${r?`
                            <span class="institution-card-rank">
                                #${r}
                            </span>
                        `:``}


                <div class="institution-card-title">

                    <h3>
                        ${i}
                    </h3>

                    ${a?`
                                <p>
                                    📍 ${a}
                                </p>
                            `:``}

                </div>

            </div>


            <div class="institution-card-body">

                ${h?`
                            <span class="institution-card-category">
                                ${h}
                            </span>
                        `:``}


                ${d?`
                            <h4 class="institution-card-program">
                                ${d}
                            </h4>
                        `:``}


                <div class="institution-card-rating-row">

                    ${l?`
                                <span class="institution-card-rating">
                                    ★ ${l}/5
                                </span>
                            `:``}

                    ${u?`
                                <span class="institution-card-reviews">
                                    ${u} reviews
                                </span>
                            `:``}

                </div>


                ${f?`
                            <div class="institution-card-fees">

                                <strong>
                                    ${f}
                                </strong>

                                <span>
                                    Total Fees
                                </span>

                            </div>
                        `:``}


                ${p?`
                            <div class="institution-card-ranking">
                                ${p}
                            </div>
                        `:``}


                ${m?`
                            <div class="institution-card-highlight">
                                ${m}
                            </div>
                        `:``}


                <div class="institution-card-actions">

                    <button
                        type="button"
                        class="institution-card-action"
                        data-action="details"
                    >
                        ${g}
                        <span>›</span>
                    </button>


                    ${f?`
                                <button
                                    type="button"
                                    class="institution-card-action"
                                    data-action="fees"
                                >
                                    Courses & Fees
                                    <span>›</span>
                                </button>
                            `:``}


                    ${_?`
                                <button
                                    type="button"
                                    class="institution-card-action"
                                    data-action="compare"
                                >
                                    Compare
                                    <span>›</span>
                                </button>
                            `:``}

                </div>

            </div>

        </article>
    `}function ne(){let e=[{rank:`01`,name:`Little Stars Play School`,category:`Play School`,location:`Dwarka, New Delhi`,program:`Playgroup • Nursery • Early Learning`,rating:`4.7`,reviews:`1,180`,score:`9.1`,ranking:`Popular early-learning option in New Delhi`,highlight:`Creative learning, play activities & social development`,image:`https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85`},{rank:`02`,name:`Bright Kids Play School`,category:`Play School`,location:`Andheri, Mumbai`,program:`Playgroup • Nursery • Early Learning`,rating:`4.6`,reviews:`1,020`,score:`8.9`,ranking:`Popular play-school choice in Mumbai`,highlight:`Activity-based learning & child-focused environment`,image:`https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85`},{rank:`03`,name:`Happy Hearts Play School`,category:`Play School`,location:`Whitefield, Bengaluru`,program:`Playgroup • Nursery • Kindergarten`,rating:`4.8`,reviews:`940`,score:`9.2`,ranking:`Highly rated early-learning centre in Bengaluru`,highlight:`Play-based learning & holistic child development`,image:`https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85`},{rank:`04`,name:`Tiny Tots Play School`,category:`Play School`,location:`Baner, Pune`,program:`Playgroup • Nursery • Kindergarten`,rating:`4.5`,reviews:`830`,score:`8.7`,ranking:`Child-friendly early education centre in Pune`,highlight:`Foundational learning & engaging activities`,image:`https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85`},{rank:`05`,name:`Growing Stars Play School`,category:`Play School`,location:`Gurugram, Haryana`,program:`Playgroup • Nursery • Early Learning`,rating:`4.6`,reviews:`760`,score:`8.8`,ranking:`Growing early-learning option in the NCR region`,highlight:`Early skills, creativity & confidence building`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{rank:`06`,name:`Little Angels Play School`,category:`Play School`,location:`Bandra, Mumbai`,program:`Playgroup • Nursery • Early Learning`,rating:`4.7`,reviews:`690`,score:`8.9`,ranking:`Popular early-learning centre in Mumbai`,highlight:`Child-friendly learning & social development`,image:`https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85`}];function t(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:`Explore Play School`},type:`play-school`})}let n=e.slice(0,4),r=e.slice(4),i=n.map(t).join(``),a=n.map(t).join(``);return x({id:`play-school`,title:``,subtitle:``,content:`

        <div class="early-learning-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="early-learning-intro">

                <div class="early-learning-intro-content">

                    <span class="early-learning-label">
                        🧸 EARLY CHILDHOOD EDUCATION
                    </span>


                    <h2>
                        Top Play Schools in India
                    </h2>


                    <p>
                        Discover play schools focused on early childhood
                        education, early learning, creativity, social
                        development, foundational skills and a joyful
                        learning environment.
                    </p>

                </div>


                <div class="early-learning-badge">

                    <strong>
                        ${e.length}
                    </strong>

                    <span>
                        Featured<br>
                        Play Schools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 MOVING CARDS
            ================================================== -->

            <div class="early-learning-carousel">

                <div
                    class="early-learning-track institution-carousel-track"
                    aria-label="Featured play schools"
                >

                    ${i}

                    ${a}

                </div>

            </div>


            <!-- =================================================
                 ALL PLAY SCHOOLS
            ================================================== -->

            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${r.map(t).join(``)}

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="early-learning-bottom">

                <div>

                    <span>
                        Looking for the right play school?
                    </span>


                    <strong>
                        Explore play schools across India for early childhood education.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                    aria-label="View all play schools"
                >

                    <span class="early-learning-view-all-text">
                        View All Play Schools
                    </span>


                    <span aria-hidden="true">
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function re(){let e=[{rank:`01`,name:`Happy Kids Pre School`,category:`Pre School`,location:`Rohini, New Delhi`,program:`Playgroup • Nursery • LKG • UKG`,rating:`4.8`,reviews:`1,240`,score:`9.2`,ranking:`Popular early-learning preschool in New Delhi`,highlight:`Activity-based learning, early childhood education & child-friendly environment`,image:`https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85`},{rank:`02`,name:`Little Angels Pre School`,category:`Pre School`,location:`Bandra, Mumbai`,program:`Playgroup • Nursery • LKG • UKG`,rating:`4.7`,reviews:`1,080`,score:`9.0`,ranking:`Well-known preschool and early-learning centre in Mumbai`,highlight:`Creative learning, foundational education & child development`,image:`https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85`},{rank:`03`,name:`Sunshine Pre School`,category:`Pre School`,location:`Indiranagar, Bengaluru`,program:`Nursery • LKG • UKG`,rating:`4.6`,reviews:`940`,score:`8.8`,ranking:`Popular preschool focused on foundational education`,highlight:`Play-based learning, early education & social development`,image:`https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85`},{rank:`04`,name:`Growing Minds Pre School`,category:`Pre School`,location:`Kothrud, Pune`,program:`Playgroup • Nursery • LKG • UKG`,rating:`4.5`,reviews:`860`,score:`8.7`,ranking:`Growing early-learning preschool network in Pune`,highlight:`Child-focused curriculum, early learning & engaging activities`,image:`https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85`},{rank:`05`,name:`Smart Kids Pre School`,category:`Pre School`,location:`Gurugram, Haryana`,program:`Playgroup • Nursery • LKG • UKG`,rating:`4.7`,reviews:`790`,score:`8.9`,ranking:`Popular preschool option in the NCR region`,highlight:`Early academics, creativity, foundational learning & confidence building`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{rank:`06`,name:`Rainbow Pre School`,category:`Pre School`,location:`Jaipur, Rajasthan`,program:`Nursery • LKG • UKG`,rating:`4.6`,reviews:`720`,score:`8.6`,ranking:`Child-friendly early education preschool in Jaipur`,highlight:`Foundational learning, early childhood education & all-round development`,image:`https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85`}];function t(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:`Explore Pre School`},type:`pre-school`})}let n=e.slice(0,4),r=e.slice(4),i=n.map(t).join(``),a=n.map(t).join(``);return x({id:`pre-school`,title:``,subtitle:``,content:`

        <div class="early-learning-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="early-learning-intro">

                <div class="early-learning-intro-content">

                    <span class="early-learning-label">
                        🎈 EARLY LEARNING
                    </span>


                    <h2>
                        Top Pre Schools in India
                    </h2>


                    <p>
                        Explore leading pre schools and preschools offering
                        early childhood education, foundational learning,
                        activity-based learning, child development and
                        child-friendly environments.
                    </p>

                </div>


                <div class="early-learning-badge">

                    <strong>
                        ${e.length}
                    </strong>

                    <span>
                        Featured<br>
                        Pre Schools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 MOVING CARDS
            ================================================== -->

            <div class="early-learning-carousel">

                <div
                    class="early-learning-track institution-carousel-track"
                >

                    ${i}

                    ${a}

                </div>

            </div>


            <!-- =================================================
                 ALL PRE SCHOOLS
            ================================================== -->

            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${r.map(t).join(``)}

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="early-learning-bottom">

                <div>

                    <span>
                        Looking for the right pre school?
                    </span>


                    <strong>
                        Explore pre schools and early childhood education options across India.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                >

                    <span class="early-learning-view-all-text">
                        View All Pre Schools
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function ie(){let e=[{rank:`01`,name:`Delhi Public School`,category:`CBSE School`,location:`R.K. Puram, New Delhi`,program:`Nursery • Primary • Secondary • Senior Secondary`,rating:`4.8`,reviews:`2,140`,score:`9.2`,ranking:`Among the leading CBSE schools in India`,highlight:`Strong academics, CBSE school education, activities & student development`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`},{rank:`02`,name:`The Doon School`,category:`ICSE School`,location:`Dehradun, Uttarakhand`,program:`Middle School • Secondary • Senior Secondary`,rating:`4.8`,reviews:`1,850`,score:`9.4`,ranking:`One of India's renowned residential schools`,highlight:`Academic excellence, ICSE school education, leadership & holistic learning`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{rank:`03`,name:`Modern School`,category:`CBSE School`,location:`Barakhamba Road, New Delhi`,program:`Middle School • Secondary • Senior Secondary`,rating:`4.7`,reviews:`1,640`,score:`9.0`,ranking:`Established CBSE school with strong academic reputation`,highlight:`CBSE academics, sports, co-curricular activities & student development`,image:`https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85`},{rank:`04`,name:`Ryan International School`,category:`CBSE School`,location:`Malad, Mumbai`,program:`Nursery • Primary • Secondary • Senior Secondary`,rating:`4.6`,reviews:`1,520`,score:`8.7`,ranking:`Established K-12 school network in India`,highlight:`Modern school education, activities & student support`,image:`https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85`},{rank:`05`,name:`National Public School`,category:`CBSE School`,location:`Rajajinagar, Bengaluru`,program:`Nursery • Primary • Secondary • Senior Secondary`,rating:`4.7`,reviews:`1,410`,score:`8.9`,ranking:`Well-regarded CBSE school for academics and student development`,highlight:`Academic focus, discipline, CBSE curriculum & co-curricular learning`,image:`https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85`},{rank:`06`,name:`Symbiosis International School`,category:`IB / IGCSE School`,location:`Viman Nagar, Pune`,program:`Pre Primary • Primary • Secondary • Senior Secondary`,rating:`4.7`,reviews:`1,120`,score:`9.0`,ranking:`International curriculum-focused school`,highlight:`IB and IGCSE education, global exposure, modern campus & holistic learning`,image:`https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85`}];function t(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:`Explore School`},type:`school`})}let n=e.slice(0,4),r=e.slice(4),i=n.map(t).join(``),a=n.map(t).join(``);return x({id:`school`,title:``,subtitle:``,content:`

        <div class="early-learning-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="early-learning-intro">

                <div class="early-learning-intro-content">

                    <span class="early-learning-label">
                        🏫 SCHOOL EDUCATION
                    </span>


                    <h2>
                        Top Schools in India
                    </h2>


                    <p>
                        Explore leading schools across India and
                        compare CBSE, ICSE, IB and IGCSE school boards,
                        classes, locations, academic environment,
                        ratings and student opportunities.
                    </p>

                </div>


                <div class="early-learning-badge">

                    <strong>
                        ${e.length}
                    </strong>

                    <span>
                        Featured<br>
                        Schools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 MOVING CARDS
            ================================================== -->

            <div class="early-learning-carousel">

                <div
                    class="early-learning-track institution-carousel-track"
                >

                    ${i}

                    ${a}

                </div>

            </div>


            <!-- =================================================
                 ALL SCHOOLS
            ================================================== -->

            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${r.map(t).join(``)}

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="early-learning-bottom">

                <div>

                    <span>
                        Looking for the right school?
                    </span>


                    <strong>
                        Explore schools, school boards and education options across India.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                >

                    <span class="early-learning-view-all-text">
                        View All Schools
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function ae(){let e=[{rank:`01`,name:`The Doon School`,category:`Boys Boarding School`,location:`Dehradun, Uttarakhand`,program:`Boarding • Residential • K-12`,rating:`4.8`,reviews:`1,240`,score:`9.4`,ranking:`Among India's leading boarding and residential schools in India`,highlight:`Academic excellence and leadership development`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`},{rank:`02`,name:`Mayo College`,category:`Boys Boarding School`,location:`Ajmer, Rajasthan`,program:`Boarding • Residential • K-12`,rating:`4.7`,reviews:`1,060`,score:`9.2`,ranking:`Historic boarding and residential school with a strong legacy in India`,highlight:`Leadership, academics and campus life`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{rank:`03`,name:`The Lawrence School`,category:`Co-Educational Boarding`,location:`Sanawar, Himachal Pradesh`,program:`Boarding • Residential • K-12`,rating:`4.7`,reviews:`920`,score:`9.0`,ranking:`Established boarding and residential school in Himachal Pradesh`,highlight:`Holistic education and student development`,image:`https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85`},{rank:`04`,name:`Welham Girls' School`,category:`Girls Boarding School`,location:`Dehradun, Uttarakhand`,program:`Boarding • Residential • K-12`,rating:`4.7`,reviews:`875`,score:`9.1`,ranking:`Well-known girls boarding school in Dehradun, Uttarakhand`,highlight:`Academic excellence and all-round development`,image:`https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85`},{rank:`05`,name:`Woodstock School`,category:`International Boarding`,location:`Mussoorie, Uttarakhand`,program:`International Curriculum • Boarding`,rating:`4.6`,reviews:`810`,score:`9.0`,ranking:`Recognized international boarding school in Mussoorie, Uttarakhand`,highlight:`Global education and international exposure`,image:`https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85`},{rank:`06`,name:`Bishop Cotton School`,category:`Boys Boarding School`,location:`Shimla, Himachal Pradesh`,program:`Boarding • Residential • K-12`,rating:`4.6`,reviews:`740`,score:`8.9`,ranking:`Historic boys boarding school in Shimla, Himachal Pradesh`,highlight:`Tradition, academics and character building`,image:`https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85`},{rank:`07`,name:`Sherwood College`,category:`Co-Educational Boarding`,location:`Nainital, Uttarakhand`,program:`Boarding • Residential • K-12`,rating:`4.6`,reviews:`680`,score:`8.8`,ranking:`Established co-educational boarding school in Nainital, Uttarakhand`,highlight:`Holistic education and outdoor learning`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{rank:`08`,name:`The Assam Valley School`,category:`Co-Educational Boarding`,location:`Sonitpur, Assam`,program:`Boarding • Residential • K-12`,rating:`4.5`,reviews:`610`,score:`8.7`,ranking:`Prominent boarding school in Northeast India`,highlight:`All-round development and campus experience`,image:`https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85`},{rank:`09`,name:`Ecole Globale International School`,category:`Girls Boarding School`,location:`Dehradun, Uttarakhand`,program:`International Curriculum • Boarding`,rating:`4.5`,reviews:`580`,score:`8.7`,ranking:`Modern girls international boarding school in Dehradun, Uttarakhand`,highlight:`Global education and modern learning`,image:`https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=85`},{rank:`10`,name:`GD Goenka World School`,category:`International Boarding`,location:`Gurugram, Haryana`,program:`International Curriculum • Boarding`,rating:`4.5`,reviews:`540`,score:`8.6`,ranking:`International boarding school in Gurugram, Haryana`,highlight:`Global exposure and modern infrastructure`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`}];function t(e){return S({item:{rank:e.rank,name:e.name,category:e.category,program:e.program,location:e.location,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:`Explore School`},type:`boarding-school`})}let n=e.map(t).join(``),r=e.map(t).join(``);return x({id:`top-boarding-schools`,title:``,subtitle:``,content:`
        <div class="boarding-schools-section">

            <div class="boarding-schools-intro">

                <div class="boarding-schools-intro-content">

                    <span class="boarding-schools-label">
                        🏫 FEATURED BOARDING SCHOOLS
                    </span>

                    <h2>
                        Top 10 Boarding Schools in India
                    </h2>

                    <p>
                        Explore top boarding schools in India and discover
                        residential schools known for academics, campus life,
                        leadership, international education and holistic
                        student development.
                    </p>

                </div>

                <div class="boarding-schools-intro-badge">

                    <strong>
                        ${e.length}
                    </strong>

                    <span>
                        Featured<br>
                        Schools
                    </span>

                </div>

            </div>

            <div class="boarding-schools-carousel">

                <div class="boarding-schools-track institution-carousel-track">

                    ${n}

                    ${r}

                </div>

            </div>

            <div class="boarding-schools-bottom">

                <div class="boarding-schools-bottom-text">

                    <span>
                        Looking for more schools?
                    </span>

                    <strong>
                        Explore top boarding schools and residential schools across India.
                    </strong>

                </div>

                <button
                    class="boarding-schools-explore-btn"
                    type="button"
                >

                    <span class="boarding-view-all-text">
                        View All Boarding Schools in India
                    </span>

                    <span>
                        →
                    </span>

                </button>

            </div>

            <div
                class="boarding-schools-all"
                hidden
            >

                <div class="boarding-schools-all-grid">

                    ${e.map(t).join(``)}

                </div>

            </div>

        </div>
    `})}function oe(){let e=[{rank:1,name:`University of Delhi`,type:`Central University`,category:`UG College`,program:`B.Com`,location:`New Delhi`,rating:`4.8`,reviews:`1,245`,score:`9.2`,fees:`₹1.25 Lacs`,ranking:`Ranked among India's leading central universities`,highlight:`Strong academics & wide course selection`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`},{rank:2,name:`Indian Institute of Science`,type:`Research University`,category:`UG College`,program:`B.Sc`,location:`Bengaluru`,rating:`4.9`,reviews:`842`,score:`9.6`,fees:`₹1.10 Lacs`,ranking:`Leading institution for science & research`,highlight:`Research-focused academic environment`,image:`https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=85`},{rank:3,name:`Jawaharlal Nehru University`,type:`Central University`,category:`UG College`,program:`BA`,location:`New Delhi`,rating:`4.7`,reviews:`978`,score:`9.0`,fees:`₹1.05 Lacs`,ranking:`Highly regarded for humanities & social sciences`,highlight:`Academic excellence & research opportunities`,image:`https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85`},{rank:4,name:`Banaras Hindu University`,type:`Central University`,category:`UG College`,program:`B.Sc`,location:`Varanasi`,rating:`4.7`,reviews:`1,106`,score:`8.9`,fees:`₹1.15 Lacs`,ranking:`Major multidisciplinary university in India`,highlight:`Large campus & diverse academic programs`,image:`https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85`},{rank:5,name:`University of Mumbai`,type:`Public University`,category:`UG College`,program:`B.Com`,location:`Mumbai`,rating:`4.6`,reviews:`913`,score:`8.7`,fees:`₹1.35 Lacs`,ranking:`Well-known public university in western India`,highlight:`Strong industry & career connections`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`},{rank:6,name:`Christ University`,shortName:`CHRIST`,type:`Private University`,category:`UG College`,program:`BBA`,courses:`BBA • BCA • B.Com • BA`,location:`Bengaluru`,rating:`4.6`,reviews:`1,021`,score:`8.8`,fees:`₹3.25 Lacs`,ranking:`Popular private university for professional programs`,highlight:`Industry-oriented courses & campus life`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`},{rank:7,name:`Manipal Academy of Higher Education`,type:`Deemed University`,category:`UG College`,program:`B.Tech`,location:`Manipal`,rating:`4.6`,reviews:`786`,score:`8.9`,fees:`₹5.80 Lacs`,ranking:`Recognized multidisciplinary higher education institution`,highlight:`Modern campus & professional programs`,image:`https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=85`}],t=[{rank:1,name:`IIM Ahmedabad`,type:`Management Institute`,category:`PG College`,program:`MBA`,location:`Ahmedabad`,rating:`4.9`,reviews:`1,420`,score:`9.8`,fees:`₹12.50 Lacs`,ranking:`Among India's premier management institutions`,highlight:`Strong placements & management education`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`},{rank:2,name:`IIM Bangalore`,type:`Management Institute`,category:`PG College`,program:`MBA`,location:`Bengaluru`,rating:`4.9`,reviews:`1,318`,score:`9.7`,fees:`₹12.75 Lacs`,ranking:`Top destination for management education`,highlight:`Excellent career & industry exposure`,image:`https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=85`},{rank:3,name:`IIM Calcutta`,type:`Management Institute`,category:`PG College`,program:`MBA`,location:`Kolkata`,rating:`4.8`,reviews:`1,102`,score:`9.5`,fees:`₹13.00 Lacs`,ranking:`Highly reputed management institution`,highlight:`Strong finance & consulting opportunities`,image:`https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85`},{rank:4,name:`University of Delhi`,type:`Central University`,category:`PG College`,program:`M.Com`,location:`New Delhi`,rating:`4.8`,reviews:`1,150`,score:`9.0`,fees:`₹1.50 Lacs`,ranking:`Leading postgraduate destination in Delhi`,highlight:`Wide range of postgraduate programs`,image:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`},{rank:5,name:`Jawaharlal Nehru University`,type:`Central University`,category:`PG College`,program:`M.A.`,location:`New Delhi`,rating:`4.8`,reviews:`1,004`,score:`9.1`,fees:`₹1.10 Lacs`,ranking:`Known for postgraduate research & academics`,highlight:`Research-intensive learning environment`,image:`https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85`},{rank:6,name:`IIT Delhi`,type:`Technical Institute`,category:`PG College`,program:`M.Tech`,location:`New Delhi`,rating:`4.8`,reviews:`1,260`,score:`9.6`,fees:`₹2.45 Lacs`,ranking:`Premier technical and research institute`,highlight:`Engineering excellence & placements`,image:`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85`},{rank:7,name:`IIT Bombay`,type:`Technical Institute`,category:`PG College`,program:`M.Tech`,location:`Mumbai`,rating:`4.8`,reviews:`1,390`,score:`9.7`,fees:`₹2.55 Lacs`,ranking:`Premier institute for technology & research`,highlight:`Innovation, research & industry exposure`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`},{rank:8,name:`Banaras Hindu University`,type:`Central University`,category:`PG College`,program:`M.Com`,location:`Varanasi`,rating:`4.7`,reviews:`925`,score:`8.9`,fees:`₹1.30 Lacs`,ranking:`Large multidisciplinary postgraduate institution`,highlight:`Broad academic & research opportunities`,image:`https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85`}];function n(e,t){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,fees:e.fees,actionLabel:t===`UG`?`Explore UG College`:`Explore PG College`},type:t===`UG`?`ug-college`:`pg-college`})}let r=e.map(e=>n(e,`UG`)).join(``),i=t.map(e=>n(e,`PG`)).join(``),a=e.map(e=>n(e,`UG`)).join(``),o=t.map(e=>n(e,`PG`)).join(``);return x({id:`top-ug-pg-colleges`,title:``,subtitle:``,content:`

        <div class="ug-pg-section-wrapper">


            <!-- =================================================
                 PREMIUM INTRO
            ================================================== -->

            <div class="ug-pg-intro">

                <div class="ug-pg-intro-content">

                    <div class="ug-pg-eyebrow">
                        🎓 HIGHER EDUCATION
                    </div>


                    <h2>
                        Top UG & PG Colleges in India
                    </h2>


                    <p>
                        Discover top undergraduate and postgraduate
                        colleges and universities in India. Compare
                        UG and PG courses, fees, ratings, rankings,
                        placements, admissions and academic opportunities.
                    </p>

                </div>


                <div class="ug-pg-stat">

                    <strong>
                        ${e.length+t.length}
                    </strong>

                    <span>
                        Featured<br>
                        Institutions
                    </span>

                </div>

            </div>


            <!-- =================================================
                 UG HEADING
            ================================================== -->

            <div class="ug-pg-heading">

                <div>

                    <span>
                        UNDERGRADUATE
                    </span>


                    <h2>
                        Top UG Colleges in India
                    </h2>

                </div>


                <p>
                    Explore undergraduate colleges in India
                    offering UG courses, degree programs and
                    career-focused higher education.
                </p>

            </div>


            <!-- =================================================
                 UG CAROUSEL
            ================================================== -->

            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${r}

                    ${a}

                </div>

            </div>


            <!-- =================================================
                 PG HEADING
            ================================================== -->

            <div
                class="ug-pg-heading
                       ug-pg-heading-second"
            >

                <div>

                    <span>
                        POSTGRADUATE
                    </span>


                    <h2>
                        Top PG Colleges in India
                    </h2>

                </div>


                <p>
                    Explore postgraduate colleges in India
                    offering PG courses, advanced degree
                    programs, higher education and professional
                    learning opportunities.
                </p>

            </div>


            <!-- =================================================
                 PG CAROUSEL
            ================================================== -->

            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${i}

                    ${o}

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="ug-pg-cta">

                <div>

                    <span>
                        Looking for the right college?
                    </span>


                    <strong>
                        Compare colleges, UG & PG courses, fees and admissions in India.
                    </strong>

                </div>


                <button
                    class="ug-pg-cta-button"
                    type="button"
                >

                    <span class="ug-pg-view-all-text">
                        View All Colleges
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>


            <!-- =================================================
                 ALL COLLEGES
            ================================================== -->

            <div
                class="ug-pg-all"
                hidden
            >

                <!-- =============================================
                     UNDERGRADUATE
                ============================================== -->

                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Undergraduate Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${e.map(e=>n(e,`UG`)).join(``)}

                    </div>

                </div>


                <!-- =============================================
                     POSTGRADUATE
                ============================================== -->

                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Postgraduate Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${t.map(e=>n(e,`PG`)).join(``)}

                    </div>

                </div>

            </div>

        </div>

    `})}function se(){let e=[{rank:`01`,name:`Online MBA`,category:`Online MBA Degree`,location:`India`,program:`Online MBA • Management • Business Administration`,rating:`4.8`,reviews:`2,140`,score:`9.2`,ranking:`Popular online MBA degree and online management program from leading universities in India`,highlight:`UGC-approved online learning, flexible study options & career-focused management education`,image:`https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Online MBA`},{rank:`02`,name:`Online BCA`,category:`Online BCA Degree`,location:`India`,program:`Online BCA • Computer Applications • IT`,rating:`4.7`,reviews:`1,760`,score:`9.0`,ranking:`Popular online BCA degree program for computer applications, information technology and digital careers in India`,highlight:`Industry-oriented online curriculum, flexible learning & computer application education`,image:`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Online BCA`},{rank:`03`,name:`Certification Courses`,category:`Online Certification Courses`,location:`Online`,program:`Online Certification Courses • AI • Data Science • Cloud • Digital Skills`,rating:`4.6`,reviews:`1,420`,score:`8.8`,ranking:`Short-term online certification courses in AI, data science, cloud computing and other in-demand professional skills`,highlight:`Practical projects, professional certifications & career-focused online learning`,image:`https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Certifications`}],t=[{rank:`04`,name:`Distance MBA`,category:`Distance MBA Degree`,location:`India`,program:`Distance MBA • Management • Business Administration`,rating:`4.6`,reviews:`1,320`,score:`8.8`,ranking:`Flexible distance MBA degree and management education for learners and working professionals in India`,highlight:`Affordable distance education, flexible schedules & management learning`,image:`https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Distance MBA`},{rank:`05`,name:`Distance B.Com`,category:`Distance B.Com Degree`,location:`India`,program:`Distance B.Com • Commerce • Accounting • Finance`,rating:`4.5`,reviews:`1,080`,score:`8.6`,ranking:`Flexible distance B.Com degree in commerce, accounting and finance for students and working learners`,highlight:`Distance commerce education, flexible schedules & study-from-home learning`,image:`https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Distance B.Com`},{rank:`06`,name:`Distance M.A`,category:`Distance Postgraduate Degree`,location:`India`,program:`Distance M.A. • Humanities • Social Sciences`,rating:`4.5`,reviews:`940`,score:`8.5`,ranking:`Flexible distance M.A. and postgraduate degree programs from recognized universities in India`,highlight:`Flexible schedules, distance education & accessible postgraduate learning`,image:`https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Distance M.A.`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`online-education`})}let i=n.map(r).join(``);return x({id:`online-education`,title:``,subtitle:``,content:`

        <div class="online-education-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="online-education-intro">

                <div class="online-education-intro-content">

                    <span class="online-education-eyebrow">
                        💻 FLEXIBLE EDUCATION
                    </span>


                    <h2>
                        Online & Distance Education in India
                    </h2>


                    <p>
                        Explore online degrees, distance education programs,
                        online MBA, online BCA, distance MBA, online certification
                        courses and flexible learning opportunities from recognized
                        universities and institutions in India.
                    </p>

                </div>


                <div class="online-education-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Featured<br>
                        Programs
                    </span>

                </div>

            </div>


            <!-- =================================================
                 HORIZONTAL CAROUSEL
            ================================================== -->

            <div class="online-education-carousel">


                <div class="online-education-viewport">

                    <div class="online-education-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT BUTTON
                ================================================== -->

                <button
                    type="button"
                    class="online-education-next"
                    aria-label="Show next online and distance education programs in India"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function ce(e,t){return S({item:{id:e.id,rank:String(t+1).padStart(2,`0`),name:e.title,category:e.category,location:e.country||`India`,program:e.subtitle||`Education News`,ranking:e.description||``,highlight:`Published on EduConnect`,image:e.imageUrl||``,actionLabel:`Read Full News`,showCompare:!1},type:`education-news`})}function le(e){!e||e.dataset.newsBound===`true`||(e.dataset.newsBound=`true`,e.addEventListener(`click`,t=>{let n=t.target.closest(`.institution-card-action[data-action='details']`);if(!n||!e.contains(n))return;let r=n.closest(`.institution-card`)?.dataset.institutionId;r&&(t.preventDefault(),window.location.href=`/latest-news/${encodeURIComponent(r)}`)}))}function ue(){return setTimeout(async()=>{let e=document.querySelector(`[data-home-news-track]`),t=document.querySelector(`[data-home-news-count]`);if(e)try{let n=await g(),r=Array.isArray(n)?n:[];if(t&&(t.textContent=String(r.length)),!r.length){e.innerHTML=`
                    <div class="study-abroad-loading">
                        No published news is available yet.
                    </div>
                `;return}e.innerHTML=r.map(ce).join(``),le(e)}catch(t){console.error(`Failed to load homepage news:`,t),e.innerHTML=`
                <div class="study-abroad-loading">
                    Unable to load latest news right now.
                </div>
            `}},0),x({id:`news`,title:``,subtitle:``,content:`
        <div class="news-section">
            <div class="news-intro">
                <div class="news-intro-content">
                    <span class="news-eyebrow">
                        📰 EDUCATION NEWS &amp; UPDATES
                    </span>
                    <h2>Latest Education News</h2>
                    <p>
                        Stay updated with admissions, scholarships, placements,
                        education policy and study-abroad developments.
                    </p>
                </div>

                <div class="news-stat">
                    <strong data-home-news-count>0</strong>
                    <span>Published<br>News Updates</span>
                </div>
            </div>

            <div class="news-carousel">
                <div class="news-viewport">
                    <div class="news-track" data-home-news-track>
                        <div class="study-abroad-loading">
                            Loading latest news...
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="news-next"
                    aria-label="Show next news"
                >
                    <span>→</span>
                </button>
            </div>
        </div>
    `})}var de=`http://localhost:8080/api`;async function fe(e){let t=await e.text(),n=null;if(t)try{n=JSON.parse(t)}catch{n={message:t}}if(!e.ok)throw Error(n?.message||`Request failed with status ${e.status}`);return n}async function pe(){return fe(await fetch(`${de}/institution`))}function C(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function me(e){let t=[e.city,e.state,e.country].filter(Boolean).join(`, `),n=e.coverImageUrl||``,r=e.website||``,i=e.email||``,a=e.phone||``,o=e.address||``;return`
        <div
            class="study-abroad-details-overlay"
            data-study-abroad-details-overlay
            aria-hidden="false"
        >
            <div
                class="study-abroad-details-backdrop"
                data-study-abroad-details-close
            ></div>

            <article
                class="study-abroad-details-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="study-abroad-details-title"
            >
                <button
                    type="button"
                    class="study-abroad-details-close"
                    data-study-abroad-details-close
                    aria-label="Close institution details"
                >
                    ×
                </button>

                ${n?`
                            <div class="study-abroad-details-image">
                                <img
                                    src="${C(n)}"
                                    alt="${C(e.name)}"
                                    loading="lazy"
                                >
                            </div>
                        `:``}

                <div class="study-abroad-details-body">

                    <span class="study-abroad-details-type">
                        ${C(e.type||`Institution`)}
                    </span>

                    <h2 id="study-abroad-details-title">
                        ${C(e.name)}
                    </h2>

                    ${t?`
                                <p class="study-abroad-details-location">
                                    📍 ${C(t)}
                                </p>
                            `:``}

                    ${e.description?`
                                <p class="study-abroad-details-description">
                                    ${C(e.description)}
                                </p>
                            `:``}

                    <div class="study-abroad-details-grid">

                        ${o?`
                                    <div>
                                        <strong>Address</strong>
                                        <span>${C(o)}</span>
                                    </div>
                                `:``}

                        ${i?`
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:${C(i)}">
                                            ${C(i)}
                                        </a>
                                    </div>
                                `:``}

                        ${a?`
                                    <div>
                                        <strong>Phone</strong>
                                        <a href="tel:${C(a)}">
                                            ${C(a)}
                                        </a>
                                    </div>
                                `:``}

                        ${e.verified?`
                                    <div>
                                        <strong>Verification</strong>
                                        <span>Verified by EduConnect</span>
                                    </div>
                                `:``}
                    </div>

                    <div class="study-abroad-details-actions">

                        ${r?`
                                    <a
                                        class="study-abroad-details-button"
                                        href="${C(r)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit Website
                                        <span>↗</span>
                                    </a>
                                `:``}

                        <button
                            type="button"
                            class="study-abroad-details-button secondary"
                            data-study-abroad-details-close
                        >
                            Close
                        </button>

                    </div>

                </div>
            </article>
        </div>
    `}function w(e){T(),document.body.insertAdjacentHTML(`beforeend`,me(e));let t=document.querySelector(`[data-study-abroad-details-overlay]`);t&&(t.querySelectorAll(`[data-study-abroad-details-close]`).forEach(e=>{e.addEventListener(`click`,T)}),document.body.classList.add(`study-abroad-details-open`))}function T(){let e=document.querySelector(`[data-study-abroad-details-overlay]`);e&&e.remove(),document.body.classList.remove(`study-abroad-details-open`)}function he(e,t){!e||e.dataset.detailsBound===`true`||(e.dataset.detailsBound=`true`,e.addEventListener(`click`,n=>{let r=n.target.closest(`.institution-card-action[data-action='details']`);if(!r||!e.contains(r))return;let i=r.closest(`.institution-card`)?.dataset.institutionId;if(!i)return;let a=t.get(String(i));a&&(n.preventDefault(),w(a))}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&T()}))}function ge(){function e(e,t){let n=[e.city,e.state,e.country].filter(Boolean).join(`, `),r=[e.type===`UNIVERSITY`?`University`:e.type===`COLLEGE`?`College`:`Institution`,e.country].filter(Boolean).join(` • `);return S({item:{id:e.id,rank:String(t+1).padStart(2,`0`),name:e.name,category:r,location:n,program:e.type===`UNIVERSITY`?`Partner University`:`Partner College`,ranking:e.verified?`Verified EduConnect partner`:`EduConnect partner institution`,highlight:e.description||`Explore this EduConnect Study Abroad partner institution.`,image:e.coverImageUrl||``,actionLabel:`View More`,showCompare:!1},type:`study-abroad`})}let t=x({id:`study-abroad-section`,title:``,subtitle:``,content:`
        <div
            class="study-abroad-section"
            id="study-abroad-destinations"
        >

            <div class="study-abroad-intro">

                <div class="study-abroad-intro-content">

                    <span class="study-abroad-eyebrow">
                        🌍 INTERNATIONAL EDUCATION
                    </span>

                    <h2>
                        Study Abroad
                    </h2>

                    <p>
                        Explore colleges and universities that are
                        available through EduConnect partner institutions.
                    </p>

                </div>


                <div class="study-abroad-stat">

                    <strong
                        class="study-abroad-institution-count"
                    >
                        0
                    </strong>

                    <span>
                        Partner<br>
                        Institutions
                    </span>

                </div>

            </div>


            <div class="study-abroad-carousel">

                <div class="study-abroad-viewport">

                    <div class="study-abroad-track">

                        <div class="study-abroad-loading">
                            Loading Study Abroad institutions...
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="study-abroad-next"
                    aria-label="Show next Study Abroad institutions"
                >
                    <span>→</span>
                </button>

            </div>

        </div>
    `});return setTimeout(async()=>{try{let t=(await pe()).filter(e=>e.active===!0&&e.studyAbroadEnabled===!0),n=document.querySelector(`#study-abroad-destinations .study-abroad-track`),r=document.querySelector(`#study-abroad-destinations .study-abroad-institution-count`);if(!n)return;if(r&&(r.textContent=t.length),!t.length){n.innerHTML=`
                        <div class="study-abroad-loading">
                            No Study Abroad partner institutions are available yet.
                        </div>
                    `;return}let i=new Map(t.map(e=>[String(e.id),e]));n.innerHTML=t.map(e).join(``),he(n,i),window.dispatchEvent(new CustomEvent(`educonnect:studyabroad-cards-ready`))}catch(e){console.error(`Failed to load Study Abroad institutions:`,e);let t=document.querySelector(`#study-abroad-destinations .study-abroad-track`);t&&(t.innerHTML=`
                        <div class="study-abroad-loading">
                            Unable to load Study Abroad institutions.
                        </div>
                    `)}},0),t}function _e(){let e=[{rank:`01`,name:`National Scholarship Portal`,category:`Government Scholarships`,location:`India`,program:`School • UG • PG • Professional`,rating:`4.8`,reviews:`2,340`,score:`9.3`,ranking:`Major platform for central and state scholarship schemes`,highlight:`Government scholarships for eligible students`,image:`https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Scholarships`},{rank:`02`,name:`Merit-Based Scholarships`,category:`Academic Excellence`,location:`India`,program:`School • UG • PG`,rating:`4.7`,reviews:`1,820`,score:`9.0`,ranking:`Scholarship opportunities based on academic performance`,highlight:`Reward strong academic achievement and merit`,image:`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Merit Scholarships`},{rank:`03`,name:`Scholarships for Girls`,category:`Women in Education`,location:`India`,program:`School • UG • PG • STEM`,rating:`4.7`,reviews:`1,560`,score:`8.9`,ranking:`Financial support programs encouraging girls' education`,highlight:`Education support for girls and women`,image:`https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Scholarships`}],t=[{rank:`04`,name:`Need-Based Scholarships`,category:`Financial Assistance`,location:`India`,program:`School • UG • PG`,rating:`4.6`,reviews:`1,240`,score:`8.8`,ranking:`Financial aid based on family income and need`,highlight:`Support for students facing financial challenges`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Financial Aid`},{rank:`05`,name:`International Scholarships`,category:`Study Abroad`,location:`Global`,program:`UG • PG • MBA • Research`,rating:`4.6`,reviews:`1,090`,score:`8.9`,ranking:`Funding opportunities for international education`,highlight:`Scholarships offered by universities and organizations`,image:`https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore International Scholarships`},{rank:`06`,name:`Private Scholarships`,category:`Corporate & NGO Support`,location:`India`,program:`School • UG • PG • Professional`,rating:`4.5`,reviews:`920`,score:`8.6`,ranking:`Scholarships supported by companies, trusts and NGOs`,highlight:`Corporate, foundation and nonprofit funding`,image:`https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Private Scholarships`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`scholarship`})}let i=n.map(r).join(``);return x({id:`scholarship`,title:``,subtitle:``,content:`

        <div class="scholarship-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="scholarship-intro">

                <div class="scholarship-intro-content">

                    <span class="scholarship-eyebrow">
                        🎓 FINANCIAL SUPPORT
                    </span>


                    <h2>
                        Scholarships
                    </h2>


                    <p>
                        Discover scholarships and financial
                        assistance opportunities for school,
                        college, university and professional
                        education.
                    </p>

                </div>


                <div class="scholarship-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Featured<br>
                        Scholarships
                    </span>

                </div>

            </div>


            <!-- =================================================
                 HORIZONTAL CAROUSEL
            ================================================== -->

            <div class="scholarship-carousel">


                <div class="scholarship-viewport">

                    <div class="scholarship-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT BUTTON
                ================================================== -->

                <button
                    type="button"
                    class="scholarship-next"
                    aria-label="Show next scholarships"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function ve(){let e=[{rank:`01`,name:`Top Schools in India`,category:`Best Schools`,program:`Schools & K-12 Education`,location:`India`,highlight:`Explore top schools in India based on academics, facilities, reputation, school education and student opportunities.`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Schools`},{rank:`02`,name:`Top Colleges in India`,category:`Best Colleges`,program:`UG & PG Programs`,location:`India`,highlight:`Discover top colleges in India across streams, UG courses, PG courses and academic disciplines.`,image:`https://digitallearning.eletsonline.com/wp-content/uploads/2020/06/infrastructure.jpg`,actionLabel:`Explore Colleges`},{rank:`03`,name:`Top Universities in India`,category:`Best Universities`,program:`UG • PG • Research`,location:`India`,highlight:`Explore top universities in India offering undergraduate, postgraduate, research and professional degree programs.`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Universities`}],t=[{rank:`04`,name:`Top Engineering Colleges`,category:`Engineering`,program:`B.Tech • M.Tech • Research`,location:`India`,highlight:`Compare top engineering colleges in India through academics, B.Tech and M.Tech courses, placements, infrastructure and programs.`,image:`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Engineering`},{rank:`05`,name:`Top Management Colleges`,category:`MBA & Management`,program:`BBA • MBA • Management`,location:`India`,highlight:`Explore top management colleges and business schools in India offering BBA, MBA and management programs.`,image:`https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Management`},{rank:`06`,name:`Top Medical Colleges`,category:`Medical Education`,program:`MBBS • MD • Healthcare`,location:`India`,highlight:`Discover top medical colleges in India offering MBBS, MD and healthcare education programs.`,image:`https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Medical`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,program:e.program,location:e.location,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`top-list`})}let i=n.map(r).join(``);return x({id:`top-lists`,title:``,subtitle:``,content:`

        <div class="top-lists-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="top-lists-intro">

                <div class="top-lists-intro-content">

                    <span class="top-lists-eyebrow">
                        ⭐ EDUCATION DISCOVERY
                    </span>


                    <h2>
                        Top Education Lists in India
                    </h2>


                    <p>
                        Explore top schools, colleges, universities,
                        engineering colleges, management colleges
                        and medical colleges in India across
                        different education categories.
                    </p>

                </div>


                <div class="top-lists-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Featured<br>
                        Lists
                    </span>

                </div>

            </div>


            <!-- =================================================
                 TOP LISTS CAROUSEL
            ================================================== -->

            <div class="top-lists-carousel">

                <div class="top-lists-viewport">

                    <div class="top-lists-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="top-lists-next"
                    aria-label="Show next top education lists in India"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>


        </div>

    `})}function E(){let e=[{rank:`01`,name:`Top Universities`,category:`University Rankings`,location:`India`,program:`UG • PG • Research • Professional Programs`,rating:`4.9`,reviews:`2,840`,score:`9.6`,ranking:`Compare top universities in India across academics, research, infrastructure, placements and reputation`,highlight:`Academics, research, placements & reputation`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Universities`},{rank:`02`,name:`Top Colleges`,category:`College Rankings`,location:`India`,program:`UG • PG • Professional Courses`,rating:`4.8`,reviews:`2,410`,score:`9.3`,ranking:`Compare top colleges in India across streams, courses, academics, placements and student opportunities`,highlight:`Courses, academics, placements & student opportunities`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Colleges`},{rank:`03`,name:`Top Schools`,category:`School Rankings`,location:`India`,program:`Primary • Secondary • Senior Secondary`,rating:`4.7`,reviews:`1,980`,score:`9.1`,ranking:`Discover top schools in India based on academics, facilities, teaching quality and student development`,highlight:`Academics, facilities, teaching & development`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Schools`}],t=[{rank:`04`,name:`Engineering Rankings`,category:`Engineering Colleges`,location:`India`,program:`B.Tech • M.Tech • Research`,rating:`4.8`,reviews:`2,160`,score:`9.2`,ranking:`Compare top engineering colleges in India based on education quality, B.Tech and M.Tech courses, placements, infrastructure and research`,highlight:`Placements, infrastructure & technical education`,image:`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Engineering`},{rank:`05`,name:`Management Rankings`,category:`MBA & Business Schools`,location:`India`,program:`BBA • MBA • Executive Programs`,rating:`4.8`,reviews:`2,030`,score:`9.4`,ranking:`Compare top management colleges in India through BBA, MBA, academics, placements, faculty and industry exposure`,highlight:`Placements, faculty & industry exposure`,image:`https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Management`},{rank:`06`,name:`Medical Rankings`,category:`Medical Colleges`,location:`India`,program:`MBBS • MD • MS • Healthcare`,rating:`4.7`,reviews:`1,740`,score:`9.1`,ranking:`Compare top medical colleges in India on medical education, MBBS, MD, MS, facilities, research and healthcare programs`,highlight:`Medical education, facilities & research`,image:`https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Medical`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`ranking`})}let i=n.map(r).join(``);return x({id:`rankings`,title:``,subtitle:``,content:`

        <div class="rankings-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="rankings-intro">

                <div class="rankings-intro-content">

                    <span class="rankings-eyebrow">
                        🏆 EDUCATION RANKINGS
                    </span>


                    <h2>
                        Education Rankings in India
                    </h2>


                    <p>
                        Explore education rankings in India and compare
                        top schools, colleges, universities, engineering
                        colleges, management colleges and medical colleges
                        across academics, courses, placements, research,
                        infrastructure and reputation.
                    </p>

                </div>


                <div class="rankings-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Featured<br>
                        Rankings
                    </span>

                </div>

            </div>


            <!-- =================================================
                 HORIZONTAL RANKINGS CAROUSEL
            ================================================== -->

            <div class="rankings-carousel">

                <div class="rankings-viewport">

                    <div class="rankings-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT BUTTON
                ================================================== -->

                <button
                    type="button"
                    class="rankings-next"
                    aria-label="Show next education rankings in India"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `})}function D(){let e=[{id:1,type:`Student Experience`,title:`My College Journey`,description:`A student shares their college experience, including choosing a college, academics, campus life, courses and career opportunities.`,reviewer:`Student Review`,location:`India`,rating:`4.8`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85`},{id:2,type:`Parent Experience`,title:`A Parent's Education Journey`,description:`A parent shares their experience of choosing the right school or college and educational institution for their child.`,reviewer:`Parent Review`,location:`India`,rating:`4.7`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85`},{id:3,type:`School Experience`,title:`Life at School`,description:`A student shares their school experience covering academics, activities, teachers, facilities, campus life and overall school education.`,reviewer:`Student Review`,location:`India`,rating:`4.8`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`},{id:4,type:`College Experience`,title:`Choosing the Right College`,description:`A student explains how comparing colleges, courses, fees, placements and career opportunities helped in choosing the right college.`,reviewer:`Student Review`,location:`India`,rating:`4.9`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`},{id:5,type:`Career Experience`,title:`From Education to Career`,description:`A graduate shares their journey from education to internships, college placements, jobs and career opportunities.`,reviewer:`Graduate Review`,location:`India`,rating:`4.8`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85`},{id:6,type:`Study Abroad Experience`,title:`My Study Abroad Journey`,description:`A student shares their study abroad experience, including selecting an international university and preparing to study overseas.`,reviewer:`International Student`,location:`International`,rating:`4.9`,date:`Verified Experience`,thumbnail:`https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85`}];function t(e){return`
            <article
                class="video-review-card"
                data-review-id="${e.id}"
            >

                <!-- =================================================
                     VIDEO THUMBNAIL
                ================================================== -->

                <div
                    class="video-review-thumbnail"
                    style="
                        background-image:
                        url('${e.thumbnail}');
                    "
                >

                    <div class="video-review-overlay"></div>


                    <!-- =================================================
                         PLAY BUTTON
                    ================================================== -->

                    <button
                        type="button"
                        class="video-play-button"
                        aria-label="Play ${e.title}"
                    >

                        <span>
                            ▶
                        </span>

                    </button>


                    <!-- =================================================
                         VIDEO BADGE
                    ================================================== -->

                    <span
                        class="video-review-video-badge"
                    >
                        VIDEO REVIEW
                    </span>

                </div>


                <!-- =================================================
                     REVIEW CONTENT
                ================================================== -->

                <div class="video-review-content">


                    <!-- =================================================
                         REVIEWER META
                    ================================================== -->

                    <div class="video-review-meta">

                        <span
                            class="video-review-reviewer"
                        >
                            ${e.reviewer}
                        </span>


                        <span
                            class="video-review-location"
                        >
                            📍 ${e.location}
                        </span>

                    </div>


                    <!-- =================================================
                         TITLE
                    ================================================== -->

                    <h3>
                        ${e.title}
                    </h3>


                    <!-- =================================================
                         RATING
                    ================================================== -->

                    <div
                        class="video-review-rating-row"
                    >

                        <span
                            class="video-review-rating"
                        >
                            ★ ${e.rating}
                        </span>


                        <span
                            class="video-review-verified"
                        >
                            ✓ ${e.date}
                        </span>

                    </div>


                    <!-- =================================================
                         DESCRIPTION
                    ================================================== -->

                    <p>
                        ${e.description}
                    </p>


                    <!-- =================================================
                         ACTION
                    ================================================== -->

                    <button
                        type="button"
                        class="video-review-link"
                        data-review-id="${e.id}"
                    >

                        <span
                            class="video-review-link-text"
                        >
                            Watch Experience
                        </span>


                        <span
                            class="video-review-link-arrow"
                        >
                            →
                        </span>

                    </button>

                </div>

            </article>
        `}return x({id:`student-reviews`,title:`Student & Parent Education Reviews`,subtitle:`Watch real student, parent and graduate reviews about schools, colleges, universities, study abroad, education and career journeys.`,content:`

        <div class="video-reviews-section">


            <!-- =================================================
                 HEADER
            ================================================== -->

            <div class="video-reviews-header">

                <div class="video-reviews-heading-content">

                    <span
                        class="video-reviews-eyebrow"
                    >
                        ✦ REAL EXPERIENCES
                    </span>


                    <h3>
                        Student & Parent Education Reviews
                    </h3>


                    <p>
                        Discover student and parent education reviews
                        covering schools, colleges, universities, careers
                        and study abroad experiences.
                    </p>

                </div>


                <!-- =================================================
                     VIEW ALL
                ================================================== -->

                <button
                    type="button"
                    class="video-reviews-view-all"
                >

                    <span>
                        View All Student & Parent Reviews
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>


            <!-- =================================================
                 REVIEW CAROUSEL
            ================================================== -->

            <div class="student-reviews-carousel">

                <div class="student-reviews-viewport">

                    <div class="student-reviews-track">

                        ${e.map(t).join(``)}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="student-reviews-next"
                    aria-label="Show next student and parent education reviews"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>


            <!-- =================================================
                 TRUST MESSAGE
            ================================================== -->

            <div
                class="video-reviews-trust"
            >

                <div
                    class="video-reviews-trust-icon"
                >
                    ✓
                </div>


                <div>

                    <strong>
                        Real Student & Parent Education Experiences
                    </strong>


                    <p>
                        Hear directly from students and parents
                        about their school, college, university and
                        education journeys.
                    </p>

                </div>

            </div>

        </div>

    `})}function O(){let e=[{rank:`01`,name:`Compare Colleges`,category:`College Comparison`,location:`India`,program:`Courses • Fees • Placements • Infrastructure`,rating:`4.8`,reviews:`2,180`,score:`9.3`,ranking:`Compare institutions across the factors that matter most`,highlight:`Courses, fees, placements, rankings & campus facilities`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Colleges`},{rank:`02`,name:`Compare Universities`,category:`University Comparison`,location:`India`,program:`Programs • Fees • Rankings • Placements`,rating:`4.7`,reviews:`1,760`,score:`9.1`,ranking:`Compare universities across academic and career factors`,highlight:`Programs, rankings, facilities & placement opportunities`,image:`https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Universities`},{rank:`03`,name:`Compare Courses`,category:`Course Comparison`,location:`India`,program:`Eligibility • Duration • Fees • Careers`,rating:`4.6`,reviews:`1,420`,score:`8.9`,ranking:`Evaluate course options across multiple institutions`,highlight:`Eligibility, fees, duration & career opportunities`,image:`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Courses`}],t=[{rank:`04`,name:`Compare Fees`,category:`Education Cost`,location:`India`,program:`Tuition • Hostel • Additional Charges`,rating:`4.7`,reviews:`1,350`,score:`9.0`,ranking:`Compare total education costs before making a decision`,highlight:`Tuition, accommodation & financial assistance`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Fees`},{rank:`05`,name:`Compare Placements`,category:`Career Opportunities`,location:`India`,program:`Recruiters • Salary • Internships • Placements`,rating:`4.8`,reviews:`1,580`,score:`9.2`,ranking:`Understand the career outcomes offered by institutions`,highlight:`Placements, recruiters, salaries & internships`,image:`https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Placements`},{rank:`06`,name:`Compare Rankings`,category:`Institution Rankings`,location:`India`,program:`NIRF • Reputation • Academics • Research`,rating:`4.7`,reviews:`1,240`,score:`9.1`,ranking:`Compare institutional rankings and academic reputation`,highlight:`Rankings, academics, research & reputation`,image:`https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Compare Rankings`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`comparison`})}let i=n.map(r).join(``);return x({id:`compare-college`,title:``,subtitle:``,content:`

        <div class="compare-college-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="compare-college-intro">

                <div class="compare-college-intro-content">

                    <span class="compare-college-eyebrow">
                        ⚖️ COMPARE & CHOOSE
                    </span>


                    <h2>
                        Compare Colleges & Courses
                    </h2>


                    <p>
                        Compare colleges, universities and courses
                        across fees, placements, rankings, programs,
                        infrastructure and other important factors
                        before making an education decision.
                    </p>

                </div>


                <div class="compare-college-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Comparison<br>
                        Tools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 COMPARISON CAROUSEL
            ================================================== -->

            <div class="compare-college-carousel">

                <div class="compare-college-viewport">

                    <div class="compare-college-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="compare-college-next"
                    aria-label="Show next comparison"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>


        </div>

    `})}function k(){let e=[{rank:`01`,name:`Education Loan`,category:`Study Financing`,location:`India`,program:`School • College • University • Professional Courses`,rating:`4.8`,reviews:`1,840`,score:`9.2`,ranking:`Education loan information and financing guidance for students in India`,highlight:`Understand education loan options for tuition fees and other education expenses`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Education Loans`},{rank:`02`,name:`Loan for Higher Education`,category:`College & University Financing`,location:`India`,program:`Tuition • Accommodation • Books • Equipment`,rating:`4.7`,reviews:`1,420`,score:`9.0`,ranking:`Higher education loan and financing options for college and university expenses`,highlight:`Understand funding options for tuition fees, accommodation, books and academic costs`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Higher Education Loans`},{rank:`03`,name:`Study Abroad Loan`,category:`International Education`,location:`Global`,program:`Tuition • Living • Travel • Education Expenses`,rating:`4.7`,reviews:`1,180`,score:`9.1`,ranking:`Study abroad education loan and international education financing guidance`,highlight:`Understand study abroad loan funding for tuition, living, travel and overseas education expenses`,image:`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Explore Study Abroad Loans`}],t=[{rank:`04`,name:`Eligibility`,category:`Who Can Apply`,location:`India`,program:`Academic • Admission • Financial Requirements`,rating:`4.7`,reviews:`1,020`,score:`8.9`,ranking:`Guide to education loan eligibility requirements for students in India`,highlight:`Understand academic, admission and documentation conditions`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Check Eligibility`},{rank:`05`,name:`Interest Rates`,category:`Loan Cost`,location:`India`,program:`Interest • Repayment • Loan Terms`,rating:`4.6`,reviews:`940`,score:`8.8`,ranking:`Guide to education loan interest rates, costs and repayment terms`,highlight:`Compare loan terms and understand repayment impact`,image:`https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85`,actionLabel:`Understand Interest Rates`},{rank:`06`,name:`Documents Required`,category:`Application Process`,location:`India`,program:`Identity • Academic • Admission • Financial Documents`,rating:`4.6`,reviews:`860`,score:`8.7`,ranking:`Guide to documents required for education loan applications in India`,highlight:`Prepare the required documents before applying`,image:`https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85`,actionLabel:`View Documents`}],n=[...e,...t];function r(e){return S({item:{rank:e.rank,name:e.name,category:e.category,location:e.location,program:e.program,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:e.actionLabel},type:`education-loan`})}let i=n.map(r).join(``);return x({id:`education-loan`,title:``,subtitle:``,content:`

        <div class="education-loan-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="education-loan-intro">

                <div class="education-loan-intro-content">

                    <span class="education-loan-eyebrow">
                        💰 EDUCATION FINANCING
                    </span>


                    <h2>
                        Education Loans
                    </h2>


                    <p>
                        Explore education loans in India, higher education
                        financing options, eligibility requirements, interest rates,
                        required documents and education loan application guidance.
                    </p>

                </div>


                <div class="education-loan-stat">

                    <strong>
                        ${n.length}
                    </strong>

                    <span>
                        Featured<br>
                        Loan Guides
                    </span>

                </div>

            </div>


            <!-- =================================================
                 LOAN CAROUSEL
            ================================================== -->

            <div class="education-loan-carousel">

                <div class="education-loan-viewport">

                    <div class="education-loan-track">

                        ${i}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="education-loan-next"
                    aria-label="Show next education loan options in India"
                >

                    <span>
                        →
                    </span>

                </button>

            </div>


        </div>

    `})}function A(){let e=[{rank:`01`,name:`Tata Consultancy Services`,shortName:`TCS`,category:`IT & Technology`,location:`Pan India`,program:`Jobs • Internships • Graduate Programs`,rating:`4.7`,reviews:`5,240`,score:`9.1`,ranking:`One of India's leading IT and technology companies offering jobs and career opportunities in India`,highlight:`Strong career growth & learning opportunities`,image:`https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85`},{rank:`02`,name:`Infosys`,shortName:`INFOSYS`,category:`IT & Technology`,location:`Pan India`,program:`Jobs • Internships • Graduate Programs`,rating:`4.6`,reviews:`4,820`,score:`8.9`,ranking:`Major IT and technology company offering jobs, internships and career opportunities in India`,highlight:`Learning & development focused workplace`,image:`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85`},{rank:`03`,name:`Microsoft`,shortName:`MS`,category:`Technology`,location:`India`,program:`Software • Cloud • Product • Internships`,rating:`4.8`,reviews:`3,950`,score:`9.5`,ranking:`Leading global technology company offering software, cloud, AI and technology careers in India`,highlight:`Innovation, technology & strong work culture`,image:`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85`},{rank:`04`,name:`Google`,shortName:`GOOGLE`,category:`Technology`,location:`India`,program:`Software • Data • AI • Internships`,rating:`4.8`,reviews:`4,210`,score:`9.6`,ranking:`Leading technology company offering software, data, AI and internship opportunities in India`,highlight:`Innovation & global career opportunities`,image:`https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=1200&q=85`},{rank:`05`,name:`Amazon`,shortName:`AMAZON`,category:`Technology & E-Commerce`,location:`India`,program:`Technology • Operations • Business • Internships`,rating:`4.6`,reviews:`4,680`,score:`8.8`,ranking:`Leading technology and e-commerce company offering jobs, internships and business career opportunities in India`,highlight:`Fast-paced careers & diverse opportunities`,image:`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85`},{rank:`06`,name:`Deloitte`,shortName:`D`,category:`Consulting & Professional Services`,location:`India`,highlight:`Professional growth, consulting careers and business opportunities`,rating:`4.6`,image:`https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85`},{rank:`07`,name:`Accenture`,shortName:`ACN`,category:`IT & Consulting`,location:`Pan India`,program:`Technology • Consulting • Strategy • Internships`,rating:`4.5`,reviews:`4,060`,score:`8.6`,ranking:`Global technology and consulting company offering IT, consulting and digital career opportunities in India`,highlight:`Global opportunities & digital careers`,image:`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85`},{rank:`08`,name:`HDFC Bank`,shortName:`HDFC`,category:`Banking & Finance`,location:`Pan India`,program:`Banking • Finance • Analytics • Internships`,rating:`4.5`,reviews:`2,980`,score:`8.5`,ranking:`One of India's leading private sector banks offering banking, finance and analytics career opportunities`,highlight:`Career stability & financial sector growth`,image:`https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85`},{rank:`09`,name:`Reliance Industries`,shortName:`RIL`,category:`Conglomerate`,location:`India`,program:`Technology • Finance • Retail • Operations`,rating:`4.5`,reviews:`2,740`,score:`8.4`,ranking:`Large diversified company offering career opportunities across technology, finance, retail and operations`,highlight:`Diverse career paths across industries`,image:`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85`},{rank:`10`,name:`Wipro`,shortName:`WIPRO`,category:`IT & Technology`,location:`Pan India`,program:`IT • Consulting • Cloud • Internships`,rating:`4.4`,reviews:`2,560`,score:`8.3`,ranking:`Established IT and technology company offering consulting, cloud and career opportunities in India`,highlight:`Workplace opportunities & career mobility`,image:`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85`}];function t(e){return S({item:{rank:e.rank,name:e.name,category:e.category,program:e.program,location:e.location,rating:e.rating,reviews:e.reviews,score:e.score,ranking:e.ranking,highlight:e.highlight,image:e.image,actionLabel:`Explore Careers`},type:`company`})}let n=e.map(t).join(``),r=e.map(t).join(``);return x({id:`top-companies`,title:``,subtitle:``,content:`

        <div class="top-companies-section">


            <!-- =================================================
                 SECTION INTRO
            ================================================== -->

            <div class="top-companies-intro">

                <div class="top-companies-intro-content">

                    <span class="top-companies-label">
                        💼 CAREER & OPPORTUNITIES
                    </span>

                    <h2>
                        Top Companies to Work For in India
                    </h2>

                    <p>
                        Discover top companies in India offering jobs,
                        career opportunities, internships, graduate programs,
                        professional growth and diverse career paths.
                    </p>

                </div>


                <div class="top-companies-intro-badge">

                    <strong>
                        ${e.length}
                    </strong>

                    <span>
                        Featured<br>
                        Companies
                    </span>

                </div>

            </div>


            <!-- =================================================
                 COMPANY CAROUSEL
            ================================================== -->

            <div class="top-companies-carousel">

                <div
                    class="top-companies-track institution-carousel-track"
                >

                    ${n}

                    ${r}

                </div>

            </div>


            <!-- =================================================
                 BOTTOM CTA
            ================================================== -->

            <div class="top-companies-bottom">

                <div class="top-companies-bottom-text">

                    <span>
                        Looking for your next opportunity?
                    </span>

                    <strong>
                        Explore jobs, internships and career opportunities from top companies in India.
                    </strong>

                </div>


                <button
                    class="top-companies-explore-btn"
                    type="button"
                >

                    <span class="top-companies-view-all-text">
                        View All Top Companies in India
                    </span>

                    <span>
                        →
                    </span>

                </button>

            </div>


            <!-- =================================================
                 ALL COMPANIES VIEW
            ================================================== -->

            <div
                class="top-companies-all"
                hidden
            >

                <div class="top-companies-all-grid">

                    ${e.map(t).join(``)}

                </div>

            </div>


        </div>

    `})}function j({title:e,links:t=[]}){return`
        <div class="footer-column">
            <h3>${e}</h3>

            <ul>
                ${t.map(e=>`
                            <li>
                                <a href="${e.href||`#`}">
                                    ${e.label}
                                </a>
                            </li>
                        `).join(``)}
            </ul>
        </div>
    `}function M(){return`
        <div class="footer-social">
            <a href="#" aria-label="Facebook" class="social-link">
                <span>f</span>
            </a>

            <a href="#" aria-label="Instagram" class="social-link">
                <span>◎</span>
            </a>

            <a href="#" aria-label="LinkedIn" class="social-link">
                <span>in</span>
            </a>

            <a href="#" aria-label="YouTube" class="social-link">
                <span>▶</span>
            </a>
        </div>
    `}function N(){let e=new Date().getFullYear();return`
        <footer class="site-footer" id="footer">

            <!-- Footer Main -->
            <div class="footer-container">

                <!-- Brand -->
                <div class="footer-brand">

                    <div class="footer-logo">
                        EduConnect
                    </div>

                    <p class="footer-description">
                        Your education platform to discover top schools,
                        colleges, universities, courses, scholarships,
                        education rankings, jobs, careers and study abroad opportunities in India.
                    </p>

                    ${M()}

                </div>


                <!-- Education -->
                ${j({title:`Education`,links:[{label:`Pre Schools`,href:`#`},{label:`Top Schools in India`,href:`#`},{label:`Top Colleges in India`,href:`#`},{label:`Top Universities in India`,href:`#`},{label:`Online Education`,href:`#`},{label:`Distance Education`,href:`#`}]})}


                <!-- Explore -->
                ${j({title:`Explore`,links:[{label:`Study Abroad for Indian Students`,href:`#`},{label:`Scholarships in India`,href:`#`},{label:`Top Education Lists`,href:`#`},{label:`Education Rankings`,href:`#`},{label:`Student & Parent Reviews`,href:`#`},{label:`Compare Colleges in India`,href:`#`}]})}


                <!-- Career -->
                ${j({title:`Career`,links:[{label:`Jobs & Career Opportunities`,href:`#`},{label:`Internships`,href:`#`},{label:`Education Loans`,href:`#`},{label:`Career Guidance`,href:`#`},{label:`Online & Professional Courses`,href:`#`},{label:`Online Certifications`,href:`#`}]})}


                <!-- Platform -->
                ${j({title:`Platform`,links:[{label:`Student Community`,href:`#`},{label:`Education News`,href:`#`},{label:`Education Current Affairs`,href:`#`},{label:`College Rankings in India`,href:`#`},{label:`Student & Parent Reviews`,href:`#`},{label:`Contact EduConnect`,href:`#`}]})}

            </div>


            <!-- Footer Middle -->
            <div class="footer-highlight">

                <div class="footer-highlight-content">

                    <h3>
                        Find the Right Education Opportunities in India
                    </h3>

                    <p>
                        Explore top schools, colleges, universities,
                        courses, scholarships, jobs, career opportunities
                        and study abroad programs in India.
                    </p>

                </div>

                <a href="#" class="footer-cta">
                    Explore Education
                </a>

            </div>


            <!-- Footer Bottom -->
            <div class="footer-bottom">

                <div class="footer-bottom-container">

                    <p>
                        © ${e} EduConnect.
                        All rights reserved.
                    </p>

                    <div class="footer-legal">

                        <a href="#">
                            Privacy Policy
                        </a>

                        <a href="#">
                            Terms & Conditions
                        </a>

                        <a href="#">
                            Contact Us
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    `}function P(){return`

        <!-- =====================================================
             SITE HEADER
        ====================================================== -->

        ${t()}


        <!-- =====================================================
             PRIMARY NAVIGATION
        ====================================================== -->

        ${n()}


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
                ${r()}
            </section>


            <!-- =================================================
                 EDUCATION SOCIAL / DISCOVERY
            ================================================== -->

            <section
                id="education-social"
                aria-label="Education updates and social content"
            >
                ${i()}
            </section>


            <!-- =================================================
                 CURRENT AFFAIRS
            ================================================== -->

            <section
                id="current-affairs"
                aria-label="Current affairs and education updates"
            >
                ${te()}
            </section>


            <!-- =================================================
                 EDUCATION CATEGORIES
            ================================================== -->

            <section
                id="education-categories"
                aria-label="Education categories"
            >
                ${y()}
            </section>


            <!-- =================================================
                 PLAY SCHOOL
            ================================================== -->

            <section
                id="play-school"
                aria-label="Play school education"
            >
                ${ne()}
            </section>


            <!-- =================================================
                 PRE SCHOOL
            ================================================== -->

            <section
                id="pre-school"
                aria-label="Pre school education"
            >
                ${re()}
            </section>


            <!-- =================================================
                 SCHOOLS
            ================================================== -->

            <section
                id="schools"
                aria-label="Schools and school education"
            >
                ${ie()}
            </section>


            <!-- =================================================
                 TOP BOARDING SCHOOLS
            ================================================== -->

            <section
                id="boarding-schools"
                aria-label="Top boarding schools"
            >
                ${ae()}
            </section>


            <!-- =================================================
                 UG AND PG COLLEGES
            ================================================== -->

            <section
                id="colleges"
                aria-label="Undergraduate and postgraduate colleges"
            >
                ${oe()}
            </section>


            <!-- =================================================
                 ONLINE EDUCATION
            ================================================== -->

            <section
                id="online-education"
                aria-label="Online and distance education"
            >
                ${se()}
            </section>


            <!-- =================================================
                 EDUCATION NEWS
            ================================================== -->

            <section
                id="news"
                aria-label="Latest education news"
            >
                ${ue()}
            </section>


            <!-- =================================================
                 STUDY ABROAD
            ================================================== -->

            <section
                id="study-abroad"
                aria-label="Study abroad education"
            >
                ${ge()}
            </section>


            <!-- =================================================
                 EDUCATION RANKINGS
            ================================================== -->

            <section
                id="rankings"
                aria-label="Education rankings"
            >
                ${E()}
            </section>


            <!-- =================================================
                 STUDENT REVIEWS
            ================================================== -->

            <section
                id="student-reviews"
                aria-label="Student reviews"
            >
                ${D()}
            </section>


            <!-- =================================================
                 SCHOLARSHIPS
            ================================================== -->

            <section
                id="scholarships"
                aria-label="Scholarships and financial aid"
            >
                ${_e()}
            </section>


            <!-- =================================================
                 EDUCATION LOANS
            ================================================== -->

            <section
                id="education-loan"
                aria-label="Education loans and finance"
            >
                ${k()}
            </section>


            <!-- =================================================
                 EDUCATION TOP LISTS
            ================================================== -->

            <section
                id="top-lists"
                aria-label="Top education lists"
            >
                ${ve()}
            </section>


            <!-- =================================================
                 COLLEGE COMPARISON
            ================================================== -->

            <section
                id="compare-college"
                aria-label="Compare colleges and universities"
            >
                ${O()}
            </section>


            <!-- =================================================
                 COMPANIES
            ================================================== -->

            <section
                id="top-companies"
                aria-label="Top companies and career opportunities"
            >
                ${A()}
            </section>


        </main>


        <!-- =====================================================
             FOOTER
        ====================================================== -->

        ${N()}

    `}var F=`https://www.upgrad.com/study-abroad/abroad/courses/computer-science/`,I=`https://www.upgrad.com/study-abroad/`;function ye(e){let t={USA:[{logo:`YU`,tag:`COMPUTING`,tagClass:`purple`,title:`MS Computer Science`,university:`Yeshiva University`,meta1:``,meta2:`USA`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`WSU`,tag:`COMPUTING`,tagClass:`blue`,title:`BS Engineering · Computer Science option`,university:`Washington State University`,meta1:``,meta2:`USA`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`TROY`,tag:`COMPUTING`,tagClass:`purple`,title:`Master in Computer Science`,university:`Troy University`,meta1:``,meta2:`USA`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`DEP`,tag:`BUSINESS`,tagClass:`blue`,title:`Master of Business Administration`,university:`DePaul University`,meta1:``,meta2:`USA`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`NU`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MBA`,university:`Northeastern University`,meta1:`Boston`,meta2:`USA`},{logo:`NU`,tag:`POPULAR`,tagClass:`blue`,title:`MPS in Applied AI`,university:`Northeastern University`,meta1:`Boston`,meta2:`USA`},{logo:`NYU`,tag:`UNDERGRADUATE`,tagClass:`purple`,title:`BS Information Systems & Technology`,university:`New York University`,meta1:`New York`,meta2:`USA`},{logo:`NYU`,tag:`UNDERGRADUATE`,tagClass:`blue`,title:`BS Leadership and Management`,university:`New York University`,meta1:`New York`,meta2:`USA`}],Germany:[{logo:`UAM`,tag:`COMPUTING`,tagClass:`purple`,title:`MSc Computer Science · 90 ECTS`,university:`University of Applied Management`,meta1:``,meta2:`Germany`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`CODE`,tag:`COMPUTING`,tagClass:`blue`,title:`BSc Software Engineering`,university:`CODE University of Applied Sciences`,meta1:``,meta2:`Germany`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`UAM`,tag:`BUSINESS`,tagClass:`purple`,title:`MBA · 90 ECTS`,university:`University of Applied Management`,meta1:``,meta2:`Germany`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`TU`,tag:`BUSINESS`,tagClass:`blue`,title:`MBA`,university:`Touro University, Germany`,meta1:``,meta2:`Germany`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`TUM`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Computer Science`,university:`Technical University of Munich`,meta1:`Munich`,meta2:`Germany`},{logo:`RWTH`,tag:`POPULAR`,tagClass:`blue`,title:`MSc Data Science`,university:`RWTH Aachen University`,meta1:`Aachen`,meta2:`Germany`},{logo:`FU`,tag:`MASTER`,tagClass:`purple`,title:`MSc Artificial Intelligence`,university:`Free University of Berlin`,meta1:`Berlin`,meta2:`Germany`},{logo:`TU`,tag:`ENGINEERING`,tagClass:`blue`,title:`MSc Mechanical Engineering`,university:`TU Berlin`,meta1:`Berlin`,meta2:`Germany`}],France:[{logo:`PSB`,tag:`BUSINESS`,tagClass:`purple`,title:`Master of Business Administration`,university:`Paris School of Business`,meta1:``,meta2:`France`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`PSL`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Management`,university:`PSL University`,meta1:`Paris`,meta2:`France`},{logo:`HEC`,tag:`BUSINESS`,tagClass:`blue`,title:`Master in Management`,university:`HEC Paris`,meta1:`Paris`,meta2:`France`},{logo:`IP`,tag:`ENGINEERING`,tagClass:`purple`,title:`MSc Engineering`,university:`Institut Polytechnique de Paris`,meta1:`Paris`,meta2:`France`},{logo:`SOR`,tag:`MASTER`,tagClass:`blue`,title:`MSc Computer Science`,university:`Sorbonne University`,meta1:`Paris`,meta2:`France`}],UK:[{logo:`SUS`,tag:`COMPUTING`,tagClass:`purple`,title:`MSc Advanced Computer Science`,university:`University of Sussex`,meta1:``,meta2:`UK`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`SUS`,tag:`BUSINESS`,tagClass:`blue`,title:`Master of Business Administration`,university:`University of Sussex`,meta1:``,meta2:`UK`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`MAN`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Computer Science`,university:`University of Manchester`,meta1:`Manchester`,meta2:`UK`},{logo:`KCL`,tag:`POPULAR`,tagClass:`blue`,title:`MSc Data Science`,university:`King's College London`,meta1:`London`,meta2:`UK`},{logo:`LSE`,tag:`BUSINESS`,tagClass:`purple`,title:`MSc Business Analytics`,university:`London School of Economics`,meta1:`London`,meta2:`UK`},{logo:`UCL`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`MSc Information Technology`,university:`University College London`,meta1:`London`,meta2:`UK`}],Australia:[{logo:`MAC`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`Bachelor of Information Technology`,university:`Macquarie University`,meta1:``,meta2:`Australia`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`USYD`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`Master of Computer Science`,university:`University of Sydney`,meta1:`Sydney`,meta2:`Australia`},{logo:`UNSW`,tag:`POPULAR`,tagClass:`blue`,title:`Master of IT`,university:`UNSW Sydney`,meta1:`Sydney`,meta2:`Australia`},{logo:`MON`,tag:`BUSINESS`,tagClass:`purple`,title:`Master of Business Analytics`,university:`Monash University`,meta1:`Melbourne`,meta2:`Australia`},{logo:`MEL`,tag:`ENGINEERING`,tagClass:`blue`,title:`Master of Engineering`,university:`University of Melbourne`,meta1:`Melbourne`,meta2:`Australia`}],Finland:[{logo:`HAAGA`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`BBA Business Information Technology`,university:`Haaga-Helia University of Applied Sciences`,meta1:``,meta2:`Finland`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`SEAMK`,tag:`BUSINESS`,tagClass:`purple`,title:`MBA in International Business Management`,university:`Seinäjoki University of Applied Sciences`,meta1:``,meta2:`Finland`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`AAL`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Computer Science`,university:`Aalto University`,meta1:`Espoo`,meta2:`Finland`},{logo:`HEL`,tag:`POPULAR`,tagClass:`blue`,title:`MSc Data Science`,university:`University of Helsinki`,meta1:`Helsinki`,meta2:`Finland`},{logo:`TUR`,tag:`MASTER`,tagClass:`purple`,title:`MSc Technology`,university:`University of Turku`,meta1:`Turku`,meta2:`Finland`},{logo:`TAM`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`MSc Computing Sciences`,university:`Tampere University`,meta1:`Tampere`,meta2:`Finland`}],UAE:[{logo:`KHA`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`Computer Science`,university:`Khalifa University`,meta1:`Abu Dhabi`,meta2:`UAE`},{logo:`AUD`,tag:`POPULAR`,tagClass:`blue`,title:`Business Administration`,university:`American University in Dubai`,meta1:`Dubai`,meta2:`UAE`},{logo:`NYU`,tag:`MASTER`,tagClass:`purple`,title:`MSc Management`,university:`NYU Abu Dhabi`,meta1:`Abu Dhabi`,meta2:`UAE`},{logo:`UOS`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`MSc Computer Science`,university:`University of Sharjah`,meta1:`Sharjah`,meta2:`UAE`}],Canada:[{logo:`ALG`,tag:`COMPUTING`,tagClass:`purple`,title:`Bachelor of Computer Science`,university:`Algoma University`,meta1:``,meta2:`Canada`,sourceUrl:F,lastVerifiedAt:`2026-10-11`},{logo:`WAT`,tag:`BUSINESS`,tagClass:`blue`,title:`Master of Business, Entrepreneurship and Technology`,university:`University of Waterloo`,meta1:``,meta2:`Canada`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`UOT`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`Master of Computer Science`,university:`University of Toronto`,meta1:`Toronto`,meta2:`Canada`},{logo:`UBC`,tag:`POPULAR`,tagClass:`blue`,title:`Master of Data Science`,university:`University of British Columbia`,meta1:`Vancouver`,meta2:`Canada`},{logo:`WAT`,tag:`TECHNOLOGY`,tagClass:`purple`,title:`Master of Data Science`,university:`University of Waterloo`,meta1:`Waterloo`,meta2:`Canada`},{logo:`MCG`,tag:`MASTER`,tagClass:`blue`,title:`MSc Computer Science`,university:`McGill University`,meta1:`Montreal`,meta2:`Canada`}],Hungary:[{logo:`BME`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Computer Science`,university:`Budapest University of Technology`,meta1:`Budapest`,meta2:`Hungary`},{logo:`ELTE`,tag:`POPULAR`,tagClass:`blue`,title:`MSc Data Science`,university:`Eötvös Loránd University`,meta1:`Budapest`,meta2:`Hungary`},{logo:`SZEG`,tag:`MASTER`,tagClass:`purple`,title:`MSc Engineering`,university:`University of Szeged`,meta1:`Szeged`,meta2:`Hungary`},{logo:`DEB`,tag:`TECHNOLOGY`,tagClass:`blue`,title:`MSc Computer Science`,university:`University of Debrecen`,meta1:`Debrecen`,meta2:`Hungary`}],Ireland:[{logo:`UCC`,tag:`FINANCE`,tagClass:`blue`,title:`MSc Finance: Investment & Asset Management`,university:`University College Cork`,meta1:``,meta2:`Ireland`,sourceUrl:I,lastVerifiedAt:`2026-10-11`},{logo:`TCD`,tag:`TOP UNIVERSITY`,tagClass:`purple`,title:`MSc Computer Science`,university:`Trinity College Dublin`,meta1:`Dublin`,meta2:`Ireland`},{logo:`UCD`,tag:`POPULAR`,tagClass:`blue`,title:`MSc Data & Computational Science`,university:`University College Dublin`,meta1:`Dublin`,meta2:`Ireland`},{logo:`DCU`,tag:`TECHNOLOGY`,tagClass:`purple`,title:`MSc Computing`,university:`Dublin City University`,meta1:`Dublin`,meta2:`Ireland`},{logo:`UG`,tag:`MASTER`,tagClass:`blue`,title:`MSc Computer Science`,university:`University of Galway`,meta1:`Galway`,meta2:`Ireland`}]};return(t[e]||t.USA).map(e=>`
            <article class="edu-university-card" data-program-country="${e.meta2}">

                <div class="edu-university-card-top">

                    <div class="edu-university-logo">
                        ${e.logo}
                    </div>

                    <span class="edu-university-tag ${e.sourceUrl?`blue`:`purple`}">${e.sourceUrl?`PUBLIC LISTING`:`ILLUSTRATIVE`}</span>

                </div>

                <h4>
                    ${e.title}
                </h4>

                <p>
                    ${e.university}
                </p>

                <div class="edu-university-meta">

                    <span>
                        ${e.meta1}
                    </span>

                    <span>
                        ${e.meta2}
                    </span>

                </div>

                <a href="#study-abroad-country-comparison">
                    View details
                    <span>→</span>
                </a>

            </article>
        `).join(``)}function L(e,t=``,n=``){if(!e)return;let r={"Computer Science":/computer science|computing|software|informatics|information technology|cyber\s?security/i,Business:/business|management|mba|entrepreneur|finance|accounting/i,Engineering:/engineering|engineer/i,"Data Science":/data science|analytics/i,MBA:/\bmba\b|master of business administration/i,"Information Technology":/information technology|\bIT\b|computing/i,"AI & Machine Learning":/artificial intelligence|\bAI\b|machine learning/i,Technology:/technology|computing|computer science|information technology/i,Management:/management|business administration/i,Finance:/finance|accounting/i,Healthcare:/health|medical|nursing|public health/i,Education:/education|teaching/i,"Arts & Humanities":/arts|humanities|history|literature/i,Law:/\blaw\b|legal/i,Cybersecurity:/cyber\s?security|information security/i,Marketing:/marketing/i,Psychology:/psychology/i,Design:/design|media/i,Economics:/economics/i,Nursing:/nursing/i,IT:/information technology|\bIT\b/i,AI:/artificial intelligence|\bAI\b|machine learning/i},i={Undergraduate:/bachelor|undergraduate|\bBSc\b|\bBA\b|\bBBA\b|\bBS\b/i,Postgraduate:/master|postgraduate|\bMSc\b|\bMS\b|\bMPS\b|MBA|doctorate|ph\.?d/i,MBA:/\bmba\b|master of business administration/i,PhD:/ph\.?d|doctorate|doctoral/i},a=r[t],o=i[n],s=Array.from(e.querySelectorAll(`.edu-university-card`)),c=0;s.forEach(e=>{let t=e.textContent||``;e.hidden=!!(a&&!a.test(t)||o&&!o.test(t)),e.hidden||(c+=1)});let l=e.querySelector(`[data-program-status]`);if(l){let r=[t,n].filter(Boolean),i=e.querySelector(`.edu-country-heading h3`)?.childNodes[0]?.textContent?.trim()||`this country`;l.textContent=r.length?c+` matching sample listings for `+r.join(` · `)+` in `+i+`.`:c+` sample listings for `+i+`; this local view is not a complete catalogue.`}let u=e.querySelector(`[data-program-empty]`);u&&(u.hidden=c!==0),e.querySelectorAll(`[data-country-subject]`).forEach(e=>{let n=e.dataset.countrySubject===(t||`All programmes`);e.classList.toggle(`active`,n),e.setAttribute(`aria-pressed`,String(n))})}function be(e,{subject:t=``,level:n=``}={}){let r=e?.querySelector(`.edu-country-mega`),i=r?.querySelector(`.edu-country-panel.active`)||r?.querySelector(`[data-country-panel="USA"]`);if(!r||!i)return;L(i,t,n);let a=e.querySelector(`[data-mega-menu="countries"]`),o=e.querySelector(`[data-mega-trigger="countries"]`);e.querySelectorAll(`.edu-study-mega.is-open`).forEach(e=>e.classList.remove(`is-open`)),e.querySelectorAll(`.edu-study-nav-item.is-open`).forEach(e=>e.classList.remove(`is-open`)),e.querySelectorAll(`.edu-study-nav-button.is-open`).forEach(e=>{e.classList.remove(`is-open`),e.setAttribute(`aria-expanded`,`false`)}),a?.classList.add(`is-open`),o?.classList.add(`is-open`),o?.setAttribute(`aria-expanded`,`true`),o?.closest(`.edu-study-nav-item`)?.classList.add(`is-open`),e.querySelector(`.edu-study-menu`)?.classList.add(`is-open`)}function R(e,t,n){let r=[`All programmes`,...new Set(n.filter(e=>e!==`All programmes`))];return`
        <div
            class="edu-country-panel ${e===`USA`?`active`:``}"
            data-country-panel="${e}"
        >

            <div class="edu-country-heading">

                <h3>${e}<span>(Programme options)</span></h3>

                <a href="#study-abroad-country-comparison">
                    View All
                </a>

            </div>


            <div class="edu-country-chips">

                ${r.map(e=>`
                    <button
                        type="button"
                        class="${e===`All programmes`?`active`:``}"
                        aria-pressed="${e===`All programmes`?`true`:`false`}"
                        data-country-subject="${e}"
                    >
                        ${e}
                    </button>
                `).join(``)}

            </div>
            <p class="edu-country-filter-status" data-program-status role="status" aria-live="polite"></p>

<div class="edu-university-grid">

                ${ye(e)}

            </div>
<div class="edu-country-empty" data-program-empty hidden><strong>No sample options match these filters yet.</strong><span>Choose “All programmes” to reset and browse available listings.</span></div>

        </div>
    `}function xe(){return window.__eduStudyNavbarController||(window.__eduStudyNavbarController=!0,document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-explore-subject], [data-explore-level]`);if(t){e.preventDefault(),e.stopPropagation();let n=document.querySelector(`#edu-study-nav`);if(!n)return;be(n,{subject:t.dataset.exploreSubject||``,level:t.dataset.exploreLevel||``});return}if(e.target.closest(`[data-open-destinations]`)){e.preventDefault(),e.stopPropagation();let t=document.querySelector(`#edu-study-nav`),n=t?.querySelector(`[data-mega-menu="destinations"]`),r=t?.querySelector(`[data-mega-trigger="destinations"]`);if(!t||!n||!r)return;t.scrollIntoView({behavior:`smooth`,block:`start`}),t.querySelectorAll(`.edu-study-mega.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),t.querySelectorAll(`.edu-study-nav-item.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),t.querySelectorAll(`.edu-study-nav-button.is-open`).forEach(e=>{e.classList.remove(`is-open`),e.setAttribute(`aria-expanded`,`false`)}),n.classList.add(`is-open`),r.classList.add(`is-open`),r.setAttribute(`aria-expanded`,`true`),r.closest(`.edu-study-nav-item`)?.classList.add(`is-open`),t.querySelector(`.edu-study-menu`)?.classList.add(`is-open`),n.querySelectorAll(`[data-mega-content]`).forEach(e=>{e.classList.toggle(`active`,e.dataset.megaContent===`featured`)}),n.querySelectorAll(`[data-mega-panel]`).forEach(e=>{e.classList.toggle(`active`,e.dataset.megaPanel===`featured`)});return}let n=e.target.closest(`#edu-study-nav`);if(!n){document.querySelectorAll(`.edu-study-mega.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),document.querySelectorAll(`.edu-study-nav-item.is-open`).forEach(e=>{e.classList.remove(`is-open`)});return}let r=e.target.closest(`[data-mega-trigger]`);if(r){e.preventDefault(),e.stopPropagation();let t=r.dataset.megaTrigger,i=n.querySelector(`[data-mega-menu="${t}"]`);if(!i)return;let a=i.classList.contains(`is-open`);if(n.querySelectorAll(`.edu-study-mega.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),n.querySelectorAll(`.edu-study-nav-item.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),!a){i.classList.add(`is-open`),r.classList.add(`is-open`);let e=r.closest(`.edu-study-nav-item`);e&&e.classList.add(`is-open`)}return}let i=e.target.closest(`.edu-country-item`);if(i){e.preventDefault(),e.stopPropagation();let t=i.dataset.country,n=i.closest(`.edu-country-mega`);if(!n)return;n.querySelectorAll(`.edu-country-item.active`).forEach(e=>{e.classList.remove(`active`)}),i.classList.add(`active`),n.querySelectorAll(`.edu-country-panel.active`).forEach(e=>{e.classList.remove(`active`)});let r=n.querySelector(`[data-country-panel="${t}"]`);r&&(r.classList.add(`active`),L(r));return}let a=e.target.closest(`[data-country-subject]`);if(a){e.preventDefault(),e.stopPropagation();let t=a.closest(`.edu-country-panel`);if(!t)return;let n=a.dataset.countrySubject;L(t,n===`All programmes`?``:n);return}let o=e.target.closest(`.edu-study-side-item`);if(o){e.preventDefault(),e.stopPropagation();let t=o.closest(`.edu-study-mega`);if(!t)return;t.querySelectorAll(`.edu-study-side-item.active`).forEach(e=>{e.classList.remove(`active`)}),o.classList.add(`active`);let n=o.dataset.megaPanel;if(!n)return;t.querySelectorAll(`.edu-study-panel.active`).forEach(e=>{e.classList.remove(`active`)});let r=t.querySelector(`[data-mega-content="${n}"]`);r&&r.classList.add(`active`);return}let s=e.target.closest(`.edu-study-mobile-button`);if(s){e.preventDefault(),e.stopPropagation();let t=n.querySelector(`.edu-study-menu`);if(!t)return;t.classList.toggle(`is-open`);let r=t.classList.contains(`is-open`);s.setAttribute(`aria-expanded`,String(r));return}},!0),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(document.querySelectorAll(`.edu-study-mega.is-open`).forEach(e=>{e.classList.remove(`is-open`)}),document.querySelectorAll(`.edu-study-nav-item.is-open`).forEach(e=>{e.classList.remove(`is-open`)}))})),`

        <section
            class="edu-study-nav"
            id="edu-study-nav"
        >

            <div class="edu-study-nav-inner">


                <!-- BRAND -->

                <a
                    href="/"
                    class="edu-study-brand"
                >

                    <span
                        class="edu-study-brand-mark"
                    >
                        EC
                    </span>

                    EDUCONNECT

                </a>


                <!-- MAIN MENU -->

                <nav
                    class="edu-study-menu"
                    aria-label="Study Abroad Navigation"
                >


                    <!-- ===================================
                         EXPLORE COUNTRIES
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="countries"
                            aria-expanded="false"
                        >

                            Explore Countries

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega edu-country-mega"
                            data-mega-menu="countries"
                        >

                            <div
                                class="edu-country-mega-inner"
                            >


                                <!-- COUNTRY SIDEBAR -->

                                <aside
                                    class="edu-country-sidebar"
                                >

                                    <div
                                        class="edu-country-sidebar-title"
                                    >
                                        Explore Countries
                                    </div>

<button
                                        type="button"
                                        class="edu-country-item active"
                                        data-country="USA"
                                    >
                                        <span>
                                            United States
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Germany"
                                    >
                                        <span>
                                            Germany
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="France"
                                    >
                                        <span>
                                            France
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="UK"
                                    >
                                        <span>
                                            UK
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Australia"
                                    >
                                        <span>
                                            Australia
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Finland"
                                    >
                                        <span>
                                            Finland
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="UAE"
                                    >
                                        <span>
                                            United Arab Emirates
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Canada"
                                    >
                                        <span>
                                            Canada
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Hungary"
                                    >
                                        <span>
                                            Hungary
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Ireland"
                                    >
                                        <span>
                                            Ireland
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>

                                </aside>


                                <!-- COUNTRY CONTENT -->

                                <div
                                    class="edu-country-content"
                                >

                                    ${R(`USA`,`1,000+`,[`Computer Science`,`Business`,`Engineering`,`Data Science`,`MBA`,`Information Technology`])}


                                    ${R(`Germany`,`500+`,[`Computer Science`,`Engineering`,`Data Science`,`Business`,`AI & Machine Learning`,`Technology`])}


                                    ${R(`France`,`400+`,[`Business`,`Management`,`Engineering`,`Computer Science`,`Finance`,`Technology`])}


                                    ${R(`UK`,`800+`,[`Computer Science`,`Business`,`Data Science`,`Engineering`,`Finance`,`Management`])}


                                    ${R(`Australia`,`600+`,[`Computer Science`,`Business`,`Engineering`,`Data Science`,`IT`,`Management`])}


                                    ${R(`Finland`,`200+`,[`Computer Science`,`Technology`,`Engineering`,`Data Science`,`Business`,`AI`])}


                                    ${R(`UAE`,`150+`,[`Business`,`Computer Science`,`Engineering`,`Management`,`Technology`,`Finance`])}


                                    ${R(`Canada`,`700+`,[`Computer Science`,`Business`,`Engineering`,`Data Science`,`Management`,`Technology`])}


                                    ${R(`Hungary`,`150+`,[`Computer Science`,`Engineering`,`Business`,`Technology`,`Data Science`,`Management`])}


                                    ${R(`Ireland`,`250+`,[`Computer Science`,`Technology`,`Business`,`Data Science`,`Engineering`,`Finance`])}

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         DESTINATIONS
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="destinations"
                            aria-expanded="false"
                        >

                            Destinations

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="destinations"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="featured"
                                    >
                                        Featured
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="universities"
                                    >
                                        Universities
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="courses"
                                    >
                                        Courses
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="featured"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Popular Destinations
                                            </h4>

                                            <a href="#study-abroad-country-comparison">
                                                USA
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                UK
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Canada
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Australia
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Germany
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Europe
                                            </h4>

                                            <a href="#study-abroad-country-comparison">
                                                France
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Finland
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Hungary
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Ireland
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Middle East
                                            </h4>

                                            <a href="#study-abroad-country-comparison">
                                                UAE
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Dubai
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Abu Dhabi
                                            </a>

                                        </div>


                                        <div
                                            class="edu-study-feature"
                                        >

                                            <span
                                                class="edu-study-feature-icon"
                                            >
                                                🌍
                                            </span>

                                            <strong>
                                                Find your study destination
                                            </strong>

                                            <p>
                                                Compare destinations,
                                                universities and study
                                                opportunities.
                                            </p>

                                            <a
                                                href="#study-abroad-destinations"
                                            >
                                                Explore destinations →
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="universities"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                University Types
                                            </h4>

                                            <a href="#study-abroad-country-comparison">
                                                Top Universities
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Public Universities
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Private Universities
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Explore By
                                            </h4>

                                            <a href="#study-abroad-country-comparison">
                                                Ranking
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Country
                                            </a>

                                            <a href="#study-abroad-destinations">
                                                Course
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="courses"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Popular Courses
                                            </h4>

                                            <a href="#study-abroad-search" data-explore-subject="Computer Science">
                                                Computer Science
                                            </a>

                                            <a href="#study-abroad-search" data-explore-subject="Business">
                                                Business
                                            </a>

                                            <a href="#study-abroad-search" data-explore-subject="Engineering">
                                                Engineering
                                            </a>

                                            <a href="#study-abroad-search" data-explore-subject="Data Science">
                                                Data Science
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Study Level
                                            </h4>

                                            <a href="#study-abroad-search" data-explore-level="Undergraduate">
                                                Undergraduate
                                            </a>

                                            <a href="#study-abroad-search" data-explore-level="Postgraduate">
                                                Postgraduate
                                            </a>

                                            <a href="#study-abroad-search" data-explore-level="MBA">
                                                MBA
                                            </a>

                                            <a href="#study-abroad-search" data-explore-level="PhD">
                                                PhD
                                            </a>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         EXAMS
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="exams"
                            aria-expanded="false"
                        >

                            Exams

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="exams"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="english-tests"
                                    >
                                        English Tests
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="graduate-admissions"
                                    >
                                        Admission Tests
                                        <span>→</span>
                                    </button> 
                                    <button type="button" class="edu-study-side-item" data-mega-panel="undergraduate-admissions" aria-controls="undergraduate-admissions">
                                        Undergraduate Admission
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="test-planning" aria-controls="test-planning">
                                        Test Requirements
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="english-tests"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                English Tests
                                            </h4>

                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">
                                                IELTS
                                            </a>

                                            <a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank" rel="noopener noreferrer">
                                                TOEFL iBT
                                            </a>

                                            <a href="https://www.pearsonpte.com/pte-academic/" target="_blank" rel="noopener noreferrer">
                                                PTE Academic
                                            </a>

                                            <a href="https://englishtest.duolingo.com/" target="_blank" rel="noopener noreferrer">
                                                Duolingo English Test
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Preparation
                                            </h4>

                                            <a href="https://ielts.org/take-a-test/test-types" target="_blank" rel="noopener noreferrer">
                                                IELTS test types &amp; format ↗
                                            </a>

                                            <a href="https://ielts.org/take-a-test/preparation-resources" target="_blank" rel="noopener noreferrer">
                                                IELTS preparation resources ↗
                                            </a>

                                            <a href="https://ielts.org/take-a-test/your-results" target="_blank" rel="noopener noreferrer">
                                                IELTS results &amp; score guidance ↗
                                            </a>

                                        </div>


                                        <div
                                            class="edu-study-feature"
                                        >

                                            <span
                                                class="edu-study-feature-icon"
                                            >
                                                ✓
                                            </span>

                                            <strong>
                                                Prepare for your exam
                                            </strong>

                                            <p>
                                                Understand the test
                                                requirements for your
                                                study destination.
                                            </p>

                                            <a href="#study-abroad-faq">
                                                Browse EduConnect study-abroad FAQs →
                                            </a>

                                        </div>

                                     
                                        <div class="edu-study-column">
                                            <h4>Plan before you book</h4>
                                            <a href="#abroad-exams">Compare exam overviews on EduConnect</a>
                                            <a href="#study-abroad-faq">Check admission requirement guidance</a>
                                            <a href="#study-abroad-destination-explorer">Explore study destinations</a>
                                        </div></div>


                                    <div class="edu-study-panel" data-mega-content="graduate-admissions">
                                        <div class="edu-study-column">
                                            <h4>Graduate admission tests</h4>
                                            <a href="https://www.ets.org/gre/test-takers/general-test/about.html" target="_blank" rel="noopener noreferrer">GRE General Test ↗</a>
                                            <a href="https://www.mba.com/exams/gmat-exam" target="_blank" rel="noopener noreferrer">GMAT Exam ↗</a>
                                            <a href="#abroad-exams">See exam summaries on EduConnect</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>What to review</h4>
                                            <a href="#abroad-exams">Test sections and score overview</a>
                                            <a href="#study-abroad-faq">Programme entry requirements</a>
                                            <a href="#study-abroad-course-explorer">Explore graduate programmes</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Prepare your application</h4>
                                            <a href="#study-abroad-documents">Application document guidance</a>
                                            <a href="#study-abroad-application">Application steps</a>
                                            <a href="#study-abroad-intakes">Plan around an intake</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Check before you prepare</strong>
                                            <p>Test requirements can differ by institution, programme and applicant. Confirm the current policy with your chosen provider.</p>
                                            <a href="#study-abroad-faq">Review EduConnect guidance →</a>
                                        </div>
                                    </div>

                                 
                                    <div class="edu-study-panel" id="undergraduate-admissions" data-mega-content="undergraduate-admissions">
                                        <div class="edu-study-column">
                                            <h4>Undergraduate admission tests</h4>
                                            <a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer">SAT · official test information ↗</a>
                                            <a href="https://www.act.org/content/act/en/products-and-services/the-act.html" target="_blank" rel="noopener noreferrer">ACT · official test information ↗</a>
                                            <a href="#abroad-exams">See exam summaries on EduConnect</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Application planning</h4>
                                            <a href="#study-abroad-application">Review application steps</a>
                                            <a href="#study-abroad-documents">Prepare document checklist</a>
                                            <a href="#study-abroad-intakes">Explore intake planning</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Find suitable options</h4>
                                            <a href="#study-abroad-destination-explorer">Browse destinations</a>
                                            <a href="#study-abroad-course-explorer">Explore course options</a>
                                            <a href="#study-abroad-faq">Check entry guidance</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✓</span>
                                            <strong>Plan your next steps</strong>
                                            <p>Check the current test policy and application requirements for each institution you are considering.</p>
                                            <a href="#study-abroad-application">Open the application guide →</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" id="test-planning" data-mega-content="test-planning">
                                        <div class="edu-study-column">
                                            <h4>Choose a test category</h4>
                                            <a href="#abroad-exams">English proficiency exams</a>
                                            <a href="#abroad-exams">Graduate admission exams</a>
                                            <a href="#abroad-exams">Undergraduate admission exams</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Verify requirements</h4>
                                            <a href="#study-abroad-faq">Review entry requirements</a>
                                            <a href="#study-abroad-course-explorer">Check programme details</a>
                                            <a href="#study-abroad-destination-explorer">Explore destination options</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Get ready to apply</h4>
                                            <a href="#study-abroad-documents">Review document guidance</a>
                                            <a href="#study-abroad-application">Follow application steps</a>
                                            <a href="#study-abroad-intakes">Plan an intake timeline</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">i</span>
                                            <strong>Requirements vary</strong>
                                            <p>Confirm accepted tests, scores and deadlines directly with the institution and programme.</p>
                                            <a href="#study-abroad-faq">Read EduConnect FAQs →</a>
                                        </div>
                                    </div></div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         RESOURCES
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="resources"
                            aria-expanded="false"
                        >

                            Resources

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="resources"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="study-guides"
                                    >
                                        Articles &amp; Guides
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="planning-hub"
                                    >
                                        Study Planning Hub
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="scholarships"
                                    >
                                        Scholarships &amp; Funding
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="resource-tests"
                                    >
                                        Tests &amp; Preparation
                                        <span>→</span>
                                    </button> 
                                    <button type="button" class="edu-study-side-item" data-mega-panel="application-documents" aria-controls="application-documents">
                                        Applications &amp; Documents
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="popular-guides" aria-controls="popular-guides">
                                        Popular Study Guides
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="study-guides"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Study Guides
                                            </h4>

                                            <a href="#study-abroad-faq">
                                                Admission Requirements
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Process
                                            </a>

                                            <a href="#study-abroad-intakes">Intakes</a>
                                            <a href="#study-abroad-destinations">Choose a destination</a>
                                            <a href="#study-abroad-lead-form">Application document guidance →</a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Planning
                                            </h4>

                                            <a href="#study-abroad-cost">
                                                Cost & Finance
                                            </a>

                                            <a href="#abroad-scholarships">
                                                Scholarships
                                            </a>

                                            <a href="#study-abroad-faq">FAQs</a>
                                            <a href="#abroad-scholarships">Funding information →</a>

                                        </div>


                                        <div
                                            class="edu-study-feature"
                                        >

                                            <span
                                                class="edu-study-feature-icon"
                                            >
                                                📚
                                            </span>

                                            <strong>
                                                Study Abroad Guide
                                            </strong>

                                            <p>
                                                Everything you need
                                                to plan your journey.
                                            </p>

                                            <a href="#study-abroad-destinations">
                                                Start exploring →
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="planning-hub"
                                    >

                                        <div class="edu-study-column">
                                            <h4>Choose a destination</h4>
                                            <a href="#study-abroad-country-comparison">Compare study destinations →</a>
                                            <a href="#study-abroad-destinations">Browse destination options</a>
                                            <a href="#study-abroad-intakes">Explore upcoming intakes</a>
                                        </div>

                                        <div class="edu-study-column">
                                            <h4>Find a programme</h4>
                                            <a href="#study-abroad-destination-explorer">Explore courses and universities</a>
                                            <a href="#study-abroad-course-explorer">Browse course options</a>
                                            <a href="#study-abroad-faq">Review entry requirements</a>
                                        </div>

                                        <div class="edu-study-column">
                                            <h4>Plan your budget</h4>
                                            <a href="#study-abroad-cost">Review study costs</a>
                                            <a href="#study-abroad-tools">Open planning tools</a>
                                            <a href="#abroad-scholarships">Explore funding information</a>
                                        </div>

                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Build a clear study plan</strong>
                                            <p>Compare destinations, explore programmes and check official requirements before you apply.</p>
                                            <a href="#study-abroad-cta">Continue with EduConnect →</a>
                                        </div>

                                    </div>

                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="scholarships"
                                    >

                                        <div class="edu-study-column">

                                            <h4>Funding opportunities</h4>

                                            <a href="#abroad-scholarships">Browse scholarship information</a>
                                            <a href="https://foreign.fulbrightonline.org/" target="_blank" rel="noopener noreferrer">Fulbright Foreign Student Program ↗</a>
                                            <a href="https://www.chevening.org/scholarships/" target="_blank" rel="noopener noreferrer">Chevening Scholarships ↗</a>
                                            <a href="https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters" target="_blank" rel="noopener noreferrer">Erasmus Mundus Joint Masters ↗</a>
                                            <a href="https://www.daad.de/en/studying-in-germany/scholarships/" target="_blank" rel="noopener noreferrer">DAAD scholarships ↗</a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="resource-tests"
                                    >
                                        <div class="edu-study-column">
                                            <h4>English proficiency tests</h4>
                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">IELTS Academic ↗</a>
                                            <a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank" rel="noopener noreferrer">TOEFL iBT ↗</a>
                                            <a href="https://www.pearsonpte.com/pte-academic/" target="_blank" rel="noopener noreferrer">PTE Academic ↗</a>
                                            <a href="https://englishtest.duolingo.com/" target="_blank" rel="noopener noreferrer">Duolingo English Test ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Admissions tests</h4>
                                            <a href="https://www.ets.org/gre/test-takers/general-test/about.html" target="_blank" rel="noopener noreferrer">GRE General Test ↗</a>
                                            <a href="https://www.mba.com/exams/gmat-exam" target="_blank" rel="noopener noreferrer">GMAT Exam ↗</a>
                                            <a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer">SAT ↗</a>
                                            <a href="https://www.act.org/content/act/en/products-and-services/the-act.html" target="_blank" rel="noopener noreferrer">ACT ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Preparation &amp; requirements</h4>
                                            <a href="https://ielts.org/take-a-test/test-types" target="_blank" rel="noopener noreferrer">IELTS test types &amp; format ↗</a>
                                            <a href="https://ielts.org/take-a-test/your-results" target="_blank" rel="noopener noreferrer">IELTS results &amp; score guidance ↗</a>
                                            <a href="https://ielts.org/take-a-test/preparation-resources" target="_blank" rel="noopener noreferrer">IELTS preparation resources ↗</a>
                                            <a href="#study-abroad-faq">Admission checklist</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" data-mega-content="official-resources">
                                        <div class="edu-study-column">
                                            <h4>Official destination guidance</h4>
                                            <a href="https://educationusa.state.gov/your-5-steps-us-study" target="_blank" rel="noopener noreferrer">United States · EducationUSA ↗</a>
                                            <a href="https://www.gov.uk/student-visa" target="_blank" rel="noopener noreferrer">United Kingdom · GOV.UK ↗</a>
                                            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" target="_blank" rel="noopener noreferrer">Canada · Study permit ↗</a>
                                            <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" target="_blank" rel="noopener noreferrer">Australia · Student visa ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>More official sources</h4>
                                            <a href="https://www.make-it-in-germany.com/en/visa-residence/types/studying" target="_blank" rel="noopener noreferrer">Germany · Study visa ↗</a>
                                            <a href="https://www.france-visas.gouv.fr/en/web/france-visas/etudiant" target="_blank" rel="noopener noreferrer">France · Student visa ↗</a>
                                            <a href="https://www.irishimmigration.ie/coming-to-study-in-ireland/" target="_blank" rel="noopener noreferrer">Ireland · Study information ↗</a>
                                            <a href="#study-abroad-faq">More EduConnect study-abroad FAQs →</a>
                                        </div>
                                    </div>

                                 
                                    <div class="edu-study-panel" id="application-documents" data-mega-content="application-documents">
                                        <div class="edu-study-column">
                                            <h4>Application documents</h4>
                                            <a href="#study-abroad-documents">Document guidance on EduConnect</a>
                                            <a href="#study-abroad-application">Application process and next steps</a>
                                            <a href="#study-abroad-faq">Common application questions</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Statement &amp; references</h4>
                                            <a href="#study-abroad-documents">Statement of purpose planning</a>
                                            <a href="#study-abroad-documents">Recommendation letter planning</a>
                                            <a href="#study-abroad-documents">Organize supporting documents</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Keep your application on track</h4>
                                            <a href="#study-abroad-intakes">Review intake dates</a>
                                            <a href="#study-abroad-application">See the application steps</a>
                                            <a href="#study-abroad-course-explorer">Return to programme discovery</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">▤</span>
                                            <strong>Get your documents ready</strong>
                                            <p>Use EduConnect’s existing document guidance, then confirm each programme’s exact requirements.</p>
                                            <a href="#study-abroad-documents">Open document guidance →</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" id="popular-guides" data-mega-content="popular-guides">
                                        <div class="edu-study-column">
                                            <h4>Explore destinations</h4>
                                            <a href="#study-abroad-destinations">Browse study destinations</a>
                                            <a href="#study-abroad-country-comparison">Compare country options</a>
                                            <a href="#study-abroad-intakes">Explore study intakes</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Find a programme</h4>
                                            <a href="#study-abroad-destination-explorer">Explore universities</a>
                                            <a href="#study-abroad-course-explorer">Browse course options</a>
                                            <a href="#study-abroad-faq">Review entry guidance</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Plan costs &amp; funding</h4>
                                            <a href="#study-abroad-cost">Explore study costs</a>
                                            <a href="#abroad-scholarships">Review scholarship information</a>
                                            <a href="#study-abroad-tools">Open planning tools</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Start with your priorities</strong>
                                            <p>Compare destinations, programmes and funding information before deciding where to apply.</p>
                                            <a href="#study-abroad-country-comparison">Compare destinations →</a>
                                        </div>
                                    </div></div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         MORE
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="more"
                            aria-expanded="false"
                        >

                            More

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="more"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="tools"
                                    >
                                        Tools
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="services"
                                    >
                                        Services
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="support"
                                    >
                                        Support
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="official-resources">
                                        Official Resources
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="tools"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Study Tools
                                            </h4>

                                            <a href="#study-abroad-cost">
                                                Cost Planner
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Country Comparison
                                            </a>

                                            <a href="#study-abroad-destinations">Course &amp; university discovery</a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Planning
                                            </h4>

                                            <a href="#study-abroad-intakes">
                                                Intake Planner
                                            </a>

                                            <a href="#study-abroad-faq">
                                                Requirements
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Process
                                            </a>

                                        </div>

                                     
                                        <div class="edu-study-column">
                                            <h4>Planning tools</h4>
                                            <a href="#study-abroad-tool-cost">Estimate your study budget</a>
                                            <a href="#study-abroad-tool-timeline">Build an application timeline</a>
                                            <a href="#study-abroad-tool-profile">Review your study profile</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">↗</span>
                                            <strong>Plan with EduConnect</strong>
                                            <p>Use the on-page tools to organize your budget, timeline and preparation priorities.</p>
                                            <a href="#study-abroad-tools">Browse study planning tools →</a>
                                        </div></div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="services"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                EDUCONNECT
                                            </h4>

                                            <a href="#study-abroad-destinations">
                                                Study Abroad
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                University Discovery
                                            </a>

                                            <a href="#abroad-scholarships">
                                                Scholarship Discovery
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="support"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Help & Support
                                            </h4>

                                            <a href="#study-abroad-faq">
                                                FAQs
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Help
                                            </a>

                                            <a href="#study-abroad-cta">
                                                Get Started
                                            </a>

                                        </div>

                                    </div>

                                    <div class="edu-study-panel" data-mega-content="official-resources">
                                        <div class="edu-study-column">
                                            <h4>Official destination information</h4>
                                            <a href="https://educationusa.state.gov/your-5-steps-us-study" target="_blank" rel="noopener noreferrer">Government and advising links ↗</a>
                                            <a href="#study-abroad-faq">Application requirements</a>
                                            <a href="#abroad-scholarships">Scholarships and funding ↗</a>
                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">English test information ↗</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">↗</span>
                                            <strong>Use official sources</strong>
                                            <p>Check current visa rules, entry requirements and scholarship details with the responsible organization.</p>
                                            <a href="#study-abroad-faq">Browse EduConnect study-abroad FAQs →</a>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </nav>


                <!-- RIGHT ACTIONS -->

                <div
                    class="edu-study-nav-actions"
                >

                    <a
                        href="#study-abroad-cta"
                        class="edu-study-contact"
                    >
                        Get Started
                    </a>


                    <button
                        type="button"
                        class="edu-study-mobile-button"
                        aria-label="Open navigation"
                        aria-expanded="false"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </div>

        </section>

    `}function Se(){return`
        <section
            class="study-abroad-hero"
            id="study-abroad-hero"
            aria-labelledby="study-abroad-hero-title"
        >

            <!-- ==================================================
                 BACKGROUND DECORATION
            =================================================== -->

            <div
                class="study-abroad-hero-background"
                aria-hidden="true"
            >
                <div class="study-abroad-hero-grid"></div>

                <div class="study-abroad-hero-glow study-abroad-glow-one"></div>
                <div class="study-abroad-hero-glow study-abroad-glow-two"></div>

                <div class="study-abroad-hero-orbit study-abroad-orbit-one"></div>
                <div class="study-abroad-hero-orbit study-abroad-orbit-two"></div>
            </div>


            <!-- ==================================================
                 MAIN HERO CONTAINER
            =================================================== -->

            <div class="study-abroad-container">

                <div class="study-abroad-hero-layout">


                    <!-- ==================================================
                         LEFT CONTENT
                    =================================================== -->

                    <div class="study-abroad-hero-content">

                        <div class="study-abroad-hero-badge">
                            <span class="study-abroad-badge-dot"></span>

                            <span>
                                STUDY ABROAD • OVERSEAS EDUCATION
                            </span>
                        </div>


                        <h1 id="study-abroad-hero-title">

                            Study Abroad
                            <span>
                                Compare countries, courses & universities.
                            </span>

                        </h1>


                        <p class="study-abroad-hero-description">

                            Compare study abroad destinations from India. Explore universities and courses, check admission requirements and intakes, find scholarship options, and estimate tuition and living costs before planning your application.

                        </p>


                        <!-- ==================================================
                             SEARCH
                        =================================================== -->

                        <div class="institution-search-widget study-abroad-search-widget">
                            <form
                                class="study-abroad-search"
                                id="study-abroad-search-form"
                                role="search"
                                action="#study-abroad-results"
                                method="get"
                                data-institution-search
                                data-search-suggestions-id="study-abroad-institution-suggestions"
                                data-search-results-id="study-abroad-institution-results"
                            >

                            <div class="study-abroad-search-icon">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="11" cy="11" r="7"></circle>
                                    <path d="m20 20-3.5-3.5"></path>
                                </svg>
                            </div>


                            <div class="study-abroad-search-input-wrapper">

                                <label
                                    for="study-abroad-search"
                                    class="study-abroad-visually-hidden"
                                >
                                    Search universities, courses or countries
                                </label>

                                <input
                                    id="study-abroad-search"
                                    name="q"
                                    type="search"
                                    autocomplete="off"
                                    placeholder="Search country, university or course (e.g. Germany)..."
                                    aria-label="Search for a study abroad country, university or course"
                                />

                            </div>


                            <button
                                type="submit"
                                class="study-abroad-search-button"
                            >
                                <span>Search</span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>
                            </button>

                            </form>

                            <div
                                id="study-abroad-institution-suggestions"
                                class="institution-search-suggestions-list"
                                role="listbox"
                                aria-label="Matching institutions"
                                hidden
                            ></div>

                            <section
                                id="study-abroad-institution-results"
                                class="institution-search-results"
                                aria-live="polite"
                                hidden
                            ></section>
                        </div>


                        <!-- ==================================================
                             SEARCH SUGGESTIONS
                        =================================================== -->

                        <div class="study-abroad-search-suggestions">



                            <a href="#study-abroad-universities">
                                Universities
                            </a>

                            <a href="#study-abroad-course-explorer">
                                Courses
                            </a>

                            <a href="#study-abroad-scholarships">
                                Scholarships
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in the USA
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in the UK
                            </a>

                            <a href="#study-abroad-destinations">
                                Study in Germany
                            </a>

                        </div>


                        <!-- ==================================================
                             PRIMARY ACTIONS
                        =================================================== -->

                        <div class="study-abroad-hero-actions">

                            <a
                                href="#"
                                class="study-abroad-primary-button"
                                onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                            >

                                <span>
                                    Get Free Counselling
                                </span>

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>

                            </a>


                            <a
                                href="#edu-study-nav"
                                class="study-abroad-secondary-button"
                                data-open-destinations
                            >
                                Explore Destinations
                            </a>

                        </div>


                        <!-- ==================================================
                             TRUST INDICATORS
                        =================================================== -->

                        <div class="study-abroad-hero-trust">

                            <div class="study-abroad-trust-item">

                                <strong>
                                    Global
                                </strong>

                                <span>
                                    study destinations
                                </span>

                            </div>


                            <div class="study-abroad-trust-divider"></div>


                            <div class="study-abroad-trust-item">

                                <strong>
                                    Course
                                </strong>

                                <span>
                                    and university options
                                </span>

                            </div>


                            <div class="study-abroad-trust-divider"></div>


                            <div class="study-abroad-trust-item">

                                <strong>
                                    Application
                                </strong>

                                <span>
                                    planning guidance
                                </span>

                            </div>

                        </div>

                    </div>


                    <!-- ==================================================
                         RIGHT HERO PANEL
                    =================================================== -->

                    <div class="study-abroad-hero-visual">

                        <div
                            class="study-abroad-hero-card"
                            aria-label="Study abroad planning overview"
                        >

                            <!-- CARD HEADER -->

                            <div class="study-abroad-card-header">

                                <div>
                                    <span>
                                        EDUCONNECT
                                    </span>

                                    <strong>
                                        Your Study Abroad Plan
                                    </strong>
                                </div>

                                <div class="study-abroad-card-status">
                                    <span></span>
                                    Explore
                                </div>

                            </div>


                            <!-- PROGRESS -->

                            <div class="study-abroad-plan-progress">

                                <div class="study-abroad-progress-label">

                                    <span>
                                        Planning progress
                                    </span>

                                    <strong>
                                        25%
                                    </strong>

                                </div>

                                <div class="study-abroad-progress-bar">
                                    <span></span>
                                </div>

                            </div>


                            <!-- PLANNING STEPS -->

                            <div class="study-abroad-plan-list">

                                <div class="study-abroad-plan-item active">

                                    <div class="study-abroad-plan-number">
                                        01
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Choose your destination
                                        </strong>

                                        <span>
                                            Compare countries and study options
                                        </span>

                                    </div>

                                    <div class="study-abroad-plan-check">
                                        ✓
                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        02
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Find your course
                                        </strong>

                                        <span>
                                            Discover programs matching your goals
                                        </span>

                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        03
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Shortlist universities
                                        </strong>

                                        <span>
                                            Compare institutions and requirements
                                        </span>

                                    </div>

                                </div>


                                <div class="study-abroad-plan-item">

                                    <div class="study-abroad-plan-number">
                                        04
                                    </div>

                                    <div class="study-abroad-plan-content">

                                        <strong>
                                            Prepare your application
                                        </strong>

                                        <span>
                                            Documents, tests and deadlines
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <!-- CARD FOOTER -->

                            <div class="study-abroad-card-footer">

                                <div class="study-abroad-card-footer-icon">

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="9"></circle>
                                        <path d="M12 7v5l3 2"></path>
                                    </svg>

                                </div>

                                <div>
                                    <strong>
                                        Start planning early
                                    </strong>

                                    <span>
                                        Deadlines vary by university and course
                                    </span>
                                </div>

                            </div>

                        </div>


                        <!-- ==================================================
                             FLOATING DESTINATION CARD
                        =================================================== -->




                        </div>

                    </div>

                </div>


                <!-- ==================================================
                     POPULAR DESTINATIONS
                =================================================== -->

                <div
                    class="study-abroad-popular-destinations"
                    id="study-abroad-destinations"
                >

                    <div class="study-abroad-popular-header">

                        <div>

                            <span class="study-abroad-section-label">
                                EXPLORE DESTINATIONS
                            </span>

                            <h2>
                                Compare study abroad destinations for Indian students
                            </h2>

                        </div>

                        <a href="#study-abroad-country-comparison">
                            Compare destinations
                            <span>→</span>
                        </a>

                    </div>


                    <div class="study-abroad-destination-list">

                        ${[{name:`USA`,code:`US`,description:`Study in the USA: universities & courses`},{name:`UK`,code:`UK`,description:`Study in the UK: universities & courses`},{name:`Canada`,code:`CA`,description:`Study in Canada: courses & universities`},{name:`Australia`,code:`AU`,description:`Study in Australia: courses & universities`},{name:`Germany`,code:`DE`,description:`Study in Germany: courses & admissions`},{name:`Ireland`,code:`IE`,description:`Study in Ireland: courses & universities`}].map(e=>`
                                    <a
                                        href="#study-abroad-country-comparison"
                                        class="study-abroad-destination-card"
                                        data-country="${e.code}"
                                    >

                                        <div class="study-abroad-destination-country">

                                            <span
                                                class="study-abroad-country-code"
                                            >
                                                ${e.code}
                                            </span>

                                            <div>

                                                <strong>
                                                    ${e.name}
                                                </strong>

                                                <span>
                                                    ${e.description}
                                                </span>

                                            </div>

                                        </div>

                                        <span class="study-abroad-destination-arrow">
                                            →
                                        </span>

                                    </a>
                                `).join(``)}

                    </div>

                </div>

            </div>

        </section>
    `}function Ce(){return`
        <section
            class="study-abroad-lead-section"
            id="study-abroad-lead-form"
            aria-labelledby="study-abroad-lead-title"
        >

            <div class="study-abroad-container">

                <div class="study-abroad-lead-wrapper">


                    <!-- ==================================================
                         LEFT CONTENT
                    =================================================== -->

                    <div class="study-abroad-lead-content">

                        <span class="study-abroad-section-eyebrow">
                            FREE STUDY ABROAD COUNSELLING
                        </span>

                        <h2 id="study-abroad-lead-title">
                            Get study abroad guidance for your plans from India
                        </h2>

                        <p>
                            Share your academic background, preferred country and course. Our counselling team can discuss university options, admission steps and planning for your study abroad application from India.
                        </p>


                        <!-- BENEFITS -->

                        <div class="study-abroad-lead-benefits">

                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    01
                                </span>

                                <div>
                                    <strong>
                                        Understand your options
                                    </strong>

                                    <p>
                                        Explore destinations, courses and
                                        university pathways.
                                    </p>
                                </div>

                            </div>


                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    02
                                </span>

                                <div>
                                    <strong>
                                        Build a shortlist
                                    </strong>

                                    <p>
                                        Compare universities based on your
                                        study goals and preferences.
                                    </p>
                                </div>

                            </div>


                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    03
                                </span>

                                <div>
                                    <strong>
                                        Understand the process
                                    </strong>

                                    <p>
                                        Learn about applications, documents,
                                        funding and other planning stages.
                                    </p>
                                </div>

                            </div>

                        </div>


                        <!-- NOTE -->

                        <div class="study-abroad-lead-note">

                            <span aria-hidden="true">
                                i
                            </span>

                            <p>
                                Counselling does not guarantee admission,
                                scholarships or visa approval. Final
                                decisions are made by the relevant university
                                or government authority.
                            </p>

                        </div>

                    </div>


                    <!-- ==================================================
                         FORM
                    =================================================== -->

                    <div class="study-abroad-lead-card">

                        <div class="study-abroad-lead-card-header">

                            <span>
                                GET STARTED
                            </span>

                            <h3>
                                Tell us about yourself
                            </h3>

                            <p>
                                Fields marked with * are required.
                            </p>

                        </div>


                        <form
                            id="study-abroad-lead-form-element"
                            class="study-abroad-lead-form"
                            novalidate
                        >


                            <!-- ==================================================
                                 NAME
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-name">
                                    Full name *
                                </label>

                                <input
                                    id="study-abroad-name"
                                    name="fullName"
                                    type="text"
                                    autocomplete="name"
                                    placeholder="Enter your full name"
                                    required
                                    minlength="2"
                                />

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="fullName"
                                ></span>

                            </div>


                            <!-- ==================================================
                                 EMAIL
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-email">
                                    Email address *
                                </label>

                                <input
                                    id="study-abroad-email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    placeholder="you@example.com"
                                    required
                                />

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="email"
                                ></span>

                            </div>


                            <!-- ==================================================
                                 PHONE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-phone">
                                    Phone number *
                                </label>

                                <div class="study-abroad-phone-field">

                                    <span>
                                        +91
                                    </span>

                                    <input
                                        id="study-abroad-phone"
                                        name="phone"
                                        type="tel"
                                        autocomplete="tel"
                                        inputmode="numeric"
                                        maxlength="10"
                                        placeholder="10-digit mobile number"
                                        required
                                    />

                                </div>

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="phone"
                                ></span>

                            </div>


                            <!-- ==================================================
                                 CURRENT EDUCATION
                            =================================================== -->

                            <div class="study-abroad-form-row">

                                <div class="study-abroad-form-field">

                                    <label for="study-abroad-education">
                                        Current education *
                                    </label>

                                    <select
                                        id="study-abroad-education"
                                        name="education"
                                        required
                                    >

                                        <option value="">
                                            Select
                                        </option>

                                        <option value="12th">
                                            Class 12
                                        </option>

                                        <option value="bachelors">
                                            Bachelor's
                                        </option>

                                        <option value="masters">
                                            Master's
                                        </option>

                                        <option value="working-professional">
                                            Working professional
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>

                                    </select>

                                </div>


                                <div class="study-abroad-form-field">

                                    <label for="study-abroad-graduation">
                                        Graduation year
                                    </label>

                                    <select
                                        id="study-abroad-graduation"
                                        name="graduationYear"
                                    >

                                        <option value="">
                                            Select
                                        </option>

                                        <option value="2026">
                                            2026
                                        </option>

                                        <option value="2027">
                                            2027
                                        </option>

                                        <option value="2028">
                                            2028
                                        </option>

                                        <option value="2029">
                                            2029
                                        </option>

                                        <option value="2030">
                                            2030
                                        </option>

                                        <option value="later">
                                            Later
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <!-- ==================================================
                                 DESTINATION
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-destination">
                                    Preferred destination
                                </label>

                                <select
                                    id="study-abroad-destination"
                                    name="destination"
                                >

                                    <option value="">
                                        Select destination
                                    </option>

                                    <option value="usa">
                                        USA
                                    </option>

                                    <option value="uk">
                                        UK
                                    </option>

                                    <option value="canada">
                                        Canada
                                    </option>

                                    <option value="australia">
                                        Australia
                                    </option>

                                    <option value="germany">
                                        Germany
                                    </option>

                                    <option value="ireland">
                                        Ireland
                                    </option>

                                    <option value="new-zealand">
                                        New Zealand
                                    </option>

                                    <option value="france">
                                        France
                                    </option>

                                    <option value="not-sure">
                                        I'm not sure yet
                                    </option>

                                </select>

                            </div>


                            <!-- ==================================================
                                 COURSE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-course">
                                    Preferred course / field
                                </label>

                                <select
                                    id="study-abroad-course"
                                    name="course"
                                >

                                    <option value="">
                                        Select field
                                    </option>

                                    <option value="computer-science">
                                        Computer Science
                                    </option>

                                    <option value="data-science">
                                        Data Science & AI
                                    </option>

                                    <option value="engineering">
                                        Engineering
                                    </option>

                                    <option value="business">
                                        Business & Management
                                    </option>

                                    <option value="finance">
                                        Finance & Economics
                                    </option>

                                    <option value="health">
                                        Health & Life Sciences
                                    </option>

                                    <option value="design">
                                        Design & Creative Arts
                                    </option>

                                    <option value="hospitality">
                                        Hospitality & Tourism
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <!-- ==================================================
                                 STUDY LEVEL
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-degree">
                                    Desired study level
                                </label>

                                <select
                                    id="study-abroad-degree"
                                    name="degree"
                                >

                                    <option value="">
                                        Select level
                                    </option>

                                    <option value="bachelors">
                                        Bachelor's
                                    </option>

                                    <option value="masters">
                                        Master's
                                    </option>

                                    <option value="mba">
                                        MBA
                                    </option>

                                    <option value="phd">
                                        PhD
                                    </option>

                                    <option value="diploma">
                                        Diploma / Certificate
                                    </option>

                                </select>

                            </div>


                            <!-- ==================================================
                                 BUDGET
                            =================================================== -->


                            <!-- ==================================================
                                 MESSAGE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-message">
                                    Tell us about your plans
                                </label>

                                <textarea
                                    id="study-abroad-message"
                                    name="message"
                                    rows="4"
                                    maxlength="1000"
                                    placeholder="Tell us about your course, destination or study abroad goals..."
                                ></textarea>

                                <div class="study-abroad-character-count">
                                    <span id="study-abroad-message-count">
                                        0
                                    </span>
                                    / 1000
                                </div>

                            </div>


                            <!-- ==================================================
                                 CONSENT
                            =================================================== -->

                            <div class="study-abroad-consent">

                                <label>

                                    <input
                                        type="checkbox"
                                        id="study-abroad-consent"
                                        name="consent"
                                        required
                                    />

                                    <span>
                                        I agree to be contacted regarding my
                                        Study Abroad enquiry and understand
                                        that my information will be processed
                                        according to the applicable privacy
                                        notice.
                                    </span>

                                </label>

                            </div>


                            <span
                                class="study-abroad-form-error"
                                data-error-for="consent"
                            ></span>


                            <!-- ==================================================
                                 SUBMIT
                            =================================================== -->

                            <button
                                type="submit"
                                class="study-abroad-primary-button study-abroad-submit-button"
                            >

                                <span>
                                    Request free counselling
                                </span>

                                <span aria-hidden="true">
                                    →
                                </span>

                            </button>


                            <!-- ==================================================
                                 FORM STATUS
                            =================================================== -->

                            <div
                                id="study-abroad-form-status"
                                class="study-abroad-form-status"
                                role="status"
                                aria-live="polite"
                            ></div>


                            <p class="study-abroad-form-privacy">

                                Your information is used to respond to your
                                enquiry. Do not submit passwords, payment
                                details or other sensitive information through
                                this form.

                            </p>

                        </form>

                    </div>

                </div>


                <!-- ==================================================
                     TRUST / PROCESS STRIP
                =================================================== -->

                <div class="study-abroad-lead-process">

                    <div>

                        <span>
                            01
                        </span>

                        <strong>
                            Submit enquiry
                        </strong>

                        <small>
                            Tell us about your plans
                        </small>

                    </div>


                    <div>

                        <span>
                            02
                        </span>

                        <strong>
                            Profile discussion
                        </strong>

                        <small>
                            Understand possible options
                        </small>

                    </div>


                    <div>

                        <span>
                            03
                        </span>

                        <strong>
                            Plan next steps
                        </strong>

                        <small>
                            Explore your application journey
                        </small>

                    </div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-lead-seo">

                    <h2>
                        Study abroad counselling for students in India
                    </h2>

                    <p>
                        Planning to study abroad can involve many decisions,
                        including selecting a destination, choosing a course,
                        finding suitable universities, understanding admission
                        requirements and preparing a realistic education
                        budget.
                    </p>

                    <p>
                        Study abroad counselling can help students organize
                        these decisions and understand the next steps in the
                        application process. However, admission, scholarship
                        and visa decisions are made by the relevant
                        institutions and authorities.
                    </p>

                </div>

            </div>

        </section>
    `}var z=[{id:`usa`,name:`USA`,flag:`🇺🇸`,universities:`4,000+`,tuition:`From ₹18L/year`,popularFor:`STEM • Business • Technology`,duration:`1–2 Years`,workOpportunity:`OPT available`},{id:`uk`,name:`United Kingdom`,flag:`🇬🇧`,universities:`160+`,tuition:`From ₹15L/year`,popularFor:`Business • Law • Medicine`,duration:`1 Year`,workOpportunity:`Graduate Route`},{id:`canada`,name:`Canada`,flag:`🇨🇦`,universities:`100+`,tuition:`From ₹12L/year`,popularFor:`IT • Business • Engineering`,duration:`1–2 Years`,workOpportunity:`PGWP eligible programs`},{id:`australia`,name:`Australia`,flag:`🇦🇺`,universities:`40+`,tuition:`From ₹14L/year`,popularFor:`Business • IT • Healthcare`,duration:`1–2 Years`,workOpportunity:`Post-study work options`},{id:`germany`,name:`Germany`,flag:`🇩🇪`,universities:`400+`,tuition:`Low / No tuition at many public universities`,popularFor:`Engineering • Technology`,duration:`1–2 Years`,workOpportunity:`Post-study work options`},{id:`france`,name:`France`,flag:`🇫🇷`,universities:`3,500+`,tuition:`From ₹4L/year`,popularFor:`Business • Arts • Fashion`,duration:`1–2 Years`,workOpportunity:`Post-study options`}];function we(){return window.__countryExploreHandlerLoaded||(window.__countryExploreHandlerLoaded=!0,document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-country-explore]`);if(!t)return;e.preventDefault(),e.stopPropagation();let n={usa:`USA`,uk:`UK`,canada:`Canada`,australia:`Australia`,germany:`Germany`,france:`France`}[t.dataset.countryExplore],r=document.querySelector(`#edu-study-nav`);if(!r||!n){console.error(`Navbar or country was not found`);return}r.scrollIntoView({behavior:`smooth`,block:`start`});let i=r.querySelector(`[data-mega-menu="countries"]`),a=r.querySelector(`[data-mega-trigger="countries"]`);if(i&&a){i.classList.add(`is-open`),a.classList.add(`is-open`),a.setAttribute(`aria-expanded`,`true`),a.closest(`.edu-study-nav-item`)?.classList.add(`is-open`),i.querySelectorAll(`.edu-country-item`).forEach(e=>{e.classList.toggle(`active`,e.dataset.country===n)}),i.querySelectorAll(`.edu-country-panel`).forEach(e=>{e.classList.toggle(`active`,e.dataset.countryPanel===n)});return}let o=r.querySelector(`[data-country-menu]`),s=r.querySelector(`[data-countries-trigger]`);o&&s&&(o.hidden=!1,s.setAttribute(`aria-expanded`,`true`),o.querySelectorAll(`[data-nav-country]`).forEach(e=>{e.classList.toggle(`active`,e.dataset.navCountry===t.dataset.countryExplore)}),o.querySelectorAll(`[data-nav-country-panel]`).forEach(e=>{e.hidden=e.dataset.navCountryPanel!==t.dataset.countryExplore}))})),`
        <section
            class="study-abroad-country-comparison"
            id="study-abroad-country-comparison"
        >
            <div class="study-abroad-country-comparison-container">

                <header class="study-abroad-country-comparison-header">
                    <div class="study-abroad-section-eyebrow">
                        COMPARE DESTINATIONS
                    </div>

                    <h2>
                        Compare Study Abroad <span>Destinations</span>
                    </h2>

                    <p>
                        Compare popular study abroad destinations for Indian students. Review university options, common course areas and indicative tuition, then check current admission requirements, fees and visa guidance with each university and official authority.
                    </p>
                </header>

                <div
                    class="study-abroad-country-selector"
                    role="tablist"
                >
                    ${z.map((e,t)=>`
                        <button
                            type="button"
                            class="country-selector-button ${t===0?`active`:``}"
                            data-country-select="${e.id}"
                            aria-selected="${t===0}"
                            role="tab"
                        >
                            ${e.flag}
                            ${e.id===`uk`?`UK`:e.name}
                        </button>
                    `).join(``)}
                </div>

                <div
                    class="study-abroad-country-comparison-grid"
                    data-country-comparison-grid
                >
                    ${z.map(e=>`
                        <article
                            class="study-abroad-country-comparison-card"
                            data-country-comparison-card
                            data-country="${e.id}"
                        >
                            <div class="country-comparison-card-header">
                                <div class="country-comparison-country">
                                    <span class="country-comparison-flag">
                                        ${e.flag}
                                    </span>

                                    <div>
                                        <span>STUDY DESTINATION</span>
                                        <h3>${e.name}</h3>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    class="country-comparison-save"
                                    aria-label="Save ${e.name}"
                                    aria-pressed="false"
                                >
                                    ♡
                                </button>
                            </div>

                            <div class="country-comparison-details">
                                <div class="country-comparison-detail">
                                    <span>🎓</span>
                                    <div>
                                        <span>Universities</span>
                                        <strong>${e.universities}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>💰</span>
                                    <div>
                                        <span>Tuition</span>
                                        <strong>${e.tuition}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>📚</span>
                                    <div>
                                        <span>Popular For</span>
                                        <strong>${e.popularFor}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>⏱</span>
                                    <div>
                                        <span>Typical Duration</span>
                                        <strong>${e.duration}</strong>
                                    </div>
                                </div>

                                <div class="country-comparison-detail">
                                    <span>💼</span>
                                    <div>
                                        <span>Work Opportunity</span>
                                        <strong>${e.workOpportunity}</strong>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#edu-study-nav"
                                class="country-comparison-explore-button"
                                data-country-explore="${e.id}"
                            >
                                Explore ${e.name}
                                <span aria-hidden="true">→</span>
                            </a>
                            ${e.id===`germany`?`
                                <div class="country-comparison-germany-note">
                                    <strong>Study in Germany from India</strong>
                                    <p>Check whether your qualification is recognised, confirm APS requirements, and compare course language and current university fees before applying.</p>
                                    <a href="https://www.daad.de/en/studying-in-germany/requirements/overview/" target="_blank" rel="noopener noreferrer">DAAD Germany admission and language requirements</a>
                                    <a href="https://india.diplo.de/in-en/service/2756350-2756350" target="_blank" rel="noopener noreferrer">German Missions in India: study visa and APS</a>
                                    <a href="https://www.daad.de/en/studying-in-germany/living-in-germany/finances/" target="_blank" rel="noopener noreferrer">DAAD tuition and cost guidance</a>
                                </div>
                            `:``}
                        </article>
                    `).join(``)}
                </div>

                <footer class="study-abroad-country-comparison-footer">
                    <a
                        href="#edu-study-nav"
                        class="country-comparison-button"
                        data-open-destinations
                    >
                        Explore Destinations →
                    </a>
                </footer>

            </div>
        </section>
    `}function Te(){return`

        <!-- =====================================================
             STUDY ABROAD INTAKES
        ====================================================== -->

        <section
            class="study-abroad-intakes"
            id="study-abroad-intakes"
        >


            <div class="study-abroad-intakes-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-intakes-header">


                    <div class="study-abroad-section-eyebrow">
                        PLAN YOUR APPLICATION
                    </div>


                    <h2>

                        Study Abroad Intakes
                        <span> & Application Deadlines</span>

                    </h2>


                    <p>

                        Intake availability and deadlines vary by university, course and destination. Compare common start periods, then check each program’s official application calendar so you can plan tests, documents and funding.

                    </p>


                </div>


                <!-- =================================================
                     INTAKE TIMELINE
                ================================================== -->

                <div class="study-abroad-intakes-timeline">


                    ${[{name:`Fall Intake`,months:`September – November`,icon:`🍂`,status:`Most Popular`,description:`The main intake for international students with the widest range of universities, courses and scholarship opportunities.`,countries:`USA • Canada • UK • Australia • Europe`,application:`Applications usually open several months before the intake.`},{name:`Spring Intake`,months:`January – February`,icon:`🌱`,status:`Popular`,description:`A useful alternative for students who miss the main fall intake and want to begin their studies early in the year.`,countries:`USA • Canada • UK • Australia`,application:`Application timelines vary by university and course.`},{name:`Summer Intake`,months:`May – July`,icon:`☀️`,status:`Limited Programs`,description:`A smaller intake with selected universities and programs available depending on the destination.`,countries:`USA • UK • Australia • Selected Destinations`,application:`Available programs and deadlines depend on the university.`}].map((e,t)=>`

                        <article
                            class="study-abroad-intake-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="intake-card-header">


                                <div
                                    class="intake-card-icon"
                                    aria-hidden="true"
                                >
                                    ${e.icon}
                                </div>


                                <span class="intake-card-status">
                                    ${e.status}
                                </span>


                            </div>


                            <!-- =================================================
                                 CARD CONTENT
                            ================================================== -->

                            <div class="intake-card-content">


                                <span class="intake-card-number">
                                    0${t+1}
                                </span>


                                <h3>
                                    ${e.name}
                                </h3>


                                <div class="intake-card-months">

                                    <span
                                        class="intake-months-icon"
                                        aria-hidden="true"
                                    >
                                        📅
                                    </span>

                                    <strong>
                                        ${e.months}
                                    </strong>

                                </div>


                                <p>
                                    ${e.description}
                                </p>


                                <!-- =================================================
                                     INTAKE DETAILS
                                ================================================== -->

                                <div class="intake-card-details">


                                    <div class="intake-card-detail">


                                        <span
                                            class="intake-detail-icon"
                                            aria-hidden="true"
                                        >
                                            🌎
                                        </span>


                                        <div>

                                            <span>
                                                Popular Destinations
                                            </span>

                                            <strong>
                                                ${e.countries}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="intake-card-detail">


                                        <span
                                            class="intake-detail-icon"
                                            aria-hidden="true"
                                        >
                                            📝
                                        </span>


                                        <div>

                                            <span>
                                                Application
                                            </span>

                                            <strong>
                                                ${e.application}
                                            </strong>

                                        </div>


                                    </div>


                                </div>


                                <!-- =================================================
                                     CARD ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="intake-explore-button"
                                >

                                    View Intake Details

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join(``)}


                </div>


                <!-- =================================================
                     INTAKE PLANNING CTA
                ================================================== -->

                <div class="study-abroad-intakes-cta">


                    <div class="study-abroad-intakes-cta-content">


                        <span
                            class="study-abroad-intakes-cta-icon"
                            aria-hidden="true"
                        >
                            📅
                        </span>


                        <div>

                            <strong>
                                Planning your study abroad application?
                            </strong>

                            <span>
                                Check university deadlines and prepare
                                your application ahead of time.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-intakes-cta-button"
                    >

                        Check Deadlines

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `}function Ee(){return`

        <!-- =====================================================
             STUDY ABROAD SCHOLARSHIPS
        ====================================================== -->

        <section
            class="study-abroad-scholarships"
            id="abroad-scholarships"
        >


            <div class="study-abroad-scholarships-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-scholarships-header">


                    <div class="study-abroad-section-eyebrow">
                        FUND YOUR EDUCATION
                    </div>


                    <h2>

                        Study Abroad Scholarships
                        <span> for Indian Students</span>

                    </h2>


                    <p>

                        Search for scholarships to study abroad by destination, university, course and study level. Eligibility, funding and deadlines vary by award, so confirm current terms on the official scholarship or university website before applying.

                    </p>


                </div>


                <!-- =================================================
                     SCHOLARSHIP FILTERS
                ================================================== -->

                <div class="study-abroad-scholarship-filters">


                    <button
                        type="button"
                        class="scholarship-filter active"
                    >
                        All Scholarships
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        USA
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        UK
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Canada
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Australia
                    </button>


                    <button
                        type="button"
                        class="scholarship-filter"
                    >
                        Europe
                    </button>


                </div>


                <!-- =================================================
                     SCHOLARSHIP GRID
                ================================================== -->

                <div class="study-abroad-scholarship-grid">


                    ${[{name:`Fulbright Scholarship`,country:`USA`,flag:`🇺🇸`,level:`Masters • PhD`,coverage:`Tuition • Living Expenses • Travel`,type:`Fully Funded`,description:`Scholarship opportunities for international students pursuing higher education in the United States.`},{name:`Chevening Scholarship`,country:`United Kingdom`,flag:`🇬🇧`,level:`Masters`,coverage:`Tuition • Living Expenses • Travel`,type:`Fully Funded`,description:`UK government scholarship programme for eligible international students pursuing a master's degree.`},{name:`Erasmus Mundus`,country:`Europe`,flag:`🇪🇺`,level:`Masters`,coverage:`Tuition • Travel • Living Expenses`,type:`Fully Funded`,description:`International scholarship opportunities offered through selected joint master's programmes across Europe.`},{name:`DAAD Scholarships`,country:`Germany`,flag:`🇩🇪`,level:`Masters • PhD`,coverage:`Tuition Support • Stipend • Travel`,type:`Funding Support`,description:`Scholarship and funding opportunities for international students studying at German universities.`},{name:`Australia Awards`,country:`Australia`,flag:`🇦🇺`,level:`Undergraduate • Masters`,coverage:`Tuition • Travel • Living Expenses`,type:`Fully Funded`,description:`Australian government scholarship opportunities for eligible students from participating countries.`},{name:`Vanier Canada Graduate Scholarships`,country:`Canada`,flag:`🇨🇦`,level:`Doctoral`,coverage:`Annual Financial Support`,type:`Graduate Scholarship`,description:`Canadian doctoral scholarship programme supporting eligible international and domestic researchers.`}].map(e=>`

                        <article
                            class="study-abroad-scholarship-card"
                        >


                            <!-- =================================================
                                 CARD TOP
                            ================================================== -->

                            <div class="scholarship-card-top">


                                <div class="scholarship-country">

                                    <span>
                                        ${e.flag}
                                    </span>

                                    ${e.country}

                                </div>


                                <button
                                    type="button"
                                    class="scholarship-favourite"
                                    aria-label="Save ${e.name}"
                                >

                                    ♡

                                </button>


                            </div>


                            <!-- =================================================
                                 SCHOLARSHIP ICON
                            ================================================== -->

                            <div class="scholarship-card-icon">
                                🎓
                            </div>


                            <!-- =================================================
                                 SCHOLARSHIP CONTENT
                            ================================================== -->

                            <div class="scholarship-card-content">


                                <span class="scholarship-card-label">
                                    ${e.type}
                                </span>


                                <h3>
                                    ${e.name}
                                </h3>


                                <p>
                                    ${e.description}
                                </p>


                                <!-- =================================================
                                     SCHOLARSHIP DETAILS
                                ================================================== -->

                                <div class="scholarship-card-details">


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            📚
                                        </span>


                                        <div>

                                            <span>
                                                Study Level
                                            </span>

                                            <strong>
                                                ${e.level}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            💰
                                        </span>


                                        <div>

                                            <span>
                                                Coverage
                                            </span>

                                            <strong>
                                                ${e.coverage}
                                            </strong>

                                        </div>


                                    </div>


                                </div>


                                <!-- =================================================
                                     SCHOLARSHIP ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="scholarship-explore-button"
                                >

                                    View Scholarship

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `).join(``)}


                </div>


                <!-- =================================================
                     SCHOLARSHIP FOOTER
                ================================================== -->

                <div class="study-abroad-scholarships-footer">


                    <div class="study-abroad-scholarships-footer-content">


                        <span
                            class="study-abroad-scholarships-footer-icon"
                            aria-hidden="true"
                        >
                            💡
                        </span>


                        <div>

                            <strong>
                                Looking for the right scholarship?
                            </strong>

                            <span>
                                Explore scholarships based on your
                                destination, study level and course.
                            </span>

                        </div>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-view-scholarships-button"
                    >

                        View All Scholarships

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `}function B(e){let t=e===`United Kingdom`?`UK`:e,n=document.querySelector(`#edu-study-nav`),r=n?.querySelector(`[data-mega-menu="countries"]`),i=n?.querySelector(`[data-mega-trigger="countries"]`);if(!n||!r||!i){document.querySelector(`#study-abroad-country-comparison`)?.scrollIntoView({behavior:`smooth`,block:`start`});return}n.scrollIntoView({behavior:`smooth`,block:`start`}),r.classList.add(`is-open`),i.classList.add(`is-open`),i.setAttribute(`aria-expanded`,`true`),i.closest(`.edu-study-nav-item`)?.classList.add(`is-open`),r.querySelectorAll(`.edu-country-item`).forEach(e=>{e.classList.toggle(`active`,e.dataset.country===t)}),r.querySelectorAll(`.edu-country-panel`).forEach(e=>{e.classList.toggle(`active`,e.dataset.countryPanel===t)})}window.openStudyAbroadCountry=B,window.__studyAbroadCostExploreHandler||(window.__studyAbroadCostExploreHandler=!0,document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-cost-country]`);t&&(e.preventDefault(),e.stopPropagation(),B(t.dataset.costCountry))}));function De(){return`

        <!-- =====================================================
             STUDY ABROAD COST
        ====================================================== -->

        <section
            class="study-abroad-cost"
            id="study-abroad-cost"
        >


            <div class="study-abroad-cost-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-cost-header">


                    <div class="study-abroad-section-eyebrow">
                        PLAN YOUR BUDGET
                    </div>


                    <h2>

                        Study Abroad Costs
                        <span> & Living Expenses</span>

                    </h2>


                    <p>

                        Estimate the cost of studying abroad from India by comparing tuition, accommodation and living expenses across destinations. Actual costs vary by university, course, city and study duration; confirm current fees with the university and official sources before applying.

                    </p>


                </div>


                <!-- =================================================
                     COST FILTERS
                ================================================== -->

                <div class="study-abroad-cost-filters">


                    <button
                        type="button"
                        class="cost-filter active"
                    >
                        All Destinations
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Affordable
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Popular
                    </button>


                    <button
                        type="button"
                        class="cost-filter"
                    >
                        Low Tuition
                    </button>


                </div>


                <!-- =================================================
                     COST GRID
                ================================================== -->

                <div class="study-abroad-cost-grid">


                    ${[{country:`USA`,flag:`🇺🇸`,tuition:`₹18L – ₹45L / year`,living:`₹8L – ₹15L / year`,accommodation:`₹4L – ₹9L / year`,popularFor:`STEM • Business • Technology`},{country:`United Kingdom`,flag:`🇬🇧`,tuition:`₹15L – ₹35L / year`,living:`₹8L – ₹14L / year`,accommodation:`₹5L – ₹10L / year`,popularFor:`Business • Law • Medicine`},{country:`Canada`,flag:`🇨🇦`,tuition:`₹12L – ₹30L / year`,living:`₹7L – ₹12L / year`,accommodation:`₹4L – ₹8L / year`,popularFor:`IT • Business • Engineering`},{country:`Australia`,flag:`🇦🇺`,tuition:`₹14L – ₹32L / year`,living:`₹8L – ₹14L / year`,accommodation:`₹5L – ₹10L / year`,popularFor:`Business • IT • Healthcare`},{country:`Germany`,flag:`🇩🇪`,tuition:`Low / No tuition at many public universities`,living:`₹7L – ₹11L / year`,accommodation:`₹3L – ₹7L / year`,popularFor:`Engineering • Technology`},{country:`France`,flag:`🇫🇷`,tuition:`₹4L – ₹15L / year`,living:`₹6L – ₹10L / year`,accommodation:`₹3L – ₹7L / year`,popularFor:`Business • Arts • Fashion`}].map(e=>`

                        <article
                            class="study-abroad-cost-card"
                        >


                            <!-- =================================================
                                 CARD HEADER
                            ================================================== -->

                            <div class="cost-card-header">


                                <div class="cost-card-country">


                                    <span
                                        class="cost-card-flag"
                                        aria-hidden="true"
                                    >
                                        ${e.flag}
                                    </span>


                                    <div>

                                        <span>
                                            STUDY DESTINATION
                                        </span>

                                        <h3>
                                            ${e.country}
                                        </h3>

                                    </div>


                                </div>


                                <button
                                    type="button"
                                    class="cost-card-save"
                                    aria-label="Save ${e.country}"
                                >
                                    ♡
                                </button>


                            </div>


                            <!-- =================================================
                                 COST DETAILS
                            ================================================== -->

                            <div class="cost-card-details">


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        🎓
                                    </span>


                                    <div>

                                        <span>
                                            Tuition
                                        </span>

                                        <strong>
                                            ${e.tuition}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        🏠
                                    </span>


                                    <div>

                                        <span>
                                            Accommodation
                                        </span>

                                        <strong>
                                            ${e.accommodation}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        💳
                                    </span>


                                    <div>

                                        <span>
                                            Living Expenses
                                        </span>

                                        <strong>
                                            ${e.living}
                                        </strong>

                                    </div>


                                </div>


                                <div class="cost-card-detail">


                                    <span
                                        class="cost-detail-icon"
                                        aria-hidden="true"
                                    >
                                        📚
                                    </span>


                                    <div>

                                        <span>
                                            Popular For
                                        </span>

                                        <strong>
                                            ${e.popularFor}
                                        </strong>

                                    </div>


                                </div>


                            </div>


                            <!-- =================================================
                                 COST ACTION
                            ================================================== -->

                           <button
                               type="button"
                               class="cost-explore-button"
                               data-cost-country="${e.country===`United Kingdom`?`UK`:e.country}"
                               onclick="window.openStudyAbroadCountry('${e.country===`United Kingdom`?`UK`:e.country}')"
                           >
                               Explore ${e.country}
                               <span>→</span>
                           </button>


                        </article>

                    `).join(``)}


                </div>


                <!-- =================================================
                     COST NOTE
                ================================================== -->

                <div class="study-abroad-cost-note">


                    <span
                        class="study-abroad-cost-note-icon"
                        aria-hidden="true"
                    >
                        💡
                    </span>


                    <div>

                        <strong>
                            Plan your complete study abroad budget
                        </strong>

                        <p>
                            These figures are indicative planning estimates, not a quote. Actual costs vary by university, course, city, exchange rates, lifestyle and study duration. Confirm current fees directly with each university.
                        </p>

                    </div>


                </div>


                <!-- =================================================
                     COST CTA
                ================================================== -->

                <div class="study-abroad-cost-footer">


                    <div class="study-abroad-cost-footer-content">


                        <strong>
                            Want to estimate your total expenses?
                        </strong>


                        <span>
                            Compare destinations and plan your
                            study abroad budget.
                        </span>


                    </div>


                    <button
                        type="button"
                        class="study-abroad-cost-button"
                    >

                        Calculate Your Cost

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>


        </section>

    `}function Oe(){return`

        <!-- =====================================================
             STUDENT REVIEWS SECTION
        ====================================================== -->

        <section
            class="abroad-student-reviews"
            id="student-reviews"
        >

            <div class="abroad-student-reviews-container">

                <!-- =====================================================
                     SECTION HEADER
                ====================================================== -->

                <div class="abroad-student-reviews-header">

                    <span class="abroad-student-reviews-eyebrow">
                        STUDENT EXPERIENCES
                    </span>

                    <h2>
                        Student Experiences with Study Abroad Planning
                    </h2>

                    <p>
                        Read about students’ experiences comparing universities, courses and application steps across study destinations.
                    </p>

                </div>


                <!-- =====================================================
                     REVIEWS GRID
                ====================================================== -->

                <div class="abroad-student-reviews-grid">

                    ${[{name:`Aarav Sharma`,country:`United Kingdom`,university:`University of Manchester`,course:`MSc Computer Science`,rating:`5.0`,review:`The guidance throughout my study abroad journey was clear and helpful. I received support with university selection, applications and the overall process.`},{name:`Ananya Verma`,country:`Canada`,university:`University of Toronto`,course:`Master of Business Administration`,rating:`4.9`,review:`The information about universities, courses and admission requirements made it easier to understand my options and plan my application.`},{name:`Rohan Mehta`,country:`Australia`,university:`University of Melbourne`,course:`Master of Information Technology`,rating:`4.8`,review:`I was able to compare different study destinations and understand the application process better. The overall experience was smooth and well organised.`},{name:`Priya Singh`,country:`Germany`,university:`Technical University of Munich`,course:`MSc Data Science`,rating:`4.9`,review:`The guidance helped me understand course options, university requirements and the steps involved in applying to study in Germany.`}].map(e=>`

                        <article
                            class="abroad-student-review-card"
                        >

                            <!-- =================================================
                                 REVIEW TOP
                            ================================================== -->

                            <div class="abroad-student-review-top">

                                <div class="abroad-student-review-avatar">
                                    ${e.name.charAt(0)}
                                </div>

                                <div class="abroad-student-review-user">

                                    <h3>
                                        ${e.name}
                                    </h3>

                                    <span>
                                        ${e.country}
                                    </span>

                                </div>

                            </div>


                            <!-- =================================================
                                 RATING
                            ================================================== -->

                            <div class="abroad-student-review-rating">

                                <span class="abroad-student-review-stars">
                                    ★★★★★
                                </span>

                                <strong>
                                    ${e.rating}
                                </strong>

                            </div>


                            <!-- =================================================
                                 REVIEW CONTENT
                            ================================================== -->

                            <p class="abroad-student-review-text">
                                ${e.review}
                            </p>


                            <!-- =================================================
                                 STUDY DETAILS
                            ================================================== -->

                            <div class="abroad-student-review-details">

                                <div>
                                    <span>
                                        University
                                    </span>

                                    <strong>
                                        ${e.university}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Course
                                    </span>

                                    <strong>
                                        ${e.course}
                                    </strong>
                                </div>

                            </div>

                        </article>

                    `).join(``)}

                </div>


                <!-- =====================================================
                     FOOTER CTA
                ====================================================== -->

                <div class="abroad-student-reviews-footer">

                    <p>
                        Ready to explore your own study abroad journey?
                    </p>

                    <button
                        type="button"
                        class="abroad-student-reviews-button"
                    >
                        Explore Study Options
                    </button>

                </div>

            </div>

        </section>

    `}function ke(){let e=[{question:`When should I start planning to study abroad from India?`,answer:`It is generally useful to start planning well before your intended intake so you have time to research destinations and universities, prepare required tests and documents, review deadlines and organize your finances. The appropriate timeline varies by country, university and program.`},{question:`How do I choose the right country to study abroad?`,answer:`Consider the availability of your preferred course, universities, admission requirements, tuition fees, living costs, scholarships, application timelines and your personal priorities. Comparing these factors can help you create a more informed shortlist.`},{question:`How do I choose a university for studying abroad?`,answer:`Start by identifying programs that match your academic goals. Then compare the curriculum, admission requirements, tuition, location, available facilities, application deadlines and other factors that matter to you. Always verify current information directly with the university before applying.`},{question:`What are the common requirements for studying abroad?`,answer:`Requirements vary by destination, institution, program and applicant. Depending on your situation, you may need academic records, identification documents, language-test results, a statement of purpose, recommendation letters, financial documentation and other supporting documents.`},{question:`Do I need IELTS or TOEFL to study abroad?`,answer:`Some universities and programs require proof of English-language proficiency, while requirements and accepted tests can differ. Check the official requirements of each university and program you are considering.`},{question:`How much does it cost to study abroad from India?`,answer:`Costs vary by destination, city, university, course and study duration. Compare tuition and living expenses, then confirm current fees with the university and consult official sources before setting your budget.`},{question:`Can Indian students get scholarships to study abroad?`,answer:`Scholarship eligibility, funding and deadlines vary by university, course and provider. Check the official scholarship and university pages for current requirements and deadlines; awards are not guaranteed.`},{question:`What should Indian students check before applying to study in Germany?`,answer:`Check whether your academic qualification meets the chosen university’s entry requirements, confirm the programme’s language requirements and review the current APS guidance from the German Missions in India. Requirements depend on your qualifications and programme, so verify them with the university and official sources.`}];return`
        <section
            class="study-abroad-faq-section"
            id="study-abroad-faq"
            aria-labelledby="study-abroad-faq-title"
        >

            <div class="study-abroad-container">


                <!-- ==================================================
                     HEADER
                =================================================== -->

                <div class="study-abroad-faq-header">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            FREQUENTLY ASKED QUESTIONS
                        </span>

                        <h2 id="study-abroad-faq-title">
                            Study Abroad from India: Admissions, Costs & Scholarships
                        </h2>

                        <p>
                            Get answers to common questions about choosing a country, applying to universities abroad, scholarships for Indian students, tuition and living costs, language tests and student visa planning.
                        </p>

                    </div>


                    <a
                        href="#"
                        class="study-abroad-primary-button"
                        onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                    >
                        Talk to a counsellor
                        <span aria-hidden="true">→</span>
                    </a>

                </div>


                <!-- ==================================================
                     FAQ LAYOUT
                =================================================== -->

                <div class="study-abroad-faq-layout">


                    <!-- CATEGORY NAVIGATION -->

                    <aside
                        class="study-abroad-faq-sidebar"
                        aria-label="FAQ categories"
                    >

                        <span>
                            EXPLORE TOPICS
                        </span>

                        <button
                            type="button"
                            class="study-abroad-faq-category active"
                            data-faq-category="all"
                        >
                            All questions
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="planning"
                        >
                            Planning
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="admission"
                        >
                            Admissions
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="finance"
                        >
                            Scholarships & finance
                        </button>

                        <button
                            type="button"
                            class="study-abroad-faq-category"
                            data-faq-category="visa"
                        >
                            Visa & travel
                        </button>

                    </aside>


                    <!-- QUESTIONS -->

                    <div
                        class="study-abroad-faq-list"
                        id="study-abroad-faq-list"
                    >

                        ${e.map((e,t)=>`
                                    <details
                                        class="study-abroad-faq-item"
                                        data-faq-index="${t}"
                                    >

                                        <summary>

                                            <span>
                                                ${e.question}
                                            </span>

                                            <span
                                                class="study-abroad-faq-icon"
                                                aria-hidden="true"
                                            >
                                                +
                                            </span>

                                        </summary>

                                        <div class="study-abroad-faq-answer">

                                            <p>
                                                ${e.answer}
                                            </p>

                                        </div>

                                    </details>
                                `).join(``)}

                    </div>

                </div>


                <!-- ==================================================
                     FAQ CTA
                =================================================== -->

                <div class="study-abroad-faq-cta">

                    <div>

                        <span class="study-abroad-section-eyebrow">
                            STILL HAVE QUESTIONS?
                        </span>

                        <h3>
                            Get help with your Study Abroad plan.
                        </h3>

                        <p>
                            Tell us about your course, destination and
                            academic background to discuss your next steps.
                        </p>

                    </div>


                    <div class="study-abroad-faq-actions">

                      <a
                          href="#"
                          class="study-abroad-primary-button"
                          onclick="document.querySelector('.study-abroad-lead-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return false;"
                      > Get free counselling
                            <span aria-hidden="true">→</span>
                        </a>

                        <a
                            href="#study-abroad-destination-explorer"
                            class="study-abroad-secondary-button"
                        >
                            Explore destinations
                        </a>

                    </div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-faq-seo">

                    <h2>
                        Study abroad from India: admissions, fees and scholarships
                    </h2>

                    <p>
                        Find answers about studying abroad from India,
                        including choosing a country or university, course
                        eligibility, application deadlines, scholarships,
                        education costs, language tests and student visas.
                    </p>



                    <p>
                        Before submitting an application, verify current
                        academic, financial, admission and visa requirements
                        using the official sources provided by the relevant
                        university, test provider or government authority.
                    </p>

                </div>

            </div>


            <!-- ==================================================
                 FAQ STRUCTURED DATA
                 ==================================================

                 This JSON-LD is generated from the visible FAQ
                 content above.

                 Search engines determine independently whether
                 FAQ rich results are eligible to appear.
            =================================================== -->

            <script type="application/ld+json">
                ${JSON.stringify({"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:e.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))})}
            <\/script>

        </section>
    `}function Ae(){return`

        <!-- =====================================================
             STUDY ABROAD FINAL CTA
        ====================================================== -->

        <section
            class="study-abroad-final-cta"
            id="study-abroad-cta"
        >


            <div class="study-abroad-final-cta-container">


                <!-- =================================================
                     CTA CONTENT
                ================================================== -->

                <div class="study-abroad-final-cta-content">


                    <div class="study-abroad-section-eyebrow">
                        START YOUR JOURNEY
                    </div>


                    <h2>

                        Plan to Study Abroad
                        <span>from India</span>

                    </h2>


                    <p>

                        Compare study destinations, universities, courses and scholarships. Review admission requirements and estimated costs, then choose the next step for your overseas education plans.

                    </p>


                    <!-- =================================================
                         CTA ACTIONS
                    ================================================== -->

                    <div class="study-abroad-final-cta-actions">


                        <button
                            type="button"
                            class="study-abroad-final-primary-button"
                        >

                            Explore Universities

                            <span>
                                →
                            </span>

                        </button>


                        <button
                            type="button"
                            class="study-abroad-final-secondary-button"
                        >

                            Find Scholarships

                        </button>


                    </div>


                    <!-- =================================================
                         CTA TRUST POINTS
                    ================================================== -->

                    <div class="study-abroad-final-cta-points">


                        <div class="study-abroad-final-cta-point">


                            <span aria-hidden="true">
                                ✓
                            </span>


                            <strong>
                                Global Destinations
                            </strong>


                        </div>


                        <div class="study-abroad-final-cta-point">


                            <span aria-hidden="true">
                                ✓
                            </span>


                            <strong>
                                Universities & Courses
                            </strong>


                        </div>


                        <div class="study-abroad-final-cta-point">


                            <span aria-hidden="true">
                                ✓
                            </span>


                            <strong>
                                Scholarship Opportunities
                            </strong>


                        </div>


                    </div>


                </div>


                <!-- =================================================
                     CTA VISUAL CARD
                ================================================== -->

                <div class="study-abroad-final-cta-visual">


                    <div class="study-abroad-cta-glow"></div>


                    <div class="study-abroad-final-cta-card">


                        <div
                            class="study-abroad-final-cta-card-icon"
                            aria-hidden="true"
                        >
                            🌎
                        </div>


                        <span class="study-abroad-final-cta-card-label">
                            YOUR NEXT DESTINATION
                        </span>


                        <strong>
                            Dream.
                            Discover.
                            Study.
                        </strong>


                        <p>
                            Turn your international education goals
                            into your next big opportunity.
                        </p>


                        <button
                            type="button"
                            class="study-abroad-cta-card-button"
                        >

                            Start Exploring

                            <span>
                                →
                            </span>

                        </button>


                    </div>


                </div>


            </div>


        </section>

    `}function je(){return`

        <div
            id="study-abroad-content"
            class="study-abroad-page-content"
        >

            <!-- =================================================
                 01. HERO
            ================================================== -->

            ${Se()}

            <section
                class="study-abroad-featured-institutions"
                id="study-abroad-institutions"
                aria-labelledby="study-abroad-institutions-title"
                hidden
            >
                <div class="study-abroad-featured-institutions-container">
                    <div class="study-abroad-featured-institutions-heading">
                        <p>EXPLORE INSTITUTIONS</p>
                        <h2 id="study-abroad-institutions-title">
                            Colleges &amp; Universities Abroad
                        </h2>
                    </div>
                    <div
                        class="institution-search-card-grid"
                        data-study-abroad-institutions
                    ></div>
                </div>
            </section>


            <!-- =================================================
                 02. LEAD / COUNSELLING FORM
            ================================================== -->

            ${Ce()}


            <!-- =================================================
                 03. COUNTRY COMPARISON
            ================================================== -->

            ${we()}


            <!-- =================================================
                 04. INTAKES & DEADLINES
            ================================================== -->

            ${Te()}


            <!-- =================================================
                 05. SCHOLARSHIPS
            ================================================== -->

            ${Ee()}


            <!-- =================================================
                 06. EDUCATION COST
            ================================================== -->

            ${De()}


            <!-- =================================================
                 07. STUDENT REVIEWS
            ================================================== -->

            ${Oe()}


            <!-- =================================================
                 08. FAQ
            ================================================== -->

            ${ke()}


            <!-- =================================================
                 09. FINAL CTA
            ================================================== -->

            ${Ae()}

        </div>

    `}function Me(){return`

        ${t()}

        ${xe()}


        <main
            id="study-abroad-page"
            class="study-abroad-page"
            aria-label="Study Abroad"
        >

            ${je()}

        </main>


        ${N()}

    `}function Ne(){return`
        <div
            id="auth-modal"
            class="auth-modal"
            aria-hidden="true"
        >

            <div
                class="auth-modal-backdrop"
                data-auth-close="true"
            ></div>


            <div
                class="auth-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
            >

                <!-- =====================================================
                     LEFT SIDE
                ====================================================== -->

                <div class="auth-modal-showcase">

                    <div class="auth-modal-showcase-circle"></div>

                    <div class="auth-modal-showcase-content">

                        <div class="auth-modal-brand">
                            ✦ EDUCONNECT
                        </div>

                        <h2>
                            Your<br>
                            Education<br>
                            <span>Journey</span><br>
                            Starts Here
                        </h2>

                        <p>
                            Login or create your EduConnect account
                            and continue your education journey.
                        </p>

                    </div>

                </div>


                <!-- =====================================================
                     RIGHT SIDE
                ====================================================== -->

                <div class="auth-modal-content">

                    <!-- CLOSE -->

                    <button
                        type="button"
                        id="auth-modal-close"
                        class="auth-modal-close"
                        aria-label="Close"
                    >
                        ×
                    </button>


                    <!-- =================================================
                         LOGIN
                    ================================================== -->

                    <div
                        id="auth-login-view"
                        class="auth-view"
                    >

                        <div class="auth-modal-eyebrow">
                            WELCOME BACK
                        </div>

                        <h2 id="auth-modal-title">
                            Login
                        </h2>

                        <p id="auth-modal-subtitle">
                            Login to continue to EduConnect.
                        </p>


                        <div
                            id="auth-modal-message"
                            class="auth-modal-message"
                        ></div>


                        <form
                            id="auth-login-form"
                            class="auth-modal-form"
                        >

                            <div class="auth-form-group">

                                <label for="auth-login-email">
                                    Email Address
                                </label>

                                <input
                                    id="auth-login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    autocomplete="email"
                                    required
                                >

                            </div>


                            <div class="auth-form-group">

                                <label for="auth-login-password">
                                    Password
                                </label>

                                <input
                                    id="auth-login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autocomplete="current-password"
                                    required
                                >

                            </div>


                            <div class="auth-forgot-row">

                                <button
                                    type="button"
                                    id="auth-forgot-password"
                                    class="auth-forgot-button"
                                >
                                    Forgot Password?
                                </button>

                            </div>


                            <button
                                type="submit"
                                class="auth-modal-submit"
                            >
                                Login
                            </button>

                        </form>


                        <div class="auth-switch">

                            <span>
                                Don't have an account?
                            </span>

                            <button
                                type="button"
                                id="auth-switch-button"
                                class="auth-switch-button"
                            >
                                Register
                            </button>

                        </div>

                    </div>


                    <!-- =================================================
                         REGISTER
                    ================================================== -->

                    <div
                        id="auth-register-view"
                        class="auth-view"
                        hidden
                    >

                        <div class="auth-modal-eyebrow">
                            JOIN EDUCONNECT
                        </div>

                        <h2>
                            Create Account
                        </h2>

                        <p>
                            Join EduConnect and start your education journey.
                        </p>


                        <form
                            id="auth-register-form"
                            class="auth-modal-form"
                        >

                            <div class="auth-form-group">

                                <label for="auth-register-name">
                                    Full Name
                                </label>

                                <input
                                    id="auth-register-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    autocomplete="name"
                                    required
                                >

                            </div>


                            <div class="auth-form-group">

                                <label for="auth-register-email">
                                    Email Address
                                </label>

                                <input
                                    id="auth-register-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    autocomplete="email"
                                    required
                                >

                            </div>


                            <div class="auth-form-group">

                                <label for="auth-register-role">
                                    Register As
                                </label>

                                <select
                                    id="auth-register-role"
                                    required
                                >
                                    <option value="">
                                        Select Role
                                    </option>

                                    <option value="STUDENT">
                                        Student
                                    </option>

                                    <option value="PARENT">
                                        Parent
                                    </option>

                                </select>

                            </div>


                            <div class="auth-form-group">

                                <label for="auth-register-password">
                                    Password
                                </label>

                                <input
                                    id="auth-register-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autocomplete="new-password"
                                    required
                                >

                            </div>


                            <div class="auth-form-group">

                                <label for="auth-register-confirm">
                                    Confirm Password
                                </label>

                                <input
                                    id="auth-register-confirm"
                                    type="password"
                                    placeholder="Confirm your password"
                                    autocomplete="new-password"
                                    required
                                >

                            </div>


                            <button
                                type="submit"
                                class="auth-modal-submit"
                            >
                                Create Account
                            </button>

                        </form>


                        <div class="auth-switch">

                            <span>
                                Already have an account?
                            </span>

                            <button
                                type="button"
                                id="auth-register-login"
                                class="auth-switch-button"
                            >
                                Login
                            </button>

                        </div>

                    </div>


                    <!-- =================================================
                         FORGOT PASSWORD
                    ================================================== -->

                    <div
                        id="auth-forgot-view"
                        class="auth-view"
                        hidden
                    >

                        <div class="auth-modal-eyebrow">
                            RESET PASSWORD
                        </div>

                        <h2>
                            Forgot Password?
                        </h2>

                        <p>
                            Enter your registered email address and
                            we will send you a password reset link.
                        </p>


                        <div
                            id="auth-forgot-message"
                            class="auth-modal-message"
                        ></div>


                        <form
                            id="auth-forgot-form"
                            class="auth-modal-form"
                        >

                            <div class="auth-form-group">

                                <label for="auth-forgot-email">
                                    Email Address
                                </label>

                                <input
                                    id="auth-forgot-email"
                                    type="email"
                                    placeholder="Enter your registered email"
                                    autocomplete="email"
                                    required
                                >

                            </div>


                            <button
                                type="submit"
                                class="auth-modal-submit"
                            >
                                Send Reset Link
                            </button>

                        </form>


                        <div class="auth-switch">

                            <button
                                type="button"
                                id="auth-back-to-login"
                                class="auth-switch-button"
                            >
                                ← Back to Login
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `}function Pe(){let e=window.location.pathname.replace(/\/+$/,``)||`/`,t=``,n=200;switch(e){case`/`:case`/index.html`:t=P();break;case`/study-abroad`:t=Me();break;default:n=404,t=`
                <main
                    class="route-not-found"
                    aria-labelledby="route-not-found-title"
                >
                    <section class="route-not-found-content">

                        <p class="route-not-found-code">
                            404
                        </p>

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
            `;break}return document.documentElement.dataset.routeStatus=String(n),`
        ${t}
        ${Ne()}
    `}function Fe(){let e=document.querySelector(`#online-education .online-education-carousel`);if(!e)return;let t=e.querySelector(`.online-education-viewport`),n=e.querySelector(`.online-education-track`),r=e.querySelector(`.online-education-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(!i.length)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.dataset.carouselClone=`true`,n.appendChild(t)});let o=Array.from(n.querySelectorAll(`.institution-card`)),s=0,c=!1;function l(){if(o.length<2)return o[0].getBoundingClientRect().width;let e=o[0].getBoundingClientRect();return o[1].getBoundingClientRect().left-e.left}function u(){let e=t.getBoundingClientRect().width,r=o[0].getBoundingClientRect().width,i=window.getComputedStyle(n),a=parseFloat(i.columnGap||i.gap||`0`);return Math.max(1,Math.floor((e+a)/(r+a)))}function d(e=!0){let t=l();n.style.transition=e?`transform 0.45s cubic-bezier(.2,.8,.2,1)`:`none`,n.style.transform=`translate3d(
                -${s*t}px,
                0,
                0
            )`}r.addEventListener(`click`,()=>{c||(c=!0,s+=1,d(!0))}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&(u(),s>=a&&(s-=a,d(!1)),requestAnimationFrame(()=>{c=!1}))}),window.addEventListener(`resize`,()=>{d(!1)}),d(!1),r.disabled=!1}function V(){let e=document.querySelector(`#news .news-carousel`);if(!e)return;let t=e.querySelector(`.news-viewport`),n=e.querySelector(`.news-track`),r=e.querySelector(`.news-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(!i.length)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.dataset.carouselClone=`true`,n.appendChild(t)});let o=Array.from(n.querySelectorAll(`.institution-card`)),s=0,c=!1;function l(){if(o.length<2)return o[0].getBoundingClientRect().width;let e=o[0].getBoundingClientRect();return o[1].getBoundingClientRect().left-e.left}function u(e=!0){let t=l();n.style.transition=e?`transform 0.45s cubic-bezier(.2,.8,.2,1)`:`none`,n.style.transform=`translate3d(
                -${s*t}px,
                0,
                0
            )`}r.addEventListener(`click`,()=>{c||(c=!0,s+=1,u(!0))}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&(s>=a&&(s-=a,u(!1)),requestAnimationFrame(()=>{c=!1}))}),window.addEventListener(`resize`,()=>{u(!1)}),r.disabled=!1,u(!1)}function Ie(){let e=document.querySelector(`.study-abroad-carousel`);if(!e)return;let t=e.querySelector(`.study-abroad-viewport`),n=e.querySelector(`.study-abroad-track`),r=e.querySelector(`.study-abroad-next`);if(!t||!n||!r||n.dataset.carouselInitialized===`true`)return;function i(){if(n.dataset.carouselInitialized===`true`)return!0;let e=Array.from(n.querySelectorAll(`.institution-card`));if(!e.length)return!1;n.dataset.carouselInitialized=`true`;let t=e.length;e.forEach(e=>{let t=e.cloneNode(!0);t.dataset.carouselClone=`true`,n.appendChild(t)});let i=Array.from(n.querySelectorAll(`.institution-card`)),a=0,o=!1;function s(){if(i.length<2)return i[0].getBoundingClientRect().width;let e=i[0].getBoundingClientRect();return i[1].getBoundingClientRect().left-e.left}function c(e=!0){let t=s();n.style.transition=e?`transform 0.45s cubic-bezier(.2,.8,.2,1)`:`none`,n.style.transform=`translate3d(-${a*t}px,0,0)`}return i.length<=1&&(r.disabled=!0),r.addEventListener(`click`,()=>{o||i.length<=1||(o=!0,a+=1,c(!0))}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&(a>=t&&(a-=t,c(!1)),requestAnimationFrame(()=>{o=!1}))}),window.addEventListener(`resize`,()=>c(!1)),c(!1),!0}if(i())return;let a=new MutationObserver(()=>{i()&&a.disconnect()});a.observe(n,{childList:!0})}function Le(){let e=document.querySelector(`#scholarship .scholarship-carousel`);if(!e)return;let t=e.querySelector(`.scholarship-viewport`),n=e.querySelector(`.scholarship-track`),r=e.querySelector(`.scholarship-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(!i.length)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.dataset.carouselClone=`true`,n.appendChild(t)});let o=Array.from(n.querySelectorAll(`.institution-card`)),s=0,c=!1;function l(){if(o.length<2)return o[0].getBoundingClientRect().width;let e=o[0].getBoundingClientRect();return o[1].getBoundingClientRect().left-e.left}function u(e=!0){let t=l();n.style.transition=e?`transform 0.45s cubic-bezier(.2,.8,.2,1)`:`none`,n.style.transform=`translate3d(
                -${s*t}px,
                0,
                0
            )`}r.addEventListener(`click`,()=>{c||(c=!0,s+=1,u(!0))}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&(s>=a&&(s-=a,u(!1)),requestAnimationFrame(()=>{c=!1}))}),window.addEventListener(`resize`,()=>{u(!1)}),r.disabled=!1,u(!1)}function Re(){let e=document.querySelector(`#rankings .rankings-carousel`);if(!e)return;let t=e.querySelector(`.rankings-viewport`),n=e.querySelector(`.rankings-track`),r=e.querySelector(`.rankings-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(!i.length)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.dataset.carouselClone=`true`,n.appendChild(t)});let o=Array.from(n.querySelectorAll(`.institution-card`)),s=0,c=!1;function l(){if(o.length<2)return o[0].getBoundingClientRect().width;let e=o[0].getBoundingClientRect();return o[1].getBoundingClientRect().left-e.left}function u(e=!0){let t=l();n.style.transition=e?`transform 0.45s cubic-bezier(.2,.8,.2,1)`:`none`,n.style.transform=`translate3d(
                -${s*t}px,
                0,
                0
            )`}r.addEventListener(`click`,()=>{c||(c=!0,s+=1,u(!0))}),n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&(s>=a&&(s-=a,u(!1)),requestAnimationFrame(()=>{c=!1}))}),window.addEventListener(`resize`,()=>{u(!1)}),r.disabled=!1,u(!1)}function ze(){let e=document.querySelector(`#student-reviews`);if(!e)return;let t=e.querySelector(`.student-reviews-viewport`),n=e.querySelector(`.student-reviews-track`),r=e.querySelector(`.student-reviews-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.video-review-card`));if(i.length===0)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.setAttribute(`data-carousel-clone`,`true`),n.appendChild(t)});let o=0;function s(){let e=n.querySelectorAll(`.video-review-card`);if(e.length<2)return 0;let t=e[0],r=e[1],i=t.getBoundingClientRect();return r.getBoundingClientRect().left-i.left}function c(e=!0){let t=s();t&&(n.style.transition=e?`transform 0.45s ease`:`none`,n.style.transform=`translate3d(-${o*t}px, 0, 0)`)}function l(){o++,c(!0)}n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&o>=a&&(o-=a,c(!1))}),r.addEventListener(`click`,l),window.addEventListener(`resize`,()=>{c(!1)}),r.disabled=!1,c(!1)}function Be(){let e=document.querySelector(`#education-loan`);if(!e)return;let t=e.querySelector(`.education-loan-viewport`),n=e.querySelector(`.education-loan-track`),r=e.querySelector(`.education-loan-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(i.length===0)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.setAttribute(`data-carousel-clone`,`true`),n.appendChild(t)});let o=0;function s(){let e=n.querySelectorAll(`.institution-card`);if(e.length<2)return 0;let t=e[0],r=e[1],i=t.getBoundingClientRect();return r.getBoundingClientRect().left-i.left}function c(e=!0){let t=s();t&&(n.style.transition=e?`transform 0.45s ease`:`none`,n.style.transform=`translate3d(-${o*t}px, 0, 0)`)}function l(){o++,c(!0)}n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&o>=a&&(o-=a,c(!1))}),r.addEventListener(`click`,l),window.addEventListener(`resize`,()=>{c(!1)}),r.disabled=!1,c(!1)}function Ve(){let e=document.querySelector(`#top-lists`);if(!e)return;let t=e.querySelector(`.top-lists-viewport`),n=e.querySelector(`.top-lists-track`),r=e.querySelector(`.top-lists-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(i.length===0)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.setAttribute(`data-carousel-clone`,`true`),n.appendChild(t)});let o=0;function s(){let e=n.querySelectorAll(`.institution-card`);if(e.length<2)return 0;let t=e[0],r=e[1],i=t.getBoundingClientRect();return r.getBoundingClientRect().left-i.left}function c(e=!0){let t=s();t&&(n.style.transition=e?`transform 0.45s ease`:`none`,n.style.transform=`translate3d(-${o*t}px, 0, 0)`)}function l(){o++,c(!0)}n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&o>=a&&(o-=a,c(!1))}),r.addEventListener(`click`,l),window.addEventListener(`resize`,()=>{c(!1)}),r.disabled=!1,c(!1)}function He(){let e=document.querySelector(`#compare-college`);if(!e)return;let t=e.querySelector(`.compare-college-viewport`),n=e.querySelector(`.compare-college-track`),r=e.querySelector(`.compare-college-next`);if(!t||!n||!r)return;let i=Array.from(n.querySelectorAll(`.institution-card`));if(i.length===0)return;let a=i.length;i.forEach(e=>{let t=e.cloneNode(!0);t.setAttribute(`data-carousel-clone`,`true`),n.appendChild(t)});let o=0;function s(){let e=n.querySelectorAll(`.institution-card`);if(e.length<2)return 0;let t=e[0],r=e[1],i=t.getBoundingClientRect();return r.getBoundingClientRect().left-i.left}function c(e=!0){let t=s();t&&(n.style.transition=e?`transform 0.45s ease`:`none`,n.style.transform=`translate3d(-${o*t}px, 0, 0)`)}function l(){o++,c(!0)}n.addEventListener(`transitionend`,e=>{e.propertyName===`transform`&&o>=a&&(o-=a,c(!1))}),r.addEventListener(`click`,l),window.addEventListener(`resize`,()=>{c(!1)}),r.disabled=!1,c(!1)}var H=null,U=null;function Ue(){if(H=document.querySelector(`#auth-modal`),!H){console.warn(`Auth modal not found.`);return}We(),qe(),Ye(),Xe(),Ze(),Je(),Qe(),$()}function We(){document.querySelectorAll(`[data-open-login]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),U=null,W()})}),document.querySelectorAll(`[data-open-register]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),U=null,Ge()})}),document.querySelectorAll(`[data-auth-logout]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),et()})})}function W(){if(!H)return;q(`login`),Z(),G();let e=document.querySelector(`#auth-login-email`);setTimeout(()=>{e&&e.focus()},100)}function Ge(){if(!H)return;q(`register`),Z(),G();let e=document.querySelector(`#auth-register-name`);setTimeout(()=>{e&&e.focus()},100)}function Ke(){if(!H)return;q(`forgot`),Z();let e=document.querySelector(`#auth-forgot-email`);setTimeout(()=>{e&&e.focus()},100)}function G(){H.classList.add(`is-open`),H.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`auth-modal-open`)}function K(e=!1){if(H)if(H.classList.remove(`is-open`),H.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`auth-modal-open`),Z(),e&&U){let e=U;U=null,setTimeout(()=>{window.location.href=e},50)}else U=null}function qe(){let e=document.querySelector(`#auth-modal-close`);e&&e.addEventListener(`click`,()=>{K(!0)});let t=H.querySelector(`[data-auth-close='true']`);t&&t.addEventListener(`click`,()=>{K(!1)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&K(!1)})}function q(e){let t=document.querySelector(`#auth-login-view`),n=document.querySelector(`#auth-register-view`),r=document.querySelector(`#auth-forgot-view`);t&&(t.hidden=e!==`login`),n&&(n.hidden=e!==`register`),r&&(r.hidden=e!==`forgot`)}function Je(){let e=document.querySelector(`#auth-switch-button`),t=document.querySelector(`#auth-register-login`),n=document.querySelector(`#auth-forgot-password`),r=document.querySelector(`#auth-back-to-login`);e&&e.addEventListener(`click`,()=>{q(`register`),Z()}),t&&t.addEventListener(`click`,()=>{q(`login`),Z()}),n&&n.addEventListener(`click`,()=>{Ke()}),r&&r.addEventListener(`click`,()=>{W()})}function Ye(){let e=document.querySelector(`#auth-login-form`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#auth-login-email`),r=document.querySelector(`#auth-login-password`);if(!(!n||!r)){Z(),Q(e,!0);try{await c({email:n.value.trim(),password:r.value}),J(`Login successful.`,`success`),$();let e=U;U=null,setTimeout(()=>{K(),e&&(window.location.href=e)},700)}catch(e){J(e.message||`Login failed.`,`error`)}finally{Q(e,!1)}}})}function Xe(){let e=document.querySelector(`#auth-register-form`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#auth-register-name`).value.trim(),r=document.querySelector(`#auth-register-email`).value.trim(),i=document.querySelector(`#auth-register-role`).value,a=document.querySelector(`#auth-register-password`).value;if(a!==document.querySelector(`#auth-register-confirm`).value){J(`Passwords do not match.`,`error`);return}if(a.length<8){J(`Password must contain at least 8 characters.`,`error`);return}Z(),Q(e,!0);try{await l({fullName:n,email:r,password:a,role:i}),J(`Account created successfully.`,`success`),$();let e=U;U=null,setTimeout(()=>{K(),e&&(window.location.href=e)},800)}catch(e){J(e.message||`Registration failed.`,`error`)}finally{Q(e,!1)}})}function Ze(){let e=document.querySelector(`#auth-forgot-form`);e&&e.addEventListener(`submit`,async t=>{t.preventDefault();let n=document.querySelector(`#auth-forgot-email`);if(!n)return;let r=n.value.trim();if(!r){Y(`Please enter your email address.`,`error`);return}X(),Q(e,!0);try{await u(r),Y(`If an account exists with this email, a password reset link has been sent.`,`success`)}catch(e){Y(e.message||`Unable to process your request.`,`error`)}finally{Q(e,!1)}})}function Qe(){document.querySelectorAll(`[data-auth-required='true']`).forEach(e=>{e.addEventListener(`click`,t=>{d()||(U=e.getAttribute(`href`),t.preventDefault(),t.stopPropagation(),W())})})}function J(e,t){let n=document.querySelector(`#auth-modal-message`);n&&(n.textContent=e,n.className=`auth-modal-message ${t}`)}function $e(){let e=document.querySelector(`#auth-modal-message`);e&&(e.textContent=``,e.className=`auth-modal-message`)}function Y(e,t){let n=document.querySelector(`#auth-forgot-message`);n&&(n.textContent=e,n.className=`auth-modal-message ${t}`)}function X(){let e=document.querySelector(`#auth-forgot-message`);e&&(e.textContent=``,e.className=`auth-modal-message`)}function Z(){$e(),X()}function Q(e,t){let n=e.querySelector(`.auth-modal-submit`);n&&(t?(n.disabled=!0,n.dataset.originalText=n.textContent,n.textContent=`Please wait...`):(n.disabled=!1,n.textContent=n.dataset.originalText||`Submit`))}function $(){let e=d();document.querySelectorAll(`[data-open-login]`).forEach(t=>{t.style.display=e?`none`:``}),document.querySelectorAll(`[data-open-register]`).forEach(t=>{t.style.display=e?`none`:``}),document.querySelectorAll(`[data-auth-logout]`).forEach(t=>{t.style.display=e?``:`none`});let t=f(),n=e&&t&&t.role===`ADMIN`;document.querySelectorAll(`[data-admin-only]`).forEach(e=>{e.style.display=n?`inline-flex`:`none`}),document.querySelectorAll(`[data-auth-user]`).forEach(n=>{e&&t&&(n.textContent=t.fullName)})}function et(){p(),$()}document.addEventListener(`DOMContentLoaded`,()=>{let t=document.getElementById(`app`);if(!t){console.error(`App root element (#app) was not found.`);return}t.innerHTML=Pe(),applyStudyAbroadSEO(),Ue(),document.querySelector(`#online-education`)&&Fe(),document.querySelector(`#news`)&&V(),document.querySelector(`#study-abroad`)&&Ie(),document.querySelector(`#scholarship`)&&Le(),document.querySelector(`#rankings`)&&Re(),document.querySelector(`#student-reviews`)&&ze(),document.querySelector(`#education-loan`)&&Be(),document.querySelector(`#top-lists`)&&Ve(),document.querySelector(`#compare-college`)&&He(),e();let n=document.querySelector(`.boarding-schools-section`);if(n){let e=n.querySelector(`.boarding-schools-explore-btn`),t=n.querySelector(`.boarding-schools-all`);e&&t&&e.addEventListener(`click`,()=>{let r=n.classList.toggle(`is-expanded`);t.hidden=!r;let i=e.querySelector(`.boarding-view-all-text`),a=e.querySelector(`span:last-child`);r?(i&&(i.textContent=`Show Less`),a&&(a.textContent=`↑`),t.scrollIntoView({behavior:`smooth`,block:`start`})):(i&&(i.textContent=`View All Boarding Schools`),a&&(a.textContent=`→`),n.scrollIntoView({behavior:`smooth`,block:`start`}))})}let r=document.querySelector(`.top-companies-section`);if(r){let e=r.querySelector(`.top-companies-explore-btn`),t=r.querySelector(`.top-companies-all`);e&&t&&e.addEventListener(`click`,()=>{let n=r.classList.toggle(`is-expanded`);t.hidden=!n;let i=e.querySelector(`.top-companies-view-all-text`),a=e.querySelector(`span:last-child`);n?(i&&(i.textContent=`Show Less`),a&&(a.textContent=`↑`),t.scrollIntoView({behavior:`smooth`,block:`start`})):(i&&(i.textContent=`View All Companies`),a&&(a.textContent=`→`),r.scrollIntoView({behavior:`smooth`,block:`start`}))})}let i=document.querySelector(`.ug-pg-section-wrapper`);if(i){let e=i.querySelector(`.ug-pg-cta-button`),t=i.querySelector(`.ug-pg-all`);e&&t&&e.addEventListener(`click`,()=>{let n=i.classList.toggle(`is-expanded`);t.hidden=!n;let r=e.querySelector(`.ug-pg-view-all-text`),a=e.querySelector(`span:last-child`);n?(r&&(r.textContent=`Show Less`),a&&(a.textContent=`↑`),t.scrollIntoView({behavior:`smooth`,block:`start`})):(r&&(r.textContent=`View All Colleges`),a&&(a.textContent=`→`),i.scrollIntoView({behavior:`smooth`,block:`start`}))})}let a=document.querySelectorAll(`
                .boarding-schools-track,
                .top-companies-track,
                #top-ug-pg-colleges .ug-pg-track
            `);if(a.length&&`IntersectionObserver`in window){let e=new IntersectionObserver(e=>{e.forEach(e=>{let t=e.target;e.isIntersecting?t.style.animationPlayState=`running`:t.style.animationPlayState=`paused`})},{threshold:.05});a.forEach(t=>{e.observe(t)})}});