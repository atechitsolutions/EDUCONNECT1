import Section from "../common/Section.js";
import { regionalBoardingSchools, boardingDirectoryCard } from "./boardingSchoolDirectory.js";

export function TopBoardingSchoolsSection() {
    const seen = new Set();
    const allBoardingSchools = Object.entries(regionalBoardingSchools).flatMap(([region, schools]) => schools.filter(school => {
        const key = `${(school[2] || school[0]).toLowerCase().replace(/[^a-z0-9]/g, "")}|${school[1].toLowerCase().replace(/[^a-z0-9]/g, "")}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    }).map(school => ({ school, region })));
    const featuredCards = allBoardingSchools.map(({ school, region }, index) => boardingDirectoryCard(school, index, region));
    const content = `
        <div class="boarding-schools-section">
            <div class="boarding-schools-intro">
                <div class="boarding-schools-intro-content">
                    <span class="boarding-schools-label">🏫 FEATURED BOARDING SCHOOLS</span>
                    <h2>Boarding Schools in India</h2>
                    <p>Explore residential schools and confirm current campus, boarding and admissions details with each institution.</p>
                </div>
                <div class="boarding-schools-intro-badge"><strong>${allBoardingSchools.length}</strong><span>Schools listed</span></div>
            </div>
            <div class="boarding-schools-carousel" aria-label="All boarding school listings"><div class="boarding-schools-track institution-carousel-track">${featuredCards.join("")}</div></div>
            <div class="boarding-schools-bottom">
                <div class="boarding-schools-bottom-text"><span>Need a boarding school?</span><strong>Find schools by region.</strong></div>
                <a class="boarding-schools-explore-btn" href="/schools?category=boarding"><span class="boarding-view-all-text">Browse Boarding Schools</span><span>→</span></a>
            </div>
        </div>`;
    return Section({ id: "top-boarding-schools", title: "", subtitle: "", content });
}

export default TopBoardingSchoolsSection;
