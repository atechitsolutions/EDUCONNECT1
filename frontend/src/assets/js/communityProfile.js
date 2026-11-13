
import { feedApi } from "../../services/feedService.js";
import { refreshCommunityAvatar } from "./communityAvatar.js";

const esc = (value = "") =>
    String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);

const initials = (name = "Student") =>
    String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(p => p[0] || "")
        .join("")
        .toUpperCase() || "S";

const compact = n =>
    new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(Number(n) || 0);

const REDUCED = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const FINE_POINTER = window.matchMedia(
    "(pointer: fine)"
).matches;

const IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function initCommunityProfile(root) {
    const host = root.querySelector("[data-profile-root]");

    if (!host || host.dataset.ready) return;

    host.dataset.ready = "true";

    const state = {
        username: "me",
        started: false,
        navigating: false,
        gen: 0,

        p: null,
        tab: "posts",
        posts: [],
        page: 0,
        last: true,
        loading: false,

        people: {
            kind: "followers",
            page: 0,
            last: true,
            loading: false
        },

        edit: {
            avatar: null,
            cover: null,
            removeAvatar: false,
            removeCover: false
        }
    };

    const blobs = new Map();

    const blobUrl = path => {
        if (!path) return Promise.resolve("");

        if (!blobs.has(path)) {
            blobs.set(path, Promise.resolve(feedApi.image(path)));
        }

        return blobs.get(path);
    };

    host.innerHTML = `
        <div class="pf-root" data-pf>

            <section class="pf-hero" data-pf-hero>

                <div class="pf-cover" data-pf-cover>

                    <span class="pf-shape pf-cube" aria-hidden="true">
                        <i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                    </span>

                    <span class="pf-shape pf-ring" aria-hidden="true"></span>

                    <span class="pf-shape pf-orb pf-orb-a" aria-hidden="true"></span>

                    <span class="pf-shape pf-orb pf-orb-b" aria-hidden="true"></span>

                    <span class="pf-particles" data-pf-particles aria-hidden="true"></span>

                </div>

                <div class="pf-head pf-glass" data-pf-head></div>

            </section>

            <nav class="pf-tabs" data-pf-tabs aria-label="Profile sections">

                <button type="button" class="is-active" data-pf-tab="posts">
                    ▦ Posts
                </button>

                <button type="button" data-pf-tab="liked" data-own-only>
                    ♥ Liked
                </button>

                <button type="button" data-pf-tab="saved" data-own-only>
                    ★ Saved
                </button>

                <span class="pf-tab-ind" data-pf-ind></span>

            </nav>

            <section class="pf-grid-wrap" data-pf-grid-wrap>

                <div class="pf-grid" data-pf-grid></div>

                <div class="pf-more" data-pf-grid-more hidden>
                    <button type="button" class="pf-btn" data-pf-load-more>
                        Load more
                    </button>
                </div>

            </section>

            <dialog
                class="pf-modal pf-people"
                data-pf-people
                aria-labelledby="pf-people-title"
            >

                <header>
                    <h3 id="pf-people-title" data-pf-people-title>
                        Followers
                    </h3>

                    <button
                        type="button"
                        class="pf-x"
                        data-pf-close
                        aria-label="Close"
                    >×</button>
                </header>

                <div class="pf-people-list" data-pf-people-list></div>

                <div class="pf-more" data-pf-people-more hidden>
                    <button type="button" class="pf-btn" data-pf-people-load>
                        Load more
                    </button>
                </div>

            </dialog>

            <dialog
                class="pf-modal pf-edit"
                data-pf-edit-dialog
                aria-labelledby="pf-edit-title"
            >

                <form data-pf-edit-form>

                    <header>
                        <h3 id="pf-edit-title">Edit profile</h3>

                        <button
                            type="button"
                            class="pf-x"
                            data-pf-close
                            aria-label="Close"
                        >×</button>
                    </header>

                    <div class="pf-edit-body">

                        <div class="pf-edit-cover" data-pf-edit-cover>

                            <div class="pf-edit-cover-actions">

                                <label class="pf-btn pf-btn-glass">
                                    Change cover
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        data-pf-cover-input
                                        hidden
                                    >
                                </label>

                                <button
                                    type="button"
                                    class="pf-btn pf-btn-glass"
                                    data-pf-remove-cover
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                        <div class="pf-edit-avatar-row">

                            <span
                                class="pf-avatar pf-avatar-sm"
                                data-pf-edit-avatar
                            ></span>

                            <label class="pf-btn pf-btn-glass">
                                Change photo
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    data-pf-avatar-input
                                    hidden
                                >
                            </label>

                            <button
                                type="button"
                                class="pf-btn pf-btn-glass"
                                data-pf-remove-avatar
                            >
                                Remove
                            </button>

                        </div>

                        <div class="pf-fields">

                            <label>
                                Display name
                                <input name="displayName" maxlength="80" required>
                            </label>

                            <label>
                                Username
                                <input
                                    name="username"
                                    minlength="3"
                                    maxlength="40"
                                    pattern="[a-zA-Z0-9_]{3,40}"
                                    required
                                >
                            </label>

                            <label class="pf-wide">
                                Bio
                                <textarea
                                    name="bio"
                                    rows="3"
                                    maxlength="500"
                                    placeholder="What are you studying or working toward?"
                                ></textarea>
                            </label>

                            <label>
                                University / college
                                <input name="university" maxlength="160">
                            </label>

                            <label>
                                Course / field
                                <input name="course" maxlength="160">
                            </label>

                            <label>
                                Country or region
                                <input name="country" maxlength="100">
                            </label>

                            <label>
                                Interests <small>(comma separated)</small>
                                <input
                                    name="interests"
                                    maxlength="500"
                                    placeholder="AI, design, research"
                                >
                            </label>

                            <label class="pf-toggle pf-wide">
                                <input type="checkbox" name="discoverable">

                                <span>
                                    <b>Show my profile in student discovery</b>
                                    <small>Other students can find and follow you.</small>
                                </span>
                            </label>

                            <label class="pf-toggle pf-wide">
                                <input type="checkbox" name="showOnline">

                                <span>
                                    <b>Share my online status</b>
                                    <small>Shows a green dot while you are active.</small>
                                </span>
                            </label>

                        </div>

                        <p
                            class="pf-error"
                            data-pf-edit-error
                            role="alert"
                            hidden
                        ></p>

                    </div>

                    <footer>

                        <button
                            type="button"
                            class="pf-btn pf-btn-glass"
                            data-pf-close
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="pf-btn pf-btn-primary"
                        >
                            Save changes
                        </button>

                    </footer>

                </form>

            </dialog>

            <div class="pf-sr" aria-live="polite" data-pf-live></div>

        </div>
    `;

    const $ = selector => host.querySelector(selector);

    const $$ = selector => [
        ...host.querySelectorAll(selector)
    ];

    // --------------------------------------------------
    // Notifications
    // --------------------------------------------------

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

    const attempt = async (action, successMessage) => {
        try {
            const result = await action();

            if (successMessage) {
                toast(successMessage);
            }

            return result ?? true;

        } catch (error) {
            toast(error.message || "Something went wrong.", true);
            return false;
        }
    };

    // --------------------------------------------------
    // Particles
    // --------------------------------------------------

    $("[data-pf-particles]").innerHTML = Array.from(
        { length: 16 },
        (_, i) => `
            <i
                style="
                    left:${(i * 37) % 100}%;
                    top:${(i * 53) % 100}%;
                    --s:${4 + (i % 4) * 2}px;
                    --d:${6 + (i % 5) * 2}s;
                    --delay:${(i % 7) * -1.3}s
                "
            ></i>
        `
    ).join("");

    // --------------------------------------------------
    // Image handling
    // --------------------------------------------------

    const loadImages = scope => {
        scope.querySelectorAll(
            "img[data-pf-src]:not([src])"
        ).forEach(async img => {
            try {
                img.src = await blobUrl(img.dataset.pfSrc);
                img.classList.add("is-loaded");
            } catch {
                img.remove();
            }
        });
    };

    const lazy = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(async entry => {
                if (!entry.isIntersecting) return;

                const img = entry.target;

                lazy.unobserve(img);

                try {
                    img.src = await blobUrl(img.dataset.pfLazy);
                    img.classList.add("is-loaded");
                } catch {
                    img.remove();
                }
            });
        }, { rootMargin: "240px" })
        : null;

    const watchLazy = scope => {
        scope.querySelectorAll(
            "img[data-pf-lazy]:not([src])"
        ).forEach(img => {
            if (lazy) {
                lazy.observe(img);
            } else {
                blobUrl(img.dataset.pfLazy).then(url => {
                    img.src = url;
                }).catch(() => img.remove());
            }
        });
    };

    const avatarInner = (person, cls = "") => {
        const name = person.displayName || "Student";

        return person.avatarUrl
            ? `
                <img
                    data-pf-src="${esc(person.avatarUrl)}"
                    alt=""
                    class="${cls}"
                >
                <b>${esc(initials(name))}</b>
            `
            : `<b>${esc(initials(name))}</b>`;
    };

    // --------------------------------------------------
    // Animation effects
    // --------------------------------------------------

    const countUp = (element, target) => {
        const to = Number(target) || 0;

        const from = Number(element.dataset.value || 0);

        element.dataset.value = to;

        if (REDUCED || from === to) {
            element.textContent = compact(to);
            return;
        }

        const start = performance.now();

        const duration = 650;

        const tick = now => {
            const t = Math.min(
                1,
                (now - start) / duration
            );

            const value = Math.round(
                from + (to - from) * (
                    1 - Math.pow(1 - t, 3)
                )
            );

            element.textContent = compact(value);

            if (t < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    if (FINE_POINTER && !REDUCED) {

        host.addEventListener("pointermove", event => {

            const tilt = event.target.closest("[data-tilt]");

            if (tilt) {
                const rect = tilt.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width - 0.5;

                const y = (event.clientY - rect.top) / rect.height - 0.5;

                tilt.style.setProperty("--ry", `${x * 7}deg`);

                tilt.style.setProperty("--rx", `${-y * 7}deg`);

                tilt.style.setProperty("--mx", `${(x + 0.5) * 100}%`);

                tilt.style.setProperty("--my", `${(y + 0.5) * 100}%`);
            }

            const magnetic = event.target.closest(".pf-magnetic");

            if (magnetic) {
                const rect = magnetic.getBoundingClientRect();

                magnetic.style.transform = `
                    translate(
                        ${(event.clientX - rect.left - rect.width / 2) * 0.18}px,
                        ${(event.clientY - rect.top - rect.height / 2) * 0.22}px
                    )
                `;
            }

            const hero = event.target.closest("[data-pf-hero]");

            if (hero) {
                const rect = hero.getBoundingClientRect();

                hero.style.setProperty(
                    "--px",
                    `${((event.clientX - rect.left) / rect.width - 0.5) * 24}px`
                );

                hero.style.setProperty(
                    "--py",
                    `${((event.clientY - rect.top) / rect.height - 0.5) * 16}px`
                );
            }

        });

        host.addEventListener("pointerout", event => {

            const tilt = event.target.closest("[data-tilt]");

            if (tilt && !tilt.contains(event.relatedTarget)) {
                tilt.style.setProperty("--rx", "0deg");
                tilt.style.setProperty("--ry", "0deg");
            }

            const magnetic = event.target.closest(".pf-magnetic");

            if (magnetic && !magnetic.contains(event.relatedTarget)) {
                magnetic.style.transform = "";
            }

        });
    }

    const reveal = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    reveal.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 })
        : null;

    const watchReveal = scope => {
        scope.querySelectorAll(
            ".pf-reveal:not(.is-in)"
        ).forEach(element => {
            if (reveal) {
                reveal.observe(element);
            } else {
                element.classList.add("is-in");
            }
        });
    };

    // --------------------------------------------------
    // Tab indicator
    // --------------------------------------------------

    const moveIndicator = () => {
        const active = $(".pf-tabs button.is-active");

        const indicator = $("[data-pf-ind]");

        if (!active || !indicator) return;

        indicator.style.width = `${active.offsetWidth}px`;

        indicator.style.transform = `translateX(${active.offsetLeft}px)`;
    };

    window.addEventListener("resize", moveIndicator);

    // --------------------------------------------------
    // Profile header
    // --------------------------------------------------

    function renderHeader() {
        const p = state.p;

        if (!p) return;

        p.interests = Array.isArray(p.interests)
            ? p.interests
            : [];

        const cover = $("[data-pf-cover]");

        cover.style.backgroundImage = "";

        cover.classList.remove("has-image");

        if (p.coverUrl) {
            blobUrl(p.coverUrl).then(url => {
                if (state.p !== p) return;

                cover.style.backgroundImage = `
                    linear-gradient(
                        180deg,
                        rgba(17,17,36,.15),
                        rgba(17,17,36,.6)
                    ),
                    url("${url}")
                `;

                cover.classList.add("has-image");

            }).catch(() => {});
        }

        const stat = (key, label) => `
            <button
                type="button"
                class="pf-stat"
                data-pf-stat="${key}"
            >
                <strong data-count data-value="0">0</strong>
                <span>${label}</span>
            </button>
        `;

        let actions = "";

        if (p.me) {

            actions = `
                <button
                    type="button"
                    class="pf-btn pf-btn-primary pf-magnetic"
                    data-pf-edit
                >
                    ✎ Edit profile
                </button>

                <button
                    type="button"
                    class="pf-btn pf-btn-glass pf-magnetic"
                    data-pf-share
                >
                    ↗ Share profile
                </button>

                <button
                    type="button"
                    class="pf-btn pf-btn-glass pf-magnetic"
                    data-pf-newpost
                >
                    ＋ New post
                </button>
            `;

        } else {

            const friend = {
                FRIEND: `
                    <button
                        type="button"
                        class="pf-btn pf-btn-glass pf-magnetic"
                        data-message-user="${esc(p.userId ?? "")}"
                    >
                        ✉ Message
                    </button>
                `,

                NONE: `
                    <button
                        type="button"
                        class="pf-btn pf-btn-glass pf-magnetic"
                        data-add-friend="${esc(p.userId ?? "")}"
                    >
                        ＋ Add friend
                    </button>
                `,

                OUTGOING: `
                    <button
                        type="button"
                        class="pf-btn pf-btn-glass"
                        disabled
                    >
                        Request sent
                    </button>
                `,

                INCOMING: `
                    <button
                        type="button"
                        class="pf-btn pf-btn-glass pf-magnetic"
                        data-accept-request="${esc(p.friendshipId ?? "")}"
                    >
                        Accept request
                    </button>
                `
            }[p.friendStatus] || "";

            actions = `
                <button
                    type="button"
                    class="pf-btn ${p.following ? "pf-btn-glass is-following" : "pf-btn-primary"} pf-magnetic"
                    data-pf-follow
                    aria-pressed="${Boolean(p.following)}"
                >
                    ${
                        p.following
                            ? "Following"
                            : (p.followsMe ? "Follow back" : "Follow")
                    }
                </button>

                ${friend}

                <button
                    type="button"
                    class="pf-btn pf-btn-glass pf-magnetic"
                    data-pf-share
                >
                    ↗ Share
                </button>
            `;
        }

        $("[data-pf-head]").innerHTML = `

            <div class="pf-avatar-ring pf-spin" data-tilt>

                <span class="pf-avatar">
                    ${avatarInner(p)}
                </span>

                ${p.online ? '<i class="pf-online" title="Online"></i>' : ""}

            </div>

            <div class="pf-info">

                <div class="pf-title">

                    <h2>${esc(p.displayName || "Student")}</h2>

                    <span class="pf-handle">
                        @${esc(p.username || "")}
                    </span>

                    ${p.online ? `
                        <span class="pf-chip pf-chip-online">
                            ● Online
                        </span>
                    ` : ""}

                </div>

                <div class="pf-stats">

                    ${stat("posts", "Posts")}

                    ${stat("followers", "Followers")}

                    ${stat("following", "Following")}

                </div>

                ${
                    p.bio
                        ? `<p class="pf-bio">${esc(p.bio)}</p>`
                        : (
                            p.me
                                ? `<p class="pf-bio is-muted">
                                    Add a short bio so students know what you are working toward.
                                   </p>`
                                : ""
                        )
                }

                <div class="pf-meta">

                    ${
                        p.course
                            ? `<span class="pf-chip">◈ ${esc(p.course)}</span>`
                            : ""
                    }

                    ${
                        p.university
                            ? `<span class="pf-chip">⌂ ${esc(p.university)}</span>`
                            : ""
                    }

                    ${
                        p.country
                            ? `<span class="pf-chip">◎ ${esc(p.country)}</span>`
                            : ""
                    }

                </div>

                ${
                    p.interests.length
                        ? `
                            <div class="pf-interests">
                                ${p.interests.map(item => `
                                    <span>${esc(item)}</span>
                                `).join("")}
                            </div>
                        `
                        : ""
                }

                <div class="pf-actions">

                    ${actions}

                    <div class="pf-more-wrap">

                        <button
                            type="button"
                            class="pf-btn pf-btn-glass pf-icon"
                            data-pf-more
                            aria-label="More options"
                            aria-haspopup="true"
                        >
                            ⋯
                        </button>

                        <div class="pf-menu" data-pf-menu hidden>

                            <button type="button" data-pf-share>
                                Copy profile link
                            </button>

                            ${
                                p.me
                                    ? `
                                        <button type="button" data-pf-edit>
                                            Privacy & edit settings
                                        </button>
                                    `
                                    : `
                                        <button
                                            type="button"
                                            data-report-user="${esc(p.userId ?? "")}"
                                        >
                                            Report profile
                                        </button>

                                        <button
                                            type="button"
                                            class="is-danger"
                                            data-block-user="${esc(p.userId ?? "")}"
                                        >
                                            Block student
                                        </button>
                                    `
                            }

                        </div>

                    </div>

                </div>

            </div>
        `;

        loadImages($("[data-pf-head]"));

        $$("[data-pf-stat] [data-count]").forEach((element, index) => {
            countUp(element, [
                p.postCount,
                p.followerCount,
                p.followingCount
            ][index]);
        });

        $$("[data-own-only]").forEach(button => {
            button.hidden = !p.me;
        });

        moveIndicator();
    }

    // --------------------------------------------------
    // Posts
    // --------------------------------------------------

    const skeletonGrid = () =>
        Array.from(
            { length: 6 },
            () => `<div class="pf-post is-skeleton"></div>`
        ).join("");

    const emptyState = () => {
        const mine = state.p?.me;

        const messages = {
            posts: [
                mine ? "You haven't posted yet" : "No posts to show",
                mine
                    ? "Share a project, idea or question with the community."
                    : "Posts you are allowed to see will appear here."
            ],

            liked: [
                "No liked posts yet",
                "Posts you like will be collected here."
            ],

            saved: [
                "Nothing saved yet",
                "Save posts from the feed to read them later."
            ]
        };

        const message = messages[state.tab] || messages.posts;

        return `
            <div class="pf-empty">

                <span>✦</span>

                <h3>${message[0]}</h3>

                <p>${message[1]}</p>

                ${
                    mine && state.tab === "posts"
                        ? `
                            <button
                                type="button"
                                class="pf-btn pf-btn-primary"
                                data-pf-newpost
                            >
                                Create your first post
                            </button>
                        `
                        : ""
                }

            </div>
        `;
    };

    const postCard = post => {
        const images = Array.isArray(post.images)
            ? post.images
            : [];

        const first = images[0];

        const caption = esc(
            (post.content || "").slice(0, 120)
        );

        return `
            <article
                class="pf-post pf-reveal"
                data-tilt
                data-pf-post="${esc(post.id)}"
                tabindex="0"
                role="button"
                aria-label="Open post"
            >

                ${
                    first
                        ? `
                            <img
                                data-pf-lazy="${esc(first)}"
                                alt=""
                                loading="lazy"
                            >
                        `
                        : `
                            <div class="pf-post-text">
                                <p>${caption || "Post"}</p>
                            </div>
                        `
                }

                ${
                    images.length > 1
                        ? `
                            <span class="pf-multi" title="${images.length} images">
                                ❐
                            </span>
                        `
                        : ""
                }

                <div class="pf-post-overlay">

                    <div class="pf-post-stats">

                        <span>♥ ${compact(post.likeCount)}</span>

                        <span>💬 ${compact(post.commentCount)}</span>

                    </div>

                    ${first && caption ? `<p>${caption}</p>` : ""}

                    <b>View post →</b>

                </div>

            </article>
        `;
    };

    async function loadPosts(reset = false) {
        if (state.loading || !state.p) return;

        state.loading = true;

        const gen = state.gen;

        const grid = $("[data-pf-grid]");

        if (reset) {
            state.page = 0;
            state.posts = [];

            grid.innerHTML = skeletonGrid();

            $("[data-pf-grid-more]").hidden = true;
        }

        try {
            const result = await feedApi.profilePosts(
                state.p.username,
                state.tab,
                state.page
            );

            if (gen !== state.gen) return;

            const content = Array.isArray(result?.content)
                ? result.content
                : [];

            const currentPage = Number(result?.page ?? state.page);

            const totalPages = Number(result?.totalPages ?? 1);

            if (reset) {
                grid.innerHTML = "";
            }

            state.posts = state.posts.concat(content);

            state.last = currentPage >= totalPages - 1;

            if (!state.posts.length) {
                grid.innerHTML = emptyState();
            } else {
                grid.insertAdjacentHTML(
                    "beforeend",
                    content.map(postCard).join("")
                );

                watchLazy(grid);

                watchReveal(grid);
            }

            $("[data-pf-grid-more]").hidden = state.last;

        } catch (error) {

            if (gen !== state.gen) return;

            grid.innerHTML = `
                <div class="pf-empty is-error">

                    <span>!</span>

                    <h3>Could not load posts</h3>

                    <p>${esc(error.message)}</p>

                    <button
                        type="button"
                        class="pf-btn pf-btn-primary"
                        data-pf-retry
                    >
                        Try again
                    </button>

                </div>
            `;

        } finally {

            if (gen === state.gen) {
                state.loading = false;
            }
        }
    }

    // --------------------------------------------------
    // Load profile
    // --------------------------------------------------

    async function load(username = state.username) {
        state.username = username;

        const gen = ++state.gen;

        state.loading = false;

        state.tab = "posts";

        $$("[data-pf-tab]").forEach(button => {
            button.classList.toggle(
                "is-active",
                button.dataset.pfTab === "posts"
            );
        });

        $("[data-pf-head]").innerHTML = `
            <div class="pf-skel-head">
                <i></i>
                <div>
                    <b></b>
                    <b></b>
                    <b></b>
                </div>
            </div>
        `;

        $("[data-pf-grid]").innerHTML = skeletonGrid();

        $("[data-pf-grid-more]").hidden = true;

        try {
            const profile = await feedApi.profile(username);

            if (gen !== state.gen) return;

            if (!profile || typeof profile !== "object") {
                throw new Error("Invalid profile response.");
            }

            state.p = profile;

            renderHeader();

            await loadPosts(true);

        } catch (error) {

            if (gen !== state.gen) return;

            state.p = null;

            $("[data-pf-head]").innerHTML = `
                <div class="pf-empty is-error">

                    <span>!</span>

                    <h3>Profile unavailable</h3>

                    <p>${esc(error.message)}</p>

                    <button
                        type="button"
                        class="pf-btn pf-btn-primary"
                        data-pf-home
                    >
                        Back to my profile
                    </button>

                </div>
            `;

            $("[data-pf-grid]").innerHTML = "";
        }
    }

    async function refreshDetail() {
        if (!state.p) return;

        try {
            const profile = await feedApi.profile(state.p.username);

            if (!profile || typeof profile !== "object") return;

            state.p = profile;

            renderHeader();

        } catch {
            // Keep the current profile if refreshing fails.
        }
    }

    // --------------------------------------------------
    // Followers / following
    // --------------------------------------------------

    const personRow = person => {
        let button = "";

        if (!person.me) {
            button = person.following
                ? `
                    <button
                        type="button"
                        class="pf-btn pf-btn-glass pf-small"
                        data-pf-toggle-follow="${esc(person.username)}"
                        data-state="following"
                    >
                        ${
                            state.people.kind === "following" && state.p?.me
                                ? "Unfollow"
                                : "Following"
                        }
                    </button>
                `
                : `
                    <button
                        type="button"
                        class="pf-btn pf-btn-primary pf-small"
                        data-pf-toggle-follow="${esc(person.username)}"
                        data-state="none"
                    >
                        ${person.followsMe ? "Follow back" : "Follow"}
                    </button>
                `;
        }

        return `
            <div class="pf-person" data-pf-person="${esc(person.username)}">

                <button
                    type="button"
                    class="pf-person-main"
                    data-pf-open-user="${esc(person.username)}"
                >

                    <span class="pf-avatar pf-avatar-sm">
                        ${avatarInner(person)}
                    </span>

                    <span>

                        <b>${esc(person.displayName || "Student")}</b>

                        <small>@${esc(person.username)}</small>

                        ${
                            person.bio
                                ? `<em>${esc(person.bio.slice(0, 70))}</em>`
                                : ""
                        }

                    </span>

                </button>

                ${button}

            </div>
        `;
    };

    async function loadPeople(reset = false) {
        const box = state.people;

        if (box.loading || !state.p) return;

        box.loading = true;

        const list = $("[data-pf-people-list]");

        if (reset) {
            box.page = 0;

            list.innerHTML = `
                <div class="pf-person is-skeleton"></div>
            `.repeat(4);

            $("[data-pf-people-more]").hidden = true;
        }

        try {
            const method = box.kind === "followers"
                ? feedApi.followers
                : feedApi.following;

            const result = await method(
                state.p.username,
                box.page
            );

            const content = Array.isArray(result?.content)
                ? result.content
                : [];

            if (reset) {
                list.innerHTML = "";
            }

            if (reset && !content.length) {
                list.innerHTML = `
                    <div class="pf-empty">

                        <span>✦</span>

                        <h3>
                            ${
                                box.kind === "followers"
                                    ? "No followers yet"
                                    : "Not following anyone yet"
                            }
                        </h3>

                    </div>
                `;
            } else {
                list.insertAdjacentHTML(
                    "beforeend",
                    content.map(personRow).join("")
                );
            }

            loadImages(list);

            const currentPage = Number(result?.page ?? box.page);

            const totalPages = Number(result?.totalPages ?? 1);

            box.last = currentPage >= totalPages - 1;

            $("[data-pf-people-more]").hidden = box.last;

        } catch (error) {

            list.innerHTML = `
                <p class="pf-error">${esc(error.message)}</p>
            `;

        } finally {
            box.loading = false;
        }
    }

    function openPeople(kind) {
        if (!state.p) return;

        state.people.kind = kind;

        $("[data-pf-people-title]").textContent =
            kind === "followers" ? "Followers" : "Following";

        $("[data-pf-people]").showModal();

        loadPeople(true);
    }

    // --------------------------------------------------
    // Edit profile
    // --------------------------------------------------

    function fillEdit() {
        const p = state.p;

        const form = $("[data-pf-edit-form]");

        state.edit = {
            avatar: null,
            cover: null,
            removeAvatar: false,
            removeCover: false
        };

        form.elements.displayName.value = p.displayName || "";

        form.elements.username.value = p.username || "";

        form.elements.bio.value = p.bio || "";

        form.elements.university.value = p.university || "";

        form.elements.course.value = p.course || "";

        form.elements.country.value = p.country || "";

        form.elements.interests.value = (
            Array.isArray(p.interests) ? p.interests : []
        ).join(", ");

        form.elements.discoverable.checked = Boolean(p.discoverable);

        form.elements.showOnline.checked = Boolean(p.showOnline);

        $("[data-pf-edit-error]").hidden = true;

        paintEditImages();
    }

    function paintEditImages() {
        const p = state.p;

        const edit = state.edit;

        const avatarBox = $("[data-pf-edit-avatar]");

        const coverBox = $("[data-pf-edit-cover]");

        if (edit.avatar) {

            const url = URL.createObjectURL(edit.avatar);

            avatarBox.innerHTML = `
                <img
                    src="${url}"
                    alt=""
                    class="is-loaded"
                >
                <b>${esc(initials(p.displayName))}</b>
            `;

        } else if (!edit.removeAvatar && p.avatarUrl) {

            avatarBox.innerHTML = avatarInner(p);

            loadImages(avatarBox);

        } else {

            avatarBox.innerHTML = `
                <b>${esc(initials(p.displayName))}</b>
            `;
        }

        coverBox.style.backgroundImage = "";

        if (edit.cover) {

            const url = URL.createObjectURL(edit.cover);

            coverBox.style.backgroundImage = `url("${url}")`;

        } else if (!edit.removeCover && p.coverUrl) {

            blobUrl(p.coverUrl).then(url => {
                coverBox.style.backgroundImage = `url("${url}")`;
            }).catch(() => {});
        }
    }

    const pickImage = (input, key) => {
        const file = input.files[0];

        input.value = "";

        if (!file) return;

        if (!IMAGE_TYPES.includes(file.type)) {
            return toast(
                "Use a JPEG, PNG or WebP image.",
                true
            );
        }

        if (file.size > MAX_IMAGE_BYTES) {
            return toast(
                "Images must be 5 MB or smaller.",
                true
            );
        }

        state.edit[key] = file;

        state.edit[
            key === "avatar"
                ? "removeAvatar"
                : "removeCover"
        ] = false;

        paintEditImages();
    };

    $("[data-pf-avatar-input]").addEventListener(
        "change",
        event => pickImage(event.target, "avatar")
    );

    $("[data-pf-cover-input]").addEventListener(
        "change",
        event => pickImage(event.target, "cover")
    );

    $("[data-pf-edit-form]").addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            const form = event.currentTarget;

            const error = $("[data-pf-edit-error]");

            const submit = form.querySelector('[type="submit"]');

            const data = new FormData();

            [
                "displayName",
                "username",
                "bio",
                "university",
                "course",
                "country",
                "interests"
            ].forEach(key => {
                data.append(
                    key,
                    form.elements[key].value.trim()
                );
            });

            data.append(
                "discoverable",
                form.elements.discoverable.checked
            );

            data.append(
                "showOnline",
                form.elements.showOnline.checked
            );

            data.append(
                "removeAvatar",
                state.edit.removeAvatar
            );

            data.append(
                "removeCover",
                state.edit.removeCover
            );

            if (state.edit.avatar) {
                data.append("avatar", state.edit.avatar);
            }

            if (state.edit.cover) {
                data.append("cover", state.edit.cover);
            }

            submit.disabled = true;

            submit.textContent = "Saving…";

            try {
                const updated = await feedApi.updateProfile(data);

                // Some APIs return no response body after a successful update.
                // Refresh the profile if the service does not return an object.
                state.p = updated && typeof updated === "object"
                    ? updated
                    : await feedApi.profile(state.p.username);

                blobs.clear();

                $("[data-pf-edit-dialog]").close();

                renderHeader();

                const nameNode = root.querySelector("[data-my-name]");

                const avatarNode = root.querySelector("[data-my-avatar]");

                const courseNode = root.querySelector("[data-my-course]");

                if (nameNode) {
                    nameNode.textContent = state.p.displayName || "";
                }

                if (avatarNode) {
                    refreshCommunityAvatar(avatarNode, state.p);
                }

                if (courseNode) {
                    courseNode.textContent =
                        state.p.course ||
                        (
                            state.p.discoverable
                                ? "Discoverable student"
                                : "Profile hidden from discovery"
                        );
                }

                toast("Profile updated.");

            } catch (err) {

                error.textContent =
                    err.message || "Could not save your profile.";

                error.hidden = false;

            } finally {

                submit.disabled = false;

                submit.textContent = "Save changes";
            }
        }
    );

    // --------------------------------------------------
    // Share profile
    // --------------------------------------------------

    async function shareProfile() {
        if (!state.p) return;

        const link = `${
            location.origin
        }/community?profile=${
            encodeURIComponent(state.p.username)
        }`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${state.p.displayName} on StepInStudents`,
                    url: link
                });

                return;

            } catch {
                // User cancelled sharing.
            }
        }

        try {
            await navigator.clipboard.writeText(link);

            toast("Profile link copied.");

        } catch {
            toast(link);
        }
    }

    // --------------------------------------------------
    // Event handling
    // --------------------------------------------------

    host.addEventListener("click", async event => {
        const target = event.target;

        if (!target.closest("[data-pf-more]")) {
            $$("[data-pf-menu]").forEach(menu => {
                menu.hidden = true;
            });
        }

        const peopleDialog = $("[data-pf-people]");

        const editDialog = $("[data-pf-edit-dialog]");

        if (target === peopleDialog || target === editDialog) {
            target.close();
            return;
        }

        const closeButton = target.closest("[data-pf-close]");

        if (closeButton) {
            closeButton.closest("dialog").close();
            return;
        }

        // Profile tabs
        const tab = target.closest("[data-pf-tab]");

        if (tab) {
            if (state.tab === tab.dataset.pfTab) return;

            state.tab = tab.dataset.pfTab;

            state.gen++;

            state.loading = false;

            $$("[data-pf-tab]").forEach(button => {
                button.classList.toggle("is-active", button === tab);
            });

            moveIndicator();

            loadPosts(true);

            return;
        }

        // Profile counts
        const stat = target.closest("[data-pf-stat]");

        if (stat) {
            if (stat.dataset.pfStat === "posts") {
                $("[data-pf-tabs]").scrollIntoView({
                    behavior: REDUCED ? "auto" : "smooth",
                    block: "start"
                });

                return;
            }

            openPeople(stat.dataset.pfStat);

            return;
        }

        // Edit profile
        if (target.closest("[data-pf-edit]")) {
            fillEdit();

            editDialog.showModal();

            return;
        }

        // Share profile
        if (target.closest("[data-pf-share]")) {
            shareProfile();

            return;
        }

        // New post
        if (target.closest("[data-pf-newpost]")) {
            root.querySelector(
                '[data-community-tab="feed"]'
            )?.click();

            setTimeout(() => {
                root.querySelector(
                    "[data-feed-open-composer]"
                )?.click();
            }, 60);

            return;
        }

        // More options
        if (target.closest("[data-pf-more]")) {
            const menu = $("[data-pf-menu]");

            menu.hidden = !menu.hidden;

            return;
        }

        // Retry posts
        if (target.closest("[data-pf-retry]")) {
            loadPosts(true);

            return;
        }

        // Back to own profile
        if (target.closest("[data-pf-home]")) {
            load("me");

            return;
        }

        // More posts
        if (target.closest("[data-pf-load-more]")) {
            if (state.last) return;

            state.page++;

            loadPosts();

            return;
        }

        // More followers/following
        if (target.closest("[data-pf-people-load]")) {
            if (state.people.last) return;

            state.people.page++;

            loadPeople();

            return;
        }

        // Remove avatar
        if (target.closest("[data-pf-remove-avatar]")) {
            state.edit.avatar = null;

            state.edit.removeAvatar = true;

            paintEditImages();

            return;
        }

        // Remove cover
        if (target.closest("[data-pf-remove-cover]")) {
            state.edit.cover = null;

            state.edit.removeCover = true;

            paintEditImages();

            return;
        }

        // Open post
        const post = target.closest("[data-pf-post]");

        if (post) {
            root.dispatchEvent(
                new CustomEvent("feed:view-post", {
                    detail: Number(post.dataset.pfPost)
                })
            );

            return;
        }

        // Open another user's profile
        const openUser = target.closest("[data-pf-open-user]");

        if (openUser) {
            peopleDialog.close();

            openProfile(openUser.dataset.pfOpenUser);

            return;
        }

        // Follow / unfollow profile
        const follow = target.closest("[data-pf-follow]");

        if (follow && state.p) {
            follow.disabled = true;

            const wasFollowing = Boolean(state.p.following);

            const result = await attempt(() => {
                return wasFollowing
                    ? feedApi.unfollow(state.p.username)
                    : feedApi.follow(state.p.username);
            });

            if (result !== false) {
                await refreshDetail();
            } else {
                follow.disabled = false;
            }

            return;
        }

        // Follow / unfollow from followers list
        const toggle = target.closest("[data-pf-toggle-follow]");

        if (toggle) {
            const username = toggle.dataset.pfToggleFollow;

            const following = toggle.dataset.state === "following";

            toggle.disabled = true;

            const result = await attempt(() => {
                return following
                    ? feedApi.unfollow(username)
                    : feedApi.follow(username);
            });

            if (result !== false) {
                await refreshDetail();

                state.people.page = 0;

                await loadPeople(true);

            } else {
                toggle.disabled = false;
            }

            return;
        }

        // Existing community module handles friend requests and blocking.
        if (
            target.closest(
                "[data-add-friend], [data-accept-request], [data-block-user]"
            )
        ) {
            setTimeout(refreshDetail, 900);
        }
    });

    // --------------------------------------------------
    // Keyboard support for posts
    // --------------------------------------------------

    host.addEventListener("keydown", event => {
        const post = event.target.closest("[data-pf-post]");

        if (
            post &&
            (event.key === "Enter" || event.key === " ")
        ) {
            event.preventDefault();

            post.click();
        }
    });

    // --------------------------------------------------
    // Open full profile from community
    // --------------------------------------------------

    root.addEventListener("click", event => {
        const link = event.target.closest("[data-view-profile], [data-view-profile-id]");

        if (!link || !link.dataset.viewProfile) {
            return;
        }

        event.stopPropagation();

        event.preventDefault();

        root.querySelectorAll("dialog[open]").forEach(dialog => {
            dialog.close();
        });

        openProfile(link.dataset.viewProfile);

    }, true);

    function openProfile(username) {
        if (!username) return;

        state.navigating = true;

        root.querySelector(
            '[data-community-tab="profile"]'
        )?.click();

        state.navigating = false;

        state.started = true;

        load(username);

        host.scrollIntoView({
            block: "start",
            behavior: REDUCED ? "auto" : "smooth"
        });
    }

    // --------------------------------------------------
    // Open own profile from sidebar
    // --------------------------------------------------

    root.addEventListener("click", event => {
        if (
            state.navigating ||
            !event.target.closest(
                '[data-community-tab="profile"]'
            )
        ) {
            return;
        }

        if (!state.started || state.username !== "me") {
            state.started = true;

            load("me");
        }
    });

    // --------------------------------------------------
    // Refresh after feed changes
    // --------------------------------------------------

    root.addEventListener("feed:changed", () => {
        if (!state.p) return;

        if (host.closest("[hidden]")) {
            state.started = false;

            return;
        }

        refreshDetail();

        state.gen++;

        state.loading = false;

        loadPosts(true);
    });

    // --------------------------------------------------
    // Profile deep link
    // --------------------------------------------------

    const deep = new URLSearchParams(
        location.search
    ).get("profile");

    if (
        deep &&
        /^[a-zA-Z0-9_]{3,40}$/.test(deep)
    ) {
        setTimeout(() => openProfile(deep), 0);
    }

    // --------------------------------------------------
    // Initialize
    // --------------------------------------------------

    watchReveal(host);

    if ("ResizeObserver" in window) {
        new ResizeObserver(moveIndicator).observe(
            $("[data-pf-tabs]")
        );
    }

}

export default initCommunityProfile;
