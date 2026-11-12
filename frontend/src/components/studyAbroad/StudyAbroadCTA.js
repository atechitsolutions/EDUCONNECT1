/* =========================================================
   STUDY ABROAD FINAL CTA  (boarding-pass sign-up section)
   Returns an HTML string, same pattern as the other
   studyAbroad/* components. Styles are included below so
   no separate CSS file or import is needed.
   ========================================================= */

/* ---------- lead submit: connect your backend here ---------- */
async function submitStudyAbroadLead(phone) {
  // TODO: replace with your real API call, e.g. from studyAbroadService.js:
  //   await studyAbroadService.saveLead({ phone });
  // Throw an Error("message") to show a failure message to the user.
  window.dispatchEvent(new CustomEvent("studyabroad:lead", { detail: { phone } }));
  await new Promise((r) => setTimeout(r, 400));
}

/* ---------- inline handlers (work with innerHTML rendering) ---------- */
if (typeof window !== "undefined") {
  window.ljLeapInput = function (input) {
    input.value = input.value.replace(/\D/g, "").slice(0, 10);
    const form = input.closest("form");
    const msg = form.querySelector(".lj-msg");
    msg.textContent = "";
    msg.className = "lj-msg";
    form.querySelector(".lj-phone").classList.remove("is-error");
  };

  window.ljLeapCode = function (select) {
    select.closest(".lj-phone__code").setAttribute("data-code", select.value);
  };

  window.ljLeapSubmit = async function (event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input[type='tel']");
    const code = form.querySelector("select").value;
    const msg = form.querySelector(".lj-msg");
    const btn = form.querySelector(".lj-btn");
    const label = btn.querySelector("span");
    const box = form.querySelector(".lj-phone");

    if (input.value.length !== 10) {
      box.classList.add("is-error");
      msg.className = "lj-msg lj-msg--error";
      msg.textContent = "Enter a valid 10-digit phone number.";
      input.focus();
      return false;
    }

    btn.disabled = true;
    label.textContent = "Sending…";
    try {
      await submitStudyAbroadLead(code + input.value);
      msg.className = "lj-msg lj-msg--ok";
      msg.textContent = "Thanks! Our counsellors will contact you soon.";
      input.value = "";
    } catch (err) {
      msg.className = "lj-msg lj-msg--error";
      msg.textContent = (err && err.message) || "Something went wrong. Please try again.";
    } finally {
      btn.disabled = false;
      label.textContent = "Get Started";
    }
    return false;
  };
}

const LJ_BARS = [
  3, 6, 2, 5, 3, 8, 2, 4, 6, 3, 2, 7, 3, 5, 2, 9, 3, 4, 2, 6, 3, 5, 8, 2, 4, 3,
  6, 2, 5, 3, 7, 2, 4, 6, 3, 2, 8, 3, 5, 2, 4, 6, 3, 9, 2, 5, 3, 4,
];

const LJ_CAP_SVG = `
<svg viewBox="0 0 48 48" aria-hidden="true">
  <path fill="currentColor" d="M24 9 3 19.5 24 30l15-7.5V33h4V19.5L24 9Z"/>
  <path fill="currentColor" opacity=".75" d="M11 27.2V34c0 3.3 5.8 6 13 6s13-2.7 13-6v-6.8L24 33.9l-13-6.7Z"/>
</svg>`;

const LJ_PLANE_SVG = `
<svg class="lj-plane" viewBox="0 0 32 32" aria-hidden="true">
  <path fill="#ff7a1a" d="M3 20.5 28 9.2c1.2-.5 2.3.7 1.7 1.8l-1.4 2.6c-.3.5-.8.9-1.4 1l-6.3 1.5-3.7 6.4-2.3-.6.9-5.6-5.2 1.2-2 2.7-2.1-.6.7-4-1.6-.5-.1 3.4Z"/>
  <rect x="3" y="26" width="26" height="2" rx="1" fill="#cfd6df"/>
</svg>`;

