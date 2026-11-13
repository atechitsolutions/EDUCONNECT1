import { feedApi } from "../../services/feedService.js";
import { getCurrentUser } from "../../services/authService.js";

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const initials = name => String(name || "Student").trim().split(/\s+/).slice(0, 2)
    .map(part => part[0] || "").join("").toUpperCase() || "S";

const profileCache = new Map();
const imageCache = new Map();
const pendingImages = new Map();

const profileUsername = person => {
    if (person?.username) return String(person.username);
    const current = getCurrentUser();
    return person?.userId && current?.userId &&
        String(person.userId) === String(current.userId) ? "me" : "";
};

export function communityAvatarHtml(person = {}, large = false, extraClass = "") {
    const name = person.displayName || person.fullName || person.senderName || "Student";
    const username = profileUsername(person);
    const userId = person.userId ?? person.senderId ?? "";
    const tag = username || userId ? "button" : "span";
    const profileAttrs = tag === "button"
        ? `type="button" data-view-profile="${escapeHtml(username)}" data-view-profile-id="${escapeHtml(userId)}" data-view-profile-name="${escapeHtml(name)}" aria-label="Open ${escapeHtml(name)}'s profile"`
        : `aria-hidden="true"`;
    return `<${tag} class="community-avatar community-avatar-photo${large ? " community-avatar-large" : ""}${person.online ? " is-online" : ""}${extraClass ? ` ${escapeHtml(extraClass)}` : ""}" ${profileAttrs} data-avatar-username="${escapeHtml(username)}" data-avatar-user-id="${escapeHtml(userId)}" data-avatar-name="${escapeHtml(name)}"><span class="community-avatar-fallback">${escapeHtml(initials(name))}</span></${tag}>`;
}

async function loadPhoto(username) {
    if (!username) return null;
    if (imageCache.has(username)) return imageCache.get(username);
    if (pendingImages.has(username)) return pendingImages.get(username);

    const request = (async () => {
        try {
            const profile = profileCache.get(username) || await feedApi.profile(username);
            profileCache.set(username, profile);
            if (!profile?.avatarUrl) {
                imageCache.set(username, null);
                return null;
            }
            const url = await feedApi.image(profile.avatarUrl);
            imageCache.set(username, url);
            return url;
        } catch {
            return null;
        } finally {
            pendingImages.delete(username);
        }
    })();
    pendingImages.set(username, request);
    return request;
}

export async function hydrateCommunityAvatars(scope, resolveUsername) {
    if (!scope) return;
    const nodes = [];
    if (scope.matches?.("[data-avatar-username], [data-avatar-user-id]")) nodes.push(scope);
    nodes.push(...(scope.querySelectorAll?.("[data-avatar-username], [data-avatar-user-id]") || []));

    await Promise.all(nodes.map(async node => {
        let username = node.dataset.avatarUsername || "";
        const userId = node.dataset.avatarUserId || "";
        const current = getCurrentUser();
        if (!username && userId && current?.userId && String(userId) === String(current.userId)) {
            username = "me";
        }
        if (!username && userId && resolveUsername) {
            try { username = await resolveUsername(userId, node.dataset.avatarName || "") || ""; }
            catch { username = ""; }
        }
        if (!username) return;
        node.dataset.avatarUsername = username;
        if (node.tagName === "BUTTON") node.dataset.viewProfile = username;

        const url = await loadPhoto(username);
        if (!url || !node.isConnected) return;
        const existing = node.querySelector("img.community-avatar-image");
        if (existing) {
            existing.src = url;
            node.classList.add("has-profile-photo");
            return;
        }
        const image = document.createElement("img");
        image.className = "community-avatar-image";
        image.alt = "";
        image.onload = () => node.classList.add("has-profile-photo");
        image.onerror = () => image.remove();
        image.src = url;
        node.append(image);
    }));
}

export function refreshCommunityAvatar(node, person = {}) {
    if (!node) return;
    const name = person.displayName || person.fullName || "Student";
    node.dataset.avatarUsername = profileUsername(person);
    node.dataset.avatarUserId = person.userId ?? "";
    node.dataset.avatarName = name;
    if (node.matches("button")) {
        node.dataset.viewProfile = profileUsername(person);
        node.dataset.viewProfileId = person.userId ?? "";
        node.dataset.viewProfileName = name;
        node.setAttribute("aria-label", `Open ${name}'s profile`);
    }
    const username = profileUsername(person);
    if (username) {
        profileCache.delete(username);
        const priorImage = imageCache.get(username);
        if (priorImage) URL.revokeObjectURL(priorImage);
        imageCache.delete(username);
    }
    node.classList.toggle("has-profile-photo", false);
    node.querySelector("img.community-avatar-image")?.remove();
    let fallback = node.querySelector(".community-avatar-fallback");
    if (!fallback) {
        node.replaceChildren();
        fallback = document.createElement("span");
        fallback.className = "community-avatar-fallback";
        node.append(fallback);
    }
    fallback.textContent = initials(name);
    hydrateCommunityAvatars(node);
}
