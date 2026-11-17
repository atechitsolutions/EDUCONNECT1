import { API_BASE_URL } from "../config/api.js";
import siteData from "../data/domestic-institution-site-data.json";
import photoData from "../data/domestic-college-campus-photos.json";

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
const usableCampusPhoto = value => value && !/(?:blank\.gif|placeholder|no[-_]?image)/i.test(value) ? String(value).replaceAll("&amp;", "&") : "";
const facts = item => {
    const site = siteData[item.directoryCode] || {};
    const website = validWebsite(item.website) || validOfficialDomain(site.officialDomain);
    const image = usableCampusPhoto(item.coverImageUrl) || usableCampusPhoto(site.campusImage) || usableCampusPhoto(photoData[item.directoryCode]) || "";
    return { website, image, description: item.description || site.description || "Visit the institution’s official website for current programmes and admissions information." };
};

export function CollegesPage() {
    return `<main class="college-discovery-page college-home-page">
        <section class="college-discovery-hero">
            <div class="college-hero-copy"><span class="college-eyebrow">EDUCONNECT · COLLEGE DISCOVERY</span><h1>Discover India's Leading Colleges &amp; Universities</h1><p>Explore institutions across India and find the right place for your next step.</p>
                <form class="college-hero-search" data-college-search><span aria-hidden="true">⌕</span><input name="q" type="search" placeholder="Search colleges, universities or courses" aria-label="Search colleges, universities or courses"><button>Explore colleges <span>→</span></button></form>
                <div class="college-hero-links"><a href="/colleges/ug">Explore undergraduate colleges <span>↗</span></a><a href="/colleges/pg">Explore postgraduate colleges <span>↗</span></a></div>
            </div>
            <div class="college-hero-image" role="img" aria-label="University campus" style="background-image:linear-gradient(180deg,rgba(7,28,56,.04),rgba(7,28,56,.68)),url('${esc(photoData["EC-IN-PG-IIMB"] || "")}')"><span>Find a campus that moves you forward</span></div>
        </section>
        <section class="college-discovery-intro"><div><span class="college-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Explore higher education, your way.</h2></div><p>Search the institutions already listed in EDUCONNECT. Review campus, course and location information, then visit each institution’s official site for current details.</p></section>
        <section class="college-discovery-shortcuts"><a href="/colleges/ug"><span>01 · UNDERGRADUATE</span><strong>UG Colleges</strong><small>Explore undergraduate institutions and programmes</small><b>Browse directory →</b></a><a href="/colleges/pg"><span>02 · POSTGRADUATE</span><strong>PG Colleges</strong><small>Explore postgraduate institutions and programmes</small><b>Browse directory →</b></a></section>
        <section class="college-home-directory"><div><span class="college-eyebrow">DISCOVERY DIRECTORY</span><h2>Find your college</h2><p>Search current college and university records from the EDUCONNECT directory.</p></div><a class="college-primary-link" href="/colleges/ug">Browse all colleges <span>→</span></a></section>
        <section class="college-featured-section"><div class="college-results-heading"><div><span class="college-eyebrow">FROM THE DIRECTORY</span><h2>Featured institutions</h2></div><a href="/colleges/ug">View directory →</a></div><div class="college-featured-grid" data-college-featured><p class="college-directory-loading">Loading institutions…</p></div></section>
        <section class="college-discovery-insights"><div><span class="college-eyebrow">EXPLORE BY DESTINATION</span><h2>Where students study</h2><p>Cities shown below are drawn from institution records in the directory.</p><div class="college-chip-list" data-college-cities></div></div><div><span class="college-eyebrow">PROGRAMMES IN THE DIRECTORY</span><h2>Explore courses</h2><p>Browse course names currently listed by institutions.</p><div class="college-chip-list" data-college-programmes></div></div></section>
    </main>`;
}

