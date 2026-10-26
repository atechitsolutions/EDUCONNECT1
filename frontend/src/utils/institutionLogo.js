

const OFFICIAL_UNIVERSITY_DOMAINS = {
    "Northeastern University": "northeastern.edu", "New York University": "nyu.edu", "Drexel University": "drexel.edu", "Clark University": "clarku.edu",
    "Yeshiva University": "yu.edu", "University of Detroit Mercy": "udmercy.edu", "Illinois Institute of Technology": "iit.edu", "DePaul University": "depaul.edu",
    "Washington State University": "wsu.edu", "Colorado State University": "colostate.edu", "Northern Arizona University": "nau.edu", "Utica University": "utica.edu",
    "City University of Seattle": "cityu.edu", "Clarkson University": "clarkson.edu", "Touro University": "touro.edu", "University of Massachusetts Lowell": "uml.edu",
    "University of West Florida": "uwf.edu", "Central Washington University": "cwu.edu", "University of Massachusetts Dartmouth": "umassd.edu", "University of Nevada, Las Vegas": "unlv.edu",
    "Troy University": "troy.edu", "Lewis University": "lewisu.edu", "University of Arizona": "arizona.edu", "University of California": "universityofcalifornia.edu",
    "University of Michigan": "umich.edu", "University of Wisconsin–Madison": "wisc.edu", "Harvard University": "harvard.edu", "Stanford University": "stanford.edu",
    "Brown University": "brown.edu", "Johns Hopkins University": "jhu.edu", "Case Western Reserve University": "case.edu", "Clemson University": "clemson.edu",
    "Loyola University Chicago": "luc.edu", "Massachusetts Institute of Technology": "mit.edu",
    "University of Toronto": "utoronto.ca", "McGill University": "mcgill.ca", "University of Alberta": "ualberta.ca", "University of Calgary": "ucalgary.ca",
    "University of Waterloo": "uwaterloo.ca", "University of Manitoba": "umanitoba.ca", "University of Saskatchewan": "usask.ca", "University of Victoria": "uvic.ca",
    "Simon Fraser University": "sfu.ca", "York University": "yorku.ca", "Algoma University": "algomau.ca", "Brock University": "brocku.ca",
    "University Canada West": "ucanwest.ca", "Yorkville University": "yorkvilleu.ca", "Northeastern University — Canadian programs": "northeastern.edu", "International Business University": "ibu.ca",
    "University of Liverpool": "liverpool.ac.uk", "Northeastern University London": "london.northeastern.edu", "University of Sussex": "sussex.ac.uk", "University of Sunderland": "sunderland.ac.uk",
    "University of Roehampton": "roehampton.ac.uk", "London Metropolitan University": "londonmet.ac.uk", "St Mary's University, Twickenham": "stmarys.ac.uk", "University of Edinburgh": "ed.ac.uk",
    "University of Manchester": "manchester.ac.uk", "University of Warwick": "warwick.ac.uk", "Newcastle University": "ncl.ac.uk", "Aston University": "aston.ac.uk",
    "Coventry University": "coventry.ac.uk", "Lancaster University": "lancaster.ac.uk", "Loughborough University": "lboro.ac.uk", "Brunel University London": "brunel.ac.uk",
    "University of Greenwich": "gre.ac.uk", "University of Aberdeen": "abdn.ac.uk", "Abertay University": "abertay.ac.uk", "University of Lincoln": "lincoln.ac.uk",
    "Australian National University": "anu.edu.au", "University of Melbourne": "unimelb.edu.au", "University of Sydney": "sydney.edu.au", "University of Adelaide": "adelaide.edu.au",
    "RMIT University": "rmit.edu.au", "Deakin University": "deakin.edu.au", "Curtin University": "curtin.edu.au", "Macquarie University": "mq.edu.au",
    "University of Newcastle": "newcastle.edu.au", "Queensland University of Technology": "qut.edu.au", "University of Canberra": "canberra.edu.au", "Western Sydney University": "westernsydney.edu.au",
    "WHU – Otto Beisheim School of Management": "whu.edu", "SRH University": "srh-university.de", "International School of Management (ISM)": "ism.de",
    "CODE University of Applied Sciences": "code.berlin", "Munich Business School": "munich-business-school.de", "Touro University — Germany listing": "touro.edu",
    "University of Applied Management": "fham.de", "ICN Business School": "icn-artem.com", "University of Bonn": "uni-bonn.de", "University of Cologne": "uni-koeln.de",
    "University of Freiburg": "uni-freiburg.de", "University of Hamburg": "uni-hamburg.de", "University of Mannheim": "uni-mannheim.de", "University of Stuttgart": "uni-stuttgart.de",
    "University of Tübingen": "uni-tuebingen.de", "University of Würzburg": "uni-wuerzburg.de", "TU Darmstadt": "tu-darmstadt.de", "Chemnitz University of Technology": "tu-chemnitz.de",
    "Paris School of Business": "psbedu.paris", "Excelia Business School": "excelia-group.com", "EDC Paris Business School": "edcparis.edu", "EMLV Business School": "emlv.fr",
    "KEDGE Business School": "kedge.edu", "ESDES Business School": "esdes.fr", "Aivancity School for Technology, Business and Society": "aivancity.ai", "American Business College": "abc-school.com",
    "University College Cork": "ucc.ie", "Dundalk Institute of Technology": "dkit.ie", "Dublin City University": "dcu.ie", "Dublin Business School": "dbs.ie",
    "Griffith College Ireland": "griffith.ie", "Cork Institute of Technology": "mtu.ie", "Seinäjoki University of Applied Sciences (SeAMK)": "seamk.fi",
    "South-Eastern Finland University of Applied Sciences (Xamk)": "xamk.fi", "Haaga-Helia University of Applied Sciences": "haaga-helia.fi", "Metropolia University of Applied Sciences": "metropolia.fi",
    "Utrecht University": "uu.nl", "Wageningen University & Research": "wur.nl", "POLIMI Graduate School of Management": "gsom.polimi.it",
    "Rochester Institute of Technology of Dubai": "rit.edu", "International Business School (IBS)": "ibs-b.hu"
};

export function getInstitutionLogoUrl(institution) {
    if (institution?.logoUrl) return institution.logoUrl;
    const officialDomain = OFFICIAL_UNIVERSITY_DOMAINS[institution?.name];
    let websiteDomain = "";
    try {
        websiteDomain = institution?.website
            ? new URL(institution.website).hostname.replace(/^www\./, "")
            : "";
    } catch { /* Ignore malformed provider URLs and use the known domain map. */ }
    const domain = officialDomain || websiteDomain;
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";
}
