const escapeAttribute = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export default function InstitutionCard({
    item,
    type = "college"
}) {

    const {
        id = "",
        rank = "",
        name = "Institution",
        location = "",
        country = "",
        image = "",
        imageFit = "cover",
        imageFallback = "",
        imageSource = "",
        logo = "",
        logoAlt = "",
        verifiedFacts = "",
        belowActions = "",
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
        actionDisabled = false,
        secondaryActionLabel = "",
        secondaryActionHref = "",
        enquiryHref = "",
        enquiryLabel = "Enquire",
        actionLayout = "",
        actionMode = "details",
        overview = "",
        detailsOnCard = true,
        rankingCategory = "",
        showCompare = true
    } = item;

    const isStudyAbroadSearch = type === "study-abroad-search-result";
    const logoInitials = String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    const logoMarkup = `<div class="institution-card-logo">${logo ? `<img src="${logo}" alt="${logoAlt || `${name} official logo`}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">` : ""}<span class="institution-card-logo-fallback" ${logo ? "hidden" : ""}>${logoInitials}</span></div>`;

    return `
        <article
            class="institution-card"
            data-type="${type}"
            ${rankingCategory ? `data-ranking-category="${rankingCategory}"` : ""}
            ${id ? `data-institution-id="${id}"` : ""}
            ${image ? `data-card-image="${escapeAttribute(image)}"` : ""}
        >

            <div class="institution-card-visual">

                ${
                    image
                        ? `
                            <img
                                class="${imageFit === "contain" ? "institution-card-brand-image" : ""}"
                                src="${image}"
                                data-fallback-src="${imageFallback}"
                                alt="${name}"
                                loading="lazy"
                                onerror="if(this.dataset.fallbackSrc && this.src !== this.dataset.fallbackSrc){this.src=this.dataset.fallbackSrc}else{this.hidden=true}"
                            >
                        `
                        : ""
                }


                <div class="institution-card-overlay"></div>


                ${
                    logo && !isStudyAbroadSearch ? logoMarkup : ""
                }


                ${
                    score && detailsOnCard
                        ? `
                            <span class="institution-card-score">
                                ${score}/10
                            </span>
                        `
                        : ""
                }


                ${
                    rank && detailsOnCard
                        ? `
                            <span class="institution-card-rank">
                                #${rank}
                            </span>
                        `
                        : ""
                }


                ${isStudyAbroadSearch ? "" : `
                    <div class="institution-card-title">
                        <h3>${name}</h3>
                        ${location ? `<p>📍 ${location}</p>` : ""}
                    </div>
                `}

            </div>


            <div class="institution-card-body">

                ${isStudyAbroadSearch ? `
                    <div class="study-abroad-search-heading">
                        ${logoMarkup}
                        <div><h3>${name}</h3><p>${country || location}</p></div>
                    </div>
                ` : ""}
                ${
                    category && !isStudyAbroadSearch
                        ? `
                            <span class="institution-card-category">
                                ${category}
                            </span>
                        `
                        : ""
                }


                ${
                    program && !isStudyAbroadSearch
                        ? `
                            <h4 class="institution-card-program">
                                ${program}
                            </h4>
                        `
                        : ""
                }


                <div class="institution-card-rating-row">

                    ${
                        rating && detailsOnCard
                            ? `
                                <span class="institution-card-rating">
                                    ★ ${rating}/5
                                </span>
                            `
                            : ""
                    }

                    ${
                        reviews && detailsOnCard
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
                    ranking && detailsOnCard
                        ? `
                            <div class="institution-card-ranking">
                                ${ranking}
                            </div>
                        `
                        : ""
                }


                ${detailsOnCard ? verifiedFacts : ""}

                ${
                    highlight && detailsOnCard
                        ? `
                            <div class="institution-card-highlight">
                                ${highlight}
                            </div>
                        `
                        : ""
                }


                <div class="institution-card-actions ${actionLayout}">

                    ${actionDisabled
                        ? `<span class="institution-card-action is-disabled" aria-disabled="true">${actionLabel}</span>`
                        : actionHref
                            ? `<a class="institution-card-action" href="${actionHref}"${/^https?:\/\//i.test(actionHref) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${actionLabel}<span>${/^https?:\/\//i.test(actionHref) ? "↗" : "›"}</span></a>`
                    : `<button type="button" class="institution-card-action" data-action="${actionMode}" data-college-name="${escapeAttribute(name)}" data-college-location="${escapeAttribute(location)}" data-college-category="${escapeAttribute(category)}" data-college-program="${escapeAttribute(program)}" data-college-overview="${escapeAttribute(overview)}" data-college-website="${escapeAttribute(secondaryActionHref)}" data-college-image="${escapeAttribute(image)}" data-college-photo-source="${escapeAttribute(imageSource)}" data-college-enquiry="${escapeAttribute(enquiryHref)}">${actionLabel}<span>›</span></button>`}

                    ${secondaryActionLabel ? (secondaryActionHref ? `<a class="institution-card-action" href="${secondaryActionHref}" target="_blank" rel="noopener noreferrer">${secondaryActionLabel}<span>↗</span></a>` : `<span class="institution-card-action is-disabled" aria-disabled="true">${secondaryActionLabel}</span>`) : ""}

                    ${enquiryHref ? `<a class="institution-card-action institution-card-enquire" href="${escapeAttribute(enquiryHref)}">${enquiryLabel}<span>→</span></a>` : ""}


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

                ${belowActions}

            </div>

        </article>
    `;
}

