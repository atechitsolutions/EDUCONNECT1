function FooterColumn({ title, links = [] }) {
    return `
        <div class="footer-column">
            <h3>${title}</h3>

            <ul>
                ${links
                    .map(
                        (link) => `
                            <li>
                                <a href="${link.href || "#"}">
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

function SocialLinks() {
    return `
        <div class="footer-social">
            <a href="#" aria-label="Facebook" class="social-link">
                <span>f</span>
            </a>

            <a href="#" aria-label="Instagram" class="social-link">
                <span>◎</span>
            </a>

            <a href="#" aria-label="LinkedIn" class="social-link">
                <span>in</span>
            </a>

            <a href="#" aria-label="YouTube" class="social-link">
                <span>▶</span>
            </a>
        </div>
    `;
}

export function FooterSection() {
    const currentYear = new Date().getFullYear();

    return `
        <footer class="site-footer" id="footer">

            <!-- Footer Main -->
            <div class="footer-container">

                <!-- Brand -->
                <div class="footer-brand">

                    <div class="footer-logo">
                        EduConnect
                    </div>

                    <p class="footer-description">
                        Your education platform to discover top schools,
                        colleges, universities, courses, scholarships,
                        education rankings, jobs, careers and study abroad opportunities in India.
                    </p>

                    ${SocialLinks()}

                </div>


                <!-- Education -->
                ${FooterColumn({
                    title: "Education",
                    links: [
                        { label: "Pre Schools", href: "#" },
                        { label: "Top Schools in India", href: "#" },
                        { label: "Top Colleges in India", href: "#" },
                        { label: "Top Universities in India", href: "#" },
                        { label: "Online Education", href: "#" },
                        { label: "Distance Education", href: "#" }
                    ]
                })}


                <!-- Explore -->
                ${FooterColumn({
                    title: "Explore",
                    links: [
                        { label: "Study Abroad for Indian Students", href: "#" },
                        { label: "Scholarships in India", href: "#" },
                        { label: "Top Education Lists", href: "#" },
                        { label: "Education Rankings", href: "#" },
                        { label: "Student & Parent Reviews", href: "#" },
                        { label: "Compare Colleges in India", href: "#" }
                    ]
                })}


                <!-- Career -->
                ${FooterColumn({
                    title: "Career",
                    links: [
                        { label: "Jobs & Career Opportunities", href: "#" },
                        { label: "Internships", href: "#" },
                        { label: "Education Loans", href: "#" },
                        { label: "Career Guidance", href: "#" },
                        { label: "Online & Professional Courses", href: "#" },
                        { label: "Online Certifications", href: "#" }
                    ]
                })}


                <!-- Platform -->
                ${FooterColumn({
                    title: "Platform",
                    links: [
                        { label: "Student Community", href: "#" },
                        { label: "Education News", href: "#" },
                        { label: "Education Current Affairs", href: "#" },
                        { label: "College Rankings in India", href: "#" },
                        { label: "Student & Parent Reviews", href: "#" },
                        { label: "Contact EduConnect", href: "#" }
                    ]
                })}

            </div>


            <!-- Footer Middle -->
            <div class="footer-highlight">

                <div class="footer-highlight-content">

                    <h3>
                        Find the Right Education Opportunities in India
                    </h3>

                    <p>
                        Explore top schools, colleges, universities,
                        courses, scholarships, jobs, career opportunities
                        and study abroad programs in India.
                    </p>

                </div>

                <a href="#" class="footer-cta">
                    Explore Education
                </a>

            </div>


            <!-- Footer Bottom -->
            <div class="footer-bottom">

                <div class="footer-bottom-container">

                    <p>
                        © ${currentYear} EduConnect.
                        All rights reserved.
                    </p>

                    <div class="footer-legal">

                        <a href="#">
                            Privacy Policy
                        </a>

                        <a href="#">
                            Terms & Conditions
                        </a>

                        <a href="#">
                            Contact Us
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    `;
}

export default FooterSection;