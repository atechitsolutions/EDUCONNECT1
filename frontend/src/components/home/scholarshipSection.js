import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function ScholarshipSection() {

    /* =====================================================
       POPULAR SCHOLARSHIPS
    ====================================================== */

    const popularScholarships = [

        {
            rank: "01",

            name:
                "National Scholarship Portal",

            category:
                "Government Scholarships",

            location:
                "India",

            program:
                "School • UG • PG • Professional",

            rating:
                "4.8",

            reviews:
                "2,340",

            score:
                "9.3",

            ranking:
                "Major platform for central and state scholarship schemes",

            highlight:
                "Government scholarships for eligible students",

            image:
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Scholarships"

        },


        {
            rank: "02",

            name:
                "Merit-Based Scholarships",

            category:
                "Academic Excellence",

            location:
                "India",

            program:
                "School • UG • PG",

            rating:
                "4.7",

            reviews:
                "1,820",

            score:
                "9.0",

            ranking:
                "Scholarship opportunities based on academic performance",

            highlight:
                "Reward strong academic achievement and merit",

            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Merit Scholarships"

        },


        {
            rank: "03",

            name:
                "Scholarships for Girls",

            category:
                "Women in Education",

            location:
                "India",

            program:
                "School • UG • PG • STEM",

            rating:
                "4.7",

            reviews:
                "1,560",

            score:
                "8.9",

            ranking:
                "Financial support programs encouraging girls' education",

            highlight:
                "Education support for girls and women",

            image:
                "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Scholarships"

        }

    ];


    /* =====================================================
       OTHER SCHOLARSHIPS
    ====================================================== */

    const otherScholarships = [

        {
            rank: "04",

            name:
                "Need-Based Scholarships",

            category:
                "Financial Assistance",

            location:
                "India",

            program:
                "School • UG • PG",

            rating:
                "4.6",

            reviews:
                "1,240",

            score:
                "8.8",

            ranking:
                "Financial aid based on family income and need",

            highlight:
                "Support for students facing financial challenges",

            image:
                "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Financial Aid"

        },


        {
            rank: "05",

            name:
                "International Scholarships",

            category:
                "Study Abroad",

            location:
                "Global",

            program:
                "UG • PG • MBA • Research",

            rating:
                "4.6",

            reviews:
                "1,090",

            score:
                "8.9",

            ranking:
                "Funding opportunities for international education",

            highlight:
                "Scholarships offered by universities and organizations",

            image:
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore International Scholarships"

        },


        {
            rank: "06",

            name:
                "Private Scholarships",

            category:
                "Corporate & NGO Support",

            location:
                "India",

            program:
                "School • UG • PG • Professional",

            rating:
                "4.5",

            reviews:
                "920",

            score:
                "8.6",

            ranking:
                "Scholarships supported by companies, trusts and NGOs",

            highlight:
                "Corporate, foundation and nonprofit funding",

            image:
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Private Scholarships"

        }

    ];


    /* =====================================================
       COMBINE ALL SCHOLARSHIPS
    ====================================================== */

    const allScholarships = [

        ...popularScholarships,

        ...otherScholarships

    ];


    /* =====================================================
       CREATE SCHOLARSHIP CARD
    ====================================================== */

    function createScholarshipCard(
        scholarship
    ) {

        return InstitutionCard({

            item: {

                rank:
                    scholarship.rank,

                name:
                    scholarship.name,

                category:
                    scholarship.category,

                location:
                    scholarship.location,

                program:
                    scholarship.program,

                rating:
                    scholarship.rating,

                reviews:
                    scholarship.reviews,

                score:
                    scholarship.score,

                ranking:
                    scholarship.ranking,

                highlight:
                    scholarship.highlight,

                image:
                    scholarship.image,

                actionLabel:
                    scholarship.actionLabel

            },

            type:
                "scholarship"

        });

    }


    /* =====================================================
       CREATE ALL SIX CARDS
    ====================================================== */

    const scholarshipCards =
        allScholarships
            .map(
                createScholarshipCard
            )
            .join("");


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="scholarship-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="scholarship-intro">

                <div class="scholarship-intro-content">

                    <span class="scholarship-eyebrow">
                        🎓 FINANCIAL SUPPORT
                    </span>


                    <h2>
                        Scholarships
                    </h2>


                    <p>
                        Discover scholarships and financial
                        assistance opportunities for school,
                        college, university and professional
                        education.
                    </p>

                </div>


                <div class="scholarship-stat">

                    <strong>
                        ${allScholarships.length}
                    </strong>

                    <span>
                        Featured<br>
                        Scholarships
                    </span>

                </div>

            </div>


            <!-- =================================================
                 HORIZONTAL CAROUSEL
            ================================================== -->

            <div class="scholarship-carousel">


                <div class="scholarship-viewport">

                    <div class="scholarship-track">

                        ${scholarshipCards}

                    </div>

                </div>


                <!-- =================================================
                     NEXT BUTTON
                ================================================== -->

                <button
                    type="button"
                    class="scholarship-next"
                    aria-label="Show next scholarships"
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
            "scholarship",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default ScholarshipSection;