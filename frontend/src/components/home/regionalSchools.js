// Regional shortlist seed data. These are school names and city locations only;
// rankings are editorial and no unverified board, fee, rating, or review claims are made.
const names = {
    Rajasthan: [
        ["Mayo College", "Ajmer"], ["Mayo College Girls' School", "Ajmer"], ["Birla Public School", "Pilani"], ["Birla Balika Vidyapeeth", "Pilani"], ["The Sagar School", "Alwar"],
        ["Bharatiya Vidya Bhavan's Vidyashram", "Jaipur"], ["St. Xavier's Senior Secondary School", "Jaipur"], ["Maharaja Sawai Man Singh Vidyalaya", "Jaipur"], ["Delhi Public School", "Jaipur"], ["Neerja Modi School", "Jaipur"]
    ],
    Jaipur: [
        ["Bharatiya Vidya Bhavan's Vidyashram", "Jaipur"], ["St. Xavier's Senior Secondary School", "Jaipur"], ["Maharaja Sawai Man Singh Vidyalaya", "Jaipur"], ["Delhi Public School", "Jaipur"], ["Neerja Modi School", "Jaipur"],
        ["The Palace School", "Jaipur"], ["Jayshree Periwal High School", "Jaipur"], ["Maharani Gayatri Devi Girls' School", "Jaipur"], ["Seedling Public School", "Jaipur"], ["Subodh Public School", "Jaipur"]
    ],
    Delhi: [
        ["Delhi Public School, R.K. Puram", "New Delhi"], ["Modern School, Barakhamba Road", "New Delhi"], ["The Shri Ram School", "New Delhi"], ["Springdales School, Pusa Road", "New Delhi"], ["Sanskriti School", "New Delhi"],
        ["Mount St. Mary's School", "New Delhi"], ["Vasant Valley School", "New Delhi"], ["Sardar Patel Vidyalaya", "New Delhi"], ["Loreto Convent School", "New Delhi"], ["The Mother's International School", "New Delhi"]
    ],
    "Himachal Pradesh": [
        ["Bishop Cotton School", "Shimla"], ["Auckland House School", "Shimla"], ["The Lawrence School, Sanawar", "Sanawar"], ["Pinegrove School", "Dharampur"], ["Dalhousie Public School", "Dalhousie"],
        ["Army Public School, Dagshai", "Dagshai"], ["Sacred Heart Senior Secondary School", "Dharamshala"], ["St. Edward's School", "Shimla"], ["Chinmaya Vidyalaya", "Nauni"], ["DAV Public School", "Mandi"]
    ],
    "Uttar Pradesh": [
        ["The Scindia School", "Gwalior"], ["La Martiniere College", "Lucknow"], ["City Montessori School", "Lucknow"], ["St. Mary's Convent Inter College", "Prayagraj"], ["Boys' High School and College", "Prayagraj"],
        ["Delhi Public School, Noida", "Noida"], ["Seth Anandram Jaipuria School", "Ghaziabad"], ["The Shri Ram School, Aravali", "Gurugram"], ["St. John's Senior Secondary School", "Varanasi"], ["Sunbeam School, Lahartara", "Varanasi"]
    ],
    Uttarakhand: [
        ["The Doon School", "Dehradun"], ["Welham Girls' School", "Dehradun"], ["Welham Boys' School", "Dehradun"], ["Woodstock School", "Mussoorie"], ["The Asian School", "Dehradun"],
        ["Mussoorie International School", "Mussoorie"], ["St. George's College", "Mussoorie"], ["Ecole Globale International Girls' School", "Dehradun"], ["Sherwood College", "Nainital"], ["Birla Vidya Mandir", "Nainital"]
    ],
    Gujarat: [
        ["The Riverside School", "Ahmedabad"], ["Ahmedabad International School", "Ahmedabad"], ["Mahatma Gandhi International School", "Ahmedabad"], ["Udgam School for Children", "Ahmedabad"], ["Zebar School for Children", "Ahmedabad"],
        ["Delhi Public School, Bopal", "Ahmedabad"], ["Anand Niketan School", "Ahmedabad"], ["Navrachana International School", "Vadodara"], ["Bright Day School", "Vadodara"], ["The Galaxy School", "Rajkot"]
    ],
    "Madhya Pradesh": [
        ["The Daly College", "Indore"], ["The Scindia School", "Gwalior"], ["Emerald Heights International School", "Indore"], ["Choithram School", "Indore"], ["Delhi Public School, Indore", "Indore"],
        ["Sagar Public School", "Bhopal"], ["Campion School", "Bhopal"], ["Mātrikā School of Earth", "Bhopal"], ["Carmel Convent Senior Secondary School", "Bhopal"], ["Vindhyachal Academy", "Dewas"]
    ],
    Telangana: [
        ["The Hyderabad Public School, Begumpet", "Hyderabad"], ["Oakridge International School", "Hyderabad"], ["Chirec International School", "Hyderabad"], ["Delhi Public School, Hyderabad", "Hyderabad"], ["Jubilee Hills Public School", "Hyderabad"],
        ["Nasr School", "Hyderabad"], ["Bharatiya Vidya Bhavan's Public School", "Hyderabad"], ["Silver Oaks International School", "Hyderabad"], ["Glendale Academy", "Hyderabad"], ["Meridian School", "Hyderabad"]
    ],
    "Andhra Pradesh": [
        ["The Hyderabad Public School, Ramanthapur", "Hyderabad"], ["Little Angels School", "Visakhapatnam"], ["Oakridge International School", "Visakhapatnam"], ["Sri Prakash Synergy School", "Peddapuram"], ["Delhi Public School, Vijayawada", "Vijayawada"],
        ["Kendriya Vidyalaya No. 1", "Vijayawada"], ["Bhashyam Public School", "Guntur"], ["Nalanda Vidya Niketan", "Vijayawada"], ["Dr. KKR's Gowtham School", "Vijayawada"], ["Ravindra Bharathi School", "Visakhapatnam"]
    ]
};

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

