import Section from "../common/Section.js";

const loanCards = [
    {
        icon: "✈",
        title: "Study abroad",
        text: "Explore funding for tuition and eligible study costs overseas.",
        tag: "Up to ₹3 crore*"
    },
    {
        icon: "⌘",
        title: "Online degrees",
        text: "Ask lenders about your exact online course and institution.",
        tag: "Course eligibility varies"
    },
    {
        icon: "◇",
        title: "With collateral",
        text: "A secured loan may offer higher limits, subject to lender review.",
        tag: "Property / approved security"
    },
    {
        icon: "↗",
        title: "Collateral-free",
        text: "Some lenders offer unsecured options; a co-applicant may be needed.",
        tag: "Profile-based approval"
    }
];

export function EducationLoanSection() {
    const cards = loanCards.map((card, index) => `
        <article class="loan-mini-card" style="--loan-card-index:${index}" tabindex="0">
            <span class="loan-mini-icon" aria-hidden="true">${card.icon}</span>
            <div class="loan-mini-copy"><h3>${card.title}</h3><p>${card.text}</p><span class="loan-mini-tag">${card.tag}</span></div>
        </article>
    `).join("");

    const content = `
        <div class="education-loan-section">
            <div class="loan-feature-panel">
                <div class="loan-feature-copy">
                    <span class="loan-eyebrow">PLAN YOUR NEXT STEP</span>
                    <h2>Education Loan</h2>
                    <p>Explore financing for study abroad and eligible online degrees, including courses through upGrad and ForSchol. Compare the terms before you apply.</p>
                    <div class="loan-actions">
                        <button class="loan-primary-action" type="button">Check eligibility <span aria-hidden="true">→</span></button>
                        <a class="loan-secondary-action" href="https://pmvidyalaxmi.co.in/" target="_blank" rel="noopener noreferrer">PM-Vidyalaxmi portal</a>
                        <button class="loan-calculator-action" type="button">Loan calculator <span aria-hidden="true">▦</span></button>
                    </div>
                </div>
                <div class="loan-amount-badge"><strong>₹7.5L–₹3Cr*</strong><span>indicative lender limits</span></div>
            </div>

            <div class="loan-mini-grid" aria-label="Education loan options">${cards}</div>

            <div class="loan-quick-facts">
                <p><strong>Compare lenders</strong><span>SBI · ICICI Bank · Credila · Avanse</span></p>
                <p><strong>Published rate examples</strong><span>About 7.15%–10.25%+ p.a.*</span></p>
                <p><strong>May be reviewed</strong><span>Academics · admission · co-applicant income · credit history</span></p>
            </div>

            <div class="loan-schemes-note">
                <span aria-hidden="true">✦</span>
                <p><strong>Government support:</strong> Check PM-Vidyalaxmi eligibility and current rules. Students in Ghaziabad can apply through participating lenders or the official portal; online course funding depends on the exact programme.</p>
            </div>

            <details class="loan-more-info">
                <summary>See eligibility, documents and application steps <span aria-hidden="true">＋</span></summary>
                <div class="loan-info-grid">
                    <div><h3>What lenders may review</h3><p>Academic record, admission and course eligibility, entrance scores when applicable, co-applicant income and credit history (including CIBIL), requested amount and collateral where required.</p></div>
                    <div><h3>Documents to prepare</h3><p>Student/co-applicant ID and PAN, academic records, admission letter, fee schedule, income proof and bank statements; collateral papers and passport/visa documents when relevant.</p></div>
                    <div><h3>Simple application path</h3><p>Estimate costs → confirm the course is eligible → compare lender rates, fees and security → submit the application and documents → review the sanction terms before accepting.</p></div>
                    <div><h3>Government portal</h3><p>Vidya Lakshmi information now points students to PM-Vidyalaxmi for current applications. Benefits depend on scheme rules and eligible institutions; verify details on the official portal.</p></div>
                </div>
            </details>

            <dialog class="loan-enquiry" aria-labelledby="loan-enquiry-title">
                <div class="loan-dialog-heading"><div><span class="loan-eyebrow">NEXT STEP</span><h3 id="loan-enquiry-title">Request loan guidance</h3><p>Share a few details to prepare your enquiry.</p></div><button class="loan-dialog-close" type="button" aria-label="Close form">×</button></div>
                <form class="loan-enquiry-form">
                    <label>Student name<input name="name" autocomplete="name" required placeholder="Your full name"></label>
                    <label>Mobile number<input name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9+()\\s-]{8,18}" required placeholder="10-digit mobile number"></label>
                    <label>Study plan<select name="studyPlan" required><option value="">Choose one</option><option>Study abroad</option><option>Online degree</option><option>Other higher education</option></select></label>
                    <label>Course or platform<input name="course" placeholder="e.g. MSc in Canada, upGrad, ForSchol"></label>
                    <label>Preferred loan amount<select name="amount" required><option value="">Choose a range</option><option>Under ₹7.5 lakh</option><option>₹7.5 lakh–₹25 lakh</option><option>₹25 lakh–₹75 lakh</option><option>₹75 lakh–₹1.5 crore</option><option>₹1.5 crore–₹3 crore</option></select></label>
                    <label>City<input name="city" autocomplete="address-level2" value="Ghaziabad, Uttar Pradesh"></label>
                    <label class="loan-consent"><input type="checkbox" required><span>I agree to be contacted about this enquiry. I will share financial documents only through a verified lender’s official channel.</span></label>
                    <button class="loan-form-submit" type="submit">Prepare my enquiry <span aria-hidden="true">→</span></button>
                    <p class="loan-form-feedback" role="status" aria-live="polite"></p>
                    <p class="loan-form-privacy">This enquiry form is a website demo and does not send or store your personal details yet. To apply now, use a lender’s official website or the government portal.</p>
                </form>
            </dialog>

            <dialog class="loan-calculator-dialog" aria-labelledby="loan-calculator-title">
                <div class="loan-dialog-heading"><div><span class="loan-eyebrow">LIVE ESTIMATE</span><h3 id="loan-calculator-title">Calculate your education loan</h3><p>Enter your lender's rate and repayment terms to see the estimate update instantly.</p></div><button class="loan-calc-close" type="button" aria-label="Close calculator">×</button></div>
                <section class="loan-calculator" aria-label="Education loan repayment calculator">
                    <div class="loan-calculator-title"><span class="loan-calc-badge">Reducing balance</span></div>
                    <div class="loan-calculator-fields">
                        <label>Loan amount (₹)<input class="loan-calc-principal" type="number" min="50000" max="30000000" step="50000" value="1500000" inputmode="numeric"></label>
                        <label>Bank offer rate (% p.a.)<input class="loan-calc-rate" type="number" min="0.1" max="30" step="0.05" value="10.54" inputmode="decimal"></label>
                        <label>Repayment term (years)<input class="loan-calc-years" type="number" min="1" max="20" step="1" value="10" inputmode="numeric"></label>
                        <label>Study / moratorium period (months)<input class="loan-calc-moratorium" type="number" min="0" max="120" step="1" value="0" inputmode="numeric"></label>
                    </div>
                    <div class="loan-calculator-results" aria-live="polite">
                        <div class="loan-emi-result"><span>Estimated monthly EMI</span><strong class="loan-calc-emi">—</strong></div>
                        <div><span>Total repayment</span><strong class="loan-calc-total">—</strong></div>
                        <div><span>Estimated interest</span><strong class="loan-calc-interest">—</strong></div>
                    </div>
                    <p class="loan-calc-note">Uses the bank offer rate you enter; academic record, admission, co-applicant income and CIBIL may affect the rate a lender offers, but do not change the EMI formula. Assumes a constant rate with monthly compounding. Moratorium estimate adds simple interest to the balance; staged disbursement, fees, subsidies and lender rules may change the actual figure. Ask your lender for its official repayment schedule.</p>
                </section>
            </dialog>

            <p class="loan-disclaimer">*Indicative amounts and rate examples only; lender rates, fees, eligibility, security, and scheme rules change. A displayed range is not a loan offer. Confirm current terms with the lender. <a href="https://sbi.co.in/web/interest-rates/interest-rates/loan-schemes-interest-rates/education-loan" target="_blank" rel="noopener noreferrer">SBI rates</a> · <a href="https://www.credila.com/courses-loan/education-loan-for-b-tech" target="_blank" rel="noopener noreferrer">Credila example</a> · <a href="https://www.avanse.com/education-loan/study-abroad-loan" target="_blank" rel="noopener noreferrer">Avanse example</a></p>
        </div>
    `;

    return Section({ id: "education-loan", title: "", subtitle: "", content });
}

