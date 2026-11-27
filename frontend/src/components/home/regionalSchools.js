// The list contains names and cities, not verified ratings or rankings.
export const regionalSchoolNames = {
    Rajasthan: [
        ["Mayo College", "Ajmer"],
        ["Mayo College Girls' School", "Ajmer"],
        ["Birla Public School", "Pilani"],
        ["Birla Balika Vidyapeeth", "Pilani"],
        ["The Sagar School", "Alwar"],
        ["Bharatiya Vidya Bhavan's Vidyashram", "Jaipur"],
        ["St. Xavier's Senior Secondary School", "Jaipur"],
        ["Maharaja Sawai Man Singh Vidyalaya", "Jaipur"],
        ["Delhi Public School", "Jaipur"],
        ["Neerja Modi School", "Jaipur"],
    ],
    Jaipur: [
        ["Bharatiya Vidya Bhavan's Vidyashram", "Jaipur"],
        ["St. Xavier's Senior Secondary School", "Jaipur"],
        ["Maharaja Sawai Man Singh Vidyalaya", "Jaipur"],
        ["Delhi Public School", "Jaipur"],
        ["Neerja Modi School", "Jaipur"],
        ["The Palace School", "Jaipur"],
        ["Jayshree Periwal High School", "Jaipur"],
        ["Maharani Gayatri Devi Girls' School", "Jaipur"],
        ["Seedling Public School", "Jaipur"],
        ["Subodh Public School", "Jaipur"],
    ],
    Delhi: [
        ["Delhi Public School, R.K. Puram", "New Delhi"],
        ["Modern School, Barakhamba Road", "New Delhi"],
        ["The Shri Ram School", "New Delhi"],
        ["Springdales School, Pusa Road", "New Delhi"],
        ["Sanskriti School", "New Delhi"],
        ["Mount St. Mary's School", "New Delhi"],
        ["Vasant Valley School", "New Delhi"],
        ["Sardar Patel Vidyalaya", "New Delhi"],
        ["Loreto Convent School", "New Delhi"],
        ["The Mother's International School", "New Delhi"],
    ],
    "Himachal Pradesh": [
        ["Bishop Cotton School", "Shimla"],
        ["Auckland House School", "Shimla"],
        ["The Lawrence School, Sanawar", "Sanawar"],
        ["Pinegrove School", "Dharampur"],
        ["Dalhousie Public School", "Dalhousie"],
        ["Army Public School, Dagshai", "Dagshai"],
        ["Sacred Heart Senior Secondary School", "Dharamshala"],
        ["St. Edward's School", "Shimla"],
        ["Chinmaya Vidyalaya", "Nauni"],
        ["DAV Public School", "Mandi"],
    ],
    "Uttar Pradesh": [
        ["The Scindia School", "Gwalior"],
        ["La Martiniere College", "Lucknow"],
        ["City Montessori School", "Lucknow"],
        ["St. Mary's Convent Inter College", "Prayagraj"],
        ["Boys' High School and College", "Prayagraj"],
        ["Delhi Public School, Noida", "Noida"],
        ["Seth Anandram Jaipuria School", "Ghaziabad"],
        ["The Shri Ram School, Aravali", "Gurugram"],
        ["St. John's Senior Secondary School", "Varanasi"],
        ["Sunbeam School, Lahartara", "Varanasi"],
    ],
    Uttarakhand: [
        ["The Doon School", "Dehradun"],
        ["Welham Girls' School", "Dehradun"],
        ["Welham Boys' School", "Dehradun"],
        ["Woodstock School", "Mussoorie"],
        ["The Asian School", "Dehradun"],
        ["Mussoorie International School", "Mussoorie"],
        ["St. George's College", "Mussoorie"],
        ["Ecole Globale International Girls' School", "Dehradun"],
        ["Sherwood College", "Nainital"],
        ["Birla Vidya Mandir", "Nainital"],
    ],
    Gujarat: [
        ["The Riverside School", "Ahmedabad"],
        ["Ahmedabad International School", "Ahmedabad"],
        ["Mahatma Gandhi International School", "Ahmedabad"],
        ["Udgam School for Children", "Ahmedabad"],
        ["Zebar School for Children", "Ahmedabad"],
        ["Delhi Public School, Bopal", "Ahmedabad"],
        ["Anand Niketan School", "Ahmedabad"],
        ["Navrachana International School", "Vadodara"],
        ["Bright Day School", "Vadodara"],
        ["The Galaxy School", "Rajkot"],
    ],
    "Madhya Pradesh": [
        ["The Daly College", "Indore"],
        ["The Scindia School", "Gwalior"],
        ["Emerald Heights International School", "Indore"],
        ["Choithram School", "Indore"],
        ["Delhi Public School, Indore", "Indore"],
        ["Sagar Public School", "Bhopal"],
        ["Campion School", "Bhopal"],
        ["Mātrikā School of Earth", "Bhopal"],
        ["Carmel Convent Senior Secondary School", "Bhopal"],
        ["Vindhyachal Academy", "Dewas"],
    ],
    Telangana: [
        ["The Hyderabad Public School, Begumpet", "Hyderabad"],
        ["Oakridge International School", "Hyderabad"],
        ["Chirec International School", "Hyderabad"],
        ["Delhi Public School, Hyderabad", "Hyderabad"],
        ["Jubilee Hills Public School", "Hyderabad"],
        ["Nasr School", "Hyderabad"],
        ["Bharatiya Vidya Bhavan's Public School", "Hyderabad"],
        ["Silver Oaks International School", "Hyderabad"],
        ["Glendale Academy", "Hyderabad"],
        ["Meridian School", "Hyderabad"],
    ],
    "Andhra Pradesh": [
        ["The Hyderabad Public School, Ramanthapur", "Hyderabad"],
        ["Little Angels School", "Visakhapatnam"],
        ["Oakridge International School", "Visakhapatnam"],
        ["Sri Prakash Synergy School", "Peddapuram"],
        ["Delhi Public School, Vijayawada", "Vijayawada"],
        ["Kendriya Vidyalaya No. 1", "Vijayawada"],
        ["Bhashyam Public School", "Guntur"],
        ["Nalanda Vidya Niketan", "Vijayawada"],
        ["Dr. KKR's Gowtham School", "Vijayawada"],
        ["Ravindra Bharathi School", "Visakhapatnam"],
    ],
};

const stateByCity = {
    Ajmer: "Rajasthan",
    Pilani: "Rajasthan",
    Alwar: "Rajasthan",
    Jaipur: "Rajasthan",
    "New Delhi": "Delhi",
    Shimla: "Himachal Pradesh",
    Sanawar: "Himachal Pradesh",
    Dharampur: "Himachal Pradesh",
    Dalhousie: "Himachal Pradesh",
    Dagshai: "Himachal Pradesh",
    Dharamshala: "Himachal Pradesh",
    Nauni: "Himachal Pradesh",
    Mandi: "Himachal Pradesh",
    Gwalior: "Madhya Pradesh",
    Indore: "Madhya Pradesh",
    Bhopal: "Madhya Pradesh",
    Dewas: "Madhya Pradesh",
    Lucknow: "Uttar Pradesh",
    Prayagraj: "Uttar Pradesh",
    Noida: "Uttar Pradesh",
    Ghaziabad: "Uttar Pradesh",
    Varanasi: "Uttar Pradesh",
    Gurugram: "Haryana",
    Dehradun: "Uttarakhand",
    Mussoorie: "Uttarakhand",
    Nainital: "Uttarakhand",
    Ahmedabad: "Gujarat",
    Vadodara: "Gujarat",
    Rajkot: "Gujarat",
    Hyderabad: "Telangana",
    Visakhapatnam: "Andhra Pradesh",
    Peddapuram: "Andhra Pradesh",
    Vijayawada: "Andhra Pradesh",
    Guntur: "Andhra Pradesh",
};

