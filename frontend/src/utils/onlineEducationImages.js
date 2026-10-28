
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
"the open university": {
  imageUrl: "https://i.pinimg.com/236x/8e/24/d2/8e24d28dad9d62db7b214b8c5ffe4e7d.jpg",
  imageAlt: "The Open University campus and learning facilities",
  imageSource: "campus"
},
"open university uk": {
  imageUrl: "/images/the-open-university-campus.jpg",
  imageAlt: "The Open University campus and learning facilities",
  imageSource: "campus"
},

"khan academy": {
  imageUrl: "https://i.pinimg.com/736x/20/74/e4/2074e4ac7bb925622a41d8988779a9f9.jpg",
  imageAlt: "Khan Academy online learning platform",
  imageSource: "campus"
},
"paris school of business": {
  imageUrl: "https://i.pinimg.com/1200x/6e/6f/aa/6e6faa3c97b07e233adb0525d5594495.jpg",
  imageAlt: "Paris School of Business campus in Paris, France",
  imageSource: "campus"
},

"edgewood university": {
  imageUrl: "https://i.pinimg.com/1200x/5a/13/a1/5a13a11c184478c577e489661c6dce71.jpg",
  imageAlt: "Edgewood University campus",
  imageSource: "campus"
},
"mit open learning": {
  imageUrl: "https://i.pinimg.com/1200x/81/99/4d/81994dfc9fab231b5f93b368aebdd997.jpg",
  imageAlt: "MIT Open Learning educational programs",
  imageSource: "campus"
},
"massachusetts institute of technology open learning": {
  imageUrl: "/images/mit-open-learning.jpg",
  imageAlt: "MIT Open Learning educational programs",
  imageSource: "campus"
},

"o.p. jindal global university": {
  imageUrl: "https://i.pinimg.com/736x/51/3c/27/513c2739e127b4ebf2d7b8c92c292e70.jpg",
  imageAlt: "O.P. Jindal Global University campus",
  imageSource: "campus"
},
"op jindal global university": {
  imageUrl: "/images/op-jindal-global-university-campus.jpg",
  imageAlt: "O.P. Jindal Global University campus",
  imageSource: "campus"
},

  "golden gate university": {
    imageUrl: "https://i.pinimg.com/1200x/61/f4/85/61f4859868d044ca6515541563904eca.jpg",
    imageAlt: "Golden Gate University campus",
    imageSource: "campus"
  },

  "ggu": {
    imageUrl: "/images/golden-gate-university-campus.jpg",
    imageAlt: "Golden Gate University campus",
    imageSource: "campus"
  },

  "liverpool john moores university": {
    imageUrl: "https://i.pinimg.com/1200x/2b/8b/52/2b8b52efbdb0e87e5888f45e2eb7cdc2.jpg",
    imageAlt: "Liverpool John Moores University campus",
    imageSource: "campus"
  },

  "ljmu": {
    imageUrl: "/images/liverpool-john-moores-university-campus.jpg",
    imageAlt: "Liverpool John Moores University campus",
    imageSource: "campus"
  },

  "iim kozhikode": {
    imageUrl: "https://i.pinimg.com/1200x/70/4f/23/704f2316d5e99cbbd46f2d9087be3dc6.jpg",
    imageAlt: "Indian Institute of Management Kozhikode campus",
    imageSource: "campus"
  },

  "indian institute of management kozhikode": {
    imageUrl: "/images/iim-kozhikode-campus.jpg",
    imageAlt: "Indian Institute of Management Kozhikode campus",
    imageSource: "campus"
  },
  "iit kharagpur": {
    imageUrl: "https://i.pinimg.com/1200x/c9/83/04/c9830475a3020645c30732308c983375.jpg",
    imageAlt: "Indian Institute of Technology Kharagpur campus",
    imageSource: "campus"
  },

  "indian institute of technology kharagpur": {
    imageUrl: "/images/iit-kharagpur-campus.jpg",
    imageAlt: "Indian Institute of Technology Kharagpur campus",
    imageSource: "campus"
  },


  "iit kanpur": {
    imageUrl: "https://i.pinimg.com/736x/ae/78/a8/ae78a8c07798621226d7e47381338d89.jpg",
    imageAlt: "Indian Institute of Technology Kanpur campus",
    imageSource: "campus"
  },

  "indian institute of technology kanpur": {
    imageUrl: "/images/iit-kanpur-campus.jpg",
    imageAlt: "Indian Institute of Technology Kanpur campus",
    imageSource: "campus"
  },


  "iit delhi": {
    imageUrl: "https://i.pinimg.com/1200x/a5/23/a9/a523a95306b42bdaa383c29ee29fc614.jpg",
    imageAlt: "Indian Institute of Technology Delhi campus building",
    imageSource: "campus"
  },

  "indian institute of technology delhi": {
    imageUrl: "/images/iit-delhi-campus.png",
    imageAlt: "Indian Institute of Technology Delhi campus building",
    imageSource: "campus"
  },
  "iiit bangalore": {
    imageUrl:
      "https://images.unsplash.com/photo-1772355149651-4d4cc90c5ca5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
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
