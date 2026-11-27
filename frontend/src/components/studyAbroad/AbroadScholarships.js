import { submitLeadSubmission } from "../../services/leadSubmissionService.js";

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

function openScholarshipEnquiry(scholarship) {
    document.querySelector(".scholarship-enquiry-backdrop")?.remove();
    document.querySelector(".scholarship-enquiry-styles")?.remove();
    const backdrop = document.createElement("div");
    backdrop.className = "scholarship-enquiry-backdrop";
    backdrop.innerHTML = `
        <section class="scholarship-enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="scholarship-enquiry-title">
            <button type="button" class="scholarship-enquiry-close" aria-label="Close enquiry">×</button>
            <p class="scholarship-enquiry-eyebrow">STUDY ABROAD SCHOLARSHIP</p>
            <h2 id="scholarship-enquiry-title">Get scholarship guidance</h2>
            <p class="scholarship-enquiry-selected">${escapeHtml(scholarship.name)} · ${escapeHtml(scholarship.country)}</p>
            <form class="scholarship-enquiry-form">
                <label>Your name<input name="name" autocomplete="name" required maxlength="100" /></label>
                <label>Email address<input name="email" type="email" autocomplete="email" required maxlength="180" /></label>
                <label>Phone number<input name="phone" type="tel" autocomplete="tel" required maxlength="30" /></label>
                <label>Study level<input name="studyLevel" value="${escapeHtml(scholarship.level)}" readonly /></label>
                <label class="scholarship-enquiry-message">What would you like help with?<textarea name="message" rows="3" placeholder="Optional"></textarea></label>
                <label class="scholarship-enquiry-consent"><input type="checkbox" name="consent" required /> I agree to be contacted about this scholarship enquiry.</label>
                <p class="scholarship-enquiry-status" role="status" aria-live="polite"></p>
                <button class="scholarship-enquiry-submit" type="submit">Send enquiry</button>
            </form>
        </section>`;
    const style = document.createElement("style");
    style.className = "scholarship-enquiry-styles";
    style.textContent = `
        .scholarship-enquiry-backdrop{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(12,27,52,.58);backdrop-filter:blur(5px)}
        .scholarship-enquiry-dialog{position:relative;width:min(100%,560px);max-height:min(90vh,760px);overflow:auto;padding:32px;border:1px solid #dbe7f6;border-radius:24px;background:#fff;box-shadow:0 24px 80px rgba(8,26,55,.25);color:#172b4d;font-family:inherit}
        .scholarship-enquiry-close{position:absolute;right:18px;top:16px;width:40px;height:40px;border:1px solid #d9e5f5;border-radius:50%;background:#fff;color:#172b4d;font-size:26px;cursor:pointer}
        .scholarship-enquiry-eyebrow{margin:0 44px 8px 0;color:#4161d8;font-size:12px;font-weight:800;letter-spacing:.12em}
        .scholarship-enquiry-dialog h2{margin:0;font-size:clamp(24px,5vw,32px)}
        .scholarship-enquiry-selected{margin:8px 0 22px;color:#5c6f8a}
        .scholarship-enquiry-form{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .scholarship-enquiry-form>label:not(.scholarship-enquiry-consent){display:grid;gap:7px;font-size:14px;font-weight:700}
        .scholarship-enquiry-form input:not([type=checkbox]),.scholarship-enquiry-form textarea{width:100%;padding:12px 13px;border:1px solid #d5e0ef;border-radius:12px;background:#fbfdff;color:#172b4d;font:inherit;font-weight:400;outline:none}
        .scholarship-enquiry-form input:focus,.scholarship-enquiry-form textarea:focus{border-color:#5677ed;box-shadow:0 0 0 3px rgba(86,119,237,.15)}
        .scholarship-enquiry-message,.scholarship-enquiry-consent,.scholarship-enquiry-status,.scholarship-enquiry-submit{grid-column:1/-1}
        .scholarship-enquiry-consent{display:flex;align-items:flex-start;gap:9px;color:#52647e;font-size:13px;line-height:1.5}
        .scholarship-enquiry-consent input{margin-top:3px;accent-color:#4567ed}
        .scholarship-enquiry-status{min-height:20px;margin:0;color:#16804a;font-size:14px}
        .scholarship-enquiry-status.is-error{color:#bd3030}
        .scholarship-enquiry-submit{min-height:50px;border:0;border-radius:14px;background:#315de8;color:#fff;font:inherit;font-weight:800;cursor:pointer}
        .scholarship-enquiry-submit:disabled{opacity:.6;cursor:wait}
        @media(max-width:560px){.scholarship-enquiry-dialog{padding:26px 20px}.scholarship-enquiry-form{grid-template-columns:1fr}}
    `;
    document.head.append(style);
    document.body.append(backdrop);

    const form = backdrop.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const button = form.querySelector("button[type=submit]");
        const status = form.querySelector(".scholarship-enquiry-status");
        const values = Object.fromEntries(new FormData(form).entries());
        button.disabled = true;
        button.textContent = "Sending…";
        status.classList.remove("is-error");
        try {
            await submitLeadSubmission("Study Abroad scholarship enquiry", "Scholarship card", {
                name: values.name,
                email: values.email,
                phone: values.phone,
                scholarship: scholarship.name,
                destination: scholarship.country,
                studyLevel: scholarship.level,
                coverage: scholarship.coverage,
                message: values.message || "No additional message provided.",
            }, form.elements.consent.checked);
            status.textContent = "Your enquiry was sent. Our team will contact you soon.";
            form.reset();
        } catch (error) {
            status.classList.add("is-error");
            status.textContent = error?.message || "Could not send your enquiry. Please try again.";
        } finally {
            button.disabled = false;
            button.textContent = "Send enquiry";
        }
    });

    backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop || event.target.closest(".scholarship-enquiry-close")) {
            backdrop.remove();
            style.remove();
        }
    });
    backdrop.querySelector("input[name=name]").focus();
}

