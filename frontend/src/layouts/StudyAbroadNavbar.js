import { getInstitutions } from "../services/studyAbroadService.js";
import localInstitutions from "../data/studyAbroadInstitutions.json";

/* =========================================================
   EDUCONNECT — STUDY ABROAD NAVBAR
   Complete standalone navbar
   Includes:
   - Mega menu clicks
   - Country switching
   - Destination switching
   - Exam switching
   - Resource switching
   - More switching
   - Mobile menu
   - Outside click
   - ESC close
========================================================= */


/* =========================================================
   UNIVERSITY CARD DATA
========================================================= */

const UPGRAD_CS_CATALOG_SOURCE =
    "https://www.upgrad.com/study-abroad/abroad/courses/computer-science/";
const UPGRAD_STUDY_ABROAD_SOURCE =
    "https://www.upgrad.com/study-abroad/";

// Local discovery content for the country switcher. These are topic prompts
// and illustrative university names, not a live catalogue or ranking.
const DESTINATION_MENU_DATA = {
    USA: { label: "United States", streams: ["Computer Science", "Data Science", "Artificial Intelligence", "Business & Management", "Healthcare", "Engineering", "Cybersecurity", "Finance"], specializations: ["Computer Science", "Business Analytics", "Public Health", "Cybersecurity", "Engineering Management", "Finance", "Psychology", "Information Technology"], universities: ["Yeshiva University", "Washington State University", "Troy University", "DePaul University", "Northeastern University", "New York University" ] },
    Australia: { label: "Australia", streams: ["Computer Science", "Business", "Engineering", "Data Science", "Information Technology", "Healthcare", "Education", "Management"], specializations: ["Data Science", "Business Analytics", "Public Health", "Information Technology", "Project Management", "Engineering", "Education", "Finance"], universities: ["Macquarie University", "University of Sydney", "UNSW Sydney", "Monash University", "University of Melbourne"] },
    Canada: { label: "Canada", streams: ["Computer Science", "Business", "Engineering", "Data Science", "Healthcare", "Management", "Education", "Technology"], specializations: ["Computer Science", "Data Science", "Business Analytics", "Public Health", "Engineering", "Management", "Psychology", "Finance"], universities: ["Algoma University", "University of Waterloo", "University of Toronto", "University of British Columbia", "McGill University"] },
    UK: { label: "United Kingdom", streams: ["Computer Science", "Business", "Data Science", "Engineering", "Finance", "Healthcare", "Law", "Management"], specializations: ["Computer Science", "Data Science", "Finance", "Public Health", "Business Analytics", "Law", "Psychology", "Engineering"], universities: ["University of Sussex", "University of Manchester", "King's College London", "London School of Economics", "University College London"] },
    Germany: { label: "Germany", streams: ["Computer Science", "Engineering", "Data Science", "Business", "Artificial Intelligence", "Technology", "Management", "Finance"], specializations: ["Computer Science", "Software Engineering", "Artificial Intelligence", "Data Science", "Engineering", "Business", "Technology", "Management"], universities: ["Technical University of Munich", "RWTH Aachen University", "Free University of Berlin", "TU Berlin"] },
    Ireland: { label: "Ireland", streams: ["Computer Science", "Technology", "Business", "Data Science", "Engineering", "Finance", "Healthcare", "Management"], specializations: ["Computing", "Data Science", "Finance", "Business Analytics", "Public Health", "Engineering", "Cybersecurity", "Management"], universities: ["University College Cork", "Trinity College Dublin", "University College Dublin", "Dublin City University", "University of Galway"] },
    France: { label: "France", streams: ["Business", "Management", "Engineering", "Computer Science", "Finance", "Technology", "Arts & Humanities", "Data Science"], specializations: ["Business Analytics", "Finance", "Computer Science", "Engineering", "Management", "Luxury Management", "Data Science", "International Business"], universities: ["Paris School of Business", "PSL University", "HEC Paris", "Institut Polytechnique de Paris", "Sorbonne University"] },
    Finland: { label: "Finland", streams: ["Computer Science", "Technology", "Engineering", "Data Science", "Business", "Artificial Intelligence", "Education", "Design"], specializations: ["Computer Science", "Artificial Intelligence", "Data Science", "Software Engineering", "Education", "Business", "Technology", "Design"], universities: ["Haaga-Helia University of Applied Sciences", "Seinäjoki University of Applied Sciences", "Aalto University", "University of Helsinki", "University of Turku", "Tampere University"] },
    UAE: { label: "United Arab Emirates", streams: ["Business", "Computer Science", "Engineering", "Management", "Technology", "Finance", "Healthcare", "Artificial Intelligence"], specializations: ["Business Administration", "Computer Science", "Finance", "Artificial Intelligence", "Engineering", "Management", "Cybersecurity", "Data Science"], universities: ["Khalifa University", "American University in Dubai", "NYU Abu Dhabi", "University of Sharjah"] },
    Hungary: { label: "Hungary", streams: ["Computer Science", "Engineering", "Business", "Technology", "Data Science", "Management", "Healthcare", "Finance"], specializations: ["Computer Science", "Engineering", "Data Science", "Business", "Technology", "Management", "Finance", "Healthcare"], universities: ["Budapest University of Technology", "Eötvös Loránd University", "University of Szeged", "University of Debrecen"] }
};

const DESTINATION_GUIDES = [
    ["Study costs & budgeting", "#study-abroad-cost"],
    ["Admission requirements", "#admission-requirements"],
    ["Scholarship guidance", "#abroad-scholarships"],
    ["Application planning", "#study-abroad-application"],
    ["Frequently asked questions", "#study-abroad-faq"]
];

function destinationCountryPanel(country) {
    const data = DESTINATION_MENU_DATA[country];
    if (!data) return "";
    const internalLink = (label, category = "Computer Science") => `
        <a href="#study-abroad-course-explorer" data-explore-subject="${category}" data-destination-country="${country}">${label}</a>`;
    return `
        <section class="edu-study-panel edu-destination-panel ${country === "USA" ? "active" : ""}" data-mega-content="${country}" aria-label="Study destinations in ${data.label}">
            <header class="edu-destination-heading"><div><span>EXPLORE DESTINATIONS</span><h3>${data.label}</h3></div><a href="#study-abroad-country-comparison">Compare destinations →</a></header>
            <div class="edu-study-column"><h4>Popular streams</h4>${data.streams.map((name) => internalLink(name, name)).join("")}</div>
            <div class="edu-study-column"><h4>Popular specialisations</h4>${data.specializations.map((name) => internalLink(name, name)).join("")}</div>
            <div class="edu-study-column"><h4>Universities to explore</h4>${data.universities.map((name) => `<a href="#study-abroad-country-comparison">${name}</a>`).join("")}</div>
            <div class="edu-study-column"><h4>Study guides</h4>${DESTINATION_GUIDES.map(([name, href]) => `<a href="${href}">${name}</a>`).join("")}</div>
            <p class="edu-destination-note">Topic links open EduConnect discovery. University and programme details can change; confirm them with the institution. This menu does not rank universities.</p>
        </section>`;
}

