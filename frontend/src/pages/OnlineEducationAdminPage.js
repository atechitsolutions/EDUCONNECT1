import { renderOnlineEducationCardPreview } from "../assets/js/onlineEducationCustomCards.js";
import { onlineEducationDefaultCards } from "../data/onlineEducationDefaultCards.js";

import {
    deleteOnlineEducationCard,
    getOnlineEducationAdminCards,
    restoreOnlineEducationCard,
    saveOnlineEducationCard
} from "../services/onlineEducationService.js";

const sections = [
    {
        value: "levels",
        label: "Explore by education level",
        image: "required",
        fields: ["title", "description", "level", "image"]
    },
    {
        value: "subjects",
        label: "Explore by subject",
        image: "optional",
        fields: ["title", "subtitle", "description", "subject", "image"]
    },
    {
        value: "popular",
        label: "Popular online course topics",
        image: "optional",
        linkRequired: true,
        fields: ["title", "subtitle", "description", "subject", "provider", "link", "image"]
    },
    {
        value: "platforms",
        label: "Choose a platform for your learning goal",
        image: "required",
        linkRequired: true,
        fields: ["title", "subtitle", "description", "provider", "link", "image"]
    },
    {
        value: "pathways",
        label: "Learning pathways",
        image: "optional",
        fields: ["title", "subtitle", "description", "subject", "level", "image"]
    },
    {
        value: "institutions",
        label: "Universities and providers",
        image: "optional",
        linkRequired: true,
        fields: ["title", "provider", "description", "link", "country", "level", "subject", "mode", "image"]
    },
    {
        value: "programmes",
        label: "Find online courses and degree programmes",
        image: "optional",
        linkRequired: true,
        fields: ["title", "description", "subject", "provider", "level", "qualification", "mode", "country", "duration", "link", "image"]
    }
];

const sectionLabels = new Map(
    sections.map((section) => [section.value, section.label])
);

const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);

function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const source = URL.createObjectURL(file);

        image.onload = () => {
            const scale = Math.min(
                1,
                1600 / Math.max(image.width, image.height)
            );

            const canvas = document.createElement("canvas");

            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);

            const context = canvas.getContext("2d");

            if (!context) {
                URL.revokeObjectURL(source);
                reject(
                    new Error("This browser could not process the image.")
                );
                return;
            }

            context.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            URL.revokeObjectURL(source);

            resolve(canvas.toDataURL("image/jpeg", 0.84));
        };

        image.onerror = () => {
            URL.revokeObjectURL(source);

            reject(
                new Error(
                    "That image could not be opened. Try a JPG, PNG or WebP file."
                )
            );
        };

        image.src = source;
    });
}

