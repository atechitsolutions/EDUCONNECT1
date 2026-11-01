
import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

const root = `${API_BASE_URL}/api/community`;

// ============================================================
// COMMON API REQUEST
// ============================================================

async function call(path, options = {}) {
    const token = getToken();
    const isForm =
        typeof FormData !== "undefined" &&
        options.body instanceof FormData;

    const response = await fetch(`${root}${path}`, {
        ...options,
        headers: {
            ...(options.body && !isForm
                ? { "Content-Type": "application/json" }
                : {}),
            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),
            ...options.headers
        }
    });

    if (response.status === 204) {
        return null;
    }

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            body.message ||
            `Request failed (${response.status}).`
        );
    }

    return body;
}

// ============================================================
// REQUEST HELPERS
// ============================================================

const json = (method, body) => ({
    method,
    body: JSON.stringify(body)
});

const params = values =>
    new URLSearchParams(
        Object.entries(values || {}).filter(
            ([, value]) =>
                value !== "" &&
                value !== null &&
                value !== undefined
        )
    ).toString();

const query = values => {
    const result = params(values);
    return result ? `?${result}` : "";
};

const usernamePath = username =>
    encodeURIComponent(username);

// ============================================================
// COMMUNITY POSTS API
// ============================================================

export const feedApi = {

    // --------------------------------------------------------
    // FEED
    // --------------------------------------------------------

    list: filters =>
        call(`/posts${query(filters)}`),

    get: id =>
        call(`/posts/${id}`),

    // --------------------------------------------------------
    // CREATE / UPDATE / DELETE
    // --------------------------------------------------------

    create: formData =>
        call("/posts", {
            method: "POST",
            body: formData
        }),

    update: (id, body) =>
        call(`/posts/${id}`, json("PUT", body)),

    remove: id =>
        call(`/posts/${id}`, {
            method: "DELETE"
        }),

    // --------------------------------------------------------
    // LIKE / SAVE / SHARE
    // --------------------------------------------------------

    like: id =>
        call(`/posts/${id}/like`, {
            method: "POST"
        }),

    save: id =>
        call(`/posts/${id}/save`, {
            method: "POST"
        }),

    share: id =>
        call(`/posts/${id}/share`, {
            method: "POST"
        }),

    // --------------------------------------------------------
    // REPORT
    // --------------------------------------------------------

    report: (id, reason) =>
        call(
            `/posts/${id}/reports`,
            json("POST", { reason })
        ),

    // --------------------------------------------------------
    // COMMENTS
    // --------------------------------------------------------

    comments: (id, page = 0, size = 10) =>
        call(
            `/posts/${id}/comments${query({ page, size })}`
        ),

    addComment: (id, content, parentId = null) =>
        call(
            `/posts/${id}/comments`,
            json("POST", {
                content,
                parentId
            })
        ),

    removeComment: id =>
        call(`/posts/comments/${id}`, {
            method: "DELETE"
        }),

    // ========================================================
    // USER PROFILES
    // ========================================================

    profile: username =>
        call(`/profiles/${usernamePath(username)}`),

    updateProfile: formData =>
        call("/profiles/me", {
            method: "PUT",
            body: formData
        }),

    // --------------------------------------------------------
    // PROFILE POSTS
    // --------------------------------------------------------

    profilePosts: (
        username,
        tab = "posts",
        page = 0,
        size = 12
    ) =>
        call(
            `/profiles/${usernamePath(username)}/posts` +
            query({ tab, page, size })
        ),

    // ========================================================
    // FOLLOWERS / FOLLOWING
    // ========================================================

    followers: (
        username,
        page = 0,
        size = 20
    ) =>
        call(
            `/profiles/${usernamePath(username)}/followers` +
            query({ page, size })
        ),

    following: (
        username,
        page = 0,
        size = 20
    ) =>
        call(
            `/profiles/${usernamePath(username)}/following` +
            query({ page, size })
        ),

    // ========================================================
    // FOLLOW / UNFOLLOW
    // ========================================================

    follow: username =>
        call(
            `/profiles/${usernamePath(username)}/follow`,
            { method: "POST" }
        ),

    unfollow: username =>
        call(
            `/profiles/${usernamePath(username)}/follow`,
            { method: "DELETE" }
        ),

    // ========================================================
    // PRIVATE POST / PROFILE IMAGES
    // ========================================================

    async image(path) {
        const token = getToken();

        const response = await fetch(`${root}${path}`, {
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {}
        });

        if (!response.ok) {
            throw new Error(
                `Image unavailable (${response.status}).`
            );
        }

        return URL.createObjectURL(
            await response.blob()
        );
    }
};