const esc = (value) =>
    String(value).replace(
        /[&<>"']/g,
        (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
    );

function schoolDescription(name, city, facts = {}) {
    const location = `${city}, ${stateByCity[city] || "India"}`;
    const sentences = (facts.description || "").split(/(?<=[.!?])\s+/).filter(Boolean);
    if (!sentences.length) sentences.push(`${name} is listed in ${location}.`);
    const boardKnown = Boolean(facts.board && facts.board !== "Board not verified");
    while (sentences.length < 3) {
        if (!boardKnown) {
            if (sentences.length === 1)
                sentences.push("Board affiliation has not been independently verified.");
            else
                sentences.push(
                    "Confirm current curriculum and admissions directly with the school.",
                );
        } else if (sentences.length === 1) sentences.push(`The listed board is ${facts.board}.`);
        else
            sentences.push(
                `The listed school location is ${location}; confirm current programme and admissions details directly with the school.`,
            );
    }
    return sentences.join(" ");
}

// Only populate facts and direct links when confirmed on the school's own site.
const verified = {
    "Mayo College": {
        url: "https://mayocollege.com/public/",
        board: "CBSE; Cambridge IGCSE",
        status: "All-boys boarding school",
        schoolType: "Boys school",
        description:
            "Mayo College is a boys’ residential " +
            "school in Ajmer, Rajasthan. Its " +
            "academic programme includes CBSE and " +
            "Cambridge pathways. The campus combines " +
            "classroom learning with residential and " +
            "co-curricular life.",
    },
    "Mayo College Girls' School": {
        url: "https://mcgs.ac.in/",
        board: "CISCE (ICSE/ISC); Cambridge",
        status: "Girls' boarding school",
        schoolType: "Girls school",
        description:
            "Mayo College Girls’ School is a " +
            "residential girls’ school in Ajmer. Its " +
            "published curriculum includes CISCE and " +
            "Cambridge pathways. The school’s campus " +
            "and boarding programme serve students " +
            "from across India.",
    },
    "The Doon School": {
        url: "https://www.doonschool.com/",
        board: "CISCE; IB Diploma; IGCSE",
        status: "All-boys boarding school",
        schoolType: "Boys school",
        description:
            "The Doon School is an all-boys boarding " +
            "school in Dehradun. It publishes " +
            "pathways including CISCE, the IB " +
            "Diploma and IGCSE. Its academic " +
            "programme is organized around a " +
            "residential campus community.",
    },
    "The Riverside School": {
        url: "https://schoolriverside.com/Campus",
        image: "https://schoolriverside.com/images/campus/1.jpg",
        board: "Cambridge International / NIOS",
        status: "Day school",
        schoolType: "Co-educational school",
        description:
            "The Riverside School is a " +
            "co-educational day school in Ahmedabad. " +
            "Its published pathways include " +
            "Cambridge International and NIOS. The " +
            "school describes its approach through " +
            "student agency, design thinking and " +
            "community engagement.",
    },
    "Udgam School for Children": {
        url: "https://www.udgamschool.com/",
        image:
            "https://www.udgamschool.com/wp-content/u" +
            "ploads/2026/02/USFC-Web-banner-School-co" +
            "re%404x-100.jpg-1.webp",
        board: "CBSE; IB Career-related Programme (Grades 11–12)",
        status: "Co-educational school; two shifts",
        schoolType: "Co-educational school",
        description:
            "Udgam School for Children is a " +
            "co-educational school in Ahmedabad. Its " +
            "published programmes include CBSE and " +
            "the IB Career-related Programme for " +
            "senior grades. The school describes " +
            "campus facilities for sports and " +
            "co-curricular activities.",
    },
    "Ahmedabad International School": {
        url: "https://www.aischool.net/school_life/",
        board: "IB; Cambridge; Gujarat State Board",
        status: "Day/boarding status not stated",
        schoolType: "Not verified",
        description:
            "Ahmedabad International School is based " +
            "in Ahmedabad, Gujarat. Its website " +
            "lists IB, Cambridge and Gujarat State " +
            "Board pathways. Refer to the school’s " +
            "current programme pages for campus life " +
            "and admissions details.",
    },
    "Mahatma Gandhi International School": {
        url: "https://www.mgis.in/",
        image: "https://i.pinimg.com/736x/16/15/27/1615278e187dc1ff08d102806fee3c8f.jpg",
        board: "IB; Cambridge; French national curriculum; BTEC",
        status: "Day school",
        schoolType: "Co-educational school",
        description:
            "Mahatma Gandhi International School is " +
            "located in Ahmedabad, Gujarat. Its " +
            "published curriculum includes Cambridge " +
            "Primary, IB programmes, French national " +
            "curriculum and BTEC pathways. The " +
            "school describes itself as a day school " +
            "and a public-private partnership.",
    },
    "St. John's Senior Secondary School": {
        url: "https://stjohnsvaranasi.org/",
        board: "Board not verified",
        status: "Day or boarding status not verified",
        description:
            "St. John’s Senior Secondary School is " +
            "listed in Varanasi, Uttar Pradesh. The " +
            "school’s current board affiliation and " +
            "campus-specific details were not " +
            "confirmed from a reliable official " +
            "source. Check directly with the school " +
            "for its current curriculum and " +
            "admissions information.",
    },
    "Birla Vidya Mandir": {
        url: "https://www.birlavidyamandir.com/",
        board: "CBSE",
        status: "Boys' boarding school",
        schoolType: "Boys school",
        description:
            "Birla Vidya Mandir is a boys’ " +
            "residential school in Nainital, " +
            "Uttarakhand. It is affiliated with CBSE " +
            "and serves Grades IV to XII. Its " +
            "official school information describes " +
            "academic facilities and a boarding " +
            "campus.",
    },
    "Glendale Academy": {
        url: "https://glendaleschool.org/in/our-school-campuses/",
        board: "CBSE; Cambridge IGCSE (campus/programme-dependent)",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Glendale Academy’s Suncity campus is in " +
            "Hyderabad. The school group lists CBSE, " +
            "Cambridge and IB pathways across its " +
            "campuses; pathway availability depends " +
            "on campus. Its admissions pages " +
            "describe the Bandlaguda Jagir academy " +
            "as a day school.",
    },
    "Meridian School": {
        url: "https://www.meridianschool.in/",
        board: "CBSE; IB (campus/programme-dependent)",
        status: "Day school",
        schoolType: "Co-educational school",
        description:
            "Meridian School operates several " +
            "campuses in Hyderabad. Its official " +
            "pages describe CBSE and IB " +
            "affiliations, with curriculum options " +
            "varying by campus and grade. The school " +
            "publishes admissions and campus " +
            "information on its website.",
    },
    "Kendriya Vidyalaya No. 1": {
        url: "https://no1vijayawada.kvs.ac.in/en/",
        board: "CBSE",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "PM SHRI Kendriya Vidyalaya No. 1 is " +
            "located in Satyanarayanapuram, " +
            "Vijayawada. The school and CBSE " +
            "directory list its CBSE affiliation. It " +
            "is operated by Kendriya Vidyalaya " +
            "Sangathan under India’s Ministry of " +
            "Education.",
    },
    "Nalanda Vidya Niketan": {
        url: "https://nvn.edu.in/",
        board: "CBSE",
        status: "Day school",
        schoolType: "Co-educational school",
        description:
            "Nalanda Vidya Niketan is a K–12 school " +
            "with campuses in Vijayawada. Its " +
            "institution website lists CBSE " +
            "affiliation. Refer to the school for " +
            "campus-specific grade, curriculum and " +
            "admission information.",
    },
    "Birla Public School": {
        board: "CBSE",
        status: "Boys' boarding school",
        schoolType: "Boys school",
        description:
            "Birla Public School (Vidya Niketan) is " +
            "a residential boys’ school in Pilani. " +
            "The school is affiliated with CBSE and " +
            "was established in 1944. Its campus " +
            "includes academic, residential and " +
            "sports facilities.",
    },
    "Birla Balika Vidyapeeth": {
        board: "CBSE",
        status: "Girls' boarding school",
        schoolType: "Girls school",
        description:
            "Birla Balika Vidyapeeth is a " +
            "residential girls’ school in Pilani. " +
            "Birla Education Trust identifies it as " +
            "CBSE-affiliated and founded in 1941. " +
            "Its programme combines academic study " +
            "with residential school life.",
    },
    "The Sagar School": {
        board: "CBSE; Cambridge (IGCSE)",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "The Sagar School is a co-educational " +
            "boarding school in the Alwar district. " +
            "Its curriculum uses Cambridge " +
            "parameters in secondary classes and " +
            "CBSE at senior secondary level. The " +
            "school describes its campus as spanning " +
            "160 acres.",
    },
    "Bharatiya Vidya Bhavan's Vidyashram": {
        board: "CBSE",
        description:
            "Bharatiya Vidya Bhavan’s Vidyashram is " +
            "located on K.M. Munshi Marg in Jaipur. " +
            "CBSE’s affiliation directory lists it " +
            "as a senior secondary school. The " +
            "school is managed by Bharatiya Vidya " +
            "Bhavan.",
    },
    "Ravindra Bharathi School": {
        board: "CBSE",
        status: "Day, co-educational school",
        schoolType: "Co-educational school",
        description:
            "Ravindra Bharathi School operates a " +
            "Dwaraka Nagar campus in Visakhapatnam. " +
            "Its published school information " +
            "describes academic and IIT foundation " +
            "programmes. The Visakhapatnam listing " +
            "is associated with CBSE and " +
            "co-educational day schooling.",
    },
    "The Shri Ram School": {
        board: "CISCE (ICSE)",
        status: "Day, co-educational school",
        schoolType: "Co-educational school",
        description:
            "The Shri Ram School’s Vasant Vihar " +
            "campus is in South Delhi and serves " +
            "nursery through Grade 5. The school " +
            "identifies CISCE as its curriculum. " +
            "Students continue to the school’s " +
            "Moulsari campus after Grade 5.",
    },
    "St. Xavier's Senior Secondary School": {
        board: "CBSE",
        description:
            "St. Xavier’s Senior Secondary School is " +
            "located on Bhagwan Das Road in Jaipur. " +
            "CBSE’s affiliation directory lists the " +
            "institution as a senior secondary " +
            "school. The school is managed by the " +
            "Jaipur Xavier Educational Association.",
    },
    "Maharaja Sawai Man Singh Vidyalaya": {
        board: "CBSE",
        description:
            "Maharaja Sawai Man Singh Vidyalaya is " +
            "located on Sawai Ram Singh Road in " +
            "Jaipur. CBSE lists it as a senior " +
            "secondary affiliated school. The " +
            "school’s published curriculum and " +
            "admissions information should be " +
            "checked for current details.",
    },
    "Neerja Modi School": {
        board: "CBSE",
        description:
            "Neerja Modi School’s Shipra Path campus " +
            "is in Mansarovar, Jaipur. CBSE lists " +
            "this campus as an affiliated secondary " +
            "school. The school publishes campus and " +
            "academic information for families " +
            "seeking current details.",
    },
    "Delhi Public School, R.K. Puram": {
        board: "CBSE",
        description:
            "Delhi Public School, R.K. Puram is " +
            "located in New Delhi. CBSE’s " +
            "affiliation directory lists it as a " +
            "senior secondary school. The school " +
            "publishes programme, activity and " +
            "admissions information through its own " +
            "channels.",
    },
    "Modern School, Barakhamba Road": {
        board: "CBSE",
        description:
            "Modern School’s Barakhamba Road campus " +
            "is in central New Delhi. It is " +
            "affiliated with CBSE and serves senior " +
            "secondary classes. The school’s " +
            "longstanding campus includes academic " +
            "and co-curricular facilities.",
    },
    "Springdales School, Pusa Road": {
        board: "CBSE",
        description:
            "Springdales School’s Pusa Road campus " +
            "is in New Delhi. The school is " +
            "affiliated with CBSE. Its official " +
            "materials describe a co-educational " +
            "school community and academic " +
            "programmes.",
    },
    "Sanskriti School": {
        board: "CBSE",
        description:
            "Sanskriti School is located on Dr. S. " +
            "Radhakrishnan Marg in Chanakyapuri, New " +
            "Delhi. The school follows the CBSE " +
            "curriculum. It serves students from " +
            "nursery through senior secondary " +
            "classes.",
    },
    "Sardar Patel Vidyalaya": {
        board: "CBSE",
        description:
            "Sardar Patel Vidyalaya is located in " +
            "Lodi Estate, New Delhi. The school is " +
            "affiliated with CBSE and is " +
            "co-educational. Its public information " +
            "describes a day school serving the " +
            "local community.",
    },
    "Bishop Cotton School": {
        board: "CISCE (ICSE/ISC); Cambridge",
        status: "Boys' boarding school",
        schoolType: "Boys school",
        description:
            "Bishop Cotton School is a boys’ " +
            "boarding school in Shimla. It follows " +
            "CISCE for ICSE and ISC examinations and " +
            "also lists a Cambridge pathway. The " +
            "school traces its founding to 1859.",
    },
    "The Lawrence School, Sanawar": {
        board: "CBSE",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "The Lawrence School is a co-educational " +
            "residential school at Sanawar in " +
            "Himachal Pradesh. It is affiliated with " +
            "CBSE and serves classes V to XII. The " +
            "school was established in 1847.",
    },
    "Pinegrove School": {
        board: "CBSE",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "Pinegrove School is a co-educational " +
            "residential school in Solan district, " +
            "Himachal Pradesh. Both campuses are " +
            "affiliated with CBSE. The school offers " +
            "senior secondary education and " +
            "identifies itself as an English-medium " +
            "school.",
    },
    "La Martiniere College": {
        board: "CISCE (ICSE/ISC)",
        status: "Boys' day and boarding school",
        schoolType: "Boys school",
        description:
            "La Martiniere College is a boys’ day " +
            "and residential school in Lucknow. It " +
            "is affiliated with CISCE for ICSE and " +
            "ISC examinations. The Constantia campus " +
            "is a listed heritage building and " +
            "houses middle and senior sections.",
    },
    "City Montessori School": {
        board: "CISCE (ICSE/ISC); Cambridge (selected campuses)",
        description:
            "City Montessori School is a " +
            "multi-campus co-educational school in " +
            "Lucknow. Its published prospectus lists " +
            "CISCE curricula and Cambridge pathways " +
            "at selected campuses. Programme " +
            "availability depends on campus.",
    },
    "Boys' High School and College": {
        board: "CISCE (ICSE/ISC)",
        description:
            "Boys’ High School and College is " +
            "located on P.D. Tandon Road in " +
            "Prayagraj. The school identifies itself " +
            "as affiliated with CISCE. It provides " +
            "school and college-level education on " +
            "its campus.",
    },
    "Choithram School": {
        board: "CBSE",
        description:
            "Choithram School is located on Manik " +
            "Bagh Road in Indore. CBSE lists it as a " +
            "senior secondary affiliated school. The " +
            "school was established in 1972 and is " +
            "managed by T. Choithram Foundation.",
    },
    "Emerald Heights International School": {
        board: "CBSE",
        description:
            "Emerald Heights International School is " +
            "located on A.B. Road at Rau, Indore. " +
            "The school publishes its CBSE " +
            "affiliation number and boarding " +
            "information. Its campus includes " +
            "academic and residential facilities.",
    },
    "Campion School": {
        board: "CBSE",
        description:
            "Campion School is located in Arera " +
            "Colony, Bhopal. The school states that " +
            "it is affiliated with CBSE. Its " +
            "published school information includes " +
            "academic programmes and campus " +
            "activities.",
    },
    "The Hyderabad Public School, Begumpet": {
        board: "CISCE (ICSE/ISC)",
        status: "Day and boarding school",
        description:
            "The Hyderabad Public School, Begumpet " +
            "is a co-educational school in " +
            "Hyderabad. It follows the ICSE and ISC " +
            "syllabuses. The school describes both " +
            "day and boarding provision.",
    },
    "The Hyderabad Public School, Ramanthapur": {
        board: "CBSE",
        description:
            "The Hyderabad Public School, " +
            "Ramanthapur is located in Hyderabad. " +
            "CBSE lists it as a senior secondary " +
            "affiliated school. The school’s " +
            "published disclosure identifies its " +
            "curriculum as CBSE.",
    },
    "Chirec International School": {
        board: "CBSE; Cambridge; IB Diploma / Career-related",
        description:
            "CHIREC is a multi-campus school in " +
            "Hyderabad serving pre-primary through " +
            "Grade 12. It offers CBSE and Cambridge " +
            "from Grade 1, with IB Diploma and " +
            "Career-related pathways in senior " +
            "secondary. Curriculum options vary by " +
            "campus.",
    },
    "Jubilee Hills Public School": {
        board: "CBSE",
        description:
            "Jubilee Hills Public School is located " +
            "in Jubilee Hills, Hyderabad. CBSE lists " +
            "the school as a senior secondary " +
            "affiliate. The school publishes its " +
            "academic and campus information online.",
    },
    "Welham Girls' School": {
        board: "CISCE (ICSE/ISC)",
        status: "Girls' boarding school",
        schoolType: "Girls school",
        description:
            "Welham Girls’ School is a residential " +
            "girls’ school in Dehradun. It is " +
            "affiliated with CISCE and serves " +
            "classes VI to XII. The school’s " +
            "published address is Municipal Road, " +
            "Dalanwala.",
    },
    "Welham Boys' School": {
        board: "CBSE",
        status: "Boys' boarding school",
        schoolType: "Boys school",
        description:
            "Welham Boys’ School is a boys’ boarding " +
            "school in Dehradun. It follows the CBSE " +
            "curriculum and serves classes IV to " +
            "XII. The school’s campus and boarding " +
            "houses are described on its official " +
            "site.",
    },
    "Maharani Gayatri Devi Girls' School": {
        board: "CBSE; Cambridge (selected grades)",
        status: "Girls' day and boarding school",
        schoolType: "Girls school",
        description:
            "Maharani Gayatri Devi Girls’ School is " +
            "located in Jaipur and was founded in " +
            "1943. It is affiliated with CBSE and " +
            "offers Cambridge options for selected " +
            "grades. The school provides day, " +
            "day-boarding and boarding arrangements.",
    },
    "Woodstock School": {
        board: "IB; Cambridge IGCSE (transition underway)",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "Woodstock School is a co-educational " +
            "residential school in Mussoorie. Its " +
            "current programme information includes " +
            "IB and Cambridge IGCSE pathways, with a " +
            "published transition to a new school " +
            "diploma framework. Check the school’s " +
            "curriculum page for the pathway and " +
            "cohort currently offered.",
    },
    "The Hyderabad Public School, Ramanthapur": {
        board: "CBSE",
        description:
            "The Hyderabad Public School’s " +
            "Ramanthapur campus is in Hyderabad. The " +
            "campus is affiliated with CBSE. It is " +
            "part of the Hyderabad Public School " +
            "Society’s school network.",
    },
    "Oakridge International School": {
        board: "IB; CBSE (campus/programme dependent)",
        description:
            "Oakridge International School operates " +
            "campuses in Hyderabad and " +
            "Visakhapatnam. Published curriculum " +
            "options vary by campus and include " +
            "international and Indian pathways. " +
            "Families should confirm the programme " +
            "at the specific campus before applying.",
    },
    "The Palace School": {
        url: "https://www.thepalaceschool.com/",
        board: "CBSE",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "The Palace School is located at " +
            "Jaipur’s City Palace complex. Its " +
            "published admission materials identify " +
            "it as affiliated with CBSE. The school " +
            "provides academic information through " +
            "its official website.",
    },
    "Jayshree Periwal High School": {
        url: "https://jphschool.com/",
        board: "CBSE",
        status: "Co-educational day and boarding options",
        schoolType: "Co-educational school",
        description:
            "Jayshree Periwal High School is located " +
            "on Ajmer Road in Jaipur. Its official " +
            "disclosures list CBSE affiliation and " +
            "senior secondary classes. The school " +
            "also describes day and boarding options.",
    },
    "Seedling Public School": {
        url: "https://seedlingschools.com/",
        board: "CBSE",
        description:
            "Seedling Public School is located in " +
            "Jawahar Nagar, Jaipur. CBSE lists the " +
            "school as a senior secondary affiliate. " +
            "Its official website provides current " +
            "campus and programme information.",
    },
    "Subodh Public School": {
        url: "https://www.subodhpublicschool.com/",
        board: "CBSE",
        description:
            "Subodh Public School is located on " +
            "Bhawani Singh Marg in Jaipur. CBSE " +
            "lists it as a senior secondary school. " +
            "The school is managed by S.S. Jain " +
            "Subodh Shiksha Samiti.",
    },
    "Delhi Public School": {
        url: "https://www.dpsjaipur.com/",
        board: "CBSE",
        description:
            "Delhi Public School Jaipur is located " +
            "on Jaipur–Ajmer Highway at Bhankrota. " +
            "The school is affiliated with CBSE and " +
            "serves classes through senior " +
            "secondary. Its official site publishes " +
            "current campus and programme details.",
    },
    "The Mother's International School": {
        url: "https://themis.in/",
        board: "CBSE",
        description:
            "The Mother’s International School is " +
            "located on Sri Aurobindo Marg in New " +
            "Delhi. Its current mandatory disclosure " +
            "lists permanent CBSE affiliation. The " +
            "school was established in 1956 and " +
            "publishes its academic information " +
            "online.",
    },
    "Bright Day School": {
        url: "https://www.thebrightschool.com/",
        board: "CBSE",
        description:
            "Bright Day School’s Vasna–Bhayli Road " +
            "campus is in Vadodara. CBSE lists it as " +
            "a senior secondary affiliated school. " +
            "The school publishes mandatory " +
            "disclosures and curriculum information " +
            "online.",
    },
    "The Galaxy School": {
        url: "https://www.thegalaxyschool.org/",
        board: "IB Diploma Programme",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "The Galaxy School is located on " +
            "University Road in Rajkot. The " +
            "International Baccalaureate directory " +
            "lists its Diploma Programme. It is a " +
            "co-educational day school without " +
            "boarding facilities.",
    },
    "Anand Niketan School": {
        url: "https://www.anandniketansatellite.edu.in/",
        board: "CISCE (ICSE/ISC)",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Anand Niketan School’s Satellite campus " +
            "is in Ahmedabad. The school’s " +
            "curriculum information identifies ICSE " +
            "and ISC examinations under CISCE. Its " +
            "official site describes a city campus " +
            "established in 2005.",
    },
    "The Daly College": {
        url: "https://dalycollege.org/",
        board: "CBSE; Cambridge IGCSE (programme-dependent)",
        status: "Co-educational day and boarding school",
        schoolType: "Co-educational school",
        description:
            "The Daly College is a co-educational " +
            "day and residential school in Indore. " +
            "CBSE is its regular board, and the " +
            "school also offers Cambridge " +
            "examinations. Its large campus includes " +
            "academic, sports and residential " +
            "facilities.",
    },
    "Sacred Heart Senior Secondary School": {
        url: "https://shsdharamshala.com/",
        board: "CISCE (ICSE/ISC)",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Sacred Heart Senior Secondary School is " +
            "located in Sidhpur, Dharamshala. The " +
            "school is affiliated with CISCE for " +
            "ICSE and ISC examinations. It serves " +
            "students from kindergarten through " +
            "senior secondary classes.",
    },
    "St. George's College": {
        url: "https://www.stgeorgescollege.in/",
        board: "CISCE (ICSE/ISC)",
        status: "Boys' boarding and day school",
        schoolType: "Boys school",
        description:
            "St. George’s College is located in " +
            "Barlowganj, Mussoorie. It is affiliated " +
            "with CISCE and serves boys as boarders " +
            "and day students. The school’s hillside " +
            "campus dates to the nineteenth century.",
    },
    "Sherwood College": {
        url: "https://www.sherwood.edu.in/",
        board: "CISCE (ICSE/ISC); CBSE (programme-dependent)",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "Sherwood College is a co-educational " +
            "residential school in Nainital. Its " +
            "official admissions information lists " +
            "CBSE and ICSE board pathways. The " +
            "school operates from its historic " +
            "Ayarpatta campus.",
    },
    "Seth Anandram Jaipuria School": {
        url: "https://www.jaipuria.edu.in/ghaziabadschool/",
        board: "CBSE",
        description:
            "Seth Anandram Jaipuria School’s " +
            "Vasundhara campus is in Ghaziabad. CBSE " +
            "lists it as a senior secondary " +
            "affiliated school. The school publishes " +
            "campus and academic information through " +
            "its official site.",
    },
    "The Shri Ram School, Aravali": {
        url: "https://www.tsrs.org/aravali-campus",
        board: "CISCE (ICSE/ISC)",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "The Shri Ram School Aravali campus is " +
            "in DLF Phase IV, Gurugram. The school " +
            "follows the CISCE curriculum and offers " +
            "ICSE and ISC. It serves students from " +
            "early years through Grade 12.",
    },
    "Army Public School, Dagshai": {
        url: "https://www.apsdagshai.org/",
        board: "CBSE",
        description:
            "Army Public School Dagshai is located " +
            "in Solan district, Himachal Pradesh. " +
            "CBSE lists it as a senior secondary " +
            "affiliated school. The school publishes " +
            "its curriculum and campus information " +
            "online.",
    },
    "The Scindia School": {
        url: "https://www.scindia.edu/",
        board: "CBSE",
        status: "Boys' boarding school",
        schoolType: "Boys school",
        description:
            "The Scindia School is a boys’ " +
            "residential school located at Gwalior " +
            "Fort. The school’s official transfer " +
            "certificates identify it as affiliated " +
            "with CBSE. Its campus provides a " +
            "boarding school programme.",
    },
    "Delhi Public School, Noida": {
        url: "https://dpsnoida.co.in/",
        board: "CBSE; Cambridge (early years, programme-dependent)",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Delhi Public School, Noida is a " +
            "co-educational school in Sector 30, " +
            "Noida. Its published curriculum " +
            "includes CBSE, with Cambridge options " +
            "noted for early years. It serves " +
            "students from pre-nursery through Class " +
            "XII.",
    },
    "Sunbeam School, Lahartara": {
        url: "https://www.sunbeamschools.com/school/lahartara/",
        board: "CBSE",
        description:
            "Sunbeam School Lahartara is located " +
            "near Lahartara Overbridge in Varanasi. " +
            "The school publishes a CBSE affiliation " +
            "and mandatory disclosures. Its website " +
            "describes academic, activity and campus " +
            "programmes.",
    },
    "Delhi Public School, Indore": {
        url: "https://www.dpsindore.org/",
        board: "CBSE",
        description:
            "Delhi Public School, Indore is located " +
            "on the Nepania Road campus. CBSE lists " +
            "this campus as a senior secondary " +
            "affiliate. The school publishes " +
            "academic and activity information " +
            "through its official site.",
    },
    "Sagar Public School": {
        url: "https://www.spssn.ac.in/",
        board: "CBSE",
        description:
            "Sagar Public School’s Saket Nagar " +
            "campus is in Bhopal. CBSE lists the " +
            "school as a senior secondary affiliate. " +
            "The school network publishes programme " +
            "and campus information online.",
    },
    "Carmel Convent Senior Secondary School": {
        url: "https://www.carmelratanpur.net/",
        board: "CBSE",
        description:
            "Carmel Convent Senior Secondary School " +
            "is located in Ratanpur, Bhopal. CBSE " +
            "lists it as a senior secondary " +
            "affiliate. The school’s official " +
            "website provides current school " +
            "information.",
    },
    "Vindhyachal Academy": {
        url: "https://www.vindhyachalacademy.com/",
        board: "CBSE",
        description:
            "Vindhyachal Academy is located on A.B. " +
            "Road in Dewas, Madhya Pradesh. CBSE " +
            "lists it as a senior secondary " +
            "affiliated school. The school publishes " +
            "campus and programme information on its " +
            "website.",
    },
    "Delhi Public School, Hyderabad": {
        url: "https://dpshyderabad.com/",
        board: "CBSE",
        description:
            "Delhi Public School Hyderabad is " +
            "located at Khajaguda in Hyderabad. CBSE " +
            "lists it as a senior secondary " +
            "affiliated school. Its official site " +
            "publishes campus and academic " +
            "information.",
    },
    "Bharatiya Vidya Bhavan's Public School": {
        url: "https://www.bvbpsjh.org/",
        board: "CBSE",
        description:
            "Bharatiya Vidya Bhavan’s Public School " +
            "is on Road No. 71 in Jubilee Hills, " +
            "Hyderabad. CBSE lists it as a senior " +
            "secondary affiliate. The school is part " +
            "of the Bharatiya Vidya Bhavan network.",
    },
    "Silver Oaks International School": {
        url: "https://www.silveroaks.co.in/",
        board: "CBSE; IB PYP (campus-dependent)",
        description:
            "Silver Oaks International School " +
            "operates multiple campuses in Hyderabad " +
            "and the surrounding area. CBSE lists " +
            "its Oakdale campus as a secondary " +
            "school affiliate. Curriculum and " +
            "available grades vary by campus.",
    },
    "Nasr School": {
        url: "https://nasrschool.in/",
        board: "CISCE (ICSE/ISC)",
        status: "Girls' day school",
        schoolType: "Girls school",
        description:
            "Nasr School’s Khairatabad campus is a " +
            "girls’ school in Hyderabad. It is " +
            "listed in the CISCE school directory " +
            "for ICSE and ISC. Nasr also operates " +
            "separate boys’ and pre-primary campuses.",
    },
    "Little Angels School": {
        url: "https://littleangels.org.in/",
        board: "CBSE",
        description:
            "Little Angels School is located in " +
            "Visakhapatnam, Andhra Pradesh. Its " +
            "official mandatory disclosure lists a " +
            "CBSE affiliation. The school publishes " +
            "campus and academic details for " +
            "families.",
    },
    "Sri Prakash Synergy School": {
        url: "https://spss.edu.in/campuses/peddapuram/",
        board: "CBSE",
        status: "Day-cum-residential school",
        schoolType: "Co-educational school",
        description:
            "Sri Prakash Synergy School’s Peddapuram " +
            "campus is in Andhra Pradesh. The school " +
            "lists its curriculum as CBSE and " +
            "describes a day-cum-residential model. " +
            "It offers classes from pre-school " +
            "through Grade X at this campus.",
    },
    "Delhi Public School, Vijayawada": {
        url: "https://dpsvijayawada.org/",
        board: "CBSE; Cambridge International",
        description:
            "Delhi Public School Vijayawada is " +
            "located at Nidamanuru. Its official " +
            "website lists CBSE and Cambridge " +
            "International programmes. Check the " +
            "school’s programme pages for " +
            "campus-specific details.",
    },
    "Auckland House School": {
        url: "https://aucklandhouseschool.in/",
        board: "CISCE (ICSE/ISC)",
        status: "Girls' day and boarding school",
        schoolType: "Girls school",
        description:
            "Auckland House School is a girls’ " +
            "school in Shimla. The school says it is " +
            "affiliated with CISCE and offers day " +
            "and boarding options. Its official site " +
            "lists academic and admissions " +
            "information.",
    },
    "Dalhousie Public School": {
        url: "https://dalhousiepublicschool.com/",
        board: "CBSE",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "Dalhousie Public School is a " +
            "residential school in Dalhousie, " +
            "Himachal Pradesh. Its published school " +
            "information identifies CBSE " +
            "affiliation. The school describes a " +
            "boarding campus and publishes admission " +
            "information online.",
    },
    "Chinmaya Vidyalaya": {
        url: "https://chinmayavidyalayanauni.com/",
        board: "CBSE",
        description:
            "Chinmaya Vidyalaya is located at Nauni " +
            "in Solan district, Himachal Pradesh. " +
            "CBSE lists the school as a senior " +
            "secondary affiliate. It is situated on " +
            "the campus of Dr. Y.S. Parmar " +
            "University of Horticulture and Forestry.",
    },
    "St. Edward's School": {
        url: "https://stedwardsshimla.org/",
        board: "CBSE",
        status: "Boys' day school",
        schoolType: "Boys school",
        description:
            "St. Edward’s School is located in " +
            "Milsington, Shimla. The school states " +
            "that it changed to CBSE affiliation in " +
            "2008. It serves students from nursery " +
            "through Class XII.",
    },
    "DAV Public School": {
        url: "https://www.davsundernagar.in/",
        board: "CBSE",
        description:
            "The DAV Public School listing is in " +
            "Mandi district, Himachal Pradesh. The " +
            "CBSE directory lists DAV Public School " +
            "in Sundernagar as a senior secondary " +
            "affiliate. Confirm the specific campus " +
            "because the region has several DAV " +
            "schools.",
    },
    "St. Mary's Convent Inter College": {
        board: "CISCE (ICSE/ISC)",
        description:
            "St. Mary’s Convent Inter College is " +
            "listed by CISCE in Prayagraj. The " +
            "school offers ICSE and ISC " +
            "examinations. Its campus is identified " +
            "as a girls’ day school in the CISCE " +
            "directory.",
    },
    "The Asian School": {
        url: "https://www.theasianschool.net/",
        board: "CBSE",
        status: "Co-educational boarding school",
        schoolType: "Co-educational school",
        description:
            "The Asian School is located in Vasant " +
            "Vihar, Dehradun. CBSE lists the school " +
            "as a senior secondary affiliate. The " +
            "school provides boarding facilities and " +
            "publishes campus information on its " +
            "website.",
    },
    "Mussoorie International School": {
        url: "https://www.misindia.net/",
        board: "IB; CISCE; Cambridge (programme-dependent)",
        status: "Girls' boarding school",
        schoolType: "Girls school",
        description:
            "Mussoorie International School is a " +
            "girls’ boarding school in Mussoorie. " +
            "Its published programme information " +
            "includes IB, CISCE and Cambridge " +
            "pathways. The curriculum offered can " +
            "vary by grade and programme.",
    },
    "Ecole Globale International Girls' School": {
        url: "https://www.ecoleglobale.com/",
        board: "CBSE; Cambridge",
        status: "Girls' boarding school",
        schoolType: "Girls school",
        description:
            "Ecole Globale International Girls’ " +
            "School is a residential girls’ school " +
            "in Dehradun district. It is affiliated " +
            "with CBSE and offers a Cambridge " +
            "pathway. The school publishes programme " +
            "and campus disclosures on its website.",
    },
    "Mount St. Mary's School": {
        url: "https://msmschool.in/",
        board: "CBSE",
        description:
            "Mount St. Mary’s School is located in " +
            "Delhi Cantonment, New Delhi. CBSE lists " +
            "it as a senior secondary affiliated " +
            "school. The school publishes its " +
            "academic and campus information online.",
    },
    "Vasant Valley School": {
        url: "https://www.vasantvalley.org/",
        board: "CBSE",
        description:
            "Vasant Valley School is located in " +
            "Vasant Kunj, New Delhi. CBSE lists it " +
            "as a senior secondary affiliated " +
            "school. The school’s official site " +
            "provides details about its programmes " +
            "and community.",
    },
    "Loreto Convent School": {
        url: "https://www.loretodelhi.com/",
        board: "CBSE",
        description:
            "Loreto Convent School is located on " +
            "Parade Road in Delhi Cantonment. CBSE " +
            "lists it as a senior secondary " +
            "affiliated school. The school is " +
            "managed by the Loreto Educational " +
            "Society.",
    },
    "Zebar School for Children": {
        url: "https://www.zebarschool.com/about-zebar-school/",
        board: "CBSE",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Zebar School for Children is located in " +
            "Thaltej, Ahmedabad. The school " +
            "describes itself as a co-educational " +
            "CBSE school. Its official site " +
            "publishes campus and academic " +
            "information for families.",
    },
    "Delhi Public School, Bopal": {
        url: "https://dpsbopal-ahd.edu.in/",
        board: "CBSE",
        status: "Co-educational day school",
        schoolType: "Co-educational school",
        description:
            "Delhi Public School Bopal is located in " +
            "Ahmedabad, Gujarat. Its school website " +
            "publishes CBSE information and school " +
            "disclosures. Check the current academic " +
            "and admissions pages for programme " +
            "details.",
    },
    "Navrachana International School": {
        url: "https://nisvcbse.in/",
        board: "CBSE; IB; Cambridge (programme-dependent)",
        status: "Day school",
        schoolType: "Co-educational school",
        description:
            "Navrachana International School " +
            "Vadodara is located in Vadodara, " +
            "Gujarat. The school network publishes " +
            "CBSE, IB and Cambridge pathways across " +
            "its programmes. Confirm the programme " +
            "and campus-specific curriculum directly " +
            "with the school.",
    },
};

// Campus photos come from school sites or education directories.
// Image-page links are retained on each card for photo/source transparency.
export const campusPhotos = {
    "The Shri Ram School, Aravali": {
        image: "https://tsrs.org/brand/school-campuses/hero/aravali-hero.png",
        source: "https://tsrs.org/aravali-campus",
        credit: "Photo source: The Shri Ram School",
    },
    "The Shri Ram School": {
        image: "https://tsrs.org/brand/school-campuses/hero/vasant-vihar-hero.jpg",
        source: "https://tsrs.org/vasant-vihar-campus",
        credit: "Photo source: The Shri Ram School",
    },
    "Ravindra Bharathi School": {
        image: "https://www.rbschools.in/images/ravindra-bharathi-school-banners/slide2.jpg",
        source: "https://www.rbschools.in/",
        credit: "Photo source: Ravindra Bharathi Schools",
    },
    "Loreto Convent School": {
        image: "https://www.loretodelhi.com/images/about-us.png",
        source: "https://www.loretodelhi.com/Default.aspx",
        credit: "Photo source: Loreto Convent School",
    },
    "St. John's Senior Secondary School": {
        image: "https://cdn-blogs.extramarks.com/2025/09/Artboard-1-copy-16%402x-1024x640.webp",
        source: "https://www.extramarks.com/blogs/schools/best-schools-in-varanasi/",
        credit: "Photo source: Extramarks",
    },
    "The Mother's International School": {
        image: "https://skoodos.com/public/blog_images/mothers-international-school-600x400.jpg",
        source: "https://skoodos.com/en/blog/list-of-top-10-best-schools-in-delhi",
        credit: "Photo source: Skoodos",
    },
    "Sacred Heart Senior Secondary School": {
        image: "https://i.pinimg.com/1200x/55/54/b2/5554b265e61a708f5b5c5561ca09f6ee.jpg",
        source: "https://shsdharamshala.com/",
        credit: "Photo source: Sacred Heart School",
    },
    "DAV Public School": {
        image: "https://www.schooldekho.org/storage/gallery/mquwf14amo0wso8w8og44wkow4w0s0k.jpg",
        source: "https://www.schooldekho.org/details/DAV-Centenary-Public-school-11380",
        credit: "Photo source: SchoolDekho",
    },
    "Birla Vidya Mandir": {
        image: "https://www.birlavidyamandir.com/images/menu/01.jpg",
        source: "https://www.birlavidyamandir.com/",
        credit: "Photo source: Birla Vidya Mandir",
    },
    "Maharaja Sawai Man Singh Vidyalaya": {
        image:
            "https://www.pathshalapro.com/blog/wp-con" +
            "tent/uploads/2023/03/Maharaja-Sawai-Man-" +
            "Singh-Vidyalaya.png",
        source: "https://www.pathshalapro.com/blog/maharaja-sawai-man-singh-vidyalaya-jaipur/",
        credit: "Photo source: Pathshala Pro",
    },
    "The Galaxy School": {
        image: "https://www.thegalaxyschool.org/uploads/1/5/1/3/151377150/2c0a6648_orig.jpg",
        source: "https://www.thegalaxyschool.org/campus.html",
        credit: "Photo source: The Galaxy School",
    },
    "Kendriya Vidyalaya No. 1": {
        image:
            "https://cdn.prod.website-files.com/62849" +
            "43f887c4094af5abb07/680b74b521a867ab11ed" +
            "816e_AB5caB-SImTbEJuvv5Axf3_QTMtPfE1D7wL" +
            "7vmtC1rRWwLHl5LtrOdMxjP-xb_0bZFDrBe_UwnW" +
            "vno1jzpHfOkvanXTN9Tap0Nk6bKz2v-MwTs6Gj19" +
            "uqWHuuUfTdgAug_Wz7mFTvCZ5%3Ds1360-w1360-" +
            "h1020.jpeg",
        source: "https://www.cbse360.com/blog/top-10-cbse-schools-in-vijayawada/",
        credit: "Photo source: CBSE360",
    },
    "Nasr School": {
        image:
            "https://www.teacherhorizons.com/static/m" +
            "ediav2/schools/6875/images/936147_main.j" +
            "pg",
        source: "https://www.teacherhorizons.com/schools/asia-india-hyderabad-nasr-boys-school",
        credit: "Photo source: Teacher Horizons",
    },
    "Choithram School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/9644/user_root_user%40ezy.co" +
            "m/2023-03-14.webp",
        source: "https://ezyschooling.com/school/choithram-school-rajmahal-colony-indore",
        credit: "Photo source: Ezyschooling",
    },
    "Carmel Convent Senior Secondary School": {
        image:
            "https://cache.careers360.mobi/media/scho" +
            "ols/social-media/media-gallery/10263/202" +
            "6/3/28/School%20Building.jpg",
        source:
            "https://school.careers360.com/schools/ca" +
            "rmel-convent-senior-secondary-school-bho" +
            "pal",
        credit: "Photo source: Careers360",
    },
    "Vindhyachal Academy": {
        image:
            "https://yayskool-school-images.s3.ap-sou" +
            "th-1.amazonaws.com/422326vindh-school.jp" +
            "g",
        source: "https://www.yayskool.com/school/vindhyachal-academy-bhopal-7152326",
        credit: "Photo source: Yayskool",
    },
    "Welham Girls' School": {
        image:
            "https://akm-img-a-in.tosshub.com/indiato" +
            "day/styles/medium_crop_simple/public/202" +
            "5-07/main_gate_2.jpg?VersionId=osZ3pVN1M" +
            "BMfhltEeuq2RrLJvm1CKp5b&size=750%3A%2A",
        source:
            "https://www.indiatoday.in/education-toda" +
            "y/featurephilia/story/never-compromise-o" +
            "n-what-you-believe-in-inside-the-ethos-o" +
            "f-welham-girls-school-2751907-2025-07-07",
        credit: "Photo source: India Today",
    },
    "The Asian School": {
        image: "https://i.pinimg.com/1200x/ed/c6/26/edc62645928fae6aac4c249effa699d1.jpg",
        source: "https://www.eduminatti.com/schools/dehradun/the-asian-school-dehradun",
        credit: "Photo source: Eduminatti",
    },
    "Mussoorie International School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/user_admissioncounsellor%40m" +
            "isindia.org/2018-03-29.jpg",
        source: "https://ezyschooling.com/school/mussoorie-international-school-mussoorie",
        credit: "Photo source: Ezyschooling",
    },
    "Army Public School, Dagshai": {
        image:
            "https://static.where-e.com/India/Himacha" +
            "l_Pradesh/Shimla_Division/Army-Public-Sc" +
            "hool-Dagshai_f9c261cb428850b35cfae4ce21a" +
            "2d429.jpg",
        source: "https://army-public-school-dagshai.wheree.com/",
        credit: "Photo source: Wheree",
    },
    "St. Edward's School": {
        image: "https://www.stedwardsshimla.org/images/slider/full/slider1.jpg",
        source: "https://stedwardsshimla.org/",
        credit: "Photo source: St. Edward's School",
    },
    "Chinmaya Vidyalaya": {
        image:
            "https://chinmayavidyalayanauni.com/admis" +
            "sion-2025/assets/img/Boarding-Aerialview" +
            "-1024x576-1.jpg",
        source: "https://chinmayavidyalayanauni.com/admission-2025/index.html",
        credit: "Photo source: Chinmaya Vidyalaya",
    },
    "The Scindia School": {
        image:
            "https://bsai.co.in/admin/logged/images/h" +
            "omeslider/e4da3b7fbbce2345d7772b0674a318" +
            "d53-scindia-school.jpg",
        source: "https://bsai.co.in/",
        credit: "Photo source: Boarding Schools' Association of India",
    },
    "Welham Boys' School": {
        image: "https://www.welhamboys.org/images/large/principal-s-welcome.jpg",
        source: "https://www.welhamboys.org/principal-s-welcome-welham-boys-school",
        credit: "Photo source: Welham Boys' School",
    },
    "Woodstock School": {
        image:
            "https://cdn-blogs.extramarks.com/2026/05" +
            "/Woodstock-School-%E2%80%93-Landour-Muss" +
            "oorie.webp",
        source: "https://www.extramarks.com/blogs/schools/best-schools-in-uttarakhand/",
        credit: "Photo source: Extramarks",
    },
    "St. George's College": {
        image:
            "https://classhud.com/assets/media/upload" +
            "s/listing/cover_image/st-george-s-colleg" +
            "e.jpg",
        source: "https://classhud.com/best/school/st-georges-college/mussoorie",
        credit: "Photo source: ClassHud",
    },
    "Ecole Globale International Girls' School": {
        image: "https://www.globalboardings.com/images/schools/7/gallery/Ecole_globale_3.jpg",
        source:
            "https://www.globalboardings.com/dehradun" +
            "/ecole-globale-international-girls-schoo" +
            "l",
        credit: "Photo source: Global Edu Consulting",
    },
    "Seth Anandram Jaipuria School": {
        image: "https://hindi.news24online.com/wp-content/uploads/2025/04/school.jpg",
        source:
            "https://hindi.news24online.com/state/up-" +
            "uk/ghaziabad-seth-anandram-jaipuria-scho" +
            "ol-relief-fee-hike-dfrc-decision-on-pare" +
            "nt-petition-dismissed-in-high-court/1162" +
            "178/",
        credit: "Photo source: News24",
    },
    "St. Mary's Convent Inter College": {
        image: "https://cdn-blogs.extramarks.com/2025/10/Artboard-1-copy-18-1.webp",
        source: "https://www.extramarks.com/blogs/schools/best-schools-in-allahabad/",
        credit: "Photo source: Extramarks",
    },
    "Boys' High School and College": {
        image: "https://cdn-blogs.extramarks.com/2025/10/Artboard-1-copy-12-1.webp",
        source: "https://www.extramarks.com/blogs/schools/best-schools-in-allahabad/",
        credit: "Photo source: Extramarks",
    },
    "Sunbeam School, Lahartara": {
        image: "https://resources.edunexttechnologies.com/web-data/sunbeam/images/lht-school.jpg",
        source: "https://www.sunbeamschools.com/school/lahartara/",
        credit: "Photo source: Sunbeam Schools",
    },
    "Campion School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/infra/images/473601_49505400385529" +
            "2_2049528738_o.jpg",
        source: "https://ezyschooling.com/school/campion-school-arera-colony-bhopal/photos",
        credit: "Photo source: Ezyschooling",
    },
    "Sagar Public School": {
        image:
            "https://cdn.schoolsuniverse.com/media/up" +
            "loads/2024-10-21%2012%3A15%3A56.099484SP" +
            "S%20Saket5.jpg",
        source: "https://www.schoolsuniverse.com/school/sagar-public-school-saket-nagar-bhopal",
        credit: "Photo source: SchoolsUniverse",
    },
    "Delhi Public School, Indore": {
        image:
            "https://cdn-blogs.extramarks.com/2026/03" +
            "/Delhi-Public-School-Indore-1024x683.web" +
            "p",
        source: "https://www.extramarks.com/blogs/schools/best-cbse-schools-in-indore/",
        credit: "Photo source: Extramarks",
    },
    "The Hyderabad Public School, Ramanthapur": {
        image:
            "https://eduvow.com/images/school/774_the" +
            "-hyderabad-public-school-ramanthapur-1.j" +
            "pg",
        source: "https://eduvow.com/school-details/the-hyderabad-public-school-ramanthapur",
        credit: "Photo source: Eduvow",
    },
    "Delhi Public School, Hyderabad": {
        image:
            "https://cache.careers360.mobi/media/scho" +
            "ols/social-media/media-gallery/16659/202" +
            "6/3/21/School%20Building.png",
        source: "https://school.careers360.com/schools/delhi-public-school-khajaguda-hyderabad",
        credit: "Photo source: Careers360",
    },
    "Glendale Academy": {
        image:
            "https://uploads-ssl.webflow.com/5d4d465d" +
            "8620ae7bba3a602d/5d8dfc84c33e99a1ff144f4" +
            "3_ga-front.jpg",
        source: "https://www.glendale.edu.in/glendale-academy/campus",
        credit: "Photo source: Glendale Academy",
    },
    "Dr. KKR's Gowtham School": {
        image: "https://kkrgowtham.com/wp-content/uploads/2015/12/gudavalli_branch.jpg",
        source: "https://kkrgowtham.com/",
        credit: "Photo source: KKR's Gowtham",
    },
    "Bhashyam Public School": {
        image:
            "https://cdn.shopify.com/s/files/1/0896/6" +
            "753/5157/files/bhashyam-public-school-gu" +
            "ntur-ho-guntur-schools-qpvcwgq-e15484012" +
            "64462.jpg",
        source: "https://www.chaibisket.com/blogs/blog/bhashyam-things",
        credit: "Photo source: Chai Bisket",
    },
    "Sri Prakash Synergy School": {
        image:
            "https://storage.googleapis.com/cdn-edust" +
            "oke/mysql_images/full/6df9b586-877d-459c" +
            "-9bb7-a9a7ebce89bf_dcfb8f38.webp",
        source:
            "https://www.edustoke.com/residential/eas" +
            "t-godavari/sri-prakash-senergy-school-pe" +
            "ddapuram",
        credit: "Photo source: Edustoke",
    },
    "Delhi Public School, Vijayawada": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/12210/user_root_user%40ezy.c" +
            "om/unnamed_30.jpg",
        source:
            "https://ezyschooling.com/school/delhi-pu" +
            "blic-school-dps-vijayawada-andhra-prades" +
            "h/fees-structure",
        credit: "Photo source: Ezyschooling",
    },
    "Nalanda Vidya Niketan": {
        image: "https://nvn.edu.in/_app/immutable/assets/image-2.rteP2zkr.jpeg",
        source: "https://nvn.edu.in/contact-us/",
        credit: "Photo source: Nalanda Vidya Niketan",
    },
    "Zebar School for Children": {
        image: "https://www.zebarschool.com/wp-content/uploads/2025/12/2023-1.webp",
        source: "https://www.zebarschool.com/the-noon-shift-at-zebar/",
        credit: "Photo source: Zebar School",
    },
    "Delhi Public School, Bopal": {
        image:
            "https://media.licdn.com/dms/image/v2/C4E" +
            "1BAQFZ9wBH9C5LvA/company-background_1000" +
            "0/company-background_10000/0/15845092565" +
            "68/dps_bopal_ahmedabad_cover?e=214748364" +
            "7&t=YF45UiwHVME9V11OR_4npz4fmJzmZzQLnlGN" +
            "IfFkZ8k&v=beta",
        source: "https://in.linkedin.com/school/dps-bopal-ahmedabad/",
        credit: "Photo source: DPS Bopal",
    },
    "Anand Niketan School": {
        image:
            "https://storage.googleapis.com/cdn-edust" +
            "oke/mysql_images/full/b9145a1e-ea2e-40fc" +
            "-80e1-333daf9eddfc_634189a7.webp",
        source: "https://www.edustoke.com/ahmedabad/anand-niketan-satellite",
        credit: "Photo source: Edustoke",
    },
    "Navrachana International School": {
        image: "https://i.pinimg.com/736x/2e/c6/19/2ec6196c0381975990814fafe4411b4d.jpg",
        source:
            "https://indianexpress.com/article/cities" +
            "/ahmedabad/vadodara-navrachna-school-bom" +
            "b-threat-9796383/",
        credit: "Photo source: The Indian Express",
    },
    "Bright Day School": {
        image:
            "https://cache.careers360.mobi/media/scho" +
            "ols/social-media/media-gallery/4902/2021" +
            "/6/29/download%20_13_.png",
        source:
            "https://school.careers360.com/schools/br" +
            "ight-day-school-vasna-bhaili-road-vadoda" +
            "ra",
        credit: "Photo source: Careers360",
    },
    "Maharani Gayatri Devi Girls' School": {
        image:
            "https://theacademicinsights.com/wp-conte" +
            "nt/uploads/2022/06/Maharani-Gayatri-Devi" +
            "-Girls-Public-School-Jaipur.jpeg",
        source:
            "https://theacademicinsights.com/maharani" +
            "-gayatri-devi-girls-public-school-jaipur" +
            "/",
        credit: "Photo source: The Academic Insights",
    },
    "Subodh Public School": {
        image:
            "https://www.pasch-net.de/resources/files" +
            "/jpg918/subodh-public-school_gebaeude-fo" +
            "rmatkey-jpg-w1760r.jpg",
        source:
            "https://www.pasch-net.de/de/pasch-schule" +
            "n/schulportraets/asien/ind/subodh-public" +
            "-school.html",
        credit: "Photo source: PASCH-Initiative",
    },
    "Mount St. Mary's School": {
        image: "https://msmschool.in/wp-content/uploads/2020/11/msm-facade3.jpg",
        source: "https://msmschool.in/",
        credit: "Photo source: Mount St. Mary's School",
    },
    "Vasant Valley School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/2024-09-10_12-30-03/5enw/infra/ima" +
            "ges/2019-12-12.webp",
        source:
            "https://ezyschooling.com/school/vasant-v" +
            "alley-school-vasant-kunj-south-west-delh" +
            "i/photos",
        credit: "Photo source: Ezyschooling",
    },
    "Dalhousie Public School": {
        image: "https://dalhousiepublicschool.com/wp-content/uploads/2025/02/DJI_0212-scaled.jpg",
        source: "https://dalhousiepublicschool.com/arrange-campus-visit/",
        credit: "Photo source: Dalhousie Public School",
    },
    "Sherwood College": {
        image:
            "https://storage.googleapis.com/cdn-edust" +
            "oke/mysql_images/full/b4ff7d58-aad5-420d" +
            "-9d23-6ee2a639aeef_bbe0c642.webp",
        source: "https://www.edustoke.com/residential/nainital/sherwood-college-ayarpatta",
        credit: "Photo source: Edustoke",
    },
    "Oakridge International School": {
        image:
            "https://www.oakridge.in/local-social-med" +
            "ia/gachibowli/international-school-in-ga" +
            "chibowli-hyderabad/img/VIZ.jpg",
        source:
            "https://www.oakridge.in/local-social-med" +
            "ia/gachibowli/international-school-in-ga" +
            "chibowli-hyderabad/",
        credit: "Photo source: Oakridge International School",
    },
    "Chirec International School": {
        image: "https://i.pinimg.com/736x/d7/72/18/d77218382920434036b3693cdd19f7bb.jpg",
        source: "https://www.inschools.in/CBSE-Schools-In-Hyderabad.html",
        credit: "Photo source: INschools India",
    },
    "Meridian School": {
        image: "https://www.meridianschool.in/images/camp3.jpg",
        source: "https://www.meridianschool.in/?m=330111",
        credit: "Photo source: Meridian School",
    },
    "Mayo College": {
        image:
            "https://www.careers360.com/webstories/to" +
            "p-10-most-beautiful-college-campuses-in-" +
            "india/assets/4.jpeg",
        source:
            "https://www.careers360.com/webstories/to" +
            "p-10-most-beautiful-college-campuses-in-" +
            "india/",
        credit: "Photo source: Careers360",
    },
    "Mayo College Girls' School": {
        image: "https://mcgs.ac.in/assets/img/campus-life/estate-2.jpg",
        source: "https://mcgs.ac.in/about-us/about-mayo",
        credit: "Photo source: Mayo College Girls' School",
    },
    "Birla Public School": {
        image:
            "https://upload.wikimedia.org/wikipedia/c" +
            "ommons/thumb/9/98/Birla_Public_School%2C" +
            "_Pilani.jpg/1280px-Birla_Public_School%2" +
            "C_Pilani.jpg",
        source: "https://commons.wikimedia.org/wiki/File:Birla_Public_School,_Pilani.jpg",
        credit: "Photo: Birla Public School (CC BY-SA 4.0)",
    },
    "Birla Balika Vidyapeeth": {
        image: "https://www.ipsc.co.in/images/member/birla_balika_vidyapeeth_img1.jpg",
        source: "https://www.ipsc.co.in/member-details.asp?id=5",
        credit: "Photo source: IPSC",
    },
    "The Sagar School": {
        image: "https://thesagarschool.org/images/explore-campus/sm/01.jpg",
        source: "https://thesagarschool.org/",
        credit: "Photo source: The Sagar School",
    },
    "Delhi Public School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/user_admission%40dpsjaipur.c" +
            "om/unnamed.jpg",
        source: "https://ezyschooling.com/school/delhi-public-school-hasampura-jaipur",
        credit: "Photo source: Ezyschooling",
    },
    "Maharaja Sawai Man Singh Vidyalaya": {
        image:
            "https://xqwnwkxvvhnaawbqdiwe.supabase.co" +
            "/storage/v1/object/public/school-images/" +
            "37.png",
        source: "https://schoolsarena.in/board/CBSE/location/Jaipur",
        credit: "Photo source: SchoolsArena",
    },
    "Jayshree Periwal High School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/user_root_user%40ezy.com/2E0" +
            "A1264edtd-scaled.jpg",
        source: "https://ezyschooling.com/school/jayshree-periwal-high-school-chitrakoot-jaipur",
        credit: "Photo source: Ezyschooling",
    },
    "The Palace School": {
        image:
            "https://www.livehindustan.com/lh-img/sma" +
            "rt/img/2025/06/16/1200x900/The_palace_Sc" +
            "hool__1750067614917_1750067615177.jpg",
        source:
            "https://www.livehindustan.com/rajasthan/" +
            "jaipur/jaipur-palace-school-bomb-threat-" +
            "bomb-squad-deployed-manak-chowk-police-a" +
            "lert-201750065771410.html",
        credit: "Photo source: Hindustan",
    },
    "Seedling Public School": {
        image: "https://seedling-hybrid.vercel.app/smhs_images/seedling_images/img359.webp",
        source: "https://seedling-hybrid.vercel.app/about",
        credit: "Photo source: Seedling Group of Schools",
    },
    "Delhi Public School, Jaipur": {
        image: "https://educationworld.in/wp-content/uploads/2013/03/DPS-Jaipur.jpg",
        source: "https://educationworld.in/delhi-public-school-jaipur/",
        credit: "Photo source: EducationWorld",
    },
    "Delhi Public School, R.K. Puram": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/2025-06-05_12-24-08/ndvy/infra/ima" +
            "ges/C-Block.webp",
        source: "https://ezyschooling.com/school/delhi-public-school-r-k-puram-main-delhi",
        credit: "Photo source: Ezyschooling",
    },
    "Modern School, Barakhamba Road": {
        image: "https://images.indianexpress.com/2022/06/modern-school.jpg?w=1200",
        source:
            "https://indianexpress.com/article/cities" +
            "/delhi/modern-school-asks-ews-children-t" +
            "o-pay-rs-67000-in-fees-7980765/",
        credit: "Photo source: The Indian Express",
    },
    "Springdales School, Pusa Road": {
        image:
            "https://www.pasch-net.de/resources/files" +
            "/jpg918/springdales-school_gebaeude-form" +
            "atkey-jpg-default.jpg",
        source:
            "https://www.pasch-net.de/de/pasch-schule" +
            "n/schulportraets/asien/ind/springdales-s" +
            "chool-pusa-road.html",
        credit: "Photo source: PASCH-Initiative",
    },
    "Bishop Cotton School": {
        image:
            "https://upload.wikimedia.org/wikipedia/c" +
            "ommons/e/e5/Aerial_view_of_Bishop_Cotton" +
            "_School_%28Shimla%29.jpg?_=2023032105444" +
            "1",
        source:
            "https://commons.wikimedia.org/wiki/File:" +
            "Aerial_view_of_Bishop_Cotton_School_(Shi" +
            "mla).jpg",
        credit: "Photo: Wikimedia Commons, CC BY-SA",
    },
    "Auckland House School": {
        image:
            "https://www.onlinehimachal.com/wp-conten" +
            "t/uploads/2024/10/Auckland-House-School-" +
            "Shimla.jpg",
        source: "https://www.onlinehimachal.com/blog/top-5-best-schools-in-himachal-pradesh/",
        credit: "Photo source: Online Himachal",
    },
    "The Lawrence School, Sanawar": {
        image:
            "https://www.sanawar.edu.in/admin/logged/" +
            "images/headimages/c4ca4238a0b923820dcc50" +
            "9a6f75849bheader-board-results.jpg",
        source: "https://www.sanawar.edu.in/detail.php?mid=Mg%3D%3D&sid=MTY%3D",
        credit: "Photo source: The Lawrence School",
    },
    "The Doon School": {
        image: "https://images.indianexpress.com/2019/03/doon759.jpg?w=1200",
        source:
            "https://indianexpress.com/article/educat" +
            "ion/doon-summer-leadership-programme-app" +
            "lications-open-check-details-doonschool-" +
            "com-5641804/",
        credit: "Photo source: The Indian Express",
    },
    "The Hyderabad Public School, Begumpet": {
        image: "https://www.hpss.org.in/images/campuses/begumpet.jpg",
        source: "https://www.hpss.org.in/",
        credit: "Photo source: HPS Society",
    },
    "Oakridge International School, Visakhapatnam": {
        image: "https://www.oakridgeinternational.com/vizag/images/school.jpg",
        source: "https://www.oakridgeinternational.com/vizag/cbse-Fact-sheet.html",
        credit: "Photo source: Oakridge International School",
    },
    "Little Angels School": {
        image: "https://top10schools.in/images/littleangels-vizag.jpg",
        source: "https://www.top10schools.in/andhra-pradesh/vizag/",
        credit: "Photo source: Top10Schools",
    },
    "The Daly College": {
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Daly_College%2C_Indore.jpg",
        source: "https://commons.wikimedia.org/wiki/File:Daly_College,_Indore.jpg",
        credit: "Photo: Wikimedia Commons, CC BY-SA",
    },
    "Emerald Heights International School": {
        image:
            "https://i.pinimg.com/736x/15/1f/2d/151f2dafe58d83838b08b22b9d2394a5.jpg",
        source: "https://indoreeducation.com/directory/emerald-heights-international-school/",
        credit: "Photo source: Indore Education",
    },
    "La Martiniere College": {
        image: "https://lucknowsocial.in/wp-content/uploads/2023/05/image-10-1024x768.png",
        source: "https://lucknowsocial.in/place/la-martiniere-college/",
        credit: "Photo source: Lucknow Social",
    },
    "City Montessori School": {
        image: "https://candidschools.com/wp-content/uploads/2024/02/122.13CMSlucknow.jpg",
        source: "https://candidschools.com/icse-schools-in-india-a-state-wise-list/",
        credit: "Photo source: Candid Schools",
    },
    "Delhi Public School, Noida": {
        image:
            "https://www.pasch-net.de/resources/files" +
            "/jpg938/dps-noida-1-formatkey-jpg-defaul" +
            "t.jpg",
        source:
            "https://www.pasch-net.de/de/pasch-schule" +
            "n/schulportraets/asien/ind/delhi-public-" +
            "school-noida.html",
        credit: "Photo source: PASCH-Initiative",
    },
    "Jubilee Hills Public School": {
        image:
            "https://i.pinimg.com/1200x/7f/e1/0d/7fe10dc1f36cea2e09591cde9bf43d92.jpg",
        source: "https://www.schoolsuniverse.com/school/jubilee-hills-public-school-hyderabad",
        credit: "Photo source: SchoolsUniverse",
    },
    "Bharatiya Vidya Bhavan's Public School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/9305/user_bvbpsjh%40rediffma" +
            "il.com/unnamed.webp",
        source:
            "https://ezyschooling.com/school/bharatiy" +
            "a-vidya-bhavans-public-school-jubilee-hi" +
            "lls-hyderabad",
        credit: "Photo source: Ezyschooling",
    },
    "Silver Oaks International School": {
        image:
            "https://upload.wikimedia.org/wikipedia/c" +
            "ommons/7/7f/Atal_Tinkering_Lab_at_Silver" +
            "_Oaks_Intl_School_Hyderabad.jpg",
        source:
            "https://commons.wikimedia.org/wiki/File:" +
            "Atal_Tinkering_Lab_at_Silver_Oaks_Intl_S" +
            "chool_Hyderabad.jpg",
        credit: "Photo: Wikimedia Commons",
    },
    "Sanskriti School": {
        image: "https://sanskritischool.edu.in/assets/img/carousel/c5.jpg",
        source: "https://www.sanskritischool.edu.in/",
        credit: "Photo source: Sanskriti School",
    },
    "Sardar Patel Vidyalaya": {
        image: "https://spvdelhi.org/images/slider/121431524749099slider.png",
        source: "https://spvdelhi.org/",
        credit: "Photo source: Sardar Patel Vidyalaya",
    },
    "Pinegrove School": {
        image:
            "https://cbseportal.com/sites/default/fil" +
            "es/top-ranked-cbse-schools-in-india-img-" +
            "10.png",
        source: "https://cbseportal.com/articles/top-ranked-cbse-schools-in-india",
        credit: "Photo source: CBSE Exam Portal",
    },
    "Udgam School for Children": {
        image:
            "https://i.pinimg.com/736x/b2/0d/2f/b20d2f19522532a93d44712ec4da2bad.jpg",
        source: "https://www.teacherhorizons.com/schools/asia-india-ahmedabad-udgam-school",
        credit: "Photo source: Teacher Horizons",
    },
    "Ahmedabad International School": {
        image:
            "https://www.teacherhorizons.com/static/m" +
            "ediav2/schools/4429/images/545131_main.j" +
            "pg",
        source:
            "https://www.teacherhorizons.com/schools/" +
            "asia-india-ahmedabad-ahmedabad-internati" +
            "onal-school",
        credit: "Photo source: Teacher Horizons",
    },
    "The Riverside School": {
        image: "https://schoolriverside.com/images/campus/1.jpg",
        source: "https://schoolriverside.com/Campus",
        credit: "Photo source: The Riverside School",
    },
    "Bharatiya Vidya Bhavan's Vidyashram": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/infra/images/Screenshot_2024-01-29" +
            "_130012.png",
        source:
            "https://ezyschooling.com/school/bharatiy" +
            "a-vidya-bhavan-vidyashram-sanganer-jaipu" +
            "r/photos",
        credit: "Photo source: Ezyschooling",
    },
    "St. Xavier's Senior Secondary School": {
        image: "https://skoodos.com/public/uploads/optimized/1683020360.png",
        source: "https://skoodos.com/school/st-xaviers-sr-sec-school-panch-batti",
        credit: "Photo source: Skoodos",
    },
    "Neerja Modi School": {
        image: "https://nmsindia.org/uploads/page/gallery/17385812301.jpg",
        source: "https://nmsindia.org/about-us/location",
        credit: "Photo source: Neerja Modi School",
    },
    "The Doon School": {
        image: "https://images.indianexpress.com/2019/03/doon759.jpg?w=1200",
        source:
            "https://indianexpress.com/article/educat" +
            "ion/doon-summer-leadership-programme-app" +
            "lications-open-check-details-doonschool-" +
            "com-5641804/",
        credit: "Photo source: The Indian Express",
    },
    "Bishop Cotton School": {
        image:
            "https://upload.wikimedia.org/wikipedia/c" +
            "ommons/e/e5/Aerial_view_of_Bishop_Cotton" +
            "_School_%28Shimla%29.jpg?_=2023032105444" +
            "1",
        source:
            "https://commons.wikimedia.org/wiki/File:" +
            "Aerial_view_of_Bishop_Cotton_School_(Shi" +
            "mla).jpg",
        credit: "Photo: Wikimedia Commons, CC BY-SA",
    },
    "Jayshree Periwal High School": {
        image:
            "https://d3bat55ebwjhsf.cloudfront.net/sc" +
            "hools/cover/user_root_user%40ezy.com/2E0" +
            "A1264edtd-scaled.jpg",
        source: "https://ezyschooling.com/school/jayshree-periwal-high-school-chitrakoot-jaipur",
        credit: "Photo source: Ezyschooling",
    },
};

