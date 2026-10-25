import {
    loginUser,
    registerUser,
    forgotPassword,
    isAuthenticated,
    getCurrentUser,
    logoutUser
} from "../../services/authService.js";


let authModal = null;

let pendingNavigation = null;
let protectedLinkHandlerInstalled = false;


/* =========================================================
   INITIALIZE
========================================================= */

export function initAuth() {

    authModal =
        document.querySelector("#auth-modal");


    if (!authModal) {

        console.warn("Auth modal not found.");

        return;

    }


    setupHeaderButtons();

    setupCloseEvents();

    setupLoginForm();

    setupRegisterForm();

    setupForgotPasswordForm();

    setupSwitchButtons();

    setupProtectedLinks();

    updateAuthButtons();

}


/* =========================================================
   HEADER BUTTONS
========================================================= */

function setupHeaderButtons() {

    document
        .querySelectorAll("[data-open-login]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    pendingNavigation = null;

                    openLoginModal();

                }
            );

        });


    document
        .querySelectorAll("[data-open-register]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    pendingNavigation = null;

                    openRegisterModal();

                }
            );

        });


    document
        .querySelectorAll("[data-auth-logout]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    handleLogout();

                }
            );

        });

}


/* =========================================================
   OPEN LOGIN
========================================================= */

export function openLoginModal() {

    if (!authModal) {
        return;
    }


    showView("login");

    clearAllMessages();

    openModal();


    const email =
        document.querySelector(
            "#auth-login-email"
        );


    setTimeout(() => {

        if (email) {
            email.focus();
        }

    }, 100);

}


/* =========================================================
   OPEN REGISTER
========================================================= */

export function openRegisterModal() {

    if (!authModal) {
        return;
    }


    showView("register");

    clearAllMessages();

    openModal();


    const name =
        document.querySelector(
            "#auth-register-name"
        );


    setTimeout(() => {

        if (name) {
            name.focus();
        }

    }, 100);

}


/* =========================================================
   OPEN FORGOT PASSWORD
========================================================= */

function openForgotPasswordModal() {

    if (!authModal) {
        return;
    }


    showView("forgot");

    clearAllMessages();


    const email =
        document.querySelector(
            "#auth-forgot-email"
        );


    setTimeout(() => {

        if (email) {
            email.focus();
        }

    }, 100);

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal() {

    authModal.classList.add(
        "is-open"
    );


    authModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "auth-modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

export function closeAuthModal(
    continueNavigation = false
) {

    if (!authModal) {
        return;
    }


    authModal.classList.remove(
        "is-open"
    );


    authModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "auth-modal-open"
    );


    clearAllMessages();


    /*
     * Continue to the page/section that the user
     * originally clicked.
     */

    if (
        continueNavigation &&
        pendingNavigation
    ) {

        const destination =
            pendingNavigation;


        pendingNavigation =
            null;


        setTimeout(() => {

            window.location.href =
                destination;

        }, 50);

    }
    else {

        pendingNavigation =
            null;

    }

}


/* =========================================================
   CLOSE EVENTS
========================================================= */

function setupCloseEvents() {

    const closeButton =
        document.querySelector(
            "#auth-modal-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                closeAuthModal(false);

            }
        );

    }


    const backdrop =
        authModal.querySelector(
            "[data-auth-close='true']"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            () => {

                /*
                 * Clicking outside the popup simply
                 * closes it and stays on the current page.
                 */

                closeAuthModal(false);

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAuthModal(false);

            }

        }
    );

}


/* =========================================================
   SHOW VIEW
========================================================= */

function showView(view) {

    const loginView =
        document.querySelector(
            "#auth-login-view"
        );


    const registerView =
        document.querySelector(
            "#auth-register-view"
        );


    const forgotView =
        document.querySelector(
            "#auth-forgot-view"
        );


    if (loginView) {

        loginView.hidden =
            view !== "login";

    }


    if (registerView) {

        registerView.hidden =
            view !== "register";

    }


    if (forgotView) {

        forgotView.hidden =
            view !== "forgot";

    }

}


