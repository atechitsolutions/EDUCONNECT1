import { onlineEducationInstitutions } from "../data/onlineEducationInstitutions.js";
import { onlineEducationProgrammes } from "../data/onlineEducationProgrammes.js";
import onlineEducationHeroVideo from "../assets/images/online-education-hero.mp4";
import onlineEducationHeroPoster from "../assets/images/online-education-hero.jpg";
import renderOnlineEducationLeadForm, {
  bindOnlineEducationLeadForm
} from "../components/onlineeducationleadform.js";


const levels = [
    "School",
    "Diploma",
    "Certificate",
    "Undergraduate",
    "Bachelor's",
    "Postgraduate",
    "Master's",
    "MBA",
    "PhD / Doctorate",
    "Doctoral",
    "Associate's",
    "Online Degree",
    "Short Course",
    "Professional Certificate",
    "Microcredential"
];

const subjects = [
    "AI & Machine Learning",
    "Data Science",
    "Business",
    "Engineering",
    "Healthcare",
    "Finance",
    "Digital Marketing",
    "Cybersecurity",
    "Design",
    "Psychology",
    "Education"
];

export default function OnlineEducationPage() {
    return `
      <main class="oe-page" id="online-education-page">

        <nav class="oe-nav" aria-label="Online education sections">
          <div class="oe-nav-inner">
            <a class="oe-brand" href="#oe-top">
              EC <span>| ONLINE EDUCATION</span>
            </a>

            <button
              class="oe-menu-toggle"
              id="oe-menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="oe-nav-links"
            >
              Menu
            </button>

            <div class="oe-nav-links" id="oe-nav-links">
              <a href="#oe-programmes">Courses</a>

              <details class="oe-nav-dropdown">
                <summary>
                  Study paths <span aria-hidden="true">⌄</span>
                </summary>
                <div class="oe-nav-dropdown-menu">
                  <a href="#oe-levels">Diplomas &amp; certificates</a>
                </div>
              </details>

              <a href="#oe-universities">Universities</a>
              <a href="#oe-programmes">Compare</a>
              <a href="/online-education/admin">Admin</a>

              <a class="oe-nav-cta" href="#oe-programmes">
                Find a course <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </nav>

        <section class="oe-hero" id="oe-top">
          <video
            class="oe-hero-video"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            poster="${onlineEducationHeroPoster}"
            aria-hidden="true"
            tabindex="-1"
          >
            <source src="${onlineEducationHeroVideo}" type="video/mp4">
          </video>

          <div class="oe-hero-inner">
            <div class="oe-hero-copy">
              <p class="oe-eyebrow">A clearer way to choose what’s next</p>

              <h1>
                Online Education: Compare Courses, Certificates &amp; Degrees
              </h1>

              <p>
                Compare online courses, certificates, diplomas and degree
                programmes from learning websites and universities. Explore
                options by subject, education level and study mode, then verify
                fees and recognition with the provider.
              </p>

              <div class="oe-hero-actions">
                <a class="oe-button oe-primary" href="#oe-programmes">
                  Explore Programmes <span>→</span>
                </a>

                <a class="oe-button oe-outline" href="#oe-programmes">
                  Compare Courses
                </a>
              </div>

              <form
                id="oe-hero-search-form"
                class="oe-search-form oe-hero-search"
                role="search"
              >
                <label class="oe-field oe-search-wide">
                  <span>Search courses, subjects or universities</span>

                  <input
                    id="oe-hero-query"
                    type="search"
                    list="oe-programme-suggestions"
                    placeholder="Try MBA, artificial intelligence or IIIT Bangalore"
                    autocomplete="off"
                  >

                  <datalist id="oe-programme-suggestions">
                    ${onlineEducationProgrammes.map(programme => `
                      <option
                        value="${programme.title.replaceAll('"', '&quot;')}"
                        label="${programme.providerName.replaceAll('"', '&quot;')}"
                      ></option>
                    `).join("")}
                  </datalist>
                </label>

                <button
                  class="oe-button oe-primary oe-submit"
                  type="submit"
                >
                  Search programmes <span>→</span>
                </button>
              </form>

              <div class="oe-quick">
                <span>Popular:</span>
                ${[
                    "Computer Science",
                    "Artificial Intelligence",
                    "Data Science",
                    "Business & Management",
                    "Digital Marketing",
                    "Healthcare",
                    "Engineering",
                    "Psychology"
                ].map(x => `
                    <button type="button" data-query="${x}">${x}</button>
                `).join("")}
              </div>
            </div>
          </div>
        </section>


        <section class="oe-section oe-level-section" id="oe-levels">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">LEARNING FOR EVERY STAGE</p>
                <h2>Explore by education level</h2>
                <p>From self-paced study resources to postgraduate pathways.</p>
              </div>

              <a class="oe-text-link" href="#oe-programmes">
                Browse all options →
              </a>
            </div>

            <div class="oe-level-carousel" aria-label="Education levels">
              <div class="oe-level-grid">
                ${[
                    ["01", "School learning", "Subject-led practice and learning resources.", "School", "⌂"],
                    ["02", "Diploma programmes", "Explore vocational and academic study routes.", "Diploma", "▤"],
                    ["03", "Bachelor’s degrees", "Discover undergraduate learning pathways.", "Bachelor's", "◇"],
                    ["04", "Master’s degrees", "Explore advanced postgraduate study.", "Master's", "✦"],
                    ["05", "MBA programmes", "Find business and management study options.", "MBA", "↗"],
                    ["06", "PhD & doctoral", "Explore research-led doctoral pathways.", "PhD / Doctorate", "⌘"],
                    ["07", "Online degrees", "Browse degree discovery resources.", "Online Degree", "▣"],
                    ["08", "Professional certificates", "Build knowledge through focused programmes.", "Professional Certificate", "✳"],
                    ["09", "Short courses", "Learn a subject in a shorter format.", "Short Course", "◷"],
                    ["10", "Microcredentials", "Explore compact learning achievements.", "Microcredential", "✣"]
                ].map(([n, title, description, level, icon]) => `
                  <a
                    class="oe-level-card"
                    href="#oe-programmes"
                    data-level="${level}"
                  >
                    <span class="oe-card-icon">${icon}</span>
                    <span class="oe-card-number">${n}</span>
                    <span class="oe-level-photo" aria-hidden="true"></span>

                    <h3>${title}</h3>
                    <p>${description}</p>

                    <span class="oe-card-arrow">Explore options →</span>
                  </a>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="oe-section oe-subject-section">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">FOLLOW YOUR CURIOSITY</p>
                <h2>Explore by subject</h2>
                <p>Choose a subject to apply it to the programme results.</p>
              </div>

              <div class="oe-subject-controls" aria-label="Subject carousel controls">
                <button
                  class="oe-subject-arrow"
                  type="button"
                  data-subject-prev
                  aria-label="Previous subjects"
                >←</button>

                <button
                  class="oe-subject-arrow"
                  type="button"
                  data-subject-next
                  aria-label="Next subjects"
                >→</button>
              </div>
            </div>

            <div class="oe-subject-carousel" data-subject-carousel>
              <div class="oe-subject-grid" data-subject-track>
                ${subjects.map((subject, index) => `
                  <button
                    class="oe-subject-card"
                    type="button"
                    data-subject="${subject}"
                  >
                    <span class="oe-subject-art" aria-hidden="true"></span>

                    <span class="oe-subject-icon">
                      ${["✦", "▥", "↗", "⚙", "＋", "＄", "◉", "◇", "✎", "◎", "▧"][index]}
                    </span>

                    <b>${subject}</b>

                    <small>
                      Explore programmes <i>→</i>
                    </small>
                  </button>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="oe-section oe-popular" id="oe-popular">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">A FEW PLACES TO START</p>
                <h2>Popular online course topics</h2>
                <p>
                  Illustrative discovery links to official topic catalogues.
                  Courses remain hosted by their providers.
                </p>
              </div>

              <a class="oe-text-link" href="#oe-programmes">
                View all discovery options →
              </a>
            </div>

            <div class="oe-popular-grid">
              ${[
                    ["Foundations of Computer Science", "Computer Science & IT", "Short Course", "Self-paced", "Computer Science", "https://www.coursera.org/browse/computer-science"],
                    ["Introduction to Artificial Intelligence", "Artificial Intelligence", "Professional Certificate", "Check provider website", "AI & Machine Learning", "https://www.edx.org/learn/artificial-intelligence"],
                    ["Data Analysis Essentials", "Data Science", "Certificate", "Check provider website", "Data Science", "https://www.coursera.org/browse/data-science"],
                    ["Business and Management: Core Concepts", "Business & Management", "Short Course", "Check provider website", "Business", "https://www.futurelearn.com/subjects/business-and-management-courses"]
                ].map(([title, subject, level, duration, filter, url]) => `
                  <article class="oe-popular-card">
                    <span class="oe-provider-mark" aria-hidden="true">
                      ${subject.slice(0, 2).toUpperCase()}
                    </span>

                    <p class="oe-programme-subject">${subject}</p>
                    <h3>${title}</h3>

                    <div class="oe-programme-tags">
                      <span>${level}</span>
                      <span>${duration}</span>
                    </div>

                    <p class="oe-card-footnote">
                      Illustrative topic link · no fee or certificate claim.
                    </p>

                    <div class="oe-popular-actions">
                      <a href="${url}" target="_blank" rel="noopener noreferrer">
                        Browse provider topic ↗
                      </a>

                      <button type="button" data-query="${filter}">
                        Find similar options →
                      </button>
                    </div>
                  </article>
                `).join("")}
            </div>
          </div>
        </section>

        <section
          class="oe-section oe-platform-guide"
          id="oe-platforms"
          aria-labelledby="oe-platform-title"
        >
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">A GUIDE TO DISCOVERY SOURCES</p>

                <h2 id="oe-platform-title">
                  Best websites for online learning, by education level
                </h2>

                <p>
                  Find learning websites for school courses, diplomas,
                  certificates and degree discovery. Confirm individual
                  course details on the provider's official website.
                </p>
              </div>
            </div>

            <div class="oe-platform-grid">
              ${[
                    ["School learning", "Khan Academy", "Free learning resources for school-level subjects.", "https://www.khanacademy.org/"],
                    ["University courses", "Coursera", "Explore online courses and programmes from participating providers.", "https://www.coursera.org/"],
                    ["University courses", "edX", "Explore courses and professional learning opportunities.", "https://www.edx.org/"],
                    ["Professional learning", "FutureLearn", "Discover courses across academic and professional subjects.", "https://www.futurelearn.com/"],
                    ["Technical learning", "freeCodeCamp", "Explore free coding lessons and projects.", "https://www.freecodecamp.org/"],
                    ["Technology learning", "Microsoft Learn", "Explore technical learning paths and documentation.", "https://learn.microsoft.com/"]
                ].map(([category, name, description, url]) => `
                  <article class="oe-platform-card">
                    <span class="oe-platform-category">${category}</span>
                    <h3>${name}</h3>
                    <p>${description}</p>

                    <a href="${url}" target="_blank" rel="noopener noreferrer">
                      Visit official website ↗
                    </a>
                  </article>
                `).join("")}
            </div>
          </div>
        </section>

        <section class="oe-section oe-programmes-section" id="oe-programmes">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">FIND YOUR NEXT STEP</p>
                <h2>Explore online education programmes</h2>
                <p>
                  Filter by qualification, subject, study mode, provider and
                  budget. Verify details with the institution before applying.
                </p>
              </div>
            </div>

            <div class="oe-programme-search-row">
              <button
                type="button"
                class="oe-button oe-outline oe-filter-toggle"
                aria-expanded="false"
                aria-controls="oe-filters"
              >
                Filters
              </button>

              <button
                type="button"
                class="oe-button oe-outline"
                id="oe-clear"
              >
                Clear filters
              </button>
            </div>

            <div class="oe-discovery-layout">
              <aside class="oe-filters" id="oe-filters">
                <div class="oe-filter-heading">
                  <h3>Filter programmes</h3>

                  <button
                    type="button"
                    class="oe-text-link"
                    id="oe-clear-mobile"
                  >
                    Clear all
                  </button>
                </div>

                <label class="oe-field">
                  <span>Education level</span>

                  <select id="oe-filter-level">
                    <option value="">Levels</option>
                    ${levels.map(level => `
                      <option>${level}</option>
                    `).join("")}
                  </select>
                </label>



                <label class="oe-field">
                  <span>Country</span>

                  <select id="oe-filter-country">
                    <option value="">Destinations</option>
                    ${[
                        "India",
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "Germany",
                        "Ireland",
                        "France",
                        "Netherlands",
                        "Global"
                    ].map(country => `
                      <option>${country}</option>
                    `).join("")}
                  </select>
                </label>


                </div>

                <div class="oe-active-filters" id="oe-active-filters"></div>

                <div
                  class="oe-programme-grid"
                  id="oe-programme-results"
                  aria-live="polite"
                ></div>

                <button
                    type="button"
                    id="oe-load-more"
                    class="oe-button oe-outline"
                    hidden
                >
                    Show More
                </button>

                <div class="oe-empty" id="oe-empty" hidden>
                  <span>⌕</span>
                  <h3>No matching options yet</h3>
                  <p>Try a broader search or clear some filters.</p>

                  <button
                    type="button"
                    class="oe-button oe-primary"
                    id="oe-empty-reset"
                  >
                    Reset filters
                  </button>
                </div>

                <button
                  class="oe-button oe-outline oe-load-more"
                  id="oe-load-more"
                  type="button"
                  hidden
                >
                  Load more options
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="oe-section oe-universities" id="oe-universities">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">INSTITUTION DISCOVERY</p>
                <h2>Explore universities and providers</h2>
                <p>
                  Official institution links, checked 9 October 2026.
                  Programme availability and recognition are programme-specific;
                  verify directly.
                </p>
              </div>
            </div>

            <div class="oe-institution-filters">
              <label class="oe-field">
                <span>Country</span>

                <select id="oe-inst-country">
                  <option value="">All countries</option>
                  ${[...new Set(onlineEducationInstitutions.map(x => x.country))]
                    .map(country => `<option>${country}</option>`).join("")}
                </select>
              </label>

              <label class="oe-field">
                <span>Education level</span>

                <select id="oe-inst-level">
                  <option value="">All levels</option>
                  ${[...new Set(onlineEducationInstitutions.flatMap(x => x.levels))]
                    .map(level => `<option>${level}</option>`).join("")}
                </select>
              </label>

              <label class="oe-field">
                <span>Subject</span>

                <select id="oe-inst-subject">
                  <option value="">All subjects</option>
                  ${[...new Set(onlineEducationInstitutions.flatMap(x => x.subjects))]
                    .map(subject => `<option>${subject}</option>`).join("")}
                </select>
              </label>

              <label class="oe-field">
                <span>Study mode</span>

                <select id="oe-inst-mode">
                  <option value="">All modes</option>
                  ${[...new Set(onlineEducationInstitutions.flatMap(x => x.modes))]
                    .map(mode => `<option>${mode}</option>`).join("")}
                </select>
              </label>

              <button
                type="button"
                class="oe-button oe-outline"
                id="oe-inst-clear"
              >
                Clear institution filters
              </button>
            </div>

        <div class="oe-provider-grid oe-institution-programme-grid" id="oe-institution-results">
          ${onlineEducationInstitutions.map(institution => `
            <article
              class="oe-programme-card oe-course-card oe-institution-card"
              data-country="${institution.country}"
              data-levels="${institution.levels.join("|")}"
              data-subjects="${institution.subjects.join("|")}"
              data-modes="${institution.modes.join("|")}"
            >
              <div class="oe-course-card-main">

                <div class="oe-course-card-media">
                  <div class="oe-course-card-monogram oe-institution-logo">
                    ${institution.name
                      .split(/\s+/)
                      .filter(word => /^[A-Z]/.test(word))
                      .slice(0, 2)
                      .map(word => word.charAt(0))
                      .join("")}
                  </div>
                </div>

                <div class="oe-course-card-content">

                  <p class="oe-course-card-location">
                    ${institution.type} · ${institution.country}
                  </p>

                  <h3 class="oe-course-card-title">
                    ${institution.name}
                  </h3>

                  <p class="oe-course-card-provider">
                    ${institution.city}
                  </p>



                  <div class="oe-course-card-tags">
                    ${institution.levels.slice(0, 3).map(level => `
                      <span>${level}</span>
                    `).join("")}
                  </div>

                </div>
              </div>
              <div class="oe-institution-actions oe-institution-actions-enhanced">
                <button
                  type="button"
                  class="oe-button oe-outline"
                  data-view-institution-details="${institution.id}"
                >
                  View Details
                </button>

                <button
                  type="button"
                  class="oe-button oe-primary"
                  data-enquire-institution="${institution.id}"
                >
                  Enquire Now
                </button>


              </div>


            </article>
          `).join("")}
        </div>

            <div class="oe-institution-more" id="oe-institution-more" hidden>
              <button
                type="button"
                class="oe-button oe-outline"
                id="oe-institution-toggle"
              >
                Show more
              </button>
            </div>

            <p class="oe-institution-empty" id="oe-institution-empty" hidden>
              No institutions match these filters. Clear one or more selections.
            </p>

            <div
              id="oe-institution-compare-bar"
              class="oe-institution-compare-bar"
              hidden
            >
              <span id="oe-institution-compare-count">0 selected</span>

              <button
                type="button"
                class="oe-button oe-outline"
                id="oe-inst-compare-clear"
              >
                Clear
              </button>

              <button
                type="button"
                class="oe-button oe-primary"
                id="oe-inst-compare-show"
                disabled
              >
                Compare institutions
              </button>
            </div>
          </div>
        </section>

        <section class="oe-section oe-comparison-info" id="oe-compare">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">MAKE AN INFORMED CHOICE</p>
                <h2>Online, hybrid or on-campus?</h2>
                <p>
                  The experience depends on the institution and specific
                  programme. Confirm details before applying.
                </p>
              </div>
            </div>

            <div class="oe-table-wrap">
              <table class="oe-study-table">
                <thead>
                  <tr>
                    <th scope="col">Consideration</th>
                    <th scope="col">Online / distance</th>
                    <th scope="col">Hybrid</th>
                    <th scope="col">On-campus</th>
                  </tr>
                </thead>

                <tbody>
                  ${[
                    ["Flexibility", "May offer flexible schedules; check format", "Mix of online and in-person elements", "Often follows a campus timetable"],
                    ["Campus attendance", "May not be required; verify programme", "Some attendance may be required", "Usually includes campus attendance"],
                    ["Tuition & additional costs", "Compare total and recurring fees", "Check tuition and travel needs", "Check tuition, housing and other costs"],
                    ["Instructor interaction", "Format varies by provider", "Online and in-person formats vary", "Often includes in-person sessions"],
                    ["Duration & assessment", "Check the programme details", "Check delivery and assessment schedule", "Check course structure and assessment"],
                    ["Networking", "Online community varies", "Can include online and campus contact", "Campus-based opportunities vary"],
                    ["Recognition & eligibility", "Verify with institution and regulator", "Verify specific award and requirements", "Verify specific award and requirements"]
                  ].map(row => `
                    <tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="oe-section oe-pathways" id="oe-pathways">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">A PLACE TO BEGIN</p>
                <h2>Explore learning pathways</h2>
                <p>
                  Curated topic suggestions for discovery, not a promise of a
                  qualification or employment outcome.
                </p>
              </div>
            </div>

            <div class="oe-path-grid">
              ${[
                ["Beginner to software development", "Computer Science"],
                ["Foundations to data analysis", "Data Science"],
                ["AI & machine learning fundamentals", "Artificial Intelligence"],
                ["Digital marketing career discovery", "Marketing"],
                ["Business & management", "Business & Management"],
                ["Cybersecurity foundations", "Cybersecurity"],
                ["Academic progression to a degree", "Bachelor's"]
              ].map(([title, filter], index) => `
                <a
                  href="#oe-programmes"
                  ${filter === "Bachelor's"
                    ? `data-level="${filter}"`
                    : `data-subject="${filter}"`}
                >
                  <span>0${index + 1}</span>
                  <b>${title}</b>
                  <i>Explore →</i>
                </a>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="oe-section oe-afford" id="oe-affordability">
          <div class="oe-container oe-afford-card">
            <div>
              <p class="oe-eyebrow">PLAN WITH CLARITY</p>
              <h2>Understand affordability</h2>
              <p>
                Compare published tuition in its original currency and fee
                period. Scholarships and financial aid depend on official
                eligibility rules and availability.
              </p>
            </div>

            <div class="oe-afford-links">
              <a href="#oe-programmes">
                Compare programme costs <span>→</span>
              </a>

              <a
                href="https://www.khanacademy.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore free learning resources <span>↗</span>
              </a>

              <a
                href="https://www.coursera.org/financial-aid"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check provider financial-aid information <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section class="oe-section oe-how" id="oe-resources">
          <div class="oe-container">
            <div class="oe-section-head">
              <div>
                <p class="oe-eyebrow">THE EDUCONNECT APPROACH</p>
                <h2>How discovery works</h2>
                <p>
                  Use EduConnect to explore options, then confirm programme
                  details with the source.
                </p>
              </div>
            </div>

            <div class="oe-steps">
              ${[
                ["01", "Discover", "Explore programmes and learning resources."],
                ["02", "Filter", "Narrow choices by goals, level, budget and study mode."],
                ["03", "Compare", "Review the details that matter to you."],
                ["04", "Verify", "Visit the official provider to confirm details or apply."]
              ].map(([number, title, description]) => `
                <article>
                  <span>${number}</span>
                  <h3>${title}</h3>
                  <p>${description}</p>
                </article>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="oe-section oe-faq" id="oe-faq">
          <div class="oe-container oe-faq-layout">
            <div>
              <p class="oe-eyebrow">GOOD QUESTIONS, CLEAR ANSWERS</p>
              <h2>Online education FAQ</h2>
              <p>
                Always verify specific programme details with the institution
                or provider.
              </p>
            </div>

            <div class="oe-faq-list">
              ${[
                ["What is online education?", "Learning delivered partly or fully through digital tools. The teaching, assessment and support format depends on the provider."],
                ["What is the difference between an online course and an online degree?", "A course may teach a focused subject and may offer a certificate. A degree is a formal academic qualification awarded by an institution after completing its requirements."],
                ["Can I earn a Bachelor’s or Master’s degree online?", "Some institutions offer online degree programmes. Check the institution’s official course page for format, eligibility, fees and award details."],
                ["Are online degrees recognized?", "Recognition depends on the awarding institution, programme and jurisdiction. Check with the relevant official regulator or recognition authority."],
                ["How can I compare tuition fees?", "Compare amounts in the original currency and note whether each fee is total, annual or per term. Include additional costs where published."],
                ["Can I study for free online?", "Some platforms publish free learning resources or course access. Certificates, assessments or other services may have separate costs; confirm with the provider."],
                ["What is distance learning?", "Study delivered with learners and instructors separated by location. It can include online, print or other learning materials."],
                ["What is the difference between online, hybrid and on-campus study?", "Online learning is primarily remote, hybrid combines remote and in-person elements, and on-campus study typically involves attendance at a physical campus. Exact formats vary."],
                ["How do I compare universities?", "Review official programme details, entry requirements, delivery, tuition and recognition. Consult relevant official regulators for recognition checks."],
                ["How can I check whether a programme is legitimate?", "Confirm the awarding institution and programme through official institution pages and the relevant education regulator or recognition database."]
              ].map(([question, answer]) => `
                <details>
                  <summary>
                    ${question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>${answer}</p>
                </details>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="oe-final-cta" id="oe-final">
          <div class="oe-container">
            <p class="oe-eyebrow">YOUR NEXT CHAPTER</p>
            <h2>Your Next Learning Opportunity Starts Here.</h2>
            <p>
              Discover courses, compare programmes and find a learning path
              that fits your ambitions.
            </p>

            <a class="oe-button oe-light-button" href="#oe-programmes">
              Explore Programmes <span>→</span>
            </a>
          </div>
        </section>
        ${renderOnlineEducationLeadForm()}

      </main>
    `;
}