// Fallback campus images used when a school has no photo of its own.
// These are public school building photos from Wikimedia Commons so no card
// is left blank; a different building is shown per school (stable per school).
const schoolBuildingImages = [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Old_School_001.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Joseph_J._Bingham_Indianapolis_Public_School_No._84.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bishop_James_Mahoney_High_School_(Saskatoon).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/School_Buildings.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Oyler_School,_Lower_Price_Hill,_Cincinnati,_OH_(40240832413).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/J._Graham_Brown_School.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/The_Cathedral_School_(Llandaff).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hong_Kong_Cantonese_school.jpg?width=1200",
];

export function fallbackImage(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    const index = Math.abs(hash) % schoolBuildingImages.length;
    return schoolBuildingImages[index];
}

function card([name, city], index) {
    const facts = verified[name] || {};
    const link =
        facts.url ||
        `https://www.google.com/search?q=${encodeURIComponent(`${name} official school website`)}`;
    const photo = facts.image
        ? { image: facts.image, source: link, credit: "Photo source: school's website" }
        : campusPhotos[name];
    const image = photo?.image || fallbackImage(name);
    const imageAlt = photo
        ? `Campus image of ${esc(name)}`
        : `Campus image unavailable for ${esc(name)}`;
    const board = facts.board || "Board not verified";
    const status = facts.status || "Day or boarding status not verified";
    const description = schoolDescription(name, city, facts);
    return `<article class="institution-card regional-school-card"><div class="institution-card-visual"><img src="${image}" alt="${imageAlt}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(name)}'"><div class="institution-card-overlay"></div><span class="institution-card-rank">#${String(index + 1).padStart(2, "0")}</span><div class="institution-card-title"><h3>${esc(name)}</h3><p>📍 ${esc(city)}</p></div></div><div class="institution-card-body"><span class="institution-card-category">${esc(board)}</span><h4 class="institution-card-program">${esc(status)}</h4><div class="institution-card-ranking">Approximate editorial listing; not an official ranking.</div><div class="institution-card-highlight">${esc(description)}</div>${photo ? `<a class="regional-school-photo-source" href="${photo.source}" target="_blank" rel="noopener noreferrer">${esc(photo.credit)}</a>` : ""}<div class="institution-card-actions"><a class="institution-card-action" href="${link}" target="_blank" rel="noopener noreferrer">Explore School <span>›</span></a><button type="button" class="institution-card-action" data-action="compare">Compare <span>›</span></button></div></div></article>`;
}

