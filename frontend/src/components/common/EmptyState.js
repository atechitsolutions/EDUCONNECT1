import Button from "./Button";

export default function EmptyState({
    title = "No Data Found",
    description = "There is nothing to display right now.",
    buttonText = "",
    buttonLink = "#",
    icon = "📂"
} = {}) {

    return `
        <div class="empty-state">

            <div class="empty-icon">
                ${icon}
            </div>

            <h3 class="empty-title">
                ${title}
            </h3>

            <p class="empty-description">
                ${description}
            </p>

            ${
                buttonText
                    ? Button({
                        text: buttonText,
                        href: buttonLink,
                        variant: "primary"
                    })
                    : ""
            }

        </div>
    `;
}