const LJ_STYLES = `
<style>
.lj-section{--lj-ink:#3a0d12;--lj-blue:#4a4af5;--lj-orange:#ff7a2f;--lj-bar:#5b2a12;--lj-muted:#6b7280;--lj-line:#e5e7eb;
position:relative;overflow:hidden;padding:36px 16px 32px;background:linear-gradient(180deg,#f3f9ff 0%,#c9e6fb 55%,#a9d5f5 100%);font-family:inherit;color:#111;box-sizing:border-box}
.lj-section *,.lj-section *::before,.lj-section *::after{box-sizing:border-box}
.lj-cloud{position:absolute;background:#fff;border-radius:50%;filter:blur(28px);opacity:.75;pointer-events:none}
.lj-cloud--a{width:160px;height:60px;top:20px;left:-30px}
.lj-cloud--b{width:180px;height:70px;top:120px;right:-50px}
.lj-heading{position:relative;margin:0 auto 22px;text-align:center;color:var(--lj-ink);font-weight:700;font-size:clamp(28px,8vw,40px);line-height:1.12;letter-spacing:-.02em}
.lj-br{display:none}
.lj-grid{position:relative;display:grid;grid-template-columns:1fr;gap:12px;max-width:460px;margin:0 auto}
.lj-card{background:#fff;border-radius:22px;overflow:hidden}
.lj-signup{padding:22px 18px 18px}
.lj-logo{display:flex;align-items:center;gap:8px}
.lj-logo svg{width:30px;height:30px;color:var(--lj-blue);flex:none}
.lj-logo__text{display:inline-flex;font-weight:800;font-size:20px;letter-spacing:.01em;line-height:1}
.lj-logo__edu{color:var(--lj-blue)}
.lj-logo__connect{color:var(--lj-orange)}
.lj-tagline{margin:28px 0 18px;font-size:14px;line-height:1.5;color:#4b5563;max-width:34ch}
.lj-phone{display:flex;align-items:center;gap:10px;border-bottom:1.5px solid var(--lj-line);padding-bottom:8px;transition:border-color .2s}
.lj-phone:focus-within{border-color:var(--lj-blue)}
.lj-phone.is-error{border-color:#dc2626}
.lj-phone__code{position:relative;display:flex;align-items:center;gap:8px;padding-right:10px;border-right:1px solid var(--lj-line);flex:none}
.lj-flag{width:26px;height:17px;border-radius:2px;display:block}
.lj-globe{display:none;font-size:16px;line-height:1}
.lj-phone__code:not([data-code="+91"]) .lj-flag{display:none}
.lj-phone__code:not([data-code="+91"]) .lj-globe{display:block}
.lj-phone__code select{appearance:none;-webkit-appearance:none;border:0;background:transparent;font:inherit;font-size:15px;color:#111;padding:6px 18px 6px 0;width:66px;cursor:pointer}
.lj-chev{position:absolute;right:12px;width:10px;height:7px;pointer-events:none;color:#111}
.lj-phone input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;font-size:16px;padding:6px 0;color:#111}
.lj-phone input::placeholder{color:#b5bac3}
.lj-msg{min-height:20px;margin:8px 0 12px;font-size:13px;line-height:1.4}
.lj-msg--error{color:#dc2626}
.lj-msg--ok{color:#15803d}
.lj-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:52px;border:0;border-radius:12px;background:#000;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer;transition:transform .15s,opacity .2s}
.lj-btn svg{width:20px;height:20px}
.lj-btn:active{transform:scale(.985)}
.lj-btn:disabled{opacity:.6;cursor:not-allowed}
.lj-btn:focus-visible,.lj-phone__code select:focus-visible{outline:3px solid var(--lj-blue);outline-offset:2px}
.lj-ticket{display:flex;flex-direction:column}
.lj-ticket__main{padding:18px 16px 20px}
.lj-ticket__head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.lj-ticket__head h3{margin:0;font-size:22px;font-weight:700;letter-spacing:-.01em}
.lj-tag{display:grid;place-items:center;flex:none;width:38px;height:30px;background:var(--lj-blue);color:#fff;clip-path:polygon(0 0,78% 0,100% 50%,78% 100%,0 100%);padding-right:6px}
.lj-tag svg{width:20px;height:20px}
.lj-route{display:grid;grid-template-columns:1fr 1fr;margin:22px 0 18px}
.lj-route__item{display:flex;align-items:center;gap:8px;min-width:0}
.lj-route__item+.lj-route__item{padding-left:14px;border-left:1px solid var(--lj-line)}
.lj-route__item strong{display:block;font-size:13px;font-weight:600;overflow-wrap:anywhere}
.lj-plane{width:24px;height:24px;flex:none}
.lj-label{display:block;font-size:11px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--lj-muted)}
.lj-meta{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px;margin:0 0 18px}
.lj-meta>div{padding-bottom:6px;border-bottom:1px solid var(--lj-line)}
.lj-meta dt{margin-bottom:4px}
.lj-meta dd{margin:0;font-size:13px;font-weight:600}
.lj-meta__status{grid-column:1;grid-row:2}
.lj-meta__seat{grid-column:1;grid-row:1}
.lj-meta__group{grid-column:2;grid-row:1}
.lj-desc{margin:0;font-size:13px;line-height:1.65;color:#4b5563}
.lj-barcode{display:flex;align-items:stretch;justify-content:space-between;gap:3px;height:56px;padding:10px 16px;background:var(--lj-orange);border-radius:0 0 22px 22px}
.lj-barcode i{display:block;flex:none;width:calc(var(--w)*1px);background:var(--lj-bar)}
@media (min-width:640px){
.lj-section{padding:56px 24px 52px}
.lj-br{display:inline}
.lj-heading{margin-bottom:34px;font-size:clamp(40px,6vw,60px)}
.lj-grid{max-width:640px}
.lj-signup{padding:28px 26px 24px}
}
@media (min-width:960px){
.lj-section{padding:48px 32px 44px}
.lj-heading{font-size:clamp(38px,4vw,52px);margin-bottom:30px}
.lj-grid{grid-template-columns:minmax(280px,4fr) minmax(0,6fr);gap:16px;max-width:1040px;align-items:stretch}
.lj-card{border-radius:26px}
.lj-signup{display:flex;flex-direction:column;padding:26px 24px 22px}
.lj-signup .lj-tagline{margin-top:auto;font-size:15px;margin-bottom:22px}
.lj-logo svg{width:30px;height:30px}
.lj-logo__text{font-size:24px}
.lj-phone__code select{font-size:16px}
.lj-btn{min-height:54px;font-size:18px;border-radius:14px}
.lj-btn svg{width:22px;height:22px}
.lj-ticket{flex-direction:row}
.lj-ticket__main{flex:1;padding:22px 26px 24px}
.lj-ticket__head h3{font-size:32px;letter-spacing:-.02em}
.lj-tag{width:52px;height:40px;padding-right:8px}
.lj-tag svg{width:26px;height:26px}
.lj-route{margin:22px 0 20px}
.lj-route__item strong{font-size:16px}
.lj-route__item+.lj-route__item{padding-left:20px}
.lj-plane{width:26px;height:26px}
.lj-label{font-size:12px}
.lj-meta{grid-template-columns:repeat(3,1fr);gap:0 20px}
.lj-meta>div{padding-bottom:8px}
.lj-meta__status,.lj-meta__seat,.lj-meta__group{grid-column:auto;grid-row:auto}
.lj-meta__status{order:1}
.lj-meta__seat{order:2}
.lj-meta__group{order:3}
.lj-meta dd{font-size:17px}
.lj-desc{margin-top:20px;font-size:15px;line-height:1.6}
.lj-barcode{flex:none;flex-direction:column;width:96px;height:auto;padding:18px 16px;border-radius:0 26px 26px 0}
.lj-barcode i{width:100%;height:calc(var(--w)*1px)}
}
@media (prefers-reduced-motion:reduce){.lj-btn,.lj-phone{transition:none}}
.lj-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
</style>`;

