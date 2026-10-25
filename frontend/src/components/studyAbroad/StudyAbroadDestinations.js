import { getInstitutions } from "../../services/studyAbroadService.js";
import directoryData from "../../data/study-abroad-university-directory.json";

const COUNTRY_META = {
    US: {
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1685532735950-5ecf5293d254?auto=format&fit=crop&w=1200&q=85"
    },
    USA: {
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1685532735950-5ecf5293d254?auto=format&fit=crop&w=1200&q=85"
    },
    GB: {
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85"
    },
    UK: {
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85"
    },
    CA: {
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85"
    },
    AU: {
        flag: "🇦🇺",
        image: "https://images.unsplash.com/photo-1527557561443-e64662fc5562?auto=format&fit=crop&w=1200&q=85"
    },
    DE: {
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=85"
    },
    BE: {
        flag: "🇧🇪",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85"
    },
    FR: {
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
    },
    IE: {
        flag: "🇮🇪",
        image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=85"
    },
    NZ: {
        flag: "🇳🇿",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=85"
    }
};

const FALLBACK_META = {
    flag: "🌍",
    image: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=85"
};

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getCountryMeta(code) {
    const normalizedCode = String(code ?? "").trim().toUpperCase();
    return COUNTRY_META[normalizedCode] ?? FALLBACK_META;
}

function buildDestinations(institutions) {
    const groups = new Map();

    institutions.forEach((institution) => {
        const country = institution.country?.trim();

        if (!country) {
            return;
        }

        if (!groups.has(country)) {
            groups.set(country, {
                country,
                code: institution.countryCode || "",
                institutions: [],
                universities: 0,
                colleges: 0,
                otherInstitutions: 0
            });
        }

        const group = groups.get(country);
        group.institutions.push(institution);

        if (!group.code && institution.countryCode) {
            group.code = institution.countryCode;
        }

        const type = String(institution.type ?? "").toLowerCase();

        if (type.includes("university")) {
            group.universities += 1;
        } else if (type.includes("college") || type.includes("business school")) {
            group.colleges += 1;
        } else {
            group.otherInstitutions += 1;
        }
    });

    return [...groups.values()].sort(
        (a, b) => a.country.localeCompare(b.country)
    );
}

/*
 * Show two complete rows according to the responsive grid.
 */
function getDestinationBatchSize() {
    if (window.matchMedia("(max-width: 600px)").matches) return 2;
    if (window.matchMedia("(max-width: 850px)").matches) return 4;
    if (window.matchMedia("(max-width: 1150px)").matches) return 6;

    return 8;
}

