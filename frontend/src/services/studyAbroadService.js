import { getToken } from "./authService.js";

const API_BASE_URL =
    "http://localhost:8080/api";

function buildHeaders(includeJson = false) {
    const headers = {};

    if (includeJson) {
        headers["Content-Type"] = "application/json";
    }

    const token = getToken();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

async function parseResponse(response) {
    const text = await response.text();

    let data = null;

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            `Request failed with status ${response.status}`
        );
    }

    return data;
}

export async function getInstitutions() {
    const response = await fetch(`${API_BASE_URL}/institution`);
    return parseResponse(response);
}

export async function getAdminInstitutions() {
    const response = await fetch(
        `${API_BASE_URL}/institution/admin`,
        { headers: buildHeaders() }
    );
    return parseResponse(response);
}

export async function getInstitutionById(id) {
    const response = await fetch(
        `${API_BASE_URL}/institution/${encodeURIComponent(id)}`
    );
    return parseResponse(response);
}

export async function getStudyAbroadSuggestions(query) {
    const response = await fetch(
        `${API_BASE_URL}/studyabroad/suggestions?query=${encodeURIComponent(query)}`
    );
    return parseResponse(response);
}

export async function searchStudyAbroad(query) {
    const response = await fetch(
        `${API_BASE_URL}/studyabroad/search`,
        {
            method: "POST",
            headers: buildHeaders(true),
            body: JSON.stringify({ query })
        }
    );
    return parseResponse(response);
}

export async function createInstitution(data) {
    const response = await fetch(
        `${API_BASE_URL}/institution`,
        {
            method: "POST",
            headers: buildHeaders(true),
            body: JSON.stringify(data)
        }
    );
    return parseResponse(response);
}

export async function updateInstitution(id, data) {
    const response = await fetch(
        `${API_BASE_URL}/institution/${encodeURIComponent(id)}`,
        {
            method: "PUT",
            headers: buildHeaders(true),
            body: JSON.stringify(data)
        }
    );
    return parseResponse(response);
}

export async function deleteInstitution(id) {
    const response = await fetch(
        `${API_BASE_URL}/institution/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
            headers: buildHeaders()
        }
    );
    return parseResponse(response);
}
