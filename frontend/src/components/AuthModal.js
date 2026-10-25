export default function AuthModal() {

    return `
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
    `;
}