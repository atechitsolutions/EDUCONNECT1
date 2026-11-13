import { getToken } from "./authService.js";
import { API_BASE_URL } from "../config/api.js";

const API = `${API_BASE_URL}/api`;
const VISITOR_KEY = "educonnect_visitor_id";

export function getVisitorId() {
    try {
        let id = localStorage.getItem(VISITOR_KEY);
        if (!id) {
            id = globalThis.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(VISITOR_KEY, id);
        }
        return id;
    } catch {
        return globalThis.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(36).slice(2)}`;
    }
}

async function request(path, options = {}) {
    const headers = { "Content-Type": "application/json", "X-Visitor-Id": getVisitorId(), ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API}${path}`, { ...options, headers });
    if (response.status === 204) return null;
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || body.error || `${response.status} ${response.statusText || "The request could not be completed."}`);
    return body;
}

export const getPartnerSummary = () => request("/admin/college-partners/summary");
export const getPartnerAccounts = () => request("/admin/college-partners");
export const getInstitutionsForAdmin = () => request("/institution/admin");
export const createPartnerAccount = data => request("/admin/college-partners", { method: "POST", body: JSON.stringify(data) });
export const updatePartnerAccount = (id, data) => request(`/admin/college-partners/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const setPartnerActive = (id, active) => request(`/admin/college-partners/${id}/status`, { method: "PATCH", body: JSON.stringify({ active }) });
export const resetPartnerPassword = id => request(`/admin/college-partners/${id}/reset-password`, { method: "POST" });
export const loginPartner = data => request("/college/auth/login", { method: "POST", body: JSON.stringify(data) });
export const getPartnerDashboard = () => request("/college/dashboard");
export const getPartnerEnquiries = () => request("/college/enquiries");
export const getPartnerEnquiry = id => request(`/college/enquiries/${id}`);
export const updatePartnerEnquiryStatus = (id, status) => request(`/college/enquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
export const changePartnerPassword = data => request("/college/auth/change-password", { method: "POST", body: JSON.stringify(data) });
export const recordCollegeEvent = (institutionId, eventType, course = null, eventId = null) => {
    const numericId = Number(institutionId);
    if (!Number.isSafeInteger(numericId) || numericId <= 0) return Promise.resolve(null);
    const id = eventId || globalThis.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(36).slice(2)}`;
    return request("/analytics/college-event", { method: "POST", headers: { "X-Event-Id": id, "X-Source-Page": location.pathname }, body: JSON.stringify({ institutionId: numericId, eventType, course }) });
};
export const submitCollegeEnquiry = data => request("/college/enquiries", { method: "POST", body: JSON.stringify(data) });
export const revokeCollegeEnquiryConsent = enquiryId => request(`/college/enquiries/${enquiryId}/revoke-contact-consent`, { method: "POST" });
export const getAdminInterest = () => request("/admin/college-partners/interest");
export const getAdminStudentInterest = studentId => request(`/admin/college-partners/interest/students/${studentId}`);
export const sendAdminInterestNotification = (studentId, institutionId) => request("/admin/college-partners/interest/notifications", { method: "POST", body: JSON.stringify({ studentId, institutionId }) });
export const getAdminInterestHistory = () => request("/admin/college-partners/interest/history");
export const markAdminNotificationReviewed = id => request(`/admin/college-partners/interest/notifications/${id}/reviewed`, { method: "PATCH" });
export const getPartnerAlerts = () => request("/college/opportunity-alerts");
export const markPartnerAlertRead = id => request(`/college/opportunity-alerts/${id}/read`, { method: "PATCH" });
export const archivePartnerAlert = id => request(`/college/opportunity-alerts/${id}/archive`, { method: "PATCH" });
export const getPartnerSubscriptionHistory = () => request("/college/subscription/history");
export const getAdminSubscriptions = () => request("/admin/college-partners/subscriptions");
export const getAdminSubscriptionHistory = () => request("/admin/college-partners/subscriptions/history");
export const activateAdminPremium = (accountId, paymentReference, note) => request(`/admin/college-partners/${accountId}/subscription/activate`, { method: "POST", body: JSON.stringify({ paymentReference, note }) });
export const setAdminSubscriptionStatus = (accountId, status, note) => request(`/admin/college-partners/${accountId}/subscription/status`, { method: "PATCH", body: JSON.stringify({ status, note }) });
export const getPublicInstitution = id => request(`/institution/${encodeURIComponent(id)}`, { headers: {} });

export function storePartnerSession(result) {
    localStorage.setItem("educonnect_token", result.token);
    localStorage.setItem("educonnect_user", JSON.stringify({ userId: result.userId, username: result.username, fullName: result.fullName, role: result.role, mustChangePassword: result.mustChangePassword }));
}
