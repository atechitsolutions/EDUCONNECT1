import { getCurrentUser } from "../services/authService.js";
import { createPartnerAccount, getInstitutionsForAdmin, getPartnerAccounts, getPartnerSummary, resetPartnerPassword, setPartnerActive, updatePartnerAccount, getAdminInterest, getAdminStudentInterest, sendAdminInterestNotification, getAdminInterestHistory, markAdminNotificationReviewed, getAdminSubscriptions, getAdminSubscriptionHistory, activateAdminPremium, setAdminSubscriptionStatus } from "../services/collegePartnerService.js";
import "../assets/css/college-partner.css";

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
const money = paise => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format((paise || 0) / 100);

export default function CollegePartnerAdminPage() {
    const user = getCurrentUser();
    if (!user || user.role !== "ADMIN") return `<main class="cp-denied"><h1>Administrator access required</h1><p>Sign in with an administrator account to manage college partners.</p><a href="/">Return home</a></main>`;
    return `<main class="cp-admin"><header class="cp-page-head"><div><span class="cp-kicker">EDUCONNECT · PARTNERS</span><h1>College partner management</h1><p>Create controlled partner accounts and review subscription access.</p></div><button class="cp-button cp-button-gold" id="cp-add">Add new college</button></header>
      <section class="cp-kpis" id="cp-kpis"><div class="cp-kpi"><span>Registered partners</span><strong>—</strong></div><div class="cp-kpi"><span>Active accounts</span><strong>—</strong></div><div class="cp-kpi"><span>Active subscriptions</span><strong>—</strong></div><div class="cp-kpi"><span>Recorded page visits</span><strong>—</strong></div><div class="cp-kpi"><span>Submitted enquiries</span><strong>—</strong></div><div class="cp-kpi"><span>Payment gateway</span><strong>Unavailable</strong><small>No verified payment records are available.</small></div></section>
      <section class="cp-panel" id="cp-interest"><div class="cp-panel-head"><div><span class="cp-kicker">ADMIN CONTROL CENTRE</span><h2>College Interest &amp; Lead Notifications</h2><p>Review cross-institution student activity and send targeted one-way alerts.</p></div><button class="cp-button cp-button-muted" id="cp-interest-refresh">Refresh</button></div><div class="cp-kpis"><div class="cp-kpi"><span>Students exploring multiple institutions</span><strong id="cp-interest-total">—</strong></div><div class="cp-kpi"><span>New alerts</span><strong id="cp-interest-new">—</strong></div><div class="cp-kpi"><span>Contact-sharing eligible enquiries</span><strong id="cp-interest-eligible">—</strong></div></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>Student</th><th>Institutions</th><th>Recorded activity</th><th>Latest activity</th><th>Review</th></tr></thead><tbody id="cp-interest-students"><tr><td colspan="5">Loading student interest…</td></tr></tbody></table></div><div id="cp-interest-detail"></div></section>
      <section class="cp-panel"><div class="cp-panel-head"><div><span class="cp-kicker">AUDIT TRAIL</span><h2>Notification history</h2></div></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>Target institution</th><th>Student</th><th>Alert</th><th>Status</th><th>Sent</th><th>Action</th></tr></thead><tbody id="cp-interest-history"><tr><td colspan="6">Loading history…</td></tr></tbody></table></div></section>
      <section class="cp-panel" id="cp-subscription-management"><div class="cp-panel-head"><div><span class="cp-kicker">PLAN ACCESS &amp; PAYMENT VERIFICATION</span><h2>Free and Premium subscriptions</h2><p>Offline Premium activation requires an independently verified payment reference and an audit note. Yearly billing is not configured.</p></div><button class="cp-button cp-button-muted" id="cp-subscriptions-refresh">Refresh</button></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>Institution</th><th>Partner login</th><th>Plan</th><th>Status</th><th>Dates</th><th>Payment</th><th>Admin actions</th></tr></thead><tbody id="cp-subscriptions"><tr><td colspan="7">Loading subscriptions…</td></tr></tbody></table></div><div class="cp-panel-head"><div><span class="cp-kicker">AUDIT HISTORY</span><h3>Activation and status changes</h3></div></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>Institution</th><th>Action</th><th>Admin</th><th>Reference</th><th>Note</th><th>Date</th></tr></thead><tbody id="cp-subscription-audit"><tr><td colspan="6">Loading audit history…</td></tr></tbody></table></div></section>
      <section class="cp-panel"><div class="cp-panel-head"><div><span class="cp-kicker">ACCOUNT DIRECTORY</span><h2>College accounts</h2></div><span class="cp-muted" id="cp-count">Loading accounts…</span></div><div class="cp-table-wrap"><table class="cp-table"><thead><tr><th>College</th><th>Username</th><th>Subscription</th><th>Account</th><th>Actions</th></tr></thead><tbody id="cp-accounts"><tr><td colspan="5">Loading partner accounts…</td></tr></tbody></table></div><p class="cp-feedback" id="cp-feedback" role="status"></p></section>
      <dialog class="cp-dialog" id="cp-dialog"><form id="cp-form"><div class="cp-panel-head"><div><span class="cp-kicker">CONTROLLED ACCESS</span><h2>Create a partner account</h2></div><button class="cp-icon-button" type="button" data-close aria-label="Close">×</button></div><label>College record<select name="institutionId" required><option value="">Select a college</option></select></label><p class="cp-note" id="cp-institutions-empty" hidden>No college records are available yet. <a id="cp-add-college-link" class="cp-button cp-button-gold" style="display:inline-flex;margin:8px 0 0;text-decoration:none" href="/admin/study-abroad">Add college record →</a><button id="cp-retry-institutions" class="cp-button cp-button-muted" type="button" hidden>Retry loading</button></p><label>Official college email<input name="officialEmail" type="email" required maxlength="150"></label><div class="cp-form-grid"><label>Contact person<input name="contactPerson" maxlength="120"></label><label>Contact email<input name="contactEmail" type="email" maxlength="150"></label></div><label>Contact number<input name="contactNumber" maxlength="40"></label><label>Username <span class="cp-muted">Leave blank to generate one</span><input name="username" maxlength="40" pattern="[a-zA-Z0-9._-]{4,40}"></label><p class="cp-note">A strong one-time password will be generated. It is shown once and the partner must change it at first sign-in.</p><div class="cp-dialog-actions"><button class="cp-button cp-button-muted" type="button" data-close>Cancel</button><button class="cp-button cp-button-gold" type="submit" disabled>Create account</button></div><p class="cp-feedback" id="cp-form-feedback" role="status"></p></form></dialog>
      <dialog class="cp-dialog cp-credentials" id="cp-credentials"><div class="cp-panel-head"><div><span class="cp-kicker">ONE TIME DISPLAY</span><h2>Partner credentials</h2></div></div><p>Share these credentials securely. The temporary password will not be shown again.</p><div class="cp-credential"><span>Username</span><strong id="cp-username"></strong></div><div class="cp-credential"><span>Temporary password</span><strong id="cp-password"></strong></div><div class="cp-dialog-actions"><button class="cp-button cp-button-muted" id="cp-copy" type="button">Copy credentials</button><button class="cp-button cp-button-gold" data-close type="button">Done</button></div></dialog>
    </main>`;
}

