import { onlineEducationInstitutions } from "../data/onlineEducationInstitutions.js";
import domesticInstitutionDirectory from "../data/domestic-college-directory.json";
import domesticInstitutionSites from "../data/domestic-institution-site-data.json";
import domesticCampusPhotos from "../data/domestic-college-campus-photos.json";
import domesticPhotoSources from "../data/domestic-college-photo-sources.json";
import domesticInstitutionOverviews from "../data/institution-overviews.json";
import { onlineEducationProgrammes } from "../data/onlineEducationProgrammes.js";
import onlineEducationHeroVideo from "../assets/images/online-education-hero.mp4";
import onlineEducationHeroPoster from "../assets/images/online-education-hero.jpg";
import onlineEducationStudentPortrait from "../assets/images/online-education-student-portrait.jpg";
import renderOnlineEducationLeadForm, {
    bindOnlineEducationLeadForm,
} from "../components/onlineeducationleadform.js";
const INSTITUTION_CAMPUS_IMAGES = {
    asu:
        "https://images.unsplash.com/photo-156277" +
        "4053-701939374585?auto=format&fit=crop&w" +
        "=700&q=85",
    uol: "https://i.pinimg.com/736x/fe/70/f8/fe70f87d53ef0e5027e9351e1aa513f1.jpg",
    illinois: "https://i.pinimg.com/736x/3a/a6/bb/3aa6bb97fd94ba00f758a87ae36c725d.jpg",
    "penn-state-world-campus":
        "https://i.pinimg.com/1200x/bb/43/6c/bb436c50a0db57a10be36df82822bbdc.jpg",
    "university-of-florida-online":
        "https://images.unsplash.com/photo-156498" +
        "1797816-1043664bf78d?auto=format&fit=cro" +
        "p&w=700&q=85",
    "open-university":
        "https://images.unsplash.com/photo-156879" +
        "2923760-d70635a89fdc?auto=format&fit=cro" +
        "p&w=700&q=85",
    "university-of-minnesota-online":
        "https://i.pinimg.com/1200x/c6/f7/03/c6f703dbb407e7d357e5a0cc5d4efef3.jpg",
    ignou: "https://i.pinimg.com/736x/2c/3b/43/2c3b4325329db9a8d986e87e54d80e83.jpg",
    "manipal-university-jaipur":
        "https://i.pinimg.com/1200x/6d/2f/95/6d2f958c2f7a84b1febffe645e248615.jpg",
    "amity-online":
        "https://cache.careers360.mobi/media/pres" +
        "ets/720X480/colleges/social-media/media-" +
        "gallery/729/2018/9/29/Campus%20View%20Of" +
        "%20Amity%20University%20Noida_Campus-Vie" +
        "w.jpg",
    "chandigarh-university":
        "https://i.pinimg.com/1200x/73/32/46/7332468887a50cf3640bda18d6ca536d.jpg",
    "jain-university-online":
        "https://i.pinimg.com/736x/1f/80/85/1f80853e6611116a0c92a2f33ed6c335.jpg",
    nmims: "https://i.pinimg.com/1200x/ff/3e/ae/ff3eaee4ea243583d22ea08d2b3ef96b.jpg",
    "amrita-online": "https://i.pinimg.com/736x/62/7d/83/627d834231f7c460d2f11eca600afffe.jpg",
    "lpu-online":
        "https://images.unsplash.com/photo-159228" +
        "0771190-3e2e4d571952?auto=format&fit=cro" +
        "p&w=700&q=85",
    "parul-university-online":
        "https://www.paruluniversity.ac.in/wp-content/uploads/2026/03/pugallery10.jpg",
    "georgia-tech": "https://i.pinimg.com/1200x/09/60/d9/0960d99864cd16c28b21a842eefbcd75.jpg",
    snhu: "https://i.pinimg.com/1200x/33/c9/ab/33c9ab82c60e27874c39a7d0c2450843.jpg",
    "https://i.pinimg.com/1200x/56/3d/0e/563d0ebd63b4c1db7384b9e44f34ec04.jpg": "",
    "liverpool-online": "https://i.pinimg.com/736x/8c/95/c4/8c95c45a9326e98161c39c4d058a5a70.jpg",
    "coventry-online": "https://i.pinimg.com/736x/ec/d6/52/ecd652cc6782a8fa4083f4b60fe03f0c.jpg",
    "Johns Hopkins University":
        "https://i.pinimg.com/736x/5b/16/72/5b1672ef443127e71ddc26d0940d8fe5.jpg",
    athabasca:
        "https://images.unsplash.com/photo-156277" +
        "4053-701939374585?auto=format&fit=crop&w" +
        "=700&q=85",
    deakin: "https://i.pinimg.com/1200x/18/06/3f/18063fab9b876cedffa04e84429b7745.jpg",
    "monash-online": "https://i.pinimg.com/736x/27/ad/b1/27adb16a4fed64808b166fb687facc3e.jpg",
    "iu-international": "https://i.pinimg.com/1200x/4b/24/40/4b2440b5e3a85bf899f41eec4a36fb33.jpg",
    uoc: "https://i.pinimg.com/1200x/f6/d0/cb/f6d0cb1b9cda2177b535ff0377545243.jpg",
};
export const onlineEducationCampusImages = INSTITUTION_CAMPUS_IMAGES;