function countryUniversityCards(country) {

    const universities = {

        USA: [
            {
                logo: "YU",
                tag: "COMPUTING",
                tagClass: "purple",
                title: "MS Computer Science",
                university: "Yeshiva University",
                meta1: "",
                meta2: "USA",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "WSU",
                tag: "COMPUTING",
                tagClass: "blue",
                title: "BS Engineering · Computer Science option",
                university: "Washington State University",
                meta1: "",
                meta2: "USA",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "TROY",
                tag: "COMPUTING",
                tagClass: "purple",
                title: "Master in Computer Science",
                university: "Troy University",
                meta1: "",
                meta2: "USA",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "DEP",
                tag: "BUSINESS",
                tagClass: "blue",
                title: "Master of Business Administration",
                university: "DePaul University",
                meta1: "",
                meta2: "USA",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "NU",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MBA",
                university: "Northeastern University",
                meta1: "Boston",
                meta2: "USA"
            },
            {
                logo: "NU",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MPS in Applied AI",
                university: "Northeastern University",
                meta1: "Boston",
                meta2: "USA"
            },
            {
                logo: "NYU",
                tag: "UNDERGRADUATE",
                tagClass: "purple",
                title: "BS Information Systems & Technology",
                university: "New York University",
                meta1: "New York",
                meta2: "USA"
            },
            {
                logo: "NYU",
                tag: "UNDERGRADUATE",
                tagClass: "blue",
                title: "BS Leadership and Management",
                university: "New York University",
                meta1: "New York",
                meta2: "USA"
            }
        ],

        Germany: [
            {
                logo: "UAM",
                tag: "COMPUTING",
                tagClass: "purple",
                title: "MSc Computer Science · 90 ECTS",
                university: "University of Applied Management",
                meta1: "",
                meta2: "Germany",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "CODE",
                tag: "COMPUTING",
                tagClass: "blue",
                title: "BSc Software Engineering",
                university: "CODE University of Applied Sciences",
                meta1: "",
                meta2: "Germany",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "UAM",
                tag: "BUSINESS",
                tagClass: "purple",
                title: "MBA · 90 ECTS",
                university: "University of Applied Management",
                meta1: "",
                meta2: "Germany",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "TU",
                tag: "BUSINESS",
                tagClass: "blue",
                title: "MBA",
                university: "Touro University, Germany",
                meta1: "",
                meta2: "Germany",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "TUM",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Computer Science",
                university: "Technical University of Munich",
                meta1: "Munich",
                meta2: "Germany"
            },
            {
                logo: "RWTH",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MSc Data Science",
                university: "RWTH Aachen University",
                meta1: "Aachen",
                meta2: "Germany"
            },
            {
                logo: "FU",
                tag: "MASTER",
                tagClass: "purple",
                title: "MSc Artificial Intelligence",
                university: "Free University of Berlin",
                meta1: "Berlin",
                meta2: "Germany"
            },
            {
                logo: "TU",
                tag: "ENGINEERING",
                tagClass: "blue",
                title: "MSc Mechanical Engineering",
                university: "TU Berlin",
                meta1: "Berlin",
                meta2: "Germany"
            }
        ],

        France: [
            {
                logo: "PSB",
                tag: "BUSINESS",
                tagClass: "purple",
                title: "Master of Business Administration",
                university: "Paris School of Business",
                meta1: "",
                meta2: "France",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "PSL",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Management",
                university: "PSL University",
                meta1: "Paris",
                meta2: "France"
            },
            {
                logo: "HEC",
                tag: "BUSINESS",
                tagClass: "blue",
                title: "Master in Management",
                university: "HEC Paris",
                meta1: "Paris",
                meta2: "France"
            },
            {
                logo: "IP",
                tag: "ENGINEERING",
                tagClass: "purple",
                title: "MSc Engineering",
                university: "Institut Polytechnique de Paris",
                meta1: "Paris",
                meta2: "France"
            },
            {
                logo: "SOR",
                tag: "MASTER",
                tagClass: "blue",
                title: "MSc Computer Science",
                university: "Sorbonne University",
                meta1: "Paris",
                meta2: "France"
            }
        ],

        UK: [
            {
                logo: "SUS",
                tag: "COMPUTING",
                tagClass: "purple",
                title: "MSc Advanced Computer Science",
                university: "University of Sussex",
                meta1: "",
                meta2: "UK",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "SUS",
                tag: "BUSINESS",
                tagClass: "blue",
                title: "Master of Business Administration",
                university: "University of Sussex",
                meta1: "",
                meta2: "UK",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "MAN",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Computer Science",
                university: "University of Manchester",
                meta1: "Manchester",
                meta2: "UK"
            },
            {
                logo: "KCL",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MSc Data Science",
                university: "King's College London",
                meta1: "London",
                meta2: "UK"
            },
            {
                logo: "LSE",
                tag: "BUSINESS",
                tagClass: "purple",
                title: "MSc Business Analytics",
                university: "London School of Economics",
                meta1: "London",
                meta2: "UK"
            },
            {
                logo: "UCL",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "MSc Information Technology",
                university: "University College London",
                meta1: "London",
                meta2: "UK"
            }
        ],

        Australia: [
            {
                logo: "MAC",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "Bachelor of Information Technology",
                university: "Macquarie University",
                meta1: "",
                meta2: "Australia",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "USYD",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "Master of Computer Science",
                university: "University of Sydney",
                meta1: "Sydney",
                meta2: "Australia"
            },
            {
                logo: "UNSW",
                tag: "POPULAR",
                tagClass: "blue",
                title: "Master of IT",
                university: "UNSW Sydney",
                meta1: "Sydney",
                meta2: "Australia"
            },
            {
                logo: "MON",
                tag: "BUSINESS",
                tagClass: "purple",
                title: "Master of Business Analytics",
                university: "Monash University",
                meta1: "Melbourne",
                meta2: "Australia"
            },
            {
                logo: "MEL",
                tag: "ENGINEERING",
                tagClass: "blue",
                title: "Master of Engineering",
                university: "University of Melbourne",
                meta1: "Melbourne",
                meta2: "Australia"
            }
        ],

        Finland: [
            {
                logo: "HAAGA",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "BBA Business Information Technology",
                university: "Haaga-Helia University of Applied Sciences",
                meta1: "",
                meta2: "Finland",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "SEAMK",
                tag: "BUSINESS",
                tagClass: "purple",
                title: "MBA in International Business Management",
                university: "Seinäjoki University of Applied Sciences",
                meta1: "",
                meta2: "Finland",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "AAL",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Computer Science",
                university: "Aalto University",
                meta1: "Espoo",
                meta2: "Finland"
            },
            {
                logo: "HEL",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MSc Data Science",
                university: "University of Helsinki",
                meta1: "Helsinki",
                meta2: "Finland"
            },
            {
                logo: "TUR",
                tag: "MASTER",
                tagClass: "purple",
                title: "MSc Technology",
                university: "University of Turku",
                meta1: "Turku",
                meta2: "Finland"
            },
            {
                logo: "TAM",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "MSc Computing Sciences",
                university: "Tampere University",
                meta1: "Tampere",
                meta2: "Finland"
            }
        ],

        UAE: [
            {
                logo: "KHA",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "Computer Science",
                university: "Khalifa University",
                meta1: "Abu Dhabi",
                meta2: "UAE"
            },
            {
                logo: "AUD",
                tag: "POPULAR",
                tagClass: "blue",
                title: "Business Administration",
                university: "American University in Dubai",
                meta1: "Dubai",
                meta2: "UAE"
            },
            {
                logo: "NYU",
                tag: "MASTER",
                tagClass: "purple",
                title: "MSc Management",
                university: "NYU Abu Dhabi",
                meta1: "Abu Dhabi",
                meta2: "UAE"
            },
            {
                logo: "UOS",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "MSc Computer Science",
                university: "University of Sharjah",
                meta1: "Sharjah",
                meta2: "UAE"
            }
        ],

        Canada: [
            {
                logo: "ALG",
                tag: "COMPUTING",
                tagClass: "purple",
                title: "Bachelor of Computer Science",
                university: "Algoma University",
                meta1: "",
                meta2: "Canada",
                sourceUrl: UPGRAD_CS_CATALOG_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "WAT",
                tag: "BUSINESS",
                tagClass: "blue",
                title: "Master of Business, Entrepreneurship and Technology",
                university: "University of Waterloo",
                meta1: "",
                meta2: "Canada",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "UOT",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "Master of Computer Science",
                university: "University of Toronto",
                meta1: "Toronto",
                meta2: "Canada"
            },
            {
                logo: "UBC",
                tag: "POPULAR",
                tagClass: "blue",
                title: "Master of Data Science",
                university: "University of British Columbia",
                meta1: "Vancouver",
                meta2: "Canada"
            },
            {
                logo: "WAT",
                tag: "TECHNOLOGY",
                tagClass: "purple",
                title: "Master of Data Science",
                university: "University of Waterloo",
                meta1: "Waterloo",
                meta2: "Canada"
            },
            {
                logo: "MCG",
                tag: "MASTER",
                tagClass: "blue",
                title: "MSc Computer Science",
                university: "McGill University",
                meta1: "Montreal",
                meta2: "Canada"
            }
        ],

        Hungary: [
            {
                logo: "BME",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Computer Science",
                university: "Budapest University of Technology",
                meta1: "Budapest",
                meta2: "Hungary"
            },
            {
                logo: "ELTE",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MSc Data Science",
                university: "Eötvös Loránd University",
                meta1: "Budapest",
                meta2: "Hungary"
            },
            {
                logo: "SZEG",
                tag: "MASTER",
                tagClass: "purple",
                title: "MSc Engineering",
                university: "University of Szeged",
                meta1: "Szeged",
                meta2: "Hungary"
            },
            {
                logo: "DEB",
                tag: "TECHNOLOGY",
                tagClass: "blue",
                title: "MSc Computer Science",
                university: "University of Debrecen",
                meta1: "Debrecen",
                meta2: "Hungary"
            }
        ],

        Ireland: [
            {
                logo: "UCC",
                tag: "FINANCE",
                tagClass: "blue",
                title: "MSc Finance: Investment & Asset Management",
                university: "University College Cork",
                meta1: "",
                meta2: "Ireland",
                sourceUrl: UPGRAD_STUDY_ABROAD_SOURCE,
                lastVerifiedAt: "2026-10-11"
            },
            {
                logo: "TCD",
                tag: "TOP UNIVERSITY",
                tagClass: "purple",
                title: "MSc Computer Science",
                university: "Trinity College Dublin",
                meta1: "Dublin",
                meta2: "Ireland"
            },
            {
                logo: "UCD",
                tag: "POPULAR",
                tagClass: "blue",
                title: "MSc Data & Computational Science",
                university: "University College Dublin",
                meta1: "Dublin",
                meta2: "Ireland"
            },
            {
                logo: "DCU",
                tag: "TECHNOLOGY",
                tagClass: "purple",
                title: "MSc Computing",
                university: "Dublin City University",
                meta1: "Dublin",
                meta2: "Ireland"
            },
            {
                logo: "UG",
                tag: "MASTER",
                tagClass: "blue",
                title: "MSc Computer Science",
                university: "University of Galway",
                meta1: "Galway",
                meta2: "Ireland"
            }
        ]

    };


    const list = universities[country] || universities.USA;


    return list.map((item) => {

        return `
            <article class="edu-university-card" data-program-country="${item.meta2}">

                <div class="edu-university-card-top">

                    <div class="edu-university-logo">
                        ${item.logo}
                    </div>

                    <span class="edu-university-tag ${item.sourceUrl ? "blue" : "purple"}">${item.sourceUrl ? "PUBLIC LISTING" : "ILLUSTRATIVE"}</span>

                </div>

                <h4>
                    ${item.title}
                </h4>

                <p>
                    ${item.university}
                </p>

                <div class="edu-university-meta">

                    <span>
                        ${item.meta1}
                    </span>

                    <span>
                        ${item.meta2}
                    </span>

                </div>

                <a href="#study-abroad-country-comparison">
                    View details
                    <span>→</span>
                </a>

            </article>
        `;

    }).join("");

}


