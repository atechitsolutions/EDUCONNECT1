import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

async function request(path, options = {}) {
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/api${path}`, { ...options, headers, signal: controller.signal });
    } catch (cause) {
        const error = new Error(cause?.name === "AbortError" ? "The server took too long to respond. Check that the StepInStudents backend and database are running, then retry." : "Could not reach the StepInStudents server. Check that the backend is running, then retry.");
        error.cause = cause;
        throw error;
    } finally { clearTimeout(timeout); }
    const body = response.status === 204 ? null : await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(body?.message || body?.detail || body?.error || `Request failed (${response.status}).`);
        error.status = response.status;
        throw error;
    }
    return body;
}

export const submitPartnerInterest = data => request("/admission-partners/register", { method: "POST", body: JSON.stringify(data) });
export const getAdmissionPartnerDashboard = () => request("/admission-partners/me");
export const submitPartnerReferral = (code, data) => request(`/admission-partners/referrals?code=${encodeURIComponent(code)}`, { method: "POST", body: JSON.stringify(data) });
export const validatePartnerReferralCode = code => request(`/admission-partners/referrals/validate?code=${encodeURIComponent(code)}`);
export const inviteSubpartner = data => request("/admission-partners/me/subpartners", { method: "POST", body: JSON.stringify(data) });
export const getAdminAdmissionPartners = () => request("/admin/admission-partners");
export const getAdminAdmissionLeads = () => request("/admin/admission-partners/leads");
export const getAdminReferralAudit = () => request("/admin/admission-partners/audit");
export const decideAdmissionPartner = (id, data) => request(`/admin/admission-partners/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const updateReferralAdmission = (id, status) => request(`/admin/admission-partners/leads/${id}/admission`, { method: "PATCH", body: JSON.stringify({ status }) });
export const getAdminReferralLedger = () => request("/admin/admission-partners/commissions");
export const postReferralCommission = data => request("/admin/admission-partners/commissions", { method: "POST", body: JSON.stringify(data) });
export const reconcileReferralCommission = (id, status, remittanceReference) => request(`/admin/admission-partners/commissions/${id}`, { method: "PATCH", body: JSON.stringify({ status, remittanceReference }) });
