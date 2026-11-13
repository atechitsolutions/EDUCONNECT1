export default function Header() {
    const isHomePage = window.location.pathname === "/";
    const routePath = window.location.pathname.replace(/\/+$/, "") || "/";
    const hasPrimaryNavigation = isHomePage || routePath === "/index.html" || routePath === "/latest-news" || /^\/latest-news\/\d+$/.test(routePath);
    return `
        <header class="header">
            <div class="header-container">

                <!-- Logo -->
                <div class="logo">
                    <a href="/">StepInStudents</a>
                </div>

                ${isHomePage ? `
                <a class="header-community-promo" href="/community" aria-label="Explore the Global Student Community">
                    <span class="community-promo-people" aria-hidden="true">
                        <span>JD</span><span>AR</span><span>PS</span><span>MK</span><b>+</b>
                    </span>
                    <span class="community-promo-copy">
                        <strong>Global Student Community</strong>
                        <small>Connect · Discuss · Share · Grow</small>
                    </span>
                    <span class="community-promo-live"><i></i> LIVE</span>
                    <span class="community-promo-cta">Explore Community <b aria-hidden="true">→</b></span>
                </a>
                ` : `
                <!-- Search -->
                <div class="search-box">
                    <input
                        type="text"
                        placeholder="Search Schools, Colleges, Universities, Jobs..."
                    >
                </div>
                `}

                <!-- Location -->


                <!-- Right Side -->
               <div class="header-auth">


                 <button class="notification-btn">
                          🔔
                 </button>
                 ${hasPrimaryNavigation ? `<button
                    type="button"
                    class="mobile-header-menu-toggle"
                    aria-label="Open main navigation"
                    aria-expanded="false"
                    aria-controls="educonnect-primary-navigation"
                 >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                 </button>` : ""}
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
    `;
}
