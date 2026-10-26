export default function InstitutionCard({
    item,
    type = "college"
}) {

    const {
        id = "",
        rank = "",
        name = "Institution",
        location = "",
        image = "",
        logo = "",
        logoAlt = "",
        verifiedFacts = "",
        score = "",
        rating = "",
        reviews = "",
        program = "",
        fees = "",
        ranking = "",
        highlight = "",
        category = "",
        actionLabel = "View Details",
        actionHref = "",
        rankingCategory = "",
        showCompare = true
    } = item;

    const logoInitials = String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return `
        <article
            class="institution-card"
            data-type="${type}"
            ${rankingCategory ? `data-ranking-category="${rankingCategory}"` : ""}
            ${id ? `data-institution-id="${id}"` : ""}
        >

            <div class="institution-card-visual">

                ${
                    image
                        ? `
                            <img
                                src="${image}"
                                alt="${name}"
                                loading="lazy"
                            >
                        `
                        : ""
                }


                <div class="institution-card-overlay"></div>


                ${
                    logo || type === "study-abroad-search-result"
                        ? `
                            <div class="institution-card-logo">
                                ${logo ? `<img src="${logo}" alt="${logoAlt || `${name} official logo`}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ""}
                                <span class="institution-card-logo-fallback" ${logo ? "hidden" : ""}>${logoInitials}</span>
                            </div>
                        `
                        : ""
                }


                ${
                    score
                        ? `
                            <span class="institution-card-score">
                                ${score}/10
                            </span>
                        `
                        : ""
                }


                ${
                    rank
                        ? `
                            <span class="institution-card-rank">
                                #${rank}
                            </span>
                        `
                        : ""
                }


                <div class="institution-card-title">

                    <h3>
                        ${name}
                    </h3>

                    ${
                        location
                            ? `
                                <p>
                                    📍 ${location}
                                </p>
                            `
                            : ""
                    }

                </div>

            </div>


            <div class="institution-card-body">

                ${
                    category
                        ? `
                            <span class="institution-card-category">
                                ${category}
                            </span>
                        `
                        : ""
                }


                ${
                    program
                        ? `
                            <h4 class="institution-card-program">
                                ${program}
                            </h4>
                        `
                        : ""
                }


                <div class="institution-card-rating-row">

                    ${
                        rating
                            ? `
                                <span class="institution-card-rating">
                                    ★ ${rating}/5
                                </span>
                            `
                            : ""
                    }

                    ${
                        reviews
                            ? `
                                <span class="institution-card-reviews">
                                    ${reviews} reviews
                                </span>
                            `
                            : ""
                    }

                </div>


                ${
                    fees
                        ? `
                            <div class="institution-card-fees">

                                <strong>
                                    ${fees}
                                </strong>

                                <span>
                                    Total Fees
                                </span>

                            </div>
                        `
                        : ""
                }


                ${
                    ranking
                        ? `
                            <div class="institution-card-ranking">
                                ${ranking}
                            </div>
                        `
                        : ""
                }


                ${verifiedFacts}

                ${
                    highlight
                        ? `
                            <div class="institution-card-highlight">
                                ${highlight}
                            </div>
                        `
                        : ""
                }


                <div class="institution-card-actions">

                    ${actionHref
                        ? `<a class="institution-card-action" href="${actionHref}">${actionLabel}<span>›</span></a>`
                        : `<button type="button" class="institution-card-action" data-action="details">${actionLabel}<span>›</span></button>`}


                    ${
                        fees
                            ? `
                                <button
                                    type="button"
                                    class="institution-card-action"
                                    data-action="fees"
                                >
                                    Courses & Fees
                                    <span>›</span>
                                </button>
                            `
                            : ""
                    }


                    ${
                        showCompare
                            ? `
                                <button
                                    type="button"
                                    class="institution-card-action"
                                    data-action="compare"
                                >
                                    Compare
                                    <span>›</span>
                                </button>
                            `
                            : ""
                    }

                </div>

            </div>

        </article>
    `;
}
