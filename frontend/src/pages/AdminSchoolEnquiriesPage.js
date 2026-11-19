import { getCurrentUser, getToken } from "../services/authService.js";
import { API_BASE_URL } from "../config/api.js";

const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function AdminSchoolEnquiriesPage() {
    const user = getCurrentUser();
    if (!user || user.role !== "ADMIN") return `<main class="admin-access-denied"><section><h1>Admin Access Required</h1><p>Please log in with an administrator account.</p><a href="/">Return home</a></section></main>`;
    return `<main class="admin-dashboard-page"><div class="admin-dashboard-container"><div class="admin-dashboard-header"><div><span class="admin-dashboard-eyebrow">SCHOOL DIRECTORY</span><h1>School enquiries</h1><p>Review parent and student enquiries submitted through the directory.</p></div><a href="/admin" class="admin-secondary-button">Admin dashboard</a></div><div id="school-enquiries-content" aria-live="polite">Loading enquiries…</div></div></main>`;
}

export async function initAdminSchoolEnquiriesPage() {
    const root = document.querySelector("#school-enquiries-content");
    if (!root) return;
    const request = async (url, options = {}) => {
        const response = await fetch(`${API_BASE_URL}/api/school-enquiries/admin${url}`, { ...options, headers: { "Content-Type": "application/json", ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}), ...(options.headers || {}) } });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.message || "Could not load school enquiries.");
        return body;
    };
    const render = async () => {
        try {
            const items = await request("");
            root.innerHTML = items.length ? `<div class="admin-table-wrap"><table class="admin-data-table"><thead><tr><th>School</th><th>Student / parent</th><th>Contact</th><th>Grade</th><th>Message</th><th>Submitted</th><th>Status</th></tr></thead><tbody>${items.map(item => `<tr><td>${esc(item.schoolName)}<br><small>${esc(item.city)}</small></td><td>${esc(item.name)}</td><td><a href="mailto:${esc(item.email)}">${esc(item.email)}</a><br>${esc(item.phone)}</td><td>${esc(item.grade)}</td><td>${esc(item.message || "—")}</td><td>${esc(item.createdAt ? new Date(item.createdAt).toLocaleString() : "—")}</td><td><select data-enquiry-status="${esc(item.id)}" aria-label="Status for ${esc(item.schoolName)}"><option value="NEW" ${!item.status || item.status === "NEW" ? "selected" : ""}>New</option><option value="CONTACTED" ${item.status === "CONTACTED" ? "selected" : ""}>Contacted</option><option value="CLOSED" ${item.status === "CLOSED" ? "selected" : ""}>Closed</option></select></td></tr>`).join("")}</tbody></table></div>` : `<p>No school enquiries have been submitted yet.</p>`;
        } catch (error) { root.innerHTML = `<p role="alert">${esc(error.message)} <button type="button" data-retry>Retry</button></p>`; }
    };
    root.addEventListener("change", async event => {
        const select = event.target.closest("[data-enquiry-status]");
        if (!select) return;
        select.disabled = true;
        try { await request(`/${encodeURIComponent(select.dataset.enquiryStatus)}/status?value=${encodeURIComponent(select.value)}`, { method: "PATCH" }); }
        catch (error) { window.alert(error.message); await render(); }
        finally { select.disabled = false; }
    });
    root.addEventListener("click", event => { if (event.target.closest("[data-retry]")) render(); });
    await render();
}
