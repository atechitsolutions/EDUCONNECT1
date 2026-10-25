import { onlineEducationDefaultCards } from "../../data/onlineEducationDefaultCards.js";

import {
    getOnlineEducationCardOverrides
} from "../../services/onlineEducationService.js";
function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function imageStyle(image) {
    return image
        ? `style="background-image:url('${escapeHTML(image)}')"`
        : "";
}

function renderLevelCard(card, index) {
    return `
        <a class="oe-level-card oe-admin-added-card" href="#oe-programmes" data-level="${escapeHTML(card.level || card.title)}">
            <span class="oe-card-icon">${escapeHTML(card.subtitle || "✦")}</span>
            <span class="oe-card-number">${String(index + 1).padStart(2, "0")}</span>
            <span class="oe-level-photo" aria-hidden="true" ${imageStyle(card.image)}></span>
            <h3>${escapeHTML(card.title)}</h3>
            <p>${escapeHTML(card.description)}</p>
            <span class="oe-card-arrow">Explore options →</span>
        </a>
    `;
}

function renderSubjectCard(card) {
    return `
        <button class="oe-subject-card oe-admin-added-card" type="button" data-subject="${escapeHTML(card.subject || card.title)}">
            ${card.image ? `<span class="oe-subject-photo" aria-hidden="true" ${imageStyle(card.image)}></span>` : ""}
            <span class="oe-subject-icon">${escapeHTML(card.subtitle || "✦")}</span>
            <b>${escapeHTML(card.title)}</b>
            <small>Explore programmes <i>→</i></small>
        </button>
    `;
}

function renderPopularCard(card) {
    const safeLink = /^https?:\/\//i.test(card.link || "") ? card.link : "#oe-programmes";
    return `
        <article class="oe-popular-card oe-admin-added-card">
            ${card.image ? `<div class="oe-admin-card-photo" ${imageStyle(card.image)}></div>` : ""}
            <span class="oe-provider-mark" aria-hidden="true">${escapeHTML((card.provider || card.title).slice(0, 2).toUpperCase())}</span>
            <p class="oe-programme-subject">${escapeHTML(card.subject || card.subtitle || "Online learning")}</p>
            <h3>${escapeHTML(card.title)}</h3>
            <p>${escapeHTML(card.description)}</p>
            <div class="oe-popular-actions"><a href="${escapeHTML(safeLink)}" ${safeLink.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>Explore card ↗</a></div>
        </article>
    `;
}

