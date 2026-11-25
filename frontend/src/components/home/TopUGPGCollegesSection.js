import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";
import domesticInstitutionDirectory from "../../data/domestic-college-directory.json";
import institutionSiteData from "../../data/domestic-institution-site-data.json";
import domesticCampusPhotos from "../../data/domestic-college-campus-photos.json";
import domesticPhotoSources from "../../data/domestic-college-photo-sources.json";

export function TopUGPGCollegesSection() {
    const usableCampusImage = (value) =>
        value &&
        !/(?:blank\.gif|placeholder|no[-_]?image|facebook\.com\/tr|campus[-_]?placement|accreditation|blog\.png|\/logo[-_.?])/i.test(
            value,
        )
            ? String(value).replaceAll("&amp;", "&")
            : "";
    const campusImagesFor = (code) => {
        const site = institutionSiteData[code];
        return [
            ...new Set(
                [site?.campusImage, domesticCampusPhotos[code], verifiedCampusPhotos[code]]
                    .map(usableCampusImage)
                    .filter(Boolean),
            ),
        ];
    };
    const officialWebsiteFor = (code) => {
        const mappedDomain = officialInstitutionDomains[code];
        if (mappedDomain) return `https://${mappedDomain}`;
        const value = institutionSiteData[code]?.officialDomain;
        if (!value) return "";
        try {
            const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
            if (
                /\.(?:jpe?g|png|gif|webp|svg)$/i.test(url.pathname) ||
                /collegebatch|collegedunia|shiksha|colleges18|vidyavision|kollegeapply/i.test(
                    url.hostname,
                )
            )
                return "";
            return url.origin;
        } catch {
            return "";
        }
    };
    const directoryOverviewFor = (college, record) => {
        const category = String(
            college.category ||
                (record?.type === "UNIVERSITY"
                    ? "University"
                    : record?.type === "COLLEGE"
                      ? "College"
                      : "Education institution"),
        ).toLowerCase();
        const location =
            [record?.city || college.location, record?.state].filter(Boolean).join(", ") || "India";
        return `${college.name} is listed as a ${category} in ${location}. Browse its institution profile to review the available study options and campus information. Check the official website for current programmes, eligibility and admissions details.`;
    };

    const featuredUgColleges = [
        {
            name: "University of Delhi",
            type: "Central University",
            category: "University",
            program: "B.Com",
            location: "New Delhi",
        },

        {
            name: "Indian Institute of Science",
            type: "Research University",
            category: "Research University",
            program: "B.Sc",
            location: "Bengaluru",
        },

        {
            name: "Jawaharlal Nehru University",
            type: "Central University",
            category: "University",
            program: "BA",
            location: "New Delhi",
        },

        {
            name: "Banaras Hindu University",
            type: "Central University",
            category: "University",
            program: "B.Sc",
            location: "Varanasi",
        },

        {
            name: "University of Mumbai",
            type: "Public University",
            category: "University",
            program: "B.Com",
            location: "Mumbai",
        },

        {
            name: "Christ University",
            shortName: "CHRIST",
            type: "Private University",
            category: "University",
            program: "BBA",
            courses: "BBA • BCA • B.Com • BA",
            location: "Bengaluru",
        },

        {
            name: "Manipal Academy of Higher Education",
            type: "Deemed University",
            category: "University",
            program: "B.Tech",
            location: "Manipal",
        },
    ];

    const featuredPgColleges = [
        {
            name: "IIM Ahmedabad",
            type: "Management Institute",
            category: "Management Institute",
            program: "MBA",
            location: "Ahmedabad",
        },

        {
            name: "IIM Bangalore",
            type: "Management Institute",
            category: "Management Institute",
            program: "MBA",
            location: "Bengaluru",
        },

        {
            name: "IIM Calcutta",
            type: "Management Institute",
            category: "Management Institute",
            program: "MBA",
            location: "Kolkata",
        },

        {
            name: "University of Delhi",
            type: "Central University",
            category: "University",
            program: "M.Com",
            location: "New Delhi",
        },

        {
            name: "Jawaharlal Nehru University",
            type: "Central University",
            category: "University",
            program: "M.A.",
            location: "New Delhi",
        },

        {
            name: "IIT Delhi",
            type: "Technical Institute",
            category: "Institute of Technology",
            program: "M.Tech",
            location: "New Delhi",
        },

        {
            name: "IIT Bombay",
            type: "Technical Institute",
            category: "Institute of Technology",
            program: "M.Tech",
            location: "Mumbai",
        },

        {
            name: "Banaras Hindu University",
            type: "Central University",
            category: "University",
            program: "M.Com",
            location: "Varanasi",
        },
    ];

    const officialInstitutionDomains = {
        "EC-IN-UN-AMITY-NOIDA": "amity.edu",
        "EC-IN-UN-AMITY-MAHARASHTRA": "amity.edu",
        "EC-IN-UN-AMITY-RAJASTHAN": "amity.edu",
        "EC-IN-UN-AMITY-HARYANA": "amity.edu",
        "EC-IN-UN-AMITY-TELANGANA": "amity.edu",
        "EC-IN-UN-AMITY-PUNJAB": "amity.edu",
        "EC-IN-UN-PARUL": "paruluniversity.ac.in",
        "EC-IN-UN-BENNETT": "bennett.edu.in",
        "EC-IN-UN-NIMS": "nimsuniversity.org",
        "EC-IN-UN-UPES": "upes.ac.in",
        "EC-IN-UN-VGU": "vgu.ac.in",
        "EC-IN-UN-IILM": "iilm.edu.in",
        "EC-IN-COL-DOON-BUSINESS": "doonbusinessschool.com",
        "EC-IN-UN-JECRC": "jecrcuniversity.edu.in",
        "EC-IN-COL-PODDAR": "poddarinstitute.org",
        "EC-IN-UN-FUTURE": "futureuniversity.in",
        "EC-IN-UN-ALLIANCE": "alliance.edu.in",
        "EC-IN-UN-LPU": "lpu.in",
        "EC-IN-UN-JKLU": "jklu.edu.in",
        "EC-IN-COL-LLOYD": "lloydcollege.in",
        "EC-IN-UN-SPSU": "spsu.ac.in",
        "EC-IN-COL-SPSU": "spsu.ac.in",
        "EC-IN-UN-SAGE-INDORE": "sageu.org",
        "EC-IN-UN-RENAISSANCE": "renaissance.ac.in",
        "EC-IN-COL-RCCM": "rccmindore.com",
        "EC-IN-COL-IIL": "indoreinstituteoflaw.org",
        "EC-IN-COL-IDYLLIC": "idyllicinstitute.com",
        "EC-IN-COL-IIST": "indoreinstitute.com",
        "EC-IN-COL-PIMR-INDORE": "pimrindore.ac.in",
        "EC-IN-COL-PIMR-DEWAS": "pimrindore.ac.in",
        "EC-IN-COL-ACROPOLIS": "acropolis.in",
        "EC-IN-UN-KARNAVATI": "karnavatiuniversity.edu.in",
        "EC-IN-UN-MARWADI": "marwadiuniversity.ac.in",
        "EC-IN-COL-JAGSOM": "jagsom.com",
        "EC-IN-COL-AGBS": "amity.edu",
        "EC-IN-COL-PEARL": "pearlacademy.com",
        "EC-IN-COL-GSB": "gsbl.in",
        "EC-IN-COL-SOFTVISION": "softvisioncollege.com",
        "EC-IN-COL-RADIANT": "rimsindore.com",
        "EC-IN-UN-UAIU": "universalai.in",
        "EC-IN-UN-PPSU": "ppsu.ac.in",
        "EC-IN-UN-RVU": "rvu.edu.in",
        "EC-IN-UN-JLU": "jlu.edu.in",
        "EC-IN-UN-ORIENTAL": "orientaluniversity.in",
        "EC-IN-COL-ASM-IBMR": "asmibmr.edu.in",
        "EC-IN-COL-PIBM": "pibm.in",
        "EC-IN-UN-PCU": "pcu.edu.in",
        "EC-IN-COL-VISHISHT": "vishishtcollege.com",
        "EC-IN-COL-PIMR-BHOPAL": "pimrbhopal.ac.in",
        "EC-IN-UN-SAGE-BHOPAL": "sageuniversity.in",
        "EC-IN-UN-ATLAS": "atlasuniversity.edu.in",
        "EC-IN-COL-ISME": "isme.in",
        "EC-IN-COL-RIIM": "riimpune.com",
        "EC-IN-COL-JAIPURIA": "jaipuria.ac.in",
        "EC-IN-UN-WOXSEN": "woxsen.edu.in",
        "EC-IN-COL-FOSTIIMA": "fostiima.org",
        "EC-IN-COL-NDIM": "ndimdelhi.org",
        "EC-IN-COL-IBA-BENGALURU": "iba.ac.in",
        "EC-IN-COL-IIBS": "iibs.edu.in",
        "EC-IN-COL-GIMS": "gims.net.in",
        "EC-IN-COL-SBS": "shantibschool.edu.in",
        "EC-IN-COL-ISBR": "isbr.in",
        "EC-IN-UN-MEDICAPS": "medicaps.ac.in",
        "EC-IN-COL-DCBS": "dcbsindia.com",
        "EC-IN-COL-ITM-NAVI-MUMBAI": "itm.edu",
        "EC-IN-COL-MET": "met.edu",
        "EC-IN-COL-JKBS": "jkbschool.org",
        "EC-IN-COL-ISMS": "ismsedu.com",
        "EC-IN-UN-GANPAT": "ganpatuniversity.ac.in",
        "EC-IN-UN-DY-PATIL-NAVI-MUMBAI": "dypatil.edu",
        "EC-IN-UN-AVANTIKA": "avantikauniversity.edu.in",
        "EC-IN-UN-SILVER-OAK": "silveroakuni.ac.in",
        "EC-IN-UN-BML-MUNJAL": "bmu.edu.in",
        "EC-IN-COL-ASIAN-BUSINESS": "abs.edu.in",
        "EC-IN-COL-LEXICON-MILE": "lexiconmile.com",
        "EC-IN-UN-INTEGRAL": "iul.ac.in",
        "EC-IN-UN-BBDU": "bbdu.ac.in",
        "EC-IN-UN-RAMA": "ramauniversity.ac.in",
        "EC-IN-UN-KRMU": "krmangalam.edu.in",
        "EC-IN-UN-SGT": "sgtuniversity.ac.in",
        "EC-IN-UN-SHARDA": "sharda.ac.in",
        "EC-IN-UN-OP-JINDAL": "jgu.edu.in",
        "EC-IN-UN-CHANDIGARH": "cuchd.in",
        "EC-IN-UN-GLA": "gla.ac.in",
        "EC-IN-UN-MANGALAYATAN": "mangalayatan.in",
        "EC-IN-UN-IIMT": "iimtu.com",
        "EC-IN-UN-GLS": "glsuniversity.ac.in",
        "EC-IN-UN-INDUS": "indusuni.ac.in",
        "EC-IN-UN-SIGMA": "sigmauniversity.ac.in",
        "EC-IN-UN-SOMAIYA": "somaiya.edu",
        "EC-IN-UN-MIT-ADT": "mituniversity.ac.in",
        "EC-IN-UN-CMR": "cmr.edu.in",
        "EC-IN-UN-PRESIDENCY": "presidencyuniversity.in",
        "EC-IN-COL-ACHARYA": "acharya.ac.in",
        "EC-IN-UN-JAIN": "jainuniversity.ac.in",
        "EC-IN-UN-SGVU": "sgvu.edu.in",
        "EC-IN-UN-APEJAY-STYA": "asu.apeejay.edu",
        "EC-IN-UN-GEETA": "geetauniversity.edu.in",
        "EC-IN-UN-SAMSKRUTI": "samskruti.ac.in",
        "EC-IN-COL-GIBS": "gibsbschool.com",
        "EC-IN-COL-APBS": "apim.edu.in",
        "EC-IN-UN-SVVV": "svvv.edu.in",
        "EC-IN-UN-DBS": "dgu.ac",
        "EC-IN-COL-ALLIANCE-ASCENT": "alliance.edu.in",
        "EC-IN-COL-PEARL-MUMBAI": "pearlacademy.com",
        "EC-IN-COL-PEARL-BENGALURU": "pearlacademy.com",
        "EC-IN-COL-PEARL-DELHI-WEST": "pearlacademy.com",
        "EC-IN-COL-PEARL-DELHI-SOUTH": "pearlacademy.com",
        "EC-IN-COL-MARANGONI": "istitutomarangoni.com",
        "EC-IN-COL-SGC-MOHALI": "sgcollege.edu.in",
        "EC-IN-UN-INVERTIS": "invertisuniversity.ac.in",
        "EC-IN-COL-UID": "uid.edu.in",
        "EC-IN-UN-GANPAT-GOA": "ganpatuniversitygoa.in",
        "EC-IN-COL-PIGM": "pigm.edu.in",
        "EC-IN-COL-IIC-DELHI": "iic.du.ac.in",
        "EC-IN-COL-SKITM": "skitm.in",
        "EC-IN-COL-DSHM": "ipu.ac.in",
    };
    const verifiedCampusPhotos = {
        "EC-IN-UG-DELHI":
            "https://thumb.wikimedia.org/wikipedia/co" +
            "mmons/thumb/4/47/University_of_delhi.jpg" +
            "/960px-University_of_delhi.jpg",
        "EC-IN-UG-IISC": "https://iisc.ac.in/wp-content/uploads/2021/01/13.jpg",
        "EC-IN-UG-BHU":
            "https://media.assettype.com/freepressjou" +
            "rnal/2023-03/ebd59e34-c06c-4131-bc1c-fb1" +
            "2869f5182/banaras_hindu_university_varan" +
            "asi.jpg",
        "EC-IN-UG-MUMBAI":
            "https://cache.careers360.mobi/media/coll" +
            "eges/social-media/media-gallery/891/2018" +
            "/10/30/Side%20View%20of%20University%20o" +
            "f%20Mumbai%20Mumbai_Campus-View.jpg",
        "EC-IN-UG-MANIPAL":
            "https://upload.wikimedia.org/wikipedia/c" +
            "ommons/thumb/0/00/MAHEMANIPALEDU.jpg/128" +
            "0px-MAHEMANIPALEDU.jpg",
        "EC-IN-PG-IIMA":
            "https://www.hindustantimes.com/ht-img/im" +
            "g/2023/10/23/original/IIM-Ahmedabad--Fil" +
            "e-_1698086911116.jpg",
        "EC-IN-PG-IITB": "https://images.indianexpress.com/2026/02/IIT-Bombay.jpg?w=1600",
        "EC-IN-UN-NIMS":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/campusimage/161" +
            "84956944.PNG",
        "EC-IN-UN-JECRC":
            "https://www.vidyavision.com/CollegeUploads/Photos/2021-10-6-10-00-55_sj23.PNG",
        "EC-IN-UN-SAGE-INDORE": "https://static.toiimg.com/img/74833144/Master.jpg",
        "EC-IN-COL-PIMR-BHOPAL": "https://pimrbhopal.ac.in/assets/images/slider/slide5s.jpg",
        "EC-IN-UN-GLA":
            "https://www.gla.ac.in/public/uploads/noi" +
            "da/pages/psaMUjaIDRW7Ju5DMkfSqbbQyHjTUlv" +
            "J6PYGYVvM.webp",
        "EC-IN-UN-IIMT": "https://iimtu.edu.in/images/nav/about-us.webp",
        "EC-IN-UN-JKLU": "https://jklu.edu.in/uploads/events/banner_images/university-big.webp",
        "EC-IN-COL-LLOYD":
            "https://img.studyclap.com/img/institute/" +
            "college/original/4476/lbs-greater-noida-" +
            "c5c450bb17.jpg",
        "EC-IN-COL-IDYLLIC":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/idyllic-institute-of-management-" +
            "indore-234739.jpg",
        "EC-IN-COL-PIMR-INDORE":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/prestige-institute-of-management" +
            "-research-indore-215868.jpg",
        "EC-IN-COL-PIMR-DEWAS":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/appImage/149036" +
            "10421444134355PIM.jpg",
        "EC-IN-COL-ACROPOLIS":
            "https://sccnhub.com/media/com_easysocial/photos/322/383/acropolis_large.jpg",
        "EC-IN-COL-JAGSOM":
            "https://www.dialeducation.com/assets/images/college/banner_1640849776.png",
        "EC-IN-COL-SOFTVISION":
            "https://cache.careers360.mobi/media/pres" +
            "ets/720X480/colleges/social-media/media-" +
            "gallery/17264/2019/5/30/Campus%20View%20" +
            "of%20Softvision%20College%20Indore_Campu" +
            "s-View.PNG",
        "EC-IN-COL-RADIANT":
            "https://getyourcollege.s3.ap-south-1.ama" +
            "zonaws.com/college/images/1748423968193." +
            "jpeg",
        "EC-IN-UN-ORIENTAL":
            "https://getyourcollege.s3.ap-south-1.ama" +
            "zonaws.com/college/images/1748429902486." +
            "jpeg",
        "EC-IN-COL-ASM-IBMR":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/asms-institute-of-business-manag" +
            "ement-research-pune-202769.jpg",
        "EC-IN-COL-VISHISHT":
            "https://cache.careers360.mobi/media/coll" +
            "eges/social-media/media-gallery/17220/20" +
            "23/12/6/Campus%20View%20of%20Vishisht%20" +
            "School%20of%20Management%20Indore_Campus" +
            "-View.jpg",
        "EC-IN-COL-DCBS":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/dc-business-school-indore-280664" +
            ".webp",
        "EC-IN-COL-ITM-NAVI-MUMBAI":
            "https://daqwpj7vq235r.cloudfront.net/ima" +
            "ges/mba-institute/ITM-Business-School%2C" +
            "-Navi-Mumbai%2BCampus-Building3.jpg",
        "EC-IN-COL-JKBS":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/jk-business-school-gurgaon-21435" +
            "3.jpg",
        "EC-IN-COL-ISMS":
            "https://dreamz-education.com/wp-content/" +
            "uploads/2023/12/1614244182phpzbcfDG-1024" +
            "x576.jpg",
        "EC-IN-UN-INTEGRAL":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/campusimage/165" +
            "3393753Academic%20Block-I%20%281%29.jpg",
        "EC-IN-UN-APEJAY-STYA":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/campusimage/155" +
            "1180076_MG_3623.jpg",
        "EC-IN-UN-SAMSKRUTI":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/appImage/170867" +
            "4477WhatsAppImage20240222at14.38.181.jpe" +
            "g",
        "EC-IN-COL-APBS":
            "https://www.searchurcollege.com/exam/admin/search/gallery/gallery_141_656.jpg",
        "EC-IN-UN-SVVV":
            "https://cache.careers360.mobi/media/pres" +
            "ets/720X480/colleges/social-media/media-" +
            "gallery/1761/2020/11/20/Campus%20View%20" +
            "of%20Shri%20Vaishnav%20Vidyapeeth%20Vish" +
            "wavidyalaya%20Indore_Campus-View.jpg",
        "EC-IN-UN-DBS": "https://www.dgu.ac/thumb/1400x560/images/header-images/home/hd-09.jpg",
        "EC-IN-COL-MARANGONI":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/istituto-marangoni-mumbai-177690" +
            ".webp",
        "EC-IN-COL-UID":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/campusimage/167" +
            "6183450june-2021-karnavati-university-49" +
            "55751-1.jpg",
        "EC-IN-COL-IIC-DELHI": "https://iic.ac.in/content/images/2022/12/iic-build-1.png",
        "EC-IN-COL-SKITM":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/shivajirao-kadam-institute-of-te" +
            "chnology-management-indore-258151.jpg",
        "EC-IN-UN-AMITY-NOIDA":
            "https://cache.careers360.mobi/media/pres" +
            "ets/720X480/colleges/social-media/media-" +
            "gallery/729/2018/9/29/Campus%20View%20Of" +
            "%20Amity%20University%20Noida_Campus-Vie" +
            "w.jpg",
        "EC-IN-UN-AMITY-MAHARASHTRA":
            "https://dfhe5ze0n4pxu.cloudfront.net/College/Image/Image-1765618515090.jpg",
        "EC-IN-UN-AMITY-RAJASTHAN":
            "https://image-static.collegedunia.com/pu" +
            "blic/reviewPhotos/1132575/WhatsApp%20Ima" +
            "ge%202025-07-26%20at%208.09.42%20PM%20%2" +
            "82%29.jpeg",
        "EC-IN-UN-AMITY-HARYANA":
            "https://assets.kollegeapply.com/images/1751550125902-1680077841phpvCebbj.jpeg",
        "EC-IN-UN-AMITY-TELANGANA":
            "https://image-static.collegedunia.com/pu" +
            "blic/college_data/images/campusimage/176" +
            "99382622%20%281%29.jpg",
        "EC-IN-UN-AMITY-PUNJAB":
            "https://www.collegebatch.com/static/clg-" +
            "gallery/amity-university-mohali-353100.j" +
            "pg",
        "EC-IN-UN-PARUL":
            "https://www.paruluniversity.ac.in/wp-content/uploads/2026/03/pugallery10.jpg",
        "EC-IN-UN-BENNETT": "https://images.shiksha.com/mediadata/images/1489648808phpvLzMJ4.jpeg",
        "EC-IN-COL-DOON-BUSINESS":
            "https://media.collegedekho.com/media/img" +
            "/institute/crawled_images/None/Buildgggi" +
            "ng.jpg",
        "EC-IN-UN-UPES": "https://images.shiksha.com/mediadata/images/1744010091phpVip8Q4.jpeg",
        "EC-IN-UN-VGU":
            "https://www.vidyavision.com/CollegeUploa" +
            "ds/Photos/2022-26-4-11-37-34_VGU%20246%2" +
            "0P.jpg",
        "EC-IN-UN-LPU":
            "https://cache.careers360.mobi/media/pres" +
            "ets/720X480/colleges/social-media/media-" +
            "gallery/155/2018/6/7/Lovely-Professional" +
            "-University-Phagwara12.JPG",
        "EC-IN-UN-IILM":
            "https://phdadmissionwala.com/uploads/uni" +
            "versities/gallery/gal_new_1770276092_1_e" +
            "d4f99.webp",
    };
    const existingCollegeNames = new Set(
        [...featuredUgColleges, ...featuredPgColleges].map((college) =>
            college.name.trim().toLocaleLowerCase(),
        ),
    );
    const directoryCollegeCards = domesticInstitutionDirectory
        .filter(
            (institution) =>
                !institution.directoryCategory &&
                !existingCollegeNames.has(institution.name.trim().toLocaleLowerCase()),
        )
        .filter((institution) =>
            ["UNIVERSITY", "COLLEGE", "INSTITUTION"].includes(institution.type),
        )
        .map((institution) => ({
            name: institution.name,
            type: institution.type,
            category:
                institution.type === "UNIVERSITY"
                    ? "University"
                    : institution.type === "COLLEGE"
                      ? "College"
                      : "Education Institution",
            location: institution.city ? `${institution.city}, India` : "India",
            officialDomain: officialWebsiteFor(institution.code),
            image: campusImagesFor(institution.code)[0] || "",
            imageFallback: campusImagesFor(institution.code)[1] || "",
            imageSource:
                domesticPhotoSources[institution.code]?.sourceUrl ||
                campusImagesFor(institution.code)[0] ||
                "",
            imageSourceLabel:
                domesticPhotoSources[institution.code]?.label || "",
            description: institutionSiteData[institution.code]?.description || "",
            program:
                institution.type === "UNIVERSITY"
                    ? "Undergraduate & postgraduate programmes"
                    : "Programmes and admissions",
            imageFit: "cover",
        }));
    const postgradPattern =
        /business|management|mba|ibmr|jaipuria|pimr|iim|fostiima|riim|isme|isbr|ndim|lexicon|jagsom|mile|pigm|gib?s|school|institute of management/i;
    const addedPgCollegeCards = directoryCollegeCards.filter(
        (college) => college.type !== "UNIVERSITY" && postgradPattern.test(college.name),
    );
    const addedUgCollegeCards = directoryCollegeCards.filter(
        (college) => !addedPgCollegeCards.includes(college),
    );
    const ugColleges = [...featuredUgColleges, ...addedUgCollegeCards];
    const pgColleges = [...featuredPgColleges, ...addedPgCollegeCards];

    const directoryRecordFor = (college) =>
        domesticInstitutionDirectory.find(
            (institution) =>
                institution.name.trim().toLocaleLowerCase() ===
                college.name.trim().toLocaleLowerCase(),
        );
    const enrichFeaturedCollege = (college) => {
        const record = directoryRecordFor(college);
        const site = record ? institutionSiteData[record.code] : null;
        return {
            ...college,
            image: campusImagesFor(record?.code)[0] || college.image || "",
            imageFallback: campusImagesFor(record?.code)[1] || college.imageFallback || "",
            imageSource:
                domesticPhotoSources[record?.code]?.sourceUrl ||
                campusImagesFor(record?.code)[0] ||
                college.imageSource ||
                "",
            imageSourceLabel:
                domesticPhotoSources[record?.code]?.label ||
                college.imageSourceLabel ||
                "",
            imageFit: "cover",
            officialDomain: officialWebsiteFor(record?.code),
            description:
                site?.description?.trim() ||
                college.description?.trim() ||
                directoryOverviewFor(college, record),
        };
    };
    const enrichedUgColleges = ugColleges.map(enrichFeaturedCollege);
    const enrichedPgColleges = pgColleges.map(enrichFeaturedCollege);

    function escapeCardText(value = "") {
        return String(value).replace(
            /[&<>"']/g,
            (character) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[character],
        );
    }

    function CollegeCard(college, level) {
        return InstitutionCard({
            item: {
                name: college.name,

                category: college.category,

                location: college.location,

                program:
                    college.program ||
                    (level === "UG" ? "Undergraduate programmes" : "Postgraduate programmes"),

                detailsOnCard: false,

                image: college.image,
                imageSource: college.imageSource,

                imageFit: college.imageFit,

                imageFallback: college.imageFallback,

                belowActions: "",

                actionLabel: "Explore College",

                actionMode: "college-details",
                overview: college.description || directoryOverviewFor(college, null),
                actionLayout: "home-directory-actions",
                enquiryHref: `${level === "PG" ? "/colleges/pg" : "/colleges/ug"}?q=${encodeURIComponent(college.name)}&enquire=1`,
                image: college.image,
                secondaryActionHref: college.officialDomain
                    ? /^https?:\/\//i.test(college.officialDomain)
                        ? college.officialDomain
                        : `https://${college.officialDomain}`
                    : "",

                secondaryActionLabel: "",
                enquiryLabel: "Enquire",
            },

            type: level === "UG" ? "ug-college" : "pg-college",
        });
    }

    const ugCards = enrichedUgColleges.map((college) => CollegeCard(college, "UG")).join("");

    const pgCards = enrichedPgColleges.map((college) => CollegeCard(college, "PG")).join("");

    const ugCardsDuplicate = enrichedUgColleges
        .map((college) => CollegeCard(college, "UG"))
        .join("");

    const pgCardsDuplicate = enrichedPgColleges
        .map((college) => CollegeCard(college, "PG"))
        .join("");

    const totalInstitutions = enrichedUgColleges.length + enrichedPgColleges.length;

    const content = `

        <div class="ug-pg-section-wrapper">



            <div class="ug-pg-intro">

                <div class="ug-pg-intro-content">

                    <div class="ug-pg-eyebrow">
                        🎓 HIGHER EDUCATION
                    </div>


                    <h2>
                        Universities & Colleges in India
                    </h2>


                    <p>
                        Discover top undergraduate and postgraduate
                        Explore universities and colleges by undergraduate and postgraduate study. Each card links to the institution’s official site for current programme and admission details.
                    </p>

                </div>


                <div class="ug-pg-stat">

                    <strong>
                        ${totalInstitutions}
                    </strong>

                    <span>
                        Featured<br>
                        Institutions
                    </span>

                </div>

            </div>



            <div class="ug-pg-heading">

                <div>

                    <span>
                        UNDERGRADUATE
                    </span>


                    <h2>
                        Top UG Universities & Colleges in India
                    </h2>

                </div>


                <p>
                    Explore undergraduate colleges in India
                    offering UG courses, degree programs and
                    career-focused higher education.
                </p>

            </div>



            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${ugCards}

                    ${ugCardsDuplicate}

                </div>

            </div>


            <div
                class="ug-pg-heading
                       ug-pg-heading-second"
            >

                <div>

                    <span>
                        POSTGRADUATE
                    </span>


                    <h2>
                        Top PG Colleges & Universities
                    </h2>

                </div>


                <p>
                    Explore PG courses and admissions.
                </p>

            </div>


            <div class="ug-pg-carousel">

                <div
                    class="ug-pg-track institution-carousel-track"
                >

                    ${pgCards}

                    ${pgCardsDuplicate}

                </div>

            </div>




            <div class="ug-pg-cta">

                <div>

                    <span>
                        Looking for a college?
                    </span>


                    <strong>
                        Compare courses, fees and colleges.
                    </strong>

                </div>


                <a
                    href="/colleges"
                    class="ug-pg-cta-button"
                >

                    <span class="ug-pg-view-all-text">
                        Browse Colleges & Universities
                    </span>


                    <span>
                        →
                    </span>

                </a>

            </div>



            <div
                class="ug-pg-all"
                hidden
            >


                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Undergraduate Universities & Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${enrichedUgColleges.map((college) => CollegeCard(college, "UG")).join("")}

                    </div>

                </div>



                <div class="ug-pg-all-section">

                    <div class="ug-pg-all-title">
                        Postgraduate Universities & Colleges
                    </div>


                    <div class="ug-pg-all-grid">

                        ${enrichedPgColleges.map((college) => CollegeCard(college, "PG")).join("")}

                    </div>

                </div>

            </div>

        </div>

        <div class="home-college-details" data-home-college-details role="dialog" aria-modal="true" aria-labelledby="home-college-details-title" hidden>
            <div class="home-college-details-header"><span class="ug-pg-eyebrow">INSTITUTION PROFILE</span><button type="button" data-close-home-college-details aria-label="Close details">×</button></div>
            <img class="home-college-details-image" data-college-modal-image alt="" hidden>
            <h2 id="home-college-details-title" data-college-modal-name></h2>
            <p class="home-college-details-location" data-college-modal-location></p>
            <dl><div><dt>Category</dt><dd data-college-modal-category></dd></div><div><dt>Programmes</dt><dd data-college-modal-program></dd></div></dl>
            <section><h3>Overview</h3><p data-college-modal-overview></p></section>
            <a class="home-college-details-enquire" data-college-modal-enquire href="#">Enquire →</a>
        </div>

    `;

    return Section({
        id: "top-ug-pg-colleges",

        title: "",

        subtitle: "",

        content,
    });
}

export function initHomeCollegeDetails() {
    const root = document.querySelector("#top-ug-pg-colleges");
    const dialog = root?.querySelector("[data-home-college-details]");
    if (!root || !dialog) return;
    window.showHomeCollegeDetails = (button) => {
        if (!button || !(root.contains(button) || button.closest("#school"))) return;
        const text = (selector, value) => {
            const element = dialog.querySelector(selector);
            element.textContent = value || "Information not listed";
        };
        text("[data-college-modal-name]", button.dataset.collegeName);
        text(
            "[data-college-modal-location]",
            button.dataset.collegeLocation
                ? `${button.dataset.collegeLocation}${/india/i.test(button.dataset.collegeLocation) ? "" : ", India"}`
                : "Location not listed",
        );
        text("[data-college-modal-category]", button.dataset.collegeCategory);
        text("[data-college-modal-program]", button.dataset.collegeProgram);
        text("[data-college-modal-overview]", button.dataset.collegeOverview);
        const image = dialog.querySelector("[data-college-modal-image]");
        image.src = button.dataset.collegeImage || "";
        image.alt = `${button.dataset.collegeName || "Institution"} campus`;
        image.hidden = !button.dataset.collegeImage;
        const enquire = dialog.querySelector("[data-college-modal-enquire]");
        enquire.href = button.dataset.collegeEnquiry || "#";
        dialog.hidden = false;
        dialog.classList.add("is-open");
    };
    document
        .querySelectorAll(
            "#top-ug-pg-colleges " +
                '[data-action="college-details"], ' +
                '#school [data-action="school-details"]',
        )
        .forEach((button) => {
            if (button.dataset.homeDetailsBound === "true") return;
            button.dataset.homeDetailsBound = "true";
            button.addEventListener("click", () => window.showHomeCollegeDetails(button));
        });
    dialog.querySelector("[data-close-home-college-details]")?.addEventListener("click", () => {
        dialog.hidden = true;
        dialog.classList.remove("is-open");
    });
    dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dialog.hidden = true;
            dialog.classList.remove("is-open");
        }
    });
}

export default TopUGPGCollegesSection;
