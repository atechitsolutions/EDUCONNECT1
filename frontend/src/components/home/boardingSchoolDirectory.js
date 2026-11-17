import { campusPhotos, fallbackImage } from "./regionalSchools.js";

// User-provided regional boarding-school shortlist. List order is approximate,
// and shared schools intentionally remain in each separately named region.
const regionalSchools = {
    Rajasthan: [
        ["Mayo College", "Ajmer"], ["Vidya Niketan Birla Public School", "Pilani", "Birla Public School"], ["Birla Balika Vidyapeeth", "Pilani"], ["Heritage Girls' School", "Udaipur"], ["L K Singhania Education Centre", "Gotan"], ["Modi World School", "Jhunjhunu"], ["Jayshree Periwal International School", "Jaipur"], ["Neerja Modi School", "Jaipur"], ["India International School", "Jaipur"], ["Delhi Public School (DPS)", "Jaipur", "Delhi Public School, Jaipur"]
    ],
    Jaipur: [
        ["Jayshree Periwal International School", "Mahapura"], ["Maharani Gayatri Devi (MGD) Girls' School", "Jaipur", "Maharani Gayatri Devi Girls' School"], ["Delhi Public School (DPS)", "Jaipur", "Delhi Public School, Jaipur"], ["India International School", "Mansarovar"], ["SRN International School", "Jagatpura"], ["Neerja Modi School", "Jaipur"], ["Discovery International School", "Paota"], ["Tagore Public School", "Jaipur"], ["Stani Memorial Public School", "Phagi"], ["Mayoor School", "Sitapura"]
    ],
    Delhi: [
        ["Modern School", "Barakhamba Road", "Modern School, Barakhamba Road"], ["Delhi Public School (DPS)", "Vasant Kunj"], ["Army Public School", "Dhaula Kuan"], ["Amity International School", "Saket"], ["CRPF Public School", "Delhi"], ["Jamia Millia Islamia Schools", "Okhla"], ["Ganga International School", "Hiran Kudna"], ["Gyan Deep Vidya Mandir Public School", "Kair, Najafgarh"], ["Delhi Public School (DPS)", "R.K. Puram", "Delhi Public School, R.K. Puram"], ["The Mann School", "Delhi"]
    ],
    "Nearby NCR options": [
        ["Pathways World School", "Aravali Hills, Haryana"], ["G D Goenka World School", "Sohna, Haryana"]
    ],
    "Himachal Pradesh": [
        ["The Lawrence School, Sanawar", "Solan"], ["Bishop Cotton School", "Shimla"], ["Auckland House School", "Shimla"], ["Pinegrove School", "Dharampur, Solan", "Pinegrove School Dharampur"], ["Pinegrove School", "Subathu, Solan", "Pinegrove School Subathu"], ["Roots Country School", "Shimla"], ["Laureate Public School", "Shimla"], ["Him Academy Public School", "Hamirpur"], ["Mount Shivalik Public School", "Jubbarhatti, Shimla"], ["St. Edward's School", "Shimla"]
    ],
    "Uttar Pradesh": [
        ["La Martiniere College", "Lucknow"], ["DLF Public School", "Ghaziabad"], ["Deep Memorial Public School", "Ghaziabad"], ["Seth M.R. Jaipuria School", "Lucknow"], ["G D Goenka Public School", "Location not specified in source list"], ["Zaytun International Academy", "Location not specified in source list"], ["Delhi Public School", "Noida", "Delhi Public School Uttar Pradesh"], ["The International School", "Agra"]
    ],
    Uttarakhand: [
        ["The Doon School", "Dehradun"], ["The Welham Girls' School", "Dehradun", "Welham Girls' School"], ["The Welham Boys' School", "Dehradun", "Welham Boys' School"], ["Woodstock School", "Mussoorie"], ["Ecole Globale International Girls' School", "Dehradun"], ["The Asian School", "Dehradun"], ["Shri Ram Centennial School", "Dehradun", "Shri Ram Centennial School Dehradun"], ["Wynberg Allen School", "Mussoorie"], ["St. George's College", "Mussoorie"], ["Tula's International School", "Dehradun"]
    ],
    Gujarat: [
        ["Mahatma Gandhi International School", "Ahmedabad"], ["Calorx Olive International School", "Ahmedabad"], ["Navrachana International School", "Vadodara"], ["Fountainhead School", "Surat"], ["The Galaxy School", "Rajkot"], ["JG International School", "Ahmedabad"], ["Gangotri International School", "Rajkot"], ["Om Landmark School", "Location not specified in source list"], ["Vrajbhoomi International School", "Mogar"], ["Manav Kendra Gyan Mandir School", "Vadodara"]
    ],
    "Madhya Pradesh": [
        ["The Daly College", "Indore"], ["The Emerald Heights International School", "Indore", "Emerald Heights International School"], ["The Scindia School", "Gwalior"], ["The Sanskaar Valley School", "Bhopal"], ["Scindia Kanya Vidyalaya", "Gwalior"], ["Shri Ram Centennial School", "Panchderiya, Indore", "Shri Ram Centennial School Indore"], ["Orchids The International School", "Andhuwa, Jabalpur"]
    ],
    Telangana: [
        ["The Aga Khan Academy", "Hyderabad"], ["The Hyderabad Public School", "Begumpet / Ramanthapur", "The Hyderabad Public School, Begumpet"], ["Sreenidhi International School", "Moinabad"], ["DRS International School", "Hyderabad"], ["The Gaudium School", "Hyderabad"], ["Olympia International School", "Toopran, Medak"], ["Ivy League Academy", "Shamirpet"], ["St. Peter's International Residential School", "Hyderabad"], ["Delhi Public School (DPS)", "Nacharam", "Delhi Public School, Hyderabad"], ["Shantiniketan Vidyalaya", "Hyderabad"]
    ],
    "Andhra Pradesh": [
        ["Rishi Valley School", "Chittoor"], ["Viswabharathi Wisewoods International School", "Prakasam"], ["Bhashyam Educational Institutions", "Andhra Pradesh", "Bhashyam Public School"], ["Sri Sathya Sai Higher Secondary School", "Prasanthi Nilayam"], ["Sri Viswasanthi Educational Institutions", "Andhra Pradesh"]
    ]
};