// Add India's existing directory records without replacing international cards.
const EXISTING_INSTITUTION_IDS = new Set(onlineEducationInstitutions.map(({ id }) => id));
const EXISTING_DIRECTORY_CODES = new Set([
    "EC-IN-UN-AMITY-NOIDA",
    "EC-IN-UN-LPU",
    "EC-IN-UN-PARUL",
    "EC-IN-UN-CHANDIGARH",
    "EC-IN-UN-JAIN",
    "EC-IN-UG-MANIPAL",
]);
const DIRECTORY_MODE_OVERRIDES = {
    "EC-IN-UN-VGU": ["Distance learning"],
    "EC-IN-UN-GANPAT-GOA": [],
    "EC-IN-UN-FUTURE": [],
    "EC-IN-NEEDS-OXFORD": [],
};
// Images from each institution's own campus/gallery page. Keep the source
// page with the image URL so its origin is traceable in the detail view.
const VERIFIED_OFFICIAL_CAMPUS_PHOTOS = {
    "EC-IN-UN-AMITY-NOIDA": {
        imageUrl:
            "https://cache.careers360.mobi/media/pres" +
            "ets/720X480/colleges/social-media/media-" +
            "gallery/729/2018/9/29/Campus%20View%20Of" +
            "%20Amity%20University%20Noida_Campus-Vie" +
            "w.jpg",
        sourceUrl: "https://www.amity.edu/noida/aips/pdf/admission_prospectus_2025.pdf",
    },
    "EC-IN-UN-BENNETT": {
        imageUrl: "https://cache.careers360.mobi/media/article_images/2020/7/10/campus-pic.jpg",
        sourceUrl: "https://www.bennett.edu.in/bennett-university-galleries/",
    },
    "EC-IN-UN-VGU": {
        imageUrl: "https://media.collegesathi.com/universities/1781610103528-vgu-1.webp",
        sourceUrl: "https://vgu.ac.in/contact",
    },
    "EC-IN-UN-PARUL": {
        imageUrl: "https://www.paruluniversity.ac.in/wp-content/uploads/2026/03/pugallery10.jpg",
        sourceUrl: "https://www.paruluniversity.ac.in/gallery/",
    },
    "EC-IN-UN-UPES": {
        imageUrl:
            "https://upeswebsitecdn-prod-hphqfhc0b8h2" +
            "ffhf.a02.azurefd.net/drupal-data/2025-03" +
            "/UPES%20Campus.webp",
        sourceUrl: "https://www.upes.ac.in/campus-life",
    },
    "EC-IN-UN-JECRC": {
        imageUrl: "https://jecrcuniversity.edu.in/wp-content/uploads/2023/01/9842.webp",
        sourceUrl: "https://jecrcuniversity.edu.in/jecrc-university-campus/",
    },
    "EC-IN-UN-NIMS": {
        imageUrl:
            "https://nimsuniversity.org/images/home/c" +
            "ampus-life/campus%20life/campus-life-1.w" +
            "ebp",
        sourceUrl: "https://nimsuniversity.org/?lang=en",
    },
};