export function CollegeDirectoryPage(level = "UG") {
    const title = level === "PG" ? "Postgraduate colleges & universities" : "Undergraduate colleges & universities";
    return `<main class="college-discovery-page college-directory-page" data-college-directory data-level="${level}">
        <section class="college-directory-heading"><a class="college-back-link" href="/colleges">← College discovery</a><div><span class="college-eyebrow">${level === "PG" ? "POSTGRADUATE" : "UNDERGRADUATE"} DIRECTORY</span><h1>${title}</h1><p>Search and compare institutions in the existing EDUCONNECT directory.</p></div></section>
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
        <section class="college-results-section"><div class="college-results-heading"><div><span class="college-eyebrow">EDUCONNECT DIRECTORY</span><h2>Explore institutions</h2></div><p data-college-results-count>Loading directory…</p></div><div class="college-results-grid" data-college-results aria-live="polite"></div><div class="college-pagination" data-college-pagination></div></section>
        <div class="college-compare-dock" data-college-compare hidden></div>
    </main>`;
}

export function CollegeDetailPage(id) {
    return `<main class="college-discovery-page college-detail-page" data-college-detail="${esc(id)}"><div class="college-detail-content"><span class="college-eyebrow">COLLEGE PROFILE</span><h1>Loading institution…</h1></div></main>`;
}

