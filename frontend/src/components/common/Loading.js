export default function Loading({
    text = "Loading..."
} = {}) {

    return `
        <div class="loading-state">

            <div class="loading-spinner"></div>

            <p class="loading-text">
                ${text}
            </p>

        </div>
    `;
}