// Only populate facts and direct links when confirmed on the school's own site.
const verified = {
    "The Riverside School": { url: "https://schoolriverside.com/Campus", image: "https://schoolriverside.com/images/campus/1.jpg", board: "Cambridge International / NIOS", status: "Day school", description: "The school describes its campus as supporting creative freedom and offers a campus gallery and virtual tour." },
    "Mahatma Gandhi International School": { url: "https://www.mgis.in/", image: "https://www.mgis.in/wp-content/uploads/2026/04/1000294729.jpg", board: "Board not verified", status: "Day or boarding status not verified", description: "Ahmedabad public private partnership school focused on progressive, experiential and project based learning." },
    "Udgam School for Children": { url: "https://www.udgamschool.com/", image: "https://www.udgamschool.com/wp-content/uploads/2026/02/USFC-Web-banner-School-core%404x-100.jpg-1.webp", board: "CBSE; IB Career-related Programme (Grades 11–12)", status: "Co-educational school; two shifts", description: "The school describes its Thaltej campus, playground and co-curricular facilities on its official site." },
    "Ahmedabad International School": { url: "https://www.aischool.net/school_life/", board: "IB, Cambridge and GHSEB (official school site)", status: "Day/boarding status not stated", description: "Official school website lists its campus on Judges Bunglow Road in Bodakdev, Ahmedabad." }
};

