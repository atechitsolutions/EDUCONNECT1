import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";

export function TopListsSection() {
    const educationLists = [
        {
            rank: "01",

            name: "Top Schools in India",

            category: "Best Schools",

            program: "Schools & K-12 Education",

            location: "India",

            highlight:
                "Explore top schools in India based on " +
                "academics, facilities, reputation, " +
                "school education and student " +
                "opportunities.",

            image:
                "https://images.unsplash.com/photo-150906" +
                "2522246-3755977927d7?auto=format&fit=cro" +
                "p&w=1200&q=85",

            actionLabel: "Explore Schools",
        },

        {
            rank: "02",

            name: "Top Colleges in India",

            category: "Best Colleges",

            program: "UG & PG Programs",

            location: "India",

            highlight:
                "Discover top colleges in India across " +
                "streams, UG courses, PG courses and " +
                "academic disciplines.",

            image:
                "https://digitallearning.eletsonline.com/" +
                "wp-content/uploads/2020/06/infrastructur" +
                "e.jpg",

            actionLabel: "Explore Colleges",
        },

        {
            rank: "03",

            name: "Top Universities in India",

            category: "Best Universities",

            program: "UG • PG • Research",

            location: "India",

            highlight:
                "Explore top universities in India " +
                "offering undergraduate, postgraduate, " +
                "research and professional degree " +
                "programs.",

            image:
                "https://images.unsplash.com/photo-156277" +
                "4053-701939374585?auto=format&fit=crop&w" +
                "=1200&q=85",

            actionLabel: "Explore Universities",
        },
    ];

    const careerLists = [
        {
            rank: "04",

            name: "Top Engineering Colleges",

            category: "Engineering",

            program: "B.Tech • M.Tech • Research",

            location: "India",

            highlight:
                "Compare top engineering colleges in " +
                "India through academics, B.Tech and " +
                "M.Tech courses, placements, " +
                "infrastructure and programs.",

            image:
                "https://images.unsplash.com/photo-158109" +
                "1226825-a6a2a5aee158?auto=format&fit=cro" +
                "p&w=1200&q=85",

            actionLabel: "Explore Engineering",
        },

        {
            rank: "05",

            name: "Top Management Colleges",

            category: "MBA & Management",

            program: "BBA • MBA • Management",

            location: "India",

            highlight:
                "Explore top management colleges and " +
                "business schools in India offering BBA, " +
                "MBA and management programs.",

            image:
                "https://images.unsplash.com/photo-145416" +
                "5804606-c3d57bc86b40?auto=format&fit=cro" +
                "p&w=1200&q=85",

            actionLabel: "Explore Management",
        },

        {
            rank: "06",

            name: "Top Medical Colleges",

            category: "Medical Education",

            program: "MBBS • MD • Healthcare",

            location: "India",

            highlight:
                "Discover top medical colleges in India " +
                "offering MBBS, MD and healthcare " +
                "education programs.",

            image:
                "https://images.unsplash.com/photo-157609" +
                "1160399-112ba8d25d1d?auto=format&fit=cro" +
                "p&w=1200&q=85",

            actionLabel: "Explore Medical",
        },
    ];

    const allLists = [...educationLists, ...careerLists];

    function createTopListCard(item) {
        return InstitutionCard({
            item: {
                rank: item.rank,

                name: item.name,

                category: item.category,

                program: item.program,

                location: item.location,

                highlight: item.highlight,

                image: item.image,

                actionLabel: item.actionLabel,
            },

            type: "top-list",
        });
    }

    const listCards = allLists.map(createTopListCard).join("");

    const content = `

        <div class="top-lists-section">



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



            <div class="top-lists-carousel">

                <div class="top-lists-viewport">

                    <div class="top-lists-track">

                        ${listCards}

                    </div>

                </div>



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

    return Section({
        id: "top-lists",

        title: "",

        subtitle: "",

        content,
    });
}

export default TopListsSection;