export default function StudyAbroadCTA() {
  const bars = LJ_BARS.map((w) => `<i style="--w:${w}"></i>`).join("");

  return `
${LJ_STYLES}

<!-- =====================================================
     STUDY ABROAD FINAL CTA
     ===================================================== -->
<section class="lj-section" id="study-abroad-cta" aria-labelledby="lj-heading">
  <span class="lj-cloud lj-cloud--a" aria-hidden="true"></span>
  <span class="lj-cloud lj-cloud--b" aria-hidden="true"></span>

  <h2 id="lj-heading" class="lj-heading">Ready to Take<br class="lj-br"> The Leap?</h2>

  <div class="lj-grid">

    <!-- Sign-up card -->
    <form class="lj-card lj-signup" onsubmit="return window.ljLeapSubmit(event)" novalidate>
      <div class="lj-logo" aria-label="EduConnect">
        ${LJ_CAP_SVG}
        <span class="lj-logo__text"><span class="lj-logo__edu">EDU</span><span class="lj-logo__connect">CONNECT</span></span>
      </div>

      <p class="lj-tagline">Sign up today and our study abroad experts get in touch with you.</p>

      <div class="lj-phone">
        <label class="lj-sr" for="lj-phone-input">Phone number</label>
        <div class="lj-phone__code" data-code="+91">
          <svg class="lj-flag" viewBox="0 0 30 20" aria-hidden="true">
            <rect width="30" height="7" fill="#ff9933"/>
            <rect y="7" width="30" height="6" fill="#fff"/>
            <rect y="13" width="30" height="7" fill="#138808"/>
            <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width="0.9"/>
          </svg>
          <span class="lj-globe">🌐</span>
          <select aria-label="Country code" onchange="window.ljLeapCode(this)">
            <option value="+91">+91 India</option>
            <option value="+977">+977 Nepal</option>
            <option value="+880">+880 Bangladesh</option>
            <option value="+94">+94 Sri Lanka</option>
            <option value="+971">+971 UAE</option>
          </select>
          <svg class="lj-chev" viewBox="0 0 12 8" aria-hidden="true">
            <path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <input id="lj-phone-input" type="tel" inputmode="numeric" autocomplete="tel-national"
               placeholder="Phone Number*" oninput="window.ljLeapInput(this)" />
      </div>

      <p class="lj-msg" role="status" aria-live="polite"></p>

      <button type="submit" class="lj-btn">
        <span>Get Started</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </form>

    <!-- Boarding pass -->
    <article class="lj-card lj-ticket" aria-label="Early access boarding pass">
      <div class="lj-ticket__main">
        <header class="lj-ticket__head">
          <h3>Get Early Access</h3>
          <span class="lj-tag" aria-hidden="true">${LJ_CAP_SVG}</span>
        </header>

        <div class="lj-route">
          <div class="lj-route__item">
            ${LJ_PLANE_SVG}
            <div><span class="lj-label">From</span><strong>India</strong></div>
          </div>
          <div class="lj-route__item">
            ${LJ_PLANE_SVG}
            <div><span class="lj-label">To</span><strong>Dream University</strong></div>
          </div>
        </div>

        <dl class="lj-meta">
          <div class="lj-meta__status"><dt class="lj-label">Status</dt><dd>Now Boarding</dd></div>
          <div class="lj-meta__seat"><dt class="lj-label">Seat</dt><dd>1A</dd></div>
          <div class="lj-meta__group"><dt class="lj-label">Group</dt><dd>1st Class</dd></div>
        </dl>

        <p class="lj-desc">
          EduConnect helps Indian students plan their study abroad journey. Compare destinations,
          universities, courses and scholarships, review admission requirements and estimated costs,
          then choose your next step, all in one place.
        </p>
      </div>

      <div class="lj-barcode" aria-hidden="true">${bars}</div>
    </article>

  </div>
</section>
`;
}