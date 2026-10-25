/* =========================================================
   STUDY ABROAD — STUDENT REVIEWS
========================================================= */

export default function AbroadStudentReviews() {

    const reviews = [

        {
            name: "Aarav Sharma",
            country: "United Kingdom",
            university: "University of Manchester",
            course: "MSc Computer Science",
            rating: "5.0",
            review:
                "The guidance throughout my study abroad journey was clear and helpful. I received support with university selection, applications and the overall process."
        },

        {
            name: "Ananya Verma",
            country: "Canada",
            university: "University of Toronto",
            course: "Master of Business Administration",
            rating: "4.9",
            review:
                "The information about universities, courses and admission requirements made it easier to understand my options and plan my application."
        },

        {
            name: "Rohan Mehta",
            country: "Australia",
            university: "University of Melbourne",
            course: "Master of Information Technology",
            rating: "4.8",
            review:
                "I was able to compare different study destinations and understand the application process better. The overall experience was smooth and well organised."
        },

        {
            name: "Priya Singh",
            country: "Germany",
            university: "Technical University of Munich",
            course: "MSc Data Science",
            rating: "4.9",
            review:
                "The guidance helped me understand course options, university requirements and the steps involved in applying to study in Germany."
        }

    ];

    return `

        <!-- =====================================================
             STUDENT REVIEWS SECTION
        ====================================================== -->

        <section
            class="abroad-student-reviews"
            id="student-reviews"
        >

            <div class="abroad-student-reviews-container">

                <!-- =====================================================
                     SECTION HEADER
                ====================================================== -->

                <div class="abroad-student-reviews-header">

                    <span class="abroad-student-reviews-eyebrow">
                        STUDENT EXPERIENCES
                    </span>

                    <h2>
                        Student Experiences with Study Abroad Planning
                    </h2>

                    <p>
                        Read about students’ experiences comparing universities, courses and application steps across study destinations.
                    </p>

                </div>


                <!-- =====================================================
                     REVIEWS GRID
                ====================================================== -->

                <div class="abroad-student-reviews-grid">

                    ${reviews.map((review) => `

                        <article
                            class="abroad-student-review-card"
                        >

                            <!-- =================================================
                                 REVIEW TOP
                            ================================================== -->

                            <div class="abroad-student-review-top">

                                <div class="abroad-student-review-avatar">
                                    ${review.name.charAt(0)}
                                </div>

                                <div class="abroad-student-review-user">

                                    <h3>
                                        ${review.name}
                                    </h3>

                                    <span>
                                        ${review.country}
                                    </span>

                                </div>

                            </div>


                            <!-- =================================================
                                 RATING
                            ================================================== -->

                            <div class="abroad-student-review-rating">

                                <span class="abroad-student-review-stars">
                                    ★★★★★
                                </span>

                                <strong>
                                    ${review.rating}
                                </strong>

                            </div>


                            <!-- =================================================
                                 REVIEW CONTENT
                            ================================================== -->

                            <p class="abroad-student-review-text">
                                ${review.review}
                            </p>


                            <!-- =================================================
                                 STUDY DETAILS
                            ================================================== -->

                            <div class="abroad-student-review-details">

                                <div>
                                    <span>
                                        University
                                    </span>

                                    <strong>
                                        ${review.university}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Course
                                    </span>

                                    <strong>
                                        ${review.course}
                                    </strong>
                                </div>

                            </div>

                        </article>

                    `).join("")}

                </div>


                <!-- =====================================================
                     FOOTER CTA
                ====================================================== -->

                <div class="abroad-student-reviews-footer">

                    <p>
                        Ready to explore your own study abroad journey?
                    </p>

                    <button
                        type="button"
                        class="abroad-student-reviews-button"
                    >
                        Explore Study Options
                    </button>

                </div>

            </div>

        </section>

    `;
}