export function getRegionalSchoolListings() {
    const unique = new Map();
    Object.entries(regionalSchoolNames).forEach(([region, schools]) => {
        schools.forEach(([name, city], index) => {
            const id = `${name.toLocaleLowerCase()}|${city.toLocaleLowerCase()}`;
            if (unique.has(id)) {
                const existing = unique.get(id);
                if (!existing.regions.includes(region)) existing.regions.push(region);
                existing.ranks[region] = index + 1;
                return;
            }
            const facts = verified[name] || {};
            const photo = facts.image
                ? { image: facts.image, source: facts.url, credit: "Photo source: school website" }
                : campusPhotos[name];
            unique.set(id, {
                id,
                name,
                city,
                state: stateByCity[city] || region,
                region,
                regions: [region],
                rank: index + 1,
                ranks: { [region]: index + 1 },
                board:
                    facts.board && facts.board !== "Board not verified"
                        ? facts.board
                        : "Not verified",
                status:
                    facts.status && !facts.status.includes("not verified")
                        ? facts.status
                        : "Not verified",
                description: schoolDescription(name, city, facts),
                image: photo?.image || fallbackImage(name),
                imageFallback: fallbackImage(name),
                imageAvailable: Boolean(photo),
                photoSource: photo?.source || "",
                officialWebsite: facts.url || "",
                detailsSource: facts.url || photo?.source || "",
                schoolType: facts.schoolType || "Not verified",
            });
        });
    });
    return [...unique.values()];
}

export function initRegionalSchools() {
    const section = document.querySelector("#school");
    if (!section) return;
    const select = section.querySelector("#school-region-select");
    const search = section.querySelector(".school-region-search-button");
    const results = section.querySelector(".school-region-results");
    const grid = section.querySelector(".school-region-results-grid");
    const title = section.querySelector(".school-region-results-title");
    if (!select || !search || !results || !grid || !title) return;
    select.addEventListener("change", () => {
        results.hidden = true;
        grid.replaceChildren();
        title.textContent = "";
    });
    search.addEventListener("click", () => {
        const region = select.value;
        if (!regionalSchoolNames[region]) {
            select.focus();
            return;
        }
        title.textContent = `Schools in ${region}`;
        grid.innerHTML = regionalSchoolNames[region].map(card).join("");
        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}
