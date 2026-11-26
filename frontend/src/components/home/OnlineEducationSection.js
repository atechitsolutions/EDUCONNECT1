import { getOnlineEducationProgrammes } from "../../services/onlineEducationService.js";
import { addProgrammeImages } from "../../utils/onlineEducationImages.js";
import InstitutionCard from "../common/InstitutionCard.js";
import Section from "../common/Section.js";

const unavailableValues = new Set([
    "not specified",
    "not listed",
    "not listed in supplied data",
    "unknown",
    "n/a",
]);

function getDisplayValue(value) {
    const text = String(value ?? "").trim();
    return text && !unavailableValues.has(text.toLowerCase()) ? text : "";
}

function escapeHtml(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[character],
    );
}

function getSafeImageUrl(value) {
    if (!value) return "";

    try {
        const url = new URL(value, window.location.origin);
        return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

const institutionAliases = new Map([
    ["arizona state university asu online", "arizona state university"],
]);

function getInstitutionKey(programme) {
    const provider = getDisplayValue(programme.providerName);
    if (!provider) return `programme-${programme.id}`;

    const normalized = provider
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

    return institutionAliases.get(normalized) || normalized;
}

function groupProgrammes(programmes) {
    const groups = new Map();

    programmes.forEach((programme, index) => {
        const key = getInstitutionKey(programme);
        const entry = { programme, index };
        const group = groups.get(key);

        if (group) {
            group.programmes.push(entry);
            return;
        }

        groups.set(key, {
            providerName: getDisplayValue(programme.providerName) || programme.title,
            programmes: [entry],
        });
    });

    return [...groups.values()];
}

function createProgrammeCard(programme, index, presentation = {}) {
    const provider = getDisplayValue(programme.providerName);
    const country = getDisplayValue(programme.country);
    const defaultCategory = [
        getDisplayValue(programme.providerType) || "Programme",
        getDisplayValue(programme.subject),
    ]
        .filter(Boolean)
        .join(" · ");
    const defaultLocation = [provider, country].filter(Boolean).join(" · ");
    const defaultProgrammeDetails = [
        getDisplayValue(programme.educationLevel),
        getDisplayValue(programme.qualificationType),
    ]
        .filter(Boolean)
        .join(" · ");
    const studyDetails = [getDisplayValue(programme.studyMode), getDisplayValue(programme.duration)]
        .filter(Boolean)
        .join(" · ");
    const programmeId = encodeURIComponent(String(programme.id));
    const detailsHref = `/online-education?viewProgramme=${programmeId}`;
    const enquiryHref = `/online-education?enquireProgramme=${programmeId}`;

    return InstitutionCard({
        item: {
            id: `online-program-${index + 1}`,
            rank: String(presentation.rank ?? index + 1).padStart(2, "0"),
            name: escapeHtml(presentation.name ?? programme.title ?? "Online programme"),
            category: escapeHtml(presentation.category ?? defaultCategory),
            location: escapeHtml(presentation.location ?? defaultLocation),
            program: escapeHtml(presentation.program ?? defaultProgrammeDetails),
            ranking: "",
            overview: "",
            image: getSafeImageUrl(programme.imageUrl || programme.image),
            actionLabel: "Explore",
            actionHref: detailsHref,
            enquiryHref,
            enquiryLabel: "Enquire",
            actionLayout: "home-directory-actions",
            showCompare: true,
            belowActions: presentation.belowActions || "",
        },
        type: "online-education",
    });
}

function createInstitutionCard(group, groupIndex) {
    const representative = group.programmes[0];
    const programme = representative.programme;
    const subjects = [
        ...new Set(
            group.programmes
                .map(({ programme: item }) => getDisplayValue(item.subject))
                .filter(Boolean),
        ),
    ];
    const countries = [
        ...new Set(
            group.programmes
                .map(({ programme: item }) => getDisplayValue(item.country))
                .filter(Boolean),
        ),
    ];
    const category = [
        getDisplayValue(programme.providerType) || "Institution",
        subjects.slice(0, 2).join(" · "),
    ]
        .filter(Boolean)
        .join(" · ");
    const programmeCount = group.programmes.length;
    const similarButton = `
        <div class="online-education-programmes-slot">
            ${programmeCount > 1 ? `
                <button
                    type="button"
                    class="online-education-programmes-button"
                    data-similar-programmes="institution-${groupIndex + 1}"
                    aria-haspopup="dialog"
                    aria-label="View all ${programmeCount} programmes from ${escapeHtml(group.providerName)}"
                >View all ${programmeCount} programmes</button>
            ` : ""}
        </div>
    `;

    return createProgrammeCard(programme, representative.index, {
        rank: groupIndex + 1,
        name: group.providerName,
        category,
        location: countries.join(" · "),
        program: programme.title,
        belowActions: similarButton,
    });
}

function bindInstitutionProgrammes(section, dialog, groupsById) {
    const title = dialog.querySelector("[data-similar-programmes-title]");
    const list = dialog.querySelector("[data-similar-programmes-list]");

    section.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const button = target.closest("[data-similar-programmes]");
        if (!button) return;

        const group = groupsById.get(button.dataset.similarProgrammes);
        if (!group) return;

        title.textContent = `${group.providerName} programmes`;
        list.innerHTML = group.programmes
            .map(({ programme, index }) => createProgrammeCard(programme, index))
            .join("");

        if (!dialog.open) dialog.showModal();
    });

    dialog.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
            if (target === dialog) dialog.close();
            return;
        }

        if (target.closest("[data-close-institution-programmes]") || target === dialog) {
            dialog.close();
        }
    });
}