function makeNewCardId() {
    if (globalThis.crypto?.randomUUID) {
        return `oe-card-${globalThis.crypto.randomUUID()}`;
    }

    return `oe-card-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
}

export function initOnlineEducationAdminPage() {
    const page = document.querySelector(".oe-admin-page");

    if (!page || page.dataset.initialized === "true") {
        return;
    }

    page.dataset.initialized = "true";

    const form = document.getElementById("oe-admin-form");
    const sectionSelect = document.getElementById("oe-admin-section");
    const fileInput = document.getElementById("oe-admin-image");
    const preview = document.querySelector("[data-card-preview]");
    const dropArea = document.querySelector("[data-image-drop]");
    const message = document.querySelector("[data-admin-message]");
    const cardList = document.querySelector("[data-admin-card-list]");
    const listStatus = document.querySelector("[data-admin-list-status]");
    const listFilter = document.getElementById("oe-admin-list-filter");
    const listSearch = document.getElementById("oe-admin-list-search");

    if (
        !form ||
        !sectionSelect ||
        !fileInput ||
        !preview ||
        !dropArea ||
        !message ||
        !cardList
    ) {
        console.error(
            "Online Education admin page is missing required elements."
        );
        return;
    }

    const fieldLabels = new Map(
        [...form.querySelectorAll("[data-card-field]")]
            .map((label) => [label.dataset.cardField, label])
    );

    let imageData = "";
    let editingId = "";
    let adminCards = [];

    function showMessage(text, isError = false) {
        message.textContent = text;
        message.classList.toggle("is-error", isError);
    }

    function currentCard() {
        const fields = new FormData(form);

        return {
            id: editingId || "preview-card",
            section: sectionSelect.value,
            title: String(fields.get("title") || "Your card title").trim(),
            subtitle: String(fields.get("subtitle") || "").trim(),
            description: String(
                fields.get("description") ||
                "Add a short description to preview it here."
            ).trim(),
            link: String(fields.get("link") || "").trim(),
            provider: String(fields.get("provider") || "").trim(),
            subject: String(fields.get("subject") || "").trim(),
            level: String(fields.get("level") || "").trim(),
            qualification: String(fields.get("qualification") || "").trim(),
            mode: String(fields.get("mode") || "").trim(),
            country: String(fields.get("country") || "").trim(),
            duration: String(fields.get("duration") || "").trim(),
            image: imageData
        };
    }

    function updateLivePreview() {
        const card = currentCard();
        const section = sections.find(
            (item) => item.value === card.section
        );

        for (const [field, label] of fieldLabels) {
            label.hidden =
                field !== "section" &&
                !section?.fields.includes(field);
        }

        const imageRequired = section?.image === "required";

        // Existing default cards can be edited without forcing
        // the administrator to replace a photo they did not change.
        fileInput.required =
            imageRequired && !imageData && !editingId;

        const linkInput = form.elements.namedItem("link");

        if (linkInput) {
            linkInput.required = Boolean(section?.linkRequired);
        }

        document.querySelector("[data-image-required]").textContent =
            imageRequired
                ? "Required for new cards in this layout. Existing cards can keep their current design."
                : section?.image === "optional"
                    ? "Optional. The public card uses its section-specific image crop."
                    : "This section does not use a card photo.";

        dropArea.hidden = section?.image === "none";

        document.querySelector(
            "[data-image-preview]"
        ).hidden = section?.image === "none";

        const sectionClass = {
            levels: "oe-level-section",
            subjects: "oe-subject-section",
            popular: "oe-popular",
            platforms: "oe-platform-guide",
            pathways: "oe-pathways",
            institutions: "oe-universities",
            programmes: "oe-explorer"
        }[card.section];

        const gridClass = {
            levels: "oe-level-grid",
            subjects: "oe-subject-grid",
            popular: "oe-popular-grid",
            platforms: "oe-platform-grid",
            pathways: "oe-path-grid",
            institutions: "oe-provider-grid",
            programmes: "oe-programme-grid"
        }[card.section];

        const sectionDefaults = onlineEducationDefaultCards.filter(
            (item) => item.section === card.section
        );

        const cardPosition = sectionDefaults.findIndex(
            (item) => item.id === card.id
        );

        const previewIndex = cardPosition >= 0 ? cardPosition : 0;

        preview.innerHTML = `
            <div class="oe-page oe-live-card-page">
                <section class="oe-section ${sectionClass}">
                    <div class="oe-container">
                        <div class="${gridClass}">
                            ${renderOnlineEducationCardPreview(card, previewIndex)}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    function setImagePreview(source) {
        const holder = document.querySelector("[data-image-preview]");

        holder.replaceChildren();
        holder.hidden = false;

        if (!source) {
            return;
        }

        const image = document.createElement("img");
        image.src = source;
        image.alt = "Current card image preview";

        holder.append(image);
    }

    function resetEditor({ clearMessage = true } = {}) {
        form.reset();

        editingId = "";
        sectionSelect.disabled = false;
        imageData = "";
        fileInput.value = "";

        setImagePreview("");

        document.getElementById("oe-admin-save").textContent = "Add card";

        document.getElementById(
            "oe-admin-editor-title"
        ).textContent = "Add or edit a card";

        if (clearMessage) {
            showMessage("");
        }

        updateLivePreview();
    }

    function loadCardIntoEditor(card) {
        if (!card) {
            return;
        }

        editingId = card.id;
        sectionSelect.value = card.section;

        // Prevent accidentally moving a default-card override
        // into another section while editing the same ID.
        sectionSelect.disabled = true;

        const fields = [
            "title",
            "subtitle",
            "description",
            "link",
            "provider",
            "subject",
            "level",
            "qualification",
            "mode",
            "country",
            "duration"
        ];

        fields.forEach((field) => {
            const input = form.elements.namedItem(field);

            if (input) {
                input.value = card[field] ?? "";
            }
        });

        imageData = card.image || "";
        fileInput.value = "";

        setImagePreview(imageData);

        document.getElementById("oe-admin-save").textContent =
            "Save changes";

        document.getElementById(
            "oe-admin-editor-title"
        ).textContent = `Editing: ${card.title}`;

        showMessage(
            card.active === false
                ? "This card is archived. Saving changes will restore it on the public page."
                : `Editing ${card.isDefault ? "default" : "custom"} card: ${card.title}`
        );

        updateLivePreview();

        document.getElementById("oe-admin-form-panel")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function cardSummary(card) {
        return [
            card.provider,
            card.country,
            card.level,
            card.subject
        ]
            .filter(Boolean)
            .join(" · ");
    }

    function filteredAdminCards() {
        const section = listFilter?.value || "all";
        const query = (listSearch?.value || "").trim().toLowerCase();

        return adminCards.filter((card) => {
            const sectionMatches =
                section === "all" || card.section === section;

            const queryMatches =
                !query ||
                [
                    card.title,
                    card.description,
                    card.provider,
                    card.country,
                    card.level,
                    card.subject,
                    card.id
                ].some((value) =>
                    String(value || "").toLowerCase().includes(query)
                );

            return sectionMatches && queryMatches;
        });
    }

    function renderAdminCardList() {
        const cards = filteredAdminCards();

        if (!cards.length) {
            cardList.innerHTML = `
                <p class="oe-admin-empty">
                    No cards match this filter.
                </p>
            `;
            return;
        }

        cardList.innerHTML = cards.map((card) => {
            const active = card.active !== false;

            const image = card.image
                ? `<img src="${escapeHTML(card.image)}" alt="" loading="lazy">`
                : `<div class="oe-admin-item-placeholder">No image</div>`;

            const status = active ? "Published" : "Archived";
            const origin = card.isDefault ? "Default card" : "Custom card";
            const details =
                cardSummary(card) || card.description || card.id;

            return `
                <article
                    class="oe-admin-item ${active ? "" : "is-archived"}"
                    data-admin-card-id="${escapeHTML(card.id)}"
                >
                    ${image}

                    <div class="oe-admin-item-copy">
                        <span>
                            ${escapeHTML(sectionLabels.get(card.section) || card.section)}
                            · ${escapeHTML(origin)}
                            · ${status}
                        </span>

                        <h3>${escapeHTML(card.title || "Untitled card")}</h3>
                        <p>${escapeHTML(details)}</p>
                    </div>

                    <div class="oe-admin-item-actions">
                        <button
                            type="button"
                            class="oe-admin-edit"
                            data-admin-edit="${escapeHTML(card.id)}"
                        >
                            Edit
                        </button>

                        ${
                            active
                                ? `
                                    <button
                                        type="button"
                                        class="oe-admin-delete"
                                        data-admin-delete="${escapeHTML(card.id)}"
                                    >
                                        Delete
                                    </button>
                                `
                                : `
                                    <button
                                        type="button"
                                        class="oe-admin-edit"
                                        data-admin-restore="${escapeHTML(card.id)}"
                                    >
                                        Restore
                                    </button>
                                `
                        }
                    </div>
                </article>
            `;
        }).join("");
    }

    async function refreshAdminCards({ quiet = false } = {}) {
        if (listStatus) {
            listStatus.textContent = "Loading cards from the server…";
        }

        if (!quiet) {
            cardList.innerHTML = `
                <p class="oe-admin-empty">
                    Loading Online Education cards…
                </p>
            `;
        }

        try {
            adminCards = await getOnlineEducationAdminCards({
                includeInactive: true
            });

            renderAdminCardList();

            if (listStatus) {
                const activeCount = adminCards.filter(
                    (card) => card.active !== false
                ).length;

                const archivedCount = adminCards.length - activeCount;

                listStatus.textContent =
                    `${activeCount} active cards · ${archivedCount} archived cards`;
            }
        } catch (error) {
            cardList.innerHTML = `
                <p class="oe-admin-empty">
                    ${escapeHTML(error.message || "Cards could not be loaded.")}
                </p>
            `;

            if (listStatus) {
                listStatus.textContent = "Unable to load cards.";
            }

            throw error;
        }
    }

    async function useImage(file) {
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            showMessage("Choose an image file (JPG, PNG or WebP).", true);
            return;
        }

        if (file.size > 12 * 1024 * 1024) {
            showMessage("Choose an image smaller than 12 MB.", true);
            return;
        }

        try {
            imageData = await resizeImage(file);

            setImagePreview(imageData);
            updateLivePreview();

            showMessage("Photo added to the live card preview.");
        } catch (error) {
            showMessage(error.message, true);
        }
    }

    sectionSelect.addEventListener("change", updateLivePreview);
    form.addEventListener("input", updateLivePreview);
    form.addEventListener("change", updateLivePreview);

    fileInput.addEventListener("change", () => {
        useImage(fileInput.files[0]);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropArea.classList.add("is-dragging");
        });
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropArea.classList.remove("is-dragging");
        });
    });

    dropArea.addEventListener("drop", (event) => {
        useImage(event.dataTransfer.files[0]);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const section = sectionSelect.value;
        const fields = new FormData(form);

        const card = {
            id: editingId || makeNewCardId(),
            section,
            title: String(fields.get("title") || "").trim(),
            subtitle: String(fields.get("subtitle") || "").trim(),
            description: String(fields.get("description") || "").trim(),
            link: String(fields.get("link") || "").trim(),
            provider: String(fields.get("provider") || "").trim(),
            subject: String(fields.get("subject") || "").trim(),
            level: String(fields.get("level") || "").trim(),
            qualification: String(fields.get("qualification") || "").trim(),
            mode: String(fields.get("mode") || "").trim(),
            country: String(fields.get("country") || "").trim(),
            duration: String(fields.get("duration") || "").trim(),
            image: imageData
        };

        if (!card.title) {
            showMessage("Enter a card title before saving.", true);
            return;
        }

        const sectionConfig = sections.find(
            (item) => item.value === section
        );

        if (
            sectionConfig?.image === "required" &&
            !card.image &&
            !editingId
        ) {
            showMessage(
                "Add a photo for this new card before saving.",
                true
            );
            return;
        }

        if (sectionConfig?.linkRequired && !card.link) {
            showMessage(
                "Add the official link for this section before saving.",
                true
            );
            return;
        }

        if (card.link && !/^https?:\/\//i.test(card.link)) {
            showMessage(
                "Links must start with http:// or https://.",
                true
            );
            return;
        }

        const wasEditing = Boolean(editingId);

        try {
            await saveOnlineEducationCard(card);

            resetEditor();

            showMessage(
                wasEditing
                    ? "Changes saved. The card is active on the public page."
                    : "Card created and saved to the server."
            );

            try {
                await refreshAdminCards({ quiet: true });
            } catch (error) {
                console.error(
                    "Card saved but the admin list did not refresh.",
                    error
                );
            }
        } catch (error) {
            showMessage(
                error.message || "The server could not save this card.",
                true
            );
        }
    });

    cardList.addEventListener("click", async (event) => {
        const editButton = event.target.closest("[data-admin-edit]");
        const deleteButton = event.target.closest("[data-admin-delete]");
        const restoreButton = event.target.closest("[data-admin-restore]");

        if (editButton) {
            const card = adminCards.find(
                (item) => item.id === editButton.dataset.adminEdit
            );

            loadCardIntoEditor(card);
            return;
        }

        if (deleteButton) {
            const card = adminCards.find(
                (item) => item.id === deleteButton.dataset.adminDelete
            );

            if (!card) return;

            const confirmed = window.confirm(
                `Archive “${card.title}”? It will be hidden from the public Online Education page. You can restore it later.`
            );

            if (!confirmed) return;

            deleteButton.disabled = true;

            try {
                await deleteOnlineEducationCard(card.id);
                await refreshAdminCards({ quiet: true });

                showMessage(
                    `“${card.title}” was archived. The database record was preserved.`
                );
            } catch (error) {
                showMessage(
                    error.message || "The card could not be archived.",
                    true
                );
            } finally {
                deleteButton.disabled = false;
            }

            return;
        }

        if (restoreButton) {
            const card = adminCards.find(
                (item) => item.id === restoreButton.dataset.adminRestore
            );

            if (!card) return;

            restoreButton.disabled = true;

            try {
                await restoreOnlineEducationCard(card);
                await refreshAdminCards({ quiet: true });

                showMessage(
                    `“${card.title}” was restored to the public catalogue.`
                );
            } catch (error) {
                showMessage(
                    error.message || "The card could not be restored.",
                    true
                );
            } finally {
                restoreButton.disabled = false;
            }
        }
    });

    document.getElementById("oe-admin-reset").addEventListener(
        "click",
        () => resetEditor()
    );

    document.getElementById("oe-admin-refresh-list")?.addEventListener(
        "click",
        async () => {
            try {
                await refreshAdminCards();
                showMessage("Card list refreshed from the server.");
            } catch (error) {
                showMessage(error.message, true);
            }
        }
    );

    listFilter?.addEventListener("change", renderAdminCardList);
    listSearch?.addEventListener("input", renderAdminCardList);

    updateLivePreview();

    refreshAdminCards().catch((error) => {
        showMessage(
            error.message || "Admin access is required to load saved cards.",
            true
        );
    });
}

