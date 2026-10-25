export function Banner({
    image = "",
    title = "",
    subtitle = "",
    height = "100%"
}) {
    return `
        <div
            class="premium-banner"
            style="
                height: ${height};
                background-image: url('${image}');
            "
        >
            <div class="premium-banner-overlay"></div>

            <div class="premium-banner-content">
                ${title ? `
                    <h2 class="premium-banner-title">
                        ${title}
                    </h2>
                ` : ""}

                ${subtitle ? `
                    <p class="premium-banner-subtitle">
                        ${subtitle}
                    </p>
                ` : ""}
            </div>
        </div>
    `;
}

export default Banner;