/* Filter the local discovery sample by subject and programme level. */
function applyProgramFilters(panel, subject = "", level = "") {
    if (!panel) return;
    const subjects = {
        "Computer Science": /computer science|computing|software|informatics|information technology|cyber\s?security/i,
        "Business": /business|management|mba|entrepreneur|finance|accounting/i,
        "Business & Management": /business|management|mba|entrepreneur|finance|accounting/i,
        "Engineering": /engineering|engineer/i, "Data Science": /data science|analytics/i,
        "MBA": /\bmba\b|master of business administration/i,
        "Information Technology": /information technology|\bIT\b|computing/i,
        "AI & Machine Learning": /artificial intelligence|\bAI\b|machine learning/i,
        "Technology": /technology|computing|computer science|information technology/i,
        "Management": /management|business administration/i, "Finance": /finance|accounting/i,
        "Healthcare": /health|medical|nursing|public health/i, "Education": /education|teaching/i,
        "Arts & Humanities": /arts|humanities|history|literature/i, "Law": /\blaw\b|legal/i,
        "Cybersecurity": /cyber\s?security|information security/i, "Marketing": /marketing/i,
        "Psychology": /psychology/i, "Design": /design|media/i, "Economics": /economics/i,
        "Public Health": /public health|health/i, "Digital Marketing": /digital marketing|marketing/i,
        "Software Engineering": /software|engineering|computing/i, "Business Analytics": /business|analytics/i,
        "International Business": /international business|business|management/i,
        "Nursing": /nursing/i, "IT": /information technology|\bIT\b/i,
        "AI": /artificial intelligence|\bAI\b|machine learning/i
    };
    const levels = {
        "Undergraduate": /bachelor|undergraduate|\bBSc\b|\bBA\b|\bBBA\b|\bBS\b/i,
        "Postgraduate": /master|postgraduate|\bMSc\b|\bMS\b|\bMPS\b|MBA|doctorate|ph\.?d/i,
        "MBA": /\bmba\b|master of business administration/i,
        "PhD": /ph\.?d|doctorate|doctoral/i
    };
    const subjectPattern = subjects[subject] || (subject ? new RegExp(subject.split(/\s*&\s*/).join("|"), "i") : null);
    const levelPattern = levels[level];
    const cards = Array.from(panel.querySelectorAll(".edu-university-card"));
    let count = 0;
    cards.forEach((card) => {
        const text = card.textContent || "";
        card.hidden = Boolean((subjectPattern && !subjectPattern.test(text)) || (levelPattern && !levelPattern.test(text)));
        if (!card.hidden) count += 1;
    });
    const status = panel.querySelector("[data-program-status]");
    if (status) {
        const active = [subject, level].filter(Boolean);
        const countryName = panel.querySelector(".edu-country-heading h3")?.childNodes[0]?.textContent?.trim() || "this country";
        status.textContent = active.length
            ? count + " matching sample listings for " + active.join(" · ") + " in " + countryName + "."
            : count + " sample listings for " + countryName + "; this local view is not a complete catalogue.";
    }
    const empty = panel.querySelector("[data-program-empty]");
    if (empty) empty.hidden = count !== 0;
    panel.querySelectorAll("[data-country-subject]").forEach((button) => {
        const selected = button.dataset.countrySubject === (subject || "All programmes");
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

function openSelectedCountryResults(navbar, { subject = "", level = "", country = "" } = {}) {
    const mega = navbar?.querySelector(".edu-country-mega");
    const activeDestination = navbar?.querySelector('[data-mega-menu="destinations"] .edu-study-side-item.active')?.dataset.megaPanel;
    const selectedCountry = country || (DESTINATION_MENU_DATA[activeDestination] ? activeDestination : "USA");
    const selectedPanel = mega?.querySelector(`[data-country-panel="${selectedCountry}"]`)
        || mega?.querySelector(".edu-country-panel.active")
        || mega?.querySelector('[data-country-panel="USA"]');
    if (!mega || !selectedPanel) return;
    mega.querySelectorAll(".edu-country-item").forEach((item) => item.classList.toggle("active", item.dataset.country === selectedCountry));
    mega.querySelectorAll(".edu-country-panel").forEach((panel) => panel.classList.toggle("active", panel === selectedPanel));
    // The Explore Countries panel shows institution listings, not sample programme cards.
    const menu = navbar.querySelector('[data-mega-menu="countries"]');
    const trigger = navbar.querySelector('[data-mega-trigger="countries"]');
    navbar.querySelectorAll(".edu-study-mega.is-open").forEach((item) => item.classList.remove("is-open"));
    navbar.querySelectorAll(".edu-study-nav-item.is-open").forEach((item) => item.classList.remove("is-open"));
    navbar.querySelectorAll(".edu-study-nav-button.is-open").forEach((item) => {
        item.classList.remove("is-open");
        item.setAttribute("aria-expanded", "false");
    });
    menu?.classList.add("is-open");
    trigger?.classList.add("is-open");
    trigger?.setAttribute("aria-expanded", "true");
    trigger?.closest(".edu-study-nav-item")?.classList.add("is-open");
    navbar.querySelector(".edu-study-menu")?.classList.add("is-open");
}
/* =========================================================
   COUNTRY PANEL
========================================================= */

function countryPanel(country) {
    const label = DESTINATION_MENU_DATA[country]?.label || country;
    return `
        <div class="edu-country-panel ${country === "USA" ? "active" : ""}" data-country-panel="${country}">
            <div class="edu-country-heading">
                <h3>${label}<span>Institution listings</span></h3>
                <span class="edu-country-list-count" data-country-list-count="${country}">Loading…</span>
            </div>
            <div class="edu-university-grid" data-country-institutions="${country}">
                <p class="edu-country-list-loading">Loading listed institutions…</p>
            </div>
        </div>
    `;
}


function escapeCountryMenuText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    })[character]);
}