export default function OnlineEducationAdminPage() {
    return `
        <main class="oe-admin-page">
            <div class="oe-admin-container">

                <header class="oe-admin-header">
                    <div>
                        <p class="oe-eyebrow">EDUCONNECT CONTENT</p>
                        <h1>Online Education cards</h1>
                        <p>
                            Create cards, edit existing content, archive cards
                            from the public page, or restore archived cards.
                            Changes are saved to the backend.
                        </p>
                    </div>

                    <a href="/online-education" class="oe-button oe-outline">
                        View public page ↗
                    </a>
                </header>

                <section
                    class="oe-admin-panel"
                    aria-labelledby="oe-admin-list-title"
                >
                    <div class="oe-admin-list-header">
                        <div>
                            <h2 id="oe-admin-list-title">Manage existing cards</h2>
                            <p data-admin-list-status>
                                Loading cards from the server…
                            </p>
                        </div>

                        <button
                            type="button"
                            class="oe-button oe-outline"
                            id="oe-admin-refresh-list"
                        >
                            Refresh list
                        </button>
                    </div>

                    <div class="oe-admin-list-filters">
                        <label>
                            <span>Filter by section</span>
                            <select id="oe-admin-list-filter">
                                <option value="all">All sections</option>
                                ${sections.map((section) => `
                                    <option value="${section.value}">
                                        ${section.label}
                                    </option>
                                `).join("")}
                            </select>
                        </label>

                        <label>
                            <span>Find a card</span>
                            <input
                                type="search"
                                id="oe-admin-list-search"
                                placeholder="Search title, provider, country…"
                            >
                        </label>
                    </div>

                    <div
                        class="oe-admin-list"
                        data-admin-card-list
                        aria-live="polite"
                    >
                        <p class="oe-admin-empty">
                            Loading Online Education cards…
                        </p>
                    </div>
                </section>

                <section
                    class="oe-admin-panel"
                    id="oe-admin-form-panel"
                    aria-labelledby="oe-admin-editor-title"
                >
                    <h2 id="oe-admin-editor-title">Add or edit a card</h2>

                    <p class="oe-admin-help">
                        Choose a section, enter its content and add a photo
                        if that card style uses one. Editing a default card
                        saves an override without deleting the original data.
                    </p>

                    <form id="oe-admin-form">
                        <div class="oe-admin-fields">

                            <label data-card-field="section">
                                <span>Page section</span>
                                <select
                                    name="section"
                                    id="oe-admin-section"
                                    required
                                >
                                    ${sections.map((section) => `
                                        <option value="${section.value}">
                                            ${section.label}
                                        </option>
                                    `).join("")}
                                </select>
                            </label>

                            <label data-card-field="title">
                                <span>Card title</span>
                                <input
                                    name="title"
                                    maxlength="90"
                                    required
                                    placeholder="For example, School learning"
                                >
                            </label>

                            <label data-card-field="subtitle">
                                <span>Short label / badge</span>
                                <input
                                    name="subtitle"
                                    maxlength="70"
                                    placeholder="Optional category or label"
                                >
                            </label>

                            <label data-card-field="provider">
                                <span>Provider or institution</span>
                                <input
                                    name="provider"
                                    maxlength="120"
                                    placeholder="Provider name"
                                >
                            </label>

                            <label
                                class="oe-admin-wide"
                                data-card-field="description"
                            >
                                <span>Description</span>
                                <textarea
                                    name="description"
                                    rows="3"
                                    maxlength="1000"
                                    placeholder="A short description for the card"
                                ></textarea>
                            </label>

                            <label data-card-field="link">
                                <span>Official link</span>
                                <input
                                    name="link"
                                    type="url"
                                    maxlength="1000"
                                    placeholder="https://example.com"
                                >
                            </label>

                            <label data-card-field="subject">
                                <span>Subject / stream</span>
                                <input
                                    name="subject"
                                    maxlength="1000"
                                    placeholder="Use | between multiple values"
                                >
                            </label>

                            <label data-card-field="level">
                                <span>Education level</span>
                                <input
                                    name="level"
                                    maxlength="1000"
                                    placeholder="Use | between multiple values"
                                >
                            </label>

                            <label data-card-field="qualification">
                                <span>Qualification / award</span>
                                <input
                                    name="qualification"
                                    maxlength="100"
                                    placeholder="Degree or certificate"
                                >
                            </label>

                            <label data-card-field="mode">
                                <span>Study mode</span>
                                <input
                                    name="mode"
                                    maxlength="1000"
                                    placeholder="Use | between multiple values"
                                >
                            </label>

                            <label data-card-field="country">
                                <span>Country / location</span>
                                <input
                                    name="country"
                                    maxlength="80"
                                    placeholder="For example, Global"
                                >
                            </label>

                            <label data-card-field="duration">
                                <span>Duration</span>
                                <input
                                    name="duration"
                                    maxlength="80"
                                    placeholder="For example, 12 months"
                                >
                            </label>
                        </div>

                        <div class="oe-admin-editor-preview">
                            <div class="oe-admin-preview-heading">
                                <div>
                                    <h3>Live page preview</h3>
                                    <p>
                                        Updates as you edit and uses the selected
                                        section’s real card layout.
                                    </p>
                                </div>
                                <span>PUBLIC CARD</span>
                            </div>

                            <div
                                class="oe-admin-preview-stage"
                                data-card-preview
                                aria-live="polite"
                            ></div>

                            <div class="oe-admin-upload-row">
                                <div>
                                    <h3>Card photo</h3>
                                    <p data-image-required></p>
                                    <div
                                        class="oe-admin-preview"
                                        data-image-preview
                                    ></div>
                                </div>

                                <label class="oe-admin-drop" data-image-drop>
                                    <input
                                        id="oe-admin-image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                    >
                                    <span class="oe-admin-upload-icon">↑</span>
                                    <b>Drop a photo here</b>
                                    <small>or choose an image · up to 12 MB</small>
                                    <span class="oe-admin-choose">Choose photo</span>
                                </label>
                            </div>
                        </div>

                        <p
                            class="oe-admin-message"
                            data-admin-message
                            aria-live="polite"
                        ></p>

                        <div class="oe-admin-actions">
                            <button
                                class="oe-button oe-primary"
                                id="oe-admin-save"
                                type="submit"
                            >
                                Add card
                            </button>

                            <button
                                class="oe-button oe-outline"
                                id="oe-admin-reset"
                                type="button"
                            >
                                Clear form
                            </button>
                        </div>
                    </form>
                </section>

            </div>
        </main>
    `;
}