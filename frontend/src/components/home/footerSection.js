function FooterColumn({ title, links = [], mobile = false }) {
    const accordionId = `footer-links-${mobile ? "mobile-" : ""}${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    return `
        <div class="footer-column${mobile ? " footer-mobile-column" : ""}">
            <h3>
                <span class="footer-column-title">${title}</span>
                <button class="footer-accordion-toggle" type="button" aria-expanded="false" aria-controls="${accordionId}">
                    <span>${title}</span>
                    <svg class="footer-accordion-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </h3>

            <ul id="${accordionId}">
                ${links
                    .map(
                        (link) => `
                            <li>
                                <a href="${link.href || "/"}">
                                    ${link.label}
                                </a>
                            </li>
                        `
                    )
                    .join("")}
            </ul>
        </div>
    `;
}

export function FooterSection() {
    const currentYear = new Date().getFullYear();
    const pathname = window.location.pathname.replace(/\/$/, "") || "/";
    const isOnlineEducation = pathname === "/online-education";
    const isCommunity = pathname === "/community";

    const pageFooter = isOnlineEducation ? {
        className: "site-footer--online",
        image: "/images/online-education-footer.jpg",
        imageAlt: "Online learner studying with a laptop",
        eyebrow: "LEARN YOUR WAY",
        title: "Build skills from anywhere.",
        description: "Explore flexible online degrees, short courses and certificates designed around your goals.",
        columns: [
            { title: "Online learning", links: [{ label: "Browse programmes", href: "/online-education" }, { label: "Online degrees", href: "/online-education" }, { label: "Short courses", href: "/online-education" }] },
            { title: "Study paths", links: [{ label: "Bachelor’s programmes", href: "/online-education" }, { label: "Master’s programmes", href: "/online-education" }, { label: "Certificates", href: "/online-education" }] },
            { title: "Get started", links: [{ label: "Compare courses", href: "/online-education" }, { label: "Find an institution", href: "/online-education" }, { label: "Student community", href: "/community" }] }
        ]
    } : isCommunity ? {
        className: "site-footer--community",
        image: "/images/community/student-community-chat.jpg",
        imageAlt: "Students connecting and chatting in the StepInStudents community",
        eyebrow: "CONNECT WITH STUDENTS",
        title: "Your next conversation starts here.",
        description: "Share your learning journey, meet students with similar interests and take part in supportive education discussions.",
        columns: [
            { title: "Community", links: [{ label: "Open the student feed", href: "/community" }, { label: "Student groups", href: "/community" }, { label: "Study discussions", href: "/community" }] },
            { title: "Discover", links: [{ label: "Online education", href: "/online-education" }, { label: "Study abroad", href: "/study-abroad" }, { label: "Scholarships", href: "/#scholarships" }] },
            { title: "Your space", links: [{ label: "Community guidelines", href: "/community" }, { label: "Student profile", href: "/community" }, { label: "StepInStudents home", href: "/" }] }
        ]
    } : null;

    const footerDescription = pageFooter?.description || "Your education platform to discover top schools, colleges, universities, courses, scholarships, education rankings, jobs, careers and study abroad opportunities in India.";

    const pageLinks = pageFooter?.columns || [];
    const findPageLinks = (title) => pageLinks.find((column) => column.title === title)?.links || [];
    const mobileFooterColumns = [
        { title: "Education", links: [
            { label: "Pre Schools", href: "/#pre-school" }, { label: "Top Schools in India", href: "/#schools" },
            { label: "Top Colleges in India", href: "/#colleges" }, { label: "Top Universities in India", href: "/#colleges" },
            { label: "Online Education", href: "/online-education" }, { label: "Distance Education", href: "/online-education" },
            ...findPageLinks("Online learning"), ...findPageLinks("Study paths")
        ] },
        { title: "Explore", links: [
            { label: "Study Abroad for Indian Students", href: "/study-abroad" }, { label: "Scholarships in India", href: "/#scholarships" },
            { label: "Top Education Lists", href: "/#top-lists" }, { label: "Education Rankings", href: "/#rankings" },
            { label: "Student & Parent Reviews", href: "/#student-reviews" }, { label: "Compare Colleges in India", href: "/#institution-comparison" },
            ...findPageLinks("Discover"), ...findPageLinks("Get started").filter((link) => link.label !== "Student community")
        ] },
        { title: "Career", links: [
            { label: "Jobs & Career Opportunities", href: "/#top-companies" }, { label: "Career Resources", href: "/#top-companies" },
            { label: "Education Loans", href: "/#education-loans" }, { label: "Education Guidance", href: "/#education-categories" },
            { label: "Online & Professional Courses", href: "/online-education" }, { label: "Online Certifications", href: "/online-education" }
        ] },
        { title: "Platform", links: [
            { label: "Student Community", href: "/community" }, { label: "Education News", href: "/#news" },
            { label: "Education Current Affairs", href: "/#current-affairs" }, { label: "College Rankings in India", href: "/#rankings" },
            { label: "Student & Parent Reviews", href: "/#student-reviews" }, { label: "StepInStudents home", href: "/" },
            ...findPageLinks("Community"), ...findPageLinks("Your space"),
            ...findPageLinks("Get started").filter((link) => link.label === "Student community")
        ] }
    ].map((column) => ({ ...column, links: column.links.filter((link, index, links) => links.findIndex((item) => item.label === link.label && item.href === link.href) === index) }));
    const mobileFooter = `<nav class="footer-mobile-groups" aria-label="Footer links">${mobileFooterColumns.map((column) => FooterColumn({ ...column, mobile: true })).join("")}</nav>`;

    if (pageFooter) {
        return `
            <footer class="site-footer ${pageFooter.className}" id="footer">
                <section class="footer-page-feature" aria-label="${pageFooter.imageAlt}">
                    <img src="${pageFooter.image}" alt="${pageFooter.imageAlt}" loading="lazy">
                    <div class="footer-page-feature-copy">
                        <span>${pageFooter.eyebrow}</span>
                        <h2>${pageFooter.title}</h2>
                        <p>${pageFooter.description}</p>
                    </div>
                </section>
                <div class="page-specific-footer-main">
                    <div class="page-specific-footer-intro">
                        <div class="footer-mobile-logo">StepInStudents</div>
                        <span>${isOnlineEducation ? "ONLINE LEARNING" : "STUDENT COMMUNITY"}</span>
                        <p>${footerDescription}</p>
                    </div>
                    ${pageFooter.columns.map((column) => FooterColumn(column)).join("")}
                    ${mobileFooter}
                </div>
                <div class="page-specific-footer-bottom">
                    <span>${isOnlineEducation ? "Explore learning that fits your life." : "Connect, learn and grow together."}</span>
                    <div class="footer-legal">
                        <a href="/">Home</a>
                        <a href="/study-abroad">Study abroad</a>
                        <a href="${isOnlineEducation ? "/community" : "/online-education"}">${isOnlineEducation ? "Community" : "Online education"}</a>
                    </div>
                </div>
            </footer>
        `;
    }

    return `
        <footer class="site-footer ${pageFooter?.className || ""}" id="footer">

            ${pageFooter ? `
            <section class="footer-page-feature" aria-label="${pageFooter.imageAlt}">
                <img src="${pageFooter.image}" alt="${pageFooter.imageAlt}" loading="lazy">
                <div class="footer-page-feature-copy">
                    <span>${pageFooter.eyebrow}</span>
                    <h2>${pageFooter.title}</h2>
                    <p>${pageFooter.description}</p>
                </div>
            </section>
            ` : ""}

            <!-- Footer Main -->
            <div class="footer-container">

                <!-- Brand -->
                <div class="footer-brand">

                    <div class="footer-logo">
                        StepInStudents
                    </div>

                    <p class="footer-description">${footerDescription}</p>

                </div>


                ${pageFooter ? pageFooter.columns.map((column) => FooterColumn(column)).join("") : `
                <!-- Education -->
                ${FooterColumn({
                    title: "Education",
                    links: [
                        { label: "Pre Schools", href: "/#pre-school" },
                        { label: "Top Schools in India", href: "/#schools" },
                        { label: "Top Colleges in India", href: "/#colleges" },
                        { label: "Top Universities in India", href: "/#colleges" },
                        { label: "Online Education", href: "/online-education" },
                        { label: "Distance Education", href: "/online-education" }
                    ]
                })}
                `}


                <!-- Explore -->
                ${FooterColumn({
                    title: "Explore",
                    links: [
                        { label: "Study Abroad for Indian Students", href: "/study-abroad" },
                        { label: "Scholarships in India", href: "/#scholarships" },
                        { label: "Top Education Lists", href: "/#top-lists" },
                        { label: "Education Rankings", href: "/#rankings" },
                        { label: "Student & Parent Reviews", href: "/#student-reviews" },
                        { label: "Compare Colleges in India", href: "/#institution-comparison" }
                    ]
                })}


                <!-- Career -->
                ${FooterColumn({
                    title: "Career",
                    links: [
                        { label: "Jobs & Career Opportunities", href: "/#top-companies" },
                        { label: "Career Resources", href: "/#top-companies" },
                        { label: "Education Loans", href: "/#education-loans" },
                        { label: "Education Guidance", href: "/#education-categories" },
                        { label: "Online & Professional Courses", href: "/online-education" },
                        { label: "Online Certifications", href: "/online-education" }
                    ]
                })}


                <!-- Platform -->
                ${FooterColumn({
                    title: "Platform",
                    links: [
                        { label: "Student Community", href: "/community" },
                        { label: "Education News", href: "/#news" },
                        { label: "Education Current Affairs", href: "/#current-affairs" },
                        { label: "College Rankings in India", href: "/#rankings" },
                        { label: "Student & Parent Reviews", href: "/#student-reviews" },
                        { label: "StepInStudents home", href: "/" }
                    ]
                })}

                ${mobileFooter}

            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">

                <div class="footer-bottom-container">

                    <p>
                        © ${currentYear} StepInStudents.
                        All rights reserved.
                    </p>

                    <div class="footer-legal">

                        <a href="/">Home</a>
                        <a href="/study-abroad">Study Abroad</a>
                        <a href="/online-education">Online Education</a>

                    </div>

                </div>

            </div>

        </footer>
    `;
}

export default FooterSection;
