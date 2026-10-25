/* =========================================================
   STUDY ABROAD — TOP UNIVERSITIES
========================================================= */

export default function TopUniversitiesAbroad() {

    const universities = [

        {
            rank: "01",
            name: "Harvard University",
            country: "USA",
            flag: "🇺🇸",
            location: "Cambridge, Massachusetts",
            type: "Private University",
            programs: "Business • Technology • Medicine",
        },

        {
            rank: "02",
            name: "University of Oxford",
            country: "United Kingdom",
            flag: "🇬🇧",
            location: "Oxford, England",
            type: "Public University",
            programs: "Business • Law • Medicine",
        },

        {
            rank: "03",
            name: "University of Toronto",
            country: "Canada",
            flag: "🇨🇦",
            location: "Toronto, Ontario",
            type: "Public University",
            programs: "IT • Engineering • Business",
        },

        {
            rank: "04",
            name: "University of Melbourne",
            country: "Australia",
            flag: "🇦🇺",
            location: "Melbourne, Victoria",
            type: "Public University",
            programs: "Business • IT • Healthcare",
        },

        {
            rank: "05",
            name: "Technical University of Munich",
            country: "Germany",
            flag: "🇩🇪",
            location: "Munich, Germany",
            type: "Public University",
            programs: "Engineering • Technology • Science",
        },

        {
            rank: "06",
            name: "University of Amsterdam",
            country: "Netherlands",
            flag: "🇳🇱",
            location: "Amsterdam, Netherlands",
            type: "Public University",
            programs: "Business • Data Science • Economics",
        }

    ];


    return `

        <!-- =====================================================
             TOP UNIVERSITIES ABROAD
        ====================================================== -->

        <section
            class="study-abroad-top-universities"
            id="top-universities-abroad"
        >

            <div class="study-abroad-top-universities-container">


                <!-- =================================================
                     SECTION HEADER
                ================================================== -->

                <div class="study-abroad-top-universities-header">

                    <div class="study-abroad-section-eyebrow">
                        GLOBAL EDUCATION
                    </div>

                    <h2>
                        Top Universities
                        <span>Abroad</span>
                    </h2>

                    <p>
                        Discover leading universities around the world,
                        compare study options and explore programs that
                        match your academic goals.
                    </p>

                </div>


                <!-- =================================================
                     UNIVERSITY FILTERS
                ================================================== -->

                <div class="study-abroad-university-filters">

                    <button
                        class="university-filter active"
                        type="button"
                    >
                        All
                    </button>

                    <button
                        class="university-filter"
                        type="button"
                    >
                        USA
                    </button>

                    <button
                        class="university-filter"
                        type="button"
                    >
                        UK
                    </button>

                    <button
                        class="university-filter"
                        type="button"
                    >
                        Canada
                    </button>

                    <button
                        class="university-filter"
                        type="button"
                    >
                        Australia
                    </button>

                    <button
                        class="university-filter"
                        type="button"
                    >
                        Germany
                    </button>

                </div>


                <!-- =================================================
                     UNIVERSITY GRID
                ================================================== -->

                <div class="study-abroad-university-grid">

                    ${universities.map((university) => `

                        <article
                            class="study-abroad-university-card"
                        >

                            <!-- =================================================
                                 CARD TOP
                            ================================================== -->

                            <div class="university-card-top">

                                <div class="university-rank">
                                    #${university.rank}
                                </div>

                            </div>


                            <!-- =================================================
                                 UNIVERSITY ICON
                            ================================================== -->

                            <div class="university-card-icon">
                                🎓
                            </div>


                            <!-- =================================================
                                 UNIVERSITY INFORMATION
                            ================================================== -->

                            <div class="university-card-content">

                                <div class="university-card-country">

                                    <span>
                                        ${university.flag}
                                    </span>

                                    ${university.country}

                                </div>


                                <h3>
                                    ${university.name}
                                </h3>


                                <p class="university-card-location">
                                    📍
                                    ${university.location}
                                </p>


                                <!-- =================================================
                                     UNIVERSITY DETAILS
                                ================================================== -->

                                <div class="university-card-info">

                                    <div>

                                        <span class="university-info-label">
                                            Type
                                        </span>

                                        <strong>
                                            ${university.type}
                                        </strong>

                                    </div>


                                    <div>

                                        <span class="university-info-label">
                                            Popular Programs
                                        </span>

                                        <strong>
                                            ${university.programs}
                                        </strong>

                                    </div>

                                </div>


                                <!-- =================================================
                                     CARD ACTION
                                ================================================== -->

                                <button
                                    type="button"
                                    class="university-explore-button"
                                >

                                    View University

                                    <span>
                                        →
                                    </span>

                                </button>

                            </div>

                        </article>

                    `).join("")}

                </div>

            </div>

        </section>

    `;
}