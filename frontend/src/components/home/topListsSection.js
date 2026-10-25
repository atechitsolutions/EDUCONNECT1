import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function TopListsSection() {

    /* =====================================================
       EDUCATION LISTS
    ====================================================== */

    const educationLists = [

        {
            rank: "01",

            name:
                "Top Schools in India",

            category:
                "Best Schools",

            program:
                "Schools & K-12 Education",

            location:
                "India",

            highlight:
                "Explore top schools in India based on academics, facilities, reputation, school education and student opportunities.",

            image:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Schools"
        },


        {
            rank: "02",

            name:
                "Top Colleges in India",

            category:
                "Best Colleges",

            program:
                "UG & PG Programs",

            location:
                "India",

            highlight:
                "Discover top colleges in India across streams, UG courses, PG courses and academic disciplines.",

            image:
                "https://digitallearning.eletsonline.com/wp-content/uploads/2020/06/infrastructure.jpg",

            actionLabel:
                "Explore Colleges"
        },


        {
            rank: "03",

            name:
                "Top Universities in India",

            category:
                "Best Universities",

            program:
                "UG • PG • Research",

            location:
                "India",

            highlight:
                "Explore top universities in India offering undergraduate, postgraduate, research and professional degree programs.",

            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Universities"
        }

    ];


    /* =====================================================
       CAREER / PROFESSIONAL LISTS
    ====================================================== */

    const careerLists = [

        {
            rank: "04",

            name:
                "Top Engineering Colleges",

            category:
                "Engineering",

            program:
                "B.Tech • M.Tech • Research",

            location:
                "India",

            highlight:
                "Compare top engineering colleges in India through academics, B.Tech and M.Tech courses, placements, infrastructure and programs.",

            image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Engineering"
        },


        {
            rank: "05",

            name:
                "Top Management Colleges",

            category:
                "MBA & Management",

            program:
                "BBA • MBA • Management",

            location:
                "India",

            highlight:
                "Explore top management colleges and business schools in India offering BBA, MBA and management programs.",

            image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Management"
        },


        {
            rank: "06",

            name:
                "Top Medical Colleges",

            category:
                "Medical Education",

            program:
                "MBBS • MD • Healthcare",

            location:
                "India",

            highlight:
                "Discover top medical colleges in India offering MBBS, MD and healthcare education programs.",

            image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",

            actionLabel:
                "Explore Medical"
        }

    ];


    /* =====================================================
       COMBINE ALL TOP LISTS
    ====================================================== */

    const allLists = [

        ...educationLists,

        ...careerLists

    ];


    /* =====================================================
       CREATE TOP LIST CARD
    ====================================================== */

    function createTopListCard(item) {

        return InstitutionCard({

            item: {

                rank:
                    item.rank,

                name:
                    item.name,

                category:
                    item.category,

                program:
                    item.program,

                location:
                    item.location,

                highlight:
                    item.highlight,

                image:
                    item.image,

                actionLabel:
                    item.actionLabel

            },

            type:
                "top-list"

        });

    }


    /* =====================================================
       CREATE ALL SIX CARDS
    ====================================================== */

    const listCards =
        allLists
            .map(createTopListCard)
            .join("");


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="top-lists-section">


            <!-- =================================================
                 INTRO
            ================================================== -->

            <div class="top-lists-intro">

                <div class="top-lists-intro-content">

                    <span class="top-lists-eyebrow">
                        ⭐ EDUCATION DISCOVERY
                    </span>


                    <h2>
                        Top Education Lists in India
                    </h2>


                    <p>
                        Explore top schools, colleges, universities,
                        engineering colleges, management colleges
                        and medical colleges in India across
                        different education categories.
                    </p>

                </div>


                <div class="top-lists-stat">

                    <strong>
                        ${allLists.length}
                    </strong>

                    <span>
                        Featured<br>
                        Lists
                    </span>

                </div>

            </div>


            <!-- =================================================
                 TOP LISTS CAROUSEL
            ================================================== -->

            <div class="top-lists-carousel">

                <div class="top-lists-viewport">

                    <div class="top-lists-track">

                        ${listCards}

                    </div>

                </div>


                <!-- =================================================
                     NEXT ARROW
                ================================================== -->

                <button
                    type="button"
                    class="top-lists-next"
                    aria-label="Show next top education lists in India"
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
            "top-lists",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default TopListsSection;