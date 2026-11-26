import { API_BASE_URL } from "../config/api.js";

export async function submitLeadSubmission(module, source, fields, consent) {
    const response = await fetch(`${API_BASE_URL}/api/lead-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module, source, fields, consent: consent === true }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || "Your enquiry could not be submitted.");
    return body;
}