export default function StudyAbroadDestinations() {
    const section = `
        <section
            class="study-abroad-destinations"
            id="study-abroad-destination-explorer"
            aria-labelledby="study-abroad-destinations-title"
        >
            <div class="study-abroad-destinations-container">
                    <div class="study-abroad-destinations-header">
                    <span class="study-abroad-section-eyebrow">
                        STUDY DESTINATIONS
                    </span>

                    <h2 id="study-abroad-destinations-title">
                        Explore destinations available on
                        <span>EduConnect</span>
                    </h2>

                    <p>
                        Explore the destinations represented in the current institution list.
                    </p>
                </div>

                <div
                    class="study-abroad-destination-grid"
                    data-study-abroad-destinations
                    aria-live="polite"
                >
                    <div class="study-abroad-destination-loading">
                        <span class="destination-loading-dot"></span>
                        <span>Loading destinations...</span>
                    </div>
                </div>

                <div
                    class="study-abroad-load-more-wrap"
                    data-destination-controls
                    hidden
                >
                    <button
                        type="button"
                        class="study-abroad-load-more"
                        data-destination-load-more
                    >
                        View More Destinations
                        <span aria-hidden="true">↓</span>
                    </button>
                </div>

                <dialog class="study-abroad-destination-dialog" data-destination-dialog aria-labelledby="destination-dialog-title">
                    <div class="destination-dialog-panel">
                        <button type="button" class="destination-dialog-close" data-destination-close aria-label="Close destination details">×</button>
                        <span class="study-abroad-section-eyebrow" data-destination-dialog-eyebrow>STUDY DESTINATION</span>
                        <h2 id="destination-dialog-title" data-destination-dialog-title></h2>
                        <p class="destination-dialog-summary" data-destination-dialog-summary></p>
                        <div class="destination-dialog-institutions" data-destination-dialog-institutions></div>
                        <a class="destination-dialog-search" data-destination-search href="#study-abroad-search">Search programmes in this destination <span aria-hidden="true">→</span></a>
                    </div>
                </dialog>
                <dialog class="study-abroad-institution-detail-dialog" data-institution-detail-dialog aria-labelledby="institution-detail-title">
                    <div class="institution-detail-panel">
                        <button type="button" class="destination-dialog-close" data-detail-close aria-label="Close institution details">×</button>
                        <span class="study-abroad-section-eyebrow">INSTITUTION PROFILE</span>
                        <p class="institution-detail-country" data-institution-detail-country></p>
                        <h2 id="institution-detail-title" data-institution-detail-title></h2>
                        <div class="institution-detail-fields" data-institution-detail-fields></div>
                        <p class="institution-detail-note">Tuition, living costs, rankings and scholarship figures in this directory are demo estimates. Confirm current details directly with the institution before applying.</p>
                        <button type="button" class="institution-detail-select" data-detail-select>Select this institution <span aria-hidden="true">→</span></button>
                    </div>
                </dialog>
            </div>
        </section>
    `;

    setTimeout(async () => {
        const container = document.querySelector(
            "[data-study-abroad-destinations]"
        );

        if (!container) {
            return;
        }

        try {
            const supplied = (directoryData.countries || []).flatMap((country) => country.institutions || []);
            let remote = [];
            try {
                const response = await getInstitutions();
                remote = Array.isArray(response) ? response : [];
            } catch (error) {
                console.warn("Using the supplied study-abroad directory because the institution service is unavailable.", error);
            }
            const key = (item) => `${String(item.country || "").trim().toLowerCase()}::${String(item.name || "").trim().toLowerCase()}`;
            const known = new Set(supplied.map(key));
            const visible = [...supplied, ...remote.filter((item) => {
                const itemKey = key(item);
                if (known.has(itemKey)) return false;
                known.add(itemKey);
                return true;
            })];
            const destinations = buildDestinations(visible);

            if (!destinations.length) {
                container.innerHTML = `
                    <div class="study-abroad-destination-empty">
                        <div class="study-abroad-destination-empty-icon">🌍</div>
                        <h3>No destinations available yet</h3>
                        <p>
                            Active Study Abroad institutions added by an administrator
                            will appear here.
                        </p>
                    </div>
                `;
                return;
            }

            const initialCount = getDestinationBatchSize();

            container.innerHTML = destinations.map((destination, index) => {
                const meta = getCountryMeta(destination.code);
                const total = destination.institutions.length;

                const universityLabel = destination.universities === 1
                    ? "University"
                    : "Universities";

                const collegeLabel = destination.colleges === 1
                    ? "College"
                    : "Colleges";

                const otherInstitutionLabel = destination.otherInstitutions === 1
                    ? "Other institution"
                    : "Other institutions";

                return `
                    <article
                        class="study-abroad-destination-card"
                        data-country="${escapeHtml(
                            destination.code || destination.country
                        )}"
                        data-destination-index="${index}"
                        ${index >= initialCount ? "hidden" : ""}
                    >
                        <button
                            type="button"
                            class="study-abroad-destination-link"
                            data-open-destination="${index}"
                            aria-label="Explore Study Abroad institutions in ${escapeHtml(
                                destination.country
                            )}"
                        >
                            <div class="destination-card-image">
                                <img
                                    src="${meta.image}"
                                    alt="Study in ${escapeHtml(
                                        destination.country
                                    )}"
                                    loading="lazy"
                                />

                                <div class="destination-card-image-overlay"></div>

                                <div class="destination-country">
                                    <span aria-hidden="true">${meta.flag}</span>
                                    ${escapeHtml(destination.country)}
                                </div>

                                <span class="destination-card-count">
                                    ${total} listed ${
                                        total === 1 ? "institution" : "institutions"
                                    }
                                </span>
                            </div>

                            <div class="destination-card-content">
                                <h3>
                                    Study in ${escapeHtml(destination.country)}
                                </h3>

                                <p class="destination-card-description">
                                    Browse the institutions currently listed for
                                    this destination.
                                </p>

                                <div class="destination-card-stats">
                                    <span>
                                        <strong>${destination.universities}</strong>
                                        ${escapeHtml(universityLabel)}
                                    </span>

                                    <span>
                                        <strong>${destination.colleges}</strong>
                                        ${escapeHtml(collegeLabel)}
                                    </span>

                                    <span>
                                        <strong>${destination.otherInstitutions}</strong>
                                        ${escapeHtml(otherInstitutionLabel)}
                                    </span>
                                </div>

                                <div class="destination-card-footer">
                                    <span>
                                        Explore ${escapeHtml(destination.country)}
                                    </span>
                                    <span aria-hidden="true">→</span>
                                </div>
                            </div>
                        </button>
                    </article>
                `;
            }).join("");

            const sectionElement = container.closest(
                ".study-abroad-destinations"
            );

            const dialog = sectionElement?.querySelector("[data-destination-dialog]");
            const dialogTitle = dialog?.querySelector("[data-destination-dialog-title]");
            const dialogSummary = dialog?.querySelector("[data-destination-dialog-summary]");
            const dialogList = dialog?.querySelector("[data-destination-dialog-institutions]");
            const dialogSearch = dialog?.querySelector("[data-destination-search]");

            const detailDialog = sectionElement?.querySelector("[data-institution-detail-dialog]");
            const detailTitle = detailDialog?.querySelector("[data-institution-detail-title]");
            const detailCountry = detailDialog?.querySelector("[data-institution-detail-country]");
            const detailFields = detailDialog?.querySelector("[data-institution-detail-fields]");
            let pendingInstitutionSelection = null;

            const groupedInstitutions = (destination) => {
                const groups = [
                    { title: "Universities", matches: (type) => type.includes("university") },
                    { title: "Colleges", matches: (type) => type.includes("college") || type.includes("business school") },
                    { title: "Other institutions", matches: (type) => !type.includes("university") && !type.includes("college") && !type.includes("business school") }
                ];
                return groups.map((group) => {
                    const entries = destination.institutions.filter((institution) => group.matches(String(institution.type || "").toLowerCase()));
                    if (!entries.length) return "";
                    return `<section class="destination-dialog-group"><h3>${group.title}<span>${entries.length}</span></h3><ul>${entries.map((institution) => `
                        <li><button type="button" class="destination-dialog-institution" data-open-institution="${destination.institutions.indexOf(institution)}">
                            <span class="destination-dialog-institution-details"><strong>${escapeHtml(institution.name || "Institution")}</strong><span>${escapeHtml([institution.city, institution.state].filter(Boolean).join(", ") || institution.type || "Study Abroad institution")}</span></span>
                            <span class="destination-dialog-select-label">View details <span aria-hidden="true">→</span></span>
                        </button></li>`).join("")}</ul></section>`;
                }).join("");
            };

            sectionElement?.addEventListener("click", (event) => {
                const cardButton = event.target.closest("[data-open-destination]");
                const closeButton = event.target.closest("[data-destination-close]");
                const detailClose = event.target.closest("[data-detail-close]");
                const detailSelect = event.target.closest("[data-detail-select]");
                const searchLink = event.target.closest("[data-destination-search]");
                const institutionButton = event.target.closest("[data-open-institution]");

                if (detailClose) {
                    detailDialog?.close();
                    pendingInstitutionSelection = null;
                    return;
                }

                if (detailSelect && pendingInstitutionSelection) {
                    const { institution, country } = pendingInstitutionSelection;
                    const destinationSelect = document.querySelector("#study-abroad-destination");
                    const institutionInput = document.querySelector("#study-abroad-institution");
                    if (destinationSelect && country) {
                        const aliases = { "united states": "usa", "united states of america": "usa", usa: "usa", "united kingdom": "uk", uk: "uk", "new zealand": "new-zealand" };
                        const value = aliases[country.trim().toLowerCase()] || country.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                        let option = [...destinationSelect.options].find((item) => item.value === value || item.textContent.trim().toLowerCase() === country.toLowerCase());
                        if (!option) { option = new Option(country, value); destinationSelect.add(option); }
                        destinationSelect.value = option.value;
                        destinationSelect.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                    if (institutionInput) {
                        institutionInput.value = institution.name || "";
                        institutionInput.dispatchEvent(new Event("input", { bubbles: true }));
                    }
                    const selectionNote = document.querySelector("[data-selected-institution-note]");
                    if (selectionNote) {
                        selectionNote.textContent = `Selected ${institution.name} in ${country}. Complete the remaining details to request counselling.`;
                        selectionNote.hidden = false;
                    }
                    detailDialog?.close();
                    dialog?.close();
                    pendingInstitutionSelection = null;
                    document.querySelector("#study-abroad-lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.setTimeout(() => document.querySelector("#study-abroad-name")?.focus({ preventScroll: true }), 450);
                    return;
                }

                if (closeButton) { dialog?.close(); return; }

                if (cardButton) {
                    const destinationIndex = Number(cardButton.dataset.openDestination);
                    const destination = destinations[destinationIndex];
                    if (!destination || !dialog) return;
                    dialog.dataset.activeDestinationIndex = String(destinationIndex);
                    dialogTitle.textContent = `Study in ${destination.country}`;
                    dialogSummary.textContent = `${destination.institutions.length} listed ${destination.institutions.length === 1 ? "institution" : "institutions"} in this destination.`;
                    dialogList.innerHTML = groupedInstitutions(destination) || "<p>No institutions are listed for this destination yet.</p>";
                    dialogSearch.dataset.destinationQuery = `institutions in ${destination.country}`;
                    dialog.showModal();
                    return;
                }

                if (institutionButton) {
                    const destination = destinations[Number(dialog?.dataset.activeDestinationIndex)];
                    const institution = destination?.institutions[Number(institutionButton.dataset.openInstitution)];
                    if (!destination || !institution || !detailDialog) return;
                    pendingInstitutionSelection = { institution, country: destination.country };
                    detailTitle.textContent = institution.name || "Institution";
                    detailCountry.textContent = `${getCountryMeta(destination.code).flag} ${destination.country}`;
                    const rows = [
                        ["Location", [institution.city, institution.state, institution.location].filter(Boolean).join(", ")],
                        ["Institution type", institution.type], ["Established", institution.established],
                        ["Tuition", institution.tuition], ["Estimated living costs", institution.living],
                        ["Rankings", institution.rankings], ["Popular courses", institution.popularCourses],
                        ["Scholarships", institution.scholarships], ["Intakes", institution.intakes],
                        ["English tests", institution.englishTests], ["Post-study work", institution.postStudyWork],
                        ["Verification", institution.verificationNote]
                    ].filter(([, value]) => value && String(value).trim());
                    detailFields.innerHTML = rows.map(([label, value]) => `<div class="institution-detail-field"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("") || "<p>More institution details will be added soon.</p>";
                    detailDialog.showModal();
                    return;
                }

                if (searchLink) {
                    const input = document.querySelector("#study-abroad-search-input");
                    if (!input) return;
                    event.preventDefault();
                    input.value = searchLink.dataset.destinationQuery || "";
                    dialog?.close();
                    document.querySelector("#study-abroad-search-button")?.click();
                }
            });

            dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
            detailDialog?.addEventListener("click", (event) => {
                if (event.target === detailDialog) { detailDialog.close(); pendingInstitutionSelection = null; }
            });
            dialog?.querySelector("[data-destination-close]")?.addEventListener("click", () => dialog.close());
            detailDialog?.querySelector("[data-detail-close]")?.addEventListener("click", () => {
                detailDialog.close();
                pendingInstitutionSelection = null;
            });

            const controls = sectionElement?.querySelector(
                "[data-destination-controls]"
            );

            const button = controls?.querySelector(
                "[data-destination-load-more]"
            );

            let expanded = false;

            if (controls && button) {
                controls.hidden = destinations.length <= initialCount;

                button.addEventListener("click", () => {
                    const cards = [
                        ...container.querySelectorAll(
                            ".study-abroad-destination-card"
                        )
                    ];

                    if (expanded) {
                        cards.forEach((card, index) => {
                            card.hidden = index >= initialCount;
                        });

                        expanded = false;
                        button.innerHTML =
                            'View More Destinations <span aria-hidden="true">↓</span>';

                        return;
                    }

                    const hiddenCards = cards
                        .filter((card) => card.hidden)
                        .slice(0, getDestinationBatchSize());

                    hiddenCards.forEach((card) => {
                        card.hidden = false;
                    });

                    if (!cards.some((card) => card.hidden)) {
                        expanded = true;
                        button.innerHTML =
                            'View Less <span aria-hidden="true">↑</span>';
                    }
                });
            }

        } catch (error) {
            console.error(
                "Failed to load Study Abroad destinations:",
                error
            );

            container.innerHTML = `
                <div class="study-abroad-destination-empty">
                    <div class="study-abroad-destination-empty-icon">⚠️</div>
                    <h3>Unable to load destinations</h3>
                    <p>Please refresh the page and try again.</p>
                </div>
            `;
        }
    }, 0);

    return section;
}
