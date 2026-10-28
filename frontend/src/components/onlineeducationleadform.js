
import "../assets/css/onlineeducationleadform.css";

export default function renderOnlineEducationLeadForm() {
  return `
    <section
      id="online-education-lead-form"
      aria-labelledby="oe-lead-title"
    >
      <div class="lead3d-layout">
        <div class="lead3d-intro">
          <span class="lead3d-eyebrow">YOUR LEARNING JOURNEY</span>

          <h2>
            Find the right course.
            <span>Build your future.</span>
          </h2>

          <p class="lead3d-description">
            Tell us about your learning goals. Submit your details to request
            guidance about online courses, certificates and degree programmes.
          </p>

          <div class="lead3d-benefits">
            <div class="lead3d-benefit">
              <span class="lead3d-benefit-icon">01</span>
              <div>
                <strong>Explore learning options</strong>
                <p>Identify programmes that match your interests.</p>
              </div>
            </div>

            <div class="lead3d-benefit">
              <span class="lead3d-benefit-icon">02</span>
              <div>
                <strong>Compare programmes</strong>
                <p>Review available courses and provider information.</p>
              </div>
            </div>

            <div class="lead3d-benefit">
              <span class="lead3d-benefit-icon">03</span>
              <div>
                <strong>Take your next step</strong>
                <p>Share your goals so your enquiry can be reviewed.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lead3d-card-wrap">
          <div class="lead3d-card-shadow"></div>

          <div class="lead3d-card">
            <div class="lead3d-card-top">
              <div>
                <span class="lead3d-form-kicker">ONLINE EDUCATION</span>
                <h3 id="oe-lead-title">Online Education Lead Form</h3>
                <p>Complete the details below to submit your enquiry.</p>
              </div>

              <div class="lead3d-card-symbol" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none">
                  <rect x="7" y="5" width="26" height="30" rx="5"
                    stroke="currentColor" stroke-width="2"/>
                  <path d="M13 14H27M13 20H27M13 26H23"
                    stroke="currentColor" stroke-width="2"
                    stroke-linecap="round"/>
                </svg>
              </div>
            </div>

            <form class="lead3d-form" id="oe-lead-form">
              <div class="lead3d-field-grid">
                <div class="lead3d-field">
                  <label for="oe-lead-name">Full name *</label>
                  <input
                    id="oe-lead-name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    placeholder="Enter your full name"
                    required
                    maxlength="120"
                  >
                </div>

                <div class="lead3d-field">
                  <label for="oe-lead-email">Email address *</label>
                  <input
                    id="oe-lead-email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    required
                    maxlength="254"
                  >
                </div>

                <div class="lead3d-field">
                  <label for="oe-lead-phone">Phone number *</label>
                  <input
                    id="oe-lead-phone"
                    name="phone"
                    type="tel"
                    autocomplete="tel"
                    placeholder="Enter your phone number"
                    required
                    maxlength="25"
                  >
                </div>

                <div class="lead3d-field">
                  <label for="oe-lead-level">Education level *</label>
                  <select id="oe-lead-level" name="educationLevel" required>
                    <option value="">Choose a level</option>
                    <option>Certificate</option>
                    <option>Diploma</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>MBA</option>
                    <option>Doctoral</option>
                    <option>Short Course</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div class="lead3d-field lead3d-field-full">
                  <label for="oe-lead-programme">Course or institution of interest</label>
                  <input
                    id="oe-lead-programme"
                    name="programme"
                    type="text"
                    placeholder="Enter a course, university or subject"
                    maxlength="200"
                  >
                </div>

                <div class="lead3d-field lead3d-field-full">
                  <label for="oe-lead-message">Your learning goals</label>
                  <textarea
                    id="oe-lead-message"
                    name="message"
                    rows="3"
                    placeholder="Tell us what you would like to study"
                    maxlength="1500"
                  ></textarea>
                </div>
              </div>

              <button class="lead3d-submit" type="submit">
                <span>Submit Enquiry</span>
                <span class="lead3d-submit-arrow" aria-hidden="true">→</span>
              </button>

              <p
                id="oe-lead-status"
                class="lead3d-status"
                role="status"
                aria-live="polite"
                hidden
              ></p>

              <p class="lead3d-privacy">
                Please provide accurate contact details. Your enquiry will
                only be saved when a submission service is connected.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindOnlineEducationLeadForm() {
  const form = document.getElementById("oe-lead-form");
  const status = document.getElementById("oe-lead-status");

  if (!form || form.dataset.bound === "true") return;

  form.dataset.bound = "true";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (status) {
      status.hidden = false;
      status.className = "lead3d-status lead3d-status-error";
      status.textContent =
        "The form is displayed correctly, but enquiry submission is not connected to a backend yet. Your details have not been saved.";
    }
  });
}
