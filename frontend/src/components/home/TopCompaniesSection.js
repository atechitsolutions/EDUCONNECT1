import Section from "../common/Section.js";
import InstitutionCard from "../common/InstitutionCard.js";

export function TopCompaniesSection() {
    const companies = [
        {
            rank: "01",
            name: "Tata Consultancy Services",
            shortName: "TCS",
            category: "IT & Technology",
            location: "Pan India",

            program: "Jobs • Internships • Graduate Programs",

            rating: "4.7",
            reviews: "5,240",
            score: "9.1",

            ranking:
                "One of India's leading IT and " +
                "technology companies offering jobs and " +
                "career opportunities in India",

            highlight: "Strong career growth & learning opportunities",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6811353-6870744d04b2?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "02",
            name: "Infosys",
            shortName: "INFOSYS",
            category: "IT & Technology",
            location: "Pan India",

            program: "Jobs • Internships • Graduate Programs",

            rating: "4.6",
            reviews: "4,820",
            score: "8.9",

            ranking:
                "Major IT and technology company " +
                "offering jobs, internships and career " +
                "opportunities in India",

            highlight: "Learning & development focused workplace",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6754035-f200968a6e72?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "03",
            name: "Microsoft",
            shortName: "MS",
            category: "Technology",
            location: "India",

            program: "Software • Cloud • Product • Internships",

            rating: "4.8",
            reviews: "3,950",
            score: "9.5",

            ranking:
                "Leading global technology company " +
                "offering software, cloud, AI and " +
                "technology careers in India",

            highlight: "Innovation, technology & strong work culture",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6216548-37526070297c?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "04",
            name: "Google",
            shortName: "GOOGLE",
            category: "Technology",
            location: "India",

            program: "Software • Data • AI • Internships",

            rating: "4.8",
            reviews: "4,210",
            score: "9.6",

            ranking:
                "Leading technology company offering " +
                "software, data, AI and internship " +
                "opportunities in India",

            highlight: "Innovation & global career opportunities",

            image:
                "https://images.unsplash.com/photo-157380" +
                "4633927-bfcbcd909acd?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "05",
            name: "Amazon",
            shortName: "AMAZON",
            category: "Technology & E-Commerce",
            location: "India",

            program: "Technology • Operations • Business • Internships",

            rating: "4.6",
            reviews: "4,680",
            score: "8.8",

            ranking:
                "Leading technology and e-commerce " +
                "company offering jobs, internships and " +
                "business career opportunities in India",

            highlight: "Fast-paced careers & diverse opportunities",

            image:
                "https://images.unsplash.com/photo-152327" +
                "5335684-37898b6baf30?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "06",
            name: "Deloitte",
            shortName: "D",
            category: "Consulting & Professional Services",
            location: "India",

            highlight: "Professional growth, consulting careers and business opportunities",

            rating: "4.6",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6811353-6870744d04b2?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "07",
            name: "Accenture",
            shortName: "ACN",
            category: "IT & Consulting",
            location: "Pan India",

            program: "Technology • Consulting • Strategy • Internships",

            rating: "4.5",
            reviews: "4,060",
            score: "8.6",

            ranking:
                "Global technology and consulting " +
                "company offering IT, consulting and " +
                "digital career opportunities in India",

            highlight: "Global opportunities & digital careers",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6754035-f200968a6e72?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "08",
            name: "HDFC Bank",
            shortName: "HDFC",
            category: "Banking & Finance",
            location: "Pan India",

            program: "Banking • Finance • Analytics • Internships",

            rating: "4.5",
            reviews: "2,980",
            score: "8.5",

            ranking:
                "One of India's leading private sector " +
                "banks offering banking, finance and " +
                "analytics career opportunities",

            highlight: "Career stability & financial sector growth",

            image:
                "https://images.unsplash.com/photo-155676" +
                "1175-b413da4baf72?auto=format&fit=crop&w" +
                "=1200&q=85",
        },

        {
            rank: "09",
            name: "Reliance Industries",
            shortName: "RIL",
            category: "Conglomerate",
            location: "India",

            program: "Technology • Finance • Retail • Operations",

            rating: "4.5",
            reviews: "2,740",
            score: "8.4",

            ranking:
                "Large diversified company offering " +
                "career opportunities across technology, " +
                "finance, retail and operations",

            highlight: "Diverse career paths across industries",

            image:
                "https://images.unsplash.com/photo-148640" +
                "6146926-c627a92ad1ab?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },

        {
            rank: "10",
            name: "Wipro",
            shortName: "WIPRO",
            category: "IT & Technology",
            location: "Pan India",

            program: "IT • Consulting • Cloud • Internships",

            rating: "4.4",
            reviews: "2,560",
            score: "8.3",

            ranking:
                "Established IT and technology company " +
                "offering consulting, cloud and career " +
                "opportunities in India",

            highlight: "Workplace opportunities & career mobility",

            image:
                "https://images.unsplash.com/photo-149736" +
                "6216548-37526070297c?auto=format&fit=cro" +
                "p&w=1200&q=85",
        },
    ];

    function createCompanyCard(company) {
        return InstitutionCard({
            item: {
                rank: company.rank,

                name: company.name,

                category: company.category,

                program: company.program,

                location: company.location,

                rating: company.rating,

                reviews: company.reviews,

                score: company.score,

                ranking: company.ranking,

                highlight: company.highlight,

                image: company.image,

                actionLabel: "Explore Careers",
            },

            type: "company",
        });
    }

    const companyCards = companies.map(createCompanyCard).join("");

    const companyCardsDuplicate = companies.map(createCompanyCard).join("");

    const content = `

        <div class="top-companies-section">



            <div class="top-companies-intro">

                <div class="top-companies-intro-content">

                    <span class="top-companies-label">
                        💼 CAREER & OPPORTUNITIES
                    </span>

                    <h2>
                        Top Companies to Work For in India
                    </h2>

                    <p>
                        Discover top companies in India offering jobs,
                        career opportunities, internships, graduate programs,
                        professional growth and diverse career paths.
                    </p>

                </div>


                <div class="top-companies-intro-badge">

                    <strong>
                        ${companies.length}
                    </strong>

                    <span>
                        Featured<br>
                        Companies
                    </span>

                </div>

            </div>



            <div class="top-companies-carousel">

                <div
                    class="top-companies-track institution-carousel-track"
                >

                    ${companyCards}

                    ${companyCardsDuplicate}

                </div>

            </div>



            <div class="top-companies-bottom">

                <div class="top-companies-bottom-text">

                    <span>
                        Looking for a job?
                    </span>

                    <strong>
                        Find jobs and internships from leading companies.
                    </strong>

                </div>


                <button
                    class="top-companies-explore-btn"
                    type="button"
                >

                    <span class="top-companies-view-all-text">
                        Browse Top Companies
                    </span>

                    <span>
                        →
                    </span>

                </button>

            </div>



            <div
                class="top-companies-all"
                hidden
            >

                <div class="top-companies-all-grid">

                    ${companies.map(createCompanyCard).join("")}

                </div>

            </div>


        </div>

    `;

    return Section({
        id: "top-companies",

        title: "",

        subtitle: "",

        content,
    });
}

export default TopCompaniesSection;