// Institution descriptions below were checked against the linked official
// profiles and programme pages. Keep each overview to four concise facts.
export const DOMESTIC_PROFILE_FACTS = {
    "EC-IN-UN-AMITY-MAHARASHTRA": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Science", "Design", "Media"],
        overview: [
            "Amity University Mumbai is established " +
                "under Maharashtra Act XIII of 2014 and " +
                "is recognized under Section 2(f) of the " +
                "UGC Act.",
            "Its main campus is at Bhatan, Panvel, " +
                "on the Mumbai–Pune Expressway; the " +
                "university also maintains a separate " +
                "city office in Kurla.",
            "The official programme directory lists " +
                "undergraduate, postgraduate and " +
                "doctoral offerings across engineering, " +
                "management, law, sciences and other " +
                "fields.",
            "The university describes its Panvel " +
                "campus as a residential campus with " +
                "academic, sports and student facilities.",
        ],
        sourceUrl: "https://amity.edu/mumbai/about-us",
    },
    "EC-IN-UN-AMITY-RAJASTHAN": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Science", "Architecture", "Hospitality"],
        overview: [
            "Amity University Rajasthan is a " +
                "state-recognized university established " +
                "under the Amity University Rajasthan " +
                "Act, 2008.",
            "Its Jaipur campus is on the " +
                "Delhi–Jaipur Highway and the university " +
                "describes it as a 152-acre campus.",
            "The official programme directory lists " +
                "undergraduate, postgraduate and " +
                "doctoral courses across areas including " +
                "engineering, sciences, architecture and " +
                "management.",
            "The university also describes " +
                "residential, laboratory, library and " +
                "sports facilities at the Jaipur campus.",
        ],
        sourceUrl: "https://www.amity.edu/jaipur/about-amity-jaipur",
    },
    "EC-IN-UN-AMITY-HARYANA": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Engineering",
            "Management",
            "Health Sciences",
            "Law",
            "Science",
            "Liberal Arts",
        ],
        overview: [
            "Amity University Gurugram was established under Haryana Act 10 of 2010.",
            "Its main campus is in Amity Education " +
                "Valley, Manesar, Gurugram; the " +
                "university describes the campus as 110 " +
                "acres.",
            "The official university profile lists " +
                "undergraduate, postgraduate and " +
                "doctoral study across engineering, " +
                "management, health sciences, law and " +
                "other disciplines.",
            "The campus profile describes " +
                "laboratories, a library, sports " +
                "facilities and student accommodation.",
        ],
        sourceUrl: "https://amity.edu/gurugram/about-us",
    },
    "EC-IN-UN-AMITY-TELANGANA": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Engineering",
            "Computer Applications",
            "Management",
            "Commerce",
            "Design",
            "Science",
        ],
        overview: [
            "Amity University Hyderabad was " +
                "established under the Telangana State " +
                "Private Universities Act, 2018.",
            "The university presents its Hyderabad " +
                "campus as a centre for " +
                "interdisciplinary education and " +
                "research.",
            "Its published programme information " +
                "includes undergraduate and postgraduate " +
                "courses in engineering, computing, " +
                "management, commerce, design and " +
                "sciences.",
            "Check the university’s current course " +
                "pages for campus-specific availability " +
                "and admission requirements.",
        ],
        sourceUrl: "https://hyderabad.amity.edu/",
    },
    "EC-IN-UN-AMITY-PUNJAB": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Design", "Science", "Architecture"],
        overview: [
            "Amity University Punjab is a multidisciplinary university based in Mohali.",
            "The official university profile " +
                "describes a 40-acre campus near " +
                "Chandigarh International Airport.",
            "The university lists undergraduate, " +
                "postgraduate and doctoral programmes " +
                "across disciplines including " +
                "engineering, management, law, design " +
                "and sciences.",
            "Its campus profile describes academic, " +
                "residential and sports facilities; " +
                "current course details should be " +
                "checked with the university.",
        ],
        sourceUrl: "https://amity.edu/infocentremohali/",
    },
    "EC-IN-UN-BENNETT": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Engineering",
            "Artificial Intelligence",
            "Management",
            "Media",
            "Law",
            "Design",
        ],
        overview: [
            "Bennett University is a " +
                "multidisciplinary university " +
                "established by The Times Group.",
            "The university’s official profile " +
                "describes its campus in Greater Noida " +
                "as 68 acres.",
            "Published programmes span engineering, " +
                "artificial intelligence, management, " +
                "media, law, design, liberal arts and " +
                "applied sciences.",
            "The university also lists postgraduate " +
                "and doctoral study; confirm the current " +
                "course catalogue on its official site.",
        ],
        sourceUrl: "https://www.bennett.edu.in/about-us/overview/",
    },
    "EC-IN-UN-NIMS": {
        levels: ["Bachelor's", "Master's", "Doctoral", "Diploma"],
        subjects: ["Medicine", "Engineering", "Management", "Law", "Pharmacy", "Science"],
        overview: [
            "NIMS University Rajasthan is based on the Jaipur–Delhi Highway in Jaipur.",
            "The university describes its site as an " +
                "integrated campus serving multiple " +
                "academic institutes.",
            "Its official catalogue lists " +
                "undergraduate, postgraduate, doctoral " +
                "and diploma study across health " +
                "sciences, engineering, management, law " +
                "and other areas.",
            "Programme availability and eligibility " +
                "vary by school and should be confirmed " +
                "on the university’s current course " +
                "pages.",
        ],
        sourceUrl: "https://nimsuniversity.org/",
    },
    "EC-IN-UN-UPES": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Engineering",
            "Computer Science",
            "Design",
            "Law",
            "Business",
            "Health Sciences",
        ],
        overview: [
            "UPES is a private university established under the Uttarakhand UPES Act, 2003.",
            "It operates two campuses in Dehradun: Bidholi and Kandoli.",
            "Its seven schools cover advanced " +
                "engineering, computer science, design, " +
                "law, business, health sciences, modern " +
                "media and liberal studies.",
            "The official academics pages list " +
                "undergraduate, postgraduate and " +
                "doctoral programmes; offerings can " +
                "change by academic year.",
        ],
        sourceUrl: "https://www.upes.ac.in/about-us",
    },
    "EC-IN-UN-VGU": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Design", "Science", "Agriculture"],
        overview: [
            "Vivekananda Global University is a " +
                "multidisciplinary private university " +
                "established in Jaipur in 2012.",
            "Its official profile places the campus in Jagatpura, Jaipur.",
            "The university lists undergraduate, " +
                "postgraduate and doctoral study across " +
                "engineering, management, law, design, " +
                "sciences and agriculture.",
            "VGU also lists online and distance " +
                "offerings separately; confirm the " +
                "delivery mode for each programme.",
        ],
        sourceUrl: "https://vgu.ac.in/who-we-are/vivekananda-global-university",
    },
    "EC-IN-UN-IILM": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Management",
            "Law",
            "Engineering",
            "Science",
            "Liberal Arts",
            "Social Sciences",
        ],
        overview: [
            "IILM University, Greater Noida, was " +
                "established under the Uttar Pradesh " +
                "Private University (Amendment) Act, " +
                "2022.",
            "The official profile places the campus in Greater Noida’s Knowledge Park II.",
            "The university lists undergraduate, " +
                "postgraduate and doctoral programmes in " +
                "management, law, engineering, sciences, " +
                "liberal arts and social sciences.",
            "Check the official course pages for " +
                "current programme names, eligibility " +
                "and campus details.",
        ],
        sourceUrl: "https://iilm.edu/greater-noida/about/",
    },
    "EC-IN-UN-JKLU": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Design", "Computer Science", "Liberal Arts"],
        overview: [
            "JK Lakshmipat University is a private university based in Jaipur, Rajasthan.",
            "Its official contact information places " +
                "the campus near Mahindra SEZ on Ajmer " +
                "Road; the university reports a 30-acre " +
                "campus.",
            "Its schools include management, " +
                "engineering and technology, design, and " +
                "liberal arts and sciences.",
            "The official programme catalogue should " +
                "be checked for current undergraduate, " +
                "postgraduate and doctoral options.",
        ],
        sourceUrl: "https://jklu.edu.in/contact-us",
    },
    "EC-IN-UN-SAGE-INDORE": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Media", "Design", "Pharmacy"],
        overview: [
            "SAGE University Indore is based in Indore, Madhya Pradesh.",
            "The university’s official site describes a 75-acre campus and 14 institutes.",
            "Published study areas include " +
                "engineering, management, law, media, " +
                "design, pharmacy and related " +
                "disciplines.",
            "The official course pages list " +
                "programme-specific duration and " +
                "eligibility; verify current details " +
                "there.",
        ],
        sourceUrl: "https://sageuniversity.in/",
    },
    "EC-IN-UN-RVU": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Liberal Arts", "Design", "Business", "Computer Science", "Law", "Healthcare"],
        overview: [
            "RV University is a multidisciplinary university based in Bengaluru.",
            "Its official site lists schools for " +
                "liberal arts and sciences, design and " +
                "innovation, economics and business, " +
                "computer science and engineering, law, " +
                "film and media, and allied healthcare.",
            "The university lists undergraduate and " +
                "postgraduate programmes, with doctoral " +
                "study available in several schools.",
            "Check the official admissions pages for current course and campus availability.",
        ],
        sourceUrl: "https://rvu.edu.in/",
    },
    "EC-IN-UN-ORIENTAL": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Agriculture", "Management", "Law", "Pharmacy", "Education", "Engineering"],
        overview: [
            "Oriental University is located in Indore, Madhya Pradesh.",
            "Its official admissions profile describes a campus on the Indore–Ujjain Highway.",
            "The published programme areas include " +
                "agriculture, management, law, pharmacy, " +
                "education, engineering and information " +
                "technology.",
            "For current course names and " +
                "eligibility, use the university’s " +
                "official programme pages.",
        ],
        sourceUrl: "https://admission.oui.edu.in/",
    },
    "EC-IN-UN-IIMT": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Management", "Law", "Life Sciences", "Pharmacy", "Education"],
        overview: [
            "IIMT University is located in Meerut, Uttar Pradesh.",
            "The official profile lists academic " +
                "schools in engineering and technology, " +
                "management, law, life sciences, " +
                "pharmaceutical sciences and education.",
            "Its published courses include " +
                "undergraduate, postgraduate and " +
                "doctoral study, with examples such as " +
                "B.Tech, MBA, MCA and law programmes.",
            "Confirm current offerings and " +
                "eligibility on the university’s " +
                "official admissions pages.",
        ],
        sourceUrl: "https://iimtu.edu.in/page/about-university",
    },
    "EC-IN-UN-SGVU": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Agriculture", "Engineering", "Management", "Pharmacy", "Law", "Sciences"],
        overview: [
            "Suresh Gyan Vihar University was " +
                "established by Rajasthan state " +
                "legislation in 2008 and is based in " +
                "Jaipur.",
            "The university’s official profile " +
                "describes it as a multidisciplinary, " +
                "research-focused institution.",
            "Listed fields include agriculture, " +
                "engineering, management, pharmacy, law, " +
                "sciences, design, arts and mass " +
                "communication.",
            "The university also operates distance " +
                "and online programmes; confirm the mode " +
                "and recognition for each course " +
                "directly.",
        ],
        sourceUrl: "https://www.sgvu.edu.in/aboutus",
    },
    "EC-IN-UN-APEJAY-STYA": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: [
            "Technology",
            "Liberal Arts",
            "Engineering",
            "Management",
            "Education",
            "Pharmacy",
        ],
        overview: [
            "Apeejay Stya University is located in Sohna, Gurugram, Haryana.",
            "The university describes its focus as " +
                "industry-centred education, technology " +
                "and liberal arts.",
            "Its official site lists more than 85 " +
                "programmes across its academic schools, " +
                "including teacher education and " +
                "pharmacy.",
            "Check the current university programme " +
                "catalogue for course-level details and " +
                "eligibility.",
        ],
        sourceUrl: "https://university.apeejay.edu/",
    },
    "EC-IN-UN-SAMSKRUTI": {
        levels: ["Programme details to confirm"],
        subjects: ["Engineering", "Pharmacy", "Management"],
        overview: [
            "The existing directory labels this entry ‘Samskruti University’ in Hyderabad.",
            "The institution’s official website " +
                "identifies Samskruti College of " +
                "Engineering & Technology and Samskruti " +
                "College of Pharmacy at Kondapur, " +
                "Ghatkesar.",
            "The official course pages list engineering, pharmacy and management programmes.",
            "The directory’s university-level " +
                "identity needs confirmation before " +
                "publishing university-specific claims.",
        ],
        sourceUrl: "https://www.samskruti.ac.in/engineering/contact",
        dataVerificationStatus: "needs-clarification",
    },
    "EC-IN-COL-APBS": {
        levels: ["Postgraduate", "Executive"],
        subjects: ["Management", "Finance", "Analytics", "Healthcare", "Marketing"],
        overview: [
            "Asia-Pacific Institute of Management is " +
                "a management institute in Jasola Vihar, " +
                "New Delhi.",
            "The institute’s official site says it was established in 1996.",
            "Its flagship offerings include " +
                "AICTE-approved PGDM programmes, " +
                "including general management, " +
                "healthcare management, analytics, " +
                "banking and financial services, and " +
                "marketing.",
            "The official site describes the PGDM as " +
                "a two-year programme; confirm current " +
                "admissions requirements directly.",
        ],
        sourceUrl: "https://www.asiapacific.edu/",
    },
    "EC-IN-UN-SVVV": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Architecture", "Management", "Law", "Science", "Humanities"],
        overview: [
            "Shri Vaishnav Vidyapeeth " +
                "Vishwavidyalaya is a private university " +
                "established in Indore in 2015.",
            "The university is sponsored by the Shri Vaishnav Vidyapeeth Trust.",
            "Its official materials list disciplines " +
                "including engineering, architecture, " +
                "management, law, sciences, humanities, " +
                "agriculture and computer applications.",
            "Consult the university’s current " +
                "programme catalogue for degrees, " +
                "eligibility and admissions.",
        ],
        sourceUrl: "https://www.svvv.edu.in/about.html",
    },
    "EC-IN-UN-DBS": {
        levels: ["Bachelor's", "Master's", "Doctoral"],
        subjects: ["Engineering", "Media", "Law", "Agriculture", "Pharmacy", "Management"],
        overview: [
            "DBS Global University is based in " +
                "Dehradun and was formerly known as Doon " +
                "Business School.",
            "The institution’s official profile says " +
                "it began in 2008 and received " +
                "university status in 2024.",
            "Its published disciplines include " +
                "engineering, media, law, agriculture, " +
                "pharmacy, liberal arts and management.",
            "Check the official university site for " +
                "current programmes, campus details and " +
                "admission requirements.",
        ],
        sourceUrl: "https://www.dgu.ac/about-us/about-dgu",
    },
};

