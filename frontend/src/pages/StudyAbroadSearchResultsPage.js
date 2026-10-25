import Header from "../layouts/header.js";
import StudyAbroadNavbar from "../layouts/StudyAbroadNavbar.js";
import FooterSection from "../components/home/footerSection.js";
import InstitutionCard from "../components/common/InstitutionCard.js";
import {
    getInstitutions,
    searchStudyAbroad
} from "../services/studyAbroadService.js";
import {
    bindInstitutionDetailButtons
} from "../components/studyAbroad/InstitutionDetailsModals.js";

import "../assets/css/study-abroad-details.css";
import "../assets/css/study-abroad-search-results.css";

const COUNTRY_ALIASES = [
    ["United States", [
        "united states of america", "united states", "america", "american",
        "u.s.a.", "usa", "u.s.", "us"
    ]],
    ["United Kingdom", [
        "united kingdom", "great britain", "britain", "england", "u.k.", "uk"
    ]],
    ["Canada", ["canada", "canadian"]],
    ["Australia", ["australia", "australian"]],
    ["Germany", ["germany", "german"]],
    ["France", ["france", "french"]],
    ["Belgium", ["belgium", "belgian"]],
    ["Finland", ["finland", "finnish"]],
    ["Ireland", ["ireland", "irish"]],
    ["New Zealand", ["new zealand"]],
    ["Netherlands", ["netherlands", "the netherlands", "dutch", "holland"]],
    ["Italy", ["italy", "italian"]],
    ["United Arab Emirates", [
        "united arab emirates", "uae", "u.a.e.", "emirates"
    ]],
    ["Hungary", ["hungary", "hungarian"]],
    ["Sweden", ["sweden", "swedish"]],
    ["Spain", ["spain", "spanish"]],
    ["Singapore", ["singapore"]],
    ["Switzerland", ["switzerland", "swiss"]],
    ["India", ["india", "indian"]]
];

const STOP_WORDS = new Set([
    "in", "near", "around", "at", "for", "of", "the", "and", "or", "a", "an",
    "to", "with", "best", "top", "popular", "famous", "leading", "good",
    "great", "find", "show", "me", "all", "other", "college", "colleges",
    "university", "universities", "institution", "institutions", "school",
    "schools", "america", "american", "usa", "us", "united", "states",
    "kingdom", "canada", "canadian", "australia", "australian", "germany",
    "german", "france", "french", "belgium", "belgian", "finland", "finnish",
    "ireland", "irish", "zealand", "netherlands", "dutch", "holland", "italy",
    "italian", "uae"
]);

