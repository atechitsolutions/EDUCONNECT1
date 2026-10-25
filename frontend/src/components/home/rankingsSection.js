import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function RankingsSection() {

    /* =====================================================
       NATIONAL RANKINGS
    ====================================================== */

    const nationalRankings = [

        {
            rank: "01",

            name:
                "Top Universities",

            category:
                "University Rankings",

            location:
                "India",

            program:
                "UG • PG • Research • Professional Programs",

            rating:
                "4.9",

            reviews:
                "2,840",

            score:
                "9.6",

            ranking:
                "Compare top universities in India across academics, research, infrastructure, placements and reputation",

            highlight:
                "Academics, research, placements & reputation",

            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Universities"

        },


        {
            rank: "02",

            name:
                "Top Colleges",

            category:
                "College Rankings",

            location:
                "India",

            program:
                "UG • PG • Professional Courses",

            rating:
                "4.8",

            reviews:
                "2,410",

            score:
                "9.3",

            ranking:
                "Compare top colleges in India across streams, courses, academics, placements and student opportunities",

            highlight:
                "Courses, academics, placements & student opportunities",

            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Colleges"

        },


        {
            rank: "03",

            name:
                "Top Schools",

            category:
                "School Rankings",

            location:
                "India",

            program:
                "Primary • Secondary • Senior Secondary",

            rating:
                "4.7",

            reviews:
                "1,980",

            score:
                "9.1",

            ranking:
                "Discover top schools in India based on academics, facilities, teaching quality and student development",

            highlight:
                "Academics, facilities, teaching & development",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Schools"

        }

    ];


    /* =====================================================
       CATEGORY RANKINGS
    ====================================================== */

    const categoryRankings = [

        {
            rank: "04",

            name:
                "Engineering Rankings",

            category:
                "Engineering Colleges",

            location:
                "India",

            program:
                "B.Tech • M.Tech • Research",

            rating:
                "4.8",

            reviews:
                "2,160",

            score:
                "9.2",

            ranking:
                "Compare top engineering colleges in India based on education quality, B.Tech and M.Tech courses, placements, infrastructure and research",

            highlight:
                "Placements, infrastructure & technical education",

            image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Engineering"

        },


        {
            rank: "05",

            name:
                "Management Rankings",

            category:
                "MBA & Business Schools",

            location:
                "India",

            program:
                "BBA • MBA • Executive Programs",

            rating:
                "4.8",

            reviews:
                "2,030",

            score:
                "9.4",

            ranking:
                "Compare top management colleges in India through BBA, MBA, academics, placements, faculty and industry exposure",

            highlight:
                "Placements, faculty & industry exposure",

            image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Management"

        },


        {
            rank: "06",

            name:
                "Medical Rankings",

            category:
                "Medical Colleges",

            location:
                "India",

            program:
                "MBBS • MD • MS • Healthcare",

            rating:
                "4.7",

            reviews:
                "1,740",

            score:
                "9.1",

            ranking:
                "Compare top medical colleges in India on medical education, MBBS, MD, MS, facilities, research and healthcare programs",

            highlight:
                "Medical education, facilities & research",

            image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Medical"

        },

        {
            rank: "07",
            name: "Top Pre-Schools",
            category: "Pre-School Rankings",
            location: "India",
            program: "Playgroup • Nursery • LKG • UKG",
            ranking: "Explore early-learning centres using Atech's review and analysis of learning approach, safety, facilities and family information.",
            highlight: "Early learning, safety & child development",
            image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85",
            actionLabel: "Explore Pre-Schools",
            actionHref: "#pre-school",
            rankingCategory: "preschool"
        },

        {
            rank: "08",
            name: "Top Play Schools",
            category: "Play School Rankings",
            location: "India",
            program: "Playgroup • Nursery • Early learning",
            ranking: "Discover play schools reviewed by Atech across child-centred activities, safety, facilities and early development.",
            highlight: "Play-based learning & a safe environment",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
            actionLabel: "Explore Play Schools",
            actionHref: "#play-school",
            rankingCategory: "playschool"
        },

        {
            rank: "09",
            name: "Top Boarding Schools",
            category: "Boarding School Rankings",
            location: "India",
            program: "Residential • Day boarding • K–12",
            ranking: "Compare residential schools using Atech's review and analysis of academics, student care, campus facilities and programmes.",
            highlight: "Academics, residential life & student care",
            image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85",
            actionLabel: "Explore Boarding Schools",
            actionHref: "#boarding-schools",
            rankingCategory: "boarding"
        }

    ];


    /* =====================================================
       COMBINE ALL RANKINGS
    ====================================================== */

    const allRankings = [

        ...nationalRankings,

        ...categoryRankings

    ];


    /* =====================================================
       CREATE RANKING CARD
    ====================================================== */

    function createRankingCard(
        rankingItem
    ) {

        return InstitutionCard({

            item: {

                rank:
                    rankingItem.rank,

                name:
                    rankingItem.name,

                category:
                    rankingItem.category,

                location:
                    rankingItem.location,

                program:
                    rankingItem.program,

                rating:
                    rankingItem.rating,

                reviews:
                    rankingItem.reviews,

                score:
                    rankingItem.score,

                ranking:
                    rankingItem.ranking,

                highlight:
                    rankingItem.highlight,

                image:
                    rankingItem.image,

                actionLabel:
                    rankingItem.actionLabel,

                actionHref:
                    rankingItem.actionHref || ({
                        "Top Universities": "#rankings",
                        "Top Colleges": "#colleges",
                        "Top Schools": "#schools",
                        "Engineering Rankings": "#colleges",
                        "Management Rankings": "#colleges",
                        "Medical Rankings": "#colleges"
                    }[rankingItem.name] || "#rankings"),

                rankingCategory: rankingItem.rankingCategory || ({
                    "Top Universities": "universities",
                    "Top Colleges": "colleges",
                    "Top Schools": "schools",
                    "Engineering Rankings": "engineering",
                    "Management Rankings": "management",
                    "Medical Rankings": "medical"
                }[rankingItem.name] || "other"),

                rating: "",
                reviews: "",
                score: ""

            },

            type:
                "ranking"

        });

    }


    /* =====================================================
       CREATE ALL SIX CARDS
    ====================================================== */

    const rankingCards =
        allRankings
            .map(
                createRankingCard
            )
            .join("");


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="rankings-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="rankings-intro">

                <div class="rankings-intro-content">

                    <span class="rankings-eyebrow">
                        🏆 EDUCATION RANKINGS
                    </span>


                    <h2>
                        Atech Review &amp; Analysis
                    </h2>


                    <p>
                        Education rankings in India, guided by Atech’s independent review of academics, programmes, facilities, and publicly available information.
                    </p>

                </div>


                <div class="rankings-stat">

                    <strong>
                        ${allRankings.length}
                    </strong>

                    <span>
                        Featured<br>
                        Rankings
                    </span>

                </div>

            </div>

            <div class="rankings-filter-bar">
                <label for="rankings-category-filter">Browse rankings by category</label>
                <select id="rankings-category-filter" aria-controls="rankings-carousel-track">
                    <option value="all">All categories</option>
                    <option value="universities">Universities</option>
                    <option value="colleges">Colleges</option>
                    <option value="engineering">Engineering colleges</option>
                    <option value="management">Management colleges</option>
                    <option value="medical">Medical colleges</option>
                    <option value="schools">Schools</option>
                    <option value="preschool">Pre-schools</option>
                    <option value="playschool">Play schools</option>
                    <option value="boarding">Boarding schools</option>
                </select>
            </div>


            <!-- =================================================
                 HORIZONTAL RANKINGS CAROUSEL
            ================================================== -->

            <div class="rankings-carousel">

                <div class="rankings-viewport">

                    <div class="rankings-track" id="rankings-carousel-track">

                        ${rankingCards}

                    </div>

                </div>


                <!-- =================================================
                     NEXT BUTTON
                ================================================== -->

                <button
                    type="button"
                    class="rankings-next"
                    aria-label="Show next education rankings in India"
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
            "rankings",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default RankingsSection;
