import { getCurrentUser, getToken } from "../services/authService.js";
import {
    getAdmissionPartnerDashboard,
    submitPartnerReferral,
} from "../services/admissionPartnerService.js";
import "../assets/css/admission-partners.css";
import "../assets/css/admission-partner-workspace.css";
import "../assets/css/admission-partner-light.css";
const safe = (v) =>
    String(v ?? "—").replace(
        /[&<>"']/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
const money = (v) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Number(v || 0));

export default function AdmissionPartnerDashboardPage() {
    const user = getCurrentUser() || { fullName: "Partner", email: "" };
    if (!getToken())
        return `<main class="ap-workspace"><section class="ap-workspace-panel ap-access-panel"><p class="ap-eyebrow">STEPINSTUDENTS · PARTNER WORKSPACE</p><h1>Sign in to your partner account</h1><p>Use the StepInStudents account linked to your approved partner application.</p><div class="ap-actions"><button class="ap-button ap-button-primary" type="button" data-open-login>Sign in <span aria-hidden="true">↗</span></button><a class="ap-button ap-button-secondary" href="/admission-partners">Partner information</a></div></section></main>`;
    return `<main class="ap-workspace" id="ap-partner-workspace"><header class="ap-workspace-head"><div><p class="ap-eyebrow">StepInStudents · PARTNER WORKSPACE</p><h1>Good to see you, ${safe(user.fullName || user.email)}</h1><p>Your referrals and recorded commission activity.</p></div><div class="ap-code-card"><span>Your referral code</span><strong id="ap-referral-code">Loading…</strong><button type="button" id="ap-copy-link">Copy referral link</button></div></header><nav class="ap-dashboard-nav" aria-label="Partner dashboard sections"><a href="#ap-overview">Overview</a><a href="#ap-wallet">Wallet</a><a href="#ap-network-chart">Admission chart</a><a href="#ap-referral-form">Submit a referral</a><a href="#ap-leads-body">Referral activity</a><a href="#ap-ledger-body">Commission ledger</a><a href="#ap-subpartners-body">Subpartners</a></nav><p id="ap-dashboard-status" class="ap-form-status" role="status"></p><section id="ap-overview" class="ap-kpi-grid" aria-label="Partner overview"><article><span>Total referrals (you)</span><strong id="ap-kpi-referrals">—</strong></article><article><span>In review (you)</span><strong id="ap-kpi-review">—</strong></article><article><span>Confirmed admissions (you)</span><strong id="ap-kpi-admissions">—</strong></article><article><span>Network admissions</span><strong id="ap-kpi-network-admissions">—</strong></article><article><span>Approved subpartners</span><strong id="ap-kpi-subpartners">—</strong></article></section><section id="ap-wallet" class="ap-workspace-panel ap-wallet-panel"><div><p class="ap-eyebrow">PARTNER WALLET</p><h2>Your earnings</h2><p class="ap-workspace-muted">Wallet amounts update when admissions are confirmed and commission records are reconciled by StepInStudents.</p></div><div class="ap-wallet-balances"><article><span>Available to pay</span><strong id="ap-wallet-payable">—</strong></article><article><span>Pending remittance</span><strong id="ap-wallet-pending">—</strong></article><article><span>Total recorded earnings</span><strong id="ap-wallet-total">—</strong></article></div><p class="ap-wallet-note">Commission shares are set by your partner agreement. Confirmed admission counts do not create a wallet credit until an eligible institutional commission is recorded.</p></section><section id="ap-network-chart" class="ap-workspace-panel"><div class="ap-chart-heading"><div><p class="ap-eyebrow">ADMISSIONS AT A GLANCE</p><h2>Your network activity</h2></div><span id="ap-live-indicator" class="ap-live-indicator">● Live updates every 20 seconds</span></div><div id="ap-admission-chart" class="ap-admission-chart" role="img" aria-label="Confirmed admissions by partner"><p>Loading admission activity…</p></div></section><section class="ap-workspace-grid"><article class="ap-workspace-panel"><div class="ap-panel-title"><div><p class="ap-eyebrow">Student referrals</p><h2>Refer a student</h2></div></div><p class="ap-workspace-muted">Get the student's permission first. Schools decide who gets admitted.</p><form id="ap-referral-form" class="ap-form"><label>Student's name<input name="studentName" maxlength="120" required></label><label>Student's email<input name="studentEmail" type="email" maxlength="180" required></label><label>Phone number<input name="studentPhone" type="tel" maxlength="40"></label><label class="ap-full-field">Course they want to study<input name="courseInterest" maxlength="160"></label><label class="ap-consent ap-full-field"><input type="checkbox" name="consent" required><span>I have the student's permission to share their details and contact them about courses.</span></label><button class="ap-button ap-button-primary" type="submit">Submit referral <span aria-hidden="true">↗</span></button><p class="ap-form-status ap-full-field" id="ap-referral-status" role="status"></p></form></article></section><section class="ap-workspace-panel ap-table-panel"><p class="ap-eyebrow">ATTRIBUTED REFERRALS</p><h2>Referral activity</h2><div class="ap-table-wrap"><table><thead><tr><th>Student</th><th>Institution / course</th><th>Status</th><th>Received</th></tr></thead><tbody id="ap-leads-body"><tr><td colspan="4">Loading referrals…</td></tr></tbody></table></div></section><section class="ap-workspace-panel ap-table-panel"><p class="ap-eyebrow">FINANCIAL RECORD</p><h2>Commission ledger</h2><p class="ap-workspace-muted">Amounts are recorded only after an administrator documents an eligible institutional commission. Payable balances require remittance reconciliation.</p><div id="ap-payable" class="ap-ledger-total">Recorded payable: —</div><div class="ap-table-wrap"><table><thead><tr><th>Reference</th><th>Your share</th><th>Status</th></tr></thead><tbody id="ap-ledger-body"><tr><td colspan="3">Loading ledger…</td></tr></tbody></table></div></section><section class="ap-workspace-panel ap-table-panel"><p class="ap-eyebrow">APPROVAL STATUS</p><h2>Subpartners</h2><div class="ap-table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead><tbody id="ap-subpartners-body"><tr><td colspan="3">Loading…</td></tr></tbody></table></div></section></main>`;
}

export function initAdmissionPartnerDashboardPage() {
    const root = document.querySelector("#ap-partner-workspace");
    if (!root) return;
    const status = document.querySelector("#ap-dashboard-status");
    let referralCode = "";
    let loading = false;
    const renderChart = (d) => {
        const rows = [
            {
                name: "You",
                referrals: d.leads.length,
                admissions: d.leads.filter((l) => l.status === "ADMISSION_CONFIRMED").length,
            },
            ...(d.subpartners || [])
                .filter((p) => p.status === "APPROVED")
                .map((p) => ({
                    name: p.fullName,
                    referrals: p.leadCount || 0,
                    admissions: p.admissions || 0,
                })),
        ];
        const max = Math.max(1, ...rows.map((r) => r.admissions));
        document.querySelector("#ap-admission-chart").innerHTML = rows
            .map(
                (r) =>
                    `<div class="ap-chart-row"><div class="ap-chart-label"><strong>${safe(r.name)}</strong><span>${r.admissions} admissions · ${r.referrals} referrals</span></div><div class="ap-chart-track"><span style="width:${r.admissions ? Math.max(8, Math.round((r.admissions / max) * 100)) : 0}%"></span></div></div>`,
            )
            .join("");
    };
    const load = async () => {
        if (loading) return;
        loading = true;
        try {
            const d = await getAdmissionPartnerDashboard();
            referralCode = d.referralCode || "";
            document.querySelector("#ap-referral-code").textContent =
                referralCode || "Not assigned";
            const isSuper = d.role === "SUPER_PARTNER";
            document
                .querySelector("#ap-subpartners-body")
                ?.closest("section")
                ?.toggleAttribute("hidden", !isSuper);
            document.querySelector("#ap-network-chart")?.toggleAttribute("hidden", !isSuper);
            document
                .querySelector("#ap-kpi-network-admissions")
                ?.closest("article")
                ?.toggleAttribute("hidden", !isSuper);
            root.dataset.referralUrl = d.referralUrl || "";
            document.querySelector("#ap-payable").textContent =
                `Recorded payable: ${money(d.payable)}`;
            document.querySelector("#ap-kpi-referrals").textContent = d.leads.length;
            document.querySelector("#ap-kpi-review").textContent = d.leads.filter(
                (l) => l.status === "IN_REVIEW",
            ).length;
            document.querySelector("#ap-kpi-admissions").textContent = d.leads.filter(
                (l) => l.status === "ADMISSION_CONFIRMED",
            ).length;
            document.querySelector("#ap-kpi-network-admissions").textContent =
                d.networkAdmissions || 0;
            document.querySelector("#ap-kpi-subpartners").textContent = d.subpartners.filter(
                (p) => p.status === "APPROVED",
            ).length;
            document.querySelector("#ap-wallet-payable").textContent = money(d.payable);
            document.querySelector("#ap-wallet-pending").textContent = money(d.pendingRemittance);
            document.querySelector("#ap-wallet-total").textContent = money(d.totalEarnings);
            renderChart(d);
            document.querySelector("#ap-leads-body").innerHTML = d.leads.length
                ? d.leads
                      .map(
                          (l) =>
                              `<tr><td>${safe(l.studentName)}</td><td>${safe(l.institutionInterest)}<small>${safe(l.courseInterest)}</small></td><td>${safe(l.status)}</td><td>${safe(new Date(l.createdAt).toLocaleDateString())}</td></tr>`,
                      )
                      .join("")
                : `<tr><td colspan="4">No student referrals have been submitted.</td></tr>`;
            document.querySelector("#ap-ledger-body").innerHTML = d.ledger.length
                ? d.ledger
                      .map(
                          (c) =>
                              `<tr><td>${safe(c.institutionReference || `Referral ${c.leadId}`)}</td><td>${money(c.myAmount)}</td><td>${safe(c.status)}</td></tr>`,
                      )
                      .join("")
                : `<tr><td colspan="3">No commission entries recorded.</td></tr>`;
            document.querySelector("#ap-subpartners-body").innerHTML = d.subpartners.length
                ? d.subpartners
                      .map(
                          (p) =>
                              `<tr><td>${safe(p.fullName)}</td><td>${safe(p.email)}</td><td>${safe(p.status)}<small>${p.leadCount || 0} referrals · ${p.admissions || 0} admissions</small></td></tr>`,
                      )
                      .join("")
                : `<tr><td colspan="3">No subpartner invitations yet.</td></tr>`;
            status.textContent = `Updated ${new Date().toLocaleTimeString()}`;
            status.classList.remove("is-error");
        } catch (e) {
            const denied = e.status === 401 || e.status === 403;
            status.textContent = denied
                ? "This account is not yet approved for " +
                  "the partner workspace. Submit your " +
                  "interest or contact a StepInStudents " +
                  "administrator if you have already been " +
                  "approved."
                : e.message;
            status.classList.add("is-error");
            document.querySelector("#ap-leads-body").innerHTML =
                `<tr><td colspan="4">${safe(e.message)}</td></tr>`;
            document.querySelector("#ap-ledger-body").innerHTML =
                `<tr><td colspan="3">${safe(e.message)}</td></tr>`;
            document.querySelector("#ap-subpartners-body").innerHTML =
                `<tr><td colspan="3">${safe(e.message)}</td></tr>`;
            if (denied) {
                status.insertAdjacentHTML(
                    "beforeend",
                    ' <a href="/admission-partners">Partner information</a>',
                );
                root.classList.add("ap-workspace-locked");
                root.querySelectorAll("form input,form select,form button,#ap-copy-link").forEach(
                    (control) => (control.disabled = true),
                );
            } else if (!root.querySelector("[data-ap-retry]")) {
                status.insertAdjacentHTML(
                    "beforeend",
                    ' <button type="button" data-ap-retry>Retry</button>',
                );
            }
        } finally {
            loading = false;
        }
    };
    load();
    const refreshTimer = setInterval(load, 20000);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) load();
    });
    root.addEventListener("click", (event) => {
        if (event.target.closest("[data-ap-retry]")) {
            status.textContent = "Loading partner data…";
            status.classList.remove("is-error");
            load();
        }
    });
    document.querySelector("#ap-copy-link").addEventListener("click", async () => {
        const url = new URL(root.dataset.referralUrl || "", location.origin).href;
        try {
            await navigator.clipboard.writeText(url);
            status.textContent = "Referral link copied.";
        } catch {
            status.textContent = url;
        }
    });
    document.querySelector("#ap-referral-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.currentTarget,
            s = document.querySelector("#ap-referral-status"),
            b = f.querySelector("button");
        if (!referralCode) {
            s.textContent = "Your account does not have an active referral code.";
            return;
        }
        b.disabled = true;
        s.textContent = "Submitting referral…";
        try {
            const v = Object.fromEntries(new FormData(f));
            const result = await submitPartnerReferral(referralCode, { ...v, consent: true });
            s.textContent = result.message;
            f.reset();
            load();
        } catch (err) {
            s.textContent = err.message;
            s.classList.add("is-error");
        } finally {
            b.disabled = false;
        }
    });
}
