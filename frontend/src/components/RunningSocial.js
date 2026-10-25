export default function RunningSocial() {

    const items = [
        {
            icon: "🏛️",
            title: "Top Universities",
            subtitle: "Rankings Updated"
        },
        {
            icon: "📢",
            title: "Admissions Open 2026",
            subtitle: "Apply Now"
        },
        {
            icon: "🏆",
            title: "Top Colleges Updated",
            subtitle: "New Rankings Out"
        },
        {
            icon: "💼",
            title: "New Internship Opportunities",
            subtitle: "Apply Before Deadline"
        },
        {
            icon: "🎓",
            title: "University Admissions",
            subtitle: "Latest Updates"
        }
    ];

    const tickerItems = [...items, ...items];

    return `
        <section class="premium-ticker-section social-ticker-section">

            <div class="premium-ticker">

                <!-- LABEL -->
                <div class="premium-ticker-label">

                    <div class="ticker-label-icon">
                        👥
                    </div>

                    <div class="ticker-label-text">
                        <strong>SOCIAL MEDIA PLATFORM</strong>
                        <span>Latest Student Updates</span>
                    </div>

                </div>


                <!-- RUNNING CONTENT -->
                <div class="premium-ticker-window">

                    <div class="premium-ticker-track">

                        ${tickerItems.map(item => `
                            <div class="premium-ticker-item">

                                <div class="premium-ticker-item-icon">
                                    ${item.icon}
                                </div>

                                <div class="premium-ticker-item-content">

                                    <strong>
                                        ${item.title}
                                    </strong>

                                    <span>
                                        ${item.subtitle}
                                    </span>

                                </div>

                            </div>
                        `).join("")}

                    </div>

                </div>


                <!-- ARROW -->
                <button
                    class="premium-ticker-arrow"
                    aria-label="View social media updates"
                >
                    →
                </button>

            </div>


            <!-- PROGRESS LINE -->
            <div class="premium-ticker-progress">
                <span></span>
            </div>

        </section>
    `;
}