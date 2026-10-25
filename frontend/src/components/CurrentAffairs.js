import { getCurrentAffairs } from "../services/homeContent.js";

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderTickerItems(items) {
    const source = items.length > 1 ? [...items, ...items] : items;

    return source.map((item) => {
        const content = `
            <div class="premium-ticker-item">
                <div class="premium-ticker-item-icon">
                    ${escapeHtml(item.icon || "📢")}
                </div>

                <div class="premium-ticker-item-content">
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.subtitle || "Current Affairs")}</span>
                </div>
            </div>
        `;

        if (item.targetUrl) {
            return `
                <a
                    class="premium-ticker-item-link"
                    href="${escapeHtml(item.targetUrl)}"
                >
                    ${content}
                </a>
            `;
        }

        return content;
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
                    <div
                        class="premium-ticker-track"
                        data-current-affairs-track
                    >
                        <div class="premium-ticker-item">
                            <div class="premium-ticker-item-icon">📢</div>
                            <div class="premium-ticker-item-content">
                                <strong>Loading Current Affairs</strong>
                                <span>Please wait...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    class="premium-ticker-arrow"
                    aria-label="Current affairs"
                    disabled
                >
                    →
                </button>
            </div>

            <div class="premium-ticker-progress">
                <span></span>
            </div>
        </section>
    `;

    setTimeout(async () => {
        const track = document.querySelector("[data-current-affairs-track]");
        if (!track) {
            return;
        }

        try {
            const response = await getCurrentAffairs();
            const items = Array.isArray(response) ? response : [];

            if (!items.length) {
                track.innerHTML = `
                    <div class="premium-ticker-item">
                        <div class="premium-ticker-item-icon">📢</div>
                        <div class="premium-ticker-item-content">
                            <strong>No Current Affairs Available</strong>
                            <span>New updates will appear here.</span>
                        </div>
                    </div>
                `;
                return;
            }

            track.innerHTML = renderTickerItems(items);
        } catch (error) {
            console.error("Failed to load current affairs:", error);
            track.innerHTML = `
                <div class="premium-ticker-item">
                    <div class="premium-ticker-item-icon">⚠️</div>
                    <div class="premium-ticker-item-content">
                        <strong>Unable to load Current Affairs</strong>
                        <span>Please try again later.</span>
                    </div>
                </div>
            `;
        }
    }, 0);

    return section;
}