const campusPhotoIsUsable = (value) =>
    Boolean(value) &&
    !/(?:blank\.gif|placeholder|no[-_]?image|facebook\.com\/tr|campus[-_]?placement|accreditation|blog\.png|\/logo\.?|logo[-_])/i.test(
        String(value),
    );

function getProgrammeLevels(text = "") {
    const value = String(text).toLowerCase();
    const levels = [];
    if (/undergraduate|\bug\b|bachelor|b\.tech|bba|bca|b\.com/.test(value))
        levels.push("Bachelor's");
    if (/postgraduate|\bpg\b|master|\bmba\b|m\.tech|mca|m\.com/.test(value))
        levels.push("Master's");
    if (/doctoral|\bph\.?d\b/.test(value)) levels.push("Doctoral");
    if (/diploma/.test(value)) levels.push("Diploma");
    return levels;
}

function getAcademicAreas(text = "") {
    const value = String(text).toLowerCase();
    return [
        "Engineering",
        "Computer Science",
        "Management",
        "Law",
        "Design",
        "Science",
        "Pharmacy",
        "Medicine",
        "Education",
        "Media",
        "Agriculture",
        "Commerce",
        "Architecture",
        "Liberal Arts",
        "Healthcare",
    ]
        .filter((area) => value.includes(area.toLowerCase()))
        .slice(0, 6);
}
const DOMESTIC_DISCOVERY_INSTITUTIONS = domesticInstitutionDirectory
    .filter(({ code, name }) => {
        const entry = String(code || "");
        const candidate =
            !domesticInstitutionDirectory.find((item) => item.code === entry)?.directoryCategory &&
            (entry.startsWith("EC-IN-UN-") ||
                ["EC-IN-COL-ACHARYA", "EC-IN-COL-APBS", "EC-IN-NEEDS-OXFORD"].includes(entry));
        return (
            candidate &&
            !EXISTING_INSTITUTION_IDS.has(`directory-${entry}`) &&
            !EXISTING_DIRECTORY_CODES.has(entry) &&
            !onlineEducationInstitutions.some(
                (item) =>
                    item.country === "India" &&
                    item.name.toLocaleLowerCase() === String(name || "").toLocaleLowerCase() &&
                    !(entry === "EC-IN-UN-NMIMS" && item.id === "nmims"),
            )
        );
    })
    .map((record) => {
        const site = domesticInstitutionSites[record.code] || {};
        const overview = domesticInstitutionOverviews.find(
            (item) =>
                item.country === "India" &&
                item.name.toLocaleLowerCase() === record.name.toLocaleLowerCase(),
        );
        const profile = DOMESTIC_PROFILE_FACTS[record.code];
        const domainLooksLikeImage = /\.(?:jpe?g|png|webp|gif)(?:[?#]|$)/i.test(
            String(site.officialDomain || ""),
        );
        const officialWebsite =
            profile?.sourceUrl ||
            (site.officialDomain && !domainLooksLikeImage
                ? /^https?:\/\//i.test(site.officialDomain)
                    ? site.officialDomain
                    : `https://${site.officialDomain}`
                : "");
        const verifiedCampusPhoto = VERIFIED_OFFICIAL_CAMPUS_PHOTOS[record.code];
        const importedPhoto = domesticCampusPhotos[record.code];
        const image =
            [verifiedCampusPhoto?.imageUrl, importedPhoto, site.campusImage]
                .find(campusPhotoIsUsable)
                ?.replace(/&amp;/g, "&") || "";
        const photoSource =
            verifiedCampusPhoto?.sourceUrl || domesticPhotoSources[record.code]?.sourceUrl || image;
        const hasVerifiedOnlineProgramme = Boolean(site.onlineProgrammeUrl);
        const modes =
            DIRECTORY_MODE_OVERRIDES[record.code] ||
            (hasVerifiedOnlineProgramme ? ["Fully online"] : ["On-campus"]);
        const city = String(record.city || "");
        const ambiguity =
            record.code === "EC-IN-NEEDS-OXFORD" ||
            record.code === "EC-IN-UN-GANPAT-GOA" ||
            record.code === "EC-IN-UN-FUTURE";
        return {
            id: `directory-${record.code}`,
            directoryCode: record.code,
            name: record.name,
            country: "India",
            city,
            directoryCode: record.code,
            type:
                record.type === "COLLEGE"
                    ? "College"
                    : record.type === "UNIVERSITY"
                      ? "University"
                      : "Institution",
            levels:
                profile?.levels ||
                (ambiguity
                    ? []
                    : getProgrammeLevels(site.description).length
                      ? getProgrammeLevels(site.description)
                      : ["Programme details to confirm"]),
            subjects:
                profile?.subjects ||
                (getAcademicAreas(site.description).length
                    ? getAcademicAreas(site.description)
                    : ["Not listed in verified profile"]),
            modes,
            overview: (
                profile?.overview ||
                overview?.overview ||
                (site.description
                    ? [
                          `${record.name} is a ${record.type === "COLLEGE" ? "college" : "university or institution"} in ${city || "India"}.`,
                          `Its directory profile describes ${getAcademicAreas(site.description).join(", ") || "academic programmes"}.`,
                          `The profile indicates ${getProgrammeLevels(site.description).join(" and ") || "programme levels that need confirmation"}.`,
                          `Confirm current courses, eligibility and admissions on ${officialWebsite || "the institution’s official website"}.`,
                      ]
                    : [
                          `${record.name} is listed in ${city || "India"} in the existing college directory.`,
                          `The current directory does not provide a verified programme description for this institution.`,
                          `Course levels and subject areas should be confirmed with the institution.`,
                          `Use the linked institutional source${officialWebsite ? ` (${officialWebsite})` : ""} for current information.`,
                      ])
            ).join("\n"),
            url: officialWebsite,
            sourceUrl: officialWebsite,
            imageUrl: image,
            imageSourceUrl: image ? photoSource : "",
            imageAttribution: image
                ? domesticPhotoSources[record.code]?.label || `${record.name} campus image source`
                : "",
            imageLicense: image
                ? domesticPhotoSources[record.code]?.licenseUrl
                    ? "Creative Commons source; see source page for terms"
                    : "Source linked; reuse terms should be confirmed"
                : "",
            imageVerificationStatus: image
                ? "campus-photo-source-identified"
                : "awaiting-authentic-photo",
            dataVerificationStatus:
                profile?.dataVerificationStatus ||
                (ambiguity ? "needs-clarification" : "pending-review"),
            programmeNote: ambiguity
                ? "This directory entry needs confirmation before students rely on it."
                : hasVerifiedOnlineProgramme
                  ? "Online mode is listed in the " +
                    "institution source directory; confirm " +
                    "programme-specific UGC-DEB entitlement."
                  : "Campus institution listing. No online " +
                    "or distance programme has been verified " +
                    "for this card.",
            lastVerifiedAt: null,
        };
    });
export const ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS = [
    ...onlineEducationInstitutions,
    ...DOMESTIC_DISCOVERY_INSTITUTIONS,
];

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
    "Microcredential",
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
    "Education",
];

