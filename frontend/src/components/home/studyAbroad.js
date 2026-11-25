import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import { getInstitutions } from "../../services/studyAbroadService.js";
import { bindInstitutionDetailButtons } from "../studyAbroad/InstitutionDetailsModals.js";

export function StudyAbroadSection() {
    function createInstitutionCard(institution, index) {
        const location = [institution.city, institution.state, institution.country]
            .filter(Boolean)
            .join(", ");

        const category = [
            institution.type === "UNIVERSITY"
                ? "University"
                : institution.type === "COLLEGE"
                  ? "College"
                  : "Institution",
            institution.country,
        ]
            .filter(Boolean)
            .join(" • ");

        return InstitutionCard({
            item: {
                id: institution.id,
                rank: String(index + 1).padStart(2, "0"),
                name: institution.name,
                category,
                location,
                program:
                    institution.type === "UNIVERSITY"
                        ? "University listing"
                        : institution.type === "COLLEGE"
                          ? "College listing"
                          : "Institution listing",
                ranking: institution.verified ? "Details verified" : "Institution listing",
                highlight:
                    institution.description || "Explore this institution as a Study Abroad option.",
                image: institution.coverImageUrl || "",
                actionLabel: "Explore",
                actionMode: "details",
                actionLayout: "home-directory-actions",
                enquiryHref: /^\d+$/.test(String(institution.id || ""))
                    ? `/college/enquire?institutionId=${encodeURIComponent(institution.id)}`
                    : "/study-abroad#study-abroad-lead-form",
                showCompare: true,
            },

            type: "study-abroad",
        });
    }

    const content = `
        <div
            class="study-abroad-section"
            id="study-abroad-destinations"
        >

            <div class="study-abroad-intro">

                <div class="study-abroad-intro-content">

                    <span class="study-abroad-eyebrow">
                        🌍 INTERNATIONAL EDUCATION
                    </span>

                    <h2>
                        Study Abroad
                    </h2>

                    <p>
                        Browse the universities, colleges and institutions listed
                        across our Study Abroad destinations.
                    </p>

                </div>


                <div class="study-abroad-stat">

                    <strong
                        class="study-abroad-institution-count"
                    >
                        0
                    </strong>

                    <span>
                        Listed<br>
                        Institutions
                    </span>

                </div>

            </div>


            <div class="study-abroad-carousel">

                <div class="study-abroad-viewport">

                    <div class="study-abroad-track">

                        <div class="study-abroad-loading">
                            Loading Study Abroad institutions...
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="study-abroad-next"
                    aria-label="Show next Study Abroad institutions"
                >
                    <span>→</span>
                </button>

            </div>

            <dialog class="sd-dialog sd-compare-dialog" data-study-abroad-compare-dialog aria-labelledby="study-abroad-compare-title">
                <div class="sd-dialog-header">
                    <div><span class="sd-eyebrow">SIDE-BY-SIDE</span><h2 id="study-abroad-compare-title">Compare institutions</h2></div>
                    <button type="button" class="sd-button" data-clear-study-abroad-compare>Clear comparison</button>
                    <button type="button" class="sd-dialog-close" data-close-study-abroad-compare aria-label="Close comparison">×</button>
                </div>
                <div class="sd-compare-table-wrap"><table class="sd-compare-table"><tbody></tbody></table></div>
            </dialog>

        </div>
    `;

    const section = Section({
        id: "study-abroad-section",
        title: "",
        subtitle: "",
        content,
    });

    setTimeout(async () => {
        try {
            const institutions = await getInstitutions();
            const visibleInstitutions = institutions.filter(
                (institution) =>
                    institution.active === true &&
                    institution.studyAbroadEnabled === true &&
                    String(institution.name || "")
                        .trim()
                        .toLowerCase() !== "nishant",
            );
            const track = document.querySelector("#study-abroad-destinations .study-abroad-track");
            const countElement = document.querySelector(
                "#study-abroad-destinations .study-abroad-institution-count",
            );
            if (!track) return;

            if (countElement) countElement.textContent = visibleInstitutions.length;

            if (!visibleInstitutions.length) {
                track.innerHTML = `
                    <div class="study-abroad-loading">
                        No Study Abroad institutions have been listed yet.
                    </div>
                `;
                return;
            }

            const institutionMap = new Map(
                visibleInstitutions.map((institution) => [String(institution.id), institution]),
            );
            track.innerHTML = visibleInstitutions.map(createInstitutionCard).join("");
            bindInstitutionDetailButtons(track, institutionMap);
            bindInstitutionCompare(track, institutionMap);
            window.dispatchEvent(new CustomEvent("educonnect:studyabroad-cards-ready"));
        } catch (error) {
            console.error("Failed to load Study Abroad institutions:", error);
            const track = document.querySelector("#study-abroad-destinations .study-abroad-track");
            if (track) {
                track.innerHTML = `
                    <div class="study-abroad-loading">
                        Unable to load Study Abroad institutions.
                    </div>
                `;
            }
        }
    }, 0);

    return section;
}