// School-matched campus photos located on school sites or established education directories.
// Image-page links are retained on each card for photo/source transparency.
const campusPhotos = {
    "The Shri Ram School, Aravali": { image: "https://tsrs.org/brand/school-campuses/hero/aravali-hero.png", source: "https://tsrs.org/aravali-campus", credit: "Photo source: The Shri Ram School" },
    "Loreto Convent School": { image: "https://www.loretodelhi.com/images/about-us.png", source: "https://www.loretodelhi.com/Default.aspx", credit: "Photo source: Loreto Convent School" },
    "St. John's Senior Secondary School": { image: "https://cdn-blogs.extramarks.com/2025/09/Artboard-1-copy-16%402x-1024x640.webp", source: "https://www.extramarks.com/blogs/schools/best-schools-in-varanasi/", credit: "Photo source: Extramarks" },
    "The Mother's International School": { image: "https://skoodos.com/public/blog_images/mothers-international-school-600x400.jpg", source: "https://skoodos.com/en/blog/list-of-top-10-best-schools-in-delhi", credit: "Photo source: Skoodos" },
    "Sacred Heart Senior Secondary School": { image: "https://shsdharamshala.com/wp-content/uploads/2025/05/1652505994342.png", source: "https://shsdharamshala.com/", credit: "Photo source: Sacred Heart School" },
    "DAV Public School": { image: "https://www.schooldekho.org/storage/gallery/mquwf14amo0wso8w8og44wkow4w0s0k.jpg", source: "https://www.schooldekho.org/details/DAV-Centenary-Public-school-11380", credit: "Photo source: SchoolDekho" },
    "Birla Vidya Mandir": { image: "https://www.birlavidyamandir.com/images/menu/01.jpg", source: "https://www.birlavidyamandir.com/", credit: "Photo source: Birla Vidya Mandir" },
    "Maharaja Sawai Man Singh Vidyalaya": { image: "https://www.pathshalapro.com/blog/wp-content/uploads/2023/03/Maharaja-Sawai-Man-Singh-Vidyalaya.png", source: "https://www.pathshalapro.com/blog/maharaja-sawai-man-singh-vidyalaya-jaipur/", credit: "Photo source: Pathshala Pro" },
    "The Galaxy School": { image: "https://www.thegalaxyschool.org/uploads/1/5/1/3/151377150/2c0a6648_orig.jpg", source: "https://www.thegalaxyschool.org/campus.html", credit: "Photo source: The Galaxy School" },
    "Kendriya Vidyalaya No. 1": { image: "https://cdn.prod.website-files.com/6284943f887c4094af5abb07/680b74b521a867ab11ed816e_AB5caB-SImTbEJuvv5Axf3_QTMtPfE1D7wL7vmtC1rRWwLHl5LtrOdMxjP-xb_0bZFDrBe_UwnWvno1jzpHfOkvanXTN9Tap0Nk6bKz2v-MwTs6Gj19uqWHuuUfTdgAug_Wz7mFTvCZ5%3Ds1360-w1360-h1020.jpeg", source: "https://www.cbse360.com/blog/top-10-cbse-schools-in-vijayawada/", credit: "Photo source: CBSE360" },
    "Nasr School": { image: "https://www.teacherhorizons.com/static/mediav2/schools/6875/images/936147_main.jpg", source: "https://www.teacherhorizons.com/schools/asia-india-hyderabad-nasr-boys-school", credit: "Photo source: Teacher Horizons" },
    "Choithram School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/9644/user_root_user%40ezy.com/2023-03-14.webp", source: "https://ezyschooling.com/school/choithram-school-rajmahal-colony-indore", credit: "Photo source: Ezyschooling" },
    "Carmel Convent Senior Secondary School": { image: "https://cache.careers360.mobi/media/schools/social-media/media-gallery/10263/2026/3/28/School%20Building.jpg", source: "https://school.careers360.com/schools/carmel-convent-senior-secondary-school-bhopal", credit: "Photo source: Careers360" },
    "Vindhyachal Academy": { image: "https://yayskool-school-images.s3.ap-south-1.amazonaws.com/422326vindh-school.jpg", source: "https://www.yayskool.com/school/vindhyachal-academy-bhopal-7152326", credit: "Photo source: Yayskool" },
    "Welham Girls' School": { image: "https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2025-07/main_gate_2.jpg?VersionId=osZ3pVN1MBMfhltEeuq2RrLJvm1CKp5b&size=750%3A%2A", source: "https://www.indiatoday.in/education-today/featurephilia/story/never-compromise-on-what-you-believe-in-inside-the-ethos-of-welham-girls-school-2751907-2025-07-07", credit: "Photo source: India Today" },
    "The Asian School": { image: "https://res.cloudinary.com/eduminatti-com/gallery/uttarakhand/G76.png", source: "https://www.eduminatti.com/schools/dehradun/the-asian-school-dehradun", credit: "Photo source: Eduminatti" },
    "Mussoorie International School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_admissioncounsellor%40misindia.org/2018-03-29.jpg", source: "https://ezyschooling.com/school/mussoorie-international-school-mussoorie", credit: "Photo source: Ezyschooling" },
    "Army Public School, Dagshai": { image: "https://static.where-e.com/India/Himachal_Pradesh/Shimla_Division/Army-Public-School-Dagshai_f9c261cb428850b35cfae4ce21a2d429.jpg", source: "https://army-public-school-dagshai.wheree.com/", credit: "Photo source: Wheree" },
    "St. Edward's School": { image: "https://www.stedwardsshimla.org/images/slider/full/slider1.jpg", source: "https://stedwardsshimla.org/", credit: "Photo source: St. Edward's School" },
    "Chinmaya Vidyalaya": { image: "https://chinmayavidyalayanauni.com/admission-2025/assets/img/Boarding-Aerialview-1024x576-1.jpg", source: "https://chinmayavidyalayanauni.com/admission-2025/index.html", credit: "Photo source: Chinmaya Vidyalaya" },
    "The Scindia School": { image: "https://bsai.co.in/admin/logged/images/homeslider/e4da3b7fbbce2345d7772b0674a318d53-scindia-school.jpg", source: "https://bsai.co.in/", credit: "Photo source: Boarding Schools' Association of India" },
    "Welham Boys' School": { image: "https://www.welhamboys.org/images/large/principal-s-welcome.jpg", source: "https://www.welhamboys.org/principal-s-welcome-welham-boys-school", credit: "Photo source: Welham Boys' School" },
    "Woodstock School": { image: "https://cdn-blogs.extramarks.com/2026/05/Woodstock-School-%E2%80%93-Landour-Mussoorie.webp", source: "https://www.extramarks.com/blogs/schools/best-schools-in-uttarakhand/", credit: "Photo source: Extramarks" },
    "St. George's College": { image: "https://classhud.com/assets/media/uploads/listing/cover_image/st-george-s-college.jpg", source: "https://classhud.com/best/school/st-georges-college/mussoorie", credit: "Photo source: ClassHud" },
    "Ecole Globale International Girls' School": { image: "https://www.globalboardings.com/images/schools/7/gallery/Ecole_globale_3.jpg", source: "https://www.globalboardings.com/dehradun/ecole-globale-international-girls-school", credit: "Photo source: Global Edu Consulting" },
    "Seth Anandram Jaipuria School": { image: "https://hindi.news24online.com/wp-content/uploads/2025/04/school.jpg", source: "https://hindi.news24online.com/state/up-uk/ghaziabad-seth-anandram-jaipuria-school-relief-fee-hike-dfrc-decision-on-parent-petition-dismissed-in-high-court/1162178/", credit: "Photo source: News24" },
    "St. Mary's Convent Inter College": { image: "https://cdn-blogs.extramarks.com/2025/10/Artboard-1-copy-18-1.webp", source: "https://www.extramarks.com/blogs/schools/best-schools-in-allahabad/", credit: "Photo source: Extramarks" },
    "Boys' High School and College": { image: "https://cdn-blogs.extramarks.com/2025/10/Artboard-1-copy-12-1.webp", source: "https://www.extramarks.com/blogs/schools/best-schools-in-allahabad/", credit: "Photo source: Extramarks" },
    "Sunbeam School, Lahartara": { image: "https://resources.edunexttechnologies.com/web-data/sunbeam/images/lht-school.jpg", source: "https://www.sunbeamschools.com/school/lahartara/", credit: "Photo source: Sunbeam Schools" },
    "Campion School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/infra/images/473601_495054003855292_2049528738_o.jpg", source: "https://ezyschooling.com/school/campion-school-arera-colony-bhopal/photos", credit: "Photo source: Ezyschooling" },
    "Sagar Public School": { image: "https://cdn.schoolsuniverse.com/media/uploads/2024-10-21%2012%3A15%3A56.099484SPS%20Saket5.jpg", source: "https://www.schoolsuniverse.com/school/sagar-public-school-saket-nagar-bhopal", credit: "Photo source: SchoolsUniverse" },
    "Delhi Public School, Indore": { image: "https://cdn-blogs.extramarks.com/2026/03/Delhi-Public-School-Indore-1024x683.webp", source: "https://www.extramarks.com/blogs/schools/best-cbse-schools-in-indore/", credit: "Photo source: Extramarks" },
    "The Hyderabad Public School, Ramanthapur": { image: "https://eduvow.com/images/school/774_the-hyderabad-public-school-ramanthapur-1.jpg", source: "https://eduvow.com/school-details/the-hyderabad-public-school-ramanthapur", credit: "Photo source: Eduvow" },
    "Delhi Public School, Hyderabad": { image: "https://cache.careers360.mobi/media/schools/social-media/media-gallery/16659/2026/3/21/School%20Building.png", source: "https://school.careers360.com/schools/delhi-public-school-khajaguda-hyderabad", credit: "Photo source: Careers360" },
    "Glendale Academy": { image: "https://uploads-ssl.webflow.com/5d4d465d8620ae7bba3a602d/5d8dfc84c33e99a1ff144f43_ga-front.jpg", source: "https://www.glendale.edu.in/glendale-academy/campus", credit: "Photo source: Glendale Academy" },
    "Dr. KKR's Gowtham School": { image: "https://kkrgowtham.com/wp-content/uploads/2015/12/gudavalli_branch.jpg", source: "https://kkrgowtham.com/", credit: "Photo source: KKR's Gowtham" },
    "Bhashyam Public School": { image: "https://cdn.shopify.com/s/files/1/0896/6753/5157/files/bhashyam-public-school-guntur-ho-guntur-schools-qpvcwgq-e1548401264462.jpg", source: "https://www.chaibisket.com/blogs/blog/bhashyam-things", credit: "Photo source: Chai Bisket" },
    "Sri Prakash Synergy School": { image: "https://storage.googleapis.com/cdn-edustoke/mysql_images/full/6df9b586-877d-459c-9bb7-a9a7ebce89bf_dcfb8f38.webp", source: "https://www.edustoke.com/residential/east-godavari/sri-prakash-senergy-school-peddapuram", credit: "Photo source: Edustoke" },
    "Delhi Public School, Vijayawada": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/12210/user_root_user%40ezy.com/unnamed_30.jpg", source: "https://ezyschooling.com/school/delhi-public-school-dps-vijayawada-andhra-pradesh/fees-structure", credit: "Photo source: Ezyschooling" },
    "Nalanda Vidya Niketan": { image: "https://nvn.edu.in/_app/immutable/assets/image-2.rteP2zkr.jpeg", source: "https://nvn.edu.in/contact-us/", credit: "Photo source: Nalanda Vidya Niketan" },
    "Zebar School for Children": { image: "https://www.zebarschool.com/wp-content/uploads/2025/12/2023-1.webp", source: "https://www.zebarschool.com/the-noon-shift-at-zebar/", credit: "Photo source: Zebar School" },
    "Delhi Public School, Bopal": { image: "https://media.licdn.com/dms/image/v2/C4E1BAQFZ9wBH9C5LvA/company-background_10000/company-background_10000/0/1584509256568/dps_bopal_ahmedabad_cover?e=2147483647&t=YF45UiwHVME9V11OR_4npz4fmJzmZzQLnlGNIfFkZ8k&v=beta", source: "https://in.linkedin.com/school/dps-bopal-ahmedabad/", credit: "Photo source: DPS Bopal" },
    "Anand Niketan School": { image: "https://storage.googleapis.com/cdn-edustoke/mysql_images/full/b9145a1e-ea2e-40fc-80e1-333daf9eddfc_634189a7.webp", source: "https://www.edustoke.com/ahmedabad/anand-niketan-satellite", credit: "Photo source: Edustoke" },
    "Navrachana International School": { image: "https://images.indianexpress.com/2025/01/Navrachana-school.jpeg", source: "https://indianexpress.com/article/cities/ahmedabad/vadodara-navrachna-school-bomb-threat-9796383/", credit: "Photo source: The Indian Express" },
    "Bright Day School": { image: "https://cache.careers360.mobi/media/schools/social-media/media-gallery/4902/2021/6/29/download%20_13_.png", source: "https://school.careers360.com/schools/bright-day-school-vasna-bhaili-road-vadodara", credit: "Photo source: Careers360" },
    "Maharani Gayatri Devi Girls' School": { image: "https://theacademicinsights.com/wp-content/uploads/2022/06/Maharani-Gayatri-Devi-Girls-Public-School-Jaipur.jpeg", source: "https://theacademicinsights.com/maharani-gayatri-devi-girls-public-school-jaipur/", credit: "Photo source: The Academic Insights" },
    "Subodh Public School": { image: "https://www.pasch-net.de/resources/files/jpg918/subodh-public-school_gebaeude-formatkey-jpg-w1760r.jpg", source: "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/subodh-public-school.html", credit: "Photo source: PASCH-Initiative" },
    "Mount St. Mary's School": { image: "https://msmschool.in/wp-content/uploads/2020/11/msm-facade3.jpg", source: "https://msmschool.in/", credit: "Photo source: Mount St. Mary's School" },
    "Vasant Valley School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/2024-09-10_12-30-03/5enw/infra/images/2019-12-12.webp", source: "https://ezyschooling.com/school/vasant-valley-school-vasant-kunj-south-west-delhi/photos", credit: "Photo source: Ezyschooling" },
    "Dalhousie Public School": { image: "https://dalhousiepublicschool.com/wp-content/uploads/2025/02/DJI_0212-scaled.jpg", source: "https://dalhousiepublicschool.com/arrange-campus-visit/", credit: "Photo source: Dalhousie Public School" },
    "Sherwood College": { image: "https://storage.googleapis.com/cdn-edustoke/mysql_images/full/b4ff7d58-aad5-420d-9d23-6ee2a639aeef_bbe0c642.webp", source: "https://www.edustoke.com/residential/nainital/sherwood-college-ayarpatta", credit: "Photo source: Edustoke" },
    "Oakridge International School": { image: "https://www.oakridge.in/local-social-media/gachibowli/international-school-in-gachibowli-hyderabad/img/VIZ.jpg", source: "https://www.oakridge.in/local-social-media/gachibowli/international-school-in-gachibowli-hyderabad/", credit: "Photo source: Oakridge International School" },
    "Chirec International School": { image: "https://www.inschools.in/Telangana/Banners/Chirec%20kondapur.jpg", source: "https://www.inschools.in/CBSE-Schools-In-Hyderabad.html", credit: "Photo source: INschools India" },
    "Meridian School": { image: "https://www.meridianschool.in/images/camp3.jpg", source: "https://www.meridianschool.in/?m=330111", credit: "Photo source: Meridian School" },
    "Mayo College": { image: "https://www.careers360.com/webstories/top-10-most-beautiful-college-campuses-in-india/assets/4.jpeg", source: "https://www.careers360.com/webstories/top-10-most-beautiful-college-campuses-in-india/", credit: "Photo source: Careers360" },
    "Mayo College Girls' School": { image: "https://mcgs.ac.in/assets/img/campus-life/estate-2.jpg", source: "https://mcgs.ac.in/about-us/about-mayo", credit: "Photo source: Mayo College Girls' School" },
    "Birla Public School": { image: "https://www.bpspilani.edu.in/public/storage/media/IMG_6234.JPG", source: "https://www.bpspilani.edu.in/infrastructure", credit: "Photo source: Birla Public School" },
    "Birla Balika Vidyapeeth": { image: "https://www.ipsc.co.in/images/member/birla_balika_vidyapeeth_img1.jpg", source: "https://www.ipsc.co.in/member-details.asp?id=5", credit: "Photo source: IPSC" },
    "The Sagar School": { image: "https://thesagarschool.org/images/explore-campus/sm/01.jpg", source: "https://thesagarschool.org/", credit: "Photo source: The Sagar School" },
    "Delhi Public School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_admission%40dpsjaipur.com/unnamed.jpg", source: "https://ezyschooling.com/school/delhi-public-school-hasampura-jaipur", credit: "Photo source: Ezyschooling" },
    "Maharaja Sawai Man Singh Vidyalaya": { image: "https://xqwnwkxvvhnaawbqdiwe.supabase.co/storage/v1/object/public/school-images/37.png", source: "https://schoolsarena.in/board/CBSE/location/Jaipur", credit: "Photo source: SchoolsArena" },
    "Jayshree Periwal High School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_root_user%40ezy.com/2E0A1264edtd-scaled.jpg", source: "https://ezyschooling.com/school/jayshree-periwal-high-school-chitrakoot-jaipur", credit: "Photo source: Ezyschooling" },
    "The Palace School": { image: "https://www.livehindustan.com/lh-img/smart/img/2025/06/16/1200x900/The_palace_School__1750067614917_1750067615177.jpg", source: "https://www.livehindustan.com/rajasthan/jaipur/jaipur-palace-school-bomb-threat-bomb-squad-deployed-manak-chowk-police-alert-201750065771410.html", credit: "Photo source: Hindustan" },
    "Seedling Public School": { image: "https://seedling-hybrid.vercel.app/smhs_images/seedling_images/img359.webp", source: "https://seedling-hybrid.vercel.app/about", credit: "Photo source: Seedling Group of Schools" },
    "Delhi Public School, Jaipur": { image: "https://educationworld.in/wp-content/uploads/2013/03/DPS-Jaipur.jpg", source: "https://educationworld.in/delhi-public-school-jaipur/", credit: "Photo source: EducationWorld" },
    "Delhi Public School, R.K. Puram": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/2025-06-05_12-24-08/ndvy/infra/images/C-Block.webp", source: "https://ezyschooling.com/school/delhi-public-school-r-k-puram-main-delhi", credit: "Photo source: Ezyschooling" },
    "Modern School, Barakhamba Road": { image: "https://images.indianexpress.com/2022/06/modern-school.jpg?w=1200", source: "https://indianexpress.com/article/cities/delhi/modern-school-asks-ews-children-to-pay-rs-67000-in-fees-7980765/", credit: "Photo source: The Indian Express" },
    "Springdales School, Pusa Road": { image: "https://www.pasch-net.de/resources/files/jpg918/springdales-school_gebaeude-formatkey-jpg-default.jpg", source: "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/springdales-school-pusa-road.html", credit: "Photo source: PASCH-Initiative" },
    "Bishop Cotton School": { image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Aerial_view_of_Bishop_Cotton_School_%28Shimla%29.jpg?_=20230321054441", source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Bishop_Cotton_School_(Shimla).jpg", credit: "Photo: Wikimedia Commons, CC BY-SA" },
    "Auckland House School": { image: "https://www.onlinehimachal.com/wp-content/uploads/2024/10/Auckland-House-School-Shimla.jpg", source: "https://www.onlinehimachal.com/blog/top-5-best-schools-in-himachal-pradesh/", credit: "Photo source: Online Himachal" },
    "The Lawrence School, Sanawar": { image: "https://www.sanawar.edu.in/admin/logged/images/headimages/c4ca4238a0b923820dcc509a6f75849bheader-board-results.jpg", source: "https://www.sanawar.edu.in/detail.php?mid=Mg%3D%3D&sid=MTY%3D", credit: "Photo source: The Lawrence School" },
    "The Doon School": { image: "https://images.indianexpress.com/2019/03/doon759.jpg?w=1200", source: "https://indianexpress.com/article/education/doon-summer-leadership-programme-applications-open-check-details-doonschool-com-5641804/", credit: "Photo source: The Indian Express" },
    "The Hyderabad Public School, Begumpet": { image: "https://www.hpss.org.in/images/campuses/begumpet.jpg", source: "https://www.hpss.org.in/", credit: "Photo source: HPS Society" },
    "Oakridge International School, Visakhapatnam": { image: "https://www.oakridgeinternational.com/vizag/images/school.jpg", source: "https://www.oakridgeinternational.com/vizag/cbse-Fact-sheet.html", credit: "Photo source: Oakridge International School" },
    "Little Angels School": { image: "https://top10schools.in/images/littleangels-vizag.jpg", source: "https://www.top10schools.in/andhra-pradesh/vizag/", credit: "Photo source: Top10Schools" },
    "The Daly College": { image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Daly_College%2C_Indore.jpg", source: "https://commons.wikimedia.org/wiki/File:Daly_College,_Indore.jpg", credit: "Photo: Wikimedia Commons, CC BY-SA" },
    "Emerald Heights International School": { image: "https://indoreeducation.com/wp-content/uploads/2024/09/MAIN-BUILDING-FRONT-EMERALD-HEIGHTS-SCHOOL-scaled-1.jpg", source: "https://indoreeducation.com/directory/emerald-heights-international-school/", credit: "Photo source: Indore Education" },
    "La Martiniere College": { image: "https://lucknowsocial.in/wp-content/uploads/2023/05/image-10-1024x768.png", source: "https://lucknowsocial.in/place/la-martiniere-college/", credit: "Photo source: Lucknow Social" },
    "City Montessori School": { image: "https://candidschools.com/wp-content/uploads/2024/02/122.13CMSlucknow.jpg", source: "https://candidschools.com/icse-schools-in-india-a-state-wise-list/", credit: "Photo source: Candid Schools" },
    "Delhi Public School, Noida": { image: "https://www.pasch-net.de/resources/files/jpg938/dps-noida-1-formatkey-jpg-default.jpg", source: "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/delhi-public-school-noida.html", credit: "Photo source: PASCH-Initiative" },
    "Jubilee Hills Public School": { image: "https://www.schoolsuniverse.com/_next/image?q=75&url=https%3A%2F%2Fcdn.schoolsuniverse.com%2Fmedia%2Fuploads%2F2024-09-26%252010%253A01%253A46.143887jj2.jpg&w=768", source: "https://www.schoolsuniverse.com/school/jubilee-hills-public-school-hyderabad", credit: "Photo source: SchoolsUniverse" },
    "Bharatiya Vidya Bhavan's Public School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/9305/user_bvbpsjh%40rediffmail.com/unnamed.webp", source: "https://ezyschooling.com/school/bharatiya-vidya-bhavans-public-school-jubilee-hills-hyderabad", credit: "Photo source: Ezyschooling" },
    "Silver Oaks International School": { image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Atal_Tinkering_Lab_at_Silver_Oaks_Intl_School_Hyderabad.jpg", source: "https://commons.wikimedia.org/wiki/File:Atal_Tinkering_Lab_at_Silver_Oaks_Intl_School_Hyderabad.jpg", credit: "Photo: Wikimedia Commons" },
    "Sanskriti School": { image: "https://sanskritischool.edu.in/assets/img/carousel/c5.jpg", source: "https://www.sanskritischool.edu.in/", credit: "Photo source: Sanskriti School" },
    "Sardar Patel Vidyalaya": { image: "https://spvdelhi.org/images/slider/121431524749099slider.png", source: "https://spvdelhi.org/", credit: "Photo source: Sardar Patel Vidyalaya" },
    "Pinegrove School": { image: "https://cbseportal.com/sites/default/files/top-ranked-cbse-schools-in-india-img-10.png", source: "https://cbseportal.com/articles/top-ranked-cbse-schools-in-india", credit: "Photo source: CBSE Exam Portal" },
    "Udgam School for Children": { image: "https://www.teacherhorizons.com/static/mediav2/schools/6494/images/809127_main.jpg", source: "https://www.teacherhorizons.com/schools/asia-india-ahmedabad-udgam-school", credit: "Photo source: Teacher Horizons" },
    "Ahmedabad International School": { image: "https://www.teacherhorizons.com/static/mediav2/schools/4429/images/545131_main.jpg", source: "https://www.teacherhorizons.com/schools/asia-india-ahmedabad-ahmedabad-international-school", credit: "Photo source: Teacher Horizons" },
    "The Riverside School": { image: "https://schoolriverside.com/images/campus/1.jpg", source: "https://schoolriverside.com/Campus", credit: "Photo source: The Riverside School" },
    "Bharatiya Vidya Bhavan's Vidyashram": {
        image: "https://d3bat55ebwjhsf.cloudfront.net/schools/infra/images/Screenshot_2024-01-29_130012.png",
        source: "https://ezyschooling.com/school/bharatiya-vidya-bhavan-vidyashram-sanganer-jaipur/photos",
        credit: "Photo source: Ezyschooling"
    },
    "St. Xavier's Senior Secondary School": {
        image: "https://skoodos.com/public/uploads/optimized/1683020360.png",
        source: "https://skoodos.com/school/st-xaviers-sr-sec-school-panch-batti",
        credit: "Photo source: Skoodos"
    },
    "Neerja Modi School": {
        image: "https://nmsindia.org/uploads/page/gallery/17385812301.jpg",
        source: "https://nmsindia.org/about-us/location",
        credit: "Photo source: Neerja Modi School"
    },
    "The Doon School": {
        image: "https://images.indianexpress.com/2019/03/doon759.jpg?w=1200",
        source: "https://indianexpress.com/article/education/doon-summer-leadership-programme-applications-open-check-details-doonschool-com-5641804/",
        credit: "Photo source: The Indian Express"
    },
    "Bishop Cotton School": {
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Aerial_view_of_Bishop_Cotton_School_%28Shimla%29.jpg?_=20230321054441",
        source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Bishop_Cotton_School_(Shimla).jpg",
        credit: "Photo: Wikimedia Commons, CC BY-SA"
    },
    "Jayshree Periwal High School": { image: "https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_root_user%40ezy.com/2E0A1264edtd-scaled.jpg", source: "https://ezyschooling.com/school/jayshree-periwal-high-school-chitrakoot-jaipur", credit: "Photo source: Ezyschooling" }
};