function card(item, index, level) {
    const { website, image, description } = facts(item);
    const location = [item.city, item.state].filter(Boolean).join(", ") || "Location not listed";
    const programs = item.popularCourses || "Programme details not listed";
    const imageMarkup = image ? `<img src="${esc(image)}" loading="lazy" alt="${esc(item.name)} campus" onerror="this.remove()">` : "";
    return `<article class="college-directory-card"><a class="college-card-media" href="/colleges/${item.id}" aria-label="Explore ${esc(item.name)}">${imageMarkup}<span class="college-card-initials">${esc((item.name || "C").split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase())}</span><span class="college-card-location">⌖ ${esc(location)}</span></a><div class="college-card-content"><div class="college-card-meta"><span>${esc(String(item.type || "Institution").toLowerCase())}</span><span>${level}</span></div><h3><a href="/colleges/${item.id}">${esc(item.name)}</a></h3><p class="college-card-programs">${esc(programs)}</p><p class="college-card-description">${esc(description)}</p><div class="college-card-actions"><a class="college-button college-button-primary" href="/colleges/${item.id}">Explore college <span>↗</span></a>${website ? `<a class="college-button" href="${esc(website)}" target="_blank" rel="noopener noreferrer">Official website <span>↗</span></a>` : `<span class="college-website-unlisted">Official website not listed</span>`}<button class="college-compare-button" type="button" data-compare-id="${item.id}">${index === -1 ? "Compare" : "Compare"} <span>＋</span></button></div></div></article>`;
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
    const initialQuery = new URLSearchParams(location.search).get("q"); if(initialQuery) form.elements.q.value=initialQuery;
    form.addEventListener("submit",e=>{e.preventDefault();page=1;apply();});
    form.addEventListener("reset",()=>setTimeout(()=>{page=1;apply();},0));
    root.addEventListener("click",e=>{
        const pager=e.target.closest("[data-page]"); if(pager){page=Number(pager.dataset.page);apply();return;}
        const cmp=e.target.closest("[data-compare-id]");if(cmp){const id=Number(cmp.dataset.compareId);chosen.has(id)?chosen.delete(id):chosen.size<3&&chosen.add(id);apply();return;}
        if(e.target.closest("[data-clear-compare]")){chosen.clear();apply();return;}
        if(e.target.closest("[data-show-compare]")){showCompare(colleges.filter(c=>chosen.has(Number(c.id))));}
    });
    fetch(api).then(r=>{if(!r.ok)throw new Error("The college directory could not be loaded.");return r.json();}).then(data=>{colleges=Array.isArray(data)?data:[];updateOptions();apply();}).catch(()=>{count.textContent="Directory unavailable";grid.innerHTML=`<div class="college-empty-state"><h3>We couldn't load the college directory</h3><p>Check your connection and try again.</p><button type="button" data-retry-colleges>Retry</button></div>`;});
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

export function initCollegeDiscoveryPage() {
    const directory=document.querySelector("[data-college-directory]");if(directory)bindDirectory(directory);
    const heroForm=document.querySelector("[data-college-search]");heroForm?.addEventListener("submit",e=>{e.preventDefault();const q=new FormData(heroForm).get("q");location.href=`/colleges/ug${q?`?q=${encodeURIComponent(q)}`:""}`;});
    const featured=document.querySelector("[data-college-featured]");
    if(featured)fetch(api).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(items=>{
        const colleges=Array.isArray(items)?items:[];
        const shown=colleges.filter(c=>facts(c).image).slice(0,3);
        featured.innerHTML=shown.length?shown.map(c=>{const f=facts(c);return `<a class="college-featured-card" href="/colleges/${c.id}">${f.image?`<img src="${esc(f.image)}" alt="${esc(c.name)} campus" loading="lazy" onerror="this.remove()">`:""}<span>${esc([c.city,c.state].filter(Boolean).join(", ")||"India")}</span><strong>${esc(c.name)}</strong><small>${esc(c.type||"Institution")} · Explore profile →</small></a>`;}).join(""):`<p class="college-directory-loading">No campus images are currently available in the institution records.</p>`;
        const cityCounts=new Map();colleges.forEach(c=>{if(c.city)cityCounts.set(c.city,(cityCounts.get(c.city)||0)+1);});
        const cities=[...cityCounts].sort((a,b)=>b[1]-a[1]).slice(0,8);const cityNode=document.querySelector("[data-college-cities]");if(cityNode)cityNode.innerHTML=cities.map(([city,n])=>`<a href="/colleges/ug?q=${encodeURIComponent(city)}">${esc(city)} <small>${n}</small></a>`).join("")||"<span>City details will appear when available.</span>";
        const courseCounts=new Map();colleges.forEach(c=>String(c.popularCourses||"").split(/[•,|;]/).map(v=>v.trim()).filter(Boolean).forEach(course=>courseCounts.set(course,(courseCounts.get(course)||0)+1)));
        const courseNode=document.querySelector("[data-college-programmes]");if(courseNode){const courses=[...courseCounts].sort((a,b)=>b[1]-a[1]).slice(0,8);courseNode.innerHTML=courses.map(([course])=>`<a href="/colleges/ug?q=${encodeURIComponent(course)}">${esc(course)}</a>`).join("")||"<span>Course information has not yet been added to these records.</span>";}
    }).catch(()=>{featured.innerHTML=`<p class="college-directory-loading">The institution directory is currently unavailable.</p>`;});
    const detail=document.querySelector("[data-college-detail]");if(detail)fetch(`${api}/${encodeURIComponent(detail.dataset.collegeDetail)}`).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(c=>{const f=facts(c);const content=detail.querySelector(".college-detail-content");content.innerHTML=`<a class="college-back-link" href="/colleges/ug">← Back to directory</a><span class="college-eyebrow">COLLEGE PROFILE</span><h1>${esc(c.name)}</h1><p class="college-detail-location">${esc([c.city,c.state,c.country].filter(Boolean).join(", "))}</p>${f.image?`<img class="college-detail-image" src="${esc(f.image)}" alt="${esc(c.name)} campus" loading="lazy">`:""}<section class="college-detail-facts"><h2>Institution overview</h2><p>${esc(f.description)}</p><dl><dt>Institution type</dt><dd>${esc(c.type||"Not listed")}</dd><dt>Courses</dt><dd>${esc(c.popularCourses||"Not listed")}</dd><dt>Location</dt><dd>${esc([c.city,c.state].filter(Boolean).join(", ")||"Not listed")}</dd></dl>${f.website?`<a class="college-button college-button-primary" href="${esc(f.website)}" target="_blank" rel="noopener noreferrer">Visit official website ↗</a>`:"<p>Official website not listed.</p>"}</section>`;}).catch(()=>{detail.innerHTML=`<section class="college-empty-state"><h1>College profile unavailable</h1><p>This institution could not be found in the directory.</p><a href="/colleges">Return to college discovery</a></section>`;});
}