// Additional verified institution-specific images not already in the shared
// school gallery map. The linked pages identify the pictured campus/school.
const additionalPhotos = {
    "The Assam Valley School": ["https://avs.campusmall.in/media/mageplaza/bannerslider/banner/image/a/s/assam_valley_school.jpg", "https://avs.campusmall.in/", "Photo source: Assam Valley School"],
    "GD Goenka World School": ["https://gdgws.gdgoenka.com/public/upload/cms/20251223071256.webp", "https://gdgws.gdgoenka.com/request-a-visit", "Photo source: GD Goenka World School"],
    "G D Goenka World School": ["https://gdgws.gdgoenka.com/public/upload/cms/20251223071256.webp", "https://gdgws.gdgoenka.com/request-a-visit", "Photo source: GD Goenka World School"],
    "Mahatma Gandhi International School": ["https://www.mgis.in/wp-content/uploads/2026/04/1000294729.jpg", "https://www.mgis.in/", "Photo source: Mahatma Gandhi International School"],
    "Calorx Olive International School": ["https://cois.edu.in/images/campus6.JPG", "https://cois.edu.in/campus.html", "Photo source: Calorx Olive International School"],
    "Viswabharathi Wisewoods International School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/infra/images/adgfh.jpeg", "https://ezyschooling.com/school/viswabharathi-wisewoods-international-school-tsorjvxj/photos", "Photo source: Ezyschooling"],
    "Pathways World School": ["https://static.toiimg.com/thumb/msid-71681318%2Cwidth-1070%2Cheight-580%2Cimgsize-37963%2Cresizemode-75%2Coverlay-toi_sw%2Cpt-32%2Cy_pad-40/photo.jpg", "https://timesofindia.indiatimes.com/spotlight/pathways-schools-top-rankings-for-fifth-year-in-a-row/articleshow/71681317.cms", "Photo source: Times of India"],
    "The International School Agra": ["https://www.top10schools.in/images/tisagra.jpg", "https://www.top10schools.in/uttar-pradesh/agra/", "Photo source: Top10Schools"],
    "The International School": ["https://www.top10schools.in/images/tisagra.jpg", "https://www.top10schools.in/uttar-pradesh/agra/", "Photo source: Top10Schools"],
    "Delhi Public School Uttar Pradesh": ["https://www.pasch-net.de/resources/files/jpg938/dps-noida-1-formatkey-jpg-default.jpg", "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/delhi-public-school-noida.html", "Photo source: PASCH-Initiative"],
    "Heritage Girls' School": ["https://d3bat55ebwjhsf.cloudfront.net/parent/review_system_files/user_174/Heritage_Girls_School_-_Boarding_School_In_India.png", "https://ezyschooling.com/school/heritage-girls-school-udaipur", "Photo source: Ezyschooling"],
    "L K Singhania Education Centre": ["https://resources.edunexttechnologies.com/web-data/lksg/images/vision-mission.jpg", "https://www.lksec.org/vision-mission", "Photo source: L K Singhania Education Centre"],
    "Modi World School": ["https://www.uniapply.com/blog/wp-content/uploads/2026/01/Modi-World-School-1.jpg", "https://www.uniapply.com/blog/modi-world-school-jhunjhunu-a-leading-cbse-school-in-rajasthan/", "Photo source: UniApply"],
    "Jayshree Periwal International School": ["https://jpischool.com/uploads/1454760942-75286349935-acre-campus.jpg", "https://jpischool.com/our-campus-facilities", "Photo source: Jayshree Periwal International School"],
    "India International School": ["https://www.addressguru.in/images/1615125638.png", "https://www.addressguru.in/india-international-school", "Photo source: AddressGuru"],
    "SRN International School": ["https://srninternational.org/assets/schoolbillding.jpeg", "https://srninternational.org/", "Photo source: SRN International School"],
    "Discovery International School": ["https://www.vidyapun.com/_next/image?q=75&url=https%3A%2F%2Fasthadigital.s3.ap-south-1.amazonaws.com%2Fschool%2Fimage%2FJaipur-116%2F1736231978251_IMAGE.jpg&w=3840", "https://www.vidyapun.com/schools/8890-discovery-international-school", "Photo source: Vidyapun"],
    "Tagore Public School": ["https://tpsshastrinagar.com/assets/images/homeimg.png", "https://tpsshastrinagar.com/", "Photo source: Tagore Public School"],
    "Stani Memorial Public School": ["https://www.smps.ac.in/assets/img/building.png", "https://www.smps.ac.in/campuses", "Photo source: Stani Memorial Public School"],
    "Mayoor School": ["https://tal203091.s3.ap-south-1.amazonaws.com/BIZ365/S3ImageUploads/Bulk/37263/a02b56e0~cbseschoolinsitapura.webp", "https://www.mayoorschooljaipur.org/blog", "Photo source: Mayoor School Jaipur"],
    "Delhi Public School (DPS)|Vasant Kunj": ["https://www.pasch-net.de/resources/files/jpg901/dps-vasant-kunj_bild_web-formatkey-jpg-w1920r.jpg", "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/delhi-vasant-kunj.html", "Photo source: PASCH-Initiative"],
    "Army Public School|Dhaula Kuan": ["https://d3bat55ebwjhsf.cloudfront.net/schools/2024-09-30_11-09-18/8ian/infra/images/army_building.jpg", "https://ezyschooling.com/school/army-public-school-dhaula-kuan-south-west-delhi/photos", "Photo source: Ezyschooling"],
    "Amity International School|Saket": ["https://amitasha.org/images/saket_1.jpg", "https://amitasha.org/saket.asp", "Photo source: Amitasha"],
    "CRPF Public School": ["https://cache.careers360.mobi/media/schools/social-media/media-gallery/2864/2019/4/30/CRPF%20Public%20School-Campus.jpg", "https://school.careers360.com/schools/crpf-public-school-dwarka-new-delhi", "Photo source: Careers360"],
    "Jamia Millia Islamia Schools": ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jamia_School.jpg/960px-Jamia_School.jpg", "https://commons.wikimedia.org/wiki/File:Jamia_School.jpg", "Photo source: Wikimedia Commons"],
    "Ganga International School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_gangaint/ganga_int_NqBlgZD.jpg", "https://ezyschooling.com/school/ganga-international-school-gis-hiran-kudna-delhi", "Photo source: Ezyschooling"],
    "Gyan Deep Vidya Mandir Public School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_formassist-3938/2018-11-21.jpg", "https://ezyschooling.com/school/gyan-deep-vidya-mandir-public-school-najafgarh-south-west-delhi", "Photo source: Ezyschooling"],
    "The Mann School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/6832/user_formassist-6832/2020-06-15.png", "https://ezyschooling.com/school/the-mann-school-holambi-kalan-north-west-delhi", "Photo source: Ezyschooling"],
    "Pinegrove School Dharampur": ["https://pinegrove.in/assets/img/slider-2.jpg", "https://pinegrove.in/", "Photo source: Pinegrove School"],
    "Pinegrove School Subathu": ["https://pinegrove.in/assets/img/SeniorWing1.jpg", "https://pinegrove.in/location.aspx", "Photo source: Pinegrove School"],
    "Roots Country School": ["https://storage.googleapis.com/cdn-edustoke/mysql_images/full/6801edbd-e603-4e17-bc5c-f68048530cd8_47cffffb.webp", "https://www.edustoke.com/residential/shimla/roots-country-school-shimla", "Photo source: Edustoke"],
    "Laureate Public School": ["https://www.edustoke.com/assets/uploads-new/9c04b831-acd1-44e4-826e-f1c41bad3015.jpeg", "https://www.edustoke.com/residential/shimla/laureate-public-school-bharari", "Photo source: Edustoke"],
    "Him Academy Public School": ["https://www.himacademy.com/public/storage/uploads/page/66C9BA39926FA.jpg", "https://www.himacademy.com/public/page/introduction", "Photo source: Him Academy"],
    "Mount Shivalik Public School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/2024-11-15_14-06-51/nxfv/infra/images/2022-07-03.jpg", "https://ezyschooling.com/school/mount-shivalik-public-school-shimla-himachal-pradesh", "Photo source: Ezyschooling"],
    "DLF Public School": ["https://www.yayskool.com/images/school/dlf-public-school-ghaziabad-5147862.jpg", "https://www.yayskool.com/school/dlf-public-school-ghaziabad-3958862", "Photo source: YAYSKOOL"],
    "Deep Memorial Public School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/9258/user_deepmemorialpub1988/291771229_434710805330983_7449781978185509945_n.jpg", "https://ezyschooling.com/school/deep-memorial-public-school-anand-vihar-ghaziabad", "Photo source: Ezyschooling"],
    "Seth M.R. Jaipuria School": ["https://www.jaipuriaschoolkursiroadlko.in/wp-content/uploads/2025/06/Kursi-Road-Campus.jpg", "https://www.jaipuriaschoolkursiroadlko.in/", "Photo source: Seth M.R. Jaipuria School"],
    "G D Goenka Public School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_admin1/GD_Goenka_Public_School.jpg", "https://ezyschooling.com/school/gd-goenka-public-school-raj-nagar-extension-ghaziabad", "Photo source: Ezyschooling"],
    "Zaytun International Academy": ["https://cache.careers360.mobi/media/schools/social-media/media-gallery/24261/2020/2/28/Zaytun%20International%20Academy-Campu%20View.jpg", "https://school.careers360.com/schools/zaytun-international-academy-dasna-masuri-ghaziabad", "Photo source: Careers360"],
    "Shri Ram Centennial School Dehradun": ["https://www.euttaranchal.com/icms/cms-photos/Shri-Ram-Centennial-School-Dehradun.webp", "https://www.euttaranchal.com/schools/shri-ram-centennial-school-dehradun.php", "Photo source: Euttaranchal"],
    "Wynberg Allen School": ["https://skoodos.com/public/uploads/optimized/1649146844.png", "https://skoodos.com/school/wynberg-allen-school-bala-hissar", "Photo source: Skoodos"],
    "Tula's International School": ["https://www.euttaranchal.com/icms/cms-photos/62-1630051441-9230.jpg", "https://www.euttaranchal.com/schools/tulas-international-school-dehradun.php", "Photo source: Euttaranchal"],
    "Fountainhead School": ["https://candidschools.com/wp-content/uploads/2024/09/Fountainhead-Main-2.jpg", "https://candidschools.com/international-school-in-surat/", "Photo source: Candid Schools"],
    "JG International School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/11225/user_root_user%40ezy.com/2020-10-16.jpg", "https://ezyschooling.com/school/jg-international-school-ahmedabad-gujarat/fees-structure", "Photo source: Ezyschooling"],
    "Gangotri International School": ["https://yellowslate-blog.blr1.cdn.digitaloceanspaces.com/2024/06/Gangotri-International-School.jpg", "https://yellowslate.com/blog/best-boarding-schools-in-gujarat", "Photo source: Yellow Slate"],
    "Om Landmark School": ["https://www.yourboardingschool.com/assets/user_photo/6abddc1976c89ff15c4052e13caee1a7.jpg", "https://www.yourboardingschool.com/vendor-details/om-landmark-school%2C-gandhinagar%2C-gujarat/MzgxOQ%3D%3D", "Photo source: Your Boarding School"],
    "Vrajbhoomi International School": null,
    "Manav Kendra Gyan Mandir School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/11230/user_root_user%40ezy.com/2023-07-17.jpg", "https://ezyschooling.com/school/manav-kendra-gyan-mandir-school-vadodara-gujarat", "Photo source: Ezyschooling"],
    "The Sanskaar Valley School": ["https://www.ipsc.co.in/images/member/the_sanskaar_valley_school.jpg", "https://www.ipsc.co.in/member-details.asp?id=73", "Photo source: IPSC"],
    "Scindia Kanya Vidyalaya": ["https://www.skvgwalior.org/storage/uploads/slider/68CE81ACBFEFB.webp", "https://www.skvgwalior.org/", "Photo source: Scindia Kanya Vidyalaya"],
    "Shri Ram Centennial School Indore": ["https://www.shriramschool.net.in/assets/images/Photogallery/building2.webp", "https://shriramschool.net.in/", "Photo source: Shri Ram Centennial School"],
    "Orchids The International School": ["https://www.orchidsinternationalschool.com/_next/image?q=75&url=https%3A%2F%2Fcdn-cms.orchidsinternationalschool.com%2Fmedia%2Fgallery%2Fimage_Bhedaghat_Road.webp&w=992", "https://www.orchidsinternationalschool.com/jabalpur-branches/bhedaghat-road", "Photo source: ORCHIDS The International School"],
    "The Aga Khan Academy": ["https://static.the.akdn/53832/1641919344-aka_india_hyderabad_1_lr.jpg", "https://the.akdn/en/resources-media/whats-new/in-the-media/aga-khan-academy-hyderabad-formally-launched", "Photo source: AKDN"],
    "Sreenidhi International School": ["https://cdn.schoolsuniverse.com/media/uploads/2025-01-20%2013%3A19%3A15.7743392020-02-14%20%281%29.jpg", "https://www.schoolsuniverse.com/school/sreenidhi-international-school-moinabad-hyderabad", "Photo source: SchoolsUniverse"],
    "DRS International School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/9444/user_info%40drsinternational.com/DRS-93-1024x682.webp", "https://ezyschooling.com/school/drs-international-school-gundlapochampally-hyderabad", "Photo source: Ezyschooling"],
    "The Gaudium School": ["https://www.thegaudium.com/wp-content/uploads/2018/11/The_Gaudium_International_School_Hyderabad_Website_Homepage_Featured_Image_2018_11.jpg", "https://www.thegaudium.com/", "Photo source: The Gaudium School"],
    "Olympia International School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/gallery/5836/2025-12-23_16-17-51/8oz9/WhatsApp-Image-2025-03-16-at-9.05.35-AM-scaled.jpeg", "https://ezyschooling.com/school/olympia-international-school-toopran-hyderabad/photos", "Photo source: Ezyschooling"],
    "Ivy League Academy": ["https://cache.careers360.mobi/media/schools/social-media/media-gallery/16699/2021/5/12/ivy-league-schools-limited-shamirpet-rangareddy-schools-4ir6z7o.jpg", "https://school.careers360.com/schools/ivy-league-academy-shamirpet-mandal-hyderabad", "Photo source: Careers360"],
    "St. Peter's International Residential School": ["https://d3bat55ebwjhsf.cloudfront.net/schools/infra/images/0X6A2802-2.jpg", "https://ezyschooling.com/school/st-peters-international-residential-school-balapur-hyderabad/photos", "Photo source: Ezyschooling"],
    "Shantiniketan Vidyalaya": ["https://www.shantiniketanvidyalaya.com/assets/images/Website/School/UKP01832.jpg", "https://www.shantiniketanvidyalaya.com/", "Photo source: Shantiniketan Vidyalaya"],
    "Delhi Public School (DPS)|Vasant Kunj": ["https://www.pasch-net.de/resources/files/jpg901/dps-vasant-kunj_bild_web-formatkey-jpg-w1920r.jpg", "https://www.pasch-net.de/de/pasch-schulen/schulportraets/asien/ind/delhi-vasant-kunj.html", "Photo source: PASCH-Initiative"],
    "Army Public School|Dhaula Kuan": ["https://d3bat55ebwjhsf.cloudfront.net/schools/2024-09-30_11-09-18/8ian/infra/images/army_building.jpg", "https://ezyschooling.com/school/army-public-school-dhaula-kuan-south-west-delhi/photos", "Photo source: Ezyschooling"],
    "Amity International School|Saket": ["https://amitasha.org/images/saket_1.jpg", "https://amitasha.org/saket.asp", "Photo source: Amitasha"],
    "CRPF Public School|Delhi": ["https://cache.careers360.mobi/media/schools/social-media/media-gallery/2864/2019/4/30/CRPF%20Public%20School-Campus.jpg", "https://school.careers360.com/schools/crpf-public-school-dwarka-new-delhi", "Photo source: Careers360"],
    "Jamia Millia Islamia Schools|Okhla": ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jamia_School.jpg/960px-Jamia_School.jpg", "https://commons.wikimedia.org/wiki/File:Jamia_School.jpg", "Photo source: Wikimedia Commons"],
    "Ganga International School|Hiran Kudna": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_gangaint/ganga_int_NqBlgZD.jpg", "https://ezyschooling.com/school/ganga-international-school-gis-hiran-kudna-delhi", "Photo source: Ezyschooling"],
    "Gyan Deep Vidya Mandir Public School|Kair, Najafgarh": ["https://d3bat55ebwjhsf.cloudfront.net/schools/cover/user_formassist-3938/2018-11-21.jpg", "https://ezyschooling.com/school/gyan-deep-vidya-mandir-public-school-najafgarh-south-west-delhi", "Photo source: Ezyschooling"],
    "Rishi Valley School": ["https://thefoundation.in/images/3.jpg", "https://thefoundation.in/the-school.html", "Photo source: The Foundation"],
    "Sri Sathya Sai Higher Secondary School": ["https://www.ssshss.edu.in/images/st_edu/slider-3/school_Panorama1.jpg", "https://www.ssshss.edu.in/index.php?Itemid=281&catid=18&id=9%3Agenesis&option=com_content&view=article", "Photo source: Sri Sathya Sai Higher Secondary School"],
    "Sri Viswasanthi Educational Institutions": ["https://sriviswasanthischools.in/images/the-journey-of-sri-viswasanthi-b.jpg", "https://sriviswasanthischools.in/the-journey-of-sri-viswasanthi.html", "Photo source: Sri Viswasanthi Schools"]
};