/* =========================================================
   SWITCH BUTTONS
========================================================= */

function setupSwitchButtons() {

    const switchButton =
        document.querySelector(
            "#auth-switch-button"
        );


    const registerLogin =
        document.querySelector(
            "#auth-register-login"
        );


    const forgotPassword =
        document.querySelector(
            "#auth-forgot-password"
        );


    const backToLogin =
        document.querySelector(
            "#auth-back-to-login"
        );


    if (switchButton) {

        switchButton.addEventListener(
            "click",
            () => {

                showView("register");

                clearAllMessages();

            }
        );

    }


    if (registerLogin) {

        registerLogin.addEventListener(
            "click",
            () => {

                showView("login");

                clearAllMessages();

            }
        );

    }


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            () => {

                openForgotPasswordModal();

            }
        );

    }


    if (backToLogin) {

        backToLogin.addEventListener(
            "click",
            () => {

                openLoginModal();

            }
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

function setupLoginForm() {

    const form =
        document.querySelector(
            "#auth-login-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document.querySelector(
                    "#auth-login-email"
                );


            const password =
                document.querySelector(
                    "#auth-login-password"
                );


            if (!email || !password) {
                return;
            }


            clearAllMessages();

            setLoading(
                form,
                true
            );


            try {

                await loginUser({

                    email:
                        email.value.trim(),

                    password:
                        password.value

                });


                showMessage(
                    "Login successful.",
                    "success"
                );


                updateAuthButtons();


                const destination =
                    pendingNavigation;


                pendingNavigation =
                    null;


                setTimeout(() => {

                    closeAuthModal();


                    if (destination) {

                        window.location.href =
                            destination;

                    } else if (window.location.pathname.replace(/\/+$/, "") === "/online-education/admin") {

                        window.location.reload();

                    }

                }, 700);

            }
            catch (error) {

                showMessage(
                    error.message ||
                    "Login failed.",
                    "error"
                );

            }
            finally {

                setLoading(
                    form,
                    false
                );

            }

        }
    );

}


/* =========================================================
   REGISTER
========================================================= */

function setupRegisterForm() {

    const form =
        document.querySelector(
            "#auth-register-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document.querySelector(
                    "#auth-register-name"
                ).value.trim();


            const email =
                document.querySelector(
                    "#auth-register-email"
                ).value.trim();


            const role =
                document.querySelector(
                    "#auth-register-role"
                ).value;


            const password =
                document.querySelector(
                    "#auth-register-password"
                ).value;


            const confirmPassword =
                document.querySelector(
                    "#auth-register-confirm"
                ).value;


            if (
                password !==
                confirmPassword
            ) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            if (
                password.length < 8
            ) {

                showMessage(
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;

            }


            clearAllMessages();

            setLoading(
                form,
                true
            );


            try {

                await registerUser({

                    fullName:
                        name,

                    email:
                        email,

                    password:
                        password,

                    role:
                        role

                });


                showMessage(
                    "Account created successfully.",
                    "success"
                );


                updateAuthButtons();


                const destination =
                    pendingNavigation;


                pendingNavigation =
                    null;


                setTimeout(() => {

                    closeAuthModal();


                    if (destination) {

                        window.location.href =
                            destination;

                    }

                }, 800);

            }
            catch (error) {

                showMessage(
                    error.message ||
                    "Registration failed.",
                    "error"
                );

            }
            finally {

                setLoading(
                    form,
                    false
                );

            }

        }
    );

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function setupForgotPasswordForm() {

    const form =
        document.querySelector(
            "#auth-forgot-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document.querySelector(
                    "#auth-forgot-email"
                );


            if (!email) {
                return;
            }


            const emailValue =
                email.value.trim();


            if (!emailValue) {

                showForgotMessage(
                    "Please enter your email address.",
                    "error"
                );

                return;

            }


            clearForgotMessage();

            setLoading(
                form,
                true
            );


            try {

                await forgotPassword(
                    emailValue
                );


                showForgotMessage(
                    "If an account exists with this email, a password reset link has been sent.",
                    "success"
                );

            }
            catch (error) {

                showForgotMessage(
                    error.message ||
                    "Unable to process your request.",
                    "error"
                );

            }
            finally {

                setLoading(
                    form,
                    false
                );

            }

        }
    );

}