if (typeof document !== "undefined" && !window.__studyAbroadScholarshipEnquiryBound) {
    window.__studyAbroadScholarshipEnquiryBound = true;
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".scholarship-explore-button");
        if (!button) return;
        const values = button.dataset;
        openScholarshipEnquiry({
            name: values.scholarship,
            country: values.country,
            level: values.level,
            coverage: values.coverage,
        });
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            document.querySelector(".scholarship-enquiry-backdrop")?.remove();
            document.querySelector(".scholarship-enquiry-styles")?.remove();
        }
    });
}

export default function AbroadScholarships() {
    const scholarships = [
        {
            name: "Fulbright Scholarship",
            country: "USA",
            flag: "🇺🇸",
            level: "Masters • PhD",
            coverage: "Tuition • Living Expenses • Travel",
            type: "Fully Funded",
            description:
                "Scholarship opportunities for " +
                "international students pursuing higher " +
                "education in the United States.",
        },

        {
            name: "Chevening Scholarship",
            country: "United Kingdom",
            flag: "🇬🇧",
            level: "Masters",
            coverage: "Tuition • Living Expenses • Travel",
            type: "Fully Funded",
            description:
                "UK government scholarship programme for " +
                "eligible international students " +
                "pursuing a master's degree.",
        },

        {
            name: "Erasmus Mundus",
            country: "Europe",
            flag: "🇪🇺",
            level: "Masters",
            coverage: "Tuition • Travel • Living Expenses",
            type: "Fully Funded",
            description:
                "International scholarship opportunities " +
                "offered through selected joint master's " +
                "programmes across Europe.",
        },

        {
            name: "DAAD Scholarships",
            country: "Germany",
            flag: "🇩🇪",
            level: "Masters • PhD",
            coverage: "Tuition Support • Stipend • Travel",
            type: "Funding Support",
            description:
                "Scholarship and funding opportunities " +
                "for international students studying at " +
                "German universities.",
        },

        {
            name: "Australia Awards",
            country: "Australia",
            flag: "🇦🇺",
            level: "Undergraduate • Masters",
            coverage: "Tuition • Travel • Living Expenses",
            type: "Fully Funded",
            description:
                "Australian government scholarship " +
                "opportunities for eligible students " +
                "from participating countries.",
        },

        {
            name: "Vanier Canada Graduate Scholarships",
            country: "Canada",
            flag: "🇨🇦",
            level: "Doctoral",
            coverage: "Annual Financial Support",
            type: "Graduate Scholarship",
            description:
                "Canadian doctoral scholarship programme " +
                "supporting eligible international and " +
                "domestic researchers.",
        },
    ];

    return `


        <section
            class="study-abroad-scholarships"
            id="abroad-scholarships"
        >


            <div class="study-abroad-scholarships-container">



                <div class="study-abroad-scholarships-header">


                    <div class="study-abroad-section-eyebrow">
                        FUND YOUR EDUCATION
                    </div>


                    <h2>

                        Study Abroad Scholarships
                        <span> for Indian Students</span>

                    </h2>





                </div>






                <div class="study-abroad-scholarship-grid">


                    ${scholarships
                        .map(
                            (scholarship) => `

                        <article
                            class="study-abroad-scholarship-card"
                        >



                            <div class="scholarship-card-top">


                                <div class="scholarship-country">

                                    <span>
                                        ${scholarship.flag}
                                    </span>

                                    ${scholarship.country}

                                </div>


                                <button
                                    type="button"
                                    class="scholarship-favourite"
                                    aria-label="Save ${scholarship.name}"
                                >

                                    ♡

                                </button>


                            </div>



                            <div class="scholarship-card-icon">
                                🎓
                            </div>



                            <div class="scholarship-card-content">


                                <span class="scholarship-card-label">
                                    ${scholarship.type}
                                </span>


                                <h3>
                                    ${scholarship.name}
                                </h3>


                                <p>
                                    ${scholarship.description}
                                </p>



                                <div class="scholarship-card-details">


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            📚
                                        </span>


                                        <div>

                                            <span>
                                                Study Level
                                            </span>

                                            <strong>
                                                ${scholarship.level}
                                            </strong>

                                        </div>


                                    </div>


                                    <div class="scholarship-detail">


                                        <span
                                            class="scholarship-detail-icon"
                                            aria-hidden="true"
                                        >
                                            💰
                                        </span>


                                        <div>

                                            <span>
                                                Coverage
                                            </span>

                                            <strong>
                                                ${scholarship.coverage}
                                            </strong>

                                        </div>


                                    </div>


                                </div>



                                <button
                                    type="button"
                                    class="scholarship-explore-button"
                                    data-scholarship="${escapeHtml(scholarship.name)}"
                                    data-country="${escapeHtml(scholarship.country)}"
                                    data-level="${escapeHtml(scholarship.level)}"
                                    data-coverage="${escapeHtml(scholarship.coverage)}"
                                >

                                    View Scholarship

                                    <span>
                                        →
                                    </span>

                                </button>


                            </div>


                        </article>

                    `,
                        )
                        .join("")}


                </div>



                <div class="study-abroad-scholarships-footer">


                    <div class="study-abroad-scholarships-footer-content">


                        <span
                            class="study-abroad-scholarships-footer-icon"
                            aria-hidden="true"
                        >
                            💡
                        </span>


                        <div>

                            <strong>
                                Looking for the right scholarship?
                            </strong>

                            <span>
                                Explore scholarships based on your
                                destination, study level and course.
                            </span>

                        </div>


                    </div>





                </div>


            </div>


        </section>

    `;
}
