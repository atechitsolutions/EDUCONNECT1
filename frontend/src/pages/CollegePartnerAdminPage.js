import { getCurrentUser } from "../services/authService.js";
import { createPartnerAccount, getInstitutionsForAdmin, getPartnerAccounts, getPartnerSummary, resetPartnerPassword, setPartnerActive, updatePartnerAccount } from "../services/collegePartnerService.js";
import "../assets/css/college-partner.css";

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
const money = paise => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format((paise || 0) / 100);

export default function CollegePartnerAdminPage() {
    const user = getCurrentUser();
    if (!user || user.role !== "ADMIN") return `<main class="cp-denied"><h1>Administrator access required</h1><p>Sign in with an administrator account to manage college partners.</p><a href="/">Return home</a></main>`;
    return `<main class="cp-admin"><header class="cp-page-head"><div><span class="cp-kicker">EDUCONNECT · PARTNERS</span><h1>College partner management</h1><p>Create controlled partner accounts and review subscription access.</p></div><button class="cp-button cp-button-gold" id="cp-add">Add new college</button></header>
      <section class="cp-kpis" id="cp-kpis"><div class="cp-kpi"><span>Registered partners</span><strong>—</strong></div><div class="cp-kpi"><span>Active accounts</span><strong>—</strong></div><div class="cp-kpi"><span>Active subscriptions</span><strong>—</strong></div><div class="cp-kpi"><span>Recorded page visits</span><strong>—</strong></div><div class="cp-kpi"><span>Submitted enquiries</span><strong>—</strong></div><div class="cp-kpi"><span>Verified monthly revenue</span><strong>—</strong></div></section>
      <section class="cp-panel"><div class="cp-panel-head"><div><span class="cp-kicker">ACCOUNT DIRECTORY</span><h2>College accounts</h2></div><span class="cp-muted" id="cp-count">Loading accounts…</span></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>College</th><th>Username</th><th>Subscription</th><th>Account</th><th>Actions</th></tr></thead><tbody id="cp-accounts"><tr><td colspan="5">Loading partner accounts…</td></tr></tbody></table></div><p class="cp-feedback" id="cp-feedback" role="status"></p></section>
      <dialog class="cp-dialog" id="cp-dialog"><form id="cp-form"><div class="cp-panel-head"><div><span class="cp-kicker">CONTROLLED ACCESS</span><h2>Create a partner account</h2></div><button class="cp-icon-button" type="button" data-close aria-label="Close">×</button></div><label>College record<select name="institutionId" required><option value="">Select a college</option></select></label><p class="cp-note" id="cp-institutions-empty" hidden>No college records are available yet. <a id="cp-add-college-link" class="cp-button cp-button-gold" style="display:inline-flex;margin:8px 0 0;text-decoration:none" href="/admin/study-abroad">Add college record →</a><button id="cp-retry-institutions" class="cp-button cp-button-muted" type="button" hidden>Retry loading</button></p><label>Official college email<input name="officialEmail" type="email" required maxlength="150"></label><div class="cp-form-grid"><label>Contact person<input name="contactPerson" maxlength="120"></label><label>Contact email<input name="contactEmail" type="email" maxlength="150"></label></div><label>Contact number<input name="contactNumber" maxlength="40"></label><label>Username <span class="cp-muted">Leave blank to generate one</span><input name="username" maxlength="40" pattern="[a-zA-Z0-9._-]{4,40}"></label><p class="cp-note">A strong one-time password will be generated. It is shown once and the partner must change it at first sign-in.</p><div class="cp-dialog-actions"><button class="cp-button cp-button-muted" type="button" data-close>Cancel</button><button class="cp-button cp-button-gold" type="submit" disabled>Create account</button></div><p class="cp-feedback" id="cp-form-feedback" role="status"></p></form></dialog>
      <dialog class="cp-dialog cp-credentials" id="cp-credentials"><div class="cp-panel-head"><div><span class="cp-kicker">ONE TIME DISPLAY</span><h2>Partner credentials</h2></div></div><p>Share these credentials securely. The temporary password will not be shown again.</p><div class="cp-credential"><span>Username</span><strong id="cp-username"></strong></div><div class="cp-credential"><span>Temporary password</span><strong id="cp-password"></strong></div><div class="cp-dialog-actions"><button class="cp-button cp-button-muted" id="cp-copy" type="button">Copy credentials</button><button class="cp-button cp-button-gold" data-close type="button">Done</button></div></dialog>
    </main>`;
}

