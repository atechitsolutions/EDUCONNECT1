import { getToken } from "./authService.js";

const API = "http://localhost:8080/api";
const VISITOR_KEY = "educonnect_visitor_id";

export function getVisitorId() {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
        id = globalThis.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(36).slice(2)}`;
        localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
}

async function request(path, options = {}) {
    const headers = { "Content-Type": "application/json", "X-Visitor-Id": getVisitorId(), ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API}${path}`, { ...options, headers });
    if (response.status === 204) return null;
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || body.error || "The request could not be completed.");
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
export const recordCollegeEvent = (institutionId, eventType, course = null) => request("/analytics/college-event", { method: "POST", body: JSON.stringify({ institutionId, eventType, course }) });
export const submitCollegeEnquiry = data => request("/college/enquiries", { method: "POST", body: JSON.stringify(data) });
export const getPublicInstitution = id => request(`/institution/${encodeURIComponent(id)}`, { headers: {} });

export function storePartnerSession(result) {
    localStorage.setItem("educonnect_token", result.token);
    localStorage.setItem("educonnect_user", JSON.stringify({ userId: result.userId, username: result.username, fullName: result.fullName, role: result.role, mustChangePassword: result.mustChangePassword }));
}
