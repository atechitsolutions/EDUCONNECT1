import preschoolRecords from "./preschool.json";
import playSchoolRecords from "./playSchool.json";
import imageOverrides from "./earlyLearningImageOverrides.json";

const imageFallback = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"><rect width="1200" height="600" fill="#e8f3ff"/><text x="600" y="310" text-anchor="middle" fill="#49627e" font-family="Arial" font-size="34">Representative photo unavailable</text></svg>')}`;
const recordsByGroup = {
    preschool: preschoolRecords,
    playschool: playSchoolRecords
};

export function getLegacyEarlyLearningImage(id) {
    return imageOverrides[id] || {};
}

export function getProvidedEarlyLearningListings(group) {
    return (recordsByGroup[group] || [])
        .map(record => ({
            ...record,
            program: record.programme || "",
            rating: "",
            reviews: "",
            score: "",
            ranking: record.ranking || "",
            highlight: String(record.overview || "").split(/(?<=[.!?])\s+/)[0] || record.note || "",
            imageFallback
        }));
}