function normalize(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function canonicalCountry(value) {
    const normalized = normalize(value);

    for (const [country, aliases] of COUNTRY_ALIASES) {
        if (aliases.some((alias) => normalize(alias) === normalized)) {
            return country;
        }
    }

    return String(value ?? "").trim();
}

function countryMatches(actual, target) {
    return Boolean(actual && target) &&
        normalize(canonicalCountry(actual)) ===
        normalize(canonicalCountry(target));
}

function countryMentionedInQuery(query, institutions) {
    const text = ` ${normalize(query)} `;

    const aliases = COUNTRY_ALIASES
        .flatMap(([country, values]) =>
            values.map((alias) => ({ country, alias }))
        )
        .sort((a, b) =>
            normalize(b.alias).length - normalize(a.alias).length
        );

    for (const { country, alias } of aliases) {
        if (text.includes(` ${normalize(alias)} `)) {
            return country;
        }
    }

    const countries = [
        ...new Set(
            institutions.map((item) => item.country).filter(Boolean)
        )
    ].sort((a, b) => normalize(b).length - normalize(a).length);

    for (const country of countries) {
        if (text.includes(` ${normalize(country)} `)) {
            return canonicalCountry(country);
        }
    }

    return "";
}

function getLocationPhrase(query) {
    const match = String(query ?? "").trim().match(
        /\b(?:in|near|around|at)\s+(.+?)\s*$/i
    );

    return match
        ? match[1]
            .replace(/\s+for\s+.+$/i, "")
            .replace(/[?.!,;]+$/g, "")
            .trim()
        : "";
}

function inferCountryFromLocation(location, institutions) {
    const needle = normalize(location);

    if (needle.length < 2) {
        return "";
    }

    const matching = institutions.filter((item) => {
        const values = [
            item.city,
            item.state,
            item.country,
            item.countryCode,
            item.address
        ]
            .filter(Boolean)
            .map(normalize)
            .filter((value) => value.length >= 3);

        return values.some((value) =>
            value === needle ||
            value.includes(needle) ||
            (value.length >= 4 && needle.includes(value))
        );
    });

    const counts = new Map();

    matching.forEach((item) => {
        if (!item.country) {
            return;
        }

        const country = canonicalCountry(item.country);
        counts.set(country, (counts.get(country) || 0) + 1);
    });

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function scoreInstitution(item, query, apiOrder) {
    const id = String(item.id ?? "");
    const name = normalize(item.name);
    const description = normalize(item.description);
    const type = normalize(item.type);

    const location = normalize([
        item.city,
        item.state,
        item.country,
        item.address
    ].filter(Boolean).join(" "));

    const normalizedQuery = normalize(query);

    const terms = normalizedQuery
        .split(" ")
        .filter((word) =>
            word.length > 1 && !STOP_WORDS.has(word)
        );

    let score = apiOrder.has(id)
        ? Math.max(100, 600 - apiOrder.get(id))
        : 0;

    let semanticMatches = 0;

    // An exact or full-name match should appear before related institutions.
    if (normalizedQuery && name === normalizedQuery) {
        score += 10000;
        semanticMatches += 1;
    } else if (normalizedQuery && name.includes(normalizedQuery)) {
        score += 7000;
        semanticMatches += 1;
    }

    for (const term of terms) {
        if (name.includes(term)) {
            score += 250;
            semanticMatches += 1;
        } else if (description.includes(term)) {
            score += 90;
            semanticMatches += 1;
        } else if (location.includes(term)) {
            score += 20;
        }
    }

    if (normalizedQuery.includes("college") && type === "college") {
        score += 80;
    }

    if (normalizedQuery.includes("university") && type === "university") {
        score += 80;
    }

    if (
        normalizedQuery.includes("business") &&
        (name.includes("business") || description.includes("business"))
    ) {
        score += 120;
    }

    return { score, semanticMatches };
}

function getBatchSize() {
    if (window.matchMedia("(max-width: 640px)").matches) {
        return 2;
    }

    if (window.matchMedia("(max-width: 1000px)").matches) {
        return 4;
    }

    return 6;
}

function renderInstitutionCard(item, index, bestMatchId) {
    const type = String(item.type || "Institution")
        .toLowerCase()
        .replace(/^./, (character) => character.toUpperCase());

    const location = [
        item.city,
        item.state,
        item.country
    ]
        .filter(Boolean)
        .filter((value, i, values) => values.indexOf(value) === i)
        .join(", ");

    const card = InstitutionCard({
        type: "study-abroad-search-result",
        item: {
            id: item.id,
            name: escapeHtml(item.name || "Institution"),
            category: escapeHtml(type),
            location: escapeHtml(location),
            image: escapeHtml(item.coverImageUrl || ""),
            program: item.popularCourses
                ? `Popular courses: ${escapeHtml(item.popularCourses.split(";").map((course) => course.trim()).filter(Boolean).slice(0, 2).join(" · "))}`
                : "",
            highlight: escapeHtml(item.description || [
                item.type,
                item.established ? `Established ${item.established}` : ""
            ].filter(Boolean).join(" · ")),
            actionLabel: "View Details",
            showCompare: true
        }
    });

    const isBestMatch = bestMatchId != null &&
        String(item.id) === String(bestMatchId);

    return `
        <div
            class="study-abroad-search-result-item ${
                isBestMatch ? "is-best-match" : ""
            }"
            data-search-result-index="${index}"
            ${index >= getBatchSize() ? "hidden" : ""}
        >
            ${
                isBestMatch
                    ? '<span class="study-abroad-best-match-label">Best match</span>'
                    : ""
            }
            ${card}
        </div>
    `;
}

function renderResults(root, query, candidates, country, apiOrder) {
    const status = root.querySelector("[data-search-results-status]");
    const grid = root.querySelector("[data-search-results-grid]");
    const controls = root.querySelector("[data-search-results-controls]");
    const button = root.querySelector("[data-search-results-more]");

    if (!status || !grid || !controls || !button) {
        return;
    }

    if (!candidates.length) {
        status.textContent =
            `No institutions matched “${query}”. Try a college name, university, city or country.`;

        grid.innerHTML = `
            <div class="study-abroad-search-results-empty">
                <span aria-hidden="true">🔎</span>
                <h2>No matching institutions found</h2>
                <p>Try a different spelling, institution name, city or country.</p>
                <a href="/study-abroad">Back to Study Abroad</a>
            </div>
        `;

        controls.hidden = true;
        return;
    }

    const best = candidates.find(
        (item) => scoreInstitution(item, query, apiOrder).semanticMatches > 0
    );

    status.textContent = country
        ? `${candidates.length} ${
            candidates.length === 1 ? "institution" : "institutions"
        } in ${country}. Relevant matches appear first, followed by other institutions in the same country.`
        : `${candidates.length} relevant ${
            candidates.length === 1 ? "institution" : "institutions"
        } found. Most relevant matches appear first.`;

    grid.innerHTML = candidates
        .map((item, index) =>
            renderInstitutionCard(item, index, best?.id ?? null)
        )
        .join("");

    controls.hidden = candidates.length <= getBatchSize();

    button.dataset.expanded = "false";
    button.innerHTML =
        'View More Institutions <span aria-hidden="true">↓</span>';

    button.onclick = () => {
        const cards = [
            ...grid.querySelectorAll("[data-search-result-index]")
        ];

        if (button.dataset.expanded === "true") {
            cards.forEach((card, index) => {
                card.hidden = index >= getBatchSize();
            });

            button.dataset.expanded = "false";
            button.innerHTML =
                'View More Institutions <span aria-hidden="true">↓</span>';

            return;
        }

        cards
            .filter((card) => card.hidden)
            .slice(0, getBatchSize())
            .forEach((card) => {
                card.hidden = false;
            });

        if (!cards.some((card) => card.hidden)) {
            button.dataset.expanded = "true";
            button.innerHTML =
                'View Less <span aria-hidden="true">↑</span>';
        }
    };
}

async function loadResults(root) {
    const query = (
        new URLSearchParams(window.location.search).get("q") || ""
    ).trim();

    const queryLabel = root.querySelector("[data-search-query-label]");
    const status = root.querySelector("[data-search-results-status]");
    const grid = root.querySelector("[data-search-results-grid]");
    const controls = root.querySelector("[data-search-results-controls]");

    if (queryLabel) {
        queryLabel.textContent = query ? `“${query}”` : "All institutions";
    }

    if (!query) {
        if (status) {
            status.textContent =
                "Enter a search term on the Study Abroad page to see matching institutions.";
        }

        if (grid) {
            grid.innerHTML = `
                <div class="study-abroad-search-results-empty">
                    <h2>No search query provided</h2>
                    <a href="/study-abroad">Return to Study Abroad</a>
                </div>
            `;
        }

        if (controls) controls.hidden = true;
        return;
    }

    if (status) {
        status.textContent =
            "Finding the closest match and other institutions in the same country…";
    }

    if (grid) {
        grid.innerHTML = `
            <div class="study-abroad-results-loading" role="status">
                <span class="study-abroad-results-spinner" aria-hidden="true"></span>
                Loading institutions…
            </div>
        `;
    }

    const [institutionsResult, searchResult] = await Promise.allSettled([
        getInstitutions(),
        searchStudyAbroad(query)
    ]);

    const allPublic =
        institutionsResult.status === "fulfilled" &&
        Array.isArray(institutionsResult.value)
            ? institutionsResult.value.filter(
                (item) =>
                    item.active !== false &&
                    item.studyAbroadEnabled !== false
            )
            : [];

    const searched =
        searchResult.status === "fulfilled" &&
        Array.isArray(searchResult.value?.results)
            ? searchResult.value.results
            : [];

    if (institutionsResult.status === "rejected" && searched.length === 0) {
        console.error(
            "Unable to load Study Abroad results.",
            institutionsResult.reason
        );

        if (status) {
            status.textContent =
                "Search is temporarily unavailable. Please try again.";
        }

        if (grid) {
            grid.innerHTML = `
                <div class="study-abroad-search-results-empty">
                    <h2>Unable to load results</h2>
                    <p>Please refresh or try again.</p>
                    <a href="/study-abroad">Back to Study Abroad</a>
                </div>
            `;
        }

        if (controls) controls.hidden = true;
        return;
    }

    // Use the public catalogue for country-wide results, while preserving
    // any search matches returned by the existing search endpoint.
    const unique = new Map(
        allPublic.map((item) => [String(item.id), item])
    );

    searched.forEach((item) => {
        if (item?.id != null && !unique.has(String(item.id))) {
            unique.set(String(item.id), item);
        }
    });

    const allInstitutions = [...unique.values()];
    const apiOrder = new Map();

    searched.forEach((item, index) => {
        if (item?.id != null && !apiOrder.has(String(item.id))) {
            apiOrder.set(String(item.id), index);
        }
    });

    let country = countryMentionedInQuery(query, allInstitutions);

    if (!country) {
        country = inferCountryFromLocation(
            getLocationPhrase(query),
            allInstitutions
        );
    }

    if (!country && searched[0]?.country) {
        country = canonicalCountry(searched[0].country);
    }

    let candidates = country
        ? allInstitutions.filter(
            (item) => countryMatches(item.country, country)
        )
        : allInstitutions.filter(
            (item) =>
                apiOrder.has(String(item.id)) ||
                scoreInstitution(item, query, apiOrder).semanticMatches > 0
        );

    candidates.sort((a, b) => {
        const scoreA = scoreInstitution(a, query, apiOrder).score;
        const scoreB = scoreInstitution(b, query, apiOrder).score;

        return scoreB - scoreA ||
            String(a.name || "").localeCompare(String(b.name || ""));
    });

    if (!candidates.length && searched.length) {
        candidates = searched.slice(0, 50);
    }

    const institutionMap = new Map(
        allInstitutions
            .filter((item) => item.id != null)
            .map((item) => [String(item.id), item])
    );

    renderResults(root, query, candidates, country, apiOrder);

    const resultsGrid = root.querySelector("[data-search-results-grid]");

    if (resultsGrid) {
        bindInstitutionDetailButtons(resultsGrid, institutionMap);
    }
}

export default function StudyAbroadSearchResultsPage() {
    const markup = `
        ${Header()}
        ${StudyAbroadNavbar()}

        <main id="study-abroad-page" class="study-abroad-page">
            <section
                class="study-abroad-search-results-page"
                data-study-abroad-search-results
            >
                <div class="study-abroad-search-results-container">
                    <a
                        class="study-abroad-results-back"
                        href="/study-abroad"
                    >
                        <span aria-hidden="true">←</span>
                        Back to Study Abroad
                    </a>

                    <header class="study-abroad-search-results-heading">
                        <p class="study-abroad-results-eyebrow">
                            STUDY ABROAD DISCOVERY
                        </p>

                        <h1>Search results</h1>

                        <p
                            class="study-abroad-results-query"
                            data-search-query-label
                        ></p>

                        <p
                            class="study-abroad-results-status"
                            data-search-results-status
                            role="status"
                            aria-live="polite"
                        >
                            Loading institutions…
                        </p>
                    </header>

                    <div
                        class="study-abroad-search-results-grid"
                        data-search-results-grid
                        aria-live="polite"
                    >
                        <div class="study-abroad-results-loading" role="status">
                            <span
                                class="study-abroad-results-spinner"
                                aria-hidden="true"
                            ></span>
                            Loading institutions…
                        </div>
                    </div>

                    <div
                        class="study-abroad-results-controls"
                        data-search-results-controls
                        hidden
                    >
                        <button
                            type="button"
                            class="study-abroad-results-more"
                            data-search-results-more
                        >
                            View More Institutions
                            <span aria-hidden="true">↓</span>
                        </button>
                    </div>
                </div>
            </section>
        </main>

        ${FooterSection()}
    `;

    window.setTimeout(() => {
        const root = document.querySelector(
            "[data-study-abroad-search-results]"
        );

        if (!root || root.dataset.initialized === "true") {
            return;
        }

        root.dataset.initialized = "true";

        loadResults(root).catch((error) => {
            console.error(
                "Study Abroad results page failed to initialize.",
                error
            );

            const status = root.querySelector(
                "[data-search-results-status]"
            );

            if (status) {
                status.textContent =
                    "Search is temporarily unavailable. Please try again.";
            }
        });
    }, 0);

    return markup;
}