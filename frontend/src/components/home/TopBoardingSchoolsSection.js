import Section from "../common/Section.js";
import { renderBoardingDirectory, boardingDirectoryCard } from "./boardingSchoolDirectory.js";

export function TopBoardingSchoolsSection() {
    const featured = [
        ["The Doon School", "Dehradun", "The Doon School"],
        ["Mayo College", "Ajmer", "Mayo College"],
        ["The Lawrence School, Sanawar", "Solan", "The Lawrence School, Sanawar"],
        ["Welham Girls' School", "Dehradun", "Welham Girls' School"],
        ["Woodstock School", "Mussoorie", "Woodstock School"],
        ["Bishop Cotton School", "Shimla", "Bishop Cotton School"],
        ["Sherwood College", "Nainital", "Sherwood College"],
        ["The Assam Valley School", "Sonitpur", "The Assam Valley School"],
        ["Ecole Globale International School", "Dehradun", "Ecole Globale International Girls' School"],
        ["GD Goenka World School", "Gurugram", "GD Goenka World School"]
    ];
    const featuredCards = featured.map((school, index) => boardingDirectoryCard(school, index, "Featured"));
    const content = `
        <div class="boarding-schools-section">
            <div class="boarding-schools-intro">
                <div class="boarding-schools-intro-content">
                    <span class="boarding-schools-label">🏫 FEATURED BOARDING SCHOOLS</span>
                    <h2>Boarding Schools in India</h2>
                    <p>Explore residential schools and confirm current campus, boarding and admissions details with each institution.</p>
                </div>
                <div class="boarding-schools-intro-badge"><strong>${featured.length}</strong><span>Featured<br>Schools</span></div>
            </div>
            <div class="boarding-schools-carousel"><div class="boarding-schools-track institution-carousel-track">${featuredCards.join("")}${featuredCards.join("")}</div></div>
            <div class="boarding-schools-bottom">
                <div class="boarding-schools-bottom-text"><span>Looking for more schools?</span><strong>Browse the regional boarding school directory.</strong></div>
                <a class="boarding-schools-explore-btn" href="/schools?category=boarding"><span class="boarding-view-all-text">View All Boarding Schools in India</span><span>→</span></a>
            </div>
            <div class="boarding-schools-all" hidden>${renderBoardingDirectory()}</div>
        </div>`;
    return Section({ id: "top-boarding-schools", title: "", subtitle: "", content });
}

export default TopBoardingSchoolsSection;
