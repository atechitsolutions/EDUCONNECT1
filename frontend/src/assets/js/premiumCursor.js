export function initPremiumCursor() {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
        return;
    }

    if (document.querySelector(".page-pointer-shadow")) {
        return;
    }

    const shadow = document.createElement("div");
    shadow.className = "page-pointer-shadow";
    shadow.setAttribute("aria-hidden", "true");
    document.body.appendChild(shadow);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let framePending = false;

    const paintPosition = () => {
        shadow.style.setProperty("--pointer-x", `${currentX}px`);
        shadow.style.setProperty("--pointer-y", `${currentY}px`);
    };

    const animateShadow = () => {
        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;

        currentX += reducedMotion ? deltaX : deltaX * 0.12;
        currentY += reducedMotion ? deltaY : deltaY * 0.12;
        paintPosition();

        if (!reducedMotion && (Math.abs(deltaX) > 0.4 || Math.abs(deltaY) > 0.4)) {
            requestAnimationFrame(animateShadow);
        } else {
            framePending = false;
        }
    };

    document.addEventListener("pointermove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;

        if (!shadow.classList.contains("is-visible")) {
            currentX = targetX;
            currentY = targetY;
            paintPosition();
        }

        shadow.classList.add("is-visible");
        if (!framePending) {
            framePending = true;
            requestAnimationFrame(animateShadow);
        }
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
        shadow.classList.remove("is-visible");
    });
}

export default initPremiumCursor;
