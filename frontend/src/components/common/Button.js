export default function Button({
    text = "Button",
    variant = "primary",
    size = "md",
    icon = "",
    href = "#",
    fullWidth = false,
    disabled = false
} = {}) {

    const classes = [
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? "btn-block" : "",
        disabled ? "btn-disabled" : ""
    ].join(" ").trim();

    return `
        <a
            href="${disabled ? "#" : href}"
            class="${classes}"
            ${disabled ? 'aria-disabled="true"' : ""}
        >
            ${icon ? `<span class="btn-icon">${icon}</span>` : ""}
            <span>${text}</span>
        </a>
    `;
}