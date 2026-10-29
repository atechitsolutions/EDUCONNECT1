
import { getOnlineEducationProgrammes } from "../../services/onlineEducationService.js";
import { onlineEducationInstitutions } from "../../data/onlineEducationInstitutions.js";
import { renderOnlineEducationCustomCards } from "./onlineEducationCustomCards.js";
import { addProgrammeImages } from "../../utils/onlineEducationImages.js";

const byId = (id) => document.getElementById(id);

const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

const storage = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
        return fallback;
    }
};

function setMeta(selector, attribute, value, createTag) {
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement(createTag);
        document.head.append(element);
    }

    element.setAttribute(attribute, value);

    if (createTag === "meta") {
        element.setAttribute("content", value);
    }
}

function updatePageMetadata() {
    const title = "Online Education: Compare Courses & Degrees | EduConnect";
    const description =
        "Compare online courses, certificates, diplomas and degree programmes. Explore learning websites by education level, subject, study mode and destination.";
    const canonicalUrl = "https://www.educonnect.com/online-education/";

    document.title = title;

    setMeta('meta[name="description"]', "name", description, "meta");
    setMeta('meta[property="og:type"]', "property", "website", "meta");
    setMeta('meta[property="og:site_name"]', "property", "EduConnect", "meta");
    setMeta('meta[property="og:title"]', "property", title, "meta");
    setMeta('meta[property="og:description"]', "property", description, "meta");
    setMeta('meta[property="og:url"]', "property", canonicalUrl, "meta");
    setMeta('meta[name="twitter:card"]', "name", "summary", "meta");
    setMeta('meta[name="twitter:title"]', "name", title, "meta");
    setMeta('meta[name="twitter:description"]', "name", description, "meta");

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
    }

    canonical.href = canonicalUrl;
}

function formatTuition(programme) {
    if (
        programme.tuitionAmount === null ||
        programme.tuitionAmount === undefined
    ) {
        return "Check provider website";
    }

    const currency = programme.currency || "";
    const amount = Number(programme.tuitionAmount).toLocaleString();

    return `${currency} ${amount}${programme.feePeriod ? ` · ${programme.feePeriod}` : ""}`.trim();
}

function getProviderInitials(providerName = "") {
    return String(providerName)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("") || "ED";
}

function safeExternalUrl(url) {
    try {
        const parsed = new URL(String(url || ""), window.location.href);

        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed.href;
        }
    } catch {
        // Invalid or missing URLs are not rendered as links.
    }

    return "";
}

/*
 * Locate an enquiry form already present on the page.
 * This function does not create a new form or assume an ID.
 */
function findExistingEnquiryTarget(root) {
    const forms = [...root.querySelectorAll("form")].filter(
        (form) => !form.matches("#oe-hero-search-form")
    );

    const enquiryWords =
        /\b(enquir(?:y|ies)|contact|counselling|counseling|consultation|request information|speak to an advisor|speak to an adviser|get in touch)\b/i;

    for (const form of forms) {
        const searchableText = [
            form.id,
            form.getAttribute("name"),
            form.getAttribute("aria-label"),
            form.getAttribute("action"),
            form.className,
            form.innerText,
            [...form.querySelectorAll("label, button, input, textarea")]
                .map((element) => [
                    element.innerText,
                    element.getAttribute("placeholder"),
                    element.getAttribute("aria-label"),
                    element.value
                ].filter(Boolean).join(" "))
                .join(" ")
        ].join(" ");

        if (enquiryWords.test(searchableText)) {
            return form;
        }
    }

    for (const form of forms) {
        const section = form.closest(
            "section, article, [role='region'], .oe-section"
        );

        if (
            section &&
            enquiryWords.test([
                section.id,
                section.className,
                section.getAttribute("aria-label"),
                section.querySelector("h1, h2, h3, h4")?.innerText
            ].filter(Boolean).join(" "))
        ) {
            return section;
        }
    }

    const sections = [
        ...root.querySelectorAll(
            "section, article, [role='region'], .oe-section"
        )
    ];

    return sections.find((element) =>
        enquiryWords.test([
            element.id,
            element.className,
            element.getAttribute("aria-label"),
            element.querySelector("h1, h2, h3, h4")?.innerText
        ].filter(Boolean).join(" "))
    ) || null;
}

function scrollToExistingEnquiry(root) {
    const target = findExistingEnquiryTarget(root);

    if (!target) {
        window.alert(
            "An existing enquiry form could not be identified on this page. " +
            "Please check the page markup and ensure the enquiry form is present."
        );
        return;
    }

    target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "start"
    });

    const firstControl = target.matches("form")
        ? target.querySelector(
            'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])'
        )
        : target.querySelector(
            'form input:not([type="hidden"]):not([disabled]), form textarea:not([disabled]), form select:not([disabled])'
        );

    if (firstControl) {
        window.setTimeout(() => {
            firstControl.focus({ preventScroll: true });
        }, 350);
    }
}

