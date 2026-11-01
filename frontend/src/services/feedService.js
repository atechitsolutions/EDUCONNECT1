
import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

const root = `${API_BASE_URL}/api/community`;

async function call(path, options = {}) {
    const token = getToken();
    const isForm = options.body instanceof FormData;

    const response = await fetch(`${root}${path}`, {
        ...options,
        headers: {
            ...(options.body && !isForm
                ? { "Content-Type": "application/json" }
                : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    if (response.status === 204) return null;

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            body.message || `Request failed (${response.status}).`
        );
    }

    return body;
}

const json = (method, body) => ({
    method,
    body: JSON.stringify(body)
});

const params = values => new URLSearchParams(
    Object.entries(values).filter(([, v]) => v !== "" && v != null)
).toString();

export const feedApi = {
    list: filters => call(`/posts?${params(filters)}`),

    get: id => call(`/posts/${id}`),

    create: formData =>
        call("/posts", { method: "POST", body: formData }),

    update: (id, body) =>
        call(`/posts/${id}`, json("PUT", body)),

    remove: id =>
        call(`/posts/${id}`, { method: "DELETE" }),

    like: id =>
        call(`/posts/${id}/like`, { method: "POST" }),

    save: id =>
        call(`/posts/${id}/save`, { method: "POST" }),

    share: id =>
        call(`/posts/${id}/share`, { method: "POST" }),

    report: (id, reason) =>
        call(`/posts/${id}/reports`, json("POST", { reason })),

    comments: (id, page = 0) =>
        call(`/posts/${id}/comments?page=${page}&size=10`),

    addComment: (id, content, parentId) =>
        call(
            `/posts/${id}/comments`,
            json("POST", { content, parentId })
        ),

    removeComment: id =>
        call(`/posts/comments/${id}`, { method: "DELETE" }),

    async image(path) {
        const token = getToken();

        const response = await fetch(`${root}${path}`, {
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {}
        });

        if (!response.ok) {
            throw new Error("Image unavailable.");
        }

        return URL.createObjectURL(await response.blob());
    }
};