export function initCollegePartnerAdminPage() {
    const root = document.querySelector(".cp-admin"); if (!root) return;
    const accountsBody = root.querySelector("#cp-accounts"), feedback = root.querySelector("#cp-feedback"), dialog = root.querySelector("#cp-dialog"), credentials = root.querySelector("#cp-credentials");
    let editingId = null, lastPartners = [];
    const load = async () => {
        try {
            const [summary, partners] = await Promise.all([getPartnerSummary(), getPartnerAccounts()]); lastPartners = partners;
            const values = [summary.totalPartners, summary.activeAccounts, summary.activeSubscriptions, summary.pageVisits, summary.enquiries, money(summary.monthlyRevenuePaise)];
            root.querySelectorAll(".cp-kpi strong").forEach((el, i) => el.textContent = values[i]);
            root.querySelector("#cp-count").textContent = `${partners.length} accounts`;
            accountsBody.innerHTML = partners.length ? partners.map(p => `<tr><td><strong>${esc(p.collegeName)}</strong><small>${esc(p.officialEmail)}</small></td><td><code>${esc(p.username)}</code></td><td><span class="cp-pill ${p.subscriptionActive ? "is-active" : "is-muted"}">${p.subscriptionActive ? "Active" : "Inactive"}</span>${p.subscriptionExpiresAt ? `<small>Until ${new Date(p.subscriptionExpiresAt).toLocaleDateString()}</small>` : ""}</td><td><span class="cp-pill ${p.active ? "is-active" : "is-muted"}">${p.active ? "Active" : "Inactive"}</span></td><td class="cp-actions"><button class="cp-text-button" data-edit="${p.id}">Edit</button><button class="cp-text-button" data-toggle="${p.id}" data-active="${p.active}">${p.active ? "Deactivate" : "Activate"}</button><button class="cp-text-button" data-reset="${p.id}">Reset password</button></td></tr>`).join("") : `<tr><td colspan="5" class="cp-empty">No partner accounts yet.</td></tr>`;
        } catch (error) { feedback.textContent = error.message; feedback.classList.add("is-error"); }
    };
    const refreshInstitutions = async () => {
        const select = root.querySelector('[name="institutionId"]');
        const submit = root.querySelector("#cp-form button[type=submit]");
        const empty = root.querySelector("#cp-institutions-empty");
        const addCollegeLink = root.querySelector("#cp-add-college-link");
        const retryButton = root.querySelector("#cp-retry-institutions");
        submit.disabled = true;
        select.innerHTML = '<option value="">Loading colleges…</option>';
        try {
            const data = await getInstitutionsForAdmin();
            select.innerHTML = '<option value="">Select a college</option>' + data.map(i => `<option value="${esc(i.id)}">${esc(i.name)}${i.city ? ` · ${esc(i.city)}` : ""}${i.country ? `, ${esc(i.country)}` : ""}</option>`).join("");
            empty.hidden = data.length > 0;
            empty.firstChild.textContent = data.length ? "" : "No college records are available yet. Add records under Admin → Institutions. ";
            addCollegeLink.hidden = data.length > 0;
            retryButton.hidden = true;
            submit.disabled = data.length === 0;
            return data;
        } catch (error) {
            select.innerHTML = '<option value="">Could not load colleges</option>';
            empty.hidden = false;
            empty.firstChild.textContent = `Cannot reach the backend at localhost:8080 (${error.message}). Start MySQL and the Spring Boot backend, then retry. `;
            addCollegeLink.hidden = true;
            retryButton.hidden = false;
            return [];
        }
    };
    const openCreateDialog = async institutionId => {
        editingId = null;
        const form = root.querySelector("#cp-form");
        form.reset();
        form.elements.institutionId.disabled = false;
        form.querySelector("h2").textContent = "Create a partner account";
        form.querySelector("button[type=submit]").textContent = "Create account";
        dialog.showModal();
        const institutions = await refreshInstitutions();
        if (institutionId) {
            form.elements.institutionId.value = String(institutionId);
            const institution = institutions.find(item => String(item.id) === String(institutionId));
            if (institution) {
                form.elements.officialEmail.value = institution.email || "";
                form.elements.contactEmail.value = institution.email || "";
                form.elements.contactNumber.value = institution.phone || "";
            }
        }
    };
    credentials.addEventListener("close", () => { root.querySelector("#cp-password").textContent = ""; root.querySelector("#cp-username").textContent = ""; });
    load();
    root.querySelector("#cp-add").addEventListener("click", () => openCreateDialog());
    const requestedInstitutionId = new URLSearchParams(window.location.search).get("institutionId");
    if (requestedInstitutionId) openCreateDialog(requestedInstitutionId);
    root.querySelector("#cp-retry-institutions").addEventListener("click", async () => {
        const institutions = await refreshInstitutions();
        if (requestedInstitutionId && institutions.length) root.querySelector('[name="institutionId"]').value = requestedInstitutionId;
    });
    root.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
    root.querySelector("#cp-form").addEventListener("submit", async event => { event.preventDefault(); const form = event.currentTarget, status = root.querySelector("#cp-form-feedback"), data = Object.fromEntries(new FormData(form)); data.institutionId = Number(form.elements.institutionId.value); status.textContent = editingId ? "Saving changes…" : "Creating account…"; try { if (editingId) { await updatePartnerAccount(editingId, data); dialog.close(); form.reset(); } else { const result = await createPartnerAccount(data); dialog.close(); form.reset(); root.querySelector("#cp-username").textContent = result.username; root.querySelector("#cp-password").textContent = result.temporaryPassword; credentials.showModal(); } await load(); } catch (error) { status.textContent = error.message; status.classList.add("is-error"); } });
    accountsBody.addEventListener("click", async event => { const button = event.target.closest("button"); if (!button) return; try { if (button.dataset.edit) { const p = lastPartners.find(item => item.id === Number(button.dataset.edit)); if (!p) return; editingId = p.id; const form = root.querySelector("#cp-form"); form.elements.institutionId.value = p.institutionId; form.elements.institutionId.disabled = true; form.elements.officialEmail.value = p.officialEmail || ""; form.elements.contactPerson.value = p.contactPerson || ""; form.elements.contactEmail.value = p.contactEmail || ""; form.elements.contactNumber.value = p.contactNumber || ""; form.elements.username.value = p.username || ""; form.querySelector("h2").textContent = `Edit ${p.collegeName}`; form.querySelector("button[type=submit]").textContent = "Save changes"; dialog.showModal(); return; } if (button.dataset.toggle) await setPartnerActive(button.dataset.toggle, button.dataset.active !== "true"); if (button.dataset.reset) { const result = await resetPartnerPassword(button.dataset.reset); root.querySelector("#cp-username").textContent = result.username; root.querySelector("#cp-password").textContent = result.temporaryPassword; credentials.showModal(); } await load(); } catch (error) { feedback.textContent = error.message; feedback.classList.add("is-error"); } });
    root.querySelector("#cp-copy").addEventListener("click", async () => { await navigator.clipboard.writeText(`Username: ${root.querySelector("#cp-username").textContent}\nTemporary password: ${root.querySelector("#cp-password").textContent}`); root.querySelector("#cp-copy").textContent = "Copied"; });
}
