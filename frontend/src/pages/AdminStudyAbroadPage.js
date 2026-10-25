import {
    getCurrentUser
} from "../services/authService.js";

import {
    createInstitution,
    deleteInstitution,
    getAdminInstitutions,
    updateInstitution
} from "../services/studyAbroadService.js";


function value(id) {
    return document.getElementById(id)?.value.trim() || "";
}


function checked(id) {
    return Boolean(
        document.getElementById(id)?.checked
    );
}


function setMessage(message, type = "") {

    const element =
        document.querySelector(
            "[data-admin-study-abroad-message]"
        );

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className =
        `admin-study-abroad-message ${type}`;
}


function resetForm() {

    const form =
        document.getElementById(
            "admin-study-abroad-form"
        );

    if (!form) {
        return;
    }

    form.reset();

    document.getElementById(
        "admin-study-abroad-id"
    ).value = "";

    document.getElementById(
        "admin-study-abroad-submit"
    ).textContent = "Add Institution";
}


function fillForm(institution) {

    document.getElementById(
        "admin-study-abroad-id"
    ).value = institution.id || "";

    document.getElementById("admin-name").value = institution.name || "";
    document.getElementById("admin-description").value = institution.description || "";
    document.getElementById("admin-address").value = institution.address || "";
    document.getElementById("admin-city").value = institution.city || "";
    document.getElementById("admin-state").value = institution.state || "";
    document.getElementById("admin-country").value = institution.country || "";
    document.getElementById("admin-country-code").value = institution.countryCode || "";
    document.getElementById("admin-website").value = institution.website || "";
    document.getElementById("admin-email").value = institution.email || "";
    document.getElementById("admin-phone").value = institution.phone || "";
    document.getElementById("admin-cover-image").value = institution.coverImageUrl || "";
    document.getElementById("admin-type").value = institution.type || "UNIVERSITY";
    document.getElementById("admin-study-abroad-enabled").checked = institution.studyAbroadEnabled === true;
    document.getElementById("admin-active").checked = institution.active === true;
    document.getElementById("admin-verified").checked = institution.verified === true;

    document.getElementById(
        "admin-study-abroad-submit"
    ).textContent = "Update Institution";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function createFormData() {

    return {
        name: value("admin-name"),
        description: value("admin-description"),
        address: value("admin-address"),
        city: value("admin-city"),
        state: value("admin-state"),
        country: value("admin-country"),
        countryCode: value("admin-country-code").toUpperCase(),
        website: value("admin-website"),
        email: value("admin-email"),
        phone: value("admin-phone"),
        coverImageUrl: value("admin-cover-image"),
        type: value("admin-type"),
        studyAbroadEnabled: checked("admin-study-abroad-enabled"),
        active: checked("admin-active"),
        verified: checked("admin-verified")
    };
}


function renderInstitutionList(institutions) {

    const container =
        document.querySelector(
            "[data-admin-study-abroad-list]"
        );

    if (!container) {
        return;
    }

    if (!institutions.length) {
        container.innerHTML =
            `<p class="admin-study-abroad-empty">No institutions found.</p>`;
        return;
    }

    container.innerHTML =
        institutions
            .map(
                (institution) => `
                    <article class="admin-study-abroad-item">

                        <div class="admin-study-abroad-item-image">
                            ${
                                institution.coverImageUrl
                                    ? `<img src="${institution.coverImageUrl}" alt="${institution.name}">`
                                    : `<span>🏫</span>`
                            }
                        </div>

                        <div class="admin-study-abroad-item-content">

                            <span class="admin-study-abroad-item-type">
                                ${institution.type || "INSTITUTION"}
                            </span>

                            <h3>${institution.name}</h3>

                            <p>
                                ${[
                                    institution.city,
                                    institution.state,
                                    institution.country
                                ].filter(Boolean).join(", ")}
                            </p>

                            <div class="admin-study-abroad-status-row">
                                <span class="${institution.active ? "status-on" : "status-off"}">
                                    ${institution.active ? "Active" : "Inactive"}
                                </span>
                                <span class="${institution.studyAbroadEnabled ? "status-on" : "status-off"}">
                                    ${institution.studyAbroadEnabled ? "Study Abroad" : "Hidden"}
                                </span>
                                <span class="${institution.verified ? "status-on" : "status-off"}">
                                    ${institution.verified ? "Verified" : "Unverified"}
                                </span>
                            </div>

                        </div>

                        <div class="admin-study-abroad-item-actions">

                            <button
                                type="button"
                                class="admin-secondary-button"
                                data-admin-edit="${institution.id}"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="admin-danger-button"
                                data-admin-delete="${institution.id}"
                            >
                                Delete
                            </button>

                        </div>

                    </article>
                `
            )
            .join("");
}


async function loadInstitutions() {

    try {
        setMessage("Loading institutions...");

        const institutions =
            await getAdminInstitutions();

        renderInstitutionList(institutions);
        setMessage("");

        return institutions;
    }
    catch (error) {
        setMessage(error.message, "error");
        return [];
    }
}


function initializeAdminStudyAbroad() {

    const user =
        getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return;
    }

    const form =
        document.getElementById(
            "admin-study-abroad-form"
        );

    if (!form || form.dataset.initialized === "true") {
        return;
    }

    form.dataset.initialized = "true";

    loadInstitutions();

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            setMessage("Saving institution...");

            const id =
                document.getElementById(
                    "admin-study-abroad-id"
                ).value;

            try {

                if (id) {
                    await updateInstitution(
                        id,
                        createFormData()
                    );

                    setMessage(
                        "Institution updated successfully.",
                        "success"
                    );
                }
                else {
                    await createInstitution(
                        createFormData()
                    );

                    setMessage(
                        "Institution added successfully.",
                        "success"
                    );
                }

                resetForm();
                await loadInstitutions();
            }
            catch (error) {
                setMessage(
                    error.message,
                    "error"
                );
            }
        }
    );


    document.addEventListener(
        "click",
        async (event) => {

            const editButton =
                event.target.closest(
                    "[data-admin-edit]"
                );

            if (editButton) {

                try {
                    const institutions =
                        await getAdminInstitutions();

                    const institution =
                        institutions.find(
                            (item) =>
                                String(item.id) ===
                                String(editButton.dataset.adminEdit)
                        );

                    if (institution) {
                        fillForm(institution);
                    }
                }
                catch (error) {
                    setMessage(error.message, "error");
                }

                return;
            }


            const deleteButton =
                event.target.closest(
                    "[data-admin-delete]"
                );

            if (!deleteButton) {
                return;
            }

            const id =
                deleteButton.dataset.adminDelete;

            if (!window.confirm(
                "Delete this institution from EduConnect?"
            )) {
                return;
            }

            try {

                await deleteInstitution(id);

                setMessage(
                    "Institution deleted successfully.",
                    "success"
                );

                await loadInstitutions();
            }
            catch (error) {
                setMessage(error.message, "error");
            }
        }
    );
}


