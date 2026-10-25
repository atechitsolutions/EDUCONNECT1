export default function Header() {
    return `
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
    `;
}