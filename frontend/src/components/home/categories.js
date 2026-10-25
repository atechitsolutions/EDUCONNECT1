export default function Categories() {

    const categories = [

        /* =====================================================
           1. PLAY SCHOOL
        ====================================================== */

        {
            title: "Play School",
            icon: "🧸",
            image:
                "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
            target: "#play-school",
            category: "Early Learning",
            description: "Explore play schools for early childhood learning and education."
        },


        /* =====================================================
           2. PRE SCHOOL
        ====================================================== */

        {
            title: "Pre School",
            icon: "🎈",
            image:
                "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=85",
            target: "#pre-school",
            category: "Early Education",
            description: "Find pre schools, early education programs and child-friendly learning opportunities."
        },


        /* =====================================================
           3. SCHOOL
        ====================================================== */

        {
            title: "School",
            icon: "🏫",
            image:
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85",
            target: "#school",
            category: "School Education",
            description: "Discover schools, school boards, classes, admissions and education opportunities."
        },


        /* =====================================================
           4. COLLEGE
        ====================================================== */

        {
            title: "College",
            icon: "🎓",
            image:
                "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&q=80",
            category: "Higher Education",
            target: "#top-lists",
            description: "Explore colleges, degree courses, campuses, admissions and career opportunities."
        },


        /* =====================================================
           5. UNIVERSITY
        ====================================================== */

        {
            title: "University",
            icon: "🏛️",
            image:
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
            target: "#rankings",
            category: "Higher Education",
            description: "Explore universities, academic programs, rankings, admissions and career opportunities."
        },


        /* =====================================================
           6. PG
        ====================================================== */

        {
            title: "PG",
            icon: "📚",
            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
            target: "#top-ug-pg-colleges",
            category: "Postgraduate",
            description: "Discover postgraduate courses, PG programs and leading higher education institutions."
        },


        /* =====================================================
           7. STUDY ABROAD
        ====================================================== */

        {
            title: "Study Abroad",
            icon: "🌍",
            image:
                "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
            target: "#study-abroad",
            category: "International Education",
            description: "Explore study abroad destinations, universities, courses, admissions and scholarships."
        },


        /* =====================================================
           8. ONLINE EDUCATION
        ====================================================== */

        {
            title: "Online Education",
            icon: "💻",
            image:
                "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85",
            target: "#online-education",
            category: "Flexible Learning",
            description: "Find online degrees, online courses, certifications and distance education programs."
        },


        /* =====================================================
           9. SCHOLARSHIPS
        ====================================================== */

        {
            title: "Scholarships",
            icon: "💰",
            image:
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
            target: "#scholarship",
            category: "Financial Support",
            description: "Find scholarships, student financial aid and education assistance opportunities."
        },


        /* =====================================================
           10. INTERNSHIP
        ====================================================== */

        {
            title: "Internship",
            icon: "💼",
            image:
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
            target: "#jobs",
            category: "Career Opportunities",
            description: "Explore internships, training programs and early career opportunities for students."
        },


        /* =====================================================
           11. JOBS
        ====================================================== */

        {
            title: "Jobs",
            icon: "💻",
            image:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
            target: "#top-companies",
            category: "Career Opportunities",
            description: "Discover jobs, companies, career opportunities and employment resources."
        },


        /* =====================================================
           12. CERTIFICATE
        ====================================================== */

        {
            title: "Certificate",
            icon: "📜",
            image:
                "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=85",
            target: "#certificate",
            category: "Professional Learning",
            description: "Explore professional certificates, certification programs and skill-based learning."
        },


        /* =====================================================
           13. ONLINE COURSES
        ====================================================== */

        {
            title: "Online Courses",
            icon: "🖥️",
            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
            target: "#online-courses",
            category: "Digital Learning",
            description: "Learn new skills through online courses, professional training and flexible digital learning."
        }

    ];


    return `

        <section
            class="categories-compact"
            id="categories"
        >

            <div class="categories-compact-container">


                <!-- =================================================
                     HEADER
                ================================================== -->

                <div class="categories-compact-header">

                    <span class="categories-compact-eyebrow">
                        ✦ EXPLORE EDUCATION
                    </span>

                    <h2>
                        Explore Education Categories
                    </h2>

                    <p>
                        Quickly explore schools, colleges, universities,
                        courses, careers, scholarships, certificates,
                        online education, study abroad and international
                        education opportunities.
                    </p>

                </div>


                <!-- =================================================
                     CATEGORY GRID
                ================================================== -->

                <div class="categories-compact-grid">

                    ${categories.map((category) => `

                        <a
                            href="${category.target}"
                            class="compact-category-card"
                            aria-label="Explore ${category.title} - ${category.category}"
                            data-category="${category.title}"
                        >


                            <!-- =================================================
                                 IMAGE
                            ================================================== -->

                            <div class="compact-category-image">

                                <img
                                    src="${category.image}"
                                    alt="${category.title} - ${category.category}"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div class="compact-category-image-overlay">
                                </div>

                                <span class="compact-category-type">
                                    ${category.category}
                                </span>

                            </div>


                            <!-- =================================================
                                 CONTENT
                            ================================================== -->

                            <div class="compact-category-content">

                                <span
                                    class="compact-category-icon"
                                    aria-hidden="true"
                                >
                                    ${category.icon}
                                </span>


                                <div class="compact-category-text">

                                    <h3>
                                        ${category.title}
                                    </h3>

                                    <p>
                                        ${category.description}
                                    </p>

                                </div>

                            </div>


                            <!-- =================================================
                                 ARROW
                            ================================================== -->

                            <span
                                class="compact-category-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>

                        </a>

                    `).join("")}

                </div>

            </div>

        </section>

    `;
}