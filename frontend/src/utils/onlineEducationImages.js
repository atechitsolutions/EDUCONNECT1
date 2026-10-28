
/**
 * Online Education institution image mapping.
 *
 * Priority:
 * 1. Verified institution-specific campus photograph.
 * 2. Institution-specific website logo/favicon.
 * 3. Empty image URL if the institution cannot be identified.
 *
 * No random subject images or generic Unsplash images are used.
 */

const INSTITUTION_IMAGES = {
  "iiit bangalore": {
    imageUrl:
      "https://sclab.iiitb.ac.in/wp-content/uploads/2022/12/Picture1-2-396x360.jpg",
    imageAlt: "International Institute of Information Technology Bangalore campus",
    imageSource: "campus"
  },

  "international institute of information technology bangalore": {
    imageUrl:
      "https://sclab.iiitb.ac.in/wp-content/uploads/2022/12/Picture1-2-396x360.jpg",
    imageAlt: "International Institute of Information Technology Bangalore campus",
    imageSource: "campus"
  }
};

/**
 * Normalizes institution names for matching.
 */
function normalizeInstitutionName(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\b(the|university|college)\b/g, (match) => match)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Gets the institution name from the programme record.
 * Add other property names here if your dataset uses different fields.
 */
function getInstitutionName(programme = {}) {
  return (
    programme.providerName ||
    programme.institutionName ||
    programme.institution ||
    programme.universityName ||
    programme.provider ||
    programme.schoolName ||
    programme.collegeName ||
    ""
  ).trim();
}

/**
 * Finds a verified institution image using the institution name.
 */
function getMappedInstitutionImage(institutionName) {
  const normalizedName = normalizeInstitutionName(institutionName);

  if (!normalizedName) {
    return null;
  }

  // Exact name match first.
  if (INSTITUTION_IMAGES[normalizedName]) {
    return INSTITUTION_IMAGES[normalizedName];
  }

  // Allow a configured institution name to match a longer provider name.
  const matchedKey = Object.keys(INSTITUTION_IMAGES).find((key) => {
    return (
      normalizedName.includes(key) ||
      key.includes(normalizedName)
    );
  });

  return matchedKey ? INSTITUTION_IMAGES[matchedKey] : null;
}

/**
 * Finds an official website URL from the programme record.
 */
function getInstitutionWebsite(programme = {}) {
  const possibleUrls = [
    programme.officialInstitutionUrl,
    programme.institutionUrl,
    programme.providerUrl,
    programme.website,
    programme.officialProgramUrl,
    programme.url
  ];

  for (const value of possibleUrls) {
    if (!value || typeof value !== "string") {
      continue;
    }

    try {
      const url = new URL(
        value.startsWith("http://") || value.startsWith("https://")
          ? value
          : `https://${value}`
      );

      // Ignore invalid or non-web URLs.
      if (url.hostname && url.hostname.includes(".")) {
        return url;
      }
    } catch {
      // Try the next available URL.
    }
  }

  return null;
}

/**
 * Creates an institution-specific logo fallback.
 * This is a logo/favicon, NOT a campus photograph.
 */
function makeInstitutionLogoUrl(websiteUrl) {
  if (!websiteUrl) {
    return "";
  }

  const domain = websiteUrl.hostname.replace(/^www\./, "");

  return (
    "https://www.google.com/s2/favicons?domain=" +
    encodeURIComponent(domain) +
    "&sz=256"
  );
}

/**
 * Returns the image details for one programme.
 */
export function getProgrammeImage(programme = {}) {
  const institutionName = getInstitutionName(programme);

  // Preserve an existing image only if it is explicitly supplied
  // and is not one of the old generic Unsplash subject photographs.
  const existingImage =
    programme.imageUrl ||
    programme.image ||
    "";

  if (
    existingImage &&
    !existingImage.includes("images.unsplash.com/")
  ) {
    return {
      imageUrl: existingImage,
      imageAlt:
        programme.imageAlt ||
        `${institutionName || "Institution"} image`,
      imageSource: "existing"
    };
  }

  // Prefer a verified institution-specific campus image.
  const mappedImage = getMappedInstitutionImage(institutionName);

  if (mappedImage) {
    return {
      ...mappedImage,
      imageAlt:
        mappedImage.imageAlt ||
        `${institutionName} campus`
    };
  }

  // Otherwise use the institution's own website logo/favicon.
  const websiteUrl = getInstitutionWebsite(programme);
  const logoUrl = makeInstitutionLogoUrl(websiteUrl);

  if (logoUrl) {
    return {
      imageUrl: logoUrl,
      imageAlt: `${institutionName || "Institution"} logo`,
      imageSource: "logo"
    };
  }

  // Do not substitute an unrelated photograph.
  return {
    imageUrl: "",
    imageAlt: `${institutionName || "Institution"} image unavailable`,
    imageSource: "unavailable"
  };
}

/**
 * Adds institution-specific image properties to all programme records.
 */
export function addProgrammeImages(programmes = []) {
  if (!Array.isArray(programmes)) {
    return [];
  }

  return programmes.map((programme) => {
    const image = getProgrammeImage(programme);

    return {
      ...programme,
      imageUrl: image.imageUrl,
      image: image.imageUrl,
      imageAlt: image.imageAlt,
      imageSource: image.imageSource
    };
  });
}