function renderImageTile(card, section) {
    if (section === "pathways") {
        return `
            <a class="oe-admin-added-card" href="#oe-programmes" data-subject="${escapeHTML(card.subject || card.title)}">
                ${card.image ? `<span class="oe-pathway-image" ${imageStyle(card.image)}></span>` : ""}
                <span>New pathway</span><b>${escapeHTML(card.title)}</b><i>${escapeHTML(card.description)} →</i>
            </a>
        `;
    }

    return `
        <article class="oe-platform-card oe-admin-added-card">
            <span class="oe-platform-photo" ${imageStyle(card.image)}></span>
            <span class="oe-platform-kicker">${escapeHTML(card.subtitle || "EDUCONNECT")}</span>
            <h3>${escapeHTML(card.title)}</h3>
            <p>${escapeHTML(card.description)}</p>
            ${/^https?:\/\//i.test(card.link || "") ? `<a class="oe-platform-external" href="${escapeHTML(card.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(card.provider || "Visit provider")} ↗</a>` : ""}
            <a class="oe-platform-local" href="#oe-programmes">Explore options on EduConnect <span>→</span></a>
        </article>
    `;
}

function renderInstitutionCard(card) {
    const country = card.country || "Global";
    const level = card.level || "Online Degree";
    const subject = card.subject || "Other";
    const mode = card.mode || "Fully online";
    const destination = /^https?:\/\//i.test(card.link || "") ? card.link : "#oe-programmes";

    return `
        <article class="oe-provider-card oe-institution-card oe-admin-added-card"
            data-country="${escapeHTML(country)}"
            data-levels="${escapeHTML(level)}"
            data-subjects="${escapeHTML(subject)}"
            data-modes="${escapeHTML(mode)}">
            <div class="oe-institution-top">
                ${card.image
                    ? `<img class="oe-admin-institution-image" src="${escapeHTML(card.image)}" alt="">`
                    : `<span class="oe-institution-monogram" aria-hidden="true">${escapeHTML((card.title || "EC").slice(0, 2).toUpperCase())}</span>`}
                <span class="oe-verified-source">Added by EduConnect</span>
            </div>
            <h3>${escapeHTML(card.title)}</h3>
            <p class="oe-institution-location">${escapeHTML(country)} · ${escapeHTML(level.split("|")[0])}</p>
            <p>${escapeHTML(card.description)}</p>
            <div class="oe-institution-tags">${[subject, mode].flatMap((value) => value.split("|")).map((value) => `<span>${escapeHTML(value)}</span>`).join("")}</div>
            <div class="oe-institution-actions"><a href="${escapeHTML(destination)}" ${destination.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>View institution ↗</a></div>
        </article>
    `;
}

function renderProgrammePreview(card) {
    const provider = card.provider || 'EduConnect listing';
    const subject = card.subject || card.subtitle || 'Online learning';
    const level = card.level || 'Online Degree';
    const mode = card.mode || 'Fully online';
    const country = card.country || 'Global';
    const duration = card.duration || 'Check provider website';
    const qualification = card.qualification || level;
    const href = /^https?:\/\//i.test(card.link || '') ? card.link : '#';
    return `
        <article class="oe-programme-card oe-admin-added-card">
            ${card.image ? `<img class="oe-programme-image" src="${escapeHTML(card.image)}" alt="">` : ''}
            <div class="oe-programme-top"><span class="oe-provider-mark">${escapeHTML(provider.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase())}</span><span class="oe-sample-badge">Illustrative sample</span></div>
            <p class="oe-programme-subject">${escapeHTML(subject)}</p>
            <h3>${escapeHTML(card.title || 'Programme title')}</h3>
            <p class="oe-provider-name">${escapeHTML(provider)}</p>
            <div class="oe-programme-tags"><span>${escapeHTML(level)}</span><span>${escapeHTML(mode)}</span></div>
            <dl class="oe-programme-meta"><div><dt>Location</dt><dd>${escapeHTML(country)}</dd></div><div><dt>Duration</dt><dd>${escapeHTML(duration)}</dd></div><div><dt>Tuition</dt><dd>Check provider website</dd></div><div><dt>Award</dt><dd>${escapeHTML(qualification)}</dd></div></dl>
            <p class="oe-card-footnote">Illustrative listing · verify details with the provider.</p>
            <div class="oe-programme-actions"><a class="oe-button oe-primary" href="${escapeHTML(href)}">Visit provider ↗</a></div>
        </article>
    `;
}

export function renderOnlineEducationCardPreview(card, index = 0) {
    const renderers = {
        levels: (value, position) => renderLevelCard(value, position),
        subjects: (value) => renderSubjectCard(value),
        popular: (value) => renderPopularCard(value),
        platforms: (value) => renderImageTile(value, 'platforms'),
        pathways: (value) => renderImageTile(value, 'pathways'),
        institutions: (value) => renderInstitutionCard(value),
        programmes: (value) => renderProgrammePreview(value)
    };
    return renderers[card.section]?.(card, index) || '';
}

export async function renderOnlineEducationCustomCards() {
    const { cards, removedIds } = await getOnlineEducationCardOverrides();
    const overrides = new Map(cards.map((card) => [card.id, card]));
    const renderers = {
        levels: renderLevelCard,
        subjects: renderSubjectCard,
        popular: renderPopularCard
    };

    for (const section of ["levels", "subjects", "popular", "platforms", "pathways", "institutions"]) {
        const container = document.querySelector({
            levels: ".oe-level-grid",
            subjects: ".oe-subject-grid",
            popular: ".oe-popular-grid",
            platforms: ".oe-platform-grid",
            pathways: ".oe-path-grid",
            institutions: "#oe-institution-results"
        }[section]);

        if (!container) continue;

        applyDefaultCardChanges(section, container, overrides, removedIds);

        const sectionCards = cards.filter((card) => card.section === section
            && !onlineEducationDefaultCards.some((base) => base.id === card.id));
        const markup = sectionCards.map((card, index) => {
            if (renderers[section]) return renderers[section](card, index);
            if (section === "institutions") return renderInstitutionCard(card);
            return renderImageTile(card, section);
        }).join("");

        container.insertAdjacentHTML("beforeend", markup);
    }

    duplicateEducationLevelCards();

    const addFilterOptions = (selectId, values) => {
        const select = document.getElementById(selectId);
        if (!select) return;

        for (const value of values.flatMap((item) => String(item || "").split("|")).filter(Boolean)) {
            if ([...select.options].some((option) => option.value === value)) continue;
            select.add(new Option(value, value));
        }
    };

    addFilterOptions("oe-filter-level", [...onlineEducationDefaultCards, ...cards].map((card) => card.level || (card.section === "levels" ? card.title : "")));
    addFilterOptions("oe-filter-subject", [...onlineEducationDefaultCards, ...cards].map((card) => card.subject || (card.section === "subjects" ? card.title : "")));
    addFilterOptions("oe-filter-country", cards.map((card) => card.country));
    addFilterOptions("oe-filter-mode", cards.map((card) => card.mode));
    addFilterOptions("oe-inst-country", cards.filter((card) => card.section === "institutions").map((card) => card.country));
    addFilterOptions("oe-inst-level", cards.filter((card) => card.section === "institutions").map((card) => card.level));
    addFilterOptions("oe-inst-subject", cards.filter((card) => card.section === "institutions").map((card) => card.subject));
    addFilterOptions("oe-inst-mode", cards.filter((card) => card.section === "institutions").map((card) => card.mode));
}

function duplicateEducationLevelCards() {
    const track = document.querySelector(".oe-level-grid");
    if (!track) return;

    track.querySelectorAll("[data-carousel-clone]").forEach((card) => card.remove());
    const originalCards = [...track.children];

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.dataset.carouselClone = "true";
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((element) => {
            element.setAttribute("tabindex", "-1");
        });
        track.append(clone);
    });
}

function applyDefaultCardChanges(section, container, overrides, removedIds) {
    const defaults = onlineEducationDefaultCards.filter((card) => card.section === section);
    const defaultElements = [...container.children].slice(0, defaults.length);

    defaults.forEach((defaultCard, index) => {
        const element = defaultElements[index];
        if (!element) return;

        element.dataset.oeCardId = defaultCard.id;
        element.dataset.oeSection = section;
        const savedCard = overrides.get(defaultCard.id);

        if (removedIds.has(defaultCard.id)) {
            element.remove();
            return;
        }

        if (!savedCard) return;

        const card = { ...defaultCard, ...savedCard };
        const title = element.querySelector("h3, b");
        if (title && card.title) title.textContent = card.title;

        if (section === "levels") {
            const description = element.querySelector("p");
            if (description && card.description) description.textContent = card.description;
            element.dataset.level = card.level || card.title;
            const icon = element.querySelector(".oe-card-icon");
            if (icon && card.subtitle) icon.textContent = card.subtitle;
            setBackground(element.querySelector(".oe-level-photo"), card.image);
        }

        if (section === "subjects") {
            element.dataset.subject = card.subject || card.title;
            const hint = element.querySelector("small");
            if (hint && card.description) hint.textContent = card.description;
            const art = element.querySelector(".oe-subject-art");
            setBackground(art, card.image);
            if (art && card.image) art.classList.add("oe-admin-subject-photo");
        }

        if (section === "popular") {
            const subject = element.querySelector(".oe-programme-subject");
            if (subject) subject.textContent = card.subject || card.subtitle;
            const note = element.querySelector(".oe-card-footnote");
            if (note && card.description) note.textContent = card.description;
            const link = element.querySelector(".oe-popular-actions a");
            if (link && card.link) link.href = card.link;
            setCardPhoto(element, card.image, section);
        }

        if (section === "platforms") {
            const kicker = element.querySelector(".oe-platform-kicker");
            if (kicker && card.subtitle) kicker.textContent = card.subtitle;
            const description = element.querySelector(":scope > p:not(.oe-eyebrow)");
            if (description && card.description) description.textContent = card.description;
            const externalLink = element.querySelector(".oe-platform-links a");
            if (externalLink) {
                if (card.link) externalLink.href = card.link;
                const providerName = externalLink.querySelector("b");
                if (providerName && card.provider) providerName.textContent = card.provider;
            }
            const localLink = element.querySelector(".oe-platform-local");
            if (localLink && card.level) localLink.dataset.level = card.level;
            setBackground(element.querySelector(".oe-platform-photo"), card.image);
        }

        if (section === "pathways") {
            const label = element.querySelector("span");
            const description = element.querySelector("i");
            if (label && card.subtitle) label.textContent = card.subtitle;
            if (description && card.description) description.textContent = `${card.description} →`;
            if (card.level) {
                element.dataset.level = card.level;
                delete element.dataset.subject;
            } else {
                element.dataset.subject = card.subject || card.title;
                delete element.dataset.level;
            }
            setCardPhoto(element, card.image, section);
        }

        if (section === "institutions") {
            element.dataset.country = card.country;
            element.dataset.levels = card.level;
            element.dataset.subjects = card.subject;
            element.dataset.modes = card.mode;
            const location = element.querySelector(".oe-institution-location");
            if (location) location.textContent = [card.provider, card.country, card.level?.split("|")[0]].filter(Boolean).join(" · ");
            const description = element.querySelector(".oe-institution-location + p");
            if (description && card.description) description.textContent = card.description;
            const link = element.querySelector(".oe-institution-actions a");
            if (link && card.link) link.href = card.link;
            const tags = element.querySelector(".oe-institution-tags");
            if (tags) tags.innerHTML = [card.level, card.subject, card.mode].filter(Boolean).flatMap((value) => value.split("|")).map((value) => `<span>${escapeHTML(value)}</span>`).join("");
            setInstitutionPhoto(element, card.image);
        }
    });
}

function setBackground(element, image) {
    if (element && image) element.style.backgroundImage = `url("${image}")`;
}

function setCardPhoto(cardElement, image, section) {
    if (!image || cardElement.querySelector(":scope > .oe-admin-card-photo, :scope > .oe-pathway-image")) return;
    const photo = document.createElement("span");
    photo.className = section === "pathways" ? "oe-pathway-image" : "oe-admin-card-photo";
    photo.style.backgroundImage = `url("${image}")`;
    cardElement.prepend(photo);
}

function setInstitutionPhoto(cardElement, image) {
    if (!image) return;
    const header = cardElement.querySelector(".oe-institution-top");
    if (!header) return;
    let photo = header.querySelector(".oe-admin-institution-image");
    if (!photo) {
        photo = document.createElement("img");
        photo.className = "oe-admin-institution-image";
        photo.alt = "";
        header.prepend(photo);
    }
    photo.src = image;
    header.querySelector(".oe-institution-monogram")?.setAttribute("hidden", "");
}
