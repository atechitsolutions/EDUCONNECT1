import { feedApi } from "../../services/feedService.js";
import { getCurrentUser } from "../../services/authService.js";

const escapeHtml = (value = "") =>
    String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);

const initials = (name = "Student") =>
    String(name).trim().split(/\s+/).slice(0, 2)
        .map(p => p[0] || "").join("").toUpperCase() || "S";

const timeAgo = date => {
    if (!date) return "";

    const seconds = Math.max(
        1,
        Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    );

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(new Date(date));
};

// Escape content before rendering hashtags and mentions.
const formatText = text => escapeHtml(text)
    .replace(
        /(^|\s)#([\p{L}\p{N}_]{2,40})/gu,
        (m, pre, tag) =>
            `${pre}<button type="button" class="feed-tag" data-feed-tag="${tag.toLowerCase()}">#${tag}</button>`
    )
    .replace(
        /(^|\s)@([a-zA-Z0-9_]{3,40})/g,
        (m, pre, name) =>
            `${pre}<button type="button" class="feed-mention" data-view-profile="${name.toLowerCase()}">@${name}</button>`
    )
    .replace(/\n/g, "<br>");

const FILTERS = [
    { key: "all", label: "All Posts", sort: "latest", category: "" },
    { key: "latest", label: "Latest", sort: "recent", category: "" },
    { key: "trending", label: "Trending", sort: "trending", category: "" },
    { key: "project", label: "Projects", sort: "latest", category: "PROJECT" },
    { key: "idea", label: "Ideas", sort: "latest", category: "IDEA" },
    { key: "question", label: "Questions", sort: "latest", category: "QUESTION" },
    { key: "achievement", label: "Achievements", sort: "latest", category: "ACHIEVEMENT" },
    { key: "job", label: "Internships & Jobs", sort: "latest", category: "JOB" }
];

const CATEGORY_LABEL = {
    GENERAL: "General",
    PROJECT: "Project",
    IDEA: "Idea",
    QUESTION: "Question",
    ACHIEVEMENT: "Achievement",
    JOB: "Internship / Job"
};

const VISIBILITY_LABEL = {
    PUBLIC: "🌐 Public",
    CONNECTIONS: "👥 Connections",
    PRIVATE: "🔒 Only me"
};

const MAX_IMAGES = 4;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];