function formatTuition(programme) {
    if (
        programme.tuitionAmount === null ||
        programme.tuitionAmount === undefined ||
        programme.tuitionAmount === ""
    ) {
        return "Not listed";
    }

    const amount = Number(programme.tuitionAmount);
    if (!Number.isFinite(amount)) return "Not listed";

    const formattedAmount = amount.toLocaleString();
    const fee = [programme.currency, formattedAmount].filter(Boolean).join(" ");
    return programme.feePeriod ? `${fee} / ${programme.feePeriod}` : fee;
}

function bindProgrammeComparison(section, dialog, toolbar, programmeByCardId) {
    const selectedIds = new Set();
    const tableHead = dialog.querySelector("[data-online-compare-head]");
    const tableBody = dialog.querySelector("[data-online-compare-body]");
    const status = dialog.querySelector("[data-online-compare-status]");
    const toolbarCount = toolbar.querySelector("[data-online-compare-count]");
    const toolbarStatus = toolbar.querySelector("[data-online-compare-notice]");
    const openButton = toolbar.querySelector("[data-open-online-compare]");

    const comparisonRows = [
        ["Provider", (programme) => programme.providerName],
        ["Country", (programme) => programme.country],
        ["Education level", (programme) => programme.educationLevel],
        ["Qualification", (programme) => programme.qualificationType],
        ["Subject", (programme) => programme.subject],
        ["Study mode", (programme) => programme.studyMode],
        ["Duration", (programme) => programme.duration],
        ["Tuition", formatTuition],
        ["Eligibility", (programme) => programme.eligibility],
    ];

    function renderComparison() {
        const selected = [...selectedIds]
            .map((id) => [id, programmeByCardId.get(id)])
            .filter((entry) => entry[1]);

        tableHead.innerHTML = `
            <tr>
                <th scope="col">Programme detail</th>
                ${selected
                    .map(
                        ([id, programme]) => `
                            <th scope="col">
                                ${escapeHtml(programme.title)}
                                <button
                                    type="button"
                                    class="oe-remove-compare"
                                    data-remove-online-program="${id}"
                                >Remove</button>
                            </th>
                        `,
                    )
                    .join("")}
            </tr>
        `;

        tableBody.innerHTML = comparisonRows
            .map(
                ([label, getValue]) => `
                    <tr>
                        <th scope="row">${escapeHtml(label)}</th>
                        ${selected
                            .map(
                                ([, programme]) => `
                                    <td>${escapeHtml(getValue(programme) || "Not specified")}</td>
                                `,
                            )
                            .join("")}
                    </tr>
                `,
            )
            .join("");

        status.textContent = selected.length
            ? `${selected.length} of 3 programmes selected`
            : "Select up to three programmes to compare.";
        toolbar.hidden = selected.length === 0;
        toolbarCount.textContent = `${selected.length} selected`;
        toolbarStatus.textContent =
            selected.length === 1
                ? "Select one more programme to compare."
                : "Choose Compare selected when your shortlist is ready.";
        openButton.disabled = selected.length < 2;

        section.querySelectorAll('[data-action="compare"]').forEach((button) => {
            const id = button.closest(".institution-card")?.dataset.institutionId;
            button.setAttribute("aria-pressed", String(selectedIds.has(id)));
        });

        if (!selected.length && dialog.open) dialog.close();
    }

    section.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const button = target.closest('button[data-action="compare"]');
        if (!button) return;

        const id = button.closest(".institution-card")?.dataset.institutionId;
        if (!id || !programmeByCardId.has(id)) return;

        if (selectedIds.has(id)) {
            selectedIds.delete(id);
        } else if (selectedIds.size < 3) {
            selectedIds.add(id);
        } else {
            toolbarStatus.textContent = "You can compare up to three programmes.";
            return;
        }

        renderComparison();
    });

    toolbar.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        if (target.closest("[data-open-online-compare]")) {
            if (selectedIds.size < 2) {
                toolbarStatus.textContent = "Select at least two programmes to compare.";
                return;
            }
            if (!dialog.open) dialog.showModal();
        }

        if (target.closest("[data-clear-online-compare]")) {
            selectedIds.clear();
            renderComparison();
        }
    });

    dialog.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
            if (target === dialog) dialog.close();
            return;
        }

        if (target.closest("[data-close-online-compare]")) {
            dialog.close();
            return;
        }

        if (target.closest("[data-clear-online-compare]")) {
            selectedIds.clear();
            renderComparison();
            return;
        }

        const removeButton = target.closest("[data-remove-online-program]");
        if (removeButton) {
            selectedIds.delete(removeButton.dataset.removeOnlineProgram);
            renderComparison();
            return;
        }

        if (target === dialog) dialog.close();
    });

    renderComparison();
}

