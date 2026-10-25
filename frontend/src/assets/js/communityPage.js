import { communityApi as api } from "../../services/communityService.js";
import { getCurrentUser } from "../../services/authService.js";

const escapeHtml = (value = "") => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const initials = (name = "Student") => String(name).trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase() || "S";
const dateLabel = (date) => date ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(date)) : "";

export function initCommunityPage() {
    const root = document.querySelector("#community-page");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "true";

    const state = { profile: null, communityMessages: [], communityHasOlder: false, communityLoading: false, students: [], friends: [], incoming: [], outgoing: [], conversations: [], notifications: [], activeConversation: null, messages: [], hasOlderMessages: false, page: 0, totalPages: 1, filters: {}, timer: null, toastTimer: null };
    const select = (selector) => root.querySelector(selector);
    const toast = (message, error = false) => {
        const node = select("[data-community-toast]");
        node.textContent = message;
        node.classList.toggle("is-error", error);
        node.classList.add("is-visible");
        clearTimeout(state.toastTimer);
        state.toastTimer = setTimeout(() => node.classList.remove("is-visible"), 3400);
    };
    const run = async (action, successMessage) => {
        try { await action(); if (successMessage) toast(successMessage); return true; }
        catch (error) { toast(error.message || "Something went wrong. Please try again.", true); return false; }
    };
    const signedInUser = getCurrentUser();
    const currentUserId = Number(signedInUser?.userId) || null;
    const avatar = (person, large = false) => `<span class="community-avatar${large ? " community-avatar-large" : ""}${person.online ? " is-online" : ""}" aria-hidden="true">${escapeHtml(initials(person.displayName))}</span>`;

    function renderCommunityMessages({ keepPosition = false } = {}) {
        const list = select("[data-community-chat-list]");
        if (!list) return;
        const oldHeight = list.scrollHeight;
        const oldTop = list.scrollTop;
        const nearBottom = oldHeight - oldTop - list.clientHeight < 120;
        const olderButton = state.communityHasOlder ? `<button class="community-load-older" data-community-chat-older ${state.communityLoading ? "disabled" : ""}>${state.communityLoading ? "Loading…" : "Load earlier messages"}</button>` : "";
        const messages = state.communityMessages.map(message => {
            const senderName = message.senderName || "Community member";
            const own = currentUserId && Number(message.senderId) === currentUserId;
            return `<article class="community-group-message${own ? " is-own" : ""}" data-message-id="${message.id}">
                ${own ? "" : `<span class="community-avatar community-group-avatar" aria-hidden="true">${escapeHtml(initials(senderName))}</span>`}
                <div class="community-group-message-body">${own ? "" : `<strong>${escapeHtml(senderName)}</strong>`}<div class="community-group-bubble"><p>${escapeHtml(message.content)}</p><time>${escapeHtml(dateLabel(message.createdAt))}</time></div></div>
            </article>`;
        }).join("");
        list.innerHTML = `${olderButton}${messages || `<div class="community-empty-state"><span>✦</span><h3>Start the conversation</h3><p>Be the first to share a question, idea, or helpful study tip.</p></div>`}`;
        if (!keepPosition || nearBottom) list.scrollTop = list.scrollHeight;
        else list.scrollTop = list.scrollHeight - oldHeight + oldTop;
    }

    async function loadCommunityMessages({ beforeId = null, quiet = false } = {}) {
        const list = select("[data-community-chat-list]");
        if (!list || state.communityLoading) return;
        state.communityLoading = true;
        if (!quiet && !state.communityMessages.length) list.innerHTML = `<div class="community-empty-state"><span>✦</span><h3>Loading community chat</h3><p>Getting the latest messages…</p></div>`;
        try {
            const items = await api.communityChatMessages(null, beforeId);
            if (beforeId) {
                state.communityHasOlder = items.length >= 60;
                state.communityMessages = [...items, ...state.communityMessages];
                state.communityLoading = false;
                renderCommunityMessages({ keepPosition: true });
            } else {
                state.communityHasOlder = items.length >= 100;
                state.communityMessages = items;
                renderCommunityMessages();
            }
            select("[data-community-chat-form]").hidden = false;
            select("[data-community-chat-signin]").hidden = true;
        } catch (error) {
            if (!quiet) {
                const needsSignIn = /\((401|403)\)/.test(error.message || "");
                select("[data-community-chat-form]").hidden = true;
                list.innerHTML = needsSignIn
                    ? `<div class="community-empty-state is-error"><span>↗</span><h3>Sign in to join the chat</h3><p>Your session may have expired. Sign in with your EduConnect account to view and send community messages.</p><a class="community-button community-button-primary" href="/community" data-auth-required="true" data-auth-reauth>Sign in again →</a></div>`
                    : `<div class="community-empty-state is-error"><span>!</span><h3>Community chat couldn’t connect</h3><p>${escapeHtml(error.message || "Please check your connection and try again.")}</p><button class="community-small-button is-primary" data-community-chat-retry>Try again</button></div>`;
            }
        } finally {
            state.communityLoading = false;
        }
    }

    async function refreshCommunityMessages() {
        if (select('[data-panel="community-chat"]')?.hidden) return;
        const lastId = state.communityMessages.at(-1)?.id || 0;
        try {
            const fresh = await api.communityChatMessages(lastId || null);
            if (!fresh.length) return;
            const known = new Set(state.communityMessages.map(message => message.id));
            state.communityMessages.push(...fresh.filter(message => !known.has(message.id)));
            renderCommunityMessages({ keepPosition: true });
        } catch { /* Keep the shared chat readable during temporary network interruptions. */ }
    }

    function relationshipFor(userId) {
        const incoming = state.incoming.find(r => r.student.userId === userId);
        const outgoing = state.outgoing.find(r => r.student.userId === userId);
        if (incoming) return { kind: "incoming", item: incoming };
        if (outgoing) return { kind: "outgoing", item: outgoing };
        if (state.friends.some(r => r.student.userId === userId)) return { kind: "friend" };
        return { kind: "none" };
    }

    function studentCard(person, mode = "discover") {
        const relationship = relationshipFor(person.userId);
        const tags = (person.interests || []).slice(0, 3).map(tag => `<span class="community-interest-tag">${escapeHtml(tag)}</span>`).join("");
        let actions = "";
        if (mode === "friend" || relationship.kind === "friend") actions = `<button class="community-small-button is-primary" data-message-user="${person.userId}">Message <span>→</span></button>${mode === "friend" ? `<button class="community-icon-button" data-remove-friend="${relationship.itemId || ""}" title="Remove friend" aria-label="Remove friend">⋯</button>` : ""}`;
        else if (relationship.kind === "incoming") actions = `<button class="community-small-button is-primary" data-accept-request="${relationship.item.id}">Accept</button><button class="community-small-button" data-reject-request="${relationship.item.id}">Decline</button>`;
        else if (relationship.kind === "outgoing") actions = `<button class="community-small-button" disabled>Request sent</button><button class="community-icon-button" data-cancel-request="${relationship.item.id}" aria-label="Cancel request">×</button>`;
        else actions = `<button class="community-small-button is-primary" data-add-friend="${person.userId}">Add friend <span>＋</span></button>`;
        return `<article class="community-student-card" data-student-card>
            <div class="community-card-top"><span class="community-card-mark">${person.online ? "ONLINE" : "STUDENT"}</span><button class="community-icon-button" data-view-profile="${escapeHtml(person.username)}" aria-label="View ${escapeHtml(person.displayName)} profile">↗</button></div>
            <div class="community-card-person">${avatar(person, true)}<div><h3>${escapeHtml(person.displayName)}</h3><span>@${escapeHtml(person.username)}</span></div></div>
            <div class="community-student-meta">${person.course ? `<span>◈ ${escapeHtml(person.course)}</span>` : ""}${person.university ? `<span>⌂ ${escapeHtml(person.university)}</span>` : ""}${person.country ? `<span>◎ ${escapeHtml(person.country)}</span>` : ""}</div>
            ${person.bio ? `<p class="community-card-bio">${escapeHtml(person.bio)}</p>` : `<p class="community-card-bio is-muted">A student building their next chapter.</p>`}
            ${tags ? `<div class="community-interest-list">${tags}</div>` : ""}<div class="community-card-actions">${actions}</div>
        </article>`;
    }

    function updateCounts() {
        select('[data-stat="friends"]').textContent = state.friends.length;
        select('[data-stat="requests"]').textContent = state.incoming.length;
        select('[data-stat="unread"]').textContent = state.conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
        select('[data-tab-count="friends"]').textContent = state.friends.length;
        select('[data-tab-count="requests"]').textContent = state.incoming.length;
        select('[data-tab-count="messages"]').textContent = state.conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
        select('[data-tab-count="notifications"]').textContent = state.notifications.filter(n => !n.read).length;
    }

    async function loadProfile() {
        state.profile = await api.myProfile();
        select("[data-my-name]").textContent = state.profile.displayName;
        select("[data-my-course]").textContent = state.profile.course || (state.profile.discoverable ? "Discoverable student" : "Profile hidden from discovery");
        select("[data-my-avatar]").textContent = initials(state.profile.displayName);
        const form = select("[data-profile-form]");
        form.elements.username.value = state.profile.username || "";
        form.elements.bio.value = state.profile.bio || "";
        form.elements.university.value = state.profile.university || "";
        form.elements.course.value = state.profile.course || "";
        form.elements.country.value = state.profile.country || "";
        form.elements.interests.value = (state.profile.interests || []).join(", ");
        form.elements.discoverable.checked = state.profile.discoverable;
        form.elements.showOnline.checked = state.profile.showOnline;
        select("[data-profile-name]").value = state.profile.displayName;
    }

    async function loadDiscovery() {
        const results = select("[data-student-results]");
        results.innerHTML = `<div class="community-skeleton"></div><div class="community-skeleton"></div><div class="community-skeleton"></div>`;
        const data = await api.discover({ ...state.filters, page: state.page, size: 9 });
        state.students = data.content || [];
        state.totalPages = Math.max(1, data.totalPages || 1);
        if (state.filters.sort === "shared" && state.profile?.interests?.length) {
            const own = new Set(state.profile.interests.map(i => i.toLowerCase()));
            state.students.sort((a, b) => (b.interests || []).filter(i => own.has(i.toLowerCase())).length - (a.interests || []).filter(i => own.has(i.toLowerCase())).length);
        }
        select("[data-discovery-count]").textContent = `${data.totalElements || 0} profiles`;
        results.innerHTML = state.students.length ? state.students.map(p => studentCard(p)).join("") : `<div class="community-empty-state"><span>✦</span><h3>No students found yet</h3><p>Try another filter, or make your own profile discoverable so classmates can find you.</p><button class="community-small-button is-primary" data-community-tab-link="profile">Set up my profile →</button></div>`;
        select("[data-page-label]").textContent = `Page ${state.page + 1} of ${state.totalPages}`;
        select("[data-page-prev]").disabled = state.page <= 0;
        select("[data-page-next]").disabled = state.page + 1 >= state.totalPages;
    }

    async function loadLists() {
        const [friends, incoming, outgoing, conversations, notifications] = await Promise.all([
            api.friends(), api.requests("incoming"), api.requests("outgoing"), api.conversations(), api.notifications()
        ]);
        state.friends = friends || [];
        state.incoming = incoming || [];
        state.outgoing = outgoing || [];
        state.conversations = conversations || [];
        state.notifications = notifications || [];
        renderFriends(); renderRequests(); renderConversations(); renderNotifications(); updateCounts();
    }

    function renderFriends() {
        const target = select("[data-friends-results]");
        target.innerHTML = state.friends.length ? state.friends.map(r => {
            const card = studentCard(r.student, "friend");
            return card.replace(`data-remove-friend=""`, `data-remove-friend="${r.id}"`);
        }).join("") : `<div class="community-empty-state"><span>◉</span><h3>Your circle is taking shape</h3><p>Discover students and send a request to start building your network.</p><button class="community-small-button is-primary" data-community-tab-link="discover">Discover students →</button></div>`;
    }

    function renderRequests() {
        select("[data-incoming-requests]").innerHTML = state.incoming.length ? state.incoming.map(r => studentCard(r.student)).join("") : `<p class="community-inline-empty">No incoming requests right now.</p>`;
        select("[data-outgoing-requests]").innerHTML = state.outgoing.length ? state.outgoing.map(r => `<article class="community-request-card">${avatar(r.student)}<span><b>${escapeHtml(r.student.displayName)}</b><small>@${escapeHtml(r.student.username)}</small></span><button class="community-small-button" data-cancel-request="${r.id}">Cancel</button></article>`).join("") : `<p class="community-inline-empty">No sent requests.</p>`;
    }

    function renderConversations(filter = "") {
        const target = select("[data-conversation-list]");
        const list = state.conversations.filter(c => !filter || c.student.displayName.toLowerCase().includes(filter.toLowerCase()));
        target.innerHTML = list.length ? list.map(c => `<button class="community-conversation-item${state.activeConversation?.id === c.id ? " is-active" : ""}" data-open-conversation="${c.id}">
            ${avatar(c.student)}<span class="community-conversation-copy"><b>${escapeHtml(c.student.displayName)}</b><small>${escapeHtml(c.lastMessage || "Start a conversation")}</small></span>
            <span class="community-conversation-end"><time>${escapeHtml(dateLabel(c.lastMessageAt))}</time>${c.unreadCount ? `<i>${c.unreadCount}</i>` : ""}</span></button>`).join("") : `<p class="community-inline-empty">No conversations yet. Connect with a student first.</p>`;
    }

    function renderNotifications() {
        const list = select("[data-notifications]");
        list.innerHTML = state.notifications.length ? state.notifications.map(n => `<button class="community-notification${n.read ? "" : " is-unread"}" data-notification-read="${n.id}">
            <span class="community-notification-icon">${n.type === "MESSAGE" ? "✉" : "↗"}</span><span><b>${escapeHtml(n.actorDisplayName || "Community")}</b><small>${escapeHtml(n.message)}</small></span><time>${escapeHtml(dateLabel(n.createdAt))}</time></button>`).join("") : `<div class="community-empty-state"><span>♧</span><h3>You’re all caught up</h3><p>New requests and messages will show here.</p></div>`;
    }

    function showProfile(person) {
        const dialog = select("[data-profile-dialog]");
        const rel = relationshipFor(person.userId);
        const action = rel.kind === "friend" ? `<button class="community-button community-button-primary" data-message-user="${person.userId}">Message →</button>` : rel.kind === "incoming" ? `<button class="community-button community-button-primary" data-accept-request="${rel.item.id}">Accept request</button>` : rel.kind === "outgoing" ? `<button class="community-small-button" disabled>Request sent</button>` : `<button class="community-button community-button-primary" data-add-friend="${person.userId}">Add friend ＋</button>`;
        select("[data-profile-detail]").innerHTML = `<div class="community-profile-cover"></div><div class="community-profile-body">${avatar(person, true)}<span class="community-kicker">STUDENT PROFILE</span><h2 id="community-profile-dialog-title">${escapeHtml(person.displayName)}</h2><p class="community-profile-handle">@${escapeHtml(person.username)}${person.online ? " · Online" : ""}</p>
            ${person.bio ? `<p class="community-profile-bio">${escapeHtml(person.bio)}</p>` : ""}<div class="community-profile-details">${person.course ? `<span>Course<strong>${escapeHtml(person.course)}</strong></span>` : ""}${person.university ? `<span>University<strong>${escapeHtml(person.university)}</strong></span>` : ""}${person.country ? `<span>Country / region<strong>${escapeHtml(person.country)}</strong></span>` : ""}</div>
            ${(person.interests || []).length ? `<div class="community-interest-list">${person.interests.map(i => `<span class="community-interest-tag">${escapeHtml(i)}</span>`).join("")}</div>` : ""}<div class="community-profile-actions">${action}<button class="community-small-button" data-report-user="${person.userId}">Report</button><button class="community-small-button is-danger" data-block-user="${person.userId}">Block</button></div></div>`;
        dialog.showModal();
    }

    function renderChat() {
        const target = select("[data-chat-window]");
        if (!state.activeConversation) {
            target.innerHTML = `<div class="community-chat-empty"><span>✉</span><h3>Your conversations start here</h3><p>Choose a friend to open a private chat.</p><button class="community-button community-button-glass" data-community-tab-link="friends">View my friends →</button></div>`;
            return;
        }
        const c = state.activeConversation;
        const previousList = select("[data-message-list]");
        const previousHeight = previousList?.scrollHeight || 0;
        const previousTop = previousList?.scrollTop || 0;
        const nearBottom = !previousList || previousHeight - previousTop - previousList.clientHeight < 100;
        target.innerHTML = `<header class="community-chat-header">${avatar(c.student)}<span><b>${escapeHtml(c.student.displayName)}</b><small>${c.student.online ? "Online now" : "Private conversation"}</small></span><button class="community-icon-button" data-view-profile="${escapeHtml(c.student.username)}" aria-label="View student profile">↗</button></header>
            <div class="community-message-list" data-message-list aria-live="polite">${state.hasOlderMessages ? `<button class="community-load-older" data-load-older>Load earlier messages</button>` : ""}${state.messages.length ? state.messages.map(m => `<article class="community-message${m.senderId === state.profile.userId ? " is-outgoing" : " is-incoming"}" data-message-id="${m.id}"><p>${escapeHtml(m.content)}</p><time>${escapeHtml(dateLabel(m.createdAt))}${m.senderId === state.profile.userId && m.readAt ? " · Read" : ""}</time></article>`).join("") : `<div class="community-chat-empty"><span>✧</span><h3>Say hello</h3><p>Your conversation is private to you and ${escapeHtml(c.student.displayName)}.</p></div>`}</div>
            <form class="community-message-form" data-send-message><label><span class="visually-hidden">Write a message</span><textarea name="content" rows="1" maxlength="4000" placeholder="Write a message… Shift+Enter for a new line" required></textarea></label><button type="submit" aria-label="Send message">➤</button></form>`;
        const list = select("[data-message-list]");
        if (nearBottom) list.scrollTop = list.scrollHeight;
        else list.scrollTop = previousTop;
    }

    function setTab(name) {
        root.querySelectorAll("[data-community-tab]").forEach(button => {
            const active = button.dataset.communityTab === name;
            button.classList.toggle("is-active", active); button.setAttribute("aria-current", active ? "page" : "false");
        });
        root.querySelectorAll("[data-panel]").forEach(panel => {
            const active = panel.dataset.panel === name;
            panel.classList.toggle("is-active", active); panel.hidden = !active;
        });
        if (name === "messages") renderChat();
    }

    async function refreshMessages() {
        if (!state.activeConversation || !select('[data-panel="messages"]').classList.contains("is-active")) return;
        const lastId = state.messages.at(-1)?.id || 0;
        const fresh = await api.messages(state.activeConversation.id, lastId);
        if (fresh.length) {
            const known = new Set(state.messages.map(m => m.id));
            state.messages.push(...fresh.filter(m => !known.has(m.id)));
            state.activeConversation.unreadCount = 0;
            renderChat();
            await loadLists();
        }
    }

    root.addEventListener("click", async (event) => {
        const retryGroup = event.target.closest("[data-community-chat-retry]");
        if (retryGroup) { await loadCommunityMessages(); return; }
        const olderGroup = event.target.closest("[data-community-chat-older]");
        if (olderGroup && state.communityMessages.length) {
            olderGroup.disabled = true;
            await loadCommunityMessages({ beforeId: state.communityMessages[0].id });
            return;
        }
        const tab = event.target.closest("[data-community-tab], [data-community-tab-link]");
        if (tab) {
            const name = tab.dataset.communityTab || tab.dataset.communityTabLink;
            setTab(name);
            if (name === "community-chat" && !state.communityMessages.length) await loadCommunityMessages();
            if (name !== "community-chat" && !state.profile) {
                try {
                    await loadProfile();
                    await Promise.allSettled([loadLists(), loadDiscovery()]);
                    api.heartbeat().catch(() => {});
                } catch {
                    if (name === "discover") select("[data-student-results]").innerHTML = `<div class="community-empty-state"><span>✦</span><h3>Student discovery is unavailable</h3><p>Community Chat is open to all signed-in EduConnect members. Student discovery tools require a student profile.</p></div>`;
                }
            }
            return;
        }
        const add = event.target.closest("[data-add-friend]");
        if (add && await run(() => api.sendRequest(Number(add.dataset.addFriend)), "Friend request sent.")) { await loadLists(); await loadDiscovery(); return; }
        const accept = event.target.closest("[data-accept-request]");
        if (accept && await run(() => api.respond(Number(accept.dataset.acceptRequest), "accept"), "You’re connected.")) { await loadLists(); await loadDiscovery(); return; }
        const reject = event.target.closest("[data-reject-request]");
        if (reject && await run(() => api.respond(Number(reject.dataset.rejectRequest), "reject"), "Request declined.")) { await loadLists(); return; }
        const cancel = event.target.closest("[data-cancel-request]");
        if (cancel && await run(() => api.respond(Number(cancel.dataset.cancelRequest), "cancel"), "Request cancelled.")) { await loadLists(); await loadDiscovery(); return; }
        const remove = event.target.closest("[data-remove-friend]");
        if (remove && confirm("Remove this student from your friends?")) { if (await run(() => api.removeFriend(Number(remove.dataset.removeFriend)), "Connection removed.")) await loadLists(); return; }
        const message = event.target.closest("[data-message-user]");
        if (message) {
            if (await run(async () => { state.activeConversation = await api.openConversation(Number(message.dataset.messageUser)); state.messages = await api.messages(state.activeConversation.id); state.hasOlderMessages = state.messages.length >= 60; setTab("messages"); renderChat(); }, "")) await loadLists();
            return;
        }
        const open = event.target.closest("[data-open-conversation]");
        if (open) {
            const id = Number(open.dataset.openConversation);
            state.activeConversation = state.conversations.find(c => c.id === id); state.messages = [];
            if (await run(async () => { state.messages = await api.messages(id); state.hasOlderMessages = state.messages.length >= 60; setTab("messages"); renderConversations(); renderChat(); }, "")) await loadLists();
            return;
        }
        const view = event.target.closest("[data-view-profile]");
        if (view) {
            const cached = [...state.students, ...state.friends.map(x => x.student), ...state.incoming.map(x => x.student), ...state.outgoing.map(x => x.student), ...state.conversations.map(x => x.student)].find(p => p.username === view.dataset.viewProfile);
            if (cached) showProfile(cached);
            else await run(async () => { showProfile(await api.profile(view.dataset.viewProfile)); }, "");
            return;
        }
        const older = event.target.closest("[data-load-older]");
        if (older && state.activeConversation && state.messages.length) {
            const list = select("[data-message-list]");
            const previousHeight = list.scrollHeight;
            const previousTop = list.scrollTop;
            older.disabled = true;
            let earlier = [];
            const loaded = await run(async () => { earlier = await api.messages(state.activeConversation.id, null, state.messages[0].id); });
            if (loaded) {
                state.hasOlderMessages = earlier.length >= 60;
                state.messages = [...earlier, ...state.messages];
                renderChat();
                const nextList = select("[data-message-list]");
                nextList.scrollTop = nextList.scrollHeight - previousHeight + previousTop;
            } else older.disabled = false;
            return;
        }
        const block = event.target.closest("[data-block-user]");
        if (block && confirm("Block this student? They will no longer be able to connect or message you.")) {
            if (await run(() => api.block(Number(block.dataset.blockUser)), "Student blocked.")) { select("[data-profile-dialog]").close(); await loadLists(); await loadDiscovery(); }
            return;
        }
        const report = event.target.closest("[data-report-user]");
        if (report) {
            const reason = prompt("Tell us why you are reporting this profile (do not include private contact details):");
            if (reason && await run(() => api.report(Number(report.dataset.reportUser), reason), "Report sent to the moderation queue.")) select("[data-profile-dialog]").close();
            return;
        }
        const read = event.target.closest("[data-notification-read]");
        if (read) { await run(() => api.markRead(Number(read.dataset.notificationRead))); await loadLists(); return; }
    });

    select("[data-profile-close]").addEventListener("click", () => select("[data-profile-dialog]").close());
    select("[data-profile-dialog]").addEventListener("click", event => { if (event.target === select("[data-profile-dialog]")) select("[data-profile-dialog]").close(); });
    select(".community-search-form").addEventListener("submit", async event => {
        event.preventDefault(); state.page = 0;
        state.filters = Object.fromEntries(new FormData(event.currentTarget).entries());
        await run(() => loadDiscovery());
    });
    select("[data-page-prev]").addEventListener("click", async () => { state.page = Math.max(0, state.page - 1); await run(() => loadDiscovery()); });
    select("[data-page-next]").addEventListener("click", async () => { if (state.page + 1 < state.totalPages) state.page += 1; await run(() => loadDiscovery()); });
    select("[data-conversation-search]").addEventListener("input", event => renderConversations(event.target.value));
    select("[data-mark-all-read]").addEventListener("click", async () => { if (await run(() => api.markAllRead(), "Notifications marked as read.")) await loadLists(); });

    select("[data-profile-form]").addEventListener("submit", async event => {
        event.preventDefault(); const form = event.currentTarget; const feedback = select(".community-form-feedback");
        const payload = { username: form.elements.username.value, bio: form.elements.bio.value, university: form.elements.university.value, course: form.elements.course.value, country: form.elements.country.value, interests: form.elements.interests.value, discoverable: form.elements.discoverable.checked, showOnline: form.elements.showOnline.checked };
        try { state.profile = await api.updateProfile(payload); feedback.textContent = "Profile saved."; feedback.classList.add("is-success"); select("[data-my-course]").textContent = state.profile.course || (state.profile.discoverable ? "Discoverable student" : "Profile hidden from discovery"); await loadDiscovery(); }
        catch (error) { feedback.textContent = error.message; feedback.classList.remove("is-success"); }
    });

    select("[data-community-chat-form]").addEventListener("submit", async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const textarea = form.elements.content;
        const content = textarea.value.trim();
        if (!content) return;
        const send = form.querySelector("button[type=submit]");
        send.disabled = true;
        try {
            const message = await api.sendCommunityChatMessage(content);
            state.communityMessages.push(message);
            renderCommunityMessages();
            textarea.value = "";
            textarea.focus();
        } catch (error) {
            toast(error.message || "Message could not be sent. Please try again.", true);
        } finally {
            send.disabled = false;
        }
    });
    select("[data-community-chat-form]").addEventListener("keydown", event => {
        if (event.target.matches("textarea") && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.target.closest("form").requestSubmit();
        }
    });

    select("[data-chat-window]").addEventListener("submit", async event => {
        if (!event.target.matches("[data-send-message]")) return;
        event.preventDefault(); const textarea = event.target.elements.content; const content = textarea.value.trim();
        if (!content || !state.activeConversation) return;
        const button = event.target.querySelector("button"); button.disabled = true;
        try { const sent = await api.sendMessage(state.activeConversation.id, content); state.messages.push(sent); renderChat(); await loadLists(); }
        catch (error) { toast(error.message, true); }
        finally { const next = select('[data-send-message] textarea'); if (next) next.focus(); const send = select('[data-send-message] button'); if (send) send.disabled = false; }
    });
    select("[data-chat-window]").addEventListener("keydown", event => {
        if (event.target.matches("[data-send-message] textarea") && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); event.target.closest("form").requestSubmit();
        }
    });

    async function start() {
        const user = signedInUser || {};
        if (user.fullName) {
            select("[data-my-name]").textContent = user.fullName;
            select("[data-my-avatar]").textContent = initials(user.fullName);
        }
        select("[data-my-course]").textContent = "Community member";
        updateCounts();
        await loadCommunityMessages();
        state.timer = window.setInterval(async () => {
            await refreshCommunityMessages();
            if (state.profile) {
                api.heartbeat().catch(() => {});
                try { await refreshMessages(); await loadLists(); } catch { /* Preserve the chat if private tools are temporarily unavailable. */ }
            }
        }, 10000);
    }
    window.addEventListener("pagehide", () => clearInterval(state.timer), { once: true });
    start();
}

export default initCommunityPage;
