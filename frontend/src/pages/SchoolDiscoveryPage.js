import { getRegionalSchoolListings, regionalSchoolNames } from "../components/home/regionalSchools.js";
import { submitSchoolEnquiry } from "../services/schoolService.js";

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const listings = getRegionalSchoolListings();
const regions = Object.keys(regionalSchoolNames);
const filters = [
    ["all", "All Schools"], ["day", "Day Schools"], ["boarding", "Boarding Schools"],
    ["boys", "Boys Schools"], ["girls", "Girls Schools"], ["coed", "Co-educational Schools"],
    ["CBSE", "CBSE"], ["ICSE", "ICSE"], ["IB", "IB"], ["IGCSE", "IGCSE"], ["State Board", "State Board"]
];

function matches(record, filter) {
    if (filter === "all") return true;
    const status = `${record.status} ${record.schoolType}`.toLowerCase();
    const board = record.board.toLowerCase();
    if (["cbse", "icse", "ib", "igcse", "state board"].includes(filter.toLowerCase())) return board.includes(filter.toLowerCase());
    if (filter === "day") return (status.includes("day school") || status.includes("day/boarding")) && !status.includes("not stated") && !status.includes("not verified");
    if (filter === "boarding") return (status.includes("boarding") || status.includes("residential")) && !status.includes("not stated") && !status.includes("not verified");
    if (filter === "boys") return status.includes("boys school") || status.includes("all-boys") || status.includes("boys' school");
    if (filter === "girls") return status.includes("girls school") || status.includes("all-girls") || status.includes("girls' school");
    if (filter === "coed") return status.includes("co-educational") || status.includes("coeducational");
    return true;
}

function schoolCard(record, index, region) {
    const rank = region && regionalSchoolNames[region]
        ? (record.ranks?.[region] || regionalSchoolNames[region].findIndex(([name, city]) => name === record.name && city === record.city) + 1)
        : index + 1;
    const regionName = region || record.state;
    return `<article class="sd-school-card" data-school-id="${escapeHtml(record.id)}">
        <div class="sd-card-image-wrap">
            <img class="sd-card-image" src="${escapeHtml(record.image)}" alt="${escapeHtml(record.imageAvailable ? `${record.name} campus` : `${record.name} campus photo unavailable`)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(record.imageFallback)}'">
            <div class="sd-card-image-shade"></div>
            <span class="sd-rank">#${String(rank).padStart(2, "0")} <small>EDITORIAL</small></span>
            <div class="sd-card-heading"><h3>${escapeHtml(record.name)}</h3><p>⌖ ${escapeHtml(record.city)}, ${escapeHtml(record.state)}</p></div>
        </div>
        <div class="sd-card-content">
            <div class="sd-fact-row"><span class="sd-fact-label">Board</span><strong>${escapeHtml(record.board === "Not verified" ? "Not verified" : record.board)}</strong></div>
            <div class="sd-fact-row"><span class="sd-fact-label">School type</span><strong>${escapeHtml(record.schoolType === "Not verified" ? "Not verified" : record.schoolType)}</strong></div>
            <p class="sd-card-description">${escapeHtml(record.description)}</p>
            ${record.photoSource ? `<a class="sd-photo-source" href="${escapeHtml(record.photoSource)}" target="_blank" rel="noopener noreferrer">Campus photo source</a>` : `<span class="sd-photo-source sd-photo-missing">School-matched campus photo unavailable</span>`}
            <div class="sd-card-actions">
                <button class="sd-button sd-button-primary" type="button" data-school-action="enquire">Enquire</button>
                <button class="sd-button" type="button" data-school-action="details">Explore School</button>
                <button class="sd-button sd-compare-button" type="button" data-school-action="compare" aria-pressed="false">Compare</button>
            </div>
        </div>
    </article>`;
}

