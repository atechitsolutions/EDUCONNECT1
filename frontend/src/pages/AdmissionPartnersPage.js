import "../assets/css/admission-partners.css";
import "../assets/css/admission-partner-light.css";
import {
    submitPartnerInterest,
    submitPartnerReferral,
    validatePartnerReferralCode,
} from "../services/admissionPartnerService.js";

const escapeHtml = (value) =>
    String(value ?? "").replace(
        /[&<>"']/g,
        (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
    );

export default function AdmissionPartnersPage() {
    const referralCode = new URLSearchParams(window.location.search).get("ref") || "";
    return `
        <main class="admission-partners" id="admission-partners">
            <section class="ap-hero" aria-labelledby="ap-title">
                <div class="ap-orbit" aria-hidden="true">
                    <span class="ap-orbit-ring ap-ring-one"></span>
                    <span class="ap-orbit-ring ap-ring-two"></span>
                    <span class="ap-orbit-core">EC</span>
                    <span class="ap-node ap-node-one">UNI</span>
                    <span class="ap-node ap-node-two">YOU</span>
                    <span class="ap-node ap-node-three">STU</span>
                </div>
                <div class="ap-hero-copy">
                    <p class="ap-eyebrow">StepInStudents · ADMISSION REFERRAL NETWORK</p>
                    <h1 id="ap-title">Connect ambition<br><em>with opportunity.</em></h1>
                    <p class="ap-lede">Help prospective students discover education pathways that fit their goals. Make introductions with care, with clear attribution and transparent terms.</p>
                    <div class="ap-actions">
                        <a class="ap-button ap-button-primary" href="#partner-interest">Register as a partner <span aria-hidden="true">↗</span></a>
                        <button class="ap-button ap-button-secondary" type="button" data-open-login>Partner login </button>
                        <a class="ap-button ap-button-secondary" href="#how-it-works">How it works</a>
                    </div>
                    <p class="ap-note">Applications are reviewed individually. Registration does not guarantee approval or earnings.</p>
                </div>
            </section>

            <section class="ap-section ap-intro" id="how-it-works">
                <div><p class="ap-eyebrow">A NETWORK BUILT AROUND STUDENTS</p><h2>Good guidance starts<br>with a genuine connection.</h2></div>
                <p>Admission referral partners introduce prospective students to relevant education opportunities and support enquiries within their authorised scope. Institutional admission decisions remain with each institution.</p>
            </section>

            <section class="ap-principles" aria-label="Partner principles">
                <article><span>01</span><h3>Refer with consent</h3><p>Share a student’s details only after they understand and agree to the contact and referral.</p></article>
                <article><span>02</span><h3>Clear attribution</h3><p>Eligible referrals are recorded so the originating introduction can be reviewed transparently.</p></article>
                <article><span>03</span><h3>Terms before rewards</h3><p>Any commission arrangement is agreed in writing and tied to eligible institutional payments.</p></article>
            </section>

            <section class="ap-section ap-steps">
                <p class="ap-eyebrow">THE PATHWAY</p><h2>From introduction to outcome.</h2>
                <ol><li><span>01</span><div><h3>Tell us about yourself</h3><p>Share your experience and the students or communities you work with.</p></div></li><li><span>02</span><div><h3>Application review</h3><p>Our team will review your details and discuss fit, verification and the applicable written terms.</p></div></li><li><span>03</span><div><h3>Refer eligible students</h3><p>If approved, use the agreed referral process and submit student details only with explicit consent.</p></div></li></ol>
            </section>

            ${referralCode ? `<section class="ap-interest" id="student-referral" aria-labelledby="ap-student-referral-title"><div class="ap-interest-copy"><p class="ap-eyebrow">STUDENT ENQUIRY</p><h2 id="ap-student-referral-title">Explore an education pathway.</h2><p>You arrived through a partner referral. Share your details only if you agree to be contacted about your education enquiry.</p></div><form class="ap-form" id="ap-student-referral-form"><label>Full name<input name="studentName" autocomplete="name" maxlength="120" required></label><label>Email address<input name="studentEmail" type="email" autocomplete="email" maxlength="180" required></label><label>Phone number<input name="studentPhone" type="tel" autocomplete="tel" maxlength="40"></label><label>Institution interest<input name="institutionInterest" maxlength="180"></label><label class="ap-full-field">Course or programme interest<input name="courseInterest" maxlength="160"></label><label class="ap-consent ap-full-field"><input type="checkbox" name="consent" required><span>I consent to StepInStudents contacting me about this education enquiry and recording this partner referral. See <a href="/privacy-policy">privacy information</a>.</span></label><button class="ap-button ap-button-primary" type="submit">Send student enquiry <span aria-hidden="true">↗</span></button><p class="ap-form-status ap-full-field" id="ap-student-referral-status" role="status"></p></form></section>` : ``}

            <section class="ap-interest" id="partner-interest" aria-labelledby="ap-interest-title">
                <div class="ap-interest-copy"><p class="ap-eyebrow">SIMPLE PARTNER REGISTRATION</p><h2 id="ap-interest-title">Know a college? Join as a partner.</h2><p>Tell us who you are and which college you work with. If you are applying as a subpartner, select Subpartner and enter your super partner’s referral code. Subpartner requests may take 24 to 48 hours to review. Once approved, sign in with your registered email and the first 4 digits of your phone number as the password.</p><div class="ap-interest-aside"><span aria-hidden="true">✦</span><p>Partners work independently or manage an approved partner team. Subpartners join through an approved super partner.</p></div></div>
                <form class="ap-form" id="ap-interest-form">
                    <label>Full name<input name="name" autocomplete="name" maxlength="120" required></label>
                    <label>Email address<input name="email" type="email" autocomplete="email" maxlength="180" required></label>
                    <label>Phone number<input name="phone" type="tel" autocomplete="tel" maxlength="40" minlength="4" required></label>
                    <label id="ap-college-field">College you work with<input name="collegeName" maxlength="180" required placeholder="College or institution name"></label>
                    <label>How would you describe your work?<select name="experience" required><option value="" selected disabled>Select one</option><option>Education consultant</option><option>Community or local representative</option><option>Freelancer</option><option>Student or alumni network</option><option>Other</option><option value="Subpartner">Subpartner</option></select></label>
                    <label id="ap-parent-referral-field" class="ap-full-field" hidden>Your super partner’s referral code<input name="parentReferralCode" maxlength="32" autocomplete="off" placeholder="Enter your super partner’s referral code"></label>
                    <label class="ap-consent"><input type="checkbox" name="consent" required><span>I agree that StepInStudents may contact me about this partner enquiry. I have read the <a href="/privacy-policy">privacy information</a>.</span></label>
                    <button class="ap-button ap-button-primary" type="submit">Send registration <span aria-hidden="true">↗</span></button>
                    <p class="ap-form-status" id="ap-form-status" role="status" aria-live="polite"></p>
                </form>
            </section>
            <p class="ap-disclaimer">StepInStudents does not guarantee admission. Universities and colleges make all admission decisions. Partner activity and commission eligibility are subject to verification, written agreements and applicable institutional permissions.</p>
        </main>`;
}

export function initAdmissionPartnersPage() {
    const studentForm = document.querySelector("#ap-student-referral-form");
    if (studentForm) {
        const code = new URLSearchParams(window.location.search).get("ref") || "";
        const status = document.querySelector("#ap-student-referral-status");
        validatePartnerReferralCode(code)
            .then((result) => {
                status.textContent = `Referral shared by ${result.partnerName}.`;
            })
            .catch((error) => {
                studentForm.querySelector("button").disabled = true;
                status.textContent = error.message;
            });
        studentForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!studentForm.reportValidity()) return;
            const button = studentForm.querySelector("button");
            button.disabled = true;
            status.textContent = "Submitting your enquiry…";
            try {
                const values = Object.fromEntries(new FormData(studentForm));
                const result = await submitPartnerReferral(code, { ...values, consent: true });
                studentForm.reset();
                status.textContent = result.message;
            } catch (error) {
                status.textContent = error.message;
                status.classList.add("is-error");
            } finally {
                button.disabled = false;
            }
        });
    }
    const form = document.querySelector("#ap-interest-form");
    if (!form) return;
    const experience = form.querySelector('[name="experience"]');
    const collegeField = document.querySelector("#ap-college-field");
    const collegeInput = form.querySelector('[name="collegeName"]');
    const parentReferralField = document.querySelector("#ap-parent-referral-field");
    const parentReferralInput = form.querySelector('[name="parentReferralCode"]');
    const syncExperienceFields = () => {
        const isSubpartner = experience.value === "Subpartner";
        collegeField.hidden = isSubpartner;
        collegeInput.required = !isSubpartner;
        parentReferralField.hidden = !isSubpartner;
        parentReferralInput.required = isSubpartner;
    };
    experience.addEventListener("change", syncExperienceFields);
    syncExperienceFields();
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const values = Object.fromEntries(new FormData(form));
        const status = document.querySelector("#ap-form-status");
        const button = form.querySelector("button[type=submit]");
        button.disabled = true;
        status.textContent = "Submitting your enquiry…";
        status.classList.remove("is-error");
        try {
            const isSubpartner = values.experience === "Subpartner";
            const result = await submitPartnerInterest({
                fullName: values.name,
                email: values.email,
                phone: values.phone,
                experience: values.experience,
                collegeName: values.collegeName,
                parentReferralCode: isSubpartner ? values.parentReferralCode.trim() : null,
                consent: true,
            });
            form.reset();
            syncExperienceFields();
            status.textContent = result.message || "Your enquiry has been submitted for review.";
        } catch (error) {
            status.textContent =
                error.message || "We could not submit the enquiry. Please try again.";
            status.classList.add("is-error");
        } finally {
            button.disabled = false;
        }
    });
}
