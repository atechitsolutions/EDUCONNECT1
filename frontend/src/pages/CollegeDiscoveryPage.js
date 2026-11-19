import { API_BASE_URL } from "../config/api.js";
import siteData from "../data/domestic-institution-site-data.json";
import photoData from "../data/domestic-college-campus-photos.json";
import photoSourceData from "../data/domestic-college-photo-sources.json";
import { submitCollegeEnquiry } from "../services/collegePartnerService.js";

const api = `${API_BASE_URL}/api/institution/domestic`;
const esc = (v = "") => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const validWebsite = value => {
    if (!value) return "";
    const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try { const url = new URL(candidate); return /\.[a-z]{2,}$/i.test(url.hostname) ? url.href : ""; } catch { return ""; }
};
const validOfficialDomain = value => {
    if (!value) return "";
    const raw = String(value).trim();
    if (/^https?:\/\//i.test(raw)) {
        try { const parsed = new URL(raw); if (parsed.pathname !== "/" || parsed.search || parsed.hash) return ""; } catch { return ""; }
    }
    return validWebsite(raw);
};
const usableCampusPhoto = value => value && !/(?:blank\.gif|placeholder|no[-_]?image|facebook\.com\/tr|campus[-_]?placement|accreditation|blog\.png|\/logo\.?|logo[-_])/i.test(value) ? String(value).replaceAll("&amp;", "&") : "";
const isPhysicalInstitution = item => !/(?:-SERVICE-|-ONLINE-|-NEEDS-)/i.test(String(item.directoryCode || ""));
const facts = item => {
    const site = siteData[item.directoryCode] || {};
    const website = validWebsite(item.website) || validOfficialDomain(site.officialDomain);
    const image = usableCampusPhoto(photoData[item.directoryCode]) || usableCampusPhoto(item.coverImageUrl) || usableCampusPhoto(site.campusImage) || "";
    const photoSource = photoSourceData[item.directoryCode]?.sourceUrl || image;
    const photoSourceLabel = photoSourceData[item.directoryCode]?.label || "Open image source";
    return { website, image, photoSource, photoSourceLabel, description: item.description || site.description || "Visit the institution’s official website for current programmes and admissions information." };
};

export function CollegesPage() {
    return `<main class="college-discovery-page college-home-page">
        <section class="college-discovery-hero">
            <div class="college-hero-copy"><span class="college-eyebrow">COLLEGE DISCOVERY</span><h1>Discover India's Leading Colleges &amp; Universities</h1><p>Find the right college for your next step.</p>
                <form class="college-hero-search" data-college-search><span aria-hidden="true">⌕</span><input name="q" type="search" placeholder="Search colleges, universities or courses" aria-label="Search colleges, universities or courses"><button>Explore colleges <span>→</span></button></form>
            </div>
            <div class="college-hero-image" role="img" aria-label="University campus" style="background-image:linear-gradient(180deg,rgba(7,28,56,.04),rgba(7,28,56,.68)),url('${esc(photoData["EC-IN-PG-IIMB"] || "")}')"><span>Find a campus that moves you forward</span></div>
        </section>
        <section class="college-home-listing" aria-labelledby="college-home-ug-title">
            <div class="college-home-listing-heading"><div><span class="college-eyebrow">01 · UNDERGRADUATE</span><h2 id="college-home-ug-title">Explore UG Colleges</h2></div><a href="/colleges/ug">Open UG directory <span>→</span></a></div>
            <div class="college-results-grid college-home-card-grid" data-college-home-ug><p class="college-directory-loading">Loading UG colleges…</p></div>
            <button class="college-home-show-more" type="button" data-show-more="ug" hidden>Show more UG colleges <span>↓</span></button>
        </section>
        <section class="college-home-listing college-home-pg-listing" aria-labelledby="college-home-pg-title">
            <div class="college-home-listing-heading"><div><span class="college-eyebrow">02 · POSTGRADUATE</span><h2 id="college-home-pg-title">Explore PG Colleges</h2></div><a href="/colleges/pg">Open PG directory <span>→</span></a></div>
            <div class="college-results-grid college-home-card-grid" data-college-home-pg><p class="college-directory-loading">Loading PG colleges…</p></div>
            <button class="college-home-show-more" type="button" data-show-more="pg" hidden>Show more PG colleges <span>↓</span></button>
        </section>
    </main>`;
}