function bindInstitutionCompare(track, institutionMap) {
    const section = track.closest("#study-abroad-destinations");
    const dialog = section?.querySelector("[data-study-abroad-compare-dialog]");
    const tableBody = dialog?.querySelector("tbody");
    if (!section || !dialog || !tableBody || track.dataset.compareBound === "true") return;
    track.dataset.compareBound = "true";

    const selected = new Map();
    const syncButtons = () => {
        track.querySelectorAll('[data-action="compare"]').forEach((button) => {
            const id = button.closest(".institution-card")?.dataset.institutionId;
            const isSelected = selected.has(String(id));
            button.dataset.compared = String(isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
            button.innerHTML = `${isSelected ? "Added to compare" : "Compare"}<span>›</span>`;
        });
    };
    syncButtons();

    const renderComparison = () => {
        const institutions = [...selected.values()];
        tableBody.replaceChildren();

        const appendCell = (row, tag, text) => {
            const cell = document.createElement(tag);
            cell.textContent = text;
            row.append(cell);
            return cell;
        };

        const heading = document.createElement("tr");
        appendCell(heading, "th", "Institution").scope = "row";
        institutions.forEach((institution) => {
            const cell = document.createElement("th");
            cell.scope = "col";
            const name = document.createElement("strong");
            name.textContent = institution.name || "Institution";
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "sd-button";
            remove.dataset.removeStudyAbroadInstitution = String(institution.id);
            remove.setAttribute(
                "aria-label",
                `Remove ${institution.name || "institution"} from comparison`,
            );
            remove.textContent = "Remove";
            cell.append(name, remove);
            heading.append(cell);
        });
        tableBody.append(heading);

        [
            ["Country", (institution) => institution.country],
            [
                "Location",
                (institution) => [institution.city, institution.state].filter(Boolean).join(", "),
            ],
            ["Type", (institution) => institution.type],
            ["Popular courses", (institution) => institution.popularCourses],
            ["Tuition", (institution) => institution.tuition],
            ["Estimated living costs", (institution) => institution.livingCost],
            ["Intakes", (institution) => institution.intakes],
            ["Scholarships", (institution) => institution.scholarships],
        ].forEach(([label, getValue]) => {
            const row = document.createElement("tr");
            appendCell(row, "th", label).scope = "row";
            institutions.forEach((institution) => {
                appendCell(row, "td", String(getValue(institution) || "Not listed"));
            });
            tableBody.append(row);
        });
    };

    track.addEventListener("click", (event) => {
        const button = event.target.closest('[data-action="compare"]');
        if (!button || !track.contains(button)) return;

        const id = String(button.closest(".institution-card")?.dataset.institutionId || "");
        const institution = institutionMap.get(id);
        if (!institution) return;

        if (selected.has(id)) selected.delete(id);
        else if (selected.size < 3) selected.set(id, institution);
        else {
            button.innerHTML = "Up to 3<span>›</span>";
            window.setTimeout(syncButtons, 1200);
            return;
        }

        syncButtons();
        if (selected.size < 2) {
            if (dialog.open) dialog.close();
            return;
        }

        renderComparison();
        if (!dialog.open) dialog.showModal();
    });

    dialog.addEventListener("click", (event) => {
        const remove = event.target.closest("[data-remove-study-abroad-institution]");
        if (remove) {
            selected.delete(remove.dataset.removeStudyAbroadInstitution);
            syncButtons();
            if (selected.size < 2) dialog.close();
            else renderComparison();
            return;
        }

        if (event.target.closest("[data-clear-study-abroad-compare]")) {
            selected.clear();
            syncButtons();
            dialog.close();
            return;
        }

        if (event.target.closest("[data-close-study-abroad-compare]") || event.target === dialog) {
            dialog.close();
        }
    });
}

export default StudyAbroadSection;