export default function AdminStudyAbroadPage() {

    const user =
        getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return `
            <main class="admin-access-denied">
                <section>
                    <h1>Admin Access Required</h1>
                    <p>Please log in with an administrator account.</p>
                    <a href="/">Return to EduConnect</a>
                </section>
            </main>
        `;
    }

    setTimeout(
        initializeAdminStudyAbroad,
        0
    );

    return `
        <main class="admin-study-abroad-page">

            <div class="admin-study-abroad-container">

                <div class="admin-study-abroad-header">

                    <div>
                        <span class="admin-study-abroad-eyebrow">
                            EDUCONNECT ADMIN
                        </span>

                        <h1>Manage Study Abroad Institutions</h1>

                        <p>
                            Add, update or remove the partner colleges and universities
                            that appear on the Study Abroad experience.
                        </p>
                    </div>

                    <a href="/admin" class="admin-secondary-button">
                        ← Admin Dashboard
                    </a>

                </div>

                <div
                    class="admin-study-abroad-message"
                    data-admin-study-abroad-message
                ></div>

                <section class="admin-study-abroad-form-card">

                    <h2>Add / Edit Institution</h2>

                    <form id="admin-study-abroad-form">

                        <input
                            type="hidden"
                            id="admin-study-abroad-id"
                        >

                        <div class="admin-form-grid">

                            <div class="admin-form-field full">
                                <label for="admin-name">Institution Name</label>
                                <input id="admin-name" required>
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-description">Description</label>
                                <textarea id="admin-description" rows="4"></textarea>
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-address">Address</label>
                                <input id="admin-address">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-city">City</label>
                                <input id="admin-city">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-state">State / Region</label>
                                <input id="admin-state">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-country">Country</label>
                                <input id="admin-country" required>
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-country-code">Country Code</label>
                                <input id="admin-country-code" maxlength="2">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-type">Institution Type</label>
                                <select id="admin-type" required>
                                    <option value="UNIVERSITY">University</option>
                                    <option value="COLLEGE">College</option>
                                    <option value="INSTITUTION">Institution / Other</option>
                                </select>
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-website">Website</label>
                                <input id="admin-website" type="url">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-email">Email</label>
                                <input id="admin-email" type="email">
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-phone">Phone</label>
                                <input id="admin-phone">
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-cover-image">Cover Image URL</label>
                                <input id="admin-cover-image" type="url">
                            </div>

                        </div>

                        <div class="admin-checkbox-row">

                            <label>
                                <input
                                    type="checkbox"
                                    id="admin-study-abroad-enabled"
                                    checked
                                >
                                Show in Study Abroad
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    id="admin-active"
                                    checked
                                >
                                Active
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    id="admin-verified"
                                    checked
                                >
                                Verified
                            </label>

                        </div>

                        <div class="admin-form-actions">

                            <button
                                type="submit"
                                id="admin-study-abroad-submit"
                                class="admin-primary-button"
                            >
                                Add Institution
                            </button>

                            <button
                                type="button"
                                class="admin-secondary-button"
                                onclick="document.getElementById('admin-study-abroad-form').reset(); document.getElementById('admin-study-abroad-id').value=''; document.getElementById('admin-study-abroad-submit').textContent='Add Institution';"
                            >
                                Clear
                            </button>

                        </div>

                    </form>

                </section>

                <section class="admin-study-abroad-list-card">

                    <div class="admin-study-abroad-list-header">
                        <h2>Current Institutions</h2>
                    </div>

                    <div
                        class="admin-study-abroad-list"
                        data-admin-study-abroad-list
                    ></div>

                </section>

            </div>

        </main>
    `;
}
