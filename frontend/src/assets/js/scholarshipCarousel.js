/* =========================================================
   EDUCONNECT — SCHOLARSHIP INFINITE CAROUSEL
========================================================= */

export function initScholarshipCarousel() {

    const carousel =
        document.querySelector(
            "#scholarship .scholarship-carousel"
        );


    if (!carousel) {
        return;
    }


    const viewport =
        carousel.querySelector(
            ".scholarship-viewport"
        );


    const track =
        carousel.querySelector(
            ".scholarship-track"
        );


    const nextButton =
        carousel.querySelector(
            ".scholarship-next"
        );


    if (
        !viewport ||
        !track ||
        !nextButton
    ) {
        return;
    }


    /* =====================================================
       ORIGINAL CARDS
    ====================================================== */

    const originalCards =
        Array.from(
            track.querySelectorAll(
                ".institution-card"
            )
        );


    if (!originalCards.length) {
        return;
    }


    const originalCount =
        originalCards.length;


    /* =====================================================
       CREATE CLONES
    ====================================================== */

    originalCards.forEach(
        (card) => {

            const clone =
                card.cloneNode(true);

            clone.dataset.carouselClone =
                "true";

            track.appendChild(
                clone
            );

        }
    );


    const allCards =
        Array.from(
            track.querySelectorAll(
                ".institution-card"
            )
        );


    let currentIndex =
        0;


    let isAnimating =
        false;


    /* =====================================================
       GET STEP
    ====================================================== */

    function getStep() {

        if (
            allCards.length < 2
        ) {

            return (
                allCards[0]
                    .getBoundingClientRect()
                    .width
            );

        }


        const first =
            allCards[0]
                .getBoundingClientRect();


        const second =
            allCards[1]
                .getBoundingClientRect();


        return (
            second.left -
            first.left
        );

    }


    /* =====================================================
       MOVE TRACK
    ====================================================== */

    function moveTrack(
        animate = true
    ) {

        const step =
            getStep();


        track.style.transition =
            animate
                ? "transform 0.45s cubic-bezier(.2,.8,.2,1)"
                : "none";


        track.style.transform =
            `translate3d(
                -${currentIndex * step}px,
                0,
                0
            )`;

    }


    /* =====================================================
       NEXT
    ====================================================== */

    nextButton.addEventListener(
        "click",
        () => {

            if (isAnimating) {
                return;
            }


            isAnimating =
                true;


            currentIndex +=
                1;


            moveTrack(
                true
            );

        }
    );


    /* =====================================================
       INFINITE LOOP
    ====================================================== */

    track.addEventListener(
        "transitionend",
        (event) => {

            if (
                event.propertyName !==
                "transform"
            ) {
                return;
            }


            if (
                currentIndex >=
                originalCount
            ) {

                currentIndex =
                    currentIndex -
                    originalCount;


                moveTrack(
                    false
                );

            }


            requestAnimationFrame(
                () => {

                    isAnimating =
                        false;

                }
            );

        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            moveTrack(
                false
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    nextButton.disabled =
        false;


    moveTrack(
        false
    );

}


export default initScholarshipCarousel;