export function SchoolDiscoveryPage() {
    const options = regions.map(region => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`).join("");
    const filterButtons = filters.map(([value, label], index) => `<button type="button" class="sd-filter-chip${index === 0 ? " is-active" : ""}" data-school-filter="${escapeHtml(value)}" aria-pressed="${index === 0}">${escapeHtml(label)}</button>`).join("");
    return `<main id="schools-discovery" class="sd-page">
        <div class="sd-container">
            <header class="sd-page-heading"><div><span class="sd-eyebrow">SCHOOL DIRECTORY</span><h1>Top Schools in India</h1><p>Browse schools by region and compare the details we can verify.</p></div><span class="sd-directory-badge">${listings.length} listings</span></header>
            <section class="sd-search-panel" aria-label="Search schools by region">
                <div class="sd-search-fields"><label class="sd-select-field"><span>Region</span><select id="sd-region"><option value="">All India</option>${options}</select></label><label class="sd-query-field"><span>School or city</span><input id="sd-query" type="search" placeholder="Search school or city" autocomplete="off"></label><button id="sd-search-button" class="sd-button sd-button-primary" type="button">Search</button></div>
                <div class="sd-results-summary" aria-live="polite"><strong id="sd-selected-region">All India</strong><span><b id="sd-result-count">${listings.length}</b> schools</span><span>Rankings are approximate editorial listings.</span></div>
            </section>
            <section class="sd-directory" aria-label="School directory">
                <div class="sd-directory-toolbar"><div><span class="sd-eyebrow">DISCOVER</span><h2>Find your school</h2></div><button id="sd-clear-filters" class="sd-clear-button" type="button">Clear filters</button></div>
                <div class="sd-filter-list" role="group" aria-label="Filter schools">${filterButtons}</div>
                <div id="sd-school-grid" class="sd-school-grid">${listings.map((record, index) => schoolCard(record, index, "")).join("")}</div>
                <div id="sd-empty-state" class="sd-empty-state" hidden><strong>No schools match these filters.</strong><span>Try clearing a filter or choosing another region.</span></div>
            </section>
        </div>
        <dialog class="sd-dialog" id="sd-details-dialog" aria-labelledby="sd-details-title"><div class="sd-dialog-header"><span class="sd-eyebrow">SCHOOL DETAILS</span><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div><div id="sd-details-content"></div></dialog>
        <dialog class="sd-dialog sd-enquiry-dialog" id="sd-enquiry-dialog" aria-labelledby="sd-enquiry-title"><div class="sd-dialog-header"><div><span class="sd-eyebrow">SCHOOL ENQUIRY</span><h2 id="sd-enquiry-title">Enquire with this school</h2><p id="sd-enquiry-school"></p></div><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div>
            <form id="sd-enquiry-form"><input type="hidden" name="schoolName"><input type="hidden" name="city"><label>Student or parent name<input name="name" maxlength="120" autocomplete="name" required></label><div class="sd-form-row"><label>Email<input name="email" type="email" maxlength="180" autocomplete="email" required></label><label>Phone number<input name="phone" type="tel" maxlength="40" autocomplete="tel" required></label></div><label>Class / grade of interest<input name="grade" maxlength="60" placeholder="e.g. Class 8" required></label><label>Message <small>(optional)</small><textarea name="message" maxlength="2000" rows="3" placeholder="What would you like to know?"></textarea></label><label class="sd-consent"><input type="checkbox" name="consent" value="true" required><span>I agree to share these details with the selected school so it can respond to this enquiry.</span></label><button class="sd-button sd-button-primary" type="submit">Submit enquiry</button><p id="sd-enquiry-feedback" role="status" aria-live="polite"></p></form>
        </dialog>
        <dialog class="sd-dialog sd-compare-dialog" id="sd-compare-dialog" aria-labelledby="sd-compare-title"><div class="sd-dialog-header"><div><span class="sd-eyebrow">SIDE-BY-SIDE</span><h2 id="sd-compare-title">Compare schools</h2></div><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div><div class="sd-compare-table-wrap"><table class="sd-compare-table"><tbody id="sd-compare-table"></tbody></table></div></dialog>
    </main>`;
}

export function initSchoolDiscoveryPage() {
    const root = document.querySelector("#schools-discovery");
    if (!root) return;
    const regionSelect = root.querySelector("#sd-region");
    const queryInput = root.querySelector("#sd-query");
    const grid = root.querySelector("#sd-school-grid");
    const resultCount = root.querySelector("#sd-result-count");
    const selectedRegion = root.querySelector("#sd-selected-region");
    const empty = root.querySelector("#sd-empty-state");
    let activeRegion = "";
    let activeFilter = "all";
    let selected = new Set();
    const byId = new Map(listings.map(record => [record.id, record]));

    const render = () => {
        const query = queryInput.value.trim().toLocaleLowerCase();
        const regionRecords = activeRegion
            ? listings.filter(record => record.regions?.includes(activeRegion))
            : listings;
        const matching = regionRecords.filter(record => matches(record, activeFilter) && `${record.name} ${record.city} ${record.state}`.toLocaleLowerCase().includes(query));
        grid.innerHTML = matching.map((record, index) => schoolCard(record, index, activeRegion)).join("");
        grid.querySelectorAll(".sd-compare-button").forEach(button => {
            const id = button.closest("[data-school-id]").dataset.schoolId;
            button.setAttribute("aria-pressed", String(selected.has(id)));
            button.classList.toggle("is-selected", selected.has(id));
            if (selected.has(id)) button.textContent = "Added";
        });
        resultCount.textContent = String(matching.length);
        selectedRegion.textContent = activeRegion || "All India";
        empty.hidden = matching.length > 0;
    };

    root.querySelector("#sd-search-button").addEventListener("click", () => { activeRegion = regionSelect.value; render(); });
    regionSelect.addEventListener("change", () => { activeRegion = regionSelect.value; render(); });
    queryInput.addEventListener("input", render);
    root.querySelector(".sd-filter-list").addEventListener("click", event => {
        const button = event.target.closest("[data-school-filter]");
        if (!button) return;
        activeFilter = button.dataset.schoolFilter;
        root.querySelectorAll("[data-school-filter]").forEach(item => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
        render();
    });
    root.querySelector("#sd-clear-filters").addEventListener("click", () => {
        activeFilter = "all"; activeRegion = ""; regionSelect.value = ""; queryInput.value = "";
        root.querySelectorAll("[data-school-filter]").forEach(item => { const active = item.dataset.schoolFilter === "all"; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
        render();
    });

    const detailsDialog = root.querySelector("#sd-details-dialog");
    const enquiryDialog = root.querySelector("#sd-enquiry-dialog");
    root.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    [detailsDialog, enquiryDialog, root.querySelector("#sd-compare-dialog")].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));

    grid.addEventListener("click", event => {
        const button = event.target.closest("[data-school-action]");
        if (!button) return;
        const card = button.closest("[data-school-id]");
        const school = byId.get(card?.dataset.schoolId);
        if (!school) return;
        if (button.dataset.schoolAction === "enquire") {
            const form = root.querySelector("#sd-enquiry-form");
            form.reset(); form.elements.schoolName.value = school.name; form.elements.city.value = school.city;
            root.querySelector("#sd-enquiry-school").textContent = `${school.name} · ${school.city}, ${school.state}`;
            root.querySelector("#sd-enquiry-feedback").textContent = "";
            enquiryDialog.showModal();
        }
        if (button.dataset.schoolAction === "details") {
            root.querySelector("#sd-details-content").innerHTML = `<img class="sd-details-image" src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAvailable ? `${school.name} campus` : "School-matched campus photo unavailable")}"><h2 id="sd-details-title">${escapeHtml(school.name)}</h2><p class="sd-details-location">${escapeHtml(school.city)}, ${escapeHtml(school.state)}</p><dl class="sd-detail-facts"><div><dt>Board</dt><dd>${escapeHtml(school.board)}</dd></div><div><dt>Day / boarding</dt><dd>${escapeHtml(school.status)}</dd></div><div><dt>School category</dt><dd>${escapeHtml(school.schoolType)}</dd></div></dl><p>${escapeHtml(school.description)}</p><p class="sd-editorial-note">Approximate editorial listing; not an official ranking. Unverified information is labelled and should be confirmed with the school.</p><div class="sd-card-actions"><button type="button" class="sd-button sd-button-primary" id="sd-details-enquire">Enquire with this school</button></div>`;
            root.querySelector("#sd-details-enquire").addEventListener("click", () => { detailsDialog.close(); const form = root.querySelector("#sd-enquiry-form"); form.reset(); form.elements.schoolName.value = school.name; form.elements.city.value = school.city; root.querySelector("#sd-enquiry-school").textContent = `${school.name} · ${school.city}, ${school.state}`; root.querySelector("#sd-enquiry-feedback").textContent = ""; enquiryDialog.showModal(); });
            detailsDialog.showModal();
        }
        if (button.dataset.schoolAction === "compare") {
            if (selected.has(school.id)) selected.delete(school.id);
            else if (selected.size < 3) selected.add(school.id);
            else { button.textContent = "Up to 3"; return; }
            render();
            if (selected.size >= 2) {
                const selectedSchools = [...selected].map(id => byId.get(id));
                const rows = [["School", item => item.name], ["Location", item => `${item.city}, ${item.state}`], ["Board", item => item.board], ["Day / boarding", item => item.status], ["Category", item => item.schoolType]];
                root.querySelector("#sd-compare-table").innerHTML = rows.map(([label, getValue]) => `<tr><th>${escapeHtml(label)}</th>${selectedSchools.map(item => `<td>${escapeHtml(getValue(item))}</td>`).join("")}</tr>`).join("");
                root.querySelector("#sd-compare-dialog").showModal();
            }
        }
    });

    root.querySelector("#sd-enquiry-form").addEventListener("submit", async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector("[type=submit]");
        const feedback = root.querySelector("#sd-enquiry-feedback");
        const data = Object.fromEntries(new FormData(form));
        data.consent = data.consent === "true";
        button.disabled = true; feedback.textContent = "Sending your enquiry…"; feedback.classList.remove("is-error");
        try {
            const response = await submitSchoolEnquiry(data);
            feedback.textContent = response.message || "Your enquiry has been sent to the school.";
            form.reset();
        } catch (error) {
            feedback.textContent = error.message || "We could not submit this enquiry. Please try again.";
            feedback.classList.add("is-error");
        } finally { button.disabled = false; }
    });
}
