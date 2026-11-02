import { getCurrentUser, logoutUser } from "../services/authService.js";
import { loginPartner, storePartnerSession } from "../services/collegePartnerService.js";
import "../assets/css/college-partner.css";
const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);

export default function CollegeLoginPage() {
    const user = getCurrentUser();
    if (user?.role === "COLLEGE") return `<main class="cp-auth"><section class="cp-auth-card"><a class="cp-brand" href="/">EDUCONNECT<span>PARTNER PORTAL</span></a><span class="cp-kicker">COLLEGE ACCESS</span><h1>Welcome back</h1><p>You are signed in as ${esc(user.fullName || "a college partner")}.</p><a class="cp-button cp-button-gold" href="/college/dashboard">Open partner dashboard</a><button class="cp-text-button" id="cp-login-logout">Sign out</button></section></main>`;
    return `<main class="cp-auth"><a href="/" class="cp-auth-back">← EduConnect home</a><section class="cp-auth-card"><a class="cp-brand" href="/">EDUCONNECT<span>PARTNER PORTAL</span></a><span class="cp-kicker">COLLEGE PARTNER ACCESS</span><h1>Sign in to your college</h1><p>Use the credentials provided by your EduConnect administrator.</p><form id="cp-login-form"><label>Username<input name="username" autocomplete="username" required autofocus></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button class="cp-button cp-button-gold" type="submit">Sign in <span aria-hidden="true">→</span></button><p class="cp-feedback" id="cp-login-status" role="status"></p></form><div class="cp-auth-foot">Access is limited to the college assigned to your account.<br>For access help, contact EduConnect support.</div></section></main>`;
}

export function initCollegeLoginPage() {
    document.querySelector("#cp-login-logout")?.addEventListener("click", () => { logoutUser(); location.reload(); });
    const form = document.querySelector("#cp-login-form"); if (!form) return;
    form.addEventListener("submit", async event => { event.preventDefault(); const status = form.querySelector("#cp-login-status"), button = form.querySelector("button[type=submit]"); button.disabled = true; status.textContent = "Signing in…"; try { const result = await loginPartner(Object.fromEntries(new FormData(form))); storePartnerSession(result); location.assign("/college/dashboard"); } catch (error) { status.textContent = error.message; status.classList.add("is-error"); button.disabled = false; } });
}
