import { useContext } from "react";
import Avis from "../Avis/Avis";
import Contact from "../Contact/Contact";
import { SheetDataContext } from "../Context/DataContext";
import Emplacement from "../Emplacement/Emplacement";
import Footer from "../Footer/Footer";
import Galerie from "../Galerie/Galerie";
import GaleriePictos from "../GaleriePictos";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Intro from "../Intro/Intro";
import Logement from "../Logement/Logement";
import Questions from "../Questions/Questions";
import Tarifs from "../Tarifs/Tarifs";
import Remarques from "../Remarques/Remarques";

function Main() {
    const { introData, logementData, remarquesData, tarifData, avisData, equipementData, emplacementData, faqData, contactData, loading, error } = useContext(SheetDataContext);

    // Pour le menu
    // Combine les titres de toutes les sections
    const sections = [
        ...logementData,
        ...tarifData,
        ...emplacementData,
        ...faqData, 
        // Ajoute d'autres sections si besoin
    ];

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="app">
            <Nav sections={sections}/>
            <Header />
            <Intro data={introData} />
            <Galerie />
            <Logement data={logementData} />
            <Remarques data={remarquesData} />
            <GaleriePictos data={equipementData} />
            <Tarifs data={tarifData} />
            <Avis data={avisData} />
            <Emplacement data={emplacementData} />
            <Contact data={contactData} />
            <Questions data={faqData} />
            <Footer />
        </div>
    );
}

export default Main;