export function initCollegePartnerAdminPage() {
    const root = document.querySelector(".cp-admin"); if (!root) return;
    const accountsBody = root.querySelector("#cp-accounts"), feedback = root.querySelector("#cp-feedback"), dialog = root.querySelector("#cp-dialog"), credentials = root.querySelector("#cp-credentials");
    let editingId = null, lastPartners = [];
    let interestRefresh = async () => {};
    const load = async () => {
        try {
            const [summary, partners] = await Promise.all([getPartnerSummary(), getPartnerAccounts()]); lastPartners = partners;
            const values = [summary.totalPartners, summary.activeAccounts, summary.activeSubscriptions, summary.pageVisits, summary.enquiries];
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
    const loadInterest = async () => {
        const [interest, history] = await Promise.all([getAdminInterest(), getAdminInterestHistory()]);
        root.querySelector("#cp-interest-total").textContent = interest.studentsExploringMultipleInstitutions;
        root.querySelector("#cp-interest-new").textContent = interest.newNotifications;
        root.querySelector("#cp-interest-eligible").textContent = interest.eligibleEnquiries;
        const body = root.querySelector("#cp-interest-students");
        body.innerHTML = interest.students.length ? interest.students.map(s => `<tr><td><strong>${esc(s.student)}</strong><small>Student ID ${esc(s.studentId)}</small></td><td>${esc(s.institutionCount)} institutions</td><td>${esc(s.activityCount)} meaningful events</td><td>${new Date(s.latestActivity).toLocaleString()}</td><td><button class="cp-text-button" data-student-interest="${esc(s.studentId)}">Review &amp; choose target</button></td></tr>`).join("") : `<tr><td colspan="5" class="cp-empty">No cross-institution student activity recorded in the last 90 days.</td></tr>`;
        root.querySelector("#cp-interest-history").innerHTML = history.length ? history.map(n => `<tr><td>${esc(n.institution)}</td><td>${esc(n.student)}</td><td>${esc(n.title)}</td><td>${esc(n.status)}</td><td>${new Date(n.createdAt).toLocaleString()}</td><td>${n.reviewedAt ? "Reviewed" : `<button class="cp-text-button" data-reviewed="${esc(n.id)}">Mark reviewed</button>`}</td></tr>`).join("") : `<tr><td colspan="6" class="cp-empty">No alerts have been sent.</td></tr>`;
    };
    const loadSubscriptions = async () => {
        const [subscriptions, history] = await Promise.all([getAdminSubscriptions(), getAdminSubscriptionHistory()]);
        root.querySelector("#cp-subscriptions").innerHTML = subscriptions.map(item => `<tr><td><strong>${esc(item.institution)}</strong></td><td><code>${esc(item.username)}</code></td><td><span class="cp-pill ${item.plan === "PREMIUM" ? "is-active" : "is-muted"}">${esc(item.plan)}</span></td><td>${esc(item.status)}</td><td>${item.startsAt ? `${new Date(item.startsAt).toLocaleDateString()} – ${new Date(item.expiresAt).toLocaleDateString()}` : "—"}</td><td>${esc(item.paymentStatus)}<small>${esc(item.paymentReference || "No payment reference")}</small></td><td class="cp-actions">${item.plan === "PREMIUM" ? `<button class="cp-text-button" data-sub-status="SUSPENDED" data-account="${esc(item.accountId)}">Suspend</button><button class="cp-text-button" data-sub-status="CANCELLED" data-account="${esc(item.accountId)}">Cancel</button><button class="cp-text-button" data-sub-status="EXPIRED" data-account="${esc(item.accountId)}">Expire</button>` : `<button class="cp-text-button" data-activate-premium="${esc(item.accountId)}">Verify payment &amp; activate Premium</button>`}</td></tr>`).join("") || `<tr><td colspan="7" class="cp-empty">No college partner accounts.</td></tr>`;
        root.querySelector("#cp-subscription-audit").innerHTML = history.map(item => `<tr><td>${esc(item.institution)}</td><td>${esc(item.action)}</td><td>${esc(item.admin)}</td><td>${esc(item.paymentReference || "—")}</td><td>${esc(item.note || "—")}</td><td>${new Date(item.date).toLocaleString()}</td></tr>`).join("") || `<tr><td colspan="6" class="cp-empty">No subscription changes have been recorded.</td></tr>`;
    };
    interestRefresh = () => loadInterest().catch(error => { root.querySelector("#cp-feedback").textContent = error.message; root.querySelector("#cp-feedback").classList.add("is-error"); });
    interestRefresh();
    loadSubscriptions().catch(error => { feedback.textContent = error.message; feedback.classList.add("is-error"); });
    root.querySelector("#cp-subscriptions-refresh").addEventListener("click", () => loadSubscriptions().catch(error => { feedback.textContent = error.message; feedback.classList.add("is-error"); }));
    root.querySelector("#cp-subscriptions").addEventListener("click", async event => {
        const activate = event.target.closest("[data-activate-premium]"), statusButton = event.target.closest("[data-sub-status]");
        try {
            if (activate) {
                const paymentReference = prompt("Enter the payment reference you independently verified:"); if (!paymentReference?.trim()) return;
                const note = prompt("Record how/when payment was verified:"); if (!note?.trim()) return;
                if (!confirm("Confirm that you independently verified this ₹999 monthly payment and activate Premium access?")) return;
                await activateAdminPremium(activate.dataset.activatePremium, paymentReference.trim(), note.trim());
            } else if (statusButton) {
                const note = prompt(`Reason for ${statusButton.dataset.subStatus.toLowerCase()} this subscription:`); if (note === null) return;
                if (!confirm(`Confirm ${statusButton.dataset.subStatus.toLowerCase()} this subscription for the college?`)) return;
                await setAdminSubscriptionStatus(statusButton.dataset.account, statusButton.dataset.subStatus, note.trim());
            } else return;
            await loadSubscriptions();
        } catch (error) { feedback.textContent = error.message; feedback.classList.add("is-error"); }
    });
    root.querySelector("#cp-interest-refresh").addEventListener("click", interestRefresh);
    root.querySelector("#cp-interest-students").addEventListener("click", async event => {
        const button = event.target.closest("[data-student-interest]"); if (!button) return;
        try {
            const detail = await getAdminStudentInterest(button.dataset.studentInterest);
            const options = detail.institutions.map(i => `<option value="${esc(i.institutionId)}">${esc(i.institution)} · ${esc(i.events.join(", "))}</option>`).join("");
            const dest = root.querySelector("#cp-interest-detail");
            dest.innerHTML = `<article class="cp-kpi"><div><span class="cp-kicker">MASKED STUDENT ACTIVITY</span><h3>${esc(detail.student)} · ID ${esc(detail.studentId)}</h3><p>${esc(detail.institutionCount)} institutions · ${esc(detail.activityCount)} events · First ${new Date(detail.firstActivity).toLocaleString()} · Latest ${new Date(detail.latestActivity).toLocaleString()}</p><ul>${detail.institutions.map(i => `<li><strong>${esc(i.institution)}</strong>: ${esc(i.events.join(", "))}; ${esc(i.visits)} events; courses: ${esc(i.courses.join(", ") || "not recorded")}</li>`).join("")}</ul><p>Contact sharing consented institution IDs: ${esc(detail.consentTargets.join(", ") || "none recorded")}</p><label>Target institution<select id="cp-interest-target">${options}</select></label><p id="cp-interest-preview">Select a target to review its alert.</p><button class="cp-button cp-button-gold" id="cp-interest-send" type="button">Preview &amp; send alert</button><p class="cp-feedback" id="cp-interest-send-status" role="status"></p></div></article>`;
            const selector = dest.querySelector("#cp-interest-target"), preview = dest.querySelector("#cp-interest-preview");
            const updatePreview = () => { const chosen = detail.institutions.find(i => String(i.institutionId) === selector.value); const others = detail.institutions.filter(i => String(i.institutionId) !== selector.value).map(i => i.institution); preview.textContent = `Preview: A student who explored ${chosen?.institution || "this institution"} has also viewed ${others.join(", ")}. Wording reflects recorded activity only; no enquiry is implied.`; };
            selector.addEventListener("change", updatePreview); updatePreview();
            dest.querySelector("#cp-interest-send").addEventListener("click", async () => { const chosen = detail.institutions.find(i => String(i.institutionId) === selector.value); if (!chosen || !confirm(`Send this one-way alert to ${chosen.institution}? You cannot send another alert to the same target for this student today.`)) return; const status = dest.querySelector("#cp-interest-send-status"); try { await sendAdminInterestNotification(detail.studentId, Number(selector.value)); status.textContent = "Alert sent and recorded in the audit history."; await interestRefresh(); } catch (error) { status.textContent = error.message; status.classList.add("is-error"); } });
        } catch (error) { root.querySelector("#cp-feedback").textContent = error.message; }
    });
    root.querySelector("#cp-interest-history").addEventListener("click", async event => { const button = event.target.closest("[data-reviewed]"); if (!button) return; await markAdminNotificationReviewed(button.dataset.reviewed); await interestRefresh(); });
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
