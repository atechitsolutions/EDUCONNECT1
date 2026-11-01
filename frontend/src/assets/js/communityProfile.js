import { feedApi } from "../../services/feedService.js";

const esc = (value = "") =>
    String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);

const initials = (name = "Student") =>
    String(name).trim().split(/\s+/).slice(0, 2).map(p => p[0] || "").join("").toUpperCase() || "S";

const compact = n => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n || 0);
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = window.matchMedia("(pointer: fine)").matches;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function initCommunityProfile(root) {
    const host = root.querySelector("[data-profile-root]");
    if (!host || host.dataset.ready) return;
    host.dataset.ready = "true";

    const state = {
        username: "me", started: false, navigating: false, gen: 0,
        p: null, tab: "posts", posts: [], page: 0, last: true, loading: false,
        people: { kind: "followers", page: 0, last: true, loading: false },
        edit: { avatar: null, cover: null, removeAvatar: false, removeCover: false }
    };
    const blobs = new Map();
    const blobUrl = path => {
        if (!blobs.has(path)) blobs.set(path, feedApi.image(path));
        return blobs.get(path);
    };

    host.innerHTML = `
        <div class="pf-root" data-pf>
            <section class="pf-hero" data-pf-hero>
                <div class="pf-cover" data-pf-cover>
                    <span class="pf-shape pf-cube" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
                    <span class="pf-shape pf-ring" aria-hidden="true"></span>
                    <span class="pf-shape pf-orb pf-orb-a" aria-hidden="true"></span>
                    <span class="pf-shape pf-orb pf-orb-b" aria-hidden="true"></span>
                    <span class="pf-particles" data-pf-particles aria-hidden="true"></span>
                </div>
                <div class="pf-head pf-glass" data-pf-head></div>
            </section>
            <nav class="pf-tabs" data-pf-tabs aria-label="Profile sections">
                <button type="button" class="is-active" data-pf-tab="posts">▦ Posts</button>
                <button type="button" data-pf-tab="liked" data-own-only>♥ Liked</button>
                <button type="button" data-pf-tab="saved" data-own-only>★ Saved</button>
                <span class="pf-tab-ind" data-pf-ind></span>
            </nav>
            <section class="pf-grid-wrap" data-pf-grid-wrap>
                <div class="pf-grid" data-pf-grid></div>
                <div class="pf-more" data-pf-grid-more hidden><button type="button" class="pf-btn" data-pf-load-more>Load more</button></div>
            </section>

            <dialog class="pf-modal pf-people" data-pf-people aria-labelledby="pf-people-title">
                <header><h3 id="pf-people-title" data-pf-people-title>Followers</h3><button type="button" class="pf-x" data-pf-close aria-label="Close">×</button></header>
                <div class="pf-people-list" data-pf-people-list></div>
                <div class="pf-more" data-pf-people-more hidden><button type="button" class="pf-btn" data-pf-people-load>Load more</button></div>
            </dialog>

            <dialog class="pf-modal pf-edit" data-pf-edit-dialog aria-labelledby="pf-edit-title">
                <form data-pf-edit-form>
                    <header><h3 id="pf-edit-title">Edit profile</h3><button type="button" class="pf-x" data-pf-close aria-label="Close">×</button></header>
                    <div class="pf-edit-body">
                        <div class="pf-edit-cover" data-pf-edit-cover>
                            <div class="pf-edit-cover-actions">
                                <label class="pf-btn pf-btn-glass">Change cover<input type="file" accept="image/png,image/jpeg,image/webp" data-pf-cover-input hidden></label>
                                <button type="button" class="pf-btn pf-btn-glass" data-pf-remove-cover>Remove</button>
                            </div>
                        </div>
                        <div class="pf-edit-avatar-row">
                            <span class="pf-avatar pf-avatar-sm" data-pf-edit-avatar></span>
                            <label class="pf-btn pf-btn-glass">Change photo<input type="file" accept="image/png,image/jpeg,image/webp" data-pf-avatar-input hidden></label>
                            <button type="button" class="pf-btn pf-btn-glass" data-pf-remove-avatar>Remove</button>
                        </div>
                        <div class="pf-fields">
                            <label>Display name<input name="displayName" maxlength="80" required></label>
                            <label>Username<input name="username" minlength="3" maxlength="40" pattern="[a-zA-Z0-9_]{3,40}" required></label>
                            <label class="pf-wide">Bio<textarea name="bio" rows="3" maxlength="500" placeholder="What are you studying or working toward?"></textarea></label>
                            <label>University / college<input name="university" maxlength="160"></label>
                            <label>Course / field<input name="course" maxlength="160"></label>
                            <label>Country or region<input name="country" maxlength="100"></label>
                            <label>Interests <small>(comma separated)</small><input name="interests" maxlength="500" placeholder="AI, design, research"></label>
                            <label class="pf-toggle pf-wide"><input type="checkbox" name="discoverable"><span><b>Show my profile in student discovery</b><small>Other students can find and follow you.</small></span></label>
                            <label class="pf-toggle pf-wide"><input type="checkbox" name="showOnline"><span><b>Share my online status</b><small>Shows a green dot while you are active.</small></span></label>
                        </div>
                        <p class="pf-error" data-pf-edit-error role="alert" hidden></p>
                    </div>
                    <footer><button type="button" class="pf-btn pf-btn-glass" data-pf-close>Cancel</button><button type="submit" class="pf-btn pf-btn-primary">Save changes</button></footer>
                </form>
            </dialog>
            <div class="pf-sr" aria-live="polite" data-pf-live></div>
        </div>`;

    const $ = s => host.querySelector(s);
    const $$ = s => [...host.querySelectorAll(s)];

    const toast = (message, error = false) => {
        const node = root.querySelector("[data-community-toast]");
        if (!node) return;
        node.textContent = message;
        node.classList.toggle("is-error", error);
        node.classList.add("is-visible");
        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => node.classList.remove("is-visible"), 3400);
    };
    const attempt = async (action, success) => {
        try { const r = await action(); if (success) toast(success); return r ?? true; }
        catch (error) { toast(error.message || "Something went wrong.", true); return false; }
    };

    // particles (cheap, transform/opacity animation only)
    $("[data-pf-particles]").innerHTML = Array.from({ length: 16 }, (_, i) =>
        `<i style="left:${(i * 37) % 100}%;top:${(i * 53) % 100}%;--s:${4 + (i % 4) * 2}px;--d:${6 + (i % 5) * 2}s;--delay:${(i % 7) * -1.3}s"></i>`).join("");

    // ---------------------------------------------------------- images
    const loadImages = scope => scope.querySelectorAll("img[data-pf-src]:not([src])").forEach(async img => {
        try { img.src = await blobUrl(img.dataset.pfSrc); img.classList.add("is-loaded"); }
        catch { img.remove(); }
    });
    const lazy = "IntersectionObserver" in window ? new IntersectionObserver(entries => entries.forEach(async entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target; lazy.unobserve(img);
        try { img.src = await blobUrl(img.dataset.pfLazy); img.classList.add("is-loaded"); } catch { img.remove(); }
    }), { rootMargin: "240px" }) : null;
    const watchLazy = scope => scope.querySelectorAll("img[data-pf-lazy]:not([src])").forEach(img => {
        if (lazy) lazy.observe(img); else blobUrl(img.dataset.pfLazy).then(u => { img.src = u; });
    });
    const avatarInner = (person, cls = "") => person.avatarUrl
        ? `<img data-pf-src="${esc(person.avatarUrl)}" alt="" class="${cls}"><b>${esc(initials(person.displayName))}</b>`
        : `<b>${esc(initials(person.displayName))}</b>`;

    // ---------------------------------------------------------- effects
    const countUp = (el, to) => {
        const from = Number(el.dataset.value || 0);
        el.dataset.value = to;
        if (REDUCED || from === to) { el.textContent = compact(to); return; }
        const start = performance.now(), duration = 650;
        const tick = now => {
            const t = Math.min(1, (now - start) / duration);
            el.textContent = compact(Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if (FINE_POINTER && !REDUCED) {
        host.addEventListener("pointermove", event => {
            const tilt = event.target.closest("[data-tilt]");
            if (tilt) {
                const r = tilt.getBoundingClientRect();
                const x = (event.clientX - r.left) / r.width - .5, y = (event.clientY - r.top) / r.height - .5;
                tilt.style.setProperty("--ry", `${x * 7}deg`); tilt.style.setProperty("--rx", `${-y * 7}deg`);
                tilt.style.setProperty("--mx", `${(x + .5) * 100}%`); tilt.style.setProperty("--my", `${(y + .5) * 100}%`);
            }
            const mag = event.target.closest(".pf-magnetic");
            if (mag) {
                const r = mag.getBoundingClientRect();
                mag.style.transform = `translate(${(event.clientX - r.left - r.width / 2) * .18}px, ${(event.clientY - r.top - r.height / 2) * .22}px)`;
            }
            const hero = event.target.closest("[data-pf-hero]");
            if (hero) {
                const r = hero.getBoundingClientRect();
                hero.style.setProperty("--px", `${((event.clientX - r.left) / r.width - .5) * 24}px`);
                hero.style.setProperty("--py", `${((event.clientY - r.top) / r.height - .5) * 16}px`);
            }
        });
        host.addEventListener("pointerout", event => {
            const tilt = event.target.closest("[data-tilt]");
            if (tilt && !tilt.contains(event.relatedTarget)) { tilt.style.setProperty("--rx", "0deg"); tilt.style.setProperty("--ry", "0deg"); }
            const mag = event.target.closest(".pf-magnetic");
            if (mag && !mag.contains(event.relatedTarget)) mag.style.transform = "";
        });
    }
    const reveal = "IntersectionObserver" in window ? new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); reveal.unobserve(e.target); }
    }), { threshold: .08 }) : null;
    const watchReveal = scope => scope.querySelectorAll(".pf-reveal:not(.is-in)").forEach(el => reveal ? reveal.observe(el) : el.classList.add("is-in"));

    const moveIndicator = () => {
        const active = $(".pf-tabs button.is-active"), ind = $("[data-pf-ind]");
        if (!active || !ind) return;
        ind.style.width = `${active.offsetWidth}px`;
        ind.style.transform = `translateX(${active.offsetLeft}px)`;
    };
    window.addEventListener("resize", moveIndicator);

    // ---------------------------------------------------------- header
    function renderHeader() {
        const p = state.p;
        const cover = $("[data-pf-cover]");
        cover.style.backgroundImage = "";
        cover.classList.remove("has-image");
        if (p.coverUrl) blobUrl(p.coverUrl).then(url => {
            if (state.p !== p) return;
            cover.style.backgroundImage = `linear-gradient(180deg, rgba(17,17,36,.15), rgba(17,17,36,.6)), url("${url}")`;
            cover.classList.add("has-image");
        }).catch(() => {});

        const stat = (key, label, value, clickable = true) => `
            <button type="button" class="pf-stat" data-pf-stat="${key}" ${clickable ? "" : "disabled"}>
                <strong data-count data-value="0">0</strong><span>${label}</span>
            </button>`;

        let actions;
        if (p.me) {
            actions = `
                <button type="button" class="pf-btn pf-btn-primary pf-magnetic" data-pf-edit>✎ Edit profile</button>
                <button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-pf-share>↗ Share profile</button>
                <button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-pf-newpost>＋ New post</button>`;
        } else {
            const friend = {
                FRIEND: `<button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-message-user="${p.userId}">✉ Message</button>`,
                NONE: `<button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-add-friend="${p.userId}">＋ Add friend</button>`,
                OUTGOING: `<button type="button" class="pf-btn pf-btn-glass" disabled>Request sent</button>`,
                INCOMING: `<button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-accept-request="${p.friendshipId}">Accept request</button>`
            }[p.friendStatus] || "";
            actions = `
                <button type="button" class="pf-btn ${p.following ? "pf-btn-glass is-following" : "pf-btn-primary"} pf-magnetic" data-pf-follow aria-pressed="${p.following}">
                    ${p.following ? "Following" : (p.followsMe ? "Follow back" : "Follow")}
                </button>
                ${friend}
                <button type="button" class="pf-btn pf-btn-glass pf-magnetic" data-pf-share>↗ Share</button>`;
        }

        $("[data-pf-head]").innerHTML = `
            <div class="pf-avatar-ring pf-spin" data-tilt>
                <span class="pf-avatar">${avatarInner(p)}</span>
                ${p.online ? `<i class="pf-online" title="Online"></i>` : ""}
            </div>
            <div class="pf-info">
                <div class="pf-title">
                    <h2>${esc(p.displayName)}</h2>
                    <span class="pf-handle">@${esc(p.username)}</span>
                    ${p.online ? `<span class="pf-chip pf-chip-online">● Online</span>` : ""}
                </div>
                <div class="pf-stats">
                    ${stat("posts", "Posts", p.postCount)}
                    ${stat("followers", "Followers", p.followerCount)}
                    ${stat("following", "Following", p.followingCount)}
                </div>
                ${p.bio ? `<p class="pf-bio">${esc(p.bio)}</p>` : (p.me ? `<p class="pf-bio is-muted">Add a short bio so students know what you are working toward.</p>` : "")}
                <div class="pf-meta">
                    ${p.course ? `<span class="pf-chip">◈ ${esc(p.course)}</span>` : ""}
                    ${p.university ? `<span class="pf-chip">⌂ ${esc(p.university)}</span>` : ""}
                    ${p.country ? `<span class="pf-chip">◎ ${esc(p.country)}</span>` : ""}
                </div>
                ${p.interests.length ? `<div class="pf-interests">${p.interests.map(i => `<span>${esc(i)}</span>`).join("")}</div>` : ""}
                <div class="pf-actions">
                    ${actions}
                    <div class="pf-more-wrap">
                        <button type="button" class="pf-btn pf-btn-glass pf-icon" data-pf-more aria-label="More options" aria-haspopup="true">⋯</button>
                        <div class="pf-menu" data-pf-menu hidden>
                            <button type="button" data-pf-share>Copy profile link</button>
                            ${p.me
                                ? `<button type="button" data-pf-edit>Privacy & edit settings</button>`
                                : `<button type="button" data-report-user="${p.userId}">Report profile</button>
                                   <button type="button" class="is-danger" data-block-user="${p.userId}">Block student</button>`}
                        </div>
                    </div>
                </div>
            </div>`;
        loadImages($("[data-pf-head]"));
        $$("[data-pf-stat] [data-count]").forEach((el, i) => countUp(el, [p.postCount, p.followerCount, p.followingCount][i]));
        $$("[data-own-only]").forEach(b => { b.hidden = !p.me; });
        moveIndicator();
    }

    // ---------------------------------------------------------- posts grid
    const skeletonGrid = () => Array.from({ length: 6 }, () => `<div class="pf-post is-skeleton"></div>`).join("");

    const emptyState = () => {
        const mine = state.p?.me;
        const text = {
            posts: [mine ? "You haven't posted yet" : "No posts to show", mine ? "Share a project, idea or question with the community." : "Posts you are allowed to see will appear here."],
            liked: ["No liked posts yet", "Posts you like will be collected here."],
            saved: ["Nothing saved yet", "Save posts from the feed to read them later."]
        }[state.tab];
        return `<div class="pf-empty"><span>✦</span><h3>${text[0]}</h3><p>${text[1]}</p>${mine && state.tab === "posts" ? `<button type="button" class="pf-btn pf-btn-primary" data-pf-newpost>Create your first post</button>` : ""}</div>`;
    };

    const postCard = post => {
        const first = post.images[0];
        const caption = esc((post.content || "").slice(0, 120));
        return `
            <article class="pf-post pf-reveal" data-tilt data-pf-post="${post.id}" tabindex="0" role="button" aria-label="Open post">
                ${first ? `<img data-pf-lazy="${esc(first)}" alt="" loading="lazy">` : `<div class="pf-post-text"><p>${caption || "Post"}</p></div>`}
                ${post.images.length > 1 ? `<span class="pf-multi" title="${post.images.length} images">❐</span>` : ""}
                <div class="pf-post-overlay">
                    <div class="pf-post-stats"><span>♥ ${compact(post.likeCount)}</span><span>💬 ${compact(post.commentCount)}</span></div>
                    ${first && caption ? `<p>${caption}</p>` : ""}
                    <b>View post →</b>
                </div>
            </article>`;
    };

    async function loadPosts(reset = false) {
        if (state.loading || !state.p) return;
        state.loading = true;
        const gen = state.gen;
        const grid = $("[data-pf-grid]");
        if (reset) { state.page = 0; state.posts = []; grid.innerHTML = skeletonGrid(); $("[data-pf-grid-more]").hidden = true; }
        try {
            const result = await feedApi.profilePosts(state.p.username, state.tab, state.page);
            if (gen !== state.gen) return;
            if (reset) grid.innerHTML = "";
            state.posts = state.posts.concat(result.content);
            state.last = result.page >= result.totalPages - 1;
            if (!state.posts.length) grid.innerHTML = emptyState();
            else {
                grid.insertAdjacentHTML("beforeend", result.content.map(postCard).join(""));
                watchLazy(grid); watchReveal(grid);
            }
            $("[data-pf-grid-more]").hidden = state.last;
        } catch (error) {
            if (gen !== state.gen) return;
            grid.innerHTML = `<div class="pf-empty is-error"><span>!</span><h3>Could not load posts</h3><p>${esc(error.message)}</p><button type="button" class="pf-btn pf-btn-primary" data-pf-retry>Try again</button></div>`;
        } finally { if (gen === state.gen) state.loading = false; }
    }

    // ---------------------------------------------------------- loading a profile
    async function load(username = state.username) {
        state.username = username;
        const gen = ++state.gen;
        state.loading = false;
        state.tab = "posts";
        $$("[data-pf-tab]").forEach(b => b.classList.toggle("is-active", b.dataset.pfTab === "posts"));
        $("[data-pf-head]").innerHTML = `<div class="pf-skel-head"><i></i><div><b></b><b></b><b></b></div></div>`;
        $("[data-pf-grid]").innerHTML = skeletonGrid();
        $("[data-pf-grid-more]").hidden = true;
        try {
            const p = await feedApi.profile(username);
            if (gen !== state.gen) return;
            state.p = p;
            renderHeader();
            loadPosts(true);
        } catch (error) {
            if (gen !== state.gen) return;
            state.p = null;
            $("[data-pf-head]").innerHTML = `<div class="pf-empty is-error"><span>!</span><h3>Profile unavailable</h3><p>${esc(error.message)}</p><button type="button" class="pf-btn pf-btn-primary" data-pf-home>Back to my profile</button></div>`;
            $("[data-pf-grid]").innerHTML = "";
        }
    }

    // quietly refresh counts / buttons without reloading the grid
    async function refreshDetail() {
        if (!state.p) return;
        try { state.p = await feedApi.profile(state.p.username); renderHeader(); } catch { /* keep current view */ }
    }

    // ---------------------------------------------------------- followers / following
    const personRow = person => {
        let button = "";
        if (!person.me) {
            button = person.following
                ? `<button type="button" class="pf-btn pf-btn-glass pf-small" data-pf-toggle-follow="${esc(person.username)}" data-state="following">${state.people.kind === "following" && state.p?.me ? "Unfollow" : "Following"}</button>`
                : `<button type="button" class="pf-btn pf-btn-primary pf-small" data-pf-toggle-follow="${esc(person.username)}" data-state="none">${person.followsMe ? "Follow back" : "Follow"}</button>`;
        }
        return `
            <div class="pf-person" data-pf-person="${esc(person.username)}">
                <button type="button" class="pf-person-main" data-pf-open-user="${esc(person.username)}">
                    <span class="pf-avatar pf-avatar-sm">${avatarInner(person)}</span>
                    <span><b>${esc(person.displayName)}</b><small>@${esc(person.username)}</small>${person.bio ? `<em>${esc(person.bio.slice(0, 70))}</em>` : ""}</span>
                </button>
                ${button}
            </div>`;
    };

    async function loadPeople(reset = false) {
        const box = state.people;
        if (box.loading || !state.p) return;
        box.loading = true;
        const list = $("[data-pf-people-list]");
        if (reset) { box.page = 0; list.innerHTML = `<div class="pf-person is-skeleton"></div>`.repeat(4); $("[data-pf-people-more]").hidden = true; }
        try {
            const result = await (box.kind === "followers" ? feedApi.followers : feedApi.following)(state.p.username, box.page);
            if (reset) list.innerHTML = "";
            if (reset && !result.content.length) list.innerHTML = `<div class="pf-empty"><span>✦</span><h3>${box.kind === "followers" ? "No followers yet" : "Not following anyone yet"}</h3></div>`;
            list.insertAdjacentHTML("beforeend", result.content.map(personRow).join(""));
            loadImages(list);
            box.last = result.page >= result.totalPages - 1;
            $("[data-pf-people-more]").hidden = box.last;
        } catch (error) { list.innerHTML = `<p class="pf-error">${esc(error.message)}</p>`; }
        finally { box.loading = false; }
    }

    function openPeople(kind) {
        if (!state.p) return;
        state.people.kind = kind;
        $("[data-pf-people-title]").textContent = kind === "followers" ? "Followers" : "Following";
        $("[data-pf-people]").showModal();
        loadPeople(true);
    }

    // ---------------------------------------------------------- edit profile
    function fillEdit() {
        const p = state.p, f = $("[data-pf-edit-form]");
        state.edit = { avatar: null, cover: null, removeAvatar: false, removeCover: false };
        f.elements.displayName.value = p.displayName || "";
        f.elements.username.value = p.username || "";
        f.elements.bio.value = p.bio || "";
        f.elements.university.value = p.university || "";
        f.elements.course.value = p.course || "";
        f.elements.country.value = p.country || "";
        f.elements.interests.value = (p.interests || []).join(", ");
        f.elements.discoverable.checked = p.discoverable;
        f.elements.showOnline.checked = p.showOnline;
        $("[data-pf-edit-error]").hidden = true;
        paintEditImages();
    }
    function paintEditImages() {
        const p = state.p, e = state.edit;
        const avatarBox = $("[data-pf-edit-avatar]"), coverBox = $("[data-pf-edit-cover]");
        avatarBox.innerHTML = e.avatar ? `<img src="${URL.createObjectURL(e.avatar)}" alt="" class="is-loaded"><b>${esc(initials(p.displayName))}</b>`
            : (!e.removeAvatar && p.avatarUrl ? avatarInner(p) : `<b>${esc(initials(p.displayName))}</b>`);
        loadImages(avatarBox);
        coverBox.style.backgroundImage = "";
        if (e.cover) coverBox.style.backgroundImage = `url("${URL.createObjectURL(e.cover)}")`;
        else if (!e.removeCover && p.coverUrl) blobUrl(p.coverUrl).then(u => { coverBox.style.backgroundImage = `url("${u}")`; }).catch(() => {});
    }
    const pickImage = (input, key) => {
        const file = input.files[0]; input.value = "";
        if (!file) return;
        if (!IMAGE_TYPES.includes(file.type)) return toast("Use a JPEG, PNG or WebP image.", true);
        if (file.size > MAX_IMAGE_BYTES) return toast("Images must be 5 MB or smaller.", true);
        state.edit[key] = file; state.edit[key === "avatar" ? "removeAvatar" : "removeCover"] = false;
        paintEditImages();
    };
    $("[data-pf-avatar-input]").addEventListener("change", e => pickImage(e.target, "avatar"));
    $("[data-pf-cover-input]").addEventListener("change", e => pickImage(e.target, "cover"));

    $("[data-pf-edit-form]").addEventListener("submit", async event => {
        event.preventDefault();
        const f = event.currentTarget, error = $("[data-pf-edit-error]"), submit = f.querySelector('[type="submit"]');
        const data = new FormData();
        ["displayName", "username", "bio", "university", "course", "country", "interests"].forEach(k => data.append(k, f.elements[k].value.trim()));
        data.append("discoverable", f.elements.discoverable.checked);
        data.append("showOnline", f.elements.showOnline.checked);
        data.append("removeAvatar", state.edit.removeAvatar);
        data.append("removeCover", state.edit.removeCover);
        if (state.edit.avatar) data.append("avatar", state.edit.avatar);
        if (state.edit.cover) data.append("cover", state.edit.cover);
        submit.disabled = true; submit.textContent = "Saving…";
        try {
            state.p = await feedApi.updateProfile(data);
            blobs.clear();
            $("[data-pf-edit-dialog]").close();
            renderHeader();
            // keep the existing sidebar in sync
            const nameNode = root.querySelector("[data-my-name]"), avatarNode = root.querySelector("[data-my-avatar]"), courseNode = root.querySelector("[data-my-course]");
            if (nameNode) nameNode.textContent = state.p.displayName;
            if (avatarNode) avatarNode.textContent = initials(state.p.displayName);
            if (courseNode) courseNode.textContent = state.p.course || (state.p.discoverable ? "Discoverable student" : "Profile hidden from discovery");
            toast("Profile updated.");
        } catch (err) { error.textContent = err.message || "Could not save your profile."; error.hidden = false; }
        finally { submit.disabled = false; submit.textContent = "Save changes"; }
    });

    // ---------------------------------------------------------- share
    async function shareProfile() {
        if (!state.p) return;
        const link = `${location.origin}/community?profile=${encodeURIComponent(state.p.username)}`;
        if (navigator.share) { try { await navigator.share({ title: `${state.p.displayName} on EduConnect`, url: link }); return; } catch { /* cancelled */ } }
        try { await navigator.clipboard.writeText(link); toast("Profile link copied."); } catch { toast(link); }
    }

    // ---------------------------------------------------------- events
    host.addEventListener("click", async event => {
        const t = event.target;
        if (!t.closest("[data-pf-more]")) $$("[data-pf-menu]").forEach(m => { m.hidden = true; });
        const dialog = $("[data-pf-people]");
        if (t === dialog || t === $("[data-pf-edit-dialog]")) { t.close(); return; }

        const closeBtn = t.closest("[data-pf-close]");
        if (closeBtn) { closeBtn.closest("dialog").close(); return; }

        const tab = t.closest("[data-pf-tab]");
        if (tab) {
            state.tab = tab.dataset.pfTab; state.gen++; state.loading = false;
            $$("[data-pf-tab]").forEach(b => b.classList.toggle("is-active", b === tab));
            moveIndicator(); loadPosts(true); return;
        }
        const stat = t.closest("[data-pf-stat]");
        if (stat) {
            if (stat.dataset.pfStat === "posts") { $("[data-pf-tabs]").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); return; }
            openPeople(stat.dataset.pfStat); return;
        }
        if (t.closest("[data-pf-edit]")) { fillEdit(); $("[data-pf-edit-dialog]").showModal(); return; }
        if (t.closest("[data-pf-share]")) { shareProfile(); return; }
        if (t.closest("[data-pf-newpost]")) {
            root.querySelector('[data-community-tab="feed"]')?.click();
            setTimeout(() => root.querySelector("[data-feed-open-composer]")?.click(), 60); return;
        }
        const more = t.closest("[data-pf-more]");
        if (more) { const menu = $("[data-pf-menu]"); menu.hidden = !menu.hidden; return; }
        if (t.closest("[data-pf-retry]")) { loadPosts(true); return; }
        if (t.closest("[data-pf-home]")) { load("me"); return; }
        if (t.closest("[data-pf-load-more]")) { state.page += 1; loadPosts(); return; }
        if (t.closest("[data-pf-people-load]")) { state.people.page += 1; loadPeople(); return; }
        if (t.closest("[data-pf-remove-avatar]")) { state.edit.avatar = null; state.edit.removeAvatar = true; paintEditImages(); return; }
        if (t.closest("[data-pf-remove-cover]")) { state.edit.cover = null; state.edit.removeCover = true; paintEditImages(); return; }

        const post = t.closest("[data-pf-post]");
        if (post) { root.dispatchEvent(new CustomEvent("feed:view-post", { detail: Number(post.dataset.pfPost) })); return; }

        const openUser = t.closest("[data-pf-open-user]");
        if (openUser) { dialog.close(); load(openUser.dataset.pfOpenUser); host.scrollIntoView({ block: "start" }); return; }

        const follow = t.closest("[data-pf-follow]");
        if (follow && state.p) {
            follow.disabled = true;
            const result = await attempt(() => state.p.following ? feedApi.unfollow(state.p.username) : feedApi.follow(state.p.username));
            if (result) { state.p = result; renderHeader(); }
            else follow.disabled = false;
            return;
        }
        const toggle = t.closest("[data-pf-toggle-follow]");
        if (toggle) {
            const username = toggle.dataset.pfToggleFollow, following = toggle.dataset.state === "following";
            toggle.disabled = true;
            const result = await attempt(() => following ? feedApi.unfollow(username) : feedApi.follow(username));
            if (result) {
                await refreshDetail();
                loadPeople(true);
            } else toggle.disabled = false;
            return;
        }
        // friend-request actions are handled by the existing community code; refresh our buttons afterwards
        if (t.closest("[data-add-friend], [data-accept-request], [data-block-user]")) setTimeout(refreshDetail, 900);
    });

    // key access for post tiles
    host.addEventListener("keydown", event => {
        const post = event.target.closest("[data-pf-post]");
        if (post && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); post.click(); }
    });

    // Open full profiles instead of the small dialog whenever a username is clicked anywhere in Community.
    root.addEventListener("click", event => {
        const link = event.target.closest("[data-view-profile]");
        if (!link || link.closest("[data-profile-dialog]")) return;
        event.stopPropagation(); event.preventDefault();
        root.querySelectorAll("dialog[open]").forEach(d => d.close());
        openProfile(link.dataset.viewProfile);
    }, true);

    function openProfile(username) {
        state.navigating = true;
        root.querySelector('[data-community-tab="profile"]')?.click();
        state.navigating = false;
        state.started = true;
        load(username);
        host.scrollIntoView({ block: "start" });
    }

    // Opening "My profile" from the sidebar always shows your own profile.
    root.addEventListener("click", event => {
        if (state.navigating || !event.target.closest('[data-community-tab="profile"]')) return;
        if (!state.started || state.username !== "me") { state.started = true; load("me"); }
    });

    // refresh the grid and counts after posts change in the feed or the post viewer
    root.addEventListener("feed:changed", () => {
        if (!state.p) return;
        if (host.closest("[hidden]")) { state.started = false; return; }   // reload next time the tab opens
        refreshDetail(); state.gen++; state.loading = false; loadPosts(true);
    });

    // deep link: /community?profile=username
    const deep = new URLSearchParams(location.search).get("profile");
    if (deep && /^[a-zA-Z0-9_]{3,40}$/.test(deep)) setTimeout(() => openProfile(deep), 0);

    watchReveal(host);
    new ResizeObserver(moveIndicator).observe($("[data-pf-tabs]"));
}

export default initCommunityProfile;
