function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function displayValue(value) {
    return value == null || String(value).trim() === "" ? "" : String(value).trim();
}

function field(label, value, className = "") {
    const content = displayValue(value);
    if (!content) return "";
    return `
        <div class="study-abroad-details-field ${className}">
            <strong>${escapeHtml(label)}</strong>
            <span>${escapeHtml(content)}</span>
        </div>
    `;
}

function listField(label, value) {
    const items = String(value ?? "")
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean);
    if (!items.length) return "";
    return `
        <section class="study-abroad-details-section">
            <h3>${escapeHtml(label)}</h3>
            <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
    `;
}

function section(title, content) {
    if (!content.trim()) return "";
    return `
        <section class="study-abroad-details-section">
            <h3>${escapeHtml(title)}</h3>
            ${content}
        </section>
    `;
}

function slug(value) {
    return String(value || "institution")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function createModalMarkup(institution) {
    const location = [institution.city, institution.state, institution.country]
        .filter(Boolean)
        .filter((value, index, values) => values.indexOf(value) === index)
        .join(", ");
    const image = displayValue(institution.coverImageUrl);
    const website = displayValue(institution.website);
    const imageSource = displayValue(institution.imageSourceUrl);
    const licenseUrl = displayValue(institution.imageLicenseUrl);
    const imageName = `${slug(institution.name)}-campus${image.match(/\.(jpg|jpeg|png|webp)(?:$|\?)/i)?.[0]?.replace(/\?.*$/, "") || ".jpg"}`;

    const overview = [
        field("Institution type", institution.type),
        field("Established", institution.established),
        field("Country", institution.country),
        field("City", institution.city),
        field("State / region", institution.state),
        website
            ? `<div class="study-abroad-details-field"><strong>Official website</strong><a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">Visit institution website ↗</a></div>`
            : ""
    ].join("");

    const academic = [
        listField("Popular courses in the supplied directory", institution.popularCourses),
        field("Directory ranking examples", institution.rankings)
    ].join("");
    const admissions = [
        field("Typical intakes", institution.intakes),
        field("English test examples", institution.englishTests)
    ].join("");
    const costs = [
        field("Tuition range listed", institution.tuition),
        field("Estimated living costs", institution.livingCost)
    ].join("");
    const scholarships = listField("Scholarships listed", institution.scholarships);
    const imageCredit = image
        ? `
            <div class="study-abroad-details-image-credit">
                <span>Photo: ${escapeHtml(institution.imageAttribution || "Wikimedia Commons contributor")}</span>
                ${institution.imageLicense
                    ? `<span>License: ${escapeHtml(institution.imageLicense)}${licenseUrl ? ` · <a href="${escapeHtml(licenseUrl)}" target="_blank" rel="noopener noreferrer">license terms</a>` : ""}</span>`
                    : ""}
                ${imageSource ? `<a href="${escapeHtml(imageSource)}" target="_blank" rel="noopener noreferrer">Photo source ↗</a>` : ""}
            </div>
        `
        : `<div class="study-abroad-details-image-placeholder"><span>Campus photo not verified yet</span></div>`;

    return `
        <div class="study-abroad-details-overlay" data-study-abroad-details-overlay aria-hidden="false">
            <div class="study-abroad-details-backdrop" data-study-abroad-details-close></div>
            <article class="study-abroad-details-modal" role="dialog" aria-modal="true" aria-labelledby="study-abroad-details-title">
                <button type="button" class="study-abroad-details-close" data-study-abroad-details-close aria-label="Close institution details">×</button>
                ${image ? `<div class="study-abroad-details-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(institution.name)} campus" loading="lazy">${imageCredit}</div>` : imageCredit}
                <div class="study-abroad-details-body">
                    <span class="study-abroad-details-type">${escapeHtml(institution.type || "Institution")}</span>
                    <h2 id="study-abroad-details-title">${escapeHtml(institution.name || "Institution")}</h2>
                    ${location ? `<p class="study-abroad-details-location">📍 ${escapeHtml(location)}</p>` : ""}
                    ${institution.description ? `<p class="study-abroad-details-description">${escapeHtml(institution.description)}</p>` : ""}
                    ${section("Overview", overview)}
                    ${section("Academics", academic)}
                    ${section("Admissions", admissions)}
                    ${section("Costs", costs)}
                    ${section("Scholarships", scholarships)}
                    ${institution.postStudyWork ? section("Post-study work (country guidance)", field("Directory note", institution.postStudyWork)) : ""}
                    <aside class="study-abroad-details-data-note">
                        <strong>About these figures</strong>
                        <p>${escapeHtml(institution.dataNote || "Directory tuition, ranking and scholarship figures are unverified examples. Confirm current details with the institution and relevant official authorities.")}</p>
                        ${institution.directoryCode ? `<span>Directory record: ${escapeHtml(institution.directoryCode)} · Not independently verified</span>` : ""}
                    </aside>
                    <div class="study-abroad-details-actions">
                        ${image ? `<a class="study-abroad-details-button" href="${escapeHtml(image)}" download="${escapeHtml(imageName)}">Download Image ↓</a>` : ""}
                        ${website ? `<a class="study-abroad-details-button secondary" href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">Visit Website ↗</a>` : ""}
                        <button type="button" class="study-abroad-details-button secondary" data-study-abroad-details-close>Close</button>
                    </div>
                </div>
            </article>
        </div>
    `;
}

export function openInstitutionDetails(institution) {
    closeInstitutionDetails();
    document.body.insertAdjacentHTML("beforeend", createModalMarkup(institution));
    const overlay = document.querySelector("[data-study-abroad-details-overlay]");
    if (!overlay) return;
    overlay.querySelectorAll("[data-study-abroad-details-close]").forEach((element) => {
        element.addEventListener("click", closeInstitutionDetails);
    });
    document.body.classList.add("study-abroad-details-open");
    overlay.querySelector(".study-abroad-details-close")?.focus();
}

export function closeInstitutionDetails() {
    const overlay = document.querySelector("[data-study-abroad-details-overlay]");
    if (overlay) overlay.remove();
    document.body.classList.remove("study-abroad-details-open");
}

export function bindInstitutionDetailButtons(container, institutionMap) {
    if (!container || container.dataset.detailsBound === "true") return;
    container.dataset.detailsBound = "true";
    container.addEventListener("click", (event) => {
        const button = event.target.closest(".institution-card-action[data-action='details']");
        if (!button || !container.contains(button)) return;
        const card = button.closest(".institution-card");
        const id = card?.dataset.institutionId;
        if (!id) return;
        const institution = institutionMap.get(String(id));
        if (!institution) return;
        event.preventDefault();
        openInstitutionDetails(institution);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeInstitutionDetails();
    });
}
