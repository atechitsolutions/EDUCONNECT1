import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function CompareCollegeSection() {

    /* =====================================================
       MAIN COMPARISON OPTIONS
    ====================================================== */

    const comparisonOptions = [

        {
            rank: "01",

            name:
                "Compare Colleges",

            category:
                "College Comparison",

            location:
                "India",

            program:
                "Courses • Fees • Placements • Infrastructure",

            rating:
                "4.8",

            reviews:
                "2,180",

            score:
                "9.3",

            ranking:
                "Compare institutions across the factors that matter most",

            highlight:
                "Courses, fees, placements, rankings & campus facilities",

            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Colleges"
        },


        {
            rank: "02",

            name:
                "Compare Universities",

            category:
                "University Comparison",

            location:
                "India",

            program:
                "Programs • Fees • Rankings • Placements",

            rating:
                "4.7",

            reviews:
                "1,760",

            score:
                "9.1",

            ranking:
                "Compare universities across academic and career factors",

            highlight:
                "Programs, rankings, facilities & placement opportunities",

            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Universities"
        },


        {
            rank: "03",

            name:
                "Compare Courses",

            category:
                "Course Comparison",

            location:
                "India",

            program:
                "Eligibility • Duration • Fees • Careers",

            rating:
                "4.6",

            reviews:
                "1,420",

            score:
                "8.9",

            ranking:
                "Evaluate course options across multiple institutions",

            highlight:
                "Eligibility, fees, duration & career opportunities",

            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Courses"
        }

    ];


    /* =====================================================
       COMPARISON FACTORS
    ====================================================== */

    const comparisonFactors = [

        {
            rank: "04",

            name:
                "Compare Fees",

            category:
                "Education Cost",

            location:
                "India",

            program:
                "Tuition • Hostel • Additional Charges",

            rating:
                "4.7",

            reviews:
                "1,350",

            score:
                "9.0",

            ranking:
                "Compare total education costs before making a decision",

            highlight:
                "Tuition, accommodation & financial assistance",

            image:
                "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Fees"
        },


        {
            rank: "05",

            name:
                "Compare Placements",

            category:
                "Career Opportunities",

            location:
                "India",

            program:
                "Recruiters • Salary • Internships • Placements",

            rating:
                "4.8",

            reviews:
                "1,580",

            score:
                "9.2",

            ranking:
                "Understand the career outcomes offered by institutions",

            highlight:
                "Placements, recruiters, salaries & internships",

            image:
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Placements"
        },


        {
            rank: "06",

            name:
                "Compare Rankings",

            category:
                "Institution Rankings",

            location:
                "India",

            program:
                "NIRF • Reputation • Academics • Research",

            rating:
                "4.7",

            reviews:
                "1,240",

            score:
                "9.1",

            ranking:
                "Compare institutional rankings and academic reputation",

            highlight:
                "Rankings, academics, research & reputation",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Compare Rankings"
        }

    ];


    /* =====================================================
       COMBINE ALL COMPARISON OPTIONS
    ====================================================== */

    const allComparisons = [

        ...comparisonOptions,

        ...comparisonFactors

    ];


    /* =====================================================
       CREATE COMPARISON CARD
    ====================================================== */

    function createComparisonCard(item) {

        return InstitutionCard({

            item: {

                rank:
                    item.rank,

                name:
                    item.name,

                category:
                    item.category,

                location:
                    item.location,

                program:
                    item.program,

                rating:
                    item.rating,

                reviews:
                    item.reviews,

                score:
                    item.score,

                ranking:
                    item.ranking,

                highlight:
                    item.highlight,

                image:
                    item.image,

                actionLabel:
                    item.actionLabel

            },

            type:
                "comparison"

        });

    }


    /* =====================================================
       CREATE ALL SIX CARDS
    ====================================================== */

    const comparisonCards =
        allComparisons
            .map(createComparisonCard)
            .join("");


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="compare-college-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="compare-college-intro">

                <div class="compare-college-intro-content">

                    <span class="compare-college-eyebrow">
                        ⚖️ COMPARE & CHOOSE
                    </span>


                    <h2>
                        Compare Colleges & Courses
                    </h2>


                    <p>
                        Compare colleges, universities and courses
                        across fees, placements, rankings, programs,
                        infrastructure and other important factors
                        before making an education decision.
                    </p>

                </div>


                <div class="compare-college-stat">

                    <strong>
                        ${allComparisons.length}
                    </strong>

                    <span>
                        Comparison<br>
                        Tools
                    </span>

                </div>

            </div>


            <!-- =================================================
                 COMPARISON CAROUSEL
            ================================================== -->

            <div class="compare-college-carousel">

                <div class="compare-college-viewport">

                    <div class="compare-college-track">

                        ${comparisonCards}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="compare-college-next"
                    aria-label="Show next comparison"
                >

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
            "compare-college",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default CompareCollegeSection;