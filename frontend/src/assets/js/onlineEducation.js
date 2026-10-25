/* =========================================================
   EDUCONNECT — ONLINE EDUCATION INFINITE CAROUSEL
========================================================= */

export function initOnlineEducationCarousel() {

    const carousel =
        document.querySelector(
            "#online-education .online-education-carousel"
        );

    if (!carousel) {
        return;
    }


    const viewport =
        carousel.querySelector(
            ".online-education-viewport"
        );

    const track =
        carousel.querySelector(
            ".online-education-track"
        );

    const nextButton =
        carousel.querySelector(
            ".online-education-next"
        );


    if (
        !viewport ||
        !track ||
        !nextButton
    ) {
        return;
    }


    const cards =
        Array.from(
            track.querySelectorAll(
                ".institution-card"
            )
        );


    if (!cards.length) {
        return;
    }


    /* =====================================================
       ORIGINAL CARD COUNT
    ====================================================== */

    const originalCount =
        cards.length;


    /* =====================================================
       CLONE FIRST CARDS
       These clones allow the carousel to continue
       smoothly after the last original card.
    ====================================================== */

    cards.forEach(
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


    /* =====================================================
       UPDATED CARD LIST
    ====================================================== */

    const allCards =
        Array.from(
            track.querySelectorAll(
                ".institution-card"
            )
        );


    let currentIndex = 0;

    let isAnimating = false;


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
       GET VISIBLE CARDS
    ====================================================== */

    function getVisibleCards() {

        const viewportWidth =
            viewport
                .getBoundingClientRect()
                .width;


        const cardWidth =
            allCards[0]
                .getBoundingClientRect()
                .width;


        const computedStyle =
            window.getComputedStyle(
                track
            );


        const gap =
            parseFloat(
                computedStyle.columnGap ||
                computedStyle.gap ||
                "0"
            );


        return Math.max(
            1,
            Math.floor(
                (
                    viewportWidth +
                    gap
                ) /
                (
                    cardWidth +
                    gap
                )
            )
        );

    }


    /* =====================================================
       APPLY POSITION
    ====================================================== */

    function applyPosition(
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


            isAnimating = true;


            currentIndex += 1;


            applyPosition(
                true
            );

        }
    );


    /* =====================================================
       AFTER ANIMATION
       When we reach the cloned area, silently jump back
       to the original cards.
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


            const visibleCards =
                getVisibleCards();


            /*
                Once we move far enough into the
                duplicated cards, reset to the
                corresponding original position.
            */

            if (
                currentIndex >=
                originalCount
            ) {

                currentIndex =
                    currentIndex -
                    originalCount;


                applyPosition(
                    false
                );

            }


            /*
                Give the browser one frame to finish
                the reset before allowing another click.
            */

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

            applyPosition(
                false
            );

        }
    );


    /* =====================================================
       INITIAL POSITION
    ====================================================== */

    applyPosition(
        false
    );


    /*
        Prevent the arrow from appearing disabled.
        This is an infinite carousel, so the user can
        always continue moving forward.
    */

    nextButton.disabled =
        false;

}


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default initOnlineEducationCarousel;