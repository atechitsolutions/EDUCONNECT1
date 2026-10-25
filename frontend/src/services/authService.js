const API_BASE_URL =
    "http://localhost:8080/api/auth";


const TOKEN_KEY =
    "educonnect_token";


const USER_KEY =
    "educonnect_user";


/* =========================================================
   LOGIN
========================================================= */

export async function loginUser(data) {

    const response =
        await fetch(
            `${API_BASE_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Invalid email or password."
        );

    }


    localStorage.setItem(
        TOKEN_KEY,
        result.token
    );


    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            userId:
                result.userId,

            fullName:
                result.fullName,

            email:
                result.email,

            role:
                result.role
        })
    );


    return result;
}


/* =========================================================
   REGISTER
========================================================= */

export async function registerUser(data) {

    const response =
        await fetch(
            `${API_BASE_URL}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Registration failed."
        );

    }


    localStorage.setItem(
        TOKEN_KEY,
        result.token
    );


    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            userId:
                result.userId,

            fullName:
                result.fullName,

            email:
                result.email,

            role:
                result.role
        })
    );


    return result;
}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

export async function forgotPassword(email) {

    const response =
        await fetch(
            `${API_BASE_URL}/forgot-password`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        email: email
                    })
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Unable to process password reset request."
        );

    }


    return result;
}


/* =========================================================
   RESET PASSWORD
========================================================= */

export async function resetPassword(
    token,
    newPassword
) {

    const response =
        await fetch(
            `${API_BASE_URL}/reset-password`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        token: token,
                        newPassword: newPassword
                    })
            }
        );


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Unable to reset password."
        );

    }


    return result;
}


/* =========================================================
   AUTHENTICATION STATE
========================================================= */

export function isAuthenticated() {

    const token =
        localStorage.getItem(
            TOKEN_KEY
        );

    return Boolean(token);
}


/* =========================================================
   CURRENT USER
========================================================= */

export function getCurrentUser() {

    const user =
        localStorage.getItem(
            USER_KEY
        );


    if (!user) {
        return null;
    }


    try {

        return JSON.parse(user);

    }
    catch (error) {

        return null;

    }

}


/* =========================================================
   TOKEN
========================================================= */

export function getToken() {

    return localStorage.getItem(
        TOKEN_KEY
    );

}


/* =========================================================
   LOGOUT
========================================================= */

export function logoutUser() {

    localStorage.removeItem(
        TOKEN_KEY
    );

    localStorage.removeItem(
        USER_KEY
    );

}