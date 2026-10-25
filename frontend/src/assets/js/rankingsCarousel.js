/* Rankings category filter and seamless next-card carousel. */
export function initRankingsCarousel() {
    const carousel = document.querySelector("#rankings .rankings-carousel");
    if (!carousel || carousel.dataset.initialized === "true") return;

    const track = carousel.querySelector(".rankings-track");
    const nextButton = carousel.querySelector(".rankings-next");
    const categoryFilter = document.querySelector("#rankings-category-filter");
    if (!track || !nextButton) return;
    carousel.dataset.initialized = "true";

    const categoryCards = Array.from(track.querySelectorAll(".institution-card"));
    const sourceLists = {
        schools: "#school .early-learning-all-grid .institution-card",
        preschool: "#pre-school .early-learning-all-grid .institution-card",
        playschool: "#play-school .early-learning-all-grid .institution-card",
        boarding: "#top-boarding-schools .boarding-schools-all-grid .institution-card"
    };
    let visibleCards = [];
    let carouselCards = [];
    let currentIndex = 0;
    let isAnimating = false;

    function cardStep() {
        if (carouselCards.length < 2) return carouselCards[0]?.getBoundingClientRect().width || 0;
        return carouselCards[1].getBoundingClientRect().left - carouselCards[0].getBoundingClientRect().left;
    }

    function moveTrack(animate = true) {
        track.style.transition = animate ? "transform 0.45s cubic-bezier(.2,.8,.2,1)" : "none";
        track.style.transform = `translate3d(-${currentIndex * cardStep()}px, 0, 0)`;
    }

    function rebuildCarousel() {
        track.querySelectorAll('[data-carousel-clone="true"]').forEach((clone) => clone.remove());
        track.querySelectorAll('[data-ranking-source-card="true"]').forEach((card) => card.remove());
        const selectedCategory = categoryFilter?.value || "all";
        let cardsForView = categoryCards.filter((card) =>
            selectedCategory === "all" || card.dataset.rankingCategory === selectedCategory
        );

        const sourceSelector = sourceLists[selectedCategory];
        if (sourceSelector) {
            const sourceCards = Array.from(document.querySelectorAll(sourceSelector));
            if (sourceCards.length) {
                cardsForView = sourceCards.map((sourceCard) => {
                    const card = sourceCard.cloneNode(true);
                    card.dataset.rankingSourceCard = "true";
                    card.dataset.rankingCategory = selectedCategory;
                    card.removeAttribute("id");
                    track.appendChild(card);
                    return card;
                });
            }
        }

        categoryCards.forEach((card) => {
            card.hidden = !cardsForView.includes(card);
        });

        visibleCards = cardsForView;

        visibleCards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.dataset.carouselClone = "true";
            clone.removeAttribute("id");
            track.appendChild(clone);
        });

        carouselCards = [
            ...visibleCards,
            ...Array.from(track.querySelectorAll('[data-carousel-clone="true"]'))
        ];
        currentIndex = 0;
        isAnimating = false;
        nextButton.disabled = visibleCards.length < 2;
        nextButton.hidden = visibleCards.length < 2;
        moveTrack(false);
    }

    nextButton.addEventListener("click", () => {
        if (isAnimating || visibleCards.length < 2) return;
        isAnimating = true;
        currentIndex += 1;
        moveTrack(true);
    });

    track.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform") return;
        if (currentIndex >= visibleCards.length) {
            currentIndex = 0;
            moveTrack(false);
        }
        requestAnimationFrame(() => { isAnimating = false; });
    });

    categoryFilter?.addEventListener("change", rebuildCarousel);
    window.addEventListener("resize", () => moveTrack(false));
    rebuildCarousel();
}

export default initRankingsCarousel;
