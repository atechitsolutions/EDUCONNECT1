import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import {
    getInstitutions
} from "../../services/studyAbroadService.js";
import {
    bindInstitutionDetailButtons
} from "../studyAbroad/InstitutionDetailsModals.js";


export function StudyAbroadSection() {

    function createInstitutionCard(institution, index) {

        const location = [
            institution.city,
            institution.state,
            institution.country
        ].filter(Boolean).join(", ");

        const category = [
            institution.type === "UNIVERSITY"
                ? "University"
                : institution.type === "COLLEGE"
                    ? "College"
                    : "Institution",
            institution.country
        ].filter(Boolean).join(" • ");

        return InstitutionCard({

            item: {
                id: institution.id,
                rank: String(index + 1).padStart(2, "0"),
                name: institution.name,
                category,
                location,
                program: institution.type === "UNIVERSITY"
                    ? "University listing"
                    : institution.type === "COLLEGE"
                        ? "College listing"
                        : "Institution listing",
                ranking: institution.verified
                    ? "Details verified"
                    : "Institution listing",
                highlight: institution.description ||
                    "Explore this institution as a Study Abroad option.",
                image: institution.coverImageUrl || "",
                actionLabel: "View More",
                showCompare: false
            },

            type: "study-abroad"
        });
    }


    const content = `
        <div
            class="study-abroad-section"
            id="study-abroad-destinations"
        >

            <div class="study-abroad-intro">

                <div class="study-abroad-intro-content">

                    <span class="study-abroad-eyebrow">
                        🌍 INTERNATIONAL EDUCATION
                    </span>

                    <h2>
                        Study Abroad
                    </h2>

                    <p>
                        Browse the universities, colleges and institutions listed
                        across our Study Abroad destinations.
                    </p>

                </div>


                <div class="study-abroad-stat">

                    <strong
                        class="study-abroad-institution-count"
                    >
                        0
                    </strong>

                    <span>
                        Listed<br>
                        Institutions
                    </span>

                </div>

            </div>


            <div class="study-abroad-carousel">

                <div class="study-abroad-viewport">

                    <div class="study-abroad-track">

                        <div class="study-abroad-loading">
                            Loading Study Abroad institutions...
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="study-abroad-next"
                    aria-label="Show next Study Abroad institutions"
                >
                    <span>→</span>
                </button>

            </div>

        </div>
    `;


    const section =
        Section({
            id: "study-abroad-section",
            title: "",
            subtitle: "",
            content
        });


    setTimeout(
        async () => {

            try {

                const institutions =
                    await getInstitutions();

                const visibleInstitutions =
                    institutions
                        .filter(
                            (institution) =>
                                institution.active === true &&
                                institution.studyAbroadEnabled === true
                        );

                const track =
                    document.querySelector(
                        "#study-abroad-destinations .study-abroad-track"
                    );

                const countElement =
                    document.querySelector(
                        "#study-abroad-destinations .study-abroad-institution-count"
                    );

                if (!track) {
                    return;
                }

                if (countElement) {
                    countElement.textContent =
                        visibleInstitutions.length;
                }

                if (!visibleInstitutions.length) {

                    track.innerHTML = `
                        <div class="study-abroad-loading">
                            No Study Abroad institutions have been listed yet.
                        </div>
                    `;

                    return;
                }

                const institutionMap =
                    new Map(
                        visibleInstitutions.map(
                            (institution) => [
                                String(institution.id),
                                institution
                            ]
                        )
                    );

                track.innerHTML =
                    visibleInstitutions
                        .map(createInstitutionCard)
                        .join("");

                bindInstitutionDetailButtons(
                    track,
                    institutionMap
                );

                window.dispatchEvent(
                    new CustomEvent(
                        "educonnect:studyabroad-cards-ready"
                    )
                );

            }
            catch (error) {

                console.error(
                    "Failed to load Study Abroad institutions:",
                    error
                );

                const track =
                    document.querySelector(
                        "#study-abroad-destinations .study-abroad-track"
                    );

                if (track) {
                    track.innerHTML = `
                        <div class="study-abroad-loading">
                            Unable to load Study Abroad institutions.
                        </div>
                    `;
                }
            }

        },
        0
    );


    return section;
}


export default StudyAbroadSection;
