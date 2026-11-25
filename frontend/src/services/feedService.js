import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

const root = `${API_BASE_URL}/api/community`;

async function call(path, options = {}) {
    const token = getToken();

    const isForm = typeof FormData !== "undefined" && options.body instanceof FormData;

    const response = await fetch(`${root}${path}`, {
        ...options,
        headers: {
            ...(options.body && !isForm ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (response.status === 204) {
        return null;
    }

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(body.message || body.error || `Request failed (${response.status}).`);
    }

    return body;
}

const json = (method, body) => ({
    method,
    body: JSON.stringify(body),
});

const params = (values = {}) =>
    new URLSearchParams(
        Object.entries(values).filter(
            ([, value]) => value !== "" && value !== null && value !== undefined,
        ),
    ).toString();

const query = (values) => {
    const result = params(values);
    return result ? `?${result}` : "";
};

const usernamePath = (username) => encodeURIComponent(username);

export const feedApi = {
    list: (filters = {}) => call(`/posts${query(filters)}`),

    get: (id) => call(`/posts/${encodeURIComponent(id)}`),

    create: (formData) =>
        call("/posts", {
            method: "POST",
            body: formData,
        }),

    update: (id, body) => call(`/posts/${encodeURIComponent(id)}`, json("PUT", body)),

    remove: (id) =>
        call(`/posts/${encodeURIComponent(id)}`, {
            method: "DELETE",
        }),

    like: (id) =>
        call(`/posts/${encodeURIComponent(id)}/like`, {
            method: "POST",
        }),

    save: (id) =>
        call(`/posts/${encodeURIComponent(id)}/save`, {
            method: "POST",
        }),

    share: (id) =>
        call(`/posts/${encodeURIComponent(id)}/share`, {
            method: "POST",
        }),

    report: (id, reason) =>
        call(`/posts/${encodeURIComponent(id)}/reports`, json("POST", { reason })),

    comments: (id, page = 0, size = 10) =>
        call(`/posts/${encodeURIComponent(id)}/comments` + query({ page, size })),

    addComment: (id, content, parentId = null) =>
        call(
            `/posts/${encodeURIComponent(id)}/comments`,
            json("POST", {
                content,
                parentId,
            }),
        ),

    removeComment: (id) => call(`/posts/comments/${encodeURIComponent(id)}`, { method: "DELETE" }),

    profile: (username) => call(`/profiles/${usernamePath(username)}`),

    updateProfile: (formData) =>
        call("/profiles/me", {
            method: "PUT",
            body: formData,
        }),

    profilePosts: (username, tab = "posts", page = 0, size = 12) =>
        call(`/profiles/${usernamePath(username)}/posts` + query({ tab, page, size })),

    followers: (username, page = 0, size = 20) =>
        call(`/profiles/${usernamePath(username)}/followers` + query({ page, size })),

    following: (username, page = 0, size = 20) =>
        call(`/profiles/${usernamePath(username)}/following` + query({ page, size })),

    follow: (username) => call(`/profiles/${usernamePath(username)}/follow`, { method: "POST" }),

    unfollow: (username) =>
        call(`/profiles/${usernamePath(username)}/follow`, { method: "DELETE" }),

    async image(path) {
        const token = getToken();

        const response = await fetch(`${root}${path}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
            throw new Error(`Image unavailable (${response.status}).`);
        }

        const blob = await response.blob();

        return URL.createObjectURL(blob);
    },
};

export default feedApi;