export function initEducationLoanSection(root = document) {
    const section = root.querySelector("#education-loan");
    const form = section?.querySelector(".loan-enquiry-form");
    const dialog = section?.querySelector(".loan-enquiry");
    const cta = section?.querySelector(".loan-primary-action");
    const calculatorDialog = section?.querySelector(".loan-calculator-dialog");
    const calculatorCta = section?.querySelector(".loan-calculator-action");
    const calculator = calculatorDialog?.querySelector(".loan-calculator");
    if (!form || form.dataset.ready) return;
    form.dataset.ready = "true";
    cta?.addEventListener("click", (event) => {
        event.preventDefault();
        if (!dialog.open) dialog.showModal();
        window.setTimeout(() => form.querySelector("input")?.focus(), 50);
    });
    dialog?.querySelector(".loan-dialog-close")?.addEventListener("click", () => dialog.close());
    dialog?.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
    calculatorCta?.addEventListener("click", () => {
        if (calculatorDialog && !calculatorDialog.open) calculatorDialog.showModal();
    });
    calculatorDialog?.querySelector(".loan-calc-close")?.addEventListener("click", () => calculatorDialog.close());
    calculatorDialog?.addEventListener("click", (event) => {
        if (event.target === calculatorDialog) calculatorDialog.close();
    });
    const calculateLoan = () => {
        const principal = Number(calculator.querySelector(".loan-calc-principal").value);
        const annualRate = Number(calculator.querySelector(".loan-calc-rate").value);
        const years = Number(calculator.querySelector(".loan-calc-years").value);
        const moratoriumMonths = Number(calculator.querySelector(".loan-calc-moratorium").value);
        const valid = principal >= 50000 && principal <= 30000000 && annualRate > 0 && annualRate <= 30 && years >= 1 && years <= 20 && moratoriumMonths >= 0 && moratoriumMonths <= 120;
        const output = (selector) => calculator.querySelector(selector);
        if (!valid) {
            output(".loan-calc-emi").textContent = "Check inputs";
            output(".loan-calc-total").textContent = "—";
            output(".loan-calc-interest").textContent = "—";
            return;
        }
        const monthlyRate = annualRate / 1200;
        const adjustedPrincipal = principal * (1 + annualRate / 1200 * moratoriumMonths);
        const numberOfPayments = years * 12;
        const growth = (1 + monthlyRate) ** numberOfPayments;
        const emi = adjustedPrincipal * monthlyRate * growth / (growth - 1);
        const total = emi * numberOfPayments;
        const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
        output(".loan-calc-emi").textContent = currency.format(emi);
        output(".loan-calc-total").textContent = currency.format(total);
        output(".loan-calc-interest").textContent = currency.format(total - principal);
    };
    calculator?.querySelectorAll("input").forEach((input) => input.addEventListener("input", calculateLoan));
    if (calculator) calculateLoan();
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const feedback = form.querySelector(".loan-form-feedback");
        feedback.textContent = "Your details are complete. Use the official lender or PM-Vidyalaxmi portal above to submit an application; this demo has not sent your information.";
        feedback.classList.add("is-visible");
    });
}

export default EducationLoanSection;
