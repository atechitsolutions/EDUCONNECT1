import { onlineEducationInstitutions } from "./onlineEducationInstitutions.js";
import { onlineEducationProgrammes } from "./onlineEducationProgrammes.js";

const levels = [
    ["School learning", "Subject-led practice and learning resources.", "School", "⌂"],
    ["Diploma programmes", "Explore vocational and academic study routes.", "Diploma", "▤"],
    ["Bachelor’s degrees", "Discover undergraduate learning pathways.", "Bachelor's", "◇"],
    ["Master’s degrees", "Explore advanced postgraduate study.", "Master's", "✦"],
    ["MBA programmes", "Find business and management study options.", "MBA", "↗"],
    ["PhD & doctoral", "Explore research-led doctoral pathways.", "PhD / Doctorate", "⌘"],
    ["Online degrees", "Browse degree discovery resources.", "Online Degree", "▣"],
    ["Professional certificates", "Build knowledge through focused programmes.", "Professional Certificate", "✳"],
    ["Short courses", "Learn a subject in a shorter format.", "Short Course", "◷"],
    ["Microcredentials", "Explore compact learning achievements.", "Microcredential", "✣"]
];

const subjects = [
    "AI & Machine Learning", "Data Science", "Business", "Engineering", "Healthcare",
    "Finance", "Digital Marketing", "Cybersecurity", "Design", "Psychology", "Education"
];

const popularTopics = [
    ["Foundations of Computer Science", "Computer Science & IT", "Short Course", "Self-paced", "Computer Science", "https://www.coursera.org/browse/computer-science"],
    ["Introduction to Artificial Intelligence", "Artificial Intelligence", "Professional Certificate", "Check provider website", "AI & Machine Learning", "https://www.edx.org/learn/artificial-intelligence"],
    ["Data Analysis Essentials", "Data Science", "Certificate", "Check provider website", "Data Science", "https://www.coursera.org/browse/data-science"],
    ["Business and Management: Core Concepts", "Business & Management", "Short Course", "Check provider website", "Business", "https://www.futurelearn.com/subjects/business-and-management-courses"]
];

const platforms = [
    ["School", "01 · SCHOOL", "Find subject-led lessons, practice resources and short courses for school-age learners.", "https://www.coursera.org/", "School"],
    ["College Diploma", "02 · COLLEGE DIPLOMA", "Explore course and provider catalogues for diploma-level study options.", "https://www.coursera.org/", "Diploma"],
    ["Bachelor’s", "03 · BACHELOR’S", "Compare undergraduate discovery listings, then verify awards and entry requirements.", "https://www.studyportals.com/", "Bachelor's"],
    ["Master’s", "04 · MASTER’S", "Search postgraduate opportunities and confirm format, fees and requirements with institutions.", "https://www.studyportals.com/", "Master's"],
    ["PhD", "05 · DOCTORAL STUDY", "Discover doctoral pathways and check research fit, supervision and admissions with each university.", "https://www.studyportals.com/", "PhD / Doctorate"],
    ["Online Degrees", "06 · ONLINE DEGREES", "Explore degree discovery services and provider catalogues; check the awarding institution before applying.", "https://www.distancelearningportal.com/", "Online Degree"],
    ["Compare countries", "07 · COUNTRY COMPARISON", "Start a destination search, then compare programme availability and costs using current official sources.", "https://www.studyportals.com/", ""],
    ["Compare universities", "08 · UNIVERSITY COMPARISON", "Explore institution information and rankings where published, and review each programme on its official page.", "https://www.studyportals.com/", ""]
];

const pathways = [
    ["Beginner to software development", "Computer Science", ""],
    ["Foundations to data analysis", "Data Science", ""],
    ["AI & machine learning fundamentals", "Artificial Intelligence", ""],
    ["Digital marketing career discovery", "Marketing", ""],
    ["Business & management", "Business & Management", ""],
    ["Cybersecurity foundations", "Cybersecurity", ""],
    ["Academic progression to a degree", "", "Bachelor's"]
];

export const onlineEducationDefaultCards = [
    ...levels.map(([title, description, level, subtitle], index) => ({
        id: `default-level-${String(index + 1).padStart(2, "0")}`,
        section: "levels", title, description, level, subtitle, needsImage: true
    })),
    ...subjects.map((title, index) => ({
        id: `default-subject-${String(index + 1).padStart(2, "0")}`,
        section: "subjects", title, subject: title, description: "Explore programmes in this subject area.", subtitle: "✦"
    })),
    ...popularTopics.map(([title, subject, level, duration, filter, link], index) => ({
        id: `default-popular-${String(index + 1).padStart(2, "0")}`,
        section: "popular", title, subject, level, duration, subtitle: filter, link,
        provider: subject, description: "Illustrative topic link · no fee or certificate claim."
    })),
    ...platforms.map(([title, subtitle, description, link, level], index) => ({
        id: `default-platform-${String(index + 1).padStart(2, "0")}`,
        section: "platforms", title, subtitle, description, link, level, needsImage: true
    })),
    ...pathways.map(([title, subject, level], index) => ({
        id: `default-pathway-${String(index + 1).padStart(2, "0")}`,
        section: "pathways", title, subject, level, description: "Explore learning options for this pathway.", needsImage: true
    })),
    ...onlineEducationInstitutions.map((institution) => ({
        id: `default-institution-${institution.id}`,
        section: "institutions",
        title: institution.name,
        provider: institution.city,
        description: institution.programmeNote,
        link: institution.url,
        country: institution.country,
        level: institution.levels.join("|") || "Online Degree",
        subject: institution.subjects.join("|") || "Other",
        mode: institution.modes.join("|") || "Fully online"
    })),
    ...onlineEducationProgrammes.map((programme) => ({
        id: programme.id,
        section: "programmes",
        title: programme.title,
        provider: programme.providerName,
        description: "Illustrative discovery link · verify details with the provider.",
        link: programme.officialProgramUrl,
        subject: programme.subject,
        level: programme.educationLevel,
        qualification: programme.qualificationType,
        mode: programme.studyMode,
        country: programme.country,
        duration: programme.duration
    }))
];