async function loadProgrammes() {
    const track = document.querySelector("#online-education .online-education-track");
    const count = document.querySelector("[data-online-programme-count]");

    if (!track) return;

    try {
        const programmes = addProgrammeImages(await getOnlineEducationProgrammes());
        if (!programmes.length) {
            if (count) count.textContent = "0";
            track.innerHTML = `
                <p class="oe-load-error">No online programmes are currently available.</p>
            `;
            return;
        }

        const groups = groupProgrammes(programmes).sort(
            (first, second) => second.programmes.length - first.programmes.length,
        );
        const programmeByCardId = new Map(
            programmes.map((programme, index) => [`online-program-${index + 1}`, programme]),
        );
        const groupsById = new Map(
            groups.map((group, index) => [`institution-${index + 1}`, group]),
        );

        track.innerHTML = groups.map(createInstitutionCard).join("");
        if (count) count.textContent = programmes.length.toLocaleString();

        const section = document.querySelector("#online-education .online-education-section");
        const dialog = document.querySelector("[data-online-programme-compare]");
        const toolbar = document.querySelector("[data-online-compare-toolbar]");
        const institutionDialog = document.querySelector("[data-institution-programmes]");
        if (section && dialog && toolbar) {
            bindProgrammeComparison(section, dialog, toolbar, programmeByCardId);
        }
        if (section && institutionDialog) {
            bindInstitutionProgrammes(section, institutionDialog, groupsById);
        }
    } catch (error) {
        console.error("Unable to load online education programmes on the homepage.", error);
        if (count) count.textContent = "—";
        track.innerHTML = `
            <p class="oe-load-error">
                Online programmes could not be loaded. Please refresh the page to try again.
            </p>
        `;
    }
}

export function OnlineEducationSection() {
    const content = `
        <div class="online-education-section">
            <div class="online-education-intro">
                <div class="online-education-intro-content">
                    <span class="online-education-eyebrow">
                        💻 FLEXIBLE EDUCATION
                    </span>
                    <h2>Online & Distance Education in India</h2>
                    <p>
                        Explore online degrees, distance education programmes,
                        and flexible courses from institutions around the world.
                    </p>
                </div>
                <div class="online-education-stat">
                    <strong data-online-programme-count>Loading...</strong>
                    <span>Programmes</span>
                </div>
            </div>
            <div class="online-education-carousel">
                <div class="online-education-viewport">
                    <div class="online-education-track">
                        <p class="oe-load-error">Loading online programmes...</p>
                    </div>
                </div>
                <button
                    type="button"
                    class="online-education-next"
                    aria-label="Show next online and distance education programmes"
                >
                    <span>→</span>
                </button>
            </div>
            <dialog
                class="oe-compare-dialog oe-similar-programmes-dialog"
                data-institution-programmes
                aria-labelledby="online-programmes-dialog-title"
            >
                <div class="oe-dialog-head">
                    <div>
                        <p class="oe-eyebrow">PROGRAMMES AT THIS INSTITUTION</p>
                        <h2 id="online-programmes-dialog-title" data-similar-programmes-title>
                            Programmes
                        </h2>
                    </div>
                    <button
                        type="button"
                        class="oe-icon-button"
                        data-close-institution-programmes
                        aria-label="Close institution programmes"
                    >×</button>
                </div>
                <div class="oe-similar-programmes-list" data-similar-programmes-list></div>
            </dialog>
            <div class="oe-dialog-actions" data-online-compare-toolbar hidden>
                <span data-online-compare-count></span>
                <span data-online-compare-notice aria-live="polite"></span>
                <button
                    type="button"
                    class="oe-button oe-primary"
                    data-open-online-compare
                    disabled
                >Compare selected</button>
                <button
                    type="button"
                    class="oe-button oe-outline"
                    data-clear-online-compare
                >Clear</button>
            </div>
            <dialog
                class="oe-compare-dialog"
                data-online-programme-compare
                aria-label="Compare online programmes"
            >
                <div class="oe-dialog-head">
                    <div>
                        <p class="oe-eyebrow">PROGRAMME COMPARISON</p>
                        <h2>Compare programmes</h2>
                        <p data-online-compare-status>
                            Select up to three programmes to compare.
                        </p>
                    </div>
                    <button
                        type="button"
                        class="oe-icon-button"
                        data-close-online-compare
                        aria-label="Close comparison"
                    >×</button>
                </div>
                <div class="oe-table-wrap">
                    <table class="oe-compare-table">
                        <thead data-online-compare-head></thead>
                        <tbody data-online-compare-body></tbody>
                    </table>
                </div>
                <div class="oe-dialog-actions">
                    <button
                        type="button"
                        class="oe-button oe-outline"
                        data-clear-online-compare
                    >Clear comparison</button>
                </div>
            </dialog>
        </div>
    `;

    const section = Section({
        id: "online-education",
        title: "",
        subtitle: "",
        content,
    });

    setTimeout(() => {
        loadProgrammes();
    }, 0);

    return section;
}

export default OnlineEducationSection;
