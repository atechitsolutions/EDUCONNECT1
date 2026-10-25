/* =========================================================
   EDUCONNECT — NEWS INFINITE CAROUSEL
========================================================= */

export function initNewsCarousel() {

    const carousel =
        document.querySelector(
            "#news .news-carousel"
        );


    if (!carousel) {
        return;
    }


    const viewport =
        carousel.querySelector(
            ".news-viewport"
        );


    const track =
        carousel.querySelector(
            ".news-track"
        );


    const nextButton =
        carousel.querySelector(
            ".news-next"
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
       DUPLICATE CARDS
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
       GET CARD STEP
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
       NEXT BUTTON
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
       INFINITE RESET
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


export default initNewsCarousel;