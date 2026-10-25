import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

const root = `${API_BASE_URL}/api/community`;

async function call(path, options = {}) {
    const token = getToken();
    const response = await fetch(`${root}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });
    if (response.status === 204) return null;
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || `Community request failed (${response.status}).`);
    return body;
}

const json = (method, body) => ({ method, body: JSON.stringify(body) });
const params = (values) => new URLSearchParams(Object.entries(values).filter(([, value]) => value !== "" && value != null)).toString();

export const communityApi = {
    myProfile: () => call("/me/profile"),
    updateProfile: (profile) => call("/me/profile", json("PUT", profile)),
    heartbeat: () => call("/me/presence", { method: "POST" }),
    discover: (filters) => call(`/students?${params(filters)}`),
    profile: (username) => call(`/students/${encodeURIComponent(username)}`),
    sendRequest: (userId) => call("/friend-requests", json("POST", { userId })),
    requests: (direction = "incoming") => call(`/friend-requests?direction=${direction}`),
    respond: (id, action) => call(`/friend-requests/${id}`, json("PATCH", { action })),
    friends: () => call("/friends"),
    removeFriend: (id) => call(`/friends/${id}`, { method: "DELETE" }),
    communityChatMessages: (afterId, beforeId) => {
        const query = new URLSearchParams();
        if (afterId) query.set("afterId", afterId);
        if (beforeId) query.set("beforeId", beforeId);
        const suffix = query.size ? `?${query.toString()}` : "";
        return call(`/community-chat/messages${suffix}`);
    },
    sendCommunityChatMessage: (content) => call("/community-chat/messages", json("POST", { content })),
    conversations: () => call("/conversations"),
    openConversation: (userId) => call(`/conversations/${userId}`, { method: "POST" }),
    messages: (id, afterId, beforeId) => {
        const query = new URLSearchParams();
        if (afterId) query.set("afterId", afterId);
        if (beforeId) query.set("beforeId", beforeId);
        const suffix = query.size ? `?${query.toString()}` : "";
        return call(`/conversations/${id}/messages${suffix}`);
    },
    sendMessage: (id, content) => call(`/conversations/${id}/messages`, json("POST", { content })),
    notifications: () => call("/notifications"),
    unreadCount: () => call("/notifications/unread-count"),
    markRead: (id) => call(`/notifications/${id}/read`, { method: "PATCH" }),
    markAllRead: () => call("/notifications/read-all", { method: "PATCH" }),
    block: (userId) => call(`/blocks/${userId}`, { method: "POST" }),
    unblock: (userId) => call(`/blocks/${userId}`, { method: "DELETE" }),
    report: (userId, reason) => call("/reports", json("POST", { userId, reason }))
};