export function CollegeDirectoryPage(level = "UG") {
    const title = level === "PG" ? "Postgraduate colleges & universities" : "Undergraduate colleges & universities";
    return `<main class="college-discovery-page college-directory-page" data-college-directory data-level="${level}">
        <section class="college-directory-heading"><a class="college-back-link" href="/colleges">← College discovery</a><div><span class="college-eyebrow">${level === "PG" ? "POSTGRADUATE" : "UNDERGRADUATE"} DIRECTORY</span><h1>${title}</h1><p>Search and compare institutions in the StepInStudents directory.</p></div></section>
        <nav class="college-level-tabs" aria-label="Study level"><a class="${level === "UG" ? "active" : ""}" href="/colleges/ug">UG Colleges</a><a class="${level === "PG" ? "active" : ""}" href="/colleges/pg">PG Colleges</a></nav>
        <section class="college-filter-panel" aria-label="College search and filters"><form data-college-filter-form>
            <label class="college-search-field"><span>Search</span><input name="q" type="search" placeholder="College, university or course"></label>
            <label><span>State</span><select name="state"><option value="">All states</option></select></label>
            <label><span>City</span><select name="city"><option value="">All cities</option></select></label>
            <label><span>Course / stream</span><input name="course" type="search" placeholder="e.g. science, MBA"></label>
            <label><span>Institution type</span><select name="type"><option value="">All types</option><option value="UNIVERSITY">University</option><option value="COLLEGE">College</option><option value="INSTITUTION">Institution</option></select></label>
            <label><span>Ownership</span><select name="ownership"><option value="">All ownership types</option><option value="government">Government</option><option value="private">Private</option></select></label>
            <button class="college-filter-submit" type="submit">Search colleges <span>→</span></button><button class="college-clear-filters" type="reset">Clear filters</button>
        </form><p class="college-filter-note">Ownership and course details are shown only where available in the institution record.</p></section>
        <section class="college-results-section"><div class="college-results-heading"><div><span class="college-eyebrow">STEPINSTUDENTS DIRECTORY</span><h2>Explore institutions</h2></div><p data-college-results-count>Loading directory…</p></div><div class="college-results-grid" data-college-results aria-live="polite"></div><div class="college-pagination" data-college-pagination></div></section>
        <div class="college-compare-dock" data-college-compare hidden></div>
    </main>`;
}

export function CollegeDetailPage(id) {
    return `<main class="college-discovery-page college-detail-page" data-college-detail="${esc(id)}"><div class="college-detail-content"><span class="college-eyebrow">COLLEGE PROFILE</span><h1>Loading institution…</h1></div></main>`;
}

function card(item, index, level) {
    const { website, image, photoSource, photoSourceLabel, description } = facts(item);
    const location = [item.city, item.state].filter(Boolean).join(", ") || "Location not listed";
    const programs = item.popularCourses || "Programme details not listed";
    const imageMarkup = image ? `<img src="${esc(image)}" loading="lazy" alt="${esc(item.name)} campus" onerror="this.remove()">` : "";
    return `<article class="college-directory-card" data-college-id="${esc(item.id)}" data-college-name="${esc(item.name)}" data-college-location="${esc(location)}" data-college-type="${esc(item.type || "Institution")}" data-college-level="${esc(level)}" data-college-programs="${esc(programs)}" data-college-overview="${esc(description)}" data-college-website="${esc(website)}"><div class="college-card-media">${imageMarkup}<span class="college-card-initials">${esc((item.name || "C").split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase())}</span><span class="college-card-location">⌖ ${esc(location)}</span></div><div class="college-card-content"><div class="college-card-meta"><span>${esc(String(item.type || "Institution").toLowerCase())}</span><span>${level}</span></div><h3>${esc(item.name)}</h3><p class="college-card-programs">${esc(programs)}</p><div class="college-card-actions"><button class="college-button college-button-primary" type="button" data-open-college-details>Explore college <span>›</span></button><button class="college-button" type="button" data-open-college-enquiry>Enquiry <span>→</span></button><button class="college-compare-button" type="button" data-compare-id="${esc(item.id)}">Compare <span>＋</span></button></div></div></article>`;
}