const COUNTRY_MENU_LABELS = {
    USA: { country: "United States", aliases: ["united states", "usa", "us"] },
    Germany: { country: "Germany", aliases: ["germany", "de"] },
    France: { country: "France", aliases: ["france", "fr"] },
    UK: { country: "United Kingdom", aliases: ["united kingdom", "uk", "gb"] },
    Australia: { country: "Australia", aliases: ["australia", "au"] },
    Finland: { country: "Finland", aliases: ["finland", "fi"] },
    UAE: { country: "United Arab Emirates", aliases: ["united arab emirates", "uae", "ae"] },
    Canada: { country: "Canada", aliases: ["canada", "ca"] },
    Hungary: { country: "Hungary", aliases: ["hungary", "hu"] },
    Ireland: { country: "Ireland", aliases: ["ireland", "ie"] },
    Netherlands: { country: "Netherlands", aliases: ["netherlands", "nl"] },
    Italy: { country: "Italy", aliases: ["italy", "it"] }
};

async function loadCountryMenuInstitutions() {
    const nav = document.querySelector("#edu-study-nav");
    if (!nav || nav.dataset.countryListingsLoaded === "true" || nav.dataset.countryListingsLoading === "true") return;
    nav.dataset.countryListingsLoading = "true";
    nav.dataset.countryListingsLoaded = "true";
    try {
        const response = await getInstitutions();
        const institutions = Array.isArray(response) && response.length ? response.filter((item) =>
            item.active === true && item.studyAbroadEnabled === true
        ) : localInstitutions;
        renderCountryMenuInstitutions(nav, institutions);
    } catch (error) {
        renderCountryMenuInstitutions(nav, localInstitutions);
        nav.querySelectorAll("[data-country-list-count]").forEach((count) => {
            count.dataset.source = "local";
        });
        console.info("Showing local Explore Countries institution data because the backend is unavailable.", error);
    } finally {
        nav.dataset.countryListingsLoading = "false";
    }
}

function renderCountryMenuInstitutions(nav, institutions) {
        Object.entries(COUNTRY_MENU_LABELS).forEach(([key, destination]) => {
            const matches = institutions.filter((item) => destination.aliases.includes(
                String(item.country || item.countryCode || "").trim().toLowerCase()
            ));
            const grid = nav.querySelector(`[data-country-institutions="${key}"]`);
            const count = nav.querySelector(`[data-country-list-count="${key}"]`);
            if (count) count.textContent = `${matches.length} listed`;
            if (!grid) return;
            grid.innerHTML = matches.length ? matches.map((item) => {
                const name = escapeCountryMenuText(item.name || "Institution");
                const type = String(item.type || "").toUpperCase();
                const typeLabel = type === "UNIVERSITY" ? "University" : type === "COLLEGE" ? "College" : "Institution";
                const initials = name.split(/\s+/).slice(0, 2).map((word) => word[0] || "").join("").toUpperCase();
                return `<article class="edu-university-card"><div class="edu-university-card-top"><span class="edu-university-logo">${initials}</span><span class="edu-university-tag blue">${typeLabel}</span></div><h4>${name}</h4><p>${escapeCountryMenuText(destination.country)}</p><div class="edu-university-meta"><span>Study Abroad listing</span></div><a href="#study-abroad-institutions">View institution list <span>→</span></a></article>`;
            }).join("") : `<p class="edu-country-list-empty">No institutions are listed for ${escapeCountryMenuText(destination.country)} yet.</p>`;
        });
}

export function initStudyAbroadCountryMenu() {
    loadCountryMenuInstitutions();
}

/* =========================================================
   NAVBAR
========================================================= */

