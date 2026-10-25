export default function Ticker(title, items = []) {

    return `

    <section class="ticker">

        <div class="ticker-title">

            ${title}

        </div>

        <div class="ticker-wrapper">

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