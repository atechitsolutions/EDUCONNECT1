const COUNTRY_PHOTOS = {
    "united states":
        "https://images.unsplash.com/photo-168553" +
        "2735950-5ecf5293d254?auto=format&fit=cro" +
        "p&w=1200&q=85",
    "united kingdom":
        "https://images.unsplash.com/photo-151363" +
        "5269975-59663e0ac1ad?auto=format&fit=cro" +
        "p&w=1200&q=85",
    canada:
        "https://images.unsplash.com/photo-151793" +
        "5706615-2717063c2225?auto=format&fit=cro" +
        "p&w=1200&q=85",
    australia:
        "https://images.unsplash.com/photo-152755" +
        "7561443-e64662fc5562?auto=format&fit=cro" +
        "p&w=1200&q=85",
    germany:
        "https://images.unsplash.com/photo-146726" +
        "9204594-9661b134dd2b?auto=format&fit=cro" +
        "p&w=1200&q=85",
    belgium:
        "https://images.unsplash.com/photo-157288" +
        "6071978-7c60b5b3e506?auto=format&fit=cro" +
        "p&w=1200&q=85",
    france:
        "https://images.unsplash.com/photo-150260" +
        "2898657-3e91760cbb34?auto=format&fit=cro" +
        "p&w=1200&q=85",
    ireland:
        "https://images.unsplash.com/photo-159008" +
        "9415225-401ed6f9db8e?auto=format&fit=cro" +
        "p&w=1200&q=85",
    "new zealand":
        "https://images.unsplash.com/photo-150769" +
        "9622108-4be3abd695ad?auto=format&fit=cro" +
        "p&w=1200&q=85",
    italy:
        "https://images.unsplash.com/photo-166817" +
        "1321834-658179e37f5e?auto=format&fit=cro" +
        "p&w=1200&q=85",
    netherlands:
        "https://images.unsplash.com/photo-153688" +
        "0756060-98a6a140f0a7?auto=format&fit=cro" +
        "p&w=1200&q=85",
    "united arab emirates":
        "https://images.unsplash.com/photo-159727" +
        "8315489-a4b8b67659f0?auto=format&fit=cro" +
        "p&w=1200&q=85",
    hungary:
        "https://images.unsplash.com/photo-166428" +
        "9496602-378f6e666f7e?auto=format&fit=cro" +
        "p&w=1200&q=85",
    finland:
        "https://images.unsplash.com/photo-152129" +
        "2270410-a8c4d716d518?auto=format&fit=cro" +
        "p&w=1200&q=85",
};
const CACHE_PREFIX = "educonnect-real-campus-photo-v1:";

export function getCountryPhoto(country) {
    const value = String(country || "")
        .trim()
        .toLowerCase();
    const aliases = {
        usa: "united states",
        us: "united states",
        uk: "united kingdom",
        england: "united kingdom",
        uae: "united arab emirates",
    };
    return (
        COUNTRY_PHOTOS[aliases[value] || value] ||
        "https://images.unsplash.com/photo-152129" +
            "2270410-a8c4d716d518?auto=format&fit=cro" +
            "p&w=1200&q=85"
    );
}

function normalize(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}
function cached(key) {
    try {
        return JSON.parse(localStorage.getItem(CACHE_PREFIX + key) || "null");
    } catch {
        return null;
    }
}
function cache(key, value) {
    try {
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
    } catch {
        /* Storage can be unavailable in private browsing. */
    }
}

async function searchCommons(query, tokens, excludedUrls = new Set()) {
    const params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: query,
        gsrnamespace: "6",
        gsrlimit: "12",
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: "1200",
        format: "json",
        origin: "*",
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
        headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const forbidden = /logo|crest|seal|flag|map|icon|coat of arms|wordmark/i;
    const pages = Object.values(data.query?.pages || {}).filter(
        (page) => page.imageinfo?.[0]?.thumburl && !forbidden.test(page.title || ""),
    );
    pages.sort((a, b) => {
        const score = (page) => {
            const title = normalize(page.title);
            return tokens.reduce(
                (sum, token) =>
                    sum + (token.length > 2 && title.includes(token) ? token.length : 0),
                0,
            );
        };
        return score(b) - score(a);
    });
    const page = pages.find((candidate) => !excludedUrls.has(candidate.imageinfo[0].thumburl));
    return page
        ? { url: page.imageinfo[0].thumburl, title: page.title.replace(/^File:/, "") }
        : null;
}

export async function getRealInstitutionPhoto({ name, city, country, excludeUrls = [] }) {
    const safeName = String(name || "").trim();
    const safeCity = String(city || "").trim();
    const safeCountry = String(country || "").trim();
    const key = normalize(`${safeName}|${safeCity}|${safeCountry}`);
    const excluded = new Set(excludeUrls);
    const previous = cached(key);
    if (previous && previous !== "none" && !excluded.has(previous.url)) return previous;
    if (previous === "none") return null;
    const place = [safeCity, safeCountry].filter(Boolean).join(" ");
    const queries = [
        safeName && `${safeName} campus`,
        place && `${place} university campus`,
        place && `${place} university building`,
    ].filter(Boolean);
    const tokens = normalize(`${safeName} ${safeCity}`)
        .split(" ")
        .filter((token) => token.length > 2);
    try {
        for (const query of queries) {
            const photo = await searchCommons(query, tokens, excluded);
            if (photo) {
                cache(key, photo);
                return photo;
            }
        }
    } catch {
        /* The country image remains visible when Commons cannot be reached. */
    }
    cache(key, "none");
    return null;
}
