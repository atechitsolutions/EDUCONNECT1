/**
 * ============================================================
 * EDUCONNECT — STUDY ABROAD LEAD FORM
 * ============================================================
 *
 * Purpose:
 * - Free counselling enquiry
 * - Study abroad lead capture
 * - Student profile collection
 * - Consent collection
 * - Future Spring Boot API integration
 *
 * Important:
 * This component only creates the frontend form.
 * API submission will be connected in the service layer.
 *
 * Framework:
 * Vanilla JavaScript + Vite
 * ============================================================
 */

export default function StudyAbroadLeadForm() {

    return `
        <section
            class="study-abroad-lead-section"
            id="study-abroad-lead-form"
            aria-labelledby="study-abroad-lead-title"
        >

            <div class="study-abroad-container">

                <div class="study-abroad-lead-wrapper">


                    <!-- ==================================================
                         LEFT CONTENT
                    =================================================== -->

                    <div class="study-abroad-lead-content">

                        <span class="study-abroad-section-eyebrow">
                            FREE STUDY ABROAD COUNSELLING
                        </span>

                        <h2 id="study-abroad-lead-title">
                            Get study abroad guidance for your plans from India
                        </h2>

                        <p>
                            Share your academic background, preferred country and course. Our counselling team can discuss university options, admission steps and planning for your study abroad application from India.
                        </p>


                        <!-- BENEFITS -->

                        <div class="study-abroad-lead-benefits">

                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    01
                                </span>

                                <div>
                                    <strong>
                                        Understand your options
                                    </strong>

                                    <p>
                                        Explore destinations, courses and
                                        university pathways.
                                    </p>
                                </div>

                            </div>


                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    02
                                </span>

                                <div>
                                    <strong>
                                        Build a shortlist
                                    </strong>

                                    <p>
                                        Compare universities based on your
                                        study goals and preferences.
                                    </p>
                                </div>

                            </div>


                            <div class="study-abroad-lead-benefit">

                                <span class="study-abroad-benefit-number">
                                    03
                                </span>

                                <div>
                                    <strong>
                                        Understand the process
                                    </strong>

                                    <p>
                                        Learn about applications, documents,
                                        funding and other planning stages.
                                    </p>
                                </div>

                            </div>

                        </div>


                        <!-- NOTE -->

                        <div class="study-abroad-lead-note">

                            <span aria-hidden="true">
                                i
                            </span>

                            <p>
                                Counselling does not guarantee admission,
                                scholarships or visa approval. Final
                                decisions are made by the relevant university
                                or government authority.
                            </p>

                        </div>

                    </div>


                    <!-- ==================================================
                         FORM
                    =================================================== -->

                    <div class="study-abroad-lead-card">

                        <div class="study-abroad-lead-card-header">

                            <span>
                                GET STARTED
                            </span>

                            <h3>
                                Tell us about yourself
                            </h3>

                            <p>
                                Fields marked with * are required.
                            </p>

                        </div>

                        <p class="study-abroad-selection-note" data-selected-institution-note role="status" hidden></p>


                        <form
                            id="study-abroad-lead-form-element"
                            class="study-abroad-lead-form"
                            novalidate
                        >


                            <!-- ==================================================
                                 NAME
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-name">
                                    Full name *
                                </label>

                                <input
                                    id="study-abroad-name"
                                    name="fullName"
                                    type="text"
                                    autocomplete="name"
                                    placeholder="Enter your full name"
                                    required
                                    minlength="2"
                                />

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="fullName"
                                ></span>

                            </div>

                            <!-- ==================================================
                                 EMAIL
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-email">
                                    Email address *
                                </label>

                                <input
                                    id="study-abroad-email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    placeholder="you@example.com"
                                    required
                                />

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="email"
                                ></span>

                            </div>


                            <!-- ==================================================
                                 PHONE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-phone">
                                    Phone number *
                                </label>

                                <div class="study-abroad-phone-field">

                                    <span>
                                        +91
                                    </span>

                                    <input
                                        id="study-abroad-phone"
                                        name="phone"
                                        type="tel"
                                        autocomplete="tel"
                                        inputmode="numeric"
                                        maxlength="10"
                                        placeholder="10-digit mobile number"
                                        required
                                    />

                                </div>

                                <span
                                    class="study-abroad-form-error"
                                    data-error-for="phone"
                                ></span>

                            </div>


                            <!-- ==================================================
                                 CURRENT EDUCATION
                            =================================================== -->

                            <div class="study-abroad-form-row">

                                <div class="study-abroad-form-field">

                                    <label for="study-abroad-education">
                                        Current education *
                                    </label>

                                    <select
                                        id="study-abroad-education"
                                        name="education"
                                        required
                                    >

                                        <option value="">
                                            Select
                                        </option>

                                        <option value="12th">
                                            Class 12
                                        </option>

                                        <option value="bachelors">
                                            Bachelor's
                                        </option>

                                        <option value="masters">
                                            Master's
                                        </option>

                                        <option value="working-professional">
                                            Working professional
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>

                                    </select>

                                </div>


                                <div class="study-abroad-form-field">

                                    <label for="study-abroad-graduation">
                                        Graduation year
                                    </label>

                                    <select
                                        id="study-abroad-graduation"
                                        name="graduationYear"
                                    >

                                        <option value="">
                                            Select
                                        </option>

                                        <option value="2026">
                                            2026
                                        </option>

                                        <option value="2027">
                                            2027
                                        </option>

                                        <option value="2028">
                                            2028
                                        </option>

                                        <option value="2029">
                                            2029
                                        </option>

                                        <option value="2030">
                                            2030
                                        </option>

                                        <option value="later">
                                            Later
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <!-- ==================================================
                                 DESTINATION
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-destination">
                                    Preferred destination
                                </label>

                                <select
                                    id="study-abroad-destination"
                                    name="destination"
                                >

                                    <option value="">
                                        Select destination
                                    </option>

                                    <option value="usa">
                                        USA
                                    </option>

                                    <option value="uk">
                                        UK
                                    </option>

                                    <option value="canada">
                                        Canada
                                    </option>

                                    <option value="australia">
                                        Australia
                                    </option>

                                    <option value="germany">
                                        Germany
                                    </option>

                                    <option value="ireland">
                                        Ireland
                                    </option>

                                    <option value="new-zealand">
                                        New Zealand
                                    </option>

                                    <option value="france">
                                        France
                                    </option>

                                    <option value="not-sure">
                                        I'm not sure yet
                                    </option>

                                </select>

                            </div>

                            <div class="study-abroad-form-field">
                                <label for="study-abroad-institution">
                                    Preferred university / institution
                                </label>
                                <input
                                    id="study-abroad-institution"
                                    name="institution"
                                    type="text"
                                    placeholder="Choose an institution or enter one"
                                    autocomplete="organization"
                                />
                            </div>


                            <!-- ==================================================
                                 COURSE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-course">
                                    Preferred course / field
                                </label>

                                <select
                                    id="study-abroad-course"
                                    name="course"
                                >

                                    <option value="">
                                        Select field
                                    </option>

                                    <option value="computer-science">
                                        Computer Science
                                    </option>

                                    <option value="data-science">
                                        Data Science & AI
                                    </option>

                                    <option value="engineering">
                                        Engineering
                                    </option>

                                    <option value="business">
                                        Business & Management
                                    </option>

                                    <option value="finance">
                                        Finance & Economics
                                    </option>

                                    <option value="health">
                                        Health & Life Sciences
                                    </option>

                                    <option value="design">
                                        Design & Creative Arts
                                    </option>

                                    <option value="hospitality">
                                        Hospitality & Tourism
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <!-- ==================================================
                                 STUDY LEVEL
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-degree">
                                    Desired study level
                                </label>

                                <select
                                    id="study-abroad-degree"
                                    name="degree"
                                >

                                    <option value="">
                                        Select level
                                    </option>

                                    <option value="bachelors">
                                        Bachelor's
                                    </option>

                                    <option value="masters">
                                        Master's
                                    </option>

                                    <option value="mba">
                                        MBA
                                    </option>

                                    <option value="phd">
                                        PhD
                                    </option>

                                    <option value="diploma">
                                        Diploma / Certificate
                                    </option>

                                </select>

                            </div>


                            <!-- ==================================================
                                 BUDGET
                            =================================================== -->


                            <!-- ==================================================
                                 MESSAGE
                            =================================================== -->

                            <div class="study-abroad-form-field">

                                <label for="study-abroad-message">
                                    Tell us about your plans
                                </label>

                                <textarea
                                    id="study-abroad-message"
                                    name="message"
                                    rows="4"
                                    maxlength="1000"
                                    placeholder="Tell us about your course, destination or study abroad goals..."
                                ></textarea>

                                <div class="study-abroad-character-count">
                                    <span id="study-abroad-message-count">
                                        0
                                    </span>
                                    / 1000
                                </div>

                            </div>


                            <!-- ==================================================
                                 CONSENT
                            =================================================== -->

                            <div class="study-abroad-consent">

                                <label>

                                    <input
                                        type="checkbox"
                                        id="study-abroad-consent"
                                        name="consent"
                                        required
                                    />

                                    <span>
                                        I agree to be contacted regarding my
                                        Study Abroad enquiry and understand
                                        that my information will be processed
                                        according to the applicable privacy
                                        notice.
                                    </span>

                                </label>

                            </div>


                            <span
                                class="study-abroad-form-error"
                                data-error-for="consent"
                            ></span>


                            <!-- ==================================================
                                 SUBMIT
                            =================================================== -->

                            <button
                                type="submit"
                                class="study-abroad-primary-button study-abroad-submit-button"
                            >

                                <span>
                                    Request free counselling
                                </span>

                                <span aria-hidden="true">
                                    →
                                </span>

                            </button>


                            <!-- ==================================================
                                 FORM STATUS
                            =================================================== -->

                            <div
                                id="study-abroad-form-status"
                                class="study-abroad-form-status"
                                role="status"
                                aria-live="polite"
                            ></div>


                            <p class="study-abroad-form-privacy">

                                Your information is used to respond to your
                                enquiry. Do not submit passwords, payment
                                details or other sensitive information through
                                this form.

                            </p>

                        </form>

                    </div>

                </div>


                <!-- ==================================================
                     TRUST / PROCESS STRIP
                =================================================== -->

                <div class="study-abroad-lead-process">

                    <div>

                        <span>
                            01
                        </span>

                        <strong>
                            Submit enquiry
                        </strong>

                        <small>
                            Tell us about your plans
                        </small>

                    </div>


                    <div>

                        <span>
                            02
                        </span>

                        <strong>
                            Profile discussion
                        </strong>

                        <small>
                            Understand possible options
                        </small>

                    </div>


                    <div>

                        <span>
                            03
                        </span>

                        <strong>
                            Plan next steps
                        </strong>

                        <small>
                            Explore your application journey
                        </small>

                    </div>

                </div>


                <!-- ==================================================
                     SEO CONTENT
                =================================================== -->

                <div class="study-abroad-lead-seo">

                    <h2>
                        Study abroad counselling for students in India
                    </h2>

                    <p>
                        Planning to study abroad can involve many decisions,
                        including selecting a destination, choosing a course,
                        finding suitable universities, understanding admission
                        requirements and preparing a realistic education
                        budget.
                    </p>

                    <p>
                        Study abroad counselling can help students organize
                        these decisions and understand the next steps in the
                        application process. However, admission, scholarship
                        and visa decisions are made by the relevant
                        institutions and authorities.
                    </p>

                </div>

            </div>

        </section>
    `;
}
