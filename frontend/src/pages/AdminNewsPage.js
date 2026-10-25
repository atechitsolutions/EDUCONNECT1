import { getCurrentUser } from "../services/authService.js";
import {
    createNews,
    deleteNews,
    getAdminNews,
    updateNews
} from "../services/homeContent.js";

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function field(id) {
    return document.getElementById(id)?.value.trim() || "";
}

function checked(id) {
    return Boolean(document.getElementById(id)?.checked);
}

function setMessage(message, type = "") {
    const element = document.querySelector("[data-admin-news-message]");
    if (!element) {
        return;
    }
    element.textContent = message;
    element.className = `admin-content-message ${type}`;
}

function resetForm() {
    document.getElementById("admin-news-form")?.reset();
    const id = document.getElementById("admin-news-id");
    if (id) id.value = "";
    const button = document.getElementById("admin-news-submit");
    if (button) button.textContent = "Add News";
}

function fillForm(news) {
    document.getElementById("admin-news-id").value = news.id || "";
    document.getElementById("admin-news-title").value = news.title || "";
    document.getElementById("admin-news-subtitle").value = news.subtitle || "";
    document.getElementById("admin-news-description").value = news.description || "";
    document.getElementById("admin-news-category").value = news.category || "";
    document.getElementById("admin-news-country").value = news.country || "";
    document.getElementById("admin-news-image").value = news.imageUrl || "";
    document.getElementById("admin-news-published").checked = news.published === true;
    document.getElementById("admin-news-submit").textContent = "Update News";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function formData() {
    return {
        title: field("admin-news-title"),
        subtitle: field("admin-news-subtitle"),
        description: field("admin-news-description"),
        category: field("admin-news-category"),
        country: field("admin-news-country"),
        imageUrl: field("admin-news-image"),
        published: checked("admin-news-published")
    };
}

function renderList(items) {
    const container = document.querySelector("[data-admin-news-list]");
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `<p class="admin-empty-state">No news found.</p>`;
        return;
    }

    container.innerHTML = items.map((news) => `
        <article class="admin-content-item">
            <div class="admin-content-item-main">
                ${news.imageUrl ? `<img src="${escapeHtml(news.imageUrl)}" alt="${escapeHtml(news.title)}">` : ""}
                <div>
                    <span class="admin-content-badge">${escapeHtml(news.category)}</span>
                    <h3>${escapeHtml(news.title)}</h3>
                    <p>${escapeHtml(news.subtitle || "")}</p>
                    <small>${news.published ? "Published" : "Draft"}</small>
                </div>
            </div>
            <div class="admin-content-item-actions">
                <button type="button" class="admin-secondary-button" data-admin-news-edit="${news.id}">Edit</button>
                <button type="button" class="admin-danger-button" data-admin-news-delete="${news.id}">Delete</button>
            </div>
        </article>
    `).join("");
}

function initialize() {
    const form = document.getElementById("admin-news-form");
    if (!form || form.dataset.initialized === "true") return;
    form.dataset.initialized = "true";

    let currentItems = [];

    async function load() {
        try {
            currentItems = await getAdminNews();
            renderList(Array.isArray(currentItems) ? currentItems : []);
        } catch (error) {
            setMessage(error.message, "error");
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = field("admin-news-id");

        try {
            if (id) {
                await updateNews(id, formData());
                setMessage("News updated successfully.", "success");
            } else {
                await createNews(formData());
                setMessage("News added successfully.", "success");
            }

            resetForm();
            await load();
        } catch (error) {
            setMessage(error.message, "error");
        }
    });

    document.addEventListener("click", async (event) => {
        const edit = event.target.closest("[data-admin-news-edit]");
        if (edit) {
            const item = currentItems.find(
                (news) => String(news.id) === String(edit.dataset.adminNewsEdit)
            );
            if (item) fillForm(item);
            return;
        }

        const remove = event.target.closest("[data-admin-news-delete]");
        if (!remove) return;

        if (!window.confirm("Delete this news item?")) return;

        try {
            await deleteNews(remove.dataset.adminNewsDelete);
            setMessage("News deleted successfully.", "success");
            await load();
        } catch (error) {
            setMessage(error.message, "error");
        }
    });

    document.querySelector("[data-admin-news-clear]")?.addEventListener("click", resetForm);
    load();
}

export default function AdminNewsPage() {
    const user = getCurrentUser();
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

    setTimeout(initialize, 0);

    return `
        <main class="admin-content-page">
            <div class="admin-content-container">
                <div class="admin-content-header">
                    <div>
                        <span class="admin-dashboard-eyebrow">EDUCONNECT ADMIN</span>
                        <h1>Manage News</h1>
                        <p>Create the homepage news that users can open through Read More.</p>
                    </div>
                    <a href="/admin" class="admin-secondary-button">← Admin Dashboard</a>
                </div>

                <div class="admin-content-message" data-admin-news-message></div>

                <section class="admin-content-form-card">
                    <h2>Add / Edit News</h2>
                    <form id="admin-news-form">
                        <input type="hidden" id="admin-news-id">

                        <div class="admin-form-grid">
                            <div class="admin-form-field full">
                                <label for="admin-news-title">Title</label>
                                <input id="admin-news-title" maxlength="200" required>
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-news-subtitle">Subtitle / Brief</label>
                                <input id="admin-news-subtitle" maxlength="250">
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-news-description">Full Details</label>
                                <textarea id="admin-news-description" rows="8" maxlength="2000" required></textarea>
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-news-category">Category</label>
                                <input id="admin-news-category" maxlength="80" required>
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-news-country">Country</label>
                                <input id="admin-news-country" maxlength="80">
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-news-image">Image URL</label>
                                <input id="admin-news-image" type="url" maxlength="1000">
                            </div>
                        </div>

                        <label class="admin-checkbox-row single">
                            <input id="admin-news-published" type="checkbox" checked>
                            Publish on Home Page
                        </label>

                        <div class="admin-form-actions">
                            <button id="admin-news-submit" class="admin-primary-button" type="submit">Add News</button>
                            <button class="admin-secondary-button" type="button" data-admin-news-clear>Clear</button>
                        </div>
                    </form>
                </section>

                <section class="admin-content-list-card">
                    <div class="admin-content-list-header">
                        <h2>Existing News</h2>
                    </div>
                    <div data-admin-news-list></div>
                </section>
            </div>
        </main>
    `;
}
