// ============================================================
// EduConnect - Reusable Premium Card Component
// File: frontend/src/components/ui/Card.js
// ============================================================

let cardStylesLoaded = false;

/**
 * Loads the card styles only once.
 * This keeps the Card component self-contained and reusable.
 */
function loadCardStyles() {
    if (cardStylesLoaded) {
        return;
    }

    cardStylesLoaded = true;

    const style = document.createElement("style");

    style.id = "educonnect-premium-card-styles";

    style.textContent = `
        /* =====================================================
           PREMIUM EDUCONNECT CARD
           ===================================================== */

        .edu-card {
            position: relative;
            width: 100%;
            min-height: 230px;

            padding: 28px;

            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            box-sizing: border-box;

            background:
                linear-gradient(
                    145deg,
                    #ffffff 0%,
                    #f8fbff 100%
                );

            border: 1px solid rgba(15, 76, 129, 0.08);

            border-radius: 22px;

            box-shadow:
                0 8px 25px rgba(15, 76, 129, 0.07);

            overflow: hidden;

            cursor: pointer;

            transition:
                transform 0.35s ease,
                box-shadow 0.35s ease,
                background 0.35s ease,
                border-color 0.35s ease;
        }


        /* -----------------------------------------------------
           Decorative glow
           ----------------------------------------------------- */

        .edu-card::before {
            content: "";

            position: absolute;

            width: 150px;
            height: 150px;

            top: -80px;
            right: -60px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(29, 116, 201, 0.15),
                    transparent 70%
                );

            opacity: 0;

            transition:
                opacity 0.35s ease,
                transform 0.35s ease;
        }


        /* -----------------------------------------------------
           Bottom accent line
           ----------------------------------------------------- */

        .edu-card::after {
            content: "";

            position: absolute;

            left: 0;
            bottom: 0;

            width: 0;
            height: 4px;

            background:
                linear-gradient(
                    90deg,
                    #0F4C81,
                    #1D74C9,
                    #4FA3E3
                );

            border-radius: 0 5px 5px 0;

            transition: width 0.35s ease;
        }


        /* -----------------------------------------------------
           Hover
           ----------------------------------------------------- */

        .edu-card:hover {
            transform: translateY(-8px);

            background:
                linear-gradient(
                    145deg,
                    #eef7ff 0%,
                    #ffffff 100%
                );

            border-color:
                rgba(29, 116, 201, 0.22);

            box-shadow:
                0 18px 45px rgba(15, 76, 129, 0.16);
        }


        .edu-card:hover::before {
            opacity: 1;
            transform: scale(1.25);
        }


        .edu-card:hover::after {
            width: 100%;
        }


        /* -----------------------------------------------------
           Badge
           ----------------------------------------------------- */

        .edu-card-badge {
            align-self: flex-start;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-height: 32px;

            padding: 6px 14px;

            margin-bottom: 18px;

            border-radius: 999px;

            background:
                linear-gradient(
                    135deg,
                    #0F4C81,
                    #1D74C9
                );

            color: #ffffff;

            font-size: 13px;
            font-weight: 700;

            letter-spacing: 0.2px;

            box-shadow:
                0 5px 14px rgba(15, 76, 129, 0.20);

            transition:
                transform 0.3s ease,
                box-shadow 0.3s ease;
        }


        .edu-card:hover .edu-card-badge {
            transform: translateY(-2px);

            box-shadow:
                0 7px 18px rgba(15, 76, 129, 0.28);
        }


        /* -----------------------------------------------------
           Title
           ----------------------------------------------------- */

        .edu-card-title {
            position: relative;
            z-index: 1;

            margin: 0 0 12px;

            color: #14213d;

            font-size: 24px;
            line-height: 1.25;

            font-weight: 800;

            letter-spacing: -0.3px;

            transition:
                color 0.3s ease,
                transform 0.3s ease;
        }


        .edu-card:hover .edu-card-title {
            color: #0F4C81;

            transform: translateX(2px);
        }


        /* -----------------------------------------------------
           Subtitle
           ----------------------------------------------------- */

        .edu-card-subtitle {
            position: relative;
            z-index: 1;

            margin: 0 0 12px;

            color: #1765a5;

            font-size: 17px;
            line-height: 1.45;

            font-weight: 700;

            transition:
                color 0.3s ease;
        }


        .edu-card:hover .edu-card-subtitle {
            color: #0F4C81;
        }


        /* -----------------------------------------------------
           Description
           ----------------------------------------------------- */

        .edu-card-description {
            position: relative;
            z-index: 1;

            margin: 0;

            color: #667085;

            font-size: 15.5px;
            line-height: 1.65;

            font-weight: 500;

            transition:
                color 0.3s ease;
        }


        .edu-card:hover .edu-card-description {
            color: #344054;
        }


        /* -----------------------------------------------------
           Optional action area
           ----------------------------------------------------- */

        .edu-card-action {
            position: relative;
            z-index: 1;

            display: inline-flex;
            align-items: center;

            gap: 6px;

            margin-top: auto;
            padding-top: 18px;

            color: #0F4C81;

            font-size: 14px;
            font-weight: 700;

            opacity: 0;

            transform: translateY(6px);

            transition:
                opacity 0.3s ease,
                transform 0.3s ease;
        }


        .edu-card:hover .edu-card-action {
            opacity: 1;

            transform: translateY(0);
        }


        .edu-card-action-arrow {
            transition:
                transform 0.3s ease;
        }


        .edu-card:hover .edu-card-action-arrow {
            transform: translateX(4px);
        }


        /* -----------------------------------------------------
           Focus accessibility
           ----------------------------------------------------- */

        .edu-card:focus-within {
            outline: 3px solid rgba(29, 116, 201, 0.20);

            outline-offset: 3px;
        }


        /* -----------------------------------------------------
           Responsive - Tablet
           ----------------------------------------------------- */

        @media (max-width: 900px) {

            .edu-card {
                min-height: 215px;

                padding: 24px;

                border-radius: 19px;
            }

            .edu-card-title {
                font-size: 22px;
            }

            .edu-card-subtitle {
                font-size: 16px;
            }

        }


        /* -----------------------------------------------------
           Responsive - Mobile
           ----------------------------------------------------- */

        @media (max-width: 600px) {

            .edu-card {
                min-height: auto;

                padding: 22px;

                border-radius: 18px;
            }

            .edu-card-title {
                font-size: 21px;
            }

            .edu-card-subtitle {
                font-size: 15px;
            }

            .edu-card-description {
                font-size: 14.5px;
            }

            /* Keep cards stable on touch devices */
            .edu-card:hover {
                transform: translateY(-4px);
            }

        }


        /* -----------------------------------------------------
           Reduced motion accessibility
           ----------------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {

            .edu-card,
            .edu-card *,
            .edu-card::before,
            .edu-card::after {
                transition: none !important;
            }

            .edu-card:hover {
                transform: none;
            }

        }
    `;

    document.head.appendChild(style);
}


/**
 * Reusable Card
 *
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.subtitle
 * @param {string} options.description
 * @param {string} options.badge
 * @param {string} options.action
 * @returns {string}
 */
export function Card({
    title = "",
    subtitle = "",
    description = "",
    badge = "",
    action = ""
} = {}) {

    loadCardStyles();

    return `
        <article class="edu-card">

            ${
                badge
                    ? `
                        <span class="edu-card-badge">
                            ${badge}
                        </span>
                    `
                    : ""
            }

            ${
                title
                    ? `
                        <h3 class="edu-card-title">
                            ${title}
                        </h3>
                    `
                    : ""
            }

            ${
                subtitle
                    ? `
                        <p class="edu-card-subtitle">
                            ${subtitle}
                        </p>
                    `
                    : ""
            }

            ${
                description
                    ? `
                        <p class="edu-card-description">
                            ${description}
                        </p>
                    `
                    : ""
            }

            ${
                action
                    ? `
                        <span class="edu-card-action">
                            ${action}
                            <span class="edu-card-action-arrow">→</span>
                        </span>
                    `
                    : ""
            }

        </article>
    `;
}


export default Card;