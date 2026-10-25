import Container from "./Container";

export default function Section({
    id = "",
    title = "",
    subtitle = "",
    content = "",
    className = "",
    background = "white"
} = {}) {

    return `
        <section
            ${id ? `id="${id}"` : ""}
            class="section section-${background} ${className}"
        >

            ${Container(`

                ${title ? `
                    <div class="section-header">

                        <div>

                            <h2 class="section-title">
                                ${title}
                            </h2>

                            ${
                                subtitle
                                    ? `<p class="section-subtitle">${subtitle}</p>`
                                    : ""
                            }

                        </div>

                    </div>
                ` : ""}

                <div class="section-body">

                    ${content}

                </div>

            `)}

        </section>
    `;
}