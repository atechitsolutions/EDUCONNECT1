import InstitutionCard from "../common/InstitutionCard.js";
import {
    getStudyAbroadSuggestions,
    searchStudyAbroad
} from "../../services/studyAbroadService.js";
import {
    bindInstitutionDetailButtons
} from "./InstitutionDetailsModals.js";

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export default function StudyAbroadSearch() {
    const content = `
        <section
            class="study-abroad-search-section"
            id="study-abroad-search"
        >
            <div class="study-abroad-search-container">
                <div class="study-abroad-search-header">
                    <div class="study-abroad-section-eyebrow">
                        FIND YOUR FUTURE
                    </div>
                    <h2>
                        Find the Right
                        <span>Study Abroad Option</span>
                    </h2>
                    <p>
                        Search universities and institutions by name or destination
                        by institution, city, state or country.
                    </p>
                </div>

                <div class="study-abroad-search-box">
                    <div class="study-abroad-search-field">
                        <span
                            class="study-abroad-search-field-icon"
                            aria-hidden="true"
                        >🔍</span>

                        <input
                            id="study-abroad-search-input"
                            type="text"
                            placeholder="Try: universities in Toronto"
                            aria-label="Search Study Abroad institutions"
                            autocomplete="off"
                        />

                        <div
                            id="study-abroad-search-suggestions"
                            class="study-abroad-search-suggestions"
                            hidden
                        ></div>
                    </div>

                    <button
                        type="button"
                        id="study-abroad-search-button"
                        class="study-abroad-search-button"
                    >
                        Search <span>→</span>
                    </button>
                </div>

                <div
                    id="study-abroad-search-results"
                    class="study-abroad-search-results"
                ></div>
            </div>
        </section>
    `;

    setTimeout(initializeStudyAbroadSearch, 0);
    return content;
}

function initializeStudyAbroadSearch() {
    const input = document.getElementById("study-abroad-search-input");
    const suggestionsBox = document.getElementById("study-abroad-search-suggestions");
    const searchButton = document.getElementById("study-abroad-search-button");
    const resultsContainer = document.getElementById("study-abroad-search-results");

    if (
        !input ||
        !suggestionsBox ||
        !searchButton ||
        !resultsContainer ||
        input.dataset.initialized === "true"
    ) {
        return;
    }

    input.dataset.initialized = "true";
    let suggestionTimer = null;

    function hideSuggestions() {
        suggestionsBox.hidden = true;
        suggestionsBox.innerHTML = "";
    }

    function renderSuggestions(suggestions) {
        if (!suggestions.length) {
            hideSuggestions();
            return;
        }

        suggestionsBox.innerHTML = suggestions
            .map((suggestion) => `
                <button
                    type="button"
                    class="study-abroad-search-suggestion"
                    data-suggestion-value="${escapeHtml(suggestion)}"
                >
                    🔍 ${escapeHtml(suggestion)}
                </button>
            `)
            .join("");

        suggestionsBox.hidden = false;
    }

    async function loadSuggestions(query) {
        if (!query.trim()) {
            hideSuggestions();
            return;
        }

        try {
            const response = await getStudyAbroadSuggestions(query.trim());
            renderSuggestions(response?.suggestions || []);
        } catch (error) {
            console.error("Study Abroad suggestions failed:", error);
            hideSuggestions();
        }
    }

    async function runSearch(query) {
        const cleanQuery = query.trim();
        hideSuggestions();

        if (!cleanQuery) {
            resultsContainer.innerHTML = "";
            return;
        }

        resultsContainer.innerHTML = `
            <div class="study-abroad-search-loading">
                Searching listed Study Abroad institutions...
            </div>
        `;

        try {
            const response = await searchStudyAbroad(cleanQuery);
            const results = response?.results || [];

            if (!results.length) {
                resultsContainer.innerHTML = `
                    <div class="study-abroad-search-empty">
                        No matching Study Abroad institutions found.
                    </div>
                `;
                return;
            }

            const institutionMap = new Map(
                results.map((institution) => [String(institution.id), institution])
            );

            resultsContainer.innerHTML = results
                .map((institution, index) =>
                    InstitutionCard({
                        item: {
                            id: institution.id,
                            rank: String(index + 1).padStart(2, "0"),
                            name: institution.name,
                            category: institution.type,
                            location: [
                                institution.city,
                                institution.state,
                                institution.country
                            ].filter(Boolean).join(", "),
                            program: "Study Abroad listing",
                            ranking: institution.verified
                                ? "Details verified"
                                : "Institution listing",
                            highlight: institution.description || "",
                            image: institution.coverImageUrl || "",
                            actionLabel: "View More",
                            showCompare: false
                        },
                        type: "study-abroad-search"
                    })
                )
                .join("");

            bindInstitutionDetailButtons(resultsContainer, institutionMap);
        } catch (error) {
            console.error("Study Abroad search failed:", error);
            resultsContainer.innerHTML = `
                <div class="study-abroad-search-empty">
                    Unable to complete the search right now.
                </div>
            `;
        }
    }

    input.addEventListener("input", () => {
        clearTimeout(suggestionTimer);
        suggestionTimer = setTimeout(
            () => loadSuggestions(input.value),
            250
        );
    });

    searchButton.addEventListener("click", () => runSearch(input.value));

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            runSearch(input.value);
        }
    });

    suggestionsBox.addEventListener("click", (event) => {
        const button = event.target.closest("[data-suggestion-value]");
        if (!button) {
            return;
        }

        const value = button.dataset.suggestionValue || "";
        input.value = value;
        runSearch(value);
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest("#study-abroad-search")) {
            hideSuggestions();
        }
    });
}
