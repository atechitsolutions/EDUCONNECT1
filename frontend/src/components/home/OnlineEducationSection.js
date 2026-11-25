import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import { onlineEducationHomePrograms } from "../../data/onlineEducationHomePrograms.js";

export function OnlineEducationSection() {
    function createProgramCard(program) {
        return InstitutionCard({
            item: {
                rank: program.rank,
                name: program.name,
                category: program.category,
                location: program.location,
                program: program.program,
                rating: program.rating,
                reviews: program.reviews,
                score: program.score,
                ranking: program.ranking,
                image: program.image,
                actionLabel: program.actionLabel,
            },
            type: "online-education",
        });
    }

    const programCards = onlineEducationHomePrograms.map(createProgramCard).join("");

    const content = `
        <div class="online-education-section">
            <div class="online-education-intro">
                <div class="online-education-intro-content">
                    <span class="online-education-eyebrow">
                        💻 FLEXIBLE EDUCATION
                    </span>
                    <h2>
                        Online & Distance Education in India
                    </h2>
                    <p>
                        Explore online degrees, distance education programs,
                        online MBA, online BCA, distance MBA, online certification
                        courses and flexible learning opportunities from recognized
                        universities and institutions in India.
                    </p>
                </div>
                <div class="online-education-stat">
                    <strong>
                        ${onlineEducationHomePrograms.length}
                    </strong>
                    <span>
                        Featured<br>
                        Programs
                    </span>
                </div>
            </div>
            <div class="online-education-carousel">
                <div class="online-education-viewport">
                    <div class="online-education-track">
                        ${programCards}
                    </div>
                </div>
                <button
                    type="button"
                    class="online-education-next"
                    aria-label="Show next online and distance education programs in India"
                >
                    <span>
                        →
                    </span>
                </button>
            </div>
        </div>
    `;

    return Section({
        id: "online-education",
        title: "",
        subtitle: "",
        content,
    });
}

export default OnlineEducationSection;
