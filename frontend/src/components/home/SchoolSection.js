import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import { campusPhotos, fallbackImage, getRegionalSchoolListings } from "./regionalSchools.js";

export function SchoolSection() {
    const schools = [
        {
            rank: "01",
            name: "Delhi Public School",
            category: "CBSE School",
            location: "R.K. Puram, New Delhi",

            program: "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.8",
            reviews: "2,140",
            score: "9.2",

            ranking: "Among the leading CBSE schools in India",

            highlight: "Strong academics, CBSE school education, activities & student development",

            image: campusPhotos["Delhi Public School, R.K. Puram"]?.image || "",
            imageSource: campusPhotos["Delhi Public School, R.K. Puram"]?.source || "",
        },

        {
            rank: "02",
            name: "The Doon School",
            category: "ICSE School",
            location: "Dehradun, Uttarakhand",

            program: "Middle School • Secondary • Senior Secondary",

            rating: "4.8",
            reviews: "1,850",
            score: "9.4",

            ranking: "One of India's renowned residential schools",

            highlight: "Academic excellence, ICSE school education, leadership & holistic learning",

            image: campusPhotos["The Doon School"]?.image || "",
            imageSource: campusPhotos["The Doon School"]?.source || "",
        },

        {
            rank: "03",
            name: "Modern School",
            category: "CBSE School",
            location: "Barakhamba Road, New Delhi",

            program: "Middle School • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,640",
            score: "9.0",

            ranking: "Established CBSE school with strong academic reputation",

            highlight: "CBSE academics, sports, co-curricular activities & student development",

            image: "https://images.indianexpress.com/2022/06/modern-school.jpg?w=1200",
            imageSource:
                "https://indianexpress.com/article/cities" +
                "/delhi/modern-school-asks-ews-children-t" +
                "o-pay-rs-67000-in-fees-7980765/",
        },

        {
            rank: "04",
            name: "Ryan International School",
            category: "CBSE School",
            location: "Malad, Mumbai",

            program: "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.6",
            reviews: "1,520",
            score: "8.7",

            ranking: "Established K-12 school network in India",

            highlight: "Modern school education, activities & student support",

            image:
                "https://www.ryangroup.org/public/images/" +
                "front_end/ryan-images/Building_161858063" +
                "0.jpg",
            imageSource:
                "https://www.ryangroup.org/ryaninternatio" +
                "nal/cbse/mumbai/ryan-international-schoo" +
                "l-malad-west/about/about-school",
        },

        {
            rank: "05",
            name: "National Public School",
            category: "CBSE School",
            location: "Rajajinagar, Bengaluru",

            program: "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,410",
            score: "8.9",

            ranking: "Well-regarded CBSE school for academics and student development",

            highlight: "Academic focus, discipline, CBSE curriculum & co-curricular learning",

            image:
                "https://bewiseblobprod.blob.core.windows" +
                ".net/assets/bewise/uploads/excl_banneryt" +
                "pj14.jpg",
            imageSource: "https://bewise.in/articles-blogs/best-schools-in-rajajinagar-bangalore",
        },

        {
            rank: "06",
            name: "Symbiosis International School",
            category: "IB / IGCSE School",
            location: "Viman Nagar, Pune",

            program: "Pre Primary • Primary • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,120",
            score: "9.0",

            ranking: "International curriculum-focused school",

            highlight: "IB and IGCSE education, global exposure, modern campus & holistic learning",

            image: "https://www.symbiosisinternationalschool.net/assets/images/sis-campus.jpg",
            imageSource: "https://www.symbiosisinternationalschool.net/overview",
        },
    ];

    const curatedSchoolNames = new Set(
        schools.map((school) => school.name.toLowerCase().replace(/[^a-z0-9]/g, "")),
    );
    const allHomeSchools = [
        ...schools,
        ...getRegionalSchoolListings()
            .filter(
                (school) =>
                    !curatedSchoolNames.has(school.name.toLowerCase().replace(/[^a-z0-9]/g, "")),
            )
            .map((school, index) => ({
                rank: String(school.rank || index + 1).padStart(2, "0"),
                name: school.name,
                category:
                    school.board && school.board !== "Not verified"
                        ? school.board
                        : "School listing",
                location: [school.city, school.state].filter(Boolean).join(", "),
                program: school.status || school.schoolType || "School listing",
                ranking: "Regional school directory listing",
                highlight: school.description,
                image: school.image,
                imageSource: school.photoSource || "",
            })),
    ];

    function createCard(school) {
        return InstitutionCard({
            item: {
                rank: school.rank,

                name: school.name,

                category: school.category,

                location: school.location,

                program: school.program,

                rating: school.rating,

                reviews: school.reviews,

                score: school.score,

                ranking: school.ranking,

                highlight: school.highlight,

                image: school.image,
                imageSource: school.imageSource,

                imageFallback: fallbackImage(school.name),

                actionHref: "",

                actionMode: "school-details",
                detailsOnCard: false,
                actionLayout: "home-directory-actions",
                enquiryHref: `/schools?category=all&q=${encodeURIComponent(school.name)}&institution=${encodeURIComponent(school.name)}&location=${encodeURIComponent(school.location || "")}&enquire=1`,
                overview: [
                    school.ranking,
                    school.highlight,
                    school.rating
                        ? `Listed rating: ${school.rating}/5${school.reviews ? ` from ${school.reviews} reviews` : ""}.`
                        : "",
                ]
                    .filter(Boolean)
                    .join(" "),

                actionLabel: "Explore School",
            },

            type: "school",
        });
    }

    const visibleSchools = allHomeSchools;

    const hiddenSchools = [];

    const schoolCards = visibleSchools.map(createCard).join("");

    const schoolCardsDuplicate = "";

    const content = `

        <div class="early-learning-section">



            <div class="early-learning-intro">

                <div class="early-learning-intro-content">

                    <span class="early-learning-label">
                        🏫 SCHOOL EDUCATION
                    </span>


                    <h2>
                        Top Schools in India
                    </h2>


                    <p>
                        Explore leading schools across India and
                        compare CBSE, ICSE, IB and IGCSE school boards,
                        classes, locations, academic environment,
                        ratings and student opportunities.
                    </p>

                </div>


                <div class="school-region-search school-region-search-inline" aria-label="Find schools by region">
                    <label for="school-region-select">Find top schools by region</label>
                    <div class="school-region-controls">
                        <select id="school-region-select" aria-label="Select a region">
                            <option value="">Choose a region</option>
                            <option>Rajasthan</option><option>Jaipur</option><option>Delhi</option>
                            <option>Himachal Pradesh</option><option>Uttar Pradesh</option><option>Uttarakhand</option>
                            <option>Gujarat</option><option>Madhya Pradesh</option><option>Telangana</option><option>Andhra Pradesh</option>
                        </select>
                        <button type="button" class="school-region-search-button">Search</button>
                    </div>
                    <p>Approximate editorial listings; not official rankings. Confirm school details and campus photos through the linked sources.</p>
                </div>

            </div>



            <div class="school-region-results" hidden aria-live="polite">
                <h3 class="school-region-results-title"></h3>
                <div class="school-region-results-grid"></div>
            </div>

            <div class="early-learning-carousel" aria-label="All school listings"><div class="early-learning-track institution-carousel-track">${schoolCards}${schoolCardsDuplicate}</div></div>



            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${hiddenSchools.map(createCard).join("")}

                </div>

            </div>



            <div class="early-learning-bottom">

                <div>

                    <span>
                        Looking for a school?
                    </span>


                    <strong>
                        Find a school near you.
                    </strong>

                </div>


                <a
                    href="/schools?category=all"
                    class="early-learning-explore-btn"
                >

                    <span class="early-learning-view-all-text">
                        View All Schools
                    </span>


                    <span>
                        →
                    </span>

                </a>

            </div>

        </div>

    `;

    return Section({
        id: "school",

        title: "",

        subtitle: "",

        content,
    });
}

export default SchoolSection;
