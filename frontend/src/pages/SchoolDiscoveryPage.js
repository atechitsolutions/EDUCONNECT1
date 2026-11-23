import { getRegionalSchoolListings, regionalSchoolNames } from "../components/home/regionalSchools.js";
import { getBoardingSchoolListings } from "../components/home/boardingSchoolDirectory.js";
import { preSchoolListings } from "../components/home/PreSchoolSection.js";
import { playSchoolListings } from "../components/home/PlaySchoolSection.js";
import { submitSchoolEnquiry } from "../services/schoolService.js";

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const coreSchoolListings = getRegionalSchoolListings().map(record => ({ ...record, isCoreSchool: true }));
const normalizeName = value => String(value || "").toLowerCase().replace(/\bthe\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
const listings = [...coreSchoolListings];
getBoardingSchoolListings().forEach(record => {
    const key = `${normalizeName(record.name)}|${normalizeName(record.city)}`;
    const existing = listings.find(item => `${normalizeName(item.name)}|${normalizeName(item.city)}` === key
        || (record.canonicalName && normalizeName(item.name) === normalizeName(record.canonicalName)));
    if (existing) {
        existing.isBoardingDirectoryListing = true;
        existing.schoolTypeGroup = "boarding";
        record.regions.forEach(region => {
            if (!existing.regions.includes(region)) existing.regions.push(region);
            existing.ranks[region] = record.ranks[region];
        });
    } else listings.push(record);
});
const earlySchoolListings = [
    ...preSchoolListings.map(record => ({ ...record, schoolTypeGroup: "preschool" })),
    ...playSchoolListings.map(record => ({ ...record, schoolTypeGroup: "playschool" }))
].map((record, index) => {
    const verifiedEarlyDetails = {
        "Happy Kids Pre School": {
            location: "House 10, Pocket 9, Sector 21, Rohini, Delhi 110086",
            description: "A Happy Kids play-school and daycare is listed at House 10, Pocket 9, Sector 21, Rohini. The directory identifies preschool and daycare services. Curriculum, age groups, board and campus photographs are not published in the source listing.",
            detailsSource: "https://magicpin.in/New-Delhi/Sector-21/Education/Happy-Kids-Play-School-And-Day-Care/store/1b34905"
        },
        "Little Angels Pre School": {
            name: "Little Angels School",
            location: "Pali Pathar, Bandra West, Mumbai 400050",
            program: "Pre-primary and special-education programmes",
            board: "NIOS for senior academic programme; pre-primary",
            schoolType: "Pre-primary & special education",
            description: "Little Angels School in Bandra West is operated by the Human Development Centre Trust and serves learners with disabilities. Its official site describes pre-primary provision, individualized programmes and trained specialist staff. The school publishes NIOS information for its senior academic programme.",
            image: "https://littleangelsschool.biz/wp-content/uploads/2026/07/EG5A4460-1-768x512.jpg",
            photoSource: "https://littleangelsschool.biz/",
            detailsSource: "https://littleangelsschool.biz/"
        },
        "Sunshine Pre School": {
            name: "ARK's Sunshine Preschool and Daycare",
            location: "#863, 5th A Cross, 5th Main, Indiranagar 1st Stage, Bengaluru 560038",
            program: "Pre-school, Pre-KG and Junior KG; daycare",
            schoolType: "Pre-primary & daycare",
            description: "ARK's Sunshine Pre-Primary School is listed at Indiranagar 1st Stage, Bengaluru. Its listing describes preschool, kindergarten, Pre-KG, Junior KG and daycare services. Age ranges, current hours, curriculum and board should be confirmed directly with the centre.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zl6qEA46gcZ_biqlCQxagMFLgyYKCuqRykq1GEWSoCnC17XmhQ",
            photoSource: "https://www.findlocales.com/bangalore/bcontacts/all/details/4480/ark-s-sunshine-pre-primary-school.html",
            detailsSource: "https://www.proeves.com/karnataka/bangalore/indiranagar/creche-indiranagar/ark-s-sunshine-preschool-and-daycare-8534"
        },
        "Smart Kids Pre School": {
            name: "Smart Kids Day Care And Play School",
            location: "H.No. 1588, Housing Board Colony Road, Sector 10A, Gurugram 122001",
            program: "Preschool and daycare",
            description: "A Smart Kids Day Care and Play School is listed in Sector 10A, Gurugram. The directory lists preschool and daycare services, with preschool hours reported as 9:00 am–12:30 pm and daycare hours as 9:00 am–7:00 pm. Contact the centre to confirm current schedules and programme details.",
            detailsSource: "https://www.proeves.com/haryana/gurgaon/sector-10/creche-sector-10/smart-kids-day-care-and-play-school-7512"
        },
        "Little Stars Play School": {
            location: "Plot No. 32, Sector 3, near Karuna Kunj, Dwarka, New Delhi",
            program: "Play school; a directory reports ages 2–6, English instruction and daycare",
            description: "An education-directory listing for Little Star Play School (singular in the source) gives this Sector 3, Dwarka address. It reports English instruction, daycare, ages 2–6 and a 10:1 student–teacher ratio. The centre’s identity and current details should be confirmed directly; the directory does not provide a usable campus photograph.",
            detailsSource: "https://www.edustoke.com/delhi/little-star-play-school-teacher-colony-mehrauli-plot"
        },
        "Rainbow Pre School": {
            name: "Rainbow Kids School",
            location: "C-50 Priyadarshi Marg, Tilak Nagar, Jaipur, Rajasthan 302004",
            program: "Pre-primary (Nursery–UKG)",
            schoolType: "School with pre-primary section",
            description: "Rainbow Kids School is an English-medium co-educational school at C-50 Priyadarshi Marg, Tilak Nagar, Jaipur. Its official site describes a pre-primary section from Nursery to UKG, with play- and activity-based learning. The school also offers primary, middle and secondary sections.",
            image: "https://esstoragesv2.blob.core.windows.net/esstoragesv2/112471_e1ad.jpg",
            photoSource: "https://rksjpr.educationstack.com/",
            detailsSource: "https://www.rainbowkidsschooljaipur.com/"
        }
    }[record.name] || {};
    const location = verifiedEarlyDetails.location || record.location || "Location not verified";
    const locationLower = location.toLowerCase();
    const inferredRegion = locationLower.includes("jaipur") || locationLower.includes("rajasthan") ? "Rajasthan"
        : locationLower.includes("new delhi") || locationLower.includes("delhi") ? "Delhi"
        : locationLower.includes("gurugram") || locationLower.includes("gurgaon") ? "Nearby NCR options" : "";
    const city = verifiedEarlyDetails.location || record.city || location;
    const state = record.state || (inferredRegion === "Nearby NCR options" ? "Haryana" : inferredRegion || "India");
    const region = record.state || inferredRegion;
    const fallback = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect width="1200" height="600" fill="#e8f3ff"/><text x="600" y="310" text-anchor="middle" fill="#49627e" font-family="Arial" font-size="34">Campus photo unavailable</text></svg>`)}`;
    const image = verifiedEarlyDetails.image || record.image || fallback;
    const imageLabel = verifiedEarlyDetails.image
        ? verifiedEarlyDetails.photoSource ? "Photo from linked school listing" : "Representative photo - not verified as this school's campus"
        : record.imageLabel || (record.image ? "Representative photo - not this institution's campus" : "");
    return {
        id: `early|${record.schoolTypeGroup}|${index}|${normalizeName(record.name)}`,
        name: verifiedEarlyDetails.name || record.name,
        sourceName: record.name,
        city,
        state,
        region,
        regions: region && region !== "Nearby NCR options" ? [region] : [],
        rank: Number(record.rank) || index + 1,
        ranks: {},
        board: verifiedEarlyDetails.board || "Not verified",
        status: record.schoolTypeGroup === "preschool" ? "Preschool listing" : "Play school listing",
        schoolType: verifiedEarlyDetails.schoolType || record.category || (record.schoolTypeGroup === "preschool" ? "Preschool" : "Play school"),
        schoolTypeGroup: record.schoolTypeGroup,
        program: verifiedEarlyDetails.program || record.program || "Not verified",
        description: verifiedEarlyDetails.description || [record.overview || record.highlight || record.note, record.rankingNote].filter(Boolean).join(" "),
        image,
        imageFallback: fallback,
        imageAvailable: Boolean(verifiedEarlyDetails.image || record.image),
        imageLabel,
        imageAttribution: record.imageAttribution || "",
        imageLicense: record.imageLicense || "",
        photoSource: verifiedEarlyDetails.photoSource || record.imageSource || "",
        officialWebsite: verifiedEarlyDetails.officialWebsite || "",
        detailsSource: verifiedEarlyDetails.detailsSource || ""
    };
});
listings.push(...earlySchoolListings);
const regions = [...new Set([
    ...Object.keys(regionalSchoolNames),
    ...earlySchoolListings.map(record => record.region).filter(region => region && region !== "Nearby NCR options")
])];
const filters = [
    ["all", "All Schools"], ["day", "Day Schools"], ["boarding", "Boarding Schools"],
    ["boys", "Boys Schools"], ["girls", "Girls Schools"], ["coed", "Co-educational Schools"],
    ["CBSE", "CBSE"], ["ICSE", "ICSE"], ["IB", "IB"], ["IGCSE", "IGCSE"], ["State Board", "State Board"]
];
const schoolGroups = [
    ["all", "All Schools"], ["regular", "Regular Schools"], ["boarding", "Boarding Schools"],
    ["preschool", "Preschools"], ["playschool", "Play Schools"]
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

function matchesSchoolGroup(record, group) {
    if (group === "all") return true;
    if (group === "regular") return Boolean(record.isCoreSchool);
    const status = `${record.status} ${record.description}`.toLowerCase();
    if (group === "boarding") {
        // Only include an explicit boarding-directory entry or a school whose
        // own verified record confirms boarding. Directory copy can mention
        // boarding as a caveat, so it must not qualify an ordinary school.
        const explicitlyListed = Boolean(record.isBoardingDirectoryListing);
        const verifiedBoarding = Boolean(record.isCoreSchool)
            && /(boarding|residential)/.test(String(record.status || "").toLowerCase())
            && !/not verified|not stated|check school website|confirm current/.test(String(record.status || "").toLowerCase());
        return explicitlyListed || verifiedBoarding;
    }
    if (group === "preschool") return record.schoolTypeGroup === "preschool";
    if (group === "playschool") return record.schoolTypeGroup === "playschool";
    return true;
}

function schoolCard(record) {
    return `<article class="sd-school-card" data-school-id="${escapeHtml(record.id)}">
        <div class="sd-card-image-wrap">
            <img class="sd-card-image" src="${escapeHtml(record.image)}" alt="${escapeHtml(record.imageLabel || (record.imageAvailable ? `${record.name} photo` : `${record.name} campus photo unavailable`))}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(record.imageFallback)}'">
            ${record.imageLabel ? `<span class="sd-card-image-label">${escapeHtml(record.imageLabel)}</span>` : ""}
            ${record.photoSource ? `<a class="sd-card-image-credit" href="${escapeHtml(record.photoSource)}" target="_blank" rel="noopener noreferrer">Photo: ${escapeHtml(record.imageAttribution || "Source")} · ${escapeHtml(record.imageLicense || "License details")}</a>` : ""}
            <div class="sd-card-image-shade"></div>
            <div class="sd-card-heading"><h3>${escapeHtml(record.name)}</h3><p>⌖ ${escapeHtml(record.city)}, ${escapeHtml(record.state)}</p></div>
        </div>
        <div class="sd-card-content">
            <div class="sd-fact-row"><span class="sd-fact-label">Board</span><strong>${escapeHtml(record.board === "Not verified" ? "Not verified" : record.board)}</strong></div>
            <p class="sd-card-description">${escapeHtml(record.description)}</p>
            <div class="sd-card-actions">
                <button class="sd-button sd-button-primary" type="button" data-school-action="details">Explore School</button>
                <button class="sd-button" type="button" data-school-action="enquire">Enquire</button>
                <button class="sd-button sd-compare-button" type="button" data-school-action="compare" aria-pressed="false">Compare</button>
            </div>
        </div>
    </article>`;
}

function renderSchoolComparison(root, schools) {
    const rows = [["Location", item => `${item.city}, ${item.state}`], ["Board", item => item.board], ["Day / boarding", item => item.status], ["Category", item => item.schoolType], ["Overview", item => item.description]];
    const headings = `<tr><th scope="row">School</th>${schools.map(item => `<th scope="col"><strong>${escapeHtml(item.name)}</strong><button type="button" class="sd-compare-remove" data-remove-school="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.name)} from comparison">Remove</button></th>`).join("")}</tr>`;
    root.querySelector("#sd-compare-table").innerHTML = headings + rows.map(([label, getValue]) => `<tr><th scope="row">${escapeHtml(label)}</th>${schools.map(item => `<td>${escapeHtml(getValue(item))}</td>`).join("")}</tr>`).join("");
}

export function SchoolDiscoveryPage() {
    const options = regions.map(region => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`).join("");
    const filterButtons = filters.map(([value, label], index) => `<button type="button" class="sd-filter-chip${index === 0 ? " is-active" : ""}" data-school-filter="${escapeHtml(value)}" aria-pressed="${index === 0}">${escapeHtml(index === 0 ? "All Types" : label)}</button>`).join("");
    const schoolGroupOptions = schoolGroups.map(([value, label]) => {
        const count = listings.filter(record => matchesSchoolGroup(record, value)).length;
        return `<option value="${escapeHtml(value)}">${escapeHtml(label)} (${count})</option>`;
    }).join("");
    return `<main id="schools-discovery" class="sd-page">
        <div class="sd-container">
            <header class="sd-page-heading"><div><span class="sd-eyebrow">SCHOOL DIRECTORY</span><h1>Top Schools in India</h1><p>Browse schools by region and compare the details we can verify.</p></div><span class="sd-directory-badge">${listings.length} listings</span></header>
            <section class="sd-search-panel" aria-label="Search schools by region">
                <div class="sd-search-fields"><label class="sd-select-field"><span>Region</span><select id="sd-region"><option value="">All India</option>${options}</select></label><label class="sd-category-field"><span>School category</span><select id="sd-school-group">${schoolGroupOptions}</select></label><label class="sd-query-field"><span>School or city</span><input id="sd-query" type="search" placeholder="Search school or city" autocomplete="off"></label><button id="sd-search-button" class="sd-button sd-button-primary" type="button">Search</button></div>
                <div class="sd-results-summary" aria-live="polite"><strong id="sd-selected-region">All India</strong><span><b id="sd-result-count">${listings.length}</b> schools</span><span>Rankings are approximate editorial listings.</span></div>
            </section>
            <section class="sd-directory" aria-label="School directory">
                <div class="sd-directory-toolbar"><div><span class="sd-eyebrow">DISCOVER</span><h2>Find your school</h2></div><button id="sd-clear-filters" class="sd-clear-button" type="button">Clear filters</button></div>
                <div class="sd-extra-school-filters" role="group" aria-label="More school filters"><span class="sd-filter-heading">More filters</span>
                <div class="sd-filter-list" role="group" aria-label="Filter schools">${filterButtons}</div>
                </div>
                <div id="sd-school-grid" class="sd-school-grid">${listings.map((record, index) => schoolCard(record, index, "")).join("")}</div>
                <div id="sd-empty-state" class="sd-empty-state" hidden><strong id="sd-empty-title">No schools match these filters.</strong><span id="sd-empty-description">Try clearing a filter or choosing another region.</span></div>
            </section>
        </div>
        <dialog class="sd-dialog" id="sd-details-dialog" aria-labelledby="sd-details-title"><div class="sd-dialog-header"><span class="sd-eyebrow">SCHOOL DETAILS</span><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div><div id="sd-details-content"></div></dialog>
        <dialog class="sd-dialog sd-enquiry-dialog" id="sd-enquiry-dialog" aria-labelledby="sd-enquiry-title"><div class="sd-dialog-header"><div><span class="sd-eyebrow">SCHOOL ENQUIRY</span><h2 id="sd-enquiry-title">Enquire with this school</h2><p id="sd-enquiry-school"></p></div><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div>
            <form id="sd-enquiry-form"><input type="hidden" name="schoolId"><input type="hidden" name="schoolName"><input type="hidden" name="city"><label>Student or parent name<input name="name" maxlength="120" autocomplete="name" required></label><div class="sd-form-row"><label>Email<input name="email" type="email" maxlength="180" autocomplete="email" required></label><label>Phone number<input name="phone" type="tel" maxlength="40" autocomplete="tel" required></label></div><label>Class / grade of interest<input name="grade" maxlength="60" placeholder="e.g. Class 8" required></label><label>Message <small>(optional)</small><textarea name="message" maxlength="2000" rows="3" placeholder="What would you like to know?"></textarea></label><label class="sd-consent"><input type="checkbox" name="consent" value="true" required><span>I agree to share these details with the selected school so it can respond to this enquiry.</span></label><button class="sd-button sd-button-primary" type="submit">Submit enquiry</button><p id="sd-enquiry-feedback" role="status" aria-live="polite"></p></form>
        </dialog>
        <dialog class="sd-dialog sd-compare-dialog" id="sd-compare-dialog" aria-labelledby="sd-compare-title"><div class="sd-dialog-header"><div><span class="sd-eyebrow">SIDE-BY-SIDE</span><h2 id="sd-compare-title">Compare schools</h2></div><button type="button" class="sd-compare-clear" data-clear-schools>Clear comparison</button><button type="button" class="sd-dialog-close" data-close-dialog aria-label="Close">×</button></div><div class="sd-compare-table-wrap"><table class="sd-compare-table"><tbody id="sd-compare-table"></tbody></table></div></dialog>
    </main>`;
}

export function initSchoolDiscoveryPage() {
    const root = document.querySelector("#schools-discovery");
    if (!root) return;
    const regionSelect = root.querySelector("#sd-region");
    const schoolGroupSelect = root.querySelector("#sd-school-group");
    const queryInput = root.querySelector("#sd-query");
    const grid = root.querySelector("#sd-school-grid");
    const resultCount = root.querySelector("#sd-result-count");
    const selectedRegion = root.querySelector("#sd-selected-region");
    const empty = root.querySelector("#sd-empty-state");
    const emptyTitle = root.querySelector("#sd-empty-title");
    const emptyDescription = root.querySelector("#sd-empty-description");
    let activeRegion = "";
    let activeFilter = "all";
    let activeSchoolGroup = "all";
    const searchParams = new URLSearchParams(location.search);
    const requestedCategory = searchParams.get("category");
    if (["all", "regular", "boarding", "preschool", "playschool"].includes(requestedCategory)) {
        activeSchoolGroup = requestedCategory;
        schoolGroupSelect.value = requestedCategory;
    }
    const initialSchoolQuery = searchParams.get("q");
    if (initialSchoolQuery) queryInput.value = initialSchoolQuery;
    let selected = new Set();
    const byId = new Map(listings.map(record => [record.id, record]));

    const render = () => {
        const query = queryInput.value.trim().toLocaleLowerCase();
        const regionRecords = activeRegion
            ? listings.filter(record => record.regions?.includes(activeRegion))
            : listings;
        const matching = regionRecords.filter(record => matchesSchoolGroup(record, activeSchoolGroup) && matches(record, activeFilter) && `${record.name} ${record.city} ${record.state}`.toLocaleLowerCase().includes(query));
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
        const groupLabel = schoolGroups.find(([value]) => value === activeSchoolGroup)?.[1];
        if (!matching.length && activeSchoolGroup !== "all" && !regionRecords.some(record => matchesSchoolGroup(record, activeSchoolGroup))) {
            emptyTitle.textContent = `No ${groupLabel?.toLowerCase()} are currently listed for this region.`;
            emptyDescription.textContent = "Choose another school category or region to browse available listings.";
        } else {
            emptyTitle.textContent = "No schools match these filters.";
            emptyDescription.textContent = "Try clearing a filter or choosing another region.";
        }
    };

    root.querySelector("#sd-search-button").addEventListener("click", () => { activeRegion = regionSelect.value; render(); });
    regionSelect.addEventListener("change", () => { activeRegion = regionSelect.value; render(); });
    queryInput.addEventListener("input", render);
    schoolGroupSelect.addEventListener("change", () => {
        activeSchoolGroup = schoolGroupSelect.value;
        render();
    });
    if (initialSchoolQuery || requestedCategory) render();
    root.querySelector(".sd-extra-school-filters .sd-filter-list").addEventListener("click", event => {
        const button = event.target.closest("[data-school-filter]");
        if (!button) return;
        activeFilter = button.dataset.schoolFilter;
        root.querySelectorAll("[data-school-filter]").forEach(item => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
        render();
    });
    root.querySelector("#sd-clear-filters").addEventListener("click", () => {
        activeFilter = "all"; activeSchoolGroup = "all"; activeRegion = ""; regionSelect.value = ""; schoolGroupSelect.value = "all"; queryInput.value = "";
        root.querySelectorAll("[data-school-filter]").forEach(item => { const active = item.dataset.schoolFilter === "all"; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
        render();
    });

    const detailsDialog = root.querySelector("#sd-details-dialog");
    const enquiryDialog = root.querySelector("#sd-enquiry-dialog");
    const openSchoolEnquiry = school => {
        const form = root.querySelector("#sd-enquiry-form");
        form.reset();
        form.querySelector("[type=submit]").disabled = false;
        form.querySelector("[type=submit]").textContent = "Submit enquiry";
        form.elements.schoolId.value = school.id;
        form.elements.schoolName.value = school.name;
        form.elements.city.value = school.city;
        form.elements.grade.placeholder = school.schoolTypeGroup
            ? "e.g. Playgroup, Nursery or LKG"
            : "e.g. Class 8";
        root.querySelector("#sd-enquiry-school").textContent = `${school.name} · ${school.city}, ${school.state}`;
        root.querySelector("#sd-enquiry-feedback").textContent = "";
        enquiryDialog.showModal();
    };
    root.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    [detailsDialog, enquiryDialog, root.querySelector("#sd-compare-dialog")].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));

    grid.addEventListener("click", event => {
        const button = event.target.closest("[data-school-action]");
        if (!button) return;
        const card = button.closest("[data-school-id]");
        const school = byId.get(card?.dataset.schoolId);
        if (!school) return;
        if (button.dataset.schoolAction === "enquire") {
            openSchoolEnquiry(school);
        }
        if (button.dataset.schoolAction === "details") {
            root.querySelector("#sd-details-content").innerHTML = `<img class="sd-details-image" src="${escapeHtml(school.image)}" alt="${escapeHtml(school.imageAvailable ? `${school.name} campus` : "School-matched campus photo unavailable")}" onerror="this.onerror=null;this.src='${escapeHtml(school.imageFallback)}'"><h2 id="sd-details-title">${escapeHtml(school.name)}</h2><p class="sd-details-location">${escapeHtml(school.city)}, ${escapeHtml(school.state)}</p><dl class="sd-detail-facts"><div><dt>Board</dt><dd>${escapeHtml(school.board)}</dd></div><div><dt>Day / boarding</dt><dd>${escapeHtml(school.status)}</dd></div><div><dt>School category</dt><dd>${escapeHtml(school.schoolType)}</dd></div></dl><p>${escapeHtml(school.description)}</p>${school.photoSource ? `<p><a class="sd-photo-source" href="${escapeHtml(school.photoSource)}" target="_blank" rel="noopener noreferrer">View campus photo source</a></p>` : `<p class="sd-photo-source sd-photo-missing">No verified campus photo source is available for this listing.</p>`}${school.detailsSource ? `<p><a class="sd-photo-source" href="${escapeHtml(school.detailsSource)}" target="_blank" rel="noopener noreferrer">View school details source</a></p>` : `<p class="sd-photo-source sd-photo-missing">School details have not been independently verified.</p>`}<p class="sd-editorial-note">Approximate editorial listing; not an official ranking. Unverified information is labelled and should be confirmed with the school.</p><div class="sd-card-actions"><button type="button" class="sd-button sd-button-primary" id="sd-details-enquire">Enquire with this school</button></div>`;
            const detailsImage = root.querySelector("#sd-details-content .sd-details-image");
            detailsImage.alt = school.imageLabel || (school.imageAvailable ? `${school.name} photo` : "School-matched campus photo unavailable");
            if (school.imageLabel || school.imageAttribution || school.imageLicense) {
                const credit = document.createElement("p");
                credit.className = "sd-photo-source";
                credit.textContent = [school.imageLabel, school.imageAttribution && `Photo: ${school.imageAttribution}`, school.imageLicense].filter(Boolean).join(" · ");
                detailsImage.after(credit);
            }
            if (school.photoSource) root.querySelector("#sd-details-content a").textContent = "View photo source";
            root.querySelector("#sd-details-enquire").addEventListener("click", () => { detailsDialog.close(); openSchoolEnquiry(school); });
            detailsDialog.showModal();
        }
        if (button.dataset.schoolAction === "compare") {
            if (selected.has(school.id)) selected.delete(school.id);
            else if (selected.size < 3) selected.add(school.id);
            else { button.textContent = "Up to 3"; return; }
            render();
            if (selected.size >= 2) {
                const selectedSchools = [...selected].map(id => byId.get(id));
                renderSchoolComparison(root, selectedSchools);
                root.querySelector("#sd-compare-dialog").showModal();
            }
        }
    });

    root.querySelector("#sd-compare-dialog").addEventListener("click", event => {
        const remove = event.target.closest("[data-remove-school]");
        if (remove) {
            selected.delete(remove.dataset.removeSchool);
            render();
            if (selected.size < 2) root.querySelector("#sd-compare-dialog").close();
            else renderSchoolComparison(root, [...selected].map(id => byId.get(id)).filter(Boolean));
        }
        if (event.target.closest("[data-clear-schools]")) {
            selected.clear(); render(); root.querySelector("#sd-compare-dialog").close();
        }
    });

    root.querySelector("#sd-enquiry-form").addEventListener("submit", async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector("[type=submit]");
        const feedback = root.querySelector("#sd-enquiry-feedback");
        const data = Object.fromEntries(new FormData(form));
        data.consent = data.consent === "true";
        let submitted = false;
        button.disabled = true; feedback.textContent = "Sending your enquiry…"; feedback.classList.remove("is-error");
        try {
            const response = await submitSchoolEnquiry(data);
            feedback.textContent = response.message || "Your enquiry has been sent to the school.";
            form.reset();
            submitted = true; button.textContent = "Enquiry sent";
        } catch (error) {
            feedback.textContent = error.message || "We could not submit this enquiry. Please try again.";
            feedback.classList.add("is-error");
        } finally { button.disabled = submitted; }
    });

    render();
    const requestedEnquiry = searchParams.get("enquire") === "1";
    const requestedSchoolName = normalizeName(searchParams.get("institution") || initialSchoolQuery);
    if (requestedEnquiry && requestedSchoolName) {
        const requestedLocation = normalizeName((searchParams.get("location") || "").split(",")[0]);
        const candidates = listings.filter(record =>
            [record.name, record.sourceName].some(name => {
                const normalizedRecordName = normalizeName(name);
                return normalizedRecordName === requestedSchoolName
                    || normalizedRecordName.includes(requestedSchoolName)
                    || requestedSchoolName.includes(normalizedRecordName);
            })
        );
        const requestedSchool = candidates.find(record => !requestedLocation
            || normalizeName(`${record.name} ${record.city} ${record.state}`).includes(requestedLocation))
            || candidates.find(record => normalizeName(`${record.city} ${record.state}`).includes(requestedLocation))
            || candidates[0];
        if (requestedSchool) openSchoolEnquiry(requestedSchool);
    }
}
