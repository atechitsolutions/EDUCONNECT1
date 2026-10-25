import InstitutionCard from "../../components/common/InstitutionCard.js";
import { API_BASE_URL } from "../../config/api.js";

const MIN_QUERY_LENGTH = 2;
const SUGGESTION_DELAY_MS = 250;

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

function getInstitutionLocation(institution) {
    return [
        institution.city,
        institution.state,
        institution.country
    ]
        .filter(Boolean)
        .filter((value, index, values) =>
            values.indexOf(value) === index
        )
        .join(", ");
}

function renderInstitutionCard(institution) {
    const rawType = String(institution.type || "").toUpperCase();

    const type = rawType === "UNIVERSITY"
        ? "University"
        : rawType === "COLLEGE"
            ? "College"
            : "Institution";

    return InstitutionCard({
        type: "study-abroad",
        item: {
            id: institution.id ?? "",
            name: escapeHtml(institution.name || "Institution"),
            category: escapeHtml(type),
            location: escapeHtml(getInstitutionLocation(institution)),
            image: escapeHtml(institution.coverImageUrl || ""),
            program: escapeHtml(type),
            highlight: escapeHtml(institution.description || ""),
            actionLabel: "View Details",
            showCompare: true
        }
    });
}

function renderSearchResults(container, response) {
    const results = Array.isArray(response?.results)
        ? response.results
        : [];

    if (!results.length) {
        container.innerHTML = `
            <p class="institution-search-message">
                No matching colleges or universities were found.
            </p>
        `;
        container.hidden = false;
        return;
    }

    const count = Number(response.totalResults) || results.length;

    container.innerHTML = `
        <h2 class="institution-search-results-title">
            ${count} ${count === 1 ? "institution" : "institutions"} found
        </h2>

        <div class="institution-search-card-grid">
            ${results.map(renderInstitutionCard).join("")}
        </div>
    `;

    container.hidden = false;
}

function setSuggestionMessage(container, message) {
    container.replaceChildren();

    const status = document.createElement("p");
    status.className = "institution-search-suggestion-message";
    status.setAttribute("role", "status");
    status.textContent = message;

    container.append(status);
    container.hidden = false;
}

function closeSuggestions(form, container) {
    container.hidden = true;

    form.querySelector("input[name='q']")
        ?.setAttribute("aria-expanded", "false");
}

async function fetchSuggestions(query) {
    const url = new URL(
        "/api/studyabroad/suggestions",
        API_BASE_URL
    );

    url.searchParams.set("query", query);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Suggestion request failed (${response.status}).`
        );
    }

    return response.json();
}

async function fetchSearchResults(query) {
    const response = await fetch(
        `${API_BASE_URL}/api/studyabroad/search`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Institution search failed (${response.status}).`
        );
    }

    return response.json();
}

function initializeSearchForm(form) {
    const input = form.querySelector("input[name='q']");

    const suggestions = document.getElementById(
        form.dataset.searchSuggestionsId
    );

    const results = document.getElementById(
        form.dataset.searchResultsId
    );

    if (!input || !suggestions || !results) {
        console.error(
            "Institution search form is missing its input or result containers.",
            form
        );
        return;
    }

    // Prevent duplicate initialization when the app renders again.
    if (form.dataset.institutionSearchInitialized === "true") {
        return;
    }

    form.dataset.institutionSearchInitialized = "true";

    let suggestionTimer;
    let latestSuggestionRequest = 0;

    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");

    if (suggestions.id) {
        input.setAttribute("aria-controls", suggestions.id);
    }

    input.addEventListener("input", () => {
        window.clearTimeout(suggestionTimer);
        latestSuggestionRequest += 1;

        const requestNumber = latestSuggestionRequest;
        const query = input.value.trim();

        results.hidden = true;

        if (query.length < MIN_QUERY_LENGTH) {
            closeSuggestions(form, suggestions);
            return;
        }

        setSuggestionMessage(
            suggestions,
            "Finding matching institutions..."
        );

        input.setAttribute("aria-expanded", "true");

        suggestionTimer = window.setTimeout(async () => {
            try {
                const response = await fetchSuggestions(query);

                if (requestNumber !== latestSuggestionRequest) {
                    return;
                }

                const matchingSuggestions = Array.isArray(
                    response?.suggestions
                )
                    ? response.suggestions
                    : [];

                suggestions.replaceChildren();

                if (!matchingSuggestions.length) {
                    setSuggestionMessage(
                        suggestions,
                        "No matching colleges or universities found."
                    );
                    return;
                }

                matchingSuggestions.forEach((suggestion) => {
                    const option = document.createElement("button");

                    option.type = "button";
                    option.className = "institution-search-suggestion";
                    option.setAttribute("role", "option");
                    option.dataset.query = suggestion;
                    option.textContent = suggestion;

                    suggestions.append(option);
                });

                suggestions.hidden = false;
            } catch (error) {
                if (requestNumber !== latestSuggestionRequest) {
                    return;
                }

                console.error(
                    "Unable to load institution suggestions.",
                    error
                );

                setSuggestionMessage(
                    suggestions,
                    "Suggestions could not be loaded. Please try again."
                );
            }
        }, SUGGESTION_DELAY_MS);
    });

    suggestions.addEventListener("click", (event) => {
        const option = event.target.closest(
            ".institution-search-suggestion"
        );

        if (!option) {
            return;
        }

        input.value = option.dataset.query || "";
        closeSuggestions(form, suggestions);
        form.requestSubmit();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        window.clearTimeout(suggestionTimer);
        latestSuggestionRequest += 1;

        closeSuggestions(form, suggestions);

        const query = input.value.trim();

        if (!query) {
            results.hidden = true;
            return;
        }

        // The Study Abroad hero search uses the dedicated results page.
        if (form.closest(".study-abroad-search-widget")) {
            window.location.assign(
                `/study-abroad/search-results?q=${encodeURIComponent(query)}`
            );
            return;
        }

        // Other forms retain their existing inline search behavior.
        results.innerHTML = `
            <p class="institution-search-message" role="status">
                Searching colleges and universities...
            </p>
        `;

        results.hidden = false;

        try {
            const response = await fetchSearchResults(query);
            renderSearchResults(results, response);
        } catch (error) {
            console.error("Unable to search institutions.", error);

            results.innerHTML = `
                <p class="institution-search-message" role="alert">
                    Search could not be completed. Please try again.
                </p>
            `;
        }
    });
}

