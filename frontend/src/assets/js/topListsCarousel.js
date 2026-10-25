export function initTopListsCarousel() {

    const section =
        document.querySelector("#top-lists");

    if (!section) {
        return;
    }


    const viewport =
        section.querySelector(
            ".top-lists-viewport"
        );

    const track =
        section.querySelector(
            ".top-lists-track"
        );

    const nextButton =
        section.querySelector(
            ".top-lists-next"
        );


    if (!viewport || !track || !nextButton) {
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


    if (originalCards.length === 0) {
        return;
    }


    const originalCount =
        originalCards.length;


    /* =====================================================
       CREATE CLONES
       Used for infinite looping
    ====================================================== */

    originalCards.forEach((card) => {

        const clone =
            card.cloneNode(true);

        clone.setAttribute(
            "data-carousel-clone",
            "true"
        );

        track.appendChild(clone);

    });


    let currentIndex = 0;


    /* =====================================================
       CALCULATE CARD STEP
    ====================================================== */

    function getCardStep() {

        const cards =
            track.querySelectorAll(
                ".institution-card"
            );


        if (cards.length < 2) {
            return 0;
        }


        const firstCard =
            cards[0];

        const secondCard =
            cards[1];


        const firstRect =
            firstCard.getBoundingClientRect();

        const secondRect =
            secondCard.getBoundingClientRect();


        return (
            secondRect.left -
            firstRect.left
        );

    }


    /* =====================================================
       MOVE CAROUSEL
    ====================================================== */

    function moveCarousel(
        animate = true
    ) {

        const step =
            getCardStep();


        if (!step) {
            return;
        }


        track.style.transition =
            animate
                ? "transform 0.45s ease"
                : "none";


        track.style.transform =
            `translate3d(-${currentIndex * step}px, 0, 0)`;

    }


    /* =====================================================
       SHOW NEXT CARD
    ====================================================== */

    function showNext() {

        currentIndex++;

        moveCarousel(true);

    }


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

                currentIndex -=
                    originalCount;


                moveCarousel(false);

            }

        }
    );


    /* =====================================================
       NEXT BUTTON
    ====================================================== */

    nextButton.addEventListener(
        "click",
        showNext
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            moveCarousel(false);

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    nextButton.disabled = false;

    moveCarousel(false);

}