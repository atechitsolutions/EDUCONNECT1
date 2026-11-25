export function initOnlineEducationCarousel() {
    const track = document.querySelector("#online-education .online-education-track");
    if (!track) return;

    const markCardsForSwipe = () => {
        track.querySelectorAll(".institution-card").forEach((card) => {
            card.classList.add("home-card-swipe-item");
        });
    };

    markCardsForSwipe();

    if (track.dataset.swipeCardsObserved === "true") return;
    track.dataset.swipeCardsObserved = "true";

    const observer = new MutationObserver(markCardsForSwipe);
    observer.observe(track, { childList: true });
}

export default initOnlineEducationCarousel;