export function initInstitutionSearch() {
    document
        .querySelectorAll("[data-institution-search]")
        .forEach(initializeSearchForm);
}

function getInstitutionBatchSize() {
    if (window.matchMedia("(max-width: 640px)").matches) {
        return 2;
    }

    if (window.matchMedia("(max-width: 1000px)").matches) {
        return 4;
    }

    return 6;
}

export async function loadStudyAbroadInstitutions() {
    const response = await fetch(
        `${API_BASE_URL}/api/institution`
    );

    if (!response.ok) {
        throw new Error(
            `Study abroad institutions request failed (${response.status}).`
        );
    }

    const allInstitutions = await response.json();

    if (!Array.isArray(allInstitutions)) {
        throw new TypeError(
            "Institutions response must be an array."
        );
    }

    const institutions = allInstitutions.filter(
        (institution) =>
            institution.active === true &&
            institution.studyAbroadEnabled === true
    );

    const homeTrack = document.querySelector(
        "#study-abroad .study-abroad-track"
    );

    if (homeTrack && !homeTrack.dataset.institutionsLoaded) {
        const cards = institutions
            .map(renderInstitutionCard)
            .join("");

        homeTrack.insertAdjacentHTML("beforeend", cards);
        homeTrack.dataset.institutionsLoaded = "true";
    }

    const studyAbroadSection = document.getElementById(
        "study-abroad-institutions"
    );

    const studyAbroadGrid = document.querySelector(
        "[data-study-abroad-institutions]"
    );

    if (
        !studyAbroadSection ||
        !studyAbroadGrid ||
        !institutions.length
    ) {
        return;
    }

    const countryOrder = [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Ireland",
        "Finland",
        "Netherlands",
        "Italy",
        "United Arab Emirates",
        "Hungary"
    ];

    const groups = new Map();

    institutions.forEach((institution) => {
        const country = institution.country || "Other destinations";

        if (!groups.has(country)) {
            groups.set(country, []);
        }

        groups.get(country).push(institution);
    });

    const sortedCountries = [...groups.keys()].sort((a, b) => {
        const indexA = countryOrder.indexOf(a);
        const indexB = countryOrder.indexOf(b);

        return (
            (indexA < 0 ? countryOrder.length : indexA) -
            (indexB < 0 ? countryOrder.length : indexB)
        ) || a.localeCompare(b);
    });

    const batchSize = getInstitutionBatchSize();

    studyAbroadGrid.innerHTML = sortedCountries.map(
        (country, countryIndex) => {
            const countryInstitutions = groups.get(country);

            return `
                <section
                    class="study-abroad-country-group"
                    aria-label="Institutions in ${escapeHtml(country)}"
                    data-institution-country-group="${countryIndex}"
                >
                    <div class="study-abroad-country-heading">
                        <h3>${escapeHtml(country)}</h3>
                        <span>${countryInstitutions.length} listed</span>
                    </div>

                    <div class="institution-search-card-grid">
                        ${countryInstitutions.map((institution, index) => `
                            <div
                                class="institution-search-card-item"
                                ${index >= batchSize ? "hidden" : ""}
                            >
                                ${renderInstitutionCard(institution)}
                            </div>
                        `).join("")}
                    </div>

                    ${countryInstitutions.length > batchSize ? `
                        <div class="study-abroad-load-more-wrap">
                            <button
                                type="button"
                                class="study-abroad-load-more"
                                data-institution-load-more
                                data-expanded="false"
                            >
                                View More Institutions
                                <span aria-hidden="true">↓</span>
                            </button>
                        </div>
                    ` : ""}
                </section>
            `;
        }
    ).join("");

    // Bind once; each country has independent View More / View Less state.
    if (studyAbroadGrid.dataset.paginationBound !== "true") {
        studyAbroadGrid.addEventListener("click", (event) => {
            const button = event.target.closest(
                "[data-institution-load-more]"
            );

            if (!button || !studyAbroadGrid.contains(button)) {
                return;
            }

            const group = button.closest(
                "[data-institution-country-group]"
            );

            if (!group) {
                return;
            }

            const items = [
                ...group.querySelectorAll(".institution-search-card-item")
            ];

            const currentBatchSize = getInstitutionBatchSize();

            if (button.dataset.expanded === "true") {
                items.forEach((item, index) => {
                    item.hidden = index >= currentBatchSize;
                });

                button.dataset.expanded = "false";
                button.innerHTML =
                    'View More Institutions <span aria-hidden="true">↓</span>';

                return;
            }

            items
                .filter((item) => item.hidden)
                .slice(0, currentBatchSize)
                .forEach((item) => {
                    item.hidden = false;
                });

            if (!items.some((item) => item.hidden)) {
                button.dataset.expanded = "true";
                button.innerHTML =
                    'View Less <span aria-hidden="true">↑</span>';
            }
        });

        studyAbroadGrid.dataset.paginationBound = "true";
    }

    studyAbroadSection.hidden = false;
}