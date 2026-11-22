export const API_BASE_URL =
    (import.meta.env.VITE_API_BASE_URL ||
        (window.location.hostname === "127.0.0.1"
            ? "http://127.0.0.1:8080"
            : "http://localhost:8080"))
        .replace(/\/+$/, "");