import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function PlaySchoolSection() {

    /* =====================================================
       TOP PLAY SCHOOLS
    ====================================================== */

    const playSchools = [

        {
            rank: "01",
            name: "Little Stars Play School",
            category: "Play School",
            location: "Dwarka, New Delhi",

            program:
                "Playgroup • Nursery • Early Learning",

            rating: "4.7",
            reviews: "1,180",
            score: "9.1",

            ranking:
                "Popular early-learning option in New Delhi",

            highlight:
                "Creative learning, play activities & social development",

            image:
                "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "02",
            name: "Bright Kids Play School",
            category: "Play School",
            location: "Andheri, Mumbai",

            program:
                "Playgroup • Nursery • Early Learning",

            rating: "4.6",
            reviews: "1,020",
            score: "8.9",

            ranking:
                "Popular play-school choice in Mumbai",

            highlight:
                "Activity-based learning & child-focused environment",

            image:
                "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "03",
            name: "Happy Hearts Play School",
            category: "Play School",
            location: "Whitefield, Bengaluru",

            program:
                "Playgroup • Nursery • Kindergarten",

            rating: "4.8",
            reviews: "940",
            score: "9.2",

            ranking:
                "Highly rated early-learning centre in Bengaluru",

            highlight:
                "Play-based learning & holistic child development",

            image:
                "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "04",
            name: "Tiny Tots Play School",
            category: "Play School",
            location: "Baner, Pune",

            program:
                "Playgroup • Nursery • Kindergarten",

            rating: "4.5",
            reviews: "830",
            score: "8.7",

            ranking:
                "Child-friendly early education centre in Pune",

            highlight:
                "Foundational learning & engaging activities",

            image:
                "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
        },


        {
            rank: "05",
            name: "Growing Stars Play School",
            category: "Play School",
            location: "Gurugram, Haryana",

            program:
                "Playgroup • Nursery • Early Learning",

            rating: "4.6",
            reviews: "760",
            score: "8.8",

            ranking:
                "Growing early-learning option in the NCR region",

            highlight:
                "Early skills, creativity & confidence building",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "06",
            name: "Little Angels Play School",
            category: "Play School",
            location: "Bandra, Mumbai",

            program:
                "Playgroup • Nursery • Early Learning",

            rating: "4.7",
            reviews: "690",
            score: "8.9",

            ranking:
                "Popular early-learning centre in Mumbai",

            highlight:
                "Child-friendly learning & social development",

            image:
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    /* =====================================================
       CREATE PLAY SCHOOL CARD
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
                    "Explore Play School"

            },

            type:
                "play-school"

        });

    }


    /* =====================================================
       VISIBLE CARDS
    ====================================================== */

    const visibleSchools =
        playSchools.slice(0, 4);


    /* =====================================================
       HIDDEN CARDS
    ====================================================== */

    const hiddenSchools =
        playSchools.slice(4);


    /* =====================================================
       ORIGINAL CARDS
    ====================================================== */

    const schoolCards =
        visibleSchools
            .map(createCard)
            .join("");


    /* =====================================================
       DUPLICATE CARDS
       FOR SEAMLESS AUTO-SCROLL
    ====================================================== */

    const schoolCardsDuplicate =
        visibleSchools
            .map(createCard)
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
                        🧸 EARLY CHILDHOOD EDUCATION
                    </span>


                    <h2>
                        Top Play Schools in India
                    </h2>


                    <p>
                        Discover play schools focused on early childhood
                        education, early learning, creativity, social
                        development, foundational skills and a joyful
                        learning environment.
                    </p>

                </div>


                <div class="early-learning-badge">

                    <strong>
                        ${playSchools.length}
                    </strong>

                    <span>
                        Featured<br>
                        Play Schools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 MOVING CARDS
            ================================================== -->

            <div class="early-learning-carousel">

                <div
                    class="early-learning-track institution-carousel-track"
                    aria-label="Featured play schools"
                >

                    ${schoolCards}

                    ${schoolCardsDuplicate}

                </div>

            </div>


            <!-- =================================================
                 ALL PLAY SCHOOLS
            ================================================== -->

            <div
                class="early-learning-all"
                hidden
            >

                <div class="early-learning-all-grid">

                    ${hiddenSchools
                        .map(createCard)
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
                        Looking for the right play school?
                    </span>


                    <strong>
                        Explore play schools across India for early childhood education.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                    aria-label="View all play schools"
                >

                    <span class="early-learning-view-all-text">
                        View All Play Schools
                    </span>


                    <span aria-hidden="true">
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
            "play-school",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default PlaySchoolSection;