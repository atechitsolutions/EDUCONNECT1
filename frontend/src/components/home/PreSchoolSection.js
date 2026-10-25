import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function PreSchoolSection() {

    /* =====================================================
       TOP PRE SCHOOLS
    ====================================================== */

    const preSchools = [

        {
            rank: "01",
            name: "Happy Kids Pre School",
            category: "Pre School",
            location: "Rohini, New Delhi",

            program:
                "Playgroup • Nursery • LKG • UKG",

            rating: "4.8",
            reviews: "1,240",
            score: "9.2",

            ranking:
                "Popular early-learning preschool in New Delhi",

            highlight:
                "Activity-based learning, early childhood education & child-friendly environment",

            image:
                "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "02",
            name: "Little Angels Pre School",
            category: "Pre School",
            location: "Bandra, Mumbai",

            program:
                "Playgroup • Nursery • LKG • UKG",

            rating: "4.7",
            reviews: "1,080",
            score: "9.0",

            ranking:
                "Well-known preschool and early-learning centre in Mumbai",

            highlight:
                "Creative learning, foundational education & child development",

            image:
                "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "03",
            name: "Sunshine Pre School",
            category: "Pre School",
            location: "Indiranagar, Bengaluru",

            program:
                "Nursery • LKG • UKG",

            rating: "4.6",
            reviews: "940",
            score: "8.8",

            ranking:
                "Popular preschool focused on foundational education",

            highlight:
                "Play-based learning, early education & social development",

            image:
                "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "04",
            name: "Growing Minds Pre School",
            category: "Pre School",
            location: "Kothrud, Pune",

            program:
                "Playgroup • Nursery • LKG • UKG",

            rating: "4.5",
            reviews: "860",
            score: "8.7",

            ranking:
                "Growing early-learning preschool network in Pune",

            highlight:
                "Child-focused curriculum, early learning & engaging activities",

            image:
                "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
        },


        {
            rank: "05",
            name: "Smart Kids Pre School",
            category: "Pre School",
            location: "Gurugram, Haryana",

            program:
                "Playgroup • Nursery • LKG • UKG",

            rating: "4.7",
            reviews: "790",
            score: "8.9",

            ranking:
                "Popular preschool option in the NCR region",

            highlight:
                "Early academics, creativity, foundational learning & confidence building",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        },


        {
            rank: "06",
            name: "Rainbow Pre School",
            category: "Pre School",
            location: "Jaipur, Rajasthan",

            program:
                "Nursery • LKG • UKG",

            rating: "4.6",
            reviews: "720",
            score: "8.6",

            ranking:
                "Child-friendly early education preschool in Jaipur",

            highlight:
                "Foundational learning, early childhood education & all-round development",

            image:
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    /* =====================================================
       CREATE PRE SCHOOL CARD
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
                    "Explore Pre School"

            },

            type:
                "pre-school"

        });

    }


    /* =====================================================
       VISIBLE CARDS
    ====================================================== */

    const visibleSchools =
        preSchools.slice(0, 4);


    /* =====================================================
       HIDDEN CARDS
    ====================================================== */

    const hiddenSchools =
        preSchools.slice(4);


    /* =====================================================
       ORIGINAL CARDS
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
                        🎈 EARLY LEARNING
                    </span>


                    <h2>
                        Top Pre Schools in India
                    </h2>


                    <p>
                        Explore leading pre schools and preschools offering
                        early childhood education, foundational learning,
                        activity-based learning, child development and
                        child-friendly environments.
                    </p>

                </div>


                <div class="early-learning-badge">

                    <strong>
                        ${preSchools.length}
                    </strong>

                    <span>
                        Featured<br>
                        Pre Schools
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
                 ALL PRE SCHOOLS
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
                        Looking for the right pre school?
                    </span>


                    <strong>
                        Explore pre schools and early childhood education options across India.
                    </strong>

                </div>


                <button
                    class="early-learning-explore-btn"
                    type="button"
                >

                    <span class="early-learning-view-all-text">
                        View All Pre Schools
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
            "pre-school",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default PreSchoolSection;