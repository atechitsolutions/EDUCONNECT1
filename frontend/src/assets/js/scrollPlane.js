export default function initScrollPlane() {

    /* =====================================================
       CREATE FIXED SECTION FLIGHT OVERLAY
    ====================================================== */

    const flight = document.createElement("div");

    flight.className =
        "section-flight-plane";

    flight.setAttribute(
        "aria-hidden",
        "true"
    );


    flight.innerHTML = `
        <div class="section-flight-trail">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="section-flight-icon">

            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >

                <path
                    d="
                        M7 48
                        L93 8
                        L57 93
                        L47 57
                        Z
                    "
                    fill="#ffffff"
                    stroke="#111827"
                    stroke-width="3"
                    stroke-linejoin="round"
                />

                <path
                    d="
                        M47 57
                        L93 8
                    "
                    fill="none"
                    stroke="#111827"
                    stroke-width="3"
                />

                <path
                    d="
                        M47 57
                        L57 93
                    "
                    fill="none"
                    stroke="#111827"
                    stroke-width="3"
                />

            </svg>

        </div>
    `;


    /*
        IMPORTANT:
        Put the overlay directly under <html>,
        outside #app/body content flow.
    */

    document.documentElement.appendChild(
        flight
    );


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const plane =
        flight.querySelector(
            ".section-flight-icon"
        );

    const trail =
        flight.querySelector(
            ".section-flight-trail"
        );

    const dashes =
        trail.querySelectorAll(
            "span"
        );


    /* =====================================================
       SECTIONS
    ====================================================== */

    const sections =
        document.querySelectorAll(`
            .hero,
            #categories,
            #online-education,
            #news,
            #study-abroad,
            #scholarship,
            #top-lists,
            #rankings,
            #student-reviews,
            #compare-college,
            #education-loan,
            #top-boarding-schools,
            #top-companies,
            #top-ug-pg-colleges
        `);


    /* =====================================================
       STATE
    ====================================================== */

    let activeSection = null;

    let isFlying = false;

    let finishTimer = null;


    /* =====================================================
       RESET
    ====================================================== */

    function resetFlight() {

        flight.classList.remove(
            "section-flight-active"
        );

        plane.classList.remove(
            "section-plane-flying"
        );

        dashes.forEach(
            (dash) => {

                dash.classList.remove(
                    "section-dash-flying"
                );

                dash.style.animationDelay =
                    "0s";

            }
        );

    }


    /* =====================================================
       PLAY FLIGHT
    ====================================================== */

    function playFlight() {

        /*
            Never stack multiple flights.
        */

        if (isFlying) {

            return;

        }


        isFlying = true;


        /* ---------------------------------------------
           CLEAR OLD TIMER
        ---------------------------------------------- */

        if (finishTimer) {

            clearTimeout(
                finishTimer
            );

            finishTimer = null;

        }


        /* ---------------------------------------------
           RESET
        ---------------------------------------------- */

        resetFlight();


        /*
            Force browser to register the reset
            before starting the animation again.
        */

        void flight.offsetWidth;


        /* ---------------------------------------------
           START
        ---------------------------------------------- */

        flight.classList.add(
            "section-flight-active"
        );

        plane.classList.add(
            "section-plane-flying"
        );


        /* ---------------------------------------------
           DASHED TRAIL
        ---------------------------------------------- */

        dashes.forEach(
            (dash, index) => {

                dash.style.animationDelay =
                    `${index * 0.14}s`;

                dash.classList.add(
                    "section-dash-flying"
                );

            }
        );


        /* ---------------------------------------------
           CLEANUP
        ---------------------------------------------- */

        finishTimer =
            setTimeout(
                () => {

                    resetFlight();

                    isFlying = false;

                    finishTimer = null;

                },
                3100
            );

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ====================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        /*
                            Prevent the same section from
                            launching repeatedly.
                        */

                        if (
                            activeSection ===
                            entry.target
                        ) {

                            return;

                        }


                        activeSection =
                            entry.target;


                        playFlight();

                    }
                );

            },
            {
                threshold:
                    0.55,

                rootMargin:
                    "0px 0px -15% 0px"
            }
        );


    /* =====================================================
       OBSERVE SECTIONS
    ====================================================== */

    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );


    /* =====================================================
       CLEANUP
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            observer.disconnect();


            if (finishTimer) {

                clearTimeout(
                    finishTimer
                );

            }


            flight.remove();

        },
        {
            once: true
        }
    );

}