export function initCommunityFeed(root) {
    const host = root.querySelector("[data-feed-root]");

    if (!host || host.dataset.ready) return;

    host.dataset.ready = "true";

    const me = getCurrentUser() || {};

    const state = {
        filter: FILTERS[0],
        scope: "all",
        q: "",
        page: 0,
        last: true,
        loading: false,
        loaded: false,
        posts: [],
        files: [],
        previewUrls: [],
        pendingReload: false,
        requestId: 0,
        replyTo: null,
        single: null
    };

    const blobCache = new Map();

    host.innerHTML = `
        <div class="feed-root">

            <div class="feed-create-bar">
                <span class="community-avatar">
                    ${escapeHtml(initials(me.fullName))}
                </span>

                <button
                    type="button"
                    class="feed-create-input"
                    data-feed-open-composer>
                    What's happening in your academic journey?
                </button>

                <button
                    type="button"
                    class="feed-post-btn"
                    data-feed-open-composer>
                    Create post
                </button>
            </div>

            <dialog
                class="feed-compose-dialog"
                data-feed-dialog
                aria-labelledby="feed-compose-title">

                <div class="feed-dialog-head">
                    <h3 id="feed-compose-title">Create post</h3>

                    <button
                        type="button"
                        class="feed-icon-btn"
                        data-feed-close-composer
                        aria-label="Close">
                        ×
                    </button>
                </div>

                <form class="feed-composer" data-feed-composer>

                    <div class="feed-composer-top">
                        <span class="community-avatar">
                            ${escapeHtml(initials(me.fullName))}
                        </span>

                        <textarea
                            name="content"
                            rows="2"
                            maxlength="5000"
                            placeholder="What's happening in your academic journey?"
                            aria-label="Write a post">
                        </textarea>
                    </div>

                    <div
                        class="feed-previews"
                        data-feed-previews>
                    </div>

                    <div class="feed-composer-bar">

                        <label class="feed-tool" title="Add photos">
                            ▧ Photos

                            <input
                                type="file"
                                data-feed-files
                                accept="image/png,image/jpeg,image/webp,image/gif"
                                multiple
                                hidden>
                        </label>

                        <select name="category" aria-label="Post type">
                            <option value="GENERAL">General</option>
                            <option value="PROJECT">Project</option>
                            <option value="IDEA">Idea</option>
                            <option value="QUESTION">Question</option>
                            <option value="ACHIEVEMENT">Achievement</option>
                            <option value="JOB">Internship / Job</option>
                        </select>

                        <select
                            name="visibility"
                            aria-label="Who can see this post">

                            <option value="PUBLIC">🌐 Public</option>
                            <option value="CONNECTIONS">👥 Connections</option>
                            <option value="PRIVATE">🔒 Only me</option>
                        </select>

                        <span class="feed-count" data-feed-count>
                            0/5000
                        </span>

                        <button class="feed-post-btn" type="submit">
                            Post
                        </button>
                    </div>

                    <small class="feed-hint">
                        Use #hashtags and @username to mention students.
                        Up to 4 images, 5 MB each.
                    </small>
                </form>
            </dialog>

            <div class="feed-toolbar">

                <label class="feed-search">
                    <span aria-hidden="true">⌕</span>

                    <input
                        type="search"
                        data-feed-search
                        placeholder="Search posts or #hashtags"
                        aria-label="Search posts and hashtags">
                </label>

                <div
                    class="feed-scope"
                    role="tablist"
                    aria-label="Post scope">

                    <button
                        type="button"
                        class="is-active"
                        data-feed-scope="all">
                        Everyone
                    </button>

                    <button
                        type="button"
                        data-feed-scope="mine">
                        My posts
                    </button>

                    <button
                        type="button"
                        data-feed-scope="saved">
                        Saved
                    </button>
                </div>
            </div>

            <div class="feed-filters" data-feed-filters>
                ${FILTERS.map((f, i) => `
                    <button
                        type="button"
                        class="${i === 0 ? "is-active" : ""}"
                        data-feed-filter="${f.key}">
                        ${f.label}
                    </button>
                `).join("")}
            </div>

            <div
                class="feed-single"
                data-feed-single
                hidden>
            </div>

            <div class="feed-list" data-feed-list></div>

            <div class="feed-more" data-feed-more hidden>
                <button
                    type="button"
                    class="feed-more-btn"
                    data-feed-load-more>
                    Load more posts
                </button>
            </div>

        </div>
    `;

    const $ = selector => host.querySelector(selector);

    const toast = (message, error = false) => {
        const node = root.querySelector("[data-community-toast]");

        if (!node) return;

        node.textContent = message;
        node.classList.toggle("is-error", error);
        node.classList.add("is-visible");

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            node.classList.remove("is-visible");
        }, 3400);
    };

    const attempt = async (action, success) => {
        try {
            const result = await action();

            if (success) toast(success);

            return result === undefined ? true : result;

        } catch (error) {
            toast(error.message || "Something went wrong.", true);
            return false;
        }
    };

    // ------------------------------------------------------------
    // POST RENDERING
    // ------------------------------------------------------------

    const authorLine = author =>
        [author.course, author.university, author.country]
            .filter(Boolean)
            .map(escapeHtml)
            .join(" · ");

    const gallery = images => {
        if (!Array.isArray(images) || !images.length) return "";

        return `
            <div class="feed-gallery feed-gallery-${Math.min(images.length, 4)}">

                ${images.map(path => `
                    <img
                        class="feed-image"
                        data-feed-media="${escapeHtml(path)}"
                        alt="Image shared in a post">
                `).join("")}

            </div>
        `;
    };

    const postHtml = (p, single = false) => `
        <article class="feed-card" data-post-id="${p.id}">

            <header class="feed-card-head">

                <span class="community-avatar">
                    ${escapeHtml(initials(p.author.displayName))}
                </span>

                <div class="feed-author">

                    <button
                        type="button"
                        class="feed-author-name"
                        data-view-profile="${escapeHtml(p.author.username)}">
                        ${escapeHtml(p.author.displayName)}
                    </button>

                    <small>
                        @${escapeHtml(p.author.username)}
                    </small>

                    ${
                        authorLine(p.author)
                            ? `<small class="feed-author-meta">${authorLine(p.author)}</small>`
                            : ""
                    }

                    <small class="feed-meta">
                        <time>${escapeHtml(timeAgo(p.createdAt))}</time>
                        ${p.edited ? " · edited" : ""}
                        · ${VISIBILITY_LABEL[p.visibility] || ""}
                    </small>

                </div>

                <span class="feed-badge">
                    ${escapeHtml(CATEGORY_LABEL[p.category] || "General")}
                </span>

                <div class="feed-menu-wrap">

                    <button
                        type="button"
                        class="feed-icon-btn"
                        data-feed-menu
                        aria-label="More options"
                        aria-haspopup="true">
                        ⋯
                    </button>

                    <div class="feed-menu" data-feed-menu-panel hidden>

                        ${
                            p.mine
                                ? `
                                    <button type="button" data-feed-edit>
                                        Edit post
                                    </button>

                                    <button
                                        type="button"
                                        class="is-danger"
                                        data-feed-delete>
                                        Delete post
                                    </button>
                                `
                                : `
                                    <button
                                        type="button"
                                        class="is-danger"
                                        data-feed-report>
                                        Report post
                                    </button>
                                `
                        }

                        ${
                            single
                                ? ""
                                : `
                                    <button type="button" data-feed-open>
                                        Open post
                                    </button>
                                `
                        }

                    </div>
                </div>

            </header>

            <div class="feed-body" data-feed-body>
                ${
                    p.content
                        ? `<p>${formatText(p.content)}</p>`
                        : ""
                }
            </div>

            ${gallery(p.images)}

            <div class="feed-actions">

                <button
                    type="button"
                    class="${p.likedByMe ? "is-active" : ""}"
                    data-feed-like
                    aria-pressed="${p.likedByMe}">
                    ♥
                    <span data-count="like">${p.likeCount}</span>
                </button>

                <button
                    type="button"
                    data-feed-comments-toggle>
                    💬
                    <span data-count="comment">${p.commentCount}</span>
                </button>

                <button
                    type="button"
                    data-feed-share>
                    ↗
                    <span data-count="share">${p.shareCount}</span>
                </button>

                <button
                    type="button"
                    class="${p.savedByMe ? "is-active" : ""}"
                    data-feed-save
                    aria-pressed="${p.savedByMe}">
                    ${p.savedByMe ? "★ Saved" : "☆ Save"}
                </button>

            </div>

            <section
                class="feed-comments"
                data-feed-comments
                hidden>

                <div data-feed-comment-list></div>

                <button
                    type="button"
                    class="feed-link-btn"
                    data-feed-more-comments
                    hidden>
                    Load more comments
                </button>

                <form
                    class="feed-comment-form"
                    data-feed-comment-form>

                    <input
                        name="content"
                        maxlength="2000"
                        placeholder="Write a comment…"
                        aria-label="Write a comment"
                        autocomplete="off">

                    <button type="submit">Send</button>
                </form>

                <small
                    class="feed-replying"
                    data-feed-replying
                    hidden>
                </small>

            </section>

        </article>
    `;

    const commentHtml = (c, reply = false) => `
        <div
            class="feed-comment${reply ? " is-reply" : ""}"
            data-comment-id="${c.id}">

            <span class="community-avatar">
                ${escapeHtml(initials(c.author.displayName))}
            </span>

            <div class="feed-comment-body">

                <b>${escapeHtml(c.author.displayName)}</b>

                <small>
                    @${escapeHtml(c.author.username)}
                    · ${escapeHtml(timeAgo(c.createdAt))}
                </small>

                <p>${formatText(c.content)}</p>

                <div class="feed-comment-tools">

                    ${
                        reply
                            ? ""
                            : `
                                <button
                                    type="button"
                                    data-feed-reply="${c.id}"
                                    data-reply-name="${escapeHtml(c.author.username)}">
                                    Reply
                                </button>
                            `
                    }

                    ${
                        c.mine
                            ? `
                                <button
                                    type="button"
                                    data-feed-comment-delete="${c.id}">
                                    Delete
                                </button>
                            `
                            : ""
                    }

                </div>

                ${
                    !reply && c.replies?.length
                        ? `
                            <div class="feed-replies">
                                ${c.replies.map(r => commentHtml(r, true)).join("")}
                            </div>
                        `
                        : ""
                }

            </div>
        </div>
    `;

    const skeleton = () =>
        `<div class="feed-skeleton"><i></i><div><b></b><b></b><b></b></div></div>`
            .repeat(3);

    const emptyHtml = message => `
        <div class="feed-empty">
            <span>✦</span>
            <h3>${escapeHtml(message)}</h3>
            <p>Be the first to start the conversation.</p>
        </div>
    `;

    const errorHtml = message => `
        <div class="feed-empty is-error">
            <span>!</span>
            <h3>Could not load the feed</h3>
            <p>${escapeHtml(message)}</p>

            <button
                type="button"
                class="feed-more-btn"
                data-feed-retry>
                Try again
            </button>
        </div>
    `;

    // ------------------------------------------------------------
    // IMAGE LOADING
    // ------------------------------------------------------------

    const mediaObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(async entry => {
                if (!entry.isIntersecting) return;

                const img = entry.target;
                mediaObserver.unobserve(img);

                const path = img.dataset.feedMedia;

                try {
                    if (!blobCache.has(path)) {
                        blobCache.set(path, feedApi.image(path));
                    }

                    img.src = await blobCache.get(path);
                    img.classList.add("is-loaded");

                } catch {
                    img.alt = "Image unavailable";
                }
            });
        }, { rootMargin: "300px" })
        : null;

    const watchMedia = scope => {
        scope.querySelectorAll("img[data-feed-media]:not([src])")
            .forEach(img => {
                if (mediaObserver) {
                    mediaObserver.observe(img);
                } else {
                    feedApi.image(img.dataset.feedMedia)
                        .then(url => {
                            img.src = url;
                            img.classList.add("is-loaded");
                        })
                        .catch(() => {
                            img.alt = "Image unavailable";
                        });
                }
            });
    };

    // ------------------------------------------------------------
    // POST STATE HELPERS
    // ------------------------------------------------------------

    const cardFor = id =>
        host.querySelector(`[data-post-id="${id}"]`);

    const findPost = id =>
        state.posts.find(p => Number(p.id) === Number(id));

    const replacePost = post => {
        if (!post || typeof post !== "object" || post.id == null) return;

        const index = state.posts.findIndex(
            p => Number(p.id) === Number(post.id)
        );

        if (index >= 0) state.posts[index] = post;

        if (
            state.single &&
            Number(state.single.id) === Number(post.id)
        ) {
            state.single = post;
        }

        const card = cardFor(post.id);
        if (!card) return;

        const likeCount = card.querySelector('[data-count="like"]');
        const commentCount = card.querySelector('[data-count="comment"]');
        const shareCount = card.querySelector('[data-count="share"]');

        if (likeCount) likeCount.textContent = post.likeCount ?? 0;
        if (commentCount) commentCount.textContent = post.commentCount ?? 0;
        if (shareCount) shareCount.textContent = post.shareCount ?? 0;

        const like = card.querySelector("[data-feed-like]");

        if (like) {
            like.classList.toggle("is-active", Boolean(post.likedByMe));
            like.setAttribute("aria-pressed", String(Boolean(post.likedByMe)));
        }

        const save = card.querySelector("[data-feed-save]");

        if (save) {
            save.classList.toggle("is-active", Boolean(post.savedByMe));
            save.setAttribute("aria-pressed", String(Boolean(post.savedByMe)));
            save.textContent = post.savedByMe ? "★ Saved" : "☆ Save";
        }
    };

    // ------------------------------------------------------------
    // LOAD POSTS
    // ------------------------------------------------------------

    async function load(reset = false) {
        if (state.loading) {
            if (reset) state.pendingReload = true;
            return;
        }

        state.loading = true;

        const requestId = ++state.requestId;
        const list = $("[data-feed-list]");

        if (reset) {
            state.page = 0;
            state.posts = [];
            state.last = false;

            list.innerHTML = skeleton();
            $("[data-feed-more]").hidden = true;
        }

        try {
            const result = await feedApi.list({
                scope: state.scope,
                category: state.filter.category,
                sort: state.filter.sort,
                q: state.q,
                page: state.page,
                size: 10
            });

            if (requestId !== state.requestId) return;

            const content = Array.isArray(result?.content)
                ? result.content
                : [];

            state.posts = reset
                ? content
                : state.posts.concat(content);

            const currentPage = Number(result?.page ?? state.page);
            const totalPages = Number(result?.totalPages ?? 0);

            state.last =
                totalPages === 0 ||
                currentPage >= totalPages - 1;

            if (reset) list.innerHTML = "";

            if (!state.posts.length) {
                list.innerHTML = emptyHtml(
                    state.q
                        ? "No posts match your search"
                        : "No posts here yet"
                );
            } else {
                const wrapper = document.createElement("div");

                wrapper.innerHTML = content
                    .map(p => postHtml(p))
                    .join("");

                while (wrapper.firstChild) {
                    list.appendChild(wrapper.firstChild);
                }

                watchMedia(list);
            }

            $("[data-feed-more]").hidden = state.last;
            state.loaded = true;

        } catch (error) {
            if (requestId === state.requestId) {
                if (reset || !state.posts.length) {
                    list.innerHTML = errorHtml(
                        error.message || "Please check your connection."
                    );
                } else {
                    toast(
                        error.message || "Could not load more posts.",
                        true
                    );
                }
            }

        } finally {
            state.loading = false;

            if (state.pendingReload) {
                state.pendingReload = false;
                load(true);
            }
        }
    }

    const reload = () => load(true);

    // ------------------------------------------------------------
    // COMMENTS
    // ------------------------------------------------------------

    async function loadComments(card, reset = true) {
        const id = card.dataset.postId;
        const list = card.querySelector("[data-feed-comment-list]");
        const more = card.querySelector("[data-feed-more-comments]");

        const page = reset
            ? 0
            : Number(more.dataset.page || 0) + 1;

        if (reset) {
            list.innerHTML = `
                <small class="feed-muted">
                    Loading comments…
                </small>
            `;
        }

        try {
            const result = await feedApi.comments(id, page);

            if (reset) list.innerHTML = "";

            if (reset && !result.content.length) {
                list.innerHTML = `
                    <small class="feed-muted">
                        No comments yet.
                    </small>
                `;
            }

            list.insertAdjacentHTML(
                "beforeend",
                result.content.map(c => commentHtml(c)).join("")
            );

            more.dataset.page = page;
            more.hidden = page >= result.totalPages - 1;

        } catch (error) {
            list.innerHTML = `
                <small class="feed-muted">
                    ${escapeHtml(error.message)}
                </small>
            `;
        }
    }

    // ------------------------------------------------------------
    // CREATE POST COMPOSER
    // ------------------------------------------------------------

    const form = $("[data-feed-composer]");
    const previews = $("[data-feed-previews]");

    const renderPreviews = () => {
        state.previewUrls.forEach(url => URL.revokeObjectURL(url));

        state.previewUrls = state.files.map(file =>
            URL.createObjectURL(file)
        );

        previews.innerHTML = state.files.map((file, i) => `
            <figure>
                <img
                    src="${state.previewUrls[i]}"
                    alt="Selected image ${i + 1}">

                <button
                    type="button"
                    data-feed-remove-file="${i}"
                    aria-label="Remove image">
                    ×
                </button>
            </figure>
        `).join("");
    };

    form.elements.content.addEventListener("input", () => {
        $("[data-feed-count]").textContent =
            `${form.elements.content.value.length}/5000`;
    });

    $("[data-feed-files]").addEventListener("change", event => {
        for (const file of event.target.files) {
            if (!IMAGE_TYPES.includes(file.type)) {
                toast(
                    "Only JPEG, PNG, WebP or GIF images are allowed.",
                    true
                );
                continue;
            }

            if (file.size > MAX_IMAGE_BYTES) {
                toast(`${file.name} is larger than 5 MB.`, true);
                continue;
            }

            if (state.files.length >= MAX_IMAGES) {
                toast("You can attach up to 4 images.", true);
                break;
            }

            state.files.push(file);
        }

        event.target.value = "";
        renderPreviews();
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const content = form.elements.content.value.trim();

        if (!content && !state.files.length) {
            toast("Write something or attach an image.", true);
            return;
        }

        const button = form.querySelector(".feed-post-btn");

        button.disabled = true;
        button.textContent = "Posting…";

        const data = new FormData();

        data.append("content", content);
        data.append("category", form.elements.category.value);
        data.append("visibility", form.elements.visibility.value);

        state.files.forEach(file => {
            data.append("images", file);
        });

        const ok = await attempt(
            () => feedApi.create(data),
            "Post published."
        );

        button.disabled = false;
        button.textContent = "Post";

        if (!ok) return;

        form.reset();

        state.files = [];
        renderPreviews();

        $("[data-feed-count]").textContent = "0/5000";

        $("[data-feed-dialog]").close();

        reload();
    });

    // ------------------------------------------------------------
    // INTERACTIONS
    // ------------------------------------------------------------

    const closeMenus = except => {
        host.querySelectorAll("[data-feed-menu-panel]")
            .forEach(menu => {
                if (menu !== except) menu.hidden = true;
            });
    };

    host.addEventListener("click", async event => {
        const target = event.target instanceof Element
            ? event.target
            : event.target?.parentElement;

        if (!target) return;

        const button = target.closest("button");

        if (!target.closest("[data-feed-menu]")) {
            closeMenus();
        }

        if (!button) return;

        if (button.matches("[data-feed-open-composer]")) {
            const dialog = $("[data-feed-dialog]");
            dialog.showModal();
            form.elements.content.focus();
            return;
        }

        if (button.matches("[data-feed-close-composer]")) {
            $("[data-feed-dialog]").close();
            return;
        }

        const filterButton = button.closest("[data-feed-filter]");

        if (filterButton) {
            state.filter =
                FILTERS.find(f => f.key === filterButton.dataset.feedFilter) ||
                FILTERS[0];

            host.querySelectorAll("[data-feed-filter]")
                .forEach(b => {
                    b.classList.toggle("is-active", b === filterButton);
                });

            return reload();
        }

        const scopeButton = button.closest("[data-feed-scope]");

        if (scopeButton) {
            state.scope = scopeButton.dataset.feedScope;

            host.querySelectorAll("[data-feed-scope]")
                .forEach(b => {
                    b.classList.toggle("is-active", b === scopeButton);
                });

            return reload();
        }

        if (button.matches("[data-feed-tag]")) {
            const search = $("[data-feed-search]");

            search.value = `#${button.dataset.feedTag}`;
            state.q = search.value;

            host.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return reload();
        }

        if (button.matches("[data-feed-retry]")) {
            return reload();
        }

        if (button.matches("[data-feed-load-more]")) {
            state.page += 1;
            return load();
        }

        if (button.matches("[data-feed-back]")) {
            const url = new URL(location.href);

            url.searchParams.delete("post");

            history.replaceState(
                null,
                "",
                `${url.pathname}${url.search}${url.hash}`
            );

            state.single = null;

            $("[data-feed-single]").hidden = true;
            $("[data-feed-list]").hidden = false;

            return;
        }

        if (button.matches("[data-feed-remove-file]")) {
            state.files.splice(
                Number(button.dataset.feedRemoveFile),
                1
            );

            return renderPreviews();
        }

        const card = button.closest("[data-post-id]");

        if (!card) return;

        const id = card.dataset.postId;
        const post = findPost(id) || state.single;

        // Open and close post menu.
        if (button.matches("[data-feed-menu]")) {
            const panel = card.querySelector("[data-feed-menu-panel]");
            const open = panel.hidden;

            closeMenus(panel);
            panel.hidden = !open;

            return;
        }

        // Like post.
        if (button.matches("[data-feed-like]")) {
            const result = await attempt(
                () => feedApi.like(id)
            );

            if (result && typeof result === "object") {
                replacePost(result);
            }

            return;
        }

        // Save post.
        if (button.matches("[data-feed-save]")) {
            const result = await attempt(
                () => feedApi.save(id),
                null
            );

            if (result && typeof result === "object") {
                replacePost(result);

                toast(
                    result.savedByMe
                        ? "Saved to your collection."
                        : "Removed from saved."
                );
            }

            return;
        }

        // Share post.
        if (button.matches("[data-feed-share]")) {
            const link =
                `${location.origin}/community?post=${id}`;

            if (post && post.visibility === "PUBLIC") {
                const result = await attempt(
                    () => feedApi.share(id)
                );

                if (result && typeof result === "object") {
                    replacePost(result);
                }
            }

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "EduConnect post",
                        url: link
                    });

                    return;
                } catch {
                    // User cancelled sharing.
                }
            }

            try {
                await navigator.clipboard.writeText(link);
                toast("Post link copied.");
            } catch {
                toast(link);
            }

            return;
        }

        // Open single post.
        if (button.matches("[data-feed-open]")) {
            closeMenus();
            return showSingle(id);
        }

        // Show or hide comments.
        if (button.matches("[data-feed-comments-toggle]")) {
            const section = card.querySelector("[data-feed-comments]");

            section.hidden = !section.hidden;

            if (
                !section.hidden &&
                !section.dataset.loaded
            ) {
                section.dataset.loaded = "1";
                loadComments(card);
            }

            return;
        }

        if (button.matches("[data-feed-more-comments]")) {
            return loadComments(card, false);
        }

        // Reply to comment.
        if (button.matches("[data-feed-reply]")) {
            state.replyTo = {
                postId: id,
                commentId: Number(button.dataset.feedReply)
            };

            const note = card.querySelector("[data-feed-replying]");

            note.hidden = false;

            note.textContent =
                `Replying to @${button.dataset.replyName} — send an empty box to cancel`;

            const input =
                card.querySelector("[data-feed-comment-form] input");

            input.focus();
            input.value = `@${button.dataset.replyName} `;

            return;
        }

        // Delete comment.
        if (button.matches("[data-feed-comment-delete]")) {
            if (!confirm("Delete this comment?")) return;

            const result = await attempt(
                () => feedApi.removeComment(
                    button.dataset.feedCommentDelete
                )
            );

            if (result) {
                card.querySelector(
                    `[data-comment-id="${button.dataset.feedCommentDelete}"]`
                )?.remove();

                const count = card.querySelector(
                    '[data-count="comment"]'
                );

                if (count) {
                    count.textContent = result.commentCount;
                }

                if (post) {
                    post.commentCount = result.commentCount;
                }
            }

            return;
        }

        // Delete post.
        if (button.matches("[data-feed-delete]")) {
            closeMenus();

            if (!confirm("Delete this post permanently?")) return;

            const result = await attempt(
                () => feedApi.remove(id),
                "Post deleted."
            );

            if (result) {
                card.remove();

                state.posts = state.posts.filter(
                    p => Number(p.id) !== Number(id)
                );

                if (
                    state.single &&
                    Number(state.single.id) === Number(id)
                ) {
                    state.single = null;

                    $("[data-feed-single]").hidden = true;
                    $("[data-feed-list]").hidden = false;
                }
            }

            return;
        }

        // Report post.
        if (button.matches("[data-feed-report]")) {
            closeMenus();

            const reason = prompt(
                "Why are you reporting this post?"
            );

            if (reason && reason.trim()) {
                await attempt(
                    () => feedApi.report(id, reason.trim()),
                    "Thanks — our moderators will review it."
                );
            }

            return;
        }

        // Edit post.
        if (button.matches("[data-feed-edit]")) {
            closeMenus();
            return startEdit(card, post);
        }
    });

    // ------------------------------------------------------------
    // COMMENT SUBMISSION
    // ------------------------------------------------------------

    host.addEventListener("submit", async event => {
        const commentForm = event.target.closest(
            "[data-feed-comment-form]"
        );

        if (!commentForm) return;

        event.preventDefault();

        const card = commentForm.closest("[data-post-id]");
        const id = card.dataset.postId;

        const input = commentForm.elements.content;
        const content = input.value.trim();

        const note = card.querySelector("[data-feed-replying]");

        if (!content) {
            state.replyTo = null;
            note.hidden = true;
            return;
        }

        const parentId =
            state.replyTo &&
            String(state.replyTo.postId) === String(id)
                ? state.replyTo.commentId
                : null;

        const result = await attempt(
            () => feedApi.addComment(id, content, parentId)
        );

        if (!result) return;

        input.value = "";

        state.replyTo = null;
        note.hidden = true;

        const count = card.querySelector(
            '[data-count="comment"]'
        );

        if (count) {
            count.textContent = result.commentCount;
        }

        const post = findPost(id) || state.single;

        if (post) {
            post.commentCount = result.commentCount;
        }

        loadComments(card);
    });

    // ------------------------------------------------------------
    // EDIT POST
    // ------------------------------------------------------------

    function startEdit(card, post) {
        if (!post) return;

        const body = card.querySelector("[data-feed-body]");

        body.innerHTML = `
            <form class="feed-edit" data-feed-edit-form>

                <textarea
                    rows="4"
                    maxlength="5000"
                    aria-label="Edit post">${escapeHtml(post.content)}</textarea>

                <div>
                    <button
                        type="button"
                        class="feed-link-btn"
                        data-edit-cancel>
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="feed-post-btn">
                        Save
                    </button>
                </div>

            </form>
        `;

        const editForm = body.querySelector("form");

        editForm.querySelector("textarea").focus();

        editForm.querySelector("[data-edit-cancel]")
            .addEventListener("click", () => {
                body.innerHTML = post.content
                    ? `<p>${formatText(post.content)}</p>`
                    : "";
            });

        editForm.addEventListener("submit", async submitEvent => {
            submitEvent.preventDefault();

            const content = editForm
                .querySelector("textarea")
                .value.trim();

            const updated = await attempt(
                () => feedApi.update(post.id, {
                    content,
                    category: post.category,
                    visibility: post.visibility
                }),
                "Post updated."
            );

            if (!updated) return;

            const index = state.posts.findIndex(
                p => p.id === updated.id
            );

            if (index >= 0) {
                state.posts[index] = updated;
            }

            if (
                state.single &&
                Number(state.single.id) === Number(updated.id)
            ) {
                state.single = updated;
            }

            body.innerHTML = updated.content
                ? `<p>${formatText(updated.content)}</p>`
                : "";

            const meta = card.querySelector(".feed-meta");

            if (meta) {
                meta.innerHTML = `
                    <time>${escapeHtml(timeAgo(updated.createdAt))}</time>
                    · edited
                    · ${VISIBILITY_LABEL[updated.visibility] || ""}
                `;
            }
        });
    }

    // ------------------------------------------------------------
    // SINGLE POST VIEW
    // ------------------------------------------------------------

    async function showSingle(id) {
        const box = $("[data-feed-single]");

        box.hidden = false;
        $("[data-feed-list]").hidden = true;

        box.innerHTML = `
            <button
                type="button"
                class="feed-link-btn"
                data-feed-back>
                ← Back to feed
            </button>

            ${skeleton()}
        `;

        try {
            const post = await feedApi.get(id);

            state.single = post;

            box.innerHTML = `
                <button
                    type="button"
                    class="feed-link-btn"
                    data-feed-back>
                    ← Back to feed
                </button>

                ${postHtml(post, true)}
            `;

            watchMedia(box);

            const card = box.querySelector("[data-post-id]");

            const comments = card.querySelector(
                "[data-feed-comments]"
            );

            comments.hidden = false;
            comments.dataset.loaded = "1";

            loadComments(card);

        } catch (error) {
            box.innerHTML = `
                <button
                    type="button"
                    class="feed-link-btn"
                    data-feed-back>
                    ← Back to feed
                </button>

                ${errorHtml(error.message)}
            `;
        }
    }

    // ------------------------------------------------------------
    // DIALOG BACKDROP
    // ------------------------------------------------------------

    $("[data-feed-dialog]").addEventListener("click", event => {
        if (event.target === event.currentTarget) {
            event.currentTarget.close();
        }
    });

    // ------------------------------------------------------------
    // SEARCH
    // ------------------------------------------------------------

    let searchTimer;

    $("[data-feed-search]").addEventListener("input", event => {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {
            state.q = event.target.value.trim();
            reload();
        }, 350);
    });

    // ------------------------------------------------------------
    // INFINITE SCROLL
    // ------------------------------------------------------------

    const sentinel = $("[data-feed-more]");

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(entries => {
            if (
                entries[0].isIntersecting &&
                !state.loading &&
                !state.last &&
                state.loaded
            ) {
                state.page += 1;
                load();
            }
        }, {
            rootMargin: "400px"
        }).observe(sentinel);
    }

    // ------------------------------------------------------------
    // COMMUNITY TAB ACTIVATION
    // ------------------------------------------------------------

    const activate = () => {
        if (!state.loaded && !state.loading) {
            reload();
        }

        const postId = new URLSearchParams(
            location.search
        ).get("post");

        if (
            postId &&
            /^\d+$/.test(postId) &&
            !activate.opened
        ) {
            activate.opened = true;
            showSingle(postId);
        }
    };

    root.addEventListener("click", event => {
        const target = event.target instanceof Element
            ? event.target
            : event.target?.parentElement;

        if (
            target?.closest(
                '[data-community-tab="feed"], [data-community-tab-link="feed"]'
            )
        ) {
            activate();
        }
    });

    if (new URLSearchParams(location.search).get("post")) {
        root.querySelector('[data-community-tab="feed"]')?.click();
    }

    // ------------------------------------------------------------
    // CLEANUP
    // ------------------------------------------------------------

    const cleanup = () => {
        state.previewUrls.forEach(url => {
            URL.revokeObjectURL(url);
        });

        state.previewUrls = [];

        if (mediaObserver) {
            mediaObserver.disconnect();
        }
    };

    root.addEventListener(
        "community:destroy",
        cleanup,
        { once: true }
    );
}

export default initCommunityFeed;