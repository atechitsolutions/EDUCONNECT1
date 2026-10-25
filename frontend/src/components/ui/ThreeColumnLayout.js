export function ThreeColumnLayout({
    left = "",
    center = "",
    right = "",
    leftWidth = "280px",
    rightWidth = "280px",
    gap = "25px",
    className = ""
} = {}) {

    return `

<section
    class="three-column-layout ${className}"
    style="
        --left-width:${leftWidth};
        --right-width:${rightWidth};
        --column-gap:${gap};
    "
>

    <aside class="column-left">

        ${left}

    </aside>

    <main class="column-center">

        ${center}

    </main>

    <aside class="column-right">

        ${right}

    </aside>

</section>

`;

}