function getProgrammeDetails(programme) {
    const fields = [
        ["Institution", programme.providerName],
        ["Subject", programme.subject],
        ["Qualification", programme.qualificationType],
        ["Education level", programme.educationLevel],
        ["Study mode", programme.studyMode],
        ["Country", programme.country],
        ["Duration", programme.duration],
        ["Tuition", formatTuition(programme)]
    ];

    return fields.map(([label, value]) => `
        <div class="oe-detail-row">
            <dt>${escapeHTML(label)}</dt>
            <dd>${escapeHTML(value || "Check provider website")}</dd>
        </div>
    `).join("");
}

export async function initOnlineEducationPage() {
    updatePageMetadata();

    const root = byId("online-education-page");

    if (!root) return;

    const results = byId("oe-programme-results");

    if (!results) {
        console.warn("Online Education: programme results container was not found.");
        return;
    }

    const heroVideo = root.querySelector(".oe-hero-video");

    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;

        const startHeroVideo = () => {
            const playback = heroVideo.play();
            if (playback) playback.catch(() => {});
        };

        heroVideo.addEventListener("canplay", startHeroVideo, { once: true });
        startHeroVideo();
    }

    try {
        await renderOnlineEducationCustomCards();
    } catch (error) {
        console.warn("Online education card changes could not be loaded.", error);
    }

    const filters = [
        "level",
        "mode",
        "country",
        "type",
        "subject",
        "difficulty",
        "budget"
    ];

    let programmes = [];
    let visibleLimit = 6;

    let favourites = storage("educonnect-online-favourites", []);
    let compared = storage("educonnect-online-compare", []);
    let institutionCompared = [];

    let institutionsExpanded = false;
    let cardObserver = null;
    let detailsDialog = null;

    const motionEnabled =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------
       SUBJECT CAROUSEL
    --------------------------------------------------------- */

    const subjectCarousel = root.querySelector("[data-subject-carousel]");
    const subjectTrack = root.querySelector("[data-subject-track]");

    if (subjectCarousel && subjectTrack) {
        if (!subjectTrack.dataset.loopReady) {
            const originalCards = [
                ...subjectTrack.querySelectorAll(".oe-subject-card")
            ];

            const firstWidth =
                originalCards[0]?.getBoundingClientRect().width || 0;

            const gap =
                parseFloat(getComputedStyle(subjectTrack).gap) || 0;

            const cardStep = firstWidth + gap;

            if (cardStep > 0) {
                const cloneCount = Math.min(
                    originalCards.length,
                    Math.ceil(subjectCarousel.clientWidth / cardStep) + 1
                );

                originalCards.slice(0, cloneCount).forEach((card) => {
                    const clone = card.cloneNode(true);

                    clone.setAttribute("aria-hidden", "true");
                    clone.tabIndex = -1;
                    clone.dataset.carouselClone = "true";

                    subjectTrack.append(clone);
                });
            }

            subjectTrack.dataset.loopReady = "true";
        }

        let subjectIndex = 0;
        let subjectTimer;

        const originals = () => [
            ...subjectTrack.querySelectorAll(
                ".oe-subject-card:not([data-carousel-clone])"
            )
        ];

        const moveSubject = (direction) => {
            const cards = originals();

            if (!cards.length) return;

            const gap =
                parseFloat(getComputedStyle(subjectTrack).gap) || 0;

            const step = cards[0].getBoundingClientRect().width + gap;

            if (!step) return;

            const nextIndex = subjectIndex + direction;

            if (nextIndex >= cards.length) {
                subjectIndex = cards.length;

                subjectCarousel.scrollTo({
                    left: step * subjectIndex,
                    behavior: "smooth"
                });

                window.setTimeout(() => {
                    subjectIndex = 0;
                    subjectCarousel.scrollTo({
                        left: 0,
                        behavior: "auto"
                    });
                }, 720);

                return;
            }

            if (nextIndex < 0) {
                subjectIndex = Math.max(
                    0,
                    cards.length -
                        Math.ceil(subjectCarousel.clientWidth / step)
                );

                subjectCarousel.scrollTo({
                    left: step * subjectIndex,
                    behavior: "auto"
                });

                return;
            }

            subjectIndex = nextIndex;

            subjectCarousel.scrollTo({
                left: step * subjectIndex,
                behavior: "smooth"
            });
        };

        const restartSubjectAutoplay = () => {
            window.clearInterval(subjectTimer);

            if (!document.hidden && originals().length > 1) {
                subjectTimer = window.setInterval(
                    () => moveSubject(1),
                    2600
                );
            }
        };

        root.querySelector("[data-subject-prev]")?.addEventListener(
            "click",
            () => {
                moveSubject(-1);
                restartSubjectAutoplay();
            }
        );

        root.querySelector("[data-subject-next]")?.addEventListener(
            "click",
            () => {
                moveSubject(1);
                restartSubjectAutoplay();
            }
        );

        document.addEventListener(
            "visibilitychange",
            restartSubjectAutoplay
        );

        restartSubjectAutoplay();
    }

    /* ---------------------------------------------------------
       REVEAL ANIMATIONS
    --------------------------------------------------------- */

    if (motionEnabled && "IntersectionObserver" in window) {
        root.classList.add("oe-motion-ready");

        cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -24px 0px"
            }
        );
    }

    const observeCards = () => {
        if (!cardObserver) {
            root.querySelectorAll(".oe-reveal").forEach((card) => {
                card.classList.add("is-visible");
            });
            return;
        }

        root.querySelectorAll(".oe-reveal:not(.is-visible)").forEach(
            (card, index) => {
                card.style.setProperty(
                    "--oe-stagger",
                    `${Math.min(index % 6, 5) * 55}ms`
                );

                cardObserver.observe(card);
            }
        );
    };

    root.querySelectorAll(
        ".oe-level-card, .oe-subject-card, .oe-popular-card, " +
        ".oe-platform-card, .oe-institution-card, .oe-provider-card, " +
        ".oe-path-grid a, .oe-steps article"
    ).forEach((card) => card.classList.add("oe-reveal"));

    observeCards();

    /* ---------------------------------------------------------
       POINTER SPOTLIGHT AND CARD TILT
    --------------------------------------------------------- */

    if (
        motionEnabled &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        root.addEventListener("pointermove", (event) => {
            const card = event.target.closest(
                ".oe-popular-card, .oe-platform-card, .oe-programme-card, " +
                ".oe-level-card, .oe-subject-card, .oe-provider-card, .oe-path-grid a"
            );

            if (!card) return;

            const rect = card.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            card.style.setProperty("--oe-pointer-x", `${x * 100}%`);
            card.style.setProperty("--oe-pointer-y", `${y * 100}%`);

            if (
                card.matches(
                    ".oe-programme-card, .oe-popular-card, .oe-platform-card"
                )
            ) {
                card.style.setProperty(
                    "--oe-tilt-x",
                    `${(0.5 - y) * 3}deg`
                );

                card.style.setProperty(
                    "--oe-tilt-y",
                    `${(x - 0.5) * 3}deg`
                );
            }
        });

        root.addEventListener("pointerout", (event) => {
            const card = event.target.closest(
                ".oe-popular-card, .oe-platform-card, .oe-programme-card, " +
                ".oe-level-card, .oe-subject-card, .oe-provider-card, .oe-path-grid a"
            );

            if (card && !card.contains(event.relatedTarget)) {
                card.style.removeProperty("--oe-tilt-x");
                card.style.removeProperty("--oe-tilt-y");
            }
        });
    }

    /* ---------------------------------------------------------
       SEARCH, FILTERS AND STORAGE
    --------------------------------------------------------- */

    const getState = () => ({
        query: byId("oe-hero-query")?.value.trim().toLowerCase() || "",
        level: byId("oe-filter-level")?.value || "",
        mode: byId("oe-filter-mode")?.value || "",
        country: byId("oe-filter-country")?.value || "",
        type: byId("oe-filter-type")?.value || "",
        subject: byId("oe-filter-subject")?.value || "",
        difficulty: byId("oe-filter-difficulty")?.value || "",
        budget: byId("oe-filter-budget")?.value || ""
    });

    const syncStorage = () => {
        try {
            localStorage.setItem(
                "educonnect-online-favourites",
                JSON.stringify(favourites)
            );

            localStorage.setItem(
                "educonnect-online-compare",
                JSON.stringify(compared)
            );
        } catch {
            // Filtering still works if browser storage is unavailable.
        }
    };

    const matches = (programme, state) => {
        const text = [
            programme.title,
            programme.providerName,
            programme.subject,
            programme.educationLevel,
            programme.qualificationType,
            programme.studyMode,
            programme.country,
            programme.difficultyLevel
        ].join(" ").toLowerCase();

        const subjectAlias = {
            "AI & Machine Learning": "Artificial Intelligence",
            "Computer Science": "Computer Science & IT",
            "Business": "Business & Management",
            "Engineering": "Engineering & Technology",
            "Healthcare": "Medicine & Healthcare",
            "Finance": "Finance & Accounting",
            "Digital Marketing": "Marketing",
            "Design": "Design & Media",
            "Education": "Education"
        };

        const levelAliases = {
            "Undergraduate": ["Undergraduate"],
            "Bachelor's": ["Bachelor's"],
            "Postgraduate": ["Postgraduate"],
            "Master's": ["Master's"],
            "Doctoral": ["Doctoral"],
            "PhD / Doctorate": ["PhD / Doctorate"],
            "MBA": ["MBA"],
            "Online Degree": ["Online Degree"],
            "Professional Certificate": ["Professional Certificate"],
            "Microcredential": ["Microcredential"],
            "Short Course": ["Short Course"]
        };

        const levelOK =
            !state.level ||
            (levelAliases[state.level] || [state.level]).includes(
                programme.educationLevel
            ) ||
            (
                state.level === "Professional Certificate" &&
                (programme.categories || []).includes("Professional Certificate")
            );

        const amount = programme.tuitionAmount;

        const budgetOK =
            !state.budget ||
            (
                amount !== null &&
                amount !== undefined &&
                (
                    state.budget === "free"
                        ? amount === 0
                        : state.budget === "10000"
                            ? amount < 10000
                            : state.budget === "50000"
                                ? amount >= 10000 && amount <= 50000
                                : state.budget === "100000"
                                    ? amount > 50000 && amount <= 100000
                                    : state.budget === "500000"
                                        ? amount > 100000 && amount <= 500000
                                        : amount > 500000
                )
            );

        return (
            (!state.query || text.includes(state.query)) &&
            levelOK &&
            (
                !state.mode ||
                String(programme.studyMode || "")
                    .toLowerCase()
                    .includes(state.mode.toLowerCase())
            ) &&
            (!state.country || programme.country === state.country) &&
            (!state.type || programme.providerType === state.type) &&
            (
                !state.subject ||
                programme.subject === state.subject ||
                programme.subject === subjectAlias[state.subject] ||
                String(programme.subject || "")
                    .toLowerCase()
                    .includes(state.subject.toLowerCase())
            ) &&
            (
                !state.difficulty ||
                programme.difficultyLevel === state.difficulty
            ) &&
            budgetOK
        );
    };

    /* ---------------------------------------------------------
       DETAILS DIALOG
    --------------------------------------------------------- */

    const ensureDetailsDialog = () => {
        if (detailsDialog?.isConnected) return detailsDialog;

        detailsDialog = document.createElement("dialog");
        detailsDialog.className =
            "oe-compare-dialog oe-programme-details-dialog";
        detailsDialog.setAttribute("aria-label", "Programme details");

        root.append(detailsDialog);

        return detailsDialog;
    };

    const openProgrammeDetails = (id) => {
        const programme = programmes.find(
            (item) => String(item.id) === String(id)
        );

        if (!programme) return;

        const dialog = ensureDetailsDialog();
        const providerUrl = safeExternalUrl(programme.officialProgramUrl);

        dialog.innerHTML = `
            <div class="oe-dialog-head">
                <div>
                    <p class="oe-eyebrow">PROGRAMME OVERVIEW</p>
                    <h2>${escapeHTML(programme.title)}</h2>
                    <p>${escapeHTML(programme.providerName)}</p>
                </div>

                <button
                    type="button"
                    class="oe-icon-button"
                    data-close-details
                    aria-label="Close programme details"
                >×</button>
            </div>

            <p class="oe-dialog-note">
                Review the available programme information below. Confirm
                fees, entry requirements, delivery, dates and recognition
                directly with the provider.
            </p>

            <dl class="oe-programme-detail-list">
                ${getProgrammeDetails(programme)}
            </dl>

            <div class="oe-dialog-actions">
                ${
                    providerUrl
                        ? `<a
                            class="oe-button oe-outline"
                            href="${escapeHTML(providerUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Visit provider ↗</a>`
                        : ""
                }

                <button
                    type="button"
                    class="oe-button oe-primary"
                    data-enquire-programme="${escapeHTML(programme.id)}"
                >Enquire Now</button>

                <button
                    type="button"
                    class="oe-button oe-outline"
                    data-close-details
                >Close</button>
            </div>
        `;

        if (!dialog.open) dialog.showModal();
    };

    /* ---------------------------------------------------------
       PROGRAMME CARD RENDERER
    --------------------------------------------------------- */

    const renderProgrammeCard = (programme) => {
        const id = String(programme.id);
        const providerName = programme.providerName || "Institution";
        const providerInitials = getProviderInitials(providerName);

        const imageUrl = safeExternalUrl(
            programme.imageUrl || programme.image
        );

        const imageMarkup = imageUrl
            ? `
                <img
                    class="oe-programme-image oe-course-card-image"
                    src="${escapeHTML(imageUrl)}"
                    alt="${escapeHTML(programme.imageAlt || `${providerName} illustrative programme image`)}"
                    loading="lazy"
                    onerror="this.hidden=true;this.nextElementSibling.hidden=false"
                >

                <div
                    class="oe-course-card-monogram"
                    hidden
                    aria-hidden="true"
                >${escapeHTML(providerInitials)}</div>
            `
            : `
                <div
                    class="oe-course-card-monogram"
                    aria-hidden="true"
                >${escapeHTML(providerInitials)}</div>
            `;

        const country = programme.country || "Country not specified";
        const duration = programme.duration || "Duration not listed";
        const studyMode = programme.studyMode || "Online";
        const qualification =
            programme.qualificationType || "Qualification not listed";
        const fee = formatTuition(programme);
        const eligibility =
            programme.eligibility || "Check official provider";

        return `
            <article
                class="oe-programme-card oe-course-card oe-reveal"
                data-programme-card="${escapeHTML(id)}"
            >
                <div class="oe-course-card-main">
                    <div class="oe-course-card-media">
                        ${imageMarkup}
                    </div>

                    <div class="oe-course-card-content">
                  <p class="oe-course-card-location">
                      ${escapeHTML(programme.providerType || "INSTITUTION")}${country && !["not specified", "country not specified", "n/a", "unknown"].includes(country.trim().toLowerCase()) ? ` · ${escapeHTML(country.trim())}` : ""}
                  </p>


                        <h3 class="oe-course-card-title">
                            ${escapeHTML(programme.title || "Programme title")}
                        </h3>

                        <p class="oe-course-card-provider">
                            ${escapeHTML(providerName)}
                        </p>

                    <div class="oe-course-card-tags">
                        ${[studyMode, duration, qualification]
                            .filter(value =>
                                value &&
                                !["not listed", "not specified", "n/a", "unknown"]
                                    .includes(value.trim().toLowerCase())
                            )
                            .map(value => `<span>${escapeHTML(value.trim())}</span>`)
                            .join("")}
                    </div>


                    </div>
                </div>

                <div class="oe-course-card-footer">
                    <div class="oe-course-card-actions">
                        <button
                            type="button"
                            class="oe-button oe-outline"
                            data-view-details="${escapeHTML(id)}"
                        >View Details</button>

                        <button
                            type="button"
                            class="oe-button oe-primary"
                            data-enquire-programme="${escapeHTML(id)}"
                        >Enquire Now</button>
                    </div>
                </div>
            </article>
        `;
    };

    /* ---------------------------------------------------------
       PROGRAMME RENDERING AND SORTING
    --------------------------------------------------------- */

    const render = () => {
        const state = getState();
        const sort = byId("oe-sort")?.value || "";

        const filtered = programmes.filter((programme) =>
            matches(programme, state)
        );

        if (sort === "name") {
            filtered.sort((a, b) =>
                String(a.title || "").localeCompare(String(b.title || ""))
            );
        }

        if (sort === "lowest") {
            filtered.sort(
                (a, b) =>
                    (a.tuitionAmount ?? Infinity) -
                    (b.tuitionAmount ?? Infinity)
            );
        }

        if (sort === "highest") {
            filtered.sort(
                (a, b) =>
                    (b.tuitionAmount ?? -Infinity) -
                    (a.tuitionAmount ?? -Infinity)
            );
        }

        if (sort === "shortest" || sort === "longest") {
            filtered.sort((a, b) => {
                const aDuration = Number.parseFloat(a.duration) || Infinity;
                const bDuration = Number.parseFloat(b.duration) || Infinity;

                return sort === "shortest"
                    ? aDuration - bDuration
                    : bDuration - aDuration;
            });
        }

        const resultCount = byId("oe-result-count");
        const empty = byId("oe-empty");

        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} ` +
                `${filtered.length === 1 ? "discovery option" : "discovery options"} · illustrative sample`;
        }

        if (empty) empty.hidden = filtered.length !== 0;

        results.innerHTML = filtered
            .slice(0, visibleLimit)
            .map(renderProgrammeCard)
            .join("");

        observeCards();

        const loadMore = byId("oe-load-more");

        if (loadMore) {
            loadMore.hidden = filtered.length <= visibleLimit;
        }

        const chips = [];

        for (const key of filters) {
            const value = state[key];

            if (value) {
                const displayValue =
                    value === "10000" ? "Under ₹10,000" : value;

                chips.push(`
                    <button type="button" data-clear-filter="${escapeHTML(key)}">
                        ${escapeHTML(displayValue)}
                        <span aria-hidden="true">×</span>
                    </button>
                `);
            }
        }

        const activeFilters = byId("oe-active-filters");

        if (activeFilters) {
            activeFilters.innerHTML = chips.join("");
        }

        updateCompareBar();
    };

    /* ---------------------------------------------------------
       PROGRAMME COMPARISON
    --------------------------------------------------------- */

    const updateCompareBar = () => {
        let bar = byId("oe-compare-bar");

        if (!bar) {
            bar = document.createElement("div");
            bar.id = "oe-compare-bar";
            bar.className = "oe-compare-bar";
            bar.setAttribute("aria-live", "polite");
            root.append(bar);
        }

        const names = compared
            .map((id) => programmes.find(
                (programme) => String(programme.id) === String(id)
            ))
            .filter(Boolean)
            .map((programme) => programme.title);

        bar.hidden = compared.length === 0;

        bar.innerHTML = `
            <span>
                <b>${compared.length} of 4</b> selected to compare
                ${names.length ? `: ${names.map(escapeHTML).join(", ")}` : ""}
            </span>

            <div>
                <button
                    type="button"
                    class="oe-button oe-outline"
                    id="oe-clear-compare"
                >Clear comparison</button>

                <button
                    type="button"
                    class="oe-button oe-primary"
                    id="oe-show-compare"
                    ${compared.length < 2 ? "disabled" : ""}
                >Compare selected</button>
            </div>
        `;
    };

    const compareView = () => {
        const selected = compared
            .map((id) => programmes.find(
                (programme) => String(programme.id) === String(id)
            ))
            .filter(Boolean);

        let dialog = byId("oe-compare-dialog");

        if (!dialog) {
            dialog = document.createElement("dialog");
            dialog.id = "oe-compare-dialog";
            dialog.className = "oe-compare-dialog";
            root.append(dialog);
        }

        const rows = [
            ["Provider", (p) => p.providerName],
            ["Country", (p) => p.country],
            ["Qualification", (p) => p.qualificationType],
            ["Subject", (p) => p.subject],
            ["Study mode", (p) => p.studyMode],
            ["Duration", (p) => p.duration],
            ["Tuition", (p) => formatTuition(p)],
            ["Entry requirements", () => "Check provider website"],
            ["Recognition", () => "Verify with official regulator"]
        ];

        dialog.innerHTML = `
            <div class="oe-dialog-head">
                <div>
                    <p class="oe-eyebrow">YOUR SHORTLIST</p>
                    <h2>Compare programmes</h2>
                </div>

                <button
                    type="button"
                    class="oe-icon-button"
                    data-close-dialog
                    aria-label="Close comparison"
                >×</button>
            </div>

            <div class="oe-table-wrap">
                <table class="oe-compare-table">
                    <thead>
                        <tr>
                            <th scope="col">Programme detail</th>
                            ${selected.map((p) => `
                                <th scope="col">
                                    ${escapeHTML(p.title)}
                                    <button
                                        type="button"
                                        class="oe-remove-compare"
                                        data-remove-compare="${escapeHTML(p.id)}"
                                    >Remove</button>
                                </th>
                            `).join("")}
                        </tr>
                    </thead>

                    <tbody>
                        ${rows.map(([label, get]) => `
                            <tr>
                                <th scope="row">${escapeHTML(label)}</th>
                                ${selected.map((p) => `
                                    <td>${escapeHTML(get(p) || "Not specified")}</td>
                                `).join("")}
                            </tr>
                        `).join("")}

                        <tr>
                            <th scope="row">Official programme page</th>
                            ${selected.map((p) => {
                                const url = safeExternalUrl(p.officialProgramUrl);

                                return `
                                    <td>
                                        ${
                                            url
                                                ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Visit provider ↗</a>`
                                                : "Not provided"
                                        }
                                    </td>
                                `;
                            }).join("")}
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="oe-dialog-note">
                Illustrative sample data. Verify programme details, fees,
                admission requirements and recognition with the provider.
            </p>

            <div class="oe-dialog-actions">
                <button
                    type="button"
                    class="oe-button oe-outline"
                    id="oe-dialog-clear"
                >Clear comparison</button>

                <button
                    type="button"
                    class="oe-button oe-primary"
                    data-close-dialog
                >Done</button>
            </div>
        `;

        if (!dialog.open) dialog.showModal();
    };

    /* ---------------------------------------------------------
       CLEAR FILTERS
    --------------------------------------------------------- */

    const clearAll = () => {
        for (const key of filters) {
            const input = byId(`oe-filter-${key}`);
            if (input) input.value = "";
        }

        const query = byId("oe-hero-query");

        if (query) query.value = "";

        visibleLimit = 6;
        render();
    };

    /* ---------------------------------------------------------
       INSTITUTION COMPARISON
    --------------------------------------------------------- */

    const updateInstitutionCompare = () => {
        const bar = byId("oe-institution-compare-bar");
        const count = byId("oe-institution-compare-count");
        const showButton = byId("oe-inst-compare-show");

        if (bar) bar.hidden = institutionCompared.length === 0;

        if (count) {
            count.textContent = `${institutionCompared.length} selected`;
        }

        if (showButton) {
            showButton.disabled = institutionCompared.length < 2;
        }
    };

    const filterInstitutions = () => {
        const country = byId("oe-inst-country")?.value || "";
        const level = byId("oe-inst-level")?.value || "";
        const subject = byId("oe-inst-subject")?.value || "";
        const mode = byId("oe-inst-mode")?.value || "";

        const cards = [...root.querySelectorAll(".oe-institution-card")];

        const matchingCards = cards.filter((card) =>
            (!country || card.dataset.country === country) &&
            (
                !level ||
                (card.dataset.levels || "").split("|").includes(level)
            ) &&
            (
                !subject ||
                (card.dataset.subjects || "").split("|").includes(subject)
            ) &&
            (
                !mode ||
                (card.dataset.modes || "").split("|").includes(mode)
            )
        );

        cards.forEach((card) => {
            const index = matchingCards.indexOf(card);

            card.hidden =
                index < 0 ||
                (!institutionsExpanded && index >= 4);
        });

        const empty = byId("oe-institution-empty");
        const more = byId("oe-institution-more");
        const toggle = byId("oe-institution-toggle");

        if (empty) empty.hidden = matchingCards.length !== 0;
        if (more) more.hidden = matchingCards.length <= 4;

        if (toggle) {
            toggle.textContent = institutionsExpanded
                ? "Show less"
                : "Show more";
        }
    };

    byId("oe-institution-toggle")?.addEventListener("click", () => {
        institutionsExpanded = !institutionsExpanded;
        filterInstitutions();
    });

    [
        "oe-inst-country",
        "oe-inst-level",
        "oe-inst-subject",
        "oe-inst-mode"
    ].forEach((id) => {
        byId(id)?.addEventListener("change", () => {
            institutionsExpanded = false;
            filterInstitutions();
        });
    });

    byId("oe-inst-clear")?.addEventListener("click", () => {
        [
            "oe-inst-country",
            "oe-inst-level",
            "oe-inst-subject",
            "oe-inst-mode"
        ].forEach((id) => {
            const input = byId(id);
            if (input) input.value = "";
        });

        institutionsExpanded = false;
        filterInstitutions();
    });

    filterInstitutions();

    /* ---------------------------------------------------------
       PAGE CLICK HANDLERS
    --------------------------------------------------------- */

    root.addEventListener("click", (event) => {
        const menu = event.target.closest(".oe-menu-toggle");

        if (menu) {
            const expanded = menu.getAttribute("aria-expanded") === "true";

            menu.setAttribute("aria-expanded", String(!expanded));
            byId("oe-nav-links")?.classList.toggle("is-open", !expanded);
        }

        const filterToggle = event.target.closest(".oe-filter-toggle");

        if (filterToggle) {
            const expanded =
                filterToggle.getAttribute("aria-expanded") === "true";

            filterToggle.setAttribute("aria-expanded", String(!expanded));
            byId("oe-filters")?.classList.toggle("is-open", !expanded);
        }

        const subject = event.target.closest("[data-subject]");

        if (subject) {
            const aliases = {
                "Computer Science": "Computer Science & IT",
                "AI & Machine Learning": "Artificial Intelligence",
                "Data Science": "Data Science",
                "Business": "Business & Management",
                "Engineering": "Engineering & Technology",
                "Healthcare": "Medicine & Healthcare",
                "Finance": "Finance & Accounting",
                "Digital Marketing": "Marketing",
                "Cybersecurity": "Cybersecurity",
                "Design": "Design & Media",
                "Psychology": "Psychology",
                "Education": "Education"
            };

            const subjectFilter = byId("oe-filter-subject");

            if (subjectFilter) {
                subjectFilter.value =
                    aliases[subject.dataset.subject] || subject.dataset.subject;
            }

            render();

            byId("oe-programmes")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        const level = event.target.closest("[data-level]");

        if (level) {
            const levelFilter = byId("oe-filter-level");

            if (levelFilter) {
                levelFilter.value = level.dataset.level;
            }

            render();

            byId("oe-programmes")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        const queryLink = event.target.closest("[data-query]");

        if (queryLink) {
            const queryInput = byId("oe-hero-query");

            if (queryInput) {
                queryInput.value = queryLink.dataset.query;
            }

            render();

            byId("oe-programmes")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        const viewDetails = event.target.closest("[data-view-details]");

        if (viewDetails) {
            openProgrammeDetails(viewDetails.dataset.viewDetails);
            return;
        }

        const enquireButton = event.target.closest("[data-enquire-programme]");

        if (enquireButton) {
            byId("oe-programme-details-dialog")?.close();
            detailsDialog?.close();
            scrollToExistingEnquiry(root);
            return;
        }

        const favouriteButton = event.target.closest("[data-favourite]");

        if (favouriteButton) {
            const id = favouriteButton.dataset.favourite;

            favourites = favourites.includes(id)
                ? favourites.filter((item) => item !== id)
                : [...favourites, id];

            syncStorage();
            render();
            return;
        }

        const clearChip = event.target.closest("[data-clear-filter]");

        if (clearChip) {
            const input = byId(
                `oe-filter-${clearChip.dataset.clearFilter}`
            );

            if (input) input.value = "";

            render();
        }

        if (event.target.closest(
            "#oe-clear, #oe-clear-mobile, #oe-empty-reset"
        )) {
            clearAll();
        }

        if (event.target.closest("#oe-load-more")) {
            visibleLimit += 6;
            render();
        }

        if (event.target.closest("#oe-show-compare")) {
            compareView();
        }

        if (event.target.closest("#oe-clear-compare, #oe-dialog-clear")) {
            compared = [];
            syncStorage();
            render();
            byId("oe-compare-dialog")?.close();
        }

        const remove = event.target.closest("[data-remove-compare]");

        if (remove) {
            compared = compared.filter(
                (id) => id !== remove.dataset.removeCompare
            );

            syncStorage();
            render();

            if (compared.length < 2) {
                byId("oe-compare-dialog")?.close();
            } else {
                compareView();
            }
        }

        if (event.target.closest("[data-close-dialog]")) {
            byId("oe-compare-dialog")?.close();
        }

        if (event.target.closest("[data-close-details]")) {
            detailsDialog?.close();
        }

        if (event.target.closest("#oe-inst-compare-clear")) {
            institutionCompared = [];

            root.querySelectorAll("[data-institution-compare]").forEach(
                (input) => {
                    input.checked = false;
                }
            );

            updateInstitutionCompare();
        }

        if (event.target.closest("#oe-inst-compare-show")) {
            const selected = institutionCompared
                .map((id) => onlineEducationInstitutions.find(
                    (item) => String(item.id) === String(id)
                ))
                .filter(Boolean);

            let dialog = byId("oe-institution-dialog");

            if (!dialog) {
                dialog = document.createElement("dialog");
                dialog.id = "oe-institution-dialog";
                dialog.className = "oe-compare-dialog";
                root.append(dialog);
            }

            const institutionRows = [
                ["Country / city", (item) => `${item.city}, ${item.country}`],
                ["Institution type", (item) => item.type],
                ["Programme levels listed", (item) => (item.levels || []).join(", ")],
                ["Subjects shown", (item) => (item.subjects || []).join(", ")],
                ["Delivery modes", (item) => (item.modes || []).join(", ")],
                ["Online programme information", (item) => item.programmeNote],
                ["Source checked", (item) => item.lastVerifiedAt]
            ];

            dialog.innerHTML = `
                <div class="oe-dialog-head">
                    <div>
                        <p class="oe-eyebrow">INSTITUTION SHORTLIST</p>
                        <h2>Compare institutions</h2>
                    </div>

                    <button
                        type="button"
                        class="oe-icon-button"
                        data-close-institution-dialog
                        aria-label="Close comparison"
                    >×</button>
                </div>

                <div class="oe-table-wrap">
                    <table class="oe-compare-table">
                        <thead>
                            <tr>
                                <th scope="col">Institution detail</th>
                                ${selected.map((item) => `
                                    <th scope="col">${escapeHTML(item.name)}</th>
                                `).join("")}
                            </tr>
                        </thead>

                        <tbody>
                            ${institutionRows.map(([label, get]) => `
                                <tr>
                                    <th scope="row">${escapeHTML(label)}</th>
                                    ${selected.map((item) => `
                                        <td>${escapeHTML(get(item) || "Not specified")}</td>
                                    `).join("")}
                                </tr>
                            `).join("")}

                            <tr>
                                <th scope="row">Official institution page</th>
                                ${selected.map((item) => {
                                    const url = safeExternalUrl(item.url);

                                    return `
                                        <td>
                                            ${
                                                url
                                                    ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Visit official site ↗</a>`
                                                    : "Not provided"
                                            }
                                        </td>
                                    `;
                                }).join("")}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="oe-dialog-note">
                    Programme details, admissions, delivery, fees and
                    recognition may change. Confirm them with the institution.
                </p>

                <div class="oe-dialog-actions">
                    <button
                        type="button"
                        class="oe-button oe-outline"
                        id="oe-inst-dialog-clear"
                    >Clear comparison</button>

                    <button
                        type="button"
                        class="oe-button oe-primary"
                        data-close-institution-dialog
                    >Done</button>
                </div>
            `;

            if (!dialog.open) dialog.showModal();
        }

        if (event.target.closest("#oe-inst-dialog-clear")) {
            institutionCompared = [];

            root.querySelectorAll("[data-institution-compare]").forEach(
                (input) => {
                    input.checked = false;
                }
            );

            updateInstitutionCompare();
            byId("oe-institution-dialog")?.close();
        }

        if (event.target.closest("[data-close-institution-dialog]")) {
            byId("oe-institution-dialog")?.close();
        }

        if (event.target.closest(".oe-nav-links a")) {
            byId("oe-nav-links")?.classList.remove("is-open");
            byId("oe-menu-toggle")?.setAttribute("aria-expanded", "false");
        }
    });

    /* ---------------------------------------------------------
       PROGRAMME COMPARE CHECKBOXES
    --------------------------------------------------------- */

    results.addEventListener("change", (event) => {
        const checkbox = event.target.closest("[data-compare]");

        if (!checkbox) return;

        const id = checkbox.dataset.compare;

        if (checkbox.checked && compared.length >= 4) {
            checkbox.checked = false;
            return;
        }

        compared = checkbox.checked
            ? [...compared, id]
            : compared.filter((item) => item !== id);

        syncStorage();
        render();
    });

    /* ---------------------------------------------------------
       FILTER AND SORT LISTENERS
    --------------------------------------------------------- */

    for (const key of filters) {
        byId(`oe-filter-${key}`)?.addEventListener("change", render);
    }

    byId("oe-sort")?.addEventListener("change", render);

    /* ---------------------------------------------------------
       INSTITUTION COMPARE CHECKBOXES
    --------------------------------------------------------- */

    root.addEventListener("change", (event) => {
        const checkbox = event.target.closest("[data-institution-compare]");

        if (!checkbox) return;

        const id = checkbox.dataset.institutionCompare;

        if (checkbox.checked && institutionCompared.length >= 3) {
            checkbox.checked = false;
            return;
        }

        institutionCompared = checkbox.checked
            ? [...institutionCompared, id]
            : institutionCompared.filter((item) => item !== id);

        updateInstitutionCompare();
    });

    /* ---------------------------------------------------------
       HERO SEARCH
    --------------------------------------------------------- */

    byId("oe-hero-search-form")?.addEventListener("submit", (event) => {
        event.preventDefault();

        for (const key of filters) {
            const input = byId(`oe-filter-${key}`);
            if (input) input.value = "";
        }

        visibleLimit = 6;
        render();

        byId("oe-programmes")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    byId("oe-hero-query")?.addEventListener("input", render);

    /* ---------------------------------------------------------
       LOAD PROGRAMME DATA AND ASSIGN IMAGES
    --------------------------------------------------------- */

    try {
        // Assign image URLs to every programme before filtering or rendering.
        programmes = addProgrammeImages(
            await getOnlineEducationProgrammes()
        );

        const availableIds = new Set(
            programmes.map((programme) => String(programme.id))
        );

        compared = compared.filter((id) =>
            availableIds.has(String(id))
        );

        favourites = favourites.filter((id) =>
            availableIds.has(String(id))
        );

        syncStorage();
        render();
    } catch (error) {
        console.error(
            "Unable to load online education programmes.",
            error
        );

        const resultCount = byId("oe-result-count");

        if (resultCount) {
            resultCount.textContent =
                "The discovery sample could not be loaded.";
        }

        results.innerHTML = `
            <p class="oe-load-error">
                Please refresh the page to try again.
            </p>
        `;
    }
}