const schoolSources = {
    "Vrajbhoomi International School": "https://vrajbhoomi.org/mobilevrajbhoomiorg/index.php",
    "Orchids The International School": "https://www.orchidsinternationalschool.com/jabalpur-branches"
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function getPhoto(school) {
    const key = school[2] || school[0];
    let custom = additionalPhotos[key] || additionalPhotos[`${school[0]}|${school[1]}`];
    if (!custom && key !== school[0]) custom = additionalPhotos[school[0]];
    if (custom) return { image: custom[0], source: custom[1], credit: custom[2] };
    const existing = campusPhotos[key] || campusPhotos[school[0]];
    if (existing) return existing;
    const source = schoolSources[school[0]] || "";
    return { image: fallbackImage(school[0]), source, credit: source ? "Campus photo unavailable · school details" : "Campus photo unavailable" };
}

export function boardingDirectoryCard(school, index, region) {
    const [name, city] = school;
    const photo = getPhoto(school);
    const image = photo.image || fallbackImage(name);
    const detailsUrl = photo.source || "";
    const photoCredit = photo.source
        ? `<a class="regional-school-photo-source" href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.credit || "Photo source")}</a>`
        : `<span class="regional-school-photo-source">${escapeHtml(photo.credit)}</span>`;
    const explore = detailsUrl
        ? `<a class="institution-card-action" href="${escapeHtml(detailsUrl)}" target="_blank" rel="noopener noreferrer">Explore School <span>›</span></a>`
        : `<span class="institution-card-action is-disabled" aria-disabled="true" title="A matching school details source was not available">School details unavailable</span>`;
    return `<article class="institution-card regional-school-card boarding-directory-card" data-region="${escapeHtml(region)}"><div class="institution-card-visual"><img src="${escapeHtml(image)}" alt="${escapeHtml(photo.source ? `${name} campus` : `${name} campus photo unavailable`)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(name)}'"><div class="institution-card-overlay"></div><span class="institution-card-rank">#${String(index + 1).padStart(2, "0")}</span><div class="institution-card-title"><h3>${escapeHtml(name)}</h3><p>📍 ${escapeHtml(city)}</p></div></div><div class="institution-card-body"><span class="institution-card-category">Boarding school listing</span><h4 class="institution-card-program">Boarding availability should be confirmed with the school</h4><div class="institution-card-ranking">Approximate editorial listing; not an official ranking.</div><div class="institution-card-highlight">Confirm current boarding options, programmes and admissions directly with the institution.</div>${photoCredit}<div class="institution-card-actions">${explore}<button type="button" class="institution-card-action" data-action="compare">Compare <span>›</span></button></div></div></article>`;
}

export function renderBoardingDirectory() {
    const regions = Object.entries(regionalSchools);
    const options = regions.map(([region, schools]) => `<option value="${escapeHtml(region)}">${escapeHtml(region)} (${schools.length})</option>`).join("");
    const total = regions.reduce((sum, [, schools]) => sum + schools.length, 0);
    return `<div class="boarding-directory"><div class="boarding-directory-heading"><div><span class="boarding-schools-label">REGIONAL DIRECTORY</span><h3>Boarding schools by region</h3><p>${total} schools from the supplied regional lists. Region order is approximate, not an official ranking.</p></div><label class="boarding-region-label" for="boarding-region-select">Choose a region<select id="boarding-region-select"><option value="all">All regions (${total})</option>${options}</select></label></div><div class="boarding-directory-regions">${regions.map(([region, schools]) => `<section class="boarding-directory-region" data-directory-region="${escapeHtml(region)}"><h4>${escapeHtml(region)} <span>${schools.length} schools</span></h4><div class="boarding-schools-all-grid">${schools.map((school, index) => boardingDirectoryCard(school, index, region)).join("")}</div></section>`).join("")}</div></div>`;
}

export default renderBoardingDirectory;
