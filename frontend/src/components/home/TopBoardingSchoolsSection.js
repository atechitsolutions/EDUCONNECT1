import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";

export function TopBoardingSchoolsSection() {

    const boardingSchools = [
        {
            rank: "01",
            name: "The Doon School",
            category: "Boys Boarding School",
            location: "Dehradun, Uttarakhand",
            program: "Boarding • Residential • K-12",
            rating: "4.8",
            reviews: "1,240",
            score: "9.4",
            ranking: "Among India's leading boarding and residential schools in India",
            highlight: "Academic excellence and leadership development",
            image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "02",
            name: "Mayo College",
            category: "Boys Boarding School",
            location: "Ajmer, Rajasthan",
            program: "Boarding • Residential • K-12",
            rating: "4.7",
            reviews: "1,060",
            score: "9.2",
            ranking: "Historic boarding and residential school with a strong legacy in India",
            highlight: "Leadership, academics and campus life",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "03",
            name: "The Lawrence School",
            category: "Co-Educational Boarding",
            location: "Sanawar, Himachal Pradesh",
            program: "Boarding • Residential • K-12",
            rating: "4.7",
            reviews: "920",
            score: "9.0",
            ranking: "Established boarding and residential school in Himachal Pradesh",
            highlight: "Holistic education and student development",
            image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "04",
            name: "Welham Girls' School",
            category: "Girls Boarding School",
            location: "Dehradun, Uttarakhand",
            program: "Boarding • Residential • K-12",
            rating: "4.7",
            reviews: "875",
            score: "9.1",
            ranking: "Well-known girls boarding school in Dehradun, Uttarakhand",
            highlight: "Academic excellence and all-round development",
            image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "05",
            name: "Woodstock School",
            category: "International Boarding",
            location: "Mussoorie, Uttarakhand",
            program: "International Curriculum • Boarding",
            rating: "4.6",
            reviews: "810",
            score: "9.0",
            ranking: "Recognized international boarding school in Mussoorie, Uttarakhand",
            highlight: "Global education and international exposure",
            image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "06",
            name: "Bishop Cotton School",
            category: "Boys Boarding School",
            location: "Shimla, Himachal Pradesh",
            program: "Boarding • Residential • K-12",
            rating: "4.6",
            reviews: "740",
            score: "8.9",
            ranking: "Historic boys boarding school in Shimla, Himachal Pradesh",
            highlight: "Tradition, academics and character building",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "07",
            name: "Sherwood College",
            category: "Co-Educational Boarding",
            location: "Nainital, Uttarakhand",
            program: "Boarding • Residential • K-12",
            rating: "4.6",
            reviews: "680",
            score: "8.8",
            ranking: "Established co-educational boarding school in Nainital, Uttarakhand",
            highlight: "Holistic education and outdoor learning",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "08",
            name: "The Assam Valley School",
            category: "Co-Educational Boarding",
            location: "Sonitpur, Assam",
            program: "Boarding • Residential • K-12",
            rating: "4.5",
            reviews: "610",
            score: "8.7",
            ranking: "Prominent boarding school in Northeast India",
            highlight: "All-round development and campus experience",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "09",
            name: "Ecole Globale International School",
            category: "Girls Boarding School",
            location: "Dehradun, Uttarakhand",
            program: "International Curriculum • Boarding",
            rating: "4.5",
            reviews: "580",
            score: "8.7",
            ranking: "Modern girls international boarding school in Dehradun, Uttarakhand",
            highlight: "Global education and modern learning",
            image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=85"
        },
        {
            rank: "10",
            name: "GD Goenka World School",
            category: "International Boarding",
            location: "Gurugram, Haryana",
            program: "International Curriculum • Boarding",
            rating: "4.5",
            reviews: "540",
            score: "8.6",
            ranking: "International boarding school in Gurugram, Haryana",
            highlight: "Global exposure and modern infrastructure",
            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        }
    ];

    function createSchoolCard(school) {
        return InstitutionCard({
            item: {
                rank: school.rank,
                name: school.name,
                category: school.category,
                program: school.program,
                location: school.location,
                rating: school.rating,
                reviews: school.reviews,
                score: school.score,
                ranking: school.ranking,
                highlight: school.highlight,
                image: school.image,
                actionLabel: "Explore School"
            },
            type: "boarding-school"
        });
    }

    const schoolCards = boardingSchools
        .map(createSchoolCard)
        .join("");

    const schoolCardsDuplicate = boardingSchools
        .map(createSchoolCard)
        .join("");

    const content = `
        <div class="boarding-schools-section">

            <div class="boarding-schools-intro">

                <div class="boarding-schools-intro-content">

                    <span class="boarding-schools-label">
                        🏫 FEATURED BOARDING SCHOOLS
                    </span>

                    <h2>
                        Top 10 Boarding Schools in India
                    </h2>

                    <p>
                        Explore top boarding schools in India and discover
                        residential schools known for academics, campus life,
                        leadership, international education and holistic
                        student development.
                    </p>

                </div>

                <div class="boarding-schools-intro-badge">

                    <strong>
                        ${boardingSchools.length}
                    </strong>

                    <span>
                        Featured<br>
                        Schools
                    </span>

                </div>

            </div>

            <div class="boarding-schools-carousel">

                <div class="boarding-schools-track institution-carousel-track">

                    ${schoolCards}

                    ${schoolCardsDuplicate}

                </div>

            </div>

            <div class="boarding-schools-bottom">

                <div class="boarding-schools-bottom-text">

                    <span>
                        Looking for more schools?
                    </span>

                    <strong>
                        Explore top boarding schools and residential schools across India.
                    </strong>

                </div>

                <button
                    class="boarding-schools-explore-btn"
                    type="button"
                >

                    <span class="boarding-view-all-text">
                        View All Boarding Schools in India
                    </span>

                    <span>
                        →
                    </span>

                </button>

            </div>

            <div
                class="boarding-schools-all"
                hidden
            >

                <div class="boarding-schools-all-grid">

                    ${boardingSchools
                        .map(createSchoolCard)
                        .join("")
                    }

                </div>

            </div>

        </div>
    `;

    return Section({
        id: "top-boarding-schools",
        title: "",
        subtitle: "",
        content
    });
}

export default TopBoardingSchoolsSection;