function bindDirectory(root) {
    const level = root.dataset.level;
    const grid = root.querySelector("[data-college-results]");
    const form = root.querySelector("[data-college-filter-form]");
    const count = root.querySelector("[data-college-results-count]");
    const pagination = root.querySelector("[data-college-pagination]");
    const dock = root.querySelector("[data-college-compare]");
    let colleges = [];
    let page = 1;
    const pageSize = 12;
    const chosen = new Set();
    const params = () => Object.fromEntries(new FormData(form).entries());
    const updateOptions = () => {
        for (const field of ["state", "city"]) {
            const select = form.elements[field];
            const values = [...new Set(colleges.map(c => c[field]).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
            select.innerHTML = `<option value="">All ${field === "state" ? "states" : "cities"}</option>${values.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join("")}`;
        }
    };
    const apply = () => {
        const f = params();
        const list = colleges.filter(c => {
            if (!isPhysicalInstitution(c)) return false;
            const site = facts(c);
            const hay = [c.name,c.city,c.state,c.type,c.popularCourses,c.description,site.description].join(" ").toLowerCase();
            const code = String(c.directoryCode || "").toUpperCase();
            const matchesLevel = level === "PG" ? code.includes("-PG-") || !code.includes("-UG-") : !code.includes("-PG-");
            const ownerText = `${c.type || ""} ${c.description || ""} ${c.dataNote || ""}`.toLowerCase();
            return matchesLevel && (!f.q || hay.includes(f.q.toLowerCase())) && (!f.state || c.state === f.state) && (!f.city || c.city === f.city) && (!f.course || String(c.popularCourses || "").toLowerCase().includes(f.course.toLowerCase())) && (!f.type || c.type === f.type) && (!f.ownership || ownerText.includes(f.ownership));
        });
        const pages = Math.max(1, Math.ceil(list.length / pageSize)); page = Math.min(page, pages);
        count.textContent = `${list.length} ${list.length === 1 ? "institution" : "institutions"} found`;
        grid.innerHTML = list.slice((page-1)*pageSize,page*pageSize).map(c=>card(c,0,level)).join("") || `<div class="college-empty-state"><span>⌕</span><h3>No institutions match these filters</h3><p>Try clearing a filter or searching with a broader term.</p></div>`;
        pagination.innerHTML = pages > 1 ? `<button data-page="${page-1}" ${page===1?"disabled":""}>← Previous</button><span>Page ${page} of ${pages}</span><button data-page="${page+1}" ${page===pages?"disabled":""}>Next →</button>` : "";
        updateDock();
    };
    const searchParams = new URLSearchParams(location.search);
    const initialQuery = searchParams.get("q"); if(initialQuery) form.elements.q.value=initialQuery;
    form.addEventListener("submit",e=>{e.preventDefault();page=1;apply();});
    form.addEventListener("reset",()=>setTimeout(()=>{page=1;apply();},0));
    root.addEventListener("click",e=>{
        const pager=e.target.closest("[data-page]"); if(pager){page=Number(pager.dataset.page);apply();return;}
        const cmp=e.target.closest("[data-compare-id]");if(cmp){const id=Number(cmp.dataset.compareId);chosen.has(id)?chosen.delete(id):chosen.size<3&&chosen.add(id);apply();return;}
        if(e.target.closest("[data-clear-compare]")){chosen.clear();apply();return;}
        if(e.target.closest("[data-show-compare]")){showCompare(colleges.filter(c=>chosen.has(Number(c.id))));}
    });
    fetch(api).then(r=>{if(!r.ok)throw new Error("The college directory could not be loaded.");return r.json();}).then(data=>{colleges=Array.isArray(data)?data:[];updateOptions();apply();if(searchParams.get("enquire")==="1"&&initialQuery){const target=colleges.find(c=>String(c.name||"").trim().toLocaleLowerCase()===initialQuery.trim().toLocaleLowerCase());const targetCard=target&&[...grid.querySelectorAll("[data-college-id]")].find(node=>Number(node.dataset.collegeId)===Number(target.id));targetCard?.querySelector("[data-open-college-enquiry]")?.click();}}).catch(()=>{count.textContent="Directory unavailable";grid.innerHTML=`<div class="college-empty-state"><h3>We couldn't load the college directory</h3><p>Check your connection and try again.</p><button type="button" data-retry-colleges>Retry</button></div>`;});
    root.addEventListener("click",e=>{if(e.target.closest("[data-retry-colleges]")){grid.innerHTML="";count.textContent="Loading directory…";fetch(api).then(r=>r.json()).then(data=>{colleges=Array.isArray(data)?data:[];updateOptions();apply();}).catch(()=>{count.textContent="Directory unavailable";});}});
    function updateDock(){
        const selected=colleges.filter(c=>chosen.has(Number(c.id)));dock.hidden=!selected.length;
        dock.innerHTML = selected.length
            ? `<span>${selected.length} selected</span><strong>${selected.map(c => esc(c.name)).join(" · ")}</strong><button type="button" data-clear-compare>Clear</button>${selected.length >= 2 ? `<button type="button" data-show-compare>Compare selected</button>` : `<small>Select one more institution to compare.</small>`}`
            : "";
    }
}

function showCompare(items) {
    const modal=document.createElement("div");modal.className="college-compare-modal";modal.innerHTML=`<section role="dialog" aria-modal="true" aria-label="Compare colleges"><button class="college-modal-close" aria-label="Close">×</button><span class="college-eyebrow">SIDE BY SIDE</span><h2>Compare institutions</h2><div class="college-compare-columns">${items.map(c=>`<article><h3>${esc(c.name)}</h3><p>${esc([c.city,c.state].filter(Boolean).join(", ")||"Location not listed")}</p><p>${esc(c.type||"Institution type not listed")}</p><p>${esc(c.popularCourses||"Courses not listed")}</p>${facts(c).website?`<a href="${esc(facts(c).website)}" target="_blank" rel="noopener noreferrer">Official website ↗</a>`:""}</article>`).join("")}</div></section>`;modal.addEventListener("click",e=>{if(e.target===modal||e.target.closest(".college-modal-close"))modal.remove();});document.body.append(modal);
}

function openCollegeDetails(cardElement) {
    const modal = document.createElement("div");
    modal.className = "college-compare-modal college-profile-modal";
    const name = cardElement.dataset.collegeName;
    const image = cardElement.querySelector(".college-card-media img")?.src;
    const website = cardElement.dataset.collegeWebsite;
    modal.innerHTML = `<section role="dialog" aria-modal="true" aria-label="${esc(name)} details"><button class="college-modal-close" type="button" aria-label="Close details">×</button>${image ? `<img class="college-profile-modal-image" src="${esc(image)}" alt="${esc(name)} campus">` : ""}<span class="college-eyebrow">COLLEGE PROFILE</span><h2>${esc(name)}</h2><p class="college-profile-location">${esc(cardElement.dataset.collegeLocation)}</p><dl class="college-profile-facts"><div><dt>Institution</dt><dd>${esc(cardElement.dataset.collegeType)}</dd></div><div><dt>Study level</dt><dd>${esc(cardElement.dataset.collegeLevel)}</dd></div><div><dt>Programmes</dt><dd>${esc(cardElement.dataset.collegePrograms)}</dd></div></dl><section class="college-profile-overview"><h3>Overview</h3><p>${esc(cardElement.dataset.collegeOverview)}</p></section><div class="college-profile-actions">${website ? `<a class="college-button" href="${esc(website)}" target="_blank" rel="noopener noreferrer">Official website ↗</a>` : ""}<button class="college-button college-button-primary" type="button" data-profile-enquiry>Enquiry →</button></div></section>`;
    modal.addEventListener("click", event => { if (event.target === modal || event.target.closest(".college-modal-close")) modal.remove(); });
    modal.querySelector("[data-profile-enquiry]").addEventListener("click", () => { modal.remove(); openCollegeEnquiry(cardElement); });
    document.body.append(modal);
}

function openCollegeEnquiry(cardElement) {
    const modal = document.createElement("div");
    modal.className = "college-compare-modal college-profile-modal";
    modal.innerHTML = `<section role="dialog" aria-modal="true" aria-label="Enquire with ${esc(cardElement.dataset.collegeName)}"><button class="college-modal-close" type="button" aria-label="Close enquiry">×</button><span class="college-eyebrow">STUDENT ENQUIRY</span><h2>Enquire with ${esc(cardElement.dataset.collegeName)}</h2><p class="college-enquiry-intro">Enter your details and the college can respond to your enquiry.</p><form class="college-lead-form" data-college-lead-form><input type="hidden" name="institutionId" value="${esc(cardElement.dataset.collegeId)}"><label>Full name<input name="name" maxlength="120" autocomplete="name" required></label><div class="college-lead-form-row"><label>Email<input name="email" type="email" maxlength="180" autocomplete="email" required></label><label>Phone number<input name="phone" type="tel" maxlength="40" autocomplete="tel" required></label></div><label>Course of interest<input name="course" maxlength="160" placeholder="e.g. Computer Science" required></label><label>Message<textarea name="message" rows="3" maxlength="2000" placeholder="What would you like to know?" required></textarea></label><label class="college-lead-consent"><input name="consent" type="checkbox" value="true" required><span>I agree to share these details and this enquiry with the college so it can respond.</span></label><button class="college-button college-button-primary" type="submit">Submit enquiry</button><p class="college-lead-feedback" role="status" aria-live="polite"></p></form></section>`;
    modal.addEventListener("click", event => { if (event.target === modal || event.target.closest(".college-modal-close")) modal.remove(); });
    modal.querySelector("[data-college-lead-form]").addEventListener("submit", async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const status = form.querySelector(".college-lead-feedback");
        const submit = form.querySelector("[type=submit]");
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.institutionId = Number(data.institutionId);
        data.consent = formData.get("consent") === "true";
        data.contactSharingConsent = false;
        submit.disabled = true;
        status.textContent = "Sending your enquiry…";
        try {
            const result = await submitCollegeEnquiry(data);
            status.textContent = result.message || "Your enquiry has been submitted.";
            form.reset();
        } catch (error) {
            status.textContent = error.message || "We couldn't submit your enquiry. Please try again.";
        } finally {
            submit.disabled = false;
        }
    });
    document.body.append(modal);
    modal.querySelector("input[name=name]").focus();
}

export function initCollegeDiscoveryPage() {
    if (!document.documentElement.dataset.collegeImageFallbackBound) {
        document.documentElement.dataset.collegeImageFallbackBound = "true";
        document.addEventListener("error", event => {
            if (event.target instanceof HTMLImageElement && event.target.matches(".college-card-media img")) event.target.remove();
        }, true);
    }
    const directory=document.querySelector("[data-college-directory]");if(directory)bindDirectory(directory);
    const heroForm=document.querySelector("[data-college-search]");heroForm?.addEventListener("submit",e=>{e.preventDefault();const q=new FormData(heroForm).get("q");location.href=`/colleges/ug${q?`?q=${encodeURIComponent(q)}`:""}`;});
    const homeUG=document.querySelector("[data-college-home-ug]");
    const homePG=document.querySelector("[data-college-home-pg]");
    if (!document.documentElement.dataset.collegeCardActionsBound) {
        document.documentElement.dataset.collegeCardActionsBound = "true";
        document.addEventListener("click", event => {
            const button = event.target.closest?.("[data-open-college-details], [data-open-college-enquiry]");
            if (button) {
                const cardElement = button.closest("[data-college-id]");
                if (!cardElement) return;
                if (button.hasAttribute("data-open-college-details")) openCollegeDetails(cardElement);
                else openCollegeEnquiry(cardElement);
            }
        });
    }
    if(homeUG||homePG)fetch(api).then(r=>{if(!r.ok)throw new Error("Directory unavailable");return r.json();}).then(items=>{
        const colleges=Array.isArray(items)?items.filter(isPhysicalInstitution):[];
        const homeLists={};
        const draw=(container,level)=>{
            if(!container)return;
            const matches=colleges.filter(c=>{const code=String(c.directoryCode||"").toUpperCase();return isPhysicalInstitution(c)&&(level==="PG"?code.includes("-PG-")||!code.includes("-UG-"):!code.includes("-PG-"));});
            homeLists[level]={container,matches,visible:6};
            const more=document.querySelector(`[data-show-more="${level.toLowerCase()}"]`);
            const render=()=>{container.innerHTML=matches.length?matches.slice(0,homeLists[level].visible).map(c=>card(c,0,level)).join(""):`<div class="college-empty-state"><h3>No ${level} college listings are available</h3><p>Institution records will appear here when available.</p></div>`;if(more){more.hidden=matches.length<=homeLists[level].visible;more.innerHTML=homeLists[level].visible>=matches.length?`Show fewer ${level} colleges <span>↑</span>`:`Show more ${level} colleges <span>↓</span>`;}};
            more?.addEventListener("click",()=>{homeLists[level].visible=homeLists[level].visible>=matches.length?6:Math.min(matches.length,homeLists[level].visible+8);render();});
            render();
        };
        draw(homeUG,"UG");draw(homePG,"PG");
    }).catch(()=>[homeUG,homePG].filter(Boolean).forEach(container=>{container.innerHTML=`<div class="college-empty-state"><h3>College listings are temporarily unavailable</h3><p>Please try again in a moment.</p></div>`;}));
    const detail=document.querySelector("[data-college-detail]");if(detail)fetch(`${api}/${encodeURIComponent(detail.dataset.collegeDetail)}`).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(c=>{const f=facts(c);const content=detail.querySelector(".college-detail-content");content.innerHTML=`<a class="college-back-link" href="/colleges/ug">← Back to directory</a><span class="college-eyebrow">COLLEGE PROFILE</span><h1>${esc(c.name)}</h1><p class="college-detail-location">${esc([c.city,c.state,c.country].filter(Boolean).join(", "))}</p>${f.image?`<img class="college-detail-image" src="${esc(f.image)}" alt="${esc(c.name)} campus" loading="lazy">`:""}<section class="college-detail-facts"><h2>Institution overview</h2><p>${esc(f.description)}</p><dl><dt>Institution type</dt><dd>${esc(c.type||"Not listed")}</dd><dt>Courses</dt><dd>${esc(c.popularCourses||"Not listed")}</dd><dt>Location</dt><dd>${esc([c.city,c.state].filter(Boolean).join(", ")||"Not listed")}</dd></dl>${f.website?`<a class="college-button college-button-primary" href="${esc(f.website)}" target="_blank" rel="noopener noreferrer">Visit official website ↗</a>`:"<p>Official website not listed.</p>"}</section>`;}).catch(()=>{detail.innerHTML=`<section class="college-empty-state"><h1>College profile unavailable</h1><p>This institution could not be found in the directory.</p><a href="/colleges">Return to college discovery</a></section>`;});
}
