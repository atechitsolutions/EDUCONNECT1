import { isAuthenticated } from "../services/authService.js";

export function CommunityPage() {
    if (!isAuthenticated()) return `
        <main class="community-auth-wall"><section><span class="community-kicker">EDUCONNECT COMMUNITY</span><h1>Your Community. Your Connections.</h1>
            <p>Sign in with your EduConnect account to join the community conversation and connect with other members.</p>
            <a class="community-button community-button-primary" href="/community" data-auth-required="true">Sign in to continue →</a>
        </section></main>`;

    return `
    <main id="community-page" class="community-page">
        <section class="community-hero" aria-labelledby="community-title">
            <div class="community-hero-copy"><span class="community-kicker">EDUCONNECT · STUDENT NETWORK</span>
                <h1 id="community-title">Your Community.<br><span>Your Connections.</span></h1>
                <p>Meet students, exchange ideas, find study partners, and build meaningful connections.</p>
                <div class="community-hero-actions"><button class="community-button community-button-primary" data-community-tab-link="community-chat">Community Chat <span>→</span></button>
                    <button class="community-button community-button-glass" data-community-tab-link="community-chat">Open group chat <span>↗</span></button></div>
                <div class="community-hero-stats" aria-live="polite">
                    <div><strong data-stat="friends">—</strong><span>Your connections</span></div>
                    <div><strong data-stat="requests">—</strong><span>New requests</span></div>
                    <div><strong data-stat="unread">—</strong><span>Unread messages</span></div>
                </div>
            </div>
            <figure class="community-hero-photo">
                <img src="/images/community/student-community-chat.jpg" alt="College students chatting together outside on campus" loading="eager">
                <figcaption>Photo by <a href="https://www.pexels.com/photo/young-people-talking-to-each-other-7973037/" target="_blank" rel="noopener noreferrer">George Pak / Pexels</a></figcaption>
                <div class="community-float-card"><span class="community-float-icon">✦</span><span><b>Good conversations start here</b><small>Meet classmates and find your people</small></span></div>
            </figure>
        </section>

        <div class="community-dashboard">
            <aside class="community-sidebar">
                <div class="community-side-profile"><span class="community-avatar community-avatar-large" data-my-avatar>EC</span><div><strong data-my-name>Student</strong><small data-my-course>Complete your profile</small></div><span class="community-presence-dot" aria-label="Signed in"></span></div>
                <nav class="community-tabs" aria-label="Community sections">
                    <button class="is-active" data-community-tab="community-chat" aria-current="page"><span>✦</span> Community Chat</button>
                    <button data-community-tab="discover"><span>⌕</span> Discover students</button>
                    <button data-community-tab="friends"><span>◉</span> My friends <b data-tab-count="friends">0</b></button>
                    <button data-community-tab="requests"><span>↗</span> Friend requests <b data-tab-count="requests">0</b></button>
                    <button data-community-tab="messages"><span>▤</span> Messages <b data-tab-count="messages">0</b></button>
                    <button data-community-tab="notifications"><span>♧</span> Notifications <b data-tab-count="notifications">0</b></button>
                    <button data-community-tab="profile"><span>⚙</span> My profile</button>
                </nav>
                <div class="community-sidebar-note"><span>🔒</span><p>Your email and phone are never shown in student discovery.</p></div>
            </aside>

            <div class="community-content">
                <section class="community-panel is-active community-group-panel" data-panel="community-chat" aria-labelledby="community-chat-title">
                    <div class="community-section-heading"><div><span class="community-kicker">THE EDUCONNECT STUDENT LOUNGE</span><h2 id="community-chat-title">EduConnect Community Chat</h2><p>Connect, share ideas, and learn together.</p></div><span class="community-live-pill"><i></i> Shared group</span></div>
                    <section class="community-group-chat" aria-label="Shared community chat">
                        <header class="community-group-chat-header"><span class="community-group-chat-mark">EC</span><div><strong>EduConnect Community</strong><span>Chatting as <b data-community-chat-user-name>Student</b></span></div><span class="community-group-online"><i></i> Live updates</span></header>
                        <div class="community-group-message-list" data-community-chat-list aria-live="polite" aria-relevant="additions text"><div class="community-empty-state"><span>✦</span><h3>Loading community chat</h3><p>Getting the latest messages…</p></div></div>
                        <form class="community-group-message-form" data-community-chat-form>
                            <label class="community-group-message-input"><span class="visually-hidden">Write a message to the community</span><textarea name="content" rows="1" maxlength="4000" placeholder="Message the community…"></textarea></label>
                            <div class="community-group-composer-tools"><div class="community-group-emoji-wrap"><button type="button" class="community-group-tool" data-chat-emoji-toggle aria-label="Add emoji">☺</button><div class="community-group-emoji-menu" data-chat-emoji-menu hidden>${["😀","😂","🥰","👍","❤️","🎉","🤔","👏","🙏","✨"].map(emoji => `<button type="button" data-chat-emoji="${emoji}" aria-label="Add ${emoji}">${emoji}</button>`).join("")}</div></div>
                                <label class="community-group-tool community-group-image-tool" title="Attach an image" aria-label="Attach an image">▧<input type="file" data-chat-image accept="image/png,image/jpeg,image/webp,image/gif" hidden></label><span class="community-group-image-name" data-chat-image-name></span><button type="submit">Send <span aria-hidden="true">➤</span></button>
                            </div><div class="community-group-image-preview" data-chat-image-preview hidden></div><small>Enter to send · Shift+Enter for a new line · Images up to 450 KB</small>
                        </form>
                        <div class="community-group-signin" data-community-chat-signin hidden><p>Sign in or create an EduConnect account to join the conversation.</p><a class="community-button community-button-primary" href="/community" data-auth-required="true">Sign in / Register <span>→</span></a></div>
                    </section>
                </section>

                <section class="community-panel" data-panel="discover" aria-labelledby="discover-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">BUILD YOUR CIRCLE</span><h2 id="discover-title">Discover students</h2><p>Search by name, course, university, country, or shared interests.</p></div><span class="community-panel-count" data-discovery-count></span></div>
                    <form class="community-search-form"><label class="community-search-main"><span aria-hidden="true">⌕</span><input name="q" type="search" placeholder="Search students by name or username" aria-label="Search students by name or username"></label>
                        <input name="university" placeholder="University" aria-label="Filter by university"><input name="country" placeholder="Country" aria-label="Filter by country"><input name="course" placeholder="Course" aria-label="Filter by course">
                        <input name="interest" placeholder="Interest" aria-label="Filter by interest"><select name="sort" aria-label="Sort students"><option value="newest">Newest members</option><option value="shared">Shared interests</option></select>
                        <button class="community-button community-button-primary" type="submit">Search <span>→</span></button>
                    </form>
                    <div class="community-card-grid" data-student-results aria-live="polite"><div class="community-skeleton"></div><div class="community-skeleton"></div><div class="community-skeleton"></div></div>
                    <div class="community-pagination"><button data-page-prev disabled>← Previous</button><span data-page-label>Page 1</span><button data-page-next>Next →</button></div>
                </section>

                <section class="community-panel" data-panel="friends" aria-labelledby="friends-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">YOUR STUDY NETWORK</span><h2 id="friends-title">My friends</h2><p>Start a private, one-to-one conversation with a connection.</p></div></div>
                    <div class="community-card-grid" data-friends-results></div>
                </section>

                <section class="community-panel" data-panel="requests" aria-labelledby="requests-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">CONNECTIONS</span><h2 id="requests-title">Friend requests</h2><p>Choose who you’d like to connect with.</p></div></div>
                    <div class="community-request-columns"><div><h3>Incoming</h3><div data-incoming-requests></div></div><div><h3>Sent</h3><div data-outgoing-requests></div></div></div>
                </section>

                <section class="community-panel" data-panel="messages" aria-labelledby="messages-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">PRIVATE CONVERSATIONS</span><h2 id="messages-title">Messages</h2><p>Private chats are available after a friend request is accepted.</p></div><span class="community-live-pill"><i></i> Updates automatically</span></div>
                    <div class="community-chat-shell"><aside class="community-conversation-list"><label class="community-conversation-search">⌕ <input data-conversation-search type="search" placeholder="Search conversations" aria-label="Search conversations"></label><div data-conversation-list></div></aside>
                        <section class="community-chat-window" data-chat-window aria-label="Conversation"><div class="community-chat-empty"><span>✉</span><h3>Your conversations start here</h3><p>Choose a friend to open a private chat.</p><button class="community-button community-button-glass" data-community-tab-link="friends">View my friends →</button></div></section>
                    </div>
                </section>

                <section class="community-panel" data-panel="notifications" aria-labelledby="notifications-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">STAY IN THE LOOP</span><h2 id="notifications-title">Notifications</h2><p>Friend requests, accepted connections, and new messages.</p></div><button class="community-text-button" data-mark-all-read>Mark all read</button></div>
                    <div class="community-notification-list" data-notifications></div>
                </section>

                <section class="community-panel" data-panel="profile" aria-labelledby="profile-title" hidden>
                    <div class="community-section-heading"><div><span class="community-kicker">YOUR SPACE</span><h2 id="profile-title">Your student profile</h2><p>Share only the details you want other students to see.</p></div></div>
                    <form class="community-profile-form" data-profile-form>
                        <label>Display name<input data-profile-name type="text" readonly></label><label>Username<input name="username" minlength="3" maxlength="40" pattern="[a-zA-Z0-9_]{3,40}" required></label>
                        <label class="community-field-wide">Short bio<textarea name="bio" maxlength="500" rows="3" placeholder="What are you studying or working toward?"></textarea></label>
                        <label>University<input name="university" maxlength="160" placeholder="Your university"></label><label>Course / field<input name="course" maxlength="160" placeholder="e.g. Computer Science"></label>
                        <label>Country or region<input name="country" maxlength="100" placeholder="Your region"></label><label>Interests<input name="interests" maxlength="500" placeholder="AI, design, research"></label>
                        <label class="community-toggle"><input name="discoverable" type="checkbox"><span><b>Show my profile in student discovery</b><small>Off until you choose to enable it.</small></span></label>
                        <label class="community-toggle"><input name="showOnline" type="checkbox"><span><b>Share my online status</b><small>Your status expires after you leave.</small></span></label>
                        <button class="community-button community-button-primary" type="submit">Save profile <span>→</span></button><p class="community-form-feedback" role="status" aria-live="polite"></p>
                    </form>
                </section>
                <div class="community-toast" data-community-toast role="status" aria-live="polite"></div>
            </div>
        </div>
        <dialog class="community-profile-dialog" data-profile-dialog aria-labelledby="community-profile-dialog-title"><button class="community-dialog-close" data-profile-close aria-label="Close profile">×</button><div data-profile-detail></div></dialog>
    </main>`;
}

export default CommunityPage;