/* =========================================================
   PROTECTED LINKS
========================================================= */

function setupProtectedLinks() {
    if (protectedLinkHandlerInstalled) {
        return;
    }

    protectedLinkHandlerInstalled = true;

    // Delegate so protected links added after an API response are handled too.
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-auth-required='true']");
        if (!link) return;

        const mustReauthenticate = link.hasAttribute("data-auth-reauth");
        if (isAuthenticated() && !mustReauthenticate) return;

        event.preventDefault();
        event.stopPropagation();

        pendingNavigation = link.getAttribute("href") || window.location.href;
        openLoginModal();
    });
}


/* =========================================================
   MESSAGES
========================================================= */

function showMessage(
    text,
    type
) {

    const message =
        document.querySelector(
            "#auth-modal-message"
        );


    if (!message) {
        return;
    }


    message.textContent =
        text;


    message.className =
        `auth-modal-message ${type}`;

}


function clearMessage() {

    const message =
        document.querySelector(
            "#auth-modal-message"
        );


    if (!message) {
        return;
    }


    message.textContent =
        "";


    message.className =
        "auth-modal-message";

}


function showForgotMessage(
    text,
    type
) {

    const message =
        document.querySelector(
            "#auth-forgot-message"
        );


    if (!message) {
        return;
    }


    message.textContent =
        text;


    message.className =
        `auth-modal-message ${type}`;

}


function clearForgotMessage() {

    const message =
        document.querySelector(
            "#auth-forgot-message"
        );


    if (!message) {
        return;
    }


    message.textContent =
        "";


    message.className =
        "auth-modal-message";

}


function clearAllMessages() {

    clearMessage();

    clearForgotMessage();

}


/* =========================================================
   LOADING
========================================================= */

function setLoading(
    form,
    loading
) {

    const button =
        form.querySelector(
            ".auth-modal-submit"
        );


    if (!button) {
        return;
    }


    if (loading) {

        button.disabled =
            true;


        button.dataset.originalText =
            button.textContent;


        button.textContent =
            "Please wait...";

    }
    else {

        button.disabled =
            false;


        button.textContent =
            button.dataset.originalText ||
            "Submit";

    }

}


/* =========================================================
   UPDATE HEADER BUTTONS
========================================================= */

function updateAuthButtons() {

    const authenticated =
        isAuthenticated();


    document
        .querySelectorAll(
            "[data-open-login]"
        )
        .forEach((button) => {

            button.style.display =
                authenticated
                    ? "none"
                    : "";

        });


    document
        .querySelectorAll(
            "[data-open-register]"
        )
        .forEach((button) => {

            button.style.display =
                authenticated
                    ? "none"
                    : "";

        });


    document
        .querySelectorAll(
            "[data-auth-logout]"
        )
        .forEach((button) => {

            button.style.display =
                authenticated
                    ? ""
                    : "none";

        });


    const user =
        getCurrentUser();


    const isAdmin =
        authenticated &&
        user &&
        user.role === "ADMIN";


    document
        .querySelectorAll(
            "[data-admin-only]"
        )
        .forEach((element) => {

            element.style.display =
                isAdmin
                    ? "inline-flex"
                    : "none";

        });


    document
        .querySelectorAll(
            "[data-auth-user]"
        )
        .forEach((element) => {

            if (
                authenticated &&
                user
            ) {

                element.textContent =
                    user.fullName;

            }

        });

}


/* =========================================================
   LOGOUT
========================================================= */

export function handleLogout() {

    logoutUser();

    updateAuthButtons();

}
