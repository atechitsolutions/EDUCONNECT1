export function SectionTitle(title, subtitle = "") {
    return `

<div class="section-heading">

    <h2>${title}</h2>

    ${
        subtitle
            ? `<p>${subtitle}</p>`
            : ""
    }

</div>

`;
}