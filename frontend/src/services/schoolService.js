import { API_BASE_URL } from "../config/api.js";

export async function submitSchoolEnquiry(data) {
    const response = await fetch(`${API_BASE_URL}/api/school-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || body.error || "Your enquiry could not be submitted.");
    return body;
}
