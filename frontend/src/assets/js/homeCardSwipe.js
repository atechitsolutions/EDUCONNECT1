const HOMEPAGE_CAROUSEL_VIEWPORTS = [
    ".early-learning-carousel",
    ".boarding-schools-carousel",
    ".top-companies-carousel",
    "#top-ug-pg-colleges .ug-pg-carousel",
    "#online-education .online-education-viewport",
    "#news .news-viewport",
    "#study-abroad .study-abroad-viewport",
    "#scholarship .scholarship-viewport",
    "#rankings .rankings-viewport",
    "#student-reviews .student-reviews-viewport",
    "#top-lists .top-lists-viewport",
    "#compare-college .compare-college-viewport",
    "#education-loan .education-loan-viewport"
].join(",");

const LOOPED_MARKUP_TRACKS = new Set([
    "early-learning-track",
    "boarding-schools-track",
    "top-companies-track",
    "ug-pg-track"
]);

function cardSignature(card) {
    return (card.dataset.institutionId || card.innerText || "")
        .replace(/\s+/g, " ")
        .trim();
}

function removeRepeatedMarkupCards(track) {
    if (![...track.classList].some((name) => LOOPED_MARKUP_TRACKS.has(name))) return;

    const cards = [...track.children];
    if (!cards.length || cards.length % 2 !== 0) return;

    const half = cards.length / 2;
    const firstSet = cards.slice(0, half);
    const secondSet = cards.slice(half);
    const repeatsFirstSet = firstSet.every(
        (card, index) => cardSignature(card) === cardSignature(secondSet[index])
    );

    if (repeatsFirstSet) secondSet.forEach((card) => card.remove());
}

function getCardStep(viewport) {
    const track = viewport.querySelector(".home-card-swipe-track");
    const card = track?.firstElementChild;
    if (!track || !card) return viewport.clientWidth * 0.85;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return card.getBoundingClientRect().width + gap;
}

export default function initHomeCardSwipe() {
    if (window.location.pathname !== "/") return;

    const viewports = [...document.querySelectorAll(HOMEPAGE_CAROUSEL_VIEWPORTS)]
        .filter((viewport) => viewport.closest("#main-content"));

    viewports.forEach((viewport) => {
        if (viewport.dataset.homeSwipeReady === "true") return;

        const track = viewport.querySelector(":scope > [class*='track'], [class*='track']");
        if (!track) return;

        viewport.dataset.homeSwipeReady = "true";
        viewport.classList.add("home-card-swipe");
        if (!viewport.hasAttribute("tabindex")) viewport.tabIndex = 0;
        viewport.setAttribute("role", "region");
        if (!viewport.hasAttribute("aria-label")) {
            const heading = viewport.closest("section")?.querySelector("h2");
            viewport.setAttribute(
                "aria-label",
                heading?.textContent?.trim()
                    ? `${heading.textContent.trim()} cards`
                    : "Swipe to browse cards"
            );
        }

        track.classList.add("home-card-swipe-track");
        track.querySelectorAll('[data-carousel-clone="true"]').forEach((clone) => clone.remove());
        removeRepeatedMarkupCards(track);

        [...track.children]
            .filter((card) => card.matches(".institution-card, .video-review-card, [class*='-card']"))
            .forEach((card) => card.classList.add("home-card-swipe-item"));

        let startX = 0;
        let startScrollLeft = 0;
        let dragged = false;

        viewport.addEventListener("pointerdown", (event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            startX = event.clientX;
            startScrollLeft = viewport.scrollLeft;
            dragged = false;
            viewport.classList.add("is-pointer-dragging");
            viewport.setPointerCapture(event.pointerId);
        });

        viewport.addEventListener("pointermove", (event) => {
            if (!viewport.hasPointerCapture(event.pointerId)) return;
            const deltaX = event.clientX - startX;
            if (Math.abs(deltaX) > 4) dragged = true;
            if (!dragged) return;
            viewport.scrollLeft = startScrollLeft - deltaX;
            event.preventDefault();
        });

        const finishDrag = (event) => {
            if (viewport.hasPointerCapture(event.pointerId)) {
                viewport.releasePointerCapture(event.pointerId);
            }
            viewport.classList.remove("is-pointer-dragging");
            if (dragged) {
                viewport.dataset.suppressCardClickUntil = String(Date.now() + 300);
            }
        };
        viewport.addEventListener("pointerup", finishDrag);
        viewport.addEventListener("pointercancel", finishDrag);
    });

    document.querySelectorAll("#main-content button").forEach((button) => {
        const label = `${button.className} ${button.getAttribute("aria-label") || ""}`;
        if (!/(next|forward)/i.test(label)) return;

        const viewport = button.closest("section")?.querySelector(".home-card-swipe");
        if (!viewport || button.dataset.homeSwipeArrowReady === "true") return;

        button.dataset.homeSwipeArrowReady = "true";
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            const step = getCardStep(viewport);
            const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;
            viewport.scrollTo({
                left: atEnd ? 0 : viewport.scrollLeft + step,
                behavior: "smooth"
            });
        }, true);
    });

    document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        const viewport = target?.closest(".home-card-swipe");
        const suppressUntil = Number(viewport?.dataset.suppressCardClickUntil || 0);
        if (!viewport || Date.now() > suppressUntil) return;
        event.preventDefault();
        event.stopImmediatePropagation();
    }, true);
}

