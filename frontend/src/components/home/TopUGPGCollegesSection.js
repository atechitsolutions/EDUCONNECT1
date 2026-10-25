import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";


export function TopUGPGCollegesSection() {

    /* =====================================================
       UNDERGRADUATE COLLEGES
    ====================================================== */

    const ugColleges = [

        {
            rank: 1,
            name: "University of Delhi",
            type: "Central University",
            category: "UG College",
            program: "B.Com",
            location: "New Delhi",
            rating: "4.8",
            reviews: "1,245",
            score: "9.2",
            fees: "₹1.25 Lacs",
            ranking:
                "Ranked among India's leading central universities",
            highlight:
                "Strong academics & wide course selection",
            image:
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 2,
            name: "Indian Institute of Science",
            type: "Research University",
            category: "UG College",
            program: "B.Sc",
            location: "Bengaluru",
            rating: "4.9",
            reviews: "842",
            score: "9.6",
            fees: "₹1.10 Lacs",
            ranking:
                "Leading institution for science & research",
            highlight:
                "Research-focused academic environment",
            image:
                "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 3,
            name: "Jawaharlal Nehru University",
            type: "Central University",
            category: "UG College",
            program: "BA",
            location: "New Delhi",
            rating: "4.7",
            reviews: "978",
            score: "9.0",
            fees: "₹1.05 Lacs",
            ranking:
                "Highly regarded for humanities & social sciences",
            highlight:
                "Academic excellence & research opportunities",
            image:
                "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 4,
            name: "Banaras Hindu University",
            type: "Central University",
            category: "UG College",
            program: "B.Sc",
            location: "Varanasi",
            rating: "4.7",
            reviews: "1,106",
            score: "8.9",
            fees: "₹1.15 Lacs",
            ranking:
                "Major multidisciplinary university in India",
            highlight:
                "Large campus & diverse academic programs",
            image:
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 5,
            name: "University of Mumbai",
            type: "Public University",
            category: "UG College",
            program: "B.Com",
            location: "Mumbai",
            rating: "4.6",
            reviews: "913",
            score: "8.7",
            fees: "₹1.35 Lacs",
            ranking:
                "Well-known public university in western India",
            highlight:
                "Strong industry & career connections",
            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 6,
            name: "Christ University",
            shortName: "CHRIST",
            type: "Private University",
            category: "UG College",
            program: "BBA",
            courses: "BBA • BCA • B.Com • BA",
            location: "Bengaluru",
            rating: "4.6",
            reviews: "1,021",
            score: "8.8",
            fees: "₹3.25 Lacs",
            ranking:
                "Popular private university for professional programs",
            highlight:
                "Industry-oriented courses & campus life",
            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 7,
            name: "Manipal Academy of Higher Education",
            type: "Deemed University",
            category: "UG College",
            program: "B.Tech",
            location: "Manipal",
            rating: "4.6",
            reviews: "786",
            score: "8.9",
            fees: "₹5.80 Lacs",
            ranking:
                "Recognized multidisciplinary higher education institution",
            highlight:
                "Modern campus & professional programs",
            image:
                "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    /* =====================================================
       POSTGRADUATE COLLEGES
    ====================================================== */

    const pgColleges = [

        {
            rank: 1,
            name: "IIM Ahmedabad",
            type: "Management Institute",
            category: "PG College",
            program: "MBA",
            location: "Ahmedabad",
            rating: "4.9",
            reviews: "1,420",
            score: "9.8",
            fees: "₹12.50 Lacs",
            ranking:
                "Among India's premier management institutions",
            highlight:
                "Strong placements & management education",
            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 2,
            name: "IIM Bangalore",
            type: "Management Institute",
            category: "PG College",
            program: "MBA",
            location: "Bengaluru",
            rating: "4.9",
            reviews: "1,318",
            score: "9.7",
            fees: "₹12.75 Lacs",
            ranking:
                "Top destination for management education",
            highlight:
                "Excellent career & industry exposure",
            image:
                "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 3,
            name: "IIM Calcutta",
            type: "Management Institute",
            category: "PG College",
            program: "MBA",
            location: "Kolkata",
            rating: "4.8",
            reviews: "1,102",
            score: "9.5",
            fees: "₹13.00 Lacs",
            ranking:
                "Highly reputed management institution",
            highlight:
                "Strong finance & consulting opportunities",
            image:
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 4,
            name: "University of Delhi",
            type: "Central University",
            category: "PG College",
            program: "M.Com",
            location: "New Delhi",
            rating: "4.8",
            reviews: "1,150",
            score: "9.0",
            fees: "₹1.50 Lacs",
            ranking:
                "Leading postgraduate destination in Delhi",
            highlight:
                "Wide range of postgraduate programs",
            image:
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 5,
            name: "Jawaharlal Nehru University",
            type: "Central University",
            category: "PG College",
            program: "M.A.",
            location: "New Delhi",
            rating: "4.8",
            reviews: "1,004",
            score: "9.1",
            fees: "₹1.10 Lacs",
            ranking:
                "Known for postgraduate research & academics",
            highlight:
                "Research-intensive learning environment",
            image:
                "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 6,
            name: "IIT Delhi",
            type: "Technical Institute",
            category: "PG College",
            program: "M.Tech",
            location: "New Delhi",
            rating: "4.8",
            reviews: "1,260",
            score: "9.6",
            fees: "₹2.45 Lacs",
            ranking:
                "Premier technical and research institute",
            highlight:
                "Engineering excellence & placements",
            image:
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 7,
            name: "IIT Bombay",
            type: "Technical Institute",
            category: "PG College",
            program: "M.Tech",
            location: "Mumbai",
            rating: "4.8",
            reviews: "1,390",
            score: "9.7",
            fees: "₹2.55 Lacs",
            ranking:
                "Premier institute for technology & research",
            highlight:
                "Innovation, research & industry exposure",
            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
        },

        {
            rank: 8,
            name: "Banaras Hindu University",
            type: "Central University",
            category: "PG College",
            program: "M.Com",
            location: "Varanasi",
            rating: "4.7",
            reviews: "925",
            score: "8.9",
            fees: "₹1.30 Lacs",
            ranking:
                "Large multidisciplinary postgraduate institution",
            highlight:
                "Broad academic & research opportunities",
            image:
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    /* =====================================================
       CARD FACTORY
    ====================================================== */

    function CollegeCard(college, level) {

        return InstitutionCard({

            item: {

                rank:
                    college.rank,

                name:
                    college.name,

                category:
                    college.category,

                location:
                    college.location,

                program:
                    college.program,

                rating:
                    college.rating,

                reviews:
                    college.reviews,

                score:
                    college.score,

                ranking:
                    college.ranking,

                highlight:
                    college.highlight,

                image:
                    college.image,

                fees:
                    college.fees,

                actionLabel:
                    level === "UG"
                        ? "Explore UG College"
                        : "Explore PG College"

            },

            type:
                level === "UG"
                    ? "ug-college"
                    : "pg-college"

        });

    }


    /* =====================================================
       UG CARDS
    ====================================================== */

    const ugCards =
        ugColleges
            .map(
                (college) =>
                    CollegeCard(
                        college,
                        "UG"
                    )
            )
            .join("");


    /* =====================================================
       PG CARDS
    ====================================================== */

    const pgCards =
        pgColleges
            .map(
                (college) =>
                    CollegeCard(
                        college,
                        "PG"
                    )
            )
            .join("");


    /* =====================================================
       DUPLICATE UG CARDS
    ====================================================== */

    const ugCardsDuplicate =
        ugColleges
            .map(
                (college) =>
                    CollegeCard(
                        college,
                        "UG"
                    )
            )
            .join("");


    /* =====================================================
       DUPLICATE PG CARDS
    ====================================================== */

    const pgCardsDuplicate =
        pgColleges
            .map(
                (college) =>
                    CollegeCard(
                        college,
                        "PG"
                    )
            )
            .join("");


    /* =====================================================
       TOTAL FEATURED COUNT
    ====================================================== */

    const totalInstitutions =
        ugColleges.length +
        pgColleges.length;


    /* =====================================================
       CONTENT
    ====================================================== */

    const content = `

        <div class="ug-pg-section-wrapper">


            <!-- =================================================
                 PREMIUM INTRO
            ================================================== -->

            <div class="ug-pg-intro">

                <div class="ug-pg-intro-content">

                    <div class="ug-pg-eyebrow">
                        🎓 HIGHER EDUCATION
                    </div>


                    <h2>
                        Top UG & PG Colleges in India
                    </h2>


                    <p>
                        Discover top undergraduate and postgraduate
                        colleges and universities in India. Compare
                        UG and PG courses, fees, ratings, rankings,
                        placements, admissions and academic opportunities.
                    </p>

                </div>


                <div class="ug-pg-stat">

                    <strong>
                        ${totalInstitutions}
                    </strong>

                    <span>
                        Featured<br>
                        Institutions
                    </span>

                </div>

            </div>


            <!-- =================================================
                 UG HEADING
            ================================================== -->

            <div class="ug-pg-heading">

                <div>

                    <span>
                        UNDERGRADUATE
                    </span>


                    <h2>
                        Top UG Colleges in India
                    </h2>

                </div>


                <p>
                    Explore undergraduate colleges in India
                    offering UG courses, degree programs and
                    career-focused higher education.
                </p>

            </div>


            <!-- =================================================
                 UG CAROUSEL
            ================================================== -->

            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${ugCards}

                    ${ugCardsDuplicate}

                </div>

            </div>


            <!-- =================================================
                 PG HEADING
            ================================================== -->

            <div
                class="ug-pg-heading
                       ug-pg-heading-second"
            >

                <div>

                    <span>
                        POSTGRADUATE
                    </span>


                    <h2>
                        Top PG Colleges in India
                    </h2>

                </div>


                <p>
                    Explore postgraduate colleges in India
                    offering PG courses, advanced degree
                    programs, higher education and professional
                    learning opportunities.
                </p>

            </div>


            <!-- =================================================
                 PG CAROUSEL
            ================================================== -->

            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${pgCards}

                    ${pgCardsDuplicate}

                </div>

            </div>


            <!-- =================================================
                 CTA
            ================================================== -->

            <div class="ug-pg-cta">

                <div>

                    <span>
                        Looking for the right college?
                    </span>


                    <strong>
                        Compare colleges, UG & PG courses, fees and admissions in India.
                    </strong>

                </div>


                <button
                    class="ug-pg-cta-button"
                    type="button"
                >

                    <span class="ug-pg-view-all-text">
                        View All Colleges
                    </span>


                    <span>
                        →
                    </span>

                </button>

            </div>


            <!-- =================================================
                 ALL COLLEGES
            ================================================== -->

            <div
                class="ug-pg-all"
                hidden
            >

                <!-- =============================================
                     UNDERGRADUATE
                ============================================== -->

                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Undergraduate Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${ugColleges
                            .map(
                                (college) =>
                                    CollegeCard(
                                        college,
                                        "UG"
                                    )
                            )
                            .join("")
                        }

                    </div>

                </div>


                <!-- =============================================
                     POSTGRADUATE
                ============================================== -->

                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Postgraduate Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${pgColleges
                            .map(
                                (college) =>
                                    CollegeCard(
                                        college,
                                        "PG"
                                    )
                            )
                            .join("")
                        }

                    </div>

                </div>

            </div>

        </div>

    `;


    /* =====================================================
       RETURN SECTION
    ====================================================== */

    return Section({

        id:
            "top-ug-pg-colleges",

        title:
            "",

        subtitle:
            "",

        content

    });

}


export default TopUGPGCollegesSection;