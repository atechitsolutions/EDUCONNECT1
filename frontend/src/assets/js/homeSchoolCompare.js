const SCHOOL_CARD_SELECTOR =
    "#top-boarding-schools " +
    ".regional-school-card, #school " +
    ".regional-school-card, #pre-school " +
    ".institution-card, #play-school " +
    ".institution-card";
const SCHOOL_COMPARE_BUTTON_SELECTOR =
    "#top-boarding-schools " +
    ".regional-school-card " +
    '[data-action="compare"], #school ' +
    ".regional-school-card " +
    '[data-action="compare"], #pre-school ' +
    ".institution-card " +
    '[data-action="compare"], #play-school ' +
    ".institution-card " +
    '[data-action="compare"]';

function getSchoolRecord(card) {
    const name = card.querySelector(".institution-card-title h3")?.textContent.trim();
    if (!name) return null;

    const location = (card.querySelector(".institution-card-title p")?.textContent || "")
        .replace(/^[\s📍⌖]+/u, "")
        .trim();
    const category =
        card.querySelector(".institution-card-category")?.textContent.trim() || "Not listed";
    const isEarlyLearning = ["pre-school", "play-school"].includes(card.dataset.type);

    return {
        id: `${card.dataset.type}|${name.toLocaleLowerCase()}|${location.toLocaleLowerCase()}`,
        name,
        location: location || "Not listed",
        category,
        board: isEarlyLearning ? "Not applicable" : category,
        status: isEarlyLearning
            ? "Not applicable"
            : card.querySelector(".institution-card-program")?.textContent.trim() || "Not listed",
        programme: isEarlyLearning
            ? card.querySelector(".institution-card-program")?.textContent.trim() || "Not listed"
            : "Not listed",
        overview:
            card
                .querySelector(".institution-card-overview, .institution-card-highlight")
                ?.textContent.trim() || "Not listed",
    };
}

function createComparisonDialog() {
    const dialog = document.createElement("dialog");
    dialog.className = "sd-dialog sd-compare-dialog";
    dialog.setAttribute("aria-labelledby", "home-school-compare-title");
    dialog.innerHTML = `
        <div class="sd-dialog-header">
            <div><span class="sd-eyebrow">SIDE-BY-SIDE</span><h2 id="home-school-compare-title">Compare schools</h2></div>
            <button type="button" class="sd-button" data-clear-home-school-compare>Clear comparison</button>
            <button type="button" class="sd-dialog-close" data-close-home-school-compare aria-label="Close">×</button>
        </div>
        <div class="sd-compare-table-wrap"><table class="sd-compare-table"><tbody></tbody></table></div>`;
    document.body.append(dialog);
    return dialog;
}

function appendTextCell(row, tagName, text) {
    const cell = document.createElement(tagName);
    cell.textContent = text;
    row.append(cell);
    return cell;
}

export default function initHomeSchoolCompare() {
    const selected = new Map();
    let dialog;

    const syncButtons = () => {
        document.querySelectorAll(SCHOOL_COMPARE_BUTTON_SELECTOR).forEach((button) => {
            const card = button.closest(SCHOOL_CARD_SELECTOR);
            const school = card && getSchoolRecord(card);
            if (!school) return;

            const isSelected = selected.has(school.id);
            button.dataset.compared = isSelected ? "true" : "";
            button.setAttribute("aria-pressed", String(isSelected));
            button.replaceChildren(
                document.createTextNode(isSelected ? "Added to compare" : "Compare"),
            );
            const arrow = document.createElement("span");
            arrow.textContent = "›";
            button.append(arrow);
            card.classList.toggle("is-selected-for-compare", isSelected);
        });
    };

    const renderComparison = () => {
        const schools = [...selected.values()];
        const body = dialog.querySelector("tbody");
        body.replaceChildren();

        const heading = document.createElement("tr");
        appendTextCell(heading, "th", "School").scope = "row";
        schools.forEach((school) => {
            const cell = document.createElement("th");
            cell.scope = "col";
            const name = document.createElement("strong");
            name.textContent = school.name;
            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "sd-button";
            remove.dataset.removeHomeSchool = school.id;
            remove.setAttribute("aria-label", `Remove ${school.name} from comparison`);
            remove.textContent = "Remove";
            cell.append(name, remove);
            heading.append(cell);
        });
        body.append(heading);

        [
            ["Location", "location"],
            ["Board", "board"],
            ["Day / boarding", "status"],
            ["Category", "category"],
            ["Programme", "programme"],
            ["Overview", "overview"],
        ].forEach(([label, key]) => {
            const row = document.createElement("tr");
            appendTextCell(row, "th", label).scope = "row";
            schools.forEach((school) => appendTextCell(row, "td", school[key]));
            body.append(row);
        });
    };

    document.addEventListener(
        "click",
        (event) => {
            const button = event.target.closest?.('[data-action="compare"]');
            if (!button || !button.closest(SCHOOL_CARD_SELECTOR)) return;

            const school = getSchoolRecord(button.closest(SCHOOL_CARD_SELECTOR));
            if (!school) return;

            if (selected.has(school.id)) {
                selected.delete(school.id);
            } else if (selected.size < 3) {
                selected.set(school.id, school);
            } else {
                button.textContent = "Up to 3";
                window.setTimeout(syncButtons, 1200);
                return;
            }

            syncButtons();
            if (selected.size < 2) return;

            dialog ||= createComparisonDialog();
            renderComparison();
            if (!dialog.open) dialog.showModal();
        },
        true,
    );

    document.addEventListener("click", (event) => {
        const remove = event.target.closest?.("[data-remove-home-school]");
        if (remove && dialog?.contains(remove)) {
            selected.delete(remove.dataset.removeHomeSchool);
            syncButtons();
            if (selected.size < 2) dialog.close();
            else renderComparison();
            return;
        }

        const clear = event.target.closest?.("[data-clear-home-school-compare]");
        if (clear && dialog?.contains(clear)) {
            selected.clear();
            syncButtons();
            dialog.close();
            return;
        }

        const close = event.target.closest?.("[data-close-home-school-compare]");
        if ((close && dialog?.contains(close)) || (dialog && event.target === dialog)) {
            dialog.close();
        }
    });
}
