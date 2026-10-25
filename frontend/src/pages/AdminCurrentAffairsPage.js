import { getCurrentUser } from "../services/authService.js";
import {
    createCurrentAffair,
    deleteCurrentAffair,
    getAdminCurrentAffairs,
    updateCurrentAffair
} from "../services/homeContent.js";

/* =========================
   HELPERS
========================= */

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
    const element = document.querySelector(
        "[data-admin-current-affairs-message]"
    );

    if (!element) return;

    element.textContent = message;
    element.className = `admin-content-message ${type}`;
}

function resetForm() {
    document.getElementById(
        "admin-current-affairs-form"
    )?.reset();

    const id = document.getElementById(
        "admin-current-affairs-id"
    );

    if (id) id.value = "";

    const button = document.getElementById(
        "admin-current-affairs-submit"
    );

    if (button) button.textContent = "Add Current Affair";

    const active = document.getElementById(
        "admin-current-affairs-active"
    );

    if (active) active.checked = true;

    const order = document.getElementById(
        "admin-current-affairs-sort-order"
    );

    if (order) order.value = "0";
}

function fillForm(item) {
    document.getElementById(
        "admin-current-affairs-id"
    ).value = item.id ?? "";

    document.getElementById(
        "admin-current-affairs-title"
    ).value = item.title ?? "";

    document.getElementById(
        "admin-current-affairs-subtitle"
    ).value = item.subtitle ?? "";

    document.getElementById(
        "admin-current-affairs-description"
    ).value = item.description ?? "";

    document.getElementById(
        "admin-current-affairs-icon"
    ).value = item.icon ?? "";

    document.getElementById(
        "admin-current-affairs-target-url"
    ).value = item.targetUrl ?? "";

    document.getElementById(
        "admin-current-affairs-active"
    ).checked = item.active === true;

    document.getElementById(
        "admin-current-affairs-sort-order"
    ).value = item.sortOrder ?? 0;

    document.getElementById(
        "admin-current-affairs-submit"
    ).textContent = "Update Current Affair";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function formData() {
    return {
        title: field("admin-current-affairs-title"),
        subtitle: field("admin-current-affairs-subtitle"),
        description: field("admin-current-affairs-description"),
        type: "CURRENT_AFFAIRS",
        icon: field("admin-current-affairs-icon"),
        targetUrl: field("admin-current-affairs-target-url"),
        active: checked("admin-current-affairs-active"),
        sortOrder: Number(
            field("admin-current-affairs-sort-order") || 0
        )
    };
}

/* =========================
   RENDER CURRENT AFFAIRS
========================= */

function renderList(items) {
    const container = document.querySelector(
        "[data-admin-current-affairs-list]"
    );

    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
            <p class="admin-empty-state">
                No current affairs found.
            </p>
        `;
        return;
    }

    container.innerHTML = items.map(item => `
        <article class="admin-content-item">
            <div class="admin-content-item-main">
                <div>
                    <span class="admin-content-badge">
                        ${escapeHtml(item.icon || "CURRENT AFFAIRS")}
                    </span>

                    <h3>${escapeHtml(item.title)}</h3>

                    <p>${escapeHtml(item.subtitle)}</p>

                    <small>
                        ${item.active ? "Active" : "Inactive"}
                        · Display order: ${Number(item.sortOrder ?? 0)}
                    </small>

                    ${
                        item.targetUrl
                            ? `
                                <p>
                                    <a
                                        href="${escapeHtml(item.targetUrl)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open target link
                                    </a>
                                </p>
                            `
                            : ""
                    }
                </div>
            </div>

            <div class="admin-content-item-actions">
                <button
                    type="button"
                    class="admin-secondary-button"
                    data-current-affair-edit="${escapeHtml(item.id)}"
                >
                    Edit
                </button>

                <button
                    type="button"
                    class="admin-danger-button"
                    data-current-affair-delete="${escapeHtml(item.id)}"
                >
                    Delete
                </button>
            </div>
        </article>
    `).join("");
}

/* =========================
   INITIALIZE PAGE
========================= */

function initialize() {
    const form = document.getElementById(
        "admin-current-affairs-form"
    );

    if (!form || form.dataset.initialized === "true") return;

    form.dataset.initialized = "true";

    let currentItems = [];

    async function load() {
        try {
            currentItems = await getAdminCurrentAffairs();

            renderList(
                Array.isArray(currentItems) ? currentItems : []
            );
        } catch (error) {
            setMessage(
                error.message || "Unable to load current affairs.",
                "error"
            );
        }
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const id = field("admin-current-affairs-id");

        try {
            const data = formData();

            if (id) {
                await updateCurrentAffair(id, data);

                setMessage(
                    "Current affair updated successfully.",
                    "success"
                );
            } else {
                await createCurrentAffair(data);

                setMessage(
                    "Current affair added successfully.",
                    "success"
                );
            }

            resetForm();
            await load();
        } catch (error) {
            setMessage(
                error.message || "Unable to save current affair.",
                "error"
            );
        }
    });

    // Keep event handling limited to this page.
  document.addEventListener("click", async event => {
      if (!(event.target instanceof Element)) return;

      const edit = event.target.closest(
          "[data-current-affair-edit]"
      );

      if (edit) {
          const item = currentItems.find(
              entry =>
                  String(entry.id) ===
                  String(edit.dataset.currentAffairEdit)
          );

          if (item) {
              fillForm(item);
          }

          return;
      }

      const remove = event.target.closest(
          "[data-current-affair-delete]"
      );

      if (!remove) return;

      if (!window.confirm("Delete this current affair?")) return;

      try {
          await deleteCurrentAffair(
              remove.dataset.currentAffairDelete
          );

          setMessage(
              "Current affair deleted successfully.",
              "success"
          );

          await load();
      } catch (error) {
          setMessage(
              error.message || "Unable to delete current affair.",
              "error"
          );
      }
  });
    document
        .querySelector("[data-admin-current-affairs-clear]")
        ?.addEventListener("click", resetForm);

    load();
}

/* =========================
   PAGE COMPONENT
========================= */

export default function AdminCurrentAffairsPage() {
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
                        <span class="admin-dashboard-eyebrow">
                            EDUCONNECT ADMIN
                        </span>

                        <h1>Manage Current Affairs</h1>

                        <p>
                            Create and manage Current Affairs
                            independently from homepage News.
                        </p>
                    </div>

                    <a
                        href="/admin"
                        class="admin-secondary-button"
                    >
                        ← Admin Dashboard
                    </a>
                </div>

                <div
                    class="admin-content-message"
                    data-admin-current-affairs-message
                ></div>

                <section class="admin-content-form-card">
                    <h2>Add / Edit Current Affairs</h2>

                    <form id="admin-current-affairs-form">
                        <input
                            type="hidden"
                            id="admin-current-affairs-id"
                        >

                        <div class="admin-form-grid">

                            <div class="admin-form-field full">
                                <label for="admin-current-affairs-title">
                                    Title
                                </label>

                                <input
                                    id="admin-current-affairs-title"
                                    maxlength="200"
                                    required
                                >
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-current-affairs-subtitle">
                                    Subtitle / Brief
                                </label>

                                <input
                                    id="admin-current-affairs-subtitle"
                                    maxlength="250"
                                    required
                                >
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-current-affairs-description">
                                    Full Details
                                </label>

                                <textarea
                                    id="admin-current-affairs-description"
                                    rows="6"
                                    maxlength="2000"
                                ></textarea>
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-current-affairs-icon">
                                    Icon
                                </label>

                                <input
                                    id="admin-current-affairs-icon"
                                    maxlength="40"
                                    placeholder="Example: 📰"
                                >
                            </div>

                            <div class="admin-form-field">
                                <label for="admin-current-affairs-sort-order">
                                    Display Order
                                </label>

                                <input
                                    id="admin-current-affairs-sort-order"
                                    type="number"
                                    step="1"
                                    value="0"
                                    required
                                >
                            </div>

                            <div class="admin-form-field full">
                                <label for="admin-current-affairs-target-url">
                                    Target URL (optional)
                                </label>

                                <input
                                    id="admin-current-affairs-target-url"
                                    type="url"
                                    maxlength="1000"
                                    placeholder="https://example.com/article"
                                >
                            </div>

                        </div>

                        <label class="admin-checkbox-row single">
                            <input
                                id="admin-current-affairs-active"
                                type="checkbox"
                                checked
                            >

                            Active
                        </label>

                        <div class="admin-form-actions">
                            <button
                                id="admin-current-affairs-submit"
                                class="admin-primary-button"
                                type="submit"
                            >
                                Add Current Affair
                            </button>

                            <button
                                class="admin-secondary-button"
                                type="button"
                                data-admin-current-affairs-clear
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </section>

                <section class="admin-content-list-card">
                    <div class="admin-content-list-header">
                        <h2>Existing Current Affairs</h2>
                    </div>

                    <div data-admin-current-affairs-list></div>
                </section>

            </div>
        </main>
    `;
}