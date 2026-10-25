export function Card({
    title = "",
    subtitle = "",
    description = "",
    badge = "",
    image = "",
    href = "#"
}) {
    return `
        <article class="premium-card">

            ${
                image
                    ? `
                        <div class="premium-card-image">
                            <img
                                src="${image}"
                                alt="${title}"
                                loading="lazy"
                            >
                        </div>
                    `
                    : ""
            }

            <div class="premium-card-content">

                ${
                    badge
                        ? `
                            <span class="premium-card-badge">
                                ${badge}
                            </span>
                        `
                        : ""
                }

                ${
                    title
                        ? `
                            <h3 class="premium-card-title">
                                ${title}
                            </h3>
                        `
                        : ""
                }

                ${
                    subtitle
                        ? `
                            <h4 class="premium-card-subtitle">
                                ${subtitle}
                            </h4>
                        `
                        : ""
                }

                ${
                    description
                        ? `
                            <p class="premium-card-description">
                                ${description}
                            </p>
                        `
                        : ""
                }

                <a
                    href="${href}"
                    class="premium-card-link"
                    aria-label="Explore ${title}"
                >
                    Explore
                    <span aria-hidden="true">→</span>
                </a>

            </div>

        </article>
    `;
}

export default Card;