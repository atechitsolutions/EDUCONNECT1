const answerFor = (question) => {
    const text = question.toLowerCase();
    if (/scholar|funding|grant|financial aid/.test(text)) return { text: "Explore scholarship options for international study, then confirm eligibility and deadlines with each university or provider.", label: "Explore study abroad", href: "/study-abroad#study-abroad-scholarships" };
    if (/abroad|oversea|country|destination|visa|study in/.test(text)) return { text: "Compare study destinations, universities, courses, scholarships and application steps in EduConnect’s Study Abroad guide.", label: "Explore study abroad", href: "/study-abroad" };
    if (/online|course|degree|certificate|diploma|subject|learn/.test(text)) return { text: "Browse online courses, certificates, diplomas and degree programmes by subject and education level.", label: "Explore online education", href: "/online-education" };
    if (/university|universities|college/.test(text)) return { text: "Compare university options in the Study Abroad section. Confirm entry requirements and fees directly with each institution.", label: "Compare destinations", href: "/study-abroad#study-abroad-destinations" };
    if (/application|apply|admission|requirement|deadline/.test(text)) return { text: "The Study Abroad guide covers common application steps. Requirements and deadlines vary, so verify them with your chosen institution.", label: "View application guide", href: "/study-abroad#study-abroad-application-process" };
    return { text: "I can help you find online courses, study-abroad destinations, universities and scholarships. This preview uses EduConnect page guidance; an AI service is not connected yet." };
};

export function initWebsiteAssistant() {
    if (/\/admin(?:\/|$)/i.test(window.location.pathname) || document.querySelector(".edu-assistant")) return;

    const widget = document.createElement("section");
    widget.className = "edu-assistant";
    widget.innerHTML = `
        <section class="ea-panel" id="edu-assistant-panel" role="dialog" aria-label="EduConnect assistant" aria-modal="false" hidden>
            <header class="ea-header">
                <span class="ea-avatar" aria-hidden="true">✦</span>
                <div class="ea-heading"><strong>EduConnect assistant</strong><span><i></i> Here to help you explore</span></div>
                <button class="ea-close" type="button" aria-label="Close chat">×</button>
            </header>
            <div class="ea-messages" aria-live="polite" aria-relevant="additions">
                <div class="ea-message ea-message-assistant"><p>Hi! What are you looking for today?</p></div>
                <div class="ea-suggestions" aria-label="Suggested questions">
                    <button type="button" data-question="Show me online courses">Online courses</button>
                    <button type="button" data-question="I want to study abroad">Study abroad</button>
                    <button type="button" data-question="Where can I find scholarships?">Scholarships</button>
                </div>
            </div>
            <form class="ea-compose">
                <label class="ea-sr-only" for="ea-message-input">Your message</label>
                <input id="ea-message-input" name="message" type="text" maxlength="500" placeholder="Type your message…" autocomplete="off" required>
                <button type="submit" aria-label="Send message"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 20 4l-5 16-3-7-8-1Zm8 1 8-9" /></svg></button>
            </form>
            <p class="ea-note">EduConnect preview assistant</p>
        </section>
        <button class="ea-launcher" type="button" aria-label="Open EduConnect chat" aria-expanded="false" aria-controls="edu-assistant-panel">
            <svg class="ea-chat-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2 1-4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>
            <svg class="ea-x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>`;
    document.body.append(widget);

    const panel = widget.querySelector(".ea-panel");
    const launcher = widget.querySelector(".ea-launcher");
    const messages = widget.querySelector(".ea-messages");
    const input = widget.querySelector("#ea-message-input");
    const setOpen = (open) => {
        panel.hidden = !open;
        launcher.setAttribute("aria-expanded", String(open));
        launcher.setAttribute("aria-label", open ? "Close EduConnect chat" : "Open EduConnect chat");
        widget.classList.toggle("is-open", open);
        if (open) input.focus();
    };
    const appendMessage = (text, role, action) => {
        const bubble = document.createElement("div");
        bubble.className = `ea-message ea-message-${role}`;
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        bubble.append(paragraph);
        if (action?.href) {
            const link = document.createElement("a");
            link.href = action.href;
            link.textContent = action.label;
            bubble.append(link);
        }
        messages.append(bubble);
        messages.scrollTop = messages.scrollHeight;
    };
    const sendMessage = (value) => {
        const question = value.trim();
        if (!question) return;
        appendMessage(question, "user");
        const answer = answerFor(question);
        appendMessage(answer.text, "assistant", answer);
    };

    launcher.addEventListener("click", () => setOpen(panel.hidden));
    widget.querySelector(".ea-close").addEventListener("click", () => setOpen(false));
    widget.querySelector(".ea-compose").addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage(input.value);
        input.value = "";
        input.focus();
    });
    widget.querySelectorAll("[data-question]").forEach((button) => button.addEventListener("click", () => sendMessage(button.dataset.question)));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !panel.hidden) {
            setOpen(false);
            launcher.focus();
        }
    });
}