export default function StudyAbroadNavbar() {

    /*
       IMPORTANT:

       We use EVENT DELEGATION here.

       This means we don't need to modify main.js.

       The router creates this navbar through innerHTML,
       and these listeners work with the generated elements.
    */

    if (!window.__eduStudyNavbarController) {

        window.__eduStudyNavbarController = true;


        document.addEventListener(
            "click",
            (event) => {

                const retryButton = event.target.closest("[data-country-list-retry]");
                if (retryButton) {
                    const nav = retryButton.closest("#edu-study-nav");
                    if (!nav) return;
                    nav.dataset.countryListingsLoaded = "false";
                    nav.querySelectorAll("[data-country-list-count]").forEach((count) => count.textContent = "Loading…");
                    nav.querySelectorAll("[data-country-institutions]").forEach((grid) => grid.innerHTML = '<p class="edu-country-list-loading">Loading listed institutions…</p>');
                    loadCountryMenuInstitutions();
                    return;
                }

                const courseFilterLink = event.target.closest("[data-explore-subject], [data-explore-level]");
                if (courseFilterLink) {
                    event.preventDefault(); event.stopPropagation();
                    const nav = document.querySelector("#edu-study-nav");
                    if (!nav) return;
                    openSelectedCountryResults(nav, { subject: courseFilterLink.dataset.exploreSubject || "", level: courseFilterLink.dataset.exploreLevel || "", country: courseFilterLink.dataset.destinationCountry || "" });
                    return;
                }

                const destinationsLink =
                    event.target.closest(
                        "[data-open-destinations]"
                    );


                if (destinationsLink) {

                    event.preventDefault();
                    event.stopPropagation();

                    const navbar =
                        document.querySelector(
                            "#edu-study-nav"
                        );

                    const menu =
                        navbar?.querySelector(
                            '[data-mega-menu="destinations"]'
                        );

                    const trigger =
                        navbar?.querySelector(
                            '[data-mega-trigger="destinations"]'
                        );

                    if (!navbar || !menu || !trigger) {
                        return;
                    }

                    navbar.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    navbar
                        .querySelectorAll(
                            ".edu-study-mega.is-open"
                        )
                        .forEach((openMenu) => {
                            openMenu.classList.remove("is-open");
                        });

                    navbar
                        .querySelectorAll(
                            ".edu-study-nav-item.is-open"
                        )
                        .forEach((openItem) => {
                            openItem.classList.remove("is-open");
                        });

                    navbar
                        .querySelectorAll(
                            ".edu-study-nav-button.is-open"
                        )
                        .forEach((openButton) => {
                            openButton.classList.remove("is-open");
                            openButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        });

                    menu.classList.add("is-open");
                    trigger.classList.add("is-open");
                    trigger.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    trigger
                        .closest(".edu-study-nav-item")
                        ?.classList.add("is-open");

                    navbar
                        .querySelector(".edu-study-menu")
                        ?.classList.add("is-open");

                    menu
                        .querySelectorAll("[data-mega-content]")
                        .forEach((panel) => {
                            panel.classList.toggle(
                                "active",
                                panel.dataset.megaContent === "USA"
                            );
                        });

                    menu
                        .querySelectorAll("[data-mega-panel]")
                        .forEach((panelButton) => {
                            panelButton.classList.toggle(
                                "active",
                                panelButton.dataset.megaPanel === "USA"
                            );
                        });

                    return;
                }

                const navbar =
                    event.target.closest(
                        "#edu-study-nav"
                    );


                /* =========================================
                   OUTSIDE CLICK
                ========================================== */

                if (!navbar) {

                    document
                        .querySelectorAll(
                            ".edu-study-mega.is-open"
                        )
                        .forEach((menu) => {

                            menu.classList.remove(
                                "is-open"
                            );

                        });


                    document
                        .querySelectorAll(
                            ".edu-study-nav-item.is-open"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "is-open"
                            );

                        });


                    return;
                }


                /* =========================================
                   MAIN NAV BUTTON
                ========================================== */

                const navButton =
                    event.target.closest(
                        "[data-mega-trigger]"
                    );


                if (navButton) {

                    event.preventDefault();
                    event.stopPropagation();


                    const menuName =
                        navButton.dataset.megaTrigger;


                    const megaMenu =
                        navbar.querySelector(
                            `[data-mega-menu="${menuName}"]`
                        );


                    if (!megaMenu) {
                        return;
                    }


                    const wasOpen =
                        megaMenu.classList.contains(
                            "is-open"
                        );


                    /* Close every menu */

                    navbar
                        .querySelectorAll(
                            ".edu-study-mega.is-open"
                        )
                        .forEach((menu) => {

                            menu.classList.remove(
                                "is-open"
                            );

                        });


                    navbar
                        .querySelectorAll(
                            ".edu-study-nav-item.is-open"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "is-open"
                            );

                        });


                    /* Open selected */

                    if (!wasOpen) {

                        megaMenu.classList.add(
                            "is-open"
                        );

                        navButton.classList.add(
                            "is-open"
                        );

                        const navItem =
                            navButton.closest(
                                ".edu-study-nav-item"
                            );

                        if (navItem) {

                            navItem.classList.add(
                                "is-open"
                            );

                        }

                    }

                    return;
                }


                /* =========================================
                   COUNTRY SWITCHING
                ========================================== */

                const countryButton =
                    event.target.closest(
                        ".edu-country-item"
                    );


                if (countryButton) {

                    event.preventDefault();
                    event.stopPropagation();


                    const country =
                        countryButton.dataset.country;


                    const mega =
                        countryButton.closest(
                            ".edu-country-mega"
                        );


                    if (!mega) {
                        return;
                    }


                    /* Remove active countries */

                    mega
                        .querySelectorAll(
                            ".edu-country-item.active"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    countryButton.classList.add(
                        "active"
                    );


                    /* Hide panels */

                    mega
                        .querySelectorAll(
                            ".edu-country-panel.active"
                        )
                        .forEach((panel) => {

                            panel.classList.remove(
                                "active"
                            );

                        });


                    /* Show selected panel */

                    const selectedPanel =
                        mega.querySelector(
                            `[data-country-panel="${country}"]`
                        );


                    if (selectedPanel) {
                        selectedPanel.classList.add("active");
                        applyProgramFilters(selectedPanel);
                    }

                    return;
                }


                /* =========================================
                   SUBJECT CHIP
                ========================================== */

                const subjectButton = event.target.closest("[data-country-subject]");

                if (subjectButton) {
                    event.preventDefault(); event.stopPropagation();
                    const panel = subjectButton.closest(".edu-country-panel");
                    if (!panel) return;
                    const selected = subjectButton.dataset.countrySubject;
                    applyProgramFilters(panel, selected === "All programmes" ? "" : selected);
                    return;
                }

                /* =========================================
                   SIDEBAR MENU
                ========================================== */

                const sideButton =
                    event.target.closest(
                        ".edu-study-side-item"
                    );


                if (sideButton) {

                    event.preventDefault();
                    event.stopPropagation();


                    const mega =
                        sideButton.closest(
                            ".edu-study-mega"
                        );


                    if (!mega) {
                        return;
                    }


                    mega
                        .querySelectorAll(
                            ".edu-study-side-item.active"
                        )
                        .forEach((item) => {

                            item.classList.remove(
                                "active"
                            );

                        });

                    mega.querySelectorAll(".edu-study-side-item[aria-pressed]").forEach((item) => {
                        item.setAttribute("aria-pressed", String(item === sideButton));
                    });


                    sideButton.classList.add(
                        "active"
                    );


                    const panelName =
                        sideButton.dataset.megaPanel;


                    if (!panelName) {
                        return;
                    }


                    mega
                        .querySelectorAll(
                            ".edu-study-panel.active"
                        )
                        .forEach((panel) => {

                            panel.classList.remove(
                                "active"
                            );

                        });


                    const panel =
                        mega.querySelector(
                            `[data-mega-content="${panelName}"]`
                        );


                    if (panel) {

                        panel.classList.add(
                            "active"
                        );

                    }

                    return;
                }


                /* =========================================
                   MOBILE BUTTON
                ========================================== */

                const mobileButton =
                    event.target.closest(
                        ".edu-study-mobile-button"
                    );


                if (mobileButton) {

                    event.preventDefault();
                    event.stopPropagation();


                    const menu =
                        navbar.querySelector(
                            ".edu-study-menu"
                        );


                    if (!menu) {
                        return;
                    }


                    menu.classList.toggle(
                        "is-open"
                    );


                    const expanded =
                        menu.classList.contains(
                            "is-open"
                        );


                    mobileButton.setAttribute(
                        "aria-expanded",
                        String(expanded)
                    );


                    return;
                }

            },
            true
        );


        /* ================================================
           ESC KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".edu-study-mega.is-open"
                    )
                    .forEach((menu) => {

                        menu.classList.remove(
                            "is-open"
                        );

                    });


                document
                    .querySelectorAll(
                        ".edu-study-nav-item.is-open"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "is-open"
                        );

                    });

            }
        );

    }


    /* =====================================================
       NAVBAR HTML
    ====================================================== */

    return `

        <section
            class="edu-study-nav"
            id="edu-study-nav"
        >

            <div class="edu-study-nav-inner">


                <!-- BRAND -->

                <a
                    href="/"
                    class="edu-study-brand"
                >

                    <span
                        class="edu-study-brand-mark"
                    >
                        EC
                    </span>

                    EDUCONNECT

                </a>


                <!-- MAIN MENU -->

                <nav
                    class="edu-study-menu"
                    aria-label="Study Abroad Navigation"
                >


                    <!-- ===================================
                         EXPLORE COUNTRIES
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="countries"
                            aria-expanded="false"
                        >

                            Explore Countries

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega edu-country-mega"
                            data-mega-menu="countries"
                        >

                            <div
                                class="edu-country-mega-inner"
                            >


                                <!-- COUNTRY SIDEBAR -->

                                <aside
                                    class="edu-country-sidebar"
                                >

                                    <div
                                        class="edu-country-sidebar-title"
                                    >
                                        Explore Countries
                                    </div>

<button
                                        type="button"
                                        class="edu-country-item active"
                                        data-country="USA"
                                    >
                                        <span>
                                            United States
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Germany"
                                    >
                                        <span>
                                            Germany
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="France"
                                    >
                                        <span>
                                            France
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="UK"
                                    >
                                        <span>
                                            UK
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Australia"
                                    >
                                        <span>
                                            Australia
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Finland"
                                    >
                                        <span>
                                            Finland
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="UAE"
                                    >
                                        <span>
                                            United Arab Emirates
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Canada"
                                    >
                                        <span>
                                            Canada
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Hungary"
                                    >
                                        <span>
                                            Hungary
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Netherlands"
                                    >
                                        <span>Netherlands</span>
                                        <span class="edu-country-arrow">→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Italy"
                                    >
                                        <span>Italy</span>
                                        <span class="edu-country-arrow">→</span>
                                    </button>

<button
                                        type="button"
                                        class="edu-country-item"
                                        data-country="Ireland"
                                    >
                                        <span>
                                            Ireland
                                        </span>

                                        <span
                                            class="edu-country-arrow"
                                        >
                                            →
                                        </span>
                                    </button>

                                </aside>


                                <!-- COUNTRY CONTENT -->

                                <div
                                    class="edu-country-content"
                                >

                                    ${countryPanel(
                                        "USA",
                                        "1,000+",
                                        [
                                            "Computer Science",
                                            "Business",
                                            "Engineering",
                                            "Data Science",
                                            "MBA",
                                            "Information Technology"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "Germany",
                                        "500+",
                                        [
                                            "Computer Science",
                                            "Engineering",
                                            "Data Science",
                                            "Business",
                                            "AI & Machine Learning",
                                            "Technology"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "France",
                                        "400+",
                                        [
                                            "Business",
                                            "Management",
                                            "Engineering",
                                            "Computer Science",
                                            "Finance",
                                            "Technology"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "UK",
                                        "800+",
                                        [
                                            "Computer Science",
                                            "Business",
                                            "Data Science",
                                            "Engineering",
                                            "Finance",
                                            "Management"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "Australia",
                                        "600+",
                                        [
                                            "Computer Science",
                                            "Business",
                                            "Engineering",
                                            "Data Science",
                                            "IT",
                                            "Management"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "Finland",
                                        "200+",
                                        [
                                            "Computer Science",
                                            "Technology",
                                            "Engineering",
                                            "Data Science",
                                            "Business",
                                            "AI"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "UAE",
                                        "150+",
                                        [
                                            "Business",
                                            "Computer Science",
                                            "Engineering",
                                            "Management",
                                            "Technology",
                                            "Finance"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "Canada",
                                        "700+",
                                        [
                                            "Computer Science",
                                            "Business",
                                            "Engineering",
                                            "Data Science",
                                            "Management",
                                            "Technology"
                                        ]
                                    )}


                                    ${countryPanel(
                                        "Hungary",
                                        "150+",
                                        [
                                            "Computer Science",
                                            "Engineering",
                                            "Business",
                                            "Technology",
                                            "Data Science",
                                            "Management"
                                        ]
                                    )}


                                    ${countryPanel("Netherlands")}
                                    ${countryPanel("Italy")}

                                    ${countryPanel(
                                        "Ireland",
                                        "250+",
                                        [
                                            "Computer Science",
                                            "Technology",
                                            "Business",
                                            "Data Science",
                                            "Engineering",
                                            "Finance"
                                        ]
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         DESTINATIONS
                    ==================================== -->
                    <div class="edu-study-nav-item">
                        <button type="button" class="edu-study-nav-button" data-mega-trigger="destinations" aria-expanded="false">
                            Destinations <span>⌄</span>
                        </button>
                        <div class="edu-study-mega edu-destination-mega" data-mega-menu="destinations">
                            <div class="edu-study-mega-inner edu-destination-mega-inner">
                                <aside class="edu-study-mega-sidebar edu-destination-sidebar" aria-label="Choose a destination">
                                    <div class="edu-destination-sidebar-title">Explore countries</div>
                                    ${Object.entries(DESTINATION_MENU_DATA).map(([country, data]) => `
                                        <button type="button" class="edu-study-side-item ${country === "USA" ? "active" : ""}" data-mega-panel="${country}" aria-pressed="${country === "USA" ? "true" : "false"}">
                                            <span>${data.label}</span><span aria-hidden="true">→</span>
                                        </button>
                                    `).join("")}
                                </aside>
                                <div class="edu-study-mega-content edu-destination-content" aria-live="polite">
                                    ${Object.keys(DESTINATION_MENU_DATA).map(destinationCountryPanel).join("")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ===================================
                         EXAMS
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="exams"
                            aria-expanded="false"
                        >

                            Exams

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="exams"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="english-tests"
                                    >
                                        English Tests
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="graduate-admissions"
                                    >
                                        Admission Tests
                                        <span>→</span>
                                    </button> 
                                    <button type="button" class="edu-study-side-item" data-mega-panel="undergraduate-admissions" aria-controls="undergraduate-admissions">
                                        Undergraduate Admission
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="test-planning" aria-controls="test-planning">
                                        Test Requirements
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="english-tests"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                English Tests
                                            </h4>

                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">
                                                IELTS
                                            </a>

                                            <a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank" rel="noopener noreferrer">
                                                TOEFL iBT
                                            </a>

                                            <a href="https://www.pearsonpte.com/pte-academic/" target="_blank" rel="noopener noreferrer">
                                                PTE Academic
                                            </a>

                                            <a href="https://englishtest.duolingo.com/" target="_blank" rel="noopener noreferrer">
                                                Duolingo English Test
                                            </a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Preparation
                                            </h4>

                                            <a href="https://ielts.org/take-a-test/test-types" target="_blank" rel="noopener noreferrer">
                                                IELTS test types &amp; format ↗
                                            </a>

                                            <a href="https://ielts.org/take-a-test/preparation-resources" target="_blank" rel="noopener noreferrer">
                                                IELTS preparation resources ↗
                                            </a>

                                            <a href="https://ielts.org/take-a-test/your-results" target="_blank" rel="noopener noreferrer">
                                                IELTS results &amp; score guidance ↗
                                            </a>

                                        </div>


                                        <div
                                            class="edu-study-feature"
                                        >

                                            <span
                                                class="edu-study-feature-icon"
                                            >
                                                ✓
                                            </span>

                                            <strong>
                                                Prepare for your exam
                                            </strong>

                                            <p>
                                                Understand the test
                                                requirements for your
                                                study destination.
                                            </p>

                                            <a href="#study-abroad-faq">
                                                Browse EduConnect study-abroad FAQs →
                                            </a>

                                        </div>

                                     
                                        <div class="edu-study-column">
                                            <h4>Plan before you book</h4>
                                            <a href="#abroad-exams">Compare exam overviews on EduConnect</a>
                                            <a href="#study-abroad-faq">Check admission requirement guidance</a>
                                            <a href="#study-abroad-destination-explorer">Explore study destinations</a>
                                        </div></div>


                                    <div class="edu-study-panel" data-mega-content="graduate-admissions">
                                        <div class="edu-study-column">
                                            <h4>Graduate admission tests</h4>
                                            <a href="https://www.ets.org/gre/test-takers/general-test/about.html" target="_blank" rel="noopener noreferrer">GRE General Test ↗</a>
                                            <a href="https://www.mba.com/exams/gmat-exam" target="_blank" rel="noopener noreferrer">GMAT Exam ↗</a>
                                            <a href="#abroad-exams">See exam summaries on EduConnect</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>What to review</h4>
                                            <a href="#abroad-exams">Test sections and score overview</a>
                                            <a href="#study-abroad-faq">Programme entry requirements</a>
                                            <a href="#study-abroad-course-explorer">Explore graduate programmes</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Prepare your application</h4>
                                            <a href="#study-abroad-documents">Application document guidance</a>
                                            <a href="#study-abroad-application">Application steps</a>
                                            <a href="#study-abroad-intakes">Plan around an intake</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Check before you prepare</strong>
                                            <p>Test requirements can differ by institution, programme and applicant. Confirm the current policy with your chosen provider.</p>
                                            <a href="#study-abroad-faq">Review EduConnect guidance →</a>
                                        </div>
                                    </div>

                                 
                                    <div class="edu-study-panel" id="undergraduate-admissions" data-mega-content="undergraduate-admissions">
                                        <div class="edu-study-column">
                                            <h4>Undergraduate admission tests</h4>
                                            <a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer">SAT · official test information ↗</a>
                                            <a href="https://www.act.org/content/act/en/products-and-services/the-act.html" target="_blank" rel="noopener noreferrer">ACT · official test information ↗</a>
                                            <a href="#abroad-exams">See exam summaries on EduConnect</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Application planning</h4>
                                            <a href="#study-abroad-application">Review application steps</a>
                                            <a href="#study-abroad-documents">Prepare document checklist</a>
                                            <a href="#study-abroad-intakes">Explore intake planning</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Find suitable options</h4>
                                            <a href="#study-abroad-destination-explorer">Browse destinations</a>
                                            <a href="#study-abroad-course-explorer">Explore course options</a>
                                            <a href="#study-abroad-faq">Check entry guidance</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✓</span>
                                            <strong>Plan your next steps</strong>
                                            <p>Check the current test policy and application requirements for each institution you are considering.</p>
                                            <a href="#study-abroad-application">Open the application guide →</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" id="test-planning" data-mega-content="test-planning">
                                        <div class="edu-study-column">
                                            <h4>Choose a test category</h4>
                                            <a href="#abroad-exams">English proficiency exams</a>
                                            <a href="#abroad-exams">Graduate admission exams</a>
                                            <a href="#abroad-exams">Undergraduate admission exams</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Verify requirements</h4>
                                            <a href="#study-abroad-faq">Review entry requirements</a>
                                            <a href="#study-abroad-course-explorer">Check programme details</a>
                                            <a href="#study-abroad-destination-explorer">Explore destination options</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Get ready to apply</h4>
                                            <a href="#study-abroad-documents">Review document guidance</a>
                                            <a href="#study-abroad-application">Follow application steps</a>
                                            <a href="#study-abroad-intakes">Plan an intake timeline</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">i</span>
                                            <strong>Requirements vary</strong>
                                            <p>Confirm accepted tests, scores and deadlines directly with the institution and programme.</p>
                                            <a href="#study-abroad-faq">Read EduConnect FAQs →</a>
                                        </div>
                                    </div></div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         RESOURCES
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="resources"
                            aria-expanded="false"
                        >

                            Resources

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="resources"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="study-guides"
                                    >
                                        Articles &amp; Guides
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="planning-hub"
                                    >
                                        Study Planning Hub
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="scholarships"
                                    >
                                        Scholarships &amp; Funding
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="resource-tests"
                                    >
                                        Tests &amp; Preparation
                                        <span>→</span>
                                    </button> 
                                    <button type="button" class="edu-study-side-item" data-mega-panel="application-documents" aria-controls="application-documents">
                                        Applications &amp; Documents
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="popular-guides" aria-controls="popular-guides">
                                        Popular Study Guides
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="study-guides"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Study Guides
                                            </h4>

                                            <a href="#study-abroad-faq">
                                                Admission Requirements
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Process
                                            </a>

                                            <a href="#study-abroad-intakes">Intakes</a>
                                            <a href="#study-abroad-destinations">Choose a destination</a>
                                            <a href="#study-abroad-lead-form">Application document guidance →</a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Planning
                                            </h4>

                                            <a href="#study-abroad-cost">
                                                Cost & Finance
                                            </a>

                                            <a href="#abroad-scholarships">
                                                Scholarships
                                            </a>

                                            <a href="#study-abroad-faq">FAQs</a>
                                            <a href="#abroad-scholarships">Funding information →</a>

                                        </div>


                                        <div
                                            class="edu-study-feature"
                                        >

                                            <span
                                                class="edu-study-feature-icon"
                                            >
                                                📚
                                            </span>

                                            <strong>
                                                Study Abroad Guide
                                            </strong>

                                            <p>
                                                Everything you need
                                                to plan your journey.
                                            </p>

                                            <a href="#study-abroad-destinations">
                                                Start exploring →
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="planning-hub"
                                    >

                                        <div class="edu-study-column">
                                            <h4>Choose a destination</h4>
                                            <a href="#study-abroad-country-comparison">Compare study destinations →</a>
                                            <a href="#study-abroad-destinations">Browse destination options</a>
                                            <a href="#study-abroad-intakes">Explore upcoming intakes</a>
                                        </div>

                                        <div class="edu-study-column">
                                            <h4>Find a programme</h4>
                                            <a href="#study-abroad-destination-explorer">Explore courses and universities</a>
                                            <a href="#study-abroad-course-explorer">Browse course options</a>
                                            <a href="#study-abroad-faq">Review entry requirements</a>
                                        </div>

                                        <div class="edu-study-column">
                                            <h4>Plan your budget</h4>
                                            <a href="#study-abroad-cost">Review study costs</a>
                                            <a href="#study-abroad-tools">Open planning tools</a>
                                            <a href="#abroad-scholarships">Explore funding information</a>
                                        </div>

                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Build a clear study plan</strong>
                                            <p>Compare destinations, explore programmes and check official requirements before you apply.</p>
                                            <a href="#study-abroad-cta">Continue with EduConnect →</a>
                                        </div>

                                    </div>

                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="scholarships"
                                    >

                                        <div class="edu-study-column">

                                            <h4>Funding opportunities</h4>

                                            <a href="#abroad-scholarships">Browse scholarship information</a>
                                            <a href="https://foreign.fulbrightonline.org/" target="_blank" rel="noopener noreferrer">Fulbright Foreign Student Program ↗</a>
                                            <a href="https://www.chevening.org/scholarships/" target="_blank" rel="noopener noreferrer">Chevening Scholarships ↗</a>
                                            <a href="https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters" target="_blank" rel="noopener noreferrer">Erasmus Mundus Joint Masters ↗</a>
                                            <a href="https://www.daad.de/en/studying-in-germany/scholarships/" target="_blank" rel="noopener noreferrer">DAAD scholarships ↗</a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="resource-tests"
                                    >
                                        <div class="edu-study-column">
                                            <h4>English proficiency tests</h4>
                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">IELTS Academic ↗</a>
                                            <a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank" rel="noopener noreferrer">TOEFL iBT ↗</a>
                                            <a href="https://www.pearsonpte.com/pte-academic/" target="_blank" rel="noopener noreferrer">PTE Academic ↗</a>
                                            <a href="https://englishtest.duolingo.com/" target="_blank" rel="noopener noreferrer">Duolingo English Test ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Admissions tests</h4>
                                            <a href="https://www.ets.org/gre/test-takers/general-test/about.html" target="_blank" rel="noopener noreferrer">GRE General Test ↗</a>
                                            <a href="https://www.mba.com/exams/gmat-exam" target="_blank" rel="noopener noreferrer">GMAT Exam ↗</a>
                                            <a href="https://satsuite.collegeboard.org/sat" target="_blank" rel="noopener noreferrer">SAT ↗</a>
                                            <a href="https://www.act.org/content/act/en/products-and-services/the-act.html" target="_blank" rel="noopener noreferrer">ACT ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Preparation &amp; requirements</h4>
                                            <a href="https://ielts.org/take-a-test/test-types" target="_blank" rel="noopener noreferrer">IELTS test types &amp; format ↗</a>
                                            <a href="https://ielts.org/take-a-test/your-results" target="_blank" rel="noopener noreferrer">IELTS results &amp; score guidance ↗</a>
                                            <a href="https://ielts.org/take-a-test/preparation-resources" target="_blank" rel="noopener noreferrer">IELTS preparation resources ↗</a>
                                            <a href="#study-abroad-faq">Admission checklist</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" data-mega-content="official-resources">
                                        <div class="edu-study-column">
                                            <h4>Official destination guidance</h4>
                                            <a href="https://educationusa.state.gov/your-5-steps-us-study" target="_blank" rel="noopener noreferrer">United States · EducationUSA ↗</a>
                                            <a href="https://www.gov.uk/student-visa" target="_blank" rel="noopener noreferrer">United Kingdom · GOV.UK ↗</a>
                                            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" target="_blank" rel="noopener noreferrer">Canada · Study permit ↗</a>
                                            <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" target="_blank" rel="noopener noreferrer">Australia · Student visa ↗</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>More official sources</h4>
                                            <a href="https://www.make-it-in-germany.com/en/visa-residence/types/studying" target="_blank" rel="noopener noreferrer">Germany · Study visa ↗</a>
                                            <a href="https://www.france-visas.gouv.fr/en/web/france-visas/etudiant" target="_blank" rel="noopener noreferrer">France · Student visa ↗</a>
                                            <a href="https://www.irishimmigration.ie/coming-to-study-in-ireland/" target="_blank" rel="noopener noreferrer">Ireland · Study information ↗</a>
                                            <a href="#study-abroad-faq">More EduConnect study-abroad FAQs →</a>
                                        </div>
                                    </div>

                                 
                                    <div class="edu-study-panel" id="application-documents" data-mega-content="application-documents">
                                        <div class="edu-study-column">
                                            <h4>Application documents</h4>
                                            <a href="#study-abroad-documents">Document guidance on EduConnect</a>
                                            <a href="#study-abroad-application">Application process and next steps</a>
                                            <a href="#study-abroad-faq">Common application questions</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Statement &amp; references</h4>
                                            <a href="#study-abroad-documents">Statement of purpose planning</a>
                                            <a href="#study-abroad-documents">Recommendation letter planning</a>
                                            <a href="#study-abroad-documents">Organize supporting documents</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Keep your application on track</h4>
                                            <a href="#study-abroad-intakes">Review intake dates</a>
                                            <a href="#study-abroad-application">See the application steps</a>
                                            <a href="#study-abroad-course-explorer">Return to programme discovery</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">▤</span>
                                            <strong>Get your documents ready</strong>
                                            <p>Use EduConnect’s existing document guidance, then confirm each programme’s exact requirements.</p>
                                            <a href="#study-abroad-documents">Open document guidance →</a>
                                        </div>
                                    </div>

                                    <div class="edu-study-panel" id="popular-guides" data-mega-content="popular-guides">
                                        <div class="edu-study-column">
                                            <h4>Explore destinations</h4>
                                            <a href="#study-abroad-destinations">Browse study destinations</a>
                                            <a href="#study-abroad-country-comparison">Compare country options</a>
                                            <a href="#study-abroad-intakes">Explore study intakes</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Find a programme</h4>
                                            <a href="#study-abroad-destination-explorer">Explore universities</a>
                                            <a href="#study-abroad-course-explorer">Browse course options</a>
                                            <a href="#study-abroad-faq">Review entry guidance</a>
                                        </div>
                                        <div class="edu-study-column">
                                            <h4>Plan costs &amp; funding</h4>
                                            <a href="#study-abroad-cost">Explore study costs</a>
                                            <a href="#abroad-scholarships">Review scholarship information</a>
                                            <a href="#study-abroad-tools">Open planning tools</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">✦</span>
                                            <strong>Start with your priorities</strong>
                                            <p>Compare destinations, programmes and funding information before deciding where to apply.</p>
                                            <a href="#study-abroad-country-comparison">Compare destinations →</a>
                                        </div>
                                    </div></div>

                            </div>

                        </div>

                    </div>


                    <!-- ===================================
                         MORE
                    ==================================== -->

                    <div
                        class="edu-study-nav-item"
                    >

                        <button
                            type="button"
                            class="edu-study-nav-button"
                            data-mega-trigger="more"
                            aria-expanded="false"
                        >

                            More

                            <span>⌄</span>

                        </button>


                        <div
                            class="edu-study-mega"
                            data-mega-menu="more"
                        >

                            <div
                                class="edu-study-mega-inner"
                            >

                                <aside
                                    class="edu-study-mega-sidebar"
                                >

                                    <button
                                        type="button"
                                        class="edu-study-side-item active"
                                        data-mega-panel="tools"
                                    >
                                        Tools
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="services"
                                    >
                                        Services
                                        <span>→</span>
                                    </button>

                                    <button
                                        type="button"
                                        class="edu-study-side-item"
                                        data-mega-panel="support"
                                    >
                                        Support
                                        <span>→</span>
                                    </button>

                                    <button type="button" class="edu-study-side-item" data-mega-panel="official-resources">
                                        Official Resources
                                        <span>→</span>
                                    </button>

                                </aside>


                                <div
                                    class="edu-study-mega-content"
                                >

                                    <div
                                        class="edu-study-panel active"
                                        data-mega-content="tools"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Study Tools
                                            </h4>

                                            <a href="#study-abroad-cost">
                                                Cost Planner
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                Country Comparison
                                            </a>

                                            <a href="#study-abroad-destinations">Course &amp; university discovery</a>

                                        </div>


                                        <div class="edu-study-column">

                                            <h4>
                                                Planning
                                            </h4>

                                            <a href="#study-abroad-intakes">
                                                Intake Planner
                                            </a>

                                            <a href="#study-abroad-faq">
                                                Requirements
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Process
                                            </a>

                                        </div>

                                     
                                        <div class="edu-study-column">
                                            <h4>Planning tools</h4>
                                            <a href="#study-abroad-tool-cost">Estimate your study budget</a>
                                            <a href="#study-abroad-tool-timeline">Build an application timeline</a>
                                            <a href="#study-abroad-tool-profile">Review your study profile</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">↗</span>
                                            <strong>Plan with EduConnect</strong>
                                            <p>Use the on-page tools to organize your budget, timeline and preparation priorities.</p>
                                            <a href="#study-abroad-tools">Browse study planning tools →</a>
                                        </div></div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="services"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                EDUCONNECT
                                            </h4>

                                            <a href="#study-abroad-destinations">
                                                Study Abroad
                                            </a>

                                            <a href="#study-abroad-country-comparison">
                                                University Discovery
                                            </a>

                                            <a href="#abroad-scholarships">
                                                Scholarship Discovery
                                            </a>

                                        </div>

                                    </div>


                                    <div
                                        class="edu-study-panel"
                                        data-mega-content="support"
                                    >

                                        <div class="edu-study-column">

                                            <h4>
                                                Help & Support
                                            </h4>

                                            <a href="#study-abroad-faq">
                                                FAQs
                                            </a>

                                            <a href="#study-abroad-lead-form">
                                                Application Help
                                            </a>

                                            <a href="#study-abroad-cta">
                                                Get Started
                                            </a>

                                        </div>

                                    </div>

                                    <div class="edu-study-panel" data-mega-content="official-resources">
                                        <div class="edu-study-column">
                                            <h4>Official destination information</h4>
                                            <a href="https://educationusa.state.gov/your-5-steps-us-study" target="_blank" rel="noopener noreferrer">Government and advising links ↗</a>
                                            <a href="#study-abroad-faq">Application requirements</a>
                                            <a href="#abroad-scholarships">Scholarships and funding ↗</a>
                                            <a href="https://ielts.org/take-a-test" target="_blank" rel="noopener noreferrer">English test information ↗</a>
                                        </div>
                                        <div class="edu-study-feature">
                                            <span class="edu-study-feature-icon" aria-hidden="true">↗</span>
                                            <strong>Use official sources</strong>
                                            <p>Check current visa rules, entry requirements and scholarship details with the responsible organization.</p>
                                            <a href="#study-abroad-faq">Browse EduConnect study-abroad FAQs →</a>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </nav>


                <!-- RIGHT ACTIONS -->

                <div
                    class="edu-study-nav-actions"
                >

                    <a
                        href="#study-abroad-cta"
                        class="edu-study-contact"
                    >
                        Get Started
                    </a>


                    <button
                        type="button"
                        class="edu-study-mobile-button"
                        aria-label="Open navigation"
                        aria-expanded="false"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </div>

        </section>

    `;

}