const destinations = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "Ireland",
    "France",
    "Netherlands",
    "Global",
];

const degreeCards = [
    {
        degree: "MBA",
        title: "Master of Business Administration",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><path d="m2 8 10-5 ' +
            '10 5-10 5L2 8Z"/><path d="M6 10v5c3.7 ' +
            '2.7 8.3 2.7 12 0v-5M22 8v6"/></svg>',
    },
    {
        degree: "BBA",
        title: "Bachelor of Business Administration",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><rect x="3" y="7" ' +
            'width="18" height="14" rx="2"/><path ' +
            'd="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 ' +
            '2v2M3 12h18M10 12v2h4v-2"/></svg>',
    },
    {
        degree: "BCA",
        title: "Bachelor of Computer Applications",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><path d="m8 7-5 5 5 ' +
            '5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    },
    {
        degree: "B.Sc",
        title: "Bachelor of Science",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><path d="M9 3h6M10 ' +
            "3v6l-6 10a1.5 1.5 0 0 0 1.3 " +
            "2.2h13.4A1.5 1.5 0 0 0 20 19L14 9V3M7 " +
            '15h10"/></svg>',
    },
    {
        degree: "B.Com",
        title: "Bachelor of Commerce",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><ellipse cx="12" ' +
            'cy="6" rx="8" ry="3"/><path d="M4 6v5c0 ' +
            "1.7 3.6 3 8 3 1.4 0 2.7-.2 3.8-.5M4 " +
            "11v5c0 1.7 3.6 3 8 3M20 6v5M16 " +
            '16h6m-3-3v6"/></svg>',
    },
    {
        degree: "MA",
        title: "Master of Arts",
        icon:
            '<svg viewBox="0 0 24 24" ' +
            'aria-hidden="true"><path d="M3 ' +
            "5.5c3.5-1 6.5-.5 9 " +
            "1.5v14c-2.5-2-5.5-2.5-9-1.5v-14ZM21 " +
            "5.5c-3.5-1-6.5-.5-9 1.5v14c2.5-2 " +
            '5.5-2.5 9-1.5v-14Z"/></svg>',
    },
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


              <a class="oe-nav-cta" href="#oe-programmes">
                Find a course <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </nav>

        <section class="oe-hero oe-hero-premium" id="oe-top">
          <video
            class="oe-hero-video"
            autoplay muted loop playsinline preload="metadata"
            poster="${onlineEducationHeroPoster}"
            aria-hidden="true" tabindex="-1"
          >
            <source src="${onlineEducationHeroVideo}" type="video/mp4">
          </video>

          <div class="oe-hero-inner">
            <div class="oe-hero-panel">
              <div class="oe-hero-copy">
                <p class="oe-hero-label"><span class="oe-hero-label-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m2 8 10-5 10 5-10 5L2 8Z"/><path d="M6 10v5c3.7 2.7 8.3 2.7 12 0v-5M22 8v6"/></svg></span> Online Education</p>
                <h1>Compare &amp; Choose<br>Your <span>Online Degree</span></h1>
                <p class="oe-hero-description">
                  Explore top online programmes like MBA, BBA, BCA and more from
                  trusted universities, all in one place.
                </p>

                <div class="oe-hero-actions">
                  <a class="oe-button oe-primary" href="#oe-programmes">Explore Programmes <span aria-hidden="true">→</span></a>
                  <a class="oe-button oe-hero-compare" href="#oe-programmes"><span aria-hidden="true">⚖</span> Compare Courses</a>
                </div>

                <div class="oe-hero-trust" aria-label="Online education benefits">
                  <span><i aria-hidden="true">♧</i>Top Universities</span>
                  <span><i aria-hidden="true">▱</i>100% Online</span>
                  <span><i aria-hidden="true">✧</i>Flexible Learning</span>
                </div>
              </div>

              <div class="oe-hero-student" aria-label="Student holding a laptop">
                <div class="oe-hero-orbit" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div class="oe-hero-student-frame">
                  <img src="${onlineEducationStudentPortrait}" alt="Student in a lavender sweater holding a laptop" loading="eager">
                </div>
                <span class="oe-hero-student-caption">Learn your way, wherever you are</span>
              </div>

              <div class="oe-hero-degrees" aria-label="Explore programmes by degree">
                ${degreeCards
                    .map(
                        (card) => `
                  <button class="oe-degree-card" type="button" data-degree-filter="${card.degree}" aria-label="Show ${card.degree} programmes">
                    <span class="oe-degree-icon" aria-hidden="true">${card.icon}</span>
                    <span class="oe-degree-copy"><strong>${card.degree}</strong><small>${card.title}</small></span>
                  </button>
                `,
                    )
                    .join("")}
              </div>

              <form id="oe-hero-search-form" class="oe-search-form oe-hero-search oe-premium-search" role="search">
                <label class="oe-hero-query-field">
                  <span class="oe-visually-hidden">Search programmes, courses or universities</span>
                  <i aria-hidden="true">⌕</i>
                  <input id="oe-hero-query" type="search" list="oe-programme-suggestions" placeholder="Try MBA, BBA, BCA or any programme..." autocomplete="off">
                  <datalist id="oe-programme-suggestions">
                    ${onlineEducationProgrammes
                        .map(
                            (programme) => `
                      <option value="${programme.title.replaceAll('"', "&quot;")}" label="${programme.providerName.replaceAll('"', "&quot;")}"></option>
                    `,
                        )
                        .join("")}
                  </datalist>
                </label>
                <label class="oe-hero-filter-field">
                  <span class="oe-visually-hidden">Education level</span>
                  <i aria-hidden="true">♙</i>
                  <select id="oe-hero-level"><option value="">All Levels</option>${levels.map((level) => `<option value="${level}">${level}</option>`).join("")}</select>
                </label>
                <label class="oe-hero-filter-field">
                  <span class="oe-visually-hidden">Destination</span>
                  <i aria-hidden="true">⌖</i>
                  <select id="oe-hero-destination"><option value="">All Destinations</option>${destinations.map((destination) => `<option value="${destination}">${destination}</option>`).join("")}</select>
                </label>
                <button class="oe-button oe-primary oe-submit" type="submit"><span aria-hidden="true">⌕</span> Search</button>
              </form>
            </div>
          </div>
        </section>


<section class="oe-section oe-popular oe-trending" id="oe-popular">
  <div class="oe-container">
    <div class="oe-section-head oe-trending-heading">
      <div>
        <p class="oe-eyebrow">TRENDING COURSES</p>
        <h2>Get Future-Ready with <span>AI</span></h2>
        <p>
          Explore popular learning topics and discover programmes
          from established online learning providers.
        </p>
      </div>

      <a class="oe-text-link" href="#oe-programmes">
        View all courses <span aria-hidden="true">→</span>
      </a>
    </div>

    <div class="oe-trending-carousel">
      <button
        type="button"
        class="oe-trending-arrow oe-trending-prev"
        aria-label="Previous courses"
        data-trending-prev
      >&#8592;</button>

      <div class="oe-trending-viewport">
        <div class="oe-trending-track" data-trending-track>
          ${[
              {
                  title: "Foundations of Computer Science",
                  provider: "Coursera",
                  subject: "Computer Science & IT",
                  level: "Short Course",
                  duration: "Self-paced",
                  initials: "CO",
                  image:
                      "https://images.unsplash.com/photo-151877" +
                      "0660439-4636190af475?auto=format&fit=cro" +
                      "p&w=900&q=85",
                  url: "https://www.coursera.org/browse/computer-science",
                  query: "Computer Science",
              },
              {
                  title: "Introduction to Artificial Intelligence",
                  provider: "edX",
                  subject: "Artificial Intelligence",
                  level: "Professional Certificate",
                  duration: "Check duration",
                  initials: "ED",
                  image:
                      "https://images.unsplash.com/photo-167744" +
                      "2136019-21780ecad995?auto=format&fit=cro" +
                      "p&w=900&q=85",
                  url: "https://www.edx.org/learn/artificial-intelligence",
                  query: "AI & Machine Learning",
              },
              {
                  title: "Data Analysis Essentials",
                  provider: "Coursera",
                  subject: "Data Science",
                  level: "Certificate",
                  duration: "Check duration",
                  initials: "CO",
                  image:
                      "https://images.unsplash.com/photo-155128" +
                      "8049-bebda4e38f71?auto=format&fit=crop&w" +
                      "=900&q=85",
                  url: "https://www.coursera.org/browse/data-science",
                  query: "Data Science",
              },
              {
                  title: "Business and Management: Core Concepts",
                  provider: "FutureLearn",
                  subject: "Business & Management",
                  level: "Short Course",
                  duration: "Check duration",
                  initials: "FL",
                  image:
                      "https://images.unsplash.com/photo-149736" +
                      "6754035-f200968a6e72?auto=format&fit=cro" +
                      "p&w=900&q=85",
                  url: "https://www.futurelearn.com/subjects/business-and-management-courses",
                  query: "Business",
              },
          ]
              .map(
                  (course) => `
            <article class="oe-trending-card">
              <div class="oe-trending-image-wrap">
                <img
                  class="oe-trending-image"
                  src="${course.image}"
                  alt="${course.subject} course"
                  loading="lazy"
                  onerror="this.style.display='none'"
                >
                <span class="oe-trending-logo">${course.initials}</span>
              </div>

              <div class="oe-trending-card-body">
                <p class="oe-trending-provider">${course.provider}</p>
                <p class="oe-programme-subject">${course.subject}</p>
                <h3>${course.title}</h3>

                <div class="oe-trending-meta">
                  <span>
                    <span aria-hidden="true">▤</span>
                    ${course.level}
                  </span>
                  <span>
                    <span aria-hidden="true">◷</span>
                    ${course.duration}
                  </span>
                </div>

                <div class="oe-trending-actions">
                  <a
                    class="oe-trending-view"
                    href="${course.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >View Program</a>


<button
  type="button"
  class="oe-trending-enquiry"
  data-enquire-course="${course.title}"
>
  Enroll
</button>

                </div>

                <button
                  type="button"
                  class="oe-trending-similar"
                  data-find-similar="${course.query}"
                >Find similar courses →</button>
              </div>
            </article>
          `,
              )
              .join("")}
        </div>
      </div>

      <button
        type="button"
        class="oe-trending-arrow oe-trending-next"
        aria-label="Next courses"
        data-trending-next
      >&#8594;</button>
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
                    [
                        "01",
                        "School learning",
                        "Subject-led practice and learning resources.",
                        "School",
                        "⌂",
                    ],
                    [
                        "02",
                        "Diploma programmes",
                        "Explore vocational and academic study routes.",
                        "Diploma",
                        "▤",
                    ],
                    [
                        "03",
                        "Bachelor’s degrees",
                        "Discover undergraduate learning pathways.",
                        "Bachelor's",
                        "◇",
                    ],
                    [
                        "04",
                        "Master’s degrees",
                        "Explore advanced postgraduate study.",
                        "Master's",
                        "✦",
                    ],
                    [
                        "05",
                        "MBA programmes",
                        "Find business and management study options.",
                        "MBA",
                        "↗",
                    ],
                    [
                        "06",
                        "PhD & doctoral",
                        "Explore research-led doctoral pathways.",
                        "PhD / Doctorate",
                        "⌘",
                    ],
                    [
                        "07",
                        "Online degrees",
                        "Browse degree discovery resources.",
                        "Online Degree",
                        "▣",
                    ],
                    [
                        "08",
                        "Professional certificates",
                        "Build knowledge through focused programmes.",
                        "Professional Certificate",
                        "✳",
                    ],
                    [
                        "09",
                        "Short courses",
                        "Learn a subject in a shorter format.",
                        "Short Course",
                        "◷",
                    ],
                    [
                        "10",
                        "Microcredentials",
                        "Explore compact learning achievements.",
                        "Microcredential",
                        "✣",
                    ],
                ]
                    .map(
                        ([n, title, description, level, icon]) => `
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
                `,
                    )
                    .join("")}
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
                          ${[
                              ...new Set(
                                  ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS.map((x) => x.country),
                              ),
                          ]
                              .map((country) => `<option>${country}</option>`)
                              .join("")}
                        </select>
                      </label>

                      <label class="oe-field">
                        <span>Education level</span>

                        <select id="oe-inst-level">
                          <option value="">All levels</option>
                          ${[
                              ...new Set(
                                  ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS.flatMap((x) => x.levels),
                              ),
                          ]
                              .map((level) => `<option>${level}</option>`)
                              .join("")}
                        </select>
                      </label>

                      <label class="oe-field">
                        <span>Subject</span>

                        <select id="oe-inst-subject">
                          <option value="">All subjects</option>
                          ${[
                              ...new Set(
                                  ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS.flatMap(
                                      (x) => x.subjects,
                                  ),
                              ),
                          ]
                              .map((subject) => `<option>${subject}</option>`)
                              .join("")}
                        </select>
                      </label>

                      <label class="oe-field">
                        <span>Study mode</span>

                        <select id="oe-inst-mode">
                          <option value="">All modes</option>
                          ${[
                              ...new Set(
                                  ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS.flatMap((x) => x.modes),
                              ),
                          ]
                              .map((mode) => `<option>${mode}</option>`)
                              .join("")}
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
                  ${ONLINE_EDUCATION_DISCOVERY_INSTITUTIONS.map(
                      (institution) => `
                    <article
                      class="oe-programme-card oe-course-card oe-institution-card"
                      data-country="${institution.country}"
                      data-levels="${institution.levels.join("|")}"
                      data-subjects="${institution.subjects.join("|")}"
                      data-modes="${institution.modes.join("|")}"
                    >
                      <div class="oe-course-card-main">

                        <div class="oe-course-card-media oe-institution-image-media">

                          ${
                              institution.imageUrl || INSTITUTION_CAMPUS_IMAGES[institution.id]
                                  ? `<img
                            class="oe-institution-campus-image"
                            src="${institution.imageUrl || INSTITUTION_CAMPUS_IMAGES[institution.id]}"
                            alt="Campus image for ${institution.name}; source review pending"
                            loading="lazy"
                            onerror="this.hidden=true; this.nextElementSibling.hidden=false"
                          >`
                                  : ""
                          }

                          <div
                            class="oe-course-card-monogram oe-institution-logo"
                            hidden
                            aria-hidden="true"
                          >
                            ${institution.name
                                .split(/\s+/)
                                .filter((word) => /^[A-Z]/.test(word))
                                .slice(0, 2)
                                .map((word) => word.charAt(0))
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

                          ${
                              institution.dataVerificationStatus === "needs-clarification"
                                  ? '<p class="oe-institution-review-note">Needs name/location confirmation</p>'
                                  : institution.dataVerificationStatus
                                    ? '<p class="oe-institution-review-note">Pending admin verification</p>'
                                    : ""
                          }





                          <div class="oe-course-card-tags">
                            ${institution.levels
                                .slice(0, 3)
                                .map(
                                    (level) => `
                              <span>${level}</span>
                            `,
                                )
                                .join("")}
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
                  `,
                  ).join("")}
                </div>

                    <div class="oe-institution-more" id="oe-institution-more" hidden>
                      <button
                        type="button"
                        class="oe-button oe-outline"
                        id="oe-institution-toggle"
                      >
                        Show all matching institutions
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