function fallbackImage(name) {
    const initials = esc(name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#e8f3ff"/><stop offset="1" stop-color="#c5def3"/></linearGradient></defs><rect width="1200" height="600" fill="url(#g)"/><path d="M420 360V235l180-110 180 110v125h-95v-95H515v95z" fill="#1768a9" opacity=".82"/><rect x="0" y="430" width="1200" height="170" fill="#ffffff" opacity=".72"/><text x="600" y="505" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="700" fill="#12385b">${initials} · photo not available</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function card([name, city], index) {
    const facts = verified[name] || {};
    const link = facts.url || `https://www.google.com/search?q=${encodeURIComponent(`${name} official school website`)}`;
    const photo = facts.image ? { image: facts.image, source: link, credit: "Photo source: school's website" } : campusPhotos[name];
    const image = photo?.image || fallbackImage(name);
    const imageAlt = photo ? `Campus image of ${esc(name)}` : `Campus image unavailable for ${esc(name)}`;
    const board = facts.board || "Board not verified";
    const status = facts.status || "Day or boarding status not verified";
    const description = facts.description || "School-specific programme and campus information has not been independently verified yet.";
    return `<article class="institution-card regional-school-card"><div class="institution-card-visual"><img src="${image}" alt="${imageAlt}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(name)}'"><div class="institution-card-overlay"></div><span class="institution-card-rank">#${String(index + 1).padStart(2, "0")}</span><div class="institution-card-title"><h3>${esc(name)}</h3><p>📍 ${esc(city)}</p></div></div><div class="institution-card-body"><span class="institution-card-category">${esc(board)}</span><h4 class="institution-card-program">${esc(status)}</h4><div class="institution-card-ranking">Approximate editorial listing; not an official ranking.</div><div class="institution-card-highlight">${esc(description)}</div>${photo ? `<a class="regional-school-photo-source" href="${photo.source}" target="_blank" rel="noopener noreferrer">${esc(photo.credit)}</a>` : ""}<div class="institution-card-actions"><a class="institution-card-action" href="${link}" target="_blank" rel="noopener noreferrer">Explore School <span>›</span></a><button type="button" class="institution-card-action" data-action="compare">Compare <span>›</span></button></div></div></article>`;
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
        if (!names[region]) { select.focus(); return; }
        title.textContent = `Top 10 schools in ${region}`;
        grid.innerHTML = names[region].slice(0, 10).map(card).join("");
        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    grid.addEventListener("click", (event) => {
        const button = event.target.closest('[data-action="compare"]');
        if (!button) return;
        const item = button.closest(".institution-card");
        button.textContent = button.dataset.compared ? "Compare" : "Added to compare";
        button.dataset.compared = button.dataset.compared ? "" : "true";
        item.classList.toggle("is-selected-for-compare", Boolean(button.dataset.compared));
    });
}
