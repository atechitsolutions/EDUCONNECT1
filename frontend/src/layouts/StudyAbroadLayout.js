import StudyAbroadNavbar from "./StudyAbroadNavbar.js";
import FooterSection from "../components/home/footerSection.js";
import StudyAbroadPage from "../pages/StudyAbroadPage.js";


export default function StudyAbroadLayout() {

    return `

        ${StudyAbroadNavbar()}


        <main
            id="study-abroad-page"
            class="study-abroad-page"
            aria-label="Study Abroad"
        >

            ${StudyAbroadPage()}

        </main>


        ${FooterSection()}

    `;
}
