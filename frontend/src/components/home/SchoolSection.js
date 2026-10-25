import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function SchoolSection() {

    /* =====================================================
       TOP SCHOOLS
    ====================================================== */

    const schools = [

        {
            rank: "01",
            name: "Delhi Public School",
            category: "CBSE School",
            location: "R.K. Puram, New Delhi",

            program:
                "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.8",
            reviews: "2,140",
            score: "9.2",

            ranking:
                "Among the leading CBSE schools in India",

            highlight:
                "Strong academics, CBSE school education, activities & student development",

            image:
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "02",
            name: "The Doon School",
            category: "ICSE School",
            location: "Dehradun, Uttarakhand",

            program:
                "Middle School • Secondary • Senior Secondary",

            rating: "4.8",
            reviews: "1,850",
            score: "9.4",

            ranking:
                "One of India's renowned residential schools",

            highlight:
                "Academic excellence, ICSE school education, leadership & holistic learning",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "03",
            name: "Modern School",
            category: "CBSE School",
            location: "Barakhamba Road, New Delhi",

            program:
                "Middle School • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,640",
            score: "9.0",

            ranking:
                "Established CBSE school with strong academic reputation",

            highlight:
                "CBSE academics, sports, co-curricular activities & student development",

            image:
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "04",
            name: "Ryan International School",
            category: "CBSE School",
            location: "Malad, Mumbai",

            program:
                "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.6",
            reviews: "1,520",
            score: "8.7",

            ranking:
                "Established K-12 school network in India",

            highlight:
                "Modern school education, activities & student support",

            image:
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "05",
            name: "National Public School",
            category: "CBSE School",
            location: "Rajajinagar, Bengaluru",

            program:
                "Nursery • Primary • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,410",
            score: "8.9",

            ranking:
                "Well-regarded CBSE school for academics and student development",

            highlight:
                "Academic focus, discipline, CBSE curriculum & co-curricular learning",

            image:
                "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "06",
            name: "Symbiosis International School",
            category: "IB / IGCSE School",
            location: "Viman Nagar, Pune",

            program:
                "Pre Primary • Primary • Secondary • Senior Secondary",

            rating: "4.7",
            reviews: "1,120",
            score: "9.0",

            ranking:
                "International curriculum-focused school",

            highlight:
                "IB and IGCSE education, global exposure, modern campus & holistic learning",

            image:
                "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    /* =====================================================
       CREATE SCHOOL CARD
    ====================================================== */

    function createCard(school) {

        return InstitutionCard({

            item: {

                rank:
                    school.rank,

                name:
                    school.name,

                category:
                    school.category,

                location:
                    school.location,

                program:
                    school.program,

                rating:
                    school.rating,

                reviews:
                    school.reviews,

                score:
                    school.score,

                ranking:
                    school.ranking,

                highlight:
                    school.highlight,

                image:
                    school.image,

                actionLabel:
                    "Explore School"

            },

            type:
                "school"

        });

    }


    /* =====================================================
       VISIBLE CARDS
    ====================================================== */

    const visibleSchools =
        schools.slice(0, 4);


    /* =====================================================
       HIDDEN CARDS
    ====================================================== */

    const hiddenSchools =
        schools.slice(4);


    /* =====================================================
       CREATE ORIGINAL CARDS
    ====================================================== */

    const schoolCards =
        visibleSchools
            .map(
                createCard
            )
            .join("");


    /* =====================================================
       DUPLICATE CARDS
       FOR SEAMLESS AUTO-SCROLL
    ====================================================== */

    const schoolCardsDuplicate =
        visibleSchools
            .map(
                createCard
            )
            .join("");


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="early-learning-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

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


                <div class="early-learning-badge">

                    <strong>
                        ${schools.length}
                    </strong>

                    <span>
                        Featured<br>
                        Schools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 MOVING CARDS
            ================================================== -->

            <div class="early-learning-carousel">

                <div
                    class="early-learning-track institution-carousel-track"
                >

                    ${schoolCards}

                    ${schoolCardsDuplicate}

                </div>

            </div>


            <!-- =================================================
                 ALL SCHOOLS
            ================================================== -->

            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${hiddenSchools
                        .map(
                            createCard
                        )
                        .join("")
                    }

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="early-learning-bottom">

                <div>

                    <span>
                        Looking for the right school?
                    </span>


                    <strong>
                        Explore schools, school boards and education options across India.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                >

                    <span class="early-learning-view-all-text">
                        View All Schools
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>

        </div>

    `;


    /* =====================================================
       RETURN SECTION
    ====================================================== */

    return Section({

        id:
            "school",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default SchoolSection;