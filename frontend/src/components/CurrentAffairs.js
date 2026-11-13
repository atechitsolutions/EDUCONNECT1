import { getCurrentAffairs } from "../services/homeContent.js";

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

const fallbackItems = [
    {
        icon: "🎓",
        title: "Kashi Tamil Sangamam 5.0 scheduled for Nov 28–Dec 12",
        subtitle: "Ministry of Education · 4 Nov 2026",
        targetUrl: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2332761&lang=2&reg=48"
    },
    {
        icon: "📰",
        title: "UGC publishes the Fifth Amendment to its degree specifications",
        subtitle: "University Grants Commission · 27 Aug 2026",
        targetUrl: "https://www.ugc.gov.in/regulations/UGC_Regulations_university"
    },
    {
        icon: "🌐",
        title: "UGC invites institutions for online and distance programmes in 2027",
        subtitle: "University Grants Commission · 31 Aug 2026",
        targetUrl: "https://www.ugc.gov.in/notices"
    }
];

function safeExternalUrl(value) {
    try {
        const url = new URL(value, window.location.origin);
        return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

function renderTickerItems(items) {
    // Repeat a complete set so the CSS -50% animation loops without a blank gap.
    return [...items, ...items].map((item, index) => {
        const content = `
            <div class="premium-ticker-item">
                <div class="premium-ticker-item-icon">${escapeHtml(item.icon || "📢")}</div>
                <div class="premium-ticker-item-content">
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.subtitle || "Current Affairs")}</span>
                </div>
            </div>`;
        const targetUrl = safeExternalUrl(item.targetUrl);
        const duplicateAttributes = index >= items.length ? 'aria-hidden="true" tabindex="-1"' : "";

        return targetUrl
            ? `<a class="premium-ticker-item-link" href="${escapeHtml(targetUrl)}" target="_blank" rel="noopener noreferrer" ${duplicateAttributes}>${content}</a>`
            : `<div ${index >= items.length ? 'aria-hidden="true"' : ""}>${content}</div>`;
    }).join("");
}

export default function CurrentAffairs() {
    const section = `
        <section class="premium-ticker-section current-affairs-ticker-section">
            <div class="premium-ticker">
                <div class="premium-ticker-label">
                    <div class="ticker-label-icon">📰</div>
                    <div class="ticker-label-text">
                        <strong>CURRENT AFFAIRS</strong>
                        <span>Education &amp; Career News</span>
                    </div>
                </div>
                <div class="premium-ticker-window">
                    <div class="premium-ticker-track" data-current-affairs-track>
                        ${renderTickerItems(fallbackItems)}
                    </div>
                </div>
                <button type="button" class="premium-ticker-arrow" aria-label="Current affairs" disabled>→</button>
            </div>
            <div class="premium-ticker-progress"><span></span></div>
        </section>`;

    setTimeout(async () => {
        const track = document.querySelector("[data-current-affairs-track]");
        if (!track) return;

        try {
            const response = await getCurrentAffairs();
            const items = Array.isArray(response) ? response : [];
            track.innerHTML = renderTickerItems(items.length ? items : fallbackItems);
        } catch (error) {
            console.error("Failed to load current affairs:", error);
            track.innerHTML = renderTickerItems(fallbackItems);
        }
    }, 0);

    return section;
}


