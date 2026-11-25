export function initCompareCollegeCarousel() {
    const section = document.querySelector("#compare-college");

    if (!section) {
        return;
    }

    const viewport = section.querySelector(".compare-college-viewport");

    const track = section.querySelector(".compare-college-track");

    const nextButton = section.querySelector(".compare-college-next");

    if (!viewport || !track || !nextButton) {
        return;
    }

    const originalCards = Array.from(track.querySelectorAll(".institution-card"));

    if (originalCards.length === 0) {
        return;
    }

    const originalCount = originalCards.length;

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);

        clone.setAttribute("data-carousel-clone", "true");

        track.appendChild(clone);
    });

    let currentIndex = 0;

    function getCardStep() {
        const cards = track.querySelectorAll(".institution-card");

        if (cards.length < 2) {
            return 0;
        }

        const firstCard = cards[0];

        const secondCard = cards[1];

        const firstRect = firstCard.getBoundingClientRect();

        const secondRect = secondCard.getBoundingClientRect();

        return secondRect.left - firstRect.left;
    }

    function moveCarousel(animate = true) {
        const step = getCardStep();

        if (!step) {
            return;
        }

        track.style.transition = animate ? "transform 0.45s ease" : "none";

        track.style.transform = `translate3d(-${currentIndex * step}px, 0, 0)`;
    }

    function showNext() {
        currentIndex++;

        moveCarousel(true);
    }

    track.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform") {
            return;
        }

        if (currentIndex >= originalCount) {
            currentIndex -= originalCount;

            moveCarousel(false);
        }
    });

    nextButton.addEventListener("click", showNext);

    window.addEventListener("resize", () => {
        moveCarousel(false);
    });

    nextButton.disabled = false;

    moveCarousel(false);
}
