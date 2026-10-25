import { API_BASE_URL } from "../config/api.js";
import { onlineEducationProgrammes } from "../data/onlineEducationProgrammes.js";
import { onlineEducationDefaultCards } from "../data/onlineEducationDefaultCards.js";

const API_URL = `${API_BASE_URL}/api/online-education/cards`;
const TOKEN_KEY = "educonnect_token";

function authHeaders(json = false) {
    const token = localStorage.getItem(TOKEN_KEY);

    return {
        ...(json ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}

async function request(path = "", options = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                ...authHeaders(Boolean(options.body)),
                ...options.headers
            }
        });
    } catch {
        throw new Error(
            "Could not reach the EduConnect server. Start the backend and try again."
        );
    }

    if (!response.ok) {
        let serverMessage = "";

        try {
            const errorBody = await response.json();
            serverMessage = errorBody.message || errorBody.error || "";
        } catch {
            // Some server responses do not contain a JSON body.
        }

        const message =
            response.status === 401 || response.status === 403
                ? "Admin sign-in is required to manage Online Education cards. Sign in with an administrator account and try again."
                : serverMessage ||
                  `The server could not complete this request (${response.status}).`;

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

function toRequestPayload(card, active = true) {
    return {
        id: card.id,
        section: card.section,
        title: card.title,
        subtitle: card.subtitle || "",
        description: card.description || "",
        link: card.link || "",
        provider: card.provider || "",
        subject: card.subject || "",
        level: card.level || "",
        qualification: card.qualification || "",
        mode: card.mode || "",
        country: card.country || "",
        duration: card.duration || "",
        image: card.image || "",
        active
    };
}

/**
 * Returns active cards saved in the backend.
 */
export async function getOnlineEducationCards() {
    const response = await request();
    return Array.isArray(response) ? response : [];
}

/**
 * Used by the public page.
 * Active saved cards override defaults; removed IDs suppress defaults.
 */
export async function getOnlineEducationCardOverrides() {
    const [cards, removed] = await Promise.all([
        getOnlineEducationCards(),
        request("/removed")
    ]);

    return {
        cards,
        removedIds: new Set(
            Array.isArray(removed?.ids) ? removed.ids : []
        )
    };
}

/**
 * Used by the administrator page.
 * Combines built-in defaults, saved overrides, new cards,
 * and archived cards so defaults can be restored.
 */
export async function getOnlineEducationAdminCards({
    includeInactive = true
} = {}) {
    const response = await request("/admin");
    const savedCards = Array.isArray(response) ? response : [];

    const savedById = new Map(
        savedCards.map((card) => [card.id, card])
    );

    const defaultIds = new Set(
        onlineEducationDefaultCards.map((card) => card.id)
    );

    const defaults = onlineEducationDefaultCards.map((baseCard) => {
        const saved = savedById.get(baseCard.id);

        return {
            ...baseCard,
            ...(saved || {}),
            isDefault: true,
            active: saved ? saved.active === true : true,
            isRemoved: saved ? saved.active !== true : false
        };
    });

    const additions = savedCards
        .filter((card) => !defaultIds.has(card.id))
        .map((card) => ({
            ...card,
            isDefault: false,
            active: card.active === true,
            isRemoved: card.active !== true
        }));

    const cards = [...defaults, ...additions];

    return includeInactive
        ? cards
        : cards.filter((card) => card.active);
}

/**
 * Creates a new card or updates a saved/default card override.
 * Every save activates the card.
 */
export async function saveOnlineEducationCard(card) {
    if (!card?.id) {
        throw new Error("A card ID is required.");
    }

    if (!card?.section) {
        throw new Error("Choose a page section for this card.");
    }

    const defaultCard = onlineEducationDefaultCards.find(
        (item) => item.id === card.id
    );

    const records = await request("/admin");

    const exists =
        Array.isArray(records) &&
        records.some((item) => item.id === card.id);

    const payload = toRequestPayload(
        {
            ...card,
            section: card.section || defaultCard?.section
        },
        true
    );

    return request(
        exists
            ? `/admin/${encodeURIComponent(card.id)}`
            : "/admin",
        {
            method: exists ? "PUT" : "POST",
            body: JSON.stringify(payload)
        }
    );
}

/**
 * Archives a card instead of deleting its database record.
 * If an untouched default has never been saved, an inactive
 * override is created to hide that default on the public page.
 */
export async function deleteOnlineEducationCard(id) {
    if (!id) {
        throw new Error("A card ID is required.");
    }

    const records = await request("/admin");

    const exists =
        Array.isArray(records) &&
        records.some((item) => item.id === id);

    if (exists) {
        return request(
            `/admin/${encodeURIComponent(id)}`,
            { method: "DELETE" }
        );
    }

    const defaultCard = onlineEducationDefaultCards.find(
        (item) => item.id === id
    );

    if (!defaultCard) {
        throw new Error("This card is no longer available.");
    }

    return request("/admin", {
        method: "POST",
        body: JSON.stringify(
            toRequestPayload(defaultCard, false)
        )
    });
}

/**
 * Restore an archived card through the same safe save path.
 */
export async function restoreOnlineEducationCard(card) {
    return saveOnlineEducationCard({
        ...card,
        active: true
    });
}

/**
 * Online programme catalogue:
 * saved overrides are applied to built-in programme records;
 * additional saved programmes are appended;
 * archived IDs are excluded.
 */
export async function getOnlineEducationProgrammes() {
    try {
        const [savedCards, removed] = await Promise.all([
            getOnlineEducationCards(),
            request("/removed")
        ]);
        const removedIds = new Set(
            Array.isArray(removed?.ids) ? removed.ids : []
        );
        const programmeRecords = savedCards.filter(
            (card) => card.section === "programmes"
        );
        const savedById = new Map(
            programmeRecords.map((card) => [card.id, card])
        );
        const programmes = onlineEducationProgrammes
            .filter((programme) => !removedIds.has(programme.id))
            .map((programme) => {
                const override = savedById.get(programme.id);
                if (!override) return { ...programme };
                return {
                    ...programme,
                    title: override.title || programme.title,
                    providerName: override.provider || programme.providerName,
                    subject: override.subject || programme.subject,
                    educationLevel: override.level || programme.educationLevel,
                    qualificationType: override.qualification || programme.qualificationType,
                    studyMode: override.mode || programme.studyMode,
                    country: override.country || programme.country,
                    duration: override.duration || programme.duration,
                    description: override.description || ""
                };
            });
        const addedProgrammes = programmeRecords
            .filter((card) => !onlineEducationProgrammes.some((programme) => programme.id === card.id))
            .map((card) => ({
                id: card.id,
                title: card.title,
                providerName: card.provider || "EduConnect listing",
                providerType: "Institution",
                subject: card.subject || "Other",
                categories: [card.subject || "Other"],
                educationLevel: card.level || "Online Degree",
                qualificationType: card.qualification || card.level || "Course",
                studyMode: card.mode || "Fully online",
                country: card.country || "Not specified",
                duration: card.duration || "Not listed",
                tuitionAmount: null,
                currency: null,
                feePeriod: null,
                difficultyLevel: "Not specified",
                certificateAvailable: null,
                eligibility: "Not listed in supplied data",
                highlight: null
            }));
        return [...programmes, ...addedProgrammes];
    } catch {
        // Keep the supplied catalogue visible if the optional backend is unavailable.
        return onlineEducationProgrammes.map((programme) => ({ ...programme }));
    }
}
