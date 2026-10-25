export function RunningTicker({
    title,
    items = [],
    background = "#0F4C81",
    color = "#ffffff"
}) {

    return `
        <section class="running-ticker">

            <div
                class="ticker-title"
                style="
                    background:${background};
                    color:${color};
                "
            >
                ${title}
            </div>

            <div class="ticker-content">

                <div class="ticker-track">

                    ${items.concat(items).map(item => `
                        <span class="ticker-item">
                            ${item}
                        </span>
                    `).join("")}

                </div>

            </div>

        </section>
    `;
}