<section class="oe-section oe-popular oe-trending oe-ms-section" id="oe-popular">
  <div class="oe-container">
    <div class="oe-ms-heading">
      <h2>
        Master Generative AI and
        <span>get certified with Microsoft</span>
      </h2>
    </div>

    <div class="oe-ms-carousel">
      <button type="button" class="oe-ms-arrow" data-trending-prev
        aria-label="Previous courses">←</button>

      <div class="oe-ms-viewport">
        <div class="oe-ms-track" data-trending-track>
          ${[
              {
                  title: "Generative AI Mastery Certificate for Data Analysis",
                  description: "Learn to use ChatGPT, Power BI, and more",
                  imageTitle: "Generative AI for Data Analysis",
                  query: "generative AI data analysis",
              },
              {
                  title: "Build Foundational Generative AI Skills",
                  description: "Learn to use Neural Network, llm, and more",
                  imageTitle: "Generative AI for Software Development",
                  query: "generative AI software development",
              },
              {
                  title: "Introduction to Generative AI for Trainers",
                  description: "Explore Claude, Microsoft 365 Copilot, and more",
                  imageTitle: "Generative AI for Management",
                  query: "generative AI business management",
              },
              {
                  title: "Develop Generative AI Apps on Microsoft Foundry",
                  description: "Explore ChatGPT, DALL-E, and more",
                  imageTitle: "Generative AI for Content Creation",
                  query: "generative AI content creation",
              },
          ]
              .map(
                  (course, index) => `
            <article class="oe-ms-card">
              <a class="oe-ms-banner"
                href="https://learn.microsoft.com/en-us/training/"
                target="_blank" rel="noopener noreferrer"
                aria-label="Explore Microsoft Learn">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=850&q=85"
                  alt="${course.imageTitle}"
                  loading="lazy">
                <span class="oe-ms-banner-shade"></span>
                <span class="oe-ms-banner-copy">
                  <small>Microsoft Learn</small>
                  <strong>${course.imageTitle}</strong>
                </span>
              </a>

              <div class="oe-ms-card-body">
                <p class="oe-ms-provider">Microsoft</p>
                <h3>${course.title}</h3>
                <p class="oe-ms-description">${course.description}</p>

                <div class="oe-ms-meta">
                  <span>▤ &nbsp; Certificate</span>
                  <span>◷ &nbsp; 2 Months</span>
                </div>

                <div class="oe-ms-actions">
                  <a class="oe-ms-view"
                    href="https://learn.microsoft.com/en-us/training/"
                    target="_blank" rel="noopener noreferrer">
                    View Program
                  </a>
                  <button class="oe-ms-enquire" type="button"
                    data-enquire-course="${course.title}">
                    Enquire
                  </button>
                </div>
              </div>
            </article>
          `,
              )
              .join("")}
        </div>
      </div>

      <button type="button" class="oe-ms-arrow" data-trending-next
        aria-label="Next courses">→</button>
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
                ${subjects
                    .map(
                        (subject, index) => `
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
                `,
                    )
                    .join("")}
              </div>
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
                    ${levels
                        .map(
                            (level) => `
                      <option>${level}</option>
                    `,
                        )
                        .join("")}
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
                        "Global",
                    ]
                        .map(
                            (country) => `
                      <option>${country}</option>
                    `,
                        )
                        .join("")}
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
                      [
                          "Flexibility",
                          "May offer flexible schedules; check format",
                          "Mix of online and in-person elements",
                          "Often follows a campus timetable",
                      ],
                      [
                          "Campus attendance",
                          "May not be required; verify programme",
                          "Some attendance may be required",
                          "Usually includes campus attendance",
                      ],
                      [
                          "Tuition & additional costs",
                          "Compare total and recurring fees",
                          "Check tuition and travel needs",
                          "Check tuition, housing and other costs",
                      ],
                      [
                          "Instructor interaction",
                          "Format varies by provider",
                          "Online and in-person formats vary",
                          "Often includes in-person sessions",
                      ],
                      [
                          "Duration & assessment",
                          "Check the programme details",
                          "Check delivery and assessment schedule",
                          "Check course structure and assessment",
                      ],
                      [
                          "Networking",
                          "Online community varies",
                          "Can include online and campus contact",
                          "Campus-based opportunities vary",
                      ],
                      [
                          "Recognition & eligibility",
                          "Verify with institution and regulator",
                          "Verify specific award and requirements",
                          "Verify specific award and requirements",
                      ],
                  ]
                      .map(
                          (row) => `
                    <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
                  `,
                      )
                      .join("")}
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
                  ["Academic progression to a degree", "Bachelor's"],
              ]
                  .map(
                      ([title, filter], index) => `
                <a
                  href="#oe-programmes"
                  ${filter === "Bachelor's" ? `data-level="${filter}"` : `data-subject="${filter}"`}
                >
                  <span>0${index + 1}</span>
                  <b>${title}</b>
                  <i>Explore →</i>
                </a>
              `,
                  )
                  .join("")}
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
                <p class="oe-eyebrow">THE STEPINSTUDENTS APPROACH</p>
                <h2>How discovery works</h2>
                <p>
                  Use StepInStudents to explore options, then confirm programme
                  details with the source.
                </p>
              </div>
            </div>

            <div class="oe-steps">
              ${[
                  ["01", "Discover", "Explore programmes and learning resources."],
                  ["02", "Filter", "Narrow choices by goals, level, budget and study mode."],
                  ["03", "Compare", "Review the details that matter to you."],
                  ["04", "Verify", "Visit the official provider to confirm details or apply."],
              ]
                  .map(
                      ([number, title, description]) => `
                <article>
                  <span>${number}</span>
                  <h3>${title}</h3>
                  <p>${description}</p>
                </article>
              `,
                  )
                  .join("")}
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
                  [
                      "What is online education?",
                      "Learning delivered partly or fully " +
                          "through digital tools. The teaching, " +
                          "assessment and support format depends " +
                          "on the provider.",
                  ],
                  [
                      "What is the difference between an online course and an online degree?",
                      "A course may teach a focused subject " +
                          "and may offer a certificate. A degree " +
                          "is a formal academic qualification " +
                          "awarded by an institution after " +
                          "completing its requirements.",
                  ],
                  [
                      "Can I earn a Bachelor’s or Master’s degree online?",
                      "Some institutions offer online degree " +
                          "programmes. Check the institution’s " +
                          "official course page for format, " +
                          "eligibility, fees and award details.",
                  ],
                  [
                      "Are online degrees recognized?",
                      "Recognition depends on the awarding " +
                          "institution, programme and " +
                          "jurisdiction. Check with the relevant " +
                          "official regulator or recognition " +
                          "authority.",
                  ],
                  [
                      "How can I compare tuition fees?",
                      "Compare amounts in the original " +
                          "currency and note whether each fee is " +
                          "total, annual or per term. Include " +
                          "additional costs where published.",
                  ],
                  [
                      "Can I study for free online?",
                      "Some platforms publish free learning " +
                          "resources or course access. " +
                          "Certificates, assessments or other " +
                          "services may have separate costs; " +
                          "confirm with the provider.",
                  ],
                  [
                      "What is distance learning?",
                      "Study delivered with learners and " +
                          "instructors separated by location. It " +
                          "can include online, print or other " +
                          "learning materials.",
                  ],
                  [
                      "What is the difference between online, hybrid and on-campus study?",
                      "Online learning is primarily remote, " +
                          "hybrid combines remote and in-person " +
                          "elements, and on-campus study typically " +
                          "involves attendance at a physical " +
                          "campus. Exact formats vary.",
                  ],
                  [
                      "How do I compare universities?",
                      "Review official programme details, " +
                          "entry requirements, delivery, tuition " +
                          "and recognition. Consult relevant " +
                          "official regulators for recognition " +
                          "checks.",
                  ],
                  [
                      "How can I check whether a programme is legitimate?",
                      "Confirm the awarding institution and " +
                          "programme through official institution " +
                          "pages and the relevant education " +
                          "regulator or recognition database.",
                  ],
              ]
                  .map(
                      ([question, answer]) => `
                <details>
                  <summary>
                    ${question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>${answer}</p>
                </details>
              `,
                  )
                  .join("")}
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
