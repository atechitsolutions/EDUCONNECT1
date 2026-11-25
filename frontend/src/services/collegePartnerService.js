import { getToken } from "./authService.js";
import { API_BASE_URL } from "../config/api.js";

const API = `${API_BASE_URL}/api`;
const VISITOR_KEY = "educonnect_visitor_id";

export function getVisitorId() {
    try {
        let id = localStorage.getItem(VISITOR_KEY);
        if (!id) {
            id =
                globalThis.crypto?.randomUUID?.().replaceAll("-", "") ||
                `${Date.now()}${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(VISITOR_KEY, id);
        }
        return id;
    } catch {
        return (
            globalThis.crypto?.randomUUID?.().replaceAll("-", "") ||
            `${Date.now()}${Math.random().toString(36).slice(2)}`
        );
    }
}

async function request(path, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        "X-Visitor-Id": getVisitorId(),
        ...(options.headers || {}),
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API}${path}`, { ...options, headers });
    if (response.status === 204) return null;
    const body = await response.json().catch(() => ({}));
    if (!response.ok)
        throw new Error(
            body.message ||
                body.error ||
                `${response.status} ${response.statusText || "The request could not be completed."}`,
        );
    return body;
}

export const getPartnerSummary = () => request("/admin/college-partners/summary");
export const getPartnerAccounts = () => request("/admin/college-partners");
export const getInstitutionsForAdmin = () => request("/institution/admin");
export const createPartnerAccount = (data) =>
    request("/admin/college-partners", { method: "POST", body: JSON.stringify(data) });
export const updatePartnerAccount = (id, data) =>
    request(`/admin/college-partners/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const setPartnerActive = (id, active) =>
    request(`/admin/college-partners/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ active }),
    });
export const resetPartnerPassword = (id) =>
    request(`/admin/college-partners/${id}/reset-password`, { method: "POST" });
export const loginPartner = (data) =>
    request("/college/auth/login", { method: "POST", body: JSON.stringify(data) });
export const getPartnerDashboard = () => request("/college/dashboard");
export const getPartnerWallet = () => request("/college/wallet");
export const submitPartnerWalletDeposit = (data) =>
    request("/college/wallet/deposits", { method: "POST", body: JSON.stringify(data) });
export const unlockPartnerEnquiries = (enquiryIds) =>
    request("/college/enquiries/unlock", { method: "POST", body: JSON.stringify({ enquiryIds }) });
export const getPartnerEnquiries = () => request("/college/enquiries");
export const getPartnerEnquiry = (id) => request(`/college/enquiries/${id}`);
export const updatePartnerEnquiryStatus = (id, status) =>
    request(`/college/enquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
export const changePartnerPassword = (data) =>
    request("/college/auth/change-password", { method: "POST", body: JSON.stringify(data) });
export const recordCollegeEvent = (institutionId, eventType, course = null, eventId = null) => {
    const numericId = Number(institutionId);
    if (!Number.isSafeInteger(numericId) || numericId <= 0) return Promise.resolve(null);
    const id =
        eventId ||
        globalThis.crypto?.randomUUID?.().replaceAll("-", "") ||
        `${Date.now()}${Math.random().toString(36).slice(2)}`;
    return request("/analytics/college-event", {
        method: "POST",
        headers: { "X-Event-Id": id, "X-Source-Page": location.pathname },
        body: JSON.stringify({ institutionId: numericId, eventType, course }),
    });
};
export const submitCollegeEnquiry = (data) =>
    request("/college/enquiries", { method: "POST", body: JSON.stringify(data) });
export const revokeCollegeEnquiryConsent = (enquiryId) =>
    request(`/college/enquiries/${enquiryId}/revoke-contact-consent`, { method: "POST" });
export const getAdminInterest = () => request("/admin/college-partners/interest");
export const getAdminStudentInterest = (studentId) =>
    request(`/admin/college-partners/interest/students/${studentId}`);
export const sendAdminInterestNotification = (studentId, institutionId) =>
    request("/admin/college-partners/interest/notifications", {
        method: "POST",
        body: JSON.stringify({ studentId, institutionId }),
    });
export const getAdminInterestHistory = () => request("/admin/college-partners/interest/history");
export const markAdminNotificationReviewed = (id) =>
    request(`/admin/college-partners/interest/notifications/${id}/reviewed`, { method: "PATCH" });
export const getPartnerAlerts = () => request("/college/opportunity-alerts");
export const markPartnerAlertRead = (id) =>
    request(`/college/opportunity-alerts/${id}/read`, { method: "PATCH" });
export const archivePartnerAlert = (id) =>
    request(`/college/opportunity-alerts/${id}/archive`, { method: "PATCH" });
export const getAdminLeadPartners = () => request("/admin/college-partners/leads/partners");
export const getAdminLeadSummary = () => request("/admin/college-partners/leads/summary");
export const getAdminLeads = () => request("/admin/college-partners/leads");
export const getAdminLeadAudit = () => request("/admin/college-partners/leads/audit");
export const getAdminWalletSettings = () => request("/admin/college-partners/wallet/settings");
export const updateAdminWalletSettings = (data) =>
    request("/admin/college-partners/wallet/settings", {
        method: "PUT",
        body: JSON.stringify(data),
    });
export const getAdminWalletBalances = () => request("/admin/college-partners/wallet/balances");
export const getAdminWalletDeposits = (status = "PENDING") =>
    request(`/admin/college-partners/wallet/deposits?status=${encodeURIComponent(status)}`);
export const reviewAdminWalletDeposit = (id, decision, note) =>
    request(`/admin/college-partners/wallet/deposits/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ decision, note }),
    });
export const adjustAdminWallet = (accountId, amount, reason) =>
    request(`/admin/college-partners/wallet/${accountId}/adjustments`, {
        method: "POST",
        body: JSON.stringify({ amount, reason }),
    });
export const getAdminWalletTransactions = () =>
    request("/admin/college-partners/wallet/transactions");
export const getAdminUnlockedLeads = () => request("/admin/college-partners/wallet/unlocked-leads");
export const createAdminLead = (data) =>
    request("/admin/college-partners/leads", { method: "POST", body: JSON.stringify(data) });
export const assignImportedAdminLeads = (data) =>
    request("/admin/college-partners/leads/import/assign", {
        method: "POST",
        body: JSON.stringify(data),
    });
export function previewAdminLeadImport(file, institutionId, onProgress = () => {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API}/admin/college-partners/leads/import/preview`);
        const token = getToken();
        if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
        };
        xhr.onload = () => {
            let body = {};
            try {
                body = JSON.parse(xhr.responseText || "{}");
            } catch {}
            if (xhr.status >= 200 && xhr.status < 300) resolve(body);
            else reject(new Error(body.message || `Import preview failed (${xhr.status}).`));
        };
        xhr.onerror = () =>
            reject(new Error("Could not reach the server while uploading the file."));
        const data = new FormData();
        data.append("file", file);
        data.append("institutionId", institutionId);
        xhr.send(data);
    });
}
export const getPartnerAssignedLeads = () => request("/college/assigned-leads");
export const getPublicInstitution = (id) =>
    request(`/institution/${encodeURIComponent(id)}`, { headers: {} });

export function storePartnerSession(result) {
    localStorage.setItem("educonnect_token", result.token);
    localStorage.setItem(
        "educonnect_user",
        JSON.stringify({
            userId: result.userId,
            username: result.username,
            fullName: result.fullName,
            role: result.role,
            mustChangePassword: result.mustChangePassword,
        }),
    );
}
